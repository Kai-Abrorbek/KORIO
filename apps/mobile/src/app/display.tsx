import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  useColorScheme,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useSettingsStore } from "@/store/settings.store";

// 프리뷰 카드용 고정 색 (현재 테마와 무관하게 항상 라이트/다크로 보여야 함)
const PREVIEW = {
  light: { card: "#ECEAF6", screen: "#FFFFFF", bar: "#D9D6EA" },
  dark: { card: "#3A3942", screen: "#2B2A33", bar: "#4C4B56" },
};

export default function DisplaySettings() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const systemScheme = useColorScheme();
  const { theme: themePref, setTheme, learningTheme } = useSettingsStore();

  const isDark =
    themePref === "dark" || (themePref === "system" && systemScheme === "dark");

  const renderModeCard = (
    variant: "light" | "dark",
    selected: boolean,
    label: string,
  ) => {
    const c = PREVIEW[variant];
    return (
      <Pressable
        style={s.modeCol}
        onPress={() => setTheme(variant)}
        hitSlop={4}
      >
        <View style={[s.preview, { backgroundColor: c.card }]}>
          <View style={[s.previewScreen, { backgroundColor: c.screen }]}>
            {[0, 1].map((i) => (
              <View key={i} style={s.previewRow}>
                <View style={s.previewDot} />
                <View style={[s.previewBar, { backgroundColor: c.bar }]} />
              </View>
            ))}
          </View>
        </View>
        <Text style={s.modeLabel}>{label}</Text>
        <View style={[s.radio, selected && s.radioOn]} />
      </Pressable>
    );
  };

  return (
    <View style={[s.container, { paddingTop: insets.top + 4 }]}>
      {/* 헤더 */}
      <View style={s.header}>
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{t("settings.items.display.title")}</Text>
      </View>

      {/* 다크 모드 설정 */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>
          {t("settings.display.darkModeSection")}
        </Text>
        <View style={s.cardRow}>
          {renderModeCard("light", !isDark, t("settings.display.lightMode"))}
          {renderModeCard("dark", isDark, t("settings.display.darkMode"))}
        </View>
      </View>

      {/* 구분 밴드 */}
      <View style={s.dividerBand} />

      {/* 학습 화면 설정 */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>
          {t("settings.display.learningSection")}
        </Text>
        <TouchableOpacity
          style={s.row}
          activeOpacity={0.6}
          onPress={() => {
            // TODO: 학습 테마 피커 화면 (다음 작업)
          }}
        >
          <Text style={s.rowLabel}>{t("settings.display.learningTheme")}</Text>
          <View style={s.rowRight}>
            <Text style={s.rowValue}>
              {t(`settings.display.themes.${learningTheme}`)}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.textSecondary}
            />
          </View>
        </TouchableOpacity>
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
      paddingBottom: 16,
    },
    headerTitle: { fontSize: 22, fontWeight: "700", color: theme.text },
    section: { paddingHorizontal: 24, paddingTop: 20 },
    sectionTitle: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 24,
    },
    cardRow: { flexDirection: "row", gap: 20 },
    modeCol: { flex: 1, alignItems: "center", gap: 16 },
    preview: {
      width: "100%",
      aspectRatio: 1.02,
      borderRadius: 26,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingTop: 24,
    },
    previewScreen: {
      width: "72%",
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingTop: 18,
      paddingBottom: 22,
      paddingHorizontal: 14,
      gap: 11,
    },
    previewRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    previewDot: {
      width: 9,
      height: 9,
      borderRadius: 5,
      backgroundColor: "#776ee2",
    },
    previewBar: { flex: 1, height: 7, borderRadius: 4 },
    modeLabel: { fontSize: 18, fontWeight: "700", color: theme.text },
    radio: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: "#D4D3DD",
    },
    radioOn: { borderColor: theme.primary, backgroundColor: theme.primary },
    dividerBand: {
      height: 8,
      backgroundColor: theme.bg === "#ffffff" ? "#F3F2F7" : "#1E1E26",
      marginTop: 28,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 8,
    },
    rowLabel: { fontSize: 17, fontWeight: "600", color: theme.text },
    rowRight: { flexDirection: "row", alignItems: "center", gap: 6 },
    rowValue: { fontSize: 16, color: theme.textSecondary },
  });
