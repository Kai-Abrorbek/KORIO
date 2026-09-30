"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { ApiError } from "../../../shared/api/client";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { GeneratedAvatar } from "../../league/ui/generated-avatar";
import { changePassword, checkUsername, deleteAccount, getMe, requestPasswordCode, resetPasswordWithToken, updateMe, verifyPasswordCode } from "../api/profile";
import { useAppLanguage } from "../../../shared/i18n/language-context";
import type { UserMe } from "../model/profile";
import styles from "./account-screen.module.css";
import { safeBack } from "../../../shared/telegram/back-button";

type Field = "nickname" | "username" | "bio";
const LIMITS: Record<Field, number> = { nickname: 20, username: 20, bio: 100 };
const FIELD_LABEL: Record<Field, string> = { nickname: "Taxallus", username: "Foydalanuvchi nomi", bio: "Men haqimda" };
const FIELD_PLACEHOLDER: Record<Field, string> = { nickname: "Taxallusni kiriting", username: "Hali yo‘q", bio: "O‘zingiz haqingizda bir qator yozing" };
const PROVIDER: Record<string, { icon: IoniconName; color: string; label: string }> = {
  local: { icon: "mail", color: "#45B7D1", label: "Email" },
  google: { icon: "logo-google", color: "#EA4335", label: "Google" },
  telegram: { icon: "paper-plane", color: "#229ED9", label: "Telegram" },
  kakao: { icon: "chatbubble", color: "#FEE500", label: "Kakao" },
  naver: { icon: "leaf", color: "#03C75A", label: "Naver" },
};

export function AccountScreen() {
  const router = useRouter();
  const { replaceAccessToken, request, updateUser } = useTelegramAuth();
  const [me, setMe] = useState<UserMe | null>(null);
  const [editing, setEditing] = useState<Field | null>(null);
  const [passwordOpen, setPasswordOpen] = useState(false);
  /** 메일 코드 → 새 비밀번호. set = 소셜 가입자 첫 비밀번호, forgot = 변경 창에서 "잊었어요" */
  const [codeSheet, setCodeSheet] = useState<"set" | "forgot" | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setFailed(false);
    void getMe(request).then((user) => {
      if (!active) return;
      setMe(user);
      updateUser(user);
    }).catch(() => {
      // 예전엔 실패해도 스피너만 영원히 돌았다
      if (active) setFailed(true);
    });
    return () => { active = false; };
  }, [attempt, request, updateUser]);

  if (!me) {
    return (
      <main className={styles.center}>
        {failed ? (
          <div className={styles.loadFailed}>
            <MobileIcon name="cloud-offline-outline" size={30} />
            <p>Yuklab bo&apos;lmadi. Birozdan so&apos;ng urinib ko&apos;ring</p>
            <button onClick={() => setAttempt((value) => value + 1)} type="button">Qayta urinish</button>
            <button onClick={() => safeBack(router)} type="button">Orqaga</button>
          </div>
        ) : <i className={styles.spinner} />}
      </main>
    );
  }

  const provider = me.provider || "local";
  const providerLook = PROVIDER[provider] ?? PROVIDER.local!;
  const joined = me.createdAt ? new Date(me.createdAt).toLocaleDateString() : "-";
  // 소셜 가입자도 비밀번호를 만들었으면 "변경" 이다. 옛 서버 응답엔 hasPassword 가 없다
  const hasPassword = me.hasPassword ?? provider === "local";
  const superUntil = me.superExpiresAt ? new Date(me.superExpiresAt).toLocaleDateString() : null;

  // 텔레그램 계정 = 로그인이라 "나가기" 는 미니앱을 닫는 것이다. 예전엔 logout-all 로
  // 폰 앱까지 모든 기기 세션을 끊었다 — 앱의 signOut 처럼 이 기기만 끝낸다
  const closeSession = () => {
    if (window.Telegram?.WebApp.close) window.Telegram.WebApp.close();
    else router.replace("/");
  };

  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <button aria-label="Orqaga" onClick={() => window.history.length > 1 ? router.back() : router.replace("/profile")} type="button"><MobileIcon name="chevron-back" size={28} /></button>
        <h1>Akkauntni boshqarish</h1>
      </header>
      <div className={styles.scroll}>
        <section className={styles.hero}>
          <button className={styles.avatarWrap} onClick={() => router.push("/avatar-editor")} type="button"><GeneratedAvatar avatar={me.avatar} variant="full" /><span><MobileIcon name="pencil" size={13} /></span></button>
          <h2>{me.nickname}</h2>
          {me.username ? <p>@{me.username}</p> : <p className={styles.emptyHandle}>Foydalanuvchi nomi yo‘q</p>}
        </section>

        <Section label="Profil">
          <Row bg="#FFE5D0" color="#FF9F66" icon="person" label="Taxallus" onPress={() => setEditing("nickname")} value={me.nickname} />
          <Divider /><Row bg="#EBE5FA" color="#A78BFA" icon="at" label="Foydalanuvchi nomi" onPress={() => setEditing("username")} placeholder="Hali yo‘q" value={me.username ? `@${me.username}` : ""} />
          <Divider /><Row bg="#D7F5E5" color="#1DBB7F" icon="create" label="Men haqimda" onPress={() => setEditing("bio")} placeholder="O‘zingiz haqingizda bir qator yozing" value={me.bio} />
        </Section>

        <Section label="Akkaunt ma’lumoti">
          <Row bg="#D5F0F5" color="#45B7D1" icon="mail" label="Email" value={me.email} />
          <Divider /><Row bg="#F1F0F7" color={providerLook.color} icon={providerLook.icon} label="Kirish usuli" value={providerLook.label} />
          <Divider /><Row bg="#FFF4D6" color="#F4B860" icon="calendar" label="Ro‘yxatdan o‘tgan sana" value={joined} />
        </Section>

        <Section label="Obuna">
          <Row bg={me.isSuper ? "#FCEFC7" : "#ECECEE"} color={me.isSuper ? "#E2A83A" : "#A8A8B0"} icon="diamond" label={me.isSuper ? "KORIO SUPER faol" : "KORIO SUPER"} onPress={() => router.push("/premium")} value={me.isSuper && superUntil ? `${superUntil} gacha` : "Imkoniyatlarni ko‘rish"} />
        </Section>

        <Section label="Xavfsizlik">
          {hasPassword ? (
            <Row bg="#E7E0F7" color="#7E57C2" icon="lock-closed" label="Parolni o‘zgartirish" onPress={() => setPasswordOpen(true)} />
          ) : me.email ? (
            // 소셜 가입자: 현재 비밀번호가 애초에 없다 → 메일 코드로 본인 확인하고 만든다
            <Row bg="#E7E0F7" color="#7E57C2" icon="key" label="Parol yaratish" onPress={() => setCodeSheet("set")} value="Emailni tasdiqlagach, email bilan ham kira olasiz" />
          ) : (
            <Row bg="#ECECEE" color="#A8A8B0" icon="lock-closed" label="Parol yaratish" value="Bu hisobda email yo‘q — parol yaratib bo‘lmaydi" />
          )}
          <Divider /><Row bg="#E2E5F7" color="#5C6BC0" icon="log-out" label="Chiqish" onPress={closeSession} />
        </Section>

        <Section danger label="Xavfli hudud">
          <Row bg="#FDE0E4" color="#E0455A" danger icon="trash" label="Akkauntni o‘chirish" onPress={() => setDeleteOpen(true)} value="Akkaunt va butun o‘quv tarixi o‘chadi" />
        </Section>
      </div>

      {editing ? <EditSheet field={editing} initial={(editing === "nickname" ? me.nickname : editing === "username" ? me.username : me.bio) ?? ""} onClose={() => setEditing(null)} onSaved={(user) => { setMe(user); updateUser(user); setEditing(null); }} request={request} /> : null}
      {passwordOpen ? <PasswordSheet onClose={() => setPasswordOpen(false)} onForgot={me.email ? () => { setPasswordOpen(false); setCodeSheet("forgot"); } : undefined} request={request} /> : null}
      {codeSheet && me.email ? (
        <EmailPasswordSheet
          email={me.email}
          mode={codeSheet}
          onClose={() => setCodeSheet(null)}
          onDone={(token) => {
            replaceAccessToken(token);
            setMe((current) => (current ? { ...current, hasPassword: true } : current));
          }}
          request={request}
        />
      ) : null}
      {deleteOpen ? <DeleteSheet nickname={me.nickname} onClose={() => setDeleteOpen(false)} onDone={closeSession} request={request} /> : null}
    </main>
  );
}

function Section({ label, danger, children }: { label: string; danger?: boolean; children: ReactNode }) {
  return <section className={`${styles.section} ${danger ? styles.dangerSection : ""}`}><h2>{label}</h2><div>{children}</div></section>;
}

function Divider() { return <i className={styles.divider} />; }

function Row({ icon, color, bg, label, value, placeholder, onPress, danger }: { icon: IoniconName; color: string; bg: string; label: string; value?: string; placeholder?: string; onPress?: () => void; danger?: boolean }) {
  const body = <><span className={styles.iconSquare} style={{ backgroundColor: bg, color }}><MobileIcon name={icon} size={20} /></span><span className={styles.rowCopy}><b className={danger ? styles.dangerText : ""}>{label}</b>{value || placeholder ? <small className={!value ? styles.placeholderText : ""}>{value || placeholder}</small> : null}</span>{onPress ? <MobileIcon className={styles.chevron} name="chevron-forward" size={19} /> : null}</>;
  return onPress ? <button className={styles.row} onClick={() => { window.Telegram?.WebApp.HapticFeedback?.selectionChanged(); onPress(); }} type="button">{body}</button> : <div className={styles.row}>{body}</div>;
}

function Sheet({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  useEffect(() => {
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = before; window.removeEventListener("keydown", escape); };
  }, [onClose]);
  return <div aria-modal="true" className={styles.modal} role="dialog"><button aria-label="Yopish" onClick={onClose} type="button" /><section>{children}</section></div>;
}

function EditSheet({ field, initial, onClose, onSaved, request }: { field: Field; initial: string; onClose: () => void; onSaved: (user: UserMe) => void; request: ReturnType<typeof useTelegramAuth>["request"] }) {
  const [value, setValue] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const trimmed = value.trim();
  const canSave = trimmed !== initial.trim() && !busy && (field === "bio" || trimmed.length > 0);
  const save = async () => {
    if (!canSave) return;
    setBusy(true); setError(null);
    try {
      if (field === "username") {
        const result = await checkUsername(request, trimmed.toLowerCase());
        if (!result.available) { setError(result.reason === "format" ? "Faqat kichik lotin harflar, raqam va pastki chiziq, 3~20 ta." : "Bu nom band qilingan."); setBusy(false); return; }
      }
      const patch = field === "username" ? { username: trimmed.toLowerCase() } : field === "nickname" ? { nickname: trimmed } : { bio: trimmed };
      const user = await updateMe(request, patch);
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
      onSaved(user);
    } catch { setError("Saqlanmadi. Qaytadan urinib ko‘ring."); setBusy(false); }
  };
  return <Sheet onClose={onClose}><h2 className={styles.sheetTitle}>{FIELD_LABEL[field]}</h2>{field === "bio" ? <textarea autoFocus maxLength={LIMITS[field]} onChange={(event) => { setError(null); setValue(event.target.value); }} placeholder={FIELD_PLACEHOLDER[field]} value={value} /> : <input autoCapitalize={field === "username" ? "none" : "sentences"} autoFocus maxLength={LIMITS[field]} onChange={(event) => { setError(null); setValue(event.target.value); }} placeholder={FIELD_PLACEHOLDER[field]} value={value} />}<div className={styles.sheetMeta}><small>{field === "username" ? "Kichik lotin harflar, raqam, pastki chiziq 3~20 ta" : " "}</small><b>{value.length}/{LIMITS[field]}</b></div>{error ? <p className={styles.error}>{error}</p> : null}<button className={styles.cta} disabled={!canSave} onClick={() => void save()} type="button">{busy ? <i className={styles.buttonSpinner} /> : "Saqlash"}</button></Sheet>;
}

function PasswordSheet({ onClose, onForgot, request }: { onClose: () => void; onForgot?: () => void; request: ReturnType<typeof useTelegramAuth>["request"] }) {
  const [current, setCurrent] = useState(""); const [next, setNext] = useState(""); const [again, setAgain] = useState("");
  const [busy, setBusy] = useState(false); const [error, setError] = useState<string | null>(null); const [done, setDone] = useState(false);
  const canSave = !busy && current.length > 0 && next.length >= 6 && next === again;
  const submit = async () => { if (!canSave) return; setBusy(true); setError(null); try { await changePassword(request, current, next); window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success"); setDone(true); window.setTimeout(onClose, 900); } catch (reason) { const code = reason instanceof ApiError ? reason.code : ""; setError(code.includes("WRONG_CURRENT_PASSWORD") ? "Joriy parol noto‘g‘ri" : code.includes("SAME_PASSWORD") ? "Hozirgi parol bilan bir xil" : "Saqlanmadi. Qaytadan urinib ko‘ring."); setBusy(false); } };
  const hint = next.length > 0 && next.length < 6 ? "Kamida 6 ta belgi bo‘lishi kerak" : again.length > 0 && next !== again ? "Parollar mos kelmadi" : "Kamida 6 ta belgi";
  return <Sheet onClose={onClose}><h2 className={styles.sheetTitle}>Parolni o‘zgartirish</h2>{done ? <div className={styles.done}><MobileIcon name="checkmark-circle" size={44} /><b>Parol o‘zgartirildi</b></div> : <><input autoFocus onChange={(event) => { setError(null); setCurrent(event.target.value); }} placeholder="Joriy parol" type="password" value={current} /><input onChange={(event) => setNext(event.target.value)} placeholder="Yangi parol" type="password" value={next} /><input onChange={(event) => setAgain(event.target.value)} placeholder="Yangi parolni takrorlang" type="password" value={again} /><p className={styles.hint}>{hint}</p>{error ? <p className={styles.error}>{error}</p> : null}<button className={styles.cta} disabled={!canSave} onClick={() => void submit()} type="button">{busy ? <i className={styles.buttonSpinner} /> : "Saqlash"}</button>{onForgot ? <button className={styles.linkButton} onClick={onForgot} type="button">Parolni unutdingizmi?</button> : null}</>}</Sheet>;
}

const CODE_LENGTH = 6;
const RESEND_SEC = 60;
const CODE_ERRORS: Record<string, string> = {
  INVALID_CODE: "Kod noto‘g‘ri. Qaytadan tekshiring.",
  TOO_MANY_ATTEMPTS: "Juda ko‘p marta xato kiritildi. Yangi kod oling.",
  INVALID_RESET_TOKEN: "Tasdiq muddati tugadi. Boshidan boshlang.",
  TOO_MANY_REQUESTS: "Juda tez-tez so‘rayapsiz. Birozdan so‘ng urinib ko‘ring.",
};
const codeError = (reason: unknown) => {
  const code = reason instanceof ApiError ? reason.code : "";
  const key = Object.keys(CODE_ERRORS).find((name) => code.includes(name));
  return key ? CODE_ERRORS[key]! : "Saqlanmadi. Qaytadan urinib ko‘ring.";
};

/**
 * 현재 비밀번호 대신 "그 메일함을 열 수 있다" 로 본인 확인 → 새 비밀번호.
 *  set    — 소셜 가입자는 비밀번호가 애초에 없다
 *  forgot — 비밀번호는 있는데 기억이 안 난다
 * 모바일 account.tsx 의 EmailPasswordSheet 와 같은 흐름이다.
 */
function EmailPasswordSheet({ email, mode, onClose, onDone, request }: { email: string; mode: "set" | "forgot"; onClose: () => void; onDone: (accessToken: string) => void; request: ReturnType<typeof useTelegramAuth>["request"] }) {
  const { language } = useAppLanguage();
  const codeRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<"code" | "password" | "done">("code");
  const [code, setCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [sentAt, setSentAt] = useState(0);
  const [left, setLeft] = useState(0);
  const [sending, setSending] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [next, setNext] = useState("");
  const [again, setAgain] = useState("");

  const send = async (resend: boolean) => {
    setSending(true); setError(null); setNotice(null);
    try {
      await requestPasswordCode(request, email, language, mode === "set" ? "setPassword" : "reset");
      setSentAt(Date.now()); setCode("");
      if (resend) setNotice("Kod qayta yuborildi");
    } catch (reason) { setError(codeError(reason)); }
    finally { setSending(false); }
  };

  // 시트가 열리는 순간 보낸다 — 버튼을 누른 게 곧 "메일로 인증할게" 다
  useEffect(() => {
    void send(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!sentAt) return;
    const tick = () => setLeft(Math.max(0, RESEND_SEC - Math.floor((Date.now() - sentAt) / 1000)));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [sentAt]);

  const verify = async (value = code) => {
    if (value.length !== CODE_LENGTH || busy) return;
    setBusy(true); setError(null); setNotice(null);
    try {
      const result = await verifyPasswordCode(request, email, value);
      setResetToken(result.resetToken);
      window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
      setStep("password");
    } catch (reason) {
      setError(codeError(reason)); setCode("");
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
      codeRef.current?.focus();
    } finally { setBusy(false); }
  };

  const tooShort = next.length > 0 && next.length < 6;
  const mismatch = again.length > 0 && next !== again;
  const canSave = !busy && next.length >= 6 && next === again;

  const save = async () => {
    if (!canSave) return;
    setBusy(true); setError(null);
    try {
      const result = await resetPasswordWithToken(request, resetToken, next);
      // 서버가 tokenVersion 을 올려서 지금 토큰은 죽는다 — 새 토큰으로 갈아끼운다
      onDone(result.accessToken);
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
      setStep("done");
      window.setTimeout(onClose, 1100);
    } catch (reason) {
      // 토큰(10분)이 지났으면 코드부터 다시
      if (reason instanceof ApiError && reason.code.includes("INVALID_RESET_TOKEN")) { setStep("code"); setResetToken(""); setCode(""); }
      setError(codeError(reason)); setBusy(false);
    }
  };

  if (step === "done") {
    return <Sheet onClose={onClose}><div className={styles.done}><MobileIcon name="checkmark-circle" size={48} /><b>{mode === "set" ? "Parol yaratildi" : "Parol o‘zgartirildi"}</b></div></Sheet>;
  }

  const onCode = step === "code";
  return (
    <Sheet onClose={onClose}>
      <h2 className={styles.sheetTitle}>{mode === "set" ? "Parol yaratamiz" : "Yangi parol"}</h2>
      {/* 지금 어디쯤인지 — 1 이메일 인증 · 2 새 비밀번호 */}
      <div className={styles.steps}>
        <span className={styles.stepOn}><i>{onCode ? "1" : <MobileIcon name="checkmark" size={13} />}</i><b>Emailni tasdiqlash</b></span>
        <em className={onCode ? "" : styles.stepLineOn} />
        <span className={onCode ? "" : styles.stepOn}><i>2</i><b>Yangi parol</b></span>
      </div>
      {onCode ? (
        <>
          <p className={styles.sheetDescription}>{sending && !sentAt ? "Emailga kod yuborilmoqda…" : `${email} manziliga 6 xonali kod yubordik.`}</p>
          <label className={styles.codeRow}>
            {Array.from({ length: CODE_LENGTH }).map((_, index) => (
              <span
                className={`${styles.codeBox} ${index === code.length ? styles.codeBoxActive : ""} ${code[index] ? styles.codeBoxFilled : ""} ${error ? styles.codeBoxError : ""}`}
                key={index}
              >
                {code[index] ?? (index === code.length ? <i className={styles.codeCaret} /> : null)}
              </span>
            ))}
            {/* 칸은 6개로 보이지만 입력은 이 하나가 받는다 — 붙여넣기·자동완성이 그대로 된다 */}
            <input
              aria-label="Tasdiqlash kodi"
              autoComplete="one-time-code"
              autoFocus
              className={styles.codeHidden}
              inputMode="numeric"
              maxLength={CODE_LENGTH}
              onChange={(event) => {
                const digits = event.target.value.replace(/\D/g, "").slice(0, CODE_LENGTH);
                setCode(digits);
                if (error) setError(null);
                if (digits.length === CODE_LENGTH) void verify(digits);
              }}
              ref={codeRef}
              value={code}
            />
          </label>
          {error ? <p className={styles.error}>{error}</p> : notice ? <p className={styles.notice}>{notice}</p> : null}
          <p className={styles.hint}>Xat ko‘rinmasa, spam papkasini ham tekshiring.</p>
          <button className={styles.cta} disabled={code.length !== CODE_LENGTH || busy} onClick={() => void verify()} type="button">{busy ? <i className={styles.buttonSpinner} /> : "Tasdiqlash"}</button>
          <button className={left > 0 || sending ? styles.cancel : styles.linkButton} disabled={left > 0 || sending} onClick={() => void send(true)} type="button">
            {left > 0 ? `${left} soniyadan keyin qayta yuborish mumkin` : "Kodni qayta yuborish"}
          </button>
        </>
      ) : (
        <>
          <p className={styles.sheetDescription}>{mode === "set" ? "Endi shu email va parol bilan ham kira olasiz." : "Boshqa joyda ishlatmaydigan parol tanlang."}</p>
          <input autoFocus onChange={(event) => { setError(null); setNext(event.target.value); }} placeholder="Yangi parol" type="password" value={next} />
          <input onChange={(event) => setAgain(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void save(); }} placeholder="Yangi parolni takrorlang" type="password" value={again} />
          <p className={styles.hint}>{tooShort ? "Kamida 6 ta belgi bo‘lishi kerak" : mismatch ? "Parollar mos kelmadi" : "Kamida 6 ta belgi"}</p>
          {error ? <p className={styles.error}>{error}</p> : null}
          <button className={styles.cta} disabled={!canSave} onClick={() => void save()} type="button">{busy ? <i className={styles.buttonSpinner} /> : "Saqlash"}</button>
        </>
      )}
    </Sheet>
  );
}

function DeleteSheet({ nickname, onClose, onDone, request }: { nickname: string; onClose: () => void; onDone: () => void; request: ReturnType<typeof useTelegramAuth>["request"] }) {
  const [typed, setTyped] = useState(""); const [busy, setBusy] = useState(false); const canDelete = !busy && typed.trim() === nickname;
  const run = async () => { if (!canDelete) return; setBusy(true); try { await deleteAccount(request); onDone(); } catch { setBusy(false); } };
  return <Sheet onClose={onClose}><span className={styles.warnIcon}><MobileIcon name="warning" size={26} /></span><h2 className={styles.sheetTitle}>Rostdan o‘chirasizmi?</h2><p className={styles.sheetDescription}>O‘quv tarixi, streak, olmoslar va do‘stlar ro‘yxati butunlay o‘chadi va tiklab bo‘lmaydi. Obunangiz bo‘lsa, uni do‘kondan alohida bekor qiling.</p><label className={styles.confirmLabel} htmlFor="delete-confirm">{`Tasdiqlash uchun '${nickname}' deb yozing`}</label><input autoCapitalize="none" id="delete-confirm" onChange={(event) => setTyped(event.target.value)} placeholder={nickname} value={typed} /><button className={`${styles.cta} ${styles.dangerCta}`} disabled={!canDelete} onClick={() => void run()} type="button">{busy ? <i className={styles.buttonSpinner} /> : "Akkauntni o‘chirish"}</button><button className={styles.cancel} onClick={onClose} type="button">Bekor qilish</button></Sheet>;
}
