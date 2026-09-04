import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { router } from "expo-router";
import { useAuthStore } from "@/store/auth.store";
import { useSettingsStore } from "@/store/settings.store";
import { PushApi } from "@/services/push.service";
import i18n from "@/locales/i18n";

/**
 * 앱이 켜져 있을 때 알림이 오면 어떻게 할지.
 *
 * 기본값은 "아무것도 안 보임" 이다. 유저가 레슨을 푸는 중에 배너가 떨어지면
 * 오답의 원인이 된다 — 소리 없이 목록에만 쌓아둔다.
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: false,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

/** 서버가 채널 id 를 지정해서 보낸다. 여기 없는 채널로 오면 무음이 된다 */
async function ensureAndroidChannels() {
  if (Platform.OS !== "android") return;
  await Notifications.setNotificationChannelAsync("default", {
    // 안드로이드 시스템 설정에 그대로 노출되는 이름이라 번역해야 한다
    name: i18n.t("settings.notifications.channelDefault"),
    importance: Notifications.AndroidImportance.HIGH,
    lightColor: "#776ee2",
    vibrationPattern: [0, 250, 250, 250],
  });
  // 학습 재촉은 조금 덜 시끄럽게. 하루 두 번 오는 것이라 소리까지 같으면 피곤하다
  await Notifications.setNotificationChannelAsync("study", {
    name: i18n.t("settings.notifications.channelStudy"),
    importance: Notifications.AndroidImportance.DEFAULT,
    lightColor: "#776ee2",
  });
}

/** EAS 프로젝트 id — 없으면 Expo 푸시 토큰을 못 받는다 */
function projectId(): string | undefined {
  const extra: any =
    Constants.expoConfig?.extra ?? (Constants as any).easConfig ?? {};
  return extra?.eas?.projectId ?? (Constants as any).easConfig?.projectId;
}

/**
 * 푸시 등록 + 알림 탭 처리.
 *
 * 루트 레이아웃에서 한 번만 부른다. 로그인 상태가 바뀌면 다시 등록한다 —
 * 토큰의 주인은 서버에서 "지금 로그인한 사람" 으로 덮어써야, 같은 폰을
 * 다른 계정으로 쓸 때 앞사람 알림이 뒷사람에게 안 간다.
 */
export function usePushNotifications() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const language = useSettingsStore((s) => s.language);
  const master = useSettingsStore((s) => s.notifications.master);
  const tokenRef = useRef<string | null>(null);

  // ── 등록 ──
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!isLoggedIn) return;
      await ensureAndroidChannels();

      // 에뮬레이터는 푸시 토큰을 못 받는다. 여기서 거르지 않으면 매번 에러가 뜬다
      if (!Device.isDevice) return;

      // 알림을 통째로 끈 사람에게 권한을 다시 물어보지 않는다
      if (!master) {
        const old = tokenRef.current;
        if (old) {
          await PushApi.unregister(old).catch(() => {});
          tokenRef.current = null;
        }
        return;
      }

      const perm = await Notifications.getPermissionsAsync();
      let granted = perm.granted;
      if (!granted && perm.canAskAgain) {
        granted = (await Notifications.requestPermissionsAsync()).granted;
      }
      if (!granted || cancelled) return;

      try {
        const res = await Notifications.getExpoPushTokenAsync({
          projectId: projectId(),
        });
        if (cancelled || !res?.data) return;
        tokenRef.current = res.data;

        await PushApi.register({
          token: res.data,
          platform: Platform.OS === "ios" ? "ios" : "android",
          deviceName: Device.modelName ?? "",
          appVersion: Constants.expoConfig?.version ?? "",
          appLanguage: language,
        });

        // 서버에는 아직 이 사람의 스위치가 없다 (기기에만 있었다).
        // 등록 직후 한 번 통째로 올려서 서버 크론이 같은 값을 보게 한다.
        const prefs = useSettingsStore.getState().notifications;
        await PushApi.updateSettings({
          master: prefs.master,
          daily: prefs.daily,
          streak: prefs.streak,
          league: prefs.league,
          friends: prefs.friends,
          events: prefs.events,
          dailyHour: prefs.dailyHour,
          appLanguage: language,
        }).catch(() => {});
      } catch {
        // 개발 빌드가 아니거나 FCM 자격증명이 아직 없으면 여기서 던진다.
        // 푸시가 없다고 앱이 죽으면 안 되므로 조용히 넘어간다.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, language, master]);

  // ── 알림을 눌러서 앱에 들어온 경우 ──
  useEffect(() => {
    const go = (data: any) => {
      const link = typeof data?.link === "string" ? data.link : "";
      // 서버가 준 경로를 그대로 연다. 빈 값이면 그냥 앱만 열린다.
      if (link) setTimeout(() => router.push(link as any), 350);
    };

    // 앱이 죽어 있다가 알림으로 켜진 경우 — 리스너보다 먼저 일어난 일이라
    // 따로 물어봐야 한다. 이거 없으면 콜드 스타트에서 딥링크가 통째로 씹힌다.
    Notifications.getLastNotificationResponseAsync()
      .then((res) => {
        if (res) go(res.notification.request.content.data);
      })
      .catch(() => {});

    const sub = Notifications.addNotificationResponseReceivedListener((res) =>
      go(res.notification.request.content.data),
    );
    return () => sub.remove();
  }, []);

  return tokenRef;
}

/** 로그아웃할 때 이 기기로 알림이 더 안 오게 한다 */
export async function unregisterPushToken() {
  try {
    if (!Device.isDevice) return;
    const res = await Notifications.getExpoPushTokenAsync({
      projectId: projectId(),
    });
    if (res?.data) await PushApi.unregister(res.data);
  } catch {
    // 토큰을 못 가져오면 지울 것도 없다
  }
}
