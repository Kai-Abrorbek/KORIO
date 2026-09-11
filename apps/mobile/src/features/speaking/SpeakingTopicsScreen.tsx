import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { type Href, useFocusEffect, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useAuthHydrated } from "@/hooks/useAuthGuard";
import { useAuthStore } from "@/store/auth.store";
import { ExpressionService } from "@/services/expression.service";
import type { ExpressionPackSummary } from "@/types/expression";
import { useFeatureAccess } from "@/features/subscription/useFeatureAccess";
import { formatSpeaking, useSpeakingCopy } from "./copy";
import { useSpeakingPalette } from "./palette";
import TopicIllustration from "./TopicIllustration";

type LoadState = {
  scope: string;
  phase: "loading" | "ready" | "error";
  packs: ExpressionPackSummary[];
};

export default function SpeakingTopicsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, fontScale } = useWindowDimensions();
  const { t, i18n } = useTranslation();
  const copy = useSpeakingCopy();
  const palette = useSpeakingPalette();
  const { canUse, requirePremium } = useFeatureAccess();
  const hydrated = useAuthHydrated();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userId = useAuthStore((state) => state.user?.id);
  const sessionToken = useAuthStore((state) => state.accessToken);
  const language = i18n.resolvedLanguage ?? i18n.language;
  const allowed = isLoggedIn && canUse("expression");
  const [query, setQuery] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const scope = `${userId ?? "guest"}:${language}:${reloadKey}`;
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
          (i18n.resolvedLanguage ?? i18n.language) === language
        );
      };
      void ExpressionService.getOverview()
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
      i18n,
      isLoggedIn,
      language,
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
  const featured = packs?.[0];
  const columns = width < 350 || fontScale > 1.3 ? 1 : 2;
  const compactHero = width < 370 || fontScale > 1.2;
  const cardWidth = (Math.min(width, 760) - 44 - (columns - 1) * 14) / columns;
  const surfaces = [palette.primarySoft, palette.successSoft, palette.warmSoft];
  const accents = [palette.primary, palette.success, palette.warm];
  const phraseCount = (count: number) =>
    formatSpeaking(copy.phrases, { count });

  const openTopic = (topic: ExpressionPackSummary) => {
    if (topic.count <= 0 || !useAuthStore.getState().isLoggedIn) return;
    requirePremium("expression", () => {
      router.push(
        `/speaking-practice?pack=${encodeURIComponent(topic.code)}` as Href,
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

            {featured && phase === "ready" ? (
              <Pressable
                onPress={() => openTopic(featured)}
                disabled={featured.count <= 0}
                accessibilityRole="button"
                accessibilityLabel={`${copy.featured}. ${featured.title}. ${phraseCount(featured.count)}. ${copy.start}`}
                accessibilityState={{ disabled: featured.count <= 0 }}
                style={({ pressed }) => [
                  styles.hero,
                  { backgroundColor: palette.hero },
                  featured.count <= 0 && styles.disabled,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.heroTop}>
                  <View style={styles.heroLabel}>
                    <Ionicons name="sparkles" size={13} color="#E5D6FF" />
                    <Text style={styles.heroEyebrow}>{copy.featured}</Text>
                  </View>
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color={palette.onHero}
                    style={styles.diagonalArrow}
                  />
                </View>
                <View
                  style={[
                    styles.heroBody,
                    compactHero && styles.heroBodyCompact,
                  ]}
                >
                  <View style={styles.heroCopy}>
                    <Text style={[styles.heroTitle, { color: palette.onHero }]}>
                      {featured.title}
                    </Text>
                    <Text style={styles.heroCount}>
                      {phraseCount(featured.count)}
                    </Text>
                    <View style={styles.heroAction}>
                      <Ionicons name="mic-outline" size={16} color="#422D68" />
                      <Text style={styles.heroActionText}>{copy.start}</Text>
                      <Ionicons
                        name="arrow-forward"
                        size={16}
                        color="#422D68"
                      />
                    </View>
                  </View>
                  <View style={styles.heroArt} pointerEvents="none">
                    <View style={styles.heroOrbit} />
                    <TopicIllustration
                      code={featured.code}
                      size={130}
                      color="#D9C2FF"
                    />
                  </View>
                </View>
              </Pressable>
            ) : null}

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
          const accent = accents[index % accents.length];
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
                  backgroundColor: palette.surface,
                  borderColor: palette.border,
                },
                disabled && styles.disabled,
                pressed && styles.pressed,
              ]}
            >
              <View
                style={[
                  styles.topicArt,
                  { backgroundColor: surfaces[index % surfaces.length] },
                ]}
              >
                <View style={styles.topicNumber}>
                  <Text style={[styles.topicNumberText, { color: accent }]}>
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                </View>
                <TopicIllustration code={item.code} size={132} color={accent} />
              </View>
              <View style={styles.topicBody}>
                <Text style={[styles.topicTitle, { color: palette.ink }]}>
                  {item.title}
                </Text>
                <View style={styles.topicBottom}>
                  <Text style={[styles.topicCount, { color: palette.muted }]}>
                    {phraseCount(item.count)}
                  </Text>
                  <View
                    style={[styles.topicArrow, { backgroundColor: palette.bg }]}
                  >
                    <Ionicons
                      name="arrow-forward"
                      size={16}
                      color={palette.ink}
                    />
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
    paddingBottom: 26,
  },
  headingCopy: { flex: 1 },
  title: {
    fontSize: 30,
    lineHeight: 40,
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
  hero: { borderRadius: 28, padding: 22, overflow: "hidden", marginBottom: 24 },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  heroLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    flexShrink: 1,
  },
  heroEyebrow: {
    color: "#E5D6FF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    flexShrink: 1,
  },
  diagonalArrow: { transform: [{ rotate: "-45deg" }] },
  heroBody: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 21,
  },
  heroBodyCompact: { flexDirection: "column-reverse", alignItems: "stretch" },
  heroCopy: { flex: 1 },
  heroTitle: {
    fontSize: 25,
    fontWeight: "800",
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  heroCount: { fontSize: 12, lineHeight: 18, color: "#DED0F5", marginTop: 7 },
  heroAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#FBF7FF",
    marginTop: 23,
    maxWidth: "100%",
  },
  heroActionText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "800",
    color: "#422D68",
    flexShrink: 1,
  },
  heroArt: {
    width: 130,
    height: 132,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  heroOrbit: {
    position: "absolute",
    width: 125,
    height: 125,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: "#FFFFFF24",
    backgroundColor: "#FFFFFF0A",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderRadius: 17,
    paddingHorizontal: 15,
    minHeight: 52,
    marginBottom: 25,
  },
  searchInput: { flex: 1, fontSize: 13, paddingVertical: 15 },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
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
    borderWidth: 1,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 14,
  },
  topicArt: {
    height: 139,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 14,
  },
  topicNumber: { position: "absolute", top: 12, left: 13 },
  topicNumberText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    opacity: 0.7,
  },
  topicBody: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 13,
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  topicBottom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
    flex: 1,
  },
  topicCount: { flex: 1, fontSize: 11, lineHeight: 17 },
  topicArrow: {
    height: 28,
    width: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
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
