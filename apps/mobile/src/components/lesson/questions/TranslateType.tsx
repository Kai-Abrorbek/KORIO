import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import type { ThemeColors } from "@/constants/theme";
import { useSpeechRecorder } from "@/hooks/useSpeechRecorder";
import { SttService } from "@/services/stt.service";
import type { AnswerState, LessonQuestion } from "@/types/lesson";
import CheckButton from "../CheckButton";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  isChecking?: boolean;
  theme: ThemeColors;
}

const MIC_BLUE = "#1CB0F6";
const CORRECT = "#22B573";
const WRONG = "#FF4B4B";

function cleanSourceText(value: string) {
  const withoutInstruction = value.replace(
    /^(?:Koreyscha yozing|Type in Korean|Напишите по-корейски)\s*:\s*/iu,
    "",
  );

  if (withoutInstruction === value) return value;
  return withoutInstruction
    .replace(/^["“«]\s*/u, "")
    .replace(/\s*["”»]$/u, "")
    .trim();
}

export default function TranslateType({
  question,
  answerState,
  onAnswer,
  isChecking = false,
  theme,
}: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const compact = height < 740;
  const s = styles(theme, insets.bottom);
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [voiceErrorKey, setVoiceErrorKey] = useState<string | null>(null);

  const locked = answerState !== "idle" || isChecking;
  const accent =
    answerState === "correct"
      ? CORRECT
      : answerState === "wrong"
        ? WRONG
        : theme.primary;
  const sourceText = cleanSourceText(
    question.sourceText?.trim() ||
      question.npcText?.trim() ||
      question.question?.trim() ||
      "",
  );

  // 여기선 발음 평가가 아니라 받아쓰기만 한다. 인식 결과를 입력칸에 채우고
  // 채점은 기존 텍스트 비교 및 스마트 채점 흐름이 그대로 담당한다.
  const { isRecording, start, stop } = useSpeechRecorder({
    maxSeconds: 15,
    onResult: async (wav) => {
      setTranscribing(true);
      try {
        const res = await SttService.transcribe(wav);
        if (res.status === "success" && res.text.trim()) {
          setInput(res.text.trim());
        } else {
          setVoiceErrorKey("lesson.speaking.noSpeech");
        }
      } catch {
        setVoiceErrorKey("lesson.speaking.checkFailed");
      } finally {
        setTranscribing(false);
      }
    },
    onError: (code) =>
      setVoiceErrorKey(
        code === "unsupported"
          ? "lesson.speaking.notSupportedHere"
          : code === "permission"
            ? "lesson.speaking.micDenied"
            : code === "too_short"
              ? "lesson.speaking.tooShort"
              : "lesson.speaking.micFailed",
      ),
  });

  const recording = isRecording;
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = recording
      ? withRepeat(
          withSequence(
            withTiming(1.14, { duration: 450 }),
            withTiming(1, { duration: 450 }),
          ),
          -1,
        )
      : withTiming(1);
  }, [pulse, recording]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const toggleVoice = () => {
    if (locked || transcribing) return;
    if (recording) {
      stop();
      return;
    }
    setVoiceErrorKey(null);
    void start();
  };

  const check = () => {
    if (!input.trim() || locked || recording || transcribing) return;
    onAnswer(input.trim());
  };

  const changeInput = (value: string) => {
    setInput(value);
    if (voiceErrorKey) setVoiceErrorKey(null);
  };

  return (
    <Animated.View entering={FadeIn.duration(180)} style={s.container}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View entering={FadeInDown.duration(320)} style={s.header}>
          <View
            style={[s.headerIcon, { backgroundColor: `${theme.primary}14` }]}
          >
            <Ionicons name="language" size={23} color={theme.primary} />
          </View>
          <View style={s.headerCopy}>
            <Text style={s.title}>{t("lesson.translateSentence")}</Text>
            <Text style={s.subtitle}>{t("lesson.translateTypeHint")}</Text>
          </View>
          {question.hard ? (
            <View style={s.hardBadge}>
              <MaterialCommunityIcons name="dumbbell" size={14} color="#fff" />
              <Text style={s.hardText}>{t("lesson.hardPractice")}</Text>
            </View>
          ) : null}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(70).duration(340)}>
          <LinearGradient
            colors={[`${theme.primary}1F`, `${MIC_BLUE}12`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[s.sourceCard, compact && s.sourceCardCompact]}
          >
            <View style={s.sourceOrbLarge} />
            <View style={s.sourceOrbSmall} />
            <View style={s.sourceTopRow}>
              <View style={s.sourceLabelWrap}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={15}
                  color={theme.primary}
                />
                <Text style={[s.sourceLabel, { color: theme.primary }]}>
                  {t("lesson.sourceSentence")}
                </Text>
              </View>
              <View
                style={[s.directionPill, { backgroundColor: theme.surface }]}
              >
                <Text style={[s.directionText, { color: theme.primary }]}>
                  {t("lesson.toKorean")}
                </Text>
                <Ionicons name="arrow-forward" size={13} color={theme.primary} />
              </View>
            </View>

            <View style={s.sourceQuoteRow}>
              <Text style={[s.quoteMark, { color: `${theme.primary}80` }]}>
                {"“"}
              </Text>
              <Text
                style={[
                  s.sourceText,
                  compact && s.sourceTextCompact,
                  { color: theme.text },
                ]}
              >
                {sourceText}
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(120).duration(340)}
          style={[
            s.answerCard,
            compact && s.answerCardCompact,
            {
              backgroundColor: theme.surface,
              borderColor:
                focused || answerState !== "idle" ? accent : theme.border,
              shadowColor: theme.text,
            },
          ]}
        >
          <View style={s.answerTopRow}>
            <View style={s.answerLabelWrap}>
              <View
                style={[s.answerIcon, { backgroundColor: `${accent}14` }]}
              >
                <Ionicons
                  name={
                    answerState === "correct"
                      ? "checkmark"
                      : answerState === "wrong"
                        ? "close"
                        : "create-outline"
                  }
                  size={17}
                  color={accent}
                />
              </View>
              <Text style={[s.answerLabel, { color: theme.text }]}>
                {t("lesson.yourKoreanAnswer")}
              </Text>
            </View>
            {input && !locked ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("lesson.clearAnswer")}
                hitSlop={8}
                onPress={() => setInput("")}
                style={({ pressed }) => [
                  s.clearButton,
                  { backgroundColor: `${theme.textSecondary}10` },
                  pressed && s.pressed,
                ]}
              >
                <Ionicons
                  name="close-circle"
                  size={18}
                  color={theme.textSecondary}
                />
                <Text style={[s.clearText, { color: theme.textSecondary }]}>
                  {t("lesson.clear")}
                </Text>
              </Pressable>
            ) : null}
          </View>

          <TextInput
            style={[
              s.input,
              compact && s.inputCompact,
              { color: theme.text },
            ]}
            value={input}
            onChangeText={changeInput}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={t("lesson.enterKoreanAnswer")}
            placeholderTextColor={`${theme.textSecondary}A6`}
            editable={!locked}
            multiline
            maxLength={300}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            textAlignVertical="top"
            onSubmitEditing={check}
          />

          <View style={[s.answerDivider, { backgroundColor: theme.border }]} />
          <View style={s.answerFooter}>
            <View style={[s.koreanDot, { backgroundColor: accent }]} />
            <Text style={[s.answerHelper, { color: theme.textSecondary }]}>
              {t("lesson.answerInKorean")}
            </Text>
            <Text style={[s.characterCount, { color: theme.textSecondary }]}>
              {input.length}/300
            </Text>
          </View>
        </Animated.View>

        {!!voiceErrorKey && !locked ? (
          <Animated.View entering={FadeIn.duration(180)} style={s.errorCard}>
            <Ionicons name="alert-circle" size={17} color={WRONG} />
            <Text style={s.voiceError}>{t(voiceErrorKey)}</Text>
          </Animated.View>
        ) : null}
      </ScrollView>

      <Animated.View
        entering={FadeInDown.delay(170).duration(340)}
        style={s.actions}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("lesson.tapToSpeak")}
          accessibilityState={{ disabled: locked || transcribing }}
          onPress={toggleVoice}
          disabled={locked || transcribing}
          style={({ pressed }) => [
            s.micButton,
            {
              backgroundColor: recording ? MIC_BLUE : `${MIC_BLUE}0E`,
              borderColor: recording ? MIC_BLUE : `${MIC_BLUE}35`,
            },
            pressed && s.pressed,
            (locked || transcribing) && s.disabled,
          ]}
        >
          <Animated.View
            style={[
              s.micIcon,
              {
                backgroundColor: recording
                  ? "rgba(255,255,255,0.2)"
                  : MIC_BLUE,
              },
              pulseStyle,
            ]}
          >
            <Ionicons
              name={
                transcribing ? "sparkles" : recording ? "stop" : "mic"
              }
              size={20}
              color="#FFFFFF"
            />
          </Animated.View>
          <View style={s.micCopy}>
            <Text
              style={[
                s.micText,
                { color: recording ? "#FFFFFF" : MIC_BLUE },
              ]}
            >
              {recording
                ? t("lesson.recording")
                : transcribing
                  ? t("lesson.speaking.analyzing")
                  : t("lesson.tapToSpeak")}
            </Text>
            {!compact && !recording ? (
              <Text style={[s.micHint, { color: theme.textSecondary }]}>
                {t("lesson.voiceFillsAnswer")}
              </Text>
            ) : null}
          </View>
          <Ionicons
            name={recording ? "pulse" : "chevron-forward"}
            size={18}
            color={recording ? "#FFFFFF" : MIC_BLUE}
          />
        </Pressable>

        <CheckButton
          onPress={check}
          disabled={!input.trim() || locked || recording || transcribing}
          loading={isChecking}
          theme={theme}
          style={s.checkButton}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = (theme: ThemeColors, bottomInset = 0) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 18,
      paddingTop: 4,
      paddingBottom: Math.max(4, bottomInset),
    },
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 14 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      marginBottom: 18,
    },
    headerIcon: {
      width: 44,
      height: 44,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    headerCopy: { flex: 1 },
    title: {
      color: theme.text,
      fontSize: 22,
      lineHeight: 27,
      fontWeight: "900",
      letterSpacing: -0.35,
    },
    subtitle: {
      color: theme.textSecondary,
      marginTop: 3,
      fontSize: 12,
      lineHeight: 17,
      fontWeight: "600",
    },
    hardBadge: {
      maxWidth: 96,
      minHeight: 30,
      paddingHorizontal: 9,
      borderRadius: 11,
      backgroundColor: WRONG,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
    },
    hardText: { color: "#FFFFFF", fontSize: 9.5, fontWeight: "900" },
    sourceCard: {
      minHeight: 142,
      borderRadius: 24,
      padding: 18,
      overflow: "hidden",
      marginBottom: 14,
      borderWidth: 1,
      borderColor: `${theme.primary}20`,
    },
    sourceCardCompact: { minHeight: 118, padding: 15 },
    sourceOrbLarge: {
      position: "absolute",
      width: 148,
      height: 148,
      borderRadius: 74,
      right: -52,
      top: -76,
      backgroundColor: "rgba(255,255,255,0.28)",
    },
    sourceOrbSmall: {
      position: "absolute",
      width: 82,
      height: 82,
      borderRadius: 41,
      left: -35,
      bottom: -46,
      backgroundColor: "rgba(255,255,255,0.2)",
    },
    sourceTopRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },
    sourceLabelWrap: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    sourceLabel: { fontSize: 11.5, fontWeight: "900" },
    directionPill: {
      minHeight: 27,
      paddingHorizontal: 9,
      borderRadius: 99,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    directionText: { fontSize: 10.5, fontWeight: "900" },
    sourceQuoteRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginTop: 14,
      paddingRight: 4,
    },
    quoteMark: {
      width: 24,
      marginTop: -7,
      fontSize: 32,
      lineHeight: 38,
      fontWeight: "900",
    },
    sourceText: {
      flex: 1,
      color: theme.text,
      fontSize: 19,
      lineHeight: 27,
      fontWeight: "800",
      letterSpacing: -0.15,
    },
    sourceTextCompact: { fontSize: 17, lineHeight: 23 },
    answerCard: {
      minHeight: 220,
      borderWidth: 1.5,
      borderRadius: 24,
      padding: 16,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.06,
      shadowRadius: 14,
      elevation: 2,
    },
    answerCardCompact: { minHeight: 184, padding: 14 },
    answerTopRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },
    answerLabelWrap: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    answerIcon: {
      width: 30,
      height: 30,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    answerLabel: { flex: 1, fontSize: 13, fontWeight: "900" },
    clearButton: {
      minHeight: 30,
      paddingHorizontal: 8,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    clearText: { fontSize: 11, fontWeight: "800" },
    input: {
      minHeight: 124,
      paddingHorizontal: 2,
      paddingTop: 14,
      paddingBottom: 10,
      fontSize: 20,
      lineHeight: 29,
      fontWeight: "700",
    },
    inputCompact: { minHeight: 90, fontSize: 18, lineHeight: 26 },
    answerDivider: { height: 1 },
    answerFooter: {
      minHeight: 30,
      paddingTop: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    koreanDot: { width: 7, height: 7, borderRadius: 4 },
    answerHelper: { flex: 1, fontSize: 11, fontWeight: "700" },
    characterCount: { fontSize: 10.5, fontWeight: "700" },
    errorCard: {
      minHeight: 40,
      marginTop: 10,
      paddingHorizontal: 12,
      borderRadius: 13,
      backgroundColor: `${WRONG}14`,
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    voiceError: { flex: 1, color: WRONG, fontSize: 11.5, fontWeight: "700" },
    actions: { paddingTop: 10 },
    micButton: {
      minHeight: 58,
      borderWidth: 1.5,
      borderRadius: 18,
      paddingHorizontal: 11,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 10,
    },
    micIcon: {
      width: 38,
      height: 38,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
    },
    micCopy: { flex: 1 },
    micText: { fontSize: 14.5, fontWeight: "900" },
    micHint: { marginTop: 2, fontSize: 10.5, fontWeight: "600" },
    checkButton: { marginTop: 0 },
    pressed: { transform: [{ scale: 0.985 }], opacity: 0.88 },
    disabled: { opacity: 0.5 },
  });
