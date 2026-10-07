"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { isAppLanguage, type AppLanguage } from "./language";
import {
  detectDeviceLanguage,
  readSavedContentLanguage,
  resolveContentLanguage,
  saveContentLanguage,
  type ContentLanguage,
} from "./content-language";
import {
  loadTranslationCatalog,
  translateValue,
  translateWithKey,
  type TranslationCatalog,
} from "./translation-catalog";

const STORAGE_KEY = "korio-language";
const TRANSLATED_ATTRIBUTES = ["aria-label", "placeholder", "title"] as const;

export interface LanguageContextValue {
  language: AppLanguage;
  ready: boolean;
  setLanguage: (language: AppLanguage) => void;
  /** 실제로 쓸 뜻·설명 언어 (UI 가 ko 면 따로 고른 값) */
  contentLanguage: ContentLanguage;
  /** 사용자가 고른 설명 언어. null = 아직 안 물어봤다 */
  savedContentLanguage: ContentLanguage | null;
  setContentLanguage: (language: ContentLanguage) => void;
}

interface LocalizedValue {
  rendered: string;
  source: string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
/** DOM 밖에 뜨는 글(네이티브 팝업 등)을 옮길 때 쓰는 현재 번역 목록 */
let activeCatalog: TranslationCatalog | null = null;

/** 우즈벡어 원문을 지금 UI 언어로. DOM 이 아닌 곳(텔레그램 팝업, alert)에 쓴다 */
export function translateText(value: string) {
  return translateValue(value, activeCatalog);
}
const textValues = new WeakMap<Text, LocalizedValue>();
const attributeValues = new WeakMap<Element, Map<string, LocalizedValue>>();

function shouldSkip(element: Element | null) {
  return Boolean(
    element?.closest(
      "[data-no-translate],script,style,noscript,svg,code,pre",
    ),
  );
}

function localizeText(node: Text, catalog: TranslationCatalog | null) {
  if (shouldSkip(node.parentElement)) return;
  const current = node.nodeValue ?? "";
  const previous = textValues.get(node);
  const source = !previous || current !== previous.rendered
    ? current
    : previous.source;
  // 같은 원문이 여러 뜻인 곳("Ustoz" = 선생님 / 마스터 티어)은 부모의 data-i18n 키로 정한다
  const key = node.parentElement?.getAttribute("data-i18n");
  const keyed = key && catalog ? catalog.keys.get(key) : undefined;
  // 템플릿 키면 그 키의 틀로만 맞춘다 ({{n}}-kun → 3일째 / 3일차 / 3일 중 그 키 것)
  const rendered = keyed
    ? keyed.includes("{{")
      ? (translateWithKey(source, key ?? "", catalog) ?? translateValue(source, catalog))
      : keyed
    : translateValue(source, catalog);
  textValues.set(node, { rendered, source });
  if (current !== rendered) node.nodeValue = rendered;
}

function localizeAttribute(
  element: Element,
  attribute: (typeof TRANSLATED_ATTRIBUTES)[number],
  catalog: TranslationCatalog | null,
) {
  if (shouldSkip(element) || !element.hasAttribute(attribute)) return;
  const current = element.getAttribute(attribute) ?? "";
  let values = attributeValues.get(element);
  if (!values) {
    values = new Map();
    attributeValues.set(element, values);
  }
  const previous = values.get(attribute);
  const source = !previous || current !== previous.rendered
    ? current
    : previous.source;
  const rendered = translateValue(source, catalog);
  values.set(attribute, { rendered, source });
  if (current !== rendered) element.setAttribute(attribute, rendered);
}

function localizeNode(node: Node, catalog: TranslationCatalog | null) {
  if (node.nodeType === Node.TEXT_NODE) {
    localizeText(node as Text, catalog);
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  const element = node as Element;
  if (shouldSkip(element)) return;
  TRANSLATED_ATTRIBUTES.forEach((attribute) => {
    localizeAttribute(element, attribute, catalog);
  });
  element.childNodes.forEach((child) => localizeNode(child, catalog));
}

function localizeDocument(catalog: TranslationCatalog | null) {
  if (!document.body) return () => undefined;
  localizeNode(document.body, catalog);
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "characterData") {
        localizeText(mutation.target as Text, catalog);
      } else if (mutation.type === "attributes") {
        const attribute = mutation.attributeName;
        if (
          attribute &&
          TRANSLATED_ATTRIBUTES.includes(
            attribute as (typeof TRANSLATED_ATTRIBUTES)[number],
          )
        ) {
          localizeAttribute(
            mutation.target as Element,
            attribute as (typeof TRANSLATED_ATTRIBUTES)[number],
            catalog,
          );
        }
      } else {
        mutation.addedNodes.forEach((node) => localizeNode(node, catalog));
      }
    });
  });
  observer.observe(document.body, {
    attributeFilter: [...TRANSLATED_ATTRIBUTES],
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  });
  return () => observer.disconnect();
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>("uz");
  const [savedContentLanguage, setSavedContentLanguage] =
    useState<ContentLanguage | null>(null);
  const [catalog, setCatalog] = useState<TranslationCatalog | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    // 첫 실행은 텔레그램(기기) 언어. 예전엔 무조건 우즈벡어였다 — 앱과 같게
    const next = isAppLanguage(saved) ? saved : detectDeviceLanguage();
    setSavedContentLanguage(readSavedContentLanguage());
    document.documentElement.lang = next;
    document.documentElement.dataset.language = next;
    setLanguageState(next);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    let active = true;
    setCatalog(null);
    void loadTranslationCatalog(language).then((next) => {
      if (active) setCatalog(next);
    });
    return () => {
      active = false;
    };
  }, [language, ready]);

  useEffect(() => {
    activeCatalog = language === "uz" ? null : catalog;
  }, [catalog, language]);

  useEffect(() => {
    if (!ready || (language !== "uz" && !catalog)) return;
    return localizeDocument(catalog);
  }, [catalog, language, ready]);

  const setLanguage = useCallback((next: AppLanguage) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
    document.documentElement.dataset.language = next;
    setLanguageState(next);
  }, []);

  const setContentLanguage = useCallback((next: ContentLanguage) => {
    saveContentLanguage(next);
    setSavedContentLanguage(next);
  }, []);

  const value = useMemo(
    () => ({
      contentLanguage: resolveContentLanguage(language, savedContentLanguage),
      language,
      ready,
      savedContentLanguage,
      setContentLanguage,
      setLanguage,
    }),
    [language, ready, savedContentLanguage, setContentLanguage, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useAppLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useAppLanguage must be used inside LanguageProvider");
  }
  return context;
}

/** 뜻·설명 언어. 바뀌면 다시 그린다 (API 모듈은 getContentLang 을 쓴다) */
export function useContentLanguage() {
  return useAppLanguage().contentLanguage;
}
