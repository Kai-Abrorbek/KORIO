import type {
  LearnMeasure,
  LearnProgressScope,
  LearnProgressUnit,
} from './learn-progress.types';

/** 0~100. 끝내야만 100 이다 (39/40 은 97) */
export function toPercent(done: number, total: number): number {
  if (!(total > 0)) return 0;
  const clamped = Math.min(Math.max(done, 0), total);
  return Math.floor((clamped * 100) / total);
}

/** 콘텐츠가 없으면(total 0) null — 0% 링을 띄우면 고장 난 것처럼 보인다 */
export function measure(
  scope: LearnProgressScope,
  scopeNumber: number,
  unit: LearnProgressUnit,
  done: number,
  total: number,
  extra: { title?: string | null; percent?: number } = {},
): LearnMeasure | null {
  if (!(total > 0)) return null;
  const safeDone = Math.min(Math.max(done, 0), total);
  return {
    scope,
    scopeNumber,
    title: extra.title ?? null,
    unit,
    done: safeDone,
    total,
    percent: Math.min(
      100,
      Math.max(extra.percent ?? toPercent(safeDone, total), 0),
    ),
  };
}

/** 로드맵이 지금 보여 주는 섹션의 레슨 합계 (한글 첫 관문 노드는 1/1 로 들어 있다) */
export function sumRoadmapLessons(
  units: ReadonlyArray<{
    nodes: ReadonlyArray<{ completedLessons?: number; totalLessons?: number }>;
  }>,
): { done: number; total: number } {
  let done = 0;
  let total = 0;
  for (const unit of units) {
    for (const node of unit.nodes) {
      done += node.completedLessons ?? 0;
      total += node.totalLessons ?? 0;
    }
  }
  return { done, total };
}

/**
 * 문법 설명 목록의 "지금 섹션".
 * 목록은 섹션을 전부 열어 둬서 앞 섹션을 비워 두고 뒤에서 공부할 수 있다.
 * 그래서 첫 미완료 섹션이 아니라 **마지막으로 끝낸 문법의 섹션부터** 본다.
 * 그 섹션을 다 끝냈으면 그 뒤 첫 미완료 섹션, 뒤가 다 끝났으면 앞쪽 미완료 섹션.
 */
export function pickGrammarSection(
  rows: ReadonlyArray<{ code: string; section?: number | null }>,
  completed: readonly string[],
): { section: number; done: number; total: number } | null {
  if (!rows.length) return null;
  const doneSet = new Set(completed);
  const sectionOf = new Map<string, number>();
  const bySection = new Map<number, { done: number; total: number }>();
  for (const row of rows) {
    const section = row.section ?? 1;
    sectionOf.set(row.code, section);
    const bucket = bySection.get(section) ?? { done: 0, total: 0 };
    bucket.total += 1;
    if (doneSet.has(row.code)) bucket.done += 1;
    bySection.set(section, bucket);
  }
  const sections = [...bySection.keys()].sort((a, b) => a - b);
  let anchor = sections[0];
  for (let i = completed.length - 1; i >= 0; i--) {
    const section = sectionOf.get(completed[i]);
    if (section !== undefined) {
      anchor = section;
      break;
    }
  }
  const open = (section: number) => {
    const bucket = bySection.get(section);
    return !!bucket && bucket.done < bucket.total;
  };
  const section =
    sections.find((s) => s >= anchor && open(s)) ??
    sections.find(open) ??
    sections[sections.length - 1];
  const bucket = bySection.get(section) ?? { done: 0, total: 0 };
  return { section, ...bucket };
}

/**
 * 말하기 커서 → 이 주제에서 말한 문장 수.
 * 끝까지 마치면 서버가 커서를 0 으로 되돌리고 completedCount 를 올린다 — 그 상태는 "다 했음" 이다.
 */
export function speakingDone(
  row: { index?: number; completedCount?: number } | null | undefined,
  total: number,
): number {
  if (!row || !(total > 0)) return 0;
  const index = Math.max(0, Math.trunc(row.index ?? 0));
  if (index === 0 && (row.completedCount ?? 0) > 0) return total;
  return Math.min(index, total);
}

/**
 * 표현 로드맵의 "지금 주제" — 이어서 할 노드가 들어 있는 주제. 없으면 첫 주제.
 * 익힌 표현 수를 세고, 링은 노출 횟수로 그린다 (표현 하나를 3번 봐야 익힌 걸로 쳐서
 * 익힌 수만 쓰면 첫 바퀴 내내 0% 에 멈춰 있다).
 */
export function pickExpressionTopic<
  T extends {
    title: string;
    nodes: ReadonlyArray<{
      code: string;
      expressionCount: number;
      learnedExpressionCount: number;
      completedExposures: number;
      totalExposures: number;
    }>;
  },
>(
  topics: readonly T[],
  continueNodeCode: string | null | undefined,
): {
  index: number;
  title: string;
  learned: number;
  total: number;
  percent: number;
} | null {
  if (!topics.length) return null;
  const found = continueNodeCode
    ? topics.findIndex((topic) =>
        topic.nodes.some((node) => node.code === continueNodeCode),
      )
    : -1;
  const index = Math.max(0, found);
  const topic = topics[index];
  let learned = 0;
  let total = 0;
  let seen = 0;
  let needed = 0;
  for (const node of topic.nodes) {
    learned += node.learnedExpressionCount;
    total += node.expressionCount;
    seen += node.completedExposures;
    needed += node.totalExposures;
  }
  return {
    index,
    title: topic.title,
    learned,
    total,
    // 다 익히기 전엔 100 이 안 되게 (노출을 다 채웠는데 아직 익힘 판정 전인 틈)
    percent:
      learned >= total
        ? toPercent(learned, total)
        : Math.min(99, toPercent(seen, needed)),
  };
}
