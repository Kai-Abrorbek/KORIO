import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  username: string;
  joinedYear: number;
}

export default function ProfileMeta({ username, joinedYear }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Text style={styles.text}>
      @{username} · {t("profile.joinedYear", { year: joinedYear })}
    </Text>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    text: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.textSecondary,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
    },
  });
