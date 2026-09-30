import { forwardRef, useEffect, useMemo } from "react";
import { Platform, Pressable, StyleSheet, Text, TextInput } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { ThemeColors } from "@/constants/theme";

export const CODE_LENGTH = 6;

/** 한 칸. 채워지면 살짝 튀고, 지금 칠 자리는 테두리가 살아난다 */
function CodeBox({
  char,
  active,
  error,
  theme,
}: {
  char: string;
  active: boolean;
  error: boolean;
  theme: ThemeColors;
}) {
  const s = getStyles(theme);
  const pop = useSharedValue(0);
  const caret = useSharedValue(0);

  useEffect(() => {
    if (char) {
      pop.value = withSequence(
        withTiming(1, { duration: 90, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: 130 }),
      );
    }
  }, [char, pop]);

  useEffect(() => {
    if (active && !char) {
      caret.value = withRepeat(
        withSequence(withTiming(1, { duration: 420 }), withTiming(0.15, { duration: 420 })),
        -1,
        true,
      );
    } else {
      caret.value = withTiming(0, { duration: 120 });
    }
  }, [active, char, caret]);

  const boxStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + pop.value * 0.07 }],
  }));
  const caretStyle = useAnimatedStyle(() => ({ opacity: caret.value }));

  return (
    <Animated.View
      style={[
        s.box,
        boxStyle,
        active && { borderColor: theme.primary, borderWidth: 2 },
        !!char && { borderColor: theme.primary },
        error && { borderColor: "#E24B4A" },
      ]}
    >
      {char ? (
        <Text style={s.boxText}>{char}</Text>
      ) : (
        <Animated.View style={[s.caret, caretStyle]} />
      )}
    </Animated.View>
  );
}

interface Props {
  value: string;
  /** 숫자만, 최대 CODE_LENGTH 자리로 걸러서 준다 */
  onChange: (digits: string) => void;
  error?: boolean;
  autoFocus?: boolean;
  theme: ThemeColors;
}

/**
 * 메일로 받은 6자리 코드 입력칸. 가입 인증·비밀번호 찾기 화면과 계정 화면의
 * "비밀번호 만들기" 시트가 같이 쓴다.
 *
 * 칸은 6개로 보이지만 실제 입력은 숨은 TextInput 하나가 다 받는다.
 * 칸마다 TextInput 을 두면 붙여넣기·지우기·SMS 자동완성이 전부 깨진다.
 */
const CodeInput = forwardRef<TextInput, Props>(function CodeInput(
  { value, onChange, error = false, autoFocus = true, theme },
  ref,
) {
  const s = useMemo(() => getStyles(theme), [theme]);
  const focus = () => {
    if (ref && typeof ref !== "function") ref.current?.focus();
  };

  return (
    <>
      <Pressable style={s.boxRow} onPress={focus}>
        {Array.from({ length: CODE_LENGTH }).map((_, i) => (
          <CodeBox
            key={i}
            char={value[i] ?? ""}
            active={i === value.length}
            error={error}
            theme={theme}
          />
        ))}
      </Pressable>
      <TextInput
        ref={ref}
        style={s.hiddenInput}
        value={value}
        onChangeText={(raw) => onChange(raw.replace(/\D/g, "").slice(0, CODE_LENGTH))}
        keyboardType="number-pad"
        maxLength={CODE_LENGTH}
        autoFocus={autoFocus}
        caretHidden
        textContentType="oneTimeCode"
        autoComplete={Platform.OS === "android" ? "sms-otp" : "one-time-code"}
      />
    </>
  );
});

export default CodeInput;

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    boxRow: { flexDirection: "row", gap: 9, justifyContent: "space-between" },
    box: {
      flex: 1,
      aspectRatio: 0.82,
      maxHeight: 62,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    boxText: {
      fontSize: 26,
      fontWeight: "800",
      color: theme.text,
    },
    caret: {
      width: 2,
      height: 24,
      borderRadius: 1,
      backgroundColor: theme.primary,
    },
    // 화면 밖으로 밀어둔다. opacity:0 만 주면 안드로이드에서 포커스를 못 받는다
    hiddenInput: {
      position: "absolute",
      width: 1,
      height: 1,
      opacity: 0,
      top: -100,
    },
  });
