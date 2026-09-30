import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState } from "@/types/lesson";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSpeech } from "@/hooks/useSpeech";
import { speechLanguageOf } from "@/utils/speech-language";
import LessonCharacter from "../LessonCharacter";
import CheckButton from "../CheckButton";
import BlankSentence from "../BlankSentence";
import {
  blankCount,
  isComplete,
  parseBlanks,
  templateOf,
  toAnswerPayload,
} from "@/utils/blank-sentence";
import { useContentLang } from "@/store/settings.store";

/** 말풍선 지문이 한국어인지 학습자 언어인지 가른다 */
const HANGUL = /[\u3131-\u318E\uAC00-\uD7A3]/;

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  isChecking?: boolean;
  theme: ThemeColors;
}

export default function TypeAnswer({
  question,
  answerState,
  onAnswer,
  isChecking = false,
  theme,
}: Props) {
  const { t } = useTranslation();
  const contentLang = useContentLang();
  const insets = useSafeAreaInsets();
  const s = styles(theme, insets.bottom);
  const inputRefs = useRef<Record<number, TextInput | null>>({});
  const { speak, isSpeaking } = useSpeech();
  const locked = answerState !== "idle" || isChecking;
  // 말풍선에 무엇을 띄우나.
  //
  //   npcText           : 한국어 지문이 따로 있는 문항 (71개)
  //   answerTranslation : 나머지 — 학습자 언어로 된 "이 뜻을 한국어로 써라"
  //
  // 예전엔 둘 다 없으면 `question.answer` 로 폴백했다. 그게 **한국어 정답을
  // 말풍선에 그대로 띄우는** 짓이었다. 답이 보이면 문제가 아니다.
  // 서버가 type_answer 를 GRAMMAR_PROMPT_TYPES 에 넣어 answerTranslation 을
  // ko→en 폴백으로 내려주도록 고쳤고, 여기선 answer 폴백을 없앤다.
  // 그래도 비면 말풍선을 아예 안 그린다 — 빈 칸이 정답 노출보다 낫다.
  const promptText = question.npcText || question.answerTranslation || "";
  // 지문이 한국어인지 학습자 언어인지에 따라 TTS 언어가 갈린다.
  //
  // 예전엔 "npcText 에서 왔으면 한국어" 로 판단했다. 이제 서버가 npcText 를
  // 학습자 언어로 번역해 내려주기도 해서(npcTextI18n) 출처로는 알 수 없다.
  // **글자를 보고 정한다** — 한글이 있으면 한국어, 없으면 학습자 언어.
  const promptLang = HANGUL.test(promptText)
    ? "ko-KR"
    : speechLanguageOf(contentLang);

  // 빈칸 개수 제한 없음. 기존 단일 빈칸 문항은
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

  /**
   * 한 칸만 있고 문장이 없으면 "이 뜻의 한국어 단어를 써라" 문제다.
   * 이때는 문장 속 작은 칸 대신 큰 입력 상자를 쓴다 — 작은 칸에 커서만 깜빡이면
   * 뭘 써야 하는지도, 몇 글자인지도 안 보인다 (2026-09-30 Kai).
   */
  const soleWord = total === 1 && tokens.length === 1;
  const expected = (question.blankAnswers?.[0] ?? question.answer ?? "").trim();
  /** 기본형(…다)을 쓰는 문제면 그걸 알려 준다. 문장 속 빈칸이면 "문장에 맞는 형태" */
  const formHint = soleWord
    ? /다$/.test(expected)
      ? t("lesson.typeAnswerDictForm")
      : null
    : t("lesson.typeAnswerFitForm");

  // 키보드가 올라오면 캐릭터를 치운다. 안 그러면 입력 칸과 확인 버튼이 키보드 밑에 깔린다
  const [kbUp, setKbUp] = useState(false);
  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setKbUp(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKbUp(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  const [focused, setFocused] = useState(false);

  const [values, setValues] = useState<(string | null)[]>(() =>
    Array(total).fill(""),
  );

  useEffect(() => {
    setValues(Array(total).fill(""));
  }, [question.id, total]);

  const setValue = (index: number, text: string) =>
    setValues((prev) => {
      const next = [...prev];
      next[index] = text;
      return next;
    });

  const complete = isComplete(tokens, values);

  const handleCheck = () => {
    if (!complete || locked) return;
    onAnswer(toAnswerPayload(question, tokens, values));
  };

  const underlineColor =
    answerState === "correct"
      ? "#1CB454"
      : answerState === "wrong"
        ? "#FF4B4B"
        : theme.primary;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Animated.View entering={FadeIn.duration(150)} style={s.container}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={s.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* 제목.
              말풍선이 학습자 언어의 뜻 문장을 들고 있으면 제목엔 공용 문구만
              둔다. 문제별 지시문까지 띄우면 **지문이 둘**이 되고, 실제로 둘이
              어긋난 문항이 있었다.
              npcText(한국어 지문)일 때는 반대다. 문제별 지시문이 없으면 뭘
              하라는 건지 알 수 없다. */}
          <Text style={s.title}>
            {promptText && !question.npcText
              ? t("lesson.typeAnswerTitle")
              : question.question || t("lesson.typeAnswerTitle")}
          </Text>

          {/* 캐릭터 + 말풍선. 키보드가 올라오면 캐릭터는 빠지고 말풍선만 남는다 */}
          <View style={[s.npcRow, kbUp && s.npcRowCompact]}>
            {!kbUp && (
              <LessonCharacter
                state={answerState}
                seed={question.id}
                height={150}
              />
            )}
            {!!promptText && (
              <View style={s.bubble}>
                {!kbUp && <View style={s.tailBorder} />}
                {!kbUp && <View style={s.tailInner} />}

                <TouchableOpacity
                  onPress={() => speak(promptText, promptLang)}
                  hitSlop={8}
                >
                  <Ionicons
                    name="volume-medium"
                    size={24}
                    color={isSpeaking ? theme.primary : "#1A9BE6"}
                  />
                </TouchableOpacity>
                <View style={s.bubbleTextWrap}>
                  <Text style={s.bubbleText}>{promptText}</Text>
                  <View style={s.dashedUnderline} />
                </View>
              </View>
            )}
          </View>

          {soleWord ? (
            /* 단어 하나를 쓰는 문제 — 큰 입력 상자 */
            <View
              style={[
                s.wordBox,
                {
                  borderColor:
                    answerState !== "idle"
                      ? underlineColor
                      : focused
                        ? theme.primary
                        : theme.border,
                },
              ]}
            >
              <TextInput
                ref={(el) => {
                  inputRefs.current[0] = el;
                }}
                style={[
                  s.wordInput,
                  {
                    color:
                      underlineColor === theme.primary
                        ? theme.text
                        : underlineColor,
                  },
                ]}
                value={values[0] ?? ""}
                onChangeText={(txt) => setValue(0, txt)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={t("lesson.typeAnswerPlaceholder")}
                placeholderTextColor={theme.textSecondary + "99"}
                editable={!locked}
                autoFocus
                autoCorrect={false}
                spellCheck={false}
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={handleCheck}
              />
            </View>
          ) : (
            /* 문장 속 빈칸 — 문장을 카드에 담아 칸이 눈에 띄게 */
            <View style={s.sentenceCard}>
              <BlankSentence
                tokens={tokens}
                values={values}
                theme={theme}
                answerState={answerState}
                mode="input"
                onChange={setValue}
                onSubmit={handleCheck}
                autoFocusFirst
                fontSize={21}
              />
            </View>
          )}

          {/* 무엇을 써야 하는지 한 줄로 */}
          {!!formHint && answerState === "idle" && (
            <View style={s.hintRow}>
              <Ionicons
                name="information-circle"
                size={16}
                color={theme.primary}
              />
              <Text style={s.hintText}>{formHint}</Text>
            </View>
          )}
        </ScrollView>

        {/* 확인 버튼 — 스크롤 밖, 키보드 위 */}
        <CheckButton
          onPress={handleCheck}
          disabled={!complete || locked}
          loading={isChecking}
          theme={theme}
        />
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = (theme: ThemeColors, bottomInset = 0) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 12,
    },
    scroll: { flexGrow: 1, paddingBottom: 16 },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 20,
    },

    // 캐릭터 + 말풍선
    npcRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 28,
    },
    npcRowCompact: { marginBottom: 16 },
    bubble: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.border,
      paddingVertical: 14,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      minHeight: 72,
      position: "relative",
    },
    tailBorder: {
      position: "absolute",
      left: -12,
      top: "15%",
      marginTop: -9,
      width: 0,
      height: 0,
      borderTopWidth: 9,
      borderBottomWidth: 9,
      borderRightWidth: 12,
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      borderRightColor: theme.border,
    },
    tailInner: {
      position: "absolute",
      left: -8,
      top: "15%",
      marginTop: -7,
      width: 0,
      height: 0,
      borderTopWidth: 7,
      borderBottomWidth: 7,
      borderRightWidth: 10,
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      borderRightColor: theme.surface,
    },
    bubbleTextWrap: { flex: 1 },
    bubbleText: {
      fontSize: 16,
      color: theme.text,
      fontWeight: "600",
      lineHeight: 24,
    },
    dashedUnderline: {
      borderBottomWidth: 1.5,
      borderBottomColor: theme.textSecondary,
      borderStyle: "dashed",
      marginTop: 4,
    },

    // 단어 입력 상자 — 입체 카드
    wordBox: {
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 2,
      borderBottomWidth: 4,
      paddingHorizontal: 18,
      paddingVertical: 6,
    },
    wordInput: {
      fontSize: 24,
      fontWeight: "800",
      paddingVertical: 12,
      letterSpacing: 0.5,
    },
    sentenceCard: {
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 4,
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
    hintRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 12,
      paddingHorizontal: 4,
    },
    hintText: {
      flex: 1,
      fontSize: 13.5,
      fontWeight: "700",
      color: theme.textSecondary,
    },
  });
