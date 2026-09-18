import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, Platform, PermissionsAndroid } from "react-native";
import { setAudioModeAsync } from "expo-audio";
import {
  TutorApi,
  type RolePlayScene,
  type SessionSummary,
  type TranscriptTurn,
  type TutorAddressStyle,
  type TutorMode,
  type TutorQuota,
} from "../services/tutor.api";
import {
  connectLiveKitTutor,
  type LiveKitAgentState,
  type LiveKitTutorConnection,
} from "../services/livekit-tutor";
import { extractExamples } from "../services/examples";

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
 * LiveKit Agent 의 상태를 화면 상태로 옮긴다.
 *
 * 'idle' 은 Agent 가 아무것도 안 하는 중 = **유저 차례**다. 화면에서는
 * listening 과 구분할 이유가 없다 ("듣고 있어요").
 */
const AGENT_STATE: Record<LiveKitAgentState, TutorState> = {
  initializing: "connecting",
  idle: "listening",
  listening: "listening",
  thinking: "thinking",
  speaking: "speaking",
};

/**
 * 튜터 대화 한 사이클.
 *
 *   마이크 ──WebRTC──▶ LiveKit ──▶ Tutor Agent ──▶ Gemini 3.8 Live
 *
 * ── 이 훅이 더 이상 하지 않는 일 ──
 *
 * PCM 조립, SDP 교환, 데이터 채널 이벤트 해석, 끼어들기 취소, 에코 대응.
 * 전부 WebRTC 와 Agent 쪽으로 갔다. 여기 남은 건 **화면 상태 + 쿼터 + 기록**
 * 세 가지다.
 *
 * 그래도 지켜야 할 것 두 가지는 그대로다:
 *  1) 화면을 떠나거나 앱이 백그라운드로 가면 **반드시 끊는다.**
 *     연결이 살아있으면 마이크가 계속 열려 있고, 분당 과금이 계속된다.
 *  2) 끊을 때 서버에 실제 사용 시간을 보고한다. 안 보내면 서버가 잡아둔
 *     선차감(1분)만 남아 쿼터가 실제보다 적게 깎인다.
 */
export function useRealtimeTutor() {
  const [state, setState] = useState<TutorState>("idle");
  const [quota, setQuota] = useState<TutorQuota | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  /** 지금 들리고 있는 한 마디 */
  const [caption, setCaption] = useState("");
  /** 바로 앞 문장. 흐리게 위에 남겨서 맥락이 끊기지 않게 */
  const [captionPrev, setCaptionPrev] = useState("");
  const [userSaid, setUserSaid] = useState("");
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

  const conn = useRef<LiveKitTutorConnection | null>(null);
  /** 마이크가 켜져 있나. 유저가 직접 끌 수 있다 */
  const [micOn, setMicOn] = useState(true);
  const micOnRef = useRef(true);

  /** 콜백에서 현재 자막을 읽으려고 둔다 */
  const captionRef = useRef("");
  /** 튜터가 말하고 있는 지금 한 마디의 id. 바뀌면 앞 문장을 흐리게 내린다 */
  const tutorSegment = useRef<string>("");
  /**
   * 이미 기록에 넣은 자막.
   *
   * ⚠️ final 자막이 두 번 오는 경우가 있다 (스트림이 닫히면서 한 번,
   *    헤더 플래그로 한 번). segment id 로 막지 않으면 분석에 같은 말이
   *    두 번 들어가고, 요약이 "같은 말을 반복했어요" 같은 소리를 한다.
   */
  const pushed = useRef<Set<string>>(new Set());

  const sessionId = useRef<string | null>(null);
  const startedAt = useRef<number>(0);
  const maxSec = useRef<number>(0);
  const ending = useRef(false);

  /**
   * 이번 대화 내용.
   *
   * 자막으로 어차피 받고 있는 걸 쌓아둘 뿐이다. 서버는 통화를 따로 듣고
   * 있지 않아서, 종료할 때 이걸 올려야 요약을 만들 수 있다.
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
    pushed.current = new Set();
    tutorSegment.current = "";

    // 소리는 WebRTC 오디오 트랙이라 방을 나가면 같이 끊긴다
    try {
      await c?.close();
    } catch {
      /* 이미 끊겼으면 그만 */
    }
    /**
     * 다른 화면(듣기·발음)이 쓰던 기본 모드로 되돌린다.
     *
     * ⚠️ 통화 **중에는** 오디오 모드를 우리가 건드리지 않는다. LiveKit 의
     *    AudioSession 이 통화 경로(에코 제거 포함)를 잡고 있어서, 그 위에
     *    expo-audio 모드를 덮어쓰면 에코 제거가 풀린다. 되돌리는 건 방을
     *    나온 뒤다.
     */
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
      // 대화가 있었으면 요약을 기다린다. 몇 초 걸려서 화면에 티를 내야 한다.
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
   * WebRTC 가 에코를 지우긴 하지만 완벽하진 않고, 무엇보다 **우리 예문은
   * 선생님이 반응할 대상이 아니다.** 재생 동안 아예 안 들리게 하는 게 맞다.
   * 실패해도 되돌려야 해서 finally 로 감싼다.
   */
  const withMicMuted = useCallback(async (play: () => Promise<void>) => {
    const c = conn.current;
    try {
      c?.setMicEnabled(false);
      await play();
    } finally {
      // 유저가 스스로 음소거해 뒀으면 켜면 안 된다. 예문 하나 듣고 나서
      // 마이크가 제멋대로 켜지면 그건 신뢰가 깨지는 종류의 버그다
      c?.setMicEnabled(micOnRef.current);
    }
  }, []);

  /**
   * 유저가 건 음소거.
   *
   * ref 를 같이 두는 이유: withMicMuted 가 예문 재생 뒤에 마이크를 되돌릴 때
   * **그 시점의 값**을 봐야 한다. 클로저에 잡힌 state 를 쓰면 음소거해 둔 걸
   * 모르고 다시 켠다.
   */
  const toggleMic = useCallback(() => {
    setMicOn((on) => {
      const next = !on;
      micOnRef.current = next;
      conn.current?.setMicEnabled(next);
      return next;
    });
  }, []);

  /** 마이크 권한. 안드로이드는 런타임 요청이 필요하다 */
  const ensureMicPermission = useCallback(async () => {
    if (Platform.OS !== "android") return true;
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }, []);

  /**
   * 자막 한 조각.
   *
   * 선생님 말은 caption 에, 내 말은 userSaid 에. 확정본만 기록에 넣는다 —
   * interim 까지 넣으면 같은 말이 조각조각 여러 번 들어가서 분석이 망가진다.
   */
  const onTranscript = useCallback(
    (c: {
      role: "user" | "tutor";
      text: string;
      isFinal: boolean;
      segmentId: string;
    }) => {
      if (c.role === "user") {
        setUserSaid(c.text.trim());
        if (c.isFinal && !pushed.current.has(c.segmentId)) {
          pushed.current.add(c.segmentId);
          pushTurn(transcript, "user", c.text);
        }
        return;
      }

      // 새 문장이 시작됐다 — 앞 문장은 흐리게 위로 내린다
      if (tutorSegment.current && tutorSegment.current !== c.segmentId) {
        setCaptionPrev(captionRef.current);
      }
      tutorSegment.current = c.segmentId;
      captionRef.current = c.text;
      setCaption(c.text);

      if (c.isFinal && !pushed.current.has(c.segmentId)) {
        pushed.current.add(c.segmentId);
        pushTurn(transcript, "tutor", c.text);
      }
    },
    [],
  );

  const start = useCallback(
    async (
      mode: TutorMode,
      opts: {
        scene?: RolePlayScene;
        topicId?: string;
        teacherId?: string;
        addressStyle?: TutorAddressStyle;
      } = {},
    ) => {
      if (conn.current) return;
      setError(null);
      setSummary(null);
      transcript.current = [];
      pushed.current = new Set();
      tutorSegment.current = "";
      setCaption("");
      setCaptionPrev("");
      setUserSaid("");
      setState("connecting");

      try {
        if (!(await ensureMicPermission())) {
          setState("error");
          setError("MIC_PERMISSION_DENIED");
          return;
        }

        // 쿼터 검사는 서버가 여기서 한다. 한도 초과면 403 이 온다.
        // 방은 이 호출 안에서 만들어지고 Agent 도 이미 불려 있다.
        const grant = await TutorApi.createSession(mode, opts);
        setTargets(grant.targetExpressions ?? []);
        sessionId.current = grant.sessionId;
        maxSec.current = grant.maxDurationSec;
        setQuota(grant.quota);
        setTeacher({
          id: grant.teacher.id,
          avatar: grant.teacher.avatar,
          color: grant.teacher.color,
        });

        const c = await connectLiveKitTutor(grant.livekit, {
          onAgentState: (s) => setState(AGENT_STATE[s] ?? "listening"),
          onTranscript,
          /**
           * 선생님이 끝내 응답이 없다.
           *
           * ⚠️ 이걸 안 잡으면 화면이 계속 "듣고 있어요" 로 남는다 — 유저 차례인
           *    것과 **고장난 것이 구분이 안 된다.** 실제로 Agent 컨테이너가 매
           *    통화마다 죽는데 화면은 멀쩡해 보였고, 서버 로그를 봐야만 알았다.
           */
          onAgentMissing: () => {
            setError("TUTOR_AGENT_UNAVAILABLE");
            setState("error");
            void stop();
          },
          onDisconnected: () => {
            // 우리가 끊는 중이면 정상 종료다. 아니면 선생님이 사라진 것이다
            if (ending.current || !conn.current) return;
            setError("CONNECTION_LOST");
            setState("error");
            void stop();
          },
          onError: () => setError("CONNECTION_ERROR"),
        });

        conn.current = c;
        micOnRef.current = true;
        setMicOn(true);
        startedAt.current = Date.now();
        // Agent 가 상태를 보고하기 전까지의 한 박자.
        // 첫 인사는 Agent 가 알아서 시작한다 — 앱이 시킬 게 없다.
        //
        // ⚠️ 무조건 덮어쓰면 안 된다. Agent 가 이미 speaking 을 보고한 뒤에
        //    이 줄이 돌면 인사 중인데 화면은 "듣고 있어요" 가 된다.
        setState((cur) => (cur === "connecting" ? "listening" : cur));
      } catch (e: any) {
        setState("error");
        setError(e?.code ?? e?.message ?? "TUTOR_START_FAILED");
        // 세션은 열렸는데 연결이 실패한 경우 서버에 알려 선차감을 정정한다
        void stop();
      }
    },
    [ensureMicPermission, onTranscript, stop],
  );

  /**
   * 경과 시간 + 최대 시간 도달 시 자동 종료.
   *
   * ⚠️ Agent 에도 같은 상한이 걸려 있다. 여기 것은 화면용이고, 돈을 막는
   *    쪽은 Agent 다 — 앱은 고치면 우회되기 때문이다.
   *
   * state 를 의존성에 넣지 않는다 — state 는 말할 때마다 계속 바뀌는데
   * 그때마다 interval 이 지워졌다 다시 생겨서 1초 주기가 매번 리셋된다.
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
      void conn.current?.close();
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
    teacher,
    summary,
    analyzing,
    clearSummary,
    withMicMuted,
    micOn,
    toggleMic,
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
  if (ref.current.length > MAX_TURNS_TO_SEND) {
    ref.current.splice(0, ref.current.length - MAX_TURNS_TO_SEND);
  }
}

function trimTurns(turns: TranscriptTurn[]): TranscriptTurn[] {
  return turns.slice(-MAX_TURNS_TO_SEND);
}
