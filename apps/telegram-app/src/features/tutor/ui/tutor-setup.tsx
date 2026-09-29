"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";

import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import { VoiceTutorApi, type AuthenticatedRequest } from "../api/voice-tutor";
import type {
  VoiceTutorOptions,
  VoiceTutorPersonality,
  VoiceTutorQuota,
  VoiceTutorSettings,
  VoiceTutorTopicCard,
  VoiceTutorVoice,
} from "../model/voice-tutor";
import { LEVEL_LABELS, PERSONALITY_LABELS, STYLE_LABELS, tutorErrorText } from "./tutor-labels";
import styles from "./tutor-setup.module.css";

const LANG_FLAG: Record<string, string> = { uz: "🇺🇿", ru: "🇷🇺", en: "🇺🇸", ko: "🇰🇷" };

/** 우즈벡어 사용자가 기본이다 (모바일과 같은 순서) */
const LANG_ORDER = ["uz", "ru", "en", "ko"];

/** 목소리 카드 색. 서버 목소리엔 색이 없어서 순서대로 입힌다 */
const VOICE_COLORS = ["#776ee2", "#F06A8E", "#3FA7D6", "#2FA96A", "#FFA726"];

const PERSONALITIES: VoiceTutorPersonality[] = ["friendly", "close_friend", "savage", "chaotic_savage"];

const PERSONALITY_EMOJI: Record<VoiceTutorPersonality, string> = {
  friendly: "🌿",
  close_friend: "🤙",
  savage: "🔥",
  chaotic_savage: "💥",
};

const ADDRESS_EXAMPLE: Record<string, string> = {
  polite: "좋아요, 다시 한번 해볼까요?",
  casual: "좋아, 다시 한번 해보자!",
};

export const TOPIC_ICONS: Record<string, IoniconName> = {
  airplane: "airplane",
  basket: "basket",
  briefcase: "briefcase",
  cafe: "cafe",
  calendar: "calendar",
  card: "card",
  "fast-food": "fast-food",
  home: "home",
  medkit: "medkit",
  "musical-notes": "musical-notes",
  navigate: "navigate",
  "partly-sunny": "partly-sunny",
  people: "people",
  person: "person",
  restaurant: "restaurant",
  sunny: "sunny",
};

interface TutorSetupProps {
  busy: boolean;
  error: string | null;
  onChange: (key: keyof VoiceTutorSettings, value: string) => void;
  onClose: () => void;
  onPreview: (voice: VoiceTutorVoice) => void;
  onStart: (topic: VoiceTutorTopicCard | null) => void;
  onUpsell: () => void;
  options: VoiceTutorOptions;
  previewVoiceId: string | null;
  /** 서버 한도. null 이면 아직 모름 (시작은 막지 않는다 — 서버가 다시 본다) */
  quota: VoiceTutorQuota | null;
  request: AuthenticatedRequest;
  settings: VoiceTutorSettings;
}

/**
 * 새 Voice Tutor 설정 한 페이지 — 모바일 VoiceTutorSetupScreen.
 *
 *   수업 언어 → 선생님(목소리) → 말투 → 성격 → 한국어 수준 → 주제 → 시작
 *
 * 설정은 서버(voice_tutor_settings)가 기억한다. 주제만 매번 새로 고른다.
 */
export function TutorSetup(p: TutorSetupProps) {
  const [topics, setTopics] = useState<VoiceTutorTopicCard[] | null>(null);
  const [failed, setFailed] = useState(false);
  /** null = 자유 대화 */
  const [topicId, setTopicId] = useState<string | null>(null);

  const load = useCallback(() => {
    setFailed(false);
    VoiceTutorApi.topics(p.request)
      .then((result) => setTopics(result.topics ?? []))
      .catch(() => setFailed(true));
  }, [p.request]);

  useEffect(load, [load]);

  const pick = (key: keyof VoiceTutorSettings, value: string) => {
    window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
    p.onChange(key, value);
  };

  const languages = [...p.options.explanationLanguages]
    .filter((language) => language.enabled !== false)
    .sort((a, b) => LANG_ORDER.indexOf(a.id) - LANG_ORDER.indexOf(b.id));
  const voices = p.options.voices.filter((voice) => voice.enabled !== false);
  const personalities = p.options.personalities?.length ? p.options.personalities : PERSONALITIES;
  const levels = p.options.koreanLevels ?? ["beginner", "intermediate", "advanced"];

  const voice = voices.find((item) => item.id === p.settings.voiceId) ?? null;
  const topic = topics?.find((item) => item.id === topicId) ?? null;
  const exhausted = Boolean(p.quota && p.quota.allowedSec <= 0);
  const canStart = Boolean(voice) && !p.busy && !exhausted;
  const errorText = tutorErrorText(p.error);

  const header = (
    <header className={styles.header}>
      <button aria-label="Yopish" className={styles.iconButton} onClick={p.onClose} type="button">
        <MobileIcon name="chevron-down" size={26} />
      </button>
      <h1>AI koreys tili ustozi</h1>
      <i className={styles.iconButton} />
    </header>
  );

  if (failed) {
    return (
      <main className={styles.screen}>
        {header}
        <div className={styles.center}>
          <p className={styles.errorText}>Yuklab bo&apos;lmadi. Birozdan so&apos;ng urinib ko&apos;ring</p>
          <button className={styles.retry} onClick={load} type="button">Qayta urinish</button>
        </div>
      </main>
    );
  }

  if (!topics) {
    return (
      <main className={styles.screen}>
        {header}
        <div className={styles.center}>
          <span className={styles.spinner} />
        </div>
      </main>
    );
  }

  const groups = [
    { key: "korea", title: "Koreyada hayot", items: topics.filter((item) => item.category === "korea") },
    { key: "daily", title: "Kundalik suhbat", items: topics.filter((item) => item.category === "daily") },
  ].filter((group) => group.items.length > 0);

  const left = p.quota ? Math.max(0, p.quota.limitMin - p.quota.usedMin) : 0;

  return (
    <main className={styles.screen}>
      {header}

      <div className={styles.scroll}>
        <p className={styles.subtitle}>Dars uslubini tanlang.</p>

        {/* ── 1. 수업 언어 ── */}
        <section className={styles.section}>
          <h2>Qaysi tilda o&apos;rganasiz?</h2>
          <div className={styles.langRow}>
            {languages.map((language) => {
              const on = language.id === p.settings.explanationLanguage;
              return (
                <button
                  aria-pressed={on}
                  className={`${styles.langChip} ${on ? styles.langChipOn : ""}`}
                  key={language.id}
                  onClick={() => pick("explanationLanguage", language.id)}
                  type="button"
                >
                  <span aria-hidden="true">{LANG_FLAG[language.id] ?? "🌐"}</span>
                  <b data-no-translate="">{language.name}</b>
                </button>
              );
            })}
          </div>
          <p className={styles.sectionHint}>
            O‘qituvchi koreys tilini shu tilda o‘rgatadi. Faqat koreyscha dars uchun koreys tilini tanlang.
          </p>
        </section>

        {/* ── 2. 선생님 (목소리) ── */}
        <section className={styles.section}>
          <h2 data-i18n="voiceTutor.setup.teacherTitle">Ustoz</h2>
          {voices.length === 0 ? (
            <p className={styles.errorInline}>
              Ustoz ovozi hali sozlanmagan. Serverdagi Voice Tutor sozlamalarini tekshiring.
            </p>
          ) : (
            <div className={styles.teacherRow}>
              {voices.map((item, index) => {
                const selected = item.id === p.settings.voiceId;
                const color = VOICE_COLORS[index % VOICE_COLORS.length]!;
                return (
                  <div
                    className={`${styles.teacherCard} ${selected ? styles.teacherCardOn : ""}`}
                    key={item.id}
                    style={{ "--i": index, "--teacher": color } as CSSProperties}
                  >
                    <button
                      aria-pressed={selected}
                      className={styles.teacherSelect}
                      onClick={() => pick("voiceId", item.id)}
                      type="button"
                    >
                      <span className={styles.teacherAvatar} data-no-translate="">
                        {item.name.slice(0, 1).toUpperCase()}
                      </span>
                      <span className={styles.teacherNameRow}>
                        <b data-no-translate="">{item.name}</b>
                        {selected ? <MobileIcon name="checkmark-circle" size={15} /> : null}
                      </span>
                      {item.description ? <small data-no-translate="">{item.description}</small> : null}
                    </button>
                    {/* 샘플이 없으면 버튼을 아예 안 그린다. 눌러도 아무 일 없는 버튼이 제일 나쁘다 */}
                    {item.previewUrl ? (
                      <button
                        aria-label="Ovozni eshitib ko‘rish"
                        className={styles.teacherPlay}
                        onClick={() => {
                          window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
                          p.onPreview(item);
                        }}
                        type="button"
                      >
                        <MobileIcon name={p.previewVoiceId === item.id ? "stop" : "volume-high"} size={15} />
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── 3. 말투 ── 성격과 독립이다 */}
        <section className={styles.section}>
          <h2>Ustoz sizga qanday murojaat qilsin?</h2>
          <div className={styles.addressRow}>
            {(["polite", "casual"] as const).map((style) => {
              const on = p.settings.speechStyle === style;
              return (
                <button
                  aria-pressed={on}
                  className={`${styles.addressCard} ${on ? styles.addressCardOn : ""}`}
                  key={style}
                  onClick={() => pick("speechStyle", style)}
                  type="button"
                >
                  <span className={styles.addressHead}>
                    <b>{STYLE_LABELS[style]}</b>
                    {on ? <MobileIcon name="checkmark-circle" size={17} /> : null}
                  </span>
                  <small data-no-translate="">{ADDRESS_EXAMPLE[style]}</small>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── 4. 성격 ── */}
        <section className={styles.section}>
          <h2>Ustoz xarakteri</h2>
          <div className={styles.grid}>
            {personalities.map((id) => {
              const on = p.settings.personality === id;
              const label = PERSONALITY_LABELS[id];
              return (
                <button
                  aria-pressed={on}
                  className={`${styles.topicCard} ${on ? styles.topicCardOn : ""}`}
                  key={id}
                  onClick={() => pick("personality", id)}
                  type="button"
                >
                  <span aria-hidden="true" className={styles.personaEmoji}>{PERSONALITY_EMOJI[id]}</span>
                  <b>{label?.name ?? id}</b>
                  <small className={styles.personaBlurb}>{label?.description ?? ""}</small>
                  {on ? (
                    <span className={styles.topicCheck}>
                      <MobileIcon name="checkmark-circle" size={18} />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── 5. 한국어 수준 ── */}
        <section className={styles.section}>
          <h2>Koreys tili darajasi</h2>
          <div className={styles.langRow}>
            {levels.map((level) => {
              const on = p.settings.koreanLevel === level;
              return (
                <button
                  aria-pressed={on}
                  className={`${styles.langChip} ${on ? styles.langChipOn : ""}`}
                  key={level}
                  onClick={() => pick("koreanLevel", level)}
                  type="button"
                >
                  <b>{LEVEL_LABELS[level] ?? level}</b>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── 6. 주제 ── */}
        <section className={styles.section}>
          <h2>Bugun nima haqida gaplashamiz?</h2>
          <button
            aria-pressed={topicId === null}
            className={`${styles.freeCard} ${topicId === null ? styles.freeCardOn : ""}`}
            onClick={() => {
              window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
              setTopicId(null);
            }}
            type="button"
          >
            <span className={styles.freeIcon}>
              <MobileIcon name="chatbubbles" size={18} />
            </span>
            <span className={styles.freeBody}>
              <b data-i18n="voiceTutor.call.freeTalk">Erkin suhbat</b>
              <small>Mavzusiz bemalol gaplashamiz</small>
            </span>
            {topicId === null ? <MobileIcon name="checkmark-circle" size={20} /> : null}
          </button>

          {groups.map((group) => (
            <div className={styles.group} key={group.key}>
              <h3>{group.title}</h3>
              <div className={styles.grid}>
                {group.items.map((item) => {
                  const on = topicId === item.id;
                  return (
                    <button
                      aria-pressed={on}
                      className={`${styles.topicCard} ${on ? styles.topicCardOn : ""}`}
                      key={item.id}
                      onClick={() => {
                        window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
                        setTopicId(item.id);
                      }}
                      type="button"
                    >
                      <span className={styles.topicIcon} style={{ backgroundColor: item.color }}>
                        <MobileIcon name={TOPIC_ICONS[item.icon] ?? "chatbubbles"} size={16} />
                      </span>
                      <b data-no-translate="">{item.title}</b>
                      <small data-no-translate="">{item.blurb}</small>
                      {on ? (
                        <span className={styles.topicCheck}>
                          <MobileIcon name="checkmark-circle" size={18} />
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {errorText ? <p className={styles.errorInline}>{errorText}</p> : null}
      </div>

      {/* 하단 고정 — 스크롤 안에 넣으면 끝까지 내려야 보인다 */}
      <footer className={styles.footer}>
        <p className={styles.summary}>
          <span aria-hidden="true">{LANG_FLAG[p.settings.explanationLanguage] ?? "🌐"}</span>
          {voice ? (
            <>
              <i>·</i>
              <span data-no-translate="">{voice.name}</span>
            </>
          ) : null}
          <i>·</i>
          <span>{STYLE_LABELS[p.settings.speechStyle] ?? p.settings.speechStyle}</span>
          <i>·</i>
          {topic ? <span data-no-translate="">{topic.title}</span> : <span data-i18n="voiceTutor.call.freeTalk">Erkin suhbat</span>}
        </p>

        {p.quota ? (
          <p className={styles.quotaLine}>
            {p.quota.kind === "trial"
              ? `Sinov uchun ${left} daqiqa qoldi (bir martalik, jami ${p.quota.limitMin} daqiqa)`
              : `Bugun ${left} daqiqa qoldi (kuniga ${p.quota.limitMin} daqiqa)`}
          </p>
        ) : null}

        {exhausted ? (
          <button
            className={`${styles.start} ${p.quota?.isMax ? styles.startOff : ""}`}
            disabled={p.quota?.isMax}
            onClick={p.quota?.isMax ? undefined : p.onUpsell}
            type="button"
          >
            <span>
              {p.quota?.isMax
                ? "Bugungi dars vaqti tugadi. Ertaga ko'rishamiz!"
                : "KORIO MAX bilan har kuni 1 soat dars"}
            </span>
          </button>
        ) : (
          <button
            className={`${styles.start} ${canStart ? "" : styles.startOff}`}
            disabled={!canStart}
            onClick={() => p.onStart(topic)}
            type="button"
          >
            {p.busy ? (
              <span className={styles.spinnerLight} />
            ) : (
              <>
                <MobileIcon name="call" size={19} />
                <span>Darsni boshlash</span>
              </>
            )}
          </button>
        )}
      </footer>
    </main>
  );
}
