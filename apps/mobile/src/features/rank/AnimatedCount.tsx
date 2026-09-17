import { TextInput, type TextStyle, type StyleProp } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

/**
 * 숫자가 굴러 올라가는 카운터.
 *
 * `<Text>{n}</Text>` 를 상태로 올리면 **60프레임마다 리렌더**가 돈다 — 목록
 * 옆에서 같이 돌면 눈에 띄게 끊긴다. TextInput 의 `text` 프로퍼티는
 * animatedProps 로 UI 스레드에서 직접 꽂을 수 있어서 JS 가 한 번도 안 깨어난다.
 *
 * ⚠️ `editable={false}` + `value` 대신 `defaultValue` 여야 한다. value 를 주면
 *    리액트가 매 프레임 다시 제어권을 가져가서 애니메이션을 덮어쓴다.
 */
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
  const v = useSharedValue(0);

  useEffect(() => {
    v.value = 0;
    v.value = withTiming(to, {
      duration,
      // 빠르게 튀어나갔다가 끝에서 천천히 멈춘다 — 멈추는 지점이 강조된다
      easing: Easing.out(Easing.cubic),
    });
  }, [to, duration]);

  const props = useAnimatedProps(() => {
    "worklet";
    const n = Math.round(v.value);
    // 천 단위 구분. toLocaleString 은 워크릿에서 못 쓴다
    const s = String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return { text: `${prefix}${s}${suffix}` } as never;
  });

  return (
    <AnimatedInput
      animatedProps={props}
      editable={false}
      defaultValue={`${prefix}0${suffix}`}
      style={style}
      // 안드로이드 TextInput 은 기본 패딩·밑줄이 붙어서 Text 와 안 맞는다
      underlineColorAndroid="transparent"
      pointerEvents="none"
      // 접근성: 화면 낭독기에는 최종 값만 읽힌다
      accessibilityLabel={`${prefix}${to}${suffix}`}
    />
  );
}
