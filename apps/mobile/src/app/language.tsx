import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Animated, {
  FadeInDown,
  ZoomIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useSettingsStore } from "@/store/settings.store";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// 언어 이름·인사말은 항상 원어로 (번역 대상 아님)
const LANGUAGES = [
  { code: "uz", name: "O'zbek", greeting: "Salom", flag: "🇺🇿" },
  { code: "ko", name: "한국어", greeting: "안녕하세요", flag: "🇰🇷" },
  { code: "en", name: "English", greeting: "Hello", flag: "🇬🇧" },
  { code: "ru", name: "Русский", greeting: "Привет", flag: "🇷🇺" },
] as const;

type Lang = (typeof LANGUAGES)[number];

function LangCard({
  item,
  selected,
  onPress,
  index,
  theme,
  s,
}: {
  item: Lang;
  selected: boolean;
  onPress: () => void;
  index: number;
  theme: ThemeColors;
  s: ReturnType<typeof getStyles>;
}) {
  const pressed = useSharedValue(0);
  const aStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: pressed.value * 2 },
      { scale: 1 - pressed.value * 0.01 },
    ],
  }));
  return (
    <Animated.View entering={FadeInDown.delay(index * 60).duration(400)}>
      <AnimatedPressable
        onPressIn={() => (pressed.value = withTiming(1, { duration: 80 }))}
        onPressOut={() => (pressed.value = withTiming(0, { duration: 120 }))}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress();
        }}
        style={[s.card, selected && s.cardOn, aStyle]}
      >
        <View style={s.flagWrap}>
          <Text style={s.flag}>{item.flag}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[s.name, selected && { color: theme.primary }]}>
            {item.name}
          </Text>
          <Text style={s.greeting}>{item.greeting}</Text>
        </View>
        {selected ? (
          <Animated.View
            entering={ZoomIn.springify().damping(0)}
            style={s.checkOn}
          >
            <Ionicons name="checkmark" size={16} color="#fff" />
          </Animated.View>
        ) : (
          <View style={s.checkOff} />
        )}
      </AnimatedPressable>
    </Animated.View>
  );
}

export default function LanguageSettings() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const { language, setLanguage } = useSettingsStore();

  return (
    <View style={[s.container, { paddingTop: insets.top + 4 }]}>
      <View style={s.header}>
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{t("settings.items.language.title")}</Text>
      </View>

      <View style={s.body}>
        <Text style={s.subtitle}>{t("settings.language.subtitle")}</Text>
        <View style={{ gap: 14 }}>
          {LANGUAGES.map((item, i) => (
            <LangCard
              key={item.code}
              item={item}
              index={i}
              theme={theme}
              s={s}
              selected={language === item.code}
              onPress={() => setLanguage(item.code)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    headerTitle: { fontSize: 22, fontWeight: "700", color: theme.text },
    body: { paddingHorizontal: 24, paddingTop: 12 },
    subtitle: {
      fontSize: 15,
      color: theme.textSecondary,
      marginBottom: 24,
      fontWeight: "500",
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 20,
      paddingVertical: 16,
      paddingHorizontal: 18,
    },
    cardOn: {
      borderColor: theme.primary,
      backgroundColor: theme.primary + "1A",
    },
    flagWrap: {
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor: theme.bg === "#ffffff" ? "#F4F3FA" : theme.bg,
      alignItems: "center",
      justifyContent: "center",
    },
    flag: { fontSize: 28 },
    name: { fontSize: 19, fontWeight: "800", color: theme.text },
    greeting: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 2,
      fontWeight: "500",
    },
    checkOn: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    checkOff: {
      width: 26,
      height: 26,
      borderRadius: 13,
      borderWidth: 2,
      borderColor: "#D4D3DD",
    },
  });
