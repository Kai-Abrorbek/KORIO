import { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { ThemeColors } from "@/constants/theme";
import { LessonService } from "@/services/lesson.service";
import { useSpeech } from "@/hooks/useSpeech";
import { useEnergyStore } from "@/store/energy.store";
import { useAuthStore } from "@/store/auth.store";

interface Props {
  visible: boolean;
  onClose: () => void;
  theme: ThemeColors;
}

export default function WordsModal({ visible, onClose, theme }: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const s = styles(theme);
  const { speak } = useSpeech();
  const [words, setWords] = useState<{ korean: string; native: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortAsc, setSortAsc] = useState(false);
  const guardLessonStart = useEnergyStore((s) => s.guardLessonStart);
  const energy = useAuthStore((s) => s.user?.energy ?? 0);

  useEffect(() => {
    if (!visible) return;
    setLoading(true);
    LessonService.getLearnedWords()
      .then((d) => setWords(d.words))
      .catch((e) => console.error("단어 로드 실패:", e))
      .finally(() => setLoading(false));
  }, [visible]);

  const sorted = useMemo(() => {
    if (!sortAsc) return words;
    return [...words].sort((a, b) => a.korean.localeCompare(b.korean, "ko"));
  }, [words, sortAsc]);

  const xp = Math.min(20, Math.max(10, Math.floor(words.length / 5) * 5));

  const startGame = () => {
    if (words.length < 2) return; // 배운 단어 부족하면 시작 안 함
    onClose();
    guardLessonStart(energy, () => {
      router.push("/lesson?mode=wordPractice"); // ✅ 배운 단어로 짝맞추기
    });
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
        <View style={s.topBar}>
          <TouchableOpacity onPress={onClose} hitSlop={10}>
            <Ionicons name="arrow-back" size={28} color={theme.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={s.content}
          showsVerticalScrollIndicator={false}
        >
          {/* 타이틀 + 카드 아이콘 */}
          <View style={s.titleRow}>
            <Text style={s.title}>{t("practice.practiceWords")}</Text>
            <View style={s.cardIcon}>
              <Ionicons name="albums" size={30} color="#fff" />
            </View>
          </View>

          {/* 시작 */}
          <TouchableOpacity
            style={[s.startBtn, words.length < 2 && { opacity: 0.5 }]}
            onPress={startGame}
            disabled={words.length < 2}
            activeOpacity={0.9}
          >
            <Text style={s.startText}>{t("practice.startXp", { xp })}</Text>
          </TouchableOpacity>

          <View style={s.divider} />

          {/* 단어 수 + 정렬 */}
          <View style={s.listHead}>
            <Text style={s.sectionTitle}>
              {t("practice.wordCount", { n: words.length })}
            </Text>
            <TouchableOpacity onPress={() => setSortAsc((v) => !v)}>
              <Text style={s.sortText}>{t("practice.sort")}</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator
              color={theme.primary}
              style={{ marginTop: 30 }}
            />
          ) : words.length === 0 ? (
            <Text style={s.empty}>{t("practice.noWords")}</Text>
          ) : (
            <View style={s.list}>
              {sorted.map((w, i) => (
                <View
                  key={w.korean + i}
                  style={[
                    s.item,
                    i === sorted.length - 1 && { borderBottomWidth: 0 },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => speak(w.korean)}
                    hitSlop={8}
                    style={s.speaker}
                  >
                    <Ionicons name="volume-medium" size={24} color="#1CB0F6" />
                  </TouchableOpacity>
                  <View style={{ flex: 1 }}>
                    <Text style={s.korean}>{w.korean}</Text>
                    <Text style={s.native}>{w.native}</Text>
                  </View>
                </View>
              ))}
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
      alignItems: "center",
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
    cardIcon: {
      width: 60,
      height: 60,
      borderRadius: 16,
      backgroundColor: "#1CB0F6",
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
    startText: { color: "#fff", fontSize: 18, fontWeight: "900" },
    divider: { height: 1, backgroundColor: theme.border, marginVertical: 24 },
    listHead: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 12,
    },
    sectionTitle: { fontSize: 22, fontWeight: "900", color: theme.text },
    sortText: { fontSize: 15, fontWeight: "800", color: "#1CB0F6" },
    list: {
      borderWidth: 1.5,
      borderColor: theme.border,
      borderRadius: 18,
      overflow: "hidden",
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      paddingVertical: 14,
      paddingHorizontal: 18,
      borderBottomWidth: 1.5,
      borderBottomColor: theme.border,
    },
    speaker: { width: 28 },
    korean: { fontSize: 18, fontWeight: "800", color: theme.text },
    native: { fontSize: 15, color: theme.textSecondary, marginTop: 2 },
    empty: {
      textAlign: "center",
      color: theme.textSecondary,
      fontSize: 16,
      paddingVertical: 30,
    },
  });
