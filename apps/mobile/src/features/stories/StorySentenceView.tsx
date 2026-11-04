import { memo, useMemo } from "react";
import { StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
import { Pressable } from "@/components/ui/Pressables";
import { wordToneOf, type AssessResult } from "@/services/stt.service";
import { withAlpha, type ScenePalette } from "./scenes";
import { normalizeToken, tokenize } from "./storyTiming";
import type { StorySentence } from "./stories.types";

/**
 * 문장 하나. 영어 원문(단어마다 불이 켜진다) + 설명 언어 번역.
 *
 * 지금 문장만 단어가 바뀔 때 다시 그려진다 — 다른 문장은 props 가 그대로라 memo 가 막는다.
 * 핵심 단어는 점선 밑줄. 누르면 뜻 시트, 문장 다른 곳을 누르면 그 문장부터 다시 듣는다.
 */

export type SentenceState = "past" | "active" | "future";

const TONE_COLOR = {
  good: "#58CC02",
  warn: "#F5A623",
  bad: "#FF4B4B",
} as const;

/** 발음 평가 단어(문장부호 없음)를 화면 단어에 순서대로 맞춘다 */
function tonesFor(tokens: string[], result: AssessResult | undefined) {
  if (!result || result.status !== "success") return null;
  const assessed = result.words.filter((word) => word.errorType !== "Insertion");
  let cursor = 0;
  return tokens.map((token) => {
    const key = normalizeToken(token);
    for (let i = cursor; i < assessed.length; i += 1) {
      if (normalizeToken(assessed[i].word) === key) {
        cursor = i + 1;
        return wordToneOf(assessed[i]);
      }
    }
    return null;
  });
}

interface Props {
  sentence: StorySentence;
  index: number;
  state: SentenceState;
  /** 지금 단어 (active 일 때만 의미가 있다). 단어 타이밍이 없으면 문장 통째로 켠다 */
  activeWord: number;
  showTranslation: boolean;
  palette: ScenePalette;
  vocabulary: Map<string, string>;
  shadowResult?: AssessResult;
  onPress: (index: number) => void;
  onWordPress: (
    sentenceIndex: number,
    wordIndex: number,
    word: string,
    meaning: string,
  ) => void;
  onLayout: (index: number, y: number) => void;
}

function StorySentenceViewBase({
  sentence,
  index,
  state,
  activeWord,
  showTranslation,
  palette,
  vocabulary,
  shadowResult,
  onPress,
  onWordPress,
  onLayout,
}: Props) {
  const tokens = useMemo(() => tokenize(sentence.text), [sentence.text]);
  const tones = useMemo(() => tonesFor(tokens, shadowResult), [shadowResult, tokens]);
  const timed = sentence.words.length === tokens.length;
  const active = state === "active";

  const dim = withAlpha(palette.ink, state === "future" ? 0.36 : 0.62);
  const unspoken = withAlpha(palette.ink, 0.4);

  const colorOf = (wordIndex: number): string => {
    const tone = tones?.[wordIndex];
    if (tone) return TONE_COLOR[tone];
    if (!active) return dim;
    if (!timed) return palette.glow;
    if (wordIndex < activeWord) return palette.ink;
    if (wordIndex === activeWord) return palette.glow;
    return unspoken;
  };

  return (
    <Pressable
      sound={false}
      onPress={() => onPress(index)}
      onLayout={(event: LayoutChangeEvent) =>
        onLayout(index, event.nativeEvent.layout.y)
      }
      accessibilityRole="button"
      accessibilityLabel={sentence.text}
      accessibilityHint={sentence.translation}
      style={[
        styles.block,
        active && { backgroundColor: withAlpha(palette.glow, 0.08) },
      ]}
    >
      <Text style={styles.english}>
        {tokens.map((token, wordIndex) => {
          const meaning = vocabulary.get(normalizeToken(token));
          const color = colorOf(wordIndex);
          return (
            <Text
              key={wordIndex}
              suppressHighlighting
              onPress={
                meaning
                  ? () => onWordPress(index, wordIndex, token, meaning)
                  : undefined
              }
              style={[
                { color },
                meaning && {
                  textDecorationLine: "underline",
                  textDecorationStyle: "dotted",
                  textDecorationColor: withAlpha(palette.glow, active ? 0.9 : 0.45),
                },
              ]}
            >
              {token}
              {wordIndex < tokens.length - 1 ? " " : ""}
            </Text>
          );
        })}
      </Text>
      {showTranslation && (
        <Text
          style={[
            styles.translation,
            { color: withAlpha(palette.ink, active ? 0.74 : 0.42) },
          ]}
        >
          {sentence.translation}
        </Text>
      )}
      {shadowResult?.status === "success" && (
        <View style={styles.scoreRow}>
          <View
            style={[
              styles.scoreDot,
              {
                backgroundColor: shadowResult.passed
                  ? TONE_COLOR.good
                  : TONE_COLOR.warn,
              },
            ]}
          />
          <Text style={[styles.scoreText, { color: withAlpha(palette.ink, 0.7) }]}>
            {Math.round(shadowResult.scores.pron)}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export const StorySentenceView = memo(StorySentenceViewBase);

const styles = StyleSheet.create({
  block: {
    marginHorizontal: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 18,
  },
  english: {
    fontSize: 22,
    lineHeight: 31,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  translation: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "700",
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  scoreDot: { width: 8, height: 8, borderRadius: 4 },
  scoreText: {
    fontSize: 13,
    fontWeight: "900",
    fontVariant: ["tabular-nums"],
  },
});
