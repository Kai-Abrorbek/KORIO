import { useMemo } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { Image, type ImageStyle } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { READING_LESSON_IMAGES } from "./reading-listening.assets";
import type {
  LocalizedReadingText,
  ReadingLessonMedia,
} from "../../types/reading-listening";

/**
 * 레슨 대표 이미지.
 *
 * 고르는 순서: `media.imageUrl` → 번들된 `media.imageKey` → 주제 플레이스홀더.
 *
 * 플레이스홀더가 있는 이유: 88편에 사진을 다 채우기 전에도 화면이 비지 않아야
 * 하고, 무엇보다 **레슨마다 달라 보여야** 한다. 전부 같은 그림이면 유저는
 * "덜 만든 앱" 이라고 읽는다. 그래서 code 를 해시해서 배색을 고르고, 주제
 * 낱말로 아이콘을 고른다 — 같은 레슨은 언제 열어도 같은 그림이 나온다.
 *
 * ── 진짜 사진 넣는 법 ──
 * `apps/mobile/assets/images/reading-listening/lessons/<레슨 code>.webp` 에
 * 파일을 넣고 `pnpm --filter mobile gen:reading-images`. 그 레슨만 사진으로
 * 바뀌고 나머지는 그대로 플레이스홀더다.
 */

type IconName = keyof typeof Ionicons.glyphMap;

/**
 * 읽기 화면은 앱의 보라색이 아니라 세이지·크림 톤이다(차분한 읽기 공간).
 * 배색도 거기 맞춰 물 빠진 색으로만 골랐다 — 튀면 본문 위 흰 글씨가 죽는다.
 */
const THEMES: { light: [string, string]; dark: [string, string] }[] = [
  { light: ["#8FB89C", "#4C7A60"], dark: ["#3C6350", "#22382C"] }, // sage
  { light: ["#A8BE94", "#5E7C4E"], dark: ["#43593A", "#25301F"] }, // moss
  { light: ["#C9A98C", "#8A6247"], dark: ["#5E4634", "#33261C"] }, // clay
  { light: ["#93AFC4", "#4E6E88"], dark: ["#3B5468", "#212F3A"] }, // dusk
  { light: ["#C99C8E", "#8A5245"], dark: ["#5F3B33", "#33211C"] }, // terracotta
  { light: ["#8CB3B7", "#457379"], dark: ["#365A5E", "#1F3234"] }, // ocean
  { light: ["#AFA0BE", "#6A5A81"], dark: ["#4B3F5C", "#292233"] }, // plum
  { light: ["#D0B384", "#94713C"], dark: ["#6A5330", "#392C1A"] }, // amber
];

/**
 * 주제 낱말 → 아이콘. 위에서부터 먼저 걸리는 것을 쓴다.
 * `topic.ko` 로 맞춘다 — 시드가 한국어는 항상 채우기 때문이다.
 */
const TOPIC_ICONS: [pattern: RegExp, icon: IconName][] = [
  [/음식|식당|요리|김치|밥|메뉴|시장/, "restaurant-outline"],
  [/여행|관광|공항|여권|비행/, "airplane-outline"],
  [/학교|교실|수업|선생|공부|시험|대학/, "school-outline"],
  [/가족|부모|아이|친척|결혼/, "people-outline"],
  [/계절|봄|여름|가을|겨울|날씨|기후/, "partly-sunny-outline"],
  [/명절|설날|추석|축제|생일|선물/, "sparkles-outline"],
  [/교통|지하철|버스|기차|길|운전/, "subway-outline"],
  [/운동|체육|스포츠|건강|산책/, "walk-outline"],
  [/집|방|동네|이사|주거|아파트/, "home-outline"],
  [/쇼핑|가게|백화점|물건|값|돈|은행/, "pricetag-outline"],
  [/인사|소개|친구|약속|전화|초대/, "chatbubbles-outline"],
  [/음악|영화|드라마|공연|노래|취미/, "musical-notes-outline"],
  [/자연|강|산|공원|바다|꽃|나무|한강/, "leaf-outline"],
  [/일|직업|회사|사무실|취업/, "briefcase-outline"],
  [/문화|전통|역사|한복|한글/, "color-palette-outline"],
];

/** 같은 code 면 언제나 같은 값. 배색을 고정하려고 쓴다 */
function hashCode(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickIcon(topicKo: string): IconName {
  for (const [pattern, icon] of TOPIC_ICONS) {
    if (pattern.test(topicKo)) return icon;
  }
  return "book-outline";
}

export function resolveReadingLessonImage(media?: ReadingLessonMedia) {
  const url = media?.imageUrl?.trim();
  if (url) return { uri: url };
  const key = media?.imageKey?.trim();
  if (key && READING_LESSON_IMAGES[key]) return READING_LESSON_IMAGES[key];
  return null;
}

interface Props {
  code: string;
  topic?: LocalizedReadingText;
  media?: ReadingLessonMedia;
  alt?: string;
  isDark: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ReadingLessonImage({
  code,
  topic,
  media,
  alt,
  isDark,
  style,
}: Props) {
  const source = useMemo(() => resolveReadingLessonImage(media), [media]);

  const theme = useMemo(() => {
    const entry = THEMES[hashCode(code) % THEMES.length];
    return isDark ? entry.dark : entry.light;
  }, [code, isDark]);

  const icon = useMemo(() => pickIcon(topic?.ko ?? ""), [topic?.ko]);

  if (source) {
    return (
      <Image
        source={source}
        contentFit="cover"
        transition={180}
        accessibilityLabel={alt}
        // 부모가 주는 건 폭·높이·모서리뿐이라 두 쪽 다 안전하게 받는다
        style={style as StyleProp<ImageStyle>}
      />
    );
  }

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={alt}
      style={[styles.fill, style]}
    >
      <LinearGradient
        colors={theme}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* 대각선 광택 한 겹. 평평한 색 판이 아니라 종이처럼 보이게 한다 */}
      <LinearGradient
        colors={["rgba(255,255,255,0.16)", "rgba(255,255,255,0)"]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.75, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* 글리프 하나를 오른쪽 아래로 흘려 잘리게 둔다.
          - 가운데 딱 놓으면 "아이콘을 못 채운 자리" 로 보인다. 잘려 나가야 무늬로 읽힌다
          - 왼쪽 위는 비워 둔다. 거기엔 화면이 단원 배지와 소요시간 칩을 얹는다 */}
      <Ionicons
        name={icon}
        size={176}
        color="rgba(255,255,255,0.22)"
        style={styles.glyph}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { overflow: "hidden" },
  glyph: {
    position: "absolute",
    right: -30,
    bottom: -44,
  },
});
