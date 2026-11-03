/**
 * TOPIK 장면 데이터 — 서버 시드(실제 기출)를 api 가 돌려주는 모양 그대로 바꿔 frames/topik-mocks.json 에 쓴다.
 * 촬영 때 mocks.mjs 의 topik* 장면이 이 파일을 읽는다 (커밋하지 않는다).
 *
 *   cd apps/api && pnpm exec ts-node -r tsconfig-paths/register ../../tools/promo-video/capture/topik-data/render.ts [--list]
 *   (시드가 Nest 스키마 데코레이터를 쓰므로 api 의 ts-node 로 돌린다 — tsx 는 데코레이터 메타데이터를 못 만든다. 이 폴더만 commonjs)
 *     --list : 힌트가 두 단계 이상인 읽기 문제 후보를 보여 준다
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as seeds from "../../../../apps/api/src/seed/data/topik";
import type { TopikExamSeed, TopikSeedQuestion } from "../../../../apps/api/src/seed/data/topik/topik-seed.types";

const all = Object.entries(seeds)
  .filter(([name, value]) => name.endsWith("_SEED") && value && typeof value === "object" && "exam" in (value as object))
  .map(([, value]) => value as TopikExamSeed);

const formatExam = (seed: TopikExamSeed) => ({
  id: seed.exam.code,
  code: seed.exam.code,
  title: seed.exam.title,
  description: seed.exam.description,
  examType: seed.exam.examType,
  section: seed.exam.section,
  year: seed.exam.year,
  round: seed.exam.round,
  durationMinutes: seed.exam.durationMinutes,
  totalQuestions: seed.exam.totalQuestions,
  totalPoints: seed.exam.totalPoints,
  listeningAudioUrl: seed.exam.listeningAudioUrl ?? "",
  version: seed.exam.version,
});
const formatQuestion = (q: TopikSeedQuestion) => ({
  id: q.code,
  code: q.code,
  number: q.number,
  order: q.order,
  type: q.type,
  responseType: q.responseType,
  points: q.points,
  prompt: q.prompt,
  stimulus: q.stimulus ?? null,
  audio: q.audio ?? null,
  writingConfig: q.writingConfig ?? null,
  choices: q.choices,
  presentation: q.presentation,
  tags: q.tags,
  difficulty: q.difficulty,
  version: q.version,
});
const session = (seed: TopikExamSeed, from: number, to: number) => ({
  exam: formatExam(seed),
  range: { from, to },
  groups: seed.groups
    .filter((g) => g.startNumber <= to && g.endNumber >= from)
    .map((g) => ({
      id: g.code,
      code: g.code,
      order: g.order,
      startNumber: g.startNumber,
      endNumber: g.endNumber,
      instruction: g.instruction,
      sharedStimulus: g.sharedStimulus ?? null,
      sharedAudio: g.sharedAudio ?? null,
      pointsPerQuestion: g.pointsPerQuestion,
      presentation: g.presentation,
      questions: seed.questions.filter((q) => q.groupCode === g.code && q.number >= from && q.number <= to).map(formatQuestion),
    })),
});
const find = (code: string) => {
  const seed = all.find((s) => s.exam.code === code);
  if (!seed) throw new Error(`no seed ${code} (have: ${all.map((s) => s.exam.code).join(", ")})`);
  return seed;
};

if (process.argv.includes("--list")) {
  for (const seed of all.filter((s) => s.exam.section === "reading" && s.exam.examType === "topik_ii")) {
    for (const q of seed.questions) {
      const hints = q.solution?.hints?.length ?? 0;
      const clues = q.solution?.keyClues?.length ?? 0;
      if (hints >= 2) console.log(`${seed.exam.code} q${q.number} ${q.type} hints=${hints} clues=${clues} stim=${q.stimulus?.kind ?? "-"} prompt=${JSON.stringify(q.prompt).length}`);
    }
  }
  process.exit(0);
}

const exams = all.map(formatExam).sort((a, b) => (b.round ?? 0) - (a.round ?? 0));
const pick = (code: string, number: number) => {
  const seed = find(code);
  const q = seed.questions.find((x) => x.number === number);
  if (!q) throw new Error(`no q${number} in ${code}`);
  return { seed, q };
};
const READING = process.env.TOPIK_READING ?? "topik-ii-reading-102-2025";
const READING_Q = Number(process.env.TOPIK_READING_Q ?? 9);
const LISTENING = process.env.TOPIK_LISTENING ?? "topik-ii-listening-102-2025";
const LISTENING_Q = Number(process.env.TOPIK_LISTENING_Q ?? 5);
const WRITING = process.env.TOPIK_WRITING ?? "topik-ii-writing-102-2025";

const reading = pick(READING, READING_Q);
const listening = pick(LISTENING, LISTENING_Q);
const writing = find(WRITING);
const hintsOf = (q: TopikSeedQuestion) => q.solution?.hints ?? [];
const learning = (q: TopikSeedQuestion, revealed: number, solution = false) => {
  const hints = hintsOf(q);
  const next = hints[revealed];
  return {
    questionId: q.code,
    hintCount: hints.length,
    revealedHints: hints.slice(0, revealed),
    nextHint: next ? { key: next.key, level: next.level, title: next.title } : null,
    hintViewCount: revealed,
    canRevealSolution: true,
    solutionViewedAt: solution ? "2026-10-22T05:00:30.000Z" : null,
  };
};
const solution = (q: TopikSeedQuestion, selected: string) => ({
  questionId: q.code,
  selectedChoiceKey: selected,
  correctChoiceKey: q.correctChoiceKey,
  isCorrect: selected === q.correctChoiceKey,
  solution: q.solution,
  viewedAt: "2026-10-22T05:00:30.000Z",
});
// 결과 화면 — 실제 문제 50개에 그럴듯한 정답 · 오답을 섞는다 (8개 틀림)
const resultFor = (seed: TopikExamSeed, wrongNumbers: number[]) => {
  const questions = seed.questions.map((q) => {
    const wrong = wrongNumbers.includes(q.number);
    const other = q.choices.find((c) => c.key !== q.correctChoiceKey)?.key ?? q.correctChoiceKey;
    return { questionId: q.code, number: q.number, selectedChoiceKey: wrong ? other : q.correctChoiceKey, correctChoiceKey: q.correctChoiceKey, isCorrect: !wrong, solution: q.solution };
  });
  const correct = questions.filter((q) => q.isCorrect).length;
  return {
    attemptId: "promo-attempt",
    examId: seed.exam.code,
    examCode: seed.exam.code,
    examType: seed.exam.examType,
    section: seed.exam.section,
    mode: "mock_exam",
    status: "submitted",
    correctCount: correct,
    totalQuestions: questions.length,
    score: correct * 2,
    elapsedSeconds: 61 * 60 + 24,
    submittedAt: "2026-10-22T16:40:00.000Z",
    questions,
  };
};

const out = {
  exams,
  reading: { session: session(reading.seed, reading.q.number, reading.q.number), question: reading.q.code, correct: reading.q.correctChoiceKey, hintKeys: hintsOf(reading.q).map((h) => h.key), learning: [0, 1, 2, 3].map((n) => learning(reading.q, Math.min(n, hintsOf(reading.q).length))), solution: solution(reading.q, reading.q.correctChoiceKey) },
  readingMock: session(reading.seed, 1, reading.seed.exam.totalQuestions),
  listening: {
    session: session(listening.seed, 1, listening.seed.exam.totalQuestions),
    question: listening.q.code,
    number: listening.q.number,
    correct: listening.q.correctChoiceKey,
    learning: [0, 1, 2, 3].map((n) => learning(listening.q, Math.min(n, hintsOf(listening.q).length))),
    solution: solution(listening.q, listening.q.correctChoiceKey),
  },
  writing: session(writing, 51, 54),
  // 쓰기 53번 — 모범 답안 · 채점 기준을 여는 장면
  writingSolutions: Object.fromEntries(writing.questions.map((q) => [q.code, solution(q, "")])),
  result: resultFor(reading.seed, [7, 12, 18, 23, 31, 36, 44, 49]),
};
mkdirSync(join(__dirname, "..", "..", "frames"), { recursive: true });
writeFileSync(join(__dirname, "..", "..", "frames", "topik-mocks.json"), JSON.stringify(out));
console.log(`exams ${exams.length} · reading ${READING} q${READING_Q} hints=${hintsOf(reading.q).length} · listening ${LISTENING} q${LISTENING_Q} · writing ${WRITING}`);
