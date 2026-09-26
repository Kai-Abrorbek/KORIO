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
import * as Haptics from "@/utils/haptics";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useState } from "react";
import { useSettingsStore, useContentLang } from "@/store/settings.store";
import {
  detectDeviceContentLanguage,
  type AppLanguage,
  type ContentLanguage,
} from "@/locales/i18n";
import ContentLanguageSheet from "@/components/settings/ContentLanguageSheet";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// 언어 이름·인사말은 항상 원어로 (번역 대상 아님)
const LANGUAGES = [
  { code: "uz", name: "O'zbek", greeting: "Salom", flag: "🇺🇿" },
  { code: "ko", name: "한국어", greeting: "안녕하세요", flag: "🇰🇷" },
  { code: "en", name: "English", greeting: "Hello", flag: "🇬🇧" },
  { code: "ru", name: "Русский", greeting: "Привет", flag: "🇷🇺" },
] as const;

type Lang = (typeof LANGUAGES)[number];

/** 설명 언어 이름도 원어로 */
const CONTENT_NAMES: Record<ContentLanguage, string> = {
  uz: "O'zbek",
  ru: "Русский",
  en: "English",
};

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
  const { language, setLanguage, contentLanguage, setContentLanguage } =
    useSettingsStore();
  const contentLang = useContentLang();
  const [sheetOpen, setSheetOpen] = useState(false);

  const pick = (code: AppLanguage) => {
    setLanguage(code);
    // 한국어 UI 는 뜻·설명을 한국어로 줄 수 없다 → 처음 고를 때 한 번 묻는다.
    // 기본값을 **먼저** 저장한다: 비어 있으면 메인 탭의 ContentLanguagePrompt 도
    // 같이 떠서 시트가 두 장 겹친다. 닫기만 해도 이 기본값이 남는다
    if (code === "ko" && !contentLanguage) {
      setContentLanguage(detectDeviceContentLanguage());
      setSheetOpen(true);
    }
  };

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
              onPress={() => pick(item.code)}
            />
          ))}
        </View>

        {/* 한국어 UI 일 때만 — 뜻·설명은 어느 말로 볼지 */}
        {language === "ko" && (
          <Animated.View entering={FadeInDown.duration(320)}>
            <Pressable
              style={({ pressed }) => [
                s.contentRow,
                pressed && { transform: [{ translateY: 2 }] },
              ]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setSheetOpen(true);
              }}
              accessibilityRole="button"
            >
              <View style={s.contentIcon}>
                <Ionicons name="book" size={18} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.contentLabel}>
                  {t("settings.contentLanguage.rowLabel")}
                </Text>
                <Text style={s.contentHint} numberOfLines={1}>
                  {t("settings.contentLanguage.rowHint")}
                </Text>
              </View>
              <Text style={s.contentValue}>{CONTENT_NAMES[contentLang]}</Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={theme.textSecondary}
              />
            </Pressable>
          </Animated.View>
        )}
      </View>

      <ContentLanguageSheet
        visible={sheetOpen}
        value={contentLang}
        onConfirm={(lang) => {
          setContentLanguage(lang);
          setSheetOpen(false);
        }}
        onClose={() => setSheetOpen(false)}
      />
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
    contentRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginTop: 22,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 18,
      paddingVertical: 13,
      paddingHorizontal: 14,
    },
    contentIcon: {
      width: 34,
      height: 34,
      borderRadius: 11,
      backgroundColor: theme.primary,
      borderBottomWidth: 3,
      borderBottomColor: "#5b52c4",
      alignItems: "center",
      justifyContent: "center",
    },
    contentLabel: { fontSize: 15, fontWeight: "800", color: theme.text },
    contentHint: {
      fontSize: 12.5,
      color: theme.textSecondary,
      marginTop: 1,
      fontWeight: "500",
    },
    contentValue: { fontSize: 14, fontWeight: "800", color: theme.primary },
    checkOff: {
      width: 26,
      height: 26,
      borderRadius: 13,
      borderWidth: 2,
      borderColor: "#D4D3DD",
    },
  });
