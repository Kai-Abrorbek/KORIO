import { useEffect, useRef, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "@/utils/haptics";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { ChainTurn, EndReason, GamePhase } from "@/types/word-chain";
import {
  pickAiStarter,
  lastSyllable,
  calcTurnScore,
} from "@/utils/word-chain-engine";
import { GameWordsApi } from "@/services/game-words.service";
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
  /** 서버 왕복 중 엔터 연타로 두 수가 들어가는 걸 막는다 */
  const submitting = useRef(false);
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

  /**
   * 한 수 두기.
   *
   * 예전엔 앱에 박아둔 300개짜리 목록 안에서만 답이 인정됐다. 유저가 아는
   * 멀쩡한 한국어를 내도 "그런 단어 없다" 가 나왔고, 두음법칙도 없어서
   * 사랑 → 낭만 같은 정답이 틀렸다고 나왔다. 이제 서버 사전을 본다.
   *
   * 판정과 AI 응답을 한 번의 요청으로 받는다 — 두 번 왕복하면 그 사이가
   * 그대로 어색한 정적이 된다.
   */
  const handleUserSubmit = async (input: string) => {
    if (phase !== "user-turn" || submitting.current) return;
    submitting.current = true;
    const prev = turns.length ? turns[turns.length - 1].word : null;
    setPhase("ai-thinking");

    try {
      const res = await GameWordsApi.chainTurn({
        word: input.trim(),
        prev,
        used: [...usedWords],
      });

      if (!res.accepted || !res.word) {
        Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Warning,
        ).catch(() => {});
        setErrorFlash((e) => e + 1);
        setPhase("user-turn");
        loseHeart();
        return;
      }

      const myWord = res.word.ko;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {},
      );
      const newCombo = combo + 1;
      setTurns((p) => [
        ...p,
        {
          id: `user-${p.length}`,
          player: "user",
          word: myWord,
          roman: "",
          isValid: true,
        },
      ]);
      setUsedWords((p) => new Set(p).add(myWord));
      setScore((sc) => sc + calcTurnScore(myWord, newCombo));
      setCombo(newCombo);
      setBestCombo((b) => Math.max(b, newCombo));
      setTimeLeft(TURN_TIME);

      // 서버가 더 낼 단어가 없으면 유저 승
      if (!res.reply) {
        setTimeout(() => endGame("ai-surrender"), 700);
        return;
      }

      // 사람처럼 잠깐 생각하는 시늉. 즉답하면 기계 같다
      const reply = res.reply;
      setTimeout(
        () => {
          setTurns((p) => [
            ...p,
            {
              id: `ai-${p.length}`,
              player: "ai",
              word: reply.ko,
              roman: "",
              isValid: true,
            },
          ]);
          setUsedWords((p) => new Set(p).add(reply.ko));
          setPhase("user-turn");
          setTimeLeft(TURN_TIME);
        },
        900 + Math.random() * 700,
      );
    } catch {
      // 네트워크가 끊겼다고 하트를 깎지 않는다 — 유저 잘못이 아니다
      setPhase("user-turn");
    } finally {
      submitting.current = false;
    }
  };

  const handleHint = async () => {
    if (hintsLeft <= 0) return;
    try {
      // 힌트도 서버 사전에서 가져온다. 앱 목록에서 뽑으면 힌트대로 쳤는데
      // 거절당해서 힌트가 함정이 된다
      const res = await GameWordsApi.chainHints(requiredStart, [...usedWords]);
      const list = (res.words ?? []).map((w) => ({ word: w.ko, roman: "" }));
      if (!list.length) return;
      setHints(list);
      setHintVisible(true);
      setHintsLeft((h) => h - 1);
    } catch {
      /* 힌트를 못 받아도 게임은 계속된다 */
    }
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
