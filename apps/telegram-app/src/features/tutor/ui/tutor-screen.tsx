"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import {
  MobileIcon,
  type IoniconName,
} from "../../../shared/ui/mobile-icon";
import {
  createTutorSpeech,
  explainTutorCaption,
  getTutorTeachers,
  getTutorTopics,
  tutorSpeechUrl,
  type AuthenticatedRequest,
} from "../api/tutor";
import type {
  TutorMode,
  TutorTeacherCard,
  TutorTopicCard,
} from "../model/tutor";
import { useRealtimeTutor } from "../model/use-realtime-tutor";
import { TutorOrb } from "./tutor-orb";
import { TutorSummary } from "./tutor-summary";
import styles from "./tutor-screen.module.css";

const PREVIEW_TEXT =
  "안녕하세요! 만나서 반가워요. 오늘부터 저와 같이 편하게 한국어를 연습해봐요.";

const MODE_LABELS: Record<TutorMode, string> = {
  freeTalk: "Erkin suhbat",
  rolePlay: "Rolli o'yin",
  lesson: "Dars",
  pronunciation: "Talaffuz",
  review: "Takrorlash",
};

const STATE_LABELS = {
  idle: "Tayyor. Boshlaymizmi?",
  connecting: "Ulanmoqda...",
  listening: "Tinglayapman",
  thinking: "O'ylayapman...",
  speaking: "Gapiryapman",
  error: "Xatolik yuz berdi",
} as const;

const ERROR_LABELS: Record<string, string> = {
  MIC_PERMISSION_DENIED:
    "Mikrofonga ruxsat kerak. Sozlamalardan ruxsat bering.",
  MIC_UNSUPPORTED: "Bu muhitda mikrofon ishlamaydi. Ilovadan foydalaning.",
  CONNECTION_LOST: "Aloqa uzildi. Qaytadan boshlang.",
  CONNECTION_ERROR: "Ulanishda muammo bor.",
  TUTOR_DAILY_LIMIT_REACHED: "Bugungi limit tugadi. Ertaga ko'rishamiz!",
  TUTOR_MONTHLY_LIMIT_REACHED: "Bu oygi limit tugadi.",
  TUTOR_NOT_CONFIGURED: "Hozircha mavjud emas.",
  TUTOR_SESSION_FAILED:
    "Suhbatni boshlab bo'lmadi. Qayta urinib ko'ring.",
};

const TOPIC_ICONS: Record<string, IoniconName> = {
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

const formatTime = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

function readRememberedTeacher() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem("korio-tutor-teacher-id");
  } catch {
    return null;
  }
}

export function TutorScreen() {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const { speak, stop: stopSpeech } = useKoreanSpeech(request);
  const [topic, setTopic] = useState<TutorTopicCard | null>(null);
  const [picking, setPicking] = useState(true);
  const [pickedTeacher, setPickedTeacher] =
    useState<TutorTeacherCard | null>(null);
  const [lastTeacherId] = useState(readRememberedTeacher);
  const [explanation, setExplanation] = useState("");
  const [explaining, setExplaining] = useState(false);
  const speechFinishRef = useRef<(() => void) | null>(null);

  const tutor = useRealtimeTutor(request);
  const {
    active,
    analyzing,
    busy,
    caption,
    captionPrev,
    clearSummary,
    elapsedSec,
    error,
    examples,
    maxSec,
    quota,
    start,
    state,
    stop,
    summary,
    targets,
    userSaid,
    withMicMuted,
  } = tutor;

  const playKorean = useCallback(
    (text: string) => {
      speechFinishRef.current?.();
      return new Promise<void>((resolve) => {
        let finished = false;
        const finish = () => {
          if (finished) return;
          finished = true;
          if (speechFinishRef.current === finish) speechFinishRef.current = null;
          resolve();
        };
        speechFinishRef.current = finish;
        speak(text, { onEnd: finish });
      });
    },
    [speak],
  );

  useEffect(() => {
    setExplanation("");
  }, [caption]);

  useEffect(
    () => () => {
      speechFinishRef.current?.();
      stopSpeech();
    },
    [stopSpeech],
  );

  const loadExplanation = useCallback(async () => {
    const text = caption.trim();
    if (!text || explaining) return;
    setExplaining(true);
    try {
      const result = await explainTutorCaption(request, text);
      setExplanation(
        [result.translation, result.explanation].filter(Boolean).join("\n\n") ||
          "Izohni olib bo'lmadi",
      );
    } catch {
      setExplanation("Izohni olib bo'lmadi");
    } finally {
      setExplaining(false);
    }
  }, [caption, explaining, request]);

  const goBack = useCallback(() => {
    if (window.history.length > 1) router.back();
    else router.replace("/course-categories");
  }, [router]);

  const exhausted = Boolean(quota && quota.allowedMin <= 0);
  const remaining = maxSec > 0 ? Math.max(0, maxSec - elapsedSec) : 0;
  const nearEnd = active && maxSec > 0 && remaining <= 30;
  const idle = picking && !active && !summary && !analyzing;

  if (idle && !pickedTeacher) {
    return (
      <main className={`${styles.screen} ${styles.pickerScreen}`}>
        <TutorHeader
          backIcon="chevron-down"
          onBack={goBack}
          title="Bugun kim bilan o'rganamiz?"
        />
        <TeacherPicker
          initialId={lastTeacherId}
          onPick={(teacher) => {
            setPickedTeacher(teacher);
            try {
              window.localStorage.setItem("korio-tutor-teacher-id", teacher.id);
            } catch {
              // 저장을 막은 WebView에서도 현재 선택은 그대로 사용한다.
            }
          }}
          request={request}
        />
      </main>
    );
  }

  if (idle) {
    return (
      <main className={`${styles.screen} ${styles.pickerScreen}`}>
        <TutorHeader
          backIcon="chevron-back"
          onBack={() => setPickedTeacher(null)}
          title="Bugun nimani mashq qilamiz?"
        />
        <TopicPicker
          onFreeTalk={() => {
            setTopic(null);
            setPicking(false);
            void start("freeTalk", { teacherId: pickedTeacher?.id });
          }}
          onPick={(nextTopic) => {
            setTopic(nextTopic);
            setPicking(false);
            void start("freeTalk", {
              teacherId: pickedTeacher?.id,
              topicId: nextTopic.id,
            });
          }}
          request={request}
        />
      </main>
    );
  }

  if (summary) {
    return (
      <TutorSummary
        data={summary}
        onAgain={() => {
          clearSummary();
          setPicking(true);
        }}
        onClose={() => {
          clearSummary();
          goBack();
        }}
        onSpeak={(text) => void playKorean(text)}
        topicTitle={topic?.title}
      />
    );
  }

  return (
    <main
      className={`${styles.screen} ${styles.callScreen} ${
        state === "speaking"
          ? styles.call_speaking
          : state === "listening"
            ? styles.call_listening
            : ""
      }`}
    >
      <header className={styles.callHeader}>
        <button
          aria-label="Yopish"
          className={styles.iconButton}
          onClick={async () => {
            await stop();
            goBack();
          }}
          type="button"
        >
          <MobileIcon name="chevron-down" size={26} />
        </button>
        {active ? (
          <span className={`${styles.timerPill} ${nearEnd ? styles.timerWarn : ""}`}>
            <MobileIcon name="time-outline" size={13} />
            {formatTime(remaining)}
          </span>
        ) : (
          <strong className={styles.callTitle}>
            {topic?.title ?? "AI suhbat ustozi"}
          </strong>
        )}
        <i className={styles.headerSpacer} />
      </header>

      <section className={styles.callStage}>
        <TutorOrb state={state} />
        <p key={state}>{STATE_LABELS[state]}</p>
      </section>

      <section className={styles.captionArea} aria-live="polite">
        {userSaid && active ? (
          <div className={styles.userBubble}>{userSaid}</div>
        ) : null}

        {caption ? (
          <div className={styles.tutorBubbleWrap}>
            {captionPrev ? <small>{captionPrev}</small> : null}
            <div className={styles.tutorBubble}>{caption}</div>
          </div>
        ) : null}

        {caption && active ? (
          <div className={styles.explainWrap}>
            {explanation ? (
              <p>{explanation}</p>
            ) : (
              <button
                disabled={explaining}
                onClick={() => void loadExplanation()}
                type="button"
              >
                {explaining
                  ? "Izoh tayyorlanmoqda..."
                  : "🇺🇿 Izohni ko'rish"}
              </button>
            )}
          </div>
        ) : null}

        {active && !caption && targets.length ? (
          <div className={styles.targetBox}>
            <small>Bugungi iboralar</small>
            {targets.slice(0, 4).map((expression) => (
              <button
                key={expression}
                onClick={() =>
                  void withMicMuted(() => playKorean(expression))
                }
                type="button"
              >
                <MobileIcon name="volume-medium" size={14} />
                <span>{expression}</span>
              </button>
            ))}
          </div>
        ) : null}

        {active && examples.length ? (
          <div className={styles.exampleRow}>
            {examples.map((example) => (
              <button
                key={example}
                onClick={() => void withMicMuted(() => playKorean(example))}
                type="button"
              >
                <MobileIcon name="volume-high" size={14} />
                <span>{example}</span>
              </button>
            ))}
          </div>
        ) : null}

        {analyzing ? (
          <div className={styles.analyzingBox}>
            <span className={styles.spinner} />
            <p>Suhbat tahlil qilinmoqda...</p>
          </div>
        ) : null}

        {!active && !analyzing && !caption && quota ? (
          <div className={styles.quotaBox}>
            <p>
              <MobileIcon name="mic-outline" size={15} />
              Bugun {Math.max(0, quota.dailyLimitMin - quota.dailyUsedMin)} daqiqa
              qoldi (kuniga {quota.dailyLimitMin} daqiqa)
            </p>
            {!quota.isMax ? (
              <button onClick={() => router.push("/premium")} type="button">
                KORIO MAX bilan kuniga 20 daqiqa
              </button>
            ) : null}
          </div>
        ) : null}

        {error ? (
          <p className={styles.callError}>
            {ERROR_LABELS[error] ??
              "Xatolik yuz berdi. Birozdan so'ng qayta urinib ko'ring."}
          </p>
        ) : null}
      </section>

      <footer className={styles.callFooter}>
        {active ? (
          <button
            className={`${styles.callButton} ${styles.endButton}`}
            onClick={() => void stop()}
            type="button"
          >
            <MobileIcon name="close" size={22} />
            Suhbatni tugatish
          </button>
        ) : (
          <button
            className={`${styles.callButton} ${styles.restartButton}`}
            disabled={busy || exhausted || analyzing}
            onClick={() => setPicking(true)}
            type="button"
          >
            <MobileIcon name="refresh" size={22} />
            Boshqa mavzu tanlash
          </button>
        )}
      </footer>
    </main>
  );
}

function TutorHeader({
  backIcon,
  onBack,
  title,
}: {
  backIcon: "chevron-down" | "chevron-back";
  onBack: () => void;
  title: string;
}) {
  return (
    <header className={styles.pickerHeader}>
      <button
        aria-label="Orqaga"
        className={styles.iconButton}
        onClick={onBack}
        type="button"
      >
        <MobileIcon name={backIcon} size={26} />
      </button>
      <h1>{title}</h1>
      <i className={styles.headerSpacer} />
    </header>
  );
}

function TeacherPicker({
  initialId,
  onPick,
  request,
}: {
  initialId: string | null;
  onPick: (teacher: TutorTeacherCard) => void;
  request: AuthenticatedRequest;
}) {
  const [teachers, setTeachers] = useState<TutorTeacherCard[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<string | null>(initialId);
  const [previewing, setPreviewing] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const load = useCallback(async () => {
    setFailed(false);
    try {
      const result = await getTutorTeachers(request);
      setTeachers(result.teachers);
    } catch {
      setFailed(true);
    }
  }, [request]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(
    () => () => {
      audioRef.current?.pause();
      audioRef.current = null;
    },
    [],
  );

  const preview = async (
    event: MouseEvent<HTMLButtonElement>,
    teacherId: string,
  ) => {
    event.stopPropagation();
    setPreviewing(teacherId);
    try {
      const result = await createTutorSpeech(request, {
        teacherId,
        text: PREVIEW_TEXT,
      });
      audioRef.current?.pause();
      const audio = new Audio(tutorSpeechUrl(result.audioId));
      audioRef.current = audio;
      audio.onended = () => {
        if (audioRef.current === audio) audioRef.current = null;
      };
      await audio.play();
    } catch {
      // 미리듣기 실패는 선생님 선택을 막지 않는다.
    } finally {
      setPreviewing(null);
    }
  };

  if (failed) {
    return (
      <section className={styles.loadState}>
        <p>Ma&apos;lumotlarni yuklab bo&apos;lmadi</p>
        <button onClick={() => void load()} type="button">
          Qayta urinish
        </button>
      </section>
    );
  }

  if (!teachers) {
    return (
      <section className={styles.loadState}>
        <span className={styles.spinner} />
      </section>
    );
  }

  const chosen = teachers.find((teacher) => teacher.id === selected) ?? null;

  return (
    <div className={styles.teacherPicker}>
      <div className={styles.teacherList}>
        <p className={styles.teacherLead}>
          Har bir ustozning ovozi va gapirish uslubi boshqacha. Tinglab ko&apos;ring.
        </p>
        {teachers.map((teacher) => {
          const isSelected = selected === teacher.id;
          return (
            <article
              className={`${styles.teacherCard} ${isSelected ? styles.teacherSelected : ""}`}
              key={teacher.id}
              style={
                {
                  "--teacher-color": teacher.color,
                } as CSSProperties
              }
            >
              <button
                className={styles.teacherMain}
                onClick={() => setSelected(teacher.id)}
                type="button"
              >
                <span className={styles.teacherAvatar}>{teacher.avatar}</span>
                <span className={styles.teacherBody}>
                  <strong>
                    {teacher.name}
                    {isSelected ? (
                      <MobileIcon name="checkmark-circle" size={19} />
                    ) : null}
                  </strong>
                  <small>{teacher.description}</small>
                  {teacher.recommendedModes.length ? (
                    <span className={styles.teacherTags}>
                      {teacher.recommendedModes.map((mode) => (
                        <i key={mode}>{MODE_LABELS[mode]}</i>
                      ))}
                    </span>
                  ) : null}
                </span>
              </button>
              <button
                aria-label={`${teacher.name} ovozini eshitish`}
                className={styles.previewButton}
                onClick={(event) => void preview(event, teacher.id)}
                type="button"
              >
                {previewing === teacher.id ? (
                  <span className={styles.smallSpinner} />
                ) : (
                  <MobileIcon name="volume-high" size={18} />
                )}
              </button>
            </article>
          );
        })}
      </div>

      <footer className={styles.teacherFooter}>
        <button
          disabled={!chosen}
          onClick={() => chosen && onPick(chosen)}
          type="button"
        >
          {chosen ? `${chosen.name} bilan boshlash` : "Ustozni tanlang"}
        </button>
      </footer>
    </div>
  );
}

function TopicPicker({
  onFreeTalk,
  onPick,
  request,
}: {
  onFreeTalk: () => void;
  onPick: (topic: TutorTopicCard) => void;
  request: AuthenticatedRequest;
}) {
  const [topics, setTopics] = useState<TutorTopicCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    void getTutorTopics(request)
      .then((result) => {
        if (alive) setTopics(result.topics ?? []);
      })
      .catch(() => undefined)
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [request]);

  if (loading) {
    return (
      <section className={styles.loadState}>
        <span className={styles.spinner} />
      </section>
    );
  }

  const groups = [
    {
      key: "korea" as const,
      title: "Koreyada hayot",
      items: topics.filter((topic) => topic.category === "korea"),
    },
    {
      key: "daily" as const,
      title: "Kundalik suhbat",
      items: topics.filter((topic) => topic.category === "daily"),
    },
  ];

  return (
    <div className={styles.topicScroll}>
      <button className={styles.freeTalkCard} onClick={onFreeTalk} type="button">
        <span>
          <MobileIcon name="chatbubbles" size={20} />
        </span>
        <span>
          <strong>Erkin suhbat</strong>
          <small>Mavzusiz bemalol gaplashamiz</small>
        </span>
        <MobileIcon name="chevron-forward" size={18} />
      </button>

      {groups.map((group) =>
        group.items.length ? (
          <section className={styles.topicGroup} key={group.key}>
            <h2>{group.title}</h2>
            <div className={styles.topicGrid}>
              {group.items.map((topic) => (
                <button
                  className={styles.topicCard}
                  key={topic.id}
                  onClick={() => onPick(topic)}
                  type="button"
                >
                  <span style={{ backgroundColor: topic.color }}>
                    <MobileIcon
                      name={TOPIC_ICONS[topic.icon] ?? "chatbubble-ellipses"}
                      size={19}
                    />
                  </span>
                  <strong>{topic.title}</strong>
                  <p>{topic.blurb}</p>
                  <small>{topic.expressionCount} ta ibora</small>
                </button>
              ))}
            </div>
          </section>
        ) : null,
      )}
    </div>
  );
}
