export type ChangeTag = "new" | "improve" | "fix";

/** 설정·도움말 화면에 보이는 앱 버전. 업데이트 기록 자체는 서버(GET /app/releases)가 준다 */
export const APP_VERSION = "1.2.400";

export const TAG_LOOK: Record<ChangeTag, { background: string; color: string; label: string }> = {
  new: { background: "#D7F5E5", color: "#1DBB7F", label: "Yangi" },
  improve: { background: "#D5F0F5", color: "#45B7D1", label: "Yaxshilandi" },
  fix: { background: "#FFE3D6", color: "#FF7043", label: "Tuzatildi" },
};

export interface AppRelease {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  /** 스토어 버전이 올라간 업데이트만 (나머지는 OTA / 미니앱 배포) */
  storeVersion: string | null;
  items: { tag: ChangeTag; text: string }[];
}
