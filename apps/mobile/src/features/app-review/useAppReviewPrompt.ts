import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "expo-router";
import { AppReviewService } from "@/services/app-review.service";

/**
 * "닫기" 는 다음 실행까지 — 이 실행 동안은 다시 묻지 않는다.
 * 모듈 변수라 앱을 껐다 켜야 풀린다 (탭을 오가도 유지).
 */
let closedThisLaunch = false;
/** 이번 실행에서 이미 한 번 물어봤다 — 홈에 올 때마다 서버를 두드리지 않는다 */
let checkedThisLaunch = false;
/** 이번 실행에 평가 모달이 떴다 — 기능 안내(useFeatureTip)가 연달아 뜨지 않게 본다 */
let shownThisLaunch = false;
export const appReviewShownThisLaunch = () => shownThisLaunch;

/** 홈이 자리를 잡고 다른 안내가 먼저 지나가도록 조금 기다렸다 띄운다 */
const SHOW_DELAY_MS = 1800;

/**
 * 앱 평가 모달을 언제 띄울지. 서버가 7일 주기·하루 보지 않기·하루 닫은 횟수를 보고,
 * 여기서는 "이번 실행에 닫았나" 와 "지금 다른 게 떠 있나(blocked)" 만 본다.
 */
export function useAppReviewPrompt({
  enabled,
  blocked,
}: {
  enabled: boolean;
  /** 리텐션 대화상자·투어·언어 시트처럼 먼저 떠 있는 게 있으면 true */
  blocked: boolean;
}) {
  const [eligible, setEligible] = useState(false);
  const [reward, setReward] = useState(500);
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, []),
  );

  useEffect(() => {
    if (!enabled || checkedThisLaunch || closedThisLaunch) return;
    checkedThisLaunch = true;
    AppReviewService.prompt()
      .then((res) => {
        setReward(res.reward);
        setEligible(res.show);
      })
      .catch(() => {});
  }, [enabled]);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!eligible || !focused || blocked || visible || closedThisLaunch) return;
    timer.current = setTimeout(() => {
      shownThisLaunch = true;
      setVisible(true);
    }, SHOW_DELAY_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [eligible, focused, blocked, visible]);

  const finish = useCallback(() => {
    closedThisLaunch = true;
    setEligible(false);
    setVisible(false);
  }, []);

  const dismiss = useCallback(
    (mode: "close" | "snooze") => {
      finish();
      AppReviewService.dismiss(mode).catch(() => {});
    },
    [finish],
  );

  return { visible, reward, dismiss, finish };
}
