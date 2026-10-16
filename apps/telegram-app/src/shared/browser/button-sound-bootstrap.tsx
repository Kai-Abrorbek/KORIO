"use client";

import { useEffect } from "react";

import { installButtonSounds } from "./sfx";

export function ButtonSoundBootstrap() {
  useEffect(installButtonSounds, []);
  return null;
}
