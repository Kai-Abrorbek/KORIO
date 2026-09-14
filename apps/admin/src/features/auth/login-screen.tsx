"use client";

import { useState } from "react";
import { ApiError } from "@/shared/api/client";
import { useSession } from "./session";
import { ThemeToggle } from "@/shared/ui/theme";

/**
 * 실패 코드를 사람이 읽을 안내로.
 *
 * ⚠️ 서버는 "비밀번호 틀림" 과 "어드민 아님" 을 **구분해 주지 않는다** (둘 다
 *    INVALID_CREDENTIALS). 구분해 주면 아무 계정이나 넣어보는 것만으로 누가
 *    어드민인지 목록을 만들 수 있기 때문이다. 그래서 안내도 하나다.
 */
const MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: "이메일 또는 비밀번호가 맞지 않거나, 어드민 권한이 없는 계정입니다.",
  ADMIN_NOT_CONFIGURED:
    "서버에 ADMIN_JWT_SECRET 이 설정되지 않아 어드민 로그인이 꺼져 있습니다.",
  TOO_MANY_REQUESTS: "시도가 너무 많습니다. 15분 뒤에 다시 시도하세요.",
  HTTP_403: "이 출처에서는 API 를 호출할 수 없습니다 (ALLOWED_ORIGINS 확인).",
};

export function LoginScreen() {
  const { login } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      await login(email.trim(), password);
    } catch (err) {
      const code = err instanceof ApiError ? err.code : "UNKNOWN";
      // 매핑이 없으면 코드를 그대로 보여준다. 숨기면 원인을 알 수 없다
      setError(MESSAGES[code] ?? `로그인하지 못했습니다 · ${code}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login">
      <div className="login-top">
        <ThemeToggle />
      </div>
      <div className="login-body">
        <form onSubmit={submit} className="card login-card">
          <div className="login-brand">KORIO</div>
          <h1>운영 콘솔</h1>
          <p className="login-sub">어드민 권한이 있는 계정만 들어올 수 있습니다.</p>

          <label className="field-label" htmlFor="admin-email">
            이메일
          </label>
          <input
            id="admin-email"
            className="input"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="field-label" htmlFor="admin-password">
            비밀번호
          </label>
          <input
            id="admin-password"
            className="input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="alert" role="alert">
              {error}
            </div>
          )}

          <button className="btn btn-primary btn-block" disabled={busy || !email || !password}>
            {busy ? "확인 중…" : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
