import { View, StyleSheet } from "react-native";
import Svg, {
  Polygon,
  Defs,
  LinearGradient as SvgGrad,
  Stop,
  Ellipse,
  Path,
} from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import { TierMeta, LOCKED_TIER } from "@/constants/league-tiers";

interface Props {
  tier: TierMeta;
  locked?: boolean;
  size?: number;
  active?: boolean;
}

export default function TierCrystal({
  tier,
  locked = false,
  size = 110,
  active = false,
}: Props) {
  const c = locked ? LOCKED_TIER : tier;
  const rot = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (locked || !tier.glow) return;
    rot.value = withRepeat(
      withTiming(360, { duration: 12000, easing: Easing.linear }),
      -1,
    );
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 1100 }),
        withTiming(1, { duration: 1100 }),
      ),
      -1,
    );
  }, [locked, tier.key]);

  const rayStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rot.value}deg` }],
  }));
  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: 0.35,
  }));

  // 면 개수만큼 다각형 생성 (화려함)
  const cx = 50,
    cy = 42,
    r = 34;
  const points = Array.from({ length: tier.facets * 2 })
    .map((_, i) => {
      const ang = (Math.PI * 2 * i) / (tier.facets * 2) - Math.PI / 2;
      const rr = i % 2 === 0 ? r : r * 0.62;
      return `${cx + Math.cos(ang) * rr},${cy + Math.sin(ang) * rr}`;
    })
    .join(" ");

  return (
    <View
      style={{
        width: size,
        height: size * 1.15,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 광선 */}
      {!locked && tier.rays > 0 && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            rayStyle,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          {Array.from({ length: tier.rays }).map((_, i) => (
            <View
              key={i}
              style={{
                position: "absolute",
                width: 3,
                height: size * 0.75,
                backgroundColor: c.colorLight,
                opacity: 0.35,
                transform: [{ rotate: `${(360 / tier.rays) * i}deg` }],
              }}
            />
          ))}
        </Animated.View>
      )}

      {/* 글로우 */}
      {!locked && tier.glow && (
        <Animated.View
          style={[
            {
              position: "absolute",
              width: size * 0.9,
              height: size * 0.9,
              borderRadius: size,
              backgroundColor: c.color,
            },
            glowStyle,
          ]}
        />
      )}

      <Svg width={size} height={size * 1.15} viewBox="0 0 100 115">
        <Defs>
          <SvgGrad id={`g-${tier.key}-${locked}`} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={c.colorLight} />
            <Stop offset="0.5" stopColor={c.color} />
            <Stop offset="1" stopColor={c.colorDark} />
          </SvgGrad>
        </Defs>

        {/* 받침 */}
        <Ellipse
          cx="50"
          cy="103"
          rx="30"
          ry="8"
          fill={locked ? "#DDE2E7" : "#CFE3F2"}
        />
        <Path d="M42 78 L58 78 L54 98 L46 98 Z" fill={c.colorDark} />

        {/* 크리스탈 본체 */}
        <Polygon
          points={points}
          fill={`url(#g-${tier.key}-${locked})`}
          stroke={c.colorDark}
          strokeWidth="2.5"
        />
        {/* 내부 하이라이트 (화려함) */}
        {!locked && (
          <Polygon
            points={`${cx},${cy - r * 0.8} ${cx + r * 0.3},${cy} ${cx},${cy + r * 0.4} ${cx - r * 0.3},${cy}`}
            fill="#fff"
            opacity={0.35}
          />
        )}
      </Svg>

      {/* 잠금 아이콘 */}
      {locked && (
        <View style={{ position: "absolute", top: size * 0.3 }}>
          <Ionicons name="lock-closed" size={size * 0.22} color="#fff" />
        </View>
      )}
    </View>
  );
}
