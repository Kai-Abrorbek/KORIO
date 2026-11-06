import type {
  TopikAudio,
  TopikChoice,
  TopikStimulus,
  TopikTextBlock,
} from './schemas/topik-content.schema';

/**
 * 한 문제 묶음이 화면에 보여 주는 글 전부 (지문·문제·보기·듣기 대본).
 *
 * 단어 뜻보기는 **이 글에 실제로 있는 단어만** 처리한다 — 안 그러면 우리 OpenAI 키로
 * 도는 공짜 번역기가 된다. 문맥(말 = 말(馬)/말(言))을 가리는 데도 이 글을 쓴다.
 */
export function topikVisibleText(
  group: {
    sharedStimulus?: TopikStimulus | null;
    sharedAudio?: TopikAudio | null;
  } | null,
  questions: {
    prompt?: TopikTextBlock[];
    stimulus?: TopikStimulus | null;
    audio?: TopikAudio | null;
    choices?: TopikChoice[];
  }[],
): string {
  const parts: string[] = [];
  const blocks = (list?: TopikTextBlock[]) =>
    (list ?? []).forEach((block) =>
      parts.push(block.segments.map((segment) => segment.text).join('')),
    );
  const stimulus = (s?: TopikStimulus | null) => {
    if (!s) return;
    parts.push(s.title ?? '', s.subtitle ?? '');
    blocks(s.givenText);
    blocks(s.blocks);
    parts.push(...(s.bulletItems ?? []));
    (s.infoItems ?? []).forEach((item) => parts.push(item.label, item.value));
    (s.labeledSentences ?? []).forEach((sentence) => blocks(sentence.blocks));
    if (s.chart) {
      parts.push(
        s.chart.title ?? '',
        s.chart.subtitle ?? '',
        ...(s.chart.headers ?? []),
      );
      (s.chart.rows ?? []).forEach((row) =>
        parts.push(row.label, ...(row.values ?? [])),
      );
    }
  };
  const audio = (a?: TopikAudio | null) =>
    (a?.transcript ?? []).forEach((line) => parts.push(line.text));

  stimulus(group?.sharedStimulus);
  audio(group?.sharedAudio);
  for (const question of questions) {
    blocks(question.prompt);
    stimulus(question.stimulus);
    audio(question.audio);
    (question.choices ?? []).forEach((choice) => parts.push(choice.text));
  }
  return parts.filter(Boolean).join('\n');
}
