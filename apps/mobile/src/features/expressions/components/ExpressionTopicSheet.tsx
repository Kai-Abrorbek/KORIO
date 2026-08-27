import { useEffect } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
import { useTranslation } from "react-i18next";
import { getUnitColor } from "@/components/roadmap/roadmap.utils";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { ExpressionRoadmapTopic } from "@/types/expression";

interface Props {
  visible: boolean;
  topics: ExpressionRoadmapTopic[];
  activeTopicIndex: number;
  onClose: () => void;
  onSelect: (index: number) => void;
}

const DISMISS_DISTANCE = 110;

export default function ExpressionTopicSheet({
  visible,
  topics,
  activeTopicIndex,
  onClose,
  onSelect,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(theme);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (visible) translateY.value = 0;
  }, [translateY, visible]);

  const dismissGesture = Gesture.Pan()
    .activeOffsetY(8)
    .failOffsetX([-24, 24])
    .onUpdate((event) => {
      translateY.value = Math.max(0, event.translationY);
    })
    .onEnd((event) => {
      if (
        event.translationY > DISMISS_DISTANCE ||
        event.velocityY > 900
      ) {
        translateY.value = withTiming(
          680,
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

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={styles.modalRoot}>
        <Animated.View entering={FadeIn.duration(170)} style={styles.backdrop}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("expressionRoadmap.closeTopicList")}
            onPress={onClose}
            style={StyleSheet.absoluteFill}
          />

          <Animated.View
            entering={FadeInDown.duration(250).easing(
              Easing.out(Easing.cubic),
            )}
            style={[
              styles.sheet,
              { paddingBottom: Math.max(insets.bottom, 16) + 8 },
              sheetStyle,
            ]}
          >
            <GestureDetector gesture={dismissGesture}>
              <View style={styles.dragArea}>
                <View style={styles.handle} />
                <View style={styles.headerRow}>
                  <View style={styles.headerIcon}>
                    <Ionicons name="map" size={23} color={theme.primary} />
                  </View>
                  <View style={styles.headerText}>
                    <Text style={styles.title}>
                      {t("expressionRoadmap.topicListTitle")}
                    </Text>
                    <Text style={styles.subtitle}>
                      {t("expressionRoadmap.topicListSubtitle")}
                    </Text>
                  </View>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={t(
                      "expressionRoadmap.closeTopicList",
                    )}
                    hitSlop={10}
                    onPress={onClose}
                    style={({ pressed }) => [
                      styles.closeButton,
                      pressed && styles.closeButtonPressed,
                    ]}
                  >
                    <Ionicons
                      name="close"
                      size={22}
                      color={theme.textSecondary}
                    />
                  </Pressable>
                </View>
              </View>
            </GestureDetector>

            <FlatList
              data={topics}
              keyExtractor={(topic) => topic.id}
              style={styles.list}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              renderItem={({ item, index }) => {
                const color = getUnitColor(index);
                const selected = index === activeTopicIndex;
                const completed =
                  item.totalNodes > 0 &&
                  item.completedNodes >= item.totalNodes;
                const locked =
                  item.nodes.length > 0 &&
                  item.nodes.every((node) => node.status === "locked");
                const progress = Math.max(0, Math.min(1, item.progress));
                const progressWidth = `${Math.round(progress * 100)}%` as `${number}%`;

                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={`${index + 1}. ${item.title}`}
                    onPress={() => onSelect(index)}
                    style={({ pressed }) => [
                      styles.topicCard,
                      selected && {
                        borderColor: color,
                        backgroundColor: `${color}12`,
                      },
                      pressed && styles.topicCardPressed,
                    ]}
                  >
                    <View
                      style={[
                        styles.topicIcon,
                        { backgroundColor: `${color}1C` },
                      ]}
                    >
                      {item.media.emoji ? (
                        <Text style={styles.emoji}>{item.media.emoji}</Text>
                      ) : (
                        <Ionicons
                          name="chatbubble-ellipses-outline"
                          size={24}
                          color={color}
                        />
                      )}
                    </View>

                    <View style={styles.topicBody}>
                      <View style={styles.topicTitleRow}>
                        <Text style={styles.topicNumber}>
                          {String(index + 1).padStart(2, "0")}
                        </Text>
                        <Text style={styles.topicTitle} numberOfLines={1}>
                          {item.title}
                        </Text>
                        {selected ? (
                          <View
                            style={[
                              styles.currentBadge,
                              { backgroundColor: `${color}1F` },
                            ]}
                          >
                            <Text
                              style={[styles.currentBadgeText, { color }]}
                            >
                              {t("expressionRoadmap.topicListCurrent")}
                            </Text>
                          </View>
                        ) : null}
                      </View>

                      <Text style={styles.topicDescription} numberOfLines={2}>
                        {item.description}
                      </Text>

                      <View style={styles.progressRow}>
                        <View style={styles.progressTrack}>
                          <View
                            style={[
                              styles.progressFill,
                              { width: progressWidth, backgroundColor: color },
                            ]}
                          />
                        </View>
                        <Text style={styles.progressText}>
                          {t("expressionRoadmap.topicListProgress", {
                            completed: item.completedNodes,
                            total: item.totalNodes,
                          })}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.statusIcon,
                        { backgroundColor: `${color}16` },
                      ]}
                    >
                      <Ionicons
                        name={
                          completed
                            ? "checkmark"
                            : locked
                              ? "lock-closed"
                              : "chevron-forward"
                        }
                        size={18}
                        color={color}
                      />
                    </View>
                  </Pressable>
                );
              }}
            />
          </Animated.View>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    modalRoot: { flex: 1 },
    backdrop: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(13, 12, 29, 0.58)",
    },
    sheet: {
      width: "100%",
      maxWidth: 560,
      maxHeight: "84%",
      alignSelf: "center",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: theme.surface,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: -8 },
      shadowOpacity: 0.2,
      shadowRadius: 24,
      elevation: 22,
      overflow: "hidden",
    },
    dragArea: { paddingHorizontal: 20, paddingTop: 10 },
    handle: {
      width: 44,
      height: 5,
      alignSelf: "center",
      borderRadius: 99,
      marginBottom: 17,
      backgroundColor: theme.border,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingBottom: 17,
    },
    headerIcon: {
      width: 48,
      height: 48,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: `${theme.primary}16`,
      borderWidth: 1,
      borderColor: `${theme.primary}2E`,
    },
    headerText: { flex: 1, minWidth: 0, gap: 3 },
    title: {
      color: theme.text,
      fontSize: 21,
      fontWeight: "900",
      letterSpacing: -0.4,
    },
    subtitle: {
      color: theme.textSecondary,
      fontSize: 12.5,
      fontWeight: "600",
      lineHeight: 18,
    },
    closeButton: {
      width: 38,
      height: 38,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.bg,
    },
    closeButtonPressed: { opacity: 0.7, transform: [{ scale: 0.96 }] },
    list: { flexShrink: 1 },
    listContent: {
      paddingHorizontal: 16,
      paddingTop: 2,
      paddingBottom: 8,
    },
    topicCard: {
      minHeight: 102,
      marginBottom: 11,
      padding: 13,
      borderRadius: 22,
      borderWidth: 1.5,
      borderColor: theme.border,
      backgroundColor: theme.bg,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    topicCardPressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
    topicIcon: {
      width: 54,
      height: 54,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    emoji: { fontSize: 27 },
    topicBody: { flex: 1, minWidth: 0, gap: 6 },
    topicTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    topicNumber: {
      color: theme.textSecondary,
      fontSize: 10.5,
      fontWeight: "900",
      letterSpacing: 0.7,
    },
    topicTitle: {
      flex: 1,
      color: theme.text,
      fontSize: 15.5,
      fontWeight: "900",
      letterSpacing: -0.15,
    },
    currentBadge: {
      borderRadius: 99,
      paddingHorizontal: 7,
      paddingVertical: 4,
    },
    currentBadgeText: { fontSize: 9.5, fontWeight: "900" },
    topicDescription: {
      color: theme.textSecondary,
      fontSize: 11.5,
      fontWeight: "600",
      lineHeight: 16,
    },
    progressRow: { flexDirection: "row", alignItems: "center", gap: 9 },
    progressTrack: {
      flex: 1,
      height: 6,
      borderRadius: 99,
      overflow: "hidden",
      backgroundColor: theme.border,
    },
    progressFill: { height: "100%", borderRadius: 99 },
    progressText: {
      color: theme.textSecondary,
      fontSize: 10,
      fontWeight: "800",
    },
    statusIcon: {
      width: 32,
      height: 32,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
  });
