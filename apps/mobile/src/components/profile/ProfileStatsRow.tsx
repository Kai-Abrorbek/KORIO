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
  userId?: string; // 남 프로필이면 그 유저 id (없으면 내 프로필)
}

export default function ProfileStatsRow({
  primaryFlag,
  extraCount,
  following,
  followers,
  userId,
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
          <Text style={styles.label}>{t("profile.courses")}</Text>
        </View>
      </Pressable>

      <Pressable
        style={styles.cell}
        onPress={() =>
          router.push(
            `/friends?tab=following${userId ? `&userId=${userId}` : ""}`,
          )
        }
      >
        <View style={styles.center}>
          <Text style={styles.value}>{following}</Text>
          <Text style={styles.label}>{t("profile.following")}</Text>
        </View>
      </Pressable>

      <Pressable
        style={styles.cell}
        onPress={() =>
          router.push(
            `/friends?tab=followers${userId ? `&userId=${userId}` : ""}`,
          )
        }
      >
        <View style={styles.center}>
          <Text style={styles.value}>{followers}</Text>
          <Text style={styles.label}>{t("profile.followers")}</Text>
        </View>
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
      gap: 40,
    },
    cell: {
      flex: 1,
      alignItems: "center",
      gap: 6,
    },
    flagRow: {
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      height: 28,
    },
    flag: {
      fontSize: 26,
    },
    center: {
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
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
