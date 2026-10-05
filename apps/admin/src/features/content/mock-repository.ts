import {
  type ContentLesson, type ContentNode, type ContentRepository, type ContentSnapshot,
  type GrammarItem, type ExpressionItem, type HangulItem, type LibraryItem,
  type QuestionDraft, type QuestionType, localized,
} from "./types";

const nodes: ContentNode[] = [
  { id: "n1", code: "s1-u1-n1", section: 1, unit: 1, order: 1, title: localized("인사와 소개", "Salomlashish", "Greetings", "Приветствия"), nodeType: "lesson", category: "vocabulary", isActive: true },
  { id: "n2", code: "s1-u1-n2", section: 1, unit: 1, order: 2, title: localized("기초 문장", "Asosiy gaplar", "Basic sentences", "Основные фразы"), nodeType: "lesson", category: "grammar", isActive: true },
  { id: "n3", code: "s1-u2-n1", section: 1, unit: 2, order: 1, title: localized("일상 대화", "Kundalik suhbat", "Daily conversation", "Повседневный разговор"), nodeType: "lesson", category: "conversation", isActive: true },
  { id: "n4", code: "s2-u1-n1", section: 2, unit: 1, order: 1, title: localized("이동과 교통", "Transport", "Travel and transit", "Транспорт"), nodeType: "lesson", category: "expression", isActive: true },
  { id: "n5", code: "s2-u1-n2", section: 2, unit: 1, order: 2, title: localized("유닛 보상", "Mukofot", "Unit reward", "Награда"), nodeType: "chest", isActive: true },
];

const lessons: ContentLesson[] = [
  { id: "l1", code: "intro-greetings", nodeId: "n1", title: localized("처음 만났어요", "Birinchi uchrashuv", "First meeting", "Первая встреча"), description: localized("인사하고 자신을 소개해요", "Salomlashing", "Greet and introduce yourself", "Познакомьтесь"), category: "vocabulary", level: "1", section: 1, unit: 1, order: 1, xpReward: 40, isActive: true },
  { id: "l2", code: "intro-names", nodeId: "n1", title: localized("이름을 물어요", "Ismni so‘rang", "Ask a name", "Спросите имя"), description: localized("이름을 묻고 답해요", "Ismni so‘rang", "Ask and answer names", "Спросите и ответьте"), category: "conversation", level: "1", section: 1, unit: 1, order: 2, xpReward: 40, isActive: true },
  { id: "l3", code: "grammar-imnida", nodeId: "n2", title: localized("-입니다", "-입니다", "-입니다", "-입니다"), description: localized("격식 있는 소개 표현", "Rasmiy tanishtirish", "Formal introductions", "Формальное знакомство"), category: "grammar", level: "1", section: 1, unit: 1, order: 1, grammarCode: "formal-imnida", xpReward: 50, isActive: true },
  { id: "l4", code: "daily-cafe", nodeId: "n3", title: localized("카페에서 주문해요", "Kafeda buyurtma", "Ordering at a café", "Заказ в кафе"), description: localized("음료를 주문하고 요청해요", "Ichimlik buyurtma qiling", "Order a drink", "Закажите напиток"), category: "conversation", level: "1", section: 1, unit: 2, order: 1, xpReward: 45, isActive: true },
  { id: "l5", code: "transit-directions", nodeId: "n4", title: localized("길을 물어요", "Yo‘l so‘rash", "Asking directions", "Спросить дорогу"), description: localized("교통과 방향 표현", "Transport va yo‘nalish", "Transport and directions", "Транспорт и направления"), category: "expression", level: "2", section: 2, unit: 1, order: 1, xpReward: 55, isActive: false },
];

export function newQuestion(type: QuestionType = "translate_builder", lessonId = "l1", order = 1): QuestionDraft {
  const lesson = lessons.find(item => item.id === lessonId);
  return {
    id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    code: `new-${type}-${Date.now()}`,
    lessonId,
    order,
    type,
    level: lesson?.level ?? "1",
    lessonCategory: lesson?.category ?? "vocabulary",
    instruction: localized("다음 문장을 완성하세요", "Gapni to‘ldiring", "Complete the sentence", "Дополните предложение"),
    npcText: "", npcTextI18n: localized(""), sentencePrefix: "", sentenceSuffix: "", options: [],
    optionsI18n: { ko: [], uz: [], en: [], ru: [] }, choices: [], answer: "",
    answerI18n: localized(""), answerTranslation: localized(""), hint: localized(""), explanation: localized(""),
    sentenceTemplate: "", blankAnswers: [], acceptedAnswers: [], dialogLines: [], pairs: [],
    grading: ["type_answer", "translate_type", "listen_type", "listen_fill"].includes(type)
      ? { mode: "exact", expectedMeaning: "", targetExpressions: [], acceptedAnswers: [] } : undefined,
    buildRows: [], audioText: "", audioUrl: "", imageUrl: "", passage: "", passageTitle: "", wrongWord: "", baseWord: "", targetForm: "",
    difficulty: 3, tags: [], xpReward: 10, isActive: false,
    metrics: { attempts: 0, correctRate: 0, skipRate: 0, avgDurationMs: 0, dropOffRate: 0 },
  };
}

function sampleQuestion(id: string, code: string, lessonId: string, order: number, type: QuestionType, answer: string, correctRate: number, extras: Partial<QuestionDraft> = {}): QuestionDraft {
  return {
    ...newQuestion(type, lessonId, order), id, code, isActive: true, answer,
    answerTranslation: localized(answer, "Tarjima", "Translation", "Перевод"),
    metrics: { attempts: 280 + order * 31, correctRate, skipRate: order * 1.7, avgDurationMs: 6500 + order * 1900, dropOffRate: order === 4 ? 18.2 : 2 + order * 1.2 },
    ...extras,
  };
}

const questions: QuestionDraft[] = [
  sampleQuestion("q1", "s1u1-greeting-choice", "l1", 1, "image_choice", "안녕하세요", 91, { instruction: localized("알맞은 인사말을 고르세요", "Salomni tanlang", "Choose the greeting", "Выберите приветствие"), choices: [
    { text: "감사합니다", label: "Rahmat", emoji: "🙏", imageUrl: "" }, { text: "안녕하세요", label: "Salom", emoji: "👋", imageUrl: "" }, { text: "미안합니다", label: "Kechirasiz", emoji: "🙇", imageUrl: "" }, { text: "잘 가요", label: "Xayr", emoji: "🚶", imageUrl: "" },
  ] }),
  sampleQuestion("q2", "s1u1-intro-build", "l1", 2, "translate_builder", "저는 민수입니다", 76, { options: ["저는", "민수입니다", "학생입니다", "아니에요"], answerTranslation: localized("저는 민수입니다", "Men Minsuman", "I am Minsu", "Я Минсу") }),
  sampleQuestion("q3", "s1u1-intro-type", "l1", 3, "type_answer", "이름", 88, { answerTranslation: localized("이름", "ism", "name", "имя"), grading: { mode: "exact", expectedMeaning: "name", targetExpressions: [], acceptedAnswers: [] } }),
  sampleQuestion("q4", "s1u1-intro-listen", "l1", 4, "sentence_builder", "저는 한국어를 공부해요", 39, { audioText: "저는 한국어를 공부해요", answerI18n: localized("I study Korean", "Men koreys tilini o‘rganaman", "I study Korean", "Я изучаю корейский"), optionsI18n: { ko: ["I", "study", "Korean", "Japanese"], uz: ["Men", "koreys", "tilini", "o‘rganaman", "yapon"], en: ["I", "study", "Korean", "Japanese"], ru: ["Я", "изучаю", "корейский", "японский"] }, metrics: { attempts: 320, correctRate: 39, skipRate: 11.2, avgDurationMs: 26500, dropOffRate: 18.2 } }),
  sampleQuestion("q5", "s1u1-name-reply", "l2", 1, "reply_builder", "제 이름은 수진이에요", 67, { npcText: "이름이 뭐예요?", options: ["제", "이름은", "수진이에요", "학생이에요", "안녕히"], answerTranslation: localized("제 이름은 수진이에요", "Mening ismim Sujin", "My name is Sujin", "Меня зовут Суджин") }),
  sampleQuestion("q6", "s1u1-formal-blank", "l3", 1, "grammar_blank", "학생입니다", 82, { sentenceTemplate: "저는 ___ .", blankAnswers: ["학생입니다"], options: ["학생입니다", "학생이에요", "학생은"], tags: ["formal-imnida"] }),
  sampleQuestion("q7", "s1u2-cafe-dialog", "l4", 1, "dialog_complete", "아메리카노 주세요", 72, { npcText: "무엇을 드릴까요?", options: ["아메리카노 주세요", "안녕히 가세요", "오늘은 화요일이에요"] }),
  sampleQuestion("q8", "s2u1-direction", "l5", 1, "translate_type", "지하철역이 어디예요?", 0, { answerTranslation: localized("지하철역이 어디예요?", "Metro bekati qayerda?", "Where is the subway station?", "Где метро?"), grading: { mode: "semantic", expectedMeaning: "Where is the subway station?", targetExpressions: [], acceptedAnswers: [] }, metrics: { attempts: 0, correctRate: 0, skipRate: 0, avgDurationMs: 0, dropOffRate: 0 } }),
];

const grammar: GrammarItem[] = [
  { kind: "grammar", id: "g1", code: "formal-imnida", pattern: "-입니다", summary: localized("격식 있게 자신을 소개해요", "Rasmiy tanishtirish", "Formal introduction", "Формальное знакомство"), explanation: localized("명사 뒤에 붙여 격식 있게 말해요", "Otga qo‘shiladi", "Attach to a noun for formal speech", "Добавляется к существительному"), section: 1, unit: 1, order: 1, isActive: true },
  { kind: "grammar", id: "g2", code: "polite-eoyo", pattern: "-어요/아요", summary: localized("일상적인 공손한 말투", "Odobli nutq", "Everyday polite speech", "Вежливая речь"), explanation: localized("동사와 형용사의 공손한 종결 표현", "", "Polite ending for verbs and adjectives", ""), section: 1, unit: 2, order: 2, isActive: true },
];
const expression: ExpressionItem[] = [
  { kind: "expression", id: "e1", code: "hello-standard", packCode: "greetings", nodeCode: "first-meeting", korean: "안녕하세요", meaning: localized("안녕하세요", "Salom", "Hello", "Здравствуйте"), context: localized("처음 만났을 때", "Birinchi uchrashuv", "When meeting someone", "При встрече"), section: 1, unit: 1, order: 1, isActive: true },
  { kind: "expression", id: "e2", code: "where-station", packCode: "transit", nodeCode: "directions", korean: "지하철역이 어디예요?", meaning: localized("지하철역이 어디예요?", "Metro qayerda?", "Where is the subway station?", "Где метро?"), context: localized("길을 물을 때", "Yo‘l so‘raganda", "Asking directions", "Когда спрашиваете дорогу"), section: 2, unit: 1, order: 1, isActive: true },
];
const hangul: HangulItem[] = [
  { kind: "hangul", id: "c-giyeok", char: "ㄱ", name: "기역", romanization: "g", category: "consonant", examples: [{ word: "가족", romanization: "ga-jok" }] },
  { kind: "hangul", id: "c-nieun", char: "ㄴ", name: "니은", romanization: "n", category: "consonant", examples: [{ word: "나무", romanization: "na-mu" }] },
  { kind: "hangul", id: "v-a", char: "ㅏ", name: "아", romanization: "a", category: "vowel", examples: [{ word: "아이", romanization: "a-i" }] },
  { kind: "hangul", id: "v-eo", char: "ㅓ", name: "어", romanization: "eo", category: "vowel", examples: [{ word: "어머니", romanization: "eo-meo-ni" }] },
];

const initial: ContentSnapshot = { nodes, lessons, questions, library: [...grammar, ...expression, ...hangul] };
const data: ContentSnapshot = structuredClone(initial);
const snapshot = () => structuredClone(data);

/** Local, mutable mock state. Replace this implementation with an API adapter later. */
export const mockContentRepository: ContentRepository = {
  async load() { return snapshot(); },
  async saveLesson(lesson) {
    const index = data.lessons.findIndex(item => item.id === lesson.id);
    if (index < 0) data.lessons.push(structuredClone(lesson));
    else data.lessons[index] = structuredClone(lesson);
    return snapshot();
  },
  async deleteLesson(id) {
    data.lessons = data.lessons.filter(item => item.id !== id);
    data.questions = data.questions.filter(item => item.lessonId !== id);
    return snapshot();
  },
  async reorderLesson(id, targetId) {
    const source = data.lessons.find(item => item.id === id);
    const target = data.lessons.find(item => item.id === targetId);
    if (!source || !target || source.nodeId !== target.nodeId) return snapshot();
    const siblings = data.lessons.filter(item => item.nodeId === source.nodeId).sort((a, b) => a.order - b.order);
    const reordered = siblings.filter(item => item.id !== id);
    reordered.splice(reordered.findIndex(item => item.id === targetId), 0, source);
    reordered.forEach((item, index) => { item.order = index + 1; });
    return snapshot();
  },
  async saveQuestion(question) {
    const index = data.questions.findIndex(item => item.id === question.id);
    if (index < 0) data.questions.push(structuredClone(question));
    else data.questions[index] = structuredClone(question);
    return snapshot();
  },
  async deleteQuestion(id) {
    data.questions = data.questions.filter(item => item.id !== id);
    return snapshot();
  },
  async reorderQuestion(id, targetId) {
    const source = data.questions.find(item => item.id === id);
    const target = data.questions.find(item => item.id === targetId);
    if (!source || !target || source.lessonId !== target.lessonId) return snapshot();
    const siblings = data.questions.filter(item => item.lessonId === source.lessonId).sort((a, b) => a.order - b.order);
    const reordered = siblings.filter(item => item.id !== id);
    reordered.splice(reordered.findIndex(item => item.id === targetId), 0, source);
    reordered.forEach((item, index) => { item.order = index + 1; });
    return snapshot();
  },
  async saveLibraryItem(item: LibraryItem) {
    const index = data.library.findIndex(current => current.kind === item.kind && current.id === item.id);
    if (index < 0) data.library.push(structuredClone(item));
    else data.library[index] = structuredClone(item);
    return snapshot();
  },
};
