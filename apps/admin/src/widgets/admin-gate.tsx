"use client";

import { useSession } from "@/features/auth/session";
import { LoginScreen } from "@/features/auth/login-screen";
import { AppShell } from "./app-shell";

/**
 * 로그인 여부로 화면을 가른다.
 *
 * 라우터로 리다이렉트하지 않는 이유: 어드민은 정적 export 라 서버가 없다.
 * 리다이렉트를 쓰면 새로고침할 때마다 로그인 페이지가 한 번 깜빡이고,
 * 주소창에 /login 이 남아서 뒤로가기가 이상해진다. 그냥 렌더를 가른다.
 */
export function AdminGate({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  // "나 누구지" 를 묻는 동안. 빈 화면 대신 자리를 잡아둬야 레이아웃이 안 튄다
  if (status === "loading") {
    return (
      <div className="gate-center">
        <div className="skeleton" style={{ width: 36, height: 36, borderRadius: 999 }} />
      </div>
    );
  }

  if (status === "anonymous") return <LoginScreen />;

  return <AppShell>{children}</AppShell>;
}
