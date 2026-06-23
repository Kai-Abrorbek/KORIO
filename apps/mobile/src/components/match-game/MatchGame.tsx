import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import i18n from "@/locales/i18n";
import {
  WordPair,
  BOARD_PAIRS,
  GAME_SECONDS,
  MILESTONES,
  starTier,
  shuffle,
  drawPair,
  WORD_POOL,
} from "@/mocks/match-game.mock";
import MatchCard, { CardStatus } from "./MatchCard";
import MatchProgressBar from "./MatchProgressBar";
import XpRewardScreen from "./XpRewardScreen";

type Side = "left" | "right";
interface Slot {
  key: string;
  pair: WordPair;
  status: CardStatus;
}
interface Reward {
  xp: number;
  stars: number | null;
  bubble?: string;
  headline?: string;
  subline?: string;
  final?: boolean;
}

const langKey = () =>
  (i18n.language?.split("-")[0] || "uz") as "ko" | "uz" | "en" | "ru";
const nativeOf = (p: WordPair) => p[langKey()] ?? p.en;

let keySeq = 0;
const nk = () => `c${keySeq++}`;

function buildBoard() {
  const pairs = shuffle(WORD_POOL).slice(0, BOARD_PAIRS);
  const left = shuffle(pairs).map<Slot>((p) => ({
    key: nk(),
    pair: p,
    status: "idle",
  }));
  const right = shuffle(pairs).map<Slot>((p) => ({
    key: nk(),
    pair: p,
    status: "idle",
  }));
  return { left, right, ids: pairs.map((p) => p.id) };
}

export default function MatchGame({ onExit }: { onExit: () => void }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);

  const init = useRef(buildBoard());
  const [left, setLeft] = useState<Slot[]>(init.current.left);
  const [right, setRight] = useState<Slot[]>(init.current.right);
  const usedIds = useRef<Set<string>>(new Set(init.current.ids));

  const [sel, setSel] = useState<{ side: Side; index: number } | null>(null);
  const [matched, setMatched] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [reward, setReward] = useState<Reward | null>(null);

  const matchedRef = useRef(0);
  const earnedXpRef = useRef(0);
  const pausedRef = useRef(false);
  const endedRef = useRef(false);

  // 타이머
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const setStatus = (side: Side, index: number, status: CardStatus) => {
    const setter = side === "left" ? setLeft : setRight;
    setter((prev) =>
      prev.map((slot, i) => (i === index ? { ...slot, status } : slot)),
    );
  };

  const checkMilestone = (count: number) => {
    const m = MILESTONES.find((x) => x.count === count);
    if (!m) return;
    earnedXpRef.current += m.xp;
    pausedRef.current = true;
    setReward({
      xp: m.xp,
      stars: m.star ? 1 : null,
      bubble: m.star ? undefined : t("matchGame.bubble", { xp: m.xp }),
      headline: m.star ? t("matchGame.starEarned", { xp: m.xp }) : undefined,
      subline: m.star ? t("matchGame.keepGoing") : undefined,
    });
  };

  const onMatched = (pairId: string, li: number, ri: number) => {
    setMatched((prev) => {
      const next = prev + 1;
      matchedRef.current = next;
      checkMilestone(next);
      return next;
    });
    // 초록 → 페이드아웃 후 새 단어로 교체
    setTimeout(() => {
      usedIds.current.delete(pairId);
      const np = drawPair(usedIds.current);
      if (!np) return;
      usedIds.current.add(np.id);
      setLeft((prev) =>
        prev.map((slot, i) =>
          i === li ? { key: nk(), pair: np, status: "idle" } : slot,
        ),
      );
      setRight((prev) =>
        prev.map((slot, i) =>
          i === ri ? { key: nk(), pair: np, status: "idle" } : slot,
        ),
      );
    }, 500);
  };

  const evaluate = (
    a: { side: Side; index: number },
    b: { side: Side; index: number },
  ) => {
    const leftSel = a.side === "left" ? a : b;
    const rightSel = a.side === "left" ? b : a;
    const correct =
      left[leftSel.index].pair.id === right[rightSel.index].pair.id;
    setSel(null);

    if (correct) {
      setStatus("left", leftSel.index, "matched");
      setStatus("right", rightSel.index, "matched");
      onMatched(left[leftSel.index].pair.id, leftSel.index, rightSel.index);
    } else {
      setStatus("left", leftSel.index, "wrong");
      setStatus("right", rightSel.index, "wrong");
      setTimeout(() => {
        setStatus("left", leftSel.index, "idle");
        setStatus("right", rightSel.index, "idle");
      }, 500);
    }
  };

  const handlePress = (side: Side, index: number) => {
    if (pausedRef.current) return;
    const arr = side === "left" ? left : right;
    const slot = arr[index];
    if (!slot || slot.status === "matched" || slot.status === "wrong") return;

    if (!sel) {
      setSel({ side, index });
      setStatus(side, index, "selected");
      return;
    }
    if (sel.side === side && sel.index === index) {
      setStatus(side, index, "idle");
      setSel(null);
      return;
    }
    if (sel.side === side) {
      setStatus(sel.side, sel.index, "idle");
      setStatus(side, index, "selected");
      setSel({ side, index });
      return;
    }
    setStatus(side, index, "selected");
    evaluate(sel, { side, index });
  };

  const endGame = () => {
    if (endedRef.current) return;
    endedRef.current = true;
    pausedRef.current = true;
    setReward({
      xp: earnedXpRef.current,
      stars: starTier(matchedRef.current),
      headline: t("matchGame.timeUp"),
      subline: t("matchGame.finalScore", { count: matchedRef.current }),
      final: true,
    });
  };

  const onContinue = () => {
    const wasFinal = reward?.final;
    setReward(null);
    if (wasFinal) {
      onExit();
      return;
    }
    pausedRef.current = false;
  };

  const mm = Math.floor(timeLeft / 60);
  const ss = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={onExit} hitSlop={12}>
          <Ionicons name="close" size={28} color={theme.textSecondary} />
        </TouchableOpacity>

        <MatchProgressBar matched={matched} theme={theme} />

        <View style={s.timer}>
          <MaterialCommunityIcons
            name="timer-outline"
            size={18}
            color={theme.primary}
          />
          <Text
            style={[s.timerText, { color: theme.primary }]}
          >{`${mm}:${ss}`}</Text>
        </View>
      </View>

      <Text style={s.title}>{t("matchGame.title")}</Text>

      <View style={s.board}>
        <View style={s.col}>
          {left.map((slot, i) => (
            <MatchCard
              key={slot.key}
              text={slot.pair.ko}
              status={slot.status}
              onPress={() => handlePress("left", i)}
              theme={theme}
            />
          ))}
        </View>
        <View style={s.col}>
          {right.map((slot, i) => (
            <MatchCard
              key={slot.key}
              text={nativeOf(slot.pair)}
              status={slot.status}
              onPress={() => handlePress("right", i)}
              theme={theme}
            />
          ))}
        </View>
      </View>

      {reward && (
        <View style={StyleSheet.absoluteFill}>
          <XpRewardScreen
            theme={theme}
            xp={reward.xp}
            stars={reward.stars}
            bubbleText={reward.bubble}
            headline={reward.headline}
            subline={reward.subline}
            onContinue={onContinue}
          />
        </View>
      )}
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingTop: 56,
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    timer: { flexDirection: "row", alignItems: "center", gap: 4, minWidth: 56 },
    timerText: { fontSize: 17, fontWeight: "800" },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 24,
      lineHeight: 30,
    },
    board: { flexDirection: "row", gap: 14, paddingHorizontal: 20 },
    col: { flex: 1, gap: 12 },
  });
