"use client";

import { useCallback, useEffect, useState } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { dismissAppReview, getAppReviewPrompt } from "../api/app-review";

/**
 * "닫기" 는 다음 실행까지 — 미니앱을 다시 열면 풀린다 (모듈 변수, 앱의 useAppReviewPrompt 와 같다).
 */
let closedThisLaunch = false;
/** 이번 실행에서 이미 한 번 물어봤다 — 홈에 올 때마다 서버를 두드리지 않는다 */
let checkedThisLaunch = false;
/** 이번 실행에 평가 대화상자가 떴다 — 기능 안내(useFeatureTip)가 연달아 뜨지 않게 본다 */
let shownThisLaunch = false;
export const appReviewShownThisLaunch = () => shownThisLaunch;

/** 홈이 자리를 잡고 다른 안내가 먼저 지나가도록 조금 기다렸다 띄운다 */
const SHOW_DELAY_MS = 1800;

/**
 * 앱 평가 대화상자를 언제 띄울지. 서버가 7일 주기·하루 보지 않기·하루 닫은 횟수를 보고,
 * 여기서는 "이번 실행에 닫았나" 와 "지금 다른 게 떠 있나(blocked)" 만 본다.
 */
export function useAppReviewPrompt({ enabled, blocked }: { enabled: boolean; blocked: boolean }) {
  const { request } = useTelegramAuth();
  const [eligible, setEligible] = useState(false);
  const [reward, setReward] = useState(500);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled || checkedThisLaunch || closedThisLaunch) return;
    checkedThisLaunch = true;
    getAppReviewPrompt(request)
      .then((res) => {
        setReward(res.reward);
        setEligible(res.show);
      })
      .catch(() => undefined);
  }, [enabled, request]);

  useEffect(() => {
    if (!eligible || blocked || visible || closedThisLaunch) return;
    const timer = window.setTimeout(() => {
      shownThisLaunch = true;
      setVisible(true);
    }, SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [eligible, blocked, visible]);

  const finish = useCallback(() => {
    closedThisLaunch = true;
    setEligible(false);
    setVisible(false);
  }, []);

  const dismiss = useCallback(
    (mode: "close" | "snooze") => {
      finish();
      dismissAppReview(request, mode).catch(() => undefined);
    },
    [finish, request],
  );

  return { visible, reward, dismiss, finish };
}
