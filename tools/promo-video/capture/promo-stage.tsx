"use client";

/**
 * 홍보 영상 촬영 무대 — tools/promo-video/capture/stage.mjs 가 이 파일을
 * apps/telegram-app/app/zz-promo/page.tsx 로 깔고, 촬영이 끝나면 지운다 (앱에 커밋하지 않는다).
 *
 *   /zz-promo?scene=stamp&xp=45  → 실제 화면을 촬영 데이터로 띄운다
 *
 * 로그인·API·소리 기록은 촬영 브라우저에 먼저 심은 init-script.js 가 맡는다.
 */
import { Suspense, useEffect, useState, type ReactNode } from "react";
import { TutorCall } from "../../src/features/tutor/ui/tutor-call";
import type { TutorState, VoiceTutorEmotion } from "../../src/features/tutor/model/voice-tutor";
import { useSearchParams } from "next/navigation";
import { useTelegramAuth } from "../../src/features/auth/model/telegram-auth-context";
import { LessonCompleteScreen } from "../../src/features/lesson/ui/lesson-complete-screen";
import { LevelUpScreen } from "../../src/features/level-up/ui/level-up-screen";
import { setLevelUp } from "../../src/features/level-up/model/level-up";
import { EnergyJackpot } from "../../src/features/energy/energy-jackpot";
import { StreakDayScreen } from "../../src/features/misc/ui/streak-day-screen";
import { LeagueResultScreen } from "../../src/features/league/ui/league-result-screen";
import { LeagueScreen } from "../../src/features/league/ui/league-screen";
import { HangulScreen } from "../../src/features/hangul/ui/hangul-screen";
import { AvatarEditorScreen } from "../../src/features/profile/ui/avatar-editor-screen";
import { CoursesScreen } from "../../src/features/learning/ui/courses-screen";
import { LessonScreen } from "../../src/features/lesson/ui/lesson-screen";
import { TopikPracticeScreen } from "../../src/features/topik/ui/topik-practice-screen";
import { StickersScreen } from "../../src/features/profile/ui/stickers-screen";

/**
 * AI 튜터 통화 각본 — 학습자가 일본어 "Oishii!" 를 하자 튜터가 깜짝 놀라
 * "맛있어요" 를 가르친다. 시각(ms)은 촬영 시작 기준. 튜터 목소리(public/audio/tutor-*.mp3)는
 * 편집에서 말하기가 시작하는 같은 시각(1100, 6800)에 붙인다 — 자막 길이 speakMs = 목소리 길이.
 */
const TUTOR_SCRIPT: {
  at: number;
  state: TutorState;
  emotion?: VoiceTutorEmotion;
  teacher?: { text: string; speakMs: number };
  user?: string;
  focus?: string;
}[] = [
  { at: 0, state: "listening", teacher: { text: "Mazali ovqatni koreyscha qanday maqtaysan?", speakMs: 0 } },
  { at: 400, state: "listening", user: "Oishii!" },
  { at: 800, state: "thinking" },
  {
    at: 1100,
    state: "speaking",
    emotion: "shocked",
    teacher: { text: "OISHII?! Bu yaponcha-ku! Koreyschada — 맛있어요!", speakMs: 4700 },
  },
  { at: 6000, state: "listening", user: "맛있어요!" },
  { at: 6500, state: "thinking" },
  {
    at: 6800,
    state: "speaking",
    emotion: "laughing",
    teacher: { text: "Ana! Zo‘r!", speakMs: 1600 },
    focus: "맛있어요",
  },
  { at: 9700, state: "listening" },
];

function TutorScene() {
  const [t, setT] = useState(0);
  useEffect(() => {
    // 촬영 시계(가짜 시계)로 33ms 마다 — 자막이 말하는 속도로 한 글자씩
    const id = window.setInterval(() => setT((value) => value + 33), 33);
    return () => window.clearInterval(id);
  }, []);
  const steps = TUTOR_SCRIPT.filter((step) => step.at <= t);
  const now = steps.at(-1) ?? TUTOR_SCRIPT[0];
  const lines = steps.filter((step) => step.teacher);
  const last = lines.at(-1);
  const prev = lines.at(-2);
  const shown = (step?: (typeof TUTOR_SCRIPT)[number]) => {
    if (!step?.teacher) return "";
    const { text, speakMs } = step.teacher;
    if (!speakMs) return text;
    const p = Math.min(1, (t - step.at) / speakMs);
    return Array.from(text).slice(0, Math.ceil(Array.from(text).length * p)).join("");
  };
  const user = [...steps].reverse().find((step) => step.user)?.user ?? "";
  const focus = [...steps].reverse().find((step) => step.focus)?.focus ?? "";
  const noop = () => undefined;
  return (
    <TutorCall
      active
      analyzing={false}
      audioBlocked={false}
      canReplay
      caption={shown(last)}
      captionPrev={shown(prev)}
      elapsedSec={42 + Math.floor(t / 1000)}
      emotion={now.state === "speaking" ? now.emotion : undefined}
      error={null}
      focusHint={focus}
      limitSec={600}
      micOn
      onClose={noop}
      onEnd={noop}
      onExplain={noop}
      onReplay={noop}
      onResumeAudio={noop}
      onSlower={noop}
      playKorean={async () => undefined}
      state={now.state}
      targetLanguage="ko"
      targets={["맛있어요", "매워요", "배불러요"]}
      teacherPersonality="Keskin va jo‘shqin"
      toggleMic={noop}
      topicTitle="Taomlar"
      userSaid={user}
      withMicMuted={async (play) => play()}
    />
  );
}

function Scene({ name }: { name: string }): ReactNode {
  switch (name) {
    case "tutor":
      return <TutorScene />;
    case "stamp":
      return <LessonCompleteScreen />;
    case "rocket":
      return <LevelUpScreen />;
    case "jackpot":
      // 앱에서처럼 화면 위에 뜬다 (빈 무대 위면 회색만 보인다)
      return (
        <>
          <CoursesScreen />
          <EnergyJackpot amount={6} onDone={() => undefined} />
        </>
      );
    case "streak":
      return <StreakDayScreen />;
    case "leagueResult":
      return <LeagueResultScreen />;
    case "league":
      return <LeagueScreen />;
    case "hangul":
      return <HangulScreen />;
    case "avatar":
      return <AvatarEditorScreen />;
    case "courses":
      return <CoursesScreen />;
    case "lesson":
    case "speaking":
      return <LessonScreen />;
    case "topik":
      return <TopikPracticeScreen />;
    case "stickers":
      return <StickersScreen />;
    default:
      return <p>unknown scene {name}</p>;
  }
}

function Stage() {
  const params = useSearchParams();
  const { user } = useTelegramAuth();
  const scene = params.get("scene") ?? "";
  if (scene === "rocket") setLevelUp({ kind: "level", to: 3, from: 2, next: null, via: "roadmap" } as never);
  // 촬영기(capture.mjs)가 이걸 보고 0번 프레임을 찍기 시작한다
  useEffect(() => {
    if (user) (window as Window & { __promoReady?: boolean }).__promoReady = true;
  }, [user]);
  // 로그인(가짜 텔레그램)이 끝난 뒤에 화면을 올린다 — 진짜 앱처럼 유저가 있는 상태로
  return user ? <Scene name={scene} /> : null;
}

export default function PromoStage() {
  return (
    <Suspense fallback={null}>
      <Stage />
    </Suspense>
  );
}
