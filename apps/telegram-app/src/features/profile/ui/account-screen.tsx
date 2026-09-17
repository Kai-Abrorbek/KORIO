"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { ApiError } from "../../../shared/api/client";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { GeneratedAvatar } from "../../league/ui/generated-avatar";
import { changePassword, checkUsername, deleteAccount, getMe, logoutAll, updateMe } from "../api/profile";
import type { UserMe } from "../model/profile";
import styles from "./account-screen.module.css";

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
  const { request, updateUser } = useTelegramAuth();
  const [me, setMe] = useState<UserMe | null>(null);
  const [editing, setEditing] = useState<Field | null>(null);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    let active = true;
    void getMe(request).then((user) => {
      if (!active) return;
      setMe(user);
      updateUser(user);
    }).catch(() => undefined);
    return () => { active = false; };
  }, [request, updateUser]);

  if (!me) return <main className={styles.center}><i className={styles.spinner} /></main>;

  const provider = me.provider || "local";
  const providerLook = PROVIDER[provider] ?? PROVIDER.local!;
  const joined = me.createdAt ? new Date(me.createdAt).toLocaleDateString() : "-";
  const superUntil = me.superExpiresAt ? new Date(me.superExpiresAt).toLocaleDateString() : null;

  const closeSession = async (deleteUser = false) => {
    if (!deleteUser) await logoutAll(request).catch(() => undefined);
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
          {provider !== "local" ? <Row bg="#ECECEE" color="#A8A8B0" icon="lock-closed" label="Parolni o‘zgartirish" value="Ijtimoiy tarmoq akkaunti — parol yo‘q" /> : <Row bg="#E7E0F7" color="#7E57C2" icon="lock-closed" label="Parolni o‘zgartirish" onPress={() => setPasswordOpen(true)} />}
          <Divider /><Row bg="#E2E5F7" color="#5C6BC0" icon="log-out" label="Chiqish" onPress={() => void closeSession()} />
        </Section>

        <Section danger label="Xavfli hudud">
          <Row bg="#FDE0E4" color="#E0455A" danger icon="trash" label="Akkauntni o‘chirish" onPress={() => setDeleteOpen(true)} value="Akkaunt va butun o‘quv tarixi o‘chadi" />
        </Section>
      </div>

      {editing ? <EditSheet field={editing} initial={editing === "nickname" ? me.nickname : editing === "username" ? me.username : me.bio} onClose={() => setEditing(null)} onSaved={(user) => { setMe(user); updateUser(user); setEditing(null); }} request={request} /> : null}
      {passwordOpen ? <PasswordSheet onClose={() => setPasswordOpen(false)} request={request} /> : null}
      {deleteOpen ? <DeleteSheet nickname={me.nickname} onClose={() => setDeleteOpen(false)} onDone={() => void closeSession(true)} request={request} /> : null}
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

function PasswordSheet({ onClose, request }: { onClose: () => void; request: ReturnType<typeof useTelegramAuth>["request"] }) {
  const [current, setCurrent] = useState(""); const [next, setNext] = useState(""); const [again, setAgain] = useState("");
  const [busy, setBusy] = useState(false); const [error, setError] = useState<string | null>(null); const [done, setDone] = useState(false);
  const canSave = !busy && current.length > 0 && next.length >= 6 && next === again;
  const submit = async () => { if (!canSave) return; setBusy(true); setError(null); try { await changePassword(request, current, next); window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success"); setDone(true); window.setTimeout(onClose, 900); } catch (reason) { const code = reason instanceof ApiError ? reason.code : ""; setError(code.includes("WRONG_CURRENT_PASSWORD") ? "Joriy parol noto‘g‘ri" : code.includes("SAME_PASSWORD") ? "Hozirgi parol bilan bir xil" : "Saqlanmadi. Qaytadan urinib ko‘ring."); setBusy(false); } };
  const hint = next.length > 0 && next.length < 6 ? "Kamida 6 ta belgi bo‘lishi kerak" : again.length > 0 && next !== again ? "Parollar mos kelmadi" : "Kamida 6 ta belgi";
  return <Sheet onClose={onClose}><h2 className={styles.sheetTitle}>Parolni o‘zgartirish</h2>{done ? <div className={styles.done}><MobileIcon name="checkmark-circle" size={44} /><b>Parol o‘zgartirildi</b></div> : <><input autoFocus onChange={(event) => { setError(null); setCurrent(event.target.value); }} placeholder="Joriy parol" type="password" value={current} /><input onChange={(event) => setNext(event.target.value)} placeholder="Yangi parol" type="password" value={next} /><input onChange={(event) => setAgain(event.target.value)} placeholder="Yangi parolni takrorlang" type="password" value={again} /><p className={styles.hint}>{hint}</p>{error ? <p className={styles.error}>{error}</p> : null}<button className={styles.cta} disabled={!canSave} onClick={() => void submit()} type="button">{busy ? <i className={styles.buttonSpinner} /> : "Saqlash"}</button></>}</Sheet>;
}

function DeleteSheet({ nickname, onClose, onDone, request }: { nickname: string; onClose: () => void; onDone: () => void; request: ReturnType<typeof useTelegramAuth>["request"] }) {
  const [typed, setTyped] = useState(""); const [busy, setBusy] = useState(false); const canDelete = !busy && typed.trim() === nickname;
  const run = async () => { if (!canDelete) return; setBusy(true); try { await deleteAccount(request); onDone(); } catch { setBusy(false); } };
  return <Sheet onClose={onClose}><span className={styles.warnIcon}><MobileIcon name="warning" size={26} /></span><h2 className={styles.sheetTitle}>Rostdan o‘chirasizmi?</h2><p className={styles.sheetDescription}>O‘quv tarixi, streak, olmoslar va do‘stlar ro‘yxati butunlay o‘chadi va tiklab bo‘lmaydi. Obunangiz bo‘lsa, uni do‘kondan alohida bekor qiling.</p><label className={styles.confirmLabel} htmlFor="delete-confirm">Tasdiqlash uchun &apos;{nickname}&apos; deb yozing</label><input autoCapitalize="none" id="delete-confirm" onChange={(event) => setTyped(event.target.value)} placeholder={nickname} value={typed} /><button className={`${styles.cta} ${styles.dangerCta}`} disabled={!canDelete} onClick={() => void run()} type="button">{busy ? <i className={styles.buttonSpinner} /> : "Akkauntni o‘chirish"}</button><button className={styles.cancel} onClick={onClose} type="button">Bekor qilish</button></Sheet>;
}
