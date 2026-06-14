import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { MOCK_COURSES } from "@/mocks/courses.mock";
import CourseHeader from "@/components/courses/CourseHeader";
import CourseListItem from "@/components/courses/CourseListItem";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function CoursesScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme);

  const [selectedId, setSelectedId] = useState<string>(MOCK_COURSES[0].id);

  const handleContinue = () => {
    // TODO: 선택한 과정 저장 / 적용
    console.log("selected course:", selectedId);
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* 닫기 X */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/");
          }
        }}
        hitSlop={12}
        activeOpacity={0.7}
      >
        <Ionicons name="close" size={28} color={theme.text} />
      </TouchableOpacity>

      {/* 마스코트 + 말풍선 */}
      <CourseHeader message={t("courses.askQuestion")} />

      {/* 과정 리스트 */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{t("courses.title")}</Text>
        {MOCK_COURSES.map((course, i) => (
          <CourseListItem
            key={course.id}
            course={course}
            index={i}
            selected={selectedId === course.id}
            onPress={() => setSelectedId(course.id)}
          />
        ))}
      </ScrollView>

      {/* 하단 계속 버튼 */}
      <View style={styles.footer}>
        <PrimaryButton
          label={t("courses.continue")}
          onPress={handleContinue}
          disabled={!selectedId}
        />
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingTop: 54,
    },
    closeBtn: {
      position: "absolute",
      top: 44,
      left: 16,
      zIndex: 10,
      padding: 6,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 120,
    },
    title: {
      fontSize: 20,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 16,
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 28,
      backgroundColor: theme.bg,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
  });
