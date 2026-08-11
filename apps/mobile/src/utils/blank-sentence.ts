import { LessonQuestion } from "@/types/lesson";

/** 빈칸 자리를 나타내는 토큰. 시드에는 `___` (언더바 3개 이상) 으로 적는다 */
const BLANK_RE = /_{3,}/g;

export type BlankToken =
  | { type: "text"; value: string }
  | { type: "blank"; index: number };

/**
 * `Oh, ___ a ___ .` → [text, blank(0), text, blank(1), text]
 *
 * 빈칸 개수 제한이 없다. 앞뒤 조각(sentencePrefix/Suffix)으로 나눠 담던
 * 기존 방식은 조각이 3개로 고정이라 빈칸이 하나뿐이었다.
 */
export function parseBlanks(template: string): BlankToken[] {
  const tokens: BlankToken[] = [];
  let last = 0;
  let index = 0;

  BLANK_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = BLANK_RE.exec(template)) !== null) {
    if (m.index > last) {
      tokens.push({ type: "text", value: template.slice(last, m.index) });
    }
    tokens.push({ type: "blank", index: index++ });
    last = m.index + m[0].length;
  }
  if (last < template.length) {
    tokens.push({ type: "text", value: template.slice(last) });
  }
  // 빈칸이 하나도 없으면 문장 끝에 하나 붙여준다 (데이터 실수 방어)
  if (index === 0) tokens.push({ type: "blank", index: 0 });

  return tokens;
}

/**
 * 문항에서 템플릿 문자열을 얻는다.
 * `sentenceTemplate` 이 있으면 그대로 쓰고, 없으면 기존
 * `sentencePrefix + ___ + sentenceSuffix` 를 조립해 같은 경로로 태운다.
 * 덕분에 기존 825 문항은 손대지 않아도 그대로 돈다.
 */
export function templateOf(question: LessonQuestion): string {
  if (question.sentenceTemplate?.trim()) return question.sentenceTemplate;

  const prefix = question.sentencePrefix ?? "";
  const suffix = question.sentenceSuffix ?? "";
  if (!prefix && !suffix) return "___";
  return `${prefix}___${suffix}`;
}

export function blankCount(tokens: BlankToken[]): number {
  return tokens.reduce((n, tk) => (tk.type === "blank" ? n + 1 : n), 0);
}

/** 슬롯 값을 끼워 넣어 완성 문장을 만든다 */
export function fillTemplate(
  tokens: BlankToken[],
  values: (string | null)[],
): string {
  return tokens
    .map((tk) => (tk.type === "text" ? tk.value : (values[tk.index] ?? "")))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * 빈칸별 정답.
 * `blankAnswers` 가 있으면 그대로, 없으면 단일 빈칸이므로 `answer` 하나.
 */
export function answersOf(question: LessonQuestion): string[] {
  if (question.blankAnswers?.length) return question.blankAnswers;
  return [question.answer ?? ""];
}

/**
 * 채점용 문자열.
 * 빈칸이 여러 개면 완성된 문장으로 합쳐서 넘긴다. 서버가 기대하는
 * `answer` 도 완성 문장 형태이므로 단일 빈칸일 때와 규칙이 같다.
 */
export function toAnswerPayload(
  question: LessonQuestion,
  tokens: BlankToken[],
  values: (string | null)[],
): string {
  // blankAnswers 를 쓰는 문항은 빈칸이 하나여도 완성 문장으로 비교한다.
  // (채점 쪽도 blankAnswers 를 채운 문장을 정답으로 삼으므로 규칙이 같아야 한다)
  if (question.blankAnswers?.length) return fillTemplate(tokens, values);
  // 기존 문항은 지금까지처럼 값 하나만 넘긴다
  if (blankCount(tokens) <= 1) return (values[0] ?? "").trim();
  return fillTemplate(tokens, values);
}

/** 모든 빈칸이 찼는지 */
export function isComplete(
  tokens: BlankToken[],
  values: (string | null)[],
): boolean {
  const n = blankCount(tokens);
  for (let i = 0; i < n; i++) {
    if (!values[i]?.trim()) return false;
  }
  return true;
}
