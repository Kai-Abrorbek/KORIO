import { useRef, type ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HaneulmonMascot, { type HaneulmonMood } from "@/components/home/HaneulmonMascot";
import { CenteredModal, DialogButton, useDialogTheme } from "@/components/common/CenteredModal";

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
  /** Outside/back dismissal retains the caller's existing cancellation action. */
  onBackdrop?: () => void;
}

/** Preserve the final content during the single closing fade. */
export default function RewardDialog(props: RewardDialogProps) {
  const theme = useDialogTheme();
  const s = getStyles(theme);
  const lastShown = useRef(props);
  if (props.visible) lastShown.current = props;
  const {
    mood = "great", title, body, rewards = [], primaryLabel, onPrimary,
    secondaryLabel, onSecondary, loading, onBackdrop,
  } = props.visible ? props : lastShown.current;
  const dismiss = onBackdrop ?? onSecondary;

  return (
    <CenteredModal visible={props.visible} onClose={() => dismiss?.()} dismissible={Boolean(dismiss)}>
      <View style={s.mascotWrap}>
        <HaneulmonMascot size={104} mood={mood} />
      </View>
      <Text style={s.title}>{title}</Text>
      {body ? <Text style={s.body}>{body}</Text> : null}
      {rewards.length ? (
        <View style={s.rewards}>
          {rewards.map((reward, index) => (
            <View key={index} style={s.chip}>
              <View style={s.chipIcon}>
                <Ionicons name={reward.icon} size={19} color={theme.primary} />
              </View>
              <Text style={s.chipText}>{reward.label}</Text>
            </View>
          ))}
        </View>
      ) : null}
      <DialogButton label={primaryLabel} onPress={onPrimary} loading={loading} style={s.primary} />
      {secondaryLabel ? (
        <DialogButton label={secondaryLabel} onPress={() => onSecondary?.()} variant="secondary" style={s.secondary} />
      ) : null}
    </CenteredModal>
  );
}

const getStyles = (theme: ReturnType<typeof useDialogTheme>) => StyleSheet.create({
  mascotWrap: { alignSelf: "center", alignItems: "center", justifyContent: "center", backgroundColor: theme.yellowWash, width: 116, height: 116, borderRadius: 40, marginBottom: 18 },
  title: { fontSize: 24, fontWeight: "800", color: theme.text, textAlign: "center", lineHeight: 31 },
  body: { marginTop: 10, fontSize: 15, fontWeight: "500", color: theme.textSecondary, textAlign: "center", lineHeight: 23 },
  rewards: { marginTop: 20, width: "100%", gap: 8 },
  chip: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12, borderRadius: 16, backgroundColor: theme.soft },
  chipIcon: { width: 34, height: 34, borderRadius: 12, backgroundColor: theme.wash, alignItems: "center", justifyContent: "center" },
  chipText: { flex: 1, fontSize: 14, lineHeight: 21, fontWeight: "700", color: theme.text },
  primary: { marginTop: 24 },
  secondary: { marginTop: 8 },
});
