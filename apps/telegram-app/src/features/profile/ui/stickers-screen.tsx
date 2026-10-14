"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { ApiError } from "../../../shared/api/client";
import { uzt } from "../../../shared/i18n/uz-text";
import { safeBack, useTelegramBackOverride } from "../../../shared/telegram/back-button";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { GeneratedAvatar } from "../../league/ui/generated-avatar";
import {
  getStickerPreview,
  getStickers,
  makeStickers,
  type StickerPreview,
  type StickersState,
} from "../api/stickers";
import styles from "./stickers-screen.module.css";

/**
 * 내 캐릭터 텔레그램 스티커팩 — 모바일 app/stickers.tsx 와 같은 화면.
 *
 * 서버가 지금 캐릭터로 8장을 그려(미리보기) 보여주고, 사면 봇이 텔레그램 세트를 만든다.
 * 봇을 시작한 적 없는 사람은 봇 링크(START)로 넘어가서 거기서 이어서 만든다 — 그동안
 * 이 화면은 서버를 몇 초마다 다시 물어서, 다 되면 바로 완성 화면을 띄운다.
 */
const fmt = (n: number) => n.toLocaleString("en-US");
const FAN = [0, 5, 1] as const; // ㅋㅋㅋ · 사랑해 · 대박
const MAKING_STEPS = ["stickers.making.draw", "stickers.making.write", "stickers.making.send"] as const;
const POLL_MS = 2500;
const POLL_FOR_MS = 3 * 60_000;

type Phase = "idle" | "making" | "link" | "done";

function haptic(kind: "success" | "error" | "light") {
  const feedback = window.Telegram?.WebApp.HapticFeedback;
  if (kind === "light") feedback?.impactOccurred("light");
  else feedback?.notificationOccurred(kind);
}

/** t.me 링크는 텔레그램 안에서 (스티커 추가 창 · 봇 채팅) */
function openTelegram(url: string) {
  const webApp = window.Telegram?.WebApp;
  try {
    if (webApp?.initData && webApp.openTelegramLink) {
      webApp.openTelegramLink(url);
      return;
    }
  } catch {
    // 아래로
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

function errorKey(reason: unknown) {
  const code = reason instanceof ApiError ? reason.code : "";
  if (code === "STICKERS_BUSY") return "stickers.errors.busy";
  if (code === "NOT_ENOUGH_GEMS") return "stickers.errors.notEnough";
  if (code === "STICKERS_UNAVAILABLE") return "stickers.cta.unavailable";
  return "stickers.errors.failed";
}

export function StickersScreen() {
  const router = useRouter();
  const { request, updateUser, user } = useTelegramAuth();
  const [state, setState] = useState<StickersState | null>(null);
  const [stateStatus, setStateStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [preview, setPreview] = useState<StickerPreview | null>(null);
  const [previewStatus, setPreviewStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [phase, setPhase] = useState<Phase>("idle");
  const [link, setLink] = useState<string | null>(null);
  const [doneKind, setDoneKind] = useState<"new" | "refresh">("new");
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [poked, setPoked] = useState<{ index: number; at: number } | null>(null);
  const packBefore = useRef<string | null>(null);

  const load = useCallback(async () => {
    try {
      const next = await getStickers(request);
      setState(next);
      setStateStatus("ready");
      updateUser({ gems: next.gems });
      return next;
    } catch {
      setStateStatus((current) => (current === "ready" ? current : "failed"));
      return null;
    }
  }, [request, updateUser]);

  const loadPreview = useCallback(async () => {
    setPreviewStatus("loading");
    try {
      setPreview(await getStickerPreview(request));
      setPreviewStatus("ready");
    } catch {
      setPreviewStatus("failed");
    }
  }, [request]);

  useEffect(() => {
    void load();
    void loadPreview();
  }, [load, loadPreview]);

  // 만드는 동안 단계 글자를 돌린다
  useEffect(() => {
    if (phase !== "making") return;
    setStep(0);
    const timer = window.setInterval(() => setStep((current) => Math.min(current + 1, MAKING_STEPS.length - 1)), 1400);
    return () => window.clearInterval(timer);
  }, [phase]);

  // 봇으로 넘어간 뒤 — 몇 초마다 다시 묻고, 다 되면 완성 화면
  useEffect(() => {
    if (phase !== "link") return;
    const started = Date.now();
    let stopped = false;
    const check = async () => {
      if (stopped) return;
      const next = await load();
      const pack = next?.pack;
      if (pack && pack.updatedAt !== packBefore.current && !pack.outdated) {
        stopped = true;
        haptic("success");
        setPhase("done");
      }
    };
    const timer = window.setInterval(() => {
      if (Date.now() - started > POLL_FOR_MS) window.clearInterval(timer);
      else void check();
    }, POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") void check();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      stopped = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [load, phase]);

  const closeSheet = useCallback(() => setPhase("idle"), []);
  useTelegramBackOverride(phase === "link" || phase === "done" ? closeSheet : phase === "making" ? () => undefined : null);

  const pack = state?.pack ?? null;
  const refreshing = Boolean(pack?.outdated);
  const cost = refreshing ? (state?.refreshPrice ?? 0) : (state?.price ?? 0);
  const gems = state?.gems ?? user?.gems ?? 0;
  const short = Math.max(0, cost - gems);
  const upToDate = Boolean(pack && !pack.outdated);
  /** 지금 무료 (어드민 가격 0) — 가격 알약 대신 "무료", 보석 안내 숨김 */
  const free = Boolean(state) && cost <= 0;

  const make = async () => {
    if (!state?.enabled || phase === "making" || short > 0) return;
    haptic("light");
    setError(null);
    packBefore.current = pack?.updatedAt ?? null;
    setDoneKind(pack ? "refresh" : "new");
    setPhase("making");
    try {
      const result = await makeStickers(request);
      if (result.status === "link") {
        setLink(result.link);
        setPhase("link");
        return;
      }
      setState((current) => (current ? { ...current, busy: false, gems: result.gems, pack: result.pack } : current));
      updateUser({ gems: result.gems });
      haptic("success");
      setPhase("done");
    } catch (reason) {
      haptic("error");
      setError(errorKey(reason));
      setPhase("idle");
      void load();
    }
  };

  const fan = preview ? FAN.map((index) => preview.stickers[index]?.image).filter(Boolean) : [];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <button aria-label={uzt("common.back")} onClick={() => safeBack(router, "/profile")} type="button">
          <MobileIcon name="chevron-back" size={26} />
        </button>
        <h1 data-i18n="stickers.title">{uzt("stickers.title")}</h1>
        <span className={styles.gemChip} data-no-translate>
          <MobileIcon name="diamond" size={15} />
          {fmt(gems)}
        </span>
      </header>

      <div className={styles.scroll}>
        <section className={styles.hero}>
          <i aria-hidden="true" className={styles.heroGlow} />
          {["10% 16%", "88% 12%", "93% 46%", "6% 44%", "30% 5%"].map((spot, index) => (
            <i aria-hidden="true" className={styles.heroSpark} key={spot} style={{ "--spot-x": spot.split(" ")[0], "--spot-y": spot.split(" ")[1], "--d": `${index * 0.45}s` } as CSSProperties} />
          ))}
          <div className={styles.fan}>
            {fan.length === 3 ? (
              fan.map((src, index) => (
                <img alt="" className={styles.fanCard} key={index} src={src} style={{ "--i": index } as CSSProperties} />
              ))
            ) : (
              <span className={styles.fanPlaceholder}>
                <GeneratedAvatar avatar={user?.avatar} variant="full" />
              </span>
            )}
            <span className={styles.tgBadge}>
              <MobileIcon name="paper-plane" size={16} />
            </span>
          </div>
          <h2 data-i18n="stickers.heroTitle">{uzt("stickers.heroTitle")}</h2>
          <p data-i18n="stickers.heroBody">{uzt("stickers.heroBody")}</p>
        </section>

        {pack ? (
          <section className={`${styles.status} ${refreshing ? styles.statusOutdated : ""}`}>
            <span className={styles.statusIcon}>
              <MobileIcon name={refreshing ? "refresh" : "checkmark-circle"} size={22} />
            </span>
            <span className={styles.statusText}>
              <b data-i18n={refreshing ? "stickers.status.outdated" : "stickers.status.ready"}>
                {uzt(refreshing ? "stickers.status.outdated" : "stickers.status.ready")}
              </b>
              <small data-i18n="stickers.status.count">{uzt("stickers.status.count", { n: pack.count })}</small>
            </span>
            {refreshing ? (
              <button className={styles.statusLink} onClick={() => openTelegram(pack.url)} type="button">
                <span data-i18n="stickers.cta.addCurrent">{uzt("stickers.cta.addCurrent")}</span>
              </button>
            ) : null}
          </section>
        ) : null}

        <div className={styles.sectionHead}>
          <h3 data-i18n="stickers.previewTitle">{uzt("stickers.previewTitle")}</h3>
          <small data-i18n="stickers.previewNote">{uzt("stickers.previewNote")}</small>
        </div>

        {previewStatus === "failed" ? (
          <div className={styles.failed}>
            <MobileIcon name="cloud-offline-outline" size={26} />
            <p data-i18n="stickers.previewFailed">{uzt("stickers.previewFailed")}</p>
            <button onClick={() => void loadPreview()} type="button">
              <MobileIcon name="refresh" size={15} />
              <span data-i18n="stickers.retry">{uzt("stickers.retry")}</span>
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {(preview?.stickers ?? Array.from({ length: 8 }, () => null)).map((sticker, index) => (
              <button
                aria-label={sticker?.text ?? ""}
                className={`${styles.tile} ${sticker ? "" : styles.tileLoading}`}
                data-no-translate
                key={`${sticker?.id ?? "s"}-${index}-${poked?.index === index ? poked.at : 0}`}
                onClick={() => {
                  if (!sticker) return;
                  haptic("light");
                  setPoked({ index, at: Date.now() });
                }}
                style={{ "--i": index } as CSSProperties}
                type="button"
              >
                {sticker ? <img alt="" className={poked?.index === index ? styles.poke : ""} src={sticker.image} /> : <i />}
              </button>
            ))}
          </div>
        )}

        <ul className={styles.perks}>
          {(
            [
              ["mine", "happy-outline", "#FF8A3D"],
              ["korean", "chatbubbles", "#776EE2"],
              ["update", "refresh", "#1CB0F6"],
            ] as const
          ).map(([key, icon, color]) => (
            <li key={key} style={{ "--perk": color } as CSSProperties}>
              <span className={styles.perkIcon}>
                <MobileIcon name={icon} size={20} />
              </span>
              <span>
                <b data-i18n={`stickers.perks.${key}.title`}>{uzt(`stickers.perks.${key}.title`)}</b>
                {key === "update" && state && state.refreshPrice <= 0 ? (
                  <small data-i18n="stickers.perks.update.descFree">{uzt("stickers.perks.update.descFree")}</small>
                ) : (
                  <small data-i18n={`stickers.perks.${key}.desc`}>
                    {uzt(`stickers.perks.${key}.desc`, { price: fmt(state?.refreshPrice ?? 0) })}
                  </small>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <footer className={styles.bottom}>
        {error ? (
          <p className={styles.error} data-i18n={error}>
            {uzt(error, { n: fmt(short) })}
          </p>
        ) : null}
        {stateStatus === "failed" && !state ? (
          <button className={styles.cta} onClick={() => void load()} type="button">
            <MobileIcon name="refresh" size={18} />
            <span data-i18n="stickers.retry">{uzt("stickers.retry")}</span>
          </button>
        ) : !state ? (
          <button className={`${styles.cta} ${styles.ctaLoading}`} disabled type="button">
            <i className={styles.spinner} />
          </button>
        ) : !state.enabled ? (
          <button className={styles.cta} disabled type="button">
            <span data-i18n="stickers.cta.unavailable">{uzt("stickers.cta.unavailable")}</span>
          </button>
        ) : phase === "making" ? (
          <button className={`${styles.cta} ${styles.ctaMaking}`} disabled type="button">
            <i className={styles.progress} />
            <i className={styles.spinner} />
            <span data-i18n={MAKING_STEPS[step] ?? MAKING_STEPS[0]}>{uzt(MAKING_STEPS[step] ?? MAKING_STEPS[0])}</span>
          </button>
        ) : upToDate && pack ? (
          <button className={`${styles.cta} ${styles.ctaTelegram}`} onClick={() => openTelegram(pack.url)} type="button">
            <i className={styles.shine} />
            <MobileIcon name="paper-plane" size={19} />
            <span data-i18n="stickers.cta.add">{uzt("stickers.cta.add")}</span>
          </button>
        ) : short > 0 ? (
          <>
            <button className={styles.cta} disabled type="button">
              <MobileIcon name="diamond" size={17} />
              <span data-i18n="stickers.cta.need">{uzt("stickers.cta.need", { n: fmt(short) })}</span>
            </button>
            <p className={styles.hint} data-i18n="stickers.cta.earnHint">
              {uzt("stickers.cta.earnHint")}
            </p>
          </>
        ) : (
          <>
            <button className={`${styles.cta} ${styles.ctaBuy}`} onClick={() => void make()} type="button">
              <i className={styles.shine} />
              <span data-i18n={refreshing ? "stickers.cta.update" : "stickers.cta.make"}>
                {uzt(refreshing ? "stickers.cta.update" : "stickers.cta.make")}
              </span>
              {free ? (
                <span className={`${styles.price} ${styles.priceFree}`}>
                  <MobileIcon name="sparkles" size={14} />
                  <span data-i18n="stickers.cta.freeTag">{uzt("stickers.cta.freeTag")}</span>
                </span>
              ) : (
                <span className={styles.price} data-no-translate>
                  <MobileIcon name="diamond" size={14} />
                  {fmt(cost)}
                </span>
              )}
            </button>
            {free ? (
              <p className={styles.hint} data-i18n="stickers.cta.freeHint">
                {uzt("stickers.cta.freeHint")}
              </p>
            ) : (
              <p className={styles.hint} data-i18n="stickers.cta.balance">
                {uzt("stickers.cta.balance", { n: fmt(gems) })}
              </p>
            )}
          </>
        )}
      </footer>

      {phase === "link" && link ? (
        <LinkSheet cost={cost} link={link} onClose={closeSheet} waiting={Boolean(state?.busy)} />
      ) : null}
      {phase === "done" && pack ? (
        <DoneModal kind={doneKind} onAdd={() => openTelegram(pack.url)} onClose={closeSheet} stickers={fan} />
      ) : null}
    </main>
  );
}

/** 봇을 시작해야 할 때 — 세 걸음 안내 + 봇 열기. 그동안 위에서 서버를 다시 묻는다 */
function LinkSheet({ cost, link, onClose, waiting }: { cost: number; link: string; onClose: () => void; waiting: boolean }) {
  const [opened, setOpened] = useState(false);
  return (
    <div aria-modal="true" className={styles.sheetRoot} role="dialog">
      <button aria-label={uzt("stickers.link.close")} className={styles.backdrop} onClick={onClose} type="button" />
      <section className={styles.sheet}>
        <i className={styles.grabber} />
        <span className={styles.sheetIcon}>
          <MobileIcon name="paper-plane" size={30} />
        </span>
        <h2 data-i18n="stickers.link.title">{uzt("stickers.link.title")}</h2>
        <p data-i18n="stickers.link.body">{uzt("stickers.link.body")}</p>
        <ol className={styles.steps}>
          {(["step1", "step2", "step3"] as const).map((key, index) => (
            <li className={opened && index === 0 ? styles.stepDone : ""} key={key}>
              <b data-no-translate>{opened && index === 0 ? "✓" : index + 1}</b>
              <span data-i18n={`stickers.link.${key}`}>{uzt(`stickers.link.${key}`)}</span>
            </li>
          ))}
        </ol>
        {cost > 0 ? (
          <p className={styles.charge} data-i18n="stickers.link.charge">
            {uzt("stickers.link.charge", { n: fmt(cost) })}
          </p>
        ) : null}
        {opened ? (
          <p className={styles.waiting}>
            <i className={styles.dots}>
              <b />
              <b />
              <b />
            </i>
            <span data-i18n={waiting ? "stickers.making.draw" : "stickers.link.waiting"}>
              {uzt(waiting ? "stickers.making.draw" : "stickers.link.waiting")}
            </span>
          </p>
        ) : null}
        <button
          className={`${styles.cta} ${styles.ctaTelegram}`}
          onClick={() => {
            setOpened(true);
            haptic("light");
            openTelegram(link);
          }}
          type="button"
        >
          <i className={styles.shine} />
          <MobileIcon name="paper-plane" size={19} />
          <span data-i18n="stickers.link.open">{uzt("stickers.link.open")}</span>
        </button>
        <button className={styles.later} onClick={onClose} type="button">
          <span data-i18n="stickers.link.close">{uzt("stickers.link.close")}</span>
        </button>
      </section>
    </div>
  );
}

/** 완성 — 빛이 터지고 스티커 세 장이 튀어나온다 */
function DoneModal({
  kind,
  onAdd,
  onClose,
  stickers,
}: {
  kind: "new" | "refresh";
  onAdd: () => void;
  onClose: () => void;
  stickers: (string | undefined)[];
}) {
  return (
    <div aria-modal="true" className={`${styles.sheetRoot} ${styles.center}`} role="dialog">
      <button aria-label={uzt("stickers.done.later")} className={styles.backdrop} onClick={onClose} type="button" />
      <section className={styles.done}>
        <span aria-hidden="true" className={styles.burst}>
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} style={{ "--a": `${i * 30}deg`, "--i": i } as CSSProperties} />
          ))}
        </span>
        <div className={styles.doneFan}>
          {stickers.map((src, index) => (src ? <img alt="" key={index} src={src} style={{ "--i": index } as CSSProperties} /> : null))}
        </div>
        <h2 data-i18n={kind === "new" ? "stickers.done.title" : "stickers.done.updated"}>
          {uzt(kind === "new" ? "stickers.done.title" : "stickers.done.updated")}
        </h2>
        <p data-i18n="stickers.done.body">{uzt("stickers.done.body")}</p>
        <button
          className={`${styles.cta} ${styles.ctaTelegram}`}
          onClick={() => {
            haptic("light");
            onAdd();
          }}
          type="button"
        >
          <i className={styles.shine} />
          <MobileIcon name="paper-plane" size={19} />
          <span data-i18n="stickers.cta.add">{uzt("stickers.cta.add")}</span>
        </button>
        <button className={styles.later} onClick={onClose} type="button">
          <span data-i18n="stickers.done.later">{uzt("stickers.done.later")}</span>
        </button>
      </section>
    </div>
  );
}
