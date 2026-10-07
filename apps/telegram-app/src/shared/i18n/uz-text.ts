import uz from "./locales/uz";

type Tree = { readonly [key: string]: string | Tree };

/**
 * 화면 글자 — **우즈벡어 원문**을 locales/uz.ts 에서 키로 꺼낸다 (앱의 t("roadmap.x") 자리).
 *
 * 이 미니앱은 우즈벡어를 그리고, 번역기(language-context)가 같은 문장의 en/ru/ko 로
 * 바꿔 끼운다. 원문이 locale 파일과 글자 하나까지 같아야 번역이 붙으므로, 컴포넌트에
 * 손으로 다시 쓰지 않고 여기서 꺼낸다. {{n}} 같은 값은 채워서 돌려준다.
 */
export function uzt(path: string, vars?: Record<string, string | number>): string {
  const value = path
    .split(".")
    .reduce<Tree | string | undefined>(
      (node, key) => (node && typeof node === "object" ? node[key] : undefined),
      uz as unknown as Tree,
    );
  if (typeof value !== "string") return path;
  if (!vars) return value;
  return value.replace(/{{\s*(\w+)\s*}}/g, (_, key: string) => String(vars[key] ?? ""));
}
