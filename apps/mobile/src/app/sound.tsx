import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "@/utils/haptics";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import {
  DEFAULT_SPEECH_VOICE,
  useSettingsStore,
  type SoundPrefs,
} from "@/store/settings.store";
import { useSound } from "@/hooks/useSound";
import { useSpeech } from "@/hooks/useSpeech";
import { VolumeSlider } from "@/components/settings/VolumeSlider";
import { VoicePickerModal } from "@/components/settings/VoicePickerModal";
import { TtsService, type SpeechVoice } from "@/services/tts.service";
import { useCallback, useMemo, useState } from "react";

/** 미리듣기 문장 — 학습 콘텐츠라 번역 대상이 아니다 */
const SAMPLE = "안녕하세요";

const DEFAULTS: SoundPrefs = {
  speechVolume: 1,
  sfxVolume: 1,
  keyVolume: 1,
  speechRate: 1,
  speechVoice: DEFAULT_SPEECH_VOICE,
  autoPlay: true,
  keyHaptics: true,
  rewardHaptics: true,
  startMuted: false,
};

type Styles = ReturnType<typeof getStyles>;

function IconSq({
  icon,
  color,
  bg,
  s,
}: {
  icon: string;
  color: string;
  bg: string;
  s: Styles;
}) {
  return (
    <View style={[s.iconSq, { backgroundColor: bg }]}>
      <Ionicons name={icon as any} size={20} color={color} />
    </View>
  );
}

function ToggleRow({
  icon,
  color,
  bg,
  label,
  desc,
  value,
  onValueChange,
  theme,
  s,
}: {
  icon: string;
  color: string;
  bg: string;
  label: string;
  desc?: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  theme: ThemeColors;
  s: Styles;
}) {
  return (
    <View style={s.row}>
      <IconSq icon={icon} color={color} bg={bg} s={s} />
      <View style={{ flex: 1 }}>
        <Text style={s.rowLabel}>{label}</Text>
        {desc ? <Text style={s.rowDesc}>{desc}</Text> : null}
      </View>
      <Switch
        value={value}
        onValueChange={(v) => {
          Haptics.selectionAsync();
          onValueChange(v);
        }}
        trackColor={{ false: theme.border, true: theme.primary }}
        thumbColor="#fff"
        ios_backgroundColor={theme.border}
      />
    </View>
  );
}

function SliderRow({
  icon,
  color,
  bg,
  label,
  badge,
  value,
  min,
  max,
  step,
  onChange,
  onCommit,
  theme,
  s,
}: {
  icon: string;
  color: string;
  bg: string;
  label: string;
  badge: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
  onCommit?: (v: number) => void;
  theme: ThemeColors;
  s: Styles;
}) {
  return (
    <View style={s.sliderRow}>
      <View style={s.sliderHead}>
        <IconSq icon={icon} color={color} bg={bg} s={s} />
        <Text style={[s.rowLabel, { flex: 1 }]}>{label}</Text>
        <View style={[s.badge, { backgroundColor: bg }]}>
          <Text style={[s.badgeText, { color }]}>{badge}</Text>
        </View>
      </View>
      <VolumeSlider
        value={value}
        min={min}
        max={max}
        step={step}
        color={color}
        trackColor={theme.border}
        onChange={onChange}
        onCommit={onCommit}
      />
    </View>
  );
}

export default function SoundSettings() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const { sound, setSound, muted, setMuted } = useSettingsStore();
  const { play } = useSound();
  const { speak, stop, isSpeaking } = useSpeech();
  const [voicePickerVisible, setVoicePickerVisible] = useState(false);
  const [voices, setVoices] = useState<SpeechVoice[]>([]);
  const [voicesLoading, setVoicesLoading] = useState(false);
  const [voiceLoadFailed, setVoiceLoadFailed] = useState(false);
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);

  const loadVoices = useCallback(async () => {
    setVoicesLoading(true);
    setVoiceLoadFailed(false);
    try {
      setVoices(await TtsService.getKoreanVoices());
    } catch {
      setVoiceLoadFailed(true);
    } finally {
      setVoicesLoading(false);
    }
  }, []);

  const selectedVoice = useMemo(
    () => voices.find((voice) => voice.shortName === sound.speechVoice),
    [sound.speechVoice, voices],
  );
  const selectedVoiceLabel =
    selectedVoice?.localName ??
    sound.speechVoice
      .replace(/^ko-KR-/, "")
      .replace(/Neural$/, "")
      .split(":")[0];
  const audibleSpeechVolume = sound.speechVolume > 0 ? sound.speechVolume : 1;

  const openVoicePicker = () => {
    setVoicePickerVisible(true);
    if (voices.length === 0 && !voicesLoading) void loadVoices();
  };

  const closeVoicePicker = () => {
    stop();
    setPreviewingVoice(null);
    setVoicePickerVisible(false);
  };

  const previewVoice = (voice: SpeechVoice) => {
    if (previewingVoice === voice.shortName && isSpeaking) {
      stop();
      setPreviewingVoice(null);
      return;
    }
    speak(SAMPLE, "ko-KR", {
      voice: voice.shortName,
      volume: audibleSpeechVolume,
      respectSoundSettings: false,
      onDone: () => setPreviewingVoice(null),
      onError: () => setPreviewingVoice(null),
      onStopped: () => setPreviewingVoice(null),
    });
    setPreviewingVoice(voice.shortName);
  };

  const pct = (v: number) => `${Math.round(v * 100)}%`;

  const rateLabel =
    sound.speechRate <= 0.75
      ? t("settings.sound.rateSlow")
      : sound.speechRate >= 1.05
        ? t("settings.sound.rateFast")
        : t("settings.sound.rateNormal");

  const resetAll = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setSound(DEFAULTS);
    setMuted(false);
  };

  return (
    <View style={[s.container, { paddingTop: insets.top + 4 }]}>
      <View style={s.header}>
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{t("settings.items.sound.title")}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 지금 음소거 — 이번 실행 동안만 */}
        <View style={[s.card, { marginTop: 8 }]}>
          <ToggleRow
            icon={muted ? "volume-mute" : "volume-high"}
            color="#FF7AAD"
            bg="#FFE0EC"
            label={t("settings.sound.muteNow")}
            desc={t("settings.sound.muteNowDesc")}
            value={muted}
            onValueChange={setMuted}
            theme={theme}
            s={s}
          />
        </View>

        {/* 볼륨 */}
        <Text style={s.sectionLabel}>{t("settings.sound.volumeSection")}</Text>
        <View style={[s.card, muted && s.cardMuted]}>
          <SliderRow
            icon="mic"
            color="#45B7D1"
            bg="#D5F0F5"
            label={t("settings.sound.speech")}
            badge={pct(sound.speechVolume)}
            value={sound.speechVolume}
            onChange={(v) => setSound({ speechVolume: v })}
            onCommit={(v) =>
              v > 0 &&
              speak(SAMPLE, "ko-KR", {
                volume: v,
                respectSoundSettings: false,
              })
            }
            theme={theme}
            s={s}
          />
          <View style={s.rowDivider} />
          <SliderRow
            icon="musical-notes"
            color="#1DBB7F"
            bg="#D7F5E5"
            label={t("settings.sound.sfx")}
            badge={pct(sound.sfxVolume)}
            value={sound.sfxVolume}
            onChange={(v) => setSound({ sfxVolume: v })}
            onCommit={(v) =>
              v > 0 && play("combo", { volume: v, respectSoundSettings: false })
            }
            theme={theme}
            s={s}
          />
          <View style={s.rowDivider} />
          <SliderRow
            icon="keypad"
            color="#F4B860"
            bg="#FFF4D6"
            label={t("settings.sound.key")}
            badge={pct(sound.keyVolume)}
            value={sound.keyVolume}
            onChange={(v) => setSound({ keyVolume: v })}
            onCommit={(v) =>
              v > 0 && play("click", { volume: v, respectSoundSettings: false })
            }
            theme={theme}
            s={s}
          />
        </View>
        {muted ? (
          <Text style={s.mutedHint}>{t("settings.sound.mutedHint")}</Text>
        ) : null}

        {/* 음성 */}
        <Text style={s.sectionLabel}>{t("settings.sound.voiceSection")}</Text>
        <View style={s.card}>
          <Pressable
            style={({ pressed }) => [s.row, pressed && { opacity: 0.6 }]}
            onPress={openVoicePicker}
          >
            <IconSq icon="people" color="#E85D97" bg="#FFE0EC" s={s} />
            <View style={{ flex: 1 }}>
              <Text style={s.rowLabel}>{t("settings.sound.voice")}</Text>
              <Text style={s.rowDesc}>{t("settings.sound.voiceDesc")}</Text>
            </View>
            <View style={s.voiceValue}>
              <Text style={s.voiceValueText} numberOfLines={1}>
                {selectedVoiceLabel}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={theme.textSecondary}
              />
            </View>
          </Pressable>
          <View style={s.rowDivider} />
          <SliderRow
            icon="speedometer"
            color="#A78BFA"
            bg="#EBE5FA"
            label={t("settings.sound.rate")}
            badge={rateLabel}
            value={sound.speechRate}
            min={0.5}
            max={1.2}
            step={0.05}
            onChange={(v) => setSound({ speechRate: v })}
            onCommit={(v) =>
              speak(SAMPLE, "ko-KR", {
                rate: v,
                volume: audibleSpeechVolume,
                respectSoundSettings: false,
              })
            }
            theme={theme}
            s={s}
          />
          <View style={s.previewWrap}>
            <Pressable
              style={({ pressed }) => [s.preview, pressed && s.previewPressed]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                speak(SAMPLE, "ko-KR", {
                  volume: audibleSpeechVolume,
                  respectSoundSettings: false,
                });
              }}
            >
              <Ionicons name="play" size={16} color={theme.primary} />
              <Text style={s.previewText}>
                {t("settings.sound.preview")} · {SAMPLE}
              </Text>
            </Pressable>
          </View>
          <View style={s.rowDivider} />
          <ToggleRow
            icon="play-circle"
            color="#FF7043"
            bg="#FFE3D6"
            label={t("settings.sound.autoPlay")}
            desc={t("settings.sound.autoPlayDesc")}
            value={sound.autoPlay}
            onValueChange={(v) => setSound({ autoPlay: v })}
            theme={theme}
            s={s}
          />
        </View>

        {/* 진동 */}
        <Text style={s.sectionLabel}>{t("settings.sound.hapticSection")}</Text>
        <View style={s.card}>
          <ToggleRow
            icon="finger-print"
            color="#7E57C2"
            bg="#E7E0F7"
            label={t("settings.sound.keyHaptics")}
            desc={t("settings.sound.keyHapticsDesc")}
            value={sound.keyHaptics}
            onValueChange={(v) => {
              setSound({ keyHaptics: v });
              // 켜는 순간엔 어떤 느낌인지 바로 알려준다
              if (v) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            theme={theme}
            s={s}
          />
          <View style={s.rowDivider} />
          <ToggleRow
            icon="trophy"
            color="#E2A83A"
            bg="#FCEFC7"
            label={t("settings.sound.rewardHaptics")}
            desc={t("settings.sound.rewardHapticsDesc")}
            value={sound.rewardHaptics}
            onValueChange={(v) => {
              setSound({ rewardHaptics: v });
              if (v)
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success,
                );
            }}
            theme={theme}
            s={s}
          />
        </View>

        {/* 기타 */}
        <Text style={s.sectionLabel}>{t("settings.sound.otherSection")}</Text>
        <View style={s.card}>
          <ToggleRow
            icon="moon"
            color="#A8A8B0"
            bg="#ECECEE"
            label={t("settings.sound.startMuted")}
            desc={t("settings.sound.startMutedDesc")}
            value={sound.startMuted}
            onValueChange={(v) => setSound({ startMuted: v })}
            theme={theme}
            s={s}
          />
        </View>

        <TouchableOpacity
          style={s.reset}
          activeOpacity={0.6}
          onPress={resetAll}
        >
          <Ionicons name="refresh" size={17} color={theme.textSecondary} />
          <Text style={s.resetText}>{t("settings.sound.reset")}</Text>
        </TouchableOpacity>
      </ScrollView>
      <VoicePickerModal
        visible={voicePickerVisible}
        voices={voices}
        selectedVoice={sound.speechVoice}
        loading={voicesLoading}
        loadFailed={voiceLoadFailed}
        previewingVoice={previewingVoice}
        isSpeaking={isSpeaking}
        theme={theme}
        onClose={closeVoicePicker}
        onRetry={() => void loadVoices()}
        onSelect={(voice) => {
          Haptics.selectionAsync();
          setSound({ speechVoice: voice.shortName });
        }}
        onPreview={previewVoice}
      />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    headerTitle: { fontSize: 22, fontWeight: "700", color: theme.text },
    sectionLabel: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
      marginLeft: 32,
      marginBottom: 8,
      marginTop: 22,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.border,
      marginHorizontal: 20,
      overflow: "hidden",
    },
    cardMuted: { opacity: 0.45 },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    iconSq: {
      width: 38,
      height: 38,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
    },
    rowLabel: { fontSize: 16, fontWeight: "700", color: theme.text },
    rowDesc: {
      fontSize: 13,
      color: theme.textSecondary,
      marginTop: 2,
      fontWeight: "500",
    },
    voiceValue: {
      maxWidth: 110,
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
    },
    voiceValueText: {
      flexShrink: 1,
      fontSize: 13,
      fontWeight: "700",
      color: theme.primary,
    },
    rowDivider: { height: 1, backgroundColor: theme.border, marginLeft: 68 },
    sliderRow: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 6 },
    sliderHead: { flexDirection: "row", alignItems: "center", gap: 14 },
    badge: {
      minWidth: 52,
      paddingHorizontal: 9,
      paddingVertical: 4,
      borderRadius: 9,
      alignItems: "center",
    },
    badgeText: { fontSize: 13, fontWeight: "800" },
    mutedHint: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: "600",
      marginTop: 8,
      marginHorizontal: 32,
    },
    previewWrap: { paddingHorizontal: 16, paddingBottom: 14 },
    preview: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 11,
      borderRadius: 13,
      borderWidth: 1.5,
      borderColor: theme.primary,
      backgroundColor: "transparent",
    },
    previewPressed: { opacity: 0.55 },
    previewText: { fontSize: 14, fontWeight: "700", color: theme.primary },
    reset: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      marginTop: 28,
      paddingVertical: 12,
    },
    resetText: { fontSize: 14, fontWeight: "700", color: theme.textSecondary },
  });
