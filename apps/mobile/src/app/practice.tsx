import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import MistakesModal from "@/components/practice/MistakesModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LessonService } from "@/services/lesson.service";

type SkillIcon = {
  key: string;
  label: string;
  /** 이 스킬이 무엇인지 한 줄. 아이콘만 있으면 뭘 누르는지 모른다 */
  hint: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  onPress?: () => void;
  ready: boolean;
  /** 지금 할 게 몇 개 남았는지. 숫자가 보여야 누른다 */
  badge?: number;
};

export default function PracticeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const s = styles(theme);

  const [showMistakes, setShowMistakes] = useState(false);

  /**
   * 오답·단어 개수를 실제로 받아온다.
   *
   * 예전엔 아이콘만 나열돼 있어서 "여기 할 게 있는지" 를 누르기 전에는 알 수
   * 없었다. 복습 화면에서 제일 중요한 정보는 **남은 개수**다 — 12개가 보이면
   * 누르고, 0개면 다른 걸 한다.
   */
  const [counts, setCounts] = useState<{ mistakes: number; words: number }>({
    mistakes: 0,
    words: 0,
  });
  useEffect(() => {
    let alive = true;
    void Promise.all([
      LessonService.getMistakes().catch(() => null),
      LessonService.getLearnedWords().catch(() => null),
    ]).then(([m, w]) => {
      if (!alive) return;
      setCounts({ mistakes: m?.count ?? 0, words: w?.count ?? 0 });
    });
    return () => {
      alive = false;
    };
  }, []);

  const goHome = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  /**
   * 예전엔 5개 중 3개가 ready:false 라 눌러도 **아무 일도 일어나지 않았다**
   * ("준비중은 무반응"). 그 사이에 말하기 학습 모드·읽기듣기·발음 연습·게임이
   * 다 생겼는데 이 화면만 그대로였다. 전부 실제 화면에 연결한다.
   */
  const skills: SkillIcon[] = [
    {
      key: "mistakes",
      label: t("practice.mistakes"),
      hint: t("practice.mistakesHint"),
      icon: "sync",
      color: "#FF9600",
      ready: true,
      badge: counts.mistakes,
      onPress: () => setShowMistakes(true),
    },
    {
      key: "words",
      label: t("practice.words"),
      hint: t("practice.wordsHint"),
      icon: "cards",
      color: "#1CB0F6",
      ready: true,
      badge: counts.words,
      onPress: () => router.push("/word-study"),
    },
    {
      key: "speaking",
      label: t("practice.speaking"),
      hint: t("practice.speakingHint"),
      icon: "microphone",
      color: "#2FBFA0",
      ready: true,
      onPress: () => router.push("/speaking"),
    },
    {
      key: "listening",
      label: t("practice.listening"),
      hint: t("practice.listeningHint"),
      icon: "headphones",
      color: "#FF6B6B",
      ready: true,
      onPress: () => router.push("/reading-listening-levels"),
    },
    {
      key: "pronunciation",
      label: t("practice.pronunciation"),
      hint: t("practice.pronunciationHint"),
      icon: "waveform",
      color: "#CE82FF",
      ready: true,
      onPress: () => router.push("/pronunciation-practice"),
    },
    {
      key: "games",
      label: t("practice.games"),
      hint: t("practice.gamesHint"),
      icon: "gamepad-variant",
      color: "#776EE2",
      ready: true,
      onPress: () => router.push("/games"),
    },
  ];

  const handleSkill = (sk: SkillIcon) => {
    if (sk.ready && sk.onPress) sk.onPress();
  };

  return (
    <View style={s.container}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
      >
        {/* 히어로도 함께 스크롤되어 아래 콘텐츠 영역을 가리지 않는다. */}
        <View style={[s.hero, { paddingTop: insets.top + 6 }]}>
          <View style={s.heroTop}>
            <TouchableOpacity onPress={goHome} hitSlop={10}>
              <Ionicons name="close" size={27} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={s.heroHeading}>
            <Text style={s.heroTitle}>{t("practice.title")}</Text>
            {/* 틀린 걸 다시 파는 자리라 집중한 표정 */}
            <HaneulmonMascot size={66} mood="focused" style={s.heroMascot} />
          </View>

          {/* 오답이 있으면 그걸 먼저 권한다. 복습 화면에 왔는데 제일 위에서
              발음 연습을 권하는 건 순서가 뒤집힌 것이다.
              (버튼이 console.log("comin soon") 이라 아무 일도 안 했다) */}
          <View style={s.heroCard}>
            <Text style={s.heroCardLabel}>
              {counts.mistakes > 0
                ? t("practice.mistakesCount", { n: counts.mistakes })
                : t("practice.perfectPronunciation")}
            </Text>
            <TouchableOpacity
              style={s.heroBtn}
              activeOpacity={0.9}
              onPress={() =>
                counts.mistakes > 0
                  ? setShowMistakes(true)
                  : router.push("/pronunciation-practice")
              }
            >
              <Text style={s.heroBtnText}>{t("practice.heroStart")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={s.content}>
          {/* 스킬 */}
          <Text style={s.sectionLabel}>{t("practice.skills")}</Text>
          {skills.map((sk) => (
            <TouchableOpacity
              key={sk.key}
              style={[s.skillRow, !sk.ready && s.skillRowDim]}
              activeOpacity={0.85}
              onPress={() => handleSkill(sk)}
            >
              <View style={s.skillTexts}>
                <View style={s.skillTitleRow}>
                  <Text style={s.skillLabel}>{sk.label}</Text>
                  {/* 남은 개수. 0 이면 안 띄운다 — "0" 은 누를 이유를 없앤다 */}
                  {sk.badge ? (
                    <View
                      style={[s.countBadge, { backgroundColor: sk.color }]}
                    >
                      <Text style={s.countText}>
                        {sk.badge > 99 ? "99+" : sk.badge}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <Text style={s.skillHint} numberOfLines={1}>
                  {sk.hint}
                </Text>
              </View>
              <View style={s.skillRight}>
                {!sk.ready && (
                  <View style={s.soonBadge}>
                    <Text style={s.soonText}>{t("practice.soon")}</Text>
                  </View>
                )}
                <View
                  style={[s.skillIcon, { backgroundColor: sk.color + "22" }]}
                >
                  <MaterialCommunityIcons
                    name={sk.icon}
                    size={28}
                    color={sk.color}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* 회화 */}
          <View style={s.convHead}>
            <Text style={s.sectionLabel}>{t("practice.conversation")}</Text>
            <View style={s.maxBadge}>
              <Text style={s.maxText}>MAX</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[s.skillRow, s.skillRowDim]}
            activeOpacity={0.85}
          >
            <Text style={s.skillLabel}>{t("practice.videoCall")}</Text>
            <View style={[s.skillIcon, { backgroundColor: "#CE82FF22" }]}>
              <MaterialCommunityIcons name="video" size={28} color="#CE82FF" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 모달 */}
      <MistakesModal
        visible={showMistakes}
        onClose={() => setShowMistakes(false)}
        theme={theme}
      />
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    scroll: { flex: 1 },
    scrollContent: { flexGrow: 1 },
    hero: {
      backgroundColor: "#1CB0F6",
      paddingHorizontal: 20,
      paddingBottom: 18,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    heroTop: {
      flexDirection: "row",
      justifyContent: "flex-start",
      marginBottom: 0,
    },
    heroHeading: {
      minHeight: 66,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 12,
    },
    heroMascot: { flexShrink: 0 },
    heroTitle: {
      flex: 1,
      fontSize: 26,
      fontWeight: "900",
      color: "#fff",
    },
    heroCard: {
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 15,
    },
    heroCardLabel: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 10,
    },
    heroBtn: {
      backgroundColor: "#1CB0F6",
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: "center",
      borderBottomWidth: 3,
      borderColor: "#1899D6",
    },
    heroBtnText: { color: "#fff", fontSize: 16, fontWeight: "900" },
    content: { padding: 20, paddingBottom: 40 },
    sectionLabel: {
      fontSize: 15,
      fontWeight: "800",
      color: theme.textSecondary,
      marginBottom: 14,
      marginTop: 4,
    },
    skillRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      // 듀오링고식 바텀보더 — 눌리는 물건처럼 보이게
      borderBottomWidth: 4,
      borderRadius: 18,
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginBottom: 14,
    },
    skillRowDim: { opacity: 0.85 },
    skillTexts: { flex: 1, gap: 3 },
    skillTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    skillLabel: { fontSize: 19, fontWeight: "800", color: theme.text },
    skillHint: { fontSize: 12, lineHeight: 18, color: theme.textSecondary },
    countBadge: {
      minWidth: 26,
      paddingHorizontal: 7,
      paddingVertical: 2,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    countText: { color: "#fff", fontSize: 12, fontWeight: "800" },
    skillRight: { flexDirection: "row", alignItems: "center", gap: 10 },
    skillIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    soonBadge: {
      backgroundColor: theme.border,
      borderRadius: 99,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    soonText: { fontSize: 12, fontWeight: "800", color: theme.textSecondary },
    convHead: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 12,
    },
    maxBadge: {
      backgroundColor: "#1A1A2E",
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderWidth: 2,
      borderColor: "#00E5FF",
      marginBottom: 14,
    },
    maxText: {
      fontSize: 13,
      fontWeight: "900",
      color: "#fff",
      fontStyle: "italic",
    },
  });
