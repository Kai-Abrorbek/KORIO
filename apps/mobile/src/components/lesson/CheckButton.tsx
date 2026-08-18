import { memo } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { darken } from "@/utils/color";

/** 버튼 면 높이 */
export const CHECK_FACE_H = 54;
/** 입체 두께 (바텀 보더) */
export const CHECK_DEPTH = 4;
/** 버튼 아래 여백 */
export const CHECK_GAP = 8;

interface Props {
  onPress: () => void;
  theme: ThemeColors;
  disabled?: boolean;
  loading?: boolean;
  /** 기본값 t("lesson.check") */
  label?: string;
  /** 버튼 위에 뜨는 건너뛰기 링크 */
  skipLabel?: string;
  onSkip?: () => void;
  /** 정답/오답 확정 후 색을 바꾸고 싶을 때 */
  tone?: "primary" | "success" | "danger";
  style?: ViewStyle;
}

const TONE_COLOR = {
  primary: (t: ThemeColors) => t.primary,
  success: () => "#58CC02",
  danger: () => "#FF4B4B",
};

/**
 * 모든 문제 타입 공용 확인 버튼.
 * 화면 하단에 absolute 로 고정되므로 콘텐츠 길이와 무관하게 절대 밀리지 않고,
 * SafeArea 만큼 띄워서 안드로이드 네비게이션 바에 가리지 않는다.
 */
function CheckButton({
  onPress,
  theme,
  disabled = false,
  loading = false,
  label,
  skipLabel,
  onSkip,
  tone = "primary",
  style,
}: Props) {
  const { t } = useTranslation();
  const press = useSharedValue(0);
  const isDisabled = disabled || loading;

  const base = isDisabled ? theme.border : TONE_COLOR[tone](theme);
  const shadow = isDisabled ? theme.border : darken(base, 40);

  const faceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: press.value * CHECK_DEPTH }],
  }));

  const handlePressIn = () => {
    if (isDisabled) return;
    press.value = withTiming(1, { duration: 60 });
  };
  const handlePressOut = () => {
    press.value = withTiming(0, { duration: 90 });
  };
  const handlePress = () => {
    if (isDisabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <View style={[s.wrap, style]}>
      {!!skipLabel && !!onSkip && (
        <Pressable onPress={onSkip} hitSlop={8} style={s.skip}>
          <Text style={[s.skipText, { color: theme.textSecondary }]}>
            {skipLabel}
          </Text>
        </Pressable>
      )}

      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        style={[s.shadow, { backgroundColor: shadow }]}
      >
        <Animated.View
          style={[s.face, { backgroundColor: base }, faceStyle]}
          pointerEvents="none"
        >
          {loading ? (
            <ActivityIndicator color={theme.textSecondary} />
          ) : (
            <Text
              style={[
                s.label,
                { color: isDisabled ? theme.textSecondary : "#fff" },
              ]}
            >
              {label ?? t("lesson.check")}
            </Text>
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  // marginTop:auto 가 남는 공간을 전부 먹어서 항상 하단에 붙는다.
  // absolute 를 쓰면 부모 paddingBottom 만큼 위로 떠버려서 쓰지 않는다.
  wrap: {
    marginTop: "auto",
    marginBottom: CHECK_GAP,
  },
  skip: { alignItems: "center", paddingVertical: 10 },
  skipText: { fontSize: 15, fontWeight: "700" },
  // 어두운 아래층 — 눌리면 이 면이 드러나면서 입체감이 난다
  shadow: {
    height: CHECK_FACE_H + CHECK_DEPTH,
    borderRadius: 16,
    justifyContent: "flex-start",
  },
  face: {
    height: CHECK_FACE_H,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  label: { fontSize: 17, fontWeight: "800" },
});

export default memo(CheckButton);
