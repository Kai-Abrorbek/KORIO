import { useCallback, useEffect, useState } from "react";
import { AppState, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import {
  CenteredModal,
  DialogButton,
  DialogIcon,
  useDialogTheme,
} from "@/components/common/CenteredModal";
import { useAuthHydrated } from "@/hooks/useAuthGuard";
import { useAuthStore } from "@/store/auth.store";
import { useSettingsStore } from "@/store/settings.store";
import { UserService } from "@/services/user.service";
import {
  AdminReward,
  RewardInboxService,
} from "@/services/reward-inbox.service";

/** 지급은 이미 완료됐다. 이 모달은 사용자가 그 사실을 확인하도록 한 번씩 보여준다. */
export default function AdminRewardPrompt() {
  const { t } = useTranslation();
  const theme = useDialogTheme();
  const hydrated = useAuthHydrated();
  const userId = useAuthStore((s) => s.user?.id);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const language = useSettingsStore((s) => s.language);
  const contentLanguage = useSettingsStore((s) => s.contentLanguage);
  const [settingsHydrated, setSettingsHydrated] = useState(() =>
    useSettingsStore.persist.hasHydrated(),
  );
  const [items, setItems] = useState<AdminReward[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const blockedByLanguagePrompt =
    !settingsHydrated || (language === "ko" && contentLanguage === null);

  useEffect(() => {
    if (settingsHydrated) return;
    return useSettingsStore.persist.onFinishHydration(() =>
      setSettingsHydrated(true),
    );
  }, [settingsHydrated]);

  const load = useCallback(async () => {
    if (!hydrated || !isLoggedIn || !userId) return;
    try {
      const response = await RewardInboxService.pending();
      if (useAuthStore.getState().user?.id !== userId) return;
      setItems(response.items);
      if (response.items.length) {
        void UserService.getMe()
          .then((me) => {
            if (useAuthStore.getState().user?.id === userId) {
              useAuthStore.getState().updateUser({
                gems: me.gems,
                energy: me.energy,
                streakFreeze: me.streakFreeze,
                isSuper: me.isSuper,
                superTier: me.superTier,
                superPlan: me.superPlan,
                superExpiresAt: me.superExpiresAt,
              });
            }
          })
          .catch(() => undefined);
      }
    } catch {
      // 읽기 실패는 수령 처리하지 않는다. 다음 접속에서 다시 조회한다.
    }
  }, [hydrated, isLoggedIn, userId]);

  useEffect(() => {
    if (!hydrated || !isLoggedIn || !userId) {
      setItems([]);
      return;
    }
    void load();
    const listener = AppState.addEventListener("change", (state) => {
      if (state === "active") void load();
    });
    return () => listener.remove();
  }, [hydrated, isLoggedIn, userId, load]);

  const current = items[0];
  const acknowledge = async () => {
    if (!current || saving) return;
    setSaving(true);
    setError(false);
    try {
      const result = await RewardInboxService.acknowledge(current.id);
      if (!result.acknowledged) throw new Error("REWARD_ACKNOWLEDGE_FAILED");
      setItems((previous) => previous.filter((item) => item.id !== current.id));
      if (items.length === 1) void load();
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <CenteredModal
      visible={!!current && !blockedByLanguagePrompt}
      dismissible={false}
      onClose={() => undefined}
    >
      <DialogIcon name="gift" tone="warning" />
      <Text style={[styles.title, { color: theme.text }]}>
        {t("rewardInbox.title")}
      </Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        {t("rewardInbox.subtitle")}
      </Text>
      {current && (
        <View style={[styles.reward, { backgroundColor: theme.pinkWash }]}>
          <Text style={[styles.rewardText, { color: theme.onPink }]}>
            {t(`rewardInbox.${current.kind}`, { amount: current.amount })}
          </Text>
        </View>
      )}
      {error && (
        <Text
          accessibilityRole="alert"
          style={[styles.error, { color: theme.error }]}
        >
          {t("rewardInbox.error")}
        </Text>
      )}
      <DialogButton
        label={t("rewardInbox.confirm")}
        loading={saving}
        disabled={saving}
        onPress={() => void acknowledge()}
      />
    </CenteredModal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: { fontSize: 14, textAlign: "center", marginTop: 9, lineHeight: 21 },
  reward: {
    marginTop: 22,
    marginBottom: 22,
    paddingHorizontal: 22,
    paddingVertical: 17,
    borderRadius: 18,
    alignSelf: "stretch",
    alignItems: "center",
  },
  rewardText: { fontSize: 18, fontWeight: "800", textAlign: "center" },
  error: { textAlign: "center", marginBottom: 12 },
});
