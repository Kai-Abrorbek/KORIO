"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import { useTelegramBackOverride } from "../../../shared/telegram/back-button";
import { useVoiceTutor } from "../model/use-voice-tutor";
import type { TutorState, VoiceTutorPhase, VoiceTutorSettings, VoiceTutorTopicCard } from "../model/voice-tutor";
import { TutorCall } from "./tutor-call";
import { PERSONALITY_LABELS } from "./tutor-labels";
import { TutorResult } from "./tutor-result";
import { TutorSetup } from "./tutor-setup";
import styles from "./tutor-setup.module.css";

/** 모바일 useSpeech 의 "천천히" 와 같은 비율 */
const SLOW_FACTOR = 0.55;

const CALL_STATE: Record<VoiceTutorPhase, TutorState> = {
  setup: "idle",
  starting: "connecting",
  connecting: "connecting",
  ready: "listening",
  thinking: "thinking",
  speaking: "speaking",
  ending: "idle",
  finished: "idle",
};

function savedSpeechRate() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("korio-sound-settings") ?? "{}") as { speechRate?: number };
    return saved.speechRate ?? 1;
  } catch {
    return 1;
  }
}

/**
 * 새 Voice Tutor — 설정 → 통화 → 결과. 모바일 VoiceTutorScreen 과 같다.
 *
 * ⚠️ 예전 텔레그램 튜터는 /tutor/* (Gemini Live) 였다. 모바일과 같은 튜터
 *    (STT → GPT → ElevenLabs, /voice-tutor/*) 로 옮겼다.
 */
export function TutorScreen() {
  const router = useRouter();
  const { accessToken, request } = useTelegramAuth();
  const { speak, stop: stopSpeech } = useKoreanSpeech(request);
  const speechFinishRef = useRef<(() => void) | null>(null);
  const tutor = useVoiceTutor(request, accessToken);
  const { end } = tutor;
  /** 이번 수업 주제. 통화 화면 진도 카드용 */
  const [topic, setTopic] = useState<VoiceTutorTopicCard | null>(null);

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

  const inCall = tutor.inCall;
  const close = useCallback(() => {
    if (inCall || tutor.phase === "ending") void end(false);
    goBack();
  }, [end, goBack, inCall, tutor.phase]);

  // 통화 중 텔레그램 "뒤로" 는 먼저 수업을 끝내고(사용 시간 정산) 나간다
  useTelegramBackOverride(inCall || tutor.phase === "ending" ? close : null);

  const update = (key: keyof VoiceTutorSettings, value: string) => {
    tutor.setSettings((current) => (current ? { ...current, [key]: value } : current));
  };

  if (tutor.loading) {
    return (
      <main className={styles.screen}>
        <div className={styles.center}>
          <span className={styles.spinner} />
        </div>
      </main>
    );
  }

  if (!tutor.options || !tutor.settings) {
    return (
      <main className={styles.screen}>
        <div className={styles.center}>
          <p className={styles.errorText}>Ustoz sozlamalari yuklanmadi.</p>
          <button className={styles.retry} onClick={() => void tutor.load()} type="button">
            Qayta urinish
          </button>
        </div>
      </main>
    );
  }

  if (tutor.phase === "setup" || tutor.phase === "starting") {
    return (
      <TutorSetup
        busy={tutor.phase === "starting"}
        error={tutor.error}
        onChange={update}
        onClose={goBack}
        onPreview={(voice) => void tutor.previewVoice(voice)}
        onStart={(picked) => {
          setTopic(picked);
          void tutor.start(picked?.id ?? null);
        }}
        onUpsell={() => router.push("/premium")}
        options={tutor.options}
        previewVoiceId={tutor.previewVoiceId}
        quota={tutor.quota}
        request={request}
        settings={tutor.settings}
      />
    );
  }

  if (tutor.phase === "finished") {
    return (
      <TutorResult
        elapsedSec={tutor.elapsedSec}
        messages={tutor.messages}
        onAgain={() => {
          setTopic(null);
          tutor.restart();
        }}
        onClose={goBack}
        plan={tutor.plan}
        progress={tutor.progress}
        topicTitle={topic?.title}
      />
    );
  }

  // 지금 자막: 말하는 중이면 실시간 글자, 아니면 마지막 선생님 말
  const teacherMessages = tutor.messages.filter((m) => m.role === "teacher");
  const lastTeacher = teacherMessages.at(-1);
  const prevTeacher = teacherMessages.at(-2);
  const lastUser = [...tutor.messages].reverse().find((m) => m.role === "user");
  const textOf = (m?: { displayText?: string; text: string }) => m?.displayText?.trim() || m?.text || "";
  const caption = tutor.liveTeacherText || textOf(lastTeacher);
  const captionPrev = tutor.liveTeacherText ? textOf(lastTeacher) : textOf(prevTeacher);
  const userSaid = tutor.liveUserText || (lastUser?.text.startsWith("[[button") ? "" : lastUser?.text) || "";
  const voice = tutor.options.voices.find((v) => v.id === tutor.settings?.voiceId);

  return (
    <TutorCall
      active={inCall || (tutor.phase === "ending" && !!tutor.error)}
      analyzing={tutor.phase === "ending" && !tutor.error}
      audioBlocked={tutor.audioBlocked}
      canReplay={!!lastTeacher && tutor.phase !== "connecting"}
      caption={caption}
      captionPrev={captionPrev === caption ? "" : captionPrev}
      elapsedSec={tutor.elapsedSec}
      emotion={tutor.phase === "speaking" ? lastTeacher?.emotion : undefined}
      error={tutor.error}
      focusHint={lastTeacher?.correction?.correct ?? ""}
      limitSec={tutor.limitSec}
      micOn={tutor.micOn}
      onClose={close}
      onEnd={() => void tutor.end()}
      onExplain={() => void tutor.requestTurn("explain")}
      onReplay={() => {
        if (lastTeacher) void tutor.playMessage(lastTeacher);
      }}
      onResumeAudio={() => void tutor.resumeAudio()}
      onSlower={() => void tutor.requestTurn("slower")}
      playKorean={playKorean}
      state={tutor.error && tutor.phase === "ending" ? "error" : CALL_STATE[tutor.phase]}
      targets={topic ? (tutor.plan?.targetVocabulary ?? []) : []}
      teacherName={voice?.name}
      teacherPersonality={PERSONALITY_LABELS[tutor.settings.personality]?.name}
      toggleMic={tutor.toggleMic}
      topicTitle={topic?.title}
      userSaid={userSaid}
      withMicMuted={tutor.withMicMuted}
    />
  );
}
