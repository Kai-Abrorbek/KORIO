import { StyleSheet, Text, View } from "react-native";
import type { TopikQuestionWithGroup } from "@/types/topik";
import { TopikChoiceList } from "./TopikChoiceList";
import { TopikStimulusCard } from "./TopikStimulusCard";
import { TopikTextBlocks } from "./TopikTextBlocks";

interface TopikQuestionCardProps {
  question: TopikQuestionWithGroup;
  selectedChoiceKey?: string;
  correctChoiceKey?: string;
  highlightedKeys?: ReadonlySet<string>;
  disabled?: boolean;
  onSelect?: (choiceKey: string) => void;
}

export function TopikQuestionCard({
  question,
  selectedChoiceKey,
  correctChoiceKey,
  highlightedKeys,
  disabled,
  onSelect,
}: TopikQuestionCardProps) {
  const stimulus = question.stimulus ?? question.group.sharedStimulus;

  return (
    <View style={styles.paper}>
      <View style={styles.instructionWrap}>
        <TopikTextBlocks
          blocks={question.group.instruction}
          textStyle={styles.instruction}
        />
      </View>

      {stimulus && (
        <TopikStimulusCard
          stimulus={stimulus}
          highlightedKeys={highlightedKeys}
        />
      )}

      <View style={styles.questionRow}>
        <Text style={styles.questionNumber}>
          {String(question.number).padStart(2, "0")}
        </Text>
        <View style={styles.prompt}>
          <TopikTextBlocks
            blocks={question.prompt}
            highlightedKeys={highlightedKeys}
            textStyle={styles.promptText}
          />
        </View>
      </View>

      <TopikChoiceList
        choices={question.choices}
        layout={question.presentation.choiceLayout}
        selectedChoiceKey={selectedChoiceKey}
        correctChoiceKey={correctChoiceKey}
        disabled={disabled}
        onSelect={onSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  paper: {
    gap: 20,
    borderWidth: 1,
    borderColor: "#E0DED8",
    borderRadius: 6,
    backgroundColor: "#FFFEFB",
    paddingHorizontal: 18,
    paddingTop: 17,
    paddingBottom: 22,
    shadowColor: "#182230",
    shadowOpacity: 0.07,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  instructionWrap: {
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D5",
    paddingBottom: 13,
  },
  instruction: {
    color: "#38393B",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
  },
  questionRow: { flexDirection: "row", alignItems: "flex-start", gap: 14 },
  questionNumber: {
    color: "#153C69",
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "900",
    letterSpacing: -1.5,
  },
  prompt: { flex: 1, paddingTop: 2 },
  promptText: {
    color: "#252629",
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "700",
  },
});
