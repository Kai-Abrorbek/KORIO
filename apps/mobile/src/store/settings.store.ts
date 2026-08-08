import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Href } from "expo-router";
import i18n from "../locales/i18n";

type Language = "uz" | "ko" | "en" | "ru";
export type Theme = "light" | "dark" | "system";
export type LearningTheme = "skyBlue" | "purple";
export type LearnMode =
  | "vocabulary"
  | "grammarPractice"
  | "grammar"
  | "expression"
  | "conversation"
  | "listening"
  | "topik";

export type TopikLevel = "1" | "2";

/**
 * "이어서 학습하기" 가 갈 곳이 확실한 모드만 여기 들어간다.
 * 발음처럼 목적지가 없는 바로가기는 학습 모드로 저장하면 안 된다.
 */
const LEARN_MODES: LearnMode[] = [
  "vocabulary",
  "grammarPractice",
  "grammar",
  "expression",
  "conversation",
  "listening",
  "topik",
];

/**
 * 모드별 "이어서 학습하기" 목적지.
 * 로드맵을 쓰는 모드와 전용 메인 페이지가 있는 모드가 섞여 있어서
 * 한 군데 모아둔다. 새 모드를 넣으면 여기부터 채워야 한다.
 *
 * topik 은 급수가 필요해서 함수로 만든다.
 *
 * 쿼리를 붙여 만든 문자열이라 expo-router 의 타입드 라우트가 못 알아본다.
 * 캐스팅을 여기 한 곳에만 두고 호출부는 깨끗하게 쓴다.
 */
/**
 * 레슨·보상 화면을 닫고 원래 로드맵으로 돌아가는 경로.
 * category 가 비면 어휘 로드맵.
 */
export function backToRoadmap(category?: string): Href {
  return category ? (`/roadmap?category=${category}` as Href) : "/roadmap";
}

export function learnModePath(mode: LearnMode, topikLevel: TopikLevel): Href {
  switch (mode) {
    // 전용 메인 페이지가 있는 모드
    case "grammar":
      return "/grammar-list"; // 문법 설명 목록
    case "topik":
      return `/topik-sections?level=${topikLevel}` as Href;
    // 문법 문제 풀이는 어휘와 같은 로드맵을 문법 트랙 데이터로 돈다
    case "grammarPractice":
      return "/roadmap?category=grammar" as Href;
    case "vocabulary":
      return "/roadmap";
    // 표현·회화·듣기는 전용 문제 풀이 페이지를 따로 만들 예정이다.
    // 어휘 로드맵을 재사용하면 안 되므로 그때까지 자리 표시 화면으로 보낸다.
    default:
      return `/coming-soon?mode=${mode}` as Href;
  }
}
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
  /** 마지막으로 고른 토픽 급수. 홈에서 토픽으로 돌아갈 때 필요 */
  topikLevel: TopikLevel;
  notifications: NotificationPrefs;
  sound: SoundPrefs;
  /** 이번 실행 동안만 음소거 (저장 안 함) */
  muted: boolean;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setLearningTheme: (t: LearningTheme) => void;
  setLearnMode: (m: LearnMode) => void;
  setTopikLevel: (l: TopikLevel) => void;
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
      topikLevel: "1",
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
      setTopikLevel: (topikLevel) => set({ topikLevel }),
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

        // 급수는 "1"/"2" 둘뿐. 이상한 값이 저장돼 있으면 토픽 화면이 깨진다.
        if (state && state.topikLevel !== "1" && state.topikLevel !== "2") {
          state.topikLevel = "1";
        }

        // "무음으로 시작" 을 켜뒀으면 이번 실행은 소리 없이 연다
        if (state) state.muted = !!state.sound?.startMuted;
      },
    },
  ),
);
