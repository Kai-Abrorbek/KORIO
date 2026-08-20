import { memo, useEffect, useMemo, useRef } from "react";
import { Text } from "react-native";
import type { StyleProp, TextStyle } from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import { buildSpokenTimeline } from "../utils/speech-timing";
import type { SpokenSegment } from "../utils/speech-timing";

/**
 * useSpeech 의 speechProgress 는 플레이어 상태에서 오는 값이라 100ms 간격으로만
 * 갱신된다. 그대로 쓰면 초당 10번 뚝뚝 끊긴다.
 *
 * 주의: 도착한 값까지 withTiming 으로 "따라가면" 항상 한 틱 뒤를 쫓게 된다.
 * 틱이 올 때 그 값은 이미 지나간 위치이기 때문이다. 그래서 실제 위치로 맞춘 뒤
 * 직전 틱만큼 더 나아간 지점을 목표로 잡아, 다음 틱이 도착할 즈음 마침 그
 * 위치에 닿도록 앞을 예측한다.
 */
const TICK_MS = 110;

/**
 * 플레이어가 알려주는 재생 위치 자체가 조금 늦다(상태 샘플링 + 브리지 지연).
 * 전체 길이 대비 비율로 그만큼 앞당긴다.
 */
const LEAD_RATIO = 0.22;

/** 글자 하나가 강조됐다가 풀리는 폭. 너무 좁으면 깜빡이고 넓으면 뭉갠다. */
const ACTIVE_SPREAD = 0.5;

/** 강조가 가장 진해지는 지점. 글자 앞쪽이라야 소리와 같이 간다고 느껴진다. */
const ACTIVE_PEAK = 0.25;

interface CharProps {
  segment: SpokenSegment;
  progress: SharedValue<number>;
  baseColor: string;
  accentColor: string;
}

/**
 * 애니메이션은 SharedValue 로 UI 스레드에서 돈다. 재생 중 부모가 초당 10번
 * 리렌더돼도 여기까지 내려올 이유가 없어서 막는다. segment 는 text 기준
 * useMemo 결과, progress 는 SharedValue 라 참조가 안정적이다.
 */
const SpokenChar = memo(function SpokenChar({
  segment,
  progress,
  baseColor,
  accentColor,
}: CharProps) {
  const { start, end, voiced } = segment;

  const animatedStyle = useAnimatedStyle(() => {
    const p = progress.value;
    const span = Math.max(0.008, (end - start) * ACTIVE_SPREAD);

    // 이 글자를 지나갔는가 (0 → 1). 지나간 글자는 계속 또렷하게 남는다.
    const read = interpolate(
      p,
      [start - 0.004, start + 0.004],
      [0, 1],
      Extrapolation.CLAMP,
    );

    // 지금 읽는 중인가. 지나가면 다시 0 으로 돌아가 물결처럼 흐른다.
    const active = voiced
      ? interpolate(
          p,
          [start - span * 0.4, start + (end - start) * ACTIVE_PEAK, end + span],
          [0, 1, 0],
          Extrapolation.CLAMP,
        )
      : 0;

    return {
      color: interpolateColor(active, [0, 1], [baseColor, accentColor]),
      opacity: 0.34 + 0.66 * read,
    };
  }, [start, end, voiced, baseColor, accentColor]);

  return <Animated.Text style={animatedStyle}>{segment.char}</Animated.Text>;
});

interface Props {
  text: string;
  /** 0~1. 재생 중이 아닐 때 값은 무시된다 */
  progress: number;
  playing: boolean;
  baseColor: string;
  accentColor: string;
  style?: StyleProp<TextStyle>;
}

/**
 * 읽고 있는 위치를 글자 단위로 따라가는 텍스트.
 * 이미 읽은 부분은 또렷하게 남고, 읽는 지점만 강조색으로 물결친다.
 */
export default function SpokenText({
  text,
  progress,
  playing,
  baseColor,
  accentColor,
  style,
}: Props) {
  const segments = useMemo(() => buildSpokenTimeline(text), [text]);
  const shared = useSharedValue(0);
  const lastProgress = useRef(0);

  useEffect(() => {
    if (!playing) {
      // 재생이 끝나면 전체를 원래 색으로 되돌린다
      shared.value = withTiming(0, { duration: 220 });
      lastProgress.current = 0;
      return;
    }

    const target = Math.min(1, progress + LEAD_RATIO);

    // 새 발화가 시작돼 값이 뒤로 갔으면 되감기처럼 보이지 않게 즉시 맞춘다
    if (target < shared.value) {
      shared.value = target;
      lastProgress.current = progress;
      return;
    }

    // 직전 틱에서 나아간 만큼을 다음 틱에도 나아간다고 보고 그 지점을 겨눈다.
    const step = Math.max(0, progress - lastProgress.current);
    lastProgress.current = progress;

    shared.value = target;
    shared.value = withTiming(Math.min(1, target + step), {
      duration: TICK_MS,
      easing: Easing.linear,
    });
  }, [playing, progress, shared]);

  if (segments.length === 0) {
    return <Text style={style}>{text}</Text>;
  }

  return (
    <Text style={style}>
      {segments.map((segment, index) => (
        <SpokenChar
          key={`${segment.char}-${index}`}
          segment={segment}
          progress={shared}
          baseColor={baseColor}
          accentColor={accentColor}
        />
      ))}
    </Text>
  );
}
