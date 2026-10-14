import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import type { AvatarConfig } from "@/types/avatar";
import AvatarPreview from "./AvatarPreview";
import AvatarPet from "./AvatarPet";

/** Existing cosmetics combine into a visual discovery; no new purchase or save field. */
export function hasNightGuardianCombo(avatar?: Partial<AvatarConfig> | null) {
  return avatar?.scene === "scene_gyeongbokgung" &&
    avatar?.aura === "aura_hangul" &&
    avatar?.pet === "pet_dokkaebi";
}

export default function AvatarComboStage({
  avatar,
  size,
  streak,
}: {
  avatar?: Partial<AvatarConfig> | null;
  size: number;
  streak?: number | null;
}) {
  const { t } = useTranslation();
  const active = hasNightGuardianCombo(avatar);
  const reducedMotion = useReducedMotion();
  const portal = useSharedValue(0);
  const arrival = useSharedValue(1);
  const caption = useSharedValue(0);

  useEffect(() => {
    portal.value = 0;
    arrival.value = 1;
    caption.value = 0;
    if (!active) return;
    if (reducedMotion) {
      caption.value = 1;
      return;
    }

    portal.value = withTiming(1, { duration: 850, easing: Easing.out(Easing.cubic) });
    arrival.value = 0.78;
    arrival.value = withSequence(
      withTiming(1.06, { duration: 550, easing: Easing.out(Easing.cubic) }),
      withTiming(1, { duration: 300 }),
    );
    caption.value = withSequence(
      withDelay(340, withTiming(1, { duration: 250 })),
      withDelay(1500, withTiming(0, { duration: 380 })),
    );
  }, [active, reducedMotion, portal, arrival, caption]);

  const portalStyle = useAnimatedStyle(() => ({
    opacity: interpolate(portal.value, [0, 0.45, 1], [0, 0.9, 0]),
    transform: [{ scale: interpolate(portal.value, [0, 1], [0.2, 1.35]) }],
  }));
  const arrivalStyle = useAnimatedStyle(() => ({
    transform: [{ scale: arrival.value }],
  }));
  const captionStyle = useAnimatedStyle(() => ({
    opacity: caption.value,
    transform: [{ translateY: interpolate(caption.value, [0, 1], [8, 0]) }],
  }));

  return (
    <View style={{ width: size, height: size }}>
      {active && !reducedMotion ? (
        <Animated.View pointerEvents="none" style={[styles.portal, portalStyle]}>
          <View style={[styles.portalRing, { width: size * 0.86, height: size * 0.86 }]} />
          <Text style={[styles.glyph, { top: size * 0.05, left: size * 0.16 }]}>✦</Text>
          <Text style={[styles.glyph, { top: size * 0.17, right: size * 0.08 }]}>✦</Text>
          <Text style={[styles.glyph, { bottom: size * 0.12, left: size * 0.03 }]}>✦</Text>
        </Animated.View>
      ) : null}
      <Animated.View style={[{ width: size, height: size }, arrivalStyle]}>
        <AvatarPreview avatar={avatar} size={size} showBackground={false} aura />
        <AvatarPet pet={avatar?.pet} streak={streak} avatarSize={size} />
      </Animated.View>
      {active ? (
        <Animated.View
          pointerEvents="none"
          accessibilityElementsHidden
          style={[styles.caption, { bottom: size * 0.02 }, captionStyle]}
        >
          <Text style={styles.captionText}>{t("avatarEditor.secretCombo.nightGuardian")}</Text>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  portal: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  portalRing: {
    borderRadius: 999,
    borderWidth: 5,
    borderColor: "#FFE19C",
    backgroundColor: "rgba(255, 216, 116, 0.14)",
    shadowColor: "#FFD45C",
    shadowOpacity: 0.8,
    shadowRadius: 18,
    elevation: 9,
  },
  glyph: {
    position: "absolute",
    color: "#FFF6C8",
    fontSize: 25,
    textShadowColor: "#F8B83B",
    textShadowRadius: 12,
  },
  caption: {
    position: "absolute",
    alignSelf: "center",
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#FFE8A6",
    backgroundColor: "rgba(29, 22, 62, 0.9)",
  },
  captionText: {
    color: "#FFF5D8",
    fontSize: 12,
    fontWeight: "900",
  },
});
