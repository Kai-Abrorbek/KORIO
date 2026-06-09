import { Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";

interface Props {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
  darkColor?: string;
  style?: ViewStyle;
}

export default function PrimaryButton({
  label,
  onPress,
  disabled,
  color = "#58CC02",
  darkColor = "#58A700",
  style,
}: Props) {
  const bg = disabled ? "#D1D1D6" : color;
  const dark = disabled ? "#B5B5BA" : darkColor;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        { backgroundColor: bg, borderBottomColor: dark },
        style,
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 4,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
