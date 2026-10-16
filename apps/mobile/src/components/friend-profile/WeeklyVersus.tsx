import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pressable } from "@/components/ui/Pressables";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import type { AvatarConfig } from "@/types/avatar";
import type { VersusWeek } from "@/services/user.service";
import FriendAvatar from "@/components/friends/FriendAvatar";
import * as Haptics from "@/utils/haptics";

/**
 * 친구 프로필 "이번 주 대결" — 텔레그램 weekly-versus 와 같은 화면.
 *
 * 예전 WeeklyProgressChart 는 두 사람의 최근 7일을 순서대로 겹친 곡선이라
 * 요일이 한국어로 박혀 있었고(일·월·화), 눈금이 347·231 처럼 떨어지지 않았고,
 * 곡선이라 하루 값을 읽을 수 없었고, 무엇을 보여주는지 써 있지 않았다.
 *
 * 이제:
 * - 리그와 같은 주(월~일) — 합계가 리그 순위표 XP 와 맞는다
 * - 위: 누가 몇 XP 로 앞서는지 + 줄다리기 막대 + 한 줄 상황
 * - 가운데: 날짜별 막대 두 개(친구 · 나), 깔끔한 눈금, 오늘 표시, 안 온 날은 점선
 * - 날짜를 누르면 그날 정확한 값
 * - 아래: 지난주 결과
 */
const THEM = "#45B7D1";
const ME = "#776ee2";
const PLOT_H = 134;

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

/** 0 · s · 2s · 3s 눈금이 떨어지게 */
function niceStep(max: number) {
  if (max <= 0) return 50;
  const raw = max / 3;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((m) => m * pow >= raw) ?? 10;
  return step * pow;
}

/** 숫자가 0 에서 차오른다 */
function useCountUp(target: number, still: boolean, duration = 700) {
  const [value, setValue] = useState(still ? target : 0);
  useEffect(() => {
    if (still) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = Date.now();
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / duration);
      setValue(target * (1 - (1 - t) ** 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, still, duration]);
  return value;
}

interface Props {
  data: VersusWeek;
  name: string;
  themAvatar?: Partial<AvatarConfig> | null;
  themImage?: string;
  meName: string;
  meAvatar?: Partial<AvatarConfig> | null;
  meImage?: string;
}

export default function WeeklyVersus({ data, name, themAvatar, themImage, meName, meAvatar, meImage }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = useMemo(() => getStyles(theme), [theme]);
  const still = useReducedMotion();

  const todayIndex = Math.max(0, data.days.findIndex((d) => d.date === data.today));
  const [selected, setSelected] = useState(todayIndex);
  const solo = data.isMe;

  const max = Math.max(...data.days.map((d) => (solo ? d.me : Math.max(d.them, d.me))), 0);
  const step = niceStep(max);
  const top = step * 3;
  const daysLeft = data.days.length - todayIndex;

  const themTotal = useCountUp(data.them, still);
  const meTotal = useCountUp(data.me, still);
  const diff = data.them - data.me;
  const share = data.them + data.me > 0 ? data.them / (data.them + data.me) : 0.5;

  const status =
    data.them === 0 && data.me === 0
      ? { text: t("friendProfile.versus.status.empty"), color: theme.textSecondary }
      : diff === 0
        ? { text: t("friendProfile.versus.status.tied"), color: theme.textSecondary }
        : diff < 0
          ? { text: t("friendProfile.versus.status.ahead", { n: fmt(-diff) }), color: "#1DBB7F" }
          : { text: t("friendProfile.versus.status.behind", { n: fmt(diff), name }), color: "#FF7A00" };

  const day = data.days[selected] ?? data.days[todayIndex];

  return (
    <View style={s.card}>
      {/* 제목 */}
      <View style={s.head}>
        <View style={{ flex: 1 }}>
          <Text style={s.title}>{t("friendProfile.versus.title")}</Text>
          <Text style={s.subtitle}>{t("friendProfile.versus.subtitle")}</Text>
        </View>
        <LeftChip last={daysLeft <= 1} still={still}>
          {daysLeft <= 1 ? t("friendProfile.versus.lastDay") : t("friendProfile.versus.daysLeft", { n: daysLeft })}
        </LeftChip>
      </View>

      {!solo && (
        <>
          {/* 점수 */}
          <View style={s.score}>
            <View style={s.side}>
              <View style={[s.ring, { borderColor: THEM }]}>
                <FriendAvatar name={name} avatar={themAvatar} avatarUri={themImage} size={36} />
              </View>
              <View style={{ flexShrink: 1 }}>
                <Text style={s.sideName} numberOfLines={1}>
                  {name}
                </Text>
                <View style={s.numRow}>
                  <Text style={[s.num, { color: THEM }]}>{fmt(themTotal)}</Text>
                  <Text style={[s.xp, { color: THEM }]}>XP</Text>
                  {diff > 0 && <Ionicons name="trophy" size={14} color="#F4B400" />}
                </View>
              </View>
            </View>
            <View style={s.vs}>
              <Text style={s.vsText}>VS</Text>
            </View>
            <View style={[s.side, { justifyContent: "flex-end" }]}>
              <View style={{ flexShrink: 1, alignItems: "flex-end" }}>
                <Text style={s.sideName} numberOfLines={1}>
                  {t("friendProfile.versus.you")}
                </Text>
                <View style={s.numRow}>
                  {diff < 0 && <Ionicons name="trophy" size={14} color="#F4B400" />}
                  <Text style={[s.num, { color: ME }]}>{fmt(meTotal)}</Text>
                  <Text style={[s.xp, { color: ME }]}>XP</Text>
                </View>
              </View>
              <View style={[s.ring, { borderColor: ME }]}>
                <FriendAvatar name={meName} avatar={meAvatar} avatarUri={meImage} size={36} />
              </View>
            </View>
          </View>

          <Tug share={share} still={still} s={s} />
          <Text style={[s.status, { color: status.color }]}>{status.text}</Text>
        </>
      )}

      {/* 막대 그래프 */}
      <View style={s.chart}>
        <View style={s.axis}>
          {[3, 2, 1, 0].map((i) => (
            <Text key={i} style={s.axisText}>
              {fmt(step * i)}
            </Text>
          ))}
        </View>
        <View style={s.plot}>
          <View pointerEvents="none" style={s.grid}>
            {[0, 1, 2, 3].map((i) => (
              <View key={i} style={[s.gridLine, i === 3 && s.gridBase]} />
            ))}
          </View>
          {data.days.map((d, i) => {
            const future = i > todayIndex;
            const active = i === selected;
            const today = i === todayIndex;
            return (
              <Pressable
                key={d.date}
                disabled={future}
                onPress={() => {
                  void Haptics.selectionAsync();
                  setSelected(i);
                }}
                accessibilityRole="button"
                accessibilityState={{ selected: active, disabled: future }}
                accessibilityLabel={t(`friendProfile.versus.daysLong.${d.weekday}`)}
                style={[s.col, active && s.colActive]}
              >
                <View style={s.bars}>
                  {future ? (
                    <View style={s.ghost} />
                  ) : (
                    <>
                      {!solo && <Bar color={THEM} value={d.them} top={top} index={i} still={still} s={s} />}
                      <Bar color={ME} value={d.me} top={top} index={i} still={still} s={s} />
                    </>
                  )}
                </View>
                <Text style={[s.dayText, today && s.dayToday, future && { opacity: 0.5 }]}>
                  {t(`friendProfile.versus.days.${d.weekday}`)}
                </Text>
                <View style={[s.todayDot, !today && { opacity: 0 }]} />
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* 고른 날 */}
      {day && (
        <View style={s.detail}>
          <View style={s.detailDay}>
            <Text style={s.detailDayText} numberOfLines={1}>
              {t(`friendProfile.versus.daysLong.${day.weekday}`)}
            </Text>
            {selected === todayIndex && (
              <View style={s.todayPill}>
                <Text style={s.todayPillText}>{t("friendProfile.versus.today")}</Text>
              </View>
            )}
          </View>
          {!solo && (
            <View style={s.detailVal}>
              <View style={[s.dot, { backgroundColor: THEM }]} />
              <Text style={s.detailNum}>{fmt(day.them)}</Text>
            </View>
          )}
          <View style={s.detailVal}>
            <View style={[s.dot, { backgroundColor: ME }]} />
            <Text style={s.detailNum}>{fmt(day.me)}</Text>
          </View>
          <Text style={s.detailXp}>XP</Text>
        </View>
      )}

      {/* 지난주 */}
      {!solo && (data.lastWeek.them > 0 || data.lastWeek.me > 0) && (
        <LastWeek data={data} name={name} s={s} theme={theme} />
      )}
    </View>
  );
}

function Bar({
  color,
  value,
  top,
  index,
  still,
  s,
}: {
  color: string;
  value: number;
  top: number;
  index: number;
  still: boolean;
  s: ReturnType<typeof getStyles>;
}) {
  const target = Math.max(4, (top > 0 ? Math.min(1, value / top) : 0) * PLOT_H);
  const h = useSharedValue(still ? target : 0);
  useEffect(() => {
    if (still) {
      h.value = target;
      return;
    }
    h.value = withDelay(120 + index * 55, withTiming(target, { duration: 700, easing: Easing.out(Easing.cubic) }));
  }, [h, target, index, still]);
  const style = useAnimatedStyle(() => ({ height: h.value }));
  return <Animated.View style={[s.bar, { backgroundColor: color }, value === 0 && { opacity: 0.25 }, style]} />;
}

/** 줄다리기 — 친구 몫 | 내 몫 */
function Tug({ share, still, s }: { share: number; still: boolean; s: ReturnType<typeof getStyles> }) {
  const v = useSharedValue(still ? share : 0.5);
  useEffect(() => {
    v.value = still ? share : withDelay(100, withTiming(share, { duration: 900, easing: Easing.out(Easing.cubic) }));
  }, [v, share, still]);
  const left = useAnimatedStyle(() => ({ flex: v.value }));
  const right = useAnimatedStyle(() => ({ flex: 1 - v.value }));
  return (
    <View style={s.tug}>
      <Animated.View style={[s.tugPart, { backgroundColor: THEM }, left]} />
      <Animated.View style={[s.tugPart, { backgroundColor: ME }, right]} />
    </View>
  );
}

/** 남은 날 — 마지막 날이면 주황으로 두근 */
function LeftChip({ last, still, children }: { last: boolean; still: boolean; children: string }) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  useEffect(() => {
    if (!last || still) return;
    scale.value = withRepeat(
      withSequence(withTiming(1.06, { duration: 800 }), withTiming(1, { duration: 800 })),
      -1,
    );
  }, [last, still, scale]);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const color = last ? "#FF7A00" : theme.primary;
  return (
    <Animated.View style={[chip.wrap, { backgroundColor: color + "1F" }, style]}>
      <Ionicons name={last ? "flame" : "time"} size={13} color={color} />
      <Text style={[chip.text, { color }]}>{children}</Text>
    </Animated.View>
  );
}
const chip = StyleSheet.create({
  wrap: { flexDirection: "row", alignItems: "center", gap: 4, borderRadius: 999, paddingHorizontal: 9, paddingVertical: 5 },
  text: { fontSize: 11.5, fontWeight: "900" },
});

function LastWeek({
  data,
  name,
  s,
  theme,
}: {
  data: VersusWeek;
  name: string;
  s: ReturnType<typeof getStyles>;
  theme: ThemeColors;
}) {
  const { t } = useTranslation();
  const { them, me } = data.lastWeek;
  const result =
    me > them
      ? { text: t("friendProfile.versus.lastWeekWon"), color: "#1DBB7F" }
      : them > me
        ? { text: t("friendProfile.versus.lastWeekLost", { name }), color: "#FF7A00" }
        : { text: t("friendProfile.versus.lastWeekTie"), color: theme.textSecondary };
  return (
    <View style={s.last}>
      <Text style={s.lastLabel}>{t("friendProfile.versus.lastWeek")}</Text>
      <View style={s.lastNums}>
        <View style={[s.dot, { backgroundColor: THEM }]} />
        <Text style={s.lastNum}>{fmt(them)}</Text>
        <Text style={s.lastSep}>·</Text>
        <View style={[s.dot, { backgroundColor: ME }]} />
        <Text style={s.lastNum}>{fmt(me)}</Text>
      </View>
      <Text style={[s.lastResult, { color: result.color }]} numberOfLines={1}>
        {result.text}
      </Text>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    card: {
      marginHorizontal: 20,
      marginBottom: 32,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderColor: theme.border,
      borderRadius: 22,
      padding: 16,
      paddingBottom: 14,
    },
    head: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 14 },
    title: { fontSize: 17, lineHeight: 22, fontWeight: "900", color: theme.text },
    subtitle: { fontSize: 12, lineHeight: 16, fontWeight: "700", color: theme.textSecondary, marginTop: 2 },

    score: { flexDirection: "row", alignItems: "center", gap: 8 },
    side: { flex: 1, flexDirection: "row", alignItems: "center", gap: 9, minWidth: 0 },
    ring: { borderWidth: 2.5, borderRadius: 999, padding: 2 },
    sideName: { fontSize: 12.5, fontWeight: "800", color: theme.textSecondary },
    numRow: { flexDirection: "row", alignItems: "center", gap: 3 },
    num: { fontSize: 22, lineHeight: 26, fontWeight: "900", fontVariant: ["tabular-nums"] },
    xp: { fontSize: 11, fontWeight: "900", opacity: 0.75, marginTop: 6 },
    vs: {
      width: 34,
      height: 34,
      borderRadius: 17,
      borderWidth: 2,
      borderColor: theme.border,
      backgroundColor: theme.bg,
      alignItems: "center",
      justifyContent: "center",
    },
    vsText: { fontSize: 11, fontWeight: "900", color: theme.textSecondary },

    tug: { flexDirection: "row", gap: 3, height: 10, borderRadius: 999, overflow: "hidden", backgroundColor: theme.border, marginTop: 12, marginBottom: 8 },
    tugPart: { height: "100%", borderRadius: 999 },
    status: { fontSize: 13, lineHeight: 18, fontWeight: "800", marginBottom: 14 },

    chart: { flexDirection: "row", gap: 6 },
    axis: { width: 30, height: PLOT_H + 14, justifyContent: "space-between", marginTop: -7 },
    axisText: { fontSize: 10.5, lineHeight: 14, fontWeight: "700", color: theme.textSecondary, textAlign: "right", fontVariant: ["tabular-nums"] },
    plot: { flex: 1, flexDirection: "row", gap: 2 },
    grid: { position: "absolute", left: 0, right: 0, top: 0, height: PLOT_H, justifyContent: "space-between" },
    gridLine: { borderTopWidth: 1, borderStyle: "dashed", borderColor: theme.border },
    gridBase: { borderStyle: "solid" },
    col: { flex: 1, borderRadius: 12, paddingBottom: 4, alignItems: "stretch" },
    colActive: { backgroundColor: theme.primary + "1A" },
    bars: { height: PLOT_H, flexDirection: "row", alignItems: "flex-end", justifyContent: "center", gap: 3 },
    bar: { width: "34%", maxWidth: 13, borderTopLeftRadius: 6, borderTopRightRadius: 6, borderBottomLeftRadius: 3, borderBottomRightRadius: 3 },
    ghost: { width: "70%", height: "40%", borderWidth: 2, borderStyle: "dashed", borderColor: theme.border, borderRadius: 8 },
    dayText: { marginTop: 6, fontSize: 11.5, fontWeight: "800", color: theme.textSecondary, textAlign: "center" },
    dayToday: { color: theme.primary, fontWeight: "900" },
    todayDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: theme.primary, alignSelf: "center", marginTop: 2 },

    detail: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10, paddingVertical: 9, paddingHorizontal: 12, borderRadius: 14, backgroundColor: theme.bg },
    detailDay: { flex: 1, flexDirection: "row", alignItems: "center", gap: 6, minWidth: 0 },
    detailDayText: { flexShrink: 1, fontSize: 13.5, fontWeight: "900", color: theme.text },
    todayPill: { backgroundColor: theme.primary, borderRadius: 999, paddingHorizontal: 7, paddingVertical: 2 },
    todayPillText: { color: "#fff", fontSize: 10.5, fontWeight: "900" },
    detailVal: { flexDirection: "row", alignItems: "center", gap: 5 },
    dot: { width: 9, height: 9, borderRadius: 5 },
    detailNum: { fontSize: 15, fontWeight: "900", color: theme.text, fontVariant: ["tabular-nums"] },
    detailXp: { fontSize: 11, fontWeight: "900", color: theme.textSecondary, marginLeft: -4 },

    last: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 12, paddingTop: 11, borderTopWidth: 1, borderTopColor: theme.border },
    lastLabel: { fontSize: 12.5, fontWeight: "800", color: theme.textSecondary },
    lastNums: { flex: 1, flexDirection: "row", alignItems: "center", gap: 4, minWidth: 0 },
    lastNum: { fontSize: 12.5, fontWeight: "800", color: theme.text, fontVariant: ["tabular-nums"] },
    lastSep: { color: theme.textSecondary, marginHorizontal: 2 },
    lastResult: { fontSize: 12.5, fontWeight: "900", flexShrink: 1 },
  });
