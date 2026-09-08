/**
 * 게임 단어 고르기 + 끝말잇기 규칙.
 *
 * 두음법칙이 제일 위험하다. 빼먹으면 유저가 맞는 답을 냈는데 틀렸다고
 * 나온다 — 한국어를 아는 사람에게 그건 그냥 버그로 보인다.
 *
 * 실행: npx ts-node src/__scratch/game-words.test.ts
 */
import {
  allowedStarts,
  isPlayable,
  precheckChainWord,
} from '../words/game-words.util';

let fail = 0;
const say = (ok: boolean, msg: string) => {
  if (!ok) fail++;
  console.log(`${ok ? '✅' : '❌'} ${msg}`);
};

const M = { uz: 'sut', en: 'milk', ru: 'молоко', ko: '우유' };

// ── 게임 판에 올릴 수 있는 단어 ────────────────────────────────
say(isPlayable('우유', 5, M), '평범한 단어는 통과');
say(!isPlayable('', 5, M), '빈 문자열 제외');
say(!isPlayable('아주아주긴단어입니다', 5, M), '너무 길면 카드에서 잘린다');
say(!isPlayable('학교 가다', 5, M), '띄어쓰기 있으면 한 낱말이 아니다');
say(!isPlayable('안녕하세요.', 5, M), '문장부호 있으면 제외');
say(!isPlayable('K팝', 5, M), '라틴 문자 섞이면 제외');
say(!isPlayable('123', 5, M), '숫자 제외');
say(!isPlayable('우유', 5, { en: 'milk' }), '뜻이 하나뿐이면 문제를 못 만든다');
say(isPlayable('우유', 5, { uz: 'sut', en: 'milk' }), '뜻 둘이면 통과');
say(isPlayable('우유', 5, { uz: ' ', en: 'milk', ru: 'молоко' }), '공백뿐인 뜻은 안 센다');

// ── 두음법칙 ─────────────────────────────────────────────────
{
  const a = allowedStarts('랑');
  say(a.includes('랑'), '원래 글자는 당연히 된다');
  say(a.includes('낭'), 'ㄹ → ㄴ (사랑 → 낭만)');
}
{
  const a = allowedStarts('력');
  say(a.includes('역'), 'ㄹ + ㅕ → ㅇ (능력 → 역사)');
  say(a.includes('녁'), 'ㄹ → ㄴ 도 같이');
}
{
  const a = allowedStarts('뇨');
  say(a.includes('요'), 'ㄴ + ㅛ → ㅇ');
}
say(allowedStarts('가').length === 1, '두음법칙과 무관한 글자는 하나뿐');
say(allowedStarts('').length === 0, '빈 값이어도 안 터진다');
say(allowedStarts('a').length === 0, '한글이 아니면 빈 배열');

// ── 끝말잇기 사전 검사 ────────────────────────────────────────
say(precheckChainWord('사과', null, []).ok, '첫 단어는 아무거나 된다');
say(precheckChainWord('과일', '사과', []).ok, '끝 글자로 시작하면 통과');
say(
  precheckChainWord('바나나', '사과', []).reason === 'WRONG_START',
  '끝 글자로 시작 안 하면 거절',
);
say(
  precheckChainWord('낭만', '사랑', []).ok,
  '두음법칙을 인정한다 (사랑 → 낭만)',
);
say(
  precheckChainWord('역사', '능력', []).ok,
  '두음법칙 ㅇ 변형도 인정 (능력 → 역사)',
);
say(
  precheckChainWord('사과', '수사', ['사과']).reason === 'ALREADY_USED',
  '이미 쓴 단어는 거절',
);
say(precheckChainWord('가', null, []).reason === 'TOO_SHORT', '한 글자는 거절');
say(
  precheckChainWord('apple', null, []).reason === 'NOT_HANGUL',
  '한글이 아니면 거절',
);
say(precheckChainWord('  사과  ', null, []).ok, '앞뒤 공백은 다듬는다');
say(
  precheckChainWord('과일', '사과', ['수박', '박수']).ok,
  '다른 단어를 썼어도 이건 통과',
);

console.log(fail ? `\n❌ ${fail}건 실패` : '\n🎉 전부 통과');
process.exit(fail ? 1 : 0);
