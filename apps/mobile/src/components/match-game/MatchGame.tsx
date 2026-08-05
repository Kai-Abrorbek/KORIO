import { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
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
  WORD_POOL,
} from "@/mocks/match-game.mock";
import MatchPairCard, { PairStatus } from "@/components/lesson/MatchPairCard";
import { LessonService } from "@/services/lesson.service";
import MatchProgressBar from "./MatchProgressBar";
import XpRewardScreen from "./XpRewardScreen";

type Side = "left" | "right";

/** 화면에 쓰는 최소 형태 — 실데이터는 native 가 이미 유저 언어로 내려온다 */
interface Pair {
  id: string;
  ko: string;
  native: string;
}

interface Slot {
  key: string;
  pair: Pair;
  status: PairStatus;
  vanishing?: boolean;
}

const GREEN_MS = 620; // 정답 초록 + 샤인 보여주는 시간
const FADE_MS = 420; // 서서히 사라지고 나타나는 시간
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

const fromMock = (p: WordPair): Pair => ({
  id: p.id,
  ko: p.ko,
  native: p[langKey()] ?? p.en,
});

let keySeq = 0;
const nk = () => `c${keySeq++}`;

/** 풀에서 지금 보드에 없는 짝 하나 */
function draw(pool: Pair[], used: Set<string>): Pair | null {
  const avail = pool.filter((p) => !used.has(p.id));
  if (!avail.length) return null;
  return avail[Math.floor(Math.random() * avail.length)];
}

export default function MatchGame({ onExit }: { onExit: () => void }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);

  const [loading, setLoading] = useState(true);
  const poolRef = useRef<Pair[]>([]);
  const usedIds = useRef<Set<string>>(new Set());

  const [left, setLeft] = useState<Slot[]>([]);
  const [right, setRight] = useState<Slot[]>([]);
  const [sel, setSel] = useState<{ side: Side; index: number } | null>(null);
  const [matched, setMatched] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [reward, setReward] = useState<Reward | null>(null);

  const matchedRef = useRef(0);
  const earnedXpRef = useRef(0);
  const pausedRef = useRef(false);
  const endedRef = useRef(false);

  // ── 배운 단어로 풀 구성 (부족하면 기본 단어로 채움) ──
  useEffect(() => {
    let alive = true;

    const start = (pool: Pair[]) => {
      if (!alive) return;
      poolRef.current = pool;
      const picked = shuffle(pool).slice(0, BOARD_PAIRS);
      usedIds.current = new Set(picked.map((p) => p.id));
      setLeft(
        shuffle(picked).map((p) => ({ key: nk(), pair: p, status: "idle" })),
      );
      setRight(
        shuffle(picked).map((p) => ({ key: nk(), pair: p, status: "idle" })),
      );
      setLoading(false);
    };

    LessonService.getLearnedWords()
      .then((res) => {
        const learned: Pair[] = (res.words ?? [])
          .filter((w) => w.korean && w.native)
          .map((w) => ({ id: w.korean, ko: w.korean, native: w.native }));

        // 배운 단어가 보드를 채울 만큼 없으면 기본 단어를 섞어 보충
        if (learned.length >= BOARD_PAIRS + 3) {
          start(learned);
          return;
        }
        const seen = new Set(learned.map((p) => p.id));
        const filler = WORD_POOL.map(fromMock).filter((p) => !seen.has(p.id));
        start([...learned, ...filler]);
      })
      .catch(() => start(WORD_POOL.map(fromMock)));

    return () => {
      alive = false;
    };
  }, []);

  const endGame = useCallback(() => {
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
  }, [t]);

  // 타이머 — 보드가 준비된 뒤부터
  useEffect(() => {
    if (loading) return;
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
  }, [loading, endGame]);

  const setStatus = (side: Side, index: number, status: PairStatus) => {
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

    // 새 짝을 방금 비워진 자리에 그대로 넣으면, 양쪽에 동시에 나타난 두 카드가
    // 무조건 짝이라 읽지 않고도 맞출 수 있다. 오른쪽 새 카드는 다른 자리로 보내고
    // 그 자리에 있던 카드를 비워진 자리로 옮긴다.
    const others = right
      .map((sl, i) => ({ sl, i }))
      .filter(({ sl, i }) => i !== ri && sl.status === "idle" && !sl.vanishing);
    const rj = others.length
      ? others[Math.floor(Math.random() * others.length)].i
      : ri;

    // 1) 초록 보여준 뒤 → 서서히 사라짐 (자리를 옮길 카드도 같이)
    setTimeout(() => {
      setLeft((prev) =>
        prev.map((sl, i) => (i === li ? { ...sl, vanishing: true } : sl)),
      );
      setRight((prev) =>
        prev.map((sl, i) =>
          i === ri || i === rj ? { ...sl, vanishing: true } : sl,
        ),
      );
    }, GREEN_MS);

    // 2) 다 사라지면 교체하고 서서히 나타남
    setTimeout(() => {
      usedIds.current.delete(pairId);

      let np = draw(poolRef.current, usedIds.current);
      if (!np) {
        // 풀을 다 돌았으면 지금 보드에 있는 것만 빼고 다시 연다
        usedIds.current = new Set(
          [...left, ...right]
            .filter((sl) => sl.status !== "correct")
            .map((sl) => sl.pair.id),
        );
        np = draw(poolRef.current, usedIds.current);
      }
      if (!np) return;
      usedIds.current.add(np.id);

      const newPair = np;

      setLeft((prev) =>
        prev.map((slot, i) =>
          i === li ? { key: nk(), pair: newPair, status: "idle" } : slot,
        ),
      );

      setRight((prev) => {
        const next = [...prev];
        const moved = next[rj].pair; // 자리를 옮길 기존 단어
        if (rj === ri) {
          next[ri] = { key: nk(), pair: newPair, status: "idle" };
        } else {
          next[ri] = { key: nk(), pair: moved, status: "idle" };
          next[rj] = { key: nk(), pair: newPair, status: "idle" };
        }
        return next;
      });
    }, GREEN_MS + FADE_MS);
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
      setStatus("left", leftSel.index, "correct");
      setStatus("right", rightSel.index, "correct");
      onMatched(left[leftSel.index].pair.id, leftSel.index, rightSel.index);
    } else {
      setStatus("left", leftSel.index, "wrong");
      setStatus("right", rightSel.index, "wrong");
      setTimeout(() => {
        setStatus("left", leftSel.index, "idle");
        setStatus("right", rightSel.index, "idle");
      }, 520);
    }
  };

  const handlePress = (side: Side, index: number) => {
    if (pausedRef.current) return;
    const arr = side === "left" ? left : right;
    const slot = arr[index];
    if (!slot || slot.status === "correct" || slot.status === "wrong") return;
    if (slot.vanishing) return; // 사라지는 중인 카드는 무시

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

  if (loading) {
    return (
      <View style={[s.container, s.center]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

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
            <MatchPairCard
              key={slot.key}
              text={slot.pair.ko}
              status={slot.status}
              onPress={() => handlePress("left", i)}
              theme={theme}
              appearMs={FADE_MS}
              vanishing={slot.vanishing}
              vanishMs={FADE_MS}
            />
          ))}
        </View>
        <View style={s.col}>
          {right.map((slot, i) => (
            <MatchPairCard
              key={slot.key}
              text={slot.pair.native}
              status={slot.status}
              onPress={() => handlePress("right", i)}
              theme={theme}
              appearMs={FADE_MS}
              vanishing={slot.vanishing}
              vanishMs={FADE_MS}
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
    center: { alignItems: "center", justifyContent: "center" },
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
    // WordMatching 과 같은 간격
    board: { flexDirection: "row", gap: 14, paddingHorizontal: 20 },
    col: { flex: 1, gap: 14 },
  });
