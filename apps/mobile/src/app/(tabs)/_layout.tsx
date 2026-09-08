import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TAB_BAR_HEIGHT } from "@/constants/layout";

export default function TabsLayout() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      key={i18n.language}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: insets.bottom,
          height: TAB_BAR_HEIGHT + insets.bottom,
          position: "absolute",
          bottom: 0,
        },
        tabBarActiveTintColor: "#776ee2",
        tabBarInactiveTintColor: "#C4BEF0",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("navTabs.home"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: t("navTabs.stats"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="league"
        options={{
          title: t("navTabs.league"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="premium"
        options={{
          title: t("navTabs.premium"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ribbon" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
