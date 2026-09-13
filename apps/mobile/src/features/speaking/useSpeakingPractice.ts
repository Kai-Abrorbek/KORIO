import { useCallback, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/auth.store";
import { useSpeech } from "@/hooks/useSpeech";
import { useSpeechRecorder, type SpeechRecorderError } from "@/hooks/useSpeechRecorder";
import { ExpressionService } from "@/services/expression.service";
import { SttService } from "@/services/stt.service";
import type { ExpressionListResponse } from "@/types/expression";
import * as Haptics from "@/utils/haptics";
import { summarizeSpeaking, type SpeakingResults } from "./session";

export type SpeakingPhase = "idle" | "starting" | "recording" | "assessing";
export type SpeakingError = "noSpeech" | "noVoice" | "permission" | "unsupported" | "tooShort" | "micError" | "assessError" | "audioError" | "saveFailed";

/**
 * 말하는 걸 단어 단위로 따라가기 위한 계획표.
 *
 * 온디바이스 음성인식이 없으므로(그건 새 네이티브 의존성이다) 마이크 입력
 * 세기로 추적한다. 소리가 나는 동안만 시간을 쌓고, 각 단어에 음절 수만큼
 * 시간을 배정해서 누적 시간이 그 단어의 몫을 넘기면 다음 단어로 넘어간다.
 * 말을 멈추면 하이라이트도 멈춘다. 정확한 인식은 아니지만 "내 목소리를
 * 따라온다"는 감각은 정확히 그 지점에서 나온다. 진짜 판정은 1초 뒤 서버
 * 채점 결과가 덮어쓴다.
 */
const MS_PER_SYLLABLE = 215;
/**
 * 마이크는 열렸는데 목소리가 이만큼 안 잡히면 화면에 바로 알린다.
 * 예전에는 이 상태로 20초를 앉아 있었고, 그게 "말해도 아무 반응이 없다" 였다.
 */
const QUIET_HINT_MS = 2200;

function buildSpeechPlan(sentence: string): number[] {
  const marks: number[] = [];
  let total = 0;
  for (const word of sentence.split(/\s+/).filter(Boolean)) {
    const hangul = word.match(/[가-힣]/g)?.length ?? 0;
    total += Math.max(1, hangul || Math.ceil(word.length / 2)) * MS_PER_SYLLABLE;
    marks.push(total);
  }
  return marks;
}

const recorderErrors: Record<SpeechRecorderError, SpeakingError> = {
  permission: "permission", unsupported: "unsupported", too_short: "tooShort",
  mic: "micError", no_voice: "noVoice",
};

export function useSpeakingPractice(packCode: string) {
  const { i18n } = useTranslation();
  const userId = useAuthStore((s) => s.user?.id);
  const loggedIn = useAuthStore((s) => s.isLoggedIn);
  const language = i18n.resolvedLanguage || i18n.language;
  const identity = `${userId ?? ""}|${language}|${packCode}`;
  const [data, setData] = useState<ExpressionListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [revision, setRevision] = useState(0);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<SpeakingResults>({});
  const [phase, setPhase] = useState<SpeakingPhase>("idle");
  const [error, setError] = useState<SpeakingError | null>(null);
  const [saving, setSaving] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [saveNotice, setSaveNotice] = useState(false);
  const [retryIds, setRetryIds] = useState<string[] | null>(null);
  const [autoEpoch, setAutoEpoch] = useState(0);
  const [spokenCount, setSpokenCount] = useState(0);
  const [level, setLevel] = useState(0);
  // 말하는 동안 문장의 어디쯤 왔는지 (0~1). 글자 따라가기에 그대로 먹인다.
  const [voicedProgress, setVoicedProgress] = useState(0);
  // 통과했을 때 초록 연출을 띄우고 잠시 뒤 다음 문장으로 넘어간다
  const [passFlash, setPassFlash] = useState(false);
  // 마이크가 열려 있는데 목소리가 안 잡히는 중인지. 화면에 즉시 알리는 용도
  const [quiet, setQuiet] = useState(false);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recordStartedAtRef = useRef(0);
  const nextRef = useRef<() => void>(() => undefined);
  // 녹음이 어디까지 갔는지 화면에 찍기 위한 단계 표시 (개발 빌드에서만 보인다)
  const [step, setStep] = useState("idle");
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buffersRef = useRef(0);
  const lastRmsRef = useRef(0);
  const gateRef = useRef(0);
  const levelSentAtRef = useRef(0);
  const speechPlanRef = useRef<number[]>([]);
  const voicedMsRef = useRef(0);
  const lastLevelAtRef = useRef(0);
  const phaseRef = useRef<SpeakingPhase>("idle");
  const autoKeyRef = useRef<string | null>(null);
  const autoRecordRef = useRef<() => Promise<void>>(async () => undefined);
  const speakAutoRef = useRef<ReturnType<typeof useSpeech>["speakAuto"]>(() => undefined);
  const resultsRef = useRef(results);
  const runRef = useRef(0);
  /**
   * ⚠️ 녹음 결과를 "유효성 검사" 로 버리지 않는다.
   *
   * 예전에는 recordingRef.run 과 recordGenRef 를 비교해서 어긋나면 WAV 를 조용히
   * 버렸다. 그 결과 runRef·recordGenRef·recordingRef·focusedRef·watchdogRef 중
   * **하나만 어긋나도** 사용자가 말한 게 아무 표시 없이 사라졌다. 화면은 그냥
   * idle 로 돌아가서, 맞았는지 틀렸는지 알 수 없었다 — 이게 그 증상이었다.
   *
   * 표현 연습 패널(ExpressionPracticePanel)은 이런 가드가 아예 없어서 같은 훅으로
   * 멀쩡히 돌아간다. 그 구조를 그대로 따른다:
   *   · 어떤 녹음이든 결과가 나오면 반드시 채점을 시도한다
   *   · 겹친 채점은 "마지막 것만 화면에 반영" 으로만 걸러낸다 (버리는 게 아니다)
   *   · 녹음 대상 id 는 아래 ref 에 담고, stopAll 은 이걸 건드리지 않는다
   */
  const assessRunRef = useRef(0);
  // start() 가 false 를 돌려줬을 때 훅이 이유를 알려줬는지. 안 알려줬으면
  // 우리가 대신 보여준다 — 눌렀는데 아무 일도 안 일어나는 경로를 남기지 않는다.
  const recorderErroredRef = useRef(false);
  const recordingIdRef = useRef<string | null>(null);
  const startAttemptRef = useRef(0);
  const focusedRef = useRef(false);
  const savingRef = useRef(false);
  const sessionRef = useRef(identity);
  sessionRef.current = identity;

  const { speak, speakSlow, speakAuto, stop: stopSpeech, isSpeaking, isSpeechPlaying, speechProgress } = useSpeech();
  const queue = retryIds ? (data?.items ?? []).filter((item) => retryIds.includes(item.id)) : data?.items ?? [];
  const current = queue[index];
  const completed = !loading && !loadFailed && queue.length > 0 && index >= queue.length;
  const result = current ? results[current.id] ?? null : null;

  const changePhase = useCallback((next: SpeakingPhase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const { start, stop: stopRecording, cancel } = useSpeechRecorder({
    // 20초는 너무 길었다. 침묵 감지가 한 번 어긋나면 그 20초가 통째로
    // "아무 반응 없음" 이 된다. 한 문장 따라 말하기에 12초면 충분하다.
    maxSeconds: 12,
    // 말이 끝나면 알아서 제출한다. 이게 없으면 사용자가 stop 을 누르거나
    // maxSeconds 가 다 지날 때까지 화면이 멈춰 있는 것처럼 보인다.
    silenceStopMs: 900,
    onLevel: (rms, info) => {
      const now = Date.now();
      // 파형을 실제 입력에 연결한다. 소리가 안 들어오면 화면에서 바로 보인다.
      if (buffersRef.current === 0) setStep("buf");
      buffersRef.current += 1;
      lastRmsRef.current = Math.round(rms);
      gateRef.current = info.gate;
      if (now - levelSentAtRef.current >= 90) {
        levelSentAtRef.current = now;
        // 정규화는 훅이 실제 입력 최대치를 보고 한다. 고정 3200 으로 나누면
        // 입력이 작은 기기에서 파형이 거의 안 움직였다.
        setLevel(info.level);
        const total = speechPlanRef.current[speechPlanRef.current.length - 1] ?? 0;
        setVoicedProgress(total > 0 ? Math.min(1, voicedMsRef.current / total) : 0);
        setQuiet(
          !info.everVoiced && now - recordStartedAtRef.current > QUIET_HINT_MS,
        );
      }
      const marks = speechPlanRef.current;
      if (!marks.length) return;
      const previous = lastLevelAtRef.current;
      lastLevelAtRef.current = now;
      // 목소리 판정은 훅이 배경 소음 바닥 위로 얼마나 튀는지로 한다.
      // 여기서 고정 임계값을 다시 두면 같은 버그를 두 군데 심는 것이다.
      if (!info.voiced) return;
      // 첫 버퍼는 간격을 알 수 없고, 앱이 잠깐 멈췄다 오면 간격이 크게 튄다
      voicedMsRef.current += previous ? Math.min(now - previous, 260) : 0;
      let reached = 0;
      while (reached < marks.length && voicedMsRef.current >= marks[reached]) reached += 1;
      setSpokenCount((value) => (value === reached ? value : reached));
    },
    onResult: async (wav) => {
      // 녹음할 때 잡아둔 대상. 없으면 지금 카드로 떨어진다 —
      // "어느 문장인지 모르겠으니 버린다" 는 선택지가 없다.
      const expressionId = recordingIdRef.current ?? current?.id ?? null;
      if (!expressionId) {
        setStep("no-target");
        setError("assessError");
        changePhase("idle");
        return;
      }
      const run = ++assessRunRef.current;
      setStep("upload");
      setQuiet(false);
      changePhase("assessing");
      try {
        const assessed = await SttService.assessExpression(expressionId, wav);
        // 더 최근 녹음이 이미 올라갔으면 화면만 그쪽에 양보한다
        if (run !== assessRunRef.current) return;
        setStep(`scored ${Math.round(assessed.scores?.pron ?? 0)}`);
        if (assessed.status !== "success") {
          setError(assessed.status === "no_speech" ? "noSpeech" : "assessError");
          return;
        }
        setResults((previous) => ({ ...previous, [expressionId]: assessed }));
        if (assessed.passed) {
          void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          // 맞았으면 초록 연출을 보여주고 알아서 다음 문장으로 넘어간다.
          // 맞은 문장 앞에서 사용자가 다음 버튼을 찾게 만들 이유가 없다.
          setPassFlash(true);
          if (advanceRef.current) clearTimeout(advanceRef.current);
          advanceRef.current = setTimeout(() => {
            setPassFlash(false);
            nextRef.current();
          }, 1600);
        } else {
          void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }
      } catch {
        if (run === assessRunRef.current) setError("assessError");
      } finally {
        if (run === assessRunRef.current) changePhase("idle");
      }
    },
    onError: (code) => {
      setStep(`err:${code}`);
      recorderErroredRef.current = true;
      setQuiet(false);
      changePhase("idle");
      setError(recorderErrors[code]);
    },
  });

  const stopAll = useCallback(() => {
    if (watchdogRef.current) {
      clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }
    if (advanceRef.current) {
      clearTimeout(advanceRef.current);
      advanceRef.current = null;
    }
    setPassFlash(false);
    setQuiet(false);
    runRef.current += 1;
    // recordingIdRef / assessRunRef 는 건드리지 않는다. 여기서 비우면
    // 이미 올라간 채점 결과가 돌아와도 화면에 못 붙는다.
    startAttemptRef.current += 1;
    speechPlanRef.current = [];
    setSpokenCount(0);
    setLevel(0);
    setVoicedProgress(0);
    cancel();
    stopSpeech();
    changePhase("idle");
  }, [cancel, stopSpeech, changePhase]);

  // stopAll 은 ref 로만 부른다. 의존성에 넣으면 그게 한 번이라도 바뀔 때
  // 이펙트가 재구독되고, 그 정리 함수가 stopAll() 을 부른다 — 녹음 중이면
  // 그 자리에서 죽는다. 표현 연습 패널에는 이 두 이펙트가 아예 없어서
  // 같은 녹음 훅을 쓰는데도 거기서는 멀쩡했다.
  const stopAllRef = useRef(stopAll);
  useEffect(() => {
    stopAllRef.current = stopAll;
  });

  useFocusEffect(useCallback(() => {
    focusedRef.current = true;
    return () => {
      focusedRef.current = false;
      stopAllRef.current();
    };
  }, []));

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      // "inactive" 는 권한 대화상자·볼륨 UI 같은 일시적 가림에도 뜬다.
      // 그걸로 녹음을 끊으면 안 된다. 진짜 백그라운드일 때만 정리한다.
      if (state === "background") stopAllRef.current();
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    let active = true;
    stopAllRef.current();
    setLoading(true);
    setLoadFailed(false);
    setData(null);
    setIndex(0);
    setResults({});
    setRetryIds(null);
    setHidden(false);
    setError(null);
    setSaveNotice(false);
    setSaving(false);
    savingRef.current = false;
    autoKeyRef.current = null;
    if (!packCode || !userId || !loggedIn) {
      setLoadFailed(true);
      setLoading(false);
      return () => { active = false; };
    }
    void ExpressionService.getPackExpressions(packCode).then((response) => {
      if (active) setData({ ...response, items: response.items.filter((item) => item.korean.trim()) });
    }).catch(() => {
      if (active) setLoadFailed(true);
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [identity, packCode, userId, loggedIn, revision]);

  const listen = (slow = false, word?: string) => {
    if (!current || phaseRef.current !== "idle") return;
    if (isSpeaking && !word) { stopSpeech(); return; }
    setError(null);
    const run = runRef.current;
    const options = {
      respectSoundSettings: false,
      volume: 1,
      onError: () => { if (run === runRef.current && focusedRef.current) setError("audioError"); },
    };
    (slow ? speakSlow : speak)(word || current.korean, "ko-KR", options);
  };

  /**
   * 마이크 버튼. 표현 연습 패널의 handleMicPress + beginRecording 과 같은 모양이다.
   *
   * 예전에는 여기에 8초 Promise.race, 정지 워치독, 1초 이내 탭은 무시하는 "re-arm",
   * runRef/recordGenRef 증가가 뒤섞여 있었다. 경로가 많아진 만큼 **아무 일도
   * 안 일어나고 끝나는 경로**도 많아졌다. 지금은 세 가지만 한다:
   * 녹음 중이면 멈추고, 채점 중이면 무시하고, 그 외엔 시작한다.
   */
  const record = async () => {
    setStep("tap");
    if (!current) { setStep("no-card"); return; }
    // 채점 중에만 무시한다. 채점은 곧 끝나고 결과가 화면에 뜬다.
    if (phaseRef.current === "assessing") { setStep("busy-assessing"); return; }
    // 녹음 중이면 그 자리에서 끝낸다. 여기서 "너무 빨리 눌렀다" 며 아무것도
    // 안 하면, 사용자는 죽은 버튼을 누른 것과 구별할 방법이 없다.
    if (phaseRef.current === "recording") {
      setStep("manual-stop");
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      stopRecording();
      // finish() 는 내부 active 플래그가 이미 내려가 있으면 아무것도 안 하고
      // 돌아온다. 그러면 화면이 빨간 녹음 상태로 굳고 다시 눌러도 같은 자리로
      // 떨어진다. finish() 는 동기적으로 onResult/onError 를 부르므로, 여기서
      // phase 가 안 움직였다면 아무 일도 없었다는 뜻이다 — 되돌린다.
      if (phaseRef.current === "recording") {
        setStep("stop-noop");
        cancel();
        setError("micError");
        changePhase("idle");
      }
      return;
    }

    // 버튼을 눌렀다는 건 이 화면이 떠 있다는 뜻이다. useFocusEffect 가 어떤
    // 이유로든 못 돌았어도 여기서부터는 포커스로 친다.
    focusedRef.current = true;
    stopSpeech();
    setError(null);
    setSaveNotice(false);
    setQuiet(false);
    changePhase("starting");
    speechPlanRef.current = buildSpeechPlan(current.korean);
    voicedMsRef.current = 0;
    lastLevelAtRef.current = 0;
    buffersRef.current = 0;
    lastRmsRef.current = 0;
    setSpokenCount(0);
    setLevel(0);
    setVoicedProgress(0);
    // 채점 대상은 지금 확정한다. 결과가 돌아올 때 이 값만 본다.
    recordingIdRef.current = current.id;
    const attempt = ++startAttemptRef.current;

    setStep("starting");
    recorderErroredRef.current = false;
    let started = false;
    try {
      started = await start();
    } catch (error) {
      setStep(`throw:${String(error).slice(0, 40)}`);
      setError("micError");
      changePhase("idle");
      return;
    }

    // 그 사이에 화면을 떠났거나 다시 눌렀으면 이 시도만 접는다
    if (attempt !== startAttemptRef.current) {
      if (started) cancel();
      // 더 최근 시도가 phase 를 쥐고 있으면 건드리지 않는다. 아무도 없으면
      // "starting" 스피너가 그대로 굳으므로 되돌린다.
      if (phaseRef.current === "starting") changePhase("idle");
      return;
    }
    if (!started) {
      // 훅이 이유를 알려줬으면 그 메시지가 이미 떠 있다. 안 알려준 경우
      // (훅이 이미 녹음 중이라고 판단해 그냥 false 를 준 경우) 우리가 보여준다.
      if (!recorderErroredRef.current) {
        setStep("start-refused");
        cancel();
        setError("micError");
      }
      changePhase("idle");
      return;
    }

    changePhase("recording");
    recordStartedAtRef.current = Date.now();
    setStep("rec");
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // 스트림은 열렸는데 버퍼가 한 개도 안 오면 소리 없이 죽은 것이다.
    // 그 상태로 두면 사용자는 끝까지 기다리다 "안 된다" 고 판단한다.
    if (watchdogRef.current) clearTimeout(watchdogRef.current);
    watchdogRef.current = setTimeout(() => {
      if (attempt !== startAttemptRef.current) return;
      if (phaseRef.current !== "recording" || buffersRef.current > 0) return;
      setStep("no-buffer");
      cancel();
      setError("micError");
      changePhase("idle");
    }, 2000);
  };

  // 카드가 뜨면 먼저 들려주고, 다 읽자마자 마이크를 연다 — 바로 따라 말할 수 있게.
  // 자동 재생을 꺼 둔 사용자는 speakAuto 가 조용히 지나가므로 마이크도 열리지
  // 않는다. 그건 의도한 것이고, 그 경우엔 마이크 버튼으로 직접 시작하면 된다.
  useEffect(() => {
    autoRecordRef.current = record;
    nextRef.current = next;
    resultsRef.current = results;
    speakAutoRef.current = speakAuto;
  });

  const currentId = current?.id;
  const currentKorean = current?.korean;
  useEffect(() => {
    if (loading || completed || !currentId || !currentKorean) return;
    const key = `${autoEpoch}:${index}:${currentId}`;
    if (autoKeyRef.current === key) return;
    autoKeyRef.current = key;
    // 이미 채점한 카드로 되돌아온 거라면 다시 읽어주지 않는다
    if (resultsRef.current[currentId]) return;
    const run = runRef.current;
    const ready = () =>
      focusedRef.current && runRef.current === run && phaseRef.current === "idle";
    // 화면 전환 애니메이션이 끝난 뒤에 말하게 한다
    const timer = setTimeout(() => {
      if (!ready()) return;
      setError(null);
      speakAutoRef.current(currentKorean, "ko-KR", {
        respectSoundSettings: false,
        volume: 1,
        onDone: () => {
          // 재생을 막 멈춘 오디오 세션이 정리되기 전에 AudioRecord 를 열면
          // 안드로이드가 "마이크를 다른 곳이 쥐고 있다"로 던진다. 한 박자 준다.
          setTimeout(() => {
            if (ready()) void autoRecordRef.current();
          }, 250);
        },
      });
    }, 450);
    return () => clearTimeout(timer);
    // ⚠️ speakAuto 를 deps 에 두면 안 된다. useSpeech 의 speakAuto 는 렌더마다
    // 새로 만들어질 수 있고, 그러면 이 이펙트가 매 렌더 재실행된다. 재실행되면
    // autoKeyRef 검사에서 바로 빠져나가면서 **정리 함수가 타이머만 지우고 새
    // 타이머는 안 걸린다** — TTS 가 안 나가고, 따라서 마이크도 안 열린다.
  }, [autoEpoch, index, currentId, currentKorean, loading, completed]);

  const next = () => {
    if (!current || savingRef.current) return;
    if (advanceRef.current) {
      clearTimeout(advanceRef.current);
      advanceRef.current = null;
    }
    setPassFlash(false);
    stopAll();
    setError(null);
    setSaveNotice(false);
    setIndex((previous) => previous + 1);
    void Haptics.selectionAsync();
  };

  const toggleSaved = async () => {
    if (!current || savingRef.current) return;
    const requestIdentity = sessionRef.current;
    const expressionId = current.id;
    const saved = !current.progress.isSaved;
    savingRef.current = true;
    setSaving(true);
    setError(null);
    setSaveNotice(false);
    try {
      const response = await ExpressionService.setSaved(expressionId, saved);
      if (sessionRef.current !== requestIdentity || !focusedRef.current) return;
      setData((previous) => previous ? {
        ...previous,
        items: previous.items.map((item) => item.id === expressionId ? { ...item, progress: response.progress } : item),
      } : previous);
      setSaveNotice(saved);
      void Haptics.selectionAsync();
    } catch {
      if (sessionRef.current === requestIdentity && focusedRef.current) setError("saveFailed");
    } finally {
      if (sessionRef.current === requestIdentity) {
        savingRef.current = false;
        setSaving(false);
      }
    }
  };

  const restart = (onlyDifficult = false) => {
    stopAll();
    autoKeyRef.current = null;
    setAutoEpoch((value) => value + 1);
    const difficult = summarizeSpeaking(results).retryIds;
    setRetryIds(onlyDifficult && difficult.length ? difficult : null);
    setIndex(0);
    setResults({});
    setError(null);
    setHidden(false);
    setSaveNotice(false);
  };

  return {
    data, queue, current, index, result, phase, error, loading, loadFailed,
    completed, saving, hidden, saveNotice, isSpeaking, spokenCount, level,
    isSpeechPlaying, speechProgress, voicedProgress, passFlash, quiet,
    debug: { buffers: buffersRef.current, rms: lastRmsRef.current, gate: gateRef.current, step },
    summary: summarizeSpeaking(results),
    reload: () => setRevision((value) => value + 1),
    toggleHidden: () => setHidden((value) => !value),
    listen, record, next, toggleSaved, restart, stopAll,
  };
}
