"use client";

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";

import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import type { VoiceTutorMessage, VoiceTutorPlan, VoiceTutorProgress } from "../model/voice-tutor";
import { TutorMascot } from "./tutor-mascot";
import styles from "./tutor-result.module.css";

const GOOD = "#2FA96A";
const BAD = "#E5533D";
const WARM = "#FFA726";

interface TutorResultProps {
  elapsedSec: number;
  messages: VoiceTutorMessage[];
  onAgain: () => void;
  onClose: () => void;
  /** 다음 수업 계획 (수업 종료 때 Planning Agent 가 만든 것) */
  plan: VoiceTutorPlan | null;
  progress: VoiceTutorProgress | null;
  topicTitle?: string;
}

/** 0 → 값까지 세어 올라가는 숫자 */
function useCountUp(target: number, delay: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const startAt = performance.now() + delay;
    const tick = (now: number) => {
      const k = Math.min(1, Math.max(0, (now - startAt) / 700));
      setValue(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, delay]);
  return value;
}

/**
 * 수업 결과 — 모바일 VoiceTutorResultScreen.
 *
 * 숫자는 타일·링으로, 교정은 틀린 것 → 맞는 것 한 줄씩, 배운 표현은 칩으로,
 * 다음 수업은 카드로. 한눈에 "오늘 얼마나 했고, 뭘 고쳤고, 다음엔 뭘 하는지".
 */
export function TutorResult(p: TutorResultProps) {
  const userTurns = p.messages.filter((m) => m.role === "user" && !m.text.startsWith("[[button")).length;
  const corrections = useMemo(() => {
    const seen = new Set<string>();
    const rows: { wrong?: string; correct: string }[] = [];
    for (const message of p.messages) {
      const correct = message.role === "teacher" ? message.correction?.correct?.trim() : "";
      if (!correct || seen.has(correct)) continue;
      seen.add(correct);
      rows.push({ wrong: message.correction?.wrong?.trim(), correct });
    }
    return rows;
  }, [p.messages]);
  const learned = useMemo(() => {
    const list = p.progress?.learnedVocabulary?.length
      ? p.progress.learnedVocabulary
      : corrections.map((row) => row.correct);
    return [...new Set(list)].slice(0, 16);
  }, [p.progress, corrections]);
  const minutes = Math.max(1, Math.round(p.elapsedSec / 60));
  // 교정 없이 넘어간 발화 비율 — "오늘 얼마나 자연스러웠나" 의 대략적인 그림
  const smooth = userTurns > 0 ? Math.max(0, Math.min(1, 1 - corrections.length / userTurns)) : 0;
  const strong = p.progress?.strongPoints ?? [];
  const weak = [...(p.progress?.weakPoints ?? []), ...(p.progress?.repeatedMistakes ?? [])].slice(0, 5);
  const next = p.plan;

  return (
    <main className={styles.root}>
      <div className={styles.scroll}>
        {/* ── 히어로 ── */}
        <section className={styles.hero}>
          <span aria-hidden="true" className={styles.sparkles}>
            <i style={{ left: "12%", top: "22%" }} />
            <i style={{ animationDelay: "300ms", right: "18%", top: "14%" }} />
            <i style={{ animationDelay: "600ms", left: "20%", top: "58%" }} />
            <i style={{ animationDelay: "900ms", right: "12%", top: "50%" }} />
          </span>
          <TutorMascot emotion="happy" size={82} state="speaking" tint="#FFE36E" />
          <h1>Dars tugadi!</h1>
          {/* 텍스트 노드 하나여야 "{{topic}} · {{min}} daqiqa" 템플릿으로 번역된다 */}
          <p>{p.topicTitle ? `${p.topicTitle} · ${minutes} daqiqa` : `Erkin suhbat · ${minutes} daqiqa`}</p>
        </section>

        {/* ── 숫자 타일 ── */}
        <div className={styles.tiles}>
          <StatTile color="#776ee2" delay={80} icon="mic" label="Gapirdingiz" value={userTurns} />
          <StatTile color="#3FA7D6" delay={160} icon="time" label="Dars vaqti" suffix="daq" value={minutes} />
          <StatTile color={WARM} delay={240} icon="sparkles" label="Yangi iboralar" value={learned.length} />
        </div>

        {/* ── 자연스러움 링 + 레벨 ── */}
        <section className={`${styles.card} ${styles.ringCard}`} style={{ animationDelay: "300ms" }}>
          <Ring color={smooth >= 0.7 ? GOOD : smooth >= 0.4 ? WARM : BAD} value={smooth} />
          <div className={styles.ringText}>
            <h2>Tuzatishsiz aytilgan gaplar</h2>
            <p>{`Bugun ustoz ${corrections.length} marta tuzatdi`}</p>
            {p.progress?.estimatedLevel ? (
              <span className={styles.levelChip}>
                <MobileIcon name="trending-up" size={13} />
                <span>{`Taxminiy daraja: ${p.progress.estimatedLevel}`}</span>
              </span>
            ) : null}
          </div>
        </section>

        {/* ── 교정 노트 ── */}
        <Section color={BAD} delay={380} icon="create" title="Tuzatishlar">
          {corrections.length === 0 ? (
            <p className={styles.empty}>Tuzatadigan narsa bo&apos;lmadi. Zo&apos;r!</p>
          ) : (
            corrections.slice(0, 8).map((row, index) => (
              <div className={styles.fixRow} key={`${row.correct}-${index}`}>
                {row.wrong ? <s data-no-translate="">{row.wrong}</s> : null}
                <span>
                  <MobileIcon name="arrow-forward" size={14} />
                  <b data-no-translate="">{row.correct}</b>
                </span>
              </div>
            ))
          )}
        </Section>

        {/* ── 오늘 배운 표현 ── */}
        {learned.length > 0 ? (
          <Section color={WARM} delay={440} icon="book" title="Bugun o'rganilgan iboralar">
            <div className={styles.chips}>
              {learned.map((word) => (
                <span className={styles.chip} data-no-translate="" key={word}>{word}</span>
              ))}
            </div>
          </Section>
        ) : null}

        {/* ── 잘한 점 / 연습할 점 ── */}
        {strong.length > 0 || weak.length > 0 ? (
          <div className={styles.twoCol} style={{ animationDelay: "500ms" }}>
            <PointsCard color={GOOD} icon="heart" items={strong} title="Yaxshi tomonlar" />
            <PointsCard color={WARM} icon="flag" items={weak} title="Mashq qilish kerak" />
          </div>
        ) : null}

        {/* ── 선생님 메모 ── */}
        {p.progress?.notes ? (
          <section className={`${styles.card} ${styles.note}`} style={{ animationDelay: "560ms" }}>
            <MobileIcon name="chatbubble-ellipses" size={18} />
            <div>
              <h3>Ustoz izohi</h3>
              <p data-no-translate="">{p.progress.notes}</p>
            </div>
          </section>
        ) : null}

        {/* ── 다음 수업 ── */}
        {next?.lessonGoal ? (
          <section className={styles.next} style={{ animationDelay: "620ms" }}>
            <span className={styles.nextBadge}>
              <MobileIcon name="calendar" size={13} />
              <span>Keyingi dars</span>
            </span>
            <p className={styles.nextGoal} data-no-translate="">{next.lessonGoal}</p>
            {next.reviewTopics?.length || next.newTopics?.length ? (
              <div className={styles.chips}>
                {[...(next.reviewTopics ?? []), ...(next.newTopics ?? [])].slice(0, 6).map((topic) => (
                  <span className={styles.nextChip} data-no-translate="" key={topic}>{topic}</span>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}
      </div>

      {/* ── 하단 고정 ── */}
      <footer className={styles.footer}>
        <button className={styles.primary} onClick={p.onAgain} type="button">
          <MobileIcon name="refresh" size={18} />
          <span>Yana suhbatlashish</span>
        </button>
        <button className={styles.secondary} onClick={p.onClose} type="button">
          Yopish
        </button>
      </footer>
    </main>
  );
}

function StatTile({
  color,
  delay,
  icon,
  label,
  suffix,
  value,
}: {
  color: string;
  delay: number;
  icon: IoniconName;
  label: string;
  suffix?: string;
  value: number;
}) {
  const shown = useCountUp(value, delay);
  return (
    <div className={styles.tile} style={{ "--c": color, animationDelay: `${delay}ms` } as CSSProperties}>
      <span className={styles.tileIcon}>
        <MobileIcon name={icon} size={17} />
      </span>
      <b className={styles.tileValue}>
        {shown}
        {suffix ? <small>{` ${suffix}`}</small> : null}
      </b>
      <span className={styles.tileLabel}>{label}</span>
    </div>
  );
}

/** 도넛 링 — 값만큼 부드럽게 차오른다 */
function Ring({ color, value }: { color: string; value: number }) {
  const size = 92;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const timer = window.setTimeout(() => setFill(value), 350);
    return () => window.clearTimeout(timer);
  }, [value]);
  const pct = useCountUp(Math.round(value * 100), 350);
  return (
    <span className={styles.ring}>
      <svg height={size} viewBox={`0 0 ${size} ${size}`} width={size}>
        <circle className={styles.ringTrack} cx={size / 2} cy={size / 2} fill="none" r={r} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={r}
          stroke={color}
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={c * (1 - fill)}
          strokeLinecap="round"
          strokeWidth={stroke}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.33, 1, 0.68, 1)" }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <b style={{ color }}>{`${pct}%`}</b>
    </span>
  );
}

function Section({
  children,
  color,
  delay,
  icon,
  title,
}: {
  children: ReactNode;
  color: string;
  delay: number;
  icon: IoniconName;
  title: string;
}) {
  return (
    <section className={styles.card} style={{ "--c": color, animationDelay: `${delay}ms` } as CSSProperties}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionIcon}>
          <MobileIcon name={icon} size={15} />
        </span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function PointsCard({ color, icon, items, title }: { color: string; icon: IoniconName; items: string[]; title: string }) {
  return (
    <section className={`${styles.card} ${styles.pointsCard}`} style={{ "--c": color } as CSSProperties}>
      <div className={styles.sectionHead}>
        <span className={styles.pointsIcon}>
          <MobileIcon name={icon} size={15} />
        </span>
        <h3>{title}</h3>
      </div>
      {items.length === 0 ? (
        <p className={styles.empty}>—</p>
      ) : (
        items.map((item, index) => (
          <p className={styles.pointRow} data-no-translate="" key={`${item}-${index}`}>
            <i />
            <span>{item}</span>
          </p>
        ))
      )}
    </section>
  );
}
