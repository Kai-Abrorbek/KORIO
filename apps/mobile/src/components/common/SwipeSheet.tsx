import { useMemo, type ReactNode } from "react";
import { Modal, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";

/** 이만큼 끌어내리면 닫는다 */
const DISMISS_DISTANCE = 110;
/** 빠르게 튕겨 내리면 짧아도 닫는다 */
const DISMISS_VELOCITY = 900;

/**
 * 아래에서 붙는 시트 — 바닥에 딱 붙고(내비바 밑까지), 아래로 끌어 닫는다.
 *
 * - 열고 닫기는 Modal 페이드만 (밀어 올리기·스프링·튕김 금지)
 * - 손가락을 따라 내려가는 것만 움직임. 덜 내리고 놓으면 짧게 제자리로 (튕기지 않게 timing)
 * - Modal 안에서는 제스처가 GestureHandlerRootView 안에 있어야 먹는다
 * - statusBarTranslucent + navigationBarTranslucent: 안 주면 안드로이드에서 시트가 내비바 위에 떠 보인다
 */
export default function SwipeSheet({
  visible,
  onClose,
  dismissible = true,
  contentStyle,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  /** false 면 끌어도·배경을 눌러도 안 닫힌다 (처리 중) */
  dismissible?: boolean;
  /** 시트 안 정렬 등 (기본은 늘이기) */
  contentStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  const theme = useTheme();
  const s = useMemo(() => getStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dragY = useSharedValue(0);

  const close = () => {
    if (dismissible) onClose();
  };

  const pan = Gesture.Pan()
    .enabled(dismissible)
    .activeOffsetY(8)
    .failOffsetY(-8)
    .onUpdate((e) => {
      dragY.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      if (dragY.value > DISMISS_DISTANCE || e.velocityY > DISMISS_VELOCITY) {
        runOnJS(onClose)();
        return;
      }
      dragY.value = withTiming(0, { duration: 160, easing: Easing.out(Easing.cubic) });
    });

  const sheetStyle = useAnimatedStyle(() => ({ transform: [{ translateY: dragY.value }] }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={close}
      onShow={() => {
        dragY.value = 0;
      }}
    >
      <GestureHandlerRootView style={s.root}>
        <Pressable style={StyleSheet.absoluteFill} onPress={close} />
        <GestureDetector gesture={pan}>
          <Animated.View style={[s.sheet, { paddingBottom: Math.max(insets.bottom, 14) + 6 }, contentStyle, sheetStyle]}>
            <View style={s.grabber} />
            {children}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    root: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(14,10,40,0.55)" },
    sheet: {
      backgroundColor: theme.surface,
      borderTopLeftRadius: 26,
      borderTopRightRadius: 26,
      paddingHorizontal: 20,
      paddingTop: 10,
      alignItems: "stretch",
    },
    grabber: { alignSelf: "center", width: 42, height: 5, borderRadius: 3, backgroundColor: theme.border, marginBottom: 14 },
  });
