"use client";

import { useEffect, useRef, useState } from "react";

import { ApiError } from "../../../shared/api/client";
import { playSfx } from "../../../shared/browser/sfx";
import { translateText, useAppLanguage } from "../../../shared/i18n/language-context";
import { uzt } from "../../../shared/i18n/uz-text";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { haptic } from "../../retention/model/retention";
import { Button3D } from "../../retention/ui/parts";
import { submitAppReview } from "../api/app-review";
import { BOW_BOTTOM_AT, BOW_CHEER_AT, HaneulmonBow } from "./haneulmon-bow";
import styles from "./app-review.module.css";

const COMMENT_MAX = 1000;
const FADE_MS = 180;
/** 기뻐하는 모습을 잠깐 보여 주고 상자로 */
const DONE_AT = BOW_CHEER_AT + 700;

/** 별점에 따라 하늘몬 표정이 바뀐다 — 0 은 아직 안 고름 */
const MOOD_BY_RATING = ["thinking", "wrong", "confused", "shy", "great", "celebrating"];

/**
 * 앱 평가 — 가운데 뜨는 대화상자 (앱 AppReviewModal 과 같다). 하지 않아도 된다.
 *
 * 열림/닫힘은 RewardDialog 처럼 페이드 하나. 카드와 버튼은 열릴 때 움직이지 않는다.
 * 움직이는 건 누른 별과, 보낸 뒤의 감사 연출(HaneulmonBow)뿐이다.
 */
export function AppReviewDialog({
  open,
  reward,
  onClose,
  onSnooze,
  onAlready,
  onDone,
}: {
  open: boolean;
  reward: number;
  /** "닫기" — 다음 실행에 다시 */
  onClose: () => void;
  /** "하루 동안 보지 않기" */
  onSnooze: () => void;
  /** 이미 이번 주에 평가했다 — 조용히 닫는다 */
  onAlready: () => void;
  /** 감사 연출까지 끝났다 — 부모가 닫고 상자 화면으로 보낸다 */
  onDone: (res: { reward: number; gems: number }) => void;
}) {
  const { request } = useTelegramAuth();
  const { language } = useAppLanguage();
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [thanks, setThanks] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setRating(0);
      setComment("");
      setError(null);
      setThanks(false);
      setReducedMotion(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
      // 붙은 다음 프레임에 켜야 transition 이 돈다
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }
    setShown(false);
    const timer = window.setTimeout(() => setMounted(false), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!mounted) return null;

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const playThanks = (res: { reward: number; gems: number }) => {
    setThanks(true);
    if (reducedMotion) {
      haptic("success");
      later(() => onDone(res), 1600);
      return;
    }
    later(() => window.Telegram?.WebApp.HapticFeedback?.impactOccurred("medium"), BOW_BOTTOM_AT);
    later(() => {
      playSfx("correct");
      haptic("success");
    }, BOW_CHEER_AT);
    later(() => onDone(res), DONE_AT);
  };

  const submit = async () => {
    if (!rating || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await submitAppReview(request, {
        rating,
        comment: comment.trim() || undefined,
        locale: language,
      });
      playThanks(res);
    } catch (caught) {
      if (caught instanceof ApiError && caught.code === "APP_REVIEW_ALREADY") {
        setError("appReview.already");
        later(onAlready, 1400);
      } else {
        setError("appReview.error");
      }
    } finally {
      setSending(false);
    }
  };

  const busy = sending || thanks;
  const placeholderKey =
    rating && rating <= 3 ? "appReview.placeholderLow" : "appReview.placeholderHigh";

  return (
    <div
      aria-modal="true"
      className={`${styles.root} ${shown && open ? styles.shown : ""}`}
      role="dialog"
    >
      <div className={styles.backdrop} />
      <section className={styles.card}>
        {/* 카드 위쪽만 하늘몬 보라로 은은하게 물든다 — 하늘몬은 그 위에 서서 가장자리 너머로 고개를 내민다 */}
        <span aria-hidden className={styles.sky} />
        <div className={`${styles.form} ${thanks ? styles.formHidden : ""}`}>
          <span className={styles.peek}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={`/characters/hangulmon_${MOOD_BY_RATING[rating]}.png`} />
          </span>

          <span className={styles.gift}>
            <MobileIcon name="diamond" size={14} />
            <span data-i18n="appReview.reward">{uzt("appReview.reward", { n: reward })}</span>
          </span>

          <h2 data-i18n="appReview.title">{uzt("appReview.title")}</h2>
          <p data-i18n="appReview.body">{uzt("appReview.body")}</p>

          <div className={styles.stars} role="radiogroup">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                aria-checked={n === rating}
                aria-label={`${n}`}
                className={`${styles.star} ${n <= rating ? styles.starOn : ""} ${n === rating ? styles.starPicked : ""}`}
                disabled={busy}
                key={n}
                onClick={() => {
                  haptic("light");
                  setRating(n);
                  setError(null);
                }}
                role="radio"
                type="button"
              >
                <MobileIcon className={styles.starDepth} name="star" size={40} />
                <MobileIcon className={styles.starFace} name="star" size={40} />
              </button>
            ))}
          </div>
          <span
            className={`${styles.rateLabel} ${rating ? "" : styles.rateHint}`}
            data-i18n={rating ? `appReview.rating${rating}` : "appReview.rateHint"}
          >
            {rating ? uzt(`appReview.rating${rating}`) : uzt("appReview.rateHint")}
          </span>

          <textarea
            aria-label={translateText(uzt(placeholderKey))}
            className={styles.input}
            disabled={busy}
            maxLength={COMMENT_MAX}
            onChange={(event) => setComment(event.target.value)}
            placeholder={translateText(uzt(placeholderKey))}
            value={comment}
          />
          {comment.length > COMMENT_MAX - 100 ? (
            <span className={styles.counter}>
              {comment.length}/{COMMENT_MAX}
            </span>
          ) : null}

          {error ? (
            <span className={styles.error} data-i18n={error}>
              {uzt(error)}
            </span>
          ) : null}

          <Button3D
            className={styles.submit}
            disabled={!rating || thanks}
            i18nKey="appReview.submit"
            label={uzt("appReview.submit", { n: reward })}
            loading={sending}
            onClick={() => void submit()}
          />

          <div className={styles.footer}>
            <button disabled={busy} onClick={onSnooze} type="button">
              <span data-i18n="appReview.later">{uzt("appReview.later")}</span>
            </button>
            <i aria-hidden />
            <button disabled={busy} onClick={onClose} type="button">
              <span data-i18n="appReview.close">{uzt("appReview.close")}</span>
            </button>
          </div>
        </div>

        {thanks ? (
          <div className={styles.stage}>
            <HaneulmonBow reducedMotion={reducedMotion} size={160} />
            <div className={`${styles.words} ${reducedMotion ? styles.still : ""}`}>
              <strong lang="ko">감사합니다</strong>
              <span data-i18n="appReview.thanks">{uzt("appReview.thanks")}</span>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
