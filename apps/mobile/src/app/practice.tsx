import { useState } from "react";
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

type SkillIcon = {
  key: string;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  onPress?: () => void;
  ready: boolean;
};

export default function PracticeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const s = styles(theme);

  const [showMistakes, setShowMistakes] = useState(false);

  const goHome = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  const skills: SkillIcon[] = [
    {
      key: "speaking",
      label: t("practice.speaking"),
      icon: "microphone",
      color: "#2FBFA0",
      ready: false,
    },
    {
      key: "listening",
      label: t("practice.listening"),
      icon: "headphones",
      color: "#FF6B6B",
      ready: false,
    },
    {
      key: "mistakes",
      label: t("practice.mistakes"),
      icon: "sync",
      color: "#FF9600",
      ready: true,
      onPress: () => setShowMistakes(true),
    },
    {
      key: "words",
      label: t("practice.words"),
      icon: "cards",
      color: "#1CB0F6",
      ready: true,
      onPress: () => router.push("/word-study"),
    },
    {
      key: "story",
      label: t("practice.story"),
      icon: "book-open-variant",
      color: "#CE82FF",
      ready: false,
    },
  ];

  const handleSkill = (sk: SkillIcon) => {
    if (sk.ready && sk.onPress) sk.onPress();
    // 준비중은 무반응 (또는 토스트)
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

          <View style={s.heroCard}>
            <Text style={s.heroCardLabel}>
              {t("practice.perfectPronunciation")}
            </Text>
            <TouchableOpacity
              style={s.heroBtn}
              activeOpacity={0.9}
              onPress={() => console.log("comin soon")}
            >
              <Text style={s.heroBtnText}>
                {t("practice.startXp", { xp: 20 })}
              </Text>
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
              <Text style={s.skillLabel}>{sk.label}</Text>
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
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 18,
      paddingVertical: 18,
      paddingHorizontal: 20,
      marginBottom: 14,
    },
    skillRowDim: { opacity: 0.85 },
    skillLabel: { fontSize: 20, fontWeight: "800", color: theme.text },
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
