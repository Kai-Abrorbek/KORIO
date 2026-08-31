import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import type {
  ReadingLanguage,
  ReadingWordGloss,
} from "@/types/reading-listening";
import { grammarLabel, posLabel } from "./reading-gloss.i18n";

export interface WordGlossCopy {
  loading: string;
  missing: string;
  listen: string;
  lemma: string;
}

interface Palette {
  bg: string;
  surface: string;
  ink: string;
  sub: string;
  line: string;
  sage: string;
  sageSoft: string;
  sageDark: string;
}

/**
 * 단어를 눌렀을 때 뜨는 작은 뜻보기.
 *
 * 핵심 어휘 패널(예문·노트까지 있는 큰 화면)과 일부러 다르게 만들었다.
 * 저건 "이건 외워라" 고 이건 "막혔으니 잠깐 본다" 다. 읽던 흐름을 끊지 않는 게
 * 제일 중요해서 화면을 덮지 않고 아래에 얕게 뜬다.
 */
export function WordGlossSheet({
  word,
  gloss,
  loading,
  lang,
  copy,
  palette,
  onSpeak,
  onClose,
}: {
  word: string;
  gloss: ReadingWordGloss | null;
  loading: boolean;
  lang: ReadingLanguage;
  copy: WordGlossCopy;
  palette: Palette;
  onSpeak: (text: string) => void;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  const s = styles(palette);

  const meaning = gloss?.meaning?.[lang]?.trim() || gloss?.meaning?.en?.trim();
  const note = gloss?.note?.[lang]?.trim() || "";
  const tags = (gloss?.grammar ?? [])
    .map((tag) => grammarLabel(tag, lang))
    .filter(Boolean);
  const pos = gloss ? posLabel(gloss.pos, lang) : "";
  // 활용형이면 기본형이 진짜 정보다. 같은 형태면 굳이 두 번 보여주지 않는다
  const showLemma = !!gloss?.lemma && gloss.lemma !== word;

  return (
    <>
      {/* 바깥을 누르면 닫힌다. 읽던 흐름을 끊지 않으려고 화면을 어둡게 덮지 않는다 */}
      <Pressable style={s.backdrop} onPress={onClose} />
      <Animated.View
        entering={FadeInDown.duration(200)}
        style={[s.sheet, { paddingBottom: insets.bottom + 14 }]}
      >
        <View style={s.handle} />

        <View style={s.headRow}>
          <View style={s.headCopy}>
            <Text style={s.word}>{word}</Text>
            {showLemma && (
              <Text style={s.lemma}>
                {copy.lemma} {gloss!.lemma}
              </Text>
            )}
          </View>
          <Pressable
            onPress={() => onSpeak(gloss?.lemma || word)}
            style={s.speakBtn}
            hitSlop={8}
            accessibilityLabel={copy.listen}
          >
            <Ionicons name="volume-medium" size={19} color={palette.sageDark} />
          </Pressable>
        </View>

        {loading ? (
          <View style={s.loadingRow}>
            <ActivityIndicator size="small" color={palette.sageDark} />
            <Text style={s.loadingText}>{copy.loading}</Text>
          </View>
        ) : meaning ? (
          <Animated.View entering={FadeIn.duration(160)} style={s.body}>
            <Text style={s.meaning}>{meaning}</Text>

            {(tags.length > 0 || !!pos) && (
              <View style={s.tagRow}>
                {!!pos && (
                  <View style={[s.tag, s.posTag]}>
                    <Text style={[s.tagText, s.posTagText]}>{pos}</Text>
                  </View>
                )}
                {tags.map((tag) => (
                  <View key={tag} style={s.tag}>
                    <Text style={s.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}

            {!!note && <Text style={s.note}>{note}</Text>}
          </Animated.View>
        ) : (
          <Text style={s.missing}>{copy.missing}</Text>
        )}
      </Animated.View>
    </>
  );
}

const styles = (palette: Palette) =>
  StyleSheet.create({
    backdrop: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    sheet: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: palette.bg,
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      borderTopWidth: 1,
      borderColor: palette.line,
      paddingHorizontal: 20,
      paddingTop: 10,
      gap: 10,
      // 얕게 뜨는 느낌. 화면을 덮는 모달이 아니다
      shadowColor: "#000",
      shadowOpacity: 0.14,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: -6 },
      elevation: 12,
    },
    handle: {
      alignSelf: "center",
      width: 38,
      height: 4,
      borderRadius: 2,
      backgroundColor: palette.line,
      marginBottom: 4,
    },

    headRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    headCopy: { flex: 1, gap: 2 },
    word: { fontSize: 22, fontWeight: "900", color: palette.ink },
    lemma: { fontSize: 13, fontWeight: "700", color: palette.sub },
    speakBtn: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: palette.sageSoft,
    },

    loadingRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
      paddingVertical: 8,
    },
    loadingText: { fontSize: 14, fontWeight: "700", color: palette.sub },

    body: { gap: 10 },
    meaning: {
      fontSize: 17,
      lineHeight: 24,
      fontWeight: "800",
      color: palette.ink,
    },

    tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
    tag: {
      backgroundColor: palette.surface,
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 8,
      paddingHorizontal: 9,
      paddingVertical: 5,
    },
    tagText: { fontSize: 12, fontWeight: "800", color: palette.sub },
    posTag: { backgroundColor: palette.sageSoft, borderColor: palette.sage },
    posTagText: { color: palette.sageDark },

    note: {
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "600",
      color: palette.sub,
    },
    missing: {
      fontSize: 14,
      fontWeight: "700",
      color: palette.sub,
      paddingVertical: 8,
    },
  });
