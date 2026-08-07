import type { ReactNode } from "react";
import { useEffect } from "react";
import {
  Modal,
  Pressable,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTopikTheme } from "./topikTheme";

interface TopikSheetModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  dismissible?: boolean;
  sheetStyle?: StyleProp<ViewStyle>;
}

export function TopikSheetModal({
  visible,
  onClose,
  children,
  dismissible = true,
  sheetStyle,
}: TopikSheetModalProps) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const palette = useTopikTheme();
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (visible) translateY.value = 0;
  }, [translateY, visible]);

  const swipeStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const dismissGesture = Gesture.Pan()
    .enabled(dismissible)
    .activeOffsetY(8)
    .failOffsetX([-24, 24])
    .onUpdate((event) => {
      translateY.value = Math.max(0, event.translationY);
    })
    .onEnd((event) => {
      const shouldClose = event.translationY > 110 || event.velocityY > 900;

      if (shouldClose) {
        translateY.value = withTiming(
          620,
          { duration: 190, easing: Easing.in(Easing.cubic) },
          (finished) => {
            if (finished) runOnJS(onClose)();
          },
        );
        return;
      }

      translateY.value = withTiming(0, {
        duration: 180,
        easing: Easing.out(Easing.cubic),
      });
    });

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      navigationBarTranslucent
      animationType="none"
      onRequestClose={dismissible ? onClose : undefined}
    >
      <GestureHandlerRootView style={styles.modalRoot}>
        <Animated.View
          entering={FadeIn.duration(180)}
          style={[styles.backdrop, { backgroundColor: palette.overlay }]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("topik.common.close")}
            disabled={!dismissible}
            onPress={onClose}
            style={StyleSheet.absoluteFill}
          />

          <Animated.View
            entering={FadeInDown.duration(260).easing(Easing.out(Easing.cubic))}
          >
            <GestureDetector gesture={dismissGesture}>
              <Animated.View
                accessibilityViewIsModal
                style={[
                  styles.sheet,
                  {
                    backgroundColor: palette.surface,
                    shadowColor: palette.shadow,
                    paddingBottom: Math.max(insets.bottom, 18) + 4,
                  },
                  sheetStyle,
                  swipeStyle,
                ]}
              >
                <View
                  style={[
                    styles.handle,
                    { backgroundColor: palette.borderStrong },
                  ]}
                />
                {children}
              </Animated.View>
            </GestureDetector>
          </Animated.View>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: { flex: 1 },
  backdrop: { flex: 1, justifyContent: "flex-end" },
  sheet: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 20,
  },
  handle: {
    width: 42,
    height: 5,
    alignSelf: "center",
    borderRadius: 3,
    marginBottom: 19,
  },
});
