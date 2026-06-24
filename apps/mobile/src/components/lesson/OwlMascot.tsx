import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Asset } from "expo-asset";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
  withRepeat,
  cancelAnimation,
} from "react-native-reanimated";

// Rive 모듈 lazy require (Expo Go 안전장치)
let Rive: any = null;
let Fit: any = { Contain: "contain" };
let Alignment: any = { Center: "center" };
try {
  const m = require("rive-react-native");
  Rive = m.default;
  Fit = m.Fit;
  Alignment = m.Alignment;
} catch {
  // Rive 네이티브 모듈 없음 → emoji fallback
}

export type OwlState =
  | "idle"
  | "correct"
  | "combo"
  | "wrong"
  | "angry"
  | "complete"
  | "hint";

const RIV_MODULES: Record<OwlState, any> = {
  idle: require("../../../assets/animations/owl_idle.riv"),
  correct: require("../../../assets/animations/owl_correct.riv"),
  combo: require("../../../assets/animations/owl_combo.riv"),
  wrong: require("../../../assets/animations/owl_wrong.riv"),
  angry: require("../../../assets/animations/owl_angry.riv"),
  complete: require("../../../assets/animations/owl_complete.riv"),
  hint: require("../../../assets/animations/owl_hint.riv"),
};

const OWL_EMOJI_FALLBACK: Record<OwlState, string> = {
  idle: "🦉",
  correct: "🥳",
  combo: "😎",
  wrong: "😢",
  angry: "😡",
  complete: "🎉",
  hint: "🤔",
};

interface Props {
  state?: OwlState;
  size?: number;
}

export default function OwlMascot({ state = "idle", size = 120 }: Props) {
  const [uri, setUri] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;
    setUri(null);
    setFailed(false);

    if (!Rive) {
      setFailed(true);
      return;
    }

    // Asset.fromModule(RIV_MODULES[state])
    //   .downloadAsync()
    //   .then((asset) => {
    //     if (mounted) setUri(asset.localUri || asset.uri);
    //   })
    //   .catch(() => {
    //     if (mounted) setFailed(true);
    //   });

    return () => {
      mounted = false;
    };
  }, [state]);

  // Rive 로딩 완료 → Rive 렌더
  if (Rive && uri && !failed) {
    return (
      <View style={[styles.wrapper, { width: size, height: size }]}>
        <Rive
          url={uri}
          style={{ width: size, height: size }}
          fit={Fit.Contain}
          alignment={Alignment.Center}
          autoplay
        />
      </View>
    );
  }

  // Fallback: emoji + reanimated 애니메이션
  return <EmojiFallback state={state} size={size} />;
}

function EmojiFallback({ state, size }: { state: OwlState; size: number }) {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(scale);
    cancelAnimation(rotate);
    cancelAnimation(translateY);

    if (state === "idle") {
      translateY.value = withRepeat(
        withSequence(
          withTiming(-8, { duration: 900 }),
          withTiming(0, { duration: 900 }),
        ),
        -1,
        true,
      );
    }
    if (state === "correct" || state === "complete") {
      scale.value = withSequence(
        withSpring(1.3, { damping: 4, stiffness: 300 }),
        withSpring(0.9, { damping: 5 }),
        withSpring(1.15, { damping: 5 }),
        withSpring(1, { damping: 8 }),
      );
      translateY.value = withSequence(
        withTiming(-20, { duration: 200 }),
        withSpring(0, { damping: 5, stiffness: 200 }),
      );
    }
    if (state === "combo") {
      scale.value = withSequence(
        withSpring(1.4, { damping: 3, stiffness: 400 }),
        withSpring(1, { damping: 6 }),
        withSpring(1.3, { damping: 3, stiffness: 400 }),
        withSpring(1, { damping: 8 }),
      );
    }
    if (state === "wrong") {
      rotate.value = withSequence(
        withTiming(-15, { duration: 80 }),
        withTiming(15, { duration: 80 }),
        withTiming(-12, { duration: 80 }),
        withTiming(12, { duration: 80 }),
        withTiming(-8, { duration: 80 }),
        withTiming(0, { duration: 80 }),
      );
      scale.value = withSequence(
        withTiming(0.85, { duration: 100 }),
        withSpring(1, { damping: 6 }),
      );
    }
    if (state === "angry") {
      rotate.value = withRepeat(
        withSequence(
          withTiming(-8, { duration: 60 }),
          withTiming(8, { duration: 60 }),
        ),
        6,
        true,
      );
    }
    if (state === "hint") {
      rotate.value = withSequence(
        withTiming(15, { duration: 300 }),
        withTiming(15, { duration: 800 }),
        withTiming(0, { duration: 300 }),
      );
    }

    return () => {
      cancelAnimation(scale);
      cancelAnimation(rotate);
      cancelAnimation(translateY);
    };
  }, [state]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View
      style={[styles.wrapper, { width: size, height: size }, animStyle]}
    >
      <Text style={{ fontSize: size * 0.75 }}>{OWL_EMOJI_FALLBACK[state]}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});
