import type { ReactNode } from "react";
import { useEffect } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  Easing,
  FadeIn,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTopikTheme } from "./topikTheme";

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const OPEN_MS = 260;
const CLOSE_MS = 200;

/**
 * 오른쪽에서 밀려 들어오는 패널.
 * 해설처럼 "본문은 그대로 두고 옆에서 꺼내 보는" 내용에 쓴다.
 * 내부는 세로 스크롤되고, 배경을 누르거나 닫기를 누르면 닫힌다.
 *
 * RN Modal 은 앱 루트 밖에 렌더되므로 제스처가 먹으려면
 * 자체 GestureHandlerRootView 로 감싸야 한다.
 */
export function TopikSideSheet({
  visible,
  onClose,
  title,
  subtitle,
  children,
}: Props) {
  const palette = useTopikTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const panelWidth = Math.min(width * 0.92, 460);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      progress.value = withTiming(1, {
        duration: OPEN_MS,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [visible, progress]);

  const close = () => {
    progress.value = withTiming(
      0,
      { duration: CLOSE_MS, easing: Easing.in(Easing.cubic) },
      (finished) => {
        if (finished) runOnJS(onClose)();
      },
    );
  };

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (1 - progress.value) * panelWidth }],
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={close}
      statusBarTranslucent
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={s.wrap}>
          <Animated.View
            entering={FadeIn.duration(OPEN_MS)}
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: palette.overlay },
            ]}
          >
            <Pressable style={{ flex: 1 }} onPress={close} />
          </Animated.View>

          <Animated.View
            style={[
              s.panel,
              panelStyle,
              {
                width: panelWidth,
                backgroundColor: palette.surfaceElevated,
                paddingTop: insets.top + 12,
                paddingBottom: insets.bottom + 20,
                borderLeftColor: palette.border,
              },
            ]}
          >
            <View style={s.header}>
              <View style={{ flex: 1 }}>
                <Text style={[s.title, { color: palette.text }]}>{title}</Text>
                {!!subtitle && (
                  <Text style={[s.subtitle, { color: palette.textSecondary }]}>
                    {subtitle}
                  </Text>
                )}
              </View>
              <Pressable
                onPress={close}
                hitSlop={10}
                style={[s.closeBtn, { backgroundColor: palette.surfaceMuted }]}
              >
                <Ionicons
                  name="close"
                  size={20}
                  color={palette.textSecondary}
                />
              </Pressable>
            </View>

            <View style={[s.divider, { backgroundColor: palette.divider }]} />

            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={s.content}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </Animated.View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, flexDirection: "row", justifyContent: "flex-end" },
  panel: {
    height: "100%",
    borderLeftWidth: 1,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: -6, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingBottom: 14,
  },
  title: { fontSize: 19, fontWeight: "800" },
  subtitle: { fontSize: 13, fontWeight: "600", marginTop: 4 },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: { height: 1, marginBottom: 16 },
  content: { paddingBottom: 32 },
});
