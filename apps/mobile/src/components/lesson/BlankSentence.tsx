import { RefObject } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import { ThemeColors } from "@/constants/theme";
import { AnswerState } from "@/types/lesson";
import { BlankToken } from "@/utils/blank-sentence";

interface Props {
  tokens: BlankToken[];
  /** 빈칸 순서대로의 현재 값 */
  values: (string | null)[];
  theme: ThemeColors;
  answerState: AnswerState;
  /**
   * select — 빈칸을 탭해 활성화하고 선택지에서 골라 넣는다
   * input  — 빈칸마다 직접 타이핑한다
   */
  mode: "select" | "input";
  /** select 모드: 지금 입력 대상인 빈칸 */
  activeIndex?: number;
  onBlankPress?: (index: number) => void;
  /** input 모드 */
  onChange?: (index: number, text: string) => void;
  inputRefs?: RefObject<Record<number, TextInput | null>>;
  onSubmit?: () => void;
  autoFocusFirst?: boolean;
  fontSize?: number;
}

const CORRECT = "#1CB454";
const WRONG = "#FF4B4B";

/**
 * `Oh, ___ a ___ .` 형태의 문장을 빈칸과 함께 렌더한다.
 * 빈칸 개수에 제한이 없고, 문장이 길면 flexWrap 으로 자연스럽게 접힌다.
 */
export default function BlankSentence({
  tokens,
  values,
  theme,
  answerState,
  mode,
  activeIndex = 0,
  onBlankPress,
  onChange,
  inputRefs,
  onSubmit,
  autoFocusFirst = false,
  fontSize = 20,
}: Props) {
  const locked = answerState !== "idle";
  const accent =
    answerState === "correct"
      ? CORRECT
      : answerState === "wrong"
        ? WRONG
        : theme.primary;

  const textStyle: TextStyle = {
    fontSize,
    lineHeight: fontSize * 1.9,
    color: theme.text,
    fontWeight: "600",
  };

  return (
    <View style={s.row}>
      {tokens.map((tk, i) => {
        if (tk.type === "text") {
          return (
            <Text key={`t-${i}`} style={textStyle}>
              {tk.value}
            </Text>
          );
        }

        const value = values[tk.index] ?? "";
        const isActive =
          mode === "select" && !locked && activeIndex === tk.index;
        const minWidth = Math.max(72, value.length * fontSize * 0.62 + 24);

        if (mode === "input") {
          return (
            <View
              key={`b-${tk.index}`}
              style={[s.blank, { minWidth, borderBottomColor: accent }]}
            >
              <TextInput
                ref={(el) => {
                  if (inputRefs?.current) inputRefs.current[tk.index] = el;
                }}
                style={[
                  s.input,
                  { fontSize, color: theme.text, height: fontSize * 1.7 },
                ]}
                value={value}
                onChangeText={(txt) => onChange?.(tk.index, txt)}
                editable={!locked}
                autoFocus={autoFocusFirst && tk.index === 0}
                autoCorrect={false}
                spellCheck={false}
                autoCapitalize="none"
                onSubmitEditing={onSubmit}
                returnKeyType="done"
              />
              {!value && (
                <Text
                  style={[s.hint, { color: theme.textSecondary }]}
                  pointerEvents="none"
                >
                  ·····
                </Text>
              )}
            </View>
          );
        }

        return (
          <Pressable
            key={`b-${tk.index}`}
            disabled={locked}
            onPress={() => onBlankPress?.(tk.index)}
            style={[
              s.blank,
              {
                minWidth,
                borderBottomColor: value || isActive ? accent : theme.border,
                borderBottomWidth: isActive ? 3 : 2.5,
              },
            ]}
          >
            <Text
              style={[
                textStyle,
                s.slotText,
                { color: value ? theme.text : "transparent" },
              ]}
              numberOfLines={1}
            >
              {value || "___"}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  blank: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 4,
    borderBottomWidth: 2.5,
    paddingHorizontal: 4,
  },
  slotText: { textAlign: "center" },
  input: {
    fontWeight: "800",
    textAlign: "center",
    paddingVertical: 0,
    minWidth: 64,
  },
  hint: {
    position: "absolute",
    alignSelf: "center",
    bottom: 6,
    fontSize: 18,
    letterSpacing: 4,
    opacity: 0.45,
  },
});
