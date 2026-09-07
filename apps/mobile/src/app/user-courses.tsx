import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useAuthStore } from "@/store/auth.store";
import { UserService } from "@/services/user.service";
import { EnrolledCourse } from "@/types/user-courses";
import CourseRow from "@/components/user-courses/CourseRow";

/**
 * 지금 KORIO 가 가르치는 건 한국어 하나다. 코스가 여러 개 생기면 서버가
 * 목록을 내려주고 여기서 map 만 하면 된다 (courseExtraCount 자리가 그것).
 */
function coursesOf(person: {
  coursePrimaryFlag?: string;
  totalXP?: number;
}): EnrolledCourse[] {
  return [
    {
      id: "korean",
      nameKey: "userCourses.list.korean",
      flag: person.coursePrimaryFlag || "🇰🇷",
      xp: person.totalXP ?? 0,
    },
  ];
}

export default function UserCoursesScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(theme);

  // userId 가 있으면 남의 프로필에서 온 것
  const { userId } = useLocalSearchParams<{ userId?: string }>();
  const me = useAuthStore((st) => st.user);

  const [other, setOther] = useState<any>(null);
  const [loading, setLoading] = useState(!!userId);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!userId) return;
    let alive = true;
    UserService.getUserById(userId)
      .then((u) => alive && setOther(u))
      .catch(() => alive && setFailed(true))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [userId]);

  const person = userId ? other : me;
  const courses = person ? coursesOf(person) : [];

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) router.back();
            else router.replace("/profile");
          }}
          hitSlop={10}
          activeOpacity={0.7}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          {t("userCourses.title", { name: person?.nickname ?? "" })}
        </Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator
            color={theme.primary}
            style={styles.center}
            size="large"
          />
        ) : failed || !person ? (
          <Text style={styles.empty}>{t("userCourses.loadFailed")}</Text>
        ) : (
          <View style={styles.card}>
            {courses.map((course, i) => (
              <CourseRow
                key={course.id}
                course={course}
                isLast={i === courses.length - 1}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    backBtn: {
      width: 32,
      height: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
      flex: 1,
      textAlign: "center",
      marginHorizontal: 8,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingTop: 20,
      paddingHorizontal: 16,
    },
    center: {
      marginTop: 48,
    },
    empty: {
      marginTop: 48,
      textAlign: "center",
      fontSize: 14,
      fontWeight: "600",
      color: theme.textSecondary,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.border,
      overflow: "hidden",
    },
  });
