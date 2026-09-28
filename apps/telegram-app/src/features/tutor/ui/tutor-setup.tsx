"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { getContentLang } from "../../../shared/i18n/content-language";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import {
  getTutorTeachers,
  getTutorTopics,
  tutorPreviewUrl,
  type AuthenticatedRequest,
} from "../api/tutor";
import {
  TUTOR_TEACHING_LANGUAGES,
  type TutorAddressStyle,
  type TutorQuota,
  type TutorTeacherCard,
  type TutorTeachingLanguage,
  type TutorTopicCard,
} from "../model/tutor";
import { useTutorPrefs } from "../model/tutor-prefs";
import { TUTOR_ERROR_LABELS } from "./tutor-labels";
import styles from "./tutor-setup.module.css";

const LANG_FLAG: Record<TutorTeachingLanguage, string> = {
  uz: "🇺🇿",
  ru: "🇷🇺",
  en: "🇺🇸",
  ko: "🇰🇷",
};

/** 각 언어의 제 이름 (모바일 tutor.setup.language.*) */
const LANG_NAME: Record<TutorTeachingLanguage, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
  ko: "한국어",
};

const ADDRESS: Record<TutorAddressStyle, { example: string; label: string }> = {
  polite: { label: "Hurmat bilan", example: "좋아요, 다시 한번 해볼까요?" },
  casual: { label: "Do'stona", example: "좋아, 다시 한번 해보자!" },
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

export interface TutorSetupResult {
  addressStyle: TutorAddressStyle;
  teacherId?: string;
  teacherName?: string;
  teacherPersonality?: string;
  teachingLanguage: TutorTeachingLanguage;
  topicId?: string;
  topicTitle?: string;
}

interface TutorSetupProps {
  busy: boolean;
  error: string | null;
  onClose: () => void;
  onStart: (result: TutorSetupResult) => void;
  onUpsell: () => void;
  quota: TutorQuota | null;
  request: AuthenticatedRequest;
}

/**
 * 통화 전 설정 한 페이지 — 모바일 TutorSetupScreen.
 *
 * 예전엔 선생님 → 주제 두 단계였고 **주제를 누르는 순간 과금되는 통화가 열렸다.**
 * 말투·설명 언어를 고를 자리도 없었다. 이제 시작은 하단 버튼으로만 한다:
 *   설명 언어 → 선생님 → 말투 → 주제 → 시작
 */
export function TutorSetup({ busy, error, onClose, onStart, onUpsell, quota, request }: TutorSetupProps) {
  const { patch, prefs, ready } = useTutorPrefs();
  const [teachers, setTeachers] = useState<TutorTeacherCard[] | null>(null);
  const [topics, setTopics] = useState<TutorTopicCard[] | null>(null);
  const [failed, setFailed] = useState(false);
  /** null = 자유 대화 */
  const [topicId, setTopicId] = useState<string | null>(null);
  const [previewing, setPreviewing] = useState<string | null>(null);
  const playerRef = useRef<HTMLAudioElement | null>(null);

  /** 한 번도 안 골랐으면 앱의 뜻·설명 언어를 기본으로 */
  const teachingLanguage: TutorTeachingLanguage = useMemo(() => {
    if (prefs.teachingLanguage) return prefs.teachingLanguage;
    const base = getContentLang() as TutorTeachingLanguage;
    return TUTOR_TEACHING_LANGUAGES.includes(base) ? base : "uz";
  }, [prefs.teachingLanguage]);

  const load = useCallback(() => {
    setFailed(false);
    Promise.all([getTutorTeachers(request), getTutorTopics(request)])
      .then(([teacherResult, topicResult]) => {
        setTeachers(teacherResult.teachers);
        setTopics(topicResult.topics ?? []);
      })
      .catch(() => setFailed(true));
  }, [request]);

  useEffect(load, [load]);

  // 화면을 떠나면 미리듣기를 끊는다. 안 끊으면 통화가 시작된 뒤에도 샘플이 나온다
  useEffect(
    () => () => {
      playerRef.current?.pause();
      playerRef.current = null;
    },
    [],
  );

  // 선생님을 한 명도 안 골랐으면 첫 번째를 기본 선택으로 (빈손으로 시작 못 하게)
  useEffect(() => {
    if (!ready || !teachers?.length) return;
    if (!prefs.teacherId || !teachers.some((teacher) => teacher.id === prefs.teacherId)) {
      patch({ teacherId: teachers[0]!.id });
    }
  }, [patch, prefs.teacherId, ready, teachers]);

  /** 실제 통화 목소리로 미리 만든 파일을 그대로 튼다 (합성 호출이 없어 즉시 나온다) */
  const preview = (teacher: TutorTeacherCard) => {
    if (!teacher.previewUrl) return;
    window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
    playerRef.current?.pause();
    const audio = new Audio(tutorPreviewUrl(teacher.previewUrl));
    playerRef.current = audio;
    setPreviewing(teacher.id);
    const done = () => setPreviewing((current) => (current === teacher.id ? null : current));
    audio.addEventListener("playing", done, { once: true });
    audio.addEventListener("error", done, { once: true });
    void audio.play().catch(done);
  };

  const select = (next: Partial<{ addressStyle: TutorAddressStyle; teacherId: string; teachingLanguage: TutorTeachingLanguage }>) => {
    window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
    patch(next);
  };

  const teacher = teachers?.find((item) => item.id === prefs.teacherId) ?? null;
  const topic = topics?.find((item) => item.id === topicId) ?? null;
  const exhausted = Boolean(quota && quota.allowedMin <= 0);
  const canStart = Boolean(teacher) && !busy && !exhausted;

  const header = (
    <header className={styles.header}>
      <button aria-label="Yopish" className={styles.iconButton} onClick={onClose} type="button">
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

  if (!teachers || !topics) {
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

  return (
    <main className={styles.screen}>
      {header}

      <div className={styles.scroll}>
        <p className={styles.subtitle}>Dars uslubini tanlang.</p>

        <section className={styles.section}>
          <h2>Izohlarni qaysi tilda eshitasiz?</h2>
          <div className={styles.langRow}>
            {TUTOR_TEACHING_LANGUAGES.map((code) => {
              const on = code === teachingLanguage;
              return (
                <button
                  aria-pressed={on}
                  className={`${styles.langChip} ${on ? styles.langChipOn : ""}`}
                  key={code}
                  onClick={() => select({ teachingLanguage: code })}
                  type="button"
                >
                  <span aria-hidden="true">{LANG_FLAG[code]}</span>
                  <b data-no-translate="">{LANG_NAME[code]}</b>
                </button>
              );
            })}
          </div>
        </section>

        <section className={styles.section}>
          <h2 data-i18n="tutor.setup.teacher.title">Ustoz</h2>
          <div className={styles.teacherRow}>
            {teachers.map((item, index) => {
              const selected = item.id === prefs.teacherId;
              return (
                <div
                  className={`${styles.teacherCard} ${selected ? styles.teacherCardOn : ""}`}
                  key={item.id}
                  style={{ "--i": index, "--teacher": item.color } as CSSProperties}
                >
                  <button
                    aria-pressed={selected}
                    className={styles.teacherSelect}
                    onClick={() => select({ teacherId: item.id })}
                    type="button"
                  >
                    <span className={styles.teacherAvatar}>{item.avatar}</span>
                    <span className={styles.teacherNameRow}>
                      <b>{item.name}</b>
                      {selected ? <MobileIcon name="checkmark-circle" size={15} /> : null}
                    </span>
                    <small>{item.description}</small>
                  </button>
                  {/* 에셋이 없으면 버튼을 아예 안 그린다. 눌러도 아무 일 없는 버튼이 제일 나쁘다 */}
                  {item.previewUrl ? (
                    <button
                      aria-label="Ovozni eshitish"
                      className={styles.teacherPlay}
                      onClick={() => preview(item)}
                      type="button"
                    >
                      {previewing === item.id ? <span className={styles.miniSpinner} /> : <MobileIcon name="volume-high" size={15} />}
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        {/* 성격과 독립이고, 가르치는 한국어의 격식과도 다른 축이다 */}
        <section className={styles.section}>
          <h2>Ustoz sizga qanday murojaat qilsin?</h2>
          <div className={styles.addressRow}>
            {(["polite", "casual"] as const).map((style) => {
              const on = prefs.addressStyle === style;
              return (
                <button
                  aria-pressed={on}
                  className={`${styles.addressCard} ${on ? styles.addressCardOn : ""}`}
                  key={style}
                  onClick={() => select({ addressStyle: style })}
                  type="button"
                >
                  <span className={styles.addressHead}>
                    <b>{ADDRESS[style].label}</b>
                    {on ? <MobileIcon name="checkmark-circle" size={17} /> : null}
                  </span>
                  <small data-no-translate="">{ADDRESS[style].example}</small>
                </button>
              );
            })}
          </div>
        </section>

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
              <b>Erkin suhbat</b>
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
                      <b>{item.title}</b>
                      <small>{item.blurb}</small>
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

        {error ? (
          <p className={styles.errorInline}>
            {TUTOR_ERROR_LABELS[error] ?? TUTOR_ERROR_LABELS.generic}
          </p>
        ) : null}
      </div>

      {/* 하단 고정 — 스크롤 안에 넣으면 끝까지 내려야 보인다 */}
      <footer className={styles.footer}>
        <p className={styles.summary}>
          <span aria-hidden="true">{LANG_FLAG[teachingLanguage]}</span>
          {teacher ? (
            <>
              <i>·</i>
              <span>{teacher.name}</span>
            </>
          ) : null}
          <i>·</i>
          <span>{ADDRESS[prefs.addressStyle].label}</span>
          <i>·</i>
          <span>{topic?.title ?? "Erkin suhbat"}</span>
        </p>

        {exhausted ? (
          <button className={styles.start} onClick={onUpsell} type="button">
            <span>KORIO MAX bilan kuniga 20 daqiqa</span>
          </button>
        ) : (
          <button
            className={`${styles.start} ${canStart ? "" : styles.startOff}`}
            disabled={!canStart}
            onClick={() =>
              onStart({
                addressStyle: prefs.addressStyle,
                teacherId: prefs.teacherId ?? undefined,
                teacherName: teacher?.name,
                teacherPersonality: teacher?.personality,
                teachingLanguage,
                topicId: topicId ?? undefined,
                topicTitle: topic?.title,
              })
            }
            type="button"
          >
            {busy ? (
              <span className={styles.spinnerLight} />
            ) : (
              <>
                <MobileIcon name="call" size={19} />
                <span>AI ustoz bilan darsni boshlash</span>
              </>
            )}
          </button>
        )}
      </footer>
    </main>
  );
}
