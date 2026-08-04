import { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { UserService } from "@/services/user.service";

interface Props {
  userId: string;
  isFollowing: boolean;
  isFollowedBy?: boolean;
  onChange?: (following: boolean) => void;
}

// 인스타식 3-state 팔로우 버튼: 팔로우 / 맞팔하기 / 팔로우 중
export default function FollowPill({
  userId,
  isFollowing,
  isFollowedBy,
  onChange,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const [following, setFollowing] = useState(isFollowing);
  const [busy, setBusy] = useState(false);

  // 목록 새로고침 등으로 부모 prop이 바뀌면 동기화
  useEffect(() => {
    setFollowing(isFollowing);
  }, [isFollowing]);

  const toggle = async () => {
    if (busy) return;
    const next = !following;
    setFollowing(next); // 낙관적 업데이트
    setBusy(true);
    onChange?.(next);
    try {
      if (next) await UserService.follow(userId);
      else await UserService.unfollow(userId);
    } catch {
      setFollowing(!next); // 실패 시 롤백
      onChange?.(!next);
    } finally {
      setBusy(false);
    }
  };

  const mode = following ? "following" : isFollowedBy ? "followBack" : "follow";
  const label =
    mode === "following"
      ? t("friends.following")
      : mode === "followBack"
        ? t("friends.followBack")
        : t("friends.follow");

  return (
    <TouchableOpacity
      style={[s.pill, mode === "following" ? s.ghost : s.filled]}
      onPress={toggle}
      activeOpacity={0.8}
    >
      <Text style={[s.text, mode === "following" ? s.textGhost : s.textFilled]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    pill: {
      minWidth: 96,
      paddingHorizontal: 16,
      paddingVertical: 9,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    filled: {
      backgroundColor: "#1CB0F6",
      borderBottomWidth: 3,
      borderBottomColor: "#1799D6",
    },
    ghost: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
    },
    text: { fontSize: 14, fontWeight: "800" },
    textFilled: { color: "#fff" },
    textGhost: { color: theme.textSecondary },
  });
