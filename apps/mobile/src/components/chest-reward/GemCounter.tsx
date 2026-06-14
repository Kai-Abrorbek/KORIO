import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  target: number;
  animate?: boolean;
}

export default function GemCounter({ target, animate }: Props) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!animate) {
      setDisplay(target);
      return;
    }
    // 카운트업
    const start = display;
    const diff = target - start;
    if (diff === 0) return;
    const steps = Math.min(Math.abs(diff), 30);
    const stepValue = diff / steps;
    let current = start;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      current += stepValue;
      if (count >= steps) {
        setDisplay(target);
        clearInterval(interval);
      } else {
        setDisplay(Math.round(current));
      }
    }, 35);
    return () => clearInterval(interval);
  }, [target, animate]);

  return (
    <View style={styles.row}>
      <Ionicons name="diamond" size={22} color="#5CD0F0" />
      <Text style={styles.text}>{display}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  text: {
    fontSize: 18,
    fontWeight: "800",
    color: "#3BB6E5",
  },
});
