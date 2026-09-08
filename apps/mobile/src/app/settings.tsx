import { useState } from "react";
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
import { SettingsItem } from "@/types/settings";
import SettingsUserCard from "@/components/settings/SettingsUserCard";
import SettingsQuickActions from "@/components/settings/SettingsQuickActions";
import GuestWarningCard from "@/components/settings/GuestWarningCard";
import SettingsSectionCard from "@/components/settings/SettingsSectionCard";
import { useAuthStore } from "@/store/auth.store";
import InviteCodeSheet from "@/components/settings/InviteCodeSheet";
import { useTourStore } from "@/features/tour/tour.store";
import { HOME_TOUR } from "@/features/tour/tours";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme);
  const { user } = useAuthStore();
  const [codeOpen, setCodeOpen] = useState(false);
  const requestTour = useTourStore((s) => s.requestTour);

  const handleItemPress = (item: SettingsItem) => {
    // 기능 안내는 화면 이동이 아니다. 홈으로 보내고 거기서 켜야 한다.
    //
    // ⚠️ replace 를 쓰면 안 된다. 스택에 이미 있는 홈 위에 **홈을 하나 더**
    // 쌓아서, 같은 tourId 를 가진 TourTarget 이 두 벌 살아 서로 다른 좌표를
    // 번갈아 써넣는다 (말풍선이 떨었던 원인). navigate 는 이미 있는 화면으로
    // 되돌아간다.
    //
    // 투어도 여기서 바로 켜지 않는다 — 아직 설정 화면 위라, 홈으로 넘어가는
    // 동안 화면이 움직여서 구멍이 따라다닌다. 예약만 하고 홈이 포커스를
    // 잡은 뒤 스스로 꺼내 쓰게 한다.
    if (item.id === "tourReplay") {
      requestTour(HOME_TOUR);
      router.navigate("/(tabs)");
      return;
    }
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
            avatar={user?.avatar}
            onProfilePress={() => router.push("/profile")}
            onSubscribePress={() => router.push("/(tabs)/premium")}
          />
          <SettingsQuickActions
            onAuthCode={() => setCodeOpen(true)}
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

      {/* "Kod" 를 누르면 올라오는 내 초대 코드 (복사 · 공유) */}
      <InviteCodeSheet visible={codeOpen} onClose={() => setCodeOpen(false)} />
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
