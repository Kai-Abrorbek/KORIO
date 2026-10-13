"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { ApiError } from "../../../shared/api/client";
import { uzt } from "../../../shared/i18n/uz-text";
import { safeBack } from "../../../shared/telegram/back-button";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { createSupportTicket, getSupportTickets } from "../api/support";
import {
  SUPPORT_CATEGORIES,
  SUPPORT_CATEGORY_LOOK,
  SUPPORT_LIMITS,
  SUPPORT_REPLY_LOOK,
  SUPPORT_STATUS_LOOK,
  supportDate,
  type SupportCategory,
  type SupportTicket,
  type SupportTicketList,
} from "../model/support";
import { SupportResultModal, type SupportResult } from "./support-result-modal";
import styles from "./support-screen.module.css";

/**
 * 문의하기 — 도움말 센터 "Yordamga murojaat" 에서 들어온다. 모바일 app/support.tsx 와 같은 화면.
 *
 * 예전엔 도움말의 "Email orqali" 가 mailto: 로 웹뷰 자체를 넘겨 버려서, 텔레그램에선
 * 오류 페이지에 갇히고 앱을 다시 켜야 나올 수 있었다. 이제 문의는 앱 안에서 쓰고 보낸다.
 *
 * - 위: 한글몬 + "답변은 어디로 와요" (텔레그램 유저는 봇 메시지)
 * - 분류 · 제목 · 내용 (서버와 같은 최소/최대 글자)
 * - 아래: 내 문의 — 상태, 운영팀 답변
 * - 보내기 버튼은 화면 아래 고정, 결과는 기본 alert 대신 모달
 */
export function SupportScreen() {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const [category, setCategory] = useState<SupportCategory>("general");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [list, setList] = useState<SupportTicketList | null>(null);
  const [listState, setListState] = useState<"loading" | "ready" | "failed">("loading");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<SupportResult | null>(null);
  const [freshId, setFreshId] = useState<string | null>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    try {
      setList(await getSupportTickets(request));
      setListState("ready");
    } catch {
      // 목록이 안 와도 쓰는 칸은 그대로 쓸 수 있다
      setListState((current) => (current === "ready" ? current : "failed"));
    }
  }, [request]);

  useEffect(() => {
    void load();
  }, [load]);

  const subjectLen = subject.trim().length;
  const messageLen = message.trim().length;
  const ready = subjectLen >= SUPPORT_LIMITS.subjectMin && messageLen >= SUPPORT_LIMITS.messageMin;

  const submit = async () => {
    if (sending || !ready) return;
    setSending(true);
    const sent = { category, subject: subject.trim(), message: message.trim() };
    try {
      const ticket = await createSupportTicket(request, sent);
      setSubject("");
      setMessage("");
      setList((current) => ({ ...current, items: [ticket, ...(current?.items ?? [])] }));
      setListState("ready");
      setFreshId(ticket.id);
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
      setResult({ kind: "sent", category: sent.category, subject: sent.subject });
      void load();
    } catch (error) {
      // 쓴 내용은 지우지 않는다 — 다시 누르면 그대로 보낸다
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
      const limited =
        error instanceof ApiError && (error.status === 429 || error.code === "SUPPORT_DAILY_LIMIT");
      setResult({ kind: limited ? "limit" : "failed" });
    } finally {
      setSending(false);
    }
  };

  const closeResult = () => {
    const wasSent = result?.kind === "sent";
    setResult(null);
    // 방금 보낸 문의가 목록 맨 위에 있다는 걸 보여 준다
    if (wasSent) {
      window.setTimeout(() => historyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    }
  };

  const pick = (next: SupportCategory) => {
    window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
    setCategory(next);
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <button aria-label={uzt("common.back")} onClick={() => safeBack(router, "/help")} type="button">
          <MobileIcon name="chevron-back" size={26} />
        </button>
        <h1 data-i18n="support.title">{uzt("support.title")}</h1>
        <span aria-hidden="true" />
      </header>

      <div className={styles.scroll}>
        <Hero list={list} />

        <h2 className={styles.label} data-i18n="support.categoryLabel">
          {uzt("support.categoryLabel")}
        </h2>
        <div className={styles.cats} role="radiogroup">
          {SUPPORT_CATEGORIES.map((item) => {
            const look = SUPPORT_CATEGORY_LOOK[item];
            const active = item === category;
            return (
              <button
                aria-checked={active}
                className={active ? styles.catActive : undefined}
                key={item}
                onClick={() => pick(item)}
                role="radio"
                style={{ "--c": look.color } as CSSProperties}
                type="button"
              >
                <MobileIcon name={look.icon} size={16} />
                <span data-i18n={`support.category.${item}`}>{uzt(`support.category.${item}`)}</span>
              </button>
            );
          })}
        </div>

        <label className={styles.field}>
          <span className={styles.fieldHead}>
            <b data-i18n="support.subject">{uzt("support.subject")}</b>
            <small data-no-translate>{`${subject.length}/${SUPPORT_LIMITS.subjectMax}`}</small>
          </span>
          <input
            enterKeyHint="next"
            maxLength={SUPPORT_LIMITS.subjectMax}
            onChange={(event) => setSubject(event.target.value)}
            placeholder={uzt("support.subjectHint")}
            value={subject}
          />
          <Need len={subjectLen} min={SUPPORT_LIMITS.subjectMin} />
        </label>

        <label className={styles.field}>
          <span className={styles.fieldHead}>
            <b data-i18n="support.message">{uzt("support.message")}</b>
            <small data-no-translate>{`${message.length}/${SUPPORT_LIMITS.messageMax}`}</small>
          </span>
          <textarea
            maxLength={SUPPORT_LIMITS.messageMax}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={uzt("support.messageHint")}
            rows={6}
            value={message}
          />
          <Need len={messageLen} min={SUPPORT_LIMITS.messageMin} />
        </label>

        <div className={styles.historyHead} ref={historyRef}>
          <h2 data-i18n="support.history">{uzt("support.history")}</h2>
          {list?.items.length ? (
            <span className={styles.count} data-no-translate>
              {list.items.length}
            </span>
          ) : null}
        </div>
        <History freshId={freshId} items={list?.items ?? []} onRetry={() => void load()} state={listState} />
      </div>

      <footer className={styles.bottom}>
        <button
          className={`${styles.send} ${ready ? styles.sendReady : ""}`}
          disabled={!ready || sending}
          onClick={() => void submit()}
          type="button"
        >
          {ready && !sending ? <i aria-hidden="true" className={styles.sendShine} /> : null}
          {sending ? (
            <>
              <i aria-hidden="true" className={styles.spinner} />
              <span data-i18n="support.sending">{uzt("support.sending")}</span>
            </>
          ) : (
            <>
              <MobileIcon name="paper-plane" size={18} />
              <span data-i18n="support.send">{uzt("support.send")}</span>
            </>
          )}
        </button>
      </footer>

      <SupportResultModal onClose={closeResult} onRetry={() => void submit()} result={result} />
    </main>
  );
}

/** 위 카드 — 한글몬 + 무엇을 쓰면 되는지 + 답장이 오는 곳 */
function Hero({ list }: { list: SupportTicketList | null }) {
  const replyTo = list?.replyTo;
  return (
    <section className={styles.hero}>
      <i aria-hidden="true" className={styles.heroGlow} />
      <div className={styles.heroText}>
        <h2 data-i18n="support.heroTitle">{uzt("support.heroTitle")}</h2>
        <p data-i18n="support.intro">{uzt("support.intro")}</p>
      </div>
      <Image
        alt=""
        className={styles.heroMascot}
        height={112}
        priority
        src="/characters/hangulmon_default_float.png"
        unoptimized
        width={126}
      />
      <div className={styles.replyTo}>
        <i>
          <MobileIcon name={replyTo ? SUPPORT_REPLY_LOOK[replyTo.channel] : "chatbubble-ellipses"} size={16} />
        </i>
        <span>
          {replyTo ? (
            <b data-i18n={`support.replyTo.${replyTo.channel}`}>{uzt(`support.replyTo.${replyTo.channel}`)}</b>
          ) : null}
          {replyTo?.email ? (
            <em data-no-translate>{replyTo.email}</em>
          ) : null}
          <small>
            <MobileIcon name="time" size={12} />
            <span data-i18n="support.replyTime">{uzt("support.replyTime")}</span>
          </small>
        </span>
      </div>
    </section>
  );
}

/** 최소 글자에 모자라면 몇 자 더인지 (비어 있을 땐 재촉하지 않는다) */
function Need({ len, min }: { len: number; min: number }) {
  if (len === 0 || len >= min) return null;
  return (
    <small className={styles.need} data-i18n="support.minChars">
      {uzt("support.minChars", { n: min - len })}
    </small>
  );
}

function History({
  freshId,
  items,
  onRetry,
  state,
}: {
  freshId: string | null;
  items: SupportTicket[];
  onRetry: () => void;
  state: "loading" | "ready" | "failed";
}) {
  if (state === "loading") {
    return (
      <div aria-hidden="true" className={styles.skeletons}>
        {[0, 1].map((i) => (
          <i key={i} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>
    );
  }
  if (state === "failed" && !items.length) {
    return (
      <div className={styles.failed}>
        <MobileIcon name="cloud-offline" size={26} />
        <p data-i18n="support.loadFailed">{uzt("support.loadFailed")}</p>
        <button onClick={onRetry} type="button">
          <MobileIcon name="refresh" size={15} />
          <span data-i18n="common.retry">{uzt("common.retry")}</span>
        </button>
      </div>
    );
  }
  if (!items.length) {
    return (
      <div className={styles.empty}>
        <i>
          <MobileIcon name="chatbubbles" size={26} />
        </i>
        <strong data-i18n="support.empty">{uzt("support.empty")}</strong>
        <p data-i18n="support.emptyDesc">{uzt("support.emptyDesc")}</p>
      </div>
    );
  }
  return (
    <div className={styles.tickets}>
      {items.map((ticket, index) => (
        <TicketCard fresh={ticket.id === freshId} index={index} key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}

function TicketCard({ fresh, index, ticket }: { fresh: boolean; index: number; ticket: SupportTicket }) {
  const [open, setOpen] = useState(false);
  const cat = SUPPORT_CATEGORY_LOOK[ticket.category] ?? SUPPORT_CATEGORY_LOOK.other;
  const status = SUPPORT_STATUS_LOOK[ticket.status] ?? SUPPORT_STATUS_LOOK.open;
  const answered = ticket.status === "answered" && Boolean(ticket.reply);
  return (
    <article
      className={`${styles.ticket} ${fresh ? styles.fresh : ""} ${answered ? styles.answered : ""}`}
      style={{ "--c": cat.color, "--s": status.color, "--i": Math.min(index, 8) } as CSSProperties}
    >
      <button
        aria-expanded={open}
        className={styles.ticketMain}
        onClick={() => {
          window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
          setOpen((value) => !value);
        }}
        type="button"
      >
        <span className={styles.ticketTop}>
          <span className={styles.catChip}>
            <MobileIcon name={cat.icon} size={12} />
            <span data-i18n={`support.category.${ticket.category}`}>{uzt(`support.category.${ticket.category}`)}</span>
          </span>
          <span className={styles.status}>
            <MobileIcon name={status.icon} size={13} />
            <span data-i18n={`support.status.${ticket.status}`}>{uzt(`support.status.${ticket.status}`)}</span>
          </span>
        </span>
        <b className={styles.ticketSubject} data-no-translate>
          {ticket.subject}
        </b>
        <p className={`${styles.ticketMessage} ${open ? styles.ticketOpen : ""}`} data-no-translate>
          {ticket.message}
        </p>
        <span className={styles.ticketFoot}>
          <small data-no-translate>{supportDate(ticket.createdAt)}</small>
          <MobileIcon name={open ? "chevron-up" : "chevron-down"} size={16} />
        </span>
      </button>
      {answered ? (
        <div className={styles.reply}>
          <span className={styles.replyHead}>
            <i className={styles.teamAvatar} data-no-translate>
              K
            </i>
            <b data-i18n="support.team">{uzt("support.team")}</b>
            <small data-no-translate>{supportDate(ticket.repliedAt)}</small>
          </span>
          <p data-no-translate>{ticket.reply}</p>
        </div>
      ) : null}
    </article>
  );
}
