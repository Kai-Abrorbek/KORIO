import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import type { ThemeColors } from "@/constants/theme";
import type { SpeechVoice } from "@/services/tts.service";

interface Props {
  visible: boolean;
  voices: SpeechVoice[];
  selectedVoice: string;
  loading: boolean;
  loadFailed: boolean;
  previewingVoice: string | null;
  isSpeaking: boolean;
  theme: ThemeColors;
  onClose: () => void;
  onRetry: () => void;
  onSelect: (voice: SpeechVoice) => void;
  onPreview: (voice: SpeechVoice) => void;
}

export function VoicePickerModal({
  visible,
  voices,
  selectedVoice,
  loading,
  loadFailed,
  previewingVoice,
  isSpeaking,
  theme,
  onClose,
  onRetry,
  onSelect,
  onPreview,
}: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();
  const s = getStyles(theme);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (visible) translateY.value = 0;
  }, [translateY, visible]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const dismissGesture = Gesture.Pan()
    .activeOffsetY(8)
    .failOffsetX([-24, 24])
    .onUpdate((event) => {
      translateY.value = Math.max(0, event.translationY);
    })
    .onEnd((event) => {
      const shouldClose = event.translationY > 100 || event.velocityY > 900;

      if (shouldClose) {
        translateY.value = withTiming(
          screenHeight,
          { duration: 200, easing: Easing.in(Easing.cubic) },
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
      animationType="slide"
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={s.modalRoot}>
        <Pressable style={s.backdrop} onPress={onClose} />
        <Animated.View
          style={[
            s.sheet,
            { paddingBottom: Math.max(insets.bottom, 18) },
            sheetStyle,
          ]}
        >
          <GestureDetector gesture={dismissGesture}>
            <View style={s.dragArea}>
              <View style={s.handle} />
              <View style={s.header}>
                <View style={s.headerText}>
                  <Text style={s.title}>
                    {t("settings.sound.voicePickerTitle")}
                  </Text>
                  <Text style={s.subtitle}>
                    {t("settings.sound.voicePickerDesc")}
                  </Text>
                </View>
                <Pressable style={s.close} onPress={onClose} hitSlop={8}>
                  <Ionicons
                    name="close"
                    size={23}
                    color={theme.textSecondary}
                  />
                </Pressable>
              </View>
            </View>
          </GestureDetector>

          {loading ? (
            <View style={s.stateBox}>
              <ActivityIndicator color={theme.primary} />
              <Text style={s.stateText}>
                {t("settings.sound.loadingVoices")}
              </Text>
            </View>
          ) : loadFailed ? (
            <View style={s.stateBox}>
              <Ionicons
                name="cloud-offline-outline"
                size={30}
                color={theme.textSecondary}
              />
              <Text style={s.stateText}>
                {t("settings.sound.voiceLoadError")}
              </Text>
              <Pressable style={s.retry} onPress={onRetry}>
                <Text style={s.retryText}>{t("settings.sound.retry")}</Text>
              </Pressable>
            </View>
          ) : (
            <FlatList
              data={voices}
              keyExtractor={(voice) => voice.shortName}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={s.list}
              renderItem={({ item }) => {
                const selected = item.shortName === selectedVoice;
                const previewing =
                  item.shortName === previewingVoice && isSpeaking;
                return (
                  <Pressable
                    style={({ pressed }) => [
                      s.voiceRow,
                      selected && s.voiceRowSelected,
                      pressed && s.voiceRowPressed,
                    ]}
                    onPress={() => onSelect(item)}
                  >
                    <View
                      style={[
                        s.avatar,
                        {
                          backgroundColor:
                            item.gender === "female" ? "#FFE0EC" : "#DDEBFF",
                        },
                      ]}
                    >
                      <Ionicons
                        name="person"
                        size={20}
                        color={item.gender === "female" ? "#E85D97" : "#4E88D8"}
                      />
                    </View>
                    <View style={s.voiceText}>
                      <View style={s.nameLine}>
                        <Text style={s.voiceName}>{item.localName}</Text>
                        {selected ? (
                          <View style={s.selectedBadge}>
                            <Text style={s.selectedText}>
                              {t("settings.sound.selectedVoice")}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                      <Text style={s.voiceMeta}>
                        {t(`settings.sound.${item.gender}`)} ·{" "}
                        {item.displayName}
                      </Text>
                    </View>
                    <Pressable
                      style={({ pressed }) => [
                        s.preview,
                        previewing && s.previewActive,
                        pressed && { opacity: 0.55 },
                      ]}
                      onPress={(event) => {
                        event.stopPropagation();
                        onPreview(item);
                      }}
                      hitSlop={6}
                    >
                      <Ionicons
                        name={previewing ? "stop" : "play"}
                        size={17}
                        color={previewing ? "#fff" : theme.primary}
                      />
                    </Pressable>
                  </Pressable>
                );
              }}
            />
          )}
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    modalRoot: { flex: 1, justifyContent: "flex-end" },
    backdrop: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: "rgba(18, 24, 38, 0.42)",
    },
    sheet: {
      maxHeight: "82%",
      minHeight: 360,
      borderTopLeftRadius: 26,
      borderTopRightRadius: 26,
      backgroundColor: theme.bg,
      paddingTop: 10,
      paddingHorizontal: 18,
    },
    dragArea: { marginHorizontal: -4 },
    handle: {
      width: 42,
      height: 5,
      borderRadius: 3,
      backgroundColor: theme.border,
      alignSelf: "center",
      marginBottom: 14,
    },
    header: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 12,
      paddingHorizontal: 4,
      paddingBottom: 14,
    },
    headerText: { flex: 1 },
    title: { fontSize: 21, fontWeight: "800", color: theme.text },
    subtitle: {
      marginTop: 4,
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "500",
      color: theme.textSecondary,
    },
    close: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.surface,
    },
    list: { gap: 8, paddingBottom: 12 },
    voiceRow: {
      minHeight: 70,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 12,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    voiceRowSelected: { borderColor: theme.primary },
    voiceRowPressed: { opacity: 0.68 },
    avatar: {
      width: 42,
      height: 42,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    voiceText: { flex: 1 },
    nameLine: { flexDirection: "row", alignItems: "center", gap: 7 },
    voiceName: { fontSize: 16, fontWeight: "800", color: theme.text },
    voiceMeta: {
      marginTop: 3,
      fontSize: 12,
      fontWeight: "500",
      color: theme.textSecondary,
    },
    selectedBadge: {
      paddingHorizontal: 7,
      paddingVertical: 2,
      borderRadius: 7,
      backgroundColor: theme.primary + "22",
    },
    selectedText: { fontSize: 10, fontWeight: "800", color: theme.primary },
    preview: {
      width: 38,
      height: 38,
      borderRadius: 19,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: theme.primary,
    },
    previewActive: { backgroundColor: theme.primary },
    stateBox: {
      flex: 1,
      minHeight: 260,
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    },
    stateText: {
      fontSize: 14,
      fontWeight: "600",
      textAlign: "center",
      color: theme.textSecondary,
    },
    retry: {
      paddingHorizontal: 18,
      paddingVertical: 9,
      borderRadius: 12,
      backgroundColor: theme.primary,
    },
    retryText: { color: "#fff", fontSize: 13, fontWeight: "800" },
  });
