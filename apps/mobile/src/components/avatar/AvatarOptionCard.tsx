import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import type { AvatarConfig } from "@/types/avatar";

interface Props {
  avatar: AvatarConfig;
  selected: boolean;
  size: number;
  variant: "full" | "head";
  swatch?: string;
  showBackground?: boolean;
  onPress: () => void;
}

export default function AvatarOptionCard({
  avatar,
  selected,
  size,
  variant,
  swatch,
  showBackground = false,
  onPress,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.depth,
        {
          width: size,
          height: size + 5,
          backgroundColor: selected ? "#554CB5" : theme.border,
        },
        animatedStyle,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.94, {
            damping: 14,
            stiffness: 280,
          });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, {
            damping: 13,
            stiffness: 240,
          });
        }}
        style={[
          styles.card,
          {
            width: size,
            height: size,
            borderColor: selected ? theme.primary : theme.border,
          },
        ]}
      >
        <View style={styles.preview}>
          <AvatarPreview
            avatar={avatar}
            size={size * 0.84}
            variant={variant}
            showBackground={showBackground}
          />
        </View>

        {swatch && (
          <View
            style={[
              styles.swatch,
              {
                backgroundColor: swatch,
                borderColor: theme.surface,
              },
            ]}
          />
        )}

        {selected && (
          <View style={styles.check}>
            <Ionicons name="checkmark" size={15} color="#FFFFFF" />
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    depth: {
      borderRadius: 19,
      marginBottom: 5,
    },
    card: {
      borderRadius: 19,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.surface,
      borderWidth: 2,
    },
    preview: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    swatch: {
      position: "absolute",
      left: 8,
      bottom: 8,
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 2,
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 3,
    },
    check: {
      position: "absolute",
      top: 7,
      right: 7,
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary,
      borderWidth: 2,
      borderColor: "#FFFFFF",
    },
  });
