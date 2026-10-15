import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { TITLE_LOOK, isTitle, type TitleRarity } from "@/components/avatar/avatarTitles";

/**
 * 칭호 이름표 — 이름 밑에 붙는 작은 리본 알약. 텔레그램 shared/ui/name-title 과 같다.
 * 등급마다 색만 다르고 움직이지 않는다. 칭호가 없으면 아무것도 안 그린다.
 * - md: 프로필·친구 프로필·에디터 히어로
 * - sm: 리그 줄
 */
const LOOK: Record<TitleRarity, { colors: readonly [string, string]; border: string; text: string }> = {
  common: { colors: ["#F1EEFF", "#F1EEFF"], border: "#DCD6FF", text: "#5D54C5" },
  rare: { colors: ["#E6F5FF", "#CDEAFF"], border: "#A9D8F7", text: "#1474B4" },
  epic: { colors: ["#F4E9FF", "#E3CCFF"], border: "#CFA9F5", text: "#8A35C4" },
  legendary: { colors: ["#FFF1BF", "#FFD45C"], border: "#E2A83A", text: "#7A4C00" },
};

export default function NameTitle({
  title,
  size = "md",
  style,
}: {
  title?: string | null;
  size?: "md" | "sm";
  style?: StyleProp<ViewStyle>;
}) {
  const { t } = useTranslation();
  if (!isTitle(title)) return null;
  const look = LOOK[TITLE_LOOK[title].rarity];
  const sm = size === "sm";
  return (
    <LinearGradient
      colors={look.colors}
      style={[sm ? styles.sm : styles.md, { borderColor: look.border }, style]}
    >
      <Ionicons name="ribbon" size={sm ? 10 : 13} color={look.text} />
      <Text style={[sm ? styles.smText : styles.mdText, { color: look.text }]} numberOfLines={1}>
        {t(`avatarEditor.nameTitle.items.${title}`)}
      </Text>
    </LinearGradient>
  );
}

/** 칭호가 있을 때만 감싸서 가운데 놓는 줄 (프로필 히어로) */
export function NameTitleRow({ title, style }: { title?: string | null; style?: StyleProp<ViewStyle> }) {
  if (!isTitle(title)) return null;
  return (
    <View style={[styles.row, style]}>
      <NameTitle title={title} />
    </View>
  );
}

const styles = StyleSheet.create({
  md: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 999,
    borderWidth: 1.5,
    borderBottomWidth: 3,
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 5,
    alignSelf: "flex-start",
    maxWidth: "100%",
  },
  sm: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 999,
    borderWidth: 1,
    borderBottomWidth: 2,
    paddingHorizontal: 7,
    paddingTop: 3,
    paddingBottom: 2,
    flexShrink: 1,
    minWidth: 0,
  },
  mdText: { fontSize: 13, fontWeight: "900", flexShrink: 1 },
  smText: { fontSize: 10.5, fontWeight: "900", flexShrink: 1 },
  row: { flexDirection: "row", justifyContent: "center" },
});
