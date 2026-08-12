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
        uz: "Ma'nosi bir xil, faqat vaziyat farq qiladi. Do'st va kundalik — \"이에요/예요\"; ish, taqdimot, rasmiy uchrashuv — \"입니다\".",
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
      uz: '받침 bor-yo\'qligidan qat\'i nazar doim "입니다". 은/는 yoki 이에요/예요 dan farqli, shakli o\'zgarmaydi. Savolda "입니까?" bo\'ladi va oxiri ko\'tariladi.',
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
        uz: "Ma'nosi bir xil. Suhbatdosh \"-습니다\" ishlatsa siz ham \"입니다\"; do'stlar orasida \"이에요/예요\".",
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
        uz: "Xuddi shu inkor, lekin muloyimroq. Do'st va kundalikda \"아니에요\", rasmiy joyda \"아닙니다\".",
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

  // ───────── 섹션 2-1. 과거 -았/었어요 ─────────
  {
    code: 'past-asseoyo',
    pattern: '-았/었어요',
    section: 2,
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
    section: 2,
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
    section: 2,
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
