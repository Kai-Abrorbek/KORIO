import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import type { TopikStimulus } from "@/types/topik";
import { TopikPassage } from "./TopikPassage";
import { TopikTextBlocks } from "./TopikTextBlocks";

interface TopikStimulusCardProps {
  stimulus: TopikStimulus;
  highlightedKeys?: ReadonlySet<string>;
}

function Advertisement({ stimulus }: { stimulus: TopikStimulus }) {
  return (
    <View style={styles.advertisement}>
      {!!stimulus.title && <Text style={styles.adTitle}>{stimulus.title}</Text>}
      {!!stimulus.subtitle && (
        <Text style={styles.adSubtitle}>{stimulus.subtitle}</Text>
      )}
      {stimulus.blocks.length > 0 && (
        <TopikTextBlocks blocks={stimulus.blocks} textStyle={styles.centerText} />
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
  return (
    <View style={styles.notice}>
      {!!stimulus.title && <Text style={styles.noticeTitle}>{stimulus.title}</Text>}
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
      {stimulus.blocks.length > 0 && <TopikTextBlocks blocks={stimulus.blocks} />}
    </View>
  );
}

function Chart({ stimulus }: { stimulus: TopikStimulus }) {
  const chart = stimulus.chart;
  if (!chart) return null;

  return (
    <View style={styles.chartCard}>
      {!!chart.title && <Text style={styles.chartTitle}>{chart.title}</Text>}
      {!!chart.subtitle && <Text style={styles.chartSubtitle}>{chart.subtitle}</Text>}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.firstCell]} />
            {chart.headers.map((header) => (
              <Text key={header} style={[styles.tableCell, styles.headerText]}>
                {header}
              </Text>
            ))}
          </View>
          {chart.rows.map((row) => (
            <View key={row.label} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.firstCell, styles.rowLabel]}>
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
      {!!chart.unit && <Text style={styles.chartNote}>단위: {chart.unit}</Text>}
      {!!chart.sourceNote && <Text style={styles.chartNote}>{chart.sourceNote}</Text>}
    </View>
  );
}

function SentenceSet({
  stimulus,
  highlightedKeys,
}: TopikStimulusCardProps) {
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
      <SentenceSet
        stimulus={stimulus}
        highlightedKeys={highlightedKeys}
      />
    );
  }
  if (stimulus.kind === "headline") {
    return (
      <View style={styles.headline}>
        <Text style={styles.headlineLabel}>신문 기사 제목</Text>
        <Text style={styles.headlineText}>{stimulus.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.passageStack}>
      {stimulus.givenText.length > 0 && (
        <View style={styles.givenText}>
          <Text style={styles.givenLabel}>주어진 문장</Text>
          <TopikTextBlocks blocks={stimulus.givenText} />
        </View>
      )}
      {!!stimulus.title && <Text style={styles.passageTitle}>{stimulus.title}</Text>}
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

const styles = StyleSheet.create({
  passageStack: { gap: 12 },
  passageTitle: {
    color: "#1F2630",
    fontSize: 19,
    fontWeight: "800",
    textAlign: "center",
  },
  advertisement: {
    minHeight: 170,
    justifyContent: "center",
    gap: 10,
    borderWidth: 2,
    borderColor: "#2D3745",
    backgroundColor: "#FFFFFF",
    padding: 22,
  },
  adTitle: {
    color: "#122E52",
    fontSize: 25,
    lineHeight: 33,
    fontWeight: "900",
    textAlign: "center",
  },
  adSubtitle: {
    color: "#4D525A",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  centerText: { textAlign: "center" },
  adBullet: { color: "#32343A", fontSize: 15, lineHeight: 24 },
  notice: {
    gap: 10,
    borderWidth: 1,
    borderColor: "#9EA5AE",
    backgroundColor: "#FAFAF7",
    padding: 18,
  },
  noticeTitle: {
    color: "#173B67",
    fontSize: 21,
    fontWeight: "900",
    textAlign: "center",
  },
  noticeSubtitle: { color: "#5A6068", fontSize: 14, textAlign: "center" },
  noticeRow: { flexDirection: "row", gap: 9, alignItems: "flex-start" },
  noticeDot: {
    width: 5,
    height: 5,
    marginTop: 9,
    borderRadius: 3,
    backgroundColor: "#173B67",
  },
  noticeText: { flex: 1, color: "#2E3238", fontSize: 16, lineHeight: 24 },
  infoRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#D8DADF",
    paddingTop: 9,
  },
  infoLabel: { width: 90, color: "#173B67", fontWeight: "800" },
  infoValue: { flex: 1, color: "#292C31" },
  chartCard: {
    gap: 9,
    borderWidth: 1,
    borderColor: "#B9BEC5",
    backgroundColor: "#FFFFFF",
    padding: 14,
  },
  chartTitle: { color: "#20252C", fontSize: 18, fontWeight: "900", textAlign: "center" },
  chartSubtitle: { color: "#666B73", fontSize: 13, textAlign: "center" },
  table: { minWidth: 320, borderWidth: 1, borderColor: "#ADB3BB" },
  tableRow: { flexDirection: "row" },
  tableHeader: { backgroundColor: "#E9EEF5" },
  tableCell: {
    width: 84,
    minHeight: 40,
    paddingHorizontal: 6,
    paddingVertical: 10,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#C5CAD0",
    color: "#30343A",
    fontSize: 13,
    textAlign: "center",
  },
  firstCell: { width: 96 },
  headerText: { color: "#173B67", fontWeight: "800" },
  rowLabel: { fontWeight: "700" },
  chartNote: { color: "#7B7F85", fontSize: 11, textAlign: "right" },
  sentenceSet: {
    gap: 13,
    borderWidth: 1,
    borderColor: "#C9CDD2",
    padding: 17,
    backgroundColor: "#FFFFFF",
  },
  sentenceRow: { flexDirection: "row", alignItems: "flex-start", gap: 11 },
  sentenceLabel: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: "#173B67",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 31,
    textAlign: "center",
  },
  sentenceContent: { flex: 1 },
  headline: {
    borderTopWidth: 3,
    borderBottomWidth: 1,
    borderColor: "#303840",
    backgroundColor: "#F4F1EA",
    paddingHorizontal: 18,
    paddingVertical: 20,
    gap: 8,
  },
  headlineLabel: { color: "#74706A", fontSize: 11, fontWeight: "700" },
  headlineText: { color: "#1F2328", fontSize: 22, lineHeight: 31, fontWeight: "900" },
  givenText: {
    gap: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#6A7480",
    backgroundColor: "#F6F8FA",
    padding: 15,
  },
  givenLabel: { color: "#173B67", fontSize: 12, fontWeight: "900" },
  image: { width: "100%", height: 180 },
});
