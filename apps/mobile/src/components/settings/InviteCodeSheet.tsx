import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import QRCode from "react-native-qrcode-svg";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import * as Haptics from "@/utils/haptics";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import { useAuthStore } from "@/store/auth.store";
import { ReferralApi, type MyInvite } from "@/services/referral.service";

const CLOSED = 800;
const DURATION = 250;

/**
 * 설정 → "Kod" 를 누르면 올라오는 내 초대 코드 시트.
 *
 * 껍데기는 SectionListSheet / CharacterDetailSheet 와 똑같이 짠다.
 * 안드로이드에서 RN Modal 안 바텀시트는 세 가지를 다 지켜야 뜨고 눌린다 —
 *  1. statusBarTranslucent (edge-to-edge 라 없으면 인셋이 어긋난다)
 *  2. reanimated 레이아웃 애니메이션(entering/exiting)을 쓰지 않는다.
 *     Modal 안에서는 뷰는 보이는데 터치 대상이 안 따라온다
 *  3. animationType="none" — Modal 자체 애니와 겹치면 속도가 어긋난다
 */
export default function InviteCodeSheet({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const nickname = useAuthStore((st) => st.user?.nickname ?? "");

  const [data, setData] = useState<MyInvite | null>(null);
  const [copied, setCopied] = useState(false);

  const backdrop = useSharedValue(0);
  const sheetY = useSharedValue(CLOSED);

  useEffect(() => {
    if (visible) {
      backdrop.value = withTiming(1, { duration: DURATION });
      sheetY.value = withTiming(0, {
        duration: DURATION,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      backdrop.value = 0;
      sheetY.value = CLOSED;
      setCopied(false);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    let alive = true;
    ReferralApi.me()
      .then((d) => alive && setData(d))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [visible]);

  const dragClose = Gesture.Pan()
    .onUpdate((e) => {
      sheetY.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      if (e.translationY > 90 || e.velocityY > 800) {
        sheetY.value = withTiming(CLOSED, { duration: DURATION });
        backdrop.value = withTiming(0, { duration: DURATION });
        runOnJS(onClose)();
      } else {
        sheetY.value = withTiming(0, { duration: 160 });
      }
    });

  const backdropStyle = useAnimatedStyle(() => ({ opacity: backdrop.value }));
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetY.value }],
  }));

  const copy = async () => {
    if (!data?.code) return;
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await Clipboard.setStringAsync(data.code);
    setCopied(true);
    // 잠깐만 "복사했어요" 를 보여준다. 계속 두면 다음에 눌러도 바뀐 걸 모른다
    setTimeout(() => setCopied(false), 1800);
  };

  const share = () => {
    if (!data) return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    void Share.share({
      message: t("invite.shareMessage", {
        nickname,
        gems: data.rewardGems,
        code: data.code,
        link: data.link,
      }),
    });
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={s.root}>
        <Animated.View style={[s.backdrop, backdropStyle]}>
          <Pressable style={s.fill} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[s.sheet, sheetStyle, { paddingBottom: insets.bottom + 20 }]}
        >
          <GestureDetector gesture={dragClose}>
            <View style={s.handleZone}>
              <View style={s.handle} />
            </View>
          </GestureDetector>

          <View style={s.headerRow}>
            <Text style={s.heading}>{t("invite.myCode")}</Text>
            <Pressable
              onPress={onClose}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={t("common.close")}
              style={s.closeBtn}
            >
              <Ionicons name="close" size={20} color={theme.textSecondary} />
            </Pressable>
          </View>

          <Text style={s.desc}>
            {t("invite.heroSub", { gems: data?.rewardGems ?? 1000 })}
          </Text>

          <View style={s.codeCard}>
            <View style={{ flex: 1 }}>
              <Text style={s.code} selectable>
                {data?.code ?? "······"}
              </Text>
            </View>
            {!!data?.link && (
              <View style={s.qr}>
                <QRCode value={data.link} size={64} />
              </View>
            )}
          </View>

          <View style={s.btnRow}>
            <Pressable
              onPress={copy}
              disabled={!data}
              style={({ pressed }) => [
                s.btn,
                s.btnGhost,
                pressed && { opacity: 0.8 },
              ]}
            >
              <Ionicons
                name={copied ? "checkmark" : "copy-outline"}
                size={18}
                color={copied ? "#2BA47F" : theme.primary}
              />
              <Text style={[s.btnGhostText, copied && { color: "#2BA47F" }]}>
                {t(copied ? "invite.copied" : "invite.copy")}
              </Text>
            </Pressable>

            <Pressable
              onPress={share}
              disabled={!data}
              style={({ pressed }) => [
                s.btn,
                s.btnPrimary,
                pressed && { opacity: 0.88 },
              ]}
            >
              <Ionicons name="share-social" size={18} color="#fff" />
              <Text style={s.btnPrimaryText}>{t("invite.shareCta")}</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => {
              onClose();
              router.push("/invite");
            }}
            style={({ pressed }) => [s.moreRow, pressed && { opacity: 0.7 }]}
          >
            <Text style={s.moreText}>{t("invite.openInvite")}</Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={theme.textSecondary}
            />
          </Pressable>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    root: { flex: 1, justifyContent: "flex-end" },
    fill: { flex: 1 },
    backdrop: {
      // absoluteFill 을 스프레드하지 않는다 — RN 버전에 따라 등록된 스타일 id(숫자)
      // 라서 펼치면 아무것도 안 나온다. 다른 시트들과 같은 방식으로 직접 쓴다
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(12,10,30,0.5)",
    },
    sheet: {
      backgroundColor: theme.bg,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingHorizontal: 20,
    },
    handleZone: { alignItems: "center", paddingTop: 10, paddingBottom: 6 },
    handle: {
      width: 44,
      height: 5,
      borderRadius: 3,
      backgroundColor: theme.border,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 2,
    },
    heading: { color: theme.text, fontSize: 18, fontWeight: "900" },
    closeBtn: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.surface,
    },
    desc: {
      color: theme.textSecondary,
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "600",
      marginTop: 6,
    },
    codeCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      marginTop: 16,
      padding: 16,
      borderRadius: 20,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderStyle: "dashed",
      borderColor: theme.border,
    },
    code: {
      color: theme.text,
      fontSize: 30,
      fontWeight: "900",
      letterSpacing: 4,
      fontVariant: ["tabular-nums"],
    },
    qr: { padding: 6, borderRadius: 10, backgroundColor: "#fff" },
    btnRow: { flexDirection: "row", gap: 10, marginTop: 14 },
    btn: {
      flex: 1,
      minHeight: 52,
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
    },
    btnGhost: {
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    btnGhostText: { color: theme.primary, fontSize: 15, fontWeight: "800" },
    btnPrimary: { backgroundColor: theme.primary },
    btnPrimaryText: { color: "#fff", fontSize: 15, fontWeight: "800" },
    moreRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      paddingVertical: 14,
    },
    moreText: { color: theme.textSecondary, fontSize: 13.5, fontWeight: "700" },
  });
