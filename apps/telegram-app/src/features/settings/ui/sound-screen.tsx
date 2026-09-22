"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useSoundPreferences } from "../model/preferences";
import styles from "./settings-detail.module.css";

interface SpeechVoice {
  displayName: string;
  gender: "female" | "male";
  localName: string;
  shortName: string;
}

const SAMPLE = "안녕하세요";

function goBack(router: ReturnType<typeof useRouter>) {
  if (window.history.length > 1) router.back();
  else router.replace("/settings");
}

function Card({ children, muted = false, top = false }: { children: ReactNode; muted?: boolean; top?: boolean }) {
  return <section className={`${styles.card} ${top ? styles.topCard : ""} ${muted ? styles.disabled : ""}`}>{children}</section>;
}

function Icon({ background, color, name }: { background: string; color: string; name: IoniconName }) {
  return <i className={styles.iconSquare} style={{ backgroundColor: background, color }}><MobileIcon name={name} size={20} /></i>;
}

function Switch({ value, onChange }: { value: boolean; onChange: (value: boolean) => void }) {
  return <button aria-checked={value} className={`${styles.toggle} ${value ? styles.toggleOn : ""}`} onClick={() => {
    window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
    onChange(!value);
  }} role="switch" type="button"><i /></button>;
}

function ToggleRow({ icon, color, background, label, description, value, onChange }: { icon: IoniconName; color: string; background: string; label: string; description: string; value: boolean; onChange: (value: boolean) => void }) {
  return <div className={styles.row}><Icon background={background} color={color} name={icon} /><span className={styles.rowText}><b>{label}</b><small>{description}</small></span><Switch onChange={onChange} value={value} /></div>;
}

function SliderRow({ icon, color, background, label, badge, value, min = 0, max = 1, step = .05, onChange, onCommit }: { icon: IoniconName; color: string; background: string; label: string; badge: string; value: number; min?: number; max?: number; step?: number; onChange: (value: number) => void; onCommit?: (value: number) => void }) {
  return <div className={styles.sliderRow}><div><Icon background={background} color={color} name={icon} /><b>{label}</b><span style={{ backgroundColor: background, color }}>{badge}</span></div><input aria-label={label} max={max} min={min} onChange={(event) => onChange(Number(event.target.value))} onPointerUp={(event) => onCommit?.(Number(event.currentTarget.value))} step={step} style={{ accentColor: color }} type="range" value={value} /></div>;
}

function playTone(volume: number, frequency: number) {
  const AudioContextConstructor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextConstructor || volume <= 0) return;
  const context = new AudioContextConstructor();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(Math.min(1, volume) * .16, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .12);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + .12);
  oscillator.onended = () => void context.close();
}

export function SoundScreen() {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const { value: sound, patch, ready, reset } = useSoundPreferences();
  const { speak, speaking, stop } = useKoreanSpeech(request);
  const [muted, setMutedState] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voices, setVoices] = useState<SpeechVoice[]>([]);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const [voiceError, setVoiceError] = useState(false);
  const [previewVoice, setPreviewVoice] = useState<string | null>(null);
  const initialMuteApplied = useRef(false);

  useEffect(() => {
    if (!ready || initialMuteApplied.current) return;
    initialMuteApplied.current = true;
    const initialMuted =
      window.sessionStorage.getItem("korio-muted") === "true" ||
      sound.startMuted;
    setMutedState(initialMuted);
    window.sessionStorage.setItem("korio-muted", String(initialMuted));
  }, [ready, sound.startMuted]);

  const setMuted = (value: boolean) => {
    setMutedState(value);
    window.sessionStorage.setItem("korio-muted", String(value));
  };

  const selectedVoiceLabel = useMemo(
    () => voices.find((voice) => voice.shortName === sound.speechVoice)?.localName ?? sound.speechVoice.replace(/^ko-KR-/, "").replace(/Neural$/, ""),
    [sound.speechVoice, voices],
  );
  const preview = (voice = sound.speechVoice, rate = sound.speechRate, volume = sound.speechVolume) => speak(SAMPLE, { onEnd: () => setPreviewVoice(null), rate, respectSoundSettings: false, voice, volume });

  const loadVoices = async () => {
    setLoadingVoices(true);
    setVoiceError(false);
    try { setVoices(await request<SpeechVoice[]>("/tts/voices")); }
    catch { setVoiceError(true); }
    finally { setLoadingVoices(false); }
  };

  const openVoices = () => {
    setVoiceOpen(true);
    if (!voices.length && !loadingVoices) void loadVoices();
  };
  const closeVoices = () => {
    stop();
    setPreviewVoice(null);
    setVoiceOpen(false);
  };
  const percent = (value: number) => `${Math.round(value * 100)}%`;
  const rateLabel = sound.speechRate <= .75 ? "Sekin" : sound.speechRate >= 1.05 ? "Tez" : "O‘rtacha";

  return <main className={styles.screen}>
    <header className={styles.header}><button aria-label="Orqaga" onClick={() => goBack(router)} type="button"><MobileIcon name="chevron-back" size={28} /></button><h1>Ovoz va effektlar</h1></header>
    <div className={styles.scroll}>
      <Card top><ToggleRow background="#FFE0EC" color="#FF7AAD" description="Faqat shu seans uchun ovozsiz" icon={muted ? "volume-mute" : "volume-high"} label="Ovozni o‘chirish" onChange={setMuted} value={muted} /></Card>
      <h2>Ovoz balandligi</h2>
      <Card muted={muted}>
        <SliderRow background="#D5F0F5" badge={percent(sound.speechVolume)} color="#45B7D1" icon="mic" label="Nutq" onChange={(speechVolume) => patch({ speechVolume })} onCommit={(value) => value > 0 && preview(sound.speechVoice, sound.speechRate, value)} value={sound.speechVolume} />
        <i className={styles.divider} />
        <SliderRow background="#D7F5E5" badge={percent(sound.sfxVolume)} color="#1DBB7F" icon="musical-notes" label="Effektlar" onChange={(sfxVolume) => patch({ sfxVolume })} onCommit={(value) => playTone(value, 660)} value={sound.sfxVolume} />
        <i className={styles.divider} />
        <SliderRow background="#FFF4D6" badge={percent(sound.keyVolume)} color="#F4B860" icon="keypad" label="Tugma ovozi" onChange={(keyVolume) => patch({ keyVolume })} onCommit={(value) => playTone(value, 420)} value={sound.keyVolume} />
      </Card>
      {muted ? <p className={styles.mutedHint}>Ovoz o‘chirilgan, lekin sozlamadagi namunalar ijro etiladi.</p> : null}
      <h2>Nutq</h2>
      <Card>
        <button className={styles.actionRow} onClick={openVoices} type="button"><Icon background="#FFE0EC" color="#E85D97" name="people" /><span className={styles.rowText}><b>Ovoz</b><small>Koreyscha so‘zlovchini tanlang</small></span><em>{selectedVoiceLabel}<MobileIcon name="chevron-forward" size={18} /></em></button>
        <i className={styles.divider} />
        <SliderRow background="#EBE5FA" badge={rateLabel} color="#A78BFA" icon="speedometer" label="Nutq tezligi" max={1.2} min={.5} onChange={(speechRate) => patch({ speechRate })} onCommit={(value) => preview(sound.speechVoice, value)} step={.05} value={sound.speechRate} />
        <div className={styles.previewWrap}><button onClick={() => { window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light"); preview(); }} type="button"><MobileIcon name="play" size={16} /> Tinglash · {SAMPLE}</button></div>
        <i className={styles.divider} />
        <ToggleRow background="#FFE3D6" color="#FF7043" description="Savol chiqishi bilan o‘qib beramiz" icon="play-circle" label="Avtomatik o‘qish" onChange={(autoPlay) => patch({ autoPlay })} value={sound.autoPlay} />
      </Card>
      <h2>Tebranish</h2>
      <Card><ToggleRow background="#E7E0F7" color="#7E57C2" description="Tugma yoki klaviatura bosilganda" icon="finger-print" label="Bosganda tebranish" onChange={(keyHaptics) => { patch({ keyHaptics }); if (keyHaptics) window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light"); }} value={sound.keyHaptics} /><i className={styles.divider} /><ToggleRow background="#FCEFC7" color="#E2A83A" description="To‘g‘ri javob berganda yoki mukofot olganda" icon="trophy" label="To‘g‘ri javob · mukofot tebranishi" onChange={(rewardHaptics) => { patch({ rewardHaptics }); if (rewardHaptics) window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success"); }} value={sound.rewardHaptics} /></Card>
      <h2>Boshqa</h2>
      <Card><ToggleRow background="#ECECEE" color="#A8A8B0" description="Ilova har safar ovozsiz ochiladi" icon="moon" label="Ovozsiz ishga tushirish" onChange={(startMuted) => patch({ startMuted })} value={sound.startMuted} /></Card>
      <button className={styles.reset} onClick={() => { reset(); setMuted(false); window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success"); }} type="button"><MobileIcon name="refresh" size={17} /> Standart holatga qaytarish</button>
    </div>
    {voiceOpen ? <div className={styles.modal}><button aria-label="Yopish" onClick={closeVoices} type="button" /><section className={`${styles.sheet} ${styles.voiceSheet}`}><i className={styles.grabber} /><header><span><h2>Ovozni tanlang</h2><p>Ovozlarni tinglab ko‘ring va darslarda eshitmoqchi bo‘lganingizni tanlang.</p></span><button aria-label="Yopish" onClick={closeVoices} type="button"><MobileIcon name="close" size={23} /></button></header>{loadingVoices ? <div className={styles.voiceState}><i className={styles.spinner} />Koreyscha ovozlar yuklanmoqda...</div> : voiceError ? <div className={styles.voiceState}><MobileIcon name="cloud-offline-outline" size={30} />Ovozlar ro‘yxatini yuklab bo‘lmadi.<button onClick={() => void loadVoices()} type="button">Qayta urinish</button></div> : <div className={styles.voiceList}>{voices.map((voice) => {
      const selected = voice.shortName === sound.speechVoice;
      const previewing = previewVoice === voice.shortName && speaking;
      return <button className={selected ? styles.selectedVoice : ""} key={voice.shortName} onClick={() => { window.Telegram?.WebApp.HapticFeedback?.selectionChanged(); patch({ speechVoice: voice.shortName }); }} type="button"><i style={{ backgroundColor: voice.gender === "female" ? "#FFE0EC" : "#DDEBFF", color: voice.gender === "female" ? "#E85D97" : "#4E88D8" }}><MobileIcon name="person" size={20} /></i><span><b>{voice.localName}</b>{selected ? <em>Tanlangan</em> : null}<small>{voice.gender === "female" ? "Ayol" : "Erkak"} · {voice.displayName}</small></span><i className={previewing ? styles.previewing : styles.voicePlay} onClick={(event) => {
        event.stopPropagation();
        if (previewing) { stop(); setPreviewVoice(null); }
        else { setPreviewVoice(voice.shortName); preview(voice.shortName); }
      }}><MobileIcon name={previewing ? "stop" : "play"} size={17} /></i></button>;
    })}</div>}</section></div> : null}
  </main>;
}
