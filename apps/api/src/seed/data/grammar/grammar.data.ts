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
