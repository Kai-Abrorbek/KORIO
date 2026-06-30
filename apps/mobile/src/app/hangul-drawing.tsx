import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { HANGUL_STROKE_CHARS } from "@/mocks/hangul-strokes.mock";
import HangulDrawingGame from "@/components/hangul/games/HangulDrawingGame";

export default function HangulDrawingScreen() {
  const router = useRouter();
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <HangulDrawingGame
        characters={HANGUL_STROKE_CHARS}
        onExit={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/");
          }
        }}
      />
    </View>
  );
}
