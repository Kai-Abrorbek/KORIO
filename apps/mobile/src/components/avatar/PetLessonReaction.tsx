import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { isPet, PetImage, petStage } from "./AvatarPet";
import type { AnswerState } from "@/types/lesson";

/** The equipped pet shares answer feedback without changing grades or rewards. */
export default function PetLessonReaction({
  pet,
  streak,
  state,
  recovered,
}: {
  pet?: string | null;
  streak?: number | null;
  state: AnswerState;
  recovered?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const bounce = useSharedValue(0);
  const sway = useSharedValue(0);

  useEffect(() => {
    bounce.value = 0;
    sway.value = 0;
    if (state === "idle" || reducedMotion || !isPet(pet)) return;
    if (state === "correct") {
      bounce.value = withSequence(
        withTiming(-13, { duration: 170 }),
        withTiming(0, { duration: 210 }),
        withTiming(-7, { duration: 135 }),
        withTiming(0, { duration: 170 }),
      );
    } else {
      sway.value = withSequence(
        withTiming(-7, { duration: 110 }),
        withTiming(7, { duration: 110 }),
        withTiming(0, { duration: 110 }),
      );
    }
  }, [state, pet, reducedMotion, bounce, sway]);

  const motion = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }, { translateX: sway.value }],
  }));

  if (!isPet(pet)) return null;
  return (
    <View style={styles.wrap} accessibilityLabel={recovered ? "✦ +1" : undefined}>
      <Animated.View style={motion}>
        <PetImage pet={pet} stage={petStage(streak)} size={58} />
      </Animated.View>
      {recovered ? <Text style={styles.star}>✦ +1</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: 58, height: 58, alignItems: "center", justifyContent: "center" },
  star: {
    position: "absolute",
    right: -5,
    top: -13,
    color: "#A55700",
    backgroundColor: "#FFF5C2",
    borderRadius: 999,
    overflow: "hidden",
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 10,
    fontWeight: "900",
  },
});
