import * as Speech from "expo-speech";
import { useCallback, useEffect, useRef, useState } from "react";

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback((text: string, lang: string = "ko-KR") => {
    Speech.stop();
    setIsSpeaking(true);
    Speech.speak(text, {
      language: lang,
      rate: 0.9,
      pitch: 1.0,
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
    });
  }, []);

  const speakSlow = useCallback((text: string, lang: string = "ko-KR") => {
    Speech.stop();
    setIsSpeaking(true);
    Speech.speak(text, {
      language: lang,
      rate: 0.5,
      pitch: 1.0,
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
    });
  }, []);

  const stop = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  return { speak, speakSlow, stop, isSpeaking };
}
