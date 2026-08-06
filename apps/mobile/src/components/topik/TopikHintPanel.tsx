import { Pressable, StyleSheet, Text, View } from "react-native";
import type {
  TopikLearningSupport,
  TopikRevealedSolution,
} from "@/types/topik";
import { topikText } from "@/types/topik";

interface TopikHintPanelProps {
  support?: TopikLearningSupport;
  solution?: TopikRevealedSolution;
  selected: boolean;
  busy?: boolean;
  onRevealHint: () => void;
  onRevealSolution: () => void;
}

export function TopikHintPanel({
  support,
  solution,
  selected,
  busy,
  onRevealHint,
  onRevealSolution,
}: TopikHintPanelProps) {
  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>GUIDED MODE</Text>
          <Text style={styles.title}>한 단계씩 풀어보기</Text>
        </View>
        <Text style={styles.count}>
          {support?.revealedHints.length ?? 0}/{support?.hintCount ?? 3}
        </Text>
      </View>

      {support?.revealedHints.map((hint) => (
        <View key={hint.key} style={styles.hintCard}>
          <Text style={styles.hintLevel}>힌트 {hint.level}</Text>
          <Text style={styles.hintTitle}>{topikText(hint.title)}</Text>
          <Text style={styles.hintContent}>{topikText(hint.content)}</Text>
          {hint.examples.map((example, index) => (
            <View key={`${hint.key}-${index}`} style={styles.example}>
              <Text style={styles.exampleLabel}>예시</Text>
              <Text style={styles.exampleText}>{topikText(example)}</Text>
            </View>
          ))}
        </View>
      ))}

      {solution && (
        <View style={styles.solutionCard}>
          <Text style={styles.solutionResult}>
            {solution.isCorrect ? "정답입니다" : "다시 확인해 볼까요?"}
          </Text>
          <Text style={styles.solutionAnswer}>
            정답 {solution.correctChoiceKey}번
          </Text>
          <Text style={styles.solutionHeading}>풀이 전략</Text>
          <Text style={styles.solutionText}>
            {topikText(solution.solution.strategy)}
          </Text>
          {solution.solution.keyClues.map((clue) => (
            <View key={clue.key} style={styles.clue}>
              <Text style={styles.clueLabel}>눈여겨볼 단서</Text>
              <Text style={styles.solutionText}>
                {topikText(clue.explanation)}
              </Text>
            </View>
          ))}
          <Text style={styles.solutionHeading}>정답 해설</Text>
          <Text style={styles.solutionText}>
            {topikText(solution.solution.explanation)}
          </Text>
        </View>
      )}

      {!solution && support?.nextHint && (
        <Pressable
          disabled={busy}
          onPress={onRevealHint}
          style={({ pressed }) => [
            styles.hintButton,
            pressed && styles.pressed,
            busy && styles.disabled,
          ]}
        >
          <Text style={styles.hintButtonText}>
            힌트 {support.nextHint.level} 열기 ·{" "}
            {topikText(support.nextHint.title)}
          </Text>
        </Pressable>
      )}

      {!solution && selected && (
        <Pressable
          disabled={busy}
          onPress={onRevealSolution}
          style={({ pressed }) => [
            styles.solutionButton,
            pressed && styles.pressed,
            busy && styles.disabled,
          ]}
        >
          <Text style={styles.solutionButtonText}>정답과 자세한 풀이 보기</Text>
        </Pressable>
      )}
      {!selected && (
        <Text style={styles.guideText}>
          답을 선택하면 정답 풀이를 볼 수 있어요.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: 13,
    borderWidth: 1,
    borderColor: "#D6E2EF",
    borderRadius: 16,
    backgroundColor: "#F7FAFD",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eyebrow: {
    color: "#5D7A98",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  title: { color: "#173B67", fontSize: 14, fontWeight: "900", marginTop: 3 },
  count: { color: "#315E8C", fontSize: 11, fontWeight: "800" },
  hintCard: {
    gap: 6,
    borderLeftWidth: 4,
    borderLeftColor: "#F0B94B",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    padding: 14,
  },
  hintLevel: { color: "#9B6B0D", fontSize: 11, fontWeight: "900" },
  hintTitle: { color: "#25354A", fontSize: 14, fontWeight: "900" },
  hintContent: { color: "#48515D", fontSize: 13, lineHeight: 20 },
  example: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#FFF8E4",
    borderRadius: 8,
    padding: 10,
  },
  exampleLabel: { color: "#9A6908", fontSize: 11, fontWeight: "900" },
  exampleText: { flex: 1, color: "#554A35", fontSize: 12, lineHeight: 18 },
  solutionCard: {
    gap: 8,
    borderRadius: 12,
    backgroundColor: "#EAF7F0",
    padding: 15,
  },
  solutionResult: { color: "#167047", fontSize: 16, fontWeight: "900" },
  solutionAnswer: { color: "#167047", fontSize: 13, fontWeight: "800" },
  solutionHeading: {
    color: "#244A39",
    fontSize: 13,
    fontWeight: "900",
    marginTop: 5,
  },
  solutionText: { color: "#40584C", fontSize: 13, lineHeight: 20 },
  clue: { gap: 4, borderRadius: 8, backgroundColor: "#FFF6C8", padding: 11 },
  clueLabel: { color: "#806313", fontSize: 11, fontWeight: "900" },
  hintButton: { borderRadius: 11, backgroundColor: "#E7EFF8", padding: 14 },
  hintButtonText: {
    color: "#234E79",
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
  },
  solutionButton: { borderRadius: 11, backgroundColor: "#173B67", padding: 14 },
  solutionButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
  },
  guideText: { color: "#717984", fontSize: 11, textAlign: "center" },
  pressed: { opacity: 0.76 },
  disabled: { opacity: 0.5 },
});
