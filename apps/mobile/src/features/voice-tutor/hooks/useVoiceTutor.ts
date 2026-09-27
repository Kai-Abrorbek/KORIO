import { useCallback, useEffect, useRef, useState } from "react";
import {
  RecordingPresets,
  getRecordingPermissionsAsync,
  requestRecordingPermissionsAsync,
  useAudioPlayer,
  useAudioRecorder,
  useAudioPlayerStatus,
} from "expo-audio";
import { activatePlaybackAudio, activateRecordingAudio } from "@/utils/audio-session";
import {
  VoiceTutorApi,
  type VoiceTutorEnd,
  type VoiceTutorMessage,
  type VoiceTutorOptions,
  type VoiceTutorPlan,
  type VoiceTutorProgress,
  type VoiceTutorSettings,
  type VoiceTutorVoice,
} from "../services/voice-tutor.api";

export type VoiceTutorPhase =
  | "setup"
  | "starting"
  | "ready"
  | "recording"
  | "transcribing"
  | "thinking"
  | "speaking"
  | "ending"
  | "finished";

const MAX_RECORDING_MS = 60_000;
const END_POLL_INTERVAL_MS = 1_500;
const END_POLL_ATTEMPTS = 80;

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

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const player = useAudioPlayer(null, { updateInterval: 200 });
  const playerStatus = useAudioPlayerStatus(player);
  const sessionId = useRef<string | null>(null);
  const actionBusy = useRef(false);
  const closing = useRef(false);
  const playbackEpoch = useRef(0);
  const turnAbort = useRef<AbortController | null>(null);
  const recordingIntent = useRef(false);
  const stoppingRecorder = useRef<Promise<void> | null>(null);
  const ending = useRef(false);
  const recordTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const thinkingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(true);
  const objectUrl = useRef<string | null>(null);

  const clearTimers = useCallback(() => {
    if (recordTimer.current) clearTimeout(recordTimer.current);
    if (thinkingTimer.current) clearTimeout(thinkingTimer.current);
    recordTimer.current = null;
    thinkingTimer.current = null;
  }, []);

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
  }, [player]);

  const stopRecorder = useCallback(async () => {
    if (stoppingRecorder.current) return stoppingRecorder.current;
    if (!recorder.isRecording) return;
    const pending = recorder.stop();
    stoppingRecorder.current = pending;
    try {
      await pending;
    } finally {
      if (stoppingRecorder.current === pending) stoppingRecorder.current = null;
    }
  }, [recorder]);

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
      clearTimers();
      playbackEpoch.current += 1;
      turnAbort.current?.abort();
      recordingIntent.current = false;
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
      objectUrl.current = null;
      if (!closing.current) {
        void stopRecorder().catch(() => undefined);
      }
      const id = sessionId.current;
      sessionId.current = null;
      if (id && !closing.current) {
        void VoiceTutorApi.endSession(id).catch(() => undefined);
      }
    };
  }, [clearTimers, load, stopRecorder]);

  useEffect(() => {
    if (playerStatus.error) {
      setError("AUDIO_PLAYBACK_FAILED");
      setSpokenMessage(null);
      setPreviewVoiceId(null);
      setPhase((current) => (current === "speaking" ? "ready" : current));
      return;
    }
    if (playerStatus.didJustFinish) {
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
      objectUrl.current = null;
      setSpokenMessage(null);
      setPreviewVoiceId(null);
      setPhase((current) => (current === "speaking" ? "ready" : current));
    }
  }, [playerStatus.didJustFinish, playerStatus.error]);

  const playMessage = useCallback(
    async (message: VoiceTutorMessage) => {
      if (closing.current || recordingIntent.current || !sessionId.current) return;
      if (!message.audioUrl) {
        setError("VOICE_TUTOR_TTS_UNAVAILABLE");
        setPhase("ready");
        return;
      }
      await stopPlayback();
      const epoch = playbackEpoch.current;
      try {
        await activatePlaybackAudio("doNotMix");
        if (epoch !== playbackEpoch.current || closing.current || recordingIntent.current) return;
        const source = await VoiceTutorApi.audioSource(message.audioUrl);
        if (!mounted.current || !sessionId.current || closing.current || recordingIntent.current || epoch !== playbackEpoch.current) {
          if (source.objectUrl) URL.revokeObjectURL(source.uri);
          return;
        }
        if (source.objectUrl) objectUrl.current = source.uri;
        await player.replace(source);
        if (epoch !== playbackEpoch.current || closing.current || recordingIntent.current || !mounted.current) return;
        await player.play();
        if (epoch !== playbackEpoch.current || closing.current || recordingIntent.current || !mounted.current) return;
        setError(null);
        setSpokenMessage(message);
        setPhase("speaking");
      } catch (cause) {
        if (epoch !== playbackEpoch.current || closing.current || !mounted.current) return;
        setError(errorCode(cause));
        setPhase("ready");
      }
    },
    [player, stopPlayback],
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

  const start = useCallback(async () => {
    if (!settings || actionBusy.current || sessionId.current) return;
    actionBusy.current = true;
    setError(null);
    setPhase("starting");
    try {
      await stopPlayback();
      await VoiceTutorApi.updateSettings(settings);
      const created = await VoiceTutorApi.createSession(settings);
      if (!mounted.current) {
        void VoiceTutorApi.endSession(created.sessionId).catch(() => undefined);
        return;
      }
      sessionId.current = created.sessionId;
      setPlan(created.plan);
      setProgress(null);
      setEndResult(null);
      const first = created.initialMessage;
      setMessages(first ? [first] : []);
      setPhase("ready");
      if (first) await playMessage(first);
    } catch (cause) {
      setError(errorCode(cause));
      setPhase("setup");
    } finally {
      actionBusy.current = false;
    }
  }, [playMessage, settings, stopPlayback]);

  const stopRecording = useCallback(async () => {
    const id = sessionId.current;
    if (!id || actionBusy.current || !recorder.isRecording) return;
    actionBusy.current = true;
    recordingIntent.current = false;
    if (recordTimer.current) clearTimeout(recordTimer.current);
    recordTimer.current = null;
    setPhase("transcribing");
    try {
      await stopRecorder();
      if (closing.current || sessionId.current !== id) return;
      const uri = recorder.uri;
      if (!uri) throw new Error("RECORDING_EMPTY");
      await activatePlaybackAudio("doNotMix");
      if (closing.current || sessionId.current !== id) return;
      thinkingTimer.current = setTimeout(() => {
        if (mounted.current) setPhase("thinking");
      }, 900);
      const controller = new AbortController();
      turnAbort.current = controller;
      const result = await VoiceTutorApi.turn(id, uri, controller.signal);
      if (!mounted.current || closing.current || sessionId.current !== id) return;
      if (thinkingTimer.current) clearTimeout(thinkingTimer.current);
      thinkingTimer.current = null;
      setMessages((current) => [...current, result.userMessage, result.teacherMessage]);
      if (result.progress !== undefined) setProgress(result.progress);
      if (result.warning) setError(result.warning);
      setPhase("ready");
      await playMessage(result.teacherMessage);
    } catch (cause) {
      if (mounted.current && !closing.current && errorCode(cause) !== "VOICE_TUTOR_CANCELLED") {
        setError(errorCode(cause));
        setPhase("ready");
      }
    } finally {
      turnAbort.current = null;
      if (thinkingTimer.current) clearTimeout(thinkingTimer.current);
      thinkingTimer.current = null;
      actionBusy.current = false;
    }
  }, [playMessage, recorder, stopRecorder]);

  const startRecording = useCallback(async () => {
    if (!sessionId.current || actionBusy.current || closing.current) return;
    actionBusy.current = true;
    recordingIntent.current = true;
    setError(null);
    let started = false;
    try {
      await stopPlayback();
      const currentPermission = await getRecordingPermissionsAsync();
      const permission = currentPermission.granted
        ? currentPermission
        : await requestRecordingPermissionsAsync();
      if (!permission.granted) throw new Error("MIC_PERMISSION_DENIED");
      if (closing.current || !sessionId.current) return;
      await activateRecordingAudio();
      if (closing.current || !sessionId.current) return;
      await recorder.prepareToRecordAsync();
      if (closing.current || !sessionId.current) return;
      recorder.record();
      started = true;
      setPhase("recording");
      // HIGH_QUALITY is 128 kbit/s; this limit keeps each upload far below 10 MB.
      recordTimer.current = setTimeout(() => void stopRecording(), MAX_RECORDING_MS);
    } catch (cause) {
      if (!closing.current && mounted.current) {
        setError(errorCode(cause));
        setPhase("ready");
      }
    } finally {
      if (!started) recordingIntent.current = false;
      actionBusy.current = false;
    }
  }, [recorder, stopPlayback, stopRecording]);

  const interrupt = useCallback(() => {
    void stopPlayback();
    setPhase("ready");
  }, [stopPlayback]);

  const end = useCallback(async (waitForCompletion = true) => {
    if (ending.current) return;
    const id = sessionId.current;
    if (!id) return;
    ending.current = true;
    closing.current = true;
    recordingIntent.current = false;
    turnAbort.current?.abort();
    clearTimers();
    setError(null);
    setPhase("ending");
    try {
      await stopPlayback();
      await stopRecorder().catch(() => undefined);
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
  }, [clearTimers, stopPlayback, stopRecorder]);

  const restart = useCallback(() => {
    if (sessionId.current || actionBusy.current) return;
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
    isPlaying: playerStatus.playing,
    spokenMessage,
    previewVoiceId,
    previewVoice,
    audioAmplitude: null,
    load,
    start,
    startRecording,
    stopRecording,
    interrupt,
    playMessage,
    end,
    restart,
  };
}

function errorCode(cause: unknown): string {
  if (cause instanceof Error) return cause.message || "VOICE_TUTOR_FAILED";
  return "VOICE_TUTOR_FAILED";
}
