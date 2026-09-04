import { decideEngagement } from '../push/push-scheduler.service';
import { PushType } from '../push/push.types';
import { buildCopy } from '../push/push-copy';
import { PUSH_LANGS } from '../push/push.types';

let fail = 0;
function eq(name: string, got: any, want: any) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) fail++;
  console.log(`${ok ? '✅' : '❌'} ${name}${ok ? '' : `  got=${JSON.stringify(got)} want=${JSON.stringify(want)}`}`);
}
const T = (i: any) => decideEngagement(i)?.type ?? null;

// 기본: reminderHour 20 → 재미 슬롯은 12
eq('20시 알림설정 · 12시 → 재미유도', T({ hour: 12, reminderHour: 20, idleDays: 1 }), PushType.ENGAGE);
eq('20시 알림설정 · 20시 → 학습알림', T({ hour: 20, reminderHour: 20, idleDays: 1 }), PushType.DAILY_REMINDER);
eq('슬롯 아닌 시각(15시) → 없음', T({ hour: 15, reminderHour: 20, idleDays: 1 }), null);

// 아침형: reminderHour 9 → 재미 슬롯은 20
eq('9시 알림설정 · 9시 → 학습알림', T({ hour: 9, reminderHour: 9, idleDays: 1 }), PushType.DAILY_REMINDER);
eq('9시 알림설정 · 20시 → 재미유도', T({ hour: 20, reminderHour: 9, idleDays: 1 }), PushType.ENGAGE);
eq('9시 알림설정 · 12시 → 없음', T({ hour: 12, reminderHour: 9, idleDays: 1 }), null);

// 조용한 시간
eq('새벽 3시 → 없음', T({ hour: 3, reminderHour: 20, idleDays: 1 }), null);
eq('밤 23시 → 없음', T({ hour: 23, reminderHour: 20, idleDays: 1 }), null);
eq('새벽 3시로 설정해도 20시로 당겨짐', T({ hour: 20, reminderHour: 3, idleDays: 1 }), PushType.DAILY_REMINDER);
eq('새벽 3시로 설정 → 3시엔 안 감', T({ hour: 3, reminderHour: 3, idleDays: 1 }), null);

// 오늘 이미 공부함 → 아무것도 안 보냄
eq('오늘 학습함 · 학습알림 슬롯 → 없음', T({ hour: 20, reminderHour: 20, idleDays: 0 }), null);
eq('오늘 학습함 · 재미 슬롯 → 없음', T({ hour: 12, reminderHour: 20, idleDays: 0 }), null);

// 연속학습 위험 — MAX_GAP_DAYS(2) 일째, 마지막 슬롯에서만
eq('스트릭5 · 2일째 · 저녁(20시) → 스트릭위험', T({ hour: 20, reminderHour: 20, streak: 5, idleDays: 2 }), PushType.STREAK_RISK);
eq('스트릭5 · 2일째 · 낮(12시) → 스트릭위험 아님', T({ hour: 12, reminderHour: 20, streak: 5, idleDays: 2 }), PushType.ENGAGE);
eq('스트릭0 · 2일째 → 스트릭위험 아님', T({ hour: 20, reminderHour: 20, streak: 0, idleDays: 2 }), PushType.DAILY_REMINDER);
eq('스트릭5 · 1일째 → 아직 위험 아님', T({ hour: 20, reminderHour: 20, streak: 5, idleDays: 1 }), PushType.DAILY_REMINDER);
eq('스트릭5 · 5일째(이미 끊김) → 위험 아님', T({ hour: 20, reminderHour: 20, streak: 5, idleDays: 5 }), PushType.DAILY_REMINDER);

// 학습 로드(guided)
eq('로드학습 · 4일째 → 며칠째 알림', T({ hour: 20, reminderHour: 20, studyMode: 'guided', idleDays: 4 }), PushType.GUIDED_IDLE);
eq('로드학습 · 1일째 → 그냥 학습알림', T({ hour: 20, reminderHour: 20, studyMode: 'guided', idleDays: 1 }), PushType.DAILY_REMINDER);
eq('자율모드 · 4일째 → 재미유도', T({ hour: 12, reminderHour: 20, studyMode: 'free', idleDays: 4 }), PushType.ENGAGE);
eq('로드학습 · 스트릭2일째 → 스트릭이 먼저', T({ hour: 20, reminderHour: 20, studyMode: 'guided', streak: 7, idleDays: 2 }), PushType.STREAK_RISK);

// 학습 기록이 아예 없는 사람
eq('기록없음 · 학습알림 슬롯', T({ hour: 20, reminderHour: 20, idleDays: null }), PushType.DAILY_REMINDER);
eq('기록없음 · 로드학습이어도 며칠째는 안 씀', T({ hour: 20, reminderHour: 20, studyMode: 'guided', idleDays: null }), PushType.DAILY_REMINDER);

// 하루 두 슬롯이 같은 문장을 쓰지 않는지
const a = decideEngagement({ hour: 20, reminderHour: 20, idleDays: 1 })!;
const b = decideEngagement({ hour: 12, reminderHour: 20, idleDays: 1 })!;
eq('두 슬롯의 rotationShift 가 다름', a.rotationShift !== b.rotationShift, true);

// 문구 표: 4개 언어가 전부 채워져 있는지 + 보간이 남지 않는지
const TYPES = [
  PushType.FOLLOW, PushType.DAILY_REMINDER, PushType.ENGAGE,
  PushType.STREAK_RISK, PushType.GUIDED_IDLE, PushType.TRIAL_ENDING,
  PushType.LEAGUE_PROMOTED, PushType.LEAGUE_DEMOTED, PushType.LEAGUE_RESULT,
  PushType.ENERGY_FULL,
];
const params = { nickname: '지민', days: 3, streak: 7, rank: 2, gems: 50 };
let copyBad = 0;
for (const type of TYPES) {
  for (const lang of PUSH_LANGS) {
    for (let r = 0; r < 8; r++) {
      const c = buildCopy(type, lang, params, r);
      if (!c || !c.title || !c.body) { console.log(`❌ 문구 없음 ${type}/${lang}`); copyBad++; continue; }
      if (/\{\{|\}\}/.test(c.title + c.body)) { console.log(`❌ 보간 남음 ${type}/${lang}: ${c.title} / ${c.body}`); copyBad++; }
    }
  }
}
eq(`문구 표 ${TYPES.length}종 × 4언어 전부 채워짐`, copyBad, 0);

console.log(fail ? `\n💥 실패 ${fail}건` : '\n🎉 전부 통과');
process.exit(fail ? 1 : 0);
