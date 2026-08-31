import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, Platform, PermissionsAndroid } from "react-native";
import { setAudioModeAsync } from "expo-audio";
import {
  TutorApi,
  type RolePlayScene,
  type TutorMode,
  type TutorQuota,
} from "../services/tutor.api";
import { connectRealtime, type RealtimeConnection } from "../services/realtime";
import { extractExamples } from "../services/examples";

export type TutorState =
  | "idle"
  | "connecting"
  | "listening"
  | "thinking"
  | "speaking"
  | "error";

/**
 * 튜터 대화 한 사이클.
 *
 * 지켜야 할 것 두 가지:
 *  1) 화면을 떠나거나 앱이 백그라운드로 가면 **반드시 끊는다.**
 *     연결이 살아있으면 마이크가 계속 열려 있고, 무엇보다 분당 과금이 계속된다.
 *  2) 끊을 때 서버에 실제 사용 시간을 보고한다. 안 보내면 서버가 잡아둔
 *     선차감(1분)만 남아 쿼터가 실제보다 적게 깎인다.
 */
export function useRealtimeTutor() {
  const [state, setState] = useState<TutorState>("idle");
  const [quota, setQuota] = useState<TutorQuota | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  /** 지금 화면에 띄울 한 줄. AI 가 말하는 동안 실시간으로 채워진다 */
  const [caption, setCaption] = useState("");
  const [userSaid, setUserSaid] = useState("");
  const [voice, setVoice] = useState<string | undefined>(undefined);
  /** 오늘 연습할 표현. 막혔을 때 화면에 띄운다 */
  const [targets, setTargets] = useState<string[]>([]);

  const conn = useRef<RealtimeConnection | null>(null);
  const sessionId = useRef<string | null>(null);
  const startedAt = useRef<number>(0);
  const maxSec = useRef<number>(0);
  const ending = useRef(false);

  /** 남은 사용량 조회 */
  const refreshQuota = useCallback(async () => {
    try {
      setQuota(await TutorApi.quota());
    } catch {
      /* 조회 실패로 화면을 막지는 않는다 — 시작할 때 서버가 어차피 막는다 */
    }
  }, []);

  useEffect(() => {
    void refreshQuota();
  }, [refreshQuota]);

  /**
   * 종료. 여러 경로(버튼·화면 이탈·백그라운드·시간 초과)에서 불리므로
   * 두 번 실행돼도 안전해야 한다.
   */
  const stop = useCallback(async () => {
    if (ending.current) return;
    ending.current = true;

    const c = conn.current;
    const sid = sessionId.current;
    const sec = startedAt.current
      ? Math.round((Date.now() - startedAt.current) / 1000)
      : 0;

    conn.current = null;
    sessionId.current = null;
    startedAt.current = 0;

    try {
      c?.close();
    } catch {}
    // 다른 화면(듣기·발음)이 쓰던 기본 모드로 되돌린다
    void setAudioModeAsync({
      playsInSilentMode: true,
      allowsRecording: false,
      shouldRouteThroughEarpiece: false,
      interruptionMode: "mixWithOthers",
    }).catch(() => undefined);
    setState("idle");
    setElapsedSec(0);
    setCaption("");
    setUserSaid("");
    setTargets([]);

    if (sid) {
      try {
        const res = await TutorApi.endSession(sid, sec);
        setQuota(res.quota);
      } catch {
        // 보고 실패해도 서버의 선차감이 남아 쿼터가 새지는 않는다
      }
    }
    ending.current = false;
  }, []);

  /**
   * 예문을 스피커로 들려주는 동안 마이크를 끈다.
   *
   * 안 끄면 마이크가 그 소리를 주워서 AI 가 자기 예문에 대답한다.
   * 재생이 끝나면 반드시 다시 켠다 — 실패해도 켜야 해서 finally 로 감싼다.
   */
  const withMicMuted = useCallback(async (play: () => Promise<void>) => {
    const c = conn.current;
    try {
      c?.setMicEnabled(false);
      await play();
    } finally {
      c?.setMicEnabled(true);
    }
  }, []);

  /** 마이크 권한. 안드로이드는 런타임 요청이 필요하다 */
  const ensureMicPermission = useCallback(async () => {
    if (Platform.OS !== "android") return true;
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }, []);

  const start = useCallback(
    async (
      mode: TutorMode,
      opts: { scene?: RolePlayScene; voice?: string; topicId?: string } = {},
    ) => {
      if (conn.current) return;
      setError(null);
      setState("connecting");

      try {
        if (!(await ensureMicPermission())) {
          setState("error");
          setError("MIC_PERMISSION_DENIED");
          return;
        }

        // WebRTC 오디오는 기본이 통화 모드(이어피스)라 귀에 대야 들린다.
        // 회화 연습은 스피커로 나와야 해서 명시적으로 돌린다.
        await setAudioModeAsync({
          playsInSilentMode: true,
          allowsRecording: true,
          shouldRouteThroughEarpiece: false,
          interruptionMode: "doNotMix",
        }).catch(() => undefined);

        // 쿼터 검사는 서버가 여기서 한다. 한도 초과면 403 이 온다.
        const grant = await TutorApi.createSession(mode, opts);
        setVoice(grant.voice);
        setTargets(grant.targetExpressions ?? []);
        sessionId.current = grant.sessionId;
        maxSec.current = grant.maxDurationSec;
        setQuota(grant.quota);

        const c = await connectRealtime(grant.clientSecret, grant.model, {
          onEvent: handleServerEvent,
          onConnectionState: (s) => {
            if (s === "failed") {
              setError("CONNECTION_LOST");
              setState("error");
              void stop();
            }
          },
          onError: () => setError("CONNECTION_ERROR"),
        });

        conn.current = c;
        startedAt.current = Date.now();
        setState("listening");
      } catch (e: any) {
        setState("error");
        setError(e?.code ?? e?.message ?? "TUTOR_START_FAILED");
        sessionId.current = null;
        // 세션은 발급됐는데 연결이 실패한 경우 서버에 알려 선차감을 정정한다
        void stop();
      }
    },
    [ensureMicPermission, stop],
  );

  /**
   * 서버 이벤트로 화면 상태를 만든다.
   * 유저가 말하는 중인지 / AI 가 말하는 중인지 보여주는 게 이 화면의 전부다.
   */
  const handleServerEvent = useCallback((event: any) => {
    switch (event?.type) {
      case "input_audio_buffer.speech_started":
        // 유저가 말을 시작 = AI 말 자르기(barge-in)도 여기서 일어난다
        setState("listening");
        break;
      case "input_audio_buffer.speech_stopped":
        setState("thinking");
        break;
      case "response.output_audio.delta":
        setState("speaking");
        break;
      case "response.output_audio_transcript.delta":
        // AI 가 말하는 내용을 실시간으로 받아 자막에 흘린다.
        // 우즈벡어 설명은 소리보다 글자로 보는 게 낫다 — 모델의 우즈벡어
        // 발음이 어색해서 듣기용으로는 못 쓴다.
        setState("speaking");
        if (typeof event.delta === "string") {
          setCaption((prev) => prev + event.delta);
        }
        break;
      case "response.output_audio_transcript.done":
        if (typeof event.transcript === "string") setCaption(event.transcript);
        break;
      case "response.created":
        setCaption("");
        break;
      case "conversation.item.input_audio_transcription.completed":
        if (typeof event.transcript === "string") {
          setUserSaid(event.transcript.trim());
        }
        break;
      case "response.done":
        setState("listening");
        break;
      case "error":
        setError(event?.error?.message ?? "REALTIME_ERROR");
        break;
      default:
        break;
    }
  }, []);

  /**
   * 경과 시간 + 최대 시간 도달 시 자동 종료.
   *
   * state 를 의존성에 넣지 않는다 — state 는 말할 때마다 listening/thinking/
   * speaking 으로 계속 바뀌는데, 그때마다 interval 이 지워졌다 다시 생겨서
   * 1초 주기가 매번 리셋됐다. 그래서 자동 종료가 제때 안 걸렸다.
   * 한 번 걸어두고 startedAt 유무로 판단한다.
   */
  useEffect(() => {
    const id = setInterval(() => {
      if (!startedAt.current) return;
      const sec = Math.round((Date.now() - startedAt.current) / 1000);
      setElapsedSec(sec);
      if (maxSec.current > 0 && sec >= maxSec.current) {
        void stop();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [stop]);

  /** 앱이 백그라운드로 가면 끊는다 — 안 끊으면 과금이 계속된다 */
  useEffect(() => {
    const sub = AppState.addEventListener("change", (s) => {
      if (s !== "active" && conn.current) void stop();
    });
    return () => sub.remove();
  }, [stop]);

  /** 화면이 사라지면 무조건 끊는다 */
  useEffect(() => {
    return () => {
      conn.current?.close();
      conn.current = null;
    };
  }, []);

  return {
    state,
    quota,
    error,
    caption,
    userSaid,
    /** 자막에서 뽑은 "따라 해볼 문장". 정확한 발음은 Azure 목소리로 들려준다 */
    examples: extractExamples(caption),
    targets,
    voice,
    withMicMuted,
    elapsedSec,
    maxSec: maxSec.current,
    busy: state === "connecting",
    active: state !== "idle" && state !== "error",
    start,
    stop,
    refreshQuota,
  };
}
