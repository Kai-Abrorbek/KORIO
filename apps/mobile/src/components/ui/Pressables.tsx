import { forwardRef, useCallback, type ComponentRef } from "react";
import {
  Button as NativeButton,
  Pressable as NativePressable,
  Switch as NativeSwitch,
  Text as NativeText,
  TouchableHighlight as NativeTouchableHighlight,
  TouchableOpacity as NativeTouchableOpacity,
  TouchableWithoutFeedback as NativeTouchableWithoutFeedback,
  type ButtonProps,
  type PressableProps,
  type SwitchProps,
  type SwitchChangeEvent,
  type TextProps,
  type TouchableHighlightProps,
  type TouchableOpacityProps,
  type TouchableWithoutFeedbackProps,
} from "react-native";
import { useSound, type SoundKey } from "@/hooks/useSound";
import { runWithDefaultPressSound } from "@/utils/press-sound";

interface FeedbackProps {
  /** Explicit sounds in the handler win; false opts out of the default click. */
  sound?: SoundKey | false;
}

function useFeedbackHandler<Args extends unknown[]>(
  handler: ((...args: Args) => unknown) | null | undefined,
  sound: FeedbackProps["sound"],
  disabled?: boolean | null,
) {
  const { play } = useSound();
  const callback = useCallback(
    (...args: Args) => {
      const first = args[0];
      runWithDefaultPressSound(
        () => handler?.(...args),
        () => play(sound || "click"),
        {
          event:
            first !== null && typeof first === "object" ? first : undefined,
          disabled: disabled === true,
          silent: sound === false,
          preferDefault: typeof sound === "string" && sound !== "click",
        },
      );
    },
    [disabled, handler, play, sound],
  );
  return handler ? callback : undefined;
}

export const Pressable = forwardRef<
  ComponentRef<typeof NativePressable>,
  PressableProps & FeedbackProps
>(function Pressable({ onPress, onLongPress, sound, disabled, ...props }, ref) {
  const press = useFeedbackHandler(onPress, sound, disabled);
  const longPress = useFeedbackHandler(onLongPress, sound, disabled);
  return (
    <NativePressable
      {...props}
      ref={ref}
      disabled={disabled}
      onPress={press}
      onLongPress={longPress}
    />
  );
});

export const TouchableOpacity = forwardRef<
  ComponentRef<typeof NativeTouchableOpacity>,
  TouchableOpacityProps & FeedbackProps
>(function TouchableOpacity(
  { onPress, onLongPress, sound, disabled, ...props },
  ref,
) {
  const press = useFeedbackHandler(onPress, sound, disabled);
  const longPress = useFeedbackHandler(onLongPress, sound, disabled);
  return (
    <NativeTouchableOpacity
      {...props}
      ref={ref}
      disabled={disabled}
      onPress={press}
      onLongPress={longPress}
    />
  );
});

export const TouchableHighlight = forwardRef<
  ComponentRef<typeof NativeTouchableHighlight>,
  TouchableHighlightProps & FeedbackProps
>(function TouchableHighlight(
  { onPress, onLongPress, sound, disabled, ...props },
  ref,
) {
  const press = useFeedbackHandler(onPress, sound, disabled);
  const longPress = useFeedbackHandler(onLongPress, sound, disabled);
  return (
    <NativeTouchableHighlight
      {...props}
      ref={ref}
      disabled={disabled}
      onPress={press}
      onLongPress={longPress}
    />
  );
});

export const TouchableWithoutFeedback = forwardRef<
  ComponentRef<typeof NativeTouchableWithoutFeedback>,
  TouchableWithoutFeedbackProps & FeedbackProps
>(function TouchableWithoutFeedback(
  { onPress, onLongPress, sound, disabled, ...props },
  ref,
) {
  const press = useFeedbackHandler(onPress, sound, disabled);
  const longPress = useFeedbackHandler(onLongPress, sound, disabled);
  return (
    <NativeTouchableWithoutFeedback
      {...props}
      ref={ref}
      disabled={disabled}
      onPress={press}
      onLongPress={longPress}
    />
  );
});

export const Button = forwardRef<
  ComponentRef<typeof NativeButton>,
  ButtonProps & FeedbackProps
>(function Button({ onPress, sound, disabled, ...props }, ref) {
  const press = useFeedbackHandler(onPress, sound, disabled);
  return (
    <NativeButton {...props} ref={ref} disabled={disabled} onPress={press!} />
  );
});

export const Switch = forwardRef<
  ComponentRef<typeof NativeSwitch>,
  SwitchProps & FeedbackProps
>(function Switch({ onChange, onValueChange, sound, disabled, ...props }, ref) {
  const change = useFeedbackHandler(
    onChange || onValueChange
      ? (event: SwitchChangeEvent) => {
          onChange?.(event);
          onValueChange?.(event.nativeEvent.value);
        }
      : undefined,
    sound,
    disabled,
  );
  return (
    <NativeSwitch {...props} ref={ref} disabled={disabled} onChange={change} />
  );
});

/** Inline word/blank buttons must remain Text so native text layout is retained. */
export const PressableText = forwardRef<
  ComponentRef<typeof NativeText>,
  TextProps & FeedbackProps
>(function PressableText(
  { onPress, onLongPress, sound, disabled, ...props },
  ref,
) {
  const press = useFeedbackHandler(onPress, sound, disabled);
  const longPress = useFeedbackHandler(onLongPress, sound, disabled);
  return (
    <NativeText
      {...props}
      ref={ref}
      disabled={disabled}
      onPress={press}
      onLongPress={longPress}
    />
  );
});
