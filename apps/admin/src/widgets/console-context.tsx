"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface ConsoleRange {
  from: string;
  to: string;
  days: number;
  label: string;
}

interface ConsoleContextValue {
  range: ConsoleRange;
  preset: number | "custom";
  setPreset: (days: number) => void;
  setCustom: (from: string, to: string) => void;
}

const Context = createContext<ConsoleContextValue | null>(null);
const DAY = 86_400_000;
const iso = (date: Date) => date.toISOString().slice(0, 10);
const localToday = () => {
  const now = new Date();
  return iso(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())));
};

export function ConsoleProvider({ children }: { children: React.ReactNode }) {
  const [preset, setPresetState] = useState<number | "custom">(30);
  const [custom, setCustomState] = useState<{ from: string; to: string } | null>(null);
  const [today, setToday] = useState(localToday);

  useEffect(() => {
    const advanceDay = () => setToday((current) => {
      const next = localToday();
      return current === next ? current : next;
    });
    advanceDay();
    const timer = window.setInterval(advanceDay, 60_000);
    document.addEventListener("visibilitychange", advanceDay);
    window.addEventListener("focus", advanceDay);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", advanceDay);
      window.removeEventListener("focus", advanceDay);
    };
  }, []);

  const range = useMemo<ConsoleRange>(() => {
    const to = custom
      ? new Date(`${custom.to}T00:00:00.000Z`)
      : new Date(`${today}T00:00:00.000Z`);
    const from = custom
      ? new Date(`${custom.from}T00:00:00.000Z`)
      : new Date(to.getTime() - ((preset as number) - 1) * DAY);
    const days = Math.max(1, Math.round((to.getTime() - from.getTime()) / DAY) + 1);
    return { from: iso(from), to: iso(to), days, label: custom ? "사용자 지정" : `최근 ${days}일` };
  }, [custom, preset, today]);

  return (
    <Context.Provider value={{
      range,
      preset,
      setPreset: (days) => { setCustomState(null); setPresetState(days); },
      setCustom: (from, to) => { if (from <= to) { setCustomState({ from, to }); setPresetState("custom"); } },
    }}>
      {children}
    </Context.Provider>
  );
}

export function useConsole() {
  const value = useContext(Context);
  if (!value) throw new Error("ConsoleProvider 안에서만 사용할 수 있다");
  return value;
}
