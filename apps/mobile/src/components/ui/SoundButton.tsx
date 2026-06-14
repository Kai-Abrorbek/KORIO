import {
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent,
} from "react-native";
import { useSound, SoundKey } from "@/hooks/useSound";

interface Props extends TouchableOpacityProps {
  sound?: SoundKey; // 기본 "click"
  silent?: boolean;
}

export default function SoundButton({
  onPress,
  sound = "click",
  silent,
  ...rest
}: Props) {
  const { play } = useSound();

  const handlePress = (e: GestureResponderEvent) => {
    if (!silent) play(sound);
    onPress?.(e);
  };

  return <TouchableOpacity {...rest} onPress={handlePress} />;
}
