"use client";

import { translateText } from "../i18n/language-context";
import { enqueueAppDialog } from "./app-dialog-state";

const translated = (message: string) => message.split("\n").map((line) => translateText(line)).join("\n");

/** Keep the Promise API while displaying the shared, theme-aware in-app dialog. */
export function confirmDialog(message: string): Promise<boolean> {
  return enqueueAppDialog("confirm", translated(message));
}

export async function alertDialog(message: string): Promise<void> {
  await enqueueAppDialog("alert", translated(message));
}
