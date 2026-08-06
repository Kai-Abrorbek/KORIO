import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { TopikLevel } from "@/components/topik";
import { TopikService } from "@/services/topik.service";
import type { TopikAttemptMode, TopikExam } from "@/types/topik";
import { topikText } from "@/types/topik";

const MODES: Array<{
  key: TopikAttemptMode;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
}> = [
  {
    key: "guided",
    icon: "bulb-outline",
    title: "해설 학습",
    description: "힌트와 핵심 단서를 단계별로 보며 풀어요.",
    color: "#E8A52F",
  },
  {
    key: "mock_exam",
    icon: "timer-outline",
    title: "실전 모의고사",
    description: "제한 시간 안에 실제 시험처럼 집중해서 풀어요.",
    color: "#1E5B91",
  },
];

export default function TopikHomeScreen() {
  const params = useLocalSearchParams<{ level?: TopikLevel }>();
  const levelParam = Array.isArray(params.level) ? params.level[0] : params.level;
  const level: TopikLevel = levelParam === "1" ? "1" : "2";
  const examType = level === "1" ? "topik_i" : "topik_ii";
  const roman = level === "1" ? "I" : "II";
  const [exams, setExams] = useState<TopikExam[]>([]);
  const [selectedExamCode, setSelectedExamCode] = useState<string | null>(null);
  const [mode, setMode] = useState<TopikAttemptMode>("guided");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadExams = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await TopikService.listExams();
      const matchingExams = data.filter(
        (exam) => exam.examType === examType && exam.section === "reading",
      );
      setExams(matchingExams);
      setSelectedExamCode((current) =>
        matchingExams.some((exam) => exam.code === current)
          ? current
          : (matchingExams[0]?.code ?? null),
      );
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [examType]);

  useEffect(() => {
    void loadExams();
  }, [loadExams]);

  const selectedExam = exams.find((exam) => exam.code === selectedExamCode);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={25} color="#173B67" />
        </Pressable>
        <Text style={styles.headerTitle}>TOPIK {roman} 읽기</Text>
        <Pressable
          onPress={() => router.push("/topik-stats")}
          style={styles.iconButton}
        >
          <Ionicons name="stats-chart" size={21} color="#173B67" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>TOPIK {roman} · READING</Text>
          </View>
          <Text style={styles.heroTitle}>
            문제를 외우지 말고,{"\n"}푸는 법을 익혀 보세요.
          </Text>
          <Text style={styles.heroDescription}>
            실제 시험 구성 그대로 연습하고, 막힐 때만 단계별 힌트를 확인할 수
            있어요.
          </Text>
          <View style={styles.heroMetrics}>
            <View>
              <Text style={styles.metricValue}>
                {selectedExam?.totalQuestions ?? "—"}
              </Text>
              <Text style={styles.metricLabel}>문항</Text>
            </View>
            <View style={styles.metricDivider} />
            <View>
              <Text style={styles.metricValue}>
                {selectedExam?.durationMinutes ?? "—"}
              </Text>
              <Text style={styles.metricLabel}>분</Text>
            </View>
            <View style={styles.metricDivider} />
            <View>
              <Text style={styles.metricValue}>
                {selectedExam?.totalPoints ?? "—"}
              </Text>
              <Text style={styles.metricLabel}>점</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>시험 선택</Text>
          <Text style={styles.sectionCaption}>READING TEST</Text>
        </View>

        {loading ? (
          <View style={styles.stateCard}>
            <ActivityIndicator color="#173B67" />
            <Text style={styles.stateText}>시험지를 불러오고 있어요.</Text>
          </View>
        ) : error ? (
          <View style={styles.stateCard}>
            <Ionicons name="cloud-offline-outline" size={28} color="#8A5C48" />
            <Text style={styles.stateTitle}>시험지를 불러오지 못했어요.</Text>
            <Pressable onPress={loadExams} style={styles.retryButton}>
              <Text style={styles.retryText}>다시 시도</Text>
            </Pressable>
          </View>
        ) : exams.length === 0 ? (
          <View style={styles.stateCard}>
            <Ionicons name="documents-outline" size={29} color="#7A8290" />
            <Text style={styles.stateTitle}>
              TOPIK {roman} 읽기 시험지를 준비 중이에요.
            </Text>
            <Text style={styles.stateText}>
              완성도 높은 문제로 곧 만나볼 수 있어요.
            </Text>
          </View>
        ) : (
          <View style={styles.examList}>
            {exams.map((exam) => {
              const selected = exam.code === selectedExamCode;
              return (
                <Pressable
                  key={exam.id}
                  onPress={() => setSelectedExamCode(exam.code)}
                  style={[styles.examCard, selected && styles.examCardSelected]}
                >
                  <View style={styles.examNumber}>
                    <Text style={styles.examNumberText}>
                      {String(exam.round ?? 1).padStart(2, "0")}
                    </Text>
                  </View>
                  <View style={styles.examInfo}>
                    <Text style={styles.examTitle}>
                      {topikText(exam.title)}
                    </Text>
                    <Text style={styles.examMeta}>
                      {exam.totalQuestions}문항 · {exam.durationMinutes}분 ·{" "}
                      {exam.totalPoints}점
                    </Text>
                  </View>
                  <Ionicons
                    name={selected ? "checkmark-circle" : "ellipse-outline"}
                    size={23}
                    color={selected ? "#1D5D98" : "#B9BEC6"}
                  />
                </Pressable>
              );
            })}
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>학습 방식</Text>
          <Text style={styles.sectionCaption}>MODE</Text>
        </View>
        <View style={styles.modeList}>
          {MODES.map((item) => {
            const selected = item.key === mode;
            return (
              <Pressable
                key={item.key}
                onPress={() => setMode(item.key)}
                style={[styles.modeCard, selected && styles.modeCardSelected]}
              >
                <View
                  style={[
                    styles.modeIcon,
                    { backgroundColor: `${item.color}18` },
                  ]}
                >
                  <Ionicons name={item.icon} size={25} color={item.color} />
                </View>
                <View style={styles.modeInfo}>
                  <Text style={styles.modeTitle}>{item.title}</Text>
                  <Text style={styles.modeDescription}>{item.description}</Text>
                </View>
                <View style={[styles.radio, selected && styles.radioSelected]}>
                  {selected && <View style={styles.radioDot} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          disabled={!selectedExam}
          onPress={() =>
            selectedExam &&
            router.push({
              pathname: "/topik-exam",
              params: { examCode: selectedExam.code, mode },
            })
          }
          style={({ pressed }) => [
            styles.startButton,
            !selectedExam && styles.buttonDisabled,
            pressed && selectedExam && styles.buttonPressed,
          ]}
        >
          <Text style={styles.startButtonText}>
            {mode === "guided" ? "해설과 함께 시작" : "실전처럼 시작"}
          </Text>
          <Ionicons name="arrow-forward" size={21} color="#FFFFFF" />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F3ED" },
  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    backgroundColor: "#F5F3ED",
    marginTop: 30,
  },
  iconButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: "#173B67", fontSize: 16, fontWeight: "900" },
  content: { paddingHorizontal: 18, paddingBottom: 42, gap: 18 },
  hero: {
    overflow: "hidden",
    borderRadius: 22,
    backgroundColor: "#173B67",
    padding: 23,
  },
  heroBadge: {
    alignSelf: "flex-start",
    borderRadius: 20,
    backgroundColor: "#FFFFFF1A",
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  heroBadgeText: {
    color: "#D9E7F5",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.1,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    lineHeight: 32,
    fontWeight: "900",
    marginTop: 16,
    letterSpacing: -0.8,
  },
  heroDescription: {
    color: "#D8E3EE",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
  },
  heroMetrics: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 22,
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF24",
    paddingTop: 16,
  },
  metricValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
  },
  metricLabel: {
    color: "#AFC4D8",
    fontSize: 10,
    marginTop: 2,
    textAlign: "center",
  },
  metricDivider: { width: 1, height: 29, backgroundColor: "#FFFFFF28" },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 3,
  },
  sectionTitle: { color: "#242A32", fontSize: 17, fontWeight: "900" },
  sectionCaption: {
    color: "#8A8F96",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  examList: { gap: 10 },
  examCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    borderWidth: 1,
    borderColor: "#DEDCD5",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: 14,
  },
  examCardSelected: { borderColor: "#1D5D98", backgroundColor: "#F4F9FD" },
  examNumber: {
    width: 44,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#173B67",
  },
  examNumberText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
  examInfo: { flex: 1, gap: 4 },
  examTitle: { color: "#282C32", fontSize: 14, fontWeight: "900" },
  examMeta: { color: "#747982", fontSize: 11 },
  modeList: { gap: 10 },
  modeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#DEDCD5",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: 14,
  },
  modeCardSelected: { borderColor: "#8DAAC5", backgroundColor: "#FBFDFF" },
  modeIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  modeInfo: { flex: 1, gap: 3 },
  modeTitle: { color: "#292D33", fontSize: 14, fontWeight: "900" },
  modeDescription: { color: "#737881", fontSize: 11, lineHeight: 17 },
  radio: {
    width: 21,
    height: 21,
    borderWidth: 2,
    borderColor: "#BBC0C8",
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: { borderColor: "#1D5D98" },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1D5D98",
  },
  startButton: {
    minHeight: 57,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 16,
    backgroundColor: "#173B67",
    marginTop: 5,
    marginBottom: 20,
  },
  startButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  buttonDisabled: { opacity: 0.45 },
  buttonPressed: { opacity: 0.82 },
  stateCard: {
    minHeight: 128,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  stateTitle: {
    color: "#3C4149",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  stateText: { color: "#777C84", fontSize: 11, textAlign: "center" },
  retryButton: {
    borderRadius: 9,
    backgroundColor: "#173B67",
    paddingHorizontal: 17,
    paddingVertical: 9,
    marginTop: 4,
  },
  retryText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
});
