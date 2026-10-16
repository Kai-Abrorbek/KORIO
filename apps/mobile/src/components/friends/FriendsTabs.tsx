import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "@/components/ui/Pressables";
import Animated, { useAnimatedStyle, type SharedValue } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { FriendTab } from "@/types/friend";
import { useSegmentTextColor } from "@/components/common/SwipeSlides";

const ACTIVE = "#45B7D1";
const TABS: FriendTab[] = ["following", "followers"];

interface Props {
  value: FriendTab;
  onChange: (t: FriendTab) => void;
  /** 페이저 위치 (0 팔로잉 ~ 1 팔로워) — 밑줄·글자색이 손가락을 따라온다 */
  progress: SharedValue<number>;
}

export default function FriendsTabs({ value, onChange, progress }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [width, setWidth] = useState(0);

  // 끝 탭에서 고무줄로 밖까지 끌려도 밑줄은 끝 칸에서 멈춘다
  const indicatorStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: Math.min(1, Math.max(0, progress.value)) * (width / 2) },
      ],
    }),
    [width],
  );

  return (
    <View
      style={styles.container}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <View style={styles.row}>
        {TABS.map((tab, slot) => (
          <TabButton
            active={value === tab}
            key={tab}
            onPress={() => onChange(tab)}
            progress={progress}
            slot={slot}
            tab={tab}
          />
        ))}
      </View>
      <View style={styles.bottomLine} />
      <Animated.View
        style={[styles.indicator, { width: width / 2 }, indicatorStyle]}
      />
    </View>
  );
}

function TabButton({
  active,
  onPress,
  progress,
  slot,
  tab,
}: {
  active: boolean;
  onPress: () => void;
  progress: SharedValue<number>;
  slot: number;
  tab: FriendTab;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const color = useSegmentTextColor(progress, slot, theme.textSecondary, ACTIVE);
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress} activeOpacity={0.7}>
      <Animated.Text style={[styles.text, active && styles.textActive, color]}>
        {t(`friends.tabs.${tab}`)}
      </Animated.Text>
    </TouchableOpacity>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      position: "relative",
    },
    row: {
      flexDirection: "row",
    },
    tab: {
      flex: 1,
      paddingVertical: 14,
      alignItems: "center",
    },
    text: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    textActive: {
      fontWeight: "800",
    },
    bottomLine: {
      height: 1,
      backgroundColor: theme.border,
    },
    indicator: {
      position: "absolute",
      bottom: 0,
      left: 0,
      height: 3,
      backgroundColor: ACTIVE,
      borderRadius: 2,
    },
  });
