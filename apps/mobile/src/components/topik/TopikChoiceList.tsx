import { Pressable, StyleSheet, Text, View } from "react-native";
import type { TopikChoice, TopikChoiceLayout } from "@/types/topik";

interface TopikChoiceListProps {
  choices: TopikChoice[];
  layout: TopikChoiceLayout;
  selectedChoiceKey?: string;
  correctChoiceKey?: string;
  disabled?: boolean;
  onSelect?: (choiceKey: string) => void;
}

const choiceNumbers: Record<string, string> = {
  "1": "①",
  "2": "②",
  "3": "③",
  "4": "④",
};

export function TopikChoiceList({
  choices,
  layout,
  selectedChoiceKey,
  correctChoiceKey,
  disabled = false,
  onSelect,
}: TopikChoiceListProps) {
  const multiColumn = layout !== "one_column";

  return (
    <View style={[styles.list, multiColumn && styles.grid]}>
      {choices.map((choice) => {
        const selected = choice.key === selectedChoiceKey;
        const correct = choice.key === correctChoiceKey;
        const wrong = Boolean(correctChoiceKey && selected && !correct);

        return (
          <Pressable
            key={choice.key}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected, disabled }}
            disabled={disabled}
            onPress={() => onSelect?.(choice.key)}
            style={({ pressed }) => [
              styles.choice,
              multiColumn && styles.gridChoice,
              selected && styles.selected,
              correct && styles.correct,
              wrong && styles.wrong,
              pressed && !disabled && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.number,
                selected && styles.selectedText,
                correct && styles.correctText,
                wrong && styles.wrongText,
              ]}
            >
              {choiceNumbers[choice.key] ?? choice.key}
            </Text>
            <Text
              style={[
                styles.choiceText,
                selected && styles.selectedText,
                correct && styles.correctText,
                wrong && styles.wrongText,
              ]}
            >
              {choice.text}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 6 },
  grid: { flexDirection: "row", flexWrap: "wrap", columnGap: 8 },
  choice: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  gridChoice: { width: "48.5%" },
  selected: { borderColor: "#1D5D98", backgroundColor: "#EAF3FB" },
  correct: { borderColor: "#2B8A57", backgroundColor: "#EAF8F0" },
  wrong: { borderColor: "#C94A4A", backgroundColor: "#FFF0F0" },
  pressed: { opacity: 0.72 },
  number: { color: "#676C72", fontSize: 20, lineHeight: 23 },
  choiceText: {
    flex: 1,
    color: "#31343A",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  selectedText: { color: "#153E68", fontWeight: "800" },
  correctText: { color: "#17683E", fontWeight: "800" },
  wrongText: { color: "#A92E2E", fontWeight: "800" },
});
