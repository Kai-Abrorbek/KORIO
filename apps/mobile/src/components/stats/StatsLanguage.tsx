import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Pressable } from "@/components/ui/Pressables";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useSettingsStore } from "@/store/settings.store";
import {
  LEARN_COURSES,
  isLearnCourse,
  type LearnCourse,
} from "@/constants/learnCourses";
import { statsLanguageOptions } from "@/utils/stats-language";

/**
 * 통계 화면이 지금 보여주는 언어.
 *
 * 처음엔 지금 배우는 코스. 화면 위 국기로 바꿔 볼 수 있다 — 이 선택은 통계 화면 안에서만
 * 쓰고 학습 코스는 안 바꾼다. 연속 학습일·달력은 계정 공통이라 여기 안 묶인다.
 */
interface StatsLanguageValue {
  language: LearnCourse;
  setLanguage: (language: LearnCourse) => void;
  /** 고를 수 있는 언어 — 최근 1년에 공부한 언어 + 지금 코스 (등록 순서) */
  options: LearnCourse[];
  /** 기간 통계 응답의 studiedLanguages 를 알려 준다 */
  reportStudied: (languages: readonly string[] | undefined) => void;
}

const StatsLanguageContext = createContext<StatsLanguageValue>({
  language: "ko",
  setLanguage: () => undefined,
  options: ["ko"],
  reportStudied: () => undefined,
});

export const useStatsLanguage = () => useContext(StatsLanguageContext);

export function StatsLanguageProvider({ children }: { children: ReactNode }) {
  const learnCourse = useSettingsStore((st) => st.learnCourse);
  const [language, setLanguage] = useState<LearnCourse>(learnCourse);
  const [studied, setStudied] = useState<LearnCourse[]>([]);

  // 코스를 바꾸고 오면 그 코스 통계부터
  useEffect(() => setLanguage(learnCourse), [learnCourse]);

  const reportStudied = useCallback(
    (languages: readonly string[] | undefined) => {
      const next = (languages ?? []).filter(isLearnCourse);
      setStudied((current) =>
        current.length === next.length &&
        current.every((value, index) => value === next[index])
          ? current
          : next,
      );
    },
    [],
  );

  const options = useMemo(
    () => statsLanguageOptions(learnCourse, language, studied),
    [learnCourse, language, studied],
  );

  const value = useMemo(
    () => ({ language, setLanguage, options, reportStudied }),
    [language, options, reportStudied],
  );
  return (
    <StatsLanguageContext.Provider value={value}>
      {children}
    </StatsLanguageContext.Provider>
  );
}

const SEGMENT = 40;
const PAD = 3;

/** 상단 탭 오른쪽 국기 전환. 언어가 하나뿐이면 안 보인다 */
export function StatsLanguageSwitch() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const { language, setLanguage, options } = useStatsLanguage();
  const index = Math.max(0, options.indexOf(language));

  const x = useSharedValue(index * SEGMENT);
  useEffect(() => {
    x.value = withTiming(index * SEGMENT, {
      duration: 240,
      easing: Easing.out(Easing.cubic),
    });
  }, [index, x]);
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  if (options.length < 2) return null;

  return (
    <View
      accessibilityRole="tablist"
      style={[s.track, { width: options.length * SEGMENT + PAD * 2 }]}
    >
      <Animated.View style={[s.thumb, thumbStyle]} />
      {options.map((course) => {
        const active = course === language;
        const name = t(`courses.languages.${LEARN_COURSES[course].key}`);
        return (
          <Pressable
            key={course}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={t("stats.languageSwitch", { language: name })}
            hitSlop={6}
            onPress={() => setLanguage(course)}
            style={({ pressed }) => [
              s.segment,
              pressed && !active && s.segmentPressed,
            ]}
          >
            <Text style={[s.flag, !active && s.flagIdle]}>
              {LEARN_COURSES[course].flag}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    track: {
      flexDirection: "row",
      alignSelf: "center",
      marginLeft: "auto",
      padding: PAD,
      borderRadius: 14,
      backgroundColor: theme.border,
    },
    thumb: {
      position: "absolute",
      top: PAD,
      left: PAD,
      width: SEGMENT,
      bottom: PAD,
      borderRadius: 11,
      backgroundColor: theme.surface,
      // 입체감 — 바닥 테두리 (앱 버튼과 같은 말투)
      borderWidth: 1.5,
      borderBottomWidth: 3,
      borderColor: theme.primary,
    },
    segment: {
      width: SEGMENT,
      height: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    segmentPressed: { transform: [{ translateY: 1 }] },
    flag: { fontSize: 18, lineHeight: 22 },
    flagIdle: { opacity: 0.45 },
  });
