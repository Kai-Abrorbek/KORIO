import { useEffect, type ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

/** 옛 자리에 멈춰 보여주는 시간 — 유저가 "어디였는지" 를 인식할 틈 */
const HOLD_MS = 450;
/** 옛 자리 → 새 자리 이동 */
const MOVE_MS = 780;

export const RANK_ANIM_TOTAL_MS = HOLD_MS + MOVE_MS + 320;

/**
 * 리더보드 한 줄.
 *
 * 리스트는 **이미 새 순위로** 그려진다(서버가 정렬해서 준다). 그래서 애니는
 * "새 자리에서 어딘가로 간다" 가 아니라 **"옛 자리에서 시작해 새 자리로 돌아온다"**
 * 여야 한다. startOffset 은 그 옛 자리까지의 거리다 (양수 = 아래에 있었다).
 *
 * 예전 구현은 반대였다. 새 자리에서 위로 -dist 만큼 밀고 0 으로 되돌리지도
 * 않아서, 순위차가 크면 화면 밖으로 날아가고 남의 줄을 덮어 그 사람이
 * 사라진 것처럼 보였다.
 *
 * 내가 올라가면 그 사이에 있던 사람들은 한 칸씩 **밀려 내려온다**. 그것도
 * 각자 자기 startOffset(음수)으로 표현된다 — 그래서 값이 행마다 다르고,
 * 애니메이션을 행이 직접 들고 있는 게 맞다.
 */
export default function LeagueRankRow({
  startOffset,
  animate,
  lifted = false,
  style,
  children,
}: {
  /** 이 행이 있던 옛 자리까지의 거리(px). 양수=아래, 음수=위, 0=제자리 */
  startOffset: number;
  /** 측정이 끝나 애니를 시작해도 되는지 */
  animate: boolean;
  /** 내 행만 살짝 들어올리고 그림자를 준다 */
  lifted?: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  const y = useSharedValue(0);
  const lift = useSharedValue(0);
  const settle = useSharedValue(1);

  useEffect(() => {
    if (!animate || startOffset === 0) return;

    // 옛 자리로 **즉시** 보낸다(애니 아님). 그 다음 새 자리로 돌아온다.
    y.value = startOffset;
    y.value = withDelay(
      HOLD_MS,
      withTiming(0, { duration: MOVE_MS, easing: Easing.inOut(Easing.cubic) }),
    );

    if (lifted) {
      lift.value = withSequence(
        withTiming(1, { duration: 200 }),
        withDelay(HOLD_MS + MOVE_MS - 400, withTiming(0, { duration: 200 })),
      );
      settle.value = withDelay(
        HOLD_MS + MOVE_MS,
        withSequence(
          withTiming(1.06, { duration: 110 }),
          withSpring(1, { damping: 7, stiffness: 220 }),
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, startOffset, lifted]);

  const rowStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: y.value },
      { scale: settle.value * (1 + lift.value * 0.04) },
    ],
    // 들려 있는 동안만 위로 올라온다. 평소엔 1 이라 겹침이 없다
    zIndex: 1 + lift.value * 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: lift.value * 0.3,
    shadowRadius: lift.value * 12,
    elevation: lift.value * 12,
  }));

  return <Animated.View style={[style, rowStyle]}>{children}</Animated.View>;
}
