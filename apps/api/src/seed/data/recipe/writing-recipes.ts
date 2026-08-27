import {
  TopikQuestionType,
  TopikResponseType,
  TopikSection,
} from '../../../topik/schemas/topik-content.schema';
import { RecipeSeed, RecipeSeedQuestion, t4 } from './recipe-seed.types';

const noAnswerAppendixChoices = [
  {
    text: '교재에 제시된 채점 기준에 맞춰 지문 안의 어휘로 답안을 직접 작성한다.',
    correct: true,
  },
  {
    text: '지문에 없는 정보를 새로 만들어 어려운 어휘와 문법을 최대한 많이 쓴다.',
  },
];

const noAnswerAppendixExplanation = t4(
  '제공된 교재에는 이 예상문제의 정답 부록이 포함되어 있지 않다. 따라서 임의의 모범답안을 만들지 않고, 지문 안의 어휘 사용·문맥에 맞는 목적어와 서술어·문법과 종결 부호·맞춤법과 띄어쓰기를 채점 기준으로 삼는다.',
  "Berilgan kitobda ushbu taxminiy savollarning javob ilovasi yo'q. Shu sababli sun'iy namunaviy javob qo'shilmaydi; matndagi so'zlardan foydalanish, mos obyekt-kesim, grammatika, tinish belgisi, imlo va bo'shliq mezon sifatida olinadi.",
  'The supplied book does not include its answer appendix for these predicted questions. No answer is invented; grading follows use of passage vocabulary, a context-appropriate object and predicate, grammar and punctuation, spelling, and spacing.',
  'В предоставленной книге нет приложения с ответами к этим прогнозным заданиям. Поэтому образец не придумывается; проверяются лексика исходного текста, подходящие дополнение и сказуемое, грамматика, пунктуация, орфография и пробелы.',
);

function exactAnswerChoices(answer: string, commonMistake: string) {
  return [{ text: answer, correct: true }, { text: commonMistake }];
}

const sentenceCompletionConfig: NonNullable<
  RecipeSeedQuestion['writingConfig']
> = {
  fields: [
    {
      key: 'blank-1',
      label: '㉠',
      minCharacters: 1,
      maxCharacters: 100,
      multiline: false,
    },
    {
      key: 'blank-2',
      label: '㉡',
      minCharacters: 1,
      maxCharacters: 100,
      multiline: false,
    },
  ],
  recommendedMinutes: 10,
  guide: t4(
    '각 빈칸에 문맥에 맞는 말을 한 문장씩 쓰십시오.',
    "Har bir bo'sh joyga kontekstga mos bittadan gap yozing.",
    'Write one context-appropriate sentence for each blank.',
    'Напишите по одному подходящему предложению в каждый пропуск.',
  ),
};

const dataDescriptionConfig: NonNullable<RecipeSeedQuestion['writingConfig']> =
  {
    fields: [
      {
        key: 'answer',
        label: '200~300자 답안',
        minCharacters: 200,
        maxCharacters: 300,
        multiline: true,
      },
    ],
    recommendedMinutes: 15,
    guide: t4(
      '제목을 쓰지 말고 자료의 모든 요구 내용을 200~300자로 설명하십시오.',
      "Sarlavhasiz, barcha talab qilingan ma'lumotni 200-300 belgida tasvirlang.",
      'Without a title, describe all required data in 200-300 characters.',
      'Без заголовка опишите все требуемые данные в 200–300 знаках.',
    ),
  };

const essayConfig: NonNullable<RecipeSeedQuestion['writingConfig']> = {
  fields: [
    {
      key: 'answer',
      label: '600~700자 답안',
      minCharacters: 600,
      maxCharacters: 700,
      multiline: true,
    },
  ],
  recommendedMinutes: 50,
  guide: t4(
    '문제를 그대로 옮겨 쓰지 말고 세 질문에 모두 답하는 글을 600~700자로 쓰십시오.',
    "Savolni ko'chirmasdan, uch savolning barchasiga 600-700 belgida javob yozing.",
    'Answer all three prompts in 600-700 characters without copying the question.',
    'Ответьте на все три вопроса в 600–700 знаках, не переписывая условие.',
  ),
};

const outlineReviewConfig: NonNullable<RecipeSeedQuestion['writingConfig']> = {
  fields: [
    {
      key: 'answer',
      label: '개요 정리',
      minCharacters: 20,
      maxCharacters: 800,
      multiline: true,
    },
  ],
  recommendedMinutes: 5,
  guide: t4(
    '교재의 개요와 결론 흐름을 자신의 말로 정리하십시오.',
    "Kitobdagi reja va xulosa oqimini o'z so'zingiz bilan yozing.",
    "Restate the book's outline or conclusion flow in your own words.",
    'Изложите ход плана или вывода книги своими словами.',
  ),
};

const sentenceCompletionRubric = [
  t4(
    '두 빈칸을 각각 문맥에 맞는 완결된 한 문장으로 작성한다.',
    "Har ikki bo'sh joyni kontekstga mos to'liq gap bilan yozadi.",
    'Completes both blanks with one context-appropriate full sentence each.',
    'Заполняет оба пропуска по одному полному предложению по контексту.',
  ),
  t4(
    '지문 안의 핵심 어휘와 목적어·서술어의 대응 관계를 정확히 사용한다.',
    "Matndagi asosiy so'z va obyekt-kesim mosligini aniq ishlatadi.",
    'Uses key passage vocabulary and the correct object-predicate relationship.',
    'Точно использует ключевую лексику и связь дополнения со сказуемым.',
  ),
  t4(
    '문법·높임말·종결 부호·맞춤법·띄어쓰기가 자연스럽고 정확하다.',
    "Grammatika, hurmat uslubi, tinish belgisi, imlo va bo'shliq tabiiy va to'g'ri.",
    'Grammar, politeness, punctuation, spelling, and spacing are natural and accurate.',
    'Грамматика, вежливость, пунктуация, орфография и пробелы естественны и точны.',
  ),
];

const dataDescriptionRubric = [
  t4(
    '문제에서 요구한 조사 개요·수치·순위·변화·원인·전망을 빠짐없이 정확하게 쓴다.',
    "Savolda so'ralgan so'rov tavsifi, raqam, reyting, o'zgarish, sabab va prognozni to'liq va aniq yozadi.",
    'Accurately covers every requested survey detail, figure, rank, change, cause, and forecast.',
    'Точно и полностью передаёт сведения об исследовании, числа, ранги, изменения, причины и прогноз.',
  ),
  t4(
    '조사 개요에서 핵심 변화와 비교, 원인이나 전망으로 이어지는 구성이 논리적이다.',
    "So'rov tavsifi, asosiy o'zgarish va qiyos, sabab yoki prognoz mantiqan ulanadi.",
    'Organizes survey setup, key change and comparison, and cause or forecast logically.',
    'Логично связывает сведения об опросе, ключевые изменения и сравнение, причины или прогноз.',
  ),
  t4(
    '200~300자를 지키고 제목 없이 정확한 문법·맞춤법·띄어쓰기로 쓴다.',
    "200-300 belgini saqlab, sarlavhasiz va to'g'ri grammatika, imlo hamda bo'shliq bilan yozadi.",
    'Writes 200-300 characters without a title, using accurate grammar, spelling, and spacing.',
    'Пишет 200–300 знаков без заголовка с точной грамматикой, орфографией и пробелами.',
  ),
];

const essayRubric = [
  t4(
    '문제의 세 질문에 모두 답하고 주제에서 벗어나지 않는다.',
    'Uch savolning barchasiga javob beradi va mavzudan chiqmaydi.',
    'Answers all three prompts and stays on topic.',
    'Отвечает на все три вопроса и не отклоняется от темы.',
  ),
  t4(
    '개요에 따라 서론·본론·결론을 구성하고 장점·문제점·입장과 근거를 논리적으로 연결한다.',
    "Reja bo'yicha kirish, asosiy qism va xulosani tuzib, afzallik, muammo, pozitsiya va dalilni mantiqan bog'laydi.",
    'Follows an introduction-body-conclusion outline and logically connects benefits, problems, position, and reasons.',
    'Строит введение, основную часть и заключение, логично связывая преимущества, проблемы, позицию и основания.',
  ),
  t4(
    '600~700자를 지키고 문제를 그대로 옮기지 않으며 문어체 문법·어휘·맞춤법·띄어쓰기를 정확히 사용한다.',
    "600-700 belgini saqlaydi, savolni ko'chirmaydi va yozma uslub grammatikasi, so'z, imlo hamda bo'shliqni to'g'ri ishlatadi.",
    'Writes 600-700 characters without copying the prompt and uses accurate formal grammar, vocabulary, spelling, and spacing.',
    'Пишет 600–700 знаков, не копирует условие и точно использует письменный стиль, лексику, орфографию и пробелы.',
  ),
];


function asWrittenQuestion(
  question: RecipeSeedQuestion,
  writingConfig: NonNullable<RecipeSeedQuestion['writingConfig']>,
  points: number,
  rubric: ReturnType<typeof t4>[],
  includeSampleAnswer: boolean,
): RecipeSeedQuestion {
  const sampleAnswer = includeSampleAnswer
    ? question.choices.find((choice) => choice.correct)?.text
    : undefined;

  return {
    ...question,
    responseType: TopikResponseType.WRITTEN,
    points,
    choices: [],
    writingConfig,
    solution: {
      ...question.solution,
      ...(sampleAnswer ? { sampleAnswer } : {}),
      rubric,
    },
  };
}

function normalizeRecipeRankings(recipe: RecipeSeed): RecipeSeed {
  return {
    ...recipe,
    grammarSections: recipe.grammarSections.map((section) => ({
      ...section,
      entries: section.entries.map((entry) => ({
        ...entry,
        highlights:
          entry.highlights.length === entry.examples.length
            ? entry.highlights
            : [entry.highlights.join(' / ')],
      })),
    })),
  };
}

const writing51Examples: RecipeSeedQuestion[] = [
  {
    code: 'recipe-writing-51-ex-35',
    number: 51,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    prompt:
      '저는 유학생인데 공부를 마치고 다음 주에 고향으로 돌아갑니다. 그래서 지금 ㉠ ___. 책상, 의자, 컴퓨터, 경영학 전공 책 등이 있습니다. 이번 주 금요일까지 방을 비워 줘야 합니다. ㉡ ___. 제 전화번호는 010-1234-5678입니다.',
    choices: exactAnswerChoices(
      '㉠ 제가 사용하던 물건을 무료로 드리려고 합니다. / ㉡ 금요일 전까지 연락해 주십시오.',
      '㉠ 물건이 필요합니다. / ㉡ 금요일에 고향에 갑니다.',
    ),
    source: 'TOPIK II 35회 쓰기 51번 · 합격 레시피 PDF 116쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '제목과 열거된 물건에서 ‘무료로 드리다’를 찾고, 마지막의 기한과 전화번호를 ‘언제까지 연락하다’로 연결한다.',
        "Sarlavha va buyumlar ro'yxatidan ‘bepul berish’ni toping; muddat va telefon raqamini ‘qachongacha bog'lanish’ bilan ulang.",
        'Use the title and item list to identify “give away for free,” then connect the deadline and phone number to “contact by when.”',
        'По заголовку и списку вещей определите «отдать бесплатно», затем свяжите срок и номер телефона с просьбой связаться до указанного времени.',
      ),
      explanation: t4(
        '㉠은 ‘제가 사용하던 물건’이라는 목적어와 계획 표현 ‘-려고 합니다’를 함께 써야 한다. ㉡은 뒤에 전화번호가 있으므로 연락을 요청하고, 앞의 ‘금요일까지’를 기한으로 사용한다.',
        "㉠ da ‘men ishlatgan buyumlar’ obyekti va reja ifodasi ‘-려고 합니다’ birga keladi. ㉡ da telefon raqami borligi uchun bog'lanish so'raladi va ‘juma kunigacha’ muddat sifatida ishlatiladi.",
        'Blank ㉠ needs both the object “the things I used” and the plan form -려고 합니다. Blank ㉡ requests contact because a phone number follows and uses Friday as the deadline.',
        'В ㉠ нужны дополнение «вещи, которыми я пользовался» и конструкция плана -려고 합니다. В ㉡ просят связаться, так как далее указан телефон, а пятница служит сроком.',
      ),
    },
  },
  {
    code: 'recipe-writing-51-ex-60',
    number: 52,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    prompt:
      '한국대학교를 졸업한 학생인데 도서관을 이용하고 싶습니다. 선배에게 물어보니 졸업생이 도서관을 이용하려면 출입증이 ㉠ ___. 출입증을 만들려면 ㉡ ___? 방법을 알려 주시면 감사하겠습니다.',
    choices: exactAnswerChoices(
      '㉠ 필요하다고 합니다(또는 있어야 한다고 합니다). / ㉡ 어떻게 해야 합니까(또는 어떻게 해야 됩니까)?',
      '㉠ 만들고 싶습니다. / ㉡ 언제 만들었습니다?',
    ),
    source: 'TOPIK II 60회 쓰기 51번 · 합격 레시피 PDF 117쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '‘선배에게 물어보니’ 뒤에는 간접화법을 쓰고, 물음표와 ‘방법을 알려 주시면’에서 ‘어떻게 해야 합니까?’를 완성한다.',
        "‘선배에게 물어보니’dan keyin bilvosita nutqni qo'llang; savol belgisi va ‘usulni aytsangiz’ mazmunidan ‘qanday qilish kerak?’ni tuzing.",
        'Use reported speech after “I asked a senior,” then use the question mark and request for instructions to form “What should I do?”',
        'После «я спросил старшего» используйте косвенную речь, а по вопросительному знаку и просьбе объяснить способ составьте «Что нужно сделать?».',
      ),
      explanation: t4(
        '㉠의 핵심 어휘는 ‘필요하다/있다’이고 ‘-다고 합니다’로 연결한다. ㉡은 ‘-(으)려면’과 자주 호응하는 ‘-아/어야 하다’를 쓰며, 방법을 묻기 때문에 ‘어떻게’를 넣는다.',
        "㉠ ning asosiy so'zlari ‘kerak/bor’ bo'lib, ‘-다고 합니다’ bilan ulanadi. ㉡ da ‘-(으)려면’ bilan mos ‘-아/어야 하다’ va usulni so'rash uchun ‘어떻게’ ishlatiladi.",
        'The key predicate in ㉠ is 필요하다 or 있다, reported with -다고 합니다. Blank ㉡ pairs -(으)려면 with -아/어야 하다 and uses 어떻게 because it asks for a method.',
        'Ключевое сказуемое в ㉠ — 필요하다 или 있다 в косвенной речи -다고 합니다. В ㉡ конструкция -(으)려면 сочетается с -아/어야 하다, а для вопроса о способе используется 어떻게.',
      ),
    },
  },
  {
    code: 'recipe-writing-51-ex-52',
    number: 53,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    prompt:
      '수미 씨, 지난번에 책을 ㉠ ___ 고맙습니다. 수미 씨의 책 덕분에 과제를 잘할 수 있었습니다. 그런데 책을 언제 ㉡ ___? 시간을 말씀해 주시면 찾아가겠습니다.',
    choices: exactAnswerChoices(
      '㉠ 빌려줘서 / ㉡ 돌려주면 될까요?',
      '㉠ 읽어서 / ㉡ 빌리면 됩니까?',
    ),
    source: 'TOPIK II 52회 쓰기 51번 · 합격 레시피 PDF 119쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '고마운 이유는 ‘책을 빌려주다’이고, ‘언제’와 물음표 뒤의 방문 약속은 반대 동작 ‘돌려주다’와 의향 질문을 요구한다.',
        "Minnatdorchilik sababi ‘kitobni berib turish’; ‘qachon’, savol belgisi va borib olish va'dasi esa qarama-qarshi harakat ‘qaytarish’ hamda ruxsat/niyat savolini talab qiladi.",
        'The reason for thanks is lending the book. “When,” the question mark, and the promise to visit require the reverse action, returning it, plus an intention question.',
        'Причина благодарности — одолженная книга. «Когда», вопросительный знак и обещание прийти требуют обратного действия «вернуть» и вопроса о намерении.',
      ),
      explanation: t4(
        '㉠은 이유를 나타내는 ‘-아/어서’를 사용해 ‘빌려줘서’가 된다. ㉡은 ‘빌려주다’의 반대 동사 ‘돌려주다’에 허락이나 의향을 묻는 ‘-(으)면 될까요?’를 붙인다.',
        "㉠ sabab shakli ‘-아/어서’ bilan ‘빌려줘서’ bo'ladi. ㉡ da ‘빌려주다’ning qarama-qarshi fe'li ‘돌려주다’ga ruxsat yoki niyatni so'rovchi ‘-(으)면 될까요?’ qo'shiladi.",
        'Blank ㉠ uses the reason form -아/어서, producing 빌려줘서. Blank ㉡ attaches -(으)면 될까요? to the opposite of lending, 돌려주다.',
        'В ㉠ используется причинная форма -아/어서: 빌려줘서. В ㉡ к противоположному действию 돌려주다 добавляется вопрос о разрешении -(으)면 될까요?',
      ),
    },
  },
].map((question) =>
  asWrittenQuestion(
    question,
    sentenceCompletionConfig,
    10,
    sentenceCompletionRubric,
    true,
  ),
);

const writing51Practice: RecipeSeedQuestion[] = [
  {
    code: 'recipe-writing-51-pr-public-roommate',
    number: 51,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    prompt:
      '룸메이트 구함: 저는 은혜대학교에 다니는 여학생입니다. 제가 살고 있는 집은 방이 두 개라서 혼자 살기 좀 큰 편입니다. 그래서 함께 ㉠ ___. 학교에서 가깝고 시설도 좋습니다. 저와 같이 살 생각이 있으신 여학생은 ㉡ ___. 제 전화번호는 010-1234-5678입니다.',
    choices: noAnswerAppendixChoices,
    source: '합격 레시피 예상문제 · PDF 120쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '제목 ‘룸메이트 구함’, ㉠ 앞의 ‘함께’, ㉡ 뒤의 전화번호를 연결한다. 공개적인 글이므로 높임말과 완결된 한 문장을 쓴다.',
        "‘Xonadosh qidiriladi’ sarlavhasi, ㉠ oldidagi ‘birga’ va ㉡ dan keyingi telefon raqamini ulang. Ommaviy matn bo'lgani uchun hurmat uslubi va to'liq gap yozing.",
        'Connect the title “Roommate wanted,” “together” before ㉠, and the phone number after ㉡. Use polite style and one complete sentence for each blank.',
        'Свяжите заголовок «Ищу соседа», слово «вместе» перед ㉠ и телефон после ㉡. Используйте вежливый стиль и полное предложение.',
      ),
      explanation: noAnswerAppendixExplanation,
    },
  },
  {
    code: 'recipe-writing-51-pr-public-club',
    number: 52,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    prompt:
      '회원 모집: 우리 차 모임 ‘차 사랑’에서는 함께 차도 마시고 우리 차에 대해 공부도 하실 분을 ㉠ ___. 차를 좋아하는 분이라면 누구나 환영합니다. 평일 오전 9시부터 오후 5시 사이에 언제든지 저희 사무실로 ㉡ ___. 사무실은 동아리회관 3층 303호입니다.',
    choices: noAnswerAppendixChoices,
    source: '합격 레시피 예상문제 · PDF 120쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '제목과 ‘분을’에서 모집 동사를, 시간·사무실 위치에서 방문 요청 동사를 찾는다. 목적어를 빼지 말고 높임말로 완성한다.',
        "Sarlavha va ‘분을’dan a'zo qidirish fe'lini, vaqt va ofis manzilidan tashrif so'rovini toping. Obyektni qoldirmay, hurmat shaklida yozing.",
        'Use the title and 분을 to find the recruiting predicate, then use the hours and office location to form a request to visit. Keep the object and polite ending.',
        'По заголовку и 분을 найдите сказуемое набора, а по времени и адресу офиса — просьбу прийти. Не опускайте дополнение и используйте вежливое окончание.',
      ),
      explanation: noAnswerAppendixExplanation,
    },
  },
  {
    code: 'recipe-writing-51-pr-personal-housewarming',
    number: 53,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    prompt:
      '마이클 윌리엄 씨께. 지난번 저희 결혼식에 참석해 주셔서 감사합니다. 새로 이사한 집도 이제 정리가 거의 끝났습니다. 그래서 ㉠ ___. 집들이 시간은 이번 주 토요일 저녁 6시입니다. 혹시 ㉡ ___? 그럼 연락 기다리겠습니다.',
    choices: noAnswerAppendixChoices,
    source: '합격 레시피 예상문제 · PDF 121쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '결혼식 감사, 새집 정리, 집들이 시간을 연결해 초대 목적을 찾는다. ㉡은 물음표와 ‘연락 기다리겠습니다’를 보고 참석 가능 여부를 예의 있게 묻는다.',
        "To'y uchun minnatdorchilik, yangi uy tayyorligi va uy bazmi vaqtini bog'lab taklif maqsadini toping. ㉡ da savol belgisi va javob kutish mazmunidan qatnashish imkonini muloyim so'rang.",
        'Connect thanks for the wedding, the finished move, and the housewarming time to identify an invitation. For ㉡, use the question mark and request for a reply to ask politely about availability.',
        'Свяжите благодарность за свадьбу, завершение переезда и время новоселья, чтобы определить приглашение. В ㉡ вежливо спросите о возможности прийти.',
      ),
      explanation: noAnswerAppendixExplanation,
    },
  },
  {
    code: 'recipe-writing-51-pr-personal-contest',
    number: 54,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    prompt:
      '안녕하세요? 저는 은혜대학교에 재학 중인 김준기라고 합니다. 이번에 개최되는 ‘대학 생활 사진 공모전’에 ㉠ ___. 공모전 응모 작품은 이메일에 첨부했으니 확인해 주시기 바랍니다. 그런데 혹시 응모 결과는 ㉡ ___? 공고문에 수상자 발표 날짜가 따로 나와 있지 않아서 문의드립니다.',
    choices: noAnswerAppendixChoices,
    source: '합격 레시피 예상문제 · PDF 121쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '첨부한 응모 작품에서 참가 의도를 찾고, 수상자 발표 날짜가 없다는 이유에서 결과 발표 시점을 질문한다.',
        "Ilova qilingan tanlov ishidan qatnashish niyatini toping; g'oliblar e'lon sanasi yo'qligidan natija qachon chiqishini so'rang.",
        'Infer the intention to enter from the attached submission, then ask when results will be announced because no winner-announcement date is listed.',
        'По приложенной работе определите намерение участвовать, затем спросите, когда объявят результаты, поскольку дата объявления победителей отсутствует.',
      ),
      explanation: noAnswerAppendixExplanation,
    },
  },
].map((question) =>
  asWrittenQuestion(
    question,
    sentenceCompletionConfig,
    10,
    sentenceCompletionRubric,
    false,
  ),
);

const writing52Examples: RecipeSeedQuestion[] = [
  {
    code: 'recipe-writing-52-ex-60',
    number: 52,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    prompt:
      '사람들은 음악 치료를 할 때 환자에게 주로 밝은 분위기의 음악을 들려줄 것이라고 생각한다. 그러나 환자에게 항상 밝은 분위기의 음악을 ㉠ ___. 치료 초기에는 환자가 편안한 감정을 느끼는 것이 중요하다. 그래서 환자의 심리 상태와 비슷한 분위기의 음악을 들려준다. 그 이후에는 환자에게 다양한 분위기의 음악을 들려줌으로써 환자가 다양한 감정을 ㉡ ___.',
    choices: exactAnswerChoices(
      '㉠ 들려주는 것은 아니다(또는 사용하는 것은 아니다). / ㉡ 느끼게 한다(또는 느끼도록 한다).',
      '㉠ 들려주는 것이 좋다. / ㉡ 느끼지 못한다.',
    ),
    source: 'TOPIK II 60회 쓰기 52번 · 합격 레시피 PDF 123쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '‘항상 밝은 음악’이라는 통념과 뒤의 치료 단계를 반대로 연결하고, ‘음악을 들려줌으로써’의 결과를 사동 표현으로 쓴다.',
        "‘Doimo yorqin musiqa’ degan qarashni keyingi davolash bosqichlari bilan qarama-qarshi bog'lang; ‘musiqa eshittirish orqali’ natijasini orttirma nisbatda yozing.",
        'Contrast the belief about always using bright music with the treatment stages that follow, then express the result of playing music with a causative form.',
        'Противопоставьте представление о постоянной весёлой музыке последующим этапам лечения и выразите результат прослушивания каузативной формой.',
      ),
      explanation: t4(
        '㉠은 ‘항상’과 ‘그러나’에 맞춰 부분 부정 ‘-는 것은 아니다’를 쓴다. ㉡은 환자에게 음악을 들려주어 감정을 느끼게 하는 관계이므로 ‘느끼게 한다/느끼도록 한다’가 된다.',
        "㉠ da ‘doimo’ va ‘ammo’ga mos qisman inkor ‘-는 것은 아니다’ ishlatiladi. ㉡ da musiqa bemorga tuyg'uni his qildiradi, shuning uchun ‘느끼게 한다/느끼도록 한다’ bo'ladi.",
        'Blank ㉠ uses partial negation -는 것은 아니다 with 항상 and 그러나. Blank ㉡ is causative because the music makes the patient experience different emotions.',
        'В ㉠ используется частичное отрицание -는 것은 아니다 в связи с 항상 и 그러나. В ㉡ нужна каузативная форма: музыка заставляет пациента испытывать разные эмоции.',
      ),
    },
  },
  {
    code: 'recipe-writing-52-ex-52',
    number: 53,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    prompt:
      '우리는 기분이 좋으면 밝은 표정을 짓는다. 그리고 기분이 좋지 않으면 표정이 어두워진다. 왜냐하면 ㉠ ___. 그런데 이와 반대로 표정이 우리의 감정에 영향을 주기도 한다. 그래서 기분이 안 좋을 때 밝은 표정을 지으면 기분도 따라서 좋아진다. 그러므로 우울할 때일수록 ㉡ ___ 것이 좋다.',
    choices: exactAnswerChoices(
      '㉠ 감정이 우리의 표정에 영향을 주기 때문이다. / ㉡ 밝은 표정을 짓는.',
      '㉠ 표정이 항상 같기 때문이다. / ㉡ 어두운 표정을 짓는.',
    ),
    source: 'TOPIK II 52회 쓰기 52번 · 합격 레시피 PDF 123쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '‘왜냐하면’은 앞의 현상 원인을 요구하고, ‘그러므로’는 바로 앞 실험의 행동을 의견 표현 ‘-는 것이 좋다’로 요약한다.',
        '‘왜냐하면’ oldingi hodisaning sababini talab qiladi; ‘그러므로’ esa oldingi harakatni ‘-는 것이 좋다’ tavsiyasi bilan jamlaydi.',
        '왜냐하면 calls for the cause of the preceding observation; 그러므로 summarizes the immediately preceding action with the recommendation -는 것이 좋다.',
        '왜냐하면 требует причину предыдущего явления, а 그러므로 подводит итог предыдущему действию рекомендацией -는 것이 좋다.',
      ),
      explanation: t4(
        '㉠은 앞의 두 문장을 ‘감정이 표정에 영향을 준다’로 묶고 ‘-기 때문이다’를 쓴다. ㉡은 ‘기분이 안 좋을 때 밝은 표정을 지으면 좋아진다’와 대응하므로 ‘밝은 표정을 짓는’이 들어간다.',
        "㉠ oldingi ikki gapni ‘his-tuyg'u yuz ifodasiga ta'sir qiladi’ deb birlashtirib ‘-기 때문이다’ni qo'llaydi. ㉡ oldingi sababga mos ravishda ‘밝은 표정을 짓는’ bo'ladi.",
        'Blank ㉠ combines the first two sentences as “emotion affects facial expression” and ends with -기 때문이다. Blank ㉡ repeats the helpful action, making a bright expression.',
        'В ㉠ первые два предложения сводятся к мысли «эмоции влияют на выражение лица» с -기 때문이다. В ㉡ повторяется полезное действие — делать светлое выражение лица.',
      ),
    },
  },
  {
    code: 'recipe-writing-52-ex-47',
    number: 54,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    prompt:
      '사람의 손에는 눈에 보이지 않는 세균이 많다. 그래서 병을 예방하기 위해서는 자주 ㉠ ___. 그런데 전문가들은 손을 씻을 때 꼭 ㉡ ___. 비누 없이 물로만 씻으면 손에 있는 세균을 제대로 없애기 어렵기 때문이다.',
    choices: exactAnswerChoices(
      '㉠ 손을 씻어야 한다. / ㉡ 비누를 사용하라고 한다.',
      '㉠ 약을 먹는 것이 좋다. / ㉡ 물만 사용하라고 한다.',
    ),
    source: 'TOPIK II 47회 쓰기 52번 · 합격 레시피 PDF 124쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '‘병을 예방하기 위해서는’과 호응하는 당위 표현을 쓰고, ‘전문가들은’ 뒤에는 뒤 문장의 비누와 연결되는 인용 표현을 쓴다.',
        "‘Kasallikning oldini olish uchun’ bilan mos zarurat shaklini, ‘mutaxassislar’ ortidan esa keyingi sovun mazmuniga bog'langan iqtibos shaklini yozing.",
        'Pair “in order to prevent disease” with an obligation form, then follow “experts” with reported advice linked to soap in the next sentence.',
        'Сочетайте «чтобы предотвратить болезнь» с формой необходимости, а после «специалисты» передайте совет, связанный с мылом в следующем предложении.',
      ),
      explanation: t4(
        '목적 ‘-기 위해서는’은 당위 ‘-아/어야 한다’와 호응한다. ‘전문가들은’은 인용 ‘-(으)라고 한다’를 요구하고, 뒤의 ‘비누 없이’가 반대 단서이므로 비누 사용을 넣는다.',
        "Maqsad ‘-기 위해서는’ zarurat ‘-아/어야 한다’ bilan mos keladi. ‘전문가들은’ iqtibos ‘-(으)라고 한다’ni talab qiladi; ‘sovunsiz’ qarama-qarshi ishora bo'lgani uchun sovundan foydalanish yoziladi.",
        'The purpose form -기 위해서는 pairs with obligation -아/어야 한다. 전문가들은 calls for reported advice -(으)라고 한다, and “without soap” points back to using soap.',
        'Целевая конструкция -기 위해서는 сочетается с обязанностью -아/어야 한다. После 전문가들은 нужна передача совета -(으)라고 한다, а «без мыла» указывает на необходимость использовать мыло.',
      ),
    },
  },
  {
    code: 'recipe-writing-52-ex-41',
    number: 55,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    prompt:
      '머리는 언제 감는 것이 좋을까? 사람들은 보통 아침에 머리를 감는다. 그러나 더러워진 머리는 감고 자야 머릿결이 좋기 때문에 ㉠ ___. 그런데 젖은 머리로 자면 머릿결이 상하기 쉽다. 따라서 ㉡ ___. 만약 머리를 말리기 어려우면 아침에 감는 것이 더 낫다.',
    choices: exactAnswerChoices(
      '㉠ 저녁에 감는 것이 좋다. / ㉡ 자기 전에 머리를 말리고 자야 한다.',
      '㉠ 아침에 감는 것이 좋다. / ㉡ 젖은 머리로 자는 것이 좋다.',
    ),
    source: 'TOPIK II 41회 쓰기 52번 · 합격 레시피 PDF 124쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '‘아침에 감는다. 그러나’의 반대 내용을 찾고, ‘젖은 머리로 자면 상한다. 따라서’의 해결 행동을 쓴다.',
        "‘Ertalab yuvadi. Ammo’ning qarama-qarshi mazmunini toping; ‘ho'l soch bilan yotsa zarar ko'radi. Shuning uchun’ga yechim harakatini yozing.",
        'Find the contrast after “People wash it in the morning. However…,” then write the preventive action after “Wet hair is damaged. Therefore…”.',
        'Найдите противопоставление после «обычно моют утром, однако…», затем запишите предотвращающее действие после «влажные волосы повреждаются, поэтому…».',
      ),
      explanation: t4(
        '㉠은 아침과 반대되는 ‘저녁’에 ‘-는 것이 좋다’를 사용한다. ㉡은 젖은 상태를 피하도록 ‘자기 전에 머리를 말리다’에 당위 ‘-아/어야 한다’를 붙인다.',
        "㉠ da ertalabning qarama-qarshisi ‘kechqurun’ va ‘-는 것이 좋다’ ishlatiladi. ㉡ da ho'l holatdan qochish uchun ‘uxlashdan oldin sochni quritish’ga ‘-아/어야 한다’ qo'shiladi.",
        'Blank ㉠ contrasts morning with evening using -는 것이 좋다. Blank ㉡ avoids sleeping with wet hair by attaching -아/어야 한다 to drying it before bed.',
        'В ㉠ утру противопоставляется вечер с -는 것이 좋다. В ㉡ к действию «высушить волосы перед сном» добавляется необходимость -아/어야 한다.',
      ),
    },
  },
].map((question) =>
  asWrittenQuestion(
    question,
    sentenceCompletionConfig,
    10,
    sentenceCompletionRubric,
    true,
  ),
);

const writing52Practice: RecipeSeedQuestion[] = [
  {
    code: 'recipe-writing-52-pr-summer-colors',
    number: 52,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    prompt:
      '여름에는 어떤 색 옷을 입는 것이 좋을까? 여름에는 밝은색 ㉠ ___. 왜냐하면 밝은색은 빛을 반사해서 햇빛이 피부에 직접 닿는 것을 막아 주는 반면에 어두운색은 빛을 흡수해서 체온이 올라가기 때문이다. 그리고 밝은색 옷을 입으면 모기에게 많이 물리지 않는다. 왜냐하면 모기는 어두운색을 좋아해서 어두운색 옷을 입은 사람을 많이 ㉡ ___.',
    choices: noAnswerAppendixChoices,
    source: '합격 레시피 예상문제 · PDF 125쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '㉠은 질문 ‘어떤 색 옷을 입는 것이 좋을까?’에 대한 의견을 완성한다. ㉡은 모기가 어두운색을 좋아한다는 원인과 ‘모기에게 물리다’의 능동 관계를 연결한다.',
        "㉠ ‘Qaysi rang kiyim yaxshi?’ savoliga tavsiya beradi. ㉡ chivinning to'q rangni yoqtirishi sababi bilan ‘chivin chaqishi’ning faol nisbatini bog'laydi.",
        'Blank ㉠ completes the recommendation answering which color to wear. Blank ㉡ connects mosquitoes’ preference for dark colors to the active form of biting people.',
        'В ㉠ завершается рекомендация о цвете одежды. В ㉡ предпочтение комаров к тёмному цвету связывается с активным действием «кусать людей».',
      ),
      explanation: noAnswerAppendixExplanation,
    },
  },
  {
    code: 'recipe-writing-52-pr-color-impression',
    number: 53,
    type: TopikQuestionType.WRITING_SENTENCE_COMPLETION,
    prompt:
      '색은 사람의 마음에 영향을 미친다. 파란색은 정직해 보인다는 느낌을 받고, 노란색은 꼼꼼해 보인다는 인상을 받는다. 또 빨간색은 적극적으로 보인다는 ㉠ ___. 색의 이러한 특징을 실생활에 활용하면 효과를 볼 수 있다. 예를 들면 면접에서 무슨 색의 넥타이를 고르느냐에 따라 면접관에게 주는 느낌이 달라진다. 만약 면접관에게 솔직하고 진실한 느낌을 주고 싶다면 ㉡ ___ 것이 좋다.',
    choices: noAnswerAppendixChoices,
    source: '합격 레시피 예상문제 · PDF 125쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '㉠은 파란색·노란색 문장의 ‘느낌/인상’과 대응시키고, ㉡은 ‘솔직하고 진실한 느낌’과 앞에서 설명한 색을 대응시켜 ‘-는 것이 좋다’로 완성한다.',
        "㉠ ni ko'k va sariq haqidagi ‘taassurot’ bilan moslang; ㉡ da ‘halol va samimiy taassurot’ni avval izohlangan rang bilan bog'lab ‘-는 것이 좋다’ni tugating.",
        'Match ㉠ to the “feeling/impression” pattern used for blue and yellow. For ㉡, connect the desired honest impression to the color described earlier and complete -는 것이 좋다.',
        'Соотнесите ㉠ с шаблоном «ощущение/впечатление» для синего и жёлтого. В ㉡ свяжите желаемое честное впечатление с ранее описанным цветом и завершите -는 것이 좋다.',
      ),
      explanation: noAnswerAppendixExplanation,
    },
  },
].map((question) =>
  asWrittenQuestion(
    question,
    sentenceCompletionConfig,
    10,
    sentenceCompletionRubric,
    false,
  ),
);

const rankGraphFrame =
  '(조사 기관)에서 (대상)을 대상으로 (주제)에 대하여 조사를 하였다. 그 결과 (비교 대상 1)은 (무엇)이 (몇)%로 가장 많았다. 그 다음으로 (무엇)과 (무엇)이 뒤를 이었다. 반면 (비교 대상 2)는 (무엇)이 (몇)%로 가장 높게 나타났다. 그 다음으로 (무엇), (무엇) 순이었다.';

const changeGraphFrame =
  '(조사 기관)에서 (대상)을 대상으로 (주제)에 대하여 조사를 하였다. (시기)에 (무엇)이 (몇)이었는데 (증가/감소)하여 (시기)에 (몇)이 되었다. 꾸준히 (증가/감소)하다가 잠시 (증가/감소)하더니 다시 늘어났다.';

const writing53Examples: RecipeSeedQuestion[] = [
  {
    code: 'recipe-writing-53-ex-52',
    number: 53,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    prompt:
      '결혼문화연구소가 20대 이상 성인 남녀 3,000명을 조사한 ‘아이를 꼭 낳아야 하는가’ 자료를 200~300자로 설명하시오. 남자는 그렇다 80%·아니다 20%, 여자는 그렇다 67%·아니다 33%이다. ‘아니다’의 1위 이유는 남자 양육비 부담, 여자 자유로운 생활이고, 2위는 남자 자유로운 생활, 여자 직장 생활 유지이다.',
    choices: exactAnswerChoices(
      '결혼문화연구소에서 20대 이상 성인 남녀 3,000명을 대상으로 ‘아이를 꼭 낳아야 하는가’에 대하여 조사를 하였다. 그 결과 남자는 ‘그렇다’라는 응답이 80%, ‘아니다’라는 응답이 20%로 나타났다. 반면 여자는 ‘그렇다’라는 응답이 67%, ‘아니다’라는 응답이 33%로 나타났다. 남녀가 ‘아니다’라고 응답한 이유에 대하여 남자는 ‘양육비가 부담되어서’, 여자는 ‘자유로운 생활을 위해서’가 가장 많았다. 다음으로 남자는 ‘자유로운 생활을 위해서’, 여자는 ‘직장 생활을 유지하고 싶어서’라고 응답하였다.',
      '남자와 여자를 조사했다. 남자는 80이고 여자는 67이다. 아이 문제는 사람마다 다르다.',
    ),
    source: 'TOPIK II 52회 쓰기 53번 · 합격 레시피 PDF 134쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '조사 기관·대상·주제를 먼저 쓰고, 남녀의 찬반 비율을 비교한 뒤 ‘아니다’의 이유를 남녀별 1·2위 순서로 정리한다.',
        "Avval tashkilot, qatnashchilar va mavzuni yozing; erkak-ayol javob nisbatini solishtiring; so'ng ‘yo'q’ sabablarini har jins uchun 1- va 2-o'rinda tartiblang.",
        'State the institution, respondents, and topic first; compare male and female response rates; then organize the first- and second-ranked reasons for answering no.',
        'Сначала укажите организацию, участников и тему, затем сравните доли ответов мужчин и женщин и по порядку изложите причины ответа «нет».',
      ),
      explanation: t4(
        '교재 답안은 조사 개요→남성 비율→‘반면’으로 여성 비율→남녀 이유 순서로 모든 정보를 빠짐없이 묶는다. 제목을 쓰지 않고 200~300자를 지키며, 수치·조사 대상·순위를 바꾸면 감점된다.',
        "Kitob javobi so'rov tavsifi → erkaklar foizi → ‘aksincha’ bilan ayollar foizi → sabablar tartibida barcha ma'lumotni beradi. Sarlavhasiz 200–300 belgi yoziladi; raqam, respondent yoki o'rinni o'zgartirish ballni kamaytiradi.",
        'The book’s answer includes every datum in this order: survey setup, male rates, female rates introduced by contrast, and ranked reasons. Write 200–300 characters without a title; changing figures, respondents, or ranks loses credit.',
        'Ответ книги охватывает все данные в порядке: сведения об опросе, показатели мужчин, затем женщин через противопоставление и причины по рангу. Нужно 200–300 знаков без заголовка; искажение чисел, участников или рангов снижает балл.',
      ),
    },
  },
  {
    code: 'recipe-writing-53-ex-60',
    number: 54,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    prompt:
      '‘인주시의 자전거 이용자 변화’를 200~300자로 설명하시오. 이용자 수는 2007년 4만 명, 2012년 9만 명, 2017년 21만 명이다. 변화 이유는 자전거 도로 개발과 자전거 빌리는 곳 확대이다. 2007년 대비 2017년 이용 목적 증가는 운동·산책 4배, 출퇴근 14배, 기타 3배이다.',
    choices: exactAnswerChoices(
      '인주시의 자전거 이용자 변화를 살펴보면, 자전거 이용자 수는 2007년 4만 명에서 2012년 9만 명, 2017년에는 21만 명으로, 지난 10년 동안 약 5배가 증가하였다. 특히 2012년부터 2017년까지 자전거 이용자 수가 급격히 증가한 것으로 나타났다. 이러한 변화의 이유로는 자전거 도로의 개발과 자전거를 빌리는 곳이 확대된 것을 들 수 있다. 자전거 이용의 목적을 보면, 10년 동안 운동 및 산책은 4배, 출퇴근은 14배, 기타는 3배 늘어난 것으로 나타났는데 이용 목적 중 출퇴근이 가장 높은 증가율을 보였다.',
      '자전거 이용자가 많아졌다. 도로도 생기고 빌리는 곳도 늘었다. 사람들이 운동과 출퇴근에 이용한다.',
    ),
    source: 'TOPIK II 60회 쓰기 53번 · 합격 레시피 PDF 135쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '세 시점의 전체 변화를 먼저 계산해 ‘약 5배’로 요약하고, 급증 시기·두 원인·목적별 증가 배수를 차례로 쓴 뒤 가장 큰 증가율을 비교한다.',
        "Uch davrdagi umumiy o'zgarishni hisoblab ‘taxminan 5 baravar’ deb jamlang; keskin o'sish davri, ikki sabab, maqsadlar bo'yicha ko'payish va eng yuqori o'sishni ketma-ket yozing.",
        'Summarize the three-point trend as roughly fivefold growth, then cover the sharp-growth period, two causes, increases by purpose, and the largest rate.',
        'Сначала обобщите три точки как рост примерно в пять раз, затем укажите период резкого роста, две причины, рост по целям и наибольший показатель.',
      ),
      explanation: t4(
        '교재 답안은 단순히 수치를 나열하지 않고 전체 변화와 급증 구간을 해석한다. 이어 원인을 두 가지 모두 쓰고, 목적별 배수 중 출퇴근이 가장 높다는 비교까지 완성한다.',
        "Kitob javobi raqamlarni sanab o'tmay, umumiy o'zgarish va keskin o'sgan davrni talqin qiladi. So'ng ikki sababning ikkalasini, maqsadlar ko'payishini va qatnov eng katta ekanini yozadi.",
        'The model does not merely list numbers: it interprets the overall change and sharp-growth interval, includes both causes, and finishes by comparing the purpose multipliers.',
        'Образец не просто перечисляет числа: он интерпретирует общий рост и резкий интервал, называет обе причины и завершает сравнением роста по целям.',
      ),
    },
  },
].map((question) =>
  asWrittenQuestion(
    question,
    dataDescriptionConfig,
    30,
    dataDescriptionRubric,
    true,
  ),
);

const writing53Practice: RecipeSeedQuestion[] = [
  {
    code: 'recipe-writing-53-pr-employment',
    number: 53,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    prompt:
      '교육부가 4년제 대학생 21,780명을 조사한 ‘대학생 취업 희망 기업’을 200~300자로 설명하시오. 희망 기업은 공무원·교사, 공기업, 대기업, 중소기업 순으로 제시되고, 선택 이유는 1위 직업의 안정성 23.6%, 2위 일에 대한 보람, 3위 사회적 존경이다. 제목은 쓰지 않는다.',
    choices: noAnswerAppendixChoices,
    source: '합격 레시피 예상문제 · PDF 136쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '조사 기관·대상·주제를 한 문장으로 소개하고 희망 기업 순위와 선택 이유 순위를 분리해 쓴다. 확인 가능한 수치만 쓰며 도표에 없는 비율을 만들지 않는다.',
        "Tashkilot, respondent va mavzuni bir gapda tanishtiring; korxona turi reytingi va tanlash sabablari reytingini alohida yozing. Grafikda yo'q foizlarni o'ylab topmang.",
        'Introduce the institution, respondents, and topic in one sentence, then separate the employer ranking from the reasons ranking. Use only visible figures and do not invent percentages.',
        'Одним предложением представьте организацию, участников и тему, затем отдельно изложите рейтинг работодателей и причин. Используйте только видимые числа и не придумывайте проценты.',
      ),
      explanation: noAnswerAppendixExplanation,
    },
  },
  {
    code: 'recipe-writing-53-pr-newspaper',
    number: 54,
    type: TopikQuestionType.WRITING_DATA_DESCRIPTION,
    prompt:
      '한국언론진흥재단의 ‘종이신문 정기 구독률의 변화’를 200~300자로 설명하시오. 구독률은 1998년 64.5%에서 2000년, 2006년, 2014년으로 갈수록 하락한다. 원인은 스마트폰 사용 증가와 기사에 대한 자신의 의견 표현이며, 전망은 2030년대 종이신문 발행 중단과 온라인 신문 시장 확대이다. 제목은 쓰지 않는다.',
    choices: noAnswerAppendixChoices,
    source: '합격 레시피 예상문제 · PDF 137쪽',
    difficulty: 3,
    solution: {
      strategy: t4(
        '조사 개요 뒤에 1998년부터 2014년까지의 감소 흐름을 쓰고, 제시된 두 원인을 모두 연결한 다음 2030년대의 두 전망으로 마무리한다.',
        "So'rov tavsifidan keyin 1998–2014 yillardagi pasayishni yozing, ikki sababning ikkalasini bog'lang va 2030-yillardagi ikki prognoz bilan tugating.",
        'After the survey setup, describe the decline from 1998 to 2014, connect both stated causes, and conclude with both forecasts for the 2030s.',
        'После сведений об исследовании опишите снижение с 1998 по 2014 год, укажите обе причины и завершите двумя прогнозами на 2030-е годы.',
      ),
      explanation: noAnswerAppendixExplanation,
    },
  },
].map((question) =>
  asWrittenQuestion(
    question,
    dataDescriptionConfig,
    30,
    dataDescriptionRubric,
    false,
  ),
);

const writing54ModelAnswer =
  '조기 교육이란 학교에 들어가지 않은 아이들에게 음악이나 외국어 등 다양한 교육을 실시하는 것을 말한다. 실제로 많은 아이들이 어릴 때부터 영어나 컴퓨터 등의 조기 교육을 받는 것을 주위에서 흔히 볼 수 있다. 이처럼 어릴 때부터 조기 교육을 받게 되면 장점도 있지만 문제점도 생길 수 있다. 먼저 조기 교육의 장점은 아이의 재능을 일찍 발견하고 그 재능을 키울 수 있다는 점이다. 예를 들어 예술 분야에서 유명한 사람 중에는 어릴 때부터 조기 교육을 받은 경우가 꽤 많다. 또 다른 조기 교육의 장점은 아이의 학업 경쟁력을 높일 수 있다는 점과 조기 교육을 통해 다양한 경험을 할 수 있다는 점이다. 반면 조기 교육은 부모의 지나친 관심과 강요에 의해 이루어질 수 있다는 문제점이 있다. 경쟁으로 인한 스트레스 때문에 아이가 학업에 흥미를 잃을 수도 있고 아이의 정서 발달에 해로울 수 있다.';

const writing54ProConclusion =
  '조기 교육은 장점과 문제점을 동시에 가지고 있지만 장점을 통해 아이의 재능을 개발할 수 있다면 조기 교육을 실시하는 것이 적절하다고 생각한다. 조기 교육을 통해 위의 장점뿐만 아니라 아이의 세계관을 넓힐 수 있기 때문이다. 그리고 문제점으로 지적된 부모의 강요가 아니라 아이가 흥미를 가지고 적극적으로 교육을 받는다면 조기 교육이 가지고 있는 장점을 충분히 살릴 수 있을 것이다. 이러한 이유로 조기 교육을 실시하는 것에 찬성한다.';

const writing54ConConclusion =
  '조기 교육은 장점이 많지만 위의 문제점을 고려하였을 때 조기 교육을 실시하는 것이 적절하지 않다고 생각한다. 조기 교육은 부모의 결정에 따라 이루어지기 때문에 진정한 교육이 아니라고 생각하기 때문이다. 그리고 아이가 자신이 하고 싶지 않은 것을 교육 받는다면 조기 교육이 가지고 있는 문제점으로 인해 얻는 것보다 잃는 것이 더 많을 수도 있다. 이러한 이유로 조기 교육을 실시하는 것을 반대한다.';

const writing54Examples: RecipeSeedQuestion[] = [
  {
    code: 'recipe-writing-54-ex-60',
    number: 54,
    type: TopikQuestionType.WRITING_ARGUMENTATIVE_ESSAY,
    prompt:
      '요즘은 아이가 학교에 들어가기 전 어릴 때부터 악기나 외국어 등 여러 가지를 교육하는 경우가 많다. 조기 교육의 장점은 무엇인가? 조기 교육의 문제점은 무엇인가? 조기 교육에 찬성하는가, 반대하는가? 근거를 들어 자신의 의견을 600~700자로 쓰시오. 문제를 그대로 옮겨 쓰지 않는다.',
    choices: exactAnswerChoices(
      `${writing54ModelAnswer} ${writing54ProConclusion}`,
      '조기 교육은 좋을 수도 있고 나쁠 수도 있다. 사람마다 생각이 다르므로 잘 선택해야 한다.',
    ),
    source: 'TOPIK II 60회 쓰기 54번 · 합격 레시피 PDF 274~277쪽',
    difficulty: 5,
    solution: {
      strategy: t4(
        '교재 흐름대로 개요를 먼저 만든다. 서론은 조기 교육의 의미와 현황, 본론은 장점 세 가지와 문제점 세 가지, 결론은 찬성 또는 반대 입장과 근거로 구성한다.',
        "Kitob tartibida avval reja tuzing: kirishda erta ta'lim ma'nosi va holati, asosiy qismda uch afzallik va uch muammo, xulosada taraf yoki qarshi fikr hamda dalil.",
        'Follow the book’s sequence: outline first; introduction for meaning and current situation; body for three benefits and three problems; conclusion for a clear position and reasons.',
        'Следуйте порядку книги: сначала план; во введении — значение и ситуация; в основной части — три преимущества и три проблемы; в заключении — позиция и основания.',
      ),
      explanation: t4(
        '교재의 개요는 장점으로 재능 조기 발견·학업 경쟁력 향상·다양한 경험을, 문제점으로 부모의 지나친 관심과 강요·경쟁 스트레스·정서 발달의 해를 제시한다. 본문은 이 개요를 문장으로 확장하고, 결론은 어느 입장을 택하든 본론의 근거와 일치시킨다. 제시된 정답 선택지는 교재의 찬성 결론을 연결한 학습용 모범 구성이다.',
        "Kitob rejasida afzalliklar: iste'dodni erta topish, o'qish raqobatbardoshligi, turli tajriba; muammolar: ota-ona bosimi, raqobat stressi, hissiy rivojga zarar. Matn rejani gaplarga kengaytiradi, xulosa esa tanlangan pozitsiyani asosiy dalillar bilan moslaydi.",
        'The outline lists early talent discovery, academic competitiveness, and varied experience as benefits, and parental pressure, competitive stress, and emotional harm as problems. Expand these into paragraphs and make either conclusion agree with the body. The marked answer joins the book’s pro conclusion to its model body.',
        'В плане книги преимущества — раннее выявление таланта, учебная конкурентоспособность и разнообразный опыт; проблемы — давление родителей, стресс конкуренции и вред эмоциональному развитию. Основная часть разворачивает план, а вывод должен соответствовать аргументам.',
      ),
    },
  },
].map((question) =>
  asWrittenQuestion(question, essayConfig, 50, essayRubric, true),
);

const writing54Practice: RecipeSeedQuestion[] = [
  {
    code: 'recipe-writing-54-pr-outline',
    number: 54,
    type: TopikQuestionType.WRITING_ARGUMENTATIVE_ESSAY,
    prompt:
      '60회 조기 교육 문제를 쓰기 전에 교재의 개요 순서와 내용으로 가장 알맞은 것을 고르시오.',
    choices: exactAnswerChoices(
      '서론: 의미·현황 → 본론: 재능 조기 발견·학업 경쟁력·다양한 경험 / 부모의 강요·경쟁 스트레스·정서 발달 문제 → 결론: 찬반 입장과 근거.',
      '서론: 개인 경험만 제시 → 본론: 질문을 그대로 반복 → 결론: 입장 없이 장단점을 다시 나열.',
    ),
    source: '합격 레시피 60회 기출 개요 학습 · PDF 275쪽',
    difficulty: 5,
    solution: {
      strategy: t4(
        '세 질문을 장점·문제점·입장으로 나눈 뒤 서론에는 정의와 현황을, 결론에는 한 입장과 근거를 둔다.',
        "Uch savolni afzallik, muammo va pozitsiyaga ajrating; kirishga ta'rif va holatni, xulosaga bitta pozitsiya va dalilni qo'ying.",
        'Split the three prompts into benefits, problems, and position; place definition and context in the introduction and one supported position in the conclusion.',
        'Разделите три вопроса на преимущества, проблемы и позицию; во введении дайте определение и ситуацию, в заключении — одну позицию с основаниями.',
      ),
      explanation: t4(
        '교재 개요는 질문 순서만 반복하지 않는다. 정의와 현황으로 글을 열고, 본론에서 장점과 문제점을 각각 구체화한 다음 결론에서 입장을 분명히 한다.',
        "Kitob rejasi savollarni shunchaki takrorlamaydi: ta'rif va holat bilan boshlaydi, afzallik va muammolarni ochadi, so'ng aniq pozitsiya bilan tugaydi.",
        'The outline does not simply repeat the prompts. It opens with definition and context, develops both sides, and closes with a definite position.',
        'План не повторяет вопросы: он открывается определением и контекстом, развивает обе стороны и заканчивается ясной позицией.',
      ),
    },
  },
  {
    code: 'recipe-writing-54-pr-pro-conclusion',
    number: 55,
    type: TopikQuestionType.WRITING_ARGUMENTATIVE_ESSAY,
    prompt: '교재의 찬성 결론이 본론과 연결되는 방식을 확인하시오.',
    choices: exactAnswerChoices(
      writing54ProConclusion,
      '조기 교육에는 장단점이 있다. 그러므로 조기 교육에 대한 판단은 할 수 없다.',
    ),
    source: '합격 레시피 60회 기출 찬성 결론 · PDF 277쪽',
    difficulty: 5,
    solution: {
      strategy: t4(
        '찬성 결론은 문제점을 부정하지 않고, 아이의 흥미와 자발성이 부모의 강요 문제를 줄인다는 조건을 제시한다.',
        'Taraf xulosasi muammolarni inkor etmaydi; bolaning qiziqishi va ixtiyoriyligi ota-ona majburlashini kamaytiruvchi shart sifatida beriladi.',
        'The pro conclusion does not deny the problems; it makes the child’s interest and active participation the condition that mitigates parental pressure.',
        'Положительный вывод не отрицает проблемы: интерес и активность ребёнка выступают условием, уменьшающим давление родителей.',
      ),
      explanation: t4(
        '입장→근거→문제 해결 조건→입장 재확인의 순서다. 본론의 ‘재능 개발’과 ‘부모의 강요’를 모두 다시 사용하므로 글 전체가 연결된다.',
        "Tartib: pozitsiya → dalil → muammoni kamaytirish sharti → pozitsiyani qayta tasdiqlash. Asosiy qismdagi ‘iste'dod’ va ‘ota-ona bosimi’ yana ishlatiladi.",
        'The sequence is position, reason, condition that addresses the problem, and restated position. It reconnects both talent development and parental pressure from the body.',
        'Порядок: позиция, основание, условие решения проблемы, повтор позиции. Вывод возвращает и развитие таланта, и давление родителей из основной части.',
      ),
    },
  },
  {
    code: 'recipe-writing-54-pr-con-conclusion',
    number: 56,
    type: TopikQuestionType.WRITING_ARGUMENTATIVE_ESSAY,
    prompt: '교재의 반대 결론이 본론과 연결되는 방식을 확인하시오.',
    choices: exactAnswerChoices(
      writing54ConConclusion,
      '조기 교육은 부모가 결정한다. 하지만 장점도 있으므로 무조건 찬성한다.',
    ),
    source: '합격 레시피 60회 기출 반대 결론 · PDF 277쪽',
    difficulty: 5,
    solution: {
      strategy: t4(
        '반대 결론은 부모의 결정과 아이의 비자발성을 핵심 문제로 잡고, 얻는 것보다 잃는 것이 많을 수 있다는 판단으로 입장을 강화한다.',
        "Qarshi xulosa ota-ona qarori va bolaning ixtiyorsizligini asosiy muammo qiladi, yo'qotish foydadan ko'p bo'lishi mumkinligi bilan pozitsiyani kuchaytiradi.",
        'The con conclusion centers on parental decision-making and lack of child choice, strengthening the position by arguing that losses may outweigh gains.',
        'Отрицательный вывод сосредоточен на решении родителей и отсутствии выбора ребёнка, усиливая позицию тем, что потери могут превысить пользу.',
      ),
      explanation: t4(
        '입장→부모 결정이라는 근거→아이의 비자발성에서 생기는 손실→입장 재확인의 순서다. 본론에서 제시한 강요와 정서 문제를 결론의 판단 근거로 사용한다.',
        "Tartib: pozitsiya → ota-ona qarori dalili → bolaning ixtiyorsizligidan yo'qotish → pozitsiyani qayta tasdiqlash. Asosiy qismdagi majburlash va hissiy zarar xulosaga asos bo'ladi.",
        'The sequence is position, parental-decision reason, losses from lack of child choice, and restated position. It uses coercion and emotional harm from the body as its grounds.',
        'Порядок: позиция, решение родителей как основание, потери из-за отсутствия выбора ребёнка, повтор позиции. Основаниями служат принуждение и эмоциональный вред из основной части.',
      ),
    },
  },
].map((question) =>
  asWrittenQuestion(question, outlineReviewConfig, 2, essayRubric, true),
);

export const WRITING_RECIPES: RecipeSeed[] = [
  {
    groupCode: 'writing-51',
    section: TopikSection.WRITING,
    label: t4('쓰기 51번', 'Yozish 51-savol', 'Writing 51', 'Письмо 51'),
    title: t4(
      '공개적·개인적 글 완성',
      'Ommaviy va shaxsiy matnni tugatish',
      'Public and personal text completion',
      'Завершение публичного и личного текста',
    ),
    intro: t4(
      '일상생활의 홈페이지·게시판·이메일·문자 메시지에서 문맥에 맞는 한 문장을 직접 완성하는 3급 유형이다. 공개적인 글과 개인적인 글의 화자·독자·높임말을 구별해야 한다.',
      "Bu 3-daraja turi bo'lib, sayt, e'lonlar taxtasi, e-pochta yoki xabardagi bo'sh joyni kontekstga mos bir gap bilan to'ldiradi. Muallif, o'quvchi va hurmat uslubini farqlash kerak.",
      'A level-3 task that completes one context-appropriate sentence in a website post, noticeboard item, email, or message. Distinguish writer, reader, and politeness in public versus personal texts.',
      'Задание 3-го уровня: дополнить одним подходящим предложением сообщение на сайте, доске объявлений, в письме или SMS. Нужно различать автора, адресата и вежливость публичного и личного текста.',
    ),
    targetLevel: 3,
    order: 1,
    goldenRecipe: [
      t4(
        '먼저 ‘-습니다’체인지 ‘-아/어요’체인지 확인한다. 공개적인 글은 대부분 ‘-습니다’체이며 개인적인 글도 관계와 상황에 맞는 높임말을 쓴다.',
        "Avval ‘-습니다’ yoki ‘-아/어요’ uslubini aniqlang. Ommaviy matn asosan ‘-습니다’, shaxsiy matn esa munosabat va vaziyatga mos hurmat uslubida bo'ladi.",
        'First determine whether the text uses -습니다 or -아/어요. Public texts usually use -습니다; personal texts still require politeness appropriate to the relationship.',
        'Сначала определите стиль -습니다 или -아/어요. Публичный текст обычно использует -습니다, а личный — вежливость по отношениям и ситуации.',
      ),
      t4(
        '글을 쓰는 사람과 읽는 사람을 반드시 확인한다. 개인 알림과 개인적인 글은 보통 ‘나’가 쓰지만 단체 알림은 독자의 입장에서 필요한 내용을 완성한다.',
        "Muallif va o'quvchini aniqlang. Shaxsiy e'lon yoki xatda odatda ‘men’ yozadi, tashkilot e'lonida esa o'quvchiga kerakli mazmun to'ldiriladi.",
        'Identify writer and reader. Personal notices and messages are usually written as “I,” while organization notices are completed from what the reader needs.',
        'Обязательно определите автора и читателя. Личные объявления и письма обычно пишутся от «я», а объявления организации — с позиции информации для читателя.',
      ),
      t4(
        '공개적인 글은 제목에서 동사를 찾고 빈칸 앞뒤에 맞게 활용한다. 동사만 쓰지 말고 지문에서 그 동사의 목적어 ‘N-을/를’도 찾아 함께 쓴다.',
        "Ommaviy matnda sarlavhadan fe'lni topib, bo'sh joy kontekstiga mos tuslang. Faqat fe'l emas, matndagi ‘N-을/를’ obyektini ham yozing.",
        'For public texts, find the verb in the title and conjugate it for the blank. Include its object N-을/를 from the passage rather than writing only the verb.',
        'В публичном тексте найдите глагол в заголовке и измените его по контексту. Пишите не только глагол, но и его дополнение N-을/를 из текста.',
      ),
      t4(
        '개인적인 글은 제목이 없으므로 문법을 생각하면서 빈칸 앞뒤를 확인한다. 특히 받는 사람이 윗사람이면 명령처럼 들리는 ‘V-기 바랍니다’를 피하고 예의를 갖춘다.',
        "Shaxsiy matnda sarlavha bo'lmagani uchun grammatika va bo'sh joy atrofini tekshiring. Adresat yuqori mavqeda bo'lsa, buyruqdek eshitiladigan ‘V-기 바랍니다’dan saqlaning.",
        'Personal texts have no title, so infer the grammar from both sides of the blank. When writing to a superior, avoid command-like V-기 바랍니다 and use respectful wording.',
        'В личном тексте нет заголовка, поэтому определяйте грамматику по контексту вокруг пропуска. Для старшего избегайте приказного V-기 바랍니다.',
      ),
      t4(
        '빈칸 뒤가 마침표인지 물음표인지 문법 연결인지 확인한다. 새 단어를 만들지 말고 지문 안의 쉬운 어휘를 이용해 한 문장으로 쓴다.',
        "Bo'sh joydan keyin nuqta, savol belgisi yoki grammatik ulanish borligini tekshiring. Yangi so'z o'ylamang; matndagi sodda so'zlar bilan bitta gap yozing.",
        'Check whether the blank is followed by a period, question mark, or grammatical continuation. Use simple words from the passage and write one sentence.',
        'Проверьте, стоит ли после пропуска точка, вопросительный знак или грамматическое продолжение. Используйте простые слова из текста и пишите одно предложение.',
      ),
    ],
    grammarSections: [
      {
        key: 'public-writing-ranking',
        title: t4(
          '공개적인 글 자주 쓰는 문법·표현',
          'Ommaviy matnda ko‘p ishlatiladigan shakllar',
          'Frequent forms in public texts',
          'Частые формы в публичных текстах',
        ),
        entries: [
          {
            rank: 1,
            form: 'V-아/어 주십시오',
            meanings: [
              t4(
                '요청이나 부탁을 공손하게 전달한다.',
                "Iltimos yoki so'rovni muloyim bildiradi.",
                'Makes a polite request.',
                'Передаёт вежливую просьбу.',
              ),
            ],
            examples: ['금요일 전까지 연락해 주십시오.'],
            highlights: ['연락해 주십시오'],
          },
          {
            rank: 2,
            form: 'V-기 바랍니다',
            meanings: [
              t4(
                '공개 공지에서 요청이나 바람을 나타낸다.',
                "Ommaviy e'londa so'rov yoki istakni bildiradi.",
                'Expresses a request or wish in a public notice.',
                'Выражает просьбу или пожелание в объявлении.',
              ),
            ],
            examples: ['응모 작품을 확인해 주시기 바랍니다.'],
            highlights: ['주시기 바랍니다'],
          },
          {
            rank: 3,
            form: 'V-(으)려고 합니다',
            meanings: [
              t4(
                '개인의 계획을 나타낸다.',
                'Shaxsiy rejani bildiradi.',
                'Expresses a personal plan.',
                'Выражает личный план.',
              ),
            ],
            examples: ['사용하던 물건을 무료로 드리려고 합니다.'],
            highlights: ['드리려고 합니다'],
          },
          {
            rank: 4,
            form: 'V-고자 합니다',
            meanings: [
              t4(
                '공식적인 계획이나 의도를 나타낸다.',
                'Rasmiy reja yoki niyatni bildiradi.',
                'Expresses a formal plan or intention.',
                'Выражает официальный план или намерение.',
              ),
            ],
            examples: ['행사 참가자를 모집하고자 합니다.'],
            highlights: ['모집하고자 합니다'],
          },
          {
            rank: 5,
            form: '구합니다 / 찾습니다',
            meanings: [
              t4(
                '사람이나 물건을 모집하거나 찾는 개인 알림에 쓴다.',
                "Odam yoki buyum qidiriladigan shaxsiy e'londa ishlatiladi.",
                'Used in personal notices seeking a person or item.',
                'Используется в личных объявлениях о поиске человека или вещи.',
              ),
            ],
            examples: ['함께 살 룸메이트를 구합니다.'],
            highlights: ['구합니다'],
          },
        ],
        tips: [
          t4(
            '공개적인 글의 요청·계획·모집 표현은 제목과 마지막 연락 안내에 자주 나타난다.',
            "Ommaviy matndagi so'rov, reja va qidiruv shakllari ko'pincha sarlavha va oxirgi aloqa ko'rsatmasida chiqadi.",
            'Request, plan, and recruitment forms in public texts often follow the title and final contact instruction.',
            'Формы просьбы, плана и набора в публичном тексте часто связаны с заголовком и контактной инструкцией.',
          ),
        ],
      },
      {
        key: 'personal-writing-ranking',
        title: t4(
          '개인적인 글 자주 쓰는 문법·표현',
          'Shaxsiy matnda ko‘p ishlatiladigan shakllar',
          'Frequent forms in personal texts',
          'Частые формы в личных текстах',
        ),
        entries: [
          {
            rank: 1,
            form: 'V-고 싶습니다',
            meanings: [
              t4(
                '자신의 희망이나 요청을 나타낸다.',
                "O'z istagi yoki so'rovini bildiradi.",
                'Expresses a wish or request.',
                'Выражает желание или просьбу.',
              ),
            ],
            examples: ['도서관을 이용하고 싶습니다.'],
            highlights: ['이용하고 싶습니다'],
          },
          {
            rank: 2,
            form: 'V-았/었으면 좋겠습니다',
            meanings: [
              t4(
                '상대에게 바라는 일을 부드럽게 전달한다.',
                'Suhbatdoshdan kutilgan ishni yumshoq bildiradi.',
                'Gently expresses what the writer hopes the reader will do.',
                'Мягко выражает пожелание к адресату.',
              ),
            ],
            examples: ['집들이에 와 주셨으면 좋겠습니다.'],
            highlights: ['와 주셨으면 좋겠습니다'],
          },
          {
            rank: 3,
            form: 'V-아/어 주시겠습니까?',
            meanings: [
              t4(
                '윗사람이나 잘 모르는 사람에게 예의 있게 부탁한다.',
                'Katta yoki notanish kishidan hurmat bilan iltimos qiladi.',
                'Makes a respectful request to a superior or unfamiliar person.',
                'Вежливо просит старшего или незнакомого человека.',
              ),
            ],
            examples: ['방법을 알려 주시겠습니까?'],
            highlights: ['알려 주시겠습니까'],
          },
          {
            rank: 4,
            form: 'V-(으)면 될까요?/되겠습니까?',
            meanings: [
              t4(
                '허락이나 상대의 의향을 묻는다.',
                'Ruxsat yoki suhbatdosh fikrini so‘raydi.',
                'Asks permission or the reader’s preference.',
                'Спрашивает разрешение или намерение адресата.',
              ),
            ],
            examples: ['책을 언제 돌려주면 될까요?'],
            highlights: ['돌려주면 될까요'],
          },
          {
            rank: 5,
            form: 'V-(으)려고 합니다',
            meanings: [
              t4(
                '개인적인 글에서 자신의 계획을 알린다.',
                "Shaxsiy xatda o'z rejasini bildiradi.",
                'States the writer’s plan in a personal message.',
                'Сообщает о плане автора в личном письме.',
              ),
            ],
            examples: ['이번 공모전에 참가하려고 합니다.'],
            highlights: ['참가하려고 합니다'],
          },
        ],
        tips: [
          t4(
            '받는 사람이 윗사람이면 명령형보다 의향 질문이나 완곡한 부탁을 선택한다.',
            "Adresat katta bo'lsa, buyruqdan ko'ra yumshoq iltimos yoki ruxsat savolini tanlang.",
            'For a superior, prefer an indirect request or permission question over a command.',
            'Для старшего выбирайте косвенную просьбу или вопрос о разрешении вместо приказа.',
          ),
        ],
      },
    ],
    examples: writing51Examples,
    practice: writing51Practice,
    sourceReference: '합격 레시피 PDF 115~121쪽',
  },
  {
    groupCode: 'writing-52',
    section: TopikSection.WRITING,
    label: t4('쓰기 52번', 'Yozish 52-savol', 'Writing 52', 'Письмо 52'),
    title: t4(
      '설명문 완성',
      'Izohli matnni tugatish',
      'Expository text completion',
      'Завершение пояснительного текста',
    ),
    intro: t4(
      '설명문의 두 빈칸을 지문 속 대응 관계와 쉬운 어휘로 완성하는 3급 유형이다. 새 단어를 만들기보다 유의·반의 관계와 접속사를 찾아야 한다.',
      "Izohli matndagi ikki bo'sh joy matn ichidagi moslik va sodda so'zlar bilan to'ldiriladi. Yangi so'z o'ylashdan ko'ra sinonim, antonim va bog'lovchini topish kerak.",
      'A level-3 task completing two blanks in an expository passage through paired relationships and simple passage vocabulary. Find synonym, contrast, and connective clues instead of inventing content.',
      'Задание 3-го уровня: заполнить два пропуска в пояснительном тексте через соответствия и простую лексику исходного текста. Ищите синонимы, противопоставления и союзы.',
    ),
    targetLevel: 3,
    order: 2,
    goldenRecipe: [
      t4(
        '빈칸 앞뒤에서 유의어나 비슷한 표현을 찾고, 서로 짝이 되는 대응 내용을 정한다.',
        "Bo'sh joy atrofidan sinonim yoki o'xshash ifodani topib, juft mazmunni aniqlang.",
        'Find synonymous or similar expressions around the blank and identify the paired content.',
        'Найдите вокруг пропуска синонимичные или близкие выражения и определите парное содержание.',
      ),
      t4(
        '접속사의 종류를 확인해 같은 방향이면 유의 표현을, 반대 방향이면 반의 표현을 찾는다.',
        "Bog'lovchi turini tekshiring: bir yo'nalishda sinonim, qarama-qarshida antonim toping.",
        'Use the connective: look for similar meaning when it continues and opposite meaning when it contrasts.',
        'По союзу определите направление: продолжение требует близкого смысла, противопоставление — обратного.',
      ),
      t4(
        '새 단어를 생각하지 말고 지문 안의 단어를 이용한다. 3급 수준이므로 알고 있는 쉬운 어휘와 정확한 문법이 더 안전하다.',
        "Yangi so'z o'ylamang; matndagi so'zlardan foydalaning. 3-darajada sodda va aniq grammatika xavfsizroq.",
        'Use words already in the passage. At level 3, familiar vocabulary and accurate grammar are safer than advanced wording.',
        'Используйте слова из текста. На 3-м уровне знакомая лексика и точная грамматика безопаснее сложных выражений.',
      ),
      t4(
        '목적·원인·부분 부정·인용·의견·비교의 대표 문법이 어느 관계를 만드는지 먼저 분류한다.',
        'Maqsad, sabab, qisman inkor, iqtibos, fikr va qiyos grammatikasining qanday aloqa yaratishini tasniflang.',
        'Classify whether the blank expresses purpose, cause, partial negation, quotation, opinion, or comparison.',
        'Сначала определите: цель, причина, частичное отрицание, цитирование, мнение или сравнение.',
      ),
    ],
    grammarSections: [
      {
        key: 'writing-52-grammar-ranking',
        title: t4(
          '쓰기 52번 핵심 문법 Ranking',
          '52-savol asosiy grammatika reytingi',
          'Writing 52 core grammar ranking',
          'Ключевая грамматика задания 52',
        ),
        entries: [
          {
            rank: 1,
            form: '-(으)려면 / -기 위해서는 → -아/어야 한다',
            meanings: [
              t4(
                '목적을 이루기 위한 당위나 필요 조건을 연결한다.',
                'Maqsadga erishish uchun zaruratni bog‘laydi.',
                'Links a purpose to a necessary condition.',
                'Связывает цель с необходимым условием.',
              ),
            ],
            examples: ['병을 예방하기 위해서는 손을 씻어야 한다.'],
            highlights: ['기 위해서는 손을 씻어야 한다'],
          },
          {
            rank: 2,
            form: '왜냐하면 -기 때문이다',
            meanings: [
              t4(
                '앞의 현상이나 판단에 대한 원인을 설명한다.',
                'Oldingi hodisa yoki fikr sababini tushuntiradi.',
                'Explains the cause of a preceding observation or judgment.',
                'Объясняет причину предыдущего явления или суждения.',
              ),
            ],
            examples: ['왜냐하면 감정이 표정에 영향을 주기 때문이다.'],
            highlights: ['왜냐하면', '기 때문이다'],
          },
          {
            rank: 3,
            form: '-(ㄴ/는)다고 해서 꼭/반드시 -(으)ㄴ/는 것은 아니다',
            meanings: [
              t4(
                '일반적인 생각을 전부 부정하지 않고 일부만 제한한다.',
                'Umumiy fikrni butunlay emas, qisman cheklaydi.',
                'Limits a generalization with partial negation.',
                'Ограничивает обобщение частичным отрицанием.',
              ),
            ],
            examples: ['항상 밝은 음악을 들려주는 것은 아니다.'],
            highlights: ['들려주는 것은 아니다'],
          },
          {
            rank: 4,
            form: '전문가들은 -(으)라고 한다',
            meanings: [
              t4(
                '전문가의 권고나 명령을 인용한다.',
                'Mutaxassis tavsiyasi yoki buyrug‘ini iqtibos qiladi.',
                'Reports expert advice or instructions.',
                'Передаёт совет или указание специалистов.',
              ),
            ],
            examples: ['전문가들은 비누를 사용하라고 한다.'],
            highlights: ['사용하라고 한다'],
          },
          {
            rank: 5,
            form: '-는 것이 좋다',
            meanings: [
              t4(
                '바람직한 행동에 대한 의견이나 권고를 나타낸다.',
                'Maqbul harakat haqida tavsiya beradi.',
                'Expresses advice about a desirable action.',
                'Выражает рекомендацию желательного действия.',
              ),
            ],
            examples: ['우울할 때일수록 밝은 표정을 짓는 것이 좋다.'],
            highlights: ['짓는 것이 좋다'],
          },
          {
            rank: 6,
            form: '-는 것보다는 -는 것이 낫다',
            meanings: [
              t4(
                '두 행동을 비교해 더 나은 쪽을 제시한다.',
                'Ikki harakatni solishtirib yaxshirog‘ini ko‘rsatadi.',
                'Compares two actions and recommends the better one.',
                'Сравнивает два действия и предлагает лучшее.',
              ),
            ],
            examples: ['젖은 머리로 자는 것보다는 머리를 말리는 것이 낫다.'],
            highlights: ['것보다는', '것이 낫다'],
          },
        ],
        tips: [
          t4(
            '문법을 먼저 고른 뒤 지문에서 그 문법에 들어갈 쉬운 명사와 동사를 그대로 찾는다.',
            "Avval grammatikani tanlang, so'ng unga kiradigan sodda ot va fe'lni matndan toping.",
            'Choose the relationship first, then take the simple noun and verb that fill it directly from the passage.',
            'Сначала выберите грамматическое отношение, затем найдите в тексте подходящие простые существительное и глагол.',
          ),
        ],
      },
    ],
    examples: writing52Examples,
    practice: writing52Practice,
    sourceReference: '합격 레시피 PDF 122~125쪽',
  },
  {
    groupCode: 'writing-53',
    section: TopikSection.WRITING,
    label: t4('쓰기 53번', 'Yozish 53-savol', 'Writing 53', 'Письмо 53'),
    title: t4(
      '그래프 설명',
      'Grafikni tasvirlash',
      'Data description',
      'Описание графика',
    ),
    intro: t4(
      '통계 그래프의 순위와 변화를 200~300자로 정확하게 설명하는 유형이다. 비교·원인·전망을 요구할 수 있으며, 어려운 표현보다 수치·맞춤법·띄어쓰기의 정확성이 중요하다.',
      "Statistik grafikdagi reyting va o'zgarishni 200–300 belgida aniq tasvirlash turi. Qiyos, sabab yoki prognoz so'ralishi mumkin; murakkab iboradan ko'ra raqam, imlo va bo'shliq aniqligi muhim.",
      'A 200–300-character task describing rankings and changes in statistical graphics. It may require comparison, cause, or forecast; accurate figures, spelling, and spacing matter more than advanced wording.',
      'Задание на 200–300 знаков: точно описать ранги и изменения на графике. Возможны сравнение, причины и прогноз; точность чисел, орфографии и пробелов важнее сложной лексики.',
    ),
    targetLevel: 3,
    order: 3,
    goldenRecipe: [
      t4(
        '순위 그래프와 변화 그래프의 전체 작성 틀을 먼저 익힌다. 자신 있게 정확히 쓸 수 있는 쉬운 표현을 선택한다.',
        "Avval reyting va o'zgarish grafigining umumiy yozish qolipini o'rganing. Ishonchli va aniq sodda iborani tanlang.",
        'Learn the overall frames for ranking and change graphs first, using simple expressions you can write accurately.',
        'Сначала выучите общий шаблон графиков ранга и изменения, используя простые выражения, которые можете написать точно.',
      ),
      t4(
        '고급 어휘나 문법에 가점이 붙는 것이 아니라 틀리거나 어색한 표현에서 감점된다. 문법·맞춤법·띄어쓰기를 틀리지 않는 것이 가장 중요하다.',
        "Murakkab so'z uchun qo'shimcha ball berilmaydi; xato yoki g'aliz ifoda ballni kamaytiradi. Grammatika, imlo va bo'shliqni to'g'ri yozish eng muhim.",
        'Advanced vocabulary earns no bonus; errors and awkward wording lose points. Correct grammar, spelling, and spacing are most important.',
        'За сложную лексику нет бонуса; ошибки и неестественные выражения снижают балл. Главное — точная грамматика, орфография и пробелы.',
      ),
      t4(
        '그래프 정보를 순위·변화·비교 표현으로 정확하게 바꾸고, 조사 기관·대상·주제·수치와 단위를 빠뜨리지 않는다.',
        "Grafik ma'lumotini reyting, o'zgarish va qiyos iboralari bilan aniq yozing; tashkilot, respondent, mavzu, raqam va birlikni qoldirmang.",
        'Convert graphic information into accurate ranking, change, and comparison expressions without omitting institution, respondents, topic, figures, or units.',
        'Точно переводите данные графика в выражения ранга, изменения и сравнения, не пропуская организацию, участников, тему, числа и единицы.',
      ),
      t4(
        '출제 조합은 순위+비교, 순위+원인·전망, 변화+비교, 변화+원인·전망이다. 문제에서 요구한 조합의 두 부분을 모두 쓴다.',
        "Savol kombinatsiyasi: reyting+qiyos, reyting+sabab/prognoz, o'zgarish+qiyos, o'zgarish+sabab/prognoz. Ikkala qismni ham yozing.",
        'Common combinations are ranking plus comparison, ranking plus cause/forecast, change plus comparison, and change plus cause/forecast. Cover both requested parts.',
        'Типичные сочетания: ранг+сравнение, ранг+причина/прогноз, изменение+сравнение, изменение+причина/прогноз. Выполните обе части.',
      ),
    ],
    grammarSections: [
      {
        key: 'writing-53-frames',
        title: t4(
          '쓰기 53번 작성 틀 Ranking',
          '53-savol yozish qoliplari',
          'Writing 53 composition frames',
          'Шаблоны задания 53',
        ),
        entries: [
          {
            rank: 1,
            form: '조사 개요',
            meanings: [
              t4(
                '조사 기관·대상·주제를 첫 문장에 제시한다.',
                'Tashkilot, respondent va mavzuni birinchi gapda beradi.',
                'States institution, respondents, and topic in the opening sentence.',
                'Указывает организацию, участников и тему в первом предложении.',
              ),
            ],
            examples: [rankGraphFrame],
            highlights: ['(조사 기관)에서 (대상)을 대상으로 (주제)에 대하여'],
          },
          {
            rank: 2,
            form: '순위',
            meanings: [
              t4(
                '‘가장 많았다/높게 나타났다’, ‘뒤를 이었다’, ‘순이었다’로 순서를 표현한다.',
                "‘Eng ko'p/yuqori’, ‘undan keyin’, ‘tartibda’ bilan reytingni ifodalaydi.",
                'Uses “highest/most,” “followed by,” and “in order” to express ranking.',
                'Передаёт порядок выражениями «больше/выше всего», «за ним», «по порядку».',
              ),
            ],
            examples: ['가장 많았다. 그 다음으로 두 항목이 뒤를 이었다.'],
            highlights: ['가장 많았다', '뒤를 이었다'],
          },
          {
            rank: 3,
            form: '변화',
            meanings: [
              t4(
                '시점과 수치를 연결해 증가·감소·급증·배수 변화를 쓴다.',
                "Vaqt va raqamni bog'lab o'sish, pasayish, keskin o'sish yoki baravar o'zgarishni yozadi.",
                'Connects time points and figures to describe increase, decrease, sharp change, or multiples.',
                'Связывает периоды и числа, описывая рост, снижение, скачок или кратность.',
              ),
            ],
            examples: [changeGraphFrame],
            highlights: ['(증가/감소)하여', '늘어났다'],
          },
          {
            rank: 4,
            form: '원인·이유',
            meanings: [
              t4(
                '‘이러한 원인으로는 …을 들 수 있다’ 또는 응답 이유를 사용한다.',
                "‘Buning sababi sifatida ...ni ko'rsatish mumkin’ yoki javob sabablarini ishlatadi.",
                'Introduces causes with “The reasons include…” or reports stated reasons.',
                'Вводит причины конструкцией «к причинам можно отнести…» или передаёт ответы.',
              ),
            ],
            examples: [
              '이러한 원인으로는 자전거 도로 개발과 대여 장소 확대를 들 수 있다.',
            ],
            highlights: ['원인으로는', '들 수 있다'],
          },
          {
            rank: 5,
            form: '전망·요약·비교',
            meanings: [
              t4(
                '전망은 ‘-(으)ㄹ 것으로 전망된다/예상된다’, 요약은 ‘-는 것으로 나타났다/알 수 있다’, 비교는 ‘반면’을 활용한다.',
                "Prognoz uchun ‘kutiladi’, xulosa uchun ‘ma'lum bo'ldi’, qiyos uchun ‘aksincha’ ishlatiladi.",
                'Uses forecast forms such as “is expected,” summary forms such as “was found,” and contrast markers such as 반면.',
                'Использует формы прогноза «ожидается», итога «выяснилось» и противопоставление 반면.',
              ),
            ],
            examples: ['앞으로 온라인 신문 시장이 확대될 것으로 전망된다.'],
            highlights: ['확대될 것으로 전망된다'],
          },
        ],
        tips: [
          t4(
            '제목을 쓰지 않고 200~300자를 지킨다. 자료에 없는 원인이나 수치를 추가하지 않는다.',
            "Sarlavha yozmang va 200–300 belgini saqlang. Grafikda yo'q sabab yoki raqamni qo'shmang.",
            'Do not write a title; stay within 200–300 characters and never add causes or figures absent from the graphic.',
            'Не пишите заголовок; соблюдайте 200–300 знаков и не добавляйте причин или чисел, которых нет в данных.',
          ),
        ],
      },
    ],
    examples: writing53Examples,
    practice: writing53Practice,
    sourceReference: '합격 레시피 PDF 126~138쪽',
  },
  {
    groupCode: 'writing-54',
    section: TopikSection.WRITING,
    label: t4('쓰기 54번', 'Yozish 54-savol', 'Writing 54', 'Письмо 54'),
    title: t4(
      '주제 Ranking과 논설문 구성',
      'Mavzu reytingi va argumentativ insho',
      'Topic ranking and argumentative essay structure',
      'Рейтинг тем и структура аргументативного эссе',
    ),
    intro: t4(
      '교재는 쓰기 54번에 일반 황금 레시피를 제시하지 않는다. 출제 가능성이 있는 9개 주제군을 분류한 뒤, 60회 조기 교육 기출을 개요·서론·본론·찬성 또는 반대 결론으로 전개한다.',
      "Kitob 54-savolga umumiy ‘oltin retsept’ bermaydi. Avval 9 ehtimoliy mavzu guruhi tasniflanadi, keyin 60-imtihondagi erta ta'lim matni reja, kirish, asosiy qism va taraf/qarshi xulosa bo'yicha o'rganiladi.",
      'The book does not impose a generic golden recipe on Writing 54. It classifies nine likely topic families, then teaches the 60th-test early-education essay through outline, introduction, body, and pro or con conclusion.',
      'Книга не навязывает заданию 54 общий «золотой рецепт». Сначала классифицируются девять вероятных тематических групп, затем эссе 60-го теста разбирается как план, введение, основная часть и вывод «за» или «против».',
    ),
    targetLevel: 6,
    order: 4,
    goldenRecipe: [
      t4(
        '먼저 9개 주제 Ranking에서 대분류·중분류·소분류를 확인하고, 문제의 주제가 어느 범주인지 정한다.',
        "Avval 9 mavzu reytingidagi katta, o'rta va kichik toifalarni ko'rib, savol qaysi guruhga kirishini aniqlang.",
        'Start with the nine-topic ranking and locate the prompt within its major, middle, and detailed category.',
        'Сначала определите место темы в девяти группах: крупная, средняя и подробная категория.',
      ),
      t4(
        '문제의 세 질문을 그대로 옮겨 쓰지 말고 답의 역할로 바꾼다. 60회는 장점·문제점·찬반 입장과 근거를 요구한다.',
        "Uch savolni ko'chirmang, ularni javob vazifasiga aylantiring. 60-imtihon afzallik, muammo va dalilli pozitsiyani talab qiladi.",
        'Do not copy the three prompts; convert them into answer functions. The 60th test asks for benefits, problems, and a supported position.',
        'Не переписывайте три вопроса; превратите их в функции ответа. В 60-м тесте требуются преимущества, проблемы и позиция с основаниями.',
      ),
      t4(
        '글을 쓰기 전에 개요를 만든다. 서론에는 정의와 현황, 본론에는 질문별 근거, 결론에는 한 입장과 본론에 연결되는 이유를 둔다.',
        "Yozishdan oldin reja tuzing: kirishda ta'rif va holat, asosiy qismda savollar bo'yicha dalillar, xulosada bitta pozitsiya va asosiy qismga bog'langan sabab.",
        'Outline before drafting: definition and context in the introduction, prompt-based evidence in the body, and one position with body-linked reasons in the conclusion.',
        'Перед написанием составьте план: определение и ситуация во введении, аргументы по вопросам в основной части, одна позиция и связанные основания в заключении.',
      ),
      t4(
        '찬성과 반대 중 어느 쪽을 선택해도 본론에서 제시한 장점과 문제점을 결론의 근거로 다시 사용해 글 전체를 연결한다.',
        "Taraf yoki qarshi fikrdan qat'i nazar, asosiy qismdagi afzallik va muammolarni xulosa dalili sifatida qayta ishlating.",
        'Either position is acceptable, but the conclusion must reuse the body’s benefits and problems as its evidence.',
        'Можно выбрать любую позицию, но вывод должен опираться на преимущества и проблемы из основной части.',
      ),
      t4(
        '600~700자를 지키고 문제를 그대로 옮겨 쓰지 않는다. 주제 이탈 없이 서론·본론·결론의 논리 연결을 유지한다.',
        "600–700 belgini saqlang, savolni ko'chirmang va mavzudan chiqmay kirish–asosiy qism–xulosa bog'lanishini saqlang.",
        'Stay within 600–700 characters, do not copy the prompt, and maintain a topic-focused introduction–body–conclusion chain.',
        'Соблюдайте 600–700 знаков, не копируйте условие и сохраняйте логическую связь введения, основной части и заключения.',
      ),
    ],
    grammarSections: [
      {
        key: 'writing-54-topic-ranking',
        title: t4(
          '쓰기 54번 주제 Ranking',
          '54-savol mavzu reytingi',
          'Writing 54 topic ranking',
          'Рейтинг тем задания 54',
        ),
        entries: [
          {
            rank: 1,
            form: '삶의 자세',
            meanings: [
              t4(
                '대인관계: 바람직한 인간관계, 문화상대주의, 조언을 받아들이는 자세. 바람직한 대화법: 의사소통과 토론의 자세, 올바른 사과, 선의의 거짓말, 올바른 인터넷 사용 태도.',
                "Insoniy munosabat, madaniy nisbiylik, maslahatni qabul qilish; muloqot va bahs odobi, to'g'ri uzr, oq yolg'on va internet odobi.",
                'Relationships, cultural relativism, accepting advice; sound communication and debate, proper apology, white lies, and responsible internet conduct.',
                'Отношения, культурный релятивизм, принятие советов; правильное общение и дискуссия, извинение, ложь во благо и поведение в интернете.',
              ),
            ],
            examples: [
              '조언을 받아들일 때에는 다른 사람의 평가를 열린 태도로 검토할 필요가 있다.',
            ],
            highlights: ['삶의 자세'],
          },
          {
            rank: 2,
            form: '현대 사회의 특징',
            meanings: [
              t4(
                '사회 문제: 실업 문제, 동물 실험, 반려 동물. 사회 변화: 4차 산업 혁명.',
                "Ijtimoiy muammolar: ishsizlik, hayvon tajribasi, uy hayvonlari. Ijtimoiy o'zgarish: to'rtinchi sanoat inqilobi.",
                'Social problems: unemployment, animal testing, companion animals. Social change: the Fourth Industrial Revolution.',
                'Социальные проблемы: безработица, опыты на животных, домашние животные. Изменения: четвёртая промышленная революция.',
              ),
            ],
            examples: [
              '4차 산업 혁명은 일자리와 필요한 능력의 변화를 함께 가져온다.',
            ],
            highlights: ['현대 사회의 특징'],
          },
          {
            rank: 3,
            form: '능력',
            meanings: [
              t4(
                '자기계발: 외국어·창의적 사고 능력, 독서의 역할과 방법, 진로·직업 선택을 위한 자기계발. 사회적 요구: 현대 사회의 인재상, 진정한 리더십.',
                "O'zini rivojlantirish: chet tili, ijodiy fikr, mutolaa, kasb tanlash; ijtimoiy talab: zamonaviy kadr va haqiqiy yetakchilik.",
                'Self-development: languages, creative thinking, reading, and career choice; social demand: modern talent and authentic leadership.',
                'Саморазвитие: языки, творческое мышление, чтение и выбор профессии; общественный запрос: современные кадры и настоящее лидерство.',
              ),
            ],
            examples: [
              '진로 선택을 위해서는 자신의 능력을 꾸준히 개발해야 한다.',
            ],
            highlights: ['능력'],
          },
          {
            rank: 4,
            form: '인간 심리',
            meanings: [
              t4(
                '동기가 인간 심리에 미치는 영향, 칭찬의 긍정·부정적 면, 경쟁의 긍정·부정적 면, 실패와 도전을 통해 배우는 점.',
                "Motivatsiyaning ruhiyatga ta'siri, maqtov va raqobatning ikki tomoni, muvaffaqiyatsizlik va urinishdan o'rganish.",
                'Motivation’s psychological effect, positive and negative sides of praise and competition, and learning through failure and challenge.',
                'Влияние мотивации, положительные и отрицательные стороны похвалы и конкуренции, обучение через неудачу и вызов.',
              ),
            ],
            examples: [
              '경쟁은 동기를 높일 수 있지만 지나치면 스트레스를 키울 수 있다.',
            ],
            highlights: ['인간 심리'],
          },
          {
            rank: 5,
            form: '정보의 양면성',
            meanings: [
              t4(
                '광고와 영화의 양면성, 통계 자료의 해석 차이, 신문과 인터넷 정보 등 매체의 양면성.',
                'Reklama va filmning ikki tomoni, statistik talqin farqi, gazeta va internet axborotining ikki tomoni.',
                'Two sides of advertising and film, differences in statistical interpretation, and the dual nature of newspaper and internet information.',
                'Двойственность рекламы и кино, различия интерпретации статистики, две стороны газетной и интернет-информации.',
              ),
            ],
            examples: [
              '통계 자료는 유용하지만 해석 방법에 따라 다른 결론이 나올 수 있다.',
            ],
            highlights: ['정보의 양면성'],
          },
          {
            rank: 6,
            form: '교육',
            meanings: [
              t4(
                '공교육: 역사·예술·체육 교육의 필요성. 사교육: 조기 교육과 사교육의 장단점. 대학 교육: 교양 과목 등 바람직한 대학 교육.',
                "Davlat ta'limi: tarix, san'at, jismoniy tarbiya; xususiy ta'lim: erta ta'limning afzallik va kamchiligi; oliy ta'lim: umumiy fanlar.",
                'Public education: history, arts, and physical education; private education: pros and cons of early education; university education: desirable liberal education.',
                'Государственное образование: история, искусство, физкультура; частное: плюсы и минусы раннего обучения; высшее: роль общеобразовательных дисциплин.',
              ),
            ],
            examples: [
              '조기 교육은 아이의 재능을 키울 수 있지만 강요가 될 위험도 있다.',
            ],
            highlights: ['교육'],
          },
          {
            rank: 7,
            form: '환경·절약',
            meanings: [
              t4(
                '환경오염을 줄이는 방법, 에너지·소비 절약의 실천, 자연 보존과 자연 개발.',
                "Atrof-muhit ifloslanishini kamaytirish, energiya va iste'molni tejash, tabiatni saqlash va rivojlantirish.",
                'Reducing pollution, conserving energy and consumption, and balancing nature preservation with development.',
                'Снижение загрязнения, экономия энергии и потребления, сохранение природы и развитие.',
              ),
            ],
            examples: ['자연 개발은 필요성과 보존 가치를 함께 고려해야 한다.'],
            highlights: ['환경·절약'],
          },
          {
            rank: 8,
            form: '봉사',
            meanings: [
              t4(
                '개인의 봉사 가치와 기업의 사회 활동.',
                "Shaxsiy ko'ngillilik qadri va korxonaning ijtimoiy faoliyati.",
                'The value of individual volunteering and corporate social activity.',
                'Ценность личного волонтёрства и социальная деятельность компаний.',
              ),
            ],
            examples: [
              '현대 사회에서 봉사는 공동체의 문제를 함께 해결하는 실천이다.',
            ],
            highlights: ['봉사'],
          },
          {
            rank: 9,
            form: '삶의 만족도',
            meanings: [
              t4(
                '행복한 삶의 조건: 경제적 여유, 성공의 조건 등.',
                'Baxtli hayot shartlari: iqtisodiy erkinlik, muvaffaqiyat shartlari va boshqalar.',
                'Conditions for a happy life, including financial latitude and conditions for success.',
                'Условия счастливой жизни, включая материальную свободу и условия успеха.',
              ),
            ],
            examples: [
              '행복한 삶은 경제적 여유뿐 아니라 관계와 삶의 의미에도 영향을 받는다.',
            ],
            highlights: ['삶의 만족도'],
          },
        ],
        tips: [
          t4(
            'Ranking은 예상문제 정답 목록이 아니라 출제 가능한 주제를 준비하기 위한 분류표다. 각 소분류의 핵심 어휘와 찬반 근거를 미리 정리한다.',
            "Reyting tayyor javoblar ro'yxati emas, ehtimoliy mavzular tasnifi. Har kichik mavzu uchun asosiy so'z va taraf-qarshi dalillarni tayyorlang.",
            'The ranking is a preparation taxonomy, not an answer list. Prepare key vocabulary and pro/con grounds for each detailed topic.',
            'Ranking — это классификация возможных тем, а не список ответов. Подготовьте лексику и аргументы за/против по каждой подтеме.',
          ),
        ],
      },
      {
        key: 'writing-54-outline-flow',
        title: t4(
          '60회 기출 개요·문단 흐름',
          '60-imtihon reja va paragraf oqimi',
          '60th-test outline and paragraph flow',
          'План и ход абзацев 60-го теста',
        ),
        entries: [
          {
            rank: 1,
            form: '서론: 의미와 현황',
            meanings: [
              t4(
                '조기 교육을 정의하고 실제로 많은 아이가 영어·컴퓨터 등의 조기 교육을 받는 현황을 제시한다.',
                "Erta ta'limni ta'riflab, ko'p bolalar ingliz tili va kompyuter kabi ta'lim olayotgan holatni ko'rsatadi.",
                'Defines early education and presents the current situation of many children studying English, computers, and other subjects early.',
                'Определяет раннее обучение и описывает распространённость английского, компьютера и других занятий у детей.',
              ),
            ],
            examples: [
              '조기 교육이란 학교에 들어가지 않은 아이들에게 음악이나 외국어 등 다양한 교육을 실시하는 것을 말한다.',
            ],
            highlights: ['조기 교육이란'],
          },
          {
            rank: 2,
            form: '본론 1: 장점',
            meanings: [
              t4(
                '재능을 일찍 발견하고 키움, 학업 경쟁력 향상, 다양한 경험의 세 가지 장점을 구체화한다.',
                "Iste'dodni erta topish va rivojlantirish, o'qish raqobatbardoshligi, turli tajribaning uch afzalligini ochadi.",
                'Develops three benefits: early talent discovery and development, academic competitiveness, and varied experiences.',
                'Раскрывает три преимущества: раннее выявление и развитие таланта, учебная конкурентоспособность и разнообразный опыт.',
              ),
            ],
            examples: [
              '먼저 조기 교육의 장점은 아이의 재능을 일찍 발견하고 그 재능을 키울 수 있다는 점이다.',
            ],
            highlights: ['조기 교육의 장점'],
          },
          {
            rank: 3,
            form: '본론 2: 문제점',
            meanings: [
              t4(
                '부모의 지나친 관심과 강요, 경쟁 스트레스로 인한 학업 흥미 상실, 정서 발달의 해를 제시한다.',
                "Ota-ona bosimi, raqobat stressidan o'qishga qiziqish yo'qolishi va hissiy rivojga zararni ko'rsatadi.",
                'Presents parental pressure, loss of interest from competitive stress, and harm to emotional development.',
                'Показывает давление родителей, потерю интереса из-за конкуренции и вред эмоциональному развитию.',
              ),
            ],
            examples: [
              '반면 조기 교육은 부모의 지나친 관심과 강요에 의해 이루어질 수 있다는 문제점이 있다.',
            ],
            highlights: ['반면', '문제점'],
          },
          {
            rank: 4,
            form: '결론: 찬성 또는 반대',
            meanings: [
              t4(
                '찬성은 흥미와 자발성을 조건으로 장점을 살리고, 반대는 부모 결정과 비자발성 때문에 손실이 더 클 수 있음을 근거로 삼는다.',
                "Taraf fikr qiziqish va ixtiyoriylik bilan afzallikni saqlaydi; qarshi fikr ota-ona qarori va majburlash tufayli yo'qotish ko'p bo'lishini asos qiladi.",
                'The pro side conditions benefits on interest and choice; the con side argues that parental decisions and lack of choice can make losses outweigh gains.',
                'Сторона «за» связывает пользу с интересом и добровольностью; сторона «против» указывает, что решение родителей и отсутствие выбора могут дать больше потерь.',
              ),
            ],
            examples: [writing54ProConclusion],
            highlights: ['찬성한다'],
          },
        ],
        tips: [
          t4(
            '교재는 찬성과 반대 결론을 모두 보여 준다. 어느 입장을 택하든 개요와 본론에서 이미 제시한 내용을 근거로 써야 한다.',
            "Kitob taraf va qarshi xulosaning ikkalasini ko'rsatadi. Qaysi biri tanlansa ham, dalil reja va asosiy qismdagi mazmunga tayanadi.",
            'The book provides both pro and con conclusions. Whichever you choose must be grounded in the outline and body already written.',
            'Книга показывает оба вывода — «за» и «против». Любая позиция должна опираться на уже изложенные план и основную часть.',
          ),
        ],
      },
    ],
    examples: writing54Examples,
    practice: writing54Practice,
    sourceReference: '합격 레시피 PDF 273~278쪽',
  },
].map(normalizeRecipeRankings);
