/**
 * 레벨업 연출에 넘길 것 (텔레그램 features/level-up/model/level-up 과 같다).
 *
 * 띄우는 때:
 *   - 레슨으로 섹션을 다 끝냄 → 축하 화면(도장·스코어·상자)을 다 보고 로드맵/홈에 돌아왔을 때
 *   - 점프 테스트 합격으로 섹션을 넘음 → 바로
 *   - 학습 로드 졸업 시험 합격 → 바로 (끝나면 시험 결과 화면)
 *
 * 내용이 길어서(네 언어 제목·설명) 주소에 싣지 않고 여기 둔다 (앱이 켜져 있는 동안만).
 * 화면은 app/level-up (features/level-up/LevelUpScreen).
 */
import type { Href } from "expo-router";

export type LevelUpKind = "section" | "level" | "course";

/** 연출 화면 주소 (새 화면이라 타입드 라우트가 다음 빌드 전엔 모른다 — 캐스팅은 여기 한 곳) */
export const LEVEL_UP_ROUTE = "/level-up" as Href;

export interface LevelUpPayload {
  kind: LevelUpKind;
  /** 새 섹션·급 번호 (course 면 끝낸 마지막 섹션) */
  to: number;
  /** 떠난 섹션·급 */
  from?: number;
  /** 네 언어 제목·설명 (서버 meta). 없으면 화면이 기본 문구 */
  title?: Record<string, string> | null;
  description?: Record<string, string> | null;
  /** 끝나고 갈 곳. 없으면 뒤로 (로드맵·홈에서 띄운 경우) */
  next?: Href | null;
  /** 무엇으로 올라왔나 — 위쪽 안내 문구가 갈린다 */
  via?: "lesson" | "jump" | "exam";
}

/** api section-up.util SectionUp 과 같은 모양 */
export interface SectionUpResult {
  track: "vocabulary" | "grammar";
  from: number;
  to: number | null;
  meta: { title: Record<string, string>; description: Record<string, string> } | null;
}

export function payloadFromSectionUp(
  sectionUp: SectionUpResult,
  via: "lesson" | "jump",
  next?: Href | null,
): LevelUpPayload {
  return sectionUp.to === null
    ? { kind: "course", to: sectionUp.from, from: sectionUp.from, next, via }
    : {
        kind: "section",
        to: sectionUp.to,
        from: sectionUp.from,
        title: sectionUp.meta?.title ?? null,
        description: sectionUp.meta?.description ?? null,
        next,
        via,
      };
}

let current: LevelUpPayload | null = null;
let pending: LevelUpPayload | null = null;

/** 지금 띄울 연출 (연출 화면이 읽는다) */
export function setLevelUp(payload: LevelUpPayload) {
  current = payload;
}

export function currentLevelUp() {
  return current;
}

export function clearLevelUp() {
  current = null;
}

/** 축하 화면들이 끝난 뒤에 띄울 것 — 로드맵·홈이 돌아오면 꺼낸다 */
export function queueLevelUp(payload: LevelUpPayload) {
  pending = payload;
}

export function takeQueuedLevelUp() {
  const value = pending;
  pending = null;
  return value;
}
