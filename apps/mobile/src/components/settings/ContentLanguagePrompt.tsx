import { useEffect, useState } from "react";
import ContentLanguageSheet from "./ContentLanguageSheet";
import { useSettingsStore } from "@/store/settings.store";
import { detectDeviceContentLanguage } from "@/locales/i18n";

/**
 * 한국어 UI 인데 뜻·설명 언어를 아직 안 고른 사람에게 **한 번** 묻는다.
 *
 * 두 부류가 걸린다:
 *   · 한국어 폰으로 처음 설치한 사람 (한국에 사는 우즈벡 사람이 딱 이 경우) → 웰컴에서
 *   · 이 설정이 생기기 전부터 한국어 UI 를 쓰던 사람 → 메인 탭에서
 *
 * 닫기만 해도 기본값(기기 언어에서 추정)을 저장한다. 안 그러면 탭을 열 때마다
 * 또 뜬다. 나중에 바꾸는 건 언어 설정 화면에서.
 *
 * 언어 설정 화면에서 한국어를 고를 때는 이걸 안 쓴다 — 그 화면이 직접 시트를
 * 열고, 열기 전에 기본값을 먼저 저장해서 여기 조건(null)에 안 걸리게 한다.
 */
/** 저장된 설정을 디스크에서 복원했는지 */
function useSettingsHydrated() {
  const [hydrated, setHydrated] = useState(() =>
    useSettingsStore.persist.hasHydrated(),
  );
  // 복원하기 전엔 contentLanguage 가 늘 null 이다. 그때 물으면 이미 고른 사람한테도 또 묻는다
  useEffect(() => {
    if (hydrated) return;
    return useSettingsStore.persist.onFinishHydration(() => setHydrated(true));
  }, [hydrated]);
  return hydrated;
}

/**
 * 뜻·설명 언어 시트가 아직 남아 있는지 — 설정 복원 전이거나, 한국어 UI 인데 안 골랐거나.
 *
 * 처음 뜨는 다른 안내(홈 기능 투어 등)는 **이게 false 가 된 뒤에** 켠다.
 * 둘이 같이 뜨면 투어의 어두운 막이 시트 위를 덮어 아무것도 못 누른다.
 */
export function useContentLanguagePending() {
  const hydrated = useSettingsHydrated();
  const language = useSettingsStore((st) => st.language);
  const saved = useSettingsStore((st) => st.contentLanguage);
  return !hydrated || (language === "ko" && saved === null);
}

export default function ContentLanguagePrompt() {
  const language = useSettingsStore((st) => st.language);
  const saved = useSettingsStore((st) => st.contentLanguage);
  const setContentLanguage = useSettingsStore((st) => st.setContentLanguage);
  const hydrated = useSettingsHydrated();
  const [visible, setVisible] = useState(false);

  const needed = hydrated && language === "ko" && saved === null;

  useEffect(() => {
    if (!needed) {
      setVisible(false);
      return;
    }
    // 화면이 자리 잡은 다음에 올린다 — 전환 애니와 겹치면 툭 튀어나온다
    const timer = setTimeout(() => setVisible(true), 650);
    return () => clearTimeout(timer);
  }, [needed]);

  if (!needed) return null;

  const fallback = detectDeviceContentLanguage();
  return (
    <ContentLanguageSheet
      visible={visible}
      value={fallback}
      onConfirm={(lang) => {
        setVisible(false);
        setContentLanguage(lang);
      }}
      onClose={() => {
        setVisible(false);
        setContentLanguage(fallback);
      }}
    />
  );
}
