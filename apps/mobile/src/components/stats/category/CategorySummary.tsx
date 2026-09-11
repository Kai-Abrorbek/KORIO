import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { StudyCategory } from "@/types/stats";
import { CATEGORY_COLORS } from "@/constants/stats";
import StatsCard from "../shared/StatsCard";

interface Props {
  category: StudyCategory;
  trophyLevel: number | null;
  totalProblems: number;
  todayTime: string;
  totalTime: string;
}

/**
 * 학습별 요약.
 *
 * 예전엔 트로피 카드 + 학습시간 카드, 두 장에 걸쳐 "라벨 ─── 값" 이 네 줄
 * 나열돼 있었다. 세로로 길기만 하고 눈에 걸리는 게 없어서, 보러 온 사람이
 * 아무것도 안 보고 지나갔다. 같은 숫자 넷을 타일로 묶고 분야 색을 입혔다.
 */
export default function CategorySummary({
  category,
  trophyLevel,
  totalProblems,
  todayTime,
  totalTime,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const color = CATEGORY_COLORS[category];

  const tiles: {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    tint: string;
    label: string;
    value: string;
  }[] = [
    {
      id: "trophy",
      icon: "trophy",
      tint: "#F4B860",
      label: t("stats.categoryTrophy", {
        category: t(`stats.category.${category}`),
      }),
      value: trophyLevel == null ? "--" : String(trophyLevel),
    },
    {
      id: "problems",
      icon: "star",
      tint: "#7DC3F8",
      label: t("stats.totalProblems"),
      value: String(totalProblems),
    },
    {
      id: "today",
      icon: "time",
      tint: "#F7A8C0",
      label: t("stats.todayStudyTime"),
      value: todayTime,
    },
    {
      id: "total",
      icon: "hourglass",
      tint: color,
      label: t("stats.totalStudyTime"),
      value: totalTime,
    },
  ];

  return (
    <StatsCard style={s.card}>
      <View style={[s.accent, { backgroundColor: color }]} />
      <View style={s.grid}>
        {tiles.map((tile, i) => (
          <Animated.View
            key={tile.id}
            entering={FadeInDown.delay(i * 55).duration(300)}
            style={s.tile}
          >
            <View style={[s.iconChip, { backgroundColor: tile.tint + "22" }]}>
              <Ionicons name={tile.icon} size={15} color={tile.tint} />
            </View>
            <Text style={s.value} numberOfLines={1}>
              {tile.value}
            </Text>
            <Text style={s.label} numberOfLines={2}>
              {tile.label}
            </Text>
          </Animated.View>
        ))}
      </View>
    </StatsCard>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    card: { paddingTop: 0 },
    accent: {
      // 카드 위쪽 끝까지 색을 물린다. overflow:hidden 을 쓰면 카드 그림자까지
      // 같이 잘려서, 모서리를 직접 둥글린다
      height: 4,
      marginHorizontal: -18,
      marginBottom: 16,
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      rowGap: 18,
    },
    tile: { width: "50%", paddingRight: 10 },
    iconChip: {
      width: 28,
      height: 28,
      borderRadius: 9,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,
    },
    value: {
      fontSize: 22,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -0.5,
    },
    label: {
      fontSize: 11.5,
      fontWeight: "700",
      color: theme.textSecondary,
      marginTop: 2,
      lineHeight: 15,
    },
  });
