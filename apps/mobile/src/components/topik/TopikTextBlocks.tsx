import { Fragment } from "react";
import { StyleSheet, Text, View, type TextStyle } from "react-native";
import type {
  TopikTextBlock,
  TopikTextSegment,
} from "@/types/topik";

interface TopikTextBlocksProps {
  blocks: TopikTextBlock[];
  highlightedKeys?: ReadonlySet<string>;
  textStyle?: TextStyle;
}

const markerLabels = ["㉠", "㉡", "㉢", "㉣"];

function segmentText(segment: TopikTextSegment) {
  if (segment.type === "blank") return segment.text || "(       )";
  if (segment.type === "insertion_marker") {
    const number = Number(segment.label || segment.text);
    return Number.isFinite(number) && number >= 1 && number <= 4
      ? markerLabels[number - 1]
      : segment.label || segment.text || "(  )";
  }
  return segment.text;
}

export function TopikTextBlocks({
  blocks,
  highlightedKeys = new Set(),
  textStyle,
}: TopikTextBlocksProps) {
  return (
    <View style={styles.container}>
      {blocks.map((block, blockIndex) => (
        <Text
          key={`${block.type}-${blockIndex}`}
          style={[
            styles.text,
            block.type === "caption" && styles.caption,
            block.type === "quote" && styles.quote,
            textStyle,
          ]}
        >
          {block.type === "bullet" ? "• " : null}
          {block.segments.map((segment, segmentIndex) => {
            const highlighted = Boolean(
              segment.key && highlightedKeys.has(segment.key),
            );
            return (
              <Fragment key={`${segment.key || segment.type}-${segmentIndex}`}>
                <Text
                  style={[
                    segment.type === "underline" && styles.underline,
                    segment.type === "emphasis" && styles.emphasis,
                    segment.type === "blank" && styles.blank,
                    segment.type === "insertion_marker" && styles.marker,
                    highlighted && styles.highlighted,
                  ]}
                >
                  {segmentText(segment)}
                </Text>
              </Fragment>
            );
          })}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 10 },
  text: {
    color: "#242427",
    fontSize: 17,
    lineHeight: 30,
    letterSpacing: -0.25,
  },
  caption: { color: "#64646D", fontSize: 13, lineHeight: 21 },
  quote: { fontStyle: "italic", paddingLeft: 12 },
  underline: { textDecorationLine: "underline", fontWeight: "700" },
  emphasis: { fontWeight: "800" },
  blank: { fontWeight: "800", letterSpacing: 1 },
  marker: { color: "#173B67", fontWeight: "900" },
  highlighted: {
    backgroundColor: "#FFF0A6",
    color: "#192F4A",
    fontWeight: "900",
  },
});
