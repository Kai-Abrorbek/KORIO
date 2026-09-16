"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { ApiError } from "../../../shared/api/client";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { challengeMetaOf, getTier, type ChallengeInfo } from "../model/league";
import styles from "./xp-challenge-screen.module.css";

const FALLBACK_ENERGY_COST = 15;

export function XpChallengeScreen() {
  const router = useRouter();
  const { request, updateUser, user } = useTelegramAuth();
  const [params, setParams] = useState({ tier: "bronze", xp: 210, type: "" });
  const [info, setInfo] = useState<ChallengeInfo | null>(null);
  const [starting, setStarting] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setParams({
      tier: query.get("tier") ?? "bronze",
      xp: Number(query.get("xp") ?? 210),
      type: query.get("type") ?? "",
    });
  }, []);

  useEffect(() => {
    let active = true;
    void request<ChallengeInfo>("/league/challenge")
      .then((value) => { if (active) setInfo(value); })
      .catch((error: unknown) => {
        if (!active) return;
        if (!(error instanceof ApiError && error.status === 404)) setFailed(true);
      });
    return () => { active = false; };
  }, [request]);

  const challengeId = info?.id ?? (params.type || "match");
  const meta = useMemo(() => challengeMetaOf(challengeId), [challengeId]);
  const tier = getTier(params.tier);
  const maxXp = info?.maxXp ?? params.xp;
  const energyCost = info?.energyCost ?? FALLBACK_ENERGY_COST;
  const energy = user?.energy ?? 0;
  const outOfEnergy = energy < energyCost;
  const noPlaysLeft = !!info && info.playsLeftToday <= 0;

  const start = async () => {
    if (starting || outOfEnergy || noPlaysLeft) return;
    setStarting(true);
    setFailed(false);
    try {
      await request("/league/snapshot-rank", { body: "{}", method: "POST" });
    } catch {
      // 순위 스냅샷 실패는 네이티브와 동일하게 게임 시작을 막지 않는다.
    }
    try {
      const response = await request<{ energy?: { energy?: number } }>("/league/challenge/start", {
        body: "{}",
        method: "POST",
      });
      if (typeof response.energy?.energy === "number") {
        updateUser({ energy: response.energy.energy });
      }
    } catch (error) {
      const missing = error instanceof ApiError && error.status === 404;
      if (!missing) {
        setFailed(true);
        setStarting(false);
        return;
      }
    }
    router.replace(
      `/challenge-intro?tier=${encodeURIComponent(params.tier)}&xp=${maxXp}&type=${encodeURIComponent(challengeId)}`,
    );
  };

  return (
    <main
      className={styles.challengePage}
      style={{ "--tier-color": tier.color } as CSSProperties}
    >
      <header>
        <button aria-label="Yopish" onClick={() => router.back()} type="button">
          <MobileIcon name="close" size={32} />
        </button>
        <h1>{meta.label}</h1>
        <span><MobileIcon name="flash" size={18} /><b>{energy}</b></span>
      </header>

      <section className={styles.body}>
        <div className={styles.cards}>
          <span><MobileIcon name={meta.icon} size={54} /></span>
          <span><MobileIcon name={meta.icon} size={54} /></span>
        </div>
        <p className={styles.headline}>
          Maksimal <b>{maxXp} XP</b> olib<br />reytingda yuqoriga chiqing!
        </p>
        <div className={styles.infoBox}>
          <span><small>Bugun qolgan urinishlar</small><strong>{info ? info.playsLeftToday : "—"}</strong></span>
          <i />
          <span><small>Olish</small><strong>{maxXp} XP</strong></span>
        </div>
      </section>

      <footer>
        {failed ? <p>Boshlab bo&apos;lmadi. Birozdan keyin qayta bosing.</p> : null}
        <button disabled={starting || outOfEnergy || noPlaysLeft} onClick={start} type="button">
          <strong>
            {noPlaysLeft ? "Bugunga tugadi" : outOfEnergy ? "Energiya yetarli emas" : "Boshlash"}
          </strong>
          <span><MobileIcon name="flash" size={16} /><b>{energyCost}</b></span>
        </button>
      </footer>
    </main>
  );
}
