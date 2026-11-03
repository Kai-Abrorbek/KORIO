import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useAppDialogStore } from "@/store/app-dialog.store";
import {
  CenteredModal,
  DialogButton,
  DialogIcon,
  useDialogTheme,
} from "./CenteredModal";
import { createDialogStyles } from "./dialog-styles";

/** The existing Alert-shaped API now uses the same authored surface as other dialogs. */
export default function AppDialogHost() {
  const { t } = useTranslation();
  const dialog = useAppDialogStore((state) => state.queue[0]);
  const choose = useAppDialogStore((state) => state.choose);
  const dismiss = useAppDialogStore((state) => state.dismiss);
  const styles = createDialogStyles(useDialogTheme());
  if (!dialog) return null;
  const destructive = dialog.buttons.some(
    (button) => button.style === "destructive",
  );
  const buttons = dialog.buttons
    .map((button, index) => ({ button, index }))
    .sort(
      (a, b) =>
        Number(a.button.style === "cancel") -
        Number(b.button.style === "cancel"),
    );
  return (
    <CenteredModal
      visible
      onClose={() => dismiss(dialog.id)}
      dismissible={Boolean(dialog.options?.cancelable)}
    >
      <DialogIcon
        name={
          destructive ? "alert-circle-outline" : "chatbubble-ellipses-outline"
        }
        tone={destructive ? "danger" : "primary"}
      />
      {dialog.title ? (
        <Text accessibilityRole="header" style={styles.title}>
          {dialog.title}
        </Text>
      ) : null}
      {dialog.message ? (
        <Text style={styles.message}>{dialog.message}</Text>
      ) : null}
      <View style={styles.actions}>
        {buttons.map(({ button, index }) => (
          <DialogButton
            key={`${dialog.id}:${index}`}
            label={
              button.text ||
              t(button.style === "cancel" ? "common.cancel" : "common.confirm")
            }
            variant={
              button.style === "cancel"
                ? "secondary"
                : button.style === "destructive"
                  ? "danger"
                  : "primary"
            }
            onPress={() => choose(dialog.id, index)}
          />
        ))}
      </View>
    </CenteredModal>
  );
}
