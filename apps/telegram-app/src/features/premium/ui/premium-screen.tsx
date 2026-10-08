"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useAppLanguage } from "../../../shared/i18n/language-context";
import { uzt } from "../../../shared/i18n/uz-text";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useSwipeToClose } from "../../../shared/ui/use-swipe-to-close";
import { useTelegramBackOverride } from "../../../shared/telegram/back-button";
import { fetchCardConfig, fetchCardOrder } from "../api/card";
import {
  createStarsInvoice,
  fetchMySubscription,
  fetchStarsCatalog,
} from "../api/stars";
import {
  formatSom,
  type CardConfig,
  type CardOrder,
  type CardProduct,
} from "../model/card";
import {
  MAX_FEATURES,
  PLAN_KEY,
  SUPER_FEATURES,
  TIERS,
  formatStars,
  type InvoiceStatus,
  type MySubscription,
  type StarsCatalog,
  type StarsProduct,
  type SubscriptionTier,
} from "../model/premium";
import { CardPayFlow } from "./card-pay-flow";
import styles from "./premium-screen.module.css";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString();
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const haptic = (style: "light" | "medium") =>
  window.Telegram?.WebApp.HapticFeedback?.impactOccurred(style);

function PremiumTabs() {
  const router = useRouter();
  return (
    <nav aria-label="Asosiy navigatsiya" className={styles.bottomNav}>
      <button onClick={() => router.push("/home")} type="button">
        <MobileIcon name="home" size={23} />
        <span>Asosiy</span>
      </button>
      <button onClick={() => router.push("/stats")} type="button">
        <MobileIcon name="bar-chart" size={23} />
        <span>Statistika</span>
      </button>
      <button onClick={() => router.push("/league")} type="button">
        <MobileIcon name="trophy" size={23} />
        <span>Liga</span>
      </button>
      <button aria-current="page" className={styles.navActive} type="button">
        <MobileIcon name="ribbon" size={23} />
        <span>Premium</span>
      </button>
    </nav>
  );
}

function LoadingView() {
  return (
    <main className={styles.premiumPage}>
      <div className={styles.loading}>
        <i />
      </div>
      <PremiumTabs />
    </main>
  );
}

/** 진행 중인 카드 입금 주문 — 누르면 입금/심사 화면을 다시 연다 */
function CardOrderBanner({ onOpen, order }: { onOpen: () => void; order: CardOrder }) {
  const review = order.status === "submitted";
  const key = review ? "cardPay.pendingBanner" : "cardPay.awaitingBanner";
  return (
    <button
      className={`${styles.orderBanner} ${review ? styles.orderBannerReview : ""}`}
      onClick={onOpen}
      type="button"
    >
      <span className={styles.orderBannerIcon}>
        <MobileIcon name={review ? "time-outline" : "card"} size={18} />
      </span>
      <span className={styles.orderBannerText} data-i18n={key}>
        {uzt(key, { amount: formatSom(order.amount) })}
      </span>
      <b data-i18n="cardPay.open">{uzt("cardPay.open")}</b>
    </button>
  );
}

/** 결제 수단이 텔레그램 Stars·보석처럼 한 번 사는 기간권인지 */
const isOneTime = (subscription: MySubscription) =>
  !subscription.isTrial && !subscription.autoRenew && subscription.provider !== "google_play";

function ActiveView({
  cardOrder,
  onBrowse,
  onResumeCard,
  subscription,
}: {
  cardOrder: CardOrder | null;
  onBrowse: (tier?: SubscriptionTier) => void;
  onResumeCard: () => void;
  subscription: MySubscription;
}) {
  const canUpgrade = subscription.canUpgradeTo.length > 0;
  const features =
    subscription.tier === "max"
      ? [...MAX_FEATURES, ...SUPER_FEATURES]
      : [...SUPER_FEATURES];
  const oneTime = isOneTime(subscription);

  return (
    <main className={styles.premiumPage}>
      <div className={styles.scroll + " " + styles.activeWrap}>
        <div className={styles.gradient + " " + styles.activeBadge}>
          <MobileIcon name="star" size={40} />
        </div>
        <h1 data-i18n={subscription.tier === "max" ? "premiumStars.activeTitleMax" : "premium.activeTitle"}>
          {subscription.tier === "max"
            ? uzt("premiumStars.activeTitleMax")
            : uzt("premium.activeTitle")}
        </h1>
        <p className={styles.activeSub}>
          {subscription.isTrial
            ? "Bepul sinovga " +
              (subscription.trialDaysLeft ?? 0) +
              " kun qoldi"
            : "Barcha imtiyozlardan foydalanyapsiz"}
        </p>

        <section className={styles.activeCard}>
          {features.map((feature) => (
            <div className={styles.activeFeature} key={feature.label}>
              <MobileIcon name={feature.icon} size={20} />
              <strong>{feature.label}</strong>
            </div>
          ))}
        </section>

        {canUpgrade ? (
          <button
            className={styles.upgradeBox}
            onClick={() => onBrowse("max")}
            type="button"
          >
            <MobileIcon name="sparkles" size={18} />
            <strong>Har kuni AI ustoz bilan koreyscha gaplashing</strong>
            <MobileIcon name="chevron-forward" size={16} />
          </button>
        ) : null}

        {cardOrder ? (
          <div className={styles.activeBanner}>
            <CardOrderBanner onOpen={onResumeCard} order={cardOrder} />
          </div>
        ) : null}

        {oneTime ? (
          <button
            className={styles.extendBtn}
            onClick={() => onBrowse(subscription.tier)}
            type="button"
          >
            <MobileIcon name="add-circle" size={18} />
            <strong data-i18n="premiumStars.extend">{uzt("premiumStars.extend")}</strong>
          </button>
        ) : null}

        {subscription.isTrial ? (
          <button className={styles.browsePlans} onClick={() => onBrowse()} type="button">
            <strong>Barcha tariflarni ko&apos;rish</strong>
            <MobileIcon name="chevron-forward" size={15} />
          </button>
        ) : null}

        {subscription.isTrial && canUpgrade ? (
          <p className={styles.trialBuyNote}>{`Sinov muddatidan ${subscription.trialDaysLeft ?? 0} kun qoldi. Hozir sotib olsangiz, darhol to'lov olinadi va sinov tugaydi.`}</p>
        ) : null}

        {subscription.expiresAt ? (
          <p className={styles.expiresNote}>
            {subscription.autoRenew
              ? `${formatDate(subscription.expiresAt)} da avtomatik yangilanadi`
              : `${formatDate(subscription.expiresAt)} gacha amal qiladi`}
          </p>
        ) : null}
        {subscription.provider === "google_play" ? (
          <p className={styles.manageNote}>
            Obunani bekor qilish va to&apos;lov usulini o&apos;zgartirish Google
            Play obunalar bo&apos;limida amalga oshiriladi.
          </p>
        ) : oneTime ? (
          <p className={styles.manageNote} data-i18n="premiumStars.manageOneTime">
            {uzt("premiumStars.manageOneTime")}
          </p>
        ) : null}
      </div>
      <PremiumTabs />
    </main>
  );
}

function FeatureList({ tier }: { tier: SubscriptionTier }) {
  return (
    <section className={styles.features}>
      {tier === "max" ? (
        <>
          {MAX_FEATURES.map((feature) => (
            <div className={styles.featureRow} key={feature.label}>
              <span className={styles.featureIcon + " " + styles.featureIconMax}>
                <MobileIcon name={feature.icon} size={22} />
              </span>
              <span className={styles.featureCopy}>
                <span className={styles.featureTitleRow}>
                  <strong>{feature.label}</strong>
                  <small>Faqat MAX</small>
                </span>
                <span>{feature.description}</span>
              </span>
            </div>
          ))}
          <div className={styles.includesRow}>
            <MobileIcon name="checkmark-circle" size={18} />
            <strong>SUPER ning barcha imkoniyatlari</strong>
          </div>
        </>
      ) : (
        SUPER_FEATURES.map((feature) => (
          <div className={styles.featureRow} key={feature.label}>
            <span className={styles.featureIcon}>
              <MobileIcon name={feature.icon} size={22} />
            </span>
            <span className={styles.featureCopy}>
              <strong>{feature.label}</strong>
              <span>{feature.description}</span>
            </span>
          </div>
        ))
      )}
    </section>
  );
}

/** 앱 PlanCard 와 같은 모양 — 가격만 Stars */
function PlanCard({
  card,
  onSelect,
  plan,
  selected,
}: {
  /** 있으면 카드 입금(so'm) 가격으로 보여준다 */
  card?: CardProduct | null;
  onSelect: () => void;
  plan: StarsProduct;
  selected: boolean;
}) {
  const save = card ? card.savePercent : plan.savePercent;
  const planKey = `premium.plans.${PLAN_KEY[plan.months] ?? "monthly"}`;
  return (
    <div className={plan.best ? styles.bestWrap : undefined}>
      {plan.best ? (
        <span className={styles.bestTag}>
          <MobileIcon name="flash" size={11} />
          <span data-i18n="premium.bestValue">{uzt("premium.bestValue")}</span>
        </span>
      ) : null}
      <button
        aria-pressed={selected}
        className={[
          styles.planCard,
          selected ? styles.planCardSel : "",
          plan.best && !selected ? styles.planCardBest : "",
        ].join(" ")}
        onClick={onSelect}
        type="button"
      >
        <span className={styles.planLeft}>
          <span className={styles.radio + (selected ? " " + styles.radioSel : "")}>
            {selected ? <MobileIcon name="checkmark" size={14} /> : null}
          </span>
          <span className={styles.planNames}>
            <strong data-i18n={planKey}>{uzt(planKey)}</strong>
            {plan.months > 1 ? (
              card ? (
                <small>
                  <span data-i18n="premium.totalPrice">
                    {uzt("premium.totalPrice", { price: formatSom(card.priceUzs) })}
                  </span>{" "}
                  <span data-i18n="cardPay.som">{uzt("cardPay.som")}</span>
                </small>
              ) : (
                <small data-i18n="premium.totalPrice">
                  {uzt("premium.totalPrice", { price: `⭐ ${formatStars(plan.stars)}` })}
                </small>
              )
            ) : null}
          </span>
        </span>
        <span className={styles.planRight}>
          {save > 0 ? (
            <em className={styles.saveTag} data-no-translate>
              −{save}%
            </em>
          ) : null}
          {card ? (
            <>
              <b className={styles.planPrice} data-no-translate>
                {formatSom(card.perMonthUzs)}
              </b>
              <small className={styles.planPer} data-i18n="cardPay.perMonth">
                {uzt("cardPay.perMonth")}
              </small>
            </>
          ) : (
            <>
              <b className={styles.planPrice} data-no-translate>
                ⭐ {formatStars(plan.perMonthStars)}
              </b>
              <small className={styles.planPer}>
                /<span data-i18n="premium.perMonthLabel">{uzt("premium.perMonthLabel")}</span>
              </small>
            </>
          )}
        </span>
      </button>
    </div>
  );
}

/** 바닥에 붙는 시트 — 배경 페이드 하나뿐 (슬라이드·스프링·팝 금지), 끌어내리면 닫힌다 */
function BottomSheet({
  children,
  label,
  onClose,
}: {
  children: ReactNode;
  label: string;
  onClose: () => void;
}) {
  const sheetRef = useRef<HTMLElement>(null);
  useSwipeToClose(sheetRef, onClose);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={styles.sheetBackdrop} onClick={onClose} role="presentation">
      <section
        aria-label={label}
        aria-modal="true"
        className={styles.sheet}
        onClick={(event) => event.stopPropagation()}
        ref={sheetRef}
        role="dialog"
      >
        <div className={styles.grabber} aria-hidden="true" />
        {children}
      </section>
    </div>
  );
}

/** Stars 가 없을 때 — 어디서 사는지 */
function StarsHelpSheet({ onClose }: { onClose: () => void }) {
  return (
    <BottomSheet label="Telegram Stars" onClose={onClose}>
      <div className={styles.helpStar} aria-hidden="true">
        ⭐
      </div>
      <h2 className={styles.sheetTitle} data-i18n="premiumStars.howTitle">
        {uzt("premiumStars.howTitle")}
      </h2>
      <ol className={styles.helpSteps}>
        {(["howStep1", "howStep2", "howStep3"] as const).map((key, index) => (
          <li key={key}>
            <span className={styles.helpNum}>{index + 1}</span>
            <span data-i18n={`premiumStars.${key}`}>{uzt(`premiumStars.${key}`)}</span>
          </li>
        ))}
      </ol>
      <p className={styles.helpNote} data-i18n="premiumStars.howNote">
        {uzt("premiumStars.howNote")}
      </p>
      <button className={styles.sheetCta} onClick={onClose} type="button">
        <span data-i18n="premiumStars.gotIt">{uzt("premiumStars.gotIt")}</span>
      </button>
    </BottomSheet>
  );
}

/** 결제 완료 */
function PaidSheet({
  onClose,
  subscription,
  tier,
}: {
  onClose: () => void;
  subscription: MySubscription | null;
  tier: SubscriptionTier;
}) {
  const until = subscription?.expiresAt ? formatDate(subscription.expiresAt) : "";
  return (
    <BottomSheet label="KORIO" onClose={onClose}>
      <div className={styles.paidHero}>
        <i className={styles.paidGlow} aria-hidden="true" />
        <Image
          alt="Haneulmon"
          className={styles.paidMascot}
          height={104}
          src="/characters/hangulmon_celebrating.png"
          unoptimized
          width={104}
        />
      </div>
      <h2 className={styles.sheetTitle} data-i18n="premiumStars.successTitle">
        {uzt("premiumStars.successTitle", { tier: tier.toUpperCase() })}
      </h2>
      <p className={styles.sheetSub} data-i18n={until ? "premiumStars.successSub" : "premiumStars.slow"}>
        {until
          ? uzt("premiumStars.successSub", { date: until })
          : uzt("premiumStars.slow")}
      </p>
      <button className={styles.sheetCta} onClick={onClose} type="button">
        <span data-i18n="premiumStars.continue">{uzt("premiumStars.continue")}</span>
      </button>
    </BottomSheet>
  );
}

type PayPhase = "idle" | "opening" | "checking";
type Notice = "failed" | "unavailable" | null;

/** 결제 뒤 구독이 실제로 바뀌었는지 (만료일이 늘었거나 등급이 바뀌었거나) */
function changedSince(before: MySubscription | null, after: MySubscription | null) {
  if (!after?.isPremium || after.isTrial) return false;
  if (!before?.isPremium || before.isTrial) return true;
  return after.expiresAt !== before.expiresAt || after.tier !== before.tier;
}

type PayMethod = "stars" | "card";
const METHOD_KEY = "korio-pay-method";

function OfferView({
  cardConfig,
  catalog,
  catalogFailed,
  initialTier = "max",
  onBack,
  onOpenCard,
  onPaid,
  onResumeCard,
  onRetryCatalog,
  subscription,
}: {
  /** Humo·Uzcard 카드 입금 — 끄기 스위치가 꺼져 있으면 enabled=false */
  cardConfig: CardConfig | null;
  catalog: StarsCatalog | null;
  catalogFailed: boolean;
  initialTier?: SubscriptionTier;
  /** 구독 중 화면에서 "요금제 보기" 로 들어왔을 때 — 돌아갈 길 (예전엔 막다른 화면이었다) */
  onBack?: () => void;
  onOpenCard: (product: CardProduct) => void;
  onPaid: (subscription: MySubscription | null, tier: SubscriptionTier) => void;
  onResumeCard: () => void;
  onRetryCatalog: () => void;
  subscription: MySubscription | null;
}) {
  const { request } = useTelegramAuth();
  const { language } = useAppLanguage();
  const [tier, setTier] = useState<SubscriptionTier>(initialTier);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [phase, setPhase] = useState<PayPhase>("idle");
  const [notice, setNotice] = useState<Notice>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const cardEnabled = Boolean(cardConfig?.enabled && cardConfig.cards.length);
  // 우즈벡어 UI 면 카드 입금이 기본 (Stars 는 해외카드·판매처가 필요하다). 마지막 선택은 기억한다
  const [methodPick, setMethodPick] = useState<PayMethod | null>(() => {
    try {
      const saved = localStorage.getItem(METHOD_KEY);
      return saved === "card" || saved === "stars" ? saved : null;
    } catch {
      return null;
    }
  });
  const method: PayMethod = !cardEnabled
    ? "stars"
    : (methodPick ?? (language === "uz" ? "card" : "stars"));
  const pickMethod = (next: PayMethod) => {
    haptic("light");
    setMethodPick(next);
    try {
      localStorage.setItem(METHOD_KEY, next);
    } catch {
      /* 저장 못 해도 이번 화면에선 된다 */
    }
  };
  const cardById = (id: string) => cardConfig?.products.find((p) => p.id === id) ?? null;
  useTelegramBackOverride(onBack ?? null);

  const plans = useMemo(
    () =>
      (catalog?.products ?? []).filter(
        (product) =>
          product.tier === tier &&
          (method !== "card" || cardConfig?.products.some((p) => p.id === product.id)),
      ),
    [cardConfig, catalog, method, tier],
  );
  // 등급을 바꾸면 그 등급의 "가장 이득" 이 기본 선택
  const selected =
    plans.find((plan) => plan.id === selectedId) ??
    plans.find((plan) => plan.best) ??
    plans[0] ??
    null;

  /** 결제 완료 뒤 웹훅이 반영할 때까지 잠깐 기다린다 */
  const confirmPaid = useCallback(
    async (before: MySubscription | null, boughtTier: SubscriptionTier) => {
      // 못 잡으면 null — 결제는 텔레그램이 "paid" 라고 했으니 완료로 보이고, 반영은 곧 된다고 알린다
      let detected: MySubscription | null = null;
      for (let attempt = 0; attempt < 8 && !detected; attempt++) {
        await sleep(attempt === 0 ? 700 : 1500);
        const next = await fetchMySubscription(request).catch(() => null);
        if (changedSince(before, next)) detected = next;
      }
      setPhase("idle");
      onPaid(detected, boughtTier);
    },
    [onPaid, request],
  );

  const pay = async () => {
    if (!selected || phase !== "idle") return;
    haptic("medium");
    if (method === "card") {
      const card = cardById(selected.id);
      if (card) onOpenCard(card);
      return;
    }
    setNotice(null);
    setPhase("opening");

    let link: string;
    try {
      link = (await createStarsInvoice(request, selected.id, language)).link;
    } catch {
      setPhase("idle");
      setNotice("unavailable");
      return;
    }

    const before = subscription;
    const boughtTier = selected.tier;
    const webApp = window.Telegram?.WebApp;
    if (webApp?.openInvoice) {
      webApp.openInvoice(link, (status: InvoiceStatus) => {
        if (status === "paid" || status === "pending") {
          webApp.HapticFeedback?.notificationOccurred("success");
          setPhase("checking");
          void confirmPaid(before, boughtTier);
        } else if (status === "failed") {
          webApp.HapticFeedback?.notificationOccurred("error");
          setPhase("idle");
          setNotice("failed");
        } else {
          setPhase("idle");
        }
      });
      return;
    }
    // openInvoice 가 없는 옛 텔레그램 — 인보이스 링크를 텔레그램에서 직접 연다
    if (webApp?.openTelegramLink) webApp.openTelegramLink(link);
    else window.open(link, "_blank", "noopener");
    setPhase("idle");
  };

  const periodKey = selected ? `premium.plans.${PLAN_KEY[selected.months] ?? "monthly"}` : "";
  const busyLabel =
    phase === "checking" ? "premiumStars.checking" : "premiumStars.opening";

  return (
    <main className={styles.premiumPage}>
      <div className={styles.scroll + " " + styles.scrollWithCta}>
        {onBack ? (
          <button aria-label="Orqaga" className={styles.offerBack} onClick={onBack} type="button">
            <MobileIcon name="chevron-back" size={24} />
          </button>
        ) : null}
        <section className={styles.gradient + " " + styles.hero}>
          <i className={styles.shine} />
          <span className={styles.crown}>
            <MobileIcon name="star" size={36} />
          </span>
          <div className={styles.logoRow}>
            <strong>KORIO</strong>
            <b>SUPER</b>
          </div>
          <p>Cheksiz energiya bilan to&apos;xtovsiz o&apos;rganing</p>
        </section>

        <div className={styles.tierBar}>
          {TIERS.map((candidate) => (
            <button
              className={candidate === tier ? styles.tierActive : ""}
              key={candidate}
              onClick={() => {
                setTier(candidate);
                setSelectedId(null);
              }}
              type="button"
            >
              {candidate.toUpperCase()}
              {candidate === "max" ? (
                <MobileIcon name="sparkles" size={11} />
              ) : null}
            </button>
          ))}
        </div>
        <p className={styles.tierBlurb}>
          {tier === "max"
            ? "Har kuni AI ustoz bilan koreyscha gaplashing"
            : "Cheklovsiz o'rganing"}
        </p>

        <FeatureList tier={tier} />

        {cardEnabled ? (
          <section className={styles.methodWrap}>
            <span className={styles.methodLabel} data-i18n="cardPay.method">
              {uzt("cardPay.method")}
            </span>
            <div className={styles.methodBar} role="tablist">
              {(["card", "stars"] as const).map((candidate) => (
                <button
                  aria-selected={method === candidate}
                  className={method === candidate ? styles.methodActive : ""}
                  key={candidate}
                  onClick={() => pickMethod(candidate)}
                  role="tab"
                  type="button"
                >
                  {candidate === "card" ? (
                    <MobileIcon name="card" size={17} />
                  ) : (
                    <span aria-hidden="true">⭐</span>
                  )}
                  <span data-no-translate>
                    {candidate === "card" ? "Humo / Uzcard" : "Telegram Stars"}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {cardConfig?.activeOrder ? (
          <div className={styles.offerBanner}>
            <CardOrderBanner onOpen={onResumeCard} order={cardConfig.activeOrder} />
          </div>
        ) : null}

        {plans.length ? (
          <section className={styles.plans}>
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                onSelect={() => {
                  haptic("light");
                  setSelectedId(plan.id);
                }}
                card={method === "card" ? cardById(plan.id) : null}
                plan={plan}
                selected={selected?.id === plan.id}
              />
            ))}
          </section>
        ) : catalogFailed ? (
          <section className={styles.storeBox}>
            <MobileIcon name="cloud-offline-outline" size={30} />
            <p data-i18n="premium.err.noProducts">{uzt("premium.err.noProducts")}</p>
            <button className={styles.retryBtn} onClick={onRetryCatalog} type="button">
              <span data-i18n="premium.retry">{uzt("premium.retry")}</span>
            </button>
          </section>
        ) : (
          <div className={styles.plansLoading}>
            <i />
          </div>
        )}

        {notice ? (
          <p className={styles.payNotice} data-i18n={`premiumStars.${notice}`} role="alert">
            {uzt(`premiumStars.${notice}`)}
          </p>
        ) : null}

        {method === "stars" ? (
          <button className={styles.starsHelpLink} onClick={() => setHelpOpen(true)} type="button">
            <span aria-hidden="true">⭐</span>
            <span data-i18n="premiumStars.howToGet">{uzt("premiumStars.howToGet")}</span>
          </button>
        ) : null}
        <p
          className={styles.terms}
          data-i18n={method === "card" ? "cardPay.terms" : "premiumStars.oneTimeTerms"}
        >
          {uzt(method === "card" ? "cardPay.terms" : "premiumStars.oneTimeTerms")}
        </p>
      </div>

      {/* 하단 고정 CTA — 스크롤 밖, 탭바 바로 위 */}
      {plans.length ? (
        <div className={styles.ctaBar}>
          {selected ? (
            // premium.billedAs("{{period}} — {{price}}") 를 쪼개 그린다 — 템플릿 번역은 값(기간 이름)까지는 안 옮긴다
            <p className={styles.ctaNote}>
              <span data-i18n={periodKey}>{uzt(periodKey)}</span>
              {method === "card" && cardById(selected.id) ? (
                <>
                  <span data-no-translate>{` — ${formatSom(cardById(selected.id)?.priceUzs ?? 0)} `}</span>
                  <span data-i18n="cardPay.som">{uzt("cardPay.som")}</span>
                </>
              ) : (
                <span data-no-translate>{` — ⭐ ${formatStars(selected.stars)}`}</span>
              )}
            </p>
          ) : null}
          <button
            className={styles.cta}
            disabled={!selected || phase !== "idle"}
            onClick={() => void pay()}
            type="button"
          >
            {phase === "idle" && method === "card" ? (
              <>
                <MobileIcon name="card" size={20} />
                <span data-i18n="cardPay.payWithCard">{uzt("cardPay.payWithCard")}</span>
              </>
            ) : phase === "idle" ? (
              <>
                <span className={styles.ctaStar} aria-hidden="true">
                  ⭐
                </span>
                <span data-i18n="premiumStars.payWithStars">{uzt("premiumStars.payWithStars")}</span>
              </>
            ) : (
              <>
                <i className={styles.ctaSpinner} aria-hidden="true" />
                <span data-i18n={busyLabel}>{uzt(busyLabel)}</span>
              </>
            )}
          </button>
        </div>
      ) : null}

      <PremiumTabs />
      {helpOpen ? <StarsHelpSheet onClose={() => setHelpOpen(false)} /> : null}
    </main>
  );
}

export function PremiumScreen() {
  const { request, updateUser } = useTelegramAuth();
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<MySubscription | null>(null);
  const [showPlans, setShowPlans] = useState(false);
  const [tier, setTier] = useState<SubscriptionTier>("max");
  const [catalog, setCatalog] = useState<StarsCatalog | null>(null);
  const [catalogFailed, setCatalogFailed] = useState(false);
  const [paid, setPaid] = useState<{ subscription: MySubscription | null; tier: SubscriptionTier } | null>(null);
  const [cardConfig, setCardConfig] = useState<CardConfig | null>(null);
  /** 카드 입금 화면 — 새 주문(product) 또는 진행 중 주문 이어 보기(resume) */
  const [cardFlow, setCardFlow] = useState<{ product?: CardProduct; resume?: CardOrder } | null>(null);

  const applySubscription = useCallback(
    (result: MySubscription) => {
      setSubscription(result);
      updateUser({
        isSuper: result.isPremium,
        superExpiresAt: result.expiresAt,
        superPlan: result.plan,
      });
    },
    [updateUser],
  );

  useEffect(() => {
    let active = true;
    setLoading(true);
    void fetchMySubscription(request)
      .then((result) => {
        if (active) applySubscription(result);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [applySubscription, request]);

  const loadCatalog = useCallback(() => {
    setCatalogFailed(false);
    void fetchStarsCatalog(request)
      .then(setCatalog)
      .catch(() => setCatalogFailed(true));
  }, [request]);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  // 카드 입금 설정 — 실패하면 그냥 Stars 만 보인다
  useEffect(() => {
    void fetchCardConfig(request)
      .then(setCardConfig)
      .catch(() => setCardConfig(null));
  }, [request]);

  const setActiveOrder = useCallback((order: CardOrder | null) => {
    setCardConfig((current) => (current ? { ...current, activeOrder: order } : current));
  }, []);

  const handlePaid = useCallback(
    (result: MySubscription | null, boughtTier: SubscriptionTier) => {
      if (result) applySubscription(result);
      else updateUser({ isSuper: true });
      setPaid({ subscription: result, tier: boughtTier });
    },
    [applySubscription, updateUser],
  );

  /** 카드 입금이 승인됐다 — 구독을 다시 받아 완료 시트를 띄운다 */
  const handleCardApproved = useCallback(
    (order: CardOrder) => {
      setActiveOrder(null);
      setCardFlow(null);
      void fetchMySubscription(request)
        .catch(() => null)
        .then((result) => handlePaid(result, order.tier));
    },
    [handlePaid, request, setActiveOrder],
  );

  // 입금 화면을 닫아도 심사 중이면 결과를 계속 본다 (승인되면 바로 완료 시트)
  const reviewingId =
    !cardFlow && cardConfig?.activeOrder?.status === "submitted" ? cardConfig.activeOrder.id : null;
  useEffect(() => {
    if (!reviewingId) return;
    const timer = window.setInterval(() => {
      void fetchCardOrder(request, reviewingId)
        .then((order) => {
          if (order.status === "approved") handleCardApproved(order);
          else if (order.status !== "submitted") setActiveOrder(order.status === "awaiting_transfer" ? order : null);
        })
        .catch(() => undefined);
    }, 12000);
    return () => window.clearInterval(timer);
  }, [handleCardApproved, request, reviewingId, setActiveOrder]);

  const resumeCard = () => {
    if (cardConfig?.activeOrder) setCardFlow({ resume: cardConfig.activeOrder });
  };

  const closePaid = () => {
    setPaid(null);
    setShowPlans(false);
    // 웹훅이 늦어 아직 못 받았으면 한 번 더 받아 둔다
    void fetchMySubscription(request).then(applySubscription).catch(() => undefined);
  };

  if (loading && !subscription) return <LoadingView />;

  const body =
    subscription?.isPremium && !showPlans ? (
      <ActiveView
        cardOrder={cardConfig?.activeOrder ?? null}
        onBrowse={(nextTier) => {
          if (nextTier) setTier(nextTier);
          setShowPlans(true);
        }}
        onResumeCard={resumeCard}
        subscription={subscription}
      />
    ) : (
      <OfferView
        cardConfig={cardConfig}
        catalog={catalog}
        catalogFailed={catalogFailed}
        initialTier={tier}
        onBack={subscription?.isPremium ? () => setShowPlans(false) : undefined}
        onOpenCard={(product) => setCardFlow({ product })}
        onPaid={handlePaid}
        onResumeCard={resumeCard}
        onRetryCatalog={loadCatalog}
        subscription={subscription}
      />
    );

  return (
    <>
      {body}
      {cardFlow && cardConfig ? (
        <CardPayFlow
          config={cardConfig}
          onApproved={handleCardApproved}
          onChanged={setActiveOrder}
          onClose={() => setCardFlow(null)}
          product={cardFlow.product}
          resume={cardFlow.resume}
        />
      ) : null}
      {paid ? (
        <PaidSheet onClose={closePaid} subscription={paid.subscription} tier={paid.tier} />
      ) : null}
    </>
  );
}
