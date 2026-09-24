import type { AppLanguage } from "./language";

type LocaleTree =
  | string
  | readonly LocaleTree[]
  | { readonly [key: string]: LocaleTree };

interface TemplateTranslation {
  pattern: RegExp;
  target: string;
  tokens: string[];
}

export interface TranslationCatalog {
  exact: Map<string, string>;
  templates: TemplateTranslation[];
}

const TOKEN = /{{\s*([^},]+)(?:,[^}]*)?\s*}}/g;
const cache = new Map<AppLanguage, Promise<TranslationCatalog | null>>();

function escapePattern(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sourceVariants(value: string) {
  return [...new Set([
    value,
    value.replaceAll("'", "’"),
    value.replaceAll("’", "'"),
  ])];
}

function addExact(
  catalog: TranslationCatalog,
  source: string,
  target: string,
) {
  if (!source.trim() || !target.trim()) return;
  for (const variant of sourceVariants(source)) {
    if (!catalog.exact.has(variant)) catalog.exact.set(variant, target);
    const upperSource = variant.toLocaleUpperCase();
    if (
      upperSource !== variant &&
      !catalog.exact.has(upperSource)
    ) {
      catalog.exact.set(upperSource, target.toLocaleUpperCase());
    }
  }
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
    addExact(catalog, sourceFragment, targetFragment);
  });
}

function compileTemplate(source: string, target: string): TemplateTranslation {
  const tokens: string[] = [];
  let cursor = 0;
  let pattern = "^";
  for (const match of source.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    pattern += escapePattern(source.slice(cursor, index));
    pattern += "(.+?)";
    tokens.push(match[1]?.trim() ?? "");
    cursor = index + match[0].length;
  }
  pattern += `${escapePattern(source.slice(cursor))}$`;
  return { pattern: new RegExp(pattern, "u"), target, tokens };
}

function collectTranslations(
  source: LocaleTree,
  target: LocaleTree,
  catalog: TranslationCatalog,
) {
  if (typeof source === "string" && typeof target === "string") {
    if (!source.trim() || source === target) return;
    for (const variant of sourceVariants(source)) {
      if (variant.includes("{{")) {
        catalog.templates.push(compileTemplate(variant, target));
      }
    }
    if (source.includes("{{")) addTemplateFragments(catalog, source, target);
    else addExact(catalog, source, target);
    return;
  }

  if (Array.isArray(source) && Array.isArray(target)) {
    source.forEach((value, index) => {
      const translated = target[index];
      if (translated !== undefined) {
        collectTranslations(value, translated, catalog);
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
        collectTranslations(value, translated, catalog);
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
      const catalog: TranslationCatalog = { exact: new Map(), templates: [] };
      collectTranslations(source, target, catalog);
      return catalog;
    },
  );
  cache.set(language, pending);
  return pending;
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

  for (const template of catalog.templates) {
    const match = source.match(template.pattern);
    if (!match) continue;
    const values = new Map<string, string>();
    template.tokens.forEach((token, index) => {
      values.set(token, match[index + 1] ?? "");
    });
    const translated = template.target.replace(
      TOKEN,
      (_, token: string) => values.get(token.trim()) ?? "",
    );
    return `${leading}${translated}${trailing}`;
  }
  return value;
}
