import { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import SuggestionRow, {
  SuggestionItem,
} from "@/components/friends/SuggestionRow";

interface Props {
  items: SuggestionItem[];
  dismissable?: boolean; // X 버튼 표시
}

export default function SuggestionList({ items, dismissable = true }: Props) {
  const theme = useTheme();
  const router = useRouter();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const list = items.filter((x) => !dismissed.has(x.id));

  return (
    <View>
      {list.map((item) => (
        <SuggestionRow
          key={item.id}
          item={item}
          onDismiss={
            dismissable
              ? () => setDismissed((p) => new Set(p).add(item.id))
              : undefined
          }
          onPress={() => router.push(`/friend-profile?id=${item.id}`)}
          theme={theme}
        />
      ))}
    </View>
  );
}
