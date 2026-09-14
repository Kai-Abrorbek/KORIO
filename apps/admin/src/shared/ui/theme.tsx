"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Mode = "dark" | "light";
const KEY = "korio_admin_theme";

const ThemeContext = createContext<{
  mode: Mode;
  toggle: () => void;
}>({ mode: "dark", toggle: () => {} });

export const useTheme = () => useContext(ThemeContext);

/**
 * 다크/라이트 토글.
 *
 * **기본은 다크다.** 차트가 화면의 대부분인데 어두운 바탕에서 색이 훨씬 잘
 * 갈린다. 라이트는 밝은 사무실·프로젝터에서 필요해서 남긴다.
 *
 * 고른 값은 `<html data-theme>` 에 찍고 localStorage 에 남긴다 — CSS 가
 * 그 속성으로 갈리고, 토글이 OS 설정을 **양방향으로** 이긴다.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("dark");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(KEY);
    } catch {
      /* 무시 */
    }
    const next: Mode = saved === "light" ? "light" : "dark";
    setMode(next);
    document.documentElement.dataset.theme = next;
  }, []);

  const toggle = useCallback(() => {
    setMode((prev) => {
      const next: Mode = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        window.localStorage.setItem(KEY, next);
      } catch {
        /* 무시 */
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { mode, toggle } = useTheme();
  return (
    <button
      className="btn btn-ghost btn-icon"
      onClick={toggle}
      // 아이콘만 있는 버튼이라 이름이 없으면 스크린리더가 읽을 게 없다
      aria-label={mode === "dark" ? "라이트 모드로" : "다크 모드로"}
      title={mode === "dark" ? "라이트 모드로" : "다크 모드로"}
    >
      {mode === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}
