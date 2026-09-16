"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { getTier, tierLabel, type LeagueResult } from "../model/league";
import { TierCrystal } from "./tier-crystal";
import styles from "./league-result-screen.module.css";

const CONFETTI = [
  [8, 2, "#41af80"], [18, 10, "#4683f5"], [29, 4, "#f82681"],
  [41, 14, "#ffbc32"], [54, 3, "#50d05c"], [66, 12, "#4683f5"],
  [77, 5, "#f82681"], [89, 15, "#ffbc32"], [13, 25, "#4683f5"],
  [35, 23, "#50d05c"], [61, 26, "#ffbc32"], [83, 24, "#41af80"],
] as const;

export function LeagueResultScreen() {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const [result, setResult] = useState<LeagueResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [shattered, setShattered] = useState(false);

  useEffect(() => {
    void request<LeagueResult | null>("/league/result")
      .then((value) => {
        if (value) {
          setResult(value);
          window.Telegram?.WebApp.HapticFeedback?.notificationOccurred(
            value.change === "demote" ? "warning" : "success",
          );
        } else router.back();
      })
      .catch(() => router.back())
      .finally(() => setLoading(false));
  }, [request, router]);

  if (loading || !result) return <main className={styles.loading} />;

  const toTier = getTier(result.toTier);
  const fromTier = getTier(result.fromTier);
  const promote = result.change === "promote";
  const demote = result.change === "demote";
  const stageTier = demote && !shattered ? fromTier : toTier;
  const droppedByXp = demote && result.reason === "xp";
  const title = promote ? "Ko'tarildingiz!" : demote ? "Tushdingiz" : "Shu haftalik natija";
  const subtitle = promote
    ? `${tierLabel(result.toTier)} ligasiga ko'tarildingiz! 🎉`
    : demote
      ? `${tierLabel(result.toTier)} ligasiga tushdingiz`
      : `${tierLabel(result.toTier)} ligasida qoldingiz`;
  const showResult = !demote || shattered;

  const finish = async () => {
    try {
      await request("/league/result/ack", { body: "{}", method: "POST" });
    } catch {
      // 네이티브와 동일하게 확인 API 실패여도 사용자를 화면에 가두지 않는다.
    }
    router.back();
  };

  return (
    <main
      className={styles.resultPage}
      style={{ "--stage-color": stageTier.color, "--stage-dark": stageTier.colorDark } as CSSProperties}
    >
      {promote ? (
        <div aria-hidden="true" className={styles.confetti}>
          {CONFETTI.map(([left, delay, color], index) => (
            <i key={index} style={{ backgroundColor: color, left: `${left}%`, "--delay": `${delay * 18}ms` } as CSSProperties} />
          ))}
        </div>
      ) : null}

      <section className={styles.center}>
        <i className={styles.glow} />
        {demote && !shattered ? (
          <span onAnimationEnd={() => setShattered(true)}>
            <TierCrystal shattering size={170} tier={fromTier} />
          </span>
        ) : (
          <span className={styles.crystalEnter}>
            <TierCrystal active size={170} tier={stageTier} />
          </span>
        )}

        {showResult ? <h1>{title}</h1> : null}
        {showResult ? (
          <p>
            {droppedByXp
              ? `${tierLabel(result.fromTier)} ligasida qolish uchun haftasiga ${result.requiredXp ?? 0} XP kerak edi`
              : subtitle}
          </p>
        ) : null}

        {droppedByXp && shattered ? (
          <span className={styles.xpBar}>
            <MobileIcon name="flash" size={16} />
            {result.weeklyXp ?? 0} / {result.requiredXp ?? 0} XP
          </span>
        ) : null}

        {showResult ? (
          <span className={styles.rankChip}>
            <MobileIcon name="podium" size={16} />
            {result.finalRank}-o&apos;rin bilan yakunladingiz
          </span>
        ) : null}

        {result.gems > 0 && showResult ? (
          <span className={styles.gemChip}>
            <MobileIcon name="diamond" size={20} />+{result.gems} olmos
          </span>
        ) : null}
      </section>

      {showResult ? (
        <button className={styles.continueButton} onClick={finish} type="button">
          Davom etish
        </button>
      ) : <div className={styles.buttonPlaceholder} />}
    </main>
  );
}
