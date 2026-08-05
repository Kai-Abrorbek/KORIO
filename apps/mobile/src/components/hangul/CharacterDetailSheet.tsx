import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { HangulCharacter } from "@/types/hangul";
import { useSpeech } from "@/hooks/useSpeech";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  character: HangulCharacter | null;
  visible: boolean;
  onClose: () => void;
  onStartGame: () => void;
}

export default function CharacterDetailSheet({
  character,
  visible,
  onClose,
  onStartGame,
}: Props) {
  const { t } = useTranslation();
  const { speak, isSpeaking } = useSpeech();
  const theme = useTheme();
  const styles = getStyles(theme);
  const insets = useSafeAreaInsets();

  const CLOSED = 800;
  const DURATION = 250; // 열 때·닫을 때 동일

  const backdrop = useSharedValue(0);
  const sheetY = useSharedValue(CLOSED);
  const charIn = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      backdrop.value = withTiming(1, { duration: DURATION });
      sheetY.value = withTiming(0, {
        duration: DURATION,
        easing: Easing.out(Easing.cubic),
      });
      // 튀지 않게 — 살짝 커지며 페이드인만
      charIn.value = withDelay(90, withTiming(1, { duration: 220 }));
    } else {
      backdrop.value = withTiming(0, { duration: DURATION });
      sheetY.value = withTiming(CLOSED, {
        duration: DURATION,
        easing: Easing.in(Easing.cubic),
      });
      charIn.value = 0;
    }
  }, [visible]);

  // 아래로 끌어서 닫기
  const dragClose = Gesture.Pan()
    .onUpdate((e) => {
      sheetY.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      if (e.translationY > 90 || e.velocityY > 800) {
        sheetY.value = withTiming(CLOSED, { duration: DURATION });
        backdrop.value = withTiming(0, { duration: DURATION });
        runOnJS(onClose)();
      } else {
        sheetY.value = withTiming(0, { duration: 160 });
      }
    });

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdrop.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetY.value }],
  }));

  const charStyle = useAnimatedStyle(() => ({
    opacity: charIn.value,
    transform: [{ scale: 0.9 + charIn.value * 0.1 }],
  }));

  if (!character) return null;

  const handleSpeak = () => {
    speak(character.name);
  };

  return (
    <Modal
      transparent
      visible={visible}
      // Modal 자체 슬라이드를 쓰면 아래 sheetY 애니와 겹쳐서
      // 열림/닫힘 속도가 달라진다. 애니는 우리가 전부 제어.
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={styles.root}>
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            sheetStyle,
            // 안드로이드 네비바에 안 깔리게
            { paddingBottom: insets.bottom + 20 },
          ]}
        >
          {/* 핸들 — 아래로 끌면 닫힘 */}
          <GestureDetector gesture={dragClose}>
            <View style={styles.handleZone}>
              <View style={styles.handle} />
            </View>
          </GestureDetector>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* 글자 디스플레이 */}
            <View style={styles.charArea}>
              <View style={styles.ring} />
              <Animated.View style={[styles.charBubble, charStyle]}>
                <Text style={styles.bigChar}>{character.char}</Text>
              </Animated.View>
            </View>

            {/* 이름 + 로마자 */}
            <Text style={styles.name}>{character.name}</Text>
            <Text style={styles.roman}>{character.romanization}</Text>

            {/* 음성 버튼 */}
            <TouchableOpacity
              style={[styles.audioBtn, isSpeaking && styles.audioBtnActive]}
              onPress={handleSpeak}
              activeOpacity={0.85}
            >
              <Ionicons
                name={isSpeaking ? "volume-high" : "volume-medium"}
                size={22}
                color={isSpeaking ? "#fff" : "#776ee2"}
              />
              <Text
                style={[styles.audioBtnText, isSpeaking && { color: "#fff" }]}
              >
                {t("hangul.detail.listen")}
              </Text>
            </TouchableOpacity>

            {/* 예시 단어 */}
            <Text style={styles.sectionTitle}>
              {t("hangul.detail.examples")}
            </Text>
            <View style={styles.examplesGrid}>
              {character.examples.map((ex, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.exampleChip}
                  onPress={() => speak(ex.word)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.exampleWord}>{ex.word}</Text>
                  <Text style={styles.exampleRoman}>{ex.romanization}</Text>
                  <Ionicons
                    name="volume-medium-outline"
                    size={14}
                    color="#776ee2"
                    style={{ marginLeft: 4 }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* 게임 CTA */}
            <TouchableOpacity
              style={styles.gameBtn}
              activeOpacity={0.85}
              onPress={() => {
                onClose();
                setTimeout(onStartGame, 300);
              }}
            >
              <Ionicons name="game-controller" size={20} color="#fff" />
              <Text style={styles.gameBtnText}>
                {t("hangul.detail.playGame")}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    root: { flex: 1, justifyContent: "flex-end" },
    backdrop: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    sheet: {
      backgroundColor: theme.bg,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingHorizontal: 20,
      paddingTop: 6,
      maxHeight: "85%",
    },
    // 끌기 편하게 터치 영역을 넉넉히
    handleZone: {
      alignSelf: "stretch",
      alignItems: "center",
      paddingTop: 6,
      paddingBottom: 14,
    },
    handle: {
      width: 44,
      height: 5,
      borderRadius: 3,
      backgroundColor: theme.border,
    },
    charArea: {
      alignItems: "center",
      justifyContent: "center",
      height: 200,
      marginBottom: 12,
    },
    // 무한 펄스 빼고 은은한 후광으로 고정
    ring: {
      position: "absolute",
      width: 184,
      height: 184,
      borderRadius: 92,
      backgroundColor: "#776ee2",
      opacity: 0.22,
    },
    charBubble: {
      width: 160,
      height: 160,
      borderRadius: 80,
      backgroundColor: "#776ee2",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#776ee2",
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 8,
    },
    bigChar: {
      fontSize: 100,
      color: "#fff",
      fontWeight: "800",
      lineHeight: 120,
    },
    name: {
      fontSize: 26,
      fontWeight: "900",
      color: theme.text,
      textAlign: "center",
      marginBottom: 4,
    },
    roman: {
      fontSize: 18,
      fontWeight: "700",
      color: "#776ee2",
      textAlign: "center",
      marginBottom: 18,
      letterSpacing: 2,
      textTransform: "uppercase",
    },
    audioBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderWidth: 2,
      borderColor: "#776ee2",
      borderRadius: 14,
      paddingVertical: 12,
      marginBottom: 24,
      backgroundColor: theme.surface,
    },
    audioBtnActive: {
      backgroundColor: "#776ee2",
    },
    audioBtnText: {
      fontSize: 15,
      fontWeight: "800",
      color: "#776ee2",
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "800",
      color: theme.textSecondary,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 10,
    },
    examplesGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 22,
    },
    exampleChip: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderBottomWidth: 3,
      borderColor: theme.border,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 10,
    },
    exampleWord: {
      fontSize: 16,
      fontWeight: "800",
      color: theme.text,
      marginRight: 6,
    },
    exampleRoman: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.textSecondary,
    },
    gameBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: "#776ee2",
      borderRadius: 16,
      paddingVertical: 16,
      borderBottomWidth: 4,
      borderColor: "#5448E0",
    },
    gameBtnText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "900",
    },
  });
