import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useRouter } from "expo-router";

interface Props {
  primaryFlag: string;
  extraCount: number;
  following: number;
  followers: number;
}

export default function ProfileStatsRow({
  primaryFlag,
  extraCount,
  following,
  followers,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();

  return (
    <View style={styles.row}>
      <Pressable
        style={styles.cell}
        onPress={() => router.push("/user-courses")}
      >
        <View style={styles.flagRow}>
          <Text style={styles.flag}>{primaryFlag}</Text>
          {extraCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>+{extraCount}</Text>
            </View>
          )}
        </View>
        <Text style={styles.label}>{t("profile.courses")}</Text>
      </Pressable>

      <Pressable style={styles.cell} onPress={() => router.push("/friends")}>
        <Text style={styles.value}>{following}</Text>
        <Text style={styles.label}>{t("profile.following")}</Text>
      </Pressable>

      <Pressable style={styles.cell} onPress={() => router.push("/friends")}>
        <Text style={styles.value}>{followers}</Text>
        <Text style={styles.label}>{t("profile.followers")}</Text>
      </Pressable>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      paddingHorizontal: 20,
      marginBottom: 18,
    },
    cell: {
      flex: 1,
      alignItems: "flex-start",
      gap: 6,
    },
    flagRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      height: 28,
    },
    flag: {
      fontSize: 26,
    },
    badge: {
      borderWidth: 1.5,
      borderColor: theme.border,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    badgeText: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    value: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      height: 28,
    },
    label: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
    },
  });
