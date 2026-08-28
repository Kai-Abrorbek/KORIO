import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from '../app.module';
import { UserStats } from '../users/schemas/user-stats.schema';
import { User } from '../users/schemas/user.schema';
import { dayKey, startOfDay, resolveTimezone } from '../common/date.util';

/**
 * UserStats.date 를 유저 시간대 자정으로 다시 찍는다. 한 번만 돌리면 된다.
 *
 * 예전에는 서버가 KST 로 고정돼 있어서 하루 경계가 KST 자정(= 전날 15:00 UTC)
 * 이었다. 이제 유저 시간대 자정으로 자르므로(타슈켄트면 전날 19:00 UTC) 같은
 * 날짜인데 마커가 다르다. 그대로 두면
 *   - 통계·히트맵 조회 범위와 기존 행이 어긋나고
 *   - { userId, date } 유니크 인덱스 때문에 같은 날 행이 두 개 생긴다.
 *
 * 옮길 때 "그 행이 원래 어느 달력 날짜였나"는 **KST 기준**으로 읽는다.
 * 그렇게 찍혔던 값이기 때문이다. 그 날짜를 유저 시간대 자정으로 다시 찍는다.
 *
 * 같은 날짜 행이 이미 있으면(두 번 돌렸거나 경계에서 겹쳤을 때) 숫자를 합치고
 * 원본을 지운다.
 */
/**
 * categoryCounts 를 [키, 값] 쌍으로 편다.
 *
 * 스키마 타입은 Map 인데 `.lean()` 은 평범한 객체로 돌려준다. 타입만 믿고
 * 캐스팅하면 컴파일이 막히고, 런타임만 믿고 Object.entries 를 쓰면 lean 을
 * 안 쓰는 호출에서 빈 배열이 나온다. 둘 다 받는다.
 */
function countEntries(value: unknown): [string, number][] {
  if (!value) return [];
  const source: [unknown, unknown][] =
    value instanceof Map
      ? [...value.entries()]
      : Object.entries(value as Record<string, unknown>);

  const pairs: [string, number][] = [];
  for (const [k, v] of source) pairs.push([String(k), Number(v) || 0]);
  return pairs;
}

async function migrate() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const statsModel = app.get<Model<UserStats>>(getModelToken(UserStats.name));
  const userModel = app.get<Model<User>>(getModelToken(User.name));

  console.log('🕓 UserStats 날짜를 유저 시간대로 다시 찍는다...');

  const users = await userModel.find().select('_id timezone').lean();
  let moved = 0;
  let merged = 0;
  let same = 0;

  for (const u of users) {
    const tz = resolveTimezone(u.timezone);
    const rows = await statsModel.find({ userId: u._id }).lean();

    for (const row of rows) {
      // 원래 찍힐 때 기준이던 KST 로 달력 날짜를 읽는다
      const calendarDay = dayKey(row.date, 'Asia/Seoul');
      // 그 날짜의 유저 시간대 자정. 정오를 거쳐 잡아야 부호에 안 흔들린다
      const target = startOfDay(new Date(`${calendarDay}T12:00:00Z`), tz);

      if (target.getTime() === new Date(row.date).getTime()) {
        same++;
        continue;
      }

      const clash = await statsModel.findOne({ userId: u._id, date: target });
      if (clash) {
        const inc: Record<string, number> = {
          studyTimeSeconds: row.studyTimeSeconds || 0,
          totalQuestions: row.totalQuestions || 0,
          correctQuestions: row.correctQuestions || 0,
          xpEarned: row.xpEarned || 0,
        };
        for (const [k, v] of countEntries(row.categoryCounts)) {
          inc[`categoryCounts.${k}`] = v;
        }
        await statsModel.updateOne({ _id: clash._id }, { $inc: inc });
        await statsModel.deleteOne({ _id: row._id });
        merged++;
      } else {
        await statsModel.updateOne({ _id: row._id }, { $set: { date: target } });
        moved++;
      }
    }
  }

  console.log(
    `✅ 완료 — 옮김 ${moved}건, 기존 행에 합침 ${merged}건, 그대로 ${same}건`,
  );
  await app.close();
}

migrate().catch((err) => {
  console.error('❌ 이관 실패:', err);
  process.exit(1);
});
