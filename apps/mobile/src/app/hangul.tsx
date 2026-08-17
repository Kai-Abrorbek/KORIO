import { useCallback, useMemo, useState } from "react";
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
import { useFocusEffect, useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { HANGUL_CHARACTERS } from "@/constants/hangul";
import { HangulCategory, HangulCharacter } from "@/types/hangul";
import AmbientParticles from "@/components/hangul/AmbientParticles";
import MasteryCard from "@/components/hangul/MasteryCard";
import CategoryTabs from "@/components/hangul/CategoryTabs";
import CharacterCard from "@/components/hangul/CharacterCard";
import CharacterDetailSheet from "@/components/hangul/CharacterDetailSheet";
import GameMenu from "@/components/hangul/games/GameMenu";
import { useEnergyStore } from "@/store/energy.store";
import { useAuthStore } from "@/store/auth.store";
import { UserService } from "@/services/user.service";
import { HangulMastery, HangulService } from "@/services/hangul.service";

export default function HangulScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme);
  const guardLessonStart = useEnergyStore((s) => s.guardLessonStart);
  const energy = useAuthStore((s) => s.user?.energy ?? 0);
  const [category, setCategory] = useState<HangulCategory>("consonant");
  const [selected, setSelected] = useState<HangulCharacter | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [masteryMap, setMasteryMap] = useState<Record<string, HangulMastery>>(
    {},
  );
  const [learnedCount, setLearnedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(HANGUL_CHARACTERS.length);
  const [finishing, setFinishing] = useState(false);

  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);
  // 한글을 못 읽는다고 답했고 아직 안 끝낸 유저에게만 완료 버튼을 보여준다
  const needsHangulNode =
    user?.hangulLevel === "none" && !user?.hangulCompletedAt;

  const finishHangul = async () => {
    if (finishing) return;
    setFinishing(true);
    try {
      const res = await UserService.completeHangul();
      updateUser({ hangulCompletedAt: res.hangulCompletedAt });
      router.replace("/roadmap");
    } catch {
      setFinishing(false);
    }
  };

  // 게임 하고 돌아올 때마다 다시 읽어서 mastery 를 갱신한다.
  // deps 를 비우려고 store 는 getState() 로 직접 읽는다 (user 바뀔 때마다 재요청 방지).
  useFocusEffect(
    useCallback(() => {
      let alive = true;
      HangulService.getProgress()
        .then((res) => {
          if (!alive) return;
          const map: Record<string, HangulMastery> = {};
          res.progress.forEach((p) => {
            map[p.characterId] = p.mastery;
          });
          setMasteryMap(map);
          setLearnedCount(res.learnedCount);
          setTotalCount(res.total || HANGUL_CHARACTERS.length);

          // 게임 중에 40자를 다 채워 서버가 노드를 자동 완료했으면 store 도 맞춰준다
          const store = useAuthStore.getState();
          if (res.hangulCompletedAt && !store.user?.hangulCompletedAt) {
            store.updateUser({ hangulCompletedAt: res.hangulCompletedAt });
          }
        })
        .catch(() => {});
      return () => {
        alive = false;
      };
    }, []),
  );

  const charactersByCategory = useMemo(
    () => HANGUL_CHARACTERS.filter((c) => c.category === category),
    [category],
  );

  const getMastery = (id: string): HangulMastery => masteryMap[id] ?? 0;

  const openDetail = (character: HangulCharacter) => {
    setSelected(character);
    setSheetOpen(true);
  };

  const goToGame = () => {
    guardLessonStart(energy, () => {
      router.push({ pathname: "/hangul-game", params: { category } });
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

        {/* 40자를 다 익히면 서버가 알아서 노드를 닫는다.
            이미 한글을 아는 유저가 게임을 다 돌지 않고 넘어갈 수 있게 수동 버튼도 남겨둔다. */}
        {needsHangulNode && (
          <TouchableOpacity
            style={styles.doneBtn}
            activeOpacity={0.9}
            onPress={finishHangul}
            disabled={finishing}
          >
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.doneBtnText}>{t("hangul.markDone")}</Text>
          </TouchableOpacity>
        )}

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
    doneBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginHorizontal: 20,
      marginTop: 14,
      paddingVertical: 15,
      borderRadius: 14,
      backgroundColor: theme.primary,
    },
    doneBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
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
