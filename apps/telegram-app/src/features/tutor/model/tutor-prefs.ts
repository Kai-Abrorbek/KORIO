"use client";

import { useCallback, useEffect, useState } from "react";

import type { TutorAddressStyle, TutorTeachingLanguage } from "./tutor";

/**
 * 모바일 store/tutor-prefs.store.ts 와 같은 값.
 * 선생님·말투·설명 언어는 기억하고, 주제만 매번 새로 고른다.
 *
 * teachingLanguage 가 null 이면 아직 직접 고른 적이 없다 — 그때만 앱 언어를 따른다.
 * 한 번 고른 뒤에는 앱 언어를 바꿔도 따라가지 않는다.
 */
export interface TutorPrefs {
  addressStyle: TutorAddressStyle;
  teacherId: string | null;
  teachingLanguage: TutorTeachingLanguage | null;
}

const KEY = "korio-tutor-prefs";
/** 예전 두 단계 화면이 쓰던 키. 한 번만 옮겨 온다 */
const LEGACY_TEACHER_KEY = "korio-tutor-teacher-id";

const DEFAULTS: TutorPrefs = {
  addressStyle: "polite",
  teacherId: null,
  teachingLanguage: null,
};

function read(): TutorPrefs {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<TutorPrefs>) };
    const legacy = window.localStorage.getItem(LEGACY_TEACHER_KEY);
    return legacy ? { ...DEFAULTS, teacherId: legacy } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

export function useTutorPrefs() {
  const [prefs, setPrefs] = useState<TutorPrefs>(DEFAULTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPrefs(read());
    setReady(true);
  }, []);

  const patch = useCallback((next: Partial<TutorPrefs>) => {
    setPrefs((current) => {
      const updated = { ...current, ...next };
      try {
        window.localStorage.setItem(KEY, JSON.stringify(updated));
      } catch {
        // 저장을 막은 WebView 에서도 지금 선택은 그대로 쓴다
      }
      return updated;
    });
  }, []);

  return { patch, prefs, ready };
}
