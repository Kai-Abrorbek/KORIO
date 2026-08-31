import { useCallback, useEffect, useRef, useState } from "react";
import { SttService } from "@/services/stt.service";
import {
  useContinuousReadingRecorder,
  type ReadingRecorderError,
  type SegmentVerdict,
} from "./useContinuousReadingRecorder";

export type ReadingPracticePhase =
  | "idle"
  | "listening"
  | "assessing"
  | "retry"
  | "complete";

export type ReadingPracticeError =
  | ReadingRecorderError
  | "no_speech"
  | "assessment";

/**
 * 한 번에 채점할 단어 수.
 *
 * 예전에는 5였다. 녹음을 멈추고 채점하던 시절엔 구간이 길수록 잃는 말이
 * 많았기 때문이다. 지금은 마이크를 안 끄고 남은 오디오도 이어지므로 크게
 * 잡는 게 낫다 — 한 번 왕복에 더 많은 단어가 넘어가서 화면이 목소리를
 * 덜 뒤처진다. 서버 상한은 12다.
 */
const WORDS_PER_ASSESSMENT = 8;

interface Options {
  lessonCode: string;
  totalWords: number;
}

/**
 * 읽기 연습 진행 상태.
 *
 * 녹음은 useContinuousReadingRecorder 가 계속 돌리고, 여기서는 구간이 올 때마다
 * 채점 결과로 "지금 어느 단어를 읽어야 하는지" 만 옮긴다. 유저는 멈출 필요 없이
 * 쭉 읽으면 되고, 화면이 뒤따라온다.
 */
export function useReadingPronunciationPractice({
  lessonCode,
  totalWords,
}: Options) {
  const [phase, setPhase] = useState<ReadingPracticePhase>("idle");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [failedWordIndex, setFailedWordIndex] = useState<number | null>(null);
  const [error, setError] = useState<ReadingPracticeError | null>(null);
  const [sessionActive, setSessionActive] = useState(false);

  const activeRef = useRef(false);
  const currentWordRef = useRef(0);
  const totalWordsRef = useRef(totalWords);
  totalWordsRef.current = totalWords;
  const lessonCodeRef = useRef(lessonCode);
  lessonCodeRef.current = lessonCode;
  const stopRef = useRef<() => void>(() => undefined);

  /**
   * 구간 하나를 채점한다.
   *
   * 돌려주는 값이 곧 "이 오디오를 어디까지 버릴지" 다:
   *  - 통과했으면 채점이 끝난 지점까지만 버린다 → 더 읽은 부분은 다음으로 이어짐
   *  - 틀렸거나 못 알아들었으면 통째로 버린다 → 그 단어부터 새로 읽어야 하니까
   */
  const handleSegment = useCallback(
    async (wav: ArrayBuffer): Promise<SegmentVerdict> => {
      if (!activeRef.current) return { consumedMs: 0, dropAll: true };

      const requestedIndex = currentWordRef.current;
      setPhase("assessing");

      try {
        const result = await SttService.assessReading(
          lessonCodeRef.current,
          requestedIndex,
          WORDS_PER_ASSESSMENT,
          wav,
        );

        // 채점하는 사이에 세션이 끝났거나 위치가 바뀌었으면 이 결과는 버린다
        if (!activeRef.current || currentWordRef.current !== requestedIndex) {
          return { consumedMs: 0, dropAll: true };
        }

        if (result.status !== "success") {
          // 숨소리만 담긴 구간은 계속 읽는 중이면 당연히 생긴다.
          // 이걸 에러로 띄우면 잘 읽고 있는데 경고가 번쩍인다. 조용히 넘긴다.
          setPhase("listening");
          return { consumedMs: 0, dropAll: true };
        }

        setError(null);
        currentWordRef.current = result.nextWordIndex;
        setCurrentWordIndex(result.nextWordIndex);
        setFailedWordIndex(result.failedWordIndex);

        if (result.complete) {
          activeRef.current = false;
          setSessionActive(false);
          setPhase("complete");
          stopRef.current();
          return { consumedMs: 0, dropAll: true };
        }

        const failed = result.failedWordIndex !== null;
        setPhase(failed ? "retry" : "listening");
        return failed
          ? { consumedMs: 0, dropAll: true }
          : { consumedMs: result.consumedMs ?? 0, dropAll: false };
      } catch {
        if (activeRef.current) {
          setError("assessment");
          setPhase("listening");
        }
        return { consumedMs: 0, dropAll: true };
      }
    },
    [],
  );

  const handleRecorderError = useCallback(
    (recorderError: ReadingRecorderError) => {
      setError(recorderError);
      activeRef.current = false;
      setSessionActive(false);
      setPhase("idle");
    },
    [],
  );

  const { start, stop: stopRecorder, isRecording } =
    useContinuousReadingRecorder({
      onSegment: handleSegment,
      onError: handleRecorderError,
    });
  stopRef.current = stopRecorder;

  const stop = useCallback(() => {
    activeRef.current = false;
    stopRecorder();
    setSessionActive(false);
    setPhase((current) => (current === "complete" ? current : "idle"));
  }, [stopRecorder]);

  const reset = useCallback(() => {
    stop();
    currentWordRef.current = 0;
    setCurrentWordIndex(0);
    setFailedWordIndex(null);
    setError(null);
    setPhase("idle");
  }, [stop]);

  const toggle = useCallback(async () => {
    if (activeRef.current) {
      stop();
      return;
    }
    if (!totalWordsRef.current) return;

    // 끝까지 읽었던 상태에서 다시 누르면 처음부터
    if (currentWordRef.current >= totalWordsRef.current) {
      currentWordRef.current = 0;
      setCurrentWordIndex(0);
    }
    setFailedWordIndex(null);
    setError(null);
    activeRef.current = true;
    setSessionActive(true);
    setPhase("listening");

    const started = await start();
    if (!started && activeRef.current) {
      activeRef.current = false;
      setSessionActive(false);
      setPhase("idle");
    }
  }, [start, stop]);

  const resetRef = useRef(reset);
  resetRef.current = reset;

  useEffect(() => {
    resetRef.current();
  }, [lessonCode]);

  useEffect(
    () => () => {
      activeRef.current = false;
    },
    [],
  );

  return {
    phase,
    currentWordIndex,
    failedWordIndex,
    error,
    sessionActive,
    isRecording,
    toggle,
    stop,
    reset,
  };
}
