import { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "@/components/ui/Pressables";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useFocusEffect, useRouter, useLocalSearchParams } from "expo-router";
import { useSharedValue } from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { FriendTab } from "@/types/friend";
import FriendsTabs from "@/components/friends/FriendsTabs";
import FriendListItem from "@/components/friends/FriendListItem";
import { UserService } from "@/services/user.service";
import SwipePager from "@/components/common/SwipePager";

/** 탭 순서 = 옆으로 넘기는 순서 */
const TABS: FriendTab[] = ["following", "followers"];

const langToFlag = (lang?: string) =>
  ({ ko: "🇰🇷", en: "🇺🇸", uz: "🇺🇿", ru: "🇷🇺" })[lang ?? ""] ?? "🇰🇷";

export default function FriendsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  // 페이저 목록을 useMemo 로 고정하려면 스타일도 테마가 바뀔 때만 새로 만든다
  const styles = useMemo(() => getStyles(theme), [theme]);

  const { tab: tabParam, userId } = useLocalSearchParams<{
    tab?: string;
    userId?: string;
  }>();
  const [tab, setTab] = useState<FriendTab>(
    tabParam === "followers" ? "followers" : "following",
  );
  // 페이저 위치 — 탭 밑줄·글자색이 손가락을 따라온다
  const progress = useSharedValue(TABS.indexOf(tab));
  const [following, setFollowing] = useState<any[]>([]);
  const [followers, setFollowers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      // userId 있으면 그 유저의 목록, 없으면 내 목록
      const followingReq = userId
        ? UserService.getUserFollowing(userId)
        : UserService.getFollowing();
      const followersReq = userId
        ? UserService.getUserFollowers(userId)
        : UserService.getFollowers();
      Promise.all([followingReq, followersReq])
        .then(([fwing, fwers]) => {
          setFollowing(fwing ?? []);
          setFollowers(fwers ?? []);
        })
        .catch((e) => console.error("friends 로드 실패:", e))
        .finally(() => setLoading(false));
    }, [userId]),
  );

  // 팔로잉 · 팔로워 두 목록을 미리 그려 두고 옆으로 넘긴다.
  // 미는 동안 탭이 바뀌어도 다시 그리지 않게 목록이 바뀔 때만 새로 만든다
  const pages = useMemo(
    () =>
      [following, followers].map((raw, page) => {
        const list = raw.map((u) => ({
          id: u._id ?? u.id,
          name: u.nickname,
          avatar: u.avatar,
          avatarUri: u.profileImage,
          primaryFlag: langToFlag(u.targetLanguage),
          xp: u.totalXP ?? 0,
          isFollowing: u.isFollowing,
          isFollowedBy: u.isFollowedBy,
          isMe: u.isMe,
          isOnline: u.isOnline,
        }));
        if (!list.length) {
          return (
            <Text key={TABS[page]} style={styles.empty}>
              {t("friends.empty")}
            </Text>
          );
        }
        return (
          <View key={TABS[page]} style={styles.card}>
            {list.map((friend, i) => (
              <FriendListItem
                key={friend.id}
                friend={friend}
                isLast={i === list.length - 1}
                onPress={() =>
                  router.push({
                    pathname: "/friend-profile",
                    params: {
                      id: friend.id,
                    },
                  })
                }
              />
            ))}
          </View>
        );
      }),
    [following, followers, styles, router, t],
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/profile");
            }
          }}
          hitSlop={10}
          activeOpacity={0.7}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{t("friends.title")}</Text>
        <View style={styles.backBtn} />
      </View>

      <FriendsTabs value={tab} onChange={setTab} progress={progress} />

      {/* 옆으로 밀면 팔로잉 ↔ 팔로워 (탭을 누른 것과 같다) */}
      <SwipePager
        index={TABS.indexOf(tab)}
        onIndexChange={(next) => setTab(TABS[next] ?? "following")}
        pages={pages}
        progress={progress}
        contentContainerStyle={styles.scrollContent}
      />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    loadingContainer: {
      flex: 1,
      backgroundColor: theme.bg,
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 54,
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    backBtn: {
      width: 32,
      height: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.text,
    },
    scrollContent: {
      paddingTop: 20,
      paddingHorizontal: 16,
      paddingBottom: 40,
    },
    empty: {
      marginTop: 26,
      fontSize: 14,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.border,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 1,
    },
  });
