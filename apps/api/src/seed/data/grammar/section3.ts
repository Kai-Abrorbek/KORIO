// ═══════════════════════════════════════════════════════════
// SECTION 3
// 서울대 한국어 2A
// ═══════════════════════════════════════════════════════════
//
// UNIT 1 — 처음 뵙겠습니다
//
// 1. N(이)라고 하다
// 2. V-(으)려고
// 3. V-거나
// 4. N(이)나 1
//
// 자기소개 → 의도/목적 → 동작 선택 → 명사 선택 순서.
// ═══════════════════════════════════════════════════════════

export const GRAMMAR_SEED_S3: any[] = [
  // ─────────────────────────────────────────────
  // 섹션 3-1. N(이)라고 하다
  // ─────────────────────────────────────────────
  {
    code: 'noun-irago-hada',
    pattern: 'N(이)라고 하다',
    section: 3,
    unit: 1,
    order: 1,
    isActive: true,

    summary: {
      ko: '사람의 이름이나 사물의 이름을 소개하거나, 무엇을 어떻게 부르는지 말할 때 사용해요. 받침이 있으면 "이라고 하다", 받침이 없으면 "라고 하다"를 써요.',
      uz: 'Odamning ismini yoki narsaning nomini tanishtirish, shuningdek biror narsa qanday atalishini aytishda ishlatiladi. 받침 bo‘lsa "이라고 하다", bo‘lmasa "라고 하다" ishlatiladi.',
      en: 'Used to introduce a name or say what a person or thing is called. Use "이라고 하다" after a final consonant and "라고 하다" after a vowel.',
      ru: 'Используется, чтобы назвать своё или чужое имя, а также сказать, как называется какой-либо предмет. После конечного согласного употребляется "이라고 하다", после гласного — "라고 하다".',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '소개',
        uz: 'Tanishtirish',
        en: 'Introduction',
        ru: 'Представление',
      },
      {
        ko: '인용',
        uz: 'Iqtibos',
        en: 'Quotation',
        ru: 'Цитирование',
      },
    ],

    explanation: {
      ko: '"N(이)라고 하다"는 이름이나 명칭을 다른 사람에게 알려 줄 때 사용하는 표현이에요. 자기소개를 할 때 "저는 민수라고 해요", "제 이름은 아브로르라고 합니다"처럼 말할 수 있고, 사물의 이름을 설명할 때도 "이 음식을 비빔밥이라고 해요"처럼 사용할 수 있어요.\n\n형태는 앞의 명사에 받침이 있는지 없는지에 따라 달라져요. "학생", "비빔밥", "한국"처럼 마지막 음절에 받침이 있으면 "이라고"를 붙이고, "수지", "마리아", "의사"처럼 받침이 없으면 "라고"를 붙여요. 그래서 "학생이라고", "비빔밥이라고"가 되고, "수지라고", "마리아라고"가 돼요.\n\n뒤에 오는 "하다"는 상황에 따라 활용할 수 있어요. 일상적인 대화에서는 "라고 해요", 조금 더 격식 있게 자기소개할 때는 "라고 합니다"가 자주 쓰여요. 처음 만나는 사람에게 자기소개하는 상황에서는 "저는 아브로르라고 합니다"처럼 말하면 자연스럽고 정중해요.\n\n이 표현은 단순히 "~이에요/예요"와 완전히 같은 것은 아니에요. "저는 민수예요"는 내가 민수라는 사실을 직접 말하는 문장이고, "저는 민수라고 해요"는 직역하면 "저를 민수라고 합니다", 즉 자신의 이름이나 불리는 이름을 소개하는 느낌이 있어요. 그래서 처음 만난 사람에게 이름을 소개하거나 새로운 명칭을 알려 줄 때 특히 유용해요.',
      uz: '"N(이)라고 하다" odam yoki narsaning nomini boshqa odamga aytishda ishlatiladi. O‘zingizni tanishtirganda "저는 민수라고 해요" yoki "제 이름은 아브로르라고 합니다" deyishingiz mumkin. Narsaning nomini tushuntirishda ham "이 음식을 비빔밥이라고 해요" kabi ishlatiladi.\n\nShakl oldingi otning 받침 bilan tugashiga bog‘liq. "학생", "비빔밥", "한국" kabi 받침 bilan tugagan otlarga "이라고", "수지", "마리아", "의사" kabi unli bilan tugagan otlarga "라고" qo‘shiladi.\n\nOxiridagi "하다" vaziyatga qarab tuslanadi. Oddiy suhbatda "라고 해요", rasmiyroq tanishtirishda esa "라고 합니다" ko‘p ishlatiladi. Birinchi marta uchrashgan odamga "저는 아브로르라고 합니다" deyish tabiiy va muloyim hisoblanadi.\n\nBu shakl "~이에요/예요" bilan butunlay bir xil emas. "저는 민수예요" bevosita "Men Minsuman" degan ma’noni beradi, "저는 민수라고 해요" esa o‘z ismingiz yoki sizni qanday atashlarini tanishtirish ohangiga ega.',
      en: '"N(이)라고 하다" is used when telling someone the name of a person or thing. When introducing yourself, you can say "저는 민수라고 해요" or, more formally, "제 이름은 아브로르라고 합니다." It is also useful when explaining what something is called, as in "이 음식을 비빔밥이라고 해요."\n\nThe form changes depending on whether the noun has a final consonant. Add "이라고" after nouns ending in a consonant, such as 학생, 비빔밥, and 한국. Add "라고" after nouns ending in a vowel, such as 수지, 마리아, and 의사.\n\nThe verb 하다 at the end can be conjugated according to the situation. "라고 해요" is common in ordinary conversation, while "라고 합니다" is more formal and is especially natural when introducing yourself to someone for the first time.\n\nThis pattern is related to, but not exactly the same as, "~이에요/예요." "저는 민수예요" directly states that you are Minsu. "저는 민수라고 해요" has the nuance of saying that your name is Minsu or that you are called Minsu.',
      ru: '"N(이)라고 하다" используется, когда нужно сообщить имя человека или название предмета. При знакомстве можно сказать "저는 민수라고 해요" или более официально "제 이름은 아브로르라고 합니다". Названия предметов также объясняются с помощью этой конструкции: "이 음식을 비빔밥이라고 해요".\n\nФорма зависит от наличия 받침. После существительного с конечным согласным, например 학생, 비빔밥 или 한국, используется "이라고". После существительного без конечного согласного, например 수지, 마리아 или 의사, используется "라고".\n\nГлагол 하다 в конце изменяется в зависимости от ситуации. В обычной речи часто говорят "라고 해요", а при более официальном знакомстве — "라고 합니다". При первой встрече фраза "저는 아브로르라고 합니다" звучит естественно и вежливо.\n\nЭта конструкция близка к "~이에요/예요", но имеет другой оттенок. "저는 민수예요" непосредственно означает «Я Минсу», тогда как "저는 민수라고 해요" передаёт значение «Меня зовут Минсу / меня называют Минсу».',
    },

    conjugationRule: {
      ko: '받침 O + 이라고 하다  ·  받침 X + 라고 하다',
      uz: '받침 bor + 이라고 하다  ·  받침 yo‘q + 라고 하다',
      en: 'final consonant + 이라고 하다  ·  no final consonant + 라고 하다',
      ru: 'есть конечный согласный + 이라고 하다  ·  нет конечного согласного + 라고 하다',
    },

    conjugations: [
      // 받침 O — 5
      { base: '학생', result: '학생이라고 하다' },
      { base: '선생님', result: '선생님이라고 하다' },
      { base: '비빔밥', result: '비빔밥이라고 하다' },
      { base: '한국', result: '한국이라고 하다' },
      { base: '민준', result: '민준이라고 하다' },

      // 받침 X — 5
      { base: '수지', result: '수지라고 하다' },
      { base: '마리아', result: '마리아라고 하다' },
      { base: '의사', result: '의사라고 하다' },
      { base: '나나', result: '나나라고 하다' },
      { base: '학교', result: '학교라고 하다' },
    ],

    examples: [
      {
        ko: '저는 아브로르라고 합니다.',
        highlight: '아브로르라고 합니다',
        gloss: {
          ko: '저는 아브로르라고 합니다.',
          uz: 'Mening ismim Abror.',
          en: 'My name is Abror.',
          ru: 'Меня зовут Аброр.',
        },
      },
      {
        ko: '제 이름은 수지라고 해요.',
        highlight: '수지라고 해요',
        gloss: {
          ko: '제 이름은 수지라고 해요.',
          uz: 'Mening ismim Suji.',
          en: 'My name is Suji.',
          ru: 'Меня зовут Суджи.',
        },
      },
      {
        ko: '이분은 김민수라고 합니다.',
        highlight: '김민수라고 합니다',
        gloss: {
          ko: '이분은 김민수라고 합니다.',
          uz: 'Bu kishining ismi Kim Minsu.',
          en: 'This person is called Kim Minsu.',
          ru: 'Этого человека зовут Ким Минсу.',
        },
      },
      {
        ko: '이 음식을 비빔밥이라고 해요.',
        highlight: '비빔밥이라고 해요',
        gloss: {
          ko: '이 음식을 비빔밥이라고 해요.',
          uz: 'Bu taom bibimbap deb ataladi.',
          en: 'This dish is called bibimbap.',
          ru: 'Это блюдо называется пибимпап.',
        },
      },
      {
        ko: '한국에서는 이것을 한복이라고 해요.',
        highlight: '한복이라고 해요',
        gloss: {
          ko: '한국에서는 이것을 한복이라고 해요.',
          uz: 'Koreyada buni hanbok deb atashadi.',
          en: 'In Korea, this is called hanbok.',
          ru: 'В Корее это называется ханбок.',
        },
      },
      {
        ko: '제 친구는 안나라고 해요.',
        highlight: '안나라고 해요',
        gloss: {
          ko: '제 친구는 안나라고 해요.',
          uz: 'Do‘stimning ismi Anna.',
          en: 'My friend is called Anna.',
          ru: 'Мою подругу зовут Анна.',
        },
      },
      {
        ko: '저희 고양이는 보리라고 해요.',
        highlight: '보리라고 해요',
        gloss: {
          ko: '저희 고양이는 보리라고 해요.',
          uz: 'Bizning mushugimizning ismi Bori.',
          en: 'Our cat is called Bori.',
          ru: 'Нашего кота зовут Бори.',
        },
      },
      {
        ko: '사람들은 이곳을 남산이라고 불러요.',
        highlight: '남산이라고',
        gloss: {
          ko: '사람들은 이곳을 남산이라고 불러요.',
          uz: 'Odamlar bu joyni Namsan deb atashadi.',
          en: 'People call this place Namsan.',
          ru: 'Люди называют это место Намсан.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '안녕하세요. 저는 민수라고 합니다.',
        highlight: '민수라고 합니다',
        gloss: {
          ko: '안녕하세요. 저는 민수라고 합니다.',
          uz: 'Salom. Mening ismim Minsu.',
          en: 'Hello. My name is Minsu.',
          ru: 'Здравствуйте. Меня зовут Минсу.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '처음 뵙겠습니다. 저는 마리아라고 해요.',
        highlight: '마리아라고 해요',
        gloss: {
          ko: '처음 뵙겠습니다. 저는 마리아라고 해요.',
          uz: 'Tanishganimdan xursandman. Mening ismim Mariya.',
          en: 'Nice to meet you. My name is Maria.',
          ru: 'Рада познакомиться. Меня зовут Мария.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '친구들은 저를 민이라고도 해요.',
        highlight: '민이라고도 해요',
        gloss: {
          ko: '친구들은 저를 민이라고도 해요.',
          uz: 'Do‘stlarim meni Min deb ham chaqirishadi.',
          en: 'My friends also call me Min.',
          ru: 'Друзья также называют меня Мин.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아, 그러세요? 만나서 반가워요.',
        highlight: '만나서 반가워요',
        gloss: {
          ko: '아, 그러세요? 만나서 반가워요.',
          uz: 'Ha, shundaymi? Tanishganimdan xursandman.',
          en: 'Oh, really? Nice to meet you.',
          ru: 'Правда? Очень приятно познакомиться.',
        },
      },
    ],

    similar: {
      pattern: 'N이에요/예요',
      note: {
        ko: '"저는 민수예요"는 신분이나 이름을 직접 말하고, "저는 민수라고 해요"는 자신의 이름이나 불리는 이름을 소개하는 느낌이 더 강해요.',
        uz: '"저는 민수예요" kimligingizni bevosita aytadi, "저는 민수라고 해요" esa ismingizni tanishtirish ohangiga ega.',
        en: '"저는 민수예요" directly states who you are, while "저는 민수라고 해요" more specifically introduces what you are called.',
        ru: '"저는 민수예요" прямо сообщает, кто вы, а "저는 민수라고 해요" подчёркивает то, как вас зовут.',
      },
    },

    cautions: [
      {
        ko: '받침이 있는 이름 뒤에 바로 "라고"를 쓰지 않아요. "민준라고 해요"가 아니라 "민준이라고 해요"가 맞아요.',
        uz: '받침 bilan tugagan ismga faqat "라고" qo‘shilmaydi. "민준라고" emas, "민준이라고" to‘g‘ri.',
        en: 'Do not use 라고 directly after a noun with a final consonant. Say 민준이라고, not 민준라고.',
        ru: 'После имени с конечным согласным нельзя употреблять только 라고. Правильно 민준이라고, а не 민준라고.',
      },
      {
        ko: '받침이 없는 이름에는 "이라고"를 붙이지 않아요. "마리아이라고"가 아니라 "마리아라고"예요.',
        uz: '받침 bo‘lmagan ismga "이라고" ishlatilmaydi. "마리아이라고" emas, "마리아라고".',
        en: 'Do not add 이라고 after a vowel-ending noun. Say 마리아라고, not 마리아이라고.',
        ru: 'После имени без конечного согласного используется 라고: 마리아라고, а не 마리아이라고.',
      },
      {
        ko: '자기소개에서 "저는 아브로르라고 입니다"처럼 "라고" 뒤에 입니다를 바로 붙이지 않아요. "라고 합니다"라고 해야 해요.',
        uz: 'Tanishtirishda "라고 입니다" deyilmaydi. To‘g‘ri shakl — "라고 합니다".',
        en: 'Do not say "라고 입니다." In a formal introduction, use "라고 합니다."',
        ru: 'Нельзя говорить "라고 입니다". В официальном представлении используется "라고 합니다".',
      },
    ],

    quiz: [
      {
        question: {
          ko: '제 이름은 민준___ 해요.',
          uz: '제 이름은 민준___ 해요.',
          en: '제 이름은 민준___ 해요.',
          ru: '제 이름은 민준___ 해요.',
        },
        options: [
          { text: '이라고', correct: true },
          { text: '라고', correct: false },
          { text: '이나', correct: false },
          { text: '거나', correct: false },
          { text: '은', correct: false },
        ],
      },
      {
        question: {
          ko: '저는 마리아___ 합니다.',
          uz: '저는 마리아___ 합니다.',
          en: '저는 마리아___ 합니다.',
          ru: '저는 마리아___ 합니다.',
        },
        options: [
          { text: '라고', correct: true },
          { text: '이라고', correct: false },
          { text: '이나', correct: false },
          { text: '으로', correct: false },
          { text: '에게', correct: false },
        ],
      },
      {
        question: {
          ko: '이 음식을 비빔밥___ 해요.',
          uz: '이 음식을 비빔밥___ 해요.',
          en: '이 음식을 비빔밥___ 해요.',
          ru: '이 음식을 비빔밥___ 해요.',
        },
        options: [
          { text: '이라고', correct: true },
          { text: '라고', correct: false },
          { text: '이나', correct: false },
          { text: '에서', correct: false },
          { text: '까지', correct: false },
        ],
      },
      {
        question: {
          ko: '제 친구는 안나___ 해요.',
          uz: '제 친구는 안나___ 해요.',
          en: '제 친구는 안나___ 해요.',
          ru: '제 친구는 안나___ 해요.',
        },
        options: [
          { text: '라고', correct: true },
          { text: '이라고', correct: false },
          { text: '이나', correct: false },
          { text: '에게', correct: false },
          { text: '에서', correct: false },
        ],
      },
      {
        question: {
          ko: '한국에서는 이것을 한복___ 해요.',
          uz: '한국에서는 이것을 한복___ 해요.',
          en: '한국에서는 이것을 한복___ 해요.',
          ru: '한국에서는 이것을 한복___ 해요.',
        },
        options: [
          { text: '이라고', correct: true },
          { text: '라고', correct: false },
          { text: '이나', correct: false },
          { text: '하고', correct: false },
          { text: '보다', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3-2. V-(으)려고
  // ─────────────────────────────────────────────
  {
    code: 'verb-euryeogo',
    pattern: 'V-(으)려고',
    section: 3,
    unit: 1,
    order: 2,
    isActive: true,

    summary: {
      ko: '어떤 행동을 하려는 의도나 목적을 나타내요. 뒤에는 그 목적을 위해 하는 행동이 자연스럽게 이어져요.',
      uz: 'Biror ishni qilish niyati yoki maqsadini bildiradi. Keyingi qismda odatda shu maqsad uchun qilinadigan harakat keladi.',
      en: 'Expresses an intention or purpose to do something. It is commonly followed by an action taken in order to achieve that purpose.',
      ru: 'Выражает намерение или цель совершить действие. Далее обычно говорится о действии, которое совершается ради этой цели.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '의도',
        uz: 'Niyat',
        en: 'Intention',
        ru: 'Намерение',
      },
      {
        ko: '목적',
        uz: 'Maqsad',
        en: 'Purpose',
        ru: 'Цель',
      },
    ],

    explanation: {
      ko: '"V-(으)려고"는 말하는 사람이 어떤 행동을 할 생각이나 목적이 있다는 것을 나타내는 표현이에요. 쉽게 생각하면 "무엇을 하기 위해서" 또는 "무엇을 할 생각으로"라는 뜻이에요.\n\n예를 들어 "친구를 만나려고 시내에 갔어요"에서는 시내에 간 목적이 친구를 만나는 것이에요. "한국어를 배우려고 한국에 왔어요"에서는 한국에 온 목적이 한국어를 배우는 것이고요. 이렇게 앞부분에는 목적이 되는 행동이 나오고, 뒤에는 그 목적을 위해 실제로 하는 행동이 이어지는 경우가 많아요.\n\n동사 어간에 받침이 있으면 보통 "-으려고"를 붙여요. "먹다 → 먹으려고", "읽다 → 읽으려고", "찾다 → 찾으려고"가 돼요. 받침이 없으면 "-려고"를 붙여서 "가다 → 가려고", "보다 → 보려고", "만나다 → 만나려고"처럼 만들어요. 단, ㄹ 받침으로 끝나는 동사는 "-으려고"가 아니라 "-려고"를 사용해요. 그래서 "살다 → 살려고", "만들다 → 만들려고"가 돼요.\n\n"하다"가 붙은 동사는 자연스럽게 "하려고"로 바뀌어요. "공부하다 → 공부하려고", "운동하다 → 운동하려고", "여행하다 → 여행하려고"처럼 사용해요.\n\n또 이 표현은 아직 하지 않은 행동에 대한 의도와 목적을 나타내는 경우가 많아요. 그래서 이미 끝난 행동 자체를 단순히 설명할 때 쓰는 표현은 아니에요. 무엇을 할 생각인지, 또는 왜 다른 행동을 하는지 설명할 때 기억하면 이해하기 쉬워요.',
      uz: '"V-(으)려고" so‘zlovchining biror ishni qilish niyati yoki maqsadi borligini bildiradi. Uni "biror ishni qilish uchun" yoki "biror ishni qilmoqchi bo‘lib" deb tushunish mumkin.\n\nMasalan, "친구를 만나려고 시내에 갔어요" gapida shaharga borishdan maqsad do‘st bilan uchrashishdir. "한국어를 배우려고 한국에 왔어요" gapida esa Koreyaga kelishdan maqsad koreys tilini o‘rganishdir.\n\nFe’l o‘zagi 받침 bilan tugasa, odatda "-으려고" qo‘shiladi: 먹다 → 먹으려고, 읽다 → 읽으려고. 받침 bo‘lmasa "-려고": 가다 → 가려고, 보다 → 보려고. ㄹ bilan tugagan fe’llarda ham "-려고" ishlatiladi: 살다 → 살려고.\n\n하다 fe’llari "하려고" shakliga o‘tadi: 공부하다 → 공부하려고, 운동하다 → 운동하려고.',
      en: '"V-(으)려고" expresses the speaker’s intention or purpose. A useful way to understand it is "in order to do..." or "with the intention of doing...".\n\nIn "친구를 만나려고 시내에 갔어요", the purpose of going downtown is to meet a friend. In "한국어를 배우려고 한국에 왔어요", the purpose of coming to Korea is to learn Korean. The intended action normally comes before -(으)려고, and the action taken for that purpose follows it.\n\nAfter most consonant-ending stems, use "-으려고": 먹다 → 먹으려고, 읽다 → 읽으려고. After vowel-ending stems, use "-려고": 가다 → 가려고, 보다 → 보려고. Stems ending in ㄹ also take "-려고": 살다 → 살려고.\n\nVerbs ending in 하다 become 하려고: 공부하다 → 공부하려고, 운동하다 → 운동하려고. This construction most often refers to an intention or purpose connected with an action that has not yet been completed.',
      ru: '"V-(으)려고" выражает намерение или цель говорящего. Удобно понимать эту конструкцию как «чтобы сделать...» или «с намерением сделать...».\n\nВ предложении "친구를 만나려고 시내에 갔어요" целью поездки в центр является встреча с другом. В "한국어를 배우려고 한국에 왔어요" целью приезда в Корею является изучение корейского языка.\n\nПосле основы с конечным согласным обычно используется "-으려고": 먹다 → 먹으려고, 읽다 → 읽으려고. После гласной используется "-려고": 가다 → 가려고, 보다 → 보려고. После ㄹ также употребляется "-려고": 살다 → 살려고.\n\nГлаголы на 하다 образуют форму 하려고: 공부하다 → 공부하려고, 운동하다 → 운동하려고.',
    },

    conjugationRule: {
      ko: '받침 O + 으려고  ·  받침 X + 려고  ·  ㄹ 받침 + 려고  ·  하다 → 하려고',
      uz: '받침 bor + 으려고  ·  받침 yo‘q + 려고  ·  ㄹ + 려고  ·  하다 → 하려고',
      en: 'consonant + 으려고  ·  vowel + 려고  ·  ㄹ-final + 려고  ·  하다 → 하려고',
      ru: 'согласный + 으려고  ·  гласный + 려고  ·  ㄹ + 려고  ·  하다 → 하려고',
    },

    conjugations: [
      { base: '먹다', result: '먹으려고' },
      { base: '읽다', result: '읽으려고' },
      { base: '찾다', result: '찾으려고' },
      { base: '찍다', result: '찍으려고' },
      { base: '입다', result: '입으려고' },

      { base: '가다', result: '가려고' },
      { base: '보다', result: '보려고' },
      { base: '만나다', result: '만나려고' },
      { base: '살다', result: '살려고' },
      { base: '공부하다', result: '공부하려고' },
    ],

    examples: [
      {
        ko: '한국어를 배우려고 한국에 왔어요.',
        highlight: '배우려고',
        gloss: {
          ko: '한국어를 배우려고 한국에 왔어요.',
          uz: 'Koreys tilini o‘rganish uchun Koreyaga keldim.',
          en: 'I came to Korea to learn Korean.',
          ru: 'Я приехал в Корею, чтобы изучать корейский язык.',
        },
      },
      {
        ko: '친구를 만나려고 시내에 갔어요.',
        highlight: '만나려고',
        gloss: {
          ko: '친구를 만나려고 시내에 갔어요.',
          uz: 'Do‘stim bilan uchrashish uchun shahar markaziga bordim.',
          en: 'I went downtown to meet my friend.',
          ru: 'Я поехал в центр, чтобы встретиться с другом.',
        },
      },
      {
        ko: '책을 읽으려고 도서관에 갔어요.',
        highlight: '읽으려고',
        gloss: {
          ko: '책을 읽으려고 도서관에 갔어요.',
          uz: 'Kitob o‘qish uchun kutubxonaga bordim.',
          en: 'I went to the library to read a book.',
          ru: 'Я пошёл в библиотеку, чтобы почитать книгу.',
        },
      },
      {
        ko: '사진을 찍으려고 카메라를 가져왔어요.',
        highlight: '찍으려고',
        gloss: {
          ko: '사진을 찍으려고 카메라를 가져왔어요.',
          uz: 'Suratga olish uchun kamera olib keldim.',
          en: 'I brought a camera to take pictures.',
          ru: 'Я принёс камеру, чтобы фотографировать.',
        },
      },
      {
        ko: '건강해지려고 매일 운동해요.',
        highlight: '건강해지려고',
        gloss: {
          ko: '건강해지려고 매일 운동해요.',
          uz: 'Sog‘lom bo‘lish uchun har kuni mashq qilaman.',
          en: 'I exercise every day to become healthier.',
          ru: 'Я каждый день занимаюсь спортом, чтобы стать здоровее.',
        },
      },
      {
        ko: '한국에서 일하려고 한국어를 열심히 공부해요.',
        highlight: '일하려고',
        gloss: {
          ko: '한국에서 일하려고 한국어를 열심히 공부해요.',
          uz: 'Koreyada ishlash uchun koreys tilini astoydil o‘rganayapman.',
          en: 'I study Korean hard because I intend to work in Korea.',
          ru: 'Я усердно учу корейский, потому что собираюсь работать в Корее.',
        },
      },
      {
        ko: '주말에 여행하려고 돈을 모으고 있어요.',
        highlight: '여행하려고',
        gloss: {
          ko: '주말에 여행하려고 돈을 모으고 있어요.',
          uz: 'Dam olish kunlari sayohat qilish uchun pul yig‘yapman.',
          en: 'I am saving money to travel on the weekend.',
          ru: 'Я коплю деньги, чтобы поехать в путешествие на выходных.',
        },
      },
      {
        ko: '일찍 자려고 휴대폰을 껐어요.',
        highlight: '자려고',
        gloss: {
          ko: '일찍 자려고 휴대폰을 껐어요.',
          uz: 'Erta uxlash uchun telefonimni o‘chirdim.',
          en: 'I turned off my phone so I could go to bed early.',
          ru: 'Я выключил телефон, чтобы лечь спать пораньше.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '주말에 뭐 하려고 해요?',
        highlight: '뭐 하려고 해요',
        gloss: {
          ko: '주말에 뭐 하려고 해요?',
          uz: 'Dam olish kunlari nima qilmoqchisiz?',
          en: 'What are you planning to do this weekend?',
          ru: 'Что вы собираетесь делать на выходных?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '친구를 만나려고 해요.',
        highlight: '만나려고 해요',
        gloss: {
          ko: '친구를 만나려고 해요.',
          uz: 'Do‘stim bilan uchrashmoqchiman.',
          en: 'I am planning to meet a friend.',
          ru: 'Я собираюсь встретиться с другом.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '어디에서 만나려고 해요?',
        highlight: '만나려고 해요',
        gloss: {
          ko: '어디에서 만나려고 해요?',
          uz: 'Qayerda uchrashmoqchisiz?',
          en: 'Where are you planning to meet?',
          ru: 'Где вы собираетесь встретиться?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '새로 생긴 카페에 가려고 해요.',
        highlight: '가려고 해요',
        gloss: {
          ko: '새로 생긴 카페에 가려고 해요.',
          uz: 'Yangi ochilgan kafega bormoqchimiz.',
          en: 'We are planning to go to a newly opened café.',
          ru: 'Мы собираемся пойти в недавно открывшееся кафе.',
        },
      },
    ],

    similar: {
      pattern: 'V-(으)러 가다/오다',
      note: {
        ko: '"-(으)려고"는 일반적인 의도와 목적에 폭넓게 사용할 수 있지만, "-(으)러 가다/오다"는 어떤 행동을 하러 이동하는 상황에 주로 사용해요.',
        uz: '"-(으)려고" umumiy niyat va maqsadda keng ishlatiladi. "-(으)러 가다/오다" esa biror ishni qilish uchun bir joyga borish yoki kelishni bildiradi.',
        en: '"-(으)려고" expresses general intention or purpose, while "-(으)러 가다/오다" is mainly used when moving somewhere in order to do something.',
        ru: '"-(으)려고" широко выражает намерение и цель, а "-(으)러 가다/오다" обычно используется при движении куда-либо с определённой целью.',
      },
    },

    cautions: [
      {
        ko: '받침이 있는 동사에 무조건 "-려고"를 붙이지 않아요. "먹려고"가 아니라 "먹으려고"가 맞아요.',
        uz: '받침 bilan tugagan fe’lga har doim "-려고" qo‘shilmaydi. "먹려고" emas, "먹으려고".',
        en: 'Do not simply add 려고 after most consonant-ending stems. Say 먹으려고, not 먹려고.',
        ru: 'После большинства основ с согласным нельзя просто добавлять 려고. Правильно 먹으려고, а не 먹려고.',
      },
      {
        ko: 'ㄹ 받침에는 "-으려고"를 쓰지 않아요. "살으려고"가 아니라 "살려고"예요.',
        uz: 'ㄹ bilan tugagan fe’lga "-으려고" qo‘shilmaydi. "살으려고" emas, "살려고".',
        en: 'After a ㄹ-final stem, do not use 으려고. Say 살려고, not 살으려고.',
        ru: 'После основы на ㄹ не используется 으려고. Правильно 살려고, а не 살으려고.',
      },
      {
        ko: '"공부하다"는 "공부하으려고"가 아니라 "공부하려고"로 바뀌어요.',
        uz: '"공부하다" → "공부하려고". "공부하으려고" deyilmaydi.',
        en: '공부하다 becomes 공부하려고, not 공부하으려고.',
        ru: '공부하다 превращается в 공부하려고, а не в 공부하으려고.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '친구를 만나___ 일찍 나왔어요.',
          uz: 'Do‘stim bilan uchrashish maqsadida: 친구를 만나___ 일찍 나왔어요.',
          en: 'To mean "I came out early to meet a friend": 친구를 만나___ 일찍 나왔어요.',
          ru: 'Чтобы получилось «я вышел рано, чтобы встретиться с другом»: 친구를 만나___ 일찍 나왔어요.',
        },
        options: [
          { text: '려고', correct: true },
          { text: '으려고', correct: false },
          { text: '거나', correct: false },
          { text: '지만', correct: false },
          { text: '니까', correct: false },
        ],
      },
      {
        question: {
          ko: '책을 읽___ 도서관에 갔어요.',
          uz: 'Kitob o‘qish maqsadida: 책을 읽___ 도서관에 갔어요.',
          en: 'To mean "I went to the library to read": 책을 읽___ 도서관에 갔어요.',
          ru: 'Чтобы получилось «я пошёл в библиотеку почитать»: 책을 읽___ 도서관에 갔어요.',
        },
        options: [
          { text: '으려고', correct: true },
          { text: '려고', correct: false },
          { text: '거나', correct: false },
          { text: '고', correct: false },
          { text: '지만', correct: false },
        ],
      },
      {
        question: {
          ko: '한국어를 공부하___ 한국에 왔어요.',
          uz: 'Koreys tilini o‘rganish maqsadida: 한국어를 공부하___ 한국에 왔어요.',
          en: 'To express the purpose of studying Korean: 한국어를 공부하___ 한국에 왔어요.',
          ru: 'Чтобы выразить цель изучать корейский: 한국어를 공부하___ 한국에 왔어요.',
        },
        options: [
          { text: '려고', correct: true },
          { text: '으려고', correct: false },
          { text: '거나', correct: false },
          { text: '면서', correct: false },
          { text: '는데', correct: false },
        ],
      },
      {
        question: {
          ko: '사진을 찍___ 카메라를 가져왔어요.',
          uz: 'Suratga olish uchun: 사진을 찍___ 카메라를 가져왔어요.',
          en: 'To mean "I brought a camera to take pictures": 사진을 찍___ 카메라를 가져왔어요.',
          ru: 'Чтобы получилось «я принёс камеру, чтобы фотографировать»: 사진을 찍___ 카메라를 가져왔어요.',
        },
        options: [
          { text: '으려고', correct: true },
          { text: '려고', correct: false },
          { text: '거나', correct: false },
          { text: '지만', correct: false },
          { text: '는데', correct: false },
        ],
      },
      {
        question: {
          ko: '한국에서 살___ 한국어를 열심히 공부하고 있어요.',
          uz: 'Koreyada yashash niyatida: 한국에서 살___ 한국어를 열심히 공부하고 있어요.',
          en: 'To express an intention to live in Korea: 한국에서 살___ 한국어를 열심히 공부하고 있어요.',
          ru: 'Чтобы выразить намерение жить в Корее: 한국에서 살___ 한국어를 열심히 공부하고 있어요.',
        },
        options: [
          { text: '려고', correct: true },
          { text: '으려고', correct: false },
          { text: '거나', correct: false },
          { text: '으면', correct: false },
          { text: '지만', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3-3. V-거나
  // ─────────────────────────────────────────────
  {
    code: 'verb-geona',
    pattern: 'V-거나',
    section: 3,
    unit: 1,
    order: 3,
    isActive: true,

    summary: {
      ko: '두 가지 이상의 행동이나 상태 중 하나를 선택해서 말할 때 사용해요. 한국어의 "A하거나 B하다", 즉 "A 또는 B"의 의미예요.',
      uz: 'Ikki yoki undan ortiq harakat yoki holatdan birini tanlab aytishda ishlatiladi. "A yoki B" ma’nosini beradi.',
      en: 'Used to present alternatives between two or more actions or states, meaning "A or B."',
      ru: 'Используется для выбора между двумя или несколькими действиями или состояниями и означает «A или B».',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '선택',
        uz: 'Tanlov',
        en: 'Choice',
        ru: 'Выбор',
      },
      {
        ko: '연결',
        uz: 'Bog‘lash',
        en: 'Connection',
        ru: 'Соединение',
      },
    ],

    explanation: {
      ko: '"V-거나"는 두 가지 이상의 행동이나 상태를 선택 관계로 연결할 때 사용해요. 영어의 "or"와 비슷하게 생각하면 쉬워요. 예를 들어 "주말에는 영화를 보거나 책을 읽어요"는 주말에 영화를 볼 때도 있고 책을 읽을 때도 있다는 뜻이에요.\n\n형태는 아주 간단해요. 동사나 형용사의 기본형에서 "다"를 빼고 바로 "-거나"를 붙이면 돼요. "가다 → 가거나", "먹다 → 먹거나", "공부하다 → 공부하거나", "좋다 → 좋거나"처럼 받침 여부와 관계없이 같은 형태를 사용해요.\n\n"A거나 B"에서는 보통 A와 B가 같은 종류의 표현이면 자연스러워요. 행동과 행동을 연결해서 "운동하거나 산책해요", 상태와 상태를 연결해서 "날씨가 춥거나 비가 와요"처럼 말할 수 있어요.\n\n주말이나 취미처럼 항상 같은 행동을 하지 않고 여러 가능성이 있을 때 특히 많이 사용해요. "주말에는 집에서 쉬거나 친구를 만나요", "저녁에는 음악을 듣거나 책을 읽어요"처럼 일상생활을 설명할 때 매우 유용해요.\n\n명사를 선택할 때는 "-거나"를 사용하지 않고 뒤에서 배우는 "N(이)나"를 사용해요. 그래서 "커피거나 차"라고 하지 않고 "커피나 차"라고 해야 해요.',
      uz: '"V-거나" ikki yoki undan ortiq harakat yoki holatni "yoki" ma’nosida bog‘laydi. Masalan, "주말에는 영화를 보거나 책을 읽어요" — dam olish kunlari film ko‘raman yoki kitob o‘qiyman degan ma’noni beradi.\n\nShakli sodda: fe’l yoki sifatning lug‘at shaklidagi "다" ni olib tashlab, "-거나" qo‘shiladi. 가다 → 가거나, 먹다 → 먹거나, 공부하다 → 공부하거나, 좋다 → 좋거나. 받침 bu shaklni o‘zgartirmaydi.\n\nOdatda o‘xshash turdagi harakat yoki holatlar bog‘lanadi. 운동하거나 산책해요 kabi ikki harakat yoki 춥거나 비가 와요 kabi alternativ holatlar aytilishi mumkin.\n\nOtlarni tanlashda esa "-거나" emas, "N(이)나" ishlatiladi.',
      en: '"V-거나" connects two or more actions or states as alternatives and is similar to "or" in English. For example, "주말에는 영화를 보거나 책을 읽어요" means that on weekends you may watch movies or read books.\n\nThe formation is simple: remove 다 from the dictionary form and attach "-거나." It does not change according to final consonants: 가다 → 가거나, 먹다 → 먹거나, 공부하다 → 공부하거나, 좋다 → 좋거나.\n\nIt is particularly useful when describing routines that vary, such as weekend activities and hobbies. You can connect actions with actions or states with states.\n\nFor alternatives between nouns, do not use -거나. Korean uses "N(이)나" instead.',
      ru: '"V-거나" соединяет два или несколько действий или состояний со значением «или». Например, "주말에는 영화를 보거나 책을 읽어요" означает, что на выходных человек смотрит фильмы или читает книги.\n\nФорма простая: от словарной формы убирается 다 и добавляется "-거나". Наличие 받침 на форму не влияет: 가다 → 가거나, 먹다 → 먹거나, 공부하다 → 공부하거나, 좋다 → 좋거나.\n\nЭта конструкция особенно полезна для описания привычек, которые могут меняться, например занятий на выходных или хобби.\n\nПри выборе между существительными используется не -거나, а "N(이)나".',
    },

    conjugationRule: {
      ko: '동사/형용사 어간 + 거나  ·  받침 여부와 관계없이 동일',
      uz: 'Fe’l/sifat o‘zagi + 거나  ·  받침 shaklni o‘zgartirmaydi',
      en: 'verb/adjective stem + 거나  ·  same form regardless of final consonant',
      ru: 'основа глагола/прилагательного + 거나  ·  форма не зависит от конечного согласного',
    },

    conjugations: [
      { base: '가다', result: '가거나' },
      { base: '오다', result: '오거나' },
      { base: '먹다', result: '먹거나' },
      { base: '읽다', result: '읽거나' },
      { base: '보다', result: '보거나' },
      { base: '쉬다', result: '쉬거나' },
      { base: '운동하다', result: '운동하거나' },
      { base: '공부하다', result: '공부하거나' },
      { base: '좋다', result: '좋거나' },
      { base: '바쁘다', result: '바쁘거나' },
    ],

    examples: [
      {
        ko: '주말에는 영화를 보거나 책을 읽어요.',
        highlight: '보거나',
        gloss: {
          ko: '주말에는 영화를 보거나 책을 읽어요.',
          uz: 'Dam olish kunlari film ko‘raman yoki kitob o‘qiyman.',
          en: 'On weekends, I watch movies or read books.',
          ru: 'На выходных я смотрю фильмы или читаю книги.',
        },
      },
      {
        ko: '저녁에는 음악을 듣거나 산책해요.',
        highlight: '듣거나',
        gloss: {
          ko: '저녁에는 음악을 듣거나 산책해요.',
          uz: 'Kechqurun musiqa tinglayman yoki sayr qilaman.',
          en: 'In the evening, I listen to music or take a walk.',
          ru: 'Вечером я слушаю музыку или гуляю.',
        },
      },
      {
        ko: '방학에는 여행을 가거나 집에서 쉬어요.',
        highlight: '가거나',
        gloss: {
          ko: '방학에는 여행을 가거나 집에서 쉬어요.',
          uz: 'Ta’tilda sayohat qilaman yoki uyda dam olaman.',
          en: 'During vacation, I travel or rest at home.',
          ru: 'На каникулах я путешествую или отдыхаю дома.',
        },
      },
      {
        ko: '모르는 단어가 있으면 사전을 찾거나 선생님께 물어봐요.',
        highlight: '찾거나',
        gloss: {
          ko: '모르는 단어가 있으면 사전을 찾거나 선생님께 물어봐요.',
          uz: 'Bilmagan so‘zim bo‘lsa lug‘atdan izlayman yoki o‘qituvchidan so‘rayman.',
          en: 'If I do not know a word, I look it up in a dictionary or ask the teacher.',
          ru: 'Если я не знаю слово, я ищу его в словаре или спрашиваю учителя.',
        },
      },
      {
        ko: '버스를 타거나 지하철을 이용할 수 있어요.',
        highlight: '타거나',
        gloss: {
          ko: '버스를 타거나 지하철을 이용할 수 있어요.',
          uz: 'Avtobusga minishingiz yoki metrodan foydalanishingiz mumkin.',
          en: 'You can take a bus or use the subway.',
          ru: 'Можно поехать на автобусе или воспользоваться метро.',
        },
      },
      {
        ko: '피곤할 때는 일찍 자거나 낮잠을 자요.',
        highlight: '자거나',
        gloss: {
          ko: '피곤할 때는 일찍 자거나 낮잠을 자요.',
          uz: 'Charchaganimda erta uxlayman yoki kunduz kuni mizg‘ib olaman.',
          en: 'When I am tired, I go to bed early or take a nap.',
          ru: 'Когда я устаю, я рано ложусь спать или сплю днём.',
        },
      },
      {
        ko: '날씨가 춥거나 비가 오면 집에 있어요.',
        highlight: '춥거나',
        gloss: {
          ko: '날씨가 춥거나 비가 오면 집에 있어요.',
          uz: 'Havo sovuq bo‘lsa yoki yomg‘ir yog‘sa, uyda qolaman.',
          en: 'If it is cold or raining, I stay home.',
          ru: 'Если холодно или идёт дождь, я остаюсь дома.',
        },
      },
      {
        ko: '시간이 있으면 친구를 만나거나 운동을 해요.',
        highlight: '만나거나',
        gloss: {
          ko: '시간이 있으면 친구를 만나거나 운동을 해요.',
          uz: 'Vaqtim bo‘lsa do‘stlarim bilan uchrashaman yoki sport bilan shug‘ullanaman.',
          en: 'If I have time, I meet friends or exercise.',
          ru: 'Если есть время, я встречаюсь с друзьями или занимаюсь спортом.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '주말에는 보통 뭐 해요?',
        highlight: '뭐 해요',
        gloss: {
          ko: '주말에는 보통 뭐 해요?',
          uz: 'Dam olish kunlari odatda nima qilasiz?',
          en: 'What do you usually do on weekends?',
          ru: 'Что вы обычно делаете на выходных?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '친구를 만나거나 집에서 쉬어요.',
        highlight: '만나거나',
        gloss: {
          ko: '친구를 만나거나 집에서 쉬어요.',
          uz: 'Do‘stlarim bilan uchrashaman yoki uyda dam olaman.',
          en: 'I meet friends or relax at home.',
          ru: 'Я встречаюсь с друзьями или отдыхаю дома.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '집에서는 주로 뭐 해요?',
        highlight: '주로',
        gloss: {
          ko: '집에서는 주로 뭐 해요?',
          uz: 'Uyda asosan nima qilasiz?',
          en: 'What do you mainly do at home?',
          ru: 'Что вы обычно делаете дома?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '영화를 보거나 음악을 들어요.',
        highlight: '보거나',
        gloss: {
          ko: '영화를 보거나 음악을 들어요.',
          uz: 'Film ko‘raman yoki musiqa tinglayman.',
          en: 'I watch movies or listen to music.',
          ru: 'Я смотрю фильмы или слушаю музыку.',
        },
      },
    ],

    similar: {
      pattern: 'N(이)나',
      note: {
        ko: '"V-거나"는 동사나 형용사 뒤에서 행동·상태를 선택하고, "N(이)나"는 명사와 명사 사이에서 대상을 선택해요.',
        uz: '"V-거나" harakat yoki holatlarni, "N(이)나" esa otlarni tanlashda ishlatiladi.',
        en: '"V-거나" connects alternative actions or states, while "N(이)나" connects alternative nouns.',
        ru: '"V-거나" соединяет альтернативные действия или состояния, а "N(이)나" — существительные.',
      },
    },

    cautions: [
      {
        ko: '동사 기본형의 "다"를 남기지 않아요. "먹다거나"가 아니라 "먹거나"예요.',
        uz: 'Fe’lning "다" qismi qoldirilmaydi. "먹다거나" emas, "먹거나".',
        en: 'Remove 다 before adding 거나. Say 먹거나, not 먹다거나.',
        ru: 'Перед 거나 нужно убрать 다. Правильно 먹거나, а не 먹다거나.',
      },
      {
        ko: '명사를 직접 연결할 때 "-거나"를 쓰지 않아요. "커피거나 차"가 아니라 "커피나 차"예요.',
        uz: 'Otlarni bog‘lash uchun "-거나" ishlatilmaydi. "커피거나 차" emas, "커피나 차".',
        en: 'Do not use -거나 directly between nouns. Say 커피나 차, not 커피거나 차.',
        ru: 'Нельзя соединять существительные с помощью -거나. Правильно 커피나 차.',
      },
      {
        ko: '"-거나"와 "-고"는 달라요. "A고 B"는 보통 둘 다 하는 의미이고, "A거나 B"는 둘 중 하나의 가능성을 나타내요.',
        uz: '"-고" odatda ikkala harakatni, "-거나" esa alternativani bildiradi.',
        en: '-고 normally connects actions that both occur, while -거나 presents alternatives.',
        ru: '-고 обычно соединяет оба действия, а -거나 показывает альтернативу.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"영화를 보거나 책을 읽어요"처럼 두 행동 중 하나를 나타내세요: 영화를 보___ 책을 읽어요.',
          uz: 'Ikki harakatdan birini bildiring: 영화를 보___ 책을 읽어요.',
          en: 'Express a choice between two actions: 영화를 보___ 책을 읽어요.',
          ru: 'Выразите выбор между двумя действиями: 영화를 보___ 책을 읽어요.',
        },
        options: [
          { text: '거나', correct: true },
          { text: '고', correct: false },
          { text: '지만', correct: false },
          { text: '려고', correct: false },
          { text: '니까', correct: false },
        ],
      },
      {
        question: {
          ko: '둘 중 하나라는 뜻이 되도록: 집에서 쉬___ 친구를 만나요.',
          uz: 'Ikki variantdan biri ma’nosida: 집에서 쉬___ 친구를 만나요.',
          en: 'Make the two actions alternatives: 집에서 쉬___ 친구를 만나요.',
          ru: 'Сделайте действия альтернативами: 집에서 쉬___ 친구를 만나요.',
        },
        options: [
          { text: '거나', correct: true },
          { text: '고', correct: false },
          { text: '면서', correct: false },
          { text: '려고', correct: false },
          { text: '는데', correct: false },
        ],
      },
      {
        question: {
          ko: '선택의 의미가 되도록: 버스를 타___ 지하철을 이용해요.',
          uz: 'Tanlov ma’nosida: 버스를 타___ 지하철을 이용해요.',
          en: 'Express an alternative: 버스를 타___ 지하철을 이용해요.',
          ru: 'Выразите альтернативу: 버스를 타___ 지하철을 이용해요.',
        },
        options: [
          { text: '거나', correct: true },
          { text: '고', correct: false },
          { text: '아서', correct: false },
          { text: '지만', correct: false },
          { text: '려고', correct: false },
        ],
      },
      {
        question: {
          ko: '두 가능성 중 하나를 나타내세요: 날씨가 춥___ 비가 와요.',
          uz: 'Ikki ehtimoldan birini bildiring: 날씨가 춥___ 비가 와요.',
          en: 'Present two possible conditions: 날씨가 춥___ 비가 와요.',
          ru: 'Выразите две возможные ситуации: 날씨가 춥___ 비가 와요.',
        },
        options: [
          { text: '거나', correct: true },
          { text: '고', correct: false },
          { text: '지만', correct: false },
          { text: '어서', correct: false },
          { text: '려고', correct: false },
        ],
      },
      {
        question: {
          ko: '둘 중 하나를 하는 뜻이 되도록: 음악을 듣___ 책을 읽어요.',
          uz: 'Ikki ishning birini qilish ma’nosida: 음악을 듣___ 책을 읽어요.',
          en: 'Make the two activities alternatives: 음악을 듣___ 책을 읽어요.',
          ru: 'Сделайте два занятия альтернативами: 음악을 듣___ 책을 읽어요.',
        },
        options: [
          { text: '거나', correct: true },
          { text: '고', correct: false },
          { text: '으면', correct: false },
          { text: '는데', correct: false },
          { text: '려고', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3-4. N(이)나 1 — 선택
  // ─────────────────────────────────────────────
  {
    code: 'noun-ina-choice',
    pattern: 'N(이)나 1',
    section: 3,
    unit: 1,
    order: 4,
    isActive: true,

    summary: {
      ko: '두 개 이상의 명사 가운데 하나를 선택하거나 여러 가능한 대상을 제시할 때 사용해요. 받침이 있으면 "이나", 없으면 "나"를 붙여요.',
      uz: 'Ikki yoki undan ortiq ot orasidan birini tanlash yoki bir nechta mumkin bo‘lgan variantni ko‘rsatishda ishlatiladi. 받침 bo‘lsa "이나", bo‘lmasa "나".',
      en: 'Used to present a choice or alternatives between nouns. Use "이나" after a final consonant and "나" after a vowel.',
      ru: 'Используется для выбора или перечисления альтернатив между существительными. После конечного согласного используется "이나", после гласной — "나".',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '선택',
        uz: 'Tanlov',
        en: 'Choice',
        ru: 'Выбор',
      },
      {
        ko: '조사',
        uz: 'Ko‘makchi',
        en: 'Particle',
        ru: 'Частица',
      },
    ],

    explanation: {
      ko: '"N(이)나"는 명사와 명사를 "또는", "혹은"의 의미로 연결할 때 사용하는 조사예요. 두 가지 이상의 대상 중 하나를 선택하거나 가능한 선택지를 말할 때 사용해요. 예를 들어 "커피나 차를 마셔요"는 커피 또는 차 중 하나를 마신다는 뜻이에요.\n\n앞의 명사에 받침이 있으면 "이나"를 붙여요. "책 → 책이나", "물 → 물이나", "김밥 → 김밥이나"처럼 사용해요. 반대로 받침이 없으면 "나"를 붙여서 "커피 → 커피나", "주스 → 주스나", "영화 → 영화나"라고 해요.\n\n이 과에서 배우는 "N(이)나 1"은 여러 의미 중에서도 특히 "A 또는 B", 즉 선택의 의미에 집중해요. 한국어의 "(이)나"는 나중에 "한 시간이나 기다렸어요"처럼 예상보다 많다는 뜻이나, "커피나 마실까요?"처럼 가볍게 제안하는 뜻으로도 사용될 수 있어요. 하지만 지금 단계에서는 먼저 명사 선택의 의미를 확실히 익히는 것이 좋아요.\n\n앞에서 배운 "V-거나"와 기능이 아주 비슷하지만 붙는 대상이 달라요. 행동을 선택하면 "영화를 보거나 책을 읽어요"처럼 "-거나"를 쓰고, 명사를 선택하면 "영화나 드라마를 봐요"처럼 "(이)나"를 써요.\n\n일상생활에서는 음식, 음료, 교통수단, 취미, 장소 등 여러 선택지를 이야기할 때 매우 자주 사용해요. "점심에는 김밥이나 비빔밥을 먹어요", "주말에는 영화나 드라마를 봐요" 같은 문장을 익혀 두면 실제 대화에서도 바로 활용할 수 있어요.',
      uz: '"N(이)나" otlarni "yoki" ma’nosida bog‘laydigan qo‘shimcha. Ikki yoki undan ortiq narsadan birini tanlashda ishlatiladi. Masalan, "커피나 차를 마셔요" — qahva yoki choy ichaman degan ma’noni beradi.\n\nOldingi ot 받침 bilan tugasa "이나" ishlatiladi: 책 → 책이나, 물 → 물이나, 김밥 → 김밥이나. 받침 bo‘lmasa "나" ishlatiladi: 커피 → 커피나, 주스 → 주스나, 영화 → 영화나.\n\nBu darsdagi "N(이)나 1" aynan tanlov, ya’ni "A yoki B" ma’nosiga qaratilgan. Keyingi bosqichlarda "(이)나" ning boshqa ma’nolari ham o‘rganiladi.\n\nFe’llar orasidagi tanlov uchun "V-거나", otlar orasidagi tanlov uchun esa "N(이)나" ishlatiladi.',
      en: '"N(이)나" is a particle that connects nouns with the meaning "or." It is used when choosing one of two or more possible things. For example, "커피나 차를 마셔요" means "I drink coffee or tea."\n\nUse "이나" after a noun with a final consonant: 책 → 책이나, 물 → 물이나, 김밥 → 김밥이나. Use "나" after a noun ending in a vowel: 커피 → 커피나, 주스 → 주스나, 영화 → 영화나.\n\nThe "N(이)나 1" taught here focuses specifically on the choice meaning, "A or B." The particle has additional meanings that learners may encounter later, but those should be treated separately.\n\nIt is closely related to "V-거나." Use -거나 to choose between actions and (이)나 to choose between nouns.',
      ru: '"N(이)나" — частица со значением «или», соединяющая существительные. Она используется при выборе одного из двух или нескольких вариантов. Например, "커피나 차를 마셔요" означает «Я пью кофе или чай».\n\nПосле существительного с 받침 используется "이나": 책 → 책이나, 물 → 물이나, 김밥 → 김밥이나. После существительного без 받침 используется "나": 커피 → 커피나, 주스 → 주스나, 영화 → 영화나.\n\nВ данном уроке "N(이)나 1" относится именно к значению выбора «A или B». У этой частицы существуют и другие значения, которые лучше изучать отдельно на следующих этапах.\n\nКонструкция тесно связана с "V-거나": -거나 используется для действий, а (이)나 — для существительных.',
    },

    conjugationRule: {
      ko: '받침 O + 이나  ·  받침 X + 나',
      uz: '받침 bor + 이나  ·  받침 yo‘q + 나',
      en: 'final consonant + 이나  ·  no final consonant + 나',
      ru: 'есть конечный согласный + 이나  ·  нет конечного согласного + 나',
    },

    conjugations: [
      // 받침 O — 5
      { base: '책', result: '책이나' },
      { base: '물', result: '물이나' },
      { base: '김밥', result: '김밥이나' },
      { base: '밥', result: '밥이나' },
      { base: '주말', result: '주말이나' },

      // 받침 X — 5
      { base: '커피', result: '커피나' },
      { base: '주스', result: '주스나' },
      { base: '영화', result: '영화나' },
      { base: '드라마', result: '드라마나' },
      { base: '버스', result: '버스나' },
    ],

    examples: [
      {
        ko: '아침에는 빵이나 과일을 먹어요.',
        highlight: '빵이나',
        gloss: {
          ko: '아침에는 빵이나 과일을 먹어요.',
          uz: 'Ertalab non yoki meva yeyman.',
          en: 'For breakfast, I eat bread or fruit.',
          ru: 'На завтрак я ем хлеб или фрукты.',
        },
      },
      {
        ko: '커피나 차를 마실까요?',
        highlight: '커피나',
        gloss: {
          ko: '커피나 차를 마실까요?',
          uz: 'Qahva yoki choy ichamizmi?',
          en: 'Shall we have coffee or tea?',
          ru: 'Выпьем кофе или чай?',
        },
      },
      {
        ko: '점심에는 김밥이나 비빔밥을 먹어요.',
        highlight: '김밥이나',
        gloss: {
          ko: '점심에는 김밥이나 비빔밥을 먹어요.',
          uz: 'Tushlikda kimbap yoki bibimbap yeyman.',
          en: 'For lunch, I eat gimbap or bibimbap.',
          ru: 'На обед я ем кимпап или пибимпап.',
        },
      },
      {
        ko: '주말에는 영화나 드라마를 봐요.',
        highlight: '영화나',
        gloss: {
          ko: '주말에는 영화나 드라마를 봐요.',
          uz: 'Dam olish kunlari film yoki serial ko‘raman.',
          en: 'On weekends, I watch movies or dramas.',
          ru: 'На выходных я смотрю фильмы или сериалы.',
        },
      },
      {
        ko: '심심할 때 책이나 잡지를 읽어요.',
        highlight: '책이나',
        gloss: {
          ko: '심심할 때 책이나 잡지를 읽어요.',
          uz: 'Zeriksam kitob yoki jurnal o‘qiyman.',
          en: 'When I am bored, I read a book or a magazine.',
          ru: 'Когда мне скучно, я читаю книгу или журнал.',
        },
      },
      {
        ko: '학교에는 버스나 지하철로 갈 수 있어요.',
        highlight: '버스나',
        gloss: {
          ko: '학교에는 버스나 지하철로 갈 수 있어요.',
          uz: 'Maktabga avtobus yoki metro bilan borish mumkin.',
          en: 'You can get to school by bus or subway.',
          ru: 'До школы можно доехать на автобусе или метро.',
        },
      },
      {
        ko: '모르는 것이 있으면 선생님이나 친구에게 물어보세요.',
        highlight: '선생님이나',
        gloss: {
          ko: '모르는 것이 있으면 선생님이나 친구에게 물어보세요.',
          uz: 'Bilmagan narsangiz bo‘lsa o‘qituvchi yoki do‘stdan so‘rang.',
          en: 'If there is something you do not know, ask a teacher or friend.',
          ru: 'Если чего-то не знаете, спросите учителя или друга.',
        },
      },
      {
        ko: '휴일에는 공원이나 박물관에 자주 가요.',
        highlight: '공원이나',
        gloss: {
          ko: '휴일에는 공원이나 박물관에 자주 가요.',
          uz: 'Dam olish kunlari park yoki muzeyga tez-tez boraman.',
          en: 'On days off, I often go to a park or museum.',
          ru: 'В выходные я часто хожу в парк или музей.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '점심에 뭐 먹을까요?',
        highlight: '뭐 먹을까요',
        gloss: {
          ko: '점심에 뭐 먹을까요?',
          uz: 'Tushlikka nima yeymiz?',
          en: 'What should we eat for lunch?',
          ru: 'Что будем есть на обед?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '김밥이나 비빔밥을 먹어요.',
        highlight: '김밥이나',
        gloss: {
          ko: '김밥이나 비빔밥을 먹어요.',
          uz: 'Kimbap yoki bibimbap yeylik.',
          en: 'Let’s have gimbap or bibimbap.',
          ru: 'Давайте поедим кимпап или пибимпап.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '좋아요. 음료는요?',
        highlight: '음료는요',
        gloss: {
          ko: '좋아요. 음료는요?',
          uz: 'Yaxshi. Ichimlik-chi?',
          en: 'Sounds good. What about drinks?',
          ru: 'Хорошо. А что будем пить?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '커피나 차를 마셔요.',
        highlight: '커피나',
        gloss: {
          ko: '커피나 차를 마셔요.',
          uz: 'Qahva yoki choy ichamiz.',
          en: 'Let’s have coffee or tea.',
          ru: 'Выпьем кофе или чай.',
        },
      },
    ],

    similar: {
      pattern: 'V-거나',
      note: {
        ko: '"N(이)나"는 명사를 선택할 때 사용하고, "V-거나"는 행동이나 상태를 선택해서 연결할 때 사용해요. "커피나 차", "마시거나 먹다"처럼 구별하면 쉬워요.',
        uz: '"N(이)나" otlar orasidagi tanlovda, "V-거나" esa harakat yoki holatlar orasidagi tanlovda ishlatiladi.',
        en: '"N(이)나" connects alternative nouns, while "V-거나" connects alternative actions or states.',
        ru: '"N(이)나" используется для выбора между существительными, а "V-거나" — между действиями или состояниями.',
      },
    },

    cautions: [
      {
        ko: '받침이 있는 명사에 "나"만 붙이지 않아요. "책나 잡지"가 아니라 "책이나 잡지"예요.',
        uz: '받침 bilan tugagan otga faqat "나" qo‘shilmaydi. "책나" emas, "책이나".',
        en: 'After a consonant-ending noun, use 이나. Say 책이나, not 책나.',
        ru: 'После существительного с конечным согласным используется 이나: 책이나, а не 책나.',
      },
      {
        ko: '받침이 없는 명사에는 "이나"를 붙이지 않아요. "커피이나 차"가 아니라 "커피나 차"예요.',
        uz: '받침 bo‘lmagan otga "이나" qo‘shilmaydi. "커피이나" emas, "커피나".',
        en: 'After a vowel-ending noun, use 나. Say 커피나, not 커피이나.',
        ru: 'После существительного без конечного согласного используется 나: 커피나, а не 커피이나.',
      },
      {
        ko: '동사를 직접 연결할 때 "(이)나"를 쓰지 않아요. "먹이나 마셔요"가 아니라 "먹거나 마셔요"라고 해야 해요.',
        uz: 'Fe’llarni bog‘lashda "(이)나" ishlatilmaydi. "먹이나 마셔요" emas, "먹거나 마셔요".',
        en: 'Do not use (이)나 to connect verbs. Say 먹거나 마셔요, not 먹이나 마셔요.',
        ru: 'Нельзя соединять глаголы с помощью (이)나. Правильно 먹거나 마셔요.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '둘 중 하나를 선택하는 뜻이 되도록: 책___ 잡지를 읽어요.',
          uz: 'Ikki narsadan birini tanlash ma’nosida: 책___ 잡지를 읽어요.',
          en: 'Express a choice between the two nouns: 책___ 잡지를 읽어요.',
          ru: 'Выразите выбор между двумя существительными: 책___ 잡지를 읽어요.',
        },
        options: [
          { text: '이나', correct: true },
          { text: '나', correct: false },
          { text: '거나', correct: false },
          { text: '하고', correct: false },
          { text: '에서', correct: false },
        ],
      },
      {
        question: {
          ko: '둘 중 하나를 선택하는 뜻이 되도록: 커피___ 차를 마셔요.',
          uz: 'Ikki narsadan birini tanlash ma’nosida: 커피___ 차를 마셔요.',
          en: 'Express a choice: 커피___ 차를 마셔요.',
          ru: 'Выразите выбор: 커피___ 차를 마셔요.',
        },
        options: [
          { text: '나', correct: true },
          { text: '이나', correct: false },
          { text: '거나', correct: false },
          { text: '에서', correct: false },
          { text: '에게', correct: false },
        ],
      },
      {
        question: {
          ko: '선택의 의미가 되도록: 점심에 김밥___ 비빔밥을 먹어요.',
          uz: 'Tanlov ma’nosida: 점심에 김밥___ 비빔밥을 먹어요.',
          en: 'Express a choice: 점심에 김밥___ 비빔밥을 먹어요.',
          ru: 'Выразите выбор: 점심에 김밥___ 비빔밥을 먹어요.',
        },
        options: [
          { text: '이나', correct: true },
          { text: '나', correct: false },
          { text: '거나', correct: false },
          { text: '하고', correct: false },
          { text: '보다', correct: false },
        ],
      },
      {
        question: {
          ko: '둘 중 하나라는 뜻이 되도록: 영화___ 드라마를 봐요.',
          uz: 'Ikki variantdan biri ma’nosida: 영화___ 드라마를 봐요.',
          en: 'Make the nouns alternatives: 영화___ 드라마를 봐요.',
          ru: 'Сделайте существительные альтернативами: 영화___ 드라마를 봐요.',
        },
        options: [
          { text: '나', correct: true },
          { text: '이나', correct: false },
          { text: '거나', correct: false },
          { text: '하고', correct: false },
          { text: '에서', correct: false },
        ],
      },
      {
        question: {
          ko: '선택의 의미가 되도록: 선생님___ 친구에게 물어보세요.',
          uz: 'Tanlov ma’nosida: 선생님___ 친구에게 물어보세요.',
          en: 'Express a choice between the two people: 선생님___ 친구에게 물어보세요.',
          ru: 'Выразите выбор между двумя людьми: 선생님___ 친구에게 물어보세요.',
        },
        options: [
          { text: '이나', correct: true },
          { text: '나', correct: false },
          { text: '거나', correct: false },
          { text: '에서', correct: false },
          { text: '까지', correct: false },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // UNIT 2 — 취미가 뭐예요?
  // 취미 표현 → 능력 → 과거 경험을 꾸미기 → 부정 표현
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 2-1. V-는 것
  // ─────────────────────────────────────────────
  {
    code: 'verb-neun-geot',
    pattern: 'V-는 것',
    section: 3,
    unit: 2,
    order: 1,
    isActive: true,

    summary: {
      ko: '동작이나 행동을 하나의 "것"처럼 만들어 명사처럼 말할 때 사용해요. 취미, 좋아하는 일, 잘하는 일 등을 설명할 때 특히 많이 써요.',
      uz: 'Harakatni otga o‘xshatib, "biror ishni qilish" ma’nosida ifodalash uchun ishlatiladi. Ayniqsa hobbi, yoqtiradigan yoki yaxshi bajaradigan ishlarni aytishda ko‘p qo‘llanadi.',
      en: 'Turns an action into a noun-like expression meaning "doing something." It is especially useful for talking about hobbies, favorite activities, and things you are good at.',
      ru: 'Превращает действие в выражение, похожее на существительное, со значением «делать что-либо». Особенно часто используется при разговоре о хобби и любимых занятиях.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '명사화',
        uz: 'Otlashtirish',
        en: 'Nominalization',
        ru: 'Субстантивация',
      },
      {
        ko: '취미',
        uz: 'Hobbi',
        en: 'Hobbies',
        ru: 'Хобби',
      },
    ],

    explanation: {
      ko: '"V-는 것"은 동작이나 행동을 문장 안에서 명사처럼 사용할 수 있게 만드는 표현이에요. 한국어에서 "것"은 원래 "물건, 일, 대상" 정도의 뜻을 가진 명사인데, 동사 뒤에 "-는 것"을 붙이면 "그 행동을 하는 일"이라는 뜻이 돼요.\n\n예를 들어 "운동해요"는 단순히 "운동을 합니다"라는 문장이지만, "운동하는 것"이라고 하면 "운동하는 일", 즉 영어의 "exercising"이나 "to exercise"와 비슷한 하나의 대상처럼 말할 수 있어요. 그래서 "제 취미는 운동하는 것이에요", "저는 사진 찍는 것을 좋아해요"처럼 취미나 좋아하는 행동을 설명할 수 있어요.\n\n형태는 기본적으로 동사의 어간에 "-는 것"을 붙이면 돼요. "먹다 → 먹는 것", "가다 → 가는 것", "공부하다 → 공부하는 것", "요리하다 → 요리하는 것"처럼 받침이 있든 없든 대부분 같은 "-는 것"을 사용해요.\n\n하지만 어간이 ㄹ 받침으로 끝나면 ㄹ이 없어져요. "살다 → 사는 것", "만들다 → 만드는 것", "놀다 → 노는 것"처럼 활용해요. 이것은 ㄹ 받침이 ㄴ으로 시작하는 어미 앞에서 탈락하는 한국어 활용 규칙 때문이에요.\n\n취미를 소개할 때는 "제 취미는 + V-는 것이에요" 형태를 아주 자주 사용해요. 예를 들어 "제 취미는 음악을 듣는 것이에요", "제 취미는 새로운 음식을 만드는 것이에요"라고 할 수 있어요. 일상 대화에서는 "것이"가 줄어서 "게"처럼 들리거나 표현되기도 하지만, 학습 단계에서는 먼저 정확한 기본형인 "것"을 익히는 것이 좋아요.\n\n또 "좋아하다", "싫어하다", "재미있다", "어렵다" 같은 표현과도 잘 어울려요. "저는 여행하는 것을 좋아해요", "혼자 운동하는 것은 조금 지루해요"처럼 어떤 행동 자체에 대한 생각이나 느낌을 말할 수 있어요.',
      uz: '"V-는 것" harakat yoki ishni gap ichida ot kabi ishlatish imkonini beradi. "것" aslida "narsa" yoki "ish" degan ma’noga ega, lekin fe’l bilan birga kelganda "shu ishni qilish" ma’nosini beradi.\n\nMasalan, "운동해요" shunchaki "mashq qilaman" degan gap. "운동하는 것" esa "mashq qilish" degan tushunchaga aylanadi. Shu sababli "제 취미는 운동하는 것이에요" — "Mening hobbim sport bilan shug‘ullanish" kabi gaplarni tuzish mumkin.\n\nOdatda fe’l o‘zagiga "-는 것" qo‘shiladi: 먹다 → 먹는 것, 가다 → 가는 것, 공부하다 → 공부하는 것. 받침 bor yoki yo‘qligi odatda shaklni o‘zgartirmaydi.\n\nLekin ㄹ bilan tugagan fe’llarda ㄹ tushib qoladi: 살다 → 사는 것, 만들다 → 만드는 것, 놀다 → 노는 것.\n\nBu shakl hobbi, yaxshi ko‘radigan ish, yoqtirmaydigan ish yoki biror faoliyat haqidagi fikrni aytishda juda foydali: "저는 여행하는 것을 좋아해요", "제 취미는 사진을 찍는 것이에요".',
      en: '"V-는 것" allows an action to function like a noun inside a sentence. The noun 것 originally means something like "thing" or "matter," but when a verb modifies it with -는, the whole expression means "the act of doing that action."\n\nFor example, "운동해요" simply means "I exercise." "운동하는 것" means "exercising" or "the act of exercising," so it can become the subject or object of another expression. This is why Korean can say "제 취미는 운동하는 것이에요" or "저는 사진을 찍는 것을 좋아해요."\n\nFor most verbs, simply add "-는 것" to the verb stem: 먹다 → 먹는 것, 가다 → 가는 것, 공부하다 → 공부하는 것. The form does not normally change according to whether there is a final consonant.\n\nHowever, verbs whose stems end in ㄹ lose that ㄹ before 는: 살다 → 사는 것, 만들다 → 만드는 것, 놀다 → 노는 것.\n\nThis grammar is especially useful when discussing hobbies, preferences, and opinions about activities. It frequently appears with expressions such as 좋아하다, 싫어하다, 재미있다, and 어렵다.',
      ru: '"V-는 것" позволяет использовать действие как существительное внутри предложения. Слово 것 само по себе означает «вещь, дело», но после глагола с -는 всё выражение получает значение «выполнение этого действия».\n\nНапример, "운동해요" означает «я занимаюсь спортом», а "운동하는 것" — «занятие спортом». Поэтому можно сказать "제 취미는 운동하는 것이에요" или "저는 사진을 찍는 것을 좋아해요".\n\nУ большинства глаголов к основе просто добавляется "-는 것": 먹다 → 먹는 것, 가다 → 가는 것, 공부하다 → 공부하는 것. Наличие конечного согласного обычно не влияет на форму.\n\nОднако у глаголов с конечным ㄹ этот ㄹ исчезает перед 는: 살다 → 사는 것, 만들다 → 만드는 것, 놀다 → 노는 것.\n\nКонструкция особенно полезна для разговора о хобби, предпочтениях и отношении к различным занятиям.',
    },

    conjugationRule: {
      ko: '동사 어간 + 는 것  ·  ㄹ 받침은 ㄹ 탈락 + 는 것',
      uz: 'Fe’l o‘zagi + 는 것  ·  ㄹ bilan tugasa ㄹ tushadi',
      en: 'verb stem + 는 것  ·  final ㄹ drops before 는',
      ru: 'основа глагола + 는 것  ·  конечный ㄹ выпадает перед 는',
    },

    conjugations: [
      { base: '먹다', result: '먹는 것' },
      { base: '읽다', result: '읽는 것' },
      { base: '찍다', result: '찍는 것' },
      { base: '찾다', result: '찾는 것' },
      { base: '듣다', result: '듣는 것' },

      { base: '가다', result: '가는 것' },
      { base: '보다', result: '보는 것' },
      { base: '배우다', result: '배우는 것' },
      { base: '공부하다', result: '공부하는 것' },
      { base: '요리하다', result: '요리하는 것' },

      { base: '살다', result: '사는 것' },
      { base: '놀다', result: '노는 것' },
      { base: '만들다', result: '만드는 것' },
    ],

    examples: [
      {
        ko: '제 취미는 음악을 듣는 것이에요.',
        highlight: '음악을 듣는 것',
        gloss: {
          ko: '제 취미는 음악을 듣는 것이에요.',
          uz: 'Mening hobbim musiqa tinglash.',
          en: 'My hobby is listening to music.',
          ru: 'Моё хобби — слушать музыку.',
        },
      },
      {
        ko: '저는 사진을 찍는 것을 좋아해요.',
        highlight: '사진을 찍는 것',
        gloss: {
          ko: '저는 사진을 찍는 것을 좋아해요.',
          uz: 'Men suratga olishni yaxshi ko‘raman.',
          en: 'I like taking pictures.',
          ru: 'Я люблю фотографировать.',
        },
      },
      {
        ko: '주말에 자전거를 타는 것이 재미있어요.',
        highlight: '자전거를 타는 것',
        gloss: {
          ko: '주말에 자전거를 타는 것이 재미있어요.',
          uz: 'Dam olish kunlari velosiped minish qiziqarli.',
          en: 'Riding a bicycle on weekends is fun.',
          ru: 'Кататься на велосипеде по выходным интересно.',
        },
      },
      {
        ko: '저는 새로운 음식을 만드는 것을 좋아해요.',
        highlight: '새로운 음식을 만드는 것',
        gloss: {
          ko: '저는 새로운 음식을 만드는 것을 좋아해요.',
          uz: 'Men yangi taomlar tayyorlashni yaxshi ko‘raman.',
          en: 'I like making new dishes.',
          ru: 'Я люблю готовить новые блюда.',
        },
      },
      {
        ko: '아침에 일찍 일어나는 것은 아직 어려워요.',
        highlight: '아침에 일찍 일어나는 것',
        gloss: {
          ko: '아침에 일찍 일어나는 것은 아직 어려워요.',
          uz: 'Ertalab erta turish men uchun hali ham qiyin.',
          en: 'Getting up early in the morning is still difficult for me.',
          ru: 'Мне всё ещё трудно рано вставать утром.',
        },
      },
      {
        ko: '한국 드라마를 보는 것도 좋은 공부가 돼요.',
        highlight: '한국 드라마를 보는 것',
        gloss: {
          ko: '한국 드라마를 보는 것도 좋은 공부가 돼요.',
          uz: 'Koreys seriallarini tomosha qilish ham yaxshi o‘qish usuli.',
          en: 'Watching Korean dramas can also be a good way to study.',
          ru: 'Просмотр корейских сериалов тоже может быть хорошим способом учиться.',
        },
      },
      {
        ko: '친구들과 같이 운동하는 것이 혼자 하는 것보다 재미있어요.',
        highlight: '친구들과 같이 운동하는 것',
        gloss: {
          ko: '친구들과 같이 운동하는 것이 혼자 하는 것보다 재미있어요.',
          uz: 'Do‘stlar bilan birga mashq qilish yolg‘iz mashq qilishdan qiziqroq.',
          en: 'Exercising with friends is more fun than exercising alone.',
          ru: 'Заниматься спортом с друзьями интереснее, чем одному.',
        },
      },
      {
        ko: '여행하면서 새로운 사람을 만나는 것을 좋아해요.',
        highlight: '새로운 사람을 만나는 것',
        gloss: {
          ko: '여행하면서 새로운 사람을 만나는 것을 좋아해요.',
          uz: 'Sayohat paytida yangi odamlar bilan tanishishni yaxshi ko‘raman.',
          en: 'I like meeting new people while traveling.',
          ru: 'Я люблю знакомиться с новыми людьми во время путешествий.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '취미가 뭐예요?',
        highlight: '취미가 뭐예요',
        gloss: {
          ko: '취미가 뭐예요?',
          uz: 'Hobbingiz nima?',
          en: 'What is your hobby?',
          ru: 'Какое у вас хобби?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '제 취미는 기타를 치는 것이에요.',
        highlight: '기타를 치는 것',
        gloss: {
          ko: '제 취미는 기타를 치는 것이에요.',
          uz: 'Mening hobbim gitara chalish.',
          en: 'My hobby is playing the guitar.',
          ru: 'Моё хобби — играть на гитаре.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '언제부터 기타를 치는 것을 좋아했어요?',
        highlight: '기타를 치는 것',
        gloss: {
          ko: '언제부터 기타를 치는 것을 좋아했어요?',
          uz: 'Qachondan beri gitara chalishni yaxshi ko‘rasiz?',
          en: 'Since when have you liked playing the guitar?',
          ru: 'С каких пор вы любите играть на гитаре?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '고등학교 때부터 기타를 치는 것을 좋아했어요.',
        highlight: '기타를 치는 것',
        gloss: {
          ko: '고등학교 때부터 기타를 치는 것을 좋아했어요.',
          uz: 'Maktab davrimdan beri gitara chalishni yaxshi ko‘raman.',
          en: 'I have liked playing the guitar since high school.',
          ru: 'Я люблю играть на гитаре ещё со школы.',
        },
      },
    ],

    similar: {
      pattern: 'V-기',
      note: {
        ko: '"V-는 것"과 "V-기"는 모두 행동을 명사처럼 만들 수 있어요. 하지만 "-는 것"은 실제 행동이나 구체적인 상황을 조금 더 생생하게 나타내는 경우가 많고, "-기"는 규칙·계획·평가처럼 조금 더 간단하고 추상적으로 표현할 때 자주 사용해요.',
        uz: '"V-는 것" va "V-기" ikkalasi ham harakatni otlashtiradi. "-는 것" ko‘proq aniq faoliyatni, "-기" esa umumiyroq yoki mavhumroq harakatni ifodalashi mumkin.',
        en: 'Both "V-는 것" and "V-기" can nominalize actions. V-는 것 often refers to a more concrete activity or situation, while V-기 is frequently used for more general or abstract actions.',
        ru: 'И "V-는 것", и "V-기" превращают действие в существительное. "-는 것" часто описывает более конкретное действие, а "-기" — более общее или абстрактное.',
      },
    },

    cautions: [
      {
        ko: '동사 기본형의 "다"를 그대로 두지 않아요. "먹다는 것"이 아니라 "먹는 것"이에요.',
        uz: 'Fe’lning "다" qismi qoldirilmaydi. "먹다는 것" emas, "먹는 것".',
        en: 'Remove 다 before adding 는 것. Say 먹는 것, not 먹다는 것.',
        ru: 'Перед 는 것 нужно убрать 다. Правильно 먹는 것, а не 먹다는 것.',
      },
      {
        ko: 'ㄹ 받침 동사는 ㄹ을 그대로 두지 않아요. "살는 것"이 아니라 "사는 것", "놀는 것"이 아니라 "노는 것"이에요.',
        uz: 'ㄹ bilan tugagan fe’llarda ㄹ tushadi. "살는 것" emas, "사는 것".',
        en: 'Final ㄹ drops before 는. Say 사는 것, not 살는 것.',
        ru: 'Конечный ㄹ выпадает перед 는. Правильно 사는 것, а не 살는 것.',
      },
      {
        ko: '취미를 말할 때 "제 취미는 음악을 들어요"라고 해도 뜻은 전달되지만, 취미 자체를 명사처럼 설명하려면 "제 취미는 음악을 듣는 것이에요"가 더 정확해요.',
        uz: 'Hobbini faoliyat sifatida aytganda "제 취미는 음악을 듣는 것이에요" shakli aniqroq.',
        en: 'When defining the hobby itself as an activity, "제 취미는 음악을 듣는 것이에요" is more structurally precise than simply saying "제 취미는 음악을 들어요."',
        ru: 'Когда хобби определяется именно как занятие, конструкция "제 취미는 음악을 듣는 것이에요" грамматически точнее.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '제 취미는 음악을 ___ 것이에요.',
          uz: 'To‘g‘ri shaklni tanlang: 제 취미는 음악을 ___ 것이에요.',
          en: 'Choose the correct form: 제 취미는 음악을 ___ 것이에요.',
          ru: 'Выберите правильную форму: 제 취미는 음악을 ___ 것이에요.',
        },
        options: [
          { text: '듣는', correct: true },
          { text: '들은', correct: false },
          { text: '들을', correct: false },
          { text: '듣고', correct: false },
          { text: '듣지', correct: false },
        ],
      },
      {
        question: {
          ko: '저는 사진을 ___ 것을 좋아해요.',
          uz: 'To‘g‘ri shaklni tanlang: 저는 사진을 ___ 것을 좋아해요.',
          en: 'Choose the correct form: 저는 사진을 ___ 것을 좋아해요.',
          ru: 'Выберите правильную форму: 저는 사진을 ___ 것을 좋아해요.',
        },
        options: [
          { text: '찍는', correct: true },
          { text: '찍은', correct: false },
          { text: '찍을', correct: false },
          { text: '찍고', correct: false },
          { text: '찍지', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다"의 현재 행동을 명사처럼 만들면 무엇이에요?',
          uz: '"살다" fe’lini "yashash" ma’nosida otlashtiring.',
          en: 'Which form means "living" from 살다?',
          ru: 'Какая форма от 살다 означает «жить / проживание»?',
        },
        options: [
          { text: '사는 것', correct: true },
          { text: '살는 것', correct: false },
          { text: '살은 것', correct: false },
          { text: '살을 것', correct: false },
          { text: '살고 것', correct: false },
        ],
      },
      {
        question: {
          ko: '한국 드라마를 ___ 것이 재미있어요.',
          uz: 'To‘g‘ri shaklni tanlang: 한국 드라마를 ___ 것이 재미있어요.',
          en: 'Choose the correct form: 한국 드라마를 ___ 것이 재미있어요.',
          ru: 'Выберите правильную форму: 한국 드라마를 ___ 것이 재미있어요.',
        },
        options: [
          { text: '보는', correct: true },
          { text: '본', correct: false },
          { text: '볼', correct: false },
          { text: '보고', correct: false },
          { text: '보지', correct: false },
        ],
      },
      {
        question: {
          ko: '저는 새로운 음식을 ___ 것을 좋아해요.',
          uz: 'To‘g‘ri shaklni tanlang: 저는 새로운 음식을 ___ 것을 좋아해요.',
          en: 'Choose the correct form: 저는 새로운 음식을 ___ 것을 좋아해요.',
          ru: 'Выберите правильную форму: 저는 새로운 음식을 ___ 것을 좋아해요.',
        },
        options: [
          { text: '만드는', correct: true },
          { text: '만들는', correct: false },
          { text: '만든', correct: false },
          { text: '만들', correct: false },
          { text: '만들고', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 2-2. V-(으)ㄹ 줄 알다[모르다]
  // ─────────────────────────────────────────────
  {
    code: 'verb-eul-jul-alda',
    pattern: 'V-(으)ㄹ 줄 알다[모르다]',
    section: 3,
    unit: 2,
    order: 2,
    isActive: true,

    summary: {
      ko: '어떤 행동을 하는 방법이나 기술을 알고 있는지, 또는 모르는지를 나타내요. "할 수 있는 능력을 배워서 알고 있다"라는 느낌이 강해요.',
      uz: 'Biror ishni qanday qilishni bilish yoki bilmaslikni bildiradi. Odatda o‘rganilgan ko‘nikma yoki mahorat haqida gapiriladi.',
      en: 'Expresses knowing or not knowing how to perform an action. It is commonly used for learned skills and abilities.',
      ru: 'Выражает умение или неумение выполнять действие, особенно приобретённый навык.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '능력',
        uz: 'Qobiliyat',
        en: 'Ability',
        ru: 'Умение',
      },
      {
        ko: '기술',
        uz: 'Ko‘nikma',
        en: 'Skill',
        ru: 'Навык',
      },
    ],

    explanation: {
      ko: '"V-(으)ㄹ 줄 알다/모르다"는 어떤 행동을 하는 방법을 알고 있는지 또는 모르는지 말할 때 사용하는 표현이에요. 여기서 "줄"은 "방법, 능력"과 비슷한 의미로 이해하면 쉬워요. 그래서 "수영할 줄 알아요"는 단순히 수영할 가능성이 있다는 말보다 "수영하는 방법을 배워서 알고 있어요"라는 뜻에 가까워요.\n\n받침이 없는 동사에는 "-ㄹ 줄 알다"를 사용해요. "가다 → 갈 줄 알아요", "타다 → 탈 줄 알아요", "하다 → 할 줄 알아요"처럼 만들어요. 받침이 있는 동사에는 "-을 줄 알다"를 붙여서 "먹다 → 먹을 줄 알아요", "읽다 → 읽을 줄 알아요", "찍다 → 찍을 줄 알아요"가 돼요.\n\nㄹ 받침으로 끝나는 동사는 이미 ㄹ이 있기 때문에 새로운 ㄹ을 하나 더 붙이지 않아요. "만들다 → 만들 줄 알아요", "놀다 → 놀 줄 알아요"처럼 사용해요.\n\n방법을 알면 "알다", 방법을 모르면 "모르다"를 사용해요. 따라서 "저는 기타를 칠 줄 알아요"는 기타를 연주할 수 있는 기술이 있다는 뜻이고, "저는 기타를 칠 줄 몰라요"는 기타 연주 방법을 모른다는 뜻이에요.\n\n이 표현은 단순한 상황적 가능성을 나타내는 "-(으)ㄹ 수 있다"와 차이가 있어요. 예를 들어 "오늘 수영할 수 있어요"는 오늘 시간이나 상황이 허락해서 수영할 수 있다는 뜻도 될 수 있어요. 하지만 "수영할 줄 알아요"는 수영이라는 기술 자체를 알고 있다는 뜻이에요.\n\n그래서 운전, 수영, 악기 연주, 요리, 컴퓨터 사용, 외국어 읽기처럼 배우거나 연습해서 얻는 능력에 특히 자주 사용해요.',
      uz: '"V-(으)ㄹ 줄 알다/모르다" biror ishni qanday qilishni bilish yoki bilmaslikni bildiradi. Bu yerda "줄" ni "usul" yoki "ko‘nikma" deb tushunish mumkin. Masalan, "수영할 줄 알아요" shunchaki imkoniyat emas, suzishni o‘rganib, qanday suzishni bilishni anglatadi.\n\n받침 bo‘lmagan fe’lga "-ㄹ 줄 알다": 가다 → 갈 줄 알다, 타다 → 탈 줄 알다, 하다 → 할 줄 알다. 받침 bo‘lsa "-을 줄 알다": 먹다 → 먹을 줄 알다, 읽다 → 읽을 줄 알다.\n\nㄹ bilan tugagan fe’llarda qo‘shimcha ㄹ qo‘shilmaydi: 만들다 → 만들 줄 알다.\n\nKo‘nikmani bilsangiz "알다", bilmasangiz "모르다" ishlatiladi. Bu shakl suzish, haydash, musiqa asbobi chalish, ovqat tayyorlash kabi o‘rganilgan ko‘nikmalar bilan juda ko‘p ishlatiladi.',
      en: '"V-(으)ㄹ 줄 알다/모르다" describes whether someone knows how to perform an action. 줄 can be understood here as a "way" or "skill." Thus, "수영할 줄 알아요" does not merely mean that swimming is possible; it means that the person has learned how to swim.\n\nAfter a vowel-ending stem, use "-ㄹ 줄 알다": 가다 → 갈 줄 알다, 타다 → 탈 줄 알다, 하다 → 할 줄 알다. After most consonant-ending stems, use "-을 줄 알다": 먹다 → 먹을 줄 알다, 읽다 → 읽을 줄 알다.\n\nWhen the stem already ends in ㄹ, do not add another ㄹ: 만들다 → 만들 줄 알다.\n\nUse 알다 when the skill is known and 모르다 when it is not: 기타를 칠 줄 알아요 / 기타를 칠 줄 몰라요.\n\nThis differs from "-(으)ㄹ 수 있다." 수 있다 can describe general possibility or circumstances, whereas 줄 알다 specifically emphasizes knowing how to do something.',
      ru: '"V-(으)ㄹ 줄 알다/모르다" показывает, умеет ли человек выполнять определённое действие. 줄 здесь можно понимать как «способ, умение». Поэтому "수영할 줄 알아요" означает, что человек научился плавать и знает, как это делать.\n\nПосле основы без конечного согласного используется "-ㄹ 줄 알다": 가다 → 갈 줄 알다, 타다 → 탈 줄 알다, 하다 → 할 줄 알다. После большинства основ с конечным согласным — "-을 줄 알다": 먹다 → 먹을 줄 알다, 읽다 → 읽을 줄 알다.\n\nЕсли основа уже заканчивается на ㄹ, второй ㄹ не добавляется: 만들다 → 만들 줄 알다.\n\nС 알다 конструкция означает умение, с 모르다 — неумение. Особенно часто она употребляется с приобретёнными навыками: плаванием, вождением, игрой на музыкальных инструментах и т. п.',
    },

    conjugationRule: {
      ko: '받침 X + ㄹ 줄 알다  ·  받침 O + 을 줄 알다  ·  ㄹ 받침 + 줄 알다  ·  모르다를 쓰면 "할 줄 모른다"',
      uz: '받침 yo‘q + ㄹ 줄 알다  ·  받침 bor + 을 줄 알다  ·  ㄹ + 줄 알다',
      en: 'vowel + ㄹ 줄 알다  ·  consonant + 을 줄 알다  ·  ㄹ-final + 줄 알다',
      ru: 'гласная + ㄹ 줄 알다  ·  согласная + 을 줄 알다  ·  основа на ㄹ + 줄 알다',
    },

    conjugations: [
      // 받침 O — 5
      { base: '먹다', result: '먹을 줄 알다' },
      { base: '읽다', result: '읽을 줄 알다' },
      { base: '찍다', result: '찍을 줄 알다' },
      { base: '찾다', result: '찾을 줄 알다' },
      { base: '입다', result: '입을 줄 알다' },

      // 받침 X — 5
      { base: '가다', result: '갈 줄 알다' },
      { base: '타다', result: '탈 줄 알다' },
      { base: '보다', result: '볼 줄 알다' },
      { base: '치다', result: '칠 줄 알다' },
      { base: '하다', result: '할 줄 알다' },

      // ㄹ 받침
      { base: '만들다', result: '만들 줄 알다' },
      { base: '놀다', result: '놀 줄 알다' },
    ],

    examples: [
      {
        ko: '저는 수영할 줄 알아요.',
        highlight: '수영할 줄 알아요',
        gloss: {
          ko: '저는 수영할 줄 알아요.',
          uz: 'Men suzishni bilaman.',
          en: 'I know how to swim.',
          ru: 'Я умею плавать.',
        },
      },
      {
        ko: '민수 씨는 기타를 칠 줄 알아요.',
        highlight: '기타를 칠 줄 알아요',
        gloss: {
          ko: '민수 씨는 기타를 칠 줄 알아요.',
          uz: 'Minsu gitara chalishni biladi.',
          en: 'Minsu knows how to play the guitar.',
          ru: 'Минсу умеет играть на гитаре.',
        },
      },
      {
        ko: '저는 운전할 줄 몰라요.',
        highlight: '운전할 줄 몰라요',
        gloss: {
          ko: '저는 운전할 줄 몰라요.',
          uz: 'Men mashina haydashni bilmayman.',
          en: 'I do not know how to drive.',
          ru: 'Я не умею водить машину.',
        },
      },
      {
        ko: '제 동생은 자전거를 탈 줄 알아요.',
        highlight: '자전거를 탈 줄 알아요',
        gloss: {
          ko: '제 동생은 자전거를 탈 줄 알아요.',
          uz: 'Ukam yoki singlim velosiped minishni biladi.',
          en: 'My younger sibling knows how to ride a bicycle.',
          ru: 'Мой младший брат или сестра умеет кататься на велосипеде.',
        },
      },
      {
        ko: '한글을 읽을 줄 알아요?',
        highlight: '읽을 줄 알아요',
        gloss: {
          ko: '한글을 읽을 줄 알아요?',
          uz: 'Hangulni o‘qishni bilasizmi?',
          en: 'Do you know how to read Hangul?',
          ru: 'Вы умеете читать хангыль?',
        },
      },
      {
        ko: '저는 한국 음식을 만들 줄 알아요.',
        highlight: '만들 줄 알아요',
        gloss: {
          ko: '저는 한국 음식을 만들 줄 알아요.',
          uz: 'Men koreys taomlarini tayyorlashni bilaman.',
          en: 'I know how to make Korean food.',
          ru: 'Я умею готовить корейскую еду.',
        },
      },
      {
        ko: '아직 스키를 탈 줄 몰라요.',
        highlight: '스키를 탈 줄 몰라요',
        gloss: {
          ko: '아직 스키를 탈 줄 몰라요.',
          uz: 'Men hali chang‘ida uchishni bilmayman.',
          en: 'I still do not know how to ski.',
          ru: 'Я пока не умею кататься на лыжах.',
        },
      },
      {
        ko: '우리 할머니는 스마트폰으로 사진을 보낼 줄 알아요.',
        highlight: '사진을 보낼 줄 알아요',
        gloss: {
          ko: '우리 할머니는 스마트폰으로 사진을 보낼 줄 알아요.',
          uz: 'Buvim smartfonda surat yuborishni biladi.',
          en: 'My grandmother knows how to send photos on a smartphone.',
          ru: 'Моя бабушка умеет отправлять фотографии со смартфона.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '기타를 칠 줄 알아요?',
        highlight: '칠 줄 알아요',
        gloss: {
          ko: '기타를 칠 줄 알아요?',
          uz: 'Gitara chalishni bilasizmi?',
          en: 'Do you know how to play the guitar?',
          ru: 'Вы умеете играть на гитаре?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 조금 칠 줄 알아요.',
        highlight: '칠 줄 알아요',
        gloss: {
          ko: '네, 조금 칠 줄 알아요.',
          uz: 'Ha, biroz chalishni bilaman.',
          en: 'Yes, I can play a little.',
          ru: 'Да, я немного умею играть.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '피아노도 칠 줄 알아요?',
        highlight: '칠 줄 알아요',
        gloss: {
          ko: '피아노도 칠 줄 알아요?',
          uz: 'Pianino chalishni ham bilasizmi?',
          en: 'Do you know how to play the piano too?',
          ru: 'А на пианино вы тоже умеете играть?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아니요. 피아노는 칠 줄 몰라요.',
        highlight: '칠 줄 몰라요',
        gloss: {
          ko: '아니요. 피아노는 칠 줄 몰라요.',
          uz: 'Yo‘q, pianino chalishni bilmayman.',
          en: 'No. I do not know how to play the piano.',
          ru: 'Нет. Я не умею играть на пианино.',
        },
      },
    ],

    similar: {
      pattern: 'V-(으)ㄹ 수 있다/없다',
      note: {
        ko: '"-(으)ㄹ 줄 알다"는 배워서 방법을 알고 있는 능력을 강조해요. "-(으)ㄹ 수 있다"는 기술뿐 아니라 시간, 상황, 조건 때문에 가능한지 불가능한지도 말할 수 있어요.',
        uz: '"-(으)ㄹ 줄 알다" o‘rganilgan ko‘nikmani, "-(으)ㄹ 수 있다" esa umumiy imkoniyat yoki sharoitni ham bildiradi.',
        en: '"-(으)ㄹ 줄 알다" emphasizes knowing how to do something, while "-(으)ㄹ 수 있다" can also express possibility based on circumstances.',
        ru: '"-(으)ㄹ 줄 알다" подчёркивает приобретённое умение, а "-(으)ㄹ 수 있다" может также обозначать возможность в конкретной ситуации.',
      },
    },

    cautions: [
      {
        ko: '받침 있는 동사에 "-ㄹ 줄"만 붙이지 않아요. "읽ㄹ 줄 알아요"가 아니라 "읽을 줄 알아요"예요.',
        uz: '받침 bilan tugagan fe’lga "-을 줄" kerak: "읽을 줄 알아요".',
        en: 'After most consonant-ending stems, use 을 줄: 읽을 줄 알아요.',
        ru: 'После основы с согласным используется 을 줄: 읽을 줄 알아요.',
      },
      {
        ko: 'ㄹ 받침에 ㄹ을 하나 더 붙이지 않아요. "만들ㄹ 줄"이 아니라 "만들 줄 알아요"예요.',
        uz: 'ㄹ bilan tugagan fe’lga yana ㄹ qo‘shilmaydi: 만들 줄 알아요.',
        en: 'Do not add another ㄹ after an ㄹ-final stem: 만들 줄 알아요.',
        ru: 'После основы на ㄹ второй ㄹ не добавляется: 만들 줄 알아요.',
      },
      {
        ko: '"운전할 줄 몰라요"는 운전하는 방법을 모른다는 뜻이에요. 오늘 차가 없어서 운전할 수 없는 상황을 말하고 싶다면 "-(으)ㄹ 수 없다"가 더 알맞아요.',
        uz: '"운전할 줄 몰라요" haydashni bilmaslikni bildiradi. Faqat vaziyat sababli hayday olmaslik uchun "-(으)ㄹ 수 없다" ishlatiladi.',
        en: '"운전할 줄 몰라요" means you do not know how to drive. If circumstances merely prevent you from driving today, "-(으)ㄹ 수 없다" is more appropriate.',
        ru: '"운전할 줄 몰라요" означает, что человек не умеет водить. Если сегодня водить невозможно только из-за обстоятельств, лучше использовать "-(으)ㄹ 수 없다".',
      },
    ],

    quiz: [
      {
        question: {
          ko: '저는 수영___ 알아요.',
          uz: 'To‘g‘ri shaklni tanlang: 저는 수영___ 알아요.',
          en: 'Choose the correct form: 저는 수영___ 알아요.',
          ru: 'Выберите правильную форму: 저는 수영___ 알아요.',
        },
        options: [
          { text: '할 줄', correct: true },
          { text: '하을 줄', correct: false },
          { text: '하는 줄', correct: false },
          { text: '한 줄', correct: false },
          { text: '하지 줄', correct: false },
        ],
      },
      {
        question: {
          ko: '한글을 읽___ 알아요?',
          uz: 'To‘g‘ri shaklni tanlang: 한글을 읽___ 알아요?',
          en: 'Choose the correct form: 한글을 읽___ 알아요?',
          ru: 'Выберите правильную форму: 한글을 읽___ 알아요?',
        },
        options: [
          { text: '을 줄', correct: true },
          { text: 'ㄹ 줄', correct: false },
          { text: '는 줄', correct: false },
          { text: '은 줄', correct: false },
          { text: '고 줄', correct: false },
        ],
      },
      {
        question: {
          ko: '저는 운전할 줄 ___. 운전을 배운 적이 없어요.',
          uz: 'Men mashina haydashni bilmayman: 저는 운전할 줄 ___.',
          en: 'Complete "I do not know how to drive": 저는 운전할 줄 ___.',
          ru: 'Дополните «Я не умею водить»: 저는 운전할 줄 ___.',
        },
        options: [
          { text: '몰라요', correct: true },
          { text: '알아요', correct: false },
          { text: '좋아요', correct: false },
          { text: '있어요', correct: false },
          { text: '많아요', correct: false },
        ],
      },
      {
        question: {
          ko: '"만들다"의 올바른 형태는 무엇이에요?',
          uz: '"만들다" uchun to‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form of 만들다.',
          ru: 'Выберите правильную форму от 만들다.',
        },
        options: [
          { text: '만들 줄 알아요', correct: true },
          { text: '만들ㄹ 줄 알아요', correct: false },
          { text: '만들을 줄 알아요', correct: false },
          { text: '만드는 줄 알아요', correct: false },
          { text: '만든 줄 알아요', correct: false },
        ],
      },
      {
        question: {
          ko: '제 동생은 자전거를 ___ 줄 알아요.',
          uz: 'To‘g‘ri shaklni tanlang: 제 동생은 자전거를 ___ 줄 알아요.',
          en: 'Choose the correct form: 제 동생은 자전거를 ___ 줄 알아요.',
          ru: 'Выберите правильную форму: 제 동생은 자전거를 ___ 줄 알아요.',
        },
        options: [
          { text: '탈', correct: true },
          { text: '타을', correct: false },
          { text: '타는', correct: false },
          { text: '탄', correct: false },
          { text: '타고', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 2-3. V-(으)ㄴ N
  // ─────────────────────────────────────────────
  {
    code: 'verb-eun-noun',
    pattern: 'V-(으)ㄴ N',
    section: 3,
    unit: 2,
    order: 3,
    isActive: true,

    summary: {
      ko: '이미 끝난 행동을 뒤의 명사 앞에 붙여서 "어떤 명사인지" 설명할 때 사용해요. 한국어에서는 영어의 관계절처럼 별도의 관계대명사를 쓰지 않고 동사를 바로 명사 앞에 놓아요.',
      uz: 'Tugallangan harakat bilan keyingi otni tavsiflash uchun ishlatiladi. Koreys tilida alohida "which/who" so‘zi ishlatilmaydi, fe’l shakli bevosita ot oldidan keladi.',
      en: 'Uses a completed action to describe a following noun. Korean places the modified verb directly before the noun rather than using a separate relative pronoun.',
      ru: 'Используется, чтобы описать существительное уже завершённым действием. В корейском языке глагольная форма ставится прямо перед существительным.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '관형형',
        uz: 'Aniqlovchi shakl',
        en: 'Noun modifier',
        ru: 'Определительная форма',
      },
      {
        ko: '과거',
        uz: 'O‘tgan zamon',
        en: 'Past',
        ru: 'Прошедшее время',
      },
    ],

    explanation: {
      ko: '"V-(으)ㄴ N"은 이미 일어난 행동이나 끝난 행동을 이용해서 뒤에 오는 명사를 설명할 때 사용하는 표현이에요. 한국어에서는 "어제 봤어요 + 영화"를 따로 말하지 않고 "어제 본 영화"라고 한 덩어리로 만들 수 있어요. 즉 "어제 본 영화"는 "어제 내가 본 영화", 영어로는 "the movie that I watched yesterday"라는 뜻이에요.\n\n받침이 있는 동사에는 보통 "-은"을 붙여요. "먹다 → 먹은 음식", "읽다 → 읽은 책", "찍다 → 찍은 사진"처럼 사용해요.\n\n받침이 없는 동사에는 "-ㄴ"이 붙어요. 이 ㄴ은 앞 음절의 받침 자리에 들어가서 "가다 → 간 곳", "보다 → 본 영화", "배우다 → 배운 문법", "하다 → 한 일"처럼 형태가 바뀌어요.\n\nㄹ 받침 동사는 ㄹ이 없어지고 ㄴ이 들어가요. "만들다 → 만든 음식", "살다 → 산 집", "놀다 → 논 곳"처럼 활용해요. 학습자들이 특히 많이 틀리는 부분이라 형태를 통째로 익히는 것이 좋아요.\n\n이 표현에서 중요한 것은 시간 관계예요. 뒤에 있는 명사를 기준으로 그 행동이 이미 완료된 경우에 "-(으)ㄴ"을 사용해요. "지금 읽는 책"은 현재 읽고 있는 책이고, "어제 읽은 책"은 이미 읽은 책이에요. 따라서 "-는 N"과 "-(으)ㄴ N"을 구별하면 한국어 문장을 훨씬 자연스럽고 자세하게 만들 수 있어요.\n\n취미와 관련해서도 매우 유용해요. "제가 찍은 사진", "어제 만든 그림", "지난주에 본 공연", "친구가 추천한 책"처럼 자신의 경험이나 결과물을 소개할 수 있어요.',
      uz: '"V-(으)ㄴ N" tugallangan harakat yordamida undan keyingi otni tushuntiradi. Masalan, "어제 본 영화" — "kecha ko‘rgan film" degani.\n\n받침 bilan tugagan fe’lga odatda "-은" qo‘shiladi: 먹다 → 먹은 음식, 읽다 → 읽은 책, 찍다 → 찍은 사진.\n\n받침 bo‘lmasa "-ㄴ" qo‘shiladi: 가다 → 간 곳, 보다 → 본 영화, 배우다 → 배운 문법, 하다 → 한 일.\n\nㄹ bilan tugagan fe’llarda ㄹ tushib, uning o‘rniga ㄴ keladi: 만들다 → 만든 음식, 살다 → 산 집.\n\nBu shakl odatda keyingi otga nisbatan oldin tugallangan harakatni bildiradi. "읽는 책" — hozir o‘qiyotgan kitob, "읽은 책" — o‘qib bo‘lgan kitob.',
      en: '"V-(으)ㄴ N" uses a completed action to describe the noun that follows. For example, "어제 본 영화" means "the movie that I watched yesterday."\n\nAfter most consonant-ending stems, add "-은": 먹다 → 먹은 음식, 읽다 → 읽은 책, 찍다 → 찍은 사진.\n\nAfter vowel-ending stems, add ㄴ to the final syllable: 가다 → 간 곳, 보다 → 본 영화, 배우다 → 배운 문법, 하다 → 한 일.\n\nWith ㄹ-final stems, ㄹ drops and ㄴ takes its place: 만들다 → 만든 음식, 살다 → 산 집.\n\nThe time relationship is important. "-(으)ㄴ N" normally describes an action completed before the relevant reference point. Compare "읽는 책," a book being read now, with "읽은 책," a book that has already been read.',
      ru: '"V-(으)ㄴ N" описывает существительное с помощью уже завершённого действия. Например, "어제 본 영화" означает «фильм, который я посмотрел вчера».\n\nПосле большинства основ с конечным согласным добавляется "-은": 먹다 → 먹은 음식, 읽다 → 읽은 책, 찍다 → 찍은 사진.\n\nПосле основы без конечного согласного добавляется ㄴ: 가다 → 간 곳, 보다 → 본 영화, 배우다 → 배운 문법, 하다 → 한 일.\n\nУ основ на ㄹ этот согласный исчезает и заменяется на ㄴ: 만들다 → 만든 음식, 살다 → 산 집.\n\nВажно различать временное значение: "읽는 책" — книга, которую читают сейчас, а "읽은 책" — книга, которую уже прочитали.',
    },

    conjugationRule: {
      ko: '받침 O + 은 N  ·  받침 X + ㄴ N  ·  ㄹ 받침: ㄹ 탈락 + ㄴ N',
      uz: '받침 bor + 은 N  ·  받침 yo‘q + ㄴ N  ·  ㄹ tushib + ㄴ N',
      en: 'consonant + 은 N  ·  vowel + ㄴ N  ·  final ㄹ drops and becomes ㄴ',
      ru: 'согласная + 은 N  ·  гласная + ㄴ N  ·  конечный ㄹ выпадает, добавляется ㄴ',
    },

    conjugations: [
      // 받침 O — 5
      { base: '먹다', result: '먹은 음식' },
      { base: '읽다', result: '읽은 책' },
      { base: '찍다', result: '찍은 사진' },
      { base: '찾다', result: '찾은 물건' },
      { base: '입다', result: '입은 옷' },

      // 받침 X — 5
      { base: '가다', result: '간 곳' },
      { base: '보다', result: '본 영화' },
      { base: '배우다', result: '배운 문법' },
      { base: '쓰다', result: '쓴 글' },
      { base: '하다', result: '한 일' },

      // ㄹ 받침
      { base: '만들다', result: '만든 음식' },
      { base: '살다', result: '산 집' },
      { base: '놀다', result: '논 곳' },
    ],

    examples: [
      {
        ko: '이것은 제가 어제 찍은 사진이에요.',
        highlight: '어제 찍은 사진',
        gloss: {
          ko: '이것은 제가 어제 찍은 사진이에요.',
          uz: 'Bu men kecha olgan surat.',
          en: 'This is a photo I took yesterday.',
          ru: 'Это фотография, которую я сделал вчера.',
        },
      },
      {
        ko: '지난주에 본 영화가 정말 재미있었어요.',
        highlight: '지난주에 본 영화',
        gloss: {
          ko: '지난주에 본 영화가 정말 재미있었어요.',
          uz: 'O‘tgan hafta ko‘rgan filmim juda qiziq edi.',
          en: 'The movie I watched last week was really interesting.',
          ru: 'Фильм, который я посмотрел на прошлой неделе, был очень интересным.',
        },
      },
      {
        ko: '친구가 추천한 책을 읽고 있어요.',
        highlight: '친구가 추천한 책',
        gloss: {
          ko: '친구가 추천한 책을 읽고 있어요.',
          uz: 'Do‘stim tavsiya qilgan kitobni o‘qiyapman.',
          en: 'I am reading a book my friend recommended.',
          ru: 'Я читаю книгу, которую посоветовал друг.',
        },
      },
      {
        ko: '제가 만든 케이크를 한번 드셔 보세요.',
        highlight: '제가 만든 케이크',
        gloss: {
          ko: '제가 만든 케이크를 한번 드셔 보세요.',
          uz: 'Men tayyorlagan tortdan tatib ko‘ring.',
          en: 'Please try the cake I made.',
          ru: 'Попробуйте торт, который я приготовил.',
        },
      },
      {
        ko: '한국에서 배운 노래를 친구들에게 불러 줬어요.',
        highlight: '한국에서 배운 노래',
        gloss: {
          ko: '한국에서 배운 노래를 친구들에게 불러 줬어요.',
          uz: 'Koreyada o‘rgangan qo‘shig‘imni do‘stlarimga kuylab berdim.',
          en: 'I sang my friends a song I learned in Korea.',
          ru: 'Я спел друзьям песню, которую выучил в Корее.',
        },
      },
      {
        ko: '어제 산 기타가 생각보다 좋아요.',
        highlight: '어제 산 기타',
        gloss: {
          ko: '어제 산 기타가 생각보다 좋아요.',
          uz: 'Kecha sotib olgan gitaram o‘ylaganimdan yaxshiroq.',
          en: 'The guitar I bought yesterday is better than I expected.',
          ru: 'Гитара, которую я купил вчера, оказалась лучше, чем я ожидал.',
        },
      },
      {
        ko: '동아리에서 만난 친구들과 자주 연락해요.',
        highlight: '동아리에서 만난 친구들',
        gloss: {
          ko: '동아리에서 만난 친구들과 자주 연락해요.',
          uz: 'To‘garakda tanishgan do‘stlarim bilan tez-tez gaplashib turaman.',
          en: 'I often keep in touch with friends I met in the club.',
          ru: 'Я часто общаюсь с друзьями, с которыми познакомился в клубе.',
        },
      },
      {
        ko: '지난달에 읽은 책 중에서 이 책이 제일 좋았어요.',
        highlight: '지난달에 읽은 책',
        gloss: {
          ko: '지난달에 읽은 책 중에서 이 책이 제일 좋았어요.',
          uz: 'O‘tgan oy o‘qigan kitoblarim orasida bu kitob eng yaxshi edi.',
          en: 'Of the books I read last month, I liked this one the most.',
          ru: 'Из книг, которые я прочитал в прошлом месяце, эта понравилась мне больше всего.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이 사진 정말 예쁘네요. 누가 찍었어요?',
        highlight: '누가 찍었어요',
        gloss: {
          ko: '이 사진 정말 예쁘네요. 누가 찍었어요?',
          uz: 'Bu surat juda chiroyli ekan. Kim olgan?',
          en: 'This photo is really nice. Who took it?',
          ru: 'Какая красивая фотография. Кто её сделал?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '제가 제주도에서 찍은 사진이에요.',
        highlight: '제주도에서 찍은 사진',
        gloss: {
          ko: '제가 제주도에서 찍은 사진이에요.',
          uz: 'Bu men Jejuda olgan surat.',
          en: 'It is a photo I took on Jeju Island.',
          ru: 'Это фотография, которую я сделал на Чеджудо.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '아, 제주도에서 찍은 사진이군요.',
        highlight: '제주도에서 찍은 사진',
        gloss: {
          ko: '아, 제주도에서 찍은 사진이군요.',
          uz: 'Ha, demak Jejuda olingan surat ekan.',
          en: 'Oh, so it is a photo taken on Jeju.',
          ru: 'А, значит, фотография сделана на Чеджудо.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네. 여행하면서 찍은 사진 중에서 제가 제일 좋아하는 사진이에요.',
        highlight: '여행하면서 찍은 사진',
        gloss: {
          ko: '네. 여행하면서 찍은 사진 중에서 제가 제일 좋아하는 사진이에요.',
          uz: 'Ha. Sayohat paytida olgan suratlarim orasida bu menga eng yoqadigani.',
          en: 'Yes. Of the photos I took while traveling, this is my favorite.',
          ru: 'Да. Из фотографий, которые я сделал во время путешествий, эта моя любимая.',
        },
      },
    ],

    similar: {
      pattern: 'V-는 N',
      note: {
        ko: '"V-는 N"은 현재 진행되거나 반복되는 행동으로 명사를 설명해요. "지금 읽는 책"은 현재 읽고 있는 책이고, "어제 읽은 책"은 이미 읽기가 끝난 책이에요.',
        uz: '"V-는 N" hozirgi yoki odatiy harakatni, "V-(으)ㄴ N" esa tugallangan harakatni bildiradi.',
        en: '"V-는 N" modifies a noun with a current or habitual action, while "V-(으)ㄴ N" normally describes a completed action.',
        ru: '"V-는 N" описывает существительное текущим или регулярным действием, а "V-(으)ㄴ N" — завершённым.',
      },
    },

    cautions: [
      {
        ko: '받침 있는 동사에 "-ㄴ"만 붙이지 않아요. "먹ㄴ 음식"이 아니라 "먹은 음식"이에요.',
        uz: '받침 bilan tugagan fe’lga "-은" qo‘shiladi: 먹은 음식.',
        en: 'After most consonant-ending stems, use 은: 먹은 음식.',
        ru: 'После основы с согласным используется 은: 먹은 음식.',
      },
      {
        ko: '"보다"는 "보은 영화"가 아니라 "본 영화"예요. 받침이 없으면 ㄴ이 앞 음절의 받침으로 들어가요.',
        uz: '"보다" → "본 영화". "보은 영화" deyilmaydi.',
        en: '보다 becomes 본 영화, not 보은 영화.',
        ru: '보다 превращается в 본 영화, а не в 보은 영화.',
      },
      {
        ko: 'ㄹ 받침은 그대로 두지 않아요. "만들은 음식"이 아니라 "만든 음식", "살은 집"이 아니라 "산 집"이에요.',
        uz: 'ㄹ tushadi: 만들다 → 만든, 살다 → 산.',
        en: 'Final ㄹ drops: 만들다 → 만든, 살다 → 산.',
        ru: 'Конечный ㄹ выпадает: 만들다 → 만든, 살다 → 산.',
      },
      {
        ko: '지금 하고 있는 행동이면 과거 관형형을 쓰지 않아요. 지금 읽고 있는 책은 "읽은 책"이 아니라 "읽는 책"이에요.',
        uz: 'Hozir davom etayotgan harakat uchun "-는 N" ishlatiladi: 읽는 책.',
        en: 'For an action happening now, use -는 N: 읽는 책, not 읽은 책.',
        ru: 'Для действия, происходящего сейчас, используется -는 N: 읽는 책.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '이것은 제가 어제 ___ 사진이에요.',
          uz: 'To‘g‘ri shaklni tanlang: 이것은 제가 어제 ___ 사진이에요.',
          en: 'Choose the correct completed modifier: 이것은 제가 어제 ___ 사진이에요.',
          ru: 'Выберите правильную форму: 이것은 제가 어제 ___ 사진이에요.',
        },
        options: [
          { text: '찍은', correct: true },
          { text: '찍는', correct: false },
          { text: '찍을', correct: false },
          { text: '찍고', correct: false },
          { text: '찍지', correct: false },
        ],
      },
      {
        question: {
          ko: '어제 ___ 영화가 재미있었어요.',
          uz: 'Kecha ko‘rgan film: 어제 ___ 영화가 재미있었어요.',
          en: 'Choose the form meaning "the movie I watched yesterday": 어제 ___ 영화가 재미있었어요.',
          ru: 'Выберите форму «фильм, который смотрел вчера»: 어제 ___ 영화가 재미있었어요.',
        },
        options: [
          { text: '본', correct: true },
          { text: '보는', correct: false },
          { text: '볼', correct: false },
          { text: '보은', correct: false },
          { text: '보고', correct: false },
        ],
      },
      {
        question: {
          ko: '친구가 ___ 책을 읽고 있어요.',
          uz: 'Do‘stim tavsiya qilgan kitob: 친구가 ___ 책을 읽고 있어요.',
          en: 'Choose the form meaning "the book my friend recommended": 친구가 ___ 책을 읽고 있어요.',
          ru: 'Выберите форму «книга, которую посоветовал друг»: 친구가 ___ 책을 읽고 있어요.',
        },
        options: [
          { text: '추천한', correct: true },
          { text: '추천하는', correct: false },
          { text: '추천할', correct: false },
          { text: '추천하고', correct: false },
          { text: '추천하지', correct: false },
        ],
      },
      {
        question: {
          ko: '"만들다"의 과거 관형형은 무엇이에요?',
          uz: '"만들다" fe’lining tugallangan aniqlovchi shaklini tanlang.',
          en: 'Choose the completed noun-modifying form of 만들다.',
          ru: 'Выберите прошедшую определительную форму от 만들다.',
        },
        options: [
          { text: '만든', correct: true },
          { text: '만들은', correct: false },
          { text: '만드는', correct: false },
          { text: '만들은', correct: false },
          { text: '만들ㄴ', correct: false },
        ],
      },
      {
        question: {
          ko: '지난달에 ___ 책 중에서 이 책이 제일 좋았어요.',
          uz: 'O‘tgan oy o‘qilgan kitoblar: 지난달에 ___ 책 중에서...',
          en: 'Choose the form meaning "books I read last month": 지난달에 ___ 책 중에서...',
          ru: 'Выберите форму «книги, прочитанные в прошлом месяце»: 지난달에 ___ 책 중에서...',
        },
        options: [
          { text: '읽은', correct: true },
          { text: '읽는', correct: false },
          { text: '읽을', correct: false },
          { text: '읽고', correct: false },
          { text: '읽지', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 2-4. A/V-지 않다
  // ─────────────────────────────────────────────
  {
    code: 'adjective-verb-ji-anta',
    pattern: 'A/V-지 않다',
    section: 3,
    unit: 2,
    order: 4,
    isActive: true,

    summary: {
      ko: '동사나 형용사의 의미를 부정해서 "~하지 않다", "~하지 않는다"라고 말할 때 사용하는 표현이에요. 받침과 관계없이 어간 뒤에 "-지 않다"를 붙여요.',
      uz: 'Fe’l yoki sifatni inkor qilib, "qilmaydi / emas" ma’nosini beradi. 받침 dan qat’i nazar, o‘zakka "-지 않다" qo‘shiladi.',
      en: 'Negates verbs and adjectives with the meaning "do not" or "is not." Attach "-지 않다" to the stem regardless of the final consonant.',
      ru: 'Используется для отрицания глаголов и прилагательных со значением «не делать / не быть». "-지 않다" добавляется к основе независимо от 받침.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '부정',
        uz: 'Inkor',
        en: 'Negation',
        ru: 'Отрицание',
      },
      {
        ko: '서술',
        uz: 'Kesim',
        en: 'Predicate',
        ru: 'Сказуемое',
      },
    ],

    explanation: {
      ko: '"A/V-지 않다"는 동사나 형용사를 부정할 때 사용하는 대표적인 긴 부정 표현이에요. 동사에서는 "그 행동을 하지 않는다", 형용사에서는 "그 상태나 성질이 그렇지 않다"라는 뜻을 나타내요.\n\n형태는 아주 규칙적이에요. 동사나 형용사의 기본형에서 "다"를 빼고 "-지 않다"를 붙이면 돼요. 받침 여부에 따라 형태가 바뀌지 않아요. "가다 → 가지 않다", "먹다 → 먹지 않다", "좋다 → 좋지 않다", "바쁘다 → 바쁘지 않다", "공부하다 → 공부하지 않다"처럼 사용해요.\n\n실제 대화에서는 "않다"를 문장의 시제와 높임에 맞게 활용해요. 현재 해요체는 "-지 않아요", 과거는 "-지 않았어요", 격식체는 "-지 않습니다"가 돼요. 예를 들어 "저는 커피를 마시지 않아요", "어제 운동하지 않았어요", "이 식당은 비싸지 않습니다"처럼 말할 수 있어요.\n\n앞에서 배운 짧은 부정 "안"과 의미가 매우 비슷해요. "저는 커피를 안 마셔요"와 "저는 커피를 마시지 않아요"는 기본적인 의미가 같아요. 하지만 "-지 않다"는 문장이 조금 더 또렷하고 문어적이거나 격식 있는 느낌을 줄 수 있고, 긴 문장에서도 부정되는 부분이 분명해서 자주 사용해요.\n\n취미를 설명할 때도 유용해요. "저는 운동을 자주 하지 않아요", "공포 영화는 좋아하지 않아요", "요즘에는 게임을 많이 하지 않아요"처럼 자신의 습관이나 선호를 부정적으로 설명할 수 있어요.\n\n주의할 점은 "않다" 자체가 문장의 마지막 서술어 역할을 한다는 거예요. 따라서 시제나 존댓말 표현은 앞의 동사가 아니라 "않다"에 붙여요. "먹었지 않아요"가 아니라 "먹지 않았어요"가 자연스러운 형태예요.',
      uz: '"A/V-지 않다" fe’l yoki sifatni inkor qiladigan asosiy uzun inkor shaklidir. Fe’l bilan "qilmaydi", sifat bilan esa "unday emas" ma’nosini beradi.\n\nShakli juda muntazam. Lug‘at shaklidagi "다" ni olib tashlab "-지 않다" qo‘shiladi: 가다 → 가지 않다, 먹다 → 먹지 않다, 좋다 → 좋지 않다, 바쁘다 → 바쁘지 않다, 공부하다 → 공부하지 않다. 받침 shaklga ta’sir qilmaydi.\n\nSuhbatda 않다 zamon va hurmat shakliga ko‘ra tuslanadi: "-지 않아요", "-지 않았어요", "-지 않습니다".\n\nBu shakl "안" bilan o‘xshash. "커피를 안 마셔요" va "커피를 마시지 않아요" asosiy ma’noda bir xil, lekin "-지 않다" ko‘pincha aniqroq yoki rasmiyroq ohang beradi.',
      en: '"A/V-지 않다" is a major long-form negation pattern for verbs and adjectives. With a verb it means that an action is not performed; with an adjective it means that a state or quality does not apply.\n\nFormation is very regular. Remove 다 from the dictionary form and add "-지 않다." Final consonants do not affect the form: 가다 → 가지 않다, 먹다 → 먹지 않다, 좋다 → 좋지 않다, 바쁘다 → 바쁘지 않다, 공부하다 → 공부하지 않다.\n\nIn actual sentences, 않다 carries tense and speech level: "-지 않아요" in polite present tense, "-지 않았어요" in the past, and "-지 않습니다" in formal speech.\n\nIt is similar in meaning to the short negation 안. "커피를 안 마셔요" and "커피를 마시지 않아요" basically mean the same thing, though -지 않다 can sound more explicit, deliberate, or formal.\n\nAn important point is that tense normally attaches to 않다. Therefore, "먹지 않았어요" is the standard past negative form rather than "먹었지 않아요."',
      ru: '"A/V-지 않다" — основная развёрнутая отрицательная конструкция для глаголов и прилагательных. С глаголом она означает, что действие не совершается, а с прилагательным — что состояние или качество отсутствует.\n\nОбразование очень регулярное: от словарной формы убирается 다 и добавляется "-지 않다". Наличие 받침 не влияет: 가다 → 가지 않다, 먹다 → 먹지 않다, 좋다 → 좋지 않다, 바쁘다 → 바쁘지 않다, 공부하다 → 공부하지 않다.\n\nВ предложении именно 않다 изменяется по времени и стилю речи: "-지 않아요", "-지 않았어요", "-지 않습니다".\n\nПо значению конструкция близка к краткому отрицанию 안. "커피를 안 마셔요" и "커피를 마시지 않아요" имеют почти одинаковое значение, однако "-지 않다" может звучать более явно или формально.\n\nДля прошедшего отрицания время обычно выражается на 않다: правильно "먹지 않았어요".',
    },

    conjugationRule: {
      ko: 'A/V 어간 + 지 않다  ·  현재: -지 않아요  ·  과거: -지 않았어요  ·  격식: -지 않습니다',
      uz: 'A/V o‘zagi + 지 않다  ·  hozirgi: -지 않아요  ·  o‘tgan: -지 않았어요',
      en: 'A/V stem + 지 않다  ·  present: -지 않아요  ·  past: -지 않았어요  ·  formal: -지 않습니다',
      ru: 'основа A/V + 지 않다  ·  настоящее: -지 않아요  ·  прошедшее: -지 않았어요  ·  формальное: -지 않습니다',
    },

    conjugations: [
      { base: '가다', result: '가지 않다' },
      { base: '먹다', result: '먹지 않다' },
      { base: '마시다', result: '마시지 않다' },
      { base: '운동하다', result: '운동하지 않다' },
      { base: '공부하다', result: '공부하지 않다' },
      { base: '좋다', result: '좋지 않다' },
      { base: '비싸다', result: '비싸지 않다' },
      { base: '어렵다', result: '어렵지 않다' },
      { base: '바쁘다', result: '바쁘지 않다' },
      { base: '재미있다', result: '재미있지 않다' },
    ],

    examples: [
      {
        ko: '저는 커피를 자주 마시지 않아요.',
        highlight: '마시지 않아요',
        gloss: {
          ko: '저는 커피를 자주 마시지 않아요.',
          uz: 'Men qahvani tez-tez ichmayman.',
          en: 'I do not drink coffee very often.',
          ru: 'Я нечасто пью кофе.',
        },
      },
      {
        ko: '요즘에는 게임을 많이 하지 않아요.',
        highlight: '하지 않아요',
        gloss: {
          ko: '요즘에는 게임을 많이 하지 않아요.',
          uz: 'Hozirgi paytda ko‘p o‘yin o‘ynamayman.',
          en: 'These days, I do not play games very much.',
          ru: 'В последнее время я мало играю в игры.',
        },
      },
      {
        ko: '저는 공포 영화를 좋아하지 않아요.',
        highlight: '좋아하지 않아요',
        gloss: {
          ko: '저는 공포 영화를 좋아하지 않아요.',
          uz: 'Men qo‘rqinchli filmlarni yoqtirmayman.',
          en: 'I do not like horror movies.',
          ru: 'Я не люблю фильмы ужасов.',
        },
      },
      {
        ko: '이 운동은 생각보다 어렵지 않아요.',
        highlight: '어렵지 않아요',
        gloss: {
          ko: '이 운동은 생각보다 어렵지 않아요.',
          uz: 'Bu mashq o‘ylaganimdek qiyin emas.',
          en: 'This exercise is not as difficult as I expected.',
          ru: 'Это упражнение не такое трудное, как я думал.',
        },
      },
      {
        ko: '우리 동아리는 사람이 많지 않아요.',
        highlight: '많지 않아요',
        gloss: {
          ko: '우리 동아리는 사람이 많지 않아요.',
          uz: 'Bizning to‘garakda odamlar ko‘p emas.',
          en: 'Our club does not have many members.',
          ru: 'В нашем клубе не очень много людей.',
        },
      },
      {
        ko: '지난 주말에는 밖에 나가지 않았어요.',
        highlight: '나가지 않았어요',
        gloss: {
          ko: '지난 주말에는 밖에 나가지 않았어요.',
          uz: 'O‘tgan dam olish kunlari tashqariga chiqmadim.',
          en: 'I did not go out last weekend.',
          ru: 'В прошлые выходные я не выходил из дома.',
        },
      },
      {
        ko: '시간이 없어서 어제는 운동하지 않았어요.',
        highlight: '운동하지 않았어요',
        gloss: {
          ko: '시간이 없어서 어제는 운동하지 않았어요.',
          uz: 'Vaqtim bo‘lmagani uchun kecha mashq qilmadim.',
          en: 'I did not exercise yesterday because I did not have time.',
          ru: 'Вчера я не занимался спортом, потому что не было времени.',
        },
      },
      {
        ko: '사진을 잘 찍지는 않지만 사진 찍는 것을 좋아해요.',
        highlight: '잘 찍지는 않지만',
        gloss: {
          ko: '사진을 잘 찍지는 않지만 사진 찍는 것을 좋아해요.',
          uz: 'Men yaxshi suratga olmayman, lekin suratga olishni yaxshi ko‘raman.',
          en: 'I am not very good at taking pictures, but I enjoy photography.',
          ru: 'Я не очень хорошо фотографирую, но люблю фотографировать.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '주말마다 운동해요?',
        highlight: '운동해요',
        gloss: {
          ko: '주말마다 운동해요?',
          uz: 'Har dam olish kunlari sport bilan shug‘ullanasizmi?',
          en: 'Do you exercise every weekend?',
          ru: 'Вы занимаетесь спортом каждые выходные?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아니요. 주말마다 운동하지는 않아요.',
        highlight: '운동하지는 않아요',
        gloss: {
          ko: '아니요. 주말마다 운동하지는 않아요.',
          uz: 'Yo‘q, har dam olish kuni mashq qilmayman.',
          en: 'No. I do not exercise every weekend.',
          ru: 'Нет, я занимаюсь спортом не каждые выходные.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '그럼 집에 많이 있어요?',
        highlight: '집에 많이 있어요',
        gloss: {
          ko: '그럼 집에 많이 있어요?',
          uz: 'Unda ko‘p vaqt uyda bo‘lasizmi?',
          en: 'Then do you stay home a lot?',
          ru: 'Тогда вы часто бываете дома?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네. 요즘에는 약속이 많지 않아서 집에서 쉬어요.',
        highlight: '많지 않아서',
        gloss: {
          ko: '네. 요즘에는 약속이 많지 않아서 집에서 쉬어요.',
          uz: 'Ha. Hozir uchrashuvlarim ko‘p emas, shuning uchun uyda dam olaman.',
          en: 'Yes. I do not have many plans these days, so I relax at home.',
          ru: 'Да. В последнее время у меня немного встреч, поэтому я отдыхаю дома.',
        },
      },
    ],

    similar: {
      pattern: '안 A/V',
      note: {
        ko: '"안"과 "-지 않다"는 기본적인 부정 의미가 비슷해요. "안 가요"와 "가지 않아요"는 둘 다 "가지 않는다"는 뜻이에요. "안"은 회화에서 짧고 편하게 많이 쓰고, "-지 않다"는 부정을 조금 더 분명하게 표현하거나 긴 문장과 격식 있는 상황에서 자주 사용해요.',
        uz: '"안" va "-지 않다" ma’noda o‘xshash. "안 가요" va "가지 않아요" ikkalasi ham "bormayman" degani. "-지 않다" ko‘proq aniq yoki rasmiy bo‘lishi mumkin.',
        en: '"안" and "-지 않다" have similar basic negative meanings. 안 is short and very common in conversation, while -지 않다 can sound more explicit and works naturally in longer or more formal sentences.',
        ru: '"안" и "-지 않다" имеют похожее отрицательное значение. 안 короче и чаще встречается в разговоре, а "-지 않다" звучит более явно и подходит для более длинных или формальных предложений.',
      },
    },

    cautions: [
      {
        ko: '기본형의 "다"를 남기지 않아요. "먹다지 않아요"가 아니라 "먹지 않아요"예요.',
        uz: '"다" olib tashlanadi: "먹다지 않아요" emas, "먹지 않아요".',
        en: 'Remove 다 before adding 지 않다: 먹지 않아요, not 먹다지 않아요.',
        ru: 'Перед 지 않다 убирается 다: 먹지 않아요, а не 먹다지 않아요.',
      },
      {
        ko: '과거 시제는 보통 "않다"에 붙여요. "먹었지 않아요"가 아니라 "먹지 않았어요"라고 해요.',
        uz: 'O‘tgan zamon odatda 않다 ga qo‘shiladi: 먹지 않았어요.',
        en: 'Past tense normally attaches to 않다: 먹지 않았어요, not 먹었지 않아요.',
        ru: 'Прошедшее время обычно оформляется на 않다: 먹지 않았어요.',
      },
      {
        ko: '"안"과 "-지 않다"를 동시에 겹쳐서 "안 먹지 않아요"라고 하면 이중 부정처럼 들릴 수 있어요. 단순히 먹지 않는다는 뜻이면 "안 먹어요" 또는 "먹지 않아요" 중 하나만 사용해요.',
        uz: '"안" va "-지 않다" ni oddiy inkorda birga ishlatmang. "안 먹어요" yoki "먹지 않아요" dan birini tanlang.',
        en: 'Do not normally combine 안 and -지 않다 for simple negation. Use either 안 먹어요 or 먹지 않아요.',
        ru: 'Для простого отрицания обычно не нужно сочетать 안 и -지 않다. Используйте либо 안 먹어요, либо 먹지 않아요.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '저는 공포 영화를 좋아___ 않아요.',
          uz: 'To‘g‘ri shaklni tanlang: 저는 공포 영화를 좋아___ 않아요.',
          en: 'Choose the correct form: 저는 공포 영화를 좋아___ 않아요.',
          ru: 'Выберите правильную форму: 저는 공포 영화를 좋아___ 않아요.',
        },
        options: [
          { text: '하지', correct: true },
          { text: '하고', correct: false },
          { text: '해서', correct: false },
          { text: '하는', correct: false },
          { text: '한', correct: false },
        ],
      },
      {
        question: {
          ko: '저는 커피를 자주 마시___ 않아요.',
          uz: 'To‘g‘ri shaklni tanlang: 저는 커피를 자주 마시___ 않아요.',
          en: 'Choose the correct form: 저는 커피를 자주 마시___ 않아요.',
          ru: 'Выберите правильную форму: 저는 커피를 자주 마시___ 않아요.',
        },
        options: [
          { text: '지', correct: true },
          { text: '고', correct: false },
          { text: '는', correct: false },
          { text: 'ㄴ', correct: false },
          { text: '려고', correct: false },
        ],
      },
      {
        question: {
          ko: '어제는 운동___ 않았어요.',
          uz: 'Kecha mashq qilmadim: 어제는 운동___ 않았어요.',
          en: 'Complete "I did not exercise yesterday": 어제는 운동___ 않았어요.',
          ru: 'Дополните «Вчера я не занимался спортом»: 어제는 운동___ 않았어요.',
        },
        options: [
          { text: '하지', correct: true },
          { text: '하고', correct: false },
          { text: '해서', correct: false },
          { text: '하는', correct: false },
          { text: '한', correct: false },
        ],
      },
      {
        question: {
          ko: '이 운동은 생각보다 어렵___ 않아요.',
          uz: 'To‘g‘ri shaklni tanlang: 이 운동은 생각보다 어렵___ 않아요.',
          en: 'Choose the correct form: 이 운동은 생각보다 어렵___ 않아요.',
          ru: 'Выберите правильную форму: 이 운동은 생각보다 어렵___ 않아요.',
        },
        options: [
          { text: '지', correct: true },
          { text: '고', correct: false },
          { text: '지만', correct: false },
          { text: '게', correct: false },
          { text: '는', correct: false },
        ],
      },
      {
        question: {
          ko: '"먹다"의 "-지 않다" 형태는 무엇이에요?',
          uz: '"먹다" ning inkor shaklini tanlang.',
          en: 'Choose the -지 않다 form of 먹다.',
          ru: 'Выберите отрицательную форму от 먹다.',
        },
        options: [
          { text: '먹지 않다', correct: true },
          { text: '먹다지 않다', correct: false },
          { text: '먹고 않다', correct: false },
          { text: '먹는 않다', correct: false },
          { text: '먹은 않다', correct: false },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // UNIT 3 — 콘서트에 가 봤어요?
  // 경험 → 기간 → 배경·상황 연결 → 미래/예정 명사 꾸미기
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 3-1. V-아/어 보다
  // ─────────────────────────────────────────────
  {
    code: 'verb-a-eo-boda',
    pattern: 'V-아/어 보다',
    section: 3,
    unit: 3,
    order: 1,
    isActive: true,

    summary: {
      ko: '어떤 행동을 직접 한번 해 보거나 경험해 보는 것을 나타내요. 과거형 "V-아/어 봤어요"는 "~해 본 경험이 있다"라는 뜻으로 아주 자주 사용해요.',
      uz: 'Biror ishni sinab ko‘rish yoki uni bevosita boshdan kechirishni bildiradi. O‘tgan zamondagi "V-아/어 봤어요" shakli biror tajribaga ega ekanini aytishda juda ko‘p ishlatiladi.',
      en: 'Expresses trying or experiencing an action. The past form "V-아/어 봤어요" is especially common for saying that you have had a particular experience.',
      ru: 'Выражает попытку выполнить действие или получение какого-либо опыта. Прошедшая форма "V-아/어 봤어요" особенно часто используется в значении «когда-либо делал».',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '경험',
        uz: 'Tajriba',
        en: 'Experience',
        ru: 'Опыт',
      },
      {
        ko: '시도',
        uz: 'Sinab ko‘rish',
        en: 'Trying',
        ru: 'Попытка',
      },
    ],

    explanation: {
      ko: '"V-아/어 보다"는 어떤 행동을 직접 한번 해 보는 것을 나타내는 표현이에요. 여기에서 "보다"는 원래의 뜻인 "눈으로 보다"가 아니라, 앞의 행동을 실제로 시도하거나 경험한다는 뜻을 더해 줘요.\n\n예를 들어 "김치를 먹어요"는 단순히 김치를 먹는다는 뜻이지만, "김치를 먹어 봐요"라고 하면 "김치를 한번 직접 먹어 보세요"라는 시도의 의미가 생겨요. "한복을 입어 봤어요"는 과거에 한복을 실제로 입어 본 경험이 있다는 뜻이에요.\n\n형태는 앞에서 배운 "-아/어요" 활용과 거의 같아요. 동사 어간의 마지막 모음이 ㅏ나 ㅗ이면 "-아 보다"를 사용하고, 그 밖의 모음이면 "-어 보다"를 사용해요. "가다 → 가 보다", "찾다 → 찾아 보다", "먹다 → 먹어 보다", "읽다 → 읽어 보다"처럼 만들어요. 하다 동사는 "해 보다"가 돼요. 그래서 "요리하다 → 요리해 보다", "운동하다 → 운동해 보다"라고 해요.\n\n실제 회화에서는 과거 경험을 묻고 대답할 때 특히 많이 사용해요. "한국에 가 봤어요?", "한국 음식을 먹어 봤어요?", "콘서트에 가 봤어요?"처럼 상대방에게 경험이 있는지 물어볼 수 있어요. 대답은 "네, 가 봤어요", "아니요, 아직 못 가 봤어요"처럼 할 수 있어요.\n\n현재형이나 명령·제안 형태에서는 "한번 시도해 보세요"라는 뜻이 강해요. "이 음식 한번 먹어 보세요"는 처음 먹는 사람에게 권할 때 자연스럽고, "이 앱을 사용해 보세요"는 직접 사용해 보라고 권하는 표현이에요.\n\n따라서 "-아/어 보다"에는 크게 두 가지 중요한 쓰임이 있어요. 첫째는 새로운 행동을 직접 시도하는 것이고, 둘째는 과거형을 사용해서 어떤 경험을 해 본 적이 있는지를 말하는 것이에요. 이 두 의미는 실제로 서로 연결되어 있어요. 어떤 일을 한번 시도하면 그것이 곧 자신의 경험이 되기 때문이에요.',
      uz: '"V-아/어 보다" biror harakatni bevosita sinab ko‘rishni bildiradi. Bu yerda "보다" oddiy "ko‘rmoq" ma’nosida emas, balki oldingi harakatni amalda qilib ko‘rish ma’nosini beradi.\n\nMasalan, "김치를 먹어요" shunchaki kimchi yeyishni bildiradi. "김치를 먹어 봐요" esa "kimchini bir marta tatib ko‘ring" degan ma’noni beradi. "한복을 입어 봤어요" esa ilgari hanbok kiyib ko‘rgan tajriba borligini anglatadi.\n\nShakl "-아/어요" tuslanishiga o‘xshaydi. Oxirgi unli ㅏ yoki ㅗ bo‘lsa "-아 보다", boshqa hollarda "-어 보다" ishlatiladi. 하다 esa "해 보다" bo‘ladi.\n\nAyniqsa o‘tgan tajribani so‘rashda ko‘p ishlatiladi: "한국에 가 봤어요?", "콘서트에 가 봤어요?" Javob sifatida "네, 가 봤어요" yoki "아니요, 아직 못 가 봤어요" deyish mumkin.',
      en: '"V-아/어 보다" means to actually try or experience an action. In this construction, 보다 does not have its ordinary meaning of "to see." Instead, it adds the meaning of giving the preceding action a try.\n\nFor example, "김치를 먹어요" simply means "I eat kimchi," while "김치를 먹어 봐요" means "Try eating kimchi." "한복을 입어 봤어요" means that the speaker has actually experienced wearing hanbok before.\n\nThe conjugation follows the same basic pattern as -아/어요. Stems whose final vowel is ㅏ or ㅗ generally take -아 보다, while other stems take -어 보다. 하다 becomes 해 보다.\n\nThe past form is especially common when talking about life experiences: "한국에 가 봤어요?" means "Have you ever been to Korea?" A natural answer is "네, 가 봤어요" or "아니요, 아직 못 가 봤어요."\n\nIn non-past forms, the construction often has the sense of trying something new. This gives the grammar two closely related uses: attempting an action and talking about experience gained by having done it.',
      ru: '"V-아/어 보다" означает попробовать выполнить какое-либо действие или получить непосредственный опыт. В этой конструкции 보다 не означает буквально «смотреть», а добавляет значение попытки.\n\nНапример, "김치를 먹어요" просто означает «есть кимчи», а "김치를 먹어 봐요" — «попробуйте кимчи». "한복을 입어 봤어요" означает, что говорящий уже когда-то носил ханбок.\n\nФорма образуется по тем же основным правилам, что и -아/어요. После основы с последней гласной ㅏ или ㅗ обычно используется -아 보다, в остальных случаях — -어 보다. 하다 превращается в 해 보다.\n\nОсобенно часто используется прошедшая форма при разговоре об опыте: "한국에 가 봤어요?" — «Вы когда-нибудь были в Корее?» Ответить можно "네, 가 봤어요" или "아니요, 아직 못 가 봤어요".',
    },

    conjugationRule: {
      ko: 'ㅏ/ㅗ 계열 + 아 보다  ·  그 외 + 어 보다  ·  하다 → 해 보다  ·  경험: -아/어 봤어요',
      uz: 'ㅏ/ㅗ + 아 보다  ·  boshqa unlilar + 어 보다  ·  하다 → 해 보다',
      en: 'ㅏ/ㅗ stem + 아 보다  ·  other vowels + 어 보다  ·  하다 → 해 보다',
      ru: 'основа с ㅏ/ㅗ + 아 보다  ·  остальные + 어 보다  ·  하다 → 해 보다',
    },

    conjugations: [
      { base: '가다', result: '가 보다' },
      { base: '찾다', result: '찾아 보다' },
      { base: '앉다', result: '앉아 보다' },
      { base: '만나다', result: '만나 보다' },
      { base: '사다', result: '사 보다' },

      { base: '먹다', result: '먹어 보다' },
      { base: '읽다', result: '읽어 보다' },
      { base: '입다', result: '입어 보다' },
      { base: '마시다', result: '마셔 보다' },
      { base: '배우다', result: '배워 보다' },

      { base: '공부하다', result: '공부해 보다' },
      { base: '요리하다', result: '요리해 보다' },
    ],

    examples: [
      {
        ko: '한국에 가 봤어요?',
        highlight: '가 봤어요',
        gloss: {
          ko: '한국에 가 봤어요?',
          uz: 'Koreyaga borib ko‘rganmisiz?',
          en: 'Have you ever been to Korea?',
          ru: 'Вы когда-нибудь были в Корее?',
        },
      },
      {
        ko: '저는 콘서트에 세 번 가 봤어요.',
        highlight: '가 봤어요',
        gloss: {
          ko: '저는 콘서트에 세 번 가 봤어요.',
          uz: 'Men konsertga uch marta borib ko‘rganman.',
          en: 'I have been to a concert three times.',
          ru: 'Я три раза был на концерте.',
        },
      },
      {
        ko: '한국 음식을 먹어 봤어요?',
        highlight: '먹어 봤어요',
        gloss: {
          ko: '한국 음식을 먹어 봤어요?',
          uz: 'Koreys taomlarini tatib ko‘rganmisiz?',
          en: 'Have you ever tried Korean food?',
          ru: 'Вы когда-нибудь пробовали корейскую еду?',
        },
      },
      {
        ko: '제주도에서 한복을 입어 봤어요.',
        highlight: '입어 봤어요',
        gloss: {
          ko: '제주도에서 한복을 입어 봤어요.',
          uz: 'Jejuda hanbok kiyib ko‘rdim.',
          en: 'I tried wearing hanbok on Jeju Island.',
          ru: 'На Чеджудо я примерял ханбок.',
        },
      },
      {
        ko: '한국 노래를 노래방에서 불러 봤어요.',
        highlight: '불러 봤어요',
        gloss: {
          ko: '한국 노래를 노래방에서 불러 봤어요.',
          uz: 'Karaokeda koreys qo‘shig‘ini kuylab ko‘rdim.',
          en: 'I tried singing a Korean song at karaoke.',
          ru: 'Я пробовал петь корейскую песню в караоке.',
        },
      },
      {
        ko: '이 책이 재미있어요. 한번 읽어 보세요.',
        highlight: '읽어 보세요',
        gloss: {
          ko: '이 책이 재미있어요. 한번 읽어 보세요.',
          uz: 'Bu kitob qiziqarli. Bir marta o‘qib ko‘ring.',
          en: 'This book is interesting. Try reading it.',
          ru: 'Эта книга интересная. Попробуйте её прочитать.',
        },
      },
      {
        ko: '이 식당의 비빔밥을 한번 먹어 보세요.',
        highlight: '먹어 보세요',
        gloss: {
          ko: '이 식당의 비빔밥을 한번 먹어 보세요.',
          uz: 'Bu restoranning bibimbapini tatib ko‘ring.',
          en: 'Try the bibimbap at this restaurant.',
          ru: 'Попробуйте пибимпап в этом ресторане.',
        },
      },
      {
        ko: '아직 스키를 타 본 적은 없지만 한번 타 보고 싶어요.',
        highlight: '타 보고 싶어요',
        gloss: {
          ko: '아직 스키를 타 본 적은 없지만 한번 타 보고 싶어요.',
          uz: 'Hali chang‘ida uchib ko‘rmaganman, lekin bir marta sinab ko‘rishni istayman.',
          en: 'I have never tried skiing, but I would like to try it.',
          ru: 'Я ещё никогда не катался на лыжах, но хотел бы попробовать.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '콘서트에 가 봤어요?',
        highlight: '가 봤어요',
        gloss: {
          ko: '콘서트에 가 봤어요?',
          uz: 'Konsertga borib ko‘rganmisiz?',
          en: 'Have you ever been to a concert?',
          ru: 'Вы когда-нибудь были на концерте?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 작년에 한 번 가 봤어요.',
        highlight: '가 봤어요',
        gloss: {
          ko: '네, 작년에 한 번 가 봤어요.',
          uz: 'Ha, o‘tgan yili bir marta borganman.',
          en: 'Yes, I went once last year.',
          ru: 'Да, в прошлом году я был один раз.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '어땠어요?',
        highlight: '어땠어요',
        gloss: {
          ko: '어땠어요?',
          uz: 'Qanday edi?',
          en: 'How was it?',
          ru: 'Как вам понравилось?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '정말 재미있었어요. 다음에 꼭 가 보세요.',
        highlight: '가 보세요',
        gloss: {
          ko: '정말 재미있었어요. 다음에 꼭 가 보세요.',
          uz: 'Juda qiziqarli edi. Keyingi safar albatta borib ko‘ring.',
          en: 'It was really fun. You should definitely try going sometime.',
          ru: 'Было очень интересно. Обязательно сходите в следующий раз.',
        },
      },
    ],

    similar: {
      pattern: 'V-(으)ㄴ 적이 있다/없다',
      note: {
        ko: '"V-아/어 봤어요"와 "V-(으)ㄴ 적이 있어요"는 모두 과거 경험을 말할 수 있어요. "-아/어 보다"는 직접 해 본 경험과 시도의 느낌이 강하고, "-(으)ㄴ 적이 있다"는 그런 일이 과거에 있었는지를 조금 더 객관적으로 말해요.',
        uz: 'Ikkalasi ham tajribani bildiradi. "-아/어 보다" bevosita sinab ko‘rish hissini, "-(으)ㄴ 적이 있다" esa o‘tmishda shunday voqea bo‘lganini ta’kidlaydi.',
        en: 'Both can describe past experience. -아/어 보다 emphasizes actually trying or experiencing something, while -(으)ㄴ 적이 있다 more neutrally states that such an experience occurred.',
        ru: 'Обе конструкции могут выражать прошлый опыт. -아/어 보다 сильнее подчёркивает непосредственную попытку, а -(으)ㄴ 적이 있다 — сам факт опыта.',
      },
    },

    cautions: [
      {
        ko: '여기서 "보다"는 눈으로 본다는 뜻이 아니에요. "김치를 먹어 봤어요"는 김치를 눈으로 봤다는 뜻이 아니라 직접 먹어 본 경험이 있다는 뜻이에요.',
        uz: 'Bu yerda 보다 "ko‘z bilan ko‘rish" emas. "먹어 봤어요" — tatib ko‘rganlik tajribasi.',
        en: '보다 does not mean "see" here. 먹어 봤어요 means having tried eating something.',
        ru: '보다 здесь не означает «видеть». 먹어 봤어요 означает «пробовал есть».',
      },
      {
        ko: '"먹 보다"처럼 동사 기본형에 바로 "보다"를 붙이지 않아요. 활용해서 "먹어 보다"라고 해야 해요.',
        uz: '"먹 보다" emas, "먹어 보다" shakli to‘g‘ri.',
        en: 'Do not attach 보다 directly to the bare stem as 먹 보다. Use 먹어 보다.',
        ru: 'Нельзя говорить 먹 보다. Правильно 먹어 보다.',
      },
      {
        ko: '경험을 묻는 질문에서는 과거형이 자연스러워요. "한국에 가 봐요?"보다 "한국에 가 봤어요?"가 과거 경험을 묻는 표현이에요.',
        uz: 'Tajriba haqida so‘rashda odatda o‘tgan zamon: "가 봤어요?"',
        en: 'When asking about prior experience, the past form 가 봤어요? is normally used.',
        ru: 'При вопросе о прошлом опыте обычно используется прошедшая форма 가 봤어요?',
      },
    ],

    quiz: [
      {
        question: {
          ko: '한국에 가___?',
          uz: 'Oldingi tajribani so‘rang: 한국에 가___?',
          en: 'Ask whether someone has ever been to Korea: 한국에 가___?',
          ru: 'Спросите, был ли человек когда-либо в Корее: 한국에 가___?',
        },
        options: [
          { text: '봤어요', correct: true },
          { text: '보세요', correct: false },
          { text: '보고요', correct: false },
          { text: '봅니다', correct: false },
          { text: '보는데', correct: false },
        ],
      },
      {
        question: {
          ko: '한국 음식을 먹___?',
          uz: 'Koreys taomini tatib ko‘rganlik tajribasini so‘rang: 한국 음식을 먹___?',
          en: 'Ask about experience trying Korean food: 한국 음식을 먹___?',
          ru: 'Спросите об опыте корейской еды: 한국 음식을 먹___?',
        },
        options: [
          { text: '어 봤어요', correct: true },
          { text: '아 봤어요', correct: false },
          { text: '고 봤어요', correct: false },
          { text: '지 봤어요', correct: false },
          { text: '는 봤어요', correct: false },
        ],
      },
      {
        question: {
          ko: '이 책이 재미있어요. 한번 읽___ 주세요.',
          uz: 'Sinab ko‘rishni tavsiya qiling: 한번 읽___ 주세요.',
          en: 'Recommend trying the book: 한번 읽___ 주세요.',
          ru: 'Посоветуйте попробовать прочитать: 한번 읽___ 주세요.',
        },
        options: [
          { text: '어 봐', correct: true },
          { text: '아 봐', correct: false },
          { text: '고 봐', correct: false },
          { text: '는 봐', correct: false },
          { text: '지 봐', correct: false },
        ],
      },
      {
        question: {
          ko: '"요리하다"를 "-아/어 보다"로 바르게 바꾸세요.',
          uz: '"요리하다" ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct -아/어 보다 form of 요리하다.',
          ru: 'Выберите правильную форму 요리하다 с -아/어 보다.',
        },
        options: [
          { text: '요리해 보다', correct: true },
          { text: '요리하아 보다', correct: false },
          { text: '요리하어 보다', correct: false },
          { text: '요리하고 보다', correct: false },
          { text: '요리하지 보다', correct: false },
        ],
      },
      {
        question: {
          ko: '제주도에서 한복을 입___어요.',
          uz: 'Hanbok kiyib ko‘rgan tajribani ayting: 한복을 입___어요.',
          en: 'Express having tried wearing hanbok: 한복을 입___어요.',
          ru: 'Скажите, что вы пробовали носить ханбок: 한복을 입___어요.',
        },
        options: [
          { text: '어 봤', correct: true },
          { text: '아 봤', correct: false },
          { text: '고 봤', correct: false },
          { text: '지 봤', correct: false },
          { text: '는 봤', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 3-2. N 동안
  // ─────────────────────────────────────────────
  {
    code: 'noun-dongan',
    pattern: 'N 동안',
    section: 3,
    unit: 3,
    order: 2,
    isActive: true,

    summary: {
      ko: '어떤 행동이나 상태가 계속되는 시간의 길이를 나타내요. "얼마 동안?"이라는 질문에 대답하는 표현이에요.',
      uz: 'Harakat yoki holat qancha vaqt davom etishini bildiradi. "Qancha vaqt davomida?" savoliga javob beradi.',
      en: 'Expresses the length of time during which an action or state continues. It answers the question "for how long?"',
      ru: 'Обозначает период времени, в течение которого продолжается действие или состояние. Отвечает на вопрос «как долго?».',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '기간',
        uz: 'Davr',
        en: 'Duration',
        ru: 'Продолжительность',
      },
      {
        ko: '시간',
        uz: 'Vaqt',
        en: 'Time',
        ru: 'Время',
      },
    ],

    explanation: {
      ko: '"N 동안"은 어떤 행동이나 상태가 일정한 시간 동안 계속된다는 것을 나타낼 때 사용해요. 여기에서 중요한 것은 정확한 시작 시각이나 끝 시각보다 "얼마나 오래 계속되었는가"예요.\n\n예를 들어 "두 시간 동안 공부했어요"라고 하면 공부를 시작한 시각이 몇 시였는지는 중요하지 않고, 공부한 시간이 총 두 시간이었다는 뜻이에요. "한국에서 1년 동안 살았어요"는 한국에서 생활한 기간이 1년이었다는 뜻이고요.\n\n"동안" 앞에는 주로 시간을 나타내는 명사가 와요. "한 시간 동안", "세 달 동안", "일주일 동안", "방학 동안", "주말 동안", "여행 동안"처럼 사용할 수 있어요.\n\n숫자와 시간 단위를 사용할 때는 한국어 수 표현도 함께 주의해야 해요. "한 시간 동안", "두 시간 동안", "세 시간 동안"처럼 고유어 수를 사용하는 경우가 많고, "3개월 동안", "1년 동안"처럼 한자어 수와 함께 쓰는 단위도 있어요.\n\n"N 동안"과 시간 조사 "에"를 구별하는 것도 중요해요. "세 시에 만나요"에서 "에"는 행동이 일어나는 시점을 나타내지만, "세 시간 동안 공부해요"의 "동안"은 행동이 계속되는 시간의 길이를 나타내요. 즉 "세 시"는 언제인지, "세 시간"은 얼마나 오래인지를 말해요.\n\n또 "부터~까지"와도 의미가 달라요. "오후 2시부터 5시까지 공부했어요"는 시작과 끝을 정확하게 말하고, "세 시간 동안 공부했어요"는 전체 기간만 말해요. 두 표현은 상황에 따라 함께 사용할 수도 있어요.',
      uz: '"N 동안" biror harakat yoki holat ma’lum vaqt davomida davom etganini bildiradi. Muhim narsa boshlanish yoki tugash vaqti emas, balki davomiylikdir.\n\nMasalan, "두 시간 동안 공부했어요" — ikki soat davomida o‘qidim degani. "한국에서 1년 동안 살았어요" — Koreyada yashash muddati bir yil bo‘lganini bildiradi.\n\n동안 oldidan vaqtni bildiruvchi otlar ko‘p keladi: 한 시간 동안, 세 달 동안, 일주일 동안, 방학 동안.\n\n"에" va "동안" ni ajratish kerak. "세 시에" aniq vaqt nuqtasini, "세 시간 동안" esa davomiylikni bildiradi. "부터~까지" esa boshlanish va tugash nuqtalarini ko‘rsatadi.',
      en: '"N 동안" indicates that an action or state continues for a certain period of time. The focus is not on the exact starting or ending time, but on how long the situation lasts.\n\n"두 시간 동안 공부했어요" means that the total study time was two hours. "한국에서 1년 동안 살았어요" means that the speaker lived in Korea for a period of one year.\n\n동안 commonly follows time nouns such as 한 시간, 세 달, 일주일, 방학, and 주말.\n\nIt is important to distinguish 동안 from 에. "세 시에" specifies when something happens, while "세 시간 동안" expresses how long it continues. Likewise, 부터~까지 specifies the starting and ending points, whereas 동안 focuses on the total duration.',
      ru: '"N 동안" показывает, что действие или состояние продолжается в течение определённого периода. Главное здесь не точное время начала и конца, а общая продолжительность.\n\n"두 시간 동안 공부했어요" означает, что учёба продолжалась два часа. "한국에서 1년 동안 살았어요" — что человек прожил в Корее один год.\n\nПеред 동안 часто стоят существительные, обозначающие период: 한 시간, 세 달, 일주일, 방학, 주말.\n\nВажно отличать 동안 от 에. "세 시에" указывает момент времени, а "세 시간 동안" — продолжительность. 부터~까지 показывает начало и конец периода, а 동안 — его общую длину.',
    },

    conjugationRule: {
      ko: '기간 명사 + 동안  ·  한 시간 동안 / 일주일 동안 / 방학 동안',
      uz: 'Vaqt yoki davr oti + 동안',
      en: 'duration noun + 동안',
      ru: 'существительное со значением периода + 동안',
    },

    conjugations: [
      { base: '한 시간', result: '한 시간 동안' },
      { base: '두 시간', result: '두 시간 동안' },
      { base: '하루', result: '하루 동안' },
      { base: '사흘', result: '사흘 동안' },
      { base: '일주일', result: '일주일 동안' },
      { base: '한 달', result: '한 달 동안' },
      { base: '세 달', result: '세 달 동안' },
      { base: '1년', result: '1년 동안' },
      { base: '방학', result: '방학 동안' },
      { base: '여행', result: '여행 동안' },
    ],

    examples: [
      {
        ko: '어제 두 시간 동안 한국어를 공부했어요.',
        highlight: '두 시간 동안',
        gloss: {
          ko: '어제 두 시간 동안 한국어를 공부했어요.',
          uz: 'Kecha ikki soat davomida koreys tilini o‘rgandim.',
          en: 'I studied Korean for two hours yesterday.',
          ru: 'Вчера я два часа учил корейский язык.',
        },
      },
      {
        ko: '한국에서 1년 동안 살았어요.',
        highlight: '1년 동안',
        gloss: {
          ko: '한국에서 1년 동안 살았어요.',
          uz: 'Men Koreyada bir yil yashadim.',
          en: 'I lived in Korea for one year.',
          ru: 'Я прожил в Корее один год.',
        },
      },
      {
        ko: '콘서트가 세 시간 동안 계속됐어요.',
        highlight: '세 시간 동안',
        gloss: {
          ko: '콘서트가 세 시간 동안 계속됐어요.',
          uz: 'Konsert uch soat davom etdi.',
          en: 'The concert lasted for three hours.',
          ru: 'Концерт продолжался три часа.',
        },
      },
      {
        ko: '방학 동안 여행을 많이 했어요.',
        highlight: '방학 동안',
        gloss: {
          ko: '방학 동안 여행을 많이 했어요.',
          uz: 'Ta’til davomida ko‘p sayohat qildim.',
          en: 'I traveled a lot during vacation.',
          ru: 'Во время каникул я много путешествовал.',
        },
      },
      {
        ko: '일주일 동안 매일 운동했어요.',
        highlight: '일주일 동안',
        gloss: {
          ko: '일주일 동안 매일 운동했어요.',
          uz: 'Bir hafta davomida har kuni mashq qildim.',
          en: 'I exercised every day for a week.',
          ru: 'В течение недели я каждый день занимался спортом.',
        },
      },
      {
        ko: '여행하는 동안 사진을 많이 찍었어요.',
        highlight: '여행하는 동안',
        gloss: {
          ko: '여행하는 동안 사진을 많이 찍었어요.',
          uz: 'Sayohat davomida ko‘p suratga oldim.',
          en: 'I took many photos during the trip.',
          ru: 'Во время путешествия я сделал много фотографий.',
        },
      },
      {
        ko: '시험 기간 동안 도서관에서 공부했어요.',
        highlight: '시험 기간 동안',
        gloss: {
          ko: '시험 기간 동안 도서관에서 공부했어요.',
          uz: 'Imtihon davrida kutubxonada o‘qidim.',
          en: 'I studied at the library during the exam period.',
          ru: 'Во время экзаменов я занимался в библиотеке.',
        },
      },
      {
        ko: '친구를 기다리는 동안 커피를 마셨어요.',
        highlight: '기다리는 동안',
        gloss: {
          ko: '친구를 기다리는 동안 커피를 마셨어요.',
          uz: 'Do‘stimni kutayotganimda qahva ichdim.',
          en: 'I drank coffee while waiting for my friend.',
          ru: 'Пока я ждал друга, я пил кофе.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '한국에서 얼마나 살았어요?',
        highlight: '얼마나',
        gloss: {
          ko: '한국에서 얼마나 살았어요?',
          uz: 'Koreyada qancha vaqt yashadingiz?',
          en: 'How long did you live in Korea?',
          ru: 'Как долго вы жили в Корее?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '2년 동안 살았어요.',
        highlight: '2년 동안',
        gloss: {
          ko: '2년 동안 살았어요.',
          uz: 'Ikki yil yashadim.',
          en: 'I lived there for two years.',
          ru: 'Я прожил там два года.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '그동안 한국어도 공부했어요?',
        highlight: '그동안',
        gloss: {
          ko: '그동안 한국어도 공부했어요?',
          uz: 'O‘sha vaqt davomida koreys tilini ham o‘rgandingizmi?',
          en: 'Did you study Korean during that time too?',
          ru: 'Вы также учили корейский в это время?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 1년 동안 어학당에 다녔어요.',
        highlight: '1년 동안',
        gloss: {
          ko: '네, 1년 동안 어학당에 다녔어요.',
          uz: 'Ha, bir yil til markaziga qatnadim.',
          en: 'Yes, I attended a language institute for a year.',
          ru: 'Да, я год ходил в языковой институт.',
        },
      },
    ],

    similar: {
      pattern: 'N부터 N까지',
      note: {
        ko: '"동안"은 시간의 전체 길이에 초점을 두고, "부터~까지"는 시작점과 끝점을 나타내요. "세 시간 동안 공부했어요"와 "두 시부터 다섯 시까지 공부했어요"를 비교하면 차이가 분명해요.',
        uz: '"동안" davomiylikni, "부터~까지" esa boshlanish va tugash vaqtini ko‘rsatadi.',
        en: '동안 focuses on duration, while 부터~까지 specifies the starting and ending points.',
        ru: '동안 обозначает продолжительность, а 부터~까지 — начальную и конечную точки.',
      },
    },

    cautions: [
      {
        ko: '"세 시 동안"과 "세 시간 동안"을 구별해야 해요. "세 시"는 시각이고 "세 시간"은 기간이에요. 세 시간 계속했다는 뜻이면 "세 시간 동안"이라고 해야 해요.',
        uz: '"세 시" — soat uch, "세 시간" — uch soat. Davomiylik uchun "세 시간 동안".',
        en: 'Distinguish 세 시 ("three o’clock") from 세 시간 ("three hours"). Duration requires 세 시간 동안.',
        ru: 'Различайте 세 시 («три часа на часах») и 세 시간 («три часа продолжительности»).',
      },
      {
        ko: '특정 시점을 말할 때는 "동안"을 쓰지 않아요. "오후 세 시 동안 만나요"가 아니라 "오후 세 시에 만나요"예요.',
        uz: 'Aniq vaqt nuqtasi uchun 동안 emas, 에 ishlatiladi.',
        en: 'Do not use 동안 for a specific point in time. Say 오후 세 시에 만나요.',
        ru: 'Для конкретного времени используется 에, а не 동안.',
      },
      {
        ko: '"동안에"도 실제로 쓰이지만 기본적인 기간 표현에서는 "동안"만으로 충분해요. 처음에는 "두 시간 동안 공부했어요"처럼 익히는 것이 좋아요.',
        uz: 'Asosiy shaklda faqat 동안 yetarli: 두 시간 동안.',
        en: '동안에 also exists, but plain 동안 is sufficient for basic duration expressions.',
        ru: 'Форма 동안에 возможна, но для базового выражения продолжительности достаточно 동안.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '어제 두 시간___ 한국어를 공부했어요.',
          uz: 'Davomiylikni bildiring: 어제 두 시간___ 한국어를 공부했어요.',
          en: 'Express duration: 어제 두 시간___ 한국어를 공부했어요.',
          ru: 'Выразите продолжительность: 어제 두 시간___ 한국어를 공부했어요.',
        },
        options: [
          { text: '동안', correct: true },
          { text: '에', correct: false },
          { text: '부터', correct: false },
          { text: '까지', correct: false },
          { text: '마다', correct: false },
        ],
      },
      {
        question: {
          ko: '한국에서 1년___ 살았어요.',
          uz: 'Bir yil davomida yashaganini ayting: 한국에서 1년___ 살았어요.',
          en: 'Say that you lived there for one year: 한국에서 1년___ 살았어요.',
          ru: 'Скажите, что вы жили там один год: 한국에서 1년___ 살았어요.',
        },
        options: [
          { text: '동안', correct: true },
          { text: '에', correct: false },
          { text: '마다', correct: false },
          { text: '보다', correct: false },
          { text: '밖에', correct: false },
        ],
      },
      {
        question: {
          ko: '콘서트가 세 시간___ 계속됐어요.',
          uz: 'Konsertning davomiyligini ayting: 콘서트가 세 시간___ 계속됐어요.',
          en: 'Express how long the concert lasted: 콘서트가 세 시간___ 계속됐어요.',
          ru: 'Укажите продолжительность концерта: 콘서트가 세 시간___ 계속됐어요.',
        },
        options: [
          { text: '동안', correct: true },
          { text: '에', correct: false },
          { text: '이나', correct: false },
          { text: '밖에', correct: false },
          { text: '처럼', correct: false },
        ],
      },
      {
        question: {
          ko: '___ 여행을 많이 했어요. "방학 전체 기간에"라는 뜻이에요.',
          uz: '"Ta’til davomida" ma’nosini tanlang.',
          en: 'Choose the expression meaning "during the vacation."',
          ru: 'Выберите выражение «во время каникул».',
        },
        options: [
          { text: '방학 동안', correct: true },
          { text: '방학에만', correct: false },
          { text: '방학부터', correct: false },
          { text: '방학보다', correct: false },
          { text: '방학에게', correct: false },
        ],
      },
      {
        question: {
          ko: '"오후 3시에 만나요"에서 3시는 무엇을 나타내요?',
          uz: '"오후 3시에" nimani bildiradi?',
          en: 'What does 오후 3시에 express?',
          ru: 'Что выражает 오후 3시에?',
        },
        options: [
          { text: '행동이 일어나는 시점', correct: true },
          { text: '행동이 계속되는 기간', correct: false },
          { text: '행동의 목적', correct: false },
          { text: '행동의 경험', correct: false },
          { text: '행동의 선택', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 3-3.
  // A-(으)ㄴ데, V-는데, N인데 1
  // ─────────────────────────────────────────────
  {
    code: 'connective-neunde-1',
    pattern: 'A-(으)ㄴ데, V-는데, N인데 1',
    section: 3,
    unit: 3,
    order: 3,
    isActive: true,

    summary: {
      ko: '뒤에 이어지는 말의 배경이나 상황을 먼저 설명할 때 사용해요. "그런데", "그리고 그 상황에서", "~한데"처럼 두 내용을 자연스럽게 연결해 줘요.',
      uz: 'Keyingi gap uchun fon yoki vaziyatni oldindan tushuntirishda ishlatiladi. Ikki mazmunni tabiiy bog‘laydi.',
      en: 'Introduces background or circumstances for what follows. It connects two pieces of information naturally, often with meanings such as "and/but given that..."',
      ru: 'Используется для введения фоновой информации или ситуации перед последующим сообщением. Естественно связывает две части высказывания.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '연결',
        uz: 'Bog‘lash',
        en: 'Connection',
        ru: 'Связь',
      },
      {
        ko: '배경',
        uz: 'Fon',
        en: 'Background',
        ru: 'Фон',
      },
    ],

    explanation: {
      ko: '"A-(으)ㄴ데, V-는데, N인데"는 먼저 어떤 상황이나 배경을 제시하고, 그다음에 그 상황과 관련된 내용을 이어서 말할 때 사용하는 아주 중요한 연결 표현이에요. 한국어 일상 대화에서 매우 자주 나와요.\n\n동사에는 "-는데"를 사용해요. "가다 → 가는데", "먹다 → 먹는데", "공부하다 → 공부하는데"처럼 만들어요. 예를 들어 "지금 도서관에 가는데 같이 갈래요?"에서는 내가 지금 도서관에 간다는 상황을 먼저 알려 주고, 그 상황을 바탕으로 상대에게 함께 갈지 물어요.\n\n형용사는 받침에 따라 "-은데/ㄴ데"를 사용해요. 받침이 있으면 "-은데": "작다 → 작은데", "좋다 → 좋은데". 받침이 없으면 ㄴ이 붙어서 "크다 → 큰데", "비싸다 → 비싼데"가 돼요. ㄹ 받침은 ㄹ이 없어지고 ㄴ이 붙어요. "멀다 → 먼데", "길다 → 긴데"처럼 사용해요.\n\n명사는 받침 여부와 관계없이 "인데"를 붙여요. "학생 → 학생인데", "의사 → 의사인데", "주말 → 주말인데"처럼 말해요.\n\n이 과에서 배우는 첫 번째 쓰임은 주로 "배경·상황 제시"예요. 예를 들어 "이 식당은 음식이 맛있는데 사람이 많아요"에서는 먼저 음식이 맛있다는 정보를 주고 그와 관련된 다른 정보를 덧붙여요. "내일이 시험인데 같이 공부할래요?"에서는 내일 시험이라는 상황을 먼저 제시하고 제안으로 이어져요.\n\n문맥에 따라 한국어의 "-는데"는 영어의 "and", "but", "so", "given that"처럼 여러 가지로 번역될 수 있어요. 하지만 한국어 학습에서는 하나의 번역어를 외우기보다 "앞 문장을 배경으로 깔고 뒤의 핵심 내용을 이어 준다"라고 이해하는 것이 가장 좋아요.\n\n특히 제안하거나 부탁하거나 질문할 때 자주 사용해요. "오늘 시간이 있는데 같이 영화 볼래요?", "길을 모르는데 좀 도와주세요", "서울에 처음 왔는데 어디에 가면 좋아요?"처럼 상황을 먼저 알려 주면 뒤의 질문이나 부탁이 훨씬 자연스러워져요.',
      uz: '"A-(으)ㄴ데, V-는데, N인데" keyingi gapga tegishli vaziyat yoki fonni avval aytishda ishlatiladi. Koreyscha kundalik suhbatda juda ko‘p uchraydi.\n\nFe’llarga "-는데" qo‘shiladi: 가다 → 가는데, 먹다 → 먹는데, 공부하다 → 공부하는데.\n\nSifatlarda 받침 bo‘lsa "-은데", 받침 bo‘lmasa "-ㄴ데": 작다 → 작은데, 크다 → 큰데. ㄹ bilan tugagan sifatlarda ㄹ tushadi: 멀다 → 먼데.\n\nOtga "인데" qo‘shiladi: 학생인데, 의사인데.\n\nBu bosqichda asosiy ma’no — keyingi gap uchun fon yaratish. Masalan, "내일이 시험인데 같이 공부할래요?" gapida "ertaga imtihon" degan vaziyat avval aytilib, keyin taklif qilinadi.',
      en: '"A-(으)ㄴ데, V-는데, N인데" is one of the most common Korean connecting patterns. It first establishes background or circumstances and then continues with information, a question, suggestion, request, or reaction related to that background.\n\nVerbs take -는데: 가다 → 가는데, 먹다 → 먹는데, 공부하다 → 공부하는데.\n\nAdjectives take -은데 after most consonant-ending stems and -ㄴ데 after vowel-ending stems: 작다 → 작은데, 크다 → 큰데. Final ㄹ drops before ㄴ: 멀다 → 먼데.\n\nNouns take 인데: 학생인데, 의사인데.\n\nAt this stage, the most useful way to understand the construction is as background-setting. In "내일이 시험인데 같이 공부할래요?", the speaker first gives the situation "there is an exam tomorrow" and then makes a suggestion.\n\nDepending on context, the construction may correspond to "and," "but," "so," or "given that" in English. Rather than memorizing one translation, understand that the first clause prepares the listener for the main point that follows.',
      ru: '"A-(으)ㄴ데, V-는데, N인데" — одна из самых частых связующих конструкций корейского языка. Первая часть задаёт ситуацию или фон, после чего следует связанная с ним информация, вопрос, предложение или просьба.\n\nС глаголами используется -는데: 가다 → 가는데, 먹다 → 먹는데, 공부하다 → 공부하는데.\n\nС прилагательными после большинства конечных согласных используется -은데, а после гласной — -ㄴ데: 작다 → 작은데, 크다 → 큰데. Конечный ㄹ выпадает: 멀다 → 먼데.\n\nС существительными используется 인데: 학생인데, 의사인데.\n\nНа данном этапе лучше всего понимать эту конструкцию как способ дать фоновую информацию перед основной мыслью.',
    },

    conjugationRule: {
      ko: 'V + 는데  ·  A 받침 O + 은데  ·  A 받침 X + ㄴ데  ·  A ㄹ 받침: ㄹ 탈락 + ㄴ데  ·  N + 인데',
      uz: 'V + 는데  ·  A 받침 bor + 은데  ·  A 받침 yo‘q + ㄴ데  ·  N + 인데',
      en: 'V + 는데  ·  A consonant + 은데  ·  A vowel + ㄴ데  ·  final ㄹ drops  ·  N + 인데',
      ru: 'V + 는데  ·  A после согласной + 은데  ·  A после гласной + ㄴ데  ·  N + 인데',
    },

    conjugations: [
      { base: '가다', result: '가는데' },
      { base: '먹다', result: '먹는데' },
      { base: '읽다', result: '읽는데' },
      { base: '공부하다', result: '공부하는데' },
      { base: '살다', result: '사는데' },

      { base: '작다', result: '작은데' },
      { base: '좋다', result: '좋은데' },
      { base: '많다', result: '많은데' },
      { base: '크다', result: '큰데' },
      { base: '비싸다', result: '비싼데' },

      { base: '멀다', result: '먼데' },
      { base: '길다', result: '긴데' },

      { base: '학생', result: '학생인데' },
      { base: '의사', result: '의사인데' },
    ],

    examples: [
      {
        ko: '지금 도서관에 가는데 같이 갈래요?',
        highlight: '가는데',
        gloss: {
          ko: '지금 도서관에 가는데 같이 갈래요?',
          uz: 'Hozir kutubxonaga ketyapman, birga borasizmi?',
          en: 'I am going to the library now. Would you like to come with me?',
          ru: 'Я сейчас иду в библиотеку. Хотите пойти вместе?',
        },
      },
      {
        ko: '내일이 시험인데 같이 공부할래요?',
        highlight: '시험인데',
        gloss: {
          ko: '내일이 시험인데 같이 공부할래요?',
          uz: 'Ertaga imtihon, birga o‘qiymizmi?',
          en: 'We have an exam tomorrow. Shall we study together?',
          ru: 'Завтра экзамен. Давайте позанимаемся вместе?',
        },
      },
      {
        ko: '이 식당은 음식이 맛있는데 사람이 많아요.',
        highlight: '맛있는데',
        gloss: {
          ko: '이 식당은 음식이 맛있는데 사람이 많아요.',
          uz: 'Bu restoranning taomlari mazali, lekin odam ko‘p.',
          en: 'The food at this restaurant is good, but it is crowded.',
          ru: 'В этом ресторане вкусная еда, но много людей.',
        },
      },
      {
        ko: '서울에 처음 왔는데 어디에 가면 좋아요?',
        highlight: '처음 왔는데',
        gloss: {
          ko: '서울에 처음 왔는데 어디에 가면 좋아요?',
          uz: 'Seulga birinchi marta keldim. Qayerga borsam yaxshi?',
          en: 'It is my first time in Seoul. Where would be good to go?',
          ru: 'Я впервые в Сеуле. Куда лучше сходить?',
        },
      },
      {
        ko: '오늘 시간이 있는데 같이 영화 볼까요?',
        highlight: '시간이 있는데',
        gloss: {
          ko: '오늘 시간이 있는데 같이 영화 볼까요?',
          uz: 'Bugun vaqtim bor, birga kino ko‘ramizmi?',
          en: 'I have some time today. Shall we watch a movie together?',
          ru: 'Сегодня у меня есть время. Посмотрим фильм вместе?',
        },
      },
      {
        ko: '길을 잘 모르는데 좀 도와주세요.',
        highlight: '잘 모르는데',
        gloss: {
          ko: '길을 잘 모르는데 좀 도와주세요.',
          uz: 'Yo‘lni yaxshi bilmayman, yordam bering.',
          en: 'I do not know the way very well, so please help me.',
          ru: 'Я плохо знаю дорогу, помогите, пожалуйста.',
        },
      },
      {
        ko: '그 카페는 조금 먼데 분위기가 정말 좋아요.',
        highlight: '조금 먼데',
        gloss: {
          ko: '그 카페는 조금 먼데 분위기가 정말 좋아요.',
          uz: 'U kafe biroz uzoq, lekin muhiti juda yaxshi.',
          en: 'That café is a little far away, but the atmosphere is really nice.',
          ru: 'Это кафе немного далеко, но атмосфера там отличная.',
        },
      },
      {
        ko: '저는 한국에 온 지 얼마 안 된 학생인데 친구를 사귀고 싶어요.',
        highlight: '학생인데',
        gloss: {
          ko: '저는 한국에 온 지 얼마 안 된 학생인데 친구를 사귀고 싶어요.',
          uz: 'Men Koreyaga yaqinda kelgan talabaman va do‘st orttirishni xohlayman.',
          en: 'I am a student who recently came to Korea, and I would like to make friends.',
          ru: 'Я студент, недавно приехавший в Корею, и хочу найти друзей.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이번 주말에 시간이 있는데 같이 콘서트에 갈래요?',
        highlight: '시간이 있는데',
        gloss: {
          ko: '이번 주말에 시간이 있는데 같이 콘서트에 갈래요?',
          uz: 'Bu dam olish kunlari vaqtim bor. Birga konsertga boramizmi?',
          en: 'I am free this weekend. Would you like to go to a concert together?',
          ru: 'В эти выходные я свободен. Хотите вместе пойти на концерт?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '미안해요. 주말에는 약속이 있는데요.',
        highlight: '약속이 있는데요',
        gloss: {
          ko: '미안해요. 주말에는 약속이 있는데요.',
          uz: 'Kechirasiz, dam olish kunlari boshqa rejam bor.',
          en: 'Sorry, I already have plans this weekend.',
          ru: 'Извините, у меня уже есть планы на выходные.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '그래요? 그럼 다음 주는 어때요?',
        highlight: '다음 주는 어때요',
        gloss: {
          ko: '그래요? 그럼 다음 주는 어때요?',
          uz: 'Shundaymi? Unda keyingi hafta-chi?',
          en: 'Really? Then how about next week?',
          ru: 'Правда? Тогда как насчёт следующей недели?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '다음 주는 괜찮은데 날짜를 다시 정해요.',
        highlight: '괜찮은데',
        gloss: {
          ko: '다음 주는 괜찮은데 날짜를 다시 정해요.',
          uz: 'Keyingi hafta yaxshi, sanani keyinroq aniqlaylik.',
          en: 'Next week is fine. Let’s decide the exact date later.',
          ru: 'Следующая неделя подходит. Давайте потом уточним дату.',
        },
      },
    ],

    similar: {
      pattern: 'A/V-지만',
      note: {
        ko: '"-지만"은 두 내용이 서로 반대되거나 대조된다는 의미를 분명하게 나타내요. "-는데"는 반드시 반대 의미일 필요가 없고, 뒤의 말을 위한 배경을 자연스럽게 제시하는 데 더 넓게 사용할 수 있어요.',
        uz: '"-지만" aniq qarama-qarshilikni bildiradi. "-는데" esa ko‘proq fon yoki vaziyatni taqdim etadi.',
        en: '-지만 explicitly marks contrast. -는데 is broader and often simply provides background for what follows.',
        ru: '-지만 явно выражает противопоставление, а -는데 имеет более широкую функцию введения фоновой ситуации.',
      },
    },

    cautions: [
      {
        ko: '동사와 형용사의 형태를 바꾸어 쓰지 않도록 주의해요. "먹은데"가 아니라 동사는 "먹는데", 형용사 "좋다"는 "좋은데"예요.',
        uz: 'Fe’l uchun 는데, sifat uchun 은데/ㄴ데 ishlatiladi: 먹는데, 좋은데.',
        en: 'Do not confuse verb and adjective forms: 먹는데 for a verb, 좋은데 for an adjective.',
        ru: 'Не путайте формы глагола и прилагательного: 먹는데, но 좋은데.',
      },
      {
        ko: '받침 없는 형용사에 "-은데"를 붙이지 않아요. "비싸은데"가 아니라 "비싼데"예요.',
        uz: '"비싸은데" emas, "비싼데".',
        en: 'A vowel-ending adjective takes ㄴ데: 비싼데, not 비싸은데.',
        ru: 'После прилагательного без конечного согласного используется ㄴ데: 비싼데.',
      },
      {
        ko: '명사에는 바로 "-는데"를 붙이지 않아요. "학생는데"가 아니라 "학생인데"예요.',
        uz: 'Ot bilan "인데": 학생인데.',
        en: 'Nouns take 인데, not plain 는데: 학생인데.',
        ru: 'После существительного используется 인데: 학생인데.',
      },
      {
        ko: '"-는데"를 항상 "하지만"으로 번역하면 안 돼요. "서울에 처음 왔는데 어디에 가면 좋아요?"에서는 반대가 아니라 질문의 배경을 설명하고 있어요.',
        uz: '"-는데" har doim "lekin" emas; u ko‘pincha fon beradi.',
        en: 'Do not always translate -는데 as "but." It often simply provides context.',
        ru: 'Не переводите -는데 всегда как «но»: часто оно просто задаёт контекст.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '지금 도서관에 가___ 같이 갈래요?',
          uz: 'Fe’lning to‘g‘ri shaklini tanlang: 지금 도서관에 가___ 같이 갈래요?',
          en: 'Choose the correct verb form: 지금 도서관에 가___ 같이 갈래요?',
          ru: 'Выберите правильную форму глагола: 지금 도서관에 가___ 같이 갈래요?',
        },
        options: [
          { text: '는데', correct: true },
          { text: '은데', correct: false },
          { text: 'ㄴ데', correct: false },
          { text: '인데', correct: false },
          { text: '거나', correct: false },
        ],
      },
      {
        question: {
          ko: '이 가방은 조금 비싸___ 정말 예뻐요.',
          uz: 'Sifatning to‘g‘ri shaklini tanlang: 이 가방은 조금 비싸___ 정말 예뻐요.',
          en: 'Choose the correct adjective form: 이 가방은 조금 비싸___ 정말 예뻐요.',
          ru: 'Выберите правильную форму прилагательного: 이 가방은 조금 비싸___ 정말 예뻐요.',
        },
        options: [
          { text: 'ㄴ데', correct: true },
          { text: '는데', correct: false },
          { text: '은데', correct: false },
          { text: '인데', correct: false },
          { text: '거나', correct: false },
        ],
      },
      {
        question: {
          ko: '이 방은 조금 작___ 깨끗해요.',
          uz: 'Sifatning to‘g‘ri shaklini tanlang: 이 방은 조금 작___ 깨끗해요.',
          en: 'Choose the correct form after 작다: 이 방은 조금 작___ 깨끗해요.',
          ru: 'Выберите правильную форму после 작다: 이 방은 조금 작___ 깨끗해요.',
        },
        options: [
          { text: '은데', correct: true },
          { text: '는데', correct: false },
          { text: 'ㄴ데', correct: false },
          { text: '인데', correct: false },
          { text: '거나', correct: false },
        ],
      },
      {
        question: {
          ko: '저는 대학생___ 이번 방학에 여행을 가려고 해요.',
          uz: 'Otning to‘g‘ri shaklini tanlang: 저는 대학생___...',
          en: 'Choose the correct noun form: 저는 대학생___...',
          ru: 'Выберите правильную форму после существительного: 저는 대학생___...',
        },
        options: [
          { text: '인데', correct: true },
          { text: '는데', correct: false },
          { text: '은데', correct: false },
          { text: 'ㄴ데', correct: false },
          { text: '거나', correct: false },
        ],
      },
      {
        question: {
          ko: '"멀다"를 "-(으)ㄴ데" 형태로 바르게 바꾸세요.',
          uz: '"멀다" ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct form of 멀다.',
          ru: 'Выберите правильную форму от 멀다.',
        },
        options: [
          { text: '먼데', correct: true },
          { text: '멀은데', correct: false },
          { text: '멀ㄴ데', correct: false },
          { text: '멀는데', correct: false },
          { text: '멀인데', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 3-4. V-(으)ㄹ N
  // ─────────────────────────────────────────────
  {
    code: 'verb-eul-noun',
    pattern: 'V-(으)ㄹ N',
    section: 3,
    unit: 3,
    order: 4,
    isActive: true,

    summary: {
      ko: '앞으로 하게 될 행동이나 아직 일어나지 않은 행동을 이용해서 뒤의 명사를 꾸밀 때 사용해요. "~할 사람", "~먹을 음식", "~갈 곳"처럼 말해요.',
      uz: 'Kelajakda bajariladigan yoki hali sodir bo‘lmagan harakat bilan keyingi otni aniqlash uchun ishlatiladi.',
      en: 'Modifies a noun with an action that will happen or has not yet happened, as in "a person to meet," "food to eat," or "a place to go."',
      ru: 'Используется для определения существительного действием, которое произойдёт в будущем или ещё не произошло.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '관형형',
        uz: 'Aniqlovchi shakl',
        en: 'Noun modifier',
        ru: 'Определительная форма',
      },
      {
        ko: '미래',
        uz: 'Kelajak',
        en: 'Future',
        ru: 'Будущее',
      },
    ],

    explanation: {
      ko: '"V-(으)ㄹ N"은 아직 일어나지 않았거나 앞으로 할 예정인 행동으로 뒤의 명사를 설명할 때 사용해요. 영어로는 "the noun that someone will..." 또는 "noun to..."와 비슷한 역할을 해요.\n\n예를 들어 "내일 만날 사람"은 내일 내가 만나게 될 사람이고, "주말에 볼 영화"는 앞으로 주말에 볼 예정인 영화예요. "여행할 곳"은 앞으로 여행하려는 장소를 뜻해요.\n\n받침이 있는 동사에는 보통 "-을"을 붙여요. "먹다 → 먹을 음식", "읽다 → 읽을 책", "찍다 → 찍을 사진", "찾다 → 찾을 사람"처럼 활용해요.\n\n받침이 없는 동사에는 ㄹ이 앞 음절의 받침으로 들어가요. "가다 → 갈 곳", "보다 → 볼 영화", "만나다 → 만날 사람", "하다 → 할 일"이 돼요.\n\nㄹ 받침으로 끝나는 동사는 이미 ㄹ을 가지고 있기 때문에 새로운 ㄹ을 붙이지 않아요. "만들다 → 만들 음식", "살다 → 살 집", "놀다 → 놀 장소"라고 해요.\n\n앞에서 배운 "V-(으)ㄴ N"과 비교하면 시간 차이가 분명해요. "어제 본 영화"는 이미 본 영화이고, "내일 볼 영화"는 앞으로 볼 영화예요. "제가 만든 음식"은 이미 만든 음식이고, "제가 만들 음식"은 앞으로 만들 음식이에요.\n\n이 표현은 예정, 계획, 필요를 말할 때도 매우 자주 사용해요. "오늘 할 일이 많아요", "살 것이 있어요", "친구에게 줄 선물을 샀어요", "여행할 곳을 찾고 있어요"처럼 일상생활에서 폭넓게 활용돼요.\n\n다만 "-(으)ㄹ N"이 항상 먼 미래만을 뜻하는 것은 아니에요. 아직 실현되지 않은 행동이나 그 시점에서 앞으로 일어날 행동이면 사용할 수 있어요. 그래서 "지금 먹을 음식"처럼 바로 다음 순간에 할 행동도 표현할 수 있어요.',
      uz: '"V-(으)ㄹ N" hali sodir bo‘lmagan yoki kelajakda bajariladigan harakat bilan keyingi otni tavsiflaydi.\n\nMasalan, "내일 만날 사람" — ertaga uchrashadigan odam, "주말에 볼 영화" — dam olish kuni ko‘riladigan film.\n\n받침 bilan tugagan fe’lga "-을": 먹다 → 먹을 음식, 읽다 → 읽을 책. 받침 bo‘lmasa ㄹ qo‘shiladi: 가다 → 갈 곳, 보다 → 볼 영화, 만나다 → 만날 사람.\n\nㄹ bilan tugagan fe’lga qo‘shimcha ㄹ qo‘shilmaydi: 만들다 → 만들 음식, 살다 → 살 집.\n\n"어제 본 영화" allaqachon ko‘rilgan film, "내일 볼 영화" esa hali ko‘riladigan film. Shu farqni tushunish muhim.',
      en: '"V-(으)ㄹ N" describes a noun with an action that has not yet occurred or is expected to occur. It often corresponds to expressions such as "the person I will meet" or "a book to read."\n\nAfter most consonant-ending stems, use -을: 먹다 → 먹을 음식, 읽다 → 읽을 책. After vowel-ending stems, add ㄹ: 가다 → 갈 곳, 보다 → 볼 영화, 만나다 → 만날 사람.\n\nWith ㄹ-final stems, do not add another ㄹ: 만들다 → 만들 음식, 살다 → 살 집.\n\nCompare it with the past noun modifier: "어제 본 영화" is a movie already watched, while "내일 볼 영화" is a movie that will be watched later.\n\nThe form is also extremely common for plans and things that need to be done: 오늘 할 일, 살 것, 줄 선물, 갈 곳.',
      ru: '"V-(으)ㄹ N" описывает существительное действием, которое ещё не произошло или ожидается в будущем.\n\nПосле большинства основ с конечным согласным используется -을: 먹다 → 먹을 음식, 읽다 → 읽을 책. После основы без конечного согласного добавляется ㄹ: 가다 → 갈 곳, 보다 → 볼 영화, 만나다 → 만날 사람.\n\nПосле основы на ㄹ второй ㄹ не добавляется: 만들다 → 만들 음식, 살다 → 살 집.\n\nСравните: "어제 본 영화" — фильм, который уже посмотрели, а "내일 볼 영화" — фильм, который будут смотреть завтра.\n\nФорма очень часто используется для планов и предстоящих действий: 오늘 할 일, 살 것, 줄 선물, 갈 곳.',
    },

    conjugationRule: {
      ko: '받침 O + 을 N  ·  받침 X + ㄹ N  ·  ㄹ 받침 + N',
      uz: '받침 bor + 을 N  ·  받침 yo‘q + ㄹ N  ·  ㄹ bilan tugasa qo‘shimcha ㄹ yo‘q',
      en: 'consonant + 을 N  ·  vowel + ㄹ N  ·  ㄹ-final + N without another ㄹ',
      ru: 'согласная + 을 N  ·  гласная + ㄹ N  ·  после ㄹ второй ㄹ не добавляется',
    },

    conjugations: [
      // 받침 O — 5
      { base: '먹다', result: '먹을 음식' },
      { base: '읽다', result: '읽을 책' },
      { base: '찍다', result: '찍을 사진' },
      { base: '찾다', result: '찾을 사람' },
      { base: '입다', result: '입을 옷' },

      // 받침 X — 5
      { base: '가다', result: '갈 곳' },
      { base: '보다', result: '볼 영화' },
      { base: '만나다', result: '만날 사람' },
      { base: '사다', result: '살 물건' },
      { base: '하다', result: '할 일' },

      // ㄹ 받침
      { base: '만들다', result: '만들 음식' },
      { base: '살다', result: '살 집' },
      { base: '놀다', result: '놀 장소' },
    ],

    examples: [
      {
        ko: '내일 만날 사람이 제 한국어 선생님이에요.',
        highlight: '내일 만날 사람',
        gloss: {
          ko: '내일 만날 사람이 제 한국어 선생님이에요.',
          uz: 'Ertaga uchrashadigan odam mening koreys tili o‘qituvchim.',
          en: 'The person I will meet tomorrow is my Korean teacher.',
          ru: 'Человек, с которым я встречусь завтра, — мой преподаватель корейского.',
        },
      },
      {
        ko: '주말에 볼 영화를 고르고 있어요.',
        highlight: '주말에 볼 영화',
        gloss: {
          ko: '주말에 볼 영화를 고르고 있어요.',
          uz: 'Dam olish kuni ko‘radigan filmni tanlayapman.',
          en: 'I am choosing a movie to watch this weekend.',
          ru: 'Я выбираю фильм, который посмотрю на выходных.',
        },
      },
      {
        ko: '여행할 곳을 인터넷에서 찾아봤어요.',
        highlight: '여행할 곳',
        gloss: {
          ko: '여행할 곳을 인터넷에서 찾아봤어요.',
          uz: 'Internetdan sayohat qiladigan joylarni qidirdim.',
          en: 'I looked online for places to travel to.',
          ru: 'Я поискал в интернете места, куда можно поехать.',
        },
      },
      {
        ko: '오늘 할 일이 정말 많아요.',
        highlight: '오늘 할 일',
        gloss: {
          ko: '오늘 할 일이 정말 많아요.',
          uz: 'Bugun qiladigan ishlarim juda ko‘p.',
          en: 'I have a lot to do today.',
          ru: 'Сегодня у меня очень много дел.',
        },
      },
      {
        ko: '친구에게 줄 선물을 샀어요.',
        highlight: '친구에게 줄 선물',
        gloss: {
          ko: '친구에게 줄 선물을 샀어요.',
          uz: 'Do‘stimga beradigan sovg‘a sotib oldim.',
          en: 'I bought a present to give to my friend.',
          ru: 'Я купил подарок, который подарю другу.',
        },
      },
      {
        ko: '저녁에 먹을 음식을 미리 준비했어요.',
        highlight: '저녁에 먹을 음식',
        gloss: {
          ko: '저녁에 먹을 음식을 미리 준비했어요.',
          uz: 'Kechqurun yeydigan ovqatni oldindan tayyorladim.',
          en: 'I prepared the food we will eat this evening in advance.',
          ru: 'Я заранее приготовил еду, которую мы будем есть вечером.',
        },
      },
      {
        ko: '한국에서 살 집을 찾고 있어요.',
        highlight: '한국에서 살 집',
        gloss: {
          ko: '한국에서 살 집을 찾고 있어요.',
          uz: 'Koreyada yashaydigan uy qidiryapman.',
          en: 'I am looking for a place to live in Korea.',
          ru: 'Я ищу жильё, где буду жить в Корее.',
        },
      },
      {
        ko: '다음 수업에서 읽을 책을 미리 샀어요.',
        highlight: '다음 수업에서 읽을 책',
        gloss: {
          ko: '다음 수업에서 읽을 책을 미리 샀어요.',
          uz: 'Keyingi darsda o‘qiydigan kitobni oldindan sotib oldim.',
          en: 'I bought the book we will read in the next class in advance.',
          ru: 'Я заранее купил книгу, которую мы будем читать на следующем занятии.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이번 주말에 뭐 할 거예요?',
        highlight: '뭐 할 거예요',
        gloss: {
          ko: '이번 주말에 뭐 할 거예요?',
          uz: 'Bu dam olish kunlari nima qilasiz?',
          en: 'What are you going to do this weekend?',
          ru: 'Что вы будете делать в эти выходные?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '친구하고 볼 공연을 알아보고 있어요.',
        highlight: '친구하고 볼 공연',
        gloss: {
          ko: '친구하고 볼 공연을 알아보고 있어요.',
          uz: 'Do‘stim bilan ko‘radigan tomoshani qidiryapman.',
          en: 'I am looking for a show to see with my friend.',
          ru: 'Я ищу представление, на которое пойду с другом.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '어디에서 볼 거예요?',
        highlight: '볼 거예요',
        gloss: {
          ko: '어디에서 볼 거예요?',
          uz: 'Qayerda ko‘rasiz?',
          en: 'Where are you going to see it?',
          ru: 'Где вы будете его смотреть?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아직 못 정했어요. 갈 곳도 같이 찾아보려고 해요.',
        highlight: '갈 곳',
        gloss: {
          ko: '아직 못 정했어요. 갈 곳도 같이 찾아보려고 해요.',
          uz: 'Hali tanlamadik. Boradigan joyni ham birga qidiramiz.',
          en: 'We have not decided yet. We are going to look for a place to go together.',
          ru: 'Мы ещё не решили. Хотим вместе поискать место, куда пойти.',
        },
      },
    ],

    similar: {
      pattern: 'V-(으)ㄴ N',
      note: {
        ko: '"V-(으)ㄴ N"은 이미 끝난 행동으로 명사를 꾸미고, "V-(으)ㄹ N"은 아직 하지 않았거나 앞으로 할 행동으로 명사를 꾸며요. "어제 본 영화 ↔ 내일 볼 영화", "만든 음식 ↔ 만들 음식"처럼 비교하면 쉬워요.',
        uz: '"V-(으)ㄴ N" tugallangan harakatni, "V-(으)ㄹ N" esa hali bajarilmagan yoki kelajakdagi harakatni bildiradi.',
        en: '"V-(으)ㄴ N" modifies nouns with completed actions, while "V-(으)ㄹ N" modifies them with future or unrealized actions.',
        ru: '"V-(으)ㄴ N" описывает существительное завершённым действием, а "V-(으)ㄹ N" — будущим или ещё не осуществлённым.',
      },
    },

    cautions: [
      {
        ko: '받침 있는 동사에는 "-을"이 필요해요. "먹ㄹ 음식"이 아니라 "먹을 음식"이에요.',
        uz: '받침 bilan tugagan fe’lga "-을": 먹을 음식.',
        en: 'Most consonant-ending stems require 을: 먹을 음식.',
        ru: 'После основы с согласным используется 을: 먹을 음식.',
      },
      {
        ko: '받침 없는 동사에 "-을"을 따로 붙이지 않아요. "가을 곳"이 아니라 "갈 곳", "보을 영화"가 아니라 "볼 영화"예요.',
        uz: '받침 bo‘lmasa ㄹ qo‘shiladi: 갈 곳, 볼 영화.',
        en: 'After vowel-ending stems, add ㄹ: 갈 곳, 볼 영화.',
        ru: 'После основы без конечного согласного добавляется ㄹ: 갈 곳, 볼 영화.',
      },
      {
        ko: 'ㄹ 받침에는 ㄹ을 하나 더 붙이지 않아요. "살ㄹ 집"이 아니라 "살 집", "만들ㄹ 음식"이 아니라 "만들 음식"이에요.',
        uz: 'ㄹ bilan tugagan fe’lga yana ㄹ qo‘shilmaydi.',
        en: 'Do not add another ㄹ to an ㄹ-final stem.',
        ru: 'После основы на ㄹ второй ㄹ не добавляется.',
      },
      {
        ko: '이미 끝난 행동이면 "-(으)ㄹ N"을 쓰지 않아요. "어제 볼 영화"가 아니라 이미 봤다면 "어제 본 영화"라고 해야 해요.',
        uz: 'Tugallangan harakat uchun "-(으)ㄴ N": 어제 본 영화.',
        en: 'Use the completed modifier for an already completed action: 어제 본 영화, not 어제 볼 영화.',
        ru: 'Для завершённого действия используется прошедшая определительная форма: 어제 본 영화.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '내일 ___ 사람이 제 친구예요.',
          uz: 'Ertaga uchrashadigan odam: 내일 ___ 사람이 제 친구예요.',
          en: 'Choose the form meaning "the person I will meet tomorrow."',
          ru: 'Выберите форму «человек, с которым я встречусь завтра».',
        },
        options: [
          { text: '만날', correct: true },
          { text: '만난', correct: false },
          { text: '만나는', correct: false },
          { text: '만나고', correct: false },
          { text: '만나지', correct: false },
        ],
      },
      {
        question: {
          ko: '저녁에 ___ 음식을 준비했어요.',
          uz: 'Kechqurun yeydigan ovqat: 저녁에 ___ 음식을 준비했어요.',
          en: 'Choose the form meaning "food to eat this evening."',
          ru: 'Выберите форму «еда, которую будем есть вечером».',
        },
        options: [
          { text: '먹을', correct: true },
          { text: '먹은', correct: false },
          { text: '먹는', correct: false },
          { text: '먹고', correct: false },
          { text: '먹지', correct: false },
        ],
      },
      {
        question: {
          ko: '이번 주말에 ___ 영화를 고르고 있어요.',
          uz: 'Dam olish kuni ko‘riladigan filmni tanlang.',
          en: 'Choose the form meaning "a movie to watch this weekend."',
          ru: 'Выберите форму «фильм, который посмотрю в выходные».',
        },
        options: [
          { text: '볼', correct: true },
          { text: '본', correct: false },
          { text: '보는', correct: false },
          { text: '보고', correct: false },
          { text: '보지', correct: false },
        ],
      },
      {
        question: {
          ko: '오늘 ___ 일이 많아요.',
          uz: 'Bugun qiladigan ishlar: 오늘 ___ 일이 많아요.',
          en: 'Choose the form meaning "things to do today."',
          ru: 'Выберите форму «дела, которые нужно сделать сегодня».',
        },
        options: [
          { text: '할', correct: true },
          { text: '한', correct: false },
          { text: '하는', correct: false },
          { text: '하고', correct: false },
          { text: '하지', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다"로 "앞으로 살 집"을 만들면 무엇이에요?',
          uz: '"살다" bilan "kelajakda yashaydigan uy" shaklini tanlang.',
          en: 'Choose the correct phrase meaning "a house to live in."',
          ru: 'Выберите правильную форму «дом, в котором буду жить».',
        },
        options: [
          { text: '살 집', correct: true },
          { text: '살을 집', correct: false },
          { text: '살ㄹ 집', correct: false },
          { text: '산 집', correct: false },
          { text: '사는 집', correct: false },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // UNIT 4 — 옷이 좀 큰 것 같아요
  // 추측·판단 → 비교 → 바람·희망
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 4-1.
  // A-(으)ㄴ 것 같다, V-는 것 같다, N인 것 같다
  // ─────────────────────────────────────────────
  {
    code: 'geot-gatda-present',
    pattern: 'A-(으)ㄴ 것 같다, V-는 것 같다, N인 것 같다',
    section: 3,
    unit: 4,
    order: 1,
    isActive: true,

    summary: {
      ko: '눈으로 본 상황이나 가지고 있는 정보를 바탕으로 확실하지 않은 생각이나 판단을 말할 때 사용해요. 형용사, 동사, 명사에 따라 앞의 형태가 달라져요.',
      uz: 'Ko‘rgan vaziyat yoki mavjud ma’lumotga asoslanib, aniq bo‘lmagan fikr yoki taxminni aytishda ishlatiladi. Sifat, fe’l va otga qarab shakli o‘zgaradi.',
      en: 'Used to express an uncertain judgment, impression, or guess based on what you see or know. The form changes depending on whether it follows an adjective, verb, or noun.',
      ru: 'Используется для выражения неуверенного мнения, впечатления или предположения на основе увиденного или известной информации. Форма зависит от того, стоит ли перед ней прилагательное, глагол или существительное.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '추측',
        uz: 'Taxmin',
        en: 'Guess',
        ru: 'Предположение',
      },
      {
        ko: '판단',
        uz: 'Fikr',
        en: 'Judgment',
        ru: 'Оценка',
      },
    ],

    explanation: {
      ko: '"것 같다"는 어떤 사실을 100% 확실하게 말하지 않고, 자신이 보고 듣거나 알고 있는 정보를 바탕으로 조심스럽게 생각이나 판단을 말할 때 사용하는 표현이에요. 한국어 일상 대화에서 정말 자주 사용해요.\n\n예를 들어 옷을 입어 보고 "이 옷이 커요"라고 하면 크다는 사실을 비교적 단정적으로 말하는 느낌이에요. 반면에 "이 옷이 좀 큰 것 같아요"라고 하면 직접 입어 보거나 거울을 본 뒤에 "제 생각에는 조금 큰 듯해요"라고 부드럽게 판단하는 느낌이 돼요. 그래서 가게에서 물건을 고르거나 상대방의 의견을 말할 때 특히 자연스러워요.\n\n형용사에는 "A-(으)ㄴ 것 같다"를 사용해요. 받침이 있으면 "-은 것 같다": "작다 → 작은 것 같다", "좋다 → 좋은 것 같다", "많다 → 많은 것 같다". 받침이 없으면 ㄴ이 붙어서 "크다 → 큰 것 같다", "비싸다 → 비싼 것 같다", "예쁘다 → 예쁜 것 같다"가 돼요. ㄹ 받침은 ㄹ이 없어지고 ㄴ이 들어가서 "길다 → 긴 것 같다", "멀다 → 먼 것 같다"처럼 활용해요.\n\n현재의 동작이나 반복되는 행동을 추측할 때는 동사에 "V-는 것 같다"를 붙여요. 받침 여부와 관계없이 대부분 "-는 것 같다"를 사용해서 "가다 → 가는 것 같다", "먹다 → 먹는 것 같다", "일하다 → 일하는 것 같다"처럼 만들어요. 다만 ㄹ 받침 동사는 ㄹ이 빠져서 "살다 → 사는 것 같다", "놀다 → 노는 것 같다"가 돼요.\n\n명사 뒤에는 "N인 것 같다"를 사용해요. 받침과 관계없이 "학생인 것 같다", "의사인 것 같다", "한국 사람인 것 같다"처럼 사용해요.\n\n이 세 형태는 의미는 비슷하지만 앞의 품사가 무엇인지에 따라 반드시 구별해야 해요. "옷이 크다"처럼 상태를 말하면 "큰 것 같아요", "사람이 기다리다"처럼 행동을 말하면 "기다리는 것 같아요", "학생이다"처럼 명사를 말하면 "학생인 것 같아요"예요.\n\n"것 같다"는 단순히 모르는 것을 아무렇게나 추측하는 표현만은 아니에요. 직접 본 모습, 들은 소리, 느낀 상태, 알고 있는 정보 등을 바탕으로 판단할 때 자연스러워요. 예를 들어 밖을 보고 사람들이 우산을 쓰고 있으면 "비가 오는 것 같아요", 옷을 입어 보고 소매가 길면 "소매가 좀 긴 것 같아요"라고 말할 수 있어요.\n\n또 한국어에서는 의견을 너무 직접적으로 말하지 않기 위해서도 자주 사용해요. 가게에서 "이 디자인이 이상해요"라고 단정하기보다 "이 디자인은 저한테 조금 안 어울리는 것 같아요"라고 하면 훨씬 부드럽고 자연스럽게 들려요.',
      uz: '"것 같다" biror narsani 100% aniq deb aytmasdan, ko‘rgan, eshitgan yoki bilgan ma’lumotga asoslanib ehtiyotkorlik bilan fikr bildirish uchun ishlatiladi.\n\nMasalan, kiyimni kiyib ko‘rib "이 옷이 커요" desangiz, kiyim katta ekanini ancha qat’iy aytasiz. "이 옷이 좀 큰 것 같아요" esa "menimcha, bu kiyim biroz katta" degan yumshoqroq fikrni bildiradi.\n\nSifatlarda 받침 bo‘lsa "-은 것 같다": 작다 → 작은 것 같다. 받침 bo‘lmasa "-ㄴ 것 같다": 크다 → 큰 것 같다, 비싸다 → 비싼 것 같다. ㄹ bilan tugagan sifatlarda ㄹ tushadi: 길다 → 긴 것 같다.\n\nHozirgi harakat uchun fe’lga "-는 것 같다" qo‘shiladi: 가다 → 가는 것 같다, 먹다 → 먹는 것 같다. ㄹ bilan tugagan fe’llarda ㄹ tushadi: 살다 → 사는 것 같다.\n\nOtlardan keyin "N인 것 같다" ishlatiladi: 학생인 것 같다, 의사인 것 같다.\n\nBu shakl, ayniqsa, do‘konda kiyim, o‘lcham, rang yoki dizayn haqidagi fikrni yumshoq aytishda juda foydali.',
      en: '"것 같다" allows the speaker to present an opinion or judgment without claiming complete certainty. It is extremely common when the speaker is making an inference from something they can see, hear, feel, or otherwise know.\n\nFor example, "이 옷이 커요" sounds like a relatively direct statement that the clothes are big. "이 옷이 좀 큰 것 같아요" is softer: "I think these clothes may be a little big."\n\nAdjectives use "A-(으)ㄴ 것 같다." After most consonant-ending stems, use -은: 작다 → 작은 것 같다, 좋다 → 좋은 것 같다. After vowel-ending stems, ㄴ attaches to the preceding syllable: 크다 → 큰 것 같다, 비싸다 → 비싼 것 같다. Final ㄹ drops: 길다 → 긴 것 같다.\n\nPresent actions use "V-는 것 같다": 가다 → 가는 것 같다, 먹다 → 먹는 것 같다. Final ㄹ drops before 는: 살다 → 사는 것 같다.\n\nNouns use "N인 것 같다" regardless of whether they have a final consonant: 학생인 것 같다, 의사인 것 같다.\n\nThe construction is also important pragmatically because it can soften opinions. Rather than directly saying that a design looks strange, a customer may say that it does not seem to suit them very well.',
      ru: '"것 같다" позволяет выразить мнение или предположение, не утверждая что-либо со стопроцентной уверенностью. Конструкция очень часто используется, когда вывод основан на том, что говорящий видит, слышит, чувствует или знает.\n\nНапример, "이 옷이 커요" звучит довольно категорично: «Эта одежда большая». "이 옷이 좀 큰 것 같아요" звучит мягче: «Кажется, эта одежда немного великовата».\n\nС прилагательными используется "A-(으)ㄴ 것 같다". После большинства основ с конечным согласным добавляется -은: 작다 → 작은 것 같다. После основы без 받침 добавляется ㄴ: 크다 → 큰 것 같다, 비싸다 → 비싼 것 같다. Конечный ㄹ выпадает: 길다 → 긴 것 같다.\n\nДля текущего действия используется "V-는 것 같다": 가다 → 가는 것 같다, 먹다 → 먹는 것 같다. У основы на ㄹ этот ㄹ выпадает: 살다 → 사는 것 같다.\n\nПосле существительного используется "N인 것 같다": 학생인 것 같다, 의사인 것 같다.\n\nЭта конструкция также помогает смягчить мнение и поэтому особенно полезна при покупках и обсуждении одежды.',
    },

    conjugationRule: {
      ko: 'A 받침 O + 은 것 같다  ·  A 받침 X + ㄴ 것 같다  ·  A ㄹ 받침: ㄹ 탈락 + ㄴ 것 같다  ·  V + 는 것 같다  ·  V ㄹ 받침: ㄹ 탈락 + 는 것 같다  ·  N + 인 것 같다',
      uz: 'A 받침 bor + 은 것 같다  ·  A 받침 yo‘q + ㄴ 것 같다  ·  V + 는 것 같다  ·  N + 인 것 같다',
      en: 'A consonant + 은 것 같다  ·  A vowel + ㄴ 것 같다  ·  V + 는 것 같다  ·  N + 인 것 같다',
      ru: 'A после согласной + 은 것 같다  ·  A после гласной + ㄴ 것 같다  ·  V + 는 것 같다  ·  N + 인 것 같다',
    },

    conjugations: [
      // 형용사 받침 O — 5
      { base: '작다', result: '작은 것 같다' },
      { base: '좋다', result: '좋은 것 같다' },
      { base: '많다', result: '많은 것 같다' },
      { base: '짧다', result: '짧은 것 같다' },
      { base: '얇다', result: '얇은 것 같다' },

      // 형용사 받침 X — 5
      { base: '크다', result: '큰 것 같다' },
      { base: '비싸다', result: '비싼 것 같다' },
      { base: '예쁘다', result: '예쁜 것 같다' },
      { base: '싸다', result: '싼 것 같다' },
      { base: '나쁘다', result: '나쁜 것 같다' },

      // ㄹ 받침
      { base: '길다', result: '긴 것 같다' },
      { base: '멀다', result: '먼 것 같다' },

      // 동사
      { base: '가다', result: '가는 것 같다' },
      { base: '먹다', result: '먹는 것 같다' },
      { base: '기다리다', result: '기다리는 것 같다' },
      { base: '일하다', result: '일하는 것 같다' },
      { base: '살다', result: '사는 것 같다' },

      // 명사
      { base: '학생', result: '학생인 것 같다' },
      { base: '의사', result: '의사인 것 같다' },
      { base: '한국 사람', result: '한국 사람인 것 같다' },
    ],

    examples: [
      {
        ko: '이 옷은 저한테 좀 큰 것 같아요.',
        highlight: '큰 것 같아요',
        gloss: {
          ko: '이 옷은 저한테 좀 큰 것 같아요.',
          uz: 'Menimcha, bu kiyim menga biroz katta.',
          en: 'I think these clothes are a little big on me.',
          ru: 'Мне кажется, эта одежда мне немного велика.',
        },
      },
      {
        ko: '이 바지는 조금 긴 것 같아요.',
        highlight: '긴 것 같아요',
        gloss: {
          ko: '이 바지는 조금 긴 것 같아요.',
          uz: 'Menimcha, bu shim biroz uzun.',
          en: 'These pants seem a little long.',
          ru: 'Кажется, эти брюки немного длинные.',
        },
      },
      {
        ko: '검은색보다 파란색이 더 잘 어울리는 것 같아요.',
        highlight: '잘 어울리는 것 같아요',
        gloss: {
          ko: '검은색보다 파란색이 더 잘 어울리는 것 같아요.',
          uz: 'Menimcha, qora rangdan ko‘ra ko‘k rang sizga ko‘proq yarashadi.',
          en: 'I think blue suits you better than black.',
          ru: 'Мне кажется, синий подходит вам лучше, чем чёрный.',
        },
      },
      {
        ko: '이 신발은 생각보다 비싼 것 같아요.',
        highlight: '비싼 것 같아요',
        gloss: {
          ko: '이 신발은 생각보다 비싼 것 같아요.',
          uz: 'Menimcha, bu poyabzal o‘ylaganimdan qimmatroq.',
          en: 'These shoes seem more expensive than I expected.',
          ru: 'Кажется, эти туфли дороже, чем я ожидал.',
        },
      },
      {
        ko: '저기 있는 사람이 이 가게 직원인 것 같아요.',
        highlight: '직원인 것 같아요',
        gloss: {
          ko: '저기 있는 사람이 이 가게 직원인 것 같아요.',
          uz: 'Menimcha, u yerdagi odam shu do‘kon xodimi.',
          en: 'I think that person over there is a store employee.',
          ru: 'Кажется, тот человек — сотрудник этого магазина.',
        },
      },
      {
        ko: '밖에 비가 오는 것 같아요.',
        highlight: '비가 오는 것 같아요',
        gloss: {
          ko: '밖에 비가 오는 것 같아요.',
          uz: 'Tashqarida yomg‘ir yog‘ayotganga o‘xshaydi.',
          en: 'It seems to be raining outside.',
          ru: 'Кажется, на улице идёт дождь.',
        },
      },
      {
        ko: '이 사이즈는 저한테 조금 작은 것 같아요.',
        highlight: '작은 것 같아요',
        gloss: {
          ko: '이 사이즈는 저한테 조금 작은 것 같아요.',
          uz: 'Menimcha, bu o‘lcham menga biroz kichik.',
          en: 'I think this size is a little small for me.',
          ru: 'Мне кажется, этот размер мне немного мал.',
        },
      },
      {
        ko: '주말이라서 백화점에 사람이 많은 것 같아요.',
        highlight: '사람이 많은 것 같아요',
        gloss: {
          ko: '주말이라서 백화점에 사람이 많은 것 같아요.',
          uz: 'Dam olish kuni bo‘lgani uchun savdo markazida odam ko‘pga o‘xshaydi.',
          en: 'It seems crowded at the department store because it is the weekend.',
          ru: 'Похоже, в универмаге много людей, потому что сегодня выходной.',
        },
      },
      {
        ko: '이 디자인은 저한테 잘 어울리지 않는 것 같아요.',
        highlight: '잘 어울리지 않는 것 같아요',
        gloss: {
          ko: '이 디자인은 저한테 잘 어울리지 않는 것 같아요.',
          uz: 'Menimcha, bu dizayn menga unchalik yarashmaydi.',
          en: 'I do not think this design suits me very well.',
          ru: 'Мне кажется, этот дизайн мне не очень подходит.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이 옷은 어떠세요?',
        highlight: '어떠세요',
        gloss: {
          ko: '이 옷은 어떠세요?',
          uz: 'Bu kiyim qanday?',
          en: 'How is this outfit?',
          ru: 'Как вам эта одежда?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '예쁘기는 한데 저한테 좀 큰 것 같아요.',
        highlight: '큰 것 같아요',
        gloss: {
          ko: '예쁘기는 한데 저한테 좀 큰 것 같아요.',
          uz: 'Chiroyli, lekin menimcha menga biroz katta.',
          en: 'It is pretty, but I think it is a little big on me.',
          ru: 'Она красивая, но, кажется, мне немного велика.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '그럼 한 사이즈 작은 걸 입어 보시겠어요?',
        highlight: '한 사이즈 작은 걸',
        gloss: {
          ko: '그럼 한 사이즈 작은 걸 입어 보시겠어요?',
          uz: 'Unda bir o‘lcham kichigini kiyib ko‘rasizmi?',
          en: 'Would you like to try one size smaller?',
          ru: 'Тогда хотите примерить на размер меньше?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네. 그게 더 잘 맞는 것 같아요.',
        highlight: '잘 맞는 것 같아요',
        gloss: {
          ko: '네. 그게 더 잘 맞는 것 같아요.',
          uz: 'Ha, menimcha, u yaxshiroq mos keladi.',
          en: 'Yes. I think that one fits better.',
          ru: 'Да. Мне кажется, тот размер подходит лучше.',
        },
      },
    ],

    similar: {
      pattern: 'A/V-네요',
      note: {
        ko: '"-네요"는 직접 보고 새롭게 알게 된 사실이나 느낌에 반응하는 표현이고, "것 같다"는 관찰한 정보를 바탕으로 확실하지 않은 판단이나 추측을 말해요. "옷이 크네요"는 직접 느낀 반응이고, "옷이 큰 것 같아요"는 조금 조심스러운 판단이에요.',
        uz: '"-네요" yangi sezilgan holatga bevosita munosabat bildiradi, "것 같다" esa ehtiyotkor taxmin yoki fikrni bildiradi.',
        en: '-네요 reacts to something newly noticed, whereas 것 같다 presents a less certain judgment or inference.',
        ru: '-네요 выражает непосредственную реакцию на замеченный факт, а 것 같다 — более осторожное предположение.',
      },
    },

    cautions: [
      {
        ko: '형용사에 동사형 "-는 것 같다"를 쓰지 않아요. "옷이 크는 것 같아요"가 아니라 "옷이 큰 것 같아요"예요.',
        uz: 'Sifatga "-는 것 같다" ishlatilmaydi. "크는 것 같다" emas, "큰 것 같다".',
        en: 'Do not use the verb form with adjectives. Say 큰 것 같다, not 크는 것 같다.',
        ru: 'С прилагательным нельзя использовать форму -는 것 같다. Правильно 큰 것 같다.',
      },
      {
        ko: '현재 행동을 말하는 동사에 "-은 것 같다"를 쓰지 않아요. 지금 비가 내리는 상황이면 "비가 온 것 같아요"가 아니라 현재 추측은 "비가 오는 것 같아요"라고 해요.',
        uz: 'Hozirgi harakat uchun "-는 것 같다" ishlatiladi.',
        en: 'For a current action, use -는 것 같다: 비가 오는 것 같아요.',
        ru: 'Для текущего действия используется -는 것 같다: 비가 오는 것 같아요.',
      },
      {
        ko: '명사 뒤에는 "인 것 같다"가 필요해요. "학생 것 같아요"가 아니라 "학생인 것 같아요"예요.',
        uz: 'Ot bilan "인 것 같다": 학생인 것 같다.',
        en: 'Nouns require 인 것 같다: 학생인 것 같다.',
        ru: 'После существительного используется 인 것 같다: 학생인 것 같다.',
      },
      {
        ko: 'ㄹ 받침 형용사는 ㄹ을 그대로 두지 않아요. "길은 것 같아요"가 아니라 "긴 것 같아요"예요.',
        uz: 'ㄹ tushadi: 길다 → 긴 것 같다.',
        en: 'Final ㄹ drops: 길다 → 긴 것 같다.',
        ru: 'Конечный ㄹ выпадает: 길다 → 긴 것 같다.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '이 옷은 저한테 조금 ___ 것 같아요.',
          uz: 'To‘g‘ri shaklni tanlang: 이 옷은 저한테 조금 ___ 것 같아요.',
          en: 'Choose the correct form of 크다.',
          ru: 'Выберите правильную форму от 크다.',
        },
        options: [
          { text: '큰', correct: true },
          { text: '크는', correct: false },
          { text: '크은', correct: false },
          { text: '클', correct: false },
          { text: '크고', correct: false },
        ],
      },
      {
        question: {
          ko: '밖에 비가 ___ 것 같아요.',
          uz: 'Hozirgi harakatni tanlang: 밖에 비가 ___ 것 같아요.',
          en: 'Choose the present-action form: 밖에 비가 ___ 것 같아요.',
          ru: 'Выберите форму текущего действия: 밖에 비가 ___ 것 같아요.',
        },
        options: [
          { text: '오는', correct: true },
          { text: '온', correct: false },
          { text: '올', correct: false },
          { text: '오은', correct: false },
          { text: '오고', correct: false },
        ],
      },
      {
        question: {
          ko: '저분은 이 가게 직원___ 것 같아요.',
          uz: 'Ot bilan to‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after the noun 직원.',
          ru: 'Выберите правильную форму после существительного 직원.',
        },
        options: [
          { text: '인', correct: true },
          { text: '은', correct: false },
          { text: '는', correct: false },
          { text: '일', correct: false },
          { text: '이고', correct: false },
        ],
      },
      {
        question: {
          ko: '"길다"를 현재 상태의 추측으로 바르게 바꾸세요.',
          uz: '"길다" ning to‘g‘ri taxmin shaklini tanlang.',
          en: 'Choose the correct form of 길다 meaning "seems long."',
          ru: 'Выберите правильную форму 길다 со значением «кажется длинным».',
        },
        options: [
          { text: '긴 것 같아요', correct: true },
          { text: '길은 것 같아요', correct: false },
          { text: '길는 것 같아요', correct: false },
          { text: '길인 것 같아요', correct: false },
          { text: '길을 것 같아요', correct: false },
        ],
      },
      {
        question: {
          ko: '주말이라서 백화점에 사람이 ___ 것 같아요.',
          uz: 'Sifatning to‘g‘ri shaklini tanlang: 사람이 ___ 것 같아요.',
          en: 'Choose the correct form of 많다.',
          ru: 'Выберите правильную форму от 많다.',
        },
        options: [
          { text: '많은', correct: true },
          { text: '많는', correct: false },
          { text: '많ㄴ', correct: false },
          { text: '많인', correct: false },
          { text: '많을', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 4-2. N보다
  // ─────────────────────────────────────────────
  {
    code: 'noun-boda-comparison',
    pattern: 'N보다',
    section: 3,
    unit: 4,
    order: 2,
    isActive: true,

    summary: {
      ko: '두 사람이나 사물을 비교할 때 기준이 되는 대상 뒤에 붙여 "~보다"라는 뜻을 나타내요. 보통 "N1보다 N2가 더 A" 형태로 많이 사용해요.',
      uz: 'Ikki odam yoki narsani taqqoslashda mezon bo‘lgan otga qo‘shiladi va "...dan ko‘ra" ma’nosini beradi. Ko‘pincha "N1보다 N2가 더 A" shaklida ishlatiladi.',
      en: 'Marks the standard of comparison and means "than." A very common pattern is "N1보다 N2가 더 A" — "N2 is more A than N1."',
      ru: 'Отмечает объект, с которым производится сравнение, и соответствует «чем». Часто используется конструкция "N1보다 N2가 더 A".',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '비교',
        uz: 'Taqqoslash',
        en: 'Comparison',
        ru: 'Сравнение',
      },
      {
        ko: '조사',
        uz: 'Ko‘makchi',
        en: 'Particle',
        ru: 'Частица',
      },
    ],

    explanation: {
      ko: '"N보다"는 두 사람이나 사물, 장소, 시간 등을 비교할 때 사용하는 조사예요. "보다" 앞에 오는 명사가 비교의 기준이 되고, 다른 대상이 그 기준과 비교돼요.\n\n가장 기본적인 형태는 "N1보다 N2가 더 A"예요. 예를 들어 "이 옷보다 저 옷이 더 싸요"라고 하면 "이 옷"이 비교의 기준이고, "저 옷"이 그보다 더 싸다는 뜻이에요. 영어로는 "That outfit is cheaper than this one"과 비슷해요.\n\n"더"는 비교되는 정도가 더 높다는 것을 분명하게 보여 줘요. 그래서 초급 단계에서는 "보다"와 "더"를 함께 사용해서 "A보다 B가 더 커요", "버스보다 지하철이 더 빨라요" 같은 형태를 익히면 좋아요.\n\n하지만 실제 한국어에서는 문맥상 비교 의미가 분명하면 "더"를 생략하기도 해요. "이게 그것보다 싸요"도 자연스러워요. 반대로 비교 기준이 문맥에서 이미 분명하면 "보다"가 있는 부분이 생략되기도 하지만, 처음 배울 때는 완전한 형태를 익히는 것이 안전해요.\n\n"보다"는 받침 여부와 상관없이 명사 뒤에 그대로 붙어요. "옷보다", "가방보다", "커피보다", "서울보다"처럼 형태가 바뀌지 않아요.\n\n쇼핑에서는 가격, 크기, 길이, 색, 디자인, 편안함을 비교할 때 아주 유용해요. "이 가방이 저 가방보다 더 커요", "검은색보다 흰색이 더 잘 어울려요", "백화점보다 시장이 더 싸요"처럼 바로 사용할 수 있어요.\n\n문장 순서도 주의해야 해요. "A보다 B가 더 크다"는 B가 A보다 크다는 뜻이에요. 학습자들이 A와 B를 반대로 이해하는 경우가 많아서 비교의 기준이 항상 "보다" 앞에 있다는 것을 기억해야 해요.',
      uz: '"N보다" ikki odam, narsa, joy yoki vaqtni taqqoslashda ishlatiladi. "보다" oldidagi ot taqqoslash mezoni bo‘ladi.\n\nAsosiy shakl "N1보다 N2가 더 A". Masalan, "이 옷보다 저 옷이 더 싸요" — u kiyim bu kiyimdan arzonroq degani.\n\n"더" farqning yuqoriroq darajasini ko‘rsatadi. Boshlang‘ich bosqichda "보다" va "더" ni birga ishlatish qulay.\n\n"보다" 받침 ga qarab o‘zgarmaydi: 옷보다, 가방보다, 커피보다.\n\nXarid vaqtida narx, o‘lcham, rang yoki qulaylikni taqqoslash uchun juda foydali.',
      en: '"N보다" is a comparison particle. The noun before 보다 serves as the standard against which another person, object, place, or time is compared.\n\nThe basic pattern is "N1보다 N2가 더 A." In "이 옷보다 저 옷이 더 싸요," this outfit is the comparison standard and that outfit is cheaper than it.\n\n더 explicitly marks the greater degree and is very commonly taught together with 보다. In natural Korean, 더 can sometimes be omitted when the comparison is already obvious.\n\n보다 does not change according to final consonants: 옷보다, 가방보다, 커피보다.\n\nThe pattern is especially useful in shopping for comparing price, size, length, color, design, and comfort. Remember that in "A보다 B가 더 크다," B is larger than A.',
      ru: '"N보다" — частица сравнения. Существительное перед 보다 является 기준ом, то есть объектом, с которым сравнивают другой объект.\n\nОсновная модель — "N1보다 N2가 더 A". Например, "이 옷보다 저 옷이 더 싸요" означает, что та одежда дешевле этой.\n\n더 подчёркивает большую степень признака и часто употребляется вместе с 보다. В естественной речи 더 иногда можно опустить, если сравнение и так понятно.\n\nФорма 보다 не зависит от 받침: 옷보다, 가방보다, 커피보다.\n\nВ магазине конструкция особенно полезна при сравнении цены, размера, длины, цвета и удобства.',
    },

    conjugationRule: {
      ko: '비교 기준 N + 보다  ·  N1보다 N2가 더 A',
      uz: 'Taqqoslash mezoni N + 보다  ·  N1보다 N2가 더 A',
      en: 'comparison standard N + 보다  ·  N1보다 N2가 더 A',
      ru: 'объект сравнения N + 보다  ·  N1보다 N2가 더 A',
    },

    conjugations: [
      { base: '이 옷', result: '이 옷보다' },
      { base: '저 가방', result: '저 가방보다' },
      { base: '백화점', result: '백화점보다' },
      { base: '시장', result: '시장보다' },
      { base: '버스', result: '버스보다' },
      { base: '지하철', result: '지하철보다' },
      { base: '서울', result: '서울보다' },
      { base: '겨울', result: '겨울보다' },
      { base: '커피', result: '커피보다' },
      { base: '검은색', result: '검은색보다' },
    ],

    examples: [
      {
        ko: '이 옷보다 저 옷이 더 싸요.',
        highlight: '이 옷보다',
        gloss: {
          ko: '이 옷보다 저 옷이 더 싸요.',
          uz: 'U kiyim bu kiyimdan arzonroq.',
          en: 'That outfit is cheaper than this one.',
          ru: 'Та одежда дешевле этой.',
        },
      },
      {
        ko: '이 가방이 저 가방보다 더 커요.',
        highlight: '저 가방보다',
        gloss: {
          ko: '이 가방이 저 가방보다 더 커요.',
          uz: 'Bu sumka u sumkadan kattaroq.',
          en: 'This bag is bigger than that bag.',
          ru: 'Эта сумка больше той.',
        },
      },
      {
        ko: '검은색보다 파란색이 더 잘 어울려요.',
        highlight: '검은색보다',
        gloss: {
          ko: '검은색보다 파란색이 더 잘 어울려요.',
          uz: 'Ko‘k rang qora rangdan ko‘ra ko‘proq yarashadi.',
          en: 'Blue suits you better than black.',
          ru: 'Синий подходит вам лучше, чем чёрный.',
        },
      },
      {
        ko: '백화점보다 시장이 물건이 더 싼 편이에요.',
        highlight: '백화점보다',
        gloss: {
          ko: '백화점보다 시장이 물건이 더 싼 편이에요.',
          uz: 'Bozorda mahsulotlar univermagdagidan arzonroq bo‘ladi.',
          en: 'Things tend to be cheaper at markets than at department stores.',
          ru: 'На рынке товары обычно дешевле, чем в универмаге.',
        },
      },
      {
        ko: '버스보다 지하철이 더 빨라요.',
        highlight: '버스보다',
        gloss: {
          ko: '버스보다 지하철이 더 빨라요.',
          uz: 'Metro avtobusdan tezroq.',
          en: 'The subway is faster than the bus.',
          ru: 'Метро быстрее автобуса.',
        },
      },
      {
        ko: '어제보다 오늘이 날씨가 더 따뜻해요.',
        highlight: '어제보다',
        gloss: {
          ko: '어제보다 오늘이 날씨가 더 따뜻해요.',
          uz: 'Bugun kechagidan iliqroq.',
          en: 'It is warmer today than yesterday.',
          ru: 'Сегодня теплее, чем вчера.',
        },
      },
      {
        ko: '큰 사이즈보다 작은 사이즈가 저한테 더 잘 맞아요.',
        highlight: '큰 사이즈보다',
        gloss: {
          ko: '큰 사이즈보다 작은 사이즈가 저한테 더 잘 맞아요.',
          uz: 'Menga katta o‘lchamdan ko‘ra kichikroq o‘lcham yaxshiroq mos keladi.',
          en: 'The smaller size fits me better than the larger size.',
          ru: 'Меньший размер подходит мне лучше, чем большой.',
        },
      },
      {
        ko: '온라인 쇼핑보다 직접 가게에서 사는 것을 더 좋아해요.',
        highlight: '온라인 쇼핑보다',
        gloss: {
          ko: '온라인 쇼핑보다 직접 가게에서 사는 것을 더 좋아해요.',
          uz: 'Onlayn xariddan ko‘ra do‘konda bevosita xarid qilishni ko‘proq yoqtiraman.',
          en: 'I prefer shopping in a physical store to shopping online.',
          ru: 'Я больше люблю покупать в обычном магазине, чем онлайн.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이 두 개 중에서 어떤 게 더 나아요?',
        highlight: '어떤 게 더 나아요',
        gloss: {
          ko: '이 두 개 중에서 어떤 게 더 나아요?',
          uz: 'Bu ikkisidan qaysi biri yaxshiroq?',
          en: 'Which of these two is better?',
          ru: 'Что из этих двух лучше?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '저는 검은색보다 파란색이 더 좋은 것 같아요.',
        highlight: '검은색보다',
        gloss: {
          ko: '저는 검은색보다 파란색이 더 좋은 것 같아요.',
          uz: 'Menimcha, qora rangdan ko‘ra ko‘k rang yaxshiroq.',
          en: 'I think blue is better than black.',
          ru: 'Мне кажется, синий лучше чёрного.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '가격은 어때요?',
        highlight: '가격은 어때요',
        gloss: {
          ko: '가격은 어때요?',
          uz: 'Narxi-chi?',
          en: 'What about the price?',
          ru: 'А как насчёт цены?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '파란색이 검은색보다 만 원 더 싸요.',
        highlight: '검은색보다',
        gloss: {
          ko: '파란색이 검은색보다 만 원 더 싸요.',
          uz: 'Ko‘k rang qoradan 10 000 von arzonroq.',
          en: 'The blue one is 10,000 won cheaper than the black one.',
          ru: 'Синий вариант на 10 000 вон дешевле чёрного.',
        },
      },
    ],

    similar: {
      pattern: 'N 중에서 제일',
      note: {
        ko: '"보다"는 보통 두 대상을 직접 비교할 때 사용하고, "N 중에서 제일"은 여러 대상 가운데 가장 높은 정도를 말할 때 사용해요. "A보다 B가 더 싸요"와 "세 가방 중에서 이게 제일 싸요"처럼 구별해요.',
        uz: '"보다" odatda ikki narsani taqqoslaydi, "중에서 제일" esa bir nechta narsadan eng yuqori darajani tanlaydi.',
        en: '보다 normally compares two items, while 중에서 제일 identifies the highest degree among several items.',
        ru: '보다 обычно используется для сравнения двух объектов, а 중에서 제일 — для выбора самого выраженного признака среди нескольких.',
      },
    },

    cautions: [
      {
        ko: '"A보다 B가 더 크다"에서는 B가 더 큰 대상이에요. 비교 기준인 A와 결과인 B를 반대로 이해하지 않도록 주의해요.',
        uz: '"A보다 B가 더 크다" da B kattaroq.',
        en: 'In "A보다 B가 더 크다," B is the larger item.',
        ru: 'В конструкции "A보다 B가 더 크다" больше именно B.',
      },
      {
        ko: '"보다"는 명사 뒤에 붙여 써요. "이 옷 보다"보다 "이 옷보다"처럼 조사로 붙여 쓰는 것이 맞아요.',
        uz: '보다 otga qo‘shib yoziladi: 이 옷보다.',
        en: '보다 is a particle and attaches to the noun: 이 옷보다.',
        ru: '보다 — частица и пишется вместе с существительным: 이 옷보다.',
      },
      {
        ko: '두 대상을 모두 "보다"와 함께 쓰지 않아요. "이 옷보다 저 옷보다 더 싸요"가 아니라 "이 옷보다 저 옷이 더 싸요"예요.',
        uz: 'Faqat taqqoslash mezoniga 보다 qo‘shiladi.',
        en: 'Attach 보다 only to the comparison standard: 이 옷보다 저 옷이 더 싸요.',
        ru: '보다 присоединяется только к объекту сравнения.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '이 옷___ 저 옷이 더 싸요.',
          uz: 'Taqqoslash qo‘shimchasini tanlang.',
          en: 'Choose the comparison particle.',
          ru: 'Выберите частицу сравнения.',
        },
        options: [
          { text: '보다', correct: true },
          { text: '에서', correct: false },
          { text: '에게', correct: false },
          { text: '동안', correct: false },
          { text: '이나', correct: false },
        ],
      },
      {
        question: {
          ko: '버스보다 지하철이 ___ 빨라요.',
          uz: 'Taqqoslashda "ko‘proq" ma’nosini tanlang.',
          en: 'Choose the word meaning "more" in a comparison.',
          ru: 'Выберите слово со значением «более».',
        },
        options: [
          { text: '더', correct: true },
          { text: '아주', correct: false },
          { text: '조금도', correct: false },
          { text: '아직', correct: false },
          { text: '먼저', correct: false },
        ],
      },
      {
        question: {
          ko: '"A보다 B가 더 커요"의 뜻으로 맞는 것을 고르세요.',
          uz: '"A보다 B가 더 커요" ma’nosini tanlang.',
          en: 'Choose the correct meaning of "A보다 B가 더 커요."',
          ru: 'Выберите правильное значение "A보다 B가 더 커요".',
        },
        options: [
          { text: 'B가 A보다 커요', correct: true },
          { text: 'A가 B보다 커요', correct: false },
          { text: 'A와 B가 같아요', correct: false },
          { text: 'A만 커요', correct: false },
          { text: 'B가 작아요', correct: false },
        ],
      },
      {
        question: {
          ko: '검은색___ 파란색이 더 잘 어울려요.',
          uz: 'To‘g‘ri taqqoslash shaklini tanlang.',
          en: 'Choose the correct comparison form.',
          ru: 'Выберите правильную сравнительную форму.',
        },
        options: [
          { text: '보다', correct: true },
          { text: '에서', correct: false },
          { text: '처럼', correct: false },
          { text: '까지', correct: false },
          { text: '마다', correct: false },
        ],
      },
      {
        question: {
          ko: '백화점보다 시장이 물건이 ___ 싸요.',
          uz: 'To‘g‘ri so‘zni tanlang.',
          en: 'Choose the correct word.',
          ru: 'Выберите правильное слово.',
        },
        options: [
          { text: '더', correct: true },
          { text: '제일도', correct: false },
          { text: '다시', correct: false },
          { text: '아직', correct: false },
          { text: '먼저', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 4-3.
  // A/V-았으면/었으면 좋겠다
  // ─────────────────────────────────────────────
  {
    code: 'av-at-eot-eumyeon-joketda',
    pattern: 'A/V-았으면/었으면 좋겠다',
    section: 3,
    unit: 4,
    order: 3,
    isActive: true,

    summary: {
      ko: '어떤 상황이 그렇게 되기를 바라거나 희망할 때 사용해요. 형태는 과거형처럼 보이지만 반드시 과거를 뜻하는 것은 아니고, 현재나 미래에 대한 바람을 나타내는 경우가 많아요.',
      uz: 'Biror vaziyat shunday bo‘lishini istash yoki umid qilishda ishlatiladi. Shakli o‘tgan zamonga o‘xshasa ham, ko‘pincha hozirgi yoki kelajakdagi istakni bildiradi.',
      en: 'Expresses a wish or hope that a situation will be a certain way. Although the form resembles the past tense, it often refers to a present or future wish.',
      ru: 'Выражает желание или надежду на определённую ситуацию. Хотя форма похожа на прошедшее время, чаще она обозначает желание относительно настоящего или будущего.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '희망',
        uz: 'Umid',
        en: 'Hope',
        ru: 'Надежда',
      },
      {
        ko: '바람',
        uz: 'Istak',
        en: 'Wish',
        ru: 'Желание',
      },
    ],

    explanation: {
      ko: '"A/V-았으면/었으면 좋겠다"는 어떤 행동이 이루어지거나 어떤 상태가 그렇게 되기를 바랄 때 사용하는 표현이에요. 자연스럽게 번역하면 "~하면 좋겠다", "~였으면 좋겠다", "I hope...", "I wish..." 정도의 의미가 돼요.\n\n예를 들어 옷을 교환하면서 "조금 더 작은 사이즈가 있었으면 좋겠어요"라고 하면 작은 사이즈가 실제로 있는지는 모르지만 있기를 바란다는 뜻이에요. "날씨가 따뜻했으면 좋겠어요"는 앞으로 날씨가 따뜻하기를 바라는 말이에요.\n\n형태는 "-아/어요" 활용과 비슷하게 생각할 수 있어요. 어간의 마지막 모음이 ㅏ나 ㅗ 계열이면 보통 "-았으면 좋겠다"를 사용해요. "작다 → 작았으면 좋겠다", "많다 → 많았으면 좋겠다", "가다 → 갔으면 좋겠다"처럼 활용해요.\n\n그 밖의 모음에는 "-었으면 좋겠다"를 사용해요. "먹다 → 먹었으면 좋겠다", "입다 → 입었으면 좋겠다", "넓다 → 넓었으면 좋겠다"가 돼요. 하다 동사는 "했으면 좋겠다"로 바뀌어서 "공부하다 → 공부했으면 좋겠다", "운동하다 → 운동했으면 좋겠다"처럼 사용해요.\n\n중요한 점은 이 형태가 겉으로는 "-았/었-"이라는 과거 형태를 가지고 있지만 반드시 과거 이야기가 아니라는 거예요. "내일 날씨가 좋았으면 좋겠어요"는 내일에 대한 미래의 희망이에요. 이때 "-았/었으면"은 실제 과거라기보다 현실과 조금 거리를 둔 가정적인 바람을 나타낸다고 이해하면 좋아요.\n\n자신의 바람뿐 아니라 다른 사람에게 어떤 행동을 해 주기를 바랄 때도 사용할 수 있어요. "친구가 같이 갔으면 좋겠어요", "사람들이 약속 시간을 잘 지켰으면 좋겠어요"처럼 말할 수 있어요.\n\n쇼핑이나 교환 상황에서도 매우 유용해요. "색이 조금 더 밝았으면 좋겠어요", "소매가 조금 짧았으면 좋겠어요", "다른 사이즈가 있었으면 좋겠어요"처럼 원하는 조건을 너무 직접적으로 요구하지 않고 부드럽게 표현할 수 있어요.\n\n"V-고 싶다"와도 차이가 있어요. "-고 싶다"는 주로 내가 직접 하고 싶은 행동을 말해요. "저는 새 옷을 사고 싶어요"처럼요. 반면 "-았/었으면 좋겠다"는 내가 직접 하는 행동뿐 아니라 어떤 상황 자체가 그렇게 되기를 바랄 때 사용할 수 있어요. "옷이 조금 더 쌌으면 좋겠어요", "친구가 같이 왔으면 좋겠어요"처럼 주어의 범위가 더 넓어요.',
      uz: '"A/V-았으면/었으면 좋겠다" biror ish sodir bo‘lishini yoki vaziyat ma’lum holatda bo‘lishini istashda ishlatiladi.\n\nMasalan, "조금 더 작은 사이즈가 있었으면 좋겠어요" — kichikroq o‘lcham bo‘lishini istayman degani. Uning bor yoki yo‘qligi aniq emas.\n\nOxirgi unli ㅏ yoki ㅗ bo‘lsa odatda "-았으면 좋겠다": 작다 → 작았으면 좋겠다, 가다 → 갔으면 좋겠다. Boshqa hollarda "-었으면 좋겠다": 먹다 → 먹었으면 좋겠다, 넓다 → 넓었으면 좋겠다. 하다 → 했으면 좋겠다.\n\nShaklda o‘tgan zamon ko‘rinishi bo‘lsa ham, u ko‘pincha kelajak yoki hozirgi istakni bildiradi. Masalan, "내일 날씨가 좋았으면 좋겠어요" kelajak haqidagi umid.\n\n"-고 싶다" ko‘proq so‘zlovchining o‘zi qilmoqchi bo‘lgan harakatni bildiradi. "-았/었으면 좋겠다" esa vaziyat yoki boshqa odamning harakati haqida ham istak bildira oladi.',
      en: '"A/V-았으면/었으면 좋겠다" expresses a wish or hope that an action will happen or a situation will become a certain way.\n\nFor example, "조금 더 작은 사이즈가 있었으면 좋겠어요" means that the speaker hopes a smaller size is available. The speaker does not necessarily know whether one actually exists.\n\nStems associated with ㅏ or ㅗ generally use -았으면 좋겠다: 작다 → 작았으면 좋겠다, 가다 → 갔으면 좋겠다. Other stems generally use -었으면 좋겠다: 먹다 → 먹었으면 좋겠다, 넓다 → 넓었으면 좋겠다. 하다 becomes 했으면 좋겠다.\n\nAlthough the construction contains the past-looking form -았/었-, it very often expresses a present or future wish. "내일 날씨가 좋았으면 좋겠어요" is a hope about tomorrow, not the past.\n\nIt differs from -고 싶다. -고 싶다 normally expresses an action the speaker personally wants to perform, while -았/었으면 좋겠다 can express a wish about an entire situation or another person as well.',
      ru: '"A/V-았으면/었으면 좋겠다" используется, когда говорящий хочет, чтобы действие произошло или ситуация стала определённой.\n\nНапример, "조금 더 작은 사이즈가 있었으면 좋겠어요" означает «Хотелось бы, чтобы был размер поменьше». Говорящий не обязательно знает, имеется ли такой размер.\n\nПосле основ с ㅏ или ㅗ обычно используется -았으면 좋겠다: 작다 → 작았으면 좋겠다, 가다 → 갔으면 좋겠다. В остальных случаях — -었으면 좋겠다: 먹다 → 먹었으면 좋겠다, 넓다 → 넓었으면 좋겠다. 하다 превращается в 했으면 좋겠다.\n\nНесмотря на форму -았/었-, конструкция часто относится к настоящему или будущему. "내일 날씨가 좋았으면 좋겠어요" — это желание относительно завтрашнего дня.\n\nВ отличие от -고 싶다, которое чаще выражает действие, которое сам говорящий хочет совершить, -았/었으면 좋겠다 может выражать желание относительно всей ситуации или действий другого человека.',
    },

    conjugationRule: {
      ko: 'ㅏ/ㅗ 계열 + 았으면 좋겠다  ·  그 외 + 었으면 좋겠다  ·  하다 → 했으면 좋겠다',
      uz: 'ㅏ/ㅗ + 았으면 좋겠다  ·  boshqa unlilar + 었으면 좋겠다  ·  하다 → 했으면 좋겠다',
      en: 'ㅏ/ㅗ stem + 았으면 좋겠다  ·  other vowels + 었으면 좋겠다  ·  하다 → 했으면 좋겠다',
      ru: 'основа с ㅏ/ㅗ + 았으면 좋겠다  ·  остальные + 었으면 좋겠다  ·  하다 → 했으면 좋겠다',
    },

    conjugations: [
      { base: '가다', result: '갔으면 좋겠다' },
      { base: '작다', result: '작았으면 좋겠다' },
      { base: '많다', result: '많았으면 좋겠다' },
      { base: '맞다', result: '맞았으면 좋겠다' },
      { base: '싸다', result: '쌌으면 좋겠다' },

      { base: '먹다', result: '먹었으면 좋겠다' },
      { base: '입다', result: '입었으면 좋겠다' },
      { base: '넓다', result: '넓었으면 좋겠다' },
      { base: '길다', result: '길었으면 좋겠다' },
      { base: '있다', result: '있었으면 좋겠다' },

      { base: '공부하다', result: '공부했으면 좋겠다' },
      { base: '운동하다', result: '운동했으면 좋겠다' },
    ],

    examples: [
      {
        ko: '이 옷이 조금 더 작았으면 좋겠어요.',
        highlight: '작았으면 좋겠어요',
        gloss: {
          ko: '이 옷이 조금 더 작았으면 좋겠어요.',
          uz: 'Bu kiyim biroz kichikroq bo‘lsa yaxshi bo‘lardi.',
          en: 'I wish this outfit were a little smaller.',
          ru: 'Хотелось бы, чтобы эта одежда была немного меньше.',
        },
      },
      {
        ko: '다른 색도 있었으면 좋겠어요.',
        highlight: '있었으면 좋겠어요',
        gloss: {
          ko: '다른 색도 있었으면 좋겠어요.',
          uz: 'Boshqa rang ham bo‘lsa yaxshi bo‘lardi.',
          en: 'I wish they had another color too.',
          ru: 'Хотелось бы, чтобы был ещё другой цвет.',
        },
      },
      {
        ko: '가격이 조금 더 쌌으면 좋겠어요.',
        highlight: '쌌으면 좋겠어요',
        gloss: {
          ko: '가격이 조금 더 쌌으면 좋겠어요.',
          uz: 'Narxi biroz arzonroq bo‘lsa yaxshi bo‘lardi.',
          en: 'I wish the price were a little lower.',
          ru: 'Хотелось бы, чтобы цена была немного ниже.',
        },
      },
      {
        ko: '바지가 조금 더 길었으면 좋겠어요.',
        highlight: '길었으면 좋겠어요',
        gloss: {
          ko: '바지가 조금 더 길었으면 좋겠어요.',
          uz: 'Shim biroz uzunroq bo‘lsa yaxshi bo‘lardi.',
          en: 'I wish the pants were a little longer.',
          ru: 'Хотелось бы, чтобы брюки были немного длиннее.',
        },
      },
      {
        ko: '내일 날씨가 좋았으면 좋겠어요.',
        highlight: '좋았으면 좋겠어요',
        gloss: {
          ko: '내일 날씨가 좋았으면 좋겠어요.',
          uz: 'Ertaga ob-havo yaxshi bo‘lsa edi.',
          en: 'I hope the weather is nice tomorrow.',
          ru: 'Надеюсь, завтра будет хорошая погода.',
        },
      },
      {
        ko: '이번 시험에서 좋은 점수를 받았으면 좋겠어요.',
        highlight: '받았으면 좋겠어요',
        gloss: {
          ko: '이번 시험에서 좋은 점수를 받았으면 좋겠어요.',
          uz: 'Bu imtihonda yaxshi baho olsam edi.',
          en: 'I hope I get a good score on this exam.',
          ru: 'Надеюсь получить хорошую оценку на этом экзамене.',
        },
      },
      {
        ko: '친구도 이번 여행에 같이 갔으면 좋겠어요.',
        highlight: '같이 갔으면 좋겠어요',
        gloss: {
          ko: '친구도 이번 여행에 같이 갔으면 좋겠어요.',
          uz: 'Do‘stim ham bu safarga birga borsa yaxshi bo‘lardi.',
          en: 'I hope my friend can come on this trip too.',
          ru: 'Хотелось бы, чтобы мой друг тоже поехал в эту поездку.',
        },
      },
      {
        ko: '새로 산 신발이 오래 편했으면 좋겠어요.',
        highlight: '편했으면 좋겠어요',
        gloss: {
          ko: '새로 산 신발이 오래 편했으면 좋겠어요.',
          uz: 'Yangi olgan poyabzalim uzoq vaqt qulay bo‘lsa yaxshi.',
          en: 'I hope my new shoes stay comfortable for a long time.',
          ru: 'Надеюсь, новые туфли долго будут удобными.',
        },
      },
      {
        ko: '교환할 수 있는 사이즈가 남아 있었으면 좋겠어요.',
        highlight: '남아 있었으면 좋겠어요',
        gloss: {
          ko: '교환할 수 있는 사이즈가 남아 있었으면 좋겠어요.',
          uz: 'Almashtirish mumkin bo‘lgan o‘lcham qolgan bo‘lsa edi.',
          en: 'I hope they still have a size I can exchange this for.',
          ru: 'Надеюсь, остался размер, на который можно обменять товар.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '어떤 점이 마음에 안 드세요?',
        highlight: '마음에 안 드세요',
        gloss: {
          ko: '어떤 점이 마음에 안 드세요?',
          uz: 'Qaysi tomoni sizga yoqmadi?',
          en: 'What do you not like about it?',
          ru: 'Что именно вам не нравится?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '소매가 조금 더 짧았으면 좋겠어요.',
        highlight: '짧았으면 좋겠어요',
        gloss: {
          ko: '소매가 조금 더 짧았으면 좋겠어요.',
          uz: 'Yengi biroz qisqaroq bo‘lsa yaxshi bo‘lardi.',
          en: 'I wish the sleeves were a little shorter.',
          ru: 'Хотелось бы, чтобы рукава были немного короче.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '한 사이즈 작은 상품으로 교환해 드릴까요?',
        highlight: '교환해 드릴까요',
        gloss: {
          ko: '한 사이즈 작은 상품으로 교환해 드릴까요?',
          uz: 'Bir o‘lcham kichik mahsulotga almashtirib beraymi?',
          en: 'Would you like me to exchange it for one size smaller?',
          ru: 'Обменять вам на размер меньше?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네. 그리고 같은 색이 있었으면 좋겠어요.',
        highlight: '있었으면 좋겠어요',
        gloss: {
          ko: '네. 그리고 같은 색이 있었으면 좋겠어요.',
          uz: 'Ha. Yana shu rang bo‘lsa yaxshi bo‘lardi.',
          en: 'Yes. I hope you have the same color.',
          ru: 'Да. И хотелось бы, чтобы был такой же цвет.',
        },
      },
    ],

    similar: {
      pattern: 'V-고 싶다',
      note: {
        ko: '"V-고 싶다"는 주로 내가 직접 하고 싶은 행동을 말해요. "새 옷을 사고 싶어요"처럼 사용해요. 반면 "-았/었으면 좋겠다"는 행동뿐 아니라 상태나 다른 사람에 대한 바람도 표현할 수 있어요. "옷이 더 쌌으면 좋겠어요", "친구가 같이 왔으면 좋겠어요"처럼 사용할 수 있어요.',
        uz: '"V-고 싶다" ko‘proq so‘zlovchining o‘zi qilmoqchi bo‘lgan ishni bildiradi. "-았/었으면 좋겠다" esa vaziyat yoki boshqa odamga oid istakni ham ifodalaydi.',
        en: '-고 싶다 mainly expresses something the speaker personally wants to do. -았/었으면 좋겠다 can express a wish about a state, situation, or another person as well.',
        ru: '-고 싶다 обычно выражает действие, которое сам говорящий хочет совершить. -았/었으면 좋겠다 может также выражать желание относительно состояния, ситуации или другого человека.',
      },
    },

    cautions: [
      {
        ko: '"내일 날씨가 좋았으면 좋겠어요"의 "-았-"을 실제 과거라고 생각하지 않아요. 이 문장은 내일 날씨에 대한 미래의 바람이에요.',
        uz: 'Bu yerdagi "-았-" haqiqiy o‘tgan zamon emas. Gap kelajakdagi istak haqida.',
        en: 'Do not interpret -았- here as necessarily past. 내일 날씨가 좋았으면 좋겠어요 is a future wish.',
        ru: 'Не воспринимайте -았- здесь обязательно как прошедшее время. Это желание относительно будущего.',
      },
      {
        ko: '하다 동사는 "하었으면"이 아니라 "했으면"으로 활용해요. "공부하었으면 좋겠어요"가 아니라 "공부했으면 좋겠어요"예요.',
        uz: '하다 → 했으면. "하었으면" ishlatilmaydi.',
        en: '하다 becomes 했으면, not 하었으면.',
        ru: '하다 превращается в 했으면, а не 하었으면.',
      },
      {
        ko: '"좋겠다"를 빼면 의미가 달라질 수 있어요. 이 문법에서 바람을 표현하려면 "-았/었으면 좋겠다" 전체를 하나의 표현으로 익히는 것이 좋아요.',
        uz: 'Istak ma’nosi uchun "-았/었으면 좋겠다" ni bir butun shakl sifatida o‘rganing.',
        en: 'Learn -았/었으면 좋겠다 as a full wish construction; removing 좋겠다 can change the function.',
        ru: 'Для значения желания лучше запоминать всю конструкцию -았/었으면 좋겠다 целиком.',
      },
      {
        ko: '내가 직접 하고 싶은 행동만 말할 때는 "-고 싶다"가 더 간단하고 자연스러울 수 있어요. "저는 새 가방을 사고 싶어요"가 기본적인 개인 욕구 표현이에요.',
        uz: 'Faqat o‘zingiz qilmoqchi bo‘lgan ish uchun "-고 싶다" ko‘pincha sodda va tabiiyroq.',
        en: 'For a straightforward action the speaker personally wants to do, -고 싶다 may be simpler and more natural.',
        ru: 'Для простого желания самого говорящего совершить действие часто естественнее -고 싶다.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '이 옷이 조금 더 ___ 좋겠어요.',
          uz: '"Kichikroq bo‘lsa yaxshi" ma’nosini tanlang.',
          en: 'Complete the wish: "I wish this outfit were a little smaller."',
          ru: 'Дополните: «Хотелось бы, чтобы одежда была немного меньше».',
        },
        options: [
          { text: '작았으면', correct: true },
          { text: '작으면만', correct: false },
          { text: '작는데', correct: false },
          { text: '작거나', correct: false },
          { text: '작는다면', correct: false },
        ],
      },
      {
        question: {
          ko: '다른 색도 ___ 좋겠어요.',
          uz: '"Boshqa rang ham bo‘lsa edi" shaklini tanlang.',
          en: 'Choose the form meaning "I hope there is another color too."',
          ru: 'Выберите форму «Хотелось бы, чтобы был другой цвет».',
        },
        options: [
          { text: '있었으면', correct: true },
          { text: '있았으면', correct: false },
          { text: '있는', correct: false },
          { text: '있거나', correct: false },
          { text: '있는데', correct: false },
        ],
      },
      {
        question: {
          ko: '"공부하다"를 바람의 표현으로 바르게 바꾸세요.',
          uz: '"공부하다" ning istak shaklini tanlang.',
          en: 'Choose the correct wish form of 공부하다.',
          ru: 'Выберите правильную форму желания от 공부하다.',
        },
        options: [
          { text: '공부했으면 좋겠어요', correct: true },
          { text: '공부하었으면 좋겠어요', correct: false },
          { text: '공부하는 좋겠어요', correct: false },
          { text: '공부하거나 좋겠어요', correct: false },
          { text: '공부한데 좋겠어요', correct: false },
        ],
      },
      {
        question: {
          ko: '내일 날씨가 ___ 좋겠어요.',
          uz: 'Kelajakdagi umidni ifodalang.',
          en: 'Express the hope that the weather will be good tomorrow.',
          ru: 'Выразите надежду на хорошую погоду завтра.',
        },
        options: [
          { text: '좋았으면', correct: true },
          { text: '좋는다면', correct: false },
          { text: '좋는데', correct: false },
          { text: '좋거나', correct: false },
          { text: '좋인', correct: false },
        ],
      },
      {
        question: {
          ko: '가격이 조금 더 ___ 좋겠어요.',
          uz: '"Narx arzonroq bo‘lsa edi" shaklini tanlang.',
          en: 'Choose the form meaning "I wish the price were a little cheaper."',
          ru: 'Выберите форму «Хотелось бы, чтобы цена была немного ниже».',
        },
        options: [
          { text: '쌌으면', correct: true },
          { text: '싸었으면', correct: false },
          { text: '싸는', correct: false },
          { text: '싸거나', correct: false },
          { text: '싼데', correct: false },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // UNIT 5 — 어디에 가면 좋을까요?
  // 의견·추천 묻기 → 미래 계획·예측 → 이유·근거 → 행동 순서
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 5-1. A/V-(으)ㄹ까요?
  // ─────────────────────────────────────────────
  {
    code: 'av-eulkkayo',
    pattern: 'A/V-(으)ㄹ까요?',
    section: 3,
    unit: 5,
    order: 1,
    isActive: true,

    summary: {
      ko: '어떤 행동을 함께 할지 제안하거나, 앞으로의 일이나 상태에 대해 상대방의 생각을 물을 때 사용해요. 여행에서는 "어디에 갈까요?", "어디가 좋을까요?"처럼 계획과 추천을 의논할 때 매우 자주 써요.',
      uz: 'Biror ishni birga qilishni taklif qilish yoki kelajakdagi voqea va holat haqida suhbatdoshning fikrini so‘rashda ishlatiladi. Sayohatda "Qayerga boramiz?", "Qayer yaxshi bo‘ladi?" kabi savollarda juda ko‘p qo‘llanadi.',
      en: 'Used to suggest doing something together or ask the listener’s opinion about a future action or situation. It is especially common when discussing travel plans and recommendations.',
      ru: 'Используется, чтобы предложить совместное действие или спросить мнение собеседника о будущем действии или состоянии. Особенно часто встречается при обсуждении планов поездки.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '제안',
        uz: 'Taklif',
        en: 'Suggestion',
        ru: 'Предложение',
      },
      {
        ko: '의견',
        uz: 'Fikr',
        en: 'Opinion',
        ru: 'Мнение',
      },
    ],

    explanation: {
      ko: '"A/V-(으)ㄹ까요?"는 상대방에게 어떤 행동을 함께 할지 제안하거나, 앞으로 어떻게 될지에 대해 상대방의 생각을 물을 때 사용하는 표현이에요. 여행 계획을 세울 때 특히 많이 사용하기 때문에 반드시 익혀 두면 좋아요.\n\n동사와 함께 사용하면 가장 대표적인 의미는 "우리 같이 무엇을 할까요?"라는 제안이에요. 예를 들어 "제주도에 갈까요?"는 제주도에 같이 가자는 제안을 상대방에게 조심스럽게 묻는 말이에요. "호텔을 먼저 예약할까요?"는 호텔 예약을 먼저 하는 것이 어떨지 의견을 묻는 표현이고요.\n\n형용사와 사용할 때는 어떤 상태에 대한 추측이나 상대방의 판단을 묻는 경우가 많아요. "제주도는 지금 추울까요?"는 지금 제주도의 날씨가 추운지 상대방도 함께 생각해 보자는 느낌이고, "어디가 좋을까요?"는 여러 여행지 가운데 어디가 좋을지 의견을 묻는 표현이에요.\n\n형태는 받침 여부에 따라 달라져요. 받침이 없는 어간에는 "-ㄹ까요?"를 붙여요. "가다 → 갈까요?", "보다 → 볼까요?", "크다 → 클까요?"처럼 활용해요. 받침이 있는 어간에는 "-을까요?"를 붙여서 "먹다 → 먹을까요?", "읽다 → 읽을까요?", "좋다 → 좋을까요?"처럼 만들어요.\n\nㄹ 받침으로 끝나는 말은 이미 ㄹ이 있기 때문에 ㄹ을 하나 더 붙이지 않아요. "살다 → 살까요?", "멀다 → 멀까요?"처럼 활용해요.\n\n여행 상황에서는 "어디에 갈까요?", "기차를 탈까요?", "며칠 동안 있을까요?", "어떤 호텔이 좋을까요?"처럼 정말 자주 사용할 수 있어요. 둘이 함께 계획을 결정하는 상황에서 특히 자연스러워요.\n\n또 중요한 점은 "-(으)ㄹ까요?"가 무조건 "같이 하자"라는 뜻만 있는 것은 아니라는 거예요. "내일 비가 올까요?"처럼 사람의 의지로 결정할 수 없는 일에도 사용할 수 있어요. 이때는 제안이 아니라 미래에 대한 추측이나 상대방의 의견을 묻는 의미예요.\n\n따라서 문맥을 보면 구별하기 쉬워요. "같이 제주도에 갈까요?"라면 제안이고, "제주도는 내일 추울까요?"라면 추측이에요.',
      uz: '"A/V-(으)ㄹ까요?" biror ishni birga qilishni taklif qilish yoki kelajakdagi holat haqida suhbatdoshning fikrini so‘rash uchun ishlatiladi.\n\nFe’l bilan ishlatilganda ko‘pincha taklif ma’nosini beradi. "제주도에 갈까요?" — "Jejuga boramizmi?" degan yumshoq taklif. "호텔을 먼저 예약할까요?" — mehmonxonani avval band qilish haqidagi fikrni so‘raydi.\n\nSifat bilan kelganda kelajakdagi holat haqida taxmin yoki fikr so‘raladi. "어디가 좋을까요?" — "Qayer yaxshi bo‘ladi?" degani.\n\n받침 bo‘lmasa "-ㄹ까요?": 가다 → 갈까요?, 보다 → 볼까요?. 받침 bo‘lsa "-을까요?": 먹다 → 먹을까요?, 좋다 → 좋을까요?. ㄹ bilan tugagan so‘zga yangi ㄹ qo‘shilmaydi: 살다 → 살까요?.\n\nBu shakl taklifdan tashqari taxmin uchun ham ishlatiladi. "내일 비가 올까요?" — ertaga yomg‘ir yog‘adimi, degan taxmin savoli.',
      en: '"A/V-(으)ㄹ까요?" has two closely related functions. It can suggest a shared action, or it can ask the listener’s opinion about what will happen or what a situation will be like.\n\nWith verbs, it very often means "Shall we...?" For example, "제주도에 갈까요?" suggests going to Jeju together, while "호텔을 먼저 예약할까요?" asks whether booking the hotel first would be a good idea.\n\nWith adjectives, it commonly asks for an opinion or prediction: "어디가 좋을까요?" means "Where would be good?" and "제주도는 지금 추울까요?" asks whether Jeju might be cold now.\n\nAfter vowel-ending stems, add -ㄹ까요?: 가다 → 갈까요?, 보다 → 볼까요?. After most consonant-ending stems, use -을까요?: 먹다 → 먹을까요?, 좋다 → 좋을까요?. Stems ending in ㄹ do not take another ㄹ: 살다 → 살까요?.\n\nThe context determines whether the meaning is suggestion or prediction. "같이 갈까요?" is a suggestion, while "내일 비가 올까요?" is a question about the future.',
      ru: '"A/V-(으)ㄹ까요?" имеет две основные функции: предложение совместного действия и вопрос о мнении или предположении относительно будущего.\n\nС глаголами часто соответствует «Давайте...? / Может, сделаем...?». Например, "제주도에 갈까요?" — мягкое предложение поехать на Чеджудо, а "호텔을 먼저 예약할까요?" — вопрос, стоит ли сначала забронировать гостиницу.\n\nС прилагательными конструкция часто спрашивает мнение или предположение: "어디가 좋을까요?" — «Куда лучше поехать?»\n\nПосле основы без 받침 используется -ㄹ까요?: 가다 → 갈까요?. После большинства основ с 받침 — -을까요?: 먹다 → 먹을까요?, 좋다 → 좋을까요?. После ㄹ второй ㄹ не добавляется: 살다 → 살까요?.\n\nПо контексту определяется, является ли это предложением или предположением. "같이 갈까요?" — предложение, а "내일 비가 올까요?" — предположение о будущем.',
    },

    conjugationRule: {
      ko: '받침 X + ㄹ까요?  ·  받침 O + 을까요?  ·  ㄹ 받침 + 까요?',
      uz: '받침 yo‘q + ㄹ까요?  ·  받침 bor + 을까요?  ·  ㄹ + 까요?',
      en: 'vowel + ㄹ까요?  ·  consonant + 을까요?  ·  ㄹ-final + 까요?',
      ru: 'гласная + ㄹ까요?  ·  согласная + 을까요?  ·  основа на ㄹ + 까요?',
    },

    conjugations: [
      // 받침 O — 5
      { base: '먹다', result: '먹을까요?' },
      { base: '읽다', result: '읽을까요?' },
      { base: '찾다', result: '찾을까요?' },
      { base: '좋다', result: '좋을까요?' },
      { base: '작다', result: '작을까요?' },

      // 받침 X — 5
      { base: '가다', result: '갈까요?' },
      { base: '보다', result: '볼까요?' },
      { base: '타다', result: '탈까요?' },
      { base: '크다', result: '클까요?' },
      { base: '비싸다', result: '비쌀까요?' },

      // ㄹ 받침
      { base: '살다', result: '살까요?' },
      { base: '멀다', result: '멀까요?' },
    ],

    examples: [
      {
        ko: '이번 방학에 제주도에 갈까요?',
        highlight: '제주도에 갈까요',
        gloss: {
          ko: '이번 방학에 제주도에 갈까요?',
          uz: 'Bu ta’tilda Jejuga boramizmi?',
          en: 'Shall we go to Jeju this vacation?',
          ru: 'Поедем на Чеджудо в эти каникулы?',
        },
      },
      {
        ko: '어디에 가면 좋을까요?',
        highlight: '좋을까요',
        gloss: {
          ko: '어디에 가면 좋을까요?',
          uz: 'Qayerga borsak yaxshi bo‘ladi?',
          en: 'Where would be a good place to go?',
          ru: 'Куда лучше поехать?',
        },
      },
      {
        ko: '호텔을 먼저 예약할까요?',
        highlight: '예약할까요',
        gloss: {
          ko: '호텔을 먼저 예약할까요?',
          uz: 'Avval mehmonxonani band qilamizmi?',
          en: 'Shall we book the hotel first?',
          ru: 'Сначала забронируем гостиницу?',
        },
      },
      {
        ko: '비행기를 탈까요, 기차를 탈까요?',
        highlight: '기차를 탈까요',
        gloss: {
          ko: '비행기를 탈까요, 기차를 탈까요?',
          uz: 'Samolyotda boramizmi yoki poyezdda?',
          en: 'Shall we take a plane or a train?',
          ru: 'Полетим на самолёте или поедем на поезде?',
        },
      },
      {
        ko: '여행을 며칠 동안 할까요?',
        highlight: '며칠 동안 할까요',
        gloss: {
          ko: '여행을 며칠 동안 할까요?',
          uz: 'Necha kun sayohat qilamiz?',
          en: 'How many days shall we travel for?',
          ru: 'На сколько дней поедем?',
        },
      },
      {
        ko: '제주도는 다음 주에 추울까요?',
        highlight: '추울까요',
        gloss: {
          ko: '제주도는 다음 주에 추울까요?',
          uz: 'Keyingi hafta Jejuda sovuq bo‘ladimi?',
          en: 'Do you think Jeju will be cold next week?',
          ru: 'Как думаете, на следующей неделе на Чеджудо будет холодно?',
        },
      },
      {
        ko: '주말에는 관광객이 많을까요?',
        highlight: '많을까요',
        gloss: {
          ko: '주말에는 관광객이 많을까요?',
          uz: 'Dam olish kunlari sayyohlar ko‘p bo‘ladimi?',
          en: 'Do you think there will be many tourists on the weekend?',
          ru: 'Как думаете, на выходных будет много туристов?',
        },
      },
      {
        ko: '저녁에는 무엇을 먹을까요?',
        highlight: '무엇을 먹을까요',
        gloss: {
          ko: '저녁에는 무엇을 먹을까요?',
          uz: 'Kechqurun nima yeymiz?',
          en: 'What shall we eat for dinner?',
          ru: 'Что будем есть на ужин?',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이번 휴가에 어디에 갈까요?',
        highlight: '어디에 갈까요',
        gloss: {
          ko: '이번 휴가에 어디에 갈까요?',
          uz: 'Bu ta’tilda qayerga boramiz?',
          en: 'Where shall we go for this vacation?',
          ru: 'Куда поедем в отпуск?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '제주도는 어떨까요?',
        highlight: '어떨까요',
        gloss: {
          ko: '제주도는 어떨까요?',
          uz: 'Jeju qanday?',
          en: 'How about Jeju?',
          ru: 'Как насчёт Чеджудо?',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '좋아요. 비행기를 탈까요?',
        highlight: '비행기를 탈까요',
        gloss: {
          ko: '좋아요. 비행기를 탈까요?',
          uz: 'Yaxshi. Samolyotda boramizmi?',
          en: 'Sounds good. Shall we fly?',
          ru: 'Хорошо. Полетим на самолёте?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네. 오늘 표를 예약할까요?',
        highlight: '예약할까요',
        gloss: {
          ko: '네. 오늘 표를 예약할까요?',
          uz: 'Ha. Chiptani bugun band qilamizmi?',
          en: 'Yes. Shall we book the tickets today?',
          ru: 'Да. Забронируем билеты сегодня?',
        },
      },
    ],

    similar: {
      pattern: 'V-(으)ㄹ래요?',
      note: {
        ko: '"-(으)ㄹ까요?"는 함께 무엇을 할지 의논하거나 의견을 물을 때 자연스럽고, "-(으)ㄹ래요?"는 상대방이 직접 무엇을 하고 싶은지 의사를 묻는 느낌이 더 강해요.',
        uz: '"-(으)ㄹ까요?" birgalikdagi reja yoki fikrni muhokama qiladi, "-(으)ㄹ래요?" esa suhbatdoshning xohishini ko‘proq so‘raydi.',
        en: '"-(으)ㄹ까요?" is natural for discussing a shared decision, while "-(으)ㄹ래요?" more directly asks what the listener wants to do.',
        ru: '"-(으)ㄹ까요?" используется при совместном обсуждении, а "-(으)ㄹ래요?" сильнее спрашивает личное желание собеседника.',
      },
    },

    cautions: [
      {
        ko: '받침 있는 동사에 바로 "-ㄹ까요"를 붙이지 않아요. "먹ㄹ까요?"가 아니라 "먹을까요?"예요.',
        uz: '받침 bilan "-을까요?" ishlatiladi: 먹을까요?',
        en: 'Most consonant-ending stems require 을까요?: 먹을까요?',
        ru: 'После большинства основ с согласным используется 을까요?: 먹을까요?',
      },
      {
        ko: 'ㄹ 받침에는 ㄹ을 하나 더 붙이지 않아요. "살ㄹ까요?"가 아니라 "살까요?"예요.',
        uz: 'ㄹ bilan tugagan fe’lga yana ㄹ qo‘shilmaydi.',
        en: 'Do not add another ㄹ after an ㄹ-final stem: 살까요?',
        ru: 'После основы на ㄹ второй ㄹ не добавляется: 살까요?',
      },
      {
        ko: '"내일 비가 올까요?"는 함께 비를 오게 하자는 제안이 아니에요. 사람이 결정할 수 없는 일에서는 미래에 대한 추측을 나타내요.',
        uz: '"내일 비가 올까요?" taklif emas, kelajak haqidagi taxmin.',
        en: '"내일 비가 올까요?" is a prediction question, not a suggestion.',
        ru: '"내일 비가 올까요?" — вопрос-предположение, а не предложение.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '이번 주말에 제주도에 가___?',
          uz: 'Taklif shaklini tanlang: 제주도에 가___?',
          en: 'Choose the suggestion form: 제주도에 가___?',
          ru: 'Выберите форму предложения: 제주도에 가___?',
        },
        options: [
          { text: 'ㄹ까요', correct: true },
          { text: '을까요', correct: false },
          { text: '는데요', correct: false },
          { text: '니까요', correct: false },
          { text: '거나요', correct: false },
        ],
      },
      {
        question: {
          ko: '저녁에 무엇을 먹___?',
          uz: 'To‘g‘ri shaklni tanlang: 무엇을 먹___?',
          en: 'Choose the correct form after 먹다.',
          ru: 'Выберите правильную форму после 먹다.',
        },
        options: [
          { text: '을까요', correct: true },
          { text: 'ㄹ까요', correct: false },
          { text: '는데', correct: false },
          { text: '으니까', correct: false },
          { text: '거나', correct: false },
        ],
      },
      {
        question: {
          ko: '어디가 좋___?',
          uz: 'To‘g‘ri shaklni tanlang: 어디가 좋___?',
          en: 'Choose the correct form: 어디가 좋___?',
          ru: 'Выберите правильную форму: 어디가 좋___?',
        },
        options: [
          { text: '을까요', correct: true },
          { text: 'ㄹ까요', correct: false },
          { text: '는데', correct: false },
          { text: '으려고', correct: false },
          { text: '으면', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다"를 "-(으)ㄹ까요?"로 바르게 바꾸세요.',
          uz: '"살다" ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct -(으)ㄹ까요? form of 살다.',
          ru: 'Выберите правильную форму 살다.',
        },
        options: [
          { text: '살까요?', correct: true },
          { text: '살을까요?', correct: false },
          { text: '살ㄹ까요?', correct: false },
          { text: '사는까요?', correct: false },
          { text: '산까요?', correct: false },
        ],
      },
      {
        question: {
          ko: '내일 비가 올까요?에서 "-(으)ㄹ까요?"는 무엇을 나타내요?',
          uz: 'Bu gapdagi ma’noni tanlang.',
          en: 'What does -(으)ㄹ까요? mean in "내일 비가 올까요?"',
          ru: 'Что выражает -(으)ㄹ까요? в "내일 비가 올까요?"',
        },
        options: [
          { text: '미래에 대한 추측', correct: true },
          { text: '과거 경험', correct: false },
          { text: '명사의 선택', correct: false },
          { text: '행동의 완료', correct: false },
          { text: '소유 관계', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 5-2. A/V-(으)ㄹ 거예요
  // ─────────────────────────────────────────────
  {
    code: 'av-eul-geoyeyo',
    pattern: 'A/V-(으)ㄹ 거예요',
    section: 3,
    unit: 5,
    order: 2,
    isActive: true,

    summary: {
      ko: '앞으로 할 계획이나 미래에 일어날 일을 말할 때 사용해요. 동사에서는 계획·의도를, 형용사에서는 미래 상태에 대한 예상이나 추측을 나타내는 경우가 많아요.',
      uz: 'Kelajakdagi reja yoki sodir bo‘ladigan voqeani aytishda ishlatiladi. Fe’llarda ko‘pincha reja va niyatni, sifatlarda esa kelajakdagi holat haqidagi taxminni bildiradi.',
      en: 'Used to talk about future plans or events. With verbs it often expresses intention or plans; with adjectives it commonly expresses a prediction about a future state.',
      ru: 'Используется для планов и событий в будущем. С глаголами часто выражает намерение, а с прилагательными — прогноз относительно будущего состояния.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '미래',
        uz: 'Kelajak',
        en: 'Future',
        ru: 'Будущее',
      },
      {
        ko: '계획',
        uz: 'Reja',
        en: 'Plan',
        ru: 'План',
      },
    ],

    explanation: {
      ko: '"A/V-(으)ㄹ 거예요"는 앞으로 일어날 행동이나 상태를 말할 때 사용하는 대표적인 미래 표현이에요. 여행 계획을 설명할 때 아주 많이 사용해요.\n\n동사와 함께 사용하면 말하는 사람의 계획이나 의도를 나타내는 경우가 많아요. "이번 방학에 제주도에 갈 거예요"는 이미 제주도에 갈 계획이 있다는 뜻이에요. "호텔에서 이틀 동안 묵을 거예요"는 앞으로 호텔에서 이틀을 보낼 예정이라는 뜻이고요.\n\n형용사와 사용하면 미래 상태에 대한 예상이나 추측이 되는 경우가 많아요. "제주도는 다음 주에 추울 거예요"라고 하면 다음 주의 날씨가 추울 것이라고 예상하는 거예요. "주말에는 사람이 많을 거예요"도 주말의 상황을 예측하는 표현이에요.\n\n받침이 없는 어간에는 "-ㄹ 거예요"를 붙여요. "가다 → 갈 거예요", "보다 → 볼 거예요", "크다 → 클 거예요"가 돼요. 받침이 있는 어간에는 "-을 거예요"를 붙여서 "먹다 → 먹을 거예요", "읽다 → 읽을 거예요", "좋다 → 좋을 거예요"처럼 만들어요.\n\nㄹ 받침으로 끝나는 경우에는 새로운 ㄹ을 하나 더 붙이지 않아요. "살다 → 살 거예요", "멀다 → 멀 거예요"처럼 활용해요.\n\n"-(으)ㄹ 거예요"는 단순히 영어의 will 하나로만 외우면 부족해요. 주어와 상황에 따라 계획, 의지, 예상이라는 의미가 달라질 수 있어요. "저는 내일 출발할 거예요"는 나의 계획에 가깝지만, "내일 비가 올 거예요"는 미래에 대한 예상이에요.\n\n여행에서는 "어디에서 잘 거예요?", "며칠 있을 거예요?", "무엇을 볼 거예요?", "언제 돌아올 거예요?"처럼 여행 계획을 묻고 답할 때 매우 유용해요.',
      uz: '"A/V-(으)ㄹ 거예요" kelajakdagi harakat yoki holatni ifodalovchi asosiy shakllardan biri.\n\nFe’l bilan ko‘pincha reja yoki niyatni bildiradi: "제주도에 갈 거예요" — Jejuga borishni rejalashtirganman. Sifat bilan esa kelajakdagi holat haqidagi taxminni bildirishi mumkin: "날씨가 추울 거예요".\n\n받침 bo‘lmasa "-ㄹ 거예요": 가다 → 갈 거예요. 받침 bo‘lsa "-을 거예요": 먹다 → 먹을 거예요. ㄹ bilan tugagan so‘zga yana ㄹ qo‘shilmaydi: 살다 → 살 거예요.\n\nMa’no vaziyatga qarab reja yoki taxmin bo‘lishi mumkin.',
      en: '"A/V-(으)ㄹ 거예요" is one of the most common ways to talk about the future.\n\nWith verbs, it frequently expresses a plan or intention: "이번 방학에 제주도에 갈 거예요" means that the speaker plans to go to Jeju. With adjectives, it commonly predicts a future state: "다음 주에 추울 거예요" predicts that it will be cold next week.\n\nAfter vowel-ending stems, use -ㄹ 거예요: 가다 → 갈 거예요. After most consonant-ending stems, use -을 거예요: 먹다 → 먹을 거예요. Do not add another ㄹ after an ㄹ-final stem: 살다 → 살 거예요.\n\nIts exact nuance depends on the subject and situation. "저는 내일 출발할 거예요" is a personal plan, while "내일 비가 올 거예요" is a prediction.',
      ru: '"A/V-(으)ㄹ 거예요" — одна из основных конструкций будущего времени.\n\nС глаголами она часто выражает план или намерение: "제주도에 갈 거예요" — «Я собираюсь поехать на Чеджудо». С прилагательными обычно выражает прогноз: "다음 주에 추울 거예요" — «На следующей неделе будет холодно».\n\nПосле основы без 받침 используется -ㄹ 거예요: 가다 → 갈 거예요. После большинства основ с 받침 — -을 거예요: 먹다 → 먹을 거예요. После ㄹ второй ㄹ не добавляется: 살다 → 살 거예요.\n\nКонкретное значение зависит от ситуации: план говорящего или предположение о будущем.',
    },

    conjugationRule: {
      ko: '받침 X + ㄹ 거예요  ·  받침 O + 을 거예요  ·  ㄹ 받침 + 거예요',
      uz: '받침 yo‘q + ㄹ 거예요  ·  받침 bor + 을 거예요  ·  ㄹ + 거예요',
      en: 'vowel + ㄹ 거예요  ·  consonant + 을 거예요  ·  ㄹ-final + 거예요',
      ru: 'гласная + ㄹ 거예요  ·  согласная + 을 거예요  ·  основа на ㄹ + 거예요',
    },

    conjugations: [
      // 받침 O — 5
      { base: '먹다', result: '먹을 거예요' },
      { base: '읽다', result: '읽을 거예요' },
      { base: '찾다', result: '찾을 거예요' },
      { base: '좋다', result: '좋을 거예요' },
      { base: '많다', result: '많을 거예요' },

      // 받침 X — 5
      { base: '가다', result: '갈 거예요' },
      { base: '보다', result: '볼 거예요' },
      { base: '타다', result: '탈 거예요' },
      { base: '크다', result: '클 거예요' },
      { base: '비싸다', result: '비쌀 거예요' },

      // ㄹ 받침
      { base: '살다', result: '살 거예요' },
      { base: '멀다', result: '멀 거예요' },
    ],

    examples: [
      {
        ko: '이번 방학에 제주도에 갈 거예요.',
        highlight: '갈 거예요',
        gloss: {
          ko: '이번 방학에 제주도에 갈 거예요.',
          uz: 'Bu ta’tilda Jejuga boraman.',
          en: 'I am going to Jeju this vacation.',
          ru: 'В эти каникулы я поеду на Чеджудо.',
        },
      },
      {
        ko: '제주도에서 사흘 동안 있을 거예요.',
        highlight: '있을 거예요',
        gloss: {
          ko: '제주도에서 사흘 동안 있을 거예요.',
          uz: 'Jejuda uch kun bo‘laman.',
          en: 'I will stay on Jeju for three days.',
          ru: 'Я проведу на Чеджудо три дня.',
        },
      },
      {
        ko: '비행기를 타고 갈 거예요.',
        highlight: '갈 거예요',
        gloss: {
          ko: '비행기를 타고 갈 거예요.',
          uz: 'Samolyotda boraman.',
          en: 'I am going to go by plane.',
          ru: 'Я полечу на самолёте.',
        },
      },
      {
        ko: '바닷가 근처 호텔에서 잘 거예요.',
        highlight: '잘 거예요',
        gloss: {
          ko: '바닷가 근처 호텔에서 잘 거예요.',
          uz: 'Dengiz bo‘yidagi mehmonxonada tunaman.',
          en: 'I will stay at a hotel near the beach.',
          ru: 'Я буду ночевать в гостинице возле моря.',
        },
      },
      {
        ko: '내일 아침 일찍 출발할 거예요.',
        highlight: '출발할 거예요',
        gloss: {
          ko: '내일 아침 일찍 출발할 거예요.',
          uz: 'Ertaga ertalab erta jo‘nayman.',
          en: 'I am going to leave early tomorrow morning.',
          ru: 'Завтра утром я рано выеду.',
        },
      },
      {
        ko: '주말에는 관광객이 많을 거예요.',
        highlight: '많을 거예요',
        gloss: {
          ko: '주말에는 관광객이 많을 거예요.',
          uz: 'Dam olish kunlari sayyohlar ko‘p bo‘ladi.',
          en: 'There will probably be many tourists on the weekend.',
          ru: 'На выходных, вероятно, будет много туристов.',
        },
      },
      {
        ko: '산 위는 조금 추울 거예요.',
        highlight: '추울 거예요',
        gloss: {
          ko: '산 위는 조금 추울 거예요.',
          uz: 'Tog‘ tepasida biroz sovuq bo‘ladi.',
          en: 'It will probably be a little cold on the mountain.',
          ru: 'На вершине горы, вероятно, будет немного холодно.',
        },
      },
      {
        ko: '여행이 정말 재미있을 거예요.',
        highlight: '재미있을 거예요',
        gloss: {
          ko: '여행이 정말 재미있을 거예요.',
          uz: 'Sayohat juda qiziqarli bo‘ladi.',
          en: 'The trip will probably be really fun.',
          ru: 'Путешествие, наверное, будет очень интересным.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이번 여행에서 어디에 갈 거예요?',
        highlight: '갈 거예요',
        gloss: {
          ko: '이번 여행에서 어디에 갈 거예요?',
          uz: 'Bu safarda qayerga borasiz?',
          en: 'Where are you going on this trip?',
          ru: 'Куда вы поедете в этой поездке?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '제주도하고 우도에 갈 거예요.',
        highlight: '갈 거예요',
        gloss: {
          ko: '제주도하고 우도에 갈 거예요.',
          uz: 'Jeju va Udoga boraman.',
          en: 'I am going to Jeju and Udo.',
          ru: 'Я поеду на Чеджудо и Удо.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '며칠 동안 있을 거예요?',
        highlight: '있을 거예요',
        gloss: {
          ko: '며칠 동안 있을 거예요?',
          uz: 'Necha kun bo‘lasiz?',
          en: 'How many days will you stay?',
          ru: 'Сколько дней вы там пробудете?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아마 일주일 정도 있을 거예요.',
        highlight: '있을 거예요',
        gloss: {
          ko: '아마 일주일 정도 있을 거예요.',
          uz: 'Taxminan bir hafta bo‘laman.',
          en: 'I will probably stay for about a week.',
          ru: 'Наверное, примерно неделю.',
        },
      },
    ],

    similar: {
      pattern: 'V-(으)려고 하다',
      note: {
        ko: '"-(으)ㄹ 거예요"는 미래 계획이나 예측을 폭넓게 말할 수 있어요. "-(으)려고 하다"는 특히 말하는 사람이 어떤 행동을 하려는 의도나 계획에 초점을 둬요.',
        uz: '"-(으)ㄹ 거예요" kelajak va taxminni keng ifodalaydi, "-(으)려고 하다" esa niyatga ko‘proq urg‘u beradi.',
        en: '"-(으)ㄹ 거예요" broadly expresses future plans or predictions, while "-(으)려고 하다" focuses more strongly on intention.',
        ru: '"-(으)ㄹ 거예요" широко выражает планы и прогнозы, а "-(으)려고 하다" сильнее подчёркивает намерение.',
      },
    },

    cautions: [
      {
        ko: '"거예요"는 "것이에요"가 줄어든 형태예요. "갈거예요"처럼 붙이지 말고 띄어 써서 "갈 거예요"라고 해요.',
        uz: '"갈 거예요" alohida yoziladi.',
        en: 'Write a space before 거예요: 갈 거예요, not 갈거예요.',
        ru: 'Перед 거예요 нужен пробел: 갈 거예요.',
      },
      {
        ko: '받침 있는 동사에는 "-을 거예요"를 써요. "먹ㄹ 거예요"가 아니라 "먹을 거예요"예요.',
        uz: '받침 bilan "-을 거예요": 먹을 거예요.',
        en: 'Most consonant-ending stems use -을 거예요: 먹을 거예요.',
        ru: 'После основы с согласным используется -을 거예요: 먹을 거예요.',
      },
      {
        ko: 'ㄹ 받침에 ㄹ을 더 붙이지 않아요. "살ㄹ 거예요"가 아니라 "살 거예요"예요.',
        uz: 'ㄹ ga yana ㄹ qo‘shilmaydi.',
        en: 'Do not add another ㄹ to an ㄹ-final stem.',
        ru: 'После ㄹ второй ㄹ не добавляется.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '이번 방학에 제주도에 ___ 거예요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct future form.',
          ru: 'Выберите правильную форму будущего.',
        },
        options: [
          { text: '갈', correct: true },
          { text: '가을', correct: false },
          { text: '가는', correct: false },
          { text: '간', correct: false },
          { text: '가고', correct: false },
        ],
      },
      {
        question: {
          ko: '저녁에는 한국 음식을 ___ 거예요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 먹다.',
          ru: 'Выберите правильную форму после 먹다.',
        },
        options: [
          { text: '먹을', correct: true },
          { text: '먹ㄹ', correct: false },
          { text: '먹는', correct: false },
          { text: '먹은', correct: false },
          { text: '먹고', correct: false },
        ],
      },
      {
        question: {
          ko: '주말에는 관광객이 ___ 거예요.',
          uz: '많다 ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct form of 많다.',
          ru: 'Выберите правильную форму 많다.',
        },
        options: [
          { text: '많을', correct: true },
          { text: '많ㄹ', correct: false },
          { text: '많는', correct: false },
          { text: '많은', correct: false },
          { text: '많고', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다"의 미래형으로 맞는 것을 고르세요.',
          uz: '"살다" ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct future form of 살다.',
          ru: 'Выберите правильную форму будущего от 살다.',
        },
        options: [
          { text: '살 거예요', correct: true },
          { text: '살을 거예요', correct: false },
          { text: '살ㄹ 거예요', correct: false },
          { text: '사는 거예요', correct: false },
          { text: '산 거예요', correct: false },
        ],
      },
      {
        question: {
          ko: '"저는 내일 출발할 거예요"는 주로 무엇을 나타내요?',
          uz: 'Gapning asosiy ma’nosini tanlang.',
          en: 'What does "저는 내일 출발할 거예요" mainly express?',
          ru: 'Что в основном выражает "저는 내일 출발할 거예요"?',
        },
        options: [
          { text: '앞으로의 계획', correct: true },
          { text: '과거의 경험', correct: false },
          { text: '두 명사의 비교', correct: false },
          { text: '완료된 행동', correct: false },
          { text: '부정 표현', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 5-3.
  // A/V-(으)니까, N(이)니까
  // ─────────────────────────────────────────────
  {
    code: 'av-n-eunikka',
    pattern: 'A/V-(으)니까, N(이)니까',
    section: 3,
    unit: 5,
    order: 3,
    isActive: true,

    summary: {
      ko: '앞의 내용을 뒤의 행동이나 판단에 대한 이유·근거로 제시할 때 사용해요. 여행지를 추천하거나 계획을 설명하면서 "왜?"에 답할 때 매우 유용해요.',
      uz: 'Oldingi gapni keyingi harakat yoki fikrning sababi sifatida ko‘rsatadi. Sayohat joyini tavsiya qilish yoki rejaning sababini tushuntirishda juda foydali.',
      en: 'Presents the first clause as the reason or basis for the following action or judgment. It is especially useful when explaining travel recommendations and decisions.',
      ru: 'Представляет первую часть как причину или основание для последующего действия или решения. Особенно полезно при объяснении рекомендаций и планов путешествия.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '이유',
        uz: 'Sabab',
        en: 'Reason',
        ru: 'Причина',
      },
      {
        ko: '근거',
        uz: 'Asos',
        en: 'Basis',
        ru: 'Основание',
      },
    ],

    explanation: {
      ko: '"A/V-(으)니까, N(이)니까"는 어떤 행동을 하거나 판단을 하는 이유를 설명할 때 사용하는 연결 표현이에요. 쉽게 생각하면 앞부분이 "왜?"에 대한 답이 되고, 뒤에는 그 이유를 바탕으로 한 행동·제안·명령·판단 등이 와요.\n\n예를 들어 "제주도는 경치가 좋으니까 한번 가 보세요"에서는 제주도의 경치가 좋다는 사실이 여행을 추천하는 이유예요. "시간이 없으니까 비행기를 타요"에서는 시간이 없다는 것이 비행기를 선택하는 이유고요.\n\n동사와 형용사는 받침에 따라 형태가 나뉘어요. 받침이 있으면 "-으니까"를 사용해서 "먹다 → 먹으니까", "좋다 → 좋으니까", "많다 → 많으니까"처럼 만들어요. 받침이 없으면 "-니까"를 붙여서 "가다 → 가니까", "비싸다 → 비싸니까", "바쁘다 → 바쁘니까"처럼 사용해요.\n\nㄹ 받침은 ㄹ이 없어지고 "-니까"가 붙어요. "살다 → 사니까", "멀다 → 머니까", "길다 → 기니까"처럼 활용해요.\n\n명사 뒤에서는 받침이 있으면 "이니까", 받침이 없으면 "니까"를 사용해요. "학생 → 학생이니까", "주말 → 주말이니까", "휴가 → 휴가니까", "의사 → 의사니까"처럼 말해요.\n\n"-아/어서"와 둘 다 이유를 나타낼 수 있지만 차이가 있어요. "-(으)니까"는 이유를 근거로 뒤에서 제안, 명령, 권유를 하는 문장과 아주 잘 어울려요. "날씨가 좋으니까 산책하세요", "시간이 있으니까 같이 가요"처럼 사용할 수 있어요.\n\n여행에서도 추천을 설명할 때 정말 유용해요. "제주도는 볼거리가 많으니까 사흘 정도 여행하세요", "주말에는 사람이 많으니까 미리 예약하세요", "숙소가 공항에서 머니까 택시를 타세요"처럼 단순한 정보가 아니라 실제 행동으로 이어지는 이유를 설명할 수 있어요.',
      uz: '"A/V-(으)니까, N(이)니까" keyingi harakat yoki qarorning sababini bildiradi. Oldingi qism "Nega?" savoliga javob bo‘ladi.\n\nMasalan, "경치가 좋으니까 한번 가 보세요" — manzara yaxshi bo‘lgani uchun borishni tavsiya qiladi.\n\n받침 bo‘lsa "-으니까": 먹다 → 먹으니까, 좋다 → 좋으니까. 받침 bo‘lmasa "-니까": 가다 → 가니까, 비싸다 → 비싸니까. ㄹ tushadi: 멀다 → 머니까.\n\nOt bilan 받침 bo‘lsa "이니까": 학생이니까, 받침 bo‘lmasa "니까": 의사니까.\n\nBu shakl taklif, maslahat yoki buyruq bilan juda tabiiy keladi.',
      en: '"A/V-(으)니까, N(이)니까" explains the reason or basis for the action or judgment that follows. The first clause effectively answers "Why?"\n\nIn "제주도는 경치가 좋으니까 한번 가 보세요," the beautiful scenery is the reason for recommending Jeju.\n\nAfter most consonant-ending adjective and verb stems, use -으니까: 먹다 → 먹으니까, 좋다 → 좋으니까. After vowel-ending stems, use -니까: 가다 → 가니까, 비싸다 → 비싸니까. Final ㄹ drops: 멀다 → 머니까.\n\nWith nouns, use 이니까 after a final consonant and 니까 after a vowel: 학생이니까, 휴가니까.\n\nUnlike some other reason connectors, -(으)니까 works especially naturally when the following clause contains a suggestion, command, or recommendation.',
      ru: '"A/V-(으)니까, N(이)니까" объясняет причину или основание последующего действия или решения. Первая часть отвечает на вопрос «Почему?».\n\nВ "경치가 좋으니까 한번 가 보세요" хорошая природа является причиной рекомендации посетить это место.\n\nПосле большинства основ с 받침 используется -으니까: 먹다 → 먹으니까, 좋다 → 좋으니까. После основы без 받침 — -니까: 가다 → 가니까, 비싸다 → 비싸니까. Конечный ㄹ выпадает: 멀다 → 머니까.\n\nПосле существительного с 받침 используется 이니까, без 받침 — 니까: 학생이니까, 휴가니까.\n\nКонструкция особенно естественно сочетается с советами, предложениями и просьбами.',
    },

    conjugationRule: {
      ko: 'A/V 받침 O + 으니까  ·  A/V 받침 X + 니까  ·  ㄹ 받침: ㄹ 탈락 + 니까  ·  N 받침 O + 이니까  ·  N 받침 X + 니까',
      uz: 'A/V 받침 bor + 으니까  ·  받침 yo‘q + 니까  ·  N 받침 bor + 이니까  ·  yo‘q + 니까',
      en: 'A/V consonant + 으니까  ·  vowel + 니까  ·  final ㄹ drops  ·  N consonant + 이니까  ·  N vowel + 니까',
      ru: 'A/V после согласной + 으니까  ·  после гласной + 니까  ·  ㄹ выпадает  ·  N с согласной + 이니까  ·  N без неё + 니까',
    },

    conjugations: [
      // A/V 받침 O — 5
      { base: '먹다', result: '먹으니까' },
      { base: '읽다', result: '읽으니까' },
      { base: '좋다', result: '좋으니까' },
      { base: '많다', result: '많으니까' },
      { base: '작다', result: '작으니까' },

      // A/V 받침 X — 5
      { base: '가다', result: '가니까' },
      { base: '보다', result: '보니까' },
      { base: '비싸다', result: '비싸니까' },
      { base: '바쁘다', result: '바쁘니까' },
      { base: '크다', result: '크니까' },

      // ㄹ
      { base: '살다', result: '사니까' },
      { base: '멀다', result: '머니까' },
      { base: '길다', result: '기니까' },

      // 명사
      { base: '학생', result: '학생이니까' },
      { base: '주말', result: '주말이니까' },
      { base: '휴가', result: '휴가니까' },
      { base: '의사', result: '의사니까' },
    ],

    examples: [
      {
        ko: '제주도는 경치가 좋으니까 한번 가 보세요.',
        highlight: '좋으니까',
        gloss: {
          ko: '제주도는 경치가 좋으니까 한번 가 보세요.',
          uz: 'Jejuning manzarasi chiroyli, shuning uchun bir marta borib ko‘ring.',
          en: 'Jeju has beautiful scenery, so you should visit it sometime.',
          ru: 'На Чеджудо красивые пейзажи, поэтому обязательно съездите туда.',
        },
      },
      {
        ko: '주말에는 사람이 많으니까 미리 예약하세요.',
        highlight: '많으니까',
        gloss: {
          ko: '주말에는 사람이 많으니까 미리 예약하세요.',
          uz: 'Dam olish kunlari odam ko‘p bo‘ladi, shuning uchun oldindan band qiling.',
          en: 'It gets crowded on weekends, so make a reservation in advance.',
          ru: 'На выходных много людей, поэтому бронируйте заранее.',
        },
      },
      {
        ko: '시간이 없으니까 비행기를 타요.',
        highlight: '없으니까',
        gloss: {
          ko: '시간이 없으니까 비행기를 타요.',
          uz: 'Vaqt yo‘q, shuning uchun samolyotda boramiz.',
          en: 'We do not have much time, so let’s fly.',
          ru: 'У нас мало времени, поэтому полетим на самолёте.',
        },
      },
      {
        ko: '숙소가 공항에서 머니까 택시를 타세요.',
        highlight: '머니까',
        gloss: {
          ko: '숙소가 공항에서 머니까 택시를 타세요.',
          uz: 'Mehmonxona aeroportdan uzoq, shuning uchun taksida boring.',
          en: 'The accommodation is far from the airport, so take a taxi.',
          ru: 'Гостиница далеко от аэропорта, поэтому возьмите такси.',
        },
      },
      {
        ko: '날씨가 따뜻하니까 바닷가에 가요.',
        highlight: '따뜻하니까',
        gloss: {
          ko: '날씨가 따뜻하니까 바닷가에 가요.',
          uz: 'Havo iliq, shuning uchun dengiz bo‘yiga boramiz.',
          en: 'The weather is warm, so let’s go to the beach.',
          ru: 'Погода тёплая, поэтому пойдём на пляж.',
        },
      },
      {
        ko: '오늘은 휴가니까 늦게 일어나도 돼요.',
        highlight: '휴가니까',
        gloss: {
          ko: '오늘은 휴가니까 늦게 일어나도 돼요.',
          uz: 'Bugun ta’til, shuning uchun kechroq turish mumkin.',
          en: 'It is vacation today, so we can get up late.',
          ru: 'Сегодня отпуск, поэтому можно встать попозже.',
        },
      },
      {
        ko: '지금은 성수기니까 호텔 가격이 비싸요.',
        highlight: '성수기니까',
        gloss: {
          ko: '지금은 성수기니까 호텔 가격이 비싸요.',
          uz: 'Hozir yuqori mavsum, shuning uchun mehmonxona narxlari qimmat.',
          en: 'It is peak season now, so hotel prices are high.',
          ru: 'Сейчас высокий сезон, поэтому гостиницы дорогие.',
        },
      },
      {
        ko: '처음 가는 곳이니까 지도를 준비하세요.',
        highlight: '곳이니까',
        gloss: {
          ko: '처음 가는 곳이니까 지도를 준비하세요.',
          uz: 'Bu birinchi marta boradigan joyingiz, shuning uchun xarita tayyorlang.',
          en: 'It is a place you are visiting for the first time, so prepare a map.',
          ru: 'Вы едете туда впервые, поэтому подготовьте карту.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '제주도에서는 어디에 가면 좋아요?',
        highlight: '어디에 가면 좋아요',
        gloss: {
          ko: '제주도에서는 어디에 가면 좋아요?',
          uz: 'Jejuda qayerga borgan yaxshi?',
          en: 'Where should I go on Jeju?',
          ru: 'Куда лучше сходить на Чеджудо?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '성산일출봉은 경치가 좋으니까 꼭 가 보세요.',
        highlight: '좋으니까',
        gloss: {
          ko: '성산일출봉은 경치가 좋으니까 꼭 가 보세요.',
          uz: 'Seongsan Ilchulbong manzarasi chiroyli, albatta borib ko‘ring.',
          en: 'Seongsan Ilchulbong has great scenery, so definitely visit it.',
          ru: 'На Сонсан-Ильчхульбоне прекрасные виды, обязательно съездите.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '버스로 가도 괜찮아요?',
        highlight: '가도 괜찮아요',
        gloss: {
          ko: '버스로 가도 괜찮아요?',
          uz: 'Avtobusda borsam bo‘ladimi?',
          en: 'Is it okay to go by bus?',
          ru: 'Можно поехать на автобусе?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '조금 머니까 시간이 없으면 택시를 타세요.',
        highlight: '머니까',
        gloss: {
          ko: '조금 머니까 시간이 없으면 택시를 타세요.',
          uz: 'Biroz uzoq, vaqtingiz kam bo‘lsa taksi oling.',
          en: 'It is a little far, so take a taxi if you are short on time.',
          ru: 'Это немного далеко, поэтому, если мало времени, возьмите такси.',
        },
      },
    ],

    similar: {
      pattern: 'A/V-아/어서',
      note: {
        ko: '둘 다 이유를 표현할 수 있지만 "-(으)니까"는 뒤에 명령이나 제안이 오는 문장과 특히 잘 어울려요. "비가 오니까 우산을 가져가세요"처럼 이유를 근거로 행동을 권할 수 있어요.',
        uz: 'Ikkalasi ham sababni bildiradi, lekin "-(으)니까" maslahat va buyruq bilan ayniqsa tabiiy.',
        en: 'Both can express reasons, but -(으)니까 works especially naturally before suggestions and commands.',
        ru: 'Обе конструкции выражают причину, но -(으)니까 особенно естественно употребляется перед советами и просьбами.',
      },
    },

    cautions: [
      {
        ko: 'ㄹ 받침을 그대로 두고 "-으니까"를 붙이지 않아요. "멀으니까"가 아니라 "머니까"예요.',
        uz: 'ㄹ tushadi: 멀다 → 머니까.',
        en: 'Final ㄹ drops: 멀다 → 머니까, not 멀으니까.',
        ru: 'Конечный ㄹ выпадает: 멀다 → 머니까.',
      },
      {
        ko: '명사 뒤에는 "(이)니까"를 사용해요. "학생으니까"가 아니라 "학생이니까"예요.',
        uz: 'Ot bilan "(이)니까": 학생이니까.',
        en: 'Nouns use (이)니까: 학생이니까, not 학생으니까.',
        ru: 'После существительного используется (이)니까: 학생이니까.',
      },
      {
        ko: '받침 없는 명사에 "이니까"를 항상 붙이지 않아요. "휴가이니까"보다 "휴가니까"가 맞아요.',
        uz: '받침 yo‘q ot bilan 니까: 휴가니까.',
        en: 'A vowel-ending noun takes 니까: 휴가니까.',
        ru: 'После существительного без 받침 используется 니까: 휴가니까.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '경치가 좋___ 꼭 가 보세요.',
          uz: 'Sabab shaklini tanlang.',
          en: 'Choose the correct reason form after 좋다.',
          ru: 'Выберите правильную форму после 좋다.',
        },
        options: [
          { text: '으니까', correct: true },
          { text: '니까', correct: false },
          { text: '는데', correct: false },
          { text: '거나', correct: false },
          { text: '려고', correct: false },
        ],
      },
      {
        question: {
          ko: '호텔이 비싸___ 게스트하우스를 알아봐요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 비싸다.',
          ru: 'Выберите правильную форму после 비싸다.',
        },
        options: [
          { text: '니까', correct: true },
          { text: '으니까', correct: false },
          { text: '는데', correct: false },
          { text: '거나', correct: false },
          { text: '려고', correct: false },
        ],
      },
      {
        question: {
          ko: '숙소가 머___ 택시를 타세요.',
          uz: '멀다 ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct form of 멀다.',
          ru: 'Выберите правильную форму 멀다.',
        },
        options: [
          { text: '니까', correct: true },
          { text: '으니까', correct: false },
          { text: '는데', correct: false },
          { text: '거나', correct: false },
          { text: '어서', correct: false },
        ],
      },
      {
        question: {
          ko: '오늘은 휴가___ 천천히 출발해요.',
          uz: 'Otning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct form after 휴가.',
          ru: 'Выберите правильную форму после 휴가.',
        },
        options: [
          { text: '니까', correct: true },
          { text: '이니까', correct: false },
          { text: '으니까', correct: false },
          { text: '인데', correct: false },
          { text: '동안', correct: false },
        ],
      },
      {
        question: {
          ko: '지금은 성수기___ 호텔을 미리 예약하세요.',
          uz: 'Otning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct form after 성수기.',
          ru: 'Выберите правильную форму после 성수기.',
        },
        options: [
          { text: '니까', correct: true },
          { text: '이니까', correct: false },
          { text: '으니까', correct: false },
          { text: '는데', correct: false },
          { text: '까지', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 5-4. V-고 나서
  // ─────────────────────────────────────────────
  {
    code: 'verb-go-naseo',
    pattern: 'V-고 나서',
    section: 3,
    unit: 5,
    order: 4,
    isActive: true,

    summary: {
      ko: '앞의 행동을 완전히 끝낸 뒤에 다음 행동이 이어진다는 것을 나타내요. 여행 준비나 일정처럼 행동의 순서를 분명하게 설명할 때 유용해요.',
      uz: 'Birinchi harakat to‘liq tugagandan keyin ikkinchi harakat bajarilishini bildiradi. Sayohat tayyorgarligi va rejadagi ishlar ketma-ketligini aytishda foydali.',
      en: 'Indicates that the second action happens after the first action has been completed. It is useful for clearly describing sequences in travel plans and preparations.',
      ru: 'Показывает, что второе действие происходит после полного завершения первого. Полезно для описания последовательности действий и подготовки к поездке.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '순서',
        uz: 'Ketma-ketlik',
        en: 'Sequence',
        ru: 'Последовательность',
      },
      {
        ko: '완료',
        uz: 'Tugallanish',
        en: 'Completion',
        ru: 'Завершённость',
      },
    ],

    explanation: {
      ko: '"V-고 나서"는 어떤 행동을 먼저 끝내고 그다음에 다른 행동을 한다는 것을 분명하게 나타내는 표현이에요. "A를 하고 나서 B를 한다"라고 하면 A가 먼저 완료되고, 그 이후에 B가 시작된다는 뜻이에요.\n\n예를 들어 "비행기 표를 예약하고 나서 호텔을 예약했어요"라고 하면 비행기 표 예약을 먼저 끝냈고, 그다음 단계로 호텔을 예약했다는 뜻이에요. 여행 준비처럼 해야 할 일이 순서대로 많은 상황에서 아주 유용해요.\n\n형태는 매우 간단해요. 동사의 기본형에서 "다"를 빼고 "-고 나서"를 붙이면 돼요. 받침 여부에 따라 형태가 바뀌지 않아요. "먹다 → 먹고 나서", "가다 → 가고 나서", "예약하다 → 예약하고 나서", "도착하다 → 도착하고 나서"처럼 사용해요.\n\n"-고"와 비교하면 차이를 이해하기 쉬워요. 단순한 "-고"는 여러 행동을 순서대로 연결할 수도 있지만, 반드시 첫 행동이 완전히 끝난 뒤 두 번째 행동이 시작된다는 것을 강하게 강조하지는 않아요. 반면 "-고 나서"는 "먼저 A를 다 하고, 그 후에 B"라는 시간적 순서를 더 분명하게 보여 줘요.\n\n예를 들어 "밥을 먹고 커피를 마셨어요"도 밥을 먹은 후 커피를 마셨다는 의미로 이해할 수 있지만, "밥을 먹고 나서 커피를 마셨어요"라고 하면 밥을 다 먹은 후에 커피를 마셨다는 순서가 더 또렷해져요.\n\n시제는 보통 뒤의 마지막 서술어에서 표현해요. "예약하고 나서 출발했어요", "도착하고 나서 전화할 거예요"처럼 사용할 수 있어요. 앞의 동사를 "예약했고 나서"처럼 따로 과거형으로 만들지 않아요.\n\n여행에서는 "표를 예약하고 나서 숙소를 정했어요", "공항에 도착하고 나서 환전했어요", "짐을 풀고 나서 관광을 시작했어요", "여행에서 돌아오고 나서 사진을 정리했어요"처럼 여행 전·중·후의 행동 순서를 설명할 때 매우 자연스러워요.',
      uz: '"V-고 나서" bir ish to‘liq tugagandan keyin boshqa ish bajarilishini bildiradi. "A하고 나서 B" — avval A tugaydi, keyin B boshlanadi.\n\nMasalan, "비행기 표를 예약하고 나서 호텔을 예약했어요" — avval samolyot chiptasini band qildim, keyin mehmonxonani band qildim.\n\nShakli sodda: fe’lning "다" qismini olib tashlab "-고 나서" qo‘shiladi. 받침 shaklni o‘zgartirmaydi: 먹다 → 먹고 나서, 가다 → 가고 나서, 예약하다 → 예약하고 나서.\n\nOddiy "-고" bilan taqqoslaganda "-고 나서" birinchi ish to‘liq tugaganidan keyin keyingisi sodir bo‘lishini aniqroq ta’kidlaydi.\n\nZamon odatda oxirgi fe’lda ifodalanadi: 예약하고 나서 출발했어요.',
      en: '"V-고 나서" clearly states that one action is completed before another begins. "A하고 나서 B" means that A is done first and B follows afterward.\n\nFor example, "비행기 표를 예약하고 나서 호텔을 예약했어요" means that the flight ticket was booked first, and the hotel was booked afterward.\n\nFormation is simple: remove 다 and add "-고 나서." The form does not change according to final consonants: 먹다 → 먹고 나서, 가다 → 가고 나서, 예약하다 → 예약하고 나서.\n\nCompared with simple -고, -고 나서 more clearly emphasizes that the first action has been completed before the second one occurs.\n\nTense is normally shown on the final predicate: 예약하고 나서 출발했어요, 도착하고 나서 전화할 거예요.',
      ru: '"V-고 나서" подчёркивает, что первое действие полностью завершилось до начала второго. "A하고 나서 B" означает: сначала сделать A, затем B.\n\nНапример, "비행기 표를 예약하고 나서 호텔을 예약했어요" означает, что сначала был забронирован авиабилет, а затем гостиница.\n\nФорма проста: убирается 다 и добавляется "-고 나서". Наличие 받침 ничего не меняет: 먹다 → 먹고 나서, 가다 → 가고 나서, 예약하다 → 예약하고 나서.\n\nПо сравнению с обычным -고, конструкция -고 나서 сильнее подчёркивает завершение первого действия перед вторым.\n\nВремя обычно выражается последним сказуемым: 예약하고 나서 출발했어요.',
    },

    conjugationRule: {
      ko: '동사 어간 + 고 나서  ·  받침 여부와 관계없이 동일',
      uz: 'Fe’l o‘zagi + 고 나서  ·  받침 ta’sir qilmaydi',
      en: 'verb stem + 고 나서  ·  same regardless of final consonant',
      ru: 'основа глагола + 고 나서  ·  форма не зависит от 받침',
    },

    conjugations: [
      { base: '먹다', result: '먹고 나서' },
      { base: '읽다', result: '읽고 나서' },
      { base: '찾다', result: '찾고 나서' },
      { base: '가다', result: '가고 나서' },
      { base: '보다', result: '보고 나서' },
      { base: '만나다', result: '만나고 나서' },
      { base: '예약하다', result: '예약하고 나서' },
      { base: '도착하다', result: '도착하고 나서' },
      { base: '준비하다', result: '준비하고 나서' },
      { base: '확인하다', result: '확인하고 나서' },
    ],

    examples: [
      {
        ko: '비행기 표를 예약하고 나서 호텔을 예약했어요.',
        highlight: '예약하고 나서',
        gloss: {
          ko: '비행기 표를 예약하고 나서 호텔을 예약했어요.',
          uz: 'Samolyot chiptasini band qilgandan keyin mehmonxonani band qildim.',
          en: 'After booking the flight, I booked the hotel.',
          ru: 'После того как я забронировал авиабилет, я забронировал гостиницу.',
        },
      },
      {
        ko: '여행 계획을 세우고 나서 표를 샀어요.',
        highlight: '세우고 나서',
        gloss: {
          ko: '여행 계획을 세우고 나서 표를 샀어요.',
          uz: 'Sayohat rejasini tuzgandan keyin chipta sotib oldim.',
          en: 'After making the travel plan, I bought the tickets.',
          ru: 'После составления плана поездки я купил билеты.',
        },
      },
      {
        ko: '공항에 도착하고 나서 환전했어요.',
        highlight: '도착하고 나서',
        gloss: {
          ko: '공항에 도착하고 나서 환전했어요.',
          uz: 'Aeroportga kelgandan keyin pul almashtirdim.',
          en: 'After arriving at the airport, I exchanged money.',
          ru: 'После прибытия в аэропорт я обменял деньги.',
        },
      },
      {
        ko: '호텔에 들어가고 나서 짐을 풀었어요.',
        highlight: '들어가고 나서',
        gloss: {
          ko: '호텔에 들어가고 나서 짐을 풀었어요.',
          uz: 'Mehmonxonaga kirgandan keyin yuklarimni joylashtirdim.',
          en: 'After checking into the hotel, I unpacked.',
          ru: 'После того как я заселился в гостиницу, я разобрал вещи.',
        },
      },
      {
        ko: '짐을 풀고 나서 근처를 구경했어요.',
        highlight: '풀고 나서',
        gloss: {
          ko: '짐을 풀고 나서 근처를 구경했어요.',
          uz: 'Yuklarni joylashtirgandan keyin atrofni tomosha qildim.',
          en: 'After unpacking, I looked around the neighborhood.',
          ru: 'После того как я разобрал вещи, я осмотрел окрестности.',
        },
      },
      {
        ko: '아침을 먹고 나서 관광을 시작할 거예요.',
        highlight: '먹고 나서',
        gloss: {
          ko: '아침을 먹고 나서 관광을 시작할 거예요.',
          uz: 'Nonushta qilgandan keyin sayrni boshlaymiz.',
          en: 'We will start sightseeing after breakfast.',
          ru: 'После завтрака мы начнём осматривать достопримечательности.',
        },
      },
      {
        ko: '예약 내용을 확인하고 나서 결제하세요.',
        highlight: '확인하고 나서',
        gloss: {
          ko: '예약 내용을 확인하고 나서 결제하세요.',
          uz: 'Bron ma’lumotlarini tekshirgandan keyin to‘lov qiling.',
          en: 'Check the reservation details before making the payment.',
          ru: 'Проверьте данные бронирования, а затем оплачивайте.',
        },
      },
      {
        ko: '여행에서 돌아오고 나서 사진을 정리했어요.',
        highlight: '돌아오고 나서',
        gloss: {
          ko: '여행에서 돌아오고 나서 사진을 정리했어요.',
          uz: 'Sayohatdan qaytgandan keyin suratlarni tartibga soldim.',
          en: 'After returning from the trip, I organized my photos.',
          ru: 'После возвращения из поездки я разобрал фотографии.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '여행 준비는 다 했어요?',
        highlight: '여행 준비',
        gloss: {
          ko: '여행 준비는 다 했어요?',
          uz: 'Sayohatga hamma narsani tayyorladingizmi?',
          en: 'Have you finished preparing for the trip?',
          ru: 'Вы уже всё подготовили к поездке?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '비행기 표를 사고 나서 호텔도 예약했어요.',
        highlight: '사고 나서',
        gloss: {
          ko: '비행기 표를 사고 나서 호텔도 예약했어요.',
          uz: 'Samolyot chiptasini olgandan keyin mehmonxonani ham band qildim.',
          en: 'After buying the flight ticket, I booked the hotel too.',
          ru: 'После покупки авиабилета я также забронировал гостиницу.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '여행 일정도 만들었어요?',
        highlight: '여행 일정',
        gloss: {
          ko: '여행 일정도 만들었어요?',
          uz: 'Sayohat jadvalini ham tuzdingizmi?',
          en: 'Did you make an itinerary too?',
          ru: 'Маршрут поездки тоже составили?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아니요. 숙소 위치를 확인하고 나서 만들려고 해요.',
        highlight: '확인하고 나서',
        gloss: {
          ko: '아니요. 숙소 위치를 확인하고 나서 만들려고 해요.',
          uz: 'Yo‘q. Mehmonxona joylashuvini tekshirgandan keyin tuzmoqchiman.',
          en: 'No. I plan to make it after checking the hotel location.',
          ru: 'Нет. Я собираюсь составить его после проверки расположения гостиницы.',
        },
      },
    ],

    similar: {
      pattern: 'V-고',
      note: {
        ko: '"V-고"도 행동을 연결하지만 단순한 나열이나 연속 행동에도 사용할 수 있어요. "V-고 나서"는 첫 번째 행동이 끝난 후 두 번째 행동이 시작된다는 순서를 더 분명하게 강조해요.',
        uz: '"V-고" oddiy bog‘lash uchun ham ishlatiladi, "V-고 나서" esa birinchi ish tugagandan keyin ikkinchisi boshlanishini aniq ta’kidlaydi.',
        en: 'V-고 can simply connect actions, while V-고 나서 more clearly emphasizes that the first action is completed before the second begins.',
        ru: 'V-고 может просто соединять действия, тогда как V-고 나서 яснее подчёркивает завершение первого действия перед вторым.',
      },
    },

    cautions: [
      {
        ko: '앞 동사를 과거형으로 만들지 않아요. "예약했고 나서"가 아니라 "예약하고 나서"라고 해요.',
        uz: 'Birinchi fe’l o‘tgan zamonga tuslanmaydi: 예약하고 나서.',
        en: 'Do not put the first verb in past tense: 예약하고 나서, not 예약했고 나서.',
        ru: 'Первый глагол не ставится в прошедшее время: 예약하고 나서.',
      },
      {
        ko: '"나서" 앞에서 "-고"를 빼지 않아요. "먹나서"가 아니라 "먹고 나서"예요.',
        uz: '"-고 나서" bir butun shakl: 먹고 나서.',
        en: 'Keep the full -고 나서 form: 먹고 나서.',
        ru: 'Используется полная форма -고 나서: 먹고 나서.',
      },
      {
        ko: '두 행동이 동시에 일어나는 상황에는 잘 맞지 않아요. "-고 나서"는 앞 행동이 먼저 끝난 후 다음 행동이 시작되는 순서를 나타내요.',
        uz: 'Bir vaqtda sodir bo‘ladigan ikki harakat uchun mos emas.',
        en: 'Do not use it for actions occurring simultaneously; it expresses a clear before-and-after sequence.',
        ru: 'Конструкция не подходит для одновременных действий; она выражает последовательность.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '비행기 표를 예약___ 호텔을 예약했어요.',
          uz: 'To‘g‘ri ketma-ketlik shaklini tanlang.',
          en: 'Choose the correct sequence expression.',
          ru: 'Выберите правильную конструкцию последовательности.',
        },
        options: [
          { text: '하고 나서', correct: true },
          { text: '했고 나서', correct: false },
          { text: '하는 나서', correct: false },
          { text: '해서 나서', correct: false },
          { text: '하거나 나서', correct: false },
        ],
      },
      {
        question: {
          ko: '아침을 먹___ 관광을 시작했어요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form.',
          ru: 'Выберите правильную форму.',
        },
        options: [
          { text: '고 나서', correct: true },
          { text: '었고 나서', correct: false },
          { text: '는 나서', correct: false },
          { text: '으니까', correct: false },
          { text: '려고', correct: false },
        ],
      },
      {
        question: {
          ko: '"도착하다"를 "-고 나서"로 바르게 바꾸세요.',
          uz: '"도착하다" ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct -고 나서 form of 도착하다.',
          ru: 'Выберите правильную форму 도착하다.',
        },
        options: [
          { text: '도착하고 나서', correct: true },
          { text: '도착했고 나서', correct: false },
          { text: '도착하는 나서', correct: false },
          { text: '도착해서 나서', correct: false },
          { text: '도착한 나서', correct: false },
        ],
      },
      {
        question: {
          ko: '"A하고 나서 B했어요"의 뜻으로 맞는 것을 고르세요.',
          uz: 'To‘g‘ri ma’noni tanlang.',
          en: 'Choose the correct meaning of "A하고 나서 B했어요."',
          ru: 'Выберите правильное значение.',
        },
        options: [
          { text: 'A를 끝낸 후 B를 했어요', correct: true },
          { text: 'A와 B를 동시에 했어요', correct: false },
          { text: 'B를 먼저 하고 A를 했어요', correct: false },
          { text: 'A를 하지 않았어요', correct: false },
          { text: 'A와 B 중 하나만 했어요', correct: false },
        ],
      },
      {
        question: {
          ko: '예약 내용을 ___ 결제하세요.',
          uz: '"Tekshirgandan keyin to‘lang" shaklini tanlang.',
          en: 'Choose the form meaning "Check the details, then pay."',
          ru: 'Выберите форму «Проверьте данные, затем оплатите».',
        },
        options: [
          { text: '확인하고 나서', correct: true },
          { text: '확인했고 나서', correct: false },
          { text: '확인하는 나서', correct: false },
          { text: '확인할까요', correct: false },
          { text: '확인하니까', correct: false },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // UNIT 6 — 비행기로 보내면 얼마예요?
  // 수단·방법 → 이유 → ㄹ 불규칙 → 방법·조건 → 과거 추측
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 6-1. N(으)로
  // ─────────────────────────────────────────────
  {
    code: 'noun-euro',
    pattern: 'N(으)로',
    section: 3,
    unit: 6,
    order: 1,
    isActive: true,

    summary: {
      ko: '교통수단, 도구, 방법, 재료, 방향 등을 나타낼 때 사용하는 조사예요. 받침이 있으면 주로 "으로", 받침이 없거나 ㄹ 받침이면 "로"를 사용해요.',
      uz: 'Transport vositasi, asbob, usul, material yoki yo‘nalishni ko‘rsatishda ishlatiladigan qo‘shimcha. 받침 bo‘lsa odatda "으로", 받침 bo‘lmasa yoki ㄹ bilan tugasa "로" ishlatiladi.',
      en: 'A particle used to express means of transportation, tools, methods, materials, or direction. Use "으로" after most final consonants and "로" after vowels or final ㄹ.',
      ru: 'Частица, обозначающая транспорт, средство, способ, материал или направление. После большинства конечных согласных используется "으로", а после гласной или ㄹ — "로".',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '수단·방법',
        uz: 'Vosita va usul',
        en: 'Means & method',
        ru: 'Средство и способ',
      },
      {
        ko: '조사',
        uz: 'Ko‘makchi',
        en: 'Particle',
        ru: 'Частица',
      },
    ],

    explanation: {
      ko: '"N(으)로"는 어떤 행동을 할 때 사용하는 수단이나 방법, 도구, 교통수단 등을 나타내는 조사예요. 한국어 일상생활에서 굉장히 많이 사용하고, 이번 과처럼 우체국이나 은행에서 일을 처리할 때도 자주 나와요.\n\n가장 이해하기 쉬운 쓰임은 교통수단이에요. "버스로 가요", "지하철로 회사에 가요", "비행기로 제주도에 가요"처럼 무엇을 타고 이동하는지 말할 수 있어요. 이때 "버스, 지하철, 비행기"가 이동의 수단이 되는 거예요.\n\n도구나 방법에도 사용할 수 있어요. "가위로 종이를 잘라요"는 가위라는 도구를 사용한다는 뜻이고, "카드로 계산해요"는 카드라는 방법으로 돈을 낸다는 뜻이에요. "이메일로 보내 주세요", "한국어로 말해 주세요"처럼 전달 방법이나 언어를 나타낼 수도 있어요.\n\n이번 단원에서는 특히 우편을 보내는 방법을 말할 때 중요해요. "비행기로 보내요"는 항공편으로 보내는 것이고, "배로 보내요"는 선편으로 보내는 것이에요. 그래서 "비행기로 보내면 얼마예요?"처럼 사용할 수 있어요.\n\n형태는 받침에 따라 달라져요. 일반적인 받침이 있으면 "으로"를 붙여서 "손 → 손으로", "연필 → 연필로"처럼 사용하는데, 여기에서 중요한 예외가 있어요. ㄹ 받침은 받침이 있지만 "으로"가 아니라 "로"를 써요. 그래서 "길으로"가 아니라 "길로", "서울으로"가 아니라 "서울로"라고 해요.\n\n받침이 없으면 바로 "로"를 붙여요. "버스 → 버스로", "택시 → 택시로", "비행기 → 비행기로"가 돼요.\n\n또 "(으)로"는 방향도 나타낼 수 있어요. "오른쪽으로 가세요", "서울로 출발해요"처럼 어느 방향이나 목적지를 향하는지 말할 수 있어요. 하지만 이번 과에서는 먼저 수단과 방법의 의미를 중심으로 익히는 것이 좋아요.',
      uz: '"N(으)로" harakat qanday vosita, usul yoki asbob yordamida bajarilishini ko‘rsatadi. Transport bilan juda ko‘p ishlatiladi: 버스로 가요, 비행기로 가요.\n\nAsbob yoki to‘lov usulini ham ko‘rsatadi: 가위로 잘라요 — qaychi bilan kesaman, 카드로 계산해요 — karta bilan to‘layman. "이메일로 보내 주세요" esa elektron pochta orqali yuborishni bildiradi.\n\nBu darsda pochta jo‘natmalari bilan ayniqsa muhim: "비행기로 보내요" — samolyot orqali yuborish, "배로 보내요" — kema orqali yuborish.\n\nOddiy 받침 bo‘lsa "으로": 손 → 손으로. 받침 bo‘lmasa "로": 버스 → 버스로. ㄹ 받침 istisno bo‘lib, unga ham "로" qo‘shiladi: 길 → 길로, 서울 → 서울로.\n\nShuningdek, "(으)로" yo‘nalishni ham ifodalashi mumkin: 오른쪽으로 가세요.',
      en: '"N(으)로" marks the means, method, tool, or transportation used to perform an action. It is one of the most useful Korean particles in everyday life.\n\nFor transportation, you can say "버스로 가요," "지하철로 회사에 가요," or "비행기로 제주도에 가요." The noun before (으)로 is the means of transportation.\n\nIt is also used for tools and methods: "가위로 종이를 잘라요" means cutting paper with scissors, while "카드로 계산해요" means paying by card. Expressions such as "이메일로 보내 주세요" and "한국어로 말해 주세요" show a means of communication or language.\n\nIn this lesson, it is especially useful for postal methods. "비행기로 보내요" means sending something by air, while "배로 보내요" means sending it by sea.\n\nAfter most consonant-ending nouns, use "으로." After vowel-ending nouns, use "로." Final ㄹ is an important exception: although it is a consonant, it also takes "로": 길 → 길로, 서울 → 서울로.\n\nThe particle can also express direction, as in "오른쪽으로 가세요," but this lesson mainly focuses on means and methods.',
      ru: '"N(으)로" показывает средство, способ, инструмент или транспорт, с помощью которого выполняется действие.\n\nС транспортом можно сказать "버스로 가요", "지하철로 회사에 가요", "비행기로 제주도에 가요".\n\nЧастица также употребляется с инструментами и способами: "가위로 종이를 잘라요" — резать ножницами, "카드로 계산해요" — платить картой. "이메일로 보내 주세요" означает «отправьте по электронной почте».\n\nВ этом уроке конструкция особенно важна для способов отправки почты: "비행기로 보내요" — отправить авиапочтой, "배로 보내요" — морской почтой.\n\nПосле большинства существительных с 받침 используется "으로". После гласной используется "로". Важное исключение — конечный ㄹ: 길 → 길로, 서울 → 서울로.\n\nТакже конструкция может обозначать направление: "오른쪽으로 가세요".',
    },

    conjugationRule: {
      ko: '받침 O + 으로  ·  받침 X + 로  ·  ㄹ 받침 + 로',
      uz: '받침 bor + 으로  ·  받침 yo‘q + 로  ·  ㄹ 받침 + 로',
      en: 'final consonant + 으로  ·  vowel + 로  ·  final ㄹ + 로',
      ru: 'конечный согласный + 으로  ·  гласная + 로  ·  конечный ㄹ + 로',
    },

    conjugations: [
      // 일반 받침 O — 5
      { base: '손', result: '손으로' },
      { base: '숟가락', result: '숟가락으로' },
      { base: '택배 상자', result: '택배 상자로' },
      { base: '한국말', result: '한국말로' },
      { base: '왼쪽', result: '왼쪽으로' },

      // 받침 X — 5
      { base: '비행기', result: '비행기로' },
      { base: '버스', result: '버스로' },
      { base: '택시', result: '택시로' },
      { base: '카드', result: '카드로' },
      { base: '이메일', result: '이메일로' },

      // ㄹ 받침 예외
      { base: '길', result: '길로' },
      { base: '서울', result: '서울로' },
      { base: '지하철', result: '지하철로' },
    ],

    examples: [
      {
        ko: '이 소포를 비행기로 보내고 싶어요.',
        highlight: '비행기로',
        gloss: {
          ko: '이 소포를 비행기로 보내고 싶어요.',
          uz: 'Bu posilkani samolyot orqali yubormoqchiman.',
          en: 'I would like to send this package by air.',
          ru: 'Я хочу отправить эту посылку авиапочтой.',
        },
      },
      {
        ko: '비행기로 보내면 얼마예요?',
        highlight: '비행기로',
        gloss: {
          ko: '비행기로 보내면 얼마예요?',
          uz: 'Samolyot orqali yuborsam, qancha turadi?',
          en: 'How much is it if I send it by air?',
          ru: 'Сколько стоит отправить авиапочтой?',
        },
      },
      {
        ko: '학교에 지하철로 가요.',
        highlight: '지하철로',
        gloss: {
          ko: '학교에 지하철로 가요.',
          uz: 'Maktabga metroda boraman.',
          en: 'I go to school by subway.',
          ru: 'Я езжу в школу на метро.',
        },
      },
      {
        ko: '카드로 계산해도 돼요?',
        highlight: '카드로',
        gloss: {
          ko: '카드로 계산해도 돼요?',
          uz: 'Karta bilan to‘lasam bo‘ladimi?',
          en: 'Can I pay by card?',
          ru: 'Можно заплатить картой?',
        },
      },
      {
        ko: '신청서를 이메일로 보내 주세요.',
        highlight: '이메일로',
        gloss: {
          ko: '신청서를 이메일로 보내 주세요.',
          uz: 'Arizani elektron pochta orqali yuboring.',
          en: 'Please send the application by email.',
          ru: 'Отправьте заявление по электронной почте.',
        },
      },
      {
        ko: '이 서류는 펜으로 쓰세요.',
        highlight: '펜으로',
        gloss: {
          ko: '이 서류는 펜으로 쓰세요.',
          uz: 'Bu hujjatni ruchka bilan yozing.',
          en: 'Please fill out this document with a pen.',
          ru: 'Заполните этот документ ручкой.',
        },
      },
      {
        ko: '우체국에 버스로 갈 수 있어요.',
        highlight: '버스로',
        gloss: {
          ko: '우체국에 버스로 갈 수 있어요.',
          uz: 'Pochtaga avtobusda borish mumkin.',
          en: 'You can get to the post office by bus.',
          ru: 'До почты можно доехать на автобусе.',
        },
      },
      {
        ko: '이쪽 길로 계속 가세요.',
        highlight: '길로',
        gloss: {
          ko: '이쪽 길로 계속 가세요.',
          uz: 'Shu yo‘l bo‘ylab davom eting.',
          en: 'Continue along this road.',
          ru: 'Продолжайте идти по этой дороге.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이 소포를 미국에 보내려고 하는데요.',
        highlight: '미국에 보내려고',
        gloss: {
          ko: '이 소포를 미국에 보내려고 하는데요.',
          uz: 'Bu posilkani AQShga yubormoqchiman.',
          en: 'I would like to send this package to the United States.',
          ru: 'Я хотел бы отправить эту посылку в США.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '비행기로 보내실 거예요, 배로 보내실 거예요?',
        highlight: '비행기로',
        gloss: {
          ko: '비행기로 보내실 거예요, 배로 보내실 거예요?',
          uz: 'Samolyot orqali yuborasizmi yoki kema orqali?',
          en: 'Will you send it by air or by sea?',
          ru: 'Вы отправите авиапочтой или морской почтой?',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '비행기로 보내 주세요.',
        highlight: '비행기로',
        gloss: {
          ko: '비행기로 보내 주세요.',
          uz: 'Samolyot orqali yuboring.',
          en: 'Please send it by air.',
          ru: 'Отправьте авиапочтой, пожалуйста.',
        },
      },
    ],

    similar: {
      pattern: 'N에',
      note: {
        ko: '"N에"는 주로 이동의 목적지나 위치를 나타내고, "N(으)로"는 이동 수단이나 방법 또는 방향을 나타낼 수 있어요. "서울에 가요"는 목적지가 서울이라는 뜻이고, "서울로 가요"는 서울 방향으로 이동한다는 느낌이 있어요.',
        uz: '"N에" manzilni, "N(으)로" esa vosita, usul yoki yo‘nalishni ko‘rsatishi mumkin.',
        en: '"N에" commonly marks a destination or location, while "N(으)로" can mark a means, method, or direction.',
        ru: '"N에" обычно обозначает место назначения или местоположение, а "N(으)로" — средство, способ или направление.',
      },
    },

    cautions: [
      {
        ko: 'ㄹ 받침 뒤에는 "으로"를 쓰지 않아요. "지하철으로"가 아니라 "지하철로", "서울으로"가 아니라 "서울로"예요.',
        uz: 'ㄹ 받침 bilan "로": 지하철로, 서울로.',
        en: 'After final ㄹ, use 로: 지하철로 and 서울로, not 지하철으로 or 서울으로.',
        ru: 'После конечного ㄹ используется 로: 지하철로, 서울로.',
      },
      {
        ko: '교통수단 자체를 목적지처럼 "에"와 혼동하지 않아요. "버스에 학교에 가요"가 아니라 이동 수단을 말하면 "버스로 학교에 가요"예요.',
        uz: 'Transport vositasi uchun 로 ishlatiladi: 버스로 학교에 가요.',
        en: 'Use 로 for the means of transportation: 버스로 학교에 가요.',
        ru: 'Для транспорта используется 로: 버스로 학교에 가요.',
      },
      {
        ko: '"카드으로"라고 하지 않아요. 받침이 없는 "카드"에는 "로"를 붙여서 "카드로"라고 해요.',
        uz: '카드 → 카드로.',
        en: '카드 ends in a vowel, so say 카드로, not 카드으로.',
        ru: '카드 оканчивается на гласную, поэтому правильно 카드로.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '이 소포를 비행기___ 보내 주세요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct particle after 비행기.',
          ru: 'Выберите правильную частицу после 비행기.',
        },
        options: [
          { text: '로', correct: true },
          { text: '으로', correct: false },
          { text: '에서', correct: false },
          { text: '에게', correct: false },
          { text: '까지', correct: false },
        ],
      },
      {
        question: {
          ko: '종이를 가위___ 잘랐어요.',
          uz: 'Qaychi bilan kesish shaklini tanlang.',
          en: 'Choose the form meaning "with scissors."',
          ru: 'Выберите форму «ножницами».',
        },
        options: [
          { text: '로', correct: true },
          { text: '으로', correct: false },
          { text: '보다', correct: false },
          { text: '이나', correct: false },
          { text: '부터', correct: false },
        ],
      },
      {
        question: {
          ko: '오른쪽___ 가세요.',
          uz: 'Yo‘nalishni ko‘rsating.',
          en: 'Choose the direction marker.',
          ru: 'Выберите форму направления.',
        },
        options: [
          { text: '으로', correct: true },
          { text: '로', correct: false },
          { text: '에서', correct: false },
          { text: '에게', correct: false },
          { text: '이나', correct: false },
        ],
      },
      {
        question: {
          ko: '"지하철"과 함께 맞는 형태를 고르세요.',
          uz: '"지하철" bilan to‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 지하철.',
          ru: 'Выберите правильную форму после 지하철.',
        },
        options: [
          { text: '지하철로', correct: true },
          { text: '지하철으로', correct: false },
          { text: '지하철으러', correct: false },
          { text: '지하철에로', correct: false },
          { text: '지하철으로서', correct: false },
        ],
      },
      {
        question: {
          ko: '카드___ 계산해도 돼요?',
          uz: 'Karta bilan to‘lash shaklini tanlang.',
          en: 'Choose the correct form meaning "pay by card."',
          ru: 'Выберите форму «заплатить картой».',
        },
        options: [
          { text: '로', correct: true },
          { text: '으로', correct: false },
          { text: '에게', correct: false },
          { text: '에서', correct: false },
          { text: '동안', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 6-2. N(이)라서
  // ─────────────────────────────────────────────
  {
    code: 'noun-iraseo',
    pattern: 'N(이)라서',
    section: 3,
    unit: 6,
    order: 2,
    isActive: true,

    summary: {
      ko: '앞의 명사가 뒤의 상황이나 결과에 대한 이유임을 나타내요. 받침이 있으면 "이라서", 받침이 없으면 "라서"를 사용해요.',
      uz: 'Oldingi ot keyingi holat yoki natijaning sababi ekanini bildiradi. 받침 bo‘lsa "이라서", 받침 bo‘lmasa "라서" ishlatiladi.',
      en: 'Expresses that the preceding noun is the reason for the following situation or result. Use "이라서" after a final consonant and "라서" after a vowel.',
      ru: 'Показывает, что существительное является причиной следующей ситуации или результата. После конечного согласного используется "이라서", после гласной — "라서".',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '이유',
        uz: 'Sabab',
        en: 'Reason',
        ru: 'Причина',
      },
      {
        ko: '명사',
        uz: 'Ot',
        en: 'Noun',
        ru: 'Существительное',
      },
    ],

    explanation: {
      ko: '"N(이)라서"는 앞에 오는 명사가 뒤에 나타나는 상황이나 결과의 이유라는 것을 설명할 때 사용하는 표현이에요. 쉽게 말하면 "N이기 때문에", "N여서"와 비슷한 뜻이에요.\n\n예를 들어 "오늘은 일요일이라서 은행이 문을 닫았어요"라고 하면 은행이 문을 닫은 이유가 오늘이 일요일이기 때문이라는 뜻이에요. "외국인이라서 여권이 필요해요"에서는 외국인이라는 신분이 여권이 필요한 이유가 돼요.\n\n형태는 명사의 받침 여부에 따라 달라져요. 받침이 있는 명사에는 "이라서"를 붙여요. "학생 → 학생이라서", "주말 → 주말이라서", "공휴일 → 공휴일이라서"처럼 사용해요.\n\n받침이 없는 명사에는 "라서"를 붙여요. "휴가 → 휴가라서", "의사 → 의사라서", "친구 → 친구라서"처럼 말해요.\n\n이 표현은 앞에서 배운 "N(이)니까"와 의미가 비슷하지만 사용 방식에 조금 차이가 있어요. 둘 다 이유를 나타내지만 "-(이)니까"는 이유를 근거로 뒤에 명령이나 제안을 하는 문장에도 자연스럽게 쓸 수 있어요. 반면 "-(이)라서"는 일반적인 원인과 결과를 설명할 때 매우 자연스러워요.\n\n예를 들어 "오늘은 공휴일이라서 은행이 쉬어요"는 사실관계의 원인과 결과를 설명하는 문장이고, "오늘은 공휴일이니까 내일 은행에 가세요"는 공휴일이라는 이유를 근거로 상대방에게 행동을 권하는 문장이에요.\n\n우체국이나 은행에서도 자주 사용할 수 있어요. "국제 소포라서 요금이 비싸요", "처음이라서 잘 모르겠어요", "외국인이라서 이 서류도 필요해요"처럼 어떤 상황이 왜 그런지를 자연스럽게 설명할 수 있어요.',
      uz: '"N(이)라서" otni sabab sifatida ko‘rsatadi. Ma’nosi "N bo‘lgani uchun" ga yaqin.\n\nMasalan, "오늘은 일요일이라서 은행이 문을 닫았어요" — bugun yakshanba bo‘lgani uchun bank yopiq.\n\n받침 bo‘lsa "이라서": 학생 → 학생이라서, 주말 → 주말이라서. 받침 bo‘lmasa "라서": 휴가 → 휴가라서, 의사 → 의사라서.\n\n"N(이)니까" bilan o‘xshash, lekin "(이)라서" odatda oddiy sabab va natijani tushuntirishda juda tabiiy. "(이)니까" esa maslahat yoki buyruq oldidan ham ko‘p ishlatiladi.',
      en: '"N(이)라서" explains that the noun before it is the reason for the situation or result that follows. It can often be understood as "because it is N."\n\nFor example, "오늘은 일요일이라서 은행이 문을 닫았어요" means that the bank is closed because today is Sunday.\n\nAfter a consonant-ending noun, use "이라서": 학생 → 학생이라서, 주말 → 주말이라서. After a vowel-ending noun, use "라서": 휴가 → 휴가라서, 의사 → 의사라서.\n\nIt is similar to "N(이)니까," but (이)라서 is especially natural when simply explaining cause and result. (이)니까 is often preferred when the following clause is a suggestion, command, or recommendation.',
      ru: '"N(이)라서" показывает, что предшествующее существительное является причиной последующей ситуации. По смыслу близко к «потому что это N».\n\nНапример, "오늘은 일요일이라서 은행이 문을 닫았어요" означает, что банк закрыт, потому что сегодня воскресенье.\n\nПосле существительного с конечным согласным используется "이라서": 학생이라서, 주말이라서. После существительного без 받침 — "라서": 휴가라서, 의사라서.\n\nКонструкция близка к "N(이)니까", но "(이)라서" особенно естественно употребляется для обычного объяснения причины и результата.',
    },

    conjugationRule: {
      ko: '받침 O + 이라서  ·  받침 X + 라서',
      uz: '받침 bor + 이라서  ·  받침 yo‘q + 라서',
      en: 'final consonant + 이라서  ·  vowel + 라서',
      ru: 'конечный согласный + 이라서  ·  гласная + 라서',
    },

    conjugations: [
      // 받침 O — 5
      { base: '학생', result: '학생이라서' },
      { base: '주말', result: '주말이라서' },
      { base: '일요일', result: '일요일이라서' },
      { base: '공휴일', result: '공휴일이라서' },
      { base: '외국인', result: '외국인이라서' },

      // 받침 X — 5
      { base: '휴가', result: '휴가라서' },
      { base: '의사', result: '의사라서' },
      { base: '친구', result: '친구라서' },
      { base: '회사원', result: '회사원이라서' },
      { base: '소포', result: '소포라서' },
    ],

    examples: [
      {
        ko: '오늘은 일요일이라서 은행이 문을 닫았어요.',
        highlight: '일요일이라서',
        gloss: {
          ko: '오늘은 일요일이라서 은행이 문을 닫았어요.',
          uz: 'Bugun yakshanba bo‘lgani uchun bank yopiq.',
          en: 'The bank is closed because today is Sunday.',
          ru: 'Банк закрыт, потому что сегодня воскресенье.',
        },
      },
      {
        ko: '국제 소포라서 요금이 조금 비싸요.',
        highlight: '국제 소포라서',
        gloss: {
          ko: '국제 소포라서 요금이 조금 비싸요.',
          uz: 'Xalqaro posilka bo‘lgani uchun narxi biroz qimmat.',
          en: 'The fee is a little expensive because it is an international package.',
          ru: 'Стоимость немного выше, потому что это международная посылка.',
        },
      },
      {
        ko: '외국인이라서 여권을 보여 줘야 해요.',
        highlight: '외국인이라서',
        gloss: {
          ko: '외국인이라서 여권을 보여 줘야 해요.',
          uz: 'Chet ellik bo‘lganim uchun pasport ko‘rsatishim kerak.',
          en: 'I need to show my passport because I am a foreigner.',
          ru: 'Мне нужно показать паспорт, потому что я иностранец.',
        },
      },
      {
        ko: '처음이라서 방법을 잘 모르겠어요.',
        highlight: '처음이라서',
        gloss: {
          ko: '처음이라서 방법을 잘 모르겠어요.',
          uz: 'Birinchi marta bo‘lgani uchun usulini yaxshi bilmayman.',
          en: 'I am not sure how to do it because it is my first time.',
          ru: 'Я плохо знаю, как это делать, потому что это мой первый раз.',
        },
      },
      {
        ko: '오늘은 공휴일이라서 우체국이 쉬어요.',
        highlight: '공휴일이라서',
        gloss: {
          ko: '오늘은 공휴일이라서 우체국이 쉬어요.',
          uz: 'Bugun bayram kuni bo‘lgani uchun pochta ishlamaydi.',
          en: 'The post office is closed because today is a public holiday.',
          ru: 'Почта закрыта, потому что сегодня праздничный день.',
        },
      },
      {
        ko: '급한 서류라서 빠른 우편으로 보냈어요.',
        highlight: '급한 서류라서',
        gloss: {
          ko: '급한 서류라서 빠른 우편으로 보냈어요.',
          uz: 'Shoshilinch hujjat bo‘lgani uchun tezkor pochta orqali yubordim.',
          en: 'I sent it by express mail because it was an urgent document.',
          ru: 'Я отправил документ экспресс-почтой, потому что он срочный.',
        },
      },
      {
        ko: '학생이라서 송금 수수료 할인을 받을 수 있어요.',
        highlight: '학생이라서',
        gloss: {
          ko: '학생이라서 송금 수수료 할인을 받을 수 있어요.',
          uz: 'Talaba bo‘lganim uchun pul o‘tkazish komissiyasiga chegirma olishim mumkin.',
          en: 'I can get a discount on the transfer fee because I am a student.',
          ru: 'Я могу получить скидку на комиссию за перевод, потому что я студент.',
        },
      },
      {
        ko: '친구가 보내 준 선물이라서 소중해요.',
        highlight: '선물이라서',
        gloss: {
          ko: '친구가 보내 준 선물이라서 소중해요.',
          uz: 'Do‘stim yuborgan sovg‘a bo‘lgani uchun men uchun qadrli.',
          en: 'It is precious to me because it is a gift my friend sent.',
          ru: 'Этот подарок мне дорог, потому что его прислал друг.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '왜 요금이 이렇게 비싸요?',
        highlight: '왜 요금이 이렇게 비싸요',
        gloss: {
          ko: '왜 요금이 이렇게 비싸요?',
          uz: 'Nega narxi buncha qimmat?',
          en: 'Why is the fee this expensive?',
          ru: 'Почему стоимость такая высокая?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '국제 특급 우편이라서 일반 우편보다 비싸요.',
        highlight: '국제 특급 우편이라서',
        gloss: {
          ko: '국제 특급 우편이라서 일반 우편보다 비싸요.',
          uz: 'Xalqaro tezkor pochta bo‘lgani uchun oddiy pochtadan qimmatroq.',
          en: 'It is more expensive than regular mail because it is international express mail.',
          ru: 'Она дороже обычной почты, потому что это международная экспресс-почта.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '그럼 일반 우편으로 보낼게요.',
        highlight: '일반 우편으로',
        gloss: {
          ko: '그럼 일반 우편으로 보낼게요.',
          uz: 'Unda oddiy pochta orqali yuboraman.',
          en: 'Then I will send it by regular mail.',
          ru: 'Тогда я отправлю обычной почтой.',
        },
      },
    ],

    similar: {
      pattern: 'N(이)니까',
      note: {
        ko: '둘 다 명사를 이유로 연결하지만 "N(이)라서"는 일반적인 원인·결과 설명에 자연스럽고, "N(이)니까"는 그 이유를 근거로 뒤에서 제안하거나 명령할 때 특히 자연스러워요.',
        uz: 'Ikkalasi ham sababni bildiradi. "(이)라서" oddiy sabab-natijada, "(이)니까" esa maslahat yoki buyruq bilan tabiiyroq.',
        en: 'Both express a noun-based reason. (이)라서 is natural for ordinary cause and result, while (이)니까 is especially common before suggestions or commands.',
        ru: 'Обе конструкции выражают причину. "(이)라서" естественно для обычной причинно-следственной связи, а "(이)니까" часто употребляется перед советами и приказами.',
      },
    },

    cautions: [
      {
        ko: '받침 있는 명사 뒤에 바로 "라서"를 붙이지 않아요. "학생라서"가 아니라 "학생이라서"예요.',
        uz: '받침 bilan "이라서": 학생이라서.',
        en: 'After a final consonant, use 이라서: 학생이라서.',
        ru: 'После конечного согласного используется 이라서: 학생이라서.',
      },
      {
        ko: '받침 없는 명사에는 불필요한 "이"를 넣지 않아요. "휴가이라서"가 아니라 "휴가라서"예요.',
        uz: '받침 yo‘q bo‘lsa "라서": 휴가라서.',
        en: 'After a vowel-ending noun, use 라서: 휴가라서.',
        ru: 'После существительного без 받침 используется 라서: 휴가라서.',
      },
      {
        ko: '동사나 형용사에 "(이)라서"를 바로 붙이는 문법이 아니에요. "비싸라서"가 아니라 형용사는 "비싸서"와 같은 다른 연결 형태를 사용해요.',
        uz: '"(이)라서" otlar bilan ishlatiladi.',
        en: '(이)라서 is a noun construction; do not attach it directly to verbs or adjectives.',
        ru: '(이)라서 используется с существительными, а не непосредственно с глаголами или прилагательными.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '오늘은 일요일___ 은행이 쉬어요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 일요일.',
          ru: 'Выберите правильную форму после 일요일.',
        },
        options: [
          { text: '이라서', correct: true },
          { text: '라서', correct: false },
          { text: '니까', correct: false },
          { text: '으로', correct: false },
          { text: '동안', correct: false },
        ],
      },
      {
        question: {
          ko: '오늘은 휴가___ 회사에 안 가요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 휴가.',
          ru: 'Выберите правильную форму после 휴가.',
        },
        options: [
          { text: '라서', correct: true },
          { text: '이라서', correct: false },
          { text: '으로', correct: false },
          { text: '까지', correct: false },
          { text: '보다', correct: false },
        ],
      },
      {
        question: {
          ko: '국제 소포___ 요금이 비싸요.',
          uz: 'To‘g‘ri sabab shaklini tanlang.',
          en: 'Choose the correct reason form after 소포.',
          ru: 'Выберите правильную форму причины после 소포.',
        },
        options: [
          { text: '라서', correct: true },
          { text: '이라서', correct: false },
          { text: '으로', correct: false },
          { text: '마다', correct: false },
          { text: '밖에', correct: false },
        ],
      },
      {
        question: {
          ko: '저는 외국인___ 여권이 필요해요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 외국인.',
          ru: 'Выберите правильную форму после 외국인.',
        },
        options: [
          { text: '이라서', correct: true },
          { text: '라서', correct: false },
          { text: '으로', correct: false },
          { text: '보다', correct: false },
          { text: '까지', correct: false },
        ],
      },
      {
        question: {
          ko: '"친구" 뒤에 맞는 형태를 고르세요.',
          uz: '"친구" bilan to‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 친구.',
          ru: 'Выберите правильную форму после 친구.',
        },
        options: [
          { text: '친구라서', correct: true },
          { text: '친구이라서', correct: false },
          { text: '친구으라서', correct: false },
          { text: '친구으로', correct: false },
          { text: '친구이라니까', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 6-3. 'ㄹ' 불규칙
  // ─────────────────────────────────────────────
  {
    code: 'rieul-irregular',
    pattern: "'ㄹ' 불규칙",
    section: 3,
    unit: 6,
    order: 3,
    isActive: true,

    summary: {
      ko: '어간이 ㄹ 받침으로 끝나는 동사와 형용사는 뒤에 ㄴ, ㅂ, ㅅ으로 시작하는 어미가 오면 ㄹ이 탈락해요. 한국어의 여러 문법 활용에서 반복해서 나타나는 중요한 규칙이에요.',
      uz: 'O‘zagi ㄹ bilan tugagan fe’l va sifatlarda ㄴ, ㅂ yoki ㅅ bilan boshlanadigan qo‘shimcha kelganda ㄹ tushib qoladi. Bu koreys tilidagi juda muhim takrorlanuvchi qoidadir.',
      en: 'When a verb or adjective stem ends in ㄹ, the ㄹ drops before endings beginning with ㄴ, ㅂ, or ㅅ. This is an important recurring Korean conjugation rule.',
      ru: 'У глаголов и прилагательных с основой на ㄹ этот ㄹ выпадает перед окончаниями, начинающимися на ㄴ, ㅂ или ㅅ. Это одно из важных правил корейского спряжения.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '불규칙 활용',
        uz: 'Noto‘g‘ri tuslanish',
        en: 'Irregular conjugation',
        ru: 'Неправильное спряжение',
      },
      {
        ko: 'ㄹ 탈락',
        uz: 'ㄹ tushishi',
        en: 'ㄹ deletion',
        ru: 'Выпадение ㄹ',
      },
    ],

    explanation: {
      ko: '"ㄹ 불규칙"은 어간의 마지막 받침이 ㄹ인 동사나 형용사가 특정 어미와 만났을 때 ㄹ이 없어지는 활용이에요. 사실 학습자는 앞의 여러 문법에서 이미 이 현상을 조금씩 봤어요. "살다 → 사는 것", "길다 → 긴 것", "멀다 → 먼데" 같은 형태가 모두 같은 원리예요.\n\n핵심 규칙은 ㄹ 받침 뒤에 ㄴ, ㅂ, ㅅ 계열의 어미가 오면 ㄹ이 탈락한다는 거예요. 예를 들어 "살다"에 현재 관형형 "-는"이 붙으면 "살는"이 아니라 "사는"이 돼요. "만들다"에 "-는"이 붙으면 "만드는"이 되고요.\n\n형용사에서도 마찬가지예요. "길다"에 "-ㄴ"이 붙으면 "길ㄴ"이 아니라 ㄹ이 사라지고 "긴"이 돼요. "멀다"는 "먼", "달다"는 "단"으로 활용할 수 있어요.\n\nㅂ으로 시작하는 격식체 어미에서도 ㄹ이 없어져요. "알다 → 압니다", "살다 → 삽니다", "만들다 → 만듭니다"처럼 활용해요. 초급 학습자가 "알습니다", "살습니다"라고 잘못 말하는 경우가 정말 많아요.\n\nㅅ으로 시작하는 높임이나 특정 어미 앞에서도 ㄹ이 탈락할 수 있어요. 예를 들어 "살다 + -세요 → 사세요", "알다 + -세요 → 아세요"가 돼요. "살세요", "알세요"라고 하지 않아요.\n\n하지만 ㄹ이 항상 없어지는 것은 아니에요. 뒤에 오는 어미가 ㄴ, ㅂ, ㅅ 계열이 아니라면 ㄹ이 그대로 유지되는 경우가 많아요. "살아요", "알아요", "만들어요", "길어요"처럼 "-아/어요" 앞에서는 ㄹ이 유지돼요.\n\n그래서 ㄹ 불규칙은 단어 하나하나를 따로 외우는 것보다 "뒤에 어떤 어미가 오는가"를 보는 것이 중요해요. 앞으로 새로운 문법을 배울 때 어간이 ㄹ로 끝난다면 항상 ㄹ 탈락 여부를 확인하는 습관을 들이면 좋아요.',
      uz: '"ㄹ 불규칙" ㄹ bilan tugagan o‘zakning ma’lum qo‘shimchalar oldida ㄹ ni yo‘qotishini bildiradi. Siz bu holatni oldingi grammatikalarda ham ko‘rgansiz: 살다 → 사는 것, 길다 → 긴 것, 멀다 → 먼데.\n\nAsosiy qoida: ㄴ, ㅂ yoki ㅅ bilan boshlanuvchi qo‘shimcha oldidan ㄹ tushadi. 살다 + 는 → 사는, 만들다 + 는 → 만드는.\n\nRasmiy shaklda ham: 알다 → 압니다, 살다 → 삽니다. "-세요" oldidan: 살다 → 사세요, 알다 → 아세요.\n\nLekin ㄹ har doim tushmaydi. "-아/어요" kabi shakllarda saqlanadi: 살아요, 알아요, 만들어요.\n\nShuning uchun keyingi qo‘shimchaning birinchi tovushiga e’tibor berish muhim.',
      en: 'The so-called "ㄹ irregular" describes the deletion of final ㄹ from a verb or adjective stem before certain endings. You have actually encountered this several times already: 살다 → 사는 것, 길다 → 긴 것, and 멀다 → 먼데 all follow the same principle.\n\nThe central rule is that final ㄹ drops before endings beginning with ㄴ, ㅂ, or ㅅ. Thus 살다 + -는 becomes 사는, not 살는, and 만들다 becomes 만드는.\n\nThe same thing happens before formal endings beginning in ㅂ: 알다 → 압니다, 살다 → 삽니다, 만들다 → 만듭니다. Learners often incorrectly produce forms such as 알습니다.\n\nBefore some ㅅ-initial endings, ㄹ also drops: 살다 → 사세요 and 알다 → 아세요.\n\nHowever, ㄹ does not disappear before every ending. It remains in forms such as 살아요, 알아요, 만들어요, and 길어요.\n\nInstead of memorizing each word separately, pay attention to the initial sound of the following ending.',
      ru: '"ㄹ 불규칙" — это выпадение конечного ㄹ основы перед определёнными окончаниями. Это явление уже встречалось в предыдущих темах: 살다 → 사는 것, 길다 → 긴 것, 멀다 → 먼데.\n\nОсновное правило: ㄹ выпадает перед окончаниями, начинающимися на ㄴ, ㅂ или ㅅ. Поэтому 살다 + -는 превращается в 사는, а 만들다 + -는 — в 만드는.\n\nПеред формальными окончаниями на ㅂ происходит то же самое: 알다 → 압니다, 살다 → 삽니다, 만들다 → 만듭니다.\n\nПеред некоторыми окончаниями на ㅅ: 살다 → 사세요, 알다 → 아세요.\n\nОднако ㄹ исчезает не всегда. В формах 살아요, 알아요, 만들어요, 길어요 он сохраняется.\n\nПоэтому важно смотреть не только на слово, но и на начало следующего окончания.',
    },

    conjugationRule: {
      ko: 'ㄹ 받침 어간 + ㄴ/ㅂ/ㅅ 계열 어미 → ㄹ 탈락  ·  그 외 어미에서는 ㄹ 유지 가능',
      uz: 'ㄹ o‘zak + ㄴ/ㅂ/ㅅ bilan boshlanuvchi qo‘shimcha → ㄹ tushadi',
      en: 'ㄹ-final stem + ㄴ/ㅂ/ㅅ-initial ending → ㄹ drops',
      ru: 'основа на ㄹ + окончание на ㄴ/ㅂ/ㅅ → ㄹ выпадает',
    },

    conjugations: [
      { base: '살다 + -는', result: '사는' },
      { base: '만들다 + -는', result: '만드는' },
      { base: '놀다 + -는', result: '노는' },
      { base: '길다 + -ㄴ', result: '긴' },
      { base: '멀다 + -ㄴ', result: '먼' },

      { base: '알다 + -ㅂ니다', result: '압니다' },
      { base: '살다 + -ㅂ니다', result: '삽니다' },
      { base: '만들다 + -ㅂ니다', result: '만듭니다' },

      { base: '살다 + -세요', result: '사세요' },
      { base: '알다 + -세요', result: '아세요' },

      // ㄹ 유지 비교
      { base: '살다 + -아요', result: '살아요' },
      { base: '알다 + -아요', result: '알아요' },
      { base: '만들다 + -어요', result: '만들어요' },
    ],

    examples: [
      {
        ko: '서울에 사는 친구가 있어요.',
        highlight: '사는',
        gloss: {
          ko: '서울에 사는 친구가 있어요.',
          uz: 'Seulda yashaydigan do‘stim bor.',
          en: 'I have a friend who lives in Seoul.',
          ru: 'У меня есть друг, который живёт в Сеуле.',
        },
      },
      {
        ko: '제가 만드는 음식은 김치찌개예요.',
        highlight: '만드는',
        gloss: {
          ko: '제가 만드는 음식은 김치찌개예요.',
          uz: 'Men tayyorlayotgan taom kimchi-jjigae.',
          en: 'The dish I am making is kimchi jjigae.',
          ru: 'Блюдо, которое я готовлю, — кимчи-ччигэ.',
        },
      },
      {
        ko: '이 바지는 조금 긴 것 같아요.',
        highlight: '긴',
        gloss: {
          ko: '이 바지는 조금 긴 것 같아요.',
          uz: 'Bu shim biroz uzun ko‘rinadi.',
          en: 'These pants seem a little long.',
          ru: 'Кажется, эти брюки немного длинные.',
        },
      },
      {
        ko: '우체국이 여기에서 조금 먼데요.',
        highlight: '먼데요',
        gloss: {
          ko: '우체국이 여기에서 조금 먼데요.',
          uz: 'Pochta bu yerdan biroz uzoq.',
          en: 'The post office is a little far from here.',
          ru: 'Почта отсюда немного далеко.',
        },
      },
      {
        ko: '저는 그 사람을 잘 압니다.',
        highlight: '압니다',
        gloss: {
          ko: '저는 그 사람을 잘 압니다.',
          uz: 'Men u odamni yaxshi bilaman.',
          en: 'I know that person well.',
          ru: 'Я хорошо знаю этого человека.',
        },
      },
      {
        ko: '저는 지금 서울에 삽니다.',
        highlight: '삽니다',
        gloss: {
          ko: '저는 지금 서울에 삽니다.',
          uz: 'Men hozir Seulda yashayman.',
          en: 'I currently live in Seoul.',
          ru: 'Сейчас я живу в Сеуле.',
        },
      },
      {
        ko: '이쪽에서 잠깐 기다리세요.',
        highlight: '기다리세요',
        gloss: {
          ko: '이쪽에서 잠깐 기다리세요.',
          uz: 'Shu yerda biroz kuting.',
          en: 'Please wait here for a moment.',
          ru: 'Подождите здесь немного.',
        },
      },
      {
        ko: '이 주소를 아세요?',
        highlight: '아세요',
        gloss: {
          ko: '이 주소를 아세요?',
          uz: 'Bu manzilni bilasizmi?',
          en: 'Do you know this address?',
          ru: 'Вы знаете этот адрес?',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '근처에 사는 친구가 있어요?',
        highlight: '사는',
        gloss: {
          ko: '근처에 사는 친구가 있어요?',
          uz: 'Yaqinda yashaydigan do‘stingiz bormi?',
          en: 'Do you have a friend who lives nearby?',
          ru: 'У вас есть друг, который живёт поблизости?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네. 서울에 사는 친구가 한 명 있어요.',
        highlight: '사는',
        gloss: {
          ko: '네. 서울에 사는 친구가 한 명 있어요.',
          uz: 'Ha, Seulda yashaydigan bitta do‘stim bor.',
          en: 'Yes. I have one friend who lives in Seoul.',
          ru: 'Да. У меня есть один друг, который живёт в Сеуле.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '그 친구 주소를 아세요?',
        highlight: '아세요',
        gloss: {
          ko: '그 친구 주소를 아세요?',
          uz: 'U do‘stingizning manzilini bilasizmi?',
          en: 'Do you know your friend’s address?',
          ru: 'Вы знаете адрес этого друга?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 잘 알아요.',
        highlight: '알아요',
        gloss: {
          ko: '네, 잘 알아요.',
          uz: 'Ha, yaxshi bilaman.',
          en: 'Yes, I know it well.',
          ru: 'Да, хорошо знаю.',
        },
      },
    ],

    similar: {
      pattern: 'ㄹ 받침 규칙 활용',
      note: {
        ko: 'ㄹ 불규칙은 새로운 의미를 만드는 문법이라기보다 여러 문법 형태를 정확하게 활용하기 위한 기본 규칙이에요. "-는 것", "-(으)ㄴ N", "-(으)ㄴ데", "-세요", "-ㅂ니다" 등에서 반복해서 만나게 돼요.',
        uz: 'Bu yangi ma’no beruvchi grammatika emas, balki boshqa grammatikalarni to‘g‘ri tuslash uchun muhim qoida.',
        en: 'This is less a meaning-bearing grammar pattern than a core conjugation rule that repeatedly appears with forms such as -는, -(으)ㄴ, -세요, and -ㅂ니다.',
        ru: 'Это скорее базовое правило спряжения, чем отдельная смысловая конструкция. Оно постоянно встречается с -는, -(으)ㄴ, -세요, -ㅂ니다 и другими формами.',
      },
    },

    cautions: [
      {
        ko: '"살는 사람"이라고 하지 않아요. ㄹ이 탈락해서 "사는 사람"이라고 해야 해요.',
        uz: '"살는 사람" emas, "사는 사람".',
        en: 'Do not say 살는 사람. Final ㄹ drops: 사는 사람.',
        ru: 'Нельзя говорить 살는 사람. Правильно 사는 사람.',
      },
      {
        ko: '"알습니다"라고 하지 않아요. 격식체에서는 ㄹ이 탈락해서 "압니다"라고 해요.',
        uz: '"알습니다" emas, "압니다".',
        en: 'Do not say 알습니다. The formal form is 압니다.',
        ru: 'Нельзя говорить 알습니다. Правильно 압니다.',
      },
      {
        ko: 'ㄹ을 모든 어미 앞에서 지우면 안 돼요. "-아/어요"에서는 "살아요", "알아요"처럼 ㄹ이 유지돼요.',
        uz: 'ㄹ har doim tushmaydi: 살아요, 알아요.',
        en: 'Do not delete ㄹ before every ending. It remains in forms such as 살아요 and 알아요.',
        ru: 'ㄹ выпадает не перед всеми окончаниями. В формах 살아요 и 알아요 он сохраняется.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"살다 + -는"의 올바른 형태는 무엇이에요?',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form of 살다 + -는.',
          ru: 'Выберите правильную форму 살다 + -는.',
        },
        options: [
          { text: '사는', correct: true },
          { text: '살는', correct: false },
          { text: '살은', correct: false },
          { text: '살ㄴ', correct: false },
          { text: '사은', correct: false },
        ],
      },
      {
        question: {
          ko: '"길다 + -ㄴ"의 올바른 형태는 무엇이에요?',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form of 길다 + -ㄴ.',
          ru: 'Выберите правильную форму 길다 + -ㄴ.',
        },
        options: [
          { text: '긴', correct: true },
          { text: '길ㄴ', correct: false },
          { text: '길은', correct: false },
          { text: '길는', correct: false },
          { text: '기은', correct: false },
        ],
      },
      {
        question: {
          ko: '"알다"의 격식체 현재형으로 맞는 것을 고르세요.',
          uz: '"알다" ning rasmiy shaklini tanlang.',
          en: 'Choose the correct formal present form of 알다.',
          ru: 'Выберите правильную официальную форму 알다.',
        },
        options: [
          { text: '압니다', correct: true },
          { text: '알습니다', correct: false },
          { text: '알ㅂ니다', correct: false },
          { text: '아릅니다', correct: false },
          { text: '알입니다', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다 + -세요"의 올바른 형태는 무엇이에요?',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form of 살다 + -세요.',
          ru: 'Выберите правильную форму 살다 + -세요.',
        },
        options: [
          { text: '사세요', correct: true },
          { text: '살세요', correct: false },
          { text: '살으세요', correct: false },
          { text: '사는세요', correct: false },
          { text: '살이세요', correct: false },
        ],
      },
      {
        question: {
          ko: 'ㄹ이 유지되는 형태를 고르세요.',
          uz: 'ㄹ saqlanadigan shaklni tanlang.',
          en: 'Choose the form in which ㄹ remains.',
          ru: 'Выберите форму, в которой ㄹ сохраняется.',
        },
        options: [
          { text: '살아요', correct: true },
          { text: '사는', correct: false },
          { text: '삽니다', correct: false },
          { text: '사세요', correct: false },
          { text: '산', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 6-4. V-(으)면 되다
  // ─────────────────────────────────────────────
  {
    code: 'verb-eumyeon-doeda',
    pattern: 'V-(으)면 되다',
    section: 3,
    unit: 6,
    order: 4,
    isActive: true,

    summary: {
      ko: '어떤 목적을 이루기 위해 필요한 행동이나 충분한 조건을 말할 때 사용해요. "~하면 됩니다", "그렇게 하기만 하면 돼요"라는 의미예요.',
      uz: 'Biror maqsadga erishish uchun kerak bo‘lgan ish yoki yetarli shartni bildiradi. "Shuni qilsangiz bo‘ladi" ma’nosini beradi.',
      en: 'Expresses the action or condition that is sufficient to achieve a goal, meaning roughly "all you need to do is..." or "you can just..."',
      ru: 'Обозначает действие или условие, которого достаточно для достижения цели: «нужно лишь...», «достаточно сделать...».',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '방법',
        uz: 'Usul',
        en: 'Method',
        ru: 'Способ',
      },
      {
        ko: '조건',
        uz: 'Shart',
        en: 'Condition',
        ru: 'Условие',
      },
    ],

    explanation: {
      ko: '"V-(으)면 되다"는 어떤 일을 하기 위해 무엇을 해야 하는지 알려 주거나, 어떤 행동 하나만 하면 충분하다고 말할 때 사용하는 표현이에요. 한국어로 자연스럽게 풀면 "~하면 돼요", "~하기만 하면 됩니다" 정도의 뜻이에요.\n\n예를 들어 우체국에서 "이 소포를 어떻게 보내요?"라고 물었을 때 직원이 "여기에 주소를 쓰면 돼요"라고 하면, 소포를 보내기 위해 필요한 행동이 주소를 쓰는 것이라는 뜻이에요.\n\n은행에서도 자주 사용할 수 있어요. "환전하려면 어떻게 해야 해요?"라는 질문에 "여권을 보여 주면 돼요"라고 답할 수 있어요. 즉 다른 복잡한 행동보다 일단 여권을 보여 주는 것이 필요한 조건이라는 뜻이에요.\n\n형태는 조건 표현 "-(으)면"과 같아요. 받침이 있는 동사에는 "-으면"을 사용해서 "먹다 → 먹으면 되다", "읽다 → 읽으면 되다", "찾다 → 찾으면 되다"처럼 만들어요.\n\n받침이 없는 동사에는 "-면"을 붙여서 "가다 → 가면 되다", "보다 → 보면 되다", "쓰다 → 쓰면 되다"가 돼요.\n\nㄹ 받침 동사는 ㄹ을 유지한 채 "-면"을 사용해요. "만들다 → 만들면 되다", "살다 → 살면 되다"처럼 활용해요. 이 경우 앞에서 배운 ㄹ 탈락이 일어나지 않는다는 점도 중요해요. "-면"은 ㄴ, ㅂ, ㅅ으로 시작하는 어미가 아니기 때문이에요.\n\n이 표현은 질문에서도 정말 자주 나와요. "어디에 쓰면 돼요?", "얼마를 내면 돼요?", "몇 시까지 가면 돼요?", "어떤 서류를 준비하면 돼요?"처럼 어떤 방법이나 필요한 조건을 확인할 수 있어요.\n\n비슷하게 "-아/어야 하다"는 반드시 해야 하는 의무를 강조하고, "-(으)면 되다"는 어떤 목표를 위해 그 행동이면 충분하다는 느낌이 강해요. "여권을 가져와야 해요"는 여권 지참이 의무라는 뜻이고, "여권만 가져오면 돼요"는 여러 것 가운데 여권만 준비하면 충분하다는 느낌이에요.',
      uz: '"V-(으)면 되다" bir ishni bajarish uchun qaysi harakat yetarli ekanini aytadi. Ma’nosi "shuni qilsangiz bo‘ladi" ga yaqin.\n\nMasalan, "여기에 주소를 쓰면 돼요" — bu yerga manzil yozsangiz yetarli.\n\n받침 bo‘lsa "-으면 되다": 읽다 → 읽으면 되다. 받침 bo‘lmasa "-면 되다": 가다 → 가면 되다.\n\nㄹ bilan tugagan fe’lda ㄹ saqlanadi: 만들다 → 만들면 되다, 살다 → 살면 되다.\n\nSavollarda ham ko‘p ishlatiladi: "어디에 쓰면 돼요?", "얼마를 내면 돼요?"\n\n"-아/어야 하다" majburiyatni, "-(으)면 되다" esa maqsad uchun shu harakatning yetarli ekanini ko‘proq bildiradi.',
      en: '"V-(으)면 되다" tells someone what action is sufficient or necessary to achieve a particular goal. A natural translation is often "all you need to do is..." or "you can just..."\n\nAt a post office, if someone asks how to send a package, an employee might say "여기에 주소를 쓰면 돼요," meaning that writing the address there is what needs to be done.\n\nAfter most consonant-ending stems, use "-으면 되다": 읽다 → 읽으면 되다, 찾다 → 찾으면 되다. After vowel-ending stems, use "-면 되다": 가다 → 가면 되다, 보다 → 보면 되다.\n\nWith final ㄹ, the ㄹ remains: 만들다 → 만들면 되다, 살다 → 살면 되다. This is useful to compare with the ㄹ deletion rule because -면 does not begin with ㄴ, ㅂ, or ㅅ.\n\nThe pattern is very common in questions such as "어디에 쓰면 돼요?", "얼마를 내면 돼요?", and "몇 시까지 가면 돼요?"\n\nCompared with -아/어야 하다, which emphasizes obligation, -(으)면 되다 emphasizes that the stated action is sufficient.',
      ru: '"V-(으)면 되다" показывает, какого действия достаточно для достижения цели. По смыслу это часто «достаточно сделать...» или «нужно просто...».\n\nНапример, в почтовом отделении сотрудник может сказать: "여기에 주소를 쓰면 돼요" — «Нужно просто написать здесь адрес».\n\nПосле большинства основ с конечным согласным используется "-으면 되다": 읽다 → 읽으면 되다. После основы без 받침 — "-면 되다": 가다 → 가면 되다.\n\nПосле ㄹ этот согласный сохраняется: 만들다 → 만들면 되다, 살다 → 살면 되다.\n\nКонструкция часто употребляется в вопросах: "어디에 쓰면 돼요?", "얼마를 내면 돼요?", "몇 시까지 가면 돼요?"\n\nВ отличие от -아/어야 하다, которое подчёркивает обязанность, -(으)면 되다 показывает достаточное условие.',
    },

    conjugationRule: {
      ko: '받침 O + 으면 되다  ·  받침 X + 면 되다  ·  ㄹ 받침 + 면 되다',
      uz: '받침 bor + 으면 되다  ·  받침 yo‘q + 면 되다  ·  ㄹ + 면 되다',
      en: 'consonant + 으면 되다  ·  vowel + 면 되다  ·  final ㄹ + 면 되다',
      ru: 'согласная + 으면 되다  ·  гласная + 면 되다  ·  ㄹ + 면 되다',
    },

    conjugations: [
      // 받침 O — 5
      { base: '먹다', result: '먹으면 되다' },
      { base: '읽다', result: '읽으면 되다' },
      { base: '찾다', result: '찾으면 되다' },
      { base: '입다', result: '입으면 되다' },
      { base: '받다', result: '받으면 되다' },

      // 받침 X — 5
      { base: '가다', result: '가면 되다' },
      { base: '보다', result: '보면 되다' },
      { base: '쓰다', result: '쓰면 되다' },
      { base: '보내다', result: '보내면 되다' },
      { base: '준비하다', result: '준비하면 되다' },

      // ㄹ 받침
      { base: '만들다', result: '만들면 되다' },
      { base: '살다', result: '살면 되다' },
    ],

    examples: [
      {
        ko: '여기에 주소를 쓰면 돼요.',
        highlight: '쓰면 돼요',
        gloss: {
          ko: '여기에 주소를 쓰면 돼요.',
          uz: 'Bu yerga manzilni yozsangiz bo‘ladi.',
          en: 'All you need to do is write the address here.',
          ru: 'Вам достаточно написать адрес здесь.',
        },
      },
      {
        ko: '이 번호표를 받고 기다리면 돼요.',
        highlight: '기다리면 돼요',
        gloss: {
          ko: '이 번호표를 받고 기다리면 돼요.',
          uz: 'Shu raqamli talonni olib kutsangiz bo‘ladi.',
          en: 'Take this number and wait.',
          ru: 'Возьмите этот талон и подождите.',
        },
      },
      {
        ko: '환전할 때 여권을 보여 주면 돼요.',
        highlight: '보여 주면 돼요',
        gloss: {
          ko: '환전할 때 여권을 보여 주면 돼요.',
          uz: 'Pul almashtirishda pasportni ko‘rsatsangiz bo‘ladi.',
          en: 'You just need to show your passport when exchanging money.',
          ru: 'При обмене валюты достаточно показать паспорт.',
        },
      },
      {
        ko: '이 신청서는 어디에 쓰면 돼요?',
        highlight: '쓰면 돼요',
        gloss: {
          ko: '이 신청서는 어디에 쓰면 돼요?',
          uz: 'Bu arizani qayerga yozsam bo‘ladi?',
          en: 'Where should I fill out this application?',
          ru: 'Где нужно заполнить это заявление?',
        },
      },
      {
        ko: '수수료는 얼마를 내면 돼요?',
        highlight: '내면 돼요',
        gloss: {
          ko: '수수료는 얼마를 내면 돼요?',
          uz: 'Komissiya uchun qancha to‘lashim kerak?',
          en: 'How much do I need to pay for the fee?',
          ru: 'Сколько нужно заплатить комиссии?',
        },
      },
      {
        ko: '내일 오전 아홉 시까지 오면 돼요.',
        highlight: '오면 돼요',
        gloss: {
          ko: '내일 오전 아홉 시까지 오면 돼요.',
          uz: 'Ertaga ertalab soat to‘qqizgacha kelsangiz bo‘ladi.',
          en: 'You just need to come by 9 a.m. tomorrow.',
          ru: 'Нужно просто прийти завтра до девяти утра.',
        },
      },
      {
        ko: '소포를 보내려면 이 서류만 준비하면 돼요.',
        highlight: '준비하면 돼요',
        gloss: {
          ko: '소포를 보내려면 이 서류만 준비하면 돼요.',
          uz: 'Posilka yuborish uchun faqat shu hujjatni tayyorlasangiz bo‘ladi.',
          en: 'To send the package, you only need to prepare this document.',
          ru: 'Чтобы отправить посылку, достаточно подготовить только этот документ.',
        },
      },
      {
        ko: '은행에 가려면 이 길로 계속 가면 돼요.',
        highlight: '가면 돼요',
        gloss: {
          ko: '은행에 가려면 이 길로 계속 가면 돼요.',
          uz: 'Bankka borish uchun shu yo‘ldan to‘g‘ri davom etsangiz bo‘ladi.',
          en: 'To get to the bank, just continue along this road.',
          ru: 'Чтобы дойти до банка, просто идите дальше по этой дороге.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이 소포를 보내려면 어떻게 하면 돼요?',
        highlight: '어떻게 하면 돼요',
        gloss: {
          ko: '이 소포를 보내려면 어떻게 하면 돼요?',
          uz: 'Bu posilkani yuborish uchun nima qilishim kerak?',
          en: 'What do I need to do to send this package?',
          ru: 'Что нужно сделать, чтобы отправить эту посылку?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '먼저 이 서류에 주소를 쓰면 돼요.',
        highlight: '쓰면 돼요',
        gloss: {
          ko: '먼저 이 서류에 주소를 쓰면 돼요.',
          uz: 'Avval shu hujjatga manzilni yozsangiz bo‘ladi.',
          en: 'First, just write the address on this form.',
          ru: 'Сначала нужно написать адрес на этом бланке.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '그리고 얼마를 내면 돼요?',
        highlight: '내면 돼요',
        gloss: {
          ko: '그리고 얼마를 내면 돼요?',
          uz: 'Keyin qancha to‘lashim kerak?',
          en: 'And how much do I need to pay?',
          ru: 'А сколько нужно заплатить?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '무게를 재고 나서 요금을 내면 돼요.',
        highlight: '내면 돼요',
        gloss: {
          ko: '무게를 재고 나서 요금을 내면 돼요.',
          uz: 'Og‘irligini o‘lchagandan keyin to‘lovni qilsangiz bo‘ladi.',
          en: 'After we weigh it, you just pay the fee.',
          ru: 'После взвешивания нужно оплатить стоимость.',
        },
      },
    ],

    similar: {
      pattern: 'V-아/어야 하다',
      note: {
        ko: '"-아/어야 하다"는 반드시 해야 하는 의무나 필요를 강조하고, "-(으)면 되다"는 어떤 목적을 이루기 위해 그 행동이면 충분하다는 의미가 강해요.',
        uz: '"-아/어야 하다" majburiyatni, "-(으)면 되다" esa yetarli shartni bildiradi.',
        en: '-아/어야 하다 emphasizes obligation or necessity, while -(으)면 되다 emphasizes a sufficient condition.',
        ru: '-아/어야 하다 подчёркивает обязанность, а -(으)면 되다 — достаточное условие.',
      },
    },

    cautions: [
      {
        ko: '받침 있는 동사에 바로 "-면"만 붙이지 않아요. "먹면 돼요"가 아니라 "먹으면 돼요"예요.',
        uz: '받침 bilan "-으면": 먹으면 돼요.',
        en: 'Most consonant-ending stems require 으면: 먹으면 돼요.',
        ru: 'После основы с согласным используется 으면: 먹으면 돼요.',
      },
      {
        ko: 'ㄹ 받침에서는 ㄹ을 빼지 않아요. "만들면 돼요"가 맞고 "만드면 돼요"는 다른 형태예요.',
        uz: 'ㄹ saqlanadi: 만들면 돼요.',
        en: 'Final ㄹ remains before 면: 만들면 돼요.',
        ru: 'Перед 면 конечный ㄹ сохраняется: 만들면 돼요.',
      },
      {
        ko: '"하면 돼요"는 "해도 돼요"와 달라요. "하면 돼요"는 무엇을 하면 충분한지를 말하고, "해도 돼요"는 그 행동을 해도 허락되는지를 말해요.',
        uz: '"하면 돼요" yetarli shart, "해도 돼요" ruxsat.',
        en: '하면 돼요 gives a sufficient condition; 해도 돼요 gives permission.',
        ru: '하면 돼요 обозначает достаточное условие, а 해도 돼요 — разрешение.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '여기에 주소를 쓰___ 돼요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form.',
          ru: 'Выберите правильную форму.',
        },
        options: [
          { text: '면', correct: true },
          { text: '으면', correct: false },
          { text: '니까', correct: false },
          { text: '는데', correct: false },
          { text: '거나', correct: false },
        ],
      },
      {
        question: {
          ko: '이 책을 읽___ 돼요.',
          uz: '받침 bilan to‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 읽다.',
          ru: 'Выберите правильную форму после 읽다.',
        },
        options: [
          { text: '으면', correct: true },
          { text: '면', correct: false },
          { text: '니까', correct: false },
          { text: '고', correct: false },
          { text: '려고', correct: false },
        ],
      },
      {
        question: {
          ko: '"만들다"의 올바른 형태를 고르세요.',
          uz: '"만들다" bilan to‘g‘ri shaklni tanlang.',
          en: 'Choose the correct -(으)면 되다 form of 만들다.',
          ru: 'Выберите правильную форму 만들다.',
        },
        options: [
          { text: '만들면 돼요', correct: true },
          { text: '만드면 돼요', correct: false },
          { text: '만들으면 돼요', correct: false },
          { text: '만드는 돼요', correct: false },
          { text: '만들고 돼요', correct: false },
        ],
      },
      {
        question: {
          ko: '환전하려면 여권을 ___ 돼요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form.',
          ru: 'Выберите правильную форму.',
        },
        options: [
          { text: '보여 주면', correct: true },
          { text: '보여 주으면', correct: false },
          { text: '보여 주는데', correct: false },
          { text: '보여 주거나', correct: false },
          { text: '보여 준', correct: false },
        ],
      },
      {
        question: {
          ko: '"V-(으)면 되다"의 가장 알맞은 의미를 고르세요.',
          uz: 'Eng mos ma’noni tanlang.',
          en: 'Choose the best meaning of V-(으)면 되다.',
          ru: 'Выберите наиболее подходящее значение V-(으)면 되다.',
        },
        options: [
          { text: '그 행동을 하면 충분하다', correct: true },
          { text: '그 행동을 한 경험이 있다', correct: false },
          { text: '그 행동을 절대 하면 안 된다', correct: false },
          { text: '그 행동을 이미 끝냈다', correct: false },
          { text: '두 행동 중 하나를 선택한다', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 6-5. V-(으)ㄴ 것 같다
  // ─────────────────────────────────────────────
  {
    code: 'verb-eun-geot-gatda',
    pattern: 'V-(으)ㄴ 것 같다',
    section: 3,
    unit: 6,
    order: 5,
    isActive: true,

    summary: {
      ko: '이미 일어났거나 끝난 행동에 대해 확실하지 않은 추측이나 판단을 말할 때 사용해요. "~한 것 같다", "아마 ~한 듯하다"라는 의미예요.',
      uz: 'Allaqachon sodir bo‘lgan yoki tugagan harakat haqida aniq bo‘lmagan taxminni bildiradi. "Shekilli, ... qilgan" ma’nosiga yaqin.',
      en: 'Expresses an uncertain guess or judgment about an action that has already happened or been completed, roughly meaning "it seems that..." or "I think ... did."',
      ru: 'Выражает неуверенное предположение о уже произошедшем или завершённом действии: «кажется, что...», «похоже, ... сделал».',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '과거 추측',
        uz: 'O‘tgan voqea taxmini',
        en: 'Past inference',
        ru: 'Предположение о прошлом',
      },
      {
        ko: '판단',
        uz: 'Fikr',
        en: 'Judgment',
        ru: 'Оценка',
      },
    ],

    explanation: {
      ko: '"V-(으)ㄴ 것 같다"는 이미 일어난 행동이나 완료된 사건에 대해 말하는 사람이 확실하지 않은 추측을 할 때 사용하는 표현이에요. 앞에서 배운 "V-는 것 같다"가 현재 진행 중인 행동을 추측한다면, 이번 문법은 이미 끝난 행동을 추측한다는 차이가 있어요.\n\n예를 들어 책상 위에 우산이 없고 바닥이 젖어 있는 것을 보고 "아까 비가 온 것 같아요"라고 말할 수 있어요. 직접 비가 오는 장면을 보지는 못했지만 남아 있는 흔적을 보고 과거에 비가 왔다고 추측하는 거예요.\n\n또 계좌의 돈이 줄어 있는 것을 보고 "돈을 잘못 송금한 것 같아요"라고 할 수도 있어요. 확실하게 확인하지는 않았지만 현재 보이는 결과를 바탕으로 이미 일어난 행동을 추측하는 표현이에요.\n\n형태는 과거 관형형 "V-(으)ㄴ N"과 같아요. 일반적인 받침이 있는 동사에는 "-은"을 붙여서 "먹다 → 먹은 것 같다", "읽다 → 읽은 것 같다", "받다 → 받은 것 같다"처럼 사용해요.\n\n받침이 없는 동사에는 ㄴ을 붙여서 "가다 → 간 것 같다", "보다 → 본 것 같다", "보내다 → 보낸 것 같다"가 돼요.\n\nㄹ 받침은 ㄹ이 탈락하고 ㄴ이 들어가요. "만들다 → 만든 것 같다", "살다 → 산 것 같다", "팔다 → 판 것 같다"처럼 활용해요. 바로 앞에서 배운 ㄹ 불규칙 규칙이 여기에서도 적용되는 거예요.\n\n현재형과 비교하면 차이가 훨씬 분명해요. "민수 씨가 은행에 가는 것 같아요"는 지금 은행에 가고 있는 모습이나 상황을 보고 추측하는 말이에요. 반면 "민수 씨가 은행에 간 것 같아요"는 민수 씨가 지금 자리에 없거나 다른 단서를 보고 이미 은행에 간 것으로 추측하는 말이에요.\n\n"비가 오는 것 같아요"는 지금 비가 내리는 것 같다는 뜻이고, "비가 온 것 같아요"는 조금 전에 또는 이전에 비가 내렸던 것 같다는 뜻이에요.\n\n이 표현은 실수를 발견했을 때도 매우 유용해요. "주소를 잘못 쓴 것 같아요", "돈을 너무 많이 보낸 것 같아요", "서류를 집에 놓고 온 것 같아요"처럼 자신도 완전히 확신할 수 없는 상황에서 부드럽게 말할 수 있어요.',
      uz: '"V-(으)ㄴ 것 같다" allaqachon sodir bo‘lgan harakat haqida taxmin qilishda ishlatiladi. Oldingi "V-는 것 같다" hozirgi harakatni, bu shakl esa tugallangan harakatni taxmin qiladi.\n\nMasalan, yer ho‘l bo‘lsa "아까 비가 온 것 같아요" — "Avval yomg‘ir yog‘ganga o‘xshaydi" deyish mumkin.\n\n받침 bo‘lsa "-은 것 같다": 먹다 → 먹은 것 같다, 읽다 → 읽은 것 같다. 받침 bo‘lmasa ㄴ: 가다 → 간 것 같다, 보다 → 본 것 같다.\n\nㄹ tushadi: 만들다 → 만든 것 같다, 살다 → 산 것 같다.\n\n"비가 오는 것 같아요" hozir yomg‘ir yog‘ayotganini, "비가 온 것 같아요" esa oldin yomg‘ir yog‘ganini taxmin qiladi.',
      en: '"V-(으)ㄴ 것 같다" is used to make an uncertain inference about an action that has already occurred or been completed. This contrasts with "V-는 것 같다," which generally refers to a current action.\n\nFor example, after seeing wet ground, you can say "아까 비가 온 것 같아요." You did not necessarily see the rain itself, but the current evidence leads you to infer that it rained earlier.\n\nAfter most consonant-ending stems, use "-은 것 같다": 먹다 → 먹은 것 같다, 읽다 → 읽은 것 같다. After vowel-ending stems, add ㄴ: 가다 → 간 것 같다, 보다 → 본 것 같다, 보내다 → 보낸 것 같다.\n\nFinal ㄹ drops before ㄴ: 만들다 → 만든 것 같다, 살다 → 산 것 같다.\n\nCompare "비가 오는 것 같아요," which means it seems to be raining now, with "비가 온 것 같아요," which means it seems to have rained.\n\nThe construction is especially useful for uncertain mistakes or discoveries: "주소를 잘못 쓴 것 같아요," "돈을 너무 많이 보낸 것 같아요."',
      ru: '"V-(으)ㄴ 것 같다" используется для предположения о действии, которое уже произошло или завершилось. В отличие от "V-는 것 같다", описывающего предполагаемое действие сейчас, эта форма относится к прошлому.\n\nНапример, увидев мокрую землю, можно сказать "아까 비가 온 것 같아요" — «Кажется, недавно шёл дождь».\n\nПосле большинства основ с конечным согласным используется "-은 것 같다": 먹다 → 먹은 것 같다, 읽다 → 읽은 것 같다. После основы без 받침 добавляется ㄴ: 가다 → 간 것 같다, 보다 → 본 것 같다.\n\nКонечный ㄹ выпадает: 만들다 → 만든 것 같다, 살다 → 산 것 같다.\n\nСравните: "비가 오는 것 같아요" — «Кажется, сейчас идёт дождь», "비가 온 것 같아요" — «Кажется, дождь уже шёл».\n\nКонструкция полезна и при неуверенности в собственной ошибке: "주소를 잘못 쓴 것 같아요", "돈을 너무 많이 보낸 것 같아요".',
    },

    conjugationRule: {
      ko: '받침 O + 은 것 같다  ·  받침 X + ㄴ 것 같다  ·  ㄹ 받침: ㄹ 탈락 + ㄴ 것 같다',
      uz: '받침 bor + 은 것 같다  ·  받침 yo‘q + ㄴ 것 같다  ·  ㄹ tushib + ㄴ 것 같다',
      en: 'consonant + 은 것 같다  ·  vowel + ㄴ 것 같다  ·  final ㄹ drops + ㄴ',
      ru: 'согласная + 은 것 같다  ·  гласная + ㄴ 것 같다  ·  конечный ㄹ выпадает',
    },

    conjugations: [
      // 받침 O — 5
      { base: '먹다', result: '먹은 것 같다' },
      { base: '읽다', result: '읽은 것 같다' },
      { base: '받다', result: '받은 것 같다' },
      { base: '찾다', result: '찾은 것 같다' },
      { base: '입다', result: '입은 것 같다' },

      // 받침 X — 5
      { base: '가다', result: '간 것 같다' },
      { base: '보다', result: '본 것 같다' },
      { base: '보내다', result: '보낸 것 같다' },
      { base: '사다', result: '산 것 같다' },
      { base: '쓰다', result: '쓴 것 같다' },

      // ㄹ 받침
      { base: '만들다', result: '만든 것 같다' },
      { base: '살다', result: '산 것 같다' },
      { base: '팔다', result: '판 것 같다' },
    ],

    examples: [
      {
        ko: '주소를 잘못 쓴 것 같아요.',
        highlight: '잘못 쓴 것 같아요',
        gloss: {
          ko: '주소를 잘못 쓴 것 같아요.',
          uz: 'Menimcha, manzilni noto‘g‘ri yozganman.',
          en: 'I think I wrote the address incorrectly.',
          ru: 'Кажется, я неправильно написал адрес.',
        },
      },
      {
        ko: '돈을 너무 많이 보낸 것 같아요.',
        highlight: '많이 보낸 것 같아요',
        gloss: {
          ko: '돈을 너무 많이 보낸 것 같아요.',
          uz: 'Menimcha, juda ko‘p pul yuborganman.',
          en: 'I think I sent too much money.',
          ru: 'Кажется, я отправил слишком много денег.',
        },
      },
      {
        ko: '아까 비가 온 것 같아요.',
        highlight: '비가 온 것 같아요',
        gloss: {
          ko: '아까 비가 온 것 같아요.',
          uz: 'Shekilli, avval yomg‘ir yog‘gan.',
          en: 'It looks like it rained earlier.',
          ru: 'Кажется, недавно шёл дождь.',
        },
      },
      {
        ko: '민수 씨가 벌써 은행에 간 것 같아요.',
        highlight: '은행에 간 것 같아요',
        gloss: {
          ko: '민수 씨가 벌써 은행에 간 것 같아요.',
          uz: 'Menimcha, Minsu allaqachon bankka ketgan.',
          en: 'I think Minsu has already gone to the bank.',
          ru: 'Кажется, Минсу уже ушёл в банк.',
        },
      },
      {
        ko: '누가 제 우산을 가져간 것 같아요.',
        highlight: '가져간 것 같아요',
        gloss: {
          ko: '누가 제 우산을 가져간 것 같아요.',
          uz: 'Kimdir soyabonimni olib ketganga o‘xshaydi.',
          en: 'It seems someone took my umbrella.',
          ru: 'Кажется, кто-то забрал мой зонт.',
        },
      },
      {
        ko: '서류를 집에 놓고 온 것 같아요.',
        highlight: '놓고 온 것 같아요',
        gloss: {
          ko: '서류를 집에 놓고 온 것 같아요.',
          uz: 'Hujjatlarni uyda qoldirib kelganga o‘xshayman.',
          en: 'I think I left the documents at home.',
          ru: 'Кажется, я оставил документы дома.',
        },
      },
      {
        ko: '환율이 어제보다 많이 오른 것 같아요.',
        highlight: '많이 오른 것 같아요',
        gloss: {
          ko: '환율이 어제보다 많이 오른 것 같아요.',
          uz: 'Menimcha, valyuta kursi kechagidan ancha ko‘tarilgan.',
          en: 'It seems the exchange rate has risen a lot since yesterday.',
          ru: 'Кажется, курс валют значительно вырос со вчерашнего дня.',
        },
      },
      {
        ko: '우체국이 벌써 문을 닫은 것 같아요.',
        highlight: '문을 닫은 것 같아요',
        gloss: {
          ko: '우체국이 벌써 문을 닫은 것 같아요.',
          uz: 'Pochta allaqachon yopilganga o‘xshaydi.',
          en: 'It looks like the post office has already closed.',
          ru: 'Похоже, почта уже закрылась.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '왜 다시 은행에 가요?',
        highlight: '왜 다시 은행에 가요',
        gloss: {
          ko: '왜 다시 은행에 가요?',
          uz: 'Nega yana bankka ketyapsiz?',
          en: 'Why are you going back to the bank?',
          ru: 'Почему вы снова идёте в банк?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '돈을 잘못 보낸 것 같아요.',
        highlight: '잘못 보낸 것 같아요',
        gloss: {
          ko: '돈을 잘못 보낸 것 같아요.',
          uz: 'Menimcha, pulni noto‘g‘ri yuborganman.',
          en: 'I think I transferred the money incorrectly.',
          ru: 'Кажется, я неправильно перевёл деньги.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '계좌 번호를 잘못 썼어요?',
        highlight: '잘못 썼어요',
        gloss: {
          ko: '계좌 번호를 잘못 썼어요?',
          uz: 'Hisob raqamini noto‘g‘ri yozdingizmi?',
          en: 'Did you enter the account number incorrectly?',
          ru: 'Вы неправильно указали номер счёта?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네. 숫자 하나를 틀리게 쓴 것 같아요.',
        highlight: '틀리게 쓴 것 같아요',
        gloss: {
          ko: '네. 숫자 하나를 틀리게 쓴 것 같아요.',
          uz: 'Ha. Menimcha, bitta raqamni noto‘g‘ri yozganman.',
          en: 'Yes. I think I entered one digit incorrectly.',
          ru: 'Да. Кажется, я неправильно написал одну цифру.',
        },
      },
    ],

    similar: {
      pattern: 'V-는 것 같다',
      note: {
        ko: '"V-는 것 같다"는 현재 진행되거나 지금 일어나는 행동에 대한 추측이고, "V-(으)ㄴ 것 같다"는 이미 일어난 행동에 대한 추측이에요. "비가 오는 것 같아요 ↔ 비가 온 것 같아요", "은행에 가는 것 같아요 ↔ 은행에 간 것 같아요"처럼 비교하면 쉬워요.',
        uz: '"V-는 것 같다" hozirgi harakatni, "V-(으)ㄴ 것 같다" esa tugallangan harakatni taxmin qiladi.',
        en: '"V-는 것 같다" infers a current action, while "V-(으)ㄴ 것 같다" infers an action that has already occurred.',
        ru: '"V-는 것 같다" выражает предположение о текущем действии, а "V-(으)ㄴ 것 같다" — о уже произошедшем.',
      },
    },

    cautions: [
      {
        ko: '이미 끝난 행동을 추측하면서 현재형 "-는 것 같다"를 쓰지 않도록 주의해요. "어제 비가 오는 것 같아요"가 아니라 과거의 비를 추측하면 "어제 비가 온 것 같아요"예요.',
        uz: 'Tugallangan harakat uchun "-(으)ㄴ 것 같다" ishlatiladi.',
        en: 'Use the completed form for past actions: 비가 온 것 같아요, not 비가 오는 것 같아요.',
        ru: 'Для завершённого действия используется форма -(으)ㄴ: 비가 온 것 같아요.',
      },
      {
        ko: '받침 있는 동사에 "-ㄴ"만 붙이지 않아요. "먹ㄴ 것 같아요"가 아니라 "먹은 것 같아요"예요.',
        uz: '받침 bilan "-은": 먹은 것 같아요.',
        en: 'Most consonant-ending stems require 은: 먹은 것 같아요.',
        ru: 'После основы с согласным используется 은: 먹은 것 같아요.',
      },
      {
        ko: 'ㄹ 받침은 그대로 두지 않아요. "만들은 것 같아요"가 아니라 "만든 것 같아요"예요.',
        uz: 'ㄹ tushadi: 만들다 → 만든 것 같아요.',
        en: 'Final ㄹ drops: 만들다 → 만든 것 같아요.',
        ru: 'Конечный ㄹ выпадает: 만들다 → 만든 것 같아요.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '주소를 잘못 ___ 것 같아요.',
          uz: 'Tugallangan harakat shaklini tanlang.',
          en: 'Choose the completed form of 쓰다.',
          ru: 'Выберите завершённую форму 쓰다.',
        },
        options: [
          { text: '쓴', correct: true },
          { text: '쓰는', correct: false },
          { text: '쓸', correct: false },
          { text: '쓰은', correct: false },
          { text: '쓰고', correct: false },
        ],
      },
      {
        question: {
          ko: '민수 씨가 벌써 은행에 ___ 것 같아요.',
          uz: 'Oldin ketganini taxmin qiling.',
          en: 'Choose the form meaning "I think Minsu has already gone."',
          ru: 'Выберите форму «Кажется, Минсу уже ушёл».',
        },
        options: [
          { text: '간', correct: true },
          { text: '가는', correct: false },
          { text: '갈', correct: false },
          { text: '가은', correct: false },
          { text: '가고', correct: false },
        ],
      },
      {
        question: {
          ko: '우체국이 벌써 문을 ___ 것 같아요.',
          uz: 'Tugallangan harakatni tanlang.',
          en: 'Choose the completed form of 닫다.',
          ru: 'Выберите завершённую форму 닫다.',
        },
        options: [
          { text: '닫은', correct: true },
          { text: '닫는', correct: false },
          { text: '닫을', correct: false },
          { text: '닫ㄴ', correct: false },
          { text: '닫고', correct: false },
        ],
      },
      {
        question: {
          ko: '"만들다"의 올바른 과거 추측 형태는 무엇이에요?',
          uz: '"만들다" ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct past-inference form of 만들다.',
          ru: 'Выберите правильную форму предположения о прошлом от 만들다.',
        },
        options: [
          { text: '만든 것 같아요', correct: true },
          { text: '만들은 것 같아요', correct: false },
          { text: '만드는 것 같아요', correct: false },
          { text: '만들은 것 같아요', correct: false },
          { text: '만들ㄴ 것 같아요', correct: false },
        ],
      },
      {
        question: {
          ko: '"비가 오는 것 같아요"와 "비가 온 것 같아요"의 차이로 맞는 것을 고르세요.',
          uz: 'Ikki shaklning farqini tanlang.',
          en: 'Choose the correct distinction.',
          ru: 'Выберите правильное различие.',
        },
        options: [
          {
            text: '오는 것은 현재, 온 것은 이미 일어난 행동',
            correct: true,
          },
          {
            text: '오는 것은 과거, 온 것은 현재',
            correct: false,
          },
          {
            text: '두 표현의 의미는 항상 완전히 같다',
            correct: false,
          },
          {
            text: '온 것은 미래의 행동만 나타낸다',
            correct: false,
          },
          {
            text: '오는 것은 명사에만 사용할 수 있다',
            correct: false,
          },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // UNIT 7 — 한옥마을이 어디에 있는지 아세요?
  // 미래 추측 → 간접 질문 → 목적을 위한 조건 → 행동 중 전환
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 7-1. A/V-(으)ㄹ 것 같다
  // ─────────────────────────────────────────────
  {
    code: 'av-eul-geot-gatda',
    pattern: 'A/V-(으)ㄹ 것 같다',
    section: 3,
    unit: 7,
    order: 1,
    isActive: true,

    summary: {
      ko: '앞으로 일어날 행동이나 미래의 상태에 대해 확실하지 않은 추측을 말할 때 사용해요. "~할 것 같아요", "아마 ~할 것 같아요"라는 뜻이에요.',
      uz: 'Kelajakda sodir bo‘ladigan harakat yoki holat haqida aniq bo‘lmagan taxminni bildiradi. "Menimcha, ... bo‘ladi" ma’nosiga yaqin.',
      en: 'Expresses an uncertain prediction about a future action or state, roughly meaning "I think..." or "it seems that ... will..."',
      ru: 'Выражает неуверенное предположение о будущем действии или состоянии: «кажется, что...», «думаю, что... будет».',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '미래 추측',
        uz: 'Kelajak taxmini',
        en: 'Future prediction',
        ru: 'Предположение о будущем',
      },
      {
        ko: '판단',
        uz: 'Fikr',
        en: 'Judgment',
        ru: 'Оценка',
      },
    ],

    explanation: {
      ko: '"A/V-(으)ㄹ 것 같다"는 아직 일어나지 않은 일이나 앞으로의 상태에 대해 말하는 사람이 조심스럽게 예상하거나 추측할 때 사용하는 표현이에요. 확실하게 미래를 단정하기보다 현재 가지고 있는 정보나 상황을 보고 "아마 이렇게 될 것 같다"라고 말하는 느낌이에요.\n\n예를 들어 지도를 보고 목적지가 아주 멀리 있는 것을 확인한 뒤 "걸어가면 시간이 오래 걸릴 것 같아요"라고 말할 수 있어요. 정확히 몇 분이 걸리는지는 모르지만 현재 정보를 바탕으로 시간이 오래 걸릴 것이라고 예상하는 거예요.\n\n동사와 함께 쓰면 앞으로 일어날 행동을 추측해요. "민수 씨가 조금 늦게 올 것 같아요"는 민수 씨가 아직 오지 않았지만 여러 상황을 보고 늦게 올 것이라고 예상하는 말이에요. "버스를 타면 더 빨리 갈 것 같아요"도 앞으로 버스를 이용했을 때의 결과를 추측하고 있어요.\n\n형용사와 함께 쓰면 미래의 상태를 예상해요. "주말에는 길이 복잡할 것 같아요", "오늘 오후에는 날씨가 추울 것 같아요"처럼 사용할 수 있어요.\n\n받침이 있는 어간에는 보통 "-을 것 같다"를 사용해요. "먹다 → 먹을 것 같다", "읽다 → 읽을 것 같다", "좋다 → 좋을 것 같다", "많다 → 많을 것 같다"가 돼요.\n\n받침이 없는 어간에는 ㄹ이 앞 음절의 받침으로 들어가서 "-ㄹ 것 같다"가 돼요. "가다 → 갈 것 같다", "오다 → 올 것 같다", "크다 → 클 것 같다", "비싸다 → 비쌀 것 같다"처럼 활용해요.\n\nㄹ 받침으로 끝나는 말은 이미 ㄹ이 있기 때문에 새로운 ㄹ을 하나 더 붙이지 않아요. "살다 → 살 것 같다", "멀다 → 멀 것 같다"라고 해요.\n\n앞에서 배운 "것 같다"의 다른 시제와 비교하면 훨씬 이해하기 쉬워요. "비가 오는 것 같아요"는 지금 비가 내리는 것 같다는 현재 추측이고, "비가 온 것 같아요"는 이전에 비가 왔던 것 같다는 과거 추측이에요. "비가 올 것 같아요"는 앞으로 비가 내릴 것 같다는 미래 추측이에요.\n\n길 안내 상황에서도 아주 유용해요. "여기서 걸어가면 20분쯤 걸릴 것 같아요", "지금 출발하면 차가 많이 막힐 것 같아요", "지하철이 더 빠를 것 같아요"처럼 확실하지 않은 정보를 너무 단정적으로 말하지 않고 자연스럽게 전달할 수 있어요.',
      uz: '"A/V-(으)ㄹ 것 같다" hali sodir bo‘lmagan harakat yoki kelajakdagi holat haqida ehtiyotkor taxmin aytishda ishlatiladi.\n\nMasalan, manzil uzoq ekanini ko‘rib "걸어가면 시간이 오래 걸릴 것 같아요" desangiz, aniq vaqtni bilmasangiz ham uzoq vaqt ketishini taxmin qilasiz.\n\nFe’l bilan kelajakdagi harakat taxmin qilinadi: "민수 씨가 늦게 올 것 같아요". Sifat bilan esa kelajakdagi holat: "길이 복잡할 것 같아요".\n\n받침 bo‘lsa "-을 것 같다": 먹다 → 먹을 것 같다, 좋다 → 좋을 것 같다. 받침 bo‘lmasa "-ㄹ 것 같다": 가다 → 갈 것 같다, 크다 → 클 것 같다.\n\nㄹ bilan tugagan so‘zga yana ㄹ qo‘shilmaydi: 살다 → 살 것 같다.\n\n"비가 오는 것 같아요" — hozirgi taxmin, "비가 온 것 같아요" — o‘tgan voqea taxmini, "비가 올 것 같아요" — kelajak taxmini.',
      en: '"A/V-(으)ㄹ 것 같다" expresses a cautious prediction about something that has not happened yet. Rather than stating the future as certain, the speaker uses available information to say what they think is likely to happen.\n\nFor example, after checking a map and seeing that a destination is far away, you might say "걸어가면 시간이 오래 걸릴 것 같아요" — "I think it will take a long time if we walk."\n\nWith verbs, it predicts a future action: "민수 씨가 늦게 올 것 같아요." With adjectives, it predicts a future state: "주말에는 길이 복잡할 것 같아요."\n\nAfter most consonant-ending stems, use "-을 것 같다": 먹다 → 먹을 것 같다, 좋다 → 좋을 것 같다. After vowel-ending stems, add ㄹ: 가다 → 갈 것 같다, 크다 → 클 것 같다.\n\nWith final ㄹ, no additional ㄹ is added: 살다 → 살 것 같다.\n\nCompare the three time frames: "비가 오는 것 같아요" predicts or observes rain happening now, "비가 온 것 같아요" infers that it rained earlier, and "비가 올 것 같아요" predicts that it will rain later.\n\nThis form is very useful when giving directions because estimated travel times, traffic, and transportation conditions are often uncertain.',
      ru: '"A/V-(으)ㄹ 것 같다" используется для осторожного предположения о событии или состоянии, которое ещё не произошло.\n\nНапример, посмотрев на карту и увидев, что место далеко, можно сказать "걸어가면 시간이 오래 걸릴 것 같아요" — «Мне кажется, пешком будет долго».\n\nС глаголами конструкция предсказывает будущее действие: "민수 씨가 늦게 올 것 같아요". С прилагательными — будущее состояние: "길이 복잡할 것 같아요".\n\nПосле большинства основ с конечным согласным используется "-을 것 같다": 먹다 → 먹을 것 같다. После основы без 받침 добавляется ㄹ: 가다 → 갈 것 같다.\n\nПосле конечного ㄹ второй ㄹ не добавляется: 살다 → 살 것 같다.\n\nСравните: "비가 오는 것 같아요" — кажется, дождь идёт сейчас; "비가 온 것 같아요" — кажется, дождь уже шёл; "비가 올 것 같아요" — кажется, дождь пойдёт.',
    },

    conjugationRule: {
      ko: '받침 O + 을 것 같다  ·  받침 X + ㄹ 것 같다  ·  ㄹ 받침 + 것 같다',
      uz: '받침 bor + 을 것 같다  ·  받침 yo‘q + ㄹ 것 같다  ·  ㄹ 받침 + 것 같다',
      en: 'consonant + 을 것 같다  ·  vowel + ㄹ 것 같다  ·  ㄹ-final + 것 같다',
      ru: 'согласная + 을 것 같다  ·  гласная + ㄹ 것 같다  ·  основа на ㄹ + 것 같다',
    },

    conjugations: [
      // 받침 O — 5
      { base: '먹다', result: '먹을 것 같다' },
      { base: '읽다', result: '읽을 것 같다' },
      { base: '찾다', result: '찾을 것 같다' },
      { base: '좋다', result: '좋을 것 같다' },
      { base: '많다', result: '많을 것 같다' },

      // 받침 X — 5
      { base: '가다', result: '갈 것 같다' },
      { base: '오다', result: '올 것 같다' },
      { base: '크다', result: '클 것 같다' },
      { base: '비싸다', result: '비쌀 것 같다' },
      { base: '바쁘다', result: '바쁠 것 같다' },

      // ㄹ 받침
      { base: '살다', result: '살 것 같다' },
      { base: '멀다', result: '멀 것 같다' },
    ],

    examples: [
      {
        ko: '여기서 걸어가면 시간이 오래 걸릴 것 같아요.',
        highlight: '오래 걸릴 것 같아요',
        gloss: {
          ko: '여기서 걸어가면 시간이 오래 걸릴 것 같아요.',
          uz: 'Bu yerdan piyoda borsak, ancha vaqt ketadiganga o‘xshaydi.',
          en: 'I think it will take a long time if we walk from here.',
          ru: 'Кажется, если идти отсюда пешком, это займёт много времени.',
        },
      },
      {
        ko: '지하철을 타는 것이 더 빠를 것 같아요.',
        highlight: '빠를 것 같아요',
        gloss: {
          ko: '지하철을 타는 것이 더 빠를 것 같아요.',
          uz: 'Menimcha, metroda borish tezroq bo‘ladi.',
          en: 'I think taking the subway will be faster.',
          ru: 'Мне кажется, на метро будет быстрее.',
        },
      },
      {
        ko: '주말에는 이 길이 많이 막힐 것 같아요.',
        highlight: '많이 막힐 것 같아요',
        gloss: {
          ko: '주말에는 이 길이 많이 막힐 것 같아요.',
          uz: 'Dam olish kuni bu yo‘lda tirbandlik kuchli bo‘ladiganga o‘xshaydi.',
          en: 'I think this road will be very congested on the weekend.',
          ru: 'Кажется, на выходных на этой дороге будут сильные пробки.',
        },
      },
      {
        ko: '민수 씨가 약속 시간보다 조금 늦게 올 것 같아요.',
        highlight: '늦게 올 것 같아요',
        gloss: {
          ko: '민수 씨가 약속 시간보다 조금 늦게 올 것 같아요.',
          uz: 'Menimcha, Minsu uchrashuv vaqtiga biroz kechikadi.',
          en: 'I think Minsu will arrive a little late.',
          ru: 'Мне кажется, Минсу немного опоздает.',
        },
      },
      {
        ko: '오늘 오후에는 비가 올 것 같아요.',
        highlight: '비가 올 것 같아요',
        gloss: {
          ko: '오늘 오후에는 비가 올 것 같아요.',
          uz: 'Menimcha, bugun tushdan keyin yomg‘ir yog‘adi.',
          en: 'I think it will rain this afternoon.',
          ru: 'Кажется, сегодня днём будет дождь.',
        },
      },
      {
        ko: '택시를 타면 요금이 조금 비쌀 것 같아요.',
        highlight: '비쌀 것 같아요',
        gloss: {
          ko: '택시를 타면 요금이 조금 비쌀 것 같아요.',
          uz: 'Taksida borsak, narxi biroz qimmat bo‘ladiganga o‘xshaydi.',
          en: 'I think taking a taxi will be a little expensive.',
          ru: 'Мне кажется, поездка на такси будет немного дорогой.',
        },
      },
      {
        ko: '이 시간에는 버스에 사람이 많을 것 같아요.',
        highlight: '사람이 많을 것 같아요',
        gloss: {
          ko: '이 시간에는 버스에 사람이 많을 것 같아요.',
          uz: 'Bu vaqtda avtobusda odam ko‘p bo‘ladiganga o‘xshaydi.',
          en: 'I think the bus will be crowded at this time.',
          ru: 'Мне кажется, в это время в автобусе будет много людей.',
        },
      },
      {
        ko: '지금 출발하면 약속 시간 전에 도착할 것 같아요.',
        highlight: '도착할 것 같아요',
        gloss: {
          ko: '지금 출발하면 약속 시간 전에 도착할 것 같아요.',
          uz: 'Hozir jo‘nasak, uchrashuv vaqtidan oldin yetib boramiz, deb o‘ylayman.',
          en: 'I think we will arrive before the appointment if we leave now.',
          ru: 'Думаю, если мы выйдем сейчас, то приедем до назначенного времени.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '한옥마을까지 걸어가도 될까요?',
        highlight: '걸어가도 될까요',
        gloss: {
          ko: '한옥마을까지 걸어가도 될까요?',
          uz: 'Hanok qishlog‘igacha piyoda borsak bo‘ladimi?',
          en: 'Would it be okay to walk to Hanok Village?',
          ru: 'Можно дойти до деревни ханок пешком?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '걸어가면 30분 이상 걸릴 것 같아요.',
        highlight: '걸릴 것 같아요',
        gloss: {
          ko: '걸어가면 30분 이상 걸릴 것 같아요.',
          uz: 'Piyoda borsangiz, 30 daqiqadan ko‘proq vaqt ketadiganga o‘xshaydi.',
          en: 'I think it will take more than 30 minutes on foot.',
          ru: 'Кажется, пешком это займёт больше 30 минут.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '그럼 버스를 타는 게 좋을까요?',
        highlight: '좋을까요',
        gloss: {
          ko: '그럼 버스를 타는 게 좋을까요?',
          uz: 'Unda avtobusga minganimiz yaxshimi?',
          en: 'Then would it be better to take a bus?',
          ru: 'Тогда лучше поехать на автобусе?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네. 버스가 더 편할 것 같아요.',
        highlight: '편할 것 같아요',
        gloss: {
          ko: '네. 버스가 더 편할 것 같아요.',
          uz: 'Ha. Menimcha, avtobus qulayroq bo‘ladi.',
          en: 'Yes. I think the bus will be more convenient.',
          ru: 'Да. Думаю, на автобусе будет удобнее.',
        },
      },
    ],

    similar: {
      pattern: 'A/V-(으)ㄹ 거예요',
      note: {
        ko: '"-(으)ㄹ 거예요"는 미래의 계획이나 비교적 강한 예상에 사용할 수 있고, "-(으)ㄹ 것 같아요"는 확신을 낮추고 조심스럽게 미래를 추측하는 느낌이 더 강해요. "비가 올 거예요"보다 "비가 올 것 같아요"가 조금 덜 단정적이에요.',
        uz: '"-(으)ㄹ 거예요" kelajak reja yoki kuchliroq taxminni, "-(으)ㄹ 것 같아요" esa ehtiyotkorroq taxminni bildiradi.',
        en: '"-(으)ㄹ 거예요" can state a future plan or stronger prediction, while "-(으)ㄹ 것 같아요" sounds more tentative and less certain.',
        ru: '"-(으)ㄹ 거예요" выражает план или более уверенный прогноз, а "-(으)ㄹ 것 같아요" — более осторожное предположение.',
      },
    },

    cautions: [
      {
        ko: '받침 있는 동사에 "-ㄹ 것 같다"만 붙이지 않아요. "먹ㄹ 것 같아요"가 아니라 "먹을 것 같아요"예요.',
        uz: '받침 bilan "-을 것 같다": 먹을 것 같아요.',
        en: 'Most consonant-ending stems require 을: 먹을 것 같아요.',
        ru: 'После основы с согласным используется 을: 먹을 것 같아요.',
      },
      {
        ko: 'ㄹ 받침에는 ㄹ을 하나 더 붙이지 않아요. "살ㄹ 것 같아요"가 아니라 "살 것 같아요"예요.',
        uz: 'ㄹ bilan tugagan so‘zga yana ㄹ qo‘shilmaydi.',
        en: 'Do not add another ㄹ to an ㄹ-final stem: 살 것 같아요.',
        ru: 'После основы на ㄹ второй ㄹ не добавляется: 살 것 같아요.',
      },
      {
        ko: '현재 행동과 미래 행동을 구별해야 해요. 지금 비가 내리고 있으면 "비가 오는 것 같아요", 앞으로 내릴 것이라고 예상하면 "비가 올 것 같아요"예요.',
        uz: 'Hozirgi holat uchun "오는 것 같다", kelajak uchun "올 것 같다".',
        en: 'Use 오는 것 같다 for rain happening now and 올 것 같다 for predicted future rain.',
        ru: 'Для текущего дождя используется 오는 것 같다, для будущего — 올 것 같다.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '오늘 오후에는 비가 ___ 것 같아요.',
          uz: 'Kelajak taxmini shaklini tanlang.',
          en: 'Choose the future prediction form.',
          ru: 'Выберите форму предположения о будущем.',
        },
        options: [
          { text: '올', correct: true },
          { text: '오는', correct: false },
          { text: '온', correct: false },
          { text: '오고', correct: false },
          { text: '와서', correct: false },
        ],
      },
      {
        question: {
          ko: '택시를 타면 요금이 ___ 것 같아요.',
          uz: '"비싸다" ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct future form of 비싸다.',
          ru: 'Выберите правильную форму 비싸다.',
        },
        options: [
          { text: '비쌀', correct: true },
          { text: '비싼', correct: false },
          { text: '비싸는', correct: false },
          { text: '비싸은', correct: false },
          { text: '비싸고', correct: false },
        ],
      },
      {
        question: {
          ko: '주말에는 사람이 ___ 것 같아요.',
          uz: '"많다" ning kelajak taxmin shaklini tanlang.',
          en: 'Choose the future-prediction form of 많다.',
          ru: 'Выберите форму будущего предположения от 많다.',
        },
        options: [
          { text: '많을', correct: true },
          { text: '많은', correct: false },
          { text: '많는', correct: false },
          { text: '많ㄹ', correct: false },
          { text: '많고', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다"의 미래 추측 형태는 무엇이에요?',
          uz: '"살다" ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the future-prediction form of 살다.',
          ru: 'Выберите форму предположения о будущем от 살다.',
        },
        options: [
          { text: '살 것 같아요', correct: true },
          { text: '살을 것 같아요', correct: false },
          { text: '살ㄹ 것 같아요', correct: false },
          { text: '사는 것 같아요', correct: false },
          { text: '산 것 같아요', correct: false },
        ],
      },
      {
        question: {
          ko: '"비가 올 것 같아요"는 어떤 의미예요?',
          uz: 'Eng mos ma’noni tanlang.',
          en: 'Choose the best meaning of "비가 올 것 같아요."',
          ru: 'Выберите наиболее подходящее значение.',
        },
        options: [
          { text: '앞으로 비가 올 것이라고 추측한다', correct: true },
          { text: '지금 비가 오고 있다고 추측한다', correct: false },
          { text: '전에 비가 왔다고 추측한다', correct: false },
          { text: '비가 오지 않았다고 확신한다', correct: false },
          { text: '비가 오도록 제안한다', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 7-2.
  // V-는지 알다[모르다], N인지 알다[모르다]
  // ─────────────────────────────────────────────
  {
    code: 'vn-ji-alda-moreuda',
    pattern: 'V-는지 알다[모르다], N인지 알다[모르다]',
    section: 3,
    unit: 7,
    order: 2,
    isActive: true,

    summary: {
      ko: '어떤 정보나 사실을 알고 있는지 또는 모르는지를 말할 때 사용해요. 직접 질문을 문장 안에 넣어 "어디에 있는지 알아요", "몇 번 버스인지 몰라요"처럼 표현할 수 있어요.',
      uz: 'Biror ma’lumot yoki faktni bilish yoki bilmaslikni ifodalaydi. To‘g‘ridan-to‘g‘ri savolni gap ichiga kiritib aytish mumkin.',
      en: 'Used to say whether someone knows or does not know a piece of information. It turns a question into an embedded clause, as in "I know where it is."',
      ru: 'Используется, чтобы сказать, знает или не знает человек определённую информацию. Вопрос превращается во встроенную часть предложения.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '간접 질문',
        uz: 'Bilvosita savol',
        en: 'Embedded question',
        ru: 'Косвенный вопрос',
      },
      {
        ko: '정보',
        uz: 'Ma’lumot',
        en: 'Information',
        ru: 'Информация',
      },
    ],

    explanation: {
      ko: '"V-는지 알다/모르다, N인지 알다/모르다"는 질문의 내용을 문장 안에 넣어서 어떤 정보를 알고 있는지 또는 모르는지를 표현할 때 사용해요. 길을 찾거나 교통 정보를 물어볼 때 정말 중요한 문법이에요.\n\n예를 들어 직접 질문하면 "한옥마을이 어디에 있어요?"라고 말해요. 그런데 이 질문을 "알다"와 연결하면 "한옥마을이 어디에 있는지 아세요?"가 돼요. 즉 "한옥마을의 위치를 알고 있습니까?"라는 뜻이에요.\n\n동사에는 "-는지"를 붙여요. "가다 → 가는지", "오다 → 오는지", "먹다 → 먹는지", "기다리다 → 기다리는지"처럼 활용해요.\n\nㄹ 받침으로 끝나는 동사는 "-는" 앞에서 ㄹ이 탈락해요. 그래서 "살다 → 사는지", "만들다 → 만드는지", "놀다 → 노는지"가 돼요. 앞에서 배운 ㄹ 탈락 규칙이 여기에서도 그대로 적용돼요.\n\n명사에는 받침 여부와 관계없이 "인지"를 붙여요. "학생 → 학생인지", "의사 → 의사인지", "몇 번 버스 → 몇 번 버스인지", "출구 → 출구인지"처럼 사용해요.\n\n이 문법은 의문사와 함께 사용할 때 특히 많이 나와요. "어디에 있는지", "어떻게 가는지", "몇 시에 출발하는지", "누가 오는지", "무엇을 타는지"처럼 원래 질문에 있던 의문사를 그대로 유지하면 돼요.\n\n예를 들어 "몇 번 버스를 타요?"라는 직접 질문을 문장 안에 넣으면 "몇 번 버스를 타는지 아세요?"가 돼요. "한옥마을이 어디예요?"는 "한옥마을이 어디인지 아세요?"처럼 바꿀 수 있어요.\n\n중요한 점은 간접 질문 안에서는 일반적인 질문 어순을 다시 만들 필요가 없다는 거예요. 한국어는 원래 의문사가 원래 자리에 있기 때문에 "어디에 있는지", "어떻게 가는지"처럼 자연스럽게 연결하면 돼요.\n\n길을 물을 때 "한옥마을이 어디에 있는지 아세요?", "몇 번 버스를 타는지 아세요?", "이 길이 맞는지 모르겠어요" 같은 표현을 익혀 두면 모르는 사람에게도 훨씬 자연스럽고 정중하게 정보를 물을 수 있어요.',
      uz: '"V-는지 알다/모르다, N인지 알다/모르다" savol mazmunini gap ichiga kiritib, ma’lumotni bilish yoki bilmaslikni aytish uchun ishlatiladi.\n\nMasalan, to‘g‘ridan-to‘g‘ri savol "한옥마을이 어디에 있어요?" bo‘lsa, "한옥마을이 어디에 있는지 아세요?" — "Hanok qishlog‘i qayerdaligini bilasizmi?" bo‘ladi.\n\nFe’lga "-는지": 가다 → 가는지, 오다 → 오는지. ㄹ bilan tugagan fe’lda ㄹ tushadi: 살다 → 사는지.\n\nOtga "인지": 학생인지, 몇 번 버스인지.\n\nSavol so‘zlari saqlanadi: 어디에 있는지, 어떻게 가는지, 몇 시에 출발하는지.',
      en: '"V-는지 알다/모르다, N인지 알다/모르다" embeds the content of a question inside a larger sentence and expresses whether that information is known.\n\nFor example, the direct question "한옥마을이 어디에 있어요?" becomes "한옥마을이 어디에 있는지 아세요?" — "Do you know where Hanok Village is?"\n\nVerbs take "-는지": 가다 → 가는지, 오다 → 오는지, 기다리다 → 기다리는지. Final ㄹ drops before 는: 살다 → 사는지, 만들다 → 만드는지.\n\nNouns take "인지" regardless of final consonant: 학생인지, 의사인지, 몇 번 버스인지.\n\nQuestion words remain inside the clause: 어디에 있는지, 어떻게 가는지, 몇 시에 출발하는지, 누가 오는지.\n\nThis is especially useful for asking directions because it allows polite questions such as "몇 번 버스를 타는지 아세요?" and statements such as "어느 길이 맞는지 모르겠어요."',
      ru: '"V-는지 알다/모르다, N인지 알다/모르다" позволяет включить содержание вопроса внутрь другого предложения и сказать, известна эта информация или нет.\n\nПрямой вопрос "한옥마을이 어디에 있어요?" превращается в "한옥마을이 어디에 있는지 아세요?" — «Вы знаете, где находится деревня ханок?»\n\nС глаголами используется "-는지": 가다 → 가는지, 오다 → 오는지. Перед 는 конечный ㄹ выпадает: 살다 → 사는지.\n\nС существительными используется "인지" независимо от 받침: 학생인지, 몇 번 버스인지.\n\nВопросительные слова остаются внутри конструкции: 어디에 있는지, 어떻게 가는지, 몇 시에 출발하는지.',
    },

    conjugationRule: {
      ko: 'V 어간 + 는지 알다/모르다  ·  V ㄹ 받침: ㄹ 탈락 + 는지  ·  N + 인지 알다/모르다',
      uz: 'V o‘zagi + 는지  ·  ㄹ tushadi  ·  N + 인지',
      en: 'V stem + 는지  ·  final ㄹ drops before 는지  ·  N + 인지',
      ru: 'основа V + 는지  ·  конечный ㄹ выпадает  ·  N + 인지',
    },

    conjugations: [
      { base: '가다', result: '가는지 알다' },
      { base: '오다', result: '오는지 알다' },
      { base: '먹다', result: '먹는지 알다' },
      { base: '찾다', result: '찾는지 알다' },
      { base: '기다리다', result: '기다리는지 알다' },

      { base: '살다', result: '사는지 알다' },
      { base: '만들다', result: '만드는지 알다' },
      { base: '놀다', result: '노는지 알다' },

      { base: '학생', result: '학생인지 알다' },
      { base: '의사', result: '의사인지 알다' },
      { base: '몇 번 버스', result: '몇 번 버스인지 알다' },
      { base: '출구', result: '출구인지 알다' },
    ],

    examples: [
      {
        ko: '한옥마을이 어디에 있는지 아세요?',
        highlight: '어디에 있는지',
        gloss: {
          ko: '한옥마을이 어디에 있는지 아세요?',
          uz: 'Hanok qishlog‘i qayerdaligini bilasizmi?',
          en: 'Do you know where Hanok Village is?',
          ru: 'Вы знаете, где находится деревня ханок?',
        },
      },
      {
        ko: '한옥마을에 어떻게 가는지 아세요?',
        highlight: '어떻게 가는지',
        gloss: {
          ko: '한옥마을에 어떻게 가는지 아세요?',
          uz: 'Hanok qishlog‘iga qanday borishni bilasizmi?',
          en: 'Do you know how to get to Hanok Village?',
          ru: 'Вы знаете, как добраться до деревни ханок?',
        },
      },
      {
        ko: '몇 번 버스를 타는지 모르겠어요.',
        highlight: '몇 번 버스를 타는지',
        gloss: {
          ko: '몇 번 버스를 타는지 모르겠어요.',
          uz: 'Qaysi raqamli avtobusga minishni bilmayman.',
          en: 'I do not know which bus to take.',
          ru: 'Я не знаю, на какой автобус нужно сесть.',
        },
      },
      {
        ko: '지하철이 몇 시에 도착하는지 알아요?',
        highlight: '몇 시에 도착하는지',
        gloss: {
          ko: '지하철이 몇 시에 도착하는지 알아요?',
          uz: 'Metro qachon kelishini bilasizmi?',
          en: 'Do you know what time the subway arrives?',
          ru: 'Вы знаете, во сколько прибывает метро?',
        },
      },
      {
        ko: '이 길이 맞는지 잘 모르겠어요.',
        highlight: '이 길이 맞는지',
        gloss: {
          ko: '이 길이 맞는지 잘 모르겠어요.',
          uz: 'Bu yo‘l to‘g‘rimi, aniq bilmayman.',
          en: 'I am not sure whether this is the right road.',
          ru: 'Я не уверен, правильная ли это дорога.',
        },
      },
      {
        ko: '저 건물이 시청인지 아세요?',
        highlight: '시청인지',
        gloss: {
          ko: '저 건물이 시청인지 아세요?',
          uz: 'U bino shahar hokimiyatimi, bilasizmi?',
          en: 'Do you know whether that building is City Hall?',
          ru: 'Вы знаете, то здание — мэрия или нет?',
        },
      },
      {
        ko: '여기가 몇 번 출구인지 모르겠어요.',
        highlight: '몇 번 출구인지',
        gloss: {
          ko: '여기가 몇 번 출구인지 모르겠어요.',
          uz: 'Bu nechanchi chiqish ekanini bilmayman.',
          en: 'I do not know which exit this is.',
          ru: 'Я не знаю, какой это выход.',
        },
      },
      {
        ko: '그 버스가 서울역에 가는지 기사님께 물어보세요.',
        highlight: '서울역에 가는지',
        gloss: {
          ko: '그 버스가 서울역에 가는지 기사님께 물어보세요.',
          uz: 'Bu avtobus Seul vokzaliga boradimi, haydovchidan so‘rang.',
          en: 'Ask the driver whether that bus goes to Seoul Station.',
          ru: 'Спросите водителя, идёт ли этот автобус до вокзала Сеул.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '실례합니다. 한옥마을이 어디에 있는지 아세요?',
        highlight: '어디에 있는지 아세요',
        gloss: {
          ko: '실례합니다. 한옥마을이 어디에 있는지 아세요?',
          uz: 'Kechirasiz, Hanok qishlog‘i qayerdaligini bilasizmi?',
          en: 'Excuse me. Do you know where Hanok Village is?',
          ru: 'Извините, вы знаете, где находится деревня ханок?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네. 여기에서 멀지 않아요.',
        highlight: '멀지 않아요',
        gloss: {
          ko: '네. 여기에서 멀지 않아요.',
          uz: 'Ha. Bu yerdan uzoq emas.',
          en: 'Yes. It is not far from here.',
          ru: 'Да. Она недалеко отсюда.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '어떻게 가는지 좀 알려 주세요.',
        highlight: '어떻게 가는지',
        gloss: {
          ko: '어떻게 가는지 좀 알려 주세요.',
          uz: 'Qanday borishni aytib bera olasizmi?',
          en: 'Could you tell me how to get there?',
          ru: 'Скажите, пожалуйста, как туда добраться.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '이 길로 쭉 가다가 큰 사거리에서 오른쪽으로 가세요.',
        highlight: '쭉 가다가',
        gloss: {
          ko: '이 길로 쭉 가다가 큰 사거리에서 오른쪽으로 가세요.',
          uz: 'Shu yo‘ldan to‘g‘ri boring, katta chorrahada o‘ngga buriling.',
          en: 'Go straight along this road, then turn right at the large intersection.',
          ru: 'Идите прямо по этой дороге, затем на большом перекрёстке поверните направо.',
        },
      },
    ],

    similar: {
      pattern: '직접 질문',
      note: {
        ko: '"한옥마을이 어디에 있어요?"는 정보를 직접 묻는 질문이고, "한옥마을이 어디에 있는지 아세요?"는 그 정보를 상대방이 알고 있는지 묻는 간접 질문이에요.',
        uz: 'Birinchisi to‘g‘ridan-to‘g‘ri savol, ikkinchisi esa suhbatdosh shu ma’lumotni bilishini so‘raydi.',
        en: '"한옥마을이 어디에 있어요?" directly asks for the location. "한옥마을이 어디에 있는지 아세요?" asks whether the listener knows that information.',
        ru: '"한옥마을이 어디에 있어요?" напрямую спрашивает место, а "...있는지 아세요?" спрашивает, знает ли собеседник эту информацию.',
      },
    },

    cautions: [
      {
        ko: '동사에 바로 "인지"를 붙이지 않아요. "어디에 있인지"가 아니라 "어디에 있는지"예요.',
        uz: 'Fe’lga "는지": 있는지.',
        en: 'Verbs take 는지, not plain 인지: 있는지.',
        ru: 'С глаголом используется 는지: 있는지.',
      },
      {
        ko: '명사에는 "는지"를 붙이지 않아요. "학생는지"가 아니라 "학생인지"예요.',
        uz: 'Ot bilan "인지": 학생인지.',
        en: 'Nouns take 인지: 학생인지, not 학생는지.',
        ru: 'После существительного используется 인지: 학생인지.',
      },
      {
        ko: 'ㄹ 받침 동사는 ㄹ을 그대로 두지 않아요. "살는지"가 아니라 "사는지", "만들는지"가 아니라 "만드는지"예요.',
        uz: 'ㄹ tushadi: 살다 → 사는지.',
        en: 'Final ㄹ drops before 는지: 사는지, 만드는지.',
        ru: 'Конечный ㄹ выпадает перед 는지: 사는지, 만드는지.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '한옥마을이 어디에 있___ 아세요?',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct embedded-question form.',
          ru: 'Выберите правильную форму косвенного вопроса.',
        },
        options: [
          { text: '는지', correct: true },
          { text: '인지', correct: false },
          { text: '은지', correct: false },
          { text: '을지', correct: false },
          { text: '고지', correct: false },
        ],
      },
      {
        question: {
          ko: '몇 번 버스를 타___ 모르겠어요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form.',
          ru: 'Выберите правильную форму.',
        },
        options: [
          { text: '는지', correct: true },
          { text: '인지', correct: false },
          { text: '은지', correct: false },
          { text: '니까', correct: false },
          { text: '다가', correct: false },
        ],
      },
      {
        question: {
          ko: '저 건물이 시청___ 아세요?',
          uz: 'Ot bilan to‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after the noun 시청.',
          ru: 'Выберите правильную форму после существительного 시청.',
        },
        options: [
          { text: '인지', correct: true },
          { text: '는지', correct: false },
          { text: '은지', correct: false },
          { text: '을지', correct: false },
          { text: '이라서', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다"와 "-는지"를 바르게 연결하세요.',
          uz: '"살다" ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct form of 살다 + 는지.',
          ru: 'Выберите правильную форму 살다 + 는지.',
        },
        options: [
          { text: '사는지', correct: true },
          { text: '살는지', correct: false },
          { text: '살은지', correct: false },
          { text: '살인지', correct: false },
          { text: '살을지', correct: false },
        ],
      },
      {
        question: {
          ko: '"한옥마을이 어디에 있는지 아세요?"의 의미로 맞는 것을 고르세요.',
          uz: 'Gapning ma’nosini tanlang.',
          en: 'Choose the correct meaning.',
          ru: 'Выберите правильное значение.',
        },
        options: [
          { text: '한옥마을의 위치를 알고 있는지 묻는다', correct: true },
          { text: '한옥마을에 같이 가자고 제안한다', correct: false },
          { text: '한옥마을에 전에 갔는지 묻는다', correct: false },
          { text: '한옥마을이 멀다고 단정한다', correct: false },
          { text: '한옥마을의 가격을 묻는다', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 7-3. V-(으)려면
  // ─────────────────────────────────────────────
  {
    code: 'verb-euryeomyeon',
    pattern: 'V-(으)려면',
    section: 3,
    unit: 7,
    order: 3,
    isActive: true,

    summary: {
      ko: '어떤 행동을 할 의도나 목적이 있을 때, 그 목적을 이루기 위해 필요한 조건이나 방법을 말할 때 사용해요. "~하려면", "만약 ~하고 싶다면"이라는 뜻이에요.',
      uz: 'Biror ishni qilish niyati bo‘lsa, shu maqsadga erishish uchun kerakli shart yoki usulni aytishda ishlatiladi. "... qilmoqchi bo‘lsangiz" ma’nosiga yaqin.',
      en: 'Used to state a condition or method necessary for carrying out an intended action, meaning roughly "if you want/intend to..."',
      ru: 'Используется для обозначения условия или способа, необходимого для выполнения намеренного действия: «если хотите...», «чтобы...».',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '목적',
        uz: 'Maqsad',
        en: 'Purpose',
        ru: 'Цель',
      },
      {
        ko: '조건',
        uz: 'Shart',
        en: 'Condition',
        ru: 'Условие',
      },
    ],

    explanation: {
      ko: '"V-(으)려면"은 어떤 행동을 하려는 목적이나 의도가 있을 때, 그 목적을 이루기 위해 어떤 조건이 필요한지를 말하는 표현이에요. 자연스럽게 풀면 "~하려고 하면", "~하고 싶다면", "~하기 위해서는" 정도의 뜻이에요.\n\n예를 들어 "한옥마을에 가려면 2번 버스를 타세요"라고 하면 한옥마을에 가는 것이 목적이고, 그 목적을 이루기 위한 방법이 2번 버스를 타는 것이에요.\n\n또 "서울역에 가려면 어디에서 내려야 해요?"라고 하면 서울역에 가고 싶은 사람이 어느 정류장이나 역에서 내려야 하는지를 묻는 문장이 돼요.\n\n받침이 없는 동사에는 "-려면"을 붙여요. "가다 → 가려면", "보다 → 보려면", "타다 → 타려면", "만나다 → 만나려면"처럼 사용해요.\n\n받침이 있는 동사에는 보통 "-으려면"을 붙여요. "먹다 → 먹으려면", "읽다 → 읽으려면", "찾다 → 찾으려면", "입다 → 입으려면"처럼 만들어요.\n\n하지만 ㄹ 받침은 예외예요. ㄹ 뒤에는 "-으려면"이 아니라 "-려면"을 사용해요. "살다 → 살려면", "만들다 → 만들려면", "놀다 → 놀려면"처럼 활용해요.\n\n"V-(으)면"과 비슷해 보이지만 의미가 완전히 같지는 않아요. "-(으)면"은 일반적인 조건을 말해요. "비가 오면 우산을 써요"는 단순히 비가 오는 조건이에요. 반면 "-(으)려면"에는 어떤 행동을 하려는 목적이나 의도가 들어 있어요. "한옥마을에 가려면 버스를 타세요"에서는 한옥마을에 가고 싶은 목적이 분명해요.\n\n길 안내에서는 거의 필수적인 표현이에요. "시청에 가려면 어느 쪽으로 가야 해요?", "서울역에 가려면 몇 번 버스를 타야 해요?", "지하철을 타려면 어디로 가야 해요?"처럼 목적지를 먼저 제시하고 필요한 방법을 물을 수 있어요.\n\n뒤에는 "-아/어야 하다", "-(으)면 되다", 명령이나 안내 표현이 자연스럽게 자주 와요. "한옥마을에 가려면 이 길로 쭉 가야 해요", "표를 사려면 저쪽으로 가면 돼요"처럼 활용하면 좋아요.',
      uz: '"V-(으)려면" biror ishni qilish maqsadi bo‘lsa, unga erishish uchun kerakli shart yoki usulni aytadi.\n\nMasalan, "한옥마을에 가려면 2번 버스를 타세요" — Hanok qishlog‘iga bormoqchi bo‘lsangiz, 2-avtobusga mining.\n\n받침 bo‘lmasa "-려면": 가다 → 가려면, 타다 → 타려면. 받침 bo‘lsa "-으려면": 먹다 → 먹으려면, 찾다 → 찾으려면.\n\nㄹ bilan tugagan fe’l istisno: 살다 → 살려면, 만들다 → 만들려면.\n\nOddiy "-(으)면" umumiy shartni bildiradi. "-(으)려면" esa maqsad yoki niyatni o‘z ichiga oladi.',
      en: '"V-(으)려면" presents the condition or method required to accomplish an intended action. It can often be understood as "if you want to..." or "in order to..."\n\nFor example, "한옥마을에 가려면 2번 버스를 타세요" means "If you want to go to Hanok Village, take bus number 2."\n\nAfter vowel-ending stems, use "-려면": 가다 → 가려면, 타다 → 타려면. After most consonant-ending stems, use "-으려면": 먹다 → 먹으려면, 찾다 → 찾으려면.\n\nFinal ㄹ is an exception and takes "-려면": 살다 → 살려면, 만들다 → 만들려면.\n\nThis differs from ordinary -(으)면. -(으)면 states a general condition, while -(으)려면 includes the idea of an intended goal.\n\nIt is extremely useful for directions: "서울역에 가려면 어디에서 내려야 해요?" and "지하철을 타려면 어디로 가야 해요?"',
      ru: '"V-(으)려면" показывает условие или способ, необходимый для достижения намеренной цели. Его можно понимать как «если хотите...», «чтобы...».\n\nНапример, "한옥마을에 가려면 2번 버스를 타세요" означает «Чтобы попасть в деревню ханок, сядьте на автобус №2».\n\nПосле основы без 받침 используется "-려면": 가다 → 가려면, 타다 → 타려면. После большинства основ с 받침 — "-으려면": 먹다 → 먹으려면, 찾다 → 찾으려면.\n\nПосле конечного ㄹ используется "-려면": 살다 → 살려면, 만들다 → 만들려면.\n\nВ отличие от обычного -(으)면, эта форма содержит значение цели или намерения.',
    },

    conjugationRule: {
      ko: '받침 O + 으려면  ·  받침 X + 려면  ·  ㄹ 받침 + 려면',
      uz: '받침 bor + 으려면  ·  받침 yo‘q + 려면  ·  ㄹ 받침 + 려면',
      en: 'consonant + 으려면  ·  vowel + 려면  ·  final ㄹ + 려면',
      ru: 'согласная + 으려면  ·  гласная + 려면  ·  конечный ㄹ + 려면',
    },

    conjugations: [
      // 받침 O — 5
      { base: '먹다', result: '먹으려면' },
      { base: '읽다', result: '읽으려면' },
      { base: '찾다', result: '찾으려면' },
      { base: '입다', result: '입으려면' },
      { base: '받다', result: '받으려면' },

      // 받침 X — 5
      { base: '가다', result: '가려면' },
      { base: '보다', result: '보려면' },
      { base: '타다', result: '타려면' },
      { base: '만나다', result: '만나려면' },
      { base: '공부하다', result: '공부하려면' },

      // ㄹ 받침
      { base: '살다', result: '살려면' },
      { base: '만들다', result: '만들려면' },
      { base: '놀다', result: '놀려면' },
    ],

    examples: [
      {
        ko: '한옥마을에 가려면 2번 버스를 타세요.',
        highlight: '한옥마을에 가려면',
        gloss: {
          ko: '한옥마을에 가려면 2번 버스를 타세요.',
          uz: 'Hanok qishlog‘iga bormoqchi bo‘lsangiz, 2-avtobusga mining.',
          en: 'If you want to go to Hanok Village, take bus number 2.',
          ru: 'Чтобы попасть в деревню ханок, сядьте на автобус №2.',
        },
      },
      {
        ko: '서울역에 가려면 어디에서 내려야 해요?',
        highlight: '서울역에 가려면',
        gloss: {
          ko: '서울역에 가려면 어디에서 내려야 해요?',
          uz: 'Seul vokzaliga borish uchun qayerda tushish kerak?',
          en: 'Where should I get off to go to Seoul Station?',
          ru: 'Где нужно выйти, чтобы попасть на вокзал Сеул?',
        },
      },
      {
        ko: '지하철을 타려면 이쪽으로 가세요.',
        highlight: '지하철을 타려면',
        gloss: {
          ko: '지하철을 타려면 이쪽으로 가세요.',
          uz: 'Metroga minmoqchi bo‘lsangiz, shu tomonga boring.',
          en: 'Go this way if you want to take the subway.',
          ru: 'Чтобы сесть на метро, идите в эту сторону.',
        },
      },
      {
        ko: '버스 카드를 사려면 편의점에 가면 돼요.',
        highlight: '버스 카드를 사려면',
        gloss: {
          ko: '버스 카드를 사려면 편의점에 가면 돼요.',
          uz: 'Avtobus kartasini sotib olish uchun do‘konga borsangiz bo‘ladi.',
          en: 'To buy a bus card, you can go to a convenience store.',
          ru: 'Чтобы купить транспортную карту, достаточно зайти в магазин.',
        },
      },
      {
        ko: '길을 빨리 찾으려면 지도를 보는 것이 좋아요.',
        highlight: '빨리 찾으려면',
        gloss: {
          ko: '길을 빨리 찾으려면 지도를 보는 것이 좋아요.',
          uz: 'Yo‘lni tez topish uchun xaritaga qaragan yaxshi.',
          en: 'If you want to find the way quickly, it is good to check a map.',
          ru: 'Чтобы быстрее найти дорогу, лучше посмотреть карту.',
        },
      },
      {
        ko: '택시를 타려면 큰길로 나가야 해요.',
        highlight: '택시를 타려면',
        gloss: {
          ko: '택시를 타려면 큰길로 나가야 해요.',
          uz: 'Taksiga minish uchun katta ko‘chaga chiqish kerak.',
          en: 'You need to go out to the main road if you want to take a taxi.',
          ru: 'Чтобы поймать такси, нужно выйти на большую дорогу.',
        },
      },
      {
        ko: '한국에서 운전하려면 국제운전면허증이 필요해요.',
        highlight: '한국에서 운전하려면',
        gloss: {
          ko: '한국에서 운전하려면 국제운전면허증이 필요해요.',
          uz: 'Koreyada mashina haydash uchun xalqaro haydovchilik guvohnomasi kerak.',
          en: 'You need an international driving permit to drive in Korea.',
          ru: 'Чтобы водить машину в Корее, нужны международные права.',
        },
      },
      {
        ko: '이 동네에서 살려면 교통이 편한 곳을 찾는 게 좋아요.',
        highlight: '이 동네에서 살려면',
        gloss: {
          ko: '이 동네에서 살려면 교통이 편한 곳을 찾는 게 좋아요.',
          uz: 'Bu mahallada yashamoqchi bo‘lsangiz, transporti qulay joy topgan yaxshi.',
          en: 'If you want to live in this neighborhood, it is better to find a place with convenient transportation.',
          ru: 'Если хотите жить в этом районе, лучше найти место с удобным транспортом.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '한옥마을에 가려면 어떻게 해야 해요?',
        highlight: '한옥마을에 가려면',
        gloss: {
          ko: '한옥마을에 가려면 어떻게 해야 해요?',
          uz: 'Hanok qishlog‘iga borish uchun nima qilish kerak?',
          en: 'What should I do to get to Hanok Village?',
          ru: 'Как мне добраться до деревни ханок?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '먼저 이 길로 쭉 가세요.',
        highlight: '이 길로 쭉 가세요',
        gloss: {
          ko: '먼저 이 길로 쭉 가세요.',
          uz: 'Avval shu yo‘ldan to‘g‘ri boring.',
          en: 'First, go straight along this road.',
          ru: 'Сначала идите прямо по этой дороге.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '버스를 타려면 어디로 가야 해요?',
        highlight: '버스를 타려면',
        gloss: {
          ko: '버스를 타려면 어디로 가야 해요?',
          uz: 'Avtobusga minish uchun qayerga borishim kerak?',
          en: 'Where should I go to catch the bus?',
          ru: 'Куда нужно идти, чтобы сесть на автобус?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '사거리를 건너가면 바로 버스 정류장이 있어요.',
        highlight: '버스 정류장이 있어요',
        gloss: {
          ko: '사거리를 건너가면 바로 버스 정류장이 있어요.',
          uz: 'Chorrahadan o‘tsangiz, darrov avtobus bekati bor.',
          en: 'Cross the intersection and you will see a bus stop right there.',
          ru: 'Перейдите перекрёсток, и сразу увидите автобусную остановку.',
        },
      },
    ],

    similar: {
      pattern: 'V-(으)면',
      note: {
        ko: '"V-(으)면"은 단순한 조건을 나타내고, "V-(으)려면"은 어떤 행동을 하려는 목적이나 의도가 있을 때 필요한 조건을 나타내요. "비가 오면 우산을 써요"는 일반 조건이고, "한옥마을에 가려면 버스를 타세요"는 목적을 위한 조건이에요.',
        uz: '"-(으)면" umumiy shart, "-(으)려면" esa maqsadni amalga oshirish uchun kerakli shart.',
        en: '"V-(으)면" states a general condition, while "V-(으)려면" states a condition required for an intended goal.',
        ru: '"V-(으)면" выражает обычное условие, а "V-(으)려면" — условие, необходимое для достижения цели.',
      },
    },

    cautions: [
      {
        ko: '받침 있는 동사에 바로 "-려면"만 붙이지 않아요. "먹려면"이 아니라 "먹으려면"이에요.',
        uz: '받침 bilan "-으려면": 먹으려면.',
        en: 'Most consonant-ending stems require 으려면: 먹으려면.',
        ru: 'После большинства основ с согласным используется 으려면: 먹으려면.',
      },
      {
        ko: 'ㄹ 받침에는 "-으려면"을 쓰지 않아요. "살으려면"이 아니라 "살려면"이에요.',
        uz: 'ㄹ bilan "-려면": 살려면.',
        en: 'Final ㄹ takes 려면: 살려면, not 살으려면.',
        ru: 'После ㄹ используется 려면: 살려면.',
      },
      {
        ko: '단순한 자연 조건과 목적 조건을 구별해요. "비가 오려면 우산을 써요"는 일반적인 "비가 오면 우산을 써요"와 의미가 달라서 자연스럽지 않아요.',
        uz: 'Oddiy shart uchun -(으)면, maqsadli shart uchun -(으)려면.',
        en: 'Do not replace a simple condition with -(으)려면. Use 비가 오면 for "if it rains."',
        ru: 'Не используйте -(으)려면 вместо обычного условия. Для «если пойдёт дождь» — 비가 오면.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '한옥마을에 가___ 2번 버스를 타세요.',
          uz: 'Maqsad shartini tanlang.',
          en: 'Choose the form meaning "if you want to go."',
          ru: 'Выберите форму «если хотите поехать».',
        },
        options: [
          { text: '려면', correct: true },
          { text: '으려면', correct: false },
          { text: '는데', correct: false },
          { text: '다가', correct: false },
          { text: '거나', correct: false },
        ],
      },
      {
        question: {
          ko: '길을 찾___ 지도를 보세요.',
          uz: '받침 bilan to‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 찾다.',
          ru: 'Выберите правильную форму после 찾다.',
        },
        options: [
          { text: '으려면', correct: true },
          { text: '려면', correct: false },
          { text: '으면', correct: false },
          { text: '는데', correct: false },
          { text: '다가', correct: false },
        ],
      },
      {
        question: {
          ko: '지하철을 타___ 이쪽으로 가세요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 타다.',
          ru: 'Выберите правильную форму после 타다.',
        },
        options: [
          { text: '려면', correct: true },
          { text: '으려면', correct: false },
          { text: '는지', correct: false },
          { text: '다가', correct: false },
          { text: '으니까', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다"와 "-(으)려면"의 올바른 형태는 무엇이에요?',
          uz: '"살다" ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct -(으)려면 form of 살다.',
          ru: 'Выберите правильную форму 살다.',
        },
        options: [
          { text: '살려면', correct: true },
          { text: '살으려면', correct: false },
          { text: '사려면', correct: false },
          { text: '살면려', correct: false },
          { text: '사는려면', correct: false },
        ],
      },
      {
        question: {
          ko: '"한옥마을에 가려면 버스를 타세요"에서 "-려면"은 무엇을 나타내요?',
          uz: 'Eng mos ma’noni tanlang.',
          en: 'What does -려면 express in this sentence?',
          ru: 'Что выражает -려면 в этом предложении?',
        },
        options: [
          { text: '목적을 이루기 위한 조건', correct: true },
          { text: '과거에 한 경험', correct: false },
          { text: '현재 진행 중인 행동', correct: false },
          { text: '두 행동의 동시 진행', correct: false },
          { text: '명사의 비교', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 7-4. V-다가
  // ─────────────────────────────────────────────
  {
    code: 'verb-daga',
    pattern: 'V-다가',
    section: 3,
    unit: 7,
    order: 4,
    isActive: true,

    summary: {
      ko: '어떤 행동을 하던 중에 그 행동이 멈추고 다른 행동이나 상황으로 바뀌는 것을 나타내요. 길 안내에서는 "쭉 가다가 사거리에서 오른쪽으로 도세요"처럼 이동 중 다음 행동을 알려 줄 때 자주 사용해요.',
      uz: 'Bir harakat davom etayotgan paytda u to‘xtab, boshqa harakat yoki holatga o‘tishni bildiradi. Yo‘l ko‘rsatishda juda ko‘p ishlatiladi.',
      en: 'Expresses that one action is in progress and then stops or shifts to another action or situation. It is very useful for giving directions.',
      ru: 'Показывает, что одно действие происходило, а затем было прервано или сменилось другим действием или ситуацией. Часто используется при объяснении дороги.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '행동 전환',
        uz: 'Harakat almashishi',
        en: 'Action transition',
        ru: 'Смена действия',
      },
      {
        ko: '길 안내',
        uz: 'Yo‘l ko‘rsatish',
        en: 'Directions',
        ru: 'Объяснение дороги',
      },
    ],

    explanation: {
      ko: '"V-다가"는 어떤 행동을 계속하고 있던 중에 그 행동이 끝까지 이어지지 않고, 중간에 다른 행동이나 상황으로 바뀌는 것을 나타내요. 쉽게 생각하면 "A를 하던 중에 B를 했다", "A하다가 B했다"라는 뜻이에요.\n\n예를 들어 "학교에 가다가 친구를 만났어요"라고 하면 학교로 가고 있는 중간에 친구를 만났다는 뜻이에요. 학교에 도착한 뒤 친구를 만난 것이 아니라, 가는 행동이 진행되는 도중에 다른 일이 발생한 거예요.\n\n길 안내에서는 정말 자주 사용해요. "이 길로 쭉 가다가 큰 사거리에서 오른쪽으로 도세요"라고 하면 먼저 길을 따라 계속 가고, 가는 도중 큰 사거리에 도착했을 때 행동을 바꾸어 오른쪽으로 돌라는 뜻이에요.\n\n형태는 간단해요. 동사의 기본형에서 "다"를 빼고 "-다가"를 붙이면 돼요. 받침 여부와 관계없이 형태가 같아요. "가다 → 가다가", "먹다 → 먹다가", "읽다 → 읽다가", "공부하다 → 공부하다가"처럼 사용해요.\n\n"-고 나서"와 차이를 꼭 알아야 해요. "-고 나서"는 앞의 행동을 완전히 끝낸 다음 다음 행동을 하는 것이에요. "밥을 먹고 나서 나갔어요"는 밥을 다 먹은 뒤 나갔다는 뜻이에요.\n\n반면 "밥을 먹다가 나갔어요"라고 하면 밥을 먹는 행동이 아직 끝나지 않았는데 중간에 나갔다는 느낌이에요. 즉 "-다가"의 핵심은 첫 번째 행동이 진행 중이었다는 점이에요.\n\n또 예상하지 못한 일이 중간에 일어나는 상황에도 자주 사용해요. "길을 걷다가 넘어졌어요", "책을 읽다가 잠들었어요", "버스를 타고 가다가 전화가 왔어요"처럼 말할 수 있어요.\n\n일반적으로 앞뒤 행동의 주체가 같을 때 가장 자연스럽고 기본적인 형태예요. 특히 초중급 단계에서는 같은 사람이 A를 하다가 B를 한다는 구조로 익혀 두는 것이 안전해요.\n\n길을 설명할 때는 "쭉 가다가", "건너가다가", "올라가다가" 같은 형태를 익히면 아주 유용해요. 단순히 장소 이름만 말하는 것보다 이동 과정과 행동의 변화가 훨씬 정확하게 전달돼요.',
      uz: '"V-다가" bir harakat davom etayotgan paytda u to‘liq tugamasdan boshqa harakat yoki vaziyatga o‘tishni bildiradi.\n\nMasalan, "학교에 가다가 친구를 만났어요" — maktabga ketayotgan paytda do‘stimni uchratdim. Maktabga yetib borgandan keyin emas, yo‘lda uchratganman.\n\nYo‘l ko‘rsatishda juda foydali: "이 길로 쭉 가다가 사거리에서 오른쪽으로 도세요" — shu yo‘ldan davom etib, chorrahaga yetganda o‘ngga buriling.\n\nShakli oddiy: fe’l o‘zagi + 다가. 받침 ta’sir qilmaydi: 가다가, 먹다가, 읽다가, 공부하다가.\n\n"-고 나서" da birinchi ish to‘liq tugaydi. "-다가" da esa birinchi harakat davom etayotgan paytda boshqa harakat sodir bo‘ladi.',
      en: '"V-다가" indicates that an action was in progress and then stopped, changed, or was interrupted by another action or situation.\n\nFor example, "학교에 가다가 친구를 만났어요" means that the speaker met a friend while on the way to school. The meeting occurred during the action of going, not after arriving.\n\nIt is extremely useful for directions: "이 길로 쭉 가다가 큰 사거리에서 오른쪽으로 도세요" means to continue along the road and then change direction when you reach the large intersection.\n\nFormation is simple: remove 다 and add "-다가." Final consonants do not affect the form: 가다가, 먹다가, 읽다가, 공부하다가.\n\nCompare it with -고 나서. "밥을 먹고 나서 나갔어요" means that the meal was completed before leaving. "밥을 먹다가 나갔어요" implies that the eating was interrupted before it was finished.\n\nThe form is also common for unexpected events occurring during another action, such as "길을 걷다가 넘어졌어요" or "책을 읽다가 잠들었어요."',
      ru: '"V-다가" показывает, что действие происходило, но до его полного завершения началось другое действие или возникла другая ситуация.\n\nНапример, "학교에 가다가 친구를 만났어요" означает, что говорящий встретил друга по дороге в школу, а не после прибытия.\n\nПри объяснении дороги конструкция особенно полезна: "이 길로 쭉 가다가 큰 사거리에서 오른쪽으로 도세요" — идите прямо, а на большом перекрёстке поверните направо.\n\nФорма проста: от глагола убирается 다 и добавляется "-다가": 가다가, 먹다가, 읽다가, 공부하다가.\n\nСравните с -고 나서. "밥을 먹고 나서 나갔어요" означает, что еду закончили, а потом вышли. "밥을 먹다가 나갔어요" означает, что человек вышел, не закончив есть.\n\nТакже форма часто употребляется, когда во время действия неожиданно происходит другое событие.',
    },

    conjugationRule: {
      ko: '동사 어간 + 다가  ·  받침 여부와 관계없이 동일',
      uz: 'Fe’l o‘zagi + 다가  ·  받침 ta’sir qilmaydi',
      en: 'verb stem + 다가  ·  same regardless of final consonant',
      ru: 'основа глагола + 다가  ·  форма не зависит от 받침',
    },

    conjugations: [
      { base: '가다', result: '가다가' },
      { base: '오다', result: '오다가' },
      { base: '먹다', result: '먹다가' },
      { base: '읽다', result: '읽다가' },
      { base: '걷다', result: '걷다가' },
      { base: '기다리다', result: '기다리다가' },
      { base: '공부하다', result: '공부하다가' },
      { base: '운전하다', result: '운전하다가' },
      { base: '전화하다', result: '전화하다가' },
      { base: '일하다', result: '일하다가' },
    ],

    examples: [
      {
        ko: '이 길로 쭉 가다가 사거리에서 오른쪽으로 도세요.',
        highlight: '쭉 가다가',
        gloss: {
          ko: '이 길로 쭉 가다가 사거리에서 오른쪽으로 도세요.',
          uz: 'Shu yo‘ldan to‘g‘ri boring, chorrahada o‘ngga buriling.',
          en: 'Go straight along this road, then turn right at the intersection.',
          ru: 'Идите прямо по этой дороге, затем на перекрёстке поверните направо.',
        },
      },
      {
        ko: '학교에 가다가 친구를 만났어요.',
        highlight: '가다가',
        gloss: {
          ko: '학교에 가다가 친구를 만났어요.',
          uz: 'Maktabga ketayotib do‘stimni uchratdim.',
          en: 'I met a friend while I was going to school.',
          ru: 'По дороге в школу я встретил друга.',
        },
      },
      {
        ko: '길을 걷다가 넘어졌어요.',
        highlight: '걷다가',
        gloss: {
          ko: '길을 걷다가 넘어졌어요.',
          uz: 'Yo‘lda ketayotib yiqilib tushdim.',
          en: 'I fell while walking.',
          ru: 'Я упал, когда шёл по дороге.',
        },
      },
      {
        ko: '책을 읽다가 잠이 들었어요.',
        highlight: '읽다가',
        gloss: {
          ko: '책을 읽다가 잠이 들었어요.',
          uz: 'Kitob o‘qiyotib uxlab qoldim.',
          en: 'I fell asleep while reading a book.',
          ru: 'Я заснул, читая книгу.',
        },
      },
      {
        ko: '버스를 타고 가다가 시청 앞에서 내렸어요.',
        highlight: '타고 가다가',
        gloss: {
          ko: '버스를 타고 가다가 시청 앞에서 내렸어요.',
          uz: 'Avtobusda ketayotib shahar hokimiyati oldida tushdim.',
          en: 'I was riding the bus and got off in front of City Hall.',
          ru: 'Я ехал на автобусе и вышел перед мэрией.',
        },
      },
      {
        ko: '운전하다가 길을 잘못 들었어요.',
        highlight: '운전하다가',
        gloss: {
          ko: '운전하다가 길을 잘못 들었어요.',
          uz: 'Mashina haydab ketayotib noto‘g‘ri yo‘lga kirib qoldim.',
          en: 'I took a wrong road while driving.',
          ru: 'Во время поездки я свернул не на ту дорогу.',
        },
      },
      {
        ko: '친구를 기다리다가 근처 카페에 들어갔어요.',
        highlight: '기다리다가',
        gloss: {
          ko: '친구를 기다리다가 근처 카페에 들어갔어요.',
          uz: 'Do‘stimni kutayotib yaqin kafega kirdim.',
          en: 'While waiting for my friend, I went into a nearby café.',
          ru: 'Пока я ждал друга, я зашёл в ближайшее кафе.',
        },
      },
      {
        ko: '길을 찾다가 모르는 사람에게 물어봤어요.',
        highlight: '찾다가',
        gloss: {
          ko: '길을 찾다가 모르는 사람에게 물어봤어요.',
          uz: 'Yo‘lni qidirayotib notanish odamdan so‘radim.',
          en: 'While trying to find the way, I asked a stranger.',
          ru: 'Пытаясь найти дорогу, я спросил прохожего.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '한옥마을까지 어떻게 가요?',
        highlight: '어떻게 가요',
        gloss: {
          ko: '한옥마을까지 어떻게 가요?',
          uz: 'Hanok qishlog‘igacha qanday boriladi?',
          en: 'How do I get to Hanok Village?',
          ru: 'Как добраться до деревни ханок?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '이 길로 쭉 가다가 두 번째 사거리에서 왼쪽으로 도세요.',
        highlight: '쭉 가다가',
        gloss: {
          ko: '이 길로 쭉 가다가 두 번째 사거리에서 왼쪽으로 도세요.',
          uz: 'Shu yo‘ldan to‘g‘ri boring, ikkinchi chorrahada chapga buriling.',
          en: 'Go straight along this road, then turn left at the second intersection.',
          ru: 'Идите прямо, затем на втором перекрёстке поверните налево.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '그다음에는 어떻게 해요?',
        highlight: '그다음에는',
        gloss: {
          ko: '그다음에는 어떻게 해요?',
          uz: 'Keyin nima qilaman?',
          en: 'What do I do after that?',
          ru: 'Что делать дальше?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '조금 더 가다가 큰 은행이 보이면 길을 건너세요.',
        highlight: '조금 더 가다가',
        gloss: {
          ko: '조금 더 가다가 큰 은행이 보이면 길을 건너세요.',
          uz: 'Yana biroz boring, katta bank ko‘rinsa yo‘lni kesib o‘ting.',
          en: 'Go a little farther, and when you see a large bank, cross the street.',
          ru: 'Пройдите ещё немного, и когда увидите большой банк, перейдите дорогу.',
        },
      },
    ],

    similar: {
      pattern: 'V-고 나서',
      note: {
        ko: '"V-고 나서"는 첫 번째 행동을 완전히 끝낸 후 다음 행동을 하고, "V-다가"는 첫 번째 행동이 진행되는 중에 다른 행동으로 바뀌거나 다른 일이 생겨요. "밥을 먹고 나서 나갔어요 ↔ 밥을 먹다가 나갔어요"처럼 비교하면 차이가 분명해요.',
        uz: '"V-고 나서" da birinchi ish tugaydi, "V-다가" da esa birinchi ish davom etayotgan paytda boshqa ish boshlanadi.',
        en: 'With V-고 나서, the first action is completed before the second. With V-다가, the first action is still in progress when a change or interruption occurs.',
        ru: 'При V-고 나서 первое действие завершается до второго. При V-다가 первое действие ещё продолжается, когда происходит смена или прерывание.',
      },
    },

    cautions: [
      {
        ko: '앞 행동을 완료한 뒤 다음 행동을 한 상황이라면 "-다가"보다 "-고 나서"가 맞아요. 밥을 다 먹은 뒤 나갔다면 "먹고 나서 나갔어요"예요.',
        uz: 'Birinchi ish to‘liq tugagan bo‘lsa "-고 나서" mosroq.',
        en: 'If the first action was fully completed, -고 나서 is usually more appropriate.',
        ru: 'Если первое действие полностью завершилось, обычно лучше использовать -고 나서.',
      },
      {
        ko: '"가았가다"처럼 시제를 앞 동사에 넣지 않아요. 기본적으로 "가다가", "먹다가", "공부하다가"처럼 사용해요.',
        uz: 'Oldingi fe’lni alohida o‘tgan zamonga tuslamang: 가다가.',
        en: 'Do not normally put tense on the first verb: use 가다가, 먹다가, 공부하다가.',
        ru: 'Первый глагол обычно не ставится отдельно в прошедшее время: 가다가.',
      },
      {
        ko: '초급 단계에서는 앞뒤 행동의 주체가 같은 문장을 중심으로 익히는 것이 좋아요. "제가 걷다가 제가 넘어졌어요"처럼 같은 사람이 행동을 전환하는 구조가 기본이에요.',
        uz: 'Boshlang‘ich bosqichda ikki harakatning egasi bir xil bo‘lgan misollarni o‘rganing.',
        en: 'At this level, learn the pattern primarily with the same subject performing both actions.',
        ru: 'На этом уровне лучше сначала использовать конструкцию с одним и тем же субъектом в обеих частях.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '이 길로 쭉 가___ 사거리에서 오른쪽으로 도세요.',
          uz: 'Yo‘l ko‘rsatish uchun to‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form for the direction.',
          ru: 'Выберите правильную форму для объяснения дороги.',
        },
        options: [
          { text: '다가', correct: true },
          { text: '고 나서', correct: false },
          { text: '려면', correct: false },
          { text: '는지', correct: false },
          { text: '으니까', correct: false },
        ],
      },
      {
        question: {
          ko: '학교에 가___ 친구를 만났어요.',
          uz: 'Yo‘lda bo‘lgan voqeani tanlang.',
          en: 'Choose the form meaning "while going to school."',
          ru: 'Выберите форму «по дороге в школу».',
        },
        options: [
          { text: '다가', correct: true },
          { text: '고 나서', correct: false },
          { text: '려면', correct: false },
          { text: '는지', correct: false },
          { text: '을까요', correct: false },
        ],
      },
      {
        question: {
          ko: '"공부하다"와 "-다가"를 바르게 연결하세요.',
          uz: '"공부하다" ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct -다가 form of 공부하다.',
          ru: 'Выберите правильную форму 공부하다.',
        },
        options: [
          { text: '공부하다가', correct: true },
          { text: '공부해다가', correct: false },
          { text: '공부했가다', correct: false },
          { text: '공부하는다가', correct: false },
          { text: '공부하고다가', correct: false },
        ],
      },
      {
        question: {
          ko: '"밥을 먹다가 나갔어요"의 의미로 맞는 것을 고르세요.',
          uz: 'To‘g‘ri ma’noni tanlang.',
          en: 'Choose the correct meaning of "밥을 먹다가 나갔어요."',
          ru: 'Выберите правильное значение.',
        },
        options: [
          { text: '밥을 먹는 중에 나갔어요', correct: true },
          { text: '밥을 다 먹은 후에 나갔어요', correct: false },
          { text: '나간 후에 밥을 먹었어요', correct: false },
          { text: '밥을 먹지 않았어요', correct: false },
          { text: '밥을 먹을 계획이에요', correct: false },
        ],
      },
      {
        question: {
          ko: '"V-다가"와 가장 잘 맞는 설명을 고르세요.',
          uz: 'Eng mos izohni tanlang.',
          en: 'Choose the best description of V-다가.',
          ru: 'Выберите наиболее подходящее объяснение V-다가.',
        },
        options: [
          {
            text: '한 행동을 하던 중 다른 행동이나 상황으로 바뀐다',
            correct: true,
          },
          {
            text: '첫 행동을 완전히 끝낸 뒤 다음 행동을 한다',
            correct: false,
          },
          {
            text: '두 명사를 서로 비교한다',
            correct: false,
          },
          {
            text: '미래 계획을 확실하게 말한다',
            correct: false,
          },
          {
            text: '받침에 따라 조사만 선택한다',
            correct: false,
          },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // UNIT 8 — 정말 속상하겠어요
  // 공감·추측 → 원인 → 감정이 담긴 완료 → 상황의 시점
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 8-1. A/V-겠-
  // ─────────────────────────────────────────────
  {
    code: 'av-get',
    pattern: 'A/V-겠-',
    section: 3,
    unit: 8,
    order: 1,
    isActive: true,

    summary: {
      ko: '현재 상황이나 들은 이야기를 바탕으로 상대방의 감정·상태나 어떤 상황을 조심스럽게 추측할 때 사용해요. 특히 "힘들겠어요", "속상하겠어요"처럼 상대방에게 공감을 표현할 때 아주 자주 사용해요.',
      uz: 'Hozirgi vaziyat yoki eshitilgan ma’lumotga asoslanib, boshqa odamning his-tuyg‘usi yoki holatini ehtiyotkorlik bilan taxmin qilishda ishlatiladi. Ayniqsa hamdardlik bildirishda juda ko‘p qo‘llanadi.',
      en: 'Used to make a considerate inference about someone’s feelings, condition, or a situation based on what you know. It is especially common for expressing empathy.',
      ru: 'Используется для осторожного предположения о чувствах, состоянии человека или ситуации на основе известной информации. Особенно часто употребляется для выражения сочувствия.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '추측',
        uz: 'Taxmin',
        en: 'Inference',
        ru: 'Предположение',
      },
      {
        ko: '공감',
        uz: 'Hamdardlik',
        en: 'Empathy',
        ru: 'Сочувствие',
      },
    ],

    explanation: {
      ko: '"A/V-겠-"은 여러 가지 의미가 있지만, 이번 과에서 가장 중요한 쓰임은 상대방의 상황을 듣거나 눈앞의 상황을 보고 그 사람의 감정이나 상태를 추측하며 공감하는 것이에요.\n\n예를 들어 친구가 "어제 지갑을 잃어버렸어요"라고 말했을 때 "정말 속상하겠어요"라고 할 수 있어요. 내가 친구의 마음을 직접 느낄 수는 없지만, 지갑을 잃어버린 상황을 바탕으로 "분명 마음이 많이 안 좋을 것 같아요"라고 상대의 감정을 헤아리는 표현이에요.\n\n또 친구가 밤새 일을 했다고 하면 "많이 피곤하겠어요", 중요한 시험을 앞두고 있다고 하면 "긴장되겠어요", 가족을 오랫동안 만나지 못했다고 하면 "많이 보고 싶겠어요"라고 말할 수 있어요. 이런 문장은 단순한 정보 전달이라기보다 상대방의 입장을 생각해 주는 느낌이 강해요.\n\n형태는 비교적 간단해요. 동사나 형용사의 기본형에서 "다"를 빼고 "-겠-"을 붙인 뒤 문장의 높임에 맞는 어미를 사용해요. "힘들다 → 힘들겠어요", "피곤하다 → 피곤하겠어요", "좋다 → 좋겠어요", "바쁘다 → 바쁘겠어요", "기다리다 → 기다리겠어요"처럼 받침 여부에 따라 "-겠-" 자체의 형태는 바뀌지 않아요.\n\n"-겠-"은 미래나 의지를 나타낼 수도 있어요. 예를 들어 "제가 하겠습니다"에서는 말하는 사람의 의지가 강해요. 하지만 이번 과의 "속상하겠어요", "힘들겠어요" 같은 표현에서는 미래 계획이 아니라 현재 상황을 바탕으로 한 추측과 공감이 핵심이에요.\n\n그래서 문맥을 반드시 봐야 해요. "내일 비가 오겠어요"에서는 미래에 대한 추측이고, "밤새 일했어요? 정말 피곤하겠어요"에서는 지금 상대방이 피곤할 것이라고 추측하는 공감 표현이에요.\n\n앞에서 배운 "-(으)ㄹ 것 같아요"와도 비슷하지만 느낌이 조금 달라요. "피곤할 것 같아요"는 비교적 객관적인 추측으로 들릴 수 있고, "피곤하겠어요"는 상대방에게 직접 말할 때 그 사람의 상황을 이해해 주는 느낌이 더 자연스러워요.\n\n한국어에서 상대방이 힘든 일을 이야기했을 때 바로 해결 방법을 제시하기보다 먼저 "힘들겠어요", "속상하겠어요", "걱정되겠어요"라고 반응하면 훨씬 자연스럽고 따뜻한 대화가 돼요.',
      uz: '"A/V-겠-" bir nechta ma’noga ega, lekin bu darsdagi asosiy ma’no — suhbatdoshning holati yoki hissiyotini vaziyatga qarab taxmin qilib, hamdardlik bildirish.\n\nMasalan, do‘stingiz "어제 지갑을 잃어버렸어요" desa, "정말 속상하겠어요" — "Juda xafa bo‘lgandirsiz" deb javob berishingiz mumkin.\n\nKimdir tun bo‘yi ishlagan bo‘lsa "많이 피곤하겠어요", muhim imtihon oldidan turgan bo‘lsa "긴장되겠어요" deyish mumkin.\n\nShakli oddiy: fe’l yoki sifatdan 다 olib tashlanadi va "-겠-" qo‘shiladi. 받침 ta’sir qilmaydi: 힘들다 → 힘들겠어요, 피곤하다 → 피곤하겠어요, 좋다 → 좋겠어요.\n\n"-겠-" kelajak yoki qat’iy niyatni ham bildirishi mumkin, lekin bu darsda asosiy ma’no hozirgi vaziyatga asoslangan taxmin va hamdardlikdir.',
      en: '"A/V-겠-" has several functions, but the central function in this lesson is making an empathetic inference about another person’s feelings or condition.\n\nFor example, if a friend says, "어제 지갑을 잃어버렸어요," you might respond, "정말 속상하겠어요." You cannot directly know your friend’s feelings, but the situation allows you to infer that they must feel very upset.\n\nIf someone worked all night, "많이 피곤하겠어요" is natural. If someone is about to take an important exam, you can say "긴장되겠어요."\n\nFormation is simple: remove 다 and add -겠- before the final speech ending. The form itself does not change according to final consonants: 힘들다 → 힘들겠어요, 피곤하다 → 피곤하겠어요, 좋다 → 좋겠어요.\n\n-겠- can also express future prediction or intention. For example, "제가 하겠습니다" expresses the speaker’s strong intention. In expressions such as "속상하겠어요," however, the important meaning is empathetic inference.\n\nCompared with -(으)ㄹ 것 같아요, -겠어요 often sounds especially natural when directly responding to another person’s situation and showing understanding.',
      ru: '"A/V-겠-" имеет несколько функций, но в этом уроке главное значение — предположение о чувствах или состоянии собеседника с оттенком сочувствия.\n\nНапример, если друг говорит: "어제 지갑을 잃어버렸어요", можно ответить: "정말 속상하겠어요" — «Наверное, вы очень расстроены».\n\nЕсли человек работал всю ночь, естественно сказать "많이 피곤하겠어요". Перед важным экзаменом — "긴장되겠어요".\n\nФорма образуется просто: убирается 다 и добавляется -겠-. Наличие 받침 не влияет: 힘들다 → 힘들겠어요, 좋다 → 좋겠어요.\n\n-겠- также может выражать будущее или намерение, например "제가 하겠습니다". Однако в данном уроке главное — предположение и сочувствие на основе ситуации.\n\nПо сравнению с -(으)ㄹ 것 같아요 форма -겠어요 особенно естественна как непосредственная реакция на рассказ собеседника.',
    },

    conjugationRule: {
      ko: 'A/V 어간 + 겠-  ·  받침 여부와 관계없이 동일  ·  해요체: -겠어요',
      uz: 'A/V o‘zagi + 겠-  ·  받침 ta’sir qilmaydi  ·  -겠어요',
      en: 'A/V stem + 겠-  ·  unchanged by final consonant  ·  polite: -겠어요',
      ru: 'основа A/V + 겠-  ·  форма не зависит от 받침  ·  вежливо: -겠어요',
    },

    conjugations: [
      { base: '힘들다', result: '힘들겠어요' },
      { base: '좋다', result: '좋겠어요' },
      { base: '많다', result: '많겠어요' },
      { base: '춥다', result: '춥겠어요' },
      { base: '재미있다', result: '재미있겠어요' },

      { base: '피곤하다', result: '피곤하겠어요' },
      { base: '속상하다', result: '속상하겠어요' },
      { base: '바쁘다', result: '바쁘겠어요' },
      { base: '긴장되다', result: '긴장되겠어요' },
      { base: '아프다', result: '아프겠어요' },
    ],

    examples: [
      {
        ko: '지갑을 잃어버렸어요? 정말 속상하겠어요.',
        highlight: '속상하겠어요',
        gloss: {
          ko: '지갑을 잃어버렸어요? 정말 속상하겠어요.',
          uz: 'Hamyoningizni yo‘qotdingizmi? Juda xafa bo‘lgandirsiz.',
          en: 'You lost your wallet? You must feel really upset.',
          ru: 'Вы потеряли кошелёк? Наверное, вам очень обидно.',
        },
      },
      {
        ko: '어젯밤에 한숨도 못 잤어요? 많이 피곤하겠어요.',
        highlight: '피곤하겠어요',
        gloss: {
          ko: '어젯밤에 한숨도 못 잤어요? 많이 피곤하겠어요.',
          uz: 'Kecha umuman uxlamadingizmi? Juda charchagandirsiz.',
          en: 'You could not sleep at all last night? You must be very tired.',
          ru: 'Вы совсем не спали прошлой ночью? Наверное, очень устали.',
        },
      },
      {
        ko: '내일 중요한 면접이 있어요? 많이 긴장되겠어요.',
        highlight: '긴장되겠어요',
        gloss: {
          ko: '내일 중요한 면접이 있어요? 많이 긴장되겠어요.',
          uz: 'Ertaga muhim suhbatingiz bormi? Juda hayajonlanayotgandirsiz.',
          en: 'You have an important interview tomorrow? You must be nervous.',
          ru: 'Завтра важное собеседование? Наверное, вы сильно волнуетесь.',
        },
      },
      {
        ko: '혼자서 모든 일을 했어요? 정말 힘들겠어요.',
        highlight: '힘들겠어요',
        gloss: {
          ko: '혼자서 모든 일을 했어요? 정말 힘들겠어요.',
          uz: 'Hamma ishni yolg‘iz qildingizmi? Juda qiyin bo‘lgandir.',
          en: 'You did everything by yourself? That must have been hard.',
          ru: 'Вы всё сделали один? Наверное, было очень тяжело.',
        },
      },
      {
        ko: '부모님을 1년 동안 못 만났어요? 많이 보고 싶겠어요.',
        highlight: '보고 싶겠어요',
        gloss: {
          ko: '부모님을 1년 동안 못 만났어요? 많이 보고 싶겠어요.',
          uz: 'Ota-onangizni bir yil ko‘rmadingizmi? Juda sog‘ingandirsiz.',
          en: 'You have not seen your parents for a year? You must miss them a lot.',
          ru: 'Вы год не видели родителей? Наверное, очень скучаете.',
        },
      },
      {
        ko: '이번 주에 시험이 세 개나 있어요? 공부할 것이 많겠어요.',
        highlight: '많겠어요',
        gloss: {
          ko: '이번 주에 시험이 세 개나 있어요? 공부할 것이 많겠어요.',
          uz: 'Bu hafta uchta imtihoningiz bormi? O‘qish juda ko‘p bo‘lsa kerak.',
          en: 'You have three exams this week? You must have a lot to study.',
          ru: 'На этой неделе три экзамена? Наверное, учить придётся очень много.',
        },
      },
      {
        ko: '감기에 걸렸는데 오늘도 일해야 해요? 많이 힘들겠어요.',
        highlight: '힘들겠어요',
        gloss: {
          ko: '감기에 걸렸는데 오늘도 일해야 해요? 많이 힘들겠어요.',
          uz: 'Shamollagan bo‘lsangiz ham bugun ishlashingiz kerakmi? Juda qiyin bo‘lsa kerak.',
          en: 'You have a cold but still have to work today? That must be difficult.',
          ru: 'Вы простудились, но всё равно должны работать? Наверное, тяжело.',
        },
      },
      {
        ko: '친한 친구가 다른 나라로 이사 갔어요? 외롭겠어요.',
        highlight: '외롭겠어요',
        gloss: {
          ko: '친한 친구가 다른 나라로 이사 갔어요? 외롭겠어요.',
          uz: 'Yaqin do‘stingiz boshqa davlatga ko‘chib ketdimi? Yolg‘iz bo‘lib qolgandirsiz.',
          en: 'Your close friend moved to another country? You must feel lonely.',
          ru: 'Ваш близкий друг переехал в другую страну? Наверное, вам одиноко.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '어제 휴대전화를 잃어버렸어요.',
        highlight: '잃어버렸어요',
        gloss: {
          ko: '어제 휴대전화를 잃어버렸어요.',
          uz: 'Kecha telefonimni yo‘qotib qo‘ydim.',
          en: 'I lost my phone yesterday.',
          ru: 'Вчера я потерял телефон.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '정말요? 많이 속상하겠어요.',
        highlight: '속상하겠어요',
        gloss: {
          ko: '정말요? 많이 속상하겠어요.',
          uz: 'Rostdanmi? Juda xafa bo‘lgandirsiz.',
          en: 'Really? You must feel awful.',
          ru: 'Правда? Наверное, вам очень обидно.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '네. 안에 중요한 사진도 많이 있었어요.',
        highlight: '중요한 사진도 많이 있었어요',
        gloss: {
          ko: '네. 안에 중요한 사진도 많이 있었어요.',
          uz: 'Ha. Unda muhim suratlarim ham ko‘p edi.',
          en: 'Yes. I had a lot of important photos on it too.',
          ru: 'Да. Там было много важных фотографий.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '사진까지 없어져서 더 마음이 아프겠어요.',
        highlight: '마음이 아프겠어요',
        gloss: {
          ko: '사진까지 없어져서 더 마음이 아프겠어요.',
          uz: 'Suratlar ham yo‘qolgani uchun yanada achinarli bo‘lsa kerak.',
          en: 'Losing the photos too must make it even more painful.',
          ru: 'Наверное, особенно тяжело из-за того, что пропали и фотографии.',
        },
      },
    ],

    similar: {
      pattern: 'A/V-(으)ㄹ 것 같다',
      note: {
        ko: '둘 다 추측할 수 있지만 "-겠어요"는 상대방의 상황을 듣고 바로 감정이나 상태를 헤아리며 공감할 때 특히 자연스러워요. "-(으)ㄹ 것 같아요"는 조금 더 일반적인 추측으로 사용할 수 있어요.',
        uz: 'Ikkalasi ham taxminni bildiradi, lekin "-겠어요" suhbatdoshning holatiga hamdardlik bildirishda ayniqsa tabiiy.',
        en: 'Both can express inference, but -겠어요 is especially natural when immediately empathizing with another person’s situation.',
        ru: 'Обе формы выражают предположение, но -겠어요 особенно естественно звучит при сочувствии собеседнику.',
      },
    },

    cautions: [
      {
        ko: '"속상하겠어요"의 "-겠-"을 항상 미래라고 해석하지 않아요. 상대방이 지금 속상할 것이라고 추측하며 공감하는 표현일 수 있어요.',
        uz: 'Bu yerda "-겠-" har doim kelajak emas; hozirgi hissiyot haqida ham taxmin bo‘lishi mumkin.',
        en: 'Do not always interpret -겠- as future. In 속상하겠어요 it can infer the listener’s current feelings.',
        ru: 'Не нужно всегда понимать -겠- как будущее. В 속상하겠어요 речь может идти о нынешнем состоянии.',
      },
      {
        ko: '공감할 때 상대방의 감정을 너무 확정적으로 단정하지 않아요. "당신은 속상해요"보다 "속상하겠어요"가 상대의 마음을 조심스럽게 헤아리는 표현이에요.',
        uz: 'Hamdardlikda hissiyotni qat’iy aytishdan ko‘ra "-겠어요" yumshoqroq.',
        en: 'For empathy, -겠어요 is softer than directly declaring what the other person feels.',
        ru: 'При сочувствии -겠어요 звучит мягче, чем прямое утверждение о чувствах собеседника.',
      },
      {
        ko: '형태는 받침 때문에 "-으겠-"처럼 바뀌지 않아요. "힘들으겠어요"가 아니라 "힘들겠어요"예요.',
        uz: '받침 bo‘lsa ham "-으겠-" bo‘lmaydi: 힘들겠어요.',
        en: 'Do not insert 으 before 겠: say 힘들겠어요, not 힘들으겠어요.',
        ru: 'Перед 겠 не добавляется 으: правильно 힘들겠어요.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '지갑을 잃어버렸어요? 정말 속상___어요.',
          uz: 'Hamdardlik shaklini tanlang.',
          en: 'Choose the empathetic inference form.',
          ru: 'Выберите форму сочувственного предположения.',
        },
        options: [
          { text: '하겠', correct: true },
          { text: '하는', correct: false },
          { text: '했', correct: false },
          { text: '할', correct: false },
          { text: '하고', correct: false },
        ],
      },
      {
        question: {
          ko: '밤새 일했어요? 많이 피곤___어요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form.',
          ru: 'Выберите правильную форму.',
        },
        options: [
          { text: '하겠', correct: true },
          { text: '한', correct: false },
          { text: '하는', correct: false },
          { text: '할', correct: false },
          { text: '하고', correct: false },
        ],
      },
      {
        question: {
          ko: '"힘들다"를 "-겠어요"와 바르게 연결하세요.',
          uz: '"힘들다" ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct -겠어요 form of 힘들다.',
          ru: 'Выберите правильную форму 힘들다.',
        },
        options: [
          { text: '힘들겠어요', correct: true },
          { text: '힘들으겠어요', correct: false },
          { text: '힘들은겠어요', correct: false },
          { text: '힘들는겠어요', correct: false },
          { text: '힘들어겠어요', correct: false },
        ],
      },
      {
        question: {
          ko: '"중요한 시험이 내일이에요."에 가장 자연스러운 공감 표현은 무엇이에요?',
          uz: 'Eng tabiiy javobni tanlang.',
          en: 'Choose the most natural empathetic response.',
          ru: 'Выберите наиболее естественную реакцию.',
        },
        options: [
          { text: '많이 긴장되겠어요.', correct: true },
          { text: '많이 긴장됐습니까?', correct: false },
          { text: '많이 긴장하세요.', correct: false },
          { text: '많이 긴장한 적이 있어요.', correct: false },
          { text: '많이 긴장하려면요.', correct: false },
        ],
      },
      {
        question: {
          ko: '이번 과의 "-겠-"에서 가장 중요한 의미를 고르세요.',
          uz: 'Asosiy ma’noni tanlang.',
          en: 'Choose the main use of -겠- in this lesson.',
          ru: 'Выберите главное значение -겠- в этом уроке.',
        },
        options: [
          {
            text: '상대방의 상황을 보고 감정이나 상태를 추측하며 공감하기',
            correct: true,
          },
          { text: '두 명사를 비교하기', correct: false },
          { text: '과거 경험의 횟수를 말하기', correct: false },
          { text: '행동이 끝난 순서를 말하기', correct: false },
          { text: '교통수단을 나타내기', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 8-2. N 때문에
  // ─────────────────────────────────────────────
  {
    code: 'noun-ttaemune',
    pattern: 'N 때문에',
    section: 3,
    unit: 8,
    order: 2,
    isActive: true,

    summary: {
      ko: '어떤 일이나 상황의 원인이 되는 명사 뒤에 붙여 "~때문에", "~의 원인으로"라는 뜻을 나타내요. 특히 문제·불편·걱정처럼 좋지 않은 결과의 원인을 설명할 때 자주 사용해요.',
      uz: 'Biror voqea yoki holatning sababini ko‘rsatuvchi otdan keyin keladi. Ayniqsa muammo yoki noqulay natijaning sababini tushuntirishda ko‘p ishlatiladi.',
      en: 'Follows a noun to express the cause or reason for a situation. It is especially common when explaining problems, inconvenience, or undesirable results.',
      ru: 'Ставится после существительного и обозначает причину ситуации. Особенно часто используется для объяснения проблем, неудобств и нежелательных результатов.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '이유',
        uz: 'Sabab',
        en: 'Reason',
        ru: 'Причина',
      },
      {
        ko: '원인',
        uz: 'Sabab',
        en: 'Cause',
        ru: 'Причина',
      },
    ],

    explanation: {
      ko: '"N 때문에"는 어떤 일이나 상황이 생긴 원인을 명사로 설명할 때 사용하는 표현이에요. 자연스럽게 번역하면 "~때문에", "~로 인해서", "because of N" 정도예요.\n\n예를 들어 "교통사고 때문에 길이 많이 막혔어요"라고 하면 길이 막힌 원인이 교통사고라는 뜻이에요. "감기 때문에 학교에 못 갔어요"에서는 학교에 가지 못한 이유가 감기예요.\n\n형태는 아주 간단해요. 명사 뒤에 받침 여부와 관계없이 그대로 "때문에"를 붙이면 돼요. "비 → 비 때문에", "감기 → 감기 때문에", "시험 → 시험 때문에", "교통사고 → 교통사고 때문에"처럼 사용해요.\n\n사람도 원인이 될 수 있어요. "친구 때문에 늦었어요", "저 때문에 일이 많아졌어요"처럼 사용할 수 있어요. 하지만 사람을 원인으로 말하면 상황에 따라 비난하는 느낌이 날 수도 있어서 조심해야 해요. "너 때문에 늦었어"는 상대방에게 책임을 돌리는 느낌이 꽤 강할 수 있어요.\n\n"때문에"는 특히 좋지 않은 결과와 자주 사용돼요. "스트레스 때문에 잠을 못 자요", "소음 때문에 공부를 못 했어요", "비 때문에 여행을 취소했어요"처럼요.\n\n좋은 결과의 원인을 말할 때도 문법적으로 가능하지만, 감사하거나 좋은 영향을 강조할 때는 "덕분에"가 훨씬 자연스러운 경우가 많아요. 예를 들어 "선생님 때문에 한국어가 많이 늘었어요"라고 하면 문법적으로 이해는 되지만 조금 어색하거나 선생님이 원인이라는 중립적인 느낌이에요. 감사의 마음을 담고 싶다면 "선생님 덕분에 한국어가 많이 늘었어요"가 더 자연스러워요.\n\n앞에서 배운 "-아/어서", "-(으)니까", "N(이)라서"와 마찬가지로 이유를 나타내지만, "때문에"는 명사를 직접 원인으로 만들 수 있다는 점이 중요해요. "비가 와서"는 문장 형태이고, "비 때문에"는 명사 "비"를 바로 원인으로 사용해요.\n\n감정과 스트레스에 대해 이야기하는 이번 과에서는 "시험 때문에 스트레스를 받아요", "친구 문제 때문에 속상해요", "회사 일 때문에 요즘 잠을 잘 못 자요"처럼 어떤 감정이 생긴 원인을 설명할 때 아주 유용해요.',
      uz: '"N 때문에" biror holatning sababini ot orqali ko‘rsatadi. Ma’nosi "N sababli" ga yaqin.\n\nMasalan, "교통사고 때문에 길이 막혔어요" — yo‘l tirband bo‘lishining sababi yo‘l-transport hodisasi. "감기 때문에 학교에 못 갔어요" — shamollaganim sabab maktabga bora olmadim.\n\n받침 dan qat’i nazar, otga "때문에" qo‘shiladi: 비 때문에, 시험 때문에, 감기 때문에.\n\nOdam bilan ishlatilganda ayblash ohangi bo‘lishi mumkin: "너 때문에 늦었어."\n\nYaxshi natija uchun minnatdorchilik bildirishda ko‘pincha "덕분에" tabiiyroq: 선생님 덕분에.',
      en: '"N 때문에" expresses a noun as the cause of a situation. It often corresponds to "because of N."\n\nFor example, "교통사고 때문에 길이 많이 막혔어요" means that a traffic accident caused the congestion. "감기 때문에 학교에 못 갔어요" means a cold was the reason the speaker could not go to school.\n\nSimply attach 때문에 to a noun regardless of its final consonant: 비 때문에, 감기 때문에, 시험 때문에.\n\nA person can also be the cause: "친구 때문에 늦었어요." Be careful, however, because using 때문에 with people can sound like blaming them.\n\nThe expression is especially common with negative or inconvenient results: 스트레스 때문에 잠을 못 자요, 소음 때문에 공부를 못 했어요.\n\nFor positive causes, 덕분에 is often more natural when gratitude is intended. Compare 선생님 때문에 with the more appreciative 선생님 덕분에.',
      ru: '"N 때문에" обозначает существительное как причину ситуации и часто соответствует «из-за N».\n\nНапример, "교통사고 때문에 길이 많이 막혔어요" означает, что причиной пробки стала авария. "감기 때문에 학교에 못 갔어요" — что человек не пошёл в школу из-за простуды.\n\n때문에 присоединяется к существительному независимо от 받침: 비 때문에, 감기 때문에, 시험 때문에.\n\nПричиной может быть и человек: "친구 때문에 늦었어요". Однако такая фраза может звучать как обвинение.\n\nКонструкция особенно часто используется с неприятными последствиями. Для положительной причины с оттенком благодарности часто естественнее 덕분에.',
    },

    conjugationRule: {
      ko: '명사 + 때문에  ·  받침 여부와 관계없이 동일',
      uz: 'Ot + 때문에  ·  받침 ta’sir qilmaydi',
      en: 'noun + 때문에  ·  same regardless of final consonant',
      ru: 'существительное + 때문에  ·  форма не зависит от 받침',
    },

    conjugations: [
      { base: '비', result: '비 때문에' },
      { base: '눈', result: '눈 때문에' },
      { base: '감기', result: '감기 때문에' },
      { base: '시험', result: '시험 때문에' },
      { base: '숙제', result: '숙제 때문에' },
      { base: '스트레스', result: '스트레스 때문에' },
      { base: '교통사고', result: '교통사고 때문에' },
      { base: '소음', result: '소음 때문에' },
      { base: '회사 일', result: '회사 일 때문에' },
      { base: '친구', result: '친구 때문에' },
    ],

    examples: [
      {
        ko: '시험 때문에 요즘 스트레스를 많이 받아요.',
        highlight: '시험 때문에',
        gloss: {
          ko: '시험 때문에 요즘 스트레스를 많이 받아요.',
          uz: 'Imtihon sababli bu kunlarda juda ko‘p stress olyapman.',
          en: 'I have been under a lot of stress lately because of exams.',
          ru: 'В последнее время я сильно нервничаю из-за экзаменов.',
        },
      },
      {
        ko: '감기 때문에 어제 학교에 못 갔어요.',
        highlight: '감기 때문에',
        gloss: {
          ko: '감기 때문에 어제 학교에 못 갔어요.',
          uz: 'Shamollaganim sababli kecha maktabga bora olmadim.',
          en: 'I could not go to school yesterday because of a cold.',
          ru: 'Вчера я не пошёл в школу из-за простуды.',
        },
      },
      {
        ko: '교통사고 때문에 길이 많이 막혔어요.',
        highlight: '교통사고 때문에',
        gloss: {
          ko: '교통사고 때문에 길이 많이 막혔어요.',
          uz: 'Yo‘l-transport hodisasi sabab yo‘l juda tirband edi.',
          en: 'Traffic was heavily congested because of an accident.',
          ru: 'Из-за аварии на дороге была сильная пробка.',
        },
      },
      {
        ko: '회사 일 때문에 요즘 잠을 잘 못 자요.',
        highlight: '회사 일 때문에',
        gloss: {
          ko: '회사 일 때문에 요즘 잠을 잘 못 자요.',
          uz: 'Ish sababli oxirgi paytlarda yaxshi uxlay olmayapman.',
          en: 'I have not been sleeping well lately because of work.',
          ru: 'Из-за работы в последнее время я плохо сплю.',
        },
      },
      {
        ko: '비 때문에 야외 공연이 취소됐어요.',
        highlight: '비 때문에',
        gloss: {
          ko: '비 때문에 야외 공연이 취소됐어요.',
          uz: 'Yomg‘ir sababli ochiq havodagi tomosha bekor qilindi.',
          en: 'The outdoor performance was canceled because of the rain.',
          ru: 'Из-за дождя выступление на открытом воздухе отменили.',
        },
      },
      {
        ko: '옆집 소음 때문에 밤에 자주 깨요.',
        highlight: '소음 때문에',
        gloss: {
          ko: '옆집 소음 때문에 밤에 자주 깨요.',
          uz: 'Qo‘shni uydagi shovqin sababli kechasi tez-tez uyg‘onaman.',
          en: 'I often wake up at night because of noise from next door.',
          ru: 'Я часто просыпаюсь ночью из-за шума у соседей.',
        },
      },
      {
        ko: '친구와의 오해 때문에 며칠 동안 기분이 안 좋았어요.',
        highlight: '오해 때문에',
        gloss: {
          ko: '친구와의 오해 때문에 며칠 동안 기분이 안 좋았어요.',
          uz: 'Do‘stim bilan tushunmovchilik sabab bir necha kun kayfiyatim yomon edi.',
          en: 'I felt bad for several days because of a misunderstanding with a friend.',
          ru: 'Из-за недопонимания с другом несколько дней было плохое настроение.',
        },
      },
      {
        ko: '휴대전화 문제 때문에 중요한 전화를 못 받았어요.',
        highlight: '휴대전화 문제 때문에',
        gloss: {
          ko: '휴대전화 문제 때문에 중요한 전화를 못 받았어요.',
          uz: 'Telefon muammosi sabab muhim qo‘ng‘iroqni qabul qila olmadim.',
          en: 'I missed an important call because of a problem with my phone.',
          ru: 'Из-за проблемы с телефоном я пропустил важный звонок.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '요즘 얼굴이 많이 피곤해 보여요. 무슨 일이 있어요?',
        highlight: '무슨 일이 있어요',
        gloss: {
          ko: '요즘 얼굴이 많이 피곤해 보여요. 무슨 일이 있어요?',
          uz: 'So‘nggi paytda juda charchagan ko‘rinasiz. Biror muammo bormi?',
          en: 'You look very tired lately. Is something wrong?',
          ru: 'В последнее время вы выглядите очень уставшим. Что-то случилось?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '회사 일 때문에 잠을 거의 못 자요.',
        highlight: '회사 일 때문에',
        gloss: {
          ko: '회사 일 때문에 잠을 거의 못 자요.',
          uz: 'Ish sabab deyarli uxlay olmayapman.',
          en: 'I can barely sleep because of work.',
          ru: 'Из-за работы я почти не сплю.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '정말 힘들겠어요.',
        highlight: '힘들겠어요',
        gloss: {
          ko: '정말 힘들겠어요.',
          uz: 'Juda qiyin bo‘lsa kerak.',
          en: 'That must be really hard.',
          ru: 'Наверное, вам очень тяжело.',
        },
      },
    ],

    similar: {
      pattern: 'N 덕분에',
      note: {
        ko: '"때문에"는 원인을 중립적으로 나타낼 수 있지만 좋지 않은 결과와 특히 자주 사용해요. "덕분에"는 좋은 결과의 원인이 되는 사람이나 상황에 감사하는 느낌을 나타내요. "비 때문에 행사가 취소됐어요 ↔ 친구 덕분에 일을 빨리 끝냈어요"처럼 비교할 수 있어요.',
        uz: '"때문에" ko‘pincha salbiy natija sababini, "덕분에" esa ijobiy natija va minnatdorchilikni bildiradi.',
        en: '때문에 is especially common for negative causes, while 덕분에 expresses a positive cause with a sense of gratitude.',
        ru: '때문에 особенно часто используется для отрицательных причин, а 덕분에 — для положительной причины с благодарностью.',
      },
    },

    cautions: [
      {
        ko: '사람 뒤에 "때문에"를 쓰면 책임을 그 사람에게 돌리는 느낌이 생길 수 있어요. "너 때문에 늦었어"는 꽤 직접적인 비난처럼 들릴 수 있어요.',
        uz: 'Odam bilan 때문에 ayblash ohangini berishi mumkin.',
        en: 'Using 때문에 after a person can sound blaming: 너 때문에 늦었어.',
        ru: '때문에 после обозначения человека может звучать как обвинение.',
      },
      {
        ko: '좋은 결과에 감사하는 상황에서는 "때문에"보다 "덕분에"가 자연스러운 경우가 많아요.',
        uz: 'Ijobiy natija va minnatdorchilikda 덕분에 tabiiyroq.',
        en: 'For a positive result with gratitude, 덕분에 is often more natural.',
        ru: 'Для положительного результата с благодарностью часто естественнее 덕분에.',
      },
      {
        ko: '동사 기본형에 바로 "때문에"를 붙이지 않아요. "비가 오다 때문에"가 아니라 명사를 쓰면 "비 때문에", 문장을 원인으로 만들려면 다른 연결 표현을 사용해요.',
        uz: '때문에 bu shaklda ot bilan ishlatiladi.',
        en: 'In this pattern, 때문에 follows nouns, not a dictionary-form verb.',
        ru: 'В этой конструкции 때문에 используется после существительного, а не после словарной формы глагола.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '시험___ 요즘 스트레스를 많이 받아요.',
          uz: 'Sabab shaklini tanlang.',
          en: 'Choose the correct cause expression.',
          ru: 'Выберите правильную форму причины.',
        },
        options: [
          { text: '때문에', correct: true },
          { text: '덕분에만', correct: false },
          { text: '보다', correct: false },
          { text: '동안', correct: false },
          { text: '으려면', correct: false },
        ],
      },
      {
        question: {
          ko: '비___ 야외 공연이 취소됐어요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form.',
          ru: 'Выберите правильную форму.',
        },
        options: [
          { text: '때문에', correct: true },
          { text: '보다', correct: false },
          { text: '까지', correct: false },
          { text: '이라도', correct: false },
          { text: '다가', correct: false },
        ],
      },
      {
        question: {
          ko: '좋은 결과에 대한 감사의 원인을 말할 때 더 자연스러운 표현은 무엇이에요?',
          uz: 'Eng tabiiy shaklni tanlang.',
          en: 'Which expression is more natural for a positive cause with gratitude?',
          ru: 'Какая форма естественнее для положительной причины с благодарностью?',
        },
        options: [
          { text: '덕분에', correct: true },
          { text: '때문에만', correct: false },
          { text: '보다', correct: false },
          { text: '밖에', correct: false },
          { text: '다가', correct: false },
        ],
      },
      {
        question: {
          ko: '"너 때문에 늦었어"가 상황에 따라 강하게 들릴 수 있는 이유는 무엇이에요?',
          uz: 'Eng mos javobni tanlang.',
          en: 'Why can "너 때문에 늦었어" sound strong?',
          ru: 'Почему "너 때문에 늦었어" может звучать резко?',
        },
        options: [
          {
            text: '상대방에게 원인과 책임을 돌리는 느낌이 있기 때문에',
            correct: true,
          },
          { text: '미래 계획을 말하기 때문에', correct: false },
          { text: '존댓말이 너무 높기 때문에', correct: false },
          { text: '두 사람을 비교하기 때문에', correct: false },
          { text: '과거 경험을 묻기 때문에', correct: false },
        ],
      },
      {
        question: {
          ko: '"감기 때문에 학교에 못 갔어요"에서 "감기 때문에"는 무엇을 나타내요?',
          uz: 'Eng mos ma’noni tanlang.',
          en: 'What does 감기 때문에 express?',
          ru: 'Что выражает 감기 때문에?',
        },
        options: [
          { text: '학교에 못 간 원인', correct: true },
          { text: '학교에 갈 미래 계획', correct: false },
          { text: '학교와 감기의 비교', correct: false },
          { text: '학교에 간 경험', correct: false },
          { text: '학교에 가는 방법', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 8-3. V-아/어 버리다
  // ─────────────────────────────────────────────
  {
    code: 'verb-a-eo-beorida',
    pattern: 'V-아/어 버리다',
    section: 3,
    unit: 8,
    order: 3,
    isActive: true,

    summary: {
      ko: '어떤 행동이나 변화가 완전히 끝났음을 나타내면서 아쉬움, 후회, 놀람, 시원함 같은 말하는 사람의 감정까지 함께 표현해요.',
      uz: 'Harakat yoki o‘zgarishning butunlay tugaganini bildirib, afsus, pushaymon, hayrat yoki yengillik kabi his-tuyg‘uni ham qo‘shadi.',
      en: 'Expresses that an action or change has been completely carried out, often adding the speaker’s emotion such as regret, disappointment, surprise, or relief.',
      ru: 'Показывает полное завершение действия или изменения и часто добавляет эмоцию говорящего: сожаление, разочарование, удивление или облегчение.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '완료',
        uz: 'Tugallanish',
        en: 'Completion',
        ru: 'Завершённость',
      },
      {
        ko: '감정',
        uz: 'Hissiyot',
        en: 'Emotion',
        ru: 'Эмоция',
      },
    ],

    explanation: {
      ko: '"V-아/어 버리다"는 어떤 행동이 완전히 끝나거나 어떤 변화가 결국 일어났다는 것을 나타내면서, 그 결과에 대한 말하는 사람의 감정까지 함께 표현하는 문법이에요.\n\n단순히 "숙제를 했어요"라고 하면 숙제를 했다는 사실만 말해요. 그런데 "숙제를 다 해 버렸어요"라고 하면 숙제를 완전히 끝냈다는 느낌이 강하고, 문맥에 따라 "드디어 끝냈다"는 후련함이나 만족감도 느낄 수 있어요.\n\n반대로 "지갑을 잃어버렸어요", "중요한 파일을 지워 버렸어요", "약속을 잊어버렸어요"처럼 좋지 않은 일이 완전히 일어났을 때는 후회, 당황, 아쉬움 같은 감정을 나타내는 경우가 많아요.\n\n형태는 "-아/어요" 활용과 비슷해요. 어간의 마지막 모음이 ㅏ나 ㅗ 계열이면 "-아 버리다"를 사용해요. "찾다 → 찾아 버리다", "닫다 → 닫아 버리다"처럼 만들어요.\n\n그 밖의 모음에는 "-어 버리다"가 와요. "먹다 → 먹어 버리다", "잊다 → 잊어 버리다", "읽다 → 읽어 버리다"처럼 사용해요. 하다 동사는 "해 버리다"가 돼서 "취소하다 → 취소해 버리다", "삭제하다 → 삭제해 버리다"라고 해요.\n\n실제 한국어에서는 "잊어버리다", "잃어버리다"처럼 아주 자주 함께 쓰여서 하나의 단어처럼 굳어진 표현도 있어요. 학습할 때는 기본적으로 "-아/어 버리다"가 앞 행동의 완전한 완료와 감정을 더한다고 이해하면 좋아요.\n\n이 문법의 핵심은 단순한 과거와 다르다는 거예요. "휴대전화를 잃었어요"도 휴대전화가 없어진 사실을 말하지만, "휴대전화를 잃어버렸어요"는 그 일이 완전히 일어났고 그 결과가 속상하거나 난감하다는 느낌이 더 자연스럽게 전달돼요.\n\n항상 부정적인 감정만 있는 것은 아니에요. "밀린 일을 오늘 다 끝내 버렸어요"는 일을 완전히 처리한 시원함을 나타낼 수 있고, "맛있는 케이크를 혼자 다 먹어 버렸어요"는 놀람이나 약간의 후회를 표현할 수도 있어요. 결국 감정은 문맥에 따라 달라져요.\n\n이번 과에서는 스트레스나 속상한 경험을 설명할 일이 많기 때문에 "휴대전화를 잃어버렸어요", "약속을 깜빡 잊어버렸어요", "중요한 사진을 지워 버렸어요"처럼 예상하지 못한 좋지 않은 결과와 함께 익혀 두면 특히 유용해요.',
      uz: '"V-아/어 버리다" harakatning butunlay tugaganini va shu natijaga nisbatan so‘zlovchining hissiyotini bildiradi.\n\n"숙제를 했어요" faqat vazifani qilganlik faktini bildiradi. "숙제를 다 해 버렸어요" esa ishni butunlay tugatganlik va yengillik hissini berishi mumkin.\n\n"지갑을 잃어버렸어요", "파일을 지워 버렸어요" kabi gaplarda esa afsus yoki noqulaylik hissi kuchli.\n\nㅏ/ㅗ bo‘lsa "-아 버리다", boshqa unlilar bilan "-어 버리다", 하다 → "해 버리다".\n\nBu grammatika faqat salbiy hisni bermaydi. Ba’zan ishni nihoyat tugatgan yengillikni ham bildiradi.',
      en: '"V-아/어 버리다" expresses complete completion of an action or change while often adding the speaker’s emotional reaction to the result.\n\n"숙제를 했어요" merely states that the homework was done. "숙제를 다 해 버렸어요" emphasizes that it was completely finished and can convey relief.\n\nWith undesirable events, the form often carries regret or frustration: "지갑을 잃어버렸어요," "중요한 파일을 지워 버렸어요," or "약속을 잊어버렸어요."\n\nFormation follows the basic -아/어 pattern. ㅏ/ㅗ stems generally take -아 버리다, other vowels take -어 버리다, and 하다 becomes 해 버리다.\n\nSome combinations such as 잊어버리다 and 잃어버리다 are extremely common and feel almost lexicalized.\n\nThe emotional nuance is not always negative. "밀린 일을 다 끝내 버렸어요" can express the relief of finally finishing everything.',
      ru: '"V-아/어 버리다" подчёркивает полное завершение действия и часто передаёт эмоциональную реакцию говорящего на результат.\n\n"숙제를 했어요" просто сообщает о выполнении домашнего задания. "숙제를 다 해 버렸어요" подчёркивает, что всё полностью закончено, и может передавать облегчение.\n\nПри неприятных событиях конструкция часто выражает сожаление или досаду: "지갑을 잃어버렸어요", "중요한 파일을 지워 버렸어요".\n\nФорма образуется по правилам -아/어: после ㅏ/ㅗ обычно -아 버리다, после остальных гласных -어 버리다, 하다 → 해 버리다.\n\nТакие формы, как 잊어버리다 и 잃어버리다, очень частотны.\n\nЭмоция не обязательно отрицательная. Конструкция может также передавать облегчение после полного завершения дела.',
    },

    conjugationRule: {
      ko: 'ㅏ/ㅗ 계열 + 아 버리다  ·  그 외 + 어 버리다  ·  하다 → 해 버리다',
      uz: 'ㅏ/ㅗ + 아 버리다  ·  boshqa unlilar + 어 버리다  ·  하다 → 해 버리다',
      en: 'ㅏ/ㅗ stem + 아 버리다  ·  other vowels + 어 버리다  ·  하다 → 해 버리다',
      ru: 'основа с ㅏ/ㅗ + 아 버리다  ·  остальные + 어 버리다  ·  하다 → 해 버리다',
    },

    conjugations: [
      { base: '찾다', result: '찾아 버리다' },
      { base: '닫다', result: '닫아 버리다' },
      { base: '사다', result: '사 버리다' },
      { base: '가다', result: '가 버리다' },
      { base: '자다', result: '자 버리다' },

      { base: '먹다', result: '먹어 버리다' },
      { base: '읽다', result: '읽어 버리다' },
      { base: '잊다', result: '잊어 버리다' },
      { base: '지우다', result: '지워 버리다' },
      { base: '쓰다', result: '써 버리다' },

      { base: '취소하다', result: '취소해 버리다' },
      { base: '삭제하다', result: '삭제해 버리다' },
    ],

    examples: [
      {
        ko: '어제 지갑을 잃어버렸어요.',
        highlight: '잃어버렸어요',
        gloss: {
          ko: '어제 지갑을 잃어버렸어요.',
          uz: 'Kecha hamyonimni yo‘qotib qo‘ydim.',
          en: 'I lost my wallet yesterday.',
          ru: 'Вчера я потерял кошелёк.',
        },
      },
      {
        ko: '친구와의 약속을 깜빡 잊어버렸어요.',
        highlight: '잊어버렸어요',
        gloss: {
          ko: '친구와의 약속을 깜빡 잊어버렸어요.',
          uz: 'Do‘stim bilan uchrashuvni butunlay unutib qo‘ydim.',
          en: 'I completely forgot my appointment with my friend.',
          ru: 'Я совсем забыл о встрече с другом.',
        },
      },
      {
        ko: '실수로 중요한 사진을 지워 버렸어요.',
        highlight: '지워 버렸어요',
        gloss: {
          ko: '실수로 중요한 사진을 지워 버렸어요.',
          uz: 'Xato qilib muhim suratlarni o‘chirib yubordim.',
          en: 'I accidentally deleted an important photo.',
          ru: 'Я случайно удалил важную фотографию.',
        },
      },
      {
        ko: '화가 나서 메시지를 다 지워 버렸어요.',
        highlight: '지워 버렸어요',
        gloss: {
          ko: '화가 나서 메시지를 다 지워 버렸어요.',
          uz: 'Jahlim chiqib, barcha xabarlarni o‘chirib yubordim.',
          en: 'I got angry and deleted all the messages.',
          ru: 'Я разозлился и удалил все сообщения.',
        },
      },
      {
        ko: '스트레스를 받아서 케이크를 혼자 다 먹어 버렸어요.',
        highlight: '먹어 버렸어요',
        gloss: {
          ko: '스트레스를 받아서 케이크를 혼자 다 먹어 버렸어요.',
          uz: 'Stress sabab tortni yolg‘iz o‘zim yeb qo‘ydim.',
          en: 'I was stressed and ended up eating the whole cake by myself.',
          ru: 'Из-за стресса я один съел весь торт.',
        },
      },
      {
        ko: '밀린 일을 오늘 모두 끝내 버렸어요.',
        highlight: '끝내 버렸어요',
        gloss: {
          ko: '밀린 일을 오늘 모두 끝내 버렸어요.',
          uz: 'Bugun yig‘ilib qolgan barcha ishni tugatib tashladim.',
          en: 'I finished all my backlog today.',
          ru: 'Сегодня я наконец закончил все накопившиеся дела.',
        },
      },
      {
        ko: '너무 피곤해서 지하철에서 잠들어 버렸어요.',
        highlight: '잠들어 버렸어요',
        gloss: {
          ko: '너무 피곤해서 지하철에서 잠들어 버렸어요.',
          uz: 'Juda charchaganim uchun metroda uxlab qolibman.',
          en: 'I was so tired that I ended up falling asleep on the subway.',
          ru: 'Я так устал, что заснул в метро.',
        },
      },
      {
        ko: '고민하다가 결국 여행을 취소해 버렸어요.',
        highlight: '취소해 버렸어요',
        gloss: {
          ko: '고민하다가 결국 여행을 취소해 버렸어요.',
          uz: 'Ko‘p o‘ylab, oxiri sayohatni bekor qilib yubordim.',
          en: 'After thinking it over, I ended up canceling the trip.',
          ru: 'После долгих раздумий я в итоге отменил поездку.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '왜 그렇게 속상해 보여요?',
        highlight: '속상해 보여요',
        gloss: {
          ko: '왜 그렇게 속상해 보여요?',
          uz: 'Nega bunchalik xafa ko‘rinasiz?',
          en: 'Why do you look so upset?',
          ru: 'Почему вы выглядите таким расстроенным?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '중요한 사진을 실수로 다 지워 버렸어요.',
        highlight: '지워 버렸어요',
        gloss: {
          ko: '중요한 사진을 실수로 다 지워 버렸어요.',
          uz: 'Muhim suratlarning hammasini tasodifan o‘chirib yubordim.',
          en: 'I accidentally deleted all my important photos.',
          ru: 'Я случайно удалил все важные фотографии.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '정말 속상하겠어요. 다시 찾을 수 없어요?',
        highlight: '속상하겠어요',
        gloss: {
          ko: '정말 속상하겠어요. 다시 찾을 수 없어요?',
          uz: 'Juda achinarli. Ularni qayta tiklab bo‘lmaydimi?',
          en: 'You must be really upset. Is there no way to recover them?',
          ru: 'Наверное, очень обидно. Их нельзя восстановить?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아직 모르겠어요. 오늘 서비스 센터에 가 보려고 해요.',
        highlight: '가 보려고 해요',
        gloss: {
          ko: '아직 모르겠어요. 오늘 서비스 센터에 가 보려고 해요.',
          uz: 'Hali bilmayman. Bugun servis markaziga borib ko‘rmoqchiman.',
          en: 'I do not know yet. I am going to try going to a service center today.',
          ru: 'Пока не знаю. Сегодня попробую сходить в сервисный центр.',
        },
      },
    ],

    similar: {
      pattern: 'V-고 나서',
      note: {
        ko: '"V-고 나서"는 행동의 순서를 객관적으로 설명해요. "V-아/어 버리다"는 행동이 완전히 끝났음을 강조하면서 그 결과에 대한 아쉬움·후련함 등의 감정까지 나타낼 수 있어요.',
        uz: '"V-고 나서" ketma-ketlikni, "-아/어 버리다" esa to‘liq tugallanish va hissiyotni bildiradi.',
        en: 'V-고 나서 objectively describes sequence, while V-아/어 버리다 emphasizes complete completion and often adds emotion.',
        ru: 'V-고 나서 описывает последовательность, а V-아/어 버리다 подчёркивает полное завершение и часто добавляет эмоцию.',
      },
    },

    cautions: [
      {
        ko: '"-아/어 버리다"가 항상 나쁜 의미는 아니에요. 일을 전부 끝낸 후의 후련함처럼 긍정적인 감정도 나타낼 수 있어요.',
        uz: 'Bu grammatika har doim salbiy emas; yengillikni ham bildirishi mumkin.',
        en: 'The form is not always negative; it can also convey relief after completing something.',
        ru: 'Конструкция не всегда отрицательная; она может выражать и облегчение.',
      },
      {
        ko: '동사 기본형에 바로 "버리다"를 붙이지 않아요. "먹 버리다"가 아니라 "먹어 버리다"예요.',
        uz: '"먹 버리다" emas, "먹어 버리다".',
        en: 'Do not attach 버리다 directly to the bare stem: use 먹어 버리다.',
        ru: 'Нельзя присоединять 버리다 прямо к основе: правильно 먹어 버리다.',
      },
      {
        ko: '"버리다"는 원래 "throw away"라는 독립 동사도 있어요. 하지만 "잊어버렸어요", "먹어 버렸어요"에서는 앞 행동의 완료와 감정을 더하는 보조적인 역할을 해요.',
        uz: '버리다 mustaqil "tashlamoq" fe’li ham, lekin bu grammatikada yordamchi ma’no beradi.',
        en: '버리다 can independently mean "throw away," but in this grammar it functions after another verb to add completion and emotion.',
        ru: '버리다 само по себе означает «выбросить», но в этой конструкции добавляет значение завершённости и эмоции.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '중요한 사진을 실수로 지워___어요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form.',
          ru: 'Выберите правильную форму.',
        },
        options: [
          { text: '버렸', correct: true },
          { text: '바렸', correct: false },
          { text: '버리는', correct: false },
          { text: '버릴', correct: false },
          { text: '버리고', correct: false },
        ],
      },
      {
        question: {
          ko: '"먹다"를 "-아/어 버리다"와 바르게 연결하세요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct V-아/어 버리다 form of 먹다.',
          ru: 'Выберите правильную форму 먹다.',
        },
        options: [
          { text: '먹어 버리다', correct: true },
          { text: '먹아 버리다', correct: false },
          { text: '먹 버리다', correct: false },
          { text: '먹고 버리다', correct: false },
          { text: '먹는 버리다', correct: false },
        ],
      },
      {
        question: {
          ko: '"취소하다"의 올바른 형태는 무엇이에요?',
          uz: '"취소하다" ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct form of 취소하다.',
          ru: 'Выберите правильную форму 취소하다.',
        },
        options: [
          { text: '취소해 버리다', correct: true },
          { text: '취소하아 버리다', correct: false },
          { text: '취소하어 버리다', correct: false },
          { text: '취소하고 버리다', correct: false },
          { text: '취소하는 버리다', correct: false },
        ],
      },
      {
        question: {
          ko: '"숙제를 다 해 버렸어요"에 가장 잘 맞는 설명은 무엇이에요?',
          uz: 'Eng mos izohni tanlang.',
          en: 'Choose the best explanation.',
          ru: 'Выберите наиболее подходящее объяснение.',
        },
        options: [
          { text: '숙제를 완전히 끝냈다는 의미가 강조된다', correct: true },
          { text: '숙제를 할 계획만 있다', correct: false },
          { text: '숙제를 하는 방법을 모른다', correct: false },
          { text: '숙제와 다른 것을 비교한다', correct: false },
          { text: '숙제를 할 수 있는지 묻는다', correct: false },
        ],
      },
      {
        question: {
          ko: 'V-아/어 버리다가 나타낼 수 있는 감정으로 가장 알맞은 것은 무엇이에요?',
          uz: 'Eng mos javobni tanlang.',
          en: 'Which emotional nuance can V-아/어 버리다 express?',
          ru: 'Какой эмоциональный оттенок может передавать V-아/어 버리다?',
        },
        options: [
          { text: '후회나 아쉬움 또는 후련함', correct: true },
          { text: '항상 존경', correct: false },
          { text: '항상 미래의 약속', correct: false },
          { text: '항상 비교', correct: false },
          { text: '항상 명령', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 8-4. A/V-(으)ㄹ 때
  // ─────────────────────────────────────────────
  {
    code: 'av-eul-ttae',
    pattern: 'A/V-(으)ㄹ 때',
    section: 3,
    unit: 8,
    order: 4,
    isActive: true,

    summary: {
      ko: '어떤 행동을 하거나 어떤 상태에 있는 시점을 나타낼 때 사용해요. "~할 때", "~일 때", "when..."이라는 뜻으로 상황과 그때의 행동을 연결해 줘요.',
      uz: 'Biror harakat bajariladigan yoki ma’lum holat mavjud bo‘lgan vaqtni bildiradi. "... paytida / qachonki..." ma’nosini beradi.',
      en: 'Expresses the time when an action occurs or a state exists, meaning "when..." or "at the time of..."',
      ru: 'Обозначает время, когда происходит действие или существует определённое состояние: «когда...», «во время...».',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '시간',
        uz: 'Vaqt',
        en: 'Time',
        ru: 'Время',
      },
      {
        ko: '상황',
        uz: 'Vaziyat',
        en: 'Situation',
        ru: 'Ситуация',
      },
    ],

    explanation: {
      ko: '"A/V-(으)ㄹ 때"는 어떤 행동이 일어나는 시점이나 어떤 상태에 있는 시점을 말할 때 사용하는 표현이에요. 앞 문법에서 이유나 감정을 설명했다면, 이번에는 "그 일이 언제 일어나는가"를 구체적으로 연결할 수 있어요.\n\n예를 들어 "스트레스를 받을 때 음악을 들어요"라고 하면 스트레스를 받는 상황이 생기는 시점에 음악을 듣는다는 뜻이에요. "기분이 안 좋을 때 친구와 이야기해요"는 기분이 안 좋은 상황에서 친구와 이야기한다는 뜻이고요.\n\n받침이 있는 동사나 형용사에는 "-을 때"를 붙여요. "먹다 → 먹을 때", "읽다 → 읽을 때", "좋다 → 좋을 때", "많다 → 많을 때"처럼 사용해요.\n\n받침이 없는 동사나 형용사에는 ㄹ이 앞 음절의 받침으로 들어가요. "가다 → 갈 때", "오다 → 올 때", "크다 → 클 때", "아프다 → 아플 때"가 돼요.\n\nㄹ 받침으로 끝나는 말은 새로운 ㄹ을 하나 더 붙이지 않아요. "살다 → 살 때", "멀다 → 멀 때"처럼 사용해요.\n\n형태가 "-(으)ㄹ"이라서 미래만 나타낸다고 생각하면 안 돼요. "학교에 갈 때 버스를 타요"는 앞으로 한 번 학교에 갈 미래만 말하는 것이 아니라 평소 학교에 갈 때의 습관도 나타낼 수 있어요. 즉 "-(으)ㄹ 때"는 실제 문맥에서 과거·현재·미래의 다양한 상황에 사용돼요.\n\n시제는 보통 전체 문장의 마지막 서술어를 보고 이해해요. "학교에 갈 때 친구를 만났어요"라면 과거의 일이 되고, "학교에 갈 때 버스를 타요"는 평소 습관, "내일 학교에 갈 때 우산을 가져갈 거예요"는 미래의 일이 돼요.\n\n감정이나 스트레스 상황을 설명할 때 매우 유용해요. "속상할 때 혼자 산책해요", "스트레스를 받을 때 운동해요", "화가 날 때 바로 말하지 않아요", "걱정이 많을 때 친구에게 전화해요"처럼 자신의 감정 관리 방법을 설명할 수 있어요.\n\n"N 때"와도 비슷하지만, 동작이나 상태를 자세하게 표현하려면 A/V-(으)ㄹ 때를 사용해요. "시험 때 긴장해요"는 시험이라는 시점을 말하고, "시험을 볼 때 긴장해요"는 시험을 보는 행동이 일어나는 동안 긴장한다는 뜻이에요.',
      uz: '"A/V-(으)ㄹ 때" biror harakat sodir bo‘ladigan yoki holat mavjud bo‘ladigan vaqtni bildiradi.\n\nMasalan, "스트레스를 받을 때 음악을 들어요" — stress olgan paytim musiqa tinglayman. "기분이 안 좋을 때 친구와 이야기해요" — kayfiyatim yomon paytda do‘stim bilan gaplashaman.\n\n받침 bo‘lsa "-을 때": 먹다 → 먹을 때, 좋다 → 좋을 때. 받침 bo‘lmasa "-ㄹ 때": 가다 → 갈 때, 아프다 → 아플 때.\n\nㄹ bilan tugagan so‘zga yana ㄹ qo‘shilmaydi: 살다 → 살 때.\n\nShaklda "-(으)ㄹ" bo‘lsa ham faqat kelajakni anglatmaydi. Odat, o‘tgan voqea yoki kelajakdagi vaziyatda ham ishlatilishi mumkin.',
      en: '"A/V-(으)ㄹ 때" expresses the time or situation in which an action occurs or a state exists.\n\nFor example, "스트레스를 받을 때 음악을 들어요" means "I listen to music when I am stressed." "기분이 안 좋을 때 친구와 이야기해요" means "I talk with a friend when I feel bad."\n\nAfter most consonant-ending stems, use "-을 때": 먹다 → 먹을 때, 좋다 → 좋을 때. After vowel-ending stems, add ㄹ: 가다 → 갈 때, 아프다 → 아플 때.\n\nWith final ㄹ, do not add another ㄹ: 살다 → 살 때.\n\nAlthough the form contains -(으)ㄹ, it does not necessarily refer only to the future. It can describe habits, past situations, or future situations depending on the sentence.\n\nCompare "시험 때 긴장해요" with "시험을 볼 때 긴장해요." The first refers to the exam period or occasion, while the second specifically describes the action of taking an exam.',
      ru: '"A/V-(으)ㄹ 때" обозначает время или ситуацию, когда происходит действие или существует состояние.\n\nНапример, "스트레스를 받을 때 음악을 들어요" — «Когда я испытываю стресс, я слушаю музыку». "기분이 안 좋을 때 친구와 이야기해요" — «Когда у меня плохое настроение, я разговариваю с другом».\n\nПосле большинства основ с конечным согласным используется "-을 때": 먹다 → 먹을 때, 좋다 → 좋을 때. После основы без 받침 добавляется ㄹ: 가다 → 갈 때, 아프다 → 아플 때.\n\nПосле конечного ㄹ второй ㄹ не добавляется: 살다 → 살 때.\n\nНесмотря на форму -(으)ㄹ, конструкция не ограничивается будущим. Она может описывать привычки, прошлые и будущие ситуации в зависимости от контекста.',
    },

    conjugationRule: {
      ko: '받침 O + 을 때  ·  받침 X + ㄹ 때  ·  ㄹ 받침 + 때',
      uz: '받침 bor + 을 때  ·  받침 yo‘q + ㄹ 때  ·  ㄹ 받침 + 때',
      en: 'consonant + 을 때  ·  vowel + ㄹ 때  ·  ㄹ-final + 때',
      ru: 'согласная + 을 때  ·  гласная + ㄹ 때  ·  основа на ㄹ + 때',
    },

    conjugations: [
      // 받침 O — 5
      { base: '먹다', result: '먹을 때' },
      { base: '읽다', result: '읽을 때' },
      { base: '받다', result: '받을 때' },
      { base: '좋다', result: '좋을 때' },
      { base: '많다', result: '많을 때' },

      // 받침 X — 5
      { base: '가다', result: '갈 때' },
      { base: '오다', result: '올 때' },
      { base: '보다', result: '볼 때' },
      { base: '아프다', result: '아플 때' },
      { base: '바쁘다', result: '바쁠 때' },

      // ㄹ 받침
      { base: '살다', result: '살 때' },
      { base: '멀다', result: '멀 때' },
    ],

    examples: [
      {
        ko: '스트레스를 받을 때 음악을 들어요.',
        highlight: '스트레스를 받을 때',
        gloss: {
          ko: '스트레스를 받을 때 음악을 들어요.',
          uz: 'Stress olgan paytim musiqa tinglayman.',
          en: 'I listen to music when I am stressed.',
          ru: 'Когда я испытываю стресс, я слушаю музыку.',
        },
      },
      {
        ko: '기분이 안 좋을 때 친구에게 전화해요.',
        highlight: '기분이 안 좋을 때',
        gloss: {
          ko: '기분이 안 좋을 때 친구에게 전화해요.',
          uz: 'Kayfiyatim yomon bo‘lganda do‘stimga telefon qilaman.',
          en: 'I call a friend when I am feeling down.',
          ru: 'Когда у меня плохое настроение, я звоню другу.',
        },
      },
      {
        ko: '화가 날 때 바로 말하지 않는 것이 좋아요.',
        highlight: '화가 날 때',
        gloss: {
          ko: '화가 날 때 바로 말하지 않는 것이 좋아요.',
          uz: 'Jahlingiz chiqqanda darhol gapirmagan yaxshi.',
          en: 'It is better not to speak immediately when you are angry.',
          ru: 'Когда вы злитесь, лучше не говорить сразу.',
        },
      },
      {
        ko: '걱정이 많을 때 산책을 하면 마음이 편해져요.',
        highlight: '걱정이 많을 때',
        gloss: {
          ko: '걱정이 많을 때 산책을 하면 마음이 편해져요.',
          uz: 'Ko‘p xavotirlanganimda sayr qilsam, ko‘nglim tinchlanadi.',
          en: 'When I have a lot of worries, taking a walk helps me relax.',
          ru: 'Когда я сильно переживаю, прогулка помогает успокоиться.',
        },
      },
      {
        ko: '시험을 볼 때 너무 긴장하지 마세요.',
        highlight: '시험을 볼 때',
        gloss: {
          ko: '시험을 볼 때 너무 긴장하지 마세요.',
          uz: 'Imtihon topshirayotganda juda hayajonlanmang.',
          en: 'Do not get too nervous when taking an exam.',
          ru: 'Не волнуйтесь слишком сильно во время экзамена.',
        },
      },
      {
        ko: '친구와 싸웠을 때는 먼저 마음을 진정시키는 것이 좋아요.',
        highlight: '친구와 싸웠을 때',
        gloss: {
          ko: '친구와 싸웠을 때는 먼저 마음을 진정시키는 것이 좋아요.',
          uz: 'Do‘stingiz bilan urishib qolganingizda avval tinchlangan yaxshi.',
          en: 'When you have had an argument with a friend, it is good to calm down first.',
          ru: 'После ссоры с другом лучше сначала успокоиться.',
        },
      },
      {
        ko: '몸이 아플 때는 무리해서 운동하지 마세요.',
        highlight: '몸이 아플 때',
        gloss: {
          ko: '몸이 아플 때는 무리해서 운동하지 마세요.',
          uz: 'O‘zingizni yomon his qilganingizda zo‘riqib mashq qilmang.',
          en: 'Do not exercise too hard when you are sick.',
          ru: 'Когда вы плохо себя чувствуете, не перенапрягайтесь на тренировке.',
        },
      },
      {
        ko: '한국에서 살 때 힘든 일이 있으면 친구들에게 도움을 많이 받았어요.',
        highlight: '한국에서 살 때',
        gloss: {
          ko: '한국에서 살 때 힘든 일이 있으면 친구들에게 도움을 많이 받았어요.',
          uz: 'Koreyada yashaganimda qiyin paytlarda do‘stlarim menga ko‘p yordam berishdi.',
          en: 'When I lived in Korea, my friends helped me a lot whenever things were difficult.',
          ru: 'Когда я жил в Корее, друзья очень помогали мне в трудные моменты.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '스트레스를 많이 받을 때 보통 어떻게 해요?',
        highlight: '스트레스를 많이 받을 때',
        gloss: {
          ko: '스트레스를 많이 받을 때 보통 어떻게 해요?',
          uz: 'Ko‘p stress olganingizda odatda nima qilasiz?',
          en: 'What do you usually do when you are very stressed?',
          ru: 'Что вы обычно делаете, когда испытываете сильный стресс?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '저는 스트레스를 받을 때 밖에 나가서 오래 걸어요.',
        highlight: '스트레스를 받을 때',
        gloss: {
          ko: '저는 스트레스를 받을 때 밖에 나가서 오래 걸어요.',
          uz: 'Stress olganimda tashqariga chiqib uzoq yuraman.',
          en: 'When I am stressed, I go outside and take a long walk.',
          ru: 'Когда я нервничаю, я выхожу на улицу и долго гуляю.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '걸으면 기분이 좀 좋아져요?',
        highlight: '기분이 좀 좋아져요',
        gloss: {
          ko: '걸으면 기분이 좀 좋아져요?',
          uz: 'Yurganingizda kayfiyatingiz yaxshilanadimi?',
          en: 'Does walking make you feel better?',
          ru: 'После прогулки вам становится лучше?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네. 마음이 답답할 때 걸으면 생각도 정리돼요.',
        highlight: '마음이 답답할 때',
        gloss: {
          ko: '네. 마음이 답답할 때 걸으면 생각도 정리돼요.',
          uz: 'Ha. Ichim siqilganda yursam, fikrlarim ham tartibga tushadi.',
          en: 'Yes. When I feel frustrated, walking helps me organize my thoughts.',
          ru: 'Да. Когда мне тяжело на душе, прогулка помогает привести мысли в порядок.',
        },
      },
    ],

    similar: {
      pattern: 'N 때',
      note: {
        ko: '"N 때"는 명사로 시점을 간단하게 나타내요. "시험 때", "방학 때"처럼 사용할 수 있어요. "A/V-(으)ㄹ 때"는 행동이나 상태를 더 구체적으로 표현해요. "시험 때 긴장해요 ↔ 시험을 볼 때 긴장해요"처럼 비교할 수 있어요.',
        uz: '"N 때" vaqtni ot bilan, "A/V-(으)ㄹ 때" esa harakat yoki holat bilan batafsil ifodalaydi.',
        en: 'N 때 simply marks a time with a noun, while A/V-(으)ㄹ 때 describes the action or state occurring at that time.',
        ru: 'N 때 обозначает время существительным, а A/V-(으)ㄹ 때 подробнее описывает действие или состояние.',
      },
    },

    cautions: [
      {
        ko: '받침 있는 말에 바로 "-ㄹ 때"를 붙이지 않아요. "먹ㄹ 때"가 아니라 "먹을 때"예요.',
        uz: '받침 bilan "-을 때": 먹을 때.',
        en: 'Most consonant-ending stems require 을 때: 먹을 때.',
        ru: 'После основы с согласным используется 을 때: 먹을 때.',
      },
      {
        ko: 'ㄹ 받침에는 ㄹ을 하나 더 붙이지 않아요. "살ㄹ 때"가 아니라 "살 때"예요.',
        uz: 'ㄹ bilan yana ㄹ qo‘shilmaydi: 살 때.',
        en: 'Do not add another ㄹ after an ㄹ-final stem: 살 때.',
        ru: 'После основы на ㄹ второй ㄹ не добавляется: 살 때.',
      },
      {
        ko: '"-(으)ㄹ 때"가 있다고 해서 항상 미래가 아니에요. "학교에 갈 때 버스를 타요"처럼 반복되는 현재 습관에도 사용할 수 있어요.',
        uz: 'Shakl faqat kelajak uchun emas; odatni ham bildirishi mumkin.',
        en: 'The construction is not limited to future time; it can describe habitual situations.',
        ru: 'Конструкция используется не только для будущего, но и для привычных ситуаций.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '스트레스를 받___ 음악을 들어요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 받다.',
          ru: 'Выберите правильную форму после 받다.',
        },
        options: [
          { text: '을 때', correct: true },
          { text: 'ㄹ 때', correct: false },
          { text: '는 때', correct: false },
          { text: '은 때', correct: false },
          { text: '다가', correct: false },
        ],
      },
      {
        question: {
          ko: '기분이 안 좋___ 친구에게 전화해요.',
          uz: '"좋다" bilan to‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 좋다.',
          ru: 'Выберите правильную форму после 좋다.',
        },
        options: [
          { text: '을 때', correct: true },
          { text: 'ㄹ 때', correct: false },
          { text: '는 때', correct: false },
          { text: '은 때', correct: false },
          { text: '고 나서', correct: false },
        ],
      },
      {
        question: {
          ko: '몸이 아프___ 무리하지 마세요.',
          uz: '"아프다" ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct form of 아프다.',
          ru: 'Выберите правильную форму 아프다.',
        },
        options: [
          { text: 'ㄹ 때', correct: true },
          { text: '을 때', correct: false },
          { text: '는 때', correct: false },
          { text: '은 때', correct: false },
          { text: '다가', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다"와 "-(으)ㄹ 때"를 바르게 연결하세요.',
          uz: '"살다" ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct -(으)ㄹ 때 form of 살다.',
          ru: 'Выберите правильную форму 살다.',
        },
        options: [
          { text: '살 때', correct: true },
          { text: '살을 때', correct: false },
          { text: '살ㄹ 때', correct: false },
          { text: '사는 때', correct: false },
          { text: '산 때', correct: false },
        ],
      },
      {
        question: {
          ko: '"학교에 갈 때 버스를 타요"에서 "-ㄹ 때"는 무엇을 나타내요?',
          uz: 'Eng mos ma’noni tanlang.',
          en: 'What does -ㄹ 때 express here?',
          ru: 'Что выражает -ㄹ 때 в этом предложении?',
        },
        options: [
          { text: '학교에 가는 상황이나 시점', correct: true },
          { text: '학교에 간 과거 경험의 횟수', correct: false },
          { text: '버스와 학교의 비교', correct: false },
          { text: '학교에 가지 못한 이유', correct: false },
          { text: '학교에 갈 수 있는 능력', correct: false },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // UNIT 9 — 문의할 게 있는데요
  // 배경·말 꺼내기 → 진행 중 상황 → 정중한 문의 → 제한·적은 수량
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 9-1.
  // A-(으)ㄴ데요, V-는데요, N인데요
  // ─────────────────────────────────────────────
  {
    code: 'av-n-neundeyo',
    pattern: 'A-(으)ㄴ데요, V-는데요, N인데요',
    section: 3,
    unit: 9,
    order: 1,
    isActive: true,

    summary: {
      ko: '상대방에게 질문·부탁·설명 등을 하기 전에 자신의 상황이나 배경을 부드럽게 제시할 때 사용해요. 문장을 바로 끝내지 않고 상대방의 반응을 기다리는 느낌도 있어요.',
      uz: 'Savol, iltimos yoki tushuntirishdan oldin o‘z vaziyatingiz yoki fon ma’lumotini yumshoq tarzda aytishda ishlatiladi. Gapni ochiq qoldirib, suhbatdoshning javobini kutish hissi ham bor.',
      en: 'Used to gently provide background or context before a question, request, or explanation. It can also leave the sentence somewhat open and invite the listener to respond.',
      ru: 'Используется, чтобы мягко сообщить фон или ситуацию перед вопросом, просьбой или объяснением. Также может оставлять высказывание открытым, ожидая реакции собеседника.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '배경',
        uz: 'Fon',
        en: 'Background',
        ru: 'Фон',
      },
      {
        ko: '문의',
        uz: 'So‘rov',
        en: 'Inquiry',
        ru: 'Запрос',
      },
    ],

    explanation: {
      ko: '"A-(으)ㄴ데요, V-는데요, N인데요"는 상대방에게 바로 본론을 말하기보다 먼저 자신의 상황이나 관련 정보를 부드럽게 제시할 때 사용하는 아주 중요한 회화 표현이에요. 특히 전화로 문의하거나 처음 보는 사람에게 질문할 때 정말 자주 사용해요.\n\n예를 들어 전화해서 바로 "수업 시간이 언제예요?"라고 물을 수도 있지만, "한국어 수업에 대해 문의할 게 있는데요"라고 먼저 말하면 자신이 왜 전화했는지 배경을 알려 주면서 훨씬 자연스럽고 정중하게 대화를 시작할 수 있어요.\n\n동사에는 "-는데요"를 사용해요. "찾다 → 찾는데요", "알아보다 → 알아보는데요", "문의하다 → 문의하는데요"처럼 만들어요. 예를 들어 "방을 찾고 있는데요"라고 하면 방을 찾는 상황을 먼저 말하고, 뒤에서 가격이나 위치를 물을 수 있어요.\n\n형용사는 받침에 따라 "-은데요/ㄴ데요"를 사용해요. 받침이 있으면 "-은데요": "작다 → 작은데요", "좋다 → 좋은데요". 받침이 없으면 ㄴ이 붙어서 "크다 → 큰데요", "비싸다 → 비싼데요"가 돼요. ㄹ 받침은 ㄹ이 탈락하고 ㄴ이 붙어서 "길다 → 긴데요", "멀다 → 먼데요"처럼 활용해요.\n\n명사에는 받침 여부와 관계없이 "인데요"를 붙여요. "학생 → 학생인데요", "외국인 → 외국인인데요", "예약 문의 → 예약 문의인데요"처럼 사용할 수 있어요.\n\n중요한 점은 이번 문법의 "-는데요"가 앞에서 배운 문장 연결형 "-는데"와 형태는 비슷하지만 회화에서 문장 끝에 사용될 수 있다는 거예요. "제가 지금 좀 바쁜데요."처럼 말하면 단순히 사실을 전달하는 것뿐 아니라 상대방이 그 상황을 고려해서 반응하기를 기다리는 느낌이 있어요.\n\n예를 들어 누군가 "지금 이야기할 수 있어요?"라고 물었을 때 "죄송하지만 지금 회의 중인데요."라고 하면 직접적으로 "안 돼요"라고 하지 않아도 지금은 이야기하기 어렵다는 의미가 자연스럽게 전달돼요.\n\n전화 문의에서도 매우 유용해요. "문의할 게 있는데요", "인터넷에서 광고를 봤는데요", "예약을 변경하고 싶은데요", "한국어 수업을 알아보고 있는데요"처럼 먼저 상황을 제시하면 상대방이 "네, 말씀하세요", "무엇을 도와드릴까요?"라고 자연스럽게 이어서 반응할 수 있어요.\n\n또 "-는데요"는 반대 의견이나 예상과 다른 정보를 조심스럽게 말할 때도 사용할 수 있어요. "가격은 괜찮은데요. 위치가 조금 멀어요"처럼 뒤의 내용을 부드럽게 이어 줄 수 있어요.\n\n따라서 하나의 한국어 번역어만 외우기보다 "상대방이 이해해야 할 배경을 먼저 깔아 주고, 그다음 반응이나 본론을 기다린다"라고 이해하면 실제 회화에서 훨씬 잘 사용할 수 있어요.\n\n그리고 "있다/없다"는 형태를 따로 주의해야 해요. 상태를 나타내지만 실제 활용에서는 "있는 데요/없는 데요"가 아니라 이 문법에서는 "있는데요/없는데요"처럼 "-는데요"를 사용해요. "시간이 없는데요", "질문이 있는데요"가 자연스러운 형태예요.',
      uz: '"A-(으)ㄴ데요, V-는데요, N인데요" suhbatni birdan asosiy savoldan boshlamasdan, avval vaziyat yoki fonni yumshoq tarzda tushuntirish uchun ishlatiladi. Ayniqsa telefon orqali ma’lumot so‘rashda juda tabiiy.\n\nMasalan, darrov "수업 시간이 언제예요?" deb so‘rash o‘rniga "한국어 수업에 대해 문의할 게 있는데요" desangiz, nega qo‘ng‘iroq qilganingizni avval tushuntirasiz.\n\nFe’lga "-는데요": 찾다 → 찾는데요, 문의하다 → 문의하는데요. Sifat 받침 bilan tugasa "-은데요": 작다 → 작은데요. 받침 bo‘lmasa "-ㄴ데요": 크다 → 큰데요. ㄹ tushadi: 멀다 → 먼데요.\n\nOtga "인데요": 학생인데요, 외국인인데요.\n\nBu shakl gap oxirida kelib, suhbatdoshning javobini kutish hissini ham beradi. Masalan "지금 회의 중인데요" bevosita rad etmasdan hozir gaplashish qiyinligini bildirishi mumkin.\n\n있다/없다 esa odatda "있는데요/없는데요" shaklida ishlatiladi.',
      en: '"A-(으)ㄴ데요, V-는데요, N인데요" is extremely common in conversation when the speaker wants to provide some background before getting to the main point. It is particularly useful for inquiries over the phone or when speaking to someone unfamiliar.\n\nInstead of immediately asking "수업 시간이 언제예요?", you can begin with "한국어 수업에 대해 문의할 게 있는데요." This explains why you are calling and invites the other person to respond.\n\nVerbs take -는데요: 찾다 → 찾는데요, 문의하다 → 문의하는데요. Adjectives ending in a consonant generally take -은데요: 작다 → 작은데요. Vowel-ending adjectives take -ㄴ데요: 크다 → 큰데요. Final ㄹ drops: 멀다 → 먼데요.\n\nNouns take 인데요: 학생인데요, 외국인인데요.\n\nAt the end of a sentence, this construction can deliberately leave the thought somewhat open, allowing the listener to infer what comes next or prompting a response. "지금 회의 중인데요" can indirectly communicate that now is not a convenient time.\n\nIt is very common in expressions such as 문의할 게 있는데요, 광고를 봤는데요, 예약을 변경하고 싶은데요, and 수업을 알아보고 있는데요.\n\n있다 and 없다 are important special cases: in this conversational pattern they normally appear as 있는데요 and 없는데요.',
      ru: '"A-(으)ㄴ데요, V-는데요, N인데요" очень часто используется в разговоре, когда говорящий сначала хочет сообщить фон или ситуацию, а уже затем перейти к основному вопросу или просьбе.\n\nВместо прямого "수업 시간이 언제예요?" можно начать с "한국어 수업에 대해 문의할 게 있는데요". Так собеседнику сразу становится понятно, зачем вы звоните.\n\nС глаголами используется -는데요: 찾다 → 찾는데요, 문의하다 → 문의하는데요. После прилагательного с 받침 обычно -은데요: 작다 → 작은데요. После гласной — -ㄴ데요: 크다 → 큰데요. Конечный ㄹ выпадает: 멀다 → 먼데요.\n\nПосле существительного используется 인데요: 학생인데요, 외국인인데요.\n\nВ конце предложения форма может оставлять мысль открытой и ожидать реакции собеседника. Например, "지금 회의 중인데요" мягко намекает, что сейчас разговаривать неудобно.\n\nОсобенно полезны выражения 문의할 게 있는데요, 광고를 봤는데요, 예약을 변경하고 싶은데요.\n\n있다 и 없다 обычно употребляются как 있는데요 и 없는데요.',
    },

    conjugationRule: {
      ko: 'V + 는데요  ·  A 받침 O + 은데요  ·  A 받침 X + ㄴ데요  ·  A ㄹ 받침: ㄹ 탈락 + ㄴ데요  ·  N + 인데요  ·  있다/없다 → 있는데요/없는데요',
      uz: 'V + 는데요  ·  A 받침 bor + 은데요  ·  A 받침 yo‘q + ㄴ데요  ·  N + 인데요',
      en: 'V + 는데요  ·  A consonant + 은데요  ·  A vowel + ㄴ데요  ·  final ㄹ drops  ·  N + 인데요',
      ru: 'V + 는데요  ·  A после согласной + 은데요  ·  A после гласной + ㄴ데요  ·  N + 인데요',
    },

    conjugations: [
      // 동사
      { base: '가다', result: '가는데요' },
      { base: '찾다', result: '찾는데요' },
      { base: '알아보다', result: '알아보는데요' },
      { base: '문의하다', result: '문의하는데요' },
      { base: '살다', result: '사는데요' },

      // 형용사 받침 O
      { base: '작다', result: '작은데요' },
      { base: '좋다', result: '좋은데요' },
      { base: '많다', result: '많은데요' },

      // 형용사 받침 X
      { base: '크다', result: '큰데요' },
      { base: '비싸다', result: '비싼데요' },
      { base: '바쁘다', result: '바쁜데요' },

      // ㄹ
      { base: '길다', result: '긴데요' },
      { base: '멀다', result: '먼데요' },

      // 명사
      { base: '학생', result: '학생인데요' },
      { base: '외국인', result: '외국인인데요' },
      { base: '문의', result: '문의인데요' },

      // 있다/없다
      { base: '있다', result: '있는데요' },
      { base: '없다', result: '없는데요' },
    ],

    examples: [
      {
        ko: '한국어 수업에 대해 문의할 게 있는데요.',
        highlight: '문의할 게 있는데요',
        gloss: {
          ko: '한국어 수업에 대해 문의할 게 있는데요.',
          uz: 'Koreys tili darsi haqida so‘ramoqchi bo‘lgan narsam bor edi.',
          en: 'I have a question about the Korean class.',
          ru: 'Я хотел бы кое-что уточнить о курсах корейского языка.',
        },
      },
      {
        ko: '인터넷에서 이 광고를 봤는데요.',
        highlight: '봤는데요',
        gloss: {
          ko: '인터넷에서 이 광고를 봤는데요.',
          uz: 'Men bu e’lonni internetda ko‘rdim.',
          en: 'I saw this advertisement online.',
          ru: 'Я увидел это объявление в интернете.',
        },
      },
      {
        ko: '지금 방을 알아보고 있는데요.',
        highlight: '알아보고 있는데요',
        gloss: {
          ko: '지금 방을 알아보고 있는데요.',
          uz: 'Hozir xona qidiryapman.',
          en: 'I am currently looking for a room.',
          ru: 'Сейчас я ищу комнату.',
        },
      },
      {
        ko: '가격은 괜찮은데요. 위치가 조금 멀어요.',
        highlight: '괜찮은데요',
        gloss: {
          ko: '가격은 괜찮은데요. 위치가 조금 멀어요.',
          uz: 'Narxi yaxshi, lekin joylashuvi biroz uzoq.',
          en: 'The price is fine, but the location is a little far.',
          ru: 'Цена нормальная, но расположение немного далеко.',
        },
      },
      {
        ko: '저는 외국인 학생인데요. 등록하려면 어떤 서류가 필요해요?',
        highlight: '학생인데요',
        gloss: {
          ko: '저는 외국인 학생인데요. 등록하려면 어떤 서류가 필요해요?',
          uz: 'Men chet ellik talabaman. Ro‘yxatdan o‘tish uchun qanday hujjatlar kerak?',
          en: 'I am an international student. What documents do I need to register?',
          ru: 'Я иностранный студент. Какие документы нужны для регистрации?',
        },
      },
      {
        ko: '죄송하지만 지금 회의 중인데요.',
        highlight: '회의 중인데요',
        gloss: {
          ko: '죄송하지만 지금 회의 중인데요.',
          uz: 'Kechirasiz, hozir yig‘ilishdaman.',
          en: 'I am sorry, but I am in a meeting right now.',
          ru: 'Извините, но я сейчас на совещании.',
        },
      },
      {
        ko: '예약 날짜를 바꾸고 싶은데요.',
        highlight: '바꾸고 싶은데요',
        gloss: {
          ko: '예약 날짜를 바꾸고 싶은데요.',
          uz: 'Bron sanasini o‘zgartirmoqchi edim.',
          en: 'I would like to change the reservation date.',
          ru: 'Я хотел бы изменить дату бронирования.',
        },
      },
      {
        ko: '오늘 시간이 별로 없는데요. 내일 다시 전화해도 될까요?',
        highlight: '시간이 별로 없는데요',
        gloss: {
          ko: '오늘 시간이 별로 없는데요. 내일 다시 전화해도 될까요?',
          uz: 'Bugun vaqtim unchalik yo‘q. Ertaga yana qo‘ng‘iroq qilsam bo‘ladimi?',
          en: 'I do not have much time today. Can I call again tomorrow?',
          ru: 'Сегодня у меня мало времени. Можно я перезвоню завтра?',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '여보세요. 한국어 수업에 대해 문의할 게 있는데요.',
        highlight: '문의할 게 있는데요',
        gloss: {
          ko: '여보세요. 한국어 수업에 대해 문의할 게 있는데요.',
          uz: 'Allo. Koreys tili kursi haqida ma’lumot so‘ramoqchi edim.',
          en: 'Hello. I have a question about your Korean classes.',
          ru: 'Здравствуйте. Я хотел бы уточнить информацию о курсах корейского языка.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 말씀하세요.',
        highlight: '말씀하세요',
        gloss: {
          ko: '네, 말씀하세요.',
          uz: 'Ha, marhamat, gapiring.',
          en: 'Yes, go ahead.',
          ru: 'Да, слушаю вас.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '제가 초급 수업을 찾고 있는데요. 저녁 수업도 있어요?',
        highlight: '찾고 있는데요',
        gloss: {
          ko: '제가 초급 수업을 찾고 있는데요. 저녁 수업도 있어요?',
          uz: 'Boshlang‘ich kurs qidiryapman. Kechki darslar ham bormi?',
          en: 'I am looking for a beginner class. Do you also have evening classes?',
          ru: 'Я ищу курс начального уровня. У вас есть вечерние занятия?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네. 화요일하고 목요일 저녁 수업이 있는데요.',
        highlight: '있는데요',
        gloss: {
          ko: '네. 화요일하고 목요일 저녁 수업이 있는데요.',
          uz: 'Ha. Seshanba va payshanba kunlari kechki dars bor.',
          en: 'Yes. We have an evening class on Tuesdays and Thursdays.',
          ru: 'Да. Есть вечерние занятия по вторникам и четвергам.',
        },
      },
    ],

    similar: {
      pattern: 'A-(으)ㄴ데, V-는데, N인데',
      note: {
        ko: '앞에서 배운 "-는데"는 뒤 문장과 직접 연결하는 기능이 중심이었어요. "-는데요"는 회화에서 문장 끝에도 자주 사용되어 상황을 부드럽게 제시하고 상대방의 반응을 기다리는 느낌을 만들어요.',
        uz: '"-는데" gaplarni bog‘laydi, "-는데요" esa suhbatda gap oxirida kelib javob kutish hissini ham beradi.',
        en: '-는데 primarily connects clauses, while sentence-final -는데요 commonly presents background and invites the listener’s response.',
        ru: '-는데 прежде всего связывает части предложения, а конечное -는데요 часто сообщает фон и ожидает реакции собеседника.',
      },
    },

    cautions: [
      {
        ko: '동사와 형용사의 형태를 바꾸지 않도록 주의해요. "먹은데요"가 아니라 동사는 "먹는데요", 형용사 "좋다"는 "좋은데요"예요.',
        uz: 'Fe’l: 먹는데요, sifat: 좋은데요.',
        en: 'Do not confuse the verb and adjective forms: 먹는데요 but 좋은데요.',
        ru: 'Не путайте формы: глагол 먹는데요, но прилагательное 좋은데요.',
      },
      {
        ko: '명사에는 "인데요"를 사용해요. "학생는데요"가 아니라 "학생인데요"예요.',
        uz: 'Ot bilan "인데요": 학생인데요.',
        en: 'Nouns take 인데요: 학생인데요.',
        ru: 'После существительного используется 인데요: 학생인데요.',
      },
      {
        ko: '"있다/없다"는 "있는데요/없는은데요"처럼 만들지 않아요. "질문이 있는데요", "시간이 없는데요"라고 해요.',
        uz: '있다/없다 → 있는데요/없는데요.',
        en: 'Use 있는데요 and 없는데요 for 있다/없다.',
        ru: '있다/없다 употребляются как 있는데요/없는데요.',
      },
      {
        ko: '"-는데요"로 끝내면 뒤의 뜻이 문맥에 맡겨지는 경우가 있어요. 처음 보는 사람에게 사용할 때는 상대방이 무엇을 해야 하는지 전혀 알 수 없는 지나치게 애매한 문장이 되지 않도록 필요한 질문이나 부탁을 이어 주는 것이 좋아요.',
        uz: 'Gap juda noaniq bo‘lib qolmasligi uchun kerak bo‘lsa keyingi savol yoki iltimosni ayting.',
        en: 'Because sentence-final -는데요 can leave meaning implicit, continue with a clear question or request when necessary.',
        ru: 'Поскольку -는데요 может оставлять мысль недосказанной, при необходимости добавляйте ясный вопрос или просьбу.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '한국어 수업에 대해 문의할 게 있___요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 있다.',
          ru: 'Выберите правильную форму после 있다.',
        },
        options: [
          { text: '는데', correct: true },
          { text: '은데', correct: false },
          { text: 'ㄴ데', correct: false },
          { text: '인데', correct: false },
          { text: '을데', correct: false },
        ],
      },
      {
        question: {
          ko: '이 방은 조금 작___요.',
          uz: '작다 bilan to‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 작다.',
          ru: 'Выберите правильную форму после 작다.',
        },
        options: [
          { text: '은데', correct: true },
          { text: '는데', correct: false },
          { text: 'ㄴ데', correct: false },
          { text: '인데', correct: false },
          { text: '을데', correct: false },
        ],
      },
      {
        question: {
          ko: '가격이 조금 비싸___요.',
          uz: '비싸다 bilan to‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 비싸다.',
          ru: 'Выберите правильную форму после 비싸다.',
        },
        options: [
          { text: 'ㄴ데', correct: true },
          { text: '은데', correct: false },
          { text: '는데', correct: false },
          { text: '인데', correct: false },
          { text: '을데', correct: false },
        ],
      },
      {
        question: {
          ko: '저는 외국인 학생___요.',
          uz: 'Ot bilan to‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 학생.',
          ru: 'Выберите правильную форму после 학생.',
        },
        options: [
          { text: '인데', correct: true },
          { text: '는데', correct: false },
          { text: '은데', correct: false },
          { text: 'ㄴ데', correct: false },
          { text: '다가', correct: false },
        ],
      },
      {
        question: {
          ko: '전화 문의에서 "문의할 게 있는데요"라고 말하는 가장 중요한 이유는 무엇이에요?',
          uz: 'Eng mos javobni tanlang.',
          en: 'Why is 문의할 게 있는데요 useful in a phone inquiry?',
          ru: 'Почему выражение 문의할 게 있는데요 удобно при телефонном запросе?',
        },
        options: [
          {
            text: '문의할 상황을 부드럽게 제시하고 상대방의 반응을 기다리기 위해',
            correct: true,
          },
          { text: '과거 경험을 강조하기 위해', correct: false },
          { text: '두 대상을 비교하기 위해', correct: false },
          { text: '미래 행동을 확정하기 위해', correct: false },
          { text: '수량이 적음을 나타내기 위해', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 9-2.
  // V-는 중이다, N 중이다
  // ─────────────────────────────────────────────
  {
    code: 'vn-jungida',
    pattern: 'V-는 중이다, N 중이다',
    section: 3,
    unit: 9,
    order: 2,
    isActive: true,

    summary: {
      ko: '어떤 행동이나 일이 현재 진행되고 있는 도중임을 나타내요. 동사는 "V-는 중이다", 활동을 나타내는 명사는 "N 중이다"를 사용해요.',
      uz: 'Harakat yoki ish ayni paytda davom etayotganini bildiradi. Fe’l bilan "V-는 중이다", faoliyat bildiruvchi ot bilan "N 중이다" ishlatiladi.',
      en: 'Expresses that an action or activity is currently in progress. Use "V-는 중이다" with verbs and "N 중이다" with activity nouns.',
      ru: 'Показывает, что действие или деятельность сейчас находится в процессе. С глаголами используется "V-는 중이다", с существительными деятельности — "N 중이다".',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '진행',
        uz: 'Jarayon',
        en: 'In progress',
        ru: 'Процесс',
      },
      {
        ko: '현재',
        uz: 'Hozir',
        en: 'Present',
        ru: 'Настоящее',
      },
    ],

    explanation: {
      ko: '"V-는 중이다, N 중이다"는 어떤 행동이나 일이 지금 한창 진행되고 있음을 나타내는 표현이에요. 영어의 "be in the middle of doing"과 비슷해서 단순히 행동을 하고 있다는 것보다 "지금 바로 그 과정 중이다"라는 느낌이 조금 더 분명해요.\n\n동사에는 "V-는 중이다"를 사용해요. "공부하다 → 공부하는 중이다", "먹다 → 먹는 중이다", "찾다 → 찾는 중이다", "전화하다 → 전화하는 중이다"처럼 만들어요.\n\n예를 들어 "지금 한국어 수업을 알아보는 중이에요"라고 하면 한국어 수업을 찾는 활동이 아직 끝나지 않았고 현재 진행 중이라는 뜻이에요. "담당자가 확인하는 중이에요"는 담당자가 바로 지금 정보를 확인하고 있다는 뜻이에요.\n\nㄹ 받침 동사는 "-는" 앞에서 ㄹ이 탈락해요. "살다 → 사는 중이다", "만들다 → 만드는 중이다", "놀다 → 노는 중이다"처럼 활용해요.\n\n명사가 이미 어떤 활동 자체를 나타내면 명사 뒤에 바로 "중이다"를 사용할 수 있어요. "회의 중이다", "수업 중이다", "통화 중이다", "식사 중이다", "공사 중이다"처럼 말해요.\n\n그래서 전화할 때 "지금 통화 중입니다"라는 표현을 정말 자주 들을 수 있어요. 누군가에게 전화를 걸었는데 그 사람이 다른 사람과 전화하고 있다면 "통화 중"이라고 해요.\n\n"V-고 있다"와 의미가 비슷하지만 약간의 차이가 있어요. "공부하고 있어요"는 현재 공부한다는 일반적인 진행 상태를 말하고, "공부하는 중이에요"는 지금 공부라는 활동의 한가운데에 있다는 점을 조금 더 강조해요.\n\n따라서 상대방이 "지금 뭐 해요?"라고 물으면 둘 다 사용할 수 있지만, 어떤 일을 방해하기 어렵다는 사실을 설명하거나 현재 처리 단계라는 점을 강조할 때 "중이다"가 특히 자연스러워요. "지금 회의하는 중이라서 나중에 전화할게요", "현재 신청서를 확인하는 중입니다"처럼요.\n\n명사와 함께 사용할 때 모든 명사가 자연스러운 것은 아니에요. "책 중이에요"처럼 단순 사물 명사에는 사용할 수 없고, 회의·수업·식사·통화·공사처럼 진행 가능한 활동이나 과정 명사와 잘 어울려요.\n\n또 이미 끝난 행동에는 사용할 수 없어요. "어제 회의 중이에요"처럼 현재형과 과거 시간 표현을 무조건 섞으면 어색해요. 과거의 진행 상황을 말하려면 "어제 그 시간에는 회의 중이었어요"처럼 "중이었다"로 시제를 맞춰야 해요.',
      uz: '"V-는 중이다, N 중이다" biror harakat ayni paytda davom etayotganini ta’kidlaydi. Oddiy hozirgi davomiy harakatdan ko‘ra "hozir aynan jarayon ichida" degan ma’no kuchliroq.\n\nFe’l bilan "V-는 중이다": 공부하다 → 공부하는 중이다, 먹다 → 먹는 중이다, 확인하다 → 확인하는 중이다.\n\nㄹ bilan tugagan fe’l oldidan ㄹ tushadi: 살다 → 사는 중이다, 만들다 → 만드는 중이다.\n\nFaoliyat bildiruvchi ot bilan bevosita "N 중이다": 회의 중이다, 수업 중이다, 통화 중이다, 식사 중이다.\n\n"V-고 있다" bilan o‘xshash, lekin "V-는 중이다" harakatning ayni jarayoni davom etayotganini kuchliroq ta’kidlaydi.\n\nOddiy buyum otlari bilan ishlatilmaydi. Masalan "책 중이다" tabiiy emas.',
      en: '"V-는 중이다, N 중이다" emphasizes that an action or activity is currently underway. It is similar to "be in the middle of..." and often highlights the ongoing process more explicitly than a simple progressive form.\n\nWith verbs, use V-는 중이다: 공부하다 → 공부하는 중이다, 먹다 → 먹는 중이다, 확인하다 → 확인하는 중이다.\n\nFinal ㄹ drops before 는: 살다 → 사는 중이다, 만들다 → 만드는 중이다.\n\nIf a noun itself describes an activity, simply use N 중이다: 회의 중이다, 수업 중이다, 통화 중이다, 식사 중이다, 공사 중이다.\n\nThis is particularly common in phone situations. "통화 중입니다" means that someone is currently on another call.\n\nV-고 있다 is similar, but V-는 중이다 often more strongly emphasizes being right in the middle of the activity.\n\nN 중이다 does not naturally follow arbitrary object nouns. It works with activities and processes, not forms such as 책 중이다.',
      ru: '"V-는 중이다, N 중이다" подчёркивает, что действие или процесс происходит именно сейчас. По смыслу близко к «находиться в процессе...».\n\nС глаголами используется V-는 중이다: 공부하다 → 공부하는 중이다, 먹다 → 먹는 중이다.\n\nПеред 는 конечный ㄹ выпадает: 살다 → 사는 중이다, 만들다 → 만드는 중이다.\n\nЕсли существительное само обозначает деятельность, используется N 중이다: 회의 중이다, 수업 중이다, 통화 중이다, 식사 중이다.\n\nФорма "통화 중입니다" очень часто встречается по телефону и означает, что человек уже разговаривает с кем-то.\n\nV-고 있다 имеет похожее значение, но V-는 중이다 сильнее подчёркивает, что действие находится именно в процессе.\n\nНе любое существительное может сочетаться с 중이다. Обычно это существительное, обозначающее деятельность или процесс.',
    },

    conjugationRule: {
      ko: 'V + 는 중이다  ·  V ㄹ 받침: ㄹ 탈락 + 는 중이다  ·  활동·과정 명사 + 중이다',
      uz: 'V + 는 중이다  ·  ㄹ tushadi  ·  faoliyat oti + 중이다',
      en: 'V + 는 중이다  ·  final ㄹ drops before 는  ·  activity/process noun + 중이다',
      ru: 'V + 는 중이다  ·  конечный ㄹ выпадает  ·  существительное деятельности + 중이다',
    },

    conjugations: [
      // 동사
      { base: '먹다', result: '먹는 중이다' },
      { base: '읽다', result: '읽는 중이다' },
      { base: '찾다', result: '찾는 중이다' },
      { base: '가다', result: '가는 중이다' },
      { base: '알아보다', result: '알아보는 중이다' },
      { base: '확인하다', result: '확인하는 중이다' },
      { base: '전화하다', result: '전화하는 중이다' },

      // ㄹ 받침
      { base: '살다', result: '사는 중이다' },
      { base: '만들다', result: '만드는 중이다' },
      { base: '놀다', result: '노는 중이다' },

      // 명사
      { base: '회의', result: '회의 중이다' },
      { base: '수업', result: '수업 중이다' },
      { base: '통화', result: '통화 중이다' },
      { base: '식사', result: '식사 중이다' },
      { base: '공사', result: '공사 중이다' },
    ],

    examples: [
      {
        ko: '지금 한국어 수업을 알아보는 중이에요.',
        highlight: '알아보는 중이에요',
        gloss: {
          ko: '지금 한국어 수업을 알아보는 중이에요.',
          uz: 'Hozir koreys tili kurslarini izlayapman.',
          en: 'I am currently looking into Korean classes.',
          ru: 'Сейчас я подбираю курсы корейского языка.',
        },
      },
      {
        ko: '담당자가 신청 내용을 확인하는 중이에요.',
        highlight: '확인하는 중이에요',
        gloss: {
          ko: '담당자가 신청 내용을 확인하는 중이에요.',
          uz: 'Mas’ul xodim ariza ma’lumotlarini tekshiryapti.',
          en: 'The person in charge is checking the application.',
          ru: 'Ответственный сотрудник сейчас проверяет заявление.',
        },
      },
      {
        ko: '지금 회의 중이라서 나중에 전화할게요.',
        highlight: '회의 중',
        gloss: {
          ko: '지금 회의 중이라서 나중에 전화할게요.',
          uz: 'Hozir yig‘ilishdaman, keyinroq qo‘ng‘iroq qilaman.',
          en: 'I am in a meeting right now, so I will call you later.',
          ru: 'Я сейчас на совещании, поэтому перезвоню позже.',
        },
      },
      {
        ko: '죄송합니다. 지금 다른 고객과 통화 중입니다.',
        highlight: '통화 중입니다',
        gloss: {
          ko: '죄송합니다. 지금 다른 고객과 통화 중입니다.',
          uz: 'Kechirasiz, hozir boshqa mijoz bilan telefonda gaplashyapti.',
          en: 'I am sorry. They are currently on another call.',
          ru: 'Извините, сейчас он разговаривает с другим клиентом.',
        },
      },
      {
        ko: '학생들은 지금 시험을 보는 중이에요.',
        highlight: '시험을 보는 중이에요',
        gloss: {
          ko: '학생들은 지금 시험을 보는 중이에요.',
          uz: 'Talabalar hozir imtihon topshiryapti.',
          en: 'The students are taking an exam right now.',
          ru: 'Студенты сейчас пишут экзамен.',
        },
      },
      {
        ko: '새로운 홈페이지를 만드는 중이에요.',
        highlight: '만드는 중이에요',
        gloss: {
          ko: '새로운 홈페이지를 만드는 중이에요.',
          uz: 'Hozir yangi veb-sayt yaratyapmiz.',
          en: 'We are currently building a new website.',
          ru: 'Сейчас мы создаём новый сайт.',
        },
      },
      {
        ko: '죄송하지만 지금 식사 중이에요.',
        highlight: '식사 중이에요',
        gloss: {
          ko: '죄송하지만 지금 식사 중이에요.',
          uz: 'Kechirasiz, hozir ovqatlanyapman.',
          en: 'Sorry, I am eating right now.',
          ru: 'Извините, я сейчас ем.',
        },
      },
      {
        ko: '건물 앞 도로는 현재 공사 중이에요.',
        highlight: '공사 중이에요',
        gloss: {
          ko: '건물 앞 도로는 현재 공사 중이에요.',
          uz: 'Bino oldidagi yo‘l hozir ta’mirlanmoqda.',
          en: 'The road in front of the building is currently under construction.',
          ru: 'Дорога перед зданием сейчас ремонтируется.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '김 선생님과 통화할 수 있을까요?',
        highlight: '통화할 수 있을까요',
        gloss: {
          ko: '김 선생님과 통화할 수 있을까요?',
          uz: 'Kim ustoz bilan gaplashsam bo‘ladimi?',
          en: 'May I speak with Mr. Kim?',
          ru: 'Можно поговорить с господином Кимом?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '죄송하지만 지금 수업 중이세요.',
        highlight: '수업 중이세요',
        gloss: {
          ko: '죄송하지만 지금 수업 중이세요.',
          uz: 'Kechirasiz, hozir dars o‘tyaptilar.',
          en: 'I am sorry, but he is teaching a class right now.',
          ru: 'Извините, сейчас у него занятие.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '수업이 몇 시에 끝나요?',
        highlight: '몇 시에 끝나요',
        gloss: {
          ko: '수업이 몇 시에 끝나요?',
          uz: 'Dars soat nechada tugaydi?',
          en: 'What time does the class finish?',
          ru: 'Во сколько заканчивается занятие?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '지금 마지막 수업을 하는 중이라서 20분쯤 후에 끝날 거예요.',
        highlight: '하는 중이라서',
        gloss: {
          ko: '지금 마지막 수업을 하는 중이라서 20분쯤 후에 끝날 거예요.',
          uz: 'Hozir oxirgi darsni o‘tyaptilar, taxminan 20 daqiqadan keyin tugaydi.',
          en: 'He is in the middle of his last class, so it should finish in about 20 minutes.',
          ru: 'Сейчас идёт последнее занятие, поэтому оно закончится примерно через 20 минут.',
        },
      },
    ],

    similar: {
      pattern: 'V-고 있다',
      note: {
        ko: '"V-고 있다"도 현재 진행을 나타내지만, "V-는 중이다"는 행동이나 과정의 한가운데에 있다는 점을 더 강조해요. "지금 확인하고 있어요"와 "지금 확인하는 중이에요"는 비슷하지만 두 번째가 현재 처리 과정임을 더 분명하게 보여 줘요.',
        uz: 'Ikkalasi ham davomiy harakatni bildiradi, lekin "는 중이다" jarayonning ayni o‘rtasida ekanini kuchliroq ta’kidlaydi.',
        en: 'Both express an ongoing action, but 는 중이다 more strongly emphasizes being in the middle of the process.',
        ru: 'Обе формы выражают процесс, но 는 중이다 сильнее подчёркивает нахождение в самой середине действия.',
      },
    },

    cautions: [
      {
        ko: 'ㄹ 받침 동사에 "-는"을 그대로 붙이지 않아요. "살는 중이에요"가 아니라 "사는 중이에요", "만들는 중이에요"가 아니라 "만드는 중이에요"예요.',
        uz: 'ㄹ tushadi: 사는 중이에요, 만드는 중이에요.',
        en: 'Final ㄹ drops before 는: 사는 중이에요, 만드는 중이에요.',
        ru: 'Конечный ㄹ выпадает перед 는: 사는 중이에요, 만드는 중이에요.',
      },
      {
        ko: '모든 명사 뒤에 "중이다"를 붙일 수 있는 것은 아니에요. "책 중이에요"처럼 단순한 사물 명사는 자연스럽지 않아요.',
        uz: 'Oddiy buyum otlari bilan 중이다 tabiiy emas.',
        en: 'Do not attach 중이다 to arbitrary object nouns such as 책.',
        ru: '중이다 не сочетается с любыми предметными существительными.',
      },
      {
        ko: '과거 상황이면 시제도 맞춰야 해요. "어제 그 시간에는 회의 중이에요"가 아니라 "회의 중이었어요"라고 해야 해요.',
        uz: 'O‘tgan vaqt uchun 중이었어요.',
        en: 'For a past situation, use 중이었어요.',
        ru: 'Для прошлого используется 중이었어요.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '담당자가 신청서를 확인___ 중이에요.',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form.',
          ru: 'Выберите правильную форму.',
        },
        options: [
          { text: '하는', correct: true },
          { text: '한', correct: false },
          { text: '할', correct: false },
          { text: '하고', correct: false },
          { text: '해서', correct: false },
        ],
      },
      {
        question: {
          ko: '지금 다른 사람과 ___ 중입니다.',
          uz: 'Telefon orqali gaplashayotgan holatni tanlang.',
          en: 'Choose the noun meaning "currently on a call."',
          ru: 'Выберите форму «сейчас разговаривает по телефону».',
        },
        options: [
          { text: '통화', correct: true },
          { text: '전화기', correct: false },
          { text: '번호', correct: false },
          { text: '정보', correct: false },
          { text: '주소', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다 + -는 중이다"의 올바른 형태는 무엇이에요?',
          uz: 'To‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form of 살다 + 는 중이다.',
          ru: 'Выберите правильную форму 살다 + 는 중이다.',
        },
        options: [
          { text: '사는 중이다', correct: true },
          { text: '살는 중이다', correct: false },
          { text: '살은 중이다', correct: false },
          { text: '산 중이다', correct: false },
          { text: '살을 중이다', correct: false },
        ],
      },
      {
        question: {
          ko: '자연스러운 표현을 고르세요.',
          uz: 'Tabiiy ifodani tanlang.',
          en: 'Choose the natural expression.',
          ru: 'Выберите естественное выражение.',
        },
        options: [
          { text: '회의 중이에요', correct: true },
          { text: '책 중이에요', correct: false },
          { text: '의자 중이에요', correct: false },
          { text: '가방 중이에요', correct: false },
          { text: '창문 중이에요', correct: false },
        ],
      },
      {
        question: {
          ko: '"V-는 중이다"의 핵심 의미는 무엇이에요?',
          uz: 'Eng mos ma’noni tanlang.',
          en: 'Choose the main meaning of V-는 중이다.',
          ru: 'Выберите основное значение V-는 중이다.',
        },
        options: [
          { text: '그 행동이 현재 진행되는 과정에 있다', correct: true },
          { text: '그 행동을 과거에 한 경험이 있다', correct: false },
          { text: '그 행동을 미래에 꼭 할 것이다', correct: false },
          { text: '그 행동을 하면 안 된다', correct: false },
          { text: '두 행동을 비교한다', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 9-3.
  // A-(으)ㄴ가요?, V-나요?, N인가요?
  // ─────────────────────────────────────────────
  {
    code: 'avn-gayo-nayo-ingayo',
    pattern: 'A-(으)ㄴ가요?, V-나요?, N인가요?',
    section: 3,
    unit: 9,
    order: 3,
    isActive: true,

    summary: {
      ko: '상대방에게 정보나 상황을 비교적 부드럽고 정중하게 물을 때 사용하는 의문형이에요. 전화·안내·문의 상황에서 자주 사용해요.',
      uz: 'Suhbatdoshdan ma’lumot yoki vaziyatni yumshoq va odobli tarzda so‘rashda ishlatiladigan savol shakli. Telefon va ma’lumot so‘rash vaziyatlarida juda ko‘p ishlatiladi.',
      en: 'A relatively gentle and polite question form used to ask for information or clarification. It is common in phone calls, information desks, and inquiries.',
      ru: 'Мягкая и вежливая вопросительная форма для запроса информации или уточнения. Часто используется по телефону и при обращении за информацией.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '질문',
        uz: 'Savol',
        en: 'Question',
        ru: 'Вопрос',
      },
      {
        ko: '문의',
        uz: 'So‘rov',
        en: 'Inquiry',
        ru: 'Запрос',
      },
    ],

    explanation: {
      ko: '"A-(으)ㄴ가요?, V-나요?, N인가요?"는 상대방에게 정보를 확인하거나 궁금한 것을 물을 때 사용하는 부드러운 의문 표현이에요. 일반적인 "-아/어요?" 질문도 충분히 정중하지만, "-나요?/-(으)ㄴ가요?/인가요?"는 상대방에게 정보를 문의하거나 확인하는 느낌이 조금 더 분명하게 나타날 수 있어요.\n\n동사는 "V-나요?"를 사용해요. "가다 → 가나요?", "먹다 → 먹나요?", "시작하다 → 시작하나요?", "끝나다 → 끝나나요?"처럼 활용해요.\n\nㄹ 받침 동사는 "-나요?" 앞에서 ㄹ이 탈락해요. "살다 → 사나요?", "만들다 → 만드나요?", "열다 → 여나요?"처럼 만들어요.\n\n형용사는 받침이 있으면 "-은가요?"를 사용해요. "작다 → 작은가요?", "좋다 → 좋은가요?", "많다 → 많은가요?"가 돼요.\n\n받침이 없는 형용사에는 "-ㄴ가요?"를 붙여요. "크다 → 큰가요?", "비싸다 → 비싼가요?", "바쁘다 → 바쁜가요?"처럼 사용해요.\n\nㄹ 받침 형용사는 ㄹ이 탈락하고 ㄴ이 붙어요. "길다 → 긴가요?", "멀다 → 먼가요?"처럼 활용해요.\n\n명사에는 "인가요?"를 붙여요. 받침 여부와 관계없이 "학생인가요?", "의사인가요?", "월요일인가요?", "이 번호가 상담 전화번호인가요?"처럼 사용할 수 있어요.\n\n전화로 정보를 문의할 때 아주 자연스러워요. "수업은 몇 시에 시작하나요?", "주말에도 문을 여나요?", "등록비가 얼마인가요?", "지금 신청이 가능한가요?"처럼 사용할 수 있어요.\n\n하지만 문법 형태만 보고 모든 단어를 기계적으로 구분하면 안 되는 예외가 있어요. "있다/없다"는 실제 회화에서 "있나요?/없나요?"가 아주 자연스러워요. "자리가 있나요?", "다른 시간이 없나요?"처럼 사용하는 것이 일반적이에요.\n\n또 "-나요?"는 단순히 높임 정도만 높이는 문법은 아니에요. 말투 자체는 해요체라서 기본적으로 공손하지만, 문의·확인하는 느낌이 있고 상대방의 설명을 기대하는 질문에 특히 잘 어울려요.\n\n예를 들어 직원에게 "수업이 몇 시에 시작해요?"도 맞지만, "수업이 몇 시에 시작하나요?"라고 하면 안내 정보나 공식적인 정보를 문의하는 상황에 조금 더 잘 어울릴 수 있어요.\n\n그리고 억양도 중요해요. 질문이기 때문에 자연스럽게 의문 억양을 사용하고, 지나치게 딱딱하게 읽지 않는 것이 좋아요.',
      uz: '"A-(으)ㄴ가요?, V-나요?, N인가요?" ma’lumot yoki tushuntirishni yumshoq va odobli tarzda so‘rash uchun ishlatiladi.\n\nFe’lga "나요?": 가다 → 가나요?, 시작하다 → 시작하나요?. ㄹ bilan tugagan fe’lda ㄹ tushadi: 살다 → 사나요?, 열다 → 여나요?.\n\nSifat 받침 bilan tugasa "-은가요?": 작다 → 작은가요?, 좋다 → 좋은가요?. 받침 bo‘lmasa "-ㄴ가요?": 크다 → 큰가요?, 비싸다 → 비싼가요?. ㄹ tushadi: 멀다 → 먼가요?.\n\nOtga "인가요?": 학생인가요?, 의사인가요?.\n\nTelefon yoki ma’lumot markazida juda tabiiy: "몇 시에 시작하나요?", "등록비가 얼마인가요?"\n\n있다/없다 esa odatda "있나요?/없나요?" shaklida ishlatiladi.',
      en: '"A-(으)ㄴ가요?, V-나요?, N인가요?" is a gentle polite question form often used when requesting information or confirmation.\n\nVerbs take -나요?: 가다 → 가나요?, 시작하다 → 시작하나요?. Final ㄹ drops before 나: 살다 → 사나요?, 열다 → 여나요?.\n\nConsonant-ending adjectives take -은가요?: 작다 → 작은가요?, 좋다 → 좋은가요?. Vowel-ending adjectives take -ㄴ가요?: 크다 → 큰가요?, 비싸다 → 비싼가요?. Final ㄹ drops: 멀다 → 먼가요?.\n\nNouns take 인가요?: 학생인가요?, 의사인가요?.\n\nIt is particularly natural in information-seeking situations: 수업은 몇 시에 시작하나요?, 등록비가 얼마인가요?, 주말에도 문을 여나요?\n\n있다 and 없다 commonly appear as 있나요? and 없나요? in actual conversation.\n\nThe form is not simply a mechanically "more polite" version of -아요/어요?. It often carries a clear tone of inquiry and expectation that the listener can provide information.',
      ru: '"A-(으)ㄴ가요?, V-나요?, N인가요?" — мягкая вежливая вопросительная форма, часто используемая для запроса или уточнения информации.\n\nС глаголами используется -나요?: 가다 → 가나요?, 시작하다 → 시작하나요?. Перед 나 конечный ㄹ выпадает: 살다 → 사나요?, 열다 → 여나요?.\n\nПосле прилагательного с конечным согласным используется -은가요?: 작다 → 작은가요?. После гласной — -ㄴ가요?: 크다 → 큰가요?. Конечный ㄹ выпадает: 멀다 → 먼가요?.\n\nПосле существительного используется 인가요?: 학생인가요?, 의사인가요?.\n\nФорма особенно естественна при запросе информации: 수업은 몇 시에 시작하나요?, 등록비가 얼마인가요?\n\n있다 и 없다 обычно употребляются как 있나요? и 없나요?.',
    },

    conjugationRule: {
      ko: 'V + 나요?  ·  V ㄹ 받침: ㄹ 탈락 + 나요?  ·  A 받침 O + 은가요?  ·  A 받침 X + ㄴ가요?  ·  A ㄹ 받침: ㄹ 탈락 + ㄴ가요?  ·  N + 인가요?',
      uz: 'V + 나요?  ·  A 받침 bor + 은가요?  ·  A 받침 yo‘q + ㄴ가요?  ·  N + 인가요?',
      en: 'V + 나요?  ·  final ㄹ drops  ·  A consonant + 은가요?  ·  A vowel + ㄴ가요?  ·  N + 인가요?',
      ru: 'V + 나요?  ·  ㄹ выпадает  ·  A после согласной + 은가요?  ·  A после гласной + ㄴ가요?  ·  N + 인가요?',
    },

    conjugations: [
      // 동사
      { base: '가다', result: '가나요?' },
      { base: '먹다', result: '먹나요?' },
      { base: '시작하다', result: '시작하나요?' },
      { base: '끝나다', result: '끝나나요?' },
      { base: '신청하다', result: '신청하나요?' },

      // ㄹ 동사
      { base: '살다', result: '사나요?' },
      { base: '만들다', result: '만드나요?' },
      { base: '열다', result: '여나요?' },

      // 형용사 받침 O
      { base: '작다', result: '작은가요?' },
      { base: '좋다', result: '좋은가요?' },
      { base: '많다', result: '많은가요?' },

      // 형용사 받침 X
      { base: '크다', result: '큰가요?' },
      { base: '비싸다', result: '비싼가요?' },
      { base: '바쁘다', result: '바쁜가요?' },

      // ㄹ 형용사
      { base: '길다', result: '긴가요?' },
      { base: '멀다', result: '먼가요?' },

      // 명사
      { base: '학생', result: '학생인가요?' },
      { base: '의사', result: '의사인가요?' },
      { base: '월요일', result: '월요일인가요?' },
      { base: '상담 번호', result: '상담 번호인가요?' },
    ],

    examples: [
      {
        ko: '한국어 수업은 몇 시에 시작하나요?',
        highlight: '시작하나요',
        gloss: {
          ko: '한국어 수업은 몇 시에 시작하나요?',
          uz: 'Koreys tili darsi soat nechada boshlanadi?',
          en: 'What time does the Korean class start?',
          ru: 'Во сколько начинается занятие по корейскому языку?',
        },
      },
      {
        ko: '주말에도 사무실을 여나요?',
        highlight: '여나요',
        gloss: {
          ko: '주말에도 사무실을 여나요?',
          uz: 'Dam olish kunlari ham ofis ochiqmi?',
          en: 'Is the office also open on weekends?',
          ru: 'Офис открыт и по выходным?',
        },
      },
      {
        ko: '수업료가 많이 비싼가요?',
        highlight: '비싼가요',
        gloss: {
          ko: '수업료가 많이 비싼가요?',
          uz: 'Kurs narxi juda qimmatmi?',
          en: 'Is the tuition very expensive?',
          ru: 'Обучение очень дорогое?',
        },
      },
      {
        ko: '학교에서 지하철역까지 먼가요?',
        highlight: '먼가요',
        gloss: {
          ko: '학교에서 지하철역까지 먼가요?',
          uz: 'Maktabdan metro bekatigacha uzoqmi?',
          en: 'Is the subway station far from the school?',
          ru: 'Метро далеко от школы?',
        },
      },
      {
        ko: '등록 마감일이 이번 주 금요일인가요?',
        highlight: '금요일인가요',
        gloss: {
          ko: '등록 마감일이 이번 주 금요일인가요?',
          uz: 'Ro‘yxatdan o‘tishning oxirgi kuni shu juma kunimi?',
          en: 'Is the registration deadline this Friday?',
          ru: 'Крайний срок регистрации — эта пятница?',
        },
      },
      {
        ko: '지금도 신청할 수 있나요?',
        highlight: '있나요',
        gloss: {
          ko: '지금도 신청할 수 있나요?',
          uz: 'Hozir ham ariza topshirish mumkinmi?',
          en: 'Can I still apply now?',
          ru: 'Можно ещё подать заявку сейчас?',
        },
      },
      {
        ko: '초급반에는 학생이 많은가요?',
        highlight: '많은가요',
        gloss: {
          ko: '초급반에는 학생이 많은가요?',
          uz: 'Boshlang‘ich guruhda talabalar ko‘pmi?',
          en: 'Are there many students in the beginner class?',
          ru: 'В начальной группе много студентов?',
        },
      },
      {
        ko: '이 번호가 외국인 상담 전화번호인가요?',
        highlight: '전화번호인가요',
        gloss: {
          ko: '이 번호가 외국인 상담 전화번호인가요?',
          uz: 'Bu raqam chet elliklar uchun maslahat telefon raqamimi?',
          en: 'Is this the consultation number for foreigners?',
          ru: 'Это номер консультационной службы для иностранцев?',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '안녕하세요. 한국어 수업에 대해 몇 가지 문의하려고 하는데요.',
        highlight: '문의하려고 하는데요',
        gloss: {
          ko: '안녕하세요. 한국어 수업에 대해 몇 가지 문의하려고 하는데요.',
          uz: 'Salom. Koreys tili kursi haqida bir necha narsani so‘ramoqchi edim.',
          en: 'Hello. I would like to ask a few questions about the Korean course.',
          ru: 'Здравствуйте. Я хотел бы задать несколько вопросов о курсах корейского.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 어떤 것이 궁금하세요?',
        highlight: '궁금하세요',
        gloss: {
          ko: '네, 어떤 것이 궁금하세요?',
          uz: 'Ha, nimani bilmoqchisiz?',
          en: 'Sure. What would you like to know?',
          ru: 'Да, что вас интересует?',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '초급반 수업은 일주일에 몇 번 하나요?',
        highlight: '몇 번 하나요',
        gloss: {
          ko: '초급반 수업은 일주일에 몇 번 하나요?',
          uz: 'Boshlang‘ich dars haftasiga necha marta bo‘ladi?',
          en: 'How many times a week does the beginner class meet?',
          ru: 'Сколько раз в неделю проходит начальный курс?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '일주일에 세 번 수업합니다.',
        highlight: '세 번 수업합니다',
        gloss: {
          ko: '일주일에 세 번 수업합니다.',
          uz: 'Haftasiga uch marta dars bo‘ladi.',
          en: 'Classes are held three times a week.',
          ru: 'Занятия проходят три раза в неделю.',
        },
      },
    ],

    similar: {
      pattern: 'A/V-아/어요?',
      note: {
        ko: '둘 다 정중한 질문이에요. "-아/어요?"는 일상적인 질문에 아주 폭넓게 사용하고, "-나요?/-(으)ㄴ가요?/인가요?"는 상대방에게 정보나 설명을 문의·확인하는 느낌이 조금 더 잘 드러나는 경우가 많아요.',
        uz: 'Ikkalasi ham odobli savol, lekin -나요? turi ma’lumotni so‘rash yoki tasdiqlash ohangini kuchliroq beradi.',
        en: 'Both are polite. -아요/어요? is broadly conversational, while the -나요? family often carries a clearer information-seeking or confirming tone.',
        ru: 'Обе формы вежливы, но формы на -나요? часто сильнее передают оттенок запроса или уточнения информации.',
      },
    },

    cautions: [
      {
        ko: '동사에 "-은가요?"를 쓰지 않아요. "먹은가요?"가 아니라 현재 행동이나 일반 사실을 물으면 "먹나요?"예요.',
        uz: 'Fe’l bilan -나요?: 먹나요?',
        en: 'Verbs use -나요?, not -은가요?: 먹나요?',
        ru: 'С глаголом используется -나요?: 먹나요?',
      },
      {
        ko: '형용사는 동사형 "-나요?"와 구별해서 익혀요. 기본 규칙에서는 "비싸나요?"보다 "비싼가요?"를 사용해요.',
        uz: 'Sifat uchun -(으)ㄴ가요?: 비싼가요?',
        en: 'For the target grammar, adjectives use -(으)ㄴ가요?: 비싼가요?',
        ru: 'В изучаемой модели прилагательные используют -(으)ㄴ가요?: 비싼가요?',
      },
      {
        ko: '명사에는 "인가요?"를 사용해요. "학생나요?"가 아니라 "학생인가요?"예요.',
        uz: 'Ot bilan 인가요?: 학생인가요?',
        en: 'Nouns take 인가요?: 학생인가요?',
        ru: 'После существительного используется 인가요?: 학생인가요?',
      },
      {
        ko: 'ㄹ 받침 동사는 ㄹ이 탈락해요. "열나요?"가 아니라 "여나요?", "살나요?"가 아니라 "사나요?"예요.',
        uz: 'ㄹ tushadi: 열다 → 여나요?, 살다 → 사나요?',
        en: 'Final ㄹ drops: 열다 → 여나요?, 살다 → 사나요?',
        ru: 'Конечный ㄹ выпадает: 열다 → 여나요?, 살다 → 사나요?',
      },
    ],

    quiz: [
      {
        question: {
          ko: '한국어 수업은 몇 시에 시작___?',
          uz: 'Fe’lning to‘g‘ri savol shaklini tanlang.',
          en: 'Choose the correct question form after 시작하다.',
          ru: 'Выберите правильную вопросительную форму после 시작하다.',
        },
        options: [
          { text: '하나요', correct: true },
          { text: '한가요', correct: false },
          { text: '하는가요', correct: false },
          { text: '할가요', correct: false },
          { text: '인가요', correct: false },
        ],
      },
      {
        question: {
          ko: '수업료가 많이 비싸___?',
          uz: 'Sifatning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct adjective question form.',
          ru: 'Выберите правильную форму вопроса с прилагательным.',
        },
        options: [
          { text: 'ㄴ가요', correct: true },
          { text: '은가요', correct: false },
          { text: '나요', correct: false },
          { text: '인가요', correct: false },
          { text: '는가요', correct: false },
        ],
      },
      {
        question: {
          ko: '학생이 많___?',
          uz: '많다 bilan to‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form after 많다.',
          ru: 'Выберите правильную форму после 많다.',
        },
        options: [
          { text: '은가요', correct: true },
          { text: 'ㄴ가요', correct: false },
          { text: '나요', correct: false },
          { text: '인가요', correct: false },
          { text: '는가요', correct: false },
        ],
      },
      {
        question: {
          ko: '등록 마감일이 금요일___?',
          uz: 'Ot bilan to‘g‘ri shaklni tanlang.',
          en: 'Choose the correct question form after the noun 금요일.',
          ru: 'Выберите правильную форму после существительного 금요일.',
        },
        options: [
          { text: '인가요', correct: true },
          { text: '나요', correct: false },
          { text: '은가요', correct: false },
          { text: 'ㄴ가요', correct: false },
          { text: '는가요', correct: false },
        ],
      },
      {
        question: {
          ko: '"열다"를 "-나요?"와 바르게 연결하세요.',
          uz: '"열다" ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct -나요? form of 열다.',
          ru: 'Выберите правильную форму 열다.',
        },
        options: [
          { text: '여나요?', correct: true },
          { text: '열나요?', correct: false },
          { text: '열은가요?', correct: false },
          { text: '열인가요?', correct: false },
          { text: '열을까요?', correct: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 섹션 3 · 유닛 9-4. N밖에
  // ─────────────────────────────────────────────
  {
    code: 'noun-bakke',
    pattern: 'N밖에',
    section: 3,
    unit: 9,
    order: 4,
    isActive: true,

    summary: {
      ko: '어떤 수량이나 대상이 예상보다 적거나 제한적이라는 것을 강조할 때 사용해요. 보통 뒤에 "없다", "안", "못", "모르다" 같은 부정 표현이 와서 "~밖에 없다", "~밖에 안 한다"의 형태가 돼요.',
      uz: 'Miqdor yoki tanlov kutilganidan kam yoki cheklanganini ta’kidlashda ishlatiladi. Odatda keyin 없다, 안, 못, 모르다 kabi inkor shakli keladi.',
      en: 'Emphasizes that the amount, number, or available choice is limited, often meaning "only" or "nothing but." It normally appears with a negative expression such as 없다, 안, 못, or 모르다.',
      ru: 'Подчёркивает ограниченность количества или выбора и часто соответствует «только». Обычно употребляется с отрицательной формой: 없다, 안, 못, 모르다 и т. п.',
    },

    tags: [
      {
        ko: '초중급',
        uz: 'Boshlang‘ich-o‘rta',
        en: 'Pre-intermediate',
        ru: 'Ниже среднего',
      },
      {
        ko: '제한',
        uz: 'Cheklov',
        en: 'Limitation',
        ru: 'Ограничение',
      },
      {
        ko: '수량',
        uz: 'Miqdor',
        en: 'Quantity',
        ru: 'Количество',
      },
    ],

    explanation: {
      ko: '"N밖에"는 어떤 대상이나 수량이 그것뿐이고 다른 것은 없다는 것을 강조할 때 사용하는 조사예요. 한국어로 자연스럽게 풀면 "오직 N만", "N 이외에는 없다"라는 뜻이에요.\n\n가장 중요한 특징은 뒤에 보통 부정 표현이 온다는 거예요. "돈이 만 원밖에 없어요"라고 하면 가진 돈이 만 원뿐이고 그 이상은 없다는 뜻이에요. "학생이 세 명밖에 안 왔어요"는 예상보다 적게 세 명만 왔다는 느낌이에요.\n\n그래서 "밖에" 자체는 한국어의 "only"와 비슷한 의미를 만들지만, 문장 전체 형태는 부정형을 사용해요. "커피밖에 안 마셔요", "한국어밖에 못 해요", "그 사람 이름밖에 몰라요"처럼 사용해요.\n\n수량 표현과 특히 자주 사용해요. "한 시간밖에 없어요", "두 개밖에 안 남았어요", "세 번밖에 못 갔어요", "천 원밖에 없어요"처럼 수가 적거나 시간이 부족하다는 느낌을 강하게 전달할 수 있어요.\n\n문의 상황에서도 아주 유용해요. 직원이 "남은 자리가 두 자리밖에 없어요"라고 하면 신청 가능한 자리가 두 개뿐이라는 뜻이에요. "오늘은 오후 시간밖에 안 돼요"라고 하면 가능한 시간이 오후뿐이라는 뜻이고요.\n\n"만"과 의미가 비슷하지만 느낌과 문장 구조가 달라요. "학생이 세 명만 왔어요"는 세 명만 왔다는 사실을 말할 수 있고, "학생이 세 명밖에 안 왔어요"는 세 명밖에 오지 않았다는 제한이나 예상보다 적다는 느낌이 더 강해요.\n\n예를 들어 "물만 마셔요"는 다른 음료 대신 물을 선택해서 마신다는 뜻이 될 수 있어요. "물밖에 안 마셔요"는 물 이외의 다른 것은 전혀 마시지 않는다는 제한이 더 강하게 느껴져요.\n\n뒤의 부정 표현을 빠뜨리지 않도록 특히 주의해야 해요. 초급 학습자가 "돈이 만 원밖에 있어요"라고 말하는 실수를 많이 하는데, 이 문법의 기본 구조에서는 "돈이 만 원밖에 없어요"라고 해야 해요.\n\n또 "밖에"에는 완전히 다른 뜻도 있어요. "밖에 사람이 있어요"에서 "밖"은 "outside"라는 명사이고 "에"는 장소 조사예요. 이 문장은 "밖에"라는 제한 조사와 전혀 다른 구조예요.\n\n따라서 "교실 밖에 사람이 있어요"는 교실 바깥에 사람이 있다는 뜻이고, "교실에 학생이 한 명밖에 없어요"는 교실에 학생이 한 명뿐이라는 뜻이에요. 두 표현을 문맥으로 구별해야 해요.\n\n이번 과처럼 전화나 정보 문의에서는 시간, 비용, 남은 자리, 가능한 선택지를 제한해서 말할 때 많이 사용할 수 있어요. "오늘은 한 자리밖에 안 남았어요", "접수 기간이 이틀밖에 안 남았어요", "현금이 오천 원밖에 없어요"처럼요.',
      uz: '"N밖에" biror narsa yoki miqdor faqat shuncha ekanini va boshqasi yo‘qligini kuchli ta’kidlaydi.\n\nEng muhim qoida — odatda keyin inkor shakli keladi. "돈이 만 원밖에 없어요" — faqat 10 000 vonim bor. "학생이 세 명밖에 안 왔어요" — atigi uch talaba keldi.\n\nKo‘p ishlatiladigan shakllar: N밖에 없다, N밖에 안 V, N밖에 못 V, N밖에 모르다.\n\nMiqdor bilan ayniqsa ko‘p keladi: 한 시간밖에 없어요, 두 개밖에 안 남았어요, 세 번밖에 못 갔어요.\n\n"만" bilan o‘xshash, lekin 밖에 cheklanganlik yoki kutilganidan kamlikni kuchliroq his qildiradi.\n\nShuningdek, "밖에 사람이 있어요" dagi 밖에 "tashqarida" degan boshqa tuzilma ekanini ajrating.',
      en: '"N밖에" emphasizes that only that noun or quantity is available and nothing beyond it exists. A useful interpretation is "nothing but N" or "only N."\n\nThe most important grammatical feature is that it normally appears with a negative predicate. "돈이 만 원밖에 없어요" means that the speaker has only 10,000 won. "학생이 세 명밖에 안 왔어요" means that only three students came, often implying that this is fewer than expected.\n\nCommon structures include N밖에 없다, N밖에 안 V, N밖에 못 V, and N밖에 모르다.\n\nIt is especially common with quantities: 한 시간밖에 없어요, 두 개밖에 안 남았어요, 세 번밖에 못 갔어요.\n\nIt overlaps with 만, but 밖에 often emphasizes limitation or insufficiency more strongly. 물만 마셔요 can simply mean "I drink only water," while 물밖에 안 마셔요 more strongly excludes every other drink.\n\nDo not forget the negative predicate. 돈이 만 원밖에 있어요 is not the target pattern; use 만 원밖에 없어요.\n\nAlso distinguish this particle from 밖에 meaning "outside + location particle." In 밖에 사람이 있어요, 밖 means "outside."',
      ru: '"N밖에" подчёркивает, что имеется только указанное количество или вариант и ничего больше. По смыслу близко к «только», «ничего кроме».\n\nГлавная особенность — после 밖에 обычно используется отрицательная форма. "돈이 만 원밖에 없어요" означает «У меня всего 10 000 вон». "학생이 세 명밖에 안 왔어요" — «Пришло всего три студента».\n\nЧастые конструкции: N밖에 없다, N밖에 안 V, N밖에 못 V, N밖에 모르다.\n\nОсобенно часто используется с количеством: 한 시간밖에 없어요, 두 개밖에 안 남았어요, 세 번밖에 못 갔어요.\n\nПо смыслу похоже на 만, но 밖에 сильнее подчёркивает ограниченность или недостаточность.\n\nНельзя забывать отрицательную форму. Для изучаемой модели правильно "만 원밖에 없어요", а не "만 원밖에 있어요".\n\nТакже нужно отличать эту частицу от 밖에 со значением места: "밖에 사람이 있어요" означает «На улице/снаружи есть человек».',
    },

    conjugationRule: {
      ko: 'N + 밖에 + 부정 표현  ·  N밖에 없다 / N밖에 안 V / N밖에 못 V / N밖에 모르다',
      uz: 'N + 밖에 + inkor  ·  없다 / 안 / 못 / 모르다',
      en: 'N + 밖에 + negative predicate  ·  없다 / 안 / 못 / 모르다',
      ru: 'N + 밖에 + отрицательная форма  ·  없다 / 안 / 못 / 모르다',
    },

    conjugations: [
      { base: '한 명', result: '한 명밖에 없다' },
      { base: '두 명', result: '두 명밖에 없다' },
      { base: '한 시간', result: '한 시간밖에 없다' },
      { base: '이틀', result: '이틀밖에 안 남다' },
      { base: '만 원', result: '만 원밖에 없다' },

      { base: '물', result: '물밖에 안 마시다' },
      { base: '한국어', result: '한국어밖에 못 하다' },
      { base: '이 방법', result: '이 방법밖에 없다' },
      { base: '오후', result: '오후밖에 시간이 안 되다' },
      { base: '그 사람 이름', result: '그 사람 이름밖에 모르다' },
    ],

    examples: [
      {
        ko: '지금 남은 자리가 두 자리밖에 없어요.',
        highlight: '두 자리밖에 없어요',
        gloss: {
          ko: '지금 남은 자리가 두 자리밖에 없어요.',
          uz: 'Hozir faqat ikkita joy qoldi.',
          en: 'There are only two spots left.',
          ru: 'Сейчас осталось только два места.',
        },
      },
      {
        ko: '등록 기간이 이틀밖에 안 남았어요.',
        highlight: '이틀밖에 안 남았어요',
        gloss: {
          ko: '등록 기간이 이틀밖에 안 남았어요.',
          uz: 'Ro‘yxatdan o‘tishga atigi ikki kun qoldi.',
          en: 'There are only two days left in the registration period.',
          ru: 'До конца регистрации осталось всего два дня.',
        },
      },
      {
        ko: '지금 현금이 오천 원밖에 없어요.',
        highlight: '오천 원밖에 없어요',
        gloss: {
          ko: '지금 현금이 오천 원밖에 없어요.',
          uz: 'Hozir yonimda faqat 5 000 von naqd pul bor.',
          en: 'I only have 5,000 won in cash right now.',
          ru: 'Сейчас у меня наличными только 5 000 вон.',
        },
      },
      {
        ko: '오늘은 오후밖에 시간이 안 돼요.',
        highlight: '오후밖에',
        gloss: {
          ko: '오늘은 오후밖에 시간이 안 돼요.',
          uz: 'Bugun faqat tushdan keyin vaqtim bor.',
          en: 'I am only available in the afternoon today.',
          ru: 'Сегодня я могу только во второй половине дня.',
        },
      },
      {
        ko: '저는 아직 한국어밖에 못 해요.',
        highlight: '한국어밖에 못 해요',
        gloss: {
          ko: '저는 아직 한국어밖에 못 해요.',
          uz: 'Men hozircha faqat koreys tilida gaplasha olaman.',
          en: 'At the moment, Korean is the only language I can use.',
          ru: 'Пока я могу говорить только по-корейски.',
        },
      },
      {
        ko: '그 사람의 이름밖에 몰라요.',
        highlight: '이름밖에 몰라요',
        gloss: {
          ko: '그 사람의 이름밖에 몰라요.',
          uz: 'U odam haqida faqat ismini bilaman.',
          en: 'I only know that person’s name.',
          ru: 'Я знаю только имя этого человека.',
        },
      },
      {
        ko: '이 문제를 해결할 방법이 이것밖에 없어요.',
        highlight: '이것밖에 없어요',
        gloss: {
          ko: '이 문제를 해결할 방법이 이것밖에 없어요.',
          uz: 'Bu muammoni hal qilishning faqat shu yo‘li bor.',
          en: 'This is the only way to solve the problem.',
          ru: 'Это единственный способ решить проблему.',
        },
      },
      {
        ko: '이번 달에 영화를 한 번밖에 못 봤어요.',
        highlight: '한 번밖에 못 봤어요',
        gloss: {
          ko: '이번 달에 영화를 한 번밖에 못 봤어요.',
          uz: 'Bu oy filmni faqat bir marta ko‘ra oldim.',
          en: 'I only managed to watch one movie this month.',
          ru: 'В этом месяце я смог посмотреть фильм только один раз.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이번 주 초급반에 아직 신청할 수 있나요?',
        highlight: '신청할 수 있나요',
        gloss: {
          ko: '이번 주 초급반에 아직 신청할 수 있나요?',
          uz: 'Bu haftadagi boshlang‘ich guruhga hali ham yozilsa bo‘ladimi?',
          en: 'Can I still register for the beginner class this week?',
          ru: 'Можно ещё записаться в начальную группу на этой неделе?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네. 그런데 지금 자리가 한 자리밖에 안 남았어요.',
        highlight: '한 자리밖에 안 남았어요',
        gloss: {
          ko: '네. 그런데 지금 자리가 한 자리밖에 안 남았어요.',
          uz: 'Ha. Lekin hozir faqat bitta joy qoldi.',
          en: 'Yes, but there is only one spot left.',
          ru: 'Да, но сейчас осталось только одно место.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '등록 기간은 얼마나 남았나요?',
        highlight: '얼마나 남았나요',
        gloss: {
          ko: '등록 기간은 얼마나 남았나요?',
          uz: 'Ro‘yxatdan o‘tishga qancha vaqt qoldi?',
          en: 'How much time is left for registration?',
          ru: 'Сколько времени осталось до конца регистрации?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '오늘밖에 안 남았어요. 신청하시려면 오늘 하셔야 해요.',
        highlight: '오늘밖에 안 남았어요',
        gloss: {
          ko: '오늘밖에 안 남았어요. 신청하시려면 오늘 하셔야 해요.',
          uz: 'Faqat bugun qoldi. Ro‘yxatdan o‘tmoqchi bo‘lsangiz, bugun qilishingiz kerak.',
          en: 'Today is the only day left. If you want to register, you need to do it today.',
          ru: 'Остался только сегодняшний день. Если хотите зарегистрироваться, нужно сделать это сегодня.',
        },
      },
    ],

    similar: {
      pattern: 'N만',
      note: {
        ko: '"만"과 "밖에"는 둘 다 "~만"이라는 의미가 될 수 있지만 문장 구조와 느낌이 달라요. "만"은 긍정·부정 문장 모두에서 사용할 수 있고 단순한 선택이나 제한을 나타낼 수 있어요. "밖에"는 보통 부정 표현과 함께 사용하고, 그것 외에는 없다는 제한이나 예상보다 적다는 느낌이 더 강해요.',
        uz: '"만" ijobiy va inkor gaplarda ishlatilishi mumkin. "밖에" esa odatda inkor bilan kelib, kuchliroq cheklovni bildiradi.',
        en: 'Both can mean "only," but 만 can appear with positive or negative predicates and often simply marks selection. 밖에 normally requires a negative predicate and emphasizes stronger limitation.',
        ru: 'Обе формы могут означать «только», но 만 употребляется и с утвердительными, и с отрицательными формами, тогда как 밖에 обычно требует отрицания и сильнее подчёркивает ограниченность.',
      },
    },

    cautions: [
      {
        ko: '"밖에" 뒤에는 기본적으로 부정 표현이 필요해요. "돈이 만 원밖에 있어요"가 아니라 "돈이 만 원밖에 없어요"라고 해요.',
        uz: '밖에 bilan odatda inkor kerak: 만 원밖에 없어요.',
        en: '밖에 normally requires a negative predicate: 만 원밖에 없어요.',
        ru: 'После 밖에 обычно нужна отрицательная форма: 만 원밖에 없어요.',
      },
      {
        ko: '"세 명밖에 안 왔어요"와 "세 명만 왔어요"는 비슷하지만, "밖에" 쪽이 예상보다 적거나 부족하다는 느낌을 더 강하게 줄 수 있어요.',
        uz: '밖에 kutilganidan kamlik hissini kuchliroq beradi.',
        en: '밖에 can imply stronger limitation or fewer than expected compared with 만.',
        ru: '밖에 сильнее может подчёркивать недостаточность или меньшее, чем ожидалось, количество.',
      },
      {
        ko: '"밖에 사람이 있어요"의 "밖에"는 이 문법과 달라요. 여기서는 "밖"이 "outside"라는 명사이고 "에"가 장소 조사예요.',
        uz: '"밖에 사람이 있어요" dagi 밖에 joy ma’nosidagi boshqa tuzilma.',
        en: '밖에 in 밖에 사람이 있어요 means "outside + at" and is not the limiting particle.',
        ru: '밖에 в 밖에 사람이 있어요 означает «снаружи» и не является частицей ограничения.',
      },
      {
        ko: '"밖에" 앞에는 조사 하나를 무조건 더 붙이지 않아요. 기본적으로 "학생이 세 명밖에 없어요", "돈이 만 원밖에 없어요"처럼 수량·명사 바로 뒤에 붙여 사용해요.',
        uz: '밖에 odatda ot yoki miqdorga bevosita qo‘shiladi.',
        en: 'Attach 밖에 directly to the noun or quantity being limited.',
        ru: '밖에 непосредственно присоединяется к ограничиваемому существительному или количеству.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '지금 자리가 두 개___ 없어요.',
          uz: 'Cheklov shaklini tanlang.',
          en: 'Choose the correct limiting particle.',
          ru: 'Выберите правильную частицу ограничения.',
        },
        options: [
          { text: '밖에', correct: true },
          { text: '만에', correct: false },
          { text: '보다', correct: false },
          { text: '동안', correct: false },
          { text: '까지', correct: false },
        ],
      },
      {
        question: {
          ko: '등록 기간이 이틀밖에 ___ 남았어요.',
          uz: '밖에 bilan mos inkor shaklini tanlang.',
          en: 'Choose the correct form after 밖에.',
          ru: 'Выберите правильную форму после 밖에.',
        },
        options: [
          { text: '안', correct: true },
          { text: '더', correct: false },
          { text: '잘', correct: false },
          { text: '꼭', correct: false },
          { text: '다', correct: false },
        ],
      },
      {
        question: {
          ko: '돈이 만 원밖에 ___.',
          uz: 'To‘g‘ri gapni tanlang.',
          en: 'Choose the correct predicate.',
          ru: 'Выберите правильное сказуемое.',
        },
        options: [
          { text: '없어요', correct: true },
          { text: '있어요', correct: false },
          { text: '많아요', correct: false },
          { text: '좋아요', correct: false },
          { text: '커요', correct: false },
        ],
      },
      {
        question: {
          ko: '"학생이 세 명밖에 안 왔어요"의 의미로 가장 알맞은 것은 무엇이에요?',
          uz: 'Eng mos ma’noni tanlang.',
          en: 'Choose the best meaning.',
          ru: 'Выберите наиболее подходящее значение.',
        },
        options: [
          { text: '학생이 세 명만 왔고 그보다 더 오지 않았다', correct: true },
          { text: '학생이 세 명보다 많이 왔다', correct: false },
          { text: '학생 세 명이 모두 떠났다', correct: false },
          { text: '학생이 몇 명 왔는지 모른다', correct: false },
          { text: '학생이 앞으로 세 명 올 것이다', correct: false },
        ],
      },
      {
        question: {
          ko: '이 문법의 "밖에"와 다른 의미로 사용된 문장을 고르세요.',
          uz: 'Boshqa ma’nodagi 밖에 ni tanlang.',
          en: 'Choose the sentence where 밖에 has a different meaning.',
          ru: 'Выберите предложение, где 밖에 имеет другое значение.',
        },
        options: [
          { text: '밖에 사람이 있어요.', correct: true },
          { text: '돈이 천 원밖에 없어요.', correct: false },
          { text: '한 시간밖에 안 남았어요.', correct: false },
          { text: '한국어밖에 못 해요.', correct: false },
          { text: '그 이름밖에 몰라요.', correct: false },
        ],
      },
    ],
  },
];
