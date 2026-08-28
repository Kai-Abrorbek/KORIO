import { useAuthStore } from "@/store/auth.store";
import type { Href } from "expo-router";

/**
 * 학습 로드로 들어갈 때 급수를 물어봐야 하는지.
 *
 * placementLevel 은 서버 기본값이 1 이라 "1급을 고른 사람"과 "아직 안 고른
 * 사람"을 구분하지 못한다. 그래서 서버가 별도로 내려주는 hasPickedLevel
 * (= placementLevelSetAt 이 있는지) 을 본다.
 *
 * 한 번 고르면 DB 에 남으므로 다음부터는 묻지 않고 바로 이어서 간다.
 * 급수를 바꾸고 싶으면 로드맵의 "급수 바꾸기" 로 언제든 갈 수 있다.
 */
export function hasPickedLevel(): boolean {
  return !!(useAuthStore.getState().user as any)?.hasPickedLevel;
}

/** 학습 로드의 목적지. 급수를 아직 안 골랐으면 고르는 화면부터. */
export function guidedEntryPath(): Href {
  return hasPickedLevel() ? "/study-path" : "/study-level";
}

/** 급수를 고른 뒤 로컬 유저에도 표시를 남긴다 (다음 getMe 전까지 다시 안 묻게) */
export function markLevelPicked(level: number) {
  useAuthStore
    .getState()
    .updateUser({ languageLevel: level, hasPickedLevel: true } as any);
}
