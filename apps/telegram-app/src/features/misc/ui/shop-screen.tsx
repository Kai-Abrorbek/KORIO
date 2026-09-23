"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { ApiError } from "../../../shared/api/client";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { claimFreeEnergy, getEnergy, getGemPasses, redeemGemPass, refillEnergy } from "../api/misc";
import type { EnergyState, GemPass, GemPassList } from "../model/misc";
import styles from "./shop-screen.module.css";

const TIERS = [
  { a: "#7FD8F5", b: "#3BB6E5", edge: "#2A94BC" },
  { a: "#5BC0FF", b: "#1899D6", edge: "#1478A8" },
  { a: "#B98BF5", b: "#776ee2", edge: "#5448E0" },
  { a: "#FFC94D", b: "#FF8A00", edge: "#C26A00" },
] as const;

const ERROR_COPY: Record<string, string> = {
  ENERGY_ALREADY_FULL: "Energiyangiz allaqachon to'la.",
  ENERGY_SUPER_UNLIMITED: "SUPER'da energiya cheksiz — to'ldirish shart emas.",
  GEM_PASS_FAILED: "Bajarib bo'lmadi. Gavharlaringiz joyida.",
  GEM_PASS_STACK_LIMIT: "Allaqachon yetarlicha to'plangan. Muddat kamaygach yana olasiz.",
  NOT_ENOUGH_GEMS: "Gavhar yetarli emas.",
  UNKNOWN_GEM_PASS: "Bunday mahsulot yo'q.",
};

function Battery({ value, pink = false }: { pink?: boolean; value: number }) {
  return <span className={`${styles.battery} ${pink ? styles.batteryPink : ""}`}><i/><b>{value}</b><em/></span>;
}

function GemHero({ gems, premiumUntil }: { gems: number; premiumUntil: string | null }) {
  return <section className={styles.gemHero}>
    {Array.from({ length: 3 },(_,index)=><i className={styles.heroSpark} key={index} style={{ "--i": index } as CSSProperties}><MobileIcon name="sparkles" size={10+index*2}/></i>)}
    <small>GAVHARLARIM</small><div><MobileIcon name="diamond" size={26}/><strong>{gems.toLocaleString("en-US")}</strong></div><p>1 gavhar = 1 so&apos;m</p>
    <MobileIcon className={styles.heroGem} name="diamond" size={66}/>
    {premiumUntil ? <span className={styles.until}><MobileIcon name="checkmark-circle" size={13}/>{premiumUntil} gacha premium</span> : null}
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
    <span className={styles.passCopy}><span><strong>KORIO SUPER</strong>{save>0?<em>−{save}%</em>:null}</span><small>Kuniga {pass.perDay.toLocaleString("en-US")} gavhar</small>{pass.overStack?<i><MobileIcon name="lock-closed" size={12}/>Yetarlicha to&apos;plangan</i>:short>0?<i className={styles.need}><MobileIcon name="diamond" size={12}/>yana {short.toLocaleString("en-US")} ta</i>:null}</span>
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
  return <section className={styles.energySection}><header><strong>ENERGIYA</strong>{!full?<span><MobileIcon name="time-outline" size={13}/>{hours} soat {minutes} daqiqa</span>:null}</header><div className={styles.energyBar}><span><i style={{width:`${Math.max(0,Math.min(100,energy.energy/energy.maxEnergy*100))}%`}}/><b>{energy.energy} / {energy.maxEnergy}</b></span><em className={full?styles.capFull:""}><MobileIcon name="flash" size={18}/></em></div>
    <button disabled={refillOff} onClick={()=>{window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");onRefill();}} type="button"><Battery pink value={energy.maxEnergy}/><span><b>To&apos;ldirish</b>{full?<small>To&apos;la</small>:null}</span><em><MobileIcon name="diamond" size={15}/>{energy.refillCost.toLocaleString("en-US")}</em></button>
    <button disabled={freeOff} onClick={()=>{window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");onFree();}} type="button"><Battery value={5}/><span><b>Energiya +5</b></span><strong className={energy.freeRemaining>0?styles.freeActive:""}>{energy.freeRemaining>0?`Bepul (${energy.freeRemaining})`:"Ertaga"}</strong></button>
  </section>;
}

const BRANDS=[{id:"uzcard",label:"UZCARD",color:"#1B5FAA"},{id:"humo",label:"HUMO",color:"#0FA36B"},{id:"visa",label:"VISA",color:"#1A1F71"},{id:"mastercard",label:"Mastercard",color:"#EB001B"}] as const;

function WithdrawCard({ gems }: { gems: number }) {
  const [brand,setBrand]=useState<string|null>(null),[card,setCard]=useState(""),[amount,setAmount]=useState(""),[notice,setNotice]=useState(false);
  const amountNum=Number(amount)||0,digits=card.replace(/\s/g,"").length,tooSmall=amountNum>0&&amountNum<50000,tooBig=amountNum>gems,ready=Boolean(brand)&&digits===16&&amountNum>0&&!tooSmall&&!tooBig;
  const selected=BRANDS.find(item=>item.id===brand);
  const cardChange=(value:string)=>setCard(value.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim());
  return <section className={styles.withdraw}><h2>GAVHARNI YECHISH</h2><div className={styles.withdrawCard}><header><i><MobileIcon name="arrow-up" size={16}/></i><span><strong>Kartaga o&apos;tkazish</strong><small>To&apos;plagan gavharlaringizni kartaga qaytarib oling. Karta turini tanlab, raqamini kiriting.</small></span></header><div className={styles.brands}>{BRANDS.map(item=><button className={brand===item.id?styles.brandOn:""} key={item.id} onClick={()=>{window.Telegram?.WebApp.HapticFeedback?.selectionChanged();setBrand(item.id);}} style={{"--brand":item.color} as CSSProperties} type="button"><MobileIcon name="card" size={15}/>{item.label}{brand===item.id?<MobileIcon name="checkmark-circle" size={15}/>:null}</button>)}</div>
    <label><small>Karta raqami</small><span className={digits===16?styles.fieldDone:""} style={{"--brand":selected?.color} as CSSProperties}><MobileIcon name="card" size={17}/><input inputMode="numeric" maxLength={19} onChange={event=>cardChange(event.target.value)} placeholder="0000 0000 0000 0000" value={card}/>{digits===16?<MobileIcon name="checkmark-circle" size={17}/>:null}</span></label>
    <label><small>Gavhar miqdori</small><div className={styles.amount}><span className={tooSmall||tooBig?styles.fieldBad:""}><MobileIcon name="diamond" size={17}/><input inputMode="numeric" onChange={event=>setAmount(event.target.value.replace(/\D/g,"").slice(0,9))} placeholder="0" value={amount}/></span><button onClick={()=>setAmount(String(gems))} type="button">Hammasi</button></div><em className={tooSmall||tooBig?styles.helperBad:""}>{tooBig?`Sizda ${gems.toLocaleString("en-US")} gavhar bor`:tooSmall?"Eng kami 50,000 gavhardan boshlanadi":`${amountNum.toLocaleString("en-US")} so'm olasiz`}</em></label>
    <button className={styles.withdrawSubmit} disabled={!ready} onClick={()=>{window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("warning");setNotice(true);}} type="button">So&apos;rov yuborish</button>{notice?<p><MobileIcon name="construct" size={15}/>Yechish hali ishlamaydi. Hech qanday so&apos;rov yuborilmadi.</p>:null}</div></section>;
}

export function ShopScreen() {
  const router=useRouter();
  const {request,updateUser,user}=useTelegramAuth();
  const [energy,setEnergy]=useState<EnergyState|null>(null),[passes,setPasses]=useState<GemPassList|null>(null),[loading,setLoading]=useState(true),[busy,setBusy]=useState(false),[unavailable,setUnavailable]=useState(false);
  const mounted=useRef(true);
  useEffect(()=>{
    mounted.current=true;
    return()=>{mounted.current=false;};
  },[]);
  const load=useCallback(async()=>{setLoading(true);const [energyResult,passResult]=await Promise.all([getEnergy(request).catch(()=>null),getGemPasses(request).catch(()=>{setUnavailable(true);return null;})]);if(!mounted.current)return;if(energyResult){setEnergy(energyResult);updateUser({energy:energyResult.energy,gems:energyResult.gems});}if(passResult){setPasses(passResult);setUnavailable(false);}setLoading(false);},[request,updateUser]);
  useEffect(()=>{void load();},[load]);
  const run=async(fn:()=>Promise<void>)=>{if(busy)return;setBusy(true);try{await fn();}catch(reason){const code=reason instanceof ApiError?reason.code:"UNKNOWN";window.alert(ERROR_COPY[code]??"Birozdan keyin qayta urinib ko'ring.");}finally{setBusy(false);}};
  const gems=passes?.gems??energy?.gems??user?.gems??0,isSuper=energy?.isSuper??Boolean(user?.isSuper),basePerDay=passes?.passes[0]?.perDay??0;
  const untilLabel=useMemo(()=>{if(!passes?.premiumUntil)return null;const date=new Date(passes.premiumUntil);return `${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,"0")}.${String(date.getDate()).padStart(2,"0")}`;},[passes?.premiumUntil]);
  const buy=(pass:GemPass)=>{if(!window.confirm(`${pass.gems.toLocaleString("en-US")} gavhar sarflab, ${pass.days} kunlik premium olasiz.`))return;void run(async()=>{const result=await redeemGemPass(request,pass.id);updateUser({gems:result.gems,isSuper:true,superExpiresAt:result.premiumUntil});window.alert(`Premium yana ${result.days} kunga uzaytirildi!`);await load();});};
  if(loading)return <main className={`${styles.page} ${styles.loading}`}><i/></main>;
  return <main className={styles.page}><header className={styles.header}><button aria-label="Yopish" onClick={()=>window.history.length>1?router.back():router.replace("/home")} type="button"><MobileIcon name="close" size={24}/></button><h1>Do&apos;kon</h1><span><MobileIcon name="diamond" size={16}/>{gems.toLocaleString("en-US")}</span></header><div className={styles.scroll}><GemHero gems={gems} premiumUntil={untilLabel}/><h2 className={styles.sectionLabel}>PREMIUM MUDDAT</h2><p className={styles.sectionDesc}>To&apos;plagan gavharlaringizga KORIO SUPER&apos;ni yana bir necha kun oling. Muddat uzoq bo&apos;lsa, kuniga arzonroq.</p>
    {unavailable?<div className={styles.retry}><MobileIcon name="cloud-offline-outline" size={26}/><p>Muddatlarni yuklab bo&apos;lmadi. Server javob bermayapti.</p><button onClick={()=>{setUnavailable(false);void load();}} type="button"><MobileIcon name="refresh" size={15}/>Qayta urinish</button></div>:passes?.passes.map((pass,index)=><PassCard basePerDay={basePerDay} busy={busy} featured={index===passes.passes.length-1} gems={gems} index={index} key={pass.id} onBuy={()=>buy(pass)} pass={pass}/>) }
    {passes&&passes.stackedDays>0?<p className={styles.stackNote}>Hozir {passes.stackedDays} kun to&apos;plangan (ko&apos;pi bilan {passes.maxStackDays} kun)</p>:null}<h2 className={`${styles.sectionLabel} ${styles.superLabel}`}>KORIO SUPER</h2><SuperCard active={isSuper} onClick={()=>router.push("/premium")}/>{!isSuper&&energy?<EnergySection busy={busy} energy={energy} gems={gems} onFree={()=>void run(async()=>{const result=await claimFreeEnergy(request);setEnergy(result);updateUser({energy:result.energy,gems:result.gems});})} onRefill={()=>void run(async()=>{const result=await refillEnergy(request);setEnergy(result);updateUser({energy:result.energy,gems:result.gems});})}/>:null}<WithdrawCard gems={gems}/></div></main>;
}
