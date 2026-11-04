import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from "react-native-reanimated";
import { Pressable } from "@/components/ui/Pressables";
import { withAlpha, type ScenePalette } from "./scenes";
import type { StoriesCopy } from "./stories.copy";

/**
 * 핵심 단어 시트. 단어(크게) + 뜻 + "단어 듣기"(이야기 속 그 목소리 그대로).
 * 열리면 이야기가 잠깐 멈추고, 닫으면 멈춘 자리에서 다시 이어진다 (화면이 처리한다).
 */
interface Props {
  palette: ScenePalette;
  copy: StoriesCopy;
  word: string;
  meaning: string;
  bottomInset: number;
  onHear: () => void;
  onClose: () => void;
}

function StoryWordSheetBase({
  palette,
  copy,
  word,
  meaning,
  bottomInset,
  onHear,
  onClose,
}: Props) {
  const clean = word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View entering={FadeIn.duration(160)} exiting={FadeOut.duration(140)} style={StyleSheet.absoluteFill}>
        <Pressable
          sound={false}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={copy.close}
          style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.45)" }]}
        />
      </Animated.View>
      <Animated.View
        entering={SlideInDown.duration(240)}
        exiting={SlideOutDown.duration(180)}
        style={[
          styles.sheet,
          {
            backgroundColor: palette.groundDeep,
            borderColor: withAlpha(palette.ink, 0.1),
            paddingBottom: bottomInset + 22,
          },
        ]}
      >
        <View style={[styles.grabber, { backgroundColor: withAlpha(palette.ink, 0.2) }]} />
        <View style={styles.row}>
          <Text style={[styles.word, { color: palette.glow }]}>{clean}</Text>
          <Pressable
            onPress={onHear}
            accessibilityRole="button"
            accessibilityLabel={copy.hearWord}
            hitSlop={8}
            style={[styles.hear, { backgroundColor: withAlpha(palette.ink, 0.12) }]}
          >
            <Ionicons name="volume-high" size={22} color={palette.ink} />
          </Pressable>
        </View>
        <Text style={[styles.label, { color: withAlpha(palette.ink, 0.55) }]}>
          {copy.meaning}
        </Text>
        <Text style={[styles.meaning, { color: palette.ink }]}>{meaning}</Text>
      </Animated.View>
    </View>
  );
}

export const StoryWordSheet = memo(StoryWordSheetBase);

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  grabber: { alignSelf: "center", width: 40, height: 4, borderRadius: 2, marginBottom: 18 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  word: { flex: 1, fontSize: 34, lineHeight: 40, fontWeight: "900", letterSpacing: -0.5 },
  hear: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  label: { marginTop: 16, fontSize: 12, fontWeight: "900", letterSpacing: 0.4 },
  meaning: { marginTop: 4, fontSize: 20, lineHeight: 27, fontWeight: "800" },
});
