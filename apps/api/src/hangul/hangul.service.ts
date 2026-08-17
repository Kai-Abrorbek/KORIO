import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  HangulProgress,
  HangulProgressDocument,
} from './schemas/hangul-progress.schema';
import {
  HANGUL_CHARACTER_IDS,
  HANGUL_CHARACTER_ID_SET,
  HANGUL_LEARNED_MASTERY,
  HANGUL_MAX_SCORE,
  clampHangulScore,
  hangulMasteryFromScore,
} from './hangul.constants';

interface ResultItem {
  characterId: string;
  correct: boolean;
}

@Injectable()
export class HangulService {
  constructor(
    @InjectModel(HangulProgress.name)
    private progressModel: Model<HangulProgressDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async getProgress(userId: string) {
    const uid = new Types.ObjectId(userId);
    const [rows, user] = await Promise.all([
      this.progressModel.find({ userId: uid }).lean(),
      this.userModel.findById(uid).select('hangulCompletedAt').lean(),
    ]);
    return {
      ...this.buildResponse(rows),
      hangulCompletedAt: user?.hangulCompletedAt ?? null,
      justCompleted: false,
    };
  }

  /**
   * 게임 결과 배치 반영. 같은 글자가 여러 번 들어와도 합산해서 1행만 건드린다.
   * 40자 전부 mastery 2 이상이 되면 한글 노드를 자동 완료 처리한다.
   */
  async submitResults(userId: string, results: ResultItem[]) {
    const uid = new Types.ObjectId(userId);
    const valid = (results ?? []).filter(
      (r) => r && HANGUL_CHARACTER_ID_SET.has(r.characterId),
    );
    if (!valid.length) {
      throw new BadRequestException('유효한 characterId 가 없습니다');
    }

    const delta = new Map<
      string,
      { score: number; correct: number; wrong: number }
    >();
    for (const r of valid) {
      const cur = delta.get(r.characterId) ?? { score: 0, correct: 0, wrong: 0 };
      if (r.correct) {
        cur.score += 1;
        cur.correct += 1;
      } else {
        cur.score -= 1;
        cur.wrong += 1;
      }
      delta.set(r.characterId, cur);
    }

    const touched = [...delta.keys()];
    const now = new Date();

    await this.progressModel.bulkWrite(
      [...delta.entries()].map(([characterId, d]) => ({
        updateOne: {
          // filter 의 등치 조건이 upsert 시 그대로 새 문서에 들어가므로
          // userId/characterId 를 $setOnInsert 로 또 주면 충돌난다.
          filter: { userId: uid, characterId },
          update: {
            $inc: {
              score: d.score,
              correctCount: d.correct,
              wrongCount: d.wrong,
            },
            $set: { lastSeenAt: now },
          },
          upsert: true,
        },
      })),
    );

    // $inc 로는 범위를 못 막으니 넘친 행만 따로 클램프한다.
    await Promise.all([
      this.progressModel.updateMany(
        { userId: uid, characterId: { $in: touched }, score: { $lt: 0 } },
        { $set: { score: 0 } },
      ),
      this.progressModel.updateMany(
        {
          userId: uid,
          characterId: { $in: touched },
          score: { $gt: HANGUL_MAX_SCORE },
        },
        { $set: { score: HANGUL_MAX_SCORE } },
      ),
    ]);

    const rows = await this.progressModel.find({ userId: uid }).lean();
    const summary = this.buildResponse(rows);
    const completed = await this.maybeAutoComplete(uid, summary.learnedCount);

    return {
      ...summary,
      hangulCompletedAt: completed.hangulCompletedAt,
      justCompleted: completed.justCompleted,
    };
  }

  /** 40자 다 익혔고 아직 미완료인 유저만 완료 처리. 이미 완료면 건드리지 않는다. */
  private async maybeAutoComplete(uid: Types.ObjectId, learnedCount: number) {
    const user = await this.userModel
      .findById(uid)
      .select('hangulCompletedAt')
      .lean();

    if (learnedCount < HANGUL_CHARACTER_IDS.length) {
      return {
        hangulCompletedAt: user?.hangulCompletedAt ?? null,
        justCompleted: false,
      };
    }
    if (user?.hangulCompletedAt) {
      return { hangulCompletedAt: user.hangulCompletedAt, justCompleted: false };
    }

    const now = new Date();
    const res = await this.userModel.updateOne(
      // mongo 에서 { field: null } 은 null 인 문서와 필드 자체가 없는 문서를 다 잡는다
      { _id: uid, hangulCompletedAt: null },
      { $set: { hangulCompletedAt: now } },
    );

    // modifiedCount 0 = 그 사이 다른 요청이 먼저 완료시킴
    if (res.modifiedCount > 0) {
      return { hangulCompletedAt: now, justCompleted: true };
    }
    const fresh = await this.userModel
      .findById(uid)
      .select('hangulCompletedAt')
      .lean();
    return {
      hangulCompletedAt: fresh?.hangulCompletedAt ?? null,
      justCompleted: false,
    };
  }

  /** 저장된 행이 없는 글자도 mastery 0 으로 채워서 항상 40개를 돌려준다. */
  private buildResponse(rows: Array<Partial<HangulProgress>>) {
    const byId = new Map(rows.map((r) => [r.characterId as string, r]));

    const progress = HANGUL_CHARACTER_IDS.map((characterId) => {
      const row = byId.get(characterId);
      const score = clampHangulScore(row?.score ?? 0);
      return {
        characterId,
        mastery: hangulMasteryFromScore(score),
        score,
        correctCount: row?.correctCount ?? 0,
        wrongCount: row?.wrongCount ?? 0,
      };
    });

    return {
      progress,
      learnedCount: progress.filter((p) => p.mastery >= HANGUL_LEARNED_MASTERY)
        .length,
      total: HANGUL_CHARACTER_IDS.length,
    };
  }
}
