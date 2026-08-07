import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import type { TopikChoice, TopikChoiceLayout } from "@/types/topik";
import { type TopikPalette, useTopikTheme } from "./topikTheme";
import { TOPIK_LISTENING_ASSETS } from "./topikListeningAssets";

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
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const multiColumn = layout !== "one_column";

  return (
    <View style={[styles.list, multiColumn && styles.grid]}>
      {choices.map((choice) => {
        const selected = choice.key === selectedChoiceKey;
        const correct = choice.key === correctChoiceKey;
        const wrong = Boolean(correctChoiceKey && selected && !correct);
        const imageSource = choice.imageAssetKey
          ? TOPIK_LISTENING_ASSETS[choice.imageAssetKey]
          : undefined;

        return (
          <Pressable
            key={choice.key}
            accessibilityRole="radio"
            accessibilityLabel={choice.imageAlt || choice.text}
            accessibilityState={{ checked: selected, disabled }}
            disabled={disabled}
            onPress={() => onSelect?.(choice.key)}
            style={({ pressed }) => [
              styles.choice,
              multiColumn && styles.gridChoice,
              Boolean(imageSource) && styles.visualChoice,
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
            {imageSource ? (
              <Image
                source={imageSource}
                accessibilityLabel={choice.imageAlt || choice.text}
                contentFit="contain"
                style={styles.choiceImage}
              />
            ) : (
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
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const getStyles = (palette: TopikPalette) =>
  StyleSheet.create({
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
    visualChoice: {
      minHeight: 154,
      flexDirection: "column",
      gap: 4,
      paddingHorizontal: 7,
      paddingVertical: 7,
    },
    choiceImage: {
      width: "100%",
      height: 116,
      borderRadius: 5,
      backgroundColor: palette.paper,
    },
    selected: {
      borderColor: palette.primary,
      backgroundColor: palette.primarySoft,
    },
    correct: {
      borderColor: palette.successBorder,
      backgroundColor: palette.successSoft,
    },
    wrong: { borderColor: palette.danger, backgroundColor: palette.dangerSoft },
    pressed: { opacity: 0.72 },
    number: { color: palette.textMuted, fontSize: 20, lineHeight: 23 },
    choiceText: {
      flex: 1,
      color: palette.text,
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: -0.2,
    },
    selectedText: { color: palette.primaryText, fontWeight: "800" },
    correctText: { color: palette.successText, fontWeight: "800" },
    wrongText: { color: palette.dangerText, fontWeight: "800" },
  });
