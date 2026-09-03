/**
 * 계정 관리.
 *
 * 프로필(닉네임·아이디·소개)은 여기서 바로 고치고, 비밀번호·탈퇴처럼
 * 되돌리기 어려운 건 확인 단계를 한 번 더 둔다.
 */
import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "@/utils/haptics";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useAuthStore, User } from "@/store/auth.store";
import { UserService } from "@/services/user.service";
import AvatarPreview from "@/components/avatar/AvatarPreview";

type Styles = ReturnType<typeof getStyles>;
type Field = "nickname" | "username" | "bio";

const LIMITS: Record<Field, number> = { nickname: 20, username: 20, bio: 100 };

const PROVIDER_LOOK: Record<string, { icon: string; color: string }> = {
  local: { icon: "mail", color: "#45B7D1" },
  google: { icon: "logo-google", color: "#EA4335" },
  telegram: { icon: "paper-plane", color: "#229ED9" },
  kakao: { icon: "chatbubble", color: "#FEE500" },
  naver: { icon: "leaf", color: "#03C75A" },
};

function Row({
  icon,
  color,
  bg,
  label,
  value,
  placeholder,
  onPress,
  danger,
  s,
  theme,
}: {
  icon: string;
  color: string;
  bg: string;
  label: string;
  value?: string;
  placeholder?: string;
  onPress?: () => void;
  danger?: boolean;
  s: Styles;
  theme: ThemeColors;
}) {
  const body = (
    <View style={s.row}>
      <View style={[s.iconSq, { backgroundColor: bg }]}>
        <Ionicons name={icon as any} size={20} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[s.rowLabel, danger && { color: "#E0455A" }]}>
          {label}
        </Text>
        {value || placeholder ? (
          <Text
            style={[s.rowValue, !value && { color: theme.textSecondary }]}
            numberOfLines={1}
          >
            {value || placeholder}
          </Text>
        ) : null}
      </View>
      {onPress && (
        <Ionicons
          name="chevron-forward"
          size={19}
          color={theme.textSecondary}
        />
      )}
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync();
        onPress();
      }}
      style={({ pressed }) => pressed && { opacity: 0.55 }}
    >
      {body}
    </Pressable>
  );
}

export default function AccountScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const { user, setUserData, logout } = useAuthStore();
  const me = user as User | null;

  const [editing, setEditing] = useState<Field | null>(null);
  const [pwOpen, setPwOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // 다른 화면에서 아바타를 바꾸고 돌아올 수 있다
  useFocusEffect(
    useCallback(() => {
      UserService.getMe()
        .then((m) => setUserData(m as any))
        .catch(() => {});
    }, [setUserData]),
  );

  if (!me) {
    return (
      <View style={[s.container, s.center]}>
        <ActivityIndicator color={theme.primary} />
      </View>
    );
  }

  const provider = (me as any).provider ?? "local";
  const look = PROVIDER_LOOK[provider] ?? PROVIDER_LOOK.local;
  const isSocial = provider !== "local";
  const joined = (me as any).createdAt
    ? new Date((me as any).createdAt).toLocaleDateString()
    : "-";
  const superUntil = (me as any).superExpiresAt
    ? new Date((me as any).superExpiresAt).toLocaleDateString()
    : null;

  return (
    <View style={[s.container, { paddingTop: insets.top + 4 }]}>
      <View style={s.header}>
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/settings")
          }
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{t("settings.items.account.title")}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 프로필 헤더 */}
        <View style={s.hero}>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push("/avatar-editor");
            }}
            style={({ pressed }) => [s.avatarWrap, pressed && { opacity: 0.8 }]}
          >
            <AvatarPreview
              avatar={me.avatar}
              size={92}
              showBackground={false}
            />
            <View style={s.avatarEdit}>
              <Ionicons name="pencil" size={13} color="#fff" />
            </View>
          </Pressable>
          <Text style={s.heroName}>{me.nickname}</Text>
          {me.username ? (
            <Text style={s.heroHandle}>@{me.username}</Text>
          ) : (
            <Text style={s.heroHandleEmpty}>{t("account.noUsername")}</Text>
          )}
        </View>

        {/* 프로필 */}
        <Text style={s.sectionLabel}>{t("account.profileSection")}</Text>
        <View style={s.card}>
          <Row
            icon="person"
            color="#FF9F66"
            bg="#FFE5D0"
            label={t("account.nickname")}
            value={me.nickname}
            onPress={() => setEditing("nickname")}
            s={s}
            theme={theme}
          />
          <View style={s.divider} />
          <Row
            icon="at"
            color="#A78BFA"
            bg="#EBE5FA"
            label={t("account.username")}
            value={me.username ? `@${me.username}` : ""}
            placeholder={t("account.usernamePlaceholder")}
            onPress={() => setEditing("username")}
            s={s}
            theme={theme}
          />
          <View style={s.divider} />
          <Row
            icon="create"
            color="#1DBB7F"
            bg="#D7F5E5"
            label={t("account.bio")}
            value={me.bio}
            placeholder={t("account.bioPlaceholder")}
            onPress={() => setEditing("bio")}
            s={s}
            theme={theme}
          />
        </View>

        {/* 계정 정보 */}
        <Text style={s.sectionLabel}>{t("account.accountSection")}</Text>
        <View style={s.card}>
          <Row
            icon="mail"
            color="#45B7D1"
            bg="#D5F0F5"
            label={t("account.email")}
            value={me.email}
            s={s}
            theme={theme}
          />
          <View style={s.divider} />
          <Row
            icon={look.icon}
            color={look.color}
            bg="#F1F0F7"
            label={t("account.loginMethod")}
            value={t(`account.providers.${provider}`)}
            s={s}
            theme={theme}
          />
          <View style={s.divider} />
          <Row
            icon="calendar"
            color="#F4B860"
            bg="#FFF4D6"
            label={t("account.joinedAt")}
            value={joined}
            s={s}
            theme={theme}
          />
        </View>

        {/* 구독 */}
        <Text style={s.sectionLabel}>{t("account.subscriptionSection")}</Text>
        <View style={s.card}>
          <Row
            icon="diamond"
            color={me.isSuper ? "#E2A83A" : "#A8A8B0"}
            bg={me.isSuper ? "#FCEFC7" : "#ECECEE"}
            label={me.isSuper ? t("account.superOn") : t("account.superOff")}
            value={
              me.isSuper && superUntil
                ? t("account.superUntil", { date: superUntil })
                : t("account.superCta")
            }
            onPress={() => router.push("/premium")}
            s={s}
            theme={theme}
          />
        </View>

        {/* 보안 */}
        <Text style={s.sectionLabel}>{t("account.securitySection")}</Text>
        <View style={s.card}>
          {isSocial ? (
            <Row
              icon="lock-closed"
              color="#A8A8B0"
              bg="#ECECEE"
              label={t("account.changePassword")}
              value={t("account.socialNoPassword")}
              s={s}
              theme={theme}
            />
          ) : (
            <Row
              icon="lock-closed"
              color="#7E57C2"
              bg="#E7E0F7"
              label={t("account.changePassword")}
              onPress={() => setPwOpen(true)}
              s={s}
              theme={theme}
            />
          )}
          <View style={s.divider} />
          <Row
            icon="log-out"
            color="#5C6BC0"
            bg="#E2E5F7"
            label={t("account.logout")}
            onPress={() => {
              logout();
              router.replace("/welcome");
            }}
            s={s}
            theme={theme}
          />
        </View>

        {/* 위험 구역 */}
        <Text style={[s.sectionLabel, { color: "#E0455A" }]}>
          {t("account.dangerSection")}
        </Text>
        <View style={[s.card, { borderColor: "#F5C4CC" }]}>
          <Row
            icon="trash"
            color="#E0455A"
            bg="#FDE0E4"
            label={t("account.deleteAccount")}
            value={t("account.deleteAccountDesc")}
            onPress={() => setDeleteOpen(true)}
            danger
            s={s}
            theme={theme}
          />
        </View>
      </ScrollView>

      {editing && (
        <EditSheet
          field={editing}
          initial={
            editing === "nickname"
              ? me.nickname
              : editing === "username"
                ? (me.username ?? "")
                : (me.bio ?? "")
          }
          onClose={() => setEditing(null)}
          onSaved={(u) => {
            setUserData(u as any);
            setEditing(null);
          }}
          s={s}
          theme={theme}
        />
      )}

      {pwOpen && (
        <PasswordSheet onClose={() => setPwOpen(false)} s={s} theme={theme} />
      )}

      {deleteOpen && (
        <DeleteSheet
          nickname={me.nickname}
          onClose={() => setDeleteOpen(false)}
          onDone={() => {
            logout();
            router.replace("/welcome");
          }}
          s={s}
          theme={theme}
        />
      )}
    </View>
  );
}

/* ── 프로필 항목 편집 ───────────────────────────── */
function EditSheet({
  field,
  initial,
  onClose,
  onSaved,
  s,
  theme,
}: {
  field: Field;
  initial: string;
  onClose: () => void;
  onSaved: (u: unknown) => void;
  s: Styles;
  theme: ThemeColors;
}) {
  const { t } = useTranslation();
  const [value, setValue] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmed = value.trim();
  const changed = trimmed !== initial.trim();
  const canSave = changed && !busy && (field === "bio" || trimmed.length > 0);

  const save = async () => {
    if (!canSave) return;
    setBusy(true);
    setError(null);
    try {
      if (field === "username") {
        const r = await UserService.checkUsername(trimmed.toLowerCase());
        if (!r.available) {
          setError(t(`account.usernameError.${r.reason ?? "taken"}`));
          setBusy(false);
          return;
        }
      }
      const patch =
        field === "username"
          ? { username: trimmed.toLowerCase() }
          : field === "nickname"
            ? { nickname: trimmed }
            : { bio: trimmed };
      const updated = await UserService.updateMe(patch);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onSaved(updated);
    } catch {
      setError(t("account.saveFailed"));
      setBusy(false);
    }
  };

  return (
    <Sheet onClose={onClose} s={s}>
      <Text style={s.sheetTitle}>{t(`account.${field}`)}</Text>
      <TextInput
        style={[s.input, field === "bio" && s.inputMulti]}
        value={value}
        onChangeText={(v) => {
          setError(null);
          setValue(v.slice(0, LIMITS[field]));
        }}
        placeholder={t(`account.${field}Placeholder`)}
        placeholderTextColor={theme.textSecondary}
        autoFocus
        multiline={field === "bio"}
        autoCapitalize={field === "username" ? "none" : "sentences"}
      />
      <View style={s.sheetMetaRow}>
        <Text style={s.hint}>
          {field === "username" ? t("account.usernameHint") : " "}
        </Text>
        <Text style={s.counter}>
          {value.length}/{LIMITS[field]}
        </Text>
      </View>
      {error ? <Text style={s.error}>{error}</Text> : null}

      <TouchableOpacity
        style={[s.cta, !canSave && s.ctaOff]}
        activeOpacity={0.85}
        disabled={!canSave}
        onPress={save}
      >
        {busy ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={s.ctaText}>{t("common.save")}</Text>
        )}
      </TouchableOpacity>
    </Sheet>
  );
}

/* ── 비밀번호 변경 ──────────────────────────────── */
function PasswordSheet({
  onClose,
  s,
  theme,
}: {
  onClose: () => void;
  s: Styles;
  theme: ThemeColors;
}) {
  const { t } = useTranslation();
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [again, setAgain] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const tooShort = next.length > 0 && next.length < 6;
  const mismatch = again.length > 0 && next !== again;
  const canSave = !busy && cur.length > 0 && next.length >= 6 && next === again;

  const submit = async () => {
    if (!canSave) return;
    setBusy(true);
    setError(null);
    try {
      await UserService.changePassword({
        currentPassword: cur,
        newPassword: next,
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setDone(true);
      setTimeout(onClose, 900);
    } catch (e: any) {
      const code = e?.message || "";
      setError(
        code.includes("WRONG_CURRENT_PASSWORD")
          ? t("account.pwWrong")
          : code.includes("SAME_PASSWORD")
            ? t("account.pwSame")
            : t("account.saveFailed"),
      );
      setBusy(false);
    }
  };

  return (
    <Sheet onClose={onClose} s={s}>
      <Text style={s.sheetTitle}>{t("account.changePassword")}</Text>

      {done ? (
        <View style={s.doneBox}>
          <Ionicons name="checkmark-circle" size={44} color="#1DBB7F" />
          <Text style={s.doneText}>{t("account.pwChanged")}</Text>
        </View>
      ) : (
        <>
          <TextInput
            style={s.input}
            value={cur}
            onChangeText={(v) => {
              setError(null);
              setCur(v);
            }}
            placeholder={t("account.currentPassword")}
            placeholderTextColor={theme.textSecondary}
            secureTextEntry
            autoFocus
          />
          <TextInput
            style={[s.input, { marginTop: 10 }]}
            value={next}
            onChangeText={setNext}
            placeholder={t("account.newPassword")}
            placeholderTextColor={theme.textSecondary}
            secureTextEntry
          />
          <TextInput
            style={[s.input, { marginTop: 10 }]}
            value={again}
            onChangeText={setAgain}
            placeholder={t("account.newPasswordAgain")}
            placeholderTextColor={theme.textSecondary}
            secureTextEntry
          />
          <Text style={s.hint}>
            {tooShort
              ? t("account.pwTooShort")
              : mismatch
                ? t("account.pwMismatch")
                : t("account.pwRule")}
          </Text>
          {error ? <Text style={s.error}>{error}</Text> : null}

          <TouchableOpacity
            style={[s.cta, !canSave && s.ctaOff]}
            activeOpacity={0.85}
            disabled={!canSave}
            onPress={submit}
          >
            {busy ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={s.ctaText}>{t("common.save")}</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </Sheet>
  );
}

/* ── 탈퇴 ──────────────────────────────────────── */
function DeleteSheet({
  nickname,
  onClose,
  onDone,
  s,
  theme,
}: {
  nickname: string;
  onClose: () => void;
  onDone: () => void;
  s: Styles;
  theme: ThemeColors;
}) {
  const { t } = useTranslation();
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);

  // 실수로 못 누르게 — 닉네임을 그대로 쳐야 버튼이 열린다
  const canDelete = !busy && typed.trim() === nickname;

  const run = async () => {
    if (!canDelete) return;
    setBusy(true);
    try {
      await UserService.deleteAccount();
      onDone();
    } catch {
      setBusy(false);
    }
  };

  return (
    <Sheet onClose={onClose} s={s}>
      <View style={s.warnIcon}>
        <Ionicons name="warning" size={26} color="#E0455A" />
      </View>
      <Text style={s.sheetTitle}>{t("account.deleteTitle")}</Text>
      <Text style={s.sheetDesc}>{t("account.deleteWarning")}</Text>

      <Text style={s.confirmLabel}>
        {t("account.deleteConfirmLabel", { name: nickname })}
      </Text>
      <TextInput
        style={s.input}
        value={typed}
        onChangeText={setTyped}
        placeholder={nickname}
        placeholderTextColor={theme.textSecondary}
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[s.cta, s.ctaDanger, !canDelete && s.ctaOff]}
        activeOpacity={0.85}
        disabled={!canDelete}
        onPress={run}
      >
        {busy ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={s.ctaText}>{t("account.deleteAccount")}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={s.cancel} onPress={onClose}>
        <Text style={s.cancelText}>{t("common.cancel")}</Text>
      </TouchableOpacity>
    </Sheet>
  );
}

/* ── 공통 시트 ─────────────────────────────────── */
function Sheet({
  children,
  onClose,
  s,
}: {
  children: React.ReactNode;
  onClose: () => void;
  s: Styles;
}) {
  const insets = useSafeAreaInsets();
  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      {/*
        안드로이드에서 behavior 가 undefined 였다. 그러면 KeyboardAvoidingView
        는 아무것도 안 한다 — 키보드가 그냥 입력창을 덮었다.

        앱 전체는 app.json 의 softwareKeyboardLayoutMode:"resize" 덕에 창이
        알아서 줄어든다. 하지만 **Modal 은 별도의 창**이라 그 설정을 물려받지
        않는다. 그래서 시트 안에서는 KAV 가 직접 밀어 올려야 한다.

        이 Sheet 를 이 화면의 모든 모달이 공유하므로, 여기 한 곳이 계정 관리의
        입력창 전부를 담당한다.
      */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={s.modalBg}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
          <Animated.View
            entering={FadeIn.duration(160)}
            style={[s.sheet, { paddingBottom: insets.bottom + 20 }]}
          >
            {children}
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    center: { alignItems: "center", justifyContent: "center" },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    headerTitle: { fontSize: 22, fontWeight: "700", color: theme.text },

    hero: { alignItems: "center", paddingTop: 14, paddingBottom: 22 },
    avatarWrap: { marginBottom: 12 },
    avatarEdit: {
      position: "absolute",
      right: -2,
      bottom: -2,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2.5,
      borderColor: theme.bg,
    },
    heroName: { fontSize: 21, fontWeight: "800", color: theme.text },
    heroHandle: {
      fontSize: 15,
      fontWeight: "600",
      color: theme.primary,
      marginTop: 3,
    },
    heroHandleEmpty: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.textSecondary,
      marginTop: 3,
    },

    sectionLabel: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
      marginLeft: 32,
      marginBottom: 8,
      marginTop: 22,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.border,
      marginHorizontal: 20,
      overflow: "hidden",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    iconSq: {
      width: 38,
      height: 38,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
    },
    rowLabel: { fontSize: 16, fontWeight: "700", color: theme.text },
    rowValue: {
      fontSize: 13,
      color: theme.text,
      marginTop: 2,
      fontWeight: "500",
    },
    divider: { height: 1, backgroundColor: theme.border, marginLeft: 68 },

    modalBg: {
      flex: 1,
      backgroundColor: "rgba(30,26,46,0.5)",
      justifyContent: "flex-end",
    },
    sheet: {
      backgroundColor: theme.surface,
      borderTopLeftRadius: 26,
      borderTopRightRadius: 26,
      paddingHorizontal: 22,
      paddingTop: 24,
    },
    sheetTitle: {
      fontSize: 19,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 14,
    },
    sheetDesc: {
      fontSize: 14,
      color: theme.textSecondary,
      lineHeight: 21,
      fontWeight: "500",
      marginBottom: 18,
    },
    input: {
      backgroundColor: theme.bg === "#ffffff" ? "#F5F4FA" : "#26252E",
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: theme.border,
      paddingHorizontal: 15,
      paddingVertical: 13,
      fontSize: 16,
      color: theme.text,
      fontWeight: "600",
    },
    inputMulti: { minHeight: 92, textAlignVertical: "top" },
    sheetMetaRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
    },
    hint: {
      flex: 1,
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: "500",
      marginTop: 8,
    },
    counter: { fontSize: 12, color: theme.textSecondary, fontWeight: "700" },
    error: {
      fontSize: 13,
      color: "#E0455A",
      fontWeight: "700",
      marginTop: 8,
    },

    cta: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
      marginTop: 20,
      borderBottomWidth: 4,
      borderBottomColor: "rgba(0,0,0,0.22)",
    },
    ctaDanger: { backgroundColor: "#E0455A" },
    ctaOff: { opacity: 0.4 },
    ctaText: { fontSize: 16, fontWeight: "800", color: "#fff" },
    cancel: { alignItems: "center", paddingVertical: 14, marginTop: 4 },
    cancelText: { fontSize: 15, fontWeight: "700", color: theme.textSecondary },

    warnIcon: {
      alignSelf: "flex-start",
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#FDE0E4",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
    },
    confirmLabel: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 8,
    },
    doneBox: { alignItems: "center", paddingVertical: 26, gap: 10 },
    doneText: { fontSize: 16, fontWeight: "700", color: theme.text },
  });
