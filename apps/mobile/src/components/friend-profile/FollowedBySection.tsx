import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import FriendAvatar from "@/components/friends/FriendAvatar";

interface FollowedByUser {
  id: string;
  nickname: string;
  profileImage?: string;
}

export default function FollowedBySection({
  users,
  count,
  theme,
}: {
  users: FollowedByUser[];
  count: number;
  theme: ThemeColors;
}) {
  const { t } = useTranslation();
  if (!count || users.length === 0) return null;
  const s = styles(theme);

  const label =
    count === 1
      ? t("friendProfile.followedByOne", { name: users[0].nickname })
      : t("friendProfile.followedByMany", {
          name: users[0].nickname,
          count: count - 1,
        });

  return (
    <View style={s.wrap}>
      <View style={s.avatars}>
        {users.slice(0, 3).map((u, i) => (
          <View key={u.id} style={[s.slot, { marginLeft: i === 0 ? 0 : -10 }]}>
            <FriendAvatar
              name={u.nickname}
              avatarUri={u.profileImage}
              size={28}
            />
          </View>
        ))}
      </View>
      <Text style={s.text} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 20,
      marginTop: 4,
      marginBottom: 8,
    },
    avatars: { flexDirection: "row" },
    slot: { borderWidth: 2, borderColor: theme.bg, borderRadius: 16 },
    text: { flex: 1, fontSize: 15, fontWeight: "600", color: theme.text },
  });
