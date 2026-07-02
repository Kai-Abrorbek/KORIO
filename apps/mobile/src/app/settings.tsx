import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { SETTINGS_SECTIONS, APP_VERSION } from "@/mocks/settings.mock";
import { MOCK_PROFILE } from "@/mocks/profile.mock";
import { SettingsItem } from "@/types/settings";
import SettingsUserCard from "@/components/settings/SettingsUserCard";
import SettingsQuickActions from "@/components/settings/SettingsQuickActions";
import GuestWarningCard from "@/components/settings/GuestWarningCard";
import SettingsSectionCard from "@/components/settings/SettingsSectionCard";
import { useAuthStore } from "@/store/auth.store";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { user } = useAuthStore();

  const handleItemPress = (item: SettingsItem) => {
    if (item.route) {
      router.push(item.route as any);
    } else {
      console.log("settings item:", item.id);
    }
  };

  // 두번째 섹션 인덱스 오프셋 계산
  const firstSectionLength = SETTINGS_SECTIONS[0].items.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/");
            }
          }}
          hitSlop={10}
          activeOpacity={0.7}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("settings.title")}</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topCard}>
          <SettingsUserCard
            name={user?.nickname ?? ""}
            onProfilePress={() => router.push("/profile")}
            onSubscribePress={() => router.push("/(tabs)/premium")}
          />
          <SettingsQuickActions
            onAuthCode={() => console.log("auth code")}
            onFriends={() => router.push("/friends")}
          />
        </View>

        {!user?.nickname && (
          <GuestWarningCard
            onLogin={() => router.push("/auth/login" as any)}
            onSignup={() => router.push("/auth/register" as any)}
          />
        )}

        <Text style={styles.sectionTitle}>{t("settings.title")}</Text>

        <SettingsSectionCard
          items={SETTINGS_SECTIONS[0].items}
          indexOffset={0}
          onItemPress={handleItemPress}
        />

        <SettingsSectionCard
          items={SETTINGS_SECTIONS[1].items}
          indexOffset={firstSectionLength}
          onItemPress={handleItemPress}
        />

        <Text style={styles.versionText}>
          {t("settings.version", { version: APP_VERSION })}
        </Text>
      </ScrollView>
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
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 54,
      paddingHorizontal: 16,
      paddingBottom: 12,
      backgroundColor: theme.bg,
    },
    backBtn: {
      width: 32,
      height: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitle: {
      fontSize: 19,
      fontWeight: "800",
      color: theme.text,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 60,
    },
    topCard: {
      backgroundColor: theme.surface,
      marginBottom: 0,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "800",
      color: theme.text,
      marginHorizontal: 20,
      marginTop: 28,
      marginBottom: 14,
    },
    versionText: {
      textAlign: "center",
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 20,
      fontWeight: "500",
    },
  });
