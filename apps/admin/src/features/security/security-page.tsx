"use client";

import { useEffect, useState } from "react";
import { ApiError, api } from "@/shared/api/client";
import { isMockAuthMode, useSession, type AdminSession } from "@/features/auth/session";

/**
 * 내 보안 — 운영 콘솔 비밀번호 변경과 2단계 인증(인증 앱 6자리).
 *
 * 비밀번호를 브라우저에 저장해 두고 쓰면, 그 브라우저(또는 비밀번호 관리자)가
 * 털리는 순간 운영 콘솔이 열린다. 2단계를 켜 두면 비밀번호만으로는 못 들어온다.
 *
 * 비밀번호·2단계를 바꾸면 서버가 **다른 어드민 세션을 전부 끊고** 이 화면에
 * 새 토큰을 준다. 앱 로그인은 건드리지 않는다.
 */
const MESSAGES: Record<string, string> = {
  WRONG_PASSWORD: "지금 비밀번호가 맞지 않습니다.",
  INVALID_OTP: "인증 코드가 맞지 않습니다. 앱에 표시된 새 코드를 넣어 주세요.",
  OTP_REQUIRED: "2단계 인증이 켜져 있어 인증 코드가 필요합니다.",
  PASSWORD_TOO_SHORT: "새 비밀번호는 12자 이상이어야 합니다.",
  SAME_PASSWORD: "지금과 다른 비밀번호를 정해 주세요.",
  TWO_FACTOR_SETUP_EXPIRED: "등록을 처음부터 다시 시작해 주세요.",
  TWO_FACTOR_ALREADY_ON: "이미 2단계 인증이 켜져 있습니다.",
  TWO_FACTOR_ALREADY_OFF: "2단계 인증이 이미 꺼져 있습니다.",
  TOO_MANY_REQUESTS: "시도가 너무 많습니다. 15분 뒤에 다시 시도하세요.",
};

function messageFor(error: unknown): string {
  const code = error instanceof ApiError ? error.code : "UNKNOWN";
  return MESSAGES[code] ?? `처리하지 못했습니다 · ${code}`;
}

const cleanOtp = (value: string) => value.replace(/[^\d]/g, "").slice(0, 6);

/** 비밀 키를 4자씩 끊어 보여준다 — 인증 앱에 손으로 옮겨 적기 쉽게 */
const grouped = (secret: string) => secret.match(/.{1,4}/g)?.join(" ") ?? secret;

function OtpInput({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <input
      id={id}
      className="input"
      inputMode="numeric"
      autoComplete="one-time-code"
      maxLength={6}
      value={value}
      onChange={(e) => onChange(cleanOtp(e.target.value))}
      placeholder="123456"
    />
  );
}

function TwoFactorCard() {
  const { me, adoptSession } = useSession();
  const enabled = !!me?.twoFactorEnabled;
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [setup, setSetup] = useState<{ secret: string; otpauthUrl: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // 켜고 끈 뒤에는 입력을 비운다
  useEffect(() => {
    setPassword("");
    setOtp("");
    setSetup(null);
  }, [enabled]);

  const run = async (fn: () => Promise<void>) => {
    if (busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await fn();
    } catch (err) {
      setError(messageFor(err));
    } finally {
      setBusy(false);
    }
  };

  const begin = () =>
    run(async () => {
      const res = await api.post<{ secret: string; otpauthUrl: string }>("/admin/auth/2fa/setup", { password });
      setSetup(res);
      setPassword("");
    });

  const enable = () =>
    run(async () => {
      const session = await api.post<AdminSession>("/admin/auth/2fa/enable", { otp });
      adoptSession(session, true);
      setNotice("2단계 인증을 켰습니다. 다른 곳에 열려 있던 운영 콘솔은 로그아웃됐습니다.");
    });

  const disable = () =>
    run(async () => {
      if (!window.confirm("2단계 인증을 끄면 비밀번호만으로 들어올 수 있게 됩니다. 끌까요?")) return;
      const session = await api.post<AdminSession>("/admin/auth/2fa/disable", { password, otp });
      adoptSession(session, false);
      setNotice("2단계 인증을 껐습니다.");
    });

  return (
    <section className="admin-card">
      <div className="admin-card-head">
        <h3>2단계 인증</h3>
        <span className={`admin-pill ${enabled ? "good" : "warn"}`}>{enabled ? "켜짐" : "꺼짐"}</span>
      </div>
      <div className="admin-card-body">
        <p className="page-sub">
          로그인할 때 비밀번호와 함께 휴대폰 인증 앱(Google Authenticator, Microsoft Authenticator, 1Password 등)이 30초마다
          만드는 6자리를 받습니다. 비밀번호가 브라우저에 저장돼 있거나 새도, 그 휴대폰이 없으면 못 들어옵니다.
        </p>

        {!enabled && !setup && (
          <>
            <label className="field-label" htmlFor="tfa-password">지금 비밀번호</label>
            <input id="tfa-password" className="input" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" className="btn btn-primary" style={{ marginTop: 12 }} disabled={busy || !password} onClick={() => void begin()}>
              {busy ? "확인 중…" : "2단계 인증 등록 시작"}
            </button>
          </>
        )}

        {!enabled && setup && (
          <>
            <ol className="page-sub" style={{ paddingLeft: 18 }}>
              <li>휴대폰 인증 앱에서 <b>계정 추가 → 설정 키 입력</b>을 고릅니다.</li>
              <li>계정 이름은 아무거나(예: KORIO Admin), 키에는 아래 값을 넣고 <b>시간 기준</b>을 고릅니다.</li>
              <li>앱에 뜬 6자리를 아래에 넣으면 켜집니다.</li>
            </ol>
            <div className="field-label">설정 키</div>
            <code style={{ display: "block", padding: "10px 12px", fontSize: 16, letterSpacing: ".08em", userSelect: "all", wordBreak: "break-all" }}>
              {grouped(setup.secret)}
            </code>
            <p className="page-sub">
              이 휴대폰에서 콘솔을 열었다면 <a href={setup.otpauthUrl}>여기를 눌러 인증 앱에 바로 추가</a>할 수도 있습니다.
              키는 이 화면에서만 보입니다 — 다른 사람에게 보여 주지 마세요.
            </p>
            <label className="field-label" htmlFor="tfa-enable-otp">인증 코드</label>
            <OtpInput id="tfa-enable-otp" value={otp} onChange={setOtp} />
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button type="button" className="btn btn-primary" disabled={busy || otp.length !== 6} onClick={() => void enable()}>
                {busy ? "확인 중…" : "확인하고 켜기"}
              </button>
              <button type="button" className="btn btn-ghost" disabled={busy} onClick={() => setSetup(null)}>취소</button>
            </div>
          </>
        )}

        {enabled && (
          <>
            <p className="page-sub">
              휴대폰을 잃어버렸으면 서버에서 <code>pnpm --filter api admin:2fa-reset {me?.email}</code> 으로 끄고 다시 등록하세요.
            </p>
            <details>
              <summary className="page-sub" style={{ cursor: "pointer" }}>2단계 인증 끄기</summary>
              <label className="field-label" htmlFor="tfa-off-password">지금 비밀번호</label>
              <input id="tfa-off-password" className="input" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label className="field-label" htmlFor="tfa-off-otp">인증 코드</label>
              <OtpInput id="tfa-off-otp" value={otp} onChange={setOtp} />
              <button type="button" className="btn btn-ghost" style={{ marginTop: 12 }} disabled={busy || !password || otp.length !== 6} onClick={() => void disable()}>
                {busy ? "확인 중…" : "끄기"}
              </button>
            </details>
          </>
        )}

        {error && <div className="alert" role="alert" style={{ marginTop: 12 }}>{error}</div>}
        {notice && <p role="status" className="page-sub">{notice}</p>}
      </div>
    </section>
  );
}

function PasswordCard() {
  const { me, adoptSession } = useSession();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const needsOtp = !!me?.twoFactorEnabled;
  const mismatch = !!confirm && next !== confirm;
  const ready = !!current && next.length >= 12 && next === confirm && (!needsOtp || otp.length === 6);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy || !ready) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const session = await api.post<AdminSession>("/admin/auth/password", {
        currentPassword: current,
        newPassword: next,
        ...(needsOtp ? { otp } : {}),
      });
      adoptSession(session, needsOtp);
      setCurrent("");
      setNext("");
      setConfirm("");
      setOtp("");
      setNotice("비밀번호를 바꿨습니다. 다른 곳에 열려 있던 운영 콘솔은 로그아웃됐습니다. 브라우저가 저장하겠냐고 물으면 새 비밀번호로 바꿔 두세요.");
    } catch (err) {
      setError(messageFor(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="admin-card">
      <div className="admin-card-head"><h3>운영 콘솔 비밀번호</h3></div>
      <form className="admin-card-body" onSubmit={(e) => void submit(e)}>
        <p className="page-sub">앱 비밀번호와는 별개입니다. 바꿔도 앱 로그인은 그대로입니다. 12자 이상으로 정하세요.</p>
        {/* 브라우저 비밀번호 관리자가 어느 계정의 비밀번호인지 알게 한다 */}
        <input type="email" autoComplete="username" value={me?.email ?? ""} readOnly hidden />
        <label className="field-label" htmlFor="pw-current">지금 비밀번호</label>
        <input id="pw-current" className="input" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} />
        <label className="field-label" htmlFor="pw-next">새 비밀번호</label>
        <input id="pw-next" className="input" type="password" autoComplete="new-password" minLength={12} value={next} onChange={(e) => setNext(e.target.value)} />
        <label className="field-label" htmlFor="pw-confirm">새 비밀번호 확인</label>
        <input id="pw-confirm" className="input" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        {next && next.length < 12 && <p className="page-sub">{12 - next.length}자 더 필요합니다.</p>}
        {mismatch && <p className="page-sub">새 비밀번호 두 칸이 다릅니다.</p>}
        {needsOtp && (
          <>
            <label className="field-label" htmlFor="pw-otp">인증 코드</label>
            <OtpInput id="pw-otp" value={otp} onChange={setOtp} />
          </>
        )}
        <button className="btn btn-primary" style={{ marginTop: 12 }} disabled={busy || !ready}>
          {busy ? "바꾸는 중…" : "비밀번호 바꾸기"}
        </button>
        {error && <div className="alert" role="alert" style={{ marginTop: 12 }}>{error}</div>}
        {notice && <p role="status" className="page-sub">{notice}</p>}
      </form>
    </section>
  );
}

export function SecurityPage() {
  if (isMockAuthMode) {
    return <div className="admin-card admin-empty">모의 로그인 모드에서는 보안 설정을 바꿀 수 없습니다.</div>;
  }
  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h2>내 보안</h2>
          <p>지금 로그인한 운영 계정의 비밀번호와 2단계 인증을 관리합니다.</p>
        </div>
      </div>
      <TwoFactorCard />
      <PasswordCard />
    </div>
  );
}
