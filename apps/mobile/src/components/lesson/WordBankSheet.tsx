import { ReactNode } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { LessonQuestion } from "@/types/lesson";

/**
 * 인라인 단어 뱅크로 감당 가능한 한계.
 * 이보다 많으면 뱅크를 바텀시트로 내려서 답 영역이 밀리지 않게 한다.
 */
export const INLINE_BANK_LIMIT = 9;
const LONG_ANSWER_WORDS = 6;

/**
 * 레벨이 올라 칩이 많아졌는지 (뱅크를 시트로 내려야 하는지).
 * 세로가 짧은 기기(compact)에서는 더 일찍 시트로 내려서
 * 답 영역과 확인 버튼이 밀리지 않게 한다.
 */
export function isLongBank(question: LessonQuestion, compact = false): boolean {
  const chipLimit = compact ? 6 : INLINE_BANK_LIMIT;
  const wordLimit = compact ? 4 : LONG_ANSWER_WORDS;
  return (
    (question.options?.length ?? 0) > chipLimit ||
    (question.answer?.split(" ").length ?? 0) > wordLimit
  );
}

interface HintProps {
  onPress: () => void;
  theme: ThemeColors;
}

/** 시트가 닫혀 있을 때 뱅크 자리에 뜨는 "탭해서 열기" 힌트 */
export function WordBankHint({ onPress, theme }: HintProps) {
  const { t } = useTranslation();
  return (
    <Pressable style={s.hint} onPress={onPress}>
      <Ionicons name="chevron-up" size={18} color={theme.textSecondary} />
      <Text style={[s.hintText, { color: theme.textSecondary }]}>
        {t("lesson.tapToOpenWordBank")}
      </Text>
    </Pressable>
  );
}

interface Props {
  visible: boolean;
  onClose: () => void;
  theme: ThemeColors;
  children: ReactNode;
}

/**
 * 칩이 많을 때 쓰는 슬라이드업 단어장.
 * 답 영역은 뒤에 그대로 보이고, 배경을 누르면 닫힌다.
 *
 * RN Modal 은 앱 루트 밖에 렌더되므로 제스처가 먹으려면
 * 자체 GestureHandlerRootView 로 감싸야 한다.
 */
export default function WordBankSheet({
  visible,
  onClose,
  theme,
  children,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={s.wrap}>
          <Pressable style={{ flex: 1 }} onPress={onClose} />
          <Animated.View
            entering={SlideInDown.springify().damping(18).mass(0.8)}
            style={[s.sheet, { backgroundColor: theme.surface }]}
          >
            <View style={[s.grabber, { backgroundColor: theme.border }]} />
            <View style={s.chipRow}>{children}</View>
          </Animated.View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const s = StyleSheet.create({
  hint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 18,
  },
  hintText: { fontSize: 15, fontWeight: "600" },
  wrap: { flex: 1, justifyContent: "flex-end" },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 16,
  },
  grabber: {
    alignSelf: "center",
    width: 40,
    height: 5,
    borderRadius: 99,
    marginBottom: 16,
  },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
});
