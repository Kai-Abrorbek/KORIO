// 번역 필드는 { ko, uz, en, ru }. 한국어 콘텐츠(패턴/예문/답)는 plain string.
export const GRAMMAR_SEED: any[] = [
  // ───────── 1. 과거 -았/었어요 (order 1) ─────────
  {
    code: 'past-asseoyo',
    pattern: '-았/었어요',
    order: 1,
    isActive: true,
    summary: {
      ko: '이미 끝난 과거의 일을 말할 때 써요.',
      uz: 'Allaqachon tugagan ish-harakatlar uchun ishlatiladi.',
      en: 'Used for actions that already happened.',
      ru: 'Используется для завершённых действий в прошлом.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '동사', uz: "Fe'l", en: 'Verb', ru: 'Глагол' },
      { ko: '과거', uz: "O'tgan zamon", en: 'Past', ru: 'Прошедшее' },
    ],
    explanation: {
      ko: "동사 어간의 마지막 모음이 ㅏ, ㅗ면 -았어요, 그 외에는 -었어요를 붙여요. '하다'는 '했어요'가 돼요. 과거에 일어난 일을 나타냅니다.",
      uz: "Fe'l o'zagining oxirgi unlisi ㅏ yoki ㅗ bo'lsa -았어요, aks holda -었어요 qo'shiladi. '하다' → '했어요'. O'tgan zamondagi ish-harakatni bildiradi.",
      en: "Add -았어요 when the last stem vowel is ㅏ or ㅗ, otherwise -었어요. '하다' becomes '했어요'. It marks a completed past action.",
      ru: "Если последняя гласная основы ㅏ или ㅗ — добавляем -았어요, иначе -었어요. '하다' → '했어요'. Обозначает завершённое действие.",
    },
    conjugationRule: {
      ko: '어간 끝 모음 ㅏ/ㅗ → -았어요, 나머지 → -었어요',
      uz: "O'zak unlisi ㅏ/ㅗ → -았어요, qolganlari → -었어요",
      en: 'Stem vowel ㅏ/ㅗ → -았어요, others → -었어요',
      ru: 'Гласная основы ㅏ/ㅗ → -았어요, остальные → -었어요',
    },
    conjugations: [
      { base: '가다', result: '갔어요' },
      { base: '먹다', result: '먹었어요' },
      { base: '하다', result: '했어요' },
      { base: '마시다', result: '마셨어요' },
    ],
    examples: [
      {
        ko: '어제 영화를 봤어요.',
        highlight: '봤어요',
        gloss: {
          ko: '어제 영화를 봤어요.',
          uz: "Kecha kino ko'rdim.",
          en: 'I watched a movie yesterday.',
          ru: 'Вчера я смотрел фильм.',
        },
      },
      {
        ko: '아침을 먹었어요.',
        highlight: '먹었어요',
        gloss: {
          ko: '아침을 먹었어요.',
          uz: 'Nonushta qildim.',
          en: 'I ate breakfast.',
          ru: 'Я позавтракал.',
        },
      },
      {
        ko: '친구를 만났어요.',
        highlight: '만났어요',
        gloss: {
          ko: '친구를 만났어요.',
          uz: "Do'stimni uchratdim.",
          en: 'I met a friend.',
          ru: 'Я встретил друга.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '주말에 뭐 했어요?',
        highlight: '했어요',
        gloss: {
          ko: '주말에 뭐 했어요?',
          uz: 'Dam olish kunlari nima qildingiz?',
          en: 'What did you do on the weekend?',
          ru: 'Что делал на выходных?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '집에서 쉬었어요.',
        highlight: '쉬었어요',
        gloss: {
          ko: '집에서 쉬었어요.',
          uz: 'Uyda dam oldim.',
          en: 'I rested at home.',
          ru: 'Отдыхал дома.',
        },
      },
    ],
    // similar 없음 (옵셔널 데모)
    cautions: [
      {
        ko: "받침이 아니라 '모음'(ㅏ/ㅗ)으로 판단해요.",
        uz: '받침 emas, unliga (ㅏ/ㅗ) qarab tanlanadi.',
        en: 'Decide by the vowel (ㅏ/ㅗ), not by 받침.',
        ru: 'Выбирайте по гласной (ㅏ/ㅗ), а не по 받침.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '"어제 뭐 해요?" — 영화를 ____',
          uz: '"Kecha nima qilding?" — kino ____',
          en: '"What did you do yesterday?" — a movie ____',
          ru: '"Что делал вчера?" — фильм ____',
        },
        options: [
          { text: '봤어요', correct: true },
          { text: '볼 거예요', correct: false },
          { text: '보고 있어요', correct: false },
        ],
      },
      {
        question: {
          ko: "'먹다'의 과거형은?",
          uz: "'먹다' o'tgan zamoni?",
          en: "Past form of '먹다'?",
          ru: "Прошедшая форма '먹다'?",
        },
        options: [
          { text: '먹었어요', correct: true },
          { text: '먹아요', correct: false },
          { text: '먹겠어요', correct: false },
        ],
      },
    ],
  },

  // ───────── 2. 진행 -고 있다 (order 2, 메인) ─────────
  {
    code: 'prog-goitda',
    pattern: '-고 있다',
    order: 2,
    isActive: true,
    summary: {
      ko: '지금 진행 중인 동작을 나타내요. 영어의 be ~ing 와 같아요.',
      uz: "Hozir davom etayotgan harakatni bildiradi, inglizcha 'be ~ing' kabi.",
      en: "Shows an action in progress right now, like English 'be ~ing'.",
      ru: "Обозначает действие, происходящее сейчас, как английское 'be ~ing'.",
    },
    tags: [
      { ko: '중급', uz: "O'rta", en: 'Intermediate', ru: 'Средний' },
      { ko: '동사', uz: "Fe'l", en: 'Verb', ru: 'Глагол' },
      { ko: '진행', uz: 'Davom', en: 'Progressive', ru: 'Прогрессив' },
    ],
    explanation: {
      ko: '동사 어간에 -고 있다를 붙이면 그 동작이 지금 이 순간 벌어지고 있다는 뜻이 돼요. 존댓말은 -고 있어요, 과거 진행은 -고 있었어요로 씁니다.',
      uz: "Fe'l o'zagiga -고 있다 qo'shilsa, harakat aynan hozir sodir bo'layotganini bildiradi. Hurmat shakli -고 있어요, o'tgan davom -고 있었어요.",
      en: 'Attaching -고 있다 to a verb stem means the action is happening at this very moment. Polite: -고 있어요; past progressive: -고 있었어요.',
      ru: 'Присоединение -고 있다 к основе глагола означает, что действие происходит прямо сейчас. Вежливо: -고 있어요; прош. прогрессив: -고 있었어요.',
    },
    conjugationRule: {
      ko: '동사 어간 + -고 있다 · 받침 상관없이 항상 같아서 쉬워요',
      uz: "Fe'l o'zagi + -고 있다 · 받침 dan qat'i nazar bir xil, oson",
      en: "Verb stem + -고 있다 · always the same regardless of 받침, so it's easy",
      ru: 'Основа глагола + -고 있다 · всегда одинаково, независимо от 받침',
    },
    conjugations: [
      { base: '먹다', result: '먹고 있다' },
      { base: '가다', result: '가고 있다' },
      { base: '읽다', result: '읽고 있다' },
      { base: '기다리다', result: '기다리고 있다' },
    ],
    examples: [
      {
        ko: '지금 밥을 먹고 있어요.',
        highlight: '먹고 있어요',
        gloss: {
          ko: '지금 밥을 먹고 있어요.',
          uz: 'Hozir ovqat yeyapman.',
          en: "I'm eating now.",
          ru: 'Я сейчас ем.',
        },
      },
      {
        ko: '친구를 기다리고 있어요.',
        highlight: '기다리고 있어요',
        gloss: {
          ko: '친구를 기다리고 있어요.',
          uz: "Do'stimni kutyapman.",
          en: "I'm waiting for a friend.",
          ru: 'Я жду друга.',
        },
      },
      {
        ko: '도서관에서 책을 읽고 있어요.',
        highlight: '읽고 있어요',
        gloss: {
          ko: '도서관에서 책을 읽고 있어요.',
          uz: "Kutubxonada kitob o'qiyapman.",
          en: "I'm reading at the library.",
          ru: 'Я читаю в библиотеке.',
        },
      },
      {
        ko: '밖에 비가 오고 있어요.',
        highlight: '오고 있어요',
        gloss: {
          ko: '밖에 비가 오고 있어요.',
          uz: "Tashqarida yomg'ir yog'yapti.",
          en: "It's raining outside.",
          ru: 'На улице идёт дождь.',
        },
      },
      {
        ko: '그때 저는 자고 있었어요.',
        highlight: '자고 있었어요',
        gloss: {
          ko: '그때 저는 자고 있었어요.',
          uz: "O'shanda uxlab yotgandim.",
          en: 'I was sleeping at that time.',
          ru: 'В тот момент я спал.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '지금 뭐 하고 있어요?',
        highlight: '하고 있어요',
        gloss: {
          ko: '지금 뭐 하고 있어요?',
          uz: 'Hozir nima qilyapsiz?',
          en: 'What are you doing now?',
          ru: 'Что ты сейчас делаешь?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '숙제를 하고 있어요.',
        highlight: '하고 있어요',
        gloss: {
          ko: '숙제를 하고 있어요.',
          uz: 'Uy vazifasini qilyapman.',
          en: "I'm doing my homework.",
          ru: 'Я делаю домашку.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '저는 커피를 마시고 있어요.',
        highlight: '마시고 있어요',
        gloss: {
          ko: '저는 커피를 마시고 있어요.',
          uz: 'Men qahva ichyapman.',
          en: "I'm drinking coffee.",
          ru: 'Я пью кофе.',
        },
      },
    ],
    similar: {
      pattern: '-는 중이다',
      note: {
        ko: '"밥을 먹고 있다" = "밥을 먹는 중이다" — 뜻은 거의 같아요. 다만 -고 있다가 더 일상적이에요.',
        uz: '"밥을 먹고 있다" = "밥을 먹는 중이다" — ma\'nosi deyarli bir xil. -고 있다 kundalikroq.',
        en: '"먹고 있다" = "먹는 중이다" — nearly the same meaning; -고 있다 is more everyday.',
        ru: '"먹고 있다" = "먹는 중이다" — почти одно и то же; -고 있다 более разговорное.',
      },
    },
    cautions: [
      {
        ko: '띄어쓰기: 먹고있다 (X) → 먹고 있다 (O)',
        uz: "Bo'sh joy: 먹고있다 (X) → 먹고 있다 (O)",
        en: 'Spacing: 먹고있다 (X) → 먹고 있다 (O)',
        ru: 'Пробел: 먹고있다 (X) → 먹고 있다 (O)',
      },
      {
        ko: '과거는 -고 있었어요. (먹고 있었다요 X)',
        uz: "O'tgan zamon -고 있었어요.",
        en: 'Past is -고 있었어요.',
        ru: 'Прошедшее — -고 있었어요.',
      },
      {
        ko: "순간적 동작('도착하다')엔 어색할 수 있어요.",
        uz: "Bir lahzali harakatlarda ('도착하다') g'alati bo'lishi mumkin.",
        en: "Can be awkward with instantaneous verbs ('도착하다').",
        ru: "Может звучать странно с мгновенными глаголами ('도착하다').",
      },
    ],
    quiz: [
      {
        question: {
          ko: '"지금 뭐 해요?" — 밥을 ____',
          uz: '"Hozir nima qilyapsan?" — ovqat ____',
          en: '"What are you doing now?" — food ____',
          ru: '"Что делаешь сейчас?" — еда ____',
        },
        options: [
          { text: '먹고 있어요', correct: true },
          { text: '먹었어요', correct: false },
          { text: '먹을 거예요', correct: false },
        ],
      },
      {
        question: {
          ko: '빈칸: 동생이 게임을 ____ 있어요.',
          uz: "Bo'sh joy: ukam o'yin ____ 있어요.",
          en: 'Fill: my sibling ____ 있어요 (playing a game).',
          ru: 'Пропуск: брат ____ 있어요 (играет).',
        },
        options: [
          { text: '하고', correct: true },
          { text: '해서', correct: false },
          { text: '하러', correct: false },
        ],
      },
      {
        question: {
          ko: '"비가 와요"를 진행형으로?',
          uz: '"Yomg\'ir yog\'yapti"ni davom shakliga?',
          en: 'Make "it rains" progressive?',
          ru: 'Сделать "идёт дождь" прогрессивом?',
        },
        options: [
          { text: '비가 오고 있어요', correct: true },
          { text: '비가 왔어요', correct: false },
          { text: '비가 올 거예요', correct: false },
        ],
      },
    ],
  },

  // ───────── 3. 미래 -(으)ㄹ 거예요 (order 3) ─────────
  {
    code: 'future-lgeoye',
    pattern: '-(으)ㄹ 거예요',
    order: 3,
    isActive: true,
    summary: {
      ko: '앞으로 할 일이나 추측을 말할 때 써요.',
      uz: 'Kelajakdagi reja yoki taxmin uchun ishlatiladi.',
      en: 'Used for future plans or guesses.',
      ru: 'Используется для планов на будущее или предположений.',
    },
    tags: [
      { ko: '중급', uz: "O'rta", en: 'Intermediate', ru: 'Средний' },
      { ko: '동사', uz: "Fe'l", en: 'Verb', ru: 'Глагол' },
      { ko: '미래', uz: 'Kelasi', en: 'Future', ru: 'Будущее' },
    ],
    explanation: {
      ko: '받침이 있으면 -을 거예요, 없으면 -ㄹ 거예요를 붙여요. 미래의 계획이나 추측을 나타냅니다.',
      uz: "받침 bo'lsa -을 거예요, bo'lmasa -ㄹ 거예요 qo'shiladi. Kelajak reja yoki taxminni bildiradi.",
      en: 'Add -을 거예요 after a 받침, -ㄹ 거예요 otherwise. Expresses future plans or guesses.',
      ru: 'После 받침 — -을 거예요, иначе -ㄹ 거예요. Выражает планы или предположения.',
    },
    conjugationRule: {
      ko: '받침 O → -을 거예요, 받침 X → -ㄹ 거예요',
      uz: "받침 bor → -을 거예요, 받침 yo'q → -ㄹ 거예요",
      en: 'Has 받침 → -을 거예요, no 받침 → -ㄹ 거예요',
      ru: 'Есть 받침 → -을 거예요, нет → -ㄹ 거예요',
    },
    conjugations: [
      { base: '가다', result: '갈 거예요' },
      { base: '먹다', result: '먹을 거예요' },
      { base: '보다', result: '볼 거예요' },
    ],
    examples: [
      {
        ko: '내일 학교에 갈 거예요.',
        highlight: '갈 거예요',
        gloss: {
          ko: '내일 학교에 갈 거예요.',
          uz: 'Ertaga maktabga boraman.',
          en: 'I will go to school tomorrow.',
          ru: 'Завтра пойду в школу.',
        },
      },
      {
        ko: '주말에 쉴 거예요.',
        highlight: '쉴 거예요',
        gloss: {
          ko: '주말에 쉴 거예요.',
          uz: 'Dam olish kunlari dam olaman.',
          en: "I'll rest on the weekend.",
          ru: 'На выходных отдохну.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '방학에 뭐 할 거예요?',
        highlight: '할 거예요',
        gloss: {
          ko: '방학에 뭐 할 거예요?',
          uz: "Ta'tilda nima qilasiz?",
          en: 'What will you do on vacation?',
          ru: 'Что будешь делать на каникулах?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '여행을 갈 거예요.',
        highlight: '갈 거예요',
        gloss: {
          ko: '여행을 갈 거예요.',
          uz: 'Sayohatga boraman.',
          en: "I'll travel.",
          ru: 'Поеду путешествовать.',
        },
      },
    ],
    // similar 없음
    cautions: [
      {
        ko: '받침 유무로 -을/-ㄹ 을 구분해요.',
        uz: "받침 bor-yo'qligiga qarab -을/-ㄹ tanlanadi.",
        en: "Choose -을/-ㄹ by whether there's a 받침.",
        ru: 'Выбор -을/-ㄹ зависит от наличия 받침.',
      },
    ],
    quiz: [
      {
        question: {
          ko: "'가다'의 미래형은?",
          uz: "'가다' kelasi zamoni?",
          en: "Future form of '가다'?",
          ru: "Будущая форма '가다'?",
        },
        options: [
          { text: '갈 거예요', correct: true },
          { text: '갔어요', correct: false },
          { text: '가고 있어요', correct: false },
        ],
      },
    ],
  },
];
