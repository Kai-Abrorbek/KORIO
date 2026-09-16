"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import {
  MAX_FEATURES,
  SUPER_FEATURES,
  TIERS,
  type MySubscription,
  type SubscriptionTier,
} from "../model/premium";
import styles from "./premium-screen.module.css";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString();
}

function PremiumTabs() {
  const router = useRouter();
  return (
    <nav aria-label="Asosiy navigatsiya" className={styles.bottomNav}>
      <button onClick={() => router.push("/home")} type="button">
        <MobileIcon name="home" size={23} />
        <span>Asosiy</span>
      </button>
      <button type="button">
        <MobileIcon name="bar-chart" size={23} />
        <span>Statistika</span>
      </button>
      <button type="button">
        <MobileIcon name="trophy-outline" size={23} />
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

function ActiveView({
  onBrowse,
  subscription,
}: {
  onBrowse: (tier?: SubscriptionTier) => void;
  subscription: MySubscription;
}) {
  const canUpgrade = subscription.canUpgradeTo.length > 0;
  const features =
    subscription.tier === "max"
      ? [...MAX_FEATURES, ...SUPER_FEATURES]
      : [...SUPER_FEATURES];

  return (
    <main className={styles.premiumPage}>
      <div className={styles.scroll + " " + styles.activeWrap}>
        <div className={styles.gradient + " " + styles.activeBadge}>
          <MobileIcon name="star" size={40} />
        </div>
        <h1>SUPER a&apos;zo</h1>
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

        {subscription.isTrial ? (
          <button className={styles.browsePlans} onClick={() => onBrowse()} type="button">
            <strong>Barcha tariflarni ko&apos;rish</strong>
            <MobileIcon name="chevron-forward" size={15} />
          </button>
        ) : null}

        {subscription.isTrial && canUpgrade ? (
          <p className={styles.trialBuyNote}>
            Sinov muddatidan {subscription.trialDaysLeft ?? 0} kun qoldi. Hozir
            sotib olsangiz, darhol to&apos;lov olinadi va sinov tugaydi.
          </p>
        ) : null}

        {subscription.expiresAt ? (
          <p className={styles.expiresNote}>
            {formatDate(subscription.expiresAt)}
            {subscription.autoRenew
              ? " da avtomatik yangilanadi"
              : " gacha amal qiladi"}
          </p>
        ) : null}
        <p className={styles.manageNote}>
          Obunani bekor qilish va to&apos;lov usulini o&apos;zgartirish Google
          Play obunalar bo&apos;limida amalga oshiriladi.
        </p>
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

function PlansUnavailable() {
  return (
    <section className={styles.storeBox}>
      <MobileIcon name="cloud-offline-outline" size={30} />
      <p>Bu qurilmada ilova ichidagi to&apos;lov mavjud emas.</p>
    </section>
  );
}

function OfferView({
  initialTier = "max",
}: {
  initialTier?: SubscriptionTier;
}) {
  const [tier, setTier] = useState<SubscriptionTier>(initialTier);

  return (
    <main className={styles.premiumPage}>
      <div className={styles.scroll}>
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
              onClick={() => setTier(candidate)}
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
        <PlansUnavailable />
        <p className={styles.terms}>
          Istalgan vaqtda bekor qiling. Avto-yangilanadi.
        </p>
      </div>
      <PremiumTabs />
    </main>
  );
}

export function PremiumScreen() {
  const { request, updateUser } = useTelegramAuth();
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<MySubscription | null>(null);
  const [showPlans, setShowPlans] = useState(false);
  const [tier, setTier] = useState<SubscriptionTier>("max");

  useEffect(() => {
    let active = true;
    setLoading(true);
    void request<MySubscription>("/payments/subscriptions/me")
      .then((result) => {
        if (!active) return;
        setSubscription(result);
        updateUser({ isSuper: result.isPremium });
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [request, updateUser]);

  if (loading && !subscription) return <LoadingView />;
  if (subscription?.isPremium && !showPlans) {
    return (
      <ActiveView
        onBrowse={(nextTier) => {
          if (nextTier) setTier(nextTier);
          setShowPlans(true);
        }}
        subscription={subscription}
      />
    );
  }
  return <OfferView initialTier={tier} />;
}
