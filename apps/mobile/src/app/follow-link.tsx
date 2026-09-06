import { View, Text, TouchableOpacity, StyleSheet, Share } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useAuthStore } from "@/store/auth.store";
import FriendAvatar from "@/components/friends/FriendAvatar";

export default function FollowLinkScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const s = styles(theme);
  const user = useAuthStore((st) => st.user);

  /**
   * 팔로우 링크.
   *
   * ⚠️ username 이 아니라 **id** 를 쓴다. 링크를 받은 쪽에서 여는 화면
   * (friend-profile)이 id 로만 조회할 수 있어서, username 을 넣으면 링크는
   * 열리는데 빈 프로필이 뜬다. 예쁜 주소를 쓰려면 서버에 by-username 조회를
   * 먼저 만들어야 한다.
   */
  const url = `https://korio.online/u/${user?.id ?? ""}`;

  const onShare = () =>
    Share.share({ message: `${t("friends.followMe")}\n${url}` });

  return (
    <View style={s.overlay}>
      <View style={s.card}>
        <View style={s.avatarBox}>
          <FriendAvatar
            name={user?.nickname || "User"}
            avatar={user?.avatar}
            avatarUri={user?.profileImage}
            size={140}
          />
        </View>
        <View style={s.info}>
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{user?.nickname}</Text>
            <Text style={s.username}>{user?.username}</Text>
            <Text style={s.brand}>KORIO</Text>
          </View>
          <View style={s.qr}>
            <QRCode value={url} size={92} />
          </View>
        </View>
      </View>

      <View style={s.sheet}>
        <View style={s.sheetHead}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
            <Ionicons name="close" size={28} color={theme.text} />
          </TouchableOpacity>
          <Text style={s.sheetTitle}>{t("friends.followMe")}</Text>
          <View style={{ width: 28 }} />
        </View>
        <TouchableOpacity
          style={s.shareBtn}
          onPress={onShare}
          activeOpacity={0.85}
        >
          <Ionicons name="share-social" size={22} color="#fff" />
          <Text style={s.shareText}>{t("friends.shareLink")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.55)",
      justifyContent: "space-between",
      paddingTop: 80,
      marginBottom: 40,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 24,
      marginHorizontal: 30,
      padding: 16,
      gap: 14,
    },
    avatarBox: {
      alignItems: "center",
      backgroundColor: theme.border + "55",
      borderRadius: 16,
      paddingVertical: 24,
    },
    info: { flexDirection: "row", alignItems: "center", gap: 12 },
    name: { fontSize: 26, fontWeight: "900", color: theme.text },
    username: { fontSize: 15, color: theme.textSecondary, marginTop: 2 },
    brand: { fontSize: 22, fontWeight: "900", color: "#58CC02", marginTop: 10 },
    qr: { backgroundColor: "#fff", padding: 8, borderRadius: 12 },
    sheet: {
      backgroundColor: theme.bg,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 20,
      paddingBottom: 40,
      gap: 20,
    },
    sheetHead: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    sheetTitle: { fontSize: 18, fontWeight: "800", color: theme.text },
    shareBtn: {
      flexDirection: "row",
      gap: 10,
      backgroundColor: "#1CB0F6",
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    shareText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  });
