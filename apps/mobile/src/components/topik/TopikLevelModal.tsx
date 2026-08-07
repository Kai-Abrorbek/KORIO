import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
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
import { type TopikPalette, useTopikTheme } from "./topikTheme";

export type TopikLevel = "1" | "2";

interface TopikLevelModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (level: TopikLevel) => void;
}

const LEVELS: Array<{
  level: TopikLevel;
  roman: string;
  labelKey: string;
  descriptionKey: string;
  sectionsKey: string;
  icon: keyof typeof Ionicons.glyphMap;
}> = [
  {
    level: "1",
    roman: "I",
    labelKey: "topik.levelModal.levelOneLabel",
    descriptionKey: "topik.levelModal.levelOneDescription",
    sectionsKey: "topik.levelModal.levelOneSections",
    icon: "leaf-outline",
  },
  {
    level: "2",
    roman: "II",
    labelKey: "topik.levelModal.levelTwoLabel",
    descriptionKey: "topik.levelModal.levelTwoDescription",
    sectionsKey: "topik.levelModal.levelTwoSections",
    icon: "diamond-outline",
  },
];

export function TopikLevelModal({
  visible,
  onClose,
  onSelect,
}: TopikLevelModalProps) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
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
            accessibilityLabel={t("topik.common.close")}
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
              <Ionicons name="ribbon" size={22} color={palette.white} />
            </View>
            <View style={styles.headerCopy}>
              <Text style={styles.eyebrow}>{t("topik.levelModal.eyebrow")}</Text>
              <Text style={styles.title}>{t("topik.levelModal.title")}</Text>
              <Text style={styles.subtitle}>
                {t("topik.levelModal.subtitle")}
              </Text>
            </View>
            <Pressable
              accessibilityLabel={t("topik.common.close")}
              hitSlop={10}
              onPress={onClose}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={21} color={palette.textMuted} />
            </Pressable>
          </View>

          <View style={styles.levelList}>
            {LEVELS.map((item) => {
              const accent = item.level === "1" ? palette.success : palette.purple;
              const colors = item.level === "1" ? palette.levelOneGradient : palette.levelTwoGradient;

              return (
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
                  colors={colors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.levelBadge}
                >
                  <Ionicons name={item.icon} size={19} color={palette.white} />
                  <Text style={styles.levelBadgeSmall}>TOPIK</Text>
                  <Text style={styles.levelBadgeRoman}>{item.roman}</Text>
                </LinearGradient>
                <View style={styles.levelInfo}>
                  <View style={styles.levelTitleRow}>
                    <Text style={styles.levelTitle}>{t(item.labelKey)}</Text>
                    <View
                      style={[
                        styles.sectionPill,
                        { backgroundColor: palette.isDark ? palette.surfaceMuted : `${accent}12` },
                      ]}
                    >
                      <Text
                        style={[styles.sectionPillText, { color: accent }]}
                      >
                        {t("topik.levelModal.examPrep")}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.levelDescription}>
                    {t(item.descriptionKey)}
                  </Text>
                  <View style={styles.sectionRow}>
                    <Ionicons
                      name="layers-outline"
                      size={14}
                      color={accent}
                    />
                    <Text style={[styles.sections, { color: accent }]}>
                      {t(item.sectionsKey)}
                    </Text>
                  </View>
                </View>
                <View style={styles.arrowButton}>
                  <Ionicons name="arrow-forward" size={18} color={palette.text} />
                </View>
              </Pressable>
              );
            })}
          </View>

                <View style={styles.assurance}>
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={16}
                    color={palette.textMuted}
                  />
                  <Text style={styles.assuranceText}>
                    {t("topik.levelModal.assurance")}
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

const getStyles = (palette: TopikPalette) => StyleSheet.create({
  modalRoot: { flex: 1 },
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: palette.overlay,
  },
  sheet: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: palette.surface,
    paddingHorizontal: 18,
    paddingTop: 10,
    shadowColor: palette.shadow,
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
    backgroundColor: palette.borderStrong,
    marginBottom: 18,
  },
  header: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  headerIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: palette.primaryStrong,
  },
  headerCopy: { flex: 1 },
  eyebrow: {
    color: palette.textMuted,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.15,
  },
  title: {
    color: palette.text,
    fontSize: 21,
    lineHeight: 29,
    fontWeight: "900",
    letterSpacing: -0.5,
    marginTop: 3,
  },
  subtitle: { color: palette.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 5 },
  closeButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: palette.surfaceMuted,
  },
  levelList: { gap: 11, marginTop: 20 },
  levelCard: {
    minHeight: 122,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 20,
    backgroundColor: palette.surfaceElevated,
    padding: 12,
    shadowColor: palette.shadow,
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
    color: palette.white,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.3,
    marginTop: 7,
  },
  levelBadgeRoman: {
    color: palette.white,
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
  levelTitle: { color: palette.text, fontSize: 15, fontWeight: "900" },
  sectionPill: { borderRadius: 7, paddingHorizontal: 7, paddingVertical: 3 },
  sectionPillText: { fontSize: 9, fontWeight: "900" },
  levelDescription: { color: palette.textSecondary, fontSize: 11, lineHeight: 17 },
  sectionRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  sections: { fontSize: 11, fontWeight: "800" },
  arrowButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: palette.surfaceMuted,
  },
  assurance: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 16,
    marginBottom: 20,
  },
  assuranceText: { color: palette.textMuted, fontSize: 10, fontWeight: "600" },
});
