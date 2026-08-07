import * as Speech from "expo-speech";
import { useCallback, useEffect, useState } from "react";
import { useSettingsStore } from "@/store/settings.store";

/** 느리게 듣기는 설정 속도에서 한 단계 더 내린다 */
const SLOW_FACTOR = 0.55;

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // 설정은 재생 시점에 읽는다 (구독하면 값이 바뀔 때마다 콜백이 새로 생긴다)
  const run = useCallback((text: string, lang: string, slow: boolean) => {
    const { sound, muted } = useSettingsStore.getState();
    if (muted || sound.speechVolume <= 0) return;

    Speech.stop();
    setIsSpeaking(true);
    Speech.speak(text, {
      language: lang,
      rate: slow ? sound.speechRate * SLOW_FACTOR : sound.speechRate,
      pitch: 1.0,
      volume: sound.speechVolume,
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
    });
  }, []);

  const speak = useCallback(
    (text: string, lang: string = "ko-KR") => run(text, lang, false),
    [run],
  );

  const speakSlow = useCallback(
    (text: string, lang: string = "ko-KR") => run(text, lang, true),
    [run],
  );

  /**
   * 문제가 뜨자마자 알아서 읽어주는 용도.
   * 설정에서 자동 재생을 끄면 아무것도 안 한다 (버튼은 그대로 동작).
   */
  const speakAuto = useCallback(
    (text: string, lang: string = "ko-KR") => {
      if (!useSettingsStore.getState().sound.autoPlay) return;
      run(text, lang, false);
    },
    [run],
  );

  const stop = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  return { speak, speakSlow, speakAuto, stop, isSpeaking };
}
