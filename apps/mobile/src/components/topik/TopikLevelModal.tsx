import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
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

export type TopikLevel = "1" | "2";

interface TopikLevelModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (level: TopikLevel) => void;
}

const LEVELS: Array<{
  level: TopikLevel;
  roman: string;
  label: string;
  description: string;
  sections: string;
  icon: keyof typeof Ionicons.glyphMap;
  colors: readonly [string, string];
  accent: string;
}> = [
  {
    level: "1",
    roman: "I",
    label: "초급 실력 완성",
    description: "일상생활에 필요한 기본 한국어 능력을 준비해요.",
    sections: "읽기 · 듣기",
    icon: "leaf-outline",
    colors: ["#0F766E", "#14A394"],
    accent: "#0F766E",
  },
  {
    level: "2",
    roman: "II",
    label: "중·고급 합격 대비",
    description: "유학과 취업에 필요한 실전 한국어 능력을 준비해요.",
    sections: "읽기 · 듣기 · 쓰기",
    icon: "diamond-outline",
    colors: ["#263E75", "#6553B6"],
    accent: "#4F46A5",
  },
];

export function TopikLevelModal({
  visible,
  onClose,
  onSelect,
}: TopikLevelModalProps) {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (visible) translateY.value = 0;
  }, [translateY, visible]);

  const swipeStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const dismissGesture = Gesture.Pan()
    .activeOffsetY(8)
    .failOffsetX([-24, 24])
    .onUpdate((event) => {
      translateY.value = Math.max(0, event.translationY);
    })
    .onEnd((event) => {
      const shouldClose = event.translationY > 110 || event.velocityY > 900;

      if (shouldClose) {
        translateY.value = withTiming(
          520,
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
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={styles.modalRoot}>
        <Animated.View entering={FadeIn.duration(180)} style={styles.backdrop}>
          <Pressable
            accessibilityRole="button"
            style={StyleSheet.absoluteFill}
            onPress={onClose}
          />
          <Animated.View
            entering={FadeInDown.duration(260).easing(Easing.out(Easing.cubic))}
          >
            <GestureDetector gesture={dismissGesture}>
              <Animated.View
                style={[
                  styles.sheet,
                  { paddingBottom: Math.max(insets.bottom, 18) },
                  swipeStyle,
                ]}
              >
          <View style={styles.handle} />
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Ionicons name="ribbon" size={22} color="#FFFFFF" />
            </View>
            <View style={styles.headerCopy}>
              <Text style={styles.eyebrow}>PERSONALIZE YOUR PLAN</Text>
              <Text style={styles.title}>어떤 TOPIK을 준비하나요?</Text>
              <Text style={styles.subtitle}>
                목표 급수에 맞는 시험 구성과 학습 분석을 준비할게요.
              </Text>
            </View>
            <Pressable
              accessibilityLabel="닫기"
              hitSlop={10}
              onPress={onClose}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={21} color="#6C7480" />
            </Pressable>
          </View>

          <View style={styles.levelList}>
            {LEVELS.map((item) => (
              <Pressable
                key={item.level}
                accessibilityRole="button"
                onPress={() => onSelect(item.level)}
                style={({ pressed }) => [
                  styles.levelCard,
                  pressed && styles.levelCardPressed,
                ]}
              >
                <LinearGradient
                  colors={item.colors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.levelBadge}
                >
                  <Ionicons name={item.icon} size={19} color="#FFFFFF" />
                  <Text style={styles.levelBadgeSmall}>TOPIK</Text>
                  <Text style={styles.levelBadgeRoman}>{item.roman}</Text>
                </LinearGradient>
                <View style={styles.levelInfo}>
                  <View style={styles.levelTitleRow}>
                    <Text style={styles.levelTitle}>{item.label}</Text>
                    <View
                      style={[
                        styles.sectionPill,
                        { backgroundColor: `${item.accent}12` },
                      ]}
                    >
                      <Text
                        style={[styles.sectionPillText, { color: item.accent }]}
                      >
                        시험 대비
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.levelDescription}>
                    {item.description}
                  </Text>
                  <View style={styles.sectionRow}>
                    <Ionicons
                      name="layers-outline"
                      size={14}
                      color={item.accent}
                    />
                    <Text style={[styles.sections, { color: item.accent }]}>
                      {item.sections}
                    </Text>
                  </View>
                </View>
                <View style={styles.arrowButton}>
                  <Ionicons name="arrow-forward" size={18} color="#303947" />
                </View>
              </Pressable>
            ))}
          </View>

                <View style={styles.assurance}>
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={16}
                    color="#597087"
                  />
                  <Text style={styles.assuranceText}>
                    선택한 급수는 언제든 다시 변경할 수 있어요.
                  </Text>
                </View>
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
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(11, 18, 31, 0.62)",
  },
  sheet: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 18,
    paddingTop: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 18,
  },
  handle: {
    alignSelf: "center",
    width: 42,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D5D9DF",
    marginBottom: 18,
  },
  header: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  headerIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#202F57",
  },
  headerCopy: { flex: 1 },
  eyebrow: {
    color: "#6E7690",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.15,
  },
  title: {
    color: "#161C2A",
    fontSize: 21,
    lineHeight: 29,
    fontWeight: "900",
    letterSpacing: -0.5,
    marginTop: 3,
  },
  subtitle: { color: "#69717E", fontSize: 12, lineHeight: 18, marginTop: 5 },
  closeButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: "#ECEEF2",
  },
  levelList: { gap: 11, marginTop: 20 },
  levelCard: {
    minHeight: 122,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    borderWidth: 1,
    borderColor: "#E0E4EA",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    padding: 12,
    shadowColor: "#182238",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.055,
    shadowRadius: 12,
    elevation: 2,
  },
  levelCardPressed: { opacity: 0.82, transform: [{ scale: 0.985 }] },
  levelBadge: {
    width: 78,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  levelBadgeSmall: {
    color: "#DDE9F5",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.3,
    marginTop: 7,
  },
  levelBadgeRoman: {
    color: "#FFFFFF",
    fontSize: 27,
    lineHeight: 31,
    fontWeight: "900",
  },
  levelInfo: { flex: 1, gap: 6 },
  levelTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  levelTitle: { color: "#242A35", fontSize: 15, fontWeight: "900" },
  sectionPill: { borderRadius: 7, paddingHorizontal: 7, paddingVertical: 3 },
  sectionPillText: { fontSize: 9, fontWeight: "900" },
  levelDescription: { color: "#737A84", fontSize: 11, lineHeight: 17 },
  sectionRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  sections: { fontSize: 11, fontWeight: "800" },
  arrowButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#F0F2F5",
  },
  assurance: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 16,
    marginBottom: 20,
  },
  assuranceText: { color: "#747D88", fontSize: 10, fontWeight: "600" },
});
