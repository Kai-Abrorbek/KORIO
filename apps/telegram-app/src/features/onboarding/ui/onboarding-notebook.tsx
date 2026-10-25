"use client";

import { Fragment, useEffect, useState, type CSSProperties } from "react";

import { uzt } from "../../../shared/i18n/uz-text";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import styles from "./onboarding.module.css";

export interface NotebookEntry {
  /** 어느 질문의 답인지 — 같은 key 의 글이 바뀌면 그 줄만 다시 쓴다 */
  key: string;
  /** 고른 답들. 번역기가 한 마디씩 바꿔 끼우도록 따로 그린다 */
  labels: string[];
  icon: IoniconName;
  color: string;
}

/** 공책에 보이는 줄 수. 넘치면 오래된 줄이 위로 밀려난다 */
const LINES = 3;

/**
 * 이미 써 둔 줄. 설문 화면은 질문마다 다시 그려지는데(key=step), 그때마다
 * 앞 줄을 처음부터 다시 쓰면 산만하다 — 한 번 쓴 줄은 그대로 둔다.
 * (렌더 중이 아니라 붙은 뒤에 적는다 — 개발 모드의 두 번 렌더에도 한 번은 써지게)
 */
const written = new Set<string>();
const lineKey = (entry: NotebookEntry) => `${entry.key}:${entry.labels.join("|")}`;

/**
 * 설문 위 — 하늘몬이 연필로 공책에 유저가 고른 답을 한 줄씩 적는다 (앱 OnboardingNotebook 과 같다).
 * 하늘몬 그림(default)은 원래 한 손에 연필, 한 손에 공책을 들고 있다.
 */
export function OnboardingNotebook({ entries }: { entries: NotebookEntry[] }) {
  const visible = entries.slice(-LINES);
  const last = visible[visible.length - 1];
  const writingKey = last ? lineKey(last) : "";

  return (
    <div className={styles.nbRow}>
      <Scribbler key={writingKey} writingKey={writingKey} />

      <div className={styles.nbBook}>
        <span aria-hidden className={styles.nbHoles}>
          {Array.from({ length: 6 }, (_, index) => <i key={index} />)}
        </span>
        <small data-i18n="onboarding.survey.notebook">{uzt("onboarding.survey.notebook")}</small>
        <div className={styles.nbPage}>
          {visible.map((entry) => (
            <NotebookLine entry={entry} key={lineKey(entry)} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** 새 줄을 쓸 때마다 다시 붙어서 끄적이는 몸짓이 한 번 돈다 */
function Scribbler({ writingKey }: { writingKey: string }) {
  const [fresh] = useState(() => Boolean(writingKey) && !written.has(writingKey));
  return (
    <span className={`${styles.nbMascot} ${fresh ? styles.nbScribble : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src="/characters/hangulmon_default.png" />
    </span>
  );
}

/** 한 줄 — 처음 붙을 때 연필이 지나가며 글이 왼쪽부터 드러난다 */
function NotebookLine({ entry }: { entry: NotebookEntry }) {
  const key = lineKey(entry);
  const [animate] = useState(() => !written.has(key));
  useEffect(() => {
    written.add(key);
  }, [key]);

  const chars = entry.labels.join(", ").length;
  // 글자 수에 맞춰 — 짧은 답은 빨리, 긴 답도 1초를 넘지 않게
  const duration = Math.min(900, Math.max(380, chars * 34));
  return (
    <div className={styles.nbLine}>
      <span
        className={`${styles.nbInk} ${animate ? styles.nbWrite : ""}`}
        style={{ "--accent": entry.color, "--write": `${duration}ms` } as CSSProperties}
      >
        <MobileIcon name={entry.icon} size={13} />
        <span className={styles.nbText}>
          {entry.labels.map((label, index) => (
            <Fragment key={label}>
              {index ? ", " : null}
              <span>{label}</span>
            </Fragment>
          ))}
        </span>
        {animate ? (
          <i aria-hidden className={styles.nbPencil}>
            <MobileIcon name="pencil" size={15} />
          </i>
        ) : null}
      </span>
    </div>
  );
}
