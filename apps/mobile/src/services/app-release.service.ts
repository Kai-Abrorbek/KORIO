import { Linking, Platform } from "react-native";
import Constants from "expo-constants";
import { BASE_URL } from "./api";

export type ReleaseTag = "new" | "improve" | "fix";

export interface AppReleaseItem {
  tag: ReleaseTag;
  text: string;
}

export interface AppRelease {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  /** 스토어 버전이 올라간 업데이트만 값이 있다 (나머지는 OTA) */
  storeVersion: string | null;
  items: AppReleaseItem[];
}

export interface AppVersionInfo {
  latestVersion: string;
  minSupportedVersion: string;
  storeUrl: string;
  updateAvailable: boolean;
  forceUpdate: boolean;
}

/**
 * 설치된 **네이티브** 버전 (= 스토어 버전).
 * OTA 로 JS 가 바뀌어도 이 값은 그대로라서 "스토어에서 업데이트할 게 있나" 는
 * 이걸로 본다. 개발 빌드처럼 비어 있으면 app.json 값으로.
 */
export const installedVersion: string =
  Constants.nativeAppVersion ?? Constants.expoConfig?.version ?? "0.0.0";

/**
 * 공용 api 클라이언트를 안 쓴다. 그건 네트워크·5xx 실패 때 전역 "다시 시도"
 * 모달을 띄우는데, 앱 켤 때 조용히 도는 버전 확인이 그걸 띄우면 안 된다.
 * 실패는 그냥 throw — 부르는 쪽이 조용히 넘기거나 화면 안에서 보여준다.
 */
async function quietGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP_${res.status}`);
  return (await res.json()) as T;
}

export const appReleaseService = {
  releases: (lang: string) =>
    quietGet<{ releases: AppRelease[] }>(
      `/app/releases?lang=${encodeURIComponent(lang)}&platform=mobile`,
    ),

  version: () =>
    quietGet<AppVersionInfo>(
      `/app/version?platform=${Platform.OS}&version=${encodeURIComponent(installedVersion)}`,
    ),
};

/**
 * 플레이 스토어의 KORIO 페이지를 연다. market:// 는 스토어 앱으로 바로 가고,
 * 안 되면(스토어 없는 기기 등) 웹 주소로.
 */
export async function openStore(storeUrl: string) {
  const id = /[?&]id=([^&]+)/.exec(storeUrl)?.[1];
  if (Platform.OS === "android" && id) {
    try {
      await Linking.openURL(`market://details?id=${id}`);
      return;
    } catch {
      // 아래 웹 주소로
    }
  }
  await Linking.openURL(storeUrl);
}
