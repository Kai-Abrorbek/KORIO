import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeColors } from "@/constants/theme";
import { AnswerState, DialogLine, LessonQuestion } from "@/types/lesson";
import { useSpeech } from "@/hooks/useSpeech";
import CheckButton from "../CheckButton";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
}

const SPEAKER_META = {
  npc: { avatar: "👨‍🏫", label: "A" },
  user: { avatar: "👩‍🎓", label: "B" },
} as const;

export default function DialogComplete({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const insets = useSafeAreaInsets();
  const s = styles(theme);
  const [selected, setSelected] = useState<string | null>(null);
  const [speakingLine, setSpeakingLine] = useState<number | null>(null);
  const { speak, isSpeaking } = useSpeech();

  const playLine = (line: DialogLine, index: number) => {
    setSpeakingLine(index);
    speak(line.text);
  };

  const handleCheck = () => {
    if (!selected || answerState !== "idle") return;
    onAnswer(selected);
  };

  return (
    <Animated.View entering={FadeIn.duration(150)} style={s.container}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.headerRow}>
          <View style={s.headerIcon}>
            <Ionicons name="chatbubbles" size={22} color="#fff" />
          </View>
          <View style={s.headerCopy}>
            <Text style={s.eyebrow}>DIALOGUE</Text>
            <Text style={s.title}>{question.question}</Text>
          </View>
        </View>

        <View style={s.sceneCard}>
          <View style={s.sceneHeader}>
            <View style={s.liveDot} />
            <Text style={s.sceneLabel}>A · B</Text>
            <Text style={s.sceneHint}>🔊</Text>
          </View>

          <View style={s.timeline} />
          {question.dialogLines?.map((line, index) => {
            const meta = SPEAKER_META[line.speaker];
            const isUser = line.speaker === "user";
            const lineIsSpeaking = isSpeaking && speakingLine === index;
            return (
              <Animated.View
                key={`${line.speaker}-${index}-${line.text}`}
                entering={FadeInUp.delay(index * 90).duration(300)}
                style={[s.messageRow, isUser && s.messageRowUser]}
              >
                {!isUser && (
                  <View style={s.avatarWrap}>
                    <Text style={s.avatar}>{meta.avatar}</Text>
                    <View style={s.speakerBadge}>
                      <Text style={s.speakerBadgeText}>{meta.label}</Text>
                    </View>
                  </View>
                )}

                <View style={[s.bubble, isUser && s.bubbleUser]}>
                  <View style={s.bubbleTopRow}>
                    <Text style={[s.speakerName, isUser && s.speakerNameUser]}>
                      {meta.label}
                    </Text>
                    <TouchableOpacity
                      onPress={() => playLine(line, index)}
                      hitSlop={8}
                      style={[
                        s.audioButton,
                        lineIsSpeaking && s.audioButtonActive,
                      ]}
                    >
                      <Ionicons
                        name={lineIsSpeaking ? "volume-high" : "volume-medium"}
                        size={17}
                        color={lineIsSpeaking ? "#fff" : theme.primary}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={[s.messageText, isUser && s.messageTextUser]}>
                    {line.text}
                  </Text>
                </View>

                {isUser && (
                  <View style={s.avatarWrap}>
                    <Text style={s.avatar}>{meta.avatar}</Text>
                    <View style={[s.speakerBadge, s.speakerBadgeUser]}>
                      <Text style={s.speakerBadgeText}>{meta.label}</Text>
                    </View>
                  </View>
                )}
              </Animated.View>
            );
          })}

          <View style={s.answerRow}>
            <View style={[s.answerBubble, selected && s.answerBubbleFilled]}>
              <View style={s.answerBubbleTop}>
                <Text style={s.answerLabel}>B</Text>
                <Ionicons
                  name={selected ? "checkmark-circle" : "ellipsis-horizontal"}
                  size={18}
                  color={selected ? theme.primary : theme.textSecondary}
                />
              </View>
              <Text style={selected ? s.answerText : s.answerPlaceholder}>
                {selected ?? "— — —"}
              </Text>
            </View>
            <View style={s.avatarWrap}>
              <Text style={s.avatar}>👩‍🎓</Text>
              <View style={[s.speakerBadge, s.speakerBadgeUser]}>
                <Text style={s.speakerBadgeText}>B</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={s.optionsHeader}>
          <Text style={s.optionsTitle}>CHOICES</Text>
          <Text style={s.optionsCount}>
            {question.options?.length ?? 0} choices
          </Text>
        </View>

        <View style={s.options}>
          {question.options?.map((option, index) => {
            const isSelected = selected === option;
            const isCorrect =
              answerState !== "idle" && option === question.answer;
            const isWrong =
              answerState !== "idle" &&
              isSelected &&
              option !== question.answer;
            return (
              <TouchableOpacity
                key={`${option}-${index}`}
                activeOpacity={0.82}
                style={[
                  s.option,
                  isSelected && s.optionSelected,
                  isCorrect && s.optionCorrect,
                  isWrong && s.optionWrong,
                ]}
                onPress={() => answerState === "idle" && setSelected(option)}
              >
                <View
                  style={[
                    s.optionIndex,
                    isSelected && s.optionIndexSelected,
                    isCorrect && s.optionIndexCorrect,
                    isWrong && s.optionIndexWrong,
                  ]}
                >
                  <Text
                    style={[
                      s.optionIndexText,
                      (isSelected || isCorrect || isWrong) &&
                        s.optionIndexTextActive,
                    ]}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Text
                  style={[
                    s.optionText,
                    isCorrect && s.optionTextCorrect,
                    isWrong && s.optionTextWrong,
                  ]}
                >
                  {option}
                </Text>
                {isSelected && answerState === "idle" && (
                  <Ionicons
                    name="checkmark-circle"
                    size={23}
                    color={theme.primary}
                  />
                )}
                {isCorrect && (
                  <Ionicons name="checkmark-circle" size={23} color="#18A957" />
                )}
                {isWrong && (
                  <Ionicons name="close-circle" size={23} color="#E74444" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={[s.footer, { paddingBottom: insets.bottom + 10 }]}>
        <CheckButton
          onPress={handleCheck}
          disabled={!selected || answerState !== "idle"}
          theme={theme}
        />
      </View>
    </Animated.View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 18, paddingTop: 6 },
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 14 },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 17,
    },
    headerIcon: {
      width: 44,
      height: 44,
      borderRadius: 15,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: theme.primary,
      shadowOpacity: 0.24,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
    headerCopy: { flex: 1 },
    eyebrow: {
      color: theme.primary,
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 1.5,
      marginBottom: 2,
    },
    title: {
      color: theme.text,
      fontSize: 20,
      fontWeight: "900",
      lineHeight: 27,
    },
    sceneCard: {
      borderRadius: 24,
      borderWidth: 1.5,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      paddingHorizontal: 14,
      paddingTop: 13,
      paddingBottom: 15,
      overflow: "hidden",
    },
    sceneHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      marginBottom: 14,
    },
    liveDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: theme.primary,
    },
    sceneLabel: {
      color: theme.text,
      fontSize: 12,
      fontWeight: "800",
      marginLeft: 7,
    },
    sceneHint: {
      color: theme.textSecondary,
      fontSize: 10,
      fontWeight: "600",
      marginLeft: "auto",
    },
    timeline: {
      position: "absolute",
      left: 37,
      top: 63,
      bottom: 25,
      width: 2,
      backgroundColor: theme.border,
      opacity: 0.55,
    },
    messageRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 9,
      marginBottom: 12,
    },
    messageRowUser: { justifyContent: "flex-end" },
    avatarWrap: {
      width: 48,
      height: 48,
      borderRadius: 16,
      backgroundColor: theme.bg,
      borderWidth: 1.5,
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    avatar: { fontSize: 28 },
    speakerBadge: {
      position: "absolute",
      right: -4,
      bottom: -3,
      width: 19,
      height: 19,
      borderRadius: 7,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#617085",
      borderWidth: 2,
      borderColor: theme.surface,
    },
    speakerBadgeUser: { backgroundColor: theme.primary },
    speakerBadgeText: { color: "#fff", fontSize: 9, fontWeight: "900" },
    bubble: {
      flexShrink: 1,
      maxWidth: "78%",
      minWidth: 135,
      borderRadius: 17,
      borderBottomLeftRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: theme.bg,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    bubbleUser: {
      borderBottomLeftRadius: 17,
      borderBottomRightRadius: 5,
      backgroundColor: theme.primary + "12",
      borderColor: theme.primary + "42",
    },
    bubbleTopRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    speakerName: { color: "#617085", fontSize: 10, fontWeight: "900" },
    speakerNameUser: { color: theme.primary },
    audioButton: {
      width: 28,
      height: 28,
      borderRadius: 10,
      backgroundColor: theme.primary + "10",
      alignItems: "center",
      justifyContent: "center",
    },
    audioButtonActive: { backgroundColor: theme.primary },
    messageText: {
      color: theme.text,
      fontSize: 15,
      fontWeight: "600",
      lineHeight: 21,
    },
    messageTextUser: { color: theme.text },
    answerRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      gap: 9,
      marginTop: 2,
    },
    answerBubble: {
      flex: 1,
      maxWidth: "82%",
      borderRadius: 17,
      borderBottomRightRadius: 5,
      borderWidth: 1.5,
      borderStyle: "dashed",
      borderColor: theme.primary + "75",
      backgroundColor: theme.primary + "08",
      paddingVertical: 11,
      paddingHorizontal: 13,
      minHeight: 64,
      justifyContent: "center",
    },
    answerBubbleFilled: {
      borderStyle: "solid",
      backgroundColor: theme.primary + "14",
    },
    answerBubbleTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 3,
    },
    answerLabel: { color: theme.primary, fontSize: 10, fontWeight: "900" },
    answerText: {
      color: theme.text,
      fontSize: 15,
      fontWeight: "700",
      lineHeight: 21,
    },
    answerPlaceholder: {
      color: theme.textSecondary,
      fontSize: 12,
      fontWeight: "600",
      lineHeight: 18,
    },
    optionsHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 18,
      marginBottom: 10,
    },
    optionsTitle: {
      color: theme.text,
      fontSize: 12,
      fontWeight: "800",
      letterSpacing: 1.2,
    },
    optionsCount: {
      color: theme.textSecondary,
      fontSize: 10,
      fontWeight: "700",
      marginLeft: "auto",
    },
    options: { gap: 9 },
    option: {
      minHeight: 57,
      borderRadius: 17,
      borderWidth: 1.5,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      paddingVertical: 10,
      paddingHorizontal: 11,
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
    },
    optionSelected: {
      borderColor: theme.primary,
      backgroundColor: theme.primary + "0D",
    },
    optionCorrect: { borderColor: "#18A957", backgroundColor: "#E8F8EF" },
    optionWrong: { borderColor: "#E74444", backgroundColor: "#FFF0F0" },
    optionIndex: {
      width: 31,
      height: 31,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.bg,
      borderWidth: 1,
      borderColor: theme.border,
    },
    optionIndexSelected: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    optionIndexCorrect: { backgroundColor: "#18A957", borderColor: "#18A957" },
    optionIndexWrong: { backgroundColor: "#E74444", borderColor: "#E74444" },
    optionIndexText: {
      color: theme.textSecondary,
      fontSize: 12,
      fontWeight: "900",
    },
    optionIndexTextActive: { color: "#fff" },
    optionText: {
      flex: 1,
      color: theme.text,
      fontSize: 14,
      fontWeight: "700",
      lineHeight: 20,
    },
    optionTextCorrect: { color: "#137F44" },
    optionTextWrong: { color: "#B72D2D" },
    footer: { paddingTop: 8, backgroundColor: theme.bg },
  });
