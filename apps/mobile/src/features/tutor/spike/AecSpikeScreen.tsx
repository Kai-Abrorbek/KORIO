import { useCallback, useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { judge, type AecVerdict } from "./aec-metrics";
import { runAecSpike, type Progress } from "./aec-runner";

/**
 * AEC 스파이크 화면.
 *
 * ⚠️ **출시용이 아니다.** Gemini Live 를 직접 WebSocket 으로 붙일지(Option A)
 *    LiveKit 을 끼울지(B) 를 정하는 데만 쓴다. 결정이 끝나면 통째로 지운다.
 *
 * 왜 이걸 먼저 하나: Option A 는 WebRTC 가 공짜로 해주던 **에코 제거를 직접
 * 받아와야 한다.** 안 되면 튜터가 스피커로 나온 자기 목소리를 마이크로 다시
 * 듣고 자기 말을 끊는다. 일주일 짜고 마지막 날에 그걸 만나느니 오늘 30분에
 * 알아내는 게 낫다.
 *
 * ── 어떻게 돌리나 ──
 *   1) 이어폰 빼고 **스피커** 로 (수화기로 재면 소리가 작아 무조건 통과한다)
 *   2) 조용한 방에서, 볼륨은 평소 통화만큼
 *   3) 시작 → 4초 아무 말 → 나머지는 말하지 말고 기다린다
 *   4) 볼륨 최대로 한 번 더. 최대에서도 통과해야 진짜 통과다
 */
const VERDICT_COLOR: Record<AecVerdict["verdict"], string> = {
  PASS: "#1CB454",
  MARGINAL: "#FAB219",
  FAIL: "#FF4B4B",
  AEC_NOT_APPLIED: "#FF4B4B",
};

export default function AecSpikeScreen() {
  const insets = useSafeAreaInsets();
  const [progress, setProgress] = useState<Progress>({
    phase: "idle",
    message: "준비됨",
  });
  const [result, setResult] = useState<AecVerdict | null>(null);
  const [meta, setMeta] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(async () => {
    setResult(null);
    setError(null);
    try {
      const r = await runAecSpike(setProgress);
      setResult(judge(r.on, r.off));
      setMeta(
        `${r.platform} · 시험 신호 ${r.voiceSec.toFixed(1)}초 · ` +
          `프레임 ${r.on.playbackFrames.length}`,
      );
      setProgress({ phase: "done", message: "끝" });
    } catch (e) {
      // 코드를 숨기면 왜 안 되는지 알 수가 없다
      setError(e instanceof Error ? e.message : String(e));
      setProgress({ phase: "error", message: "실패" });
    }
  }, []);

  const busy = !["idle", "done", "error"].includes(progress.phase);

  return (
    <ScrollView
      style={s.root}
      contentContainerStyle={{
        padding: 20,
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 32,
      }}
    >
      <Text style={s.title}>AEC 스파이크</Text>
      <Text style={s.sub}>
        스피커로 나온 소리가 마이크에 <Text style={s.bold}>말로 인식될 만큼</Text>{" "}
        남는지 잰다. 남으면 튜터가 자기 말을 끊는다.
      </Text>

      <View style={s.steps}>
        {[
          "이어폰 빼고 스피커로",
          "조용한 방, 평소 통화 볼륨",
          "4초 동안 아무 말이나 → 그 뒤엔 조용히",
          "통과하면 볼륨 최대로 한 번 더",
        ].map((t, i) => (
          <Text key={i} style={s.step}>
            {i + 1}. {t}
          </Text>
        ))}
      </View>

      <Pressable
        style={[s.btn, busy && s.btnOff]}
        onPress={start}
        disabled={busy}
      >
        <Text style={s.btnText}>{busy ? progress.message : "측정 시작"}</Text>
      </Pressable>

      {busy && <Text style={s.progress}>{progress.message}</Text>}

      {error && (
        <View style={[s.card, { borderColor: "#FF4B4B" }]}>
          <Text style={s.cardTitle}>실패</Text>
          <Text style={s.mono}>{error}</Text>
          {error === "MIC_PERMISSION_DENIED" && (
            <Text style={s.note}>설정에서 마이크 권한을 켜야 한다.</Text>
          )}
        </View>
      )}

      {result && (
        <View style={[s.card, { borderColor: VERDICT_COLOR[result.verdict] }]}>
          <View style={s.verdictRow}>
            <Ionicons
              name={
                result.verdict === "PASS"
                  ? "checkmark-circle"
                  : result.verdict === "MARGINAL"
                    ? "alert-circle"
                    : "close-circle"
              }
              size={22}
              color={VERDICT_COLOR[result.verdict]}
            />
            <Text style={[s.verdict, { color: VERDICT_COLOR[result.verdict] }]}>
              {result.verdict}
            </Text>
          </View>
          <Text style={s.reason}>{result.reason}</Text>

          <View style={s.table}>
            <Row
              k="말로 인식될 프레임"
              v={`${result.speechLikePct}%`}
              hint="이게 진짜 기준. 5% 미만이면 통과"
            />
            <Row
              k="ERLE (지운 양)"
              v={`${result.erleDb} dB`}
              hint="6dB 미만이면 AEC 가 아예 안 걸린 것"
            />
            <Row k="노이즈 플로어" v={`${result.noiseFloorDb.toFixed(1)} dBFS`} />
            <Row k="재생 중 · AEC 켬" v={`${result.echoOnDb.toFixed(1)} dBFS`} />
            <Row k="재생 중 · AEC 끔" v={`${result.echoOffDb.toFixed(1)} dBFS`} />
          </View>

          <Text style={s.meta}>{meta}</Text>
        </View>
      )}
    </ScrollView>
  );
}

function Row({ k, v, hint }: { k: string; v: string; hint?: string }) {
  return (
    <View style={s.row}>
      <View style={{ flex: 1 }}>
        <Text style={s.rowKey}>{k}</Text>
        {hint && <Text style={s.rowHint}>{hint}</Text>}
      </View>
      <Text style={s.rowVal}>{v}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#15151D" },
  title: { color: "#fff", fontSize: 22, fontWeight: "900" },
  sub: { color: "#A6A6B3", fontSize: 13, lineHeight: 20, marginTop: 6 },
  bold: { color: "#fff", fontWeight: "800" },
  steps: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#22222D",
    gap: 6,
  },
  step: { color: "#C9C9D4", fontSize: 12.5, lineHeight: 18 },
  btn: {
    marginTop: 20,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#776ee2",
    alignItems: "center",
    justifyContent: "center",
  },
  btnOff: { opacity: 0.5 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
  progress: {
    color: "#A6A6B3",
    fontSize: 13,
    textAlign: "center",
    marginTop: 12,
  },
  card: {
    marginTop: 20,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    backgroundColor: "#1C1C26",
  },
  cardTitle: { color: "#fff", fontSize: 15, fontWeight: "800" },
  verdictRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  verdict: { fontSize: 20, fontWeight: "900", letterSpacing: 0.5 },
  reason: { color: "#C9C9D4", fontSize: 13, lineHeight: 20, marginTop: 8 },
  table: { marginTop: 14, gap: 10 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowKey: { color: "#fff", fontSize: 13, fontWeight: "600" },
  rowHint: { color: "#6F6F80", fontSize: 11, marginTop: 1 },
  rowVal: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
  meta: { color: "#6F6F80", fontSize: 11, marginTop: 14 },
  mono: { color: "#FF9898", fontSize: 12, marginTop: 6 },
  note: { color: "#A6A6B3", fontSize: 12, marginTop: 8 },
});
