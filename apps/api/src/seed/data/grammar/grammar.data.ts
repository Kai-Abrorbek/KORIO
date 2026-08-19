// 번역 필드는 { ko, uz, en, ru }. 한국어 콘텐츠(패턴/예문/답)는 plain string.
//
// 섹션 1 — 유닛 1에서 배우는 기본 문형. 이름·국적·직업을 말하는 데 필요한 넷.
//          은/는 → 이에요/예요 → 입니다/입니까 → 이/가 아닙니다 순서로,
//          문장을 왼쪽부터 채워 나가는 순서와 같다.
// 섹션 2 — 시제.
export const GRAMMAR_SEED: any[] = [
  // ───────── 섹션 1-1. 주제 N은/는 ─────────
  {
    code: 'topic-eun-neun',
    pattern: 'N은/는',
    section: 1,
    order: 1,
    isActive: true,
    summary: {
      ko: '"무엇에 대해 말하는지"를 나타내요. 문장의 맨 앞에 와요.',
      uz: 'Gap nima haqida ekanini bildiradi. Gapning boshida keladi.',
      en: 'Marks what the sentence is about. It comes at the front.',
      ru: 'Показывает, о чём предложение. Стоит в начале.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '조사', uz: "Qo'shimcha", en: 'Particle', ru: 'Частица' },
    ],
    explanation: {
      ko: '앞 글자에 받침이 있으면 "은", 없으면 "는"을 붙여요. 받침은 글자 아래에 붙는 자음이에요. "학생"의 "생"에는 ㅇ 받침이 있고, "저"에는 받침이 없어요.',
      uz: 'Oldingi bo\'g\'inda undosh (받침) bo\'lsa "은", bo\'lmasa "는" qo\'shiladi. 받침 — bo\'g\'in ostidagi undosh. "학생" dagi "생" da ㅇ bor, "저" da yo\'q.',
      en: 'Add 은 when the preceding syllable ends in a consonant (받침), and 는 when it does not. 생 in 학생 has the final ㅇ; 저 has none.',
      ru: 'Добавляется 은, если предыдущий слог оканчивается согласным (받침), иначе 는. В 생 (학생) есть ㅇ, в 저 — нет.',
    },
    conjugationRule: {
      ko: '받침 O + 은  ·  받침 X + 는',
      uz: "받침 bor + 은  ·  받침 yo'q + 는",
      en: 'final consonant + 은  ·  no final consonant + 는',
      ru: 'есть согласный + 은  ·  нет + 는',
    },
    conjugations: [
      { base: '저', result: '저는' },
      { base: '하산', result: '하산은' },
      { base: '나나', result: '나나는' },
      { base: '선생님', result: '선생님은' },
    ],
    examples: [
      {
        ko: '저는 학생이에요.',
        highlight: '저는',
        gloss: {
          ko: '저는 학생이에요.',
          uz: 'Men talabaman.',
          en: 'I am a student.',
          ru: 'Я студент.',
        },
      },
      {
        ko: '하산은 우즈베키스탄 사람이에요.',
        highlight: '하산은',
        gloss: {
          ko: '하산은 우즈베키스탄 사람이에요.',
          uz: "Hasan o'zbekistonlik.",
          en: 'Hasan is from Uzbekistan.',
          ru: 'Хасан из Узбекистана.',
        },
      },
      {
        ko: '선생님은 한국 사람이에요.',
        highlight: '선생님은',
        gloss: {
          ko: '선생님은 한국 사람이에요.',
          uz: "O'qituvchi koreys.",
          en: 'The teacher is Korean.',
          ru: 'Учитель кореец.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '나나 씨는 어느 나라 사람이에요?',
        highlight: '씨는',
        gloss: {
          ko: '나나 씨는 어느 나라 사람이에요?',
          uz: 'Nana xonim qaysi mamlakatlik?',
          en: 'What country are you from, Nana?',
          ru: 'Из какой вы страны, Нана?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '저는 중국 사람이에요.',
        highlight: '저는',
        gloss: {
          ko: '저는 중국 사람이에요.',
          uz: 'Men xitoylikman.',
          en: 'I am Chinese.',
          ru: 'Я китаянка.',
        },
      },
    ],
    similar: {
      pattern: 'N도',
      note: {
        ko: '"저는"이 "나에 대해 말하면"이라면 "저도"는 "나 역시"예요. 상대와 같을 때 "는" 대신 "도"를 써요.',
        uz: '"저는" — "men haqimda", "저도" — "men ham". Suhbatdosh bilan bir xil bo\'lsa "는" o\'rniga "도".',
        en: '저는 introduces you as the topic; 저도 means "me too". Use 도 instead of 는 when you match the other person.',
        ru: '저는 вводит вас как тему, 저도 значит «я тоже». Когда совпадаете с собеседником — 도 вместо 는.',
      },
    },
    cautions: [
      {
        ko: '이름 뒤에 "씨"가 오면 받침을 보는 건 이름이 아니라 "씨"예요. "씨"는 받침이 없으니 항상 "씨는".',
        uz: 'Ism ortidan "씨" kelsa, 받침 ismga emas, "씨" ga qaraladi. "씨" da 받침 yo\'q — doim "씨는".',
        en: 'When 씨 follows a name, check 씨, not the name. 씨 has no final consonant, so it is always 씨는.',
        ru: 'Если после имени идёт 씨, смотрят на 씨, а не на имя. У 씨 нет согласного — всегда 씨는.',
      },
      {
        ko: '"니콜"처럼 ㄹ로 끝나는 이름은 소리가 부드러워도 받침이 있어요. "니콜은"이 맞아요.',
        uz: '"니콜" kabi ㄹ bilan tugagan ismlarda tovush yumshoq bo\'lsa ham 받침 bor. "니콜은" to\'g\'ri.',
        en: 'Names ending in ㄹ like 니콜 do have a final consonant even though it sounds soft. 니콜은 is correct.',
        ru: 'Имена на ㄹ, например 니콜, имеют конечный согласный, хоть он и мягкий. Верно 니콜은.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '저___ 하산이에요.',
          uz: '저___ 하산이에요.',
          en: '저___ 하산이에요.',
          ru: '저___ 하산이에요.',
        },
        options: [
          { text: '는', correct: true },
          { text: '은', correct: false },
          { text: '이', correct: false },
        ],
      },
      {
        question: {
          ko: '스티븐___ 미국 사람이에요.',
          uz: '스티븐___ 미국 사람이에요.',
          en: '스티븐___ 미국 사람이에요.',
          ru: '스티븐___ 미국 사람이에요.',
        },
        options: [
          { text: '은', correct: true },
          { text: '는', correct: false },
          { text: '가', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 1-2. 서술 N이에요/예요 ─────────
  {
    code: 'copula-ieyo',
    pattern: 'N이에요/예요',
    section: 1,
    order: 2,
    isActive: true,
    summary: {
      ko: '"~입니다"의 부드러운 말. 이름·직업·국적을 말할 때 써요.',
      uz: '"~man/siz" ma\'nosidagi muloyim shakl. Ism, kasb, millat aytishda ishlatiladi.',
      en: 'The friendly "am/is/are". Used to state a name, job or nationality.',
      ru: 'Мягкая форма «есть». Используется для имени, профессии, национальности.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '서술', uz: 'Kesim', en: 'Predicate', ru: 'Сказуемое' },
    ],
    explanation: {
      ko: '받침이 있으면 "이에요", 없으면 "예요"를 붙여요. 은/는과 판단 기준이 같아요. "학생"은 받침이 있으니 "학생이에요", "의사"는 없으니 "의사예요".',
      uz: '받침 bor bo\'lsa "이에요", yo\'q bo\'lsa "예요". 은/는 bilan bir xil qoida. "학생" — "학생이에요", "의사" — "의사예요".',
      en: 'Use 이에요 after a final consonant and 예요 without one — the same test as 은/는. 학생이에요 but 의사예요.',
      ru: 'После согласного — 이에요, без него — 예요; тот же признак, что и у 은/는. 학생이에요, но 의사예요.',
    },
    conjugationRule: {
      ko: '받침 O + 이에요  ·  받침 X + 예요',
      uz: "받침 bor + 이에요  ·  받침 yo'q + 예요",
      en: 'final consonant + 이에요  ·  no final consonant + 예요',
      ru: 'есть согласный + 이에요  ·  нет + 예요',
    },
    conjugations: [
      { base: '학생', result: '학생이에요' },
      { base: '의사', result: '의사예요' },
      { base: '회사원', result: '회사원이에요' },
      { base: '가수', result: '가수예요' },
    ],
    examples: [
      {
        ko: '저는 나나예요.',
        highlight: '나나예요',
        gloss: {
          ko: '저는 나나예요.',
          uz: 'Men Nanaman.',
          en: 'I am Nana.',
          ru: 'Я Нана.',
        },
      },
      {
        ko: '마리아는 의사예요.',
        highlight: '의사예요',
        gloss: {
          ko: '마리아는 의사예요.',
          uz: 'Mariya shifokor.',
          en: 'Maria is a doctor.',
          ru: 'Мария врач.',
        },
      },
      {
        ko: '저는 한국 사람이에요.',
        highlight: '사람이에요',
        gloss: {
          ko: '저는 한국 사람이에요.',
          uz: 'Men koreysman.',
          en: 'I am Korean.',
          ru: 'Я кореец.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이름이 뭐예요?',
        highlight: '뭐예요',
        gloss: {
          ko: '이름이 뭐예요?',
          uz: 'Ismingiz nima?',
          en: 'What is your name?',
          ru: 'Как вас зовут?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '저는 하산이에요. 학생이에요.',
        highlight: '하산이에요',
        gloss: {
          ko: '저는 하산이에요. 학생이에요.',
          uz: 'Men Hasanman. Talabaman.',
          en: 'I am Hasan. I am a student.',
          ru: 'Я Хасан. Я студент.',
        },
      },
    ],
    similar: {
      pattern: 'N입니다',
      note: {
        ko: '뜻은 같고 자리만 달라요. 친구·일상은 "이에요/예요", 회사·발표·처음 뵙는 자리는 "입니다".',
        uz: 'Ma\'nosi bir xil, faqat vaziyat farq qiladi. Do\'st va kundalik — "이에요/예요"; ish, taqdimot, rasmiy uchrashuv — "입니다".',
        en: 'Same meaning, different setting. 이에요/예요 with friends and every day; 입니다 at work, in a presentation, on a first formal meeting.',
        ru: 'Смысл тот же, отличается обстановка. 이에요/예요 — с друзьями и в быту; 입니다 — на работе и в официальной ситуации.',
      },
    },
    cautions: [
      {
        ko: '"학생예요", "의사이에요"는 없는 말이에요. 받침을 먼저 보세요.',
        uz: '"학생예요", "의사이에요" degan shakl yo\'q. Avval 받침 ga qarang.',
        en: '학생예요 and 의사이에요 do not exist. Check the final consonant first.',
        ru: 'Форм 학생예요 и 의사이에요 не существует. Сначала проверьте согласный.',
      },
      {
        ko: '나라 이름만 말하면 안 돼요. "저는 중국이에요"는 "내가 중국이다"라는 뜻이 돼요. "중국 사람이에요"라고 해요.',
        uz: 'Faqat mamlakat nomini aytib bo\'lmaydi. "저는 중국이에요" — "men Xitoyman" degani. "중국 사람이에요" deyiladi.',
        en: 'The country name alone will not do — 저는 중국이에요 means "I am China". Say 중국 사람이에요.',
        ru: 'Одного названия страны мало: 저는 중국이에요 значит «я — Китай». Надо 중국 사람이에요.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '저는 학생___.',
          uz: '저는 학생___.',
          en: '저는 학생___.',
          ru: '저는 학생___.',
        },
        options: [
          { text: '이에요', correct: true },
          { text: '예요', correct: false },
          { text: '이', correct: false },
        ],
      },
      {
        question: {
          ko: '켈리는 가수___.',
          uz: '켈리는 가수___.',
          en: '켈리는 가수___.',
          ru: '켈리는 가수___.',
        },
        options: [
          { text: '예요', correct: true },
          { text: '이에요', correct: false },
          { text: '입니까', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 1-3. 격식 N입니다 / N입니까? ─────────
  {
    code: 'copula-imnida',
    pattern: 'N입니다 / N입니까?',
    section: 1,
    order: 3,
    isActive: true,
    summary: {
      ko: '"이에요/예요"의 격식 있는 말. 회사·발표·처음 뵙는 자리에서 써요.',
      uz: '"이에요/예요" ning rasmiy shakli. Ish, taqdimot, rasmiy uchrashuvda ishlatiladi.',
      en: 'The formal form of 이에요/예요. Used at work, in presentations and formal first meetings.',
      ru: 'Официальная форма 이에요/예요. На работе, в презентациях, при знакомстве.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '높임말', uz: 'Hurmat', en: 'Formal', ru: 'Вежливость' },
    ],
    explanation: {
      ko: '받침이 있든 없든 언제나 "입니다" 하나예요. 은/는이나 이에요/예요와 달리 형태가 바뀌지 않아요. 물어볼 때는 "입니까?"로 바꾸고 끝을 올려요.',
      uz: "받침 bor-yo'qligidan qat'i nazar doim \"입니다\". 은/는 yoki 이에요/예요 dan farqli, shakli o'zgarmaydi. Savolda \"입니까?\" bo'ladi va oxiri ko'tariladi.",
      en: 'Always just 입니다, with or without a final consonant — unlike 은/는 or 이에요/예요 it never changes. For a question it becomes 입니까? with a rising ending.',
      ru: 'Всегда просто 입니다, независимо от согласного — в отличие от 은/는 и 이에요/예요 форма не меняется. В вопросе — 입니까? с повышением тона.',
    },
    conjugationRule: {
      ko: '받침과 상관없이 N + 입니다  ·  질문은 N + 입니까?',
      uz: "받침 dan qat'i nazar N + 입니다  ·  savol N + 입니까?",
      en: 'N + 입니다 regardless of 받침  ·  question: N + 입니까?',
      ru: 'N + 입니다 независимо от 받침  ·  вопрос: N + 입니까?',
    },
    conjugations: [
      { base: '학생', result: '학생입니다' },
      { base: '의사', result: '의사입니다' },
      { base: '기자', result: '기자입니까?' },
      { base: '회사원', result: '회사원입니까?' },
    ],
    examples: [
      {
        ko: '저는 마이클입니다.',
        highlight: '마이클입니다',
        gloss: {
          ko: '저는 마이클입니다.',
          uz: 'Men Maykman.',
          en: 'I am Michael.',
          ru: 'Я Майкл.',
        },
      },
      {
        ko: '저는 영국 사람입니다.',
        highlight: '사람입니다',
        gloss: {
          ko: '저는 영국 사람입니다.',
          uz: 'Men angliyalikman.',
          en: 'I am British.',
          ru: 'Я британец.',
        },
      },
      {
        ko: '직업은 무엇입니까?',
        highlight: '무엇입니까',
        gloss: {
          ko: '직업은 무엇입니까?',
          uz: 'Kasbingiz nima?',
          en: 'What is your job?',
          ru: 'Кем вы работаете?',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '스티븐 씨는 학생입니까?',
        highlight: '학생입니까',
        gloss: {
          ko: '스티븐 씨는 학생입니까?',
          uz: 'Stiven janob talabamisiz?',
          en: 'Are you a student, Steven?',
          ru: 'Вы студент, Стивен?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 저는 학생입니다.',
        highlight: '학생입니다',
        gloss: {
          ko: '네, 저는 학생입니다.',
          uz: 'Ha, men talabaman.',
          en: 'Yes, I am a student.',
          ru: 'Да, я студент.',
        },
      },
    ],
    similar: {
      pattern: 'N이에요/예요',
      note: {
        ko: '뜻은 같아요. 상대가 "-습니다"로 말하면 나도 "입니다"로 맞추고, 친구끼리면 "이에요/예요"로 내려요.',
        uz: 'Ma\'nosi bir xil. Suhbatdosh "-습니다" ishlatsa siz ham "입니다"; do\'stlar orasida "이에요/예요".',
        en: 'Same meaning. Match 입니다 when the other person uses -습니다; drop to 이에요/예요 among friends.',
        ru: 'Смысл тот же. Отвечайте 입니다, если собеседник на -습니다; с друзьями — 이에요/예요.',
      },
    },
    cautions: [
      {
        ko: '"학생이입니다"처럼 조사를 끼워 넣지 않아요. 받침이 있어도 그냥 "학생입니다".',
        uz: '"학생이입니다" kabi qo\'shimcha qo\'shilmaydi. 받침 bo\'lsa ham shunchaki "학생입니다".',
        en: 'Do not insert a particle as in 학생이입니다. Even with a final consonant it is just 학생입니다.',
        ru: 'Не вставляйте частицу, как в 학생이입니다. Даже с согласным — просто 학생입니다.',
      },
      {
        ko: '대답할 때 "입니까"를 쓰면 안 돼요. 묻는 건 "입니까?", 답하는 건 "입니다".',
        uz: 'Javobda "입니까" ishlatilmaydi. Savol — "입니까?", javob — "입니다".',
        en: 'Never answer with 입니까. Asking is 입니까?, answering is 입니다.',
        ru: 'В ответе 입니까 не используется. Вопрос — 입니까?, ответ — 입니다.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '(격식) 저는 기자___.',
          uz: '(rasmiy) 저는 기자___.',
          en: '(formal) 저는 기자___.',
          ru: '(официально) 저는 기자___.',
        },
        options: [
          { text: '입니다', correct: true },
          { text: '예요', correct: false },
          { text: '예입니다', correct: false },
        ],
      },
      {
        question: {
          ko: '스티븐 씨는 학생___?',
          uz: '스티븐 씨는 학생___?',
          en: '스티븐 씨는 학생___?',
          ru: '스티븐 씨는 학생___?',
        },
        options: [
          { text: '입니까', correct: true },
          { text: '입니다', correct: false },
          { text: '이에요까', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 1-4. 부정 N이/가 아닙니다 ─────────
  {
    code: 'neg-i-ga-animnida',
    pattern: 'N이/가 아닙니다',
    section: 1,
    order: 4,
    isActive: true,
    summary: {
      ko: '"~이 아니다"라고 부정할 때 써요. "입니다"의 반대말이에요.',
      uz: '"~emas" deb inkor qilishda ishlatiladi. "입니다" ning teskarisi.',
      en: 'Says something is not the case — the opposite of 입니다.',
      ru: 'Отрицание «не является» — противоположность 입니다.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '부정', uz: 'Inkor', en: 'Negation', ru: 'Отрицание' },
      { ko: '높임말', uz: 'Hurmat', en: 'Formal', ru: 'Вежливость' },
    ],
    explanation: {
      ko: '받침이 있으면 "이", 없으면 "가"를 붙이고 그 뒤에 "아닙니다"를 써요. "입니다"와 달리 앞에 조사가 하나 붙는다는 게 다른 점이에요.',
      uz: '받침 bor bo\'lsa "이", yo\'q bo\'lsa "가" qo\'shiladi, keyin "아닙니다". "입니다" dan farqi — oldiga bitta qo\'shimcha keladi.',
      en: 'Attach 이 after a final consonant and 가 without one, then 아닙니다. Unlike 입니다, this pattern takes a particle in front.',
      ru: 'После согласного — 이, без него — 가, затем 아닙니다. В отличие от 입니다, здесь появляется частица.',
    },
    conjugationRule: {
      ko: '받침 O + 이 아닙니다  ·  받침 X + 가 아닙니다',
      uz: "받침 bor + 이 아닙니다  ·  받침 yo'q + 가 아닙니다",
      en: 'final consonant + 이 아닙니다  ·  no final consonant + 가 아닙니다',
      ru: 'есть согласный + 이 아닙니다  ·  нет + 가 아닙니다',
    },
    conjugations: [
      { base: '학생', result: '학생이 아닙니다' },
      { base: '의사', result: '의사가 아닙니다' },
      { base: '사람', result: '사람이 아닙니다' },
      { base: '기자', result: '기자가 아닙니다' },
    ],
    examples: [
      {
        ko: '저는 미국 사람이 아닙니다.',
        highlight: '사람이 아닙니다',
        gloss: {
          ko: '저는 미국 사람이 아닙니다.',
          uz: 'Men amerikalik emasman.',
          en: 'I am not American.',
          ru: 'Я не американец.',
        },
      },
      {
        ko: '마이클은 선생님이 아닙니다.',
        highlight: '선생님이 아닙니다',
        gloss: {
          ko: '마이클은 선생님이 아닙니다.',
          uz: "Maykl o'qituvchi emas.",
          en: 'Michael is not a teacher.',
          ru: 'Майкл не учитель.',
        },
      },
      {
        ko: '저는 의사가 아닙니다.',
        highlight: '의사가 아닙니다',
        gloss: {
          ko: '저는 의사가 아닙니다.',
          uz: 'Men shifokor emasman.',
          en: 'I am not a doctor.',
          ru: 'Я не врач.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '마이클 씨는 미국 사람입니까?',
        highlight: '사람입니까',
        gloss: {
          ko: '마이클 씨는 미국 사람입니까?',
          uz: 'Maykl janob amerikalikmisiz?',
          en: 'Are you American, Michael?',
          ru: 'Вы американец, Майкл?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아니요, 미국 사람이 아닙니다. 영국 사람입니다.',
        highlight: '사람이 아닙니다',
        gloss: {
          ko: '아니요, 미국 사람이 아닙니다. 영국 사람입니다.',
          uz: "Yo'q, amerikalik emasman. Angliyalikman.",
          en: 'No, I am not American. I am British.',
          ru: 'Нет, я не американец. Я британец.',
        },
      },
    ],
    similar: {
      pattern: 'N이/가 아니에요',
      note: {
        ko: '같은 부정인데 부드러운 말이에요. 친구·일상에서는 "아니에요", 격식 있는 자리에서는 "아닙니다".',
        uz: 'Xuddi shu inkor, lekin muloyimroq. Do\'st va kundalikda "아니에요", rasmiy joyda "아닙니다".',
        en: 'The same negation in the friendly register. 아니에요 in daily life, 아닙니다 in formal settings.',
        ru: 'То же отрицание, но мягче. 아니에요 в быту, 아닙니다 в официальной обстановке.',
      },
    },
    cautions: [
      {
        ko: '"사람가 아닙니다"는 틀려요. "사람"에는 ㅁ 받침이 있으니 "사람이 아닙니다".',
        uz: '"사람가 아닙니다" — xato. "사람" da ㅁ bor, shuning uchun "사람이 아닙니다".',
        en: '사람가 아닙니다 is wrong. 사람 ends in ㅁ, so it is 사람이 아닙니다.',
        ru: '사람가 아닙니다 неверно. 사람 оканчивается на ㅁ — значит 사람이 아닙니다.',
      },
      {
        ko: '아니라고만 하면 대화가 끊겨요. 맞는 것을 이어서 말해 주세요. "미국 사람이 아닙니다. 영국 사람입니다."',
        uz: 'Faqat inkor qilsangiz suhbat uziladi. To\'g\'risini ham ayting: "미국 사람이 아닙니다. 영국 사람입니다."',
        en: 'Only denying stalls the conversation — follow it with what is true: 미국 사람이 아닙니다. 영국 사람입니다.',
        ru: 'Одно отрицание обрывает разговор — добавьте верное: 미국 사람이 아닙니다. 영국 사람입니다.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '저는 학생___ 아닙니다.',
          uz: '저는 학생___ 아닙니다.',
          en: '저는 학생___ 아닙니다.',
          ru: '저는 학생___ 아닙니다.',
        },
        options: [
          { text: '이', correct: true },
          { text: '가', correct: false },
          { text: '은', correct: false },
        ],
      },
      {
        question: {
          ko: '저는 의사___ 아닙니다.',
          uz: '저는 의사___ 아닙니다.',
          en: '저는 의사___ 아닙니다.',
          ru: '저는 의사___ 아닙니다.',
        },
        options: [
          { text: '가', correct: true },
          { text: '이', correct: false },
          { text: '는', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 1-5. 존재 N이/가 있어요[없어요] ─────────
  {
    code: 'exist-i-ga-isseoyo',
    pattern: 'N이/가 있어요[없어요]',
    section: 1,
    order: 5,
    isActive: true,
    summary: {
      ko: '무엇이 "있다 / 없다"를 말해요. 물건을 소개하거나 찾을 때 써요.',
      uz: 'Biror narsa "bor / yo\'q" ekanini aytadi. Narsani tanishtirganda yoki qidirganda.',
      en: 'Says that something exists or does not. Use it to introduce or look for things.',
      ru: 'Говорит, что что-то есть или чего-то нет. Для представления и поиска вещей.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '조사', uz: "Qo'shimcha", en: 'Particle', ru: 'Частица' },
      { ko: '존재', uz: 'Mavjudlik', en: 'Existence', ru: 'Наличие' },
    ],
    explanation: {
      ko: '이름 뒤에 "이/가"를 붙이고 "있어요" 또는 "없어요"를 써요. 받침이 있으면 "이", 없으면 "가"예요. 부정은 "안 있어요"가 아니라 아예 다른 말인 "없어요"를 써요.',
      uz: 'Nomdan keyin "이/가" qo\'shiladi, so\'ng "있어요" yoki "없어요". Undosh bor — "이", yo\'q — "가". Inkor "안 있어요" emas, butunlay boshqa so\'z: "없어요".',
      en: 'Attach 이/가 to the noun, then 있어요 or 없어요. Consonant ending takes 이, vowel ending takes 가. The negative is not "안 있어요" — it is a separate word, 없어요.',
      ru: 'К существительному добавьте 이/가, затем 있어요 или 없어요. С 받침 — 이, без — 가. Отрицание не «안 있어요», а отдельное слово 없어요.',
    },
    conjugationRule: {
      ko: '받침 O + 이 있어요  ·  받침 X + 가 있어요',
      uz: "받침 bor + 이 있어요  ·  받침 yo'q + 가 있어요",
      en: 'final consonant + 이 있어요  ·  no final consonant + 가 있어요',
      ru: 'есть согласный + 이 있어요  ·  нет + 가 있어요',
    },
    conjugations: [
      { base: '책', result: '책이 있어요' },
      { base: '의자', result: '의자가 있어요' },
      { base: '텔레비전', result: '텔레비전이 있어요' },
      { base: '침대', result: '침대가 있어요' },
    ],
    examples: [
      {
        ko: '책상이 있어요.',
        highlight: '책상이',
        gloss: {
          ko: '책상이 있어요.',
          uz: 'Parta bor.',
          en: 'There is a desk.',
          ru: 'Есть парта.',
        },
      },
      {
        ko: '의자가 없어요.',
        highlight: '의자가',
        gloss: {
          ko: '의자가 없어요.',
          uz: "Stul yo'q.",
          en: 'There is no chair.',
          ru: 'Стула нет.',
        },
      },
      {
        ko: '가방 안에 지갑이 있어요.',
        highlight: '지갑이',
        gloss: {
          ko: '가방 안에 지갑이 있어요.',
          uz: 'Sumka ichida hamyon bor.',
          en: 'There is a wallet in the bag.',
          ru: 'В сумке есть кошелёк.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '연필이 있어요?',
        highlight: '연필이',
        gloss: {
          ko: '연필이 있어요?',
          uz: 'Qalam bormi?',
          en: 'Do you have a pencil?',
          ru: 'Есть карандаш?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아니요, 연필은 없어요. 볼펜이 있어요.',
        highlight: '연필은 없어요',
        gloss: {
          ko: '아니요, 연필은 없어요. 볼펜이 있어요.',
          uz: "Yo'q, qalam yo'q. Ruchka bor.",
          en: 'No, I have no pencil. I have a pen.',
          ru: 'Нет, карандаша нет. Есть ручка.',
        },
      },
    ],
    similar: {
      pattern: 'N은/는 없어요',
      note: {
        ko: '"연필이 없어요"는 그냥 없다는 말이고, "연필은 없어요"는 "다른 건 있는데 연필만 없다"는 뜻이에요. 대비할 때만 "은/는"으로 바꿔요.',
        uz: '"연필이 없어요" — oddiy inkor; "연필은 없어요" — "boshqasi bor, faqat qalam yo\'q". Qarama-qarshi qo\'yganda "은/는".',
        en: '연필이 없어요 is a plain "there is none"; 연필은 없어요 means "everything else, but not the pencil". Switch to 은/는 only for contrast.',
        ru: '연필이 없어요 — просто «нет»; 연필은 없어요 — «остальное есть, а карандаша нет». 은/는 — только для противопоставления.',
      },
    },
    cautions: [
      {
        ko: '"없어요"는 "있어요"의 반대말이지 부정형이 아니에요. "안 있어요"라고 하지 않아요.',
        uz: '"없어요" — "있어요" ning antonimi, inkor shakli emas. "안 있어요" deyilmaydi.',
        en: '없어요 is the opposite word of 있어요, not its negated form. Never say 안 있어요.',
        ru: '없어요 — антоним 있어요, а не его отрицание. «안 있어요» не говорят.',
      },
      {
        ko: '"있어요" 앞에는 "은/는"이 아니라 "이/가"가 기본이에요. 처음 꺼내는 물건일수록 "이/가"예요.',
        uz: '"있어요" oldida asosan "이/가", "은/는" emas. Ayniqsa birinchi marta aytilayotgan narsa uchun.',
        en: 'The default before 있어요 is 이/가, not 은/는 — especially for something mentioned for the first time.',
        ru: 'По умолчанию перед 있어요 — 이/가, а не 은/는, особенно если вещь называется впервые.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '책상___ 있어요.',
          uz: '책상___ 있어요.',
          en: '책상___ 있어요.',
          ru: '책상___ 있어요.',
        },
        options: [
          { text: '이', correct: true },
          { text: '가', correct: false },
          { text: '은', correct: false },
        ],
      },
      {
        question: {
          ko: '의자___ 없어요.',
          uz: '의자___ 없어요.',
          en: '의자___ 없어요.',
          ru: '의자___ 없어요.',
        },
        options: [
          { text: '가', correct: true },
          { text: '이', correct: false },
          { text: '는', correct: false },
        ],
      },
      {
        question: {
          ko: '텔레비전___ 있어요.',
          uz: '텔레비전___ 있어요.',
          en: '텔레비전___ 있어요.',
          ru: '텔레비전___ 있어요.',
        },
        options: [
          { text: '이', correct: true },
          { text: '가', correct: false },
          { text: '를', correct: false },
        ],
      },
      {
        question: {
          ko: '"있어요"의 반대말은?',
          uz: '"있어요" ning antonimi?',
          en: 'What is the opposite of 있어요?',
          ru: 'Какой антоним у 있어요?',
        },
        options: [
          { text: '없어요', correct: true },
          { text: '안 있어요', correct: false },
          { text: '아니에요', correct: false },
        ],
      },
      {
        question: {
          ko: '침대는 있고 냉장고만 없어요. 어떻게 말해요?',
          uz: "Karavot bor, faqat muzlatgich yo'q. Qanday aytiladi?",
          en: 'There is a bed but no refrigerator. How do you say it?',
          ru: 'Кровать есть, а холодильника нет. Как сказать?',
        },
        options: [
          { text: '냉장고는 없어요', correct: true },
          { text: '냉장고가 안 있어요', correct: false },
          { text: '냉장고를 없어요', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 1-6. 지시 이거는/그거는/저거는 N이에요 ─────────
  {
    code: 'demonstrative-igeo',
    pattern: '이거는[그거는, 저거는] N이에요/예요',
    section: 1,
    order: 6,
    isActive: true,
    summary: {
      ko: '눈앞의 물건을 가리키며 이름을 말해요. 거리에 따라 말이 달라져요.',
      uz: "Ko'z oldidagi narsani ko'rsatib nomini aytadi. Masofaga qarab o'zgaradi.",
      en: 'Points at a thing in front of you and names it. The word changes with distance.',
      ru: 'Указывает на предмет и называет его. Слово зависит от расстояния.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      {
        ko: '지시어',
        uz: "Ko'rsatish",
        en: 'Demonstrative',
        ru: 'Указательное',
      },
    ],
    explanation: {
      ko: '내 가까이에 있으면 "이거", 상대 가까이에 있으면 "그거", 둘 다에게서 멀면 "저거"예요. 뒤에는 유닛 1에서 배운 "N이에요/예요"를 그대로 붙여요. 무엇인지 물을 때는 "뭐예요?"를 써요.',
      uz: 'Menga yaqin — "이거", suhbatdoshga yaqin — "그거", ikkalasidan uzoq — "저거". Ortidan 1-bo\'limdagi "N이에요/예요" qo\'shiladi. So\'rash uchun "뭐예요?".',
      en: 'Near me is 이거, near you is 그거, far from both is 저거. Then attach the N이에요/예요 you learned in unit 1. To ask, use 뭐예요?',
      ru: 'Рядом со мной — 이거, рядом с вами — 그거, далеко от обоих — 저거. Дальше — знакомое N이에요/예요. Вопрос — 뭐예요?',
    },
    conjugationRule: {
      ko: '내 곁 → 이거  ·  네 곁 → 그거  ·  둘 다에게서 멀리 → 저거',
      uz: 'Menga yaqin → 이거  ·  senga yaqin → 그거  ·  uzoq → 저거',
      en: 'near me → 이거  ·  near you → 그거  ·  far from both → 저거',
      ru: 'рядом со мной → 이거  ·  рядом с тобой → 그거  ·  далеко → 저거',
    },
    conjugations: [
      { base: '이거는', result: '이거는 책이에요' },
      { base: '그거는', result: '그거는 공책이에요' },
      { base: '저거는', result: '저거는 시계예요' },
      { base: '뭐', result: '이거는 뭐예요?' },
    ],
    examples: [
      {
        ko: '이거는 지우개예요.',
        highlight: '이거는',
        gloss: {
          ko: '이거는 지우개예요.',
          uz: "Bu — o'chirg'ich.",
          en: 'This is an eraser.',
          ru: 'Это ластик.',
        },
      },
      {
        ko: '그거는 사전이에요.',
        highlight: '그거는',
        gloss: {
          ko: '그거는 사전이에요.',
          uz: "Bu (sizdagi) — lug'at.",
          en: 'That (by you) is a dictionary.',
          ru: 'То (у вас) — словарь.',
        },
      },
      {
        ko: '저거는 텔레비전이에요.',
        highlight: '저거는',
        gloss: {
          ko: '저거는 텔레비전이에요.',
          uz: 'Anavi — televizor.',
          en: 'That over there is a television.',
          ru: 'То — телевизор.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이거는 한국어로 뭐예요?',
        highlight: '뭐예요',
        gloss: {
          ko: '이거는 한국어로 뭐예요?',
          uz: 'Bu koreyschada nima deyiladi?',
          en: 'What is this called in Korean?',
          ru: 'Как это по-корейски?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '그거는 자예요.',
        highlight: '그거는',
        gloss: {
          ko: '그거는 자예요.',
          uz: "Bu — chizg'ich.",
          en: 'That is a ruler.',
          ru: 'Это линейка.',
        },
      },
    ],
    similar: {
      pattern: '이 N / 그 N / 저 N',
      note: {
        ko: '"이거"는 물건 자체를 가리키는 대명사예요. 이름을 함께 말할 때는 "이 책", "저 사람"처럼 "거" 없이 써요.',
        uz: '"이거" — narsaning o\'zini bildiruvchi olmosh. Nom bilan aytilsa "이 책", "저 사람" kabi "거" siz.',
        en: '이거 is a pronoun standing in for the object. With the noun spelled out you drop 거: 이 책, 저 사람.',
        ru: '이거 — местоимение вместо предмета. Если называете сам предмет, 거 убирается: 이 책, 저 사람.',
      },
    },
    cautions: [
      {
        ko: '"이거는"에 붙는 건 "이/가"가 아니라 "은/는"이에요. "이거가 뭐예요?"는 어색해요.',
        uz: '"이거는" da "이/가" emas, "은/는" ishlatiladi. "이거가 뭐예요?" g\'aliz.',
        en: 'Use 은/는 with 이거, not 이/가. "이거가 뭐예요?" sounds off.',
        ru: 'С 이거 идёт 은/는, а не 이/가. «이거가 뭐예요?» звучит неправильно.',
      },
      {
        ko: '대답할 때는 상대 기준으로 바꿔야 해요. 상대가 "이거는?"이라고 물으면 나에게는 그것이 "그거"예요.',
        uz: 'Javob berganda suhbatdosh nuqtai nazariga o\'ting: u "이거는?" desa, siz uchun bu "그거".',
        en: 'Switch to the other side when replying: if they say 이거는?, from where you stand it is 그거.',
        ru: 'Отвечая, меняйте точку отсчёта: если он говорит 이거는?, для вас это 그거.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '내 손에 있는 물건을 가리켜요.',
          uz: "Qo'limdagi narsani ko'rsataman.",
          en: 'You point at something in your own hand.',
          ru: 'Вы показываете на предмет в своей руке.',
        },
        options: [
          { text: '이거는', correct: true },
          { text: '그거는', correct: false },
          { text: '저거는', correct: false },
        ],
      },
      {
        question: {
          ko: '이거는 공책___.',
          uz: '이거는 공책___.',
          en: '이거는 공책___.',
          ru: '이거는 공책___.',
        },
        options: [
          { text: '이에요', correct: true },
          { text: '예요', correct: false },
          { text: '있어요', correct: false },
        ],
      },
      {
        question: {
          ko: '저거는 시계___.',
          uz: '저거는 시계___.',
          en: '저거는 시계___.',
          ru: '저거는 시계___.',
        },
        options: [
          { text: '예요', correct: true },
          { text: '이에요', correct: false },
          { text: '이 있어요', correct: false },
        ],
      },
      {
        question: {
          ko: '멀리 있는 물건을 가리킬 때는?',
          uz: "Uzoqdagi narsani ko'rsatganda?",
          en: 'Pointing at something far from both of you?',
          ru: 'Указывая на далёкий предмет?',
        },
        options: [
          { text: '저거는', correct: true },
          { text: '이거는', correct: false },
          { text: '그거는', correct: false },
        ],
      },
      {
        question: {
          ko: '이름을 모를 때 무엇을 물어요?',
          uz: "Nomini bilmasangiz nima so'raysiz?",
          en: 'What do you ask when you do not know the name?',
          ru: 'Что спросить, если не знаете названия?',
        },
        options: [
          { text: '이거는 뭐예요?', correct: true },
          { text: '이거는 있어요?', correct: false },
          { text: '이거는 누구예요?', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 1-7. 요청 N 주세요 ─────────
  {
    code: 'request-juseyo',
    pattern: 'N 주세요',
    section: 1,
    order: 7,
    isActive: true,
    summary: {
      ko: '물건을 달라고 부탁해요. 가게에서 가장 많이 쓰는 말이에요.',
      uz: "Narsani so'rash. Do'konda eng ko'p ishlatiladigan gap.",
      en: 'Asks for something. The single most used line in a shop.',
      ru: 'Просьба дать что-то. Самая частая фраза в магазине.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '표현', uz: 'Ibora', en: 'Expression', ru: 'Выражение' },
      { ko: '가게', uz: "Do'kon", en: 'Shopping', ru: 'Магазин' },
    ],
    explanation: {
      ko: '물건 이름 뒤에 조사 없이 "주세요"를 바로 붙여요. 받침을 따질 필요가 없어서 유닛 2에서 가장 쉬운 문형이에요. 더 부드럽게 말하고 싶으면 사이에 "좀"을 넣어요.',
      uz: "Narsa nomidan keyin qo'shimchasiz to'g'ridan-to'g'ri \"주세요\". 받침 ga qaralmaydi — 2-bo'limdagi eng oson qolip. Yumshoqroq bo'lsin desangiz orasiga \"좀\".",
      en: 'Put 주세요 straight after the noun with no particle. 받침 does not matter, which makes it the easiest pattern in unit 2. Add 좀 in between to soften it.',
      ru: 'Ставьте 주세요 сразу после существительного, без частицы. 받침 не важен — самый простой шаблон юнита 2. Для мягкости вставьте 좀.',
    },
    conjugationRule: {
      ko: 'N + 주세요 (조사 없음)  ·  부드럽게: N + 좀 + 주세요',
      uz: "N + 주세요 (qo'shimchasiz)  ·  yumshoq: N + 좀 + 주세요",
      en: 'N + 주세요 (no particle)  ·  softer: N + 좀 + 주세요',
      ru: 'N + 주세요 (без частицы)  ·  мягче: N + 좀 + 주세요',
    },
    conjugations: [
      { base: '물', result: '물 주세요' },
      { base: '커피', result: '커피 주세요' },
      { base: '신문', result: '신문 좀 주세요' },
      { base: '지우개', result: '지우개 주세요' },
    ],
    examples: [
      {
        ko: '물 주세요.',
        highlight: '주세요',
        gloss: {
          ko: '물 주세요.',
          uz: 'Suv bering.',
          en: 'Water, please.',
          ru: 'Воды, пожалуйста.',
        },
      },
      {
        ko: '커피 좀 주세요.',
        highlight: '좀 주세요',
        gloss: {
          ko: '커피 좀 주세요.',
          uz: 'Iltimos, qahva bering.',
          en: 'Could I have a coffee, please?',
          ru: 'Дайте, пожалуйста, кофе.',
        },
      },
      {
        ko: '지우개하고 연필 주세요.',
        highlight: '주세요',
        gloss: {
          ko: '지우개하고 연필 주세요.',
          uz: "O'chirg'ich va qalam bering.",
          en: 'An eraser and a pencil, please.',
          ru: 'Дайте ластик и карандаш.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '어서 오세요. 뭐 드릴까요?',
        highlight: '어서 오세요',
        gloss: {
          ko: '어서 오세요. 뭐 드릴까요?',
          uz: 'Xush kelibsiz. Nima beray?',
          en: 'Welcome. What can I get you?',
          ru: 'Добро пожаловать. Что вам дать?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '신문 주세요.',
        highlight: '주세요',
        gloss: {
          ko: '신문 주세요.',
          uz: 'Gazeta bering.',
          en: 'A newspaper, please.',
          ru: 'Дайте газету.',
        },
      },
    ],
    similar: {
      pattern: '여기 있어요',
      note: {
        ko: '"주세요"로 부탁하면 상대는 물건을 건네며 "여기 있어요"라고 해요. 가게 대화는 이 두 마디로 끝나요.',
        uz: '"주세요" desangiz, sotuvchi narsani uzatib "여기 있어요" deydi. Do\'kon suhbati shu ikki gap.',
        en: 'You say 주세요; they hand it over saying 여기 있어요. Those two lines close a shop exchange.',
        ru: 'Вы говорите 주세요, вам подают со словами 여기 있어요. Этими двумя фразами разговор и заканчивается.',
      },
    },
    cautions: [
      {
        ko: '"주세요" 앞에는 "이/가"나 "은/는"을 붙이지 않아요. "물이 주세요"는 틀려요.',
        uz: '"주세요" oldiga "이/가" yoki "은/는" qo\'yilmaydi. "물이 주세요" xato.',
        en: 'No 이/가 or 은/는 before 주세요. "물이 주세요" is wrong.',
        ru: 'Перед 주세요 не ставят 이/가 и 은/는. «물이 주세요» — ошибка.',
      },
      {
        ko: '있는지 먼저 물을 때는 "N 있어요?", 달라고 할 때는 "N 주세요"예요. 순서를 바꾸면 어색해요.',
        uz: 'Avval "N 있어요?" deb so\'raladi, keyin "N 주세요". Tartibni almashtirsangiz g\'aliz.',
        en: 'First ask N 있어요?, then say N 주세요. Reversing the order sounds strange.',
        ru: 'Сначала N 있어요?, потом N 주세요. Обратный порядок звучит странно.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '물___ 주세요.',
          uz: '물___ 주세요.',
          en: '물___ 주세요.',
          ru: '물___ 주세요.',
        },
        options: [
          { text: '(조사 없음)', correct: true },
          { text: '이', correct: false },
          { text: '은', correct: false },
        ],
      },
      {
        question: {
          ko: '더 부드럽게 부탁하려면 무엇을 넣어요?',
          uz: "Yumshoqroq so'rash uchun nima qo'shiladi?",
          en: 'What do you insert to soften the request?',
          ru: 'Что вставить, чтобы просьба звучала мягче?',
        },
        options: [
          { text: '좀', correct: true },
          { text: '도', correct: false },
          { text: '만', correct: false },
        ],
      },
      {
        question: {
          ko: '가게에서 신문을 사고 싶어요.',
          uz: "Do'kondan gazeta olmoqchisiz.",
          en: 'You want to buy a newspaper.',
          ru: 'Вы хотите купить газету.',
        },
        options: [
          { text: '신문 주세요.', correct: true },
          { text: '신문이 주세요.', correct: false },
          { text: '신문은 주세요.', correct: false },
        ],
      },
      {
        question: {
          ko: '물건을 건네주면서 하는 말은?',
          uz: 'Narsani uzatayotganda nima deyiladi?',
          en: 'What do you say while handing something over?',
          ru: 'Что говорят, передавая вещь?',
        },
        options: [
          { text: '여기 있어요.', correct: true },
          { text: '어서 오세요.', correct: false },
          { text: '뭐예요?', correct: false },
        ],
      },
      {
        question: {
          ko: '두 가지를 함께 달라고 할 때는?',
          uz: "Ikkitasini birga so'raganda?",
          en: 'Asking for two things at once?',
          ru: 'Просите сразу две вещи?',
        },
        options: [
          { text: '볼펜하고 공책 주세요.', correct: true },
          { text: '볼펜이 공책 주세요.', correct: false },
          { text: '볼펜 공책이 주세요.', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 1-8. 나열 N하고 N · N과/와 N ─────────
  {
    code: 'and-hago-gwa-wa',
    pattern: 'N하고 N · N과/와 N',
    section: 1,
    order: 8,
    isActive: true,
    summary: {
      ko: '두 가지를 나란히 이어요. 말할 때는 "하고", 글로 쓸 때는 "과/와"를 써요.',
      uz: 'Ikkitasini bog\'laydi. Gapirganda "하고", yozganda "과/와".',
      en: 'Links two nouns. 하고 in speech, 과/와 in writing.',
      ru: 'Соединяет два существительных. В речи — 하고, на письме — 과/와.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '조사', uz: "Qo'shimcha", en: 'Particle', ru: 'Частица' },
      { ko: '나열', uz: "Ro'yxat", en: 'Listing', ru: 'Перечисление' },
    ],
    explanation: {
      ko: '"하고"는 받침을 따지지 않고 아무 말 뒤에나 붙어요. "과/와"는 받침이 있으면 "과", 없으면 "와"예요. 뜻은 같고 자리만 달라요 — 말할 때는 "하고", 글에서는 "과/와"가 자연스러워요. 조사는 마지막 물건에만 붙여요.',
      uz: '"하고" 받침 ga qaramay har qanday so\'zga qo\'shiladi. "과/와" — undosh bor "과", yo\'q "와". Ma\'nosi bir xil, faqat uslub farq qiladi. Qo\'shimcha faqat oxirgi narsaga qo\'yiladi.',
      en: '하고 attaches to anything regardless of 받침. 과/와 splits: 과 after a consonant, 와 after a vowel. Same meaning, different register — 하고 in speech, 과/와 in writing. The case particle goes only on the last item.',
      ru: '하고 присоединяется к любому слову независимо от 받침. 과/와 зависит: 과 после согласного, 와 после гласного. Смысл один, отличается стиль. Падежная частица — только у последнего слова.',
    },
    conjugationRule: {
      ko: '받침 O + 과  ·  받침 X + 와  ·  받침 상관없이 하고',
      uz: "받침 bor + 과  ·  받침 yo'q + 와  ·  har doim 하고",
      en: 'final consonant + 과  ·  no final consonant + 와  ·  하고 always works',
      ru: 'есть согласный + 과  ·  нет + 와  ·  하고 всегда подходит',
    },
    conjugations: [
      { base: '학생', result: '학생과' },
      { base: '지우개', result: '지우개와' },
      { base: '텔레비전', result: '텔레비전과' },
      { base: '침대', result: '침대와' },
    ],
    examples: [
      {
        ko: '볼펜하고 공책이 있어요.',
        highlight: '볼펜하고',
        gloss: {
          ko: '볼펜하고 공책이 있어요.',
          uz: 'Ruchka va daftar bor.',
          en: 'There is a pen and a notebook.',
          ru: 'Есть ручка и тетрадь.',
        },
      },
      {
        ko: '지우개와 연필이 있어요.',
        highlight: '지우개와',
        gloss: {
          ko: '지우개와 연필이 있어요.',
          uz: "O'chirg'ich va qalam bor.",
          en: 'There is an eraser and a pencil.',
          ru: 'Есть ластик и карандаш.',
        },
      },
      {
        ko: '텔레비전과 냉장고가 없어요.',
        highlight: '텔레비전과',
        gloss: {
          ko: '텔레비전과 냉장고가 없어요.',
          uz: "Televizor va muzlatgich yo'q.",
          en: 'There is no television and no refrigerator.',
          ru: 'Нет ни телевизора, ни холодильника.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '가방 안에 뭐가 있어요?',
        highlight: '뭐가',
        gloss: {
          ko: '가방 안에 뭐가 있어요?',
          uz: 'Sumkada nima bor?',
          en: 'What is in your bag?',
          ru: 'Что в сумке?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '지갑하고 휴대폰이 있어요.',
        highlight: '지갑하고',
        gloss: {
          ko: '지갑하고 휴대폰이 있어요.',
          uz: 'Hamyon va telefon bor.',
          en: 'A wallet and a phone.',
          ru: 'Кошелёк и телефон.',
        },
      },
    ],
    similar: {
      pattern: 'N도',
      note: {
        ko: '"하고"는 한 문장 안에서 두 물건을 잇고, "도"는 앞 문장에 하나를 더 얹어요. "볼펜하고 공책이 있어요" ↔ "볼펜이 있어요. 공책도 있어요."',
        uz: '"하고" bir gap ichida bog\'laydi, "도" oldingi gapga qo\'shimcha qiladi.',
        en: '하고 joins two items inside one sentence; 도 adds one more on top of the previous sentence.',
        ru: '하고 соединяет внутри одного предложения, 도 добавляет ещё одно к предыдущему.',
      },
    },
    cautions: [
      {
        ko: '조사는 마지막 물건에만 붙여요. "볼펜이하고 공책이 있어요"는 틀려요.',
        uz: 'Qo\'shimcha faqat oxirgisiga. "볼펜이하고 공책이 있어요" xato.',
        en: 'The case particle goes on the last item only. "볼펜이하고 공책이 있어요" is wrong.',
        ru: 'Падежная частица — только у последнего. «볼펜이하고 공책이 있어요» — ошибка.',
      },
      {
        ko: '"과"와 "와"를 바꿔 쓰면 바로 어색해져요. "침대과"나 "학생와" 같은 말은 없어요.',
        uz: '"과" va "와" almashtirilsa darrov g\'aliz. "침대과", "학생와" degan so\'zlar yo\'q.',
        en: 'Swapping 과 and 와 sounds wrong immediately. There is no 침대과 or 학생와.',
        ru: 'Перепутать 과 и 와 сразу заметно. Нет ни «침대과», ни «학생와».',
      },
    ],
    quiz: [
      {
        question: {
          ko: '학생___ 선생님입니다.',
          uz: '학생___ 선생님입니다.',
          en: '학생___ 선생님입니다.',
          ru: '학생___ 선생님입니다.',
        },
        options: [
          { text: '과', correct: true },
          { text: '와', correct: false },
          { text: '이', correct: false },
        ],
      },
      {
        question: {
          ko: '침대___ 책상이 있어요.',
          uz: '침대___ 책상이 있어요.',
          en: '침대___ 책상이 있어요.',
          ru: '침대___ 책상이 있어요.',
        },
        options: [
          { text: '와', correct: true },
          { text: '과', correct: false },
          { text: '은', correct: false },
        ],
      },
      {
        question: {
          ko: '말할 때 받침을 따지지 않고 쓸 수 있는 것은?',
          uz: 'Gapirganda 받침 ga qaramay ishlatiladigani?',
          en: 'Which one works in speech regardless of 받침?',
          ru: 'Что в речи работает независимо от 받침?',
        },
        options: [
          { text: '하고', correct: true },
          { text: '과', correct: false },
          { text: '와', correct: false },
        ],
      },
      {
        question: {
          ko: '볼펜___ 공책이 있어요. (말할 때)',
          uz: "볼펜___ 공책이 있어요. (og'zaki)",
          en: '볼펜___ 공책이 있어요. (spoken)',
          ru: '볼펜___ 공책이 있어요. (в речи)',
        },
        options: [
          { text: '하고', correct: true },
          { text: '이하고', correct: false },
          { text: '가', correct: false },
        ],
      },
      {
        question: {
          ko: '조사 "이/가"는 어디에 붙여요?',
          uz: '"이/가" qayerga qo\'yiladi?',
          en: 'Where does the particle 이/가 go?',
          ru: 'Куда ставится частица 이/가?',
        },
        options: [
          { text: '마지막 물건에만', correct: true },
          { text: '두 물건 모두에', correct: false },
          { text: '첫 물건에만', correct: false },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 섹션 1 · 3과 — 한국어를 공부해요
  // 동사를 처음 쓰는 과. 활용 → 대상 → 장소 → 부정 순서로,
  // 문장이 길어지는 순서와 같다.
  // ═══════════════════════════════════════════════════════════

  // ───────── 섹션 1-9. V-아요/어요 ─────────
  {
    code: 'verb-ayo-eoyo',
    pattern: 'V-아요/어요',
    section: 1,
    order: 9,
    isActive: true,
    summary: {
      ko: '지금 하는 일을 말할 때 쓰는 가장 기본 어미예요. 사전에 실린 "-다"는 말할 때 쓰지 않아요.',
      uz: 'Hozir qilayotgan ishni aytishda ishlatiladigan asosiy qo\'shimcha. Lug\'atdagi "-다" nutqda ishlatilmaydi.',
      en: 'The basic ending for saying what you are doing now. The dictionary form -다 is never spoken.',
      ru: 'Основное окончание для описания текущего действия. Словарная форма -다 в речи не используется.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '어미', uz: "Qo'shimcha", en: 'Ending', ru: 'Окончание' },
    ],
    explanation: {
      ko: '"-다"를 떼고 남은 부분의 마지막 모음을 봐요. ㅏ 나 ㅗ 면 "아요", 그 밖의 모음이면 "어요"를 붙여요. "하다"만 예외로 통째로 "해요"가 돼요. 같은 모음이 겹치면 하나로 줄고(자+아요→자요), ㅗ+ㅏ는 ㅘ(보+아요→봐요), ㅣ+ㅓ는 ㅕ(마시+어요→마셔요), ㅜ+ㅓ는 ㅝ(배우+어요→배워요)로 합쳐져요.',
      uz: '"-다" olib tashlanadi va qolgan qismning oxirgi unlisiga qaraladi. ㅏ yoki ㅗ bo\'lsa "아요", boshqa unli bo\'lsa "어요". Faqat "하다" istisno — butunlay "해요" bo\'ladi. Bir xil unli takrorlansa qisqaradi (자+아요→자요), ㅗ+ㅏ→ㅘ, ㅣ+ㅓ→ㅕ, ㅜ+ㅓ→ㅝ.',
      en: 'Drop -다 and look at the last vowel of what remains. If it is ㅏ or ㅗ, add 아요; any other vowel takes 어요. Only 하다 is irregular and becomes 해요. Identical vowels merge (자+아요→자요), and ㅗ+ㅏ→ㅘ, ㅣ+ㅓ→ㅕ, ㅜ+ㅓ→ㅝ.',
      ru: 'Уберите -다 и посмотрите на последнюю гласную основы. Если это ㅏ или ㅗ — добавьте 아요, иначе 어요. Только 하다 нерегулярен и даёт 해요. Одинаковые гласные сливаются (자+아요→자요), а ㅗ+ㅏ→ㅘ, ㅣ+ㅓ→ㅕ, ㅜ+ㅓ→ㅝ.',
    },
    conjugationRule: {
      ko: 'ㅏ·ㅗ + 아요  ·  그 밖의 모음 + 어요  ·  하다 → 해요',
      uz: 'ㅏ·ㅗ + 아요  ·  boshqa unli + 어요  ·  하다 → 해요',
      en: 'ㅏ or ㅗ + 아요  ·  other vowels + 어요  ·  하다 → 해요',
      ru: 'ㅏ или ㅗ + 아요  ·  прочие гласные + 어요  ·  하다 → 해요',
    },
    conjugations: [
      { base: '자다', result: '자요' },
      { base: '보다', result: '봐요' },
      { base: '먹다', result: '먹어요' },
      { base: '마시다', result: '마셔요' },
      { base: '배우다', result: '배워요' },
      { base: '공부하다', result: '공부해요' },
    ],
    examples: [
      {
        ko: '저는 지금 자요.',
        highlight: '자요',
        gloss: {
          ko: '저는 지금 자요.',
          uz: 'Men hozir uxlayapman.',
          en: 'I am sleeping now.',
          ru: 'Я сейчас сплю.',
        },
      },
      {
        ko: '친구를 만나요.',
        highlight: '만나요',
        gloss: {
          ko: '친구를 만나요.',
          uz: "Do'st bilan uchrashaman.",
          en: 'I meet a friend.',
          ru: 'Я встречаюсь с другом.',
        },
      },
      {
        ko: '한국어를 공부해요.',
        highlight: '공부해요',
        gloss: {
          ko: '한국어를 공부해요.',
          uz: "Koreys tilini o'rganaman.",
          en: 'I study Korean.',
          ru: 'Я учу корейский.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '지금 뭐 해요?',
        highlight: '해요',
        gloss: {
          ko: '지금 뭐 해요?',
          uz: 'Hozir nima qilyapsiz?',
          en: 'What are you doing now?',
          ru: 'Что вы сейчас делаете?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '책을 읽어요.',
        highlight: '읽어요',
        gloss: {
          ko: '책을 읽어요.',
          uz: "Kitob o'qiyapman.",
          en: 'I am reading a book.',
          ru: 'Я читаю книгу.',
        },
      },
    ],
    similar: {
      pattern: '-았/었어요',
      note: {
        ko: '지난 일을 말할 때는 같은 자리에 "-았/었어요"를 넣어요. 모음을 보는 규칙도 똑같아요. 먹어요 → 먹었어요.',
        uz: "O'tgan ish uchun shu o'ringa \"-았/었어요\" qo'yiladi. Unliga qarash qoidasi ham bir xil: 먹어요 → 먹었어요.",
        en: 'For past events the same slot takes -았/었어요, and the vowel rule is identical: 먹어요 → 먹었어요.',
        ru: 'Для прошедшего в то же место ставится -았/었어요, правило гласной то же: 먹어요 → 먹었어요.',
      },
    },
    cautions: [
      {
        ko: '"보다"는 "보아요"가 아니라 "봐요"예요. 글로는 둘 다 보이지만 말할 때는 줄인 쪽만 써요.',
        uz: '"보다" — "보아요" emas, "봐요". Yozuvda ikkalasi uchrasa ham, nutqda faqat qisqasi ishlatiladi.',
        en: '보다 becomes 봐요, not 보아요. Both appear in writing, but only the contracted form is spoken.',
        ru: '보다 даёт 봐요, а не 보아요. На письме встречаются обе, но в речи только сокращённая.',
      },
      {
        ko: '"하다"가 붙은 말은 전부 "해요"예요. "공부하아요", "운동하어요" 같은 모양은 없어요.',
        uz: '"하다" qo\'shilgan so\'zlarning hammasi "해요". "공부하아요", "운동하어요" degan shakllar yo\'q.',
        en: 'Every word ending in 하다 becomes 해요. Forms like 공부하아요 or 운동하어요 do not exist.',
        ru: 'Все слова на 하다 дают 해요. Форм вроде 공부하아요 или 운동하어요 не существует.',
      },
      {
        ko: '"읽어요"는 [일거요]로 소리 나요. 소리 나는 대로 "일거요"라고 쓰면 안 돼요.',
        uz: '"읽어요" [일거요] bo\'lib eshitiladi, lekin "일거요" deb yozilmaydi.',
        en: '읽어요 sounds like [일거요], but you must not spell it that way.',
        ru: '읽어요 звучит как [일거요], но так писать нельзя.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '자다 → 저는 지금 ___.',
          uz: '자다 → 저는 지금 ___.',
          en: '자다 → 저는 지금 ___.',
          ru: '자다 → 저는 지금 ___.',
        },
        options: [
          { text: '자아요', correct: false },
          { text: '자요', correct: true },
          { text: '자어요', correct: false },
        ],
      },
      {
        question: {
          ko: '먹다 → 밥을 ___.',
          uz: '먹다 → 밥을 ___.',
          en: '먹다 → 밥을 ___.',
          ru: '먹다 → 밥을 ___.',
        },
        options: [
          { text: '먹아요', correct: false },
          { text: '먹어요', correct: true },
          { text: '먹여요', correct: false },
        ],
      },
      {
        question: {
          ko: '보다 → 영화를 ___.',
          uz: '보다 → 영화를 ___.',
          en: '보다 → 영화를 ___.',
          ru: '보다 → 영화를 ___.',
        },
        options: [
          { text: '보어요', correct: false },
          { text: '봐요', correct: true },
          { text: '보해요', correct: false },
        ],
      },
      {
        question: {
          ko: '공부하다 → 한국어를 ___.',
          uz: '공부하다 → 한국어를 ___.',
          en: '공부하다 → 한국어를 ___.',
          ru: '공부하다 → 한국어를 ___.',
        },
        options: [
          { text: '공부하아요', correct: false },
          { text: '공부해요', correct: true },
          { text: '공부하어요', correct: false },
        ],
      },
      {
        question: {
          ko: '마시다 → 커피를 ___.',
          uz: '마시다 → 커피를 ___.',
          en: '마시다 → 커피를 ___.',
          ru: '마시다 → 커피를 ___.',
        },
        options: [
          { text: '마시어요', correct: false },
          { text: '마셔요', correct: true },
          { text: '마시아요', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 1-10. 대상 N을/를 ─────────
  {
    code: 'obj-eul-reul',
    pattern: 'N을/를',
    section: 1,
    order: 10,
    isActive: true,
    summary: {
      ko: '동작이 닿는 대상을 표시해요. "무엇을" 하는지 알려 주는 조사예요.',
      uz: 'Harakat qaratilgan narsani bildiradi. "Nimani" qilishni ko\'rsatuvchi qo\'shimcha.',
      en: 'Marks the thing the action lands on — the "what" of the sentence.',
      ru: 'Отмечает объект действия — то, «что» делают.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '조사', uz: "Qo'shimcha", en: 'Particle', ru: 'Частица' },
    ],
    explanation: {
      ko: '앞 글자에 받침이 있으면 "을", 없으면 "를"을 붙여요. "은/는"과 규칙이 같지만 하는 일이 달라요. "은/는"은 문장이 무엇에 대한 것인지 알려 주고, "을/를"은 동작이 닿는 대상을 알려 줘요.',
      uz: 'Oldingi bo\'g\'inda undosh bo\'lsa "을", bo\'lmasa "를". Qoida "은/는" bilan bir xil, lekin vazifasi boshqa: "은/는" mavzuni, "을/를" harakat obyektini bildiradi.',
      en: 'Add 을 after a final consonant and 를 without one. The rule matches 은/는 but the job differs: 은/는 marks the topic, 을/를 marks the object the action reaches.',
      ru: 'После согласного — 을, без него — 를. Правило то же, что у 은/는, но роль другая: 은/는 — тема, 을/를 — объект действия.',
    },
    conjugationRule: {
      ko: '받침 O + 을  ·  받침 X + 를',
      uz: "받침 bor + 을  ·  받침 yo'q + 를",
      en: 'final consonant + 을  ·  no final consonant + 를',
      ru: 'есть согласный + 을  ·  нет + 를',
    },
    conjugations: [
      { base: '밥', result: '밥을' },
      { base: '책', result: '책을' },
      { base: '옷', result: '옷을' },
      { base: '커피', result: '커피를' },
      { base: '친구', result: '친구를' },
    ],
    examples: [
      {
        ko: '저는 밥을 먹어요.',
        highlight: '밥을',
        gloss: {
          ko: '저는 밥을 먹어요.',
          uz: 'Men ovqat yeyapman.',
          en: 'I eat a meal.',
          ru: 'Я ем.',
        },
      },
      {
        ko: '커피를 마셔요.',
        highlight: '커피를',
        gloss: {
          ko: '커피를 마셔요.',
          uz: 'Qahva ichaman.',
          en: 'I drink coffee.',
          ru: 'Я пью кофе.',
        },
      },
      {
        ko: '친구를 만나요.',
        highlight: '친구를',
        gloss: {
          ko: '친구를 만나요.',
          uz: "Do'st bilan uchrashaman.",
          en: 'I meet a friend.',
          ru: 'Я встречаюсь с другом.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '지금 뭐 해요?',
        highlight: '뭐',
        gloss: {
          ko: '지금 뭐 해요?',
          uz: 'Hozir nima qilyapsiz?',
          en: 'What are you doing now?',
          ru: 'Что вы сейчас делаете?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '신문을 읽어요.',
        highlight: '신문을',
        gloss: {
          ko: '신문을 읽어요.',
          uz: "Gazeta o'qiyapman.",
          en: 'I am reading a newspaper.',
          ru: 'Я читаю газету.',
        },
      },
    ],
    similar: {
      pattern: 'N은/는',
      note: {
        ko: '받침 규칙은 같지만 자리와 뜻이 달라요. "저는 밥을 먹어요"에서 "저는"이 말하는 사람, "밥을"이 먹는 대상이에요.',
        uz: '받침 qoidasi bir xil, lekin o\'rni va ma\'nosi boshqa. "저는 밥을 먹어요" da "저는" — gapiruvchi, "밥을" — yeyiladigan narsa.',
        en: 'Same final-consonant rule, different role. In 저는 밥을 먹어요, 저는 is the speaker and 밥을 is what gets eaten.',
        ru: 'Правило то же, роль другая. В 저는 밥을 먹어요 — 저는 говорящий, 밥을 — то, что едят.',
      },
    },
    cautions: [
      {
        ko: '"커피을", "밥를"처럼 뒤집어 쓰지 않게 마지막 글자만 보면 돼요. "커피"의 "피", "밥"의 "밥"을 보세요.',
        uz: '"커피을", "밥를" deb almashtirmaslik uchun faqat oxirgi bo\'g\'inga qarang.',
        en: 'To avoid 커피을 or 밥를, just look at the very last syllable of the noun.',
        ru: 'Чтобы не написать 커피을 или 밥를, смотрите только на последний слог.',
      },
      {
        ko: '"잡지"처럼 앞 글자에 받침이 있어도 마지막 글자 "지"에 받침이 없으면 "를"이에요. "잡지를"이 맞아요.',
        uz: '"잡지" kabi so\'zda oldingi bo\'g\'inda undosh bo\'lsa ham, oxirgi "지" da yo\'q — demak "를": "잡지를".',
        en: 'In a word like 잡지 the first syllable has a consonant, but the last one 지 does not — so it is 잡지를.',
        ru: 'В слове 잡지 согласный есть в первом слоге, но не в последнем 지 — значит 잡지를.',
      },
      {
        ko: '말할 때는 조사를 빼고 "밥 먹어요"라고도 해요. 하지만 글로 쓸 때는 넣는 게 기본이에요.',
        uz: 'Nutqda qo\'shimchani tushirib "밥 먹어요" deyish mumkin, lekin yozuvda qo\'shiladi.',
        en: 'In speech people drop it and say 밥 먹어요, but in writing you keep it.',
        ru: 'В речи частицу опускают: 밥 먹어요, но на письме её ставят.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '저는 밥___ 먹어요.',
          uz: '저는 밥___ 먹어요.',
          en: '저는 밥___ 먹어요.',
          ru: '저는 밥___ 먹어요.',
        },
        options: [
          { text: '을', correct: true },
          { text: '를', correct: false },
          { text: '이', correct: false },
        ],
      },
      {
        question: {
          ko: '커피___ 마셔요.',
          uz: '커피___ 마셔요.',
          en: '커피___ 마셔요.',
          ru: '커피___ 마셔요.',
        },
        options: [
          { text: '을', correct: false },
          { text: '를', correct: true },
          { text: '이', correct: false },
        ],
      },
      {
        question: {
          ko: '친구___ 만나요.',
          uz: '친구___ 만나요.',
          en: '친구___ 만나요.',
          ru: '친구___ 만나요.',
        },
        options: [
          { text: '을', correct: false },
          { text: '를', correct: true },
          { text: '가', correct: false },
        ],
      },
      {
        question: {
          ko: '책___ 읽어요.',
          uz: '책___ 읽어요.',
          en: '책___ 읽어요.',
          ru: '책___ 읽어요.',
        },
        options: [
          { text: '을', correct: true },
          { text: '를', correct: false },
          { text: '에', correct: false },
        ],
      },
      {
        question: {
          ko: '영화___ 봐요.',
          uz: '영화___ 봐요.',
          en: '영화___ 봐요.',
          ru: '영화___ 봐요.',
        },
        options: [
          { text: '을', correct: false },
          { text: '를', correct: true },
          { text: '이', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 1-11. 장소 N에서 ─────────
  {
    code: 'place-eseo',
    pattern: 'N에서',
    section: 1,
    order: 11,
    isActive: true,
    summary: {
      ko: '무엇을 하는 자리를 표시해요. "어디에서 해요?"에 대한 답이 되는 조사예요.',
      uz: 'Ish bajariladigan joyni bildiradi. "어디에서 해요?" savoliga javob bo\'ladigan qo\'shimcha.',
      en: 'Marks the place where something happens — the answer to 어디에서 해요?',
      ru: 'Отмечает место, где происходит действие — ответ на 어디에서 해요?',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '조사', uz: "Qo'shimcha", en: 'Particle', ru: 'Частица' },
    ],
    explanation: {
      ko: '장소 이름 뒤에 "에서"를 붙이면 그 자리에서 어떤 일을 한다는 뜻이 돼요. 받침이 있든 없든 모양은 그대로 "에서"예요. 이미 배운 "에"와 헷갈리기 쉬운데, "에"는 가는 방향이나 그냥 있는 자리를 가리키고 "에서"는 무엇인가를 하는 자리를 가리켜요.',
      uz: 'Joy nomi ortiga "에서" qo\'shilsa, o\'sha yerda ish bajarilishini bildiradi. Undosh bor-yo\'qligidan qat\'i nazar shakli o\'zgarmaydi. "에" yo\'nalish yoki turgan joyni, "에서" esa ish qilinadigan joyni bildiradi.',
      en: 'Attach 에서 to a place name to say the action happens there. The form never changes, with or without a final consonant. Compare 에, which marks a destination or mere location, while 에서 marks where an activity takes place.',
      ru: 'Присоедините 에서 к названию места — действие происходит там. Форма не меняется. Сравните с 에: оно указывает направление или простое нахождение, а 에서 — место действия.',
    },
    conjugationRule: {
      ko: '장소 + 에서 (받침과 상관없이 그대로)',
      uz: "Joy + 에서 (받침 ga bog'liq emas)",
      en: 'place + 에서 (unchanged either way)',
      ru: 'место + 에서 (форма не меняется)',
    },
    conjugations: [
      { base: '학교', result: '학교에서' },
      { base: '집', result: '집에서' },
      { base: '도서관', result: '도서관에서' },
      { base: '커피숍', result: '커피숍에서' },
    ],
    examples: [
      {
        ko: '도서관에서 공부해요.',
        highlight: '도서관에서',
        gloss: {
          ko: '도서관에서 공부해요.',
          uz: "Kutubxonada o'qiyman.",
          en: 'I study at the library.',
          ru: 'Я занимаюсь в библиотеке.',
        },
      },
      {
        ko: '식당에서 밥을 먹어요.',
        highlight: '식당에서',
        gloss: {
          ko: '식당에서 밥을 먹어요.',
          uz: 'Oshxonada ovqat yeyman.',
          en: 'I eat at a restaurant.',
          ru: 'Я ем в столовой.',
        },
      },
      {
        ko: '공원에서 운동해요.',
        highlight: '공원에서',
        gloss: {
          ko: '공원에서 운동해요.',
          uz: 'Parkda sport qilaman.',
          en: 'I exercise at the park.',
          ru: 'Я занимаюсь спортом в парке.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '어디에서 밥을 먹어요?',
        highlight: '어디에서',
        gloss: {
          ko: '어디에서 밥을 먹어요?',
          uz: 'Qayerda ovqat yeysiz?',
          en: 'Where do you eat?',
          ru: 'Где вы едите?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '학생 식당에서 먹어요.',
        highlight: '식당에서',
        gloss: {
          ko: '학생 식당에서 먹어요.',
          uz: 'Talabalar oshxonasida yeyman.',
          en: 'I eat at the student cafeteria.',
          ru: 'Я ем в студенческой столовой.',
        },
      },
    ],
    similar: {
      pattern: 'N에',
      note: {
        ko: '"집에 가요"는 집이 목적지이고, "집에서 자요"는 집이 자는 자리예요. 동사가 움직임이면 "에", 그 자리에서 하는 일이면 "에서"라고 생각하면 쉬워요.',
        uz: '"집에 가요" — uy manzil, "집에서 자요" — uy uxlash joyi. Fe\'l harakat bo\'lsa "에", o\'sha joyda bajariladigan ish bo\'lsa "에서".',
        en: 'In 집에 가요 the home is the destination; in 집에서 자요 it is where you sleep. Movement takes 에, an activity in place takes 에서.',
        ru: 'В 집에 가요 дом — цель, в 집에서 자요 — место сна. Движение требует 에, действие на месте — 에서.',
      },
    },
    cautions: [
      {
        ko: '"학교에 공부해요"는 틀려요. 공부는 그 자리에서 하는 일이니까 "학교에서 공부해요"예요.',
        uz: '"학교에 공부해요" noto\'g\'ri. O\'qish o\'sha joyda bajariladi — "학교에서 공부해요".',
        en: '학교에 공부해요 is wrong. Studying happens in place, so it is 학교에서 공부해요.',
        ru: '학교에 공부해요 неверно. Учёба происходит на месте — 학교에서 공부해요.',
      },
      {
        ko: '한 문장에 조사가 둘 나올 수 있어요. "시장에서 옷을 사요"에서 장소에는 "에서", 물건에는 "을"이 붙어요.',
        uz: 'Bir gapda ikkita qo\'shimcha bo\'lishi mumkin: "시장에서 옷을 사요" — joyga "에서", narsaga "을".',
        en: 'One sentence can carry both: in 시장에서 옷을 사요 the place takes 에서 and the object takes 을.',
        ru: 'В одном предложении могут быть обе: в 시장에서 옷을 사요 место — 에서, предмет — 을.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '저는 도서관___ 공부해요.',
          uz: '저는 도서관___ 공부해요.',
          en: '저는 도서관___ 공부해요.',
          ru: '저는 도서관___ 공부해요.',
        },
        options: [
          { text: '에서', correct: true },
          { text: '에', correct: false },
          { text: '을', correct: false },
        ],
      },
      {
        question: {
          ko: '공원___ 운동해요.',
          uz: '공원___ 운동해요.',
          en: '공원___ 운동해요.',
          ru: '공원___ 운동해요.',
        },
        options: [
          { text: '에', correct: false },
          { text: '에서', correct: true },
          { text: '를', correct: false },
        ],
      },
      {
        question: {
          ko: '집___ 가요.',
          uz: '집___ 가요.',
          en: '집___ 가요.',
          ru: '집___ 가요.',
        },
        options: [
          { text: '에서', correct: false },
          { text: '에', correct: true },
          { text: '를', correct: false },
        ],
      },
      {
        question: {
          ko: '시장___ 옷을 사요.',
          uz: '시장___ 옷을 사요.',
          en: '시장___ 옷을 사요.',
          ru: '시장___ 옷을 사요.',
        },
        options: [
          { text: '에', correct: false },
          { text: '에서', correct: true },
          { text: '을', correct: false },
        ],
      },
      {
        question: {
          ko: '극장___ 영화를 봐요.',
          uz: '극장___ 영화를 봐요.',
          en: '극장___ 영화를 봐요.',
          ru: '극장___ 영화를 봐요.',
        },
        options: [
          { text: '에서', correct: true },
          { text: '에', correct: false },
          { text: '를', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 1-12. 부정 안 V ─────────
  {
    code: 'neg-an',
    pattern: '안 V',
    section: 1,
    order: 12,
    isActive: true,
    summary: {
      ko: '하지 않는 일을 말할 때 동사 바로 앞에 "안"을 놓아요.',
      uz: 'Qilinmaydigan ishni aytishda fe\'lning bevosita oldiga "안" qo\'yiladi.',
      en: 'Put 안 directly in front of the verb to say you do not do it.',
      ru: 'Поставьте 안 прямо перед глаголом, чтобы сказать, что действие не совершается.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '부정', uz: 'Inkor', en: 'Negation', ru: 'Отрицание' },
    ],
    explanation: {
      ko: '동사나 형용사 바로 앞에 "안"을 놓으면 부정이 돼요. 다만 "공부하다"처럼 명사와 "하다"가 붙어서 만들어진 말은 그 사이에 "안"이 들어가서 "공부 안 해요"가 돼요. "안 공부해요"라고 하지 않아요.',
      uz: 'Fe\'l yoki sifat oldiga "안" qo\'yilsa inkor bo\'ladi. Lekin "공부하다" kabi ot+하다 so\'zlarida "안" o\'rtaga kiradi: "공부 안 해요". "안 공부해요" deyilmaydi.',
      en: 'Placing 안 right before a verb or adjective makes it negative. But for noun+하다 words like 공부하다, the 안 goes between them: 공부 안 해요, never 안 공부해요.',
      ru: '안 перед глаголом или прилагательным даёт отрицание. Но у слов вида существительное+하다 (например 공부하다) 안 встаёт внутрь: 공부 안 해요, а не 안 공부해요.',
    },
    conjugationRule: {
      ko: '안 + 동사  ·  명사하다 → 명사 안 하다',
      uz: "안 + fe'l  ·  ot+하다 → ot 안 하다",
      en: '안 + verb  ·  noun하다 → noun 안 하다',
      ru: '안 + глагол  ·  сущ.하다 → сущ. 안 하다',
    },
    conjugations: [
      { base: '먹다', result: '안 먹어요' },
      { base: '자다', result: '안 자요' },
      { base: '보다', result: '안 봐요' },
      { base: '공부하다', result: '공부 안 해요' },
      { base: '운동하다', result: '운동 안 해요' },
    ],
    examples: [
      {
        ko: '저는 고기를 안 먹어요.',
        highlight: '안 먹어요',
        gloss: {
          ko: '저는 고기를 안 먹어요.',
          uz: "Men go'sht yemayman.",
          en: 'I do not eat meat.',
          ru: 'Я не ем мясо.',
        },
      },
      {
        ko: '오늘 공부 안 해요.',
        highlight: '공부 안 해요',
        gloss: {
          ko: '오늘 공부 안 해요.',
          uz: "Bugun o'qimayman.",
          en: 'I am not studying today.',
          ru: 'Сегодня я не учусь.',
        },
      },
      {
        ko: '드라마를 안 봐요.',
        highlight: '안 봐요',
        gloss: {
          ko: '드라마를 안 봐요.',
          uz: "Serial ko'rmayman.",
          en: 'I do not watch dramas.',
          ru: 'Я не смотрю сериалы.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '커피를 마셔요?',
        highlight: '마셔요',
        gloss: {
          ko: '커피를 마셔요?',
          uz: 'Qahva ichasizmi?',
          en: 'Do you drink coffee?',
          ru: 'Вы пьёте кофе?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아니요, 안 마셔요.',
        highlight: '안 마셔요',
        gloss: {
          ko: '아니요, 안 마셔요.',
          uz: "Yo'q, ichmayman.",
          en: 'No, I do not.',
          ru: 'Нет, не пью.',
        },
      },
    ],
    similar: {
      pattern: '아니요',
      note: {
        ko: '"아니요"는 질문에 대한 대답이고, "안"은 문장 안에서 동사를 부정해요. 둘은 같이 써요. "커피를 마셔요?" → "아니요, 안 마셔요."',
        uz: '"아니요" — savolga javob, "안" — gap ichidagi inkor. Ikkisi birga ishlatiladi: "아니요, 안 마셔요."',
        en: '아니요 answers a question; 안 negates the verb inside the sentence. They work together: 아니요, 안 마셔요.',
        ru: '아니요 — ответ на вопрос, 안 — отрицание внутри предложения. Они используются вместе: 아니요, 안 마셔요.',
      },
    },
    cautions: [
      {
        ko: '"안 공부해요"는 틀려요. "공부"와 "해요" 사이를 벌리고 "공부 안 해요"라고 해야 해요. 운동·숙제·일·아르바이트도 마찬가지예요.',
        uz: '"안 공부해요" noto\'g\'ri. "공부" bilan "해요" orasiga qo\'yiladi: "공부 안 해요". 운동·숙제·일 uchun ham shunday.',
        en: '안 공부해요 is wrong — split it into 공부 안 해요. The same goes for 운동, 숙제, 일 and 아르바이트.',
        ru: '안 공부해요 неверно — нужно 공부 안 해요. То же с 운동, 숙제, 일 и 아르바이트.',
      },
      {
        ko: '"아니요"를 문장 안에 넣어 동사를 부정할 수는 없어요. "저는 아니요 먹어요"는 말이 안 돼요.',
        uz: "\"아니요\" ni gap ichiga qo'yib fe'lni inkor qilib bo'lmaydi. \"저는 아니요 먹어요\" — noto'g'ri.",
        en: 'You cannot use 아니요 inside a sentence to negate a verb. 저는 아니요 먹어요 is not Korean.',
        ru: 'Нельзя использовать 아니요 внутри предложения для отрицания глагола.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '저는 고기를 ___ 먹어요.',
          uz: '저는 고기를 ___ 먹어요.',
          en: '저는 고기를 ___ 먹어요.',
          ru: '저는 고기를 ___ 먹어요.',
        },
        options: [
          { text: '안', correct: true },
          { text: '아니요', correct: false },
          { text: '도', correct: false },
        ],
      },
      {
        question: {
          ko: '오늘 공부 ___ 해요.',
          uz: '오늘 공부 ___ 해요.',
          en: '오늘 공부 ___ 해요.',
          ru: '오늘 공부 ___ 해요.',
        },
        options: [
          { text: '를', correct: false },
          { text: '안', correct: true },
          { text: '아니요', correct: false },
        ],
      },
      {
        question: {
          ko: '맞는 문장을 고르세요.',
          uz: "To'g'ri gapni tanlang.",
          en: 'Choose the correct sentence.',
          ru: 'Выберите правильное предложение.',
        },
        options: [
          { text: '안 공부해요', correct: false },
          { text: '공부 안 해요', correct: true },
          { text: '공부해 안요', correct: false },
        ],
      },
      {
        question: {
          ko: '차를 ___ 마셔요.',
          uz: '차를 ___ 마셔요.',
          en: '차를 ___ 마셔요.',
          ru: '차를 ___ 마셔요.',
        },
        options: [
          { text: '아니요', correct: false },
          { text: '안', correct: true },
          { text: '를', correct: false },
        ],
      },
      {
        question: {
          ko: '운동 ___ 해요.',
          uz: '운동 ___ 해요.',
          en: '운동 ___ 해요.',
          ru: '운동 ___ 해요.',
        },
        options: [
          { text: '안', correct: true },
          { text: '아니요', correct: false },
          { text: '를', correct: false },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // 섹션 1 · 4과
  // ═══════════════════════════════════════════════════════════

  // ───────── 섹션 1-13. 지시 여기가 N이에요/예요 ─────────
  {
    code: 'here-is-n',
    pattern: '여기가 N이에요/예요',
    section: 1,
    order: 13,
    isActive: true,
    summary: {
      ko: '지금 서 있는 자리가 어떤 곳인지 말해요.',
      uz: 'Turgan joyingiz qanday joy ekanini aytadi.',
      en: 'Says what the place you are standing in is.',
      ru: 'Говорит, что это за место, где вы стоите.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      {
        ko: '지시어',
        uz: "Ko'rsatish",
        en: 'Demonstrative',
        ru: 'Указательное',
      },
      { ko: '장소', uz: 'Joy', en: 'Place', ru: 'Место' },
    ],
    explanation: {
      ko: '내가 있는 자리는 "여기", 상대가 있는 자리는 "거기", 둘 다에게서 먼 자리는 "저기"예요. 물건을 가리키는 이거·그거·저거와 짝을 이뤄요. 뒤에는 유닛 2에서 배운 "N이에요/예요"를 그대로 붙이고, 모를 때는 "여기가 어디예요?"로 물어요.',
      uz: 'Men turgan joy — "여기", suhbatdosh joyi — "거기", ikkalasidan uzoq — "저기". 이거·그거·저거 bilan juft. Ortidan "N이에요/예요"; so\'rash uchun "여기가 어디예요?".',
      en: 'Where I stand is 여기, where you stand is 거기, far from both is 저기 — the place counterparts of 이거·그거·저거. Attach N이에요/예요, and ask with 여기가 어디예요?',
      ru: 'Где я — 여기, где вы — 거기, далеко от обоих — 저기; это «местные» пары к 이거·그거·저거. Дальше N이에요/예요, а вопрос — 여기가 어디예요?',
    },
    conjugationRule: {
      ko: '받침 O + 이에요  ·  받침 X + 예요',
      uz: "받침 bor + 이에요  ·  받침 yo'q + 예요",
      en: 'final consonant + 이에요  ·  no final consonant + 예요',
      ru: 'есть согласный + 이에요  ·  нет + 예요',
    },
    conjugations: [
      { base: '공항', result: '공항이에요' },
      { base: '가게', result: '가게예요' },
      { base: '미용실', result: '미용실이에요' },
      { base: '학교', result: '학교예요' },
    ],
    examples: [
      {
        ko: '여기가 공항이에요.',
        highlight: '여기가',
        gloss: {
          ko: '여기가 공항이에요.',
          uz: 'Bu yer — aeroport.',
          en: 'This place is the airport.',
          ru: 'Это аэропорт.',
        },
      },
      {
        ko: '저기가 은행이에요.',
        highlight: '저기가',
        gloss: {
          ko: '저기가 은행이에요.',
          uz: 'Anavi yer — bank.',
          en: 'That place over there is the bank.',
          ru: 'То место — банк.',
        },
      },
      {
        ko: '여기가 어디예요?',
        highlight: '어디예요',
        gloss: {
          ko: '여기가 어디예요?',
          uz: 'Bu yer qayer?',
          en: 'Where is this place?',
          ru: 'Что это за место?',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '여기가 인사동이에요?',
        highlight: '여기가',
        gloss: {
          ko: '여기가 인사동이에요?',
          uz: 'Bu yer Insadongmi?',
          en: 'Is this place Insa-dong?',
          ru: 'Это Инсадон?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 인사동이에요.',
        highlight: '인사동이에요',
        gloss: {
          ko: '네, 인사동이에요.',
          uz: 'Ha, bu Insadong.',
          en: 'Yes, it is Insa-dong.',
          ru: 'Да, это Инсадон.',
        },
      },
    ],
    similar: {
      pattern: 'N이 어디에 있어요?',
      note: {
        ko: '"여기가 어디예요?"는 내가 선 자리의 이름을 묻는 말이고, "우체국이 어디에 있어요?"는 어떤 건물의 자리를 묻는 말이에요. 방향이 정반대예요.',
        uz: '"여기가 어디예요?" — turgan joyning nomi; "우체국이 어디에 있어요?" — binoning joyi. Yo\'nalish teskari.',
        en: '여기가 어디예요? asks the name of where you stand; N이 어디에 있어요? asks the location of a building. Opposite directions.',
        ru: '여기가 어디예요? — название места, где вы стоите; N이 어디에 있어요? — где находится здание. Направления противоположны.',
      },
    },
    cautions: [
      {
        ko: '"여기가"에는 "이/가"가 붙어요. "여기는"은 다른 곳과 견줄 때만 써요.',
        uz: '"여기가" da "이/가"; "여기는" faqat qiyoslashda.',
        en: 'Use 여기가 with 이/가; 여기는 only when contrasting with another place.',
        ru: 'С 여기 идёт 이/가; 여기는 — только при противопоставлении.',
      },
      {
        ko: '대답할 때는 기준이 바뀌어요. 상대가 "여기가?"라고 물으면 나에게는 그곳이 "거기"예요.',
        uz: 'Javobda tayanch o\'zgaradi: u "여기가?" desa, siz uchun bu "거기".',
        en: 'The reference shifts when you answer: if they say 여기가?, from where you stand it is 거기.',
        ru: 'При ответе точка отсчёта меняется: если он говорит 여기가?, для вас это 거기.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '여기가 공항___.',
          uz: '여기가 공항___.',
          en: '여기가 공항___.',
          ru: '여기가 공항___.',
        },
        options: [
          { text: '이에요', correct: true },
          { text: '예요', correct: false },
          { text: '에 있어요', correct: false },
        ],
      },
      {
        question: {
          ko: '여기가 가게___.',
          uz: '여기가 가게___.',
          en: '여기가 가게___.',
          ru: '여기가 가게___.',
        },
        options: [
          { text: '예요', correct: true },
          { text: '이에요', correct: false },
          { text: '이 있어요', correct: false },
        ],
      },
      {
        question: {
          ko: '나와 상대 모두에게서 먼 자리는?',
          uz: 'Ikkalamizdan uzoq joy?',
          en: 'The place far from both of you?',
          ru: 'Место, далёкое от обоих?',
        },
        options: [
          { text: '저기', correct: true },
          { text: '여기', correct: false },
          { text: '거기', correct: false },
        ],
      },
      {
        question: {
          ko: '이 자리가 어떤 곳인지 물을 때는?',
          uz: "Bu joy qaysi joy ekanini so'rash?",
          en: 'How do you ask what this place is?',
          ru: 'Как спросить, что это за место?',
        },
        options: [
          { text: '여기가 어디예요?', correct: true },
          { text: '여기가 뭐예요?', correct: false },
          { text: '여기가 누구예요?', correct: false },
        ],
      },
      {
        question: {
          ko: '"여기" 뒤에 붙는 조사는?',
          uz: '"여기" ortidan qaysi qo\'shimcha?',
          en: 'Which particle follows 여기 in this pattern?',
          ru: 'Какая частица идёт после 여기?',
        },
        options: [
          { text: '가', correct: true },
          { text: '를', correct: false },
          { text: '에서', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 1-14. 위치 N에 있어요[없어요] ─────────
  {
    code: 'loc-e-isseoyo',
    pattern: 'N에 있어요[없어요]',
    section: 1,
    order: 14,
    isActive: true,
    summary: {
      ko: '무엇이 어느 자리에 있는지 말해요. 자리에는 "에"가 붙어요.',
      uz: 'Nima qayerda ekanini aytadi; joyga "에" qo\'shiladi.',
      en: 'Says where something is. The place takes 에.',
      ru: 'Говорит, где что-то находится; у места частица 에.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '조사', uz: "Qo'shimcha", en: 'Particle', ru: 'Частица' },
      { ko: '위치', uz: "O'rin", en: 'Location', ru: 'Расположение' },
    ],
    explanation: {
      ko: '물건이나 사람에는 "이/가"를 붙이고, 있는 자리에는 "에"를 붙여요. "에"는 받침을 따지지 않고 언제나 "에" 하나예요. 자리를 물을 때는 "어디"에도 똑같이 "에"가 붙어 "어디에 있어요?"가 돼요. 순서는 바꿔도 되고, 자리를 앞에 두면 "명동에 은행이 있어요"가 돼요.',
      uz: 'Narsa yoki odamga "이/가", joyga "에". "에" undoshga qaramaydi. So\'rash: "어디에 있어요?". Tartib almashsa ham bo\'ladi.',
      en: 'Things and people take 이/가; the place takes 에, which never changes for 받침. To ask, 어디 also takes 에 → 어디에 있어요? The order may be swapped.',
      ru: 'У предмета или человека 이/가, у места — 에, которое не зависит от 받침. Вопрос: 어디에 있어요? Порядок можно менять.',
    },
    conjugationRule: {
      ko: '무엇이 + 자리에 + 있어요[없어요]  ·  "에"는 받침과 무관',
      uz: "Nima + joyga 에 + 있어요[없어요]  ·  받침 ta'sir qilmaydi",
      en: 'thing이/가 + place에 + 있어요[없어요]  ·  에 never changes',
      ru: 'что-то이/가 + место에 + 있어요[없어요]  ·  에 неизменно',
    },
    conjugations: [
      { base: '명동', result: '명동에 있어요' },
      { base: '교실', result: '교실에 있어요' },
      { base: '여기', result: '여기에 있어요' },
      { base: '학교', result: '학교에 없어요' },
    ],
    examples: [
      {
        ko: '은행이 명동에 있어요.',
        highlight: '명동에',
        gloss: {
          ko: '은행이 명동에 있어요.',
          uz: 'Bank Myeongdongda.',
          en: 'The bank is in Myeongdong.',
          ru: 'Банк находится в Мёндоне.',
        },
      },
      {
        ko: '스티븐 씨가 교실에 없어요.',
        highlight: '교실에',
        gloss: {
          ko: '스티븐 씨가 교실에 없어요.',
          uz: "Stiven sinfda yo'q.",
          en: 'Steven is not in the classroom.',
          ru: 'Стивена нет в классе.',
        },
      },
      {
        ko: '명동에 은행이 있어요.',
        highlight: '명동에',
        gloss: {
          ko: '명동에 은행이 있어요.',
          uz: 'Myeongdongda bank bor.',
          en: 'There is a bank in Myeongdong.',
          ru: 'В Мёндоне есть банк.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '중국 대사관이 어디에 있어요?',
        highlight: '어디에',
        gloss: {
          ko: '중국 대사관이 어디에 있어요?',
          uz: 'Xitoy elchixonasi qayerda?',
          en: 'Where is the Chinese embassy?',
          ru: 'Где находится посольство Китая?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '명동에 있어요.',
        highlight: '명동에',
        gloss: {
          ko: '명동에 있어요.',
          uz: 'Myeongdongda.',
          en: 'It is in Myeongdong.',
          ru: 'В Мёндоне.',
        },
      },
    ],
    similar: {
      pattern: 'N에서',
      note: {
        ko: '"에"는 있는 자리와 가는 곳, "에서"는 무엇을 하는 자리예요. "학교에 가요"는 움직임, "학교에서 배워요"는 거기서 하는 일이에요.',
        uz: '"에" — turgan/boradigan joy; "에서" — ish qilinadigan joy. "학교에 가요" harakat, "학교에서 배워요" ish.',
        en: '에 marks where you are or head; 에서 marks where an action happens — 학교에 가요 vs 학교에서 배워요.',
        ru: '에 — где вы или куда идёте; 에서 — где происходит действие: 학교에 가요 против 학교에서 배워요.',
      },
    },
    cautions: [
      {
        ko: '"명동이 있어요"는 명동이라는 곳이 존재한다는 뜻이에요. 자리를 말하려면 반드시 "명동에 있어요"예요.',
        uz: '"명동이 있어요" — Myeongdong degan joy bor demak; joy uchun "명동에 있어요".',
        en: '명동이 있어요 means a Myeongdong exists; for location you must say 명동에 있어요.',
        ru: '«명동이 있어요» — что Мёндон существует; для места нужно 명동에 있어요.',
      },
      {
        ko: '"여기가 어디예요?"와 "N이 어디에 있어요?"를 헷갈리지 마세요. 앞은 자리 이름, 뒤는 건물 위치를 묻는 말이에요.',
        uz: '"여기가 어디예요?" va "N이 어디에 있어요?" ni aralashtirmang.',
        en: 'Do not mix up 여기가 어디예요? and N이 어디에 있어요? — one asks a name, the other a location.',
        ru: 'Не путайте 여기가 어디예요? и N이 어디에 있어요?: первое о названии, второе о расположении.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '은행이 명동___ 있어요.',
          uz: '은행이 명동___ 있어요.',
          en: '은행이 명동___ 있어요.',
          ru: '은행이 명동___ 있어요.',
        },
        options: [
          { text: '에', correct: true },
          { text: '이', correct: false },
          { text: '에서', correct: false },
        ],
      },
      {
        question: {
          ko: '스티븐 씨가 교실___ 없어요.',
          uz: '스티븐 씨가 교실___ 없어요.',
          en: '스티븐 씨가 교실___ 없어요.',
          ru: '스티븐 씨가 교실___ 없어요.',
        },
        options: [
          { text: '에', correct: true },
          { text: '가', correct: false },
          { text: '를', correct: false },
        ],
      },
      {
        question: {
          ko: '어떤 건물의 자리를 물을 때는?',
          uz: "Bino joyini so'rash?",
          en: 'How do you ask where a building is?',
          ru: 'Как спросить, где здание?',
        },
        options: [
          { text: '우체국이 어디에 있어요?', correct: true },
          { text: '우체국이 어디예요?', correct: false },
          { text: '우체국이 뭐예요?', correct: false },
        ],
      },
      {
        question: {
          ko: '"에"는 받침에 따라 모양이 바뀌나요?',
          uz: '"에" undoshga qarab o\'zgaradimi?',
          en: 'Does 에 change shape depending on 받침?',
          ru: 'Меняется ли 에 в зависимости от 받침?',
        },
        options: [
          { text: '아니요, 언제나 "에"예요', correct: true },
          { text: '네, 받침이 있으면 "이에"예요', correct: false },
          { text: '네, 받침이 없으면 "예"예요', correct: false },
        ],
      },
      {
        question: {
          ko: '"명동이 있어요"는 무슨 뜻이에요?',
          uz: '"명동이 있어요" nima degani?',
          en: 'What does 명동이 있어요 mean?',
          ru: 'Что значит «명동이 있어요»?',
        },
        options: [
          { text: '명동이라는 곳이 존재한다', correct: true },
          { text: '명동에 자리한다', correct: false },
          { text: '명동으로 간다', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 1-15. 이동 N에 가요[와요] ─────────
  {
    code: 'motion-e-gayo',
    pattern: 'N에 가요[와요]',
    section: 1,
    order: 15,
    isActive: true,
    summary: {
      ko: '어디로 움직이는지 말해요. 가는 곳에도 "에"가 붙어요.',
      uz: 'Qayerga harakat qilishni aytadi; boradigan joyga ham "에".',
      en: 'Says where you are heading. The destination also takes 에.',
      ru: 'Говорит, куда вы движетесь; у направления тоже 에.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '동사', uz: "Fe'l", en: 'Verb', ru: 'Глагол' },
      { ko: '이동', uz: 'Harakat', en: 'Movement', ru: 'Движение' },
    ],
    explanation: {
      ko: '"가요"는 말하는 사람에게서 멀어지는 움직임, "와요"는 말하는 사람 쪽으로 가까워지는 움직임이에요. 같은 장면도 누가 말하느냐에 따라 갈려요. 내가 한국에 있으면 친구는 한국에 "와요"이고, 내가 밖에 있으면 "가요"예요. 안 갈 때는 앞에 "안"을 붙여 "안 가요·안 와요"라고 해요.',
      uz: '"가요" — so\'zlovchidan uzoqlashish, "와요" — unga yaqinlashish. Kim gapirayotganiga qarab o\'zgaradi. Inkor uchun oldiga "안".',
      en: '가요 is motion away from the speaker, 와요 is motion toward the speaker — the same scene flips depending on who is talking. Negate with 안 in front.',
      ru: '가요 — движение от говорящего, 와요 — к говорящему; одна и та же сцена меняется в зависимости от того, кто говорит. Отрицание — 안 перед глаголом.',
    },
    conjugationRule: {
      ko: '자리에 + 가요 (멀어짐)  ·  자리에 + 와요 (가까워짐)  ·  안 + 가요/와요',
      uz: 'joyga + 가요 (uzoqlashish)  ·  joyga + 와요 (yaqinlashish)  ·  안 + …',
      en: 'place에 + 가요 (away)  ·  place에 + 와요 (toward)  ·  안 + verb',
      ru: 'место에 + 가요 (от)  ·  место에 + 와요 (к)  ·  안 + глагол',
    },
    conjugations: [
      { base: '회사', result: '회사에 가요' },
      { base: '공항', result: '공항에 가요' },
      { base: '한국', result: '한국에 와요' },
      { base: '학교', result: '학교에 안 와요' },
    ],
    examples: [
      {
        ko: '아키라 씨는 회사에 가요.',
        highlight: '회사에',
        gloss: {
          ko: '아키라 씨는 회사에 가요.',
          uz: 'Akira kompaniyaga boradi.',
          en: 'Akira goes to the office.',
          ru: 'Акира идёт на работу.',
        },
      },
      {
        ko: '친구가 한국에 와요.',
        highlight: '와요',
        gloss: {
          ko: '친구가 한국에 와요.',
          uz: "Do'stim Koreyaga keladi.",
          en: 'My friend is coming to Korea.',
          ru: 'Мой друг приезжает в Корею.',
        },
      },
      {
        ko: '스티븐은 오늘 학교에 안 와요.',
        highlight: '안 와요',
        gloss: {
          ko: '스티븐은 오늘 학교에 안 와요.',
          uz: 'Stiven bugun maktabga kelmaydi.',
          en: 'Steven is not coming to school today.',
          ru: 'Стивен сегодня не придёт в школу.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '어디에 가요?',
        highlight: '어디에',
        gloss: {
          ko: '어디에 가요?',
          uz: 'Qayerga borasiz?',
          en: 'Where are you going?',
          ru: 'Куда вы идёте?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '공항에 가요. 친구가 한국에 와요.',
        highlight: '공항에',
        gloss: {
          ko: '공항에 가요. 친구가 한국에 와요.',
          uz: "Aeroportga. Do'stim Koreyaga keladi.",
          en: 'To the airport. My friend is coming to Korea.',
          ru: 'В аэропорт. Мой друг приезжает в Корею.',
        },
      },
    ],
    similar: {
      pattern: 'N에서 V',
      note: {
        ko: '"인사동에 가요"는 그쪽으로 움직이는 것이고, "인사동에서 친구를 만나요"는 거기 도착해서 하는 일이에요. 움직임에는 "에", 하는 일에는 "에서"예요.',
        uz: '"인사동에 가요" — harakat; "인사동에서 만나요" — u yerdagi ish. Harakatga "에", ishga "에서".',
        en: '인사동에 가요 is the trip; 인사동에서 친구를 만나요 is what you do on arrival. Motion takes 에, activity takes 에서.',
        ru: '인사동에 가요 — поездка; 인사동에서 친구를 만나요 — действие по прибытии. Движение — 에, действие — 에서.',
      },
    },
    cautions: [
      {
        ko: '"가요"는 목적어를 받지 않아요. "학교를 가요"가 아니라 "학교에 가요"예요.',
        uz: '"가요" to\'ldiruvchi olmaydi: "학교를 가요" emas, "학교에 가요".',
        en: '가요 takes no object — say 학교에 가요, never 학교를 가요.',
        ru: '가요 не принимает дополнение: не «학교를 가요», а «학교에 가요».',
      },
      {
        ko: '"가요"와 "와요"는 말하는 사람이 어디 있느냐로 갈려요. 문장만 보고 외우면 자주 틀려요.',
        uz: '"가요" va "와요" so\'zlovchining joyiga bog\'liq — yodlab olish yetmaydi.',
        en: 'The choice between 가요 and 와요 depends on where the speaker is — memorising sentences alone will trip you up.',
        ru: 'Выбор между 가요 и 와요 зависит от положения говорящего — заучивание фраз тут подводит.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '아키라 씨는 회사___ 가요.',
          uz: '아키라 씨는 회사___ 가요.',
          en: '아키라 씨는 회사___ 가요.',
          ru: '아키라 씨는 회사___ 가요.',
        },
        options: [
          { text: '에', correct: true },
          { text: '를', correct: false },
          { text: '에서', correct: false },
        ],
      },
      {
        question: {
          ko: '저는 지금 한국에 있어요. 친구가 한국에 ___.',
          uz: '저는 지금 한국에 있어요. 친구가 한국에 ___.',
          en: '저는 지금 한국에 있어요. 친구가 한국에 ___.',
          ru: '저는 지금 한국에 있어요. 친구가 한국에 ___.',
        },
        options: [
          { text: '와요', correct: true },
          { text: '가요', correct: false },
          { text: '있어요', correct: false },
        ],
      },
      {
        question: {
          ko: '"안"은 어디에 넣어요?',
          uz: '"안" qayerga qo\'yiladi?',
          en: 'Where does 안 go?',
          ru: 'Куда ставится 안?',
        },
        options: [
          { text: '가요/와요 바로 앞', correct: true },
          { text: '문장 맨 앞', correct: false },
          { text: '가요/와요 뒤', correct: false },
        ],
      },
      {
        question: {
          ko: '어디로 가는지 물을 때는?',
          uz: "Qayerga borishini so'rash?",
          en: 'How do you ask where someone is going?',
          ru: 'Как спросить, куда человек идёт?',
        },
        options: [
          { text: '어디에 가요?', correct: true },
          { text: '어디에서 가요?', correct: false },
          { text: '어디가 가요?', correct: false },
        ],
      },
      {
        question: {
          ko: '"학교를 가요"가 틀린 까닭은?',
          uz: '"학교를 가요" nega xato?',
          en: 'Why is 학교를 가요 wrong?',
          ru: 'Почему «학교를 가요» неверно?',
        },
        options: [
          { text: '가요는 목적어를 받지 않아서', correct: true },
          { text: '학교에 받침이 없어서', correct: false },
          { text: '높임말이 아니어서', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 1-16. 상대 위치 N 앞[뒤, 옆] ─────────
  {
    code: 'pos-ap-dwi-yeop',
    pattern: 'N 앞[뒤, 옆]에 있어요',
    section: 1,
    order: 16,
    isActive: true,
    summary: {
      ko: '아는 건물을 기준으로 자리를 알려 줘요.',
      uz: 'Tanish binoni tayanch qilib joyni aytadi.',
      en: 'Locates something using a landmark you already know.',
      ru: 'Указывает место через уже знакомый ориентир.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '위치', uz: "O'rin", en: 'Location', ru: 'Расположение' },
      {
        ko: '길 찾기',
        uz: "Yo'l topish",
        en: 'Directions',
        ru: 'Ориентирование',
      },
    ],
    explanation: {
      ko: '기준이 되는 이름 뒤에 위치 말을 조사 없이 바로 붙여요. 그러면 "은행 앞"이 통째로 한 자리가 되고, 그 뒤에 "에 있어요"가 와요. 위치 말은 위·아래[밑]·앞·뒤·옆·안 여섯 개예요. 앞과 뒤는 기준을 바꾸면 서로 뒤집히지만, 옆은 뒤집어도 옆이에요.',
      uz: 'Tayanch nomdan keyin o\'rin so\'zi qo\'shimchasiz keladi: "은행 앞" bitta joy, ortidan "에 있어요". Old-orqa almashadi, yon esa almashmaydi.',
      en: 'Attach the position word straight to the landmark with no particle — 은행 앞 becomes one place, then 에 있어요 follows. Front and back flip when you switch the reference; 옆 does not.',
      ru: 'Слово места ставится сразу после ориентира без частицы: 은행 앞 — одно место, дальше 에 있어요. «Перед/за» меняются местами при смене опоры, 옆 — нет.',
    },
    conjugationRule: {
      ko: '기준 이름 + 위치 말 + 에 있어요  ·  사이에 조사 없음',
      uz: "Tayanch nom + o'rin so'zi + 에 있어요  ·  orasida qo'shimcha yo'q",
      en: 'landmark + position word + 에 있어요  ·  no particle in between',
      ru: 'ориентир + слово места + 에 있어요  ·  между ними частицы нет',
    },
    conjugations: [
      { base: '은행', result: '은행 앞에 있어요' },
      { base: '병원', result: '병원 뒤에 있어요' },
      { base: '극장', result: '극장 옆에 있어요' },
      { base: '책상', result: '책상 위에 있어요' },
    ],
    examples: [
      {
        ko: '우체국이 은행 앞에 있어요.',
        highlight: '은행 앞에',
        gloss: {
          ko: '우체국이 은행 앞에 있어요.',
          uz: 'Pochta bank oldida.',
          en: 'The post office is in front of the bank.',
          ru: 'Почта находится перед банком.',
        },
      },
      {
        ko: '약국이 병원 뒤에 있어요.',
        highlight: '병원 뒤에',
        gloss: {
          ko: '약국이 병원 뒤에 있어요.',
          uz: 'Dorixona shifoxona orqasida.',
          en: 'The pharmacy is behind the hospital.',
          ru: 'Аптека находится за больницей.',
        },
      },
      {
        ko: '책상 위에 사진이 있어요.',
        highlight: '책상 위에',
        gloss: {
          ko: '책상 위에 사진이 있어요.',
          uz: 'Parta ustida surat bor.',
          en: 'There is a photo on the desk.',
          ru: 'На парте есть фотография.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '우체국이 어디에 있어요?',
        highlight: '어디에',
        gloss: {
          ko: '우체국이 어디에 있어요?',
          uz: 'Pochta qayerda?',
          en: 'Where is the post office?',
          ru: 'Где находится почта?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '한국은행 알아요? 한국은행 앞에 있어요.',
        highlight: '한국은행 앞에',
        gloss: {
          ko: '한국은행 알아요? 한국은행 앞에 있어요.',
          uz: "Hankuk bankini bilasizmi? O'shaning oldida.",
          en: 'Do you know Hankuk Bank? It is in front of it.',
          ru: 'Знаете банк «Хангук»? Она перед ним.',
        },
      },
    ],
    similar: {
      pattern: '아래 · 밑',
      note: {
        ko: '"아래"와 "밑"은 뜻이 같아요. "책상 아래"라고 해도 되고 "책상 밑"이라고 해도 돼요. 말할 때는 "밑"을 조금 더 자주 써요.',
        uz: '"아래" va "밑" bir xil; og\'zaki nutqda "밑" ko\'proq.',
        en: '아래 and 밑 mean the same; 밑 is slightly more common in speech.',
        ru: '아래 и 밑 — синонимы; в речи чаще 밑.',
      },
    },
    cautions: [
      {
        ko: '기준이 되는 이름에는 조사를 붙이지 않아요. "은행이 앞에"가 아니라 "은행 앞에"예요.',
        uz: 'Tayanch nomga qo\'shimcha qo\'yilmaydi: "은행이 앞에" emas, "은행 앞에".',
        en: 'The landmark takes no particle — 은행 앞에, not 은행이 앞에.',
        ru: 'У ориентира частицы нет: 은행 앞에, а не 은행이 앞에.',
      },
      {
        ko: '기준을 바꾸면 앞과 뒤가 뒤집혀요. "우체국이 은행 앞에 있어요"는 곧 "은행이 우체국 뒤에 있어요"예요.',
        uz: "Tayanch o'zgarsa old-orqa almashadi.",
        en: 'Switch the reference and front/back swap: 우체국이 은행 앞에 있어요 equals 은행이 우체국 뒤에 있어요.',
        ru: 'Смените опору — «перед» и «за» поменяются местами.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '우체국이 은행 앞___ 있어요.',
          uz: '우체국이 은행 앞___ 있어요.',
          en: '우체국이 은행 앞___ 있어요.',
          ru: '우체국이 은행 앞___ 있어요.',
        },
        options: [
          { text: '에', correct: true },
          { text: '이', correct: false },
          { text: '에서', correct: false },
        ],
      },
      {
        question: {
          ko: '기준이 되는 건물 뒤에 조사를 붙이나요?',
          uz: "Tayanch binoga qo'shimcha qo'yiladimi?",
          en: 'Does the landmark take a particle?',
          ru: 'Ставится ли частица у ориентира?',
        },
        options: [
          { text: '아니요, 바로 위치 말이 와요', correct: true },
          { text: '네, "이/가"를 붙여요', correct: false },
          { text: '네, "은/는"을 붙여요', correct: false },
        ],
      },
      {
        question: {
          ko: '"우체국이 은행 앞에 있어요"와 같은 말은?',
          uz: '"우체국이 은행 앞에 있어요" bilan bir xil?',
          en: 'Which says the same as 우체국이 은행 앞에 있어요?',
          ru: 'Что означает то же, что 우체국이 은행 앞에 있어요?',
        },
        options: [
          { text: '은행이 우체국 뒤에 있어요', correct: true },
          { text: '은행이 우체국 앞에 있어요', correct: false },
          { text: '은행이 우체국 옆에 있어요', correct: false },
        ],
      },
      {
        question: {
          ko: '"밑"과 뜻이 같은 말은?',
          uz: '"밑" bilan bir xil so\'z?',
          en: 'Which word means the same as 밑?',
          ru: 'Какое слово значит то же, что 밑?',
        },
        options: [
          { text: '아래', correct: true },
          { text: '위', correct: false },
          { text: '안', correct: false },
        ],
      },
      {
        question: {
          ko: 'A가 B 옆에 있으면 B는 A의 어디에 있어요?',
          uz: "A B yonida bo'lsa, B A ning qayerida?",
          en: 'If A is next to B, where is B relative to A?',
          ru: 'Если A рядом с B, то где B относительно A?',
        },
        options: [
          { text: '옆', correct: true },
          { text: '앞', correct: false },
          { text: '뒤', correct: false },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 섹션 1 · 5과
  // ═══════════════════════════════════════════════════════════
  // ═══════════════════════════════════════════════════════════
  // 섹션 1 · 5과 — 주말에 친구를 만났어요
  //
  // 날짜·요일 → 시간 N에 → 과거 V-았/었어요 → 순서 V-고
  // "언제?"를 먼저 말하고, 지난 일을 말한 뒤,
  // 여러 행동을 시간 순서대로 이어 말하는 흐름.
  // ═══════════════════════════════════════════════════════════

  // ───────── 섹션 1-17. 날짜와 요일 ─────────
  {
    code: 'date-and-day',
    pattern: '오늘이 며칠이에요? / 무슨 요일이에요?',
    section: 1,
    order: 17,
    isActive: true,
    summary: {
      ko: '날짜와 요일을 묻고 답하는 기본 표현이에요. 날짜는 "며칠", 요일은 "무슨 요일"로 물어요.',
      uz: 'Sana va hafta kunini so‘rash va aytish uchun asosiy ifoda. Sana uchun "며칠", hafta kuni uchun "무슨 요일" ishlatiladi.',
      en: 'The basic pattern for asking and answering dates and days of the week. Use 며칠 for the date and 무슨 요일 for the day.',
      ru: 'Основные выражения для даты и дня недели. Для даты используется 며칠, для дня недели — 무슨 요일.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '날짜', uz: 'Sana', en: 'Date', ru: 'Дата' },
      { ko: '요일', uz: 'Hafta kuni', en: 'Day of week', ru: 'День недели' },
    ],
    explanation: {
      ko: '날짜를 물을 때는 "오늘이 며칠이에요?"라고 하고, "오월 구 일이에요"처럼 월과 일을 함께 말해요. 생일이나 시험처럼 특정 행사의 날짜를 물을 때는 "생일이 언제예요?", "시험이 언제예요?"처럼 "언제"를 쓸 수 있어요. 요일을 물을 때는 "오늘이 무슨 요일이에요?"라고 하고 "금요일이에요"처럼 대답해요. 날짜의 월·일에는 한, 두, 세 같은 고유어 수가 아니라 일, 이, 삼 같은 한자어 수를 사용해요. 특히 6월은 "육월"이 아니라 "유월", 10월은 "십월"이 아니라 "시월"이라고 읽는 것도 기억해야 해요.',
      uz: 'Sanani so‘rashda "오늘이 며칠이에요?" deyiladi va "오월 구 일이에요" kabi oy hamda kun birga aytiladi. Tug‘ilgan kun yoki imtihon kabi voqea sanasini so‘rashda "생일이 언제예요?", "시험이 언제예요?" kabi "언제" ishlatiladi. Hafta kunini so‘rashda "오늘이 무슨 요일이에요?" deyiladi va "금요일이에요" kabi javob beriladi. Oy va kunlarda 한, 두, 세 emas, 일, 이, 삼 kabi xitoy-koreys sonlari ishlatiladi. 6월 "육월" emas "유월", 10월 esa "십월" emas "시월" deb o‘qiladi.',
      en: 'Ask for the date with "오늘이 며칠이에요?" and answer with the month and day, such as "오월 구 일이에요." For the date of an event such as a birthday or exam, you can ask with 언제: "생일이 언제예요?" or "시험이 언제예요?" To ask the day of the week, say "오늘이 무슨 요일이에요?" and answer, for example, "금요일이에요." Months and dates use Sino-Korean numbers such as 일, 이, 삼 rather than native Korean 한, 두, 세. Two important readings are 6월 "유월" and 10월 "시월".',
      ru: 'Дату спрашивают фразой "오늘이 며칠이에요?" и отвечают месяцем и числом, например "오월 구 일이에요." О дате события, например дня рождения или экзамена, можно спросить через 언제: "생일이 언제예요?", "시험이 언제예요?" День недели спрашивают через "오늘이 무슨 요일이에요?" и отвечают, например, "금요일이에요." Для месяцев и чисел используются китайско-корейские числа 일, 이, 삼, а не исконно корейские 한, 두, 세. Важно запомнить особое чтение: 6월 — "유월", 10월 — "시월".',
    },
    conjugationRule: {
      ko: '날짜: 몇 월 며칠 → N월 N일이에요  ·  요일: 무슨 요일 → N요일이에요  ·  행사 날짜: 언제예요?',
      uz: 'Sana: 몇 월 며칠 → N월 N일이에요  ·  hafta kuni: 무슨 요일 → N요일이에요  ·  voqea sanasi: 언제예요?',
      en: 'date: which month/date → N월 N일이에요  ·  day: 무슨 요일 → N요일이에요  ·  event date: 언제예요?',
      ru: 'дата: месяц/число → N월 N일이에요  ·  день недели: 무슨 요일 → N요일이에요  ·  дата события: 언제예요?',
    },
    conjugations: [
      { base: '5월 9일', result: '오월 구 일이에요' },
      { base: '6월 6일', result: '유월 육 일이에요' },
      { base: '10월', result: '시월' },
      { base: '금요일', result: '금요일이에요' },
      { base: '3월 23일', result: '삼월 이십삼 일이에요' },
    ],
    examples: [
      {
        ko: '오늘이 며칠이에요? 오월 구 일이에요.',
        highlight: '며칠이에요',
        gloss: {
          ko: '오늘이 며칠이에요? 오월 구 일이에요.',
          uz: 'Bugun nechanchi sana? 9-may.',
          en: 'What is the date today? It is May 9th.',
          ru: 'Какое сегодня число? Девятое мая.',
        },
      },
      {
        ko: '시험이 언제예요? 팔월 이십삼 일이에요.',
        highlight: '언제예요',
        gloss: {
          ko: '시험이 언제예요? 팔월 이십삼 일이에요.',
          uz: 'Imtihon qachon? 23-avgust.',
          en: 'When is the exam? It is August 23rd.',
          ru: 'Когда экзамен? Двадцать третьего августа.',
        },
      },
      {
        ko: '오늘이 무슨 요일이에요? 금요일이에요.',
        highlight: '무슨 요일이에요',
        gloss: {
          ko: '오늘이 무슨 요일이에요? 금요일이에요.',
          uz: 'Bugun haftaning qaysi kuni? Juma.',
          en: 'What day is it today? It is Friday.',
          ru: 'Какой сегодня день недели? Пятница.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '생일이 언제예요?',
        highlight: '언제예요',
        gloss: {
          ko: '생일이 언제예요?',
          uz: 'Tug‘ilgan kuningiz qachon?',
          en: 'When is your birthday?',
          ru: 'Когда у вас день рождения?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '삼월 이십삼 일이에요.',
        highlight: '삼월 이십삼 일',
        gloss: {
          ko: '삼월 이십삼 일이에요.',
          uz: '23-mart.',
          en: 'It is March 23rd.',
          ru: 'Двадцать третьего марта.',
        },
      },
    ],
    similar: {
      pattern: '언제 / 며칠 / 무슨 요일',
      note: {
        ko: '"언제"는 넓게 "언제?"를 묻는 말이라 생일·시험·약속 날짜에 쓸 수 있어요. "며칠"은 달력의 날짜를 정확히 묻고, "무슨 요일"은 월·화·수 같은 요일을 물어요. "생일이 언제예요?"와 "생일이 며칠이에요?"는 둘 다 가능하지만 질문의 초점이 조금 달라요.',
        uz: '"언제" umumiy "qachon?" savoli bo‘lib tug‘ilgan kun, imtihon yoki uchrashuv uchun ishlatiladi. "며칠" aniq sanani, "무슨 요일" esa hafta kunini so‘raydi.',
        en: '언제 is the broad "when?" and works for birthdays, exams and appointments. 며칠 specifically asks for the calendar date, while 무슨 요일 asks for Monday, Tuesday and so on.',
        ru: '언제 — общее «когда?» для дня рождения, экзамена или встречи. 며칠 спрашивает конкретное число месяца, а 무슨 요일 — день недели.',
      },
    },
    cautions: [
      {
        ko: '날짜에는 "한 월, 두 일"처럼 고유어 수를 쓰지 않아요. "일월, 이월, 삼월", "구 일, 십 일"처럼 한자어 수를 써요.',
        uz: 'Sanada "한 월, 두 일" kabi sof koreys sonlari ishlatilmaydi. 일월, 이월, 삼월 kabi xitoy-koreys sonlari ishlatiladi.',
        en: 'Do not use native Korean numbers such as 한 월 or 두 일 for dates. Use Sino-Korean numbers: 일월, 이월, 삼월, 구 일, 십 일.',
        ru: 'В датах не используются исконно корейские числа вроде 한 월 или 두 일. Используются 일월, 이월, 삼월, 구 일, 십 일.',
      },
      {
        ko: '6월과 10월은 발음을 특별히 기억해요. "육월"이 아니라 "유월", "십월"이 아니라 "시월"이에요.',
        uz: '6월 va 10월 talaffuzini alohida yodlang: "육월" emas "유월", "십월" emas "시월".',
        en: 'Remember the special month readings: 6월 is 유월, not 육월; 10월 is 시월, not 십월.',
        ru: 'Запомните особое чтение: 6월 — 유월, не 육월; 10월 — 시월, не 십월.',
      },
      {
        ko: '요일을 물을 때 "몇 요일이에요?"라고 하지 않아요. 반드시 "무슨 요일이에요?"라고 해요.',
        uz: 'Hafta kunini so‘rashda "몇 요일이에요?" deyilmaydi. "무슨 요일이에요?" deyiladi.',
        en: 'Do not ask 몇 요일이에요? The correct question is 무슨 요일이에요?',
        ru: 'Нельзя говорить 몇 요일이에요? Правильно: 무슨 요일이에요?',
      },
    ],
    quiz: [
      {
        question: {
          ko: '오늘이 ___? — 오월 구 일이에요.',
          uz: '오늘이 ___? — 오월 구 일이에요.',
          en: '오늘이 ___? — 오월 구 일이에요.',
          ru: '오늘이 ___? — 오월 구 일이에요.',
        },
        options: [
          { text: '며칠이에요', correct: true },
          { text: '무슨 요일이에요', correct: false },
          { text: '어디예요', correct: false },
        ],
      },
      {
        question: {
          ko: '오늘이 ___? — 금요일이에요.',
          uz: '오늘이 ___? — 금요일이에요.',
          en: '오늘이 ___? — 금요일이에요.',
          ru: '오늘이 ___? — 금요일이에요.',
        },
        options: [
          { text: '무슨 요일이에요', correct: true },
          { text: '며칠이에요', correct: false },
          { text: '몇 살이에요', correct: false },
        ],
      },
      {
        question: {
          ko: '6월은 어떻게 읽어요?',
          uz: '6월 qanday o‘qiladi?',
          en: 'How do you read 6월?',
          ru: 'Как читается 6월?',
        },
        options: [
          { text: '유월', correct: true },
          { text: '육월', correct: false },
          { text: '여섯월', correct: false },
        ],
      },
      {
        question: {
          ko: '10월은 어떻게 읽어요?',
          uz: '10월 qanday o‘qiladi?',
          en: 'How do you read 10월?',
          ru: 'Как читается 10월?',
        },
        options: [
          { text: '시월', correct: true },
          { text: '십월', correct: false },
          { text: '열월', correct: false },
        ],
      },
      {
        question: {
          ko: '생일 날짜를 자연스럽게 물을 수 있는 문장은?',
          uz: 'Tug‘ilgan kun sanasini tabiiy so‘rash uchun qaysi gap to‘g‘ri?',
          en: 'Which is a natural way to ask for someone’s birthday date?',
          ru: 'Как естественно спросить дату дня рождения?',
        },
        options: [
          { text: '생일이 언제예요?', correct: true },
          { text: '생일이 어디예요?', correct: false },
          { text: '생일이 누구예요?', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 1-18. 시간 N에 ─────────
  {
    code: 'time-e',
    pattern: '시간 N에',
    section: 1,
    order: 18,
    isActive: true,
    summary: {
      ko: '어떤 일이 일어나는 시간을 표시해요. "언제?"에 대한 시간을 문장에 넣을 때 "에"를 붙여요.',
      uz: 'Harakat qachon bo‘lishini ko‘rsatadi. "Qachon?" savolining vaqt javobiga "에" qo‘shiladi.',
      en: 'Marks when something happens. Attach 에 to a time expression that answers "when?"',
      ru: 'Указывает, когда происходит действие. К выражению времени, отвечающему на «когда?», добавляется 에.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '조사', uz: "Qo'shimcha", en: 'Particle', ru: 'Частица' },
      { ko: '시간', uz: 'Vaqt', en: 'Time', ru: 'Время' },
    ],
    explanation: {
      ko: '요일, 날짜, 생일, 크리스마스처럼 어떤 일이 일어나는 시간을 말할 때 뒤에 "에"를 붙여요. "토요일에 영화를 봐요"에서 토요일은 영화를 보는 시간이고, "크리스마스에 친구하고 파티를 해요"에서 크리스마스는 파티를 하는 시간이에요. 장소에 붙는 "에"와 모양은 같지만 역할이 달라요. "학교에 가요"의 에는 목적지를 나타내고, "월요일에 공부해요"의 에는 시간을 나타내요. 시간의 에도 받침과 상관없이 언제나 같은 모양이에요.',
      uz: 'Hafta kuni, sana, tug‘ilgan kun yoki Rojdestvo kabi vaqtni aytganda ortiga "에" qo‘shiladi. "토요일에 영화를 봐요" gapida 토요일 film ko‘riladigan vaqt, "크리스마스에 친구하고 파티를 해요" gapida esa 크리스마스 ziyofat bo‘ladigan vaqtdir. Joyga qo‘shiladigan "에" bilan shakli bir xil, lekin vazifasi boshqacha: "학교에 가요" da manzilni, "월요일에 공부해요" da vaqtni bildiradi. Vaqt "에" si 받침 ga qarab o‘zgarmaydi.',
      en: 'Attach 에 to a day, date or event-time such as 토요일, 생일 or 크리스마스 to say when an action happens. In "토요일에 영화를 봐요", Saturday is the time of watching the movie. This 에 looks identical to the destination particle in "학교에 가요", but its job is different: one marks a destination, the other marks time. Time 에 never changes according to 받침.',
      ru: 'Добавляйте 에 к дню недели, дате или времени события, например 토요일, 생일, 크리스마스, чтобы сказать, когда происходит действие. В "토요일에 영화를 봐요" суббота — время просмотра фильма. Эта частица выглядит так же, как 에 направления в "학교에 가요", но функция другая: там это направление, здесь — время. Форма 에 не зависит от 받침.',
    },
    conjugationRule: {
      ko: '시간 표현 + 에 + 행동  ·  받침과 상관없이 항상 "에"',
      uz: 'Vaqt ifodasi + 에 + harakat  ·  받침 dan qat’i nazar doim "에"',
      en: 'time expression + 에 + action  ·  always 에 regardless of 받침',
      ru: 'выражение времени + 에 + действие  ·  всегда 에 независимо от 받침',
    },
    conjugations: [
      { base: '토요일', result: '토요일에' },
      { base: '월요일', result: '월요일에' },
      { base: '생일', result: '생일에' },
      { base: '크리스마스', result: '크리스마스에' },
      { base: '주말', result: '주말에' },
    ],
    examples: [
      {
        ko: '토요일에 친구하고 영화를 봐요.',
        highlight: '토요일에',
        gloss: {
          ko: '토요일에 친구하고 영화를 봐요.',
          uz: 'Shanba kuni do‘stim bilan kino ko‘raman.',
          en: 'I watch a movie with a friend on Saturday.',
          ru: 'В субботу я смотрю фильм с другом.',
        },
      },
      {
        ko: '크리스마스에 친구하고 파티를 해요.',
        highlight: '크리스마스에',
        gloss: {
          ko: '크리스마스에 친구하고 파티를 해요.',
          uz: 'Rojdestvoda do‘stim bilan ziyofat qilaman.',
          en: 'I have a party with a friend at Christmas.',
          ru: 'На Рождество я устраиваю вечеринку с другом.',
        },
      },
      {
        ko: '월요일에 영어를 배워요.',
        highlight: '월요일에',
        gloss: {
          ko: '월요일에 영어를 배워요.',
          uz: 'Dushanba kuni ingliz tilini o‘rganaman.',
          en: 'I study English on Monday.',
          ru: 'В понедельник я изучаю английский.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '토요일에 뭐 해요?',
        highlight: '토요일에',
        gloss: {
          ko: '토요일에 뭐 해요?',
          uz: 'Shanba kuni nima qilasiz?',
          en: 'What do you do on Saturday?',
          ru: 'Что вы делаете в субботу?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '친구하고 영화를 봐요.',
        highlight: '영화를 봐요',
        gloss: {
          ko: '친구하고 영화를 봐요.',
          uz: 'Do‘stim bilan kino ko‘raman.',
          en: 'I watch a movie with a friend.',
          ru: 'Я смотрю фильм с другом.',
        },
      },
    ],
    similar: {
      pattern: '장소 N에',
      note: {
        ko: '모양은 똑같지만 질문이 달라요. "토요일에 영화를 봐요"의 에는 "언제?"에 답하고, "학교에 가요"의 에는 "어디에?"에 답해요. 시간을 나타내는지 장소를 나타내는지는 앞의 명사와 뒤의 동사를 함께 보고 판단해요.',
        uz: 'Shakli bir xil, lekin savol boshqacha. "토요일에" — "qachon?", "학교에 가요" — "qayerga?". Ma’noni oldingi ot va keyingi fe’lga qarab aniqlang.',
        en: 'The form is identical, but the question differs. 토요일에 answers "when?", while 학교에 in 학교에 가요 answers "where to?" Look at both the noun and the following verb.',
        ru: 'Форма одинаковая, но вопрос различается. 토요일에 отвечает на «когда?», а 학교에 в 학교에 가요 — на «куда?». Смотрите на существительное и глагол вместе.',
      },
    },
    cautions: [
      {
        ko: '"토요일에서 영화를 봐요"라고 하지 않아요. 시간에는 장소에서 행동할 때 쓰는 "에서"가 아니라 "에"를 써요.',
        uz: '"토요일에서 영화를 봐요" deyilmaydi. Vaqt uchun "에서" emas, "에" ishlatiladi.',
        en: 'Do not say 토요일에서 영화를 봐요. Time takes 에, not the activity-place particle 에서.',
        ru: 'Нельзя говорить 토요일에서 영화를 봐요. Для времени используется 에, а не частица места действия 에서.',
      },
      {
        ko: '받침이 있어도 형태는 바뀌지 않아요. "월요일이에"나 "주말이에"가 아니라 "월요일에", "주말에"예요.',
        uz: '받침 bo‘lsa ham shakl o‘zgarmaydi. "월요일이에" emas "월요일에", "주말이에" emas "주말에".',
        en: 'The form does not change after a final consonant. Say 월요일에 and 주말에, not 월요일이에 or 주말이에.',
        ru: 'Форма не меняется после согласного. Правильно 월요일에, 주말에, а не 월요일이에 или 주말이에.',
      },
      {
        ko: '"월요일에는 영어를 배워요"처럼 대비하거나 특별히 강조하면 "에 + 는"이 합쳐져 "에는"도 쓸 수 있어요. 기본형은 먼저 "월요일에"로 익혀요.',
        uz: 'Taqqoslash yoki urg‘u bo‘lsa "에 + 는" → "에는" bo‘lishi mumkin: "월요일에는". Avval asosiy "월요일에" shaklini o‘rganing.',
        en: 'For contrast or emphasis, 에 can combine with 는: 월요일에는. Learn the basic 월요일에 first.',
        ru: 'При противопоставлении или выделении 에 может соединяться с 는: 월요일에는. Сначала запомните базовую форму 월요일에.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '토요일___ 친구하고 영화를 봐요.',
          uz: '토요일___ 친구하고 영화를 봐요.',
          en: '토요일___ 친구하고 영화를 봐요.',
          ru: '토요일___ 친구하고 영화를 봐요.',
        },
        options: [
          { text: '에', correct: true },
          { text: '에서', correct: false },
          { text: '를', correct: false },
        ],
      },
      {
        question: {
          ko: '크리스마스___ 친구하고 파티를 해요.',
          uz: '크리스마스___ 친구하고 파티를 해요.',
          en: '크리스마스___ 친구하고 파티를 해요.',
          ru: '크리스마스___ 친구하고 파티를 해요.',
        },
        options: [
          { text: '에', correct: true },
          { text: '이', correct: false },
          { text: '에서', correct: false },
        ],
      },
      {
        question: {
          ko: '시간을 나타내는 "에"가 있는 문장은?',
          uz: 'Qaysi gapdagi "에" vaqtni bildiradi?',
          en: 'Which sentence uses 에 as a time marker?',
          ru: 'В каком предложении 에 обозначает время?',
        },
        options: [
          { text: '월요일에 영어를 배워요.', correct: true },
          { text: '학교에 가요.', correct: false },
          { text: '가방 안에 책이 있어요.', correct: false },
        ],
      },
      {
        question: {
          ko: '맞는 문장을 고르세요.',
          uz: 'To‘g‘ri gapni tanlang.',
          en: 'Choose the correct sentence.',
          ru: 'Выберите правильное предложение.',
        },
        options: [
          { text: '주말에 친구를 만나요.', correct: true },
          { text: '주말에서 친구를 만나요.', correct: false },
          { text: '주말을 친구를 만나요.', correct: false },
        ],
      },
      {
        question: {
          ko: '"토요일에"는 어떤 질문에 답해요?',
          uz: '"토요일에" qaysi savolga javob beradi?',
          en: 'Which question does 토요일에 answer?',
          ru: 'На какой вопрос отвечает 토요일에?',
        },
        options: [
          { text: '언제?', correct: true },
          { text: '어디에서?', correct: false },
          { text: '누구하고?', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 1-19. 과거 V-았/었어요 ─────────
  {
    code: 'past-ass-eoss-eoyo',
    pattern: 'V-았/었어요',
    section: 1,
    order: 19,
    isActive: true,
    summary: {
      ko: '이미 끝난 일을 말하는 기본 과거형이에요. 어제·지난주처럼 지난 시간을 이야기할 때 사용해요.',
      uz: 'Tugagan ishni aytadigan asosiy o‘tgan zamon shakli. Kecha yoki o‘tgan hafta kabi vaqtlar bilan ishlatiladi.',
      en: 'The basic past-tense ending for completed actions. Use it for things that happened yesterday, last week and so on.',
      ru: 'Основное окончание прошедшего времени для завершённых действий. Используется с «вчера», «на прошлой неделе» и т. п.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '시제', uz: 'Zamon', en: 'Tense', ru: 'Время' },
      { ko: '과거', uz: "O'tgan zamon", en: 'Past', ru: 'Прошедшее' },
    ],
    explanation: {
      ko: '동사의 "-다"를 떼고 어간의 마지막 모음을 봐요. 마지막 모음이 ㅏ 또는 ㅗ이면 "-았어요", 그 밖의 모음이면 "-었어요"를 붙여요. "하다"는 특별히 "했어요"가 돼요. 실제로는 모음이 만나면서 형태가 많이 줄어들어요. 가다 → 가 + 았어요 → 갔어요, 보다 → 보 + 았어요 → 봤어요, 마시다 → 마시 + 었어요 → 마셨어요가 돼요. 현재형에서 배운 모음 결합과 비슷하다고 생각하면 쉬워요. 교재에서는 "어제 뭐 했어요? → 코엑스몰에 갔어요", "친구를 만났어요", "공원에서 운동했어요", "피자를 먹었어요"처럼 이미 끝난 일을 말할 때 사용해요.',
      uz: 'Fe’ldan "-다" olib tashlanadi va o‘zakning oxirgi unlisiga qaraladi. Oxirgi unli ㅏ yoki ㅗ bo‘lsa "-았어요", boshqa unlilarda "-었어요". "하다" alohida "했어요" bo‘ladi. Unlilar qo‘shilganda shakl qisqaradi: 가다 → 갔어요, 보다 → 봤어요, 마시다 → 마셨어요. Bu hozirgi zamondagi unli qo‘shilishiga o‘xshaydi. Darslikda "어제 뭐 했어요?", "코엑스몰에 갔어요", "친구를 만났어요", "공원에서 운동했어요" kabi tugagan harakatlar uchun ishlatiladi.',
      en: 'Drop -다 and look at the final vowel of the stem. If it is ㅏ or ㅗ, attach -았어요; otherwise attach -었어요. 하다 is special and becomes 했어요. Vowels often contract: 가다 → 갔어요, 보다 → 봤어요, 마시다 → 마셨어요. This resembles the vowel contractions you already learned in the present tense. The textbook uses this form for completed events such as "어제 뭐 했어요?", "코엑스몰에 갔어요", "친구를 만났어요", and "공원에서 운동했어요".',
      ru: 'Уберите -다 и посмотрите на последнюю гласную основы. После ㅏ или ㅗ используется -았어요, после остальных — -었어요. 하다 имеет особую форму 했어요. При соединении гласных форма часто сокращается: 가다 → 갔어요, 보다 → 봤어요, 마시다 → 마셨어요. Это похоже на слияние гласных в настоящем времени. В учебнике форма используется для завершённых действий: "어제 뭐 했어요?", "코엑스몰에 갔어요", "친구를 만났어요", "공원에서 운동했어요".',
    },
    conjugationRule: {
      ko: '어간의 마지막 모음 ㅏ·ㅗ → -았어요  ·  그 밖의 모음 → -었어요  ·  하다 → 했어요',
      uz: 'o‘zak oxiri ㅏ·ㅗ → -았어요  ·  boshqa unlilar → -었어요  ·  하다 → 했어요',
      en: 'stem ending in ㅏ or ㅗ → -았어요  ·  other vowels → -었어요  ·  하다 → 했어요',
      ru: 'основа на ㅏ или ㅗ → -았어요  ·  прочие гласные → -었어요  ·  하다 → 했어요',
    },
    conjugations: [
      { base: '가다', result: '갔어요' },
      { base: '보다', result: '봤어요' },
      { base: '먹다', result: '먹었어요' },
      { base: '마시다', result: '마셨어요' },
      { base: '공부하다', result: '공부했어요' },
      { base: '만나다', result: '만났어요' },
    ],
    examples: [
      {
        ko: '어제 친구를 만났어요.',
        highlight: '만났어요',
        gloss: {
          ko: '어제 친구를 만났어요.',
          uz: 'Kecha do‘stim bilan uchrashdim.',
          en: 'I met a friend yesterday.',
          ru: 'Вчера я встретился с другом.',
        },
      },
      {
        ko: '공원에서 운동했어요.',
        highlight: '운동했어요',
        gloss: {
          ko: '공원에서 운동했어요.',
          uz: 'Bog‘da mashq qildim.',
          en: 'I exercised in the park.',
          ru: 'Я занимался спортом в парке.',
        },
      },
      {
        ko: '어제 피자를 먹었어요.',
        highlight: '먹었어요',
        gloss: {
          ko: '어제 피자를 먹었어요.',
          uz: 'Kecha pitsa yedim.',
          en: 'I ate pizza yesterday.',
          ru: 'Вчера я ел пиццу.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '어제 뭐 했어요?',
        highlight: '했어요',
        gloss: {
          ko: '어제 뭐 했어요?',
          uz: 'Kecha nima qildingiz?',
          en: 'What did you do yesterday?',
          ru: 'Что вы делали вчера?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '코엑스몰에 갔어요.',
        highlight: '갔어요',
        gloss: {
          ko: '코엑스몰에 갔어요.',
          uz: 'COEX Mallga bordim.',
          en: 'I went to COEX Mall.',
          ru: 'Я ходил в торговый центр COEX.',
        },
      },
    ],
    similar: {
      pattern: 'V-아요/어요',
      note: {
        ko: '현재형과 과거형은 같은 동사에서 시간을 바꿔요. "친구를 만나요"는 지금이나 평소의 일이고, "어제 친구를 만났어요"는 이미 끝난 일이에요. "먹어요 → 먹었어요", "가요 → 갔어요"처럼 짝으로 기억하면 쉬워요.',
        uz: 'Hozirgi va o‘tgan zamon bir xil fe’lning vaqtini o‘zgartiradi. "친구를 만나요" — hozir yoki odatda, "어제 친구를 만났어요" — tugagan o‘tgan ish. 먹어요 → 먹었어요, 가요 → 갔어요 kabi juftlab yodlang.',
        en: 'Present and past forms change the time of the same verb. 친구를 만나요 describes now or a usual activity; 어제 친구를 만났어요 describes a completed past event. Learn pairs such as 먹어요 → 먹었어요 and 가요 → 갔어요.',
        ru: 'Настоящая и прошедшая формы меняют время одного глагола. 친구를 만나요 — настоящее или обычное действие, 어제 친구를 만났어요 — завершённое прошлое. Удобно запоминать парами: 먹어요 → 먹었어요, 가요 → 갔어요.',
      },
    },
    cautions: [
      {
        ko: '현재형 뒤에 과거형을 덧붙이지 않아요. "먹어요었어요", "가요았어요"가 아니라 동사 어간에서 바로 과거형을 만들어요: 먹었어요, 갔어요.',
        uz: 'Hozirgi shaklga o‘tgan zamon qo‘shimchasini qo‘shmang. "먹어요었어요", "가요았어요" emas; o‘zakdan to‘g‘ridan-to‘g‘ri 먹었어요, 갔어요 yasaladi.',
        en: 'Do not attach the past ending to an already conjugated present form. Not 먹어요었어요 or 가요았어요; build directly from the stem: 먹었어요, 갔어요.',
        ru: 'Не добавляйте прошедшее окончание к уже готовой форме настоящего времени. Не 먹어요었어요 и не 가요았어요, а сразу от основы: 먹었어요, 갔어요.',
      },
      {
        ko: '"하다"는 "하았어요"나 "하었어요"가 아니라 반드시 "했어요"예요. 공부하다 → 공부했어요, 운동하다 → 운동했어요.',
        uz: '"하다" "하았어요" yoki "하었어요" emas, "했어요" bo‘ladi: 공부하다 → 공부했어요.',
        en: '하다 does not become 하았어요 or 하었어요. It becomes 했어요: 공부하다 → 공부했어요.',
        ru: '하다 не превращается в 하았어요 или 하었어요. Правильно 했어요: 공부하다 → 공부했어요.',
      },
      {
        ko: '"보다"는 "보았어요"도 문법적으로 가능하지만 일상 대화에서는 줄인 "봤어요"가 훨씬 자연스러워요. 초급에서는 "봤어요"로 익히면 돼요.',
        uz: '"보았어요" grammatik jihatdan mumkin, lekin kundalik nutqda qisqargan "봤어요" ancha tabiiy. Boshlang‘ichda "봤어요" ni ishlating.',
        en: '보았어요 is grammatically possible, but the contracted 봤어요 is much more natural in everyday speech. Learn 봤어요 at this level.',
        ru: '보았어요 грамматически возможно, но в обычной речи намного естественнее сокращённое 봤어요. На начальном уровне используйте 봤어요.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '가다 → 어제 학교에 ___.',
          uz: '가다 → 어제 학교에 ___.',
          en: '가다 → 어제 학교에 ___.',
          ru: '가다 → 어제 학교에 ___.',
        },
        options: [
          { text: '갔어요', correct: true },
          { text: '가었어요', correct: false },
          { text: '가요았어요', correct: false },
        ],
      },
      {
        question: {
          ko: '먹다 → 어제 비빔밥을 ___.',
          uz: '먹다 → 어제 비빔밥을 ___.',
          en: '먹다 → 어제 비빔밥을 ___.',
          ru: '먹다 → 어제 비빔밥을 ___.',
        },
        options: [
          { text: '먹었어요', correct: true },
          { text: '먹았어요', correct: false },
          { text: '먹어요었어요', correct: false },
        ],
      },
      {
        question: {
          ko: '공부하다 → 어제 한국어를 ___.',
          uz: '공부하다 → 어제 한국어를 ___.',
          en: '공부하다 → 어제 한국어를 ___.',
          ru: '공부하다 → 어제 한국어를 ___.',
        },
        options: [
          { text: '공부했어요', correct: true },
          { text: '공부하았어요', correct: false },
          { text: '공부해었어요', correct: false },
        ],
      },
      {
        question: {
          ko: '보다 → 주말에 영화를 ___.',
          uz: '보다 → 주말에 영화를 ___.',
          en: '보다 → 주말에 영화를 ___.',
          ru: '보다 → 주말에 영화를 ___.',
        },
        options: [
          { text: '봤어요', correct: true },
          { text: '보었어요', correct: false },
          { text: '봐었어요', correct: false },
        ],
      },
      {
        question: {
          ko: '"어제 뭐 했어요?"에 알맞은 대답은?',
          uz: '"어제 뭐 했어요?" savoliga mos javob qaysi?',
          en: 'Which answer fits "어제 뭐 했어요?"',
          ru: 'Какой ответ подходит к «어제 뭐 했어요?»?',
        },
        options: [
          { text: '친구를 만났어요.', correct: true },
          { text: '친구를 만나요 내일.', correct: false },
          { text: '친구가 누구예요?', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 1-20. 행동 연결 V-고 ─────────
  {
    code: 'verb-go',
    pattern: 'V-고',
    section: 1,
    order: 20,
    isActive: true,
    summary: {
      ko: '두 행동을 "하고, 그리고"처럼 이어 줘요. 특히 먼저 한 일과 그다음 한 일을 순서대로 말할 때 자주 써요.',
      uz: 'Ikki harakatni "va, keyin" ma’nosida bog‘laydi. Ayniqsa birinchi va keyingi ishni ketma-ket aytishda ishlatiladi.',
      en: 'Connects two actions like "and" or "and then". It is especially useful for describing actions in sequence.',
      ru: 'Соединяет два действия со значением «и», «а затем». Особенно часто используется для последовательности действий.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      {
        ko: '연결어미',
        uz: "Bog'lovchi",
        en: 'Connector',
        ru: 'Соединительное окончание',
      },
      {
        ko: '순서',
        uz: 'Ketma-ketlik',
        en: 'Sequence',
        ru: 'Последовательность',
      },
    ],
    explanation: {
      ko: '첫 번째 동사의 "-다"를 떼고 어간에 바로 "-고"를 붙여요. 받침이나 모음에 따라 형태가 바뀌지 않아서 활용은 간단해요. 먹다 → 먹고, 보다 → 보고, 하다 → 하고가 돼요. "숙제를 하고 텔레비전을 봐요"는 숙제를 한 뒤 텔레비전을 본다는 흐름이고, "밥을 먹고 차를 마셨어요"는 밥을 먹은 뒤 차를 마셨다는 뜻이에요. 이 과에서는 여러 행동을 순서대로 말할 때 앞 행동은 "-고"로 연결하고 마지막 동사에서 현재나 과거를 보여 주는 기본 패턴을 익혀요. 그래서 "밥을 먹고 차를 마셨어요"처럼 마지막의 "마셨어요"가 전체 이야기가 과거라는 것을 자연스럽게 보여 줘요.',
      uz: 'Birinchi fe’ldan "-다" olib tashlanib, o‘zakka to‘g‘ridan-to‘g‘ri "-고" qo‘shiladi. 받침 yoki unliga qarab o‘zgarmaydi: 먹다 → 먹고, 보다 → 보고, 하다 → 하고. "숙제를 하고 텔레비전을 봐요" — avval uy vazifasi, keyin televizor; "밥을 먹고 차를 마셨어요" — avval ovqat, keyin choy ichilganini bildiradi. Bu darsda oldingi ish "-고" bilan bog‘lanadi, zamon esa odatda oxirgi fe’lda ko‘rsatiladi.',
      en: 'Drop -다 from the first verb and attach -고 directly to the stem. It does not change according to vowels or 받침: 먹다 → 먹고, 보다 → 보고, 하다 → 하고. "숙제를 하고 텔레비전을 봐요" describes doing homework and then watching television. "밥을 먹고 차를 마셨어요" describes eating and then drinking tea. At this beginner stage, the first action is connected with -고 and the final verb normally carries the tense, so 마셨어요 naturally tells us the sequence happened in the past.',
      ru: 'У первого глагола уберите -다 и добавьте -고 прямо к основе. Форма не зависит от гласной или 받침: 먹다 → 먹고, 보다 → 보고, 하다 → 하고. "숙제를 하고 텔레비전을 봐요" означает сначала сделать домашнее задание, затем смотреть телевизор. "밥을 먹고 차를 마셨어요" — сначала поесть, затем выпить чай. На этом уровне первый глагол соединяется через -고, а время обычно выражается последним глаголом.',
    },
    conjugationRule: {
      ko: '동사 어간 + 고  ·  받침·모음과 상관없이 형태 변화 없음',
      uz: "Fe'l o‘zagi + 고  ·  받침 va unliga qarab o‘zgarmaydi",
      en: 'verb stem + 고  ·  no change for vowels or final consonants',
      ru: 'основа глагола + 고  ·  форма не зависит от гласной или 받침',
    },
    conjugations: [
      { base: '먹다', result: '먹고' },
      { base: '보다', result: '보고' },
      { base: '하다', result: '하고' },
      { base: '읽다', result: '읽고' },
      { base: '마시다', result: '마시고' },
      { base: '만나다', result: '만나고' },
    ],
    examples: [
      {
        ko: '숙제를 하고 텔레비전을 봐요.',
        highlight: '하고',
        gloss: {
          ko: '숙제를 하고 텔레비전을 봐요.',
          uz: 'Uy vazifasini qilib, keyin televizor ko‘raman.',
          en: 'I do my homework and then watch television.',
          ru: 'Я делаю домашнее задание, а затем смотрю телевизор.',
        },
      },
      {
        ko: '밥을 먹고 차를 마셨어요.',
        highlight: '먹고',
        gloss: {
          ko: '밥을 먹고 차를 마셨어요.',
          uz: 'Ovqat yeb, keyin choy ichdim.',
          en: 'I ate and then drank tea.',
          ru: 'Я поел, а затем выпил чай.',
        },
      },
      {
        ko: '친구하고 같이 영화 보고 쇼핑했어요.',
        highlight: '보고',
        gloss: {
          ko: '친구하고 같이 영화 보고 쇼핑했어요.',
          uz: 'Do‘stim bilan kino ko‘rib, keyin xarid qildim.',
          en: 'I watched a movie with my friend and then went shopping.',
          ru: 'Я посмотрел фильм с другом, а потом сходил за покупками.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '주말에 뭐 했어요?',
        highlight: '뭐 했어요',
        gloss: {
          ko: '주말에 뭐 했어요?',
          uz: 'Dam olish kunlari nima qildingiz?',
          en: 'What did you do over the weekend?',
          ru: 'Что вы делали на выходных?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '친구하고 같이 영화 보고 쇼핑했어요.',
        highlight: '보고',
        gloss: {
          ko: '친구하고 같이 영화 보고 쇼핑했어요.',
          uz: 'Do‘stim bilan kino ko‘rib, keyin xarid qildim.',
          en: 'I watched a movie with my friend and then went shopping.',
          ru: 'Я посмотрел фильм с другом, а затем сходил за покупками.',
        },
      },
    ],
    similar: {
      pattern: 'N하고 N',
      note: {
        ko: '둘 다 "그리고"처럼 이어 주지만 연결하는 대상이 달라요. "사과하고 배"의 "하고"는 명사와 명사를 연결하고, "먹고 마셔요"의 "-고"는 동사와 동사를 연결해요. "친구하고 영화 보고 쇼핑했어요"처럼 한 문장 안에 둘이 같이 나올 수도 있어요.',
        uz: 'Ikkalasi ham "va" ma’nosini beradi, lekin narsasi boshqa. "사과하고 배" dagi 하고 otlarni, "먹고 마셔요" dagi -고 esa fe’llarni bog‘laydi.',
        en: 'Both can feel like "and", but they connect different things. 하고 in 사과하고 배 connects nouns; -고 in 먹고 마셔요 connects verbs. They can even appear in the same sentence.',
        ru: 'Оба могут означать «и», но соединяют разные части. 하고 в 사과하고 배 соединяет существительные, а -고 в 먹고 마셔요 — глаголы.',
      },
    },
    cautions: [
      {
        ko: '"먹어요고", "봐요고"처럼 이미 활용한 형태 뒤에 "-고"를 붙이지 않아요. "-다"를 뗀 어간에 바로 붙여서 "먹고", "보고"라고 해요.',
        uz: '"먹어요고", "봐요고" deyilmaydi. "-고" bevosita o‘zakka qo‘shiladi: 먹고, 보고.',
        en: 'Do not attach -고 to an already conjugated form such as 먹어요고 or 봐요고. Attach it directly to the stem: 먹고, 보고.',
        ru: 'Не добавляйте -고 к уже спряжённой форме: 먹어요고, 봐요고 неверны. Правильно от основы: 먹고, 보고.',
      },
      {
        ko: '"하다"는 "-고" 앞에서 "해고"가 아니라 "하고"예요. 숙제하다 → 숙제하고, 운동하다 → 운동하고예요.',
        uz: '"하다" "-고" oldida "해고" emas, "하고": 숙제하다 → 숙제하고.',
        en: '하다 becomes 하고 before -고, not 해고: 숙제하다 → 숙제하고.',
        ru: '하다 перед -고 даёт 하고, а не 해고: 숙제하다 → 숙제하고.',
      },
      {
        ko: '이 과의 기본 순서 표현에서는 앞 행동에 과거형을 반복해서 붙일 필요가 없어요. "밥을 먹고 차를 마셨어요"처럼 마지막 동사에서 과거를 나타내면 자연스러워요.',
        uz: 'Bu darsdagi oddiy ketma-ketlikda har bir fe’lga o‘tgan zamon qo‘shish shart emas. "밥을 먹고 차를 마셨어요" tabiiy.',
        en: 'In the basic sequential pattern taught here, you do not need to repeat past tense on every action. 밥을 먹고 차를 마셨어요 is the natural beginner pattern.',
        ru: 'В базовой последовательной конструкции этого урока не нужно повторять прошедшее время у каждого действия. Естественно: 밥을 먹고 차를 마셨어요.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '먹다 + -고 → ?',
          uz: '먹다 + -고 → ?',
          en: '먹다 + -고 → ?',
          ru: '먹다 + -고 → ?',
        },
        options: [
          { text: '먹고', correct: true },
          { text: '먹어요고', correct: false },
          { text: '먹이고', correct: false },
        ],
      },
      {
        question: {
          ko: '숙제하다 + -고 → ?',
          uz: '숙제하다 + -고 → ?',
          en: '숙제하다 + -고 → ?',
          ru: '숙제하다 + -고 → ?',
        },
        options: [
          { text: '숙제하고', correct: true },
          { text: '숙제해고', correct: false },
          { text: '숙제해요고', correct: false },
        ],
      },
      {
        question: {
          ko: '숙제를 ___ 텔레비전을 봐요.',
          uz: '숙제를 ___ 텔레비전을 봐요.',
          en: '숙제를 ___ 텔레비전을 봐요.',
          ru: '숙제를 ___ 텔레비전을 봐요.',
        },
        options: [
          { text: '하고', correct: true },
          { text: '해요고', correct: false },
          { text: '했어요를', correct: false },
        ],
      },
      {
        question: {
          ko: '어제 밥을 ___ 차를 마셨어요.',
          uz: '어제 밥을 ___ 차를 마셨어요.',
          en: '어제 밥을 ___ 차를 마셨어요.',
          ru: '어제 밥을 ___ 차를 마셨어요.',
        },
        options: [
          { text: '먹고', correct: true },
          { text: '먹어요고', correct: false },
          { text: '먹을', correct: false },
        ],
      },
      {
        question: {
          ko: '"사과하고 배"의 하고와 "먹고 마셔요"의 -고 차이는?',
          uz: '"사과하고 배" dagi 하고 bilan "먹고 마셔요" dagi -고 farqi nima?',
          en: 'What is the difference between 하고 in 사과하고 배 and -고 in 먹고 마셔요?',
          ru: 'В чём разница между 하고 в 사과하고 배 и -고 в 먹고 마셔요?',
        },
        options: [
          {
            text: '하고는 명사를, -고는 동사를 연결해요',
            correct: true,
          },
          {
            text: '둘 다 장소만 연결해요',
            correct: false,
          },
          {
            text: '-고는 명사 뒤에만 써요',
            correct: false,
          },
        ],
      },
    ],
  },
  {
    code: 'request-euseyo',
    pattern: 'V-(으)세요',
    section: 1,
    order: 21,
    isActive: true,
    summary: {
      ko: '상대방에게 어떤 행동을 해 달라고 정중하게 부탁하거나 안내할 때 써요.',
      uz: 'Suhbatdoshdan biror ishni muloyim tarzda qilishni so‘rash yoki ko‘rsatma berishda ishlatiladi.',
      en: 'Used to politely ask or tell the listener to do something.',
      ru: 'Используется, чтобы вежливо попросить или предложить собеседнику выполнить действие.',
    },
    tags: [
      {
        ko: '초급',
        uz: "Boshlang'ich",
        en: 'Beginner',
        ru: 'Начальный',
      },
      {
        ko: '부탁',
        uz: 'Iltimos',
        en: 'Request',
        ru: 'Просьба',
      },
      {
        ko: '지시',
        uz: "Ko'rsatma",
        en: 'Instruction',
        ru: 'Указание',
      },
    ],
    explanation: {
      ko: '상대방에게 "이 행동을 해 주세요"라는 뜻으로 말할 때 동사에 "-(으)세요"를 붙여요. 동사의 "-다"를 떼었을 때 받침이 없으면 "-세요", 받침이 있으면 "-으세요"를 붙여요. 그래서 보다 → 보세요, 가다 → 가세요가 되고, 읽다 → 읽으세요, 앉다 → 앉으세요가 돼요. 교재의 "어서 오세요", "여기 앉으세요", "책을 좀 읽으세요"처럼 식당·교실·가게 등에서 안내하거나 정중하게 행동을 요청할 때 매우 자주 사용해요. 명령처럼 들릴 수 있는 상황에서도 "-세요"를 사용하면 기본적으로 존댓말이 되지만, 말투와 상황에 따라 강한 지시처럼 들릴 수도 있어요. 초급에서는 상대에게 정중하게 행동을 요청하는 표현으로 익히면 돼요.',
      uz: 'Suhbatdoshga "shu ishni qiling" deb muloyim aytishda fe’lga "-(으)세요" qo‘shiladi. "-다" olib tashlanganda o‘zak 받침 siz tugasa "-세요", 받침 bilan tugasa "-으세요" qo‘shiladi. Shuning uchun 보다 → 보세요, 가다 → 가세요, 읽다 → 읽으세요, 앉다 → 앉으세요 bo‘ladi. Darslikdagi "어서 오세요", "여기 앉으세요", "책을 좀 읽으세요" kabi ifodalar restoran, sinfxona yoki do‘konda yo‘l-yo‘riq ko‘rsatish va muloyim iltimos qilishda ko‘p ishlatiladi.',
      en: 'Attach -(으)세요 to a verb when politely asking or instructing the listener to do something. After removing -다, use -세요 if the stem has no final consonant and -으세요 if it has one. Thus 보다 → 보세요 and 가다 → 가세요, while 읽다 → 읽으세요 and 앉다 → 앉으세요. Expressions such as 어서 오세요, 여기 앉으세요 and 책을 좀 읽으세요 are extremely common for polite directions and requests in restaurants, classrooms and shops.',
      ru: 'Добавляйте -(으)세요 к глаголу, когда вежливо просите или инструктируете собеседника что-то сделать. После удаления -다 при отсутствии 받침 используется -세요, а при наличии 받침 — -으세요. Поэтому 보다 → 보세요, 가다 → 가세요, а 읽다 → 읽으세요, 앉다 → 앉으세요. Такие выражения, как 어서 오세요, 여기 앉으세요 и 책을 좀 읽으세요, часто используются для вежливых просьб и указаний.',
    },
    conjugationRule: {
      ko: '동사 어간 받침 X + -세요  ·  받침 O + -으세요',
      uz: "Fe'l o‘zagi 받침 siz + -세요  ·  받침 bilan + -으세요",
      en: 'verb stem with no final consonant + -세요  ·  final consonant + -으세요',
      ru: 'основа без конечной согласной + -세요  ·  с конечной согласной + -으세요',
    },
    conjugations: [
      {
        base: '보다',
        result: '보세요',
      },
      {
        base: '오다',
        result: '오세요',
      },
      {
        base: '앉다',
        result: '앉으세요',
      },
      {
        base: '읽다',
        result: '읽으세요',
      },
      {
        base: '기다리다',
        result: '기다리세요',
      },
    ],
    examples: [
      {
        ko: '어서 오세요.',
        highlight: '오세요',
        gloss: {
          ko: '어서 오세요.',
          uz: 'Xush kelibsiz.',
          en: 'Welcome. / Please come in.',
          ru: 'Добро пожаловать.',
        },
      },
      {
        ko: '여기 앉으세요.',
        highlight: '앉으세요',
        gloss: {
          ko: '여기 앉으세요.',
          uz: 'Bu yerga o‘tiring.',
          en: 'Please sit here.',
          ru: 'Садитесь здесь, пожалуйста.',
        },
      },
      {
        ko: '책을 좀 읽으세요.',
        highlight: '읽으세요',
        gloss: {
          ko: '책을 좀 읽으세요.',
          uz: 'Iltimos, kitobni o‘qing.',
          en: 'Please read the book.',
          ru: 'Пожалуйста, почитайте книгу.',
        },
      },
      {
        ko: '숙제를 하고 텔레비전을 보세요.',
        highlight: '보세요',
        gloss: {
          ko: '숙제를 하고 텔레비전을 보세요.',
          uz: 'Uy vazifasini qilib, keyin televizor ko‘ring.',
          en: 'Do your homework and then watch television.',
          ru: 'Сделайте домашнее задание, а затем смотрите телевизор.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '어서 오세요. 여기 앉으세요.',
        highlight: '앉으세요',
        gloss: {
          ko: '어서 오세요. 여기 앉으세요.',
          uz: 'Xush kelibsiz. Bu yerga o‘tiring.',
          en: 'Welcome. Please sit here.',
          ru: 'Добро пожаловать. Садитесь здесь.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 감사합니다.',
        highlight: '감사합니다',
        gloss: {
          ko: '네, 감사합니다.',
          uz: 'Ha, rahmat.',
          en: 'Yes, thank you.',
          ru: 'Да, спасибо.',
        },
      },
    ],
    similar: {
      pattern: 'V-아요/어요',
      note: {
        ko: '"앉아요"는 상대에게 명령하는 말이 아니라 "앉습니다/앉아요"라는 행동이나 사실을 말하는 기본형이에요. "앉으세요"는 상대방에게 앉아 달라고 하는 말이에요. "책을 읽어요"는 "책을 읽습니다", "책을 읽으세요"는 "책을 읽어 주세요"에 가까워요.',
        uz: '"앉아요" oddiy harakatni bildiradi, "앉으세요" esa suhbatdoshga o‘tirishni so‘raydi. "책을 읽어요" — kitob o‘qiyman/o‘qiydi, "책을 읽으세요" — kitobni o‘qing.',
        en: '앉아요 simply describes the action "sit/sits", while 앉으세요 asks the listener to sit. Likewise 책을 읽어요 describes reading, whereas 책을 읽으세요 means "please read the book."',
        ru: '앉아요 просто описывает действие, а 앉으세요 просит собеседника сесть. Аналогично 책을 읽어요 — описание чтения, а 책을 읽으세요 — «прочитайте книгу, пожалуйста».',
      },
    },
    cautions: [
      {
        ko: '받침이 있는 동사에 바로 "-세요"만 붙이지 않아요. "읽세요", "앉세요"가 아니라 "읽으세요", "앉으세요"예요.',
        uz: '받침 bilan tugagan fe’lga faqat "-세요" qo‘shmang. "읽세요", "앉세요" emas, "읽으세요", "앉으세요".',
        en: 'Do not attach only -세요 after a regular stem ending in a final consonant. Use 읽으세요 and 앉으세요, not 읽세요 or 앉세요.',
        ru: 'После основы с конечной согласной не добавляйте просто -세요. Правильно 읽으세요 и 앉으세요, а не 읽세요 и 앉세요.',
      },
      {
        ko: '"읽어요" 뒤에 다시 "-세요"를 붙여 "읽어요세요"라고 하지 않아요. 항상 기본형 읽다에서 "-다"를 떼고 만들어요.',
        uz: '"읽어요" ga yana "-세요" qo‘shib "읽어요세요" demang. Doim 읽다 dan "-다" ni olib tashlab yasang.',
        en: 'Do not add -세요 to the already conjugated 읽어요. Build the form from 읽다: 읽다 → 읽으세요.',
        ru: 'Не добавляйте -세요 к уже готовому 읽어요. Формируйте от 읽다: 읽다 → 읽으세요.',
      },
      {
        ko: '"주세요"는 주문에서 아주 자주 써요. "비빔밥 주세요", "메뉴 좀 주세요"처럼 원하는 것을 말하고 주세요를 붙이면 정중한 요청이 돼요.',
        uz: '"주세요" buyurtma berishda juda ko‘p ishlatiladi. "비빔밥 주세요", "메뉴 좀 주세요" kabi aytiladi.',
        en: '주세요 is especially common when ordering or requesting an item: 비빔밥 주세요, 메뉴 좀 주세요.',
        ru: '주세요 особенно часто используется при заказе или просьбе дать предмет: 비빔밥 주세요, 메뉴 좀 주세요.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '보다 → 선생님이 "책을 ___."라고 말해요.',
          uz: '보다 → O‘qituvchi "책을 ___." deydi.',
          en: '보다 → The teacher says, "책을 ___."',
          ru: '보다 → Учитель говорит: «책을 ___.»',
        },
        options: [
          {
            text: '보세요',
            correct: true,
          },
          {
            text: '봐요세요',
            correct: false,
          },
          {
            text: '보으세요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '앉다 + -(으)세요 → ?',
          uz: '앉다 + -(으)세요 → ?',
          en: '앉다 + -(으)세요 → ?',
          ru: '앉다 + -(으)세요 → ?',
        },
        options: [
          {
            text: '앉으세요',
            correct: true,
          },
          {
            text: '앉세요',
            correct: false,
          },
          {
            text: '앉아요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '읽다 + -(으)세요 → ?',
          uz: '읽다 + -(으)세요 → ?',
          en: '읽다 + -(으)세요 → ?',
          ru: '읽다 + -(으)세요 → ?',
        },
        options: [
          {
            text: '읽으세요',
            correct: true,
          },
          {
            text: '읽세요',
            correct: false,
          },
          {
            text: '읽어요세요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '식당에서 손님에게 자리를 안내할 때 가장 자연스러운 말은?',
          uz: 'Restoranda mijozga joy ko‘rsatishda eng tabiiy gap qaysi?',
          en: 'What is the most natural way to direct a customer to a seat?',
          ru: 'Как естественнее всего предложить посетителю сесть?',
        },
        options: [
          {
            text: '여기 앉으세요.',
            correct: true,
          },
          {
            text: '여기 앉아요?',
            correct: false,
          },
          {
            text: '여기 앉았어요.',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '"책을 읽어요"와 "책을 읽으세요"의 차이로 맞는 것은?',
          uz: '"책을 읽어요" va "책을 읽으세요" farqi qaysi?',
          en: 'Which correctly explains the difference between 책을 읽어요 and 책을 읽으세요?',
          ru: 'В чём правильная разница между 책을 읽어요 и 책을 읽으세요?',
        },
        options: [
          {
            text: '읽어요는 행동을 말하고, 읽으세요는 상대에게 읽어 달라고 해요',
            correct: true,
          },
          {
            text: '둘은 항상 완전히 같은 뜻이에요',
            correct: false,
          },
          {
            text: '읽으세요는 과거형이에요',
            correct: false,
          },
        ],
      },
    ],
  },
  // ───────── 섹션 1-22. 수량 N 개[병, 잔, 그릇] ─────────
  {
    code: 'counter-gae-byeong-jan-geureut',
    pattern: 'N 개[병, 잔, 그릇]',
    section: 1,
    order: 22,
    isActive: true,
    summary: {
      ko: '물건이나 음식의 개수를 셀 때 숫자 뒤에 알맞은 단위 명사를 붙여요.',
      uz: 'Narsa yoki ovqat miqdorini sanaganda sondan keyin mos sanoq birligi qo‘yiladi.',
      en: 'Use the appropriate counter after a number when counting items, bottles, cups or bowls of food.',
      ru: 'При подсчёте предметов, бутылок, чашек или порций после числа используется подходящее счётное слово.',
    },
    tags: [
      {
        ko: '초급',
        uz: "Boshlang'ich",
        en: 'Beginner',
        ru: 'Начальный',
      },
      {
        ko: '수량',
        uz: 'Miqdor',
        en: 'Quantity',
        ru: 'Количество',
      },
      {
        ko: '단위 명사',
        uz: 'Sanoq birligi',
        en: 'Counters',
        ru: 'Счётные слова',
      },
    ],
    explanation: {
      ko: '한국어에서는 물건을 셀 때 숫자만 말하지 않고 물건의 종류에 맞는 단위를 함께 써요. 일반적인 물건은 "개", 병에 든 것은 "병", 컵이나 잔에 담긴 음료는 "잔", 그릇에 담아 먹는 음식은 "그릇"을 사용해요. 그래서 "빵 한 개", "콜라 두 병", "커피 세 잔", "냉면 네 그릇"이라고 해요. 이때 하나·둘·셋·넷은 단위 명사 앞에서 한·두·세·네로 바뀌어요. 하나 개, 둘 잔이라고 하지 않고 한 개, 두 잔이라고 해야 해요. 다섯부터는 "다섯 개", "여섯 병"처럼 기본형을 그대로 사용해요. 주문할 때는 음식 이름 + 수량 + 단위 + 주세요 순서가 매우 자주 쓰여요. "비빔밥 두 그릇 주세요", "샌드위치 한 개 주세요"처럼 말하면 돼요.',
      uz: 'Koreys tilida narsalarni sanaganda faqat son emas, narsaga mos sanoq birligi ham ishlatiladi. Umumiy narsalar uchun "개", shishadagi narsalar uchun "병", piyola yoki stakandagi ichimlik uchun "잔", kosa yoki idishdagi taom uchun "그릇" ishlatiladi. Shuning uchun "빵 한 개", "콜라 두 병", "커피 세 잔", "냉면 네 그릇" deyiladi. 하나, 둘, 셋, 넷 sanoq birligi oldida 한, 두, 세, 네 shakliga o‘zgaradi. "하나 개" yoki "둘 잔" emas, "한 개", "두 잔" deyiladi. 다섯 dan boshlab asosiy shakl saqlanadi.',
      en: 'Korean normally combines a number with a counter appropriate to what is being counted. Use 개 for general items, 병 for bottles, 잔 for cups or glasses of drinks, and 그릇 for bowls or servings of food. Thus: 빵 한 개, 콜라 두 병, 커피 세 잔, 냉면 네 그릇. Before a counter, 하나, 둘, 셋 and 넷 change to 한, 두, 세 and 네. Do not say 하나 개 or 둘 잔; say 한 개 and 두 잔. From 다섯 onward, the regular number form is used. For ordering, the very common order is item + number + counter + 주세요.',
      ru: 'В корейском при подсчёте обычно используется не только число, но и подходящее счётное слово. 개 — для обычных предметов, 병 — для бутылок, 잔 — для чашек и стаканов напитков, 그릇 — для блюд или порций в миске. Поэтому говорят 빵 한 개, 콜라 두 병, 커피 세 잔, 냉면 네 그릇. Перед счётным словом 하나, 둘, 셋, 넷 превращаются в 한, 두, 세, 네. Нельзя 하나 개 или 둘 잔; правильно 한 개 и 두 잔. Начиная с 다섯 форма числа сохраняется.',
    },
    conjugationRule: {
      ko: '물건 + 고유어 수 + 단위  ·  하나→한, 둘→두, 셋→세, 넷→네  ·  일반 물건 개 / 병 병 / 음료 잔 / 음식 그릇',
      uz: 'Narsa + koreyscha son + sanoq birligi  ·  하나→한, 둘→두, 셋→세, 넷→네  ·  umumiy 개 / shisha 병 / ichimlik 잔 / taom 그릇',
      en: 'item + native-Korean number + counter  ·  하나→한, 둘→두, 셋→세, 넷→네  ·  general 개 / bottle 병 / drink 잔 / bowl-serving 그릇',
      ru: 'предмет + исконно-корейское число + счётное слово  ·  하나→한, 둘→두, 셋→세, 넷→네  ·  предмет 개 / бутылка 병 / напиток 잔 / порция 그릇',
    },
    conjugations: [
      {
        base: '하나 + 개',
        result: '한 개',
      },
      {
        base: '둘 + 병',
        result: '두 병',
      },
      {
        base: '셋 + 잔',
        result: '세 잔',
      },
      {
        base: '넷 + 그릇',
        result: '네 그릇',
      },
      {
        base: '다섯 + 개',
        result: '다섯 개',
      },
    ],
    examples: [
      {
        ko: '빵 한 개 주세요.',
        highlight: '한 개',
        gloss: {
          ko: '빵 한 개 주세요.',
          uz: 'Bitta non bering.',
          en: 'Please give me one piece of bread.',
          ru: 'Дайте, пожалуйста, одну булочку.',
        },
      },
      {
        ko: '콜라 몇 병 샀어요? 두 병 샀어요.',
        highlight: '두 병',
        gloss: {
          ko: '콜라 몇 병 샀어요? 두 병 샀어요.',
          uz: 'Nechta shisha kola sotib oldingiz? Ikki shisha oldim.',
          en: 'How many bottles of cola did you buy? I bought two.',
          ru: 'Сколько бутылок колы вы купили? Я купил две.',
        },
      },
      {
        ko: '오늘 커피를 세 잔 마셨어요.',
        highlight: '세 잔',
        gloss: {
          ko: '오늘 커피를 세 잔 마셨어요.',
          uz: 'Bugun uch piyola qahva ichdim.',
          en: 'I drank three cups of coffee today.',
          ru: 'Сегодня я выпил три чашки кофе.',
        },
      },
      {
        ko: '냉면 네 그릇 주세요.',
        highlight: '네 그릇',
        gloss: {
          ko: '냉면 네 그릇 주세요.',
          uz: 'To‘rt porsiya nenmyon bering.',
          en: 'Four bowls of naengmyeon, please.',
          ru: 'Четыре порции нэнмёна, пожалуйста.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '비빔밥 두 그릇 주세요.',
        highlight: '두 그릇',
        gloss: {
          ko: '비빔밥 두 그릇 주세요.',
          uz: 'Ikki porsiya bibimbap bering.',
          en: 'Two bowls of bibimbap, please.',
          ru: 'Две порции пибимпапа, пожалуйста.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 잠깐만 기다리세요.',
        highlight: '기다리세요',
        gloss: {
          ko: '네, 잠깐만 기다리세요.',
          uz: 'Ha, bir oz kuting.',
          en: 'Yes, please wait a moment.',
          ru: 'Да, подождите немного, пожалуйста.',
        },
      },
    ],
    similar: {
      pattern: '하나 / 한 개',
      note: {
        ko: '숫자가 혼자 서면 "하나, 둘, 셋, 넷"을 쓸 수 있지만 단위 명사 앞에서는 "한, 두, 세, 네"가 돼요. 교재처럼 "방에 책상이 한 개 있어요"는 "방에 책상이 하나 있어요"라고도 말할 수 있어요. 하지만 단위를 직접 붙일 때는 반드시 "한 개"라고 해야 해요.',
        uz: 'Son yolg‘iz kelsa 하나, 둘, 셋, 넷 ishlatilishi mumkin, lekin sanoq birligi oldida 한, 두, 세, 네 bo‘ladi. "책상이 한 개 있어요" ni "책상이 하나 있어요" deyish ham mumkin.',
        en: 'When the number stands alone, use 하나, 둘, 셋, 넷. Before a counter, use 한, 두, 세, 네. 책상이 한 개 있어요 can also be expressed as 책상이 하나 있어요, but directly before 개 the form must be 한.',
        ru: 'Самостоятельно числа употребляются как 하나, 둘, 셋, 넷. Перед счётным словом используются 한, 두, 세, 네. 책상이 한 개 있어요 можно также сказать как 책상이 하나 있어요, но непосредственно перед 개 нужно 한.',
      },
    },
    cautions: [
      {
        ko: '"하나 개, 둘 병, 셋 잔, 넷 그릇"이라고 하지 않아요. 한 개, 두 병, 세 잔, 네 그릇이라고 해요.',
        uz: '"하나 개, 둘 병, 셋 잔, 넷 그릇" deyilmaydi. 한 개, 두 병, 세 잔, 네 그릇 deyiladi.',
        en: 'Do not say 하나 개, 둘 병, 셋 잔 or 넷 그릇. Use 한 개, 두 병, 세 잔 and 네 그릇.',
        ru: 'Не говорите 하나 개, 둘 병, 셋 잔, 넷 그릇. Правильно: 한 개, 두 병, 세 잔, 네 그릇.',
      },
      {
        ko: '음식마다 무조건 "개"를 쓰는 것은 아니에요. 비빔밥이나 냉면처럼 한 그릇씩 나오는 음식은 "그릇"이 자연스러워요.',
        uz: 'Har bir ovqat uchun "개" ishlatilmaydi. Bibimbap yoki nenmyon kabi kosada beriladigan taomlar uchun "그릇" tabiiy.',
        en: 'Do not automatically use 개 for every food. For dishes served by the bowl, such as bibimbap or naengmyeon, 그릇 is natural.',
        ru: 'Не используйте 개 автоматически для любой еды. Для блюд, подаваемых порциями в миске, например пибимпапа или нэнмёна, естественно 그릇.',
      },
      {
        ko: '가격의 "삼천 원, 이만 원"은 한자어 수를 사용하지만 개수를 셀 때는 "한 개, 두 잔"처럼 고유어 수를 사용해요. 돈과 물건 개수를 섞지 않도록 주의해요.',
        uz: 'Narxda "삼천 원, 이만 원" kabi xitoy-koreys sonlari, narsalarni sanashda esa "한 개, 두 잔" kabi sof koreys sonlari ishlatiladi.',
        en: 'Prices use Sino-Korean numbers such as 삼천 원 and 이만 원, while item counts use native Korean forms such as 한 개 and 두 잔.',
        ru: 'Для цен используются китайско-корейские числа, например 삼천 원 и 이만 원, а для количества предметов — исконно-корейские формы 한 개, 두 잔.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '사과 하나를 셀 때 알맞은 표현은?',
          uz: 'Bitta olmani sanash uchun qaysi ifoda to‘g‘ri?',
          en: 'Which expression correctly counts one apple?',
          ru: 'Как правильно посчитать одно яблоко?',
        },
        options: [
          {
            text: '사과 한 개',
            correct: true,
          },
          {
            text: '사과 하나 개',
            correct: false,
          },
          {
            text: '사과 일 개',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '커피 3잔을 자연스럽게 말하면?',
          uz: '3 piyola qahvani koreyscha qanday aytamiz?',
          en: 'How do you naturally say "three cups of coffee"?',
          ru: 'Как естественно сказать «три чашки кофе»?',
        },
        options: [
          {
            text: '커피 세 잔',
            correct: true,
          },
          {
            text: '커피 셋 잔',
            correct: false,
          },
          {
            text: '커피 삼 잔',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '냉면 4인분을 주문할 때 알맞은 말은?',
          uz: 'To‘rt porsiya nenmyon buyurtma qilish uchun qaysi gap to‘g‘ri?',
          en: 'Which is correct when ordering four bowls of naengmyeon?',
          ru: 'Как правильно заказать четыре порции нэнмёна?',
        },
        options: [
          {
            text: '냉면 네 그릇 주세요.',
            correct: true,
          },
          {
            text: '냉면 넷 그릇 주세요.',
            correct: false,
          },
          {
            text: '냉면 사 그릇 주세요.',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '병에 든 콜라 두 개를 셀 때 교재에서 사용하는 단위는?',
          uz: 'Shishadagi ikki kola uchun darslik qaysi sanoq birligini ishlatadi?',
          en: 'Which counter does the textbook use for bottles of cola?',
          ru: 'Какое счётное слово используется для бутылок колы?',
        },
        options: [
          {
            text: '병',
            correct: true,
          },
          {
            text: '잔',
            correct: false,
          },
          {
            text: '그릇',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '맞는 주문 문장을 고르세요.',
          uz: 'To‘g‘ri buyurtma gapini tanlang.',
          en: 'Choose the correct ordering sentence.',
          ru: 'Выберите правильную фразу для заказа.',
        },
        options: [
          {
            text: '비빔밥 두 그릇 주세요.',
            correct: true,
          },
          {
            text: '비빔밥 둘 그릇 주세요.',
            correct: false,
          },
          {
            text: '비빔밥 이 그릇 주세요.',
            correct: false,
          },
        ],
      },
    ],
  }, // ───────── 섹션 1-23. 상태·평가 N이/가 A-아요/어요 ─────────
  {
    code: 'subject-adjective-i-ga',
    pattern: 'N이/가 A-아요/어요',
    section: 1,
    order: 23,
    isActive: true,
    summary: {
      ko: '사람·물건·장소가 어떤 상태인지, 무엇이 좋은지·싼지·맛있는지 설명할 때 써요.',
      uz: 'Odam, narsa yoki joyning holatini — nima yaxshi, arzon yoki mazali ekanini aytishda ishlatiladi.',
      en: 'Used to describe the state or quality of a person, thing or place: what is good, cheap, delicious, crowded and so on.',
      ru: 'Используется для описания состояния или качества человека, предмета или места: что хорошее, дешёвое, вкусное, людное и т. д.',
    },
    tags: [
      {
        ko: '초급',
        uz: "Boshlang'ich",
        en: 'Beginner',
        ru: 'Начальный',
      },
      {
        ko: '형용사',
        uz: 'Sifat',
        en: 'Adjective',
        ru: 'Прилагательное',
      },
      {
        ko: '상태',
        uz: 'Holat',
        en: 'Description',
        ru: 'Описание',
      },
    ],
    explanation: {
      ko: '어떤 사람·물건·장소의 상태나 특징을 설명할 때 그 대상에는 "이/가"를 붙이고 뒤에 형용사를 "-아요/어요" 형태로 말해요. 받침이 있는 명사 뒤에는 "이", 받침이 없는 명사 뒤에는 "가"가 와요. 그래서 "길이 복잡해요", "학교가 좋아요", "오렌지가 싸요"처럼 말해요. 질문할 때도 같은 구조가 중요해요. "뭐가 맛있어요?"라고 물으면 맛있는 대상이 무엇인지 묻는 것이므로 "수박이 맛있어요"라고 대답할 수 있어요. "어디가 복잡해요?"에는 "명동이 복잡해요", "무슨 노래가 좋아요?"에는 좋아하는 노래가 주어가 되어 "아리랑이 좋아요"처럼 말할 수 있어요. 여기서 핵심은 형용사가 어떤 대상을 설명하는지 보여 주는 조사 "이/가"예요.',
      uz: 'Odam, narsa yoki joyning holati va xususiyatini aytganda tasvirlanayotgan otga "이/가", undan keyin sifatning "-아요/어요" shakli keladi. 받침 bor otdan keyin "이", 받침 yo‘q otdan keyin "가": "길이 복잡해요", "학교가 좋아요", "오렌지가 싸요". Savolda ham shu tuzilma ishlatiladi. "뭐가 맛있어요?" — nima mazali ekanini so‘raydi, shuning uchun "수박이 맛있어요" deb javob beriladi.',
      en: 'When describing the state or quality of a person, thing or place, mark the thing being described with 이/가 and follow it with an adjective in the -아요/어요 style. Use 이 after a noun ending in a final consonant and 가 after one without: 길이 복잡해요, 학교가 좋아요, 오렌지가 싸요. Questions follow the same logic. 뭐가 맛있어요? asks which thing is delicious, so 수박이 맛있어요 is a natural answer. The central idea is that 이/가 marks the noun whose quality the adjective describes.',
      ru: 'При описании состояния или качества человека, предмета или места существительное получает 이/가, а затем следует прилагательное в форме -아요/어요. После 받침 используется 이, без 받침 — 가: 길이 복잡해요, 학교가 좋아요, 오렌지가 싸요. В вопросах действует та же логика. 뭐가 맛있어요? спрашивает, что вкусное, поэтому естественный ответ — 수박이 맛있어요.',
    },
    conjugationRule: {
      ko: '명사 받침 O + 이 / 받침 X + 가  ·  형용사 어간 ㅏ·ㅗ + -아요 / 그 밖 + -어요 / 하다 → 해요',
      uz: 'Ot 받침 bilan + 이 / 받침 siz + 가  ·  sifat o‘zagi ㅏ·ㅗ + -아요 / boshqalar + -어요 / 하다 → 해요',
      en: 'noun with final consonant + 이 / no final consonant + 가  ·  adjective stem ㅏ·ㅗ + -아요 / others + -어요 / 하다 → 해요',
      ru: 'существительное с 받침 + 이 / без 받침 + 가  ·  основа прилагательного ㅏ·ㅗ + -아요 / прочие + -어요 / 하다 → 해요',
    },
    conjugations: [
      {
        base: '오렌지 + 싸다',
        result: '오렌지가 싸요',
      },
      {
        base: '학교 + 좋다',
        result: '학교가 좋아요',
      },
      {
        base: '길 + 복잡하다',
        result: '길이 복잡해요',
      },
      {
        base: '수박 + 맛있다',
        result: '수박이 맛있어요',
      },
      {
        base: '옷 + 싸다',
        result: '옷이 싸요',
      },
    ],
    examples: [
      {
        ko: '오렌지가 싸요.',
        highlight: '오렌지가 싸요',
        gloss: {
          ko: '오렌지가 싸요.',
          uz: 'Apelsin arzon.',
          en: 'Oranges are cheap.',
          ru: 'Апельсины дешёвые.',
        },
      },
      {
        ko: '학교가 좋아요.',
        highlight: '학교가 좋아요',
        gloss: {
          ko: '학교가 좋아요.',
          uz: 'Maktab yaxshi.',
          en: 'The school is good.',
          ru: 'Школа хорошая.',
        },
      },
      {
        ko: '길이 복잡해요.',
        highlight: '길이 복잡해요',
        gloss: {
          ko: '길이 복잡해요.',
          uz: 'Yo‘l gavjum.',
          en: 'The road is crowded.',
          ru: 'На дороге много людей и машин.',
        },
      },
      {
        ko: '수박이 맛있어요.',
        highlight: '수박이 맛있어요',
        gloss: {
          ko: '수박이 맛있어요.',
          uz: 'Tarvuz mazali.',
          en: 'Watermelon is delicious.',
          ru: 'Арбуз вкусный.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '뭐가 맛있어요?',
        highlight: '뭐가',
        gloss: {
          ko: '뭐가 맛있어요?',
          uz: 'Nima mazali?',
          en: 'What is delicious?',
          ru: 'Что вкусное?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '수박이 맛있어요.',
        highlight: '수박이',
        gloss: {
          ko: '수박이 맛있어요.',
          uz: 'Tarvuz mazali.',
          en: 'Watermelon is delicious.',
          ru: 'Арбуз вкусный.',
        },
      },
    ],
    similar: {
      pattern: 'N을/를 좋아해요',
      note: {
        ko: '"좋다"와 "좋아하다"를 특히 조심해야 해요. "이 노래가 좋아요"에서는 노래 자체가 좋다는 뜻이라 "가"를 써요. "저는 이 노래를 좋아해요"에서는 내가 노래를 좋아한다는 행동·취향을 말하므로 "를"을 써요. 즉 "N이/가 좋아요"와 "N을/를 좋아해요"는 조사가 다릅니다.',
        uz: '"좋다" va "좋아하다" ni adashtirmang. "이 노래가 좋아요" — qo‘shiq yaxshi, shuning uchun "가". "저는 이 노래를 좋아해요" — men bu qo‘shiqni yoqtiraman, shuning uchun "를".',
        en: 'Be careful with 좋다 versus 좋아하다. 이 노래가 좋아요 means "this song is good / I like this song" with the song as the subject. 저는 이 노래를 좋아해요 uses 좋아하다 as a verb and marks the song with 를.',
        ru: 'Особенно важно различать 좋다 и 좋아하다. В 이 노래가 좋아요 песня является тем, что хорошо, поэтому используется 가. В 저는 이 노래를 좋아해요 используется глагол 좋아하다 и объект получает 를.',
      },
    },
    cautions: [
      {
        ko: '받침에 따라 이/가를 고르는 것을 잊지 마세요. "길가 복잡해요"가 아니라 "길이 복잡해요", "학교이 좋아요"가 아니라 "학교가 좋아요"예요.',
        uz: '받침 ga qarab 이/가 ni tanlang. "길가 복잡해요" emas "길이 복잡해요", "학교이 좋아요" emas "학교가 좋아요".',
        en: 'Choose 이/가 according to the final consonant. Use 길이 복잡해요 and 학교가 좋아요, not 길가 or 학교이.',
        ru: 'Выбирайте 이/가 по наличию 받침: 길이 복잡해요 и 학교가 좋아요, а не 길가 или 학교이.',
      },
      {
        ko: '"뭐가"는 "무엇이"가 줄어든 아주 자주 쓰는 말이에요. "뭐가 맛있어요?"는 자연스러운 회화 표현이에요.',
        uz: '"뭐가" — "무엇이" ning kundalik qisqargan shakli. "뭐가 맛있어요?" tabiiy suhbat ifodasi.',
        en: '뭐가 is the very common conversational contraction of 무엇이. 뭐가 맛있어요? is natural everyday Korean.',
        ru: '뭐가 — очень распространённое разговорное сокращение от 무엇이. 뭐가 맛있어요? — естественная разговорная фраза.',
      },
      {
        ko: '"싸다"는 가격이 낮다는 뜻이고 "비싸다"는 가격이 높다는 뜻이에요. 물건의 가격을 평가할 때 자주 함께 쓰는 반대말이에요.',
        uz: '"싸다" — narxi arzon, "비싸다" — narxi qimmat. Narx haqida gapirganda ko‘p ishlatiladigan qarama-qarshi so‘zlar.',
        en: '싸다 means inexpensive and 비싸다 means expensive. They are a useful opposite pair for describing prices.',
        ru: '싸다 означает «дешёвый», а 비싸다 — «дорогой». Это важная пара противоположностей для описания цены.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '오렌지___ 싸요.',
          uz: '오렌지___ 싸요.',
          en: '오렌지___ 싸요.',
          ru: '오렌지___ 싸요.',
        },
        options: [
          {
            text: '가',
            correct: true,
          },
          {
            text: '이',
            correct: false,
          },
          {
            text: '를',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '길___ 복잡해요.',
          uz: '길___ 복잡해요.',
          en: '길___ 복잡해요.',
          ru: '길___ 복잡해요.',
        },
        options: [
          {
            text: '이',
            correct: true,
          },
          {
            text: '가',
            correct: false,
          },
          {
            text: '를',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '"뭐가 맛있어요?"에 가장 자연스러운 대답은?',
          uz: '"뭐가 맛있어요?" savoliga eng tabiiy javob qaysi?',
          en: 'Which is the most natural answer to 뭐가 맛있어요?',
          ru: 'Какой ответ наиболее естественен на 뭐가 맛있어요?',
        },
        options: [
          {
            text: '수박이 맛있어요.',
            correct: true,
          },
          {
            text: '수박을 맛있어요.',
            correct: false,
          },
          {
            text: '수박에 맛있어요.',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '"저는 이 노래___ 좋아해요."에서 알맞은 조사는?',
          uz: '"저는 이 노래___ 좋아해요." gapida qaysi qo‘shimcha to‘g‘ri?',
          en: 'Which particle belongs in 저는 이 노래___ 좋아해요?',
          ru: 'Какая частица нужна в 저는 이 노래___ 좋아해요?',
        },
        options: [
          {
            text: '를',
            correct: true,
          },
          {
            text: '가',
            correct: false,
          },
          {
            text: '이',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '"이 노래가 좋아요"와 "저는 이 노래를 좋아해요"의 설명으로 맞는 것은?',
          uz: 'Ikki gapning farqi haqidagi qaysi izoh to‘g‘ri?',
          en: 'Which statement correctly explains 이 노래가 좋아요 and 저는 이 노래를 좋아해요?',
          ru: 'Какое объяснение разницы между двумя предложениями верно?',
        },
        options: [
          {
            text: '좋다는 이/가, 좋아하다는 을/를과 함께 쓸 수 있어요',
            correct: true,
          },
          {
            text: '둘 다 반드시 를만 써요',
            correct: false,
          },
          {
            text: '둘 다 반드시 가만 써요',
            correct: false,
          },
        ],
      },
    ],
  },
  // ───────── 섹션 1-24. 추가·동일 N도 ─────────
  {
    code: 'also-do',
    pattern: 'N도',
    section: 1,
    order: 24,
    isActive: true,
    summary: {
      ko: '"~도", "~도 역시", "또"라는 뜻이에요. 앞에서 말한 사람이나 물건과 같은 정보가 하나 더 있을 때 써요.',
      uz: '"ham", "yana" ma’nosini beradi. Oldin aytilgan ma’lumot boshqa odam yoki narsaga ham tegishli bo‘lsa ishlatiladi.',
      en: 'Means "also", "too" or "as well". Use it when the same information applies to another person or thing.',
      ru: 'Означает «тоже», «также», «ещё». Используется, когда та же информация относится ещё к одному человеку или предмету.',
    },
    tags: [
      {
        ko: '초급',
        uz: "Boshlang'ich",
        en: 'Beginner',
        ru: 'Начальный',
      },
      {
        ko: '조사',
        uz: "Qo'shimcha",
        en: 'Particle',
        ru: 'Частица',
      },
      {
        ko: '추가',
        uz: "Qo'shimcha",
        en: 'Addition',
        ru: 'Добавление',
      },
    ],
    explanation: {
      ko: '"도"는 이미 나온 정보에 같은 사람이나 물건을 하나 더 추가할 때 사용해요. "저는 학생이에요. 켈리 씨도 학생이에요"에서는 나와 켈리가 둘 다 학생이라는 뜻이에요. "불고기가 맛있어요. 냉면도 맛있어요"에서는 불고기뿐 아니라 냉면 역시 맛있다는 뜻이에요. 교재에서는 목적어에도 "도"를 사용해서 "어제 바지를 샀어요. 그리고 운동화도 샀어요", "오렌지 좀 주세요. 그리고 사과도 주세요"라고 해요. 초급에서는 "은/는, 이/가, 을/를 자리에 도가 들어가면서 "~도 역시"라는 의미가 생긴다"고 이해하면 가장 쉬워요.',
      uz: '"도" oldin aytilgan ma’lumotga yana bir odam yoki narsani qo‘shishda ishlatiladi. "저는 학생이에요. 켈리 씨도 학생이에요" — men ham, Kelli ham talaba. "불고기가 맛있어요. 냉면도 맛있어요" — bulgogi bilan birga nenmyon ham mazali. Darslikda obyekt bilan ham "도" keladi: "운동화도 샀어요", "사과도 주세요". Boshlang‘ich bosqichda uni 은/는, 이/가, 을/를 o‘rniga kelib "ham" ma’nosini beradi deb tushunish qulay.',
      en: '도 adds another person or thing to information already established. 저는 학생이에요. 켈리 씨도 학생이에요 means both the speaker and Kelly are students. 불고기가 맛있어요. 냉면도 맛있어요 means naengmyeon is delicious too. The textbook also uses 도 where an object particle would otherwise appear: 운동화도 샀어요 and 사과도 주세요. At this level, a useful rule is that 도 often replaces 은/는, 이/가 or 을/를 and adds the meaning "also/too."',
      ru: '도 добавляет ещё одного человека или предмет к уже известной информации. 저는 학생이에요. 켈리 씨도 학생이에요 означает, что и говорящий, и Келли — студенты. 불고기가 맛있어요. 냉면도 맛있어요 означает, что нэнмён тоже вкусный. В учебнике 도 используется и вместо объектной частицы: 운동화도 샀어요, 사과도 주세요. На начальном уровне удобно понимать 도 как замену 은/는, 이/가 или 을/를 со значением «тоже».',
    },
    conjugationRule: {
      ko: '명사 + 도  ·  받침과 상관없이 항상 도  ·  초급에서는 은/는·이/가·을/를 대신 도를 써서 "~도 역시"를 나타냄',
      uz: 'Ot + 도  ·  받침 dan qat’i nazar doim 도  ·  boshlang‘ichda 은/는·이/가·을/를 o‘rniga kelib "ham" ma’nosini beradi',
      en: 'noun + 도  ·  always 도 regardless of 받침  ·  at this level often replaces 은/는, 이/가 or 을/를 to mean "also"',
      ru: 'существительное + 도  ·  всегда 도 независимо от 받침  ·  на этом уровне часто заменяет 은/는, 이/가 или 을/를 со значением «тоже»',
    },
    conjugations: [
      {
        base: '켈리 씨 + 도',
        result: '켈리 씨도',
      },
      {
        base: '냉면 + 도',
        result: '냉면도',
      },
      {
        base: '운동화 + 도',
        result: '운동화도',
      },
      {
        base: '사과 + 도',
        result: '사과도',
      },
      {
        base: '저 + 도',
        result: '저도',
      },
    ],
    examples: [
      {
        ko: '저는 학생이에요. 켈리 씨도 학생이에요.',
        highlight: '켈리 씨도',
        gloss: {
          ko: '저는 학생이에요. 켈리 씨도 학생이에요.',
          uz: 'Men talabaman. Kelli ham talaba.',
          en: 'I am a student. Kelly is a student too.',
          ru: 'Я студент. Келли тоже студентка.',
        },
      },
      {
        ko: '불고기가 맛있어요. 냉면도 맛있어요.',
        highlight: '냉면도',
        gloss: {
          ko: '불고기가 맛있어요. 냉면도 맛있어요.',
          uz: 'Bulgogi mazali. Nenmyon ham mazali.',
          en: 'Bulgogi is delicious. Naengmyeon is delicious too.',
          ru: 'Пулькоги вкусный. Нэнмён тоже вкусный.',
        },
      },
      {
        ko: '어제 바지를 샀어요. 그리고 운동화도 샀어요.',
        highlight: '운동화도',
        gloss: {
          ko: '어제 바지를 샀어요. 그리고 운동화도 샀어요.',
          uz: 'Kecha shim sotib oldim. Krossovka ham oldim.',
          en: 'I bought pants yesterday. I also bought sneakers.',
          ru: 'Вчера я купил брюки. Ещё я купил кроссовки.',
        },
      },
      {
        ko: '오렌지 좀 주세요. 그리고 사과도 주세요.',
        highlight: '사과도',
        gloss: {
          ko: '오렌지 좀 주세요. 그리고 사과도 주세요.',
          uz: 'Apelsin bering. Yana olma ham bering.',
          en: 'Please give me some oranges. And apples too, please.',
          ru: 'Дайте, пожалуйста, апельсины. И яблоки тоже.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '저는 비빔밥을 좋아해요.',
        highlight: '비빔밥을',
        gloss: {
          ko: '저는 비빔밥을 좋아해요.',
          uz: 'Men bibimbapni yaxshi ko‘raman.',
          en: 'I like bibimbap.',
          ru: 'Я люблю пибимпап.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '저도 비빔밥을 좋아해요.',
        highlight: '저도',
        gloss: {
          ko: '저도 비빔밥을 좋아해요.',
          uz: 'Men ham bibimbapni yaxshi ko‘raman.',
          en: 'I like bibimbap too.',
          ru: 'Я тоже люблю пибимпап.',
        },
      },
    ],
    similar: {
      pattern: 'N은/는',
      note: {
        ko: '"저는 학생이에요"의 "는"은 저를 이야기의 주제로 만들어요. "저도 학생이에요"의 "도"는 앞사람과 마찬가지로 나 역시 학생이라는 뜻이에요. 그래서 이미 누군가가 "저는 학생이에요"라고 말했다면 "저는 학생이에요"를 다시 말하는 것보다 "저도 학생이에요"가 자연스러워요.',
        uz: '"저는 학생이에요" dagi "는" meni mavzu qiladi. "저도 학생이에요" dagi "도" esa oldingi odam kabi men ham talaba ekanimni bildiradi.',
        en: '는 in 저는 학생이에요 simply makes "I" the topic. 도 in 저도 학생이에요 means "I am a student too", matching previously stated information.',
        ru: '는 в 저는 학생이에요 просто делает «я» темой. 도 в 저도 학생이에요 означает «я тоже студент», то есть совпадение с уже сказанной информацией.',
      },
    },
    cautions: [
      {
        ko: '초급 문장에서는 "저는도", "냉면이도", "사과를도"처럼 기본 조사를 그대로 두고 도를 뒤에 붙이지 않아요. "저도", "냉면도", "사과도"라고 해요.',
        uz: 'Boshlang‘ich gaplarda "저는도", "냉면이도", "사과를도" demang. "저도", "냉면도", "사과도" deyiladi.',
        en: 'In the beginner patterns here, do not say 저는도, 냉면이도 or 사과를도. Use 저도, 냉면도 and 사과도.',
        ru: 'В изучаемых начальных конструкциях не говорите 저는도, 냉면이도 или 사과를도. Правильно 저도, 냉면도, 사과도.',
      },
      {
        ko: '"도"는 반드시 앞에 비교하거나 추가할 정보가 있을 때 의미가 분명해져요. "냉면도 맛있어요"는 보통 다른 음식도 맛있다는 맥락을 전제로 해요.',
        uz: '"도" odatda oldin aytilgan yoki kontekstdagi boshqa ma’lumotga qo‘shimcha ma’no beradi. "냉면도 맛있어요" boshqa narsa ham mazali ekanini nazarda tutadi.',
        en: '도 normally depends on something already stated or understood. 냉면도 맛있어요 usually implies that something else is delicious as well.',
        ru: '도 обычно опирается на уже сказанную или понятную информацию. 냉면도 맛있어요 подразумевает, что что-то ещё тоже вкусное.',
      },
      {
        ko: '"그리고"와 "도"를 함께 쓸 수도 있어요. "바지를 샀어요. 그리고 운동화도 샀어요"에서 그리고는 문장을 연결하고, 도는 운동화를 추가해요.',
        uz: '"그리고" va "도" birga ishlatilishi mumkin. "그리고" gaplarni bog‘laydi, "도" esa yana bir narsani qo‘shadi.',
        en: '그리고 and 도 can appear together. 그리고 connects the sentences, while 도 marks the additional item.',
        ru: '그리고 и 도 могут использоваться вместе. 그리고 соединяет предложения, а 도 добавляет ещё один предмет.',
      },
    ],
    quiz: [
      {
        question: {
          ko: 'A: 저는 학생이에요. B: 저___ 학생이에요.',
          uz: 'A: 저는 학생이에요. B: 저___ 학생이에요.',
          en: 'A: 저는 학생이에요. B: 저___ 학생이에요.',
          ru: 'A: 저는 학생이에요. B: 저___ 학생이에요.',
        },
        options: [
          {
            text: '도',
            correct: true,
          },
          {
            text: '는도',
            correct: false,
          },
          {
            text: '가도',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '불고기가 맛있어요. 냉면___ 맛있어요.',
          uz: '불고기가 맛있어요. 냉면___ 맛있어요.',
          en: '불고기가 맛있어요. 냉면___ 맛있어요.',
          ru: '불고기가 맛있어요. 냉면___ 맛있어요.',
        },
        options: [
          {
            text: '도',
            correct: true,
          },
          {
            text: '이도',
            correct: false,
          },
          {
            text: '를도',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '오렌지 좀 주세요. 그리고 ___ 주세요.',
          uz: 'Apelsin bering. Yana ___ bering.',
          en: 'Please give me oranges. And ___ as well.',
          ru: 'Дайте апельсины. И ___ тоже.',
        },
        options: [
          {
            text: '사과도',
            correct: true,
          },
          {
            text: '사과를도',
            correct: false,
          },
          {
            text: '사과가도',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '"도"의 뜻으로 가장 알맞은 것은?',
          uz: '"도" ning eng mos ma’nosi qaysi?',
          en: 'Which best describes the meaning of 도?',
          ru: 'Какое значение лучше всего соответствует 도?',
        },
        options: [
          {
            text: '~도 역시 / also / too',
            correct: true,
          },
          {
            text: '~에서 / at',
            correct: false,
          },
          {
            text: '~만 / only',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '어제 바지를 샀어요. 운동화도 샀어요. 이 문장의 뜻은?',
          uz: 'Gap nimani anglatadi?',
          en: 'What does 어제 바지를 샀어요. 운동화도 샀어요 mean?',
          ru: 'Что означает 어제 바지를 샀어요. 운동화도 샀어요?',
        },
        options: [
          {
            text: '바지뿐 아니라 운동화도 샀어요',
            correct: true,
          },
          {
            text: '운동화만 사고 바지는 안 샀어요',
            correct: false,
          },
          {
            text: '아무것도 안 샀어요',
            correct: false,
          },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // 섹션 1 · 7과 — 날씨가 어떻습니까?
  //
  // ㅂ 불규칙
  // → 대조 A/V-지만
  // → 격식체 A/V-습니다/ㅂ니다
  // → 상태·행동 연결 A/V-고
  //
  // 핵심 연결:
  // 춥다 → 추워요
  // 하지만 → 춥지만 / 춥습니다 / 춥고
  // ═══════════════════════════════════════════════════════════

  // ───────── 섹션 1-25. ㅂ 불규칙 ─────────
  {
    code: 'irregular-bieup',
    pattern: 'ㅂ 불규칙',
    section: 1,
    order: 25,
    isActive: true,
    summary: {
      ko: '일부 ㅂ 받침 형용사는 모음으로 시작하는 어미를 만나면 ㅂ이 우로 바뀌어요. 춥다 → 추워요, 덥다 → 더워요처럼 활용해요.',
      uz: 'Ba’zi ㅂ bilan tugaydigan sifatlar unli bilan boshlanadigan qo‘shimcha oldida ㅂ ni 우 ga o‘zgartiradi. Masalan, 춥다 → 추워요, 덥다 → 더워요.',
      en: 'Some stems ending in ㅂ change ㅂ to 우 before vowel-initial endings. For example, 춥다 → 추워요 and 덥다 → 더워요.',
      ru: 'Некоторые основы на ㅂ перед окончаниями, начинающимися с гласной, меняют ㅂ на 우: 춥다 → 추워요, 덥다 → 더워요.',
    },
    tags: [
      {
        ko: '초급',
        uz: "Boshlang'ich",
        en: 'Beginner',
        ru: 'Начальный',
      },
      {
        ko: '불규칙',
        uz: 'Istisno',
        en: 'Irregular',
        ru: 'Неправильное спряжение',
      },
      {
        ko: '형용사',
        uz: 'Sifat',
        en: 'Adjective',
        ru: 'Прилагательное',
      },
    ],
    explanation: {
      ko: '7과에서 배우는 덥다, 춥다, 어렵다, 쉽다, 맵다, 무겁다, 가볍다는 모두 어간 끝에 ㅂ이 있어요. 이 단어들이 "-아요/어요"처럼 모음으로 시작하는 어미를 만나면 ㅂ이 그대로 남지 않고 우로 바뀌어요. 춥다에서 -다를 빼면 춥-이고, 여기서 ㅂ이 우로 바뀌어 추우-가 된 뒤 -어요와 합쳐져 "추워요"가 돼요. 덥다도 더우- + -어요 → 더워요, 맵다는 매우- + -어요 → 매워요가 돼요. 과거형도 같은 원리예요. 춥다 → 추우- + -었어요 → 추웠어요, 덥다 → 더우- + -었어요 → 더웠어요예요. 중요한 점은 ㅂ이 언제나 없어지는 것은 아니라는 거예요. 뒤에 자음으로 시작하는 "-지만, -고, -습니다"가 오면 ㅂ이 그대로 남아서 "춥지만, 춥고, 춥습니다"라고 해요.',
      uz: '7-darsdagi 덥다, 춥다, 어렵다, 쉽다, 맵다, 무겁다 va 가볍다 so‘zlarining o‘zagi ㅂ bilan tugaydi. Ular "-아요/어요" kabi unli bilan boshlanadigan qo‘shimchani olganda ㅂ saqlanmay, 우 ga o‘zgaradi. 춥다 → 춥- → 추우- → 추워요. Xuddi shunday 덥다 → 더워요, 맵다 → 매워요. O‘tgan zamonda ham shu qoida ishlaydi: 춥다 → 추웠어요, 덥다 → 더웠어요. Lekin ㅂ har doim o‘zgarmaydi. "-지만, -고, -습니다" undosh bilan boshlangani uchun 춥지만, 춥고, 춥습니다 shakllarida ㅂ saqlanadi.',
      en: 'The Unit 7 adjectives 덥다, 춥다, 어렵다, 쉽다, 맵다, 무겁다 and 가볍다 all have stems ending in ㅂ. When they meet a vowel-initial ending such as -아요/어요, the ㅂ changes to 우. For 춥다, remove -다 to get 춥-, change ㅂ to 우 to get 추우-, and combine it with -어요: 추워요. Likewise, 덥다 → 더워요 and 맵다 → 매워요. The past tense follows the same principle: 춥다 → 추웠어요 and 덥다 → 더웠어요. However, ㅂ does not disappear before every ending. Before consonant-initial endings such as -지만, -고 and -습니다, it remains: 춥지만, 춥고, 춥습니다.',
      ru: 'Прилагательные 7-го урока 덥다, 춥다, 어렵다, 쉽다, 맵다, 무겁다 и 가볍다 имеют основу на ㅂ. Перед окончаниями, начинающимися с гласной, например -아요/어요, ㅂ меняется на 우. У 춥다 после удаления -다 получается 춥-, затем ㅂ → 우: 추우-, и вместе с -어요 получается 추워요. Аналогично 덥다 → 더워요, 맵다 → 매워요. В прошедшем времени действует тот же принцип: 춥다 → 추웠어요, 덥다 → 더웠어요. Но перед окончаниями, начинающимися с согласной, например -지만, -고 и -습니다, ㅂ сохраняется: 춥지만, 춥고, 춥습니다.',
    },
    conjugationRule: {
      ko: '교재의 ㅂ 불규칙 어간 + 모음 시작 어미 → ㅂ이 우로 변화  ·  춥- + -어요 → 추워요  ·  춥- + -었어요 → 추웠어요  ·  자음 시작 어미 앞에서는 ㅂ 유지',
      uz: 'Darsdagi ㅂ istisno o‘zagi + unli bilan boshlanuvchi qo‘shimcha → ㅂ → 우  ·  춥- + -어요 → 추워요  ·  춥- + -었어요 → 추웠어요  ·  undoshli qo‘shimcha oldida ㅂ saqlanadi',
      en: 'Unit 7 ㅂ-irregular stem + vowel-initial ending → ㅂ changes to 우  ·  춥- + -어요 → 추워요  ·  춥- + -었어요 → 추웠어요  ·  ㅂ remains before consonant-initial endings',
      ru: 'Неправильная основа на ㅂ + окончание с гласной → ㅂ меняется на 우  ·  춥- + -어요 → 추워요  ·  춥- + -었어요 → 추웠어요  ·  перед согласной ㅂ сохраняется',
    },
    conjugations: [
      {
        base: '덥다',
        result: '더워요 / 더웠어요',
      },
      {
        base: '춥다',
        result: '추워요 / 추웠어요',
      },
      {
        base: '어렵다',
        result: '어려워요 / 어려웠어요',
      },
      {
        base: '쉽다',
        result: '쉬워요 / 쉬웠어요',
      },
      {
        base: '맵다',
        result: '매워요 / 매웠어요',
      },
      {
        base: '무겁다',
        result: '무거워요 / 무거웠어요',
      },
      {
        base: '가볍다',
        result: '가벼워요 / 가벼웠어요',
      },
    ],
    examples: [
      {
        ko: '날씨가 아주 추워요.',
        highlight: '추워요',
        gloss: {
          ko: '날씨가 아주 추워요.',
          uz: 'Havo juda sovuq.',
          en: 'The weather is very cold.',
          ru: 'Погода очень холодная.',
        },
      },
      {
        ko: '한국 음식이 매워요?',
        highlight: '매워요',
        gloss: {
          ko: '한국 음식이 매워요?',
          uz: 'Koreys taomlari achchiqmi?',
          en: 'Is Korean food spicy?',
          ru: 'Корейская еда острая?',
        },
      },
      {
        ko: '어제는 날씨가 더웠어요.',
        highlight: '더웠어요',
        gloss: {
          ko: '어제는 날씨가 더웠어요.',
          uz: 'Kecha havo issiq edi.',
          en: 'The weather was hot yesterday.',
          ru: 'Вчера было жарко.',
        },
      },
      {
        ko: '시험이 아주 어려웠어요.',
        highlight: '어려웠어요',
        gloss: {
          ko: '시험이 아주 어려웠어요.',
          uz: 'Imtihon juda qiyin edi.',
          en: 'The exam was very difficult.',
          ru: 'Экзамен был очень трудным.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '오늘 날씨가 어때요?',
        highlight: '어때요',
        gloss: {
          ko: '오늘 날씨가 어때요?',
          uz: 'Bugun ob-havo qanday?',
          en: 'How is the weather today?',
          ru: 'Какая сегодня погода?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아주 더워요.',
        highlight: '더워요',
        gloss: {
          ko: '아주 더워요.',
          uz: 'Juda issiq.',
          en: 'It is very hot.',
          ru: 'Очень жарко.',
        },
      },
    ],
    similar: {
      pattern: '규칙적인 ㅂ 받침 단어',
      note: {
        ko: '받침이 ㅂ이라고 해서 모든 단어가 ㅂ 불규칙인 것은 아니에요. 예를 들어 "입다"는 "이워요"가 아니라 "입어요", "잡다"는 "자워요"가 아니라 "잡아요"예요. 그래서 새로운 ㅂ 받침 단어를 만났을 때 무조건 ㅂ을 우로 바꾸면 안 돼요. 7과에서는 덥다·춥다·어렵다·쉽다·맵다·무겁다·가볍다를 ㅂ 불규칙 단어로 확실히 익혀요.',
        uz: 'ㅂ bilan tugagan har bir so‘z istisno emas. Masalan, 입다 → 입어요, 잡다 → 잡아요. Yangi ㅂ so‘zni ko‘rganda avtomatik ravishda ㅂ ni 우 ga o‘zgartirmang. 7-darsda 덥다, 춥다, 어렵다, 쉽다, 맵다, 무겁다 va 가볍다 ni aniq ㅂ istisno sifatida o‘rganing.',
        en: 'Not every word ending in ㅂ is irregular. For example, 입다 becomes 입어요, not 이워요, and 잡다 becomes 잡아요, not 자워요. Do not automatically change every final ㅂ to 우. In Unit 7, learn 덥다, 춥다, 어렵다, 쉽다, 맵다, 무겁다 and 가볍다 as the target ㅂ-irregular words.',
        ru: 'Не каждое слово на ㅂ является неправильным. Например, 입다 → 입어요, а не 이워요, а 잡다 → 잡아요, а не 자워요. Поэтому нельзя автоматически менять любой ㅂ на 우. В 7-м уроке как неправильные нужно выучить 덥다, 춥다, 어렵다, 쉽다, 맵다, 무겁다 и 가볍다.',
      },
    },
    cautions: [
      {
        ko: '"춥어요", "덥어요", "맵어요"라고 하지 않아요. 이 단어들은 ㅂ 불규칙이므로 "추워요, 더워요, 매워요"예요.',
        uz: '"춥어요", "덥어요", "맵어요" deyilmaydi. To‘g‘ri shakllar: 추워요, 더워요, 매워요.',
        en: 'Do not say 춥어요, 덥어요 or 맵어요. These are ㅂ-irregular: 추워요, 더워요 and 매워요.',
        ru: 'Не говорите 춥어요, 덥어요 или 맵어요. Правильно: 추워요, 더워요, 매워요.',
      },
      {
        ko: '과거형도 "춥었어요", "덥었어요"가 아니에요. 먼저 ㅂ이 우로 바뀐 뒤 과거형이 붙어서 "추웠어요, 더웠어요"가 돼요.',
        uz: 'O‘tgan zamonda ham "춥었어요", "덥었어요" emas. Avval ㅂ → 우 bo‘lib, keyin 추웠어요, 더웠어요 bo‘ladi.',
        en: 'The past forms are not 춥었어요 or 덥었어요. The ㅂ changes first, producing 추웠어요 and 더웠어요.',
        ru: 'Прошедшие формы — не 춥었어요 и 덥었어요. Сначала ㅂ меняется, поэтому получаются 추웠어요 и 더웠어요.',
      },
      {
        ko: '-지만, -고, -습니다처럼 자음으로 시작하는 어미 앞에서는 ㅂ을 우로 바꾸지 않아요. "추우지만, 추우고, 추우습니다"가 아니라 "춥지만, 춥고, 춥습니다"예요.',
        uz: '-지만, -고, -습니다 undosh bilan boshlanadi, shuning uchun ㅂ o‘zgarmaydi. "추우지만" emas "춥지만", "추우고" emas "춥고", "추우습니다" emas "춥습니다".',
        en: 'Before consonant-initial endings such as -지만, -고 and -습니다, do not change ㅂ to 우. Use 춥지만, 춥고 and 춥습니다.',
        ru: 'Перед -지만, -고 и -습니다, начинающимися с согласной, ㅂ не меняется: 춥지만, 춥고, 춥습니다.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '춥다 → 오늘 날씨가 아주 ___.',
          uz: '춥다 → "Bugun havo juda sovuq." Bo‘sh joyni to‘ldiring.',
          en: '춥다 → Complete: "The weather is very cold today."',
          ru: '춥다 → Дополните: «Сегодня очень холодно».',
        },
        options: [
          {
            text: '추워요',
            correct: true,
          },
          {
            text: '춥어요',
            correct: false,
          },
          {
            text: '추우요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '덥다의 과거형은?',
          uz: '덥다 ning o‘tgan zamon shakli qaysi?',
          en: 'What is the past form of 덥다?',
          ru: 'Какова прошедшая форма 덥다?',
        },
        options: [
          {
            text: '더웠어요',
            correct: true,
          },
          {
            text: '덥었어요',
            correct: false,
          },
          {
            text: '더우었어요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '맵다 + -어요 → ?',
          uz: '맵다 + -어요 → ?',
          en: '맵다 + -어요 → ?',
          ru: '맵다 + -어요 → ?',
        },
        options: [
          {
            text: '매워요',
            correct: true,
          },
          {
            text: '맵어요',
            correct: false,
          },
          {
            text: '매요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '춥다 + -지만의 올바른 형태는?',
          uz: '춥다 + -지만 ning to‘g‘ri shakli qaysi?',
          en: 'What is the correct form of 춥다 + -지만?',
          ru: 'Как правильно соединить 춥다 + -지만?',
        },
        options: [
          {
            text: '춥지만',
            correct: true,
          },
          {
            text: '추우지만',
            correct: false,
          },
          {
            text: '추워지만',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '다음 중 7과에서 배우는 ㅂ 불규칙 활용이 아닌 것은?',
          uz: 'Quyidagilardan qaysi biri 7-darsdagi ㅂ istisno qoidasiga kirmaydi?',
          en: 'Which is NOT an example of the Unit 7 ㅂ-irregular pattern?',
          ru: 'Какой вариант НЕ относится к изучаемому в 7-м уроке неправильному ㅂ?',
        },
        options: [
          {
            text: '입다 → 입어요',
            correct: true,
          },
          {
            text: '춥다 → 추워요',
            correct: false,
          },
          {
            text: '어렵다 → 어려워요',
            correct: false,
          },
        ],
      },
    ],
  },

  // ───────── 섹션 1-26. 대조 A/V-지만 ─────────
  {
    code: 'contrast-jiman',
    pattern: 'A/V-지만',
    section: 1,
    order: 26,
    isActive: true,
    summary: {
      ko: '앞의 내용과 뒤의 내용이 서로 다르거나 반대될 때 "~하지만", "~지만"이라는 뜻으로 두 내용을 연결해요.',
      uz: 'Oldingi va keyingi ma’lumot bir-biriga zid yoki farqli bo‘lsa, ularni "lekin" ma’nosida bog‘laydi.',
      en: 'Connects two contrasting ideas with the meaning "but" or "although".',
      ru: 'Соединяет противопоставленные мысли со значением «но», «хотя».',
    },
    tags: [
      {
        ko: '초급',
        uz: "Boshlang'ich",
        en: 'Beginner',
        ru: 'Начальный',
      },
      {
        ko: '연결어미',
        uz: "Bog'lovchi",
        en: 'Connector',
        ru: 'Соединительное окончание',
      },
      {
        ko: '대조',
        uz: 'Qarama-qarshilik',
        en: 'Contrast',
        ru: 'Противопоставление',
      },
    ],
    explanation: {
      ko: '"-지만"은 앞의 사실과 뒤의 사실이 서로 다르거나 기대와 반대될 때 사용해요. 만드는 방법은 간단해요. 형용사나 동사의 기본형에서 "-다"를 떼고 어간에 바로 "-지만"을 붙여요. 비싸다 → 비싸지만, 맛있다 → 맛있지만, 먹다 → 먹지만이 돼요. 교재의 "서울식당은 비싸지만 맛있어요"는 가격은 비싸다는 사실과 음식은 맛있다는 좋은 평가를 대조해요. "한국어 공부는 어렵지만 재미있어요"도 어렵다는 점과 재미있다는 점을 함께 말해요. 과거를 나타낼 때는 과거 표시가 -지만보다 먼저 와요. 가다 → 갔지만, 덥다 → 더웠지만처럼 만들어서 "어제는 더웠지만 오늘은 안 더워요"라고 할 수 있어요.',
      uz: '"-지만" oldingi va keyingi ma’lumot bir-biridan farq qilganda yoki kutilgan natijaga zid bo‘lganda ishlatiladi. Yasash oson: sifat yoki fe’ldan "-다" olib tashlab, o‘zakka to‘g‘ridan-to‘g‘ri "-지만" qo‘shiladi. 비싸다 → 비싸지만, 맛있다 → 맛있지만, 먹다 → 먹지만. "서울식당은 비싸지만 맛있어요" narx qimmatligi bilan taom mazaliligini qarama-qarshi qo‘yadi. O‘tgan zamonda zamon ko‘rsatkichi -지만 dan oldin keladi: 가다 → 갔지만, 덥다 → 더웠지만.',
      en: 'Use -지만 when the information before and after it contrasts or when the second fact goes against an expectation created by the first. Drop -다 and attach -지만 directly to the adjective or verb stem: 비싸다 → 비싸지만, 맛있다 → 맛있지만, 먹다 → 먹지만. In "서울식당은 비싸지만 맛있어요", the high price contrasts with the positive taste. "한국어 공부는 어렵지만 재미있어요" contrasts difficulty with enjoyment. For past events, the past marker comes before -지만: 가다 → 갔지만 and 덥다 → 더웠지만.',
      ru: 'Используйте -지만, когда информация до и после него противопоставляется или вторая часть не соответствует ожиданию от первой. Уберите -다 и добавьте -지만 прямо к основе: 비싸다 → 비싸지만, 맛있다 → 맛있지만, 먹다 → 먹지만. В "서울식당은 비싸지만 맛있어요" высокая цена противопоставлена хорошему вкусу. В прошедшем времени показатель прошлого ставится перед -지만: 가다 → 갔지만, 덥다 → 더웠지만.',
    },
    conjugationRule: {
      ko: 'A/V 어간 + -지만  ·  현재: 춥다 → 춥지만, 먹다 → 먹지만  ·  과거: 가다 → 갔지만, 덥다 → 더웠지만',
      uz: 'A/V o‘zagi + -지만  ·  hozirgi: 춥다 → 춥지만, 먹다 → 먹지만  ·  o‘tgan: 가다 → 갔지만, 덥다 → 더웠지만',
      en: 'A/V stem + -지만  ·  present: 춥다 → 춥지만, 먹다 → 먹지만  ·  past: 가다 → 갔지만, 덥다 → 더웠지만',
      ru: 'основа A/V + -지만  ·  настоящее: 춥다 → 춥지만, 먹다 → 먹지만  ·  прошлое: 가다 → 갔지만, 덥다 → 더웠지만',
    },
    conjugations: [
      {
        base: '비싸다',
        result: '비싸지만',
      },
      {
        base: '어렵다',
        result: '어렵지만',
      },
      {
        base: '춥다',
        result: '춥지만',
      },
      {
        base: '먹다',
        result: '먹지만',
      },
      {
        base: '가다',
        result: '가지만 / 갔지만',
      },
      {
        base: '덥다',
        result: '덥지만 / 더웠지만',
      },
    ],
    examples: [
      {
        ko: '서울식당은 비싸지만 맛있어요.',
        highlight: '비싸지만',
        gloss: {
          ko: '서울식당은 비싸지만 맛있어요.',
          uz: 'Seul restorani qimmat, lekin taomi mazali.',
          en: 'Seoul Restaurant is expensive, but the food is delicious.',
          ru: 'В ресторане «Сеул» дорого, но еда вкусная.',
        },
      },
      {
        ko: '한국어 공부는 어렵지만 재미있어요.',
        highlight: '어렵지만',
        gloss: {
          ko: '한국어 공부는 어렵지만 재미있어요.',
          uz: 'Koreys tilini o‘rganish qiyin, lekin qiziqarli.',
          en: 'Studying Korean is difficult, but interesting.',
          ru: 'Учить корейский трудно, но интересно.',
        },
      },
      {
        ko: '저는 김치를 먹지만 친구는 김치를 안 먹어요.',
        highlight: '먹지만',
        gloss: {
          ko: '저는 김치를 먹지만 친구는 김치를 안 먹어요.',
          uz: 'Men kimchi yeyman, lekin do‘stim kimchi yemaydi.',
          en: 'I eat kimchi, but my friend does not.',
          ru: 'Я ем кимчи, но мой друг не ест.',
        },
      },
      {
        ko: '어제는 더웠지만 오늘은 안 더워요.',
        highlight: '더웠지만',
        gloss: {
          ko: '어제는 더웠지만 오늘은 안 더워요.',
          uz: 'Kecha issiq edi, lekin bugun issiq emas.',
          en: 'It was hot yesterday, but it is not hot today.',
          ru: 'Вчера было жарко, но сегодня не жарко.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '오늘도 날씨가 추워요?',
        highlight: '추워요',
        gloss: {
          ko: '오늘도 날씨가 추워요?',
          uz: 'Bugun ham havo sovuqmi?',
          en: 'Is the weather cold today too?',
          ru: 'Сегодня тоже холодно?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네. 춥지만 아주 맑아요.',
        highlight: '춥지만',
        gloss: {
          ko: '네. 춥지만 아주 맑아요.',
          uz: 'Ha. Sovuq, lekin juda ochiq.',
          en: 'Yes. It is cold, but very clear.',
          ru: 'Да. Холодно, но очень ясно.',
        },
      },
    ],
    similar: {
      pattern: '그런데',
      note: {
        ko: '"-지만"과 "그런데"는 모두 대조를 만들 수 있지만 문장 구조가 달라요. "-지만"은 앞말의 어간에 직접 붙여서 한 문장 안에서 연결해요: "비싸지만 맛있어요." "그런데"는 보통 앞 문장을 끝낸 뒤 새 문장을 시작해요: "비싸요. 그런데 맛있어요." 초급에서는 짧게 한 문장으로 연결할 때 "-지만"을 사용하면 돼요.',
        uz: '"-지만" va "그런데" ikkalasi ham qarama-qarshilik bildiradi, lekin tuzilishi boshqacha. "-지만" o‘zakka qo‘shilib bitta gapni bog‘laydi: "비싸지만 맛있어요." "그런데" esa odatda yangi gapni boshlaydi: "비싸요. 그런데 맛있어요."',
        en: 'Both -지만 and 그런데 can express contrast, but their structures differ. -지만 attaches directly to a stem inside one sentence: 비싸지만 맛있어요. 그런데 normally begins a new sentence: 비싸요. 그런데 맛있어요.',
        ru: 'И -지만, и 그런데 могут выражать противопоставление, но структура различается. -지만 присоединяется к основе внутри одного предложения: 비싸지만 맛있어요. 그런데 обычно начинает новое предложение: 비싸요. 그런데 맛있어요.',
      },
    },
    cautions: [
      {
        ko: '"비싸요지만", "먹어요지만"이라고 하지 않아요. 이미 활용한 -아요/어요 형태가 아니라 어간에 바로 붙여서 "비싸지만, 먹지만"이라고 해요.',
        uz: '"비싸요지만", "먹어요지만" deyilmaydi. -지만 bevosita o‘zakka qo‘shiladi: 비싸지만, 먹지만.',
        en: 'Do not say 비싸요지만 or 먹어요지만. Attach -지만 directly to the stem: 비싸지만, 먹지만.',
        ru: 'Не говорите 비싸요지만 или 먹어요지만. -지만 присоединяется прямо к основе: 비싸지만, 먹지만.',
      },
      {
        ko: 'ㅂ 불규칙 단어도 -지만 앞에서는 ㅂ이 그대로 남아요. "추우지만"이 아니라 "춥지만", "매우지만"이 아니라 "맵지만"이에요.',
        uz: 'ㅂ istisno so‘zlarida ham -지만 oldida ㅂ saqlanadi: "추우지만" emas "춥지만", "매우지만" emas "맵지만".',
        en: 'With ㅂ-irregular words, ㅂ remains before -지만: 춥지만, not 추우지만; 맵지만, not 매우지만.',
        ru: 'У неправильных слов на ㅂ перед -지만 ㅂ сохраняется: 춥지만, а не 추우지만; 맵지만, а не 매우지만.',
      },
      {
        ko: '과거의 대조에서는 "-았/었지만"을 사용해요. "어제 학교에 가지만 동생은 안 갔어요"처럼 현재와 과거를 섞기보다 "어제 저는 학교에 갔지만 동생은 안 갔어요"라고 하는 것이 자연스러워요.',
        uz: 'O‘tgan voqealarni taqqoslaganda "-았/었지만" ishlating. "어제 저는 학교에 갔지만 동생은 안 갔어요" tabiiy.',
        en: 'For contrasting past events, use -았/었지만. 어제 저는 학교에 갔지만 동생은 안 갔어요 keeps both sides in the past.',
        ru: 'При противопоставлении прошлых событий используйте -았/었지만: 어제 저는 학교에 갔지만 동생은 안 갔어요.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '비싸다 + -지만 → ?',
          uz: '비싸다 + -지만 → ?',
          en: '비싸다 + -지만 → ?',
          ru: '비싸다 + -지만 → ?',
        },
        options: [
          {
            text: '비싸지만',
            correct: true,
          },
          {
            text: '비싸요지만',
            correct: false,
          },
          {
            text: '비싸고지만',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '춥다 + -지만 → ?',
          uz: '춥다 + -지만 → ?',
          en: '춥다 + -지만 → ?',
          ru: '춥다 + -지만 → ?',
        },
        options: [
          {
            text: '춥지만',
            correct: true,
          },
          {
            text: '추우지만',
            correct: false,
          },
          {
            text: '추워지만',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '"한국어 공부는 어렵___ 재미있어요."에 알맞은 것은?',
          uz: '"Koreys tilini o‘rganish qiyin, lekin qiziqarli." gapini to‘ldiring.',
          en: 'Complete: "Studying Korean is difficult, but interesting."',
          ru: 'Дополните: «Учить корейский трудно, но интересно».',
        },
        options: [
          {
            text: '지만',
            correct: true,
          },
          {
            text: '어요',
            correct: false,
          },
          {
            text: '을',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '어제는 덥다 + -지만 → ?',
          uz: 'O‘tgan zamonda 덥다 + -지만 qanday bo‘ladi?',
          en: 'What is the past contrast form of 덥다 + -지만?',
          ru: 'Какова прошедшая противопоставительная форма 덥다 + -지만?',
        },
        options: [
          {
            text: '더웠지만',
            correct: true,
          },
          {
            text: '덥지만',
            correct: false,
          },
          {
            text: '더워지만',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '"서울식당은 비싸지만 맛있어요."에서 -지만이 하는 일은?',
          uz: '"서울식당은 비싸지만 맛있어요." gapida -지만 nima qiladi?',
          en: 'What does -지만 do in 서울식당은 비싸지만 맛있어요?',
          ru: 'Какую функцию выполняет -지만 в 서울식당은 비싸지만 맛있어요?',
        },
        options: [
          {
            text: '비싼 것과 맛있는 것을 대조해요',
            correct: true,
          },
          {
            text: '과거 시간을 나타내요',
            correct: false,
          },
          {
            text: '장소를 나타내요',
            correct: false,
          },
        ],
      },
    ],
  },

  // ───────── 섹션 1-27. 격식체 A/V-습니다/ㅂ니다 ─────────
  {
    code: 'formal-seumnida',
    pattern: 'A/V-습니다/ㅂ니다 · -습니까/ㅂ니까?',
    section: 1,
    order: 27,
    isActive: true,
    summary: {
      ko: '발표·안내·보고처럼 공식적인 상황에서 쓰는 격식체 존댓말이에요. 평서문은 -습니다/ㅂ니다, 질문은 -습니까/ㅂ니까?를 사용해요.',
      uz: 'Taqdimot, e’lon va rasmiy hisobot kabi vaziyatlarda ishlatiladigan rasmiy hurmat uslubi. Gapda -습니다/ㅂ니다, savolda -습니까/ㅂ니까? ishlatiladi.',
      en: 'A formal polite style used for presentations, announcements and reports. Statements use -습니다/ㅂ니다 and questions use -습니까/ㅂ니까?',
      ru: 'Формально-вежливый стиль для выступлений, объявлений и официальной речи. Утверждения используют -습니다/ㅂ니다, вопросы — -습니까/ㅂ니까?',
    },
    tags: [
      {
        ko: '초급',
        uz: "Boshlang'ich",
        en: 'Beginner',
        ru: 'Начальный',
      },
      {
        ko: '격식체',
        uz: 'Rasmiy uslub',
        en: 'Formal style',
        ru: 'Официальный стиль',
      },
      {
        ko: '존댓말',
        uz: 'Hurmat uslubi',
        en: 'Polite speech',
        ru: 'Вежливая речь',
      },
    ],
    explanation: {
      ko: '"-아요/어요"와 마찬가지로 상대에게 예의를 갖춘 말이지만, "-습니다/ㅂ니다"는 발표·뉴스·안내·공식적인 대화에서 더 자주 쓰는 격식체예요. 어간에 받침이 있으면 "-습니다", 받침이 없으면 "-ㅂ니다"를 붙여요. 먹다 → 먹습니다, 맵다 → 맵습니다처럼 받침이 있으면 -습니다를 쓰고, 가다 → 갑니다, 오다 → 옵니다, 시원하다 → 시원합니다처럼 받침이 없으면 마지막 음절에 ㅂ 받침을 붙여 -ㅂ니다를 만들어요. 질문도 같은 원리예요. 먹다 → 먹습니까?, 오다 → 옵니까?가 돼요. 7과에서는 일기예보나 고향 날씨 발표처럼 공식적으로 정보를 전달할 때 이 말투를 사용해요. 특히 앞에서 배운 ㅂ 불규칙과 비교해야 해요. 맵다 → 매워요지만 격식체에서는 "맵습니다", 춥다 → 추워요지만 "춥습니다"예요. -습니다가 자음으로 시작하기 때문에 원래 ㅂ이 그대로 남아요.',
      uz: '"-아요/어요" kabi bu ham hurmatli nutq, lekin "-습니다/ㅂ니다" taqdimot, yangilik, e’lon va rasmiy suhbatlarda ko‘proq ishlatiladigan rasmiy uslubdir. O‘zak 받침 bilan tugasa "-습니다", 받침 siz tugasa "-ㅂ니다": 먹다 → 먹습니다, 맵다 → 맵습니다; 가다 → 갑니다, 오다 → 옵니다, 시원하다 → 시원합니다. Savolda xuddi shu qoida bilan "-습니까/ㅂ니까?": 먹습니까?, 옵니까?. 7-darsda ob-havo hisoboti va ona shahar ob-havosi haqidagi taqdimotlarda ishlatiladi. ㅂ istisno bilan farqiga e’tibor bering: 맵다 → 매워요, lekin 맵습니다; 춥다 → 추워요, lekin 춥습니다.',
      en: 'Like -아요/어요, this style is polite, but -습니다/ㅂ니다 belongs to a more formal register commonly used in presentations, news reports, announcements and formal conversations. If the stem ends in a final consonant, attach -습니다: 먹다 → 먹습니다, 맵다 → 맵습니다. If there is no final consonant, use -ㅂ니다: 가다 → 갑니다, 오다 → 옵니다, 시원하다 → 시원합니다. Questions follow the same split with -습니까/ㅂ니까?: 먹습니까?, 옵니까? Unit 7 uses this style for weather reports and hometown-weather presentations. Compare it carefully with the ㅂ irregular: 맵다 becomes 매워요 in the 요 style but 맵습니다 here; 춥다 becomes 추워요 but 춥습니다. Because -습니다 begins with a consonant, the original ㅂ remains.',
      ru: 'Как и -아요/어요, этот стиль вежливый, но -습니다/ㅂ니다 относится к более официальной речи и часто используется в выступлениях, новостях, объявлениях и официальных разговорах. После основы с 받침 добавляется -습니다: 먹다 → 먹습니다, 맵다 → 맵습니다. После основы без 받침 используется -ㅂ니다: 가다 → 갑니다, 오다 → 옵니다, 시원하다 → 시원합니다. В вопросах действует то же разделение: -습니까/ㅂ니까?: 먹습니까?, 옵니까? В 7-м уроке этот стиль используется в прогнозе погоды и презентации о погоде в родном городе. Сравните с неправильным ㅂ: 맵다 → 매워요, но 맵습니다; 춥다 → 추워요, но 춥습니다.',
    },
    conjugationRule: {
      ko: '받침 O → -습니다 / -습니까?  ·  받침 X → -ㅂ니다 / -ㅂ니까?  ·  맵다 → 맵습니다, 춥다 → 춥습니다',
      uz: '받침 bor → -습니다 / -습니까?  ·  받침 yo‘q → -ㅂ니다 / -ㅂ니까?  ·  맵다 → 맵습니다, 춥다 → 춥습니다',
      en: 'final consonant → -습니다 / -습니까?  ·  no final consonant → -ㅂ니다 / -ㅂ니까?  ·  맵다 → 맵습니다, 춥다 → 춥습니다',
      ru: 'есть 받침 → -습니다 / -습니까?  ·  нет 받침 → -ㅂ니다 / -ㅂ니까?  ·  맵다 → 맵습니다, 춥다 → 춥습니다',
    },
    conjugations: [
      {
        base: '시원하다',
        result: '시원합니다',
      },
      {
        base: '맵다',
        result: '맵습니다',
      },
      {
        base: '가다',
        result: '갑니다',
      },
      {
        base: '오다',
        result: '옵니다 / 옵니까?',
      },
      {
        base: '먹다',
        result: '먹습니다 / 먹습니까?',
      },
      {
        base: '춥다',
        result: '춥습니다',
      },
    ],
    examples: [
      {
        ko: '날씨가 시원합니다.',
        highlight: '시원합니다',
        gloss: {
          ko: '날씨가 시원합니다.',
          uz: 'Havo salqin.',
          en: 'The weather is cool.',
          ru: 'Погода прохладная.',
        },
      },
      {
        ko: '김치가 맵습니다.',
        highlight: '맵습니다',
        gloss: {
          ko: '김치가 맵습니다.',
          uz: 'Kimchi achchiq.',
          en: 'Kimchi is spicy.',
          ru: 'Кимчи острое.',
        },
      },
      {
        ko: '영국 가수가 한국에 옵니다.',
        highlight: '옵니다',
        gloss: {
          ko: '영국 가수가 한국에 옵니다.',
          uz: 'Britaniyalik qo‘shiqchi Koreyaga keladi.',
          en: 'A British singer is coming to Korea.',
          ru: 'Британский певец приезжает в Корею.',
        },
      },
      {
        ko: '무엇을 먹습니까? 비빔밥을 먹습니다.',
        highlight: '먹습니까',
        gloss: {
          ko: '무엇을 먹습니까? 비빔밥을 먹습니다.',
          uz: 'Nima yeysiz? Bibimbap yeyman.',
          en: 'What do you eat? I eat bibimbap.',
          ru: 'Что вы едите? Я ем пибимпап.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '오늘은 날씨가 어떻습니까?',
        highlight: '어떻습니까',
        gloss: {
          ko: '오늘은 날씨가 어떻습니까?',
          uz: 'Bugun ob-havo qanday?',
          en: 'How is the weather today?',
          ru: 'Какая сегодня погода?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '비가 옵니다.',
        highlight: '옵니다',
        gloss: {
          ko: '비가 옵니다.',
          uz: 'Yomg‘ir yog‘moqda.',
          en: 'It is raining.',
          ru: 'Идёт дождь.',
        },
      },
    ],
    similar: {
      pattern: 'A/V-아요/어요',
      note: {
        ko: '"-아요/어요"와 "-습니다/ㅂ니다"는 둘 다 존댓말이지만 쓰는 분위기가 달라요. 친구가 아닌 사람과 일상적으로 이야기할 때는 "-아요/어요"가 매우 흔하고, 발표·뉴스·안내·보고처럼 공식적인 느낌을 줄 때는 "-습니다/ㅂ니다"를 많이 사용해요. "날씨가 추워요"와 "날씨가 춥습니다"는 기본 의미는 같지만 말투의 격식성이 달라요.',
        uz: '"-아요/어요" va "-습니다/ㅂ니다" ikkalasi ham hurmatli uslub, lekin vaziyat boshqacha. Kundalik muloyim suhbatda "-아요/어요", taqdimot, yangilik, e’lon va hisobotlarda "-습니다/ㅂ니다" ko‘p ishlatiladi. "날씨가 추워요" va "날씨가 춥습니다" ma’nosi bir xil, uslubi farqli.',
        en: 'Both -아요/어요 and -습니다/ㅂ니다 are polite, but their register differs. -아요/어요 is extremely common in polite everyday conversation, while -습니다/ㅂ니다 is common in presentations, news, announcements and formal reporting. 날씨가 추워요 and 날씨가 춥습니다 have essentially the same meaning but a different level of formality.',
        ru: 'И -아요/어요, и -습니다/ㅂ니다 являются вежливыми, но отличаются стилем. -아요/어요 очень распространено в обычной вежливой речи, а -습니다/ㅂ니다 — в выступлениях, новостях, объявлениях и официальных сообщениях. 날씨가 추워요 и 날씨가 춥습니다 имеют почти одинаковое значение, но разную степень официальности.',
      },
    },
    cautions: [
      {
        ko: '받침이 있는 동사에 "-ㅂ니다"를 바로 붙이지 않아요. "먹ㅂ니다"가 아니라 "먹습니다"예요. 반대로 받침이 없는 "오다"는 "오습니다"가 아니라 "옵니다"예요.',
        uz: '받침 bor fe’lga "-ㅂ니다" ni to‘g‘ridan-to‘g‘ri qo‘shmang. "먹ㅂ니다" emas "먹습니다". 받침 yo‘q 오다 esa "오습니다" emas "옵니다".',
        en: 'Do not attach -ㅂ니다 directly to a stem with a final consonant. Use 먹습니다, not 먹ㅂ니다. Conversely, 오다 becomes 옵니다, not 오습니다.',
        ru: 'Не добавляйте -ㅂ니다 прямо после основы с 받침. Правильно 먹습니다. А 오다 без 받침 становится 옵니다, а не 오습니다.',
      },
      {
        ko: 'ㅂ 불규칙 형용사가 "-습니다"를 만나면 ㅂ이 우로 바뀌지 않아요. "매웁니다"가 아니라 "맵습니다", "추웁니다"가 아니라 "춥습니다"예요.',
        uz: 'ㅂ istisno sifatlari "-습니다" oldida ㅂ ni 우 ga o‘zgartirmaydi. "매웁니다" emas "맵습니다", "추웁니다" emas "춥습니다".',
        en: 'A ㅂ-irregular adjective does not change ㅂ to 우 before -습니다. Use 맵습니다 and 춥습니다, not 매웁니다 or 추웁니다.',
        ru: 'Неправильные прилагательные на ㅂ перед -습니다 не меняют ㅂ на 우. Правильно 맵습니다 и 춥습니다.',
      },
      {
        ko: '질문과 대답의 끝을 구별해요. "먹습니까?"는 질문이고 "먹습니다"는 평서문이에요. 물음표만 바꾸는 것이 아니라 어미 자체가 달라요.',
        uz: 'Savol va gap oxirini farqlang. "먹습니까?" — savol, "먹습니다" — bayon gap. Faqat savol belgisi emas, qo‘shimcha ham o‘zgaradi.',
        en: 'Distinguish the question and statement endings. 먹습니까? is a question, while 먹습니다 is a statement. The ending itself changes, not just the punctuation.',
        ru: 'Различайте вопрос и утверждение. 먹습니까? — вопрос, 먹습니다 — утверждение. Меняется само окончание, а не только знак вопроса.',
      },
      {
        ko: '"갑니다"는 철자 그대로 쓰지만 실제 발음에서는 [감니다]로 들려요. 발음이 달라도 맞춤법은 "갑니다"예요.',
        uz: '"갑니다" yozilishi o‘zgarmaydi, lekin talaffuzda [감니다] kabi eshitiladi. Imlo har doim "갑니다".',
        en: '갑니다 is spelled 갑니다 even though its pronunciation is heard as [감니다]. Do not change the spelling to match the pronunciation.',
        ru: '갑니다 пишется именно так, хотя произносится примерно [감니다]. Не меняйте написание вслед за произношением.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '먹다 → 격식체 평서문은?',
          uz: '먹다 ning rasmiy bayon shakli qaysi?',
          en: 'What is the formal statement form of 먹다?',
          ru: 'Какова формальная утвердительная форма 먹다?',
        },
        options: [
          {
            text: '먹습니다',
            correct: true,
          },
          {
            text: '먹ㅂ니다',
            correct: false,
          },
          {
            text: '먹습니까',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '오다 → 격식체 평서문은?',
          uz: '오다 ning rasmiy bayon shakli qaysi?',
          en: 'What is the formal statement form of 오다?',
          ru: 'Какова формальная утвердительная форма 오다?',
        },
        options: [
          {
            text: '옵니다',
            correct: true,
          },
          {
            text: '오습니다',
            correct: false,
          },
          {
            text: '와요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '맵다 → 격식체로 "맵습니다"가 맞는 이유는?',
          uz: 'Nega 맵다 ning rasmiy shakli "맵습니다"?',
          en: 'Why is 맵습니다 the correct formal form of 맵다?',
          ru: 'Почему формальная форма 맵다 — 맵습니다?',
        },
        options: [
          {
            text: '-습니다가 자음으로 시작해서 ㅂ이 그대로 남아요',
            correct: true,
          },
          {
            text: '모든 ㅂ이 항상 우로 바뀌기 때문이에요',
            correct: false,
          },
          {
            text: '맵다는 받침이 없기 때문이에요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '"무엇을 ___? — 비빔밥을 먹습니다."에 알맞은 것은?',
          uz: '"Nima yeysiz? — Bibimbap yeyman." Savolni to‘ldiring.',
          en: 'Complete: "What do you eat? — I eat bibimbap."',
          ru: 'Дополните: «Что вы едите? — Я ем пибимпап».',
        },
        options: [
          {
            text: '먹습니까',
            correct: true,
          },
          {
            text: '먹습니다',
            correct: false,
          },
          {
            text: '먹어요니까',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '"오늘은 날씨가 어떻습니까?"에 격식체로 알맞게 대답한 것은?',
          uz: '"오늘은 날씨가 어떻습니까?" savoliga rasmiy uslubdagi to‘g‘ri javob qaysi?',
          en: 'Which is a correct formal-style answer to 오늘은 날씨가 어떻습니까?',
          ru: 'Какой ответ в формальном стиле подходит к 오늘은 날씨가 어떻습니까?',
        },
        options: [
          {
            text: '비가 옵니다.',
            correct: true,
          },
          {
            text: '비가 옵니까?',
            correct: false,
          },
          {
            text: '비가 오습니다.',
            correct: false,
          },
        ],
      },
    ],
  },

  // ───────── 섹션 1-28. 상태·행동 연결 A/V-고 ─────────
  {
    code: 'adjective-verb-go',
    pattern: 'A/V-고',
    section: 1,
    order: 28,
    isActive: true,
    summary: {
      ko: '앞에서 배운 V-고를 형용사까지 확장한 표현이에요. 두 특징·상태·행동을 "~하고, ~고"처럼 나란히 연결해요.',
      uz: 'Oldin o‘rganilgan V-고 ning sifatlargacha kengaygan shakli. Ikki xususiyat, holat yoki harakatni "va" ma’nosida bog‘laydi.',
      en: 'An extension of the earlier V-고 pattern to adjectives. It links two qualities, states or actions with the sense of "and".',
      ru: 'Расширение ранее изученного V-고 на прилагательные. Соединяет два качества, состояния или действия со значением «и».',
    },
    tags: [
      {
        ko: '초급',
        uz: "Boshlang'ich",
        en: 'Beginner',
        ru: 'Начальный',
      },
      {
        ko: '연결어미',
        uz: "Bog'lovchi",
        en: 'Connector',
        ru: 'Соединительное окончание',
      },
      {
        ko: '나열',
        uz: "Ro'yxat",
        en: 'Listing',
        ru: 'Перечисление',
      },
    ],
    explanation: {
      ko: '5과에서 동사 두 개를 "숙제를 하고 텔레비전을 봐요"처럼 V-고로 연결하는 방법을 배웠어요. 7과에서는 이 표현을 형용사까지 확장해요. 이제 "사과가 싸고 맛있어요"처럼 하나의 대상이 가진 두 특징을 연결하거나, "파리는 춥고 눈이 옵니다"처럼 상태와 사건을 함께 말할 수 있어요. 만드는 방법은 형용사나 동사의 "-다"를 떼고 어간에 바로 "-고"를 붙이면 돼요. 싸다 → 싸고, 맑다 → 맑고, 춥다 → 춥고, 비가 오다 → 비가 오고예요. "-고"는 자음 ㄱ으로 시작하기 때문에 ㅂ 불규칙도 일어나지 않아요. 따라서 춥다 → 추우고가 아니라 "춥고", 덥다 → 더우고가 아니라 "덥고", 맵다 → 매우고가 아니라 "맵고"예요. 앞에서 배운 V-고는 행동의 순서를 나타내는 경우가 많았지만, A-고는 보통 두 특징을 나란히 설명하는 데 많이 사용해요.',
      uz: '5-darsda ikki fe’lni "숙제를 하고 텔레비전을 봐요" kabi V-고 bilan bog‘lash o‘rganilgan edi. 7-darsda bu qoida sifatlarga ham kengayadi. Endi "사과가 싸고 맛있어요" kabi bir narsaning ikki xususiyatini yoki "파리는 춥고 눈이 옵니다" kabi holat va hodisani birga aytish mumkin. "-다" olib tashlanib, o‘zakka "-고" qo‘shiladi: 싸다 → 싸고, 맑다 → 맑고, 춥다 → 춥고, 비가 오다 → 비가 오고. "-고" ㄱ undoshi bilan boshlanadi, shuning uchun ㅂ istisno o‘zgarishi bo‘lmaydi: 춥고, 덥고, 맵고.',
      en: 'In Unit 5, you learned to connect verbs with V-고, as in 숙제를 하고 텔레비전을 봐요. Unit 7 expands the same connector to adjectives. You can now connect two qualities of one thing, as in 사과가 싸고 맛있어요, or combine a state and an event, as in 파리는 춥고 눈이 옵니다. Drop -다 and attach -고 directly to the stem: 싸다 → 싸고, 맑다 → 맑고, 춥다 → 춥고, 비가 오다 → 비가 오고. Because -고 begins with the consonant ㄱ, the ㅂ-irregular change does not occur: use 춥고, 덥고 and 맵고, not 추우고, 더우고 or 매우고. Earlier V-고 often described action sequence; A-고 commonly lists simultaneous qualities or states.',
      ru: 'В 5-м уроке вы научились соединять глаголы через V-고, например 숙제를 하고 텔레비전을 봐요. В 7-м уроке эта конструкция расширяется на прилагательные. Теперь можно соединять два свойства одного предмета: 사과가 싸고 맛있어요, или состояние и событие: 파리는 춥고 눈이 옵니다. Уберите -다 и добавьте -고 прямо к основе: 싸다 → 싸고, 맑다 → 맑고, 춥다 → 춥고, 비가 오다 → 비가 오고. Поскольку -고 начинается с согласной ㄱ, изменение неправильного ㅂ не происходит: 춥고, 덥고, 맵고, а не 추우고, 더우고, 매우고.',
    },
    conjugationRule: {
      ko: 'A/V 어간 + -고  ·  싸다 → 싸고  ·  춥다 → 춥고  ·  오다 → 오고  ·  ㅂ 불규칙 변화 없음',
      uz: 'A/V o‘zagi + -고  ·  싸다 → 싸고  ·  춥다 → 춥고  ·  오다 → 오고  ·  ㅂ istisno o‘zgarishi yo‘q',
      en: 'A/V stem + -고  ·  싸다 → 싸고  ·  춥다 → 춥고  ·  오다 → 오고  ·  no ㅂ-irregular change',
      ru: 'основа A/V + -고  ·  싸다 → 싸고  ·  춥다 → 춥고  ·  오다 → 오고  ·  без изменения неправильного ㅂ',
    },
    conjugations: [
      {
        base: '싸다',
        result: '싸고',
      },
      {
        base: '맛있다',
        result: '맛있고',
      },
      {
        base: '맑다',
        result: '맑고',
      },
      {
        base: '춥다',
        result: '춥고',
      },
      {
        base: '덥다',
        result: '덥고',
      },
      {
        base: '비가 오다',
        result: '비가 오고',
      },
      {
        base: '사진을 찍다',
        result: '사진을 찍고',
      },
    ],
    examples: [
      {
        ko: '사과가 싸고 맛있어요.',
        highlight: '싸고',
        gloss: {
          ko: '사과가 싸고 맛있어요.',
          uz: 'Olma arzon va mazali.',
          en: 'The apples are cheap and delicious.',
          ru: 'Яблоки дешёвые и вкусные.',
        },
      },
      {
        ko: '파리는 춥고 눈이 옵니다.',
        highlight: '춥고',
        gloss: {
          ko: '파리는 춥고 눈이 옵니다.',
          uz: 'Parijda sovuq va qor yog‘adi.',
          en: 'Paris is cold and it snows.',
          ru: 'В Париже холодно и идёт снег.',
        },
      },
      {
        ko: '뉴욕은 가을에 날씨가 맑고 시원합니다.',
        highlight: '맑고',
        gloss: {
          ko: '뉴욕은 가을에 날씨가 맑고 시원합니다.',
          uz: 'Nyu-Yorkda kuzda havo ochiq va salqin.',
          en: 'In autumn, the weather in New York is clear and cool.',
          ru: 'Осенью в Нью-Йорке ясно и прохладно.',
        },
      },
      {
        ko: '파티에서 스티븐은 사진을 찍고 저는 요리를 했어요.',
        highlight: '찍고',
        gloss: {
          ko: '파티에서 스티븐은 사진을 찍고 저는 요리를 했어요.',
          uz: 'Bazmda Stiven suratga oldi, men esa ovqat tayyorladim.',
          en: 'At the party, Steven took pictures and I cooked.',
          ru: 'На вечеринке Стивен фотографировал, а я готовил еду.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '파리는 요즘 날씨가 어떻습니까?',
        highlight: '어떻습니까',
        gloss: {
          ko: '파리는 요즘 날씨가 어떻습니까?',
          uz: 'Shu kunlarda Parijda ob-havo qanday?',
          en: 'How is the weather in Paris these days?',
          ru: 'Какая сейчас погода в Париже?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '춥고 눈이 옵니다.',
        highlight: '춥고',
        gloss: {
          ko: '춥고 눈이 옵니다.',
          uz: 'Sovuq va qor yog‘adi.',
          en: 'It is cold and it snows.',
          ru: 'Холодно и идёт снег.',
        },
      },
    ],
    similar: {
      pattern: 'A/V-지만',
      note: {
        ko: '"-고"는 두 사실을 나란히 더하고, "-지만"은 두 사실을 대조해요. "날씨가 춥고 눈이 와요"는 춥다는 정보와 눈이 온다는 정보를 함께 말해요. "날씨가 춥지만 맑아요"는 춥다는 점과 맑다는 점을 서로 대비해서 말해요. 같은 두 문장을 어떤 관계로 보여 주고 싶은지에 따라 -고와 -지만을 골라요.',
        uz: '"-고" ikki ma’lumotni qo‘shadi, "-지만" esa qarama-qarshi qo‘yadi. "날씨가 춥고 눈이 와요" — sovuq va qor yog‘ishi haqida ikki ma’lumot. "날씨가 춥지만 맑아요" — sovuq bo‘lsa ham havo ochiqligini qarama-qarshi ko‘rsatadi.',
        en: '-고 adds two facts, while -지만 contrasts them. 날씨가 춥고 눈이 와요 simply gives two pieces of information: it is cold and it is snowing. 날씨가 춥지만 맑아요 contrasts cold weather with clear skies.',
        ru: '-고 добавляет два факта, а -지만 противопоставляет их. 날씨가 춥고 눈이 와요 просто сообщает два факта: холодно и идёт снег. 날씨가 춥지만 맑아요 противопоставляет холод ясной погоде.',
      },
    },
    cautions: [
      {
        ko: '"싸요고", "맑아요고", "먹어요고"라고 하지 않아요. -고는 활용된 -아요/어요 뒤가 아니라 어간에 바로 붙여요: 싸고, 맑고, 먹고.',
        uz: '"싸요고", "맑아요고", "먹어요고" deyilmaydi. -고 bevosita o‘zakka qo‘shiladi: 싸고, 맑고, 먹고.',
        en: 'Do not say 싸요고, 맑아요고 or 먹어요고. Attach -고 directly to the stem: 싸고, 맑고, 먹고.',
        ru: 'Не говорите 싸요고, 맑아요고 или 먹어요고. -고 присоединяется прямо к основе: 싸고, 맑고, 먹고.',
      },
      {
        ko: 'ㅂ 불규칙 단어는 -고 앞에서 우로 바뀌지 않아요. "추우고, 더우고, 매우고"가 아니라 "춥고, 덥고, 맵고"예요.',
        uz: 'ㅂ istisno so‘zlari -고 oldida 우 ga o‘zgarmaydi. "추우고, 더우고, 매우고" emas, "춥고, 덥고, 맵고".',
        en: 'ㅂ-irregular stems do not change before -고. Use 춥고, 덥고 and 맵고, not 추우고, 더우고 or 매우고.',
        ru: 'Неправильные основы на ㅂ перед -고 не меняются на 우. Правильно 춥고, 덥고, 맵고.',
      },
      {
        ko: '앞에서 배운 V-고와 형태는 같지만 의미가 항상 "먼저 하고 그다음"인 것은 아니에요. "사과가 싸고 맛있어요"에서는 싸고 난 뒤 맛있는 것이 아니라, 싸고 맛있다는 두 특징이 동시에 있다는 뜻이에요.',
        uz: 'Oldingi V-고 bilan shakli bir xil, lekin har doim "avval, keyin" degani emas. "사과가 싸고 맛있어요" da ikki xususiyat bir vaqtda mavjud: arzon va mazali.',
        en: 'The form is the same as the earlier V-고, but it does not always mean "first X, then Y." In 사과가 싸고 맛있어요, cheap and delicious are two simultaneous qualities.',
        ru: 'Форма та же, что у ранее изученного V-고, но значение не всегда «сначала X, затем Y». В 사과가 싸고 맛있어요 дешёвый и вкусный — два одновременных свойства.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '싸다 + -고 → ?',
          uz: '싸다 + -고 → ?',
          en: '싸다 + -고 → ?',
          ru: '싸다 + -고 → ?',
        },
        options: [
          {
            text: '싸고',
            correct: true,
          },
          {
            text: '싸요고',
            correct: false,
          },
          {
            text: '싸우고',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '춥다 + -고 → ?',
          uz: '춥다 + -고 → ?',
          en: '춥다 + -고 → ?',
          ru: '춥다 + -고 → ?',
        },
        options: [
          {
            text: '춥고',
            correct: true,
          },
          {
            text: '추우고',
            correct: false,
          },
          {
            text: '추워고',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '"사과가 싸___ 맛있어요."에 알맞은 것은?',
          uz: '"Olma arzon va mazali." gapini to‘ldiring.',
          en: 'Complete: "The apples are cheap and delicious."',
          ru: 'Дополните: «Яблоки дешёвые и вкусные».',
        },
        options: [
          {
            text: '고',
            correct: true,
          },
          {
            text: '지만',
            correct: false,
          },
          {
            text: '어요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '"파리는 춥고 눈이 옵니다."에서 -고의 역할은?',
          uz: '"파리는 춥고 눈이 옵니다." gapida -고 nima qiladi?',
          en: 'What is the function of -고 in 파리는 춥고 눈이 옵니다?',
          ru: 'Какую функцию выполняет -고 в 파리는 춥고 눈이 옵니다?',
        },
        options: [
          {
            text: '추운 상태와 눈이 오는 사실을 연결해요',
            correct: true,
          },
          {
            text: '두 내용을 반대로 대조해요',
            correct: false,
          },
          {
            text: '과거형을 만들어요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '-고와 -지만의 차이로 맞는 것은?',
          uz: '-고 va -지만 farqi haqidagi qaysi izoh to‘g‘ri?',
          en: 'Which statement correctly explains the difference between -고 and -지만?',
          ru: 'Какое объяснение разницы между -고 и -지만 верно?',
        },
        options: [
          {
            text: '-고는 내용을 더하고, -지만은 내용을 대조해요',
            correct: true,
          },
          {
            text: '-고는 과거, -지만은 현재만 나타내요',
            correct: false,
          },
          {
            text: '둘은 항상 완전히 같은 뜻이에요',
            correct: false,
          },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // 섹션 1 · 8과 — 영화 볼까요?
  //
  // 제안 V-(으)ㄹ까요?
  // → ㄷ 불규칙
  // → 지시 표현 이[그, 저] N
  // → 발견·느낌 A/V-네요
  //
  // Section 1 마지막 문법
  // ═══════════════════════════════════════════════════════════

  // ───────── 섹션 1-29. 제안 V-(으)ㄹ까요? ─────────
  {
    code: 'suggestion-eulkkayo',
    pattern: 'V-(으)ㄹ까요?',
    section: 1,
    order: 29,
    isActive: true,
    summary: {
      ko: '상대방과 함께 어떤 행동을 하자고 제안하거나, 무엇을 할지 함께 정할 때 쓰는 표현이에요. 영어의 "Shall we...?"와 비슷해요.',
      uz: 'Suhbatdoshga biror ishni birga qilishni taklif qilish yoki nima qilishni birga tanlashda ishlatiladi. Ingliz tilidagi "Shall we...?" ga o‘xshaydi.',
      en: 'Used to suggest doing something together or to ask what you and the listener should do. It is similar to "Shall we...?"',
      ru: 'Используется, чтобы предложить сделать что-то вместе или вместе решить, что делать. По смыслу близко к «Давайте...?» / «Может, ...?».',
    },
    tags: [
      {
        ko: '초급',
        uz: "Boshlang'ich",
        en: 'Beginner',
        ru: 'Начальный',
      },
      {
        ko: '제안',
        uz: 'Taklif',
        en: 'Suggestion',
        ru: 'Предложение',
      },
      {
        ko: '청유문',
        uz: 'Birgalikdagi taklif',
        en: 'Propositive',
        ru: 'Побудительное предложение',
      },
    ],
    explanation: {
      ko: '"V-(으)ㄹ까요?"는 상대방에게 "우리 이것을 같이 할까요?"라고 제안할 때 사용하는 표현이에요. 동사에서 "-다"를 떼고 어간에 받침이 없으면 "-ㄹ까요?", 받침이 있으면 "-을까요?"를 붙여요. 가다 → 갈까요?, 만나다 → 만날까요?, 타다 → 탈까요?처럼 받침이 없는 어간에는 ㄹ이 붙어요. 먹다 → 먹을까요?, 앉다 → 앉을까요?처럼 받침이 있는 어간에는 -을까요?를 붙여요. 교재에서는 "주말에 같이 영화 볼까요?", "노래방에 갈까요?", "여기에 앉을까요?", "뭘 먹을까요?"처럼 실제 약속이나 활동을 정할 때 사용해요. "뭘 먹을까요?"처럼 의문사와 함께 쓰면 단순히 제안 하나를 내놓는 것이 아니라 "우리 무엇을 먹는 게 좋을까요?"처럼 함께 선택하자는 뜻이 돼요. 제안을 받아들일 때는 "네, 좋아요", "네, 같이 가요"처럼 대답할 수 있어요.',
      uz: '"V-(으)ㄹ까요?" suhbatdoshga "Buni birga qilamizmi?" deb taklif qilishda ishlatiladi. Fe’ldan "-다" olib tashlanadi. O‘zak 받침 siz tugasa "-ㄹ까요?", 받침 bilan tugasa "-을까요?" qo‘shiladi. 가다 → 갈까요?, 만나다 → 만날까요?, 타다 → 탈까요?. 받침 bor fe’llarda 먹다 → 먹을까요?, 앉다 → 앉을까요?. Darslikda "주말에 같이 영화 볼까요?", "노래방에 갈까요?", "여기에 앉을까요?", "뭘 먹을까요?" kabi haqiqiy reja va takliflarda ishlatiladi. "뭘 먹을까요?" kabi so‘roq so‘zi bilan kelganda, ikki kishi birgalikda variant tanlaydi.',
      en: '"V-(으)ㄹ까요?" is used to suggest an action to the listener with the sense "Shall we do this together?" Remove -다 from the verb. If the stem has no final consonant, add -ㄹ까요?: 가다 → 갈까요?, 만나다 → 만날까요?, 타다 → 탈까요?. If the stem has a final consonant, add -을까요?: 먹다 → 먹을까요?, 앉다 → 앉을까요?. The textbook uses it for real plans and suggestions such as "주말에 같이 영화 볼까요?", "노래방에 갈까요?", "여기에 앉을까요?" and "뭘 먹을까요?" With a question word, as in 뭘 먹을까요?, the speakers are asking what they should choose to do together.',
      ru: '"V-(으)ㄹ까요?" используется, когда говорящий предлагает собеседнику совместное действие: «Сделаем это вместе?». Уберите -다. Если у основы нет 받침, добавляется -ㄹ까요?: 가다 → 갈까요?, 만나다 → 만날까요?, 타다 → 탈까요?. Если 받침 есть, используется -을까요?: 먹다 → 먹을까요?, 앉다 → 앉을까요?. В учебнике эта форма используется в реальных предложениях и планах: "주말에 같이 영화 볼까요?", "노래방에 갈까요?", "여기에 앉을까요?", "뭘 먹을까요?". С вопросительным словом, например 뭘 먹을까요?, говорящие совместно выбирают, что делать.',
    },
    conjugationRule: {
      ko: '동사 어간 받침 X + -ㄹ까요?  ·  받침 O + -을까요?  ·  가다→갈까요? / 먹다→먹을까요?',
      uz: "Fe'l o‘zagi 받침 siz + -ㄹ까요?  ·  받침 bilan + -을까요?  ·  가다→갈까요? / 먹다→먹을까요?",
      en: 'verb stem with no final consonant + -ㄹ까요?  ·  final consonant + -을까요?  ·  가다→갈까요? / 먹다→먹을까요?',
      ru: 'основа без 받침 + -ㄹ까요?  ·  с 받침 + -을까요?  ·  가다→갈까요? / 먹다→먹을까요?',
    },
    conjugations: [
      {
        base: '가다',
        result: '갈까요?',
      },
      {
        base: '보다',
        result: '볼까요?',
      },
      {
        base: '만나다',
        result: '만날까요?',
      },
      {
        base: '타다',
        result: '탈까요?',
      },
      {
        base: '먹다',
        result: '먹을까요?',
      },
      {
        base: '앉다',
        result: '앉을까요?',
      },
      {
        base: '하다',
        result: '할까요?',
      },
      {
        base: '치다',
        result: '칠까요?',
      },
    ],
    examples: [
      {
        ko: '주말에 같이 영화 볼까요?',
        highlight: '볼까요',
        gloss: {
          ko: '주말에 같이 영화 볼까요?',
          uz: 'Dam olish kunlari birga kino ko‘ramizmi?',
          en: 'Shall we watch a movie together this weekend?',
          ru: 'Посмотрим вместе фильм на выходных?',
        },
      },
      {
        ko: '노래방에 갈까요?',
        highlight: '갈까요',
        gloss: {
          ko: '노래방에 갈까요?',
          uz: 'Karaokega boramizmi?',
          en: 'Shall we go to a karaoke room?',
          ru: 'Пойдём в караоке?',
        },
      },
      {
        ko: '여기에 앉을까요?',
        highlight: '앉을까요',
        gloss: {
          ko: '여기에 앉을까요?',
          uz: 'Bu yerga o‘tiramizmi?',
          en: 'Shall we sit here?',
          ru: 'Сядем здесь?',
        },
      },
      {
        ko: '뭘 먹을까요?',
        highlight: '먹을까요',
        gloss: {
          ko: '뭘 먹을까요?',
          uz: 'Nima yeymiz?',
          en: 'What shall we eat?',
          ru: 'Что будем есть?',
        },
      },
      {
        ko: '내일 같이 테니스를 칠까요?',
        highlight: '칠까요',
        gloss: {
          ko: '내일 같이 테니스를 칠까요?',
          uz: 'Ertaga birga tennis o‘ynaymizmi?',
          en: 'Shall we play tennis together tomorrow?',
          ru: 'Поиграем вместе в теннис завтра?',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '주말에 같이 영화 볼까요?',
        highlight: '볼까요',
        gloss: {
          ko: '주말에 같이 영화 볼까요?',
          uz: 'Dam olish kunlari birga kino ko‘ramizmi?',
          en: 'Shall we watch a movie together this weekend?',
          ru: 'Посмотрим вместе фильм на выходных?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 좋아요.',
        highlight: '좋아요',
        gloss: {
          ko: '네, 좋아요.',
          uz: 'Ha, yaxshi.',
          en: 'Yes, sounds good.',
          ru: 'Да, хорошо.',
        },
      },
    ],
    similar: {
      pattern: 'V-(으)세요',
      note: {
        ko: '"-(으)세요"와 "-(으)ㄹ까요?"는 둘 다 상대방과 관련된 행동을 말하지만 방향이 달라요. "여기 앉으세요"는 상대방에게 앉아 달라고 부탁하거나 안내하는 말이에요. "여기에 앉을까요?"는 나와 상대방이 어디에 앉을지 함께 정하는 제안이에요. 즉 "-(으)세요"는 상대의 행동을 요청하고, "-(으)ㄹ까요?"는 함께할 행동을 제안하는 데 초점을 둬요.',
        uz: '"-(으)세요" va "-(으)ㄹ까요?" ikkalasi ham suhbatdosh bilan bog‘liq, lekin maqsadi boshqacha. "여기 앉으세요" — suhbatdoshdan o‘tirishni so‘raydi. "여기에 앉을까요?" — qayerga birga o‘tirishni taklif qiladi.',
        en: 'Both -(으)세요 and -(으)ㄹ까요? involve the listener, but they do different jobs. 여기 앉으세요 asks the listener to sit. 여기에 앉을까요? suggests that the speakers decide together to sit here. -(으)세요 requests the listener’s action; -(으)ㄹ까요? proposes a shared action.',
        ru: 'Обе конструкции связаны с собеседником, но выполняют разные функции. 여기 앉으세요 просит собеседника сесть. 여기에 앉을까요? предлагает вместе решить, сесть ли здесь. -(으)세요 — просьба к собеседнику, -(으)ㄹ까요? — совместное предложение.',
      },
    },
    cautions: [
      {
        ko: '받침이 없는 동사에 "-을까요?"를 그대로 붙이지 않아요. "가을까요?"가 아니라 "갈까요?", "보을까요?"가 아니라 "볼까요?"예요.',
        uz: '받침 siz fe’lga "-을까요?" ni to‘liq qo‘shmang. "가을까요?" emas "갈까요?", "보을까요?" emas "볼까요?".',
        en: 'Do not attach the full -을까요? after a vowel-ending stem. Use 갈까요?, not 가을까요?, and 볼까요?, not 보을까요?',
        ru: 'После основы без 받침 не добавляйте полное -을까요?. Правильно 갈까요?, а не 가을까요?, и 볼까요?, а не 보을까요?.',
      },
      {
        ko: '"먹어요까요?", "가요까요?"처럼 이미 -아요/어요로 활용한 뒤 붙이지 않아요. 기본형에서 -다를 떼고 바로 -(으)ㄹ까요?를 붙여요.',
        uz: '"먹어요까요?", "가요까요?" deyilmaydi. Fe’lning o‘zagiga to‘g‘ridan-to‘g‘ri -(으)ㄹ까요? qo‘shiladi.',
        en: 'Do not attach this ending to an already conjugated -아요/어요 form such as 먹어요까요? or 가요까요?. Build it directly from the verb stem.',
        ru: 'Не добавляйте окончание к уже спряжённой форме вроде 먹어요까요? или 가요까요?. Формируйте его непосредственно от основы.',
      },
      {
        ko: '걷다와 듣다는 다음 문법의 ㄷ 불규칙 때문에 단순히 "걷을까요, 듣을까요"가 되지 않아요. 8과에서는 "걸을까요?, 들을까요?"로 따로 익혀요.',
        uz: '걷다 va 듣다 keyingi ㄷ istisno qoidasi sabab "걷을까요, 듣을까요" bo‘lmaydi. To‘g‘ri shakllar: "걸을까요?, 들을까요?".',
        en: '걷다 and 듣다 do not simply become 걷을까요? and 듣을까요? because of the ㄷ-irregular pattern taught next. Learn 걸을까요? and 들을까요?.',
        ru: '걷다 и 듣다 не образуют формы 걷을까요? и 듣을까요? из-за следующего правила неправильного ㄷ. Правильно: 걸을까요? и 들을까요?.',
      },
      {
        ko: '교재의 발음 연습에서는 청유문의 끝을 약간 올렸다가 내리는 억양으로 연습해요. 단순 평서문처럼 끝내지 않고 제안하는 느낌을 살려 말해요.',
        uz: 'Darslik talaffuz mashqida taklif gapining oxiri biroz ko‘tarilib, keyin tushadi. Oddiy bayon gapidek aytmasdan taklif ohangini saqlang.',
        en: 'The textbook pronunciation section practices suggestion sentences with a slight rise and then fall at the end. Use an intonation that sounds like a proposal rather than a plain statement.',
        ru: 'В разделе произношения учебника конец побудительного предложения слегка повышается, а затем понижается. Произносите его как предложение, а не как обычное утверждение.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '가다 + -(으)ㄹ까요? → ?',
          uz: '가다 + -(으)ㄹ까요? → ?',
          en: '가다 + -(으)ㄹ까요? → ?',
          ru: '가다 + -(으)ㄹ까요? → ?',
        },
        options: [
          {
            text: '갈까요?',
            correct: true,
          },
          {
            text: '가을까요?',
            correct: false,
          },
          {
            text: '가요까요?',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '먹다 + -(으)ㄹ까요? → ?',
          uz: '먹다 + -(으)ㄹ까요? → ?',
          en: '먹다 + -(으)ㄹ까요? → ?',
          ru: '먹다 + -(으)ㄹ까요? → ?',
        },
        options: [
          {
            text: '먹을까요?',
            correct: true,
          },
          {
            text: '먹ㄹ까요?',
            correct: false,
          },
          {
            text: '먹어요까요?',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '친구에게 주말에 함께 영화를 보자고 자연스럽게 제안하세요.',
          uz: 'Do‘stingizga dam olish kunlari birga kino ko‘rishni taklif qiling.',
          en: 'Naturally suggest watching a movie together this weekend.',
          ru: 'Естественно предложите другу посмотреть фильм вместе на выходных.',
        },
        options: [
          {
            text: '주말에 같이 영화 볼까요?',
            correct: true,
          },
          {
            text: '주말에 같이 영화 보세요.',
            correct: false,
          },
          {
            text: '주말에 같이 영화 봤어요?',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '"뭘 먹을까요?"의 뜻으로 가장 알맞은 것은?',
          uz: '"뭘 먹을까요?" ning eng mos ma’nosi qaysi?',
          en: 'Which best expresses the meaning of 뭘 먹을까요?',
          ru: 'Как лучше всего передать смысл 뭘 먹을까요?',
        },
        options: [
          {
            text: '우리 무엇을 먹을지 같이 정해요',
            correct: true,
          },
          {
            text: '당신은 무엇을 먹었어요?',
            correct: false,
          },
          {
            text: '무엇을 먹지 마세요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: 'A: 노래방에 갈까요? B: ___',
          uz: 'A: 노래방에 갈까요? B: ___',
          en: 'A: 노래방에 갈까요? B: ___',
          ru: 'A: 노래방에 갈까요? B: ___',
        },
        options: [
          {
            text: '네, 같이 가요.',
            correct: true,
          },
          {
            text: '노래방이 학생이에요.',
            correct: false,
          },
          {
            text: '어제 노래방이에요.',
            correct: false,
          },
        ],
      },
    ],
  },

  // ───────── 섹션 1-30. ㄷ 불규칙 ─────────
  {
    code: 'irregular-digeut',
    pattern: 'ㄷ 불규칙',
    section: 1,
    order: 30,
    isActive: true,
    summary: {
      ko: '8과의 걷다·듣다는 모음으로 시작하는 어미를 만나면 어간 끝 ㄷ이 ㄹ로 바뀌어요. 걷다 → 걸어요, 듣다 → 들어요처럼 활용해요.',
      uz: '8-darsdagi 걷다 va 듣다 unli bilan boshlanadigan qo‘shimcha oldida oxirgi ㄷ ni ㄹ ga o‘zgartiradi. Masalan, 걷다 → 걸어요, 듣다 → 들어요.',
      en: 'In Unit 8, 걷다 and 듣다 change the final ㄷ of the stem to ㄹ before vowel-initial endings: 걷다 → 걸어요, 듣다 → 들어요.',
      ru: 'В 8-м уроке у 걷다 и 듣다 перед окончаниями, начинающимися с гласной, конечный ㄷ меняется на ㄹ: 걷다 → 걸어요, 듣다 → 들어요.',
    },
    tags: [
      {
        ko: '초급',
        uz: "Boshlang'ich",
        en: 'Beginner',
        ru: 'Начальный',
      },
      {
        ko: '불규칙',
        uz: 'Istisno',
        en: 'Irregular',
        ru: 'Неправильное спряжение',
      },
      {
        ko: 'ㄷ 불규칙',
        uz: 'ㄷ istisno',
        en: 'ㄷ irregular',
        ru: 'Неправильное ㄷ',
      },
    ],
    explanation: {
      ko: '8과에서는 걷다와 듣다의 ㄷ 불규칙 활용을 배워요. 이 두 동사의 기본형에서 "-다"를 떼면 걷-, 듣-이 돼요. 뒤에 "-어요, -었어요, -으세요, -(으)ㄹ까요?"처럼 모음으로 이어지는 어미가 오면 어간 끝의 ㄷ이 ㄹ로 바뀌어요. 그래서 걷다 → 걸어요, 걸었어요, 걸으세요, 걸을까요?가 되고, 듣다 → 들어요, 들었어요, 들으세요, 들을까요?가 돼요. 교재에서는 "공원에서 걸었어요", "걸어서 가요", "한국 음악은 듣지만 한국 뉴스는 안 들어요", "라디오를 잘 들으세요"처럼 여러 형태를 함께 보여 줘요. 반대로 "-지만"처럼 자음으로 바로 시작하는 어미 앞에서는 교재의 "듣지만"처럼 ㄷ이 그대로 남아요. 핵심은 완성된 "걸어요"나 "들어요"를 외우는 것뿐 아니라 원래 기본형이 각각 걷다와 듣다라는 것을 연결해서 이해하는 거예요.',
      uz: '8-darsda 걷다 va 듣다 ning ㄷ istisno tuslanishi o‘rganiladi. "-다" olib tashlansa 걷-, 듣- qoladi. Keyin "-어요, -었어요, -으세요, -(으)ㄹ까요?" kabi unli bilan bog‘lanadigan qo‘shimcha kelsa, oxirgi ㄷ → ㄹ bo‘ladi. Shuning uchun 걷다 → 걸어요, 걸었어요, 걸으세요, 걸을까요?; 듣다 → 들어요, 들었어요, 들으세요, 들을까요?. Darslikda "공원에서 걸었어요", "걸어서 가요", "한국 음악은 듣지만 한국 뉴스는 안 들어요", "라디오를 잘 들으세요" kabi shakllar beriladi. "-지만" undosh bilan boshlangani uchun "듣지만" da ㄷ saqlanadi.',
      en: 'Unit 8 teaches the ㄷ-irregular behavior of 걷다 and 듣다. Removing -다 gives the stems 걷- and 듣-. Before endings that connect through a vowel, such as -어요, -었어요, -으세요 and -(으)ㄹ까요?, the final ㄷ changes to ㄹ. Thus 걷다 becomes 걸어요, 걸었어요, 걸으세요 and 걸을까요?, while 듣다 becomes 들어요, 들었어요, 들으세요 and 들을까요?. The textbook shows forms such as 공원에서 걸었어요, 걸어서 가요, 한국 음악은 듣지만 한국 뉴스는 안 들어요 and 라디오를 잘 들으세요. Before a consonant-initial ending such as -지만, the textbook form 듣지만 keeps ㄷ. The important point is to connect forms such as 걸어요 and 들어요 back to their dictionary forms 걷다 and 듣다.',
      ru: 'В 8-м уроке изучается неправильное спряжение 걷다 и 듣다. После удаления -다 получаются основы 걷- и 듣-. Перед окончаниями, соединяющимися через гласную, например -어요, -었어요, -으세요 и -(으)ㄹ까요?, конечный ㄷ меняется на ㄹ. Поэтому 걷다 → 걸어요, 걸었어요, 걸으세요, 걸을까요?, а 듣다 → 들어요, 들었어요, 들으세요, 들을까요?. В учебнике встречаются 공원에서 걸었어요, 걸어서 가요, 한국 음악은 듣지만 한국 뉴스는 안 들어요 и 라디오를 잘 들으세요. Перед начинающимся с согласной -지만 в форме 듣지만 ㄷ сохраняется.',
    },
    conjugationRule: {
      ko: '걷-/듣- + 모음으로 이어지는 어미 → ㄷ이 ㄹ로 변화  ·  걷-→걸- / 듣-→들-  ·  듣다+-지만→듣지만',
      uz: '걷-/듣- + unli bilan bog‘lanadigan qo‘shimcha → ㄷ→ㄹ  ·  걷-→걸- / 듣-→들-  ·  듣다+-지만→듣지만',
      en: '걷-/듣- + vowel-connecting ending → ㄷ changes to ㄹ  ·  걷-→걸- / 듣-→들-  ·  듣다+-지만→듣지만',
      ru: '걷-/듣- + окончание с гласным соединением → ㄷ→ㄹ  ·  걷-→걸- / 듣-→들-  ·  듣다+-지만→듣지만',
    },
    conjugations: [
      {
        base: '걷다 + -어요',
        result: '걸어요',
      },
      {
        base: '걷다 + -었어요',
        result: '걸었어요',
      },
      {
        base: '걷다 + -으세요',
        result: '걸으세요',
      },
      {
        base: '걷다 + -(으)ㄹ까요?',
        result: '걸을까요?',
      },
      {
        base: '듣다 + -어요',
        result: '들어요',
      },
      {
        base: '듣다 + -었어요',
        result: '들었어요',
      },
      {
        base: '듣다 + -으세요',
        result: '들으세요',
      },
      {
        base: '듣다 + -(으)ㄹ까요?',
        result: '들을까요?',
      },
      {
        base: '듣다 + -지만',
        result: '듣지만',
      },
    ],
    examples: [
      {
        ko: '우리 같이 걸을까요?',
        highlight: '걸을까요',
        gloss: {
          ko: '우리 같이 걸을까요?',
          uz: 'Birga piyoda yuramizmi?',
          en: 'Shall we walk together?',
          ru: 'Погуляем вместе?',
        },
      },
      {
        ko: '어제 공원에서 걸었어요.',
        highlight: '걸었어요',
        gloss: {
          ko: '어제 공원에서 걸었어요.',
          uz: 'Kecha bog‘da piyoda yurdim.',
          en: 'I walked in the park yesterday.',
          ru: 'Вчера была прогулка в парке.',
        },
      },
      {
        ko: '우리 버스를 탈까요? 아니요, 걸어서 가요.',
        highlight: '걸어서',
        gloss: {
          ko: '우리 버스를 탈까요? 아니요, 걸어서 가요.',
          uz: 'Avtobusga chiqamizmi? Yo‘q, piyoda boramiz.',
          en: 'Shall we take the bus? No, let’s go on foot.',
          ru: 'Поедем на автобусе? Нет, пойдём пешком.',
        },
      },
      {
        ko: '한국 음악은 듣지만 한국 뉴스는 안 들어요.',
        highlight: '듣지만',
        gloss: {
          ko: '한국 음악은 듣지만 한국 뉴스는 안 들어요.',
          uz: 'Koreys musiqasini tinglayman, lekin koreys yangiliklarini tinglamayman.',
          en: 'I listen to Korean music, but I do not listen to Korean news.',
          ru: 'Корейскую музыку слушаю, но корейские новости не слушаю.',
        },
      },
      {
        ko: '라디오를 잘 들으세요.',
        highlight: '들으세요',
        gloss: {
          ko: '라디오를 잘 들으세요.',
          uz: 'Radioni diqqat bilan tinglang.',
          en: 'Please listen carefully to the radio.',
          ru: 'Пожалуйста, внимательно слушайте радио.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '우리 같이 걸을까요?',
        highlight: '걸을까요',
        gloss: {
          ko: '우리 같이 걸을까요?',
          uz: 'Birga piyoda yuramizmi?',
          en: 'Shall we walk together?',
          ru: 'Погуляем вместе?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 좋아요.',
        highlight: '좋아요',
        gloss: {
          ko: '네, 좋아요.',
          uz: 'Ha, yaxshi.',
          en: 'Yes, sounds good.',
          ru: 'Да, хорошо.',
        },
      },
    ],
    similar: {
      pattern: 'ㅂ 불규칙',
      note: {
        ko: '7과의 ㅂ 불규칙과 원리는 비슷해요. 둘 다 특정 어미를 만났을 때 어간 받침이 바뀌어요. 하지만 바뀌는 글자가 달라요. 춥다에서는 ㅂ이 우로 바뀌어 "추워요"가 되고, 걷다에서는 ㄷ이 ㄹ로 바뀌어 "걸어요"가 돼요. 그래서 불규칙 문법은 어떤 받침이 어떻게 바뀌는지를 각각 따로 기억해야 해요.',
        uz: 'Bu 7-darsdagi ㅂ istisnoga o‘xshaydi: ma’lum qo‘shimcha kelganda o‘zak oxiri o‘zgaradi. Lekin o‘zgarish boshqacha. 춥다 da ㅂ → 우: 추워요. 걷다 da ㄷ → ㄹ: 걸어요.',
        en: 'This resembles the Unit 7 ㅂ irregular because the stem changes before certain endings, but the change is different. 춥다 changes ㅂ to 우 and becomes 추워요; 걷다 changes ㄷ to ㄹ and becomes 걸어요.',
        ru: 'Это похоже на неправильное ㅂ из 7-го урока: перед некоторыми окончаниями основа меняется. Но изменение другое. 춥다: ㅂ → 우 → 추워요; 걷다: ㄷ → ㄹ → 걸어요.',
      },
    },
    cautions: [
      {
        ko: '걷다를 "-어요"와 연결할 때 "걷어요"라고 하지 않아요. 8과에서 배우는 형태는 "걸어요"예요.',
        uz: '걷다 + -어요 ni "걷어요" demang. 8-darsdagi to‘g‘ri shakl "걸어요".',
        en: 'Do not use 걷어요 for the Unit 8 form of 걷다 + -어요. The form taught here is 걸어요.',
        ru: 'Для 걷다 + -어요 в 8-м уроке используется 걸어요, а не 걷어요.',
      },
      {
        ko: '듣다도 "듣어요"가 아니라 "들어요", "듣으세요"가 아니라 "들으세요"예요.',
        uz: '듣다 ham "듣어요" emas "들어요", "듣으세요" emas "들으세요".',
        en: 'Likewise, use 들어요 rather than 듣어요, and 들으세요 rather than 듣으세요.',
        ru: 'Аналогично: 들어요, а не 듣어요; 들으세요, а не 듣으세요.',
      },
      {
        ko: '-지만 앞에서는 교재처럼 "듣지만"이라고 해요. 이미 배운 "들어요"를 보고 모든 형태를 "들-"로 만들면 안 돼요.',
        uz: '-지만 oldida darslikdagidek "듣지만" deyiladi. "들어요" ni ko‘rib barcha shaklni "들-" bilan yasamang.',
        en: 'Before -지만, use the textbook form 듣지만. Do not assume every form must use 들- just because you learned 들어요.',
        ru: 'Перед -지만 используется форма 듣지만. Не нужно делать все формы через 들- только потому, что вы выучили 들어요.',
      },
      {
        ko: '자기평가에서 "날씨가 따뜻하네요. 같이 걸을까요?"가 나오므로 걷다의 제안형도 반드시 "걸을까요?"로 연결해서 기억해요.',
        uz: 'O‘zini tekshirishda "날씨가 따뜻하네요. 같이 걸을까요?" keladi. Shuning uchun 걷다 ning taklif shaklini "걸을까요?" deb eslab qoling.',
        en: 'The self-check uses 날씨가 따뜻하네요. 같이 걸을까요?, so remember the suggestion form of 걷다 specifically as 걸을까요?.',
        ru: 'В самопроверке есть 날씨가 따뜻하네요. 같이 걸을까요?, поэтому запомните форму предложения от 걷다 именно как 걸을까요?.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '걷다 + -어요 → ?',
          uz: '걷다 + -어요 → ?',
          en: '걷다 + -어요 → ?',
          ru: '걷다 + -어요 → ?',
        },
        options: [
          {
            text: '걸어요',
            correct: true,
          },
          {
            text: '걷어요',
            correct: false,
          },
          {
            text: '걸아요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '듣다 + -어요 → ?',
          uz: '듣다 + -어요 → ?',
          en: '듣다 + -어요 → ?',
          ru: '듣다 + -어요 → ?',
        },
        options: [
          {
            text: '들어요',
            correct: true,
          },
          {
            text: '듣어요',
            correct: false,
          },
          {
            text: '들아요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '걷다 + -(으)ㄹ까요? → ?',
          uz: '걷다 + -(으)ㄹ까요? → ?',
          en: '걷다 + -(으)ㄹ까요? → ?',
          ru: '걷다 + -(으)ㄹ까요? → ?',
        },
        options: [
          {
            text: '걸을까요?',
            correct: true,
          },
          {
            text: '걷을까요?',
            correct: false,
          },
          {
            text: '걸까요?',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '"한국 음악은 ___ 한국 뉴스는 안 들어요."에 알맞은 것은?',
          uz: '"한국 음악은 ___ 한국 뉴스는 안 들어요." Bo‘sh joyni to‘ldiring.',
          en: 'Complete: 한국 음악은 ___ 한국 뉴스는 안 들어요.',
          ru: 'Дополните: 한국 음악은 ___ 한국 뉴스는 안 들어요.',
        },
        options: [
          {
            text: '듣지만',
            correct: true,
          },
          {
            text: '들지만',
            correct: false,
          },
          {
            text: '들어요지만',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '듣다의 활용을 모두 올바르게 묶은 것은?',
          uz: '듣다 ning to‘g‘ri shakllari qaysi qatorda?',
          en: 'Which set contains correct forms of 듣다?',
          ru: 'В каком наборе все формы 듣다 правильные?',
        },
        options: [
          {
            text: '들어요 · 들었어요 · 들으세요',
            correct: true,
          },
          {
            text: '듣어요 · 듣었어요 · 듣으세요',
            correct: false,
          },
          {
            text: '들아요 · 들았어요 · 들세요',
            correct: false,
          },
        ],
      },
    ],
  },

  // ───────── 섹션 1-31. 지시 표현 이[그, 저] N ─────────
  {
    code: 'demonstrative-i-geu-jeo-n',
    pattern: '이[그, 저] N',
    section: 1,
    order: 31,
    isActive: true,
    summary: {
      ko: '명사 바로 앞에 이·그·저를 붙여 "이 영화, 그 가방, 저 사람"처럼 어떤 사람이나 물건을 가리켜요.',
      uz: 'Otning oldiga 이, 그 yoki 저 qo‘yib, "bu film, o‘sha sumka, ana u odam" kabi aniq narsani ko‘rsatadi.',
      en: 'Place 이, 그 or 저 directly before a noun to point out a specific person or thing: 이 영화, 그 가방, 저 사람.',
      ru: '이, 그 или 저 ставятся непосредственно перед существительным, чтобы указать на конкретного человека или предмет: 이 영화, 그 가방, 저 사람.',
    },
    tags: [
      {
        ko: '초급',
        uz: "Boshlang'ich",
        en: 'Beginner',
        ru: 'Начальный',
      },
      {
        ko: '지시어',
        uz: "Ko'rsatish so'zi",
        en: 'Demonstrative',
        ru: 'Указательное слово',
      },
      {
        ko: '명사',
        uz: 'Ot',
        en: 'Noun',
        ru: 'Существительное',
      },
    ],
    explanation: {
      ko: '"이, 그, 저"는 뒤의 명사를 가리키는 말이에요. 명사 앞에 바로 붙여서 "이 영화", "그 가방", "저 사람", "이 식당"처럼 사용해요. 기본적으로 "이 N"은 말하는 사람에게 가까운 대상을 가리키고, "그 N"은 상대방 쪽의 대상이나 대화에서 이미 가리킨 대상을 이어서 말할 때 쓰기 좋아요. "저 N"은 말하는 사람과 듣는 사람에게서 모두 떨어져 있는 대상을 가리킬 때 사용해요. 교재의 "이 가방 얼마예요? — 그 가방은 3만 원이에요"를 보면 첫 번째 사람이 자기 쪽에서 "이 가방"이라고 가리킨 물건을 상대방은 "그 가방"이라고 받아서 말해요. "저 사람은 한국 가수예요"에서는 멀리 있는 사람을 가리켜요. 중요한 점은 이·그·저 뒤에 반드시 명사가 온다는 거예요. "이 영화, 그 식당, 저 사람"처럼 사용해요.',
      uz: '"이, 그, 저" keyingi otni ko‘rsatadi va bevosita ot oldidan keladi: "이 영화", "그 가방", "저 사람", "이 식당". Asosan "이 N" gapiruvchiga yaqin narsani, "그 N" suhbatdosh tomondagi yoki suhbatda avval ko‘rsatilgan narsani, "저 N" esa ikkala suhbatdoshdan ham uzoq narsani ko‘rsatadi. Darslikdagi "이 가방 얼마예요? — 그 가방은 3만 원이에요" misolida birinchi odam "이 가방" degan narsani ikkinchi odam o‘z nuqtai nazaridan "그 가방" deb davom ettiradi. "저 사람은 한국 가수예요" uzoqdagi odamni ko‘rsatadi.',
      en: '이, 그 and 저 point to the noun that immediately follows them: 이 영화, 그 가방, 저 사람, 이 식당. As a basic spatial guide, 이 N points to something near the speaker, 그 N can point to something on the listener’s side or continue referring to something already indicated in the conversation, and 저 N points to something away from both speaker and listener. The textbook pair "이 가방 얼마예요? — 그 가방은 3만 원이에요" is especially useful: one speaker refers to the bag as 이 가방, while the other speaker refers back to it as 그 가방. In "저 사람은 한국 가수예요", 저 points to a person farther away.',
      ru: '"이, 그, 저" указывают на существительное, которое идёт сразу после них: 이 영화, 그 가방, 저 사람, 이 식당. В базовом пространственном употреблении 이 N указывает на предмет рядом с говорящим, 그 N — на предмет со стороны собеседника или уже упомянутый объект, а 저 N — на объект далеко от обоих. Особенно показателен пример учебника "이 가방 얼마예요? — 그 가방은 3만 원이에요": первый говорящий называет сумку 이 가방, а второй продолжает говорить о ней как 그 가방. В "저 사람은 한국 가수예요" 저 указывает на находящегося дальше человека.',
    },
    conjugationRule: {
      ko: '이 + N → 이 N  ·  그 + N → 그 N  ·  저 + N → 저 N  ·  지시어와 명사 사이에 조사 없음',
      uz: '이 + N → 이 N  ·  그 + N → 그 N  ·  저 + N → 저 N  ·  ko‘rsatish so‘zi bilan ot orasida qo‘shimcha yo‘q',
      en: '이 + noun → 이 N  ·  그 + noun → 그 N  ·  저 + noun → 저 N  ·  no particle between the demonstrative and noun',
      ru: '이 + N → 이 N  ·  그 + N → 그 N  ·  저 + N → 저 N  ·  между указательным словом и существительным частица не ставится',
    },
    conjugations: [
      {
        base: '이 + 영화',
        result: '이 영화',
      },
      {
        base: '이 + 가방',
        result: '이 가방',
      },
      {
        base: '그 + 가방',
        result: '그 가방',
      },
      {
        base: '저 + 사람',
        result: '저 사람',
      },
      {
        base: '이 + 식당',
        result: '이 식당',
      },
      {
        base: '저 + 영화',
        result: '저 영화',
      },
    ],
    examples: [
      {
        ko: '이 가방 얼마예요?',
        highlight: '이 가방',
        gloss: {
          ko: '이 가방 얼마예요?',
          uz: 'Bu sumka qancha turadi?',
          en: 'How much is this bag?',
          ru: 'Сколько стоит эта сумка?',
        },
      },
      {
        ko: '그 가방은 3만 원이에요.',
        highlight: '그 가방',
        gloss: {
          ko: '그 가방은 3만 원이에요.',
          uz: 'O‘sha sumka 30 000 von.',
          en: 'That bag is 30,000 won.',
          ru: 'Та сумка стоит 30 000 вон.',
        },
      },
      {
        ko: '저 사람은 한국 가수예요.',
        highlight: '저 사람',
        gloss: {
          ko: '저 사람은 한국 가수예요.',
          uz: 'Ana u odam koreys qo‘shiqchisi.',
          en: 'That person over there is a Korean singer.',
          ru: 'Вон тот человек — корейский певец.',
        },
      },
      {
        ko: '이 식당 음식이 맛있어요.',
        highlight: '이 식당',
        gloss: {
          ko: '이 식당 음식이 맛있어요.',
          uz: 'Bu restoranning ovqati mazali.',
          en: 'The food at this restaurant is delicious.',
          ru: 'Еда в этом ресторане вкусная.',
        },
      },
      {
        ko: '이 영화 볼까요, 저 영화 볼까요?',
        highlight: '이 영화',
        gloss: {
          ko: '이 영화 볼까요, 저 영화 볼까요?',
          uz: 'Bu kinoni ko‘ramizmi yoki ana u kinoni?',
          en: 'Shall we watch this movie or that movie over there?',
          ru: 'Посмотрим этот фильм или вон тот?',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이 가방 얼마예요?',
        highlight: '이 가방',
        gloss: {
          ko: '이 가방 얼마예요?',
          uz: 'Bu sumka qancha turadi?',
          en: 'How much is this bag?',
          ru: 'Сколько стоит эта сумка?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '그 가방은 3만 원이에요.',
        highlight: '그 가방',
        gloss: {
          ko: '그 가방은 3만 원이에요.',
          uz: 'O‘sha sumka 30 000 von.',
          en: 'That bag is 30,000 won.',
          ru: 'Та сумка стоит 30 000 вон.',
        },
      },
    ],
    similar: {
      pattern: '이거[그거, 저거]',
      note: {
        ko: '"이거/그거/저거"는 물건의 이름을 대신하는 말이고, "이/그/저 N"은 물건이나 사람의 이름을 직접 말할 때 사용해요. 그래서 물건 이름을 모를 때는 "이거 뭐예요?"라고 할 수 있고, 이름을 알고 있으면 "이 가방 얼마예요?"처럼 말할 수 있어요. "이거 가방"처럼 이거와 명사를 바로 붙이지 않아요.',
        uz: '"이거/그거/저거" narsaning nomi o‘rnini bosadi. "이/그/저 N" esa otning o‘zi aytilganda ishlatiladi. Nomi noma’lum bo‘lsa "이거 뭐예요?", ma’lum bo‘lsa "이 가방 얼마예요?". "이거 가방" deyilmaydi.',
        en: '이거/그거/저거 stand in for the object itself, while 이/그/저 N are used when the noun is stated. If you do not know the object’s name, you can ask 이거 뭐예요?. If you name it, say 이 가방 얼마예요?. Do not combine them as 이거 가방.',
        ru: '이거/그거/저거 заменяют название предмета, а 이/그/저 N используются вместе с самим существительным. Если название неизвестно, можно спросить 이거 뭐예요?. Если оно известно, говорят 이 가방 얼마예요?. Форма 이거 가방 неправильна.',
      },
    },
    cautions: [
      {
        ko: '"이 영화"를 "이거 영화"라고 하지 않아요. 명사를 직접 말할 때는 이·그·저만 명사 앞에 놓아요.',
        uz: '"이 영화" o‘rniga "이거 영화" demang. Ot aytilganda faqat 이, 그, 저 ot oldiga keladi.',
        en: 'Do not say 이거 영화 for 이 영화. When the noun is stated, place only 이, 그 or 저 before it.',
        ru: 'Не говорите 이거 영화 вместо 이 영화. Если существительное называется, перед ним ставится только 이, 그 или 저.',
      },
      {
        ko: '이·그·저 뒤에는 명사가 바로 와요. "이 가방", "그 영화", "저 사람"처럼 사용하고, 사이에 은/는·이/가 같은 조사를 넣지 않아요.',
        uz: '이, 그, 저 dan keyin ot darhol keladi: "이 가방", "그 영화", "저 사람". Ularning orasiga 은/는 yoki 이/가 qo‘yilmaydi.',
        en: 'The noun follows 이, 그 or 저 directly: 이 가방, 그 영화, 저 사람. Do not put a particle between the demonstrative and the noun.',
        ru: 'После 이, 그, 저 существительное идёт сразу: 이 가방, 그 영화, 저 사람. Частица между ними не ставится.',
      },
      {
        ko: '같은 물건도 말하는 사람의 위치가 바뀌면 이와 그가 달라질 수 있어요. 교재의 "이 가방 얼마예요? — 그 가방은 3만 원이에요"를 한 덩어리로 기억하면 좋아요.',
        uz: 'Bir xil narsa gapiruvchining nuqtai nazariga qarab 이 yoki 그 bo‘lishi mumkin. "이 가방 얼마예요? — 그 가방은 3만 원이에요" ni bir juftlik sifatida eslab qoling.',
        en: 'The same object can be referred to with different demonstratives depending on the speaker’s viewpoint. Memorize the textbook pair 이 가방 얼마예요? — 그 가방은 3만 원이에요.',
        ru: 'Один и тот же предмет может называться по-разному в зависимости от точки зрения говорящего. Полезно запомнить пару из учебника: 이 가방 얼마예요? — 그 가방은 3만 원이에요.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '내 가까이에 있는 가방을 가리켜 가격을 물어요.',
          uz: 'Yoningizdagi sumkani ko‘rsatib narxini so‘rang.',
          en: 'Point to a bag near you and ask its price.',
          ru: 'Укажите на сумку рядом с собой и спросите цену.',
        },
        options: [
          {
            text: '이 가방 얼마예요?',
            correct: true,
          },
          {
            text: '이거 가방 얼마예요?',
            correct: false,
          },
          {
            text: '저 사람 얼마예요?',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: 'A: 이 가방 얼마예요? B: ___ 가방은 3만 원이에요.',
          uz: 'A: 이 가방 얼마예요? B: ___ 가방은 3만 원이에요.',
          en: 'A: 이 가방 얼마예요? B: ___ 가방은 3만 원이에요.',
          ru: 'A: 이 가방 얼마예요? B: ___ 가방은 3만 원이에요.',
        },
        options: [
          {
            text: '그',
            correct: true,
          },
          {
            text: '이거',
            correct: false,
          },
          {
            text: '무슨',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '멀리 있는 사람을 가리키는 교재 문장을 완성하세요. "___ 사람은 한국 가수예요."',
          uz: 'Uzoqdagi odamni ko‘rsatuvchi gapni to‘ldiring.',
          en: 'Complete the textbook sentence pointing to a person farther away.',
          ru: 'Дополните предложение учебника, указывающее на человека вдали.',
        },
        options: [
          {
            text: '저',
            correct: true,
          },
          {
            text: '이거',
            correct: false,
          },
          {
            text: '뭐',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '"이거"와 "이 가방"의 차이로 맞는 것은?',
          uz: '"이거" va "이 가방" farqi haqidagi to‘g‘ri izoh qaysi?',
          en: 'Which correctly explains the difference between 이거 and 이 가방?',
          ru: 'Какое объяснение разницы между 이거 и 이 가방 верно?',
        },
        options: [
          {
            text: '이거는 물건 이름을 대신하고, 이는 명사 앞에 와요',
            correct: true,
          },
          {
            text: '이거는 항상 사람 이름 앞에 와요',
            correct: false,
          },
          {
            text: '이와 이거는 반드시 같이 써요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '맞는 표현을 고르세요.',
          uz: 'To‘g‘ri ifodani tanlang.',
          en: 'Choose the correct expression.',
          ru: 'Выберите правильное выражение.',
        },
        options: [
          {
            text: '저 영화 볼까요?',
            correct: true,
          },
          {
            text: '저거 영화 볼까요?',
            correct: false,
          },
          {
            text: '저가 영화 볼까요?',
            correct: false,
          },
        ],
      },
    ],
  },

  // ───────── 섹션 1-32. 발견·느낌 A/V-네요 ─────────
  {
    code: 'reaction-neyo',
    pattern: 'A/V-네요',
    section: 1,
    order: 32,
    isActive: true,
    summary: {
      ko: '직접 보고·듣고·경험하면서 새롭게 알게 된 사실이나 그 순간 느낀 인상을 표현해요. "~네요", "정말 ~하네요"처럼 자연스러운 반응을 만들어요.',
      uz: 'Biror narsani bevosita ko‘rib, eshitib yoki boshdan kechirib, shu paytda sezilgan yangi ma’lumot yoki taassurotni ifodalaydi.',
      en: 'Expresses a newly noticed fact or an immediate impression based on what the speaker sees, hears or experiences.',
      ru: 'Выражает только что замеченный факт или непосредственное впечатление от того, что говорящий видит, слышит или испытывает.',
    },
    tags: [
      {
        ko: '초급',
        uz: "Boshlang'ich",
        en: 'Beginner',
        ru: 'Начальный',
      },
      {
        ko: '느낌',
        uz: 'Taasurot',
        en: 'Impression',
        ru: 'Впечатление',
      },
      {
        ko: '발견',
        uz: 'Kashf qilish',
        en: 'Realization',
        ru: 'Обнаружение',
      },
    ],
    explanation: {
      ko: '"-네요"는 단순히 정보를 전달하는 것보다, 지금 직접 보고·듣고·먹어 보고·경험하면서 새롭게 느낀 사실을 말할 때 사용해요. 교재에서 명동에 도착한 뒤 많은 사람을 보고 "와, 사람이 정말 많네요"라고 하는 것이 대표적인 예예요. 모자의 가격을 보고 "모자가 정말 싸네요", 직접 더위를 느끼며 "조금 덥네요", 밖을 보고 "비가 많이 오네요", 다른 사람이 먹는 모습을 보고 "마리코 씨는 밥을 정말 조금 먹네요"라고 말해요. 만드는 방법은 형용사나 동사의 "-다"를 떼고 어간에 바로 "-네요"를 붙이는 거예요. 많다 → 많네요, 싸다 → 싸네요, 오다 → 오네요, 먹다 → 먹네요가 돼요. 특히 앞에서 배운 ㅂ 불규칙과 연결해서 봐야 해요. "-네요"는 ㄴ으로 시작하므로 덥다와 춥다의 ㅂ이 우로 바뀌지 않아요. 그래서 "더워요"지만 "덥네요", "추워요"지만 "춥네요"라고 해요. "-아요/어요"가 비교적 중립적으로 사실을 말한다면 "-네요"는 그 순간 화자가 알아차린 느낌이나 반응이 더 살아 있어요.',
      uz: '"-네요" oddiy ma’lumot berishdan ko‘ra, gapiruvchi hozir ko‘rib, eshitib, tatib yoki boshdan kechirib yangi sezgan holatini aytadi. Darslikda Myondonga kelib ko‘p odamni ko‘rganda "와, 사람이 정말 많네요" deyiladi. Narxni ko‘rib "모자가 정말 싸네요", issiqni sezib "조금 덥네요", yomg‘irni ko‘rib "비가 많이 오네요", boshqa odamning ovqatlanishini ko‘rib "마리코 씨는 밥을 정말 조금 먹네요" deyiladi. "-다" olib tashlanib, o‘zakka bevosita "-네요" qo‘shiladi: 많다 → 많네요, 싸다 → 싸네요, 오다 → 오네요, 먹다 → 먹네요. "-네요" ㄴ undoshi bilan boshlangani sabab ㅂ istisno bu yerda ishlamaydi: 더워요, lekin 덥네요; 추워요, lekin 춥네요.',
      en: '-네요 is used when the speaker is not merely reporting information, but reacting to something newly noticed through seeing, hearing, tasting or experiencing it. In the textbook, after arriving in Myeongdong and seeing the crowd, the speaker says "와, 사람이 정말 많네요." Other examples include "모자가 정말 싸네요" after noticing the price, "조금 덥네요" when feeling the heat, "비가 많이 오네요" while noticing the rain, and "마리코 씨는 밥을 정말 조금 먹네요" while observing someone eating. Drop -다 and attach -네요 directly to the stem: 많다 → 많네요, 싸다 → 싸네요, 오다 → 오네요, 먹다 → 먹네요. This also connects to the earlier ㅂ irregular. Because -네요 begins with ㄴ, the ㅂ remains: 더워요 but 덥네요; 추워요 but 춥네요. Compared with the relatively neutral -아요/어요 style, -네요 carries more of the speaker’s immediate realization or impression.',
      ru: '-네요 используется не просто для передачи факта, а для реакции на то, что говорящий только что заметил, увидел, услышал, попробовал или почувствовал. В учебнике, увидев толпу в Мёндоне, персонаж говорит "와, 사람이 정말 많네요." Другие примеры: "모자가 정말 싸네요" при взгляде на цену, "조금 덥네요" при ощущении жары, "비가 많이 오네요" при сильном дожде, "마리코 씨는 밥을 정말 조금 먹네요" при наблюдении за человеком. Уберите -다 и добавьте -네요 прямо к основе: 많다 → 많네요, 싸다 → 싸네요, 오다 → 오네요, 먹다 → 먹네요. Это связано с ранее изученным неправильным ㅂ: поскольку -네요 начинается с ㄴ, ㅂ сохраняется. Поэтому 더워요, но 덥네요; 추워요, но 춥네요.',
    },
    conjugationRule: {
      ko: 'A/V 어간 + -네요  ·  많다→많네요 / 싸다→싸네요 / 오다→오네요 / 먹다→먹네요  ·  덥다→덥네요 / 춥다→춥네요',
      uz: 'A/V o‘zagi + -네요  ·  많다→많네요 / 싸다→싸네요 / 오다→오네요 / 먹다→먹네요  ·  덥다→덥네요 / 춥다→춥네요',
      en: 'A/V stem + -네요  ·  많다→많네요 / 싸다→싸네요 / 오다→오네요 / 먹다→먹네요  ·  덥다→덥네요 / 춥다→춥네요',
      ru: 'основа A/V + -네요  ·  많다→많네요 / 싸다→싸네요 / 오다→오네요 / 먹다→먹네요  ·  덥다→덥네요 / 춥다→춥네요',
    },
    conjugations: [
      {
        base: '많다',
        result: '많네요',
      },
      {
        base: '싸다',
        result: '싸네요',
      },
      {
        base: '덥다',
        result: '덥네요',
      },
      {
        base: '춥다',
        result: '춥네요',
      },
      {
        base: '오다',
        result: '오네요',
      },
      {
        base: '먹다',
        result: '먹네요',
      },
      {
        base: '시원하다',
        result: '시원하네요',
      },
      {
        base: '재미있다',
        result: '재미있네요',
      },
      {
        base: '있다',
        result: '있네요',
      },
    ],
    examples: [
      {
        ko: '와, 사람이 정말 많네요.',
        highlight: '많네요',
        gloss: {
          ko: '와, 사람이 정말 많네요.',
          uz: 'Voy, odamlar juda ko‘p ekan.',
          en: 'Wow, there are really a lot of people.',
          ru: 'Ого, здесь действительно много людей.',
        },
      },
      {
        ko: '모자가 정말 싸네요.',
        highlight: '싸네요',
        gloss: {
          ko: '모자가 정말 싸네요.',
          uz: 'Shlyapa juda arzon ekan.',
          en: 'The hat is really cheap.',
          ru: 'Шляпа действительно дешёвая.',
        },
      },
      {
        ko: '네, 조금 덥네요.',
        highlight: '덥네요',
        gloss: {
          ko: '네, 조금 덥네요.',
          uz: 'Ha, biroz issiq ekan.',
          en: 'Yes, it is a little hot.',
          ru: 'Да, немного жарко.',
        },
      },
      {
        ko: '비가 많이 오네요.',
        highlight: '오네요',
        gloss: {
          ko: '비가 많이 오네요.',
          uz: 'Yomg‘ir kuchli yog‘ayapti ekan.',
          en: 'It is raining a lot.',
          ru: 'Дождь идёт очень сильно.',
        },
      },
      {
        ko: '마리코 씨는 밥을 정말 조금 먹네요.',
        highlight: '먹네요',
        gloss: {
          ko: '마리코 씨는 밥을 정말 조금 먹네요.',
          uz: 'Mariko juda oz ovqat yeydi ekan.',
          en: 'Mariko really eats very little.',
          ru: 'Марико действительно очень мало ест.',
        },
      },
      {
        ko: '와, 정말 시원하네요.',
        highlight: '시원하네요',
        gloss: {
          ko: '와, 정말 시원하네요.',
          uz: 'Voy, juda salqin ekan.',
          en: 'Wow, it is really cool and refreshing.',
          ru: 'Ого, здесь действительно прохладно.',
        },
      },
      {
        ko: '네, 아주 재미있네요.',
        highlight: '재미있네요',
        gloss: {
          ko: '네, 아주 재미있네요.',
          uz: 'Ha, juda qiziqarli ekan.',
          en: 'Yes, it is very fun.',
          ru: 'Да, очень интересно.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '여기가 명동이에요.',
        highlight: '명동',
        gloss: {
          ko: '여기가 명동이에요.',
          uz: 'Bu yer Myondon.',
          en: 'This is Myeongdong.',
          ru: 'Это Мёндон.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '와, 사람이 정말 많네요.',
        highlight: '많네요',
        gloss: {
          ko: '와, 사람이 정말 많네요.',
          uz: 'Voy, odamlar juda ko‘p ekan.',
          en: 'Wow, there are really a lot of people.',
          ru: 'Ого, здесь действительно много людей.',
        },
      },
    ],
    similar: {
      pattern: 'A/V-아요/어요',
      note: {
        ko: '"-아요/어요"는 비교적 중립적으로 사실이나 상태를 말하고, "-네요"는 지금 보고 느끼면서 새롭게 알아차린 반응을 나타내요. 예를 들어 "사람이 많아요"는 단순히 사람이 많다는 정보를 전달할 수 있어요. "와, 사람이 많네요"는 실제로 현장에 와서 사람들을 보고 "와, 정말 많구나"라고 느끼는 분위기가 있어요. "날씨가 추워요"와 "날씨가 춥네요"도 기본 상태는 같지만, 뒤 문장은 화자의 즉각적인 느낌이 더 강해요.',
        uz: '"-아요/어요" odatda holatni neytral aytadi, "-네요" esa hozir ko‘rib yoki sezib qolgan taassurotni bildiradi. "사람이 많아요" oddiy ma’lumot. "와, 사람이 많네요" esa shu paytda ko‘p odamni ko‘rib bildirilgan reaksiya.',
        en: '-아요/어요 can neutrally state a fact or condition, while -네요 highlights an immediate realization or impression. 사람이 많아요 can simply report that there are many people. 와, 사람이 많네요 sounds like the speaker has just seen the crowd and is reacting to it. Likewise, 날씨가 추워요 and 날씨가 춥네요 describe the same basic condition, but the latter carries the speaker’s immediate impression.',
        ru: '-아요/어요 может нейтрально сообщать факт или состояние, тогда как -네요 передаёт непосредственное впечатление или только что сделанное наблюдение. 사람이 많아요 просто сообщает, что людей много. 와, 사람이 많네요 звучит как реакция человека, который только что увидел толпу.',
      },
    },
    cautions: [
      {
        ko: '"싸요네요", "먹어요네요"처럼 -아요/어요 뒤에 -네요를 붙이지 않아요. 어간에 바로 붙여서 "싸네요, 먹네요"라고 해요.',
        uz: '"싸요네요", "먹어요네요" deyilmaydi. -네요 bevosita o‘zakka qo‘shiladi: 싸네요, 먹네요.',
        en: 'Do not add -네요 after an already conjugated -아요/어요 form such as 싸요네요 or 먹어요네요. Attach it directly to the stem: 싸네요, 먹네요.',
        ru: 'Не добавляйте -네요 после формы на -아요/어요, например 싸요네요 или 먹어요네요. Правильно присоединять прямо к основе: 싸네요, 먹네요.',
      },
      {
        ko: '덥다와 춥다는 -네요 앞에서 ㅂ 불규칙 변화가 일어나지 않아요. "더우네요, 추우네요"가 아니라 "덥네요, 춥네요"예요.',
        uz: '덥다 va 춥다 -네요 oldida ㅂ ni 우 ga o‘zgartirmaydi. "더우네요, 추우네요" emas, "덥네요, 춥네요".',
        en: '덥다 and 춥다 do not undergo the ㅂ-to-우 change before -네요. Use 덥네요 and 춥네요, not 더우네요 or 추우네요.',
        ru: 'У 덥다 и 춥다 перед -네요 изменение ㅂ → 우 не происходит. Правильно 덥네요 и 춥네요, а не 더우네요 или 추우네요.',
      },
      {
        ko: '-네요를 무조건 "놀랐어요"라고 해석하면 안 돼요. 놀람뿐 아니라 직접 보고 새롭게 알아차린 사실, 감탄, 느낌에도 넓게 사용할 수 있어요.',
        uz: '-네요 ni faqat "hayron bo‘ldim" deb tushunmang. U yangi sezilgan fakt, taassurot yoki hissiyot uchun ham ishlatiladi.',
        en: 'Do not interpret -네요 only as "I am surprised." It can express a broader immediate realization, observation, admiration or feeling.',
        ru: 'Не переводите -네요 только как «я удивлён». Оно шире выражает непосредственное наблюдение, новое осознание, впечатление или чувство.',
      },
      {
        ko: '교재의 흐름처럼 "-네요" 뒤에 상황에 맞는 제안을 이어 말할 수도 있어요. "오늘 날씨가 조금 춥네요. 우리 차 마실까요?"처럼 느낌 → 제안으로 대화가 자연스럽게 이어져요.',
        uz: 'Darslikdagidek -네요 dan keyin vaziyatga mos taklif kelishi mumkin: "오늘 날씨가 조금 춥네요. 우리 차 마실까요?" — taassurot → taklif.',
        en: 'As in the textbook, -네요 can naturally lead into a suggestion: 오늘 날씨가 조금 춥네요. 우리 차 마실까요? The flow is observation → suggestion.',
        ru: 'Как в учебнике, после -네요 естественно может следовать предложение действия: 오늘 날씨가 조금 춥네요. 우리 차 마실까요? Схема: впечатление → предложение.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '많다 + -네요 → ?',
          uz: '많다 + -네요 → ?',
          en: '많다 + -네요 → ?',
          ru: '많다 + -네요 → ?',
        },
        options: [
          {
            text: '많네요',
            correct: true,
          },
          {
            text: '많아요네요',
            correct: false,
          },
          {
            text: '많으네요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '덥다 + -네요 → ?',
          uz: '덥다 + -네요 → ?',
          en: '덥다 + -네요 → ?',
          ru: '덥다 + -네요 → ?',
        },
        options: [
          {
            text: '덥네요',
            correct: true,
          },
          {
            text: '더우네요',
            correct: false,
          },
          {
            text: '더워네요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '명동에 처음 와서 많은 사람을 직접 보고 반응해요.',
          uz: 'Myondonga kelib, ko‘p odamni ko‘rib darhol reaksiya bildiring.',
          en: 'You arrive in Myeongdong, see the crowd and react.',
          ru: 'Вы приезжаете в Мёндон, видите толпу и реагируете.',
        },
        options: [
          {
            text: '와, 사람이 정말 많네요.',
            correct: true,
          },
          {
            text: '와, 사람이 정말 많아요지만.',
            correct: false,
          },
          {
            text: '와, 사람이 정말 많을까요?',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '"사람이 많아요"와 "와, 사람이 많네요"의 차이로 가장 알맞은 것은?',
          uz: 'Ikki gapning farqi haqidagi eng to‘g‘ri izoh qaysi?',
          en: 'Which best explains the difference between 사람이 많아요 and 와, 사람이 많네요?',
          ru: 'Как лучше всего объяснить разницу между 사람이 많아요 и 와, 사람이 많네요?',
        },
        options: [
          {
            text: '많네요는 직접 보고 새롭게 느낀 반응을 더 잘 나타내요',
            correct: true,
          },
          {
            text: '많네요는 항상 과거를 나타내요',
            correct: false,
          },
          {
            text: '많아요는 질문이고 많네요는 명령이에요',
            correct: false,
          },
        ],
      },
      {
        question: {
          ko: '밖을 보니 비가 아주 많이 와요. 그 순간의 느낌으로 자연스러운 문장은?',
          uz: 'Tashqariga qarasangiz kuchli yomg‘ir yog‘moqda. Shu paytdagi tabiiy reaksiya qaysi?',
          en: 'You look outside and notice heavy rain. Which is a natural immediate reaction?',
          ru: 'Вы смотрите на улицу и замечаете сильный дождь. Какая реакция естественнее?',
        },
        options: [
          {
            text: '비가 많이 오네요.',
            correct: true,
          },
          {
            text: '비가 많이 오세요.',
            correct: false,
          },
          {
            text: '비가 많이 올까요 주세요.',
            correct: false,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SECTION 2
  // ═══════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════
  // 섹션 2 · 9과 — 이분은 누구세요?  (코스 섹션 2 / 1B 시작)
  // 소유 → 실력 → 높임(명사) → 높임(동사) 순서.
  // 앞 둘은 문장을 채우는 말이고, 뒤 둘은 그 문장을 통째로 높인다.
  // ═══════════════════════════════════════════════════════════

  // ───────── 섹션 2-1. 소유 N(의) N ─────────
  {
    code: 'poss-ui',
    pattern: 'N(의) N',
    section: 2,
    order: 1,
    isActive: true,
    summary: {
      ko: '누구의 것인지 나타내요. 말할 때는 "의"를 자주 빼요.',
      uz: 'Kimga tegishli ekanini bildiradi. Nutqda "의" ko\'pincha tushiriladi.',
      en: 'Shows whose something is. In speech the 의 is usually dropped.',
      ru: 'Показывает принадлежность. В речи 의 обычно опускают.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '조사', uz: "Qo'shimcha", en: 'Particle', ru: 'Частица' },
    ],
    explanation: {
      ko: '사람 뒤에 "의"를 붙이면 그 사람의 것이 돼요. 받침과 상관없이 모양은 그대로예요. "저의"와 "나의"는 줄여서 "제", "내"라고 쓰는 게 보통이에요. 윗사람 앞에서는 "내"가 아니라 "제"를 써요. 주인을 물을 때는 "누구 N이에요?"라고 해요.',
      uz: 'Odam ortiga "의" qo\'shilsa, o\'shanikiga aylanadi. 받침 ga bog\'liq emas. "저의" va "나의" odatda "제", "내" deb qisqartiriladi. Kattalar oldida "내" emas, "제". Egasini so\'rashda "누구 N이에요?".',
      en: 'Attach 의 to a person and the noun becomes theirs; the form never changes. 저의 and 나의 are normally shortened to 제 and 내, and in front of a senior you must use 제. To ask who owns something, say 누구 N이에요?',
      ru: 'Присоедините 의 к человеку — предмет становится его; форма не меняется. 저의 и 나의 обычно сокращают до 제 и 내, а перед старшим используется 제. Чтобы спросить о владельце: 누구 N이에요?',
    },
    conjugationRule: {
      ko: 'N + 의  ·  저의 → 제  ·  나의 → 내',
      uz: 'N + 의  ·  저의 → 제  ·  나의 → 내',
      en: 'N + 의  ·  저의 → 제  ·  나의 → 내',
      ru: 'N + 의  ·  저의 → 제  ·  나의 → 내',
    },
    conjugations: [
      { base: '지호 씨', result: '지호 씨의' },
      { base: '선생님', result: '선생님의' },
      { base: '저', result: '제' },
      { base: '나', result: '내' },
    ],
    examples: [
      {
        ko: '이거는 지호 씨의 가방이에요.',
        highlight: '씨의',
        gloss: {
          ko: '이거는 지호 씨의 가방이에요.',
          uz: 'Bu Jihoning sumkasi.',
          en: "This is Jiho's bag.",
          ru: 'Это сумка Чихо.',
        },
      },
      {
        ko: '제 책이에요.',
        highlight: '제',
        gloss: {
          ko: '제 책이에요.',
          uz: 'Bu mening kitobim.',
          en: 'It is my book.',
          ru: 'Это моя книга.',
        },
      },
      {
        ko: '이 사람은 내 친구예요.',
        highlight: '내',
        gloss: {
          ko: '이 사람은 내 친구예요.',
          uz: "Bu mening do'stim.",
          en: 'This is my friend.',
          ru: 'Это мой друг.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이거는 누구 우산이에요?',
        highlight: '누구',
        gloss: {
          ko: '이거는 누구 우산이에요?',
          uz: 'Bu kimning soyaboni?',
          en: 'Whose umbrella is this?',
          ru: 'Чей это зонт?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '제 우산이에요.',
        highlight: '제',
        gloss: {
          ko: '제 우산이에요.',
          uz: 'Bu mening soyabonim.',
          en: 'It is my umbrella.',
          ru: 'Это мой зонт.',
        },
      },
    ],
    similar: {
      pattern: '누구',
      note: {
        ko: '주인을 물을 때는 "의"를 빼고 "누구 가방이에요?"라고 해요. 사람에게는 "누구", 물건에게는 "뭐"를 써요.',
        uz: 'Egasini so\'raganda "의" tushiriladi: "누구 가방이에요?". Odam uchun "누구", narsa uchun "뭐".',
        en: 'When asking about an owner you drop 의: 누구 가방이에요? Use 누구 for people and 뭐 for things.',
        ru: 'Спрашивая о владельце, 의 опускают: 누구 가방이에요? Для людей — 누구, для вещей — 뭐.',
      },
    },
    cautions: [
      {
        ko: '선생님이나 윗사람 앞에서는 "내"가 아니라 "제"예요. "선생님, 내 이름은…"은 무례하게 들려요.',
        uz: 'O\'qituvchi yoki kattalar oldida "내" emas, "제". "선생님, 내 이름은…" qo\'pol eshitiladi.',
        en: 'In front of a teacher or any senior it must be 제, not 내. 선생님, 내 이름은… sounds rude.',
        ru: 'Перед учителем или старшим — только 제, не 내. 선생님, 내 이름은… звучит грубо.',
      },
      {
        ko: '"저의 책"도 틀린 말은 아니지만 말할 때는 거의 언제나 "제 책"이라고 해요.',
        uz: '"저의 책" xato emas, lekin nutqda deyarli doim "제 책" deyiladi.',
        en: '저의 책 is not wrong, but in speech people almost always say 제 책.',
        ru: '저의 책 не ошибка, но в речи почти всегда говорят 제 책.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '이거는 지호 씨___ 가방이에요.',
          uz: '이거는 지호 씨___ 가방이에요.',
          en: '이거는 지호 씨___ 가방이에요.',
          ru: '이거는 지호 씨___ 가방이에요.',
        },
        options: [
          { text: '의', correct: true },
          { text: '를', correct: false },
          { text: '에', correct: false },
        ],
      },
      {
        question: {
          ko: '"저의"를 줄이면?',
          uz: '"저의" qisqartmasi?',
          en: 'What is the short form of 저의?',
          ru: 'Как сокращается 저의?',
        },
        options: [
          { text: '제', correct: true },
          { text: '내', correct: false },
          { text: '저', correct: false },
        ],
      },
      {
        question: {
          ko: '"나의"를 줄이면?',
          uz: '"나의" qisqartmasi?',
          en: 'What is the short form of 나의?',
          ru: 'Как сокращается 나의?',
        },
        options: [
          { text: '내', correct: true },
          { text: '제', correct: false },
          { text: '나', correct: false },
        ],
      },
      {
        question: {
          ko: '선생님, ___ 이름은 김하윤이에요.',
          uz: '선생님, ___ 이름은 김하윤이에요.',
          en: '선생님, ___ 이름은 김하윤이에요.',
          ru: '선생님, ___ 이름은 김하윤이에요.',
        },
        options: [
          { text: '내', correct: false },
          { text: '제', correct: true },
          { text: '나', correct: false },
        ],
      },
      {
        question: {
          ko: '저 사람은 ___예요?',
          uz: '저 사람은 ___예요?',
          en: '저 사람은 ___예요?',
          ru: '저 사람은 ___예요?',
        },
        options: [
          { text: '뭐', correct: false },
          { text: '누구', correct: true },
          { text: '어디', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 2-2. 실력 N을/를 잘하다 ─────────
  {
    code: 'skill-jalhada',
    pattern: 'N을/를 잘하다[잘 못하다, 못하다]',
    section: 2,
    order: 2,
    isActive: true,
    summary: {
      ko: '무엇을 얼마나 잘하는지 세 단계로 말해요. 잘해요 → 잘 못해요 → 못해요.',
      uz: 'Mahoratni uch daraja bilan aytish: 잘해요 → 잘 못해요 → 못해요.',
      en: 'Says how well you do something on three levels: 잘해요 → 잘 못해요 → 못해요.',
      ru: 'Три уровня умения: 잘해요 → 잘 못해요 → 못해요.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '표현', uz: 'Ibora', en: 'Expression', ru: 'Выражение' },
    ],
    explanation: {
      ko: '"잘해요"는 잘한다는 뜻, "잘 못해요"는 조금 부족하다는 뜻, "못해요"는 전혀 안 된다는 뜻이에요. 앞에 오는 명사에는 "을/를"이 붙어요. 받침이 있으면 "을", 없으면 "를"이에요. 무엇을 잘하는지 물을 때는 "뭐를 잘해요?"라고 해요.',
      uz: '"잘해요" — yaxshi bilaman, "잘 못해요" — unchalik emas, "못해요" — umuman. Oldingi otga "을/를" qo\'shiladi: undosh bo\'lsa "을", bo\'lmasa "를". So\'rash uchun "뭐를 잘해요?".',
      en: '잘해요 means good, 잘 못해요 means not very good, and 못해요 means not at all. The noun before it takes 을/를 — 을 after a consonant, 를 after a vowel. To ask, say 뭐를 잘해요?',
      ru: '잘해요 — хорошо, 잘 못해요 — не очень, 못해요 — совсем нет. К существительному добавляется 을/를: 을 после согласного, 를 после гласной. Вопрос: 뭐를 잘해요?',
    },
    conjugationRule: {
      ko: 'N을/를 + 잘해요 / 잘 못해요 / 못해요',
      uz: 'N을/를 + 잘해요 / 잘 못해요 / 못해요',
      en: 'N을/를 + 잘해요 / 잘 못해요 / 못해요',
      ru: 'N을/를 + 잘해요 / 잘 못해요 / 못해요',
    },
    conjugations: [
      { base: '요리', result: '요리를 잘해요' },
      { base: '노래', result: '노래를 잘해요' },
      { base: '운전', result: '운전을 잘 못해요' },
      { base: '수영', result: '수영을 못해요' },
    ],
    examples: [
      {
        ko: '마리코 씨는 요리를 잘해요.',
        highlight: '잘해요',
        gloss: {
          ko: '마리코 씨는 요리를 잘해요.',
          uz: 'Mariko yaxshi ovqat pishiradi.',
          en: 'Mariko is good at cooking.',
          ru: 'Марико хорошо готовит.',
        },
      },
      {
        ko: '저는 운전을 잘 못해요.',
        highlight: '잘 못해요',
        gloss: {
          ko: '저는 운전을 잘 못해요.',
          uz: 'Men haydashni unchalik yaxshi bilmayman.',
          en: 'I am not very good at driving.',
          ru: 'Я не очень хорошо вожу.',
        },
      },
      {
        ko: '저는 수영을 못해요.',
        highlight: '못해요',
        gloss: {
          ko: '저는 수영을 못해요.',
          uz: 'Men suza olmayman.',
          en: 'I cannot swim.',
          ru: 'Я не умею плавать.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '한국말을 잘해요?',
        highlight: '잘해요',
        gloss: {
          ko: '한국말을 잘해요?',
          uz: 'Koreyschani yaxshi bilasizmi?',
          en: 'Are you good at Korean?',
          ru: 'Вы хорошо говорите по-корейски?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아니요, 잘 못해요.',
        highlight: '잘 못해요',
        gloss: {
          ko: '아니요, 잘 못해요.',
          uz: "Yo'q, unchalik yaxshi emas.",
          en: 'No, not very well.',
          ru: 'Нет, не очень хорошо.',
        },
      },
    ],
    similar: {
      pattern: '안 V',
      note: {
        ko: '"안"은 하지 않는다는 뜻이고 "못"은 하려고 해도 안 된다는 뜻이에요. "운동 안 해요"는 일부러 안 하는 것, "수영을 못해요"는 할 줄 모르는 것이에요.',
        uz: '"안" — qilmayman, "못" — qila olmayman. "운동 안 해요" — atay qilmaslik, "수영을 못해요" — bilmaslik.',
        en: '안 means you choose not to; 못 means you are unable. 운동 안 해요 is a choice, 수영을 못해요 is a lack of ability.',
        ru: '안 — не хочу, 못 — не могу. 운동 안 해요 — выбор, 수영을 못해요 — неумение.',
      },
    },
    cautions: [
      {
        ko: '"못해요"는 글자 그대로 읽지 않고 [모태요]로 소리 나요. "못"의 받침 ㅅ 과 "해"가 만나서 거센소리가 돼요.',
        uz: '"못해요" [모태요] bo\'lib eshitiladi: "못" dagi ㅅ va "해" birikib qattiq tovush beradi.',
        en: '못해요 is pronounced [모태요] — the final ㅅ of 못 merges with 해 into an aspirated sound.',
        ru: '못해요 произносится [모태요]: конечный ㅅ в 못 сливается с 해 в придыхательный звук.',
      },
      {
        ko: '"잘 못해요"는 띄어 써요. 붙여서 "잘못해요"라고 쓰면 "실수해요"라는 다른 뜻이 돼요.',
        uz: '"잘 못해요" ajratib yoziladi. Qo\'shib "잘못해요" yozilsa, "xato qilaman" degan boshqa ma\'no chiqadi.',
        en: 'Write 잘 못해요 with a space. Joined as 잘못해요 it means "I make mistakes" — a different word.',
        ru: '잘 못해요 пишется раздельно. Слитное 잘못해요 значит «ошибаюсь» — другое слово.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '저는 요리___ 잘해요.',
          uz: '저는 요리___ 잘해요.',
          en: '저는 요리___ 잘해요.',
          ru: '저는 요리___ 잘해요.',
        },
        options: [
          { text: '를', correct: true },
          { text: '을', correct: false },
          { text: '이', correct: false },
        ],
      },
      {
        question: {
          ko: '저는 수영___ 못해요.',
          uz: '저는 수영___ 못해요.',
          en: '저는 수영___ 못해요.',
          ru: '저는 수영___ 못해요.',
        },
        options: [
          { text: '을', correct: true },
          { text: '를', correct: false },
          { text: '가', correct: false },
        ],
      },
      {
        question: {
          ko: '한국말을 잘해요? — 아니요, ___.',
          uz: '한국말을 잘해요? — 아니요, ___.',
          en: '한국말을 잘해요? — 아니요, ___.',
          ru: '한국말을 잘해요? — 아니요, ___.',
        },
        options: [
          { text: '잘해요', correct: false },
          { text: '잘 못해요', correct: true },
          { text: '좋아해요', correct: false },
        ],
      },
      {
        question: {
          ko: '전혀 할 줄 모를 때 쓰는 말은?',
          uz: 'Umuman bilmaganda qaysi shakl ishlatiladi?',
          en: 'Which form means you cannot do it at all?',
          ru: 'Какая форма значит «совсем не умею»?',
        },
        options: [
          { text: '못해요', correct: true },
          { text: '잘 못해요', correct: false },
          { text: '잘해요', correct: false },
        ],
      },
      {
        question: {
          ko: '지호 씨는 요리사예요. 요리를 ___.',
          uz: '지호 씨는 요리사예요. 요리를 ___.',
          en: '지호 씨는 요리사예요. 요리를 ___.',
          ru: '지호 씨는 요리사예요. 요리를 ___.',
        },
        options: [
          { text: '못해요', correct: false },
          { text: '잘해요', correct: true },
          { text: '안 해요', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 2-3. 높임 N(이)세요 ─────────
  {
    code: 'honor-iseyo',
    pattern: 'N(이)세요',
    section: 2,
    order: 3,
    isActive: true,
    summary: {
      ko: '윗사람을 가리키거나 소개할 때 "이에요/예요" 대신 쓰는 높임 표현이에요.',
      uz: 'Kattalarni ko\'rsatish yoki tanishtirishda "이에요/예요" o\'rniga ishlatiladigan hurmat shakli.',
      en: 'The polite replacement for 이에요/예요 when pointing at or introducing a senior.',
      ru: 'Вежливая замена 이에요/예요 при указании на старшего или его представлении.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '높임말', uz: 'Hurmat', en: 'Honorific', ru: 'Вежливость' },
    ],
    explanation: {
      ko: '앞 글자에 받침이 있으면 "이세요", 없으면 "세요"를 붙여요. "이에요/예요"와 규칙이 같고 높임만 더해진 모양이에요. 윗사람을 가리킬 때는 "이 사람"이 아니라 "이분"을 쓰고, 뒤도 "-세요"로 맞춰요. 동생이나 자식처럼 아랫사람에게는 쓰지 않아요.',
      uz: 'Oldingi bo\'g\'inda undosh bo\'lsa "이세요", bo\'lmasa "세요". Qoida "이에요/예요" bilan bir xil, faqat hurmat qo\'shiladi. Kattani ko\'rsatganda "이 사람" emas, "이분" ishlatiladi. Kichiklarga ishlatilmaydi.',
      en: 'Add 이세요 after a final consonant and 세요 without one — the same rule as 이에요/예요, just with respect added. Point at a senior with 이분 rather than 이 사람, and never use it for someone junior to you.',
      ru: 'После согласного — 이세요, без него — 세요; правило то же, что у 이에요/예요, только вежливее. На старшего указывают через 이분, а не 이 사람; к младшим не применяется.',
    },
    conjugationRule: {
      ko: '받침 O + 이세요  ·  받침 X + 세요',
      uz: "받침 bor + 이세요  ·  받침 yo'q + 세요",
      en: 'final consonant + 이세요  ·  no final consonant + 세요',
      ru: 'есть согласный + 이세요  ·  нет + 세요',
    },
    conjugations: [
      { base: '선생님', result: '선생님이세요' },
      { base: '회사원', result: '회사원이세요' },
      { base: '어머니', result: '어머니세요' },
      { base: '의사', result: '의사세요' },
    ],
    examples: [
      {
        ko: '이분은 우리 어머니세요.',
        highlight: '어머니세요',
        gloss: {
          ko: '이분은 우리 어머니세요.',
          uz: 'Bu kishi mening onam.',
          en: 'This is my mother.',
          ru: 'Это моя мама.',
        },
      },
      {
        ko: '아버지는 회사원이세요.',
        highlight: '회사원이세요',
        gloss: {
          ko: '아버지는 회사원이세요.',
          uz: 'Otam xodim.',
          en: 'My father is an office worker.',
          ru: 'Мой отец служащий.',
        },
      },
      {
        ko: '이분은 우리 선생님이세요.',
        highlight: '선생님이세요',
        gloss: {
          ko: '이분은 우리 선생님이세요.',
          uz: "Bu kishi bizning o'qituvchimiz.",
          en: 'This is our teacher.',
          ru: 'Это наш учитель.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이분은 누구세요?',
        highlight: '누구세요',
        gloss: {
          ko: '이분은 누구세요?',
          uz: 'Bu kishi kim?',
          en: 'Who is this person?',
          ru: 'Кто это?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '우리 아버지세요.',
        highlight: '아버지세요',
        gloss: {
          ko: '우리 아버지세요.',
          uz: 'Bu mening otam.',
          en: 'He is my father.',
          ru: 'Это мой отец.',
        },
      },
    ],
    similar: {
      pattern: 'N이에요/예요',
      note: {
        ko: '뜻은 같고 높임만 달라요. 친구에게는 "제 친구예요", 선생님을 가리킬 때는 "우리 선생님이세요"라고 해요.',
        uz: 'Ma\'no bir xil, faqat hurmat farq qiladi. Do\'st haqida "제 친구예요", o\'qituvchi haqida "우리 선생님이세요".',
        en: 'Same meaning, different politeness. For a friend you say 제 친구예요; for a teacher, 우리 선생님이세요.',
        ru: 'Смысл тот же, разница в вежливости. О друге — 제 친구예요, об учителе — 우리 선생님이세요.',
      },
    },
    cautions: [
      {
        ko: '동생이나 자식에게는 쓰지 않아요. "우리 딸이세요", "제 동생이세요"는 틀린 말이에요.',
        uz: 'Ini yoki farzandga ishlatilmaydi. "우리 딸이세요", "제 동생이세요" noto\'g\'ri.',
        en: 'Never use it for a younger sibling or your own child. 우리 딸이세요 and 제 동생이세요 are wrong.',
        ru: 'Не используется для младших и своих детей. 우리 딸이세요 и 제 동생이세요 — ошибка.',
      },
      {
        ko: '"이분"으로 가리켰으면 뒤도 반드시 높여요. "이분은 우리 어머니예요"는 앞뒤가 어긋나요.',
        uz: '"이분" bilan ko\'rsatilsa, oxiri ham hurmatli bo\'lishi shart. "이분은 우리 어머니예요" mos kelmaydi.',
        en: 'If you point with 이분, the ending must be honorific too. 이분은 우리 어머니예요 clashes with itself.',
        ru: 'Если указали через 이분, окончание тоже должно быть вежливым. 이분은 우리 어머니예요 противоречиво.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '이분은 우리 어머니___.',
          uz: '이분은 우리 어머니___.',
          en: '이분은 우리 어머니___.',
          ru: '이분은 우리 어머니___.',
        },
        options: [
          { text: '세요', correct: true },
          { text: '이세요', correct: false },
          { text: '예요', correct: false },
        ],
      },
      {
        question: {
          ko: '아버지는 회사원___.',
          uz: '아버지는 회사원___.',
          en: '아버지는 회사원___.',
          ru: '아버지는 회사원___.',
        },
        options: [
          { text: '이세요', correct: true },
          { text: '세요', correct: false },
          { text: '이에요', correct: false },
        ],
      },
      {
        question: {
          ko: '이분은 의사___.',
          uz: '이분은 의사___.',
          en: '이분은 의사___.',
          ru: '이분은 의사___.',
        },
        options: [
          { text: '이세요', correct: false },
          { text: '세요', correct: true },
          { text: '예요', correct: false },
        ],
      },
      {
        question: {
          ko: '우리 할머니는 선생님___.',
          uz: '우리 할머니는 선생님___.',
          en: '우리 할머니는 선생님___.',
          ru: '우리 할머니는 선생님___.',
        },
        options: [
          { text: '세요', correct: false },
          { text: '이세요', correct: true },
          { text: '이에요', correct: false },
        ],
      },
      {
        question: {
          ko: '어머니가 미인___.',
          uz: '어머니가 미인___.',
          en: '어머니가 미인___.',
          ru: '어머니가 미인___.',
        },
        options: [
          { text: '이세요', correct: true },
          { text: '세요', correct: false },
          { text: '이에요', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 2-4. 높임 A/V-(으)시- ─────────
  {
    code: 'honor-usi',
    pattern: 'A/V-(으)시-',
    section: 2,
    order: 4,
    isActive: true,
    summary: {
      ko: '동사와 형용사를 높이는 어미예요. 주어가 윗사람이면 여기에도 높임을 넣어요.',
      uz: "Fe'l va sifatni hurmatlaydigan qo'shimcha. Ega katta bo'lsa, bu yerga ham hurmat qo'yiladi.",
      en: 'The ending that makes a verb or adjective honorific. If the subject is a senior, the verb takes it too.',
      ru: 'Окончание, делающее глагол или прилагательное вежливым. Если подлежащее — старший, глагол тоже вежливый.',
    },
    tags: [
      { ko: '초급', uz: "Boshlang'ich", en: 'Beginner', ru: 'Начальный' },
      { ko: '높임말', uz: 'Hurmat', en: 'Honorific', ru: 'Вежливость' },
    ],
    explanation: {
      ko: '"-다"를 뗀 부분에 받침이 없으면 "-세요", 있으면 "-으세요"를 붙여요. 지난 일은 "세"가 "셨"으로 바뀌어 "-셨어요 / -으셨어요"가 돼요. 명사에 붙는 "N(이)세요"와 같은 "세요"지만, 이쪽은 동사와 형용사에 붙어요.',
      uz: '"-다" olib tashlangan qismda undosh bo\'lmasa "-세요", bo\'lsa "-으세요". O\'tgan zamonda "세" → "셨": "-셨어요 / -으셨어요". Otga qo\'shiladigan "N(이)세요" bilan bir xil "세요", lekin bu fe\'l va sifatga qo\'shiladi.',
      en: 'Drop -다: if no final consonant remains, add -세요; if there is one, add -으세요. In the past 세 becomes 셨, giving -셨어요 / -으셨어요. It is the same 세요 you meet in N(이)세요, but attached to verbs and adjectives.',
      ru: 'Уберите -다: без конечного согласного — -세요, с ним — -으세요. В прошедшем 세 меняется на 셨: -셨어요 / -으셨어요. Это то же 세요, что и в N(이)세요, но при глаголах и прилагательных.',
    },
    conjugationRule: {
      ko: '받침 X + 세요  ·  받침 O + 으세요  ·  과거 셨어요 / 으셨어요',
      uz: "받침 yo'q + 세요  ·  받침 bor + 으세요  ·  o'tgan 셨어요 / 으셨어요",
      en: 'no final consonant + 세요  ·  final consonant + 으세요  ·  past 셨어요 / 으셨어요',
      ru: 'нет согласного + 세요  ·  есть + 으세요  ·  прошедшее 셨어요 / 으셨어요',
    },
    conjugations: [
      { base: '가다', result: '가세요' },
      { base: '다니다', result: '다니세요' },
      { base: '친절하다', result: '친절하세요' },
      { base: '읽다', result: '읽으세요' },
      { base: '많다', result: '많으세요' },
      { base: '멋있다', result: '멋있으세요' },
    ],
    examples: [
      {
        ko: '김 선생님은 친절하세요.',
        highlight: '친절하세요',
        gloss: {
          ko: '김 선생님은 친절하세요.',
          uz: "Kim o'qituvchi mehribon.",
          en: 'Teacher Kim is kind.',
          ru: 'Учитель Ким добрый.',
        },
      },
      {
        ko: '할머니는 친구가 많으세요.',
        highlight: '많으세요',
        gloss: {
          ko: '할머니는 친구가 많으세요.',
          uz: "Buvimning do'stlari ko'p.",
          en: 'My grandmother has many friends.',
          ru: 'У бабушки много друзей.',
        },
      },
      {
        ko: '아버지는 어제 회사에 가셨어요.',
        highlight: '가셨어요',
        gloss: {
          ko: '아버지는 어제 회사에 가셨어요.',
          uz: 'Otam kecha ishga bordilar.',
          en: 'My father went to the company yesterday.',
          ru: 'Отец вчера ходил на работу.',
        },
      },
    ],
    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '김 선생님은 지금 뭐 하세요?',
        highlight: '하세요',
        gloss: {
          ko: '김 선생님은 지금 뭐 하세요?',
          uz: "Kim o'qituvchi hozir nima qilyaptilar?",
          en: 'What is Teacher Kim doing now?',
          ru: 'Что сейчас делает учитель Ким?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '책을 읽으세요.',
        highlight: '읽으세요',
        gloss: {
          ko: '책을 읽으세요.',
          uz: "Kitob o'qiyaptilar.",
          en: 'He is reading a book.',
          ru: 'Он читает книгу.',
        },
      },
    ],
    similar: {
      pattern: '계시다 · 드시다 · 주무시다',
      note: {
        ko: '몇몇 동사는 "-(으)시-"를 붙이지 않고 단어 자체가 바뀌어요. 있다→계시다, 먹다·마시다→드시다, 자다→주무시다. 이 셋은 규칙보다 우선해요.',
        uz: "Ba'zi fe'llarga \"-(으)시-\" qo'shilmaydi, so'zning o'zi o'zgaradi: 있다→계시다, 먹다·마시다→드시다, 자다→주무시다. Bu uchtasi qoidadan ustun.",
        en: 'A few verbs replace the word entirely instead of taking -(으)시-: 있다→계시다, 먹다·마시다→드시다, 자다→주무시다. These override the rule.',
        ru: 'Некоторые глаголы заменяются целиком вместо -(으)시-: 있다→계시다, 먹다·마시다→드시다, 자다→주무시다. Они важнее правила.',
      },
    },
    cautions: [
      {
        ko: '있다·먹다·자다에는 "있으세요·먹으세요·자세요"를 쓰지 않아요. "계세요·드세요·주무세요"가 맞아요.',
        uz: '있다·먹다·자다 uchun "있으세요·먹으세요·자세요" ishlatilmaydi — "계세요·드세요·주무세요" to\'g\'ri.',
        en: 'Do not say 있으세요, 먹으세요 or 자세요 for those verbs — use 계세요, 드세요 and 주무세요.',
        ru: 'Не говорите 있으세요, 먹으세요 или 자세요 — правильно 계세요, 드세요, 주무세요.',
      },
      {
        ko: '나 자신에게는 쓰지 않아요. "저는 학교에 가세요"는 틀리고 "저는 학교에 가요"가 맞아요.',
        uz: "O'zingizga ishlatmaysiz. \"저는 학교에 가세요\" noto'g'ri, \"저는 학교에 가요\" to'g'ri.",
        en: 'Never use it about yourself. 저는 학교에 가세요 is wrong; 저는 학교에 가요 is right.',
        ru: 'Не применяйте к себе. 저는 학교에 가세요 неверно, верно 저는 학교에 가요.',
      },
      {
        ko: '내 아버지·어머니라도 남에게 말할 때 높여요. "아버지는 회사에 다니세요"가 자연스러워요.',
        uz: 'O\'z ota-onangiz haqida boshqalarga gapirganda ham hurmat saqlanadi: "아버지는 회사에 다니세요".',
        en: 'Even about your own parents you keep the honorific when speaking to others: 아버지는 회사에 다니세요.',
        ru: 'Даже о своих родителях в разговоре с другими сохраняют вежливость: 아버지는 회사에 다니세요.',
      },
    ],
    quiz: [
      {
        question: {
          ko: '가다 → 할머니가 ___.',
          uz: '가다 → 할머니가 ___.',
          en: '가다 → 할머니가 ___.',
          ru: '가다 → 할머니가 ___.',
        },
        options: [
          { text: '가으세요', correct: false },
          { text: '가세요', correct: true },
          { text: '가시요', correct: false },
        ],
      },
      {
        question: {
          ko: '읽다 → 아버지는 책을 ___.',
          uz: '읽다 → 아버지는 책을 ___.',
          en: '읽다 → 아버지는 책을 ___.',
          ru: '읽다 → 아버지는 책을 ___.',
        },
        options: [
          { text: '읽세요', correct: false },
          { text: '읽으세요', correct: true },
          { text: '읽이세요', correct: false },
        ],
      },
      {
        question: {
          ko: '할머니는 친구가 ___.',
          uz: '할머니는 친구가 ___.',
          en: '할머니는 친구가 ___.',
          ru: '할머니는 친구가 ___.',
        },
        options: [
          { text: '많아요', correct: false },
          { text: '많으세요', correct: true },
          { text: '많세요', correct: false },
        ],
      },
      {
        question: {
          ko: '"가세요"의 지난 일은?',
          uz: '"가세요" ning o\'tgan zamoni?',
          en: 'What is the past form of 가세요?',
          ru: 'Какая прошедшая форма от 가세요?',
        },
        options: [
          { text: '가셨어요', correct: true },
          { text: '가세었어요', correct: false },
          { text: '가았어요', correct: false },
        ],
      },
      {
        question: {
          ko: '"자다"를 높이면?',
          uz: '"자다" ning hurmatli shakli?',
          en: 'What is the honorific of 자다?',
          ru: 'Какая вежливая форма у 자다?',
        },
        options: [
          { text: '자세요', correct: false },
          { text: '주무세요', correct: true },
          { text: '자으세요', correct: false },
        ],
      },
    ],
  },
];
