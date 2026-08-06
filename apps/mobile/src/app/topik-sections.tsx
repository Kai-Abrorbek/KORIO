import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import type { TopikLevel } from "@/components/topik/TopikLevelModal";

type SectionKey = "reading" | "listening" | "writing";

interface SectionOption {
  key: SectionKey;
  order: string;
  title: string;
  english: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  colors: readonly [string, string];
  features: string[];
  available: boolean;
}

const SECTIONS: SectionOption[] = [
  {
    key: "reading",
    order: "01",
    title: "읽기",
    english: "READING",
    description: "문제 유형을 익히고 실제 시험 구성 그대로 실력을 점검해요.",
    icon: "book-outline",
    colors: ["#0D7493", "#19A5A1"],
    features: ["단계별 힌트", "실전 모의고사", "오답 분석"],
    available: true,
  },
  {
    key: "listening",
    order: "02",
    title: "듣기",
    english: "LISTENING",
    description: "핵심 표현을 놓치지 않는 청취 전략과 실전 감각을 만들어요.",
    icon: "headset-outline",
    colors: ["#D66A2C", "#F29C38"],
    features: ["구간 반복", "핵심 단서", "속도 조절"],
    available: false,
  },
  {
    key: "writing",
    order: "03",
    title: "쓰기",
    english: "WRITING",
    description: "문장 구성부터 고득점 답안 구조까지 순서대로 완성해요.",
    icon: "create-outline",
    colors: ["#6246A3", "#9068CE"],
    features: ["답안 구조", "표현 첨삭", "고득점 전략"],
    available: false,
  },
];

export default function TopikSectionsScreen() {
  const params = useLocalSearchParams<{ level?: TopikLevel }>();
  const levelParam = Array.isArray(params.level)
    ? params.level[0]
    : params.level;
  const level: TopikLevel = levelParam === "1" ? "1" : "2";
  const roman = level === "1" ? "I" : "II";
  const sections = SECTIONS.filter(
    (section) => level === "2" || section.key !== "writing",
  );
  const heroColors: readonly [string, string, string] =
    level === "1"
      ? ["#0E645F", "#0B8580", "#15A097"]
      : ["#1D315F", "#3F438A", "#6A4EAD"];

  const openSection = (section: SectionOption) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (section.key === "reading") {
      router.push({
        pathname: "/topik",
        params: { level, section: "reading" },
      });
      return;
    }
    Alert.alert(
      `${section.title} 학습은 준비 중이에요`,
      "더 좋은 학습 경험으로 곧 만나볼 수 있도록 만들고 있어요.",
      [{ text: "확인" }],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="뒤로 가기"
          hitSlop={10}
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <Ionicons name="chevron-back" size={24} color="#253149" />
        </Pressable>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerEyebrow}>EXAM PREPARATION</Text>
          <Text style={styles.headerTitle}>TOPIK {roman}</Text>
        </View>
        <View style={styles.headerMark}>
          <Ionicons name="ribbon-outline" size={20} color="#4B5480" />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={heroColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroGlowLarge} />
          <View style={styles.heroGlowSmall} />
          <View style={styles.heroTopRow}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>TOPIK {roman}</Text>
            </View>
            <View style={styles.planBadge}>
              <Ionicons name="sparkles" size={12} color="#F7E6A8" />
              <Text style={styles.planBadgeText}>SMART STUDY PLAN</Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>
            합격 전략을 영역별로{`\n`}완성해 보세요.
          </Text>
          <Text style={styles.heroDescription}>
            문제를 푸는 것에서 끝나지 않고, 약점을 찾고 다시 강점으로 만드는
            학습을 시작해요.
          </Text>
          <View style={styles.heroFeatures}>
            <View style={styles.heroFeature}>
              <Ionicons name="analytics-outline" size={15} color="#FFFFFF" />
              <Text style={styles.heroFeatureText}>개인별 분석</Text>
            </View>
            <View style={styles.heroFeatureDivider} />
            <View style={styles.heroFeature}>
              <Ionicons name="bulb-outline" size={15} color="#FFFFFF" />
              <Text style={styles.heroFeatureText}>단계별 해설</Text>
            </View>
            <View style={styles.heroFeatureDivider} />
            <View style={styles.heroFeature}>
              <Ionicons name="repeat-outline" size={15} color="#FFFFFF" />
              <Text style={styles.heroFeatureText}>약점 복습</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionEyebrow}>CHOOSE YOUR FOCUS</Text>
            <Text style={styles.sectionTitle}>학습할 영역을 선택하세요</Text>
          </View>
          <Text style={styles.sectionCount}>{sections.length}개 영역</Text>
        </View>

        <View style={styles.cardList}>
          {sections.map((section, index) => (
            <Animated.View
              key={section.key}
              entering={FadeInDown.delay(index * 90).duration(420)}
            >
              <Pressable
                accessibilityRole="button"
                onPress={() => openSection(section)}
                style={({ pressed }) => [
                  styles.sectionCard,
                  pressed && styles.sectionCardPressed,
                ]}
              >
                <View style={styles.cardTopRow}>
                  <LinearGradient
                    colors={section.colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.sectionIcon}
                  >
                    <Ionicons name={section.icon} size={27} color="#FFFFFF" />
                  </LinearGradient>
                  <View style={styles.sectionCopy}>
                    <Text style={styles.sectionEnglish}>
                      {section.order} · {section.english}
                    </Text>
                    <Text style={styles.cardTitle}>{section.title}</Text>
                  </View>
                  {section.available ? (
                    <View style={styles.liveBadge}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveText}>학습 가능</Text>
                    </View>
                  ) : (
                    <View style={styles.soonBadge}>
                      <Ionicons name="time-outline" size={12} color="#858B95" />
                      <Text style={styles.soonText}>준비 중</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.cardDescription}>
                  {section.description}
                </Text>

                <View style={styles.featureRow}>
                  {section.features.map((feature) => (
                    <View key={feature} style={styles.featureChip}>
                      <Text style={styles.featureChipText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.cardFooterCopy}>
                    <Ionicons
                      name={
                        section.available
                          ? "checkmark-circle"
                          : "lock-closed-outline"
                      }
                      size={15}
                      color={section.available ? "#16886B" : "#8C929B"}
                    />
                    <Text
                      style={[
                        styles.cardFooterText,
                        section.available && styles.cardFooterTextLive,
                      ]}
                    >
                      {section.available
                        ? "지금 바로 시작할 수 있어요"
                        : "콘텐츠를 정성껏 준비하고 있어요"}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.arrowCircle,
                      !section.available && styles.arrowCircleDisabled,
                    ]}
                  >
                    <Ionicons
                      name="arrow-forward"
                      size={18}
                      color={section.available ? "#FFFFFF" : "#9197A0"}
                    />
                  </View>
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        <View style={styles.recommendation}>
          <View style={styles.recommendationIcon}>
            <Ionicons name="bulb" size={18} color="#9A701A" />
          </View>
          <View style={styles.recommendationCopy}>
            <Text style={styles.recommendationTitle}>
              처음 준비한다면 읽기부터 추천해요
            </Text>
            <Text style={styles.recommendationText}>
              단계별 힌트로 문제 접근법을 익힌 뒤 실전 모의고사로 점검할 수
              있어요.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F4F5F8" },
  header: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: "#F4F5F8",
  },
  headerButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleWrap: { flex: 1, alignItems: "center" },
  headerEyebrow: {
    color: "#8A91A0",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.25,
  },
  headerTitle: {
    color: "#253149",
    fontSize: 17,
    fontWeight: "900",
    marginTop: 1,
  },
  headerMark: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  content: { paddingHorizontal: 16, paddingBottom: 42 },
  hero: { overflow: "hidden", borderRadius: 26, padding: 21, minHeight: 260 },
  heroGlowLarge: {
    position: "absolute",
    width: 220,
    height: 220,
    right: -85,
    top: -70,
    borderRadius: 110,
    backgroundColor: "rgba(255,255,255,0.09)",
  },
  heroGlowSmall: {
    position: "absolute",
    width: 110,
    height: 110,
    left: -42,
    bottom: -46,
    borderRadius: 55,
    backgroundColor: "rgba(255,255,255,0.07)",
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelBadge: {
    borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.17)",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  levelBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.7,
  },
  planBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 12,
    backgroundColor: "rgba(18,20,44,0.28)",
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  planBadgeText: {
    color: "#F7E6A8",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.7,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    lineHeight: 34,
    fontWeight: "900",
    letterSpacing: -0.7,
    marginTop: 26,
  },
  heroDescription: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 10,
    maxWidth: 325,
  },
  heroFeatures: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.16)",
    marginTop: 23,
    paddingTop: 15,
  },
  heroFeature: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  heroFeatureText: { color: "#FFFFFF", fontSize: 10, fontWeight: "800" },
  heroFeatureDivider: {
    width: 1,
    height: 17,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 28,
    marginBottom: 14,
  },
  sectionEyebrow: {
    color: "#868E9C",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  sectionTitle: {
    color: "#202633",
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: -0.4,
    marginTop: 4,
  },
  sectionCount: { color: "#858C97", fontSize: 10, fontWeight: "700" },
  cardList: { gap: 12 },
  sectionCard: {
    borderWidth: 1,
    borderColor: "#E0E3E9",
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    padding: 16,
    shadowColor: "#1F2A44",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.055,
    shadowRadius: 14,
    elevation: 2,
  },
  sectionCardPressed: { opacity: 0.84, transform: [{ scale: 0.99 }] },
  cardTopRow: { flexDirection: "row", alignItems: "center" },
  sectionIcon: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  sectionCopy: { flex: 1, marginLeft: 12 },
  sectionEnglish: {
    color: "#9298A3",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
  },
  cardTitle: {
    color: "#202631",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 2,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 11,
    backgroundColor: "#E8F7F2",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#16886B" },
  liveText: { color: "#16886B", fontSize: 9, fontWeight: "900" },
  soonBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 11,
    backgroundColor: "#F0F1F3",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  soonText: { color: "#858B95", fontSize: 9, fontWeight: "800" },
  cardDescription: {
    color: "#6D7480",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 13,
  },
  featureRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 12 },
  featureChip: {
    borderRadius: 8,
    backgroundColor: "#F3F5F7",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  featureChipText: { color: "#606874", fontSize: 9, fontWeight: "700" },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#ECEEF1",
    marginTop: 14,
    paddingTop: 13,
  },
  cardFooterCopy: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cardFooterText: { color: "#8C929B", fontSize: 10, fontWeight: "700" },
  cardFooterTextLive: { color: "#16886B" },
  arrowCircle: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: "#263A68",
  },
  arrowCircleDisabled: { backgroundColor: "#EFF1F3" },
  recommendation: {
    flexDirection: "row",
    gap: 11,
    borderWidth: 1,
    borderColor: "#E8D79B",
    borderRadius: 17,
    backgroundColor: "#FFF9E8",
    marginTop: 18,
    marginBottom: 20,
    padding: 14,
  },
  recommendationIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#F9EDC4",
  },
  recommendationCopy: { flex: 1 },
  recommendationTitle: { color: "#5E4818", fontSize: 12, fontWeight: "900" },
  recommendationText: {
    color: "#806D42",
    fontSize: 10,
    lineHeight: 16,
    marginTop: 4,
  },
});
