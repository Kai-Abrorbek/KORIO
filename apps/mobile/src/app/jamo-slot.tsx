import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import JamoSlotGame from "@/components/hangul/games/JamoSlotGame";

export default function JamoSlotScreen() {
  const router = useRouter();
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <JamoSlotGame onExit={() => router.back()} />
    </View>
  );
}
