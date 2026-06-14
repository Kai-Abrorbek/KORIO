import { useEffect, useRef, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { ChainTurn, EndReason, GamePhase } from "@/types/word-chain";
import {
  validateUserWord,
  pickAiWord,
  pickAiStarter,
  lastSyllable,
  calcTurnScore,
  getHints,
} from "@/utils/word-chain-engine";
import { ChainWord } from "@/types/word-chain";
import GameStatBar from "@/components/word-chain/GameStatBar";
import SyllableTarget from "@/components/word-chain/SyllableTarget";
import WordBubble from "@/components/word-chain/WordBubble";
import TypingIndicator from "@/components/word-chain/TypingIndicator";
import TurnInput from "@/components/word-chain/TurnInput";
import HintToast from "@/components/word-chain/HintToast";
import EndModal from "@/components/word-chain/EndModal";

const MAX_HEARTS = 3;
const MAX_HINTS = 3;
const TURN_TIME = 10; // 초

export default function WordChainScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  const [phase, setPhase] = useState<GamePhase>("idle");
  const [turns, setTurns] = useState<ChainTurn[]>([]);
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set());
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(MAX_HINTS);
  const [timeLeft, setTimeLeft] = useState(TURN_TIME);
  const [endReason, setEndReason] = useState<EndReason | null>(null);
  const [errorFlash, setErrorFlash] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);
  const [hints, setHints] = useState<ChainWord[]>([]);

  const scrollRef = useRef<ScrollView>(null);

  // 게임 시작 - AI 첫 단어
  useEffect(() => {
    if (phase === "idle") startGame();
  }, []);

  const startGame = () => {
    const starter = pickAiStarter();
    const firstTurn: ChainTurn = {
      id: "ai-0",
      player: "ai",
      word: starter.word,
      roman: starter.roman,
      isValid: true,
    };
    setTurns([firstTurn]);
    setUsedWords(new Set([starter.word]));
    setPhase("user-turn");
    setTimeLeft(TURN_TIME);
  };

  // 가장 마지막 turn의 마지막 음절 (= 유저가 시작해야 할 글자)
  const requiredStart =
    turns.length > 0 ? lastSyllable(turns[turns.length - 1].word) : "";

  // 자동 스크롤
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [turns.length, phase]);

  // 타이머
  useEffect(() => {
    if (phase !== "user-turn") return;
    if (timeLeft <= 0) {
      handleTimeOut();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, timeLeft]);

  const handleTimeOut = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(
      () => {},
    );
    loseHeart();
    setTimeLeft(TURN_TIME); // 리셋 + 같은 턴 다시
  };

  const loseHeart = () => {
    setHearts((h) => {
      const newH = h - 1;
      if (newH <= 0) {
        endGame("no-hearts");
      }
      return newH;
    });
    setCombo(0);
  };

  const handleUserSubmit = (input: string) => {
    if (phase !== "user-turn") return;

    const result = validateUserWord(input, requiredStart, usedWords);

    if (!result.ok) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(
        () => {},
      );
      setErrorFlash((e) => e + 1);
      loseHeart();
      return;
    }

    // 정답
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
      () => {},
    );
    const newCombo = combo + 1;
    const turnScore = calcTurnScore(result.chainWord.word, newCombo);

    const newTurn: ChainTurn = {
      id: `user-${turns.length}`,
      player: "user",
      word: result.chainWord.word,
      roman: result.chainWord.roman,
      isValid: true,
    };
    setTurns((prev) => [...prev, newTurn]);
    setUsedWords((prev) => new Set(prev).add(result.chainWord.word));
    setScore((s) => s + turnScore);
    setCombo(newCombo);
    setBestCombo((b) => Math.max(b, newCombo));
    setPhase("ai-thinking");
    setTimeLeft(TURN_TIME);

    // AI 응답
    setTimeout(
      () => aiTurn(lastSyllable(result.chainWord.word)),
      1200 + Math.random() * 800,
    );
  };

  const aiTurn = (required: string) => {
    setUsedWords((curr) => {
      const aiWord = pickAiWord(required, curr);
      if (!aiWord) {
        // AI 항복 → 유저 승리
        setTimeout(() => endGame("ai-surrender"), 500);
        return curr;
      }
      const newTurn: ChainTurn = {
        id: `ai-${turns.length + 1}`,
        player: "ai",
        word: aiWord.word,
        roman: aiWord.roman,
        isValid: true,
      };
      setTurns((prev) => [...prev, newTurn]);
      setPhase("user-turn");
      setTimeLeft(TURN_TIME);
      return new Set(curr).add(aiWord.word);
    });
  };

  const handleHint = () => {
    if (hintsLeft <= 0) return;
    const list = getHints(requiredStart, usedWords, 3);
    if (list.length === 0) return;
    setHints(list);
    setHintVisible(true);
    setHintsLeft((h) => h - 1);
  };

  const endGame = (reason: EndReason) => {
    setEndReason(reason);
    setPhase("ended");
    if (reason === "ai-surrender") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
      );
    }
  };

  const restart = () => {
    setTurns([]);
    setUsedWords(new Set());
    setHearts(MAX_HEARTS);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setHintsLeft(MAX_HINTS);
    setTimeLeft(TURN_TIME);
    setEndReason(null);
    setHintVisible(false);
    setPhase("idle");
    setTimeout(startGame, 100);
  };

  const handleExit = useCallback(() => {
    if (phase === "ended") {
      router.back();
      return;
    }
    Alert.alert(t("wordChain.exitTitle"), t("wordChain.exitConfirm"), [
      { text: t("common.cancel"), style: "cancel" },
      { text: t("common.confirm"), onPress: () => router.back() },
    ]);
  }, [phase, router, t]);

  const userTurnActive = phase === "user-turn";

  return (
    <View style={styles.container}>
      <GameStatBar
        hearts={hearts}
        maxHearts={MAX_HEARTS}
        score={score}
        combo={combo}
        onClose={handleExit}
      />

      <SyllableTarget syllable={requiredStart} active={userTurnActive} />

      <ScrollView
        ref={scrollRef}
        style={styles.chat}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {turns.map((turn, i) => (
          <WordBubble
            key={turn.id}
            turn={turn}
            isLatest={i === turns.length - 1}
          />
        ))}
        {phase === "ai-thinking" && <TypingIndicator />}
      </ScrollView>

      <TurnInput
        enabled={userTurnActive}
        timeLeft={timeLeft}
        timeMax={TURN_TIME}
        onSubmit={handleUserSubmit}
        onHint={handleHint}
        hintsLeft={hintsLeft}
        errorFlash={errorFlash}
      />

      <HintToast
        hints={hints}
        visible={hintVisible}
        onDismiss={() => setHintVisible(false)}
      />

      {endReason && (
        <EndModal
          reason={endReason}
          score={score}
          turnCount={turns.length}
          bestCombo={bestCombo}
          onPlayAgain={restart}
          onExit={() => router.back()}
        />
      )}
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    chat: { flex: 1 },
    chatContent: { paddingVertical: 12, paddingBottom: 20 },
  });
