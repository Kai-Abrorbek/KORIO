export interface Section5LocalizedText {
  ko: string;
  uz: string;
  en: string;
  ru: string;
}

export interface Section5GrammarExample {
  ko: string;
  highlight: string;
  translations: Omit<Section5LocalizedText, 'ko'>;
}

export interface Section5GrammarDefinition {
  code: string;
  pattern: string;
  title: Section5LocalizedText;
  summary: Section5LocalizedText;
  explanation: Section5LocalizedText;
  conjugationRule: Section5LocalizedText;
  conjugations: { base: string; result: string }[];
  usageTag: Section5LocalizedText;
  examples: Section5GrammarExample[];
  cautions: Section5LocalizedText[];
  quizDistractors: string[];
  similar?: {
    pattern: string;
    note: Section5LocalizedText;
  };
}

export interface Section5UnitDefinition {
  unit: number;
  title: Section5LocalizedText;
  grammars: Section5GrammarDefinition[];
}
