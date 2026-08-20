/**
 * 현재 학습 중인 모드를 다루는 한 곳.
 *
 * 진실의 출처는 서버(유저 문서)다. 로컬 스토어는 화면이 즉시 반응하고
 * 오프라인·게스트에서도 동작하게 하는 거울일 뿐이다.
 *
 *   서버 → 로컬 : hydrateLearnMode  (getMe 직후)
 *   로컬 → 서버 : commitLearnMode   (모드를 고를 때)
 */
import {
  useSettingsStore,
  type LearnMode,
  type StudyMode,
  type TopikLevel,
} from "@/store/settings.store";
import { useAuthStore } from "@/store/auth.store";
import { UserService } from "@/services/user.service";

const isLearnMode = (v: unknown): v is LearnMode =>
  typeof v === "string" &&
  [
    "vocabulary",
    "grammarPractice",
    "grammar",
    "expression",
    "conversation",
    "listening",
    "topik",
  ].includes(v);

const isTopikLevel = (v: unknown): v is TopikLevel => v === "1" || v === "2";

const isStudyMode = (v: unknown): v is StudyMode =>
  v === "guided" || v === "free";

/** getMe 응답을 로컬 거울에 반영. 서버 값이 항상 이긴다. */
export function hydrateLearnMode(me: {
  learnMode?: unknown;
  topikLevel?: unknown;
  studyMode?: unknown;
}) {
  const s = useSettingsStore.getState();
  if (isLearnMode(me.learnMode)) s.setLearnMode(me.learnMode);
  if (isTopikLevel(me.topikLevel)) s.setTopikLevel(me.topikLevel);
  if (isStudyMode(me.studyMode)) s.setStudyMode(me.studyMode);
}

/**
 * 모드를 골랐을 때 호출. 로컬을 먼저 바꿔서 화면이 기다리지 않게 하고,
 * 서버에는 뒤따라 보낸다. 실패해도 다음 getMe 때 다시 맞춰진다.
 */
export function commitLearnMode(mode: LearnMode, topikLevel?: TopikLevel) {
  const s = useSettingsStore.getState();
  s.setLearnMode(mode);
  if (topikLevel) s.setTopikLevel(topikLevel);

  const auth = useAuthStore.getState();
  auth.updateUser({
    learnMode: mode,
    ...(topikLevel ? { topikLevel } : {}),
  });

  // 게스트는 서버에 계정이 없다
  if (!auth.isLoggedIn) return;

  UserService.updateLearnMode({ learnMode: mode, topikLevel }).catch(() => {
    // 네트워크가 끊겨도 학습을 막을 이유는 없다. 다음 getMe 가 정리한다.
  });
}

/** 가이드 ↔ 자율 전환. commitLearnMode 와 같은 방식(로컬 먼저, 서버 뒤). */
export function commitStudyMode(studyMode: StudyMode) {
  useSettingsStore.getState().setStudyMode(studyMode);

  const auth = useAuthStore.getState();
  auth.updateUser({ studyMode });
  if (!auth.isLoggedIn) return;

  UserService.updateStudyMode(studyMode).catch(() => {
    // 실패해도 학습을 막지 않는다. 다음 getMe 가 정리한다.
  });
}
