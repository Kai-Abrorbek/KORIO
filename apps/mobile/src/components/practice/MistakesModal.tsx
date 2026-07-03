import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Modal } from "react-native";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { ThemeColors } from "@/constants/theme";
import { LessonService } from "@/services/lesson.service";

const MIN_MISTAKES = 10; // 복습 시작 최소 오답 수
const ORANGE = "#FF9600";

interface Props {
  visible: boolean;
  onClose: () => void;
  theme: ThemeColors;
}

export default function MistakesModal({ visible, onClose, theme }: Props) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const s = styles(theme);
  const [data, setData] = useState<{ count: number; questions: any[] }>({
    count: 0,
    questions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    setLoading(true);
    LessonService.getMistakes()
      .then(setData)
      .catch((e) => console.error("틀린문제 로드 실패:", e))
      .finally(() => setLoading(false));
  }, [visible]);

  const lang = i18n.language as "ko" | "uz" | "en" | "ru";
  const canStart = data.count >= MIN_MISTAKES;
  const xp = Math.min(40, data.count * 2);

  const startReview = () => {
    onClose();
    router.push("/lesson?mode=review"); // 복습 모드 (틀린문제로 레슨)
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={false}
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <Animated.View
        entering={SlideInRight.duration(280)}
        exiting={SlideOutRight.duration(220)}
        style={s.container}
      >
        {/* 헤더 */}
        <View style={s.topBar}>
          <TouchableOpacity onPress={onClose} hitSlop={10}>
            <Ionicons name="arrow-back" size={28} color={theme.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={s.content}
          showsVerticalScrollIndicator={false}
        >
          {/* 타이틀 + 아이콘 */}
          <View style={s.titleRow}>
            <Text style={s.title}>
              {canStart
                ? t("practice.mistakesReady")
                : t("practice.mistakesNeed", { n: MIN_MISTAKES })}
            </Text>
            <View style={s.iconCircle}>
              <Ionicons name="refresh" size={32} color="#fff" />
            </View>
          </View>

          {/* 시작 버튼 */}
          <TouchableOpacity
            style={[s.startBtn, !canStart && s.startBtnDisabled]}
            onPress={startReview}
            disabled={!canStart}
            activeOpacity={0.9}
          >
            <Text style={[s.startText, !canStart && s.startTextDisabled]}>
              {t("practice.startXp", { xp })}
            </Text>
          </TouchableOpacity>

          <View style={s.divider} />

          {/* 틀린 문제 리스트 */}
          <Text style={s.sectionTitle}>
            {t("practice.mistakesCount", { n: data.count })}
          </Text>

          {loading ? (
            <ActivityIndicator
              color={theme.primary}
              style={{ marginTop: 30 }}
            />
          ) : (
            <View style={s.list}>
              {data.questions.map((q, i) => (
                <View
                  key={q.id}
                  style={[
                    s.item,
                    i === data.questions.length - 1 && { borderBottomWidth: 0 },
                  ]}
                >
                  <Text style={s.itemInstruction}>
                    {q.instruction?.[lang] || q.instruction?.en || ""}
                  </Text>
                  <Text style={s.itemAnswer}>{q.npcText || q.answer}</Text>
                </View>
              ))}
              {!loading && data.count === 0 && (
                <Text style={s.empty}>{t("practice.noMistakes")}</Text>
              )}
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingTop: 50 },
    topBar: { paddingHorizontal: 20, paddingBottom: 8 },
    content: { paddingHorizontal: 20, paddingBottom: 40 },
    titleRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12,
      marginTop: 8,
    },
    title: {
      flex: 1,
      fontSize: 28,
      fontWeight: "900",
      color: theme.text,
      lineHeight: 38,
    },
    iconCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: ORANGE,
      alignItems: "center",
      justifyContent: "center",
    },
    startBtn: {
      backgroundColor: "#1CB0F6",
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: "center",
      marginTop: 24,
      borderBottomWidth: 4,
      borderColor: "#1899D6",
    },
    startBtnDisabled: {
      backgroundColor: theme.border,
      borderColor: theme.border,
    },
    startText: { color: "#fff", fontSize: 18, fontWeight: "900" },
    startTextDisabled: { color: theme.textSecondary },
    divider: { height: 1, backgroundColor: theme.border, marginVertical: 24 },
    sectionTitle: {
      fontSize: 22,
      fontWeight: "900",
      color: theme.text,
      marginBottom: 12,
    },
    list: {
      borderWidth: 1.5,
      borderColor: theme.border,
      borderRadius: 18,
      overflow: "hidden",
    },
    item: {
      paddingVertical: 16,
      paddingHorizontal: 18,
      borderBottomWidth: 1.5,
      borderBottomColor: theme.border,
    },
    itemInstruction: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 6,
    },
    itemAnswer: { fontSize: 18, fontWeight: "800", color: theme.text },
    empty: {
      textAlign: "center",
      color: theme.textSecondary,
      fontSize: 16,
      paddingVertical: 30,
    },
  });
