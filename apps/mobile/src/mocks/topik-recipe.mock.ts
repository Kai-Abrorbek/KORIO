import type {
  TopikRecipeDetail,
  TopikRecipePractice,
  TopikRecipeSummary,
} from "@/types/topik-recipe";

/**
 * 읽기 1~2번 학습 페이지 mock.
 * 시드가 들어오기 전까지 화면 확인용으로 쓴다.
 * 문법/예상문제는 분량을 줄여 넣었고, 실제 콘텐츠는 seed 에서 채운다.
 */

const text = (ko: string, uz: string) => ({ ko, uz, en: "", ru: "" });

/** 한 줄짜리 문제 지문 블록 */
const line = (segments: Array<{ t: string; blank?: boolean }>) => [
  {
    type: "paragraph" as const,
    segments: segments.map((s, i) => ({
      type: (s.blank ? "blank" : "plain") as any,
      text: s.blank ? "(          )" : s.t,
      key: `s${i}`,
      label: "",
    })),
  },
];

const choices = (items: string[]) =>
  items.map((t, i) => ({ key: `c${i + 1}`, text: t, order: i + 1 }));

export const MOCK_RECIPE_LIST: TopikRecipeSummary[] = [
  {
    groupCode: "reading-01-02",
    section: "reading",
    label: text("읽기 1번~2번", "O'qish 1~2-savol"),
    title: text("알맞은 문법", "Mos grammatika"),
    fromNumber: 1,
    toNumber: 2,
    targetLevel: 3,
    order: 1,
    ready: true,
    exampleCount: 2,
    practiceCount: 20,
    grammarCount: 50,
  },
  {
    groupCode: "reading-03-04",
    section: "reading",
    label: text("읽기 3번~4번", "O'qish 3~4-savol"),
    title: text("", ""),
    fromNumber: 3,
    toNumber: 4,
    targetLevel: 0,
    order: 2,
    ready: false,
    exampleCount: 0,
    practiceCount: 0,
    grammarCount: 0,
  },
  {
    groupCode: "reading-05-08",
    section: "reading",
    label: text("읽기 5번~8번", "O'qish 5~8-savol"),
    title: text("", ""),
    fromNumber: 5,
    toNumber: 8,
    targetLevel: 0,
    order: 3,
    ready: false,
    exampleCount: 0,
    practiceCount: 0,
    grammarCount: 0,
  },
];

export const MOCK_RECIPE_DETAIL: TopikRecipeDetail = {
  groupCode: "reading-01-02",
  section: "reading",
  label: text("읽기 1번~2번", "O'qish 1~2-savol"),
  title: text("알맞은 문법", "Mos grammatika"),
  intro: text(
    "읽기 [1~2]번 유형은 문맥에 알맞은 문법을 고르는 문항이다. 기본 문법 사용 능력을 측정하는 문항으로 3급 수준의 문법이 출제된다.",
    "O'qish [1~2] turi kontekstga mos grammatikani tanlash savolidir. Asosiy grammatikadan foydalanish qobiliyatini o'lchaydi, 3-daraja darajasidagi grammatika chiqadi.",
  ),
  targetLevel: 3,
  goldenRecipe: [
    {
      order: 1,
      text: text(
        "중급 수준의 문법 기능과 의미에 대해 알고 있어야 한다.",
        "O'rta daraja grammatikasining vazifasi va ma'nosini bilish kerak.",
      ),
    },
    {
      order: 2,
      text: text(
        "〈연결어미〉는 앞의 내용과 뒤의 내용을 (A → B)로 나눈 다음에 어울리는 문법을 선택해야 한다.",
        "〈Bog'lovchi qo'shimcha〉da oldingi va keyingi mazmunni (A → B) ga ajratib, mos grammatikani tanlash kerak.",
      ),
    },
    {
      order: 3,
      text: text(
        "〈종결어미〉는 뒤의 내용의 시제가 과거, 현재, 미래인지를 판단한 다음에 어울리는 문법을 선택해야 한다.",
        "〈Tugallovchi qo'shimcha〉da keyingi mazmun o'tgan, hozirgi yoki kelasi zamonda ekanini aniqlab, mos grammatikani tanlash kerak.",
      ),
    },
  ],
  grammarSections: [
    {
      key: "connective",
      title: text("연결어미", "Bog'lovchi qo'shimchalar"),
      entries: [
        {
          rank: 1,
          form: "-다가",
          meanings: [
            text("행동 전환: 의지", "Harakat o'zgarishi: ixtiyoriy"),
            text("행동 전환: 의외", "Harakat o'zgarishi: kutilmagan"),
          ],
          examples: [
            "집에 가다가 시장에 들러서 과자를 샀다.",
            "계단을 뛰어 내려가다가 넘어질 뻔했다.",
          ],
          highlights: ["가다가", "내려가다가"],
        },
        {
          rank: 2,
          form: "-고 나서",
          meanings: [text("순서: 완료", "Tartib: tugallanish")],
          examples: ["어제 퇴근하고 나서 친구들과 만났다."],
          highlights: ["퇴근하고 나서"],
        },
        {
          rank: 3,
          form: "-(으)ㄴ/는데",
          meanings: [
            text("상반: 대조", "Qarama-qarshilik: taqqoslash"),
            text("설명: 도입", "Tushuntirish: kirish"),
          ],
          examples: [
            "저 식당은 음식값은 저렴한데 맛이 별로 없다.",
            "행사장에 도착했는데 사람들이 많이 와 있었다.",
          ],
          highlights: ["저렴한데", "도착했는데"],
        },
        {
          rank: 4,
          form: "-(으)려고",
          meanings: [text("목적", "Maqsad")],
          examples: ["고향에 가려고 기차표를 미리 예매했다."],
          highlights: ["가려고"],
        },
        {
          rank: 5,
          form: "-(으)려면",
          meanings: [text("가정: 의도", "Faraz: niyat")],
          examples: ["다음 버스를 타려면 삼십 분을 기다려야 한다."],
          highlights: ["타려면"],
        },
      ],
      tips: [
        text(
          "빈칸 앞에 '누가(누구와), 언제, 무엇을(무슨), 어디에, 어떻게(어떤), 어느' 등 의문사가 나오면 뒤의 문법은 〈선택: 무관〉의 '-든지' 아니면 〈선택: 고민〉의 '-(으)ㄹ지', 〈확인〉의 '-(으)/는지'라는 점을 기억해 두어야 한다.",
          "Bo'sh joy oldida so'roq so'zlari kelsa, keyingi grammatika '-든지', '-(으)ㄹ지' yoki '-(으)/는지' bo'lishini eslab qoling.",
        ),
      ],
    },
    {
      key: "final",
      title: text("종결어미", "Tugallovchi qo'shimchalar"),
      entries: [
        {
          rank: 1,
          form: "-아/어 놓다.",
          meanings: [text("유지: 대비", "Saqlash: tayyorgarlik")],
          examples: ["내일은 바쁠 것 같아서 오늘 미리 신청서를 써 놓았다."],
          highlights: ["써 놓았다."],
        },
        {
          rank: 2,
          form: "-기로 했다.",
          meanings: [
            text("계획: 약속", "Reja: va'da"),
            text("계획: 결심", "Reja: qaror"),
          ],
          examples: [
            "나는 이번 방학에 부모님과 같이 설악산에 여행을 가기로 했다.",
            "나는 내일부터 담배를 끊기로 했다.",
          ],
          highlights: ["가기로 했다.", "끊기로 했다."],
        },
        {
          rank: 3,
          form: "-(으)면 되다.",
          meanings: [text("조건: 충족", "Shart: qanoatlanish")],
          examples: ["지하철역으로 가려면 이쪽으로 3분쯤 걸어가면 된다."],
          highlights: ["걸어가면 된다."],
        },
      ],
      tips: [],
    },
  ],
  examples: [
    {
      id: "mock-ex-1",
      code: "recipe_r0102_ex1",
      number: 1,
      type: "grammar_fill_blank",
      points: 2,
      prompt: line([
        { t: "휴대 전화를 " },
        { t: "", blank: true },
        { t: " 내려야 할 역을 지나쳤다." },
      ]),
      choices: choices(["보든지", "보다가", "보려면", "보고서"]),
      tags: ["TOPIK II 60회 읽기 1번"],
      difficulty: 3,
      correctChoiceKey: "c2",
      solution: {
        explanation: text(
          "'내려야 할 역을 지나쳤다'는 의외의 내용이다. 이때 호응하는 문법은 〈행동: 의외〉를 나타내는 '-다가'를 찾아야 한다. '-다가'는 앞의 내용을 하는 중에 뒤의 행동으로 바뀔 때 사용한다.",
          "'Tushishim kerak bo'lgan bekatdan o'tib ketdim' — kutilmagan mazmun. Bunda 〈harakat: kutilmagan〉 ma'nosidagi '-다가' mos keladi.",
        ),
        strategy: text(
          "휴대 전화를 보다\n→ 내려야 할 역을 지나쳤다.",
          "Telefonga qarash → tushish kerak bo'lgan bekatdan o'tib ketish",
        ),
        steps: [],
        choiceNotes: [],
      },
    },
    {
      id: "mock-ex-2",
      code: "recipe_r0102_ex2",
      number: 2,
      type: "grammar_fill_blank",
      points: 2,
      prompt: line([
        { t: "한국 친구 덕분에 한국 문화를 많이 " },
        { t: "", blank: true },
        { t: "." },
      ]),
      choices: choices([
        "알게 되었다",
        "알도록 했다",
        "알아도 된다",
        "알아야 한다",
      ]),
      tags: ["TOPIK II 60회 읽기 2번"],
      difficulty: 3,
      correctChoiceKey: "c1",
      solution: {
        explanation: text(
          "앞의 내용인 '한국 친구 덕분에'는 〈이유〉로 긍정적인 이유와 결과를 나타낸다. 뒤의 내용은 결과이기 때문에 과거시제를 찾으면 되는데 과거시제는 ①번과 ②번이다. 이 중에서 '그 전에는 한국 문화를 잘 몰랐는데 한국 친구 덕분에 알았다'라는 의미를 완성하려면 〈설명: 변화〉의 '-게 되다'를 찾아야 한다.",
          "'한국 친구 덕분에' — ijobiy sabab va natijani bildiradi. Keyingi qism natija bo'lgani uchun o'tgan zamon kerak. 〈tushuntirish: o'zgarish〉 ma'nosidagi '-게 되다' mos keladi.",
        ),
        strategy: text(
          "한국 친구 덕분에\n→ 한국 문화를 많이 알다.",
          "Koreys do'st tufayli → koreys madaniyatini ko'p bilish",
        ),
        steps: [],
        choiceNotes: [],
      },
    },
  ],
  practiceCount: 20,
};

export const MOCK_RECIPE_PRACTICE: TopikRecipePractice = {
  groupCode: "reading-01-02",
  label: text("읽기 1번~2번", "O'qish 1~2-savol"),
  title: text("알맞은 문법", "Mos grammatika"),
  questions: [
    {
      id: "mock-p-1",
      code: "recipe_r0102_p1",
      number: 1,
      type: "grammar_fill_blank",
      points: 2,
      prompt: line([
        { t: "운동장에서 " },
        { t: "", blank: true },
        { t: " 친구와 부딪혀서 넘어졌다." },
      ]),
      choices: choices([
        "축구할수록",
        "축구하던데",
        "축구하다가",
        "축구하려고",
      ]),
      tags: ["연결어미"],
      difficulty: 3,
    },
    {
      id: "mock-p-2",
      code: "recipe_r0102_p2",
      number: 2,
      type: "grammar_fill_blank",
      points: 2,
      prompt: line([
        { t: "나는 저녁을 " },
        { t: "", blank: true },
        { t: " 집 앞 공원에서 산책을 한다." },
      ]),
      choices: choices(["먹고 나서", "먹다 보면", "먹을 만큼", "먹는 길에"]),
      tags: ["연결어미"],
      difficulty: 3,
    },
    {
      id: "mock-p-3",
      code: "recipe_r0102_p3",
      number: 3,
      type: "grammar_fill_blank",
      points: 2,
      prompt: line([
        { t: "내일 전시회가 " },
        { t: "", blank: true },
        { t: " 사람들이 많이 올 것 같다." },
      ]),
      choices: choices(["열리듯이", "열리는데", "열리든지", "열리도록"]),
      tags: ["연결어미"],
      difficulty: 3,
    },
    {
      id: "mock-p-4",
      code: "recipe_r0102_p4",
      number: 4,
      type: "grammar_fill_blank",
      points: 2,
      prompt: line([
        { t: "사무실을 청소하면서 중요한 서류인 것 같아서 서랍에 " },
        { t: "", blank: true },
        { t: "." },
      ]),
      choices: choices([
        "넣어 놓았다",
        "넣을 뻔했다",
        "넣고 있었다",
        "넣기만 했다",
      ]),
      tags: ["종결어미"],
      difficulty: 3,
    },
  ],
};

/** 채점용 (실제로는 제출 후 서버에서 받아온다) */
export const MOCK_RECIPE_SOLUTIONS = [
  { id: "mock-p-1", correctChoiceKey: "c3", solution: null },
  { id: "mock-p-2", correctChoiceKey: "c1", solution: null },
  { id: "mock-p-3", correctChoiceKey: "c2", solution: null },
  { id: "mock-p-4", correctChoiceKey: "c1", solution: null },
];
