import { useEffect, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import { useTheme } from "@/hooks/useTheme";
import { themes, type ThemeColors } from "@/constants/theme";
import type { AvatarConfig } from "@/types/avatar";
import * as Haptics from "@/utils/haptics";

/**
 * "내 캐릭터 텔레그램 스티커" 들어가는 카드 — 프로필·상점. 텔레그램 sticker-promo 와 같다.
 * 미리보기를 서버에 묻지 않고(무겁다) 내 캐릭터 얼굴 + 말풍선 "ㅋㅋㅋ" 로 그린다.
 */
export default function StickerPromoCard({
  avatar,
  onPress,
  style,
}: {
  avatar?: Partial<AvatarConfig> | null;
  onPress: () => void;
  style?: object;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = useMemo(() => getStyles(theme), [theme]);
  const reduce = useReducedMotion();
  const wobble = useSharedValue(0);
  const sweep = useSharedValue(0);

  useEffect(() => {
    if (reduce) return;
    wobble.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1300, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 1300, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
    );
    sweep.value = withRepeat(
      withSequence(withTiming(1, { duration: 1900, easing: Easing.inOut(Easing.quad) }), withTiming(1, { duration: 1500 })),
      -1,
    );
  }, [reduce, sweep, wobble]);

  const faceStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${-4 + 8 * wobble.value}deg` }, { translateY: -2 * wobble.value }],
  }));
  const bubbleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${-12 + 6 * wobble.value}deg` }, { scale: 1 + 0.12 * wobble.value }],
  }));
  const shineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -80 + 480 * sweep.value }, { skewX: "-20deg" }],
  }));

  return (
    <Pressable
      onPress={() => {
        void Haptics.selectionAsync();
        onPress();
      }}
      style={({ pressed }) => [s.wrap, pressed ? s.pressed : null, style]}
    >
      <LinearGradient
        colors={theme === themes.dark ? ["#2E2A4D", "#3E2A43"] : ["#EEEBFF", "#FDE7F1"]}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
        style={s.card}
      >
        <Animated.View pointerEvents="none" style={[s.shine, shineStyle]} />
        <View style={s.face}>
          <Animated.View style={[s.sticker, faceStyle]}>
            <AvatarPreview avatar={avatar} showBackground={false} size={52} variant="head" />
          </Animated.View>
          <Animated.Text style={[s.bubble, bubbleStyle]}>ㅋㅋㅋ</Animated.Text>
          <View style={s.tg}>
            <Ionicons name="paper-plane" size={11} color="#FFFFFF" />
          </View>
        </View>
        <View style={s.text}>
          <View style={s.titleRow}>
            <Text style={s.title}>{t("stickers.promo.title")}</Text>
            <View style={s.newBadge}>
              <Text style={s.newText}>{t("stickers.promo.new")}</Text>
            </View>
          </View>
          <Text style={s.body}>{t("stickers.promo.body")}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
      </LinearGradient>
    </Pressable>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      borderRadius: 20,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderColor: "#776EE244",
      overflow: "hidden",
    },
    pressed: { borderBottomWidth: 2, transform: [{ translateY: 2 }] },
    card: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, paddingLeft: 12, paddingRight: 10 },
    shine: { position: "absolute", top: 0, bottom: 0, left: 0, width: 60, backgroundColor: "rgba(255,255,255,0.35)" },
    face: { width: 58, height: 58 },
    sticker: {
      width: 58,
      height: 58,
      borderRadius: 29,
      backgroundColor: "#FFFFFF",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      shadowColor: "#3C28A0",
      shadowOpacity: 0.18,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },
    bubble: {
      position: "absolute",
      left: -6,
      top: -9,
      color: "#FFD43B",
      fontSize: 14,
      fontWeight: "900",
      textShadowColor: "#5B3600",
      textShadowRadius: 2,
      textShadowOffset: { width: 0, height: 0 },
    },
    tg: {
      position: "absolute",
      right: -4,
      bottom: -2,
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: "#FFFFFF",
      backgroundColor: "#2AABEE",
      alignItems: "center",
      justifyContent: "center",
    },
    text: { flex: 1, minWidth: 0, gap: 3 },
    titleRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 6 },
    title: { color: theme.text, fontSize: 15.5, fontWeight: "900" },
    newBadge: { backgroundColor: "#FF4B4B", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
    newText: { color: "#FFFFFF", fontSize: 10, fontWeight: "900", letterSpacing: 0.4 },
    body: { color: theme.textSecondary, fontSize: 12.5, fontWeight: "700", lineHeight: 17 },
  });
