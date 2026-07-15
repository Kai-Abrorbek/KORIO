import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Animated, { SlideInDown, FadeIn } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import {
  BatteryBadge,
  SuperInfinityBadge,
  ENERGY_COLORS,
} from "./BatteryBadge";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  visible: boolean;
  gems?: number;
  refillCost?: number;
  onClose: () => void;
  onTrySuper?: () => void;
  onRefill?: () => void;
  onWatchAd?: () => void;
  onDismissToHome?: () => void;
}

export default function EnergyModal({
  visible,
  gems = 20,
  refillCost = 350,
  onClose,
  onTrySuper,
  onRefill,
  onWatchAd,
  onDismissToHome,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <Animated.View entering={FadeIn.duration(200)} style={s.backdrop}>
        <Pressable style={{ flex: 1 }} />

        <View style={s.gemFloat}>
          <Ionicons name="diamond" size={20} color={ENERGY_COLORS.gem} />
          <Text style={s.gemText}>{gems}</Text>
        </View>

        <Animated.View style={[s.sheet, { paddingBottom: insets.bottom + 24 }]}>
          <Text style={s.title}>{t("energy.modalTitle")}</Text>

          <View style={s.cardsRow}>
            {/* SUPER (선택됨) */}
            <View style={s.superWrap}>
              <LinearGradient
                colors={[
                  ENERGY_COLORS.superC,
                  ENERGY_COLORS.superA,
                  ENERGY_COLORS.superB,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={s.superBorder}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={onTrySuper}
                  style={s.superInner}
                >
                  <LinearGradient
                    colors={[ENERGY_COLORS.superA, ENERGY_COLORS.superB]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={s.superTag}
                  >
                    <Text style={s.superTagText}>SUPER</Text>
                  </LinearGradient>
                  <SuperInfinityBadge size={44} />
                  <Text style={s.cardLabel}>{t("energy.unlimited")}</Text>
                  <Text
                    style={[s.cardAction, { color: ENERGY_COLORS.magenta }]}
                  >
                    {t("energy.freeTrialDo")}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
              <View style={s.check}>
                <Ionicons
                  name="checkmark-circle"
                  size={28}
                  color={ENERGY_COLORS.blue}
                />
              </View>
            </View>

            {/* 충전하기 (gem) */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onRefill}
              style={[s.card, { opacity: 0.6 }]}
            >
              <BatteryBadge value={25} fill="gray" size={44} />
              <Text style={[s.cardLabel, { color: ENERGY_COLORS.numGray }]}>
                {t("energy.refill")}
              </Text>
              <View style={s.gemRow}>
                <Ionicons name="diamond" size={16} color="#B9B9C4" />
                <Text style={[s.cardAction, { color: theme.textSecondary }]}>
                  {refillCost}
                </Text>
              </View>
            </TouchableOpacity>

            {/* 광고 +5 */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onWatchAd}
              style={s.card}
            >
              <BatteryBadge
                value={5}
                fill="pink"
                fillFraction={0.42}
                size={44}
              />
              <Text style={s.cardLabel}>{t("energy.plusFive")}</Text>
              <Text style={[s.cardAction, { color: ENERGY_COLORS.blue }]}>
                {t("energy.watchAd")}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onTrySuper}
            style={s.cta}
          >
            <Text style={s.ctaText}>{t("energy.tryFreeWeek")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onDismissToHome ?? onClose}
            style={s.dismiss}
          >
            <Text style={s.dismissText}>{t("energy.noThanks")}</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    gemFloat: {
      position: "absolute",
      top: 60,
      right: 24,
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    gemText: { fontSize: 18, fontWeight: "800", color: ENERGY_COLORS.gemText },
    sheet: {
      backgroundColor: theme.bg,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingTop: 28,
      paddingHorizontal: 20,
      paddingBottom: 36,
    },
    title: {
      fontSize: 26,
      fontWeight: "800",
      color: theme.text,
      lineHeight: 36,
      marginBottom: 24,
    },
    cardsRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
    superWrap: { flex: 1 },
    superBorder: { borderRadius: 18, padding: 2.5 },
    superInner: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 8,
      gap: 10,
    },
    superTag: { borderRadius: 99, paddingHorizontal: 12, paddingVertical: 3 },
    superTagText: {
      color: "#fff",
      fontWeight: "900",
      fontStyle: "italic",
      fontSize: 13,
      letterSpacing: 0.5,
    },
    check: {
      position: "absolute",
      top: -8,
      right: -6,
      backgroundColor: theme.bg,
      borderRadius: 99,
    },
    card: {
      flex: 1,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingVertical: 16,
      paddingHorizontal: 8,
      gap: 10,
    },
    cardLabel: {
      fontSize: 16,
      fontWeight: "800",
      color: theme.text,
      textAlign: "center",
    },
    cardAction: { fontSize: 15, fontWeight: "800", textAlign: "center" },
    gemRow: { flexDirection: "row", alignItems: "center", gap: 4 },
    cta: {
      backgroundColor: ENERGY_COLORS.blue,
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: "center",
      borderBottomWidth: 4,
      borderBottomColor: ENERGY_COLORS.blueDark,
      marginBottom: 16,
    },
    ctaText: { color: "#fff", fontSize: 17, fontWeight: "800" },
    dismiss: { alignItems: "center", paddingVertical: 6 },
    dismissText: { color: ENERGY_COLORS.blue, fontSize: 16, fontWeight: "800" },
  });
