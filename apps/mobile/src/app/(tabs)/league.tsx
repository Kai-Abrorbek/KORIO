import { View, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";

export default function LeagueScreen() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.bg,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: theme.text, fontSize: 18, fontWeight: "700" }}>
        리그
      </Text>
    </View>
  );
}
