import { Types, type Model } from 'mongoose';

/**
 * 일일 퀘스트용 행동 카운터 (UserStats.questCounters).
 *
 * 학습 통계(xp·정답·시간)로는 못 세는 것 — 레슨 판 수·정확도·오답 해소·팔로우·공유 —
 * 을 그날 통계 문서에 같이 쌓는다. 하루 경계는 통계와 같다 (유저 시간대 자정).
 */
export type QuestCounterKey =
  | 'sessions'
  | 'accurate'
  | 'perfect'
  | 'mistakes'
  | 'follow'
  | 'shareProgress'
  | 'shareInvite';

export const QUEST_EVENT_KEYS: QuestCounterKey[] = [
  'shareProgress',
  'shareInvite',
];

/**
 * day = startOfDay(now, tz). cap 이 있으면 그 값까지만 올린다 (앱이 보내는 이벤트용).
 * 실패해도 던지지 않는다 — 퀘스트 때문에 학습·팔로우가 실패하면 안 된다.
 */
export async function bumpQuestCounter(
  statsModel: Model<any>,
  userId: string | Types.ObjectId,
  day: Date,
  key: QuestCounterKey,
  n = 1,
  cap?: number,
): Promise<boolean> {
  if (n <= 0) return false;
  const field = `questCounters.${key}`;
  const uid = new Types.ObjectId(String(userId));
  try {
    if (cap == null) {
      await statsModel.updateOne(
        { userId: uid, date: day },
        { $inc: { [field]: n } },
        { upsert: true },
      );
      return true;
    }
    // 상한이 있으면 문서가 있을 때만 조건부로 올리고, 없으면 만든다
    const res = await statsModel.updateOne(
      {
        userId: uid,
        date: day,
        $or: [{ [field]: { $exists: false } }, { [field]: { $lt: cap } }],
      },
      { $inc: { [field]: n } },
    );
    if (res.modifiedCount) return true;
    const exists = await statsModel.exists({ userId: uid, date: day });
    if (exists) return false;
    await statsModel.updateOne(
      { userId: uid, date: day },
      { $setOnInsert: { [field]: Math.min(n, cap) } },
      { upsert: true },
    );
    return true;
  } catch {
    // 같은 순간 두 요청이 문서를 만들면 유니크 인덱스에 한쪽이 걸린다 — 무시
    return false;
  }
}
