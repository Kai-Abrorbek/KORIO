import { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { UserService } from "@/services/user.service";
import SuggestionRow, {
  SuggestionItem,
} from "@/components/friends/SuggestionRow";

interface Props {
  items: SuggestionItem[];
  initialFollowed?: string[]; // 이미 팔로우된 id (검색결과 isFollowing)
  dismissable?: boolean; // X 버튼 표시
}

export default function SuggestionList({
  items,
  initialFollowed = [],
  dismissable = true,
}: Props) {
  const theme = useTheme();
  const router = useRouter();
  const [followed, setFollowed] = useState<Set<string>>(
    new Set(initialFollowed),
  );
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const toggleFollow = async (id: string) => {
    const isFollowed = followed.has(id);
    setFollowed((p) => {
      const n = new Set(p);
      isFollowed ? n.delete(id) : n.add(id);
      return n;
    });
    try {
      if (isFollowed) await UserService.unfollow(id);
      else await UserService.follow(id);
    } catch (e) {
      console.error("팔로우 실패:", e);
      setFollowed((p) => {
        // 롤백
        const n = new Set(p);
        isFollowed ? n.add(id) : n.delete(id);
        return n;
      });
    }
  };

  const list = items.filter((x) => !dismissed.has(x.id));

  return (
    <View>
      {list.map((item) => (
        <SuggestionRow
          key={item.id}
          item={item}
          followed={followed.has(item.id)}
          onFollow={() => toggleFollow(item.id)}
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
