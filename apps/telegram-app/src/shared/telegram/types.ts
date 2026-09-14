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
  expand(): void;
  ready(): void;
  setBackgroundColor?(color: string): void;
  setHeaderColor?(color: string): void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}
