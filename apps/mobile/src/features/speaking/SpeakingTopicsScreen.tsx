import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { Pressable } from "@/components/ui/Pressables";
import { Ionicons } from "@expo/vector-icons";
import { type Href, useFocusEffect, useRouter } from "expo-router";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useAuthHydrated } from "@/hooks/useAuthGuard";
import { useAuthStore } from "@/store/auth.store";
import { ExpressionService } from "@/services/expression.service";
import type {
  ExpressionPackSummary,
  ExpressionProficiency,
} from "@/types/expression";
import { useFeatureAccess } from "@/features/subscription/useFeatureAccess";
import { formatSpeaking, useSpeakingCopy } from "./copy";
import { useSpeakingPalette } from "./palette";
import { LinearGradient } from "expo-linear-gradient";
import { topicLookOf } from "./TopicIllustration";
import { topicSceneOf } from "./topicScenes";
import {
  useContentLang,
  getContentLang,
  useSettingsStore,
} from "@/store/settings.store";

const PROFICIENCY_LEVELS: ExpressionProficiency[] = [
  "beginner",
  "intermediate",
  "advanced",
];

type LoadState = {
  scope: string;
  phase: "loading" | "ready" | "error";
  packs: ExpressionPackSummary[];
};

export default function SpeakingTopicsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, fontScale } = useWindowDimensions();
  const { t } = useTranslation();
  const contentLang = useContentLang();
  const learnCourse = useSettingsStore((state) => state.learnCourse);
  const [selectedLevel, setSelectedLevel] =
    useState<ExpressionProficiency>("beginner");
  const proficiency = selectedLevel;
  const copy = useSpeakingCopy(learnCourse);
  const palette = useSpeakingPalette();
  const { canUse, requirePremium } = useFeatureAccess();
  const hydrated = useAuthHydrated();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userId = useAuthStore((state) => state.user?.id);
  const sessionToken = useAuthStore((state) => state.accessToken);
  const language = contentLang;
  const allowed = isLoggedIn && canUse("expression");
  const [query, setQuery] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const scope = `${userId ?? "guest"}:${language}:${learnCourse}:${proficiency ?? "all"}:${reloadKey}`;
  const [result, setResult] = useState<LoadState>({
    scope: "",
    phase: "loading",
    packs: [],
  });

  useFocusEffect(
    useCallback(() => {
      let active = true;
      if (!hydrated || !isLoggedIn) return;
      // Deep links must pass the same feature gate as the home shortcut.
      if (!allowed) {
        requirePremium("expression", () => undefined);
        return;
      }

      setResult({ scope, phase: "loading", packs: [] });
      const isCurrent = () => {
        const auth = useAuthStore.getState();
        return (
          active &&
          auth.isLoggedIn &&
          auth.user?.id === userId &&
          auth.accessToken === sessionToken &&
          getContentLang() === language &&
          useSettingsStore.getState().learnCourse === learnCourse
        );
      };
      void ExpressionService.getOverview(undefined, undefined, proficiency)
        .then((overview) => {
          if (isCurrent()) {
            setResult({ scope, phase: "ready", packs: overview.packs });
          }
        })
        .catch(() => {
          if (isCurrent()) setResult({ scope, phase: "error", packs: [] });
        });

      return () => {
        active = false;
      };
    }, [
      allowed,
      hydrated,
      isLoggedIn,
      language,
      learnCourse,
      proficiency,
      requirePremium,
      scope,
      sessionToken,
      userId,
    ]),
  );

  const current = allowed && result.scope === scope ? result : null;
  const phase = current?.phase ?? "loading";
  const packs = current?.packs;
  const topics = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return (packs ?? []).filter(
      (pack) =>
        !normalized ||
        `${pack.title} ${pack.description}`
          .toLocaleLowerCase()
          .includes(normalized),
    );
  }, [packs, query]);
  const columns = width < 350 || fontScale > 1.3 ? 1 : 2;
  const cardWidth = (Math.min(width, 760) - 44 - (columns - 1) * 14) / columns;
  const phraseCount = (count: number) =>
    formatSpeaking(copy.phrases, { count });

  const openTopic = (topic: ExpressionPackSummary) => {
    if (topic.count <= 0 || !useAuthStore.getState().isLoggedIn) return;
    requirePremium("expression", () => {
      router.push(
        `/speaking-practice?pack=${encodeURIComponent(topic.code)}${proficiency ? `&proficiency=${proficiency}` : ""}` as Href,
      );
    });
  };

  const back = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(tabs)");
  };

  return (
    <View style={[styles.page, { backgroundColor: palette.bg }]}>
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <Pressable
          onPress={back}
          accessibilityRole="button"
          accessibilityLabel={copy.back}
          style={({ pressed }) => [
            styles.backButton,
            { backgroundColor: palette.surface },
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="arrow-back" size={21} color={palette.ink} />
        </Pressable>
        <View style={styles.brand}>
          <View
            style={[styles.brandDot, { backgroundColor: palette.primary }]}
          />
          <Text style={[styles.eyebrow, { color: palette.ink }]}>
            {copy.eyebrow}
          </Text>
        </View>
        <View style={styles.backButton} />
      </View>

      <FlatList
        key={columns}
        data={phase === "ready" && allowed ? topics : []}
        numColumns={columns}
        keyExtractor={(item) => item.code}
        style={styles.list}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 32 },
        ]}
        columnWrapperStyle={columns === 2 ? styles.columns : undefined}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.headingRow}>
              <View style={styles.headingCopy}>
                <Text
                  accessibilityRole="header"
                  style={[styles.title, { color: palette.ink }]}
                >
                  {copy.title}
                  <Text style={{ color: palette.primary }}>
                    {"\n"}
                    {copy.titleAccent}
                  </Text>
                </Text>
                <Text style={[styles.subtitle, { color: palette.muted }]}>
                  {copy.subtitle}
                </Text>
              </View>
              {fontScale <= 1.3 ? (
                <View
                  accessible={false}
                  style={[
                    styles.micSeal,
                    { backgroundColor: palette.primarySoft },
                  ]}
                >
                  <Ionicons name="mic" size={25} color={palette.primary} />
                  <View
                    style={[styles.micSpark, { backgroundColor: palette.bg }]}
                  >
                    <Ionicons name="sparkles" size={13} color={palette.warm} />
                  </View>
                </View>
              ) : null}
            </View>

            <View
              style={[styles.levelTabs, { backgroundColor: palette.surface }]}
              accessibilityRole="tablist"
            >
              {PROFICIENCY_LEVELS.map((level) => (
                <Pressable
                  key={level}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: selectedLevel === level }}
                  onPress={() => setSelectedLevel(level)}
                  style={[
                    styles.levelTab,
                    {
                      backgroundColor:
                        selectedLevel === level ? palette.primary : palette.bg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.levelTabText,
                      {
                        color:
                          selectedLevel === level ? "#FFFFFF" : palette.muted,
                      },
                    ]}
                  >
                    {t(`voiceTutor.level.${level}`)}
                  </Text>
                </Pressable>
              ))}
            </View>

            {allowed && phase === "ready" && (packs?.length ?? 0) > 0 ? (
              <>
                <View
                  style={[
                    styles.search,
                    {
                      backgroundColor: palette.surface,
                      borderColor: palette.border,
                    },
                  ]}
                >
                  <Ionicons
                    name="search-outline"
                    size={19}
                    color={palette.muted}
                  />
                  <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder={copy.search}
                    placeholderTextColor={palette.muted}
                    accessibilityLabel={copy.search}
                    autoCorrect={false}
                    returnKeyType="search"
                    style={[styles.searchInput, { color: palette.ink }]}
                  />
                </View>
                <View style={styles.sectionHeading}>
                  <Text
                    accessibilityRole="header"
                    style={[styles.sectionTitle, { color: palette.ink }]}
                  >
                    {copy.allTopics}
                  </Text>
                  <View
                    style={[
                      styles.countPill,
                      { backgroundColor: palette.primarySoft },
                    ]}
                  >
                    <Text
                      style={[styles.countText, { color: palette.primary }]}
                    >
                      {formatSpeaking(copy.topicCount, {
                        count: topics.length,
                      })}
                    </Text>
                  </View>
                </View>
              </>
            ) : null}
          </View>
        }
        renderItem={({ item, index }) => {
          const look = topicLookOf(item.code);
          const scene = topicSceneOf(item.code);
          const disabled = item.count <= 0;
          return (
            <Pressable
              onPress={() => openTopic(item)}
              disabled={disabled}
              accessibilityRole="button"
              accessibilityLabel={`${item.title}. ${phraseCount(item.count)}`}
              accessibilityState={{ disabled }}
              style={({ pressed }) => [
                styles.topic,
                {
                  width: cardWidth,
                  backgroundColor: look.to,
                },
                disabled && styles.disabled,
                pressed && styles.pressed,
              ]}
            >
              {scene ? (
                <Image
                  source={scene}
                  contentFit="cover"
                  contentPosition="left"
                  style={[StyleSheet.absoluteFill, styles.topicArtwork]}
                  accessible={false}
                />
              ) : (
                <LinearGradient
                  colors={[look.from, look.to]}
                  start={{ x: 0.05, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[StyleSheet.absoluteFill, styles.topicArtwork]}
                />
              )}
              <LinearGradient
                colors={[
                  "rgba(0,0,0,0.02)",
                  "rgba(0,0,0,0.50)",
                  "rgba(0,0,0,0.82)",
                ]}
                locations={[0, 0.42, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[StyleSheet.absoluteFill, styles.topicArtwork]}
                pointerEvents="none"
              />
              <Text style={styles.topicIndex}>
                {String(index + 1).padStart(2, "0")}
              </Text>
              <View style={styles.topicFoot}>
                <Text
                  style={[
                    styles.topicTitle,
                    columns === 1 && styles.topicTitleWide,
                  ]}
                  numberOfLines={3}
                >
                  {item.title}
                </Text>
                <View style={styles.topicMeta}>
                  <View style={styles.topicPill}>
                    <Ionicons name="mic" size={11} color="#FFFFFF" />
                    <Text style={styles.topicPillText} numberOfLines={1}>
                      {phraseCount(item.count)}
                    </Text>
                  </View>
                  <View style={styles.topicArrow}>
                    <Ionicons name="arrow-forward" size={15} color={look.to} />
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View style={styles.state}>
            {!hydrated || !isLoggedIn || (allowed && phase === "loading") ? (
              <ActivityIndicator size="large" color={palette.primary} />
            ) : !allowed ? (
              <>
                <View
                  style={[
                    styles.stateIcon,
                    { backgroundColor: palette.primarySoft },
                  ]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={27}
                    color={palette.primary}
                  />
                </View>
                <Text style={[styles.stateTitle, { color: palette.ink }]}>
                  {t("premiumGate.title.expression")}
                </Text>
                <Text style={[styles.stateBody, { color: palette.muted }]}>
                  {t("premiumGate.sub")}
                </Text>
                <Pressable
                  onPress={() =>
                    requirePremium("expression", () =>
                      setReloadKey((key) => key + 1),
                    )
                  }
                  accessibilityRole="button"
                  accessibilityLabel={copy.start}
                  style={({ pressed }) => [
                    styles.retry,
                    { backgroundColor: palette.primary },
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.retryText}>{copy.start}</Text>
                </Pressable>
              </>
            ) : phase === "error" ? (
              <>
                <View
                  style={[
                    styles.stateIcon,
                    { backgroundColor: palette.primarySoft },
                  ]}
                >
                  <Ionicons
                    name="cloud-offline-outline"
                    size={28}
                    color={palette.primary}
                  />
                </View>
                <Text style={[styles.stateTitle, { color: palette.ink }]}>
                  {copy.loadError}
                </Text>
                <Pressable
                  onPress={() => setReloadKey((key) => key + 1)}
                  accessibilityRole="button"
                  accessibilityLabel={copy.retry}
                  style={({ pressed }) => [
                    styles.retry,
                    { backgroundColor: palette.primary },
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.retryText}>{copy.retry}</Text>
                </Pressable>
              </>
            ) : (
              <>
                <View
                  style={[
                    styles.stateIcon,
                    { backgroundColor: palette.primarySoft },
                  ]}
                >
                  <Ionicons
                    name="chatbubbles-outline"
                    size={28}
                    color={palette.primary}
                  />
                </View>
                <Text style={[styles.stateTitle, { color: palette.ink }]}>
                  {copy.emptyTitle}
                </Text>
                <Text style={[styles.stateBody, { color: palette.muted }]}>
                  {copy.emptyBody}
                </Text>
              </>
            )}
          </View>
        }
        ListFooterComponent={
          allowed && phase === "ready" && topics.length > 0 ? (
            <View style={[styles.tip, { borderColor: palette.border }]}>
              <View
                style={[styles.tipIcon, { backgroundColor: palette.warmSoft }]}
              >
                <Ionicons name="bulb-outline" size={21} color={palette.warm} />
              </View>
              <View style={styles.tipCopy}>
                <Text style={[styles.tipTitle, { color: palette.ink }]}>
                  {copy.tipTitle}
                </Text>
                <Text style={[styles.tipBody, { color: palette.muted }]}>
                  {copy.tipBody}
                </Text>
              </View>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  topBar: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 8, flexShrink: 1 },
  brandDot: { width: 6, height: 6, borderRadius: 3 },
  eyebrow: { fontSize: 11, fontWeight: "800", letterSpacing: 2 },
  list: { flex: 1, width: "100%", maxWidth: 760, alignSelf: "center" },
  content: { paddingHorizontal: 22 },
  headingRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headingCopy: { flex: 1 },
  title: {
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -1.2,
    fontWeight: "800",
  },
  subtitle: { fontSize: 13, lineHeight: 21, marginTop: 10 },
  micSeal: {
    width: 57,
    height: 57,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    transform: [{ rotate: "8deg" }],
  },
  micSpark: {
    position: "absolute",
    bottom: -5,
    right: -4,
    width: 23,
    height: 23,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  levelTabs: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 5,
    gap: 5,
    marginBottom: 18,
  },
  levelTab: {
    flex: 1,
    minHeight: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  levelTabText: { fontSize: 14, fontWeight: "800" },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderRadius: 17,
    paddingHorizontal: 15,
    minHeight: 52,
    marginBottom: 19,
  },
  searchInput: { flex: 1, fontSize: 13, paddingVertical: 15 },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 19,
    lineHeight: 27,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  countPill: { borderRadius: 8, paddingHorizontal: 9, paddingVertical: 4 },
  countText: { fontSize: 10, fontWeight: "800" },
  columns: { gap: 14 },
  topic: {
    height: 176,
    borderRadius: 32,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: 14,
  },
  topicArtwork: {
    borderRadius: 32,
  },
  topicIndex: {
    position: "absolute",
    top: 14,
    left: 15,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.22)",
    textShadowRadius: 4,
  },
  topicFoot: {
    position: "absolute",
    right: 13,
    bottom: 15,
    left: 13,
    justifyContent: "flex-end",
    gap: 8,
  },
  topicTitle: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "800",
    letterSpacing: -0.3,
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.24)",
    textShadowRadius: 5,
  },
  topicTitleWide: { fontSize: 18, lineHeight: 23 },
  topicMeta: { flexDirection: "row", alignItems: "center", gap: 6 },
  topicPill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    minHeight: 28,
    paddingHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.58)",
  },
  topicPillText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
    flexShrink: 1,
  },
  topicArrow: {
    height: 28,
    width: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  state: {
    alignItems: "center",
    justifyContent: "center",
    gap: 13,
    paddingVertical: 55,
    paddingHorizontal: 18,
    minHeight: 220,
  },
  stateIcon: {
    width: 63,
    height: 63,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  stateTitle: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "700",
    textAlign: "center",
  },
  stateBody: { fontSize: 14, lineHeight: 22, textAlign: "center" },
  retry: {
    minHeight: 46,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 15,
    marginTop: 6,
  },
  retryText: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
  },
  tip: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    borderTopWidth: 1,
    marginTop: 13,
    paddingTop: 23,
    paddingBottom: 5,
  },
  tipIcon: {
    width: 39,
    height: 39,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  tipCopy: { flex: 1 },
  tipTitle: { fontSize: 13, lineHeight: 20, fontWeight: "700" },
  tipBody: { fontSize: 12, lineHeight: 19, marginTop: 3 },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.84, transform: [{ scale: 0.98 }] },
});
