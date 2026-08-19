import type { ComponentProps } from "react";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";
import type { ThemeColors } from "@/constants/theme";
import { expressionPackThemeByCode } from "@/constants/expression-packs";
import { useTheme } from "@/hooks/useTheme";
import { ExpressionService } from "@/services/expression.service";
import type {
  ExpressionOverview,
  ExpressionPackSummary,
} from "@/types/expression";
import * as Haptics from "@/utils/haptics";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

const DEFAULT_SECTION = 1;
const DEFAULT_UNIT = 1;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function PackCard({
  pack,
  index,
  onPress,
}: {
  pack: ExpressionPackSummary;
  index: number;
  onPress: () => void;
}) {
  const { t } = useTranslation();
  const packTheme = expressionPackThemeByCode(pack.code);
  const [imageFailed, setImageFailed] = useState(false);
  const pressed = useSharedValue(0);
  const progress = pack.count ? pack.viewed / pack.count : 0;
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: pressed.value * 2 },
      { scale: 1 - pressed.value * 0.018 },
    ],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(180 + index * 55).duration(380)}
      style={styles.packCell}
    >
      <AnimatedPressable
        accessibilityRole="button"
        onPressIn={() => {
          pressed.value = withTiming(1, { duration: 80 });
        }}
        onPressOut={() => {
          pressed.value = withTiming(0, { duration: 120 });
        }}
        onPress={onPress}
        style={[
          styles.packCard,
          {
            backgroundColor: packTheme.background,
            borderColor: "rgba(255,255,255,0.72)",
          },
          animatedStyle,
        ]}
      >
        <View style={styles.packTopRow}>
          <View style={[styles.packIcon, { backgroundColor: packTheme.accent }]}>
            <Ionicons name={packTheme.icon} size={19} color="#FFFFFF" />
          </View>
          {pack.media.imageUrl && !imageFailed ? (
            <Image
              source={{ uri: pack.media.imageUrl }}
              accessibilityLabel={pack.media.imageAlt || pack.title}
              contentFit="contain"
              transition={180}
              onError={() => setImageFailed(true)}
              style={styles.packMediaImage}
            />
          ) : pack.media.emoji ? (
            <Text style={styles.packEmoji}>{pack.media.emoji}</Text>
          ) : (
            <Ionicons
              name={packTheme.icon}
              size={27}
              color={packTheme.accentDark}
            />
          )}
        </View>

        <Text style={styles.packTitle} numberOfLines={2}>
          {pack.title}
        </Text>
        <Text style={styles.packDescription} numberOfLines={2}>
          {pack.description}
        </Text>

        <View style={styles.packFooter}>
          <Text style={[styles.packCount, { color: packTheme.accentDark }]}>
            {t("expressionHub.expressionCount", { count: pack.count })}
          </Text>
          <View style={styles.packProgressTrack}>
            <View
              style={[
                styles.packProgressFill,
                {
                  width: `${progress * 100}%`,
                  backgroundColor: packTheme.accent,
                },
              ]}
            />
          </View>
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
}

function QuickCard({
  icon,
  iconColor,
  iconBackground,
  title,
  value,
  description,
  theme,
}: {
  icon: IoniconName;
  iconColor: string;
  iconBackground: string;
  title: string;
  value: string;
  description: string;
  theme: ThemeColors;
}) {
  return (
    <View
      style={[
        styles.quickCard,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <View style={[styles.quickIcon, { backgroundColor: iconBackground }]}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <View style={styles.quickContent}>
        <Text style={[styles.quickTitle, { color: theme.textSecondary }]}>
          {title}
        </Text>
        <Text style={[styles.quickValue, { color: theme.text }]}>{value}</Text>
        <Text
          style={[styles.quickDescription, { color: theme.textSecondary }]}
          numberOfLines={2}
        >
          {description}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
    </View>
  );
}

export default function Expressions() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [overview, setOverview] = useState<ExpressionOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const continuePack = overview?.packs.find(
    (pack) => pack.code === overview.continuePackCode,
  );
  const continueProgress = continuePack?.count
    ? continuePack.viewed / continuePack.count
    : 0;

  const loadOverview = useCallback(async () => {
    setLoading(true);
    setLoadFailed(false);
    try {
      setOverview(
        await ExpressionService.getOverview(DEFAULT_SECTION, DEFAULT_UNIT),
      );
    } catch {
      setOverview(null);
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadOverview();
  }, [i18n.resolvedLanguage, loadOverview]);

  const openPack = (packId: string) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/expression-pack",
      params: {
        pack: packId,
        section: String(DEFAULT_SECTION),
        unit: String(DEFAULT_UNIT),
      },
    });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.bg, paddingTop: insets.top },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={t("common.back")}
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
          hitSlop={10}
          style={[styles.headerButton, { backgroundColor: theme.surface }]}
        >
          <Ionicons name="chevron-back" size={25} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {t("expressionHub.title")}
          </Text>
          <Text
            style={[styles.headerSubtitle, { color: theme.textSecondary }]}
            numberOfLines={1}
          >
            {t("expressionHub.subtitle")}
          </Text>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={t("expressionHub.savedTitle")}
          activeOpacity={0.8}
          style={[styles.headerButton, { backgroundColor: theme.surface }]}
        >
          <Ionicons name="bookmark-outline" size={22} color="#776EE2" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 36 },
        ]}
      >
        <Animated.View entering={FadeInDown.duration(320)}>
          <TouchableOpacity
            activeOpacity={0.84}
            onPress={() => void Haptics.selectionAsync()}
            style={[
              styles.scopeCard,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <View style={styles.scopeLeft}>
              <View style={styles.scopeIcon}>
                <Ionicons name="layers-outline" size={18} color="#776EE2" />
              </View>
              <View>
                <Text
                  style={[styles.scopeLabel, { color: theme.textSecondary }]}
                >
                  {t("expressionHub.currentRange")}
                </Text>
                <Text style={[styles.scopeValue, { color: theme.text }]}>
                  {t("expressionHub.range", {
                    section: DEFAULT_SECTION,
                    unit: DEFAULT_UNIT,
                  })}
                </Text>
              </View>
            </View>
            <View style={styles.scopeChange}>
              <Text style={styles.scopeChangeText}>
                {t("expressionHub.change")}
              </Text>
              <Ionicons name="chevron-down" size={15} color="#776EE2" />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {loading ? (
          <View
            style={[
              styles.stateCard,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <ActivityIndicator size="small" color={theme.primary} />
            <Text style={[styles.stateText, { color: theme.textSecondary }]}>
              {t("expressionHub.loading")}
            </Text>
          </View>
        ) : loadFailed ? (
          <TouchableOpacity
            activeOpacity={0.84}
            onPress={() => void loadOverview()}
            style={[
              styles.stateCard,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Ionicons name="refresh" size={22} color={theme.primary} />
            <Text style={[styles.stateText, { color: theme.text }]}>
              {t("expressionHub.loadFailed")}
            </Text>
          </TouchableOpacity>
        ) : continuePack ? (
          <Animated.View entering={FadeInDown.delay(60).duration(360)}>
            <LinearGradient
              colors={["#39BFAE", "#746CE2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.continueCard}
            >
              <View style={styles.heroGlowTop} />
              <View style={styles.heroGlowBottom} />
              <View style={styles.continueContent}>
                <View style={styles.continueEyebrow}>
                  <Ionicons name="sparkles" size={13} color="#FFFFFF" />
                  <Text style={styles.continueEyebrowText}>
                    {t("expressionHub.continueEyebrow")}
                  </Text>
                </View>
                <Text style={styles.continueTitle} numberOfLines={2}>
                  {continuePack.title}
                </Text>
                <Text style={styles.continueDescription} numberOfLines={2}>
                  {t("expressionHub.continueDescription")}
                </Text>

                <View style={styles.heroProgressRow}>
                  <Text style={styles.heroProgressText}>
                    {t("expressionHub.packProgress", {
                      done: continuePack.viewed,
                      total: continuePack.count,
                    })}
                  </Text>
                  <Text style={styles.heroProgressPercent}>
                    {Math.round(continueProgress * 100)}%
                  </Text>
                </View>
                <View style={styles.heroProgressTrack}>
                  <View
                    style={[
                      styles.heroProgressFill,
                      { width: `${continueProgress * 100}%` },
                    ]}
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.86}
                  onPress={() => openPack(continuePack.code)}
                  style={styles.continueButton}
                >
                  <Text style={styles.continueButtonText}>
                    {continuePack.viewed
                      ? t("expressionHub.continueButton")
                      : t("expressionHub.startButton")}
                  </Text>
                  <Ionicons name="arrow-forward" size={18} color="#635BCF" />
                </TouchableOpacity>
              </View>
              <HaneulmonMascot
                size={132}
                mood="confident"
                style={styles.heroMascot}
              />
            </LinearGradient>
          </Animated.View>
        ) : (
          <View
            style={[
              styles.stateCard,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Ionicons
              name="chatbubbles-outline"
              size={24}
              color={theme.textSecondary}
            />
            <Text style={[styles.stateText, { color: theme.textSecondary }]}>
              {t("expressionHub.empty")}
            </Text>
          </View>
        )}

        <Animated.View
          entering={FadeInDown.delay(110).duration(360)}
          style={styles.quickRow}
        >
          <QuickCard
            icon="refresh-circle"
            iconColor="#D27A1B"
            iconBackground="#FFF0D8"
            title={t("expressionHub.reviewTitle")}
            value={t("expressionHub.reviewCount", {
              count: overview?.summary.due ?? 0,
            })}
            description={t("expressionHub.reviewDescription")}
            theme={theme}
          />
          <QuickCard
            icon="bookmark"
            iconColor="#6259CF"
            iconBackground="#ECE9FF"
            title={t("expressionHub.savedTitle")}
            value={t("expressionHub.savedCount", {
              count: overview?.summary.saved ?? 0,
            })}
            description={t("expressionHub.savedDescription")}
            theme={theme}
          />
        </Animated.View>

        <View style={styles.sectionHeading}>
          <View style={styles.sectionHeadingText}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t("expressionHub.situationTitle")}
            </Text>
            <Text
              style={[styles.sectionSubtitle, { color: theme.textSecondary }]}
            >
              {t("expressionHub.situationDescription")}
            </Text>
          </View>
          <View
            style={[styles.packTotalBadge, { backgroundColor: theme.surface }]}
          >
            <Text
              style={[styles.packTotalText, { color: theme.textSecondary }]}
            >
              {t("expressionHub.packCount", {
                count: overview?.packs.length ?? 0,
              })}
            </Text>
          </View>
        </View>

        <View style={styles.packGrid}>
          {(overview?.packs ?? []).map((pack, index) => (
            <PackCard
              key={pack.id}
              pack={pack}
              index={index}
              onPress={() => openPack(pack.code)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1C1750",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  headerText: { flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: "900", letterSpacing: -0.4 },
  headerSubtitle: { fontSize: 12.5, fontWeight: "600", marginTop: 2 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 6 },
  scopeCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 12,
  },
  scopeLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  scopeIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#EEEBFF",
    alignItems: "center",
    justifyContent: "center",
  },
  scopeLabel: { fontSize: 10.5, fontWeight: "700" },
  scopeValue: { fontSize: 14, fontWeight: "800", marginTop: 2 },
  scopeChange: { flexDirection: "row", alignItems: "center", gap: 2 },
  scopeChangeText: { color: "#776EE2", fontSize: 12.5, fontWeight: "800" },
  stateCard: {
    minHeight: 132,
    borderWidth: 1,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 20,
  },
  stateText: { fontSize: 13, lineHeight: 19, fontWeight: "700" },
  continueCard: {
    minHeight: 246,
    borderRadius: 26,
    padding: 20,
    overflow: "hidden",
    shadowColor: "#5148B8",
    shadowOpacity: 0.24,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 7,
  },
  heroGlowTop: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "rgba(255,255,255,0.13)",
    right: -64,
    top: -82,
  },
  heroGlowBottom: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255,255,255,0.08)",
    left: -76,
    bottom: -88,
  },
  continueContent: { width: "66%", zIndex: 2 },
  continueEyebrow: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 99,
  },
  continueEyebrowText: {
    color: "#FFFFFF",
    fontSize: 10.5,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  continueTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "900",
    letterSpacing: -0.5,
    marginTop: 12,
  },
  continueDescription: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: "600",
    marginTop: 5,
  },
  heroProgressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 13,
  },
  heroProgressText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
  heroProgressPercent: { color: "#FFFFFF", fontSize: 11, fontWeight: "900" },
  heroProgressTrack: {
    height: 6,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.22)",
    marginTop: 6,
    overflow: "hidden",
  },
  heroProgressFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },
  continueButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 14,
  },
  continueButtonText: { color: "#635BCF", fontSize: 13, fontWeight: "900" },
  heroMascot: {
    position: "absolute",
    right: -2,
    bottom: 2,
  },
  quickRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  quickCard: {
    flex: 1,
    minHeight: 126,
    borderWidth: 1,
    borderRadius: 20,
    padding: 13,
    alignItems: "flex-start",
  },
  quickIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },
  quickContent: { flex: 1, width: "100%" },
  quickTitle: { fontSize: 11, fontWeight: "700" },
  quickValue: { fontSize: 20, fontWeight: "900", marginTop: 2 },
  quickDescription: {
    fontSize: 10.5,
    lineHeight: 15,
    fontWeight: "600",
    marginTop: 3,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 26,
    marginBottom: 13,
    paddingHorizontal: 2,
  },
  sectionHeadingText: { flex: 1, paddingRight: 12 },
  sectionTitle: { fontSize: 21, fontWeight: "900", letterSpacing: -0.35 },
  sectionSubtitle: { fontSize: 12.5, fontWeight: "600", marginTop: 4 },
  packTotalBadge: { paddingHorizontal: 9, paddingVertical: 5, borderRadius: 99 },
  packTotalText: { fontSize: 10.5, fontWeight: "800" },
  packGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  packCell: { width: "48.3%" },
  packCard: {
    minHeight: 188,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderRadius: 22,
    padding: 14,
  },
  packTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 38,
  },
  packIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  packEmoji: { fontSize: 27 },
  packMediaImage: { width: 38, height: 38 },
  packTitle: {
    color: "#25233A",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
    letterSpacing: -0.2,
    marginTop: 12,
  },
  packDescription: {
    color: "#686579",
    fontSize: 10.5,
    lineHeight: 15,
    fontWeight: "600",
    marginTop: 4,
  },
  packFooter: { marginTop: "auto", paddingTop: 13 },
  packCount: { fontSize: 10.5, fontWeight: "800", marginBottom: 7 },
  packProgressTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.72)",
    overflow: "hidden",
  },
  packProgressFill: { height: "100%", borderRadius: 3 },
});
