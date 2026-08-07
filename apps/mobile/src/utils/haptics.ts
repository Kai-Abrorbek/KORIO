/**
 * expo-haptics 래퍼.
 *
 * 앱 곳곳(50곳 넘게)에서 진동을 부르는데, 설정에서 끄면 전부 꺼져야 한다.
 * 호출부를 하나씩 고치는 대신 같은 API 를 가진 이 모듈로 import 만 바꿨다.
 *   import * as Haptics from "expo-haptics"  →  from "@/utils/haptics"
 *
 * 구분:
 *   - impact / selection = 탭 반응    → keyHaptics
 *   - notification       = 정답·보상  → rewardHaptics
 */
import * as Expo from "expo-haptics";
import { useSettingsStore } from "@/store/settings.store";

export const ImpactFeedbackStyle = Expo.ImpactFeedbackStyle;
export const NotificationFeedbackType = Expo.NotificationFeedbackType;

const prefs = () => useSettingsStore.getState().sound;

export function impactAsync(style?: Expo.ImpactFeedbackStyle) {
  if (!prefs().keyHaptics) return Promise.resolve();
  return Expo.impactAsync(style).catch(() => {});
}

export function selectionAsync() {
  if (!prefs().keyHaptics) return Promise.resolve();
  return Expo.selectionAsync().catch(() => {});
}

export function notificationAsync(type?: Expo.NotificationFeedbackType) {
  if (!prefs().rewardHaptics) return Promise.resolve();
  return Expo.notificationAsync(type).catch(() => {});
}
