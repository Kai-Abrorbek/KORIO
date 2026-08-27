import type { TopikI18nText } from "@/types/topik";

export type TopikRecipeTargetLevel = 3 | 4 | 5 | 6;

export interface TopikRecipeCurriculumChapter {
  key: string;
  level: TopikRecipeTargetLevel;
  title: TopikI18nText;
  groupCodes: string[];
}

const title = (
  ko: string,
  uz: string,
  en: string,
  ru: string,
): TopikI18nText => ({ ko, uz, en, ru });

/**
 * TOPIK II 합격 레시피 교재의 급수별 학습 순서.
 *
 * API의 section별 목록을 화면에서 다시 이 순서로 조립한다. 데이터 저장 구조나
 * 문제 풀이 URL에 의존하지 않으므로 교재 목차와 화면 구성을 한곳에서 관리할 수 있다.
 */
export const TOPIK_RECIPE_CURRICULUM: TopikRecipeCurriculumChapter[] = [
  {
    key: "level-3-grammar-vocabulary",
    level: 3,
    title: title(
      "문법·어휘",
      "Grammatika va lug'at",
      "Grammar and vocabulary",
      "Грамматика и лексика",
    ),
    groupCodes: ["reading-01-02", "reading-03-04", "reading-05-08"],
  },
  {
    key: "level-3-situation-response",
    level: 3,
    title: title(
      "상황과 그에 따른 반응",
      "Vaziyat va mos javob",
      "Situations and responses",
      "Ситуации и подходящие реакции",
    ),
    groupCodes: ["listening-01-02", "listening-04-08", "listening-09-12"],
  },
  {
    key: "level-3-detail-match",
    level: 3,
    title: title(
      "내용 일치",
      "Mazmunning mosligi",
      "Matching details",
      "Соответствие содержанию",
    ),
    groupCodes: [
      "listening-13",
      "listening-14",
      "listening-15",
      "listening-16",
      "reading-09-12",
      "reading-19-20",
    ],
  },
  {
    key: "level-3-main-idea",
    level: 3,
    title: title("중심 생각", "Asosiy fikr", "Main idea", "Основная мысль"),
    groupCodes: ["listening-17-19", "listening-20"],
  },
  {
    key: "level-3-order",
    level: 3,
    title: title("순서 배열", "Ketma-ketlik", "Ordering", "Последовательность"),
    groupCodes: ["reading-13-15"],
  },
  {
    key: "level-3-blank",
    level: 3,
    title: title(
      "빈칸 채우기",
      "Bo'sh joyni to'ldirish",
      "Filling blanks",
      "Заполнение пропусков",
    ),
    groupCodes: ["reading-16-18", "writing-51", "writing-52"],
  },
  {
    key: "level-3-graph",
    level: 3,
    title: title("그래프", "Grafiklar", "Graphs", "Графики"),
    groupCodes: ["listening-03", "writing-53"],
  },
  {
    key: "level-4-formal-conversation",
    level: 4,
    title: title(
      "격식적 대화",
      "Rasmiy suhbat",
      "Formal conversations",
      "Официальные разговоры",
    ),
    groupCodes: [
      "listening-21-22",
      "listening-25-26",
      "listening-29-30",
      "listening-23-24",
      "listening-27-28",
    ],
  },
  {
    key: "level-4-main-text",
    level: 4,
    title: title(
      "논설문·설명문",
      "Munozarali va izohli matn",
      "Argumentative and expository texts",
      "Аргументативные и пояснительные тексты",
    ),
    groupCodes: ["reading-21-22"],
  },
  {
    key: "level-4-headline",
    level: 4,
    title: title(
      "신문 기사 제목",
      "Gazeta sarlavhalari",
      "News headlines",
      "Заголовки новостей",
    ),
    groupCodes: ["reading-25-27"],
  },
  {
    key: "level-4-personal-text",
    level: 4,
    title: title(
      "개인적인 글",
      "Shaxsiy matn",
      "Personal texts",
      "Личные тексты",
    ),
    groupCodes: ["reading-23-24"],
  },
  {
    key: "level-4-information",
    level: 4,
    title: title(
      "정보 전달",
      "Axborot yetkazish",
      "Information delivery",
      "Передача информации",
    ),
    groupCodes: ["reading-28-31"],
  },
  {
    key: "level-5-formal-discourse",
    level: 5,
    title: title(
      "공식적 담화",
      "Rasmiy nutq",
      "Formal discourse",
      "Официальная речь",
    ),
    groupCodes: [
      "listening-31-32",
      "listening-33-34",
      "listening-35-36",
      "listening-37-38",
      "listening-39-40",
    ],
  },
  {
    key: "level-5-information",
    level: 5,
    title: title(
      "정보 전달",
      "Axborot yetkazish",
      "Information delivery",
      "Передача информации",
    ),
    groupCodes: ["reading-32-34", "reading-35-38", "reading-39-41"],
  },
  {
    key: "level-6-fiction",
    level: 6,
    title: title("소설", "Badiiy asar", "Fiction", "Художественный текст"),
    groupCodes: ["reading-42-43"],
  },
  {
    key: "level-6-information",
    level: 6,
    title: title(
      "정보 전달",
      "Axborot yetkazish",
      "Information delivery",
      "Передача информации",
    ),
    groupCodes: ["reading-44-45", "reading-46-47", "reading-48-50"],
  },
  {
    key: "level-6-formal-discourse",
    level: 6,
    title: title(
      "공식적 담화",
      "Rasmiy nutq",
      "Formal discourse",
      "Официальная речь",
    ),
    groupCodes: [
      "listening-41-42",
      "listening-45-46",
      "listening-49-50",
      "listening-47-48",
    ],
  },
  {
    key: "level-6-documentary",
    level: 6,
    title: title(
      "정보 전달·다큐멘터리",
      "Axborot va hujjatli dastur",
      "Information and documentaries",
      "Информация и документальные программы",
    ),
    groupCodes: ["listening-43-44"],
  },
  {
    key: "level-6-writing",
    level: 6,
    title: title("작문", "Yozma ish", "Essay writing", "Письменная работа"),
    groupCodes: ["writing-54"],
  },
];

export const TOPIK_RECIPE_LEVELS: TopikRecipeTargetLevel[] = [3, 4, 5, 6];
