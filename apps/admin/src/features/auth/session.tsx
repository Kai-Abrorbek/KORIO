"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AdminToken, api, setUnauthorizedHandler } from "@/shared/api/client";
import { isMockAuthMode, isMockMode } from "@/shared/config/data-mode";

export { isMockAuthMode, isMockMode };

export type AdminPermission =
  | "analytics:read"
  | "users:read"
  | "users:write"
  | "content:read"
  | "content:write"
  | "subscription:read"
  | "subscription:override"
  | "operations:write"
  | "admin:manage"
  | "audit:read";

export interface AdminMe {
  userId: string;
  email: string;
  nickname?: string;
  role: "super_admin" | "content_admin" | "support" | "analyst";
  permissions: AdminPermission[];
}

type Status = "loading" | "authenticated" | "anonymous";

const MOCK_ADMIN: AdminMe = {
  userId: "mock-super-admin",
  email: "admin@korio.demo",
  nickname: "KORIO 운영자",
  role: "super_admin",
  permissions: [
    "analytics:read", "users:read", "users:write", "content:read", "content:write",
    "subscription:read", "subscription:override", "operations:write", "admin:manage", "audit:read",
  ],
};

interface SessionValue {
  status: Status;
  me: AdminMe | null;
  /** 화면이 메뉴·버튼을 그릴 때 쓴다. **서버가 다시 검사하므로 이건 표시용이다** */
  can: (permission: AdminPermission) => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const SessionContext = createContext<SessionValue | null>(null);

export function useSession(): SessionValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("SessionProvider 안에서만 쓸 수 있다");
  return ctx;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>(isMockAuthMode ? "authenticated" : "loading");
  const [me, setMe] = useState<AdminMe | null>(isMockAuthMode ? MOCK_ADMIN : null);

  const logout = useCallback(() => {
    if (isMockAuthMode) return;
    AdminToken.clear();
    setMe(null);
    setStatus("anonymous");
  }, []);

  // 토큰이 죽으면(만료·권한 회수) 클라이언트가 즉시 안다.
  // 서버가 매 요청 DB 에서 권한을 다시 읽으므로, 권한을 뺏기면 바로 여기로 온다
  useEffect(() => {
    if (isMockAuthMode) return;
    setUnauthorizedHandler(() => {
      setMe(null);
      setStatus("anonymous");
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  // 새로고침했을 때 "나 누구지" 를 다시 묻는다
  useEffect(() => {
    if (isMockAuthMode) return;
    if (!AdminToken.get()) {
      setStatus("anonymous");
      return;
    }
    let alive = true;
    api
      .get<AdminMe>("/admin/auth/me")
      .then((data) => {
        if (!alive) return;
        setMe(data);
        setStatus("authenticated");
      })
      .catch(() => {
        if (alive) setStatus("anonymous");
      });
    return () => {
      alive = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post<{ accessToken: string; admin: AdminMe }>(
      "/admin/auth/login",
      { email, password },
    );
    AdminToken.set(res.accessToken);
    setMe(res.admin);
    setStatus("authenticated");
  }, []);

  const can = useCallback(
    (permission: AdminPermission) => !!me?.permissions?.includes(permission),
    [me],
  );

  return (
    <SessionContext.Provider value={{ status, me, can, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}
