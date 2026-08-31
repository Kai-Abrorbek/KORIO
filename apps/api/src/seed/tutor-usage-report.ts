/**
 * 모델별 튜터 사용량·추정 원가 리포트.
 *
 * 모델을 바꿔가며 품질을 비교할 때, 체감만으로는 "얼마나 더 비싼가"를
 * 알 수 없다. TutorSession.model 에 어떤 모델로 돌았는지 남겨두므로
 * 여기서 갈라 본다.
 *
 *   pnpm --filter api tutor:usage
 */
import { config } from 'dotenv';
import { connect, connection } from 'mongoose';

config();

/** 실측 기반 분당 원가 추정 (USD) */
const COST_PER_MIN: Record<string, number> = {
  'gpt-realtime-2.1': 0.2,
  'gpt-realtime-2': 0.2,
  'gpt-realtime-1.5': 0.18,
  'gpt-realtime-2.1-mini': 0.065,
  'gpt-realtime-mini': 0.065,
};

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI 가 없다');
  await connect(uri);

  const rows = await connection
    .collection('tutorsessions')
    .aggregate([
      {
        $group: {
          _id: { model: '$model', mode: '$mode' },
          sessions: { $sum: 1 },
          totalSec: { $sum: '$durationSec' },
          users: { $addToSet: '$userId' },
        },
      },
      { $sort: { totalSec: -1 } },
    ])
    .toArray();

  if (!rows.length) {
    console.log('아직 기록된 세션이 없다.');
    await connection.close();
    return;
  }

  console.log('\n📊 모델별 튜터 사용량\n');
  console.log(
    '모델'.padEnd(24) +
      '모드'.padEnd(16) +
      '세션'.padStart(6) +
      '유저'.padStart(6) +
      '분'.padStart(9) +
      '추정원가'.padStart(12),
  );
  console.log('─'.repeat(74));

  let grandMin = 0;
  let grandCost = 0;
  for (const r of rows) {
    const model = r._id.model ?? '(미기록)';
    const min = r.totalSec / 60;
    const cost = min * (COST_PER_MIN[model] ?? 0);
    grandMin += min;
    grandCost += cost;
    console.log(
      String(model).padEnd(24) +
        String(r._id.mode ?? '-').padEnd(16) +
        String(r.sessions).padStart(6) +
        String(r.users.length).padStart(6) +
        min.toFixed(1).padStart(9) +
        `$${cost.toFixed(2)}`.padStart(12),
    );
  }
  console.log('─'.repeat(74));
  console.log(
    '합계'.padEnd(40) +
      '' .padStart(12) +
      grandMin.toFixed(1).padStart(9) +
      `$${grandCost.toFixed(2)}`.padStart(12),
  );

  // 유저 한 명이 하루 20분(구독 한도)을 매일 채웠을 때의 월 원가
  console.log('\n💸 유저 1명이 한도를 꽉 채웠을 때 월 원가 (구독 200분/월 기준)');
  for (const [model, per] of Object.entries(COST_PER_MIN)) {
    if (model === 'gpt-realtime-mini') continue; // deprecated
    console.log(`   ${model.padEnd(24)} $${(200 * per).toFixed(2)} / 월`);
  }
  console.log('   ※ 구독료가 월 $4~10 이라는 걸 같이 놓고 볼 것\n');

  await connection.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
