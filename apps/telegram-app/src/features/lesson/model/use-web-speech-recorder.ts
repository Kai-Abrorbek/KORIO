"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  acquireMicrophoneStream,
  setSharedMicrophoneEnabled,
} from "../../../shared/browser/microphone-session";

const TARGET_RATE = 16_000;
const MIN_SECONDS = 0.4;

type RecorderError = "mic" | "permission" | "too_short" | "unsupported";

interface RecorderOptions {
  onError: (error: RecorderError) => void;
  onLevel?: (level: number) => void;
  onResult: (wav: ArrayBuffer) => void;
}

function resample(input: Float32Array, sourceRate: number): Float32Array {
  if (sourceRate === TARGET_RATE) return input;
  const ratio = sourceRate / TARGET_RATE;
  const length = Math.max(1, Math.round(input.length / ratio));
  const output = new Float32Array(length);
  for (let index = 0; index < length; index += 1) {
    const source = index * ratio;
    const before = Math.floor(source);
    const after = Math.min(input.length - 1, before + 1);
    const blend = source - before;
    output[index] = (input[before] ?? 0) * (1 - blend) + (input[after] ?? 0) * blend;
  }
  return output;
}

function encodeWav(samples: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const text = (offset: number, value: string) => {
    for (let index = 0; index < value.length; index += 1) {
      view.setUint8(offset + index, value.charCodeAt(index));
    }
  };
  text(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  text(8, "WAVE");
  text(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, TARGET_RATE, true);
  view.setUint32(28, TARGET_RATE * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  text(36, "data");
  view.setUint32(40, samples.length * 2, true);
  samples.forEach((sample, index) => {
    const clamped = Math.max(-1, Math.min(1, sample));
    view.setInt16(44 + index * 2, clamped < 0 ? clamped * 32768 : clamped * 32767, true);
  });
  return buffer;
}

export function useWebSpeechRecorder({ onError, onLevel, onResult }: RecorderOptions) {
  const [recording, setRecording] = useState(false);
  const active = useRef(false);
  const chunks = useRef<Float32Array[]>([]);
  const context = useRef<AudioContext | null>(null);
  const source = useRef<MediaStreamAudioSourceNode | null>(null);
  const processor = useRef<ScriptProcessorNode | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const voiceStarted = useRef(false);
  const lastVoiceAt = useRef(0);
  const stopRef = useRef<() => void>(() => undefined);
  const onErrorRef = useRef(onError);
  const onLevelRef = useRef(onLevel);
  const onResultRef = useRef(onResult);
  onErrorRef.current = onError;
  onLevelRef.current = onLevel;
  onResultRef.current = onResult;

  const cleanup = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    processor.current?.disconnect();
    source.current?.disconnect();
    setSharedMicrophoneEnabled(false);
    void context.current?.close().catch(() => undefined);
    timer.current = undefined;
    processor.current = null;
    source.current = null;
    context.current = null;
  }, []);

  const stop = useCallback(() => {
    if (!active.current) return;
    active.current = false;
    setRecording(false);
    const sampleRate = context.current?.sampleRate ?? TARGET_RATE;
    const length = chunks.current.reduce((sum, chunk) => sum + chunk.length, 0);
    const merged = new Float32Array(length);
    let offset = 0;
    chunks.current.forEach((chunk) => {
      merged.set(chunk, offset);
      offset += chunk.length;
    });
    chunks.current = [];
    cleanup();
    const converted = resample(merged, sampleRate);
    if (converted.length < TARGET_RATE * MIN_SECONDS) {
      onErrorRef.current("too_short");
      return;
    }
    onResultRef.current(encodeWav(converted));
  }, [cleanup]);
  stopRef.current = stop;

  const start = useCallback(async () => {
    if (active.current) return true;
    if (!navigator.mediaDevices?.getUserMedia || typeof AudioContext === "undefined") {
      onErrorRef.current("unsupported");
      return false;
    }
    try {
      const media = await acquireMicrophoneStream();
      const audioContext = new AudioContext();
      await audioContext.resume();
      const mediaSource = audioContext.createMediaStreamSource(media);
      const node = audioContext.createScriptProcessor(4096, 1, 1);
      const silent = audioContext.createGain();
      silent.gain.value = 0;
      chunks.current = [];
      voiceStarted.current = false;
      lastVoiceAt.current = Date.now();
      node.onaudioprocess = (event) => {
        if (!active.current) return;
        const data = new Float32Array(event.inputBuffer.getChannelData(0));
        chunks.current.push(data);
        let power = 0;
        for (let index = 0; index < data.length; index += 8) power += (data[index] ?? 0) ** 2;
        const level = Math.sqrt(power / Math.max(1, Math.ceil(data.length / 8)));
        onLevelRef.current?.(level);
        const now = Date.now();
        if (level >= 0.018) {
          voiceStarted.current = true;
          lastVoiceAt.current = now;
        } else if (voiceStarted.current && now - lastVoiceAt.current > 1_150) {
          window.setTimeout(() => stopRef.current(), 0);
        }
      };
      mediaSource.connect(node);
      node.connect(silent);
      silent.connect(audioContext.destination);
      context.current = audioContext;
      source.current = mediaSource;
      processor.current = node;
      active.current = true;
      setRecording(true);
      timer.current = window.setTimeout(() => stopRef.current(), 15_000);
      return true;
    } catch (error) {
      cleanup();
      onErrorRef.current(
        error instanceof DOMException && error.name === "NotAllowedError" ? "permission" : "mic",
      );
      return false;
    }
  }, [cleanup]);

  const cancel = useCallback(() => {
    active.current = false;
    chunks.current = [];
    setRecording(false);
    cleanup();
  }, [cleanup]);

  useEffect(() => cancel, [cancel]);
  return { cancel, recording, start, stop };
}
