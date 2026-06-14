import { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  enabled: boolean;
  timeLeft: number;
  timeMax: number;
  onSubmit: (word: string) => void;
  onHint: () => void;
  hintsLeft: number;
  errorFlash: number; // increment to trigger shake
}

export default function TurnInput({
  enabled,
  timeLeft,
  timeMax,
  onSubmit,
  onHint,
  hintsLeft,
  errorFlash,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  const [value, setValue] = useState("");
  const inputRef = useRef<TextInput>(null);
  const shake = useSharedValue(0);

  const RING_SIZE = 56;
  const RING_RADIUS = 24;
  const RING_CIRC = 2 * Math.PI * RING_RADIUS;

  useEffect(() => {
    if (enabled) {
      setTimeout(() => inputRef.current?.focus(), 200);
    } else {
      inputRef.current?.blur();
    }
  }, [enabled]);

  useEffect(() => {
    if (errorFlash > 0) {
      shake.value = withTiming(-10, { duration: 60 });
      setTimeout(() => {
        shake.value = withTiming(10, { duration: 60 });
        setTimeout(() => {
          shake.value = withTiming(-6, { duration: 60 });
          setTimeout(() => {
            shake.value = withTiming(0, { duration: 60 });
          }, 60);
        }, 60);
      }, 60);
    }
  }, [errorFlash]);

  const progress = Math.max(0, Math.min(1, timeLeft / timeMax));
  const ringColor =
    progress > 0.5 ? "#58CC02" : progress > 0.25 ? "#FFD000" : "#FF4B4B";

  const ringAnimProps = useAnimatedStyle(() => ({}));

  const handleSubmit = () => {
    if (!value.trim() || !enabled) return;
    onSubmit(value.trim());
    setValue("");
  };

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  return (
    <View style={styles.wrap}>
      {/* 타이머 링 + 입력 필드 */}
      <Animated.View style={[styles.row, shakeStyle]}>
        {/* 타이머 링 */}
        <View style={styles.ringWrap}>
          <Svg
            width={RING_SIZE}
            height={RING_SIZE}
            style={{ transform: [{ rotate: "-90deg" }] }}
          >
            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              stroke={theme.border}
              strokeWidth={4}
              fill="transparent"
            />
            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              stroke={ringColor}
              strokeWidth={4}
              fill="transparent"
              strokeDasharray={RING_CIRC}
              strokeDashoffset={RING_CIRC * (1 - progress)}
              strokeLinecap="round"
            />
          </Svg>
          <Text style={[styles.timeText, { color: ringColor }]}>
            {timeLeft}
          </Text>
        </View>

        {/* 입력 필드 */}
        <View style={[styles.inputBox, !enabled && styles.inputDisabled]}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={value}
            onChangeText={setValue}
            editable={enabled}
            placeholder={t("wordChain.typeHere")}
            placeholderTextColor={theme.textSecondary}
            onSubmitEditing={handleSubmit}
            autoCorrect={false}
            autoComplete="off"
            autoCapitalize="none"
            returnKeyType="send"
            maxLength={12}
          />
        </View>

        {/* 전송 버튼 */}
        <TouchableOpacity
          style={[styles.sendBtn, !enabled && styles.sendBtnDisabled]}
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={!enabled || !value.trim()}
        >
          <Ionicons name="arrow-up" size={22} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* 힌트 버튼 */}
      <TouchableOpacity
        style={[
          styles.hintBtn,
          (hintsLeft === 0 || !enabled) && styles.hintBtnDisabled,
        ]}
        onPress={onHint}
        disabled={hintsLeft === 0 || !enabled}
        activeOpacity={0.7}
      >
        <Ionicons name="bulb" size={16} color="#FFD000" />
        <Text style={styles.hintText}>
          {t("wordChain.hint")} ({hintsLeft})
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      padding: 12,
      backgroundColor: theme.bg,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    ringWrap: {
      width: 56,
      height: 56,
      alignItems: "center",
      justifyContent: "center",
    },
    timeText: {
      position: "absolute",
      fontSize: 18,
      fontWeight: "900",
    },
    inputBox: {
      flex: 1,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 14,
      paddingHorizontal: 14,
    },
    inputDisabled: {
      opacity: 0.5,
    },
    input: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text,
      paddingVertical: 14,
    },
    sendBtn: {
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor: "#776ee2",
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 3,
      borderColor: "#5448E0",
    },
    sendBtnDisabled: {
      backgroundColor: theme.border,
      borderColor: theme.border,
    },
    hintBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      alignSelf: "center",
      marginTop: 10,
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 99,
      backgroundColor: "#FFF6E0",
      borderWidth: 1,
      borderColor: "#FFD000",
    },
    hintBtnDisabled: { opacity: 0.4 },
    hintText: {
      fontSize: 13,
      fontWeight: "800",
      color: "#9C7000",
    },
  });
