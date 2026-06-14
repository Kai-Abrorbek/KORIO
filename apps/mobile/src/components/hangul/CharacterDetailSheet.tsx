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
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated";
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

  const backdrop = useSharedValue(0);
  const sheetY = useSharedValue(800);
  const charScale = useSharedValue(0);
  const charRotate = useSharedValue(-30);
  const ringScale = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      backdrop.value = withTiming(1, { duration: 250 });
      sheetY.value = withSpring(0, { damping: 16, stiffness: 130 });
      charScale.value = withDelay(
        150,
        withSpring(1, { damping: 8, stiffness: 180 }),
      );
      charRotate.value = withDelay(
        150,
        withSpring(0, { damping: 10, stiffness: 160 }),
      );
      ringScale.value = withDelay(
        300,
        withRepeat(
          withSequence(
            withTiming(1.15, {
              duration: 1500,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(1, {
              duration: 1500,
              easing: Easing.inOut(Easing.ease),
            }),
          ),
          -1,
          true,
        ),
      );
    } else {
      backdrop.value = withTiming(0, { duration: 200 });
      sheetY.value = withTiming(800, { duration: 250 });
      charScale.value = 0;
      charRotate.value = -30;
      ringScale.value = 0;
    }
  }, [visible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdrop.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetY.value }],
  }));

  const charStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: charScale.value },
      { rotate: `${charRotate.value}deg` },
    ],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: 0.4,
  }));

  if (!character) return null;

  const handleSpeak = () => {
    speak(character.name);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <Animated.View style={[styles.sheet, sheetStyle]}>
          {/* Handle */}
          <View style={styles.handle} />

          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            {/* 글자 디스플레이 */}
            <View style={styles.charArea}>
              <Animated.View style={[styles.ring, ringStyle]} />
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
      </View>
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
      paddingTop: 10,
      paddingBottom: 30,
      maxHeight: "85%",
      overflow: "hidden",
    },
    handle: {
      width: 44,
      height: 5,
      borderRadius: 3,
      backgroundColor: theme.border,
      alignSelf: "center",
      marginBottom: 16,
    },
    charArea: {
      alignItems: "center",
      justifyContent: "center",
      height: 200,
      marginBottom: 12,
    },
    ring: {
      position: "absolute",
      width: 180,
      height: 180,
      borderRadius: 90,
      backgroundColor: "#776ee2",
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
      overflow: "hidden",
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
      maxWidth: "47%",
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
