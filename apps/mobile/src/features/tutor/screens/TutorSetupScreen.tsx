import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { createAudioPlayer, type AudioPlayer } from "expo-audio";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import {
  TutorApi,
  TUTOR_TEACHING_LANGUAGES,
  type TutorAddressStyle,
  type TutorQuota,
  type TutorTeacherCard,
  type TutorTeachingLanguage,
  type TutorTopicCard,
} from "../services/tutor.api";
import { useTutorPrefs } from "../store/tutor-prefs.store";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** 언어 칩의 깃발. 이름 자체는 i18n 에서 각 언어의 제 이름으로 온다 */
const LANG_FLAG: Record<TutorTeachingLanguage, string> = {
  uz: "🇺🇿",
  ru: "🇷🇺",
  en: "🇺🇸",
  ko: "🇰🇷",
};

export interface TutorSetupResult {
  topicId?: string;
  teacherId?: string;
  addressStyle: TutorAddressStyle;
  teachingLanguage: TutorTeachingLanguage;
  /**
   * 화면에 띄울 이름들. 통화 화면 헤더가 쓴다.
   *
   * 서버 grant 에는 선생님 이름이 앱 언어로 안 오고 주제 제목도 없다.
   * 여기는 카드를 이미 들고 있으니 같이 넘겨준다 — 통화 화면이 같은 목록을
   * 다시 받아올 이유가 없다.
   */
  teacherName?: string;
  topicTitle?: string;
}

export interface TutorSetupScreenProps {
  /** 연결 중. 시작 버튼 연타를 막는다 */
  busy: boolean;
  error: string | null;
  quota: TutorQuota | null;
  onClose: () => void;
  onStart: (opts: TutorSetupResult) => void;
  onUpsell: () => void;
}

/**
 * 통화 전 설정 한 페이지.
 *
 * 예전엔 선생님 화면 → 주제 화면 두 단계였고, **주제를 누르는 순간 통화가
 * 시작됐다.** 그래서 말투나 설명 언어를 바꾸려면 되돌아갈 방법이 없었고,
 * 주제를 잘못 눌러도 곧바로 과금되는 통화가 열렸다.
 *
 * 한 페이지에 모으고 시작은 **버튼으로만** 한다:
 *   설명 언어 → 선생님 → 말투 → 주제 → 시작
 *
 * 선생님·말투·언어는 기억한다 (tutor-prefs). 주제만 매번 새로 고른다 —
 * 오늘 뭘 할지는 어제와 다른 게 정상이다.
 */
export function TutorSetupScreen(p: TutorSetupScreenProps) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(theme);

  const teacherId = useTutorPrefs((st) => st.teacherId);
  const setTeacherId = useTutorPrefs((st) => st.setTeacherId);
  const addressStyle = useTutorPrefs((st) => st.addressStyle);
  const setAddressStyle = useTutorPrefs((st) => st.setAddressStyle);
  const savedLang = useTutorPrefs((st) => st.teachingLanguage);
  const setTeachingLanguage = useTutorPrefs((st) => st.setTeachingLanguage);

  /**
   * 한 번도 안 골랐으면 앱 언어를 기본으로.
   *
   * ⚠️ 매번 앱 언어로 덮으면 안 된다 — 고른 값이 조용히 되돌려진다.
   *    그래서 null 일 때만 본다.
   */
  const teachingLanguage: TutorTeachingLanguage = useMemo(() => {
    if (savedLang) return savedLang;
    const base = (i18n.language?.split("-")[0] ?? "uz") as TutorTeachingLanguage;
    return TUTOR_TEACHING_LANGUAGES.includes(base) ? base : "uz";
  }, [savedLang, i18n.language]);

  const [teachers, setTeachers] = useState<TutorTeacherCard[] | null>(null);
  const [topics, setTopics] = useState<TutorTopicCard[] | null>(null);
  const [failed, setFailed] = useState(false);
  /** null = 자유 대화 */
  const [topicId, setTopicId] = useState<string | null>(null);
  const [previewing, setPreviewing] = useState<string | null>(null);
  const player = useRef<AudioPlayer | null>(null);

  const load = useCallback(() => {
    setFailed(false);
    Promise.all([TutorApi.teachers(), TutorApi.topics()])
      .then(([a, b]) => {
        setTeachers(a.teachers);
        setTopics(b.topics ?? []);
      })
      .catch(() => setFailed(true));
  }, []);

  useEffect(load, [load]);

  // 화면을 떠나면 미리듣기를 끊는다. 안 끊으면 통화가 시작된 뒤에도 샘플이 나온다
  useEffect(
    () => () => {
      try {
        player.current?.remove();
      } catch {
        /* 이미 해제됐으면 그만 */
      }
      player.current = null;
    },
    [],
  );

  /**
   * 목소리 미리듣기.
   *
   * ⚠️ **Azure TTS 를 쓰지 않는다.** 실제 통화는 Gemini native audio 라,
   *    예전처럼 Azure ko-KR 로 들려주면 고를 때 들은 사람과 수업에서 만나는
   *    사람이 아예 다르다. 서버가 실제 Gemini 목소리로 미리 만들어 둔 파일을
   *    그대로 재생한다 (합성 호출이 없으니 즉시 나온다).
   *
   * (Azure 는 그대로 남아 있다 — 정확한 한국어 예문 다시 듣기는 여전히
   *  ko-KR 전용 목소리 쪽이 정확하다. 역할만 갈랐다.)
   */
  const preview = useCallback(async (tc: TutorTeacherCard) => {
    if (!tc.previewUrl) return;
    setPreviewing(tc.id);
    try {
      const uri = TutorApi.teacherPreviewUrl(tc.previewUrl);
      if (!player.current) player.current = createAudioPlayer({ uri });
      else player.current.replace({ uri });
      player.current.play();
    } catch {
      /* 미리듣기가 안 돼도 선택은 막지 않는다 */
    } finally {
      setPreviewing(null);
    }
  }, []);

  // 선생님을 한 명도 안 골랐으면 첫 번째를 기본 선택으로 (빈손으로 시작 못 하게)
  useEffect(() => {
    if (!teacherId && teachers?.length) setTeacherId(teachers[0].id);
  }, [teacherId, teachers, setTeacherId]);

  const teacher = teachers?.find((x) => x.id === teacherId) ?? null;
  const topic = topics?.find((x) => x.id === topicId) ?? null;
  const exhausted = !!p.quota && p.quota.allowedMin <= 0;
  const canStart = !!teacher && !p.busy && !exhausted;

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

  if (!teachers || !topics) {
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
        <Text style={s.subtitle}>{t("tutor.setup.subtitle")}</Text>

        {/* ── 1. 설명 언어 ── */}
        <Section title={t("tutor.setup.language.title")} theme={theme}>
          <View style={s.langRow}>
            {TUTOR_TEACHING_LANGUAGES.map((code) => {
              const on = code === teachingLanguage;
              return (
                <Pressable
                  key={code}
                  onPress={() => setTeachingLanguage(code)}
                  style={[s.langChip, on && s.langChipOn]}
                >
                  <Text style={s.langFlag}>{LANG_FLAG[code]}</Text>
                  <Text
                    style={[s.langText, on && s.langTextOn]}
                    numberOfLines={1}
                  >
                    {t(`tutor.setup.language.${code}`)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Section>

        {/* ── 2. 선생님 ── */}
        <Section title={t("tutor.setup.teacher.title")} theme={theme}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.teacherRow}
          >
            {teachers.map((tc, i) => (
              <Animated.View key={tc.id} entering={FadeInDown.delay(i * 50)}>
                <TeacherChip
                  teacher={tc}
                  selected={tc.id === teacherId}
                  previewing={previewing === tc.id}
                  onSelect={() => setTeacherId(tc.id)}
                  onPreview={() => void preview(tc)}
                  theme={theme}
                />
              </Animated.View>
            ))}
          </ScrollView>
        </Section>

        {/* ── 3. 말투 ──
            ⚠️ 성격과 독립이다. "유나 + 존댓말"(장난스러운데 존댓말)도,
               "서연 + 반말"(차분한데 친근)도 고를 수 있어야 한다.
               그리고 이건 **가르치는 한국어의 격식과도 다른 축**이다 —
               반말 선생님도 카페 주문은 "주세요" 로 가르친다 (서버 프롬프트 §5). */}
        <Section title={t("tutor.setup.address.title")} theme={theme}>
          <View style={s.addressRow}>
            {(["polite", "casual"] as const).map((style) => (
              <Pressable
                key={style}
                onPress={() => setAddressStyle(style)}
                style={[
                  s.addressCard,
                  addressStyle === style && s.addressCardOn,
                ]}
              >
                <View style={s.addressHead}>
                  <Text
                    style={[
                      s.addressLabel,
                      addressStyle === style && s.addressLabelOn,
                    ]}
                  >
                    {t(`tutor.setup.address.${style}`)}
                  </Text>
                  {addressStyle === style && (
                    <Ionicons
                      name="checkmark-circle"
                      size={17}
                      color={theme.primary}
                    />
                  )}
                </View>
                <Text style={s.addressExample} numberOfLines={2}>
                  {t(`tutor.setup.address.${style}Example`)}
                </Text>
              </Pressable>
            ))}
          </View>
        </Section>

        {/* ── 4. 주제 ── */}
        <Section title={t("tutor.setup.topic.title")} theme={theme}>
          <Pressable
            onPress={() => setTopicId(null)}
            style={[s.freeCard, topicId === null && s.freeCardOn]}
          >
            <View style={[s.freeIcon, { backgroundColor: theme.primary }]}>
              <Ionicons name="chatbubbles" size={18} color="#fff" />
            </View>
            <View style={s.freeBody}>
              <Text style={s.freeTitle}>{t("tutor.setup.freeTalk")}</Text>
              <Text style={s.freeBlurb} numberOfLines={1}>
                {t("tutor.freeTalkBlurb")}
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
                    {t(`tutor.topicGroup.${g.key}`)}
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
            {t(`tutor.err.${p.error}`, t("tutor.err.generic"))}
          </Text>
        )}
      </ScrollView>

      {/* ── 하단 고정 ──
          ScrollView 안에 넣으면 끝까지 내려야 보인다. 그리고 안드로이드
          3버튼 네비게이션에 가려지지 않게 insets.bottom 을 항상 더한다 */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Text style={s.summary} numberOfLines={1}>
          {[
            LANG_FLAG[teachingLanguage],
            teacher?.name,
            t(`tutor.setup.address.${addressStyle}`),
            topic?.title ?? t("tutor.setup.freeTalk"),
          ]
            .filter(Boolean)
            .join(" · ")}
        </Text>

        {exhausted ? (
          <Pressable onPress={p.onUpsell} style={s.start}>
            <Text style={s.startText}>{t("tutor.upsellMax")}</Text>
          </Pressable>
        ) : (
          <StartButton
            label={t("tutor.setup.start")}
            busy={p.busy}
            disabled={!canStart}
            onPress={() =>
              p.onStart({
                topicId: topicId ?? undefined,
                teacherId: teacherId ?? undefined,
                addressStyle,
                teachingLanguage,
                teacherName: teacher?.name,
                topicTitle: topic?.title,
              })
            }
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
      <Text style={s.title}>{t("tutor.setup.title")}</Text>
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
  teacher,
  selected,
  previewing,
  onSelect,
  onPreview,
  theme,
}: {
  teacher: TutorTeacherCard;
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
        selected && { borderColor: teacher.color, borderWidth: 2 },
        style,
      ]}
    >
      <View style={[s.teacherAvatar, { backgroundColor: teacher.color + "26" }]}>
        <Text style={s.teacherAvatarText}>{teacher.avatar}</Text>
      </View>
      <View style={s.teacherNameRow}>
        <Text style={s.teacherName} numberOfLines={1}>
          {teacher.name}
        </Text>
        {selected && (
          <Ionicons name="checkmark-circle" size={15} color={teacher.color} />
        )}
      </View>
      <Text style={s.teacherDesc} numberOfLines={2}>
        {teacher.description}
      </Text>
      {/* 에셋이 아직 없으면 버튼을 아예 안 그린다.
          눌러도 아무 일 없는 버튼이 제일 나쁘다 */}
      {!!teacher.previewUrl && (
        <Pressable
          onPress={onPreview}
          hitSlop={10}
          style={[s.teacherPlay, { borderColor: teacher.color }]}
        >
          {previewing ? (
            <ActivityIndicator size="small" color={teacher.color} />
          ) : (
            <Ionicons name="volume-high" size={15} color={teacher.color} />
          )}
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
