import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ActivityIndicator,
  AppState,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  SlideInDown,
  ZoomIn,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import * as Haptics from "@/utils/haptics";
import { ApiError } from "@/services/api";
import { useAuthStore } from "@/store/auth.store";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import type { AvatarConfig } from "@/types/avatar";
import {
  StickersService,
  type StickerPreview,
  type StickersState,
} from "@/services/stickers.service";

/**
 * 내 캐릭터 텔레그램 스티커팩 — 텔레그램 /stickers 와 같은 화면.
 *
 * 서버가 지금 캐릭터로 8장을 그려(미리보기) 보여주고, 사면 봇이 텔레그램 세트를 만든다.
 * 앱 유저는 대개 텔레그램 계정이 이어져 있지 않다 → 봇 링크(START)로 넘어가서 거기서
 * 이어서 만든다. 그동안(앱으로 돌아올 때도) 서버를 다시 물어서 다 되면 완성 모달을 띄운다.
 */
const fmt = (n: number) => n.toLocaleString("en-US");
const FAN = [0, 5, 1] as const; // ㅋㅋㅋ · 사랑해 · 대박
const MAKING_STEPS = ["stickers.making.draw", "stickers.making.write", "stickers.making.send"] as const;
const POLL_MS = 2500;
const POLL_FOR_MS = 3 * 60_000;
const PRIMARY = "#776ee2";
const PRIMARY_DARK = "#5a50c9";
const TG = "#2AABEE";
const TG_DARK = "#1A8ACB";

type Phase = "idle" | "making" | "link" | "done";

function errorKey(reason: unknown) {
  const code = reason instanceof ApiError ? reason.code : "";
  if (code === "STICKERS_BUSY") return "stickers.errors.busy";
  if (code === "NOT_ENOUGH_GEMS") return "stickers.errors.notEnough";
  if (code === "STICKERS_UNAVAILABLE") return "stickers.cta.unavailable";
  return "stickers.errors.failed";
}

/** t.me 링크 — 텔레그램이 깔려 있으면 텔레그램 앱으로 열린다 */
function openTelegram(url: string) {
  void Linking.openURL(url).catch(() => undefined);
}

export default function StickersScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = useMemo(() => getStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const user = useAuthStore((st) => st.user);
  const updateUser = useAuthStore((st) => st.updateUser);

  const [state, setState] = useState<StickersState | null>(null);
  const [stateFailed, setStateFailed] = useState(false);
  const [preview, setPreview] = useState<StickerPreview | null>(null);
  const [previewStatus, setPreviewStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [phase, setPhase] = useState<Phase>("idle");
  const [link, setLink] = useState<string | null>(null);
  const [doneKind, setDoneKind] = useState<"new" | "refresh">("new");
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const packBefore = useRef<string | null>(null);

  const load = useCallback(async () => {
    try {
      const next = await StickersService.state();
      setState(next);
      setStateFailed(false);
      updateUser({ gems: next.gems });
      return next;
    } catch {
      setStateFailed(true);
      return null;
    }
  }, [updateUser]);

  const loadPreview = useCallback(async () => {
    setPreviewStatus("loading");
    try {
      setPreview(await StickersService.preview());
      setPreviewStatus("ready");
    } catch {
      setPreviewStatus("failed");
    }
  }, []);

  useEffect(() => {
    void load();
    void loadPreview();
  }, [load, loadPreview]);

  // 만드는 동안 단계 글자를 돌린다
  useEffect(() => {
    if (phase !== "making") return;
    setStep(0);
    const timer = setInterval(() => setStep((current) => Math.min(current + 1, MAKING_STEPS.length - 1)), 1400);
    return () => clearInterval(timer);
  }, [phase]);

  // 봇으로 넘어간 뒤 — 몇 초마다, 그리고 앱으로 돌아올 때 다시 묻는다
  useEffect(() => {
    if (phase !== "link") return;
    const started = Date.now();
    let stopped = false;
    const check = async () => {
      if (stopped) return;
      const next = await load();
      const pack = next?.pack;
      if (pack && pack.updatedAt !== packBefore.current && !pack.outdated) {
        stopped = true;
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setPhase("done");
      }
    };
    const timer = setInterval(() => {
      if (Date.now() - started > POLL_FOR_MS) clearInterval(timer);
      else void check();
    }, POLL_MS);
    const sub = AppState.addEventListener("change", (next) => {
      if (next === "active") void check();
    });
    return () => {
      stopped = true;
      clearInterval(timer);
      sub.remove();
    };
  }, [load, phase]);

  const pack = state?.pack ?? null;
  const refreshing = Boolean(pack?.outdated);
  const cost = refreshing ? (state?.refreshPrice ?? 0) : (state?.price ?? 0);
  const gems = state?.gems ?? user?.gems ?? 0;
  const short = Math.max(0, cost - gems);
  const upToDate = Boolean(pack && !pack.outdated);
  /** 지금 무료 (어드민 가격 0) — 가격 알약 대신 "무료", 보석 안내 숨김 */
  const free = !!state && cost <= 0;

  const make = async () => {
    if (!state?.enabled || phase === "making" || short > 0) return;
    setError(null);
    packBefore.current = pack?.updatedAt ?? null;
    setDoneKind(pack ? "refresh" : "new");
    setPhase("making");
    try {
      const result = await StickersService.make();
      if (result.status === "link") {
        setLink(result.link);
        setPhase("link");
        return;
      }
      setState((current) => (current ? { ...current, busy: false, gems: result.gems, pack: result.pack } : current));
      updateUser({ gems: result.gems });
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setPhase("done");
    } catch (reason) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setError(errorKey(reason));
      setPhase("idle");
      void load();
    }
  };

  const fan = preview ? FAN.map((index) => preview.stickers[index]?.image).filter((src): src is string => Boolean(src)) : [];
  const tile = Math.floor((Math.min(width, 560) - 36 - 8 * 3) / 4);

  return (
    <View style={[s.screen, { paddingTop: insets.top + 4 }]}>
      <View style={s.header}>
        <Pressable accessibilityLabel={t("common.back")} hitSlop={10} onPress={() => router.back()} style={s.headerBtn}>
          <Ionicons name="chevron-back" size={26} color={theme.text} />
        </Pressable>
        <Text style={s.headerTitle}>{t("stickers.title")}</Text>
        <View style={s.gemChip}>
          <Ionicons name="diamond" size={14} color="#1899D6" />
          <Text style={s.gemChipText}>{fmt(gems)}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Hero fan={fan} avatar={user?.avatar} title={t("stickers.heroTitle")} body={t("stickers.heroBody")} />

        {pack ? (
          <Animated.View entering={FadeInDown.duration(280)} style={[s.status, refreshing ? s.statusOutdated : null]}>
            <View style={[s.statusIcon, { backgroundColor: refreshing ? "#FF9600" : "#58CC02" }]}>
              <Ionicons name={refreshing ? "refresh" : "checkmark"} size={22} color="#FFFFFF" />
            </View>
            <View style={s.statusText}>
              <Text style={s.statusTitle}>{t(refreshing ? "stickers.status.outdated" : "stickers.status.ready")}</Text>
              <Text style={s.statusSub}>{t("stickers.status.count", { n: pack.count })}</Text>
            </View>
            {refreshing ? (
              <Pressable hitSlop={8} onPress={() => openTelegram(pack.url)} style={s.statusLink}>
                <Text style={s.statusLinkText}>{t("stickers.cta.addCurrent")}</Text>
              </Pressable>
            ) : null}
          </Animated.View>
        ) : null}

        <View style={s.sectionHead}>
          <Text style={s.sectionTitle}>{t("stickers.previewTitle")}</Text>
          <Text style={s.sectionNote}>{t("stickers.previewNote")}</Text>
        </View>

        {previewStatus === "failed" ? (
          <View style={s.failed}>
            <Ionicons name="cloud-offline-outline" size={26} color={theme.textSecondary} />
            <Text style={s.failedText}>{t("stickers.previewFailed")}</Text>
            <Pressable onPress={() => void loadPreview()} style={s.retry}>
              <Ionicons name="refresh" size={15} color="#FFFFFF" />
              <Text style={s.retryText}>{t("stickers.retry")}</Text>
            </Pressable>
          </View>
        ) : (
          <View style={s.grid}>
            {(preview?.stickers ?? Array.from({ length: 8 }, () => null)).map((sticker, index) => (
              <StickerTile key={sticker?.id ?? `s${index}`} image={sticker?.image ?? null} index={index} size={tile} theme={theme} />
            ))}
          </View>
        )}

        <View style={s.perks}>
          {(
            [
              ["mine", "happy-outline", "#FF8A3D"],
              ["korean", "chatbubbles", PRIMARY],
              ["update", "refresh", "#1CB0F6"],
            ] as const
          ).map(([key, icon, color], index) => (
            <Animated.View entering={FadeInDown.delay(120 + index * 60).duration(300)} key={key} style={s.perk}>
              <View style={[s.perkIcon, { backgroundColor: color + "22" }]}>
                <Ionicons name={icon} size={20} color={color} />
              </View>
              <View style={s.perkText}>
                <Text style={s.perkTitle}>{t(`stickers.perks.${key}.title`)}</Text>
                <Text style={s.perkDesc}>
                  {key === "update" && state && state.refreshPrice <= 0
                    ? t("stickers.perks.update.descFree")
                    : t(`stickers.perks.${key}.desc`, { price: fmt(state?.refreshPrice ?? 0) })}
                </Text>
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      <View style={[s.bottom, { paddingBottom: Math.max(insets.bottom, 12) + 4 }]}>
        {error ? (
          <Animated.Text entering={FadeIn.duration(200)} style={s.error}>
            {t(error, { n: fmt(short) })}
          </Animated.Text>
        ) : null}
        {stateFailed && !state ? (
          <Cta color={PRIMARY} depth={PRIMARY_DARK} onPress={() => void load()}>
            <Ionicons name="refresh" size={18} color="#FFFFFF" />
            <Text style={s.ctaText}>{t("stickers.retry")}</Text>
          </Cta>
        ) : !state ? (
          <Cta disabled>
            <ActivityIndicator color={theme.textSecondary} />
          </Cta>
        ) : !state.enabled ? (
          <Cta disabled>
            <Text style={[s.ctaText, s.ctaTextOff]}>{t("stickers.cta.unavailable")}</Text>
          </Cta>
        ) : phase === "making" ? (
          <Cta color={theme.surface} depth={PRIMARY + "55"} progress>
            <ActivityIndicator color={PRIMARY} />
            <Text style={[s.ctaText, { color: PRIMARY }]}>{t(MAKING_STEPS[step] ?? MAKING_STEPS[0])}</Text>
          </Cta>
        ) : upToDate && pack ? (
          <Cta color={TG} depth={TG_DARK} onPress={() => openTelegram(pack.url)} shine>
            <Ionicons name="paper-plane" size={19} color="#FFFFFF" />
            <Text style={s.ctaText}>{t("stickers.cta.add")}</Text>
          </Cta>
        ) : short > 0 ? (
          <>
            <Cta disabled>
              <Ionicons name="diamond" size={17} color="#9A9AA6" />
              <Text style={[s.ctaText, s.ctaTextOff]}>{t("stickers.cta.need", { n: fmt(short) })}</Text>
            </Cta>
            <Text style={s.hint}>{t("stickers.cta.earnHint")}</Text>
          </>
        ) : (
          <>
            <Cta color={PRIMARY} depth={PRIMARY_DARK} onPress={() => void make()} shine>
              <Text style={s.ctaText}>{t(refreshing ? "stickers.cta.update" : "stickers.cta.make")}</Text>
              {free ? (
                <View style={[s.price, s.priceFree]}>
                  <Ionicons name="sparkles" size={13} color="#6A2C00" />
                  <Text style={[s.priceText, { color: "#6A2C00" }]}>{t("stickers.cta.freeTag")}</Text>
                </View>
              ) : (
                <View style={s.price}>
                  <Ionicons name="diamond" size={13} color="#FFFFFF" />
                  <Text style={s.priceText}>{fmt(cost)}</Text>
                </View>
              )}
            </Cta>
            <Text style={s.hint}>{free ? t("stickers.cta.freeHint") : t("stickers.cta.balance", { n: fmt(gems) })}</Text>
          </>
        )}
      </View>

      <LinkSheet
        cost={cost}
        link={link}
        onClose={() => setPhase("idle")}
        theme={theme}
        visible={phase === "link" && Boolean(link)}
        waiting={Boolean(state?.busy)}
      />
      {phase === "done" && pack ? (
        <DoneModal fan={fan} kind={doneKind} onAdd={() => openTelegram(pack.url)} onClose={() => setPhase("idle")} theme={theme} />
      ) : null}
    </View>
  );
}

/* ───────────── 위 카드: 스티커 세 장이 부채처럼 ───────────── */

function Hero({
  fan,
  avatar,
  title,
  body,
}: {
  fan: string[];
  avatar?: Partial<AvatarConfig> | null;
  title: string;
  body: string;
}) {
  const theme = useTheme();
  const s = useMemo(() => getStyles(theme), [theme]);
  return (
    <LinearGradient colors={["#7F73EE", "#9B7CF4", "#F38FC0"]} end={{ x: 1, y: 1 }} start={{ x: 0, y: 0 }} style={s.hero}>
      <View pointerEvents="none" style={s.heroGlow} />
      {[
        [0.08, 0.14, 0],
        [0.88, 0.1, 400],
        [0.92, 0.44, 900],
        [0.05, 0.42, 1300],
        [0.3, 0.05, 1700],
      ].map(([x, y, delay]) => (
        <Twinkle delay={delay} key={`${x}-${y}`} x={x} y={y} />
      ))}
      <View style={s.fan}>
        {fan.length === 3 ? (
          fan.map((src, index) => <FanCard index={index} key={index} src={src} />)
        ) : (
          <Floating style={s.fanPlaceholder}>
            <AvatarPreview avatar={avatar} showBackground={false} size={140} />
          </Floating>
        )}
        <Animated.View entering={ZoomIn.delay(400).springify().damping(10)} style={s.tgBadge}>
          <Ionicons name="paper-plane" size={16} color="#FFFFFF" />
        </Animated.View>
      </View>
      <Text style={s.heroTitle}>{title}</Text>
      <Text style={s.heroBody}>{body}</Text>
    </LinearGradient>
  );
}

function FanCard({ index, src }: { index: number; src: string }) {
  const reduce = useReducedMotion();
  const enter = useSharedValue(0);
  const bob = useSharedValue(0);
  useEffect(() => {
    enter.value = withDelay(index * 80, withSpring(1, { damping: 11, stiffness: 140 }));
    if (!reduce)
      bob.value = withDelay(
        600 + index * 500,
        withRepeat(withSequence(withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.sin) }), withTiming(0, { duration: 1600, easing: Easing.inOut(Easing.sin) })), -1),
      );
  }, [bob, enter, index, reduce]);
  const center = index === 1;
  const size = center ? 150 : 132;
  const style = useAnimatedStyle(() => ({
    opacity: Math.min(1, enter.value * 1.4),
    transform: [
      { translateX: (index - 1) * 88 * enter.value },
      { translateY: 30 * (1 - enter.value) - 6 * bob.value },
      { rotate: `${(index - 1) * 11 * enter.value}deg` },
      { scale: 0.5 + 0.5 * enter.value },
    ],
  }));
  return (
    <Animated.View style={[{ position: "absolute", left: "50%", marginLeft: -size / 2, top: center ? 0 : 10, width: size, height: size, zIndex: center ? 1 : 0 }, style]}>
      <Image contentFit="contain" source={{ uri: src }} style={{ width: size, height: size }} />
    </Animated.View>
  );
}

function Floating({ children, style }: { children: ReactNode; style: object }) {
  const bob = useSharedValue(0);
  useEffect(() => {
    bob.value = withRepeat(withSequence(withTiming(1, { duration: 1600 }), withTiming(0, { duration: 1600 })), -1);
  }, [bob]);
  const animated = useAnimatedStyle(() => ({ transform: [{ translateY: -6 * bob.value }] }));
  return <Animated.View style={[style, animated]}>{children}</Animated.View>;
}

function Twinkle({ x, y, delay }: { x: number; y: number; delay: number }) {
  const v = useSharedValue(0);
  useEffect(() => {
    v.value = withDelay(delay, withRepeat(withSequence(withTiming(1, { duration: 1300 }), withTiming(0, { duration: 1300 })), -1));
  }, [delay, v]);
  const style = useAnimatedStyle(() => ({ opacity: 0.9 * v.value, transform: [{ scale: 0.3 + 0.7 * v.value }, { rotate: `${45 * v.value}deg` }] }));
  return (
    <Animated.View pointerEvents="none" style={[{ position: "absolute", left: `${x * 100}%`, top: `${y * 100}%` }, style]}>
      <Ionicons name="sparkles" size={13} color="#FFFFFF" />
    </Animated.View>
  );
}

/* ───────────── 8장 미리보기 타일 ───────────── */

function StickerTile({ image, index, size, theme }: { image: string | null; index: number; size: number; theme: ThemeColors }) {
  const s = useMemo(() => getStyles(theme), [theme]);
  const poke = useSharedValue(0);
  const shimmer = useSharedValue(0);
  useEffect(() => {
    if (image) return;
    shimmer.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
  }, [image, shimmer]);
  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + 0.18 * poke.value }, { rotate: `${-8 * poke.value}deg` }],
  }));
  const skeleton = useAnimatedStyle(() => ({ opacity: 0.35 + 0.4 * shimmer.value }));
  return (
    <Animated.View entering={ZoomIn.delay(index * 50).springify().damping(12)}>
      <Pressable
        disabled={!image}
        onPress={() => {
          void Haptics.selectionAsync();
          poke.value = withSequence(withTiming(1, { duration: 140 }), withSpring(0, { damping: 6, stiffness: 220 }));
        }}
        style={({ pressed }) => [s.tile, { width: size, height: size }, pressed ? s.tilePressed : null]}
      >
        {image ? (
          <Animated.View style={[{ flex: 1 }, imageStyle]}>
            <Image contentFit="contain" source={{ uri: image }} style={{ flex: 1 }} transition={180} />
          </Animated.View>
        ) : (
          <Animated.View style={[s.tileSkeleton, skeleton]} />
        )}
      </Pressable>
    </Animated.View>
  );
}

/* ───────────── 아래 3D 버튼 (값 알약·진행 막대·광택) ───────────── */

function Cta({
  children,
  color,
  depth,
  disabled,
  onPress,
  shine,
  progress,
}: {
  children: ReactNode;
  color?: string;
  depth?: string;
  disabled?: boolean;
  onPress?: () => void;
  shine?: boolean;
  progress?: boolean;
}) {
  const theme = useTheme();
  const s = useMemo(() => getStyles(theme), [theme]);
  const sweep = useSharedValue(0);
  const fill = useSharedValue(0);
  const [w, setW] = useState(0);
  useEffect(() => {
    if (shine) sweep.value = withRepeat(withSequence(withTiming(1, { duration: 1700, easing: Easing.inOut(Easing.quad) }), withTiming(1, { duration: 1100 })), -1);
    if (progress) fill.value = withTiming(0.92, { duration: 5500, easing: Easing.bezier(0.1, 0.6, 0.3, 1) });
  }, [fill, progress, shine, sweep]);
  const shineStyle = useAnimatedStyle(() => ({ transform: [{ translateX: -80 + (w + 160) * sweep.value }, { skewX: "-20deg" }] }));
  const fillStyle = useAnimatedStyle(() => ({ width: w * fill.value }));
  const off = disabled || !onPress;
  const face = off && !progress ? theme.border : (color ?? PRIMARY);
  const edge = off && !progress ? "#C9C9D2" : (depth ?? PRIMARY_DARK);
  return (
    <Pressable
      disabled={off}
      onLayout={(e) => setW(e.nativeEvent.layout.width)}
      onPress={() => {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.();
      }}
      style={s.ctaWrap}
    >
      {({ pressed }) => (
        <>
          <View style={[s.ctaDepth, { backgroundColor: edge }]} />
          <View style={[s.ctaFace, { backgroundColor: face }, pressed && !off ? s.ctaPressed : null]}>
            {progress ? <Animated.View style={[s.ctaFill, fillStyle]} /> : null}
            {shine && !off ? <Animated.View pointerEvents="none" style={[s.ctaShine, shineStyle]} /> : null}
            <View style={s.ctaRow}>{children}</View>
          </View>
        </>
      )}
    </Pressable>
  );
}

/* ───────────── 봇을 시작해야 할 때 ───────────── */

function LinkSheet({
  cost,
  link,
  onClose,
  theme,
  visible,
  waiting,
}: {
  cost: number;
  link: string | null;
  onClose: () => void;
  theme: ThemeColors;
  visible: boolean;
  waiting: boolean;
}) {
  const { t } = useTranslation();
  const s = useMemo(() => getStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    if (!visible) setOpened(false);
  }, [visible]);
  return (
    <Modal animationType="fade" onRequestClose={onClose} statusBarTranslucent transparent visible={visible}>
      <View style={s.sheetRoot}>
        <Pressable onPress={onClose} style={StyleSheet.absoluteFill} />
        <Animated.View entering={SlideInDown.duration(320).easing(Easing.out(Easing.cubic))} style={[s.sheet, { paddingBottom: Math.max(insets.bottom, 14) + 4 }]}>
          <View style={s.grabber} />
          <Animated.View entering={ZoomIn.delay(120).springify().damping(10)} style={s.sheetIcon}>
            <Ionicons name="paper-plane" size={30} color="#FFFFFF" />
          </Animated.View>
          <Text style={s.sheetTitle}>{t("stickers.link.title")}</Text>
          <Text style={s.sheetBody}>{t("stickers.link.body")}</Text>
          <View style={s.steps}>
            {(["step1", "step2", "step3"] as const).map((key, index) => {
              const done = opened && index === 0;
              return (
                <View key={key} style={s.stepRow}>
                  <View style={[s.stepNum, done ? s.stepNumDone : null]}>
                    {done ? <Ionicons name="checkmark" size={15} color="#FFFFFF" /> : <Text style={s.stepNumText}>{index + 1}</Text>}
                  </View>
                  <Text style={s.stepText}>{t(`stickers.link.${key}`)}</Text>
                </View>
              );
            })}
          </View>
          {cost > 0 ? <Text style={s.charge}>{t("stickers.link.charge", { n: fmt(cost) })}</Text> : null}
          {opened ? (
            <View style={s.waiting}>
              <ActivityIndicator color={TG_DARK} size="small" />
              <Text style={s.waitingText}>{t(waiting ? "stickers.making.draw" : "stickers.link.waiting")}</Text>
            </View>
          ) : null}
          <Cta
            color={TG}
            depth={TG_DARK}
            onPress={() => {
              if (!link) return;
              setOpened(true);
              openTelegram(link);
            }}
            shine
          >
            <Ionicons name="paper-plane" size={19} color="#FFFFFF" />
            <Text style={s.ctaText}>{t("stickers.link.open")}</Text>
          </Cta>
          <Pressable hitSlop={6} onPress={onClose} style={s.later}>
            <Text style={s.laterText}>{t("stickers.link.close")}</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

/* ───────────── 완성 ───────────── */

function DoneModal({ fan, kind, onAdd, onClose, theme }: { fan: string[]; kind: "new" | "refresh"; onAdd: () => void; onClose: () => void; theme: ThemeColors }) {
  const { t } = useTranslation();
  const s = useMemo(() => getStyles(theme), [theme]);
  return (
    <Modal animationType="fade" onRequestClose={onClose} statusBarTranslucent transparent visible>
      <View style={s.center}>
        <Pressable onPress={onClose} style={StyleSheet.absoluteFill} />
        <Animated.View entering={ZoomIn.duration(320).springify().damping(13)} style={s.done}>
          <View pointerEvents="none" style={s.burst}>
            {Array.from({ length: 12 }, (_, i) => (
              <BurstRay angle={i * 30} index={i} key={i} />
            ))}
          </View>
          <View style={s.doneFan}>
            {fan.map((src, index) => (
              <FanCard index={index} key={index} src={src} />
            ))}
          </View>
          <Text style={s.sheetTitle}>{t(kind === "new" ? "stickers.done.title" : "stickers.done.updated")}</Text>
          <Text style={[s.sheetBody, { marginBottom: 16 }]}>{t("stickers.done.body")}</Text>
          <Cta color={TG} depth={TG_DARK} onPress={onAdd} shine>
            <Ionicons name="paper-plane" size={19} color="#FFFFFF" />
            <Text style={s.ctaText}>{t("stickers.cta.add")}</Text>
          </Cta>
          <Pressable hitSlop={6} onPress={onClose} style={s.later}>
            <Text style={s.laterText}>{t("stickers.done.later")}</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

function BurstRay({ angle, index }: { angle: number; index: number }) {
  const v = useSharedValue(0);
  useEffect(() => {
    v.value = withDelay(index * 18, withTiming(1, { duration: 900, easing: Easing.out(Easing.cubic) }));
  }, [v, index]);
  const style = useAnimatedStyle(() => ({
    opacity: 1 - v.value,
    transform: [{ rotate: `${angle}deg` }, { translateY: -40 - 90 * v.value }, { scaleY: 0.4 + 0.8 * v.value }],
  }));
  return <Animated.View style={[{ position: "absolute", left: -3, top: -12, width: 6, height: 24, borderRadius: 3, backgroundColor: "#FFC83D" }, style]} />;
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: theme.bg },
    header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingBottom: 6 },
    headerBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
    headerTitle: { color: theme.text, fontSize: 19, fontWeight: "900" },
    gemChip: { flexDirection: "row", alignItems: "center", gap: 4, height: 32, paddingLeft: 9, paddingRight: 11, borderRadius: 999, backgroundColor: "#1CB0F622" },
    gemChipText: { color: "#1899D6", fontSize: 14, fontWeight: "900" },
    scroll: { paddingTop: 4, paddingBottom: 24 },

    hero: { marginHorizontal: 18, marginBottom: 16, borderRadius: 26, borderBottomWidth: 4, borderBottomColor: "#5E52D6", paddingHorizontal: 18, paddingTop: 14, paddingBottom: 18, alignItems: "center", overflow: "hidden" },
    heroGlow: { position: "absolute", top: -90, alignSelf: "center", width: 320, height: 260, borderRadius: 160, backgroundColor: "rgba(255,255,255,0.22)" },
    fan: { width: "100%", maxWidth: 300, height: 150, marginBottom: 6 },
    fanPlaceholder: { position: "absolute", left: "50%", marginLeft: -70, top: 4, width: 140, height: 146 },
    tgBadge: { position: "absolute", bottom: 4, left: "50%", marginLeft: 68, width: 36, height: 36, borderRadius: 18, borderWidth: 3, borderColor: "#FFFFFF", backgroundColor: TG, alignItems: "center", justifyContent: "center", zIndex: 2 },
    heroTitle: { color: "#FFFFFF", fontSize: 21, fontWeight: "900", textAlign: "center", lineHeight: 26, marginTop: 4, marginBottom: 6 },
    heroBody: { color: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: "700", lineHeight: 19, textAlign: "center", maxWidth: 300 },

    status: { flexDirection: "row", alignItems: "center", gap: 12, marginHorizontal: 18, marginBottom: 18, padding: 12, paddingHorizontal: 14, borderRadius: 18, borderWidth: 2, borderColor: "#58CC0266", backgroundColor: "#58CC021A" },
    statusOutdated: { borderColor: "#FF960077", backgroundColor: "#FF96001A" },
    statusIcon: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center" },
    statusText: { flex: 1, minWidth: 0, gap: 2 },
    statusTitle: { color: theme.text, fontSize: 14.5, fontWeight: "900", lineHeight: 19 },
    statusSub: { color: theme.textSecondary, fontSize: 12.5, fontWeight: "700" },
    statusLink: { maxWidth: 100, paddingVertical: 4 },
    statusLinkText: { color: TG_DARK, fontSize: 12.5, fontWeight: "900", textAlign: "right" },

    sectionHead: { flexDirection: "row", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 4, marginHorizontal: 20, marginBottom: 10 },
    sectionTitle: { color: theme.text, fontSize: 17, fontWeight: "900" },
    sectionNote: { color: theme.textSecondary, fontSize: 12.5, fontWeight: "700" },
    grid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginHorizontal: 18, marginBottom: 22 },
    tile: { borderRadius: 18, borderWidth: 2, borderBottomWidth: 4, borderColor: theme.border, backgroundColor: theme.surface, padding: 4, overflow: "hidden" },
    tilePressed: { borderBottomWidth: 2, transform: [{ translateY: 2 }] },
    tileSkeleton: { flex: 1, borderRadius: 14, backgroundColor: theme.border },
    failed: { alignItems: "center", gap: 8, marginHorizontal: 18, marginBottom: 22, padding: 18, borderRadius: 18, borderWidth: 2, borderStyle: "dashed", borderColor: theme.border },
    failedText: { color: theme.textSecondary, fontSize: 14, fontWeight: "800" },
    retry: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: PRIMARY, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8 },
    retryText: { color: "#FFFFFF", fontSize: 13, fontWeight: "900" },

    perks: { gap: 10, marginHorizontal: 18 },
    perk: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12, paddingHorizontal: 14, borderRadius: 18, borderWidth: 2, borderColor: theme.border, backgroundColor: theme.surface },
    perkIcon: { width: 42, height: 42, borderRadius: 14, alignItems: "center", justifyContent: "center" },
    perkText: { flex: 1, minWidth: 0, gap: 2 },
    perkTitle: { color: theme.text, fontSize: 14.5, fontWeight: "900" },
    perkDesc: { color: theme.textSecondary, fontSize: 12.5, fontWeight: "700", lineHeight: 17 },

    bottom: { borderTopWidth: 1, borderTopColor: theme.border, backgroundColor: theme.bg, paddingHorizontal: 18, paddingTop: 12 },
    error: { color: "#EA2B2B", fontSize: 13, fontWeight: "800", textAlign: "center", marginBottom: 8 },
    hint: { color: theme.textSecondary, fontSize: 12.5, fontWeight: "700", textAlign: "center", marginTop: 8 },
    ctaWrap: { paddingBottom: 4, alignSelf: "stretch" },
    ctaDepth: { position: "absolute", left: 0, right: 0, top: 4, bottom: 0, borderRadius: 16 },
    ctaFace: { height: 56, borderRadius: 16, alignItems: "center", justifyContent: "center", overflow: "hidden" },
    ctaPressed: { transform: [{ translateY: 3 }] },
    ctaFill: { position: "absolute", left: 0, top: 0, bottom: 0, backgroundColor: PRIMARY + "33" },
    ctaShine: { position: "absolute", top: 0, bottom: 0, left: 0, width: 60, backgroundColor: "rgba(255,255,255,0.28)" },
    ctaRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 12 },
    ctaText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
    ctaTextOff: { color: "#9A9AA6" },
    price: { flexDirection: "row", alignItems: "center", gap: 3, marginLeft: 4, paddingLeft: 8, paddingRight: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.22)" },
    priceText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
    priceFree: { backgroundColor: "#FFD43B" },

    sheetRoot: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(14,10,40,0.55)" },
    sheet: { backgroundColor: theme.surface, borderTopLeftRadius: 26, borderTopRightRadius: 26, paddingHorizontal: 20, paddingTop: 10, alignItems: "center" },
    grabber: { width: 40, height: 5, borderRadius: 3, backgroundColor: theme.border, marginBottom: 14 },
    sheetIcon: { width: 64, height: 64, borderRadius: 22, backgroundColor: TG, borderBottomWidth: 4, borderBottomColor: TG_DARK, alignItems: "center", justifyContent: "center", marginBottom: 10 },
    sheetTitle: { color: theme.text, fontSize: 20, fontWeight: "900", textAlign: "center", marginBottom: 6 },
    sheetBody: { color: theme.textSecondary, fontSize: 14, fontWeight: "700", lineHeight: 20, textAlign: "center", marginBottom: 14 },
    steps: { alignSelf: "stretch", gap: 8, marginBottom: 12 },
    stepRow: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: theme.bg, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10 },
    stepNum: { width: 26, height: 26, borderRadius: 13, backgroundColor: TG + "22", alignItems: "center", justifyContent: "center" },
    stepNumDone: { backgroundColor: "#58CC02" },
    stepNumText: { color: TG_DARK, fontSize: 13, fontWeight: "900" },
    stepText: { color: theme.text, fontSize: 14, fontWeight: "800", flex: 1 },
    charge: { color: theme.textSecondary, fontSize: 12.5, fontWeight: "700", textAlign: "center", marginBottom: 12 },
    waiting: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12, paddingHorizontal: 8 },
    waitingText: { color: TG_DARK, fontSize: 13.5, fontWeight: "800", flexShrink: 1, textAlign: "center" },
    later: { paddingVertical: 12, alignSelf: "stretch", alignItems: "center", marginTop: 2 },
    laterText: { color: theme.textSecondary, fontSize: 14, fontWeight: "900" },

    center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 18, backgroundColor: "rgba(14,10,40,0.55)" },
    done: { width: "100%", maxWidth: 360, backgroundColor: theme.surface, borderRadius: 28, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 8, alignItems: "center", overflow: "hidden" },
    burst: { position: "absolute", top: 98, left: "50%", width: 0, height: 0 },
    doneFan: { width: "100%", height: 170, marginBottom: 8 },
  });
