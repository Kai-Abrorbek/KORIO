import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import Animated, { SlideInDown, FadeIn } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { RoadmapUnit } from "@/types/roadmap";

interface Props {
  unit: RoadmapUnit;
  onStart: () => void;
  onCancel: () => void;
}

export default function JumpTestModal({ unit, onStart, onCancel }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);

  return (
    <Modal visible transparent animationType="none" onRequestClose={onCancel}>
      <Animated.View entering={FadeIn.duration(180)} style={s.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        <Animated.View entering={SlideInDown.duration(260)} style={s.sheet}>
          <View style={s.handle} />

          <View style={s.flagRow}>
            <Text style={s.flag}>🇺🇸</Text>
            <Text style={s.unitNum}>{unit.unitNumber}</Text>
          </View>

          <Text style={s.title}>
            {t("roadmap.jumpTitle", { unit: unit.unitNumber })}
          </Text>

          <TouchableOpacity
            style={s.startBtn}
            activeOpacity={0.9}
            onPress={onStart}
          >
            <Text style={s.startText}>{t("roadmap.jumpStart")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.laterBtn}
            activeOpacity={0.8}
            onPress={onCancel}
          >
            <Text style={s.laterText}>{t("roadmap.jumpLater")}</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    sheet: {
      backgroundColor: theme.bg,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 34,
      alignItems: "center",
    },
    handle: {
      width: 44,
      height: 5,
      borderRadius: 3,
      backgroundColor: theme.border,
      marginBottom: 24,
    },
    flagRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 20,
    },
    flag: { fontSize: 44 },
    unitNum: { fontSize: 52, fontWeight: "900", color: theme.text },
    title: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      textAlign: "center",
      lineHeight: 32,
      marginBottom: 28,
      paddingHorizontal: 10,
    },
    startBtn: {
      backgroundColor: "#1CB0F6",
      borderRadius: 16,
      paddingVertical: 17,
      alignItems: "center",
      width: "100%",
      borderBottomWidth: 4,
      borderColor: "#1899D6",
      marginBottom: 8,
    },
    startText: { color: "#fff", fontSize: 17, fontWeight: "900" },
    laterBtn: { paddingVertical: 16, alignItems: "center", width: "100%" },
    laterText: { color: "#1CB0F6", fontSize: 16, fontWeight: "900" },
  });
