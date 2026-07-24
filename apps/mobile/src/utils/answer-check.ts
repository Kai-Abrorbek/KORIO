/**
 * 정답 판정.
 *
 * 기존엔 `answer.trim().toLowerCase() === q.answer.trim().toLowerCase()` 였다.
 * 한국어에서 toLowerCase 는 아무 일도 안 하고, 띄어쓰기나 마침표가 하나만
 * 달라도 오답 처리돼 학습자가 억울하게 틀린다. 그래서 표기 차이를 걷어내고
 * 비교한다.
 */

/** 비교용 정규화 — 표기 차이만 지우고 의미는 건드리지 않는다 */
export function normalizeAnswer(raw: string): string {
  return (raw ?? "")
    .normalize("NFC") // 한글 자모 조합 형태 통일
    .toLowerCase() // 영문 답변 대응
    .replace(/[.,!?~"'`·…""'']/g, "") // 문장부호 제거
    .replace(/\s+/g, "") // 공백 전부 제거 (띄어쓰기 차이 허용)
    .trim();
}

/**
 * 정답 여부.
 * answer 와 acceptedAnswers 중 하나라도 맞으면 정답으로 본다.
 */
export function isAnswerCorrect(
  input: string,
  answer?: string,
  acceptedAnswers?: string[],
): boolean {
  const got = normalizeAnswer(input);
  if (!got) return false;

  const candidates = [answer, ...(acceptedAnswers ?? [])].filter(
    (c): c is string => !!c,
  );

  return candidates.some((c) => normalizeAnswer(c) === got);
}
