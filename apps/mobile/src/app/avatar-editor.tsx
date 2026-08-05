import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import AvatarOptionCard from "@/components/avatar/AvatarOptionCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { AVATAR_CATEGORIES } from "@/constants/avatar.catalog";
import { useAvatarEditorStore } from "@/store/avatar-editor.store";
import { useAuthStore } from "@/store/auth.store";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import type { AvatarConfig, AvatarOption } from "@/types/avatar";
import { useEffect, useState } from "react";
import { UserService } from "@/services/user.service";

export default function AvatarEditorScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const [isSaving, setIsSaving] = useState(false);
  const avatar = useAuthStore((state) => state.user?.avatar);
  const updateUser = useAuthStore((state) => state.updateUser);

  const draft = useAvatarEditorStore((state) => state.draft);
  const initial = useAvatarEditorStore((state) => state.initial);
  const selectedCategory = useAvatarEditorStore(
    (state) => state.selectedCategory,
  );
  const startEditing = useAvatarEditorStore((state) => state.startEditing);
  const selectCategory = useAvatarEditorStore((state) => state.selectCategory);
  const setPart = useAvatarEditorStore((state) => state.setPart);
  const reset = useAvatarEditorStore((state) => state.reset);
  const randomize = useAvatarEditorStore((state) => state.randomize);

  const previewScale = useSharedValue(1);
  const previewRotate = useSharedValue(0);

  const category =
    AVATAR_CATEGORIES.find((item) => item.id === selectedCategory) ??
    AVATAR_CATEGORIES[0];

  const cardGap = 10;
  const horizontalPadding = 16;
  const cardSize = Math.min(
    118,
    (width - horizontalPadding * 2 - cardGap * 2) / 3,
  );

  const hasChanges = JSON.stringify(draft) !== JSON.stringify(initial);

  const avatarSignature = JSON.stringify(draft);

  useEffect(() => {
    startEditing(avatar);
  }, [avatar, startEditing]);

  useEffect(() => {
    previewScale.value = withSequence(
      withTiming(0.95, { duration: 70 }),
      withSpring(1, {
        damping: 11,
        stiffness: 210,
      }),
    );

    previewRotate.value = withSequence(
      withTiming(-1.4, { duration: 70 }),
      withSpring(0, {
        damping: 10,
        stiffness: 180,
      }),
    );
  }, [avatarSignature, previewRotate, previewScale]);

  const previewStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: previewScale.value },
      { rotate: `${previewRotate.value}deg` },
    ],
  }));

  const makeCandidate = (option: AvatarOption): AvatarConfig =>
    ({
      ...draft,
      [category.id]: option.id,
    }) as AvatarConfig;

  const handleClose = () => {
    if (isSaving) return;

    if (!hasChanges) {
      router.back();
      return;
    }

    Alert.alert(
      t("avatarEditor.unsavedTitle"),
      t("avatarEditor.unsavedMessage"),
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("avatarEditor.discard"),
          style: "destructive",
          onPress: () => router.back(),
        },
      ],
    );
  };

  const handleCategoryPress = (id: typeof selectedCategory) => {
    void Haptics.selectionAsync();
    selectCategory(id);
  };

  const handleOptionPress = (option: AvatarOption) => {
    void Haptics.selectionAsync();
    setPart(category.id, option.id);
  };

  const handleRandomize = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    randomize();
  };

  const handleReset = () => {
    void Haptics.selectionAsync();
    reset();
  };

  const handleSave = async () => {
    if (isSaving) return;

    setIsSaving(true);

    try {
      const result = await UserService.updateAvatar(draft);

      updateUser({
        avatar: result.avatar,
      });

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      router.back();
    } catch {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      Alert.alert(
        t("avatarEditor.saveFailedTitle"),
        t("avatarEditor.saveFailedMessage"),
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 8,
          },
        ]}
      >
        <TouchableOpacity
          accessibilityLabel={t("avatarEditor.close")}
          activeOpacity={0.7}
          hitSlop={10}
          style={styles.headerButton}
          onPress={handleClose}
        >
          <Ionicons name="close" size={27} color={theme.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{t("avatarEditor.title")}</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={8}
          style={[styles.headerButton, !hasChanges && styles.disabledButton]}
          disabled={!hasChanges}
          onPress={handleReset}
        >
          <Ionicons
            name="arrow-undo"
            size={22}
            color={hasChanges ? theme.text : theme.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: 118 + insets.bottom,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.duration(350)} style={styles.heroOuter}>
          <View style={styles.heroDepth} />

          <LinearGradient
            colors={
              theme.bg === "#15151D"
                ? ["#2C294B", "#222132"]
                : ["#F1EEFF", "#E5F7FF"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.heroOrbLarge} />
            <View style={styles.heroOrbSmall} />

            <View style={styles.freeBadge}>
              <Ionicons name="sparkles" size={14} color="#6B61D8" />

              <Text style={styles.freeBadgeText}>
                {t("avatarEditor.allFree")}
              </Text>
            </View>

            <Animated.View style={previewStyle}>
              <AvatarPreview
                avatar={draft}
                size={Math.min(width * 0.66, 270)}
              />
            </Animated.View>

            <TouchableOpacity
              activeOpacity={0.84}
              style={styles.randomButton}
              onPress={handleRandomize}
            >
              <View style={styles.randomDepth} />

              <View style={styles.randomFace}>
                <Ionicons name="dice-outline" size={20} color="#FFFFFF" />

                <Text style={styles.randomText}>
                  {t("avatarEditor.randomize")}
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).duration(350)}>
          <Text style={styles.subtitle}>{t("avatarEditor.subtitle")}</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          >
            {AVATAR_CATEGORIES.map((item) => {
              const selected = item.id === selectedCategory;

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.82}
                  style={[
                    styles.categoryButton,
                    selected && styles.categoryButtonSelected,
                  ]}
                  onPress={() => handleCategoryPress(item.id)}
                >
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={selected ? "#FFFFFF" : theme.textSecondary}
                  />

                  <Text
                    style={[
                      styles.categoryText,
                      selected && styles.categoryTextSelected,
                    ]}
                  >
                    {t(`avatarEditor.categories.${item.id}`)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Animated.View>

        <Animated.View
          key={category.id}
          entering={FadeInDown.duration(280)}
          style={[
            styles.optionsGrid,
            {
              columnGap: cardGap,
            },
          ]}
        >
          {category.options.map((option) => (
            <AvatarOptionCard
              key={option.id}
              avatar={makeCandidate(option)}
              selected={draft[category.id] === option.id}
              size={cardSize}
              variant={category.preview}
              swatch={option.swatch}
              showBackground={category.id === "background"}
              onPress={() => handleOptionPress(option)}
            />
          ))}
        </Animated.View>
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          {
            paddingBottom: Math.max(insets.bottom, 12),
          },
        ]}
      >
        <PrimaryButton
          label={isSaving ? t("avatarEditor.saving") : t("avatarEditor.save")}
          onPress={handleSave}
          disabled={isSaving}
          color={theme.primary}
          darkColor="#554CB5"
          style={styles.saveButton}
        />
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    header: {
      minHeight: 60,
      paddingHorizontal: 16,
      paddingBottom: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.bg,
      zIndex: 5,
    },
    headerButton: {
      width: 42,
      height: 42,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    disabledButton: {
      opacity: 0.45,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -0.3,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingTop: 4,
    },
    heroOuter: {
      marginHorizontal: 16,
      marginTop: 4,
      marginBottom: 22,
      position: "relative",
    },
    heroDepth: {
      position: "absolute",
      top: 8,
      left: 0,
      right: 0,
      bottom: -7,
      borderRadius: 30,
      backgroundColor: theme.border,
    },
    hero: {
      minHeight: 352,
      borderRadius: 30,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 45,
      paddingBottom: 65,
      borderWidth: 1.5,
      borderColor: theme.bg === "#15151D" ? "#3C385D" : "#FFFFFF",
    },
    heroOrbLarge: {
      position: "absolute",
      top: -65,
      right: -50,
      width: 190,
      height: 190,
      borderRadius: 999,
      backgroundColor: "rgba(119,110,226,0.15)",
    },
    heroOrbSmall: {
      position: "absolute",
      left: -38,
      bottom: -52,
      width: 150,
      height: 150,
      borderRadius: 999,
      backgroundColor: "rgba(66,190,218,0.12)",
    },
    freeBadge: {
      position: "absolute",
      top: 16,
      left: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: "rgba(255,255,255,0.84)",
      borderWidth: 1,
      borderColor: "rgba(119,110,226,0.17)",
    },
    freeBadgeText: {
      color: "#5D54C5",
      fontSize: 12,
      fontWeight: "900",
    },
    randomButton: {
      position: "absolute",
      right: 17,
      bottom: 17,
      minWidth: 116,
      height: 47,
    },
    randomDepth: {
      position: "absolute",
      top: 5,
      left: 0,
      right: 0,
      height: 42,
      borderRadius: 15,
      backgroundColor: "#554CB5",
    },
    randomFace: {
      height: 42,
      borderRadius: 15,
      backgroundColor: theme.primary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      paddingHorizontal: 14,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.2)",
    },
    randomText: {
      fontSize: 13,
      fontWeight: "900",
      color: "#FFFFFF",
    },
    subtitle: {
      marginHorizontal: 20,
      marginBottom: 14,
      fontSize: 16,
      lineHeight: 22,
      fontWeight: "800",
      color: theme.text,
    },
    categoriesContent: {
      paddingHorizontal: 16,
      paddingBottom: 20,
      gap: 8,
    },
    categoryButton: {
      minHeight: 43,
      paddingHorizontal: 14,
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    categoryButtonSelected: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
      shadowColor: theme.primary,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.22,
      shadowRadius: 8,
      elevation: 5,
    },
    categoryText: {
      color: theme.textSecondary,
      fontSize: 13,
      fontWeight: "800",
    },
    categoryTextSelected: {
      color: "#FFFFFF",
    },
    optionsGrid: {
      paddingHorizontal: 16,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      rowGap: 12,
    },
    bottomBar: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 16,
      paddingTop: 12,
      backgroundColor: theme.surface,
      borderTopWidth: 1.5,
      borderTopColor: theme.border,
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: -8,
      },
      shadowOpacity: 0.08,
      shadowRadius: 14,
      elevation: 15,
    },
    saveButton: {
      width: "100%",
    },
  });
