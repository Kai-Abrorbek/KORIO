export interface ExpressionPackMedia {
  emoji: string;
  imageAlt: string;
  imageUrl: string;
}

export interface ExpressionPackInfo {
  code: string;
  description: string;
  id: string;
  media: ExpressionPackMedia;
  order: number;
  title: string;
}

export interface ExpressionPackSummary extends ExpressionPackInfo {
  count: number;
  due: number;
  mastered: number;
  resumeExpressionId: string | null;
  saved: number;
  viewed: number;
}

export interface ExpressionProgress {
  isSaved: boolean;
  [key: string]: unknown;
}

export interface StudyExpression {
  context: string;
  id: string;
  korean: string;
  meaning: string;
  pack: ExpressionPackInfo;
  progress: ExpressionProgress;
  pronunciation: { audioUrl: string; romanization: string; ttsText: string };
  usageNote: string;
}

export interface ExpressionOverview { packs: ExpressionPackSummary[] }

export interface ExpressionListResponse {
  items: StudyExpression[];
  nextCursor: string | null;
  pack: ExpressionPackInfo | null;
  total: number;
}

export interface SpeakingProgress {
  completedCount: number;
  index: number;
  justCompleted: boolean;
  packCode: string;
  total: number;
}

export interface AssessedWord { accuracy: number; errorType: string; word: string }

export interface AssessResult {
  passed: boolean;
  referenceText: string;
  scores: { accuracy: number; completeness: number; fluency: number; pron: number; prosody: number | null };
  status: "error" | "no_speech" | "success";
  transcript: string;
  words: AssessedWord[];
}

export interface TopicLook { from: string; mark: string; to: string }

const LOOKS: Array<{ look: TopicLook; match: RegExp }> = [
  { match: /greet|hello|goodbye|farewell/, look: { mark: "안", from: "#9280F5", to: "#5B44C9" } },
  { match: /self|introduc|profile|myself/, look: { mark: "저", from: "#57BAEC", to: "#2A76CC" } },
  { match: /thank|apolog|sorry|grat|excuse/, look: { mark: "감", from: "#F5829F", to: "#D8436E" } },
  { match: /request|permission|favou?r|please/, look: { mark: "주", from: "#F8B056", to: "#DE7A1E" } },
  { match: /clarif|repeat|understand|confus|again/, look: { mark: "다", from: "#5DCBA9", to: "#1F8C6C" } },
  { match: /phone|call|message|contact/, look: { mark: "통", from: "#82B6F6", to: "#3E6FD0" } },
  { match: /food|restaurant|order|dining|cafe|coffee/, look: { mark: "밥", from: "#F59477", to: "#D95832" } },
  { match: /travel|transport|direction|airport|hotel|trip/, look: { mark: "길", from: "#72C8DA", to: "#2C8AA6" } },
  { match: /shop|store|market|buy|price/, look: { mark: "사", from: "#C99DF0", to: "#8E4FCE" } },
  { match: /work|office|school|study|class|job/, look: { mark: "일", from: "#92A9CB", to: "#4F6690" } },
  { match: /daily|home|routine|life|family/, look: { mark: "집", from: "#A2D07C", to: "#5C9436" } },
  { match: /health|hospital|doctor|body/, look: { mark: "약", from: "#F58E8E", to: "#C93E3E" } },
  { match: /number|time|date|money/, look: { mark: "시", from: "#7FC7C0", to: "#2E8880" } },
];

const FALLBACKS: TopicLook[] = [
  { mark: "말", from: "#9280F5", to: "#5B44C9" },
  { mark: "말", from: "#5DCBA9", to: "#1F8C6C" },
  { mark: "말", from: "#F8B056", to: "#DE7A1E" },
  { mark: "말", from: "#57BAEC", to: "#2A76CC" },
  { mark: "말", from: "#F5829F", to: "#D8436E" },
];

export function topicLookOf(code: string): TopicLook {
  const topic = code.toLowerCase();
  const hit = LOOKS.find((entry) => entry.match.test(topic));
  if (hit) return hit.look;
  let hash = 0;
  for (let index = 0; index < topic.length; index += 1) hash = (hash * 31 + topic.charCodeAt(index)) >>> 0;
  return FALLBACKS[hash % FALLBACKS.length] ?? FALLBACKS[0]!;
}

export type SpeakingMask = { hideMeaning: boolean; hidden: number[]; mode: "listen" | "none" | "partial" };

function hashString(text: string): number {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function speakingMaskFor(position: number, sentence: string, seed: string): SpeakingMask {
  const words = sentence.split(/\s+/).filter(Boolean);
  if (!words.length || position < 3) return { mode: "none", hidden: [], hideMeaning: false };
  if ((position + 1) % 6 === 0) return { mode: "listen", hidden: words.map((_, index) => index), hideMeaning: true };
  const count = Math.min(words.length, 1 + Math.floor((position - 3) / 5));
  const hidden = words
    .map((word, index) => ({ index, key: hashString(`${seed}:${index}:${word}`) }))
    .sort((left, right) => left.key - right.key)
    .slice(0, count)
    .map((item) => item.index)
    .sort((left, right) => left - right);
  return { mode: "partial", hidden, hideMeaning: false };
}

export function normalizeSpeakingWord(word: string) {
  return word.normalize("NFC").replace(/[^\p{L}\p{N}]/gu, "");
}

export function wordToneOf(word: AssessedWord): "bad" | "good" | "warn" {
  if (word.errorType === "Omission" || word.errorType === "Mispronunciation") return word.accuracy >= 60 ? "warn" : "bad";
  if (word.accuracy >= 80) return "good";
  if (word.accuracy >= 60) return "warn";
  return "bad";
}
