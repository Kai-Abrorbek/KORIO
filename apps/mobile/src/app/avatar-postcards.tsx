import { useMemo } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import AvatarPet from "@/components/avatar/AvatarPet";
import { SceneBackdrop, SCENE_LOOK, isScene } from "@/components/avatar/AvatarScene";
import { useAuthStore } from "@/store/auth.store";
import { useAvatarStudyStore, type AvatarPostcard } from "@/store/avatar-study.store";
import { useTheme } from "@/hooks/useTheme";

export default function AvatarPostcardsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const userId = useAuthStore((state) => state.user?.id);
  const postcards = useAvatarStudyStore((state) => state.postcards);
  const mine = useMemo(
    () => (postcards ?? []).filter((item) => item.userId === userId),
    [postcards, userId],
  );
  const cardWidth = Math.min(width - 36, 460);

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityLabel={t("common.back")}
          onPress={() => router.back()}
          style={[styles.back, { borderColor: theme.border, backgroundColor: theme.surface }]}
        >
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerCopy}>
          <Text style={[styles.title, { color: theme.text }]}>{t("avatarPostcards.title")}</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {t("avatarPostcards.count", { n: mine.length })}
          </Text>
        </View>
      </View>
      <Text style={[styles.notice, { color: theme.textSecondary }]}>{t("avatarPostcards.localNotice")}</Text>
      <FlatList
        data={mine}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 24 }]}
        renderItem={({ item }) => <PostcardCard item={item} width={cardWidth} />}
        ListEmptyComponent={
          <View style={[styles.empty, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Ionicons name="images-outline" size={42} color={theme.primary} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>{t("avatarPostcards.emptyTitle")}</Text>
            <Text style={[styles.emptyBody, { color: theme.textSecondary }]}>{t("avatarPostcards.emptyBody")}</Text>
          </View>
        }
      />
    </View>
  );
}

function PostcardCard({ item, width }: { item: AvatarPostcard; width: number }) {
  const { t } = useTranslation();
  if (!isScene(item.scene)) return null;
  const scene = SCENE_LOOK[item.scene];
  const avatarSize = Math.min(width * 0.64, 225);
  const title = t(`avatarEditor.scene.items.${item.scene}.name`);
  return (
    <View style={[styles.card, { width }]}>
      <LinearGradient colors={[scene.from, scene.to]} style={styles.picture}>
        <SceneBackdrop scene={item.scene} />
        <View style={[styles.avatar, { width: avatarSize, height: avatarSize }]}>
          <AvatarPreview avatar={item.avatar} size={avatarSize} showBackground={false} />
          <AvatarPet pet={item.avatar.pet} streak={item.streak ?? 0} avatarSize={avatarSize} />
        </View>
        <View style={styles.stamp}>
          <Ionicons name="location" size={13} color="#6B48A3" />
          <Text style={styles.stampText}>{title}</Text>
        </View>
      </LinearGradient>
      <View style={styles.caption}>
        <View style={styles.captionLeft}>
          <Text style={styles.cardTitle}>{title}</Text>
          {item.word ? (
            <Text style={styles.word} numberOfLines={2}>
              {item.word}{item.meaning ? `  ·  ${item.meaning}` : ""}
            </Text>
          ) : <Text style={styles.word}>{t("avatarPostcards.memory")}</Text>}
        </View>
        <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", gap: 13, paddingHorizontal: 18, paddingTop: 14, paddingBottom: 18 },
  back: { width: 42, height: 42, borderRadius: 15, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  headerCopy: { flex: 1 },
  title: { fontSize: 24, fontWeight: "900" },
  subtitle: { fontSize: 13, fontWeight: "600", marginTop: 2 },
  list: { paddingHorizontal: 18, alignItems: "center", gap: 20 },
  notice: { paddingHorizontal: 20, paddingBottom: 14, fontSize: 12, lineHeight: 18 },
  empty: { width: "100%", padding: 28, borderWidth: 1, borderRadius: 24, alignItems: "center", gap: 10, marginTop: 28 },
  emptyTitle: { fontSize: 17, fontWeight: "900", textAlign: "center" },
  emptyBody: { fontSize: 13, lineHeight: 21, textAlign: "center" },
  card: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 10, shadowColor: "#352C6F", shadowOpacity: 0.12, shadowRadius: 14, shadowOffset: { width: 0, height: 6 }, elevation: 5 },
  picture: { height: 285, borderRadius: 13, overflow: "hidden", alignItems: "center", justifyContent: "flex-end" },
  avatar: { marginBottom: 8 },
  stamp: { position: "absolute", top: 12, left: 12, flexDirection: "row", alignItems: "center", gap: 3, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.91)" },
  stampText: { color: "#593D8B", fontSize: 11, fontWeight: "800" },
  caption: { flexDirection: "row", justifyContent: "space-between", gap: 8, paddingHorizontal: 8, paddingTop: 13, paddingBottom: 6 },
  captionLeft: { flex: 1 },
  cardTitle: { color: "#2D2857", fontSize: 16, fontWeight: "900" },
  word: { color: "#777095", fontSize: 12, marginTop: 3, lineHeight: 17 },
  date: { color: "#A6A0B9", fontSize: 11, fontWeight: "700", marginTop: 3 },
});
