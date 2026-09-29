/**
 * 조립형 문제(sentence_builder · translate_builder · reply_builder · word_arrange)의 칩 정리.
 *
 * 시드에 두 가지 문제가 섞여 있다.
 *  1) 칩 하나에 어절을 여러 개 넣은 문제 ("여기 규칙을", "하나 물어봐도 돼요?").
 *     칩 폭이 제각각이라 화면이 깨지고, 덩어리째 맞추면 돼서 너무 쉽다.
 *  2) 칩을 다 써도 정답을 못 만드는 문제 (칩이 하나 모자라거나 어미가 빠짐).
 *     어떻게 눌러도 오답이다.
 *
 * 내려주기 직전에 둘 다 고친다: 정답 칩은 어절 단위로 쪼개고, 오답 덩어리는
 * 정답에 없는 마지막 어절 하나만 남긴다 (보통 서술어 — "규칙을 만들어요" → "만들어요").
 * 이미 멀쩡한 문제(칩에 공백이 없고 정답을 만들 수 있음)는 손대지 않는다.
 * "휴대폰" + "이에요" 처럼 어절보다 잘게 쪼갠 칩은 채점이 공백을 무시하니 그대로 둔다.
 */

const squash = (text: string) => text.replace(/\s+/g, '');

/**
 * 칩 일부를 골라 이어 붙여 정답(공백 무시)을 만들 수 있으면, 쓴 칩의 위치를 돌려준다.
 * 못 만들면 null.
 */
export function composeAnswer(
  options: string[],
  answer: string,
): number[] | null {
  const target = squash(answer);
  const chips = options.map(squash);
  if (!target) return null;
  const used = new Array<boolean>(chips.length).fill(false);
  const picked: number[] = [];
  const failed = new Set<string>(); // 같은 상태를 두 번 뒤지지 않게

  const dfs = (at: number): boolean => {
    if (at === target.length) return true;
    const state = `${at}|${used.map((u) => (u ? 1 : 0)).join('')}`;
    if (failed.has(state)) return false;
    const tried = new Set<string>();
    for (let i = 0; i < chips.length; i += 1) {
      const chip = chips[i];
      if (used[i] || !chip || tried.has(chip)) continue;
      if (!target.startsWith(chip, at)) continue;
      tried.add(chip);
      used[i] = true;
      picked.push(i);
      if (dfs(at + chip.length)) return true;
      used[i] = false;
      picked.pop();
    }
    failed.add(state);
    return false;
  };

  return dfs(0) ? picked : null;
}

/** 조립형 칩을 "칩 하나 = 어절 하나, 정답을 만들 수 있음" 상태로 맞춘다 */
export function normalizeBuilderChips(
  options: string[],
  answer: string,
): string[] {
  const chips = options.map((o) => o.trim()).filter(Boolean);
  const answerText = (answer ?? '').trim();
  if (!chips.length || !answerText) return options;

  const multiWord = chips.some((c) => /\s/.test(c));
  const picked = composeAnswer(chips, answerText);
  if (!multiWord && picked) return options;

  const answerWords = answerText.split(/\s+/);
  const answerSet = new Set(answerWords);
  const usedIdx = new Set(picked ?? []);

  // 정답 칩: 쪼갤 수 있으면 원래 칩을 쪼개고, 못 만드는 문제면 정답 어절을 그대로 쓴다
  const base = picked
    ? picked.flatMap((i) => chips[i]!.split(/\s+/))
    : answerWords;

  const distractors: string[] = [];
  chips.forEach((chip, i) => {
    if (usedIdx.has(i)) return;
    const words = chip.split(/\s+/).filter((w) => !answerSet.has(w));
    const last = words[words.length - 1];
    if (last && !distractors.includes(last)) distractors.push(last);
  });

  return [...base, ...distractors];
}
