import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useErrorStore } from "@/store/error.store";
import {
  CenteredModal,
  DialogButton,
  DialogIcon,
  useDialogTheme,
} from "./CenteredModal";
import { createDialogStyles } from "./dialog-styles";

export default function ErrorModal() {
  const { t } = useTranslation();
  const styles = createDialogStyles(useDialogTheme());
  const { visible, code, retry, dismiss } = useErrorStore();
  const message = t(`errors.${code}`, {
    defaultValue: t("errors.UNKNOWN_ERROR"),
  });
  return (
    <CenteredModal visible={visible} onClose={dismiss}>
      <DialogIcon name="warning-outline" tone="danger" />
      <Text accessibilityRole="header" style={styles.title}>
        {t("errors.title")}
      </Text>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.actions}>
        <DialogButton label={t("errors.retry")} onPress={retry} />
        <DialogButton
          label={t("errors.close")}
          variant="secondary"
          onPress={dismiss}
        />
      </View>
    </CenteredModal>
  );
}
