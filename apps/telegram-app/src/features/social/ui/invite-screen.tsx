"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { claimInvite, getMyInvite } from "../api/social";
import { CLAIM_ERRORS, type ClaimError, type MyInvite } from "../model/social";
import { FriendAvatar, LinkCode, LoadingState, goBack, shareText } from "./social-parts";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import styles from "./social.module.css";

export function InviteScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { request, updateUser, user } = useTelegramAuth();
  const autoGems = Number(params.get("claimedGems") ?? 0);
  const [data, setData] = useState<MyInvite | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [input, setInput] = useState(params.get("code") ?? "");
  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState<ClaimError | null>(null);
  const [claimed, setClaimed] = useState<{ gems: number; who: string } | null>(autoGems > 0 ? { gems: autoGems, who: params.get("from") ?? "" } : null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(() => {
    setLoadError(false);
    void getMyInvite(request).then(setData).catch(() => setLoadError(true)).finally(() => setLoading(false));
  }, [request]);
  useEffect(load, [load]);
  const reward = data?.rewardGems ?? 1000;
  const nextMilestone = useMemo(() => data?.milestones.find((milestone) => !milestone.reached) ?? null, [data]);
  const shareMessage = data ? `Bu ${user?.nickname ?? ""}! KORIO’da birga koreys tilini o‘rganamiz 🇰🇷\nTaklif kodim ${data.code} — ikkalamiz ${reward} tadan gavhar olamiz.\n${data.link}` : "";

  const copy = async () => {
    if (!data?.code) return;
    await navigator.clipboard?.writeText(data.code).catch(() => undefined);
    window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
    setCopied(true); window.setTimeout(() => setCopied(false), 1800);
  };
  const submit = async () => {
    if (!input.trim() || claiming) return;
    setClaiming(true); setClaimError(null);
    try {
      const result = await claimInvite(request, input.trim());
      if (result.success) {
        setClaimed({ gems: result.gems, who: result.inviter.nickname });
        updateUser({ gems: (user?.gems ?? 0) + result.gems });
        window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
        load();
      } else {
        setClaimError(result.error); window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
      }
    } catch { setClaimError("INVALID_CODE"); }
    finally { setClaiming(false); }
  };

  if (loading) return <main className={styles.screen}><LoadingState /></main>;
  return (
    <main className={`${styles.screen} ${styles.inviteScreen}`}>
      <div className={styles.scroll}>
        <section className={styles.inviteHero}>
          <button aria-label="Orqaga" onClick={() => goBack(router, "/home")} type="button"><MobileIcon name="chevron-back" size={28} /></button>
          <i><MobileIcon name="diamond" size={34} /></i>
          <h1>Do‘st chaqiring — ikkalangizga {reward}💎</h1>
          <p>Kodingiz bilan do‘stingiz qo‘shilsa, siz ham u ham {reward} ta gavhar olasiz.</p>
        </section>
        {loadError ? <section className={`${styles.inviteCard} ${styles.inviteError}`}><MobileIcon name="cloud-offline-outline" size={26} /><p>Taklif ma’lumotini yuklab bo‘lmadi. Birozdan so‘ng qayta urinib ko‘ring.</p><button onClick={() => { setLoading(true); load(); }} type="button">Qayta urinish</button></section> : null}
        <section className={styles.inviteCard}><h2>Mening taklif kodim</h2><div className={styles.codeRow}><div><strong>{data?.code ?? "······"}</strong><button disabled={!data} onClick={() => void copy()} type="button"><MobileIcon name={copied ? "checkmark" : "document-text-outline"} size={15} />{copied ? "Nusxalandi" : "Kodni nusxalash"}</button></div>{data?.link ? <button aria-label="Taklifni ulashish" className={styles.codeButton} onClick={() => void shareText("KORIO", shareMessage)} type="button"><LinkCode size={72} value={data.link} /></button> : null}</div></section>
        <section className={styles.inviteStats}><div><MobileIcon name="people" size={18} /><b>{data?.invitedCount ?? 0}</b><small>Taklif qilingan</small></div><div><MobileIcon name="diamond" size={18} /><b>{data?.gemsEarned ?? 0}</b><small>Olingan gavhar</small></div></section>
        <section className={styles.inviteCard}><div className={styles.milestoneHead}><h2>Taklif bonuslari</h2>{nextMilestone ? <small>Yana {Math.max(0, nextMilestone.count - (data?.invitedCount ?? 0))} kishi — +{nextMilestone.gems}💎</small> : null}</div><MilestoneRail data={data} /></section>
        {data?.canRedeem && !claimed ? <section className={styles.inviteCard}><h2>Do‘stingizning kodi bormi?</h2><p>Do‘stingiz kodini kiriting va {reward} ta gavhar oling.</p><div className={styles.claimRow}><input maxLength={40} onChange={(event) => { setInput(event.target.value.toUpperCase()); setClaimError(null); }} placeholder="Kodni kiriting" value={input} /><button disabled={!input.trim() || claiming} onClick={() => void submit()} type="button">{claiming ? <span className={styles.miniSpinner} /> : "Qo‘llash"}</button></div>{claimError ? <p className={styles.claimError}><MobileIcon name="alert-circle" size={15} />{CLAIM_ERRORS[claimError]}</p> : null}</section> : null}
        {claimed ? <section className={`${styles.inviteCard} ${styles.claimed}`}><MobileIcon name="checkmark-circle" size={30} /><h2>{claimed.gems} ta gavhar oldingiz!</h2><p>{claimed.who} ham oldi. Endi birga o‘qiymiz!</p></section> : null}
        {data?.invited.length ? <section className={styles.inviteCard}><h2>Kodingiz bilan qo‘shilganlar</h2>{data.invited.map((friend) => <article className={styles.invitedFriend} key={friend.id}><FriendAvatar avatar={friend.avatar} imageUrl={friend.profileImage} name={friend.nickname} size={40} /><span><b>{friend.nickname}</b>{friend.username ? <small>@{friend.username.replace(/^@/, "")}</small> : null}</span><em><MobileIcon name="diamond" size={12} />+{friend.gems}</em></article>)}</section> : null}
        <p className={styles.inviteTerms}>Taklif kodi ro‘yxatdan o‘tgandan keyin 14 kun ichida, har hisobda bir marta ishlaydi.</p>
      </div>
      <footer className={styles.inviteFooter}><button disabled={!data} onClick={() => void shareText("KORIO", shareMessage)} type="button"><MobileIcon name="share-outline" size={20} />Do‘stga yuborish</button></footer>
    </main>
  );
}

function MilestoneRail({ data }: { data: MyInvite | null }) {
  const milestones = data?.milestones ?? [];
  const max = milestones.at(-1)?.count ?? 1;
  const progress = Math.min(100, ((data?.invitedCount ?? 0) / max) * 100);
  return <div className={styles.milestones}><div className={styles.rail}><i style={{ width: `${progress}%` }} /></div><div className={styles.nodes}>{milestones.map((milestone) => <div key={milestone.count}><span className={milestone.reached ? styles.nodeReached : ""}>{milestone.reached ? <MobileIcon name="checkmark" size={13} /> : milestone.count}</span><small>+{milestone.gems}</small></div>)}</div></div>;
}
