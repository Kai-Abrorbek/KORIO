"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import { translateText } from "../../../shared/i18n/language-context";
import { useTelegramBackOverride } from "../../../shared/telegram/back-button";
import { explainTutorCaption } from "../api/tutor";
import { useRealtimeTutor } from "../model/use-realtime-tutor";
import { TutorCall } from "./tutor-call";
import { TutorSetup, type TutorSetupResult } from "./tutor-setup";
import { TutorSummary } from "./tutor-summary";

/** 모바일 useSpeech 의 "천천히" 와 같은 비율 */
const SLOW_FACTOR = 0.55;

function savedSpeechRate() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("korio-sound-settings") ?? "{}") as { speechRate?: number };
    return saved.speechRate ?? 1;
  } catch {
    return 1;
  }
}

/**
 * 튜터 화면의 세 상태 — 모바일 TutorScreen 과 같다.
 *
 *   설정 → 통화 → 정리
 *
 * 예전엔 "선생님 → 주제" 두 화면이었고 주제를 누르는 순간 과금되는 통화가 열렸다.
 * 지금은 설정이 한 페이지고 시작은 버튼으로만 한다.
 */
export function TutorScreen() {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const { speak, stop: stopSpeech } = useKoreanSpeech(request);
  const speechFinishRef = useRef<(() => void) | null>(null);

  /** 이번 세션에 고른 주제 제목·선생님 이름·성격. 서버 grant 에는 없다 */
  const [topicTitle, setTopicTitle] = useState<string | undefined>(undefined);
  const [teacherName, setTeacherName] = useState<string | undefined>(undefined);
  const [teacherPersonality, setTeacherPersonality] = useState<string | undefined>(undefined);

  const tutor = useRealtimeTutor(request);
  const { active, analyzing, clearSummary, start, stop, summary } = tutor;

  /** 재생이 끝날 때까지 기다린다 — 안 기다리면 마이크가 먼저 열려 AI 가 예문에 대답한다 */
  const playKorean = useCallback(
    (text: string, slow = false) => {
      speechFinishRef.current?.();
      return new Promise<void>((resolve) => {
        let finished = false;
        const finish = () => {
          if (finished) return;
          finished = true;
          if (speechFinishRef.current === finish) speechFinishRef.current = null;
          resolve();
        };
        speechFinishRef.current = finish;
        speak(text, {
          onEnd: finish,
          rate: slow ? Math.max(0.25, savedSpeechRate() * SLOW_FACTOR) : undefined,
        });
        // 콜백이 안 오는 경우를 대비한 빗장. 마이크가 영영 닫혀 있으면 안 된다
        window.setTimeout(finish, 15_000);
      });
    },
    [speak],
  );

  useEffect(
    () => () => {
      speechFinishRef.current?.();
      stopSpeech();
    },
    [stopSpeech],
  );

  const goBack = useCallback(() => {
    if (window.history.length > 1) router.back();
    else router.replace("/course-categories");
  }, [router]);

  const close = useCallback(async () => {
    await stop();
    goBack();
  }, [goBack, stop]);

  const explain = useCallback(
    async (text: string) => {
      const failed = translateText("Izohni olib bo'lmadi");
      try {
        const result = await explainTutorCaption(request, text);
        return [result.translation, result.explanation].filter(Boolean).join("\n\n") || failed;
      } catch {
        return failed;
      }
    },
    [request],
  );

  const onStart = useCallback(
    (options: TutorSetupResult) => {
      setTopicTitle(options.topicTitle);
      setTeacherName(options.teacherName);
      setTeacherPersonality(options.teacherPersonality);
      void start("freeTalk", {
        addressStyle: options.addressStyle,
        teacherId: options.teacherId,
        teachingLanguage: options.teachingLanguage,
        topicId: options.topicId,
      });
    },
    [start],
  );

  // 통화 중 텔레그램 "뒤로" 는 먼저 통화를 끊고(사용 시간 보고) 나간다
  useTelegramBackOverride(active || analyzing ? () => void close() : null);

  if (summary) {
    return (
      <TutorSummary
        data={summary}
        onAgain={() => {
          // 선생님·언어·말투는 저장돼 있어서 그대로 고른 채로 돌아온다. 주제만 비운다
          clearSummary();
          setTopicTitle(undefined);
        }}
        onClose={() => {
          clearSummary();
          goBack();
        }}
        onSpeak={(text) => void playKorean(text)}
        topicTitle={topicTitle}
      />
    );
  }

  // 통화가 안 붙었으면 설정 화면. 실패(error)도 여기로 와서 이유를 보고 바로 다시 시작한다.
  // ⚠️ analyzing 중엔 안 된다 — 통화 화면이 "정리 중" 오버레이를 띄우고 있다
  if (!active && !analyzing) {
    return (
      <TutorSetup
        busy={tutor.busy}
        error={tutor.error}
        onClose={goBack}
        onStart={onStart}
        onUpsell={() => router.push("/premium")}
        quota={tutor.quota}
        request={request}
      />
    );
  }

  return (
    <TutorCall
      active={active}
      analyzing={analyzing}
      audioBlocked={tutor.audioBlocked}
      busy={tutor.busy}
      caption={tutor.caption}
      captionPrev={tutor.captionPrev}
      elapsedSec={tutor.elapsedSec}
      error={tutor.error}
      examples={tutor.examples}
      maxSec={tutor.maxSec}
      micOn={tutor.micOn}
      onClose={() => void close()}
      onEnd={() => void stop()}
      onExplain={explain}
      onPickAnother={() => void stop()}
      onResumeAudio={() => void tutor.resumeAudio()}
      onUpsell={() => router.push("/premium")}
      playKorean={playKorean}
      quota={tutor.quota}
      state={tutor.state}
      targets={tutor.targets}
      teacher={tutor.teacher}
      teacherName={teacherName}
      teacherPersonality={teacherPersonality}
      toggleMic={tutor.toggleMic}
      topicTitle={topicTitle}
      userSaid={tutor.userSaid}
      withMicMuted={tutor.withMicMuted}
    />
  );
}
