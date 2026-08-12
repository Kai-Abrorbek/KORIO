import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion, AnswerState, DialogLine } from "@/types/lesson";
import { useSpeech } from "@/hooks/useSpeech";

interface Props {
  question: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  theme: ThemeColors;
  combo?: number;
}

interface OrderLine extends DialogLine {
  origIdx: number;
}

export default function DialogOrder({
  question,
  answerState,
  onAnswer,
  theme,
}: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const s = styles(theme, insets.bottom);
  const { speak } = useSpeech();
  const locked = answerState !== "idle";

  // dialogLines 는 정답 순서로 시드됨 → 화면에선 섞는다
  const shuffled = useMemo<OrderLine[]>(() => {
    const withIdx = (question.dialogLines ?? []).map((l, i) => ({
      ...l,
      origIdx: i,
    }));
    return [...withIdx].sort(() => Math.random() - 0.5);
  }, [question.dialogLines]);

  const [placed, setPlaced] = useState<OrderLine[]>([]);
  const bank = shuffled.filter(
    (l) => !placed.some((p) => p.origIdx === l.origIdx),
  );
  const done = bank.length === 0;

  const place = (line: OrderLine) => {
    if (locked) return;
    Haptics.selectionAsync();
    speak(line.text);
    setPlaced((prev) => [...prev, line]);
  };

  const takeBack = (line: OrderLine) => {
    if (locked) return;
    Haptics.selectionAsync();
    setPlaced((prev) => prev.filter((p) => p.origIdx !== line.origIdx));
  };

  const check = () => {
    if (!done || locked) return;
    const correct = placed.every((p, i) => p.origIdx === i);
    onAnswer(correct ? "all_correct" : "__wrong_order__");
  };

  return (
    <View style={s.container}>
      <Animated.Text entering={FadeIn.duration(150)} style={s.title}>
        {t("lesson.dialogOrder")}
      </Animated.Text>

      {/* 채팅창 */}
      <View style={s.chatWindow}>
        <View style={s.chatHeader}>
          <View style={s.chatAvatar}>
            <Text style={{ fontSize: 14 }}>🦉</Text>
          </View>
          <Text style={s.chatName}>KORIO Chat</Text>
          <View style={s.onlineDot} />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={s.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {placed.length === 0 ? (
            <Text style={s.emptyHint}>{t("lesson.dialogOrderHint")}</Text>
          ) : null}
          {placed.map((line, i) => {
            const isUser = line.speaker === "user";
            return (
              <Animated.View
                key={line.origIdx}
                entering={FadeIn.duration(150)}
                layout={LinearTransition.springify().damping(16)}
                style={[s.bubbleRow, isUser && { justifyContent: "flex-end" }]}
              >
                <TouchableOpacity
                  disabled={locked}
                  onPress={() => takeBack(line)}
                  activeOpacity={0.8}
                  style={[s.bubble, isUser ? s.bubbleUser : s.bubbleNpc]}
                >
                  <Text style={[s.bubbleText, isUser && { color: "#fff" }]}>
                    {line.text}
                  </Text>
                  <Text style={[s.bubbleNum, isUser && { color: "#ffffffAA" }]}>
                    {i + 1}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </ScrollView>
      </View>

      {/* 말풍선 뱅크 */}
      <View style={s.bank}>
        {bank.map((line) => (
          <Animated.View
            key={line.origIdx}
            layout={LinearTransition.springify().damping(16)}
            entering={FadeIn.duration(150)}
          >
            <TouchableOpacity
              disabled={locked}
              onPress={() => place(line)}
              activeOpacity={0.8}
              style={s.bankBubble}
            >
              <Ionicons
                name={
                  line.speaker === "user" ? "person" : "chatbubble-ellipses"
                }
                size={14}
                color={theme.textSecondary}
              />
              <Text style={s.bankText} numberOfLines={2}>
                {line.text}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      <TouchableOpacity
        style={[s.checkBtn, (!done || locked) && s.checkBtnDisabled]}
        onPress={check}
        disabled={!done || locked}
        activeOpacity={0.9}
      >
        <Text style={s.checkBtnText}>{t("lesson.check")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = (theme: ThemeColors, bottomInset = 0) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: bottomInset + 12,
    },
    title: {
      fontSize: 20,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 12,
    },
    chatWindow: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 4,
      overflow: "hidden",
      marginBottom: 14,
    },
    chatHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    chatAvatar: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.primary + "20",
      alignItems: "center",
      justifyContent: "center",
    },
    chatName: { fontSize: 14, fontWeight: "800", color: theme.text },
    onlineDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#1CB454",
    },
    chatContent: { padding: 14, gap: 10, flexGrow: 1 },
    emptyHint: {
      textAlign: "center",
      color: theme.textSecondary,
      fontSize: 14,
      fontWeight: "600",
      marginTop: 24,
    },
    bubbleRow: { flexDirection: "row" },
    bubble: {
      maxWidth: "82%",
      borderRadius: 18,
      paddingHorizontal: 14,
      paddingVertical: 10,
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 8,
    },
    bubbleNpc: {
      backgroundColor: theme.bg,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomLeftRadius: 6,
    },
    bubbleUser: {
      backgroundColor: theme.primary,
      borderBottomRightRadius: 6,
    },
    bubbleText: {
      fontSize: 15,
      fontWeight: "600",
      color: theme.text,
      flexShrink: 1,
      lineHeight: 21,
    },
    bubbleNum: {
      fontSize: 11,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    bank: { gap: 8, marginBottom: 4 },
    bankBubble: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 3,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 11,
    },
    bankText: {
      fontSize: 15,
      fontWeight: "600",
      color: theme.text,
      flex: 1,
    },
    checkBtn: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
      marginTop: 8,
      borderBottomWidth: 4,
      borderBottomColor: "#5B52C7",
    },
    checkBtnDisabled: {
      backgroundColor: theme.border,
      borderBottomColor: theme.border,
    },
    checkBtnText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  });
