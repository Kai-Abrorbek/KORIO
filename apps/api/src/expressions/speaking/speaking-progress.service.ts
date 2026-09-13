import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  UserSpeakingProgress,
  UserSpeakingProgressDocument,
} from '../schemas/user-speaking-progress.schema';

export interface SpeakingProgressView {
  packCode: string;
  /** 다음에 시작할 문장 번호 (0-based). 주제를 끝냈으면 0 */
  index: number;
  total: number;
  completedCount: number;
  /** 이번에 마지막 문장을 넘겨서 주제가 끝났는지 (저장 응답에서만 의미 있다) */
  justCompleted: boolean;
}

@Injectable()
export class SpeakingProgressService {
  constructor(
    @InjectModel(UserSpeakingProgress.name)
    private readonly model: Model<UserSpeakingProgressDocument>,
  ) {}

  async get(userId: string, packCode: string): Promise<SpeakingProgressView> {
    const found = await this.model
      .findOne({ userId: new Types.ObjectId(userId), packCode })
      .lean();
    return {
      packCode,
      index: found?.index ?? 0,
      total: found?.total ?? 0,
      completedCount: found?.completedCount ?? 0,
      justCompleted: false,
    };
  }

  /**
   * 커서를 저장한다.
   *
   * index 가 total 에 닿으면 주제를 끝낸 것이다 — 커서를 0 으로 되돌리고
   * completedCount 를 올린다. 그래서 다 끝낸 주제에 다시 들어가면 처음부터
   * 시작하고, 중간에 나간 주제는 그 자리에서 이어진다. 이 판정을 클라이언트에
   * 두면 "끝냈다" 를 앱이 주장하는 경로가 생기므로 서버가 정한다.
   */
  async save(
    userId: string,
    packCode: string,
    index: number,
    total: number,
  ): Promise<SpeakingProgressView> {
    const safeTotal = Math.max(0, Math.trunc(total));
    // 시드가 줄어들었을 수도 있으니 클램프한다
    const reached = Math.min(Math.max(0, Math.trunc(index)), safeTotal);
    const completed = safeTotal > 0 && reached >= safeTotal;

    const updated = await this.model
      .findOneAndUpdate(
        { userId: new Types.ObjectId(userId), packCode },
        {
          $set: {
            index: completed ? 0 : reached,
            total: safeTotal,
            lastSpokenAt: new Date(),
          },
          ...(completed ? { $inc: { completedCount: 1 } } : {}),
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      )
      .lean();

    return {
      packCode,
      index: updated?.index ?? 0,
      total: updated?.total ?? safeTotal,
      completedCount: updated?.completedCount ?? 0,
      justCompleted: completed,
    };
  }
}
