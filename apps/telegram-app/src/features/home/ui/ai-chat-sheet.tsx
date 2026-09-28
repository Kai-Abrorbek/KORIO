"use client";

import { useEffect, useRef, useState } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { getContentLang } from "../../../shared/i18n/content-language";
import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import styles from "./ai-chat-sheet.module.css";

/**
 * 한글몬 AI 대화 — 모바일 components/home/AIChatModal 과 같은 화면.
 * 대화 기록은 서버(/ai/chat)에 있고, 보낼 땐 설명 언어(lang)를 같이 보낸다
 * (번역·교정 설명이 그 언어로 온다).
 */
interface ChatCorrection {
  wrong: string;
  right: string;
  note?: string;
}

interface ChatMessage {
  id: string;
  who: "ai" | "user";
  text: string;
  translation?: string;
  correction?: ChatCorrection;
  createdAt?: string;
}

function timeOf(iso?: string) {
  const date = iso ? new Date(iso) : new Date();
  return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export function AiChatSheet({ onClose, visible }: { visible: boolean; onClose: () => void }) {
  const { request } = useTelegramAuth();
  const { speak } = useKoreanSpeech(request);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    setLoading(true);
    request<{ messages: ChatMessage[] }>("/ai/chat")
      .then((response) => setMessages(response.messages ?? []))
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, [request, visible]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [messages, typing]);

  const send = async () => {
    const content = draft.trim();
    if (!content || typing) return;
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
    setDraft("");
    // 낙관적 렌더 — 왕복을 기다리지 않고 바로 보여 준다
    setMessages((current) => [...current, { id: `u-${Date.now()}`, who: "user", text: content, createdAt: new Date().toISOString() }]);
    setTyping(true);
    try {
      const { reply } = await request<{ reply: ChatMessage | null }>("/ai/chat", {
        body: JSON.stringify({ text: content, lang: getContentLang() }),
        method: "POST",
      });
      if (reply) setMessages((current) => [...current, reply]);
    } catch {
      setMessages((current) => [
        ...current,
        { id: `err-${Date.now()}`, who: "ai", text: "Xabar yuborilmadi. Birozdan keyin qayta urinib ko'ring." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  if (!visible) return null;
  const canSend = draft.trim().length > 0;

  return (
    <div aria-modal="true" className={styles.screen} role="dialog">
      <header className={styles.header}>
        <button aria-label="Orqaga" onClick={onClose} type="button">
          <MobileIcon name="chevron-back" size={26} />
        </button>
        <div className={styles.headerCenter}>
          <span className={styles.avatarLarge}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src="/characters/hangulmon_thinking.png" />
            <i />
          </span>
          <span>
            <b data-no-translate>Haneulmon</b>
            <small><i />Onlayn · AI suhbat ustozi</small>
          </span>
        </div>
        <span aria-hidden="true" className={styles.headerSpacer} />
      </header>

      <div className={styles.list} ref={listRef}>
        {loading ? (
          <div className={styles.center}><i className={styles.spinner} /></div>
        ) : messages.length === 0 ? (
          <div className={styles.center}><p>{"Haneulmon bilan koreyscha suhbatlashing.\nIstalgan narsadan boshlang!"}</p></div>
        ) : (
          <div className={styles.dateBadge}><span>Bugun</span></div>
        )}

        {messages.map((message) =>
          message.who === "ai" ? (
            <div className={styles.aiRow} key={message.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className={styles.aiAvatar} src="/characters/hangulmon_default.png" />
              <div className={styles.aiContent}>
                <div className={styles.aiBubble}>
                  <div className={styles.aiBubbleTop}>
                    <p data-no-translate>{message.text}</p>
                    <button aria-label="Tinglash" onClick={() => speak(message.text)} type="button">
                      <MobileIcon name="volume-medium" size={15} />
                    </button>
                  </div>
                  {message.translation ? <p className={styles.translation} data-no-translate>{message.translation}</p> : null}
                </div>
                {message.correction ? (
                  <div className={styles.correction}>
                    <header><MobileIcon name="sparkles" size={13} /><b>Grammatika tuzatish</b></header>
                    <div data-no-translate>
                      <s>{message.correction.wrong}</s>
                      <MobileIcon name="arrow-forward" size={14} />
                      <strong>{message.correction.right}</strong>
                    </div>
                    {message.correction.note ? <p data-no-translate>{message.correction.note}</p> : null}
                  </div>
                ) : null}
                <small className={styles.timeLeft}>{timeOf(message.createdAt)}</small>
              </div>
            </div>
          ) : (
            <div className={styles.userRow} key={message.id}>
              <p className={styles.userBubble} data-no-translate>{message.text}</p>
              <small>{timeOf(message.createdAt)}</small>
            </div>
          ),
        )}

        {typing ? (
          <div className={styles.aiRow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className={styles.aiAvatar} src="/characters/hangulmon_default.png" />
            <div className={styles.typing}><i /><i /><i /></div>
          </div>
        ) : null}
      </div>

      <form
        className={styles.inputBar}
        onSubmit={(event) => {
          event.preventDefault();
          void send();
        }}
      >
        <div className={styles.inputWrap}>
          <textarea
            maxLength={500}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void send();
              }
            }}
            placeholder="Koreys tilida yozing..."
            rows={1}
            value={draft}
          />
        </div>
        <button aria-label="Yuborish" className={canSend ? styles.sendOn : styles.send} disabled={!canSend} type="submit">
          <MobileIcon name="arrow-up" size={20} />
        </button>
      </form>
    </div>
  );
}
