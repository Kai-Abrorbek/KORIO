export interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    auth_date?: number;
    query_id?: string;
    start_param?: string;
    user?: TelegramWebAppUser;
  };
  colorScheme: "light" | "dark";
  platform: string;
  version: string;
  HapticFeedback?: {
    impactOccurred(style: "light" | "medium" | "heavy" | "rigid" | "soft"): void;
    notificationOccurred(type: "error" | "success" | "warning"): void;
    selectionChanged(): void;
  };
  expand(): void;
  close?(): void;
  /** Bot API 7.7+. 세로 스와이프로 미니앱이 접히는 제스처를 끈다 */
  disableVerticalSwipes?(): void;
  /** 헤더의 네이티브 뒤로가기 버튼. 안드로이드 하드웨어 뒤로가기도 이걸로 온다 */
  BackButton?: {
    isVisible: boolean;
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
  };
  ready(): void;
  isVersionAtLeast?(version: string): boolean;
  /** t.me 링크를 텔레그램 안에서 연다 (공유 선택창 등) */
  openTelegramLink?(url: string): void;
  /** 외부 링크를 텔레그램 인앱 브라우저/기본 브라우저로 연다 */
  openLink?(url: string, options?: { try_instant_view?: boolean }): void;
  /** Bot API 6.2+ 네이티브 확인/알림 팝업 */
  showConfirm?(message: string, callback?: (confirmed: boolean) => void): void;
  showAlert?(message: string, callback?: () => void): void;
  setBackgroundColor?(color: string): void;
  setHeaderColor?(color: string): void;
  /** Bot API 7.10+. 하단 바(안드로이드 내비게이션 영역) 색 */
  setBottomBarColor?(color: string): void;
  /** Bot API 6.2+. 닫기 전에 "정말 닫을까요?" 를 묻는다 */
  enableClosingConfirmation?(): void;
  disableClosingConfirmation?(): void;
  isClosingConfirmationEnabled?: boolean;
  /** Bot API 8.0+. 텔레그램 헤더를 없애고 화면 전체를 쓴다 */
  requestFullscreen?(): void;
  exitFullscreen?(): void;
  isFullscreen?: boolean;
  /** 기기 안전 영역(노치·상태바·홈 인디케이터) */
  safeAreaInset?: TelegramInsets;
  /** 전체화면일 때 텔레그램이 위에 띄우는 닫기/메뉴 버튼 영역 */
  contentSafeAreaInset?: TelegramInsets;
  onEvent?(event: string, callback: () => void): void;
  offEvent?(event: string, callback: () => void): void;
}

export interface TelegramInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}
