import type { ReadingLanguage } from "@/types/reading-listening";

/**
 * 문법 태그·품사 라벨.
 *
 * 서버는 단어마다 문장을 만들지 않고 태그만 준다(past, formalPolite …).
 * 여기서 화면 언어로 옮긴다. 그래야 같은 문법이 어디서나 같은 말로 나오고,
 * 단어가 늘어도 번역할 게 안 늘어난다.
 *
 * 조사 태그에는 한국어 형태를 괄호로 같이 둔다 — 학습자가 본문에서 찾는 건
 * 결국 그 글자라서, 문법 용어보다 그게 더 도움이 된다.
 */
type Labels = Record<string, string>;

const GRAMMAR: Record<ReadingLanguage, Labels> = {
  ko: {
    particleTopic: "주제 (은/는)",
    particleSubject: "주어 (이/가)",
    particleObject: "목적어 (을/를)",
    particlePlace: "장소 (에/에서)",
    particleTarget: "대상 (에게/께)",
    particleWith: "함께 (하고/와)",
    particleFrom: "부터",
    particleTo: "까지",
    particleOnly: "만",
    particleAlso: "도",
    particlePossessive: "의",
    past: "과거",
    present: "현재",
    future: "미래",
    progressive: "진행 중",
    formalPolite: "합니다체",
    polite: "해요체",
    plain: "반말",
    honorific: "높임말",
    connectiveAnd: "그리고 (-고)",
    connectiveBecause: "때문에 (-아서)",
    connectiveBut: "하지만 (-지만)",
    connectiveIf: "만약 (-면)",
    modifier: "꾸미는 말",
    negation: "부정",
    ability: "할 수 있다",
    desire: "하고 싶다",
    question: "의문",
    counter: "세는 말",
    plural: "복수 (-들)",
  },
  uz: {
    particleTopic: "mavzu (은/는)",
    particleSubject: "ega (이/가)",
    particleObject: "to‘ldiruvchi (을/를)",
    particlePlace: "joy (에/에서)",
    particleTarget: "kimga (에게/께)",
    particleWith: "bilan (하고/와)",
    particleFrom: "dan (부터)",
    particleTo: "gacha (까지)",
    particleOnly: "faqat (만)",
    particleAlso: "ham (도)",
    particlePossessive: "qarashli (의)",
    past: "o‘tgan zamon",
    present: "hozirgi zamon",
    future: "kelasi zamon",
    progressive: "davom etmoqda",
    formalPolite: "rasmiy hurmat",
    polite: "oddiy hurmat",
    plain: "norasmiy",
    honorific: "hurmat shakli",
    connectiveAnd: "va (-고)",
    connectiveBecause: "shuning uchun (-아서)",
    connectiveBut: "lekin (-지만)",
    connectiveIf: "agar (-면)",
    modifier: "aniqlovchi",
    negation: "inkor",
    ability: "qila olmoq",
    desire: "qilgisi kelmoq",
    question: "so‘roq",
    counter: "sanoq so‘zi",
    plural: "ko‘plik (-들)",
  },
  en: {
    particleTopic: "topic (은/는)",
    particleSubject: "subject (이/가)",
    particleObject: "object (을/를)",
    particlePlace: "place (에/에서)",
    particleTarget: "to someone (에게/께)",
    particleWith: "with (하고/와)",
    particleFrom: "from (부터)",
    particleTo: "until (까지)",
    particleOnly: "only (만)",
    particleAlso: "also (도)",
    particlePossessive: "possessive (의)",
    past: "past",
    present: "present",
    future: "future",
    progressive: "in progress",
    formalPolite: "formal polite",
    polite: "polite",
    plain: "casual",
    honorific: "honorific",
    connectiveAnd: "and (-고)",
    connectiveBecause: "because (-아서)",
    connectiveBut: "but (-지만)",
    connectiveIf: "if (-면)",
    modifier: "modifier",
    negation: "negative",
    ability: "can do",
    desire: "want to",
    question: "question",
    counter: "counter",
    plural: "plural (-들)",
  },
  ru: {
    particleTopic: "тема (은/는)",
    particleSubject: "подлежащее (이/가)",
    particleObject: "дополнение (을/를)",
    particlePlace: "место (에/에서)",
    particleTarget: "кому (에게/께)",
    particleWith: "с (하고/와)",
    particleFrom: "от (부터)",
    particleTo: "до (까지)",
    particleOnly: "только (만)",
    particleAlso: "тоже (도)",
    particlePossessive: "принадлежность (의)",
    past: "прошедшее",
    present: "настоящее",
    future: "будущее",
    progressive: "в процессе",
    formalPolite: "офиц. вежливая",
    polite: "вежливая",
    plain: "неформальная",
    honorific: "почтительная",
    connectiveAnd: "и (-고)",
    connectiveBecause: "потому что (-아서)",
    connectiveBut: "но (-지만)",
    connectiveIf: "если (-면)",
    modifier: "определение",
    negation: "отрицание",
    ability: "мочь",
    desire: "хотеть",
    question: "вопрос",
    counter: "счётное слово",
    plural: "мн. число (-들)",
  },
};

const POS: Record<ReadingLanguage, Labels> = {
  ko: {
    noun: "명사", verb: "동사", adjective: "형용사", adverb: "부사",
    pronoun: "대명사", number: "수사", particle: "조사",
    determiner: "관형사", interjection: "감탄사", ending: "어미", other: "",
  },
  uz: {
    noun: "ot", verb: "fe’l", adjective: "sifat", adverb: "ravish",
    pronoun: "olmosh", number: "son", particle: "qo‘shimcha",
    determiner: "aniqlovchi", interjection: "undov", ending: "qo‘shimcha", other: "",
  },
  en: {
    noun: "noun", verb: "verb", adjective: "adjective", adverb: "adverb",
    pronoun: "pronoun", number: "number", particle: "particle",
    determiner: "determiner", interjection: "interjection", ending: "ending", other: "",
  },
  ru: {
    noun: "сущ.", verb: "глагол", adjective: "прил.", adverb: "наречие",
    pronoun: "мест.", number: "числит.", particle: "частица",
    determiner: "определитель", interjection: "междом.", ending: "окончание", other: "",
  },
};

/** 모르는 태그는 화면에 안 띄운다. 서버가 새 태그를 내보내도 앱이 안 깨진다 */
export function grammarLabel(tag: string, lang: ReadingLanguage): string {
  return GRAMMAR[lang]?.[tag] ?? GRAMMAR.en[tag] ?? "";
}

export function posLabel(pos: string, lang: ReadingLanguage): string {
  return POS[lang]?.[pos] ?? POS.en[pos] ?? "";
}
