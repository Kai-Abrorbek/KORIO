import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { SettingsItem } from "@/types/settings";

interface Props {
  item: SettingsItem;
  /** 예전 등장 애니메이션의 순번. 지금은 안 쓰지만 호출부 호환으로 남긴다 */
  index?: number;
  isLast?: boolean;
  onPress?: (item: SettingsItem) => void;
}

export default function SettingsRow({ item, isLast, onPress }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  // 등장 애니메이션을 뺐다.
  //
  // 행마다 40ms 씩 밀려 들어오면서 damping 14 스프링으로 튕겼다. 행이 열댓
  // 개라 목록 전체가 출렁거려서, 설정을 열 때마다 화면이 흔들리는 것처럼
  // 보였다. 설정은 뭔가를 찾으러 들어오는 화면이지 구경하는 화면이 아니다.

  return (
    <View>
      <TouchableOpacity
        style={[styles.row, !isLast && styles.divider]}
        onPress={() => onPress?.(item)}
        activeOpacity={0.6}
      >
        <View style={[styles.iconBox, { backgroundColor: item.iconBgColor }]}>
          <Ionicons name={item.iconName} size={22} color={item.iconColor} />
        </View>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {t(item.titleKey)}
          </Text>
          <Text style={styles.desc} numberOfLines={1}>
            {t(item.descriptionKey)}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingHorizontal: 20,
      paddingVertical: 14,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    iconBox: {
      width: 44,
      height: 44,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    info: {
      flex: 1,
      gap: 2,
    },
    title: {
      fontSize: 16,
      fontWeight: "800",
      color: theme.text,
    },
    desc: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: "500",
    },
  });
