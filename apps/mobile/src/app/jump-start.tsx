import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import BoriMascot from "@/components/home/BoriMascot";

export default function JumpStartScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(theme);
  const { section, unit, target } = useLocalSearchParams<{
    section?: string;
    unit?: string;
    target?: string;
  }>();

  const isSectionJump = target === "section";

  const goIntro = () => {
    router.push({
      pathname: "/jump-intro",
      params: {
        section: String(section),
        unit: String(unit),
        target: String(target ?? ""),
      },
    });
  };

  const later = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/roadmap");
  };

  return (
    <View
      style={[
        s.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom + 16 },
      ]}
    >
      <View style={s.center}>
        {/* 국기 + 유닛 번호 */}
        {!isSectionJump && (
          <Animated.View entering={FadeIn.duration(300)} style={s.flagRow}>
            <Text style={s.flag}>🇰🇷</Text>
            <Text style={s.unitNum}>{unit}</Text>
          </Animated.View>
        )}

        {/* 마스코트 */}
        <Animated.View entering={FadeInDown.delay(150)} style={s.mascot}>
          <BoriMascot size={160} />
        </Animated.View>

        {/* 설명 */}
        <Animated.Text entering={FadeInDown.delay(300)} style={s.title}>
          {isSectionJump
            ? t("jump.startTitleSection", { section })
            : t("jump.startTitle", { unit })}
        </Animated.Text>
      </View>

      {/* 버튼 */}
      <Animated.View entering={FadeInDown.delay(420)}>
        <TouchableOpacity
          style={s.startBtn}
          onPress={goIntro}
          activeOpacity={0.9}
        >
          <Text style={s.startText}>{t("jump.startBtn")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={s.laterBtn}
          onPress={later}
          activeOpacity={0.8}
        >
          <Text style={s.laterText}>{t("jump.later")}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 20 },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    flagRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      marginBottom: 30,
    },
    flag: { fontSize: 52 },
    unitNum: { fontSize: 60, fontWeight: "900", color: theme.text },
    mascot: { marginBottom: 30 },
    title: {
      fontSize: 24,
      fontWeight: "900",
      color: theme.text,
      textAlign: "center",
      lineHeight: 34,
      paddingHorizontal: 10,
    },
    startBtn: {
      backgroundColor: "#1CB0F6",
      borderRadius: 16,
      paddingVertical: 17,
      alignItems: "center",
      borderBottomWidth: 4,
      borderColor: "#1899D6",
      marginBottom: 10,
    },
    startText: { color: "#fff", fontSize: 17, fontWeight: "900" },
    laterBtn: { paddingVertical: 14, alignItems: "center" },
    laterText: { color: "#1CB0F6", fontSize: 16, fontWeight: "900" },
  });
