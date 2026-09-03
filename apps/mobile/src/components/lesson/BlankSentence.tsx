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
  fontSize = 17,
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

  /**
   * 빈칸 하나만 있고 앞뒤 문장이 없는 경우 = "문장 전체를 직접 쓴다" 문제다
   * (templateOf 가 "___" 만 돌려준다). 이때는 칸을 글자 수에 맞춰 늘리는 게
   * 아니라 **한 줄 전체 폭**을 주고, 길어지면 다음 줄로 넘어가게 해야 한다.
   * 좁은 칸에 긴 문장을 쓰면 글자가 옆으로 흘러 읽을 수가 없다.
   *
   * 문장 사이에 낀 빈칸(빈칸 채우기)은 지금처럼 인라인으로 둔다 — 거기선
   * 칸이 문장 흐름 안에 있어야 뜻이 보인다.
   */
  const soleBlank =
    mode === "input" && tokens.length === 1 && tokens[0].type === "blank";

  return (
    <View style={[s.row, soleBlank && s.rowFull]}>
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
              style={[
                s.blank,
                soleBlank
                  ? s.blankFull
                  : { minWidth, alignItems: "center" as const },
                { borderBottomColor: accent },
              ]}
            >
              <TextInput
                ref={(el) => {
                  if (inputRefs?.current) inputRefs.current[tk.index] = el;
                }}
                style={[
                  s.input,
                  soleBlank ? s.inputFull : null,
                  {
                    fontSize,
                    color: theme.text,
                    // 여러 줄일 땐 높이를 고정하면 안 된다. 최소 한 줄만 잡고
                    // 내용이 길어지면 알아서 늘어나게 둔다
                    ...(soleBlank
                      ? {
                          minHeight: fontSize * 1.9,
                          lineHeight: fontSize * 1.5,
                        }
                      : { height: fontSize * 1.7 }),
                  },
                ]}
                multiline={soleBlank}
                // 여러 줄 입력에서 Enter 는 줄바꿈이라 제출로 쓰지 않는다.
                // 제출은 화면 하단 확인 버튼이 맡는다
                returnKeyType={soleBlank ? "default" : "done"}
                value={value}
                onChangeText={(txt) => onChange?.(tk.index, txt)}
                editable={!locked}
                autoFocus={autoFocusFirst && tk.index === 0}
                autoCorrect={false}
                spellCheck={false}
                autoCapitalize="none"
                onSubmitEditing={soleBlank ? undefined : onSubmit}
              />
              {!value && (
                <Text
                  style={[
                    s.hint,
                    soleBlank && s.hintFull,
                    { color: theme.textSecondary },
                  ]}
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
  /** 단독 빈칸: 줄 전체를 쓴다 */
  rowFull: { alignSelf: "stretch" },
  blank: {
    justifyContent: "flex-end",
    marginHorizontal: 4,
    borderBottomWidth: 2.5,
    paddingHorizontal: 4,
  },
  blankFull: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "stretch",
    marginHorizontal: 0,
    paddingBottom: 4,
  },
  slotText: { textAlign: "center" },
  input: {
    fontWeight: "800",
    textAlign: "center",
    paddingVertical: 0,
    minWidth: 64,
  },
  inputFull: {
    width: "100%",
    minWidth: 0,
    textAlign: "left",
    textAlignVertical: "top",
    paddingTop: 2,
  },
  hint: {
    position: "absolute",
    alignSelf: "center",
    bottom: 6,
    fontSize: 18,
    letterSpacing: 4,
    opacity: 0.45,
  },
  hintFull: { alignSelf: "flex-start", left: 2 },
});
