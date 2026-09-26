import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import * as Haptics from "@/utils/haptics";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import PrimaryButton from "@/components/ui/PrimaryButton";
import type { ContentLanguage } from "@/locales/i18n";

/**
 * 뜻·설명 언어 고르기 (한국어 UI 전용).
 *
 * 언어 이름과 예시 뜻은 번역하지 않는다 — 언어 목록은 항상 원어로 적는다
 * (language.tsx 의 LANGUAGES 와 같은 규칙). "사과 → olma" 는 UI 문구가 아니라
 * 고르면 이렇게 보인다는 **견본 데이터**다.
 *
 * 껍데기는 CharacterDetailSheet 와 같다. Modal 안에서 entering/exiting 을 쓰면
 * 보이는데 안 눌리는 시트가 되니 translateY 를 직접 움직인다.
 */
const OPTIONS: {
  code: ContentLanguage;
  name: string;
  flag: string;
  sample: string;
}[] = [
  { code: "uz", name: "O'zbek", flag: "🇺🇿", sample: "olma" },
  { code: "ru", name: "Русский", flag: "🇷🇺", sample: "яблоко" },
  { code: "en", name: "English", flag: "🇬🇧", sample: "apple" },
];

interface Props {
  visible: boolean;
  /** 처음 선택돼 있을 값 */
  value: ContentLanguage;
  onConfirm: (lang: ContentLanguage) => void;
  /** 확인 없이 닫음 (배경 탭·아래로 끌기·뒤로가기) */
  onClose: () => void;
}

const CLOSED = 700;
const DURATION = 250;

export default function ContentLanguageSheet({
  visible,
  value,
  onConfirm,
  onClose,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const insets = useSafeAreaInsets();
  const [picked, setPicked] = useState<ContentLanguage>(value);

  const backdrop = useSharedValue(0);
  const sheetY = useSharedValue(CLOSED);
  const badge = useSharedValue(0);

  // 열 때마다 저장된 값으로 되돌린다 — 지난번에 고르다 만 게 남지 않게
  useEffect(() => {
    if (visible) setPicked(value);
  }, [visible, value]);

  useEffect(() => {
    if (visible) {
      backdrop.value = withTiming(1, { duration: DURATION });
      sheetY.value = withTiming(0, {
        duration: DURATION,
        easing: Easing.out(Easing.cubic),
      });
      badge.value = withDelay(
        120,
        withSpring(1, { damping: 11, stiffness: 170 }),
      );
    } else {
      backdrop.value = withTiming(0, { duration: DURATION });
      sheetY.value = withTiming(CLOSED, {
        duration: DURATION,
        easing: Easing.in(Easing.cubic),
      });
      badge.value = 0;
    }
  }, [visible]);

  const dragClose = Gesture.Pan()
    .onUpdate((e) => {
      sheetY.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      if (e.translationY > 90 || e.velocityY > 800) {
        sheetY.value = withTiming(CLOSED, { duration: DURATION });
        backdrop.value = withTiming(0, { duration: DURATION });
        runOnJS(onClose)();
      } else {
        sheetY.value = withTiming(0, { duration: 160 });
      }
    });

  const backdropStyle = useAnimatedStyle(() => ({ opacity: backdrop.value }));
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetY.value }],
  }));
  const badgeStyle = useAnimatedStyle(() => ({
    opacity: badge.value,
    transform: [
      { scale: 0.6 + badge.value * 0.4 },
      { rotate: `${(1 - badge.value) * -12}deg` },
    ],
  }));

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={s.root}>
        <Animated.View style={[s.backdrop, backdropStyle]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[s.sheet, sheetStyle, { paddingBottom: insets.bottom + 16 }]}
        >
          <GestureDetector gesture={dragClose}>
            <View style={s.handleZone}>
              <View style={s.handle} />
            </View>
          </GestureDetector>

          <Animated.View style={[s.badge, badgeStyle]}>
            <Ionicons name="book" size={26} color="#fff" />
          </Animated.View>

          <Text style={s.title}>{t("settings.contentLanguage.title")}</Text>
          <Text style={s.desc}>{t("settings.contentLanguage.desc")}</Text>

          <View style={s.options}>
            {OPTIONS.map((o) => (
              <Option
                key={o.code}
                item={o}
                selected={picked === o.code}
                onPress={() => setPicked(o.code)}
                s={s}
                theme={theme}
              />
            ))}
          </View>

          {/* 시트 맨 아래 고정. 목록이 짧아 스크롤이 없다 */}
          <PrimaryButton
            label={t("common.confirm")}
            color={theme.primary}
            darkColor="#5b52c4"
            onPress={() => onConfirm(picked)}
            style={s.confirm}
          />
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

function Option({
  item,
  selected,
  onPress,
  s,
  theme,
}: {
  item: (typeof OPTIONS)[number];
  selected: boolean;
  onPress: () => void;
  s: ReturnType<typeof getStyles>;
  theme: ThemeColors;
}) {
  const pressed = useSharedValue(0);
  const on = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    on.value = withSpring(selected ? 1 : 0, { damping: 14, stiffness: 220 });
  }, [selected]);

  // 눌리면 살짝 내려앉는다 (입체 버튼). 보더 두께를 움직이면 아래 카드들이
  // 같이 들썩이니 translateY 만 쓴다
  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pressed.value * 2 }],
  }));
  const checkStyle = useAnimatedStyle(() => ({
    opacity: on.value,
    transform: [{ scale: 0.4 + on.value * 0.6 }],
  }));

  return (
    <Pressable
      onPressIn={() => (pressed.value = withTiming(1, { duration: 70 }))}
      onPressOut={() => (pressed.value = withTiming(0, { duration: 110 }))}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <Animated.View style={[s.card, selected && s.cardOn, cardStyle]}>
        <View style={s.flagWrap}>
          <Text style={s.flag}>{item.flag}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[s.name, selected && { color: theme.primary }]}>
            {item.name}
          </Text>
          <Text style={s.sample}>
            사과 <Text style={s.arrow}>→</Text> {item.sample}
          </Text>
        </View>
        <View style={[s.checkOff, selected && { borderColor: theme.primary }]}>
          <Animated.View style={[s.checkOn, checkStyle]}>
            <Ionicons name="checkmark" size={15} color="#fff" />
          </Animated.View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    root: { flex: 1, justifyContent: "flex-end" },
    backdrop: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    sheet: {
      backgroundColor: theme.bg,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingHorizontal: 20,
      paddingTop: 6,
    },
    handleZone: {
      alignSelf: "stretch",
      alignItems: "center",
      paddingTop: 6,
      paddingBottom: 14,
    },
    handle: {
      width: 44,
      height: 5,
      borderRadius: 3,
      backgroundColor: theme.border,
    },
    badge: {
      alignSelf: "center",
      width: 56,
      height: 56,
      borderRadius: 18,
      backgroundColor: theme.primary,
      borderBottomWidth: 4,
      borderBottomColor: "#5b52c4",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
    },
    title: {
      fontSize: 21,
      fontWeight: "800",
      color: theme.text,
      textAlign: "center",
      letterSpacing: -0.3,
    },
    desc: {
      fontSize: 14,
      lineHeight: 20,
      color: theme.textSecondary,
      textAlign: "center",
      marginTop: 8,
      marginBottom: 20,
      paddingHorizontal: 8,
      fontWeight: "500",
    },
    options: { gap: 10 },
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 18,
      paddingVertical: 12,
      paddingHorizontal: 14,
    },
    cardOn: {
      borderColor: theme.primary,
      backgroundColor: theme.primary + "1A",
    },
    flagWrap: {
      width: 42,
      height: 42,
      borderRadius: 12,
      backgroundColor: theme.bg === "#ffffff" ? "#F4F3FA" : theme.bg,
      alignItems: "center",
      justifyContent: "center",
    },
    flag: { fontSize: 24 },
    name: { fontSize: 17, fontWeight: "800", color: theme.text },
    sample: {
      fontSize: 13,
      color: theme.textSecondary,
      marginTop: 2,
      fontWeight: "600",
    },
    arrow: { color: theme.primary },
    checkOff: {
      width: 26,
      height: 26,
      borderRadius: 13,
      borderWidth: 2,
      borderColor: "#D4D3DD",
      alignItems: "center",
      justifyContent: "center",
    },
    checkOn: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    confirm: { marginTop: 20 },
  });
