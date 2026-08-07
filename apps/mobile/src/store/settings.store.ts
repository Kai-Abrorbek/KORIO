import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../locales/i18n";

type Language = "uz" | "ko" | "en" | "ru";
export type Theme = "light" | "dark" | "system";
export type LearningTheme = "skyBlue" | "purple";
export type LearnMode =
  | "vocabulary"
  | "grammar"
  | "expression"
  | "conversation"
  | "listening"
  | "topik";

// 로드맵이 있는 모드만 여기 들어간다. 발음·문법 문제 풀이 같은 바로가기는
// 학습 모드가 아니므로 제외 — 홈이 "이어서 진행하기" 로 갈 곳이 없다.
const LEARN_MODES: LearnMode[] = [
  "vocabulary",
  "grammar",
  "expression",
  "conversation",
  "listening",
  "topik",
];
export interface NotificationPrefs {
  master: boolean;
  daily: boolean;
  dailyHour: number; // 0-23
  streak: boolean;
  league: boolean;
  friends: boolean;
  events: boolean;
}

export interface SoundPrefs {
  /** 0~1. 문제를 읽어주는 TTS */
  speechVolume: number;
  /** 0~1. 정답·콤보 같은 효과음 */
  sfxVolume: number;
  /** 0~1. 자판/선택지 탭 소리 */
  keyVolume: number;
  /** TTS 재생 속도 (0.5 느리게 ~ 1.2 빠르게) */
  speechRate: number;
  /** 문제가 나오면 알아서 읽어주기 */
  autoPlay: boolean;
  /** 탭할 때 진동 */
  keyHaptics: boolean;
  /** 연속 학습·콤보 달성 시 진동 */
  rewardHaptics: boolean;
  /**
   * 켜면 앱을 켤 때마다 소리 없이 시작한다.
   * 볼륨 설정은 그대로 두고 이번 실행만 음소거하는 개념.
   */
  startMuted: boolean;
}

interface SettingsState {
  language: Language;
  theme: Theme;
  learningTheme: LearningTheme;
  learnMode: LearnMode; // 현재 진행 중인 학습 모드
  notifications: NotificationPrefs;
  sound: SoundPrefs;
  /** 이번 실행 동안만 음소거 (저장 안 함) */
  muted: boolean;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setLearningTheme: (t: LearningTheme) => void;
  setLearnMode: (m: LearnMode) => void;
  setNotifications: (patch: Partial<NotificationPrefs>) => void;
  setSound: (patch: Partial<SoundPrefs>) => void;
  setMuted: (v: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: "uz",
      theme: "system",
      learningTheme: "skyBlue",
      learnMode: "vocabulary",
      notifications: {
        master: true,
        daily: true,
        dailyHour: 20,
        streak: true,
        league: true,
        friends: true,
        events: false,
      },
      sound: {
        speechVolume: 1,
        sfxVolume: 1,
        keyVolume: 1,
        speechRate: 0.9, // 학습용이라 기본을 살짝 느리게
        autoPlay: true,
        keyHaptics: true,
        rewardHaptics: true,
        startMuted: false,
      },
      muted: false,
      setLanguage: (lang) => {
        i18n.changeLanguage(lang);
        set({ language: lang });
      },
      setTheme: (theme) => set({ theme }),
      setLearningTheme: (learningTheme) => set({ learningTheme }),
      setLearnMode: (learnMode) => set({ learnMode }),
      setNotifications: (patch) =>
        set((s) => ({ notifications: { ...s.notifications, ...patch } })),
      setSound: (patch) => set((s) => ({ sound: { ...s.sound, ...patch } })),
      setMuted: (muted) => set({ muted }),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // muted 는 "이번 실행만" 이라 저장하지 않는다
      partialize: (s) => {
        const { muted, ...rest } = s;
        return rest as SettingsState;
      },
      onRehydrateStorage: () => (state) => {
        // persist는 상태만 복원하고 사이드이펙트는 안 탐 → 저장된 언어로 i18n 재동기화
        if (state?.language) i18n.changeLanguage(state.language);

        // 예전에 바로가기 항목이 학습 모드로 저장된 적이 있다. 그대로 두면
        // 홈 제목이 번역 키 그대로 노출되므로 되돌린다.
        if (state?.learnMode && !LEARN_MODES.includes(state.learnMode)) {
          state.learnMode = "vocabulary";
        }

        // "무음으로 시작" 을 켜뒀으면 이번 실행은 소리 없이 연다
        if (state) state.muted = !!state.sound?.startMuted;
      },
    },
  ),
);
