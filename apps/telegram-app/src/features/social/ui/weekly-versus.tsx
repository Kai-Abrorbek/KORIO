"use client";

import { useEffect, useState, type CSSProperties } from "react";

import { uzt } from "../../../shared/i18n/uz-text";
import type { AvatarConfig } from "../../../shared/model/avatar";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import type { VersusWeek } from "../model/social";
import { FriendAvatar } from "./social-parts";
import styles from "./weekly-versus.module.css";

/**
 * 친구 프로필 "이번 주 대결" — 모바일 WeeklyVersus 와 같은 화면.
 *
 * 예전 "Haftalik o'sish" 는 두 사람의 최근 7일을 순서대로 겹친 곡선이라
 * 요일이 한국어로 박혀 있었고(일·월·화), 눈금이 347·231 처럼 떨어지지 않았고,
 * 곡선이라 하루 값을 읽을 수 없었고, 무엇을 보여주는지 써 있지 않았다.
 *
 * 이제:
 * - 리그와 같은 주(월~일) — 합계가 리그 순위표 XP 와 맞는다
 * - 위: 누가 몇 XP 로 앞서는지 + 줄다리기 막대 + 한 줄 상황
 * - 가운데: 날짜별 막대 두 개(친구 · 나), 깔끔한 눈금, 오늘 표시, 안 온 날은 점선
 * - 날짜를 누르면 그날 정확한 값
 * - 아래: 지난주 결과
 */
const THEM = "#45B7D1";
const ME = "#776ee2";

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

/** 0 · s · 2s · 3s 눈금이 떨어지게 */
function niceStep(max: number) {
  if (max <= 0) return 50;
  const raw = max / 3;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((m) => m * pow >= raw) ?? 10;
  return step * pow;
}

/** 숫자가 0 에서 차오른다 */
function useCountUp(target: number, duration = 700) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(target * (1 - (1 - t) ** 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

export function WeeklyVersus({
  data,
  name,
  themAvatar,
  themImage,
  meAvatar,
  meImage,
  meName,
}: {
  data: VersusWeek;
  name: string;
  themAvatar?: Partial<AvatarConfig> | null;
  themImage?: string;
  meAvatar?: Partial<AvatarConfig> | null;
  meImage?: string;
  meName: string;
}) {
  const todayIndex = Math.max(0, data.days.findIndex((day) => day.date === data.today));
  const [selected, setSelected] = useState(todayIndex);
  const solo = data.isMe;

  const max = Math.max(...data.days.map((day) => (solo ? day.me : Math.max(day.them, day.me))), 0);
  const step = niceStep(max);
  const top = step * 3;
  const daysLeft = data.days.length - todayIndex;

  const themTotal = useCountUp(data.them);
  const meTotal = useCountUp(data.me);
  const diff = data.them - data.me;
  const share = data.them + data.me > 0 ? data.them / (data.them + data.me) : 0.5;

  const status: { key: string; tone?: string; vars?: Record<string, string | number> } =
    data.them === 0 && data.me === 0
      ? { key: "empty", tone: styles.toneMuted, vars: undefined }
      : diff === 0
        ? { key: "tied", tone: styles.toneMuted, vars: undefined }
        : diff < 0
          ? { key: "ahead", tone: styles.toneGood, vars: { n: fmt(-diff) } }
          : { key: "behind", tone: styles.toneHot, vars: { n: fmt(diff), name } };

  const day = data.days[selected] ?? data.days[todayIndex];

  return (
    <section className={styles.card} style={{ "--them": THEM, "--me": ME } as CSSProperties}>
      <header className={styles.head}>
        <div>
          <h2 data-i18n="friendProfile.versus.title">{uzt("friendProfile.versus.title")}</h2>
          <p data-i18n="friendProfile.versus.subtitle">{uzt("friendProfile.versus.subtitle")}</p>
        </div>
        <span className={`${styles.left} ${daysLeft <= 1 ? styles.leftLast : ""}`}>
          <MobileIcon name={daysLeft <= 1 ? "flame" : "time"} size={13} />
          {daysLeft <= 1 ? (
            <span data-i18n="friendProfile.versus.lastDay">{uzt("friendProfile.versus.lastDay")}</span>
          ) : (
            <span data-i18n="friendProfile.versus.daysLeft">{uzt("friendProfile.versus.daysLeft", { n: daysLeft })}</span>
          )}
        </span>
      </header>

      {!solo ? (
        <>
          <div className={styles.score}>
            <div className={styles.side}>
              <span className={`${styles.ring} ${styles.ringThem}`}>
                <FriendAvatar avatar={themAvatar} imageUrl={themImage} name={name} size={38} />
              </span>
              <span>
                <b className={styles.sideName} data-no-translate>
                  {name}
                </b>
                <strong className={styles.themNum} data-no-translate>
                  {fmt(themTotal)}
                  <small>XP</small>
                  {diff > 0 ? <MobileIcon className={styles.crown} name="trophy" size={14} /> : null}
                </strong>
              </span>
            </div>
            <i className={styles.vs} data-no-translate>
              VS
            </i>
            <div className={`${styles.side} ${styles.sideMe}`}>
              <span>
                <b className={styles.sideName} data-i18n="friendProfile.versus.you">
                  {uzt("friendProfile.versus.you")}
                </b>
                <strong className={styles.meNum} data-no-translate>
                  {diff < 0 ? <MobileIcon className={styles.crown} name="trophy" size={14} /> : null}
                  {fmt(meTotal)}
                  <small>XP</small>
                </strong>
              </span>
              <span className={`${styles.ring} ${styles.ringMe}`}>
                <FriendAvatar avatar={meAvatar} imageUrl={meImage} name={meName} size={38} />
              </span>
            </div>
          </div>

          <div className={styles.tug} style={{ "--share": share } as CSSProperties}>
            <i />
            <i />
          </div>
          <p className={`${styles.status} ${status.tone}`} data-i18n={`friendProfile.versus.status.${status.key}`}>
            {uzt(`friendProfile.versus.status.${status.key}`, status.vars)}
          </p>
        </>
      ) : null}

      <div className={styles.chart}>
        <div aria-hidden="true" className={styles.axis}>
          {[3, 2, 1, 0].map((i) => (
            <span data-no-translate key={i}>
              {fmt(step * i)}
            </span>
          ))}
        </div>
        <div className={styles.plot}>
          <div aria-hidden="true" className={styles.grid}>
            {[0, 1, 2, 3].map((i) => (
              <i key={i} />
            ))}
          </div>
          {data.days.map((d, i) => {
            const future = i > todayIndex;
            const active = i === selected;
            return (
              <button
                aria-label={uzt(`friendProfile.versus.daysLong.${d.weekday}`)}
                aria-pressed={active}
                className={`${styles.col} ${future ? styles.future : ""} ${active ? styles.colActive : ""} ${i === todayIndex ? styles.colToday : ""}`}
                disabled={future}
                key={d.date}
                onClick={() => {
                  window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
                  setSelected(i);
                }}
                type="button"
              >
                <span className={styles.bars}>
                  {future ? (
                    <i className={styles.ghost} />
                  ) : (
                    <>
                      {!solo ? <Bar color="var(--them)" index={i} top={top} value={d.them} /> : null}
                      <Bar color="var(--me)" index={i} top={top} value={d.me} />
                    </>
                  )}
                </span>
                <small data-i18n={`friendProfile.versus.days.${d.weekday}`}>
                  {uzt(`friendProfile.versus.days.${d.weekday}`)}
                </small>
              </button>
            );
          })}
        </div>
      </div>

      {day ? (
        <div className={styles.detail}>
          <span className={styles.detailDay}>
            <b data-i18n={`friendProfile.versus.daysLong.${day.weekday}`}>
              {uzt(`friendProfile.versus.daysLong.${day.weekday}`)}
            </b>
            {selected === todayIndex ? (
              <em data-i18n="friendProfile.versus.today">{uzt("friendProfile.versus.today")}</em>
            ) : null}
          </span>
          {!solo ? (
            <span className={styles.detailVal}>
              <i style={{ background: THEM }} />
              <b data-no-translate>{fmt(day.them)}</b>
            </span>
          ) : null}
          <span className={styles.detailVal}>
            <i style={{ background: ME }} />
            <b data-no-translate>{fmt(day.me)}</b>
          </span>
          <small>XP</small>
        </div>
      ) : null}

      {!solo && (data.lastWeek.them > 0 || data.lastWeek.me > 0) ? <LastWeek data={data} name={name} /> : null}
    </section>
  );
}

function Bar({ color, index, top, value }: { color: string; index: number; top: number; value: number }) {
  const ratio = top > 0 ? Math.min(1, value / top) : 0;
  return (
    <i
      className={`${styles.bar} ${value === 0 ? styles.barZero : ""}`}
      style={{ "--c": color, "--h": ratio, "--i": index } as CSSProperties}
    />
  );
}

function LastWeek({ data, name }: { data: VersusWeek; name: string }) {
  const { them, me } = data.lastWeek;
  const result =
    me > them
      ? { key: "lastWeekWon", tone: styles.toneGood, vars: undefined }
      : them > me
        ? { key: "lastWeekLost", tone: styles.toneHot, vars: { name } }
        : { key: "lastWeekTie", tone: styles.toneMuted, vars: undefined };
  return (
    <div className={styles.last}>
      <span data-i18n="friendProfile.versus.lastWeek">{uzt("friendProfile.versus.lastWeek")}</span>
      <span className={styles.lastNums} data-no-translate>
        <i style={{ background: THEM }} />
        {fmt(them)}
        <em>·</em>
        <i style={{ background: ME }} />
        {fmt(me)}
      </span>
      <b className={result.tone} data-i18n={`friendProfile.versus.${result.key}`}>
        {uzt(`friendProfile.versus.${result.key}`, result.vars)}
      </b>
    </div>
  );
}
