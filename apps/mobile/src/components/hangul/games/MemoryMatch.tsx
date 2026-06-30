import { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  Easing,
  runOnJS,
  interpolate,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { HangulCharacter, MemoryCard as Card } from "@/types/hangul";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

const PAIRS = 8;
const FLIP_BACK_DELAY = 900;

interface Props {
  characters: HangulCharacter[];
  onExit: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildDeck(chars: HangulCharacter[]): Card[] {
  const picked = shuffle(chars).slice(0, PAIRS);
  const cards: Card[] = [];
  picked.forEach((c) => {
    cards.push({
      id: `${c.id}-h`,
      characterId: c.id,
      type: "hangul",
      display: c.char,
      isFlipped: false,
      isMatched: false,
    });
    cards.push({
      id: `${c.id}-r`,
      characterId: c.id,
      type: "roman",
      display: c.romanization,
      isFlipped: false,
      isMatched: false,
    });
  });
  return shuffle(cards);
}

// ─── 카드 컴포넌트 ───
function MemoryCardView({
  card,
  onPress,
  disabled,
  matchedTrigger,
}: {
  card: Card;
  onPress: () => void;
  disabled: boolean;
  matchedTrigger: number;
}) {
  const theme = useTheme();
  const styles = cardStyles(theme);
  const flip = useSharedValue(card.isFlipped ? 180 : 0);
  const matchScale = useSharedValue(1);
  const matchGlow = useSharedValue(0);
  const shake = useSharedValue(0);

  useEffect(() => {
    flip.value = withSpring(card.isFlipped ? 180 : 0, {
      damping: 14,
      stiffness: 130,
    });
  }, [card.isFlipped]);

  useEffect(() => {
    if (card.isMatched && matchedTrigger > 0) {
      matchScale.value = withSequence(
        withTiming(1.18, { duration: 220, easing: Easing.out(Easing.cubic) }),
        withSpring(1, { damping: 7, stiffness: 220 }),
      );
      matchGlow.value = withSequence(
        withTiming(1, { duration: 250 }),
        withTiming(0.4, { duration: 800 }),
      );
    }
  }, [card.isMatched, matchedTrigger]);

  const triggerShake = () => {
    shake.value = withSequence(
      withTiming(-8, { duration: 60 }),
      withTiming(8, { duration: 60 }),
      withTiming(-5, { duration: 60 }),
      withTiming(0, { duration: 60 }),
    );
  };

  // 외부에서 흔들기 트리거 (mismatch 시) - 사실은 simply matched가 false인 채로 isFlipped가 true→false면 mismatch
  // 그냥 internally handled

  const frontStyle = useAnimatedStyle(() => {
    const rotate = `${flip.value}deg`;
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: rotate },
        { translateX: shake.value },
        { scale: matchScale.value },
      ],
      opacity: flip.value < 90 ? 1 : 0,
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotate = `${flip.value + 180}deg`;
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: rotate },
        { translateX: shake.value },
        { scale: matchScale.value },
      ],
      opacity: flip.value >= 90 ? 1 : 0,
    };
  });

  const glowStyle = useAnimatedStyle(() => ({
    opacity: matchGlow.value,
  }));

  return (
    <View style={styles.cardWrap}>
      <Animated.View style={[styles.matchedGlow, glowStyle]} />
      <Pressable
        onPress={disabled ? undefined : onPress}
        style={styles.cardArea}
      >
        {/* 뒷면 (커버) */}
        <Animated.View style={[styles.face, frontStyle]}>
          <LinearGradient
            colors={["#9D8DFF", "#776ee2", "#5B4DD4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.faceInner}
          >
            {/* 대각 광택 */}
            <View style={styles.shine} />
            {/* 한글 자모 워터마크 */}
            <Text style={styles.backGlyph}>가</Text>
            <View style={styles.backBadge}>
              <Text style={styles.backBadgeText}>한</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* 앞면 (글자) */}
        <Animated.View
          style={[
            styles.face,
            styles.faceFront,
            card.type === "hangul"
              ? styles.faceFrontHangul
              : styles.faceFrontRoman,
            backStyle,
            card.isMatched && styles.faceMatched,
          ]}
        >
          {/* 타입 표시 점 */}
          <View
            style={[
              styles.typeDot,
              {
                backgroundColor: card.isMatched
                  ? "#58CC02"
                  : card.type === "hangul"
                    ? theme.primary
                    : "#1CB0F6",
              },
            ]}
          />
          <Text
            style={[
              card.type === "hangul" ? styles.hangulText : styles.romanText,
              card.isMatched && { color: "#1CB454" },
            ]}
          >
            {card.display}
          </Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const cardStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    cardWrap: {
      width: "23%",
      aspectRatio: 0.72,
      margin: "1%",
      position: "relative",
    },
    matchedGlow: {
      position: "absolute",
      top: -8,
      left: -8,
      right: -8,
      bottom: -8,
      borderRadius: 20,
      backgroundColor: "#58CC02",
      shadowColor: "#58CC02",
      shadowOpacity: 0.6,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 0 },
    },
    cardArea: { flex: 1, position: "relative" },
    face: {
      ...StyleSheet.absoluteFill,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backfaceVisibility: "hidden",
      overflow: "hidden",
    },
    faceInner: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 16,
    },
    // 뒷면 광택/글리프/뱃지
    shine: {
      position: "absolute",
      top: -30,
      left: -40,
      width: "70%",
      height: "180%",
      backgroundColor: "rgba(255,255,255,0.18)",
      transform: [{ rotate: "22deg" }],
    },
    backGlyph: {
      fontSize: 46,
      fontWeight: "900",
      color: "rgba(255,255,255,0.22)",
    },
    backBadge: {
      position: "absolute",
      bottom: 7,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: "rgba(255,255,255,0.25)",
      alignItems: "center",
      justifyContent: "center",
    },
    backBadgeText: { color: "#fff", fontSize: 11, fontWeight: "900" },
    // 앞면
    faceFront: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderBottomWidth: 5,
    },
    faceFrontHangul: { borderColor: theme.primary + "55" },
    faceFrontRoman: { borderColor: "#1CB0F6" + "55" },
    faceMatched: {
      backgroundColor: "#E7F9D5",
      borderColor: "#58CC02",
    },
    typeDot: {
      position: "absolute",
      top: 8,
      right: 8,
      width: 7,
      height: 7,
      borderRadius: 4,
    },
    hangulText: { fontSize: 32, fontWeight: "900", color: theme.text },
    romanText: {
      fontSize: 22,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: 1,
    },
  });

// ─── 메인 게임 컴포넌트 ───
export default function MemoryMatch({ characters, onExit }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  const [cards, setCards] = useState<Card[]>(() => buildDeck(characters));
  const [firstId, setFirstId] = useState<string | null>(null);
  const [secondId, setSecondId] = useState<string | null>(null);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [won, setWon] = useState(false);
  const [matchedTrigger, setMatchedTrigger] = useState(0);

  // 타이머
  useEffect(() => {
    if (won) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [won]);

  // 클리어 체크
  useEffect(() => {
    if (matches === PAIRS && !won) {
      setWon(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
      );
    }
  }, [matches, won]);

  const handleCardPress = (id: string) => {
    if (processing || won) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c)),
    );

    if (!firstId) {
      setFirstId(id);
    } else {
      setSecondId(id);
      setMoves((m) => m + 1);
      setProcessing(true);

      // 매칭 검사
      const first = cards.find((c) => c.id === firstId);
      const second = card;

      setTimeout(() => {
        if (first && second && first.characterId === second.characterId) {
          // 매치 성공!
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === id ? { ...c, isMatched: true } : c,
            ),
          );
          setMatches((m) => m + 1);
          setMatchedTrigger((t) => t + 1);
          Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success,
          ).catch(() => {});
        } else {
          // 매치 실패
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === id ? { ...c, isFlipped: false } : c,
            ),
          );
          Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Error,
          ).catch(() => {});
        }
        setFirstId(null);
        setSecondId(null);
        setProcessing(false);
      }, FLIP_BACK_DELAY);
    }
  };

  const restart = () => {
    setCards(buildDeck(characters));
    setFirstId(null);
    setSecondId(null);
    setMatches(0);
    setMoves(0);
    setElapsed(0);
    setProcessing(false);
    setWon(false);
    setMatchedTrigger(0);
  };

  const formatTime = (s: number) => {
    const mm = Math.floor(s / 60);
    const ss = s % 60;
    return `${mm}:${ss.toString().padStart(2, "0")}`;
  };

  const stars = won ? (moves <= PAIRS + 3 ? 3 : moves <= PAIRS + 7 ? 2 : 1) : 0;

  return (
    <View style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onExit} hitSlop={10}>
          <Ionicons name="close" size={28} color={theme.textSecondary} />
        </TouchableOpacity>
        <View style={styles.statRow}>
          <StatPill
            icon="time-outline"
            label={formatTime(elapsed)}
            color="#1FA9F7"
            theme={theme}
          />
          <StatPill
            icon="swap-horizontal-outline"
            label={moves.toString()}
            color="#776ee2"
            theme={theme}
          />
          <StatPill
            icon="checkmark-circle-outline"
            label={`${matches}/${PAIRS}`}
            color="#58CC02"
            theme={theme}
          />
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${(matches / PAIRS) * 100}%` },
          ]}
        />
      </View>

      <Text style={styles.title}>{t("hangul.game.matchHint")}</Text>

      {/* 카드 그리드 */}
      <View style={styles.grid}>
        {cards.map((card) => (
          <MemoryCardView
            key={card.id}
            card={card}
            disabled={processing || won}
            matchedTrigger={matchedTrigger}
            onPress={() => handleCardPress(card.id)}
          />
        ))}
      </View>

      {/* 클리어 모달 */}
      {won && (
        <WinOverlay
          stars={stars}
          time={formatTime(elapsed)}
          moves={moves}
          onRestart={restart}
          onExit={onExit}
        />
      )}
    </View>
  );
}

// ─── 상단 통계 pill ───
function StatPill({
  icon,
  label,
  color,
  theme,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  theme: ThemeColors;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: theme.surface,
        borderWidth: 1.5,
        borderColor: theme.border,
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 6,
      }}
    >
      <Ionicons name={icon} size={16} color={color} />
      <Text style={{ fontSize: 13, fontWeight: "800", color: theme.text }}>
        {label}
      </Text>
    </View>
  );
}

// ─── 클리어 오버레이 ───
function WinOverlay({
  stars,
  time,
  moves,
  onRestart,
  onExit,
}: {
  stars: number;
  time: string;
  moves: number;
  onRestart: () => void;
  onExit: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const sheetY = useSharedValue(800);
  const backdrop = useSharedValue(0);

  useEffect(() => {
    backdrop.value = withTiming(1, { duration: 300 });
    sheetY.value = withDelay(
      150,
      withSpring(0, { damping: 14, stiffness: 130 }),
    );
  }, []);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdrop.value,
  }));
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetY.value }],
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View style={[styles.winBackdrop, backdropStyle]} />
      <Animated.View style={[styles.winSheet, sheetStyle]}>
        <Text style={styles.winTitle}>{t("hangul.game.won")}</Text>
        <View style={styles.starsRow}>
          {[0, 1, 2].map((i) => (
            <AnimatedStar key={i} index={i} filled={i < stars} />
          ))}
        </View>
        <View style={styles.winStats}>
          <View style={styles.winStat}>
            <Text style={styles.winStatLabel}>
              {t("hangul.game.timeLabel")}
            </Text>
            <Text style={styles.winStatValue}>{time}</Text>
          </View>
          <View style={styles.winStatDivider} />
          <View style={styles.winStat}>
            <Text style={styles.winStatLabel}>
              {t("hangul.game.movesLabel")}
            </Text>
            <Text style={styles.winStatValue}>{moves}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.winPrimary}
          activeOpacity={0.85}
          onPress={onRestart}
        >
          <Text style={styles.winPrimaryText}>
            {t("hangul.game.playAgain")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.winSecondary}
          activeOpacity={0.7}
          onPress={onExit}
        >
          <Text style={styles.winSecondaryText}>{t("hangul.game.exit")}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

function AnimatedStar({ index, filled }: { index: number; filled: boolean }) {
  const scale = useSharedValue(0);
  const rotate = useSharedValue(-180);

  useEffect(() => {
    if (filled) {
      scale.value = withDelay(
        400 + index * 220,
        withSequence(
          withSpring(1.3, { damping: 6, stiffness: 220 }),
          withSpring(1, { damping: 9 }),
        ),
      );
      rotate.value = withDelay(
        400 + index * 220,
        withSpring(0, { damping: 12 }),
      );
    } else {
      scale.value = withDelay(
        400 + index * 100,
        withSpring(1, { damping: 12 }),
      );
      rotate.value = withDelay(
        400 + index * 100,
        withSpring(0, { damping: 12 }),
      );
    }
  }, [filled, index]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Ionicons
        name={filled ? "star" : "star-outline"}
        size={56}
        color={filled ? "#FFD000" : "#D8D8E0"}
        style={{ marginHorizontal: 6 }}
      />
    </Animated.View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingTop: 54,
      paddingHorizontal: 12,
    },
    progressTrack: {
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.border,
      marginHorizontal: 4,
      marginBottom: 14,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: 5,
      backgroundColor: "#58CC02",
    },
    title: {
      fontSize: 15,
      fontWeight: "800",
      color: theme.textSecondary,
      textAlign: "center",
      marginBottom: 14,
    },
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 4,
      paddingBottom: 14,
      gap: 12,
    },
    statRow: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 8,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignContent: "flex-start",
    },
    winBackdrop: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "rgba(0,0,0,0.6)",
    },
    winSheet: {
      position: "absolute",
      left: 16,
      right: 16,
      top: "20%",
      backgroundColor: theme.bg,
      borderRadius: 24,
      padding: 24,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 24,
      elevation: 16,
    },
    winTitle: {
      fontSize: 30,
      fontWeight: "900",
      color: "#776ee2",
      marginBottom: 16,
      letterSpacing: -0.5,
    },
    starsRow: {
      flexDirection: "row",
      marginBottom: 22,
    },
    winStats: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.surface,
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 22,
      marginBottom: 22,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    winStat: {
      alignItems: "center",
      paddingHorizontal: 20,
    },
    winStatLabel: {
      fontSize: 11,
      fontWeight: "800",
      color: theme.textSecondary,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 2,
    },
    winStatValue: {
      fontSize: 22,
      fontWeight: "900",
      color: theme.text,
    },
    winStatDivider: {
      width: 1,
      height: 36,
      backgroundColor: theme.border,
    },
    winPrimary: {
      backgroundColor: "#776ee2",
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 36,
      borderBottomWidth: 4,
      borderColor: "#5448E0",
      width: "100%",
      alignItems: "center",
      marginBottom: 8,
    },
    winPrimaryText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "900",
    },
    winSecondary: {
      paddingVertical: 10,
    },
    winSecondaryText: {
      color: theme.textSecondary,
      fontSize: 15,
      fontWeight: "700",
    },
  });
