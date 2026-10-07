import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { MONTH_BADGES, monthOf } from "../questMeta";

/**
 * 월간 챌린지 배지 — 달마다 색·그림이 다른 마름모 메달.
 * locked 면 회색 + 자물쇠 (이번 달 아직 못 받음).
 */
export default function QuestBadge({
  month,
  size = 56,
  locked = false,
}: {
  /** "2026-10" */
  month: string;
  size?: number;
  locked?: boolean;
}) {
  const theme = useTheme();
  const meta = MONTH_BADGES[monthOf(month)] ?? MONTH_BADGES[1];
  const face = locked ? theme.border : meta.color;
  const depth = locked ? theme.textSecondary + "55" : meta.dark;
  const inner = size * 0.72;

  return (
    <View style={{ width: size, height: size + 4, alignItems: "center" }}>
      <View
        style={[
          s.diamond,
          {
            width: inner,
            height: inner,
            top: (size - inner) / 2,
            borderRadius: inner * 0.28,
            backgroundColor: depth,
          },
        ]}
      />
      <View
        style={[
          s.diamond,
          {
            width: inner,
            height: inner,
            top: (size - inner) / 2 - 3,
            borderRadius: inner * 0.28,
            backgroundColor: face,
            borderColor: locked ? theme.border : "rgba(255,255,255,0.35)",
          },
        ]}
      >
        {/* 광택 */}
        {!locked ? (
          <View
            style={[
              s.shine,
              { width: inner * 0.5, height: inner * 0.16, borderRadius: inner },
            ]}
          />
        ) : null}
      </View>
      <View style={[s.iconWrap, { width: size, height: size - 3 }]}>
        <Ionicons
          name={locked ? "lock-closed" : meta.icon}
          size={size * 0.38}
          color={locked ? theme.textSecondary : "#FFFFFF"}
        />
      </View>
      {!locked ? (
        <View style={[s.monthTag, { backgroundColor: meta.dark }]}>
          <Text style={s.monthText}>{monthOf(month)}</Text>
        </View>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  diamond: {
    position: "absolute",
    transform: [{ rotate: "45deg" }],
    borderWidth: 1.5,
    borderColor: "transparent",
    overflow: "hidden",
  },
  shine: {
    position: "absolute",
    top: 5,
    left: 6,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  iconWrap: {
    position: "absolute",
    top: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  monthTag: {
    position: "absolute",
    bottom: 0,
    minWidth: 20,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  monthText: { color: "#FFFFFF", fontSize: 9.5, fontWeight: "900" },
});
