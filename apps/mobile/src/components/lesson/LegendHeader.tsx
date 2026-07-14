import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { ThemeColors } from "@/constants/theme";

interface Props {
  segments: number[]; // [5, 7, 10]
  currentIndex: number; // 완료한 문제 수
  durationSec: number; // 120
  onTimeout: () => void;
  onClose: () => void;
  theme: ThemeColors;
}

export default function LegendHeader({
  segments,
  currentIndex,
  durationSec,
  onTimeout,
  onClose,
  theme,
}: Props) {
  const insets = useSafeAreaInsets();
  const total = segments.reduce((a, b) => a + b, 0);

  // 누적 체크포인트 (위치=누적, 라벨=구간 크기)
  let cum = 0;
  const checkpoints = segments.map((s) => {
    cum += s;
    return { at: cum, label: s };
  });
  const fillPct = Math.min(1, currentIndex / total) * 100;

  // 타이머
  const [left, setLeft] = useState(durationSec);
  useEffect(() => {
    const id = setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          clearInterval(id);
          onTimeout();
          return 0;
        }
        return l - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const timeStr = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 6 }]}>
      <Pressable onPress={onClose} hitSlop={10}>
        <Ionicons name="close" size={30} color={theme.textSecondary} />
      </Pressable>

      {/* 구간 진행바 */}
      <View style={styles.barWrap}>
        <View style={[styles.track, { backgroundColor: theme.border }]}>
          <View
            style={[
              styles.fill,
              { width: `${fillPct}%`, backgroundColor: theme.primary },
            ]}
          />
          {checkpoints.map((cp, i) => {
            const cleared = currentIndex >= cp.at;
            return (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    left: `${(cp.at / total) * 100}%`,
                    backgroundColor: cleared ? theme.primary : theme.bg,
                    borderColor: cleared ? theme.primary : theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.dotText,
                    { color: cleared ? "#fff" : theme.textSecondary },
                  ]}
                >
                  {cp.label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* 자물쇠 타이머 */}
      <View style={styles.timer}>
        <View style={[styles.lock, { backgroundColor: theme.primary + "22" }]}>
          <Ionicons name="lock-closed" size={15} color={theme.primary} />
        </View>
        <Text style={[styles.timeText, { color: theme.primary }]}>
          {timeStr}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  barWrap: { flex: 1 },
  track: { height: 18, borderRadius: 9, justifyContent: "center" },
  fill: { position: "absolute", left: 0, top: 0, bottom: 0, borderRadius: 9 },
  dot: {
    position: "absolute",
    marginLeft: -14,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  dotText: { fontSize: 12, fontWeight: "900" },
  timer: { flexDirection: "row", alignItems: "center", gap: 5 },
  lock: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: { fontSize: 17, fontWeight: "900" },
});
