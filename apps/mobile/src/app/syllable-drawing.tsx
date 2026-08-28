import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import SyllableDrawingGame from "@/components/hangul/games/SyllableDrawingGame";

export default function SyllableDrawingScreen() {
  const router = useRouter();
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <SyllableDrawingGame
        onExit={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/hangul");
          }
        }}
      />
    </View>
  );
}
