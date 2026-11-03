import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "@/utils/haptics";
import {
  CenteredModal,
  DialogButton,
  DialogIcon,
  useDialogTheme,
} from "./CenteredModal";
import { createDialogStyles } from "./dialog-styles";

export type ConfirmTone = "danger" | "primary" | "warning";

export default function ConfirmDialog({
  visible,
  tone = "danger",
  icon,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: {
  visible: boolean;
  tone?: ConfirmTone;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const colors = useDialogTheme();
  const styles = createDialogStyles(colors);
  return (
    <CenteredModal visible={visible} onClose={onCancel}>
      <DialogIcon name={icon} tone={tone} />
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <View style={styles.actions}>
        <DialogButton
          label={confirmLabel}
          variant={tone === "danger" ? "danger" : "primary"}
          onPress={() => {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onConfirm();
          }}
        />
        {cancelLabel ? (
          <DialogButton
            label={cancelLabel}
            variant="secondary"
            onPress={onCancel}
          />
        ) : null}
      </View>
    </CenteredModal>
  );
}
