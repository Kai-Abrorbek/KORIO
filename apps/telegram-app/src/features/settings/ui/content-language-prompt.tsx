"use client";

import { useEffect, useState } from "react";

import { useAppLanguage } from "../../../shared/i18n/language-context";
import { detectDeviceContentLanguage } from "../../../shared/i18n/content-language";
import { ContentLanguageSheet } from "./content-language-sheet";

/**
 * 한국어 UI 인데 뜻·설명 언어를 아직 안 고른 사람에게 한 번 묻는다
 * (모바일의 ContentLanguagePrompt 와 같다). 웰컴과 홈에 건다.
 * 닫기만 해도 기본값(텔레그램 언어에서 추정)을 저장해 다시 뜨지 않는다.
 */
export function ContentLanguagePrompt() {
  const { language, ready, savedContentLanguage, setContentLanguage } = useAppLanguage();
  const needed = ready && language === "ko" && savedContentLanguage === null;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!needed) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setVisible(true), 650);
    return () => window.clearTimeout(timer);
  }, [needed]);

  if (!needed) return null;
  const fallback = detectDeviceContentLanguage();
  return (
    <ContentLanguageSheet
      onClose={() => setContentLanguage(fallback)}
      onConfirm={(next) => setContentLanguage(next)}
      value={fallback}
      visible={visible}
    />
  );
}
