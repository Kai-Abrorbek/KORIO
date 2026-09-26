import { Text, type TextStyle, type StyleProp } from "react-native";
import { useEffect, useRef, useState } from "react";

/**
 * 숫자가 굴러 올라가는 카운터.
 *
 * ⚠️ 예전엔 TextInput + animatedProps 로 UI 스레드에서 글자를 꽂았다. 리렌더가
 *    없어서 가벼웠지만, **부모가 한 번 다시 그리면 글자가 defaultValue 인 "0"
 *    으로 돌아갔다.** 애니메이션은 이미 끝나서 아무도 다시 안 써주니 0 이 그대로
 *    남았다 — 홈 화면에서 "순위를 보여주다가 잠시 뒤 0 으로 바뀌는" 버그가
 *    이거였다.
 *
 * 그래서 표시값을 리액트 상태로 들고 있는다. 리렌더가 몇 번 나든 마지막 값이
 * 그대로 살아 있고, 끝나면 언제나 정확히 `to` 다. 대신 매 프레임 대신 ~22fps 로
 * 끊어 올린다 — 숫자가 굴러가는 데는 그걸로 충분하고, 리렌더 비용도 1초짜리다.
 */
const STEP_MS = 45;

/** 빠르게 튀어나갔다가 끝에서 천천히 멈춘다 — 멈추는 지점이 강조된다 */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const group = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default function AnimatedCount({
  to,
  duration = 1100,
  delay = 0,
  prefix = "",
  suffix = "",
  style,
}: {
  to: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  style?: StyleProp<TextStyle>;
}) {
  // 처음부터 목표값을 들고 있는다. 애니메이션이 못 돌더라도(저사양·백그라운드)
  // 틀린 숫자가 남지 않는다
  const [shown, setShown] = useState(to);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (duration <= 0) {
      setShown(to);
      return;
    }

    let startedAt = 0;
    const tick = () => {
      const now = Date.now();
      if (!startedAt) startedAt = now;
      const p = Math.min(1, (now - startedAt) / duration);
      setShown(Math.round(easeOutCubic(p) * to));
      if (p < 1) timer.current = setTimeout(tick, STEP_MS);
    };

    setShown(0);
    timer.current = setTimeout(tick, delay);
    return () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
    };
  }, [to, duration, delay]);

  return (
    <Text
      style={style}
      accessibilityLabel={`${prefix}${group(to)}${suffix}`}
      allowFontScaling={false}
    >
      {prefix}
      {group(shown)}
      {suffix}
    </Text>
  );
}
