"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { normalizeSpeakingWord, wordToneOf } from "../model/speaking";
import { useSpeakingPractice, type SpeakingError } from "../model/use-speaking-practice";
import { TopicIllustration } from "./topic-illustration";
import styles from "./speaking-practice-screen.module.css";

const COPY: Record<SpeakingError, string> = {
  assessError: "Talaffuzni tekshirib bo‘lmadi. Birozdan keyin qayta ayting.",
  audioError: "Ovozni ijro etib bo‘lmadi. Qayta bosing.",
  micError: "Mikrofonni yoqib bo‘lmadi. Qayta urinib ko‘ring.",
  noSpeech: "Ovozingiz aniq eshitilmadi. Mikrofonga yaqinroq kelib qayta ayting.",
  permission: "Gapirish mashqi uchun mikrofondan foydalanishga ruxsat bering.",
  saveFailed: "Saqlanmadi. Qayta bosing.",
  tooShort: "Biroz uzunroq gapiring. Jumlani oxirigacha ayting.",
  unsupported: "Ovoz yozish Android va iOS ilovasida ishlaydi. Bu yerda jumlalarni tinglashingiz mumkin.",
};

function RoundButton({ disabled = false, icon, label, onClick, selected = false }: {
  disabled?: boolean; icon: IoniconName; label: string; onClick: () => void; selected?: boolean;
}) {
  return <button aria-label={label} aria-pressed={selected} className={styles.roundButton} disabled={disabled} onClick={onClick} type="button"><MobileIcon name={icon} size={22} /></button>;
}

function MaskedPhrase({ hidden, onReveal, revealed, text }: { hidden: number[]; onReveal: (index: number) => void; revealed: number[]; text: string }) {
  return <div className={styles.maskedRow}>{text.split(/\s+/).filter(Boolean).map((word, index) => hidden.includes(index) && !revealed.includes(index)
    ? <button aria-label="Yashirilgan so‘z — ko‘rish uchun bosing" key={`${index}-${word}`} onClick={() => onReveal(index)} style={{ "--letters": Math.max(2, word.length) } as CSSProperties} type="button" />
    : <strong key={`${index}-${word}`}>{word}</strong>)}</div>;
}

export function SpeakingPracticeScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useTelegramAuth();
  const premium = Boolean(user?.isSuper && (!user.superExpiresAt || new Date(user.superExpiresAt).getTime() > Date.now()));
  const packCode = params.get("pack") ?? "";
  const practice = useSpeakingPractice(premium ? packCode : "");
  const [revealed, setRevealed] = useState<number[]>([]);
  const [meaningShown, setMeaningShown] = useState(false);
  const [exitAsking, setExitAsking] = useState(false);
  const { current, result, phase } = practice;

  useEffect(() => { setRevealed([]); setMeaningShown(false); }, [current?.id]);
  const recording = phase === "recording";
  const processing = phase === "assessing" || phase === "starting";
  const busy = phase !== "idle";
  const showResult = Boolean(result && phase !== "assessing");
  const progress = practice.completed ? 1 : practice.queue.length ? practice.index / practice.queue.length : 0;
  const close = () => {
    if (practice.current && !practice.completed) { practice.stopAll(); setExitAsking(true); return; }
    if (window.history.length > 1) router.back(); else router.replace("/speaking");
  };
  const leave = () => router.replace("/speaking");

  if (!premium) return (
    <main className={styles.screen}><section className={styles.empty}><span className={styles.emptyIcon}><MobileIcon name="lock-closed" size={34} /></span><h1>Bu mashq KORIO Premium bilan ochiladi</h1><p>Barcha gapirish mavzulari va talaffuz tekshiruvini oching.</p><button className={styles.primaryButton} onClick={() => router.replace("/premium")} type="button">KORIO Premium</button></section></main>
  );

  const title = practice.error ? "Yana bir mashq qilamizmi?" : recording ? "Sizni tinglayapman" : processing ? "Talaffuz tekshirilmoqda" : showResult
    ? result!.passed ? "Zo‘r, juda tushunarli!" : "Yana bir mashq qilamizmi?" : practice.speech.speaking ? "Jumla ohangiga quloq tuting" : "O‘z ovozingiz bilan aytasizmi?";
  const detail = practice.error ? COPY[practice.error] : recording ? "Gapirib bo‘lgach, o‘rtadagi tugmani yana bosing." : processing ? "Talaffuz va nutqingiz ravonligini tekshiryapmiz." : showResult
    ? "So‘zni bosib talaffuzini qayta eshiting." : practice.speech.speaking ? "Tugagach mikrofon ochiladi. Bemalol takrorlang." : "Avval tinglang, keyin mikrofonni bosib takrorlang.";

  return (
    <main className={styles.screen}>
      <header className={styles.headerWrap}>
        <div className={styles.header}>
          <RoundButton icon="close" label="Chiqish" onClick={close} />
          <div><small>GAPIRISH MASHQI</small><strong>{practice.data?.pack?.title || "SPEAKING STUDIO"}</strong></div>
          <span>{Math.min(practice.index + 1, practice.queue.length)} / {practice.queue.length}</span>
        </div>
        <div className={styles.progress}><i style={{ width: `${progress * 100}%` }} /></div>
      </header>

      {practice.loading ? <section className={styles.empty}><div className={styles.spinner} /><p>Bittadan jumla. O‘zingizga qulay tezlikda.</p></section> : practice.loadFailed || (!current && !practice.completed) ? (
        <section className={styles.empty}><span className={styles.emptyIcon}><MobileIcon name="chatbubble-ellipses-outline" size={34} /></span><h1>{practice.loadFailed ? "Mashqni tayyorlab bo‘lmadi" : "Hozircha mavzular yo‘q"}</h1><p>{practice.loadFailed ? "Mavzularni yuklab bo‘lmadi. Qayta urinib ko‘ring." : "Bu mavzuda hali mashq jumlalari yo‘q."}</p>{practice.loadFailed ? <button className={styles.primaryButton} onClick={practice.reload} type="button">Qayta urinish</button> : null}<button className={styles.textButton} onClick={() => router.replace("/speaking")} type="button">Boshqa mavzuni tanlash</button></section>
      ) : practice.completed ? (
        <section className={styles.summary}>
          <span className={styles.summaryArt}><TopicIllustration code={practice.data?.pack?.code || "greetings"} size={126} /><i><MobileIcon name="checkmark" size={26} /></i></span>
          <small>SPEAKING STUDIO</small><h1>Har bir jumla bilan<br />yanada ravonroq.</h1><p>{practice.summary.spoken ? "Ovoz chiqarib aytgan har bir jumla koreyschangizni mustahkamlaydi." : "Keyingi safar mikrofonni bosib, o‘zingiz aytib ko‘ring."}</p>
          <div className={styles.summaryStats}><span><b>{practice.summary.spoken}</b><small>Aytilgan jumlalar</small></span><i /><span><b>{practice.summary.average ?? "—"}</b><small>O‘rtacha talaffuz</small></span></div>
          {practice.summary.retryIds.length ? <button className={styles.primaryButton} onClick={() => practice.restart(true)} type="button"><MobileIcon name="refresh" size={19} /> Qiyin jumlalarni takrorlash</button> : null}
          <button className={styles.primaryButton} onClick={() => router.replace("/speaking")} type="button">Boshqa mavzuni tanlash <MobileIcon name="arrow-forward" size={19} /></button>
          <button className={styles.textButton} onClick={() => practice.restart()} type="button">Qayta boshlash</button>
        </section>
      ) : current ? (
        <>
          <section className={styles.body}>
            <article className={styles.phraseCard}>
              {practice.passFlash ? (
                <span className={styles.confetti}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src="/topik/success-confetti.svg" />
                </span>
              ) : null}
              {showResult && result!.passed ? <span className={styles.successPill}><MobileIcon name="checkmark" size={22} /></span> : null}
              <div className={styles.cardTop}><span className={`${styles.statusChip} ${showResult ? result!.passed ? styles.goodChip : styles.warmChip : ""}`}><MobileIcon name={showResult ? result!.passed ? "checkmark-circle" : "sparkles-outline" : "volume-medium-outline"} size={16} /> {showResult ? `Talaffuz ${Math.round(result!.scores.pron)}` : "Gapirish mashqi"}</span><RoundButton disabled={busy || practice.saving} icon={current.progress.isSaved ? "bookmark" : "bookmark-outline"} label={current.progress.isSaved ? "Saqlangan ibora" : "Iborani saqlash"} onClick={() => void practice.toggleSaved()} selected={current.progress.isSaved} /></div>
              <div className={styles.sentenceArea}>
                {practice.hidden && !showResult ? <button className={styles.hiddenPhrase} onClick={practice.toggleHidden} type="button"><i /><i /><small>Jumlani eslab ko‘ring</small></button> : showResult ? (
                  <p className={styles.korean}>{current.korean.split(/\s+/).map((word, index, words) => {
                    const assessed = result!.words.find((item) => normalizeSpeakingWord(item.word) === normalizeSpeakingWord(word));
                    const tone = assessed ? wordToneOf(assessed) : undefined;
                    return <button className={tone ? styles[tone] : undefined} key={`${index}-${word}`} onClick={() => practice.listen(false, word)} type="button">{word}{index < words.length - 1 ? " " : ""}</button>;
                  })}</p>
                ) : practice.mask.mode !== "none" ? <MaskedPhrase hidden={practice.mask.hidden} onReveal={(word) => setRevealed((value) => value.includes(word) ? value : [...value, word])} revealed={revealed} text={current.korean} /> : <p className={styles.korean}>{current.korean}</p>}
              </div>
              <div className={styles.meaningArea}><small>{practice.mask.hideMeaning && !showResult && !meaningShown ? "TINGLANG VA TAKRORLANG" : practice.hidden && !showResult ? "BUNI KOREYSCHA AYTING" : "MA’NOSI"}</small>{practice.mask.hideMeaning && !showResult && !meaningShown ? <button className={styles.meaningMask} onClick={() => setMeaningShown(true)} type="button"><MobileIcon name="headset-outline" size={15} /> Ma’nosini ko‘rish</button> : <p>{current.meaning}</p>}</div>
              <div className={styles.phraseTools}><button disabled={busy} onClick={() => practice.listen(true)} type="button"><MobileIcon name="speedometer-outline" size={16} /> Sekin tinglash</button><button onClick={practice.toggleHidden} type="button"><MobileIcon name={practice.hidden ? "eye" : "eye-off-outline"} size={16} /> {practice.hidden ? "Jumlani ko‘rish" : "Jumlani yashirish"}</button></div>
            </article>

            {showResult ? <div className={styles.metrics}>{(["accuracy", "fluency", "completeness"] as const).map((key) => <span key={key}><b>{Math.round(result!.scores[key])}</b><small>{key === "accuracy" ? "Aniqlik" : key === "fluency" ? "Ravonlik" : "To‘liqlik"}</small><i><em style={{ width: `${result!.scores[key]}%` }} /></i></span>)}</div> : current.usageNote ? <div className={styles.usageNote}><MobileIcon name="bulb-outline" size={16} /><span>{current.usageNote}</span></div> : null}
            {showResult && result!.transcript ? <p className={styles.transcript}>ESHITGANIMIZ · {result!.transcript}</p> : null}
            {practice.error ? <div className={`${styles.notice} ${practice.error === "noSpeech" ? styles.errorNotice : ""}`} role="alert"><MobileIcon name={practice.error === "noSpeech" ? "alert-circle" : "information-circle-outline"} size={18} /><span>{COPY[practice.error]}</span></div> : practice.saveNotice ? <div className={`${styles.notice} ${styles.savedNotice}`}><MobileIcon name="bookmark" size={16} /><span>Uni saqlangan iboralar ro‘yxatidan ham topasiz.</span></div> : null}
          </section>

          <footer className={styles.dock}>
            <div className={`${styles.status} ${recording ? styles.recordingStatus : showResult && result!.passed ? styles.successStatus : ""}`}><strong>{title}</strong><small>{detail}</small></div>
            <div className={styles.controls}>
              <span><RoundButton disabled={busy} icon={practice.speech.speaking ? "pause" : "headset-outline"} label="Tinglash" onClick={() => practice.listen()} /><small>Tinglash</small></span>
              <span className={styles.micWrap}><i className={`${styles.micRing} ${recording ? styles.activeMic : ""}`}><button aria-label={recording ? "Yozishni tugatish" : "Bosib gapiring"} disabled={phase === "assessing"} onClick={() => void practice.record()} type="button">{processing ? <span className={styles.buttonSpinner} /> : <MobileIcon name={recording ? "stop" : "mic"} size={34} />}</button></i><small>{recording ? "Yozishni tugatish" : showResult ? "Yana bir marta" : "Bosib gapiring"}</small></span>
              <span><RoundButton disabled={busy || practice.saving} icon="arrow-forward" label="Keyingi jumla" onClick={practice.next} /><small>{showResult ? practice.index === practice.queue.length - 1 ? "Mashqni tugatish" : "Keyingi jumla" : "O‘tkazish"}</small></span>
            </div>
            {recording ? <div className={styles.wave}>{[8,15,23,12,28,19,34,19,28,12,23,15,8].map((height,index) => <i key={index} style={{ "--height": `${height}px`, "--level": Math.max(.22, practice.level) } as CSSProperties} />)}</div> : <p className={styles.privacy}>Gap o‘qilgach mikrofon o‘zi ochiladi</p>}
          </footer>
        </>
      ) : null}

      {exitAsking ? <div className={styles.modalBackdrop} role="presentation" onClick={() => setExitAsking(false)}><section aria-modal="true" className={styles.modal} onClick={(event) => event.stopPropagation()} role="dialog"><span><MobileIcon name="mic-off-outline" size={30} /><i><MobileIcon name="pause" size={12} /></i></span><h2>Biroz tanaffus qilasizmi?</h2><p>Saqlangan iboralar qoladi. Keyingi safar mavzuni boshidan boshlashingiz mumkin.</p><button onClick={() => setExitAsking(false)} type="button"><MobileIcon name="mic" size={17} /> Davom etish</button><button onClick={leave} type="button">Chiqish</button></section></div> : null}
    </main>
  );
}
