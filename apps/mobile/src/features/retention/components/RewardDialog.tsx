import { useRef, type ComponentProps } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HaneulmonMascot, {
  type HaneulmonMood,
} from "@/components/home/HaneulmonMascot";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import Button3D from "./Button3D";

export interface RewardChip {
  icon: ComponentProps<typeof Ionicons>["name"];
  color: string;
  label: string;
}

export interface RewardDialogProps {
  visible: boolean;
  mood?: HaneulmonMood;
  title: string;
  body?: string;
  rewards?: RewardChip[];
  primaryLabel: string;
  onPrimary: () => void;
  primaryColor?: string;
  primaryDepth?: string;
  secondaryLabel?: string;
  onSecondary?: () => void;
  loading?: boolean;
  /** 바깥을 눌러 닫기 (기본: 보조 버튼과 같은 동작, 없으면 막힘) */
  onBackdrop?: () => void;
}

/**
 * 가운데 뜨는 보상 대화상자 — 복귀 보상·복구펜 알림·목표 결과가 같이 쓴다.
 *
 * ⚠️ 연출 애니메이션 금지 (2026-10-06). 스프링으로 튀어나오기·후광 맥박·칩 팝·
 *    버튼 튕김이 카드와 버튼을 흔들리게 했다. 열림/닫힘은 **Modal 기본 페이드
 *    (animationType="fade") 하나만** 쓴다. 안에서 reanimated 를 다시 쓰지 말 것 —
 *    Modal 자체 애니와 겹치면 어긋난다 (SectionListSheet 주석 참고).
 * statusBarTranslucent + GestureHandlerRootView 는 그대로 (edge-to-edge 인셋·터치).
 *
 * 닫힐 때도 페이드아웃이 보이도록 Modal 은 계속 붙여 두고 visible 만 바꾼다.
 * 닫히는 동안 부모가 내용을 비워도(null) 깜빡이지 않게 마지막 내용을 잡아 둔다.
 */
export default function RewardDialog(props: RewardDialogProps) {
  const theme = useTheme();
  const s = getStyles(theme);
  const lastShown = useRef(props);
  if (props.visible) lastShown.current = props;
  const {
    mood = "great",
    title,
    body,
    rewards = [],
    primaryLabel,
    onPrimary,
    primaryColor,
    primaryDepth,
    secondaryLabel,
    onSecondary,
    loading,
    onBackdrop,
  } = props.visible ? props : lastShown.current;
  const visible = props.visible;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => (onBackdrop ?? onSecondary)?.()}
    >
      <GestureHandlerRootView style={s.root}>
        <Pressable
          style={[StyleSheet.absoluteFill, s.backdrop]}
          onPress={() => (onBackdrop ?? onSecondary)?.()}
        />

        <View style={s.card}>
          <View style={s.mascotWrap}>
            <View style={s.halo} />
            <HaneulmonMascot size={104} mood={mood} />
          </View>

          <Text style={s.title}>{title}</Text>
          {body ? <Text style={s.body}>{body}</Text> : null}

          {rewards.length ? (
            <View style={s.rewards}>
              {rewards.map((r, i) => (
                <RewardChipView key={i} chip={r} theme={theme} />
              ))}
            </View>
          ) : null}

          <Button3D
            label={primaryLabel}
            onPress={onPrimary}
            loading={loading}
            color={primaryColor}
            depthColor={primaryDepth}
            style={s.primary}
          />
          {secondaryLabel ? (
            <Pressable onPress={onSecondary} hitSlop={10} style={s.secondary}>
              <Text style={s.secondaryText}>{secondaryLabel}</Text>
            </Pressable>
          ) : null}
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

function RewardChipView({
  chip,
  theme,
}: {
  chip: RewardChip;
  theme: ThemeColors;
}) {
  const s = getStyles(theme);
  return (
    <View style={s.chip}>
      <View style={[s.chipIcon, { backgroundColor: chip.color + "22" }]}>
        <Ionicons name={chip.icon} size={18} color={chip.color} />
      </View>
      <Text style={s.chipText}>{chip.label}</Text>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    root: { flex: 1, alignItems: "center", justifyContent: "center" },
    backdrop: { backgroundColor: "rgba(10, 8, 30, 0.62)" },
    card: {
      width: "86%",
      maxWidth: 380,
      backgroundColor: theme.surface,
      borderRadius: 28,
      paddingTop: 76,
      paddingHorizontal: 22,
      paddingBottom: 20,
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.border,
    },
    mascotWrap: {
      position: "absolute",
      top: -58,
      alignItems: "center",
      justifyContent: "center",
    },
    halo: {
      position: "absolute",
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: "#FFE066",
      opacity: 0.5,
    },
    title: {
      fontSize: 21,
      fontWeight: "900",
      color: theme.text,
      textAlign: "center",
      lineHeight: 28,
    },
    body: {
      marginTop: 8,
      fontSize: 14.5,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 21,
    },
    rewards: { marginTop: 16, width: "100%", gap: 8 },
    chip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 14,
      backgroundColor: theme.bg,
      borderWidth: 1,
      borderColor: theme.border,
    },
    chipIcon: {
      width: 32,
      height: 32,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    chipText: { flex: 1, fontSize: 14.5, fontWeight: "800", color: theme.text },
    primary: { alignSelf: "stretch", marginTop: 20 },
    secondary: { marginTop: 14, paddingVertical: 4 },
    secondaryText: {
      fontSize: 14,
      fontWeight: "800",
      color: theme.textSecondary,
    },
  });
