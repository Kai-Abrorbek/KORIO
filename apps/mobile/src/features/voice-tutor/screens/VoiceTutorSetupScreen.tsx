import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useContentLang } from "@/store/settings.store";
import { TutorMascot } from "../components/TutorMascot";
import {
  VoiceTutorApi,
  type VoiceTutorOptions,
  type VoiceTutorPersonality,
  type VoiceTutorQuota,
  type VoiceTutorSettings,
  type VoiceTutorTopicCard,
  type VoiceTutorVoice,
} from "../services/voice-tutor.api";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** 언어 칩의 깃발 */
const LANG_FLAG: Record<string, string> = {
  uz: "🇺🇿",
  ru: "🇷🇺",
  en: "🇺🇸",
  ko: "🇰🇷",
};

/** 옛 튜터와 같은 순서 — 우즈벡어 사용자가 기본이다 */
const LANG_ORDER = ["uz", "ru", "en", "ko"];

/** 목소리 카드 색. 서버 목소리엔 색이 없어서 순서대로 입힌다 */
const VOICE_COLORS = ["#776ee2", "#F06A8E", "#3FA7D6", "#2FA96A", "#FFA726"];

const PERSONALITIES: VoiceTutorPersonality[] = [
  "friendly",
  "close_friend",
  "savage",
  "chaotic_savage",
];

const PERSONALITY_EMOJI: Record<VoiceTutorPersonality, string> = {
  friendly: "🌿",
  close_friend: "🤙",
  savage: "🔥",
  chaotic_savage: "💥",
};

export interface VoiceTutorSetupScreenProps {
  options: VoiceTutorOptions;
  settings: VoiceTutorSettings;
  onChange: (key: keyof VoiceTutorSettings, value: string) => void;
  previewVoiceId: string | null;
  onPreview: (voice: VoiceTutorVoice) => void;
  /** 수업을 여는 중 — 시작 버튼 연타 방지 */
  busy: boolean;
  /** 화면에 띄울 에러 문장 (이미 번역됨) */
  error: string | null;
  /** 서버 한도. null 이면 아직 모름 (시작은 막지 않는다 — 서버가 다시 본다) */
  quota: VoiceTutorQuota | null;
  onUpsell: () => void;
  onClose: () => void;
  onStart: (topic: VoiceTutorTopicCard | null) => void;
}

/**
 * 새 Voice Tutor 설정 한 페이지.
 *
 * ⚠️ 옛 튜터 `features/tutor/screens/TutorSetupScreen.tsx` 를 복사해서 시작했다
 *    (Kai: "두 번째 화면도 똑같이"). 옛 파일은 건드리지 않는다.
 *
 * 옛 화면과 같은 흐름에 Voice Tutor 에만 있는 두 가지를 끼웠다:
 *   수업 언어 → 선생님(목소리) → 말투 → 성격 → 한국어 수준 → 주제 → 시작
 *
 * 설정은 서버(voice_tutor_settings)가 기억한다. 주제만 매번 새로 고른다.
 */
export function VoiceTutorSetupScreen(p: VoiceTutorSetupScreenProps) {
  const { t } = useTranslation();
  const contentLang = useContentLang();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(theme);

  const [topics, setTopics] = useState<VoiceTutorTopicCard[] | null>(null);
  const [failed, setFailed] = useState(false);
  /** null = 자유 대화 */
  const [topicId, setTopicId] = useState<string | null>(null);

  const load = useCallback(() => {
    setFailed(false);
    VoiceTutorApi.topics(contentLang)
      .then((r) => setTopics(r.topics ?? []))
      .catch(() => setFailed(true));
  }, [contentLang]);

  useEffect(load, [load]);

  const languages = [...p.options.explanationLanguages]
    .filter((language) => language.enabled !== false)
    .sort((a, b) => LANG_ORDER.indexOf(a.id) - LANG_ORDER.indexOf(b.id));
  const voices = p.options.voices.filter((voice) => voice.enabled !== false);
  const personalities = p.options.personalities?.length
    ? p.options.personalities
    : PERSONALITIES;
  const levels = p.options.koreanLevels ?? ["beginner", "intermediate", "advanced"];

  const voiceIndex = voices.findIndex((voice) => voice.id === p.settings.voiceId);
  const voice = voiceIndex >= 0 ? voices[voiceIndex] : null;
  const topic = topics?.find((x) => x.id === topicId) ?? null;
  const exhausted = !!p.quota && p.quota.allowedSec <= 0;
  const canStart = !!voice && !p.busy && !exhausted;

  if (failed) {
    return (
      <View style={[s.container, { paddingTop: insets.top + 6 }]}>
        <Header onClose={p.onClose} theme={theme} />
        <View style={s.center}>
          <Text style={s.errorText}>{t("common.loadFailed")}</Text>
          <Pressable onPress={load} style={s.retry} hitSlop={8}>
            <Text style={s.retryText}>{t("common.retry")}</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (!topics) {
    return (
      <View style={[s.container, { paddingTop: insets.top + 6 }]}>
        <Header onClose={p.onClose} theme={theme} />
        <View style={s.center}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      </View>
    );
  }

  const korea = topics.filter((x) => x.category === "korea");
  const daily = topics.filter((x) => x.category === "daily");

  return (
    <View style={[s.container, { paddingTop: insets.top + 6 }]}>
      <Header onClose={p.onClose} theme={theme} />

      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={s.subtitle}>{t("voiceTutor.setup.subtitle")}</Text>

        {/* ── 1. 수업 언어 ── */}
        <Section title={t("voiceTutor.setup.languageTitle")} theme={theme}>
          <View style={s.langRow}>
            {languages.map((language) => {
              const on = language.id === p.settings.explanationLanguage;
              return (
                <Pressable
                  key={language.id}
                  onPress={() => p.onChange("explanationLanguage", language.id)}
                  style={[s.langChip, on && s.langChipOn]}
                >
                  <Text style={s.langFlag}>{LANG_FLAG[language.id] ?? "🌐"}</Text>
                  <Text
                    style={[s.langText, on && s.langTextOn]}
                    numberOfLines={1}
                  >
                    {language.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={s.sectionHint}>{t("voiceTutor.teachingLanguageHint")}</Text>
        </Section>

        {/* ── 2. 선생님 (목소리) ── */}
        <Section title={t("voiceTutor.setup.teacherTitle")} theme={theme}>
          {voices.length === 0 ? (
            <Text style={s.errorInline}>{t("voiceTutor.voiceUnavailable")}</Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.teacherRow}
            >
              {voices.map((v, i) => (
                <Animated.View key={v.id} entering={FadeInDown.delay(i * 50)}>
                  <TeacherChip
                    name={v.name}
                    description={v.description}
                    color={VOICE_COLORS[i % VOICE_COLORS.length]}
                    hasPreview={!!v.previewUrl}
                    selected={v.id === p.settings.voiceId}
                    previewing={p.previewVoiceId === v.id}
                    onSelect={() => p.onChange("voiceId", v.id)}
                    onPreview={() => p.onPreview(v)}
                    theme={theme}
                  />
                </Animated.View>
              ))}
            </ScrollView>
          )}
        </Section>

        {/* ── 3. 말투 ── 성격과 독립이다 */}
        <Section title={t("voiceTutor.setup.addressTitle")} theme={theme}>
          <View style={s.addressRow}>
            {(["polite", "casual"] as const).map((style) => {
              const on = p.settings.speechStyle === style;
              return (
                <Pressable
                  key={style}
                  onPress={() => p.onChange("speechStyle", style)}
                  style={[s.addressCard, on && s.addressCardOn]}
                >
                  <View style={s.addressHead}>
                    <Text style={[s.addressLabel, on && s.addressLabelOn]}>
                      {t(`voiceTutor.style.${style}`)}
                    </Text>
                    {on && (
                      <Ionicons
                        name="checkmark-circle"
                        size={17}
                        color={theme.primary}
                      />
                    )}
                  </View>
                  <Text style={s.addressExample} numberOfLines={2}>
                    {t(`voiceTutor.setup.${style}Example`)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Section>

        {/* ── 4. 성격 ── Voice Tutor 에만 있다 */}
        <Section title={t("voiceTutor.personalityTitle")} theme={theme}>
          <View style={s.grid}>
            {personalities.map((id) => {
              const on = p.settings.personality === id;
              return (
                <Pressable
                  key={id}
                  onPress={() => p.onChange("personality", id)}
                  style={[s.topicCard, on && s.topicCardOn]}
                >
                  <Text style={s.personaEmoji}>{PERSONALITY_EMOJI[id]}</Text>
                  <Text style={s.topicTitle} numberOfLines={1}>
                    {t(`voiceTutor.personality.${id}.name`)}
                  </Text>
                  <Text style={s.topicBlurb} numberOfLines={3}>
                    {t(`voiceTutor.personality.${id}.description`)}
                  </Text>
                  {on && (
                    <View style={s.topicCheck}>
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color={theme.primary}
                      />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </Section>

        {/* ── 5. 한국어 수준 ── */}
        <Section title={t("voiceTutor.koreanLevel")} theme={theme}>
          <View style={s.langRow}>
            {levels.map((level) => {
              const on = p.settings.koreanLevel === level;
              return (
                <Pressable
                  key={level}
                  onPress={() => p.onChange("koreanLevel", level)}
                  style={[s.langChip, on && s.langChipOn]}
                >
                  <Text style={[s.langText, on && s.langTextOn]}>
                    {t(`voiceTutor.level.${level}`, { defaultValue: level })}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Section>

        {/* ── 6. 주제 ── */}
        <Section title={t("voiceTutor.setup.topicTitle")} theme={theme}>
          <Pressable
            onPress={() => setTopicId(null)}
            style={[s.freeCard, topicId === null && s.freeCardOn]}
          >
            <View style={[s.freeIcon, { backgroundColor: theme.primary }]}>
              <Ionicons name="chatbubbles" size={18} color="#fff" />
            </View>
            <View style={s.freeBody}>
              <Text style={s.freeTitle}>{t("voiceTutor.call.freeTalk")}</Text>
              <Text style={s.freeBlurb} numberOfLines={1}>
                {t("voiceTutor.setup.freeTalkBlurb")}
              </Text>
            </View>
            {topicId === null && (
              <Ionicons name="checkmark-circle" size={20} color={theme.primary} />
            )}
          </Pressable>

          {[
            { key: "korea" as const, items: korea },
            { key: "daily" as const, items: daily },
          ].map(
            (g) =>
              g.items.length > 0 && (
                <View key={g.key} style={s.group}>
                  <Text style={s.groupTitle}>
                    {t(`voiceTutor.setup.topicGroup.${g.key}`)}
                  </Text>
                  <View style={s.grid}>
                    {g.items.map((tp) => (
                      <Pressable
                        key={tp.id}
                        onPress={() => setTopicId(tp.id)}
                        style={[
                          s.topicCard,
                          topicId === tp.id && s.topicCardOn,
                        ]}
                      >
                        <View
                          style={[s.topicIcon, { backgroundColor: tp.color }]}
                        >
                          <Ionicons
                            name={tp.icon as any}
                            size={16}
                            color="#fff"
                          />
                        </View>
                        <Text style={s.topicTitle} numberOfLines={1}>
                          {tp.title}
                        </Text>
                        <Text style={s.topicBlurb} numberOfLines={2}>
                          {tp.blurb}
                        </Text>
                        {topicId === tp.id && (
                          <View style={s.topicCheck}>
                            <Ionicons
                              name="checkmark-circle"
                              size={18}
                              color={theme.primary}
                            />
                          </View>
                        )}
                      </Pressable>
                    ))}
                  </View>
                </View>
              ),
          )}
        </Section>

        {!!p.error && (
          <Text style={s.errorInline} numberOfLines={2}>
            {p.error}
          </Text>
        )}
      </ScrollView>

      {/* ── 하단 고정 ── 안드로이드 네비바에 가리지 않게 insets.bottom 을 더한다 */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Text style={s.summary} numberOfLines={1}>
          {[
            LANG_FLAG[p.settings.explanationLanguage],
            voice?.name,
            t(`voiceTutor.style.${p.settings.speechStyle}`),
            topic?.title ?? t("voiceTutor.call.freeTalk"),
          ]
            .filter(Boolean)
            .join(" · ")}
        </Text>

        {!!p.quota && (
          <Text style={s.quotaLine} numberOfLines={1}>
            {t("voiceTutor.setup.quotaLeft", {
              min: Math.floor(p.quota.allowedSec / 60),
              limit: p.quota.dailyLimitMin,
            })}
          </Text>
        )}

        {exhausted ? (
          <Pressable
            onPress={p.quota?.isMax ? undefined : p.onUpsell}
            style={[s.start, p.quota?.isMax && s.startOff]}
          >
            <Text style={s.startText}>
              {p.quota?.isMax
                ? t("voiceTutor.setup.limitReached")
                : t("voiceTutor.setup.upsellMax")}
            </Text>
          </Pressable>
        ) : (
          <StartButton
            label={t("voiceTutor.setup.start")}
            busy={p.busy}
            disabled={!canStart}
            onPress={() => p.onStart(topic)}
            theme={theme}
          />
        )}
      </View>
    </View>
  );
}

function Header({
  onClose,
  theme,
}: {
  onClose: () => void;
  theme: ThemeColors;
}) {
  const { t } = useTranslation();
  const s = styles(theme);
  return (
    <View style={s.header}>
      <Pressable onPress={onClose} style={s.iconBtn} hitSlop={8}>
        <Ionicons name="chevron-down" size={26} color={theme.text} />
      </Pressable>
      <Text style={s.title}>{t("voiceTutor.setup.title")}</Text>
      <View style={s.iconBtn} />
    </View>
  );
}

function Section({
  title,
  children,
  theme,
}: {
  title: string;
  children: React.ReactNode;
  theme: ThemeColors;
}) {
  const s = styles(theme);
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

/** 가로 스크롤용 선생님 카드. 세로로 쌓으면 이 페이지가 끝없이 길어진다 */
function TeacherChip({
  name,
  description,
  color,
  hasPreview,
  selected,
  previewing,
  onSelect,
  onPreview,
  theme,
}: {
  name: string;
  description?: string;
  color: string;
  hasPreview: boolean;
  selected: boolean;
  previewing: boolean;
  onSelect: () => void;
  onPreview: () => void;
  theme: ThemeColors;
}) {
  const s = styles(theme);
  const press = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - press.value * 0.03 }],
  }));

  return (
    <AnimatedPressable
      onPress={onSelect}
      onPressIn={() => (press.value = withTiming(1, { duration: 70 }))}
      onPressOut={() => (press.value = withTiming(0, { duration: 130 }))}
      style={[
        s.teacherCard,
        selected && { borderColor: color, borderWidth: 2 },
        style,
      ]}
    >
      <View style={[s.teacherAvatar, { backgroundColor: color + "26" }]}>
        <TutorMascot state="idle" size={26} tint={color} />
      </View>
      <View style={s.teacherNameRow}>
        <Text style={s.teacherName} numberOfLines={1}>
          {name}
        </Text>
        {selected && (
          <Ionicons name="checkmark-circle" size={15} color={color} />
        )}
      </View>
      <Text style={s.teacherDesc} numberOfLines={2}>
        {description ?? ""}
      </Text>
      {/* 미리듣기 파일이 없으면 버튼을 아예 안 그린다 */}
      {hasPreview && (
        <Pressable
          onPress={onPreview}
          hitSlop={10}
          style={[s.teacherPlay, { borderColor: color }]}
        >
          <Ionicons
            name={previewing ? "stop" : "volume-high"}
            size={15}
            color={color}
          />
        </Pressable>
      )}
    </AnimatedPressable>
  );
}

/** 바텀보더가 줄어들며 눌리는 느낌이 나는 시작 버튼 */
function StartButton({
  label,
  busy,
  disabled,
  onPress,
  theme,
}: {
  label: string;
  busy: boolean;
  disabled: boolean;
  onPress: () => void;
  theme: ThemeColors;
}) {
  const s = styles(theme);
  const press = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: press.value * 3 }],
    borderBottomWidth: 5 - press.value * 3,
  }));

  return (
    <AnimatedPressable
      onPressIn={() => (press.value = withTiming(1, { duration: 70 }))}
      onPressOut={() => (press.value = withTiming(0, { duration: 130 }))}
      onPress={onPress}
      disabled={disabled}
      style={[s.start, disabled && s.startOff, style]}
    >
      {busy ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          <Ionicons name="call" size={19} color="#fff" />
          <Text style={s.startText}>{label}</Text>
        </>
      )}
    </AnimatedPressable>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 14 },

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 12,
      paddingBottom: 4,
    },
    iconBtn: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    title: { fontSize: 16, fontWeight: "900", color: theme.text },

    scroll: { paddingHorizontal: 20, paddingBottom: 28 },
    subtitle: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "600",
      color: theme.textSecondary,
      marginBottom: 20,
    },

    section: { marginBottom: 26 },
    sectionHint: {
      fontSize: 12,
      lineHeight: 17,
      fontWeight: "600",
      color: theme.textSecondary,
      marginTop: 9,
    },
    personaEmoji: { fontSize: 22 },
    sectionTitle: {
      fontSize: 15,
      fontWeight: "900",
      color: theme.text,
      marginBottom: 11,
      letterSpacing: -0.2,
    },

    // ── 언어 ──
    langRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    langChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 13,
      paddingVertical: 10,
      borderRadius: 14,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    langChipOn: {
      borderColor: theme.primary,
      backgroundColor: theme.primary + "14",
    },
    langFlag: { fontSize: 16 },
    langText: { fontSize: 14, fontWeight: "700", color: theme.textSecondary },
    langTextOn: { color: theme.primary, fontWeight: "900" },

    // ── 선생님 ──
    teacherRow: { gap: 10, paddingRight: 4, paddingVertical: 2 },
    teacherCard: {
      width: 132,
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 1.5,
      borderColor: theme.border,
      padding: 12,
      gap: 5,
    },
    teacherAvatar: {
      width: 44,
      height: 44,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    teacherAvatarText: { fontSize: 23 },
    teacherNameRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginTop: 2,
    },
    teacherName: {
      fontSize: 14.5,
      fontWeight: "800",
      color: theme.text,
      flexShrink: 1,
    },
    teacherDesc: {
      fontSize: 11.5,
      lineHeight: 15,
      fontWeight: "500",
      color: theme.textSecondary,
      minHeight: 30,
    },
    teacherPlay: {
      position: "absolute",
      top: 12,
      right: 12,
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 1.5,
      alignItems: "center",
      justifyContent: "center",
    },

    // ── 말투 ──
    addressRow: { flexDirection: "row", gap: 10 },
    addressCard: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: theme.border,
      padding: 13,
      gap: 6,
    },
    addressCardOn: {
      borderColor: theme.primary,
      borderWidth: 2,
      backgroundColor: theme.primary + "0F",
    },
    addressHead: { flexDirection: "row", alignItems: "center", gap: 5 },
    addressLabel: {
      fontSize: 14.5,
      fontWeight: "900",
      color: theme.text,
      flexShrink: 1,
    },
    addressLabelOn: { color: theme.primary },
    addressExample: {
      fontSize: 12.5,
      lineHeight: 18,
      fontWeight: "600",
      color: theme.textSecondary,
    },

    // ── 주제 ──
    freeCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      backgroundColor: theme.surface,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: theme.border,
      padding: 12,
    },
    freeCardOn: {
      borderColor: theme.primary,
      borderWidth: 2,
      backgroundColor: theme.primary + "0F",
    },
    freeIcon: {
      width: 38,
      height: 38,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
    },
    freeBody: { flex: 1, gap: 2 },
    freeTitle: { fontSize: 14.5, fontWeight: "800", color: theme.text },
    freeBlurb: { fontSize: 12, fontWeight: "500", color: theme.textSecondary },

    group: { marginTop: 18, gap: 9 },
    groupTitle: {
      fontSize: 12.5,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    topicCard: {
      width: "47.5%",
      flexGrow: 1,
      backgroundColor: theme.surface,
      borderRadius: 15,
      borderWidth: 1.5,
      borderColor: theme.border,
      padding: 11,
      gap: 5,
    },
    topicCardOn: {
      borderColor: theme.primary,
      borderWidth: 2,
      backgroundColor: theme.primary + "0F",
    },
    topicIcon: {
      width: 32,
      height: 32,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
    },
    topicTitle: { fontSize: 13.5, fontWeight: "800", color: theme.text },
    topicBlurb: {
      fontSize: 11.5,
      lineHeight: 15,
      fontWeight: "500",
      color: theme.textSecondary,
      minHeight: 30,
    },
    topicCheck: { position: "absolute", top: 9, right: 9 },

    errorInline: {
      fontSize: 13,
      fontWeight: "700",
      color: "#E5533D",
      textAlign: "center",
      paddingTop: 4,
    },
    errorText: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
      paddingHorizontal: 32,
    },
    retry: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 999,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    retryText: { fontSize: 14, fontWeight: "800", color: theme.primary },

    // ── 하단 ──
    footer: {
      paddingHorizontal: 20,
      paddingTop: 10,
      gap: 9,
      backgroundColor: theme.bg,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    quotaLine: {
      fontSize: 12,
      fontWeight: "800",
      color: theme.primary,
      textAlign: "center",
    },
    summary: {
      fontSize: 12.5,
      fontWeight: "700",
      color: theme.textSecondary,
      textAlign: "center",
    },
    start: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      height: 54,
      borderRadius: 16,
      backgroundColor: theme.primary,
      borderBottomWidth: 5,
      borderColor: "#5B4DD4",
    },
    startOff: { opacity: 0.5 },
    startText: { fontSize: 16, fontWeight: "900", color: "#fff" },
  });
