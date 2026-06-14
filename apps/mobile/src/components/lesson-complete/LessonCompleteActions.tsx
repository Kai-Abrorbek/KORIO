import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  showShare?: boolean;
  onShare?: () => void;
  onClaim?: () => void;
}

export default function LessonCompleteActions({
  showShare = true,
  onShare,
  onClaim,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.row}>
      {showShare && (
        <TouchableOpacity
          style={styles.shareBtn}
          onPress={onShare}
          activeOpacity={0.8}
        >
          <Ionicons name="share-outline" size={26} color="#1FA9F7" />
        </TouchableOpacity>
      )}

      <View style={styles.claimWrap}>
        <PrimaryButton
          label={t("lessonComplete.claim")}
          onPress={onClaim}
          color="#1FA9F7"
          darkColor="#1899D6"
        />
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      gap: 12,
      paddingHorizontal: 16,
      paddingBottom: 28,
      paddingTop: 14,
      alignItems: "center",
    },
    shareBtn: {
      width: 56,
      height: 56,
      borderRadius: 14,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    claimWrap: {
      flex: 1,
    },
  });
