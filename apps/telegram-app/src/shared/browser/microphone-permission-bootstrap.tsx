"use client";

import { useEffect } from "react";

import {
  prepareMicrophoneSession,
  releaseMicrophoneSession,
} from "./microphone-session";

export function MicrophonePermissionBootstrap() {
  useEffect(() => {
    if (!window.Telegram?.WebApp.initData) return;
    void prepareMicrophoneSession().catch(() => undefined);
    const release = () => releaseMicrophoneSession();
    window.addEventListener("pagehide", release, { once: true });
    return () => window.removeEventListener("pagehide", release);
  }, []);

  return null;
}
