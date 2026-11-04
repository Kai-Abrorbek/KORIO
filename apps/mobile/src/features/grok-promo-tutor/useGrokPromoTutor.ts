import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, PermissionsAndroid, Platform } from "react-native";
import { getRecordingPermissionsAsync, requestRecordingPermissionsAsync } from "expo-audio";
import { RoomEvent, type Participant } from "livekit-client";
import {
  connectLiveKitTutor,
  type LiveKitTutorConnection,
  type LiveKitAgentState,
} from "@/features/voice-tutor/services/livekit";
import type { VoiceTutorEmotion } from "@/features/voice-tutor/services/voice-tutor.api";
import { GrokPromoApi } from "./grok-promo.api";
import { holdAudioSessionUntil } from "@/utils/audio-session";
import { createPromoConnectionOwner } from "./promo-connection-owner";

type Phase = "setup" | "starting" | "call" | "ending" | "finished";
const EMOTIONS = new Set(["neutral", "happy", "laughing", "shocked", "angry", "mocking", "disbelief", "excited", "explaining"]);

export function useGrokPromoTutor(ownerId: string | undefined, authorized: boolean) {
  const [phase, setPhase] = useState<Phase>("setup");
  const [agentState, setAgentState] = useState<LiveKitAgentState>("initializing");
  const [error, setError] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [captionPrev, setCaptionPrev] = useState("");
  const [userSaid, setUserSaid] = useState("");
  const [emotion, setEmotion] = useState<VoiceTutorEmotion>();
  const [micOn, setMicOn] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [limitSec, setLimitSec] = useState(600);
  const connection = useRef<LiveKitTutorConnection | null>(null);
  const sessionId = useRef<string | null>(null);
  const epoch = useRef(0);
  const busy = useRef(false);
  const mounted = useRef(true);
  const startedAt = useRef(0);
  const lastCaption = useRef("");
  const segment = useRef("");
  const [transport] = useState(() => createPromoConnectionOwner<LiveKitTutorConnection>(holdAudioSessionUntil));

  const end = useCallback(async (reason?: string) => {
    const run = ++epoch.current;
    busy.current = true;
    // Register the global audio barrier before yielding or permitting navigation.
    const drained = transport.close();
    const id = sessionId.current;
    connection.current = null;
    sessionId.current = null;
    startedAt.current = 0;
    if (mounted.current) {
      setMicOn(false);
      setPhase("ending");
      if (reason) setError(reason);
    }
    if (id) void GrokPromoApi.end(id).catch(() => undefined);
    await drained;
    if (epoch.current === run) {
      busy.current = false;
      if (mounted.current) setPhase("finished");
    }
  }, [transport]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      void end();
    };
  }, [end, ownerId]);

  useEffect(() => {
    const listener = AppState.addEventListener("change", (state) => {
      if (state !== "active" && (sessionId.current || busy.current)) void end();
    });
    return () => listener.remove();
  }, [end]);

  useEffect(() => {
    if (phase !== "call") return;
    const timer = setInterval(() => {
      if (!startedAt.current) return;
      const elapsed = Math.floor((Date.now() - startedAt.current) / 1000);
      setElapsedSec(Math.min(limitSec, elapsed));
      if (elapsed >= limitSec) void end();
    }, 1_000);
    return () => clearInterval(timer);
  }, [end, limitSec, phase]);

  const start = useCallback(async () => {
    if (!ownerId || !authorized || busy.current || sessionId.current) return;
    const run = ++epoch.current;
    const active = () => mounted.current && epoch.current === run;
    busy.current = true;
    setError(null);
    setPhase("starting");
    setAgentState("initializing");
    setCaption("");
    setCaptionPrev("");
    setUserSaid("");
    setEmotion(undefined);
    setElapsedSec(0);
    lastCaption.current = "";
    segment.current = "";
    try {
      if (Platform.OS === "android") {
        const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
        if (permission !== PermissionsAndroid.RESULTS.GRANTED) throw new Error("MIC_PERMISSION_DENIED");
      } else {
        const existing = await getRecordingPermissionsAsync();
        const permission = existing.granted ? existing : await requestRecordingPermissionsAsync();
        if (!permission.granted) throw new Error("MIC_PERMISSION_DENIED");
      }
      if (!active()) return;
      const created = await GrokPromoApi.start();
      if (!active()) {
        void GrokPromoApi.end(created.sessionId).catch(() => undefined);
        return;
      }
      sessionId.current = created.sessionId;
      setLimitSec(created.maxDurationSec);
      setPhase("call");
      const call = await transport.connect(() => connectLiveKitTutor(created.livekit, {
        onAgentState: (state) => { if (active()) setAgentState(state); },
        onTranscript: (chunk) => {
          if (!active()) return;
          if (chunk.role === "user") {
            setUserSaid(chunk.text);
            return;
          }
          if (segment.current !== chunk.segmentId) {
            setCaptionPrev(lastCaption.current);
            segment.current = chunk.segmentId;
          }
          lastCaption.current = chunk.text;
          setCaption(chunk.text);
        },
        onAgentMissing: () => { if (active()) void end("VOICE_TUTOR_AGENT_UNAVAILABLE"); },
        onAgentEnded: (reason) => {
          if (active()) void end(reason === "max_duration" ? undefined : "VOICE_TUTOR_UNAVAILABLE");
        },
        onDisconnected: () => { if (active()) void end("CONNECTION_LOST"); },
        onError: () => { if (active()) setError("CONNECTION_ERROR"); },
      }));
      if (!call) return;
      if (!active()) {
        await transport.close();
        return;
      }
      connection.current = call;
      startedAt.current = Date.now();
      setMicOn(true);
      const readEmotion = (attributes: Record<string, string>) => {
        const next = attributes["korio.emotion"];
        if (active() && EMOTIONS.has(next)) setEmotion(next as VoiceTutorEmotion);
      };
      call.room.on(RoomEvent.ParticipantAttributesChanged, (attributes: Record<string, string>, participant: Participant) => {
        if (participant !== call.room.localParticipant) readEmotion(attributes);
      });
      for (const participant of call.room.remoteParticipants.values()) readEmotion(participant.attributes);
    } catch (cause) {
      if (!active()) return;
      const id = sessionId.current;
      sessionId.current = null;
      if (id) void GrokPromoApi.end(id).catch(() => undefined);
      setMicOn(false);
      setError(cause instanceof Error ? cause.message : "CONNECTION_ERROR");
      setPhase("setup");
    } finally {
      if (epoch.current === run) busy.current = false;
    }
  }, [authorized, end, ownerId, transport]);

  const toggleMic = useCallback(() => {
    if (!connection.current) return;
    setMicOn((current) => {
      connection.current?.setMicEnabled(!current);
      return !current;
    });
  }, []);

  const request = useCallback(async (action: "slower" | "explain") => {
    const room = connection.current?.room;
    if (!room) return;
    const agent = [...room.remoteParticipants.values()].find((participant) => participant.attributes["lk.agent.state"]);
    if (!agent) return;
    try {
      await room.localParticipant.performRpc({
        destinationIdentity: agent.identity,
        method: "voice_tutor_request",
        payload: action,
      });
    } catch {
      if (mounted.current && connection.current?.room === room) setError("CONNECTION_ERROR");
    }
  }, []);

  return { phase, agentState, error, caption, captionPrev, userSaid, emotion, micOn, elapsedSec, limitSec, start, end, toggleMic, request };
}
