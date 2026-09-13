import { useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";
import {
  AccessibilityInfo, ActivityIndicator, Animated, Linking, Modal, Pressable,
  ScrollView, StyleSheet, Text, View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withPremiumScreen } from "@/features/subscription/usePremiumScreen";
import { useAuthStore } from "@/store/auth.store";
import { wordToneOf } from "@/services/stt.service";
import { useSpeakingCopy, formatSpeaking } from "./copy";
import { useSpeakingPalette } from "./palette";
import { normalizeSpeakingWord } from "./session";
import { useSpeakingPractice } from "./useSpeakingPractice";
import SpokenText from "@/features/expressions/components/SpokenText";
import TopicIllustration from "./TopicIllustration";

type Practice = ReturnType<typeof useSpeakingPractice>;
type Icon = ComponentProps<typeof Ionicons>["name"];

/** 녹음 중임을 한눈에 알리는 색. 보라 계열과 절대 안 헷갈리게 */
const REC = "#E8505B";

/** #rrggbb 에 알파를 붙인다 — 중첩 Text 에서는 opacity 보다 색 알파가 안전하다 */
function dim(hex: string, alpha: string) {
  return hex.length === 7 ? `${hex}${alpha}` : hex;
}

/** 녹음 중 마이크에서 퍼져나가는 링 */
function MicPulse({ active, color }: { active: boolean; color: string }) {
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!active) {
      pulse.setValue(0);
      return;
    }
    const loop = Animated.loop(Animated.timing(pulse, { toValue: 1, duration: 1500, useNativeDriver: true }));
    loop.start();
    return () => loop.stop();
  }, [active, pulse]);
  if (!active) return null;
  return (
    <Animated.View pointerEvents="none" style={[styles.micPulse, {
      borderColor: color,
      opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0] }),
      transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.6] }) }],
    }]} />
  );
}

/** 통과했을 때 카드를 초록으로 덮는 연출. 다음 문장으로 넘어가기 직전 1.6초 */
function PassBurst({ visible, color, label }: { visible: boolean; color: string; label: string }) {
  const pop = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!visible) {
      pop.setValue(0);
      return;
    }
    const animation = Animated.spring(pop, { toValue: 1, useNativeDriver: true, damping: 12, stiffness: 220, mass: 0.7 });
    animation.start();
    return () => animation.stop();
  }, [visible, pop]);
  if (!visible) return null;
  return (
    <Animated.View pointerEvents="none" style={[styles.passBurst, {
      backgroundColor: dim(color, "F2"),
      opacity: pop,
      transform: [{ scale: pop.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }) }],
    }]}>
      <Animated.View style={[styles.passCheck, {
        transform: [{ scale: pop.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) }],
      }]}>
        <Ionicons name="checkmark" size={52} color={color} />
      </Animated.View>
      <Text style={styles.passLabel}>{label}</Text>
    </Animated.View>
  );
}

/** 발음이 통과했을 때 카드 위에 걸치는 체크 */
function SuccessPill({ color, edge }: { color: string; edge: string }) {
  const pop = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    pop.setValue(0);
    const animation = Animated.spring(pop, { toValue: 1, useNativeDriver: true, damping: 11, stiffness: 260, mass: 0.7 });
    animation.start();
    return () => animation.stop();
  }, [pop]);
  return (
    <View style={styles.successSlot} pointerEvents="none">
      <Animated.View style={[styles.successPill, {
        backgroundColor: color,
        borderColor: edge,
        opacity: pop,
        transform: [{ scale: pop.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1] }) }],
      }]}>
        <Ionicons name="checkmark" size={22} color="#FFFFFF" />
      </Animated.View>
    </View>
  );
}

function RoundButton({ icon, label, onPress, color, background, disabled = false, selected = false }: {
  icon: Icon; label: string; onPress: () => void; color: string; background: string; disabled?: boolean; selected?: boolean;
}) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label}
      accessibilityState={{ disabled, selected }} disabled={disabled} onPress={onPress}
      style={({ pressed }) => [styles.roundButton, { backgroundColor: background, opacity: disabled ? 0.4 : pressed ? 0.65 : 1 }]}>
      <Ionicons name={icon} size={22} color={color} />
    </Pressable>
  );
}

/**
 * 실제 마이크 입력 세기로 움직이는 파형.
 *
 * 예전에는 정해진 루프를 돌렸다 — 마이크가 죽어 있어도 똑같이 흔들려서
 * 소리가 들어오는지 화면만 봐서는 알 수 없었다. 이제 들어온 버퍼의 RMS 를
 * 그대로 받는다. 말하는데 안 움직이면 녹음이 안 되고 있다는 뜻이다.
 */
function VoiceActivity({ active, color, level }: { active: boolean; color: string; level: number }) {
  const amp = useRef(new Animated.Value(0.22)).current;
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    let live = true;
    void AccessibilityInfo.isReduceMotionEnabled().then((value) => {
      if (live) setReduced(value);
    });
    return () => { live = false; };
  }, []);

  useEffect(() => {
    const target = active ? Math.max(0.22, Math.min(1, level)) : 0.22;
    if (reduced) {
      amp.setValue(active ? 0.6 : 0.22);
      return;
    }
    const animation = Animated.timing(amp, { toValue: target, duration: 90, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [active, level, reduced, amp]);

  return (
    <View style={styles.wave} importantForAccessibility="no-hide-descendants" aria-hidden>
      {[8, 15, 23, 12, 28, 19, 34, 19, 28, 12, 23, 15, 8].map((height, i) => (
        <Animated.View key={i} style={{ width: 3, height, borderRadius: 3, marginHorizontal: 2,
          backgroundColor: color, opacity: active ? 0.9 : 0.3, transform: [{ scaleY: amp }] }} />
      ))}
    </View>
  );
}

/** Presentation is separate from recording, so layout can be checked without a microphone. */
export function SpeakingPracticeView({ practice, onClose, onTopics }: {
  practice: Practice; onClose: () => void; onTopics: () => void;
}) {
  const c = useSpeakingCopy();
  const p = useSpeakingPalette();
  const insets = useSafeAreaInsets();
  const { current, result, phase, data, queue, index, completed } = practice;
  const busy = phase !== "idle";
  const recording = phase === "recording";
  const processing = phase === "assessing" || phase === "starting";
  // 마이크는 채점 중에만 잠근다. "starting" 에서 잠그면 start() 가 한 번
  // 어긋났을 때 버튼이 영영 죽은 채로 남는다 — 눌러도 아무 일이 없는 그 증상.
  const micLocked = phase === "assessing";
  const showResult = !!result && !busy;
  const progress = completed ? 1 : queue.length ? index / queue.length : 0;
  // 에러는 다른 무엇보다 먼저 보여야 한다. 아무 반응이 없는 것처럼 느끼는
  // 순간의 대부분은 실패했는데 그 사실이 화면 아래 어딘가에만 있을 때다.
  const failure = practice.error;
  const title = failure ? c.againTitle : recording ? c.recording : processing ? c.processing : showResult
    ? result.passed ? c.goodTitle : c.againTitle : practice.isSpeaking ? c.listenTitle : c.readyTitle;
  const detail = failure ? c[failure] : recording ? c.recordingBody : processing ? c.processingBody : showResult
    ? c.feedbackBody : practice.isSpeaking ? c.listenBody : c.readyBody;
  const tint = failure ? p.warm : recording ? REC : showResult ? result.passed ? p.success : p.warm : p.primary;
  // 카드는 남는 높이를 다 쓰고, 문장이 길면 글자가 줄어든다 — 스크롤은 없다
  const phraseLength = current?.korean.length ?? 0;
  const koreanSize = phraseLength > 44 ? 20 : phraseLength > 32 ? 23 : phraseLength > 20 ? 26 : 30;

  return (
    <View style={[styles.screen, { backgroundColor: p.bg }]}>
      <View style={[styles.headerWrap, { paddingTop: insets.top + 12 }]}>
        <View style={styles.header}>
          <RoundButton icon="close" label={c.leave} onPress={onClose} color={p.ink} background={p.surface} />
          <View style={styles.headerTitle}>
            <Text style={[styles.eyebrow, { color: p.muted }]}>{c.practice}</Text>
            <Text style={[styles.topicTitle, { color: p.ink }]} numberOfLines={1}>{data?.pack?.title || c.eyebrow}</Text>
          </View>
          <View style={[styles.counter, { backgroundColor: p.primarySoft }]}>
            <Text style={[styles.counterText, { color: p.primary }]}>{formatSpeaking(c.sessionCount, {
              current: Math.min(index + 1, queue.length), total: queue.length,
            })}</Text>
          </View>
        </View>
        <View style={[styles.progressTrack, { backgroundColor: p.border }]} accessibilityRole="progressbar"
          accessibilityLabel={c.practice} accessibilityValue={{ min: 0, max: queue.length, now: completed ? queue.length : index }}>
          <View style={{ height: 4, width: `${progress * 100}%`, borderRadius: 4, backgroundColor: p.primary }} />
        </View>
      </View>

      {practice.loading ? (
        <View style={styles.empty}>
          <ActivityIndicator size="large" color={p.primary} accessibilityLabel={c.practice} />
          <Text style={[styles.description, { color: p.muted }]}>{c.round}</Text>
        </View>
      ) : practice.loadFailed || (!current && !completed) ? (
        <View style={styles.empty}>
          <View style={[styles.emptyIcon, { backgroundColor: p.primarySoft }]}><Ionicons name="chatbubble-ellipses-outline" color={p.primary} size={34} /></View>
          <Text style={[styles.stateTitle, { color: p.ink }]}>{practice.loadFailed ? c.errorTitle : c.emptyTitle}</Text>
          <Text style={[styles.description, { color: p.muted }]}>{practice.loadFailed ? c.loadError : c.emptyPractice}</Text>
          {practice.loadFailed && <Pressable accessibilityRole="button" onPress={practice.reload} style={[styles.primaryButton, { backgroundColor: p.primary }]}>
            <Text style={[styles.primaryText, { color: p.bg }]}>{c.retry}</Text>
          </Pressable>}
          <Pressable accessibilityRole="button" onPress={onTopics} style={styles.textButton}><Text style={[styles.secondaryText, { color: p.primary }]}>{c.topics}</Text></Pressable>
        </View>
      ) : completed ? (
        <ScrollView contentContainerStyle={[styles.summary, { paddingBottom: insets.bottom + 28 }]}>
          <View style={[styles.summaryArt, { backgroundColor: p.primarySoft }]}>
            <TopicIllustration code={data?.pack?.code || "greetings"} size={126} />
            <View style={[styles.summaryCheck, { backgroundColor: p.success }]}><Ionicons name="checkmark" size={26} color="#FFFFFF" /></View>
          </View>
          <Text style={[styles.eyebrow, { color: p.primary }]}>{c.eyebrow}</Text>
          <Text style={[styles.summaryTitle, { color: p.ink }]}>{c.completeTitle}</Text>
          <Text style={[styles.summaryBody, { color: p.muted }]}>{practice.summary.spoken ? c.completeBody : c.noAttempts}</Text>
          <View style={[styles.summaryStats, { backgroundColor: p.surface, borderColor: p.border }]}>
            <View style={styles.summaryStat}>
              <Text style={[styles.summaryNumber, { color: p.ink }]}>{practice.summary.spoken}</Text>
              <Text style={[styles.statLabel, { color: p.muted }]}>{c.completed}</Text>
            </View>
            <View style={{ width: 1, backgroundColor: p.border }} />
            <View style={styles.summaryStat}>
              <Text style={[styles.summaryNumber, { color: p.primary }]}>{practice.summary.average ?? "—"}</Text>
              <Text style={[styles.statLabel, { color: p.muted }]}>{c.average}</Text>
            </View>
          </View>
          {!!practice.summary.retryIds.length && <Pressable accessibilityRole="button" onPress={() => practice.restart(true)} style={[styles.primaryButton, { backgroundColor: p.primary }]}>
            <Ionicons name="refresh" size={19} color={p.bg} /><Text style={[styles.primaryText, { color: p.bg }]}>{c.review}</Text>
          </Pressable>}
          <Pressable accessibilityRole="button" onPress={onTopics} style={[styles.primaryButton, { backgroundColor: practice.summary.retryIds.length ? p.surface : p.primary, borderWidth: 1, borderColor: p.border }]}>
            <Text style={[styles.primaryText, { color: practice.summary.retryIds.length ? p.ink : p.bg }]}>{c.topics}</Text><Ionicons name="arrow-forward" size={19} color={practice.summary.retryIds.length ? p.ink : p.bg} />
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => practice.restart()} style={styles.textButton}><Text style={[styles.secondaryText, { color: p.muted }]}>{c.restart}</Text></Pressable>
        </ScrollView>
      ) : current ? (
        <>
          <View style={styles.body}>
            <View style={[styles.phraseCard, { backgroundColor: p.surface, borderColor: p.border }]}>
              {showResult && result.passed ? <SuccessPill color={p.success} edge={p.bg} /> : null}
              <PassBurst visible={practice.passFlash} color={p.success} label={c.goodTitle} />
              <View style={styles.cardTop}>
                <View style={[styles.statusChip, { backgroundColor: showResult ? result.passed ? p.successSoft : p.warmSoft : p.primarySoft }]}>
                  <Ionicons name={showResult ? result.passed ? "checkmark-circle" : "sparkles-outline" : "volume-medium-outline"} size={16} color={tint} />
                  <Text style={[styles.statusChipText, { color: tint }]}>{showResult ? `${c.score} ${Math.round(result.scores.pron)}` : c.practice}</Text>
                </View>
                {practice.saving ? <View style={styles.roundButton}><ActivityIndicator color={p.primary} /></View> :
                  <RoundButton icon={current.progress.isSaved ? "bookmark" : "bookmark-outline"} label={current.progress.isSaved ? c.saved : c.bookmark}
                    selected={current.progress.isSaved} onPress={() => void practice.toggleSaved()} color={p.primary} background={p.bg} disabled={busy} />}
              </View>

              <View style={styles.sentenceArea}>
                {practice.hidden && !showResult ? (
                  <Pressable accessibilityRole="button" accessibilityLabel={c.show} onPress={practice.toggleHidden} style={styles.hiddenPhrase}>
                    <View style={[styles.hiddenLine, { width: "86%", backgroundColor: p.primarySoft }]} />
                    <View style={[styles.hiddenLine, { width: "58%", backgroundColor: p.primarySoft }]} />
                    <Text style={[styles.hiddenCaption, { color: p.muted }]}>{c.hidden}</Text>
                  </Pressable>
                ) : showResult ? (
                  <Text style={[styles.korean, { fontSize: koreanSize, lineHeight: Math.round(koreanSize * 1.45) }]}>
                    {current.korean.split(/\s+/).map((word, i, words) => {
                      const assessed = result.words.find((item) => normalizeSpeakingWord(item.word) === normalizeSpeakingWord(word));
                      const tone = assessed ? wordToneOf(assessed) : null;
                      const color = tone === "good" ? p.success : tone === "warn" ? p.warm : tone === "bad" ? REC : p.ink;
                      return <Text key={`${i}-${word}`} onPress={() => practice.listen(false, word)}
                        accessibilityRole="button"
                        accessibilityLabel={assessed ? `${word}, ${Math.round(assessed.accuracy)}, ${tone === "good" ? c.good : tone === "warn" ? c.improve : c.needsPractice}` : undefined}
                        style={{ color, textDecorationLine: assessed ? "underline" : "none", textDecorationStyle: "dotted" }}>
                        {word}{i < words.length - 1 ? " " : ""}
                      </Text>;
                    })}
                  </Text>
                ) : (
                  // 흐리게 깔아두고, 읽어줄 때는 재생 위치를 · 말할 때는 내 목소리를
                  // 글자 단위로 따라간다. 표현 학습에서 쓰는 컴포넌트를 그대로 쓴다.
                  <SpokenText
                    text={current.korean}
                    progress={recording ? practice.voicedProgress : practice.speechProgress}
                    playing={recording || practice.isSpeechPlaying}
                    baseColor={p.ink}
                    accentColor={recording ? REC : p.primary}
                    style={[styles.korean, { fontSize: koreanSize, lineHeight: Math.round(koreanSize * 1.45) }]}
                  />
                )}
              </View>

              <View style={[styles.meaningArea, { borderTopColor: p.border }]}>
                <Text style={[styles.eyebrow, { color: p.muted }]}>{practice.hidden && !showResult ? c.prompt : c.translation}</Text>
                <Text style={[styles.meaning, { color: p.ink }]} numberOfLines={2}>{current.meaning}</Text>
              </View>
              <View style={styles.phraseTools}>
                <Pressable accessibilityRole="button" disabled={busy} accessibilityState={{ disabled: busy }} onPress={() => practice.listen(true)}
                  style={({ pressed }) => [styles.smallButton, { backgroundColor: p.bg, opacity: busy ? 0.4 : pressed ? 0.6 : 1 }]}>
                  <Ionicons name="speedometer-outline" size={16} color={p.muted} /><Text style={[styles.smallButtonText, { color: p.muted }]}>{c.listenSlow}</Text>
                </Pressable>
                <Pressable accessibilityRole="button" onPress={practice.toggleHidden} style={({ pressed }) => [styles.smallButton, { opacity: pressed ? 0.6 : 1 }]}>
                  <Ionicons name={practice.hidden ? "eye-outline" : "eye-off-outline"} size={16} color={p.muted} /><Text style={[styles.smallButtonText, { color: p.muted }]}>{practice.hidden ? c.show : c.hide}</Text>
                </Pressable>
              </View>
            </View>

            {showResult ? (
              <View style={[styles.metrics, { borderColor: p.border, backgroundColor: p.surface }]}>
                {([['accuracy', c.accuracy], ['fluency', c.fluency], ['completeness', c.completeness]] as const).map(([key, label]) => (
                  <View key={key} style={styles.metric}>
                    <Text style={[styles.metricNumber, { color: p.ink }]}>{Math.round(result.scores[key])}</Text>
                    <Text style={[styles.statLabel, { color: p.muted }]} numberOfLines={1}>{label}</Text>
                    <View style={[styles.metricTrack, { backgroundColor: p.border }]}><View style={{ width: `${Math.max(0, Math.min(100, result.scores[key]))}%`, height: 3, backgroundColor: p.primary, borderRadius: 3 }} /></View>
                  </View>
                ))}
              </View>
            ) : current.usageNote ? (
              <View style={[styles.usageNote, { backgroundColor: p.warmSoft }]}>
                <Ionicons name="bulb-outline" size={16} color={p.warm} />
                <Text style={[styles.usageText, { color: p.muted }]} numberOfLines={2}>{current.usageNote}</Text>
              </View>
            ) : null}

            {showResult && !!result.transcript ? (
              <Text style={[styles.transcriptText, { color: p.muted }]} numberOfLines={1}>{c.heard} · {result.transcript}</Text>
            ) : null}

            {practice.error ? (
              <View accessibilityRole="alert" style={[styles.notice, { backgroundColor: p.warmSoft }]}>
                <Ionicons name="information-circle-outline" size={18} color={p.warm} />
                <Text style={[styles.noticeText, { color: p.warm }]} numberOfLines={2}>{c[practice.error]}</Text>
                {practice.error === "permission" ? (
                  <Pressable accessibilityRole="button" onPress={() => void Linking.openSettings()}
                    style={({ pressed }) => [styles.noticeAction, { backgroundColor: p.warm, opacity: pressed ? 0.7 : 1 }]}>
                    <Text style={[styles.noticeActionText, { color: p.bg }]}>{c.openSettings}</Text>
                  </Pressable>
                ) : null}
              </View>
            ) : practice.saveNotice ? (
              <View accessibilityLiveRegion="polite" style={[styles.notice, { backgroundColor: p.successSoft }]}>
                <Ionicons name="bookmark" size={16} color={p.success} />
                <Text style={[styles.noticeText, { color: p.success }]} numberOfLines={1}>{c.savedNotice}</Text>
              </View>
            ) : null}
          </View>

          <View style={[styles.dock, { paddingBottom: Math.max(insets.bottom, 12) + 10, backgroundColor: p.bg, borderTopColor: p.border }]}>
            <View accessibilityLiveRegion="polite" style={styles.status}>
              <Text style={[styles.stateTitle, { color: tint }]}>{title}</Text>
              <Text style={[styles.statusDetail, { color: p.muted }]}>{detail}</Text>
            </View>
            <View style={styles.controls}>
              <View style={styles.sideControl}>
                <RoundButton icon={practice.isSpeaking ? "pause" : "headset-outline"} label={practice.isSpeaking ? c.stopAudio : c.listen}
                  onPress={() => practice.listen()} color={p.primary} background={p.primarySoft} disabled={busy} />
                <Text style={[styles.controlLabel, { color: p.muted }]}>{c.listen}</Text>
              </View>
              <View style={styles.micWrap}>
                <View style={[styles.micRing, { borderColor: recording ? "#E8505B2E" : processing ? p.border : p.primarySoft }]}>
                  <MicPulse active={recording} color={REC} />
                  <Pressable accessibilityRole="button" accessibilityLabel={recording ? c.micStop : c.micStart}
                    accessibilityState={{ disabled: micLocked, busy: processing }} disabled={micLocked} onPress={() => void practice.record()}
                    style={({ pressed }) => [styles.mic, { backgroundColor: recording ? REC : processing ? p.muted : p.primary, transform: [{ scale: pressed ? 0.94 : 1 }] }]}>
                    {processing ? <ActivityIndicator color="#FFFFFF" size="large" /> : <Ionicons name={recording ? "stop" : "mic"} size={34} color={recording ? "#FFFFFF" : p.bg} />}
                  </Pressable>
                </View>
                <Text style={[styles.micLabel, { color: recording ? REC : p.ink }]}>{recording ? c.micStop : showResult ? c.repeat : c.micStart}</Text>
              </View>
              <View style={styles.sideControl}>
                <RoundButton icon="arrow-forward" label={index === queue.length - 1 ? c.finish : result ? c.next : c.skip}
                  onPress={practice.next} color={p.muted} background={p.surface} disabled={busy || practice.saving} />
                <Text style={[styles.controlLabel, { color: p.muted }]}>{result ? index === queue.length - 1 ? c.finish : c.next : c.skip}</Text>
              </View>
            </View>
            {recording ? <VoiceActivity active color={REC} level={practice.level} /> : <Text style={[styles.privacyNote, { color: p.muted }]}>{c.microphoneNote}</Text>}
            {__DEV__ ? (
              <Text selectable style={[styles.devLine, { color: "#FFFFFF", backgroundColor: "#3A3450" }]}>
                {`${practice.debug.step} | ${phase} | buf ${practice.debug.buffers} | rms ${practice.debug.rms} | ${practice.error ?? "no-error"}`}
              </Text>
            ) : null}
          </View>
        </>
      ) : null}
    </View>
  );
}

/** 나가기 확인 — 연습을 끊는 순간이라 무겁지 않게, 대신 확실하게 보이도록 */
function LeaveDialog({ visible, onStay, onLeave }: { visible: boolean; onStay: () => void; onLeave: () => void }) {
  const c = useSpeakingCopy();
  const p = useSpeakingPalette();
  const enter = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;
    enter.setValue(0);
    const animation = Animated.spring(enter, { toValue: 1, useNativeDriver: true, damping: 15, stiffness: 210, mass: 0.8 });
    animation.start();
    return () => animation.stop();
  }, [visible, enter]);

  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType="fade" onRequestClose={onStay}>
      <Pressable style={styles.modalBackdrop} accessibilityRole="button" accessibilityLabel={c.stay} onPress={onStay}>
        <Animated.View accessibilityViewIsModal onStartShouldSetResponder={() => true}
          style={[styles.modalCard, { backgroundColor: p.surface, opacity: enter, transform: [
            { scale: enter.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) },
            { translateY: enter.interpolate({ inputRange: [0, 1], outputRange: [26, 0] }) },
          ] }]}>
          <View style={[styles.modalGlow, { backgroundColor: p.primarySoft }]}>
            <Ionicons name="mic-off-outline" size={30} color={p.primary} />
            <View style={[styles.modalSpark, { backgroundColor: p.surface }]}>
              <Ionicons name="pause" size={12} color={p.warm} />
            </View>
          </View>
          <Text style={[styles.modalTitle, { color: p.ink }]}>{c.leaveTitle}</Text>
          <Text style={[styles.modalBody, { color: p.muted }]}>{c.leaveBody}</Text>
          <Pressable accessibilityRole="button" onPress={onStay}
            style={({ pressed }) => [styles.modalStay, { backgroundColor: p.primary, borderBottomWidth: pressed ? 2 : 5, transform: [{ translateY: pressed ? 3 : 0 }] }]}>
            <Ionicons name="mic" size={17} color={p.bg} />
            <Text style={[styles.modalStayText, { color: p.bg }]}>{c.stay}</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={onLeave}
            style={({ pressed }) => [styles.modalLeave, { opacity: pressed ? 0.5 : 1 }]}>
            <Text style={[styles.modalLeaveText, { color: p.muted }]}>{c.leave}</Text>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

function SpeakingPracticeScreen() {
  const { pack } = useLocalSearchParams<{ pack?: string | string[] }>();
  const packCode = typeof pack === "string" ? pack : "";
  const practice = useSpeakingPractice(packCode);
  const router = useRouter();
  const navigation = useNavigation();
  const loggedIn = useAuthStore((s) => s.isLoggedIn);

  // 연습 도중에 나가려 하면 한 번 붙잡는다.
  //
  // @react-navigation/native 의 usePreventRemove 는 여기서 쓰면 안 된다 —
  // expo-router 는 react-navigation 을 통째로 vendoring 하고 있어서
  // (expo-router/build/react-navigation/*) 호이스팅된 패키지와 NavigationContext
  // 인스턴스가 다르다. 그쪽 훅을 부르면 아무도 provide 하지 않는 컨텍스트를 읽고
  // "Couldn't find a navigation object" 로 죽는다. beforeRemove 를 직접 단다.
  // 스와이프 뒤로가기는 _layout 에서 gestureEnabled: false 로 이미 막혀 있으므로
  // 여기서 잡을 경로는 하드웨어 뒤로가기와 화면 안의 닫기 버튼뿐이다.
  const [exitAsking, setExitAsking] = useState(false);
  const exitActionRef = useRef<Parameters<typeof navigation.dispatch>[0] | null>(null);
  const allowExitRef = useRef(false);
  const guardRef = useRef(false);
  const stopAllRef = useRef(practice.stopAll);
  useEffect(() => {
    guardRef.current = loggedIn && !practice.completed && !!practice.current;
    stopAllRef.current = practice.stopAll;
  });
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (allowExitRef.current || !guardRef.current) return;
        e.preventDefault();
        stopAllRef.current();
        exitActionRef.current = e.data.action;
        setExitAsking(true);
      }),
    [navigation],
  );

  const close = () => { if (router.canGoBack()) router.back(); else router.replace("/speaking" as never); };
  const leaveNow = () => {
    const action = exitActionRef.current;
    exitActionRef.current = null;
    setExitAsking(false);
    allowExitRef.current = true;
    if (action) navigation.dispatch(action);
    else close();
  };
  return <>
    <SpeakingPracticeView practice={practice} onClose={close} onTopics={() => router.replace("/speaking" as never)} />
    <LeaveDialog visible={exitAsking} onStay={() => setExitAsking(false)} onLeave={leaveNow} />
  </>;
}

export default withPremiumScreen(SpeakingPracticeScreen, "expression");

const styles = StyleSheet.create({
  screen: { flex: 1 },
  headerWrap: { width: "100%", maxWidth: 680, alignSelf: "center", paddingHorizontal: 22 },
  header: { flexDirection: "row", alignItems: "center", gap: 13, paddingBottom: 18 },
  headerTitle: { flex: 1, gap: 5 },
  eyebrow: { fontSize: 10, fontWeight: "800", letterSpacing: 1.5, lineHeight: 16 },
  topicTitle: { fontSize: 16, fontWeight: "700" },
  counter: { borderRadius: 30, paddingHorizontal: 12, paddingVertical: 8 },
  counterText: { fontSize: 12, fontWeight: "800", fontVariant: ["tabular-nums"] },
  roundButton: { width: 46, height: 46, borderRadius: 23, alignItems: "center", justifyContent: "center" },
  progressTrack: { height: 4, borderRadius: 4, overflow: "hidden" },
  body: { flex: 1, width: "100%", maxWidth: 680, alignSelf: "center", paddingHorizontal: 22, paddingTop: 14, paddingBottom: 10, gap: 10 },
  phraseCard: { flex: 1, borderRadius: 28, borderWidth: 1, padding: 18, justifyContent: "space-between", boxShadow: "0 8px 24px rgba(41,36,61,0.035)" },
  cardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  statusChip: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 11, paddingVertical: 7, borderRadius: 24, flexShrink: 1 },
  statusChipText: { fontSize: 11, lineHeight: 16, fontWeight: "700", flexShrink: 1 },
  sentenceArea: { flex: 1, minHeight: 92, justifyContent: "center", paddingVertical: 12, paddingHorizontal: 2 },
  korean: { fontSize: 32, lineHeight: 49, fontWeight: "700", letterSpacing: -0.8, textAlign: "center" },
  meaningArea: { borderTopWidth: 1, paddingTop: 14, alignItems: "center", gap: 8 },
  meaning: { fontSize: 17, lineHeight: 27, textAlign: "center", fontWeight: "500" },
  phraseTools: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 6, marginTop: 12 },
  smallButton: { minHeight: 44, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 12, paddingVertical: 9, gap: 7, borderRadius: 16 },
  smallButtonText: { fontSize: 11, fontWeight: "600", flexShrink: 1 },
  hiddenPhrase: { width: "100%", alignItems: "center", gap: 12 },
  hiddenLine: { height: 27, borderRadius: 7 },
  hiddenCaption: { fontSize: 12, lineHeight: 19, marginTop: 5, textAlign: "center" },
  usageNote: { flexDirection: "row", alignItems: "center", gap: 9, padding: 12, borderRadius: 16 },
  usageText: { flex: 1, fontSize: 12, lineHeight: 19 },
  notice: { flexDirection: "row", alignItems: "center", padding: 12, borderRadius: 16, gap: 10 },
  noticeText: { flex: 1, fontSize: 12, lineHeight: 19 },
  noticeAction: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 12 },
  noticeActionText: { fontSize: 11, fontWeight: "800" },
  devLine: { fontSize: 10, lineHeight: 16, textAlign: "center", marginTop: 6, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  metrics: { flexDirection: "row", borderWidth: 1, paddingVertical: 13, borderRadius: 21 },
  metric: { flex: 1, alignItems: "center", gap: 5, paddingHorizontal: 10 },
  metricNumber: { fontSize: 22, fontWeight: "700", fontVariant: ["tabular-nums"] },
  statLabel: { fontSize: 10, lineHeight: 16, textAlign: "center" },
  metricTrack: { height: 3, width: "75%", borderRadius: 3, marginTop: 5 },
  transcriptText: { fontSize: 12, lineHeight: 19, textAlign: "center", paddingHorizontal: 6 },
  dock: { width: "100%", maxWidth: 680, alignSelf: "center", paddingHorizontal: 20, paddingTop: 13, borderTopWidth: 1 },
  status: { alignItems: "center", gap: 7 },
  stateTitle: { fontSize: 16, fontWeight: "700", lineHeight: 24, textAlign: "center" },
  statusDetail: { fontSize: 11, lineHeight: 17, textAlign: "center", maxWidth: 330 },
  controls: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 18, paddingTop: 12 },
  sideControl: { flex: 1, maxWidth: 105, alignItems: "center", gap: 7 },
  controlLabel: { fontSize: 10, lineHeight: 15, fontWeight: "600", textAlign: "center" },
  micWrap: { alignItems: "center", gap: 7, flex: 1.5, maxWidth: 165 },
  micRing: { width: 90, height: 90, borderRadius: 45, borderWidth: 5, padding: 5 },
  micPulse: { position: "absolute", top: -7, left: -7, right: -7, bottom: -7, borderRadius: 56, borderWidth: 3 },
  successSlot: { position: "absolute", top: -18, left: 0, right: 0, alignItems: "center", zIndex: 2 },
  successPill: { width: 66, height: 37, borderRadius: 19, alignItems: "center", justifyContent: "center", borderWidth: 4 },
  passBurst: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 28, alignItems: "center", justifyContent: "center", gap: 16, zIndex: 5 },
  passCheck: { width: 92, height: 92, borderRadius: 46, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" },
  passLabel: { fontSize: 20, fontWeight: "800", color: "#FFFFFF", letterSpacing: -0.4, textAlign: "center", paddingHorizontal: 20 },
  mic: { flex: 1, borderRadius: 40, alignItems: "center", justifyContent: "center" },
  micLabel: { fontSize: 11, fontWeight: "700", lineHeight: 17, textAlign: "center" },
  privacyNote: { fontSize: 9, lineHeight: 15, textAlign: "center", marginTop: 8 },
  wave: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 24, marginTop: 6 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, gap: 16 },
  emptyIcon: { width: 80, height: 80, borderRadius: 28, alignItems: "center", justifyContent: "center" },
  description: { fontSize: 14, lineHeight: 22, textAlign: "center" },
  primaryButton: { minHeight: 54, width: "100%", borderRadius: 18, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, paddingHorizontal: 20, paddingVertical: 14 },
  primaryText: { fontSize: 14, fontWeight: "700", textAlign: "center", flexShrink: 1, lineHeight: 21 },
  textButton: { minHeight: 46, justifyContent: "center", alignItems: "center", padding: 12 },
  secondaryText: { fontSize: 13, fontWeight: "600", textAlign: "center" },
  summary: { flexGrow: 1, alignItems: "center", justifyContent: "center", width: "100%", maxWidth: 580, alignSelf: "center", paddingHorizontal: 28, paddingTop: 30, gap: 15 },
  summaryArt: { width: 172, height: 172, alignItems: "center", justifyContent: "center", borderRadius: 65, marginBottom: 14, transform: [{ rotate: "-5deg" }] },
  summaryCheck: { position: "absolute", right: -4, bottom: 1, width: 45, height: 45, borderRadius: 23, alignItems: "center", justifyContent: "center" },
  summaryTitle: { fontSize: 29, fontWeight: "700", textAlign: "center", lineHeight: 40, letterSpacing: -0.8 },
  summaryBody: { fontSize: 14, lineHeight: 23, textAlign: "center", maxWidth: 340 },
  summaryStats: { width: "100%", flexDirection: "row", borderRadius: 24, borderWidth: 1, paddingVertical: 22, marginVertical: 14 },
  summaryStat: { flex: 1, alignItems: "center", gap: 7, paddingHorizontal: 8 },
  summaryNumber: { fontSize: 32, fontWeight: "700" },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(16,12,27,0.66)", justifyContent: "center", padding: 26 },
  modalCard: { width: "100%", maxWidth: 372, alignSelf: "center", paddingHorizontal: 24, paddingTop: 26, paddingBottom: 16, borderRadius: 32, alignItems: "center", gap: 11, boxShadow: "0 24px 54px rgba(10,6,22,0.4)" },
  modalGlow: { width: 68, height: 68, borderRadius: 26, alignItems: "center", justifyContent: "center", marginBottom: 3 },
  modalSpark: { position: "absolute", right: -5, bottom: -3, width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  modalTitle: { fontSize: 19, fontWeight: "800", lineHeight: 27, textAlign: "center", letterSpacing: -0.4 },
  modalBody: { fontSize: 13, lineHeight: 21, textAlign: "center", maxWidth: 288 },
  modalStay: { width: "100%", minHeight: 54, borderRadius: 18, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 7, borderBottomColor: "rgba(0,0,0,0.24)" },
  modalStayText: { fontSize: 15, fontWeight: "800" },
  modalLeave: { minHeight: 46, alignItems: "center", justifyContent: "center", paddingHorizontal: 18 },
  modalLeaveText: { fontSize: 13, fontWeight: "700" },
});
