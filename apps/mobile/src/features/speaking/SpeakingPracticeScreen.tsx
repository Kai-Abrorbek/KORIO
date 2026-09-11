import { useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";
import {
  AccessibilityInfo, ActivityIndicator, Animated, Modal, Pressable,
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
import TopicIllustration from "./TopicIllustration";

type Practice = ReturnType<typeof useSpeakingPractice>;
type Icon = ComponentProps<typeof Ionicons>["name"];

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

function VoiceActivity({ active, color }: { active: boolean; color: string }) {
  const pulse = useRef(new Animated.Value(0.65)).current;
  useEffect(() => {
    let live = true;
    let animation: Animated.CompositeAnimation | undefined;
    void AccessibilityInfo.isReduceMotionEnabled().then((reduced) => {
      if (!live || reduced || !active) return;
      animation = Animated.loop(Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 550, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.45, duration: 550, useNativeDriver: true }),
      ]));
      animation.start();
    });
    return () => { live = false; animation?.stop(); };
  }, [active, pulse]);
  return (
    <View style={styles.wave} importantForAccessibility="no-hide-descendants" aria-hidden>
      {[8, 15, 23, 12, 28, 19, 34, 19, 28, 12, 23, 15, 8].map((height, i) => (
        <Animated.View key={i} style={{ width: 3, height, borderRadius: 3, marginHorizontal: 2,
          backgroundColor: color, opacity: active ? pulse : 0.3, transform: [{ scaleY: active ? pulse : 0.6 }] }} />
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
  const showResult = !!result && !busy;
  const progress = completed ? 1 : queue.length ? index / queue.length : 0;
  const title = recording ? c.recording : processing ? c.processing : showResult
    ? result.passed ? c.goodTitle : c.againTitle : practice.isSpeaking ? c.listenTitle : c.readyTitle;
  const detail = recording ? c.recordingBody : processing ? c.processingBody : showResult
    ? c.feedbackBody : practice.isSpeaking ? c.listenBody : c.readyBody;
  const tint = recording ? "#C65662" : showResult ? result.passed ? p.success : p.warm : p.primary;

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
            <TopicIllustration code={data?.pack?.code || "greetings"} size={150} />
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
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
            <View style={styles.sceneStrip}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.eyebrow, { color: p.primary }]}>{c.eyebrow}</Text>
                <Text style={[styles.sceneContext, { color: p.muted }]} numberOfLines={3}>{current.context || data?.pack?.description || c.round}</Text>
              </View>
              <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants"><TopicIllustration code={data?.pack?.code || current.pack.code} size={78} /></View>
            </View>

            <View style={[styles.phraseCard, { backgroundColor: p.surface, borderColor: p.border }]}>
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
                ) : (
                  <Text style={[styles.korean, { color: p.ink }]}>
                    {current.korean.split(/\s+/).map((word, i, words) => {
                      const assessed = showResult ? result.words.find((item) => normalizeSpeakingWord(item.word) === normalizeSpeakingWord(word)) : undefined;
                      const tone = assessed ? wordToneOf(assessed) : null;
                      const color = tone === "good" ? p.success : tone === "warn" ? p.warm : tone === "bad" ? "#C65662" : p.ink;
                      return <Text key={`${i}-${word}`} onPress={showResult ? () => practice.listen(false, word) : undefined}
                        accessibilityRole={showResult ? "button" : undefined}
                        accessibilityLabel={assessed ? `${word}, ${Math.round(assessed.accuracy)}, ${tone === "good" ? c.good : tone === "warn" ? c.improve : c.needsPractice}` : undefined}
                        style={{ color, textDecorationLine: showResult && assessed ? "underline" : "none", textDecorationStyle: "dotted" }}>
                        {word}{i < words.length - 1 ? " " : ""}
                      </Text>;
                    })}
                  </Text>
                )}
              </View>

              <View style={[styles.meaningArea, { borderTopColor: p.border }]}>
                <Text style={[styles.eyebrow, { color: p.muted }]}>{practice.hidden && !showResult ? c.prompt : c.translation}</Text>
                <Text style={[styles.meaning, { color: p.ink }]}>{current.meaning}</Text>
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

            {practice.error && <View accessibilityRole="alert" style={[styles.notice, { backgroundColor: p.warmSoft }]}>
              <Ionicons name="information-circle-outline" size={20} color={p.warm} /><Text style={[styles.noticeText, { color: p.warm }]}>{c[practice.error]}</Text>
            </View>}
            {practice.saveNotice && <View accessibilityLiveRegion="polite" style={[styles.notice, { backgroundColor: p.successSoft }]}>
              <Ionicons name="bookmark" size={18} color={p.success} /><Text style={[styles.noticeText, { color: p.success }]}>{c.savedNotice}</Text>
            </View>}

            {showResult && <View style={[styles.metrics, { borderColor: p.border, backgroundColor: p.surface }]}>
              {([['accuracy', c.accuracy], ['fluency', c.fluency], ['completeness', c.completeness]] as const).map(([key, label]) => (
                <View key={key} style={styles.metric}>
                  <Text style={[styles.metricNumber, { color: p.ink }]}>{Math.round(result.scores[key])}</Text>
                  <Text style={[styles.statLabel, { color: p.muted }]}>{label}</Text>
                  <View style={[styles.metricTrack, { backgroundColor: p.border }]}><View style={{ width: `${Math.max(0, Math.min(100, result.scores[key]))}%`, height: 3, backgroundColor: p.primary, borderRadius: 3 }} /></View>
                </View>
              ))}
            </View>}
            {showResult && !!result.transcript && <View style={styles.transcript}>
              <Text style={[styles.eyebrow, { color: p.muted }]}>{c.heard}</Text>
              <Text style={[styles.transcriptText, { color: p.muted }]}>{result.transcript}</Text>
            </View>}
            {!showResult && !!current.usageNote && <View style={styles.usageNote}>
              <Ionicons name="bulb-outline" size={16} color={p.warm} /><Text style={[styles.usageText, { color: p.muted }]}>{current.usageNote}</Text>
            </View>}
          </ScrollView>

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
                <View style={[styles.micRing, { borderColor: recording ? "#C6566240" : p.primarySoft }]}>
                  <Pressable accessibilityRole="button" accessibilityLabel={recording ? c.micStop : c.micStart}
                    accessibilityState={{ disabled: processing, busy: processing }} disabled={processing} onPress={() => void practice.record()}
                    style={({ pressed }) => [styles.mic, { backgroundColor: recording ? "#BE4E5D" : p.primary, transform: [{ scale: pressed ? 0.94 : 1 }] }]}>
                    {processing ? <ActivityIndicator color={p.bg} size="large" /> : <Ionicons name={recording ? "stop" : "mic"} size={34} color={p.bg} />}
                  </Pressable>
                </View>
                <Text style={[styles.micLabel, { color: p.ink }]}>{recording ? c.micStop : showResult ? c.repeat : c.micStart}</Text>
              </View>
              <View style={styles.sideControl}>
                <RoundButton icon="arrow-forward" label={index === queue.length - 1 ? c.finish : result ? c.next : c.skip}
                  onPress={practice.next} color={p.muted} background={p.surface} disabled={busy || practice.saving} />
                <Text style={[styles.controlLabel, { color: p.muted }]}>{result ? index === queue.length - 1 ? c.finish : c.next : c.skip}</Text>
              </View>
            </View>
            {recording ? <VoiceActivity active color="#C65662" /> : <Text style={[styles.privacyNote, { color: p.muted }]}>{c.microphoneNote}</Text>}
          </View>
        </>
      ) : null}
    </View>
  );
}

function SpeakingPracticeScreen() {
  const { pack } = useLocalSearchParams<{ pack?: string | string[] }>();
  const packCode = typeof pack === "string" ? pack : "";
  const practice = useSpeakingPractice(packCode);
  const router = useRouter();
  const navigation = useNavigation();
  const c = useSpeakingCopy();
  const p = useSpeakingPalette();
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
    <Modal visible={exitAsking} transparent animationType="fade" onRequestClose={() => setExitAsking(false)}>
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalCard, { backgroundColor: p.surface }]} accessibilityViewIsModal>
          <Text style={[styles.stateTitle, { color: p.ink }]}>{c.leaveTitle}</Text>
          <Text style={[styles.description, { color: p.muted }]}>{c.leaveBody}</Text>
          <Pressable accessibilityRole="button" onPress={() => setExitAsking(false)} style={[styles.primaryButton, { backgroundColor: p.primary }]}>
            <Text style={[styles.primaryText, { color: p.bg }]}>{c.stay}</Text>
          </Pressable>
          <Pressable accessibilityRole="button" style={styles.textButton} onPress={leaveNow}><Text style={[styles.secondaryText, { color: p.muted }]}>{c.leave}</Text></Pressable>
        </View>
      </View>
    </Modal>
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
  body: { flexGrow: 1, width: "100%", maxWidth: 680, alignSelf: "center", paddingHorizontal: 22, paddingBottom: 20 },
  sceneStrip: { flexDirection: "row", alignItems: "center", gap: 16, paddingVertical: 17, minHeight: 105 },
  sceneContext: { fontSize: 12, lineHeight: 19, marginTop: 5, maxWidth: 440 },
  phraseCard: { borderRadius: 28, borderWidth: 1, padding: 20, boxShadow: "0 8px 24px rgba(41,36,61,0.035)" },
  cardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  statusChip: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 11, paddingVertical: 7, borderRadius: 24, flexShrink: 1 },
  statusChipText: { fontSize: 11, lineHeight: 16, fontWeight: "700", flexShrink: 1 },
  sentenceArea: { minHeight: 155, justifyContent: "center", paddingVertical: 27, paddingHorizontal: 2 },
  korean: { fontSize: 32, lineHeight: 49, fontWeight: "700", letterSpacing: -0.8, textAlign: "center" },
  meaningArea: { borderTopWidth: 1, paddingTop: 19, alignItems: "center", gap: 10 },
  meaning: { fontSize: 17, lineHeight: 27, textAlign: "center", fontWeight: "500" },
  phraseTools: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 6, marginTop: 22 },
  smallButton: { minHeight: 44, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 12, paddingVertical: 9, gap: 7, borderRadius: 16 },
  smallButtonText: { fontSize: 11, fontWeight: "600", flexShrink: 1 },
  hiddenPhrase: { width: "100%", alignItems: "center", gap: 12 },
  hiddenLine: { height: 27, borderRadius: 7 },
  hiddenCaption: { fontSize: 12, lineHeight: 19, marginTop: 5, textAlign: "center" },
  usageNote: { flexDirection: "row", gap: 8, marginTop: 16, paddingHorizontal: 5 },
  usageText: { flex: 1, fontSize: 12, lineHeight: 19 },
  notice: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 16, gap: 10, marginTop: 12 },
  noticeText: { flex: 1, fontSize: 12, lineHeight: 19 },
  metrics: { flexDirection: "row", borderWidth: 1, paddingVertical: 16, borderRadius: 21, marginTop: 14 },
  metric: { flex: 1, alignItems: "center", gap: 5, paddingHorizontal: 10 },
  metricNumber: { fontSize: 22, fontWeight: "700", fontVariant: ["tabular-nums"] },
  statLabel: { fontSize: 10, lineHeight: 16, textAlign: "center" },
  metricTrack: { height: 3, width: "75%", borderRadius: 3, marginTop: 5 },
  transcript: { marginTop: 16, paddingHorizontal: 6, gap: 5 },
  transcriptText: { fontSize: 13, lineHeight: 21 },
  dock: { width: "100%", maxWidth: 680, alignSelf: "center", paddingHorizontal: 20, paddingTop: 17, borderTopWidth: 1 },
  status: { alignItems: "center", gap: 7 },
  stateTitle: { fontSize: 16, fontWeight: "700", lineHeight: 24, textAlign: "center" },
  statusDetail: { fontSize: 11, lineHeight: 17, textAlign: "center", maxWidth: 330 },
  controls: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 18, paddingTop: 15 },
  sideControl: { flex: 1, maxWidth: 105, alignItems: "center", gap: 7 },
  controlLabel: { fontSize: 10, lineHeight: 15, fontWeight: "600", textAlign: "center" },
  micWrap: { alignItems: "center", gap: 7, flex: 1.5, maxWidth: 165 },
  micRing: { width: 96, height: 96, borderRadius: 48, borderWidth: 5, padding: 5 },
  mic: { flex: 1, borderRadius: 40, alignItems: "center", justifyContent: "center" },
  micLabel: { fontSize: 11, fontWeight: "700", lineHeight: 17, textAlign: "center" },
  privacyNote: { fontSize: 9, lineHeight: 15, textAlign: "center", marginTop: 12 },
  wave: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 27, marginTop: 4 },
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
  modalBackdrop: { flex: 1, backgroundColor: "rgba(23,18,36,0.55)", justifyContent: "center", padding: 26 },
  modalCard: { width: "100%", maxWidth: 400, alignSelf: "center", padding: 25, borderRadius: 26, gap: 16 },
});
