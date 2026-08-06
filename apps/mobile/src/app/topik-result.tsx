import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
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
import { useTopikAttemptStore } from "@/store/topik-attempt.store";
import type { TopikAttemptResult } from "@/types/topik";
import { topikText } from "@/types/topik";

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}분 ${seconds}초`;
}

export default function TopikResultScreen() {
  const params = useLocalSearchParams<{ attemptId?: string }>();
  const attemptId = Array.isArray(params.attemptId)
    ? params.attemptId[0]
    : params.attemptId;
  const storedResult = useTopikAttemptStore((state) => state.result);
  const reset = useTopikAttemptStore((state) => state.reset);
  const [result, setResult] = useState<TopikAttemptResult | null>(
    storedResult?.attemptId === attemptId ? storedResult : null,
  );
  const [wrongOnly, setWrongOnly] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!attemptId || result) return;
    TopikService.getResult(attemptId)
      .then(setResult)
      .catch(() => setError(true));
  }, [attemptId, result]);

  const visibleQuestions = useMemo(
    () =>
      result?.questions.filter((question) => !wrongOnly || !question.isCorrect) ?? [],
    [result, wrongOnly],
  );

  if (!result) {
    return (
      <SafeAreaView style={styles.centered}>
        {error ? (
          <>
            <Ionicons name="alert-circle-outline" size={35} color="#A3463B" />
            <Text style={styles.errorTitle}>결과를 불러오지 못했어요.</Text>
            <Pressable onPress={() => router.replace("/topik")} style={styles.homeButtonSmall}>
              <Text style={styles.homeButtonText}>시험 선택으로</Text>
            </Pressable>
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color="#173B67" />
            <Text style={styles.loadingText}>채점 결과를 정리하고 있어요.</Text>
          </>
        )}
      </SafeAreaView>
    );
  }

  const accuracy = Math.round((result.correctCount / result.totalQuestions) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={35} color="#FFFFFF" />
          </View>
          <Text style={styles.heroEyebrow}>TOPIK II · READING</Text>
          <Text style={styles.heroTitle}>채점이 완료됐어요</Text>
          <Text style={styles.score}>{result.score}</Text>
          <Text style={styles.scoreUnit}>/ 100점</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{result.correctCount}</Text>
              <Text style={styles.summaryLabel}>정답</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{accuracy}%</Text>
              <Text style={styles.summaryLabel}>정답률</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{formatDuration(result.elapsedSeconds)}</Text>
              <Text style={styles.summaryLabel}>풀이 시간</Text>
            </View>
          </View>
        </View>

        <View style={styles.reviewHeader}>
          <View>
            <Text style={styles.sectionTitle}>문항별 결과</Text>
            <Text style={styles.sectionCaption}>해설을 읽고 틀린 이유를 확인해 보세요.</Text>
          </View>
          <Pressable
            onPress={() => setWrongOnly((value) => !value)}
            style={[styles.filterButton, wrongOnly && styles.filterButtonActive]}
          >
            <Text style={[styles.filterText, wrongOnly && styles.filterTextActive]}>
              오답만
            </Text>
          </Pressable>
        </View>

        <View style={styles.resultList}>
          {visibleQuestions.map((question) => (
            <View key={question.questionId} style={styles.resultCard}>
              <View style={styles.resultTop}>
                <View style={[styles.numberBadge, question.isCorrect ? styles.correctBadge : styles.wrongBadge]}>
                  <Text style={[styles.numberText, question.isCorrect ? styles.correctText : styles.wrongText]}>
                    {String(question.number).padStart(2, "0")}
                  </Text>
                </View>
                <View style={styles.answerInfo}>
                  <Text style={styles.answerLine}>
                    내 답 {question.selectedChoiceKey ? `${question.selectedChoiceKey}번` : "미응답"}
                  </Text>
                  <Text style={styles.correctLine}>정답 {question.correctChoiceKey}번</Text>
                </View>
                <Ionicons
                  name={question.isCorrect ? "checkmark-circle" : "close-circle"}
                  size={25}
                  color={question.isCorrect ? "#27895B" : "#C45151"}
                />
              </View>
              <View style={styles.explanation}>
                <Text style={styles.explanationLabel}>정답 해설</Text>
                <Text style={styles.explanationText}>
                  {topikText(question.solution.explanation)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <Pressable onPress={() => router.push("/topik-stats")} style={styles.statsButton}>
            <Ionicons name="stats-chart" size={19} color="#173B67" />
            <Text style={styles.statsButtonText}>학습 통계 보기</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              reset();
              router.replace("/topik");
            }}
            style={styles.homeButton}
          >
            <Text style={styles.homeButtonText}>다른 시험 풀기</Text>
            <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F3F1EB" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, backgroundColor: "#F3F1EB", padding: 24 },
  loadingText: { color: "#67717C", fontSize: 13 },
  errorTitle: { color: "#3D4650", fontSize: 15, fontWeight: "800" },
  content: { padding: 16, paddingBottom: 40, gap: 19 },
  hero: { alignItems: "center", borderRadius: 23, backgroundColor: "#173B67", paddingHorizontal: 18, paddingVertical: 25 },
  checkCircle: { width: 58, height: 58, alignItems: "center", justifyContent: "center", borderRadius: 29, backgroundColor: "#2C8B62", marginBottom: 13 },
  heroEyebrow: { color: "#AFC4D8", fontSize: 10, fontWeight: "900", letterSpacing: 1.2 },
  heroTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "900", marginTop: 5 },
  score: { color: "#FFFFFF", fontSize: 56, lineHeight: 64, fontWeight: "900", marginTop: 9 },
  scoreUnit: { color: "#C4D4E3", fontSize: 12, fontWeight: "700" },
  summaryRow: { width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-around", borderTopWidth: 1, borderTopColor: "#FFFFFF24", marginTop: 20, paddingTop: 17 },
  summaryItem: { flex: 1, alignItems: "center", gap: 3 },
  summaryValue: { color: "#FFFFFF", fontSize: 14, fontWeight: "900", textAlign: "center" },
  summaryLabel: { color: "#AFC4D8", fontSize: 10 },
  summaryDivider: { width: 1, height: 29, backgroundColor: "#FFFFFF26" },
  reviewHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  sectionTitle: { color: "#272C33", fontSize: 17, fontWeight: "900" },
  sectionCaption: { color: "#777D85", fontSize: 10, marginTop: 4 },
  filterButton: { borderWidth: 1, borderColor: "#CBD0D5", borderRadius: 18, backgroundColor: "#FFFFFF", paddingHorizontal: 13, paddingVertical: 8 },
  filterButtonActive: { borderColor: "#173B67", backgroundColor: "#173B67" },
  filterText: { color: "#5F6872", fontSize: 12, fontWeight: "800" },
  filterTextActive: { color: "#FFFFFF" },
  resultList: { gap: 10 },
  resultCard: { gap: 12, borderWidth: 1, borderColor: "#DDDCD7", borderRadius: 14, backgroundColor: "#FFFFFF", padding: 14 },
  resultTop: { flexDirection: "row", alignItems: "center", gap: 11 },
  numberBadge: { width: 47, height: 43, alignItems: "center", justifyContent: "center", borderRadius: 9 },
  correctBadge: { backgroundColor: "#E8F5EE" },
  wrongBadge: { backgroundColor: "#FBECEC" },
  numberText: { fontSize: 15, fontWeight: "900" },
  correctText: { color: "#277B56" },
  wrongText: { color: "#B64242" },
  answerInfo: { flex: 1, gap: 2 },
  answerLine: { color: "#343A42", fontSize: 13, fontWeight: "800" },
  correctLine: { color: "#737A83", fontSize: 11 },
  explanation: { gap: 5, borderRadius: 9, backgroundColor: "#F6F7F7", padding: 11 },
  explanationLabel: { color: "#173B67", fontSize: 11, fontWeight: "900" },
  explanationText: { color: "#4E555E", fontSize: 12, lineHeight: 18 },
  actions: { gap: 10, marginTop: 4 },
  statsButton: { minHeight: 52, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderWidth: 1, borderColor: "#9FB2C5", borderRadius: 14, backgroundColor: "#FFFFFF" },
  statsButtonText: { color: "#173B67", fontSize: 14, fontWeight: "900" },
  homeButton: { minHeight: 54, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 14, backgroundColor: "#173B67" },
  homeButtonSmall: { borderRadius: 10, backgroundColor: "#173B67", paddingHorizontal: 18, paddingVertical: 11 },
  homeButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
});
