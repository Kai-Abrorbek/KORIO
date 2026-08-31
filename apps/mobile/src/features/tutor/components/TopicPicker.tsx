import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { TutorApi, type TutorTopicCard } from "../services/tutor.api";

/**
 * 주제 고르기.
 *
 * 유저가 얼어붙는 첫 번째 이유가 "무슨 말을 하지?" 라서, 시작 전에 무엇을
 * 할지부터 정하게 한다. 자유 대화도 남겨두지만 기본은 주제를 고르는 쪽이다.
 */
export function TopicPicker({
  onPick,
  onFreeTalk,
}: {
  onPick: (topic: TutorTopicCard) => void;
  onFreeTalk: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);
  const [topics, setTopics] = useState<TutorTopicCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TutorApi.topics()
      .then((r) => setTopics(r.topics ?? []))
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={s.center}>
        <ActivityIndicator color={theme.primary} />
      </View>
    );
  }

  const groups: { key: "daily" | "korea"; items: TutorTopicCard[] }[] = [
    { key: "korea", items: topics.filter((x) => x.category === "korea") },
    { key: "daily", items: topics.filter((x) => x.category === "daily") },
  ];

  return (
    <ScrollView
      contentContainerStyle={s.wrap}
      showsVerticalScrollIndicator={false}
    >
      <Pressable style={s.freeCard} onPress={onFreeTalk}>
        <View style={s.freeIcon}>
          <Ionicons name="chatbubbles" size={20} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.freeTitle}>{t("tutor.freeTalk")}</Text>
          <Text style={s.freeBlurb}>{t("tutor.freeTalkBlurb")}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
      </Pressable>

      {groups.map(
        (g, gi) =>
          g.items.length > 0 && (
            <View key={g.key} style={s.group}>
              <Text style={s.groupTitle}>{t(`tutor.topicGroup.${g.key}`)}</Text>
              <View style={s.grid}>
                {g.items.map((topic, i) => (
                  <Animated.View
                    key={topic.id}
                    entering={FadeInDown.delay(gi * 60 + i * 30).duration(260)}
                    style={s.cell}
                  >
                    <Pressable
                      style={s.card}
                      onPress={() => onPick(topic)}
                    >
                      <View
                        style={[s.cardIcon, { backgroundColor: topic.color }]}
                      >
                        <Ionicons
                          name={topic.icon as any}
                          size={19}
                          color="#fff"
                        />
                      </View>
                      <Text style={s.cardTitle} numberOfLines={1}>
                        {topic.title}
                      </Text>
                      <Text style={s.cardBlurb} numberOfLines={2}>
                        {topic.blurb}
                      </Text>
                      <View style={s.cardFoot}>
                        <Text style={s.cardCount}>
                          {t("tutor.expressionCount", {
                            count: topic.expressionCount,
                          })}
                        </Text>
                      </View>
                    </Pressable>
                  </Animated.View>
                ))}
              </View>
            </View>
          ),
      )}
    </ScrollView>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    wrap: { padding: 20, paddingBottom: 40, gap: 22 },

    freeCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 18,
      padding: 14,
    },
    freeIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    freeTitle: { fontSize: 16, fontWeight: "800", color: theme.text },
    freeBlurb: {
      fontSize: 12.5,
      color: theme.textSecondary,
      marginTop: 2,
      fontWeight: "600",
    },

    group: { gap: 12 },
    groupTitle: { fontSize: 15, fontWeight: "900", color: theme.text },
    grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
    cell: { width: "47.5%" },
    card: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 4,
      borderRadius: 16,
      padding: 12,
      minHeight: 132,
      gap: 6,
    },
    cardIcon: {
      width: 36,
      height: 36,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 2,
    },
    cardTitle: { fontSize: 14.5, fontWeight: "800", color: theme.text },
    cardBlurb: {
      fontSize: 12,
      lineHeight: 16,
      color: theme.textSecondary,
      fontWeight: "600",
      flex: 1,
    },
    cardFoot: { flexDirection: "row", alignItems: "center" },
    cardCount: {
      fontSize: 11,
      fontWeight: "800",
      color: theme.primary,
    },
  });
