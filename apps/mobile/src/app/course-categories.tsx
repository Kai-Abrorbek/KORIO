import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "@/utils/haptics";
import { Ionicons } from "@expo/vector-icons";
import { TutorMascotIcon } from "@/features/voice-tutor/components/TutorMascotIcon";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import {
  LearnMode,
  learnModePath,
  useSettingsStore,
  type StudyMode,
} from "@/store/settings.store";
import { commitLearnMode, commitStudyMode } from "@/utils/learn-mode";
import { guidedEntryPath } from "@/utils/placement-level";
import { useFeatureAccess } from "@/features/subscription/useFeatureAccess";
import type { Feature } from "@/features/subscription/access";
import {
  TopikLevelModal,
  type TopikLevel,
} from "@/components/topik/TopikLevelModal";
import SwipeSlides, {
  useSegmentOnOpacity,
  useSegmentTextColor,
  useSegmentThumb,
} from "@/components/common/SwipeSlides";
import { useSwipeTabs } from "@/components/common/useSwipeTabs";

/** 세그먼트 순서 = 옆으로 넘기는 순서 */
const STUDY_MODES: StudyMode[] = ["guided", "free"];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * `guided: true` = 학습 로드 모드에서도 보인다.
 *
 * 학습 로드는 어휘 트랙 위에 하루치(문법 → 단어 → 레슨 → 실전 → 복습 → 마무리)를
 * 순서대로 깔아준다. 그 안에 들어가는 것(어휘·문법·문법문제·실전회화)을 여기서
 * 또 개별로 열게 두면 "오늘 할 일"이 두 갈래가 되어 로드가 의미를 잃는다.
 * 반대로 한글·듣기·토픽·발음·게임·단어카드는 로드가 짜주지 않으므로
 * 어느 모드에서든 들어갈 수 있어야 한다.
 *
 * 표현·말하기는 로드가 깔아주지는 않지만 **자기 순서를 스스로 관리한다**
 * (표현 로드맵, 말하기 주제별 진행률). 로드 모드에서 같이 보이면 오늘
 * 분량이 두 갈래가 되므로 guided: false 로 숨긴다.
 */
const CATEGORIES: Array<{
  key: string;
  category: string;
  icon: string;
  color: string;
  guided: boolean;
  /** 구독 게이트에서 쓰는 기능 키 */
  feature: Feature;
}> = [
  // 한글은 맨 앞. 아직 못 읽는 사람은 여기부터 시작해야 한다
  { key: "hangul", category: "hangul", icon: "text", color: "#7E57C2", guided: true, feature: "hangul" },
  { key: "vocab", category: "vocabulary", icon: "book", color: "#FF7043", guided: false, feature: "lesson" },
  { key: "grammar", category: "grammar", icon: "construct", color: "#5C6BC0", guided: false, feature: "grammar" },
  // 표현·말하기는 로드 모드에서 숨긴다.
  // 둘 다 자기 순서(표현 로드맵 / 주제별 세션)를 스스로 관리한다. 로드가
  // "오늘 할 일" 을 순서대로 깔아주는 화면에서 이것까지 보이면 오늘 분량이
  // 두 갈래가 되어 로드가 의미를 잃는다 — 어휘·문법을 뺀 것과 같은 이유다.
  // 자유 모드에서는 그대로 보인다.
  {
    key: "expression",
    category: "expression",
    icon: "chatbubble-ellipses",
    color: "#26A69A",
    guided: false,
    feature: "expression",
  },
  {
    key: "speaking",
    category: "speaking",
    icon: "mic",
    color: "#776EE2",
    guided: false,
    feature: "expression",
  },
  {
    // 로드가 짜주는 트랙이 아니라 언제든 들어갈 수 있다 → 두 모드 모두에서 보인다
    key: "conversation",
    category: "conversation",
    icon: "chatbubbles",
    // 통화 화면의 밤바다 청록. 라벤더 마스코트가 떠 보인다
    color: "#0F3446",
    guided: true,
    feature: "tutor",
  },
  {
    key: "listening",
    category: "listening",
    icon: "headset",
    color: "#42A5F5",
    guided: true,
    feature: "listening",
  },
  { key: "topik", category: "topik", icon: "ribbon", color: "#AB47BC", guided: true, feature: "topik" },
  {
    key: "pronunciation",
    category: "pronunciation",
    icon: "mic",
    color: "#FFA726",
    guided: true,
    feature: "pronunciation",
  },
  {
    key: "grammarPractice",
    category: "grammarPractice",
    icon: "barbell",
    color: "#7E57C2",
    guided: false,
    feature: "lesson",
  },
  {
    key: "games",
    category: "games",
    icon: "game-controller",
    color: "#5F4FD8",
    guided: true,
    feature: "games",
  },
  {
    key: "wordCard",
    category: "wordCard",
    icon: "albums",
    color: "#26C6DA",
    guided: true,
    feature: "words",
  },
];

function CategoryCard({
  c,
  label,
  desc,
  index,
  s,
  onTopikPress,
  requirePremium,
  locked,
}: {
  c: (typeof CATEGORIES)[number];
  label: string;
  desc: string;
  index: number;
  s: ReturnType<typeof getStyles>;
  onTopikPress: () => void;
  /** 구독 게이트. 통과하면 onAllowed 실행, 아니면 유도 모달 */
  requirePremium: (feature: Feature, onAllowed: () => void) => boolean;
  locked: boolean;
}) {
  const pressed = useSharedValue(0);
  const go = makeGo(c, onTopikPress);
  const aStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: pressed.value * 2 },
      { scale: 1 - pressed.value * 0.02 },
    ],
  }));
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 70).duration(420)}
      style={{ width: "48%" }}
    >
      <AnimatedPressable
        onPressIn={() => (pressed.value = withTiming(1, { duration: 80 }))}
        onPressOut={() => (pressed.value = withTiming(0, { duration: 120 }))}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

          // 구독이 필요한 분야면 여기서 멈추고 유도 모달을 띄운다.
          // 통과했을 때만 아래 이동 로직이 돈다.
          requirePremium(c.feature, () => go());
        }}
        style={[s.catCard, aStyle, locked && s.catCardLocked]}
      >
        {locked && (
          <View style={s.lockPill}>
            <Ionicons name="lock-closed" size={10} color="#fff" />
          </View>
        )}
        <View style={[s.catIcon, { backgroundColor: c.color }]}>
          {c.key === "conversation" ? (
            // 실전 회화 = AI 음성 튜터. 튜터 화면의 마스코트를 그대로 아이콘으로 쓴다
            <TutorMascotIcon size={26} />
          ) : (
            <Ionicons name={c.icon as any} size={22} color="#fff" />
          )}
        </View>
        <Text style={s.catLabel}>{label}</Text>
        <Text style={s.catDesc} numberOfLines={2}>
          {desc}
        </Text>
      </AnimatedPressable>
    </Animated.View>
  );
}

/** 카드를 눌렀을 때 실제로 가는 곳. 게이트를 통과한 뒤에만 불린다. */
function makeGo(
  c: (typeof CATEGORIES)[number],
  onTopikPress: () => void,
): () => void {
  return () => {
    // 아래 셋은 로드맵도 메인 페이지도 아닌 단발 바로가기다.
    // 학습 모드로 저장하면 홈의 "이어서 학습하기" 가 갈 곳을 잃는다.
    const SHORTCUTS: Record<string, string> = {
      pronunciation: "/pronunciation-practice",
      hangul: "/hangul",
      games: "/games",
      wordCard: "/word-study",
      // 실전 회화 = AI 음성 튜터. 로드맵이 없는 단발 진입이다
      // 회화 = 새 AI 음성 튜터 (옛 Gemini Live 튜터는 앱에서 뺐다)
      conversation: "/voice-tutor",
    };
    if (SHORTCUTS[c.category]) {
      router.push(SHORTCUTS[c.category] as any);
      return;
    }
    // 토픽은 급수를 골라야 해서 모달을 먼저 띄운다 (모드 저장도 거기서)
    if (c.category === "topik") {
      onTopikPress();
      return;
    }

    // 나머지는 전부 학습 모드로 기억하고(계정에 저장),
    // 목적지는 한 곳에서 계산한다.
    const mode = c.category as LearnMode;
    commitLearnMode(mode);
    // 학습 방식(가이드/자율)까지 넘겨야 어휘를 골랐을 때 하루치
    // 로드맵으로 간다. 안 넘기면 늘 자율 로드맵으로 떨어진다.
    router.push(
      learnModePath(mode, "1", useSettingsStore.getState().studyMode),
    );
  };
}

/**
 * 학습 로드로 들어가는 문.
 *
 * 원래 흐름(courses.tsx)에서는 모달에서 "학습 로드"를 고르면 이 화면을 건너뛰고
 * 바로 하루치 로드맵으로 갔다. 그런데 이 화면에서도 모드를 바꿀 수 있게 되면서,
 * 로드 모드일 때 어휘 카드를 감추면 정작 로드로 들어갈 길이 사라진다.
 * 그래서 로드 모드에서는 이 카드를 목록 맨 위에 세운다 — 오늘 할 일이 먼저고,
 * 아래 분야들은 로드가 안 덮는 곁가지라는 위계도 같이 드러난다.
 */
function GuidedEntry({
  s,
  t,
  onPress,
}: {
  s: ReturnType<typeof getStyles>;
  t: (k: string) => string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [s.guidedCard, pressed && s.guidedCardPressed]}
    >
      <View style={s.guidedIcon}>
        <Ionicons name="footsteps" size={24} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.guidedTitle}>{t("courses.guidedEntryTitle")}</Text>
        <Text style={s.guidedDesc} numberOfLines={2}>
          {t("courses.guidedEntryDesc")}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.9)" />
    </Pressable>
  );
}

const MODE_OPTIONS: { mode: StudyMode; icon: string; labelKey: string }[] = [
  { mode: "guided", icon: "footsteps", labelKey: "studyMode.guided" },
  { mode: "free", icon: "compass", labelKey: "studyMode.free" },
];

/**
 * 학습 로드 ↔ 자율 전환. 여기가 학습 모드를 고르는 화면이라 이 자리가 맞다.
 * 선택 배경·글자색은 progress 를 따라간다 — 아래 내용을 옆으로 밀면 같이 미끄러진다.
 */
function ModeSegment({
  onChange,
  progress,
  s,
  theme,
  t,
}: {
  onChange: (m: StudyMode) => void;
  progress: SharedValue<number>;
  s: ReturnType<typeof getStyles>;
  theme: ThemeColors;
  t: (k: string) => string;
}) {
  const { onLayout, thumbStyle } = useSegmentThumb(progress, { border: 2, gap: 4, inset: 4 });

  return (
    <View style={s.modeWrap}>
      <Text style={s.modeTitle}>{t("courses.modeTitle")}</Text>

      <View style={s.segment} onLayout={onLayout}>
        <Animated.View style={[s.segmentThumb, thumbStyle]} />
        {MODE_OPTIONS.map((o, slot) => (
          <ModeOption
            icon={o.icon}
            key={o.mode}
            label={t(o.labelKey)}
            onPress={() => onChange(o.mode)}
            progress={progress}
            s={s}
            slot={slot}
            theme={theme}
          />
        ))}
      </View>
    </View>
  );
}

function ModeOption({
  icon,
  label,
  onPress,
  progress,
  s,
  slot,
  theme,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  progress: SharedValue<number>;
  s: ReturnType<typeof getStyles>;
  slot: number;
  theme: ThemeColors;
}) {
  const textColor = useSegmentTextColor(progress, slot, theme.textSecondary, "#fff");
  const onOpacity = useSegmentOnOpacity(progress, slot);
  return (
    <Pressable onPress={onPress} style={s.segmentItem}>
      {/* 아이콘 색은 애니가 안 돼서 회색·흰색 두 벌을 겹쳐 두고 흰색을 비춘다 */}
      <View>
        <Ionicons name={icon as any} size={16} color={theme.textSecondary} />
        <Animated.View style={[StyleSheet.absoluteFill, onOpacity]}>
          <Ionicons name={icon as any} size={16} color="#fff" />
        </Animated.View>
      </View>
      <Animated.Text style={[s.segmentText, textColor]}>{label}</Animated.Text>
    </Pressable>
  );
}

export default function CourseCategories() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const [topikModalVisible, setTopikModalVisible] = useState(false);
  const { canUse, requirePremium } = useFeatureAccess();
  const studyMode = useSettingsStore((st) => st.studyMode);
  const modeIndex = Math.max(0, STUDY_MODES.indexOf(studyMode));
  // 아래 내용을 옆으로 밀어도 학습 방식이 바뀐다 (세그먼트를 누른 것과 같다)
  const modeProgress = useSharedValue(modeIndex);
  const { gesture: modeSwipe } = useSwipeTabs({
    count: STUDY_MODES.length,
    index: modeIndex,
    onIndexChange: (next) => commitStudyMode(STUDY_MODES[next] ?? studyMode),
    progress: modeProgress,
  });
  const { label } = useLocalSearchParams<{ lang?: string; label?: string }>();

  const selectTopikLevel = (level: TopikLevel) => {
    Haptics.selectionAsync();
    // 급수까지 계정에 저장해야 홈에서 그 급수로 바로 들어간다
    commitLearnMode("topik", level);
    setTopikModalVisible(false);
    router.push({ pathname: "/topik-sections", params: { level } });
  };

  // 방식마다 설명·로드 입구·분야 목록이 달라서 그 부분만 옆으로 넘긴다.
  // 학습 로드에서는 로드가 안 덮는 것만 남긴다 (CATEGORIES 주석 참고)
  const renderMode = (mode: StudyMode) => (
    <View>
      <Text style={s.modeNote}>
        {t(mode === "guided" ? "courses.modeGuidedNote" : "courses.modeFreeNote")}
      </Text>
      <Text style={s.modeHint}>{t("courses.modeHint")}</Text>

      {mode === "guided" && (
        <GuidedEntry
          s={s}
          t={t}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            // 학습 로드는 어휘 트랙 위에 깔린다. 모드와 트랙을 같이 맞춰야
            // 홈의 "이어서 학습하기" 도 여기로 온다.
            commitLearnMode("vocabulary");
            // 급수를 아직 안 골랐으면 그것부터. 골랐으면 바로 이어서 간다.
            router.push(guidedEntryPath());
          }}
        />
      )}

      <Text style={s.lead}>{t("courses.chooseCategory")}</Text>
      <View style={s.grid}>
        {CATEGORIES.filter((c) => mode === "free" || c.guided).map((c, i) => (
          <CategoryCard
            key={c.key}
            c={c}
            index={i}
            s={s}
            label={t(`courses.categories.${c.key}`)}
            desc={t(`courses.categoryDesc.${c.key}`)}
            onTopikPress={() => setTopikModalVisible(true)}
            requirePremium={requirePremium}
            locked={!canUse(c.feature)}
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={[s.container, { paddingTop: insets.top + 4 }]}>
      <View style={s.header}>
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/courses")
          }
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>
          {label ?? t("courses.chooseCategory")}
        </Text>
      </View>

      <GestureDetector gesture={modeSwipe}>
        <View style={s.swipeArea}>
          <ScrollView
            contentContainerStyle={[s.scroll, { paddingBottom: insets.bottom + 48 }]}
            showsVerticalScrollIndicator={false}
          >
            <ModeSegment
              onChange={commitStudyMode}
              progress={modeProgress}
              s={s}
              theme={theme}
              t={t}
            />

            <SwipeSlides
              bleed={20}
              index={modeIndex}
              progress={modeProgress}
              slides={[renderMode("guided"), renderMode("free")]}
            />
          </ScrollView>
        </View>
      </GestureDetector>
      <TopikLevelModal
        visible={topikModalVisible}
        onClose={() => setTopikModalVisible(false)}
        onSelect={selectTopikLevel}
      />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    headerTitle: { fontSize: 22, fontWeight: "700", color: theme.text },
    scroll: { paddingHorizontal: 20, paddingTop: 12 },
    swipeArea: { flex: 1 },
    guidedCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      backgroundColor: theme.primary,
      borderRadius: 18,
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 4,
      borderBottomColor: "#5448E0",
      marginBottom: 20,
    },
    guidedCardPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 2 },
    guidedIcon: {
      width: 46,
      height: 46,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.2)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.26)",
    },
    guidedTitle: { fontSize: 16.5, fontWeight: "900", color: "#fff" },
    guidedDesc: {
      fontSize: 12.5,
      fontWeight: "600",
      color: "rgba(255,255,255,0.88)",
      lineHeight: 17,
      marginTop: 2,
    },

    modeWrap: { marginBottom: 0 },
    modeTitle: {
      fontSize: 15,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 10,
    },
    segment: {
      flexDirection: "row",
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 14,
      padding: 4,
      gap: 4,
    },
    // 선택 배경 — useSegmentThumb 이 위치·폭을 잡는다 (border 2 · padding 4 · gap 4 와 맞춰야 한다)
    segmentThumb: { backgroundColor: theme.primary, borderRadius: 10 },
    segmentItem: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 9,
      borderRadius: 10,
    },
    segmentText: {
      fontSize: 13.5,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    modeNote: {
      fontSize: 12.5,
      fontWeight: "600",
      color: theme.textSecondary,
      lineHeight: 17,
      marginTop: 10,
    },
    modeHint: {
      fontSize: 11.5,
      fontWeight: "600",
      color: theme.textSecondary,
      opacity: 0.75,
      marginTop: 4,
      marginBottom: 22,
    },
    lead: {
      fontSize: 15,
      color: theme.textSecondary,
      fontWeight: "500",
      marginBottom: 20,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      justifyContent: "space-between",
    },
    catCard: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 18,
      paddingVertical: 14,
      paddingHorizontal: 13,
      minHeight: 118,
      gap: 7,
    },
    // 잠긴 카드는 죽은 게 아니라 "아직 안 산 것"으로 보여야 한다.
    // 회색으로 눕히지 않고 테두리만 보라색으로 바꿔서 눈에 띄게 둔다.
    catCardLocked: {
      borderColor: theme.primary + "55",
      borderBottomColor: theme.primary + "77",
    },
    lockPill: {
      position: "absolute",
      top: 8,
      right: 8,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: "#776ee2",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    },
    catIcon: {
      width: 42,
      height: 42,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
    },
    catLabel: { fontSize: 15, fontWeight: "800", color: theme.text },
    catDesc: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: "500",
      lineHeight: 16,
    },
  });
