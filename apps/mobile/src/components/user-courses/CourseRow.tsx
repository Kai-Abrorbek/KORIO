import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { EnrolledCourse } from "@/types/user-courses";

interface Props {
  course: EnrolledCourse;
  isLast?: boolean;
}

export default function CourseRow({ course, isLast }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[styles.row, !isLast && styles.divider]}>
      <View style={styles.left}>
        {course.flag ? (
          <View style={styles.flagBox}>
            <Text style={styles.flag}>{course.flag}</Text>
          </View>
        ) : (
          <View
            style={[
              styles.iconBox,
              { backgroundColor: course.iconBgColor ?? theme.primary },
            ]}
          >
            <MaterialCommunityIcons
              name={course.iconName ?? "school"}
              size={28}
              color="#fff"
            />
          </View>
        )}

        <Text style={styles.name}>{t(course.nameKey)}</Text>
      </View>

      <Text style={styles.xp}>{course.xp.toLocaleString()} XP</Text>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    left: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      flex: 1,
    },
    flagBox: {
      width: 50,
      height: 50,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    flag: {
      fontSize: 40,
      lineHeight: 50,
    },
    iconBox: {
      width: 50,
      height: 50,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    name: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
    },
    xp: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.textSecondary,
    },
  });
