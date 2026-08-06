import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TopikService } from "@/services/topik.service";
import type {
  TopikHistoryItem,
  TopikQuestionPerformance,
  TopikQuestionType,
  TopikStatsSummary,
} from "@/types/topik";

const TYPE_LABELS: Record<TopikQuestionType, string> = {
  grammar_fill_blank: "문법 빈칸",
  underlined_meaning: "밑줄 의미",
  practical_text_topic: "실용문 주제",
  passage_content_match: "내용 일치",
  sentence_ordering: "문장 순서",
  passage_fill_blank: "지문 빈칸",
  passage_topic: "글의 주제",
  author_emotion: "글쓴이 감정",
  headline_interpretation: "신문 제목",
  sentence_insertion: "문장 삽입",
  author_attitude: "글쓴이 태도",
  author_purpose: "글쓴이 목적",
};

const MODE_LABELS = {
  guided: "해설 학습",
  practice: "연습",
  mock_exam: "실전 모의고사",
};

export default function TopikStatsScreen() {
  const [summary, setSummary] = useState<TopikStatsSummary | null>(null);
  const [weakQuestions, setWeakQuestions] = useState<TopikQuestionPerformance[]>([]);
  const [history, setHistory] = useState<TopikHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadStats = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [summaryData, weakData, historyData] = await Promise.all([
        TopikService.getStatsSummary(),
        TopikService.getWeakQuestions(6),
        TopikService.getHistory(6),
      ]);
      setSummary(summaryData);
      setWeakQuestions(weakData);
      setHistory(historyData);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStats();
  }, [loadStats]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={25} color="#173B67" />
        </Pressable>
        <Text style={styles.headerTitle}>TOPIK 학습 통계</Text>
        <Pressable onPress={loadStats} style={styles.iconButton}>
          <Ionicons name="refresh" size={21} color="#173B67" />
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#173B67" />
          <Text style={styles.stateText}>학습 기록을 분석하고 있어요.</Text>
        </View>
      ) : error || !summary ? (
        <View style={styles.centered}>
          <Ionicons name="cloud-offline-outline" size={34} color="#A05B4B" />
          <Text style={styles.errorTitle}>통계를 불러오지 못했어요.</Text>
          <Pressable onPress={loadStats} style={styles.retryButton}>
            <Text style={styles.retryText}>다시 시도</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <Text style={styles.heroEyebrow}>MY TOPIK REPORT</Text>
            <View style={styles.heroTop}>
              <View>
                <Text style={styles.heroLabel}>전체 정답률</Text>
                <Text style={styles.accuracy}>{summary.accuracy}%</Text>
              </View>
              <View style={styles.ring}>
                <Text style={styles.ringValue}>{summary.totalQuestions}</Text>
                <Text style={styles.ringLabel}>푼 문제</Text>
              </View>
            </View>
            <View style={styles.heroBottom}>
              <Text style={styles.heroStat}>최고 {summary.bestScore}점</Text>
              <Text style={styles.heroDot}>•</Text>
              <Text style={styles.heroStat}>평균 {summary.averageScore}점</Text>
              <Text style={styles.heroDot}>•</Text>
              <Text style={styles.heroStat}>{Math.round(summary.totalStudySeconds / 60)}분 학습</Text>
            </View>
          </View>

          <View style={styles.quickGrid}>
            <View style={styles.quickCard}>
              <Ionicons name="school-outline" size={21} color="#C38313" />
              <Text style={styles.quickValue}>{summary.guidedCount}</Text>
              <Text style={styles.quickLabel}>해설 학습</Text>
            </View>
            <View style={styles.quickCard}>
              <Ionicons name="timer-outline" size={21} color="#1E5B91" />
              <Text style={styles.quickValue}>{summary.mockExamCount}</Text>
              <Text style={styles.quickLabel}>모의고사</Text>
            </View>
            <View style={styles.quickCard}>
              <Ionicons name="bulb-outline" size={21} color="#8D5CBB" />
              <Text style={styles.quickValue}>{summary.hintViewCount}</Text>
              <Text style={styles.quickLabel}>힌트 사용</Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>유형별 실력</Text>
            <Text style={styles.sectionCaption}>최근 누적 기록</Text>
          </View>
          <View style={styles.card}>
            {summary.questionTypes.length === 0 ? (
              <Text style={styles.emptyText}>문제를 제출하면 유형별 분석이 시작돼요.</Text>
            ) : (
              summary.questionTypes.map((type) => (
                <View key={type.questionType} style={styles.typeRow}>
                  <View style={styles.typeTop}>
                    <Text style={styles.typeName}>{TYPE_LABELS[type.questionType]}</Text>
                    <Text style={styles.typeAccuracy}>{type.accuracy}%</Text>
                  </View>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { width: `${type.accuracy}%` }]} />
                  </View>
                  <Text style={styles.typeMeta}>
                    {type.correct}/{type.attempted} 정답 · 평균 {Math.round(type.averageDurationMs / 1000)}초
                  </Text>
                </View>
              ))
            )}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>집중 복습</Text>
            <Text style={styles.sectionCaption}>반복해서 틀린 문제</Text>
          </View>
          <View style={styles.card}>
            {weakQuestions.length === 0 ? (
              <View style={styles.emptyRow}>
                <Ionicons name="sparkles-outline" size={22} color="#2C8B62" />
                <Text style={styles.emptyText}>아직 약점으로 분류된 문제가 없어요.</Text>
              </View>
            ) : (
              weakQuestions.map((question) => (
                <View key={`${question.questionId}-${question.questionVersion}`} style={styles.weakRow}>
                  <View style={styles.weakNumber}>
                    <Text style={styles.weakNumberText}>{question.questionNumber}</Text>
                  </View>
                  <View style={styles.weakInfo}>
                    <Text style={styles.weakTitle}>{TYPE_LABELS[question.questionType]}</Text>
                    <Text style={styles.weakMeta}>
                      {question.wrongCount}회 오답 · 연속 {question.consecutiveWrong}회
                    </Text>
                  </View>
                  <Text style={styles.weakAccuracy}>{question.accuracy}%</Text>
                </View>
              ))
            )}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>최근 학습</Text>
            <Text style={styles.sectionCaption}>제출한 시험</Text>
          </View>
          <View style={styles.card}>
            {history.length === 0 ? (
              <Text style={styles.emptyText}>아직 제출한 시험이 없어요.</Text>
            ) : (
              history.map((item) => (
                <View key={item.attemptId} style={styles.historyRow}>
                  <View>
                    <Text style={styles.historyMode}>{MODE_LABELS[item.mode]}</Text>
                    <Text style={styles.historyDate}>
                      {new Date(item.submittedAt).toLocaleDateString("ko-KR")}
                    </Text>
                  </View>
                  <View style={styles.historyScoreWrap}>
                    <Text style={styles.historyScore}>{item.score}점</Text>
                    <Text style={styles.historyAccuracy}>{item.accuracy}% 정답</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F4F2EC" },
  header: { minHeight: 58, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 13 },
  iconButton: { width: 42, height: 42, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#173B67", fontSize: 16, fontWeight: "900" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", gap: 11, padding: 24 },
  stateText: { color: "#717983", fontSize: 13 },
  errorTitle: { color: "#424A54", fontSize: 15, fontWeight: "800" },
  retryButton: { borderRadius: 10, backgroundColor: "#173B67", paddingHorizontal: 18, paddingVertical: 10 },
  retryText: { color: "#FFFFFF", fontWeight: "800" },
  content: { gap: 17, paddingHorizontal: 16, paddingBottom: 40 },
  hero: { borderRadius: 22, backgroundColor: "#173B67", padding: 21 },
  heroEyebrow: { color: "#AFC4D8", fontSize: 10, fontWeight: "900", letterSpacing: 1.2 },
  heroTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 14 },
  heroLabel: { color: "#D5E0EA", fontSize: 12, fontWeight: "700" },
  accuracy: { color: "#FFFFFF", fontSize: 42, lineHeight: 52, fontWeight: "900" },
  ring: { width: 84, height: 84, alignItems: "center", justifyContent: "center", borderWidth: 7, borderColor: "#5C83A8", borderRadius: 42, backgroundColor: "#224D79" },
  ringValue: { color: "#FFFFFF", fontSize: 18, fontWeight: "900" },
  ringLabel: { color: "#C3D3E1", fontSize: 10 },
  heroBottom: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 7, borderTopWidth: 1, borderTopColor: "#FFFFFF22", marginTop: 17, paddingTop: 14 },
  heroStat: { color: "#D6E1EB", fontSize: 11, fontWeight: "700" },
  heroDot: { color: "#6F91B0", fontSize: 10 },
  quickGrid: { flexDirection: "row", gap: 9 },
  quickCard: { flex: 1, alignItems: "center", gap: 4, borderWidth: 1, borderColor: "#DEDCD6", borderRadius: 14, backgroundColor: "#FFFFFF", paddingVertical: 14 },
  quickValue: { color: "#2D333B", fontSize: 18, fontWeight: "900" },
  quickLabel: { color: "#777D85", fontSize: 10 },
  sectionHeader: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", marginTop: 2 },
  sectionTitle: { color: "#292E35", fontSize: 17, fontWeight: "900" },
  sectionCaption: { color: "#83888F", fontSize: 10, fontWeight: "700" },
  card: { gap: 15, borderWidth: 1, borderColor: "#DEDDD8", borderRadius: 15, backgroundColor: "#FFFFFF", padding: 15 },
  typeRow: { gap: 6 },
  typeTop: { flexDirection: "row", justifyContent: "space-between" },
  typeName: { color: "#363C44", fontSize: 12, fontWeight: "800" },
  typeAccuracy: { color: "#173B67", fontSize: 12, fontWeight: "900" },
  barTrack: { height: 7, overflow: "hidden", borderRadius: 4, backgroundColor: "#E8EAEC" },
  barFill: { height: "100%", borderRadius: 4, backgroundColor: "#2A6A9F" },
  typeMeta: { color: "#8A8F95", fontSize: 10 },
  emptyRow: { flexDirection: "row", alignItems: "center", gap: 9 },
  emptyText: { flex: 1, color: "#777E86", fontSize: 12, lineHeight: 19 },
  weakRow: { flexDirection: "row", alignItems: "center", gap: 11 },
  weakNumber: { width: 39, height: 39, alignItems: "center", justifyContent: "center", borderRadius: 9, backgroundColor: "#FBECEC" },
  weakNumberText: { color: "#B94646", fontSize: 13, fontWeight: "900" },
  weakInfo: { flex: 1, gap: 2 },
  weakTitle: { color: "#363B42", fontSize: 12, fontWeight: "800" },
  weakMeta: { color: "#858A91", fontSize: 10 },
  weakAccuracy: { color: "#B94646", fontSize: 12, fontWeight: "900" },
  historyRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#ECECEA", paddingBottom: 11 },
  historyMode: { color: "#343A42", fontSize: 12, fontWeight: "900" },
  historyDate: { color: "#8B9097", fontSize: 10, marginTop: 3 },
  historyScoreWrap: { alignItems: "flex-end", gap: 2 },
  historyScore: { color: "#173B67", fontSize: 14, fontWeight: "900" },
  historyAccuracy: { color: "#7A8087", fontSize: 10 },
});
