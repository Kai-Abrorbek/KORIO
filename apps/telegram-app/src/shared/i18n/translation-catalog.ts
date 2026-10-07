import type { AppLanguage } from "./language";

type LocaleTree =
  | string
  | readonly LocaleTree[]
  | { readonly [key: string]: LocaleTree };

interface TemplateTranslation {
  /** 토큰을 뺀 고정 글자 수 — 긴(구체적인) 템플릿부터 맞춰 본다 */
  literal: number;
  pattern: RegExp;
  target: string;
  tokens: string[];
}

export interface TranslationCatalog {
  exact: Map<string, string>;
  /** 키 경로 → 번역. 같은 우즈벡어가 여러 뜻으로 쓰일 때 data-i18n 으로 콕 집는다 */
  keys: Map<string, string>;
  /**
   * 키 경로 → 그 키의 템플릿 ({{n}} 이 든 문장). data-i18n 이 템플릿 키를 가리키면
   * 그 템플릿으로만 맞춘다 — "{{n}}-kun" 처럼 같은 우즈벡어 틀이 여러 키에 있을 때
   * (3일째 / 3일차 / 3일) 엉뚱한 쪽 번역이 붙지 않게.
   */
  keyTemplates: Map<string, TemplateTranslation>;
  normalized: Map<string, string>;
  templates: TemplateTranslation[];
}

const TOKEN = /{{\s*([^},]+)(?:,[^}]*)?\s*}}/g;
const cache = new Map<AppLanguage, Promise<TranslationCatalog | null>>();

function escapePattern(value: string) {
  return value
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    // 따옴표는 파일마다 ' ‘ ’ ʻ ʼ 가 섞여 있다 — 템플릿은 어느 것이든 맞게 한다
    .replace(/['‘’ʻʼ]/gu, "['‘’ʻʼ]")
    // 공백 한 칸/여러 칸 차이도 허용
    .replace(/ +/g, "\\s+");
}

function normalizeLookup(value: string) {
  return value
    .normalize("NFKC")
    .replace(/[‘’ʻʼ]/gu, "'")
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function sourceVariants(value: string) {
  return [...new Set([
    value,
    value.replaceAll("'", "’"),
    value.replaceAll("’", "'"),
  ])];
}

interface Candidate {
  common: boolean;
  depth: number;
  order: number;
  score: number;
  /** 처음 본 표기 그대로 ("Play again" / "Play Again" 은 한 표로 센다) */
  value: string;
}

let candidateOrder = 0;

/**
 * 같은 우즈벡어가 여러 키에 다른 뜻으로 들어 있다 ("Davom etish" = 계속 / TOPIK 의
 * "계속 풀기", "Tekshirish" = 확인 / 답안 제출). 예전엔 **파일에서 먼저 나온 것**이
 * 이겨서 모든 레슨의 "확인" 버튼이 영어로 "Check answers" 가 됐다.
 * 이제 후보를 다 모아 가장 많이 쓰인 번역을 고른다 (동점이면 common.* → 얕은 키 순).
 */
const candidateStore = new WeakMap<TranslationCatalog, Map<string, Map<string, Candidate>>>();

function addExact(
  catalog: TranslationCatalog,
  source: string,
  target: string,
  path = "",
  weight = 1,
) {
  if (!source.trim() || !target.trim()) return;
  let store = candidateStore.get(catalog);
  if (!store) {
    store = new Map();
    candidateStore.set(catalog, store);
  }
  let targets = store.get(source);
  if (!targets) {
    targets = new Map();
    store.set(source, targets);
  }
  const key = target.toLocaleLowerCase();
  const existing = targets.get(key);
  const depth = path ? path.split(".").length : 99;
  const common = path.startsWith("common.");
  if (existing) {
    existing.score += weight;
    existing.depth = Math.min(existing.depth, depth);
    existing.common ||= common;
  } else {
    candidateOrder += 1;
    targets.set(key, { common, depth, order: candidateOrder, score: weight, value: target });
  }
}

function pickTarget(targets: Map<string, Candidate>) {
  let best: Candidate | null = null;
  for (const a of targets.values()) {
    const b = best;
    const better =
      !b ? true
        : a.score !== b.score ? a.score > b.score
          : a.common !== b.common ? a.common
            : a.depth !== b.depth ? a.depth < b.depth
              : a.order < b.order;
    if (better) best = a;
  }
  return best?.value ?? "";
}

function finalizeExact(catalog: TranslationCatalog) {
  const store = candidateStore.get(catalog);
  if (!store) return;
  for (const [source, targets] of store) {
    const target = pickTarget(targets);
    for (const variant of sourceVariants(source)) {
      if (!catalog.exact.has(variant)) catalog.exact.set(variant, target);
      const normalized = normalizeLookup(variant);
      if (normalized && !catalog.normalized.has(normalized)) {
        catalog.normalized.set(normalized, target);
      }
      const upperSource = variant.toLocaleUpperCase();
      if (upperSource !== variant && !catalog.exact.has(upperSource)) {
        catalog.exact.set(upperSource, target.toLocaleUpperCase());
      }
    }
  }
  candidateStore.delete(catalog);
}

function templateParts(value: string) {
  const segments: string[] = [];
  const tokens: string[] = [];
  let cursor = 0;
  for (const match of value.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    segments.push(value.slice(cursor, index));
    tokens.push(match[1]?.trim() ?? "");
    cursor = index + match[0].length;
  }
  segments.push(value.slice(cursor));
  return { segments, tokens };
}

function addTemplateFragments(
  catalog: TranslationCatalog,
  source: string,
  target: string,
  path: string,
) {
  const sourceParts = templateParts(source);
  const targetParts = templateParts(target);
  if (
    sourceParts.tokens.join("\0") !== targetParts.tokens.join("\0") ||
    sourceParts.segments.length !== targetParts.segments.length
  ) {
    return;
  }
  sourceParts.segments.forEach((segment, index) => {
    const sourceFragment = segment.trim();
    const targetFragment = targetParts.segments[index]?.trim() ?? "";
    // "B{{n}}" 의 "B" 같은 한두 글자 조각은 다른 글자와 너무 쉽게 겹친다
    if (letterCount(sourceFragment) < 2) return;
    // 조각은 온전한 문장보다 약하게 센다
    addExact(catalog, sourceFragment, targetFragment, path, 0.5);
  });
}

function letterCount(value: string) {
  return value.match(/\p{L}/gu)?.length ?? 0;
}

/**
 * 고정 글자가 거의 없는 템플릿("B{{n}}", "{{done}} / {{total}}")은 값 자리를 **숫자로만**
 * 받는다. 아무 글자나 받게 두면 "B" 로 시작하는 모든 문장이 걸린다 —
 * 실제로 서버가 준 주제 제목 "Bankda hisob ochish" 가 영어 화면에서 "Sankda …" 가 됐다.
 */
const FREE_TOKEN = "(.+?)";
const NUMERIC_TOKEN = "(\\p{N}[\\p{N}\\s.,:+%\\-−]*?)";

/** 짧은 템플릿에서도 글자를 받아야 하는 자리 ("{{name}} {{n}}/{{total}}") */
const TEXT_TOKENS = new Set(["name", "period"]);

function compileTemplate(source: string, target: string): TemplateTranslation {
  const tokens: string[] = [];
  const short = letterCount(source.replace(TOKEN, "")) < 3;
  let cursor = 0;
  let pattern = "^";
  for (const match of source.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    pattern += escapePattern(source.slice(cursor, index));
    pattern += short && !TEXT_TOKENS.has(match[1]?.trim() ?? "") ? NUMERIC_TOKEN : FREE_TOKEN;
    tokens.push(match[1]?.trim() ?? "");
    cursor = index + match[0].length;
  }
  pattern += `${escapePattern(source.slice(cursor))}$`;
  const literal = source.replace(TOKEN, "").trim().length;
  return { literal, pattern: new RegExp(pattern, "u"), target, tokens };
}

function collectTranslations(
  source: LocaleTree,
  target: LocaleTree,
  catalog: TranslationCatalog,
  path = "",
) {
  if (typeof source === "string" && typeof target === "string") {
    if (path) catalog.keys.set(path, target);
    if (!source.trim() || source === target) return;
    if (source.includes("{{")) {
      const template = compileTemplate(source, target);
      catalog.templates.push(template);
      if (path) catalog.keyTemplates.set(path, template);
    }
    if (source.includes("{{")) addTemplateFragments(catalog, source, target, path);
    else addExact(catalog, source, target, path);
    return;
  }

  if (Array.isArray(source) && Array.isArray(target)) {
    source.forEach((value, index) => {
      const translated = target[index];
      if (translated !== undefined) {
        collectTranslations(value, translated, catalog, `${path}.${index}`);
      }
    });
    return;
  }

  if (
    typeof source === "object" &&
    source !== null &&
    !Array.isArray(source) &&
    typeof target === "object" &&
    target !== null &&
    !Array.isArray(target)
  ) {
    const sourceObject = source as Record<string, LocaleTree>;
    const targetObject = target as Record<string, LocaleTree>;
    Object.entries(sourceObject).forEach(([key, value]) => {
      const translated = targetObject[key];
      if (translated !== undefined) {
        collectTranslations(value, translated, catalog, path ? `${path}.${key}` : key);
      }
    });
  }
}

async function loadLocale(language: AppLanguage): Promise<LocaleTree> {
  switch (language) {
    case "en":
      return (await import("./locales/en")).default;
    case "ko":
      return (await import("./locales/ko")).default;
    case "ru":
      return (await import("./locales/ru")).default;
    default:
      return (await import("./locales/uz")).default;
  }
}

export function loadTranslationCatalog(
  language: AppLanguage,
): Promise<TranslationCatalog | null> {
  if (language === "uz") return Promise.resolve(null);
  const cached = cache.get(language);
  if (cached) return cached;

  const pending = Promise.all([loadLocale("uz"), loadLocale(language)]).then(
    ([source, target]) => {
      const catalog: TranslationCatalog = {
        exact: new Map(),
        keyTemplates: new Map(),
        keys: new Map(),
        normalized: new Map(),
        templates: [],
      };
      collectTranslations(source, target, catalog);
      finalizeExact(catalog);
      // "{{count}} so'z" 가 "{{count}} ta so'z" 보다 먼저 걸리면 "12 ta words" 가 된다.
      // 고정 글자가 많은 템플릿이 먼저 맞게 한다
      catalog.templates.sort((a, b) => b.literal - a.literal);
      return catalog;
    },
  );
  cache.set(language, pending);
  return pending;
}

/** data-i18n 이 템플릿 키일 때 — 그 템플릿으로 맞으면 번역, 아니면 null */
export function translateWithKey(
  value: string,
  key: string,
  catalog: TranslationCatalog | null,
): string | null {
  const template = catalog?.keyTemplates.get(key);
  if (!catalog || !template) return null;
  const leading = value.match(/^\s*/u)?.[0] ?? "";
  const trailing = value.match(/\s*$/u)?.[0] ?? "";
  const source = value.slice(leading.length, value.length - trailing.length);
  const match = source.match(template.pattern);
  if (!match) return null;
  const values = new Map<string, string>();
  template.tokens.forEach((token, index) => {
    const part = match[index + 1] ?? "";
    values.set(token, catalog.exact.get(part) ?? catalog.normalized.get(normalizeLookup(part)) ?? part);
  });
  const translated = template.target.replace(TOKEN, (_, token: string) => values.get(token.trim()) ?? "");
  return `${leading}${translated}${trailing}`;
}

export function translateValue(
  value: string,
  catalog: TranslationCatalog | null,
) {
  if (!catalog || !value.trim()) return value;
  const leading = value.match(/^\s*/u)?.[0] ?? "";
  const trailing = value.match(/\s*$/u)?.[0] ?? "";
  const source = value.slice(leading.length, value.length - trailing.length);
  const exact = catalog.exact.get(source);
  if (exact) return `${leading}${exact}${trailing}`;
  const normalized = catalog.normalized.get(normalizeLookup(source));
  if (normalized) return `${leading}${normalized}${trailing}`;

  for (const template of catalog.templates) {
    const match = source.match(template.pattern);
    if (!match) continue;
    const values = new Map<string, string>();
    template.tokens.forEach((token, index) => {
      // 값 자리에 든 말(요일·리그 이름 등)도 번역 목록에 있으면 바꾼다
      const value = match[index + 1] ?? "";
      values.set(
        token,
        catalog.exact.get(value) ??
          catalog.normalized.get(normalizeLookup(value)) ??
          value,
      );
    });
    const translated = template.target.replace(
      TOKEN,
      (_, token: string) => values.get(token.trim()) ?? "",
    );
    return `${leading}${translated}${trailing}`;
  }
  return value;
}
