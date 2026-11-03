import { Ionicons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable } from "@/components/ui/Pressables";
import { useTheme } from "@/hooks/useTheme";
import { themes } from "@/constants/theme";
import {
  getDialogPalette,
  getDialogTone,
  type DialogTone,
} from "../../../../../shared/dialog-theme";
import { createDialogStyles } from "./dialog-styles";

export function useDialogTheme() {
  const theme = useTheme();
  return { ...theme, ...getDialogPalette(theme.bg === themes.dark.bg) };
}

export function CenteredModal({
  visible,
  onClose,
  dismissible = true,
  backdropDismissible = dismissible,
  children,
  cardStyle,
  contentStyle,
  maxWidth = 420,
  onShow,
}: {
  visible: boolean;
  onClose: () => void;
  dismissible?: boolean;
  backdropDismissible?: boolean;
  children: ReactNode;
  cardStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  maxWidth?: number;
  onShow?: () => void;
}) {
  const colors = useDialogTheme();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const paddingTop = Math.max(insets.top, 20);
  const paddingBottom = Math.max(insets.bottom, 20);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={() => {
        if (dismissible) onClose();
      }}
      onShow={onShow}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={s.fill}
      >
        <View
          style={[
            s.backdrop,
            { backgroundColor: colors.backdrop, paddingTop, paddingBottom },
          ]}
        >
          <Pressable
            sound={false}
            accessible={false}
            disabled={!backdropDismissible}
            onPress={onClose}
            style={StyleSheet.absoluteFill}
          />
          <View
            accessibilityViewIsModal
            style={[
              s.card,
              {
                backgroundColor: colors.surface,
                maxWidth,
                maxHeight: Math.max(120, height - paddingTop - paddingBottom),
              },
              cardStyle,
            ]}
          >
            <ScrollView
              style={s.scroll}
              contentContainerStyle={[s.content, contentStyle]}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
              showsVerticalScrollIndicator
              indicatorStyle={colors.isDark ? "white" : "black"}
            >
              {children}
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export function DialogButton({
  label,
  onPress,
  variant = "primary",
  disabled,
  loading,
  icon,
  style,
  textStyle,
}: {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}) {
  const colors = useDialogTheme();
  const styles = createDialogStyles(colors);
  const secondary = variant === "secondary";
  const foreground = secondary ? colors.textSecondary : colors.onAction;
  const action = variant === "danger" ? colors.dangerAction : colors.action;
  const pressedColor = variant === "danger" ? colors.dangerDepth : colors.depth;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{
        disabled: Boolean(disabled || loading),
        busy: Boolean(loading),
      }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        secondary ? styles.secondary : styles.primary,
        !secondary && { backgroundColor: pressed ? pressedColor : action },
        {
          opacity: disabled || loading ? 0.55 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={foreground} size="small" />
      ) : icon ? (
        <Ionicons name={icon} size={20} color={foreground} />
      ) : null}
      <Text
        style={[
          secondary ? styles.secondaryText : styles.primaryText,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function DialogIcon({
  name,
  tone = "primary",
  size = 32,
}: {
  name: keyof typeof Ionicons.glyphMap;
  tone?: DialogTone;
  size?: number;
}) {
  const colors = useDialogTheme();
  const look = getDialogTone(colors, tone);
  return (
    <View accessible={false} style={[s.icon, { backgroundColor: look.fill }]}>
      <Ionicons name={name} size={size} color={look.ink} />
    </View>
  );
}

const s = StyleSheet.create({
  fill: { flex: 1 },
  backdrop: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    flexShrink: 1,
    minHeight: 0,
    borderRadius: 26,
    overflow: "hidden",
    shadowColor: "#182034",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.16,
    shadowRadius: 28,
    elevation: 12,
  },
  scroll: { flexGrow: 0, flexShrink: 1, width: "100%" },
  content: { padding: 24, alignItems: "center" },
  icon: {
    width: 76,
    height: 76,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
