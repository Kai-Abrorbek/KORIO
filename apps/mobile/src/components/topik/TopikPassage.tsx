import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import type { TopikTextBlock } from "@/types/topik";
import { TopikTextBlocks } from "./TopikTextBlocks";
import { type TopikPalette, useTopikTheme } from "./topikTheme";

interface TopikPassageProps {
  blocks: TopikTextBlock[];
  highlightedKeys?: ReadonlySet<string>;
  bordered?: boolean;
}

export function TopikPassage({
  blocks,
  highlightedKeys,
  bordered = true,
}: TopikPassageProps) {
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);

  return (
    <View style={[styles.container, !bordered && styles.unbordered]}>
      <TopikTextBlocks blocks={blocks} highlightedKeys={highlightedKeys} />
    </View>
  );
}

const getStyles = (palette: TopikPalette) => StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: palette.borderStrong,
    backgroundColor: palette.surface,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
  },
  unbordered: { borderWidth: 0, paddingHorizontal: 0, paddingVertical: 0 },
});
