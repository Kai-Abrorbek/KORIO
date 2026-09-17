import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  FadeIn,
  FadeOut,
  LinearTransition,
  Easing,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useSpeech } from "@/hooks/useSpeech";
import { romanize } from "@/utils/romanize";
import { TutorApi, type TutorQuota } from "../services/tutor.api";
import { TutorCharacter } from "../components/TutorCharacter";
import type { TutorState } from "../hooks/useRealtimeTutor";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const fmt = (sec: number) =>
  `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

/** 상태별 강조색. TutorCharacter 와 같은 규칙을 쓴다 */
const ACCENT: Record<TutorState, string> = {
  idle: "#9C93FF",
  connecting: "#9C93FF",
  listening: "#5CE08A",
  thinking: "#FFC24B",
  speaking: "#B3A6FF",
  error: "#FF8A73",
};

/** 표현이 "나왔는지" 볼 때는 띄어쓰기·문장부호를 버리고 본다 */
const norm = (s: string) =>
  s.replace(/[^가-힣a-z0-9]/gi, "").toLowerCase();

export interface TutorCallScreenProps {
  state: TutorState;
  caption: string;
  captionPrev: string;
  userSaid: string;
  examples: string[];
  targets: string[];
  teacher: { id: string; avatar: string; color: string } | null;
  teacherName?: string;
  topicTitle?: string;
  elapsedSec: number;
  maxSec: number;
  active: boolean;
  busy: boolean;
  analyzing: boolean;
  micOn: boolean;
  error: string | null;
  quota: TutorQuota | null;
  toggleMic: () => void;
  withMicMuted: (play: () => Promise<void>) => Promise<void>;
  onEnd: () => void;
  onClose: () => void;
  onPickAnother: () => void;
  onUpsell: () => void;
}

/**
 * 통화 중 화면.
 *
 * 주제/선생님 고르기와 정리 카드는 TutorScreen 이 그대로 들고 있다.
 * 여기는 "지금 통화 중"인 상태 하나만 그린다.
 *
 * 배경은 라이트 모드에서도 어둡게 간다. 통화 화면은 몰입이 전부라
 * 흰 배경이면 그냥 채팅창처럼 보인다 — 대신 흰 표현 카드가 유일한
 * 밝은 덩어리라서 눈이 거기로 간다. (랭크 배너와 같은 판단)
 */
export function TutorCallScreen(p: TutorCallScreenProps) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { speak, speakSlow } = useSpeech();

  const [showText, setShowText] = useState(true);
  /** 지금 자막에 대한 우즈벡어 설명. 새 문장이 오면 지운다 */
  const [explain, setExplain] = useState("");
  const [explaining, setExplaining] = useState(false);
  /** 유저가 실제로 말해본 오늘의 표현 */
  const [doneCount, setDoneCount] = useState(0);
  const doneRef = useRef<Set<string>>(new Set());

  const accent = ACCENT[p.state] ?? ACCENT.idle;
  const teacherColor = p.teacher?.color ?? "#8B82EE";
  const remain = p.maxSec > 0 ? Math.max(0, p.maxSec - p.elapsedSec) : 0;
  const nearEnd = p.active && p.maxSec > 0 && remain <= 30;

  const avatarSize = height < 700 ? 104 : height < 820 ? 122 : 138;

  useEffect(() => {
    setExplain("");
  }, [p.caption]);

  // 오늘의 표현을 유저가 직접 말했을 때만 채운다.
  // 선생님이 말한 건 진도가 아니다 — 그건 그냥 들은 거다.
  useEffect(() => {
    if (!p.userSaid || p.targets.length === 0) return;
    const said = norm(p.userSaid);
    if (!said) return;
    let changed = false;
    for (const ex of p.targets) {
      if (doneRef.current.has(ex)) continue;
      const k = norm(ex);
      if (k.length >= 2 && said.includes(k)) {
        doneRef.current.add(ex);
        changed = true;
      }
    }
    if (changed) setDoneCount(doneRef.current.size);
  }, [p.userSaid, p.targets]);

  /**
   * 재생이 끝날 때까지 기다린다.
   *
   * speak 는 void 라 그냥 await 하면 소리가 나기도 전에 마이크가 다시
   * 열린다 — 그러면 AI 가 자기 예문을 듣고 대답해 버린다.
   */
  const speakAwait = useCallback(
    (text: string, slow: boolean) =>
      new Promise<void>((resolve) => {
        let settled = false;
        const fin = () => {
          if (settled) return;
          settled = true;
          resolve();
        };
        const play = slow ? speakSlow : speak;
        play(text, "ko-KR", { onDone: fin, onError: fin, onStopped: fin });
        // 콜백이 안 오는 경우를 대비한 빗장. 마이크가 영영 닫혀 있으면 안 된다.
        setTimeout(fin, 15_000);
      }),
    [speak, speakSlow],
  );

  /** 지금 화면에서 "따라 할 한 문장" */
  const focus = useMemo(() => {
    if (p.examples[0]) return p.examples[0];
    const next = p.targets.find((ex) => !doneRef.current.has(ex));
    return next ?? p.targets[0] ?? "";
  }, [p.examples, p.targets, doneCount]); // eslint-disable-line react-hooks/exhaustive-deps

  /** 다시 듣기·천천히 가 대상으로 삼는 문장 */
  const replayText = p.caption.trim() || focus;

  const play = useCallback(
    (text: string, slow: boolean) => {
      if (!text.trim()) return;
      void p.withMicMuted(async () => {
        await speakAwait(text.trim(), slow);
      });
    },
    [p, speakAwait],
  );

  const loadExplain = useCallback(async () => {
    const src = p.caption.trim() || focus.trim();
    if (!src || explaining) return;
    setShowText(true);
    setExplaining(true);
    try {
      const r = await TutorApi.explain(src);
      setExplain(
        [r.translation, r.explanation].filter(Boolean).join("\n\n") ||
          t("tutor.explain.failed"),
      );
    } catch {
      setExplain(t("tutor.explain.failed"));
    } finally {
      setExplaining(false);
    }
  }, [p.caption, focus, explaining, t]);

  const hasTargets = p.targets.length > 0;
  const pct = hasTargets ? doneCount / p.targets.length : 0;

  return (
    <View style={st.root}>
      <Backdrop accent={accent} teacherColor={teacherColor} />

      {/* 1·2) 선생님은 왼쪽, 시간은 오른쪽 */}
      <View style={[st.header, { paddingTop: insets.top + 8 }]}>
        <View style={st.identity}>
          <View
            style={[
              st.idAvatar,
              { backgroundColor: hexA(teacherColor, 0.22), borderColor: hexA(teacherColor, 0.55) },
            ]}
          >
            <Text style={st.idAvatarText}>{p.teacher?.avatar ?? "🧑‍🏫"}</Text>
          </View>
          <View style={st.idText}>
            <Text style={st.idName} numberOfLines={1}>
              {p.teacherName ?? t("tutor.title")}
            </Text>
            <View style={st.idStateRow}>
              <View style={[st.dot, { backgroundColor: accent }]} />
              <Text style={[st.idState, { color: accent }]} numberOfLines={1}>
                {t(`tutor.state.${p.state}`)}
              </Text>
            </View>
          </View>
        </View>

        <View style={st.headerRight}>
          {p.active && (
            <View style={[st.timer, nearEnd && st.timerWarn]}>
              <Ionicons
                name="time-outline"
                size={13}
                color={nearEnd ? "#fff" : "rgba(255,255,255,0.78)"}
              />
              <Text style={[st.timerText, nearEnd && st.timerTextWarn]}>
                {fmt(remain)}
              </Text>
            </View>
          )}
          <Pressable onPress={p.onClose} hitSlop={10} style={st.iconBtn}>
            <Ionicons name="chevron-down" size={22} color="#fff" />
          </Pressable>
        </View>
      </View>

      {/* 3) 오늘 뭘 하고 있는지 한 줄 */}
      <View style={st.progressCard}>
        <View style={st.progressTop}>
          <Ionicons
            name={p.topicTitle ? "bookmark" : "chatbubbles"}
            size={13}
            color="rgba(255,255,255,0.72)"
          />
          <Text style={st.progressTitle} numberOfLines={1}>
            {p.topicTitle ?? t("tutor.freeTalk")}
          </Text>
          {hasTargets && (
            <Text style={st.progressCount}>
              {t("tutor.call.progress", {
                done: doneCount,
                total: p.targets.length,
              })}
            </Text>
          )}
        </View>
        {hasTargets && <ProgressBar pct={pct} accent={accent} />}
      </View>

      {/* 4) 가운데는 선생님 */}
      <View style={st.stage}>
        <TutorCharacter
          state={p.state}
          avatar={p.teacher?.avatar ?? "🧑‍🏫"}
          color={teacherColor}
          size={avatarSize}
        />
      </View>

      {/* 5) 지금 오가는 말 */}
      {showText && (
        <Animated.View
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(140)}
          layout={LinearTransition.duration(220)}
          style={st.glass}
        >
          {!!p.userSaid && p.active && (
            <Animated.View entering={FadeIn.duration(180)} style={st.userRow}>
              <Text style={st.userText} numberOfLines={2}>
                {p.userSaid}
              </Text>
              <View style={st.userTail} />
            </Animated.View>
          )}

          {!!p.captionPrev && (
            <Text style={st.captionPrev} numberOfLines={1}>
              {p.captionPrev}
            </Text>
          )}

          {p.caption ? (
            <Animated.Text
              key={p.caption}
              entering={FadeIn.duration(180)}
              style={st.caption}
              numberOfLines={3}
            >
              {p.caption}
            </Animated.Text>
          ) : (
            <Text style={st.captionIdle} numberOfLines={2}>
              {p.active ? t("tutor.call.sayHi") : t(`tutor.state.${p.state}`)}
            </Text>
          )}

          {!!explain && (
            <Animated.View entering={FadeIn.duration(180)} style={st.explainBox}>
              <Text style={st.explainFlag}>🇺🇿</Text>
              <Text style={st.explainText}>{explain}</Text>
            </Animated.View>
          )}
        </Animated.View>
      )}

      {/* 6) 따라 할 한 문장. 화면에서 유일하게 밝은 덩어리다 */}
      {!!focus && p.active && (
        <Animated.View
          entering={FadeIn.duration(220)}
          layout={LinearTransition.duration(220)}
          style={st.card}
        >
          <View style={st.cardHead}>
            <Text style={st.cardLabel}>{t("tutor.call.todayExpression")}</Text>
            <Text style={st.cardHint}>{t("tutor.tapToHear")}</Text>
          </View>
          <Pressable style={st.cardBody} onPress={() => play(focus, false)}>
            <View style={st.cardTextWrap}>
              <Text style={st.cardKo} numberOfLines={2}>
                {focus}
              </Text>
              <Text style={st.cardRoman} numberOfLines={1}>
                {romanize(focus)}
              </Text>
            </View>
            <View style={[st.cardPlay, { backgroundColor: teacherColor }]}>
              <Ionicons name="volume-high" size={17} color="#fff" />
            </View>
          </Pressable>
        </Animated.View>
      )}

      {/* 7) 막혔을 때 바로 누를 세 가지 */}
      {p.active && (
        <View style={st.pills}>
          <Pill
            icon="speedometer-outline"
            label={t("tutor.call.slower")}
            onPress={() => play(replayText, true)}
            disabled={!replayText.trim()}
          />
          <Pill
            icon="refresh"
            label={t("tutor.call.replay")}
            onPress={() => play(replayText, false)}
            disabled={!replayText.trim()}
          />
          <Pill
            icon={explaining ? "hourglass-outline" : "language-outline"}
            label={t("tutor.call.explain")}
            onPress={() => void loadExplain()}
            disabled={explaining || !(p.caption.trim() || focus.trim())}
          />
        </View>
      )}

      {!!p.error && (
        <Text style={st.error} numberOfLines={2}>
          {t(`tutor.err.${p.error}`, t("tutor.err.generic"))}
        </Text>
      )}

      {!p.active && !p.analyzing && !!p.quota && (
        <View style={st.quota}>
          <Text style={st.quotaText}>
            {t("tutor.quotaLeft", {
              min: Math.max(0, p.quota.dailyLimitMin - p.quota.dailyUsedMin),
              limit: p.quota.dailyLimitMin,
            })}
          </Text>
          {!p.quota.isMax && (
            <Pressable onPress={p.onUpsell} hitSlop={6}>
              <Text style={st.quotaUpsell}>{t("tutor.upsellMax")}</Text>
            </Pressable>
          )}
        </View>
      )}

      {/* 8) 통화 조작. 항상 하단 고정 */}
      <View style={[st.controls, { paddingBottom: insets.bottom + 10 }]}>
        {p.active ? (
          <>
            <RoundBtn
              icon={p.micOn ? "mic" : "mic-off"}
              label={t("tutor.call.mic")}
              onPress={p.toggleMic}
              on={!p.micOn}
            />
            <EndButton label={t("tutor.call.end")} onPress={p.onEnd} />
            <RoundBtn
              icon={showText ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
              label={t("tutor.call.text")}
              onPress={() => setShowText((v) => !v)}
              on={!showText}
            />
          </>
        ) : (
          <Pressable
            onPress={p.onPickAnother}
            disabled={p.busy || p.analyzing}
            style={[st.again, (p.busy || p.analyzing) && st.dim]}
          >
            <Ionicons name="refresh" size={19} color="#fff" />
            <Text style={st.againText}>{t("tutor.pickAnother")}</Text>
          </Pressable>
        )}
      </View>

      {/* 9) 조용한 서명 */}
      <Text style={[st.brand, { marginBottom: insets.bottom > 0 ? 2 : 8 }]}>
        KORIO · AI
      </Text>

      {p.analyzing && (
        <Animated.View entering={FadeIn.duration(200)} style={st.analyzing}>
          <ActivityIndicator color="#fff" size="large" />
          <Text style={st.analyzingText}>{t("tutor.summary.analyzing")}</Text>
        </Animated.View>
      )}
    </View>
  );
}

/** 뒤에서 아주 느리게 도는 빛. 통화 중 화면이 정지 화면처럼 보이지 않게 한다 */
function Backdrop({ accent, teacherColor }: { accent: string; teacherColor: string }) {
  const a = useSharedValue(0);
  const b = useSharedValue(0);

  useEffect(() => {
    a.value = withTiming(1, { duration: 9000, easing: Easing.inOut(Easing.ease) });
    b.value = withDelay(
      1200,
      withTiming(1, { duration: 11000, easing: Easing.inOut(Easing.ease) }),
    );
  }, [a, b]);

  const s1 = useAnimatedStyle(() => ({
    transform: [
      { translateX: -40 + a.value * 60 },
      { translateY: -30 + a.value * 40 },
      { scale: 1 + a.value * 0.18 },
    ],
  }));
  const s2 = useAnimatedStyle(() => ({
    transform: [
      { translateX: 50 - b.value * 70 },
      { translateY: 30 - b.value * 50 },
      { scale: 1.1 - b.value * 0.15 },
    ],
  }));

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={["#241E42", "#171329", "#0E0B1A"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        style={[st.blob, { top: -90, left: -60, backgroundColor: hexA(teacherColor, 0.3) }, s1]}
      />
      <Animated.View
        style={[st.blob, { bottom: 40, right: -80, backgroundColor: hexA(accent, 0.18) }, s2]}
      />
    </View>
  );
}

/** 채워지는 막대. 퍼센트가 아니라 실제 잰 픽셀로 움직인다 */
function ProgressBar({ pct, accent }: { pct: number; accent: string }) {
  const [w, setW] = useState(0);
  const fill = useSharedValue(0);

  useEffect(() => {
    fill.value = withTiming(Math.max(0, Math.min(1, pct)) * w, {
      duration: 520,
      easing: Easing.out(Easing.cubic),
    });
  }, [pct, w, fill]);

  const style = useAnimatedStyle(() => ({ width: fill.value }));

  return (
    <View style={st.track} onLayout={(e) => setW(e.nativeEvent.layout.width)}>
      <Animated.View style={[st.fill, { backgroundColor: accent }, style]} />
    </View>
  );
}

/** 빠른 도움말 알약 */
function Pill({
  icon,
  label,
  onPress,
  disabled,
}: {
  icon: any;
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const press = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - press.value * 0.05 }],
  }));

  return (
    <AnimatedPressable
      onPressIn={() => (press.value = withTiming(1, { duration: 70 }))}
      onPressOut={() => (press.value = withTiming(0, { duration: 130 }))}
      onPress={onPress}
      disabled={disabled}
      style={[st.pill, disabled && st.dim, style]}
    >
      <Ionicons name={icon} size={14} color="rgba(255,255,255,0.92)" />
      <Text style={st.pillText} numberOfLines={1}>
        {label}
      </Text>
    </AnimatedPressable>
  );
}

/** 마이크·텍스트 같은 토글. 꺼진 상태를 색으로 분명히 보여준다 */
function RoundBtn({
  icon,
  label,
  onPress,
  on,
}: {
  icon: any;
  label: string;
  onPress: () => void;
  /** true = 꺼둔 상태 (강조해서 보여준다) */
  on?: boolean;
}) {
  const press = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - press.value * 0.07 }],
  }));

  return (
    <View style={st.ctrlCol}>
      <AnimatedPressable
        onPressIn={() => (press.value = withTiming(1, { duration: 70 }))}
        onPressOut={() => (press.value = withTiming(0, { duration: 130 }))}
        onPress={onPress}
        style={[st.round, on && st.roundOn, style]}
      >
        <Ionicons name={icon} size={22} color={on ? "#1B1730" : "#fff"} />
      </AnimatedPressable>
      <Text style={st.ctrlLabel} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

/** 수업 종료. 바텀보더가 줄어들며 눌리는 느낌이 난다 */
function EndButton({ label, onPress }: { label: string; onPress: () => void }) {
  const press = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: press.value * 3 }],
    borderBottomWidth: 5 - press.value * 3,
  }));

  return (
    <View style={st.endCol}>
      <AnimatedPressable
        onPressIn={() => (press.value = withTiming(1, { duration: 70 }))}
        onPressOut={() => (press.value = withTiming(0, { duration: 130 }))}
        onPress={onPress}
        style={[st.end, style]}
      >
        <Ionicons name="call" size={22} color="#fff" style={st.endIcon} />
        <Text style={st.endText} numberOfLines={1}>
          {label}
        </Text>
      </AnimatedPressable>
    </View>
  );
}

/** #RRGGBB + 투명도 */
function hexA(hex: string, a: number): string {
  const h = hex.replace("#", "");
  if (h.length !== 6) return hex;
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

const GLASS = "rgba(255,255,255,0.07)";
const GLASS_LINE = "rgba(255,255,255,0.14)";

const st = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0E0B1A" },
  blob: { position: "absolute", width: 300, height: 300, borderRadius: 150 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 10,
  },
  identity: { flexDirection: "row", alignItems: "center", gap: 10, flexShrink: 1 },
  idAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  idAvatarText: { fontSize: 19 },
  idText: { flexShrink: 1 },
  idName: { fontSize: 15, fontWeight: "900", color: "#fff", letterSpacing: -0.2 },
  idStateRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  idState: { fontSize: 12, fontWeight: "700" },

  headerRight: { flexDirection: "row", alignItems: "center", gap: 4 },
  timer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: GLASS,
    borderWidth: 1,
    borderColor: GLASS_LINE,
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  timerWarn: { backgroundColor: "#E5533D", borderColor: "#B8341F" },
  timerText: {
    fontSize: 13,
    fontWeight: "800",
    color: "rgba(255,255,255,0.88)",
    fontVariant: ["tabular-nums"],
  },
  timerTextWarn: { color: "#fff" },
  iconBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },

  progressCard: {
    marginHorizontal: 16,
    backgroundColor: GLASS,
    borderWidth: 1,
    borderColor: GLASS_LINE,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 8,
  },
  progressTop: { flexDirection: "row", alignItems: "center", gap: 6 },
  progressTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "800",
    color: "rgba(255,255,255,0.9)",
  },
  progressCount: {
    fontSize: 12,
    fontWeight: "900",
    color: "rgba(255,255,255,0.62)",
    fontVariant: ["tabular-nums"],
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },
  fill: { height: 6, borderRadius: 3 },

  stage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 150,
    paddingVertical: 6,
  },

  glass: {
    marginHorizontal: 16,
    backgroundColor: "rgba(12,9,24,0.55)",
    borderWidth: 1,
    borderColor: GLASS_LINE,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 7,
  },
  userRow: { alignSelf: "flex-end", maxWidth: "88%" },
  userText: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "right",
    fontStyle: "italic",
  },
  userTail: {
    alignSelf: "flex-end",
    width: 22,
    height: 2,
    borderRadius: 1,
    backgroundColor: "#5CE08A",
    marginTop: 5,
    opacity: 0.85,
  },
  captionPrev: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.34)",
  },
  caption: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.2,
  },
  captionIdle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
    color: "rgba(255,255,255,0.5)",
  },
  explainBox: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  explainFlag: { fontSize: 13, lineHeight: 20 },
  explainText: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 20,
    fontWeight: "600",
    color: "rgba(255,255,255,0.78)",
  },

  card: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  cardHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: "900",
    color: "#8A87A0",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  cardHint: { fontSize: 11, fontWeight: "700", color: "#B3B0C4" },
  cardBody: { flexDirection: "row", alignItems: "center", gap: 12 },
  cardTextWrap: { flex: 1 },
  cardKo: {
    fontSize: 19,
    lineHeight: 26,
    fontWeight: "900",
    color: "#1A1A2E",
    letterSpacing: -0.3,
  },
  cardRoman: { fontSize: 12.5, fontWeight: "700", color: "#8A87A0", marginTop: 3 },
  cardPlay: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },

  pills: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flexShrink: 1,
    backgroundColor: GLASS,
    borderWidth: 1,
    borderColor: GLASS_LINE,
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  pillText: {
    fontSize: 12.5,
    fontWeight: "800",
    color: "rgba(255,255,255,0.92)",
    flexShrink: 1,
  },
  dim: { opacity: 0.4 },

  error: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FF8A73",
    textAlign: "center",
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  quota: { alignItems: "center", gap: 6, paddingTop: 12 },
  quotaText: { fontSize: 13, fontWeight: "700", color: "rgba(255,255,255,0.7)" },
  quotaUpsell: {
    fontSize: 13,
    fontWeight: "900",
    color: "#B3A6FF",
    textDecorationLine: "underline",
  },

  controls: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  ctrlCol: { alignItems: "center", gap: 6, width: 62 },
  round: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GLASS,
    borderWidth: 1,
    borderColor: GLASS_LINE,
  },
  roundOn: { backgroundColor: "#fff", borderColor: "#fff" },
  ctrlLabel: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "rgba(255,255,255,0.6)",
  },
  endCol: { flex: 1, alignItems: "center" },
  end: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    alignSelf: "stretch",
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E5533D",
    borderBottomWidth: 5,
    borderColor: "#B8341F",
  },
  endIcon: { transform: [{ rotate: "135deg" }] },
  endText: { color: "#fff", fontSize: 16, fontWeight: "900" },

  again: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#776ee2",
    borderBottomWidth: 5,
    borderColor: "#5B4DD4",
  },
  againText: { color: "#fff", fontSize: 16, fontWeight: "900" },

  brand: {
    textAlign: "center",
    fontSize: 9.5,
    fontWeight: "800",
    letterSpacing: 2,
    color: "rgba(255,255,255,0.22)",
  },

  analyzing: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(14,11,26,0.86)",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  analyzingText: { fontSize: 15, fontWeight: "800", color: "#fff" },
});
