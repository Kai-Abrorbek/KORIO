"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { getPronunciationScores } from "../api/pronunciation";
import {
  correctNeededFor,
  HARD_UNLOCK_SCORE,
  levelTotal,
  PRON_DATA,
  PRON_LEVELS,
  STAGE_PASS_SCORE,
  type PronLevel,
  type PronStage,
} from "../data/pronunciation";
import styles from "./pronunciation-practice-screen.module.css";

const STORY: Record<PronLevel,string> = {
  lv1: "Haneulmonning birinchi buyurtmasi",
  lv2: "Haneulmonning bozorga sayohati",
  lv3: "Haneulmon yo'l qidirmoqda",
  lv4: "Haneulmonning birinchi chiqishi",
};
const FOCUS: Record<PronLevel,string> = {
  lv1: "Oddiy vs kuchli undoshlar",
  lv2: "Oddiy vs qattiq undoshlar",
  lv3: "Chalkash unlilar",
  lv4: "So'z oxiridagi undoshlar",
};
const scoreKey = (level:PronLevel,step:number,mode:"easy"|"hard") => `${level}:${step}:${mode}`;

function Bubble({ text,word }: { text:string; word:string }) {
  const parts=text.split("{0}");
  return <p>{parts[0]}<strong>{word}</strong>{parts[1]}</p>;
}

function Mode({ enabled,label,onStart,score }: { enabled:boolean; label:string; onStart:()=>void; score:number|undefined }) {
  return <div className={styles.mode}><header><strong className={!enabled ? styles.disabledLabel : ""}>{label}</strong><span className={score !== undefined ? styles.hasScore : ""}>{score ?? "--"}</span></header><i/><button className={enabled ? "" : styles.lockedStart} onClick={onStart} type="button">{enabled ? "START" : <MobileIcon name="lock-closed" size={18}/>}</button></div>;
}

export function PronunciationPracticeScreen() {
  const router=useRouter();
  const { request }=useTelegramAuth();
  const [tab,setTab]=useState<PronLevel>("lv1");
  const [expanded,setExpanded]=useState<number|null>(1);
  const [lockAlert,setLockAlert]=useState<PronStage|null>(null);
  const [scores,setScores]=useState<Record<string,number>|null>(null);
  const [status,setStatus]=useState<"error"|"loading"|"ready">("loading");
  const requestId=useRef(0);

  const loadScores=useCallback(() => {
    const id=++requestId.current;
    setStatus("loading");
    void getPronunciationScores(request).then((response) => {
      if(requestId.current!==id) return;
      setScores(response.scores ?? {});
      setStatus("ready");
    }).catch(() => {
      if(requestId.current!==id) return;
      setScores(null);
      setStatus("error");
    });
  },[request]);

  useEffect(() => {
    loadScores();
    return () => { requestId.current += 1; };
  },[loadScores]);

  const data=PRON_DATA[tab];
  const total=levelTotal(tab);
  const practiced=scores ? data.stages.reduce((count,stage) => count + (Object.hasOwn(scores,scoreKey(tab,stage.step,"easy")) ? 1 : 0) + (Object.hasOwn(scores,scoreKey(tab,stage.step,"hard")) ? 1 : 0),0) : 0;
  const percent=total ? Math.round(practiced/total*100) : 0;
  const open=(stage:PronStage,mode:"easy"|"hard") => {
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
    router.push(`/pronunciation-quiz?level=${tab}&step=${stage.step}&mode=${mode}`);
  };
  const startHard=(stage:PronStage) => {
    if(status!=="ready" || !scores) return;
    if((scores[scoreKey(tab,stage.step,"easy")] ?? 0)<HARD_UNLOCK_SCORE){ window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("warning"); setLockAlert(stage); return; }
    open(stage,"hard");
  };

  return <main className={styles.screen}>
    <header className={styles.top}><button aria-label="Orqaga" onClick={() => router.back()} type="button"><MobileIcon name="chevron-back" size={28}/></button><h1>Talaffuz mashqi</h1></header>
    <nav className={styles.tabs}>{PRON_LEVELS.map((level) => <button className={tab===level ? styles.activeTab : ""} key={level} onClick={() => { window.Telegram?.WebApp.HapticFeedback?.selectionChanged(); setTab(level); setExpanded(1); }} type="button">{level.replace("lv","Lv.")}<i/></button>)}</nav>
    <div className={styles.content}>
      <section className={styles.banner}><div><h2>{STORY[tab]}</h2><p>{FOCUS[tab]}</p><i><b style={{ width: status==="ready" ? `${percent}%` : 0 }}/></i>{status==="error" ? <button onClick={loadScores} type="button"><MobileIcon name="refresh" size={14}/> {"Saqlangan natijani yuklab bo'lmadi"}</button> : null}</div><span className={status==="ready" && percent>0 ? styles.ringOn : ""}><strong>{status==="ready" ? <>{percent}<small>%</small></> : status==="error" ? "!" : "…"}</strong><small>{status==="ready" ? practiced : "--"}/{total}</small></span></section>
      {data.stages.map((stage) => {
        const isOpen=expanded===stage.step;
        const easy=scores?.[scoreKey(tab,stage.step,"easy")];
        const hard=scores?.[scoreKey(tab,stage.step,"hard")];
        const hardOpen=(easy ?? 0)>=HARD_UNLOCK_SCORE;
        const cleared=(easy ?? 0)>=STAGE_PASS_SCORE && (hard ?? 0)>=STAGE_PASS_SCORE;
        return <article className={styles.stageCard} key={`${tab}-${stage.step}`}><button className={styles.stageHead} onClick={() => setExpanded(isOpen ? null : stage.step)} type="button"><div><span>{stage.step}-bosqich</span>{cleared ? <MobileIcon name="checkmark-circle" size={20}/> : null}<p><strong>{stage.a}</strong><i>vs</i><strong>{stage.b}</strong><b>{stage.pos==="front" ? "So'z boshida" : "So'z oxirida"}</b></p></div><em><MobileIcon name={isOpen ? "chevron-up" : "chevron-down"} size={22}/></em></button>{isOpen ? <div className={styles.stageBody}><section className={styles.scene}><div><div><Bubble text={stage.leftBubble} word={stage.leftWord}/><i/></div><div><Bubble text={stage.rightBubble} word={stage.rightWord}/><i/></div></div><aside><span>🐡</span><span>🍽️</span><span>🦖</span></aside></section><section className={styles.modes}><Mode enabled label="EASY" onStart={() => open(stage,"easy")} score={easy}/><i/><Mode enabled={hardOpen} label="HARD" onStart={() => startHard(stage)} score={hard}/></section></div> : null}</article>;
      })}
    </div>
    {lockAlert ? <div className={styles.modal} onClick={() => setLockAlert(null)} role="presentation"><section onClick={(event) => event.stopPropagation()}><span><MobileIcon name="lock-closed" size={26}/></span><p>{(() => { const count=correctNeededFor(tab,lockAlert.step,HARD_UNLOCK_SCORE); return `EASY'da ${count.total} tadan ${count.need} tasini to'g'ri qilsangiz HARD ochiladi. (${HARD_UNLOCK_SCORE} ball)`; })()}</p><button onClick={() => setLockAlert(null)} type="button">OK</button></section></div> : null}
  </main>;
}
