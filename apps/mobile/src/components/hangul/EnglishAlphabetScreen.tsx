import { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import {
  ENGLISH_ALPHABET,
  type EnglishLetter,
} from "@/constants/english-alphabet";
import type { HangulCategory } from "@/types/hangul";
import AmbientParticles from "./AmbientParticles";
import CategoryTabs from "./CategoryTabs";
import CharacterCard from "./CharacterCard";
import CharacterDetailSheet from "./CharacterDetailSheet";

export default function EnglishAlphabetScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const [category, setCategory] = useState<HangulCategory | "all">("all");
  const [selected, setSelected] = useState<EnglishLetter | null>(null);

  const letters = useMemo(
    () =>
      ENGLISH_ALPHABET.filter(
        (letter) => category === "all" || letter.category === category,
      ),
    [category],
  );
  const detailCharacter = useMemo(
    () =>
      selected
        ? {
            ...selected,
            name:
              i18n.language.split("-")[0] === "ko"
                ? selected.koreanName
                : selected.name,
          }
        : null,
    [selected, i18n.language],
  );

  return (
    <View style={[s.container, { paddingTop: insets.top + 12 }]}>
      <AmbientParticles count={12} />
      <View style={s.header}>
        <TouchableOpacity
          accessibilityLabel={t("common.back")}
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/courses")
          }
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.title}>{t("alphabet.title")}</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 36 }}
      >
        <View style={s.intro}>
          <Text style={s.count}>{t("alphabet.courseCount")}</Text>
          <Text style={s.hint}>{t("alphabet.intro")}</Text>
        </View>
        <CategoryTabs value={category} onChange={setCategory} includeAll />
        <Animated.View
          key={category}
          entering={FadeIn.duration(250)}
          style={s.grid}
        >
          {letters.map((letter, index) => (
            <CharacterCard
              key={letter.id}
              character={letter}
              mastery={0}
              showMastery={false}
              index={index}
              onPress={() => setSelected(letter)}
            />
          ))}
        </Animated.View>
        <Text style={[s.hint, s.note]}>{t("alphabet.soundsNote")}</Text>
      </ScrollView>
      <CharacterDetailSheet
        character={detailCharacter}
        visible={!!selected}
        onClose={() => setSelected(null)}
        speechLanguage="en-US"
        speechText={selected?.uppercase}
        pronunciationHint={t("alphabet.nameNote")}
      />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    title: { fontSize: 20, fontWeight: "900", color: theme.text },
    intro: { marginHorizontal: 20, marginBottom: 20, gap: 10 },
    count: { fontSize: 22, fontWeight: "800", color: theme.text },
    hint: { fontSize: 14, lineHeight: 21, color: theme.textSecondary },
    grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 12 },
    note: { marginHorizontal: 20, marginTop: 18 },
  });
