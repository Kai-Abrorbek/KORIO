import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  PendingChest,
  PendingChestDocument,
} from './schemas/pending-chest.schema';
import { rollChestReward } from './xp.util';

/**
 * 상자 보상.
 *
 * 두 학습 모드가 완료를 각각 다른 곳에 기록하기 때문에(자유는 레슨 완료,
 * 로드는 하루 노드 완료) 상자를 버는 지점도 두 곳이다. 그 둘이 같은 규칙으로
 * 상자를 만들고, 받는 경로는 하나로 모은다.
 */
@Injectable()
export class ChestService {
  private readonly logger = new Logger(ChestService.name);

  constructor(
    @InjectModel(PendingChest.name)
    private readonly chestModel: Model<PendingChestDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * 상자를 하나 만든다. 같은 sourceKey 로는 한 번뿐이다.
   *
   * 등급·보석을 여기서 굴려 확정한다 — 받을 때 굴리면 앱을 껐다 켜며 좋은
   * 등급이 나올 때까지 다시 뽑을 수 있다.
   */
  async earn(
    userId: string,
    sourceKey: string,
    params: { section: number; perfect: boolean; gemScale?: number },
  ) {
    const reward = rollChestReward({
      section: params.section,
      perfect: params.perfect,
      gemScale: params.gemScale,
    });

    try {
      await this.chestModel.updateOne(
        { userId: new Types.ObjectId(userId), sourceKey },
        {
          $setOnInsert: {
            userId: new Types.ObjectId(userId),
            sourceKey,
            section: params.section,
            grade: reward.grade,
            gems: reward.gems,
            perfect: params.perfect,
            claimedAt: null,
          },
        },
        { upsert: true },
      );
    } catch (error: any) {
      // unique 충돌 = 이미 번 상자다. 정상 경로다
      if (error?.code !== 11000) {
        this.logger.warn(`상자 생성 실패: ${error?.message}`);
      }
    }
  }

  /**
   * 상자를 만들고 **그 자리에서** 받는다. 노드를 끝낸 순간 쓰는 경로다.
   *
   * 왜 claimAll 을 안 쓰나: 그건 안 받은 상자를 전부 쓸어간다. 여기서 부르면
   * 다른 경로로 쌓여 있던 상자까지 같이 빨려 나가서, 노드 하나 끝냈는데
   * 이유를 알 수 없는 큰 금액이 들어온다. 방금 만든 그 상자만 집는다.
   *
   * 이미 받은 노드면 null 이다 — sourceKey 가 유니크라 두 번 못 받는다.
   */
  async earnAndClaim(
    userId: string,
    sourceKey: string,
    params: { section: number; perfect: boolean; gemScale?: number },
  ): Promise<{ grade: string; gems: number } | null> {
    await this.earn(userId, sourceKey, params);

    const uId = new Types.ObjectId(userId);
    const taken = await this.chestModel.findOneAndUpdate(
      { userId: uId, sourceKey, claimedAt: null },
      { $set: { claimedAt: new Date() } },
    );
    if (!taken) return null;

    await this.userModel.findByIdAndUpdate(uId, { $inc: { gems: taken.gems } });
    return { grade: taken.grade, gems: taken.gems };
  }

  /** 아직 안 받은 상자 수. 화면이 상자를 빛나게 할지 정하는 값 */
  async pendingCount(userId: string): Promise<number> {
    return this.chestModel.countDocuments({
      userId: new Types.ObjectId(userId),
      claimedAt: null,
    });
  }

  /**
   * 안 받은 상자를 전부 받는다.
   *
   * 왜 "전부" 인가: 화면의 상자는 3노드마다 놓인 이정표라 벌어들인 상자와
   * 1:1 로 맞지 않는다. 하나씩 짝지으려 하면 짝이 없는 상자가 영영 안 받아진
   * 채로 남는다. 어느 상자를 누르든 그동안 번 걸 다 가져간다.
   *
   * 연타·중복 요청 방어: 문서마다 claimedAt 이 null 인 것만 원자적으로 집는다.
   * 두 번째 요청은 집을 게 없어 0 을 돌려준다.
   */
  async claimAll(userId: string) {
    const uId = new Types.ObjectId(userId);
    const now = new Date();

    const pending = await this.chestModel
      .find({ userId: uId, claimedAt: null })
      .select('_id grade gems perfect')
      .lean();

    if (!pending.length) {
      const user = await this.userModel.findById(uId).select('gems').lean();
      return {
        claimed: 0,
        gems: 0,
        grade: null as string | null,
        totalGems: user?.gems ?? 0,
        chests: [] as { grade: string; gems: number }[],
      };
    }

    // 하나씩 원자적으로 집는다. 동시에 두 번 눌러도 보석은 한 번만 들어간다
    const won: { grade: string; gems: number }[] = [];
    for (const chest of pending) {
      const taken = await this.chestModel.findOneAndUpdate(
        { _id: chest._id, claimedAt: null },
        { $set: { claimedAt: now } },
      );
      if (taken) won.push({ grade: chest.grade, gems: chest.gems });
    }

    const gems = won.reduce((sum, c) => sum + c.gems, 0);
    if (gems <= 0) {
      const user = await this.userModel.findById(uId).select('gems').lean();
      return {
        claimed: 0,
        gems: 0,
        grade: null as string | null,
        totalGems: user?.gems ?? 0,
        chests: [],
      };
    }

    const updated = await this.userModel
      .findByIdAndUpdate(uId, { $inc: { gems } }, { returnDocument: 'after' })
      .select('gems')
      .lean();

    // 여러 개를 한 번에 받으면 제일 좋은 등급으로 연출한다
    const order = ['wood', 'silver', 'gold'];
    const best = won
      .slice()
      .sort((a, b) => order.indexOf(b.grade) - order.indexOf(a.grade))[0];

    return {
      claimed: won.length,
      gems,
      grade: best?.grade ?? null,
      totalGems: updated?.gems ?? 0,
      chests: won,
    };
  }
}
