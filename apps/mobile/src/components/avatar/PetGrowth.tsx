import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { PET_STAGE_DAYS, PetImage, daysToGrow, petStage, type PaidPet, type PetStage } from "@/components/avatar/AvatarPet";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";

/**
 * 펫이 자라는 세 단계 — 아기 · 꼬마 · 다 큼 (그림 + 며칠부터). 지금 단계에 테두리. 텔레그램 pet-growth 와 같다.
 * 아래 줄: 며칠 더 하면 자라는지 (다 컸으면 끊기면 다시 아기가 된다는 경고).
 */
export default function PetGrowth({ pet, streak }: { pet: PaidPet; streak: number }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = useMemo(() => getStyles(theme), [theme]);
  const stage = petStage(streak);
  const left = daysToGrow(streak);
  return (
    <View style={s.wrap}>
      <View style={s.head}>
        <Text style={s.title}>{t("avatarEditor.pet.growTitle")}</Text>
        <View style={s.streak}>
          <Ionicons name="flame" size={13} color="#FF7A00" />
          <Text style={s.streakText}>{t("avatarEditor.pet.streakNow", { n: streak })}</Text>
        </View>
      </View>
      <View style={s.stages}>
        {([0, 1, 2] as PetStage[]).map((st) => {
          const now = st === stage;
          return (
            <View key={st} style={[s.stage, now && s.now]}>
              <PetImage pet={pet} stage={st} size={56} dim={st > stage} />
              <Text style={[s.stageName, now && { color: theme.primary }]}>{t(`avatarEditor.pet.stages.s${st}`)}</Text>
              <Text style={s.stageAt}>{t("avatarEditor.pet.stageAt", { n: PET_STAGE_DAYS[st] })}</Text>
            </View>
          );
        })}
      </View>
      <Text style={s.note}>
        {left === null ? t("avatarEditor.pet.grownUp") : t("avatarEditor.pet.growNext", { n: left })}
      </Text>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderColor: theme.border,
      borderRadius: 18,
      paddingHorizontal: 12,
      paddingTop: 12,
      paddingBottom: 10,
    },
    head: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
    title: { color: theme.text, fontSize: 13.5, fontWeight: "900" },
    streak: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      borderRadius: 999,
      paddingHorizontal: 9,
      paddingVertical: 4,
      backgroundColor: "#FF7A0021",
    },
    streakText: { color: "#FF7A00", fontSize: 12, fontWeight: "900" },
    stages: { flexDirection: "row", gap: 8 },
    stage: {
      flex: 1,
      alignItems: "center",
      borderRadius: 14,
      borderWidth: 2,
      borderColor: theme.border,
      backgroundColor: theme.bg,
      paddingTop: 6,
      paddingBottom: 7,
    },
    now: { borderColor: theme.primary, backgroundColor: theme.primary + "17" },
    stageName: { color: theme.text, fontSize: 12, fontWeight: "900", marginTop: 2 },
    stageAt: { color: theme.textSecondary, fontSize: 11, fontWeight: "800" },
    note: { color: theme.textSecondary, fontSize: 12, lineHeight: 17, fontWeight: "800", marginTop: 9, marginHorizontal: 2 },
  });
