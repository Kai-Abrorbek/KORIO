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
  loadTranslationCatalog,
  translateValue,
  type TranslationCatalog,
} from "./translation-catalog";

const STORAGE_KEY = "korio-language";
const TRANSLATED_ATTRIBUTES = ["aria-label", "placeholder", "title"] as const;

export interface LanguageContextValue {
  language: AppLanguage;
  ready: boolean;
  setLanguage: (language: AppLanguage) => void;
}

interface LocalizedValue {
  rendered: string;
  source: string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
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
  const rendered = translateValue(source, catalog);
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
  const [catalog, setCatalog] = useState<TranslationCatalog | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const next = isAppLanguage(saved) ? saved : "uz";
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
    if (!ready || (language !== "uz" && !catalog)) return;
    return localizeDocument(catalog);
  }, [catalog, language, ready]);

  const setLanguage = useCallback((next: AppLanguage) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
    document.documentElement.dataset.language = next;
    setLanguageState(next);
  }, []);

  const value = useMemo(
    () => ({ language, ready, setLanguage }),
    [language, ready, setLanguage],
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
