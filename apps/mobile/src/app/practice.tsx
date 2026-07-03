import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import MistakesModal from "@/components/practice/MistakesModal";
import WordsModal from "@/components/practice/WordsModal";

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
  const s = styles(theme);

  const [showMistakes, setShowMistakes] = useState(false);
  const [showWords, setShowWords] = useState(false);

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
      onPress: () => setShowWords(true),
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
      {/* 히어로 */}
      <View style={s.hero}>
        <View style={s.heroTop}>
          <TouchableOpacity onPress={goHome} hitSlop={10}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={s.heroTitle}>{t("practice.title")}</Text>

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

      <ScrollView
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >
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
              <View style={[s.skillIcon, { backgroundColor: sk.color + "22" }]}>
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
      </ScrollView>

      {/* 모달 */}
      <MistakesModal
        visible={showMistakes}
        onClose={() => setShowMistakes(false)}
        theme={theme}
      />
      <WordsModal
        visible={showWords}
        onClose={() => setShowWords(false)}
        theme={theme}
      />
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    hero: {
      backgroundColor: "#1CB0F6",
      paddingTop: 50,
      paddingHorizontal: 20,
      paddingBottom: 24,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    heroTop: {
      flexDirection: "row",
      justifyContent: "flex-start",
      marginBottom: 8,
    },
    heroTitle: {
      fontSize: 30,
      fontWeight: "900",
      color: "#fff",
      marginBottom: 16,
    },
    heroCard: {
      backgroundColor: "#fff",
      borderRadius: 18,
      padding: 20,
    },
    heroCardLabel: {
      fontSize: 20,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 16,
    },
    heroBtn: {
      backgroundColor: "#1CB0F6",
      borderRadius: 14,
      paddingVertical: 16,
      alignItems: "center",
      borderBottomWidth: 4,
      borderColor: "#1899D6",
    },
    heroBtnText: { color: "#fff", fontSize: 17, fontWeight: "900" },
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
