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
import OwlMascot from "@/components/lesson/OwlMascot";

interface Props {
  visible: boolean;
  onContinue: () => void; // 계속 학습
  onQuit: () => void; // 그만하기
}

export default function QuitLessonModal({
  visible,
  onContinue,
  onQuit,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onContinue}
    >
      {/* 어두운 배경 (탭하면 계속) */}
      <Animated.View entering={FadeIn.duration(180)} style={s.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onContinue} />

        {/* 바텀 시트 */}
        <Animated.View entering={SlideInDown.duration(260)} style={s.sheet}>
          <View style={s.handle} />

          <View style={s.mascot}>
            <OwlMascot state="idle" size={150} />
          </View>

          <Text style={s.title}>{t("lesson.quitTitle")}</Text>

          <TouchableOpacity
            style={s.continueBtn}
            activeOpacity={0.9}
            onPress={onContinue}
          >
            <Text style={s.continueText}>{t("lesson.quitContinue")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.quitBtn}
            activeOpacity={0.8}
            onPress={onQuit}
          >
            <Text style={s.quitText}>{t("lesson.quitLeave")}</Text>
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
      marginBottom: 20,
    },
    mascot: {
      marginBottom: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "900",
      color: theme.text,
      textAlign: "center",
      lineHeight: 34,
      marginBottom: 28,
      paddingHorizontal: 10,
    },
    continueBtn: {
      backgroundColor: "#1CB0F6",
      borderRadius: 16,
      paddingVertical: 17,
      alignItems: "center",
      width: "100%",
      borderBottomWidth: 4,
      borderColor: "#1899D6",
      marginBottom: 8,
    },
    continueText: { color: "#fff", fontSize: 17, fontWeight: "900" },
    quitBtn: { paddingVertical: 16, alignItems: "center", width: "100%" },
    quitText: { color: "#FF4B4B", fontSize: 16, fontWeight: "900" },
  });
