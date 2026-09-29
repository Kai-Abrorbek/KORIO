import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, PermissionsAndroid, Platform } from "react-native";
import {
  getRecordingPermissionsAsync,
  requestRecordingPermissionsAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { activatePlaybackAudio } from "@/utils/audio-session";
import {
  connectLiveKitTutor,
  type LiveKitAgentState,
  type LiveKitTutorConnection,
  type TranscriptChunk,
} from "../services/livekit";
import {
  VoiceTutorApi,
  type VoiceTutorEnd,
  type VoiceTutorMessage,
  type VoiceTutorOptions,
  type VoiceTutorPlan,
  type VoiceTutorProgress,
  type VoiceTutorQuota,
  type VoiceTutorSettings,
  type VoiceTutorVoice,
} from "../services/voice-tutor.api";

export type VoiceTutorPhase =
  | "setup"
  | "starting"
  | "connecting"
  | "ready"
  | "recording"
  | "thinking"
  | "speaking"
  | "ending"
  | "finished";

const END_POLL_INTERVAL_MS = 1_500;
const END_POLL_ATTEMPTS = 80;

const AGENT_PHASE: Record<LiveKitAgentState, VoiceTutorPhase> = {
  initializing: "connecting",
  idle: "ready",
  listening: "ready",
  thinking: "thinking",
  speaking: "speaking",
};

export function useVoiceTutor() {
  const [options, setOptions] = useState<VoiceTutorOptions | null>(null);
  const [settings, setSettings] = useState<VoiceTutorSettings | null>(null);
  const [messages, setMessages] = useState<VoiceTutorMessage[]>([]);
  const [phase, setPhase] = useState<VoiceTutorPhase>("setup");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<VoiceTutorProgress | null>(null);
  const [plan, setPlan] = useState<VoiceTutorPlan | null>(null);
  const [endResult, setEndResult] = useState<VoiceTutorEnd | null>(null);
  const [spokenMessage, setSpokenMessage] = useState<VoiceTutorMessage | null>(null);
  const [previewVoiceId, setPreviewVoiceId] = useState<string | null>(null);
  const [micOn, setMicOn] = useState(false);
  const [liveUserText, setLiveUserText] = useState("");
  const [liveTeacherText, setLiveTeacherText] = useState("");
  /** 통화가 붙은 뒤 흐른 시간 (초). 통화 화면 타이머 */
  const [elapsedSec, setElapsedSec] = useState(0);
  const callStartedAt = useRef<number | null>(null);
  /** 서버 한도. 설정 화면 "오늘 N분 남음" 과 시작 버튼 잠금에 쓴다 */
  const [quota, setQuota] = useState<VoiceTutorQuota | null>(null);
  /** 이번 수업 최대 길이(초). 0 = 모름 */
  const [limitSec, setLimitSec] = useState(0);

  const player = useAudioPlayer(null, { updateInterval: 200 });
  const playerStatus = useAudioPlayerStatus(player);
  const connection = useRef<LiveKitTutorConnection | null>(null);
  const sessionId = useRef<string | null>(null);
  const actionBusy = useRef(false);
  const closing = useRef(false);
  const playbackEpoch = useRef(0);
  const ending = useRef(false);
  const mounted = useRef(true);
  const objectUrl = useRef<string | null>(null);
  const resumeMicAfterPlayback = useRef(false);
  const lastTranscriptSegment = useRef(new Set<string>());

  const stopPlayback = useCallback(async () => {
    playbackEpoch.current += 1;
    setSpokenMessage(null);
    setPreviewVoiceId(null);
    const url = objectUrl.current;
    objectUrl.current = null;
    try {
      // Expo releases hook-owned players on unmount. Native methods can reject
      // asynchronously even though their TypeScript return type is void.
      await player.pause();
    } catch {
      // A released player is already stopped; recording must remain usable.
    }
    if (url) URL.revokeObjectURL(url);
    if (resumeMicAfterPlayback.current) {
      resumeMicAfterPlayback.current = false;
      connection.current?.setMicEnabled(true);
    }
  }, [player]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [available, saved] = await Promise.all([
        VoiceTutorApi.options(),
        VoiceTutorApi.settings(),
      ]);
      if (!mounted.current) return;
      setOptions(available);
      // 한도를 못 받아도 화면은 연다 — 서버가 시작 시점에 다시 막는다
      void VoiceTutorApi.quota()
        .then((q) => { if (mounted.current) setQuota(q); })
        .catch(() => undefined);
      setSettings({
        ...available.defaults,
        ...saved,
        personality: saved.personality ?? available.defaults.personality ?? "friendly",
        characterId: saved.characterId ?? available.defaults.characterId ?? "female_01",
      });
    } catch (cause) {
      if (mounted.current) setError(errorCode(cause));
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    void load();
    return () => {
      mounted.current = false;
      playbackEpoch.current += 1;
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
      objectUrl.current = null;
      const call = connection.current;
      connection.current = null;
      void call?.close().catch(() => undefined);
      const id = sessionId.current;
      sessionId.current = null;
      if (id && !closing.current) {
        void VoiceTutorApi.endSession(id).catch(() => undefined);
      }
    };
  }, [load]);

  useEffect(() => {
    if (playerStatus.error) {
      setError("AUDIO_PLAYBACK_FAILED");
      setSpokenMessage(null);
      setPreviewVoiceId(null);
      if (resumeMicAfterPlayback.current) {
        resumeMicAfterPlayback.current = false;
        connection.current?.setMicEnabled(true);
      }
      return;
    }
    if (playerStatus.didJustFinish) {
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
      objectUrl.current = null;
      setSpokenMessage(null);
      setPreviewVoiceId(null);
      if (resumeMicAfterPlayback.current) {
        resumeMicAfterPlayback.current = false;
        connection.current?.setMicEnabled(true);
      }
    }
  }, [playerStatus.didJustFinish, playerStatus.error]);

  const playMessage = useCallback(
    async (message: VoiceTutorMessage) => {
      const id = sessionId.current;
      if (closing.current || !id || message.role !== "teacher") return;
      await stopPlayback();
      const epoch = playbackEpoch.current;
      try {
        const playable = message.audioUrl ? message : await VoiceTutorApi.replay(id, message.id);
        if (!playable.audioUrl) throw new Error("VOICE_TUTOR_TTS_UNAVAILABLE");
        if (!mounted.current || sessionId.current !== id || closing.current || epoch !== playbackEpoch.current) return;
        setMessages((current) => current.map((row) => row.id === playable.id ? playable : row));
        if (connection.current && micOn) {
          connection.current.setMicEnabled(false);
          resumeMicAfterPlayback.current = true;
        } else if (!connection.current) {
          await activatePlaybackAudio("doNotMix");
        }
        const source = await VoiceTutorApi.audioSource(playable.audioUrl);
        if (!mounted.current || sessionId.current !== id || closing.current || epoch !== playbackEpoch.current) {
          if (source.objectUrl) URL.revokeObjectURL(source.uri);
          return;
        }
        if (source.objectUrl) objectUrl.current = source.uri;
        await player.replace(source);
        if (epoch !== playbackEpoch.current || closing.current || !mounted.current) return;
        await player.play();
        if (epoch !== playbackEpoch.current || closing.current || !mounted.current) return;
        setError(null);
        setSpokenMessage(playable);
      } catch (cause) {
        if (epoch !== playbackEpoch.current || closing.current || !mounted.current) return;
        if (resumeMicAfterPlayback.current) {
          resumeMicAfterPlayback.current = false;
          connection.current?.setMicEnabled(true);
        }
        setError(errorCode(cause));
      }
    },
    [micOn, player, stopPlayback],
  );

  const previewVoice = useCallback(async (voice: VoiceTutorVoice) => {
    if (!voice.previewUrl || sessionId.current || actionBusy.current || closing.current) return;
    if (previewVoiceId === voice.id) {
      await stopPlayback();
      return;
    }
    let uri: string;
    try {
      const url = new URL(voice.previewUrl);
      if (url.protocol !== "https:" || url.username || url.password) throw new Error();
      uri = url.toString();
    } catch {
      setError("INVALID_AUDIO_URL");
      return;
    }
    try {
      await stopPlayback();
      const epoch = playbackEpoch.current;
      await activatePlaybackAudio("doNotMix");
      if (!mounted.current || sessionId.current || epoch !== playbackEpoch.current) return;
      await player.replace({ uri });
      if (!mounted.current || sessionId.current || epoch !== playbackEpoch.current) return;
      await player.play();
      if (!mounted.current || sessionId.current || epoch !== playbackEpoch.current) return;
      setError(null);
      setPreviewVoiceId(voice.id);
    } catch (cause) {
      if (mounted.current) setError(errorCode(cause));
    }
  }, [player, previewVoiceId, stopPlayback]);

  const syncMessages = useCallback(async (id: string) => {
    try {
      const detail = await VoiceTutorApi.getSession(id);
      if (!mounted.current || closing.current || sessionId.current !== id) return;
      setMessages(detail.messages);
      setProgress(detail.progress);
      const latestTeacher = [...detail.messages].reverse().find((message) => message.role === "teacher");
      if (latestTeacher) setSpokenMessage(latestTeacher);
      setLiveUserText("");
      setLiveTeacherText("");
    } catch {
      // Live audio keeps working even if a message refresh fails briefly.
    }
  }, []);

  const onTranscript = useCallback((chunk: TranscriptChunk) => {
    if (!mounted.current || closing.current || !sessionId.current) return;
    if (chunk.role === "user") {
      setLiveUserText(chunk.text);
      if (chunk.isFinal && !lastTranscriptSegment.current.has(chunk.segmentId)) {
        lastTranscriptSegment.current.add(chunk.segmentId);
        setPhase("thinking");
      }
      return;
    }
    setLiveTeacherText(chunk.text);
    setPhase("speaking");
    if (chunk.isFinal && !lastTranscriptSegment.current.has(chunk.segmentId)) {
      lastTranscriptSegment.current.add(chunk.segmentId);
      void syncMessages(sessionId.current);
    }
  }, [syncMessages]);

  const start = useCallback(async (topicId?: string | null) => {
    if (!settings || actionBusy.current || sessionId.current) return;
    actionBusy.current = true;
    setError(null);
    setPhase("starting");
    try {
      await stopPlayback();
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) throw new Error("MIC_PERMISSION_DENIED");
      } else {
        const existing = await getRecordingPermissionsAsync();
        const permission = existing.granted ? existing : await requestRecordingPermissionsAsync();
        if (!permission.granted) throw new Error("MIC_PERMISSION_DENIED");
      }
      await VoiceTutorApi.updateSettings(settings);
      const created = await VoiceTutorApi.createSession(settings, topicId ?? undefined);
      if (!mounted.current) {
        void VoiceTutorApi.endSession(created.sessionId).catch(() => undefined);
        return;
      }
      sessionId.current = created.sessionId;
      setLimitSec(created.maxDurationSec ?? 0);
      setPlan(created.plan);
      setProgress(null);
      setEndResult(null);
      setMessages(created.initialMessage ? [created.initialMessage] : []);
      setLiveUserText("");
      setLiveTeacherText("");
      lastTranscriptSegment.current.clear();
      if (!created.livekit) throw new Error("VOICE_TUTOR_AGENT_UNAVAILABLE");
      setPhase("connecting");
      const call = await connectLiveKitTutor(created.livekit, {
        onAgentState: (state) => {
          if (!mounted.current || closing.current) return;
          setPhase(AGENT_PHASE[state] ?? "ready");
          if (state === "speaking") void syncMessages(created.sessionId);
        },
        onTranscript,
        onAgentMissing: () => {
          if (!mounted.current || closing.current) return;
          connection.current?.setMicEnabled(false);
          setMicOn(false);
          setError("VOICE_TUTOR_AGENT_UNAVAILABLE");
          setPhase("ending");
        },
        onDisconnected: () => {
          if (!mounted.current || closing.current) return;
          connection.current = null;
          setMicOn(false);
          setError("CONNECTION_LOST");
          setPhase("ending");
        },
        onError: () => {
          if (mounted.current && !closing.current) setError("CONNECTION_ERROR");
        },
      });
      if (!mounted.current || closing.current || sessionId.current !== created.sessionId) {
        await call.close();
        return;
      }
      connection.current = call;
      callStartedAt.current = Date.now();
      setElapsedSec(0);
      setMicOn(true);
      setPhase((current) => current === "connecting" ? "ready" : current);
    } catch (cause) {
      const id = sessionId.current;
      sessionId.current = null;
      if (id) void VoiceTutorApi.endSession(id).catch(() => undefined);
      if (mounted.current) {
        setError(errorCode(cause));
        setPhase("setup");
      }
    } finally {
      actionBusy.current = false;
    }
  }, [onTranscript, settings, stopPlayback, syncMessages]);

  const toggleMic = useCallback(() => {
    if (!connection.current || closing.current) return;
    setMicOn((current) => {
      const next = !current;
      connection.current?.setMicEnabled(next);
      return next;
    });
  }, []);

  const interrupt = useCallback(async () => {
    const room = connection.current?.room;
    if (!room) return;
    const agent = [...room.remoteParticipants.values()].find(
      (participant) => participant.attributes?.["lk.agent.state"],
    );
    if (!agent) return;
    try {
      await room.localParticipant.performRpc({
        destinationIdentity: agent.identity,
        method: "voice_tutor_interrupt",
        payload: "",
      });
    } catch {
      setError("CONNECTION_ERROR");
    }
  }, []);

  /**
   * 통화 화면의 "천천히" / "설명해 줘" 버튼. 워커가 버튼 요청으로 한 턴을 만든다
   * (받아쓰기를 거치지 않는다).
   */
  const request = useCallback(async (kind: "slower" | "explain") => {
    const room = connection.current?.room;
    if (!room) return;
    const agent = [...room.remoteParticipants.values()].find(
      (participant) => participant.attributes?.["lk.agent.state"],
    );
    if (!agent) return;
    try {
      await room.localParticipant.performRpc({
        destinationIdentity: agent.identity,
        method: "voice_tutor_request",
        payload: kind,
      });
    } catch {
      setError("CONNECTION_ERROR");
    }
  }, []);

  /**
   * 기기에서 소리를 낼 때(오늘의 표현 듣기) 마이크를 잠깐 끈다. 안 끄면
   * 선생님이 그 소리를 학습자 말로 듣고 대답해 버린다.
   */
  const withMicMuted = useCallback(async (play: () => Promise<void>) => {
    const call = connection.current;
    const wasOn = !!call && micOn;
    if (wasOn) call.setMicEnabled(false);
    try {
      await play();
    } finally {
      if (wasOn && connection.current === call) call.setMicEnabled(true);
    }
  }, [micOn]);

  const end = useCallback(async (waitForCompletion = true) => {
    if (ending.current) return;
    const id = sessionId.current;
    if (!id) return;
    ending.current = true;
    closing.current = true;
    setError(null);
    setPhase("ending");
    try {
      await stopPlayback();
      const call = connection.current;
      connection.current = null;
      setMicOn(false);
      await call?.close().catch(() => undefined);
      await activatePlaybackAudio("mixWithOthers").catch(() => undefined);
      let result = await VoiceTutorApi.endSession(id);
      if (result.status === "ending") {
        if (!waitForCompletion) return;
        for (let attempt = 0; attempt < END_POLL_ATTEMPTS && mounted.current && sessionId.current === id; attempt++) {
          await new Promise<void>((resolve) => setTimeout(resolve, END_POLL_INTERVAL_MS));
          if (!mounted.current || sessionId.current !== id) return;
          try {
            const detail = await VoiceTutorApi.getSession(id);
            if (detail.status !== "ended") continue;
            result = {
              sessionId: id,
              status: "ended",
              progress: detail.progress,
              plan: detail.plan,
            };
            break;
          } catch {
            // A transient connection loss must not undo the server's queued end request.
          }
        }
      }
      if (!mounted.current || sessionId.current !== id) return;
      if (result.status !== "ended") throw new Error("NETWORK_ERROR");
      sessionId.current = null;
      setProgress(result.progress);
      setPlan(result.plan);
      setEndResult(result);
      setPhase("finished");
    } catch (cause) {
      if (mounted.current) {
        setError(errorCode(cause));
        // Keep the session non-recordable; another tap on End retries or polls it.
        setPhase("ending");
      }
    } finally {
      closing.current = false;
      ending.current = false;
    }
  }, [stopPlayback]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "active" && connection.current && !ending.current) {
        void end(false);
      }
    });
    return () => subscription.remove();
  }, [end]);

  const inCall = ["connecting", "ready", "recording", "thinking", "speaking"].includes(phase);
  useEffect(() => {
    if (!inCall) return;
    const timer = setInterval(() => {
      if (callStartedAt.current) {
        setElapsedSec(Math.floor((Date.now() - callStartedAt.current) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [inCall]);

  // 한도에 닿으면 앱이 먼저 깔끔하게 끝낸다. 안 그러면 워커가 방을 닫아서
  // "연결이 끊겼어요" 로 끝난다 (원가는 서버·워커가 어차피 막는다)
  useEffect(() => {
    if (inCall && limitSec > 0 && elapsedSec >= limitSec) void end();
  }, [inCall, limitSec, elapsedSec, end]);

  const restart = useCallback(() => {
    if (sessionId.current || actionBusy.current) return;
    callStartedAt.current = null;
    setElapsedSec(0);
    setLimitSec(0);
    void VoiceTutorApi.quota().then(setQuota).catch(() => undefined);
    setMessages([]);
    setEndResult(null);
    setError(null);
    setPhase("setup");
  }, []);

  return {
    options,
    settings,
    setSettings,
    messages,
    phase,
    loading,
    error,
    progress,
    plan,
    endResult,
    isPlaying: phase === "speaking" || playerStatus.playing,
    spokenMessage,
    previewVoiceId,
    previewVoice,
    audioAmplitude: null,
    load,
    start,
    micOn,
    liveUserText,
    liveTeacherText,
    toggleMic,
    interrupt,
    request,
    withMicMuted,
    elapsedSec,
    limitSec,
    quota,
    playMessage,
    end,
    restart,
  };
}

function errorCode(cause: unknown): string {
  if (cause instanceof Error) return cause.message || "VOICE_TUTOR_FAILED";
  return "VOICE_TUTOR_FAILED";
}
