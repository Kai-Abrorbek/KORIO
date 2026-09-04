import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { TRIAL_DAYS } from "@/constants/trial";

/**
 * "무료체험 시작하기" 를 눌러서 로그인 화면에 온 사람에게만 보이는 배너.
 *
 * 이게 없으면 30일 무료체험 버튼을 누른 사람이 아무 설명 없는 로그인 폼을
 * 마주한다. 방금 누른 것과 지금 보이는 것이 이어져 있다는 걸 보여줘야 한다.
 */
export default function TrialBanner() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.bg.toLowerCase() === "#15151d";
  const s = styles(theme, isDark);

  return (
    <View style={s.wrap}>
      <View style={s.icon}>
        <Ionicons name="gift" size={19} color="#fff" />
      </View>
      <View style={s.copy}>
        <Text style={s.title}>
          {t("plan.authBannerTitle", { days: TRIAL_DAYS })}
        </Text>
        <Text style={s.body}>{t("plan.authBannerBody")}</Text>
      </View>
    </View>
  );
}

const styles = (theme: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    wrap: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 13,
      borderRadius: 18,
      marginBottom: 22,
      backgroundColor: isDark ? "#2A2740" : "#F4F1FF",
      borderWidth: 1,
      borderColor: isDark ? "#403C60" : "#E4DEFF",
    },
    icon: {
      width: 38,
      height: 38,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary,
    },
    copy: { flex: 1 },
    title: { color: theme.text, fontSize: 14.5, fontWeight: "900" },
    body: {
      color: theme.textSecondary,
      fontSize: 12,
      lineHeight: 17,
      fontWeight: "600",
      marginTop: 2,
    },
  });
