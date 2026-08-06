import { StyleSheet, View } from "react-native";
import type { TopikTextBlock } from "@/types/topik";
import { TopikTextBlocks } from "./TopikTextBlocks";

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
  return (
    <View style={[styles.container, !bordered && styles.unbordered]}>
      <TopikTextBlocks
        blocks={blocks}
        highlightedKeys={highlightedKeys}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#D5D8DD",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 17,
  },
  unbordered: { borderWidth: 0, paddingHorizontal: 0, paddingVertical: 0 },
});
