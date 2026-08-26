/**
 * 순서 섞기.
 *
 * 시드는 문제와 보기를 사람이 읽기 좋은 순서로 적어 둔다(정답이 첫 칸, 빈칸 →
 * 조립 순). 그대로 내보내면 두 번째 풀 때부터 자리로 답을 외운다.
 */

/** Fisher-Yates. 원본은 건드리지 않는다. */
export function shuffle<T>(list: readonly T[]): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * 문법 레슨 문제 순서.
 *
 * 유형을 통째로 섞으면 빈칸이 다섯 개 연달아 나온다. 유형은 번갈아 두고
 * 유형 안쪽만 섞어서, 리듬은 그대로 두고 어떤 문항이 올지는 매번 다르게 한다.
 */
export function shuffleGrammarQuestions<T extends { type: string }>(
  questions: readonly T[],
): T[] {
  const blank = shuffle(questions.filter((q) => q.type === "grammar_blank"));
  const build = shuffle(questions.filter((q) => q.type === "grammar_build"));
  const rest = questions.filter(
    (q) => q.type !== "grammar_blank" && q.type !== "grammar_build",
  );
  if (!blank.length || !build.length) return shuffle(questions);

  const out: T[] = [];
  for (let i = 0; i < Math.max(blank.length, build.length); i++) {
    if (blank[i]) out.push(blank[i]);
    if (build[i]) out.push(build[i]);
  }
  return [...out, ...shuffle(rest)];
}
