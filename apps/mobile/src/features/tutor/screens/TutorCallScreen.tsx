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
import * as Clipboard from "expo-clipboard";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  withRepeat,
  cancelAnimation,
  interpolate,
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
  /** 선생님 성격. 헤더 부제("Teasing · 한국어 선생님")에 쓴다 */
  teacherPersonality?: string;
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
  /** 로마자 표기. 헤더 우측 슬라이더 버튼으로 끈다 (고급자에겐 거슬린다) */
  const [roman, setRoman] = useState(true);
  const [copied, setCopied] = useState(false);
  /** 유저가 실제로 말해본 오늘의 표현 */
  const [doneCount, setDoneCount] = useState(0);
  const doneRef = useRef<Set<string>>(new Set());

  const accent = ACCENT[p.state] ?? ACCENT.idle;
  const teacherColor = p.teacher?.color ?? "#8B82EE";
  const remain = p.maxSec > 0 ? Math.max(0, p.maxSec - p.elapsedSec) : 0;
  const nearEnd = p.active && p.maxSec > 0 && remain <= 30;

  // 배경에 서는 인물이라 예전(104~138)보다 크게 잡는다
  const avatarSize = height < 700 ? 132 : height < 820 ? 154 : 172;

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

  const copy = useCallback(async () => {
    if (!focus) return;
    await Clipboard.setStringAsync(focus);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }, [focus]);

  const hasTargets = p.targets.length > 0;
  const pct = hasTargets ? doneCount / p.targets.length : 0;

  return (
    <View style={st.root}>
      <Backdrop accent={accent} teacherColor={teacherColor} state={p.state} />

      {/* 선생님은 배경에 선다. 유리 패널이 그 앞을 덮는 구성이다 */}
      <View style={[st.stage, { top: insets.top + 96 }]} pointerEvents="none">
        <TutorCharacter
          state={p.state}
          avatar={p.teacher?.avatar ?? "🧑‍🏫"}
          color={teacherColor}
          size={avatarSize}
        />
      </View>

      {/* 아래를 깔아줘야 유리 패널 위 글씨가 읽힌다 */}
      <LinearGradient
        colors={["transparent", "rgba(9,7,20,0.55)", "#090714"]}
        locations={[0, 0.42, 1]}
        style={st.scrim}
        pointerEvents="none"
      />

      {/* 1) 헤더 — 닫기 · 선생님 · 시간 */}
      <View style={[st.header, { paddingTop: insets.top + 4 }]}>
        <Pressable onPress={p.onClose} hitSlop={12} style={st.iconBtn}>
          <Ionicons name="chevron-down" size={26} color="#fff" />
        </Pressable>

        <View style={st.idText}>
          <View style={st.idNameRow}>
            <Text style={st.idName} numberOfLines={1}>
              {p.teacherName ?? t("tutor.title")}
            </Text>
            <Text style={st.idEmoji}>{p.teacher?.avatar ?? "🧑‍🏫"}</Text>
          </View>
          <Text style={st.idRole} numberOfLines={1}>
            {p.teacherPersonality
              ? `${t(`tutor.personality.${p.teacherPersonality}`)} · ${t("tutor.call.roleLabel")}`
              : t("tutor.call.roleLabel")}
          </Text>
        </View>

        <View style={st.headerRight}>
          {p.active && (
            <View style={[st.timer, nearEnd && st.timerWarn]}>
              <Ionicons
                name="time-outline"
                size={13}
                color={nearEnd ? "#fff" : "rgba(255,255,255,0.8)"}
              />
              <Text style={[st.timerText, nearEnd && st.timerTextWarn]}>
                {fmt(remain)}
              </Text>
            </View>
          )}
          <Pressable
            onPress={() => setRoman((v) => !v)}
            hitSlop={10}
            style={[st.tune, roman && st.tuneOn]}
          >
            <Ionicons
              name="options-outline"
              size={18}
              color={roman ? "#1A1A2E" : "rgba(255,255,255,0.75)"}
            />
          </Pressable>
        </View>
      </View>

      {/* 2) 진도 카드 + 벽에 적어둔 응원 한 줄 */}
      <View style={st.topRow}>
        <View style={st.progressCard}>
          <View style={st.progressTop}>
            <Text style={st.progressIcon}>{p.topicTitle ? "☕" : "💬"}</Text>
            <Text style={st.progressTitle} numberOfLines={1}>
              {p.topicTitle ?? t("tutor.freeTalk")}
            </Text>
          </View>

          {hasTargets && (
            <>
              <Text style={st.progressStep}>
                {t("tutor.call.step", {
                  done: doneCount,
                  total: p.targets.length,
                })}
              </Text>
              <View style={st.progressBarRow}>
                <View style={st.progressBarWrap}>
                  <ProgressBar pct={pct} accent={accent} />
                </View>
                <Text style={st.progressPct}>{Math.round(pct * 100)}%</Text>
              </View>
            </>
          )}
        </View>

        {/* 선생님이 말하는 중엔 비켜준다 — 화면이 시끄러우면 어차피 안 읽힌다 */}
        {p.active && p.state !== "speaking" && (
          <Animated.Text
            entering={FadeIn.duration(600)}
            exiting={FadeOut.duration(260)}
            style={st.cheer}
          >
            {t("tutor.call.cheer")}
          </Animated.Text>
        )}
      </View>

      <View style={st.spacer} />

      {/* 3) 지금 오가는 말 */}
      {showText && (
        <Animated.View
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(140)}
          layout={LinearTransition.duration(220)}
          style={st.glass}
        >
          <View style={st.waveRow}>
            <Waveform state={p.state} accent={accent} />
            <Text style={[st.waveLabel, { color: accent }]} numberOfLines={1}>
              {t(`tutor.state.${p.state}`)}
            </Text>
          </View>

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
            <Animated.Text
              entering={FadeIn.duration(180)}
              style={st.explainText}
              numberOfLines={3}
            >
              {explain}
            </Animated.Text>
          )}
        </Animated.View>
      )}

      {/* 4) 따라 할 한 문장. 화면에서 유일하게 밝은 덩어리다 */}
      {!!focus && p.active && (
        <Animated.View
          entering={FadeIn.duration(220)}
          layout={LinearTransition.duration(220)}
          style={st.card}
        >
          <View style={st.cardBadge}>
            <Text style={st.cardBadgeText}>
              {t("tutor.call.todayExpression")}
            </Text>
          </View>

          <Pressable style={st.cardBody} onPress={() => play(focus, false)}>
            <View
              style={[st.cardPlay, { backgroundColor: hexA(teacherColor, 0.16) }]}
            >
              <Ionicons name="volume-high" size={18} color={teacherColor} />
            </View>

            <View style={st.cardTextWrap}>
              <Text style={st.cardKo} numberOfLines={2}>
                {focus}
              </Text>
              {roman && (
                <Text style={st.cardRoman} numberOfLines={1}>
                  {romanize(focus)}
                </Text>
              )}
            </View>

            <Pressable
              onPress={() => void copy()}
              hitSlop={10}
              style={st.cardCopy}
            >
              <Ionicons
                name={copied ? "checkmark" : "copy-outline"}
                size={18}
                color={copied ? "#2FA96A" : "#9C99AE"}
              />
            </Pressable>
          </Pressable>
        </Animated.View>
      )}

      {/* 5) 막혔을 때 바로 누를 세 가지 */}
      {p.active && (
        <View style={st.pills}>
          <Pill
            emoji="🐌"
            label={t("tutor.call.slower")}
            onPress={() => play(replayText, true)}
            disabled={!replayText.trim()}
          />
          <Pill
            emoji="🔄"
            label={t("tutor.call.replay")}
            onPress={() => play(replayText, false)}
            disabled={!replayText.trim()}
          />
          <Pill
            emoji={explaining ? "⏳" : "💡"}
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

      {/* 6) 통화 조작. 항상 하단 고정 */}
      <View style={[st.controls, { paddingBottom: insets.bottom + 8 }]}>
        {p.active ? (
          <>
            <RoundBtn
              icon={p.micOn ? "mic" : "mic-off"}
              label={p.micOn ? t("tutor.call.micOff") : t("tutor.call.micOn")}
              onPress={p.toggleMic}
              on={!p.micOn}
            />
            <EndButton label={t("tutor.call.end")} onPress={p.onEnd} />
            <RoundBtn
              icon={showText ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
              label={showText ? t("tutor.call.textHide") : t("tutor.call.text")}
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

      {/* 7) 조용한 서명 */}
      <Text
        style={[st.brand, { marginBottom: insets.bottom > 0 ? 2 : 8 }]}
        numberOfLines={1}
      >
        {`KORIO · ${t("tutor.call.tagline")} ♡`}
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

/**
 * 통화 화면 뒤에 까는 빛.
 *
 * ⚠️ 예전 버전은 withTiming 을 **한 번만** 돌려서, 9초가 지나면 화면이 그냥
 *    정지 화면이 됐다. 의도는 "살아 있게" 였는데 코드가 반대였다.
 *    이제 withRepeat 으로 계속 왕복한다.
 *
 * 인물 사진 대신 네 겹으로 공간을 만든다:
 *  1) 바탕 그라데이션 — 저녁 무렵의 방
 *  2) 색 덩어리 둘 — 아주 느리게 표류한다. 선생님 색으로 물든다
 *  3) 선생님 뒤 키라이트 — 말할 때 빠르게, 들을 때 느리게 호흡한다
 *  4) 창에서 비스듬히 들어오는 빛 한 줄 — 평면으로 안 보이게
 */
function Backdrop({
  accent,
  teacherColor,
  state,
}: {
  accent: string;
  teacherColor: string;
  state: TutorState;
}) {
  const drift = useSharedValue(0);
  const glow = useSharedValue(0);

  useEffect(() => {
    drift.value = withRepeat(
      withTiming(1, { duration: 15000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
    return () => cancelAnimation(drift);
  }, [drift]);

  useEffect(() => {
    cancelAnimation(glow);
    const dur = state === "speaking" ? 820 : state === "listening" ? 2000 : 3000;
    glow.value = withRepeat(
      withTiming(1, { duration: dur, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
    return () => cancelAnimation(glow);
  }, [glow, state]);

  const s1 = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(drift.value, [0, 1], [-54, 44]) },
      { translateY: interpolate(drift.value, [0, 1], [-34, 28]) },
      { scale: interpolate(drift.value, [0, 1], [1, 1.22]) },
    ],
  }));
  const s2 = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(drift.value, [0, 1], [64, -42]) },
      { translateY: interpolate(drift.value, [0, 1], [44, -24]) },
      { scale: interpolate(drift.value, [0, 1], [1.16, 0.94]) },
    ],
  }));
  const keyLight = useAnimatedStyle(() => ({
    opacity: interpolate(glow.value, [0, 1], [0.3, 0.58]),
    transform: [{ scale: interpolate(glow.value, [0, 1], [0.94, 1.08]) }],
  }));

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={["#2B2453", "#1A1533", "#0B0818"]}
        locations={[0, 0.46, 1]}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        style={[
          st.blob,
          { top: -120, left: -80, backgroundColor: hexA(teacherColor, 0.34) },
          s1,
        ]}
      />
      <Animated.View
        style={[
          st.blob,
          { bottom: 20, right: -100, backgroundColor: hexA(accent, 0.2) },
          s2,
        ]}
      />
      <Animated.View
        style={[
          st.keyLight,
          { backgroundColor: hexA(teacherColor, 0.5) },
          keyLight,
        ]}
      />
      <LinearGradient
        colors={["transparent", "rgba(255,255,255,0.055)", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={st.streak}
      />
    </View>
  );
}

/**
 * 막대 다섯 개짜리 레벨 미터.
 *
 * 자막만 있으면 "멈춘 건지 말하는 중인지" 를 글자로 읽어야 한다. 막대가
 * 움직이면 읽지 않고 안다 — 말할 땐 빠르고 크게, 들을 땐 느리고 작게.
 */
const WAVE = [
  { peak: 0.42, delay: 0 },
  { peak: 0.86, delay: 90 },
  { peak: 1, delay: 180 },
  { peak: 0.68, delay: 270 },
  { peak: 0.34, delay: 360 },
];

function Waveform({ state, accent }: { state: TutorState; accent: string }) {
  const active = state === "speaking" || state === "listening";
  const dur = state === "speaking" ? 400 : 820;
  return (
    <View style={st.wave}>
      {WAVE.map((b, i) => (
        <WaveBar
          key={i}
          active={active}
          dur={dur}
          peak={b.peak}
          delay={b.delay}
          accent={accent}
        />
      ))}
    </View>
  );
}

/** 막대 하나. 훅을 map 안에서 부를 수 없어서 컴포넌트로 뺀다 */
function WaveBar({
  active,
  dur,
  peak,
  delay,
  accent,
}: {
  active: boolean;
  dur: number;
  peak: number;
  delay: number;
  accent: string;
}) {
  const v = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(v);
    if (!active) {
      v.value = withTiming(0, { duration: 220 });
      return;
    }
    v.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration: dur, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      ),
    );
    return () => cancelAnimation(v);
  }, [v, active, dur, delay]);

  const style = useAnimatedStyle(() => ({
    height: interpolate(v.value, [0, 1], [4, 4 + 16 * peak]),
    opacity: interpolate(v.value, [0, 1], [0.45, 1]),
  }));

  return (
    <Animated.View style={[st.waveBar, { backgroundColor: accent }, style]} />
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

/** 빠른 도움말 알약. 이모지가 아이콘보다 눈에 빨리 걸린다 */
function Pill({
  emoji,
  label,
  onPress,
  disabled,
}: {
  emoji: string;
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
      onPressIn={() => (press.value = withTiming(1, { duration: 90 }))}
      onPressOut={() => (press.value = withTiming(0, { duration: 140 }))}
      onPress={onPress}
      disabled={disabled}
      style={[st.pill, disabled && st.dim, style]}
    >
      <Text style={st.pillEmoji}>{emoji}</Text>
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
    transform: [{ translateY: press.value * 4 }],
  }));

  return (
    <View style={st.endCol}>
      <AnimatedPressable
        onPressIn={() => (press.value = withTiming(1, { duration: 80 }))}
        onPressOut={() => (press.value = withTiming(0, { duration: 130 }))}
        onPress={onPress}
        style={[st.end, style]}
      >
        <Ionicons name="call" size={28} color="#fff" style={st.endIcon} />
      </AnimatedPressable>
      <Text style={st.endText} numberOfLines={1}>
        {label}
      </Text>
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
  root: { flex: 1, backgroundColor: "#0B0818" },
  blob: { position: "absolute", width: 320, height: 320, borderRadius: 160 },
  /** 선생님 뒤에서 호흡하는 조명 */
  keyLight: {
    position: "absolute",
    alignSelf: "center",
    top: 90,
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  /** 창에서 비스듬히 들어오는 빛 한 줄 */
  streak: {
    position: "absolute",
    top: -60,
    left: -40,
    right: -40,
    height: 320,
    transform: [{ rotate: "-18deg" }],
  },
  scrim: { position: "absolute", left: 0, right: 0, bottom: 0, height: "62%" },
  stage: { position: "absolute", left: 0, right: 0, alignItems: "center" },
  spacer: { flex: 1, minHeight: 12 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 6,
    gap: 4,
  },
  iconBtn: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  idText: { flex: 1, flexShrink: 1 },
  idNameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  idName: {
    fontSize: 21,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: -0.4,
    flexShrink: 1,
  },
  idEmoji: { fontSize: 17 },
  idRole: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "rgba(255,255,255,0.62)",
    marginTop: 1,
  },

  headerRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  timer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: GLASS,
    borderWidth: 1,
    borderColor: GLASS_LINE,
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  timerWarn: { backgroundColor: "#E5533D", borderColor: "#B8341F" },
  timerText: {
    fontSize: 14,
    fontWeight: "800",
    color: "rgba(255,255,255,0.9)",
    fontVariant: ["tabular-nums"],
  },
  timerTextWarn: { color: "#fff" },
  tune: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GLASS,
    borderWidth: 1,
    borderColor: GLASS_LINE,
  },
  tuneOn: { backgroundColor: "#fff", borderColor: "#fff" },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 14,
    paddingTop: 4,
    gap: 10,
  },
  progressCard: {
    flexShrink: 1,
    maxWidth: "62%",
    backgroundColor: "rgba(14,11,26,0.5)",
    borderWidth: 1,
    borderColor: GLASS_LINE,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 7,
  },
  progressTop: { flexDirection: "row", alignItems: "center", gap: 7 },
  progressIcon: { fontSize: 15 },
  progressTitle: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.2,
  },
  progressStep: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255,255,255,0.6)",
    fontVariant: ["tabular-nums"],
  },
  progressBarRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  progressBarWrap: { flex: 1 },
  progressPct: {
    fontSize: 11.5,
    fontWeight: "900",
    color: "rgba(255,255,255,0.78)",
    fontVariant: ["tabular-nums"],
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.14)",
    overflow: "hidden",
  },
  fill: { height: 6, borderRadius: 3 },

  /** 벽에 적어둔 듯한 응원. 기울이고 흐리게 해서 UI 가 아니라 "낙서" 로 읽히게 */
  cheer: {
    flex: 1,
    textAlign: "right",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "700",
    fontStyle: "italic",
    color: "rgba(255,255,255,0.5)",
    letterSpacing: 0.3,
    transform: [{ rotate: "-6deg" }],
    marginTop: 8,
  },

  glass: {
    marginHorizontal: 14,
    backgroundColor: "rgba(12,9,24,0.6)",
    borderWidth: 1,
    borderColor: GLASS_LINE,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 15,
    gap: 8,
  },
  waveRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  wave: { flexDirection: "row", alignItems: "center", gap: 3, height: 20 },
  waveBar: { width: 3.5, borderRadius: 2 },
  waveLabel: { fontSize: 13, fontWeight: "800", letterSpacing: 0.2 },

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
    color: "rgba(255,255,255,0.32)",
    textAlign: "center",
  },
  caption: {
    fontSize: 19,
    lineHeight: 29,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.3,
    textAlign: "center",
  },
  captionIdle: {
    fontSize: 15,
    lineHeight: 23,
    fontWeight: "700",
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
  },
  explainText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600",
    color: "rgba(255,255,255,0.56)",
    textAlign: "center",
  },

  card: {
    marginHorizontal: 14,
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.34,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  /** 카드 모서리에 걸친 분홍 라벨 */
  cardBadge: {
    position: "absolute",
    top: -9,
    left: 16,
    zIndex: 2,
    backgroundColor: "#FFD9E6",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  cardBadgeText: {
    fontSize: 10.5,
    fontWeight: "900",
    color: "#C2416F",
    letterSpacing: 0.2,
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: 4,
  },
  cardPlay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTextWrap: { flex: 1 },
  cardKo: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "900",
    color: "#1A1A2E",
    letterSpacing: -0.4,
  },
  cardRoman: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#9C99AE",
    marginTop: 3,
  },
  cardCopy: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  pills: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 12,
    paddingTop: 14,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexShrink: 1,
    backgroundColor: GLASS,
    borderWidth: 1,
    borderColor: GLASS_LINE,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  pillEmoji: { fontSize: 14 },
  pillText: {
    fontSize: 12.5,
    fontWeight: "800",
    color: "rgba(255,255,255,0.94)",
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
  quotaText: {
    fontSize: 13,
    fontWeight: "700",
    color: "rgba(255,255,255,0.7)",
  },
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
    paddingHorizontal: 26,
    paddingTop: 20,
  },
  ctrlCol: { alignItems: "center", gap: 7, width: 74 },
  round: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GLASS,
    borderWidth: 1,
    borderColor: GLASS_LINE,
  },
  roundOn: { backgroundColor: "#fff", borderColor: "#fff" },
  ctrlLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(255,255,255,0.66)",
    textAlign: "center",
  },

  endCol: { flex: 1, alignItems: "center", gap: 7 },
  end: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5533D",
    borderBottomWidth: 5,
    borderColor: "#B8341F",
  },
  /** 수화기를 내려놓는 각도 */
  endIcon: { transform: [{ rotate: "135deg" }] },
  endText: { color: "#fff", fontSize: 12.5, fontWeight: "900" },

  again: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#776ee2",
    borderBottomWidth: 5,
    borderColor: "#5B4DD4",
  },
  againText: { color: "#fff", fontSize: 16, fontWeight: "900" },

  brand: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.1,
    color: "rgba(255,255,255,0.26)",
    paddingTop: 10,
  },

  analyzing: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(11,8,24,0.88)",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  analyzingText: { fontSize: 15, fontWeight: "800", color: "#fff" },
});
