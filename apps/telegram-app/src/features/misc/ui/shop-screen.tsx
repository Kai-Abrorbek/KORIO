"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { ApiError } from "../../../shared/api/client";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { claimFreeEnergy, getEnergy, getGemPasses, redeemGemPass, refillEnergy } from "../api/misc";
import type { EnergyState, GemPass, GemPassList } from "../model/misc";
import styles from "./shop-screen.module.css";
import { StickerPromoCard } from "../../profile/ui/sticker-promo";
import { alertDialog, confirmDialog } from "../../../shared/telegram/dialogs";
import { buyStreakFreeze, getRetentionSummary } from "../../retention/api/retention";
import { haptic, rt, type FreezeView } from "../../retention/model/retention";
import { ShopFreezeSection } from "../../retention/ui/shop-freeze";
import { WithdrawCard } from "./withdraw-card";
import { uzt } from "../../../shared/i18n/uz-text";

const TIERS = [
  { a: "#7FD8F5", b: "#3BB6E5", edge: "#2A94BC" },
  { a: "#5BC0FF", b: "#1899D6", edge: "#1478A8" },
  { a: "#B98BF5", b: "#776ee2", edge: "#5448E0" },
  { a: "#FFC94D", b: "#FF8A00", edge: "#C26A00" },
] as const;

const ERROR_COPY: Record<string, string> = {
  ENERGY_ALREADY_FULL: "Energiyangiz allaqachon to'la.",
  FREEZE_MAX: rt("errors.FREEZE_MAX"),
  ENERGY_SUPER_UNLIMITED: "SUPER'da energiya cheksiz — to'ldirish shart emas.",
  GEM_PASS_FAILED: "Bajarib bo'lmadi. Gavharlaringiz joyida.",
  GEM_PASS_STACK_LIMIT: "Allaqachon yetarlicha to'plangan. Muddat kamaygach yana olasiz.",
  NOT_ENOUGH_GEMS: "Gavhar yetarli emas.",
  UNKNOWN_GEM_PASS: "Bunday mahsulot yo'q.",
};

/** 에너지 조회가 실패해도 섹션은 그린다 (모바일 ShopScreen 의 기본값과 같다) */
const ENERGY_FALLBACK:EnergyState={energy:0,etaHours:0,etaMinutes:0,freeRemaining:0,gems:0,isSuper:false,maxEnergy:50,refillCost:350,freeAmount:10};

function Battery({ value, pink = false }: { pink?: boolean; value: number }) {
  return <span className={`${styles.battery} ${pink ? styles.batteryPink : ""}`}><i/><b>{value}</b><em/></span>;
}

function GemHero({ gems, onHistory, premiumUntil }: { gems: number; onHistory: () => void; premiumUntil: string | null }) {
  return <section className={styles.gemHero}>
    {/* 보석 내역 — 이 보석이 어디서 왔고 어디로 갔는지 */}
    <button className={styles.historyPill} onClick={()=>{window.Telegram?.WebApp.HapticFeedback?.selectionChanged();onHistory();}} type="button"><MobileIcon name="receipt-outline" size={14}/><span data-i18n="gemHistory.entry">{uzt("gemHistory.entry")}</span><MobileIcon name="chevron-forward" size={13}/></button>
    {Array.from({ length: 3 },(_,index)=><i className={styles.heroSpark} key={index} style={{ "--i": index } as CSSProperties}><MobileIcon name="sparkles" size={10+index*2}/></i>)}
    <small>GAVHARLARIM</small><div><MobileIcon name="diamond" size={26}/><strong>{gems.toLocaleString("en-US")}</strong></div><p>1 gavhar = 1 so&apos;m</p>
    <MobileIcon className={styles.heroGem} name="diamond" size={66}/>
    {premiumUntil ? <span className={styles.until}><MobileIcon name="checkmark-circle" size={13}/>{`${premiumUntil} gacha premium`}</span> : null}
  </section>;
}

function PassCard({ basePerDay, busy, featured, gems, index, onBuy, pass }: { basePerDay: number; busy: boolean; featured: boolean; gems: number; index: number; onBuy: () => void; pass: GemPass }) {
  const tier = TIERS[Math.min(index, TIERS.length - 1)] ?? TIERS[0];
  const save = basePerDay ? Math.round((1-pass.perDay/basePerDay)*100) : 0;
  const short = Math.max(0,pass.gems-gems);
  const blocked = busy || !pass.affordable || pass.overStack;
  return <button className={`${styles.passCard} ${featured?styles.passFeatured:""}`} disabled={blocked} onClick={()=>{window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");onBuy();}} style={{"--tier-a":tier.a,"--tier-b":tier.b,"--tier-edge":tier.edge} as CSSProperties} type="button">
    {featured?<i className={styles.shine}/>:null}
    <span className={styles.dayBadge}><b>{pass.days}</b><small>kun</small></span>
    <span className={styles.passCopy}><span><strong>KORIO SUPER</strong>{save>0?<em>−{save}%</em>:null}</span><small>{`Kuniga ${pass.perDay.toLocaleString("en-US")} gavhar`}</small>{pass.overStack?<i><MobileIcon name="lock-closed" size={12}/>Yetarlicha to&apos;plangan</i>:short>0?<i className={styles.need}><MobileIcon name="diamond" size={12}/>{`yana ${short.toLocaleString("en-US")} ta`}</i>:null}</span>
    <span className={styles.passPrice}><MobileIcon name="diamond" size={16}/><b>{pass.gems.toLocaleString("en-US")}</b></span>
    {featured?<span className={styles.best}><MobileIcon name="flame" size={11}/>ENG ZO&apos;R</span>:null}
  </button>;
}

function SuperCard({ active, onClick }: { active: boolean; onClick: () => void }) {
  return <button className={styles.superCard} onClick={()=>{window.Telegram?.WebApp.HapticFeedback?.impactOccurred("medium");onClick();}} type="button"><span className={styles.superStrip}><b>SUPER</b><MobileIcon name="chevron-forward" size={18}/><i/></span><span className={styles.superBody}><i className={styles.infinity}><MobileIcon name="infinite" size={29}/></i><span><strong>Cheksiz</strong><small>{active?"Hozir yoqilgan":"Cheksiz energiya · hech qachon to'xtamaysiz"}</small></span><b>{active?"Boshqarish":"Bepul sinov"}</b></span></button>;
}

function EnergySection({ busy, energy, gems, onFree, onRefill }: { busy: boolean; energy: EnergyState; gems: number; onFree: () => void; onRefill: () => void }) {
  const full=energy.energy>=energy.maxEnergy;
  const [remain,setRemain]=useState(energy.etaHours*3600+energy.etaMinutes*60);
  useEffect(()=>setRemain(energy.etaHours*3600+energy.etaMinutes*60),[energy.etaHours,energy.etaMinutes]);
  useEffect(()=>{if(full)return;const timer=window.setInterval(()=>setRemain(value=>Math.max(0,value-1)),1000);return()=>window.clearInterval(timer);},[full]);
  const hours=Math.floor(remain/3600), minutes=Math.floor(remain%3600/60);
  const refillOff=full||gems<energy.refillCost||busy, freeOff=energy.freeRemaining<=0||full||busy;
  return <section className={styles.energySection}><header><strong>ENERGIYA</strong>{!full?<span><MobileIcon name="time-outline" size={13}/>{`${hours} soat ${minutes} daqiqa`}</span>:null}</header><div className={styles.energyBar}><span><i style={{width:`${Math.max(0,Math.min(100,energy.energy/energy.maxEnergy*100))}%`}}/><b>{energy.energy} / {energy.maxEnergy}</b></span><em className={full?styles.capFull:""}><MobileIcon name="flash" size={18}/></em></div>
    <button disabled={refillOff} onClick={()=>{window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");onRefill();}} type="button"><Battery pink value={energy.maxEnergy}/><span><b>To&apos;ldirish</b>{full?<small>To&apos;la</small>:null}</span><em><MobileIcon name="diamond" size={15}/>{energy.refillCost.toLocaleString("en-US")}</em></button>
    <button disabled={freeOff} onClick={()=>{window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");onFree();}} type="button"><Battery value={energy.freeAmount??10}/><span><b>Energiya +{energy.freeAmount??10}</b></span><strong className={energy.freeRemaining>0?styles.freeActive:""}>{energy.freeRemaining>0?`Bepul (${energy.freeRemaining})`:"Ertaga"}</strong></button>
  </section>;
}

export function ShopScreen() {
  const router=useRouter();
  const {request,updateUser,user}=useTelegramAuth();
  const [energy,setEnergy]=useState<EnergyState|null>(null),[passes,setPasses]=useState<GemPassList|null>(null),[loading,setLoading]=useState(true),[busy,setBusy]=useState(false),[unavailable,setUnavailable]=useState(false),[freeze,setFreeze]=useState<FreezeView|null>(null);
  const mounted=useRef(true);
  useEffect(()=>{
    mounted.current=true;
    return()=>{mounted.current=false;};
  },[]);
  const load=useCallback(async()=>{const [energyResult,passResult,retentionResult]=await Promise.all([getEnergy(request).catch(()=>null),getGemPasses(request).catch(()=>{setUnavailable(true);return null;}),getRetentionSummary(request).catch(()=>null)]);if(!mounted.current)return;if(retentionResult)setFreeze(retentionResult.freeze);if(energyResult){setEnergy(energyResult);updateUser({energy:energyResult.energy,gems:energyResult.gems});}if(passResult){setPasses(passResult);setUnavailable(false);}setLoading(false);},[request,updateUser]);
  useEffect(()=>{void load();},[load]);
  const run=async(fn:()=>Promise<void>)=>{if(busy)return;setBusy(true);try{await fn();}catch(reason){const code=reason instanceof ApiError?reason.code:"UNKNOWN";void alertDialog(ERROR_COPY[code]??"Birozdan keyin qayta urinib ko'ring.");}finally{setBusy(false);}};
  const gems=passes?.gems??energy?.gems??user?.gems??0,isSuper=energy?.isSuper??Boolean(user?.isSuper),basePerDay=passes?.passes[0]?.perDay??0;
  const untilLabel=useMemo(()=>{if(!passes?.premiumUntil)return null;const date=new Date(passes.premiumUntil);return `${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,"0")}.${String(date.getDate()).padStart(2,"0")}`;},[passes?.premiumUntil]);
  // 복구펜 — 산 뒤 보석 표시는 passes/energy 어느 쪽이 기준이든 같이 맞춘다
  const buyFreeze=()=>void run(async()=>{const result=await buyStreakFreeze(request);setFreeze(current=>current?{...current,owned:result.owned,max:result.max}:current);setPasses(current=>current?{...current,gems:result.gems}:current);setEnergy(current=>current?{...current,gems:result.gems}:current);updateUser({gems:result.gems});haptic("success");});
  const buy=async(pass:GemPass)=>{if(!(await confirmDialog(`${pass.gems.toLocaleString("en-US")} gavhar sarflab, ${pass.days} kunlik premium olasiz.`)))return;void run(async()=>{const result=await redeemGemPass(request,pass.id);updateUser({gems:result.gems,isSuper:true,superExpiresAt:result.premiumUntil});void alertDialog(`Premium yana ${result.days} kunga uzaytirildi!`);await load();});};
  if(loading)return <main className={`${styles.page} ${styles.loading}`}><i/></main>;
  return <main className={styles.page}><header className={styles.header}><button aria-label="Yopish" onClick={()=>window.history.length>1?router.back():router.replace("/home")} type="button"><MobileIcon name="close" size={24}/></button><h1>Do&apos;kon</h1><button aria-label={uzt("gemHistory.title")} className={styles.gemChipBtn} onClick={()=>router.push("/gem-history")} type="button"><MobileIcon name="diamond" size={16}/>{gems.toLocaleString("en-US")}</button></header><div className={styles.scroll}><GemHero gems={gems} onHistory={()=>router.push("/gem-history")} premiumUntil={untilLabel}/><h2 className={styles.sectionLabel}>PREMIUM MUDDAT</h2><p className={styles.sectionDesc}>To&apos;plagan gavharlaringizga KORIO SUPER&apos;ni yana bir necha kun oling. Muddat uzoq bo&apos;lsa, kuniga arzonroq.</p>
    {unavailable?<div className={styles.retry}><MobileIcon name="cloud-offline-outline" size={26}/><p>Muddatlarni yuklab bo&apos;lmadi. Server javob bermayapti.</p><button onClick={()=>{setUnavailable(false);setLoading(true);void load();}} type="button"><MobileIcon name="refresh" size={15}/>Qayta urinish</button></div>:passes?.passes.map((pass,index)=><PassCard basePerDay={basePerDay} busy={busy} featured={index===passes.passes.length-1} gems={gems} index={index} key={pass.id} onBuy={()=>void buy(pass)} pass={pass}/>) }
    {passes&&passes.stackedDays>0?<p className={styles.stackNote}>{`Hozir ${passes.stackedDays} kun to'plangan (ko'pi bilan ${passes.maxStackDays} kun)`}</p>:null}<h2 className={`${styles.sectionLabel} ${styles.superLabel}`}>KORIO SUPER</h2><SuperCard active={isSuper} onClick={()=>router.push("/premium")}/><h2 className={`${styles.sectionLabel} ${styles.superLabel}`} data-i18n="stickers.shopLabel">{uzt("stickers.shopLabel")}</h2><div className={styles.stickerPromo}><StickerPromoCard avatar={user?.avatar}/></div>{freeze?<ShopFreezeSection busy={busy} freeze={freeze} gems={gems} isSuper={isSuper} onBuy={buyFreeze}/>:null}{!isSuper?<EnergySection busy={busy} energy={energy??ENERGY_FALLBACK} gems={gems} onFree={()=>void run(async()=>{const result=await claimFreeEnergy(request);setEnergy(result);updateUser({energy:result.energy,gems:result.gems});})} onRefill={()=>void run(async()=>{const result=await refillEnergy(request);setEnergy(result);updateUser({energy:result.energy,gems:result.gems});})}/>:null}<WithdrawCard gems={gems} onGemsChange={next=>{updateUser({gems:next});setPasses(current=>current?{...current,gems:next}:current);setEnergy(current=>current?{...current,gems:next}:current);}}/></div></main>;
}
