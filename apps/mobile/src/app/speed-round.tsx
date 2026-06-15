import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import SpeedRoundGame from "@/components/hangul/games/SpeedRoundGame";

export default function SpeedRoundScreen() {
  const router = useRouter();
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <SpeedRoundGame onExit={() => router.back()} />
    </View>
  );
}
