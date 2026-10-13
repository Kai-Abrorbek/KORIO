"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { uzt } from "../../../shared/i18n/uz-text";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { SwipePager } from "../../../shared/ui/swipe-pager";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { getGemHistory, getGemSummary } from "../api/misc";
import {
  GEM_HISTORY_TYPES,
  GEM_LOOK,
  GEM_LOOK_FALLBACK,
  dayKeyOf,
  describeGemTx,
  groupByDay,
  timeOf,
  type GemHistoryType,
  type GemSummary,
  type GemText,
  type GemTx,
} from "../model/gems";
import styles from "./gem-history-screen.module.css";

/**
 * 보석 내역 — 상점의 보석 카드 "내역" · 상단 보석 칩에서 들어온다. 모바일 GemHistoryScreen 과 같은 화면.
 *
 * - 위: 지금 잔액 + 이번 달 받은/쓴 보석
 * - 전체 / 받은 보석 / 쓴 보석 — 버튼이나 옆으로 밀어서 넘긴다 (탭마다 목록·스크롤이 따로)
 * - 날짜별로 묶고, 줄마다 어디서(아이콘·제목·설명)·언제·얼마
 * - 기록은 서버 장부(gem_transactions)가 생긴 뒤부터만 있다 — 끝에 그렇다고 말한다
 */
const fmt = (n: number) => Math.abs(n).toLocaleString("en-US");

/** 문구 한 조각 = 텍스트 노드 하나 (번역기가 통째로 맞춘다) */
function T({ className, text }: { className?: string; text: GemText }) {
  if (text.raw !== undefined) {
    return (
      <span className={className} data-no-translate>
        {text.raw}
      </span>
    );
  }
  return (
    <span className={className} data-i18n={text.key}>
      {uzt(text.key, text.vars)}
    </span>
  );
}

export function GemHistoryScreen() {
  const router = useRouter();
  const { request, updateUser } = useTelegramAuth();
  const rootRef = useRef<HTMLElement>(null);
  const [tab, setTab] = useState<GemHistoryType>("all");
  const [summary, setSummary] = useState<GemSummary | null>(null);

  useEffect(() => {
    let alive = true;
    getGemSummary(request)
      .then((next) => {
        if (!alive) return;
        setSummary(next);
        updateUser({ gems: next.balance });
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [request, updateUser]);

  const handleProgress = useCallback((progress: number, dragging: boolean) => {
    const root = rootRef.current;
    if (!root) return;
    root.style.setProperty("--tab-progress", String(progress));
    root.toggleAttribute("data-swiping", dragging);
  }, []);

  // 미는 동안 탭이 바뀌어도 목록은 다시 그리지 않는다
  const pages = useMemo(
    () => GEM_HISTORY_TYPES.map((type) => <HistoryList key={type} type={type} />),
    [],
  );

  return (
    <main className={styles.page} ref={rootRef}>
      <header className={styles.header}>
        <button
          aria-label={uzt("common.back")}
          onClick={() => (window.history.length > 1 ? router.back() : router.replace("/shop"))}
          type="button"
        >
          <MobileIcon name="chevron-back" size={26} />
        </button>
        <h1 data-i18n="gemHistory.title">{uzt("gemHistory.title")}</h1>
        <span aria-hidden="true" />
      </header>

      <SummaryCard summary={summary} />

      <div className={styles.tabs}>
        <i aria-hidden="true" className={styles.tabThumb} />
        {GEM_HISTORY_TYPES.map((type) => (
          <button
            className={type === tab ? styles.tabActive : ""}
            data-i18n={`gemHistory.tabs.${type}`}
            key={type}
            onClick={() => setTab(type)}
            type="button"
          >
            {uzt(`gemHistory.tabs.${type}`)}
          </button>
        ))}
      </div>

      <SwipePager
        index={GEM_HISTORY_TYPES.indexOf(tab)}
        onIndexChange={(next) => setTab(GEM_HISTORY_TYPES[next] ?? "all")}
        onProgress={handleProgress}
        pages={pages}
        paneClassName={styles.pane}
      />
    </main>
  );
}

function SummaryCard({ summary }: { summary: GemSummary | null }) {
  return (
    <section className={styles.summary}>
      <i aria-hidden="true" className={styles.summaryShine} />
      <div className={styles.summaryMain}>
        <small data-i18n="gemHistory.balance">{uzt("gemHistory.balance")}</small>
        <span>
          <MobileIcon name="diamond" size={24} />
          <b data-no-translate>{summary ? fmt(summary.balance) : "—"}</b>
        </span>
      </div>
      <div className={styles.summaryStats}>
        <span className={styles.statIn}>
          <i>
            <MobileIcon name="arrow-down" size={13} />
          </i>
          <span>
            <b data-no-translate>{summary ? `+${fmt(summary.monthIn)}` : "—"}</b>
            <small data-i18n="gemHistory.monthIn">{uzt("gemHistory.monthIn")}</small>
          </span>
        </span>
        <span className={styles.statOut}>
          <i>
            <MobileIcon name="arrow-up" size={13} />
          </i>
          <span>
            <b data-no-translate>{summary ? `−${fmt(summary.monthOut)}` : "—"}</b>
            <small data-i18n="gemHistory.monthOut">{uzt("gemHistory.monthOut")}</small>
          </span>
        </span>
      </div>
    </section>
  );
}

function HistoryList({ type }: { type: GemHistoryType }) {
  const { request } = useTelegramAuth();
  const [items, setItems] = useState<GemTx[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");
  const [more, setMore] = useState(false);

  const load = useCallback(
    async (before: string | null) => {
      if (before) setMore(true);
      else setState("loading");
      try {
        const page = await getGemHistory(request, type, before);
        setItems((current) => (before ? [...current, ...page.items] : page.items));
        setCursor(page.nextCursor);
        setState("ready");
      } catch {
        if (!before) setState("failed");
      } finally {
        setMore(false);
      }
    },
    [request, type],
  );

  useEffect(() => {
    void load(null);
  }, [load]);

  if (state === "loading") {
    return (
      <div className={styles.skeletons} aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>
    );
  }

  if (state === "failed") {
    return (
      <div className={styles.failed}>
        <MobileIcon name="cloud-offline-outline" size={30} />
        <p data-i18n="gemHistory.loadFailed">{uzt("gemHistory.loadFailed")}</p>
        <button onClick={() => void load(null)} type="button">
          <MobileIcon name="refresh" size={15} />
          <span data-i18n="common.retry">{uzt("common.retry")}</span>
        </button>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className={styles.empty}>
        <Image
          alt=""
          className={styles.emptyMascot}
          height={120}
          src="/characters/hangulmon_waiting_float.png"
          unoptimized
          width={120}
        />
        <strong data-i18n={`gemHistory.empty.${type}`}>{uzt(`gemHistory.empty.${type}`)}</strong>
        <p data-i18n="gemHistory.emptyDesc">{uzt("gemHistory.emptyDesc")}</p>
        <small data-i18n="gemHistory.sinceNote">{uzt("gemHistory.sinceNote")}</small>
      </div>
    );
  }

  const today = dayKeyOf(new Date().toISOString());
  const yesterday = dayKeyOf(new Date(Date.now() - 86_400_000).toISOString());
  let row = 0;

  return (
    <div className={styles.list}>
      {groupByDay(items).map((group) => (
        <section className={styles.day} key={group.day}>
          <h3>
            {group.day === today ? (
              <T text={{ key: "gemHistory.today" }} />
            ) : group.day === yesterday ? (
              <T text={{ key: "gemHistory.yesterday" }} />
            ) : (
              <span data-no-translate>{group.day}</span>
            )}
          </h3>
          <div className={styles.dayCard}>
            {group.items.map((item) => (
              <HistoryRow index={row++} item={item} key={item.id} />
            ))}
          </div>
        </section>
      ))}

      {cursor ? (
        <button className={styles.more} disabled={more} onClick={() => void load(cursor)} type="button">
          {more ? <i className={styles.spinner} /> : <span data-i18n="gemHistory.loadMore">{uzt("gemHistory.loadMore")}</span>}
        </button>
      ) : (
        <p className={styles.since} data-i18n="gemHistory.sinceNote">
          {uzt("gemHistory.sinceNote")}
        </p>
      )}
    </div>
  );
}

function HistoryRow({ index, item }: { index: number; item: GemTx }) {
  const look = GEM_LOOK[item.source] ?? GEM_LOOK_FALLBACK;
  const { title, details } = describeGemTx(item);
  const plus = item.amount > 0;
  return (
    <div
      className={styles.row}
      style={{ "--c": look.color, "--i": Math.min(index, 10) } as CSSProperties}
    >
      <i className={styles.rowIcon}>
        <MobileIcon name={look.icon} size={18} />
      </i>
      <span className={styles.rowText}>
        <T className={styles.rowTitle} text={title} />
        <span className={styles.rowMeta}>
          {details.map((detail, i) => (
            <T key={i} text={detail} />
          ))}
          <span data-no-translate>{timeOf(item.createdAt)}</span>
        </span>
      </span>
      <b className={plus ? styles.amountIn : styles.amountOut} data-no-translate>
        {plus ? "+" : "−"}
        {fmt(item.amount)}
        <MobileIcon name="diamond" size={13} />
      </b>
    </div>
  );
}
