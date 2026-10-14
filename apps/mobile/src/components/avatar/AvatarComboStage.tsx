import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
import { useAuthStore } from "@/store/auth.store";
import { useContentLang } from "@/store/settings.store";
import { todaysAvatarWord, useAvatarStudyStore } from "@/store/avatar-study.store";
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
  onWordPress,
}: {
  avatar?: Partial<AvatarConfig> | null;
  size: number;
  streak?: number | null;
  onWordPress?: (word: string) => void;
}) {
  const { t } = useTranslation();
  const userId = useAuthStore((state) => state.user?.id);
  const language = useContentLang();
  const recentWord = useAvatarStudyStore((state) => state.recentWord);
  const learned = avatar?.aura === "aura_hangul"
    ? todaysAvatarWord(recentWord, userId, language)
    : null;
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
        <AvatarPreview avatar={avatar} size={size} showBackground={false} aura hangulWord={learned?.word} />
        <AvatarPet pet={avatar?.pet} streak={streak} avatarSize={size} />
      </Animated.View>
      {learned ? (
        <Pressable
          accessibilityRole={onWordPress ? "button" : undefined}
          accessibilityLabel={`${learned.word}, ${learned.meaning}`}
          disabled={!onWordPress}
          onPress={(event) => {
            event.stopPropagation();
            onWordPress?.(learned.word);
          }}
          style={[styles.wordBadge, { maxWidth: size * 0.82 }]}
        >
          <Text style={styles.wordText} numberOfLines={1}>{learned.word}</Text>
          <Text style={styles.wordMeaning} numberOfLines={1}>{learned.meaning}</Text>
          {onWordPress ? <Ionicons name="volume-medium" size={14} color="#FFF5D8" /> : null}
        </Pressable>
      ) : null}
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
  wordBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255, 232, 166, 0.82)",
    backgroundColor: "rgba(31, 25, 72, 0.82)",
  },
  wordText: { color: "#FFF5D8", fontSize: 12, fontWeight: "900" },
  wordMeaning: { color: "#E3DCF9", fontSize: 10, fontWeight: "600", flexShrink: 1 },
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
