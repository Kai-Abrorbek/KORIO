"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { getTier, tierLabel, type LeagueData, type LeagueMember } from "../model/league";
import { TierCrystal } from "./tier-crystal";
import styles from "./league-rankup-screen.module.css";

const ROW_HEIGHT = 78;

export function LeagueRankupScreen() {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const [tierKey, setTierKey] = useState("bronze");
  const [rows, setRows] = useState<LeagueMember[]>([]);
  const [oldRank, setOldRank] = useState(0);
  const [newRank, setNewRank] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setTierKey(query.get("tier") ?? "bronze");
  }, []);

  useEffect(() => {
    let active = true;
    void request<LeagueData>("/league/me")
      .then((data) => {
        if (!active) return;
        setRows(data.members ?? []);
        const me = data.members.find((member) => member.isMe);
        const rank = me?.rank ?? 0;
        setNewRank(rank);
        setOldRank(data.previousRank ?? rank + 3);
        setDaysLeft(data.daysLeft ?? 0);
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, [request]);

  const tier = getTier(tierKey);
  const start = Math.max(0, newRank - 3);
  const visibleRows = rows.slice(start, newRank + 3);
  const rankDistance = Math.max(0, oldRank - newRank) * ROW_HEIGHT;

  return (
    <main className={styles.rankupPage}>
      <section className={styles.top}>
        <TierCrystal size={130} tier={tier} />
        <h1>{tierLabel(tier.key)}da {newRank}-o&apos;ringa ko&apos;tarildingiz!</h1>
        <p><MobileIcon name="time" size={20} />{daysLeft} kun</p>
      </section>

      <section className={styles.list}>
        {visibleRows.map((member, index) => {
          const realIndex = start + index;
          const shifted = realIndex >= newRank - 1 && realIndex < oldRank - 1;
          return (
            <div
              className={[
                styles.row,
                member.isMe ? styles.rowMe : "",
                member.isMe && rankDistance > 0 ? styles.rowAnimate : "",
                !member.isMe && shifted && rankDistance > 0 ? styles.rowShift : "",
              ].join(" ")}
              key={member.id}
              style={{ "--rank-distance": `${rankDistance}px` } as CSSProperties}
            >
              <b className={styles.rank}>{member.rank}</b>
              <span className={styles.avatar}>{(member.nickname || "?")[0]}</span>
              <span className={styles.info}>
                <strong>{member.nickname}</strong>
                <small><span>{member.flag ?? "🇰🇷"}</span>{member.streak ?? 0}</small>
              </span>
              <b className={styles.xp}>{member.xp} XP</b>
            </div>
          );
        })}
      </section>

      <footer><button onClick={() => router.replace("/league")} type="button">Davom etish</button></footer>
    </main>
  );
}
