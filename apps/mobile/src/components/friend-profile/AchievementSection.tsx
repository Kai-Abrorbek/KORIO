import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { Achievement } from "@/types/friend-profile";
import AchievementBadge from "./AchievementBadge";

interface Props {
  achievements: Achievement[];
  onSeeAll?: () => void;
}

export default function AchievementSection({ achievements, onSeeAll }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.wrap}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          {t("friendProfile.achievements.title")}
        </Text>
        <TouchableOpacity onPress={onSeeAll} hitSlop={10} activeOpacity={0.6}>
          <Ionicons
            name="chevron-forward"
            size={22}
            color={theme.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {achievements.map((a) => (
          <AchievementBadge key={a.id} achievement={a} />
        ))}
      </ScrollView>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      marginBottom: 32,
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    scrollContent: {
      paddingHorizontal: 20,
      gap: 16,
    },
  });
