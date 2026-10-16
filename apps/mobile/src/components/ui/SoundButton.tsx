import { TouchableOpacityProps } from "react-native";
import { TouchableOpacity } from "@/components/ui/Pressables";
import type { SoundKey } from "@/hooks/useSound";

interface Props extends TouchableOpacityProps {
  sound?: SoundKey | false; // 기본 "click"
  silent?: boolean;
}

export default function SoundButton({
  onPress,
  sound = "click",
  silent,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      sound={silent ? false : sound}
    />
  );
}
