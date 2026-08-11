/**
 * 게임 모음.
 *
 * 게임들이 라우트만 있고 들어갈 문이 없었다. 여기로 모은다.
 * 한글 게임은 한글 학습 화면에 그대로 두고, 여기선 안내만 한다.
 */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "@/utils/haptics";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { GAMES, type GameItem } from "@/constants/games";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";

type Styles = ReturnType<typeof getStyles>;

export default function GamesScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);

  return (
    <View style={[s.container, { paddingTop: insets.top + 4 }]}>
      <View style={s.header}>
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{t("games.title")}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.intro}>
          <HaneulmonMascot size={72} mood="great" />
          <Text style={s.introText}>{t("games.subtitle")}</Text>
        </View>

        {GAMES.map((g, i) => (
          <GameCard key={g.id} game={g} index={i} s={s} t={t} />
        ))}

        {/* 한글 게임은 한글 화면에 있다. 여기서 찾다가 헤매지 않게 안내 */}
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push("/hangul");
          }}
          style={({ pressed }) => [s.hangulCard, pressed && { opacity: 0.7 }]}
        >
          <View style={s.hangulIcon}>
            <Text style={s.hangulIconText}>가</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.hangulTitle}>{t("games.hangulTitle")}</Text>
            <Text style={s.hangulDesc}>{t("games.hangulDesc")}</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.textSecondary}
          />
        </Pressable>
      </ScrollView>
    </View>
  );
}

function GameCard({
  game,
  index,
  s,
  t,
}: {
  game: GameItem;
  index: number;
  s: Styles;
  t: (k: string) => string;
}) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 80).duration(380)}>
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.push(game.route as any);
        }}
        style={({ pressed }) => [
          s.cardWrap,
          pressed && { transform: [{ translateY: 2 }] },
        ]}
      >
        <LinearGradient
          colors={game.colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.card}
        >
          <View style={s.cardIcon}>
            <Ionicons name={game.icon as any} size={26} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.cardTitle}>{t(`games.items.${game.id}.name`)}</Text>
            <Text style={s.cardDesc}>{t(`games.items.${game.id}.desc`)}</Text>
          </View>
          <View style={s.playBtn}>
            <Ionicons name="play" size={18} color="#fff" />
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    headerTitle: { fontSize: 22, fontWeight: "700", color: theme.text },

    intro: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 12,
      marginBottom: 6,
    },
    introText: {
      flex: 1,
      fontSize: 14,
      lineHeight: 21,
      fontWeight: "600",
      color: theme.textSecondary,
    },

    cardWrap: { marginBottom: 14 },
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      borderRadius: 20,
      padding: 18,
      // 듀오링고식 입체감
      borderBottomWidth: 4,
      borderBottomColor: "rgba(0,0,0,0.22)",
    },
    cardIcon: {
      width: 50,
      height: 50,
      borderRadius: 16,
      backgroundColor: "rgba(255,255,255,0.22)",
      alignItems: "center",
      justifyContent: "center",
    },
    cardTitle: { fontSize: 17, fontWeight: "800", color: "#fff" },
    cardDesc: {
      fontSize: 13,
      fontWeight: "500",
      color: "rgba(255,255,255,0.85)",
      marginTop: 3,
      lineHeight: 18,
    },
    playBtn: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: "rgba(255,255,255,0.25)",
      alignItems: "center",
      justifyContent: "center",
    },

    hangulCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 18,
      padding: 16,
      marginTop: 8,
    },
    hangulIcon: {
      width: 46,
      height: 46,
      borderRadius: 14,
      backgroundColor: "#EBE5FA",
      alignItems: "center",
      justifyContent: "center",
    },
    hangulIconText: { fontSize: 22, fontWeight: "800", color: "#7E57C2" },
    hangulTitle: { fontSize: 16, fontWeight: "800", color: theme.text },
    hangulDesc: {
      fontSize: 13,
      color: theme.textSecondary,
      fontWeight: "500",
      marginTop: 2,
      lineHeight: 18,
    },
  });
