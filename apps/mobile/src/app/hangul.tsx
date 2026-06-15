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
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { HANGUL_CHARACTERS, MOCK_PROGRESS } from "@/mocks/hangul.mock";
import {
  HangulCategory,
  HangulCharacter,
  HangulProgress,
} from "@/types/hangul";
import AmbientParticles from "@/components/hangul/AmbientParticles";
import MasteryCard from "@/components/hangul/MasteryCard";
import CategoryTabs from "@/components/hangul/CategoryTabs";
import CharacterCard from "@/components/hangul/CharacterCard";
import CharacterDetailSheet from "@/components/hangul/CharacterDetailSheet";
import GameMenu from "@/components/hangul/games/GameMenu";

export default function HangulScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme);

  const [category, setCategory] = useState<HangulCategory>("consonant");
  const [selected, setSelected] = useState<HangulCharacter | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [progress] = useState<HangulProgress[]>(MOCK_PROGRESS);

  const charactersByCategory = useMemo(
    () => HANGUL_CHARACTERS.filter((c) => c.category === category),
    [category],
  );

  const learnedCount = progress.filter((p) => p.mastery >= 2).length;
  const totalCount = HANGUL_CHARACTERS.length;

  const getMastery = (id: string): 0 | 1 | 2 | 3 => {
    return progress.find((p) => p.characterId === id)?.mastery ?? 0;
  };

  const openDetail = (character: HangulCharacter) => {
    setSelected(character);
    setSheetOpen(true);
  };

  const goToGame = () => {
    router.push({
      pathname: "/hangul-game",
      params: { category },
    });
  };

  return (
    <View style={styles.container}>
      <AmbientParticles count={12} />

      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{t("hangul.title")}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* 진행도 카드 */}
        <MasteryCard learned={learnedCount} total={totalCount} />

        {/* 탭 */}
        <CategoryTabs value={category} onChange={setCategory} />

        {/* 글자 그리드 */}
        <Animated.View
          key={category}
          entering={FadeIn.duration(250)}
          style={styles.grid}
        >
          {charactersByCategory.map((ch, idx) => (
            <CharacterCard
              key={ch.id}
              character={ch}
              mastery={getMastery(ch.id)}
              index={idx}
              onPress={() => openDetail(ch)}
            />
          ))}
        </Animated.View>
      </ScrollView>

      {/* FAB - 게임 시작 */}
      <GameMenu />

      {/* 디테일 시트 */}
      <CharacterDetailSheet
        character={selected}
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onStartGame={goToGame}
      />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      marginBottom: 30,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 54,
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -0.3,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      paddingHorizontal: 12,
    },
    fab: {
      position: "absolute",
      bottom: 24,
      right: 16,
      backgroundColor: "#776ee2",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 20,
      paddingVertical: 14,
      borderRadius: 28,
      borderBottomWidth: 4,
      borderColor: "#5448E0",
      shadowColor: "#776ee2",
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 10,
    },
    fabText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "900",
    },
  });
