export type ReadingLanguage = "ko" | "uz" | "en" | "ru";

export type LocalizedReadingText = Record<ReadingLanguage, string>;

export interface ReadingPassageSegment {
  text: string;
  vocabularyId?: string;
}

export interface ReadingPassageParagraph {
  id: string;
  segments: ReadingPassageSegment[];
}

export interface ReadingVocabularyItem {
  id: string;
  word: string;
  pronunciation?: string;
  meaning: LocalizedReadingText;
  note: LocalizedReadingText;
  example: string;
}

export interface ReadingCheckQuestion {
  id: string;
  prompt: LocalizedReadingText;
  options: LocalizedReadingText[];
  answerIndex: number;
  explanation: LocalizedReadingText;
}

export interface ReadingWritingActivity {
  prompt: LocalizedReadingText;
  helper: LocalizedReadingText;
  placeholder: LocalizedReadingText;
  keywords: string[];
  exampleAnswer: string;
}

export interface ReadingListeningLesson {
  id: string;
  level: number;
  unit: number;
  title: string;
  topic: LocalizedReadingText;
  estimatedMinutes: number;
  passage: ReadingPassageParagraph[];
  vocabulary: ReadingVocabularyItem[];
  questions: ReadingCheckQuestion[];
  writing: ReadingWritingActivity;
}

const text = (
  ko: string,
  uz: string,
  en: string,
  ru: string,
): LocalizedReadingText => ({ ko, uz, en, ru });

/**
 * 화면 구조 확인을 위한 자체 제작 샘플이다.
 * 교재 원문이 아니며, API가 준비되면 같은 형태의 응답으로 교체한다.
 */
export const READING_LISTENING_PREVIEW: ReadingListeningLesson = {
  id: "preview-level-1-library",
  level: 1,
  unit: 1,
  title: "동네 도서관에서 보내는 하루",
  topic: text(
    "생활 속 문화 공간",
    "Kundalik hayotdagi madaniy maskan",
    "A cultural place in daily life",
    "Культурное место в повседневной жизни",
  ),
  estimatedMinutes: 5,
  passage: [
    {
      id: "paragraph-1",
      segments: [
        { text: "우리 동네에는 작은 " },
        { text: "도서관", vocabularyId: "library" },
        {
          text: "이 있습니다. 집에서 천천히 걸어가면 십 분쯤 걸립니다. 저는 토요일 아침마다 이곳에 갑니다.",
        },
      ],
    },
    {
      id: "paragraph-2",
      segments: [
        {
          text: "도서관에 들어가면 먼저 창가 자리를 찾습니다. 햇빛이 잘 들어오고 밖의 나무도 보여서 마음이 ",
        },
        { text: "편안합니다", vocabularyId: "comfortable" },
        { text: ". 자리에 앉은 뒤에는 읽고 싶은 책을 한 권 고릅니다." },
      ],
    },
    {
      id: "paragraph-3",
      segments: [
        {
          text: "점심시간에는 도서관 앞 공원에서 간단히 밥을 먹습니다. 공원에는 책을 읽는 사람도 있고 산책을 하는 사람도 있습니다. 모두 조용히 자기 시간을 ",
        },
        { text: "즐깁니다", vocabularyId: "enjoy" },
        { text: "." },
      ],
    },
    {
      id: "paragraph-4",
      segments: [
        { text: "오후에는 도서관에서 하는 한국어 모임에 " },
        { text: "참여합니다", vocabularyId: "participate" },
        {
          text: ". 여러 나라에서 온 친구들과 책 이야기를 나눕니다. 모르는 표현을 서로 알려 주기 때문에 한국어 공부에도 도움이 됩니다.",
        },
      ],
    },
    {
      id: "paragraph-5",
      segments: [
        {
          text: "저에게 동네 도서관은 책만 읽는 곳이 아닙니다. 쉬기도 하고 새로운 사람을 만나기도 하는 특별한 공간입니다.",
        },
      ],
    },
  ],
  vocabulary: [
    {
      id: "library",
      word: "도서관",
      pronunciation: "[도서관]",
      meaning: text(
        "책을 읽거나 빌리는 곳",
        "Kitob o‘qish yoki olish joyi",
        "A place to read or borrow books",
        "Место, где читают или берут книги",
      ),
      note: text("명사", "Ot", "Noun", "Существительное"),
      example: "주말에 도서관에서 책을 읽어요.",
    },
    {
      id: "comfortable",
      word: "편안하다",
      pronunciation: "[펴난하다]",
      meaning: text(
        "마음이나 몸이 편하다",
        "O‘zini xotirjam va qulay his qilmoq",
        "To feel calm and comfortable",
        "Чувствовать себя спокойно и удобно",
      ),
      note: text("형용사", "Sifat", "Adjective", "Прилагательное"),
      example: "이 의자는 아주 편안합니다.",
    },
    {
      id: "enjoy",
      word: "즐기다",
      pronunciation: "[즐기다]",
      meaning: text(
        "좋아하며 재미있게 하다",
        "Yoqtirib, zavq bilan qilmoq",
        "To take pleasure in something",
        "Получать удовольствие от чего-либо",
      ),
      note: text("동사", "Fe’l", "Verb", "Глагол"),
      example: "친구들과 산책을 즐겨요.",
    },
    {
      id: "participate",
      word: "참여하다",
      pronunciation: "[차며하다]",
      meaning: text(
        "어떤 일이나 모임에 함께하다",
        "Biror ish yoki yig‘ilishga qo‘shilmoq",
        "To join an activity or meeting",
        "Принимать участие в деле или встрече",
      ),
      note: text("동사", "Fe’l", "Verb", "Глагол"),
      example: "한국어 모임에 참여합니다.",
    },
  ],
  questions: [
    {
      id: "check-place",
      prompt: text(
        "글쓴이는 도서관에서 가장 먼저 무엇을 합니까?",
        "Muallif kutubxonada avval nima qiladi?",
        "What does the writer do first at the library?",
        "Что автор сначала делает в библиотеке?",
      ),
      options: [
        text(
          "창가 자리를 찾습니다.",
          "Deraza yonidan joy topadi.",
          "Finds a seat by the window.",
          "Находит место у окна.",
        ),
        text(
          "한국어 모임에 갑니다.",
          "Koreys tili uchrashuviga boradi.",
          "Goes to the Korean meeting.",
          "Идёт на встречу по корейскому языку.",
        ),
        text(
          "공원에서 밥을 먹습니다.",
          "Bog‘da ovqatlanadi.",
          "Eats in the park.",
          "Ест в парке.",
        ),
      ],
      answerIndex: 0,
      explanation: text(
        "첫째 문단 다음에 ‘먼저 창가 자리를 찾습니다’라고 했습니다.",
        "Matnda avval deraza yonidan joy topishi aytilgan.",
        "The passage says the writer first finds a seat by the window.",
        "В тексте сказано, что сначала автор находит место у окна.",
      ),
    },
    {
      id: "check-reason",
      prompt: text(
        "한국어 모임이 공부에 도움이 되는 이유는 무엇입니까?",
        "Nega koreys tili uchrashuvi o‘qishga yordam beradi?",
        "Why does the Korean meeting help with studying?",
        "Почему встреча по корейскому языку помогает учёбе?",
      ),
      options: [
        text(
          "책을 무료로 받을 수 있어서",
          "Kitoblarni bepul olish mumkinligi uchun",
          "Because books are free",
          "Потому что книги бесплатные",
        ),
        text(
          "모르는 표현을 서로 알려 줘서",
          "Notanish iboralarni bir-biriga tushuntirgani uchun",
          "Because people explain unfamiliar expressions to each other",
          "Потому что участники объясняют друг другу незнакомые выражения",
        ),
        text(
          "도서관이 집에서 가까워서",
          "Kutubxona uyga yaqinligi uchun",
          "Because the library is close to home",
          "Потому что библиотека рядом с домом",
        ),
      ],
      answerIndex: 1,
      explanation: text(
        "여러 나라 친구들이 모르는 표현을 서로 알려 주기 때문입니다.",
        "Turli mamlakatlardan kelgan do‘stlar notanish iboralarni tushuntiradi.",
        "Friends from different countries explain unfamiliar expressions to each other.",
        "Друзья из разных стран объясняют друг другу незнакомые выражения.",
      ),
    },
  ],
  writing: {
    prompt: text(
      "여러분이 자주 가는 편안한 장소를 소개해 보세요.",
      "Tez-tez boradigan qulay joyingizni tanishtiring.",
      "Introduce a comfortable place you often visit.",
      "Расскажите об уютном месте, куда вы часто ходите.",
    ),
    helper: text(
      "어디에 있습니까? 그곳에서 무엇을 합니까? 왜 좋아합니까?",
      "U qayerda? U yerda nima qilasiz? Nega u joyni yoqtirasiz?",
      "Where is it? What do you do there? Why do you like it?",
      "Где оно находится? Что вы там делаете? Почему оно вам нравится?",
    ),
    placeholder: text(
      "세 문장 이상 써 보세요.",
      "Kamida uchta gap yozing.",
      "Write at least three sentences.",
      "Напишите не менее трёх предложений.",
    ),
    keywords: ["자주", "편안하다", "친구", "주말"],
    exampleAnswer:
      "제가 자주 가는 곳은 집 근처 공원입니다. 주말에 친구와 산책을 합니다. 나무가 많아서 마음이 편안합니다.",
  },
};

export function localizedReadingText(
  value: LocalizedReadingText,
  language: string,
) {
  const normalized = language.split("-")[0] as ReadingLanguage;
  return value[normalized] ?? value.uz ?? value.ko;
}
