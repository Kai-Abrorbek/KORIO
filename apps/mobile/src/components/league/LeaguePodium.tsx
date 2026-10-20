import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, type SharedValue } from "react-native-reanimated";
import Svg, { Path, Rect } from "react-native-svg";
import { Pressable } from "@/components/ui/Pressables";
import FriendAvatar from "@/components/friends/FriendAvatar";
import { cinemaAt } from "@/components/cinema/cinema";
import type { ThemeColors } from "@/constants/theme";
import type { LeagueMember } from "@/services/league.service";
import { LEAGUE_TRACK, podiumTracks } from "./leagueCinematic";

/** 금 · 은 · 동 — 블록 면 · 아래 두께 · 숫자 */
export const MEDAL_COLORS = [
  { fill: "#FFC93C", ribbon: "#E5A700", text: "#8A5B00" },
  { fill: "#C9D3DE", ribbon: "#A8B4C2", text: "#5C6875" },
  { fill: "#D19A64", ribbon: "#B07C48", text: "#7A4E1E" },
] as const;

const VIOLET = "#776EE2";
/** 블록 높이 — 1등이 제일 높다 */
const BLOCK_H: Record<1 | 2 | 3, number> = { 1: 96, 2: 72, 3: 56 };
const AVATAR: Record<1 | 2 | 3, number> = { 1: 76, 2: 60, 3: 60 };

interface Props {
  /** 1 · 2 · 3 위 (없으면 그 칸은 비운다) */
  top: LeagueMember[];
  clock: SharedValue<number>;
  theme: ThemeColors;
  xpLabel: (xp: number) => string;
  onPressMember: (member: LeagueMember) => void;
}

/**
 * 시상대 — 1~3위. 왼쪽부터 2 · 1 · 3. 블록은 두툼한 금·은·동 (아래 두께 6px).
 * 들어올 때 2위 · 3위 · 1위 순서로 바닥에서 솟고, 1위 머리 위로 왕관이 반짝 (leagueCinematic).
 * 누르면 그 사람 프로필.
 */
function LeaguePodium({ top, clock, theme, xpLabel, onPressMember }: Props) {
  const byRank = (rank: number) => top.find((m) => m.rank === rank);
  return (
    <View style={styles.row}>
      {([2, 1, 3] as const).map((place) => {
        const member = byRank(place);
        return member ? (
          <PodiumColumn
            key={place}
            place={place}
            member={member}
            clock={clock}
            theme={theme}
            xpLabel={xpLabel}
            onPress={() => onPressMember(member)}
          />
        ) : (
          <View key={place} style={styles.column} />
        );
      })}
    </View>
  );
}

function PodiumColumn({
  place,
  member,
  clock,
  theme,
  xpLabel,
  onPress,
}: {
  place: 1 | 2 | 3;
  member: LeagueMember;
  clock: SharedValue<number>;
  theme: ThemeColors;
  xpLabel: (xp: number) => string;
  onPress: () => void;
}) {
  const medal = MEDAL_COLORS[place - 1];
  const tracks = podiumTracks(place);
  const blockH = BLOCK_H[place];
  const size = AVATAR[place];

  const blockStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - cinemaAt(tracks.block, clock.value)) * (blockH + 8) }],
  }));
  const avatarStyle = useAnimatedStyle(() => {
    const a = cinemaAt(tracks.avatar, clock.value);
    return { opacity: Math.min(1, a * 1.5), transform: [{ translateY: (1 - a) * 24 }, { scale: Math.max(0.001, a) }] };
  });
  const crownStyle = useAnimatedStyle(() => {
    const c = cinemaAt(LEAGUE_TRACK.crown, clock.value);
    return {
      opacity: Math.min(1, c),
      transform: [{ translateY: (1 - c) * -14 }, { rotate: `${(1 - c) * -20}deg` }, { scale: Math.max(0.001, c) }],
    };
  });

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${place}. ${member.nickname}, ${xpLabel(member.xp)}`}
      style={({ pressed }) => [styles.column, pressed && styles.pressed]}
    >
      <Animated.View style={[styles.person, avatarStyle]}>
        {place === 1 ? (
          <Animated.View style={[styles.crown, crownStyle]} pointerEvents="none">
            <Svg width={38} height={30} viewBox="0 0 100 80">
              <Path d="M8 66 L16 20 L36 44 L50 8 L64 44 L84 20 L92 66 Z" fill={medal.fill} stroke={medal.ribbon} strokeWidth={6} strokeLinejoin="round" />
              <Rect x={8} y={62} width={84} height={14} rx={6} fill={medal.ribbon} />
            </Svg>
          </Animated.View>
        ) : null}
        <View
          style={[
            styles.ring,
            {
              width: size + 10,
              height: size + 10,
              borderRadius: (size + 10) / 2,
              borderColor: member.isMe ? VIOLET : medal.fill,
              backgroundColor: theme.surface,
            },
          ]}
        >
          <FriendAvatar
            name={member.nickname}
            avatar={member.isBot ? undefined : member.avatar}
            avatarUri={member.profileImage}
            size={size}
          />
        </View>
        <Text style={[styles.name, { color: member.isMe ? VIOLET : theme.text }]} numberOfLines={1}>
          {member.nickname}
        </Text>
        <Text style={[styles.xp, { color: theme.textSecondary }]} numberOfLines={1}>
          {xpLabel(member.xp)}
        </Text>
      </Animated.View>

      {/* 바닥에서 솟는 블록 — 이 칸 밖으로는 안 보이게 잘라 둔다 */}
      <View style={[styles.floor, { height: blockH + 6 }]}>
        <Animated.View
          style={[
            styles.block,
            { height: blockH + 6, backgroundColor: medal.fill, borderBottomColor: medal.ribbon },
            blockStyle,
          ]}
        >
          <Text style={[styles.place, { color: medal.text }]}>{place}</Text>
        </Animated.View>
      </View>
    </Pressable>
  );
}

export default memo(LeaguePodium);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    gap: 8,
  },
  column: { flex: 1, alignItems: "center", justifyContent: "flex-end" },
  pressed: { opacity: 0.8, transform: [{ scale: 0.97 }] },
  person: { alignItems: "center", marginBottom: 8, width: "100%" },
  crown: { marginBottom: -6, zIndex: 2 },
  ring: { borderWidth: 3, alignItems: "center", justifyContent: "center" },
  name: { marginTop: 6, fontSize: 14, fontWeight: "900", maxWidth: "100%" },
  xp: { marginTop: 1, fontSize: 12, fontWeight: "800" },
  floor: { width: "100%", overflow: "hidden", justifyContent: "flex-end" },
  block: {
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 6,
    alignItems: "center",
    paddingTop: 8,
  },
  place: { fontSize: 30, fontWeight: "900" },
});
