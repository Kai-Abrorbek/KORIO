/**
 * 정답 판정.
 *
 * 기존엔 `answer.trim().toLowerCase() === q.answer.trim().toLowerCase()` 였다.
 * 한국어에서 toLowerCase 는 아무 일도 안 하고, 띄어쓰기나 마침표가 하나만
 * 달라도 오답 처리돼 학습자가 억울하게 틀린다. 그래서 표기 차이를 걷어내고
 * 비교한다.
 */

import type { LessonQuestion } from "@/types/lesson";
import { fillTemplate, parseBlanks, templateOf } from "./blank-sentence";

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

/**
 * 문제 하나의 채점.
 *
 * 레슨 화면과 레벨 테스트가 각자 채점을 들고 있다가 서로 어긋났었다.
 * (레벨 테스트는 audio_match 를 항상 오답 처리하고 다중 빈칸도 못 봤다)
 * 타입별 규칙은 여기 한 군데만 둔다.
 */
export function gradeAnswer(answer: string, q: LessonQuestion): boolean {
  // 화면 안에서 이미 채점이 끝난 타입들 — 여기선 결과만 받는다
  if (
    q.type === "word_matching" ||
    q.type === "audio_match" ||
    q.type === "dialog_order"
  ) {
    return answer === "all_correct";
  }

  // STT 연결 전까지 발화는 항상 통과시킨다
  if (q.type === "speaking") return true;

  // 지문 빈칸: 채운 단어를 순서대로 `|` 로 이어 받는다.
  // 시드는 blankAnswers 만 적으면 되고 answer 는 비워둬도 된다.
  if (q.type === "cloze_passage") {
    const expected = q.blankAnswers?.length
      ? q.blankAnswers.join("|")
      : q.answer;
    return isAnswerCorrect(answer, expected, q.acceptedAnswers);
  }

  // 다중 빈칸: 빈칸별 정답을 템플릿에 채운 완성 문장이 기준.
  // 시드에 answer 를 따로 중복해서 적지 않아도 된다.
  if (q.blankAnswers?.length) {
    const expected = fillTemplate(parseBlanks(templateOf(q)), q.blankAnswers);
    return isAnswerCorrect(answer, expected, q.acceptedAnswers);
  }

  // 띄어쓰기·문장부호 차이로 억울하게 틀리지 않도록 정규화 후 비교
  return isAnswerCorrect(answer, q.answer, q.acceptedAnswers);
}
