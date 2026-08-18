import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useSpeech } from "@/hooks/useSpeech";
import CheckButton from "../CheckButton";
import BlankSentence from "../BlankSentence";
import {
  answersOf,
  blankCount,
  fillTemplate,
  isComplete,
  parseBlanks,
  templateOf,
  toAnswerPayload,
} from "@/utils/blank-sentence";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
}

const CORRECT = "#1CB454";
const WRONG = "#FF4B4B";
const AUDIO_BLUE = "#4A90D9";

export default function FillInBlank({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const compact = height < 720;
  const s = styles(theme, insets.bottom);
  const { speak, stop, isSpeaking } = useSpeech();
  const locked = answerState !== "idle";
  const instruction = question.question?.trim() || t("lesson.fillBlank");

  const options = question.options ?? [];

  // 빈칸 개수만큼 슬롯을 잡는다. 기존 단일 빈칸 문항은
  // sentencePrefix + ___ + sentenceSuffix 로 조립되어 그대로 동작한다.
  const tokens = useMemo(
    () => parseBlanks(templateOf(question)),
    [
      question.sentenceTemplate,
      question.sentencePrefix,
      question.sentenceSuffix,
    ],
  );
  const total = blankCount(tokens);

  const completedSentence = useMemo(
    () => fillTemplate(tokens, answersOf(question)),
    [question, tokens],
  );
  const speechText = useMemo(() => {
    const fullSentence = completedSentence || question.audioText?.trim() || "";

    // 빈칸 문항의 문장 끝 괄호는 보통 활용 전 기본형 힌트다.
    // 화면에는 남기되 TTS 에서는 제외해 자연스러운 완성 문장만 읽는다.
    return fullSentence.replace(/\s*\([^()]*\)\s*$/u, "").trim();
  }, [completedSentence, question.audioText]);

  const [values, setValues] = useState<(string | null)[]>(() =>
    Array(total).fill(null),
  );
  const [activeIndex, setActiveIndex] = useState(0);

  // 문제가 바뀌면 초기화
  useEffect(() => {
    stop();
    setValues(Array(total).fill(null));
    setActiveIndex(0);
  }, [question.id, stop, total]);

  /** 선택지 탭: 이미 쓰인 값이면 회수, 아니면 활성 빈칸에 채운다 */
  const pickOption = (opt: string) => {
    if (locked) return;
    setValues((prev) => {
      const used = prev.indexOf(opt);
      if (used !== -1) {
        const next = [...prev];
        next[used] = null;
        setActiveIndex(used);
        return next;
      }
      const target =
        prev[activeIndex] === null ? activeIndex : prev.indexOf(null);
      if (target === -1) return prev;
      const next = [...prev];
      next[target] = opt;
      const following = next.findIndex((v) => v === null);
      setActiveIndex(following === -1 ? target : following);
      return next;
    });
  };

  const clearBlank = (index: number) => {
    if (locked) return;
    setActiveIndex(index);
    setValues((prev) => {
      if (prev[index] === null) return prev;
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const complete = isComplete(tokens, values);
  const filledCount = values.filter((value) => value?.trim()).length;
  const accent =
    answerState === "correct"
      ? CORRECT
      : answerState === "wrong"
        ? WRONG
        : theme.primary;

  const check = () => {
    if (!complete || locked) return;
    onAnswer(toAnswerPayload(question, tokens, values));
  };

  const playSentence = () => {
    if (!speechText) return;
    if (isSpeaking) {
      stop();
      return;
    }
    speak(speechText);
  };

  return (
    <Animated.View entering={FadeIn.duration(150)} style={s.container}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.header}>
          <View style={s.headerIcon}>
            <Ionicons name="create-outline" size={22} color={theme.primary} />
          </View>
          <View style={s.headingCopy}>
            <Text style={s.title}>{instruction}</Text>
            <Text style={s.subtitle}>{t("lesson.fillBlankHint")}</Text>
          </View>
        </View>

        {/* 문장 + 빈칸 (빈칸 개수 제한 없음) */}
        <View
          style={[
            s.sentenceCard,
            compact && s.sentenceCardCompact,
            { borderColor: `${accent}38` },
          ]}
        >
          <View style={s.cardTopRow}>
            <View style={[s.progressPill, { backgroundColor: `${accent}14` }]}>
              <Ionicons
                name={complete ? "checkmark-circle" : "ellipsis-horizontal"}
                size={16}
                color={accent}
              />
              <Text style={[s.progressText, { color: accent }]}>
                {filledCount}/{total}
              </Text>
            </View>
          </View>

          <View style={s.sentenceRow}>
            <BlankSentence
              tokens={tokens}
              values={values}
              theme={theme}
              answerState={answerState}
              mode="select"
              activeIndex={activeIndex}
              onBlankPress={clearBlank}
              fontSize={compact ? 20 : 22}
            />
          </View>

          <View style={[s.divider, { backgroundColor: theme.border }]} />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t(
              isSpeaking ? "lesson.stopAudio" : "lesson.playFullSentence",
            )}
            disabled={!speechText}
            onPress={playSentence}
            style={({ pressed }) => [
              s.listenButton,
              {
                backgroundColor: isSpeaking
                  ? AUDIO_BLUE
                  : `${AUDIO_BLUE}12`,
              },
              pressed && s.listenButtonPressed,
              !speechText && s.disabled,
            ]}
          >
            <View
              style={[
                s.listenIcon,
                {
                  backgroundColor: isSpeaking
                    ? "rgba(255,255,255,0.18)"
                    : AUDIO_BLUE,
                },
              ]}
            >
              <Ionicons
                name={isSpeaking ? "stop" : "volume-high"}
                size={20}
                color="#FFFFFF"
              />
            </View>
            <Text
              style={[
                s.listenText,
                { color: isSpeaking ? "#FFFFFF" : AUDIO_BLUE },
              ]}
            >
              {t(
                isSpeaking ? "lesson.stopAudio" : "lesson.playFullSentence",
              )}
            </Text>
            <Ionicons
              name={isSpeaking ? "pulse" : "chevron-forward"}
              size={18}
              color={isSpeaking ? "#FFFFFF" : AUDIO_BLUE}
            />
          </Pressable>
        </View>

        {/* 선택지 */}
        <View style={s.optionsSection}>
          <View style={s.optionsHeader}>
            <Text style={s.optionsTitle}>{t("lesson.fillBlankOptions")}</Text>
            {complete ? (
              <Ionicons name="checkmark-circle" size={20} color={accent} />
            ) : null}
          </View>
          <View style={s.optionsRow}>
            {options.map((opt, index) => {
              const isSel = values.includes(opt);
              return (
                <Animated.View
                  entering={FadeInDown.delay(index * 45).duration(220)}
                  key={`${opt}-${index}`}
                >
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={opt}
                    accessibilityState={{ disabled: locked, selected: isSel }}
                    disabled={locked}
                    onPress={() => pickOption(opt)}
                    style={({ pressed }) => [
                      s.option,
                      { borderColor: theme.border },
                      isSel && {
                        borderColor: accent,
                        backgroundColor: accent,
                      },
                      pressed && s.optionPressed,
                      locked && !isSel && s.optionLocked,
                    ]}
                  >
                    <Text
                      style={[
                        s.optionText,
                        { color: theme.text },
                        isSel && s.optionTextSelected,
                      ]}
                    >
                      {opt}
                    </Text>
                    {isSel ? (
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="#FFFFFF"
                      />
                    ) : null}
                  </Pressable>
                </Animated.View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <CheckButton
        onPress={check}
        disabled={!complete || locked}
        theme={theme}
      />
    </Animated.View>
  );
}

const styles = (theme: ThemeColors, bottomInset = 0) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 6,
      paddingBottom: Math.max(4, bottomInset),
    },
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 20 },
    header: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 12,
      marginBottom: 22,
    },
    headerIcon: {
      width: 42,
      height: 42,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: `${theme.primary}14`,
    },
    headingCopy: { flex: 1, paddingTop: 1 },
    title: {
      fontSize: 22,
      lineHeight: 28,
      fontWeight: "900",
      color: theme.text,
    },
    subtitle: {
      marginTop: 5,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "600",
      color: theme.textSecondary,
    },
    sentenceCard: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderRadius: 24,
      padding: 18,
      marginBottom: 18,
      shadowColor: "#16102B",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.06,
      shadowRadius: 14,
      elevation: 2,
    },
    sentenceCardCompact: { padding: 15 },
    cardTopRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginBottom: 12,
    },
    progressPill: {
      minWidth: 54,
      height: 28,
      paddingHorizontal: 10,
      borderRadius: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
    },
    progressText: { fontSize: 13, fontWeight: "900" },
    sentenceRow: {
      minHeight: 82,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      paddingVertical: 4,
    },
    divider: { height: 1, marginTop: 10, marginBottom: 12 },
    listenButton: {
      minHeight: 52,
      borderRadius: 16,
      paddingHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    listenButtonPressed: { transform: [{ scale: 0.985 }], opacity: 0.9 },
    listenIcon: {
      width: 34,
      height: 34,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
    },
    listenText: { flex: 1, fontSize: 15, fontWeight: "800" },
    disabled: { opacity: 0.45 },
    optionsSection: {
      backgroundColor: `${theme.primary}08`,
      borderWidth: 1,
      borderColor: `${theme.primary}18`,
      borderRadius: 22,
      padding: 15,
    },
    optionsHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
      paddingHorizontal: 2,
    },
    optionsTitle: {
      fontSize: 14,
      fontWeight: "900",
      color: theme.textSecondary,
    },
    optionsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    option: {
      minHeight: 50,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderBottomWidth: 3.5,
      borderRadius: 15,
      paddingVertical: 11,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
    },
    optionPressed: { transform: [{ translateY: 2 }], opacity: 0.88 },
    optionLocked: { opacity: 0.5 },
    optionText: { fontSize: 17, fontWeight: "800" },
    optionTextSelected: { color: "#FFFFFF" },
  });
