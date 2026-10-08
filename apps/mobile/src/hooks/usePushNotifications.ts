import { useEffect, useRef, useState } from "react";
import { AppState, Platform } from "react-native";
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
 * 학습 알림은 조용히 목록에 쌓고, 운영 공지는 앱 사용 중에도 보이게 한다.
 */
Notifications.setNotificationHandler({
  handleNotification: async (notification) => ({
    shouldShowBanner: notification.request.content.data?.type === "announcement",
    shouldShowList: true,
    shouldPlaySound: notification.request.content.data?.type === "announcement",
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

/**
 * 왜 푸시가 안 되는지 폰에서 바로 보기 위한 기록.
 *
 * 예전에는 토큰 발급 실패를 `catch {}` 로 삼켰다. 앱이 안 죽는 건 맞는데,
 * 그러면 "알림이 안 온다" 는 사실만 남고 원인을 볼 방법이 없다.
 * 실제로 그것 때문에 네이티브 프로젝트가 옛날 상태인 걸 못 찾고 헤맸다.
 * 확인할 수 없는 실패는 조용히 방치된다.
 */
const diagnostics: {
  isDevice: boolean | null;
  permission: string | null;
  projectId: string | null;
  token: string | null;
  registered: boolean;
  lastError: string | null;
  checkedAt: string | null;
} = {
  isDevice: null,
  permission: null,
  projectId: null,
  token: null,
  registered: false,
  lastError: null,
  checkedAt: null,
};

/** 푸시가 왜 안 오는지 확인할 때 (개발 중 콘솔 / 향후 진단 화면) */
export function getPushDiagnostics() {
  return { ...diagnostics };
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
  const [registrationAttempt, retryRegistration] = useState(0);
  const retryCount = useRef(0);

  // 권한을 OS 설정에서 바꾸거나 네트워크가 돌아온 뒤 앱으로 복귀하면 다시 등록한다.
  useEffect(() => {
    let previous = AppState.currentState;
    const listener = AppState.addEventListener("change", (next) => {
      if (next === "active" && previous !== "active") retryRegistration((n) => n + 1);
      previous = next;
    });
    return () => listener.remove();
  }, []);

  // ── 등록 ──
  useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    const scheduleRetry = () => {
      if (cancelled) return;
      const delay = Math.min(300_000, 15_000 * 2 ** Math.min(retryCount.current++, 4));
      retryTimer = setTimeout(() => retryRegistration((n) => n + 1), delay);
    };

    (async () => {
      if (!isLoggedIn) return;
      diagnostics.checkedAt = new Date().toISOString();
      diagnostics.registered = false;
      diagnostics.lastError = null;

      try {
        await ensureAndroidChannels();
      } catch (e: any) {
        diagnostics.lastError = `CHANNEL_SETUP_FAILED: ${String(e?.message ?? e).slice(0, 200)}`;
        scheduleRetry();
        return;
      }

      // SDK 56은 Play 서비스가 있는 Android 에뮬레이터도 지원한다.
      // 기기 여부는 진단에 남기고 실제 토큰 발급 결과로 판단한다.
      diagnostics.isDevice = Device.isDevice;
      if (Platform.OS === "web") {
        diagnostics.lastError = "WEB_PUSH_UNSUPPORTED";
        return;
      }

      // 알림을 통째로 끈 사람에게 권한을 다시 물어보지 않는다
      if (!master) {
        diagnostics.lastError = 'MASTER_SWITCH_OFF (설정에서 전체 알림 꺼짐)';
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
      diagnostics.permission = granted ? 'granted' : perm.status;
      if (!granted) {
        diagnostics.lastError = 'PERMISSION_DENIED (안드로이드 앱 설정에서 알림 허용 필요)';
        return;
      }
      if (cancelled) return;

      // projectId 가 없으면 Expo 가 어느 프로젝트의 FCM 자격증명을 쓸지 모른다
      const pid = projectId();
      diagnostics.projectId = pid ?? null;
      if (!pid) {
        diagnostics.lastError = 'NO_EAS_PROJECT_ID (app.json extra.eas.projectId 확인)';
        return;
      }

      try {
        const res = await Notifications.getExpoPushTokenAsync({
          projectId: pid,
        });
        if (cancelled || !res?.data) return;
        tokenRef.current = res.data;
        diagnostics.token = res.data;
        diagnostics.lastError = null;

        const registration = await PushApi.register({
          token: res.data,
          platform: Platform.OS === "ios" ? "ios" : "android",
          deviceName: Device.modelName ?? "",
          appVersion: Constants.expoConfig?.version ?? "",
          appLanguage: language,
        });
        if (!registration.success) throw new Error("PUSH_TOKEN_REJECTED_BY_SERVER");

        // 서버에는 아직 이 사람의 스위치가 없다 (기기에만 있었다).
        // 등록 직후 한 번 통째로 올려서 서버 크론이 같은 값을 보게 한다.
        const prefs = useSettingsStore.getState().notifications;
        const synced = await PushApi.updateSettings({
          master: prefs.master,
          daily: prefs.daily,
          streak: prefs.streak,
          league: prefs.league,
          friends: prefs.friends,
          events: prefs.events,
          dailyHour: prefs.dailyHour,
          appLanguage: language,
        });
        if (!synced.success) throw new Error("PUSH_SETTINGS_REJECTED_BY_SERVER");

        diagnostics.registered = true;
        retryCount.current = 0;
      } catch (e: any) {
        // 삼키지 않는다. Firebase 미초기화(google-services.json 이 네이티브에
        // 안 들어감), FCM 자격증명 누락, projectId 불일치가 전부 여기로 온다.
        // 예전엔 catch {} 로 버려서 "알림이 안 온다"는 사실만 남고 원인을
        // 볼 방법이 없었다 — 그것 때문에 하루를 날렸다.
        diagnostics.lastError = String(e?.message ?? e).slice(0, 300);
        // 릴리스에서도 남긴다 — adb logcat 의 ReactNativeJS 태그로 볼 수 있게
        console.warn('[push] 토큰 발급 실패:', JSON.stringify(diagnostics));
        scheduleRetry();
      }
    })();

    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [isLoggedIn, language, master, registrationAttempt]);

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
