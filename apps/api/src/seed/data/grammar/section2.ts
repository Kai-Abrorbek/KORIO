// ═══════════════════════════════════════════════════════════
// SECTION 2
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
// 섹션 2 · 9과 — 이분은 누구세요?  (코스 섹션 2 / 1B 시작)
// 소유 → 실력 → 높임(명사) → 높임(동사) 순서.
// 앞 둘은 문장을 채우는 말이고, 뒤 둘은 그 문장을 통째로 높인다.
// ═══════════════════════════════════════════════════════════

export const GRAMMAR_SEED_S2: any[] = [
  // ───────── 섹션 2-1. 소유·관계 N(의) N ─────────
  {
    code: 'possessive-ui',
    pattern: 'N(의) N',
    section: 2,
    unit: 1,
    order: 1,
    isActive: true,

    summary: {
      ko: '앞의 명사가 뒤의 명사와 어떤 관계인지 나타내요. 소유, 가족 관계, 소속, 장소, 종류 등을 표현할 때 쓰며, 일상 대화에서는 "의"를 자주 생략해요.',
      uz: 'Birinchi ot ikkinchi ot bilan qanday bog‘langanini ko‘rsatadi. Egalik, oila munosabati, tegishlilik, joy yoki tur kabi ma’nolarni bildiradi. Kundalik nutqda "의" ko‘pincha tushirib qoldiriladi.',
      en: 'Shows the relationship between two nouns. It can express possession, family relationships, affiliation, place, or type. In everyday speech, 의 is often omitted.',
      ru: 'Показывает связь между двумя существительными: принадлежность, семейные отношения, организацию, место или тип. В разговорной речи 의 часто опускается.',
    },

    tags: [
      {
        ko: '초급',
        uz: 'Boshlang‘ich',
        en: 'Beginner',
        ru: 'Начальный',
      },
      {
        ko: '소유·관계',
        uz: 'Egalik va munosabat',
        en: 'Possession & relation',
        ru: 'Принадлежность и связь',
      },
      {
        ko: '조사',
        uz: 'Ko‘makchi',
        en: 'Particle',
        ru: 'Частица',
      },
    ],

    explanation: {
      ko: '"N1의 N2"에서 N1은 N2의 주인, 소속, 관계, 종류 등을 설명해요. 영어의 "\'s"나 "of", 우즈베크어의 소유 관계, 러시아어의 родительный падеж과 비슷한 역할을 해요. 예를 들어 "민수의 가방"은 민수와 가방 사이의 소유 관계를 나타내고, "한국의 음식"은 한국과 음식의 관련성을 나타내요. 가족이나 친구처럼 관계가 분명하거나 자주 함께 쓰는 표현에서는 "의"를 생략하는 경우가 아주 많아요. 그래서 실제 대화에서는 "우리의 가족"보다 "우리 가족", "학교의 친구"보다 "학교 친구"가 자연스러울 수 있어요. 또한 "나의, 저의, 너의"는 일상적으로 각각 "내, 제, 네"로 줄여서 많이 사용해요.',
      uz: '"N1의 N2" shaklida N1 ikkinchi otning egasi, tegishliligi, aloqasi yoki turini tushuntiradi. Bu o‘zbek tilidagi egalik munosabatiga o‘xshaydi. Masalan, "민수의 가방" — Minsuning sumkasi, "한국의 음식" esa Koreyaga oid taom degan ma’noni bildiradi. Oila, do‘stlik yoki kundalik hayotda tez-tez ishlatiladigan birikmalarda "의" ko‘pincha aytilmaydi. Shuning uchun "우리 가족" kabi shakllar juda tabiiy. "나의, 저의, 너의" shakllari esa kundalik nutqda ko‘pincha "내, 제, 네" tarzida qisqaradi.',
      en: 'In "N1의 N2", N1 describes the owner, affiliation, relationship, origin, or type of N2. It works somewhat like "\'s" or "of" in English. For example, "민수의 가방" means Minsu\'s bag, while "한국의 음식" means food associated with Korea. When the relationship is obvious or the combination is commonly used, 의 is frequently omitted in natural conversation. Expressions such as "우리 가족" are therefore more common than "우리의 가족". The pronoun forms 나의, 저의, and 너의 are also commonly contracted to 내, 제, and 네.',
      ru: 'В конструкции "N1의 N2" первое существительное описывает владельца, принадлежность, связь, происхождение или вид второго существительного. По функции это часто похоже на родительный падеж в русском языке. Например, "민수의 가방" означает «сумка Минсу», а "한국의 음식" — «корейская еда / еда Кореи». Если связь очевидна или сочетание употребляется очень часто, в разговорной речи 의 обычно опускается. Поэтому "우리 가족" звучит естественнее, чем "우리의 가족". Формы 나의, 저의 и 너의 также обычно сокращаются до 내, 제 и 네.',
    },

    conjugationRule: {
      ko: '명사1 + 의 + 명사2 → N1의 N2  ·  나의 → 내  ·  저의 → 제  ·  너의 → 네  ·  친숙한 관계나 자주 쓰는 표현에서는 의 생략 가능',
      uz: 'Ot1 + 의 + Ot2 → N1의 N2  ·  나의 → 내  ·  저의 → 제  ·  너의 → 네  ·  yaqin yoki odatiy birikmalarda 의 tushirilishi mumkin',
      en: 'Noun 1 + 의 + Noun 2 → N1의 N2  ·  나의 → 내  ·  저의 → 제  ·  너의 → 네  ·  의 may be omitted in familiar or common noun combinations',
      ru: 'Сущ.1 + 의 + Сущ.2 → N1의 N2  ·  나의 → 내  ·  저의 → 제  ·  너의 → 네  ·  в привычных сочетаниях 의 может опускаться',
    },

    conjugations: [
      {
        base: '민수 + 가방',
        result: '민수의 가방',
      },
      {
        base: '친구 + 책',
        result: '친구의 책',
      },
      {
        base: '선생님 + 이름',
        result: '선생님의 이름',
      },
      {
        base: '한국 + 음식',
        result: '한국의 음식',
      },
      {
        base: '회사 + 사장님',
        result: '회사의 사장님',
      },
      {
        base: '나의 가족',
        result: '내 가족',
      },
      {
        base: '나의 친구',
        result: '내 친구',
      },
      {
        base: '저의 이름',
        result: '제 이름',
      },
      {
        base: '저의 부모님',
        result: '제 부모님',
      },
      {
        base: '너의 가방',
        result: '네 가방',
      },
    ],

    examples: [
      {
        ko: '이것은 민수의 가방이에요.',
        highlight: '민수의 가방',
        gloss: {
          ko: '이것은 민수의 가방이에요.',
          uz: 'Bu Minsuning sumkasi.',
          en: "This is Minsu's bag.",
          ru: 'Это сумка Минсу.',
        },
      },
      {
        ko: '제 이름은 아브로르예요.',
        highlight: '제 이름',
        gloss: {
          ko: '제 이름은 아브로르예요.',
          uz: 'Mening ismim Abror.',
          en: 'My name is Abror.',
          ru: 'Меня зовут Аброр.',
        },
      },
      {
        ko: '제 가족은 다섯 명이에요.',
        highlight: '제 가족',
        gloss: {
          ko: '제 가족은 다섯 명이에요.',
          uz: 'Mening oilamda besh kishi bor.',
          en: 'There are five people in my family.',
          ru: 'В моей семье пять человек.',
        },
      },
      {
        ko: '이 사람은 제 친구의 형이에요.',
        highlight: '제 친구의 형',
        gloss: {
          ko: '이 사람은 제 친구의 형이에요.',
          uz: 'Bu kishi mening do‘stimning akasi.',
          en: "This person is my friend's older brother.",
          ru: 'Этот человек — старший брат моего друга.',
        },
      },
      {
        ko: '저분은 선생님의 남편이에요.',
        highlight: '선생님의 남편',
        gloss: {
          ko: '저분은 선생님의 남편이에요.',
          uz: 'U kishi o‘qituvchining eri.',
          en: "That person is the teacher's husband.",
          ru: 'Тот человек — муж учителя.',
        },
      },
      {
        ko: '우리 회사의 사장님은 한국 사람이에요.',
        highlight: '우리 회사의 사장님',
        gloss: {
          ko: '우리 회사의 사장님은 한국 사람이에요.',
          uz: 'Kompaniyamiz direktori koreys.',
          en: 'The president of our company is Korean.',
          ru: 'Директор нашей компании — кореец.',
        },
      },
      {
        ko: '한국의 겨울은 아주 추워요.',
        highlight: '한국의 겨울',
        gloss: {
          ko: '한국의 겨울은 아주 추워요.',
          uz: 'Koreyaning qishi juda sovuq.',
          en: 'Winter in Korea is very cold.',
          ru: 'Зима в Корее очень холодная.',
        },
      },
      {
        ko: '서울의 지하철은 편리해요.',
        highlight: '서울의 지하철',
        gloss: {
          ko: '서울의 지하철은 편리해요.',
          uz: 'Seul metrosi qulay.',
          en: "Seoul's subway system is convenient.",
          ru: 'Метро Сеула удобное.',
        },
      },
      {
        ko: '이건 한국어 수업의 숙제예요.',
        highlight: '한국어 수업의 숙제',
        gloss: {
          ko: '이건 한국어 수업의 숙제예요.',
          uz: 'Bu koreys tili darsining uy vazifasi.',
          en: 'This is homework for the Korean class.',
          ru: 'Это домашнее задание по корейскому языку.',
        },
      },
      {
        ko: '동생의 생일은 다음 주예요.',
        highlight: '동생의 생일',
        gloss: {
          ko: '동생의 생일은 다음 주예요.',
          uz: 'Ukamning tug‘ilgan kuni keyingi hafta.',
          en: "My younger sibling's birthday is next week.",
          ru: 'День рождения моего младшего брата или сестры — на следующей неделе.',
        },
      },
      {
        ko: '내 친구는 축구를 아주 좋아해요.',
        highlight: '내 친구',
        gloss: {
          ko: '내 친구는 축구를 아주 좋아해요.',
          uz: 'Mening do‘stim futbolni juda yaxshi ko‘radi.',
          en: 'My friend really likes soccer.',
          ru: 'Мой друг очень любит футбол.',
        },
      },
      {
        ko: '우리 학교 앞에 카페가 있어요.',
        highlight: '우리 학교',
        gloss: {
          ko: '우리 학교 앞에 카페가 있어요.',
          uz: 'Maktabimiz oldida kafe bor.',
          en: 'There is a café in front of our school.',
          ru: 'Перед нашей школой есть кафе.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이 사진은 누구의 사진이에요?',
        highlight: '누구의 사진',
        gloss: {
          ko: '이 사진은 누구의 사진이에요?',
          uz: 'Bu kimning rasmi?',
          en: 'Whose photo is this?',
          ru: 'Чья это фотография?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '제 가족 사진이에요.',
        highlight: '제 가족 사진',
        gloss: {
          ko: '제 가족 사진이에요.',
          uz: 'Bu mening oilaviy suratim.',
          en: "It's a photo of my family.",
          ru: 'Это фотография моей семьи.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '이분은 누구예요?',
        highlight: '누구',
        gloss: {
          ko: '이분은 누구예요?',
          uz: 'Bu kishi kim?',
          en: 'Who is this person?',
          ru: 'Кто этот человек?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '제 친구의 어머니예요.',
        highlight: '제 친구의 어머니',
        gloss: {
          ko: '제 친구의 어머니예요.',
          uz: 'Bu mening do‘stimning onasi.',
          en: "She is my friend's mother.",
          ru: 'Это мама моего друга.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '이건 민수 씨의 휴대폰이에요?',
        highlight: '민수 씨의 휴대폰',
        gloss: {
          ko: '이건 민수 씨의 휴대폰이에요?',
          uz: 'Bu Minsuning telefoni?',
          en: "Is this Minsu's phone?",
          ru: 'Это телефон Минсу?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아니요. 제 휴대폰이에요.',
        highlight: '제 휴대폰',
        gloss: {
          ko: '아니요. 제 휴대폰이에요.',
          uz: 'Yo‘q. Bu mening telefonim.',
          en: "No. It's my phone.",
          ru: 'Нет. Это мой телефон.',
        },
      },
    ],

    similar: {
      pattern: 'N N (의 생략)',
      note: {
        ko: '"의"는 항상 반드시 써야 하는 것은 아니에요. 가족 관계나 소속처럼 의미가 분명한 표현에서는 자주 생략해요. "우리의 가족"보다 "우리 가족", "학교의 친구"보다 "학교 친구"가 일상 회화에서 더 자연스러울 수 있어요. 하지만 관계를 특별히 강조하거나 의미가 모호할 때는 "의"를 쓰는 것이 좋아요.',
        uz: '"의" har doim majburiy emas. Oila yoki tegishlilik kabi munosabat aniq bo‘lsa, u ko‘pincha tushirib qoldiriladi. Masalan, kundalik nutqda "우리 가족" shakli "우리의 가족"dan tabiiyroq. Ammo munosabatni alohida ta’kidlash yoki noaniqlikni yo‘qotish kerak bo‘lsa, "의"ni ishlatish foydali.',
        en: '의 is not always required. It is often omitted when the relationship is obvious, especially with family, affiliation, or common noun combinations. For example, 우리 가족 is usually more natural in conversation than 우리의 가족. Keep 의 when you need to emphasize or clarify the relationship.',
        ru: 'Частицу 의 необязательно использовать всегда. Когда связь очевидна, особенно в названиях семейных отношений или устойчивых сочетаниях, её часто опускают. Например, в разговоре 우리 가족 обычно естественнее, чем 우리의 가족. Если связь нужно подчеркнуть или уточнить, 의 лучше сохранить.',
      },
    },

    cautions: [
      {
        ko: '"저의"는 틀린 표현이 아니지만 일상 대화에서는 보통 "제"로 줄여요. "저의 이름은…"보다 "제 이름은…"이 훨씬 자연스러워요.',
        uz: '"저의" noto‘g‘ri emas, lekin kundalik nutqda odatda "제" shakli ishlatiladi. "저의 이름은…" o‘rniga "제 이름은…" tabiiyroq.',
        en: '저의 is grammatically correct, but 제 is much more common in everyday speech. 제 이름은… sounds more natural than 저의 이름은….',
        ru: 'Форма 저의 грамматически правильная, но в обычной речи чаще используется сокращение 제. 제 이름은… звучит естественнее.',
      },
      {
        ko: '"나의 → 내", "저의 → 제", "너의 → 네"처럼 줄여서 써요. 특히 "내"와 "네"를 바꾸면 말하는 사람과 듣는 사람이 완전히 달라지므로 주의해야 해요.',
        uz: '"나의 → 내", "저의 → 제", "너의 → 네" tarzida qisqaradi. Ayniqsa "내" va "네"ni adashtirsangiz, egasi butunlay o‘zgaradi.',
        en: '나의, 저의, and 너의 contract to 내, 제, and 네. Be especially careful with 내 and 네 because confusing them changes the owner completely.',
        ru: '나의, 저의 и 너의 сокращаются до 내, 제 и 네. Особенно важно не путать 내 и 네, потому что тогда меняется владелец.',
      },
      {
        ko: '"우리"는 한국어에서 실제 복수 의미보다 넓게 사용해요. 자기 가족을 말할 때도 보통 "내 가족"뿐 아니라 "우리 가족"이라고 많이 말해요.',
        uz: 'Koreys tilidagi "우리" faqat ko‘plik ma’nosida ishlatilmaydi. O‘z oilasi haqida gapirganda ham "우리 가족" juda ko‘p ishlatiladi.',
        en: '우리 is used more broadly than literal "our" in Korean. Speakers commonly say 우리 가족 even when referring to their own family.',
        ru: '우리 в корейском употребляется шире, чем буквальное «наш». Говоря о собственной семье, корейцы очень часто говорят 우리 가족.',
      },
      {
        ko: '두 명사를 연결한다고 해서 항상 "의"를 넣으면 자연스러운 것은 아니에요. "한국어 선생님", "학교 친구", "가족 사진"처럼 하나의 익숙한 의미 단위가 된 표현은 "의" 없이 쓰는 경우가 많아요.',
        uz: 'Ikki ot orasiga har safar "의" qo‘yish tabiiy bo‘lavermaydi. "한국어 선생님", "학교 친구", "가족 사진" kabi odatiy birikmalarda 의 ko‘pincha ishlatilmaydi.',
        en: 'Do not insert 의 between every pair of nouns. Common combinations such as 한국어 선생님, 학교 친구, and 가족 사진 are often used without it.',
        ru: 'Не нужно автоматически ставить 의 между любыми двумя существительными. Такие привычные сочетания, как 한국어 선생님, 학교 친구 и 가족 사진, часто употребляются без 의.',
      },
      {
        ko: '소유를 나타내는 조사 "의"는 실제 회화에서 흔히 [에]처럼 발음돼요. 글자는 "의"로 쓰지만 들을 때 다른 소리처럼 느껴질 수 있어요.',
        uz: 'Egalikni bildiruvchi "의" kundalik talaffuzda ko‘pincha [에]ga o‘xshab eshitiladi. Yozuvda esa baribir "의" yoziladi.',
        en: 'The possessive particle 의 is often pronounced similarly to [에] in natural speech. It is still written as 의.',
        ru: 'Частица принадлежности 의 в обычной речи часто произносится примерно как [에], хотя на письме всегда остаётся 의.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"저의 이름"을 일상 대화에서 가장 자연스럽게 줄이면 무엇이에요?',
          uz: '"저의 이름" birikmasining kundalik nutqdagi eng tabiiy qisqartmasi qaysi?',
          en: 'What is the most natural everyday contraction of "저의 이름"?',
          ru: 'Как естественнее всего сократить "저의 이름" в разговорной речи?',
        },
        options: [
          { text: '제 이름', correct: true },
          { text: '내 이름', correct: false },
          { text: '네 이름', correct: false },
        ],
      },
      {
        question: {
          ko: '빈칸에 알맞은 것을 고르세요. "이것은 민수___ 가방이에요."',
          uz: 'Bo‘sh joyga mos javobni tanlang. "이것은 민수___ 가방이에요."',
          en: 'Choose the correct answer. "이것은 민수___ 가방이에요."',
          ru: 'Выберите правильный вариант. "이것은 민수___ 가방이에요."',
        },
        options: [
          { text: '의', correct: true },
          { text: '를', correct: false },
          { text: '가', correct: false },
        ],
      },
      {
        question: {
          ko: '"나의 친구"를 자연스럽게 줄인 표현을 고르세요.',
          uz: '"나의 친구"ning tabiiy qisqartirilgan shaklini tanlang.',
          en: 'Choose the natural contracted form of "나의 친구".',
          ru: 'Выберите естественную сокращённую форму "나의 친구".',
        },
        options: [
          { text: '내 친구', correct: true },
          { text: '제 친구', correct: false },
          { text: '네 친구', correct: false },
        ],
      },
      {
        question: {
          ko: '다음 중 일상 대화에서 가장 자연스러운 표현을 고르세요.',
          uz: 'Quyidagilardan kundalik nutqda eng tabiiy ifodani tanlang.',
          en: 'Choose the expression that sounds most natural in everyday conversation.',
          ru: 'Выберите наиболее естественное выражение для повседневной речи.',
        },
        options: [
          { text: '우리 가족', correct: true },
          { text: '우리의의 가족', correct: false },
          { text: '우리의를 가족', correct: false },
        ],
      },
      {
        question: {
          ko: '"너의 가방"을 줄인 표현은 무엇이에요?',
          uz: '"너의 가방"ning qisqartirilgan shakli qaysi?',
          en: 'What is the contracted form of "너의 가방"?',
          ru: 'Как сокращается "너의 가방"?',
        },
        options: [
          { text: '네 가방', correct: true },
          { text: '내 가방', correct: false },
          { text: '제 가방', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-2. 능력·숙련 N을/를 잘하다[잘 못하다, 못하다] ─────────
  {
    code: 'skill-jalhada',
    pattern: 'N을/를 잘하다[잘 못하다, 못하다]',
    section: 2,
    unit: 1,
    order: 2,
    isActive: true,

    summary: {
      ko: '어떤 활동이나 기술을 잘하는지, 잘하지 못하는지, 또는 아예 하지 못하는지를 말할 때 사용해요. "잘하다", "잘 못하다", "못하다"는 의미가 서로 달라요.',
      uz: 'Biror ish yoki ko‘nikmani yaxshi bajarish, unchalik yaxshi bajara olmaslik yoki umuman bajara olmaslikni ifodalashda ishlatiladi. "잘하다", "잘 못하다" va "못하다" ma’nolari bir-biridan farq qiladi.',
      en: 'Used to talk about being good at an activity, not being very good at it, or being unable to do it. 잘하다, 잘 못하다, and 못하다 have different meanings.',
      ru: 'Используется, чтобы сказать, что человек хорошо что-то делает, делает не очень хорошо или совсем не умеет этого делать. 잘하다, 잘 못하다 и 못하다 имеют разные значения.',
    },

    tags: [
      {
        ko: '초급',
        uz: 'Boshlang‘ich',
        en: 'Beginner',
        ru: 'Начальный',
      },
      {
        ko: '능력·숙련',
        uz: 'Qobiliyat va ko‘nikma',
        en: 'Ability & skill',
        ru: 'Способность и навык',
      },
      {
        ko: '표현',
        uz: 'Ifoda',
        en: 'Expression',
        ru: 'Выражение',
      },
    ],

    explanation: {
      ko: '"N을/를 잘하다"는 어떤 활동이나 기술에 능숙하다는 뜻이에요. 예를 들어 "한국어를 잘해요"는 한국어를 능숙하게 사용한다는 뜻이고, "요리를 잘해요"는 요리 실력이 좋다는 뜻이에요. 반대로 "잘 못하다"는 그 활동을 할 수는 있지만 능숙하지 않다는 의미예요. "수영을 잘 못해요"라고 하면 수영을 전혀 못하는 것은 아니지만 잘하지 못한다는 뜻이에요. "못하다"는 능력이나 상황 때문에 그 활동을 하지 못한다는 뜻이 더 강해요. "운전을 못해요"는 운전할 줄 모르거나 운전할 수 없다는 뜻이에요. 명사에 받침이 있으면 "을", 받침이 없으면 "를"을 사용해요.',
      uz: '"N을/를 잘하다" biror faoliyat yoki ko‘nikmani yaxshi bajarishni bildiradi. Masalan, "한국어를 잘해요" koreys tilidan yaxshi foydalanishni, "요리를 잘해요" esa yaxshi ovqat tayyorlashni bildiradi. "잘 못하다" ishni bajarish mumkin, ammo u yaxshi chiqmasligini anglatadi. "수영을 잘 못해요" — suza olaman, lekin yaxshi emas degan ma’no. "못하다" esa ko‘pincha umuman qila olmaslik yoki imkon bo‘lmasligini bildiradi. Ot undosh bilan tugasa "을", unli bilan tugasa "를" ishlatiladi.',
      en: '"N을/를 잘하다" means to be skilled at an activity. For example, 한국어를 잘해요 means someone is good at Korean, while 요리를 잘해요 means someone is good at cooking. 잘 못하다 means the person can do the activity but does not do it very well. 못하다 is stronger and usually means that the person cannot do the activity or does not know how to do it. Use 을 after a noun ending in a consonant and 를 after a noun ending in a vowel.',
      ru: '"N을/를 잘하다" означает хорошо владеть каким-либо навыком. Например, 한국어를 잘해요 означает «хорошо знать корейский», а 요리를 잘해요 — «хорошо готовить». 잘 못하다 означает, что человек может выполнять действие, но делает это не очень хорошо. 못하다 имеет более сильное значение: человек не умеет или не может выполнить действие. После существительного с конечной согласной используется 을, а после гласной — 를.',
    },

    conjugationRule: {
      ko: '받침 있는 N + 을 잘해요 / 잘 못해요 / 못해요  ·  받침 없는 N + 를 잘해요 / 잘 못해요 / 못해요',
      uz: 'Undosh bilan tugagan N + 을 잘해요 / 잘 못해요 / 못해요  ·  unli bilan tugagan N + 를 잘해요 / 잘 못해요 / 못해요',
      en: 'N ending in a consonant + 을 잘해요 / 잘 못해요 / 못해요  ·  N ending in a vowel + 를 잘해요 / 잘 못해요 / 못해요',
      ru: 'N с конечной согласной + 을 잘해요 / 잘 못해요 / 못해요  ·  N с конечной гласной + 를 잘해요 / 잘 못해요 / 못해요',
    },

    conjugations: [
      {
        base: '한국어 + 잘하다',
        result: '한국어를 잘해요',
      },
      {
        base: '요리 + 잘하다',
        result: '요리를 잘해요',
      },
      {
        base: '축구 + 잘하다',
        result: '축구를 잘해요',
      },
      {
        base: '노래 + 잘하다',
        result: '노래를 잘해요',
      },
      {
        base: '수영 + 잘 못하다',
        result: '수영을 잘 못해요',
      },
      {
        base: '운동 + 잘 못하다',
        result: '운동을 잘 못해요',
      },
      {
        base: '춤 + 잘 못하다',
        result: '춤을 잘 못해요',
      },
      {
        base: '운전 + 못하다',
        result: '운전을 못해요',
      },
      {
        base: '테니스 + 못하다',
        result: '테니스를 못해요',
      },
      {
        base: '스키 + 못하다',
        result: '스키를 못해요',
      },
    ],

    examples: [
      {
        ko: '저는 한국어를 잘해요.',
        highlight: '한국어를 잘해요',
        gloss: {
          ko: '저는 한국어를 잘해요.',
          uz: 'Men koreys tilini yaxshi bilaman.',
          en: 'I am good at Korean.',
          ru: 'Я хорошо знаю корейский язык.',
        },
      },
      {
        ko: '민수 씨는 요리를 아주 잘해요.',
        highlight: '요리를 아주 잘해요',
        gloss: {
          ko: '민수 씨는 요리를 아주 잘해요.',
          uz: 'Minsu ovqatni juda yaxshi tayyorlaydi.',
          en: 'Minsu is very good at cooking.',
          ru: 'Минсу очень хорошо готовит.',
        },
      },
      {
        ko: '수진 씨는 노래를 잘해요.',
        highlight: '노래를 잘해요',
        gloss: {
          ko: '수진 씨는 노래를 잘해요.',
          uz: 'Sujin yaxshi qo‘shiq aytadi.',
          en: 'Sujin is good at singing.',
          ru: 'Суджин хорошо поёт.',
        },
      },
      {
        ko: '제 친구는 축구를 잘해요.',
        highlight: '축구를 잘해요',
        gloss: {
          ko: '제 친구는 축구를 잘해요.',
          uz: 'Do‘stim futbolni yaxshi o‘ynaydi.',
          en: 'My friend is good at soccer.',
          ru: 'Мой друг хорошо играет в футбол.',
        },
      },
      {
        ko: '저는 수영을 잘 못해요.',
        highlight: '수영을 잘 못해요',
        gloss: {
          ko: '저는 수영을 잘 못해요.',
          uz: 'Men unchalik yaxshi suzmayman.',
          en: 'I am not very good at swimming.',
          ru: 'Я не очень хорошо плаваю.',
        },
      },
      {
        ko: '아버지는 컴퓨터를 잘 못하세요.',
        highlight: '컴퓨터를 잘 못하세요',
        gloss: {
          ko: '아버지는 컴퓨터를 잘 못하세요.',
          uz: 'Otam kompyuterdan unchalik yaxshi foydalana olmaydi.',
          en: 'My father is not very good with computers.',
          ru: 'Мой отец не очень хорошо умеет пользоваться компьютером.',
        },
      },
      {
        ko: '저는 춤을 잘 못해요.',
        highlight: '춤을 잘 못해요',
        gloss: {
          ko: '저는 춤을 잘 못해요.',
          uz: 'Men unchalik yaxshi raqsga tushmayman.',
          en: 'I am not very good at dancing.',
          ru: 'Я не очень хорошо танцую.',
        },
      },
      {
        ko: '제 동생은 운전을 못해요.',
        highlight: '운전을 못해요',
        gloss: {
          ko: '제 동생은 운전을 못해요.',
          uz: 'Ukam yoki singlim mashina hayday olmaydi.',
          en: 'My younger sibling cannot drive.',
          ru: 'Мой младший брат или сестра не умеет водить.',
        },
      },
      {
        ko: '저는 테니스를 못해요.',
        highlight: '테니스를 못해요',
        gloss: {
          ko: '저는 테니스를 못해요.',
          uz: 'Men tennis o‘ynay olmayman.',
          en: 'I cannot play tennis.',
          ru: 'Я не умею играть в теннис.',
        },
      },
      {
        ko: '마리아 씨는 한국 요리를 잘해요.',
        highlight: '한국 요리를 잘해요',
        gloss: {
          ko: '마리아 씨는 한국 요리를 잘해요.',
          uz: 'Mariya koreys taomlarini yaxshi tayyorlaydi.',
          en: 'Maria is good at cooking Korean food.',
          ru: 'Мария хорошо готовит корейские блюда.',
        },
      },
      {
        ko: '한국 사람들은 젓가락질을 잘해요.',
        highlight: '젓가락질을 잘해요',
        gloss: {
          ko: '한국 사람들은 젓가락질을 잘해요.',
          uz: 'Koreyslar tayoqchalardan yaxshi foydalanadi.',
          en: 'Koreans are good at using chopsticks.',
          ru: 'Корейцы хорошо пользуются палочками.',
        },
      },
      {
        ko: '저는 그림을 잘 못 그려요.',
        highlight: '그림을 잘 못 그려요',
        gloss: {
          ko: '저는 그림을 잘 못 그려요.',
          uz: 'Men rasmni unchalik yaxshi chiza olmayman.',
          en: 'I am not very good at drawing.',
          ru: 'Я не очень хорошо рисую.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '수영을 잘해요?',
        highlight: '수영을 잘해요',
        gloss: {
          ko: '수영을 잘해요?',
          uz: 'Yaxshi suzasizmi?',
          en: 'Are you good at swimming?',
          ru: 'Вы хорошо плаваете?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아니요. 수영을 잘 못해요.',
        highlight: '수영을 잘 못해요',
        gloss: {
          ko: '아니요. 수영을 잘 못해요.',
          uz: 'Yo‘q. Men unchalik yaxshi suzmayman.',
          en: 'No. I am not very good at swimming.',
          ru: 'Нет. Я не очень хорошо плаваю.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '민수 씨는 요리를 잘해요?',
        highlight: '요리를 잘해요',
        gloss: {
          ko: '민수 씨는 요리를 잘해요?',
          uz: 'Minsu yaxshi ovqat tayyorlaydimi?',
          en: 'Is Minsu good at cooking?',
          ru: 'Минсу хорошо готовит?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네. 한국 요리를 아주 잘해요.',
        highlight: '한국 요리를 아주 잘해요',
        gloss: {
          ko: '네. 한국 요리를 아주 잘해요.',
          uz: 'Ha. U koreys taomlarini juda yaxshi tayyorlaydi.',
          en: 'Yes. He is very good at cooking Korean food.',
          ru: 'Да. Он очень хорошо готовит корейские блюда.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '운전할 수 있어요?',
        highlight: '운전할 수 있어요',
        gloss: {
          ko: '운전할 수 있어요?',
          uz: 'Mashina hayday olasizmi?',
          en: 'Can you drive?',
          ru: 'Вы умеете водить?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아니요. 운전을 못해요.',
        highlight: '운전을 못해요',
        gloss: {
          ko: '아니요. 운전을 못해요.',
          uz: 'Yo‘q. Men mashina hayday olmayman.',
          en: 'No. I cannot drive.',
          ru: 'Нет. Я не умею водить.',
        },
      },
    ],

    similar: {
      pattern: 'V-(으)ㄹ 수 있다[없다]',
      note: {
        ko: '"잘하다/잘 못하다"는 주로 실력이나 숙련도를 말하고, "-(으)ㄹ 수 있다/없다"는 어떤 행동이 가능한지 불가능한지를 말해요. "수영을 잘 못해요"는 수영은 할 수 있지만 실력이 좋지 않다는 뜻이고, "수영할 수 없어요"는 수영 자체가 불가능하다는 뜻이에요.',
        uz: '"잘하다/잘 못하다" asosan mahorat darajasini, "-(으)ㄹ 수 있다/없다" esa harakatning mumkin yoki mumkin emasligini bildiradi. "수영을 잘 못해요" — suza olaman, lekin yaxshi emas. "수영할 수 없어요" esa umuman suza olmayman degan ma’noni beradi.',
        en: '잘하다 and 잘 못하다 mainly describe skill level, while -(으)ㄹ 수 있다/없다 describes whether an action is possible. 수영을 잘 못해요 means you can swim but are not good at it, while 수영할 수 없어요 means you cannot swim.',
        ru: '잘하다 и 잘 못하다 в основном описывают уровень навыка, а -(으)ㄹ 수 있다/없다 — возможность выполнить действие. 수영을 잘 못해요 означает «я умею плавать, но плохо», а 수영할 수 없어요 — «я не могу плавать».',
      },
    },

    cautions: [
      {
        ko: '"잘 못하다"와 "못하다"는 의미가 달라요. "잘 못해요"는 할 수 있지만 잘하지 못한다는 뜻이고, "못해요"는 하지 못하거나 할 줄 모른다는 뜻이에요.',
        uz: '"잘 못하다" va "못하다" bir xil emas. "잘 못해요" — qila olaman, lekin yaxshi emas. "못해요" — qila olmayman yoki bilmayman.',
        en: '잘 못하다 and 못하다 are different. 잘 못해요 means you can do something but not well, while 못해요 means you cannot do it.',
        ru: '잘 못하다 и 못하다 различаются. 잘 못해요 означает «могу, но плохо», а 못해요 — «не могу / не умею».',
      },
      {
        ko: '"잘 못하다"에서 "잘"과 "못하다"를 함께 쓰는 것이 자연스러워요. 여기서 "잘"은 "잘한다"는 의미가 아니라 능숙하지 않다는 정도를 나타내요.',
        uz: '"잘 못하다" birikmasida "잘" va "못하다" birga ishlatiladi. Bu yerda "잘" yaxshi bajarishni emas, mahorat darajasining pastligini bildiradi.',
        en: 'In 잘 못하다, 잘 and 못하다 work together. Here 잘 does not mean that the action is performed well; the whole expression means "not very good at".',
        ru: 'В 잘 못하다 слова 잘 и 못하다 образуют одно значение: «делать не очень хорошо». 잘 здесь не означает «хорошо».',
      },
      {
        ko: '활동을 나타내는 명사 뒤에는 보통 "을/를"을 사용해요. "수영이 잘해요"보다 "수영을 잘해요"가 기본 형태예요.',
        uz: 'Faoliyatni bildiruvchi otdan keyin odatda "을/를" ishlatiladi. "수영이 잘해요" emas, "수영을 잘해요" asosiy shakl hisoblanadi.',
        en: 'Activity nouns normally take 을/를. 수영을 잘해요 is the standard pattern, not 수영이 잘해요.',
        ru: 'После существительного, обозначающего деятельность, обычно ставится 을/를. Базовая форма — 수영을 잘해요, а не 수영이 잘해요.',
      },
      {
        ko: '"잘하다"는 "잘 하다"로 띄어 쓰지 않고 한 단어처럼 "잘하다"로 쓰는 경우가 많아요. 하지만 일반 동사를 꾸미는 부사 "잘"은 "잘 먹어요", "잘 자요"처럼 띄어 써요.',
        uz: '"잘하다" ko‘pincha bitta birlik sifatida yoziladi. Oddiy fe’lni aniqlaydigan "잘" esa "잘 먹어요", "잘 자요" kabi alohida yoziladi.',
        en: '잘하다 is commonly treated as a single expression. The adverb 잘 used with ordinary verbs is written separately, as in 잘 먹어요 or 잘 자요.',
        ru: '잘하다 обычно используется как единое выражение. Наречие 잘 с обычными глаголами пишется отдельно: 잘 먹어요, 잘 자요.',
      },
      {
        ko: '사람마다 "잘한다"의 기준이 다를 수 있어요. 그래서 자신에 대해 말할 때 "조금 해요", "잘 못해요"처럼 부드럽게 표현하는 경우도 많아요.',
        uz: '"Yaxshi qilish" mezoni odamga qarab farq qiladi. Shu sababli o‘zi haqida "조금 해요" yoki "잘 못해요" kabi yumshoq ifodalar ko‘p ishlatiladi.',
        en: 'The standard for being "good" at something is subjective. Speakers often soften statements about themselves with expressions such as 조금 해요 or 잘 못해요.',
        ru: 'Критерий «хорошо уметь» субъективен, поэтому о себе часто говорят мягче: 조금 해요 или 잘 못해요.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '빈칸에 알맞은 것을 고르세요. "저는 한국어___ 잘해요."',
          uz: 'Bo‘sh joyga mos javobni tanlang. "저는 한국어___ 잘해요."',
          en: 'Choose the correct answer. "저는 한국어___ 잘해요."',
          ru: 'Выберите правильный вариант. "저는 한국어___ 잘해요."',
        },
        options: [
          { text: '를', correct: true },
          { text: '가', correct: false },
          { text: '에', correct: false },
        ],
      },
      {
        question: {
          ko: '"수영을 할 수는 있지만 실력이 좋지 않아요"에 가장 가까운 표현은?',
          uz: '"Suza olaman, lekin unchalik yaxshi emasman" ma’nosiga eng yaqin ifoda qaysi?',
          en: 'Which expression best means "I can swim, but I am not very good at it"?',
          ru: 'Какое выражение лучше всего означает «Я умею плавать, но не очень хорошо»?',
        },
        options: [
          { text: '수영을 잘 못해요.', correct: true },
          { text: '수영을 잘해요.', correct: false },
          { text: '수영을 못해요.', correct: false },
        ],
      },
      {
        question: {
          ko: '"운전할 줄 모르거나 운전할 수 없어요"에 가장 알맞은 표현은?',
          uz: '"Mashina haydashni bilmayman yoki hayday olmayman" ma’nosiga mos ifoda qaysi?',
          en: 'Which expression best means "I cannot drive / do not know how to drive"?',
          ru: 'Какое выражение означает «Я не умею водить»?',
        },
        options: [
          { text: '운전을 못해요.', correct: true },
          { text: '운전을 잘해요.', correct: false },
          { text: '운전을 아주 잘해요.', correct: false },
        ],
      },
      {
        question: {
          ko: '다음 중 자연스러운 문장을 고르세요.',
          uz: 'Tabiiy gapni tanlang.',
          en: 'Choose the natural sentence.',
          ru: 'Выберите естественное предложение.',
        },
        options: [
          { text: '민수 씨는 요리를 잘해요.', correct: true },
          { text: '민수 씨는 요리가 잘해요.', correct: false },
          { text: '민수 씨는 요리에 잘해요.', correct: false },
        ],
      },
      {
        question: {
          ko: '"노래를 매우 잘 부르는 사람"을 설명할 때 가장 알맞은 문장은?',
          uz: 'Juda yaxshi qo‘shiq aytadigan odamni tasvirlash uchun qaysi gap mos?',
          en: 'Which sentence best describes someone who sings very well?',
          ru: 'Какое предложение лучше описывает человека, который очень хорошо поёт?',
        },
        options: [
          { text: '노래를 아주 잘해요.', correct: true },
          { text: '노래를 잘 못해요.', correct: false },
          { text: '노래를 못해요.', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-3. 명사 높임 N(이)세요 ─────────
  {
    code: 'honor-iseyo',
    pattern: 'N(이)세요',
    section: 2,
    unit: 1,
    order: 3,
    isActive: true,

    summary: {
      ko: '사람의 직업, 신분, 관계 등을 높여서 말할 때 사용하는 표현이에요. "N이에요/예요"의 높임 표현으로, 받침이 있으면 "이세요", 받침이 없으면 "세요"를 사용해요.',
      uz: 'Odamning kasbi, mavqei yoki munosabatini hurmat bilan aytishda ishlatiladi. Bu "N이에요/예요"ning hurmat shakli bo‘lib, undoshdan keyin "이세요", unlidan keyin "세요" ishlatiladi.',
      en: 'An honorific form used when stating a respected person’s occupation, identity, or relationship. It is the honorific counterpart of N이에요/예요. Use 이세요 after a consonant and 세요 after a vowel.',
      ru: 'Уважительная форма для обозначения профессии, статуса или отношений человека. Это почтительный вариант N이에요/예요. После согласной используется 이세요, после гласной — 세요.',
    },

    tags: [
      {
        ko: '초급',
        uz: 'Boshlang‘ich',
        en: 'Beginner',
        ru: 'Начальный',
      },
      {
        ko: '높임말',
        uz: 'Hurmat shakli',
        en: 'Honorifics',
        ru: 'Уважительная речь',
      },
      {
        ko: '명사 서술',
        uz: 'Ot kesim',
        en: 'Noun predicate',
        ru: 'Именное сказуемое',
      },
    ],

    explanation: {
      ko: '"N(이)세요"는 높여야 하는 사람의 직업, 신분, 가족 관계 등을 말할 때 사용해요. 기본형 "N이에요/예요"에 높임의 의미가 추가된 형태예요. 명사가 받침으로 끝나면 "이세요"를 사용해서 "선생님이세요", "학생이세요"처럼 말하고, 받침이 없으면 "세요"를 사용해서 "의사세요", "어머니세요"처럼 말해요. 질문으로도 사용할 수 있어서 "선생님이세요?", "의사세요?"처럼 상대방이나 제3자에 대해 공손하게 확인할 수 있어요. 보통 자신을 높이는 데에는 사용하지 않고 부모님, 선생님, 손님, 상사처럼 높여야 하는 사람을 말할 때 사용해요.',
      uz: '"N(이)세요" hurmat qilinadigan odamning kasbi, mavqei yoki oilaviy munosabatini ifodalash uchun ishlatiladi. Bu "N이에요/예요" shakliga hurmat ma’nosi qo‘shilgan ko‘rinishdir. Ot undosh bilan tugasa "이세요" ishlatiladi: "선생님이세요", "학생이세요". Unli bilan tugasa "세요" ishlatiladi: "의사세요", "어머니세요". Savol shaklida ham ishlatiladi: "선생님이세요?", "의사세요?". Odatda gapiruvchi o‘zini emas, hurmat qilinadigan boshqa odamni shu shaklda ifodalaydi.',
      en: '"N(이)세요" is used to respectfully state the occupation, status, or family relationship of someone who should be honored. It adds an honorific meaning to N이에요/예요. After a consonant, use 이세요, as in 선생님이세요 or 학생이세요. After a vowel, use 세요, as in 의사세요 or 어머니세요. It can also be used in questions such as 선생님이세요? It is normally used for another respected person rather than to honor oneself.',
      ru: '"N(이)세요" используется, когда нужно уважительно назвать профессию, статус или родственную связь человека. Это уважительный вариант N이에요/예요. После существительного с конечной согласной используется 이세요: 선생님이세요, 학생이세요. После гласной используется 세요: 의사세요, 어머니세요. Форма также используется в вопросах: 선생님이세요? Обычно говорящий не использует её для возвышения самого себя.',
    },

    conjugationRule: {
      ko: '받침 있는 N + 이세요 → 선생님이세요, 학생이세요  ·  받침 없는 N + 세요 → 의사세요, 어머니세요  ·  질문: N(이)세요?',
      uz: 'Undosh bilan tugagan N + 이세요 → 선생님이세요, 학생이세요  ·  unli bilan tugagan N + 세요 → 의사세요, 어머니세요  ·  savol: N(이)세요?',
      en: 'N ending in a consonant + 이세요 → 선생님이세요, 학생이세요  ·  N ending in a vowel + 세요 → 의사세요, 어머니세요  ·  question: N(이)세요?',
      ru: 'N с конечной согласной + 이세요 → 선생님이세요, 학생이세요  ·  N с гласной + 세요 → 의사세요, 어머니세요  ·  вопрос: N(이)세요?',
    },

    conjugations: [
      {
        base: '선생님',
        result: '선생님이세요',
      },
      {
        base: '학생',
        result: '학생이세요',
      },
      {
        base: '회사원',
        result: '회사원이세요',
      },
      {
        base: '사장님',
        result: '사장님이세요',
      },
      {
        base: '한국 분',
        result: '한국 분이세요',
      },
      {
        base: '의사',
        result: '의사세요',
      },
      {
        base: '간호사',
        result: '간호사세요',
      },
      {
        base: '어머니',
        result: '어머니세요',
      },
      {
        base: '할머니',
        result: '할머니세요',
      },
      {
        base: '누나',
        result: '누나세요',
      },
    ],

    examples: [
      {
        ko: '이분은 선생님이세요.',
        highlight: '선생님이세요',
        gloss: {
          ko: '이분은 선생님이세요.',
          uz: 'Bu kishi o‘qituvchi.',
          en: 'This person is a teacher.',
          ru: 'Этот человек — учитель.',
        },
      },
      {
        ko: '저분은 의사세요.',
        highlight: '의사세요',
        gloss: {
          ko: '저분은 의사세요.',
          uz: 'U kishi shifokor.',
          en: 'That person is a doctor.',
          ru: 'Тот человек — врач.',
        },
      },
      {
        ko: '아버지는 회사원이세요.',
        highlight: '회사원이세요',
        gloss: {
          ko: '아버지는 회사원이세요.',
          uz: 'Otam kompaniya xodimi.',
          en: 'My father is an office worker.',
          ru: 'Мой отец — офисный работник.',
        },
      },
      {
        ko: '어머니는 간호사세요.',
        highlight: '간호사세요',
        gloss: {
          ko: '어머니는 간호사세요.',
          uz: 'Onam hamshira.',
          en: 'My mother is a nurse.',
          ru: 'Моя мама — медсестра.',
        },
      },
      {
        ko: '할아버지는 한국 분이세요.',
        highlight: '한국 분이세요',
        gloss: {
          ko: '할아버지는 한국 분이세요.',
          uz: 'Bobom koreyalik.',
          en: 'My grandfather is Korean.',
          ru: 'Мой дедушка — кореец.',
        },
      },
      {
        ko: '이분은 우리 학교 교장 선생님이세요.',
        highlight: '교장 선생님이세요',
        gloss: {
          ko: '이분은 우리 학교 교장 선생님이세요.',
          uz: 'Bu kishi maktabimiz direktori.',
          en: 'This person is the principal of our school.',
          ru: 'Этот человек — директор нашей школы.',
        },
      },
      {
        ko: '저분은 민수 씨의 어머니세요.',
        highlight: '민수 씨의 어머니세요',
        gloss: {
          ko: '저분은 민수 씨의 어머니세요.',
          uz: 'U kishi Minsuning onasi.',
          en: "That person is Minsu's mother.",
          ru: 'Та женщина — мама Минсу.',
        },
      },
      {
        ko: '선생님은 한국 분이세요.',
        highlight: '한국 분이세요',
        gloss: {
          ko: '선생님은 한국 분이세요.',
          uz: 'O‘qituvchi koreyalik.',
          en: 'The teacher is Korean.',
          ru: 'Учитель — кореец.',
        },
      },
      {
        ko: '이분은 제 할머니세요.',
        highlight: '제 할머니세요',
        gloss: {
          ko: '이분은 제 할머니세요.',
          uz: 'Bu kishi mening buvim.',
          en: 'This person is my grandmother.',
          ru: 'Это моя бабушка.',
        },
      },
      {
        ko: '저분은 사장님이세요.',
        highlight: '사장님이세요',
        gloss: {
          ko: '저분은 사장님이세요.',
          uz: 'U kishi kompaniya rahbari.',
          en: 'That person is the company president.',
          ru: 'Тот человек — директор компании.',
        },
      },
      {
        ko: '아버지는 선생님이세요?',
        highlight: '선생님이세요?',
        gloss: {
          ko: '아버지는 선생님이세요?',
          uz: 'Otangiz o‘qituvchimi?',
          en: 'Is your father a teacher?',
          ru: 'Ваш отец учитель?',
        },
      },
      {
        ko: '어머니는 의사세요?',
        highlight: '의사세요?',
        gloss: {
          ko: '어머니는 의사세요?',
          uz: 'Onangiz shifokormi?',
          en: 'Is your mother a doctor?',
          ru: 'Ваша мама врач?',
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
          ru: 'Кто этот человек?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '우리 회사 사장님이세요.',
        highlight: '사장님이세요',
        gloss: {
          ko: '우리 회사 사장님이세요.',
          uz: 'Bu bizning kompaniya direktorimiz.',
          en: 'He is the president of our company.',
          ru: 'Это директор нашей компании.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '저분은 선생님이세요?',
        highlight: '선생님이세요?',
        gloss: {
          ko: '저분은 선생님이세요?',
          uz: 'U kishi o‘qituvchimi?',
          en: 'Is that person a teacher?',
          ru: 'Тот человек учитель?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아니요. 의사세요.',
        highlight: '의사세요',
        gloss: {
          ko: '아니요. 의사세요.',
          uz: 'Yo‘q. U shifokor.',
          en: 'No. He is a doctor.',
          ru: 'Нет. Он врач.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '이분이 민수 씨 어머니세요?',
        highlight: '어머니세요?',
        gloss: {
          ko: '이분이 민수 씨 어머니세요?',
          uz: 'Bu kishi Minsuning onasimi?',
          en: "Is this person Minsu's mother?",
          ru: 'Это мама Минсу?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 맞아요. 민수 씨 어머니세요.',
        highlight: '어머니세요',
        gloss: {
          ko: '네, 맞아요. 민수 씨 어머니세요.',
          uz: 'Ha, to‘g‘ri. Bu Minsuning onasi.',
          en: "Yes, that's right. She is Minsu's mother.",
          ru: 'Да, верно. Это мама Минсу.',
        },
      },
    ],

    similar: {
      pattern: 'N이에요/예요',
      note: {
        ko: '"N이에요/예요"는 일반적인 공손한 서술이고, "N(이)세요"는 말하는 대상이나 주체를 높이는 표현이에요. 친구에 대해 "민수는 학생이에요"라고 할 수 있지만, 선생님처럼 높여야 하는 사람에게는 "선생님이세요"가 더 적절해요.',
        uz: '"N이에요/예요" oddiy muloyim shakl, "N(이)세요" esa odamni hurmat qilib aytiladigan shakl. Do‘st haqida "민수는 학생이에요" deyish mumkin, hurmat qilinadigan odam haqida esa "선생님이세요" kabi shakl ishlatiladi.',
        en: 'N이에요/예요 is a normal polite noun predicate, while N(이)세요 adds honorific respect toward the person being described. You can say 민수는 학생이에요 about a friend, but 선생님이세요 is more appropriate when referring respectfully to a teacher.',
        ru: 'N이에요/예요 — обычная вежливая форма, а N(이)세요 дополнительно выражает уважение к человеку, о котором говорят. О друге можно сказать 민수는 학생이에요, а о преподавателе уместнее 선생님이세요.',
      },
    },

    cautions: [
      {
        ko: '자기 자신을 높일 때는 보통 사용하지 않아요. "저는 학생이세요"가 아니라 "저는 학생이에요"라고 말해요.',
        uz: 'O‘zingizni hurmat shaklida aytmaysiz. "저는 학생이세요" emas, "저는 학생이에요" deyiladi.',
        en: 'Do not normally use this honorific form for yourself. Say 저는 학생이에요, not 저는 학생이세요.',
        ru: 'Обычно нельзя использовать эту уважительную форму по отношению к себе. Правильно: 저는 학생이에요, а не 저는 학생이세요.',
      },
      {
        ko: '받침이 있는 명사는 "이세요"를 사용해요. "선생님세요"가 아니라 "선생님이세요"예요.',
        uz: 'Undosh bilan tugagan otdan keyin "이세요" ishlatiladi. "선생님세요" emas, "선생님이세요".',
        en: 'Use 이세요 after a noun ending in a consonant. Say 선생님이세요, not 선생님세요.',
        ru: 'После существительного с конечной согласной используется 이세요: 선생님이세요, а не 선생님세요.',
      },
      {
        ko: '받침이 없는 명사는 보통 "세요"를 사용해요. "의사이세요"도 문법적으로 들을 수 있지만 일상적으로는 "의사세요"가 자연스러워요.',
        uz: 'Unli bilan tugagan otdan keyin odatda "세요" ishlatiladi. Kundalik nutqda "의사세요" tabiiyroq.',
        en: 'After a vowel-ending noun, 세요 is normally used. 의사세요 is the natural everyday form.',
        ru: 'После существительного на гласную обычно используется 세요. В обычной речи естественно 의사세요.',
      },
      {
        ko: '"세요"가 보인다고 모두 명사 높임은 아니에요. "가세요", "읽으세요"처럼 동사에 붙으면 다른 문법인 "-(으)시-" 또는 요청 표현과 관련돼요.',
        uz: 'Har bir "세요" otning hurmat shakli emas. "가세요", "읽으세요" kabi fe’l shakllari "-(으)시-" yoki iltimos-buyruq shakliga tegishli.',
        en: 'Not every form ending in 세요 is this noun honorific. Verb forms such as 가세요 and 읽으세요 involve -(으)시- or the polite request form.',
        ru: 'Не каждое слово на 세요 относится к этой конструкции. В глагольных формах 가세요 и 읽으세요 используется -(으)시- или вежливая просьба.',
      },
      {
        ko: '사람을 높여 말할 때는 명사뿐 아니라 문장 전체의 높임 표현도 자연스럽게 맞추는 것이 좋아요.',
        uz: 'Odamni hurmat qilib gapirganda faqat ot emas, gapning boshqa hurmat shakllarini ham moslashtirish tabiiyroq.',
        en: 'When speaking honorifically about someone, it is natural to keep the rest of the sentence appropriately respectful as well.',
        ru: 'Когда вы уважительно говорите о человеке, желательно согласовывать уровень вежливости и в остальных частях предложения.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"선생님"에 알맞은 높임 표현을 고르세요.',
          uz: '"선생님" uchun mos hurmat shaklini tanlang.',
          en: 'Choose the correct honorific form for 선생님.',
          ru: 'Выберите правильную уважительную форму для 선생님.',
        },
        options: [
          { text: '선생님이세요', correct: true },
          { text: '선생님세요', correct: false },
          { text: '선생님예요', correct: false },
        ],
      },
      {
        question: {
          ko: '"의사"에 알맞은 높임 표현을 고르세요.',
          uz: '"의사" uchun mos hurmat shaklini tanlang.',
          en: 'Choose the correct honorific form for 의사.',
          ru: 'Выберите правильную уважительную форму для 의사.',
        },
        options: [
          { text: '의사세요', correct: true },
          { text: '의사이세요', correct: false },
          { text: '의사입니다만', correct: false },
        ],
      },
      {
        question: {
          ko: '자기 자신을 소개할 때 자연스러운 문장을 고르세요.',
          uz: 'O‘zingizni tanishtirish uchun tabiiy gapni tanlang.',
          en: 'Choose the natural sentence for introducing yourself.',
          ru: 'Выберите естественное предложение для представления самого себя.',
        },
        options: [
          { text: '저는 학생이에요.', correct: true },
          { text: '저는 학생이세요.', correct: false },
          { text: '저는 학생세요.', correct: false },
        ],
      },
      {
        question: {
          ko: '빈칸에 알맞은 것을 고르세요. "저분은 우리 회사 사장님___."',
          uz: 'Bo‘sh joyga mos javobni tanlang. "저분은 우리 회사 사장님___."',
          en: 'Choose the correct answer. "저분은 우리 회사 사장님___."',
          ru: 'Выберите правильный вариант. "저분은 우리 회사 사장님___."',
        },
        options: [
          { text: '이세요', correct: true },
          { text: '세요', correct: false },
          { text: '예요', correct: false },
        ],
      },
      {
        question: {
          ko: '다음 중 높임 표현이 가장 자연스러운 문장을 고르세요.',
          uz: 'Hurmat shakli eng tabiiy ishlatilgan gapni tanlang.',
          en: 'Choose the sentence with the most natural honorific expression.',
          ru: 'Выберите предложение с наиболее естественной уважительной формой.',
        },
        options: [
          { text: '어머니는 의사세요.', correct: true },
          { text: '저는 의사세요.', correct: false },
          { text: '민수는 제 친구세요.', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-4. 주체 높임 A/V-(으)시- ─────────
  {
    code: 'honor-usi',
    pattern: 'A/V-(으)시-',
    section: 2,
    unit: 1,
    order: 4,
    isActive: true,

    summary: {
      ko: '문장의 주어가 선생님, 부모님, 손님, 상사처럼 높여야 하는 사람일 때 동사나 형용사에 "-(으)시-"를 붙여 주체를 높여요.',
      uz: 'Gapning egasi o‘qituvchi, ota-ona, mehmon yoki rahbar kabi hurmat qilinadigan odam bo‘lsa, fe’l yoki sifatga "-(으)시-" qo‘shib hurmat ifodalanadi.',
      en: 'Adds -(으)시- to a verb or adjective when the subject is someone who should be respected, such as a teacher, parent, guest, or superior.',
      ru: 'К глаголу или прилагательному добавляется -(으)시-, когда подлежащее — человек, которого нужно уважать: преподаватель, родитель, гость, начальник и т. п.',
    },

    tags: [
      {
        ko: '초급',
        uz: 'Boshlang‘ich',
        en: 'Beginner',
        ru: 'Начальный',
      },
      {
        ko: '주체 높임',
        uz: 'Ega hurmati',
        en: 'Subject honorific',
        ru: 'Уважение к субъекту',
      },
      {
        ko: '동사·형용사',
        uz: 'Fe’l va sifat',
        en: 'Verbs & adjectives',
        ru: 'Глаголы и прилагательные',
      },
    ],

    explanation: {
      ko: '"-(으)시-"는 문장의 주어를 높이는 선어말 어미예요. 선생님, 부모님, 조부모님, 손님, 사장님처럼 높여야 하는 사람이 어떤 행동을 하거나 어떤 상태에 있을 때 사용해요. 어간에 받침이 없으면 "-시-"를 붙이고, 받침이 있으면 "-으시-"를 붙여요. "가다 → 가시다", "오다 → 오시다", "읽다 → 읽으시다", "좋다 → 좋으시다"처럼 만들어요. 실제 해요체에서는 "-시어요"가 줄어서 "-세요"가 되는 경우가 많아서 "가세요", "오세요", "읽으세요", "좋으세요"처럼 사용해요. ㄹ 받침은 "-시-" 앞에서 탈락해서 "살다 → 사세요", "만들다 → 만드세요"처럼 변해요. 일부 동사는 일반적인 "-(으)시-" 대신 특별한 높임말을 사용하기도 해요. 예를 들어 "있다 → 계시다", "먹다 → 드시다"가 대표적이에요.',
      uz: '"-(으)시-" gap egasiga hurmat ko‘rsatadigan qo‘shimchadir. O‘qituvchi, ota-ona, bobo-buvi, mehmon yoki rahbar kabi hurmat qilinadigan odamning harakati yoki holatini aytganda ishlatiladi. Fe’l yoki sifat negizi unli bilan tugasa "-시-", undosh bilan tugasa "-으시-" qo‘shiladi. Masalan, "가다 → 가시다", "읽다 → 읽으시다". Oddiy muloyim nutqda bu shakllar ko‘pincha "가세요", "읽으세요" ko‘rinishida paydo bo‘ladi. ㄹ bilan tugagan negizlarda ㄹ tushadi: "살다 → 사세요". Ayrim fe’llarda maxsus hurmat shakllari mavjud: "있다 → 계시다", "먹다 → 드시다".',
      en: '"-(으)시-" is a subject-honorific marker. It is used when a respected subject such as a teacher, parent, grandparent, guest, or boss performs an action or has a certain state. Add -시- after a vowel-ending stem and -으시- after most consonant-ending stems: 가다 → 가시다, 읽다 → 읽으시다. In polite -어요 speech, these commonly appear as 가세요, 오세요, 읽으세요, and 좋으세요. A final ㄹ drops before -시-, as in 살다 → 사세요 and 만들다 → 만드세요. Some verbs also have special honorific forms, such as 있다 → 계시다 and 먹다 → 드시다.',
      ru: '"-(으)시-" — показатель уважения к субъекту предложения. Он используется, когда действие выполняет или состояние испытывает уважаемый человек: учитель, родитель, бабушка или дедушка, гость, начальник и т. д. После основы на гласную добавляется -시-, после большинства согласных — -으시-: 가다 → 가시다, 읽다 → 읽으시다. В вежливом стиле на -어요 формы обычно выглядят как 가세요, 오세요, 읽으세요, 좋으세요. Конечный ㄹ перед -시- выпадает: 살다 → 사세요, 만들다 → 만드세요. У некоторых глаголов есть специальные уважительные формы: 있다 → 계시다, 먹다 → 드시다.',
    },

    conjugationRule: {
      ko: '받침 없음 + 시 → 가다 → 가세요  ·  받침 있음 + 으시 → 읽다 → 읽으세요  ·  ㄹ 받침 + 시 → ㄹ 탈락: 살다 → 사세요  ·  일부 특별 높임말: 있다 → 계시다, 먹다 → 드시다',
      uz: 'Unli bilan tugasa + 시 → 가다 → 가세요  ·  undosh bilan tugasa + 으시 → 읽다 → 읽으세요  ·  ㄹ + 시 → ㄹ tushadi: 살다 → 사세요  ·  maxsus shakllar: 있다 → 계시다, 먹다 → 드시다',
      en: 'Vowel-ending stem + 시 → 가다 → 가세요  ·  consonant-ending stem + 으시 → 읽다 → 읽으세요  ·  final ㄹ drops before 시: 살다 → 사세요  ·  special honorifics include 있다 → 계시다 and 먹다 → 드시다',
      ru: 'Основа на гласную + 시 → 가다 → 가세요  ·  основа на согласную + 으시 → 읽다 → 읽으세요  ·  конечный ㄹ перед 시 выпадает: 살다 → 사세요  ·  особые формы: 있다 → 계시다, 먹다 → 드시다',
    },

    conjugations: [
      {
        base: '가다',
        result: '가세요',
      },
      {
        base: '오다',
        result: '오세요',
      },
      {
        base: '하다',
        result: '하세요',
      },
      {
        base: '보다',
        result: '보세요',
      },
      {
        base: '읽다',
        result: '읽으세요',
      },
      {
        base: '앉다',
        result: '앉으세요',
      },
      {
        base: '좋다',
        result: '좋으세요',
      },
      {
        base: '살다',
        result: '사세요',
      },
      {
        base: '만들다',
        result: '만드세요',
      },
      {
        base: '있다',
        result: '계세요',
      },
    ],

    examples: [
      {
        ko: '선생님이 교실에 가세요.',
        highlight: '가세요',
        gloss: {
          ko: '선생님이 교실에 가세요.',
          uz: 'O‘qituvchi sinfga boradi.',
          en: 'The teacher goes to the classroom.',
          ru: 'Учитель идёт в класс.',
        },
      },
      {
        ko: '어머니가 집에 오세요.',
        highlight: '오세요',
        gloss: {
          ko: '어머니가 집에 오세요.',
          uz: 'Onam uyga keladi.',
          en: 'My mother comes home.',
          ru: 'Моя мама приходит домой.',
        },
      },
      {
        ko: '아버지가 신문을 읽으세요.',
        highlight: '읽으세요',
        gloss: {
          ko: '아버지가 신문을 읽으세요.',
          uz: 'Otam gazeta o‘qiydi.',
          en: 'My father reads the newspaper.',
          ru: 'Мой отец читает газету.',
        },
      },
      {
        ko: '할머니가 방에서 쉬세요.',
        highlight: '쉬세요',
        gloss: {
          ko: '할머니가 방에서 쉬세요.',
          uz: 'Buvim xonada dam oladi.',
          en: 'My grandmother rests in the room.',
          ru: 'Моя бабушка отдыхает в комнате.',
        },
      },
      {
        ko: '선생님이 한국어를 가르치세요.',
        highlight: '가르치세요',
        gloss: {
          ko: '선생님이 한국어를 가르치세요.',
          uz: 'O‘qituvchi koreys tilidan dars beradi.',
          en: 'The teacher teaches Korean.',
          ru: 'Учитель преподаёт корейский язык.',
        },
      },
      {
        ko: '할아버지가 공원에서 걸으세요.',
        highlight: '걸으세요',
        gloss: {
          ko: '할아버지가 공원에서 걸으세요.',
          uz: 'Bobom bog‘da piyoda yuradi.',
          en: 'My grandfather walks in the park.',
          ru: 'Мой дедушка гуляет в парке.',
        },
      },
      {
        ko: '사장님이 매일 일찍 오세요.',
        highlight: '오세요',
        gloss: {
          ko: '사장님이 매일 일찍 오세요.',
          uz: 'Direktor har kuni erta keladi.',
          en: 'The company president comes early every day.',
          ru: 'Директор каждый день приходит рано.',
        },
      },
      {
        ko: '부모님은 서울에 사세요.',
        highlight: '사세요',
        gloss: {
          ko: '부모님은 서울에 사세요.',
          uz: 'Ota-onam Seulda yashaydi.',
          en: 'My parents live in Seoul.',
          ru: 'Мои родители живут в Сеуле.',
        },
      },
      {
        ko: '선생님은 지금 교실에 계세요.',
        highlight: '계세요',
        gloss: {
          ko: '선생님은 지금 교실에 계세요.',
          uz: 'O‘qituvchi hozir sinfda.',
          en: 'The teacher is in the classroom now.',
          ru: 'Учитель сейчас в классе.',
        },
      },
      {
        ko: '할아버지가 점심을 드세요.',
        highlight: '드세요',
        gloss: {
          ko: '할아버지가 점심을 드세요.',
          uz: 'Bobom tushlik qiladi.',
          en: 'My grandfather eats lunch.',
          ru: 'Мой дедушка обедает.',
        },
      },
      {
        ko: '어머니가 저녁을 준비하세요.',
        highlight: '준비하세요',
        gloss: {
          ko: '어머니가 저녁을 준비하세요.',
          uz: 'Onam kechki ovqatni tayyorlaydi.',
          en: 'My mother prepares dinner.',
          ru: 'Моя мама готовит ужин.',
        },
      },
      {
        ko: '교수님이 새 책을 만드세요.',
        highlight: '만드세요',
        gloss: {
          ko: '교수님이 새 책을 만드세요.',
          uz: 'Professor yangi kitob tayyorlaydi.',
          en: 'The professor is making a new book.',
          ru: 'Профессор создаёт новую книгу.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '선생님은 지금 어디에 계세요?',
        highlight: '어디에 계세요',
        gloss: {
          ko: '선생님은 지금 어디에 계세요?',
          uz: 'O‘qituvchi hozir qayerda?',
          en: 'Where is the teacher now?',
          ru: 'Где сейчас учитель?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '교실에 계세요.',
        highlight: '계세요',
        gloss: {
          ko: '교실에 계세요.',
          uz: 'Sinfda.',
          en: 'The teacher is in the classroom.',
          ru: 'В классе.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '부모님은 어디에 사세요?',
        highlight: '어디에 사세요',
        gloss: {
          ko: '부모님은 어디에 사세요?',
          uz: 'Ota-onangiz qayerda yashaydi?',
          en: 'Where do your parents live?',
          ru: 'Где живут ваши родители?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '서울에 사세요.',
        highlight: '서울에 사세요',
        gloss: {
          ko: '서울에 사세요.',
          uz: 'Seulda yashaydi.',
          en: 'They live in Seoul.',
          ru: 'Они живут в Сеуле.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '할아버지는 아침에 뭐 하세요?',
        highlight: '뭐 하세요',
        gloss: {
          ko: '할아버지는 아침에 뭐 하세요?',
          uz: 'Bobongiz ertalab nima qiladi?',
          en: 'What does your grandfather do in the morning?',
          ru: 'Что ваш дедушка делает утром?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '공원에서 운동하세요.',
        highlight: '운동하세요',
        gloss: {
          ko: '공원에서 운동하세요.',
          uz: 'Bog‘da sport bilan shug‘ullanadi.',
          en: 'He exercises in the park.',
          ru: 'Он занимается спортом в парке.',
        },
      },
    ],

    similar: {
      pattern: 'V-(으)세요',
      note: {
        ko: '"-(으)시-"의 해요체 형태와 부탁·명령의 "V-(으)세요"는 겉모양이 같을 수 있어요. "선생님이 학교에 가세요"는 선생님의 행동을 높여 설명하는 문장이고, "학교에 가세요"는 듣는 사람에게 학교에 가라고 공손하게 요청하는 문장이 될 수 있어요. 주어와 상황을 보고 의미를 구별해야 해요.',
        uz: '"-(으)시-"ning muloyim shakli va iltimos-buyruq "V-(으)세요" tashqi ko‘rinishda bir xil bo‘lishi mumkin. "선생님이 학교에 가세요" o‘qituvchining harakatini hurmat bilan tasvirlaydi, "학교에 가세요" esa tinglovchiga maktabga borishni muloyim so‘rashi mumkin. Ma’no ega va vaziyatga qarab aniqlanadi.',
        en: 'The polite form of -(으)시- can look identical to the request form V-(으)세요. 선생님이 학교에 가세요 describes the teacher’s action honorifically, while 학교에 가세요 can be a polite request telling the listener to go to school. Use the subject and context to distinguish them.',
        ru: 'Вежливая форма -(으)시- может выглядеть так же, как просьба V-(으)세요. 선생님이 학교에 가세요 уважительно описывает действие учителя, а 학교에 가세요 может быть просьбой к собеседнику пойти в школу. Значение определяется по субъекту и контексту.',
      },
    },

    cautions: [
      {
        ko: '"-(으)시-"는 주어를 높이는 표현이에요. 단순히 문장을 더 공손하게 만들기 위해 아무 동사에나 붙이는 것은 아니에요.',
        uz: '"-(으)시-" gap egasiga hurmat bildiradi. Uni shunchaki gapni yanada muloyim qilish uchun har qanday fe’lga qo‘shib bo‘lmaydi.',
        en: '-(으)시- honors the subject. It should not be added to every verb simply to make a sentence more polite.',
        ru: '-(으)시- выражает уважение к субъекту, а не просто делает любое предложение более вежливым.',
      },
      {
        ko: '자기 자신의 행동에는 보통 "-(으)시-"를 사용하지 않아요. "저는 학교에 가세요"가 아니라 "저는 학교에 가요"라고 말해요.',
        uz: 'O‘z harakatingiz haqida odatda "-(으)시-" ishlatmaysiz. "저는 학교에 가세요" emas, "저는 학교에 가요".',
        en: 'Do not normally use -(으)시- for your own actions. Say 저는 학교에 가요, not 저는 학교에 가세요.',
        ru: 'Обычно -(으)시- не используется для собственных действий. Правильно: 저는 학교에 가요.',
      },
      {
        ko: 'ㄹ 받침은 "-시-" 앞에서 탈락해요. "살으세요"가 아니라 "사세요", "만들으세요"가 아니라 "만드세요"예요.',
        uz: 'ㄹ undoshi "-시-" oldidan tushadi. "살으세요" emas "사세요", "만들으세요" emas "만드세요".',
        en: 'Final ㄹ drops before -시-. Say 사세요, not 살으세요, and 만드세요, not 만들으세요.',
        ru: 'Конечный ㄹ перед -시- выпадает: 사세요, а не 살으세요; 만드세요, а не 만들으세요.',
      },
      {
        ko: '"있다"는 사람을 높일 때 일반적으로 "있으세요"보다 특별 높임말 "계세요"를 많이 사용해요.',
        uz: 'Odam haqida hurmat bilan gapirganda "있다" uchun odatda "있으세요" emas, maxsus "계세요" shakli ishlatiladi.',
        en: 'When honorifying a person with 있다, the special form 계세요 is normally preferred over 있으세요.',
        ru: 'Для уважительной формы 있다 по отношению к человеку обычно используется специальная форма 계세요, а не 있으세요.',
      },
      {
        ko: '"먹다"도 높임 상황에서는 "먹으세요"보다 특별 높임말 "드세요"를 사용하는 경우가 많아요. 다만 "먹으세요"는 상대방에게 먹으라고 권하거나 요청하는 표현으로 자연스럽게 쓰일 수 있어요.',
        uz: 'Hurmat ma’nosida "먹다" uchun ko‘pincha maxsus "드세요" ishlatiladi. Ammo "먹으세요" tinglovchiga ovqatlanishni taklif yoki iltimos qilishda tabiiy ishlatilishi mumkin.',
        en: 'For the honorific meaning of 먹다, 드세요 is commonly used. However, 먹으세요 is still natural as a polite request or invitation telling the listener to eat.',
        ru: 'Для уважительного значения 먹다 часто используется специальная форма 드세요. Однако 먹으세요 естественно употребляется как вежливая просьба или предложение поесть.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"선생님이 학교에 ___."에 알맞은 높임 표현을 고르세요.',
          uz: '"선생님이 학교에 ___." uchun mos hurmat shaklini tanlang.',
          en: 'Choose the correct honorific form for "선생님이 학교에 ___."',
          ru: 'Выберите правильную уважительную форму для "선생님이 학교에 ___."',
        },
        options: [
          { text: '가세요', correct: true },
          { text: '가으세요', correct: false },
          { text: '가시어요요', correct: false },
        ],
      },
      {
        question: {
          ko: '"읽다"의 주체 높임 형태를 고르세요.',
          uz: '"읽다" fe’lining hurmat shaklini tanlang.',
          en: 'Choose the subject-honorific form of 읽다.',
          ru: 'Выберите уважительную форму глагола 읽다.',
        },
        options: [
          { text: '읽으세요', correct: true },
          { text: '읽세요', correct: false },
          { text: '읽시어요', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다"의 올바른 높임 활용을 고르세요.',
          uz: '"살다"ning to‘g‘ri hurmat shaklini tanlang.',
          en: 'Choose the correct honorific conjugation of 살다.',
          ru: 'Выберите правильную уважительную форму 살다.',
        },
        options: [
          { text: '사세요', correct: true },
          { text: '살으세요', correct: false },
          { text: '살세요', correct: false },
        ],
      },
      {
        question: {
          ko: '사람의 "있다"를 높일 때 가장 자연스러운 표현은?',
          uz: 'Odamga nisbatan "있다"ning eng tabiiy hurmat shakli qaysi?',
          en: 'What is the most natural honorific form of 있다 when referring to a person?',
          ru: 'Какая форма 있다 наиболее естественна при уважительном упоминании человека?',
        },
        options: [
          { text: '계세요', correct: true },
          { text: '있세요', correct: false },
          { text: '있시어요', correct: false },
        ],
      },
      {
        question: {
          ko: '다음 중 자기 자신의 행동을 자연스럽게 말한 문장을 고르세요.',
          uz: 'O‘z harakatingiz haqida tabiiy gapni tanlang.',
          en: 'Choose the natural sentence for talking about your own action.',
          ru: 'Выберите естественное предложение о собственном действии.',
        },
        options: [
          { text: '저는 매일 학교에 가요.', correct: true },
          { text: '저는 매일 학교에 가세요.', correct: false },
          { text: '저는 매일 학교에 가으세요.', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-5. 시간 표현 N시 N분 ─────────
  {
    code: 'time-si-bun',
    pattern: '시간 (N시 N분)',
    section: 2,
    unit: 2,
    order: 5,
    isActive: true,

    summary: {
      ko: '현재 시간이나 약속 시간을 말할 때 사용해요. "시" 앞에는 고유어 숫자, "분" 앞에는 한자어 숫자를 써요.',
      uz: 'Hozirgi vaqt yoki uchrashuv vaqtini aytishda ishlatiladi. "시" oldidan koreyscha sonlar, "분" oldidan esa sino-koreys sonlari keladi.',
      en: 'Used to tell the current time or an appointment time. Native Korean numbers are used with 시, while Sino-Korean numbers are used with 분.',
      ru: 'Используется для обозначения текущего времени или времени встречи. Перед 시 используются исконно корейские числа, а перед 분 — китайско-корейские.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '시간', uz: 'Vaqt', en: 'Time', ru: 'Время' },
      { ko: '약속', uz: 'Uchrashuv', en: 'Appointments', ru: 'Встречи' },
    ],

    explanation: {
      ko: '시계의 시간을 말할 때는 "몇 시", "몇 시 몇 분" 형태를 사용해요. 시간의 "시" 앞에는 하나, 둘, 셋 같은 고유어 숫자를 사용하지만 형태가 조금 바뀌어요. 하나는 "한 시", 둘은 "두 시", 셋은 "세 시", 넷은 "네 시"가 돼요. 분은 일, 이, 삼 같은 한자어 숫자를 사용해서 "십 분", "이십오 분"처럼 말해요. 오전과 오후를 붙이면 아침과 낮 이후의 시간을 구별할 수 있어요. 정확히 30분일 때는 "삼십 분" 대신 "반"을 사용해서 "두 시 반"처럼 말하는 것도 아주 자연스러워요.',
      uz: 'Soat vaqtini aytishda "몇 시" yoki "몇 시 몇 분" shakli ishlatiladi. "시" oldidan 하나, 둘, 셋 kabi sof koreys sonlari keladi, lekin ayrimlari qisqaradi: 하나 → 한 시, 둘 → 두 시, 셋 → 세 시, 넷 → 네 시. Daqiqa uchun esa sino-koreys sonlari ishlatiladi: 십 분, 이십오 분 kabi. 오전 va 오후 yordamida ertalabki va tushdan keyingi vaqt ajratiladi. 30 daqiqa uchun "삼십 분" o‘rniga "반" ham juda ko‘p ishlatiladi.',
      en: 'Clock time is expressed with forms such as 몇 시 and 몇 시 몇 분. Hours use Native Korean numbers, with special shortened forms: 하나 → 한 시, 둘 → 두 시, 셋 → 세 시, 넷 → 네 시. Minutes use Sino-Korean numbers, such as 십 분 and 이십오 분. 오전 and 오후 distinguish a.m. and p.m. For thirty minutes past the hour, 반 is also very commonly used, as in 두 시 반.',
      ru: 'Время на часах выражается конструкциями 몇 시 и 몇 시 몇 분. Для часов используются исконно корейские числа, причём некоторые формы сокращаются: 하나 → 한 시, 둘 → 두 시, 셋 → 세 시, 넷 → 네 시. Для минут используются китайско-корейские числа: 십 분, 이십오 분. 오전 и 오후 помогают различать время до и после полудня. Для 30 минут часто используется 반: 두 시 반.',
    },

    conjugationRule: {
      ko: '고유어 숫자 + 시 · 한자어 숫자 + 분 · 오전/오후 + 시간 · 30분 = 반',
      uz: 'Sof koreys soni + 시 · Sino-koreys soni + 분 · 오전/오후 + vaqt · 30 daqiqa = 반',
      en: 'Native Korean number + 시 · Sino-Korean number + 분 · 오전/오후 + time · 30 minutes = 반',
      ru: 'Исконно корейское число + 시 · Китайско-корейское число + 분 · 오전/오후 + время · 30 минут = 반',
    },

    conjugations: [
      { base: '하나 + 시', result: '한 시' },
      { base: '둘 + 시', result: '두 시' },
      { base: '셋 + 시', result: '세 시' },
      { base: '넷 + 시', result: '네 시' },
      { base: '다섯 + 시', result: '다섯 시' },
      { base: '열둘 + 시', result: '열두 시' },
      { base: '10 + 분', result: '십 분' },
      { base: '25 + 분', result: '이십오 분' },
      { base: '2시 + 30분', result: '두 시 반' },
    ],

    examples: [
      {
        ko: '지금 세 시예요.',
        highlight: '세 시',
        gloss: {
          ko: '지금 세 시예요.',
          uz: 'Hozir soat uch.',
          en: 'It is three o’clock now.',
          ru: 'Сейчас три часа.',
        },
      },
      {
        ko: '지금 몇 시예요?',
        highlight: '몇 시',
        gloss: {
          ko: '지금 몇 시예요?',
          uz: 'Hozir soat necha?',
          en: 'What time is it now?',
          ru: 'Который сейчас час?',
        },
      },
      {
        ko: '지금 네 시 십오 분이에요.',
        highlight: '네 시 십오 분',
        gloss: {
          ko: '지금 네 시 십오 분이에요.',
          uz: 'Hozir soat to‘rtdan o‘n besh daqiqa o‘tdi.',
          en: 'It is 4:15 now.',
          ru: 'Сейчас 4:15.',
        },
      },
      {
        ko: '수업은 아홉 시에 시작해요.',
        highlight: '아홉 시',
        gloss: {
          ko: '수업은 아홉 시에 시작해요.',
          uz: 'Dars soat to‘qqizda boshlanadi.',
          en: 'Class starts at nine.',
          ru: 'Урок начинается в девять.',
        },
      },
      {
        ko: '우리 두 시 반에 만나요.',
        highlight: '두 시 반',
        gloss: {
          ko: '우리 두 시 반에 만나요.',
          uz: 'Keling, soat ikki yarimda uchrashamiz.',
          en: 'Let’s meet at 2:30.',
          ru: 'Давай встретимся в половине третьего.',
        },
      },
      {
        ko: '영화는 오후 일곱 시에 시작해요.',
        highlight: '오후 일곱 시',
        gloss: {
          ko: '영화는 오후 일곱 시에 시작해요.',
          uz: 'Film kechki soat yettida boshlanadi.',
          en: 'The movie starts at 7 p.m.',
          ru: 'Фильм начинается в семь вечера.',
        },
      },
      {
        ko: '저는 오전 여덟 시에 회사에 가요.',
        highlight: '오전 여덟 시',
        gloss: {
          ko: '저는 오전 여덟 시에 회사에 가요.',
          uz: 'Men ertalab soat sakkizda ishga boraman.',
          en: 'I go to work at 8 a.m.',
          ru: 'Я иду на работу в восемь утра.',
        },
      },
      {
        ko: '약속 시간이 몇 시예요?',
        highlight: '몇 시',
        gloss: {
          ko: '약속 시간이 몇 시예요?',
          uz: 'Uchrashuv soat nechada?',
          en: 'What time is the appointment?',
          ru: 'Во сколько встреча?',
        },
      },
      {
        ko: '열두 시 십 분에 식당 앞에서 만나요.',
        highlight: '열두 시 십 분',
        gloss: {
          ko: '열두 시 십 분에 식당 앞에서 만나요.',
          uz: 'Soat 12:10 da restoran oldida uchrashamiz.',
          en: 'Let’s meet in front of the restaurant at 12:10.',
          ru: 'Давай встретимся перед рестораном в 12:10.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '우리 내일 몇 시에 만날까요?',
        highlight: '몇 시',
        gloss: {
          ko: '우리 내일 몇 시에 만날까요?',
          uz: 'Ertaga soat nechada uchrashamiz?',
          en: 'What time shall we meet tomorrow?',
          ru: 'Во сколько встретимся завтра?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '오후 두 시 어때요?',
        highlight: '오후 두 시',
        gloss: {
          ko: '오후 두 시 어때요?',
          uz: 'Kunduzgi soat ikki qanday?',
          en: 'How about 2 p.m.?',
          ru: 'Как насчёт двух часов дня?',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '두 시는 조금 바빠요. 세 시 반은 어때요?',
        highlight: '세 시 반',
        gloss: {
          ko: '두 시는 조금 바빠요. 세 시 반은 어때요?',
          uz: 'Soat ikkida biroz bandman. Uch yarim qanday?',
          en: 'I’m a little busy at two. How about 3:30?',
          ru: 'В два я немного занят. Как насчёт половины четвёртого?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '좋아요. 세 시 반에 만나요.',
        highlight: '세 시 반',
        gloss: {
          ko: '좋아요. 세 시 반에 만나요.',
          uz: 'Yaxshi. Uch yarimda uchrashamiz.',
          en: 'Great. Let’s meet at 3:30.',
          ru: 'Хорошо. Встретимся в половине четвёртого.',
        },
      },
    ],

    similar: {
      pattern: '시 vs 시간',
      note: {
        ko: '"시"는 시계의 특정 시간을 말하고, "시간"은 얼마나 오래 걸리는지 말해요. "한 시"는 1:00이고, "한 시간"은 60분이라는 뜻이에요.',
        uz: '"시" aniq soat vaqtini, "시간" esa davomiylikni bildiradi. "한 시" — soat 1:00, "한 시간" — bir soat davomiylik.',
        en: '시 indicates a clock time, while 시간 indicates duration. 한 시 means 1:00, but 한 시간 means one hour.',
        ru: '시 обозначает конкретное время на часах, а 시간 — продолжительность. 한 시 — это 1:00, а 한 시간 — один час.',
      },
    },

    cautions: [
      {
        ko: '"한 시"와 "한 시간"은 달라요. "한 시"는 1:00이고 "한 시간"은 60분 동안이라는 뜻이에요.',
        uz: '"한 시" va "한 시간" bir xil emas. Birinchisi 1:00, ikkinchisi 60 daqiqalik davomiylik.',
        en: '한 시 and 한 시간 are different. 한 시 means 1:00, while 한 시간 means a duration of one hour.',
        ru: '한 시 и 한 시간 имеют разное значение: первое — 1:00, второе — продолжительность в один час.',
      },
      {
        ko: '"하나 시, 둘 시, 셋 시"라고 하지 않고 "한 시, 두 시, 세 시"라고 해요.',
        uz: '"하나 시, 둘 시, 셋 시" emas, "한 시, 두 시, 세 시" deyiladi.',
        en: 'Do not say 하나 시, 둘 시, 셋 시. Use 한 시, 두 시, 세 시.',
        ru: 'Не говорят 하나 시, 둘 시, 셋 시. Нужно 한 시, 두 시, 세 시.',
      },
      {
        ko: '분 앞에는 고유어 숫자가 아니라 한자어 숫자를 사용해요. "두 시 이십 분"이 맞아요.',
        uz: '분 oldidan sof koreys sonlari emas, sino-koreys sonlari ishlatiladi.',
        en: 'Minutes use Sino-Korean numbers, not Native Korean numbers.',
        ru: 'Для минут используются китайско-корейские числа, а не исконно корейские.',
      },
      {
        ko: '오전/오후를 사용하면 약속 시간을 더 정확하게 전달할 수 있어요. 특히 7시처럼 아침인지 저녁인지 헷갈릴 수 있을 때 유용해요.',
        uz: '오전/오후 vaqtni aniqroq ko‘rsatadi, ayniqsa ertalab va kechqurun chalkashishi mumkin bo‘lgan paytda.',
        en: 'Using 오전 or 오후 makes appointment times clearer, especially when the hour could mean either morning or evening.',
        ru: '오전 и 오후 помогают избежать неоднозначности между утренним и вечерним временем.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '1:00을 한국어로 어떻게 말해요?',
          uz: '1:00 koreys tilida qanday aytiladi?',
          en: 'How do you say 1:00 in Korean?',
          ru: 'Как сказать 1:00 по-корейски?',
        },
        options: [
          { text: '한 시', correct: true },
          { text: '하나 시', correct: false },
          { text: '일 시', correct: false },
        ],
      },
      {
        question: {
          ko: '3:20을 알맞게 표현한 것을 고르세요.',
          uz: '3:20 ni to‘g‘ri ifodalagan javobni tanlang.',
          en: 'Choose the correct expression for 3:20.',
          ru: 'Выберите правильное выражение для 3:20.',
        },
        options: [
          { text: '세 시 이십 분', correct: true },
          { text: '삼 시 스무 분', correct: false },
          { text: '셋 시 이십 분', correct: false },
        ],
      },
      {
        question: {
          ko: '"두 시 반"은 몇 시예요?',
          uz: '"두 시 반" qaysi vaqt?',
          en: 'What time is 두 시 반?',
          ru: 'Который час означает 두 시 반?',
        },
        options: [
          { text: '2:30', correct: true },
          { text: '2:15', correct: false },
          { text: '3:30', correct: false },
        ],
      },
      {
        question: {
          ko: '60분 동안을 의미하는 표현은 무엇이에요?',
          uz: '60 daqiqa davomiylikni qaysi ifoda bildiradi?',
          en: 'Which expression means a duration of 60 minutes?',
          ru: 'Какое выражение означает продолжительность 60 минут?',
        },
        options: [
          { text: '한 시간', correct: true },
          { text: '한 시', correct: false },
          { text: '일 분', correct: false },
        ],
      },
      {
        question: {
          ko: '빈칸에 알맞은 것을 고르세요. "영화는 오후 일곱 ___ 시작해요."',
          uz: 'Bo‘sh joyga mos javobni tanlang.',
          en: 'Choose the correct answer: "영화는 오후 일곱 ___ 시작해요."',
          ru: 'Выберите правильный вариант: "영화는 오후 일곱 ___ 시작해요."',
        },
        options: [
          { text: '시에', correct: true },
          { text: '분에', correct: false },
          { text: '시간에', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-6. 시작과 끝 N부터 N까지 ─────────
  {
    code: 'range-buteo-kkaji',
    pattern: 'N부터 N까지',
    section: 2,
    unit: 2,
    order: 6,
    isActive: true,

    summary: {
      ko: '"어디서부터 어디까지", "언제부터 언제까지"처럼 시작점과 끝점을 함께 말할 때 사용해요.',
      uz: 'Boshlanish va tugash nuqtasini birga ko‘rsatadi: qachondan qachongacha yoki qayerdan qayergacha.',
      en: 'Expresses a starting point and an ending point, such as from what time to what time or from where to where.',
      ru: 'Показывает начальную и конечную точку: с какого времени до какого или откуда докуда.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '시간', uz: 'Vaqt', en: 'Time', ru: 'Время' },
      { ko: '범위', uz: 'Oraliq', en: 'Range', ru: 'Диапазон' },
    ],

    explanation: {
      ko: '"부터"는 시작점을 나타내고 "까지"는 끝점을 나타내요. 이 단원에서는 특히 시간과 일정의 범위를 말할 때 많이 사용해요. "아홉 시부터 다섯 시까지 일해요"라고 하면 일이 9시에 시작해서 5시에 끝난다는 뜻이에요. 날짜나 요일에도 사용할 수 있어서 "월요일부터 금요일까지"처럼 말할 수 있어요. 장소에도 사용할 수 있지만 이동의 출발 장소를 말할 때는 "서울에서 부산까지"처럼 "에서"를 사용하는 표현도 매우 흔해요.',
      uz: '"부터" boshlanish nuqtasini, "까지" esa tugash nuqtasini bildiradi. Bu darsda ayniqsa vaqt va jadval oralig‘ini aytishda ishlatiladi. "아홉 시부터 다섯 시까지 일해요" — ish soat 9 da boshlanib 5 da tugashini anglatadi. Kun va sanalar bilan ham ishlatiladi.',
      en: '부터 marks the starting point and 까지 marks the ending point. In this lesson it is especially useful for schedules and time ranges. 아홉 시부터 다섯 시까지 일해요 means that work starts at nine and ends at five. It can also be used with days and dates, such as 월요일부터 금요일까지. With travel routes, 에서...까지 is also very common.',
      ru: '부터 обозначает начало, а 까지 — конец диапазона. В этом уроке конструкция особенно полезна для расписания и времени. 아홉 시부터 다섯 시까지 일해요 означает, что работа начинается в девять и заканчивается в пять. Конструкцию можно использовать также с днями недели и датами.',
    },

    conjugationRule: {
      ko: '시작점 + 부터 + 끝점 + 까지 · 시간/요일/날짜/장소 등에 사용',
      uz: 'Boshlanish + 부터 + tugash + 까지 · vaqt, kun, sana va joy bilan ishlatiladi',
      en: 'Starting point + 부터 + ending point + 까지 · used with time, days, dates, places, etc.',
      ru: 'Начало + 부터 + конец + 까지 · используется со временем, днями, датами и местами',
    },

    conjugations: [
      { base: '9시 → 5시', result: '아홉 시부터 다섯 시까지' },
      { base: '월요일 → 금요일', result: '월요일부터 금요일까지' },
      { base: '오늘 → 내일', result: '오늘부터 내일까지' },
      { base: '1월 → 3월', result: '1월부터 3월까지' },
      { base: '아침 → 저녁', result: '아침부터 저녁까지' },
      { base: '서울 → 부산', result: '서울부터 부산까지' },
      { base: '여기 → 학교', result: '여기부터 학교까지' },
    ],

    examples: [
      {
        ko: '저는 아홉 시부터 여섯 시까지 일해요.',
        highlight: '아홉 시부터 여섯 시까지',
        gloss: {
          ko: '저는 아홉 시부터 여섯 시까지 일해요.',
          uz: 'Men soat to‘qqizdan oltigacha ishlayman.',
          en: 'I work from nine to six.',
          ru: 'Я работаю с девяти до шести.',
        },
      },
      {
        ko: '수업은 열 시부터 열두 시까지예요.',
        highlight: '열 시부터 열두 시까지',
        gloss: {
          ko: '수업은 열 시부터 열두 시까지예요.',
          uz: 'Dars soat o‘ndan o‘n ikkigacha.',
          en: 'The class is from ten to twelve.',
          ru: 'Занятие идёт с десяти до двенадцати.',
        },
      },
      {
        ko: '도서관은 오전 아홉 시부터 오후 여섯 시까지 열어요.',
        highlight: '오전 아홉 시부터 오후 여섯 시까지',
        gloss: {
          ko: '도서관은 오전 아홉 시부터 오후 여섯 시까지 열어요.',
          uz: 'Kutubxona ertalab soat to‘qqizdan kechki oltigacha ochiq.',
          en: 'The library is open from 9 a.m. to 6 p.m.',
          ru: 'Библиотека открыта с девяти утра до шести вечера.',
        },
      },
      {
        ko: '저는 월요일부터 금요일까지 학교에 가요.',
        highlight: '월요일부터 금요일까지',
        gloss: {
          ko: '저는 월요일부터 금요일까지 학교에 가요.',
          uz: 'Men dushanbadan jumagacha maktabga boraman.',
          en: 'I go to school from Monday through Friday.',
          ru: 'Я хожу в школу с понедельника по пятницу.',
        },
      },
      {
        ko: '오늘부터 운동을 시작해요.',
        highlight: '오늘부터',
        gloss: {
          ko: '오늘부터 운동을 시작해요.',
          uz: 'Bugundan boshlab sport bilan shug‘ullanishni boshlayman.',
          en: 'I start exercising today.',
          ru: 'С сегодняшнего дня я начинаю заниматься спортом.',
        },
      },
      {
        ko: '내일까지 숙제를 해야 해요.',
        highlight: '내일까지',
        gloss: {
          ko: '내일까지 숙제를 해야 해요.',
          uz: 'Uy vazifasini ertagacha qilishim kerak.',
          en: 'I have to finish the homework by tomorrow.',
          ru: 'Мне нужно сделать домашнее задание до завтра.',
        },
      },
      {
        ko: '아침부터 저녁까지 비가 와요.',
        highlight: '아침부터 저녁까지',
        gloss: {
          ko: '아침부터 저녁까지 비가 와요.',
          uz: 'Ertalabdan kechgacha yomg‘ir yog‘adi.',
          en: 'It rains from morning until evening.',
          ru: 'Дождь идёт с утра до вечера.',
        },
      },
      {
        ko: '여기부터 학교까지 걸어서 십 분 걸려요.',
        highlight: '여기부터 학교까지',
        gloss: {
          ko: '여기부터 학교까지 걸어서 십 분 걸려요.',
          uz: 'Bu yerdan maktabgacha piyoda o‘n daqiqa.',
          en: 'It takes ten minutes to walk from here to school.',
          ru: 'Отсюда до школы десять минут пешком.',
        },
      },
      {
        ko: '점심시간은 열두 시부터 한 시까지예요.',
        highlight: '열두 시부터 한 시까지',
        gloss: {
          ko: '점심시간은 열두 시부터 한 시까지예요.',
          uz: 'Tushlik vaqti soat o‘n ikkidan birgacha.',
          en: 'Lunch break is from twelve to one.',
          ru: 'Обеденный перерыв с двенадцати до часу.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '은행은 몇 시부터 몇 시까지 해요?',
        highlight: '몇 시부터 몇 시까지',
        gloss: {
          ko: '은행은 몇 시부터 몇 시까지 해요?',
          uz: 'Bank soat nechadan nechagacha ishlaydi?',
          en: 'What hours is the bank open?',
          ru: 'С какого до какого часа работает банк?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아홉 시부터 네 시까지 해요.',
        highlight: '아홉 시부터 네 시까지',
        gloss: {
          ko: '아홉 시부터 네 시까지 해요.',
          uz: 'Soat to‘qqizdan to‘rtgacha.',
          en: 'It is open from nine to four.',
          ru: 'С девяти до четырёх.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '토요일에도 해요?',
        highlight: '토요일',
        gloss: {
          ko: '토요일에도 해요?',
          uz: 'Shanba kuni ham ishlaydimi?',
          en: 'Is it open on Saturday too?',
          ru: 'В субботу тоже работает?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아니요. 월요일부터 금요일까지 해요.',
        highlight: '월요일부터 금요일까지',
        gloss: {
          ko: '아니요. 월요일부터 금요일까지 해요.',
          uz: 'Yo‘q. Dushanbadan jumagacha ishlaydi.',
          en: 'No. It is open Monday through Friday.',
          ru: 'Нет. Работает с понедельника по пятницу.',
        },
      },
    ],

    similar: {
      pattern: 'N에 / N에서',
      note: {
        ko: '"에"는 특정 시점을 나타내고 "부터"는 시작점을 강조해요. "9시에 시작해요"는 시작 시간이 9시라는 뜻이고, "9시부터 일해요"는 9시부터 일이 계속된다는 뜻이에요. 장소 이동에서는 "서울에서 부산까지"가 더 자연스러운 경우도 많아요.',
        uz: '"에" aniq vaqt nuqtasini, "부터" esa boshlanish nuqtasini ta’kidlaydi. Joydan harakatlanishda ko‘pincha "에서...까지" tabiiyroq.',
        en: '에 marks a specific point in time, while 부터 emphasizes the beginning of a range. For movement between places, 에서...까지 is often more natural.',
        ru: '에 обозначает конкретный момент времени, а 부터 подчёркивает начало диапазона. При движении между местами часто естественнее 에서...까지.',
      },
    },

    cautions: [
      {
        ko: '"부터"와 "까지"를 항상 둘 다 써야 하는 것은 아니에요. 시작점만 말하면 "오늘부터", 끝점만 말하면 "내일까지"처럼 사용할 수 있어요.',
        uz: '부터 va 까지 doimo birga kelishi shart emas. Faqat boshlanish yoki faqat tugash nuqtasini ham aytish mumkin.',
        en: '부터 and 까지 do not always have to appear together. You can use only the starting point or only the ending point.',
        ru: '부터 и 까지 необязательно использовать вместе. Можно указать только начало или только конец.',
      },
      {
        ko: '"아홉 시에부터"라고 하지 않고 보통 "아홉 시부터"라고 해요.',
        uz: 'Odatda "아홉 시에부터" emas, "아홉 시부터" deyiladi.',
        en: 'Normally say 아홉 시부터, not 아홉 시에부터.',
        ru: 'Обычно говорят 아홉 시부터, а не 아홉 시에부터.',
      },
      {
        ko: '이동의 출발 장소에는 "에서"가 자연스러운 경우가 많아요. "서울에서 부산까지 가요"처럼 말할 수 있어요.',
        uz: 'Harakatning boshlanish joyi uchun ko‘pincha 에서 tabiiyroq bo‘ladi.',
        en: 'For the departure point of movement, 에서 is often more natural.',
        ru: 'Для места отправления при движении часто естественнее использовать 에서.',
      },
      {
        ko: '"까지"는 그 끝점도 범위에 포함하는 의미로 사용하는 경우가 많아요.',
        uz: '까지 odatda oxirgi nuqta ham oraliqqa kirishini bildiradi.',
        en: '까지 normally includes the ending point in the range.',
        ru: '까지 обычно включает конечную точку в указанный диапазон.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '빈칸에 알맞은 것을 고르세요. "저는 9시___ 6시___ 일해요."',
          uz: 'Bo‘sh joylarga mos javobni tanlang.',
          en: 'Choose the correct particles: "저는 9시___ 6시___ 일해요."',
          ru: 'Выберите правильные частицы.',
        },
        options: [
          { text: '부터 / 까지', correct: true },
          { text: '까지 / 부터', correct: false },
          { text: '에 / 에서', correct: false },
        ],
      },
      {
        question: {
          ko: '"월요일부터 금요일까지"의 뜻으로 알맞은 것은?',
          uz: '"월요일부터 금요일까지" nimani anglatadi?',
          en: 'What does 월요일부터 금요일까지 mean?',
          ru: 'Что означает 월요일부터 금요일까지?',
        },
        options: [
          { text: '월요일에서 금요일까지', correct: true },
          { text: '금요일부터 월요일까지', correct: false },
          { text: '월요일에만', correct: false },
        ],
      },
      {
        question: {
          ko: '시작점만 나타내는 표현을 고르세요.',
          uz: 'Faqat boshlanish nuqtasini bildirgan ifodani tanlang.',
          en: 'Choose the expression that marks only a starting point.',
          ru: 'Выберите выражение, обозначающее только начало.',
        },
        options: [
          { text: '오늘부터', correct: true },
          { text: '오늘까지', correct: false },
          { text: '오늘에', correct: false },
        ],
      },
      {
        question: {
          ko: '끝점만 나타내는 표현을 고르세요.',
          uz: 'Faqat tugash nuqtasini bildirgan ifodani tanlang.',
          en: 'Choose the expression that marks only an ending point.',
          ru: 'Выберите выражение, обозначающее только конец.',
        },
        options: [
          { text: '내일까지', correct: true },
          { text: '내일부터', correct: false },
          { text: '내일에서', correct: false },
        ],
      },
      {
        question: {
          ko: '가장 자연스러운 문장을 고르세요.',
          uz: 'Eng tabiiy gapni tanlang.',
          en: 'Choose the most natural sentence.',
          ru: 'Выберите наиболее естественное предложение.',
        },
        options: [
          { text: '수업은 열 시부터 열두 시까지예요.', correct: true },
          { text: '수업은 열 시에부터 열두 시에까지예요.', correct: false },
          { text: '수업은 열 시까지 열두 시부터예요.', correct: false },
        ],
      },
    ],
  }, // ───────── 섹션 2-7. 동작의 연결 V-아서/어서 ─────────
  {
    code: 'sequence-aseo-eoseo',
    pattern: 'V-아서/어서',
    section: 2,
    unit: 2,
    order: 7,
    isActive: true,

    summary: {
      ko: '앞의 행동을 한 뒤 이어서 다음 행동을 할 때 사용해요. 서로 자연스럽게 연결되는 두 행동을 한 문장으로 말할 수 있어요.',
      uz: 'Birinchi harakatdan keyin unga bog‘liq ikkinchi harakat bajarilishini bildiradi.',
      en: 'Connects two naturally related actions when the second action follows the first.',
      ru: 'Соединяет два связанных действия, когда второе следует за первым.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      {
        ko: '동사 연결',
        uz: 'Fe’llarni bog‘lash',
        en: 'Verb connection',
        ru: 'Связь действий',
      },
      {
        ko: '순서',
        uz: 'Ketma-ketlik',
        en: 'Sequence',
        ru: 'Последовательность',
      },
    ],

    explanation: {
      ko: '"V-아서/어서"는 앞의 행동을 하고 그 결과나 흐름 속에서 다음 행동을 이어서 할 때 사용해요. 예를 들어 "친구를 만나서 영화를 봐요"는 먼저 친구를 만나고, 그 친구와 이어서 영화를 본다는 뜻이에요. 동사 어간의 마지막 모음이 ㅏ 또는 ㅗ이면 "-아서", 그 밖의 모음이면 "-어서"를 붙여요. "하다"는 특별히 "해서"가 돼요. 가다는 "가서", 오다는 "와서", 보다도 "봐서"처럼 줄어드는 형태가 있어요. 이 단원에서는 이유보다는 약속이나 일정 속에서 행동을 순서대로 연결하는 용법에 집중하면 돼요.',
      uz: '"V-아서/어서" birinchi harakatdan keyin unga tabiiy ravishda bog‘liq ikkinchi harakat bajarilishini ko‘rsatadi. Masalan, "친구를 만나서 영화를 봐요" — avval do‘st bilan uchrashib, keyin birga film ko‘rish ma’nosida. Fe’l o‘zagining oxirgi unlisi ㅏ yoki ㅗ bo‘lsa -아서, boshqa unlilar bilan -어서 ishlatiladi. 하다 → 해서. Bu darsda asosan harakatlarni ketma-ket bog‘lash ma’nosiga e’tibor beriladi.',
      en: 'V-아서/어서 links an action with another action that naturally follows it. For example, 친구를 만나서 영화를 봐요 means you meet a friend and then watch a movie with that friend. Use -아서 when the final vowel of the verb stem is ㅏ or ㅗ, and -어서 with other vowels. 하다 becomes 해서. In this lesson, focus mainly on connecting sequential actions in plans and schedules.',
      ru: 'V-아서/어서 связывает действие с другим действием, которое естественно следует за ним. Например, 친구를 만나서 영화를 봐요 означает «встретиться с другом и затем посмотреть с ним фильм». После ㅏ или ㅗ используется -아서, после других гласных — -어서. 하다 превращается в 해서. Здесь основное внимание уделяется последовательности действий.',
    },

    conjugationRule: {
      ko: '어간의 마지막 모음 ㅏ/ㅗ → -아서 · 그 외 → -어서 · 하다 → 해서 · 오다 → 와서',
      uz: 'Oxirgi unli ㅏ/ㅗ → -아서 · boshqa unlilar → -어서 · 하다 → 해서 · 오다 → 와서',
      en: 'Final vowel ㅏ/ㅗ → -아서 · other vowels → -어서 · 하다 → 해서 · 오다 → 와서',
      ru: 'Последняя гласная ㅏ/ㅗ → -아서 · остальные → -어서 · 하다 → 해서 · 오다 → 와서',
    },

    conjugations: [
      { base: '가다', result: '가서' },
      { base: '오다', result: '와서' },
      { base: '만나다', result: '만나서' },
      { base: '먹다', result: '먹어서' },
      { base: '읽다', result: '읽어서' },
      { base: '배우다', result: '배워서' },
      { base: '보다', result: '봐서' },
      { base: '공부하다', result: '공부해서' },
      { base: '운동하다', result: '운동해서' },
      { base: '듣다', result: '들어서' },
    ],

    examples: [
      {
        ko: '친구를 만나서 영화를 봐요.',
        highlight: '만나서',
        gloss: {
          ko: '친구를 만나서 영화를 봐요.',
          uz: 'Do‘stim bilan uchrashib, film ko‘raman.',
          en: 'I meet a friend and watch a movie.',
          ru: 'Я встречаюсь с другом и смотрю фильм.',
        },
      },
      {
        ko: '학교에 가서 한국어를 공부해요.',
        highlight: '가서',
        gloss: {
          ko: '학교에 가서 한국어를 공부해요.',
          uz: 'Maktabga borib, koreys tilini o‘rganaman.',
          en: 'I go to school and study Korean.',
          ru: 'Я иду в школу и изучаю корейский язык.',
        },
      },
      {
        ko: '카페에서 만나서 같이 이야기해요.',
        highlight: '만나서',
        gloss: {
          ko: '카페에서 만나서 같이 이야기해요.',
          uz: 'Kafeda uchrashib, birga suhbatlashamiz.',
          en: 'We meet at a café and talk together.',
          ru: 'Мы встречаемся в кафе и разговариваем.',
        },
      },
      {
        ko: '집에 와서 저녁을 먹어요.',
        highlight: '와서',
        gloss: {
          ko: '집에 와서 저녁을 먹어요.',
          uz: 'Uyga kelib, kechki ovqat yeyman.',
          en: 'I come home and eat dinner.',
          ru: 'Я прихожу домой и ужинаю.',
        },
      },
      {
        ko: '시장에 가서 과일을 사요.',
        highlight: '가서',
        gloss: {
          ko: '시장에 가서 과일을 사요.',
          uz: 'Bozorga borib, meva sotib olaman.',
          en: 'I go to the market and buy fruit.',
          ru: 'Я иду на рынок и покупаю фрукты.',
        },
      },
      {
        ko: '점심을 먹어서 다시 회사에 가요.',
        highlight: '먹어서',
        gloss: {
          ko: '점심을 먹어서 다시 회사에 가요.',
          uz: 'Tushlik qilib, yana ishxonaga boraman.',
          en: 'I eat lunch and then go back to the office.',
          ru: 'Я обедаю и возвращаюсь в офис.',
        },
      },
      {
        ko: '도서관에 가서 책을 읽어요.',
        highlight: '가서',
        gloss: {
          ko: '도서관에 가서 책을 읽어요.',
          uz: 'Kutubxonaga borib, kitob o‘qiyman.',
          en: 'I go to the library and read a book.',
          ru: 'Я иду в библиотеку и читаю книгу.',
        },
      },
      {
        ko: '인터넷에서 찾아서 친구에게 알려 줘요.',
        highlight: '찾아서',
        gloss: {
          ko: '인터넷에서 찾아서 친구에게 알려 줘요.',
          uz: 'Internetdan topib, do‘stimga aytaman.',
          en: 'I look it up online and tell my friend.',
          ru: 'Я нахожу это в интернете и сообщаю другу.',
        },
      },
      {
        ko: '표를 사서 영화관에 들어가요.',
        highlight: '사서',
        gloss: {
          ko: '표를 사서 영화관에 들어가요.',
          uz: 'Chipta sotib olib, kinoteatrga kiraman.',
          en: 'I buy a ticket and enter the theater.',
          ru: 'Я покупаю билет и захожу в кинотеатр.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '일요일에 뭐 할 거예요?',
        highlight: '뭐 할 거예요',
        gloss: {
          ko: '일요일에 뭐 할 거예요?',
          uz: 'Yakshanba kuni nima qilasiz?',
          en: 'What are you going to do on Sunday?',
          ru: 'Что будете делать в воскресенье?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '친구를 만나서 같이 점심을 먹을 거예요.',
        highlight: '만나서',
        gloss: {
          ko: '친구를 만나서 같이 점심을 먹을 거예요.',
          uz: 'Do‘stim bilan uchrashib, birga tushlik qilaman.',
          en: 'I’m going to meet a friend and have lunch together.',
          ru: 'Я встречусь с другом, и мы вместе пообедаем.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '점심 후에는요?',
        highlight: '점심 후',
        gloss: {
          ko: '점심 후에는요?',
          uz: 'Tushlikdan keyin-chi?',
          en: 'What about after lunch?',
          ru: 'А после обеда?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '영화관에 가서 영화를 볼 거예요.',
        highlight: '가서',
        gloss: {
          ko: '영화관에 가서 영화를 볼 거예요.',
          uz: 'Kinoteatrga borib, film ko‘raman.',
          en: 'I’m going to go to the theater and watch a movie.',
          ru: 'Я пойду в кинотеатр и посмотрю фильм.',
        },
      },
    ],

    similar: {
      pattern: 'V-고',
      note: {
        ko: '"-고"도 행동을 연결하지만 단순히 두 행동을 나열할 때 넓게 사용할 수 있어요. "-아서/어서"는 앞 행동과 뒤 행동이 더 자연스럽게 이어지는 관계를 나타내는 경우가 많아요. "집에 가서 쉬어요"는 집에 간 뒤 그곳에서 쉰다는 흐름이 강해요.',
        uz: '"-고" ham harakatlarni bog‘laydi, lekin ko‘proq oddiy sanash uchun ishlatiladi. "-아서/어서" esa ikki harakatning tabiiy ketma-ketligini kuchliroq bildiradi.',
        en: '-고 can simply list actions, while -아서/어서 often shows a closer, natural sequence between the first and second action.',
        ru: '-고 может просто перечислять действия, тогда как -아서/어서 чаще подчёркивает естественную последовательную связь.',
      },
    },

    cautions: [
      {
        ko: '앞 동사에 과거형을 따로 붙이지 않는 것이 기본이에요. "친구를 만났어서 영화를 봤어요"보다 "친구를 만나서 영화를 봤어요"라고 해요.',
        uz: 'Birinchi fe’lga odatda alohida o‘tgan zamon qo‘shimchasi qo‘shilmaydi.',
        en: 'Normally, do not put the past tense marker on the first verb. Use 만나서 ... 봤어요 rather than 만났어서.',
        ru: 'Обычно показатель прошедшего времени не ставят на первый глагол.',
      },
      {
        ko: '"하다"는 "하아서"가 아니라 "해서"가 돼요.',
        uz: '하다 → 하아서 emas, 해서 bo‘ladi.',
        en: '하다 becomes 해서, not 하아서.',
        ru: '하다 превращается в 해서, а не 하아서.',
      },
      {
        ko: '"오다"는 "오아서"가 아니라 "와서", "보다"는 "보아서"가 줄어서 "봐서"가 돼요.',
        uz: '오다 → 와서, 보다 → 봐서 shakllariga qisqaradi.',
        en: '오다 contracts to 와서, and 보다 commonly contracts to 봐서.',
        ru: '오다 сокращается до 와서, а 보다 — до 봐서.',
      },
      {
        ko: '이 단원에서는 원인이나 이유를 나타내는 용법보다 행동의 순서를 연결하는 용법을 먼저 익히는 것이 좋아요.',
        uz: 'Bu bosqichda sabab ma’nosidan ko‘ra harakatlar ketma-ketligiga e’tibor berish yaxshiroq.',
        en: 'At this level, focus first on the sequential-action use rather than the causal use.',
        ru: 'На этом уровне лучше сначала освоить значение последовательности действий.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"가다"에 -아서/어서를 붙인 형태는?',
          uz: '"가다" fe’liga -아서/어서 qo‘shilsa qanday bo‘ladi?',
          en: 'What is the -아서/어서 form of 가다?',
          ru: 'Какая форма 가다 с -아서/어서?',
        },
        options: [
          { text: '가서', correct: true },
          { text: '가아서', correct: false },
          { text: '가어서', correct: false },
        ],
      },
      {
        question: {
          ko: '"하다"의 알맞은 연결형은?',
          uz: '"하다"ning to‘g‘ri bog‘lovchi shakli qaysi?',
          en: 'Choose the correct connected form of 하다.',
          ru: 'Выберите правильную форму 하다.',
        },
        options: [
          { text: '해서', correct: true },
          { text: '하아서', correct: false },
          { text: '하여서만', correct: false },
        ],
      },
      {
        question: {
          ko: '빈칸에 알맞은 것을 고르세요. "친구를 ___ 영화를 봐요."',
          uz: 'Bo‘sh joyga mos javobni tanlang.',
          en: 'Choose the correct answer: "친구를 ___ 영화를 봐요."',
          ru: 'Выберите правильный вариант.',
        },
        options: [
          { text: '만나서', correct: true },
          { text: '만나아서', correct: false },
          { text: '만나어서', correct: false },
        ],
      },
      {
        question: {
          ko: '"오다"의 알맞은 형태를 고르세요.',
          uz: '"오다"ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct form of 오다.',
          ru: 'Выберите правильную форму 오다.',
        },
        options: [
          { text: '와서', correct: true },
          { text: '오아서', correct: false },
          { text: '오어서', correct: false },
        ],
      },
      {
        question: {
          ko: '가장 자연스러운 문장을 고르세요.',
          uz: 'Eng tabiiy gapni tanlang.',
          en: 'Choose the most natural sentence.',
          ru: 'Выберите наиболее естественное предложение.',
        },
        options: [
          { text: '학교에 가서 공부해요.', correct: true },
          { text: '학교에 가아서 공부해요.', correct: false },
          { text: '학교에 가어서 공부해요.', correct: false },
        ],
      },
    ],
  }, // ───────── 섹션 2-8. 계획과 미래 V-(으)ㄹ 거예요 ─────────
  {
    code: 'future-eul-geoyeyo',
    pattern: 'V-(으)ㄹ 거예요',
    section: 2,
    unit: 2,
    order: 8,
    isActive: true,

    summary: {
      ko: '앞으로 할 계획이나 의도를 말할 때 사용해요. 상대방의 계획을 물어볼 때도 아주 자주 쓰는 표현이에요.',
      uz: 'Kelajakdagi reja yoki niyatni aytishda ishlatiladi. Boshqa odamning rejasini so‘rashda ham juda ko‘p qo‘llanadi.',
      en: 'Used to talk about future plans or intentions. It is also very common when asking about someone’s plans.',
      ru: 'Используется для выражения будущих планов или намерений, а также для вопросов о планах собеседника.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '미래', uz: 'Kelajak', en: 'Future', ru: 'Будущее' },
      { ko: '계획', uz: 'Reja', en: 'Plans', ru: 'Планы' },
    ],

    explanation: {
      ko: '"V-(으)ㄹ 거예요"는 아직 하지 않은 행동을 앞으로 할 계획이나 의도가 있을 때 사용해요. "주말에 친구를 만날 거예요"처럼 일정이나 주말 계획을 말할 때 특히 많이 사용해요. 동사 어간이 모음으로 끝나면 "-ㄹ 거예요", ㄹ을 제외한 받침으로 끝나면 "-을 거예요"를 붙여요. 이미 ㄹ 받침으로 끝나는 동사는 새로운 ㄹ을 추가하지 않고 "살 거예요", "만들 거예요"처럼 사용해요. 질문으로 "뭐 할 거예요?"라고 하면 상대의 앞으로의 계획을 묻는 아주 자연스러운 표현이에요.',
      uz: '"V-(으)ㄹ 거예요" hali bajarilmagan, kelajakda qilish rejalashtirilgan harakatni bildiradi. Masalan, "주말에 친구를 만날 거예요" — dam olish kunlari do‘st bilan uchrashish rejasini bildiradi. Fe’l o‘zagi unli bilan tugasa -ㄹ 거예요, ㄹ dan boshqa undosh bilan tugasa -을 거예요 qo‘shiladi. ㄹ bilan tugagan fe’llarda yangi ㄹ qo‘shilmaydi.',
      en: 'V-(으)ㄹ 거예요 expresses an action that has not happened yet but is planned or intended for the future. It is especially common for schedules and weekend plans. If the verb stem ends in a vowel, attach -ㄹ 거예요. If it ends in a consonant other than ㄹ, attach -을 거예요. If the stem already ends in ㄹ, do not add another ㄹ. 뭐 할 거예요? is a very natural way to ask what someone plans to do.',
      ru: 'V-(으)ㄹ 거예요 обозначает действие, которое ещё не произошло, но запланировано на будущее. Эта конструкция часто используется при обсуждении расписания и планов на выходные. После гласной добавляется -ㄹ 거예요, после согласной, кроме ㄹ, — -을 거예요. Если основа уже заканчивается на ㄹ, дополнительный ㄹ не добавляется.',
    },

    conjugationRule: {
      ko: '모음 끝 → -ㄹ 거예요 · ㄹ 이외 받침 → -을 거예요 · ㄹ 받침 → 그대로 + 거예요',
      uz: 'Unli bilan tugasa → -ㄹ 거예요 · ㄹ dan boshqa undosh → -을 거예요 · ㄹ bilan tugasa → + 거예요',
      en: 'Vowel ending → -ㄹ 거예요 · consonant except ㄹ → -을 거예요 · ㄹ ending → + 거예요',
      ru: 'Основа на гласную → -ㄹ 거예요 · согласная кроме ㄹ → -을 거예요 · ㄹ → + 거예요',
    },

    conjugations: [
      { base: '가다', result: '갈 거예요' },
      { base: '오다', result: '올 거예요' },
      { base: '만나다', result: '만날 거예요' },
      { base: '보다', result: '볼 거예요' },
      { base: '먹다', result: '먹을 거예요' },
      { base: '읽다', result: '읽을 거예요' },
      { base: '공부하다', result: '공부할 거예요' },
      { base: '살다', result: '살 거예요' },
      { base: '만들다', result: '만들 거예요' },
      { base: '듣다', result: '들을 거예요' },
    ],

    examples: [
      {
        ko: '주말에 친구를 만날 거예요.',
        highlight: '만날 거예요',
        gloss: {
          ko: '주말에 친구를 만날 거예요.',
          uz: 'Dam olish kunlari do‘stim bilan uchrashaman.',
          en: 'I’m going to meet a friend this weekend.',
          ru: 'На выходных я встречусь с другом.',
        },
      },
      {
        ko: '내일 영화를 볼 거예요.',
        highlight: '볼 거예요',
        gloss: {
          ko: '내일 영화를 볼 거예요.',
          uz: 'Ertaga film ko‘raman.',
          en: 'I’m going to watch a movie tomorrow.',
          ru: 'Завтра я посмотрю фильм.',
        },
      },
      {
        ko: '오늘 저녁에 집에서 공부할 거예요.',
        highlight: '공부할 거예요',
        gloss: {
          ko: '오늘 저녁에 집에서 공부할 거예요.',
          uz: 'Bugun kechqurun uyda o‘qiyman.',
          en: 'I’m going to study at home this evening.',
          ru: 'Сегодня вечером я буду заниматься дома.',
        },
      },
      {
        ko: '일요일에 뭐 할 거예요?',
        highlight: '뭐 할 거예요',
        gloss: {
          ko: '일요일에 뭐 할 거예요?',
          uz: 'Yakshanba kuni nima qilasiz?',
          en: 'What are you going to do on Sunday?',
          ru: 'Что вы будете делать в воскресенье?',
        },
      },
      {
        ko: '저는 부모님하고 저녁을 먹을 거예요.',
        highlight: '먹을 거예요',
        gloss: {
          ko: '저는 부모님하고 저녁을 먹을 거예요.',
          uz: 'Men ota-onam bilan kechki ovqat yeyman.',
          en: 'I’m going to have dinner with my parents.',
          ru: 'Я буду ужинать с родителями.',
        },
      },
      {
        ko: '방학에 한국에 갈 거예요.',
        highlight: '갈 거예요',
        gloss: {
          ko: '방학에 한국에 갈 거예요.',
          uz: 'Ta’til paytida Koreyaga boraman.',
          en: 'I’m going to Korea during vacation.',
          ru: 'На каникулах я поеду в Корею.',
        },
      },
      {
        ko: '내일 아침에 일찍 일어날 거예요.',
        highlight: '일어날 거예요',
        gloss: {
          ko: '내일 아침에 일찍 일어날 거예요.',
          uz: 'Ertaga ertalab erta turaman.',
          en: 'I’m going to get up early tomorrow morning.',
          ru: 'Завтра утром я встану рано.',
        },
      },
      {
        ko: '이번 주에는 운동을 많이 할 거예요.',
        highlight: '할 거예요',
        gloss: {
          ko: '이번 주에는 운동을 많이 할 거예요.',
          uz: 'Bu hafta ko‘p sport bilan shug‘ullanaman.',
          en: 'I’m going to exercise a lot this week.',
          ru: 'На этой неделе я буду много заниматься спортом.',
        },
      },
      {
        ko: '토요일에 새 휴대폰을 살 거예요.',
        highlight: '살 거예요',
        gloss: {
          ko: '토요일에 새 휴대폰을 살 거예요.',
          uz: 'Shanba kuni yangi telefon sotib olaman.',
          en: 'I’m going to buy a new phone on Saturday.',
          ru: 'В субботу я куплю новый телефон.',
        },
      },
      {
        ko: '친구하고 만나서 같이 점심을 먹을 거예요.',
        highlight: '먹을 거예요',
        gloss: {
          ko: '친구하고 만나서 같이 점심을 먹을 거예요.',
          uz: 'Do‘stim bilan uchrashib, birga tushlik qilaman.',
          en: 'I’m going to meet my friend and have lunch together.',
          ru: 'Я встречусь с другом, и мы вместе пообедаем.',
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
          ru: 'Что будете делать в эти выходные?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '토요일에는 친구를 만날 거예요.',
        highlight: '만날 거예요',
        gloss: {
          ko: '토요일에는 친구를 만날 거예요.',
          uz: 'Shanba kuni do‘stim bilan uchrashaman.',
          en: 'I’m going to meet a friend on Saturday.',
          ru: 'В субботу я встречусь с другом.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '일요일에는요?',
        highlight: '일요일',
        gloss: {
          ko: '일요일에는요?',
          uz: 'Yakshanba kuni-chi?',
          en: 'What about Sunday?',
          ru: 'А в воскресенье?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '집에서 쉬고 책을 읽을 거예요.',
        highlight: '읽을 거예요',
        gloss: {
          ko: '집에서 쉬고 책을 읽을 거예요.',
          uz: 'Uyda dam olib, kitob o‘qiyman.',
          en: 'I’m going to rest at home and read a book.',
          ru: 'Я буду отдыхать дома и читать книгу.',
        },
      },
    ],

    similar: {
      pattern: 'V-아요/어요',
      note: {
        ko: '현재형 "-아요/어요"도 가까운 미래 일정에 사용할 수 있지만, "-(으)ㄹ 거예요"는 앞으로의 계획이나 의도를 더 분명하게 표현해요. "내일 친구를 만나요"도 가능하지만 "내일 친구를 만날 거예요"는 계획이라는 느낌이 더 강해요.',
        uz: '-아요/어요 yaqin kelajakdagi jadvalda ham ishlatilishi mumkin, ammo -(으)ㄹ 거예요 reja yoki niyatni aniqroq bildiradi.',
        en: '-아요/어요 can sometimes describe a scheduled near-future event, but -(으)ㄹ 거예요 makes the future plan or intention more explicit.',
        ru: '-아요/어요 иногда используется для ближайшего будущего, но -(으)ㄹ 거예요 яснее выражает план или намерение.',
      },
    },

    cautions: [
      {
        ko: '받침이 있다고 무조건 "-을 거예요"를 붙이는 것은 아니에요. ㄹ 받침은 "살을 거예요"가 아니라 "살 거예요"라고 해요.',
        uz: 'Har qanday undoshdan keyin -을 거예요 kelmaydi. ㄹ bilan tugagan fe’lga yana ㄹ qo‘shilmaydi.',
        en: 'Do not automatically add -을 거예요 after every consonant. With ㄹ-final stems, use forms like 살 거예요, not 살을 거예요.',
        ru: 'После ㄹ не добавляется -을. Нужно 살 거예요, а не 살을 거예요.',
      },
      {
        ko: '"먹다"처럼 ㄹ이 아닌 받침으로 끝나면 "먹을 거예요"라고 해요.',
        uz: '먹다 kabi ㄹ dan boshqa undosh bilan tugagan fe’llarda -을 거예요 ishlatiladi.',
        en: 'For stems ending in a consonant other than ㄹ, use -을 거예요, as in 먹을 거예요.',
        ru: 'После согласной, кроме ㄹ, используется -을 거예요: 먹을 거예요.',
      },
      {
        ko: '"갈거예요"처럼 붙여 쓰지 않고 "갈 거예요"처럼 띄어 쓰는 것이 맞아요.',
        uz: '"갈거예요" emas, "갈 거예요" tarzida ajratib yoziladi.',
        en: 'Write 갈 거예요 with a space, not 갈거예요.',
        ru: 'Правильно писать 갈 거예요 с пробелом, а не 갈거예요.',
      },
      {
        ko: '자기 계획을 말할 때는 의도 의미가 강하고, 다른 사람이나 상황을 말할 때는 앞으로 일어날 것으로 예상하는 의미가 될 수도 있어요.',
        uz: 'O‘z rejangiz haqida gapirganda niyat ma’nosi kuchli; boshqa odam yoki holat haqida gapirganda kelajakdagi taxmin ma’nosi ham bo‘lishi mumkin.',
        en: 'With your own actions it strongly expresses intention; with other people or situations it can also express an expectation about the future.',
        ru: 'При описании собственных действий конструкция часто выражает намерение, а с другими людьми или ситуациями может выражать ожидание будущего.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"가다"의 미래 계획형을 고르세요.',
          uz: '"가다" fe’lining kelajak reja shaklini tanlang.',
          en: 'Choose the future-plan form of 가다.',
          ru: 'Выберите форму будущего плана для 가다.',
        },
        options: [
          { text: '갈 거예요', correct: true },
          { text: '가을 거예요', correct: false },
          { text: '갈을 거예요', correct: false },
        ],
      },
      {
        question: {
          ko: '"먹다"의 알맞은 형태는?',
          uz: '"먹다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 먹다.',
          ru: 'Выберите правильную форму 먹다.',
        },
        options: [
          { text: '먹을 거예요', correct: true },
          { text: '먹ㄹ 거예요', correct: false },
          { text: '먹 거예요', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다"의 알맞은 미래 계획형은?',
          uz: '"살다"ning to‘g‘ri kelajak shakli qaysi?',
          en: 'Choose the correct future-plan form of 살다.',
          ru: 'Выберите правильную форму будущего для 살다.',
        },
        options: [
          { text: '살 거예요', correct: true },
          { text: '살을 거예요', correct: false },
          { text: '사을 거예요', correct: false },
        ],
      },
      {
        question: {
          ko: '상대방의 주말 계획을 묻는 가장 자연스러운 표현은?',
          uz: 'Suhbatdoshning dam olish kunlari rejasini so‘rash uchun eng tabiiy ifoda qaysi?',
          en: 'Which is the most natural way to ask about someone’s weekend plans?',
          ru: 'Как естественнее всего спросить о планах на выходные?',
        },
        options: [
          { text: '주말에 뭐 할 거예요?', correct: true },
          { text: '주말에 뭐 했어요?', correct: false },
          { text: '주말이 몇 시예요?', correct: false },
        ],
      },
      {
        question: {
          ko: '맞는 띄어쓰기를 고르세요.',
          uz: 'To‘g‘ri yozilgan variantni tanlang.',
          en: 'Choose the correctly spaced form.',
          ru: 'Выберите правильное написание с пробелом.',
        },
        options: [
          { text: '만날 거예요', correct: true },
          { text: '만날거예요', correct: false },
          { text: '만날 을거예요', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-9. 'ㅡ' 탈락 ─────────
  {
    code: 'eu-deletion',
    pattern: "'ㅡ' 탈락",
    section: 2,
    unit: 3,
    order: 9,
    isActive: true,

    summary: {
      ko: '어간이 "ㅡ"로 끝나는 동사·형용사에 -아요/어요를 붙이면 "ㅡ"가 사라져요. 어떤 어미가 붙을지는 "ㅡ" 바로 앞 음절의 모음이 정해요.',
      uz: 'Negizi "ㅡ" bilan tugagan fe’l va sifatlarga -아요/어요 qo‘shilganda "ㅡ" tushib qoladi. Qaysi qo‘shimcha kelishini "ㅡ" dan oldingi bo‘g‘in unlisi belgilaydi.',
      en: 'When a verb or adjective stem ends in ㅡ, that ㅡ disappears before -아요/어요. The vowel in the syllable before ㅡ decides which ending is used.',
      ru: 'Если основа глагола или прилагательного оканчивается на ㅡ, этот ㅡ выпадает перед -아요/어요. Какое окончание выбрать, определяет гласная предыдущего слога.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '활용', uz: 'Tuslanish', en: 'Conjugation', ru: 'Спряжение' },
      {
        ko: '불규칙 변화',
        uz: 'O‘zgarish',
        en: 'Stem change',
        ru: 'Изменение основы',
      },
    ],

    explanation: {
      ko: '기본형에서 "-다"를 뺀 어간이 "ㅡ"로 끝나면, -아요/어요처럼 모음으로 시작하는 어미 앞에서 "ㅡ"가 탈락해요. 이때 -아요와 -어요 중 무엇을 쓸지는 "ㅡ" 바로 앞 음절의 모음을 보고 정해요. 앞 음절 모음이 ㅏ나 ㅗ이면 -아요, 그 밖이면 -어요를 써요. 예를 들어 "아프다"는 앞 음절이 "아"라서 "아파요", "예쁘다"는 앞 음절이 "예"라서 "예뻐요"가 돼요. 어간이 한 음절뿐이라 앞 음절이 없으면 무조건 -어요를 써요. "크다"는 "커요", "쓰다"는 "써요"가 되죠. 과거형도 규칙은 같아서 "아팠어요", "예뻤어요", "썼어요"가 돼요. 다만 -고, -지, -네요처럼 자음으로 시작하는 어미 앞에서는 "ㅡ"가 그대로 남아요.',
      uz: 'Asosiy shakldan "-다" olib tashlanganda negiz "ㅡ" bilan tugasa, -아요/어요 kabi unli bilan boshlanuvchi qo‘shimchalar oldidan "ㅡ" tushadi. -아요 yoki -어요 tanlashda "ㅡ" dan oldingi bo‘g‘in unlisiga qaraladi: ㅏ yoki ㅗ bo‘lsa -아요, aks holda -어요. Masalan, 아프다 → 아파요 (oldingi bo‘g‘in "아"), 예쁘다 → 예뻐요 (oldingi bo‘g‘in "예"). Negiz bir bo‘g‘inli bo‘lsa, doim -어요: 크다 → 커요, 쓰다 → 써요. O‘tgan zamonda ham shu qoida: 아팠어요, 예뻤어요, 썼어요. Ammo -고, -지, -네요 kabi undosh bilan boshlanuvchi qo‘shimchalar oldidan "ㅡ" saqlanadi.',
      en: 'Remove -다 to find the stem. If it ends in ㅡ, that ㅡ drops before vowel-initial endings such as -아요/어요. To choose between -아요 and -어요, look at the vowel in the syllable right before ㅡ: use -아요 after ㅏ or ㅗ, and -어요 otherwise. So 아프다 becomes 아파요 (the preceding syllable is 아) and 예쁘다 becomes 예뻐요 (the preceding syllable is 예). If the stem is only one syllable, there is no preceding vowel, so -어요 is always used: 크다 → 커요, 쓰다 → 써요. The past tense follows the same rule: 아팠어요, 예뻤어요, 썼어요. Before consonant-initial endings such as -고, -지, and -네요, the ㅡ stays.',
      ru: 'Уберите -다, чтобы найти основу. Если она оканчивается на ㅡ, этот ㅡ выпадает перед окончаниями на гласную, например -아요/어요. Выбор между -아요 и -어요 зависит от гласной предыдущего слога: после ㅏ или ㅗ — -아요, в остальных случаях — -어요. Поэтому 아프다 → 아파요 (предыдущий слог 아), а 예쁘다 → 예뻐요 (предыдущий слог 예). Если основа односложная, предыдущей гласной нет, и всегда используется -어요: 크다 → 커요, 쓰다 → 써요. В прошедшем времени правило то же: 아팠어요, 예뻤어요, 썼어요. Перед окончаниями на согласную (-고, -지, -네요) ㅡ сохраняется.',
    },

    conjugationRule: {
      ko: 'ㅡ 어간 + -아/어요 → ㅡ 탈락 · 앞 음절 모음이 ㅏ·ㅗ면 -아요, 그 외에는 -어요 · 1음절 어간은 항상 -어요',
      uz: 'ㅡ negiz + -아/어요 → ㅡ tushadi · oldingi bo‘g‘in ㅏ·ㅗ bo‘lsa -아요, aks holda -어요 · bir bo‘g‘inli negiz doim -어요',
      en: 'ㅡ-final stem + -아/어요 → ㅡ drops · -아요 after ㅏ or ㅗ, -어요 otherwise · one-syllable stems always take -어요',
      ru: 'Основа на ㅡ + -아/어요 → ㅡ выпадает · -아요 после ㅏ и ㅗ, иначе -어요 · односложные основы всегда -어요',
    },

    conjugations: [
      { base: '아프다 + -아요', result: '아파요' },
      { base: '바쁘다 + -아요', result: '바빠요' },
      { base: '나쁘다 + -아요', result: '나빠요' },
      { base: '배고프다 + -아요', result: '배고파요' },
      { base: '모으다 + -아요', result: '모아요' },
      { base: '예쁘다 + -어요', result: '예뻐요' },
      { base: '기쁘다 + -어요', result: '기뻐요' },
      { base: '슬프다 + -어요', result: '슬퍼요' },
      { base: '크다 + -어요', result: '커요' },
      { base: '쓰다 + -어요', result: '써요' },
    ],

    examples: [
      {
        ko: '오늘 머리가 아파요.',
        highlight: '아파요',
        gloss: {
          ko: '오늘 머리가 아파요.',
          uz: 'Bugun boshim og‘riyapti.',
          en: 'My head hurts today.',
          ru: 'Сегодня у меня болит голова.',
        },
      },
      {
        ko: '요즘 일이 너무 바빠요.',
        highlight: '바빠요',
        gloss: {
          ko: '요즘 일이 너무 바빠요.',
          uz: 'Shu kunlarda ish juda band.',
          en: 'Work is very busy these days.',
          ru: 'В последнее время очень много работы.',
        },
      },
      {
        ko: '이 꽃이 정말 예뻐요.',
        highlight: '예뻐요',
        gloss: {
          ko: '이 꽃이 정말 예뻐요.',
          uz: 'Bu gul juda chiroyli.',
          en: 'This flower is really pretty.',
          ru: 'Этот цветок очень красивый.',
        },
      },
      {
        ko: '글씨를 크게 써요.',
        highlight: '써요',
        gloss: {
          ko: '글씨를 크게 써요.',
          uz: 'Harflarni katta yozaman.',
          en: 'I write the letters large.',
          ru: 'Я пишу крупными буквами.',
        },
      },
      {
        ko: '가방이 너무 커요.',
        highlight: '커요',
        gloss: {
          ko: '가방이 너무 커요.',
          uz: 'Sumka juda katta.',
          en: 'The bag is too big.',
          ru: 'Сумка слишком большая.',
        },
      },
      {
        ko: '지금 배가 고파요.',
        highlight: '고파요',
        gloss: {
          ko: '지금 배가 고파요.',
          uz: 'Hozir qornim och.',
          en: 'I am hungry right now.',
          ru: 'Я сейчас голоден.',
        },
      },
      {
        ko: '그 영화는 너무 슬퍼요.',
        highlight: '슬퍼요',
        gloss: {
          ko: '그 영화는 너무 슬퍼요.',
          uz: 'U film juda qayg‘uli.',
          en: 'That movie is very sad.',
          ru: 'Этот фильм очень грустный.',
        },
      },
      {
        ko: '동전을 모아요.',
        highlight: '모아요',
        gloss: {
          ko: '동전을 모아요.',
          uz: 'Tangalarni yig‘aman.',
          en: 'I collect coins.',
          ru: 'Я собираю монеты.',
        },
      },
      {
        ko: '어제는 많이 아팠어요.',
        highlight: '아팠어요',
        gloss: {
          ko: '어제는 많이 아팠어요.',
          uz: 'Kecha juda betob edim.',
          en: 'I was very sick yesterday.',
          ru: 'Вчера я сильно болел.',
        },
      },
      {
        ko: '불을 꺼요.',
        highlight: '꺼요',
        gloss: {
          ko: '불을 꺼요.',
          uz: 'Chiroqni o‘chiraman.',
          en: 'I turn off the light.',
          ru: 'Я выключаю свет.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '어디가 아파요?',
        highlight: '아파요',
        gloss: {
          ko: '어디가 아파요?',
          uz: 'Qayeringiz og‘riyapti?',
          en: 'Where does it hurt?',
          ru: 'Что у вас болит?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '목이 아파요. 어제부터 아팠어요.',
        highlight: '아팠어요',
        gloss: {
          ko: '목이 아파요. 어제부터 아팠어요.',
          uz: 'Tomog‘im og‘riyapti. Kechadan beri og‘riyapti.',
          en: 'My throat hurts. It has hurt since yesterday.',
          ru: 'Болит горло. Болит со вчерашнего дня.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '요즘도 많이 바빠요?',
        highlight: '바빠요',
        gloss: {
          ko: '요즘도 많이 바빠요?',
          uz: 'Hozir ham juda bandmisiz?',
          en: 'Are you still very busy these days?',
          ru: 'Вы всё ещё очень заняты?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 바쁘고 좀 힘들어요.',
        highlight: '바쁘고',
        gloss: {
          ko: '네, 바쁘고 좀 힘들어요.',
          uz: 'Ha, bandman va biroz qiyin.',
          en: 'Yes, I am busy and a little tired.',
          ru: 'Да, занят и немного устал.',
        },
      },
    ],

    similar: {
      pattern: '르 불규칙',
      note: {
        ko: '어간이 "르"로 끝나면 "ㅡ"만 빠지는 게 아니라 ㄹ이 하나 더 생겨요. "다르다"는 "다어요"가 아니라 "달라요", "부르다"는 "불러요"가 돼요. "쓰다, 크다"처럼 "르"가 아닌 경우와 구별해야 해요.',
        uz: 'Negiz "르" bilan tugasa, faqat "ㅡ" tushmaydi — qo‘shimcha ㄹ ham qo‘shiladi: 다르다 → 달라요, 부르다 → 불러요. 쓰다, 크다 kabi so‘zlardan farq qiladi.',
        en: 'If the stem ends in 르, more than ㅡ changes — an extra ㄹ appears: 다르다 → 달라요, 부르다 → 불러요. Keep these apart from stems like 쓰다 and 크다.',
        ru: 'Если основа оканчивается на 르, выпадает не только ㅡ — появляется дополнительный ㄹ: 다르다 → 달라요, 부르다 → 불러요. Это отличается от 쓰다 и 크다.',
      },
    },

    cautions: [
      {
        ko: '"아프다 + -아요"를 "아프어요"라고 하지 않아요. "ㅡ"가 빠져서 "아파요"가 돼요.',
        uz: '아프다 + -아요 shakli "아프어요" emas — "ㅡ" tushib "아파요" bo‘ladi.',
        en: '아프다 + -아요 is 아파요, not 아프어요.',
        ru: '아프다 + -아요 даёт 아파요, а не 아프어요.',
      },
      {
        ko: '-아요와 -어요는 "ㅡ" 앞 음절 모음으로 정해요. "예쁘다"는 앞이 "예"라서 "예빠요"가 아니라 "예뻐요"예요.',
        uz: '-아요 yoki -어요 "ㅡ" dan oldingi unliga qarab tanlanadi. 예쁘다 da oldingi bo‘g‘in "예", shuning uchun "예빠요" emas, "예뻐요".',
        en: 'The choice between -아요 and -어요 comes from the vowel before ㅡ. 예쁘다 has 예, so it is 예뻐요, not 예빠요.',
        ru: 'Выбор между -아요 и -어요 зависит от гласной перед ㅡ. У 예쁘다 это 예, поэтому 예뻐요, а не 예빠요.',
      },
      {
        ko: '어간이 한 음절이면 앞 모음이 없으니 항상 -어요를 써요. "크다"는 "카요"가 아니라 "커요"예요.',
        uz: 'Negiz bir bo‘g‘inli bo‘lsa oldingi unli yo‘q, shuning uchun doim -어요: 크다 → "카요" emas, "커요".',
        en: 'One-syllable stems have no preceding vowel, so they always take -어요: 크다 → 커요, not 카요.',
        ru: 'У односложных основ нет предыдущей гласной, поэтому всегда -어요: 크다 → 커요, а не 카요.',
      },
      {
        ko: '-고, -지, -네요 앞에서는 "ㅡ"가 그대로 남아요. "아프고", "아프지 마세요"처럼 써요.',
        uz: '-고, -지, -네요 oldidan "ㅡ" saqlanadi: 아프고, 아프지 마세요.',
        en: 'Before -고, -지, and -네요 the ㅡ stays: 아프고, 아프지 마세요.',
        ru: 'Перед -고, -지 и -네요 ㅡ сохраняется: 아프고, 아프지 마세요.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"아프다 + -아요"의 알맞은 형태를 고르세요.',
          uz: '"아프다 + -아요"ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct form of 아프다 + -아요.',
          ru: 'Выберите правильную форму 아프다 + -아요.',
        },
        options: [
          { text: '아파요', correct: true },
          { text: '아프어요', correct: false },
          { text: '아프아요', correct: false },
        ],
      },
      {
        question: {
          ko: '"예쁘다"의 알맞은 형태는?',
          uz: '"예쁘다"ning to‘g‘ri shakli qaysi?',
          en: 'What is the correct form of 예쁘다?',
          ru: 'Какая форма 예쁘다 правильная?',
        },
        options: [
          { text: '예뻐요', correct: true },
          { text: '예빠요', correct: false },
          { text: '예쁘어요', correct: false },
        ],
      },
      {
        question: {
          ko: '"크다"의 알맞은 형태는?',
          uz: '"크다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 크다.',
          ru: 'Выберите правильную форму 크다.',
        },
        options: [
          { text: '커요', correct: true },
          { text: '카요', correct: false },
          { text: '크어요', correct: false },
        ],
      },
      {
        question: {
          ko: '"ㅡ"가 탈락하지 않는 표현을 고르세요.',
          uz: '"ㅡ" tushmaydigan shaklni tanlang.',
          en: 'Choose the form in which ㅡ does not disappear.',
          ru: 'Выберите форму, в которой ㅡ не выпадает.',
        },
        options: [
          { text: '아프고', correct: true },
          { text: '아파요', correct: false },
          { text: '아팠어요', correct: false },
        ],
      },
      {
        question: {
          ko: '가장 자연스러운 문장을 고르세요.',
          uz: 'Eng tabiiy gapni tanlang.',
          en: 'Choose the most natural sentence.',
          ru: 'Выберите наиболее естественное предложение.',
        },
        options: [
          { text: '지금 배가 고파요.', correct: true },
          { text: '지금 배가 고프어요.', correct: false },
          { text: '지금 배가 고프아요.', correct: false },
        ],
      },
    ],
  },

  // ───────── 섹션 2-10. 금지 V-지 마세요 ─────────
  {
    code: 'prohibition-ji-maseyo',
    pattern: 'V-지 마세요',
    section: 2,
    unit: 3,
    order: 10,
    isActive: true,

    summary: {
      ko: '상대방에게 어떤 행동을 하지 않도록 정중하게 말할 때 사용하는 금지 표현이에요. 안내문, 조언, 주의사항에서 매우 자주 사용해요.',
      uz: 'Suhbatdoshga biror ishni qilmaslikni muloyim tarzda aytish uchun ishlatiladi. Ogohlantirish, maslahat va belgilar uchun juda ko‘p qo‘llanadi.',
      en: 'A polite prohibition used to tell someone not to do something. It is common in warnings, advice, notices, and signs.',
      ru: 'Вежливая форма запрета: просьба или совет не делать что-либо. Часто встречается в предупреждениях, советах и объявлениях.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '금지', uz: 'Taqiq', en: 'Prohibition', ru: 'Запрет' },
      { ko: '조언', uz: 'Maslahat', en: 'Advice', ru: 'Совет' },
    ],

    explanation: {
      ko: '"V-지 마세요"는 상대방에게 어떤 행동을 하지 말라고 정중하게 말할 때 사용해요. 동사의 기본형에서 "-다"를 빼고 어간 뒤에 그대로 "-지 마세요"를 붙이면 돼서 활용이 비교적 간단해요. "가다 → 가지 마세요", "먹다 → 먹지 마세요", "하다 → 하지 마세요"처럼 만들어요. 병원이나 건강 상황에서는 "찬 음식을 먹지 마세요", 공공장소에서는 "여기에서 사진을 찍지 마세요"처럼 사용할 수 있어요. 명령처럼 들릴 수 있으므로 가까운 친구가 아닌 사람에게는 "-지 마"보다 "-지 마세요"가 훨씬 적절해요.',
      uz: '"V-지 마세요" biror kishiga ma’lum bir harakatni qilmaslikni muloyim aytadi. Fe’lning -다 qismini olib tashlab, negizga -지 마세요 qo‘shiladi: 가다 → 가지 마세요, 먹다 → 먹지 마세요, 하다 → 하지 마세요. Masalan, jamoat joyida "사진을 찍지 마세요" yoki maslahat sifatida "너무 늦게 자지 마세요" deyish mumkin.',
      en: 'V-지 마세요 politely tells another person not to perform an action. Remove -다 and attach -지 마세요 directly to the verb stem: 가다 → 가지 마세요, 먹다 → 먹지 마세요, 하다 → 하지 마세요. It is common in public notices, warnings, and advice. The shorter -지 마 is informal, so -지 마세요 is more appropriate with people who are not close friends.',
      ru: 'V-지 마세요 используется, чтобы вежливо попросить человека не совершать действие. Уберите -다 и добавьте -지 마세요 к основе: 가다 → 가지 마세요, 먹다 → 먹지 마세요, 하다 → 하지 마세요. Эта форма часто используется в предупреждениях, объявлениях и советах.',
    },

    conjugationRule: {
      ko: '동사 어간 + -지 마세요 · 받침 여부와 관계없이 같은 형태',
      uz: 'Fe’l negizi + -지 마세요 · 받침 bor-yo‘qligidan qat’i nazar bir xil',
      en: 'Verb stem + -지 마세요 · same form regardless of final consonant',
      ru: 'Основа глагола + -지 마세요 · форма не зависит от наличия 받침',
    },

    conjugations: [
      { base: '가다', result: '가지 마세요' },
      { base: '먹다', result: '먹지 마세요' },
      { base: '마시다', result: '마시지 마세요' },
      { base: '하다', result: '하지 마세요' },
      { base: '자다', result: '자지 마세요' },
      { base: '앉다', result: '앉지 마세요' },
      { base: '열다', result: '열지 마세요' },
      { base: '살다', result: '살지 마세요' },
      { base: '걱정하다', result: '걱정하지 마세요' },
      { base: '들어가다', result: '들어가지 마세요' },
    ],

    examples: [
      {
        ko: '여기에서 담배를 피우지 마세요.',
        highlight: '피우지 마세요',
        gloss: {
          ko: '여기에서 담배를 피우지 마세요.',
          uz: 'Bu yerda chekmang.',
          en: 'Please do not smoke here.',
          ru: 'Пожалуйста, не курите здесь.',
        },
      },
      {
        ko: '사진을 찍지 마세요.',
        highlight: '찍지 마세요',
        gloss: {
          ko: '사진을 찍지 마세요.',
          uz: 'Suratga olmang.',
          en: 'Please do not take pictures.',
          ru: 'Пожалуйста, не фотографируйте.',
        },
      },
      {
        ko: '너무 늦게 자지 마세요.',
        highlight: '자지 마세요',
        gloss: {
          ko: '너무 늦게 자지 마세요.',
          uz: 'Juda kech uxlamang.',
          en: 'Please do not go to bed too late.',
          ru: 'Не ложитесь спать слишком поздно.',
        },
      },
      {
        ko: '찬 음식을 너무 많이 먹지 마세요.',
        highlight: '먹지 마세요',
        gloss: {
          ko: '찬 음식을 너무 많이 먹지 마세요.',
          uz: 'Sovuq ovqatni juda ko‘p yemang.',
          en: 'Please do not eat too much cold food.',
          ru: 'Не ешьте слишком много холодной пищи.',
        },
      },
      {
        ko: '여기에 들어가지 마세요.',
        highlight: '들어가지 마세요',
        gloss: {
          ko: '여기에 들어가지 마세요.',
          uz: 'Bu yerga kirmang.',
          en: 'Please do not enter here.',
          ru: 'Не входите сюда.',
        },
      },
      {
        ko: '문을 열지 마세요.',
        highlight: '열지 마세요',
        gloss: {
          ko: '문을 열지 마세요.',
          uz: 'Eshikni ochmang.',
          en: 'Please do not open the door.',
          ru: 'Не открывайте дверь.',
        },
      },
      {
        ko: '수업 시간에 전화하지 마세요.',
        highlight: '전화하지 마세요',
        gloss: {
          ko: '수업 시간에 전화하지 마세요.',
          uz: 'Dars vaqtida telefon qilmang.',
          en: 'Please do not make phone calls during class.',
          ru: 'Не разговаривайте по телефону во время урока.',
        },
      },
      {
        ko: '너무 걱정하지 마세요.',
        highlight: '걱정하지 마세요',
        gloss: {
          ko: '너무 걱정하지 마세요.',
          uz: 'Juda xavotir olmang.',
          en: 'Please do not worry too much.',
          ru: 'Не волнуйтесь слишком сильно.',
        },
      },
      {
        ko: '버스 안에서 큰 소리로 말하지 마세요.',
        highlight: '말하지 마세요',
        gloss: {
          ko: '버스 안에서 큰 소리로 말하지 마세요.',
          uz: 'Avtobusda baland ovozda gapirmang.',
          en: 'Please do not speak loudly on the bus.',
          ru: 'Не разговаривайте громко в автобусе.',
        },
      },
      {
        ko: '이 버튼을 누르지 마세요.',
        highlight: '누르지 마세요',
        gloss: {
          ko: '이 버튼을 누르지 마세요.',
          uz: 'Bu tugmani bosmang.',
          en: 'Please do not press this button.',
          ru: 'Не нажимайте эту кнопку.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '목이 많이 아파요.',
        highlight: '목이 많이 아파요',
        gloss: {
          ko: '목이 많이 아파요.',
          uz: 'Tomog‘im juda og‘riyapti.',
          en: 'My throat hurts a lot.',
          ru: 'У меня сильно болит горло.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '그럼 너무 차가운 음료를 마시지 마세요.',
        highlight: '마시지 마세요',
        gloss: {
          ko: '그럼 너무 차가운 음료를 마시지 마세요.',
          uz: 'Unda juda sovuq ichimlik ichmang.',
          en: 'Then please avoid very cold drinks.',
          ru: 'Тогда не пейте слишком холодные напитки.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '오늘 운동해도 돼요?',
        highlight: '운동해도 돼요',
        gloss: {
          ko: '오늘 운동해도 돼요?',
          uz: 'Bugun sport qilsam bo‘ladimi?',
          en: 'Can I exercise today?',
          ru: 'Можно сегодня заниматься спортом?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '오늘은 무리하지 마세요.',
        highlight: '무리하지 마세요',
        gloss: {
          ko: '오늘은 무리하지 마세요.',
          uz: 'Bugun o‘zingizni zo‘riqtirmang.',
          en: 'Please do not overdo it today.',
          ru: 'Сегодня не перенапрягайтесь.',
        },
      },
    ],

    similar: {
      pattern: 'V-지 마',
      note: {
        ko: '"-지 마"와 뜻은 같지만 높임 정도가 달라요. "-지 마"는 가까운 친구나 아랫사람에게 쓰는 반말이고, "-지 마세요"는 처음 보는 사람이나 어른에게도 사용할 수 있는 정중한 표현이에요.',
        uz: '-지 마 va -지 마세요 ma’nosi bir xil, lekin hurmat darajasi boshqacha. -지 마 norasmiy, -지 마세요 esa muloyim shakl.',
        en: '-지 마 has the same meaning but is informal. -지 마세요 is the polite form suitable for adults, strangers, and general notices.',
        ru: '-지 마 имеет то же значение, но является неформальной формой. -지 마세요 — вежливый вариант.',
      },
    },

    cautions: [
      {
        ko: '동사에 "-지 마세요"를 붙여요. 명사에 바로 붙이지 않아요.',
        uz: '-지 마세요 fe’lga qo‘shiladi, otga to‘g‘ridan-to‘g‘ri qo‘shilmaydi.',
        en: 'Attach -지 마세요 to verbs, not directly to nouns.',
        ru: '-지 마세요 присоединяется к глаголам, а не непосредственно к существительным.',
      },
      {
        ko: '"먹지 마세요"를 "먹어지 마세요"처럼 만들지 않아요.',
        uz: '"먹어지 마세요" emas, "먹지 마세요" deyiladi.',
        en: 'Use 먹지 마세요, not 먹어지 마세요.',
        ru: 'Правильно 먹지 마세요, а не 먹어지 마세요.',
      },
      {
        ko: 'ㄹ 받침 동사도 "-지" 앞에서는 ㄹ을 유지해요. "열다 → 열지 마세요"가 맞아요.',
        uz: 'ㄹ bilan tugagan fe’llarda ham -지 oldidan ㄹ saqlanadi: 열지 마세요.',
        en: 'ㄹ remains before -지: 열다 → 열지 마세요.',
        ru: 'Перед -지 ㄹ сохраняется: 열다 → 열지 마세요.',
      },
      {
        ko: '안내문이나 공공장소에서는 반말 "-지 마"보다 "-지 마세요"를 사용하는 것이 자연스러워요.',
        uz: 'Jamoat belgilarida -지 마 dan ko‘ra -지 마세요 tabiiyroq va muloyimroq.',
        en: 'In notices and public settings, -지 마세요 is more appropriate than the informal -지 마.',
        ru: 'В объявлениях и общественных местах естественнее использовать вежливое -지 마세요.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"먹다"에 금지 표현을 붙인 것을 고르세요.',
          uz: '"먹다" fe’lining taqiq shaklini tanlang.',
          en: 'Choose the prohibition form of 먹다.',
          ru: 'Выберите запретительную форму 먹다.',
        },
        options: [
          { text: '먹지 마세요', correct: true },
          { text: '먹어 마세요', correct: false },
          { text: '먹지 하세요', correct: false },
        ],
      },
      {
        question: {
          ko: '"하다"의 알맞은 금지 표현은?',
          uz: '"하다"ning to‘g‘ri taqiq shakli qaysi?',
          en: 'Choose the correct prohibition form of 하다.',
          ru: 'Выберите правильную запретительную форму 하다.',
        },
        options: [
          { text: '하지 마세요', correct: true },
          { text: '해서 마세요', correct: false },
          { text: '하 마세요', correct: false },
        ],
      },
      {
        question: {
          ko: '공공장소 안내문으로 가장 자연스러운 표현은?',
          uz: 'Jamoat joyidagi belgi uchun eng tabiiy ifodani tanlang.',
          en: 'Choose the most natural expression for a public notice.',
          ru: 'Выберите наиболее естественную форму для объявления.',
        },
        options: [
          { text: '사진을 찍지 마세요.', correct: true },
          { text: '사진을 찍지 마.', correct: false },
          { text: '사진을 안 찍어요.', correct: false },
        ],
      },
      {
        question: {
          ko: '"열다"의 알맞은 형태는?',
          uz: '"열다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 열다.',
          ru: 'Выберите правильную форму 열다.',
        },
        options: [
          { text: '열지 마세요', correct: true },
          { text: '여지 마세요', correct: false },
          { text: '열어지 마세요', correct: false },
        ],
      },
      {
        question: {
          ko: '빈칸에 알맞은 것을 고르세요. "수업 시간에 큰 소리로 ___."',
          uz: 'Bo‘sh joyga mos javobni tanlang.',
          en: 'Choose the correct answer: "수업 시간에 큰 소리로 ___."',
          ru: 'Выберите правильный вариант.',
        },
        options: [
          { text: '말하지 마세요', correct: true },
          { text: '말을 마세요', correct: false },
          { text: '말하지 있어요', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-11. 한정 N만 ─────────
  {
    code: 'only-man',
    pattern: 'N만',
    section: 2,
    unit: 3,
    order: 11,
    isActive: true,

    summary: {
      ko: '"오직 그것만", "그것 외에는 없다"는 뜻을 나타내요. 사람, 음식, 장소, 시간 등 특정 대상을 제한할 때 사용해요.',
      uz: '"Faqat shu" yoki "bundan boshqasi emas" degan ma’noni bildiradi. Odam, ovqat, joy, vaqt va boshqa narsalarni cheklash uchun ishlatiladi.',
      en: 'Means "only" or "just", limiting the meaning to one particular person, thing, place, time, or group.',
      ru: 'Означает «только» и ограничивает значение одним человеком, предметом, местом, временем или группой.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '조사', uz: 'Ko‘makchi', en: 'Particle', ru: 'Частица' },
      { ko: '한정', uz: 'Cheklash', en: 'Limitation', ru: 'Ограничение' },
    ],

    explanation: {
      ko: '"N만"은 여러 가능성 중에서 하나나 일부만 선택해서 말할 때 사용해요. "물만 마셔요"라고 하면 물은 마시지만 다른 음료는 마시지 않는다는 의미가 포함돼요. 사람에도 사용할 수 있어서 "민수만 왔어요"라고 하면 다른 사람은 오지 않고 민수만 왔다는 뜻이에요. 목적격 조사 "을/를"이나 주격 조사 "이/가" 대신 "만"이 바로 붙는 경우가 많아요. 반면 장소 조사 "에, 에서" 같은 조사는 "학교에만", "집에서만"처럼 만과 함께 사용할 수 있어요. 그래서 어떤 조사가 생략되고 어떤 조사와 함께 쓰이는지 실제 문장으로 익히는 것이 좋아요.',
      uz: '"N만" bir nechta imkoniyat ichidan faqat bittasi yoki ma’lum bir qismini ajratib ko‘rsatadi. "물만 마셔요" deganda faqat suv ichilishi, boshqa ichimliklar ichilmasligi tushuniladi. Odam bilan ham ishlatiladi: "민수만 왔어요" — faqat Minsu keldi. 만 ko‘pincha 을/를 yoki 이/가 o‘rnini egallaydi, lekin 에, 에서 kabi joy qo‘shimchalari bilan birga ishlatilishi mumkin: 학교에만, 집에서만.',
      en: 'N만 selects and limits something from a larger set. 물만 마셔요 implies that the speaker drinks water and not other drinks. With people, 민수만 왔어요 means that Minsu came and others did not. 만 often replaces particles such as 을/를 or 이/가, while it can combine with particles such as 에 and 에서: 학교에만, 집에서만.',
      ru: 'N만 выделяет только один элемент или часть из нескольких возможных. 물만 마셔요 означает, что человек пьёт только воду, а не другие напитки. 민수만 왔어요 означает, что пришёл только Минсу. 만 часто заменяет 을/를 и 이/가, но может сочетаться с 에 и 에서: 학교에만, 집에서만.',
    },

    conjugationRule: {
      ko: '명사 + 만 · N을/를 → N만 가능 · N이/가 → N만 가능 · 에/에서 등 일부 조사와는 N에만/N에서만 형태 가능',
      uz: 'Ot + 만 · 을/를 yoki 이/가 o‘rniga 만 kelishi mumkin · 에/에서 bilan 에만/에서만 ishlatiladi',
      en: 'Noun + 만 · may replace 을/를 or 이/가 · can combine with particles such as 에/에서 → 에만/에서만',
      ru: 'Существительное + 만 · может заменять 을/를 или 이/가 · с 에/에서 употребляется как 에만/에서만',
    },

    conjugations: [
      { base: '물 + 만', result: '물만' },
      { base: '과일 + 만', result: '과일만' },
      { base: '민수 + 만', result: '민수만' },
      { base: '오늘 + 만', result: '오늘만' },
      { base: '하나 + 만', result: '하나만' },
      { base: '학교 + 에 + 만', result: '학교에만' },
      { base: '집 + 에서 + 만', result: '집에서만' },
      { base: '주말 + 에 + 만', result: '주말에만' },
    ],

    examples: [
      {
        ko: '오늘은 물만 마셔요.',
        highlight: '물만',
        gloss: {
          ko: '오늘은 물만 마셔요.',
          uz: 'Bugun faqat suv ichaman.',
          en: 'Today I only drink water.',
          ru: 'Сегодня я пью только воду.',
        },
      },
      {
        ko: '아침에는 과일만 먹어요.',
        highlight: '과일만',
        gloss: {
          ko: '아침에는 과일만 먹어요.',
          uz: 'Ertalab faqat meva yeyman.',
          en: 'I only eat fruit in the morning.',
          ru: 'Утром я ем только фрукты.',
        },
      },
      {
        ko: '민수 씨만 왔어요.',
        highlight: '민수 씨만',
        gloss: {
          ko: '민수 씨만 왔어요.',
          uz: 'Faqat Minsu keldi.',
          en: 'Only Minsu came.',
          ru: 'Пришёл только Минсу.',
        },
      },
      {
        ko: '저만 몰라요.',
        highlight: '저만',
        gloss: {
          ko: '저만 몰라요.',
          uz: 'Faqat men bilmayman.',
          en: 'I’m the only one who does not know.',
          ru: 'Только я не знаю.',
        },
      },
      {
        ko: '오늘만 일찍 집에 갈 거예요.',
        highlight: '오늘만',
        gloss: {
          ko: '오늘만 일찍 집에 갈 거예요.',
          uz: 'Faqat bugun uyga erta boraman.',
          en: 'Only today, I’m going home early.',
          ru: 'Только сегодня я пойду домой пораньше.',
        },
      },
      {
        ko: '약을 한 번만 먹었어요.',
        highlight: '한 번만',
        gloss: {
          ko: '약을 한 번만 먹었어요.',
          uz: 'Dorini faqat bir marta ichdim.',
          en: 'I took the medicine only once.',
          ru: 'Я принял лекарство только один раз.',
        },
      },
      {
        ko: '저는 주말에만 운동해요.',
        highlight: '주말에만',
        gloss: {
          ko: '저는 주말에만 운동해요.',
          uz: 'Men faqat dam olish kunlari sport qilaman.',
          en: 'I exercise only on weekends.',
          ru: 'Я занимаюсь спортом только по выходным.',
        },
      },
      {
        ko: '집에서만 공부하지 마세요.',
        highlight: '집에서만',
        gloss: {
          ko: '집에서만 공부하지 마세요.',
          uz: 'Faqat uyda o‘qimang.',
          en: 'Do not study only at home.',
          ru: 'Не занимайтесь только дома.',
        },
      },
      {
        ko: '이 방에는 환자만 들어갈 수 있어요.',
        highlight: '환자만',
        gloss: {
          ko: '이 방에는 환자만 들어갈 수 있어요.',
          uz: 'Bu xonaga faqat bemorlar kira oladi.',
          en: 'Only patients can enter this room.',
          ru: 'В эту комнату могут входить только пациенты.',
        },
      },
      {
        ko: '커피는 한 잔만 마실 거예요.',
        highlight: '한 잔만',
        gloss: {
          ko: '커피는 한 잔만 마실 거예요.',
          uz: 'Faqat bir finjon qahva ichaman.',
          en: 'I’m going to drink only one cup of coffee.',
          ru: 'Я выпью только одну чашку кофе.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '아침에 뭐 먹었어요?',
        highlight: '뭐 먹었어요',
        gloss: {
          ko: '아침에 뭐 먹었어요?',
          uz: 'Ertalab nima yedingiz?',
          en: 'What did you eat for breakfast?',
          ru: 'Что вы ели на завтрак?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '입맛이 없어서 과일만 먹었어요.',
        highlight: '과일만',
        gloss: {
          ko: '입맛이 없어서 과일만 먹었어요.',
          uz: 'Ishtaham yo‘q edi, shuning uchun faqat meva yedim.',
          en: 'I had no appetite, so I only ate fruit.',
          ru: 'Аппетита не было, поэтому я ел только фрукты.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '오늘도 집에만 있을 거예요?',
        highlight: '집에만',
        gloss: {
          ko: '오늘도 집에만 있을 거예요?',
          uz: 'Bugun ham faqat uyda bo‘lasizmi?',
          en: 'Are you going to stay only at home today too?',
          ru: 'Сегодня тоже будете только дома?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 오늘만 집에서 쉴 거예요.',
        highlight: '오늘만',
        gloss: {
          ko: '네, 오늘만 집에서 쉴 거예요.',
          uz: 'Ha, faqat bugun uyda dam olaman.',
          en: 'Yes. I’m going to rest at home just for today.',
          ru: 'Да, только сегодня отдохну дома.',
        },
      },
    ],

    similar: {
      pattern: 'N도',
      note: {
        ko: '"만"은 범위를 좁혀서 "오직 그것"을 뜻하고, "도"는 범위를 넓혀 "그것도 포함"이라는 뜻이에요. "물만 마셔요"는 다른 음료는 마시지 않는다는 뜻이고, "물도 마셔요"는 다른 것과 함께 물도 마신다는 뜻이에요.',
        uz: '"만" faqat bittasini cheklaydi, "도" esa yana bir narsani qo‘shadi. 물만 마셔요 — faqat suv; 물도 마셔요 — suv ham.',
        en: '만 limits the choice to "only that", while 도 adds something to an existing set. 물만 마셔요 means only water; 물도 마셔요 means water too.',
        ru: '만 ограничивает значение словом «только», а 도 добавляет значение «тоже». 물만 마셔요 — только вода; 물도 마셔요 — воду тоже.',
      },
    },

    cautions: [
      {
        ko: '"만"은 "오직"이라는 제한 의미가 있어서 문맥에 따라 다른 것은 제외된다는 뉘앙스가 생겨요.',
        uz: '만 "faqat" ma’nosini bergani uchun boshqa narsalar chiqarib tashlangan degan tus paydo bo‘ladi.',
        en: 'Because 만 means "only", it often implies that other possibilities are excluded.',
        ru: 'Так как 만 означает «только», часто подразумевается исключение других вариантов.',
      },
      {
        ko: '"물만을 마셔요"보다 초급 회화에서는 보통 "물만 마셔요"라고 자연스럽게 말해요.',
        uz: 'Boshlang‘ich kundalik nutqda "물만을 마셔요"dan ko‘ra "물만 마셔요" tabiiyroq.',
        en: 'In ordinary beginner speech, 물만 마셔요 is more natural than 물만을 마셔요.',
        ru: 'В обычной речи 물만 마셔요 естественнее, чем 물만을 마셔요.',
      },
      {
        ko: '장소 조사와 함께 사용할 때는 "집에서만", "학교에만"처럼 조사 뒤에 만이 와요.',
        uz: 'Joy qo‘shimchalari bilan 만 keyin keladi: 집에서만, 학교에만.',
        en: 'With location particles, 만 follows the particle: 집에서만, 학교에만.',
        ru: 'С частицами места 만 ставится после них: 집에서만, 학교에만.',
      },
      {
        ko: '"만"과 "도"는 뜻이 반대 방향으로 달라질 수 있으므로 바꾸어 쓰면 문장의 의미가 크게 달라져요.',
        uz: '만 va 도 ni almashtirish gap ma’nosini keskin o‘zgartirishi mumkin.',
        en: 'Replacing 만 with 도 can significantly change the meaning.',
        ru: 'Замена 만 на 도 может сильно изменить смысл предложения.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"물만 마셔요."의 뜻으로 가장 알맞은 것은?',
          uz: '"물만 마셔요." gapining ma’nosi qaysi?',
          en: 'What does "물만 마셔요" mean?',
          ru: 'Что означает "물만 마셔요"?',
        },
        options: [
          { text: '물만 마시고 다른 음료는 마시지 않아요.', correct: true },
          { text: '물도 마시고 커피도 마셔요.', correct: false },
          { text: '물을 전혀 마시지 않아요.', correct: false },
        ],
      },
      {
        question: {
          ko: '빈칸에 알맞은 것을 고르세요. "민수 씨___ 왔어요."',
          uz: 'Bo‘sh joyga mos javobni tanlang.',
          en: 'Choose the correct answer: "민수 씨___ 왔어요."',
          ru: 'Выберите правильный вариант.',
        },
        options: [
          { text: '만', correct: true },
          { text: '를', correct: false },
          { text: '부터', correct: false },
        ],
      },
      {
        question: {
          ko: '"주말에만 운동해요."의 의미는?',
          uz: '"주말에만 운동해요." nimani anglatadi?',
          en: 'What does "주말에만 운동해요" mean?',
          ru: 'Что означает "주말에만 운동해요"?',
        },
        options: [
          {
            text: '주말에만 운동하고 평일에는 운동하지 않아요.',
            correct: true,
          },
          { text: '주말에도 운동해요.', correct: false },
          { text: '주말부터 운동을 시작해요.', correct: false },
        ],
      },
      {
        question: {
          ko: '가장 자연스러운 표현을 고르세요.',
          uz: 'Eng tabiiy ifodani tanlang.',
          en: 'Choose the most natural expression.',
          ru: 'Выберите наиболее естественное выражение.',
        },
        options: [
          { text: '학교에만 가요.', correct: true },
          { text: '학교만에 가요.', correct: false },
          { text: '학교를만 가요.', correct: false },
        ],
      },
      {
        question: {
          ko: '"물도 마셔요"와 반대되는 제한 의미에 가까운 표현은?',
          uz: '"물도 마셔요"ga qarama-qarshi cheklash ma’nosidagi ifodani tanlang.',
          en: 'Which expression has the limiting meaning opposite to 물도 마셔요?',
          ru: 'Какое выражение имеет ограничительное значение в отличие от 물도 마셔요?',
        },
        options: [
          { text: '물만 마셔요', correct: true },
          { text: '물부터 마셔요', correct: false },
          { text: '물까지 마셔요', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-12. 의무 V-아야/어야 되다 ─────────
  {
    code: 'obligation-aya-eoya-doeda',
    pattern: 'V-아야/어야 되다',
    section: 2,
    unit: 3,
    order: 12,
    isActive: true,

    summary: {
      ko: '반드시 해야 하는 행동이나 필요한 행동을 말할 때 사용해요. 한국어의 대표적인 "해야 한다 / must / have to" 표현이에요.',
      uz: 'Bajarish majburiy yoki zarur bo‘lgan harakatni bildiradi. Koreys tilidagi "kerak / shart" ma’nosining asosiy shakllaridan biri.',
      en: 'Expresses something that must or needs to be done. It corresponds closely to "must" or "have to".',
      ru: 'Выражает необходимость или обязанность что-либо сделать. Соответствует значениям «нужно», «должен».',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '의무', uz: 'Majburiyat', en: 'Obligation', ru: 'Обязанность' },
      { ko: '필요', uz: 'Zarurat', en: 'Necessity', ru: 'Необходимость' },
    ],

    explanation: {
      ko: '"V-아야/어야 되다"는 어떤 행동을 반드시 해야 하거나 상황상 필요할 때 사용해요. 동사 어간의 마지막 모음이 ㅏ 또는 ㅗ이면 "-아야 되다", 그 밖의 모음이면 "-어야 되다"를 사용해요. "하다"는 "해야 되다"가 돼요. 실제 회화에서는 "되어요"가 줄어든 "돼요"를 사용해서 "가야 돼요", "먹어야 돼요", "공부해야 돼요"처럼 말하는 경우가 매우 많아요. 질문형 "뭐 해야 돼요?"는 무엇을 해야 하는지 묻고, "언제까지 가야 돼요?"는 필요한 시간이나 기한을 확인할 때 사용할 수 있어요.',
      uz: '"V-아야/어야 되다" ma’lum bir ishni qilish zarur yoki majburiy ekanini bildiradi. Negizning oxirgi unlisi ㅏ yoki ㅗ bo‘lsa -아야 되다, boshqa unlilar bo‘lsa -어야 되다 ishlatiladi. 하다 → 해야 되다. Kundalik nutqda 되어요 qisqarib 돼요 bo‘ladi, shuning uchun 가야 돼요, 먹어야 돼요, 공부해야 돼요 shakllari juda ko‘p ishlatiladi.',
      en: 'V-아야/어야 되다 expresses necessity or obligation. If the final vowel of the verb stem is ㅏ or ㅗ, use -아야 되다; with other vowels, use -어야 되다. 하다 becomes 해야 되다. In conversation, 되어요 normally contracts to 돼요, producing common forms such as 가야 돼요, 먹어야 돼요, and 공부해야 돼요. Questions such as 뭐 해야 돼요? ask what must be done.',
      ru: 'V-아야/어야 되다 выражает необходимость или обязанность. После ㅏ или ㅗ используется -아야 되다, после остальных гласных — -어야 되다. 하다 превращается в 해야 되다. В разговорной речи 되어요 обычно сокращается до 돼요: 가야 돼요, 먹어야 돼요, 공부해야 돼요.',
    },

    conjugationRule: {
      ko: '어간 마지막 모음 ㅏ/ㅗ → -아야 되다 · 그 외 → -어야 되다 · 하다 → 해야 되다 · 되어요 → 돼요',
      uz: 'Oxirgi unli ㅏ/ㅗ → -아야 되다 · boshqa unlilar → -어야 되다 · 하다 → 해야 되다 · 되어요 → 돼요',
      en: 'Final vowel ㅏ/ㅗ → -아야 되다 · other vowels → -어야 되다 · 하다 → 해야 되다 · 되어요 → 돼요',
      ru: 'Последняя гласная ㅏ/ㅗ → -아야 되다 · остальные → -어야 되다 · 하다 → 해야 되다 · 되어요 → 돼요',
    },

    conjugations: [
      { base: '가다', result: '가야 돼요' },
      { base: '오다', result: '와야 돼요' },
      { base: '자다', result: '자야 돼요' },
      { base: '먹다', result: '먹어야 돼요' },
      { base: '읽다', result: '읽어야 돼요' },
      { base: '마시다', result: '마셔야 돼요' },
      { base: '배우다', result: '배워야 돼요' },
      { base: '보다', result: '봐야 돼요' },
      { base: '공부하다', result: '공부해야 돼요' },
      { base: '운동하다', result: '운동해야 돼요' },
    ],

    examples: [
      {
        ko: '내일 일찍 일어나야 돼요.',
        highlight: '일어나야 돼요',
        gloss: {
          ko: '내일 일찍 일어나야 돼요.',
          uz: 'Ertaga erta turishim kerak.',
          en: 'I have to get up early tomorrow.',
          ru: 'Завтра мне нужно рано встать.',
        },
      },
      {
        ko: '오늘 숙제를 해야 돼요.',
        highlight: '해야 돼요',
        gloss: {
          ko: '오늘 숙제를 해야 돼요.',
          uz: 'Bugun uy vazifasini qilishim kerak.',
          en: 'I have to do my homework today.',
          ru: 'Сегодня мне нужно сделать домашнее задание.',
        },
      },
      {
        ko: '아홉 시까지 회사에 가야 돼요.',
        highlight: '가야 돼요',
        gloss: {
          ko: '아홉 시까지 회사에 가야 돼요.',
          uz: 'Soat to‘qqizgacha ishxonaga borishim kerak.',
          en: 'I have to get to work by nine.',
          ru: 'Мне нужно быть на работе к девяти.',
        },
      },
      {
        ko: '시험 전에 많이 공부해야 돼요.',
        highlight: '공부해야 돼요',
        gloss: {
          ko: '시험 전에 많이 공부해야 돼요.',
          uz: 'Imtihondan oldin ko‘p o‘qishim kerak.',
          en: 'I have to study a lot before the exam.',
          ru: 'Перед экзаменом мне нужно много заниматься.',
        },
      },
      {
        ko: '약속이 있어서 지금 가야 돼요.',
        highlight: '가야 돼요',
        gloss: {
          ko: '약속이 있어서 지금 가야 돼요.',
          uz: 'Uchrashuvim bor, shuning uchun hozir ketishim kerak.',
          en: 'I have an appointment, so I have to go now.',
          ru: 'У меня встреча, поэтому мне нужно сейчас идти.',
        },
      },
      {
        ko: '이 책을 내일까지 읽어야 돼요.',
        highlight: '읽어야 돼요',
        gloss: {
          ko: '이 책을 내일까지 읽어야 돼요.',
          uz: 'Bu kitobni ertagacha o‘qib chiqishim kerak.',
          en: 'I have to read this book by tomorrow.',
          ru: 'Мне нужно прочитать эту книгу до завтра.',
        },
      },
      {
        ko: '한국에서 일하려면 한국어를 배워야 돼요.',
        highlight: '배워야 돼요',
        gloss: {
          ko: '한국에서 일하려면 한국어를 배워야 돼요.',
          uz: 'Koreyada ishlash uchun koreys tilini o‘rganish kerak.',
          en: 'You need to learn Korean to work in Korea.',
          ru: 'Чтобы работать в Корее, нужно учить корейский язык.',
        },
      },
      {
        ko: '내일은 아침을 일찍 먹어야 돼요.',
        highlight: '먹어야 돼요',
        gloss: {
          ko: '내일은 아침을 일찍 먹어야 돼요.',
          uz: 'Ertaga nonushtani erta qilishim kerak.',
          en: 'I need to eat breakfast early tomorrow.',
          ru: 'Завтра мне нужно рано позавтракать.',
        },
      },
      {
        ko: '회의 전에 이 자료를 봐야 돼요.',
        highlight: '봐야 돼요',
        gloss: {
          ko: '회의 전에 이 자료를 봐야 돼요.',
          uz: 'Yig‘ilishdan oldin bu materialni ko‘rishim kerak.',
          en: 'I have to look over this material before the meeting.',
          ru: 'Перед встречей мне нужно посмотреть этот материал.',
        },
      },
      {
        ko: '내일 몇 시까지 와야 돼요?',
        highlight: '와야 돼요',
        gloss: {
          ko: '내일 몇 시까지 와야 돼요?',
          uz: 'Ertaga soat nechagacha kelishim kerak?',
          en: 'By what time do I have to come tomorrow?',
          ru: 'К какому времени мне нужно прийти завтра?',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '내일 몇 시까지 학교에 와야 돼요?',
        highlight: '와야 돼요',
        gloss: {
          ko: '내일 몇 시까지 학교에 와야 돼요?',
          uz: 'Ertaga maktabga soat nechagacha kelish kerak?',
          en: 'By what time do we have to come to school tomorrow?',
          ru: 'К какому времени завтра нужно прийти в школу?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아홉 시까지 와야 돼요.',
        highlight: '와야 돼요',
        gloss: {
          ko: '아홉 시까지 와야 돼요.',
          uz: 'Soat to‘qqizgacha kelish kerak.',
          en: 'You have to come by nine.',
          ru: 'Нужно прийти к девяти.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '준비해야 하는 것도 있어요?',
        highlight: '준비해야',
        gloss: {
          ko: '준비해야 하는 것도 있어요?',
          uz: 'Tayyorlash kerak bo‘lgan narsa ham bormi?',
          en: 'Is there anything we have to prepare?',
          ru: 'Нужно что-нибудь подготовить?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 책하고 노트를 가져와야 돼요.',
        highlight: '가져와야 돼요',
        gloss: {
          ko: '네, 책하고 노트를 가져와야 돼요.',
          uz: 'Ha, kitob va daftar olib kelish kerak.',
          en: 'Yes. You have to bring your book and notebook.',
          ru: 'Да, нужно принести книгу и тетрадь.',
        },
      },
    ],

    similar: {
      pattern: 'V-아야/어야 하다',
      note: {
        ko: '"-아야/어야 되다"와 "-아야/어야 하다"는 둘 다 의무나 필요를 나타내며 뜻이 매우 비슷해요. 일상 회화에서는 "해야 돼요"도 아주 많이 사용하고, "해야 해요"도 자연스러워요.',
        uz: '-아야/어야 되다 va -아야/어야 하다 ikkalasi ham majburiyat yoki zaruratni bildiradi. Kundalik nutqda 해야 돼요 va 해야 해요 ikkalasi ham tabiiy.',
        en: '-아야/어야 되다 and -아야/어야 하다 both express necessity or obligation and are very similar in meaning. 해야 돼요 and 해야 해요 are both natural in conversation.',
        ru: '-아야/어야 되다 и -아야/어야 하다 оба выражают необходимость или обязанность. 해야 돼요 и 해야 해요 естественны в разговорной речи.',
      },
    },

    cautions: [
      {
        ko: '"하다"는 "하아야"가 아니라 "해야"로 줄어들어요.',
        uz: '하다 shakli "하아야" emas, "해야" bo‘ladi.',
        en: '하다 becomes 해야, not 하아야.',
        ru: '하다 превращается в 해야, а не 하아야.',
      },
      {
        ko: '"오다"는 "오아야"가 아니라 "와야", "보다"는 "보아야"가 줄어서 "봐야"가 돼요.',
        uz: '오다 → 와야, 보다 → 봐야 shakliga qisqaradi.',
        en: '오다 contracts to 와야, and 보다 contracts to 봐야.',
        ru: '오다 сокращается до 와야, а 보다 — до 봐야.',
      },
      {
        ko: '"되어요"는 회화에서 보통 "돼요"로 줄여요. 따라서 "해야 되어요"보다 "해야 돼요"가 더 자연스럽게 들려요.',
        uz: '되어요 kundalik nutqda odatda 돼요 ga qisqaradi.',
        en: '되어요 commonly contracts to 돼요 in conversation, so 해야 돼요 sounds very natural.',
        ru: '되어요 в разговорной речи обычно сокращается до 돼요.',
      },
      {
        ko: '"돼요"를 "되요"라고 쓰지 않도록 주의하세요. 표준 표기는 "돼요"예요.',
        uz: '"되요" emas, to‘g‘ri yozilishi "돼요".',
        en: 'Be careful with spelling: 돼요 is correct, not 되요.',
        ru: 'Правильное написание — 돼요, а не 되요.',
      },
      {
        ko: '단순한 미래 계획 "-(으)ㄹ 거예요"와 달리 "-아야/어야 돼요"에는 필요나 의무의 의미가 들어 있어요.',
        uz: '-(으)ㄹ 거예요 oddiy reja, -아야/어야 돼요 esa zarurat yoki majburiyatni bildiradi.',
        en: 'Unlike the future-plan form -(으)ㄹ 거예요, -아야/어야 돼요 contains a meaning of necessity or obligation.',
        ru: 'В отличие от -(으)ㄹ 거예요, конструкция -아야/어야 돼요 выражает необходимость или обязанность.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"가다"의 의무 표현을 고르세요.',
          uz: '"가다"ning majburiyat shaklini tanlang.',
          en: 'Choose the obligation form of 가다.',
          ru: 'Выберите форму необходимости для 가다.',
        },
        options: [
          { text: '가야 돼요', correct: true },
          { text: '가어야 돼요', correct: false },
          { text: '가을 거예요', correct: false },
        ],
      },
      {
        question: {
          ko: '"먹다"의 알맞은 형태는?',
          uz: '"먹다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 먹다.',
          ru: 'Выберите правильную форму 먹다.',
        },
        options: [
          { text: '먹어야 돼요', correct: true },
          { text: '먹아야 돼요', correct: false },
          { text: '먹지 마세요', correct: false },
        ],
      },
      {
        question: {
          ko: '"공부하다"의 알맞은 의무 표현은?',
          uz: '"공부하다"ning to‘g‘ri zarurat shakli qaysi?',
          en: 'Choose the correct obligation form of 공부하다.',
          ru: 'Выберите правильную форму необходимости для 공부하다.',
        },
        options: [
          { text: '공부해야 돼요', correct: true },
          { text: '공부하아야 돼요', correct: false },
          { text: '공부할 돼요', correct: false },
        ],
      },
      {
        question: {
          ko: '맞는 표기를 고르세요.',
          uz: 'To‘g‘ri yozilgan shaklni tanlang.',
          en: 'Choose the correctly spelled form.',
          ru: 'Выберите правильное написание.',
        },
        options: [
          { text: '해야 돼요', correct: true },
          { text: '해야 되요', correct: false },
          { text: '하야 돼요', correct: false },
        ],
      },
      {
        question: {
          ko: '"내일 친구를 만날 거예요."보다 의무의 의미가 강한 문장을 고르세요.',
          uz: 'Oddiy reja emas, majburiyat ma’nosini bildirgan gapni tanlang.',
          en: 'Choose the sentence that expresses obligation rather than a simple future plan.',
          ru: 'Выберите предложение, выражающее обязанность, а не простой план.',
        },
        options: [
          { text: '내일 친구를 만나야 돼요.', correct: true },
          { text: '내일 친구를 만날 거예요.', correct: false },
          { text: '내일 친구를 만나지 마세요.', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-13. 의도·계획 V-(으)려고 하다 ─────────
  {
    code: 'intention-euryeogo-hada',
    pattern: 'V-(으)려고 하다',
    section: 2,
    unit: 4,
    order: 13,
    isActive: true,

    summary: {
      ko: '앞으로 어떤 행동을 하려는 의도나 계획을 말할 때 사용해요. 이미 마음먹은 계획이나 가까운 미래의 행동을 표현할 때 특히 자주 써요.',
      uz: 'Kelajakda biror ishni qilish niyati yoki rejasini bildiradi. Ayniqsa oldindan qaror qilingan yoki yaqin kelajakdagi rejalar uchun ko‘p ishlatiladi.',
      en: 'Expresses an intention or plan to do something. It is especially common for plans already decided or actions intended in the near future.',
      ru: 'Выражает намерение или план что-либо сделать. Особенно часто используется для уже принятого решения или ближайших планов.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '의도', uz: 'Niyat', en: 'Intention', ru: 'Намерение' },
      { ko: '계획', uz: 'Reja', en: 'Plan', ru: 'План' },
    ],

    explanation: {
      ko: '"V-(으)려고 하다"는 말하는 사람이 앞으로 어떤 행동을 할 의도나 계획이 있을 때 사용해요. 동사 어간이 모음이나 ㄹ 받침으로 끝나면 "-려고 하다", ㄹ을 제외한 다른 받침으로 끝나면 "-으려고 하다"를 붙여요. "가다 → 가려고 하다", "먹다 → 먹으려고 하다", "살다 → 살려고 하다"처럼 만들어요. 단순히 미래에 일어날 일을 말하는 것보다 사람의 의도나 계획에 초점이 있어요. 그래서 방학 계획, 여행 계획, 공부 계획처럼 자신이 하려고 마음먹은 일을 말할 때 매우 자연스러워요. 실제 회화에서는 "하려고 해요", "가려고 해요"처럼 현재형으로 많이 사용해요.',
      uz: '"V-(으)려고 하다" gapiruvchining kelajakda biror ishni bajarish niyati yoki rejasini bildiradi. Fe’l negizi unli yoki ㄹ bilan tugasa "-려고 하다", ㄹ dan boshqa undosh bilan tugasa "-으려고 하다" ishlatiladi. Masalan: 가다 → 가려고 하다, 먹다 → 먹으려고 하다, 살다 → 살려고 하다. Bu shakl oddiy kelajakdan ko‘ra odamning niyatiga ko‘proq urg‘u beradi.',
      en: 'V-(으)려고 하다 expresses the speaker’s intention or plan to perform an action. Attach -려고 하다 after a vowel or ㄹ-final stem, and -으려고 하다 after other consonants. For example: 가다 → 가려고 하다, 먹다 → 먹으려고 하다, 살다 → 살려고 하다. Unlike a simple future statement, this form emphasizes a person’s intention or decision.',
      ru: 'V-(으)려고 하다 выражает намерение или план человека. После гласной или ㄹ используется -려고 하다, после других согласных — -으려고 하다. Например: 가다 → 가려고 하다, 먹다 → 먹으려고 하다, 살다 → 살려고 하다. В отличие от простого будущего времени, здесь подчёркивается намерение.',
    },

    conjugationRule: {
      ko: '모음/ㄹ 받침 → -려고 하다 · 그 외 받침 → -으려고 하다',
      uz: 'Unli yoki ㄹ → -려고 하다 · boshqa undosh → -으려고 하다',
      en: 'Vowel or ㄹ ending → -려고 하다 · other consonant → -으려고 하다',
      ru: 'Гласная или ㄹ → -려고 하다 · другая согласная → -으려고 하다',
    },

    conjugations: [
      { base: '가다', result: '가려고 해요' },
      { base: '오다', result: '오려고 해요' },
      { base: '만나다', result: '만나려고 해요' },
      { base: '보다', result: '보려고 해요' },
      { base: '공부하다', result: '공부하려고 해요' },
      { base: '먹다', result: '먹으려고 해요' },
      { base: '읽다', result: '읽으려고 해요' },
      { base: '입다', result: '입으려고 해요' },
      { base: '살다', result: '살려고 해요' },
      { base: '만들다', result: '만들려고 해요' },
    ],

    examples: [
      {
        ko: '방학에 제주도에 가려고 해요.',
        highlight: '가려고 해요',
        gloss: {
          ko: '방학에 제주도에 가려고 해요.',
          uz: 'Ta’tilda Jeju oroliga bormoqchiman.',
          en: 'I am planning to go to Jeju during vacation.',
          ru: 'На каникулах я собираюсь поехать на Чеджу.',
        },
      },
      {
        ko: '이번 주말에 친구를 만나려고 해요.',
        highlight: '만나려고 해요',
        gloss: {
          ko: '이번 주말에 친구를 만나려고 해요.',
          uz: 'Bu hafta oxirida do‘stim bilan uchrashmoqchiman.',
          en: 'I am planning to meet a friend this weekend.',
          ru: 'В эти выходные я собираюсь встретиться с другом.',
        },
      },
      {
        ko: '여름에 한국어를 더 열심히 공부하려고 해요.',
        highlight: '공부하려고 해요',
        gloss: {
          ko: '여름에 한국어를 더 열심히 공부하려고 해요.',
          uz: 'Yozda koreys tilini yanada jiddiyroq o‘rganmoqchiman.',
          en: 'I intend to study Korean harder this summer.',
          ru: 'Летом я собираюсь усерднее изучать корейский язык.',
        },
      },
      {
        ko: '오늘 일찍 자려고 해요.',
        highlight: '자려고 해요',
        gloss: {
          ko: '오늘 일찍 자려고 해요.',
          uz: 'Bugun erta uxlamoqchiman.',
          en: 'I am planning to go to bed early today.',
          ru: 'Сегодня я собираюсь лечь спать пораньше.',
        },
      },
      {
        ko: '점심에 비빔밥을 먹으려고 해요.',
        highlight: '먹으려고 해요',
        gloss: {
          ko: '점심에 비빔밥을 먹으려고 해요.',
          uz: 'Tushlikda bibimbap yemoqchiman.',
          en: 'I am planning to eat bibimbap for lunch.',
          ru: 'На обед я собираюсь съесть пибимпап.',
        },
      },
      {
        ko: '지하철을 타려고 해요.',
        highlight: '타려고 해요',
        gloss: {
          ko: '지하철을 타려고 해요.',
          uz: 'Metroga chiqmoqchiman.',
          en: 'I am planning to take the subway.',
          ru: 'Я собираюсь поехать на метро.',
        },
      },
      {
        ko: '여행 전에 새 가방을 사려고 해요.',
        highlight: '사려고 해요',
        gloss: {
          ko: '여행 전에 새 가방을 사려고 해요.',
          uz: 'Sayohatdan oldin yangi sumka sotib olmoqchiman.',
          en: 'I intend to buy a new bag before the trip.',
          ru: 'Перед поездкой я собираюсь купить новую сумку.',
        },
      },
      {
        ko: '저는 졸업 후에 한국에서 살려고 해요.',
        highlight: '살려고 해요',
        gloss: {
          ko: '저는 졸업 후에 한국에서 살려고 해요.',
          uz: 'O‘qishni tugatgandan keyin Koreyada yashamoqchiman.',
          en: 'I intend to live in Korea after graduation.',
          ru: 'После окончания учёбы я собираюсь жить в Корее.',
        },
      },
      {
        ko: '주말에 부모님께 전화하려고 해요.',
        highlight: '전화하려고 해요',
        gloss: {
          ko: '주말에 부모님께 전화하려고 해요.',
          uz: 'Dam olish kunlari ota-onamga qo‘ng‘iroq qilmoqchiman.',
          en: 'I intend to call my parents this weekend.',
          ru: 'На выходных я собираюсь позвонить родителям.',
        },
      },
      {
        ko: '한국 여행을 준비하려고 해요.',
        highlight: '준비하려고 해요',
        gloss: {
          ko: '한국 여행을 준비하려고 해요.',
          uz: 'Koreyaga sayohatga tayyorlanmoqchiman.',
          en: 'I am going to prepare for my trip to Korea.',
          ru: 'Я собираюсь готовиться к поездке в Корею.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이번 방학에 뭐 하려고 해요?',
        highlight: '뭐 하려고 해요',
        gloss: {
          ko: '이번 방학에 뭐 하려고 해요?',
          uz: 'Bu ta’tilda nima qilmoqchisiz?',
          en: 'What are you planning to do this vacation?',
          ru: 'Что вы собираетесь делать на каникулах?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '친구하고 부산에 여행을 가려고 해요.',
        highlight: '가려고 해요',
        gloss: {
          ko: '친구하고 부산에 여행을 가려고 해요.',
          uz: 'Do‘stim bilan Pusanga sayohat qilmoqchiman.',
          en: 'I am planning to travel to Busan with a friend.',
          ru: 'Я собираюсь поехать в Пусан с другом.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '부산에서 뭐 하려고 해요?',
        highlight: '뭐 하려고 해요',
        gloss: {
          ko: '부산에서 뭐 하려고 해요?',
          uz: 'Pusanda nima qilmoqchisiz?',
          en: 'What are you planning to do in Busan?',
          ru: 'Что вы собираетесь делать в Пусане?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '바다도 보고 맛있는 음식도 먹으려고 해요.',
        highlight: '먹으려고 해요',
        gloss: {
          ko: '바다도 보고 맛있는 음식도 먹으려고 해요.',
          uz: 'Dengizni ko‘rib, mazali taomlar ham yemoqchiman.',
          en: 'I plan to see the sea and eat some delicious food.',
          ru: 'Хочу посмотреть море и поесть вкусной еды.',
        },
      },
    ],

    similar: {
      pattern: 'V-(으)ㄹ 거예요',
      note: {
        ko: '"-(으)ㄹ 거예요"는 미래의 계획이나 예상을 넓게 표현할 수 있고, "-(으)려고 하다"는 말하는 사람의 의도나 이미 세운 계획을 좀 더 직접적으로 보여 줘요. "한국에 갈 거예요"는 미래 계획이고, "한국에 가려고 해요"는 그렇게 하려는 의도가 더 강조돼요.',
        uz: '-(으)ㄹ 거예요 umumiy kelajak rejasini bildirishi mumkin, -(으)려고 하다 esa aniq niyatga ko‘proq urg‘u beradi.',
        en: '-(으)ㄹ 거예요 broadly expresses a future plan or prediction, while -(으)려고 하다 more directly emphasizes intention.',
        ru: '-(으)ㄹ 거예요 шире выражает будущее, а -(으)려고 하다 сильнее подчёркивает намерение.',
      },
    },

    cautions: [
      {
        ko: 'ㄹ 받침 동사는 "-으려고"가 아니라 "-려고"를 붙여요. "살으려고"가 아니라 "살려고"예요.',
        uz: 'ㄹ bilan tugagan fe’lga -으려고 emas, -려고 qo‘shiladi: 살려고.',
        en: 'ㄹ-final verbs take -려고, not -으려고: 살려고.',
        ru: 'После ㄹ используется -려고, а не -으려고: 살려고.',
      },
      {
        ko: '"먹다"처럼 다른 받침으로 끝나면 "-으려고"를 사용해서 "먹으려고 해요"라고 해요.',
        uz: 'Boshqa undosh bilan tugagan fe’llarda -으려고 ishlatiladi: 먹으려고 해요.',
        en: 'After other consonants, use -으려고: 먹으려고 해요.',
        ru: 'После других согласных используется -으려고: 먹으려고 해요.',
      },
      {
        ko: '이 표현은 사람의 의도와 계획에 주로 사용해요. 날씨처럼 스스로 의도를 가질 수 없는 대상에는 보통 사용하지 않아요.',
        uz: 'Bu shakl asosan insonning niyati uchun ishlatiladi. Ob-havo kabi niyatga ega bo‘lmagan narsalarda odatda ishlatilmaydi.',
        en: 'This form is mainly used for intentional actions by people, not normally for things such as weather that cannot have intentions.',
        ru: 'Форма обычно используется для намеренных действий человека, а не для явлений вроде погоды.',
      },
      {
        ko: '"하려고 해요"는 단순한 희망보다 실제로 하려는 계획에 가까워요.',
        uz: '"하려고 해요" shunchaki istakdan ko‘ra aniqroq reja yoki niyatni bildiradi.',
        en: '하려고 해요 suggests an actual intention or plan rather than merely a wish.',
        ru: '하려고 해요 выражает скорее реальное намерение, чем просто желание.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"가다"의 알맞은 형태를 고르세요.',
          uz: '"가다"ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct form of 가다.',
          ru: 'Выберите правильную форму 가다.',
        },
        options: [
          { text: '가려고 해요', correct: true },
          { text: '가으려고 해요', correct: false },
          { text: '갈려고 해요', correct: false },
        ],
      },
      {
        question: {
          ko: '"먹다"의 알맞은 형태는?',
          uz: '"먹다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 먹다.',
          ru: 'Выберите правильную форму 먹다.',
        },
        options: [
          { text: '먹으려고 해요', correct: true },
          { text: '먹려고 해요', correct: false },
          { text: '먹어려고 해요', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다"의 알맞은 형태를 고르세요.',
          uz: '"살다"ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct form of 살다.',
          ru: 'Выберите правильную форму 살다.',
        },
        options: [
          { text: '살려고 해요', correct: true },
          { text: '살으려고 해요', correct: false },
          { text: '사려고 해요', correct: false },
        ],
      },
      {
        question: {
          ko: '방학 계획을 묻는 가장 자연스러운 표현은?',
          uz: 'Ta’til rejasini so‘rash uchun eng tabiiy gap qaysi?',
          en: 'Which is the most natural way to ask about vacation plans?',
          ru: 'Как естественнее спросить о планах на каникулы?',
        },
        options: [
          { text: '방학에 뭐 하려고 해요?', correct: true },
          { text: '방학에 뭐 했어요?', correct: false },
          { text: '방학이 몇 시예요?', correct: false },
        ],
      },
      {
        question: {
          ko: '의도가 가장 분명하게 나타나는 문장을 고르세요.',
          uz: 'Niyatni eng aniq bildirgan gapni tanlang.',
          en: 'Choose the sentence that most clearly expresses intention.',
          ru: 'Выберите предложение, наиболее ясно выражающее намерение.',
        },
        options: [
          { text: '한국어를 공부하려고 해요.', correct: true },
          { text: '한국어를 공부했어요.', correct: false },
          { text: '한국어를 공부하지 마세요.', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-14. 출발지와 도착지 N에서 N까지 ─────────
  {
    code: 'route-eseo-kkaji',
    pattern: 'N에서 N까지',
    section: 2,
    unit: 4,
    order: 14,
    isActive: true,

    summary: {
      ko: '이동의 출발 장소와 도착 장소를 함께 나타낼 때 사용해요. 교통수단이나 길을 설명할 때 매우 자주 쓰여요.',
      uz: 'Harakatning boshlanish joyi va boradigan joyini birga ko‘rsatadi. Transport va yo‘l tushuntirishda juda ko‘p ishlatiladi.',
      en: 'Expresses the starting place and destination of movement. It is especially common when describing transportation and routes.',
      ru: 'Показывает начальное и конечное место движения. Часто используется при объяснении маршрутов и транспорта.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '교통', uz: 'Transport', en: 'Transportation', ru: 'Транспорт' },
      { ko: '이동', uz: 'Harakat', en: 'Movement', ru: 'Передвижение' },
    ],

    explanation: {
      ko: '"N에서 N까지"에서 "에서"는 이동을 시작하는 장소, "까지"는 이동이 끝나는 장소를 나타내요. "집에서 학교까지 버스로 가요"라고 하면 집에서 출발해서 학교에 도착한다는 뜻이에요. 특히 교통편, 거리, 이동 시간 등을 말할 때 자주 사용해요. 이전에 배운 "N부터 N까지"가 시간이나 범위를 넓게 나타낸다면, 이동의 출발 장소를 말할 때는 "에서"를 사용하는 것이 매우 자연스러워요. "서울에서 부산까지", "학교에서 집까지"처럼 장소를 연결해 익혀 두면 좋아요.',
      uz: '"N에서 N까지" shaklida 에서 harakat boshlanadigan joyni, 까지 esa tugaydigan joyni bildiradi. "집에서 학교까지 버스로 가요" — uydan maktabgacha avtobusda boraman degani. Ayniqsa transport, masofa va yo‘l vaqtini aytishda ishlatiladi.',
      en: 'In N에서 N까지, 에서 marks the place where movement begins and 까지 marks the destination or end point. 집에서 학교까지 버스로 가요 means traveling from home to school by bus. This pattern is particularly useful for transportation, distance, and travel time.',
      ru: 'В N에서 N까지 частица 에서 обозначает место отправления, а 까지 — конечную точку. 집에서 학교까지 버스로 가요 означает «я еду из дома до школы на автобусе». Конструкция особенно полезна для маршрутов, расстояний и времени в пути.',
    },

    conjugationRule: {
      ko: '출발 장소 + 에서 + 도착 장소 + 까지',
      uz: 'Boshlanish joyi + 에서 + boradigan joy + 까지',
      en: 'Starting place + 에서 + destination + 까지',
      ru: 'Место отправления + 에서 + место назначения + 까지',
    },

    conjugations: [
      { base: '집 → 학교', result: '집에서 학교까지' },
      { base: '서울 → 부산', result: '서울에서 부산까지' },
      { base: '공항 → 호텔', result: '공항에서 호텔까지' },
      { base: '회사 → 집', result: '회사에서 집까지' },
      { base: '학교 → 역', result: '학교에서 역까지' },
      { base: '강남역 → 서울역', result: '강남역에서 서울역까지' },
      { base: '여기 → 시청', result: '여기에서 시청까지' },
      { base: '호텔 → 경복궁', result: '호텔에서 경복궁까지' },
    ],

    examples: [
      {
        ko: '집에서 학교까지 버스로 가요.',
        highlight: '집에서 학교까지',
        gloss: {
          ko: '집에서 학교까지 버스로 가요.',
          uz: 'Uydan maktabgacha avtobusda boraman.',
          en: 'I go from home to school by bus.',
          ru: 'Я еду из дома в школу на автобусе.',
        },
      },
      {
        ko: '서울에서 부산까지 기차로 가요.',
        highlight: '서울에서 부산까지',
        gloss: {
          ko: '서울에서 부산까지 기차로 가요.',
          uz: 'Seuldan Pusangacha poyezdda boraman.',
          en: 'I travel from Seoul to Busan by train.',
          ru: 'Я еду из Сеула в Пусан на поезде.',
        },
      },
      {
        ko: '공항에서 호텔까지 택시를 타요.',
        highlight: '공항에서 호텔까지',
        gloss: {
          ko: '공항에서 호텔까지 택시를 타요.',
          uz: 'Aeroportdan mehmonxonagacha taksida boraman.',
          en: 'I take a taxi from the airport to the hotel.',
          ru: 'Я еду на такси из аэропорта до гостиницы.',
        },
      },
      {
        ko: '학교에서 집까지 얼마나 걸려요?',
        highlight: '학교에서 집까지',
        gloss: {
          ko: '학교에서 집까지 얼마나 걸려요?',
          uz: 'Maktabdan uygacha qancha vaqt ketadi?',
          en: 'How long does it take from school to home?',
          ru: 'Сколько времени занимает дорога от школы до дома?',
        },
      },
      {
        ko: '여기에서 서울역까지 멀어요?',
        highlight: '여기에서 서울역까지',
        gloss: {
          ko: '여기에서 서울역까지 멀어요?',
          uz: 'Bu yerdan Seul vokzaligacha uzoqmi?',
          en: 'Is it far from here to Seoul Station?',
          ru: 'Отсюда до вокзала Сеул далеко?',
        },
      },
      {
        ko: '강남역에서 서울역까지 지하철로 삼십 분쯤 걸려요.',
        highlight: '강남역에서 서울역까지',
        gloss: {
          ko: '강남역에서 서울역까지 지하철로 삼십 분쯤 걸려요.',
          uz: 'Gangnam bekatidan Seul bekatigacha metroda taxminan 30 daqiqa ketadi.',
          en: 'It takes about thirty minutes by subway from Gangnam Station to Seoul Station.',
          ru: 'От станции Каннам до станции Сеул на метро примерно тридцать минут.',
        },
      },
      {
        ko: '호텔에서 경복궁까지 걸어갈 수 있어요.',
        highlight: '호텔에서 경복궁까지',
        gloss: {
          ko: '호텔에서 경복궁까지 걸어갈 수 있어요.',
          uz: 'Mehmonxonadan Gyeongbokgung saroyigacha piyoda borish mumkin.',
          en: 'You can walk from the hotel to Gyeongbokgung Palace.',
          ru: 'От отеля до дворца Кёнбоккун можно дойти пешком.',
        },
      },
      {
        ko: '회사에서 집까지 한 시간 걸려요.',
        highlight: '회사에서 집까지',
        gloss: {
          ko: '회사에서 집까지 한 시간 걸려요.',
          uz: 'Ishxonadan uygacha bir soat ketadi.',
          en: 'It takes one hour from work to home.',
          ru: 'От работы до дома ехать один час.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '서울역에서 명동까지 어떻게 가요?',
        highlight: '서울역에서 명동까지',
        gloss: {
          ko: '서울역에서 명동까지 어떻게 가요?',
          uz: 'Seul vokzalidan Myeongdonggacha qanday boriladi?',
          en: 'How do I get from Seoul Station to Myeongdong?',
          ru: 'Как добраться от вокзала Сеул до Мёндона?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '지하철로 가세요.',
        highlight: '지하철로',
        gloss: {
          ko: '지하철로 가세요.',
          uz: 'Metroda boring.',
          en: 'Take the subway.',
          ru: 'Поезжайте на метро.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '서울역에서 명동까지 얼마나 걸려요?',
        highlight: '서울역에서 명동까지',
        gloss: {
          ko: '서울역에서 명동까지 얼마나 걸려요?',
          uz: 'Seul vokzalidan Myeongdonggacha qancha vaqt ketadi?',
          en: 'How long does it take from Seoul Station to Myeongdong?',
          ru: 'Сколько времени ехать от вокзала Сеул до Мёндона?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '십 분쯤 걸려요.',
        highlight: '십 분쯤',
        gloss: {
          ko: '십 분쯤 걸려요.',
          uz: 'Taxminan o‘n daqiqa.',
          en: 'It takes about ten minutes.',
          ru: 'Примерно десять минут.',
        },
      },
    ],

    similar: {
      pattern: 'N부터 N까지',
      note: {
        ko: '"부터...까지"는 시간이나 범위를 나타낼 때 넓게 사용할 수 있지만, 실제 이동의 출발 장소를 나타낼 때는 "에서...까지"가 특히 자연스러워요. "9시부터 5시까지"는 시간, "서울에서 부산까지"는 이동 경로예요.',
        uz: '부터...까지 vaqt va umumiy oraliqda ishlatiladi, 에서...까지 esa harakatning boshlanish va tugash joylari uchun ayniqsa tabiiy.',
        en: '부터...까지 is broadly used for ranges such as time, while 에서...까지 is especially natural for physical movement between places.',
        ru: '부터...까지 широко используется для диапазонов, например времени, а 에서...까지 особенно естественно для маршрутов между местами.',
      },
    },

    cautions: [
      {
        ko: '이동의 출발 장소를 나타낼 때는 "에"가 아니라 "에서"를 사용해요. "서울에 부산까지"가 아니라 "서울에서 부산까지"예요.',
        uz: 'Harakat boshlanadigan joy uchun 에 emas, 에서 ishlatiladi.',
        en: 'Use 에서, not 에, for the starting place of movement.',
        ru: 'Для места отправления используется 에서, а не 에.',
      },
      {
        ko: '"까지"는 도착점이나 범위의 끝을 나타내요.',
        uz: '까지 harakatning yoki oraliqning oxirgi nuqtasini bildiradi.',
        en: '까지 marks the destination or end point.',
        ru: '까지 обозначает конечную точку.',
      },
      {
        ko: '"여기에서"는 회화에서 "여기서"로 줄여서 말하기도 해요.',
        uz: '여기에서 kundalik nutqda 여기서 ga qisqarishi mumkin.',
        en: '여기에서 is often contracted to 여기서 in conversation.',
        ru: '여기에서 в разговорной речи часто сокращается до 여기서.',
      },
      {
        ko: '시간 범위를 말할 때는 보통 "9시에서 5시까지"보다 "9시부터 5시까지"가 자연스러워요.',
        uz: 'Vaqt oralig‘ida odatda 에서 emas, 부터 tabiiyroq.',
        en: 'For time ranges, 부터...까지 is normally more natural than 에서...까지.',
        ru: 'Для диапазона времени обычно естественнее 부터...까지.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '빈칸에 알맞은 것을 고르세요. "집___ 학교까지 버스로 가요."',
          uz: 'Bo‘sh joyga mos javobni tanlang.',
          en: 'Choose the correct answer: "집___ 학교까지 버스로 가요."',
          ru: 'Выберите правильный вариант.',
        },
        options: [
          { text: '에서', correct: true },
          { text: '에', correct: false },
          { text: '부터만', correct: false },
        ],
      },
      {
        question: {
          ko: '이동 경로를 가장 자연스럽게 나타낸 표현은?',
          uz: 'Harakat yo‘nalishini eng tabiiy ifodalagan variantni tanlang.',
          en: 'Choose the most natural expression for a travel route.',
          ru: 'Выберите наиболее естественное выражение маршрута.',
        },
        options: [
          { text: '서울에서 부산까지', correct: true },
          { text: '서울에 부산까지', correct: false },
          { text: '서울까지 부산에서부터만', correct: false },
        ],
      },
      {
        question: {
          ko: '"학교에서 집까지 얼마나 걸려요?"는 무엇을 묻는 말이에요?',
          uz: 'Bu gap nimani so‘raydi?',
          en: 'What does "학교에서 집까지 얼마나 걸려요?" ask?',
          ru: 'О чём спрашивает "학교에서 집까지 얼마나 걸려요?"?',
        },
        options: [
          { text: '학교에서 집까지 걸리는 시간', correct: true },
          { text: '학교 수업 시작 시간', correct: false },
          { text: '집의 크기', correct: false },
        ],
      },
      {
        question: {
          ko: '시간 범위에 더 자연스러운 표현을 고르세요.',
          uz: 'Vaqt oralig‘i uchun tabiiyroq ifodani tanlang.',
          en: 'Choose the more natural expression for a time range.',
          ru: 'Выберите более естественное выражение диапазона времени.',
        },
        options: [
          { text: '아홉 시부터 다섯 시까지', correct: true },
          { text: '아홉 시에서 다섯 시까지', correct: false },
          { text: '아홉 시에 다섯 시까지', correct: false },
        ],
      },
      {
        question: {
          ko: '빈칸에 알맞은 것을 고르세요. "공항에서 호텔___ 택시로 가요."',
          uz: 'Bo‘sh joyga mos javobni tanlang.',
          en: 'Choose the correct answer.',
          ru: 'Выберите правильный вариант.',
        },
        options: [
          { text: '까지', correct: true },
          { text: '에서', correct: false },
          { text: '부터', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-15. 부탁과 도움 V-아/어 주다 ─────────
  {
    code: 'benefactive-a-eo-juda',
    pattern: 'V-아/어 주다',
    section: 2,
    unit: 4,
    order: 15,
    isActive: true,

    summary: {
      ko: '다른 사람을 위해 어떤 행동을 해 주는 것을 나타내요. "-아/어 주세요" 형태로 사용하면 상대방에게 정중하게 부탁할 수 있어요.',
      uz: 'Boshqa odam uchun biror ishni bajarishni bildiradi. "-아/어 주세요" shakli orqali muloyim iltimos qilish mumkin.',
      en: 'Expresses doing an action for someone else. In the form -아/어 주세요, it is commonly used to make polite requests.',
      ru: 'Выражает действие, выполняемое для другого человека. Форма -아/어 주세요 часто используется для вежливой просьбы.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '요청', uz: 'Iltimos', en: 'Request', ru: 'Просьба' },
      { ko: '도움', uz: 'Yordam', en: 'Help', ru: 'Помощь' },
    ],

    explanation: {
      ko: '"V-아/어 주다"는 어떤 사람이 다른 사람을 위해 행동하는 것을 나타내요. "친구가 숙제를 도와 줬어요"처럼 도움을 받은 상황을 설명할 수도 있고, "문을 열어 주세요"처럼 상대방에게 부탁할 수도 있어요. 동사 어간의 마지막 모음이 ㅏ 또는 ㅗ이면 "-아 주다", 그 밖의 모음이면 "-어 주다"를 사용하고, "하다"는 "-해 주다"가 돼요. 요청에서는 특히 "-아/어 주세요"가 매우 중요해요. 택시에서는 "서울역으로 가 주세요", 가게에서는 "이것을 보여 주세요", 길을 물을 때는 "좀 알려 주세요"처럼 실제 생활에서 매우 넓게 사용할 수 있어요.',
      uz: '"V-아/어 주다" biror kishining boshqa odam uchun harakat bajarishini bildiradi. Masalan, 친구가 도와 줬어요 — do‘stim yordam berdi. "-아/어 주세요" shakli esa muloyim iltimos uchun ishlatiladi. Oxirgi unli ㅏ yoki ㅗ bo‘lsa -아 주다, boshqa hollarda -어 주다, 하다 esa -해 주다 bo‘ladi.',
      en: 'V-아/어 주다 expresses doing an action for another person. It can describe a favor already done, as in 친구가 도와 줬어요, or make a request with -아/어 주세요. Use -아 주다 after ㅏ or ㅗ, -어 주다 after other vowels, and -해 주다 with 하다 verbs. This is extremely useful in taxis, stores, restaurants, and everyday requests.',
      ru: 'V-아/어 주다 обозначает действие, сделанное для другого человека. Конструкция может описывать оказанную услугу или использоваться в просьбе через -아/어 주세요. После ㅏ или ㅗ используется -아 주다, после других гласных — -어 주다, а 하다 даёт -해 주다.',
    },

    conjugationRule: {
      ko: 'ㅏ/ㅗ → -아 주다 · 그 외 → -어 주다 · 하다 → -해 주다 · 정중한 요청 → -아/어 주세요',
      uz: 'ㅏ/ㅗ → -아 주다 · boshqa unlilar → -어 주다 · 하다 → -해 주다 · muloyim iltimos → -아/어 주세요',
      en: 'ㅏ/ㅗ → -아 주다 · other vowels → -어 주다 · 하다 → -해 주다 · polite request → -아/어 주세요',
      ru: 'ㅏ/ㅗ → -아 주다 · остальные → -어 주다 · 하다 → -해 주다 · вежливая просьба → -아/어 주세요',
    },

    conjugations: [
      { base: '가다', result: '가 주세요' },
      { base: '오다', result: '와 주세요' },
      { base: '보다', result: '봐 주세요' },
      { base: '읽다', result: '읽어 주세요' },
      { base: '먹다', result: '먹어 주세요' },
      { base: '열다', result: '열어 주세요' },
      { base: '닫다', result: '닫아 주세요' },
      { base: '기다리다', result: '기다려 주세요' },
      { base: '설명하다', result: '설명해 주세요' },
      { base: '도와주다', result: '도와주세요' },
    ],

    examples: [
      {
        ko: '문을 열어 주세요.',
        highlight: '열어 주세요',
        gloss: {
          ko: '문을 열어 주세요.',
          uz: 'Iltimos, eshikni oching.',
          en: 'Please open the door.',
          ru: 'Пожалуйста, откройте дверь.',
        },
      },
      {
        ko: '서울역으로 가 주세요.',
        highlight: '가 주세요',
        gloss: {
          ko: '서울역으로 가 주세요.',
          uz: 'Iltimos, Seul vokzaliga olib boring.',
          en: 'Please take me to Seoul Station.',
          ru: 'Пожалуйста, отвезите меня на вокзал Сеул.',
        },
      },
      {
        ko: '여기에서 잠깐 기다려 주세요.',
        highlight: '기다려 주세요',
        gloss: {
          ko: '여기에서 잠깐 기다려 주세요.',
          uz: 'Iltimos, bu yerda biroz kuting.',
          en: 'Please wait here for a moment.',
          ru: 'Пожалуйста, немного подождите здесь.',
        },
      },
      {
        ko: '이 사진을 봐 주세요.',
        highlight: '봐 주세요',
        gloss: {
          ko: '이 사진을 봐 주세요.',
          uz: 'Iltimos, bu rasmga qarang.',
          en: 'Please look at this picture.',
          ru: 'Пожалуйста, посмотрите на эту фотографию.',
        },
      },
      {
        ko: '이 문장을 읽어 주세요.',
        highlight: '읽어 주세요',
        gloss: {
          ko: '이 문장을 읽어 주세요.',
          uz: 'Iltimos, bu gapni o‘qing.',
          en: 'Please read this sentence.',
          ru: 'Пожалуйста, прочитайте это предложение.',
        },
      },
      {
        ko: '한국어로 천천히 말해 주세요.',
        highlight: '말해 주세요',
        gloss: {
          ko: '한국어로 천천히 말해 주세요.',
          uz: 'Iltimos, koreys tilida sekin gapiring.',
          en: 'Please speak slowly in Korean.',
          ru: 'Пожалуйста, говорите по-корейски медленно.',
        },
      },
      {
        ko: '길을 좀 알려 주세요.',
        highlight: '알려 주세요',
        gloss: {
          ko: '길을 좀 알려 주세요.',
          uz: 'Iltimos, yo‘lni tushuntirib bering.',
          en: 'Please tell me the way.',
          ru: 'Пожалуйста, подскажите дорогу.',
        },
      },
      {
        ko: '친구가 제 가방을 들어 줬어요.',
        highlight: '들어 줬어요',
        gloss: {
          ko: '친구가 제 가방을 들어 줬어요.',
          uz: 'Do‘stim sumkamni ko‘tarib berdi.',
          en: 'My friend carried my bag for me.',
          ru: 'Друг помог мне нести сумку.',
        },
      },
      {
        ko: '선생님이 어려운 문법을 설명해 주셨어요.',
        highlight: '설명해 주셨어요',
        gloss: {
          ko: '선생님이 어려운 문법을 설명해 주셨어요.',
          uz: 'O‘qituvchi qiyin grammatikani tushuntirib berdi.',
          en: 'The teacher explained the difficult grammar for us.',
          ru: 'Учитель объяснил нам сложную грамматику.',
        },
      },
      {
        ko: '사진을 한 장 찍어 주세요.',
        highlight: '찍어 주세요',
        gloss: {
          ko: '사진을 한 장 찍어 주세요.',
          uz: 'Iltimos, bitta suratga olib bering.',
          en: 'Please take a picture for me.',
          ru: 'Пожалуйста, сфотографируйте меня.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '어디로 가세요?',
        highlight: '어디로',
        gloss: {
          ko: '어디로 가세요?',
          uz: 'Qayerga borasiz?',
          en: 'Where are you going?',
          ru: 'Куда вы едете?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '서울역으로 가 주세요.',
        highlight: '가 주세요',
        gloss: {
          ko: '서울역으로 가 주세요.',
          uz: 'Iltimos, Seul vokzaliga olib boring.',
          en: 'Please take me to Seoul Station.',
          ru: 'Пожалуйста, отвезите меня на вокзал Сеул.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '어느 길로 갈까요?',
        highlight: '어느 길로',
        gloss: {
          ko: '어느 길로 갈까요?',
          uz: 'Qaysi yo‘l orqali boraylik?',
          en: 'Which way shall we go?',
          ru: 'По какой дороге поедем?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '빠른 길로 가 주세요.',
        highlight: '가 주세요',
        gloss: {
          ko: '빠른 길로 가 주세요.',
          uz: 'Iltimos, tezroq yo‘l bilan boring.',
          en: 'Please take the faster route.',
          ru: 'Пожалуйста, поезжайте по более быстрому маршруту.',
        },
      },
    ],

    similar: {
      pattern: 'V-(으)세요',
      note: {
        ko: '"-(으)세요"도 상대방에게 행동을 요청하거나 지시할 수 있지만, "-아/어 주세요"는 "나를 위해 그렇게 해 달라"는 부탁의 느낌이 더 분명해요. "앉으세요"는 앉으라는 안내이고, "기다려 주세요"는 기다려 달라는 부탁에 가까워요.',
        uz: '-(으)세요 ham buyruq yoki iltimosda ishlatiladi, lekin -아/어 주세요 boshqa odamdan siz uchun biror ish qilishini so‘rash ma’nosini kuchliroq beradi.',
        en: '-(으)세요 can also give directions or polite commands, while -아/어 주세요 more clearly asks someone to do something for you.',
        ru: '-(으)세요 также используется для вежливых указаний, но -아/어 주세요 сильнее выражает просьбу сделать что-либо для говорящего.',
      },
    },

    cautions: [
      {
        ko: '"주세요"만 외우기보다 앞 동사의 활용까지 정확히 해야 해요. "보다 → 봐 주세요", "오다 → 와 주세요"처럼 줄어드는 형태가 있어요.',
        uz: 'Faqat 주세요 ni emas, oldingi fe’lning to‘g‘ri tuslanishini ham bilish kerak: 보다 → 봐 주세요, 오다 → 와 주세요.',
        en: 'Pay attention to the preceding verb conjugation: 보다 → 봐 주세요, 오다 → 와 주세요.',
        ru: 'Важно правильно изменять предыдущий глагол: 보다 → 봐 주세요, 오다 → 와 주세요.',
      },
      {
        ko: '"하다"는 "하아 주세요"가 아니라 "해 주세요"예요.',
        uz: '하다 → 하아 주세요 emas, 해 주세요.',
        en: '하다 becomes 해 주세요, not 하아 주세요.',
        ru: '하다 превращается в 해 주세요, а не 하아 주세요.',
      },
      {
        ko: '"주다"는 실제로 물건을 주는 뜻도 있지만 "-아/어 주다"에서는 다른 사람을 위해 행동한다는 의미를 더해 줘요.',
        uz: '주다 alohida holda "bermoq" degani, lekin -아/어 주다 shaklida boshqa odam uchun ish qilish ma’nosini qo‘shadi.',
        en: '주다 normally means "to give", but in -아/어 주다 it adds the meaning of doing an action for someone.',
        ru: '주다 отдельно означает «давать», но в -아/어 주다 добавляет значение действия для другого человека.',
      },
      {
        ko: '아주 공식적인 상황이나 윗사람에게 부탁할 때는 말투와 상황에 따라 더 공손한 표현이 필요할 수 있어요.',
        uz: 'Juda rasmiy vaziyatlarda yoki yuqori martabali odamga murojaatda yanada hurmatli shakl kerak bo‘lishi mumkin.',
        en: 'In very formal situations, a more deferential request may be appropriate depending on context.',
        ru: 'В очень официальной ситуации может потребоваться ещё более вежливая форма.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"보다"의 알맞은 요청 표현은?',
          uz: '"보다"ning to‘g‘ri iltimos shakli qaysi?',
          en: 'Choose the correct request form of 보다.',
          ru: 'Выберите правильную форму просьбы от 보다.',
        },
        options: [
          { text: '봐 주세요', correct: true },
          { text: '보아 주세요만', correct: false },
          { text: '보으세요', correct: false },
        ],
      },
      {
        question: {
          ko: '"하다"의 알맞은 형태를 고르세요.',
          uz: '"하다"ning to‘g‘ri shaklini tanlang.',
          en: 'Choose the correct form of 하다.',
          ru: 'Выберите правильную форму 하다.',
        },
        options: [
          { text: '해 주세요', correct: true },
          { text: '하아 주세요', correct: false },
          { text: '하어 주세요', correct: false },
        ],
      },
      {
        question: {
          ko: '택시에서 가장 자연스럽게 부탁하는 표현은?',
          uz: 'Taksida eng tabiiy iltimos qaysi?',
          en: 'Which is the most natural request in a taxi?',
          ru: 'Какая просьба наиболее естественна в такси?',
        },
        options: [
          { text: '서울역으로 가 주세요.', correct: true },
          { text: '서울역을 먹어 주세요.', correct: false },
          { text: '서울역에서 마세요.', correct: false },
        ],
      },
      {
        question: {
          ko: '다른 사람이 나를 위해 행동했다는 의미가 있는 문장은?',
          uz: 'Boshqa odam men uchun biror ish qilganini bildirgan gapni tanlang.',
          en: 'Choose the sentence showing that someone did something for the speaker.',
          ru: 'Выберите предложение, где кто-то сделал что-то для говорящего.',
        },
        options: [
          { text: '친구가 가방을 들어 줬어요.', correct: true },
          { text: '친구가 가방을 샀어요.', correct: false },
          { text: '친구가 집에 있어요.', correct: false },
        ],
      },
      {
        question: {
          ko: '"기다리다"의 정중한 부탁 표현은?',
          uz: '"기다리다"ning muloyim iltimos shakli qaysi?',
          en: 'Choose the polite request form of 기다리다.',
          ru: 'Выберите вежливую форму просьбы от 기다리다.',
        },
        options: [
          { text: '기다려 주세요', correct: true },
          { text: '기다리어 마세요', correct: false },
          { text: '기다릴 주세요', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-16. 방향·수단 N(으)로 ─────────
  {
    code: 'direction-euro',
    pattern: 'N(으)로',
    section: 2,
    unit: 4,
    order: 16,
    isActive: true,

    summary: {
      ko: '이동하는 방향이나 목적지, 사용하는 교통수단·도구·방법을 나타내요. 길 안내와 교통 상황에서 특히 많이 사용해요.',
      uz: 'Yo‘nalish, boradigan tomon, transport vositasi, asbob yoki usulni bildiradi. Yo‘l va transport haqida gapirganda juda ko‘p ishlatiladi.',
      en: 'Marks direction, destination, transportation, instrument, or method. It is especially common in route and transportation expressions.',
      ru: 'Обозначает направление, средство транспорта, инструмент или способ действия. Особенно часто используется при объяснении маршрутов.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '방향', uz: 'Yo‘nalish', en: 'Direction', ru: 'Направление' },
      { ko: '수단', uz: 'Vosita', en: 'Means', ru: 'Средство' },
    ],

    explanation: {
      ko: '"N(으)로"는 크게 두 가지 중요한 의미가 있어요. 첫째, "서울역으로 가요", "오른쪽으로 가세요"처럼 이동의 방향이나 목적지를 나타내요. 둘째, "버스로 가요", "연필로 써요", "한국어로 말해요"처럼 교통수단, 도구, 방법이나 언어를 나타내요. 받침이 없거나 ㄹ 받침이면 "-로"를 붙이고, ㄹ을 제외한 다른 받침이 있으면 "-으로"를 붙여요. 그래서 "버스 → 버스로", "택시 → 택시로", "길 → 길로", "집 → 집으로"가 돼요. 특히 ㄹ 받침도 "-으로"가 아니라 "-로"라는 점을 기억해야 해요.',
      uz: '"N(으)로" ikki asosiy ma’noga ega. Birinchisi yo‘nalish yoki manzil: 서울역으로 가요, 오른쪽으로 가세요. Ikkinchisi transport, vosita, usul yoki til: 버스로 가요, 연필로 써요, 한국어로 말해요. Ot unli yoki ㄹ bilan tugasa -로, boshqa undosh bilan tugasa -으로 ishlatiladi.',
      en: 'N(으)로 has two major uses. First, it marks direction or destination, as in 서울역으로 가요 and 오른쪽으로 가세요. Second, it marks transportation, tools, methods, or language, as in 버스로 가요, 연필로 써요, and 한국어로 말해요. Attach -로 after a vowel or ㄹ, and -으로 after other consonants.',
      ru: 'N(으)로 имеет два основных значения. Во-первых, направление или место назначения: 서울역으로 가요, 오른쪽으로 가세요. Во-вторых, средство транспорта, инструмент, способ или язык: 버스로 가요, 연필로 써요, 한국어로 말해요. После гласной или ㄹ используется -로, после других согласных — -으로.',
    },

    conjugationRule: {
      ko: '받침 X → -로 · ㄹ 받침 → -로 · 그 외 받침 → -으로',
      uz: '받침 yo‘q → -로 · ㄹ → -로 · boshqa 받침 → -으로',
      en: 'No final consonant → -로 · ㄹ final → -로 · other final consonant → -으로',
      ru: 'Без 받침 → -로 · после ㄹ → -로 · после других согласных → -으로',
    },

    conjugations: [
      { base: '버스', result: '버스로' },
      { base: '택시', result: '택시로' },
      { base: '지하철', result: '지하철로' },
      { base: '기차', result: '기차로' },
      { base: '집', result: '집으로' },
      { base: '서울역', result: '서울역으로' },
      { base: '오른쪽', result: '오른쪽으로' },
      { base: '왼쪽', result: '왼쪽으로' },
      { base: '연필', result: '연필로' },
      { base: '한국어', result: '한국어로' },
    ],

    examples: [
      {
        ko: '학교에 버스로 가요.',
        highlight: '버스로',
        gloss: {
          ko: '학교에 버스로 가요.',
          uz: 'Maktabga avtobusda boraman.',
          en: 'I go to school by bus.',
          ru: 'Я езжу в школу на автобусе.',
        },
      },
      {
        ko: '서울역으로 가 주세요.',
        highlight: '서울역으로',
        gloss: {
          ko: '서울역으로 가 주세요.',
          uz: 'Iltimos, Seul vokzaliga olib boring.',
          en: 'Please take me to Seoul Station.',
          ru: 'Пожалуйста, отвезите меня на вокзал Сеул.',
        },
      },
      {
        ko: '부산까지 기차로 가요.',
        highlight: '기차로',
        gloss: {
          ko: '부산까지 기차로 가요.',
          uz: 'Pusangacha poyezdda boraman.',
          en: 'I go to Busan by train.',
          ru: 'Я еду в Пусан на поезде.',
        },
      },
      {
        ko: '오른쪽으로 가세요.',
        highlight: '오른쪽으로',
        gloss: {
          ko: '오른쪽으로 가세요.',
          uz: 'O‘ng tomonga boring.',
          en: 'Go to the right.',
          ru: 'Идите направо.',
        },
      },
      {
        ko: '왼쪽으로 돌아가세요.',
        highlight: '왼쪽으로',
        gloss: {
          ko: '왼쪽으로 돌아가세요.',
          uz: 'Chap tomonga buriling.',
          en: 'Turn to the left.',
          ru: 'Поверните налево.',
        },
      },
      {
        ko: '저는 지하철로 회사에 가요.',
        highlight: '지하철로',
        gloss: {
          ko: '저는 지하철로 회사에 가요.',
          uz: 'Men ishga metroda boraman.',
          en: 'I go to work by subway.',
          ru: 'Я езжу на работу на метро.',
        },
      },
      {
        ko: '연필로 이름을 쓰세요.',
        highlight: '연필로',
        gloss: {
          ko: '연필로 이름을 쓰세요.',
          uz: 'Ismingizni qalam bilan yozing.',
          en: 'Write your name with a pencil.',
          ru: 'Напишите имя карандашом.',
        },
      },
      {
        ko: '한국어로 말해 주세요.',
        highlight: '한국어로',
        gloss: {
          ko: '한국어로 말해 주세요.',
          uz: 'Iltimos, koreys tilida gapiring.',
          en: 'Please speak in Korean.',
          ru: 'Пожалуйста, говорите по-корейски.',
        },
      },
      {
        ko: '이 길로 쭉 가세요.',
        highlight: '이 길로',
        gloss: {
          ko: '이 길로 쭉 가세요.',
          uz: 'Shu yo‘l bo‘ylab to‘g‘ri boring.',
          en: 'Go straight along this road.',
          ru: 'Идите прямо по этой дороге.',
        },
      },
      {
        ko: '택시로 가면 더 빨라요.',
        highlight: '택시로',
        gloss: {
          ko: '택시로 가면 더 빨라요.',
          uz: 'Taksida borsangiz tezroq bo‘ladi.',
          en: 'It is faster if you go by taxi.',
          ru: 'На такси будет быстрее.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '서울역까지 어떻게 가요?',
        highlight: '어떻게 가요',
        gloss: {
          ko: '서울역까지 어떻게 가요?',
          uz: 'Seul vokzaligacha qanday boriladi?',
          en: 'How do I get to Seoul Station?',
          ru: 'Как добраться до вокзала Сеул?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '지하철로 가세요.',
        highlight: '지하철로',
        gloss: {
          ko: '지하철로 가세요.',
          uz: 'Metroda boring.',
          en: 'Take the subway.',
          ru: 'Поезжайте на метро.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '역에서 어느 쪽으로 가야 돼요?',
        highlight: '어느 쪽으로',
        gloss: {
          ko: '역에서 어느 쪽으로 가야 돼요?',
          uz: 'Bekatdan qaysi tomonga borishim kerak?',
          en: 'Which direction should I go from the station?',
          ru: 'В какую сторону идти от станции?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '2번 출구로 나가서 오른쪽으로 가세요.',
        highlight: '오른쪽으로',
        gloss: {
          ko: '2번 출구로 나가서 오른쪽으로 가세요.',
          uz: '2-chi chiqishdan chiqib, o‘ng tomonga boring.',
          en: 'Go out through Exit 2 and turn right.',
          ru: 'Выйдите через выход №2 и идите направо.',
        },
      },
    ],

    similar: {
      pattern: 'N에',
      note: {
        ko: '"에"는 목적지 자체를 나타내는 데 자주 쓰고, "(으)로"는 그 목적지를 향하는 방향이라는 느낌을 더 줄 수 있어요. "서울역에 가요"와 "서울역으로 가요"는 모두 가능하지만, "(으)로"는 방향·경로의 느낌이 더 강해요. 또한 교통수단이나 도구를 나타낼 때는 "(으)로"를 사용해요.',
        uz: '에 ko‘proq manzilning o‘zini ko‘rsatadi, (으)로 esa yo‘nalish ma’nosini kuchliroq beradi. Transport va vosita uchun esa (으)로 ishlatiladi.',
        en: '에 commonly marks the destination itself, while (으)로 can emphasize movement in a direction. (으)로 is also used for transportation and instruments.',
        ru: '에 обычно обозначает сам пункт назначения, а (으)로 сильнее подчёркивает направление. Для транспорта и инструментов используется (으)로.',
      },
    },

    cautions: [
      {
        ko: 'ㄹ 받침 뒤에는 "-으로"가 아니라 "-로"를 붙여요. "지하철으로"가 아니라 "지하철로"예요.',
        uz: 'ㄹ dan keyin -으로 emas, -로 ishlatiladi: 지하철로.',
        en: 'After ㄹ, use -로, not -으로: 지하철로.',
        ru: 'После ㄹ используется -로, а не -으로: 지하철로.',
      },
      {
        ko: '"집"처럼 ㄹ이 아닌 받침으로 끝나면 "집으로"라고 해요.',
        uz: 'ㄹ dan boshqa undosh bilan tugasa -으로 ishlatiladi: 집으로.',
        en: 'After a consonant other than ㄹ, use -으로: 집으로.',
        ru: 'После согласной, кроме ㄹ, используется -으로: 집으로.',
      },
      {
        ko: '교통수단을 말할 때 "버스를 가요"라고 하지 않고 "버스로 가요"라고 해요.',
        uz: 'Transport vositasini usul sifatida aytganda 버스로 가요 deyiladi.',
        en: 'When expressing transportation, say 버스로 가요, not 버스를 가요.',
        ru: 'Для транспорта говорят 버스로 가요, а не 버스를 가요.',
      },
      {
        ko: '방향의 "(으)로"와 목적지의 "에"는 문맥에 따라 모두 가능할 때가 있지만 뉘앙스가 완전히 같지는 않아요.',
        uz: '(으)로 va 에 ba’zan ikkalasi ham mumkin, lekin ma’no urg‘usi bir xil emas.',
        en: 'Both (으)로 and 에 may sometimes be possible for destinations, but their nuance is not identical.',
        ru: 'Иногда возможны и (으)로, и 에, но оттенок значения отличается.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"버스"에 알맞은 조사를 붙인 것을 고르세요.',
          uz: '"버스" bilan to‘g‘ri shaklni tanlang.',
          en: 'Choose the correct form with 버스.',
          ru: 'Выберите правильную форму с 버스.',
        },
        options: [
          { text: '버스로', correct: true },
          { text: '버스으로', correct: false },
          { text: '버스에로', correct: false },
        ],
      },
      {
        question: {
          ko: '"집"의 알맞은 형태는?',
          uz: '"집"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 집.',
          ru: 'Выберите правильную форму 집.',
        },
        options: [
          { text: '집으로', correct: true },
          { text: '집로', correct: false },
          { text: '집으로서', correct: false },
        ],
      },
      {
        question: {
          ko: '"지하철"의 알맞은 형태는?',
          uz: '"지하철"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 지하철.',
          ru: 'Выберите правильную форму 지하철.',
        },
        options: [
          { text: '지하철로', correct: true },
          { text: '지하철으로', correct: false },
          { text: '지하철에로', correct: false },
        ],
      },
      {
        question: {
          ko: '교통수단을 자연스럽게 표현한 문장은?',
          uz: 'Transport vositasini to‘g‘ri ifodalagan gapni tanlang.',
          en: 'Choose the sentence that correctly expresses transportation.',
          ru: 'Выберите предложение, правильно выражающее транспорт.',
        },
        options: [
          { text: '학교에 버스로 가요.', correct: true },
          { text: '학교에 버스를 가요.', correct: false },
          { text: '학교로 버스가를 가요.', correct: false },
        ],
      },
      {
        question: {
          ko: '방향을 나타내는 가장 자연스러운 표현은?',
          uz: 'Yo‘nalishni eng tabiiy bildirgan ifodani tanlang.',
          en: 'Choose the most natural expression of direction.',
          ru: 'Выберите наиболее естественное выражение направления.',
        },
        options: [
          { text: '오른쪽으로 가세요.', correct: true },
          { text: '오른쪽을 가세요.', correct: false },
          { text: '오른쪽에서 주세요.', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-17. ㄹ 받침의 변화 'ㄹ' 탈락 ─────────
  {
    code: 'rieul-deletion',
    pattern: "'ㄹ' 탈락",
    section: 2,
    unit: 5,
    order: 17,
    isActive: true,

    summary: {
      ko: '어간이 ㄹ 받침으로 끝나는 동사·형용사는 뒤에 오는 어미에 따라 ㄹ이 사라지는 경우가 있어요. 특히 ㄴ, ㅂ, ㅅ으로 시작하는 어미 앞에서 자주 탈락해요.',
      uz: 'Negizi ㄹ bilan tugagan fe’l va sifatlarda keyingi qo‘shimchaga qarab ㄹ tushib qolishi mumkin. Ayniqsa ㄴ, ㅂ, ㅅ bilan boshlanadigan qo‘shimchalar oldidan ko‘p tushadi.',
      en: 'When a verb or adjective stem ends in ㄹ, the ㄹ disappears before certain endings, especially those beginning with ㄴ, ㅂ, or ㅅ.',
      ru: 'Если основа глагола или прилагательного заканчивается на ㄹ, перед некоторыми окончаниями ㄹ выпадает, особенно перед ㄴ, ㅂ и ㅅ.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '활용', uz: 'Tuslanish', en: 'Conjugation', ru: 'Спряжение' },
      {
        ko: 'ㄹ 탈락',
        uz: 'ㄹ tushishi',
        en: 'ㄹ deletion',
        ru: 'Выпадение ㄹ',
      },
    ],

    explanation: {
      ko: '동사나 형용사의 기본형에서 "-다"를 뺀 어간이 ㄹ 받침으로 끝나면, 어떤 어미가 뒤에 오느냐에 따라 ㄹ이 유지되기도 하고 없어지기도 해요. 대표적으로 ㄴ, ㅂ, ㅅ으로 시작하는 어미 앞에서는 ㄹ이 탈락해요. 예를 들어 "길다"에 명사를 꾸미는 "-ㄴ"이 붙으면 "길ㄴ 머리"가 아니라 "긴 머리"가 되고, "살다"에 "-ㅂ니다"가 붙으면 "살ㅂ니다"가 아니라 "삽니다"가 돼요. "알다 + -세요"도 "알세요"가 아니라 "아세요"예요. 하지만 "-아요/어요", "-고", "-지"처럼 ㄹ 탈락을 일으키지 않는 어미 앞에서는 "길어요", "살아요", "알고", "열지 마세요"처럼 ㄹ이 그대로 남아요. 그래서 ㄹ 받침을 무조건 지우는 것이 아니라 뒤에 오는 어미를 함께 확인해야 해요.',
      uz: 'Fe’l yoki sifatning -다 qismini olib tashlaganda negiz ㄹ bilan tugasa, keyingi qo‘shimchaga qarab ㄹ saqlanishi yoki tushishi mumkin. Ayniqsa ㄴ, ㅂ va ㅅ bilan boshlanuvchi qo‘shimchalar oldidan ㄹ tushadi. Masalan, 길다 + -ㄴ → 긴, 살다 + -ㅂ니다 → 삽니다, 알다 + -세요 → 아세요. Ammo -아요/어요, -고, -지 kabi qo‘shimchalar oldidan ㄹ saqlanadi: 길어요, 살아요, 알고, 열지 마세요. Shuning uchun ㄹ ni avtomatik ravishda olib tashlamaslik kerak.',
      en: 'After removing -다, a stem ending in ㄹ may keep or lose ㄹ depending on the following ending. ㄹ commonly disappears before endings beginning with ㄴ, ㅂ, or ㅅ. For example, 길다 + -ㄴ becomes 긴, 살다 + -ㅂ니다 becomes 삽니다, and 알다 + -세요 becomes 아세요. However, ㄹ remains before endings such as -아요/어요, -고, and -지: 길어요, 살아요, 알고, 열지 마세요. Do not delete ㄹ automatically; always check the following ending.',
      ru: 'После удаления -다 основа на ㄹ может сохранять или терять ㄹ в зависимости от следующего окончания. Перед ㄴ, ㅂ и ㅅ ㄹ обычно выпадает: 길다 + -ㄴ → 긴, 살다 + -ㅂ니다 → 삽니다, 알다 + -세요 → 아세요. Но перед -아요/어요, -고 и -지 ㄹ сохраняется: 길어요, 살아요, 알고, 열지 마세요.',
    },

    conjugationRule: {
      ko: 'ㄹ 받침 어간 + ㄴ/ㅂ/ㅅ 계열 어미 → ㄹ 탈락 · 그 외 어미에서는 ㄹ 유지 여부 확인',
      uz: 'ㄹ bilan tugagan negiz + ㄴ/ㅂ/ㅅ turidagi qo‘shimcha → ㄹ tushadi · boshqa qo‘shimchalarda alohida tekshiriladi',
      en: 'ㄹ-final stem + ㄴ/ㅂ/ㅅ-type ending → delete ㄹ · check whether ㄹ remains before other endings',
      ru: 'Основа на ㄹ + окончания типа ㄴ/ㅂ/ㅅ → ㄹ выпадает · перед другими окончаниями нужно проверять отдельно',
    },

    conjugations: [
      { base: '길다 + -ㄴ', result: '긴' },
      { base: '멀다 + -ㄴ', result: '먼' },
      { base: '살다 + -ㅂ니다', result: '삽니다' },
      { base: '알다 + -ㅂ니다', result: '압니다' },
      { base: '팔다 + -ㅂ니다', result: '팝니다' },
      { base: '살다 + -세요', result: '사세요' },
      { base: '알다 + -세요', result: '아세요' },
      { base: '열다 + -세요', result: '여세요' },
      { base: '만들다 + -세요', result: '만드세요' },
      { base: '팔다 + -세요', result: '파세요' },
    ],

    examples: [
      {
        ko: '저는 긴 치마를 좋아해요.',
        highlight: '긴 치마',
        gloss: {
          ko: '저는 긴 치마를 좋아해요.',
          uz: 'Men uzun yubkalarni yoqtiraman.',
          en: 'I like long skirts.',
          ru: 'Мне нравятся длинные юбки.',
        },
      },
      {
        ko: '머리가 긴 사람이 제 언니예요.',
        highlight: '긴 사람',
        gloss: {
          ko: '머리가 긴 사람이 제 언니예요.',
          uz: 'Sochi uzun odam mening opam.',
          en: 'The person with long hair is my older sister.',
          ru: 'Девушка с длинными волосами — моя старшая сестра.',
        },
      },
      {
        ko: '학교가 집에서 먼 편이에요.',
        highlight: '먼 편',
        gloss: {
          ko: '학교가 집에서 먼 편이에요.',
          uz: 'Maktab uyimdan ancha uzoq.',
          en: 'The school is rather far from my house.',
          ru: 'Школа довольно далеко от моего дома.',
        },
      },
      {
        ko: '저는 서울에 삽니다.',
        highlight: '삽니다',
        gloss: {
          ko: '저는 서울에 삽니다.',
          uz: 'Men Seulda yashayman.',
          en: 'I live in Seoul.',
          ru: 'Я живу в Сеуле.',
        },
      },
      {
        ko: '저는 그 가게를 잘 압니다.',
        highlight: '압니다',
        gloss: {
          ko: '저는 그 가게를 잘 압니다.',
          uz: 'Men u do‘konni yaxshi bilaman.',
          en: 'I know that store well.',
          ru: 'Я хорошо знаю этот магазин.',
        },
      },
      {
        ko: '여기에서 옷을 팝니다.',
        highlight: '팝니다',
        gloss: {
          ko: '여기에서 옷을 팝니다.',
          uz: 'Bu yerda kiyim sotiladi.',
          en: 'They sell clothes here.',
          ru: 'Здесь продают одежду.',
        },
      },
      {
        ko: '이 옷을 아세요?',
        highlight: '아세요',
        gloss: {
          ko: '이 옷을 아세요?',
          uz: 'Bu kiyimni bilasizmi?',
          en: 'Do you know this clothing item?',
          ru: 'Вы знаете эту вещь?',
        },
      },
      {
        ko: '문을 여세요.',
        highlight: '여세요',
        gloss: {
          ko: '문을 여세요.',
          uz: 'Eshikni oching.',
          en: 'Please open the door.',
          ru: 'Откройте дверь.',
        },
      },
      {
        ko: '이 가방을 직접 만드세요?',
        highlight: '만드세요',
        gloss: {
          ko: '이 가방을 직접 만드세요?',
          uz: 'Bu sumkani o‘zingiz yasaysizmi?',
          en: 'Do you make this bag yourself?',
          ru: 'Вы сами делаете эту сумку?',
        },
      },
      {
        ko: '이 옷은 어디에서 파세요?',
        highlight: '파세요',
        gloss: {
          ko: '이 옷은 어디에서 파세요?',
          uz: 'Bu kiyimni qayerda sotasiz?',
          en: 'Where do you sell these clothes?',
          ru: 'Где вы продаёте эту одежду?',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '머리가 긴 사람이 누구예요?',
        highlight: '긴 사람',
        gloss: {
          ko: '머리가 긴 사람이 누구예요?',
          uz: 'Sochi uzun odam kim?',
          en: 'Who is the person with long hair?',
          ru: 'Кто человек с длинными волосами?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '제 친구 수진이에요.',
        highlight: '제 친구',
        gloss: {
          ko: '제 친구 수진이에요.',
          uz: 'Bu mening do‘stim Sujin.',
          en: 'That is my friend Sujin.',
          ru: 'Это моя подруга Суджин.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '수진 씨는 어디에 사세요?',
        highlight: '사세요',
        gloss: {
          ko: '수진 씨는 어디에 사세요?',
          uz: 'Sujin qayerda yashaydi?',
          en: 'Where does Sujin live?',
          ru: 'Где живёт Суджин?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '학교 근처에 살아요.',
        highlight: '살아요',
        gloss: {
          ko: '학교 근처에 살아요.',
          uz: 'U maktab yaqinida yashaydi.',
          en: 'She lives near the school.',
          ru: 'Она живёт рядом со школой.',
        },
      },
    ],

    similar: {
      pattern: 'ㄹ 유지',
      note: {
        ko: 'ㄹ 받침은 모든 어미 앞에서 탈락하지 않아요. "길어요", "살아요", "알고 있어요", "열지 마세요"처럼 ㄹ이 유지되는 경우도 많아요. 따라서 기본형이 ㄹ 받침이라는 사실만 보고 ㄹ을 지우면 안 돼요.',
        uz: 'ㄹ barcha qo‘shimchalar oldidan tushmaydi. 길어요, 살아요, 알고 있어요, 열지 마세요 kabi shakllarda ㄹ saqlanadi.',
        en: 'ㄹ does not disappear before every ending. It remains in forms such as 길어요, 살아요, 알고 있어요, and 열지 마세요.',
        ru: 'ㄹ выпадает не перед всеми окончаниями. Он сохраняется в 길어요, 살아요, 알고 있어요 и 열지 마세요.',
      },
    },

    cautions: [
      {
        ko: '"길다 + -ㄴ"은 "길은"이 아니라 "긴"이에요.',
        uz: '길다 + -ㄴ shakli "길은" emas, "긴".',
        en: '길다 + -ㄴ becomes 긴, not 길은.',
        ru: '길다 + -ㄴ превращается в 긴, а не 길은.',
      },
      {
        ko: '"살다 + -세요"는 "살세요"가 아니라 "사세요"예요.',
        uz: '살다 + -세요 → 사세요, "살세요" emas.',
        en: '살다 + -세요 becomes 사세요, not 살세요.',
        ru: '살다 + -세요 → 사세요, а не 살세요.',
      },
      {
        ko: '"열다 + -지 마세요"에서는 ㄹ이 탈락하지 않아요. "열지 마세요"가 맞아요.',
        uz: '열다 + -지 마세요 da ㄹ tushmaydi: 열지 마세요.',
        en: 'ㄹ remains before -지 마세요: 열지 마세요.',
        ru: 'Перед -지 마세요 ㄹ сохраняется: 열지 마세요.',
      },
      {
        ko: 'ㄹ 탈락은 단어 자체가 바뀌는 것이 아니라 활용할 때 생기는 변화예요.',
        uz: 'ㄹ tushishi so‘zning o‘zi o‘zgarishi emas, tuslanish paytidagi hodisa.',
        en: 'ㄹ deletion is a conjugation change, not a permanent change to the dictionary form.',
        ru: 'Выпадение ㄹ происходит при спряжении и не меняет словарную форму.',
      },
      {
        ko: '어미를 붙이기 전에 기본형에서 "-다"를 빼고 어간을 먼저 확인하면 실수를 줄일 수 있어요.',
        uz: 'Qo‘shimcha qo‘shishdan oldin -다 ni olib tashlab negizni tekshirish xatolarni kamaytiradi.',
        en: 'Removing -다 and identifying the stem first helps prevent mistakes.',
        ru: 'Сначала уберите -다 и определите основу — это уменьшит количество ошибок.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"길다 + -ㄴ"의 알맞은 형태는?',
          uz: '"길다 + -ㄴ"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 길다 + -ㄴ.',
          ru: 'Выберите правильную форму 길다 + -ㄴ.',
        },
        options: [
          { text: '긴', correct: true },
          { text: '길은', correct: false },
          { text: '길ㄴ', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다 + -세요"의 알맞은 형태는?',
          uz: '"살다 + -세요"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 살다 + -세요.',
          ru: 'Выберите правильную форму 살다 + -세요.',
        },
        options: [
          { text: '사세요', correct: true },
          { text: '살세요', correct: false },
          { text: '살으세요', correct: false },
        ],
      },
      {
        question: {
          ko: '"알다 + -ㅂ니다"의 알맞은 형태는?',
          uz: '"알다 + -ㅂ니다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 알다 + -ㅂ니다.',
          ru: 'Выберите правильную форму 알다 + -ㅂ니다.',
        },
        options: [
          { text: '압니다', correct: true },
          { text: '알습니다', correct: false },
          { text: '알ㅂ니다', correct: false },
        ],
      },
      {
        question: {
          ko: 'ㄹ이 그대로 유지되는 표현을 고르세요.',
          uz: 'ㄹ saqlanib qolgan shaklni tanlang.',
          en: 'Choose the form where ㄹ remains.',
          ru: 'Выберите форму, где ㄹ сохраняется.',
        },
        options: [
          { text: '열지 마세요', correct: true },
          { text: '여세요', correct: false },
          { text: '삽니다', correct: false },
        ],
      },
      {
        question: {
          ko: '"멀다"가 명사를 꾸밀 때 알맞은 형태는?',
          uz: '"멀다" otni aniqlaganda qaysi shakl ishlatiladi?',
          en: 'Choose the correct attributive form of 멀다.',
          ru: 'Выберите правильную определительную форму 멀다.',
        },
        options: [
          { text: '먼 곳', correct: true },
          { text: '멀은 곳', correct: false },
          { text: '멀ㄴ 곳', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-18. 형용사로 명사 꾸미기 A-(으)ㄴ N ─────────
  {
    code: 'adjective-attributive-eun-neun',
    pattern: 'A-(으)ㄴ N',
    section: 2,
    unit: 5,
    order: 18,
    isActive: true,

    summary: {
      ko: '형용사를 명사 앞에 놓아 사람이나 사물의 특징을 설명할 때 사용해요. "예쁜 옷", "작은 가방", "긴 머리"처럼 외모와 옷차림을 묘사할 때 특히 중요해요.',
      uz: 'Sifat yordamida keyingi otning xususiyatini tasvirlaydi. "예쁜 옷", "작은 가방", "긴 머리" kabi tashqi ko‘rinish va kiyimni tasvirlashda juda muhim.',
      en: 'Turns an adjective into a form that directly describes a following noun, such as 예쁜 옷, 작은 가방, or 긴 머리.',
      ru: 'Позволяет прилагательному непосредственно определять существительное: 예쁜 옷, 작은 가방, 긴 머리.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '형용사', uz: 'Sifat', en: 'Adjective', ru: 'Прилагательное' },
      {
        ko: '외모 묘사',
        uz: 'Tashqi ko‘rinish',
        en: 'Appearance',
        ru: 'Описание внешности',
      },
    ],

    explanation: {
      ko: '한국어 형용사는 문장 끝에서 "옷이 예뻐요"처럼 사용할 수도 있지만, 명사 바로 앞에서 그 명사의 특징을 설명할 수도 있어요. 이때 형용사 어간에 "-(으)ㄴ"을 붙여요. 받침이 없으면 "-ㄴ"을 붙여 "예쁘다 → 예쁜 옷", "크다 → 큰 가방"이 되고, ㄹ을 제외한 받침이 있으면 "-은"을 붙여 "작다 → 작은 신발", "좋다 → 좋은 옷"처럼 만들어요. ㄹ 받침은 ㄹ이 탈락하고 "-ㄴ"이 붙어서 "길다 → 긴 머리", "멀다 → 먼 곳"이 돼요. 또한 일부 형용사는 불규칙하게 변화해서 "춥다 → 추운 날씨", "덥다 → 더운 날씨", "빨갛다 → 빨간 옷"처럼 돼요.',
      uz: 'Koreys tilidagi sifat gap oxirida 옷이 예뻐요 kabi kelishi yoki to‘g‘ridan-to‘g‘ri ot oldidan uni tasvirlashi mumkin. Bunda sifat negiziga -(으)ㄴ qo‘shiladi. 받침 bo‘lmasa -ㄴ: 예쁘다 → 예쁜 옷, 크다 → 큰 가방. ㄹ dan boshqa 받침 bo‘lsa -은: 작다 → 작은 신발. ㄹ bilan tugasa ㄹ tushib -ㄴ keladi: 길다 → 긴 머리. Ayrim sifatlarda notekis o‘zgarishlar ham bor: 춥다 → 추운, 빨갛다 → 빨간.',
      en: 'Korean adjectives can end a sentence, as in 옷이 예뻐요, or directly modify a noun. To modify a noun, attach -(으)ㄴ to the adjective stem. After a vowel, use -ㄴ: 예쁘다 → 예쁜 옷, 크다 → 큰 가방. After a consonant other than ㄹ, use -은: 작다 → 작은 신발, 좋다 → 좋은 옷. With ㄹ-final stems, ㄹ disappears: 길다 → 긴 머리. Some adjectives also have irregular forms, such as 춥다 → 추운 and 빨갛다 → 빨간.',
      ru: 'Корейское прилагательное может стоять в конце предложения, как 옷이 예뻐요, или непосредственно перед существительным. Перед существительным используется -(으)ㄴ. После гласной — -ㄴ: 예쁘다 → 예쁜 옷. После согласной, кроме ㄹ, — -은: 작다 → 작은 신발. После ㄹ он выпадает: 길다 → 긴 머리. Есть и неправильные формы: 춥다 → 추운, 빨갛다 → 빨간.',
    },

    conjugationRule: {
      ko: '받침 X → A-ㄴ N · 받침 O → A-은 N · ㄹ 받침 → ㄹ 탈락 + ㄴ · 일부 ㅂ/ㅎ 불규칙 주의',
      uz: '받침 yo‘q → -ㄴ · 받침 bor → -은 · ㄹ → ㄹ tushib -ㄴ · ayrim ㅂ/ㅎ notekis shakllarga e’tibor',
      en: 'No final consonant → -ㄴ · final consonant → -은 · ㄹ final → delete ㄹ + ㄴ · watch for some ㅂ/ㅎ irregulars',
      ru: 'Без 받침 → -ㄴ · с 받침 → -은 · ㄹ → убрать ㄹ + ㄴ · учитывать некоторые неправильные ㅂ/ㅎ',
    },

    conjugations: [
      { base: '예쁘다', result: '예쁜 옷' },
      { base: '크다', result: '큰 가방' },
      { base: '작다', result: '작은 신발' },
      { base: '좋다', result: '좋은 옷' },
      { base: '길다', result: '긴 머리' },
      { base: '멀다', result: '먼 곳' },
      { base: '짧다', result: '짧은 치마' },
      { base: '춥다', result: '추운 날씨' },
      { base: '덥다', result: '더운 날씨' },
      { base: '빨갛다', result: '빨간 셔츠' },
    ],

    examples: [
      {
        ko: '저는 예쁜 옷을 좋아해요.',
        highlight: '예쁜 옷',
        gloss: {
          ko: '저는 예쁜 옷을 좋아해요.',
          uz: 'Men chiroyli kiyimlarni yoqtiraman.',
          en: 'I like pretty clothes.',
          ru: 'Мне нравится красивая одежда.',
        },
      },
      {
        ko: '민수 씨는 큰 눈이 있어요.',
        highlight: '큰 눈',
        gloss: {
          ko: '민수 씨는 큰 눈이 있어요.',
          uz: 'Minsuning ko‘zlari katta.',
          en: 'Minsu has big eyes.',
          ru: 'У Минсу большие глаза.',
        },
      },
      {
        ko: '머리가 긴 사람이 제 친구예요.',
        highlight: '긴 사람',
        gloss: {
          ko: '머리가 긴 사람이 제 친구예요.',
          uz: 'Sochi uzun odam mening do‘stim.',
          en: 'The person with long hair is my friend.',
          ru: 'Человек с длинными волосами — мой друг.',
        },
      },
      {
        ko: '저는 짧은 치마보다 긴 치마를 좋아해요.',
        highlight: '짧은 치마',
        gloss: {
          ko: '저는 짧은 치마보다 긴 치마를 좋아해요.',
          uz: 'Men kalta yubkadan ko‘ra uzun yubkani yoqtiraman.',
          en: 'I prefer long skirts to short skirts.',
          ru: 'Мне больше нравятся длинные юбки, чем короткие.',
        },
      },
      {
        ko: '작은 가방도 보여 주세요.',
        highlight: '작은 가방',
        gloss: {
          ko: '작은 가방도 보여 주세요.',
          uz: 'Kichik sumkani ham ko‘rsating.',
          en: 'Please show me a small bag too.',
          ru: 'Покажите, пожалуйста, ещё маленькую сумку.',
        },
      },
      {
        ko: '오늘은 빨간 셔츠를 입었어요.',
        highlight: '빨간 셔츠',
        gloss: {
          ko: '오늘은 빨간 셔츠를 입었어요.',
          uz: 'Bugun qizil ko‘ylak kiydim.',
          en: 'I wore a red shirt today.',
          ru: 'Сегодня я надел красную рубашку.',
        },
      },
      {
        ko: '추운 날에는 따뜻한 옷을 입으세요.',
        highlight: '추운 날',
        gloss: {
          ko: '추운 날에는 따뜻한 옷을 입으세요.',
          uz: 'Sovuq kunda issiq kiyim kiying.',
          en: 'Wear warm clothes on cold days.',
          ru: 'В холодные дни надевайте тёплую одежду.',
        },
      },
      {
        ko: '편한 신발을 신고 싶어요.',
        highlight: '편한 신발',
        gloss: {
          ko: '편한 신발을 신고 싶어요.',
          uz: 'Qulay oyoq kiyim kiyishni xohlayman.',
          en: 'I want to wear comfortable shoes.',
          ru: 'Я хочу надеть удобную обувь.',
        },
      },
      {
        ko: '저기 키가 큰 사람이 우리 형이에요.',
        highlight: '키가 큰 사람',
        gloss: {
          ko: '저기 키가 큰 사람이 우리 형이에요.',
          uz: 'Ana u bo‘yi baland odam mening akam.',
          en: 'That tall person over there is my older brother.',
          ru: 'Тот высокий человек — мой старший брат.',
        },
      },
      {
        ko: '생일 선물로 좋은 가방을 샀어요.',
        highlight: '좋은 가방',
        gloss: {
          ko: '생일 선물로 좋은 가방을 샀어요.',
          uz: 'Tug‘ilgan kun sovg‘asi uchun yaxshi sumka sotib oldim.',
          en: 'I bought a nice bag as a birthday present.',
          ru: 'Я купил хорошую сумку в подарок на день рождения.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '어떤 옷을 찾으세요?',
        highlight: '어떤 옷',
        gloss: {
          ko: '어떤 옷을 찾으세요?',
          uz: 'Qanday kiyim qidiryapsiz?',
          en: 'What kind of clothes are you looking for?',
          ru: 'Какую одежду вы ищете?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '편하고 예쁜 옷을 찾고 있어요.',
        highlight: '예쁜 옷',
        gloss: {
          ko: '편하고 예쁜 옷을 찾고 있어요.',
          uz: 'Qulay va chiroyli kiyim qidiryapman.',
          en: 'I am looking for comfortable and pretty clothes.',
          ru: 'Я ищу удобную и красивую одежду.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '이 긴 치마는 어때요?',
        highlight: '긴 치마',
        gloss: {
          ko: '이 긴 치마는 어때요?',
          uz: 'Bu uzun yubka qanday?',
          en: 'How about this long skirt?',
          ru: 'Как вам эта длинная юбка?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '좋아요. 그런데 더 작은 사이즈도 있어요?',
        highlight: '작은 사이즈',
        gloss: {
          ko: '좋아요. 그런데 더 작은 사이즈도 있어요?',
          uz: 'Yaxshi. Lekin kichikroq o‘lchami ham bormi?',
          en: 'I like it. Do you have a smaller size?',
          ru: 'Хорошо. А размер поменьше есть?',
        },
      },
    ],

    similar: {
      pattern: 'A-아요/어요',
      note: {
        ko: '"옷이 예뻐요"처럼 형용사가 문장을 끝낼 때는 "-아요/어요"를 사용하고, "예쁜 옷"처럼 명사를 바로 꾸밀 때는 "-(으)ㄴ"을 사용해요.',
        uz: 'Sifat gap oxirida bo‘lsa -아요/어요: 옷이 예뻐요. Otni bevosita aniqlasa -(으)ㄴ: 예쁜 옷.',
        en: 'Use -아요/어요 when the adjective ends the sentence, as in 옷이 예뻐요, and -(으)ㄴ when it directly modifies a noun, as in 예쁜 옷.',
        ru: 'В конце предложения используется -아요/어요: 옷이 예뻐요. Перед существительным — -(으)ㄴ: 예쁜 옷.',
      },
    },

    cautions: [
      {
        ko: '"예쁘다"는 "예쁘은 옷"이 아니라 "예쁜 옷"이에요.',
        uz: '예쁘다 → "예쁘은 옷" emas, "예쁜 옷".',
        en: '예쁘다 becomes 예쁜 옷, not 예쁘은 옷.',
        ru: '예쁘다 → 예쁜 옷, а не 예쁘은 옷.',
      },
      {
        ko: 'ㄹ 받침은 ㄹ이 탈락해요. "길은 머리"가 아니라 "긴 머리"예요.',
        uz: 'ㄹ tushadi: "길은 머리" emas, "긴 머리".',
        en: 'With ㄹ-final adjectives, ㄹ disappears: 긴 머리, not 길은 머리.',
        ru: 'После ㄹ он выпадает: 긴 머리, а не 길은 머리.',
      },
      {
        ko: 'ㅂ 불규칙 형용사는 "춥은 날"이 아니라 "추운 날", "덥은 날"이 아니라 "더운 날"이에요.',
        uz: 'ㅂ notekis sifatlarda 춥은 emas 추운, 덥은 emas 더운.',
        en: 'For ㅂ-irregular adjectives, use 추운 and 더운, not 춥은 or 덥은.',
        ru: 'У неправильных ㅂ-форм: 추운, 더운, а не 춥은, 덥은.',
      },
      {
        ko: '형용사가 아니라 동사로 현재의 행동을 명사 앞에서 꾸밀 때는 다른 문법 "-는 N"을 사용해요.',
        uz: 'Hozirgi harakatni bildiruvchi fe’l otni aniqlaganda boshqa shakl -는 N ishlatiladi.',
        en: 'Present-tense action verbs modify nouns with a different form, -는 N.',
        ru: 'Для глаголов действия в настоящем времени используется другая форма — -는 N.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"예쁘다"가 명사를 꾸밀 때 알맞은 형태는?',
          uz: '"예쁘다" otni aniqlaganda qaysi shakl ishlatiladi?',
          en: 'Choose the correct attributive form of 예쁘다.',
          ru: 'Выберите правильную определительную форму 예쁘다.',
        },
        options: [
          { text: '예쁜 옷', correct: true },
          { text: '예쁘은 옷', correct: false },
          { text: '예쁘는 옷', correct: false },
        ],
      },
      {
        question: {
          ko: '"작다"의 알맞은 형태는?',
          uz: '"작다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 작다.',
          ru: 'Выберите правильную форму 작다.',
        },
        options: [
          { text: '작은 가방', correct: true },
          { text: '작ㄴ 가방', correct: false },
          { text: '작는 가방', correct: false },
        ],
      },
      {
        question: {
          ko: '"길다"의 알맞은 형태는?',
          uz: '"길다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 길다.',
          ru: 'Выберите правильную форму 길다.',
        },
        options: [
          { text: '긴 머리', correct: true },
          { text: '길은 머리', correct: false },
          { text: '길는 머리', correct: false },
        ],
      },
      {
        question: {
          ko: '"춥다"가 명사를 꾸밀 때 알맞은 표현은?',
          uz: '"춥다" otni aniqlaganda to‘g‘ri shakl qaysi?',
          en: 'Choose the correct attributive form of 춥다.',
          ru: 'Выберите правильную определительную форму 춥다.',
        },
        options: [
          { text: '추운 날', correct: true },
          { text: '춥은 날', correct: false },
          { text: '춥는 날', correct: false },
        ],
      },
      {
        question: {
          ko: '외모를 자연스럽게 묘사한 표현을 고르세요.',
          uz: 'Tashqi ko‘rinishni tabiiy ifodalagan variantni tanlang.',
          en: 'Choose the natural description of appearance.',
          ru: 'Выберите естественное описание внешности.',
        },
        options: [
          { text: '키가 큰 사람', correct: true },
          { text: '키가 크는 사람', correct: false },
          { text: '키가 크은 사람', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-19. 사람에게 향하는 행동 N한테[께] ─────────
  {
    code: 'recipient-hante-kke',
    pattern: 'N한테[께]',
    section: 2,
    unit: 5,
    order: 19,
    isActive: true,

    summary: {
      ko: '어떤 행동이나 물건이 향하는 사람을 나타내요. 일상 대화에서는 "한테"를 많이 쓰고, 높여야 하는 사람에게는 "께"를 사용해요.',
      uz: 'Harakat yoki narsa kimga yo‘naltirilganini bildiradi. Kundalik nutqda 한테, hurmat qilinadigan odamga esa 께 ishlatiladi.',
      en: 'Marks the person toward whom an action or object is directed. 한테 is common in conversation, while 께 is the honorific form.',
      ru: 'Обозначает человека, которому направлено действие или предмет. 한테 обычно употребляется в разговоре, а 께 — уважительная форма.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '조사', uz: 'Ko‘makchi', en: 'Particle', ru: 'Частица' },
      { ko: '대상', uz: 'Qabul qiluvchi', en: 'Recipient', ru: 'Адресат' },
    ],

    explanation: {
      ko: '"N한테"는 주다, 보내다, 말하다, 전화하다, 물어보다처럼 어떤 행동이 사람을 향할 때 그 사람 뒤에 붙여요. "친구한테 선물을 줬어요"는 선물을 받은 사람이 친구라는 뜻이고, "친구한테 전화했어요"는 전화의 상대가 친구라는 뜻이에요. "께"는 같은 역할을 하지만 선생님, 부모님, 할머니, 할아버지처럼 높여야 하는 사람에게 사용하는 높임 표현이에요. 그래서 "선생님한테 질문했어요"도 회화에서는 가능하지만, 높임을 분명히 하고 싶다면 "선생님께 질문했어요"가 더 적절해요. 비슷한 조사 "-에게"도 있으며, "-한테"보다 조금 더 중립적이고 글에서도 자주 사용돼요.',
      uz: '"N한테" 주다, 보내다, 말하다, 전화하다, 물어보다 kabi harakat kimga yo‘naltirilganini ko‘rsatadi. 친구한테 선물을 줬어요 — sovg‘ani do‘st oldi. 친구한테 전화했어요 — do‘stga qo‘ng‘iroq qilindi. 께 xuddi shu vazifani bajaradi, lekin o‘qituvchi, ota-ona yoki katta yoshdagi hurmatli odamlar uchun ishlatiladi. -에게 ham o‘xshash bo‘lib, biroz neytralroq va yozma tilda ko‘p uchraydi.',
      en: 'N한테 marks the person who receives or is targeted by an action such as giving, sending, telling, calling, or asking. 친구한테 선물을 줬어요 means the friend received the gift, while 친구한테 전화했어요 means the friend was the person called. 께 has the same basic role but is honorific and is appropriate for teachers, parents, grandparents, and other respected people. -에게 is a similar, more neutral alternative often seen in writing.',
      ru: 'N한테 обозначает человека, которому адресовано действие: дать, отправить, сказать, позвонить, спросить и т. д. 친구한테 선물을 줬어요 означает, что подарок получил друг. 께 выполняет ту же функцию, но является уважительной формой для учителей, родителей, пожилых людей и других уважаемых лиц. -에게 — близкий нейтральный вариант, часто встречающийся и на письме.',
    },

    conjugationRule: {
      ko: '일반적인 사람/친한 관계 → N한테 · 높여야 하는 사람 → N께 · 중립적 표현 → N에게',
      uz: 'Oddiy/yaqin odam → N한테 · hurmatli odam → N께 · neytral shakl → N에게',
      en: 'General/familiar recipient → N한테 · honorific recipient → N께 · neutral alternative → N에게',
      ru: 'Обычный/близкий адресат → N한테 · уважительный → N께 · нейтральный вариант → N에게',
    },

    conjugations: [
      { base: '친구 + 한테', result: '친구한테' },
      { base: '동생 + 한테', result: '동생한테' },
      { base: '민수 씨 + 한테', result: '민수 씨한테' },
      { base: '선생님 + 께', result: '선생님께' },
      { base: '부모님 + 께', result: '부모님께' },
      { base: '할머니 + 께', result: '할머니께' },
      { base: '친구 + 에게', result: '친구에게' },
      { base: '학생 + 에게', result: '학생에게' },
    ],

    examples: [
      {
        ko: '친구한테 생일 선물을 줬어요.',
        highlight: '친구한테',
        gloss: {
          ko: '친구한테 생일 선물을 줬어요.',
          uz: 'Do‘stimga tug‘ilgan kun sovg‘asi berdim.',
          en: 'I gave my friend a birthday present.',
          ru: 'Я подарил другу подарок на день рождения.',
        },
      },
      {
        ko: '동생한테 옷을 사 줬어요.',
        highlight: '동생한테',
        gloss: {
          ko: '동생한테 옷을 사 줬어요.',
          uz: 'Ukamga yoki singlimga kiyim olib berdim.',
          en: 'I bought clothes for my younger sibling.',
          ru: 'Я купил одежду младшему брату или сестре.',
        },
      },
      {
        ko: '친구한테 전화했어요.',
        highlight: '친구한테',
        gloss: {
          ko: '친구한테 전화했어요.',
          uz: 'Do‘stimga qo‘ng‘iroq qildim.',
          en: 'I called my friend.',
          ru: 'Я позвонил другу.',
        },
      },
      {
        ko: '수진 씨한테 메시지를 보냈어요.',
        highlight: '수진 씨한테',
        gloss: {
          ko: '수진 씨한테 메시지를 보냈어요.',
          uz: 'Sujinga xabar yubordim.',
          en: 'I sent Sujin a message.',
          ru: 'Я отправил Суджин сообщение.',
        },
      },
      {
        ko: '선생님께 질문했어요.',
        highlight: '선생님께',
        gloss: {
          ko: '선생님께 질문했어요.',
          uz: 'O‘qituvchidan savol so‘radim.',
          en: 'I asked the teacher a question.',
          ru: 'Я задал вопрос учителю.',
        },
      },
      {
        ko: '부모님께 선물을 드렸어요.',
        highlight: '부모님께',
        gloss: {
          ko: '부모님께 선물을 드렸어요.',
          uz: 'Ota-onamga sovg‘a berdim.',
          en: 'I gave my parents a gift.',
          ru: 'Я подарил подарок родителям.',
        },
      },
      {
        ko: '할머니께 전화를 했어요.',
        highlight: '할머니께',
        gloss: {
          ko: '할머니께 전화를 했어요.',
          uz: 'Buvimga qo‘ng‘iroq qildim.',
          en: 'I called my grandmother.',
          ru: 'Я позвонил бабушке.',
        },
      },
      {
        ko: '누구한테 이 가방을 줄 거예요?',
        highlight: '누구한테',
        gloss: {
          ko: '누구한테 이 가방을 줄 거예요?',
          uz: 'Bu sumkani kimga berasiz?',
          en: 'Who are you going to give this bag to?',
          ru: 'Кому вы подарите эту сумку?',
        },
      },
      {
        ko: '친구한테 어떤 옷이 좋은지 물어봤어요.',
        highlight: '친구한테',
        gloss: {
          ko: '친구한테 어떤 옷이 좋은지 물어봤어요.',
          uz: 'Do‘stimdan qaysi kiyim yaxshi ekanini so‘radim.',
          en: 'I asked my friend which clothes were good.',
          ru: 'Я спросил друга, какая одежда лучше.',
        },
      },
      {
        ko: '선생님께 감사의 편지를 썼어요.',
        highlight: '선생님께',
        gloss: {
          ko: '선생님께 감사의 편지를 썼어요.',
          uz: 'O‘qituvchimga minnatdorchilik xati yozdim.',
          en: 'I wrote a thank-you letter to my teacher.',
          ru: 'Я написал учителю благодарственное письмо.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이 선물은 누구한테 줄 거예요?',
        highlight: '누구한테',
        gloss: {
          ko: '이 선물은 누구한테 줄 거예요?',
          uz: 'Bu sovg‘ani kimga berasiz?',
          en: 'Who are you going to give this present to?',
          ru: 'Кому вы подарите этот подарок?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '제 친구한테 줄 거예요.',
        highlight: '친구한테',
        gloss: {
          ko: '제 친구한테 줄 거예요.',
          uz: 'Do‘stimga beraman.',
          en: 'I’m going to give it to my friend.',
          ru: 'Я подарю его другу.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '선생님 선물도 샀어요?',
        highlight: '선생님 선물',
        gloss: {
          ko: '선생님 선물도 샀어요?',
          uz: 'O‘qituvchi uchun ham sovg‘a oldingizmi?',
          en: 'Did you buy a present for the teacher too?',
          ru: 'Вы тоже купили подарок учителю?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네. 내일 선생님께 드리려고 해요.',
        highlight: '선생님께',
        gloss: {
          ko: '네. 내일 선생님께 드리려고 해요.',
          uz: 'Ha. Ertaga o‘qituvchiga bermoqchiman.',
          en: 'Yes. I’m going to give it to the teacher tomorrow.',
          ru: 'Да. Завтра собираюсь подарить его учителю.',
        },
      },
    ],

    similar: {
      pattern: 'N에게',
      note: {
        ko: '"한테"와 "에게"는 기본 의미가 거의 같아요. "한테"는 일상 대화에서 매우 자주 쓰고, "에게"는 말과 글 모두에서 쓸 수 있는 조금 더 중립적인 표현이에요. 높임이 필요하면 "께"를 사용해요.',
        uz: '한테 va 에게 asosiy ma’noda deyarli bir xil. 한테 kundalik suhbatda, 에게 esa neytralroq. Hurmat kerak bo‘lsa 께 ishlatiladi.',
        en: '한테 and 에게 have nearly the same basic meaning. 한테 is very common in conversation, 에게 is more neutral, and 께 is honorific.',
        ru: '한테 и 에게 почти одинаковы по значению. 한테 разговорное, 에게 более нейтральное, а 께 — уважительное.',
      },
    },

    cautions: [
      {
        ko: '"께"는 단순히 더 격식 있는 표현이 아니라 상대를 높이는 조사예요.',
        uz: '께 shunchaki rasmiy shakl emas, qabul qiluvchini hurmat qiluvchi qo‘shimcha.',
        en: '께 is not merely formal; it specifically honors the recipient.',
        ru: '께 — не просто формальная форма, а уважительная частица.',
      },
      {
        ko: '선생님이나 부모님처럼 높여야 하는 사람에게는 "께"와 함께 "주다" 대신 "드리다"를 사용하는 경우가 많아요.',
        uz: 'Hurmatli odamlar bilan 께 va ko‘pincha 주다 o‘rniga 드리다 ishlatiladi.',
        en: 'With respected recipients, 께 is often paired with the honorific verb 드리다 instead of 주다.',
        ru: 'С уважаемым адресатом 께 часто сочетается с 드리다 вместо 주다.',
      },
      {
        ko: '"한테"는 주로 사람이나 동물처럼 행동의 상대가 될 수 있는 대상에게 사용해요.',
        uz: '한테 asosan odam yoki hayvon kabi harakat qabul qiluvchisi bo‘la oladigan mavjudotlar bilan ishlatiladi.',
        en: '한테 is mainly used with people or animals that can be recipients or targets of actions.',
        ru: '한테 в основном используется с людьми или животными как адресатами действия.',
      },
      {
        ko: '장소를 목적지로 나타낼 때는 "학교한테 가요"라고 하지 않고 "학교에 가요"라고 해요.',
        uz: 'Joy manzil bo‘lsa 한테 emas, 에 ishlatiladi: 학교에 가요.',
        en: 'Do not use 한테 for a place destination. Say 학교에 가요, not 학교한테 가요.',
        ru: 'Для места назначения используется 에: 학교에 가요, а не 학교한테 가요.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '친구에게 선물을 주는 상황에 가장 자연스러운 표현은?',
          uz: 'Do‘stga sovg‘a berish uchun eng tabiiy shakl qaysi?',
          en: 'Choose the most natural expression for giving a gift to a friend.',
          ru: 'Выберите наиболее естественное выражение для подарка другу.',
        },
        options: [
          { text: '친구한테 선물을 줘요.', correct: true },
          { text: '친구로 선물을 줘요.', correct: false },
          { text: '친구까지 선물을 줘요.', correct: false },
        ],
      },
      {
        question: {
          ko: '선생님을 높여서 말할 때 알맞은 조사는?',
          uz: 'O‘qituvchiga hurmat bilan murojaat qilganda qaysi qo‘shimcha to‘g‘ri?',
          en: 'Which particle is appropriate for an honored teacher?',
          ru: 'Какая частица подходит для уважительного обращения к учителю?',
        },
        options: [
          { text: '께', correct: true },
          { text: '한테만', correct: false },
          { text: '으로', correct: false },
        ],
      },
      {
        question: {
          ko: '빈칸에 알맞은 것을 고르세요. "부모님___ 선물을 드렸어요."',
          uz: 'Bo‘sh joyga mos javobni tanlang.',
          en: 'Choose the correct answer: "부모님___ 선물을 드렸어요."',
          ru: 'Выберите правильный вариант.',
        },
        options: [
          { text: '께', correct: true },
          { text: '를', correct: false },
          { text: '에서', correct: false },
        ],
      },
      {
        question: {
          ko: '장소와 함께 사용한 문장 중 자연스러운 것은?',
          uz: 'Joy bilan ishlatilgan tabiiy gapni tanlang.',
          en: 'Choose the natural sentence involving a place.',
          ru: 'Выберите естественное предложение с местом.',
        },
        options: [
          { text: '학교에 가요.', correct: true },
          { text: '학교한테 가요.', correct: false },
          { text: '학교께 가요.', correct: false },
        ],
      },
      {
        question: {
          ko: '"한테"와 의미가 가장 비슷한 조사는?',
          uz: '"한테"ga ma’nosi eng yaqin qo‘shimcha qaysi?',
          en: 'Which particle is closest in meaning to 한테?',
          ru: 'Какая частица ближе всего по значению к 한테?',
        },
        options: [
          { text: '에게', correct: true },
          { text: '부터', correct: false },
          { text: '까지', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-20. 경험 권유 V-아/어 보세요 ─────────
  {
    code: 'suggestion-a-eo-boseyo',
    pattern: 'V-아/어 보세요',
    section: 2,
    unit: 5,
    order: 20,
    isActive: true,

    summary: {
      ko: '"한번 직접 해 보세요"라는 뜻으로 상대방에게 어떤 행동을 시도하거나 경험해 보라고 권할 때 사용해요. 쇼핑, 음식, 여행 등 실제 생활에서 매우 자주 써요.',
      uz: '"Bir marta sinab ko‘ring" degan ma’noda biror ishni sinash yoki tajriba qilib ko‘rishni tavsiya qiladi.',
      en: 'Means "try doing it" and is used to recommend that someone attempt or experience an action.',
      ru: 'Означает «попробуйте сделать» и используется, когда советуют попробовать действие или получить опыт.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '권유', uz: 'Tavsiya', en: 'Recommendation', ru: 'Рекомендация' },
      { ko: '경험', uz: 'Tajriba', en: 'Trying', ru: 'Попытка' },
    ],

    explanation: {
      ko: '"V-아/어 보세요"는 상대방에게 어떤 행동을 직접 시도해 보라고 부드럽게 권하는 표현이에요. 여기서 "보다"는 단순히 눈으로 본다는 뜻이 아니라 "한번 해 보면서 경험하다"라는 의미를 더해요. 그래서 옷가게에서 "이 옷을 입어 보세요"라고 하면 그 옷을 실제로 착용해 보고 자신에게 맞는지 확인해 보라는 뜻이에요. 음식에서는 "이것을 먹어 보세요", 여행에서는 "제주도에 가 보세요", 공부에서는 "이 문장을 읽어 보세요"처럼 넓게 사용할 수 있어요. 동사 어간의 마지막 모음이 ㅏ 또는 ㅗ이면 "-아 보세요", 그 밖의 모음이면 "-어 보세요", "하다"는 "-해 보세요"가 돼요.',
      uz: '"V-아/어 보세요" suhbatdoshga biror ishni o‘zi bajarib sinab ko‘rishni muloyim tavsiya qiladi. Bu yerda 보다 "ko‘rmoq" degan oddiy ma’nodan tashqari "sinab ko‘rmoq, tajriba qilib ko‘rmoq" ma’nosini beradi. Masalan, 이 옷을 입어 보세요 — bu kiyimni kiyib ko‘ring. Ovqatda 먹어 보세요, sayohatda 가 보세요, o‘qishda 읽어 보세요 kabi ishlatiladi.',
      en: 'V-아/어 보세요 gently recommends that someone try an action for themselves. Here 보다 does not simply mean "to see"; it adds the meaning of attempting or experiencing something. In a clothing store, 이 옷을 입어 보세요 means "Try this on." With food, use 먹어 보세요; with travel, 가 보세요; with study, 읽어 보세요. Use -아 보세요 after ㅏ or ㅗ, -어 보세요 after other vowels, and -해 보세요 with 하다.',
      ru: 'V-아/어 보세요 мягко предлагает человеку самому попробовать действие. 보다 здесь означает не просто «смотреть», а «попробовать, испытать». В магазине 이 옷을 입어 보세요 означает «примерьте эту одежду». С едой используется 먹어 보세요, с путешествием — 가 보세요, с учёбой — 읽어 보세요. После ㅏ/ㅗ используется -아 보세요, после остальных гласных — -어 보세요, а 하다 → -해 보세요.',
    },

    conjugationRule: {
      ko: '어간 마지막 모음 ㅏ/ㅗ → -아 보세요 · 그 외 → -어 보세요 · 하다 → -해 보세요',
      uz: 'Oxirgi unli ㅏ/ㅗ → -아 보세요 · boshqa unlilar → -어 보세요 · 하다 → -해 보세요',
      en: 'Final vowel ㅏ/ㅗ → -아 보세요 · other vowels → -어 보세요 · 하다 → -해 보세요',
      ru: 'Последняя гласная ㅏ/ㅗ → -아 보세요 · остальные → -어 보세요 · 하다 → -해 보세요',
    },

    conjugations: [
      { base: '가다', result: '가 보세요' },
      { base: '오다', result: '와 보세요' },
      { base: '먹다', result: '먹어 보세요' },
      { base: '입다', result: '입어 보세요' },
      { base: '신다', result: '신어 보세요' },
      { base: '쓰다', result: '써 보세요' },
      { base: '읽다', result: '읽어 보세요' },
      { base: '듣다', result: '들어 보세요' },
      { base: '만들다', result: '만들어 보세요' },
      { base: '사용하다', result: '사용해 보세요' },
    ],

    examples: [
      {
        ko: '이 옷을 한번 입어 보세요.',
        highlight: '입어 보세요',
        gloss: {
          ko: '이 옷을 한번 입어 보세요.',
          uz: 'Bu kiyimni bir kiyib ko‘ring.',
          en: 'Try these clothes on.',
          ru: 'Попробуйте примерить эту одежду.',
        },
      },
      {
        ko: '이 신발도 신어 보세요.',
        highlight: '신어 보세요',
        gloss: {
          ko: '이 신발도 신어 보세요.',
          uz: 'Bu oyoq kiyimni ham kiyib ko‘ring.',
          en: 'Try these shoes on too.',
          ru: 'Примерьте и эту обувь.',
        },
      },
      {
        ko: '이 모자를 써 보세요.',
        highlight: '써 보세요',
        gloss: {
          ko: '이 모자를 써 보세요.',
          uz: 'Bu bosh kiyimni kiyib ko‘ring.',
          en: 'Try this hat on.',
          ru: 'Примерьте эту шляпу.',
        },
      },
      {
        ko: '이 음식도 한번 먹어 보세요.',
        highlight: '먹어 보세요',
        gloss: {
          ko: '이 음식도 한번 먹어 보세요.',
          uz: 'Bu taomni ham bir tatib ko‘ring.',
          en: 'Try this food too.',
          ru: 'Попробуйте и это блюдо.',
        },
      },
      {
        ko: '한국에 가면 한복을 입어 보세요.',
        highlight: '입어 보세요',
        gloss: {
          ko: '한국에 가면 한복을 입어 보세요.',
          uz: 'Koreyaga borsangiz hanbok kiyib ko‘ring.',
          en: 'If you go to Korea, try wearing hanbok.',
          ru: 'Если поедете в Корею, попробуйте надеть ханбок.',
        },
      },
      {
        ko: '이 책을 한번 읽어 보세요.',
        highlight: '읽어 보세요',
        gloss: {
          ko: '이 책을 한번 읽어 보세요.',
          uz: 'Bu kitobni bir o‘qib ko‘ring.',
          en: 'Try reading this book.',
          ru: 'Попробуйте прочитать эту книгу.',
        },
      },
      {
        ko: '이 노래를 들어 보세요.',
        highlight: '들어 보세요',
        gloss: {
          ko: '이 노래를 들어 보세요.',
          uz: 'Bu qo‘shiqni tinglab ko‘ring.',
          en: 'Try listening to this song.',
          ru: 'Послушайте эту песню.',
        },
      },
      {
        ko: '시간이 있으면 제주도에 가 보세요.',
        highlight: '가 보세요',
        gloss: {
          ko: '시간이 있으면 제주도에 가 보세요.',
          uz: 'Vaqtingiz bo‘lsa Jejuga borib ko‘ring.',
          en: 'If you have time, try visiting Jeju.',
          ru: 'Если будет время, съездите на Чеджу.',
        },
      },
      {
        ko: '이 앱을 한번 사용해 보세요.',
        highlight: '사용해 보세요',
        gloss: {
          ko: '이 앱을 한번 사용해 보세요.',
          uz: 'Bu ilovani bir ishlatib ko‘ring.',
          en: 'Try using this app.',
          ru: 'Попробуйте воспользоваться этим приложением.',
        },
      },
      {
        ko: '어려우면 다른 방법으로 해 보세요.',
        highlight: '해 보세요',
        gloss: {
          ko: '어려우면 다른 방법으로 해 보세요.',
          uz: 'Qiyin bo‘lsa boshqa usulda qilib ko‘ring.',
          en: 'If it is difficult, try doing it another way.',
          ru: 'Если сложно, попробуйте сделать это другим способом.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이 치마가 예쁘지만 저한테 잘 맞을까요?',
        highlight: '잘 맞을까요',
        gloss: {
          ko: '이 치마가 예쁘지만 저한테 잘 맞을까요?',
          uz: 'Bu yubka chiroyli, lekin menga yarasharmikan?',
          en: 'This skirt is pretty, but will it suit me?',
          ru: 'Эта юбка красивая, но подойдёт ли она мне?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '한번 입어 보세요.',
        highlight: '입어 보세요',
        gloss: {
          ko: '한번 입어 보세요.',
          uz: 'Bir kiyib ko‘ring.',
          en: 'Try it on.',
          ru: 'Примерьте.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '이 신발은 조금 작은 것 같아요.',
        highlight: '작은 것 같아요',
        gloss: {
          ko: '이 신발은 조금 작은 것 같아요.',
          uz: 'Bu oyoq kiyim biroz kichikdek.',
          en: 'These shoes seem a little small.',
          ru: 'Кажется, эта обувь немного мала.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '그럼 이 큰 사이즈를 신어 보세요.',
        highlight: '신어 보세요',
        gloss: {
          ko: '그럼 이 큰 사이즈를 신어 보세요.',
          uz: 'Unda kattaroq o‘lchamini kiyib ko‘ring.',
          en: 'Then try this larger size.',
          ru: 'Тогда примерьте размер побольше.',
        },
      },
    ],

    similar: {
      pattern: 'V-아/어 주세요',
      note: {
        ko: '"-아/어 주세요"는 상대방에게 어떤 행동을 해 달라고 부탁하는 표현이고, "-아/어 보세요"는 상대방이 직접 그 행동을 시도해 보도록 권하는 표현이에요. "입어 주세요"는 입어 달라는 부탁이고, "입어 보세요"는 한번 입어서 확인해 보라는 권유예요.',
        uz: '-아/어 주세요 — boshqa odamdan ishni bajarishni so‘rash. -아/어 보세요 — shu odamga ishni o‘zi sinab ko‘rishni tavsiya qilish.',
        en: '-아/어 주세요 asks someone to do something, while -아/어 보세요 recommends that the person try doing it themselves.',
        ru: '-아/어 주세요 — просьба сделать действие, а -아/어 보세요 — совет самому попробовать это действие.',
      },
    },

    cautions: [
      {
        ko: '"보다"가 들어 있지만 항상 "눈으로 보다"라는 뜻은 아니에요. "-아/어 보다" 전체가 "직접 시도해 보다"라는 의미를 만들어요.',
        uz: '보다 bor bo‘lsa ham, bu har doim "ko‘z bilan ko‘rmoq" degani emas. -아/어 보다 butunlay "sinab ko‘rmoq" ma’nosini beradi.',
        en: 'Although 보다 appears in the expression, it does not necessarily mean "to see". -아/어 보다 as a whole means "to try doing".',
        ru: 'Хотя используется 보다, оно не обязательно означает «смотреть». Вся конструкция значит «попробовать сделать».',
      },
      {
        ko: '"입어 주세요"와 "입어 보세요"는 달라요. 전자는 부탁, 후자는 권유예요.',
        uz: '입어 주세요 va 입어 보세요 turli ma’noda: birinchisi iltimos, ikkinchisi tavsiya.',
        en: '입어 주세요 and 입어 보세요 are different: the first is a request, the second is a recommendation to try.',
        ru: '입어 주세요 — просьба, а 입어 보세요 — предложение примерить.',
      },
      {
        ko: '"하다"는 "하아 보세요"가 아니라 "해 보세요"라고 해요.',
        uz: '하다 → 하아 보세요 emas, 해 보세요.',
        en: '하다 becomes 해 보세요, not 하아 보세요.',
        ru: '하다 превращается в 해 보세요, а не 하아 보세요.',
      },
      {
        ko: '"오다"는 "오아 보세요"가 아니라 "와 보세요", "쓰다"는 "쓰어 보세요"가 아니라 "써 보세요"예요.',
        uz: '오다 → 와 보세요, 쓰다 → 써 보세요.',
        en: '오다 becomes 와 보세요, and 쓰다 becomes 써 보세요.',
        ru: '오다 → 와 보세요, 쓰다 → 써 보세요.',
      },
      {
        ko: '"한번"을 함께 쓰면 강한 명령보다 부드러운 권유처럼 들리는 경우가 많아요.',
        uz: '한번 bilan ishlatilsa, gap ko‘pincha buyruqdan ko‘ra yumshoq tavsiya bo‘lib eshitiladi.',
        en: 'Adding 한번 often makes the expression sound like a gentle suggestion rather than a strong command.',
        ru: '한번 часто делает выражение более мягкой рекомендацией.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"입다"를 사용해서 옷을 한번 착용해 보라고 권하는 표현은?',
          uz: '"입다" bilan kiyimni sinab kiyishni tavsiya qiluvchi shakl qaysi?',
          en: 'Which expression recommends trying clothes on?',
          ru: 'Какое выражение предлагает примерить одежду?',
        },
        options: [
          { text: '입어 보세요', correct: true },
          { text: '입지 마세요', correct: false },
          { text: '입어 주세요', correct: false },
        ],
      },
      {
        question: {
          ko: '"먹다"의 알맞은 권유 표현은?',
          uz: '"먹다"ning to‘g‘ri tavsiya shakli qaysi?',
          en: 'Choose the correct try-it form of 먹다.',
          ru: 'Выберите правильную форму рекомендации от 먹다.',
        },
        options: [
          { text: '먹어 보세요', correct: true },
          { text: '먹아 보세요', correct: false },
          { text: '먹을 보세요', correct: false },
        ],
      },
      {
        question: {
          ko: '"하다"의 알맞은 형태는?',
          uz: '"하다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 하다.',
          ru: 'Выберите правильную форму 하다.',
        },
        options: [
          { text: '해 보세요', correct: true },
          { text: '하아 보세요', correct: false },
          { text: '하어 보세요', correct: false },
        ],
      },
      {
        question: {
          ko: '"입어 주세요"와 "입어 보세요"의 차이를 바르게 설명한 것은?',
          uz: '입어 주세요 va 입어 보세요 farqini to‘g‘ri tushuntirgan javobni tanlang.',
          en: 'Which correctly explains the difference between 입어 주세요 and 입어 보세요?',
          ru: 'Что правильно объясняет разницу между 입어 주세요 и 입어 보세요?',
        },
        options: [
          {
            text: '입어 주세요는 부탁이고 입어 보세요는 시도해 보라는 권유예요.',
            correct: true,
          },
          { text: '두 표현은 항상 완전히 같은 뜻이에요.', correct: false },
          { text: '입어 보세요는 과거형이에요.', correct: false },
        ],
      },
      {
        question: {
          ko: '옷가게에서 가장 자연스러운 권유를 고르세요.',
          uz: 'Kiyim do‘konidagi eng tabiiy tavsiyani tanlang.',
          en: 'Choose the most natural recommendation in a clothing store.',
          ru: 'Выберите наиболее естественную рекомендацию в магазине одежды.',
        },
        options: [
          { text: '이 옷을 한번 입어 보세요.', correct: true },
          { text: '이 옷을 입지 마세요.', correct: false },
          { text: '이 옷한테 가 보세요.', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-21. 조건 A/V-(으)면 ─────────
  {
    code: 'conditional-eumyeon',
    pattern: 'A/V-(으)면',
    section: 2,
    unit: 6,
    order: 21,
    isActive: true,

    summary: {
      ko: '"만약 ~하면"처럼 어떤 조건이 이루어졌을 때 뒤의 상황이나 행동이 일어난다는 뜻을 나타내요. 여행 계획, 약속, 조언, 일반적인 조건을 말할 때 매우 자주 사용해요.',
      uz: '"Agar ~ bo‘lsa/qilsa" ma’nosida shartni bildiradi. Birinchi holat yuz bersa, undan keyingi harakat yoki natija sodir bo‘lishini ko‘rsatadi.',
      en: 'Expresses a condition similar to "if" or "when". When the first condition is met, the following action or result occurs.',
      ru: 'Выражает условие со значением «если / когда». Если первое условие выполняется, происходит последующее действие или результат.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '조건', uz: 'Shart', en: 'Condition', ru: 'Условие' },
      { ko: '계획', uz: 'Reja', en: 'Plans', ru: 'Планы' },
    ],

    explanation: {
      ko: '"A/V-(으)면"은 앞의 상황을 조건으로 제시하고 그 조건이 이루어졌을 때 뒤의 내용이 성립한다는 뜻이에요. "시간이 있으면 여행을 가고 싶어요"는 시간이 있다는 조건이 충족되면 여행을 가고 싶다는 뜻이에요. 동사와 형용사 모두 사용할 수 있어요. 어간이 모음이나 ㄹ 받침으로 끝나면 "-면"을 붙이고, ㄹ을 제외한 다른 받침으로 끝나면 "-으면"을 붙여요. 그래서 "가다 → 가면", "살다 → 살면", "먹다 → 먹으면"이 돼요. 조건뿐 아니라 반복적으로 일어나는 일반적인 상황에서도 사용할 수 있어요. "봄이 되면 꽃이 피어요"처럼 어떤 때가 되면 자연스럽게 일어나는 일을 말할 수도 있어요.',
      uz: '"A/V-(으)면" birinchi gapni shart sifatida beradi va shu shart bajarilganda keyingi holat yuz berishini bildiradi. Masalan, "시간이 있으면 여행을 가고 싶어요" — vaqtim bo‘lsa sayohat qilmoqchiman. Fe’l va sifat bilan ishlatiladi. Negiz unli yoki ㄹ bilan tugasa -면, boshqa undosh bilan tugasa -으면 qo‘shiladi. 가다 → 가면, 살다 → 살면, 먹다 → 먹으면.',
      en: 'A/V-(으)면 presents the first clause as a condition for what follows. 시간이 있으면 여행을 가고 싶어요 means "If I have time, I want to travel." It can be used with both verbs and adjectives. Attach -면 after a vowel or ㄹ, and -으면 after other consonants. Thus 가다 → 가면, 살다 → 살면, and 먹다 → 먹으면. It can also describe situations that regularly occur whenever a condition is met.',
      ru: 'A/V-(으)면 ставит первую часть предложения как условие для второй. 시간이 있으면 여행을 가고 싶어요 означает «Если будет время, я хочу поехать путешествовать». Конструкция используется и с глаголами, и с прилагательными. После гласной или ㄹ используется -면, после других согласных — -으면.',
    },

    conjugationRule: {
      ko: '모음 끝 → -면 · ㄹ 받침 → -면 · 그 외 받침 → -으면 · 일부 불규칙 활용 주의',
      uz: 'Unli → -면 · ㄹ → -면 · boshqa undosh → -으면 · ayrim notekis shakllarga e’tibor',
      en: 'Vowel ending → -면 · ㄹ ending → -면 · other consonant → -으면 · watch for irregular conjugations',
      ru: 'Гласная → -면 · ㄹ → -면 · другая согласная → -으면 · учитывать неправильные формы',
    },

    conjugations: [
      { base: '가다', result: '가면' },
      { base: '오다', result: '오면' },
      { base: '보다', result: '보면' },
      { base: '하다', result: '하면' },
      { base: '살다', result: '살면' },
      { base: '만들다', result: '만들면' },
      { base: '먹다', result: '먹으면' },
      { base: '읽다', result: '읽으면' },
      { base: '좋다', result: '좋으면' },
      { base: '듣다', result: '들으면' },
    ],

    examples: [
      {
        ko: '시간이 있으면 여행을 가고 싶어요.',
        highlight: '있으면',
        gloss: {
          ko: '시간이 있으면 여행을 가고 싶어요.',
          uz: 'Vaqtim bo‘lsa, sayohatga bormoqchiman.',
          en: 'If I have time, I want to travel.',
          ru: 'Если будет время, я хочу поехать путешествовать.',
        },
      },
      {
        ko: '한국에 가면 제주도에도 가고 싶어요.',
        highlight: '가면',
        gloss: {
          ko: '한국에 가면 제주도에도 가고 싶어요.',
          uz: 'Koreyaga borsam, Jejuga ham bormoqchiman.',
          en: 'If I go to Korea, I want to visit Jeju too.',
          ru: 'Если я поеду в Корею, хочу также посетить Чеджу.',
        },
      },
      {
        ko: '날씨가 좋으면 산에 갈 거예요.',
        highlight: '좋으면',
        gloss: {
          ko: '날씨가 좋으면 산에 갈 거예요.',
          uz: 'Ob-havo yaxshi bo‘lsa, tog‘ga boraman.',
          en: 'If the weather is nice, I will go to the mountains.',
          ru: 'Если погода будет хорошая, я пойду в горы.',
        },
      },
      {
        ko: '비가 오면 호텔에서 쉴 거예요.',
        highlight: '오면',
        gloss: {
          ko: '비가 오면 호텔에서 쉴 거예요.',
          uz: 'Yomg‘ir yog‘sa, mehmonxonada dam olaman.',
          en: 'If it rains, I will rest at the hotel.',
          ru: 'Если пойдёт дождь, я буду отдыхать в отеле.',
        },
      },
      {
        ko: '배가 고프면 이 식당에 가 보세요.',
        highlight: '고프면',
        gloss: {
          ko: '배가 고프면 이 식당에 가 보세요.',
          uz: 'Och qolsangiz, shu restoranga borib ko‘ring.',
          en: 'If you are hungry, try this restaurant.',
          ru: 'Если проголодаетесь, попробуйте сходить в этот ресторан.',
        },
      },
      {
        ko: '길을 모르면 경찰에게 물어보세요.',
        highlight: '모르면',
        gloss: {
          ko: '길을 모르면 경찰에게 물어보세요.',
          uz: 'Yo‘lni bilmasangiz, politsiyachidan so‘rang.',
          en: 'If you do not know the way, ask a police officer.',
          ru: 'Если не знаете дорогу, спросите полицейского.',
        },
      },
      {
        ko: '이 버스를 타면 서울역에 갈 수 있어요.',
        highlight: '타면',
        gloss: {
          ko: '이 버스를 타면 서울역에 갈 수 있어요.',
          uz: 'Bu avtobusga chiqsangiz, Seul vokzaliga bora olasiz.',
          en: 'If you take this bus, you can get to Seoul Station.',
          ru: 'Если сядете на этот автобус, сможете доехать до вокзала Сеул.',
        },
      },
      {
        ko: '봄이 되면 꽃이 많이 피어요.',
        highlight: '되면',
        gloss: {
          ko: '봄이 되면 꽃이 많이 피어요.',
          uz: 'Bahor kelsa, ko‘p gullar ochiladi.',
          en: 'When spring comes, many flowers bloom.',
          ru: 'Когда наступает весна, расцветает много цветов.',
        },
      },
      {
        ko: '가격이 싸면 이 가방을 살 거예요.',
        highlight: '싸면',
        gloss: {
          ko: '가격이 싸면 이 가방을 살 거예요.',
          uz: 'Narxi arzon bo‘lsa, bu sumkani sotib olaman.',
          en: 'If the price is low, I will buy this bag.',
          ru: 'Если цена будет низкой, я куплю эту сумку.',
        },
      },
      {
        ko: '친구를 만나면 같이 여행 계획을 세울 거예요.',
        highlight: '만나면',
        gloss: {
          ko: '친구를 만나면 같이 여행 계획을 세울 거예요.',
          uz: 'Do‘stim bilan uchrashsam, birga sayohat rejasini tuzamiz.',
          en: 'When I meet my friend, we will plan the trip together.',
          ru: 'Когда встречусь с другом, мы вместе составим план поездки.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '방학에 시간이 있으면 뭐 하고 싶어요?',
        highlight: '있으면',
        gloss: {
          ko: '방학에 시간이 있으면 뭐 하고 싶어요?',
          uz: 'Ta’tilda vaqtingiz bo‘lsa, nima qilishni xohlaysiz?',
          en: 'What do you want to do if you have time during vacation?',
          ru: 'Что вы хотите делать, если на каникулах будет время?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '시간이 있으면 제주도에 가고 싶어요.',
        highlight: '있으면',
        gloss: {
          ko: '시간이 있으면 제주도에 가고 싶어요.',
          uz: 'Vaqtim bo‘lsa, Jejuga bormoqchiman.',
          en: 'If I have time, I want to go to Jeju.',
          ru: 'Если будет время, хочу поехать на Чеджу.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '비가 오면 어떻게 할 거예요?',
        highlight: '오면',
        gloss: {
          ko: '비가 오면 어떻게 할 거예요?',
          uz: 'Yomg‘ir yog‘sa nima qilasiz?',
          en: 'What will you do if it rains?',
          ru: 'Что будете делать, если пойдёт дождь?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '비가 오면 박물관에 갈 거예요.',
        highlight: '오면',
        gloss: {
          ko: '비가 오면 박물관에 갈 거예요.',
          uz: 'Yomg‘ir yog‘sa, muzeyga boraman.',
          en: 'If it rains, I will go to a museum.',
          ru: 'Если пойдёт дождь, я пойду в музей.',
        },
      },
    ],

    similar: {
      pattern: 'A/V-아서/어서',
      note: {
        ko: '"-(으)면"은 아직 확정되지 않은 조건이나 "그럴 경우"를 나타내고, "-아서/어서"는 이미 존재하는 이유나 자연스럽게 이어지는 행동을 나타낼 수 있어요. "비가 오면 안 갈 거예요"는 비가 오는 경우를 조건으로 말하고, "비가 와서 안 갔어요"는 실제로 비가 온 것이 이유예요.',
        uz: '-(으)면 shartni bildiradi, -아서/어서 esa sabab yoki ketma-ketlikni bildirishi mumkin.',
        en: '-(으)면 expresses a condition, while -아서/어서 can express an actual reason or connected sequence.',
        ru: '-(으)면 выражает условие, а -아서/어서 может выражать фактическую причину или последовательность.',
      },
    },

    cautions: [
      {
        ko: 'ㄹ 받침 뒤에는 "-으면"이 아니라 "-면"을 사용해요. "살으면"이 아니라 "살면"이에요.',
        uz: 'ㄹ dan keyin -으면 emas, -면 ishlatiladi: 살면.',
        en: 'After ㄹ, use -면, not -으면: 살면.',
        ru: 'После ㄹ используется -면, а не -으면: 살면.',
      },
      {
        ko: '"먹다"처럼 다른 받침으로 끝나는 동사는 "먹면"이 아니라 "먹으면"이에요.',
        uz: 'Boshqa undosh bilan tugasa -으면 ishlatiladi: 먹으면.',
        en: 'After another consonant, use -으면: 먹으면, not 먹면.',
        ru: 'После другой согласной используется -으면: 먹으면.',
      },
      {
        ko: '"듣다"는 ㄷ 불규칙이라서 "듣으면"이 아니라 "들으면"으로 활용해요.',
        uz: '듣다 ㄷ-notekis fe’l: 듣으면 emas, 들으면.',
        en: '듣다 is ㄷ-irregular, so it becomes 들으면, not 듣으면.',
        ru: '듣다 — неправильный ㄷ-глагол: 들으면, а не 듣으면.',
      },
      {
        ko: '조건절의 주어와 뒤 문장의 주어가 달라도 사용할 수 있어요. "날씨가 좋으면 저는 산에 갈 거예요"처럼 말할 수 있어요.',
        uz: 'Shart qismi va asosiy gapning egasi boshqa bo‘lishi mumkin.',
        en: 'The subjects of the conditional clause and main clause do not have to be the same.',
        ru: 'Подлежащее условной и главной частей может быть разным.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"가다"에 -(으)면을 붙인 형태는?',
          uz: '"가다" + -(으)면 shakli qaysi?',
          en: 'Choose the -(으)면 form of 가다.',
          ru: 'Выберите форму 가다 с -(으)면.',
        },
        options: [
          { text: '가면', correct: true },
          { text: '가으면', correct: false },
          { text: '갈으면', correct: false },
        ],
      },
      {
        question: {
          ko: '"먹다"의 알맞은 조건형은?',
          uz: '"먹다"ning to‘g‘ri shart shakli qaysi?',
          en: 'Choose the correct conditional form of 먹다.',
          ru: 'Выберите правильную условную форму 먹다.',
        },
        options: [
          { text: '먹으면', correct: true },
          { text: '먹면', correct: false },
          { text: '먹어면', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다"의 알맞은 형태는?',
          uz: '"살다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 살다.',
          ru: 'Выберите правильную форму 살다.',
        },
        options: [
          { text: '살면', correct: true },
          { text: '살으면', correct: false },
          { text: '사면', correct: false },
        ],
      },
      {
        question: {
          ko: '"듣다"의 알맞은 조건형은?',
          uz: '"듣다"ning to‘g‘ri shart shakli qaysi?',
          en: 'Choose the correct conditional form of 듣다.',
          ru: 'Выберите правильную условную форму 듣다.',
        },
        options: [
          { text: '들으면', correct: true },
          { text: '듣으면', correct: false },
          { text: '들면', correct: false },
        ],
      },
      {
        question: {
          ko: '조건을 자연스럽게 표현한 문장은?',
          uz: 'Shartni tabiiy ifodalagan gapni tanlang.',
          en: 'Choose the sentence that naturally expresses a condition.',
          ru: 'Выберите предложение, естественно выражающее условие.',
        },
        options: [
          { text: '날씨가 좋으면 여행을 갈 거예요.', correct: true },
          { text: '날씨가 좋아면 여행을 갈 거예요.', correct: false },
          { text: '날씨가 좋을어서 여행을 갈 거예요.', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-22. 현재 동작으로 명사 꾸미기 V-는 N ─────────
  {
    code: 'verb-attributive-neun',
    pattern: 'V-는 N',
    section: 2,
    unit: 6,
    order: 22,
    isActive: true,

    summary: {
      ko: '현재 하고 있는 행동이나 반복적으로 하는 행동을 이용해 뒤의 명사를 설명할 때 사용해요. "제가 가는 여행지", "한국어를 공부하는 사람"처럼 만들어요.',
      uz: 'Hozirgi yoki odatiy harakat yordamida keyingi otni tasvirlaydi. Masalan, 한국어를 공부하는 사람.',
      en: 'Uses a present or habitual action to describe a following noun, as in 한국어를 공부하는 사람.',
      ru: 'Использует действие в настоящем времени для определения следующего существительного: 한국어를 공부하는 사람.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      {
        ko: '관형형',
        uz: 'Aniqlovchi shakl',
        en: 'Attributive form',
        ru: 'Определительная форма',
      },
      { ko: '현재', uz: 'Hozirgi zamon', en: 'Present', ru: 'Настоящее время' },
    ],

    explanation: {
      ko: '"V-는 N"은 동사가 뒤에 오는 명사를 꾸며 주는 형태예요. 영어의 "the person who studies", "the place I visit"처럼 한 문장 안에서 명사를 더 자세하게 설명할 수 있어요. 기본적으로 동사 어간에 "-는"을 붙여요. "먹다 → 먹는 음식", "공부하다 → 공부하는 학생", "가다 → 가는 곳"처럼 만들어요. ㄹ 받침 동사는 "-는" 앞에서 ㄹ이 탈락해서 "살다 → 사는 곳", "만들다 → 만드는 사람"처럼 돼요. 현재 진행 중인 행동뿐 아니라 평소 반복하는 행동이나 일반적인 사실도 표현할 수 있어요. "매일 타는 버스"는 지금 이 순간 타고 있다는 뜻이 아니라 평소 이용하는 버스라는 뜻이에요.',
      uz: '"V-는 N" fe’l yordamida keyingi otni aniqlaydi. Masalan, 공부하는 학생 — o‘qiyotgan talaba, 제가 가는 곳 — men boradigan joy. Odatda fe’l negiziga -는 qo‘shiladi. ㄹ bilan tugagan fe’llarda ㄹ tushadi: 살다 → 사는 곳, 만들다 → 만드는 사람. Bu shakl ayni paytdagi harakatdan tashqari odatiy yoki takroriy harakatni ham bildiradi.',
      en: 'V-는 N allows a verb to directly describe a noun, similar to "the person who studies" or "the place I go to". In most cases, simply attach -는 to the verb stem: 먹다 → 먹는 음식, 공부하다 → 공부하는 학생, 가다 → 가는 곳. With ㄹ-final verbs, ㄹ disappears before -는: 살다 → 사는 곳, 만들다 → 만드는 사람. It can describe both a current action and a habitual or repeated action.',
      ru: 'V-는 N позволяет глаголу определять существительное: «человек, который учится», «место, куда я хожу». Обычно к основе добавляется -는: 먹다 → 먹는 음식, 공부하다 → 공부하는 학생. После ㄹ он выпадает: 살다 → 사는 곳, 만들다 → 만드는 사람. Форма может выражать как текущее, так и привычное действие.',
    },

    conjugationRule: {
      ko: '동사 어간 + -는 N · ㄹ 받침 → ㄹ 탈락 + -는 N',
      uz: 'Fe’l negizi + -는 N · ㄹ bilan tugasa ㄹ tushadi + -는 N',
      en: 'Verb stem + -는 N · ㄹ-final stem → delete ㄹ + -는 N',
      ru: 'Основа глагола + -는 N · после ㄹ → убрать ㄹ + -는 N',
    },

    conjugations: [
      { base: '가다', result: '가는 곳' },
      { base: '오다', result: '오는 사람' },
      { base: '먹다', result: '먹는 음식' },
      { base: '읽다', result: '읽는 책' },
      { base: '공부하다', result: '공부하는 학생' },
      { base: '여행하다', result: '여행하는 사람' },
      { base: '타다', result: '타는 버스' },
      { base: '살다', result: '사는 곳' },
      { base: '만들다', result: '만드는 음식' },
      { base: '알다', result: '아는 사람' },
    ],

    examples: [
      {
        ko: '제가 가는 곳은 제주도예요.',
        highlight: '가는 곳',
        gloss: {
          ko: '제가 가는 곳은 제주도예요.',
          uz: 'Men boradigan joy Jeju.',
          en: 'The place I am going to is Jeju.',
          ru: 'Место, куда я еду, — Чеджу.',
        },
      },
      {
        ko: '한국어를 공부하는 사람이 많아요.',
        highlight: '공부하는 사람',
        gloss: {
          ko: '한국어를 공부하는 사람이 많아요.',
          uz: 'Koreys tilini o‘rganayotgan odamlar ko‘p.',
          en: 'There are many people studying Korean.',
          ru: 'Много людей изучают корейский язык.',
        },
      },
      {
        ko: '저기 오는 사람이 제 친구예요.',
        highlight: '오는 사람',
        gloss: {
          ko: '저기 오는 사람이 제 친구예요.',
          uz: 'Ana u kelayotgan odam mening do‘stim.',
          en: 'The person coming over there is my friend.',
          ru: 'Человек, который идёт там, — мой друг.',
        },
      },
      {
        ko: '제가 좋아하는 여행지는 부산이에요.',
        highlight: '좋아하는 여행지',
        gloss: {
          ko: '제가 좋아하는 여행지는 부산이에요.',
          uz: 'Men yoqtiradigan sayohat joyi — Pusan.',
          en: 'My favorite travel destination is Busan.',
          ru: 'Моё любимое место для путешествий — Пусан.',
        },
      },
      {
        ko: '매일 타는 버스가 오늘 늦게 왔어요.',
        highlight: '타는 버스',
        gloss: {
          ko: '매일 타는 버스가 오늘 늦게 왔어요.',
          uz: 'Har kuni minadigan avtobusim bugun kech keldi.',
          en: 'The bus I take every day came late today.',
          ru: 'Автобус, на котором я езжу каждый день, сегодня опоздал.',
        },
      },
      {
        ko: '민수 씨가 읽는 책은 여행 책이에요.',
        highlight: '읽는 책',
        gloss: {
          ko: '민수 씨가 읽는 책은 여행 책이에요.',
          uz: 'Minsu o‘qiyotgan kitob sayohat haqida.',
          en: 'The book Minsu is reading is a travel book.',
          ru: 'Книга, которую читает Минсу, — о путешествиях.',
        },
      },
      {
        ko: '제가 사는 곳은 서울이에요.',
        highlight: '사는 곳',
        gloss: {
          ko: '제가 사는 곳은 서울이에요.',
          uz: 'Men yashaydigan joy — Seul.',
          en: 'The place where I live is Seoul.',
          ru: 'Я живу в Сеуле.',
        },
      },
      {
        ko: '음식을 만드는 사람이 제 형이에요.',
        highlight: '만드는 사람',
        gloss: {
          ko: '음식을 만드는 사람이 제 형이에요.',
          uz: 'Ovqat tayyorlayotgan odam mening akam.',
          en: 'The person making the food is my older brother.',
          ru: 'Человек, который готовит еду, — мой старший брат.',
        },
      },
      {
        ko: '여행을 좋아하는 친구하고 제주도에 갈 거예요.',
        highlight: '좋아하는 친구',
        gloss: {
          ko: '여행을 좋아하는 친구하고 제주도에 갈 거예요.',
          uz: 'Sayohatni yoqtiradigan do‘stim bilan Jejuga boraman.',
          en: 'I am going to Jeju with a friend who likes traveling.',
          ru: 'Я поеду на Чеджу с другом, который любит путешествия.',
        },
      },
      {
        ko: '제가 아는 사람도 한국에 살아요.',
        highlight: '아는 사람',
        gloss: {
          ko: '제가 아는 사람도 한국에 살아요.',
          uz: 'Men biladigan odam ham Koreyada yashaydi.',
          en: 'Someone I know also lives in Korea.',
          ru: 'Один мой знакомый тоже живёт в Корее.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '어떤 여행지를 좋아해요?',
        highlight: '어떤 여행지',
        gloss: {
          ko: '어떤 여행지를 좋아해요?',
          uz: 'Qanday sayohat joylarini yoqtirasiz?',
          en: 'What kind of travel destinations do you like?',
          ru: 'Какие места для путешествий вам нравятся?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '바다가 있는 곳을 좋아해요.',
        highlight: '있는 곳',
        gloss: {
          ko: '바다가 있는 곳을 좋아해요.',
          uz: 'Dengizi bor joylarni yoqtiraman.',
          en: 'I like places that have the sea.',
          ru: 'Мне нравятся места у моря.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '요즘 읽는 책이 있어요?',
        highlight: '읽는 책',
        gloss: {
          ko: '요즘 읽는 책이 있어요?',
          uz: 'Hozir o‘qiyotgan kitobingiz bormi?',
          en: 'Is there a book you are reading these days?',
          ru: 'Вы сейчас какую-нибудь книгу читаете?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 한국 여행을 소개하는 책을 읽고 있어요.',
        highlight: '소개하는 책',
        gloss: {
          ko: '네, 한국 여행을 소개하는 책을 읽고 있어요.',
          uz: 'Ha, Koreyaga sayohat haqida tanishtiruvchi kitob o‘qiyapman.',
          en: 'Yes, I am reading a book introducing travel in Korea.',
          ru: 'Да, читаю книгу о путешествиях по Корее.',
        },
      },
    ],

    similar: {
      pattern: 'A-(으)ㄴ N',
      note: {
        ko: '형용사로 명사를 꾸밀 때는 "예쁜 곳, 좋은 호텔"처럼 A-(으)ㄴ N을 사용하고, 현재의 동작을 나타내는 동사로 꾸밀 때는 "가는 곳, 먹는 음식"처럼 V-는 N을 사용해요.',
        uz: 'Sifat bilan otni aniqlashda A-(으)ㄴ N, harakat fe’li bilan esa V-는 N ishlatiladi.',
        en: 'Use A-(으)ㄴ N with adjectives, such as 예쁜 곳, and V-는 N with present action verbs, such as 가는 곳.',
        ru: 'С прилагательными используется A-(으)ㄴ N, а с глаголами настоящего действия — V-는 N.',
      },
    },

    cautions: [
      {
        ko: '현재 동사의 관형형에서는 받침이 있어도 기본적으로 "-는"을 사용해요. "먹은 음식"은 현재가 아니라 다른 시간 의미가 될 수 있어요.',
        uz: 'Hozirgi fe’l aniqlovchi shaklida odatda -는 ishlatiladi. 먹는 음식 — hozirgi/odatdagi ma’no.',
        en: 'Present-tense action verbs normally take -는. 먹는 음식 is different from 먹은 음식.',
        ru: 'Глаголы действия в настоящем времени обычно используют -는. 먹는 음식 отличается от 먹은 음식.',
      },
      {
        ko: 'ㄹ 받침은 "-는" 앞에서 탈락해요. "살는 곳"이 아니라 "사는 곳"이에요.',
        uz: 'ㄹ -는 oldidan tushadi: 살는 곳 emas, 사는 곳.',
        en: 'ㄹ disappears before -는: 사는 곳, not 살는 곳.',
        ru: 'ㄹ выпадает перед -는: 사는 곳, а не 살는 곳.',
      },
      {
        ko: '"알다"도 "알는 사람"이 아니라 "아는 사람"이라고 해요.',
        uz: '알다 → 알는 사람 emas, 아는 사람.',
        en: '알다 becomes 아는 사람, not 알는 사람.',
        ru: '알다 → 아는 사람, а не 알는 사람.',
      },
      {
        ko: '명사를 꾸미는 절이 길어져도 꾸밈을 받는 명사는 항상 뒤에 와요. "제가 여행할 때 자주 타는 버스"처럼 만들 수 있어요.',
        uz: 'Aniqlovchi qism uzun bo‘lsa ham, asosiy ot uning oxirida keladi.',
        en: 'Even when the modifying clause becomes longer, the noun being described comes after it.',
        ru: 'Даже если определительная часть длинная, определяемое существительное стоит после неё.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"가다"로 "가는 곳"을 만드는 알맞은 형태는?',
          uz: '"가다" bilan "boradigan joy" shaklini tanlang.',
          en: 'Choose the correct attributive form of 가다.',
          ru: 'Выберите правильную определительную форму 가다.',
        },
        options: [
          { text: '가는 곳', correct: true },
          { text: '간는 곳', correct: false },
          { text: '가은 곳', correct: false },
        ],
      },
      {
        question: {
          ko: '"먹다"의 현재 관형형은?',
          uz: '"먹다"ning hozirgi aniqlovchi shakli qaysi?',
          en: 'Choose the present attributive form of 먹다.',
          ru: 'Выберите определительную форму настоящего времени 먹다.',
        },
        options: [
          { text: '먹는 음식', correct: true },
          { text: '먹은 음식', correct: false },
          { text: '먹으는 음식', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다"의 알맞은 형태는?',
          uz: '"살다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 살다.',
          ru: 'Выберите правильную форму 살다.',
        },
        options: [
          { text: '사는 곳', correct: true },
          { text: '살는 곳', correct: false },
          { text: '살은 곳', correct: false },
        ],
      },
      {
        question: {
          ko: '"알다"로 사람을 꾸밀 때 알맞은 표현은?',
          uz: '"알다" bilan odamni aniqlaganda qaysi shakl to‘g‘ri?',
          en: 'Choose the correct expression using 알다.',
          ru: 'Выберите правильное выражение с 알다.',
        },
        options: [
          { text: '아는 사람', correct: true },
          { text: '알는 사람', correct: false },
          { text: '알은 사람', correct: false },
        ],
      },
      {
        question: {
          ko: '현재 행동으로 명사를 자연스럽게 꾸민 문장은?',
          uz: 'Hozirgi harakat bilan otni tabiiy aniqlagan gapni tanlang.',
          en: 'Choose the sentence with a natural present action modifier.',
          ru: 'Выберите предложение с естественной определительной формой настоящего времени.',
        },
        options: [
          { text: '저기 오는 사람이 제 친구예요.', correct: true },
          { text: '저기 오은 사람이 제 친구예요.', correct: false },
          { text: '저기 올는 사람이 제 친구예요.', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-23. 자신의 희망 V-고 싶다 ─────────
  {
    code: 'desire-go-sipda',
    pattern: 'V-고 싶다',
    section: 2,
    unit: 6,
    order: 23,
    isActive: true,

    summary: {
      ko: '자기가 하고 싶은 행동이나 바람을 말할 때 사용해요. 여행, 음식, 취미, 공부 등 원하는 행동을 표현하는 가장 기본적인 문법이에요.',
      uz: 'Gapiruvchining nima qilishni xohlashini bildiradi. Sayohat, ovqat, hobbi va boshqa istaklarni ifodalashning asosiy shakli.',
      en: 'Expresses what the speaker wants to do. It is one of the most basic ways to talk about desires involving actions.',
      ru: 'Выражает желание говорящего что-либо сделать. Это одна из основных конструкций для выражения желаний.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '희망', uz: 'Istak', en: 'Desire', ru: 'Желание' },
      { ko: '여행', uz: 'Sayohat', en: 'Travel', ru: 'Путешествие' },
    ],

    explanation: {
      ko: '"V-고 싶다"는 말하는 사람이 어떤 행동을 하기를 원할 때 사용해요. 동사의 기본형에서 "-다"를 빼고 어간에 그대로 "-고 싶다"를 붙이면 돼요. 받침 여부와 관계없이 형태가 같아서 "가다 → 가고 싶어요", "먹다 → 먹고 싶어요", "공부하다 → 공부하고 싶어요"처럼 활용해요. 보통 자기 자신의 희망을 말하거나 상대방에게 직접 "뭐 하고 싶어요?"라고 물을 때 사용해요. 제3자의 희망을 단정해서 말할 때는 일반적으로 "-고 싶어 하다"를 사용해요. 부정은 "안 가고 싶어요"라고 할 수도 있지만 "가고 싶지 않아요"도 매우 자연스러워요.',
      uz: '"V-고 싶다" gapiruvchining biror ishni bajarishni xohlashini bildiradi. -다 olib tashlanib, negizga -고 싶다 qo‘shiladi. 받침 bor-yo‘qligidan qat’i nazar bir xil: 가다 → 가고 싶어요, 먹다 → 먹고 싶어요, 공부하다 → 공부하고 싶어요. Odatda o‘z xohishingizni aytishda yoki suhbatdoshdan uning xohishini so‘rashda ishlatiladi.',
      en: 'V-고 싶다 expresses the speaker’s desire to perform an action. Remove -다 and attach -고 싶다 to the verb stem. The form is the same regardless of final consonant: 가다 → 가고 싶어요, 먹다 → 먹고 싶어요, 공부하다 → 공부하고 싶어요. It is normally used for your own desire or when directly asking the listener what they want to do. For a third person’s desire, -고 싶어 하다 is generally used.',
      ru: 'V-고 싶다 выражает желание говорящего выполнить действие. Уберите -다 и добавьте -고 싶다 к основе. Форма не зависит от 받침: 가다 → 가고 싶어요, 먹다 → 먹고 싶어요. Обычно используется для собственного желания или вопроса собеседнику. Для желания третьего лица обычно используется -고 싶어 하다.',
    },

    conjugationRule: {
      ko: '동사 어간 + -고 싶다 · 현재 공손형 → -고 싶어요 · 부정 → -고 싶지 않아요',
      uz: 'Fe’l negizi + -고 싶다 · muloyim hozirgi shakl → -고 싶어요 · inkor → -고 싶지 않아요',
      en: 'Verb stem + -고 싶다 · polite present → -고 싶어요 · negative → -고 싶지 않아요',
      ru: 'Основа глагола + -고 싶다 · вежливая форма → -고 싶어요 · отрицание → -고 싶지 않아요',
    },

    conjugations: [
      { base: '가다', result: '가고 싶어요' },
      { base: '오다', result: '오고 싶어요' },
      { base: '먹다', result: '먹고 싶어요' },
      { base: '보다', result: '보고 싶어요' },
      { base: '만나다', result: '만나고 싶어요' },
      { base: '여행하다', result: '여행하고 싶어요' },
      { base: '공부하다', result: '공부하고 싶어요' },
      { base: '쉬다', result: '쉬고 싶어요' },
      { base: '타다', result: '타고 싶어요' },
      { base: '배우다', result: '배우고 싶어요' },
    ],

    examples: [
      {
        ko: '저는 제주도에 가고 싶어요.',
        highlight: '가고 싶어요',
        gloss: {
          ko: '저는 제주도에 가고 싶어요.',
          uz: 'Men Jejuga bormoqchiman.',
          en: 'I want to go to Jeju.',
          ru: 'Я хочу поехать на Чеджу.',
        },
      },
      {
        ko: '한국에서 여행하고 싶어요.',
        highlight: '여행하고 싶어요',
        gloss: {
          ko: '한국에서 여행하고 싶어요.',
          uz: 'Koreyada sayohat qilmoqchiman.',
          en: 'I want to travel in Korea.',
          ru: 'Я хочу путешествовать по Корее.',
        },
      },
      {
        ko: '한복을 한번 입고 싶어요.',
        highlight: '입고 싶어요',
        gloss: {
          ko: '한복을 한번 입고 싶어요.',
          uz: 'Hanbokni bir marta kiyib ko‘rishni xohlayman.',
          en: 'I want to wear hanbok once.',
          ru: 'Я хочу однажды надеть ханбок.',
        },
      },
      {
        ko: '한국 음식을 많이 먹고 싶어요.',
        highlight: '먹고 싶어요',
        gloss: {
          ko: '한국 음식을 많이 먹고 싶어요.',
          uz: 'Ko‘p koreys taomlarini tatib ko‘rmoqchiman.',
          en: 'I want to eat lots of Korean food.',
          ru: 'Я хочу попробовать много корейских блюд.',
        },
      },
      {
        ko: '부산에서 바다를 보고 싶어요.',
        highlight: '보고 싶어요',
        gloss: {
          ko: '부산에서 바다를 보고 싶어요.',
          uz: 'Pusanda dengizni ko‘rmoqchiman.',
          en: 'I want to see the sea in Busan.',
          ru: 'Я хочу увидеть море в Пусане.',
        },
      },
      {
        ko: '이번 주말에는 집에서 쉬고 싶어요.',
        highlight: '쉬고 싶어요',
        gloss: {
          ko: '이번 주말에는 집에서 쉬고 싶어요.',
          uz: 'Bu hafta oxirida uyda dam olmoqchiman.',
          en: 'I want to rest at home this weekend.',
          ru: 'В эти выходные я хочу отдохнуть дома.',
        },
      },
      {
        ko: '한국 친구를 만나고 싶어요.',
        highlight: '만나고 싶어요',
        gloss: {
          ko: '한국 친구를 만나고 싶어요.',
          uz: 'Koreys do‘stim bilan uchrashmoqchiman.',
          en: 'I want to meet my Korean friend.',
          ru: 'Я хочу встретиться с корейским другом.',
        },
      },
      {
        ko: '한국어를 더 잘하고 싶어요.',
        highlight: '잘하고 싶어요',
        gloss: {
          ko: '한국어를 더 잘하고 싶어요.',
          uz: 'Koreys tilini yanada yaxshi bilishni xohlayman.',
          en: 'I want to become better at Korean.',
          ru: 'Я хочу лучше говорить по-корейски.',
        },
      },
      {
        ko: '다음 여행에서는 비행기를 타고 싶지 않아요.',
        highlight: '타고 싶지 않아요',
        gloss: {
          ko: '다음 여행에서는 비행기를 타고 싶지 않아요.',
          uz: 'Keyingi safarda samolyotga chiqishni xohlamayman.',
          en: 'I do not want to take a plane on my next trip.',
          ru: 'В следующей поездке я не хочу лететь на самолёте.',
        },
      },
      {
        ko: '방학에 뭐 하고 싶어요?',
        highlight: '하고 싶어요',
        gloss: {
          ko: '방학에 뭐 하고 싶어요?',
          uz: 'Ta’tilda nima qilishni xohlaysiz?',
          en: 'What do you want to do during vacation?',
          ru: 'Что вы хотите делать на каникулах?',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '이번 방학에 어디에 가고 싶어요?',
        highlight: '가고 싶어요',
        gloss: {
          ko: '이번 방학에 어디에 가고 싶어요?',
          uz: 'Bu ta’tilda qayerga bormoqchisiz?',
          en: 'Where do you want to go this vacation?',
          ru: 'Куда вы хотите поехать на этих каникулах?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '제주도에 가고 싶어요.',
        highlight: '가고 싶어요',
        gloss: {
          ko: '제주도에 가고 싶어요.',
          uz: 'Jejuga bormoqchiman.',
          en: 'I want to go to Jeju.',
          ru: 'Я хочу поехать на Чеджу.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '제주도에서 뭐 하고 싶어요?',
        highlight: '하고 싶어요',
        gloss: {
          ko: '제주도에서 뭐 하고 싶어요?',
          uz: 'Jejuda nima qilmoqchisiz?',
          en: 'What do you want to do in Jeju?',
          ru: 'Что вы хотите делать на Чеджу?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '바다도 보고 맛있는 음식도 먹고 싶어요.',
        highlight: '먹고 싶어요',
        gloss: {
          ko: '바다도 보고 맛있는 음식도 먹고 싶어요.',
          uz: 'Dengizni ko‘rib, mazali taomlar ham yemoqchiman.',
          en: 'I want to see the sea and eat delicious food.',
          ru: 'Я хочу увидеть море и попробовать вкусную еду.',
        },
      },
    ],

    similar: {
      pattern: 'V-(으)려고 하다',
      note: {
        ko: '"-고 싶다"는 원하는 마음 자체를 표현하고, "-(으)려고 하다"는 실제로 그렇게 할 의도나 계획이 있다는 느낌이 더 강해요. "한국에 가고 싶어요"는 희망이고, "한국에 가려고 해요"는 실제 계획에 가까워요.',
        uz: '-고 싶다 istakni, -(으)려고 하다 esa aniqroq niyat yoki rejani bildiradi.',
        en: '-고 싶다 expresses desire, while -(으)려고 하다 more strongly suggests an actual intention or plan.',
        ru: '-고 싶다 выражает желание, а -(으)려고 하다 — более конкретное намерение или план.',
      },
    },

    cautions: [
      {
        ko: '"가고 싶어요"에서 "-고" 앞에 시제나 다른 활용을 넣지 않아요. "가아고 싶어요" 같은 형태는 틀려요.',
        uz: 'Fe’l negiziga to‘g‘ridan-to‘g‘ri -고 싶다 qo‘shiladi.',
        en: 'Attach -고 싶다 directly to the verb stem.',
        ru: '-고 싶다 присоединяется непосредственно к основе глагола.',
      },
      {
        ko: '자기 희망에는 "-고 싶어요"가 자연스럽지만 제3자의 희망을 말할 때는 보통 "-고 싶어 해요"를 사용해요.',
        uz: 'O‘z xohishingiz uchun -고 싶어요, uchinchi shaxs uchun odatda -고 싶어 해요.',
        en: 'Use -고 싶어요 naturally for your own desire; for a third person, generally use -고 싶어 해요.',
        ru: 'Для собственного желания используется -고 싶어요, для третьего лица обычно -고 싶어 해요.',
      },
      {
        ko: '상대방에게 직접 "뭐 먹고 싶어요?"처럼 묻는 것은 자연스러워요.',
        uz: 'Suhbatdoshga to‘g‘ridan-to‘g‘ri 뭐 먹고 싶어요? deb so‘rash tabiiy.',
        en: 'It is natural to directly ask the listener 뭐 먹고 싶어요?',
        ru: 'Собеседника естественно спрашивать прямо: 뭐 먹고 싶어요?',
      },
      {
        ko: '부정할 때 "가고 싶지 않아요"를 많이 사용해요. 단순히 "못 가고 싶어요"라고 하면 뜻이 어색해질 수 있어요.',
        uz: 'Inkor uchun 가고 싶지 않아요 tabiiy. 못 가고 싶어요 ko‘pincha noqulay.',
        en: 'For negating desire, 가고 싶지 않아요 is natural. 못 가고 싶어요 usually sounds awkward.',
        ru: 'Для отрицания желания естественно 가고 싶지 않아요.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"가다"로 자신의 희망을 표현한 것은?',
          uz: '"가다" bilan o‘z istagini ifodalagan shakl qaysi?',
          en: 'Choose the form expressing your desire to go.',
          ru: 'Выберите форму, выражающую желание пойти.',
        },
        options: [
          { text: '가고 싶어요', correct: true },
          { text: '가서 싶어요', correct: false },
          { text: '갈고 싶어요', correct: false },
        ],
      },
      {
        question: {
          ko: '"먹다"의 알맞은 형태는?',
          uz: '"먹다"ning to‘g‘ri istak shakli qaysi?',
          en: 'Choose the correct form of 먹다.',
          ru: 'Выберите правильную форму 먹다.',
        },
        options: [
          { text: '먹고 싶어요', correct: true },
          { text: '먹어고 싶어요', correct: false },
          { text: '먹을 싶어요', correct: false },
        ],
      },
      {
        question: {
          ko: '상대방의 희망을 묻는 자연스러운 표현은?',
          uz: 'Suhbatdoshning xohishini so‘rash uchun tabiiy gap qaysi?',
          en: 'Choose the natural way to ask the listener about their desire.',
          ru: 'Выберите естественный вопрос о желании собеседника.',
        },
        options: [
          { text: '뭐 하고 싶어요?', correct: true },
          { text: '뭐 해서 싶어요?', correct: false },
          { text: '뭐 하는 싶어요?', correct: false },
        ],
      },
      {
        question: {
          ko: '"여행을 가고 싶지 않아요."의 뜻은?',
          uz: '"여행을 가고 싶지 않아요." nimani anglatadi?',
          en: 'What does 여행을 가고 싶지 않아요 mean?',
          ru: 'Что означает 여행을 가고 싶지 않아요?',
        },
        options: [
          { text: '여행을 가고 싶은 마음이 없어요.', correct: true },
          { text: '여행을 꼭 가야 돼요.', correct: false },
          { text: '이미 여행을 갔어요.', correct: false },
        ],
      },
      {
        question: {
          ko: '희망을 나타내는 문장을 고르세요.',
          uz: 'Istakni bildirgan gapni tanlang.',
          en: 'Choose the sentence that expresses a desire.',
          ru: 'Выберите предложение, выражающее желание.',
        },
        options: [
          { text: '제주도에 가고 싶어요.', correct: true },
          { text: '제주도에 가지 마세요.', correct: false },
          { text: '제주도에서 왔어요.', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-24. 제3자의 희망 V-고 싶어 하다 ─────────
  {
    code: 'third-person-desire-go-sipeohada',
    pattern: 'V-고 싶어 하다',
    section: 2,
    unit: 6,
    order: 24,
    isActive: true,

    summary: {
      ko: '다른 사람이 어떤 행동을 하고 싶어 한다는 것을 말할 때 사용해요. 자기 희망의 "-고 싶다"와 달리 제3자의 희망이나 욕구를 관찰해서 전달할 때 쓰는 표현이에요.',
      uz: 'Boshqa odamning biror ishni qilishni xohlashini bildiradi. O‘z istagingizdagi -고 싶다 dan farqli ravishda uchinchi shaxsning istagini ifodalaydi.',
      en: 'Expresses another person’s desire to do something. Unlike -고 싶다 for your own desire, this form is normally used for a third person.',
      ru: 'Выражает желание другого человека выполнить действие. В отличие от -고 싶다, обычно используется для третьего лица.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '희망', uz: 'Istak', en: 'Desire', ru: 'Желание' },
      {
        ko: '제3자',
        uz: 'Uchinchi shaxs',
        en: 'Third person',
        ru: 'Третье лицо',
      },
    ],

    explanation: {
      ko: '"V-고 싶어 하다"는 말하는 사람 자신이 아니라 다른 사람의 희망이나 욕구를 설명할 때 사용해요. 한국어에서는 사람의 마음속 생각을 직접 알 수 없다고 보기 때문에 제3자에 대해서는 단순히 "-고 싶다"라고 단정하기보다 겉으로 보이는 말이나 행동을 바탕으로 "-고 싶어 하다"를 사용해요. "민수 씨는 한국에 가고 싶어 해요", "동생은 새 신발을 사고 싶어 해요"처럼 말해요. 동사 어간에 "-고 싶어 하다"를 붙이며 받침 여부와 관계없이 형태는 같아요. 과거에는 "가고 싶어 했어요"처럼 활용할 수 있어요.',
      uz: '"V-고 싶어 하다" gapiruvchining o‘zi emas, boshqa odamning istagini bildiradi. Koreys tilida boshqa odamning ichki hissini bevosita bilamiz deb aytishdan ko‘ra, uning gap va xatti-harakatiga qarab -고 싶어 하다 ishlatiladi. Masalan: 민수 씨는 한국에 가고 싶어 해요. Fe’l negiziga -고 싶어 하다 qo‘shiladi.',
      en: 'V-고 싶어 하다 describes the desire of someone other than the speaker. Korean generally distinguishes between directly stating your own internal desire with -고 싶다 and describing another person’s observable desire with -고 싶어 하다. For example, 민수 씨는 한국에 가고 싶어 해요 means "Minsu wants to go to Korea." Attach -고 싶어 하다 directly to the verb stem.',
      ru: 'V-고 싶어 하다 описывает желание другого человека. В корейском обычно различают собственное внутреннее желание с -고 싶다 и наблюдаемое желание третьего лица с -고 싶어 하다. Например: 민수 씨는 한국에 가고 싶어 해요.',
    },

    conjugationRule: {
      ko: '동사 어간 + -고 싶어 하다 · 현재 → -고 싶어 해요 · 과거 → -고 싶어 했어요',
      uz: 'Fe’l negizi + -고 싶어 하다 · hozirgi → -고 싶어 해요 · o‘tgan → -고 싶어 했어요',
      en: 'Verb stem + -고 싶어 하다 · present → -고 싶어 해요 · past → -고 싶어 했어요',
      ru: 'Основа глагола + -고 싶어 하다 · настоящее → -고 싶어 해요 · прошедшее → -고 싶어 했어요',
    },

    conjugations: [
      { base: '가다', result: '가고 싶어 해요' },
      { base: '오다', result: '오고 싶어 해요' },
      { base: '먹다', result: '먹고 싶어 해요' },
      { base: '보다', result: '보고 싶어 해요' },
      { base: '만나다', result: '만나고 싶어 해요' },
      { base: '여행하다', result: '여행하고 싶어 해요' },
      { base: '공부하다', result: '공부하고 싶어 해요' },
      { base: '사다', result: '사고 싶어 해요' },
      { base: '배우다', result: '배우고 싶어 해요' },
      { base: '쉬다', result: '쉬고 싶어 해요' },
    ],

    examples: [
      {
        ko: '민수 씨는 제주도에 가고 싶어 해요.',
        highlight: '가고 싶어 해요',
        gloss: {
          ko: '민수 씨는 제주도에 가고 싶어 해요.',
          uz: 'Minsu Jejuga borishni xohlaydi.',
          en: 'Minsu wants to go to Jeju.',
          ru: 'Минсу хочет поехать на Чеджу.',
        },
      },
      {
        ko: '제 동생은 한국에서 여행하고 싶어 해요.',
        highlight: '여행하고 싶어 해요',
        gloss: {
          ko: '제 동생은 한국에서 여행하고 싶어 해요.',
          uz: 'Ukam Koreyada sayohat qilishni xohlaydi.',
          en: 'My younger sibling wants to travel in Korea.',
          ru: 'Мой младший брат или сестра хочет путешествовать по Корее.',
        },
      },
      {
        ko: '수진 씨는 한복을 입고 싶어 해요.',
        highlight: '입고 싶어 해요',
        gloss: {
          ko: '수진 씨는 한복을 입고 싶어 해요.',
          uz: 'Sujin hanbok kiyishni xohlaydi.',
          en: 'Sujin wants to wear hanbok.',
          ru: 'Суджин хочет надеть ханбок.',
        },
      },
      {
        ko: '아이들이 놀이공원에 가고 싶어 해요.',
        highlight: '가고 싶어 해요',
        gloss: {
          ko: '아이들이 놀이공원에 가고 싶어 해요.',
          uz: 'Bolalar attraksionlar bog‘iga borishni xohlaydi.',
          en: 'The children want to go to an amusement park.',
          ru: 'Дети хотят пойти в парк развлечений.',
        },
      },
      {
        ko: '친구가 한국 음식을 먹고 싶어 해요.',
        highlight: '먹고 싶어 해요',
        gloss: {
          ko: '친구가 한국 음식을 먹고 싶어 해요.',
          uz: 'Do‘stim koreys taomini yemoqchi.',
          en: 'My friend wants to eat Korean food.',
          ru: 'Мой друг хочет поесть корейской еды.',
        },
      },
      {
        ko: '제 친구는 서울에서 살고 싶어 해요.',
        highlight: '살고 싶어 해요',
        gloss: {
          ko: '제 친구는 서울에서 살고 싶어 해요.',
          uz: 'Do‘stim Seulda yashashni xohlaydi.',
          en: 'My friend wants to live in Seoul.',
          ru: 'Мой друг хочет жить в Сеуле.',
        },
      },
      {
        ko: '마리아 씨는 한국어를 더 배우고 싶어 해요.',
        highlight: '배우고 싶어 해요',
        gloss: {
          ko: '마리아 씨는 한국어를 더 배우고 싶어 해요.',
          uz: 'Mariya koreys tilini ko‘proq o‘rganishni xohlaydi.',
          en: 'Maria wants to learn more Korean.',
          ru: 'Мария хочет больше изучать корейский язык.',
        },
      },
      {
        ko: '동생은 새 카메라를 사고 싶어 해요.',
        highlight: '사고 싶어 해요',
        gloss: {
          ko: '동생은 새 카메라를 사고 싶어 해요.',
          uz: 'Ukam yangi kamera sotib olmoqchi.',
          en: 'My younger sibling wants to buy a new camera.',
          ru: 'Мой младший брат или сестра хочет купить новую камеру.',
        },
      },
      {
        ko: '어제 민수 씨가 집에서 쉬고 싶어 했어요.',
        highlight: '쉬고 싶어 했어요',
        gloss: {
          ko: '어제 민수 씨가 집에서 쉬고 싶어 했어요.',
          uz: 'Kecha Minsu uyda dam olishni xohlagan edi.',
          en: 'Yesterday, Minsu wanted to rest at home.',
          ru: 'Вчера Минсу хотел отдохнуть дома.',
        },
      },
      {
        ko: '부모님은 저하고 같이 여행하고 싶어 하세요.',
        highlight: '여행하고 싶어 하세요',
        gloss: {
          ko: '부모님은 저하고 같이 여행하고 싶어 하세요.',
          uz: 'Ota-onam men bilan birga sayohat qilishni xohlashadi.',
          en: 'My parents want to travel with me.',
          ru: 'Мои родители хотят путешествовать вместе со мной.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '민수 씨는 방학에 뭐 하고 싶어 해요?',
        highlight: '하고 싶어 해요',
        gloss: {
          ko: '민수 씨는 방학에 뭐 하고 싶어 해요?',
          uz: 'Minsu ta’tilda nima qilishni xohlaydi?',
          en: 'What does Minsu want to do during vacation?',
          ru: 'Что Минсу хочет делать на каникулах?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '친구하고 제주도에 가고 싶어 해요.',
        highlight: '가고 싶어 해요',
        gloss: {
          ko: '친구하고 제주도에 가고 싶어 해요.',
          uz: 'U do‘sti bilan Jejuga borishni xohlaydi.',
          en: 'He wants to go to Jeju with a friend.',
          ru: 'Он хочет поехать на Чеджу с другом.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '수진 씨도 같이 가고 싶어 해요?',
        highlight: '가고 싶어 해요',
        gloss: {
          ko: '수진 씨도 같이 가고 싶어 해요?',
          uz: 'Sujin ham birga borishni xohlaydimi?',
          en: 'Does Sujin want to go too?',
          ru: 'Суджин тоже хочет поехать?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아니요. 수진 씨는 부산에 가고 싶어 해요.',
        highlight: '가고 싶어 해요',
        gloss: {
          ko: '아니요. 수진 씨는 부산에 가고 싶어 해요.',
          uz: 'Yo‘q. Sujin Pusanga borishni xohlaydi.',
          en: 'No. Sujin wants to go to Busan.',
          ru: 'Нет. Суджин хочет поехать в Пусан.',
        },
      },
    ],

    similar: {
      pattern: 'V-고 싶다',
      note: {
        ko: '"-고 싶다"는 주로 자기 자신의 희망을 말하거나 상대에게 직접 희망을 물을 때 사용하고, "-고 싶어 하다"는 다른 사람의 희망을 설명할 때 사용해요. "저는 여행하고 싶어요", "민수 씨는 여행하고 싶어 해요"처럼 구별하면 쉬워요.',
        uz: '-고 싶다 asosan o‘z istagi yoki suhbatdoshning istagini so‘rash uchun, -고 싶어 하다 esa uchinchi shaxs haqida.',
        en: 'Use -고 싶다 mainly for your own desire or when asking the listener, and -고 싶어 하다 when describing another person’s desire.',
        ru: '-고 싶다 используется для собственного желания или вопроса собеседнику, а -고 싶어 하다 — для желания третьего лица.',
      },
    },

    cautions: [
      {
        ko: '자기 자신을 주어로 해서 보통 "저는 가고 싶어 해요"라고 하지 않아요. 자기 희망은 "저는 가고 싶어요"가 자연스러워요.',
        uz: 'O‘zingiz haqida odatda 저는 가고 싶어 해요 deyilmaydi. 저는 가고 싶어요 tabiiy.',
        en: 'Normally do not say 저는 가고 싶어 해요 for your own desire. Say 저는 가고 싶어요.',
        ru: 'Для собственного желания обычно говорят 저는 가고 싶어요, а не 저는 가고 싶어 해요.',
      },
      {
        ko: '제3자의 희망을 단정적으로 "-고 싶어요"라고 쓰면 관점이 어색할 수 있어요. 초급에서는 "-고 싶어 해요"로 구별해 두는 것이 좋아요.',
        uz: 'Uchinchi shaxs bilan boshlang‘ich darajada -고 싶어 해요 ishlatgan ma’qul.',
        en: 'For beginner usage, distinguish third-person desire with -고 싶어 해요.',
        ru: 'На начальном уровне для желания третьего лица лучше использовать -고 싶어 해요.',
      },
      {
        ko: '과거에는 "싶어 했어요"라고 해요. "가고 싶어 했어요"처럼 사용해요.',
        uz: 'O‘tgan zamon: -고 싶어 했어요.',
        en: 'The past form is -고 싶어 했어요.',
        ru: 'Прошедшая форма — -고 싶어 했어요.',
      },
      {
        ko: '높여야 하는 사람이 주어이면 "부모님은 여행하고 싶어 하세요"처럼 "하다" 부분을 높일 수 있어요.',
        uz: 'Hurmatli shaxs uchun 하다 qismi honorifik tuslanishi mumkin: 싶어 하세요.',
        en: 'When the subject should be honored, 하다 can take honorific marking: 싶어 하세요.',
        ru: 'Если подлежащее требует уважения, 하다 принимает уважительную форму: 싶어 하세요.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '민수 씨의 희망을 말하는 가장 자연스러운 문장은?',
          uz: 'Minsuning istagini tabiiy ifodalagan gapni tanlang.',
          en: 'Choose the most natural sentence describing Minsu’s desire.',
          ru: 'Выберите наиболее естественное предложение о желании Минсу.',
        },
        options: [
          { text: '민수 씨는 한국에 가고 싶어 해요.', correct: true },
          { text: '민수 씨는 한국에 가고 저는 싶어요.', correct: false },
          { text: '민수 씨는 한국에 가서 싶어 해요.', correct: false },
        ],
      },
      {
        question: {
          ko: '자기 자신의 희망을 말할 때 가장 자연스러운 것은?',
          uz: 'O‘z istagingizni aytishda eng tabiiy shakl qaysi?',
          en: 'Choose the most natural way to express your own desire.',
          ru: 'Выберите наиболее естественную форму для собственного желания.',
        },
        options: [
          { text: '저는 여행하고 싶어요.', correct: true },
          { text: '저는 여행하고 싶어 해요.', correct: false },
          { text: '저는 여행하고 싶어 합니다만요.', correct: false },
        ],
      },
      {
        question: {
          ko: '"먹다"로 친구의 희망을 표현한 것은?',
          uz: '"먹다" bilan do‘stning istagini bildirgan shakl qaysi?',
          en: 'Choose the form expressing a friend’s desire to eat.',
          ru: 'Выберите форму, выражающую желание друга поесть.',
        },
        options: [
          { text: '친구가 먹고 싶어 해요.', correct: true },
          { text: '친구가 먹어서 싶어요.', correct: false },
          { text: '친구가 먹는 싶어 해요.', correct: false },
        ],
      },
      {
        question: {
          ko: '"가고 싶어 하다"의 과거형은?',
          uz: '"가고 싶어 하다"ning o‘tgan zamon shakli qaysi?',
          en: 'Choose the past form of 가고 싶어 하다.',
          ru: 'Выберите прошедшую форму 가고 싶어 하다.',
        },
        options: [
          { text: '가고 싶어 했어요', correct: true },
          { text: '가고 싶었어 해요', correct: false },
          { text: '가서 싶어 했어요', correct: false },
        ],
      },
      {
        question: {
          ko: '알맞은 짝을 고르세요.',
          uz: 'To‘g‘ri juftlikni tanlang.',
          en: 'Choose the correct pairing.',
          ru: 'Выберите правильную пару.',
        },
        options: [
          { text: '저 → 가고 싶어요 / 민수 → 가고 싶어 해요', correct: true },
          { text: '저 → 가고 싶어 해요 / 민수 → 가고 싶어요', correct: false },
          { text: '저 → 가면 / 민수 → 가 주세요', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-25. 가능·능력 V-(으)ㄹ 수 있다[없다] ─────────
  {
    code: 'ability-eul-su-itda',
    pattern: 'V-(으)ㄹ 수 있다[없다]',
    section: 2,
    unit: 7,
    order: 25,
    isActive: true,

    summary: {
      ko: '어떤 행동을 할 능력이나 가능성이 있는지 없는지를 표현해요. "할 수 있어요"는 가능, "할 수 없어요"는 불가능을 나타내요.',
      uz: 'Biror ishni bajarish imkoniyati yoki qobiliyati bor-yo‘qligini bildiradi. "할 수 있어요" — qila olaman, "할 수 없어요" — qila olmayman.',
      en: 'Expresses whether an action is possible or whether someone has the ability to do it. 할 수 있어요 means "can", while 할 수 없어요 means "cannot".',
      ru: 'Выражает возможность или способность выполнить действие. 할 수 있어요 означает «могу», а 할 수 없어요 — «не могу».',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '가능', uz: 'Imkoniyat', en: 'Possibility', ru: 'Возможность' },
      { ko: '능력', uz: 'Qobiliyat', en: 'Ability', ru: 'Способность' },
    ],

    explanation: {
      ko: '"V-(으)ㄹ 수 있다"는 어떤 행동을 할 능력이 있거나 상황상 그 행동이 가능하다는 뜻이에요. 반대로 "-(으)ㄹ 수 없다"는 능력이나 상황 때문에 그 행동이 불가능하다는 뜻이에요. 동사 어간이 모음이나 ㄹ 받침으로 끝나면 "-ㄹ 수 있다", ㄹ을 제외한 다른 받침으로 끝나면 "-을 수 있다"를 붙여요. "가다 → 갈 수 있어요", "먹다 → 먹을 수 있어요", "살다 → 살 수 있어요"처럼 활용해요. 사람의 능력뿐 아니라 교통, 시간, 규칙처럼 상황이 허락하는 가능성도 표현할 수 있어요. "오늘 우리 집에 올 수 있어요?"는 상대방에게 오늘 방문할 시간이나 상황이 되는지 묻는 표현이에요.',
      uz: '"V-(으)ㄹ 수 있다" biror ishni qilish qobiliyati yoki imkoniyati borligini bildiradi. "-(으)ㄹ 수 없다" esa bu ish mumkin emasligini bildiradi. Fe’l negizi unli yoki ㄹ bilan tugasa -ㄹ 수 있다, boshqa undosh bilan tugasa -을 수 있다 qo‘shiladi. Masalan: 가다 → 갈 수 있어요, 먹다 → 먹을 수 있어요, 살다 → 살 수 있어요. Bu shakl nafaqat qobiliyat, balki vaziyat imkon berishini ham bildiradi.',
      en: 'V-(으)ㄹ 수 있다 expresses ability or possibility, while -(으)ㄹ 수 없다 expresses inability or impossibility. After a vowel or ㄹ, use -ㄹ 수 있다; after another consonant, use -을 수 있다. For example: 가다 → 갈 수 있어요, 먹다 → 먹을 수 있어요, 살다 → 살 수 있어요. It can describe personal ability as well as whether circumstances make something possible.',
      ru: 'V-(으)ㄹ 수 있다 выражает способность или возможность, а -(으)ㄹ 수 없다 — невозможность. После гласной или ㄹ используется -ㄹ 수 있다, после других согласных — -을 수 있다. Например: 가다 → 갈 수 있어요, 먹다 → 먹을 수 있어요, 살다 → 살 수 있어요. Конструкция описывает как способность человека, так и возможность в конкретной ситуации.',
    },

    conjugationRule: {
      ko: '모음/ㄹ 받침 → -ㄹ 수 있다[없다] · 그 외 받침 → -을 수 있다[없다] · 일부 불규칙 활용 주의',
      uz: 'Unli/ㄹ → -ㄹ 수 있다[없다] · boshqa undosh → -을 수 있다[없다] · notekis fe’llarga e’tibor',
      en: 'Vowel/ㄹ ending → -ㄹ 수 있다[없다] · other consonant → -을 수 있다[없다] · watch irregular verbs',
      ru: 'Гласная/ㄹ → -ㄹ 수 있다[없다] · другая согласная → -을 수 있다[없다] · учитывать неправильные глаголы',
    },

    conjugations: [
      { base: '가다', result: '갈 수 있어요' },
      { base: '오다', result: '올 수 있어요' },
      { base: '보다', result: '볼 수 있어요' },
      { base: '하다', result: '할 수 있어요' },
      { base: '살다', result: '살 수 있어요' },
      { base: '먹다', result: '먹을 수 있어요' },
      { base: '읽다', result: '읽을 수 있어요' },
      { base: '듣다', result: '들을 수 있어요' },
      { base: '걷다', result: '걸을 수 있어요' },
      { base: '만들다', result: '만들 수 있어요' },
    ],

    examples: [
      {
        ko: '오늘 우리 집에 올 수 있어요?',
        highlight: '올 수 있어요',
        gloss: {
          ko: '오늘 우리 집에 올 수 있어요?',
          uz: 'Bugun bizning uyga kela olasizmi?',
          en: 'Can you come to my house today?',
          ru: 'Вы можете сегодня прийти ко мне домой?',
        },
      },
      {
        ko: '네, 저녁 일곱 시에 갈 수 있어요.',
        highlight: '갈 수 있어요',
        gloss: {
          ko: '네, 저녁 일곱 시에 갈 수 있어요.',
          uz: 'Ha, kechki soat yettida bora olaman.',
          en: 'Yes, I can come at seven this evening.',
          ru: 'Да, я могу прийти в семь вечера.',
        },
      },
      {
        ko: '오늘은 일이 있어서 갈 수 없어요.',
        highlight: '갈 수 없어요',
        gloss: {
          ko: '오늘은 일이 있어서 갈 수 없어요.',
          uz: 'Bugun ishim borligi uchun bora olmayman.',
          en: 'I cannot go today because I have work.',
          ru: 'Сегодня я не могу пойти, потому что работаю.',
        },
      },
      {
        ko: '저는 한국어를 조금 말할 수 있어요.',
        highlight: '말할 수 있어요',
        gloss: {
          ko: '저는 한국어를 조금 말할 수 있어요.',
          uz: 'Men koreys tilida biroz gapira olaman.',
          en: 'I can speak a little Korean.',
          ru: 'Я немного умею говорить по-корейски.',
        },
      },
      {
        ko: '이 음식을 먹을 수 있어요?',
        highlight: '먹을 수 있어요',
        gloss: {
          ko: '이 음식을 먹을 수 있어요?',
          uz: 'Bu taomni yeya olasizmi?',
          en: 'Can you eat this food?',
          ru: 'Вы можете есть это блюдо?',
        },
      },
      {
        ko: '여기에서 카드로 계산할 수 있어요.',
        highlight: '계산할 수 있어요',
        gloss: {
          ko: '여기에서 카드로 계산할 수 있어요.',
          uz: 'Bu yerda karta bilan to‘lash mumkin.',
          en: 'You can pay by card here.',
          ru: 'Здесь можно расплатиться картой.',
        },
      },
      {
        ko: '이 버스를 타면 서울역에 갈 수 있어요.',
        highlight: '갈 수 있어요',
        gloss: {
          ko: '이 버스를 타면 서울역에 갈 수 있어요.',
          uz: 'Bu avtobusga chiqsangiz, Seul vokzaliga bora olasiz.',
          en: 'You can get to Seoul Station by taking this bus.',
          ru: 'На этом автобусе можно доехать до вокзала Сеул.',
        },
      },
      {
        ko: '저는 매운 음식을 잘 먹을 수 없어요.',
        highlight: '먹을 수 없어요',
        gloss: {
          ko: '저는 매운 음식을 잘 먹을 수 없어요.',
          uz: 'Men achchiq ovqatni yaxshi yeya olmayman.',
          en: 'I cannot eat spicy food very well.',
          ru: 'Я не очень хорошо могу есть острую пищу.',
        },
      },
      {
        ko: '여기에서는 사진을 찍을 수 없어요.',
        highlight: '찍을 수 없어요',
        gloss: {
          ko: '여기에서는 사진을 찍을 수 없어요.',
          uz: 'Bu yerda suratga olish mumkin emas.',
          en: 'You cannot take pictures here.',
          ru: 'Здесь нельзя фотографировать.',
        },
      },
      {
        ko: '주말에는 늦게까지 같이 있을 수 있어요.',
        highlight: '있을 수 있어요',
        gloss: {
          ko: '주말에는 늦게까지 같이 있을 수 있어요.',
          uz: 'Dam olish kuni kechgacha birga bo‘la olaman.',
          en: 'I can stay together until late on the weekend.',
          ru: 'На выходных я могу остаться допоздна.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '토요일에 우리 집에 올 수 있어요?',
        highlight: '올 수 있어요',
        gloss: {
          ko: '토요일에 우리 집에 올 수 있어요?',
          uz: 'Shanba kuni bizning uyga kela olasizmi?',
          en: 'Can you come to my house on Saturday?',
          ru: 'Вы сможете прийти ко мне домой в субботу?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 오후 세 시부터 갈 수 있어요.',
        highlight: '갈 수 있어요',
        gloss: {
          ko: '네, 오후 세 시부터 갈 수 있어요.',
          uz: 'Ha, kunduzgi soat uchdan keyin bora olaman.',
          en: 'Yes, I can come from three in the afternoon.',
          ru: 'Да, я смогу прийти после трёх.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '수진 씨도 올 수 있어요?',
        highlight: '올 수 있어요',
        gloss: {
          ko: '수진 씨도 올 수 있어요?',
          uz: 'Sujin ham kela oladimi?',
          en: 'Can Sujin come too?',
          ru: 'Суджин тоже сможет прийти?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '아니요. 수진 씨는 이번 주에는 올 수 없어요.',
        highlight: '올 수 없어요',
        gloss: {
          ko: '아니요. 수진 씨는 이번 주에는 올 수 없어요.',
          uz: 'Yo‘q. Sujin bu hafta kela olmaydi.',
          en: 'No. Sujin cannot come this week.',
          ru: 'Нет. Суджин на этой неделе не сможет прийти.',
        },
      },
    ],

    similar: {
      pattern: '못 V',
      note: {
        ko: '"못 가요"와 "갈 수 없어요"는 모두 갈 수 없다는 뜻으로 사용할 수 있어요. "못"은 일상 회화에서 아주 자주 쓰는 짧은 표현이고, "-(으)ㄹ 수 없다"는 능력이나 상황상 불가능하다는 점을 좀 더 명확하게 보여 줘요.',
        uz: '"못 가요" va "갈 수 없어요" ikkalasi ham bora olmaslikni bildiradi. 못 kundalik nutqda qisqaroq, -(으)ㄹ 수 없다 esa imkoniyat yo‘qligini aniqroq ko‘rsatadi.',
        en: '못 가요 and 갈 수 없어요 can both mean "cannot go". 못 is very common and concise in conversation, while -(으)ㄹ 수 없다 makes the lack of ability or possibility more explicit.',
        ru: '못 가요 и 갈 수 없어요 оба могут означать «не могу пойти». 못 короче и разговорнее, а -(으)ㄹ 수 없다 яснее подчёркивает невозможность.',
      },
    },

    cautions: [
      {
        ko: 'ㄹ 받침 동사에는 ㄹ을 하나 더 붙이지 않아요. "살ㄹ 수 있어요"가 아니라 "살 수 있어요"예요.',
        uz: 'ㄹ bilan tugagan fe’lga yana ㄹ qo‘shilmaydi: 살 수 있어요.',
        en: 'Do not add another ㄹ after an existing ㄹ: 살 수 있어요.',
        ru: 'После основы на ㄹ дополнительный ㄹ не добавляется: 살 수 있어요.',
      },
      {
        ko: '"먹다"처럼 다른 받침으로 끝나면 "-을 수"를 사용해서 "먹을 수 있어요"라고 해요.',
        uz: 'Boshqa undosh bilan tugasa -을 수 ishlatiladi: 먹을 수 있어요.',
        en: 'After another consonant, use -을 수: 먹을 수 있어요.',
        ru: 'После другой согласной используется -을 수: 먹을 수 있어요.',
      },
      {
        ko: '"듣다"는 ㄷ 불규칙이라 "듣을 수 있어요"가 아니라 "들을 수 있어요"예요.',
        uz: '듣다 ㄷ-notekis: 듣을 수 있어요 emas, 들을 수 있어요.',
        en: '듣다 is irregular: 들을 수 있어요, not 듣을 수 있어요.',
        ru: '듣다 — неправильный глагол: 들을 수 있어요, а не 듣을 수 있어요.',
      },
      {
        ko: '"할 수 없어요"는 단순히 하기 싫다는 뜻이 아니에요. 능력이나 상황상 불가능하다는 뜻이에요.',
        uz: '할 수 없어요 "qilishni xohlamayman" emas, "qila olmayman" degani.',
        en: '할 수 없어요 means "cannot do", not simply "do not want to do".',
        ru: '할 수 없어요 означает «не могу», а не «не хочу».',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"가다"의 가능 표현은?',
          uz: '"가다"ning imkoniyat shakli qaysi?',
          en: 'Choose the ability form of 가다.',
          ru: 'Выберите форму возможности для 가다.',
        },
        options: [
          { text: '갈 수 있어요', correct: true },
          { text: '가을 수 있어요', correct: false },
          { text: '가 수 있어요', correct: false },
        ],
      },
      {
        question: {
          ko: '"먹다"의 알맞은 형태는?',
          uz: '"먹다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 먹다.',
          ru: 'Выберите правильную форму 먹다.',
        },
        options: [
          { text: '먹을 수 있어요', correct: true },
          { text: '먹ㄹ 수 있어요', correct: false },
          { text: '먹 수 있어요', correct: false },
        ],
      },
      {
        question: {
          ko: '"듣다"의 알맞은 형태는?',
          uz: '"듣다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 듣다.',
          ru: 'Выберите правильную форму 듣다.',
        },
        options: [
          { text: '들을 수 있어요', correct: true },
          { text: '듣을 수 있어요', correct: false },
          { text: '듣ㄹ 수 있어요', correct: false },
        ],
      },
      {
        question: {
          ko: '"오늘 갈 수 없어요."의 뜻은?',
          uz: '"오늘 갈 수 없어요." nimani anglatadi?',
          en: 'What does 오늘 갈 수 없어요 mean?',
          ru: 'Что означает 오늘 갈 수 없어요?',
        },
        options: [
          { text: '오늘은 가는 것이 불가능해요.', correct: true },
          { text: '오늘 꼭 가고 싶어요.', correct: false },
          { text: '오늘 이미 갔어요.', correct: false },
        ],
      },
      {
        question: {
          ko: '초대할 때 가능 여부를 묻는 가장 자연스러운 표현은?',
          uz: 'Taklif qilayotganda imkoniyatni so‘rash uchun tabiiy gap qaysi?',
          en: 'Choose the natural way to ask whether someone can come.',
          ru: 'Как естественнее спросить, сможет ли человек прийти?',
        },
        options: [
          { text: '토요일에 우리 집에 올 수 있어요?', correct: true },
          { text: '토요일에 우리 집을 먹을 수 있어요?', correct: false },
          { text: '토요일에 우리 집에 오고 싶어 했어요?', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-26. 약속·의지 V-(으)ㄹ게요 ─────────
  {
    code: 'promise-eulgeyo',
    pattern: 'V-(으)ㄹ게요',
    section: 2,
    unit: 7,
    order: 26,
    isActive: true,

    summary: {
      ko: '말하는 사람이 지금 결정한 행동이나 상대방에게 하는 약속·의지를 표현해요. 특히 도움을 약속하거나 상대의 말에 반응해서 결정할 때 많이 사용해요.',
      uz: 'Gapiruvchining hozirgi qarori, va’dasi yoki niyatini bildiradi. Ayniqsa yordam berishni va’da qilishda yoki suhbatdoshga javoban qaror qilganda ko‘p ishlatiladi.',
      en: 'Expresses the speaker’s decision, willingness, or promise, often made in response to the listener or the current situation.',
      ru: 'Выражает решение, готовность или обещание говорящего, часто как реакцию на собеседника или ситуацию.',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '약속', uz: 'Va’da', en: 'Promise', ru: 'Обещание' },
      { ko: '의지', uz: 'Niyat', en: 'Willingness', ru: 'Намерение' },
    ],

    explanation: {
      ko: '"V-(으)ㄹ게요"는 말하는 사람이 앞으로 어떤 행동을 하겠다고 결정하거나 상대방에게 약속할 때 사용해요. 특히 상대방의 부탁, 질문, 상황을 듣고 그 자리에서 "제가 할게요", "제가 도와줄게요"처럼 반응할 때 아주 자연스러워요. 어간이 모음이나 ㄹ 받침으로 끝나면 "-ㄹ게요", ㄹ을 제외한 다른 받침으로 끝나면 "-을게요"를 붙여요. "가다 → 갈게요", "먹다 → 먹을게요", "살다 → 살게요"처럼 활용해요. 보통 말하는 사람의 의지를 나타내기 때문에 제3자의 행동을 객관적으로 예측하는 표현으로는 사용하지 않아요. 단순 미래 "-(으)ㄹ 거예요"보다 상대방과의 관계나 약속의 느낌이 더 강해요.',
      uz: '"V-(으)ㄹ게요" gapiruvchining kelajakdagi harakati haqida qaror, tayyorlik yoki va’dani bildiradi. Ayniqsa suhbatdoshning iltimosiga javoban "제가 할게요", "제가 도와줄게요" deyish tabiiy. Negiz unli yoki ㄹ bilan tugasa -ㄹ게요, boshqa undosh bilan tugasa -을게요 qo‘shiladi.',
      en: 'V-(으)ㄹ게요 expresses the speaker’s decision, willingness, or promise about a future action. It is especially natural as a response to the listener, such as 제가 할게요 or 제가 도와줄게요. Use -ㄹ게요 after a vowel or ㄹ, and -을게요 after other consonants. Because it expresses the speaker’s volition, it is generally not used simply to predict a third person’s future action.',
      ru: 'V-(으)ㄹ게요 выражает решение, готовность или обещание говорящего. Особенно естественно используется как ответ собеседнику: 제가 할게요, 제가 도와줄게요. После гласной или ㄹ используется -ㄹ게요, после других согласных — -을게요. Обычно эта форма относится к действиям самого говорящего.',
    },

    conjugationRule: {
      ko: '모음/ㄹ 받침 → -ㄹ게요 · 그 외 받침 → -을게요 · 주로 말하는 사람의 의지·약속',
      uz: 'Unli/ㄹ → -ㄹ게요 · boshqa undosh → -을게요 · asosan gapiruvchining va’dasi yoki qarori',
      en: 'Vowel/ㄹ ending → -ㄹ게요 · other consonant → -을게요 · mainly speaker’s decision/promise',
      ru: 'Гласная/ㄹ → -ㄹ게요 · другая согласная → -을게요 · главным образом решение/обещание говорящего',
    },

    conjugations: [
      { base: '가다', result: '갈게요' },
      { base: '오다', result: '올게요' },
      { base: '보다', result: '볼게요' },
      { base: '하다', result: '할게요' },
      { base: '도와주다', result: '도와줄게요' },
      { base: '살다', result: '살게요' },
      { base: '먹다', result: '먹을게요' },
      { base: '읽다', result: '읽을게요' },
      { base: '듣다', result: '들을게요' },
      { base: '받다', result: '받을게요' },
    ],

    examples: [
      {
        ko: '제가 준비할게요.',
        highlight: '준비할게요',
        gloss: {
          ko: '제가 준비할게요.',
          uz: 'Men tayyorlayman.',
          en: 'I’ll prepare it.',
          ru: 'Я подготовлю.',
        },
      },
      {
        ko: '제가 도와줄게요.',
        highlight: '도와줄게요',
        gloss: {
          ko: '제가 도와줄게요.',
          uz: 'Men sizga yordam beraman.',
          en: 'I’ll help you.',
          ru: 'Я вам помогу.',
        },
      },
      {
        ko: '내일 일찍 갈게요.',
        highlight: '갈게요',
        gloss: {
          ko: '내일 일찍 갈게요.',
          uz: 'Ertaga erta boraman.',
          en: 'I’ll go early tomorrow.',
          ru: 'Завтра я приду пораньше.',
        },
      },
      {
        ko: '음료수는 제가 살게요.',
        highlight: '살게요',
        gloss: {
          ko: '음료수는 제가 살게요.',
          uz: 'Ichimliklarni men sotib olaman.',
          en: 'I’ll buy the drinks.',
          ru: 'Напитки куплю я.',
        },
      },
      {
        ko: '그럼 제가 친구한테 전화할게요.',
        highlight: '전화할게요',
        gloss: {
          ko: '그럼 제가 친구한테 전화할게요.',
          uz: 'Unda do‘stimga men qo‘ng‘iroq qilaman.',
          en: 'Then I’ll call my friend.',
          ru: 'Тогда я позвоню другу.',
        },
      },
      {
        ko: '접시는 제가 씻을게요.',
        highlight: '씻을게요',
        gloss: {
          ko: '접시는 제가 씻을게요.',
          uz: 'Idishlarni men yuvaman.',
          en: 'I’ll wash the dishes.',
          ru: 'Посуду помою я.',
        },
      },
      {
        ko: '조금 늦을 것 같아요. 도착하면 연락할게요.',
        highlight: '연락할게요',
        gloss: {
          ko: '조금 늦을 것 같아요. 도착하면 연락할게요.',
          uz: 'Biroz kechikadiganga o‘xshayman. Yetib borsam xabar beraman.',
          en: 'I think I’ll be a little late. I’ll contact you when I arrive.',
          ru: 'Кажется, я немного опоздаю. Свяжусь с вами, когда приеду.',
        },
      },
      {
        ko: '무거워요? 제가 들게요.',
        highlight: '들게요',
        gloss: {
          ko: '무거워요? 제가 들게요.',
          uz: 'Og‘irmi? Men ko‘taraman.',
          en: 'Is it heavy? I’ll carry it.',
          ru: 'Тяжело? Я понесу.',
        },
      },
      {
        ko: '괜찮아요. 제가 다시 만들게요.',
        highlight: '만들게요',
        gloss: {
          ko: '괜찮아요. 제가 다시 만들게요.',
          uz: 'Mayli. Men yana tayyorlayman.',
          en: 'It’s okay. I’ll make it again.',
          ru: 'Ничего. Я сделаю ещё раз.',
        },
      },
      {
        ko: '이번에는 제가 계산할게요.',
        highlight: '계산할게요',
        gloss: {
          ko: '이번에는 제가 계산할게요.',
          uz: 'Bu safar men to‘layman.',
          en: 'I’ll pay this time.',
          ru: 'В этот раз заплачу я.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '내일 손님이 많이 와요. 준비할 것이 많아요.',
        highlight: '준비할 것이 많아요',
        gloss: {
          ko: '내일 손님이 많이 와요. 준비할 것이 많아요.',
          uz: 'Ertaga ko‘p mehmon keladi. Tayyorlaydigan narsalar ko‘p.',
          en: 'A lot of guests are coming tomorrow. There is a lot to prepare.',
          ru: 'Завтра придёт много гостей. Нужно многое подготовить.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '걱정하지 마세요. 제가 도와줄게요.',
        highlight: '도와줄게요',
        gloss: {
          ko: '걱정하지 마세요. 제가 도와줄게요.',
          uz: 'Xavotir olmang. Men yordam beraman.',
          en: 'Don’t worry. I’ll help you.',
          ru: 'Не волнуйтесь. Я помогу.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '그럼 음료수를 좀 사 주세요.',
        highlight: '사 주세요',
        gloss: {
          ko: '그럼 음료수를 좀 사 주세요.',
          uz: 'Unda ichimliklar olib keling.',
          en: 'Then please buy some drinks.',
          ru: 'Тогда купите, пожалуйста, напитки.',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '네, 제가 살게요.',
        highlight: '살게요',
        gloss: {
          ko: '네, 제가 살게요.',
          uz: 'Ha, men sotib olaman.',
          en: 'Sure, I’ll buy them.',
          ru: 'Хорошо, я куплю.',
        },
      },
    ],

    similar: {
      pattern: 'V-(으)ㄹ 거예요',
      note: {
        ko: '"-(으)ㄹ 거예요"는 미래 계획이나 예상을 넓게 말할 수 있고, "-(으)ㄹ게요"는 상대방에게 약속하거나 지금 결정한 자신의 행동이라는 느낌이 강해요. "내일 갈 거예요"는 계획 설명이고, "그럼 내일 갈게요"는 상대의 말을 듣고 약속하거나 결정하는 느낌이에요.',
        uz: '-(으)ㄹ 거예요 umumiy kelajak rejasi, -(으)ㄹ게요 esa suhbatdoshga qaratilgan va’da yoki hozirgi qarorni kuchliroq bildiradi.',
        en: '-(으)ㄹ 거예요 broadly states a future plan or prediction, while -(으)ㄹ게요 strongly suggests a promise or decision made in relation to the listener.',
        ru: '-(으)ㄹ 거예요 широко выражает будущее, а -(으)ㄹ게요 чаще передаёт обещание или решение по отношению к собеседнику.',
      },
    },

    cautions: [
      {
        ko: '보통 자기 행동의 의지나 약속에 사용해요. 단순히 "민수 씨가 갈게요"처럼 제3자의 미래를 예측하는 데 사용하면 어색할 수 있어요.',
        uz: 'Odatda gapiruvchining o‘z harakati uchun ishlatiladi. Uchinchi shaxs kelajagini oddiy taxmin qilishda ishlatilmaydi.',
        en: 'It is normally used for the speaker’s own intended action, not simply to predict a third person’s future.',
        ru: 'Обычно форма относится к действию самого говорящего, а не к простому прогнозу о третьем лице.',
      },
      {
        ko: '"게요"를 높임 조사 "께"와 혼동해서 "-ㄹ께요"라고 쓰지 않아요. 표준 표기는 "-ㄹ게요"예요.',
        uz: 'To‘g‘ri yozilishi -ㄹ게요. "-ㄹ께요" emas.',
        en: 'The correct spelling is -ㄹ게요, not -ㄹ께요.',
        ru: 'Правильное написание — -ㄹ게요, а не -ㄹ께요.',
      },
      {
        ko: 'ㄹ 받침에는 ㄹ을 하나 더 붙이지 않아요. "살다 → 살게요"예요.',
        uz: 'ㄹ bilan tugagan fe’lga yangi ㄹ qo‘shilmaydi: 살게요.',
        en: 'Do not add another ㄹ to ㄹ-final stems: 살게요.',
        ru: 'После основы на ㄹ дополнительный ㄹ не добавляется: 살게요.',
      },
      {
        ko: '"듣다"는 ㄷ 불규칙이라 "듣을게요"가 아니라 "들을게요"라고 해요.',
        uz: '듣다 → 들을게요, "듣을게요" emas.',
        en: '듣다 becomes 들을게요, not 듣을게요.',
        ru: '듣다 превращается в 들을게요, а не 듣을게요.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"가다"의 알맞은 약속 표현은?',
          uz: '"가다"ning to‘g‘ri va’da shakli qaysi?',
          en: 'Choose the correct promise form of 가다.',
          ru: 'Выберите правильную форму обещания от 가다.',
        },
        options: [
          { text: '갈게요', correct: true },
          { text: '가을게요', correct: false },
          { text: '갈께요', correct: false },
        ],
      },
      {
        question: {
          ko: '"먹다"의 알맞은 형태는?',
          uz: '"먹다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 먹다.',
          ru: 'Выберите правильную форму 먹다.',
        },
        options: [
          { text: '먹을게요', correct: true },
          { text: '먹ㄹ게요', correct: false },
          { text: '먹게요', correct: false },
        ],
      },
      {
        question: {
          ko: '상대방에게 도움을 약속하는 가장 자연스러운 표현은?',
          uz: 'Suhbatdoshga yordamni va’da qiluvchi tabiiy gap qaysi?',
          en: 'Choose the most natural expression promising help.',
          ru: 'Выберите естественное обещание помочь.',
        },
        options: [
          { text: '제가 도와줄게요.', correct: true },
          { text: '제가 도와줬어요.', correct: false },
          { text: '제가 도와주지 마세요.', correct: false },
        ],
      },
      {
        question: {
          ko: '맞는 표기를 고르세요.',
          uz: 'To‘g‘ri yozilgan shaklni tanlang.',
          en: 'Choose the correct spelling.',
          ru: 'Выберите правильное написание.',
        },
        options: [
          { text: '할게요', correct: true },
          { text: '할께요', correct: false },
          { text: '하을게요', correct: false },
        ],
      },
      {
        question: {
          ko: '"-(으)ㄹ게요"가 가장 자연스러운 상황은?',
          uz: '"-(으)ㄹ게요" eng tabiiy bo‘lgan vaziyatni tanlang.',
          en: 'Choose the situation where -(으)ㄹ게요 is most natural.',
          ru: 'Выберите ситуацию, где -(으)ㄹ게요 наиболее естественно.',
        },
        options: [
          {
            text: '상대방의 부탁을 듣고 제가 하겠다고 약속할 때',
            correct: true,
          },
          { text: '어제 한 일을 설명할 때', correct: false },
          { text: '다른 사람의 성격을 설명할 때', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-27. 이동의 목적 V-(으)러 가다[오다] ─────────
  {
    code: 'purpose-eureo-gada',
    pattern: 'V-(으)러 가다[오다]',
    section: 2,
    unit: 7,
    order: 27,
    isActive: true,

    summary: {
      ko: '어떤 행동을 하기 위해 어디에 가거나 오는 것을 표현해요. "친구를 만나러 가요", "밥을 먹으러 와요"처럼 이동의 목적을 나타내요.',
      uz: 'Biror ishni qilish maqsadida qayergadir borish yoki kelishni bildiradi. Masalan, 친구를 만나러 가요.',
      en: 'Expresses the purpose of going or coming somewhere, as in 친구를 만나러 가요, "I’m going to meet a friend."',
      ru: 'Выражает цель движения куда-либо: 친구를 만나러 가요 — «иду встретиться с другом».',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      { ko: '목적', uz: 'Maqsad', en: 'Purpose', ru: 'Цель' },
      { ko: '이동', uz: 'Harakat', en: 'Movement', ru: 'Передвижение' },
    ],

    explanation: {
      ko: '"V-(으)러 가다/오다"는 이동하는 이유나 목적을 말할 때 사용해요. 앞의 동사가 목적이고, 뒤의 "가다/오다"가 실제 이동을 나타내요. "친구를 만나러 가요"는 친구를 만나는 것이 목적이고 그 목적을 위해 이동한다는 뜻이에요. 어간이 모음이나 ㄹ 받침으로 끝나면 "-러", ㄹ을 제외한 다른 받침으로 끝나면 "-으러"를 붙여요. 그래서 "보다 → 보러 가요", "놀다 → 놀러 가요", "먹다 → 먹으러 가요"가 돼요. "가다, 오다"뿐 아니라 이동 의미가 있는 다른 동사와 함께 쓰이는 경우도 있지만 초급에서는 "가다/오다"를 중심으로 익히면 돼요.',
      uz: '"V-(으)러 가다/오다" harakatning maqsadini bildiradi. Birinchi fe’l maqsadni, 가다/오다 esa haqiqiy harakatni ko‘rsatadi. Masalan, 친구를 만나러 가요 — do‘st bilan uchrashish uchun boraman. Negiz unli yoki ㄹ bilan tugasa -러, boshqa undosh bilan tugasa -으러 ishlatiladi.',
      en: 'V-(으)러 가다/오다 expresses the purpose of movement. The first verb states the purpose, while 가다 or 오다 expresses the actual movement. 친구를 만나러 가요 means that meeting the friend is the reason for going. Use -러 after a vowel or ㄹ and -으러 after other consonants.',
      ru: 'V-(으)러 가다/오다 выражает цель движения. Первый глагол обозначает цель, а 가다/오다 — само движение. 친구를 만나러 가요 означает «иду, чтобы встретиться с другом». После гласной или ㄹ используется -러, после других согласных — -으러.',
    },

    conjugationRule: {
      ko: '모음/ㄹ 받침 → -러 가다/오다 · 그 외 받침 → -으러 가다/오다 · 앞절과 이동 주체는 보통 같음',
      uz: 'Unli/ㄹ → -러 가다/오다 · boshqa undosh → -으러 가다/오다 · odatda harakat qiluvchi bir xil shaxs',
      en: 'Vowel/ㄹ ending → -러 가다/오다 · other consonant → -으러 가다/오다 · normally the same person performs both actions',
      ru: 'Гласная/ㄹ → -러 가다/오다 · другая согласная → -으러 가다/오다 · обычно субъект обоих действий один',
    },

    conjugations: [
      { base: '가다', result: '가러 가요' },
      { base: '보다', result: '보러 가요' },
      { base: '만나다', result: '만나러 가요' },
      { base: '사다', result: '사러 가요' },
      { base: '공부하다', result: '공부하러 가요' },
      { base: '놀다', result: '놀러 가요' },
      { base: '먹다', result: '먹으러 가요' },
      { base: '읽다', result: '읽으러 가요' },
      { base: '듣다', result: '들으러 가요' },
      { base: '찾다', result: '찾으러 가요' },
    ],

    examples: [
      {
        ko: '친구를 만나러 가요.',
        highlight: '만나러 가요',
        gloss: {
          ko: '친구를 만나러 가요.',
          uz: 'Do‘stim bilan uchrashish uchun boryapman.',
          en: 'I’m going to meet a friend.',
          ru: 'Я иду встретиться с другом.',
        },
      },
      {
        ko: '친구가 우리 집에 놀러 와요.',
        highlight: '놀러 와요',
        gloss: {
          ko: '친구가 우리 집에 놀러 와요.',
          uz: 'Do‘stim biznikiga mehmonga keladi.',
          en: 'My friend is coming over to hang out.',
          ru: 'Друг приходит ко мне в гости.',
        },
      },
      {
        ko: '점심을 먹으러 식당에 가요.',
        highlight: '먹으러',
        gloss: {
          ko: '점심을 먹으러 식당에 가요.',
          uz: 'Tushlik qilish uchun restoranga boraman.',
          en: 'I go to a restaurant to have lunch.',
          ru: 'Я иду в ресторан пообедать.',
        },
      },
      {
        ko: '생일 선물을 사러 백화점에 가요.',
        highlight: '사러',
        gloss: {
          ko: '생일 선물을 사러 백화점에 가요.',
          uz: 'Tug‘ilgan kun sovg‘asi olish uchun univermagga boraman.',
          en: 'I’m going to the department store to buy a birthday present.',
          ru: 'Я иду в универмаг купить подарок на день рождения.',
        },
      },
      {
        ko: '한국어를 공부하러 한국에 왔어요.',
        highlight: '공부하러',
        gloss: {
          ko: '한국어를 공부하러 한국에 왔어요.',
          uz: 'Koreys tilini o‘rganish uchun Koreyaga keldim.',
          en: 'I came to Korea to study Korean.',
          ru: 'Я приехал в Корею изучать корейский язык.',
        },
      },
      {
        ko: '영화를 보러 영화관에 갈 거예요.',
        highlight: '보러',
        gloss: {
          ko: '영화를 보러 영화관에 갈 거예요.',
          uz: 'Film ko‘rish uchun kinoteatrga boraman.',
          en: 'I’m going to the theater to watch a movie.',
          ru: 'Я пойду в кинотеатр посмотреть фильм.',
        },
      },
      {
        ko: '책을 읽으러 도서관에 갔어요.',
        highlight: '읽으러',
        gloss: {
          ko: '책을 읽으러 도서관에 갔어요.',
          uz: 'Kitob o‘qish uchun kutubxonaga bordim.',
          en: 'I went to the library to read a book.',
          ru: 'Я пошёл в библиотеку почитать книгу.',
        },
      },
      {
        ko: '친구가 저를 도와주러 왔어요.',
        highlight: '도와주러',
        gloss: {
          ko: '친구가 저를 도와주러 왔어요.',
          uz: 'Do‘stim menga yordam berish uchun keldi.',
          en: 'My friend came to help me.',
          ru: 'Друг пришёл помочь мне.',
        },
      },
      {
        ko: '주말에 산책하러 공원에 가요.',
        highlight: '산책하러',
        gloss: {
          ko: '주말에 산책하러 공원에 가요.',
          uz: 'Dam olish kuni sayr qilish uchun parkka boraman.',
          en: 'I go to the park for a walk on weekends.',
          ru: 'На выходных я хожу в парк гулять.',
        },
      },
      {
        ko: '잃어버린 가방을 찾으러 역에 갔어요.',
        highlight: '찾으러',
        gloss: {
          ko: '잃어버린 가방을 찾으러 역에 갔어요.',
          uz: 'Yo‘qotgan sumkamni izlash uchun bekatga bordim.',
          en: 'I went to the station to look for my lost bag.',
          ru: 'Я пошёл на станцию искать потерянную сумку.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '어디에 가요?',
        highlight: '어디에 가요',
        gloss: {
          ko: '어디에 가요?',
          uz: 'Qayerga ketyapsiz?',
          en: 'Where are you going?',
          ru: 'Куда вы идёте?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '친구 집에 놀러 가요.',
        highlight: '놀러 가요',
        gloss: {
          ko: '친구 집에 놀러 가요.',
          uz: 'Do‘stimnikiga mehmonga ketyapman.',
          en: 'I’m going to my friend’s house to hang out.',
          ru: 'Я иду в гости к другу.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '친구 집에서 뭐 할 거예요?',
        highlight: '뭐 할 거예요',
        gloss: {
          ko: '친구 집에서 뭐 할 거예요?',
          uz: 'Do‘stingiznikida nima qilasiz?',
          en: 'What are you going to do at your friend’s house?',
          ru: 'Что будете делать у друга?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '같이 저녁을 먹고 영화를 보려고 해요.',
        highlight: '보려고 해요',
        gloss: {
          ko: '같이 저녁을 먹고 영화를 보려고 해요.',
          uz: 'Birga kechki ovqat qilib, film ko‘rmoqchimiz.',
          en: 'We plan to have dinner and watch a movie together.',
          ru: 'Мы собираемся вместе поужинать и посмотреть фильм.',
        },
      },
    ],

    similar: {
      pattern: 'V-(으)려고 하다',
      note: {
        ko: '"-(으)러 가다/오다"는 실제 이동의 목적을 표현하고, "-(으)려고 하다"는 이동 여부와 관계없이 어떤 행동을 하려는 의도나 계획을 표현해요. "밥을 먹으러 식당에 가요"는 식당에 가는 목적이고, "밥을 먹으려고 해요"는 먹을 계획 자체를 말해요.',
        uz: '-(으)러 가다/오다 harakatlanish maqsadini, -(으)려고 하다 esa umumiy niyat yoki rejani bildiradi.',
        en: '-(으)러 가다/오다 expresses the purpose of physical movement, while -(으)려고 하다 expresses intention or a plan whether or not movement is involved.',
        ru: '-(으)러 가다/오다 выражает цель движения, а -(으)려고 하다 — общее намерение или план.',
      },
    },

    cautions: [
      {
        ko: '앞에는 보통 행동 동사가 와요. 형용사에 "-(으)러"를 붙여 목적을 표현하지 않아요.',
        uz: 'Oldidan odatda harakat fe’li keladi. Sifat bilan ishlatilmaydi.',
        en: 'The first predicate is normally an action verb, not an adjective.',
        ru: 'Перед -(으)러 обычно используется глагол действия, а не прилагательное.',
      },
      {
        ko: 'ㄹ 받침은 "-으러"가 아니라 "-러"를 사용해요. "놀으러"가 아니라 "놀러"예요.',
        uz: 'ㄹ dan keyin -러: 놀러, "놀으러" emas.',
        en: 'After ㄹ, use -러: 놀러, not 놀으러.',
        ru: 'После ㄹ используется -러: 놀러, а не 놀으러.',
      },
      {
        ko: '"먹다"처럼 다른 받침으로 끝나면 "-으러"를 사용해요. "먹러"가 아니라 "먹으러"예요.',
        uz: 'Boshqa undoshdan keyin -으러: 먹으러.',
        en: 'After another consonant, use -으러: 먹으러.',
        ru: 'После другой согласной используется -으러: 먹으러.',
      },
      {
        ko: '"듣다"는 ㄷ 불규칙으로 "듣으러"가 아니라 "들으러"가 돼요.',
        uz: '듣다 → 들으러.',
        en: '듣다 becomes 들으러.',
        ru: '듣다 превращается в 들으러.',
      },
      {
        ko: '초급에서는 앞 행동을 하는 사람과 가거나 오는 사람이 같은 경우를 중심으로 익히는 것이 좋아요.',
        uz: 'Boshlang‘ich darajada ikki harakatni ham bir odam bajaradigan gaplarni o‘rganish qulay.',
        en: 'At beginner level, focus on sentences where the same person performs the purpose action and the movement.',
        ru: 'На начальном уровне лучше сосредоточиться на случаях, где оба действия выполняет один человек.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"보다"의 알맞은 목적 표현은?',
          uz: '"보다"ning to‘g‘ri maqsad shakli qaysi?',
          en: 'Choose the correct purpose form of 보다.',
          ru: 'Выберите правильную форму цели для 보다.',
        },
        options: [
          { text: '보러 가요', correct: true },
          { text: '보으러 가요', correct: false },
          { text: '봐러 가요', correct: false },
        ],
      },
      {
        question: {
          ko: '"먹다"의 알맞은 형태는?',
          uz: '"먹다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 먹다.',
          ru: 'Выберите правильную форму 먹다.',
        },
        options: [
          { text: '먹으러 가요', correct: true },
          { text: '먹러 가요', correct: false },
          { text: '먹어러 가요', correct: false },
        ],
      },
      {
        question: {
          ko: '"놀다"의 알맞은 형태는?',
          uz: '"놀다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 놀다.',
          ru: 'Выберите правильную форму 놀다.',
        },
        options: [
          { text: '놀러 가요', correct: true },
          { text: '놀으러 가요', correct: false },
          { text: '노러 가요', correct: false },
        ],
      },
      {
        question: {
          ko: '"점심을 먹으러 식당에 가요."에서 식당에 가는 목적은?',
          uz: 'Bu gapda restoranga borish maqsadi nima?',
          en: 'What is the purpose of going to the restaurant in this sentence?',
          ru: 'Какова цель похода в ресторан?',
        },
        options: [
          { text: '점심을 먹는 것', correct: true },
          { text: '친구를 만나는 것', correct: false },
          { text: '책을 읽는 것', correct: false },
        ],
      },
      {
        question: {
          ko: '이동의 목적을 자연스럽게 표현한 문장은?',
          uz: 'Harakat maqsadini tabiiy ifodalagan gapni tanlang.',
          en: 'Choose the sentence that naturally expresses the purpose of movement.',
          ru: 'Выберите предложение, естественно выражающее цель движения.',
        },
        options: [
          { text: '친구를 만나러 카페에 가요.', correct: true },
          { text: '친구가 예쁘러 카페에 가요.', correct: false },
          { text: '친구를 만나면러 카페에 가요.', correct: false },
        ],
      },
    ],
  },
  // ───────── 섹션 2-28. 동시 행동 V-(으)면서 ─────────
  {
    code: 'simultaneous-eumyeonseo',
    pattern: 'V-(으)면서',
    section: 2,
    unit: 7,
    order: 28,
    isActive: true,

    summary: {
      ko: '한 사람이 두 가지 행동을 동시에 할 때 사용해요. "음악을 들으면서 공부해요"처럼 "~하면서 동시에 ~하다"라는 뜻을 나타내요.',
      uz: 'Bir odam ikki harakatni bir vaqtda bajarayotganini bildiradi. Masalan, 음악을 들으면서 공부해요.',
      en: 'Expresses two actions happening at the same time, as in 음악을 들으면서 공부해요, "I study while listening to music."',
      ru: 'Выражает два действия, происходящих одновременно: 음악을 들으면서 공부해요 — «я занимаюсь, слушая музыку».',
    },

    tags: [
      { ko: '초급', uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
      {
        ko: '동시 행동',
        uz: 'Bir vaqtdagi harakat',
        en: 'Simultaneous actions',
        ru: 'Одновременные действия',
      },
      { ko: '연결', uz: 'Bog‘lash', en: 'Connection', ru: 'Связь действий' },
    ],

    explanation: {
      ko: '"V-(으)면서"는 두 행동이 같은 시간에 진행된다는 뜻이에요. "커피를 마시면서 이야기해요"라고 하면 커피를 마시는 행동과 이야기하는 행동이 동시에 일어나요. 동사 어간이 모음이나 ㄹ 받침으로 끝나면 "-면서", ㄹ을 제외한 다른 받침으로 끝나면 "-으면서"를 붙여요. 그래서 "가다 → 가면서", "살다 → 살면서", "먹다 → 먹으면서"가 돼요. 이 단원에서는 한 사람이 두 행동을 동시에 하는 용법을 중심으로 익히면 돼요. 보통 더 중심이 되는 행동이 뒤에 와요. "음악을 들으면서 공부해요"에서는 공부가 중심 행동이고 음악을 듣는 것은 동시에 이루어지는 행동이에요.',
      uz: '"V-(으)면서" ikki harakat bir vaqtda sodir bo‘lishini bildiradi. "커피를 마시면서 이야기해요" — qahva ichib turib gaplashamiz. Negiz unli yoki ㄹ bilan tugasa -면서, boshqa undosh bilan tugasa -으면서 qo‘shiladi. Boshlang‘ich darajada odatda ikkala harakatni ham bitta odam bajaradi.',
      en: 'V-(으)면서 expresses two actions taking place at the same time. 커피를 마시면서 이야기해요 means "We talk while drinking coffee." Use -면서 after a vowel or ㄹ and -으면서 after other consonants. At this level, focus on cases in which the same person performs both actions. The action in the second clause is often the main activity.',
      ru: 'V-(으)면서 выражает два действия, происходящие одновременно. 커피를 마시면서 이야기해요 означает «разговариваем, попивая кофе». После гласной или ㄹ используется -면서, после других согласных — -으면서. На начальном уровне обычно оба действия выполняет один человек.',
    },

    conjugationRule: {
      ko: '모음/ㄹ 받침 → -면서 · 그 외 받침 → -으면서 · 초급에서는 두 행동의 주어가 보통 같음',
      uz: 'Unli/ㄹ → -면서 · boshqa undosh → -으면서 · boshlang‘ichda ikkala harakat egasi odatda bir xil',
      en: 'Vowel/ㄹ ending → -면서 · other consonant → -으면서 · at beginner level the subject is normally the same',
      ru: 'Гласная/ㄹ → -면서 · другая согласная → -으면서 · на начальном уровне субъект обычно один',
    },

    conjugations: [
      { base: '가다', result: '가면서' },
      { base: '오다', result: '오면서' },
      { base: '보다', result: '보면서' },
      { base: '하다', result: '하면서' },
      { base: '살다', result: '살면서' },
      { base: '놀다', result: '놀면서' },
      { base: '먹다', result: '먹으면서' },
      { base: '읽다', result: '읽으면서' },
      { base: '듣다', result: '들으면서' },
      { base: '걷다', result: '걸으면서' },
    ],

    examples: [
      {
        ko: '음악을 들으면서 공부해요.',
        highlight: '들으면서',
        gloss: {
          ko: '음악을 들으면서 공부해요.',
          uz: 'Musiqa tinglab turib o‘qiyman.',
          en: 'I study while listening to music.',
          ru: 'Я занимаюсь, слушая музыку.',
        },
      },
      {
        ko: '커피를 마시면서 이야기해요.',
        highlight: '마시면서',
        gloss: {
          ko: '커피를 마시면서 이야기해요.',
          uz: 'Qahva ichib turib suhbatlashamiz.',
          en: 'We talk while drinking coffee.',
          ru: 'Мы разговариваем за чашкой кофе.',
        },
      },
      {
        ko: '친구하고 걸으면서 이야기했어요.',
        highlight: '걸으면서',
        gloss: {
          ko: '친구하고 걸으면서 이야기했어요.',
          uz: 'Do‘stim bilan yurib, gaplashdik.',
          en: 'I talked with my friend while walking.',
          ru: 'Мы с другом разговаривали во время прогулки.',
        },
      },
      {
        ko: '텔레비전을 보면서 저녁을 먹어요.',
        highlight: '보면서',
        gloss: {
          ko: '텔레비전을 보면서 저녁을 먹어요.',
          uz: 'Televizor ko‘rib turib kechki ovqat yeyman.',
          en: 'I eat dinner while watching television.',
          ru: 'Я ужинаю, смотря телевизор.',
        },
      },
      {
        ko: '요리를 하면서 음악을 들어요.',
        highlight: '하면서',
        gloss: {
          ko: '요리를 하면서 음악을 들어요.',
          uz: 'Ovqat tayyorlab turib musiqa tinglayman.',
          en: 'I listen to music while cooking.',
          ru: 'Я слушаю музыку, пока готовлю.',
        },
      },
      {
        ko: '차를 마시면서 친구를 기다렸어요.',
        highlight: '마시면서',
        gloss: {
          ko: '차를 마시면서 친구를 기다렸어요.',
          uz: 'Choy ichib turib do‘stimni kutdim.',
          en: 'I waited for my friend while drinking tea.',
          ru: 'Я ждал друга, попивая чай.',
        },
      },
      {
        ko: '사진을 보면서 여행 이야기를 했어요.',
        highlight: '보면서',
        gloss: {
          ko: '사진을 보면서 여행 이야기를 했어요.',
          uz: 'Rasmlarni ko‘rib turib sayohat haqida gaplashdik.',
          en: 'We talked about the trip while looking at photos.',
          ru: 'Мы говорили о путешествии, рассматривая фотографии.',
        },
      },
      {
        ko: '청소하면서 손님을 기다릴게요.',
        highlight: '청소하면서',
        gloss: {
          ko: '청소하면서 손님을 기다릴게요.',
          uz: 'Mehmonlarni kutib turib uy yig‘ishtiraman.',
          en: 'I’ll clean while waiting for the guests.',
          ru: 'Я буду убираться, пока жду гостей.',
        },
      },
      {
        ko: '친구하고 이야기하면서 음식을 만들었어요.',
        highlight: '이야기하면서',
        gloss: {
          ko: '친구하고 이야기하면서 음식을 만들었어요.',
          uz: 'Do‘stim bilan gaplashib turib ovqat tayyorladim.',
          en: 'I cooked while talking with my friend.',
          ru: 'Я готовил, разговаривая с другом.',
        },
      },
      {
        ko: '한국에 살면서 한국어를 많이 배웠어요.',
        highlight: '살면서',
        gloss: {
          ko: '한국에 살면서 한국어를 많이 배웠어요.',
          uz: 'Koreyada yashab, koreys tilini ko‘p o‘rgandim.',
          en: 'I learned a lot of Korean while living in Korea.',
          ru: 'Живя в Корее, я многому научился в корейском языке.',
        },
      },
    ],

    dialogue: [
      {
        speaker: 'A',
        side: 'left',
        ko: '어제 친구 집에서 뭐 했어요?',
        highlight: '뭐 했어요',
        gloss: {
          ko: '어제 친구 집에서 뭐 했어요?',
          uz: 'Kecha do‘stingiznikida nima qildingiz?',
          en: 'What did you do at your friend’s house yesterday?',
          ru: 'Что вы делали вчера у друга?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '같이 음식을 만들면서 이야기했어요.',
        highlight: '만들면서',
        gloss: {
          ko: '같이 음식을 만들면서 이야기했어요.',
          uz: 'Birga ovqat tayyorlab, suhbatlashdik.',
          en: 'We talked while cooking together.',
          ru: 'Мы разговаривали, пока вместе готовили.',
        },
      },
      {
        speaker: 'A',
        side: 'left',
        ko: '저녁에는 뭐 했어요?',
        highlight: '뭐 했어요',
        gloss: {
          ko: '저녁에는 뭐 했어요?',
          uz: 'Kechqurun nima qildingiz?',
          en: 'What did you do in the evening?',
          ru: 'Что вы делали вечером?',
        },
      },
      {
        speaker: 'B',
        side: 'right',
        ko: '영화를 보면서 피자를 먹었어요.',
        highlight: '보면서',
        gloss: {
          ko: '영화를 보면서 피자를 먹었어요.',
          uz: 'Film ko‘rib turib pitsa yedik.',
          en: 'We ate pizza while watching a movie.',
          ru: 'Мы ели пиццу, смотря фильм.',
        },
      },
    ],

    similar: {
      pattern: 'V-고',
      note: {
        ko: '"-고"는 두 행동을 단순히 나열하거나 순서대로 말할 수 있지만, "-(으)면서"는 두 행동이 같은 시간에 일어난다는 점을 분명하게 나타내요. "밥을 먹고 공부해요"는 먹은 뒤 공부할 수 있지만, "밥을 먹으면서 공부해요"는 먹는 것과 공부하는 것이 동시에 일어나요.',
        uz: '-고 harakatlarni ketma-ket yoki oddiy bog‘laydi, -(으)면서 esa bir vaqtda sodir bo‘lishini aniq ko‘rsatadi.',
        en: '-고 can simply connect or sequence actions, while -(으)면서 explicitly shows that they occur at the same time.',
        ru: '-고 просто соединяет или перечисляет действия, а -(으)면서 ясно показывает их одновременность.',
      },
    },

    cautions: [
      {
        ko: 'ㄹ 받침 뒤에는 "-으면서"가 아니라 "-면서"를 사용해요. "살으면서"가 아니라 "살면서"예요.',
        uz: 'ㄹ dan keyin -면서: 살면서.',
        en: 'After ㄹ, use -면서: 살면서.',
        ru: 'После ㄹ используется -면서: 살면서.',
      },
      {
        ko: '"먹다"처럼 다른 받침으로 끝나면 "-으면서"를 사용해요. "먹면서"가 아니라 "먹으면서"예요.',
        uz: 'Boshqa undoshdan keyin -으면서: 먹으면서.',
        en: 'After another consonant, use -으면서: 먹으면서.',
        ru: 'После другой согласной используется -으면서: 먹으면서.',
      },
      {
        ko: '"듣다"는 ㄷ 불규칙이라 "듣으면서"가 아니라 "들으면서"라고 해요.',
        uz: '듣다 → 들으면서.',
        en: '듣다 becomes 들으면서.',
        ru: '듣다 превращается в 들으면서.',
      },
      {
        ko: '이 단계에서는 두 행동을 하는 사람이 같은 문장을 중심으로 사용하는 것이 자연스러워요.',
        uz: 'Bu bosqichda ikkala harakat egasi bir xil bo‘lgan gaplarga e’tibor qarating.',
        en: 'At this level, focus on sentences in which the same person performs both actions.',
        ru: 'На этом уровне лучше использовать предложения, где оба действия выполняет один человек.',
      },
      {
        ko: '"-고"와 달리 두 행동이 동시에 일어나지 않으면 "-(으)면서"를 사용하면 어색해질 수 있어요.',
        uz: 'Ikki harakat bir vaqtda bo‘lmasa, -(으)면서 ishlatish noqulay bo‘lishi mumkin.',
        en: 'Unlike -고, -(으)면서 may sound unnatural if the two actions do not overlap in time.',
        ru: 'В отличие от -고, -(으)면서 звучит неестественно, если действия не происходят одновременно.',
      },
    ],

    quiz: [
      {
        question: {
          ko: '"가다"의 알맞은 형태는?',
          uz: '"가다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 가다.',
          ru: 'Выберите правильную форму 가다.',
        },
        options: [
          { text: '가면서', correct: true },
          { text: '가으면서', correct: false },
          { text: '갈면서', correct: false },
        ],
      },
      {
        question: {
          ko: '"먹다"의 알맞은 형태는?',
          uz: '"먹다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 먹다.',
          ru: 'Выберите правильную форму 먹다.',
        },
        options: [
          { text: '먹으면서', correct: true },
          { text: '먹면서', correct: false },
          { text: '먹어면서', correct: false },
        ],
      },
      {
        question: {
          ko: '"살다"의 알맞은 형태는?',
          uz: '"살다"ning to‘g‘ri shakli qaysi?',
          en: 'Choose the correct form of 살다.',
          ru: 'Выберите правильную форму 살다.',
        },
        options: [
          { text: '살면서', correct: true },
          { text: '살으면서', correct: false },
          { text: '사면서', correct: false },
        ],
      },
      {
        question: {
          ko: '두 행동이 동시에 일어나는 문장은?',
          uz: 'Ikki harakat bir vaqtda sodir bo‘lgan gapni tanlang.',
          en: 'Choose the sentence showing two simultaneous actions.',
          ru: 'Выберите предложение с двумя одновременными действиями.',
        },
        options: [
          { text: '음악을 들으면서 공부해요.', correct: true },
          { text: '음악을 듣고 어제 공부했어요.', correct: false },
          { text: '음악을 들으러 공부해요.', correct: false },
        ],
      },
      {
        question: {
          ko: '"밥을 먹고 공부해요"와 "밥을 먹으면서 공부해요"의 차이로 맞는 것은?',
          uz: 'Ikki gapning farqini to‘g‘ri tushuntirgan javobni tanlang.',
          en: 'Choose the correct explanation of the difference.',
          ru: 'Выберите правильное объяснение различия.',
        },
        options: [
          {
            text: '"먹으면서"는 먹기와 공부가 동시에 일어난다는 뜻이에요.',
            correct: true,
          },
          { text: '두 문장은 반드시 완전히 같은 뜻이에요.', correct: false },
          { text: '"먹으면서"는 과거만 표현해요.', correct: false },
        ],
      },
    ],
  },
];
