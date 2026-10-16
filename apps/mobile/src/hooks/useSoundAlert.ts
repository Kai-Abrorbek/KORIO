import { useCallback, useMemo } from "react";
import { Alert as NativeAlert } from "react-native";
import { useTranslation } from "react-i18next";
import { useSound } from "@/hooks/useSound";
import { runWithDefaultPressSound } from "@/utils/press-sound";

/** Native dialog buttons run outside React's pressable component tree. */
export function useSoundAlert() {
  const { play } = useSound();
  const { t } = useTranslation();
  const alert = useCallback<typeof NativeAlert.alert>(
    (title, message, buttons, options) => {
      NativeAlert.alert(
        title,
        message,
        (buttons ?? [{ text: t("common.confirm") }]).map((button) => ({
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
