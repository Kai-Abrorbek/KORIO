"use client";

import { useCallback, useEffect, useState } from "react";

export interface NotificationPreferences {
  daily: boolean;
  dailyHour: number;
  events: boolean;
  friends: boolean;
  league: boolean;
  master: boolean;
  streak: boolean;
}

export interface SoundPreferences {
  autoPlay: boolean;
  keyHaptics: boolean;
  keyVolume: number;
  rewardHaptics: boolean;
  sfxVolume: number;
  speechRate: number;
  speechVoice: string;
  speechVolume: number;
  startMuted: boolean;
}

export const DEFAULT_NOTIFICATIONS: NotificationPreferences = {
  master: true,
  daily: true,
  dailyHour: 20,
  streak: true,
  league: true,
  friends: true,
  events: true,
};

export const DEFAULT_SOUND: SoundPreferences = {
  speechVolume: 1,
  sfxVolume: 1,
  keyVolume: 1,
  speechRate: 1,
  speechVoice: "ko-KR-SunHiNeural",
  autoPlay: true,
  keyHaptics: true,
  rewardHaptics: true,
  startMuted: false,
};

export const SOUND_STORAGE_KEY = "korio-sound-settings";
const NOTIFICATION_STORAGE_KEY = "korio-notification-settings";

function readValue<T extends object>(key: string, defaults: T): T {
  try {
    const saved = window.localStorage.getItem(key);
    return saved
      ? { ...defaults, ...(JSON.parse(saved) as Partial<T>) }
      : defaults;
  } catch {
    return defaults;
  }
}

function usePreferences<T extends object>(key: string, defaults: T) {
  const [value, setValue] = useState<T>(defaults);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setValue(readValue(key, defaults));
    setReady(true);
  }, [defaults, key]);

  const patch = useCallback(
    (next: Partial<T>) => {
      setValue((current) => {
        const updated = { ...current, ...next };
        window.localStorage.setItem(key, JSON.stringify(updated));
        return updated;
      });
    },
    [key],
  );

  const reset = useCallback(() => {
    window.localStorage.setItem(key, JSON.stringify(defaults));
    setValue(defaults);
  }, [defaults, key]);

  return { patch, ready, reset, value };
}

export function useNotificationPreferences() {
  return usePreferences(NOTIFICATION_STORAGE_KEY, DEFAULT_NOTIFICATIONS);
}

export function useSoundPreferences() {
  return usePreferences(SOUND_STORAGE_KEY, DEFAULT_SOUND);
}
