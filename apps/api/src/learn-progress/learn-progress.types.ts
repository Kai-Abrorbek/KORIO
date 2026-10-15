import type { LearnCourse, LearnMode } from '../users/learn-mode.constants';

/**
 * 홈 카드의 "어디까지 왔나".
 *
 * 모드마다 콘텐츠 단위가 달라서 하나의 숫자로 뭉개지 않고, 무엇을 몇 개 중 몇 개 했는지를
 * 같이 내려준다. 화면은 scope·unit 을 번역 키로 바꿔서 그대로 그린다 —
 *   section 2 · 12/40 lesson   →  "2-bo'lim · 12/40 dars"
 *   topic "Kafeda" · 3/12 expression → "Kafeda · 3/12 ibora"
 */
export type LearnProgressScope =
  /** 로드맵 섹션 (어휘·문법 문제 풀이 자율 로드맵, 문법 설명 목록) */
  | 'section'
  /** 급수 (학습 로드의 급, 읽기·듣기 급) */
  | 'level'
  /** 주제 (표현·말하기). title 에 주제 이름이 온다 */
  | 'topic'
  /** TOPIK I / II */
  | 'topik';

export type LearnProgressUnit =
  | 'lesson'
  | 'day'
  | 'grammar'
  | 'expression'
  | 'sentence'
  | 'reading'
  | 'exam';

export interface LearnProgress {
  course: LearnCourse;
  mode: LearnMode;
  scope: LearnProgressScope;
  /** 섹션·급 번호, TOPIK 1|2, 주제는 순번(1부터) */
  scopeNumber: number;
  /** 주제 이름 (topic 만). 요청한 lang 으로 */
  title: string | null;
  unit: LearnProgressUnit;
  done: number;
  total: number;
  /**
   * 링에 그릴 값 0~100. 보통 floor(done/total) 이고, 끝내야만 100 이다.
   * 표현처럼 한 항목을 여러 번 봐야 익히는 모드는 반쯤 본 것까지 쳐서 done/total 보다 앞설 수 있다.
   */
  percent: number;
}

/** 코스·모드를 뺀 측정값 — 모드별 계산기가 돌려준다 */
export type LearnMeasure = Omit<LearnProgress, 'course' | 'mode'>;
