"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { savePronunciationScore } from "../api/pronunciation";
import { glossOf } from "../data/pronunciation-gloss";
import {
  correctNeededFor,
  findStage,
  HARD_UNLOCK_SCORE,
  PRON_LEVELS,
  stageQuestionPlan,
  STAGE_PASS_SCORE,
  type PronLevel,
  type PronOption,
} from "../data/pronunciation";
import styles from "./pronunciation-quiz-screen.module.css";

interface Option { ipa:string; meaning:string; word:string }
interface Question { answer:0|1; options:[Option,Option] }
const optionOf=(option:PronOption):Option => ({ ipa:option.jamo,meaning:glossOf(option.word,"uz"),word:option.word });
const questionOf=(pair:[PronOption,PronOption],answer:0|1):Question => {
  const swap=Math.random()<.5;
  const [left,right]=swap ? [pair[1],pair[0]] : pair;
  return { options:[optionOf(left),optionOf(right)],answer:(swap ? 1-answer : answer) as 0|1 };
};

function OptionCard({ disabled,hideJamo,onPick,onSpeak,option,result,revealed }: {
  disabled:boolean; hideJamo:boolean; onPick:()=>void; onSpeak:()=>void; option:Option;
  result:"correct"|"wrong"|null; revealed:boolean;
}) {
  const symbols=["c","!","?","*","'",",","c","!","?","•","*","'"];
  return <div className={styles.cardOuter}>{result ? <span className={`${styles.badge} ${result===`correct` ? styles.badgeCorrect : styles.badgeWrong}`}><MobileIcon name={result==="correct" ? "ellipse-outline" : "close"} size={26}/></span> : null}<div className={`${styles.cardBox} ${revealed ? styles.revealed : ""}`}><button aria-label={option.word} className={styles.cardSelect} disabled={disabled} onClick={onPick} type="button"><span className={styles.cardBack}>{symbols.map((symbol,index) => <i key={index}>{symbol}</i>)}</span><span className={`${styles.cardFront} ${result ? styles[result] : ""}`}><span><strong>{option.word}</strong>{!hideJamo ? <i>[ {option.ipa} ]</i> : null}<small>{option.meaning}</small></span><em/><b><MobileIcon name="mic" size={20}/> Talaffuz qilish</b></span></button>{hideJamo || disabled ? <button aria-label={`${option.word} tinglash`} className={styles.cardSpeaker} onClick={onSpeak} type="button"><MobileIcon name="volume-medium" size={26}/></button> : null}</div></div>;
}

export function PronunciationQuizScreen() {
  const router=useRouter();
  const params=useSearchParams();
  const { request }=useTelegramAuth();
  const rawLevel=params.get("level") ?? "lv1";
  const level=(PRON_LEVELS.includes(rawLevel as PronLevel) ? rawLevel : "lv1") as PronLevel;
  const rawStep=Number(params.get("step") ?? 1);
  const step=Number.isInteger(rawStep) ? rawStep : 1;
  const hard=params.get("mode")==="hard";
  const valid=Boolean(findStage(level,step));
  const { prewarm,speak,stop }=useKoreanSpeech(request);
  const [questions,setQuestions]=useState<Question[]|null>(null);
  const [index,setIndex]=useState(0);
  const [selected,setSelected]=useState<number|null>(null);
  const [results,setResults]=useState<Array<boolean|null>>([]);
  const [finished,setFinished]=useState(false);
  const [saveStatus,setSaveStatus]=useState<"error"|"idle"|"saved"|"saving">("idle");
  const secondTimer=useRef<number|null>(null);
  const correctTimer=useRef<number|null>(null);
  const saveRequest=useRef(0);

  useEffect(() => {
    if(!valid){ router.replace("/pronunciation-practice"); return; }
    const next=stageQuestionPlan(level,step).map((item) => questionOf(item.pair,item.answer));
    setQuestions(next); setResults(Array(next.length).fill(null)); setIndex(0); setSelected(null); setFinished(false); setSaveStatus("idle");
  },[level,router,step,valid]);

  const clearTimers=useCallback(() => {
    if(secondTimer.current!==null) window.clearTimeout(secondTimer.current);
    if(correctTimer.current!==null) window.clearTimeout(correctTimer.current);
    secondTimer.current=null; correctTimer.current=null;
  },[]);
  const question=questions?.[index];
  const target=question?.options[question.answer];
  const speakOptions=useCallback(() => {
    if(!question || !target) return;
    clearTimers(); stop();
    if(hard){ speak(target.word); return; }
    speak(question.options[0].word,{ onEnd:() => { secondTimer.current=window.setTimeout(() => { secondTimer.current=null; speak(question.options[1].word); },60); } });
  },[clearTimers,hard,question,speak,stop,target]);

  useEffect(() => {
    if(!question || !questions) return;
    setSelected(null);
    prewarm(question.options.map((item) => item.word));
    const upcoming=questions.slice(index+1,index+3).flatMap((item) => item.options.map((option) => option.word));
    if(upcoming.length) prewarm([...new Set(upcoming)]);
    const timer=window.setTimeout(speakOptions,60);
    return () => { window.clearTimeout(timer); clearTimers(); stop(); };
  },[clearTimers,index,prewarm,question,questions,speakOptions,stop]);

  const pick=(choice:number) => {
    if(selected!==null || !question || !target) return;
    const correct=choice===question.answer;
    setSelected(choice);
    setResults((current) => { const next=[...current]; next[index]=correct; return next; });
    if(correct) correctTimer.current=window.setTimeout(() => { correctTimer.current=null; speak(target.word); },180);
  };
  const next=() => {
    clearTimers(); stop();
    if(!questions) return;
    if(index>=questions.length-1){ setFinished(true); return; }
    setIndex((current) => current+1);
  };
  const correctCount=results.filter((result) => result===true).length;
  const score=questions?.length ? Math.round(correctCount/questions.length*100) : 0;
  const saveResult=useCallback(() => {
    if(!questions?.length) return;
    const id=++saveRequest.current;
    setSaveStatus("saving");
    void savePronunciationScore(request,{ level,step,mode:hard ? "hard" : "easy",score }).then(() => { if(saveRequest.current===id) setSaveStatus("saved"); }).catch(() => { if(saveRequest.current===id) setSaveStatus("error"); });
  },[hard,level,questions?.length,request,score,step]);
  useEffect(() => { if(finished) saveResult(); },[finished,saveResult]);
  useEffect(() => () => { saveRequest.current+=1; clearTimers(); },[clearTimers]);

  if(!questions || !question || !target) return <main className={styles.loading}><i/></main>;
  if(finished){
    const passed=score>=STAGE_PASS_SCORE;
    const hardOpen=score>=HARD_UNLOCK_SCORE;
    const { need }=correctNeededFor(level,step,HARD_UNLOCK_SCORE);
    const mood=hardOpen ? "celebrating" : passed ? "great" : "confused";
    return <main className={styles.result}><section><Image alt="Haneulmon" height={112} src={`/characters/hangulmon_${mood}.png`} width={112}/><h1>{score}</h1><p>{`${questions.length} tadan ${correctCount} ta to'g'ri`}</p><small>Har savol {(100/questions.length).toFixed(1)} ball</small><aside className={hardOpen ? styles.unlocked : ""}><MobileIcon name={hardOpen ? "lock-open" : "lock-closed"} size={16}/><span>{hard ? "HARD ham tugadi. Bosqich yakunlandi!" : hardOpen ? "HARD rejim ochildi!" : `HARD uchun kamida ${need} ta to'g'ri topish kerak`}</span></aside><div className={styles.saveStatus}>{saveStatus==="saving" ? <><i/> Natijangiz saqlanmoqda…</> : saveStatus==="saved" ? <><MobileIcon name="checkmark-circle" size={20}/> Natijangiz saqlandi</> : saveStatus==="error" ? <><MobileIcon name="alert-circle" size={20}/><span>{"Natijangizni saqlab bo'lmadi"}</span><button onClick={saveResult} type="button">Qayta saqlash</button></> : null}</div><button className={styles.done} disabled={saveStatus!=="saved"} onClick={() => router.back()} type="button">Tayyor</button></section></main>;
  }

  return <main className={styles.screen}>
    <header className={styles.header}><button aria-label="Orqaga" onClick={() => router.back()} type="button"><MobileIcon name="chevron-back" size={30}/></button><div className={styles.dots}>{results.map((result,dotIndex) => <i className={`${result===null && dotIndex===index ? styles.currentDot : ""} ${result===true ? styles.dotCorrect : result===false ? styles.dotWrong : ""}`} key={dotIndex}>{result===true ? <MobileIcon name="ellipse-outline" size={15}/> : result===false ? <MobileIcon name="close" size={15}/> : null}</i>)}</div><span className={hard ? styles.hardChip : ""}>{hard ? "HARD" : "EASY"}</span></header>
    <section className={styles.target}>{hard ? <><MobileIcon name="volume-high" size={52}/><strong>Eshiting va tanlang</strong></> : <><h1>{target.word}</h1><p>[ {target.ipa} ]</p></>}</section>
    <h2 className={styles.question}>{"Qaysi so'zni eshitdingiz?"}</h2>
    <section className={styles.options}>{question.options.map((option,optionIndex) => <OptionCard disabled={selected!==null} hideJamo={hard} key={`${index}-${optionIndex}`} onPick={() => pick(optionIndex)} onSpeak={() => speak(option.word)} option={option} result={selected===optionIndex ? optionIndex===question.answer ? "correct" : "wrong" : null} revealed={hard || selected!==null}/>)}</section>
    <footer className={styles.bottom}><button type="button"><span><MobileIcon name="play" size={16}/></span>Dars</button><button aria-label="Qayta tinglash" className={styles.replay} onClick={speakOptions} type="button"><MobileIcon name="volume-high" size={36}/></button><button disabled={selected===null} onClick={next} type="button"><MobileIcon name="play" size={26}/>Keyingi</button></footer>
  </main>;
}
