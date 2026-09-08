import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, Platform, PermissionsAndroid } from "react-native";
import { setAudioModeAsync } from "expo-audio";
import {
  TutorApi,
  type RolePlayScene,
  type SessionSummary,
  type TranscriptTurn,
  type TutorMode,
  type TutorQuota,
} from "../services/tutor.api";
import { connectRealtime, type RealtimeConnection } from "../services/realtime";
import { extractExamples } from "../services/examples";
import { takeChunks } from "../services/sentence-chunker";
import { TutorSpeechQueue } from "../services/tutor-speech";

/**
 * 서버로 보낼 대화의 상한.
 *
 * 서버가 어차피 한 번 더 자르지만 여기서 먼저 자른다 — 본문이 크면 느린
 * 회선에서 종료 보고 자체가 실패하고, 그러면 쿼터 정산이 안 된다.
 */
const MAX_TURNS_TO_SEND = 100;
const MAX_TURN_CHARS = 300;

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
  /**
   * 지금 **들리고 있는** 한 문장.
   *
   * 예전엔 텍스트 델타를 그대로 이어 붙였다. 그러면 글자가 소리보다 한참
   * 앞서 달리고, 문장 여러 개가 한 덩어리로 뭉쳐서 읽기 어려웠다.
   * 지금은 재생이 시작된 문장만 띄운다 — 들은 것과 본 것이 같아진다.
   */
  const [caption, setCaption] = useState("");
  /** 바로 앞 문장. 흐리게 위에 남겨서 맥락이 끊기지 않게 */
  const [captionPrev, setCaptionPrev] = useState("");
  const [userSaid, setUserSaid] = useState("");
  const [voice, setVoice] = useState<string | undefined>(undefined);
  /** 오늘 연습할 표현. 막혔을 때 화면에 띄운다 */
  const [targets, setTargets] = useState<string[]>([]);
  /** 대화가 끝난 뒤 서버가 만들어준 요약. 종료 화면에 띄운다 */
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  /** 요약을 기다리는 중. 종료 버튼을 누르고 카드가 뜨기까지 몇 초 걸린다 */
  const [analyzing, setAnalyzing] = useState(false);

  /** 이번 세션의 선생님. 화면에 이름·아바타를 띄운다 */
  const [teacher, setTeacher] = useState<
    { id: string; avatar: string; color: string } | null
  >(null);

  const conn = useRef<RealtimeConnection | null>(null);
  /**
   * 선생님 목소리.
   *
   * Realtime 은 이제 텍스트만 만든다 — 소리는 전부 이 큐를 지난다.
   * 훅 밖의 명령형 객체라 ref 로 들고 있는다.
   */
  const speech = useRef<TutorSpeechQueue | null>(null);
  /** 아직 문장이 안 된 꼬리. 다음 델타와 이어 붙인다 */
  const textBuf = useRef("");
  /** 콜백에서 현재 자막을 읽으려고 둔다 (콜백은 deps 가 비어 있다) */
  const captionRef = useRef("");
  /** 첫 인사를 두 번 시키지 않기 위한 빗장 */
  const greeted = useRef(false);
  /** 개발용 지연 측정 */
  const speechStoppedAt = useRef(0);
  const firstTextAt = useRef(0);
  const sessionId = useRef<string | null>(null);
  const startedAt = useRef<number>(0);
  const maxSec = useRef<number>(0);
  const ending = useRef(false);
  /**
   * 이벤트 핸들러에서 현재 상태를 읽으려고 둔다.
   * handleServerEvent 는 deps 가 빈 콜백이라 state 를 직접 못 본다 — 넣으면
   * 발화마다 핸들러가 새로 만들어진다.
   */
  const stateRef = useRef<TutorState>("idle");
  stateRef.current = state;
  /**
   * 이번 대화 내용.
   *
   * 자막으로 어차피 받고 있는 걸 쌓아둘 뿐이다. 서버는 Realtime 세션을
   * 따로 듣고 있지 않아서, 종료할 때 이걸 올려야 요약을 만들 수 있다.
   * state 가 아니라 ref 인 이유: 매 발화마다 리렌더될 이유가 없다.
   */
  const transcript = useRef<TranscriptTurn[]>([]);

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

    const turns = transcript.current;
    transcript.current = [];

    // 소리부터 끊는다. 연결만 끊으면 이미 큐에 있는 문장이 계속 재생된다
    try {
      speech.current?.dispose();
    } catch {}
    speech.current = null;
    textBuf.current = "";
    greeted.current = false;
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
    setCaptionPrev("");
    captionRef.current = "";
    setUserSaid("");
    setTargets([]);
    setTeacher(null);

    if (sid) {
      // 대화가 있었으면 요약을 기다린다. 몇 초 걸려서 화면에 티를 내야 한다
      // 서버 기준과 맞춘다 (45초 이상 + 학습자가 2번 이상 말함).
      // 여기서 안 맞추면 "정리 중" 을 띄웠다가 빈손으로 끝난다.
      const wantsSummary =
        sec >= 45 && turns.filter((t) => t.role === "user").length >= 2;
      if (wantsSummary) setAnalyzing(true);
      try {
        const res = await TutorApi.endSession(
          sid,
          sec,
          wantsSummary ? trimTurns(turns) : undefined,
        );
        setQuota(res.quota);
        if (res.summary) setSummary(res.summary);
      } catch {
        // 보고 실패해도 서버의 선차감이 남아 쿼터가 새지는 않는다
      } finally {
        setAnalyzing(false);
      }
    }
    ending.current = false;
  }, []);

  /** 요약 카드를 닫는다 */
  const clearSummary = useCallback(() => setSummary(null), []);

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
      opts: {
        scene?: RolePlayScene;
        voice?: string;
        topicId?: string;
        teacherId?: string;
      } = {},
    ) => {
      if (conn.current) return;
      setError(null);
      setSummary(null);
      transcript.current = [];
      textBuf.current = "";
      greeted.current = false;
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
        setTeacher({
          id: grant.teacher.id,
          avatar: grant.teacher.avatar,
          color: grant.teacher.color,
        });

        // 선생님 목소리. 여기부터 소리는 전부 이 큐를 지난다
        speech.current?.dispose();
        speech.current = new TutorSpeechQueue({
          // 실제로 **소리가 나기 시작한** 시점에만 speaking 으로 바꾼다.
          // 텍스트가 생성되는 중에 바꾸면 화면은 말한다고 하는데 아직
          // 아무 소리도 안 나는 구간이 생긴다
          onPlaybackStart: (line) => {
            setCaptionPrev(captionRef.current);
            captionRef.current = line;
            setCaption(line);
            setState("speaking");
          },
          onIdle: () => {
            if (stateRef.current === "speaking") setState("listening");
          },
          onError: (code) => {
            // 소리를 못 내도 대화는 자막으로 이어간다. 화면을 죽이지 않는다
            if (__DEV__) console.log("[tutor] TTS 실패:", code);
          },
          onTiming: (t) => {
            if (!__DEV__) return;
            const stopped = speechStoppedAt.current;
            const think = firstTextAt.current
              ? firstTextAt.current - stopped
              : 0;
            console.log(
              `[tutor] 지연 — 생각 ${think}ms · TTS ${t.audioAt - t.requestedAt}ms · 총 ${
                stopped ? t.playedAt - stopped : 0
              }ms`,
            );
          },
        });
        speech.current.configure({
          teacherId: grant.teacher.id,
          sessionId: grant.sessionId,
        });

        const c = await connectRealtime(grant.clientSecret, grant.model, {
          onEvent: handleServerEvent,
          // 채널이 열린 **뒤에** 첫 응답을 시킨다. 연결됐다고 채널이 열린 건
          // 아니라서, 이 신호 없이 보내면 인사가 조용히 사라진다.
          // 재연결로 두 번 자기소개하지 않게 빗장을 건다
          onDataChannelOpen: () => {
            if (greeted.current) return;
            greeted.current = true;
            conn.current?.send({ type: "response.create" });
          },
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
        // 유저가 말을 시작 = 끼어들기.
        //
        // 세 가지를 **다** 멈춰야 한다: Realtime 의 답변 생성, 만들던 TTS,
        // 지금 나오는 소리. 하나라도 살아 있으면 유저 말 위로 선생님 목소리가
        // 겹치고, 그 소리를 마이크가 다시 주워서 대화가 엉킨다.
        //
        // AI 가 말하는 중에 이게 뜨면 진짜 끼어들기이거나 에코다. 어느 쪽인지
        // 로그로 구분한다.
        if (__DEV__ && stateRef.current === "speaking") {
          console.log("[tutor] 말하는 중 발화 감지 — 끼어들기 또는 에코");
        }
        speech.current?.cancelAll();
        textBuf.current = "";
        setCaptionPrev("");
        setState("listening");
        break;
      case "input_audio_buffer.speech_stopped":
        speechStoppedAt.current = Date.now();
        firstTextAt.current = 0;
        setState("thinking");
        break;

      // ── 여기가 하이브리드의 핵심 ──
      //
      // Realtime 은 소리를 안 만든다 (session.output_modalities: ['text']).
      // 텍스트가 흘러 들어오면 문장 단위로 잘라서 바로 선생님 목소리로 넘긴다.
      // 답변이 다 끝나기를 기다리면 유저는 그동안 침묵을 듣는다.
      case "response.output_text.delta":
      case "response.text.delta":
        if (typeof event.delta === "string") {
          if (!firstTextAt.current) firstTextAt.current = Date.now();
          // 자막은 여기서 안 건드린다. 소리가 나기 시작한 문장만 띄운다 —
          // 델타를 그대로 흘리면 글자가 소리보다 앞서 달려서 지저분하다
          textBuf.current += event.delta;
          const { chunks, rest } = takeChunks(textBuf.current);
          textBuf.current = rest;
          for (const c of chunks) speech.current?.enqueue(c);
        }
        break;
      case "response.output_text.done":
      case "response.text.done": {
        // 마지막 꼬리는 짧아도 내보낸다 — 안 그러면 끝말이 잘린다
        const { chunks } = takeChunks(textBuf.current, true);
        textBuf.current = "";
        for (const c of chunks) speech.current?.enqueue(c);
        if (typeof event.text === "string" && event.text.trim()) {
          // 기록에는 응답 전체를 남긴다 (분석용). 화면에는 문장 단위로 흐른다
          pushTurn(transcript, "tutor", event.text);
        }
        break;
      }
      case "response.created":
        textBuf.current = "";
        break;
      case "conversation.item.input_audio_transcription.completed":
        if (typeof event.transcript === "string") {
          setUserSaid(event.transcript.trim());
          pushTurn(transcript, "user", event.transcript);
        }
        break;
      case "response.done":
        // 말이 중간에 끊겼을 때 원인을 여기서 확인한다.
        // status:"incomplete" + reason:"max_output_tokens" 이면 토큰 상한이
        // 원인이다. 그게 아니면 에코/끼어들기(위 로그)를 봐야 한다.
        if (__DEV__) {
          const r = event?.response;
          if (r?.status && r.status !== "completed") {
            console.log(
              `[tutor] 응답 미완: ${r.status} / ${r?.status_details?.reason ?? "?"}`,
            );
          }
          const u = r?.usage?.output_token_details;
          if (u) {
            console.log(
              `[tutor] 출력 토큰 text=${u.text_tokens} audio=${u.audio_tokens}`,
            );
          }
        }
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
    captionPrev,
    userSaid,
    /** 자막에서 뽑은 "따라 해볼 문장". 정확한 발음은 Azure 목소리로 들려준다 */
    examples: extractExamples(caption),
    targets,
    voice,
    teacher,
    summary,
    analyzing,
    clearSummary,
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

/** 대화 한 마디를 쌓는다. 빈 줄과 중복은 버린다 */
function pushTurn(
  ref: { current: TranscriptTurn[] },
  role: TranscriptTurn["role"],
  text: string,
) {
  const clean = text.trim();
  if (!clean) return;
  const last = ref.current[ref.current.length - 1];
  // 같은 말이 두 번 오는 경우가 있다 (부분 전사가 확정본과 겹칠 때)
  if (last && last.role === role && last.text === clean) return;
  ref.current.push({ role, text: clean.slice(0, MAX_TURN_CHARS) });
  // 앞쪽을 버린다 — 대화 후반이 더 쓸모 있다
  if (ref.current.length > MAX_TURNS_TO_SEND * 2) {
    ref.current.splice(0, ref.current.length - MAX_TURNS_TO_SEND);
  }
}

function trimTurns(turns: TranscriptTurn[]): TranscriptTurn[] {
  return turns.slice(-MAX_TURNS_TO_SEND);
}
