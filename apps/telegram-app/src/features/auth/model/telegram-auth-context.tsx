"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  exchangeTelegramInitData,
  type KorioTelegramUser,
  type TelegramAuthResponse,
} from "../api/telegram-auth";
import { apiRequest } from "../../../shared/api/client";
import { prepareTelegramWebApp } from "../../../shared/telegram/runtime";

type AuthStatus = "loading" | "authenticated" | "error";

interface TelegramAuthContextValue {
  accessToken: string | null;
  errorCode: string | null;
  request: <T>(path: string, init?: RequestInit) => Promise<T>;
  /**
   * 비밀번호를 만들거나 바꾸면 서버가 tokenVersion 을 올려서 지금 토큰이 죽는다.
   * 그 응답으로 받은 새 토큰으로 갈아끼운다 (다시 initData 로 로그인할 필요 없이)
   */
  replaceAccessToken: (token: string) => void;
  status: AuthStatus;
  updateUser: (partial: Partial<KorioTelegramUser>) => void;
  user: KorioTelegramUser | null;
}

const TelegramAuthContext = createContext<TelegramAuthContextValue | null>(
  null,
);

let authRequest:
  | {
      initData: string;
      promise: Promise<TelegramAuthResponse>;
    }
  | undefined;

function authenticateOnce(initData: string): Promise<TelegramAuthResponse> {
  if (authRequest?.initData === initData) return authRequest.promise;

  const promise = exchangeTelegramInitData(initData).catch((error: unknown) => {
    if (authRequest?.promise === promise) authRequest = undefined;
    throw error;
  });
  authRequest = { initData, promise };
  return promise;
}

function errorCode(error: unknown): string {
  return error instanceof Error ? error.message : "TELEGRAM_AUTH_FAILED";
}

export function TelegramAuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<KorioTelegramUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    try {
      const webApp = prepareTelegramWebApp();
      void authenticateOnce(webApp.initData)
        .then((result) => {
          if (!active) return;
          setAccessToken(result.accessToken);
          setUser(result.user);
        })
        .catch((reason: unknown) => {
          if (active) setError(errorCode(reason));
        });
    } catch (reason) {
      setError(errorCode(reason));
    }

    return () => {
      active = false;
    };
  }, []);

  const request = useCallback(
    async <T,>(path: string, init?: RequestInit): Promise<T> => {
      if (!accessToken) throw new Error("TELEGRAM_AUTH_REQUIRED");
      return apiRequest<T>(path, init, accessToken);
    },
    [accessToken],
  );

  const updateUser = useCallback((partial: Partial<KorioTelegramUser>) => {
    setUser((current) => (current ? { ...current, ...partial } : current));
  }, []);

  const replaceAccessToken = useCallback((token: string) => {
    if (token) setAccessToken(token);
  }, []);

  const value = useMemo<TelegramAuthContextValue>(
    () => ({
      accessToken,
      errorCode: error,
      replaceAccessToken,
      request,
      status: error
        ? "error"
        : accessToken && user
          ? "authenticated"
          : "loading",
      updateUser,
      user,
    }),
    [accessToken, error, replaceAccessToken, request, updateUser, user],
  );

  return (
    <TelegramAuthContext.Provider value={value}>
      {children}
    </TelegramAuthContext.Provider>
  );
}

export function useTelegramAuth(): TelegramAuthContextValue {
  const context = useContext(TelegramAuthContext);
  if (!context) {
    throw new Error("useTelegramAuth must be used inside TelegramAuthProvider");
  }
  return context;
}
