/**
 * 듣고 고르기(listening) 문제가 실제로 들려줄 말.
 *
 * 시드는 audioText 에 대화를 "여자: … 남자: …" 처럼 화자 표시와 함께 적는다.
 * 그 표시까지 읽으면 "여자 콜론" 이 들리니 빼고 읽는다.
 * audioText 가 없는 옛 문항만 정답 문장으로 대신한다.
 *
 * ⚠️ 예전 화면은 audioText 를 무시하고 **정답 문장**을 읽은 뒤 같은 문장을 고르게
 *    했다 — 들은 걸 그대로 찾는 찍기라 학습 효과가 없었다.
 */
const SPEAKER_LABEL = /(^|[\s.?!,])([가-힣A-Za-z]{1,4})\s*:\s*/g;

export function listeningScript(question: {
  audioText?: string;
  answer?: string;
}): string {
  const raw = (question.audioText || question.answer || "").trim();
  return raw.replace(SPEAKER_LABEL, "$1 ").replace(/\s+/g, " ").trim();
}
