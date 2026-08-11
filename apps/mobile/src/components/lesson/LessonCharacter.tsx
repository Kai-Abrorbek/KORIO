import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  CHARACTER_RATIO,
  CharacterId,
  Mood,
  findPose,
  pickCharacter,
  pickPose,
} from "@/constants/character.catalog";
import { AnswerState } from "@/types/lesson";

interface Props {
  /** 채점 상태 */
  state: AnswerState;
  /** 문제 id — 같은 문제 안에서는 캐릭터가 유지되고, 문제가 바뀌면 다른 캐릭터가 나온다 */
  seed: string;
  /** 표시 높이. 폭은 원본 비율로 자동 계산 */
  height: number;
  /** 연속 정답 수. 3 이상이면 combo 포즈 */
  combo?: number;
  /** 캐릭터를 고정하고 싶을 때 */
  characterId?: CharacterId;
  /** 햅틱 끄기 */
  haptics?: boolean;
  style?: ViewStyle;
}

const SPRING = { damping: 11, stiffness: 190, mass: 0.9 };

export default function LessonCharacter({
  state,
  seed,
  height,
  combo = 0,
  characterId,
  haptics = true,
  style,
}: Props) {
  const character = useMemo(
    () => characterId ?? pickCharacter(seed),
    [characterId, seed],
  );

  const mood: Mood = useMemo(() => {
    if (state === "wrong") return "wrong";
    if (state === "correct") return combo >= 3 ? "combo" : "correct";
    return "idle";
  }, [state, combo]);

  const pose = useMemo(
    () => pickPose(character, mood, seed),
    [character, mood, seed],
  );

  // 실제로 그려지는 포즈. 전환 중에는 이전 포즈가 남아있다
  const [shownKey, setShownKey] = useState(pose.key);
  const shown = useMemo(() => findPose(shownKey), [shownKey]);

  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const breathe = useSharedValue(1);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const rot = useSharedValue(0);

  // 첫 마운트에서는 정답/오답 리액션을 재생하지 않는다
  const mounted = useRef(false);

  const playReaction = useCallback(
    (m: Mood, withEntrance: boolean) => {
      if (withEntrance) {
        opacity.value = withTiming(1, { duration: 130 });
        scale.value = withSequence(
          withTiming(0.86, { duration: 0 }),
          withSpring(1, SPRING),
        );
      }

      if (m === "correct" || m === "combo") {
        ty.value = withSequence(
          withSpring(-height * 0.07, { damping: 8, stiffness: 260 }),
          withSpring(0, SPRING),
        );
        rot.value = withSequence(
          withTiming(m === "combo" ? -5 : -3, { duration: 110 }),
          withSpring(0, { damping: 7, stiffness: 200 }),
        );
        if (haptics) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      } else if (m === "wrong") {
        tx.value = withSequence(
          withTiming(-9, { duration: 55 }),
          withTiming(9, { duration: 55 }),
          withTiming(-7, { duration: 50 }),
          withTiming(5, { duration: 50 }),
          withSpring(0, SPRING),
        );
        rot.value = withSequence(
          withTiming(3, { duration: 60 }),
          withTiming(-3, { duration: 60 }),
          withSpring(0, SPRING),
        );
        if (haptics) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
      }
    },
    [height, haptics],
  );

  // 포즈 교체: 살짝 줄이며 페이드아웃 → 스왑 → 오버슈트로 등장
  useEffect(() => {
    if (pose.key === shownKey) {
      // 같은 포즈가 다시 뽑힌 경우엔 스왑 없이 리액션만
      if (mounted.current) playReaction(mood, false);
      return;
    }
    opacity.value = withTiming(0, { duration: 100 });
    scale.value = withTiming(0.9, { duration: 100 }, (done) => {
      if (done) runOnJS(setShownKey)(pose.key);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pose.key]);

  // 스왑 완료 후 등장 + 리액션
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    playReaction(mood, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shownKey]);

  // idle 일 때만 호흡시킨다
  useEffect(() => {
    cancelAnimation(breathe);
    if (mood === "idle") {
      breathe.value = withRepeat(
        withSequence(
          withTiming(1.018, { duration: 1500 }),
          withTiming(1, { duration: 1500 }),
        ),
        -1,
        false,
      );
    } else {
      breathe.value = withTiming(1, { duration: 200 });
    }
    return () => cancelAnimation(breathe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood]);

  const aStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { scale: scale.value * breathe.value },
      { rotate: `${rot.value}deg` },
    ],
  }));

  const width = height * CHARACTER_RATIO;

  return (
    <View style={[s.wrap, { width, height }, style]}>
      <Animated.View style={[s.fill, aStyle]}>
        <Image source={shown.src} style={s.fill} resizeMode="contain" />
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  // 점프/회전 여유분이 잘리지 않게 overflow 를 열어둔다
  wrap: {
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "visible",
  },
  fill: { width: "100%", height: "100%" },
});
