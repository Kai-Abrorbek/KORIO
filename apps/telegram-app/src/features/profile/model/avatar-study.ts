"use client";

import { useSyncExternalStore } from "react";

import type { AvatarConfig } from "../../../shared/model/avatar";

const STORAGE_KEY = "korio-avatar-study-v1";

export interface LearnedAvatarWord {
  userId: string;
  word: string;
  meaning: string;
  language: string;
  learnedAt: number;
}

export interface AvatarPostcard {
  id: string;
  userId: string;
  scene: AvatarConfig["scene"];
  avatar: AvatarConfig;
  streak: number;
  word: string | null;
  meaning: string | null;
  createdAt: number;
}

interface AvatarStudyState {
  recentWord: LearnedAvatarWord | null;
  petStars: Record<string, number>;
  postcards: AvatarPostcard[];
}

const EMPTY: AvatarStudyState = { recentWord: null, petStars: {}, postcards: [] };
let state: AvatarStudyState = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function readStored(): AvatarStudyState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return EMPTY;
    const value = parsed as Partial<AvatarStudyState>;
    return {
      recentWord: value.recentWord && typeof value.recentWord === "object" ? value.recentWord : null,
      petStars: value.petStars && typeof value.petStars === "object" && !Array.isArray(value.petStars) ? value.petStars : {},
      postcards: Array.isArray(value.postcards) ? value.postcards : [],
    };
  } catch {
    return EMPTY;
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  state = readStored();
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;
    state = readStored();
    listeners.forEach((listener) => listener());
  });
}

function snapshot() {
  hydrate();
  return state;
}

function subscribe(listener: () => void) {
  hydrate();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function save(next: AvatarStudyState) {
  hydrate();
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Cosmetic records remain available in memory when storage is unavailable.
  }
  listeners.forEach((listener) => listener());
}

export function useAvatarStudy() {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}

export function getAvatarStudy() {
  return snapshot();
}

export function rememberAvatarWord(word: Omit<LearnedAvatarWord, "learnedAt">) {
  const cleanWord = word.word.trim();
  const cleanMeaning = word.meaning.trim();
  if (!word.userId || !/^[가-힣]{1,12}$/.test(cleanWord) || !cleanMeaning) return;
  save({ ...snapshot(), recentWord: { ...word, word: cleanWord, meaning: cleanMeaning, learnedAt: Date.now() } });
}

export function awardPetReviewStar(userId: string) {
  if (!userId) return;
  const current = snapshot();
  save({ ...current, petStars: { ...current.petStars, [userId]: (current.petStars[userId] ?? 0) + 1 } });
}

export function collectAvatarPostcard(postcard: Omit<AvatarPostcard, "id" | "createdAt">) {
  if (!postcard.userId || postcard.scene === "scene_none") return;
  const now = new Date();
  const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const id = `${postcard.userId}:${postcard.scene}:${dateKey}`;
  const current = snapshot();
  if (current.postcards.some((item) => item.id === id)) return;
  save({ ...current, postcards: [{ ...postcard, id, createdAt: now.getTime() }, ...current.postcards] });
}

export function todaysAvatarWord(recentWord: LearnedAvatarWord | null, userId?: string, language?: string) {
  if (!recentWord || recentWord.userId !== userId || recentWord.language !== language) return null;
  return new Date(recentWord.learnedAt).toDateString() === new Date().toDateString() ? recentWord : null;
}
