import { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { createAudioPlayer, type AudioPlayer } from "expo-audio";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { TutorApi, type TutorTeacherCard } from "../services/tutor.api";

/**
 * 목소리 미리듣기 문장.
 *
 * 네 명 모두 같은 문장을 읽어야 비교가 된다. 다른 문장을 읽으면 목소리가
 * 아니라 문장을 비교하게 된다.
 */
const PREVIEW_TEXT =
  "안녕하세요! 만나서 반가워요. 오늘부터 저와 같이 편하게 한국어를 연습해봐요.";

interface Props {
  /** 지난번에 고른 선생님. 기본 선택으로 표시한다 */
  initialId?: string | null;
  onPick: (teacher: TutorTeacherCard) => void;
}

/**
 * "오늘 누구와 공부할까요?"
 *
 * 목소리 셀렉터가 아니라 선생님 선택이다. 유저가 "AI 랑 얘기한다" 가 아니라
 * "내가 고른 선생님과 얘기한다" 고 느껴야 이 화면의 값어치가 있다.
 */
export function TeacherPicker({ initialId, onPick }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);

  const [teachers, setTeachers] = useState<TutorTeacherCard[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<string | null>(initialId ?? null);
  const [previewing, setPreviewing] = useState<string | null>(null);
  const player = useRef<AudioPlayer | null>(null);

  const load = useCallback(() => {
    setFailed(false);
    TutorApi.teachers()
      .then((r) => setTeachers(r.teachers))
      .catch(() => setFailed(true));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // 화면을 떠나면 미리듣기 소리를 끊는다. 안 끊으면 대화가 시작된 뒤에도
  // 샘플이 계속 나온다
  useEffect(
    () => () => {
      try {
        player.current?.remove();
      } catch {}
      player.current = null;
    },
    [],
  );

  const preview = useCallback(async (id: string) => {
    setPreviewing(id);
    try {
      const res = await TutorApi.tts({ text: PREVIEW_TEXT, teacherId: id });
      const uri = TutorApi.ttsAudioUrl(res.audioId);
      if (!player.current) player.current = createAudioPlayer({ uri });
      else player.current.replace({ uri });
      player.current.play();
    } catch {
      /* 미리듣기가 안 돼도 선택은 막지 않는다 */
    } finally {
      setPreviewing(null);
    }
  }, []);

  if (failed) {
    return (
      <View style={s.center}>
        <Text style={s.empty}>{t("common.loadFailed")}</Text>
        <Pressable onPress={load} style={s.retry} hitSlop={8}>
          <Text style={s.retryText}>{t("common.retry")}</Text>
        </Pressable>
      </View>
    );
  }

  if (!teachers) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  const chosen = teachers.find((x) => x.id === selected) ?? null;

  return (
    <View style={s.wrap}>
      <ScrollView
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
      >
        <Text style={s.lead}>{t("tutor.teacher.lead")}</Text>

        {teachers.map((tc, i) => (
          <Animated.View key={tc.id} entering={FadeInDown.delay(i * 60)}>
            <TeacherCard
              teacher={tc}
              selected={tc.id === selected}
              previewing={previewing === tc.id}
              onSelect={() => setSelected(tc.id)}
              onPreview={() => void preview(tc.id)}
              theme={theme}
            />
          </Animated.View>
        ))}
      </ScrollView>

      {/* 확인 버튼은 목록 밖에 고정한다. 안에 넣으면 스크롤을 끝까지
          내려야 보이고, 네 장짜리 목록에서 그건 그냥 불편하다 */}
      {/* 안드로이드 3버튼 네비게이션 뒤에 깔려서 안 눌렸다.
          하단 고정 버튼은 항상 insets.bottom 을 더한다 */}
      <View style={[s.ctaBar, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={[s.cta, !chosen && s.ctaOff]}
          disabled={!chosen}
          onPress={() => chosen && onPick(chosen)}
        >
          <Text style={s.ctaText}>
            {chosen
              ? t("tutor.teacher.startWith", { name: chosen.name })
              : t("tutor.teacher.pickFirst")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function TeacherCard({
  teacher,
  selected,
  previewing,
  onSelect,
  onPreview,
  theme,
}: {
  teacher: TutorTeacherCard;
  selected: boolean;
  previewing: boolean;
  onSelect: () => void;
  onPreview: () => void;
  theme: ThemeColors;
}) {
  const { t } = useTranslation();
  const s = getStyles(theme);
  const press = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - press.value * 0.02 }],
  }));

  return (
    <Animated.View style={style}>
      <Pressable
        onPress={onSelect}
        onPressIn={() => (press.value = withTiming(1, { duration: 70 }))}
        onPressOut={() => (press.value = withTiming(0, { duration: 130 }))}
        style={[
          s.card,
          { borderBottomColor: selected ? teacher.color : theme.border },
          selected && { borderColor: teacher.color, borderWidth: 2 },
        ]}
      >
        <View style={[s.avatar, { backgroundColor: teacher.color + "26" }]}>
          <Text style={s.avatarText}>{teacher.avatar}</Text>
        </View>

        <View style={s.body}>
          <View style={s.nameRow}>
            <Text style={s.name} numberOfLines={1}>
              {teacher.name}
            </Text>
            {selected && (
              <Ionicons name="checkmark-circle" size={19} color={teacher.color} />
            )}
          </View>
          <Text style={s.desc} numberOfLines={2}>
            {teacher.description}
          </Text>
          {teacher.recommendedModes.length > 0 && (
            <View style={s.tags}>
              {teacher.recommendedModes.map((m) => (
                <View key={m} style={[s.tag, { backgroundColor: teacher.color + "1A" }]}>
                  <Text style={[s.tagText, { color: teacher.color }]}>
                    {t(`tutor.modes.${m}`)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <Pressable
          onPress={onPreview}
          hitSlop={10}
          style={[s.playBtn, { borderColor: teacher.color }]}
        >
          {previewing ? (
            <ActivityIndicator size="small" color={teacher.color} />
          ) : (
            <Ionicons name="volume-high" size={18} color={teacher.color} />
          )}
        </Pressable>
      </Pressable>
    </Animated.View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: { flex: 1 },
    list: { paddingHorizontal: 20, paddingBottom: 24, gap: 12 },
    lead: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "600",
      color: theme.textSecondary,
      marginBottom: 4,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 1.5,
      borderColor: theme.border,
      borderBottomWidth: 4,
      padding: 14,
    },
    avatar: {
      width: 54,
      height: 54,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: { fontSize: 28 },
    body: { flex: 1, gap: 3 },
    nameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    name: { fontSize: 16, fontWeight: "800", color: theme.text },
    desc: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: "500",
      color: theme.textSecondary,
    },
    tags: { flexDirection: "row", gap: 6, marginTop: 4, flexWrap: "wrap" },
    tag: { borderRadius: 7, paddingHorizontal: 7, paddingVertical: 2 },
    tagText: { fontSize: 11, fontWeight: "800" },
    playBtn: {
      width: 38,
      height: 38,
      borderRadius: 19,
      borderWidth: 1.5,
      alignItems: "center",
      justifyContent: "center",
    },
    ctaBar: {
      paddingHorizontal: 20,
      paddingTop: 10,
      backgroundColor: theme.bg,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    cta: {
      backgroundColor: theme.primary,
      borderBottomWidth: 4,
      borderBottomColor: "#5b52c4",
      borderRadius: 14,
      paddingVertical: 15,
      alignItems: "center",
    },
    ctaOff: { backgroundColor: theme.border, borderBottomColor: theme.border },
    ctaText: { fontSize: 16, fontWeight: "800", color: "#fff" },
    center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 14 },
    empty: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
      paddingHorizontal: 32,
    },
    retry: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 999,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    retryText: { fontSize: 14, fontWeight: "800", color: theme.primary },
  });
