import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import * as Contacts from "expo-contacts";
import * as Haptics from "@/utils/haptics";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { UserService } from "@/services/user.service";
import { ReferralApi } from "@/services/referral.service";
import { useAuthStore } from "@/store/auth.store";
import { PHONE_COUNTRIES, countryOf } from "@/constants/phone-countries";
import { guessIso, hashContacts, hashPhone, toE164 } from "@/utils/phone";
import SuggestionList from "@/components/friends/SuggestionList";
import { SuggestionItem } from "@/components/friends/SuggestionRow";

type Stage = "needPhone" | "loading" | "denied" | "ready";

interface Invitable {
  name: string;
  e164: string;
}

/**
 * 연락처로 친구 찾기.
 *
 * 예전 버전은 연락처 **이름**을 서버로 보내 닉네임과 정규식으로 맞춰봤다.
 * 거의 안 맞았고(연락처 "엄마" vs 닉네임 "haneul22"), 아무 이름이나 던져
 * 가입자를 훑을 수 있는 구멍이기도 했다.
 *
 * 지금은 전화번호 기준이다. 앱이 번호를 E.164 로 정규화하고 **해시만** 보낸다.
 * 서버는 상대의 전화번호부를 원본으로 받지 않고, 우리 유저의 번호도 해시와
 * 뒷 4자리만 저장한다.
 *
 * 매칭되려면 **나도 번호를 등록해야** 한다. 그래야 내 친구들 화면에도 내가
 * 뜬다 — 이건 서로 등록해야 성립하는 기능이라 첫 화면에서 그걸 먼저 받는다.
 */
export default function ContactsFriendsScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const isDark = theme.bg.toLowerCase() === "#15151d";
  const s = styles(theme, isDark);

  const user = useAuthStore((st) => st.user);
  const updateUser = useAuthStore((st) => st.updateUser);
  const defaultIso = useMemo(() => guessIso(user?.country), [user?.country]);

  const [stage, setStage] = useState<Stage>(
    user?.phoneLast4 ? "loading" : "needPhone",
  );
  const [iso, setIso] = useState(defaultIso);
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [matched, setMatched] = useState<SuggestionItem[]>([]);
  const [invitable, setInvitable] = useState<Invitable[]>([]);
  const [inviteLink, setInviteLink] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  // ── 내 번호 등록 ──
  const savePhone = async () => {
    const e164 = toE164(phone, iso);
    if (!e164) {
      setPhoneError("INVALID");
      return;
    }
    setSaving(true);
    setPhoneError(null);
    try {
      const res = await UserService.setPhone(e164);
      updateUser({ phoneLast4: res.phoneLast4 });
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setStage("loading");
    } catch (e: any) {
      setPhoneError(e?.message === "PHONE_ALREADY_REGISTERED" ? "TAKEN" : "INVALID");
    } finally {
      setSaving(false);
    }
  };

  // ── 연락처 읽고 매칭 ──
  const scan = useCallback(async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") {
      setStage("denied");
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
    });

    // e164 → 연락처에 저장된 이름. 이 표는 **기기 밖으로 안 나간다**
    const byE164 = new Map<string, string>();
    const numbers: string[] = [];
    for (const c of data) {
      for (const p of c.phoneNumbers ?? []) {
        const raw = p.number ?? "";
        if (!raw) continue;
        numbers.push(raw);
        const e164 = toE164(raw, defaultIso);
        if (e164 && !byE164.has(e164)) byE164.set(e164, c.name || raw);
      }
    }

    const { hashes } = await hashContacts(numbers, defaultIso);
    if (!hashes.length) {
      setStage("ready");
      return;
    }

    try {
      const res = await UserService.matchContacts(hashes);
      setMatched(
        (res.users ?? []).map((u: any) => ({
          id: u.id,
          name: u.nickname,
          avatar: u.avatar,
          avatarUri: u.profileImage,
          username: u.username,
          isFollowing: u.isFollowing,
          isFollowedBy: u.isFollowedBy,
        })),
      );

      // 가입 안 한 연락처 = 내가 보낸 것 중 서버가 못 찾은 것.
      // 해시는 기기에서 다시 계산해서 대조한다 (원본 번호는 안 보냈으니까)
      const hit = new Set((res.matchedHashes ?? []).map((h) => h.toLowerCase()));
      const rest: Invitable[] = [];
      for (const [e164, name] of byE164) {
        if (rest.length >= 60) break;
        const h = (await hashPhone(e164)).toLowerCase();
        if (!hit.has(h)) rest.push({ name, e164 });
      }
      setInvitable(rest);
    } catch {
      // 매칭 실패해도 화면은 뜬다 — 초대는 여전히 할 수 있다
    }
    setStage("ready");
  }, [defaultIso]);

  useEffect(() => {
    if (stage === "loading") void scan();
  }, [stage, scan]);

  // 초대 링크는 어차피 필요하다 (미가입 연락처 초대용)
  useEffect(() => {
    ReferralApi.me()
      .then((r) => {
        setInviteLink(r.link);
        setInviteCode(r.code);
      })
      .catch(() => {});
  }, []);

  const inviteText = (name?: string) =>
    t("friends.inviteMessage", {
      nickname: user?.nickname ?? "",
      name: name ?? "",
      code: inviteCode,
      link: inviteLink,
    });

  const inviteBySms = async (c: Invitable) => {
    void Haptics.selectionAsync();
    const body = encodeURIComponent(inviteText(c.name));
    const url = `sms:${c.e164}${
      // 안드로이드는 ?body=, iOS 는 &body= 를 쓴다
      "?body="
    }${body}`;
    const ok = await Linking.canOpenURL(url).catch(() => false);
    if (ok) await Linking.openURL(url);
    else await Share.share({ message: inviteText(c.name) });
  };

  return (
    <View style={[s.container, { paddingTop: insets.top + 4 }]}>
      <View style={s.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </Pressable>
        <Text style={s.headerTitle}>{t("friends.contactsTitle")}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 1단계 — 내 번호 등록 */}
        {stage === "needPhone" && (
          <Animated.View entering={FadeInDown.duration(420)} style={s.card}>
            <View style={s.iconCircle}>
              <Ionicons name="call" size={22} color={theme.primary} />
            </View>
            <Text style={s.cardTitle}>{t("friends.phoneTitle")}</Text>
            <Text style={s.cardDesc}>{t("friends.phoneDesc")}</Text>

            <View style={s.phoneRow}>
              <Pressable
                style={s.dialBtn}
                onPress={() => {
                  void Haptics.selectionAsync();
                  const i = PHONE_COUNTRIES.findIndex((c) => c.iso === iso);
                  setIso(PHONE_COUNTRIES[(i + 1) % PHONE_COUNTRIES.length].iso);
                }}
              >
                <Text style={s.dialText}>
                  {countryOf(iso).flag} +{countryOf(iso).dial}
                </Text>
                <Ionicons name="chevron-down" size={14} color={theme.textSecondary} />
              </Pressable>
              <TextInput
                style={s.phoneInput}
                value={phone}
                onChangeText={(v) => {
                  setPhone(v);
                  setPhoneError(null);
                }}
                placeholder={t("friends.phonePlaceholder")}
                placeholderTextColor={theme.textSecondary}
                keyboardType="phone-pad"
                maxLength={20}
              />
            </View>

            {!!phoneError && (
              <View style={s.errorRow}>
                <Ionicons name="alert-circle" size={15} color="#E24B4A" />
                <Text style={s.errorText}>
                  {t(`friends.phoneErr.${phoneError}`)}
                </Text>
              </View>
            )}

            <Pressable
              onPress={savePhone}
              disabled={saving || !phone.trim()}
              style={({ pressed }) => [
                s.primaryBtn,
                (saving || !phone.trim()) && s.primaryBtnOff,
                pressed && { opacity: 0.88 },
              ]}
            >
              {saving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={s.primaryBtnText}>{t("friends.phoneSave")}</Text>
              )}
            </Pressable>

            <Text style={s.privacy}>{t("friends.phonePrivacy")}</Text>
          </Animated.View>
        )}

        {stage === "loading" && (
          <ActivityIndicator color={theme.primary} style={{ marginTop: 60 }} />
        )}

        {stage === "denied" && (
          <Animated.View entering={FadeIn.duration(400)} style={s.card}>
            <View style={s.iconCircle}>
              <Ionicons name="lock-closed" size={22} color={theme.primary} />
            </View>
            <Text style={s.cardTitle}>{t("friends.contactsDenied")}</Text>
            <Pressable
              onPress={() => void Linking.openSettings()}
              style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.88 }]}
            >
              <Text style={s.primaryBtnText}>{t("friends.openSettings")}</Text>
            </Pressable>
          </Animated.View>
        )}

        {stage === "ready" && (
          <>
            {matched.length > 0 && (
              <Animated.View entering={FadeInDown.duration(420)} style={s.section}>
                <Text style={s.sectionTitle}>
                  {t("friends.contactsCount", { count: matched.length })}
                </Text>
                <SuggestionList items={matched} dismissable={false} />
              </Animated.View>
            )}

            {matched.length === 0 && invitable.length === 0 && (
              <Text style={s.empty}>{t("friends.contactsNoMatch")}</Text>
            )}

            {invitable.length > 0 && (
              <Animated.View
                entering={FadeInDown.delay(80).duration(420)}
                style={s.section}
              >
                <Text style={s.sectionTitle}>{t("friends.inviteTitle")}</Text>
                <Text style={s.sectionDesc}>
                  {t("friends.inviteDesc", { gems: 1000 })}
                </Text>
                {invitable.map((c) => (
                  <View key={c.e164} style={s.inviteRow}>
                    <View style={s.initial}>
                      <Text style={s.initialText}>
                        {(c.name || "?").trim().charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Text style={s.inviteName} numberOfLines={1}>
                        {c.name}
                      </Text>
                      <Text style={s.inviteNum} numberOfLines={1}>
                        {c.e164}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => void inviteBySms(c)}
                      style={({ pressed }) => [
                        s.inviteBtn,
                        pressed && { opacity: 0.85 },
                      ]}
                    >
                      <Text style={s.inviteBtnText}>{t("friends.invite")}</Text>
                    </Pressable>
                  </View>
                ))}
              </Animated.View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = (theme: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingBottom: 10,
    },
    headerTitle: { fontSize: 17, fontWeight: "900", color: theme.text },

    card: {
      margin: 16,
      padding: 20,
      borderRadius: 22,
      alignItems: "center",
      backgroundColor: isDark ? "#22212C" : "#FFFFFF",
      borderWidth: 1,
      borderColor: isDark ? "#35333F" : "#EDEBF7",
    },
    iconCircle: {
      width: 52,
      height: 52,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "#35334A" : "#F1EFFC",
    },
    cardTitle: {
      color: theme.text,
      fontSize: 17,
      fontWeight: "900",
      textAlign: "center",
      marginTop: 12,
    },
    cardDesc: {
      color: theme.textSecondary,
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "600",
      textAlign: "center",
      marginTop: 6,
    },

    phoneRow: { flexDirection: "row", gap: 8, width: "100%", marginTop: 18 },
    dialBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      height: 52,
      paddingHorizontal: 12,
      borderRadius: 14,
      backgroundColor: isDark ? "#2A2836" : "#F6F5FB",
      borderWidth: 1.5,
      borderColor: isDark ? "#3D3B4C" : "#E7E4F3",
    },
    dialText: { color: theme.text, fontSize: 14.5, fontWeight: "800" },
    phoneInput: {
      flex: 1,
      height: 52,
      borderRadius: 14,
      paddingHorizontal: 14,
      fontSize: 16,
      fontWeight: "700",
      color: theme.text,
      backgroundColor: isDark ? "#2A2836" : "#F6F5FB",
      borderWidth: 1.5,
      borderColor: isDark ? "#3D3B4C" : "#E7E4F3",
    },
    errorRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      alignSelf: "flex-start",
      marginTop: 9,
    },
    errorText: { flex: 1, color: "#E24B4A", fontSize: 12, fontWeight: "700" },
    primaryBtn: {
      width: "100%",
      minHeight: 52,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary,
      marginTop: 16,
    },
    primaryBtnOff: { backgroundColor: theme.border },
    primaryBtnText: { color: "#fff", fontSize: 16, fontWeight: "900" },
    privacy: {
      color: theme.textSecondary,
      fontSize: 11,
      lineHeight: 16,
      fontWeight: "500",
      textAlign: "center",
      marginTop: 12,
    },

    section: { paddingHorizontal: 16, marginTop: 14 },
    sectionTitle: { color: theme.text, fontSize: 17, fontWeight: "900" },
    sectionDesc: {
      color: theme.textSecondary,
      fontSize: 12.5,
      fontWeight: "600",
      marginTop: 4,
      marginBottom: 6,
    },
    empty: {
      color: theme.textSecondary,
      fontSize: 14,
      fontWeight: "600",
      textAlign: "center",
      marginTop: 60,
    },

    inviteRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 9,
    },
    initial: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "#35334A" : "#F1EFFC",
    },
    initialText: { color: theme.primary, fontSize: 16, fontWeight: "900" },
    inviteName: { color: theme.text, fontSize: 14.5, fontWeight: "800" },
    inviteNum: { color: theme.textSecondary, fontSize: 11.5, fontWeight: "600" },
    inviteBtn: {
      paddingHorizontal: 16,
      paddingVertical: 9,
      borderRadius: 999,
      backgroundColor: theme.primary,
    },
    inviteBtnText: { color: "#fff", fontSize: 13, fontWeight: "900" },
  });
