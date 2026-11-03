import { useCallback, useMemo } from "react";
import type { Alert as NativeAlert } from "react-native";
import { useTranslation } from "react-i18next";
import { useSound } from "@/hooks/useSound";
import { runWithDefaultPressSound } from "@/utils/press-sound";
import { useAppDialogStore } from "@/store/app-dialog.store";

/** Preserve the existing Alert API while rendering the app's centered dialog. */
export function useSoundAlert() {
  const { play } = useSound();
  const { t } = useTranslation();
  const alert = useCallback<typeof NativeAlert.alert>(
    (title, message, buttons, options) => {
      useAppDialogStore.getState().present(
        title,
        message,
        (buttons?.length ? buttons : [{ text: t("common.confirm") }]).map((button) => ({
          ...button,
          onPress: () =>
            runWithDefaultPressSound(
              () => button.onPress?.(),
              () => play("click"),
            ),
        })),
        options,
      );
    },
    [play, t],
  );
  return useMemo(() => ({ alert }), [alert]);
}
