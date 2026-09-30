/**
 * 스토어에 새 버전이 나왔을 때 띄우는 업데이트 안내. 루트 레이아웃에 한 번만 건다.
 *
 *  선택 업데이트 — 설치 버전 < 스토어 최신. "나중에" 로 닫을 수 있고,
 *                  닫으면 그 버전은 하루 동안 다시 안 띄운다.
 *  필수 업데이트 — 설치 버전 < 최소 지원 버전. 닫는 버튼도, 뒤로가기도 없다.
 *                  서버와 호환이 깨진 옛 앱이 이상하게 동작하는 것보다 낫다.
 *
 * 기준 값은 서버 app-releases.data.ts 의 STORE 가 정한다. 여기서는 판단하지 않는다.
 * 확인은 앱을 켤 때 + 백그라운드에서 6시간 넘게 있다가 돌아올 때.
 * 실패하면 조용히 넘어간다 — 버전 확인 때문에 앱을 막으면 안 된다.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AppState,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import PrimaryButton from "@/components/ui/PrimaryButton";
import {
  appReleaseService,
  installedVersion,
  openStore,
  type AppReleaseItem,
  type AppVersionInfo,
} from "@/services/app-release.service";

const SNOOZE_KEY = "korio-update-snooze";
const SNOOZE_MS = 24 * 60 * 60 * 1000;
const RECHECK_MS = 6 * 60 * 60 * 1000;

type Snooze = { version: string; until: number };

async function readSnooze(): Promise<Snooze | null> {
  try {
    const raw = await AsyncStorage.getItem(SNOOZE_KEY);
    return raw ? (JSON.parse(raw) as Snooze) : null;
  } catch {
    return null;
  }
}

export default function AppUpdateGate() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [info, setInfo] = useState<AppVersionInfo | null>(null);
  const [highlights, setHighlights] = useState<AppReleaseItem[]>([]);
  const lastCheck = useRef(0);

  const check = useCallback(async () => {
    // 스토어 링크가 플레이 스토어뿐이다. iOS 는 앱스토어 붙일 때 같이
    if (Platform.OS !== "android") return;
    lastCheck.current = Date.now();
    try {
      const next = await appReleaseService.version();
      if (!next.updateAvailable && !next.forceUpdate) {
        setInfo(null);
        return;
      }
      if (!next.forceUpdate) {
        const snooze = await readSnooze();
        if (snooze?.version === next.latestVersion && snooze.until > Date.now()) return;
      }
      // 그 버전에 뭐가 들어갔는지 두세 줄 — 없으면 문구만 보여준다
      try {
        const lang = (i18n.language ?? "uz").slice(0, 2);
        const { releases } = await appReleaseService.releases(lang);
        const release = releases.find((r) => r.storeVersion === next.latestVersion);
        setHighlights((release?.items ?? []).slice(0, 3));
      } catch {
        setHighlights([]);
      }
      setInfo(next);
    } catch {
      // 네트워크·서버 문제면 다음 기회에
    }
  }, [i18n.language]);

  useEffect(() => {
    void check();
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active" && Date.now() - lastCheck.current > RECHECK_MS) void check();
    });
    return () => sub.remove();
  }, [check]);

  // 새 버전 아이콘이 살짝 떠 있는 느낌
  const bob = useSharedValue(0);
  useEffect(() => {
    if (!info) return;
    bob.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 900, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 900, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      true,
    );
  }, [info, bob]);
  const bobStyle = useAnimatedStyle(() => ({ transform: [{ translateY: bob.value }] }));

  if (!info) return null;
  const force = info.forceUpdate;

  const later = async () => {
    try {
      await AsyncStorage.setItem(
        SNOOZE_KEY,
        JSON.stringify({ version: info.latestVersion, until: Date.now() + SNOOZE_MS }),
      );
    } catch {
      // 저장 못 해도 이번엔 닫는다
    }
    setInfo(null);
  };

  const s = styles;
  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="none"
      // 필수 업데이트면 안드로이드 뒤로가기로도 못 닫는다
      onRequestClose={force ? () => undefined : () => void later()}
    >
      <Animated.View entering={FadeIn.duration(180)} style={s.backdrop}>
        {force ? null : <Pressable style={StyleSheet.absoluteFill} onPress={() => void later()} />}
        <Animated.View
          entering={SlideInDown.springify().damping(18).stiffness(160)}
          style={[
            s.sheet,
            { backgroundColor: theme.surface, paddingBottom: insets.bottom + 18 },
          ]}
        >
          <Animated.View style={[s.iconWrap, { backgroundColor: theme.primary }, bobStyle]}>
            <Ionicons name={force ? "construct" : "rocket"} size={34} color="#fff" />
          </Animated.View>

          <View style={[s.versionPill, { backgroundColor: theme.primary + "1F" }]}>
            <Text style={[s.versionPillText, { color: theme.primary }]}>
              v{installedVersion} → v{info.latestVersion}
            </Text>
          </View>

          <Text style={[s.title, { color: theme.text }]}>
            {force ? t("update.force.title") : t("update.prompt.title")}
          </Text>
          <Text style={[s.body, { color: theme.textSecondary }]}>
            {force ? t("update.force.body") : t("update.prompt.body")}
          </Text>

          {highlights.length > 0 ? (
            <View style={[s.highlights, { borderColor: theme.border }]}>
              {highlights.map((item, i) => (
                <View key={i} style={[s.hlRow, i > 0 && { marginTop: 8 }]}>
                  <Ionicons name="sparkles" size={14} color={theme.primary} style={{ marginTop: 3 }} />
                  <Text style={[s.hlText, { color: theme.text }]}>{item.text}</Text>
                </View>
              ))}
            </View>
          ) : null}

          <PrimaryButton
            label={t("update.prompt.cta")}
            color={theme.primary}
            darkColor="#5B52C4"
            onPress={() => void openStore(info.storeUrl)}
            style={s.cta}
          />
          {force ? null : (
            <Pressable onPress={() => void later()} hitSlop={8} style={s.laterBtn}>
              <Text style={[s.later, { color: theme.textSecondary }]}>
                {t("update.prompt.later")}
              </Text>
            </Pressable>
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(20,16,40,0.55)",
  },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 30,
    alignItems: "center",
  },
  iconWrap: {
    width: 76,
    height: 76,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 5,
    borderBottomColor: "rgba(0,0,0,0.18)",
    marginBottom: 14,
  },
  versionPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 99,
    marginBottom: 12,
  },
  versionPillText: { fontSize: 13, fontWeight: "800" },
  title: { fontSize: 22, fontWeight: "900", textAlign: "center" },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 8,
  },
  highlights: {
    alignSelf: "stretch",
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginTop: 18,
  },
  hlRow: { flexDirection: "row", gap: 8 },
  hlText: { flex: 1, fontSize: 14, lineHeight: 20, fontWeight: "600" },
  cta: { alignSelf: "stretch", marginTop: 22 },
  laterBtn: { paddingVertical: 14 },
  later: { fontSize: 15, fontWeight: "700" },
});
