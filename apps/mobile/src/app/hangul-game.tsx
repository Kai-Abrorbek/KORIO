import { useMemo } from "react";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { HANGUL_CHARACTERS } from "@/mocks/hangul.mock";
import { HangulCategory } from "@/types/hangul";
import MemoryMatch from "@/components/hangul/games/MemoryMatch";
import { useTheme } from "@/hooks/useTheme";

export default function HangulGameScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { category } = useLocalSearchParams<{ category?: HangulCategory }>();

  const characters = useMemo(() => {
    const cat = (category as HangulCategory) || "consonant";
    return HANGUL_CHARACTERS.filter((c) => c.category === cat);
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <MemoryMatch characters={characters} onExit={() => router.back()} />
    </View>
  );
}
