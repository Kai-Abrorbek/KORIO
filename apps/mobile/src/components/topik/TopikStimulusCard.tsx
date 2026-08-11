import { useMemo } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import type { TopikStimulus } from "@/types/topik";
import { TopikPassage } from "./TopikPassage";
import { TopikTextBlocks } from "./TopikTextBlocks";
import { type TopikPalette, useTopikTheme } from "./topikTheme";

interface TopikStimulusCardProps {
  stimulus: TopikStimulus;
  highlightedKeys?: ReadonlySet<string>;
}

function useStyles() {
  const palette = useTopikTheme();
  return useMemo(() => getStyles(palette), [palette]);
}

function Advertisement({ stimulus }: { stimulus: TopikStimulus }) {
  const styles = useStyles();
  return (
    <View style={styles.advertisement}>
      {!!stimulus.title && <Text style={styles.adTitle}>{stimulus.title}</Text>}
      {!!stimulus.subtitle && (
        <Text style={styles.adSubtitle}>{stimulus.subtitle}</Text>
      )}
      {stimulus.blocks.length > 0 && (
        <TopikTextBlocks
          blocks={stimulus.blocks}
          textStyle={styles.centerText}
        />
      )}
      {stimulus.bulletItems.map((item) => (
        <Text key={item} style={styles.adBullet}>
          • {item}
        </Text>
      ))}
    </View>
  );
}

function Notice({ stimulus }: { stimulus: TopikStimulus }) {
  const styles = useStyles();
  return (
    <View style={styles.notice}>
      {!!stimulus.title && (
        <Text style={styles.noticeTitle}>{stimulus.title}</Text>
      )}
      {!!stimulus.subtitle && (
        <Text style={styles.noticeSubtitle}>{stimulus.subtitle}</Text>
      )}
      {stimulus.bulletItems.map((item) => (
        <View key={item} style={styles.noticeRow}>
          <View style={styles.noticeDot} />
          <Text style={styles.noticeText}>{item}</Text>
        </View>
      ))}
      {stimulus.infoItems.map((item) => (
        <View key={`${item.label}-${item.value}`} style={styles.infoRow}>
          <Text style={styles.infoLabel}>{item.label}</Text>
          <Text style={styles.infoValue}>{item.value}</Text>
        </View>
      ))}
      {stimulus.blocks.length > 0 && (
        <TopikTextBlocks blocks={stimulus.blocks} />
      )}
    </View>
  );
}

function Chart({ stimulus }: { stimulus: TopikStimulus }) {
  const { t } = useTranslation();
  const styles = useStyles();
  const chart = stimulus.chart;
  if (!chart) return null;

  return (
    <View style={styles.chartCard}>
      {!!chart.title && <Text style={styles.chartTitle}>{chart.title}</Text>}
      {!!chart.subtitle && (
        <Text style={styles.chartSubtitle}>{chart.subtitle}</Text>
      )}
      {stimulus.imageUrl ? (
        <Image
          accessibilityLabel={stimulus.imageAlt}
          resizeMode="contain"
          source={{ uri: stimulus.imageUrl }}
          style={styles.chartImage}
        />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.firstCell]} />
              {chart.headers.map((header) => (
                <Text
                  key={header}
                  style={[styles.tableCell, styles.headerText]}
                >
                  {header}
                </Text>
              ))}
            </View>
            {chart.rows.map((row) => (
              <View key={row.label} style={styles.tableRow}>
                <Text
                  style={[styles.tableCell, styles.firstCell, styles.rowLabel]}
                >
                  {row.label}
                </Text>
                {row.values.map((value, index) => (
                  <Text key={`${row.label}-${index}`} style={styles.tableCell}>
                    {value}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      )}
      {!!chart.unit && (
        <Text style={styles.chartNote}>
          {t("topik.stimulus.chartUnit", { unit: chart.unit })}
        </Text>
      )}
      {!!chart.sourceNote && (
        <Text style={styles.chartNote}>{chart.sourceNote}</Text>
      )}
    </View>
  );
}

function SentenceSet({ stimulus, highlightedKeys }: TopikStimulusCardProps) {
  const styles = useStyles();
  return (
    <View style={styles.sentenceSet}>
      {stimulus.labeledSentences.map((sentence) => (
        <View key={sentence.label} style={styles.sentenceRow}>
          <Text style={styles.sentenceLabel}>{sentence.label}</Text>
          <View style={styles.sentenceContent}>
            <TopikTextBlocks
              blocks={sentence.blocks}
              highlightedKeys={highlightedKeys}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

export function TopikStimulusCard({
  stimulus,
  highlightedKeys,
}: TopikStimulusCardProps) {
  const { t } = useTranslation();
  const styles = useStyles();

  if (stimulus.kind === "advertisement") {
    return <Advertisement stimulus={stimulus} />;
  }
  if (stimulus.kind === "notice" || stimulus.kind === "info_card") {
    return <Notice stimulus={stimulus} />;
  }
  if (stimulus.kind === "chart") {
    return <Chart stimulus={stimulus} />;
  }
  if (stimulus.kind === "sentence_set") {
    return (
      <SentenceSet stimulus={stimulus} highlightedKeys={highlightedKeys} />
    );
  }
  if (stimulus.kind === "headline") {
    return (
      <View style={styles.headline}>
        <Text style={styles.headlineLabel}>{t("topik.stimulus.headline")}</Text>
        <Text style={styles.headlineText}>{stimulus.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.passageStack}>
      {stimulus.givenText.length > 0 && (
        <View style={styles.givenText}>
          <Text style={styles.givenLabel}>
            {t("topik.stimulus.givenSentence")}
          </Text>
          <TopikTextBlocks blocks={stimulus.givenText} />
        </View>
      )}
      {!!stimulus.title && (
        <Text style={styles.passageTitle}>{stimulus.title}</Text>
      )}
      <TopikPassage
        blocks={stimulus.blocks}
        highlightedKeys={highlightedKeys}
      />
      {!!stimulus.imageUrl && (
        <Image
          source={{ uri: stimulus.imageUrl }}
          accessibilityLabel={stimulus.imageAlt}
          resizeMode="contain"
          style={styles.image}
        />
      )}
    </View>
  );
}

const getStyles = (palette: TopikPalette) =>
  StyleSheet.create({
    passageStack: { gap: 12 },
    passageTitle: {
      color: palette.text,
      fontSize: 15,
      fontWeight: "800",
      textAlign: "center",
    },
    advertisement: {
      minHeight: 170,
      justifyContent: "center",
      gap: 10,
      borderWidth: 2,
      borderColor: palette.borderStrong,
      backgroundColor: palette.surface,
      padding: 22,
    },
    adTitle: {
      color: palette.primaryText,
      fontSize: 18,
      lineHeight: 26,
      fontWeight: "900",
      textAlign: "center",
    },
    adSubtitle: {
      color: palette.textSecondary,
      fontSize: 14,
      lineHeight: 21,
      textAlign: "center",
    },
    centerText: { textAlign: "center" },
    adBullet: { color: palette.text, fontSize: 14, lineHeight: 21 },
    notice: {
      gap: 10,
      borderWidth: 1,
      borderColor: palette.borderStrong,
      backgroundColor: palette.paper,
      padding: 18,
    },
    noticeTitle: {
      color: palette.primary,
      fontSize: 18,
      fontWeight: "900",
      textAlign: "center",
    },
    noticeSubtitle: {
      color: palette.textSecondary,
      fontSize: 12,
      textAlign: "center",
    },
    noticeRow: { flexDirection: "row", gap: 9, alignItems: "flex-start" },
    noticeDot: {
      width: 5,
      height: 5,
      marginTop: 9,
      borderRadius: 3,
      backgroundColor: palette.primary,
    },
    noticeText: { flex: 1, color: palette.text, fontSize: 14, lineHeight: 21 },
    infoRow: {
      flexDirection: "row",
      borderTopWidth: 1,
      borderTopColor: palette.divider,
      paddingTop: 9,
    },
    infoLabel: { width: 90, color: palette.primary, fontWeight: "800" },
    infoValue: { flex: 1, color: palette.text },
    chartCard: {
      gap: 9,
      borderWidth: 1,
      borderColor: palette.borderStrong,
      backgroundColor: palette.surface,
      padding: 14,
    },
    chartTitle: {
      color: palette.text,
      fontSize: 16,
      fontWeight: "900",
      textAlign: "center",
    },
    chartSubtitle: {
      color: palette.textSecondary,
      fontSize: 12,
      textAlign: "center",
    },
    chartImage: {
      width: "100%",
      minHeight: 220,
      borderRadius: 8,
      backgroundColor: palette.paper,
    },
    table: { minWidth: 320, borderWidth: 1, borderColor: palette.borderStrong },
    tableRow: { flexDirection: "row" },
    tableHeader: { backgroundColor: palette.primarySoft },
    tableCell: {
      width: 84,
      minHeight: 40,
      paddingHorizontal: 6,
      paddingVertical: 10,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: palette.border,
      color: palette.text,
      fontSize: 12,
      textAlign: "center",
    },
    firstCell: { width: 96 },
    headerText: { color: palette.primaryText, fontWeight: "800" },
    rowLabel: { fontWeight: "700" },
    chartNote: { color: palette.textMuted, fontSize: 11, textAlign: "right" },
    sentenceSet: {
      gap: 13,
      borderWidth: 1,
      borderColor: palette.borderStrong,
      padding: 17,
      backgroundColor: palette.surface,
    },
    sentenceRow: { flexDirection: "row", alignItems: "flex-start", gap: 11 },
    sentenceLabel: {
      width: 31,
      height: 31,
      borderRadius: 16,
      backgroundColor: palette.primaryStrong,
      color: palette.white,
      fontSize: 12,
      fontWeight: "900",
      lineHeight: 31,
      textAlign: "center",
    },
    sentenceContent: { flex: 1 },
    headline: {
      borderTopWidth: 3,
      borderBottomWidth: 1,
      borderColor: palette.borderStrong,
      backgroundColor: palette.surfaceMuted,
      paddingHorizontal: 18,
      paddingVertical: 20,
      gap: 8,
    },
    headlineLabel: {
      color: palette.textMuted,
      fontSize: 11,
      fontWeight: "700",
    },
    headlineText: {
      color: palette.text,
      fontSize: 18,
      lineHeight: 27,
      fontWeight: "900",
    },
    givenText: {
      gap: 8,
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: palette.borderStrong,
      backgroundColor: palette.surfaceMuted,
      padding: 15,
    },
    givenLabel: { color: palette.primary, fontSize: 11, fontWeight: "900" },
    image: { width: "100%", height: 180 },
  });
