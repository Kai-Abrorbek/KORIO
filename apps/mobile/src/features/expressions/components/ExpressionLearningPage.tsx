import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { expressionPackThemeByCode } from "@/constants/expression-packs";
import { useTheme } from "@/hooks/useTheme";
import type { ExpressionLearningQueueItem } from "../utils/expression-learning-queue";
import SpokenText from "./SpokenText";

interface Props {
  item: ExpressionLearningQueueItem;
  speaking: boolean;
  speechPlaying: boolean;
  speechProgress: number;
  onSpeak: () => void;
}

export default function ExpressionLearningPage({
  item,
  speaking,
  speechPlaying,
  speechProgress,
  onSpeak,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const expression = item.expression;
  const packTheme = expressionPackThemeByCode(expression.pack.code);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <LinearGradient
        colors={[theme.surface, packTheme.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.expressionCard,
          {
            borderColor: `${packTheme.accent}42`,
            shadowColor: theme.text,
          },
        ]}
      >
        <View style={styles.orbLarge} />
        <View style={styles.orbSmall} />

        <View style={styles.cardTopRow}>
          <View style={[styles.speechChip, { backgroundColor: theme.surface }]}>
            <Text
              style={[
                styles.speechChipText,
                { color: packTheme.accentDark },
              ]}
            >
              {t(`expressionPack.speechLevel.${expression.speechLevel}`)}
            </Text>
          </View>
        </View>

        <View style={styles.expressionRow}>
          <SpokenText
            text={expression.korean}
            progress={speechProgress}
            playing={speechPlaying}
            baseColor={theme.text}
            accentColor={packTheme.accent}
            style={[styles.korean, { color: theme.text }]}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("expressionLearning.listen")}
            onPress={onSpeak}
            style={[
              styles.speakerButton,
              {
                backgroundColor: speaking
                  ? packTheme.accent
                  : packTheme.background,
                borderColor: packTheme.accent,
              },
            ]}
          >
            <Ionicons
              name={speaking ? "volume-high" : "volume-medium-outline"}
              size={25}
              color={speaking ? "#FFFFFF" : packTheme.accentDark}
            />
          </Pressable>
        </View>

        {expression.pronunciation.romanization ? (
          <Text style={[styles.romanization, { color: theme.textSecondary }]}>
            {expression.pronunciation.romanization}
          </Text>
        ) : null}

        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <Text style={[styles.sectionLabel, { color: packTheme.accentDark }]}>
          {t("expressionLearning.meaning")}
        </Text>
        <Text style={[styles.meaning, { color: theme.text }]}>
          {expression.meaning}
        </Text>

        <View style={styles.infoGrid}>
          <View
            style={[
              styles.infoPanel,
              { backgroundColor: `${packTheme.background}D9` },
            ]}
          >
            <View style={styles.infoTitleRow}>
              <Ionicons
                name="person-outline"
                size={16}
                color={packTheme.accentDark}
              />
              <Text style={[styles.infoLabel, { color: packTheme.accentDark }]}>
                {t("expressionLearning.speaker")}
              </Text>
            </View>
            <Text style={[styles.infoText, { color: theme.text }]}>
              {expression.speaker || t("expressionLearning.anySpeaker")}
            </Text>
          </View>

          <View
            style={[
              styles.infoPanel,
              { backgroundColor: `${packTheme.background}D9` },
            ]}
          >
            <View style={styles.infoTitleRow}>
              <Ionicons
                name="location-outline"
                size={16}
                color={packTheme.accentDark}
              />
              <Text style={[styles.infoLabel, { color: packTheme.accentDark }]}>
                {t("expressionLearning.context")}
              </Text>
            </View>
            <Text style={[styles.infoText, { color: theme.text }]}>
              {expression.context}
            </Text>
          </View>
        </View>

        {expression.usageNote ? (
          <View
            style={[
              styles.notePanel,
              {
                backgroundColor: theme.surface,
                borderColor: `${packTheme.accent}50`,
              },
            ]}
          >
            <Ionicons
              name="sparkles-outline"
              size={18}
              color={packTheme.accentDark}
            />
            <View style={styles.noteCopy}>
              <Text style={[styles.noteLabel, { color: packTheme.accentDark }]}>
                {t("expressionLearning.usageNote")}
              </Text>
              <Text style={[styles.noteText, { color: theme.textSecondary }]}>
                {expression.usageNote}
              </Text>
            </View>
          </View>
        ) : null}
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  expressionCard: {
    minHeight: 430,
    borderRadius: 28,
    borderWidth: 1.5,
    padding: 18,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.09,
    shadowRadius: 18,
    elevation: 4,
  },
  orbLarge: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    right: -72,
    top: -92,
    backgroundColor: "rgba(255,255,255,0.38)",
  },
  orbSmall: {
    position: "absolute",
    width: 96,
    height: 96,
    borderRadius: 48,
    left: -38,
    bottom: -40,
    backgroundColor: "rgba(255,255,255,0.24)",
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 22,
  },
  speechChip: {
    minHeight: 29,
    borderRadius: 99,
    paddingHorizontal: 11,
    justifyContent: "center",
  },
  speechChipText: { fontSize: 10.5, fontWeight: "900" },
  expressionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  korean: {
    flex: 1,
    fontSize: 27,
    lineHeight: 38,
    fontWeight: "900",
    letterSpacing: -0.45,
  },
  speakerButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  romanization: { marginTop: 5, fontSize: 12.5, fontWeight: "600" },
  divider: { height: 1, marginVertical: 17 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  meaning: { marginTop: 5, fontSize: 20, lineHeight: 28, fontWeight: "800" },
  infoGrid: { marginTop: 16, gap: 10 },
  infoPanel: { borderRadius: 18, padding: 13 },
  infoTitleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  infoLabel: { fontSize: 11, fontWeight: "900" },
  infoText: { marginTop: 6, fontSize: 13.5, lineHeight: 20, fontWeight: "600" },
  notePanel: {
    marginTop: 12,
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 13,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
  },
  noteCopy: { flex: 1 },
  noteLabel: { fontSize: 11, fontWeight: "900" },
  noteText: { marginTop: 4, fontSize: 12.5, lineHeight: 18, fontWeight: "600" },
});
