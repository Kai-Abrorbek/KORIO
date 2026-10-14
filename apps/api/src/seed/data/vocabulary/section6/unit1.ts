// ─────────────────────────────────────────────────────────────
// Section 6 · Unit 1 · Node 1
// 첫 만남에서 연애 시작까지
// ─────────────────────────────────────────────────────────────

import { LessonCategory } from '../../../../lessons/schemas/lesson.schema';
import { QuestionLevel } from '../../../../lessons/schemas/question.schema';
import { WordPartOfSpeech } from '../../../../words/schemas/word.schema';
import type { WordSeedEntry } from '../../../word-seed.types';

type S5I18nText = {
  ko: string;
  uz: string;
  en: string;
  ru: string;
};

const L = (ko: string, uz: string, en: string, ru: string): S5I18nText => ({
  ko,
  uz,
  en,
  ru,
});

const TYPE_ANSWER_INSTRUCTION = L(
  '빈칸에 들어갈 알맞은 말을 직접 입력하세요.',
  'Bo‘sh joyga mos so‘zni yozing.',
  'Type the correct expression in the blank.',
  'Введите подходящее выражение в пропуск.',
);

const BLANK_INSTRUCTION = L(
  '빈칸에 들어갈 알맞은 말을 고르세요.',
  'Bo‘sh joyga mos so‘zni tanlang.',
  'Choose the correct expression for the blank.',
  'Выберите подходящее выражение для пропуска.',
);

const LISTEN_INSTRUCTION = L(
  '잘 듣고 알맞은 답을 고르세요.',
  'Diqqat bilan tinglab, to‘g‘ri javobni tanlang.',
  'Listen carefully and choose the correct answer.',
  'Внимательно послушайте и выберите правильный ответ.',
);

const ARRANGE_INSTRUCTION = L(
  '단어를 알맞은 순서로 배열하세요.',
  'So‘zlarni to‘g‘ri tartibda joylashtiring.',
  'Arrange the words in the correct order.',
  'Расположите слова в правильном порядке.',
);

const SPEAK_INSTRUCTION = L(
  '문장을 듣고 따라 말하세요.',
  'Gapni tinglab, takrorlang.',
  'Listen and repeat the sentence.',
  'Послушайте и повторите предложение.',
);

const ERROR_INSTRUCTION = L(
  '문장에서 잘못된 부분을 찾아 고치세요.',
  'Gapdagi noto‘g‘ri qismini topib tuzating.',
  'Find and correct the incorrect part of the sentence.',
  'Найдите и исправьте ошибочную часть предложения.',
);

const CLOZE_INSTRUCTION = L(
  '글의 빈칸에 알맞은 말을 넣으세요.',
  'Matndagi bo‘sh joylarga mos so‘zlarni qo‘ying.',
  'Fill in the blanks with the correct expressions.',
  'Заполните пропуски подходящими выражениями.',
);

export const S6_UNIT1_NODE1_WORDS = [
  {
    code: 'romance-blind-date',
    korean: '소개팅하다',
    senseKey: 'blind-date',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '소개를 받아 처음 만나는 이성과 만나다',
      uz: 'tanishuv uchrashuviga bormoq',
      en: 'to go on a blind date',
      ru: 'ходить на свидание по знакомству',
    },
    examples: [
      {
        korean: '친구의 소개로 주말에 소개팅을 했어요.',
        translations: {
          ko: '친구가 소개해 준 사람을 주말에 만났어요.',
          uz: 'Do‘stim tanishtirgan odam bilan dam olish kuni uchrashdim.',
          en: 'I went on a blind date arranged by a friend on the weekend.',
          ru: 'На выходных я сходил на свидание с человеком, которого представил друг.',
        },
      },
    ],
    pronunciation: {
      hangul: '소개팅하다',
      romanization: 'sogaetinghada',
      ttsText: '소개팅하다',
    },
    media: {
      emoji: '☕',
      imageUrl: '',
      imageAlt: {
        ko: '처음 만나는 두 사람',
        uz: 'birinchi marta uchrashayotgan ikki kishi',
        en: 'two people meeting for the first time',
        ru: 'двое людей на первой встрече',
      },
    },
    tags: ['romance', 'dating', 'first-meeting'],
    difficulty: 4,
    usageNote: {
      ko: '친구나 지인의 소개로 연애를 목적으로 처음 만나는 상황에서 써요.',
      uz: 'Do‘st yoki tanish orqali romantik maqsadda birinchi uchrashuv haqida ishlatiladi.',
      en: 'Used for a first romantic meeting arranged through a friend or acquaintance.',
      ru: 'Употребляется для первой романтической встречи, организованной знакомым.',
    },
    isCore: true,
  },
  {
    code: 'romance-love-at-first-sight',
    korean: '첫눈에 반하다',
    senseKey: 'love-at-first-sight',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '처음 보자마자 강한 호감을 느끼다',
      uz: 'bir ko‘rishda sevib qolmoq',
      en: 'to fall in love at first sight',
      ru: 'влюбиться с первого взгляда',
    },
    examples: [
      {
        korean: '민수 씨는 지연 씨를 보고 첫눈에 반했어요.',
        translations: {
          ko: '민수 씨는 지연 씨를 처음 보자마자 좋아하게 되었어요.',
          uz: 'Minsu Jiyonni ko‘rib, bir ko‘rishda sevib qoldi.',
          en: 'Minsu fell for Jiyeon at first sight.',
          ru: 'Минсу влюбился в Чиён с первого взгляда.',
        },
      },
    ],
    pronunciation: {
      hangul: '첫눈에 반하다',
      romanization: 'cheonnune banhada',
      ttsText: '첫눈에 반하다',
    },
    media: {
      emoji: '💘',
      imageUrl: '',
      imageAlt: {
        ko: '첫눈에 호감을 느끼는 사람',
        uz: 'bir ko‘rishda yoqtirib qolgan odam',
        en: 'a person attracted at first sight',
        ru: 'человек, влюбившийся с первого взгляда',
      },
    },
    tags: ['romance', 'attraction', 'first-meeting'],
    difficulty: 4,
    usageNote: {
      ko: '처음 본 순간 강하게 끌렸을 때 쓰는 표현이에요.',
      uz: 'Kimnidir birinchi ko‘rgan zahoti kuchli yoqtirib qolganingizda ishlatiladi.',
      en: 'Used when someone feels strongly attracted the moment they first see another person.',
      ru: 'Так говорят о сильной симпатии при первой же встрече.',
    },
    isCore: true,
  },
  {
    code: 'romance-date-steady',
    korean: '사귀다',
    senseKey: 'romantic-relationship',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '서로 좋아하며 연인 관계를 맺다',
      uz: 'uchrashib yurmoq; munosabatda bo‘lmoq',
      en: 'to date; to be in a relationship',
      ru: 'встречаться; состоять в отношениях',
    },
    examples: [
      {
        korean: '두 사람은 한 달 전부터 사귀기 시작했어요.',
        translations: {
          ko: '두 사람은 한 달 전부터 연인이 되었어요.',
          uz: 'Ular bir oy oldin uchrasha boshlashdi.',
          en: 'They started dating a month ago.',
          ru: 'Они начали встречаться месяц назад.',
        },
      },
    ],
    pronunciation: {
      hangul: '사귀다',
      romanization: 'sagwida',
      ttsText: '사귀다',
    },
    media: {
      emoji: '❤️',
      imageUrl: '',
      imageAlt: {
        ko: '연인인 두 사람',
        uz: 'sevishgan juftlik',
        en: 'a dating couple',
        ru: 'влюблённая пара',
      },
    },
    tags: ['romance', 'dating', 'relationship'],
    difficulty: 4,
    usageNote: {
      ko: '친구 관계에도 쓸 수 있지만 연애 문맥에서는 연인이 되어 만난다는 뜻이에요.',
      uz: 'Do‘stlik uchun ham ishlatiladi, ammo romantik kontekstda juftlik bo‘lib uchrashishni anglatadi.',
      en: 'It can also mean socializing, but in romantic contexts it means dating someone.',
      ru: 'Слово может относиться и к общению, но в романтическом контексте означает встречаться.',
    },
    isCore: true,
  },
  {
    code: 'romance-fall-in-love',
    korean: '사랑에 빠지다',
    senseKey: 'fall-in-love',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '누군가를 깊이 사랑하게 되다',
      uz: 'sevib qolmoq',
      en: 'to fall in love',
      ru: 'влюбиться',
    },
    examples: [
      {
        korean: '함께 여행한 뒤 두 사람은 사랑에 빠졌어요.',
        translations: {
          ko: '함께 여행한 뒤 두 사람은 서로 깊이 좋아하게 되었어요.',
          uz: 'Birga sayohat qilgandan keyin ular sevib qolishdi.',
          en: 'After traveling together, the two fell in love.',
          ru: 'После совместной поездки они влюбились друг в друга.',
        },
      },
    ],
    pronunciation: {
      hangul: '사랑에 빠지다',
      romanization: 'sarange ppajida',
      ttsText: '사랑에 빠지다',
    },
    media: {
      emoji: '💕',
      imageUrl: '',
      imageAlt: {
        ko: '사랑에 빠진 두 사람',
        uz: 'sevib qolgan ikki kishi',
        en: 'two people in love',
        ru: 'двое влюблённых',
      },
    },
    tags: ['romance', 'love', 'relationship'],
    difficulty: 4,
    usageNote: {
      ko: '감정이 점점 깊어져 사랑하게 된 상황에 써요.',
      uz: 'His-tuyg‘ular chuqurlashib, sevgi paydo bo‘lganini ifodalaydi.',
      en: 'Used when affection develops into love.',
      ru: 'Употребляется, когда симпатия перерастает в любовь.',
    },
    isCore: true,
  },
  {
    code: 'romance-confess-love',
    korean: '고백하다',
    senseKey: 'confess-love',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '좋아하거나 사랑하는 마음을 상대방에게 말하다',
      uz: 'sevgisini izhor qilmoq',
      en: 'to confess one’s feelings',
      ru: 'признаться в любви',
    },
    examples: [
      {
        korean: '오랫동안 좋아하던 사람에게 마음을 고백했어요.',
        translations: {
          ko: '오랫동안 좋아하던 사람에게 좋아한다고 말했어요.',
          uz: 'Anchadan beri yoqtirgan odamimga hislarimni izhor qildim.',
          en: 'I confessed my feelings to someone I had liked for a long time.',
          ru: 'Я признался в чувствах человеку, который давно мне нравился.',
        },
      },
    ],
    pronunciation: {
      hangul: '고백하다',
      romanization: 'gobaekhada',
      ttsText: '고백하다',
    },
    media: {
      emoji: '💌',
      imageUrl: '',
      imageAlt: {
        ko: '마음을 고백하는 사람',
        uz: 'hislarini izhor qilayotgan odam',
        en: 'a person confessing their feelings',
        ru: 'человек, признающийся в чувствах',
      },
    },
    tags: ['romance', 'confession', 'feelings'],
    difficulty: 4,
    usageNote: {
      ko: '연애 문맥에서는 자신의 호감이나 사랑을 직접 밝힌다는 뜻이에요.',
      uz: 'Romantik vaziyatda o‘z his-tuyg‘ularini ochiq aytishni anglatadi.',
      en: 'In romantic contexts, it means openly telling someone about your feelings.',
      ru: 'В романтическом контексте означает открыто рассказать о своих чувствах.',
    },
    isCore: true,
  },
  {
    code: 'romance-have-relationship',
    korean: '연애하다',
    senseKey: 'romantic-relationship',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '서로 사랑하는 사람과 연인 관계를 유지하다',
      uz: 'sevgi munosabatida bo‘lmoq',
      en: 'to have a romantic relationship',
      ru: 'состоять в романтических отношениях',
    },
    examples: [
      {
        korean: '두 사람은 대학 때부터 오랫동안 연애했어요.',
        translations: {
          ko: '두 사람은 대학 때부터 오랫동안 연인으로 만났어요.',
          uz: 'Ular universitet davridan beri uzoq vaqt uchrashishdi.',
          en: 'They dated for a long time starting in college.',
          ru: 'Они долго встречались ещё со времён университета.',
        },
      },
    ],
    pronunciation: {
      hangul: '연애하다',
      romanization: 'yeonaehada',
      ttsText: '연애하다',
    },
    media: {
      emoji: '💑',
      imageUrl: '',
      imageAlt: {
        ko: '데이트하는 연인',
        uz: 'uchrashayotgan juftlik',
        en: 'a couple dating',
        ru: 'пара на свидании',
      },
    },
    tags: ['romance', 'dating', 'relationship'],
    difficulty: 4,
    usageNote: {
      ko: '`사귀다`보다 연애 관계 전체나 기간을 말할 때 자주 써요.',
      uz: '`사귀다`ga qaraganda romantik munosabatning o‘zi yoki davomiyligini aytganda ko‘proq ishlatiladi.',
      en: 'Often used when referring to the relationship or dating period as a whole.',
      ru: 'Часто употребляется, когда говорят об отношениях или периоде встреч в целом.',
    },
    isCore: true,
  },
  {
    code: 'romance-have-charm',
    korean: '매력이 있다',
    senseKey: 'attractive-quality',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '사람의 마음을 끄는 좋은 점이 있다',
      uz: 'jozibasi bor',
      en: 'to be attractive; to have charm',
      ru: 'быть привлекательным; обладать обаянием',
    },
    examples: [
      {
        korean: '처음에는 조용해 보였지만 이야기할수록 매력이 있었어요.',
        translations: {
          ko: '처음에는 조용해 보였지만 이야기할수록 마음을 끄는 점이 많았어요.',
          uz: 'Avvaliga u kamgap ko‘rindi, lekin gaplashgan sari yanada jozibali tuyuldi.',
          en: 'At first the person seemed quiet, but became more charming as we talked.',
          ru: 'Сначала человек казался тихим, но чем больше мы разговаривали, тем привлекательнее он становился.',
        },
      },
    ],
    pronunciation: {
      hangul: '매력이 있다',
      romanization: 'maeryeogi itda',
      ttsText: '매력이 있다',
    },
    media: {
      emoji: '✨',
      imageUrl: '',
      imageAlt: {
        ko: '매력적인 사람',
        uz: 'jozibali odam',
        en: 'a charming person',
        ru: 'обаятельный человек',
      },
    },
    tags: ['romance', 'attraction', 'personality'],
    difficulty: 4,
    usageNote: {
      ko: '외모뿐 아니라 성격이나 말투 등 사람을 끄는 특징에도 쓸 수 있어요.',
      uz: 'Faqat tashqi ko‘rinish emas, xarakter yoki gapirish uslubidagi joziba uchun ham ishlatiladi.',
      en: 'It can describe attractive personality traits or mannerisms as well as appearance.',
      ru: 'Может относиться не только к внешности, но и к характеру или манере общения.',
    },
    isCore: true,
  },
  {
    code: 'romance-personality-match',
    korean: '성격이 잘 맞다',
    senseKey: 'personality-match',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '두 사람의 성격이 서로 잘 어울리다',
      uz: 'fe’l-atvori bir-biriga mos kelmoq',
      en: 'to have compatible personalities',
      ru: 'подходить друг другу по характеру',
    },
    examples: [
      {
        korean: '우리는 취미도 비슷하고 성격도 잘 맞아요.',
        translations: {
          ko: '우리는 취미가 비슷하고 서로 성격도 잘 어울려요.',
          uz: 'Bizning qiziqishlarimiz o‘xshash, xarakterimiz ham bir-biriga mos.',
          en: 'We have similar hobbies and our personalities match well.',
          ru: 'У нас похожие увлечения, и мы хорошо подходим друг другу по характеру.',
        },
      },
    ],
    pronunciation: {
      hangul: '성격이 잘 맞다',
      romanization: 'seonggyeogi jal matda',
      ttsText: '성격이 잘 맞다',
    },
    media: {
      emoji: '🧩',
      imageUrl: '',
      imageAlt: {
        ko: '서로 잘 맞는 두 사람',
        uz: 'bir-biriga mos ikki kishi',
        en: 'two compatible people',
        ru: 'двое хорошо подходящих друг другу людей',
      },
    },
    tags: ['romance', 'compatibility', 'personality'],
    difficulty: 4,
    usageNote: {
      ko: '연인이나 친구처럼 두 사람의 성향이 잘 어울릴 때 써요.',
      uz: 'Ikki kishining xarakteri yaxshi mos kelganda ishlatiladi.',
      en: 'Used when two people’s personalities work well together.',
      ru: 'Употребляется, когда характеры двух людей хорошо сочетаются.',
    },
    isCore: true,
  },
  {
    code: 'romance-communicate-well',
    korean: '말이 잘 통하다',
    senseKey: 'communicate-well',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '서로의 생각을 쉽게 이해하며 대화가 잘 되다',
      uz: 'bir-birini yaxshi tushunib gaplashmoq',
      en: 'to communicate well with each other',
      ru: 'легко находить общий язык',
    },
    examples: [
      {
        korean: '처음 만났는데도 말이 잘 통해서 세 시간이나 이야기했어요.',
        translations: {
          ko: '처음 만났지만 서로 잘 이해해서 세 시간이나 대화했어요.',
          uz: 'Birinchi marta uchrashgan bo‘lsak ham, juda yaxshi gaplashib, uch soat suhbatlashdik.',
          en: 'Even though we had just met, we communicated so well that we talked for three hours.',
          ru: 'Хотя мы встретились впервые, мы сразу нашли общий язык и разговаривали три часа.',
        },
      },
    ],
    pronunciation: {
      hangul: '말이 잘 통하다',
      romanization: 'mari jal tonghada',
      ttsText: '말이 잘 통하다',
    },
    media: {
      emoji: '💬',
      imageUrl: '',
      imageAlt: {
        ko: '즐겁게 대화하는 두 사람',
        uz: 'yaxshi suhbatlashayotgan ikki kishi',
        en: 'two people having an easy conversation',
        ru: 'двое людей, легко общающихся друг с другом',
      },
    },
    tags: ['romance', 'communication', 'compatibility'],
    difficulty: 4,
    usageNote: {
      ko: '단순히 말을 알아듣는다는 뜻보다 서로 생각과 느낌이 잘 맞는다는 의미가 강해요.',
      uz: 'Faqat so‘zlarni tushunish emas, fikr va hislar bir-biriga mos kelishini ham bildiradi.',
      en: 'It implies mutual understanding beyond simply understanding the words.',
      ru: 'Означает не только понимать слова, но и хорошо понимать мысли и чувства друг друга.',
    },
    isCore: true,
  },
  {
    code: 'romance-good-impression',
    korean: '인상이 좋다',
    senseKey: 'good-impression',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '처음 보거나 만났을 때 느끼는 느낌이 좋다',
      uz: 'yaxshi taassurot qoldirmoq',
      en: 'to make a good impression',
      ru: 'производить хорошее впечатление',
    },
    examples: [
      {
        korean: '처음 만났을 때 웃는 모습이 밝아서 인상이 좋았어요.',
        translations: {
          ko: '처음 만났을 때 밝게 웃어서 좋은 느낌을 받았어요.',
          uz: 'Birinchi uchrashuvda uning yorqin tabassumi yaxshi taassurot qoldirdi.',
          en: 'The person’s bright smile made a good impression when we first met.',
          ru: 'При первой встрече его светлая улыбка произвела хорошее впечатление.',
        },
      },
    ],
    pronunciation: {
      hangul: '인상이 좋다',
      romanization: 'insangi jota',
      ttsText: '인상이 좋다',
    },
    media: {
      emoji: '🙂',
      imageUrl: '',
      imageAlt: {
        ko: '좋은 첫인상을 주는 사람',
        uz: 'yaxshi birinchi taassurot qoldirayotgan odam',
        en: 'a person making a good first impression',
        ru: 'человек, производящий хорошее первое впечатление',
      },
    },
    tags: ['romance', 'first-impression', 'attraction'],
    difficulty: 4,
    usageNote: {
      ko: '처음 만난 사람에 대한 느낌을 평가할 때 자주 써요.',
      uz: 'Birinchi marta uchrashgan odam haqidagi taassurotni aytishda ko‘p ishlatiladi.',
      en: 'Often used when describing one’s first impression of someone.',
      ru: 'Часто употребляется при описании первого впечатления о человеке.',
    },
    isCore: true,
  },
  {
    code: 'romance-kind-hearted',
    korean: '마음씨가 착하다',
    senseKey: 'kind-hearted',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '마음이 선하고 다른 사람에게 친절하다',
      uz: 'ko‘ngli yaxshi va mehribon bo‘lmoq',
      en: 'to be kind-hearted',
      ru: 'быть добрым по характеру',
    },
    examples: [
      {
        korean: '그 사람은 어려운 사람을 자주 도와줄 만큼 마음씨가 착해요.',
        translations: {
          ko: '그 사람은 남을 잘 도와주는 착한 사람이에요.',
          uz: 'U muhtoj odamlarga tez-tez yordam beradigan darajada mehribon.',
          en: 'That person is kind-hearted and often helps people in need.',
          ru: 'Этот человек очень добрый и часто помогает тем, кому трудно.',
        },
      },
    ],
    pronunciation: {
      hangul: '마음씨가 착하다',
      romanization: 'maeumssiga chakada',
      ttsText: '마음씨가 착하다',
    },
    media: {
      emoji: '🤍',
      imageUrl: '',
      imageAlt: {
        ko: '다른 사람을 돕는 친절한 사람',
        uz: 'boshqalarga yordam berayotgan mehribon odam',
        en: 'a kind person helping someone',
        ru: 'добрый человек, помогающий другому',
      },
    },
    tags: ['romance', 'personality', 'kindness'],
    difficulty: 4,
    usageNote: {
      ko: '사람의 내적인 성품이 선하다고 평가할 때 사용해요.',
      uz: 'Insonning ichki fe’l-atvori yaxshi ekanini aytishda ishlatiladi.',
      en: 'Used to describe someone as genuinely kind in character.',
      ru: 'Употребляется для описания доброго характера человека.',
    },
    isCore: true,
  },
  {
    code: 'romance-sit-side-by-side',
    korean: '나란히 앉다',
    senseKey: 'side-by-side',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '서로 옆자리에 같은 방향을 보고 앉다',
      uz: 'yonma-yon o‘tirmoq',
      en: 'to sit side by side',
      ru: 'сидеть рядом',
    },
    examples: [
      {
        korean: '두 사람은 공원 벤치에 나란히 앉아 이야기를 했어요.',
        translations: {
          ko: '두 사람은 공원 벤치에서 서로 옆에 앉아 이야기했어요.',
          uz: 'Ular bog‘dagi o‘rindiqda yonma-yon o‘tirib suhbatlashishdi.',
          en: 'They sat side by side on a park bench and talked.',
          ru: 'Они сидели рядом на скамейке в парке и разговаривали.',
        },
      },
    ],
    pronunciation: {
      hangul: '나란히 앉다',
      romanization: 'naranhi anta',
      ttsText: '나란히 앉다',
    },
    media: {
      emoji: '🪑',
      imageUrl: '',
      imageAlt: {
        ko: '벤치에 나란히 앉은 두 사람',
        uz: 'o‘rindiqda yonma-yon o‘tirgan ikki kishi',
        en: 'two people sitting side by side',
        ru: 'двое людей, сидящих рядом',
      },
    },
    tags: ['romance', 'date', 'body-language'],
    difficulty: 4,
    usageNote: {
      ko: '`나란히`는 두 사람이나 사물이 옆으로 가지런히 있는 모습을 나타내요.',
      uz: '`나란히` ikki odam yoki narsaning yonma-yon joylashganini bildiradi.',
      en: '`나란히` describes people or things positioned neatly next to each other.',
      ru: '`나란히` означает расположение людей или предметов рядом друг с другом.',
    },
    isCore: false,
  },
  {
    code: 'romance-hold-hands',
    korean: '손을 잡다',
    senseKey: 'hold-hands',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '다른 사람의 손을 자신의 손으로 잡다',
      uz: 'qo‘l ushlashmoq',
      en: 'to hold hands',
      ru: 'держаться за руки',
    },
    examples: [
      {
        korean: '두 사람은 손을 잡고 공원을 걸었어요.',
        translations: {
          ko: '두 사람은 서로 손을 잡은 채 공원을 걸었어요.',
          uz: 'Ular qo‘l ushlashib bog‘da yurishdi.',
          en: 'They walked through the park holding hands.',
          ru: 'Они гуляли по парку, держась за руки.',
        },
      },
    ],
    pronunciation: {
      hangul: '손을 잡다',
      romanization: 'soneul japda',
      ttsText: '손을 잡다',
    },
    media: {
      emoji: '🤝',
      imageUrl: '',
      imageAlt: {
        ko: '손을 잡은 두 사람',
        uz: 'qo‘l ushlashgan ikki kishi',
        en: 'two people holding hands',
        ru: 'двое людей, держащихся за руки',
      },
    },
    tags: ['romance', 'date', 'body-language'],
    difficulty: 4,
    usageNote: {
      ko: '연인뿐 아니라 아이나 가족의 손을 잡는 상황에도 사용할 수 있어요.',
      uz: 'Faqat juftliklar emas, bola yoki oila a’zosining qo‘lini ushlash uchun ham ishlatiladi.',
      en: 'It can also describe holding a child’s or family member’s hand.',
      ru: 'Выражение используется не только для влюблённых, но и когда держат за руку ребёнка или родственника.',
    },
    isCore: true,
  },
  {
    code: 'romance-heart-pound',
    korean: '가슴이 두근거리다',
    senseKey: 'heart-palpitate',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '설렘이나 긴장 때문에 심장이 빠르게 뛰는 느낌이 들다',
      uz: 'hayajondan yuragi dukillamoq',
      en: 'to have one’s heart pound',
      ru: 'чувствовать, как сильно бьётся сердце',
    },
    examples: [
      {
        korean: '좋아하는 사람을 만나기 전부터 가슴이 두근거렸어요.',
        translations: {
          ko: '좋아하는 사람을 만나기 전부터 설레고 긴장됐어요.',
          uz: 'Yoqtirgan odamim bilan uchrashishdan oldin yuragim dukillardi.',
          en: 'My heart was pounding even before I met the person I liked.',
          ru: 'Ещё до встречи с человеком, который мне нравится, сердце сильно билось.',
        },
      },
    ],
    pronunciation: {
      hangul: '가슴이 두근거리다',
      romanization: 'gaseumi dugeungeorida',
      ttsText: '가슴이 두근거리다',
    },
    media: {
      emoji: '💓',
      imageUrl: '',
      imageAlt: {
        ko: '설레어 가슴이 뛰는 사람',
        uz: 'hayajondan yuragi tez urayotgan odam',
        en: 'a person whose heart is pounding with excitement',
        ru: 'человек, у которого от волнения сильно бьётся сердце',
      },
    },
    tags: ['romance', 'emotion', 'body-language'],
    difficulty: 4,
    usageNote: {
      ko: '좋아하는 사람을 볼 때뿐 아니라 긴장하거나 기대할 때도 사용할 수 있어요.',
      uz: 'Sevgan odamni ko‘rganda뿐 아니라 hayajon yoki kutish paytida ham ishlatiladi.',
      en: 'It can describe nervousness or anticipation as well as romantic excitement.',
      ru: 'Может описывать не только романтическое волнение, но и нервозность или ожидание.',
    },
    isCore: true,
  },
  {
    code: 'romance-blush',
    korean: '얼굴이 빨개지다',
    senseKey: 'blush',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '부끄럽거나 당황해서 얼굴빛이 붉어지다',
      uz: 'uyalib yuzi qizarib ketmoq',
      en: 'to blush; to turn red',
      ru: 'покраснеть',
    },
    examples: [
      {
        korean: '갑자기 칭찬을 받자 얼굴이 빨개졌어요.',
        translations: {
          ko: '갑자기 칭찬을 받아서 부끄러워 얼굴이 붉어졌어요.',
          uz: 'To‘satdan maqtov eshitib, yuzi qizarib ketdi.',
          en: 'The person blushed after suddenly receiving a compliment.',
          ru: 'От неожиданного комплимента человек покраснел.',
        },
      },
    ],
    pronunciation: {
      hangul: '얼굴이 빨개지다',
      romanization: 'eolguri ppalgaejida',
      ttsText: '얼굴이 빨개지다',
    },
    media: {
      emoji: '😊',
      imageUrl: '',
      imageAlt: {
        ko: '부끄러워 얼굴이 빨개진 사람',
        uz: 'uyalib yuzi qizargan odam',
        en: 'a person blushing',
        ru: 'покрасневший от смущения человек',
      },
    },
    tags: ['romance', 'emotion', 'body-language'],
    difficulty: 4,
    usageNote: {
      ko: '부끄러움이나 당황함으로 얼굴이 붉어지는 모습을 나타내요.',
      uz: 'Uyat yoki noqulaylik sabab yuzning qizarishini bildiradi.',
      en: 'Describes the face turning red from embarrassment or shyness.',
      ru: 'Описывает покраснение лица от смущения или застенчивости.',
    },
    isCore: false,
  },
  {
    code: 'romance-link-arms',
    korean: '팔짱을 끼다',
    senseKey: 'walk-arm-in-arm',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '다른 사람의 팔에 자신의 팔을 끼다',
      uz: 'qo‘ltiqlashib yurmoq',
      en: 'to walk arm in arm',
      ru: 'идти под руку',
    },
    examples: [
      {
        korean: '두 사람은 팔짱을 끼고 천천히 걸었어요.',
        translations: {
          ko: '두 사람은 서로 팔을 끼고 천천히 걸었어요.',
          uz: 'Ular qo‘ltiqlashib sekin yurishdi.',
          en: 'The two walked slowly arm in arm.',
          ru: 'Они медленно шли под руку.',
        },
      },
    ],
    pronunciation: {
      hangul: '팔짱을 끼다',
      romanization: 'paljjangeul kkida',
      ttsText: '팔짱을 끼다',
    },
    media: {
      emoji: '🫶',
      imageUrl: '',
      imageAlt: {
        ko: '팔짱을 끼고 걷는 두 사람',
        uz: 'qo‘ltiqlashib ketayotgan ikki kishi',
        en: 'two people walking arm in arm',
        ru: 'двое людей, идущих под руку',
      },
    },
    tags: ['romance', 'date', 'body-language'],
    difficulty: 5,
    usageNote: {
      ko: '자기 팔을 가슴 앞에서 교차하는 행동도 `팔짱을 끼다`라고 해요. 문맥으로 구별해요.',
      uz: 'O‘z qo‘llarini ko‘krak oldida chalishtirish ham shu ibora bilan aytilishi mumkin; ma’no kontekstdan aniqlanadi.',
      en: 'The same expression can also mean folding one’s own arms, so the meaning depends on context.',
      ru: 'Это выражение также может означать скрестить собственные руки на груди; значение определяется контекстом.',
    },
    isCore: false,
  },
] satisfies readonly WordSeedEntry[];

export const S6_UNIT1_NODE1_QUESTIONS = {
  // ─────────────────────────────
  // Lesson 1 · 첫 만남과 소개팅
  // q001 ~ q020
  // ─────────────────────────────

  s6u1_001_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '친구의 소개로 처음 만난 사람에게 좋은 느낌을 받았다는 뜻의 문장을 만드세요.',
      'Do‘st orqali birinchi marta uchrashgan odam sizda yaxshi taassurot qoldirganini bildiruvchi gap tuzing.',
      'Build a sentence meaning that someone you first met through a friend made a good impression on you.',
      'Составьте предложение о том, что человек, с которым вас познакомил друг, произвёл хорошее впечатление.',
    ),
    options: [
      '좋았어요',
      '친구의',
      '처음',
      '인상이',
      '소개로',
      '만났는데',
      '나빴어요',
      '우연히',
    ],
    answer: '친구의 소개로 처음 만났는데 인상이 좋았어요',
    answerTranslation: L(
      '친구가 소개해 준 사람을 처음 만났는데 좋은 인상을 받았어요.',
      'Do‘stim tanishtirgan odam bilan birinchi uchrashuvda yaxshi taassurot oldim.',
      'I met someone through a friend for the first time and got a good impression.',
      'Я впервые встретился с человеком, которого представил друг, и получил хорошее впечатление.',
    ),
  },

  s6u1_002_type_answer: {
    type: 'type_answer',
    instruction: L(
      '문맥에 맞는 두 표현을 직접 입력하세요.',
      'Kontekstga mos ikkita ifodani kiriting.',
      'Type the two expressions that fit the context.',
      'Введите два выражения, подходящих по смыслу.',
    ),
    sentenceTemplate: '두 사람은 ___에서 처음 만났고, 대화가 잘 통해 곧 ___.',
    blankAnswers: ['소개팅', '사귀기 시작했어요'],
    answer: '소개팅|사귀기 시작했어요',
    answerTranslation: L(
      '두 사람은 소개팅에서 처음 만나 대화가 잘 통한 뒤 연인이 되었어요.',
      'Ular tanishuv uchrashuvida birinchi marta uchrashib, yaxshi suhbatlashgach uchrasha boshlashdi.',
      'They first met on a blind date and soon started dating because they communicated well.',
      'Они впервые встретились на свидании по знакомству и вскоре начали встречаться, потому что легко нашли общий язык.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The two people first met on a blind date and soon started dating because they communicated well.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_003_sentence_builder: {
    type: 'sentence_builder',
    instruction: L(
      '어절을 배열해 자연스러운 문장을 만드세요.',
      'Bo‘laklarni tartiblab tabiiy gap tuzing.',
      'Arrange the chunks to make a natural sentence.',
      'Расставьте части так, чтобы получилось естественное предложение.',
    ),
    options: [
      '민수 씨와',
      '저는',
      '소개팅을',
      '친구 소개로',
      '했어요',
      '우연히',
    ],
    answer: '저는 친구 소개로 민수 씨와 소개팅을 했어요',
    audioText: '저는 친구 소개로 민수 씨와 소개팅을 했어요.',
    answerTranslation: L(
      '저는 친구가 소개해 준 민수 씨를 만났어요.',
      'Men do‘stim tanishtirgan Minsu bilan tanishuv uchrashuviga bordim.',
      'I went on a blind date with Minsu through a friend.',
      'Я сходил на свидание с Минсу, которого представил мне друг.',
    ),
  },

  s6u1_004_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람이 다시 만나기로 한 가장 큰 이유를 고르세요.',
      'Ularning yana uchrashishga qaror qilgan asosiy sababini tanlang.',
      'Choose the main reason the two decided to meet again.',
      'Выберите главную причину, по которой они решили встретиться снова.',
    ),
    passage:
      '수진은 친구의 소개로 민호를 처음 만났습니다. 처음에는 조금 어색했지만 취미 이야기를 시작하자 시간이 가는 줄 몰랐습니다. 서로 좋아하는 영화도 비슷했고 말도 잘 통했습니다. 두 사람은 다음 주말에 다시 만나기로 했습니다.',
    options: [
      '서로 말이 잘 통했기 때문에',
      '같은 회사에서 일하기 때문에',
      '친구가 반드시 만나라고 해서',
      '서로 오래전부터 알고 있었기 때문에',
    ],
    answer: '서로 말이 잘 통했기 때문에',
  },

  s6u1_005_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '상대방을 처음 보는 순간 강한 호감을 느꼈다는 뜻의 문장을 만드세요.',
      'Odamni birinchi ko‘rgan zahoti kuchli yoqtirib qolganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying that you felt strongly attracted the moment you first saw the person.',
      'Составьте предложение о сильной симпатии с первого взгляда.',
    ),
    options: [
      '반했어요',
      '처음',
      '그 사람을',
      '보자마자',
      '첫눈에',
      '잊었어요',
      '천천히',
    ],
    answer: '그 사람을 처음 보자마자 첫눈에 반했어요',
    answerTranslation: L(
      '그 사람을 처음 보는 순간 바로 좋아하게 되었어요.',
      'Uni birinchi ko‘rgan zahotim bir ko‘rishda sevib qoldim.',
      'I fell for that person the moment I first saw them.',
      'Я влюбился в этого человека с первого взгляда.',
    ),
  },

  s6u1_006_type_answer: {
    type: 'type_answer',
    instruction: L(
      '빈칸에 알맞은 두 표현을 직접 입력하세요.',
      'Bo‘sh joylarga mos ikkita ifodani kiriting.',
      'Type the two expressions that belong in the blanks.',
      'Введите два подходящих выражения.',
    ),
    sentenceTemplate:
      '처음 만났을 때 ___ 좋았고, 이야기를 해 보니 ___ 잘 통했어요.',
    blankAnswers: ['인상이', '말이'],
    answer: '인상이|말이',
    answerTranslation: L(
      '처음 만났을 때 좋은 느낌을 받았고 대화도 잘됐어요.',
      'Birinchi uchrashuvda yaxshi taassurot oldim va suhbatimiz ham yaxshi chiqdi.',
      'I had a good first impression, and we communicated well.',
      'Первое впечатление было хорошим, и мы легко нашли общий язык.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The speaker had a good first impression and communicated well with the other person.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_007_listening: {
    type: 'listening',
    instruction: L(
      '음성을 듣고 화자가 상대방에게 호감을 느낀 이유를 고르세요.',
      'Audioyozuvni tinglab, so‘zlovchining odamni yoqtirgan sababini tanlang.',
      'Listen and choose why the speaker became interested in the other person.',
      'Прослушайте и выберите, почему говорящему понравился другой человек.',
    ),
    audioText:
      '처음에는 그냥 조용한 사람인 줄 알았어요. 그런데 이야기를 해 보니까 유머 감각도 있고 다른 사람을 배려하는 모습이 정말 매력적이었어요.',
    options: [
      '성격과 행동에서 매력을 느껴서',
      '외모가 유명한 배우와 닮아서',
      '같은 학교를 졸업해서',
      '친구가 계속 만나라고 해서',
    ],
    answer: '성격과 행동에서 매력을 느껴서',
  },

  s6u1_008_word_arrange: {
    type: 'word_arrange',
    instruction: L(
      '어절을 올바른 순서로 배열하세요.',
      'So‘z bo‘laklarini to‘g‘ri tartiblang.',
      'Put the chunks in the correct order.',
      'Расположите части предложения в правильном порядке.',
    ),
    options: [
      '이야기를',
      '처음인데도',
      '말이',
      '세 시간이나',
      '만난',
      '잘 통해서',
      '했어요',
    ],
    answer: '처음인데도 말이 잘 통해서 세 시간이나 이야기를 했어요',
  },

  s6u1_009_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '첫 만남에서 상대방이 친절하고 밝아 좋은 느낌을 받았다는 뜻의 문장을 만드세요.',
      'Birinchi uchrashuvda uning mehribon va quvnoqligi yaxshi taassurot qoldirganini bildiruvchi gap tuzing.',
      'Build a sentence saying the person made a good impression by being kind and cheerful.',
      'Составьте предложение о хорошем впечатлении благодаря доброте и жизнерадостности человека.',
    ),
    options: [
      '밝아서',
      '좋았어요',
      '친절하고',
      '인상이',
      '그 사람이',
      '무뚝뚝해서',
      '성격이',
    ],
    answer: '그 사람이 친절하고 밝아서 인상이 좋았어요',
    answerTranslation: L(
      '그 사람의 친절하고 밝은 모습 때문에 좋은 느낌을 받았어요.',
      'Uning mehribon va quvnoq fe’li menda yaxshi taassurot qoldirdi.',
      'The person’s kindness and cheerful manner made a good impression on me.',
      'Доброта и жизнерадостность этого человека произвели на меня хорошее впечатление.',
    ),
  },

  s6u1_010_type_answer: {
    type: 'type_answer',
    instruction: L(
      '문맥에 맞는 두 표현을 직접 입력하세요.',
      'Kontekstga mos ikkita ifodani kiriting.',
      'Type the two expressions that fit the context.',
      'Введите два выражения по контексту.',
    ),
    sentenceTemplate:
      '처음에는 어색했지만 오래 이야기해 보니 서로 ___ 잘 맞고 ___ 잘 통했어요.',
    blankAnswers: ['성격이', '말이'],
    answer: '성격이|말이',
    answerTranslation: L(
      '오래 이야기한 뒤 두 사람의 성격과 대화 방식이 잘 맞는다는 것을 알았어요.',
      'Uzoq suhbatdan keyin xarakterimiz mos va suhbatimiz yaxshi ekanini bildik.',
      'After talking for a while, we realized our personalities matched and we communicated well.',
      'После долгого разговора мы поняли, что подходим друг другу по характеру и легко общаемся.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'After talking for some time, the two people realize their personalities match and they communicate well.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_011_error_hunt: {
    type: 'error_hunt',
    instruction: L(
      '문맥에 어울리지 않는 표현을 찾아 자연스럽게 고치세요.',
      'Kontekstga mos kelmaydigan ifodani topib, tabiiy shaklga almashtiring.',
      'Find the expression that does not fit and correct it.',
      'Найдите неподходящее выражение и исправьте его.',
    ),
    npcText:
      '소개팅에서 처음 만난 사람과 말이 잘 맞아서 세 시간이나 이야기했어요.',
    wrongWord: '맞아서',
    answer: '통해서',
  },

  s6u1_012_cloze_passage: {
    type: 'cloze_passage',
    instruction: L(
      '글의 흐름에 맞게 세 빈칸을 채우세요.',
      'Matn mazmuniga mos ravishda uchta bo‘sh joyni to‘ldiring.',
      'Fill the three blanks to complete the passage.',
      'Заполните три пропуска по смыслу текста.',
    ),
    passage:
      '친구가 ___을 주선해 줘서 새로운 사람을 만났습니다. 처음에는 긴장했지만 상대방의 ___ 좋았고 이야기를 해 보니 ___ 잘 통했습니다.',
    blankAnswers: ['소개팅', '인상이', '말이'],
    options: ['말이', '면접', '소개팅', '인상이', '조건이', '회의'],
    answer: '소개팅|인상이|말이',
  },

  s6u1_013_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '처음 만난 뒤 대화가 너무 잘되어 다시 만나기로 했다는 뜻의 문장을 만드세요.',
      'Birinchi uchrashuvdagi suhbat juda yaxshi chiqqani uchun yana uchrashishga qaror qilganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying you decided to meet again because the conversation went so well.',
      'Составьте предложение о том, что вы решили встретиться снова, потому что разговор прошёл очень хорошо.',
    ),
    options: [
      '다시',
      '말이',
      '만나기로',
      '잘 통해서',
      '했어요',
      '전혀',
      '결혼하기로',
    ],
    answer: '말이 잘 통해서 다시 만나기로 했어요',
    answerTranslation: L(
      '대화가 잘되어서 다음에 또 만나기로 했어요.',
      'Suhbatimiz yaxshi chiqqani uchun yana uchrashishga qaror qildik.',
      'We decided to meet again because we communicated well.',
      'Мы решили встретиться снова, потому что легко нашли общий язык.',
    ),
  },

  s6u1_014_type_answer: {
    type: 'type_answer',
    instruction: L(
      '문맥을 완성하는 두 표현을 입력하세요.',
      'Kontekstni tugallaydigan ikkita ifodani kiriting.',
      'Type two expressions to complete the context.',
      'Введите два выражения, завершающих контекст.',
    ),
    sentenceTemplate:
      '그 사람은 이야기를 할수록 ___ 있었고, 다른 사람을 배려해서 ___ 착했어요.',
    blankAnswers: ['매력이', '마음씨가'],
    answer: '매력이|마음씨가',
    answerTranslation: L(
      '이야기할수록 매력적이었고 다른 사람을 배려하는 착한 사람이었어요.',
      'Gaplashgan sari yanada jozibali ko‘rindi va boshqalarga e’tiborli, mehribon odam edi.',
      'The more we talked, the more charming the person seemed, and they were kind-hearted.',
      'Чем больше мы разговаривали, тем обаятельнее казался этот человек, и у него был добрый характер.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The person became more charming through conversation and was kind-hearted toward others.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_015_speaking: {
    type: 'speaking',
    instruction: L(
      '처음 만난 사람에게 좋은 인상을 받은 경험을 한 문장으로 말하세요.',
      'Birinchi uchrashuvda yaxshi taassurot olgan tajribangizni bir gap bilan ayting.',
      'Describe in one sentence getting a good impression of someone you first met.',
      'Одним предложением расскажите о хорошем впечатлении от первой встречи.',
    ),
    answer: '처음 만났을 때 인상이 좋아서 다시 만나고 싶었어요.',
    answerTranslation: L(
      '처음 만났을 때 좋은 느낌을 받아 다시 만나고 싶었어요.',
      'Birinchi uchrashuvda yaxshi taassurot olganim uchun yana uchrashishni xohladim.',
      'I got a good impression when we first met, so I wanted to meet again.',
      'При первой встрече человек произвёл хорошее впечатление, поэтому мне захотелось увидеться снова.',
    ),
  },

  s6u1_016_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '음성을 듣고 세 빈칸을 직접 입력하세요.',
      'Audioyozuvni tinglab, uchta bo‘sh joyni kiriting.',
      'Listen and type the three missing words.',
      'Прослушайте и заполните три пропуска.',
    ),
    audioText: '소개팅에서 처음 만났는데 인상이 좋았고 말도 잘 통했어요.',
    sentenceTemplate: '___에서 처음 만났는데 ___이 좋았고 ___도 잘 통했어요.',
    blankAnswers: ['소개팅', '인상', '말'],
    answer: '소개팅|인상|말',
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The dictated sentence says they first met on a blind date, the person made a good impression, and conversation went well.',
      acceptedAnswers: [],
      notes: ['Require the words exactly as spoken in the Korean audio.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_017_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '처음 만난 사람과 생각이 잘 맞아 시간이 빨리 갔다고 느꼈다는 문장을 만드세요.',
      'Birinchi uchrashgan odam bilan fikrlaringiz mos bo‘lib, vaqt tez o‘tganini bildiruvchi gap tuzing.',
      'Build a sentence saying conversation went so well with someone new that time passed quickly.',
      'Составьте предложение о том, что разговор с новым знакомым шёл так легко, что время прошло незаметно.',
    ),
    options: [
      '가는',
      '시간이',
      '말이',
      '몰랐어요',
      '잘 통해서',
      '줄',
      '막혀서',
    ],
    answer: '말이 잘 통해서 시간이 가는 줄 몰랐어요',
    answerTranslation: L(
      '대화가 잘돼서 시간이 얼마나 지났는지 몰랐어요.',
      'Suhbatimiz shu qadar yaxshi bo‘ldiki, vaqt qanday o‘tganini sezmadim.',
      'We communicated so well that I lost track of time.',
      'Мы так хорошо разговаривали, что я не заметил, как прошло время.',
    ),
  },

  s6u1_018_type_answer: {
    type: 'type_answer',
    instruction: L(
      '두 빈칸에 알맞은 표현을 입력하세요.',
      'Ikki bo‘sh joyga mos ifodalarni kiriting.',
      'Type the expressions for both blanks.',
      'Введите подходящие выражения в оба пропуска.',
    ),
    sentenceTemplate:
      '친구가 ___을 주선해 줬는데 상대방의 첫 ___ 아주 좋았어요.',
    blankAnswers: ['소개팅', '인상이'],
    answer: '소개팅|인상이',
    answerTranslation: L(
      '친구가 소개팅을 마련해 줬고 상대방에 대한 첫 느낌도 좋았어요.',
      'Do‘stim tanishuv uchrashuvini uyushtirdi va odam haqidagi birinchi taassurotim juda yaxshi edi.',
      'My friend arranged a blind date, and my first impression of the person was very good.',
      'Друг организовал свидание по знакомству, и первое впечатление о человеке было очень хорошим.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'A friend arranged a blind date and the speaker had a very good first impression of the other person.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_019_verb_transform: {
    type: 'verb_transform',
    instruction: L(
      '주어진 동사를 과거 해요체로 만드세요.',
      'Berilgan fe’lni o‘tgan zamon 해요체 shakliga aylantiring.',
      'Change the verb into the past-tense haeyo style.',
      'Поставьте глагол в прошедшее время в стиле 해요체.',
    ),
    baseWord: '고백하다',
    targetForm: '과거 · 해요체',
    options: ['어', '고', '했', '요', '백', '해'],
    answer: '고백했어요',
  },

  s6u1_020_translate_type: {
    type: 'translate_type',
    instruction: L(
      '처음 만났지만 서로 대화가 잘되어 다시 만나기로 했다는 의미를 자연스러운 한국어로 쓰세요.',
      'Birinchi uchrashuv bo‘lsa ham, suhbat yaxshi chiqqani uchun yana uchrashishga kelishganingizni tabiiy koreys tilida yozing.',
      'Write naturally in Korean that although it was your first meeting, you communicated well and decided to meet again.',
      'Напишите естественно по-корейски, что, хотя это была первая встреча, вы легко нашли общий язык и решили увидеться снова.',
    ),
    answer: '처음 만났지만 말이 잘 통해서 다시 만나기로 했어요.',
    grading: {
      mode: 'semantic',
      expectedMeaning:
        'Although it was their first meeting, they communicated well and decided to meet again.',
      acceptedAnswers: [],
      notes: [
        'Accept a natural Korean paraphrase only when the first-meeting context, good communication, and decision to meet again are all preserved.',
      ],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
  },

  // ─────────────────────────────
  // Lesson 2 · 호감과 몸짓
  // q021 ~ q040
  // ─────────────────────────────

  s6u1_021_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '처음에는 평범해 보였지만 이야기할수록 상대방에게 끌렸다는 뜻의 문장을 만드세요.',
      'Avval oddiy ko‘ringan, ammo suhbatlashgan sari jozibali tuyulgan odam haqida gap tuzing.',
      'Build a sentence saying someone seemed ordinary at first but became more attractive as you talked.',
      'Составьте предложение о том, что сначала человек казался обычным, но становился всё привлекательнее во время разговора.',
    ),
    options: [
      '이야기할수록',
      '있었어요',
      '처음에는',
      '매력이',
      '평범해',
      '보였지만',
      '없었어요',
    ],
    answer: '처음에는 평범해 보였지만 이야기할수록 매력이 있었어요',
    answerTranslation: L(
      '처음에는 평범했지만 이야기를 나눌수록 더 매력적으로 느껴졌어요.',
      'Avval oddiy tuyuldi, ammo gaplashgan sari yanada jozibali ko‘rindi.',
      'The person seemed ordinary at first but became more charming as we talked.',
      'Сначала человек казался обычным, но становился всё более обаятельным по мере разговора.',
    ),
  },

  s6u1_022_type_answer: {
    type: 'type_answer',
    instruction: L(
      '설레는 상황에 맞는 두 표현을 입력하세요.',
      'Hayajonli vaziyatga mos ikki ifodani kiriting.',
      'Type the two expressions that fit this romantic situation.',
      'Введите два выражения, подходящих к ситуации волнения.',
    ),
    sentenceTemplate:
      '그 사람을 보자마자 ___ 반했고, 말을 걸려고 하니 ___ 두근거렸어요.',
    blankAnswers: ['첫눈에', '가슴이'],
    answer: '첫눈에|가슴이',
    answerTranslation: L(
      '처음 보는 순간 좋아하게 되었고 말을 걸려고 하니 심장이 빠르게 뛰었어요.',
      'Uni bir ko‘rishda yoqtirib qoldim va gapirmoqchi bo‘lganimda yuragim dukilladi.',
      'I fell for the person at first sight, and my heart pounded when I tried to speak.',
      'Я влюбился с первого взгляда, а когда попытался заговорить, сердце сильно забилось.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The speaker fell for the person at first sight and their heart pounded when trying to speak.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_023_sentence_builder: {
    type: 'sentence_builder',
    instruction: L(
      '어절을 배열해 문장을 완성하세요.',
      'Bo‘laklarni tartiblab gapni tugating.',
      'Arrange the chunks to complete the sentence.',
      'Расположите части и составьте предложение.',
    ),
    options: [
      '벤치에',
      '이야기했어요',
      '두 사람은',
      '오랫동안',
      '나란히 앉아',
      '떨어져서',
    ],
    answer: '두 사람은 벤치에 나란히 앉아 오랫동안 이야기했어요',
    audioText: '두 사람은 벤치에 나란히 앉아 오랫동안 이야기했어요.',
    answerTranslation: L(
      '두 사람은 벤치에 옆으로 함께 앉아 오래 이야기했어요.',
      'Ular o‘rindiqda yonma-yon o‘tirib uzoq suhbatlashishdi.',
      'The two sat side by side on a bench and talked for a long time.',
      'Они сидели рядом на скамейке и долго разговаривали.',
    ),
  },

  s6u1_024_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글에서 남자가 긴장했다는 것을 가장 잘 보여 주는 표현을 고르세요.',
      'Matnda erkakning hayajonlanganini eng yaxshi ko‘rsatadigan ifodani tanlang.',
      'Choose the expression that best shows that the man was nervous.',
      'Выберите выражение, которое лучше всего показывает волнение мужчины.',
    ),
    passage:
      '민호는 좋아하던 사람과 처음으로 단둘이 영화를 보러 갔습니다. 영화관 앞에서 기다리는 동안 가슴이 계속 두근거렸습니다. 상대방이 웃으며 다가오자 갑자기 얼굴까지 빨개졌습니다.',
    options: [
      '가슴이 두근거리고 얼굴이 빨개졌다',
      '영화를 두 번 봤다',
      '약속 장소에 늦었다',
      '상대방이 먼저 집에 갔다',
    ],
    answer: '가슴이 두근거리고 얼굴이 빨개졌다',
  },

  s6u1_025_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '좋아하는 사람에게 칭찬을 듣고 부끄러워졌다는 뜻의 문장을 만드세요.',
      'Yoqtirgan odamingizdan maqtov eshitib uyalganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying you blushed after being complimented by someone you like.',
      'Составьте предложение о том, что вы покраснели после комплимента от человека, который вам нравится.',
    ),
    options: [
      '얼굴이',
      '칭찬을',
      '빨개졌어요',
      '좋아하는 사람에게',
      '듣자',
      '차가워졌어요',
    ],
    answer: '좋아하는 사람에게 칭찬을 듣자 얼굴이 빨개졌어요',
    answerTranslation: L(
      '좋아하는 사람의 칭찬을 듣고 부끄러워 얼굴이 붉어졌어요.',
      'Yoqtirgan odamim meni maqtagach, uyalib yuzim qizarib ketdi.',
      'I blushed when the person I like complimented me.',
      'Я покраснел, когда человек, который мне нравится, сделал мне комплимент.',
    ),
  },

  s6u1_026_type_answer: {
    type: 'type_answer',
    instruction: L(
      '데이트 장면에 맞는 두 표현을 입력하세요.',
      'Uchrashuv sahnasiga mos ikki ifodani kiriting.',
      'Type the two expressions that fit the date scene.',
      'Введите два выражения, подходящих к сцене свидания.',
    ),
    sentenceTemplate:
      '공원을 걸을 때는 서로 ___ 잡았고, 사진을 찍을 때는 ___ 꼈어요.',
    blankAnswers: ['손을', '팔짱을'],
    answer: '손을|팔짱을',
    answerTranslation: L(
      '두 사람은 공원에서 손을 잡고 사진을 찍을 때는 팔짱도 꼈어요.',
      'Ular bog‘da qo‘l ushlashib yurishdi va suratga tushishda qo‘ltiqlashishdi.',
      'They held hands in the park and linked arms for a photo.',
      'Они держались за руки в парке и взялись под руку для фотографии.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The couple held hands while walking and linked arms when taking a photo.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_027_listening: {
    type: 'listening',
    instruction: L(
      '음성을 듣고 두 사람의 관계를 가장 잘 설명한 것을 고르세요.',
      'Audioyozuvni tinglab, ikki kishining munosabatini eng yaxshi ifodalovchi javobni tanlang.',
      'Listen and choose the description that best matches the two people.',
      'Прослушайте и выберите лучшее описание отношений двух людей.',
    ),
    audioText:
      '두 사람은 손을 잡고 걷다가 카페에서는 나란히 앉았습니다. 서로를 볼 때마다 웃는 모습이 아주 행복해 보였습니다.',
    options: [
      '서로에게 호감이 있는 연인처럼 보인다',
      '처음 만난 회사 동료처럼 보인다',
      '서로 화가 난 가족처럼 보인다',
      '면접을 보는 사람들처럼 보인다',
    ],
    answer: '서로에게 호감이 있는 연인처럼 보인다',
  },

  s6u1_028_word_arrange: {
    type: 'word_arrange',
    instruction: L(
      '어절을 올바른 순서로 배열하세요.',
      'Bo‘laklarni to‘g‘ri tartiblang.',
      'Arrange the chunks in the correct order.',
      'Расположите части в правильном порядке.',
    ),
    options: [
      '걸었어요',
      '공원을',
      '팔짱을 끼고',
      '두 사람은',
      '천천히',
      '혼자',
    ],
    answer: '두 사람은 팔짱을 끼고 공원을 천천히 걸었어요',
  },

  s6u1_029_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '두 사람이 벤치에서 서로 옆에 앉아 오랫동안 이야기했다는 문장을 만드세요.',
      'Ikki kishi o‘rindiqda yonma-yon o‘tirib uzoq suhbatlashganini bildiruvchi gap tuzing.',
      'Build a sentence saying the two sat side by side on a bench and talked for a long time.',
      'Составьте предложение о том, что двое долго разговаривали, сидя рядом на скамейке.',
    ),
    options: [
      '오랫동안',
      '나란히 앉아',
      '벤치에',
      '두 사람은',
      '이야기했어요',
      '멀리 떨어져',
    ],
    answer: '두 사람은 벤치에 나란히 앉아 오랫동안 이야기했어요',
    answerTranslation: L(
      '두 사람은 벤치에서 서로 옆에 앉아 오래 이야기했어요.',
      'Ular o‘rindiqda yonma-yon o‘tirib uzoq suhbatlashishdi.',
      'The two sat side by side on a bench and talked for a long time.',
      'Они сидели рядом на скамейке и долго разговаривали.',
    ),
  },

  s6u1_030_type_answer: {
    type: 'type_answer',
    instruction: L(
      '두 사람의 행동을 완성하는 표현을 입력하세요.',
      'Ikki kishining harakatlarini tugallaydigan ifodalarni kiriting.',
      'Type the expressions that complete the description.',
      'Введите выражения, завершающие описание действий.',
    ),
    sentenceTemplate:
      '두 사람은 카페에서 ___ 앉았고, 밖으로 나가서는 서로 ___ 잡았어요.',
    blankAnswers: ['나란히', '손을'],
    answer: '나란히|손을',
    answerTranslation: L(
      '카페에서는 옆에 앉았고 밖에서는 손을 잡았어요.',
      'Kafeda ular yonma-yon o‘tirishdi, tashqarida esa qo‘l ushlashishdi.',
      'They sat side by side in the café and held hands outside.',
      'В кафе они сидели рядом, а на улице держались за руки.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The couple sat side by side in the café and held hands after going outside.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_031_error_hunt: {
    type: 'error_hunt',
    instruction: L(
      '문맥상 어색한 단어를 찾아 고치세요.',
      'Kontekstda noto‘g‘ri bo‘lgan so‘zni topib tuzating.',
      'Find and correct the word that is unnatural in context.',
      'Найдите и исправьте слово, не подходящее по смыслу.',
    ),
    npcText: '그 사람에게 칭찬을 듣자 부끄러워서 얼굴이 파래졌어요.',
    wrongWord: '파래졌어요.',
    answer: '빨개졌어요.',
  },

  s6u1_032_cloze_passage: {
    type: 'cloze_passage',
    instruction: L(
      '세 빈칸을 문맥에 맞게 채우세요.',
      'Uchta bo‘sh joyni kontekstga mos to‘ldiring.',
      'Fill the three blanks based on the context.',
      'Заполните три пропуска по контексту.',
    ),
    passage:
      '좋아하던 사람과 처음 데이트를 했습니다. 만나기 전부터 ___ 두근거렸고, 상대방이 칭찬을 하자 ___ 빨개졌습니다. 집에 갈 때는 자연스럽게 서로 ___ 잡았습니다.',
    blankAnswers: ['가슴이', '얼굴이', '손을'],
    options: ['손을', '머리가', '가슴이', '얼굴이', '발을', '목이'],
    answer: '가슴이|얼굴이|손을',
  },

  s6u1_033_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '외모보다 상대방의 따뜻한 성품에 더 끌렸다는 문장을 만드세요.',
      'Tashqi ko‘rinishdan ko‘ra odamning mehribon fe’liga ko‘proq jalb bo‘lganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying you were more attracted to the person’s kind heart than their appearance.',
      'Составьте предложение о том, что вас больше привлекла доброта человека, чем внешность.',
    ),
    options: [
      '마음씨가',
      '외모보다',
      '착한',
      '더',
      '매력적이었어요',
      '차가운',
      '조건이',
    ],
    answer: '외모보다 마음씨가 착한 점이 더 매력적이었어요',
    answerTranslation: L(
      '겉모습보다 착한 성격이 더 마음에 들었어요.',
      'Tashqi ko‘rinishidan ko‘ra uning mehribonligi menga ko‘proq yoqdi.',
      'I found the person’s kind nature more attractive than their appearance.',
      'Добрый характер человека привлёк меня больше, чем внешность.',
    ),
  },

  s6u1_034_type_answer: {
    type: 'type_answer',
    instruction: L(
      '상대방의 성격을 설명하는 두 표현을 입력하세요.',
      'Odamning xarakterini ifodalovchi ikki ifodani kiriting.',
      'Type two expressions describing the person’s character.',
      'Введите два выражения, описывающих характер человека.',
    ),
    sentenceTemplate:
      '처음에는 조용해 보였지만 이야기를 해 보니 ___ 있었고 ___ 착했어요.',
    blankAnswers: ['매력이', '마음씨가'],
    answer: '매력이|마음씨가',
    answerTranslation: L(
      '이야기를 나누면서 매력과 착한 성품을 알게 되었어요.',
      'Suhbat davomida uning jozibasi va mehribonligini bildim.',
      'Through conversation, I discovered the person’s charm and kind nature.',
      'Во время разговора я заметил обаяние и доброту этого человека.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'After talking, the speaker discovers that the person is charming and kind-hearted.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_035_speaking: {
    type: 'speaking',
    instruction: L(
      '좋아하는 사람 앞에서 긴장했던 경험을 한 문장으로 말하세요.',
      'Yoqtirgan odam oldida hayajonlangan tajribangizni bir gap bilan ayting.',
      'Describe in one sentence being nervous around someone you like.',
      'Одним предложением расскажите о волнении рядом с человеком, который вам нравится.',
    ),
    answer: '좋아하는 사람과 이야기할 때 가슴이 두근거리고 얼굴이 빨개졌어요.',
    answerTranslation: L(
      '좋아하는 사람 앞에서 설레고 부끄러웠어요.',
      'Yoqtirgan odamim bilan gaplashganda yuragim dukillab, yuzim qizardi.',
      'My heart pounded and I blushed while talking to someone I liked.',
      'Во время разговора с человеком, который мне нравится, сердце сильно билось и я покраснел.',
    ),
  },

  s6u1_036_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '음성을 듣고 세 빈칸을 채우세요.',
      'Audioyozuvni tinglab, uchta bo‘sh joyni to‘ldiring.',
      'Listen and fill the three blanks.',
      'Прослушайте и заполните три пропуска.',
    ),
    audioText: '두 사람은 나란히 앉아 이야기하다가 집에 갈 때 손을 잡았어요.',
    sentenceTemplate: '두 사람은 ___ 앉아 ___하다가 집에 갈 때 ___ 잡았어요.',
    blankAnswers: ['나란히', '이야기', '손을'],
    answer: '나란히|이야기|손을',
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The dictated sentence says the two sat side by side, talked, and held hands on the way home.',
      acceptedAnswers: [],
      notes: ['Require the exact words from the Korean audio.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_037_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '연인이 서로 팔을 끼고 천천히 걸었다는 문장을 만드세요.',
      'Juftlik qo‘ltiqlashib sekin yurganini bildiruvchi gap tuzing.',
      'Build a sentence saying the couple walked slowly arm in arm.',
      'Составьте предложение о том, что пара медленно шла под руку.',
    ),
    options: ['천천히', '연인은', '팔짱을 끼고', '걸었어요', '혼자', '빠르게'],
    answer: '연인은 팔짱을 끼고 천천히 걸었어요',
    answerTranslation: L(
      '두 연인은 서로 팔을 끼고 천천히 걸었어요.',
      'Juftlik qo‘ltiqlashib sekin yurdi.',
      'The couple walked slowly arm in arm.',
      'Пара медленно шла под руку.',
    ),
  },

  s6u1_038_type_answer: {
    type: 'type_answer',
    instruction: L(
      '설렘을 나타내는 두 표현을 입력하세요.',
      'Hayajonni ifodalovchi ikki ifodani kiriting.',
      'Type two expressions showing romantic excitement.',
      'Введите два выражения, передающих романтическое волнение.',
    ),
    sentenceTemplate:
      '상대방이 손을 잡는 순간 ___ 두근거렸고, 부끄러워서 ___ 빨개졌어요.',
    blankAnswers: ['가슴이', '얼굴이'],
    answer: '가슴이|얼굴이',
    answerTranslation: L(
      '손을 잡는 순간 설레서 심장이 뛰고 얼굴도 붉어졌어요.',
      'Qo‘limni ushlagan paytda yuragim dukillab, uyalganimdan yuzim qizardi.',
      'My heart pounded and I blushed when the person held my hand.',
      'Когда человек взял меня за руку, сердце забилось сильнее и я покраснел.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The speaker’s heart pounded and face turned red when the other person held their hand.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_039_verb_transform: {
    type: 'verb_transform',
    instruction: L(
      '주어진 동사를 과거 해요체로 만드세요.',
      'Fe’lni o‘tgan zamon 해요체 shakliga aylantiring.',
      'Change the verb into past-tense haeyo style.',
      'Поставьте глагол в прошедшее время в стиле 해요체.',
    ),
    baseWord: '빨개지다',
    targetForm: '과거 · 해요체',
    options: ['요', '졌', '빨', '어', '개', '지'],
    answer: '빨개졌어요',
  },

  s6u1_040_translate_type: {
    type: 'translate_type',
    instruction: L(
      '상대방이 손을 잡자 설레고 부끄러웠다는 의미를 자연스러운 한국어로 쓰세요.',
      'U qo‘lingizni ushlaganida hayajonlanib, uyalganingizni tabiiy koreys tilida yozing.',
      'Write naturally in Korean that you became excited and shy when the person held your hand.',
      'Напишите естественно по-корейски, что вы разволновались и смутились, когда человек взял вас за руку.',
    ),
    answer: '그 사람이 손을 잡자 가슴이 두근거리고 얼굴이 빨개졌어요.',
    grading: {
      mode: 'semantic',
      expectedMeaning:
        'When the other person held the speaker’s hand, the speaker became romantically excited and embarrassed.',
      acceptedAnswers: [],
      notes: [
        'Preserve both the hand-holding event and the feelings of excitement and embarrassment.',
      ],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
  },

  // ─────────────────────────────
  // Lesson 3 · 연애의 시작
  // q041 ~ q060
  // ─────────────────────────────

  s6u1_041_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '여러 번 만난 뒤 두 사람이 연인이 되었다는 문장을 만드세요.',
      'Bir necha marta uchrashgandan keyin ular juftlik bo‘lganini bildiruvchi gap tuzing.',
      'Build a sentence saying the two started dating after meeting several times.',
      'Составьте предложение о том, что после нескольких встреч они начали встречаться.',
    ),
    options: [
      '시작했어요',
      '몇 번',
      '두 사람은',
      '사귀기',
      '만난 뒤',
      '헤어지기',
    ],
    answer: '두 사람은 몇 번 만난 뒤 사귀기 시작했어요',
    answerTranslation: L(
      '여러 번 만난 후 두 사람은 연인이 되었어요.',
      'Bir necha uchrashuvdan so‘ng ular uchrasha boshlashdi.',
      'After meeting several times, they started dating.',
      'После нескольких встреч они начали встречаться.',
    ),
  },

  s6u1_042_type_answer: {
    type: 'type_answer',
    instruction: L(
      '연애가 시작되는 상황에 맞는 두 표현을 입력하세요.',
      'Munosabat boshlanishiga mos ikki ifodani kiriting.',
      'Type the two expressions that fit the start of a relationship.',
      'Введите два выражения, подходящих к началу отношений.',
    ),
    sentenceTemplate:
      '민수 씨가 먼저 마음을 ___ 뒤 두 사람은 정식으로 ___ 시작했어요.',
    blankAnswers: ['고백한', '사귀기'],
    answer: '고백한|사귀기',
    answerTranslation: L(
      '민수 씨가 마음을 밝힌 뒤 두 사람은 연인이 되었어요.',
      'Minsu hislarini izhor qilgach, ular rasman uchrasha boshlashdi.',
      'After Minsu confessed his feelings, the two officially started dating.',
      'После признания Минсу они официально начали встречаться.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'After Minsu confessed his feelings, the two officially began dating.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_043_sentence_builder: {
    type: 'sentence_builder',
    instruction: L(
      '어절을 배열해 자연스러운 문장을 만드세요.',
      'Bo‘laklarni tartiblab tabiiy gap tuzing.',
      'Arrange the chunks into a natural sentence.',
      'Расположите части и составьте естественное предложение.',
    ),
    options: [
      '오랫동안',
      '사람에게',
      '마음을',
      '좋아하던',
      '고백했어요',
      '감췄어요',
    ],
    answer: '오랫동안 좋아하던 사람에게 마음을 고백했어요',
    audioText: '오랫동안 좋아하던 사람에게 마음을 고백했어요.',
    answerTranslation: L(
      '오랫동안 좋아했던 사람에게 제 감정을 말했어요.',
      'Anchadan beri yoqtirgan odamimga hislarimni izhor qildim.',
      'I confessed my feelings to someone I had liked for a long time.',
      'Я признался в чувствах человеку, который давно мне нравился.',
    ),
  },

  s6u1_044_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람의 관계가 달라진 계기를 고르세요.',
      'Ularning munosabati o‘zgargan sababni tanlang.',
      'Choose what caused the relationship between the two people to change.',
      'Выберите событие, после которого их отношения изменились.',
    ),
    passage:
      '현우와 지수는 오랫동안 친구였습니다. 현우는 지수를 좋아했지만 관계가 어색해질까 봐 말하지 못했습니다. 어느 날 지수도 같은 마음이라는 것을 알게 된 현우가 용기를 내어 고백했습니다. 그날부터 두 사람은 사귀기 시작했습니다.',
    options: [
      '현우가 자신의 마음을 고백한 것',
      '두 사람이 같은 회사에 입사한 것',
      '지수가 다른 도시로 이사한 것',
      '친구들이 둘을 만나지 못하게 한 것',
    ],
    answer: '현우가 자신의 마음을 고백한 것',
  },

  s6u1_045_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '함께 지내는 시간이 늘면서 서로 깊이 사랑하게 되었다는 문장을 만드세요.',
      'Birga o‘tkazgan vaqt ko‘paygani sari ular bir-birini sevib qolganini bildiruvchi gap tuzing.',
      'Build a sentence saying they fell in love as they spent more time together.',
      'Составьте предложение о том, что они влюбились друг в друга, проводя всё больше времени вместе.',
    ),
    options: [
      '빠졌어요',
      '함께',
      '사랑에',
      '지내면서',
      '두 사람은',
      '관심을 잃었어요',
    ],
    answer: '두 사람은 함께 지내면서 사랑에 빠졌어요',
    answerTranslation: L(
      '함께 시간을 보내면서 서로 사랑하게 되었어요.',
      'Birga vaqt o‘tkazib, ular bir-birini sevib qolishdi.',
      'They fell in love while spending time together.',
      'Проводя время вместе, они влюбились друг в друга.',
    ),
  },

  s6u1_046_type_answer: {
    type: 'type_answer',
    instruction: L(
      '관계의 변화를 나타내는 두 표현을 입력하세요.',
      'Munosabatdagi o‘zgarishni ko‘rsatuvchi ikki ifodani kiriting.',
      'Type the two expressions describing the change in their relationship.',
      'Введите два выражения, описывающих изменение отношений.',
    ),
    sentenceTemplate:
      '친구로 지내다가 서로에게 ___ 빠졌고 결국 ___ 시작했어요.',
    blankAnswers: ['사랑에', '사귀기'],
    answer: '사랑에|사귀기',
    answerTranslation: L(
      '친구였던 두 사람이 서로 사랑하게 되어 연인이 되었어요.',
      'Do‘st bo‘lgan ikki kishi sevib qolib, uchrasha boshlashdi.',
      'The two friends fell in love and eventually started dating.',
      'Друзья влюбились друг в друга и в конце концов начали встречаться.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'Two friends fell in love with each other and eventually started dating.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_047_listening: {
    type: 'listening',
    instruction: L(
      '음성을 듣고 두 사람이 사귀게 된 직접적인 계기를 고르세요.',
      'Audioyozuvni tinglab, ularning uchrasha boshlashiga bevosita sabab bo‘lgan voqeani tanlang.',
      'Listen and choose the event that directly led to the two people dating.',
      'Прослушайте и выберите событие, непосредственно приведшее к началу отношений.',
    ),
    audioText:
      '우리는 원래 같은 동아리 친구였어요. 자주 만나면서 서로 좋아하게 됐지만 아무 말도 못 했어요. 그런데 어느 날 그 사람이 먼저 좋아한다고 고백해서 그때부터 사귀게 됐어요.',
    options: [
      '상대방이 먼저 고백해서',
      '같은 동아리를 그만둬서',
      '친구들이 싸움을 해서',
      '서로 다른 학교로 가서',
    ],
    answer: '상대방이 먼저 고백해서',
  },

  s6u1_048_word_arrange: {
    type: 'word_arrange',
    instruction: L(
      '어절을 올바른 순서로 배열하세요.',
      'Bo‘laklarni to‘g‘ri tartiblang.',
      'Arrange the chunks in the correct order.',
      'Расположите части в правильном порядке.',
    ),
    options: ['대학 때부터', '오랫동안', '두 사람은', '연애했어요', '처음으로'],
    answer: '두 사람은 대학 때부터 오랫동안 연애했어요',
  },

  s6u1_049_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '오랫동안 숨겨 온 마음을 상대방에게 직접 말했다는 문장을 만드세요.',
      'Uzoq vaqt yashirib kelgan hislaringizni odamga bevosita aytganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying you finally told the other person about feelings you had hidden for a long time.',
      'Составьте предложение о том, что вы наконец рассказали человеку о давно скрываемых чувствах.',
    ),
    options: [
      '고백했어요',
      '상대방에게',
      '마음을',
      '숨겨 왔던',
      '오랫동안',
      '포기했어요',
    ],
    answer: '오랫동안 숨겨 왔던 마음을 상대방에게 고백했어요',
    answerTranslation: L(
      '오랫동안 말하지 못했던 감정을 상대방에게 밝혔어요.',
      'Uzoq vaqt aytolmagan hislarimni unga izhor qildim.',
      'I confessed feelings that I had kept hidden for a long time.',
      'Я признался человеку в чувствах, которые долго скрывал.',
    ),
  },

  s6u1_050_type_answer: {
    type: 'type_answer',
    instruction: L(
      '연애 관계를 설명하는 두 표현을 입력하세요.',
      'Romantik munosabatni ifodalovchi ikki iborani kiriting.',
      'Type two expressions describing the romantic relationship.',
      'Введите два выражения, описывающих романтические отношения.',
    ),
    sentenceTemplate:
      '두 사람은 대학 때부터 오래 ___ 왔고 지금도 서로 깊이 ___ 있어요.',
    blankAnswers: ['연애해', '사랑하고'],
    answer: '연애해|사랑하고',
    answerTranslation: L(
      '두 사람은 대학 때부터 연인으로 지냈고 지금도 서로 사랑해요.',
      'Ular universitet davridan beri uchrashishadi va hozir ham bir-birini sevishadi.',
      'They have dated since college and still love each other.',
      'Они встречаются со времён университета и до сих пор любят друг друга.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The couple has been in a romantic relationship since college and still loves each other.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_051_error_hunt: {
    type: 'error_hunt',
    instruction: L(
      '문맥에 맞지 않는 표현을 찾아 고치세요.',
      'Kontekstga mos kelmaydigan ifodani topib tuzating.',
      'Find the expression that does not fit the context and correct it.',
      'Найдите неподходящее выражение и исправьте его.',
    ),
    npcText: '서로 좋아한다는 것을 확인한 뒤 두 사람은 헤어지기 시작했어요.',
    wrongWord: '헤어지기',
    answer: '사귀기',
  },

  s6u1_052_cloze_passage: {
    type: 'cloze_passage',
    instruction: L(
      '관계의 흐름에 맞춰 세 빈칸을 채우세요.',
      'Munosabat rivojiga mos ravishda uchta bo‘sh joyni to‘ldiring.',
      'Fill the three blanks according to the progression of the relationship.',
      'Заполните три пропуска в соответствии с развитием отношений.',
    ),
    passage:
      '두 사람은 친구로 지내면서 점점 서로에게 ___ 빠졌습니다. 민수가 먼저 자신의 마음을 ___했고, 지수도 같은 마음이라고 말했습니다. 그날부터 두 사람은 ___ 시작했습니다.',
    blankAnswers: ['사랑에', '고백', '사귀기'],
    options: ['사랑에', '고백', '사귀기', '이별에', '거절', '싸우기'],
    answer: '사랑에|고백|사귀기',
  },

  s6u1_053_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '친구였던 두 사람이 점점 서로에게 특별한 감정을 느꼈다는 문장을 만드세요.',
      'Do‘st bo‘lgan ikki kishi asta-sekin bir-biriga nisbatan alohida hislar sezganini bildiruvchi gap tuzing.',
      'Build a sentence saying two friends gradually developed romantic feelings for each other.',
      'Составьте предложение о том, что двое друзей постепенно почувствовали друг к другу романтические чувства.',
    ),
    options: [
      '사랑에',
      '점점',
      '빠졌어요',
      '서로',
      '친구로 지내다가',
      '무관심해졌어요',
    ],
    answer: '친구로 지내다가 점점 서로 사랑에 빠졌어요',
    answerTranslation: L(
      '친구였던 두 사람이 점점 서로 사랑하게 되었어요.',
      'Do‘st bo‘lib yurib, ular asta-sekin bir-birini sevib qolishdi.',
      'While being friends, they gradually fell in love with each other.',
      'Будучи друзьями, они постепенно влюбились друг в друга.',
    ),
  },

  s6u1_054_type_answer: {
    type: 'type_answer',
    instruction: L(
      '문장의 의미를 완성하는 두 표현을 입력하세요.',
      'Gap ma’nosini tugallaydigan ikki ifodani kiriting.',
      'Type the two expressions that complete the sentence.',
      'Введите два выражения, завершающих смысл предложения.',
    ),
    sentenceTemplate:
      '마음을 ___ 것은 긴장됐지만, 상대방도 저를 좋아한다고 해서 결국 ___ 되었어요.',
    blankAnswers: ['고백하는', '사귀게'],
    answer: '고백하는|사귀게',
    answerTranslation: L(
      '마음을 말하는 것은 긴장됐지만 서로 좋아한다는 것을 알고 연인이 되었어요.',
      'Hislarimni izhor qilish hayajonli edi, lekin u ham meni yoqtirishini aytgach, biz uchrasha boshladik.',
      'Confessing was nerve-racking, but we started dating after learning the feelings were mutual.',
      'Признаваться было волнительно, но, узнав о взаимных чувствах, мы начали встречаться.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'Confessing was nerve-racking, but mutual feelings led to the two becoming a couple.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_055_speaking: {
    type: 'speaking',
    instruction: L(
      '오래 좋아한 사람에게 마음을 표현하는 상황을 한 문장으로 말하세요.',
      'Anchadan beri yoqtirgan odamga hislaringizni aytish vaziyatini bir gap bilan ifodalang.',
      'Say one sentence about confessing to someone you have liked for a long time.',
      'Одним предложением расскажите о признании человеку, который давно вам нравится.',
    ),
    answer: '오랫동안 좋아했는데 오늘은 용기를 내서 마음을 고백하고 싶어요.',
    answerTranslation: L(
      '오랫동안 좋아한 사람에게 오늘 마음을 말하고 싶어요.',
      'Anchadan beri yoqtiraman, bugun jur’at qilib hislarimni aytmoqchiman.',
      'I have liked the person for a long time, and today I want to gather my courage and confess.',
      'Мне давно нравится этот человек, и сегодня я хочу набраться смелости и признаться.',
    ),
  },

  s6u1_056_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '음성을 듣고 세 빈칸을 입력하세요.',
      'Audioyozuvni tinglab, uchta bo‘sh joyni kiriting.',
      'Listen and type the three missing expressions.',
      'Прослушайте и заполните три пропуска.',
    ),
    audioText:
      '우리는 친구로 지내다가 사랑에 빠졌고 제가 먼저 고백한 뒤 사귀기 시작했어요.',
    sentenceTemplate:
      '우리는 친구로 지내다가 ___ 빠졌고 제가 먼저 ___ 뒤 ___ 시작했어요.',
    blankAnswers: ['사랑에', '고백한', '사귀기'],
    answer: '사랑에|고백한|사귀기',
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The dictated sentence says two friends fell in love and started dating after the speaker confessed first.',
      acceptedAnswers: [],
      notes: ['Require the dictated Korean wording.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_057_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '대학 때부터 오랫동안 연인 관계를 이어 왔다는 문장을 만드세요.',
      'Universitet davridan beri uzoq vaqt romantik munosabatda bo‘lganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying the couple has been dating for a long time since college.',
      'Составьте предложение о том, что пара давно встречается ещё со времён университета.',
    ),
    options: [
      '왔어요',
      '대학 때부터',
      '연애해',
      '오랫동안',
      '두 사람은',
      '잠깐',
    ],
    answer: '두 사람은 대학 때부터 오랫동안 연애해 왔어요',
    answerTranslation: L(
      '두 사람은 대학 시절부터 오랫동안 연인으로 지냈어요.',
      'Ular universitet davridan beri uzoq vaqt uchrashib kelishmoqda.',
      'They have been dating for a long time since college.',
      'Они давно встречаются ещё со времён университета.',
    ),
  },

  s6u1_058_type_answer: {
    type: 'type_answer',
    instruction: L(
      '감정과 관계 변화를 나타내는 표현을 입력하세요.',
      'His-tuyg‘u va munosabat o‘zgarishini ifodalovchi iboralarni kiriting.',
      'Type the expressions showing the emotional and relationship changes.',
      'Введите выражения, показывающие изменение чувств и отношений.',
    ),
    sentenceTemplate:
      '자주 만나다 보니 자연스럽게 ___ 빠졌고 몇 달 뒤에는 정식으로 ___ 됐어요.',
    blankAnswers: ['사랑에', '사귀게'],
    answer: '사랑에|사귀게',
    answerTranslation: L(
      '자주 만나며 사랑하게 되었고 나중에는 연인이 되었어요.',
      'Tez-tez uchrashib, sevib qoldik va bir necha oy o‘tib juftlik bo‘ldik.',
      'Frequent meetings led them to fall in love and later become a couple.',
      'Частые встречи привели к любви, и через несколько месяцев они стали парой.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'Frequent meetings naturally led the two people to fall in love and later begin dating.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_059_verb_transform: {
    type: 'verb_transform',
    instruction: L(
      '주어진 동사를 과거 해요체로 활용하세요.',
      'Fe’lni o‘tgan zamon 해요체 shakliga aylantiring.',
      'Conjugate the verb into past-tense haeyo style.',
      'Поставьте глагол в прошедшее время в стиле 해요체.',
    ),
    baseWord: '사귀다',
    targetForm: '과거 · 해요체',
    options: ['사', '요', '었', '귀', '어', '가'],
    answer: '사귀었어요',
  },

  s6u1_060_translate_type: {
    type: 'translate_type',
    instruction: L(
      '친구로 지내던 두 사람이 서로 사랑하게 되어 결국 연인이 되었다는 의미를 자연스러운 한국어로 쓰세요.',
      'Do‘st bo‘lib yurgan ikki kishi sevib qolib, oxiri juftlik bo‘lganini tabiiy koreys tilida yozing.',
      'Write naturally in Korean that two friends fell in love and eventually became a couple.',
      'Напишите естественно по-корейски, что двое друзей влюбились и в итоге стали парой.',
    ),
    answer: '두 사람은 친구로 지내다가 서로 사랑에 빠져 사귀게 됐어요.',
    grading: {
      mode: 'semantic',
      expectedMeaning:
        'Two people who had been friends fell in love with each other and eventually started dating.',
      acceptedAnswers: [],
      notes: [
        'Preserve the progression from friendship to love to a romantic relationship.',
      ],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
  },

  // ─────────────────────────────
  // Lesson 4 · 서로 잘 맞는 사람
  // q061 ~ q080
  // ─────────────────────────────

  s6u1_061_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '두 사람의 성격이 서로 잘 어울린다는 문장을 만드세요.',
      'Ikki kishining xarakteri bir-biriga yaxshi mos kelishini bildiruvchi gap tuzing.',
      'Build a sentence saying the two people have compatible personalities.',
      'Составьте предложение о том, что эти двое хорошо подходят друг другу по характеру.',
    ),
    options: ['잘 맞아요', '두 사람은', '성격이', '서로', '전혀', '달라요'],
    answer: '두 사람은 서로 성격이 잘 맞아요',
    answerTranslation: L(
      '두 사람은 성격이 서로 잘 어울려요.',
      'Ularning xarakteri bir-biriga yaxshi mos keladi.',
      'Their personalities match well.',
      'Они хорошо подходят друг другу по характеру.',
    ),
  },

  s6u1_062_type_answer: {
    type: 'type_answer',
    instruction: L(
      '좋은 관계를 설명하는 두 표현을 입력하세요.',
      'Yaxshi munosabatni ifodalovchi ikki iborani kiriting.',
      'Type two expressions describing a compatible relationship.',
      'Введите два выражения, описывающих гармоничные отношения.',
    ),
    sentenceTemplate:
      '처음 만났을 때 ___ 좋았고 대화를 해 보니 서로 ___ 잘 통했어요.',
    blankAnswers: ['인상이', '말이'],
    answer: '인상이|말이',
    answerTranslation: L(
      '첫 느낌도 좋았고 대화도 자연스럽게 잘됐어요.',
      'Birinchi taassurot yaxshi edi va suhbat ham juda yaxshi chiqdi.',
      'The first impression was good, and conversation flowed naturally.',
      'Первое впечатление было хорошим, и разговор шёл очень легко.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The speaker had a good first impression and found that conversation flowed easily.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_063_sentence_builder: {
    type: 'sentence_builder',
    instruction: L(
      '어절을 배열해 자연스러운 문장을 만드세요.',
      'Bo‘laklarni tartiblab tabiiy gap tuzing.',
      'Arrange the chunks into a natural sentence.',
      'Расположите части в естественном порядке.',
    ),
    options: ['비슷하고', '취미도', '성격도', '잘 맞아요', '우리는', '전혀'],
    answer: '우리는 취미도 비슷하고 성격도 잘 맞아요',
    audioText: '우리는 취미도 비슷하고 성격도 잘 맞아요.',
    answerTranslation: L(
      '우리 둘은 취미가 비슷하고 성격도 서로 잘 맞아요.',
      'Bizning qiziqishlarimiz o‘xshash va xarakterimiz ham mos.',
      'We have similar hobbies and compatible personalities.',
      'У нас похожие увлечения, и мы хорошо подходим друг другу по характеру.',
    ),
  },

  s6u1_064_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글쓴이가 연인과 잘 맞는다고 생각하는 이유를 고르세요.',
      'Muallif nima uchun juftiga mos kelishini o‘ylashini tanlang.',
      'Choose why the writer thinks they are compatible with their partner.',
      'Выберите, почему автор считает, что хорошо подходит своему партнёру.',
    ),
    passage:
      '저와 제 남자 친구는 성격이 완전히 같지는 않습니다. 저는 조용한 편이고 남자 친구는 활동적입니다. 하지만 중요한 일을 결정할 때 생각이 비슷하고 서로의 이야기를 잘 들어 줍니다. 무엇보다 함께 있으면 대화가 끊이지 않습니다.',
    options: [
      '생각이 비슷하고 말이 잘 통하기 때문에',
      '두 사람의 성격이 완전히 똑같기 때문에',
      '항상 같은 옷을 입기 때문에',
      '서로 이야기를 거의 하지 않기 때문에',
    ],
    answer: '생각이 비슷하고 말이 잘 통하기 때문에',
  },

  s6u1_065_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '이야기할수록 상대방의 새로운 좋은 점을 발견한다는 문장을 만드세요.',
      'Suhbatlashgan sari odamning yangi yaxshi tomonlarini topayotganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying you discover more of the person’s charm as you talk.',
      'Составьте предложение о том, что во время общения вы замечаете всё больше привлекательных качеств человека.',
    ),
    options: [
      '느껴져요',
      '이야기할수록',
      '더',
      '그 사람의',
      '매력이',
      '사라져요',
    ],
    answer: '이야기할수록 그 사람의 매력이 더 느껴져요',
    answerTranslation: L(
      '대화를 많이 할수록 그 사람의 좋은 점이 더 보여요.',
      'Gaplashgan sari uning jozibali tomonlarini ko‘proq sezaman.',
      'The more we talk, the more I notice the person’s charm.',
      'Чем больше мы разговариваем, тем сильнее я замечаю обаяние этого человека.',
    ),
  },

  s6u1_066_type_answer: {
    type: 'type_answer',
    instruction: L(
      '성품과 궁합을 나타내는 두 표현을 입력하세요.',
      'Xarakter va moslikni ifodalovchi ikki iborani kiriting.',
      'Type two expressions describing kindness and compatibility.',
      'Введите два выражения, описывающих доброту и совместимость.',
    ),
    sentenceTemplate:
      '그 사람은 다른 사람을 잘 도와줄 만큼 ___ 착하고 저와도 ___ 잘 맞아요.',
    blankAnswers: ['마음씨가', '성격이'],
    answer: '마음씨가|성격이',
    answerTranslation: L(
      '그 사람은 마음이 착하고 저와 성격도 잘 맞아요.',
      'U juda mehribon va xarakteri men bilan ham yaxshi mos keladi.',
      'The person is kind-hearted and our personalities are compatible.',
      'Этот человек добрый, и мы хорошо подходим друг другу по характеру.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The person is kind-hearted and has a personality that matches the speaker well.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_067_listening: {
    type: 'listening',
    instruction: L(
      '음성을 듣고 화자가 가장 중요하게 생각하는 점을 고르세요.',
      'Audioyozuvni tinglab, so‘zlovchi eng muhim deb hisoblagan jihatni tanlang.',
      'Listen and choose what the speaker considers most important.',
      'Прослушайте и выберите, что говорящий считает самым важным.',
    ),
    audioText:
      '외모도 물론 중요할 수 있지만 저는 오래 만날 사람이라면 대화가 잘되는 게 더 중요하다고 생각해요. 서로 생각을 이해할 수 있고 말이 잘 통해야 편하게 지낼 수 있으니까요.',
    options: [
      '서로 말이 잘 통하는 것',
      '두 사람이 같은 옷을 입는 것',
      '상대방이 유명한 사람인 것',
      '매일 같은 장소에서 만나는 것',
    ],
    answer: '서로 말이 잘 통하는 것',
  },

  s6u1_068_word_arrange: {
    type: 'word_arrange',
    instruction: L(
      '어절을 올바르게 배열하세요.',
      'Bo‘laklarni to‘g‘ri tartiblang.',
      'Arrange the chunks correctly.',
      'Расставьте части в правильном порядке.',
    ),
    options: [
      '시간이',
      '가는 줄',
      '그 사람과는',
      '말이',
      '잘 통해서',
      '몰라요',
      '막혀서',
    ],
    answer: '그 사람과는 말이 잘 통해서 시간이 가는 줄 몰라요',
  },

  s6u1_069_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '생각과 관심사가 비슷해서 대화가 자연스럽게 이어진다는 문장을 만드세요.',
      'Fikr va qiziqishlar o‘xshash bo‘lgani uchun suhbat tabiiy davom etishini bildiruvchi gap tuzing.',
      'Build a sentence saying the conversation flows naturally because your thoughts and interests are similar.',
      'Составьте предложение о том, что разговор идёт естественно благодаря похожим взглядам и интересам.',
    ),
    options: [
      '비슷해서',
      '잘 통해요',
      '관심사가',
      '말이',
      '서로',
      '전혀 달라서',
    ],
    answer: '서로 관심사가 비슷해서 말이 잘 통해요',
    answerTranslation: L(
      '서로 좋아하는 것이 비슷해서 대화가 잘돼요.',
      'Qiziqishlarimiz o‘xshash bo‘lgani uchun yaxshi suhbatlashamiz.',
      'Our interests are similar, so we communicate well.',
      'У нас похожие интересы, поэтому мы легко находим общий язык.',
    ),
  },

  s6u1_070_type_answer: {
    type: 'type_answer',
    instruction: L(
      '첫인상과 매력을 나타내는 표현을 입력하세요.',
      'Birinchi taassurot va jozibani ifodalovchi iboralarni kiriting.',
      'Type expressions describing first impression and charm.',
      'Введите выражения, описывающие первое впечатление и обаяние.',
    ),
    sentenceTemplate:
      '처음에는 ___ 좋아서 관심이 갔는데, 이야기할수록 더 ___ 있었어요.',
    blankAnswers: ['인상이', '매력이'],
    answer: '인상이|매력이',
    answerTranslation: L(
      '처음에는 좋은 느낌을 받았고 대화할수록 더 매력적으로 느꼈어요.',
      'Avval yaxshi taassurot oldim, gaplashgan sari esa yanada jozibali tuyuldi.',
      'The first impression was good, and the person seemed even more charming as we talked.',
      'Первое впечатление было хорошим, а по мере разговора человек казался всё обаятельнее.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'A good first impression created interest, and the person seemed increasingly charming through conversation.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_071_error_hunt: {
    type: 'error_hunt',
    instruction: L(
      '문장의 의미와 맞지 않는 단어를 찾아 고치세요.',
      'Gap ma’nosiga mos kelmaydigan so‘zni topib tuzating.',
      'Find and correct the word that contradicts the sentence.',
      'Найдите и исправьте слово, противоречащее смыслу.',
    ),
    npcText: '그 사람은 어려운 사람을 항상 도와줄 만큼 마음씨가 나빠요.',
    wrongWord: '나빠요.',
    answer: '착해요.',
  },

  s6u1_072_cloze_passage: {
    type: 'cloze_passage',
    instruction: L(
      '세 빈칸을 문맥에 맞게 채우세요.',
      'Uchta bo‘sh joyni kontekstga mos to‘ldiring.',
      'Fill the three blanks based on the passage.',
      'Заполните три пропуска по контексту.',
    ),
    passage:
      '소개팅 전에는 외모가 가장 중요하다고 생각했습니다. 하지만 직접 만나 보니 상대방의 ___ 좋았고, 대화를 할수록 ___ 잘 통했습니다. 무엇보다 다른 사람을 배려하는 모습을 보고 ___ 착하다고 느꼈습니다.',
    blankAnswers: ['인상이', '말이', '마음씨가'],
    options: ['인상이', '마음씨가', '말이', '시간이', '얼굴이', '손이'],
    answer: '인상이|말이|마음씨가',
  },

  s6u1_073_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '성격은 조금 다르지만 서로의 말을 잘 이해해서 관계가 편하다는 문장을 만드세요.',
      'Xarakterlar biroz farq qilsa ham, bir-birini yaxshi tushungani uchun munosabat qulayligini bildiruvchi gap tuzing.',
      'Build a sentence saying your personalities differ somewhat but you communicate well and feel comfortable together.',
      'Составьте предложение о том, что характеры немного различаются, но благодаря хорошему взаимопониманию вам комфортно вместе.',
    ),
    options: [
      '편해요',
      '말이',
      '성격은',
      '조금 다르지만',
      '잘 통해서',
      '완전히 같아서',
    ],
    answer: '성격은 조금 다르지만 말이 잘 통해서 편해요',
    answerTranslation: L(
      '성격 차이는 있지만 대화가 잘되어 함께 있으면 편해요.',
      'Xarakterimiz biroz farq qiladi, lekin yaxshi gaplashganimiz uchun birga bo‘lish qulay.',
      'Our personalities differ a little, but we communicate well and feel comfortable together.',
      'Наши характеры немного различаются, но мы легко общаемся и чувствуем себя комфортно вместе.',
    ),
  },

  s6u1_074_type_answer: {
    type: 'type_answer',
    instruction: L(
      '관계가 잘 맞는 이유를 완성하세요.',
      'Munosabat nega mos ekanini tugallang.',
      'Complete the reasons the relationship works well.',
      'Дополните причины, по которым отношения складываются хорошо.',
    ),
    sentenceTemplate:
      '우리는 취미가 비슷하고 ___ 잘 맞으며 무슨 이야기든 ___ 잘 통해요.',
    blankAnswers: ['성격이', '말이'],
    answer: '성격이|말이',
    answerTranslation: L(
      '취미와 성격이 잘 맞고 대화도 잘돼요.',
      'Qiziqishlarimiz va xarakterimiz mos, suhbatimiz ham yaxshi.',
      'Our hobbies and personalities match, and we communicate well.',
      'Наши увлечения и характеры совпадают, и мы легко общаемся.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The two people share similar hobbies, have compatible personalities, and communicate well.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_075_speaking: {
    type: 'speaking',
    instruction: L(
      '어떤 사람과 연애하고 싶은지 성격을 중심으로 한 문장으로 말하세요.',
      'Qanday odam bilan munosabat qurishni xohlashingizni xarakteriga e’tibor berib bir gap bilan ayting.',
      'In one sentence, describe the personality of someone you would like to date.',
      'Одним предложением опишите характер человека, с которым вы хотели бы встречаться.',
    ),
    answer: '저는 마음씨가 착하고 저와 말이 잘 통하는 사람을 만나고 싶어요.',
    answerTranslation: L(
      '저는 친절하고 대화가 잘되는 사람을 만나고 싶어요.',
      'Men mehribon va men bilan yaxshi gaplasha oladigan odam bilan uchrashishni xohlayman.',
      'I want to date someone kind-hearted who communicates well with me.',
      'Я хочу встречаться с добрым человеком, с которым легко общаться.',
    ),
  },

  s6u1_076_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '음성을 듣고 세 빈칸을 채우세요.',
      'Audioyozuvni tinglab, uchta bo‘sh joyni to‘ldiring.',
      'Listen and fill the three blanks.',
      'Прослушайте и заполните три пропуска.',
    ),
    audioText:
      '우리는 성격이 잘 맞고 말도 잘 통하며 서로의 마음을 잘 이해해요.',
    sentenceTemplate:
      '우리는 ___ 잘 맞고 ___ 잘 통하며 서로의 ___ 잘 이해해요.',
    blankAnswers: ['성격이', '말도', '마음을'],
    answer: '성격이|말도|마음을',
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The dictated sentence says their personalities match, they communicate well, and understand each other’s feelings.',
      acceptedAnswers: [],
      notes: ['Require the exact Korean words from the audio.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_077_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '상대방의 외모보다 착한 마음과 잘 통하는 대화가 더 중요하다는 문장을 만드세요.',
      'Tashqi ko‘rinishdan ko‘ra mehribon qalb va yaxshi muloqot muhimroq ekanini bildiruvchi gap tuzing.',
      'Build a sentence saying kindness and good communication matter more than appearance.',
      'Составьте предложение о том, что доброта и хорошее взаимопонимание важнее внешности.',
    ),
    options: [
      '더 중요해요',
      '외모보다',
      '마음씨와',
      '잘 통하는 대화가',
      '착한',
      '재산이',
    ],
    answer: '외모보다 착한 마음씨와 잘 통하는 대화가 더 중요해요',
    answerTranslation: L(
      '저는 외모보다 착한 성격과 좋은 대화를 더 중요하게 생각해요.',
      'Men tashqi ko‘rinishdan ko‘ra mehribonlik va yaxshi muloqotni muhimroq deb bilaman.',
      'I value kindness and good communication more than appearance.',
      'Я считаю доброту и хорошее общение важнее внешности.',
    ),
  },

  s6u1_078_type_answer: {
    type: 'type_answer',
    instruction: L(
      '사람의 내적 매력을 설명하는 두 표현을 입력하세요.',
      'Insonning ichki jozibasini ifodalovchi ikki iborani kiriting.',
      'Type two expressions describing the person’s inner appeal.',
      'Введите два выражения, описывающих внутреннюю привлекательность человека.',
    ),
    sentenceTemplate:
      '다른 사람을 배려하는 모습을 보니 ___ 착한 사람이라는 생각이 들었고 더 ___ 느꼈어요.',
    blankAnswers: ['마음씨가', '매력을'],
    answer: '마음씨가|매력을',
    answerTranslation: L(
      '배려하는 모습을 보고 착한 성품과 매력을 느꼈어요.',
      'Uning boshqalarga e’tiborini ko‘rib, mehribonligi va jozibasini ko‘proq his qildim.',
      'Seeing the person care for others made me notice their kindness and charm.',
      'Увидев заботу о других, я сильнее почувствовал доброту и обаяние этого человека.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'Seeing the person care for others made the speaker recognize their kind nature and feel more attracted to them.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_079_verb_transform: {
    type: 'verb_transform',
    instruction: L(
      '주어진 동사를 의지를 나타내는 해요체로 만드세요.',
      'Fe’lni niyatni bildiruvchi 해요체 shakliga aylantiring.',
      'Change the verb into a haeyo-style form expressing intention.',
      'Поставьте глагол в форму 해요체, выражающую намерение.',
    ),
    baseWord: '고백하다',
    targetForm: '의지 · 해요체',
    options: ['고', '백', '요', '게', '할', '했'],
    answer: '고백할게요',
  },

  s6u1_080_translate_type: {
    type: 'translate_type',
    instruction: L(
      '외모보다 성격과 대화가 잘 맞는 것이 더 중요하다는 생각을 자연스러운 한국어로 쓰세요.',
      'Tashqi ko‘rinishdan ko‘ra xarakter va yaxshi muloqot muhimroq degan fikrni tabiiy koreys tilida yozing.',
      'Write naturally in Korean that compatible personalities and good communication are more important than appearance.',
      'Напишите естественно по-корейски, что совместимость характеров и хорошее общение важнее внешности.',
    ),
    answer:
      '저는 외모보다 성격이 잘 맞고 말이 잘 통하는 것이 더 중요하다고 생각해요.',
    grading: {
      mode: 'semantic',
      expectedMeaning:
        'The speaker believes compatible personalities and good communication are more important than physical appearance.',
      acceptedAnswers: [],
      notes: [
        'Accept natural paraphrases only when appearance is explicitly contrasted with personality compatibility and communication.',
      ],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
  },

  // ─────────────────────────────
  // Lesson 5 · 첫 만남부터 연애까지 종합
  // q081 ~ q100
  // ─────────────────────────────

  s6u1_081_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '첫 만남에서는 좋은 인상을 받았고 몇 번 더 만난 뒤 연인이 되었다는 문장을 만드세요.',
      'Birinchi uchrashuvda yaxshi taassurot olganingizni va bir necha uchrashuvdan keyin juftlik bo‘lganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying the first impression was good and you started dating after meeting several more times.',
      'Составьте предложение о хорошем первом впечатлении и начале отношений после нескольких встреч.',
    ),
    options: [
      '사귀게 됐어요',
      '인상이',
      '몇 번 더',
      '첫 만남에서',
      '좋았고',
      '만난 뒤',
      '헤어졌어요',
    ],
    answer: '첫 만남에서 인상이 좋았고 몇 번 더 만난 뒤 사귀게 됐어요',
    answerTranslation: L(
      '첫 느낌이 좋았고 몇 번 더 만난 뒤 연인이 되었어요.',
      'Birinchi taassurot yaxshi edi va yana bir necha marta uchrashgach, munosabat boshladik.',
      'The first impression was good, and after several more meetings we started dating.',
      'Первое впечатление было хорошим, и после ещё нескольких встреч мы начали встречаться.',
    ),
  },

  s6u1_082_type_answer: {
    type: 'type_answer',
    instruction: L(
      '첫 만남에서 연애로 이어지는 흐름을 완성하세요.',
      'Birinchi uchrashuvdan munosabatga o‘tish jarayonini tugallang.',
      'Complete the progression from the first meeting to a relationship.',
      'Дополните переход от первой встречи к отношениям.',
    ),
    sentenceTemplate:
      '처음 만났을 때 ___ 좋았고 대화하면서 ___ 잘 통해서 계속 만나게 됐어요.',
    blankAnswers: ['인상이', '말이'],
    answer: '인상이|말이',
    answerTranslation: L(
      '좋은 첫인상과 잘되는 대화 때문에 계속 만나게 되었어요.',
      'Yaxshi birinchi taassurot va yaxshi suhbat sabab yana uchrashishda davom etdik.',
      'A good first impression and easy conversation led us to keep seeing each other.',
      'Хорошее первое впечатление и лёгкое общение привели к тому, что мы продолжили встречаться.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'A good first impression and easy communication led the two people to continue meeting.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_083_sentence_builder: {
    type: 'sentence_builder',
    instruction: L(
      '어절을 배열해 관계의 변화를 설명하세요.',
      'Bo‘laklarni tartiblab munosabatdagi o‘zgarishni ifodalang.',
      'Arrange the chunks to describe how the relationship changed.',
      'Расположите части и опишите изменение отношений.',
    ),
    options: [
      '고백한 뒤',
      '친구로 지내다가',
      '사귀게 됐어요',
      '마음을',
      '제가 먼저',
      '헤어진 뒤',
    ],
    answer: '친구로 지내다가 제가 먼저 마음을 고백한 뒤 사귀게 됐어요',
    audioText: '친구로 지내다가 제가 먼저 마음을 고백한 뒤 사귀게 됐어요.',
    answerTranslation: L(
      '친구였지만 제가 먼저 마음을 말한 뒤 연인이 되었어요.',
      'Do‘st bo‘lib yurardik, keyin men birinchi bo‘lib hislarimni aytdim va uchrasha boshladik.',
      'We were friends, but after I confessed first, we started dating.',
      'Мы были друзьями, но после моего признания начали встречаться.',
    ),
  },

  s6u1_084_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글의 흐름에 가장 잘 맞는 두 사람의 관계를 고르세요.',
      'Matn mazmuniga eng mos munosabat holatini tanlang.',
      'Choose the relationship status that best matches the passage.',
      'Выберите статус отношений, который лучше всего соответствует тексту.',
    ),
    passage:
      '유나는 친구의 소개로 준호를 만났습니다. 처음에는 별 기대가 없었지만 준호는 다른 사람을 배려했고 말도 잘 통했습니다. 몇 번 더 만나면서 유나는 준호에게 점점 매력을 느꼈습니다. 준호가 먼저 마음을 고백했고 유나도 같은 마음이라고 대답했습니다.',
    options: [
      '서로 호감을 확인하고 사귀기 시작할 가능성이 높다',
      '다시는 만나지 않을 가능성이 높다',
      '서로에게 아무 관심도 없다',
      '두 사람은 이미 오래전에 헤어졌다',
    ],
    answer: '서로 호감을 확인하고 사귀기 시작할 가능성이 높다',
  },

  s6u1_085_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '처음에는 기대하지 않았지만 상대방의 성격 때문에 점점 좋아하게 되었다는 문장을 만드세요.',
      'Avval hech narsa kutmagan bo‘lsangiz ham, uning xarakteri tufayli asta-sekin yoqtirib qolganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying you had no expectations at first but gradually liked the person because of their personality.',
      'Составьте предложение о том, что сначала вы ничего не ожидали, но постепенно полюбили человека за характер.',
    ),
    options: [
      '점점',
      '좋아졌어요',
      '처음에는',
      '성격을 알고 나니',
      '기대하지 않았지만',
      '싫어졌어요',
    ],
    answer: '처음에는 기대하지 않았지만 성격을 알고 나니 점점 좋아졌어요',
    answerTranslation: L(
      '처음에는 기대가 없었지만 그 사람의 성격을 알수록 호감이 생겼어요.',
      'Avval hech narsa kutmagandim, lekin xarakterini bilgach asta-sekin yoqtirib qoldim.',
      'I had no expectations at first, but I gradually liked the person after getting to know their personality.',
      'Сначала я ничего не ожидал, но, узнав характер человека, постепенно начал испытывать симпатию.',
    ),
  },

  s6u1_086_type_answer: {
    type: 'type_answer',
    instruction: L(
      '호감이 깊어지는 과정을 나타내는 두 표현을 입력하세요.',
      'Yoqtirishning kuchayishini bildiruvchi ikki ifodani kiriting.',
      'Type two expressions showing how attraction deepens.',
      'Введите два выражения, показывающих, как усиливается симпатия.',
    ),
    sentenceTemplate:
      '처음에는 단순히 ___ 좋다고 생각했는데 자주 만나면서 그 사람의 ___ 더 느끼게 됐어요.',
    blankAnswers: ['인상이', '매력을'],
    answer: '인상이|매력을',
    answerTranslation: L(
      '처음에는 첫 느낌만 좋았지만 만나면서 더 많은 매력을 알게 되었어요.',
      'Avval faqat birinchi taassurot yaxshi edi, lekin uchrashgan sari uning jozibasini ko‘proq sezdim.',
      'At first it was only a good impression, but repeated meetings revealed more of the person’s charm.',
      'Сначала было лишь хорошее первое впечатление, но при дальнейших встречах я всё сильнее замечал обаяние человека.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'A good first impression develops into stronger attraction as the speaker gets to know the person.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_087_listening: {
    type: 'listening',
    instruction: L(
      '음성을 듣고 화자의 감정이 변한 순서를 고르세요.',
      'Audioyozuvni tinglab, so‘zlovchining hislari qanday o‘zgarganini tanlang.',
      'Listen and choose the correct progression of the speaker’s feelings.',
      'Прослушайте и выберите правильную последовательность изменения чувств.',
    ),
    audioText:
      '소개팅 전에는 별 기대가 없었어요. 그런데 직접 만나 보니 인상이 좋았고 말도 잘 통했어요. 몇 번 더 만나면서 점점 사랑에 빠졌고 결국 제가 먼저 고백했어요.',
    options: [
      '기대 없음 → 좋은 인상 → 사랑에 빠짐 → 고백',
      '사랑에 빠짐 → 이별 → 소개팅 → 고백',
      '좋은 인상 → 싸움 → 관심 없음 → 고백',
      '고백 → 첫 만남 → 좋은 인상 → 사랑에 빠짐',
    ],
    answer: '기대 없음 → 좋은 인상 → 사랑에 빠짐 → 고백',
  },

  s6u1_088_word_arrange: {
    type: 'word_arrange',
    instruction: L(
      '어절을 올바른 순서로 배열하세요.',
      'Bo‘laklarni to‘g‘ri tartiblang.',
      'Put the chunks in the correct order.',
      'Расположите части в правильном порядке.',
    ),
    options: [
      '점점',
      '만나면서',
      '서로',
      '두 사람은',
      '사랑에 빠졌어요',
      '몇 번 더',
      '멀어졌어요',
    ],
    answer: '두 사람은 몇 번 더 만나면서 점점 서로 사랑에 빠졌어요',
  },

  s6u1_089_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '서로 대화와 성격이 잘 맞아서 자연스럽게 가까워졌다는 문장을 만드세요.',
      'Suhbat va xarakter yaxshi mos kelgani uchun tabiiy ravishda yaqinlashganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying the two naturally grew closer because they communicated well and had compatible personalities.',
      'Составьте предложение о том, что они естественно сблизились благодаря хорошему общению и совместимым характерам.',
    ),
    options: [
      '자연스럽게',
      '성격도',
      '말도 잘 통하고',
      '잘 맞아서',
      '가까워졌어요',
      '멀어졌어요',
    ],
    answer: '말도 잘 통하고 성격도 잘 맞아서 자연스럽게 가까워졌어요',
    answerTranslation: L(
      '대화와 성격이 잘 맞아서 자연스럽게 친해졌어요.',
      'Suhbatimiz va xarakterimiz mos kelgani uchun tabiiy ravishda yaqinlashdik.',
      'We naturally became closer because we communicated well and our personalities matched.',
      'Мы естественно сблизились, потому что легко общались и подходили друг другу по характеру.',
    ),
  },

  s6u1_090_type_answer: {
    type: 'type_answer',
    instruction: L(
      '연애가 시작되는 결정적인 두 표현을 입력하세요.',
      'Munosabat boshlanishidagi ikki muhim ifodani kiriting.',
      'Type the two key expressions marking the start of the relationship.',
      'Введите два ключевых выражения, обозначающих начало отношений.',
    ),
    sentenceTemplate:
      '서로 같은 마음이라는 것을 안 뒤 제가 먼저 마음을 ___했고 그날부터 ___ 시작했어요.',
    blankAnswers: ['고백', '사귀기'],
    answer: '고백|사귀기',
    answerTranslation: L(
      '서로 좋아한다는 것을 알고 마음을 말한 뒤 연인이 되었어요.',
      'Hislarimiz o‘zaro ekanini bilib, men hislarimni izhor qildim va o‘sha kundan uchrasha boshladik.',
      'After realizing the feelings were mutual, I confessed and we started dating that day.',
      'Поняв, что чувства взаимны, я признался, и с того дня мы начали встречаться.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'After realizing their feelings were mutual, the speaker confessed and the two began dating.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_091_error_hunt: {
    type: 'error_hunt',
    instruction: L(
      '문맥에 맞지 않는 표현 하나를 찾아 고치세요.',
      'Kontekstga mos kelmaydigan bitta ifodani topib tuzating.',
      'Find and correct the one expression that does not fit.',
      'Найдите и исправьте одно выражение, не подходящее по смыслу.',
    ),
    npcText: '첫 만남부터 말이 잘 통해서 서로 대화하는 것이 불편했어요.',
    wrongWord: '불편했어요.',
    answer: '편했어요.',
  },

  s6u1_092_cloze_passage: {
    type: 'cloze_passage',
    instruction: L(
      '전체 관계의 흐름을 생각하며 세 빈칸을 채우세요.',
      'Butun munosabat rivojini hisobga olib, uchta bo‘sh joyni to‘ldiring.',
      'Fill the three blanks by following the development of the relationship.',
      'Заполните три пропуска, учитывая развитие отношений.',
    ),
    passage:
      '친구의 소개로 처음 만났을 때 상대방의 ___ 좋았습니다. 여러 번 만나면서 ___ 잘 맞는다는 것도 알게 되었습니다. 결국 서로 사랑하게 되어 정식으로 ___ 시작했습니다.',
    blankAnswers: ['인상이', '성격이', '사귀기'],
    options: ['사귀기', '인상이', '성격이', '얼굴이', '일하기', '시간이'],
    answer: '인상이|성격이|사귀기',
  },

  s6u1_093_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '좋은 첫인상만으로 결정하지 않고 여러 번 만나며 상대방을 알아갔다는 문장을 만드세요.',
      'Faqat birinchi taassurot bilan xulosa qilmay, bir necha bor uchrashib odamni yaxshiroq taniganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying you did not decide based only on first impressions and got to know the person through several meetings.',
      'Составьте предложение о том, что вы не стали судить только по первому впечатлению и узнавали человека постепенно.',
    ),
    options: [
      '알아갔어요',
      '첫인상만으로',
      '여러 번',
      '결정하지 않고',
      '만나면서',
      '바로 헤어졌어요',
    ],
    answer: '첫인상만으로 결정하지 않고 여러 번 만나면서 알아갔어요',
    answerTranslation: L(
      '첫 느낌만 보고 판단하지 않고 계속 만나면서 상대방을 알아갔어요.',
      'Faqat birinchi taassurot bilan hukm qilmay, bir necha bor uchrashib uni yaxshiroq tanidim.',
      'I did not judge based only on the first impression and got to know the person over several meetings.',
      'Я не стал судить только по первому впечатлению и лучше узнавал человека на нескольких встречах.',
    ),
  },

  s6u1_094_type_answer: {
    type: 'type_answer',
    instruction: L(
      '관계가 깊어지는 과정을 나타내는 두 표현을 입력하세요.',
      'Munosabat chuqurlashishini ko‘rsatuvchi ikki ifodani kiriting.',
      'Type the two expressions showing the relationship becoming deeper.',
      'Введите два выражения, показывающих развитие отношений.',
    ),
    sentenceTemplate: '자주 만나면서 서로에게 ___ 빠졌고 결국 오래 ___ 됐어요.',
    blankAnswers: ['사랑에', '연애하게'],
    answer: '사랑에|연애하게',
    answerTranslation: L(
      '자주 만나며 서로 사랑하게 되었고 오랫동안 연애했어요.',
      'Tez-tez uchrashib, sevib qoldik va uzoq vaqt munosabatda bo‘ldik.',
      'Frequent meetings led them to fall in love and date for a long time.',
      'Частые встречи привели к любви и долгим отношениям.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'By meeting frequently, the two fell in love and entered a long-term romantic relationship.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_095_speaking: {
    type: 'speaking',
    instruction: L(
      '좋은 연애 관계에서 중요하다고 생각하는 점을 한 문장으로 말하세요.',
      'Yaxshi romantik munosabatda muhim deb bilgan jihatingizni bir gap bilan ayting.',
      'In one sentence, say what you think is important in a good romantic relationship.',
      'Одним предложением скажите, что вы считаете важным в хороших романтических отношениях.',
    ),
    answer:
      '서로 성격이 잘 맞고 어떤 이야기든 편하게 할 수 있는 것이 중요해요.',
    answerTranslation: L(
      '서로 잘 이해하고 편하게 대화할 수 있는 관계가 중요해요.',
      'Bir-birini tushunish va bemalol suhbatlasha olish muhim.',
      'It is important to be compatible and able to talk comfortably about anything.',
      'Важно подходить друг другу и уметь свободно говорить обо всём.',
    ),
  },

  s6u1_096_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '음성을 듣고 세 빈칸을 직접 입력하세요.',
      'Audioyozuvni tinglab, uchta bo‘sh joyni kiriting.',
      'Listen and type the three missing expressions.',
      'Прослушайте и заполните три пропуска.',
    ),
    audioText:
      '처음에는 인상이 좋았고 몇 번 더 만나면서 사랑에 빠져 결국 사귀게 됐어요.',
    sentenceTemplate:
      '처음에는 ___ 좋았고 몇 번 더 만나면서 ___ 빠져 결국 ___ 됐어요.',
    blankAnswers: ['인상이', '사랑에', '사귀게'],
    answer: '인상이|사랑에|사귀게',
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The dictated sentence describes a good first impression, falling in love after more meetings, and eventually dating.',
      acceptedAnswers: [],
      notes: ['Require the exact dictated expressions.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_097_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '대화가 잘되고 성격도 맞아서 상대방에게 점점 끌렸다는 문장을 만드세요.',
      'Suhbat yaxshi chiqib, xarakter ham mos kelgani uchun odamga tobora ko‘proq jalb bo‘lganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying you became increasingly attracted because conversation flowed and your personalities matched.',
      'Составьте предложение о том, что вас всё больше привлекал человек благодаря хорошему общению и совместимости характеров.',
    ),
    options: [
      '점점',
      '말도 잘 통하고',
      '끌렸어요',
      '성격도 잘 맞아서',
      '그 사람에게',
      '관심이 없어졌어요',
    ],
    answer: '말도 잘 통하고 성격도 잘 맞아서 그 사람에게 점점 끌렸어요',
    answerTranslation: L(
      '대화와 성격이 잘 맞아서 점점 그 사람을 좋아하게 되었어요.',
      'Suhbatimiz va xarakterimiz mos kelgani uchun uni tobora ko‘proq yoqtirdim.',
      'I became increasingly attracted to the person because we communicated well and our personalities matched.',
      'Я всё больше тянулся к этому человеку, потому что мы легко общались и подходили друг другу по характеру.',
    ),
  },

  s6u1_098_type_answer: {
    type: 'type_answer',
    instruction: L(
      '첫 만남부터 연애 시작까지의 핵심 표현 두 개를 입력하세요.',
      'Birinchi uchrashuvdan munosabat boshlanishigacha bo‘lgan ikkita asosiy ifodani kiriting.',
      'Type two key expressions describing the path from first meeting to dating.',
      'Введите два ключевых выражения, описывающих путь от первой встречи к отношениям.',
    ),
    sentenceTemplate:
      '친구가 ___을 주선해 줬고 몇 번 만난 뒤 서로 좋아한다는 것을 확인해 ___ 시작했어요.',
    blankAnswers: ['소개팅', '사귀기'],
    answer: '소개팅|사귀기',
    answerTranslation: L(
      '소개팅으로 만나 서로 좋아하게 된 뒤 연인이 되었어요.',
      'Tanishuv uchrashuvida uchrashib, bir-birini yoqtirgach, uchrasha boshlashdi.',
      'They met on a blind date and started dating after realizing they liked each other.',
      'Они познакомились на свидании по знакомству и начали встречаться, поняв, что нравятся друг другу.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'A blind date led to repeated meetings, mutual feelings, and eventually a romantic relationship.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_099_verb_transform: {
    type: 'verb_transform',
    instruction: L(
      '주어진 동사를 과거 해요체로 만드세요.',
      'Fe’lni o‘tgan zamon 해요체 shakliga aylantiring.',
      'Change the verb into past-tense haeyo style.',
      'Поставьте глагол в прошедшее время в стиле 해요체.',
    ),
    baseWord: '반하다',
    targetForm: '과거 · 해요체',
    options: ['반', '어', '요', '했', '하', '았'],
    answer: '반했어요',
  },

  s6u1_100_translate_type: {
    type: 'translate_type',
    instruction: L(
      '친구의 소개로 만난 두 사람이 좋은 첫인상과 잘 맞는 성격 덕분에 가까워지고 결국 연인이 되었다는 내용을 자연스러운 한국어로 쓰세요.',
      'Do‘st orqali tanishgan ikki kishi yaxshi birinchi taassurot va mos xarakter tufayli yaqinlashib, oxirida juftlik bo‘lganini tabiiy koreys tilida yozing.',
      'Write naturally in Korean that two people introduced by a friend grew closer because of a good first impression and compatible personalities and eventually began dating.',
      'Напишите естественно по-корейски, что двое, познакомившихся через друга, сблизились благодаря хорошему первому впечатлению и совместимым характерам и в итоге начали встречаться.',
    ),
    answer:
      '두 사람은 친구의 소개로 만나 좋은 인상을 받았고 성격도 잘 맞아서 가까워진 뒤 사귀게 됐어요.',
    grading: {
      mode: 'semantic',
      expectedMeaning:
        'Two people met through a friend, had a good first impression, discovered that their personalities were compatible, grew closer, and eventually started dating.',
      acceptedAnswers: [],
      notes: [
        'Accept natural Korean paraphrases only when the introduction, positive first impression, compatibility, growing closeness, and eventual romantic relationship are all preserved.',
      ],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────
// Section 6 · Unit 1 · Node 2
// 결혼을 결정하고 준비하기
// q101 ~ q200
// ─────────────────────────────────────────────────────────────

export const S6_UNIT1_NODE2_WORDS = [
  {
    code: 'marriage-formal-match',
    korean: '맞선',
    senseKey: 'marriage-oriented-meeting',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '결혼을 생각하는 두 사람이 소개를 받아 만나는 자리',
      uz: 'turmush qurish maqsadidagi tanishuv uchrashuvi',
      en: 'a marriage-oriented arranged meeting',
      ru: 'встреча для знакомства с целью брака',
    },
    examples: [
      {
        korean: '부모님의 소개로 맞선을 봤지만 결혼은 천천히 결정하고 싶어요.',
        translations: {
          ko: '부모님이 소개한 사람을 만났지만 결혼 결정은 서두르고 싶지 않아요.',
          uz: 'Ota-onam tanishtirgan odam bilan uchrashdim, lekin nikoh haqida shoshilmay qaror qilmoqchiman.',
          en: 'I met someone through my parents, but I want to decide about marriage slowly.',
          ru: 'Я встретился с человеком, которого представили родители, но не хочу спешить с решением о браке.',
        },
      },
    ],
    pronunciation: {
      hangul: '맞선',
      romanization: 'matseon',
      ttsText: '맞선',
    },
    media: {
      emoji: '☕',
      imageUrl: '',
      imageAlt: {
        ko: '결혼을 생각하며 처음 만나는 두 사람',
        uz: 'nikoh haqida o‘ylab birinchi marta uchrashayotgan ikki kishi',
        en: 'two people meeting with marriage in mind',
        ru: 'двое людей, знакомящихся с целью брака',
      },
    },
    tags: ['marriage', 'matchmaking', 'meeting'],
    difficulty: 5,
    usageNote: {
      ko: '`소개팅`보다 결혼을 전제로 만난다는 의미가 강해요.',
      uz: '`소개팅`ga qaraganda turmush qurish niyati kuchliroq bo‘lgan uchrashuvni anglatadi.',
      en: 'Unlike a casual blind date, this meeting usually has marriage as a serious goal.',
      ru: 'В отличие от обычного свидания по знакомству, такая встреча обычно предполагает серьёзное намерение вступить в брак.',
    },
    isCore: true,
  },
  {
    code: 'marriage-propose',
    korean: '청혼하다',
    senseKey: 'propose-marriage',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '상대방에게 자신과 결혼해 달라고 말하다',
      uz: 'turmush qurishni taklif qilmoq',
      en: 'to propose marriage',
      ru: 'сделать предложение руки и сердца',
    },
    examples: [
      {
        korean: '오랫동안 연애한 뒤 남자 친구가 결혼하자고 청혼했어요.',
        translations: {
          ko: '오랫동안 사귄 뒤 남자 친구가 저와 결혼하고 싶다고 말했어요.',
          uz: 'Uzoq vaqt uchrashganimizdan keyin yigitim menga turmush qurishni taklif qildi.',
          en: 'After dating for a long time, my boyfriend proposed marriage.',
          ru: 'После долгих отношений мой парень сделал мне предложение.',
        },
      },
    ],
    pronunciation: {
      hangul: '청혼하다',
      romanization: 'cheonghonhada',
      ttsText: '청혼하다',
    },
    media: {
      emoji: '💍',
      imageUrl: '',
      imageAlt: {
        ko: '결혼을 제안하는 사람',
        uz: 'turmush qurishni taklif qilayotgan odam',
        en: 'a person proposing marriage',
        ru: 'человек, делающий предложение',
      },
    },
    tags: ['marriage', 'proposal', 'relationship'],
    difficulty: 4,
    usageNote: {
      ko: '결혼 의사를 공식적으로 표현할 때 쓰는 말이에요.',
      uz: 'Nikoh niyatini aniq va jiddiy tarzda bildirishda ishlatiladi.',
      en: 'Used when formally expressing the desire to marry someone.',
      ru: 'Употребляется, когда человек официально выражает желание вступить в брак.',
    },
    isCore: true,
  },
  {
    code: 'marriage-honeymoon',
    korean: '신혼여행',
    senseKey: 'honeymoon',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '결혼한 부부가 결혼 직후 함께 떠나는 여행',
      uz: 'asal oyi sayohati',
      en: 'honeymoon',
      ru: 'свадебное путешествие',
    },
    examples: [
      {
        korean: '결혼식이 끝난 다음 날 신혼여행을 떠날 예정이에요.',
        translations: {
          ko: '결혼식을 마친 다음 날 두 사람이 함께 여행을 갈 거예요.',
          uz: 'To‘ydan keyingi kuni asal oyi sayohatiga ketamiz.',
          en: 'We are going on our honeymoon the day after the wedding.',
          ru: 'На следующий день после свадьбы мы отправимся в свадебное путешествие.',
        },
      },
    ],
    pronunciation: {
      hangul: '신혼여행',
      romanization: 'sinhonyeohaeng',
      ttsText: '신혼여행',
    },
    media: {
      emoji: '✈️',
      imageUrl: '',
      imageAlt: {
        ko: '신혼부부의 여행',
        uz: 'yangi turmush qurgan juftlikning sayohati',
        en: 'a newlywed couple traveling',
        ru: 'путешествие молодожёнов',
      },
    },
    tags: ['marriage', 'honeymoon', 'travel'],
    difficulty: 4,
    usageNote: {
      ko: '결혼 직후 부부가 함께 떠나는 여행을 말해요.',
      uz: 'Yangi turmush qurgan juftlikning nikohdan keyingi sayohatini anglatadi.',
      en: 'Refers to a trip taken together shortly after marriage.',
      ru: 'Так называют совместное путешествие супругов вскоре после свадьбы.',
    },
    isCore: true,
  },
  {
    code: 'marriage-arranged-marriage',
    korean: '중매결혼',
    senseKey: 'arranged-marriage',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '다른 사람의 중매나 소개를 통해 상대를 만나 하는 결혼',
      uz: 'vositachi orqali tuzilgan nikoh',
      en: 'arranged marriage',
      ru: 'брак по сватовству',
    },
    examples: [
      {
        korean: '예전에는 중매결혼을 하는 경우도 많았다고 해요.',
        translations: {
          ko: '예전에는 다른 사람의 소개로 만나 결혼하는 경우도 많았어요.',
          uz: 'Ilgari vositachi orqali tanishib turmush qurish holatlari ko‘p bo‘lgan.',
          en: 'Arranged marriages were more common in the past.',
          ru: 'Раньше браки по сватовству встречались чаще.',
        },
      },
    ],
    pronunciation: {
      hangul: '중매결혼',
      romanization: 'jungmaegyeolhon',
      ttsText: '중매결혼',
    },
    media: {
      emoji: '🤝',
      imageUrl: '',
      imageAlt: {
        ko: '소개를 통해 만나는 두 사람',
        uz: 'vositachi orqali tanishgan ikki kishi',
        en: 'two people introduced through a matchmaker',
        ru: 'двое людей, познакомившихся через посредника',
      },
    },
    tags: ['marriage', 'matchmaking', 'culture'],
    difficulty: 5,
    usageNote: {
      ko: '`연애결혼`과 대비해서 자주 사용해요.',
      uz: 'Ko‘pincha `연애결혼` bilan qarama-qarshi ma’noda ishlatiladi.',
      en: 'Often contrasted with a marriage based on a romantic relationship.',
      ru: 'Часто противопоставляется браку по любви.',
    },
    isCore: true,
  },
  {
    code: 'marriage-love-marriage',
    korean: '연애결혼',
    senseKey: 'love-marriage',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '서로 연애한 사람들이 사랑을 바탕으로 하는 결혼',
      uz: 'sevgi asosidagi nikoh',
      en: 'love marriage',
      ru: 'брак по любви',
    },
    examples: [
      {
        korean: '두 사람은 대학 때부터 사귀다가 연애결혼을 했어요.',
        translations: {
          ko: '대학 때부터 연애한 두 사람이 사랑해서 결혼했어요.',
          uz: 'Ular universitet davridan beri uchrashib, keyin sevgi asosida turmush qurishdi.',
          en: 'They dated since college and later married for love.',
          ru: 'Они встречались со времён университета, а потом поженились по любви.',
        },
      },
    ],
    pronunciation: {
      hangul: '연애결혼',
      romanization: 'yeonaegyeolhon',
      ttsText: '연애결혼',
    },
    media: {
      emoji: '❤️',
      imageUrl: '',
      imageAlt: {
        ko: '사랑해서 결혼한 두 사람',
        uz: 'sevib turmush qurgan juftlik',
        en: 'a couple marrying for love',
        ru: 'пара, вступающая в брак по любви',
      },
    },
    tags: ['marriage', 'romance', 'culture'],
    difficulty: 5,
    usageNote: {
      ko: '연애를 통해 서로 사랑하게 된 두 사람이 결혼하는 것을 말해요.',
      uz: 'Romantik munosabat davomida sevib qolgan ikki kishining nikohini anglatadi.',
      en: 'Describes marriage between people who developed a romantic relationship first.',
      ru: 'Так называют брак людей, которые сначала состояли в романтических отношениях.',
    },
    isCore: true,
  },
  {
    code: 'marriage-wedding-invitation',
    korean: '청첩장',
    senseKey: 'wedding-invitation',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '결혼식 날짜와 장소를 알리며 사람을 초대하는 카드나 문서',
      uz: 'to‘y taklifnomasi',
      en: 'wedding invitation',
      ru: 'свадебное приглашение',
    },
    examples: [
      {
        korean: '결혼 날짜가 정해져서 친구들에게 청첩장을 보냈어요.',
        translations: {
          ko: '결혼식 날짜를 정한 뒤 친구들을 초대하는 카드를 보냈어요.',
          uz: 'To‘y sanasi belgilangach, do‘stlarimga taklifnoma yubordim.',
          en: 'After setting the wedding date, I sent invitations to my friends.',
          ru: 'После того как определили дату свадьбы, я отправил друзьям приглашения.',
        },
      },
    ],
    pronunciation: {
      hangul: '청첩장',
      romanization: 'cheongcheopjang',
      ttsText: '청첩장',
    },
    media: {
      emoji: '💌',
      imageUrl: '',
      imageAlt: {
        ko: '결혼식 청첩장',
        uz: 'to‘y taklifnomasi',
        en: 'a wedding invitation card',
        ru: 'свадебное приглашение',
      },
    },
    tags: ['marriage', 'wedding', 'invitation'],
    difficulty: 4,
    usageNote: {
      ko: '보통 결혼식 날짜, 시간, 장소 등의 정보가 들어 있어요.',
      uz: 'Odatda to‘y sanasi, vaqti va joyi haqidagi ma’lumotlar bo‘ladi.',
      en: 'It usually contains the wedding date, time, and venue.',
      ru: 'Обычно содержит дату, время и место свадьбы.',
    },
    isCore: true,
  },
  {
    code: 'marriage-wedding-hall',
    korean: '예식장',
    senseKey: 'wedding-ceremony-hall',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '결혼식 같은 예식을 하는 장소',
      uz: 'to‘y marosimi o‘tkaziladigan zal',
      en: 'wedding hall',
      ru: 'зал для свадебной церемонии',
    },
    examples: [
      {
        korean: '원하는 날짜에 빈 예식장이 없어서 날짜를 바꿨어요.',
        translations: {
          ko: '원하는 날에 사용할 수 있는 결혼식장이 없어서 다른 날로 정했어요.',
          uz: 'Xohlagan kunimizda bo‘sh to‘y zali bo‘lmagani uchun sanani o‘zgartirdik.',
          en: 'There was no available wedding hall on our preferred date, so we changed the date.',
          ru: 'На желаемую дату не было свободного свадебного зала, поэтому мы изменили дату.',
        },
      },
    ],
    pronunciation: {
      hangul: '예식장',
      romanization: 'yesikjang',
      ttsText: '예식장',
    },
    media: {
      emoji: '💒',
      imageUrl: '',
      imageAlt: {
        ko: '결혼식이 열리는 예식장',
        uz: 'to‘y marosimi o‘tkaziladigan zal',
        en: 'a wedding ceremony hall',
        ru: 'зал для проведения свадьбы',
      },
    },
    tags: ['marriage', 'wedding', 'venue'],
    difficulty: 4,
    usageNote: {
      ko: '결혼식을 하는 장소를 말할 때 많이 사용해요.',
      uz: 'Ko‘pincha nikoh marosimi o‘tkaziladigan joyni aytishda ishlatiladi.',
      en: 'Commonly used for the venue where a wedding ceremony is held.',
      ru: 'Обычно так называют место проведения свадебной церемонии.',
    },
    isCore: true,
  },
  {
    code: 'marriage-newlywed-home',
    korean: '신혼집',
    senseKey: 'newlywed-home',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '새로 결혼한 부부가 함께 사는 집',
      uz: 'yangi turmush qurganlar uyi',
      en: 'newlywed home',
      ru: 'дом молодожёнов',
    },
    examples: [
      {
        korean: '두 사람은 직장과 가까운 곳에 신혼집을 구했어요.',
        translations: {
          ko: '두 사람은 결혼 후 함께 살 집을 직장 가까운 곳에 마련했어요.',
          uz: 'Ular ish joyiga yaqin yerdan yangi turmush qurganlar uchun uy topishdi.',
          en: 'They found a newlywed home near their workplaces.',
          ru: 'Они нашли жильё для молодожёнов рядом с работой.',
        },
      },
    ],
    pronunciation: {
      hangul: '신혼집',
      romanization: 'sinhonjip',
      ttsText: '신혼집',
    },
    media: {
      emoji: '🏠',
      imageUrl: '',
      imageAlt: {
        ko: '새로 결혼한 부부의 집',
        uz: 'yangi turmush qurgan juftlikning uyi',
        en: 'a newlywed couple home',
        ru: 'дом молодой супружеской пары',
      },
    },
    tags: ['marriage', 'home', 'newlywed'],
    difficulty: 4,
    usageNote: {
      ko: '결혼 후 부부가 처음 함께 살 집을 말할 때 많이 써요.',
      uz: 'Nikohdan keyin juftlik birga yashaydigan birinchi uy uchun ko‘p ishlatiladi.',
      en: 'Commonly refers to the first home a married couple shares.',
      ru: 'Часто обозначает первое жильё, где супруги начинают жить вместе.',
    },
    isCore: true,
  },
  {
    code: 'marriage-newlywed-household',
    korean: '신혼살림',
    senseKey: 'newlywed-household',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '새로 결혼한 부부가 꾸리는 생활이나 그 생활에 필요한 살림',
      uz: 'yangi oila ro‘zg‘ori',
      en: 'newlywed household',
      ru: 'хозяйство молодожёнов',
    },
    examples: [
      {
        korean: '신혼집이 정해져서 필요한 신혼살림을 하나씩 준비하고 있어요.',
        translations: {
          ko: '함께 살 집을 정한 뒤 생활에 필요한 물건을 준비하고 있어요.',
          uz: 'Yangi uyimiz belgilangach, ro‘zg‘or uchun kerakli narsalarni asta-sekin tayyorlayapmiz.',
          en: 'After choosing our home, we started preparing household items for married life.',
          ru: 'После выбора жилья мы начали понемногу готовить всё необходимое для семейной жизни.',
        },
      },
    ],
    pronunciation: {
      hangul: '신혼살림',
      romanization: 'sinhonsallim',
      ttsText: '신혼살림',
    },
    media: {
      emoji: '🛋️',
      imageUrl: '',
      imageAlt: {
        ko: '신혼집에 필요한 생활용품',
        uz: 'yangi oila uchun uy-ro‘zg‘or buyumlari',
        en: 'household items for newlyweds',
        ru: 'домашние вещи для молодожёнов',
      },
    },
    tags: ['marriage', 'newlywed', 'household'],
    difficulty: 5,
    usageNote: {
      ko: '가구나 생활용품뿐 아니라 새로 시작하는 부부 생활 자체를 뜻하기도 해요.',
      uz: 'Faqat buyumlarni emas, yangi oilaviy hayotning o‘zini ham anglatishi mumkin.',
      en: 'It can refer both to household belongings and to running a new married household.',
      ru: 'Может обозначать как домашнее имущество, так и сам быт молодой семьи.',
    },
    isCore: true,
  },
  {
    code: 'marriage-newlywed-life',
    korean: '신혼생활',
    senseKey: 'newlywed-life',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '결혼한 지 얼마 안 된 부부가 함께 하는 생활',
      uz: 'yangi turmush qurganlarning hayoti',
      en: 'newlywed life',
      ru: 'жизнь молодожёнов',
    },
    examples: [
      {
        korean: '결혼 후에는 지금 사는 집에서 신혼생활을 시작할 생각이에요.',
        translations: {
          ko: '결혼하면 지금 살고 있는 집에서 함께 생활을 시작할 거예요.',
          uz: 'Nikohdan keyin hozir yashayotgan uyimizda yangi oilaviy hayotni boshlamoqchimiz.',
          en: 'After marriage, we plan to begin our newlywed life in the home where I live now.',
          ru: 'После свадьбы мы планируем начать семейную жизнь в доме, где я сейчас живу.',
        },
      },
    ],
    pronunciation: {
      hangul: '신혼생활',
      romanization: 'sinhonsaenghwal',
      ttsText: '신혼생활',
    },
    media: {
      emoji: '👩‍❤️‍👨',
      imageUrl: '',
      imageAlt: {
        ko: '함께 생활하는 신혼부부',
        uz: 'birga yashayotgan yangi turmush qurgan juftlik',
        en: 'newlyweds living together',
        ru: 'молодожёны, начинающие совместную жизнь',
      },
    },
    tags: ['marriage', 'newlywed', 'life'],
    difficulty: 4,
    usageNote: {
      ko: '결혼 직후의 부부 생활을 말해요.',
      uz: 'Nikohdan keyingi dastlabki oilaviy hayotni bildiradi.',
      en: 'Refers to married life during the early newlywed period.',
      ru: 'Обозначает семейную жизнь в первые годы после свадьбы.',
    },
    isCore: true,
  },
  {
    code: 'marriage-perfect-match',
    korean: '천생연분',
    senseKey: 'perfect-match',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '하늘이 정해 준 것처럼 아주 잘 어울리는 인연',
      uz: 'bir-biri uchun yaratilgan juftlik',
      en: 'a match made in heaven',
      ru: 'идеальная пара, словно предназначенная судьбой',
    },
    examples: [
      {
        korean: '두 사람이 서로를 이해하는 모습을 보니 정말 천생연분 같아요.',
        translations: {
          ko: '두 사람이 너무 잘 어울려서 운명적으로 만난 사이처럼 보여요.',
          uz: 'Ularning bir-birini tushunishini ko‘rib, ular bir-biri uchun yaratilgandek tuyuladi.',
          en: 'Seeing how well they understand each other, they really seem like a perfect match.',
          ru: 'Глядя на то, как хорошо они понимают друг друга, кажется, что они идеальная пара.',
        },
      },
    ],
    pronunciation: {
      hangul: '천생연분',
      romanization: 'cheonsaengyeonbun',
      ttsText: '천생연분',
    },
    media: {
      emoji: '💞',
      imageUrl: '',
      imageAlt: {
        ko: '아주 잘 어울리는 부부',
        uz: 'bir-biriga juda mos juftlik',
        en: 'a perfectly matched couple',
        ru: 'идеально подходящая друг другу пара',
      },
    },
    tags: ['marriage', 'relationship', 'compatibility'],
    difficulty: 5,
    usageNote: {
      ko: '두 사람이 매우 잘 어울릴 때 비유적으로 사용하는 표현이에요.',
      uz: 'Ikki kishi juda yaxshi mos kelganda obrazli tarzda ishlatiladi.',
      en: 'A figurative expression for two people who seem perfectly suited to each other.',
      ru: 'Образное выражение для двух людей, которые идеально подходят друг другу.',
    },
    isCore: true,
  },
  {
    code: 'marriage-spouse',
    korean: '배우자',
    senseKey: 'spouse',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '결혼한 상대방',
      uz: 'turmush o‘rtog‘i',
      en: 'spouse',
      ru: 'супруг или супруга',
    },
    examples: [
      {
        korean: '배우자를 고를 때는 서로의 가치관이 맞는지도 중요해요.',
        translations: {
          ko: '결혼할 사람을 선택할 때 생각과 가치관이 잘 맞는지도 중요해요.',
          uz: 'Turmush o‘rtog‘ini tanlashda qadriyatlar mos kelishi ham muhim.',
          en: 'When choosing a spouse, compatible values are also important.',
          ru: 'При выборе супруга важно, чтобы жизненные ценности совпадали.',
        },
      },
    ],
    pronunciation: {
      hangul: '배우자',
      romanization: 'baeuja',
      ttsText: '배우자',
    },
    media: {
      emoji: '💑',
      imageUrl: '',
      imageAlt: {
        ko: '결혼한 부부',
        uz: 'turmush qurgan juftlik',
        en: 'a married couple',
        ru: 'супружеская пара',
      },
    },
    tags: ['marriage', 'spouse', 'relationship'],
    difficulty: 5,
    usageNote: {
      ko: '남편과 아내를 성별과 관계없이 가리키는 비교적 공식적인 말이에요.',
      uz: 'Er yoki xotinni jinsidan qat’i nazar ifodalovchi nisbatan rasmiy so‘z.',
      en: 'A relatively formal gender-neutral term for a husband or wife.',
      ru: 'Относительно официальное нейтральное слово для мужа или жены.',
    },
    isCore: true,
  },
  {
    code: 'marriage-preparation',
    korean: '결혼 준비',
    senseKey: 'wedding-preparation',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '결혼식을 하고 신혼생활을 시작하기 위해 필요한 준비',
      uz: 'nikoh va to‘yga tayyorgarlik',
      en: 'wedding preparations',
      ru: 'подготовка к свадьбе',
    },
    examples: [
      {
        korean: '청첩장과 신혼여행까지 챙기려니 결혼 준비가 생각보다 복잡해요.',
        translations: {
          ko: '준비할 것이 많아서 결혼 준비가 예상보다 복잡해요.',
          uz: 'Taklifnoma va asal oyi sayohatigacha tayyorlash kerakligi uchun to‘yga tayyorgarlik kutilganidan murakkabroq.',
          en: 'Wedding preparations are more complicated than expected because there is so much to arrange.',
          ru: 'Подготовка к свадьбе оказалась сложнее, чем ожидалось, потому что нужно организовать очень многое.',
        },
      },
    ],
    pronunciation: {
      hangul: '결혼 준비',
      romanization: 'gyeolhon junbi',
      ttsText: '결혼 준비',
    },
    media: {
      emoji: '📋',
      imageUrl: '',
      imageAlt: {
        ko: '결혼 준비 목록',
        uz: 'to‘yga tayyorgarlik ro‘yxati',
        en: 'a wedding preparation checklist',
        ru: 'список подготовки к свадьбе',
      },
    },
    tags: ['marriage', 'wedding', 'preparation'],
    difficulty: 4,
    usageNote: {
      ko: '예식장, 청첩장, 신혼여행, 신혼집 등을 준비하는 전체 과정을 말해요.',
      uz: 'To‘y zali, taklifnoma, asal oyi va yangi uy kabi barcha tayyorgarlik jarayonini anglatadi.',
      en: 'Covers the overall process of arranging the venue, invitations, honeymoon, newlywed home, and more.',
      ru: 'Охватывает весь процесс подготовки: зал, приглашения, свадебное путешествие, жильё и другое.',
    },
    isCore: true,
  },
  {
    code: 'marriage-partner',
    korean: '결혼 상대',
    senseKey: 'marriage-partner',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: {
      ko: '결혼할 대상으로 생각하는 사람',
      uz: 'nikoh uchun ko‘rilayotgan inson',
      en: 'prospective marriage partner',
      ru: 'человек, рассматриваемый как будущий супруг',
    },
    examples: [
      {
        korean: '결혼 상대를 고를 때 무엇이 가장 중요하다고 생각해요?',
        translations: {
          ko: '결혼할 사람을 선택할 때 가장 중요하게 보는 것은 무엇이에요?',
          uz: 'Turmush quradigan insonni tanlashda nimani eng muhim deb bilasiz?',
          en: 'What do you think is most important when choosing a marriage partner?',
          ru: 'Что вы считаете самым важным при выборе будущего супруга?',
        },
      },
    ],
    pronunciation: {
      hangul: '결혼 상대',
      romanization: 'gyeolhon sangdae',
      ttsText: '결혼 상대',
    },
    media: {
      emoji: '💍',
      imageUrl: '',
      imageAlt: {
        ko: '결혼을 생각하는 두 사람',
        uz: 'nikoh haqida o‘ylayotgan ikki kishi',
        en: 'two people considering marriage',
        ru: 'двое людей, думающих о браке',
      },
    },
    tags: ['marriage', 'partner', 'relationship'],
    difficulty: 5,
    usageNote: {
      ko: '`배우자`가 이미 결혼한 상대를 가리킬 수 있는 반면 `결혼 상대`는 결혼을 고려하는 사람이라는 의미로도 많이 써요.',
      uz: '`배우자` turmush o‘rtog‘ini bildirsa, `결혼 상대` nikoh uchun ko‘rilayotgan odamni ham anglatishi mumkin.',
      en: 'Unlike spouse, this expression can refer to someone being considered as a future husband or wife.',
      ru: 'В отличие от слова супруг, это выражение может обозначать человека, которого рассматривают как будущего мужа или жену.',
    },
    isCore: true,
  },
] satisfies readonly WordSeedEntry[];

export const S6_UNIT1_NODE2_QUESTIONS = {
  // ─────────────────────────────
  // Lesson 1 · 결혼을 생각하다
  // q101 ~ q120
  // ─────────────────────────────

  s6u1_101_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '결혼 생각은 있지만 지금 당장은 아직 이르다는 뜻의 문장을 만드세요.',
      'Nikoh haqida o‘ylayotgan bo‘lsangiz ham, hozircha hali erta ekanini bildiruvchi gap tuzing.',
      'Build a sentence saying that you think about marriage but it is still too early for you.',
      'Составьте предложение о том, что вы думаете о браке, но сейчас вам ещё рано жениться.',
    ),
    options: [
      '생각하지만',
      '아직',
      '저는',
      '결혼을',
      '멀었어요',
      '곧',
      '끝났어요',
    ],
    answer: '저는 결혼을 생각하지만 아직 멀었어요',
    answerTranslation: L(
      '결혼할 생각은 있지만 지금 당장 할 단계는 아니에요.',
      'Turmush qurish haqida o‘ylayman, lekin hozircha bunga hali ancha bor.',
      'I think about marriage, but I am still a long way from getting married.',
      'Я думаю о браке, но до свадьбы мне ещё далеко.',
    ),
  },

  s6u1_102_type_answer: {
    type: 'type_answer',
    instruction: L(
      '결혼 계획에 관한 두 표현을 직접 입력하세요.',
      'Nikoh rejasi bilan bog‘liq ikki ifodani kiriting.',
      'Type the two expressions about the marriage plan.',
      'Введите два выражения, связанные с планами на брак.',
    ),
    sentenceTemplate: '지금은 ___보다 일이 더 중요해서 결혼하려면 아직 ___.',
    blankAnswers: ['결혼', '멀었어요'],
    answer: '결혼|멀었어요',
    answerTranslation: L(
      '지금은 결혼보다 일이 중요하기 때문에 당장 결혼할 생각은 없어요.',
      'Hozir men uchun nikohdan ko‘ra ish muhimroq, shuning uchun turmush qurishga hali vaqt bor.',
      'Work is more important to me than marriage right now, so marriage is still far off.',
      'Сейчас работа для меня важнее брака, поэтому до свадьбы ещё далеко.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'Work is currently more important to the speaker than marriage, so getting married is still far in the future.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_103_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글쓴이가 지금 결혼하지 않으려는 가장 큰 이유를 고르세요.',
      'Muallifning hozir turmush qurishni istamasligining asosiy sababini tanlang.',
      'Choose the main reason the writer does not want to marry yet.',
      'Выберите главную причину, по которой автор пока не хочет вступать в брак.',
    ),
    passage:
      '저도 언젠가는 결혼하고 싶습니다. 하지만 지금은 일을 시작한 지 얼마 되지 않았고 앞으로 하고 싶은 공부도 있습니다. 먼저 제 일을 안정시킨 뒤에 결혼을 생각하고 싶습니다.',
    options: [
      '먼저 일과 공부에 집중하고 싶어서',
      '결혼이라는 제도를 싫어해서',
      '이미 결혼했기 때문에',
      '외국으로 영원히 떠날 예정이라서',
    ],
    answer: '먼저 일과 공부에 집중하고 싶어서',
  },

  s6u1_104_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '결혼을 목적으로 소개받은 사람을 만났지만 결정을 서두르지 않았다는 문장을 만드세요.',
      'Nikoh maqsadida tanishtirilgan odam bilan uchrashgan bo‘lsangiz ham, qarorni shoshirmaganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying you went on a marriage-oriented meeting but did not rush the decision.',
      'Составьте предложение о том, что вы встретились с человеком для возможного брака, но не стали спешить с решением.',
    ),
    options: [
      '결정하지',
      '봤지만',
      '바로',
      '맞선을',
      '않았어요',
      '결혼을',
      '그날',
    ],
    answer: '맞선을 봤지만 바로 결혼을 결정하지 않았어요',
    answerTranslation: L(
      '결혼을 생각하고 사람을 만났지만 바로 결혼하기로 하지는 않았어요.',
      'Nikoh niyatida uchrashdim, lekin darhol turmush qurishga qaror qilmadim.',
      'I met someone with marriage in mind, but I did not decide to marry immediately.',
      'Я встретился с человеком с целью возможного брака, но не стал сразу принимать решение.',
    ),
  },

  s6u1_105_type_answer: {
    type: 'type_answer',
    instruction: L(
      '결혼 상대를 고를 때 중요하게 보는 두 표현을 입력하세요.',
      'Turmush o‘rtog‘ini tanlashda muhim bo‘lgan ikki ifodani kiriting.',
      'Type the two expressions that are important when choosing a marriage partner.',
      'Введите два выражения, важных при выборе будущего супруга.',
    ),
    sentenceTemplate:
      '결혼 상대를 고를 때는 조건보다 ___ 잘 맞고 ___ 잘 통하는지가 중요해요.',
    blankAnswers: ['성격이', '말이'],
    answer: '성격이|말이',
    answerTranslation: L(
      '저는 조건보다 성격과 대화가 잘 맞는지를 더 중요하게 생각해요.',
      'Men shartlardan ko‘ra xarakter va yaxshi muloqotni muhimroq deb bilaman.',
      'I consider compatible personalities and good communication more important than conditions.',
      'Для меня важнее совместимость характеров и хорошее общение, чем формальные условия.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'When choosing a marriage partner, personality compatibility and good communication matter more than external conditions.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_106_sentence_builder: {
    type: 'sentence_builder',
    instruction: L(
      '어절을 배열해 자신의 결혼 계획을 말하는 문장을 만드세요.',
      'Bo‘laklarni tartiblab nikoh rejangizni bildiruvchi gap tuzing.',
      'Arrange the chunks to make a sentence about a marriage plan.',
      'Расположите части и составьте предложение о планах на брак.',
    ),
    options: ['생각이에요', '저는', '30대쯤', '결혼할', '당장', '절대'],
    answer: '저는 30대쯤 결혼할 생각이에요',
    audioText: '저는 30대쯤 결혼할 생각이에요.',
    answerTranslation: L(
      '저는 30대 정도에 결혼하고 싶어요.',
      'Men taxminan 30 yoshlarimda turmush qurmoqchiman.',
      'I am thinking of getting married in my thirties.',
      'Я думаю жениться примерно в тридцать с небольшим лет.',
    ),
  },

  s6u1_107_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '올해는 해야 할 일이 많아서 결혼 계획이 없다는 문장을 만드세요.',
      'Bu yil qiladigan ishlar ko‘pligi sabab nikoh rejangiz yo‘qligini bildiruvchi gap tuzing.',
      'Build a sentence saying you have no marriage plans this year because you have a lot to do.',
      'Составьте предложение о том, что в этом году вы не планируете свадьбу, потому что у вас много дел.',
    ),
    options: [
      '올해는',
      '없어요',
      '일이',
      '결혼할',
      '많이 남아서',
      '계획이',
      '이미 끝나서',
    ],
    answer: '올해는 일이 많이 남아서 결혼할 계획이 없어요',
    answerTranslation: L(
      '올해는 해야 할 일이 많기 때문에 결혼을 계획하지 않고 있어요.',
      'Bu yil qiladigan ishlar ko‘p, shuning uchun turmush qurishni rejalashtirmayapman.',
      'I have a lot to do this year, so I am not planning to get married.',
      'В этом году у меня много дел, поэтому свадьбу я пока не планирую.',
    ),
  },

  s6u1_108_type_answer: {
    type: 'type_answer',
    instruction: L(
      '두 결혼 방식을 비교하는 표현을 입력하세요.',
      'Ikki xil nikoh turini solishtiruvchi ifodalarni kiriting.',
      'Type the expressions comparing two forms of marriage.',
      'Введите выражения для сравнения двух видов брака.',
    ),
    sentenceTemplate:
      '저는 ___보다는 서로 좋아해서 하는 ___을 더 긍정적으로 생각해요.',
    blankAnswers: ['중매결혼', '연애결혼'],
    answer: '중매결혼|연애결혼',
    answerTranslation: L(
      '저는 중매를 통한 결혼보다 사랑해서 하는 결혼을 더 선호해요.',
      'Men vositachi orqali nikohdan ko‘ra sevgi asosidagi nikohni afzal ko‘raman.',
      'I prefer marriage for love over arranged marriage.',
      'Я предпочитаю брак по любви браку по сватовству.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The speaker views love marriage more positively than arranged marriage.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_109_listening: {
    type: 'listening',
    instruction: L(
      '음성을 듣고 화자의 결혼관을 고르세요.',
      'Audioyozuvni tinglab, so‘zlovchining nikoh haqidagi qarashini tanlang.',
      'Listen and choose the speaker view on marriage.',
      'Прослушайте и выберите мнение говорящего о браке.',
    ),
    audioText:
      '저는 나이가 찼다고 꼭 결혼해야 한다고 생각하지 않아요. 좋은 사람을 만나고 제 생활도 준비됐을 때 결혼하는 게 좋다고 생각해요.',
    options: [
      '준비가 되었을 때 결혼하는 것이 좋다고 생각한다',
      '나이가 되면 상대가 없어도 결혼해야 한다고 생각한다',
      '결혼은 절대로 하면 안 된다고 생각한다',
      '부모님이 선택한 사람과만 결혼해야 한다고 생각한다',
    ],
    answer: '준비가 되었을 때 결혼하는 것이 좋다고 생각한다',
  },

  s6u1_110_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '결혼은 나이보다 준비 상태가 중요하다는 뜻의 문장을 만드세요.',
      'Nikohda yoshdan ko‘ra tayyorlik muhimroq ekanini bildiruvchi gap tuzing.',
      'Build a sentence saying readiness matters more than age when deciding to marry.',
      'Составьте предложение о том, что готовность к браку важнее возраста.',
    ),
    options: [
      '좋다고',
      '되었을 때',
      '결혼은',
      '준비가',
      '하는 게',
      '생각해요',
      '나이만 되면',
    ],
    answer: '결혼은 준비가 되었을 때 하는 게 좋다고 생각해요',
    answerTranslation: L(
      '결혼은 단순히 나이보다 두 사람이 준비되었는지가 중요하다고 생각해요.',
      'Menimcha, nikohda yoshdan ko‘ra ikki kishining tayyorligi muhimroq.',
      'I think marriage should happen when both people are ready.',
      'Я думаю, что вступать в брак лучше тогда, когда оба к нему готовы.',
    ),
  },

  s6u1_111_type_answer: {
    type: 'type_answer',
    instruction: L(
      '좋은 결혼 관계에 필요한 두 내용을 입력하세요.',
      'Yaxshi nikoh uchun kerak bo‘lgan ikki mazmunni kiriting.',
      'Type the two things needed for a good marriage.',
      'Введите два элемента, необходимых для хорошего брака.',
    ),
    sentenceTemplate: '좋은 ___를 만나더라도 서로의 가치관을 충분히 ___.',
    blankAnswers: ['배우자', '이해해야 해요'],
    answer: '배우자|이해해야 해요',
    answerTranslation: L(
      '좋은 결혼 상대를 만나도 서로의 생각과 가치관을 이해해야 해요.',
      'Yaxshi turmush o‘rtog‘ini topsangiz ham, bir-biringizning qadriyatlaringizni tushunishingiz kerak.',
      'Even with a good spouse, both people need to understand each other values.',
      'Даже встретив хорошего супруга, важно понимать ценности друг друга.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'Even after finding a good spouse, both people need to understand each other values.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_112_error_hunt: {
    type: 'error_hunt',
    instruction: L(
      '문맥과 맞지 않는 단어를 찾아 자연스럽게 고치세요.',
      'Kontekstga mos kelmaydigan so‘zni topib tuzating.',
      'Find the word that does not fit the context and correct it.',
      'Найдите слово, не подходящее по смыслу, и исправьте его.',
    ),
    npcText: '저는 부모님의 중매 없이 서로 좋아해서 중매결혼을 하고 싶어요.',
    wrongWord: '중매결혼을',
    answer: '연애결혼을',
  },

  s6u1_113_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '결혼 상대와 충분히 이야기한 뒤 결혼을 결정했다는 문장을 만드세요.',
      'Bo‘lajak turmush o‘rtog‘ingiz bilan yetarlicha suhbatlashib, keyin nikohga qaror qilganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying marriage was decided after sufficient discussion with the partner.',
      'Составьте предложение о том, что решение о браке было принято после долгого разговора с будущим супругом.',
    ),
    options: [
      '결정했어요',
      '충분히',
      '결혼 상대와',
      '이야기한 뒤',
      '결혼을',
      '바로',
      '취소했어요',
    ],
    answer: '결혼 상대와 충분히 이야기한 뒤 결혼을 결정했어요',
    answerTranslation: L(
      '결혼할 사람과 충분히 대화한 뒤 결혼하기로 했어요.',
      'Turmush quradigan inson bilan yetarlicha suhbatlashib, keyin nikohga qaror qildim.',
      'I decided to marry after discussing it thoroughly with my partner.',
      'Я решил вступить в брак после подробного разговора с будущим супругом.',
    ),
  },

  s6u1_114_type_answer: {
    type: 'type_answer',
    instruction: L(
      '미래의 결혼 계획을 완성하는 두 표현을 입력하세요.',
      'Kelajakdagi nikoh rejasini tugallaydigan ikki ifodani kiriting.',
      'Type the two expressions that complete the future marriage plan.',
      'Введите два выражения, завершающих планы на будущий брак.',
    ),
    sentenceTemplate: '저는 ___쯤 결혼하고 싶지만 아직 구체적인 ___은 없어요.',
    blankAnswers: ['30대에', '계획'],
    answer: '30대에|계획',
    answerTranslation: L(
      '30대에 결혼하고 싶지만 아직 자세한 계획은 세우지 않았어요.',
      '30 yoshlarimda turmush qurmoqchiman, lekin hali aniq rejam yo‘q.',
      'I want to marry in my thirties, but I do not have a specific plan yet.',
      'Я хочу вступить в брак примерно в тридцать лет, но конкретного плана пока нет.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The speaker wants to marry in their thirties but has no specific marriage plan yet.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_115_cloze_passage: {
    type: 'cloze_passage',
    instruction: L(
      '글의 흐름에 맞게 세 빈칸을 채우세요.',
      'Matn mazmuniga mos ravishda uchta bo‘sh joyni to‘ldiring.',
      'Fill the three blanks according to the passage.',
      'Заполните три пропуска по смыслу текста.',
    ),
    passage:
      '저는 아직 결혼보다 일이 더 중요합니다. 먼저 직장 생활을 안정시키고 싶습니다. 좋은 ___를 만나더라도 서로 충분히 대화한 뒤 ___을 생각하고 싶습니다. 그래서 지금 결혼하려면 아직 ___.',
    blankAnswers: ['결혼 상대', '결혼', '멀었어요'],
    options: ['결혼 상대', '멀었어요', '결혼', '예식장', '가까워요', '청첩장'],
    answer: '결혼 상대|결혼|멀었어요',
  },

  s6u1_116_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '현재는 결혼보다 공부와 취업에 집중하고 싶다는 문장을 만드세요.',
      'Hozircha nikohdan ko‘ra o‘qish va ishga joylashishga e’tibor qaratmoqchi ekaningizni bildiruvchi gap tuzing.',
      'Build a sentence saying you want to focus on study and employment rather than marriage for now.',
      'Составьте предложение о том, что сейчас вы хотите сосредоточиться на учёбе и работе, а не на браке.',
    ),
    options: [
      '집중하고',
      '취업에',
      '결혼보다',
      '싶어요',
      '지금은',
      '공부와',
      '포기하고',
    ],
    answer: '지금은 결혼보다 공부와 취업에 집중하고 싶어요',
    answerTranslation: L(
      '현재는 결혼보다 공부하고 취업하는 일이 더 중요해요.',
      'Hozir men uchun nikohdan ko‘ra o‘qish va ishga joylashish muhimroq.',
      'For now, I want to focus on studying and finding a job rather than marriage.',
      'Сейчас я хочу сосредоточиться на учёбе и поиске работы, а не на браке.',
    ),
  },

  s6u1_117_type_answer: {
    type: 'type_answer',
    instruction: L(
      '결혼을 결정하기 전에 확인할 내용을 두 빈칸에 입력하세요.',
      'Nikohga qaror qilishdan oldin tekshiriladigan ikki ifodani kiriting.',
      'Type the two expressions about what should be considered before marriage.',
      'Введите два выражения о том, что стоит обдумать до брака.',
    ),
    sentenceTemplate:
      '결혼을 결정하기 전에 상대방이 좋은 ___가 될 사람인지 충분히 ___.',
    blankAnswers: ['배우자', '생각해 봐야 해요'],
    answer: '배우자|생각해 봐야 해요',
    answerTranslation: L(
      '결혼 전에 그 사람이 좋은 배우자가 될 수 있는지 충분히 생각해야 해요.',
      'Nikohdan oldin u inson yaxshi turmush o‘rtog‘i bo‘la oladimi, yaxshilab o‘ylab ko‘rish kerak.',
      'Before marriage, you should think carefully about whether that person would be a good spouse.',
      'Перед браком нужно хорошо подумать, сможет ли этот человек стать хорошим супругом.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'Before deciding to marry, a person should carefully consider whether the partner would be a good spouse.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_118_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '음성을 듣고 세 빈칸을 직접 입력하세요.',
      'Audioyozuvni tinglab, uchta bo‘sh joyni kiriting.',
      'Listen and type the three missing expressions.',
      'Прослушайте и заполните три пропуска.',
    ),
    audioText:
      '저는 연애결혼을 하고 싶지만 부모님은 맞선을 한 번 보라고 권하세요.',
    sentenceTemplate: '저는 ___을 하고 싶지만 부모님은 ___을 한 번 보라고 ___.',
    blankAnswers: ['연애결혼', '맞선', '권하세요'],
    answer: '연애결혼|맞선|권하세요',
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The speaker wants a love marriage, but the parents recommend going on a formal marriage-oriented meeting.',
      acceptedAnswers: [],
      notes: ['Require the exact Korean expressions spoken in the audio.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_119_word_arrange: {
    type: 'word_arrange',
    instruction: L(
      '어절을 올바른 순서로 배열하세요.',
      'Bo‘laklarni to‘g‘ri tartiblang.',
      'Arrange the chunks in the correct order.',
      'Расположите части в правильном порядке.',
    ),
    options: [
      '하고',
      '결혼은',
      '준비가',
      '싶어요',
      '충분히',
      '되었을 때',
      '지금 당장',
    ],
    answer: '결혼은 충분히 준비가 되었을 때 하고 싶어요',
  },

  s6u1_120_translate_type: {
    type: 'translate_type',
    instruction: L(
      '결혼을 서두르기보다 좋은 상대를 만나 서로 충분히 이해한 뒤 결정하고 싶다는 의미를 자연스러운 한국어로 쓰세요.',
      'Nikohga shoshilmay, yaxshi insonni uchratib, bir-biringizni yetarlicha tushungandan keyin qaror qilmoqchi ekaningizni tabiiy koreys tilida yozing.',
      'Write naturally in Korean that you want to decide on marriage only after meeting a good partner and understanding each other well.',
      'Напишите естественно по-корейски, что вы хотите решить вопрос о браке только после встречи с подходящим человеком и хорошего взаимопонимания.',
    ),
    answer:
      '결혼을 서두르기보다 좋은 사람을 만나 서로 충분히 이해한 뒤 결정하고 싶어요.',
    grading: {
      mode: 'semantic',
      expectedMeaning:
        'The speaker does not want to rush marriage and wants to decide only after meeting a good partner and developing sufficient mutual understanding.',
      acceptedAnswers: [],
      notes: [
        'Preserve the contrast between rushing marriage and making a decision after sufficient mutual understanding.',
      ],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
  },

  // ─────────────────────────────
  // Lesson 2 · 청혼과 결혼 결정
  // q121 ~ q140
  // ─────────────────────────────

  s6u1_121_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '오랫동안 연애한 뒤 먼저 결혼을 제안했다는 문장을 만드세요.',
      'Uzoq munosabatdan keyin birinchi bo‘lib turmush qurishni taklif qilganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying you proposed marriage after dating for a long time.',
      'Составьте предложение о том, что после долгих отношений вы первым сделали предложение.',
    ),
    options: [
      '먼저',
      '청혼했어요',
      '뒤',
      '연애한',
      '오랫동안',
      '저는',
      '헤어졌어요',
    ],
    answer: '오랫동안 연애한 뒤 저는 먼저 청혼했어요',
    answerTranslation: L(
      '오랫동안 사귄 뒤 제가 먼저 결혼하자고 말했어요.',
      'Uzoq vaqt uchrashgandan keyin men birinchi bo‘lib turmush qurishni taklif qildim.',
      'After dating for a long time, I proposed marriage first.',
      'После долгих отношений я первым сделал предложение.',
    ),
  },

  s6u1_122_type_answer: {
    type: 'type_answer',
    instruction: L(
      '청혼 이후의 계획을 완성하는 두 표현을 입력하세요.',
      'Taklifdan keyingi rejani tugallaydigan ikki ifodani kiriting.',
      'Type the two expressions that complete the plan after the proposal.',
      'Введите два выражения, завершающих план после предложения.',
    ),
    sentenceTemplate: '남자 친구가 ___, 우리는 내년에 ___.',
    blankAnswers: ['청혼했고', '결혼하기로 했어요'],
    answer: '청혼했고|결혼하기로 했어요',
    answerTranslation: L(
      '남자 친구가 결혼하자고 했고 우리는 내년에 결혼하기로 결정했어요.',
      'Yigitim menga turmush qurishni taklif qildi va biz kelasi yili turmush qurishga qaror qildik.',
      'My boyfriend proposed, and we decided to marry next year.',
      'Мой парень сделал предложение, и мы решили пожениться в следующем году.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The boyfriend proposed marriage and the couple decided to get married next year.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_123_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람이 결혼을 결정하게 된 가장 직접적인 계기를 고르세요.',
      'Ularning nikohga qaror qilishiga bevosita sabab bo‘lgan voqeani tanlang.',
      'Choose the event that directly led the couple to decide on marriage.',
      'Выберите событие, которое непосредственно привело пару к решению пожениться.',
    ),
    passage:
      '민수와 지연은 오랫동안 연애했습니다. 두 사람은 서로의 직장과 가족 이야기를 자주 하면서 미래에 대해서도 충분히 이야기했습니다. 어느 날 민수가 결혼하자고 청혼했고 지연도 같은 생각이라고 대답했습니다. 그래서 두 사람은 내년 봄에 결혼하기로 했습니다.',
    options: [
      '민수가 청혼하고 지연도 동의했기 때문에',
      '두 사람이 처음 만났기 때문에',
      '지연이 외국으로 떠났기 때문에',
      '부모님이 두 사람을 헤어지게 했기 때문에',
    ],
    answer: '민수가 청혼하고 지연도 동의했기 때문에',
  },

  s6u1_124_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '두 사람의 결혼 생각이 같아서 내년 봄에 결혼하기로 했다는 문장을 만드세요.',
      'Ikkalasining nikoh haqidagi fikri bir xil bo‘lgani uchun kelasi bahorda turmush qurishga qaror qilganini bildiruvchi gap tuzing.',
      'Build a sentence saying the couple decided to marry next spring because they shared the same view about marriage.',
      'Составьте предложение о том, что они решили пожениться следующей весной, потому что одинаково смотрели на брак.',
    ),
    options: [
      '결혼하기로',
      '같아서',
      '결혼할',
      '생각이',
      '했어요',
      '내년 봄에',
      '달라서',
    ],
    answer: '결혼할 생각이 같아서 내년 봄에 결혼하기로 했어요',
    answerTranslation: L(
      '두 사람 모두 결혼하고 싶어서 내년 봄에 결혼하기로 결정했어요.',
      'Ikkalasi ham turmush qurishni xohlagani uchun kelasi bahorda nikoh qilishga qaror qilishdi.',
      'They both wanted marriage, so they decided to get married next spring.',
      'Оба хотели вступить в брак, поэтому решили пожениться следующей весной.',
    ),
  },

  s6u1_125_type_answer: {
    type: 'type_answer',
    instruction: L(
      '연애에서 결혼으로 이어지는 두 표현을 입력하세요.',
      'Munosabatdan nikohga o‘tishni ifodalovchi ikki iborani kiriting.',
      'Type the two expressions showing the progression from dating to marriage.',
      'Введите два выражения, показывающих переход от отношений к браку.',
    ),
    sentenceTemplate: '오랫동안 ___한 두 사람은 결국 ___하기로 했어요.',
    blankAnswers: ['연애', '결혼'],
    answer: '연애|결혼',
    answerTranslation: L(
      '오랫동안 사귄 두 사람이 결국 결혼을 결정했어요.',
      'Uzoq vaqt uchrashgan juftlik oxiri turmush qurishga qaror qildi.',
      'The couple dated for a long time and eventually decided to marry.',
      'После долгих отношений пара наконец решила пожениться.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'A couple that dated for a long time eventually decided to get married.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_126_sentence_builder: {
    type: 'sentence_builder',
    instruction: L(
      '어절을 배열해 청혼 이후의 상황을 만드세요.',
      'Bo‘laklarni tartiblab taklifdan keyingi vaziyatni ifodalang.',
      'Arrange the chunks to describe what happened after the proposal.',
      'Расположите части и опишите ситуацию после предложения.',
    ),
    options: [
      '시작했어요',
      '청혼을',
      '받은 뒤',
      '결혼 준비를',
      '여행을',
      '끝냈어요',
    ],
    answer: '청혼을 받은 뒤 결혼 준비를 시작했어요',
    audioText: '청혼을 받은 뒤 결혼 준비를 시작했어요.',
    answerTranslation: L(
      '결혼하자는 제안을 받은 다음 결혼 준비를 시작했어요.',
      'Turmush qurish taklifini olgach, to‘yga tayyorgarlikni boshladim.',
      'I started wedding preparations after receiving the proposal.',
      'После предложения я начал подготовку к свадьбе.',
    ),
  },

  s6u1_127_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '아직 결혼 준비가 되지 않아 청혼에 바로 답하지 못했다는 문장을 만드세요.',
      'Hali nikohga tayyor bo‘lmaganingiz uchun taklifga darhol javob bera olmaganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying you could not answer the proposal immediately because you were not ready for marriage yet.',
      'Составьте предложение о том, что вы не смогли сразу ответить на предложение, потому что ещё не были готовы к браку.',
    ),
    options: [
      '바로',
      '아직',
      '못했어요',
      '청혼에',
      '결혼할 준비가',
      '대답하지',
      '돼서',
      '안 돼서',
    ],
    answer: '아직 결혼할 준비가 안 돼서 청혼에 바로 대답하지 못했어요',
    answerTranslation: L(
      '결혼할 준비가 아직 부족해서 청혼을 받고도 바로 결정하지 못했어요.',
      'Hali nikohga tayyor bo‘lmaganim uchun taklifga darhol javob bera olmadim.',
      'I was not ready for marriage yet, so I could not answer the proposal immediately.',
      'Я ещё не был готов к браку, поэтому не смог сразу ответить на предложение.',
    ),
  },

  s6u1_128_type_answer: {
    type: 'type_answer',
    instruction: L(
      '청혼 이후 신중하게 결정하는 상황을 완성하세요.',
      'Taklifdan keyin ehtiyotkorlik bilan qaror qilish vaziyatini tugallang.',
      'Complete the situation in which the couple makes a careful decision after the proposal.',
      'Дополните ситуацию, где после предложения пара принимает решение обдуманно.',
    ),
    sentenceTemplate:
      '청혼을 받았지만 바로 ___하지 않고 서로의 미래에 대해 더 ___.',
    blankAnswers: ['결정', '이야기했어요'],
    answer: '결정|이야기했어요',
    answerTranslation: L(
      '청혼 후 바로 결정하지 않고 앞으로의 생활에 대해 더 대화했어요.',
      'Taklifdan keyin darhol qaror qilmay, kelajakdagi hayotimiz haqida ko‘proq suhbatlashdik.',
      'We did not decide immediately after the proposal and discussed our future further.',
      'После предложения мы не стали решать сразу и ещё обсудили наше будущее.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'After receiving the proposal, the couple did not decide immediately and discussed their future further.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_129_listening: {
    type: 'listening',
    instruction: L(
      '음성을 듣고 남자가 청혼하기 전에 한 일을 고르세요.',
      'Audioyozuvni tinglab, erkak taklif qilishdan oldin nima qilganini tanlang.',
      'Listen and choose what the man did before proposing.',
      'Прослушайте и выберите, что мужчина сделал перед предложением.',
    ),
    audioText:
      '저는 바로 청혼하지 않았어요. 먼저 우리가 결혼 후 어디에서 살지, 일을 계속할지 충분히 이야기했어요. 서로 생각이 비슷하다는 걸 확인한 다음 청혼했어요.',
    options: [
      '결혼 후 생활 계획에 대해 충분히 이야기했다',
      '아무 말 없이 바로 예식장을 예약했다',
      '상대방의 의견을 듣지 않았다',
      '먼저 신혼여행부터 다녀왔다',
    ],
    answer: '결혼 후 생활 계획에 대해 충분히 이야기했다',
  },

  s6u1_130_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '결혼을 결정할 때 감정뿐 아니라 생활 계획도 함께 생각해야 한다는 문장을 만드세요.',
      'Nikohga qaror qilishda his-tuyg‘ular bilan birga hayot rejasini ham o‘ylash kerakligini bildiruvchi gap tuzing.',
      'Build a sentence saying marriage decisions should consider practical life plans as well as feelings.',
      'Составьте предложение о том, что при решении о браке нужно учитывать не только чувства, но и совместную жизнь.',
    ),
    options: [
      '생각해야',
      '마음뿐 아니라',
      '결혼은',
      '생활 계획도',
      '함께',
      '해요',
      '무시해야',
    ],
    answer: '결혼은 마음뿐 아니라 생활 계획도 함께 생각해야 해요',
    answerTranslation: L(
      '결혼할 때는 사랑하는 마음과 함께 실제 생활 계획도 중요해요.',
      'Nikohda sevgi bilan birga amaliy hayot rejasini ham o‘ylash muhim.',
      'Marriage requires thinking about practical life plans as well as feelings.',
      'При вступлении в брак важно думать не только о чувствах, но и о практической стороне жизни.',
    ),
  },

  s6u1_131_type_answer: {
    type: 'type_answer',
    instruction: L(
      '결혼 결정 전에 나눈 두 행동을 입력하세요.',
      'Nikohga qaror qilishdan oldingi ikki harakatni kiriting.',
      'Type the two actions taken before deciding to marry.',
      'Введите два действия перед решением вступить в брак.',
    ),
    sentenceTemplate: '우리는 결혼 후 어디에서 살지 함께 ___ 뒤 결혼을 ___.',
    blankAnswers: ['이야기한', '결정했어요'],
    answer: '이야기한|결정했어요',
    answerTranslation: L(
      '결혼 후의 생활 장소를 함께 이야기하고 나서 결혼을 결정했어요.',
      'Nikohdan keyin qayerda yashashimizni gaplashib, keyin turmush qurishga qaror qildik.',
      'We discussed where to live after marriage before deciding to marry.',
      'Мы обсудили, где будем жить после свадьбы, а затем приняли решение о браке.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The couple discussed where they would live after marriage and then decided to marry.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_132_error_hunt: {
    type: 'error_hunt',
    instruction: L(
      '문맥에 맞지 않는 표현을 찾아 고치세요.',
      'Kontekstga mos kelmaydigan ifodani topib tuzating.',
      'Find the expression that does not fit and correct it.',
      'Найдите неподходящее выражение и исправьте его.',
    ),
    npcText:
      '오랫동안 연애한 두 사람은 결국 헤어지기로 하고 결혼 준비를 시작했어요.',
    wrongWord: '헤어지기로',
    answer: '결혼하기로',
  },

  s6u1_133_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '청혼 전에 상대방도 결혼할 생각이 있는지 먼저 확인했다는 문장을 만드세요.',
      'Taklif qilishdan oldin odamning ham nikoh niyati borligini tekshirganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying you first checked whether the other person was also thinking about marriage.',
      'Составьте предложение о том, что перед предложением вы сначала узнали, думает ли другой человек о браке.',
    ),
    options: [
      '청혼하기',
      '확인했어요',
      '전에',
      '상대방도',
      '있는지',
      '결혼할 생각이',
      '무시했어요',
    ],
    answer: '청혼하기 전에 상대방도 결혼할 생각이 있는지 확인했어요',
    answerTranslation: L(
      '청혼하기 전에 상대방에게도 결혼 의사가 있는지 알아봤어요.',
      'Taklif qilishdan oldin uning ham nikoh niyati bor-yo‘qligini bilib oldim.',
      'Before proposing, I checked whether the other person also wanted marriage.',
      'Перед предложением я выяснил, хочет ли другой человек тоже вступить в брак.',
    ),
  },

  s6u1_134_type_answer: {
    type: 'type_answer',
    instruction: L(
      '청혼을 결심한 이유와 행동을 완성하세요.',
      'Taklif qilish sababini va harakatni tugallang.',
      'Complete the reason and action for proposing marriage.',
      'Дополните причину и действие, связанные с предложением.',
    ),
    sentenceTemplate: '저는 사랑하는 사람과 ___ 살고 싶어서 먼저 ___.',
    blankAnswers: ['함께', '청혼했어요'],
    answer: '함께|청혼했어요',
    answerTranslation: L(
      '사랑하는 사람과 계속 함께 살고 싶어서 제가 먼저 결혼을 제안했어요.',
      'Sevgan insonim bilan birga yashashni xohlaganim uchun men birinchi bo‘lib taklif qildim.',
      'I wanted to live with the person I love, so I proposed first.',
      'Я хотел жить вместе с любимым человеком, поэтому первым сделал предложение.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The speaker wanted to live together with the person they love and therefore proposed marriage first.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_135_cloze_passage: {
    type: 'cloze_passage',
    instruction: L(
      '연애에서 결혼 결정까지의 흐름에 맞게 세 빈칸을 채우세요.',
      'Munosabatdan nikoh qarorigacha bo‘lgan jarayonga mos uchta bo‘sh joyni to‘ldiring.',
      'Fill the three blanks according to the progression from dating to marriage.',
      'Заполните три пропуска по ходу развития отношений от свиданий до брака.',
    ),
    passage:
      '두 사람은 오랫동안 ___했습니다. 미래에 대해 충분히 이야기한 뒤 남자가 먼저 ___. 여자는 같은 마음이라고 했고 두 사람은 내년에 ___하기로 했습니다.',
    blankAnswers: ['연애', '청혼했습니다', '결혼'],
    options: ['결혼', '청혼했습니다', '연애', '헤어짐', '이사', '취업'],
    answer: '연애|청혼했습니다|결혼',
  },

  s6u1_136_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '청혼을 받은 날을 평생 기억할 것 같다는 문장을 만드세요.',
      'Taklif olgan kuningizni umr bo‘yi eslab qoladigandek ekaningizni bildiruvchi gap tuzing.',
      'Build a sentence saying you think you will remember the day of the proposal forever.',
      'Составьте предложение о том, что день предложения вы, вероятно, запомните на всю жизнь.',
    ),
    options: [
      '평생',
      '청혼을',
      '것 같아요',
      '받은 날은',
      '잊지 못할',
      '곧',
      '기억이 안 날',
    ],
    answer: '청혼을 받은 날은 평생 잊지 못할 것 같아요',
    answerTranslation: L(
      '결혼하자는 말을 들은 날은 평생 기억에 남을 것 같아요.',
      'Turmush qurish taklifini olgan kunimni umr bo‘yi unutmaydigandekman.',
      'I think I will never forget the day I received the marriage proposal.',
      'Мне кажется, я никогда не забуду день, когда получил предложение.',
    ),
  },

  s6u1_137_type_answer: {
    type: 'type_answer',
    instruction: L(
      '오랜 사랑과 결혼 결심을 완성하는 두 표현을 입력하세요.',
      'Uzoq sevgi va nikoh qarorini tugallaydigan ikki ifodani kiriting.',
      'Type the two expressions completing the long relationship and marriage decision.',
      'Введите два выражения, завершающих историю долгих отношений и решения о браке.',
    ),
    sentenceTemplate:
      '두 사람은 서로를 오래 ___ 왔고 이제 평생을 ___하기로 했어요.',
    blankAnswers: ['사랑해', '함께하기'],
    answer: '사랑해|함께하기',
    answerTranslation: L(
      '오랫동안 사랑한 두 사람이 앞으로 평생 함께 살기로 했어요.',
      'Uzoq vaqt bir-birini sevgan juftlik endi umr bo‘yi birga bo‘lishga qaror qildi.',
      'The couple loved each other for a long time and decided to spend their lives together.',
      'Пара долго любила друг друга и решила провести вместе всю жизнь.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The couple has loved each other for a long time and has now decided to spend the rest of their lives together.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_138_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '음성을 듣고 세 빈칸을 입력하세요.',
      'Audioyozuvni tinglab, uchta bo‘sh joyni kiriting.',
      'Listen and type the three missing expressions.',
      'Прослушайте и заполните три пропуска.',
    ),
    audioText:
      '오랫동안 연애한 뒤 청혼했고 서로 결혼할 생각이 같아서 내년 봄에 결혼하기로 했어요.',
    sentenceTemplate:
      '오랫동안 ___한 뒤 ___했고 서로 결혼할 생각이 같아서 내년 봄에 ___하기로 했어요.',
    blankAnswers: ['연애', '청혼', '결혼'],
    answer: '연애|청혼|결혼',
    grading: {
      mode: 'exact',
      expectedMeaning:
        'After a long romantic relationship, one person proposed, and because both wanted marriage, they decided to marry next spring.',
      acceptedAnswers: [],
      notes: ['Require the exact Korean words dictated in the audio.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_139_verb_transform: {
    type: 'verb_transform',
    instruction: L(
      '주어진 동사를 과거 해요체로 만드세요.',
      'Berilgan fe’lni o‘tgan zamon 해요체 shakliga aylantiring.',
      'Change the verb into the past-tense haeyo style.',
      'Поставьте глагол в прошедшее время в стиле 해요체.',
    ),
    baseWord: '청혼하다',
    targetForm: '과거 · 해요체',
    options: ['청', '혼', '했', '어', '요', '하'],
    answer: '청혼했어요',
  },

  s6u1_140_translate_type: {
    type: 'translate_type',
    instruction: L(
      '오랫동안 연애한 두 사람이 미래를 충분히 의논한 뒤 청혼하고 결혼을 결정했다는 의미를 자연스러운 한국어로 쓰세요.',
      'Uzoq vaqt uchrashgan juftlik kelajakni yetarlicha muhokama qilib, keyin taklif va nikoh qaroriga kelganini tabiiy koreys tilida yozing.',
      'Write naturally in Korean that a long-term couple discussed their future thoroughly, then proposed and decided to marry.',
      'Напишите естественно по-корейски, что пара после долгих отношений подробно обсудила будущее, затем последовало предложение и решение пожениться.',
    ),
    answer:
      '두 사람은 오랫동안 연애하면서 미래에 대해 충분히 이야기한 뒤 청혼하고 결혼하기로 했어요.',
    grading: {
      mode: 'semantic',
      expectedMeaning:
        'A couple in a long-term relationship discussed their future thoroughly, one proposed, and they decided to get married.',
      acceptedAnswers: [],
      notes: [
        'Preserve the long-term relationship, discussion of the future, proposal, and final marriage decision.',
      ],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
  },

  // ─────────────────────────────
  // Lesson 3 · 결혼 준비
  // q141 ~ q160
  // ─────────────────────────────

  s6u1_141_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '결혼 날짜를 정한 뒤 예식장을 예약했다는 문장을 만드세요.',
      'To‘y sanasini belgilagandan keyin marosim zalini band qilganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying the wedding hall was booked after setting the wedding date.',
      'Составьте предложение о том, что после выбора даты свадьбы был забронирован свадебный зал.',
    ),
    options: [
      '예약했어요',
      '정한 뒤',
      '결혼 날짜를',
      '예식장을',
      '취소했어요',
      '신혼집을',
    ],
    answer: '결혼 날짜를 정한 뒤 예식장을 예약했어요',
    answerTranslation: L(
      '결혼할 날짜를 정한 다음 결혼식 장소를 예약했어요.',
      'To‘y sanasini belgilab, keyin to‘y zalini band qildik.',
      'After setting the wedding date, we booked the wedding hall.',
      'После выбора даты свадьбы мы забронировали свадебный зал.',
    ),
  },

  s6u1_142_type_answer: {
    type: 'type_answer',
    instruction: L(
      '결혼식 장소와 초대장을 나타내는 두 단어를 입력하세요.',
      'To‘y joyi va taklifnomani bildiruvchi ikki so‘zni kiriting.',
      'Type the two words for the wedding venue and invitation.',
      'Введите два слова: место свадьбы и приглашение.',
    ),
    sentenceTemplate:
      '결혼식 장소는 ___으로 정했고 친구들에게 보낼 ___도 준비했어요.',
    blankAnswers: ['예식장', '청첩장'],
    answer: '예식장|청첩장',
    answerTranslation: L(
      '결혼식은 예식장에서 하기로 했고 친구들에게 보낼 청첩장도 준비했어요.',
      'To‘y zalda bo‘ladi, do‘stlarimizga yuboradigan taklifnomalarni ham tayyorladik.',
      'We chose a wedding hall for the ceremony and prepared invitations for our friends.',
      'Мы выбрали свадебный зал и подготовили приглашения для друзей.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The couple chose a wedding hall as the venue and prepared wedding invitations for friends.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_143_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글의 순서상 가장 먼저 한 일을 고르세요.',
      'Matn tartibiga ko‘ra eng avval qilingan ishni tanlang.',
      'Choose what the couple did first according to the passage.',
      'Выберите, что пара сделала первым согласно тексту.',
    ),
    passage:
      '두 사람은 먼저 결혼 날짜를 정했습니다. 그다음 원하는 지역의 예식장을 예약했습니다. 장소가 정해진 뒤 청첩장을 만들었고 마지막으로 신혼여행 일정을 확정했습니다.',
    options: [
      '결혼 날짜를 정했다',
      '청첩장을 만들었다',
      '신혼여행을 떠났다',
      '예식장을 취소했다',
    ],
    answer: '결혼 날짜를 정했다',
  },

  s6u1_144_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '청첩장을 보낸 뒤 신혼여행 교통편도 예약했다는 문장을 만드세요.',
      'Taklifnomalarni yuborgandan keyin asal oyi uchun transportni ham band qilganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying honeymoon transportation was also booked after sending invitations.',
      'Составьте предложение о том, что после отправки приглашений был забронирован транспорт для свадебного путешествия.',
    ),
    options: [
      '보낸 뒤',
      '예약했어요',
      '교통편도',
      '청첩장을',
      '신혼여행',
      '취소했어요',
    ],
    answer: '청첩장을 보낸 뒤 신혼여행 교통편도 예약했어요',
    answerTranslation: L(
      '친구들에게 청첩장을 보낸 다음 신혼여행 교통편까지 예약했어요.',
      'Taklifnomalarni yuborgach, asal oyi sayohati uchun transportni ham band qildik.',
      'After sending the invitations, we also booked transportation for the honeymoon.',
      'После отправки приглашений мы также забронировали транспорт для свадебного путешествия.',
    ),
  },

  s6u1_145_type_answer: {
    type: 'type_answer',
    instruction: L(
      '결혼 준비 순서를 나타내는 두 표현을 입력하세요.',
      'To‘yga tayyorgarlik tartibini ifodalovchi ikki iborani kiriting.',
      'Type the two expressions showing the order of wedding preparations.',
      'Введите два выражения, показывающих порядок подготовки к свадьбе.',
    ),
    sentenceTemplate:
      '예식장을 ___ 뒤에는 ___을 만들어 가족과 친구들에게 보냈어요.',
    blankAnswers: ['예약한', '청첩장'],
    answer: '예약한|청첩장',
    answerTranslation: L(
      '예식장을 예약하고 나서 결혼식 초대장을 만들어 보냈어요.',
      'To‘y zalini band qilgach, taklifnomalarni tayyorlab yubordik.',
      'After booking the wedding hall, we made and sent the invitations.',
      'После бронирования свадебного зала мы сделали и разослали приглашения.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'After booking the wedding hall, the couple made wedding invitations and sent them to family and friends.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_146_sentence_builder: {
    type: 'sentence_builder',
    instruction: L(
      '어절을 배열해 결혼 준비 상황을 설명하세요.',
      'Bo‘laklarni tartiblab to‘yga tayyorgarlik vaziyatini ifodalang.',
      'Arrange the chunks to describe the wedding preparations.',
      'Расположите части и опишите подготовку к свадьбе.',
    ),
    options: [
      '바빠요',
      '결혼 준비가',
      '주말마다',
      '생각보다',
      '많아서',
      '한가해서',
    ],
    answer: '결혼 준비가 생각보다 많아서 주말마다 바빠요',
    audioText: '결혼 준비가 생각보다 많아서 주말마다 바빠요.',
    answerTranslation: L(
      '준비할 것이 예상보다 많아서 매주 주말이 바빠요.',
      'Tayyorgarlik ishlari kutilganidan ko‘p bo‘lgani uchun har dam olish kuni bandmiz.',
      'There are more wedding preparations than expected, so every weekend is busy.',
      'Подготовительных дел оказалось больше, чем ожидалось, поэтому каждые выходные заняты.',
    ),
  },

  s6u1_147_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '결혼식이 끝난 다음 주에 신혼여행을 갈 예정이라는 문장을 만드세요.',
      'To‘ydan keyingi haftada asal oyi sayohatiga ketishingizni bildiruvchi gap tuzing.',
      'Build a sentence saying the honeymoon is planned for the week after the wedding.',
      'Составьте предложение о том, что свадебное путешествие запланировано на следующую неделю после свадьбы.',
    ),
    options: [
      '예정이에요',
      '신혼여행을',
      '결혼식이',
      '끝난',
      '다음 주에',
      '떠날',
      '취소할',
    ],
    answer: '결혼식이 끝난 다음 주에 신혼여행을 떠날 예정이에요',
    answerTranslation: L(
      '결혼식 다음 주에 두 사람이 신혼여행을 갈 거예요.',
      'To‘ydan keyingi haftada asal oyi sayohatiga ketamiz.',
      'We plan to leave for our honeymoon the week after the wedding.',
      'Мы собираемся отправиться в свадебное путешествие через неделю после свадьбы.',
    ),
  },

  s6u1_148_type_answer: {
    type: 'type_answer',
    instruction: L(
      '결혼 준비의 처음 두 단계를 입력하세요.',
      'To‘y tayyorgarligining dastlabki ikki bosqichini kiriting.',
      'Type the first two stages of the wedding preparation.',
      'Введите первые два этапа подготовки к свадьбе.',
    ),
    sentenceTemplate: '우리는 먼저 ___ 날짜를 정하고 그다음 ___을 예약했어요.',
    blankAnswers: ['결혼식', '예식장'],
    answer: '결혼식|예식장',
    answerTranslation: L(
      '결혼식 날짜를 먼저 정한 뒤 예식장을 예약했어요.',
      'Avval to‘y sanasini belgilab, keyin to‘y zalini band qildik.',
      'We first set the wedding date and then booked the wedding hall.',
      'Сначала мы выбрали дату свадьбы, затем забронировали зал.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The couple first set the wedding date and then booked the wedding hall.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_149_listening: {
    type: 'listening',
    instruction: L(
      '음성을 듣고 아직 끝내지 못한 준비를 고르세요.',
      'Audioyozuvni tinglab, hali tugallanmagan tayyorgarlikni tanlang.',
      'Listen and choose which preparation has not been completed yet.',
      'Прослушайте и выберите, какая подготовка ещё не закончена.',
    ),
    audioText:
      '예식장은 이미 예약했고 청첩장도 거의 다 보냈어요. 그런데 아직 신혼여행 날짜를 못 정했어요. 이번 주말에 같이 이야기해 보려고 해요.',
    options: [
      '신혼여행 날짜 정하기',
      '예식장 예약하기',
      '청첩장 만들기',
      '결혼 취소하기',
    ],
    answer: '신혼여행 날짜 정하기',
  },

  s6u1_150_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '청첩장에 예식 날짜와 장소를 정확하게 써야 한다는 문장을 만드세요.',
      'Taklifnomada to‘y sanasi va joyi aniq yozilishi kerakligini bildiruvchi gap tuzing.',
      'Build a sentence saying the wedding date and venue must be written accurately on the invitation.',
      'Составьте предложение о том, что в приглашении нужно точно указать дату и место свадьбы.',
    ),
    options: [
      '정확하게',
      '청첩장에는',
      '써야',
      '장소를',
      '예식 날짜와',
      '해요',
      '지워야',
    ],
    answer: '청첩장에는 예식 날짜와 장소를 정확하게 써야 해요',
    answerTranslation: L(
      '결혼식 초대장에는 날짜와 장소 정보를 정확하게 적어야 해요.',
      'To‘y taklifnomasida sana va joy aniq yozilishi kerak.',
      'The wedding invitation must clearly state the date and location.',
      'В свадебном приглашении нужно точно указать дату и место.',
    ),
  },

  s6u1_151_type_answer: {
    type: 'type_answer',
    instruction: L(
      '결혼 준비에서 챙겨야 하는 두 항목을 입력하세요.',
      'To‘yga tayyorgarlikda kerak bo‘lgan ikki narsani kiriting.',
      'Type the two items that must be handled during wedding preparations.',
      'Введите два пункта, которые нужно подготовить к свадьбе.',
    ),
    sentenceTemplate:
      '결혼 준비 중에는 ___, ___, 신혼여행까지 챙길 일이 많아요.',
    blankAnswers: ['청첩장', '예식장'],
    answer: '청첩장|예식장',
    answerTranslation: L(
      '결혼 준비에는 청첩장, 예식장, 신혼여행처럼 챙길 것이 많아요.',
      'To‘yga tayyorgarlikda taklifnoma, to‘y zali va asal oyi kabi ko‘p ish bor.',
      'Wedding preparations include many things such as invitations, the venue, and the honeymoon.',
      'При подготовке к свадьбе нужно заниматься приглашениями, залом, свадебным путешествием и многим другим.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'Wedding preparation involves handling invitations, the wedding hall, the honeymoon, and other tasks.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_152_error_hunt: {
    type: 'error_hunt',
    instruction: L(
      '문맥에 맞지 않는 단어를 찾아 고치세요.',
      'Kontekstga mos kelmaydigan so‘zni topib tuzating.',
      'Find the word that does not fit the context and correct it.',
      'Найдите неподходящее слово и исправьте его.',
    ),
    npcText: '친구들에게 결혼 소식을 알리려고 신혼여행을 보냈어요.',
    wrongWord: '신혼여행을',
    answer: '청첩장을',
  },

  s6u1_153_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '예식장 예약이 끝난 후 신혼여행 계획을 세우기 시작했다는 문장을 만드세요.',
      'To‘y zali band qilingach, asal oyi rejasini tuza boshlaganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying honeymoon planning began after the wedding hall was booked.',
      'Составьте предложение о том, что после бронирования свадебного зала начали планировать свадебное путешествие.',
    ),
    options: [
      '시작했어요',
      '예식장',
      '끝나자',
      '계획을',
      '신혼여행',
      '예약이',
      '취소하기',
    ],
    answer: '예식장 예약이 끝나자 신혼여행 계획을 시작했어요',
    answerTranslation: L(
      '예식장 예약을 마친 뒤 신혼여행 준비를 시작했어요.',
      'To‘y zalini band qilib bo‘lgach, asal oyi rejasini boshladik.',
      'After finishing the wedding hall reservation, we started planning the honeymoon.',
      'После бронирования свадебного зала мы начали планировать свадебное путешествие.',
    ),
  },

  s6u1_154_type_answer: {
    type: 'type_answer',
    instruction: L(
      '신혼여행 준비에 필요한 두 표현을 입력하세요.',
      'Asal oyi tayyorgarligiga oid ikki ifodani kiriting.',
      'Type the two expressions related to honeymoon preparation.',
      'Введите два выражения, связанные с подготовкой свадебного путешествия.',
    ),
    sentenceTemplate:
      '결혼식이 끝난 뒤 바로 ___을 떠날 예정이라 미리 ___도 했어요.',
    blankAnswers: ['신혼여행', '예약'],
    answer: '신혼여행|예약',
    answerTranslation: L(
      '결혼식 직후 신혼여행을 갈 계획이라 필요한 예약을 미리 했어요.',
      'To‘ydan keyin darhol asal oyiga ketadigan bo‘lganimiz uchun oldindan bron qildik.',
      'Because we plan to leave for the honeymoon right after the wedding, we made reservations in advance.',
      'Так как мы собираемся в свадебное путешествие сразу после свадьбы, всё забронировали заранее.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The couple plans to leave for the honeymoon immediately after the wedding and therefore made reservations in advance.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_155_cloze_passage: {
    type: 'cloze_passage',
    instruction: L(
      '결혼 준비 순서에 맞춰 세 빈칸을 채우세요.',
      'To‘y tayyorgarligi tartibiga mos uchta bo‘sh joyni to‘ldiring.',
      'Fill the three blanks according to the order of wedding preparations.',
      'Заполните три пропуска согласно порядку подготовки к свадьбе.',
    ),
    passage:
      '결혼 날짜를 정한 뒤 먼저 ___을 예약했습니다. 그다음 가족과 친구에게 보낼 ___을 만들었습니다. 마지막으로 결혼식 후 떠날 ___ 계획을 세웠습니다.',
    blankAnswers: ['예식장', '청첩장', '신혼여행'],
    options: ['신혼여행', '청첩장', '예식장', '맞선', '배우자', '신혼집'],
    answer: '예식장|청첩장|신혼여행',
  },

  s6u1_156_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '준비할 일이 많아도 두 사람이 함께하면 부담이 줄어든다는 문장을 만드세요.',
      'Tayyorlanadigan ishlar ko‘p bo‘lsa ham, ikkala odam birga qilsa yuk kamayishini bildiruvchi gap tuzing.',
      'Build a sentence saying wedding preparations feel less difficult when both people do them together.',
      'Составьте предложение о том, что подготовка к свадьбе легче, когда оба участвуют вместе.',
    ),
    options: [
      '함께하면',
      '덜',
      '준비할 일이',
      '힘들어요',
      '많아도',
      '둘이',
      '더 복잡해요',
    ],
    answer: '준비할 일이 많아도 둘이 함께하면 덜 힘들어요',
    answerTranslation: L(
      '결혼 준비가 많아도 두 사람이 같이 하면 부담이 줄어요.',
      'Tayyorgarlik ko‘p bo‘lsa ham, ikkovimiz birga qilsak yengilroq bo‘ladi.',
      'Even with many preparations, it is easier when both people do them together.',
      'Даже если дел много, готовиться легче, когда всё делают вдвоём.',
    ),
  },

  s6u1_157_type_answer: {
    type: 'type_answer',
    instruction: L(
      '아직 끝나지 않은 두 결혼 준비 항목을 입력하세요.',
      'Hali tugallanmagan ikki tayyorgarlik ishini kiriting.',
      'Type the two wedding preparation items that are not finished yet.',
      'Введите два пункта подготовки, которые ещё не завершены.',
    ),
    sentenceTemplate: '아직 ___을 보내지 못했고 ___도 최종 확인해야 해요.',
    blankAnswers: ['청첩장', '예식장'],
    answer: '청첩장|예식장',
    answerTranslation: L(
      '청첩장은 아직 보내지 못했고 예식장도 다시 확인해야 해요.',
      'Taklifnomalarni hali yubormadik va to‘y zalini ham yana tekshirishimiz kerak.',
      'We have not sent the invitations yet, and we still need to confirm the wedding hall.',
      'Мы ещё не отправили приглашения и должны окончательно подтвердить свадебный зал.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The invitations have not yet been sent and the wedding hall still requires final confirmation.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_158_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '음성을 듣고 세 빈칸을 입력하세요.',
      'Audioyozuvni tinglab, uchta bo‘sh joyni kiriting.',
      'Listen and type the three missing words.',
      'Прослушайте и заполните три пропуска.',
    ),
    audioText: '예식장을 예약하고 청첩장을 보낸 뒤 신혼여행 계획까지 세웠어요.',
    sentenceTemplate: '___을 예약하고 ___을 보낸 뒤 ___ 계획까지 세웠어요.',
    blankAnswers: ['예식장', '청첩장', '신혼여행'],
    answer: '예식장|청첩장|신혼여행',
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The dictated sentence says the couple booked the wedding hall, sent invitations, and planned the honeymoon.',
      acceptedAnswers: [],
      notes: ['Require the exact three Korean nouns from the audio.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_159_word_arrange: {
    type: 'word_arrange',
    instruction: L(
      '어절을 올바른 순서로 배열하세요.',
      'Bo‘laklarni to‘g‘ri tartiblang.',
      'Arrange the chunks in the correct order.',
      'Расположите части в правильном порядке.',
    ),
    options: [
      '많아서',
      '생각보다',
      '둘이',
      '결혼 준비가',
      '나누고 있어요',
      '일을',
      '혼자',
    ],
    answer: '결혼 준비가 생각보다 많아서 둘이 일을 나누고 있어요',
  },

  s6u1_160_translate_type: {
    type: 'translate_type',
    instruction: L(
      '결혼 날짜를 정한 뒤 예식장, 청첩장, 신혼여행을 차례로 준비했다는 내용을 자연스러운 한국어로 쓰세요.',
      'To‘y sanasini belgilagach, to‘y zali, taklifnoma va asal oyini navbat bilan tayyorlaganingizni tabiiy koreys tilida yozing.',
      'Write naturally in Korean that after setting the wedding date, the couple prepared the hall, invitations, and honeymoon in order.',
      'Напишите естественно по-корейски, что после выбора даты свадьбы пара по очереди подготовила зал, приглашения и свадебное путешествие.',
    ),
    answer:
      '결혼 날짜를 정한 뒤 예식장을 예약하고 청첩장을 보낸 다음 신혼여행을 준비했어요.',
    grading: {
      mode: 'semantic',
      expectedMeaning:
        'After setting the wedding date, the couple booked the wedding hall, sent wedding invitations, and then prepared for the honeymoon.',
      acceptedAnswers: [],
      notes: [
        'Preserve the chronological progression from date selection to venue, invitations, and honeymoon preparation.',
      ],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
  },

  // ─────────────────────────────
  // Lesson 4 · 신혼집과 신혼생활
  // q161 ~ q180
  // ─────────────────────────────

  s6u1_161_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '결혼 후 지금 사는 집에서 신혼생활을 시작할 생각이라는 문장을 만드세요.',
      'Nikohdan keyin hozir yashayotgan uyda yangi oilaviy hayotni boshlamoqchi ekaningizni bildiruvchi gap tuzing.',
      'Build a sentence saying you plan to begin newlywed life in your current home.',
      'Составьте предложение о том, что после свадьбы вы планируете начать семейную жизнь в нынешнем жилье.',
    ),
    options: [
      '시작할',
      '결혼 후에는',
      '생각이에요',
      '신혼생활을',
      '지금 사는 집에서',
      '끝낼',
    ],
    answer: '결혼 후에는 지금 사는 집에서 신혼생활을 시작할 생각이에요',
    answerTranslation: L(
      '결혼하면 현재 살고 있는 집에서 함께 생활을 시작하고 싶어요.',
      'Nikohdan keyin hozir yashayotgan uyimizda birga yashashni boshlamoqchimiz.',
      'After marriage, we plan to begin our married life in the home where I currently live.',
      'После свадьбы мы планируем начать совместную жизнь в доме, где я сейчас живу.',
    ),
  },

  s6u1_162_type_answer: {
    type: 'type_answer',
    instruction: L(
      '결혼 후 살 집과 필요한 살림을 나타내는 두 표현을 입력하세요.',
      'Nikohdan keyingi uy va ro‘zg‘orni bildiruvchi ikki ifodani kiriting.',
      'Type the two expressions for the newlywed home and household.',
      'Введите два выражения: жильё молодожёнов и домашнее хозяйство.',
    ),
    sentenceTemplate:
      '두 사람은 결혼 후 살 ___을 알아보고 새 ___도 준비했어요.',
    blankAnswers: ['신혼집', '신혼살림'],
    answer: '신혼집|신혼살림',
    answerTranslation: L(
      '결혼 후 함께 살 집을 알아보고 생활에 필요한 물건도 준비했어요.',
      'Nikohdan keyin birga yashaydigan uy topib, ro‘zg‘or buyumlarini ham tayyorladik.',
      'They looked for a newlywed home and prepared household items.',
      'Они искали жильё для молодожёнов и готовили вещи для совместной жизни.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The couple searched for a newlywed home and prepared the household needed for married life.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_163_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람이 신혼집 문제로 의견이 다른 이유를 고르세요.',
      'Ularning yangi uy masalasida fikri nega turlicha ekanini tanlang.',
      'Choose why the couple disagrees about their newlywed home.',
      'Выберите причину разногласия пары по поводу жилья молодожёнов.',
    ),
    passage:
      '민수는 지금 살고 있는 오피스텔이 직장과 가까워서 결혼 후에도 그곳에서 살고 싶어 합니다. 하지만 여자 친구는 앞으로 둘이 살기에는 조금 좁다고 생각해서 더 넓은 아파트를 원합니다.',
    options: [
      '한 사람은 가까운 오피스텔을 원하고 다른 사람은 넓은 집을 원해서',
      '둘 다 같은 집을 원해서',
      '두 사람 모두 신혼집이 필요 없다고 생각해서',
      '신혼여행 장소가 달라서',
    ],
    answer: '한 사람은 가까운 오피스텔을 원하고 다른 사람은 넓은 집을 원해서',
  },

  s6u1_164_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '직장과 가까워서 현재의 오피스텔에서 신혼생활을 시작하고 싶다는 문장을 만드세요.',
      'Ish joyiga yaqin bo‘lgani uchun hozirgi ofis-telda yangi oilaviy hayotni boshlamoqchi ekaningizni bildiruvchi gap tuzing.',
      'Build a sentence saying you want to begin newlywed life in the current officetel because it is close to work.',
      'Составьте предложение о том, что вы хотите начать семейную жизнь в нынешнем офис-теле, потому что он близко к работе.',
    ),
    options: [
      '가까워서',
      '시작하고',
      '오피스텔에서',
      '직장과',
      '신혼생활을',
      '싶어요',
      '멀어서',
    ],
    answer: '직장과 가까워서 오피스텔에서 신혼생활을 시작하고 싶어요',
    answerTranslation: L(
      '현재 집이 직장과 가까우므로 그곳에서 결혼 생활을 시작하고 싶어요.',
      'Hozirgi uy ish joyiga yaqin, shuning uchun oilaviy hayotni shu yerda boshlamoqchiman.',
      'The current home is close to work, so I want to begin married life there.',
      'Нынешнее жильё близко к работе, поэтому я хочу начать семейную жизнь там.',
    ),
  },

  s6u1_165_type_answer: {
    type: 'type_answer',
    instruction: L(
      '두 사람이 원하는 집의 차이를 나타내는 두 표현을 입력하세요.',
      'Ikki kishining uy haqidagi turli istaklarini bildiruvchi ikki ifodani kiriting.',
      'Type the two expressions showing the difference in the homes they want.',
      'Введите два выражения, показывающих разницу в предпочтениях по жилью.',
    ),
    sentenceTemplate:
      '저는 직장과 가까운 ___을 원하지만 배우자는 더 넓은 ___를 원해요.',
    blankAnswers: ['오피스텔', '아파트'],
    answer: '오피스텔|아파트',
    answerTranslation: L(
      '저는 가까운 오피스텔을 원하고 배우자는 넓은 아파트를 원해요.',
      'Men ishga yaqin ofis-telni xohlayman, turmush o‘rtog‘im esa kengroq kvartirani xohlaydi.',
      'I want an officetel close to work, while my spouse wants a larger apartment.',
      'Я хочу офис-тел рядом с работой, а супруг хочет более просторную квартиру.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'One person prefers an officetel close to work while the spouse prefers a larger apartment.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_166_sentence_builder: {
    type: 'sentence_builder',
    instruction: L(
      '어절을 배열해 신혼집 선택 기준을 설명하세요.',
      'Bo‘laklarni tartiblab yangi uy tanlash mezonlarini ifodalang.',
      'Arrange the chunks to describe criteria for choosing a newlywed home.',
      'Расположите части и опишите критерии выбора жилья молодожёнов.',
    ),
    options: [
      '함께',
      '위치와',
      '신혼집을',
      '생각해야',
      '넓이를',
      '정할 때는',
      '해요',
      '가격만',
    ],
    answer: '신혼집을 정할 때는 위치와 넓이를 함께 생각해야 해요',
    audioText: '신혼집을 정할 때는 위치와 넓이를 함께 생각해야 해요.',
    answerTranslation: L(
      '신혼집을 고를 때 위치와 크기를 모두 고려해야 해요.',
      'Yangi uy tanlashda joylashuvi va kattaligini birga hisobga olish kerak.',
      'When choosing a newlywed home, both location and size should be considered.',
      'При выборе жилья молодожёнов нужно учитывать и расположение, и размер.',
    ),
  },

  s6u1_167_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '이사 전에 필요한 신혼살림을 하나씩 준비했다는 문장을 만드세요.',
      'Ko‘chishdan oldin yangi oila uchun kerakli ro‘zg‘orni birma-bir tayyorlaganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying household items were prepared one by one before moving.',
      'Составьте предложение о том, что до переезда постепенно подготовили всё необходимое для семейного быта.',
    ),
    options: [
      '준비했어요',
      '필요한',
      '이사하기 전에',
      '하나씩',
      '신혼살림을',
      '버렸어요',
    ],
    answer: '이사하기 전에 필요한 신혼살림을 하나씩 준비했어요',
    answerTranslation: L(
      '신혼집으로 이사하기 전에 생활에 필요한 물건을 하나씩 마련했어요.',
      'Yangi uyga ko‘chishdan oldin kerakli ro‘zg‘or buyumlarini birma-bir tayyorladik.',
      'Before moving into the newlywed home, we prepared the household items one by one.',
      'Перед переездом в новое жильё мы постепенно подготовили все необходимые бытовые вещи.',
    ),
  },

  s6u1_168_type_answer: {
    type: 'type_answer',
    instruction: L(
      '집을 정한 뒤 이어지는 두 준비를 입력하세요.',
      'Uy tanlangandan keyingi ikki tayyorgarlik ishini kiriting.',
      'Type the two preparations that follow choosing the home.',
      'Введите два этапа после выбора жилья.',
    ),
    sentenceTemplate:
      '신혼집이 정해진 뒤 가구와 생활용품 같은 ___을 준비하고 ___을 시작했어요.',
    blankAnswers: ['신혼살림', '신혼생활'],
    answer: '신혼살림|신혼생활',
    answerTranslation: L(
      '집을 정한 후 필요한 살림을 준비하고 함께 생활을 시작했어요.',
      'Uy tanlangach, kerakli ro‘zg‘orni tayyorlab, birgalikdagi oilaviy hayotni boshladik.',
      'After choosing the home, they prepared the household and began newlywed life.',
      'После выбора жилья они подготовили всё необходимое и начали семейную жизнь.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'After choosing their home, the couple prepared household items and began their newlywed life.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_169_listening: {
    type: 'listening',
    instruction: L(
      '음성을 듣고 두 사람이 아직 결정하지 못한 것을 고르세요.',
      'Audioyozuvni tinglab, ular hali qaror qilmagan narsani tanlang.',
      'Listen and choose what the couple has not yet decided.',
      'Прослушайте и выберите, что пара ещё не решила.',
    ),
    audioText:
      '저는 직장과 가까운 지금 집에서 살고 싶어요. 그런데 제 배우자는 둘이 살기에는 너무 좁다면서 넓은 아파트를 원해요. 아직 어느 집에서 살지는 결정하지 못했어요.',
    options: ['신혼집', '결혼 여부', '청첩장 디자인', '신혼여행 날짜'],
    answer: '신혼집',
  },

  s6u1_170_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '신혼집에 대한 두 사람의 의견이 달라 결정하는 데 시간이 걸렸다는 문장을 만드세요.',
      'Yangi uy borasida fikrlar turlicha bo‘lgani uchun qaror qilishga vaqt ketganini bildiruvchi gap tuzing.',
      'Build a sentence saying choosing the newlywed home took time because the couple had different opinions.',
      'Составьте предложение о том, что выбор жилья занял время из-за разных мнений.',
    ),
    options: [
      '시간이',
      '달라서',
      '신혼집에 대한',
      '걸렸어요',
      '의견이',
      '결정하는 데',
      '같아서',
    ],
    answer: '신혼집에 대한 의견이 달라서 결정하는 데 시간이 걸렸어요',
    answerTranslation: L(
      '두 사람이 원하는 집이 달라서 신혼집을 결정하는 데 오래 걸렸어요.',
      'Xohlagan uyimiz turlicha bo‘lgani uchun qaror qilishga ko‘p vaqt ketdi.',
      'Because we wanted different kinds of homes, choosing the newlywed home took time.',
      'Поскольку мы хотели разное жильё, выбор дома для молодожёнов занял много времени.',
    ),
  },

  s6u1_171_type_answer: {
    type: 'type_answer',
    instruction: L(
      '신혼집에 대한 두 사람의 다른 생각을 완성하세요.',
      'Yangi uy haqidagi ikki xil fikrni tugallang.',
      'Complete the two different preferences about the newlywed home.',
      'Дополните два разных мнения о жилье молодожёнов.',
    ),
    sentenceTemplate:
      '한 사람은 ___을 원했고 다른 사람은 넓은 아파트를 원해서 서로 ___이 달랐어요.',
    blankAnswers: ['오피스텔', '생각'],
    answer: '오피스텔|생각',
    answerTranslation: L(
      '한 사람은 오피스텔을 원하고 다른 사람은 넓은 아파트를 원했어요.',
      'Biri ofis-telni, ikkinchisi keng kvartirani xohladi, shuning uchun fikrlari turlicha edi.',
      'One wanted an officetel and the other wanted a spacious apartment, so their views differed.',
      'Один хотел офис-тел, другой просторную квартиру, поэтому их мнения различались.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'One partner wanted an officetel while the other wanted a spacious apartment, so they had different views.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_172_error_hunt: {
    type: 'error_hunt',
    instruction: L(
      '문장의 의미와 맞지 않는 단어를 찾아 고치세요.',
      'Gap ma’nosiga mos kelmaydigan so‘zni topib tuzating.',
      'Find and correct the word that contradicts the sentence.',
      'Найдите и исправьте слово, противоречащее смыслу предложения.',
    ),
    npcText: '직장과 가까운 집을 원해서 출퇴근이 먼 곳을 신혼집으로 골랐어요.',
    wrongWord: '먼',
    answer: '편한',
  },

  s6u1_173_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '신혼생활을 시작하기 전에 서로의 생활 방식을 충분히 이야기했다는 문장을 만드세요.',
      'Yangi oilaviy hayotni boshlashdan oldin turmush tarzini yetarlicha muhokama qilganingizni bildiruvchi gap tuzing.',
      'Build a sentence saying the couple discussed their lifestyles thoroughly before beginning newlywed life.',
      'Составьте предложение о том, что перед началом семейной жизни пара подробно обсудила свой образ жизни.',
    ),
    options: [
      '이야기했어요',
      '서로의',
      '전에',
      '신혼생활을',
      '충분히',
      '생활 방식을',
      '시작하기',
      '무시했어요',
    ],
    answer: '신혼생활을 시작하기 전에 서로의 생활 방식을 충분히 이야기했어요',
    answerTranslation: L(
      '함께 살기 전에 서로의 생활 습관과 방식을 충분히 대화했어요.',
      'Birga yashashdan oldin turmush tarzimiz va odatlarimiz haqida batafsil gaplashdik.',
      'Before living together, we discussed our lifestyles and habits thoroughly.',
      'Перед началом совместной жизни мы подробно обсудили привычки и образ жизни друг друга.',
    ),
  },

  s6u1_174_type_answer: {
    type: 'type_answer',
    instruction: L(
      '행복한 신혼생활에 필요한 두 행동을 입력하세요.',
      'Baxtli oilaviy hayot uchun kerak bo‘lgan ikki harakatni kiriting.',
      'Type the two actions needed for a good newlywed life.',
      'Введите два действия, необходимые для хорошей семейной жизни.',
    ),
    sentenceTemplate:
      '결혼 후에는 서로의 생활 습관을 ___하고 집안일도 함께 ___ 싶어요.',
    blankAnswers: ['이해', '나누고'],
    answer: '이해|나누고',
    answerTranslation: L(
      '서로의 습관을 이해하고 집안일도 같이 하고 싶어요.',
      'Bir-birimizning odatlarimizni tushunib, uy ishlarini ham bo‘lishib qilmoqchimiz.',
      'We want to understand each other habits and share the housework.',
      'Мы хотим понимать привычки друг друга и делить домашние дела.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The speaker wants the couple to understand each other habits and share household chores after marriage.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_175_cloze_passage: {
    type: 'cloze_passage',
    instruction: L(
      '신혼집과 생활 준비에 맞게 세 빈칸을 채우세요.',
      'Yangi uy va oilaviy hayot tayyorgarligiga mos uchta bo‘sh joyni to‘ldiring.',
      'Fill the three blanks about the newlywed home and household.',
      'Заполните три пропуска о жилье и быте молодожёнов.',
    ),
    passage:
      '두 사람은 결혼 후 함께 살 ___을 알아봤습니다. 집이 정해진 뒤 필요한 ___을 준비했고 이사 후에는 본격적으로 ___을 시작했습니다.',
    blankAnswers: ['신혼집', '신혼살림', '신혼생활'],
    options: ['신혼생활', '신혼집', '신혼살림', '맞선', '청첩장', '예식장'],
    answer: '신혼집|신혼살림|신혼생활',
  },

  s6u1_176_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '신혼집이 작아도 두 사람이 편하게 살 수 있다면 괜찮다는 문장을 만드세요.',
      'Yangi uy kichik bo‘lsa ham, ikkovingiz qulay yashay olsangiz yaxshi ekanini bildiruvchi gap tuzing.',
      'Build a sentence saying a small newlywed home is fine if the couple can live comfortably there.',
      'Составьте предложение о том, что небольшое жильё подходит, если паре там комфортно.',
    ),
    options: [
      '괜찮아요',
      '신혼집이',
      '살 수 있다면',
      '작아도',
      '둘이',
      '편하게',
      '안 돼요',
    ],
    answer: '신혼집이 작아도 둘이 편하게 살 수 있다면 괜찮아요',
    answerTranslation: L(
      '집이 조금 작아도 두 사람이 편안하게 지낼 수 있으면 괜찮아요.',
      'Uy kichik bo‘lsa ham, ikkovimiz qulay yashay olsak mayli.',
      'Even if the home is small, it is fine if the two of us can live comfortably.',
      'Даже если жильё небольшое, всё нормально, если нам вдвоём комфортно.',
    ),
  },

  s6u1_177_type_answer: {
    type: 'type_answer',
    instruction: L(
      '신혼집을 고를 때 고려할 두 요소를 입력하세요.',
      'Yangi uy tanlashda hisobga olinadigan ikki omilni kiriting.',
      'Type the two factors to consider when choosing a newlywed home.',
      'Введите два фактора, которые нужно учитывать при выборе жилья.',
    ),
    sentenceTemplate:
      '신혼집을 고를 때는 크기뿐 아니라 ___와 직장까지의 ___도 중요해요.',
    blankAnswers: ['위치', '거리'],
    answer: '위치|거리',
    answerTranslation: L(
      '신혼집은 크기뿐 아니라 위치와 직장까지의 거리도 중요해요.',
      'Yangi uy tanlashda kattalikdan tashqari joylashuvi va ishgacha bo‘lgan masofa ham muhim.',
      'When choosing a newlywed home, location and distance to work matter as well as size.',
      'При выборе жилья важны не только размеры, но и расположение и расстояние до работы.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'When choosing a newlywed home, location and distance to work are important in addition to size.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_178_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '음성을 듣고 세 빈칸을 입력하세요.',
      'Audioyozuvni tinglab, uchta bo‘sh joyni kiriting.',
      'Listen and type the three missing expressions.',
      'Прослушайте и заполните три пропуска.',
    ),
    audioText:
      '신혼집을 정한 뒤 필요한 신혼살림을 준비하고 그곳에서 신혼생활을 시작했어요.',
    sentenceTemplate:
      '___을 정한 뒤 필요한 ___을 준비하고 그곳에서 ___을 시작했어요.',
    blankAnswers: ['신혼집', '신혼살림', '신혼생활'],
    answer: '신혼집|신혼살림|신혼생활',
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The dictated sentence says the couple chose their newlywed home, prepared household items, and began newlywed life there.',
      acceptedAnswers: [],
      notes: ['Require the exact three Korean expressions from the audio.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_179_verb_transform: {
    type: 'verb_transform',
    instruction: L(
      '주어진 동사를 과거 해요체로 만드세요.',
      'Fe’lni o‘tgan zamon 해요체 shakliga aylantiring.',
      'Change the verb into past-tense haeyo style.',
      'Поставьте глагол в прошедшее время в стиле 해요체.',
    ),
    baseWord: '시작하다',
    targetForm: '과거 · 해요체',
    options: ['시', '작', '했', '어', '요', '하'],
    answer: '시작했어요',
  },

  s6u1_180_translate_type: {
    type: 'translate_type',
    instruction: L(
      '결혼 후 함께 살 집을 정하고 필요한 살림을 준비한 뒤 신혼생활을 시작했다는 내용을 자연스러운 한국어로 쓰세요.',
      'Nikohdan keyin birga yashaydigan uyni tanlab, kerakli ro‘zg‘orni tayyorlab, oilaviy hayotni boshlaganingizni tabiiy koreys tilida yozing.',
      'Write naturally in Korean that the couple chose a home, prepared the household, and then began newlywed life.',
      'Напишите естественно по-корейски, что после свадьбы пара выбрала жильё, подготовила всё необходимое и начала семейную жизнь.',
    ),
    answer:
      '결혼 후 신혼집을 정하고 필요한 신혼살림을 준비한 뒤 신혼생활을 시작했어요.',
    grading: {
      mode: 'semantic',
      expectedMeaning:
        'After marriage, the couple chose their newlywed home, prepared the necessary household items, and began newlywed life.',
      acceptedAnswers: [],
      notes: [
        'Preserve the progression of choosing the home, preparing the household, and beginning newlywed life.',
      ],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
  },

  // ─────────────────────────────
  // Lesson 5 · 사랑과 결혼관
  // q181 ~ q200
  // ─────────────────────────────

  s6u1_181_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '중매결혼보다 서로 사랑해서 하는 결혼을 더 선호한다는 문장을 만드세요.',
      'Vositachi orqali nikohdan ko‘ra sevgi asosidagi nikohni ko‘proq yoqtirishingizni bildiruvchi gap tuzing.',
      'Build a sentence saying you prefer love marriage to arranged marriage.',
      'Составьте предложение о том, что вы предпочитаете брак по любви браку по сватовству.',
    ),
    options: [
      '더',
      '중매결혼보다',
      '선호해요',
      '저는',
      '연애결혼을',
      '싫어해요',
    ],
    answer: '저는 중매결혼보다 연애결혼을 더 선호해요',
    answerTranslation: L(
      '저는 소개를 통한 결혼보다 사랑해서 하는 결혼을 더 좋아해요.',
      'Men vositachi orqali nikohdan ko‘ra sevgi asosidagi nikohni afzal ko‘raman.',
      'I prefer love marriage to arranged marriage.',
      'Я предпочитаю брак по любви браку по сватовству.',
    ),
  },

  s6u1_182_type_answer: {
    type: 'type_answer',
    instruction: L(
      '과거와 현재의 결혼 방식을 비교하는 두 표현을 입력하세요.',
      'Avvalgi va hozirgi nikoh usullarini solishtiruvchi ikki ifodani kiriting.',
      'Type the two expressions comparing past and present marriage styles.',
      'Введите два выражения для сравнения брака в прошлом и настоящем.',
    ),
    sentenceTemplate:
      '부모님 세대에는 ___도 많았지만 요즘은 ___을 선택하는 사람도 많아요.',
    blankAnswers: ['중매결혼', '연애결혼'],
    answer: '중매결혼|연애결혼',
    answerTranslation: L(
      '예전에는 중매결혼도 많았지만 지금은 연애결혼을 선택하는 사람도 많아요.',
      'Avval vositachi orqali nikoh ko‘p bo‘lgan, hozir esa sevgi asosidagi nikohni tanlaydiganlar ko‘p.',
      'Arranged marriages were common in the past, while many people now choose love marriage.',
      'Раньше браки по сватовству были распространены, а сегодня многие выбирают брак по любви.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'Arranged marriage was common in the older generation, while many people today choose love marriage.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_183_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글쓴이가 오래 행복한 관계를 위해 중요하다고 보는 것을 고르세요.',
      'Muallif uzoq va baxtli munosabat uchun nimani muhim deb bilishini tanlang.',
      'Choose what the writer considers important for a long and happy relationship.',
      'Выберите, что автор считает важным для долгих счастливых отношений.',
    ),
    passage:
      '사랑하는 마음만 있으면 언제까지나 행복할 수 있다고 생각하는 사람도 있습니다. 하지만 오래 함께하려면 상대방을 이해하고 서로 다른 점을 인정하는 노력도 필요합니다. 사랑은 감정이지만 관계를 지키는 데에는 두 사람의 노력이 필요하기 때문입니다.',
    options: [
      '서로 이해하고 관계를 위해 노력하는 것',
      '항상 같은 생각만 하는 것',
      '상대방의 단점을 전부 바꾸는 것',
      '조건만 맞으면 바로 결혼하는 것',
    ],
    answer: '서로 이해하고 관계를 위해 노력하는 것',
  },

  s6u1_184_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '좋은 배우자는 조건보다 서로 이해하고 함께 성장할 수 있는 사람이라는 문장을 만드세요.',
      'Yaxshi turmush o‘rtog‘i shartlardan ko‘ra bir-birini tushunib, birga rivojlana oladigan inson ekanini bildiruvchi gap tuzing.',
      'Build a sentence saying a good spouse is someone you can understand and grow together with, rather than someone who only meets conditions.',
      'Составьте предложение о том, что хороший супруг — это человек, с которым можно понимать друг друга и расти вместе, а не просто соответствовать условиям.',
    ),
    options: [
      '사람이라고',
      '서로',
      '생각해요',
      '조건보다',
      '함께 성장할 수 있는',
      '이해하고',
      '배우자는',
      '좋은',
    ],
    answer:
      '좋은 배우자는 조건보다 서로 이해하고 함께 성장할 수 있는 사람이라고 생각해요',
    answerTranslation: L(
      '저는 조건보다 서로 이해하고 같이 성장할 수 있는 사람이 좋은 배우자라고 생각해요.',
      'Menimcha, yaxshi turmush o‘rtog‘i shartlarga mos odam emas, balki birga tushunib va rivojlana oladigan insondir.',
      'I think a good spouse is someone you can understand and grow together with rather than someone who merely satisfies conditions.',
      'Я считаю хорошим супругом того, с кем можно понимать друг друга и расти вместе, а не просто человека, соответствующего условиям.',
    ),
  },

  s6u1_185_type_answer: {
    type: 'type_answer',
    instruction: L(
      '결혼 상대를 볼 때 고려할 두 요소를 입력하세요.',
      'Turmush quradigan insonni tanlashda hisobga olinadigan ikki omilni kiriting.',
      'Type the two factors to consider in a marriage partner.',
      'Введите два фактора, которые стоит учитывать при выборе будущего супруга.',
    ),
    sentenceTemplate:
      '결혼 상대를 볼 때는 경제적인 ___뿐 아니라 서로를 ___하는 마음도 중요해요.',
    blankAnswers: ['조건', '이해'],
    answer: '조건|이해',
    answerTranslation: L(
      '경제적인 조건뿐 아니라 서로 이해하려는 마음도 중요해요.',
      'Moliyaviy shartlardan tashqari bir-birini tushunish istagi ham muhim.',
      'Financial conditions matter, but mutual understanding is also important.',
      'Важны не только материальные условия, но и желание понимать друг друга.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'When considering a marriage partner, mutual understanding is important in addition to financial conditions.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_186_sentence_builder: {
    type: 'sentence_builder',
    instruction: L(
      '어절을 배열해 좋은 관계에 대한 생각을 완성하세요.',
      'Bo‘laklarni tartiblab yaxshi munosabat haqidagi fikrni tugating.',
      'Arrange the chunks to complete the idea about a good relationship.',
      'Расположите части и завершите мысль о хороших отношениях.',
    ),
    options: [
      '관계를',
      '천생연분이라고',
      '노력하지 않으면',
      '해도',
      '어려워요',
      '서로',
      '지키기',
    ],
    answer: '천생연분이라고 해도 서로 노력하지 않으면 관계를 지키기 어려워요',
    audioText:
      '천생연분이라고 해도 서로 노력하지 않으면 관계를 지키기 어려워요.',
    answerTranslation: L(
      '아주 잘 맞는 사람끼리도 서로 노력하지 않으면 좋은 관계를 유지하기 어려워요.',
      'Juda mos juftlik ham bir-biri uchun harakat qilmasa, yaxshi munosabatni saqlash qiyin.',
      'Even a perfectly matched couple needs to make an effort to maintain the relationship.',
      'Даже идеальной паре трудно сохранить отношения без взаимных усилий.',
    ),
  },

  s6u1_187_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '사랑하는 사람과 평생 함께하려면 서로의 차이를 존중해야 한다는 문장을 만드세요.',
      'Sevgan inson bilan umr bo‘yi birga bo‘lish uchun farqlarni hurmat qilish kerakligini bildiruvchi gap tuzing.',
      'Build a sentence saying people must respect their differences to spend a lifetime together.',
      'Составьте предложение о том, что для совместной жизни на всю жизнь нужно уважать различия друг друга.',
    ),
    options: [
      '평생',
      '서로의 차이를',
      '함께하려면',
      '사랑하는 사람과',
      '존중해야',
      '해요',
      '무시해야',
    ],
    answer: '사랑하는 사람과 평생 함께하려면 서로의 차이를 존중해야 해요',
    answerTranslation: L(
      '오래 함께 살기 위해서는 서로 다른 점을 인정하고 존중해야 해요.',
      'Umr bo‘yi birga yashash uchun bir-birining farqlarini qabul qilib, hurmat qilish kerak.',
      'To spend a lifetime together, people need to accept and respect each other differences.',
      'Чтобы прожить вместе всю жизнь, нужно принимать и уважать различия друг друга.',
    ),
  },

  s6u1_188_type_answer: {
    type: 'type_answer',
    instruction: L(
      '아주 잘 어울리는 부부를 설명하는 두 표현을 입력하세요.',
      'Juda mos juftlikni ifodalovchi ikki iborani kiriting.',
      'Type the two expressions describing a perfectly matched couple.',
      'Введите два выражения, описывающих идеально подходящую пару.',
    ),
    sentenceTemplate:
      '두 사람이 서로 잘 이해하고 오래 사랑한다면 정말 ___처럼 느껴질 수 ___.',
    blankAnswers: ['천생연분', '있어요'],
    answer: '천생연분|있어요',
    answerTranslation: L(
      '서로 잘 이해하고 오래 사랑하는 두 사람은 천생연분처럼 보일 수 있어요.',
      'Bir-birini tushunib, uzoq sevgan juftlik bir-biri uchun yaratilgandek ko‘rinishi mumkin.',
      'A couple that understands and loves each other for a long time can seem like a perfect match.',
      'Пара, которая долго любит и понимает друг друга, может казаться идеальной.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'A couple that understands each other well and loves for a long time may feel like a perfect match.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_189_listening: {
    type: 'listening',
    instruction: L(
      '음성을 듣고 화자가 배우자에게 가장 중요하게 생각하는 조건을 고르세요.',
      'Audioyozuvni tinglab, so‘zlovchi turmush o‘rtog‘ida eng muhim deb biladigan jihatni tanlang.',
      'Listen and choose what the speaker values most in a spouse.',
      'Прослушайте и выберите, что говорящий больше всего ценит в супруге.',
    ),
    audioText:
      '저는 돈이나 외모보다 대화가 잘되는 사람이 좋아요. 힘든 일이 생겼을 때 서로 솔직하게 이야기하고 이해할 수 있는 사람이 좋은 배우자라고 생각해요.',
    options: [
      '서로 솔직하게 대화하고 이해할 수 있는 것',
      '돈이 아주 많은 것',
      '외모가 유명 배우와 비슷한 것',
      '항상 같은 취미만 하는 것',
    ],
    answer: '서로 솔직하게 대화하고 이해할 수 있는 것',
  },

  s6u1_190_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '결혼은 반드시 해야 하는 일이 아니라 준비됐을 때 선택하고 싶다는 문장을 만드세요.',
      'Nikoh majburiy narsa emas, tayyor bo‘lganda tanlamoqchi ekaningizni bildiruvchi gap tuzing.',
      'Build a sentence saying marriage is not something you must do and you want to choose it when ready.',
      'Составьте предложение о том, что брак не является обязательным и вы хотите выбрать его, когда будете готовы.',
    ),
    options: [
      '준비됐을 때',
      '결혼을',
      '선택하고',
      '꼭 해야 한다기보다',
      '싶어요',
      '저는',
      '무조건',
    ],
    answer: '저는 결혼을 꼭 해야 한다기보다 준비됐을 때 선택하고 싶어요',
    answerTranslation: L(
      '결혼을 의무처럼 생각하기보다 제가 준비됐을 때 하고 싶어요.',
      'Nikohni majburiyat deb emas, o‘zim tayyor bo‘lganimda tanlamoqchiman.',
      'Rather than treating marriage as an obligation, I want to choose it when I am ready.',
      'Я не считаю брак обязанностью и хочу вступить в него тогда, когда буду готов.',
    ),
  },

  s6u1_191_type_answer: {
    type: 'type_answer',
    instruction: L(
      '배우자를 선택할 때 확인할 두 내용을 입력하세요.',
      'Turmush o‘rtog‘ini tanlashda tekshiriladigan ikki mazmunni kiriting.',
      'Type the two things to check when choosing a spouse.',
      'Введите два момента, которые нужно учитывать при выборе супруга.',
    ),
    sentenceTemplate:
      '좋은 ___를 만나더라도 서로의 가치관이 ___ 맞는지 확인하고 싶어요.',
    blankAnswers: ['배우자', '잘'],
    answer: '배우자|잘',
    answerTranslation: L(
      '좋은 사람을 만나도 서로의 가치관이 잘 맞는지 확인하고 싶어요.',
      'Yaxshi insonni uchratsam ham, qadriyatlarimiz mos kelishini tekshirmoqchiman.',
      'Even after meeting a good partner, I want to check whether our values are compatible.',
      'Даже встретив хорошего человека, я хочу убедиться, что наши ценности совпадают.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'Even with a good spouse candidate, the speaker wants to confirm that their values are compatible.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_192_error_hunt: {
    type: 'error_hunt',
    instruction: L(
      '정의와 맞지 않는 단어를 찾아 고치세요.',
      'Ta’rifga mos kelmaydigan so‘zni topib tuzating.',
      'Find the incorrect term and correct it.',
      'Найдите неправильный термин и исправьте его.',
    ),
    npcText: '서로 사랑해서 결혼하는 것을 중매결혼이라고 해요.',
    wrongWord: '중매결혼이라고',
    answer: '연애결혼이라고',
  },

  s6u1_193_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '결혼 후에도 서로의 개인적인 시간과 꿈을 존중하고 싶다는 문장을 만드세요.',
      'Nikohdan keyin ham bir-biringizning shaxsiy vaqti va orzularini hurmat qilmoqchi ekaningizni bildiruvchi gap tuzing.',
      'Build a sentence saying you want to respect each other personal time and dreams even after marriage.',
      'Составьте предложение о том, что даже после свадьбы вы хотите уважать личное время и мечты друг друга.',
    ),
    options: [
      '결혼 후에도',
      '서로의',
      '존중하고',
      '개인적인 시간과 꿈을',
      '싶어요',
      '포기하게',
    ],
    answer: '결혼 후에도 서로의 개인적인 시간과 꿈을 존중하고 싶어요',
    answerTranslation: L(
      '결혼해도 서로의 개인 생활과 목표를 존중하고 싶어요.',
      'Turmush qurgandan keyin ham bir-birimizning shaxsiy hayoti va maqsadlarini hurmat qilmoqchimiz.',
      'Even after marriage, I want us to respect each other personal lives and goals.',
      'Даже после свадьбы я хочу, чтобы мы уважали личную жизнь и цели друг друга.',
    ),
  },

  s6u1_194_type_answer: {
    type: 'type_answer',
    instruction: L(
      '행복한 결혼생활을 위한 두 행동을 입력하세요.',
      'Baxtli nikoh uchun kerak bo‘lgan ikki harakatni kiriting.',
      'Type the two actions needed for a happy married life.',
      'Введите два действия, необходимых для счастливой семейной жизни.',
    ),
    sentenceTemplate:
      '행복한 결혼생활을 위해서는 서로의 생각을 ___ 듣고 문제가 생기면 함께 ___해야 해요.',
    blankAnswers: ['잘', '해결'],
    answer: '잘|해결',
    answerTranslation: L(
      '서로의 이야기를 잘 듣고 문제가 생기면 같이 해결해야 해요.',
      'Bir-birimizni diqqat bilan tinglab, muammo bo‘lsa birga hal qilishimiz kerak.',
      'For a happy marriage, people should listen to each other and solve problems together.',
      'Для счастливого брака нужно слушать друг друга и вместе решать проблемы.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'A happy marriage requires listening carefully to each other and solving problems together.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_195_cloze_passage: {
    type: 'cloze_passage',
    instruction: L(
      '결혼관에 관한 글의 세 빈칸을 채우세요.',
      'Nikoh haqidagi matnning uchta bo‘sh joyini to‘ldiring.',
      'Fill the three blanks in the passage about marriage values.',
      'Заполните три пропуска в тексте о взглядах на брак.',
    ),
    passage:
      '저는 단순히 조건이 좋은 사람보다 서로 말이 잘 통하는 ___를 만나고 싶습니다. 사랑하는 마음뿐 아니라 서로를 ___하려는 노력도 필요하다고 생각합니다. 그렇게 오래 함께할 수 있다면 두 사람은 정말 ___처럼 느껴질 것입니다.',
    blankAnswers: ['배우자', '이해', '천생연분'],
    options: ['천생연분', '이해', '배우자', '청첩장', '예식장', '신혼여행'],
    answer: '배우자|이해|천생연분',
  },

  s6u1_196_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '평생 함께할 사람이라면 어려울 때 서로 힘이 되어야 한다는 문장을 만드세요.',
      'Umr bo‘yi birga bo‘ladigan insonlar qiyin paytda bir-biriga tayanch bo‘lishi kerakligini bildiruvchi gap tuzing.',
      'Build a sentence saying lifelong partners should support each other during difficult times.',
      'Составьте предложение о том, что люди, которые хотят быть вместе всю жизнь, должны поддерживать друг друга в трудные времена.',
    ),
    options: [
      '힘이',
      '어려울 때도',
      '되어야',
      '평생 함께할 사람이라면',
      '서로',
      '해요',
      '외면해야',
    ],
    answer: '평생 함께할 사람이라면 어려울 때도 서로 힘이 되어야 해요',
    answerTranslation: L(
      '오랫동안 함께할 부부라면 힘든 순간에도 서로 도와야 해요.',
      'Umr bo‘yi birga yashaydigan juftlik qiyin paytda ham bir-birini qo‘llab-quvvatlashi kerak.',
      'Lifelong partners should support one another even in difficult times.',
      'Если люди хотят быть вместе всю жизнь, они должны поддерживать друг друга и в трудные времена.',
    ),
  },

  s6u1_197_type_answer: {
    type: 'type_answer',
    instruction: L(
      '원하는 배우자의 성격과 대화 특징을 입력하세요.',
      'Istalgan turmush o‘rtog‘ining xarakter va muloqot xususiyatlarini kiriting.',
      'Type the personality and communication qualities desired in a spouse.',
      'Введите качества характера и общения, желательные в будущем супруге.',
    ),
    sentenceTemplate:
      '저는 조건만 맞는 사람보다 ___ 잘 통하고 ___ 착한 사람을 배우자로 만나고 싶어요.',
    blankAnswers: ['말이', '마음씨가'],
    answer: '말이|마음씨가',
    answerTranslation: L(
      '저는 조건보다 대화가 잘되고 마음이 착한 사람을 만나고 싶어요.',
      'Men shartlarga mos odamdan ko‘ra, yaxshi suhbatlashadigan va mehribon insonni turmush o‘rtog‘i sifatida xohlayman.',
      'I would rather marry someone kind-hearted who communicates well than someone who merely meets conditions.',
      'Я хотел бы встретить доброго человека, с которым легко общаться, а не просто того, кто соответствует формальным условиям.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The speaker prefers a spouse who communicates well and is kind-hearted rather than someone who merely meets external conditions.',
      acceptedAnswers: [],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_198_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '음성을 듣고 세 빈칸을 입력하세요.',
      'Audioyozuvni tinglab, uchta bo‘sh joyni kiriting.',
      'Listen and type the three missing expressions.',
      'Прослушайте и заполните три пропуска.',
    ),
    audioText:
      '좋은 배우자는 서로를 이해하고 어려울 때 힘이 되어 주며 함께 성장할 수 있는 사람이라고 생각해요.',
    sentenceTemplate:
      '좋은 ___는 서로를 ___하고 어려울 때 힘이 되어 주며 함께 ___할 수 있는 사람이라고 생각해요.',
    blankAnswers: ['배우자', '이해', '성장'],
    answer: '배우자|이해|성장',
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The dictated sentence defines a good spouse as someone who understands, supports, and grows together with their partner.',
      acceptedAnswers: [],
      notes: ['Require the exact Korean nouns and verb stems from the audio.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
  },

  s6u1_199_word_arrange: {
    type: 'word_arrange',
    instruction: L(
      '어절을 올바른 순서로 배열하세요.',
      'Bo‘laklarni to‘g‘ri tartiblang.',
      'Arrange the chunks in the correct order.',
      'Расположите части в правильном порядке.',
    ),
    options: [
      '배우자라고',
      '이해할 수 있는',
      '생각해요',
      '서로',
      '좋은',
      '사람이',
      '조건만',
    ],
    answer: '서로 이해할 수 있는 사람이 좋은 배우자라고 생각해요',
  },

  s6u1_200_translate_type: {
    type: 'translate_type',
    instruction: L(
      '좋은 결혼은 단순히 조건이 맞는 것이 아니라 서로 이해하고 존중하며 함께 노력하는 관계라는 생각을 자연스러운 한국어로 쓰세요.',
      'Yaxshi nikoh faqat shartlarning mosligi emas, balki bir-birini tushunish, hurmat qilish va birga harakat qilishdan iborat ekanini tabiiy koreys tilida yozing.',
      'Write naturally in Korean that a good marriage is not merely about matching conditions but about understanding, respecting, and making an effort together.',
      'Напишите естественно по-корейски, что хороший брак строится не только на подходящих условиях, но и на взаимном понимании, уважении и совместных усилиях.',
    ),
    answer:
      '좋은 결혼은 조건만 맞는 것이 아니라 서로 이해하고 존중하면서 함께 노력하는 관계라고 생각해요.',
    grading: {
      mode: 'semantic',
      expectedMeaning:
        'The speaker believes a good marriage is based not merely on matching external conditions but on mutual understanding, respect, and continued shared effort.',
      acceptedAnswers: [],
      notes: [
        'Preserve the contrast between external conditions and the deeper requirements of understanding, respect, and mutual effort.',
      ],
      tolerance: {
        punctuation: true,
        spacing: true,
        minorTypos: true,
      },
    },
  },
} as const;

const S6_UNIT1_NODE3_QUESTIONS = {
  // ────────────────────────────────────────────────────────────
  // Node 3 · 배우자 조건과 결혼의 현실
  // Lesson 1 · 배우자의 조건
  // q201 ~ q220
  // ────────────────────────────────────────────────────────────

  s6u1_201_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '외모보다 성격과 대화가 잘 맞는 사람을 배우자로 만나고 싶다는 문장을 만드세요.',
      'Tashqi ko‘rinishdan ko‘ra xarakteri va muloqoti mos insonni turmush o‘rtog‘i sifatida uchratmoqchi ekaningizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “I want a spouse whose personality and communication fit me better than just good looks.”',
      'Составьте предложение: «Я хочу встретить супруга, с которым совпадают характер и общение, а не только внешность».',
    ),
    options: [
      '배우자로',
      '잘',
      '성격과',
      '외모보다',
      '사람을',
      '만나고',
      '대화가',
      '저는',
      '싶어요',
      '맞는',
      '학력만',
      '돈이 많은',
    ],
    answer: '저는 외모보다 성격과 대화가 잘 맞는 사람을 배우자로 만나고 싶어요',
    answerTranslation: L(
      '저는 외모보다 성격과 대화가 잘 맞는 사람을 배우자로 만나고 싶어요.',
      'Men tashqi ko‘rinishdan ko‘ra xarakteri va muloqoti menga mos inson bilan turmush qurishni xohlayman.',
      'I want a spouse whose personality and communication fit me better than appearance alone.',
      'Я хочу встретить супруга, с которым совпадают характер и общение, а не только внешность.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['marriage', 'spouse-condition', 'translate-builder'],
  },

  s6u1_202_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '결혼할 사람을 선택할 때 중요하게 생각하는 여러 기준을 ___이라고 할 수 있어요.',
    blankAnswers: ['배우자 조건'],
    answerTranslation: L(
      '결혼할 사람을 선택할 때 보는 기준을 배우자 조건이라고 할 수 있어요.',
      'Turmush quradigan insonni tanlashdagi mezonlar 배우자 조건 deb aytiladi.',
      'The criteria used when choosing a spouse can be called 배우자 조건.',
      'Критерии выбора будущего супруга можно назвать 배우자 조건.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target expression is 배우자 조건.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 배우자 조건.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['spouse-condition', 'type-answer'],
  },

  s6u1_203_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '얼굴이나 키처럼 겉으로 보이는 모습을 중요하게 생각한다면 ___를 보는 거예요.',
    blankAnswers: ['외모'],
    options: ['외모', '학력', '종교', '직업', '나이 차이'],
    answer: '외모',
    answerTranslation: L(
      '겉으로 보이는 모습은 외모예요.',
      'Tashqaridan ko‘rinadigan qiyofa 외모 deyiladi.',
      'A person’s outward appearance is 외모.',
      'Внешний вид человека — 외모.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['appearance', 'spouse-condition'],
  },

  s6u1_204_listening: {
    type: 'listening',
    instruction: L(
      '화자가 배우자를 선택할 때 가장 중요하게 생각하는 것을 고르세요.',
      'So‘zlovchi turmush o‘rtog‘ini tanlashda eng muhim deb biladigan narsani tanlang.',
      'Choose what the speaker considers most important when choosing a spouse.',
      'Выберите, что говорящий считает самым важным при выборе супруга.',
    ),
    audioText:
      '저는 외모나 직업보다 성격을 더 중요하게 생각해요. 오래 함께 살려면 서로 말이 잘 통하고 편해야 한다고 생각하거든요.',
    options: ['성격', '외모', '직업', '학력'],
    answer: '성격',
    answerTranslation: L(
      '화자는 성격을 가장 중요하게 생각해요.',
      'So‘zlovchi xarakterni eng muhim deb biladi.',
      'The speaker values personality the most.',
      'Говорящий больше всего ценит характер.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['personality', 'spouse-condition', 'listening'],
  },

  s6u1_205_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '배우자를 선택할 때 직업보다 성격을 더 중요하게 생각한다는 문장을 만드세요.',
      'Turmush o‘rtog‘ini tanlashda kasbdan ko‘ra xarakterni muhimroq deb bilishingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “When choosing a spouse, I value personality more than occupation.”',
      'Составьте предложение: «При выборе супруга я считаю характер важнее профессии».',
    ),
    options: [
      '생각해요',
      '배우자를',
      '성격을',
      '고를',
      '직업보다',
      '더',
      '중요하게',
      '때는',
      '학력을',
      '덜',
    ],
    answer: '배우자를 고를 때는 직업보다 성격을 더 중요하게 생각해요',
    answerTranslation: L(
      '배우자를 고를 때는 직업보다 성격을 더 중요하게 생각해요.',
      'Turmush o‘rtog‘ini tanlashda kasbdan ko‘ra xarakterni muhimroq deb bilaman.',
      'When choosing a spouse, I consider personality more important than occupation.',
      'При выборе супруга я считаю характер важнее профессии.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['personality', 'occupation', 'translate-builder'],
  },

  s6u1_206_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '조건보다',
      '서로',
      '더',
      '중요해요',
      '이해하는',
      '것이',
      '외적인',
      '무시하는',
    ],
    answer: '외적인 조건보다 서로 이해하는 것이 더 중요해요',
    audioText: '외적인 조건보다 서로 이해하는 것이 더 중요해요.',
    answerTranslation: L(
      '외적인 조건보다 서로 이해하는 것이 더 중요해요.',
      'Tashqi shartlardan ko‘ra bir-birini tushunish muhimroq.',
      'Understanding each other is more important than external conditions.',
      'Понимать друг друга важнее внешних условий.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['understanding', 'condition', 'word-arrange'],
  },

  s6u1_207_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '학교를 어느 단계까지 다녔는지를 나타내는 공식적인 말은 ___이에요.',
    blankAnswers: ['학력'],
    answerTranslation: L(
      '학교 교육을 받은 정도를 학력이라고 해요.',
      'Olingan ta’lim darajasi 학력 deyiladi.',
      'Educational background is called 학력.',
      'Уровень полученного образования называется 학력.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target Korean noun is 학력.',
      acceptedAnswers: [],
      notes: ['Require 학력.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['education-background', 'type-answer'],
  },

  s6u1_208_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글쓴이가 배우자를 선택할 때 가장 중요하게 생각하지 않는 것을 고르세요.',
      'Muallif turmush o‘rtog‘ini tanlashda eng muhim deb hisoblamaydigan narsani tanlang.',
      'Choose what the writer does NOT consider especially important when choosing a spouse.',
      'Выберите, что автор НЕ считает особенно важным при выборе супруга.',
    ),
    passage:
      '저는 결혼할 사람의 직업이나 학력이 아주 좋아야 한다고 생각하지 않습니다. 물론 기본적인 생활이 가능해야 하지만, 무엇보다 서로 대화가 잘 통하고 성격이 잘 맞는 사람이 좋습니다. 힘든 일이 있을 때 솔직하게 이야기할 수 있는 관계가 중요합니다.',
    options: [
      '높은 학력',
      '대화가 잘 통하는 것',
      '성격이 잘 맞는 것',
      '솔직하게 이야기할 수 있는 것',
    ],
    answer: '높은 학력',
    answerTranslation: L(
      '글쓴이는 높은 학력보다 성격과 대화를 더 중요하게 생각해요.',
      'Muallif yuqori ta’lim darajasidan ko‘ra xarakter va muloqotni muhimroq deb biladi.',
      'The writer values personality and communication more than a high educational background.',
      'Автор ценит характер и общение больше, чем высокий уровень образования.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['spouse-condition', 'reading'],
  },

  s6u1_209_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText:
      '저는 대화가 잘 통하고 마음씨가 착한 사람이 좋아서 배우자의 학력만 가장 중요하게 봐요.',
    wrongWord: '학력만',
    options: ['성격을', '학력만', '나이만', '외모만'],
    answer: '성격을',
    answerTranslation: L(
      '저는 대화가 잘 통하고 마음씨가 착한 사람이 좋아서 배우자의 성격을 가장 중요하게 봐요.',
      'Men yaxshi muloqot qiladigan va mehribon odamni yoqtirganim uchun turmush o‘rtog‘ining xarakterini eng muhim deb bilaman.',
      'I value a spouse’s personality most because I like someone kind who communicates well.',
      'Я больше всего ценю характер супруга, потому что мне нравится добрый человек, с которым легко общаться.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['personality', 'error-hunt'],
  },

  s6u1_210_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '학력이나 직업이 좋아도 성격이 맞지 않으면 고민할 것 같다는 문장을 만드세요.',
      'Ta’limi va kasbi yaxshi bo‘lsa ham, xarakterlar mos kelmasa ikkilanishingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “Even with a good education and job, I would hesitate if our personalities did not match.”',
      'Составьте предложение: «Даже при хорошем образовании и работе я бы сомневался, если характеры не совпадают».',
    ),
    options: [
      '좋아도',
      '고민할',
      '성격이',
      '직업이',
      '학력이나',
      '맞지',
      '않으면',
      '것 같아요',
      '바로',
      '결혼할',
    ],
    answer: '학력이나 직업이 좋아도 성격이 맞지 않으면 고민할 것 같아요',
    answerTranslation: L(
      '학력이나 직업이 좋아도 성격이 맞지 않으면 고민할 것 같아요.',
      'Ta’limi yoki kasbi yaxshi bo‘lsa ham, xarakterimiz mos kelmasa ikkilanaman.',
      'Even with a good education or occupation, I would hesitate if our personalities did not match.',
      'Даже при хорошем образовании или профессии я бы сомневался, если характеры не совпадают.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['education', 'occupation', 'personality', 'translate-builder'],
  },

  s6u1_211_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 단어를 입력하세요.',
      'Eshitgan gapingizdagi tushib qolgan so‘zni yozing.',
      'Type the missing word from the sentence.',
      'Введите пропущенное слово из услышанного предложения.',
    ),
    audioText: '저는 배우자를 고를 때 성격을 가장 중요하게 생각해요.',
    sentenceTemplate: '저는 배우자를 고를 때 ___을 가장 중요하게 생각해요.',
    blankAnswers: ['성격'],
    answerTranslation: L(
      '저는 배우자를 고를 때 성격을 가장 중요하게 생각해요.',
      'Men turmush o‘rtog‘ini tanlashda xarakterni eng muhim deb bilaman.',
      'I consider personality the most important factor when choosing a spouse.',
      'При выборе супруга я считаю характер самым важным.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated missing word is 성격.',
      acceptedAnswers: [],
      notes: ['Require 성격.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 4,
    tags: ['personality', 'listen-fill'],
  },

  s6u1_212_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '사람마다 중요하게 생각하는 배우자 ___은 다릅니다. 어떤 사람은 ___를 중요하게 보고, 어떤 사람은 학력이나 ___을 더 중요하게 생각합니다.',
    blankAnswers: ['조건', '성격', '직업'],
    options: ['조건', '성격', '직업', '신혼여행', '청첩장'],
    answer: '조건|성격|직업',
    answerTranslation: L(
      '배우자 조건으로 성격, 직업 등 여러 가지를 생각할 수 있어요.',
      'Turmush o‘rtog‘i mezonlarida xarakter, kasb va boshqa jihatlar bo‘lishi mumkin.',
      'Spouse criteria can include personality, occupation, and many other factors.',
      'Критериями выбора супруга могут быть характер, профессия и многое другое.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['spouse-condition', 'cloze'],
  },

  s6u1_213_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '불교, 기독교, 이슬람교처럼 신앙과 관련된 체계를 ___라고 해요.',
    blankAnswers: ['종교'],
    answerTranslation: L(
      '신앙과 관련된 체계를 종교라고 해요.',
      'E’tiqod bilan bog‘liq tizim 종교 deyiladi.',
      'A system of faith or belief is called 종교.',
      'Система верований называется 종교.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target Korean noun is 종교.',
      acceptedAnswers: [],
      notes: ['Require 종교.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['religion', 'type-answer'],
  },

  s6u1_214_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer: '저는 외모보다 성격이 잘 맞고 서로 이해할 수 있는 사람이 좋아요.',
    audioText:
      '저는 외모보다 성격이 잘 맞고 서로 이해할 수 있는 사람이 좋아요.',
    answerTranslation: L(
      '저는 외모보다 성격이 잘 맞고 서로 이해할 수 있는 사람이 좋아요.',
      'Men tashqi ko‘rinishdan ko‘ra xarakteri mos va bir-birimizni tushuna oladigan insonni yoqtiraman.',
      'I prefer someone whose personality matches mine and who can understand me.',
      'Мне нравится человек, с которым совпадают характеры и есть взаимопонимание.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['spouse-condition', 'speaking'],
  },

  s6u1_215_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '종교가 다르다면 결혼 전에 충분히 이야기해 보고 싶다는 문장을 만드세요.',
      'Dinlar har xil bo‘lsa, nikohdan oldin bu haqda yetarlicha gaplashmoqchi ekaningizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “If our religions are different, I want to discuss it thoroughly before marriage.”',
      'Составьте предложение: «Если религии разные, я хочу всё подробно обсудить до брака».',
    ),
    options: [
      '다르다면',
      '이야기해',
      '결혼',
      '충분히',
      '종교가',
      '전에',
      '싶어요',
      '보고',
      '무시하고',
      '바로',
    ],
    answer: '종교가 다르다면 결혼 전에 충분히 이야기해 보고 싶어요',
    answerTranslation: L(
      '종교가 다르다면 결혼 전에 충분히 이야기해 보고 싶어요.',
      'Dinimiz turlicha bo‘lsa, nikohdan oldin yaxshilab gaplashmoqchiman.',
      'If our religions differ, I want to discuss it thoroughly before marriage.',
      'Если религии различаются, я хочу подробно обсудить это до брака.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['religion', 'marriage', 'translate-builder'],
  },

  s6u1_216_listening: {
    type: 'listening',
    instruction: L(
      '화자가 상대방을 좋은 결혼 상대로 생각하는 이유를 고르세요.',
      'So‘zlovchi nima uchun bu odamni yaxshi turmush o‘rtog‘i deb hisoblashini tanlang.',
      'Choose why the speaker thinks the other person would be a good spouse.',
      'Выберите, почему говорящий считает этого человека хорошим будущим супругом.',
    ),
    audioText:
      '그 사람은 직업이나 학력도 괜찮지만 그것보다 저와 성격이 잘 맞아요. 힘든 일이 생겨도 서로 솔직하게 이야기할 수 있어서 결혼을 생각하게 됐어요.',
    options: [
      '서로 성격이 잘 맞고 솔직하게 이야기할 수 있어서',
      '학력만 아주 높아서',
      '외모가 유명 배우와 비슷해서',
      '부모님이 무조건 결혼하라고 해서',
    ],
    answer: '서로 성격이 잘 맞고 솔직하게 이야기할 수 있어서',
    answerTranslation: L(
      '성격이 잘 맞고 서로 솔직하게 대화할 수 있기 때문이에요.',
      'Xarakterlari mos va bir-biri bilan ochiq gaplasha olishgani uchun.',
      'Because their personalities match and they can communicate honestly.',
      'Потому что у них совпадают характеры и они могут честно разговаривать друг с другом.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['compatibility', 'listening'],
  },

  s6u1_217_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '외모, 성격, 학력, 직업처럼 배우자를 선택할 때 보는 기준을 ___이라고 해요.',
    blankAnswers: ['조건'],
    options: ['조건', '청혼', '신혼', '연애', '첫인상'],
    answer: '조건',
    answerTranslation: L(
      '선택할 때 보는 기준은 조건이에요.',
      'Tanlashdagi mezon 조건 deyiladi.',
      'A criterion used when making a choice is 조건.',
      'Критерий выбора — 조건.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['condition'],
  },

  s6u1_218_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '좋지만',
      '외모도',
      '더',
      '성격이',
      '중요해요',
      '저는',
      '맞는',
      '조건만',
    ],
    answer: '저는 외모도 좋지만 성격이 맞는 게 더 중요해요',
    audioText: '저는 외모도 좋지만 성격이 맞는 게 더 중요해요.',
    answerTranslation: L(
      '저는 외모도 좋지만 성격이 맞는 게 더 중요해요.',
      'Tashqi ko‘rinish ham muhim, lekin men uchun xarakter mosligi muhimroq.',
      'Appearance matters too, but personality compatibility is more important to me.',
      'Внешность тоже важна, но для меня важнее совместимость характеров.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['appearance', 'personality', 'word-arrange'],
  },

  s6u1_219_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '얼굴, 키, 체형처럼 눈으로 보이는 사람의 겉모습을 ___라고 해요.',
    blankAnswers: ['외모'],
    answerTranslation: L(
      '사람의 겉으로 보이는 모습을 외모라고 해요.',
      'Insonning tashqi qiyofasi 외모 deyiladi.',
      'A person’s outward appearance is called 외모.',
      'Внешний облик человека называется 외모.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target Korean noun is 외모.',
      acceptedAnswers: [],
      notes: ['Require 외모.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['appearance', 'type-answer'],
  },

  s6u1_220_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람의 배우자 조건이 다른 점을 고르세요.',
      'Ikki kishining turmush o‘rtog‘i mezonlaridagi farqni tanlang.',
      'Choose the difference between the two people’s spouse criteria.',
      'Выберите различие в критериях выбора супруга у двух людей.',
    ),
    passage:
      '수진은 결혼할 사람의 성격과 대화를 가장 중요하게 생각합니다. 직업이나 학력은 크게 중요하지 않다고 합니다. 반면 민호는 서로 성격이 잘 맞는 것도 중요하지만 안정적인 직업도 꼭 필요하다고 생각합니다.',
    options: [
      '민호는 직업도 중요하게 생각하지만 수진은 그렇지 않다',
      '수진만 성격을 중요하게 생각한다',
      '두 사람 모두 학력만 중요하게 생각한다',
      '민호는 성격을 전혀 중요하게 생각하지 않는다',
    ],
    answer: '민호는 직업도 중요하게 생각하지만 수진은 그렇지 않다',
    answerTranslation: L(
      '민호는 직업도 중요하게 생각하지만 수진은 직업을 크게 중요하게 보지 않아요.',
      'Minho kasbni ham muhim deb biladi, Sujin esa uni uncha muhim deb hisoblamaydi.',
      'Minho values occupation as well, while Sujin does not consider it very important.',
      'Минхо считает профессию важной, а Суджин не придаёт ей большого значения.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['spouse-condition', 'review', 'reading'],
  },

  // ────────────────────────────────────────────────────────────
  // Lesson 2 · 연상, 연하와 나이 차이
  // q221 ~ q240
  // ────────────────────────────────────────────────────────────

  s6u1_221_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '결혼할 사람과의 나이 차이는 크게 중요하지 않다고 생각한다는 문장을 만드세요.',
      'Turmush quradigan inson bilan yosh farqi unchalik muhim emas deb o‘ylashingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “I do not think the age difference with a spouse is very important.”',
      'Составьте предложение: «Я не считаю разницу в возрасте с будущим супругом очень важной».',
    ),
    options: [
      '나이',
      '중요하지',
      '결혼할',
      '크게',
      '사람과의',
      '생각해요',
      '차이는',
      '않다고',
      '가장',
      '외모는',
    ],
    answer: '결혼할 사람과의 나이 차이는 크게 중요하지 않다고 생각해요',
    answerTranslation: L(
      '결혼할 사람과의 나이 차이는 크게 중요하지 않다고 생각해요.',
      'Turmush quradigan inson bilan yosh farqi juda muhim emas deb o‘ylayman.',
      'I do not think the age difference with a future spouse is very important.',
      'Я не считаю разницу в возрасте с будущим супругом очень важной.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['age-gap', 'translate-builder'],
  },

  s6u1_222_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '자기보다 나이가 많은 사람을 가리킬 때 사용하는 말은 ___이에요.',
    blankAnswers: ['연상'],
    answerTranslation: L(
      '자기보다 나이가 많은 상대를 연상이라고 해요.',
      'O‘zidan yoshi katta inson 연상 deyiladi.',
      'A person older than oneself can be described as 연상.',
      'Человека старше себя называют 연상.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target Korean word is 연상.',
      acceptedAnswers: [],
      notes: ['Require 연상.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['older-partner', 'type-answer'],
  },

  s6u1_223_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '자기보다 나이가 어린 사람과 사귄다면 상대방은 ___이에요.',
    blankAnswers: ['연하'],
    options: ['연하', '연상', '배우자', '중매', '동갑'],
    answer: '연하',
    answerTranslation: L(
      '자기보다 나이가 어린 상대는 연하예요.',
      'O‘zidan yoshi kichik inson 연하 deyiladi.',
      'A younger partner is 연하.',
      'Партнёр младше вас — 연하.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['younger-partner'],
  },

  s6u1_224_listening: {
    type: 'listening',
    instruction: L(
      '화자의 배우자에 대한 설명으로 맞는 것을 고르세요.',
      'So‘zlovchining turmush o‘rtog‘i haqidagi to‘g‘ri ta’rifni tanlang.',
      'Choose the correct description of the speaker’s spouse.',
      'Выберите правильное описание супруга говорящего.',
    ),
    audioText:
      '제 남편은 저보다 네 살 많아요. 처음에는 나이 차이가 조금 걱정됐지만 지금은 전혀 신경 쓰이지 않아요.',
    options: [
      '남편은 화자보다 네 살 연상이다',
      '남편은 화자보다 네 살 연하다',
      '두 사람은 나이가 같다',
      '화자는 나이 차이 때문에 헤어졌다',
    ],
    answer: '남편은 화자보다 네 살 연상이다',
    answerTranslation: L(
      '남편은 화자보다 네 살 많아요.',
      'Eri so‘zlovchidan to‘rt yosh katta.',
      'The husband is four years older than the speaker.',
      'Муж на четыре года старше говорящей.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['older-partner', 'age-gap', 'listening'],
  },

  s6u1_225_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '상대방이 다섯 살 연상이지만 나이 차이를 거의 느끼지 못한다는 문장을 만드세요.',
      'Sherigingiz besh yosh katta bo‘lsa ham, yosh farqini deyarli sezmasligingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “My partner is five years older, but I hardly feel the age difference.”',
      'Составьте предложение: «Мой партнёр на пять лет старше, но я почти не ощущаю разницы в возрасте».',
    ),
    options: [
      '느끼지',
      '다섯',
      '나이',
      '상대방은',
      '연상이지만',
      '못해요',
      '차이를',
      '살',
      '거의',
      '연하라서',
    ],
    answer: '상대방은 다섯 살 연상이지만 나이 차이를 거의 느끼지 못해요',
    answerTranslation: L(
      '상대방은 다섯 살 연상이지만 나이 차이를 거의 느끼지 못해요.',
      'Sherigim mendan besh yosh katta, lekin yosh farqini deyarli sezmayman.',
      'My partner is five years older, but I hardly feel the age difference.',
      'Мой партнёр на пять лет старше, но я почти не ощущаю разницы в возрасте.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['older-partner', 'age-gap', 'translate-builder'],
  },

  s6u1_226_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '잘',
      '중요해요',
      '나이보다',
      '통하는',
      '저는',
      '말이',
      '게',
      '외모가',
    ],
    answer: '저는 나이보다 말이 잘 통하는 게 중요해요',
    audioText: '저는 나이보다 말이 잘 통하는 게 중요해요.',
    answerTranslation: L(
      '저는 나이보다 말이 잘 통하는 게 중요해요.',
      'Men uchun yoshdan ko‘ra yaxshi muloqot muhimroq.',
      'Good communication matters more to me than age.',
      'Для меня хорошее взаимопонимание важнее возраста.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['age', 'communication', 'word-arrange'],
  },

  s6u1_227_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '두 사람의 나이가 서로 얼마나 다른지를 나타내는 표현은 ___예요.',
    blankAnswers: ['나이 차이'],
    answerTranslation: L(
      '두 사람의 나이가 다른 정도를 나이 차이라고 해요.',
      'Ikki inson yoshi o‘rtasidagi farq 나이 차이 deyiladi.',
      'The difference between two people’s ages is called 나이 차이.',
      'Разница в возрасте двух людей называется 나이 차이.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target expression is 나이 차이.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 나이 차이.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['age-gap', 'type-answer'],
  },

  s6u1_228_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글쓴이의 나이 차이에 대한 생각을 고르세요.',
      'Muallifning yosh farqi haqidagi fikrini tanlang.',
      'Choose the writer’s opinion about age differences.',
      'Выберите мнение автора о разнице в возрасте.',
    ),
    passage:
      '제 여자 친구는 저보다 여섯 살 연상입니다. 처음 만났을 때는 저도 나이 차이가 조금 부담스러웠습니다. 하지만 함께 지낼수록 취미와 생각이 비슷하고 대화도 잘 통해서 이제는 나이가 별로 중요하지 않다고 생각합니다.',
    options: [
      '서로 잘 맞는다면 나이 차이는 크게 중요하지 않다',
      '연상과는 절대로 사귀면 안 된다',
      '나이가 같은 사람만 결혼할 수 있다',
      '여섯 살 차이는 너무 커서 헤어져야 한다',
    ],
    answer: '서로 잘 맞는다면 나이 차이는 크게 중요하지 않다',
    answerTranslation: L(
      '글쓴이는 서로 잘 맞으면 나이 차이가 크게 중요하지 않다고 생각해요.',
      'Muallif bir-biriga mos bo‘lsa, yosh farqi katta ahamiyatga ega emas deb o‘ylaydi.',
      'The writer thinks age difference is not very important if the couple is compatible.',
      'Автор считает, что разница в возрасте не так важна, если люди подходят друг другу.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['age-gap', 'reading'],
  },

  s6u1_229_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText: '저보다 세 살 어린 사람을 연상이라고 해요.',
    wrongWord: '연상이라고',
    options: ['연하라고', '연상이라고', '배우자라고', '천생연분이라고'],
    answer: '연하라고',
    answerTranslation: L(
      '저보다 세 살 어린 사람을 연하라고 해요.',
      'Mendan uch yosh kichik inson 연하 deyiladi.',
      'Someone three years younger than me is 연하.',
      'Человека на три года младше меня называют 연하.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['younger-partner', 'error-hunt'],
  },

  s6u1_230_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '부모님은 나이 차이가 너무 큰 결혼을 걱정하신다는 문장을 만드세요.',
      'Ota-onangiz yosh farqi juda katta bo‘lgan nikohdan xavotir olishini bildiradigan gap tuzing.',
      'Build a sentence meaning: “My parents worry about marriages with a very large age gap.”',
      'Составьте предложение: «Мои родители беспокоятся о браке с большой разницей в возрасте».',
    ),
    options: [
      '걱정하세요',
      '부모님은',
      '너무',
      '결혼을',
      '큰',
      '나이',
      '차이가',
      '좋아하세요',
      '같은',
    ],
    answer: '부모님은 나이 차이가 너무 큰 결혼을 걱정하세요',
    answerTranslation: L(
      '부모님은 나이 차이가 너무 큰 결혼을 걱정하세요.',
      'Ota-onam yosh farqi juda katta bo‘lgan nikohdan xavotir oladi.',
      'My parents worry about marriages with a very large age difference.',
      'Мои родители беспокоятся о браке с очень большой разницей в возрасте.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['age-gap', 'parents', 'translate-builder'],
  },

  s6u1_231_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 단어를 입력하세요.',
      'Eshitgan gapingizdagi tushib qolgan so‘zni yozing.',
      'Type the missing word.',
      'Введите пропущенное слово.',
    ),
    audioText: '제 여자 친구는 저보다 두 살 연상이에요.',
    sentenceTemplate: '제 여자 친구는 저보다 두 살 ___이에요.',
    blankAnswers: ['연상'],
    answerTranslation: L(
      '제 여자 친구는 저보다 두 살 연상이에요.',
      'Qiz do‘stim mendan ikki yosh katta.',
      'My girlfriend is two years older than me.',
      'Моя девушка на два года старше меня.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated missing word is 연상.',
      acceptedAnswers: [],
      notes: ['Require 연상.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 4,
    tags: ['older-partner', 'listen-fill'],
  },

  s6u1_232_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '자기보다 나이가 많은 상대는 ___, 어린 상대는 ___라고 합니다. 어떤 사람은 배우자를 선택할 때 이런 ___를 중요하게 생각하기도 합니다.',
    blankAnswers: ['연상', '연하', '나이 차이'],
    options: ['연상', '연하', '나이 차이', '학력', '청혼'],
    answer: '연상|연하|나이 차이',
    answerTranslation: L(
      '나이가 많은 상대는 연상, 어린 상대는 연하이고 두 사람의 나이 차이를 생각하기도 해요.',
      'Yoshi katta sherik 연상, kichigi 연하, ularning yoshi o‘rtasidagi farq esa 나이 차이.',
      'An older partner is 연상, a younger partner is 연하, and their difference in age is 나이 차이.',
      'Старший партнёр — 연상, младший — 연하, а разница между ними — 나이 차이.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['older-partner', 'younger-partner', 'age-gap', 'cloze'],
  },

  s6u1_233_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '자기보다 나이가 어린 남자 친구나 여자 친구를 ___라고 표현할 수 있어요.',
    blankAnswers: ['연하'],
    answerTranslation: L(
      '자기보다 나이가 어린 상대는 연하예요.',
      'O‘zidan yoshi kichik sherik 연하 deyiladi.',
      'A partner younger than oneself is 연하.',
      'Партнёр младше вас — 연하.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target Korean word is 연하.',
      acceptedAnswers: [],
      notes: ['Require 연하.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['younger-partner', 'type-answer'],
  },

  s6u1_234_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '저는 나이 차이보다 서로의 생각과 성격이 잘 맞는 것이 더 중요하다고 생각해요.',
    audioText:
      '저는 나이 차이보다 서로의 생각과 성격이 잘 맞는 것이 더 중요하다고 생각해요.',
    answerTranslation: L(
      '저는 나이 차이보다 서로의 생각과 성격이 잘 맞는 것이 더 중요하다고 생각해요.',
      'Men yosh farqidan ko‘ra fikr va xarakter mosligini muhimroq deb bilaman.',
      'I think compatible thoughts and personalities matter more than age difference.',
      'Я считаю совпадение взглядов и характеров важнее разницы в возрасте.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['age-gap', 'compatibility', 'speaking'],
  },

  s6u1_235_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '나이가 많거나 적은 것보다 서로 이해하는 것이 중요하다는 문장을 만드세요.',
      'Yoshning katta yoki kichikligidan ko‘ra bir-birini tushunish muhimligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Understanding each other matters more than whether one person is older or younger.”',
      'Составьте предложение: «Взаимопонимание важнее того, кто старше или младше».',
    ),
    options: [
      '것보다',
      '이해하는',
      '많거나',
      '중요해요',
      '서로',
      '것이',
      '적은',
      '나이가',
      '외모가',
      '조건이',
    ],
    answer: '나이가 많거나 적은 것보다 서로 이해하는 것이 중요해요',
    answerTranslation: L(
      '나이가 많거나 적은 것보다 서로 이해하는 것이 중요해요.',
      'Kimning yoshi katta yoki kichikligidan ko‘ra bir-birini tushunish muhimroq.',
      'Understanding each other is more important than who is older or younger.',
      'Взаимопонимание важнее того, кто старше или младше.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['age', 'understanding', 'translate-builder'],
  },

  s6u1_236_listening: {
    type: 'listening',
    instruction: L(
      '두 사람이 나이 차이 때문에 걱정했던 이유를 고르세요.',
      'Ikki kishi yosh farqidan nega xavotirlanganini tanlang.',
      'Choose why the couple was worried about their age difference.',
      'Выберите, почему пара переживала из-за разницы в возрасте.',
    ),
    audioText:
      '우리는 일곱 살 차이가 나요. 저는 괜찮았지만 처음에는 양가 부모님이 나이 차이가 너무 크다고 걱정하셨어요. 그래도 오래 만나면서 서로 잘 맞는 모습을 보여 드렸어요.',
    options: [
      '부모님이 나이 차이가 너무 크다고 생각해서',
      '두 사람이 서로를 싫어해서',
      '직업이 서로 달라서',
      '같은 나이라서',
    ],
    answer: '부모님이 나이 차이가 너무 크다고 생각해서',
    answerTranslation: L(
      '부모님이 일곱 살 차이를 크게 생각했기 때문이에요.',
      'Ota-onalar yetti yosh farqini juda katta deb o‘ylagani uchun.',
      'Because the parents thought the seven-year difference was too large.',
      'Потому что родители считали разницу в семь лет слишком большой.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['age-gap', 'parents', 'listening'],
  },

  s6u1_237_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '제 남자 친구는 저보다 나이가 많으니까 저에게는 ___이에요.',
    blankAnswers: ['연상'],
    options: ['연상', '연하', '동갑', '중매', '배우자 조건'],
    answer: '연상',
    answerTranslation: L(
      '저보다 나이가 많으므로 연상이에요.',
      'Mendan yoshi katta bo‘lgani uchun 연상.',
      'He is older than me, so he is 연상.',
      'Он старше меня, поэтому он 연상.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['older-partner'],
  },

  s6u1_238_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '잘',
      '차이가',
      '괜찮다고',
      '서로',
      '맞으면',
      '생각해요',
      '나이가',
      '커도',
      '헤어져야',
    ],
    answer: '나이 차이가 커도 서로 잘 맞으면 괜찮다고 생각해요',
    audioText: '나이 차이가 커도 서로 잘 맞으면 괜찮다고 생각해요.',
    answerTranslation: L(
      '나이 차이가 커도 서로 잘 맞으면 괜찮다고 생각해요.',
      'Yosh farqi katta bo‘lsa ham, bir-biriga mos bo‘lsa yaxshi deb o‘ylayman.',
      'I think a large age difference is fine if the couple is compatible.',
      'Я считаю большую разницу в возрасте нормальной, если люди подходят друг другу.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['age-gap', 'compatibility', 'word-arrange'],
  },

  s6u1_239_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`두 사람은 여덟 살 차이가 난다`에서 두 사람의 나이가 다른 정도는 ___예요.',
    blankAnswers: ['나이 차이'],
    answerTranslation: L(
      '두 사람의 나이가 다른 정도는 나이 차이예요.',
      'Ikki inson yoshining farqi 나이 차이 deyiladi.',
      'The difference between their ages is 나이 차이.',
      'Разница между их возрастами — 나이 차이.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The required expression is 나이 차이.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 나이 차이.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['age-gap', 'type-answer'],
  },

  s6u1_240_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람이 결혼을 계속 생각하게 된 이유를 고르세요.',
      'Ularning baribir nikoh haqida o‘ylashiga sababni tanlang.',
      'Choose why the couple continued considering marriage.',
      'Выберите, почему пара продолжила думать о браке.',
    ),
    passage:
      '정우는 여자 친구보다 여덟 살 연하입니다. 처음에는 두 사람 모두 나이 차이가 너무 큰 것이 아닐까 걱정했습니다. 하지만 3년 동안 만나면서 중요한 생각이 비슷하고 성격도 잘 맞는다는 것을 알았습니다. 그래서 지금은 나이보다 서로 얼마나 잘 이해하는지가 더 중요하다고 생각합니다.',
    options: [
      '오래 만나며 서로 잘 맞고 이해한다는 것을 알았기 때문에',
      '나이 차이가 없어졌기 때문에',
      '부모님이 처음부터 결혼을 강요했기 때문에',
      '두 사람이 같은 나이가 되었기 때문에',
    ],
    answer: '오래 만나며 서로 잘 맞고 이해한다는 것을 알았기 때문에',
    answerTranslation: L(
      '오랫동안 만나면서 서로 잘 맞고 이해한다는 것을 알았기 때문이에요.',
      'Uzoq uchrashib, bir-biriga mos va bir-birini tushunishini bilishgani uchun.',
      'Because over time they learned that they were compatible and understood each other well.',
      'Потому что со временем они поняли, что хорошо подходят и понимают друг друга.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['age-gap', 'compatibility', 'reading'],
  },

  // ────────────────────────────────────────────────────────────
  // Lesson 3 · 부모의 반대와 결혼 문제
  // q241 ~ q260
  // ────────────────────────────────────────────────────────────

  s6u1_241_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '부모님이 결혼을 반대하시지만 두 사람이 함께 설득해 보겠다는 문장을 만드세요.',
      'Ota-onalar nikohga qarshi bo‘lsa ham, ikkovingiz birga ularni ko‘ndirishga harakat qilishingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “Our parents oppose the marriage, but we will try to persuade them together.”',
      'Составьте предложение: «Родители против брака, но мы вместе постараемся их убедить».',
    ),
    options: [
      '설득해',
      '부모님이',
      '두',
      '결혼을',
      '사람이',
      '보려고',
      '함께',
      '반대하시지만',
      '해요',
      '포기하려고',
    ],
    answer: '부모님이 결혼을 반대하시지만 두 사람이 함께 설득해 보려고 해요',
    answerTranslation: L(
      '부모님이 결혼을 반대하시지만 두 사람이 함께 설득해 보려고 해요.',
      'Ota-onalar nikohga qarshi, lekin ikkovimiz birga ularni ko‘ndirishga harakat qilamiz.',
      'Our parents oppose the marriage, but we plan to try to persuade them together.',
      'Родители против брака, но мы собираемся вместе постараться убедить их.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['parental-opposition', 'persuade', 'translate-builder'],
  },

  s6u1_242_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '부모님이 자녀의 결혼에 동의하지 않는 상황을 ___라고 표현할 수 있어요.',
    blankAnswers: ['부모의 반대'],
    answerTranslation: L(
      '부모님이 결혼에 동의하지 않는 것은 부모의 반대예요.',
      'Ota-onaning nikohga rozi bo‘lmasligi 부모의 반대 deyiladi.',
      'Parents not agreeing to the marriage can be described as 부모의 반대.',
      'Несогласие родителей с браком можно назвать 부모의 반대.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target expression is 부모의 반대.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 부모의 반대.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['parental-opposition', 'type-answer'],
  },

  s6u1_243_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '부모님은 두 사람의 나이 차이가 너무 크다는 이유로 결혼을 ___하셨어요.',
    blankAnswers: ['반대'],
    options: ['반대', '청혼', '준비', '연애', '축하'],
    answer: '반대',
    answerTranslation: L(
      '부모님은 나이 차이 때문에 결혼에 반대하셨어요.',
      'Ota-onalar yosh farqi sabab nikohga qarshi bo‘lishdi.',
      'The parents opposed the marriage because of the age difference.',
      'Родители были против брака из-за разницы в возрасте.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['parental-opposition'],
  },

  s6u1_244_listening: {
    type: 'listening',
    instruction: L(
      '부모님이 결혼을 반대한 이유를 고르세요.',
      'Ota-onalar nikohga nega qarshi bo‘lganini tanlang.',
      'Choose why the parents opposed the marriage.',
      'Выберите причину, по которой родители были против брака.',
    ),
    audioText:
      '처음에는 부모님이 결혼을 반대하셨어요. 두 사람이 믿는 종교가 다르면 결혼 후에 갈등이 생길 수 있다고 걱정하셨거든요.',
    options: [
      '두 사람의 종교가 달라서',
      '두 사람의 나이가 같아서',
      '두 사람의 직업이 같아서',
      '신혼집이 너무 넓어서',
    ],
    answer: '두 사람의 종교가 달라서',
    answerTranslation: L(
      '부모님은 두 사람의 종교 차이를 걱정했어요.',
      'Ota-onalar ularning dinlari turlicha ekanidan xavotir olishdi.',
      'The parents were worried about the difference in religion.',
      'Родителей беспокоила разница в религии.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['religion-difference', 'parental-opposition', 'listening'],
  },

  s6u1_245_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '부모님의 반대 이유를 이해한 뒤 차분히 이야기해 보기로 했다는 문장을 만드세요.',
      'Ota-onaning qarshilik sababini tushungach, xotirjam gaplashishga qaror qilganingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “After understanding why our parents opposed it, we decided to talk calmly.”',
      'Составьте предложение: «Поняв причину возражений родителей, мы решили спокойно поговорить».',
    ),
    options: [
      '이유를',
      '보기로',
      '부모님의',
      '이해한',
      '이야기해',
      '반대',
      '차분히',
      '뒤',
      '했어요',
      '무시한',
    ],
    answer: '부모님의 반대 이유를 이해한 뒤 차분히 이야기해 보기로 했어요',
    answerTranslation: L(
      '부모님이 반대하는 이유를 이해한 뒤 차분히 이야기하기로 했어요.',
      'Ota-onaning qarshi bo‘lish sababini tushunib, xotirjam gaplashishga qaror qildik.',
      'After understanding why our parents objected, we decided to discuss it calmly.',
      'Поняв причину возражений родителей, мы решили спокойно поговорить.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['parental-opposition', 'understanding', 'translate-builder'],
  },

  s6u1_246_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '설득하려고',
      '여러',
      '부모님을',
      '번',
      '했어요',
      '대화했어요',
      '포기하려고',
      '결혼을',
    ],
    answer: '부모님을 설득하려고 여러 번 대화했어요',
    audioText: '부모님을 설득하려고 여러 번 대화했어요.',
    answerTranslation: L(
      '부모님을 설득하려고 여러 번 대화했어요.',
      'Ota-onamni ko‘ndirish uchun bir necha marta gaplashdim.',
      'I talked with my parents several times to persuade them.',
      'Я несколько раз разговаривал с родителями, чтобы убедить их.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['persuade', 'parents', 'word-arrange'],
  },

  s6u1_247_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '다른 사람이 자신의 의견을 받아들이도록 이유를 설명하는 행동을 ___라고 해요.',
    blankAnswers: ['설득하다'],
    answerTranslation: L(
      '상대방이 생각을 바꾸도록 설명하는 것을 설득하다라고 해요.',
      'Boshqa odamni fikrga ko‘ndirish 설득하다 deyiladi.',
      'Explaining reasons so another person accepts your view is 설득하다.',
      'Убеждать другого принять вашу точку зрения — 설득하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target dictionary-form verb is 설득하다.',
      acceptedAnswers: [],
      notes: ['Require 설득하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['persuade', 'type-answer'],
  },

  s6u1_248_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '부모님의 생각이 바뀐 가장 큰 이유를 고르세요.',
      'Ota-onaning fikri o‘zgargan asosiy sababni tanlang.',
      'Choose the main reason the parents changed their minds.',
      'Выберите главную причину, по которой родители изменили мнение.',
    ),
    passage:
      '처음에 지수의 부모님은 남자 친구의 직업이 안정적이지 않다는 이유로 결혼을 반대했습니다. 지수와 남자 친구는 바로 화를 내지 않고 앞으로의 직업 계획과 생활 계획을 여러 번 설명했습니다. 두 사람이 오랫동안 진지하게 준비해 왔다는 것을 알게 된 부모님은 결국 결혼에 동의했습니다.',
    options: [
      '두 사람이 미래 계획을 진지하게 설명했기 때문에',
      '남자 친구가 바로 직장을 그만두었기 때문에',
      '지수가 부모님과 연락을 끊었기 때문에',
      '두 사람이 결혼 계획을 숨겼기 때문에',
    ],
    answer: '두 사람이 미래 계획을 진지하게 설명했기 때문에',
    answerTranslation: L(
      '두 사람이 미래를 진지하게 준비하고 있다는 것을 설명했기 때문이에요.',
      'Ular kelajakni jiddiy rejalashtirayotganini tushuntirgani uchun.',
      'Because the couple explained that they had seriously planned their future.',
      'Потому что пара объяснила, что серьёзно планирует своё будущее.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['parental-opposition', 'persuade', 'reading'],
  },

  s6u1_249_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText: '부모님이 결혼을 반대하셔서 대화를 통해 포기했어요.',
    wrongWord: '포기했어요.',
    options: ['설득했어요.', '포기했어요.', '헤어졌어요.', '무시했어요.'],
    answer: '설득했어요.',
    answerTranslation: L(
      '부모님이 결혼을 반대하셔서 대화를 통해 설득했어요.',
      'Ota-onam nikohga qarshi bo‘lgani uchun suhbat orqali ularni ko‘ndirdim.',
      'My parents opposed the marriage, so I persuaded them through conversation.',
      'Родители были против брака, поэтому я убедил их с помощью разговора.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['persuade', 'error-hunt'],
  },

  s6u1_250_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '결혼에는 사랑뿐 아니라 경제적인 문제도 현실적으로 생각해야 한다는 문장을 만드세요.',
      'Nikohda nafaqat sevgi, balki moliyaviy masalalarni ham real hisobga olish kerakligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Marriage requires realistically considering financial issues as well as love.”',
      'Составьте предложение: «В браке нужно реалистично учитывать не только любовь, но и финансовые вопросы».',
    ),
    options: [
      '경제적인',
      '현실적으로',
      '사랑뿐',
      '생각해야',
      '결혼에는',
      '문제도',
      '해요',
      '아니라',
      '무시해야',
    ],
    answer: '결혼에는 사랑뿐 아니라 경제적인 문제도 현실적으로 생각해야 해요',
    answerTranslation: L(
      '결혼에는 사랑뿐 아니라 경제적인 문제도 현실적으로 생각해야 해요.',
      'Nikohda sevgidan tashqari moliyaviy masalalarni ham real o‘ylash kerak.',
      'Marriage requires realistically considering financial issues as well as love.',
      'В браке нужно реалистично учитывать не только любовь, но и финансовые вопросы.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['financial-problem', 'marriage', 'translate-builder'],
  },

  s6u1_251_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 단어를 입력하세요.',
      'Eshitgan gapingizdagi tushib qolgan so‘zni yozing.',
      'Type the missing word.',
      'Введите пропущенное слово.',
    ),
    audioText: '부모님은 처음에는 우리 결혼을 반대하셨어요.',
    sentenceTemplate: '부모님은 처음에는 우리 결혼을 ___.',
    blankAnswers: ['반대하셨어요'],
    answerTranslation: L(
      '부모님은 처음에는 우리 결혼을 반대하셨어요.',
      'Ota-onam avvaliga bizning nikohimizga qarshi bo‘lishdi.',
      'At first, our parents opposed our marriage.',
      'Сначала родители были против нашего брака.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated missing form is 반대하셨어요.',
      acceptedAnswers: [],
      notes: ['Require 반대하셨어요.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 4,
    tags: ['parental-opposition', 'listen-fill'],
  },

  s6u1_252_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '처음에는 ___이 심했습니다. 두 사람은 부모님에게 자신들의 생각을 계속 ___했고, 결국 가족의 동의를 받아 ___을 준비하게 되었습니다.',
    blankAnswers: ['부모의 반대', '설득', '결혼'],
    options: ['부모의 반대', '설득', '결혼', '소개팅', '이별'],
    answer: '부모의 반대|설득|결혼',
    answerTranslation: L(
      '부모의 반대를 설득으로 해결하고 결국 결혼을 준비하게 되었어요.',
      'Ota-onaning qarshiligini ko‘ndirish orqali hal qilib, oxiri nikohga tayyorlana boshlashdi.',
      'They dealt with parental opposition through persuasion and eventually prepared for marriage.',
      'Они преодолели возражения родителей убеждением и в итоге начали готовиться к браку.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['parental-opposition', 'persuade', 'cloze'],
  },

  s6u1_253_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '결혼 후 생활비, 집, 수입처럼 돈과 관련해서 생길 수 있는 어려움을 ___라고 할 수 있어요.',
    blankAnswers: ['경제적인 문제'],
    answerTranslation: L(
      '돈과 생활비 때문에 생기는 어려움을 경제적인 문제라고 할 수 있어요.',
      'Pul va turmush xarajatlariga oid qiyinchiliklar 경제적인 문제 deyiladi.',
      'Difficulties involving money and living expenses can be called 경제적인 문제.',
      'Трудности, связанные с деньгами и расходами, можно назвать 경제적인 문제.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target expression is 경제적인 문제.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 경제적인 문제.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['financial-problem', 'type-answer'],
  },

  s6u1_254_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '부모님이 반대하셔도 이유를 듣고 충분히 대화하면서 설득해 보고 싶어요.',
    audioText:
      '부모님이 반대하셔도 이유를 듣고 충분히 대화하면서 설득해 보고 싶어요.',
    answerTranslation: L(
      '부모님이 반대하셔도 이유를 듣고 충분히 대화하면서 설득해 보고 싶어요.',
      'Ota-onam qarshi bo‘lsa ham, sababini tinglab, yetarlicha gaplashib ko‘ndirishga harakat qilmoqchiman.',
      'Even if my parents object, I want to hear their reasons and try to persuade them through discussion.',
      'Даже если родители будут против, я хочу выслушать причины и попытаться убедить их разговором.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['parental-opposition', 'persuade', 'speaking'],
  },

  s6u1_255_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '부모님과 생각이 달라도 감정적으로 싸우고 싶지는 않다는 문장을 만드세요.',
      'Ota-onangiz bilan fikr turlicha bo‘lsa ham, hissiyotga berilib janjallashishni istamasligingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “Even if my parents and I disagree, I do not want to fight emotionally.”',
      'Составьте предложение: «Даже если мы с родителями не согласны, я не хочу эмоционально ссориться».',
    ),
    options: [
      '생각이',
      '싶지는',
      '감정적으로',
      '부모님과',
      '않아요',
      '싸우고',
      '달라도',
      '같아서',
      '무조건',
    ],
    answer: '부모님과 생각이 달라도 감정적으로 싸우고 싶지는 않아요',
    answerTranslation: L(
      '부모님과 생각이 달라도 감정적으로 싸우고 싶지는 않아요.',
      'Ota-onam bilan fikrimiz turlicha bo‘lsa ham, hissiyot bilan janjallashishni istamayman.',
      'Even if I disagree with my parents, I do not want to fight emotionally.',
      'Даже если наши с родителями мнения различаются, я не хочу эмоционально ссориться.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['parents', 'conflict', 'translate-builder'],
  },

  s6u1_256_listening: {
    type: 'listening',
    instruction: L(
      '두 사람이 결혼 전에 해결하려는 문제를 고르세요.',
      'Ikki kishi nikohdan oldin hal qilmoqchi bo‘lgan muammoni tanlang.',
      'Choose the issue the couple wants to resolve before marriage.',
      'Выберите проблему, которую пара хочет решить до брака.',
    ),
    audioText:
      '우리는 서로 믿는 종교가 달라요. 지금까지 연애할 때는 큰 문제가 없었지만 결혼하면 명절이나 가족 행사에서 생각이 달라질 수 있어서 미리 이야기하려고 해요.',
    options: ['종교 차이', '나이 차이', '외모 차이', '근무 시간'],
    answer: '종교 차이',
    answerTranslation: L(
      '두 사람은 종교 차이를 미리 이야기하려고 해요.',
      'Ular dinlaridagi farqni oldindan muhokama qilmoqchi.',
      'They want to discuss their religious differences beforehand.',
      'Они хотят заранее обсудить различия в религии.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['religion-difference', 'listening'],
  },

  s6u1_257_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '서로 믿는 종교가 달라서 생기는 갈등은 ___ 때문에 생길 수 있어요.',
    blankAnswers: ['종교 차이'],
    options: ['종교 차이', '나이 차이', '학력', '외모', '신혼여행'],
    answer: '종교 차이',
    answerTranslation: L(
      '믿는 종교가 서로 다른 것은 종교 차이예요.',
      'Dinlarning turlicha bo‘lishi 종교 차이 deyiladi.',
      'Having different religions is 종교 차이.',
      'Различие религий — 종교 차이.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['religion-difference'],
  },

  s6u1_258_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '해결해야',
      '결혼하기',
      '문제를',
      '전에',
      '함께',
      '현실적인',
      '해요',
      '피해야',
    ],
    answer: '결혼하기 전에 현실적인 문제를 함께 해결해야 해요',
    audioText: '결혼하기 전에 현실적인 문제를 함께 해결해야 해요.',
    answerTranslation: L(
      '결혼하기 전에 현실적인 문제를 함께 해결해야 해요.',
      'Nikohdan oldin real hayotdagi muammolarni birga hal qilish kerak.',
      'Practical problems should be resolved together before marriage.',
      'До брака нужно вместе решить практические проблемы.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['marriage-problem', 'word-arrange'],
  },

  s6u1_259_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '두 사람의 성격이 서로 달라서 생기는 문제를 ___라고 표현할 수 있어요.',
    blankAnswers: ['성격 차이'],
    answerTranslation: L(
      '두 사람의 다른 성격에서 생기는 차이를 성격 차이라고 해요.',
      'Ikki inson xarakteridagi farq 성격 차이 deyiladi.',
      'A difference in personality is 성격 차이.',
      'Различие характеров называется 성격 차이.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target expression is 성격 차이.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 성격 차이.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['personality-difference', 'type-answer'],
  },

  s6u1_260_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글에서 결혼 전에 이야기해야 한다고 말하는 문제를 모두 포함한 것을 고르세요.',
      'Matnda nikohdan oldin muhokama qilish kerak deb aytilgan muammolarning barchasini o‘z ichiga olgan javobni tanlang.',
      'Choose the option containing all issues the passage says should be discussed before marriage.',
      'Выберите вариант, содержащий все вопросы, которые, согласно тексту, стоит обсудить до брака.',
    ),
    passage:
      '결혼을 생각한다면 좋아하는 마음만 확인해서는 부족합니다. 서로 성격이 많이 다른지, 종교가 다른 경우 어떻게 할지, 돈을 관리하는 방식은 어떤지 등을 미리 이야기할 필요가 있습니다. 부모님의 반대가 있다면 그 이유도 들어 보고 충분히 대화하는 것이 좋습니다.',
    options: [
      '성격 차이, 종교 차이, 경제적인 문제, 부모의 반대',
      '외모, 키, 첫인상만',
      '신혼여행 장소와 청첩장만',
      '소개팅 장소와 첫 데이트만',
    ],
    answer: '성격 차이, 종교 차이, 경제적인 문제, 부모의 반대',
    answerTranslation: L(
      '성격, 종교, 경제 문제와 부모의 반대를 모두 이야기해야 해요.',
      'Xarakter, din, moliyaviy masalalar va ota-onaning qarshiligi haqida gaplashish kerak.',
      'The passage mentions personality, religion, financial issues, and parental opposition.',
      'В тексте упоминаются характер, религия, финансовые вопросы и возражения родителей.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['marriage-problem', 'review', 'reading'],
  },

  // ────────────────────────────────────────────────────────────
  // Lesson 4 · 차이를 이해하는 관계
  // q261 ~ q280
  // ────────────────────────────────────────────────────────────

  s6u1_261_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '성격이 달라도 서로 이해하려고 노력하면 잘 지낼 수 있다는 문장을 만드세요.',
      'Xarakterlar turlicha bo‘lsa ham, bir-birini tushunishga harakat qilsa yaxshi yashash mumkinligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Even with different personalities, a couple can get along if they try to understand each other.”',
      'Составьте предложение: «Даже при разных характерах можно хорошо жить, если стараться понимать друг друга».',
    ),
    options: [
      '잘',
      '노력하면',
      '이해하려고',
      '지낼',
      '달라도',
      '서로',
      '수 있어요',
      '성격이',
      '무시하면',
      '헤어져야',
    ],
    answer: '성격이 달라도 서로 이해하려고 노력하면 잘 지낼 수 있어요',
    answerTranslation: L(
      '성격이 달라도 서로 이해하려고 노력하면 잘 지낼 수 있어요.',
      'Xarakterlar turli bo‘lsa ham, bir-birini tushunishga harakat qilinsa yaxshi yashash mumkin.',
      'Even with different personalities, a couple can get along if they try to understand each other.',
      'Даже при разных характерах можно хорошо ладить, если стараться понимать друг друга.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['personality-difference', 'understanding', 'translate-builder'],
  },

  s6u1_262_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '두 사람이 상대방의 생각과 마음을 알아주려고 하는 것을 ___라고 표현할 수 있어요.',
    blankAnswers: ['서로 이해하다'],
    answerTranslation: L(
      '상대방의 생각과 마음을 알아주는 것은 서로 이해하다예요.',
      'Bir-birining fikr va hislarini tushunish 서로 이해하다 deyiladi.',
      'Understanding each other’s thoughts and feelings is 서로 이해하다.',
      'Понимать мысли и чувства друг друга — 서로 이해하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target expression is 서로 이해하다.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 서로 이해하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['understanding', 'type-answer'],
  },

  s6u1_263_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '상대방을 억지로 바꾸려고 하지 않고 ___ 받아들이는 것도 중요해요.',
    blankAnswers: ['있는 그대로'],
    options: ['있는 그대로', '조건만 보고', '무조건', '첫눈에', '따로따로'],
    answer: '있는 그대로',
    answerTranslation: L(
      '상대방을 지금 모습 그대로 받아들이는 것도 중요해요.',
      'Sherikni qanday bo‘lsa shunday qabul qilish ham muhim.',
      'It is also important to accept the other person as they are.',
      'Важно принимать другого человека таким, какой он есть.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['as-is', 'acceptance'],
  },

  s6u1_264_listening: {
    type: 'listening',
    instruction: L(
      '두 사람이 갈등을 해결하는 방법을 고르세요.',
      'Ikki kishining nizoni qanday hal qilishini tanlang.',
      'Choose how the couple resolves conflicts.',
      'Выберите, как пара решает конфликты.',
    ),
    audioText:
      '우리도 성격 차이 때문에 자주 의견이 달라요. 하지만 상대방이 왜 그렇게 생각하는지 먼저 듣고 제 생각도 차분하게 설명하려고 해요.',
    options: [
      '서로의 생각을 듣고 설명한다',
      '의견이 다르면 바로 헤어진다',
      '상대방의 말을 듣지 않는다',
      '한 사람이 항상 자신의 생각을 포기한다',
    ],
    answer: '서로의 생각을 듣고 설명한다',
    answerTranslation: L(
      '두 사람은 서로의 생각을 듣고 차분히 설명해요.',
      'Ular bir-birining fikrini tinglab, xotirjam tushuntiradi.',
      'They listen to each other and explain their views calmly.',
      'Они слушают друг друга и спокойно объясняют свою точку зрения.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['conflict', 'understanding', 'listening'],
  },

  s6u1_265_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '서로 다른 점을 없애려고 하기보다 이해하는 것이 더 중요하다는 문장을 만드세요.',
      'Farqlarni yo‘qotishga urinishdan ko‘ra ularni tushunish muhimroq ekanini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Understanding differences is more important than trying to eliminate them.”',
      'Составьте предложение: «Понимать различия важнее, чем пытаться их устранить».',
    ),
    options: [
      '이해하는',
      '없애려고',
      '서로',
      '것보다',
      '것이',
      '다른',
      '더',
      '중요해요',
      '점을',
      '무시하는',
    ],
    answer: '서로 다른 점을 없애려고 하는 것보다 이해하는 것이 더 중요해요',
    answerTranslation: L(
      '서로 다른 점을 없애려고 하는 것보다 이해하는 것이 더 중요해요.',
      'Farqlarni yo‘qotishga urinishdan ko‘ra ularni tushunish muhimroq.',
      'Understanding differences is more important than trying to remove them.',
      'Понимать различия важнее, чем пытаться их устранить.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['difference', 'understanding', 'translate-builder'],
  },

  s6u1_266_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '그대로',
      '싶어요',
      '상대방을',
      '받아들이고',
      '있는',
      '저는',
      '바꾸고',
      '억지로',
    ],
    answer: '저는 상대방을 있는 그대로 받아들이고 싶어요',
    audioText: '저는 상대방을 있는 그대로 받아들이고 싶어요.',
    answerTranslation: L(
      '저는 상대방을 있는 그대로 받아들이고 싶어요.',
      'Men sherigimni qanday bo‘lsa shunday qabul qilmoqchiman.',
      'I want to accept my partner as they are.',
      'Я хочу принимать своего партнёра таким, какой он есть.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['as-is', 'acceptance', 'word-arrange'],
  },

  s6u1_267_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '한 사람은 조용하고 다른 사람은 활동적인 것처럼 성격이 서로 다른 것을 ___라고 해요.',
    blankAnswers: ['성격 차이'],
    answerTranslation: L(
      '두 사람의 성격이 서로 다른 것을 성격 차이라고 해요.',
      'Ikki inson xarakterining turlicha bo‘lishi 성격 차이 deyiladi.',
      'Differences in personality are called 성격 차이.',
      'Различие характеров называется 성격 차이.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target expression is 성격 차이.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 성격 차이.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['personality-difference', 'type-answer'],
  },

  s6u1_268_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람이 관계를 잘 유지하는 이유를 고르세요.',
      'Ularning munosabatni yaxshi saqlab qolish sababini tanlang.',
      'Choose why the couple is able to maintain a good relationship.',
      'Выберите, почему паре удаётся сохранять хорошие отношения.',
    ),
    passage:
      '저는 계획을 미리 세우는 편이고 남편은 그때그때 결정하는 편입니다. 처음에는 이런 성격 차이 때문에 자주 다퉜습니다. 하지만 이제는 서로의 방식을 틀렸다고 생각하지 않습니다. 중요한 일은 미리 계획하고 작은 일은 남편 방식대로 자유롭게 결정하면서 서로 맞추고 있습니다.',
    options: [
      '서로의 다른 방식을 인정하고 조정하기 때문에',
      '남편이 자신의 성격을 완전히 바꿨기 때문에',
      '두 사람의 성격이 원래 완전히 같았기 때문에',
      '의견이 다르면 대화를 하지 않기 때문에',
    ],
    answer: '서로의 다른 방식을 인정하고 조정하기 때문에',
    answerTranslation: L(
      '두 사람은 서로 다른 방식을 인정하고 맞추고 있어요.',
      'Ular bir-birining turli usullarini qabul qilib, murosa qiladi.',
      'They accept their different approaches and adjust to each other.',
      'Они принимают разные подходы друг друга и находят компромисс.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['personality-difference', 'reading'],
  },

  s6u1_269_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText:
      '성격 차이가 있을 때는 상대방의 생각을 무시하는 것이 관계에 도움이 돼요.',
    wrongWord: '무시하는',
    options: ['이해하는', '무시하는', '숨기는', '거절하는'],
    answer: '이해하는',
    answerTranslation: L(
      '성격 차이가 있을 때는 상대방의 생각을 이해하는 것이 관계에 도움이 돼요.',
      'Xarakter farqi bo‘lsa, sherikning fikrini tushunish munosabatga yordam beradi.',
      'When personalities differ, understanding the other person’s thoughts helps the relationship.',
      'При различии характеров отношениям помогает понимание мыслей партнёра.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['understanding', 'error-hunt'],
  },

  s6u1_270_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '경제적인 생각이 달라도 충분히 대화하면 해결 방법을 찾을 수 있다는 문장을 만드세요.',
      'Pul haqidagi qarashlar turlicha bo‘lsa ham, yetarlicha gaplashilsa yechim topish mumkinligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Even with different financial views, a solution can be found through enough discussion.”',
      'Составьте предложение: «Даже при разных взглядах на деньги решение можно найти с помощью достаточного обсуждения».',
    ),
    options: [
      '해결',
      '충분히',
      '경제적인',
      '대화하면',
      '찾을',
      '생각이',
      '방법을',
      '달라도',
      '수 있어요',
      '포기해야',
    ],
    answer: '경제적인 생각이 달라도 충분히 대화하면 해결 방법을 찾을 수 있어요',
    answerTranslation: L(
      '경제적인 생각이 달라도 충분히 대화하면 해결 방법을 찾을 수 있어요.',
      'Moliyaviy fikrlar turlicha bo‘lsa ham, yetarlicha gaplashib yechim topish mumkin.',
      'Even with different financial views, enough discussion can lead to a solution.',
      'Даже при разных финансовых взглядах можно найти решение через обсуждение.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['financial-problem', 'communication', 'translate-builder'],
  },

  s6u1_271_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 표현을 입력하세요.',
      'Eshitgan gapingizdagi tushib qolgan ifodani yozing.',
      'Type the missing expression.',
      'Введите пропущенное выражение.',
    ),
    audioText: '상대방을 있는 그대로 이해하는 것이 중요해요.',
    sentenceTemplate: '상대방을 ___ 이해하는 것이 중요해요.',
    blankAnswers: ['있는 그대로'],
    answerTranslation: L(
      '상대방을 있는 그대로 이해하는 것이 중요해요.',
      'Sherikni qanday bo‘lsa shunday tushunish muhim.',
      'It is important to understand the other person as they are.',
      'Важно понимать другого человека таким, какой он есть.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated missing expression is 있는 그대로.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 있는 그대로.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['as-is', 'listen-fill'],
  },

  s6u1_272_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '두 사람이 오래 ___하려면 서로 다른 점을 인정해야 합니다. ___가 있어도 상대방의 입장을 ___하려는 노력이 필요합니다.',
    blankAnswers: ['함께', '성격 차이', '이해'],
    options: ['함께', '성격 차이', '이해', '반대', '청혼'],
    answer: '함께|성격 차이|이해',
    answerTranslation: L(
      '오래 함께하려면 성격 차이가 있어도 서로 이해하려고 해야 해요.',
      'Uzoq birga bo‘lish uchun xarakter farqi bo‘lsa ham bir-birini tushunishga harakat qilish kerak.',
      'To stay together for a long time, a couple must try to understand each other despite personality differences.',
      'Чтобы долго быть вместе, нужно стараться понимать друг друга несмотря на различия характеров.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['together', 'personality-difference', 'cloze'],
  },

  s6u1_273_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '두 사람이 믿는 종교가 서로 다른 상황을 ___라고 표현할 수 있어요.',
    blankAnswers: ['종교 차이'],
    answerTranslation: L(
      '두 사람이 믿는 종교가 다른 것을 종교 차이라고 해요.',
      'Ikki insonning dini turlicha bo‘lishi 종교 차이 deyiladi.',
      'A difference in religion is called 종교 차이.',
      'Различие в религии называется 종교 차이.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target expression is 종교 차이.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 종교 차이.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['religion-difference', 'type-answer'],
  },

  s6u1_274_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '성격이 달라도 서로를 있는 그대로 이해하고 받아들이는 것이 중요해요.',
    audioText:
      '성격이 달라도 서로를 있는 그대로 이해하고 받아들이는 것이 중요해요.',
    answerTranslation: L(
      '성격이 달라도 서로를 있는 그대로 이해하고 받아들이는 것이 중요해요.',
      'Xarakter turli bo‘lsa ham, bir-birini qanday bo‘lsa shunday tushunish va qabul qilish muhim.',
      'Even with different personalities, it is important to understand and accept each other as you are.',
      'Даже при разных характерах важно понимать и принимать друг друга такими, какие вы есть.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['acceptance', 'understanding', 'speaking'],
  },

  s6u1_275_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '결혼 후에도 각자의 생각과 생활 방식을 존중하면서 함께하고 싶다는 문장을 만드세요.',
      'Nikohdan keyin ham har birining fikri va turmush tarzini hurmat qilib birga bo‘lishni xohlashingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “Even after marriage, I want us to stay together while respecting each other’s views and lifestyles.”',
      'Составьте предложение: «Даже после брака я хочу быть вместе, уважая взгляды и образ жизни друг друга».',
    ),
    options: [
      '생각과',
      '함께하고',
      '각자의',
      '결혼',
      '존중하면서',
      '후에도',
      '싶어요',
      '생활 방식을',
      '무시하면서',
    ],
    answer: '결혼 후에도 각자의 생각과 생활 방식을 존중하면서 함께하고 싶어요',
    answerTranslation: L(
      '결혼 후에도 각자의 생각과 생활 방식을 존중하면서 함께하고 싶어요.',
      'Nikohdan keyin ham bir-birimizning fikr va turmush tarzimizni hurmat qilib birga bo‘lishni xohlayman.',
      'Even after marriage, I want us to remain together while respecting each other’s views and lifestyles.',
      'Даже после брака я хочу быть вместе, уважая взгляды и образ жизни друг друга.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['respect', 'together', 'translate-builder'],
  },

  s6u1_276_listening: {
    type: 'listening',
    instruction: L(
      '화자가 좋은 관계를 위해 필요하다고 생각하는 태도를 고르세요.',
      'So‘zlovchi yaxshi munosabat uchun kerak deb biladigan munosabatni tanlang.',
      'Choose the attitude the speaker thinks is necessary for a good relationship.',
      'Выберите отношение, которое говорящий считает необходимым для хороших отношений.',
    ),
    audioText:
      '처음에는 서로 다른 점이 많아서 걱정했어요. 그런데 모든 것을 똑같이 만들 필요는 없더라고요. 서로 다른 점을 인정하고 상대방을 있는 그대로 이해하는 게 더 중요했어요.',
    options: [
      '서로 다른 점을 인정하고 이해하기',
      '모든 생각을 완전히 똑같이 만들기',
      '차이가 있으면 바로 헤어지기',
      '상대방의 생각을 무시하기',
    ],
    answer: '서로 다른 점을 인정하고 이해하기',
    answerTranslation: L(
      '서로 다른 점을 인정하고 이해하는 것이 중요하다고 해요.',
      'Farqlarni qabul qilish va bir-birini tushunish muhim deb aytadi.',
      'The speaker says it is important to accept differences and understand each other.',
      'Говорящий считает важным принимать различия и понимать друг друга.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['difference', 'understanding', 'listening'],
  },

  s6u1_277_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '수입이나 생활비처럼 돈 때문에 생기는 어려움은 ___가 될 수 있어요.',
    blankAnswers: ['경제적인 문제'],
    options: ['경제적인 문제', '나이 차이', '첫인상', '연애결혼', '신혼여행'],
    answer: '경제적인 문제',
    answerTranslation: L(
      '돈과 관련된 어려움은 경제적인 문제가 될 수 있어요.',
      'Pul bilan bog‘liq qiyinchilik iqtisodiy muammo bo‘lishi mumkin.',
      'Money-related difficulties can become financial problems.',
      'Трудности, связанные с деньгами, могут стать финансовой проблемой.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['financial-problem'],
  },

  s6u1_278_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '해결하는',
      '함께',
      '문제를',
      '중요해요',
      '관계에서는',
      '것이',
      '좋은',
      '피하는',
    ],
    answer: '좋은 관계에서는 문제를 함께 해결하는 것이 중요해요',
    audioText: '좋은 관계에서는 문제를 함께 해결하는 것이 중요해요.',
    answerTranslation: L(
      '좋은 관계에서는 문제를 함께 해결하는 것이 중요해요.',
      'Yaxshi munosabatda muammolarni birga hal qilish muhim.',
      'In a good relationship, it is important to solve problems together.',
      'В хороших отношениях важно решать проблемы вместе.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['relationship', 'problem-solving', 'word-arrange'],
  },

  s6u1_279_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '두 사람이 같은 시간을 보내고 일을 같이 한다는 뜻의 기본 동사는 ___예요.',
    blankAnswers: ['함께하다'],
    answerTranslation: L(
      '같이 시간을 보내고 일을 같이 하는 것은 함께하다예요.',
      'Birga vaqt o‘tkazish va birga qilish 함께하다 deyiladi.',
      'The verb meaning to be or do something together is 함께하다.',
      'Глагол со значением «быть или делать вместе» — 함께하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target dictionary-form verb is 함께하다.',
      acceptedAnswers: [],
      notes: ['Require 함께하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['together', 'type-answer'],
  },

  s6u1_280_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글의 핵심 생각과 가장 가까운 것을 고르세요.',
      'Matnning asosiy fikriga eng yaqin javobni tanlang.',
      'Choose the statement closest to the main idea of the passage.',
      'Выберите утверждение, наиболее близкое к основной мысли текста.',
    ),
    passage:
      '연인이나 부부가 모든 면에서 똑같을 수는 없습니다. 성격, 종교, 돈을 쓰는 방식이 다를 수 있습니다. 중요한 것은 차이가 없는 것이 아니라 차이가 있을 때 서로 이야기하고 이해하려는 태도입니다. 상대방을 억지로 바꾸려고 하면 오히려 갈등이 더 커질 수 있습니다.',
    options: [
      '차이를 없애기보다 서로 이해하려는 태도가 중요하다',
      '좋은 부부는 모든 생각이 완전히 같아야 한다',
      '종교가 다르면 반드시 헤어져야 한다',
      '경제적인 문제는 대화할 필요가 없다',
    ],
    answer: '차이를 없애기보다 서로 이해하려는 태도가 중요하다',
    answerTranslation: L(
      '차이를 없애려고 하기보다 서로 이해하려는 태도가 중요하다는 내용이에요.',
      'Farqlarni yo‘qotishdan ko‘ra bir-birini tushunishga harakat qilish muhim.',
      'The passage says understanding differences matters more than trying to eliminate them.',
      'В тексте говорится, что важнее понимать различия, чем пытаться их устранить.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['understanding', 'difference', 'reading'],
  },

  // ────────────────────────────────────────────────────────────
  // Lesson 5 · 배우자와 결혼관 종합
  // q281 ~ q300
  // ────────────────────────────────────────────────────────────

  s6u1_281_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '좋은 배우자는 완벽한 사람이 아니라 서로 이해하며 함께할 수 있는 사람이라는 문장을 만드세요.',
      'Yaxshi turmush o‘rtog‘i mukammal inson emas, balki bir-birini tushunib birga bo‘la oladigan inson ekanini bildiradigan gap tuzing.',
      'Build a sentence meaning: “A good spouse is not a perfect person, but someone you can understand and share life with.”',
      'Составьте предложение: «Хороший супруг — не идеальный человек, а тот, с кем можно понимать друг друга и быть вместе».',
    ),
    options: [
      '좋은',
      '아니라',
      '함께할',
      '배우자는',
      '사람이',
      '완벽한',
      '수 있는',
      '서로',
      '사람이에요',
      '이해하며',
      '조건만',
    ],
    answer:
      '좋은 배우자는 완벽한 사람이 아니라 서로 이해하며 함께할 수 있는 사람이에요',
    answerTranslation: L(
      '좋은 배우자는 완벽한 사람이 아니라 서로 이해하며 함께할 수 있는 사람이에요.',
      'Yaxshi turmush o‘rtog‘i mukammal emas, balki bir-birini tushunib birga bo‘la oladigan inson.',
      'A good spouse is not a perfect person but someone you can understand and be together with.',
      'Хороший супруг — не идеальный человек, а тот, с кем можно понимать друг друга и быть вместе.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['spouse', 'understanding', 'translate-builder'],
  },

  s6u1_282_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '결혼한 남편이나 아내를 성별과 관계없이 공식적으로 부르는 말은 ___예요.',
    blankAnswers: ['배우자'],
    answerTranslation: L(
      '결혼한 상대를 배우자라고 해요.',
      'Turmush qurgan sherik 배우자 deyiladi.',
      'A husband or wife can formally be called 배우자.',
      'Супруга или супругу официально называют 배우자.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target Korean noun is 배우자.',
      acceptedAnswers: [],
      notes: ['Require 배우자.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['spouse', 'type-answer'],
  },

  s6u1_283_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '외모나 직업처럼 상대를 선택할 때 중요하게 보는 기준은 하나의 ___이 될 수 있어요.',
    blankAnswers: ['조건'],
    options: ['조건', '청혼', '신혼집', '연애', '고백'],
    answer: '조건',
    answerTranslation: L(
      '상대를 선택할 때 보는 기준은 조건이 될 수 있어요.',
      'Sherik tanlashdagi mezon 조건 bo‘lishi mumkin.',
      'A criterion for choosing a partner can be a 조건.',
      'Критерий выбора партнёра может быть условием — 조건.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['condition'],
  },

  s6u1_284_listening: {
    type: 'listening',
    instruction: L(
      '화자의 결혼관과 가장 가까운 것을 고르세요.',
      'So‘zlovchining nikoh haqidagi qarashiga eng yaqin javobni tanlang.',
      'Choose the statement closest to the speaker’s view of marriage.',
      'Выберите утверждение, наиболее близкое к взгляду говорящего на брак.',
    ),
    audioText:
      '저는 조건이 완벽한 사람을 찾는 것보다 서로 이해하고 문제를 함께 해결할 수 있는 사람을 만나는 게 더 중요하다고 생각해요.',
    options: [
      '완벽한 조건보다 이해와 협력이 중요하다',
      '외모가 좋은 사람이 가장 중요하다',
      '학력이 높으면 다른 것은 중요하지 않다',
      '결혼에는 대화가 필요하지 않다',
    ],
    answer: '완벽한 조건보다 이해와 협력이 중요하다',
    answerTranslation: L(
      '화자는 조건보다 서로 이해하고 함께 문제를 해결하는 것을 중요하게 생각해요.',
      'So‘zlovchi shartlardan ko‘ra tushunish va muammoni birga hal qilishni muhim deb biladi.',
      'The speaker values understanding and solving problems together more than perfect conditions.',
      'Говорящий ценит взаимопонимание и совместное решение проблем больше идеальных условий.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['marriage-view', 'listening'],
  },

  s6u1_285_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '두 사람이 모든 면에서 잘 어울려 천생연분처럼 보인다는 문장을 만드세요.',
      'Ikki kishi har jihatdan juda mos bo‘lib, bir-biri uchun yaratilgandek ko‘rinishini bildiradigan gap tuzing.',
      'Build a sentence meaning: “They fit each other so well in every way that they seem like a match made in heaven.”',
      'Составьте предложение: «Они так хорошо подходят друг другу во всём, что кажутся идеальной парой».',
    ),
    options: [
      '천생연분처럼',
      '두',
      '모든',
      '잘',
      '사람이',
      '면에서',
      '보여요',
      '어울려서',
      '반대해서',
      '헤어져서',
    ],
    answer: '두 사람이 모든 면에서 잘 어울려서 천생연분처럼 보여요',
    answerTranslation: L(
      '두 사람이 모든 면에서 잘 어울려서 천생연분처럼 보여요.',
      'Ular har jihatdan juda mos, xuddi bir-biri uchun yaratilgandek.',
      'They suit each other so well in every way that they seem like a perfect match.',
      'Они так хорошо подходят друг другу во всём, что кажутся идеальной парой.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['perfect-match', 'translate-builder'],
  },

  s6u1_286_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '서로',
      '싶어요',
      '평생',
      '이해하면서',
      '함께하고',
      '저는',
      '바꾸면서',
      '조건만',
    ],
    answer: '저는 서로 이해하면서 평생 함께하고 싶어요',
    audioText: '저는 서로 이해하면서 평생 함께하고 싶어요.',
    answerTranslation: L(
      '저는 서로 이해하면서 평생 함께하고 싶어요.',
      'Men bir-birimizni tushunib, umr bo‘yi birga bo‘lishni xohlayman.',
      'I want us to understand each other and stay together for life.',
      'Я хочу понимать друг друга и быть вместе всю жизнь.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lifetime', 'together', 'word-arrange'],
  },

  s6u1_287_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`한 사람의 살아 있는 전체 기간 동안`이라는 뜻으로 사용할 수 있는 말은 ___이에요.',
    blankAnswers: ['평생'],
    answerTranslation: L(
      '한 사람의 일생 전체를 평생이라고 해요.',
      'Insonning butun umri 평생 deyiladi.',
      'A person’s entire lifetime can be expressed as 평생.',
      'Всю жизнь человека можно выразить словом 평생.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target Korean word is 평생.',
      acceptedAnswers: [],
      notes: ['Require 평생.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['lifetime', 'type-answer'],
  },

  s6u1_288_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글쓴이가 좋은 배우자에게 가장 필요하다고 생각하는 것을 고르세요.',
      'Muallif yaxshi turmush o‘rtog‘ida eng zarur deb biladigan narsani tanlang.',
      'Choose what the writer considers most necessary in a good spouse.',
      'Выберите, что автор считает самым необходимым качеством хорошего супруга.',
    ),
    passage:
      '좋은 배우자에게 필요한 조건은 사람마다 다를 수 있습니다. 어떤 사람은 외모를, 어떤 사람은 직업이나 학력을 중요하게 생각합니다. 저는 그런 조건도 어느 정도 중요하지만, 오랫동안 함께 살 사람이라면 어려운 일이 생겼을 때 서로 이야기하고 이해할 수 있는지가 가장 중요하다고 생각합니다.',
    options: [
      '어려울 때 서로 이야기하고 이해할 수 있는 것',
      '항상 외모가 완벽한 것',
      '반드시 학력이 아주 높은 것',
      '무조건 같은 직업을 가진 것',
    ],
    answer: '어려울 때 서로 이야기하고 이해할 수 있는 것',
    answerTranslation: L(
      '글쓴이는 어려울 때 서로 대화하고 이해할 수 있는 관계를 가장 중요하게 생각해요.',
      'Muallif qiyin paytda gaplashib, bir-birini tushuna olishni eng muhim deb biladi.',
      'The writer values being able to communicate and understand each other during difficult times.',
      'Автор больше всего ценит возможность разговаривать и понимать друг друга в трудные моменты.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['spouse', 'marriage-view', 'reading'],
  },

  s6u1_289_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText:
      '서로를 잘 이해하고 평생 함께하고 싶은 두 사람을 원수지간이라고 할 수 있어요.',
    wrongWord: '원수지간이라고',
    options: ['천생연분이라고', '원수지간이라고', '연하라고', '중매결혼이라고'],
    answer: '천생연분이라고',
    answerTranslation: L(
      '서로를 잘 이해하고 평생 함께하고 싶은 두 사람을 천생연분이라고 할 수 있어요.',
      'Bir-birini yaxshi tushunib, umr bo‘yi birga bo‘lishni istaydigan juftlikni 천생연분 deyish mumkin.',
      'A couple who understands each other well and wants to stay together for life can be called a perfect match.',
      'Пару, которая хорошо понимает друг друга и хочет быть вместе всю жизнь, можно назвать идеальной.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['perfect-match', 'error-hunt'],
  },

  s6u1_290_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '상대방을 자신의 기준에 맞추려 하기보다 있는 그대로 사랑하고 싶다는 문장을 만드세요.',
      'Sherigingizni o‘z mezonlaringizga moslashtirishdan ko‘ra, qanday bo‘lsa shunday sevishni xohlashingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “Rather than trying to make my partner fit my standards, I want to love them as they are.”',
      'Составьте предложение: «Вместо того чтобы подгонять партнёра под свои стандарты, я хочу любить его таким, какой он есть».',
    ),
    options: [
      '사랑하고',
      '상대방을',
      '기준에',
      '있는',
      '맞추려',
      '자신의',
      '싶어요',
      '그대로',
      '하기보다',
      '바꾸고',
    ],
    answer:
      '상대방을 자신의 기준에 맞추려 하기보다 있는 그대로 사랑하고 싶어요',
    answerTranslation: L(
      '상대방을 자신의 기준에 맞추려 하기보다 있는 그대로 사랑하고 싶어요.',
      'Sherigimni o‘z mezonlarimga moslashtirish o‘rniga, uni qanday bo‘lsa shunday sevmoqchiman.',
      'Rather than trying to make my partner fit my standards, I want to love them as they are.',
      'Вместо того чтобы подгонять партнёра под свои стандарты, я хочу любить его таким, какой он есть.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['as-is', 'love', 'translate-builder'],
  },

  s6u1_291_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 단어를 입력하세요.',
      'Eshitgan gapingizdagi tushib qolgan so‘zni yozing.',
      'Type the missing word.',
      'Введите пропущенное слово.',
    ),
    audioText: '저는 사랑하는 사람과 평생 함께하고 싶어요.',
    sentenceTemplate: '저는 사랑하는 사람과 평생 ___ 싶어요.',
    blankAnswers: ['함께하고'],
    answerTranslation: L(
      '저는 사랑하는 사람과 평생 함께하고 싶어요.',
      'Men sevgan insonim bilan umr bo‘yi birga bo‘lishni xohlayman.',
      'I want to spend my whole life together with the person I love.',
      'Я хочу всю жизнь быть вместе с любимым человеком.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated missing form is 함께하고.',
      acceptedAnswers: [],
      notes: ['Require 함께하고.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 4,
    tags: ['together', 'lifetime', 'listen-fill'],
  },

  s6u1_292_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '좋은 ___를 만나는 것도 중요하지만 완벽한 조건만 찾을 필요는 없습니다. 서로를 ___하고 어려운 순간에도 ___ 함께할 수 있는 관계가 더 중요할 수 있습니다.',
    blankAnswers: ['배우자', '이해', '평생'],
    options: ['배우자', '이해', '평생', '청첩장', '소개팅'],
    answer: '배우자|이해|평생',
    answerTranslation: L(
      '좋은 배우자와 평생 함께하려면 서로 이해하는 것이 중요해요.',
      'Yaxshi turmush o‘rtog‘i bilan umr bo‘yi birga bo‘lish uchun bir-birini tushunish muhim.',
      'Mutual understanding is important for spending a lifetime with a good spouse.',
      'Для совместной жизни с хорошим супругом важно взаимопонимание.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['spouse', 'understanding', 'lifetime', 'cloze'],
  },

  s6u1_293_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '상대방을 억지로 바꾸지 않고 현재 모습 그대로 본다는 뜻의 표현은 ___예요.',
    blankAnswers: ['있는 그대로'],
    answerTranslation: L(
      '현재 모습 그대로 본다는 뜻은 있는 그대로예요.',
      'Insonni qanday bo‘lsa shunday ko‘rish 있는 그대로 deyiladi.',
      'The expression meaning “as someone is” is 있는 그대로.',
      'Выражение «таким, какой он есть» — 있는 그대로.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target expression is 있는 그대로.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 있는 그대로.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['as-is', 'type-answer'],
  },

  s6u1_294_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '좋은 배우자는 서로의 차이를 이해하고 힘든 순간에도 함께할 수 있는 사람이라고 생각해요.',
    audioText:
      '좋은 배우자는 서로의 차이를 이해하고 힘든 순간에도 함께할 수 있는 사람이라고 생각해요.',
    answerTranslation: L(
      '좋은 배우자는 서로의 차이를 이해하고 힘든 순간에도 함께할 수 있는 사람이라고 생각해요.',
      'Menimcha, yaxshi turmush o‘rtog‘i farqlarni tushunib, qiyin paytda ham birga bo‘la oladigan inson.',
      'I think a good spouse is someone who understands differences and stays with you during difficult times.',
      'Я считаю хорошим супругом человека, который понимает различия и остаётся рядом в трудные моменты.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['spouse', 'understanding', 'speaking'],
  },

  s6u1_295_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '조건이 모두 맞아도 서로 이해하지 못하면 행복하기 어렵다는 문장을 만드세요.',
      'Barcha shartlar mos bo‘lsa ham, bir-birini tushunmasa baxtli bo‘lish qiyinligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Even if every condition matches, it is difficult to be happy without mutual understanding.”',
      'Составьте предложение: «Даже если все условия совпадают, без взаимопонимания трудно быть счастливыми».',
    ),
    options: [
      '어려워요',
      '맞아도',
      '행복하기',
      '모두',
      '서로',
      '조건이',
      '못하면',
      '이해하지',
      '쉽고',
      '외모가',
    ],
    answer: '조건이 모두 맞아도 서로 이해하지 못하면 행복하기 어려워요',
    answerTranslation: L(
      '조건이 모두 맞아도 서로 이해하지 못하면 행복하기 어려워요.',
      'Barcha shartlar mos bo‘lsa ham, bir-birini tushunmasa baxtli bo‘lish qiyin.',
      'Even if all conditions match, it is difficult to be happy without mutual understanding.',
      'Даже если все условия совпадают, без взаимопонимания трудно быть счастливыми.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['condition', 'understanding', 'translate-builder'],
  },

  s6u1_296_listening: {
    type: 'listening',
    instruction: L(
      '두 사람이 천생연분처럼 보이는 이유를 고르세요.',
      'Ikki kishi nima uchun bir-biri uchun yaratilgandek ko‘rinishini tanlang.',
      'Choose why the couple seems like a perfect match.',
      'Выберите, почему пара кажется идеально подходящей друг другу.',
    ),
    audioText:
      '두 사람은 성격이 완전히 같은 건 아니에요. 하지만 서로 부족한 부분을 잘 이해해 주고 힘들 때 항상 옆에 있어 줘요. 그래서 주변 사람들이 천생연분이라고 해요.',
    options: [
      '서로 이해하고 어려울 때 함께하기 때문에',
      '성격이 모든 면에서 완전히 같기 때문에',
      '직업과 학력이 정확히 같기 때문에',
      '나이 차이가 전혀 없기 때문에',
    ],
    answer: '서로 이해하고 어려울 때 함께하기 때문에',
    answerTranslation: L(
      '서로를 이해하고 힘들 때 함께하기 때문에 천생연분처럼 보여요.',
      'Bir-birini tushunib, qiyin paytda birga bo‘lgani uchun ideal juftlikdek ko‘rinadi.',
      'They seem like a perfect match because they understand each other and stay together during difficult times.',
      'Они кажутся идеальной парой, потому что понимают друг друга и остаются рядом в трудные моменты.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['perfect-match', 'listening'],
  },

  s6u1_297_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '결혼할 사람의 학교 교육 수준을 중요하게 본다면 ___을 배우자 조건으로 보는 거예요.',
    blankAnswers: ['학력'],
    options: ['학력', '외모', '종교', '연하', '천생연분'],
    answer: '학력',
    answerTranslation: L(
      '학교 교육 수준은 학력이에요.',
      'Ta’lim darajasi 학력 deyiladi.',
      'Educational background is 학력.',
      'Уровень образования — 학력.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['education-background'],
  },

  s6u1_298_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '사람과',
      '평생',
      '사랑하는',
      '싶어요',
      '서로',
      '함께하고',
      '이해하면서',
      '반대하면서',
    ],
    answer: '사랑하는 사람과 서로 이해하면서 평생 함께하고 싶어요',
    audioText: '사랑하는 사람과 서로 이해하면서 평생 함께하고 싶어요.',
    answerTranslation: L(
      '사랑하는 사람과 서로 이해하면서 평생 함께하고 싶어요.',
      'Sevgan insonim bilan bir-birimizni tushunib umr bo‘yi birga bo‘lishni xohlayman.',
      'I want to understand the person I love and stay together for life.',
      'Я хочу понимать любимого человека и быть с ним всю жизнь.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love', 'lifetime', 'word-arrange'],
  },

  s6u1_299_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '결혼, 배우자, 가족에 대해 한 사람이 가지고 있는 전체적인 생각과 태도를 ___이라고 해요.',
    blankAnswers: ['결혼관'],
    answerTranslation: L(
      '결혼에 대한 생각과 태도를 결혼관이라고 해요.',
      'Nikoh haqidagi umumiy qarash va munosabat 결혼관 deyiladi.',
      'A person’s overall view and attitude toward marriage is 결혼관.',
      'Общий взгляд и отношение человека к браку называется 결혼관.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target Korean noun is 결혼관.',
      acceptedAnswers: [],
      notes: ['Require 결혼관.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['marriage-view', 'type-answer'],
  },

  s6u1_300_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글쓴이의 결혼관을 가장 잘 요약한 것을 고르세요.',
      'Muallifning nikoh haqidagi qarashini eng yaxshi umumlashtirgan javobni tanlang.',
      'Choose the statement that best summarizes the writer’s view of marriage.',
      'Выберите утверждение, которое лучше всего передаёт взгляд автора на брак.',
    ),
    passage:
      '예전에는 저도 배우자의 외모나 직업 같은 조건이 중요하다고 생각했습니다. 하지만 연애를 해 보면서 생각이 많이 바뀌었습니다. 아무리 조건이 좋아도 서로의 생각을 이해하지 못하면 관계를 오래 유지하기 어렵습니다. 나이 차이나 성격 차이가 있더라도 서로를 있는 그대로 받아들이고 문제가 생겼을 때 함께 해결하려는 사람이 좋은 배우자라고 생각합니다.',
    options: [
      '조건보다 이해와 함께 문제를 해결하려는 태도가 중요하다',
      '배우자는 외모와 직업이 가장 중요하다',
      '나이 차이가 있으면 결혼하면 안 된다',
      '좋은 부부는 성격 차이가 전혀 없어야 한다',
    ],
    answer: '조건보다 이해와 함께 문제를 해결하려는 태도가 중요하다',
    answerTranslation: L(
      '글쓴이는 외적인 조건보다 서로 이해하고 문제를 함께 해결하는 태도를 더 중요하게 생각해요.',
      'Muallif tashqi shartlardan ko‘ra bir-birini tushunish va muammoni birga hal qilishni muhimroq deb biladi.',
      'The writer values mutual understanding and solving problems together more than external conditions.',
      'Автор ценит взаимопонимание и совместное решение проблем выше внешних условий.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['section6', 'unit1', 'node3', 'marriage-view', 'review', 'reading'],
  },
};

const S6_UNIT1_NODE3_WORDS = [
  {
    code: 'marriage-spouse-conditions',
    korean: '배우자 조건',
    senseKey: 'criteria-for-spouse',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '결혼할 사람을 선택할 때 중요하게 생각하는 기준',
      'turmush o‘rtog‘ini tanlash mezonlari',
      'criteria for choosing a spouse',
      'критерии выбора супруга',
    ),
    examples: [
      {
        korean: '사람마다 중요하게 생각하는 배우자 조건이 달라요.',
        translations: L(
          '사람에 따라 결혼할 사람에게 원하는 조건이 달라요.',
          'Har kim uchun turmush o‘rtog‘ini tanlash mezonlari turlicha.',
          'The criteria people value in a spouse differ from person to person.',
          'Критерии выбора супруга у всех разные.',
        ),
      },
    ],
    pronunciation: {
      hangul: '배우자 조건',
      romanization: 'baeuja jogeon',
      ttsText: '배우자 조건',
    },
    media: {
      emoji: '💍',
      imageUrl: '',
      imageAlt: L(
        '배우자에게 원하는 조건 목록',
        'turmush o‘rtog‘i uchun mezonlar ro‘yxati',
        'a list of criteria for a spouse',
        'список критериев выбора супруга',
      ),
    },
    tags: ['marriage', 'spouse', 'condition'],
    difficulty: 5,
    usageNote: L(
      '외모, 성격, 학력, 직업, 종교, 나이 등을 배우자 조건으로 이야기할 수 있어요.',
      'Tashqi ko‘rinish, xarakter, ta’lim, kasb, din va yosh turmush o‘rtog‘i mezonlari bo‘lishi mumkin.',
      'Appearance, personality, education, occupation, religion, and age can all be discussed as spouse criteria.',
      'В качестве критериев супруга могут обсуждаться внешность, характер, образование, профессия, религия и возраст.',
    ),
    isCore: true,
  },

  {
    code: 'relationship-condition-match',
    korean: '조건이 맞다',
    senseKey: 'conditions-match',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '원하는 기준이나 상황이 서로 잘 맞다',
      'talab va shartlar bir-biriga mos kelmoq',
      'for conditions or criteria to match',
      'условия или критерии совпадают',
    ),
    examples: [
      {
        korean: '조건이 맞는 사람을 만나도 성격이 맞는지 더 알아봐야 해요.',
        translations: L(
          '원하는 조건에 맞는 사람이어도 성격까지 잘 맞는지는 알아봐야 해요.',
          'Shartlari mos odamni uchratsangiz ham, xarakter mosligini bilish kerak.',
          'Even if someone meets your criteria, you still need to see whether your personalities match.',
          'Даже если человек соответствует условиям, нужно понять, совпадают ли характеры.',
        ),
      },
    ],
    pronunciation: {
      hangul: '조건이 맞다',
      romanization: 'jogeoni matda',
      ttsText: '조건이 맞다',
    },
    media: {
      emoji: '✅',
      imageUrl: '',
      imageAlt: L(
        '조건이 서로 맞는 두 사람',
        'shartlari bir-biriga mos ikki inson',
        'two people whose conditions match',
        'двое людей с совпадающими условиями',
      ),
    },
    tags: ['relationship', 'condition', 'compatibility'],
    difficulty: 5,
    usageNote: L(
      '`조건이 좋다`는 조건 자체가 좋다는 뜻이고 `조건이 맞다`는 서로 원하는 기준이 맞는다는 뜻이에요.',
      '`조건이 좋다` shartning yaxshi ekanini, `조건이 맞다` esa talablarning mosligini bildiradi.',
      '조건이 좋다 means the conditions are good, while 조건이 맞다 means the criteria are compatible.',
      '조건이 좋다 означает хорошие условия, а 조건이 맞다 — совпадение критериев.',
    ),
    isCore: true,
  },

  {
    code: 'relationship-appearance',
    korean: '외모',
    senseKey: 'physical-appearance',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '얼굴, 키, 체형처럼 겉으로 보이는 사람의 모습',
      'insonning tashqi ko‘rinishi',
      'physical appearance',
      'внешность',
    ),
    examples: [
      {
        korean: '저는 배우자의 외모보다 성격을 더 중요하게 생각해요.',
        translations: L(
          '저는 겉모습보다 성격을 더 중요하게 생각해요.',
          'Men turmush o‘rtog‘ining tashqi ko‘rinishidan ko‘ra xarakterini muhimroq deb bilaman.',
          'I value a spouse’s personality more than physical appearance.',
          'Для меня характер супруга важнее внешности.',
        ),
      },
    ],
    pronunciation: {
      hangul: '외모',
      romanization: 'oemo',
      ttsText: '외모',
    },
    media: {
      emoji: '👤',
      imageUrl: '',
      imageAlt: L(
        '사람의 겉모습',
        'insonning tashqi qiyofasi',
        'a person’s outward appearance',
        'внешность человека',
      ),
    },
    tags: ['relationship', 'appearance', 'spouse-condition'],
    difficulty: 4,
    usageNote: L(
      '`외모가 좋다`, `외모를 보다`처럼 사용할 수 있어요.',
      '`외모가 좋다`, `외모를 보다` kabi ishlatiladi.',
      'Common expressions include 외모가 좋다 and 외모를 보다.',
      'Часто используется в выражениях 외모가 좋다 и 외모를 보다.',
    ),
    isCore: true,
  },

  {
    code: 'relationship-education-background',
    korean: '학력',
    senseKey: 'educational-background',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '학교 교육을 받은 정도나 마지막으로 마친 교육 단계',
      'ta’lim darajasi',
      'educational background',
      'уровень образования',
    ),
    examples: [
      {
        korean: '학력보다 실제 성격과 가치관이 더 중요하다고 생각해요.',
        translations: L(
          '학교 교육 수준보다 실제로 서로 잘 맞는지가 더 중요하다고 생각해요.',
          'Ta’lim darajasidan ko‘ra xarakter va qarashlar muhimroq deb o‘ylayman.',
          'I think personality and compatibility matter more than educational background.',
          'Я считаю характер и совместимость важнее уровня образования.',
        ),
      },
    ],
    pronunciation: {
      hangul: '학력',
      romanization: 'hangnyeok',
      ttsText: '학력',
    },
    media: {
      emoji: '🎓',
      imageUrl: '',
      imageAlt: L(
        '교육 수준을 나타내는 졸업모',
        'ta’lim darajasini bildiruvchi bitiruv qalpog‘i',
        'a graduation cap representing educational background',
        'академическая шапочка, обозначающая образование',
      ),
    },
    tags: ['marriage', 'education', 'spouse-condition'],
    difficulty: 5,
    usageNote: L(
      '공식 문서나 사람의 교육 배경을 이야기할 때 많이 사용해요.',
      'Rasmiy hujjat va insonning ta’lim tarixi haqida gapirganda ishlatiladi.',
      'It is commonly used when discussing formal education or educational background.',
      'Часто используется при обсуждении образования человека.',
    ),
    isCore: true,
  },

  {
    code: 'marriage-age-gap',
    korean: '나이 차이',
    senseKey: 'age-difference-between-partners',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '두 사람의 나이가 서로 다른 정도',
      'ikki inson o‘rtasidagi yosh farqi',
      'age difference; age gap',
      'разница в возрасте',
    ),
    examples: [
      {
        korean: '두 사람은 나이 차이가 많이 나지만 성격은 잘 맞아요.',
        translations: L(
          '두 사람의 나이는 많이 다르지만 성격은 잘 맞아요.',
          'Ularning yosh farqi katta, lekin xarakterlari mos.',
          'They have a large age gap, but their personalities match well.',
          'У них большая разница в возрасте, но характеры хорошо совпадают.',
        ),
      },
    ],
    pronunciation: {
      hangul: '나이 차이',
      romanization: 'nai chai',
      ttsText: '나이 차이',
    },
    media: {
      emoji: '🎂',
      imageUrl: '',
      imageAlt: L(
        '나이가 다른 두 사람',
        'yoshi turlicha ikki inson',
        'two people of different ages',
        'двое людей разного возраста',
      ),
    },
    tags: ['marriage', 'age', 'difference'],
    difficulty: 4,
    usageNote: L(
      '`나이 차이가 나다`, `나이 차이가 크다`처럼 사용해요.',
      '`나이 차이가 나다`, `나이 차이가 크다` kabi ishlatiladi.',
      'Common expressions include 나이 차이가 나다 and 나이 차이가 크다.',
      'Частые выражения: 나이 차이가 나다 и 나이 차이가 크다.',
    ),
    isCore: true,
  },

  {
    code: 'relationship-older-partner',
    korean: '연상',
    senseKey: 'partner-older-than-self',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '자기보다 나이가 많은 사람',
      'o‘zidan yoshi katta inson',
      'someone older than oneself',
      'человек старше себя',
    ),
    examples: [
      {
        korean: '제 여자 친구는 저보다 세 살 연상이에요.',
        translations: L(
          '제 여자 친구는 저보다 세 살 많아요.',
          'Qiz do‘stim mendan uch yosh katta.',
          'My girlfriend is three years older than me.',
          'Моя девушка на три года старше меня.',
        ),
      },
    ],
    pronunciation: {
      hangul: '연상',
      romanization: 'yeonsang',
      ttsText: '연상',
    },
    media: {
      emoji: '⬆️',
      imageUrl: '',
      imageAlt: L(
        '자기보다 나이가 많은 연인',
        'o‘zidan yoshi katta sherik',
        'a partner older than oneself',
        'партнёр старше себя',
      ),
    },
    tags: ['relationship', 'age', 'older-partner'],
    difficulty: 5,
    usageNote: L(
      '`연상의 남자`, `연상의 여자`, `세 살 연상`처럼 사용할 수 있어요.',
      '`연상의 남자`, `세 살 연상` kabi ishlatiladi.',
      'Common patterns include 연상의 남자 and 세 살 연상.',
      'Частые конструкции: 연상의 남자 и 세 살 연상.',
    ),
    isCore: true,
  },

  {
    code: 'relationship-younger-partner',
    korean: '연하',
    senseKey: 'partner-younger-than-self',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '자기보다 나이가 어린 사람',
      'o‘zidan yoshi kichik inson',
      'someone younger than oneself',
      'человек младше себя',
    ),
    examples: [
      {
        korean: '남편은 저보다 두 살 연하예요.',
        translations: L(
          '남편은 저보다 두 살 어려요.',
          'Erim mendan ikki yosh kichik.',
          'My husband is two years younger than me.',
          'Мой муж на два года младше меня.',
        ),
      },
    ],
    pronunciation: {
      hangul: '연하',
      romanization: 'yeonha',
      ttsText: '연하',
    },
    media: {
      emoji: '⬇️',
      imageUrl: '',
      imageAlt: L(
        '자기보다 나이가 어린 연인',
        'o‘zidan yoshi kichik sherik',
        'a partner younger than oneself',
        'партнёр младше себя',
      ),
    },
    tags: ['relationship', 'age', 'younger-partner'],
    difficulty: 5,
    usageNote: L(
      '`연하의 남자`, `두 살 연하`처럼 사용할 수 있어요.',
      '`연하의 남자`, `두 살 연하` kabi ishlatiladi.',
      'Common patterns include 연하의 남자 and 두 살 연하.',
      'Частые конструкции: 연하의 남자 и 두 살 연하.',
    ),
    isCore: true,
  },

  {
    code: 'marriage-parental-opposition',
    korean: '부모의 반대',
    senseKey: 'parental-opposition-to-marriage',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '부모가 자녀의 연애나 결혼에 동의하지 않는 것',
      'ota-onaning munosabat yoki nikohga qarshiligi',
      'parental opposition to a relationship or marriage',
      'возражение родителей против отношений или брака',
    ),
    examples: [
      {
        korean: '두 사람은 부모의 반대에도 결혼을 포기하지 않았어요.',
        translations: L(
          '부모님이 결혼에 반대했지만 두 사람은 포기하지 않았어요.',
          'Ota-onaning qarshiligiga qaramay, ular nikohdan voz kechmadi.',
          'The couple did not give up on marriage despite parental opposition.',
          'Пара не отказалась от брака несмотря на возражения родителей.',
        ),
      },
    ],
    pronunciation: {
      hangul: '부모의 반대',
      romanization: 'bumoui bandae',
      ttsText: '부모의 반대',
    },
    media: {
      emoji: '🙅',
      imageUrl: '',
      imageAlt: L(
        '결혼을 반대하는 부모',
        'nikohga qarshi ota-ona',
        'parents opposing a marriage',
        'родители, выступающие против брака',
      ),
    },
    tags: ['marriage', 'parents', 'opposition'],
    difficulty: 5,
    usageNote: L(
      '`부모의 반대가 있다`, `부모의 반대를 받다`처럼 사용해요.',
      '`부모의 반대가 있다`, `부모의 반대를 받다` kabi ishlatiladi.',
      'Common expressions include 부모의 반대가 있다 and 부모의 반대를 받다.',
      'Частые выражения: 부모의 반대가 있다 и 부모의 반대를 받다.',
    ),
    isCore: true,
  },

  {
    code: 'marriage-oppose',
    korean: '결혼을 반대하다',
    senseKey: 'oppose-a-marriage',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '어떤 사람들의 결혼에 동의하지 않다',
      'nikohga qarshi bo‘lmoq',
      'to oppose a marriage',
      'быть против брака',
    ),
    examples: [
      {
        korean: '부모님은 처음에는 두 사람의 결혼을 반대하셨어요.',
        translations: L(
          '부모님은 처음에는 두 사람이 결혼하는 것에 동의하지 않으셨어요.',
          'Ota-onalar avvaliga ularning nikohiga qarshi bo‘lishdi.',
          'At first, the parents opposed their marriage.',
          'Сначала родители были против их брака.',
        ),
      },
    ],
    pronunciation: {
      hangul: '결혼을 반대하다',
      romanization: 'gyeolhoneul bandaehada',
      ttsText: '결혼을 반대하다',
    },
    media: {
      emoji: '🚫💍',
      imageUrl: '',
      imageAlt: L(
        '결혼에 반대하는 모습',
        'nikohga qarshilik',
        'opposition to marriage',
        'возражение против брака',
      ),
    },
    tags: ['marriage', 'opposition', 'family'],
    difficulty: 5,
    usageNote: L(
      '`N을/를 반대하다` 형태로 어떤 계획이나 행동에 동의하지 않을 때 써요.',
      '`N을/를 반대하다` biror reja yoki harakatga qarshi chiqishda ishlatiladi.',
      'Use N을/를 반대하다 when opposing a plan or action.',
      'Конструкция N을/를 반대하다 используется для выражения несогласия с планом или действием.',
    ),
    isCore: true,
  },

  {
    code: 'marriage-personality-difference',
    korean: '성격 차이',
    senseKey: 'personality-difference-between-partners',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '두 사람의 성격이나 행동 방식이 서로 다른 것',
      'ikki inson xarakteridagi farq',
      'personality differences',
      'различие характеров',
    ),
    examples: [
      {
        korean: '성격 차이가 있어도 대화를 많이 하면 서로 이해할 수 있어요.',
        translations: L(
          '성격이 달라도 대화를 통해 서로 이해할 수 있어요.',
          'Xarakter farqi bo‘lsa ham, suhbat orqali bir-birini tushunish mumkin.',
          'Even with personality differences, communication can help people understand each other.',
          'Даже при различиях характеров общение помогает понимать друг друга.',
        ),
      },
    ],
    pronunciation: {
      hangul: '성격 차이',
      romanization: 'seonggyeok chai',
      ttsText: '성격 차이',
    },
    media: {
      emoji: '🧩',
      imageUrl: '',
      imageAlt: L(
        '성격이 다른 두 사람',
        'xarakteri turli ikki inson',
        'two people with different personalities',
        'двое людей с разными характерами',
      ),
    },
    tags: ['marriage', 'personality', 'difference'],
    difficulty: 5,
    usageNote: L(
      '`성격 차이가 크다`, `성격 차이로 다투다`처럼 사용할 수 있어요.',
      '`성격 차이가 크다`, `성격 차이로 다투다` kabi ishlatiladi.',
      'Common expressions include 성격 차이가 크다 and 성격 차이로 다투다.',
      'Частые выражения: 성격 차이가 크다 и 성격 차이로 다투다.',
    ),
    isCore: true,
  },

  {
    code: 'marriage-religion-difference',
    korean: '종교 차이',
    senseKey: 'religious-difference-between-partners',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '두 사람이 믿는 종교나 신앙이 서로 다른 것',
      'ikki inson dini yoki e’tiqodidagi farq',
      'religious differences',
      'различие в религии',
    ),
    examples: [
      {
        korean: '종교 차이가 있다면 결혼 전에 충분히 이야기하는 게 좋아요.',
        translations: L(
          '서로 믿는 종교가 다르면 결혼 전에 이야기하는 것이 좋아요.',
          'Dinlar turlicha bo‘lsa, nikohdan oldin bu haqda gaplashgan yaxshi.',
          'If there are religious differences, it is good to discuss them before marriage.',
          'Если религии различаются, лучше обсудить это до брака.',
        ),
      },
    ],
    pronunciation: {
      hangul: '종교 차이',
      romanization: 'jonggyo chai',
      ttsText: '종교 차이',
    },
    media: {
      emoji: '🙏',
      imageUrl: '',
      imageAlt: L(
        '서로 다른 종교를 가진 두 사람',
        'turli dinga ega ikki inson',
        'two people with different religions',
        'двое людей разных религий',
      ),
    },
    tags: ['marriage', 'religion', 'difference'],
    difficulty: 5,
    usageNote: L(
      '가족 행사나 생활 방식과 연결해서 이야기할 때 사용할 수 있어요.',
      'Oilaviy tadbirlar va turmush tarzi bilan bog‘liq holatlarda ishlatiladi.',
      'It can be used when discussing family events and lifestyle differences.',
      'Употребляется при обсуждении семейных мероприятий и образа жизни.',
    ),
    isCore: true,
  },

  {
    code: 'marriage-financial-problem',
    korean: '경제적인 문제',
    senseKey: 'financial-problem-in-marriage',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '돈, 수입, 생활비 등 경제와 관련된 어려움',
      'pul, daromad va xarajatlarga oid muammo',
      'financial problem',
      'финансовая проблема',
    ),
    examples: [
      {
        korean: '결혼 전에 경제적인 문제에 대해서도 솔직하게 이야기했어요.',
        translations: L(
          '결혼 전에 돈과 생활비 문제에 대해서도 솔직히 이야기했어요.',
          'Nikohdan oldin pul va xarajatlar haqida ham ochiq gaplashdik.',
          'Before marriage, we also discussed financial issues honestly.',
          'До брака мы также честно обсудили финансовые вопросы.',
        ),
      },
    ],
    pronunciation: {
      hangul: '경제적인 문제',
      romanization: 'gyeongjejeogin munje',
      ttsText: '경제적인 문제',
    },
    media: {
      emoji: '💰',
      imageUrl: '',
      imageAlt: L(
        '생활비를 함께 계산하는 부부',
        'xarajatlarni hisoblayotgan juftlik',
        'a couple discussing expenses',
        'пара, обсуждающая расходы',
      ),
    },
    tags: ['marriage', 'money', 'problem'],
    difficulty: 5,
    usageNote: L(
      '결혼이나 가족생활에서 수입, 지출, 집, 생활비 문제를 포함할 수 있어요.',
      'Nikoh va oilada daromad, xarajat, uy va yashash xarajatlarini o‘z ichiga olishi mumkin.',
      'In marriage, it can include income, expenses, housing, and living costs.',
      'В браке может включать доходы, расходы, жильё и стоимость жизни.',
    ),
    isCore: true,
  },

  {
    code: 'relationship-persuade',
    korean: '설득하다',
    senseKey: 'persuade-person',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '이유를 설명해서 상대방이 자신의 생각을 받아들이도록 하다',
      'sabablarni tushuntirib boshqa odamni ko‘ndirmoq',
      'to persuade',
      'убеждать',
    ),
    examples: [
      {
        korean: '두 사람은 부모님을 설득하기 위해 여러 번 이야기했어요.',
        translations: L(
          '두 사람은 부모님이 결혼에 동의하도록 여러 번 설명했어요.',
          'Ular ota-onani ko‘ndirish uchun bir necha marta gaplashishdi.',
          'The couple talked several times to persuade their parents.',
          'Пара несколько раз разговаривала, чтобы убедить родителей.',
        ),
      },
    ],
    pronunciation: {
      hangul: '설득하다',
      romanization: 'seoldeukhada',
      ttsText: '설득하다',
    },
    media: {
      emoji: '🗣️',
      imageUrl: '',
      imageAlt: L(
        '상대방을 설득하며 이야기하는 사람',
        'boshqa odamni ko‘ndirayotgan inson',
        'a person persuading someone',
        'человек, убеждающий другого',
      ),
    },
    tags: ['relationship', 'communication', 'persuade'],
    difficulty: 5,
    usageNote: L(
      '`부모님을 설득하다`, `상대방을 설득하다`처럼 사용해요.',
      '`부모님을 설득하다`, `상대방을 설득하다` kabi ishlatiladi.',
      'Common expressions include 부모님을 설득하다 and 상대방을 설득하다.',
      'Частые выражения: 부모님을 설득하다 и 상대방을 설득하다.',
    ),
    isCore: true,
  },

  {
    code: 'relationship-understand-each-other',
    korean: '서로 이해하다',
    senseKey: 'mutually-understand',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '두 사람이 서로의 생각과 감정을 알아주다',
      'bir-birining fikr va hislarini tushunmoq',
      'to understand each other',
      'понимать друг друга',
    ),
    examples: [
      {
        korean: '오래 함께하려면 서로 이해하려는 노력이 필요해요.',
        translations: L(
          '오래 함께 지내려면 서로의 생각을 이해하려고 노력해야 해요.',
          'Uzoq birga bo‘lish uchun bir-birini tushunishga harakat qilish kerak.',
          'To stay together for a long time, people need to make an effort to understand each other.',
          'Чтобы долго быть вместе, нужно стараться понимать друг друга.',
        ),
      },
    ],
    pronunciation: {
      hangul: '서로 이해하다',
      romanization: 'seoro ihaehada',
      ttsText: '서로 이해하다',
    },
    media: {
      emoji: '🤝',
      imageUrl: '',
      imageAlt: L(
        '서로 이야기하며 이해하는 두 사람',
        'bir-birini tushunayotgan ikki inson',
        'two people understanding each other',
        'двое людей, понимающих друг друга',
      ),
    },
    tags: ['relationship', 'understanding', 'communication'],
    difficulty: 5,
    usageNote: L(
      '`서로`는 두 사람 모두가 상대방에게 같은 행동을 한다는 뜻을 나타내요.',
      '`서로` ikki tomon ham bir-biriga nisbatan bir xil harakat qilishini bildiradi.',
      '서로 indicates a mutual action between two sides.',
      '서로 указывает на взаимное действие двух сторон.',
    ),
    isCore: true,
  },

  {
    code: 'relationship-as-is',
    korean: '있는 그대로',
    senseKey: 'as-someone-is',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '억지로 바꾸거나 꾸미지 않은 현재 모습 그대로',
      'qanday bo‘lsa, shundayligicha',
      'as it is; as someone is',
      'таким, какой есть',
    ),
    examples: [
      {
        korean: '사랑하는 사람을 있는 그대로 받아들이는 것도 중요해요.',
        translations: L(
          '사랑하는 사람을 억지로 바꾸지 않고 그대로 받아들이는 것이 중요해요.',
          'Sevgan insonni qanday bo‘lsa shunday qabul qilish muhim.',
          'It is important to accept the person you love as they are.',
          'Важно принимать любимого человека таким, какой он есть.',
        ),
      },
    ],
    pronunciation: {
      hangul: '있는 그대로',
      romanization: 'inneun geudaero',
      ttsText: '있는 그대로',
    },
    media: {
      emoji: '🫶',
      imageUrl: '',
      imageAlt: L(
        '상대방을 그대로 받아들이는 모습',
        'insonni qanday bo‘lsa shunday qabul qilish',
        'accepting someone as they are',
        'принятие человека таким, какой он есть',
      ),
    },
    tags: ['relationship', 'acceptance', 'love'],
    difficulty: 5,
    usageNote: L(
      '`있는 그대로 받아들이다`, `있는 그대로 사랑하다`처럼 자주 사용해요.',
      '`있는 그대로 받아들이다`, `있는 그대로 사랑하다` kabi ishlatiladi.',
      'Common expressions include 있는 그대로 받아들이다 and 있는 그대로 사랑하다.',
      'Частые выражения: 있는 그대로 받아들이다 и 있는 그대로 사랑하다.',
    ),
    isCore: true,
  },

  {
    code: 'relationship-lifetime',
    korean: '평생',
    senseKey: 'entire-lifetime',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '한 사람이 살아 있는 전체 기간 동안',
      'butun umr davomida',
      'for one’s whole life; lifetime',
      'всю жизнь',
    ),
    examples: [
      {
        korean: '사랑하는 사람과 평생 함께하고 싶어요.',
        translations: L(
          '사랑하는 사람과 죽을 때까지 오래 함께하고 싶어요.',
          'Sevgan insonim bilan umr bo‘yi birga bo‘lishni xohlayman.',
          'I want to be together with the person I love for my whole life.',
          'Я хочу всю жизнь быть вместе с любимым человеком.',
        ),
      },
    ],
    pronunciation: {
      hangul: '평생',
      romanization: 'pyeongsaeng',
      ttsText: '평생',
    },
    media: {
      emoji: '♾️',
      imageUrl: '',
      imageAlt: L(
        '오랫동안 함께하는 부부',
        'umr bo‘yi birga bo‘lgan juftlik',
        'a couple together for life',
        'пара, прожившая вместе всю жизнь',
      ),
    },
    tags: ['relationship', 'lifetime', 'marriage'],
    difficulty: 4,
    usageNote: L(
      '`평생 함께하다`, `평생 사랑하다`처럼 사용할 수 있어요.',
      '`평생 함께하다`, `평생 사랑하다` kabi ishlatiladi.',
      'Common expressions include 평생 함께하다 and 평생 사랑하다.',
      'Частые выражения: 평생 함께하다 и 평생 사랑하다.',
    ),
    isCore: true,
  },

  {
    code: 'relationship-together',
    korean: '함께하다',
    senseKey: 'spend-time-together',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '다른 사람과 같이 시간을 보내거나 어떤 일을 같이하다',
      'boshqa inson bilan birga bo‘lmoq yoki birga ish qilmoq',
      'to be together; to share something together',
      'быть вместе; делать что-либо вместе',
    ),
    examples: [
      {
        korean: '힘든 순간에도 서로 함께할 수 있는 사람이 좋아요.',
        translations: L(
          '어려운 때에도 같이 있어 줄 수 있는 사람이 좋아요.',
          'Qiyin paytda ham yonimda bo‘la oladigan inson menga yoqadi.',
          'I like someone who can stay with me even during difficult times.',
          'Мне нравится человек, который может быть рядом даже в трудные моменты.',
        ),
      },
    ],
    pronunciation: {
      hangul: '함께하다',
      romanization: 'hamkkehada',
      ttsText: '함께하다',
    },
    media: {
      emoji: '👫',
      imageUrl: '',
      imageAlt: L(
        '함께 걷는 두 사람',
        'birga ketayotgan ikki inson',
        'two people walking together',
        'двое людей, идущих вместе',
      ),
    },
    tags: ['relationship', 'together', 'support'],
    difficulty: 4,
    usageNote: L(
      '`평생 함께하다`, `기쁨과 슬픔을 함께하다`처럼 사용할 수 있어요.',
      '`평생 함께하다`, `기쁨과 슬픔을 함께하다` kabi ishlatiladi.',
      'Common expressions include 평생 함께하다 and 기쁨과 슬픔을 함께하다.',
      'Частые выражения: 평생 함께하다 и 기쁨과 슬픔을 함께하다.',
    ),
    isCore: true,
  },

  {
    code: 'marriage-view',
    korean: '결혼관',
    senseKey: 'view-of-marriage',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '결혼과 배우자, 가족생활에 대해 가지고 있는 생각과 태도',
      'nikoh va oilaviy hayot haqidagi qarash',
      'view of marriage',
      'взгляды на брак',
    ),
    examples: [
      {
        korean: '두 사람의 결혼관이 비슷하면 미래 계획을 세우기 쉬워요.',
        translations: L(
          '결혼에 대한 생각이 비슷하면 함께 미래를 계획하기 쉬워요.',
          'Nikoh haqidagi qarashlar o‘xshash bo‘lsa, kelajakni rejalash osonroq.',
          'Similar views on marriage can make it easier to plan a future together.',
          'Если взгляды на брак похожи, легче планировать совместное будущее.',
        ),
      },
    ],
    pronunciation: {
      hangul: '결혼관',
      romanization: 'gyeolhongwan',
      ttsText: '결혼관',
    },
    media: {
      emoji: '💭',
      imageUrl: '',
      imageAlt: L(
        '결혼에 대해 생각하는 사람',
        'nikoh haqida o‘ylayotgan inson',
        'a person thinking about marriage',
        'человек, размышляющий о браке',
      ),
    },
    tags: ['marriage', 'view', 'values'],
    difficulty: 5,
    usageNote: L(
      '`결혼관이 비슷하다`, `결혼관이 다르다`처럼 사용해요.',
      '`결혼관이 비슷하다`, `결혼관이 다르다` kabi ishlatiladi.',
      'Common expressions include 결혼관이 비슷하다 and 결혼관이 다르다.',
      'Частые выражения: 결혼관이 비슷하다 и 결혼관이 다르다.',
    ),
    isCore: true,
  },

  {
    code: 'relationship-love-not-change',
    korean: '사랑이 변하지 않다',
    senseKey: 'love-remain-unchanged',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '시간이 지나거나 어려움이 생겨도 사랑하는 마음이 그대로 유지되다',
      'vaqt yoki qiyinchilikka qaramay sevgi o‘zgarmasligi',
      'for love to remain unchanged',
      'любовь не меняется',
    ),
    examples: [
      {
        korean: '부모님의 반대에도 두 사람의 사랑은 변하지 않았어요.',
        translations: L(
          '부모님의 반대가 있었지만 두 사람은 계속 서로 사랑했어요.',
          'Ota-onaning qarshiligiga qaramay, ularning sevgisi o‘zgarmadi.',
          'Their love did not change despite their parents’ opposition.',
          'Несмотря на возражения родителей, их любовь не изменилась.',
        ),
      },
    ],
    pronunciation: {
      hangul: '사랑이 변하지 않다',
      romanization: 'sarangi byeonhaji anta',
      ttsText: '사랑이 변하지 않다',
    },
    media: {
      emoji: '❤️',
      imageUrl: '',
      imageAlt: L(
        '오랫동안 변하지 않는 사랑',
        'uzoq davom etadigan o‘zgarmas sevgi',
        'love that remains unchanged over time',
        'любовь, не меняющаяся со временем',
      ),
    },
    tags: ['love', 'relationship', 'commitment'],
    difficulty: 5,
    usageNote: L(
      '어려움이나 시간이 지나도 관계가 유지된다는 문맥에서 사용할 수 있어요.',
      'Qiyinchilik yoki vaqt o‘tsa ham munosabat saqlanishi haqida ishlatiladi.',
      'It can describe a relationship whose love remains despite time or difficulties.',
      'Используется, когда любовь сохраняется несмотря на время или трудности.',
    ),
    isCore: false,
  },
] satisfies readonly WordSeedEntry[];

const S6_UNIT1_NODE4_QUESTIONS = {
  // ────────────────────────────────────────────────────────────
  // Node 4 · 연애의 갈등과 화해
  // Lesson 1 · 상대방의 감정 이해하기
  // q301 ~ q320
  // ────────────────────────────────────────────────────────────

  s6u1_301_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '연인과 갈등이 생겨도 감정을 숨기지 않고 솔직하게 말하려고 한다는 문장을 만드세요.',
      'Sevgan insoningiz bilan kelishmovchilik bo‘lsa ham, hislaringizni yashirmay ochiq gapirishga harakat qilishingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “Even when conflict arises with my partner, I try to talk honestly instead of hiding my feelings.”',
      'Составьте предложение: «Даже когда возникает конфликт с партнёром, я стараюсь честно говорить о своих чувствах, а не скрывать их».',
    ),
    options: [
      '솔직하게',
      '생겨도',
      '애인과',
      '말하려고',
      '감정을',
      '않고',
      '갈등이',
      '숨기지',
      '해요',
      '무시하려고',
      '웃으려고',
    ],
    answer: '애인과 갈등이 생겨도 감정을 숨기지 않고 솔직하게 말하려고 해요',
    answerTranslation: L(
      '애인과 갈등이 생겨도 감정을 숨기지 않고 솔직하게 말하려고 해요.',
      'Sevgan insonim bilan kelishmovchilik bo‘lsa ham, hislarimni yashirmay ochiq gapirishga harakat qilaman.',
      'Even when conflict arises with my partner, I try to speak honestly instead of hiding my feelings.',
      'Даже когда возникает конфликт с партнёром, я стараюсь честно говорить о чувствах, а не скрывать их.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['relationship', 'emotion', 'translate-builder'],
  },

  s6u1_302_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '연애 관계에 있는 남자 친구나 여자 친구를 함께 가리키는 말은 ___이에요.',
    blankAnswers: ['애인'],
    answerTranslation: L(
      '연애하는 상대를 애인이라고 해요.',
      'Romantik munosabatdagi inson 애인 deyiladi.',
      'A romantic partner can be called 애인.',
      'Романтического партнёра можно назвать 애인.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target Korean noun is 애인.',
      acceptedAnswers: [],
      notes: ['Require 애인.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['lover', 'type-answer'],
  },

  s6u1_303_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '대화나 관계에서 나와 마주하고 있는 다른 사람을 ___이라고 할 수 있어요.',
    blankAnswers: ['상대방'],
    options: ['상대방', '배우자', '애인', '신혼부부', '중매인'],
    answer: '상대방',
    answerTranslation: L(
      '나와 관계하거나 대화하는 다른 사람은 상대방이에요.',
      'Siz bilan muloqot qilayotgan boshqa inson 상대방 deyiladi.',
      'The other person you are interacting with is 상대방.',
      'Другой участник общения или отношений — 상대방.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['other-person'],
  },

  s6u1_304_listening: {
    type: 'listening',
    instruction: L(
      '여자가 서운한 이유를 고르세요.',
      'Ayolning nega xafa bo‘lganini tanlang.',
      'Choose why the woman feels hurt.',
      'Выберите, почему женщина обиделась.',
    ),
    audioText:
      '요즘 남자 친구가 일이 바쁜 건 이해해요. 그런데 약속을 취소하면서 미안하다는 말도 하지 않아서 조금 서운했어요.',
    options: [
      '약속을 취소하고 미안하다는 말을 하지 않아서',
      '남자 친구가 새로운 직장을 구해서',
      '두 사람이 신혼여행을 취소해서',
      '남자 친구가 청혼해서',
    ],
    answer: '약속을 취소하고 미안하다는 말을 하지 않아서',
    answerTranslation: L(
      '약속을 취소하면서 미안하다는 말도 하지 않아서 서운했어요.',
      'U uchrashuvni bekor qilib, uzr ham so‘ramagani uchun xafa bo‘ldi.',
      'She felt hurt because he canceled the plan without even apologizing.',
      'Она обиделась, потому что он отменил встречу и даже не извинился.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['hurt-feeling', 'listening'],
  },

  s6u1_305_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '상대방의 말 때문에 서운했지만 바로 화를 내지는 않았다는 문장을 만드세요.',
      'Sherigingizning gapidan xafa bo‘lsangiz ham darhol jahlingizni chiqarmaganingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “I felt hurt by what the other person said, but I did not get angry immediately.”',
      'Составьте предложение: «Мне было обидно из-за слов партнёра, но я не стал сразу сердиться».',
    ),
    options: [
      '않았어요',
      '서운했지만',
      '화를',
      '상대방의',
      '내지',
      '말이',
      '바로',
      '기뻤지만',
      '청혼을',
    ],
    answer: '상대방의 말이 서운했지만 바로 화를 내지 않았어요',
    answerTranslation: L(
      '상대방의 말이 서운했지만 바로 화를 내지 않았어요.',
      'Sherigimning gapidan xafa bo‘ldim, lekin darhol jahlimni chiqarmadim.',
      'I felt hurt by the other person’s words, but I did not get angry immediately.',
      'Мне было обидно из-за слов другого человека, но я не стал сразу сердиться.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['hurt-feeling', 'emotion', 'translate-builder'],
  },

  s6u1_306_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '먼저',
      '말을',
      '들어',
      '상대방의',
      '보려고',
      '해요',
      '무시하려고',
      '조건을',
    ],
    answer: '먼저 상대방의 말을 들어 보려고 해요',
    audioText: '먼저 상대방의 말을 들어 보려고 해요.',
    answerTranslation: L(
      '먼저 상대방의 이야기를 들어 보려고 해요.',
      'Avval sherigimning gapini tinglashga harakat qilaman.',
      'I try to listen to the other person first.',
      'Я стараюсь сначала выслушать другого человека.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['other-person', 'listening-to-partner', 'word-arrange'],
  },

  s6u1_307_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '상대방의 말이나 행동 때문에 마음이 섭섭하고 속상한 상태를 ___라고 해요.',
    blankAnswers: ['서운하다'],
    answerTranslation: L(
      '마음이 섭섭하고 속상한 느낌을 서운하다고 해요.',
      'Ko‘ngil qolib, ranjigan holat 서운하다 bilan ifodalanadi.',
      'Feeling hurt or disappointed by someone can be described as 서운하다.',
      'Чувство обиды или разочарования можно выразить словом 서운하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target dictionary-form adjective is 서운하다.',
      acceptedAnswers: [],
      notes: ['Require 서운하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['hurt-feeling', 'type-answer'],
  },

  s6u1_308_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람이 갈등을 크게 만들지 않은 이유를 고르세요.',
      'Ularning kelishmovchilikni kattalashtirmagan sababini tanlang.',
      'Choose why the couple did not let the conflict become more serious.',
      'Выберите, почему пара не позволила конфликту стать серьёзнее.',
    ),
    passage:
      '지연은 남자 친구가 중요한 약속을 잊어서 많이 서운했습니다. 하지만 바로 화를 내기보다 자신이 왜 속상했는지 설명했습니다. 남자 친구도 지연의 말을 끝까지 듣고 미안하다고 했습니다.',
    options: [
      '서로의 감정을 말하고 상대방의 말을 들었기 때문에',
      '두 사람이 서로 연락하지 않았기 때문에',
      '지연이 아무 말도 하지 않았기 때문에',
      '남자 친구가 약속을 다시 잊었기 때문에',
    ],
    answer: '서로의 감정을 말하고 상대방의 말을 들었기 때문에',
    answerTranslation: L(
      '자신의 감정을 설명하고 서로의 말을 들어서 갈등이 더 커지지 않았어요.',
      'Ular hislarini tushuntirib, bir-birini tinglagani uchun kelishmovchilik kattalashmadi.',
      'The conflict did not grow because they explained their feelings and listened to each other.',
      'Конфликт не усилился, потому что они рассказали о своих чувствах и выслушали друг друга.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['emotion', 'communication', 'reading'],
  },

  s6u1_309_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText: '애인이 서운하다고 했는데 저는 그 말을 칭찬했어요.',
    wrongWord: '칭찬했어요.',
    options: ['들어줬어요.', '칭찬했어요.', '잊었어요.', '숨겼어요.'],
    answer: '들어줬어요.',
    answerTranslation: L(
      '애인이 서운하다고 했는데 저는 그 말을 들어줬어요.',
      'Sevgan insonim xafa bo‘lganini aytganda, uning gapini tingladim.',
      'When my partner said they felt hurt, I listened to them.',
      'Когда партнёр сказал, что ему обидно, я его выслушал.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['lover', 'emotion', 'error-hunt'],
  },

  s6u1_310_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '기분이 상했을 때는 왜 서운한지 차분하게 말하는 것이 좋다는 문장을 만드세요.',
      'Ko‘nglingiz og‘riganda nega xafa bo‘lganingizni xotirjam tushuntirish yaxshi ekanini bildiradigan gap tuzing.',
      'Build a sentence meaning: “When you feel hurt, it is better to calmly explain why you feel that way.”',
      'Составьте предложение: «Когда вам обидно, лучше спокойно объяснить причину».',
    ),
    options: [
      '좋아요',
      '서운한지',
      '기분이',
      '말하는',
      '왜',
      '상했을',
      '차분하게',
      '때는',
      '게',
      '숨기는',
    ],
    answer: '기분이 상했을 때는 왜 서운한지 차분하게 말하는 게 좋아요',
    answerTranslation: L(
      '속상할 때는 왜 서운한지 차분하게 설명하는 게 좋아요.',
      'Xafa bo‘lganda sababini xotirjam tushuntirish yaxshi.',
      'When you feel hurt, it is better to calmly explain why.',
      'Когда вам обидно, лучше спокойно объяснить причину.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['emotion', 'communication', 'translate-builder'],
  },

  s6u1_311_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 단어를 입력하세요.',
      'Eshitgan gapingizdagi tushib qolgan so‘zni yozing.',
      'Type the missing word.',
      'Введите пропущенное слово.',
    ),
    audioText: '상대방의 입장에서 생각해 보는 것이 중요해요.',
    sentenceTemplate: '___의 입장에서 생각해 보는 것이 중요해요.',
    blankAnswers: ['상대방'],
    answerTranslation: L(
      '상대방의 입장에서 생각해 보는 것이 중요해요.',
      'Boshqa insonning nuqtai nazaridan o‘ylash muhim.',
      'It is important to think from the other person’s point of view.',
      'Важно посмотреть на ситуацию с точки зрения другого человека.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated missing word is 상대방.',
      acceptedAnswers: [],
      notes: ['Require 상대방.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 4,
    tags: ['other-person', 'listen-fill'],
  },

  s6u1_312_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '___과 오래 좋은 관계를 유지하려면 자신의 ___만 말해서는 안 됩니다. ___의 마음도 이해하려고 해야 합니다.',
    blankAnswers: ['애인', '감정', '상대방'],
    options: ['애인', '감정', '상대방', '예식장', '청첩장'],
    answer: '애인|감정|상대방',
    answerTranslation: L(
      '애인과 좋은 관계를 유지하려면 자신의 감정뿐 아니라 상대방의 마음도 이해해야 해요.',
      'Sevgan inson bilan yaxshi munosabat uchun faqat o‘z hislaringizni emas, uning hislarini ham tushunish kerak.',
      'To maintain a good relationship, you need to understand your partner’s feelings as well as your own.',
      'Чтобы сохранять хорошие отношения, нужно понимать чувства партнёра, а не только свои.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lover', 'emotion', 'other-person', 'cloze'],
  },

  s6u1_313_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '기쁨, 슬픔, 화, 서운함처럼 마음에서 느끼는 상태를 ___이라고 해요.',
    blankAnswers: ['감정'],
    answerTranslation: L(
      '마음에서 느끼는 여러 상태를 감정이라고 해요.',
      'Inson ichida his qiladigan holatlar 감정 deyiladi.',
      'Feelings such as joy, sadness, or anger are called 감정.',
      'Радость, грусть, гнев и другие внутренние переживания называются 감정.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target Korean noun is 감정.',
      acceptedAnswers: [],
      notes: ['Require 감정.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['emotion', 'type-answer'],
  },

  s6u1_314_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '서운한 일이 있으면 감정을 숨기지 말고 상대방에게 솔직하게 말하는 게 좋아요.',
    audioText:
      '서운한 일이 있으면 감정을 숨기지 말고 상대방에게 솔직하게 말하는 게 좋아요.',
    answerTranslation: L(
      '서운한 일이 있으면 감정을 숨기지 말고 상대방에게 솔직하게 말하는 게 좋아요.',
      'Xafa bo‘lsangiz, hislaringizni yashirmay sherigingizga ochiq aytgan yaxshi.',
      'If something hurts your feelings, it is better to speak honestly to your partner instead of hiding it.',
      'Если вам обидно, лучше честно сказать партнёру о чувствах, а не скрывать их.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['emotion', 'speaking'],
  },

  s6u1_315_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '상대방의 마음을 알고 싶다면 먼저 자신의 감정을 솔직하게 표현해야 한다는 문장을 만드세요.',
      'Sherigingizning hislarini bilmoqchi bo‘lsangiz, avval o‘z hislaringizni ochiq ifodalash kerakligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “If you want to understand your partner’s feelings, you should first express your own honestly.”',
      'Составьте предложение: «Если хотите понять чувства партнёра, сначала нужно честно выразить свои».',
    ),
    options: [
      '솔직하게',
      '싶다면',
      '감정을',
      '해야',
      '알고',
      '상대방의',
      '자신의',
      '표현해야',
      '먼저',
      '마음을',
      '해요',
      '숨겨야',
    ],
    answer:
      '상대방의 마음을 알고 싶다면 먼저 자신의 감정을 솔직하게 표현해야 해요',
    answerTranslation: L(
      '상대방의 마음을 알고 싶다면 먼저 자신의 감정을 솔직하게 표현해야 해요.',
      'Sherigingizning ko‘nglini tushunmoqchi bo‘lsangiz, avval o‘z hislaringizni ochiq ifodalashingiz kerak.',
      'If you want to understand your partner’s feelings, first express your own feelings honestly.',
      'Если хотите понять чувства партнёра, сначала честно выражайте свои чувства.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['emotion-expression', 'translate-builder'],
  },

  s6u1_316_listening: {
    type: 'listening',
    instruction: L(
      '남자가 앞으로 하려고 하는 행동을 고르세요.',
      'Erkak bundan keyin nima qilmoqchi ekanini tanlang.',
      'Choose what the man intends to do from now on.',
      'Выберите, что мужчина собирается делать в дальнейшем.',
    ),
    audioText:
      '여자 친구가 요즘 제가 자기 이야기를 잘 듣지 않는다고 서운해했어요. 앞으로는 제 생각부터 말하기보다 여자 친구의 말을 먼저 들어 보려고 해요.',
    options: [
      '여자 친구의 말을 먼저 듣는다',
      '자신의 이야기만 계속한다',
      '여자 친구와 연락하지 않는다',
      '바로 헤어지자고 한다',
    ],
    answer: '여자 친구의 말을 먼저 듣는다',
    answerTranslation: L(
      '앞으로 여자 친구의 말을 먼저 들어 보려고 해요.',
      'Bundan keyin avval qiz do‘stining gapini tinglamoqchi.',
      'He plans to listen to his girlfriend first.',
      'Теперь он собирается сначала выслушивать девушку.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['lover', 'communication', 'listening'],
  },

  s6u1_317_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '자신의 기분과 마음을 말이나 행동으로 나타내는 것을 감정을 ___한다고 해요.',
    blankAnswers: ['표현하다'],
    options: ['표현하다', '숨기다', '반대하다', '청혼하다', '소개하다'],
    answer: '표현하다',
    answerTranslation: L(
      '마음속 감정을 밖으로 나타내는 것을 표현한다고 해요.',
      'Ichki hisni tashqariga bildirish 표현하다 deyiladi.',
      'To show or communicate a feeling is to 표현하다 it.',
      'Выражать чувство — 표현하다.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['emotion-expression'],
  },

  s6u1_318_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '숨기면',
      '마음을',
      '어려워요',
      '계속',
      '감정을',
      '알기',
      '서로의',
      '쉬워요',
    ],
    answer: '감정을 계속 숨기면 서로의 마음을 알기 어려워요',
    audioText: '감정을 계속 숨기면 서로의 마음을 알기 어려워요.',
    answerTranslation: L(
      '감정을 숨기기만 하면 서로의 마음을 이해하기 어려워요.',
      'Hislarni doim yashirsangiz, bir-biringizni tushunish qiyin.',
      'If you keep hiding your feelings, it is hard to understand each other.',
      'Если постоянно скрывать чувства, трудно понимать друг друга.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['emotion', 'word-arrange'],
  },

  s6u1_319_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '자신의 기분이나 생각을 숨기지 않고 직접 나타내는 것을 ___이라고 할 수 있어요.',
    blankAnswers: ['감정을 표현하다'],
    answerTranslation: L(
      '자신의 느낌을 직접 나타내는 것은 감정을 표현하다예요.',
      'O‘z hislarini ochiq bildirish 감정을 표현하다 deyiladi.',
      'Directly showing one’s feelings is 감정을 표현하다.',
      'Прямо выражать свои чувства — 감정을 표현하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target expression is 감정을 표현하다.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 감정을 표현하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['emotion-expression', 'type-answer'],
  },

  s6u1_320_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글의 핵심 생각과 가장 가까운 것을 고르세요.',
      'Matnning asosiy fikriga eng yaqin javobni tanlang.',
      'Choose the statement closest to the main idea.',
      'Выберите утверждение, наиболее близкое к основной мысли текста.',
    ),
    passage:
      '연애를 하다 보면 상대방에게 서운한 일이 생길 수 있습니다. 그때 아무 말도 하지 않고 감정을 계속 숨기면 상대방은 무엇이 문제인지 알기 어렵습니다. 자신의 마음을 차분하게 설명하고 상대방의 말도 들어 보는 것이 중요합니다.',
    options: [
      '감정을 솔직하게 표현하고 상대방의 말도 들어야 한다',
      '서운하면 아무 말도 하지 않는 것이 가장 좋다',
      '갈등이 생기면 바로 관계를 끝내야 한다',
      '상대방보다 자신의 감정만 중요하게 생각해야 한다',
    ],
    answer: '감정을 솔직하게 표현하고 상대방의 말도 들어야 한다',
    answerTranslation: L(
      '감정을 말하고 상대방의 이야기도 듣는 것이 중요하다는 내용이에요.',
      'Hislarni aytish va sherikning gapini ham tinglash muhimligi aytilgan.',
      'The passage says it is important to express feelings and listen to the other person.',
      'В тексте говорится, что важно выражать чувства и выслушивать другого человека.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['emotion', 'communication', 'reading'],
  },

  // ────────────────────────────────────────────────────────────
  // Lesson 2 · 다툼과 오해
  // q321 ~ q340
  // ────────────────────────────────────────────────────────────

  s6u1_321_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '사소한 오해 때문에 자주 다투면 관계가 점점 힘들어질 수 있다는 문장을 만드세요.',
      'Kichik tushunmovchiliklar sabab tez-tez janjallashilsa, munosabat tobora qiyinlashishi mumkinligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Frequent arguments over small misunderstandings can gradually make a relationship difficult.”',
      'Составьте предложение: «Частые ссоры из-за мелких недоразумений могут постепенно усложнить отношения».',
    ),
    options: [
      '오해로',
      '힘들어질',
      '자주',
      '사소한',
      '점점',
      '관계가',
      '수 있어요',
      '다투면',
      '좋아질',
      '결혼식이',
    ],
    answer: '사소한 오해로 자주 다투면 관계가 점점 힘들어질 수 있어요',
    answerTranslation: L(
      '작은 오해 때문에 자주 싸우면 관계가 점점 어려워질 수 있어요.',
      'Kichik tushunmovchiliklar sabab tez-tez janjallashish munosabatni qiyinlashtirishi mumkin.',
      'Frequent arguments caused by small misunderstandings can gradually damage a relationship.',
      'Частые ссоры из-за мелких недоразумений могут постепенно осложнить отношения.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['misunderstanding', 'argument', 'translate-builder'],
  },

  s6u1_322_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '두 사람이 의견이 달라 서로 말다툼하거나 싸우는 행동을 ___라고 해요.',
    blankAnswers: ['다투다'],
    answerTranslation: L(
      '의견이 달라 서로 싸우거나 말다툼하는 것을 다투다라고 해요.',
      'Fikrlar farqi sabab bahslashish 다투다 deyiladi.',
      'To argue or quarrel because of disagreement is 다투다.',
      'Спорить или ссориться из-за разногласий — 다투다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target dictionary-form verb is 다투다.',
      acceptedAnswers: [],
      notes: ['Require 다투다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['argument', 'type-answer'],
  },

  s6u1_323_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '상대방의 말이나 행동의 뜻을 잘못 이해하는 것을 ___라고 해요.',
    blankAnswers: ['오해하다'],
    options: ['오해하다', '존중하다', '용서하다', '청혼하다', '고백하다'],
    answer: '오해하다',
    answerTranslation: L(
      '상대방의 뜻을 잘못 이해하는 것은 오해하는 거예요.',
      'Boshqa insonning ma’nosini noto‘g‘ri tushunish 오해하다 deyiladi.',
      'To misunderstand another person is 오해하다.',
      'Неправильно понять другого человека — 오해하다.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['misunderstanding'],
  },

  s6u1_324_listening: {
    type: 'listening',
    instruction: L(
      '두 사람이 다투게 된 이유를 고르세요.',
      'Ular nima sababdan janjallashganini tanlang.',
      'Choose why the couple argued.',
      'Выберите причину их ссоры.',
    ),
    audioText:
      '제가 회의 중이라 여자 친구의 메시지에 바로 답하지 못했어요. 여자 친구는 제가 일부러 연락을 피한다고 오해해서 화가 났어요.',
    options: [
      '답장이 늦은 이유를 여자 친구가 오해해서',
      '두 사람이 같은 회의에 참석해서',
      '여자 친구가 신혼여행을 예약해서',
      '남자가 결혼을 준비해서',
    ],
    answer: '답장이 늦은 이유를 여자 친구가 오해해서',
    answerTranslation: L(
      '여자 친구가 늦은 답장의 이유를 잘못 이해해서 다투게 됐어요.',
      'Qiz do‘sti kech javob berish sababini noto‘g‘ri tushungani uchun janjal bo‘ldi.',
      'They argued because the girlfriend misunderstood why the reply was late.',
      'Они поссорились, потому что девушка неправильно поняла причину позднего ответа.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['misunderstanding', 'listening'],
  },

  s6u1_325_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '상대방의 말을 끝까지 듣지 않아서 작은 오해가 큰 갈등이 되었다는 문장을 만드세요.',
      'Sherigingizning gapini oxirigacha tinglamaganingiz sabab kichik tushunmovchilik katta nizoga aylanganini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Because I did not listen to the other person until the end, a small misunderstanding became a big conflict.”',
      'Составьте предложение: «Из-за того что я не выслушал партнёра до конца, маленькое недоразумение превратилось в большой конфликт».',
    ),
    options: [
      '큰',
      '작은',
      '됐어요',
      '말을',
      '갈등이',
      '끝까지',
      '상대방의',
      '듣지',
      '않아서',
      '오해가',
      '해결이',
    ],
    answer: '상대방의 말을 끝까지 듣지 않아서 작은 오해가 큰 갈등이 됐어요',
    answerTranslation: L(
      '상대방의 말을 끝까지 듣지 않아 작은 오해가 큰 갈등으로 커졌어요.',
      'Sherigimning gapini oxirigacha tinglamaganim uchun kichik tushunmovchilik katta nizoga aylandi.',
      'A small misunderstanding became a major conflict because I did not listen to the other person fully.',
      'Маленькое недоразумение стало серьёзным конфликтом, потому что я не выслушал другого человека до конца.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['misunderstanding', 'conflict', 'translate-builder'],
  },

  s6u1_326_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '직접',
      '오해하지',
      '확인하는',
      '혼자',
      '말고',
      '좋아요',
      '게',
      '상대방에게',
      '숨기는',
    ],
    answer: '혼자 오해하지 말고 상대방에게 직접 확인하는 게 좋아요',
    audioText: '혼자 오해하지 말고 상대방에게 직접 확인하는 게 좋아요.',
    answerTranslation: L(
      '혼자 판단하지 말고 상대방에게 직접 물어보는 게 좋아요.',
      'O‘zingizcha noto‘g‘ri tushunmay, sherigingizdan bevosita so‘ragan yaxshi.',
      'Rather than assuming, it is better to check directly with the other person.',
      'Вместо того чтобы самому делать ошибочные выводы, лучше прямо спросить другого человека.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['misunderstanding', 'word-arrange'],
  },

  s6u1_327_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '서로 원하는 것이 다르거나 의견이 부딪쳐 생기는 문제를 ___이라고 해요.',
    blankAnswers: ['갈등'],
    answerTranslation: L(
      '서로 의견이나 욕구가 부딪치는 문제를 갈등이라고 해요.',
      'Fikr yoki istaklar to‘qnashuvi 갈등 deyiladi.',
      'A conflict caused by clashing views or needs is 갈등.',
      'Столкновение взглядов или интересов называется 갈등.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target Korean noun is 갈등.',
      acceptedAnswers: [],
      notes: ['Require 갈등.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['conflict', 'type-answer'],
  },

  s6u1_328_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람의 오해가 생긴 원인을 고르세요.',
      'Tushunmovchilikning asosiy sababini tanlang.',
      'Choose the cause of the misunderstanding.',
      'Выберите причину недоразумения.',
    ),
    passage:
      '민수는 친구들과 저녁을 먹느라 휴대전화를 보지 못했습니다. 수진은 몇 시간 동안 답장이 없자 민수가 자신에게 화가 난 줄 알았습니다. 다음 날 이유를 들은 뒤에야 수진은 자신이 민수를 오해했다는 것을 알았습니다.',
    options: [
      '답장이 없는 이유를 확인하지 않고 혼자 판단했기 때문에',
      '민수가 실제로 수진에게 화를 냈기 때문에',
      '두 사람이 같은 식당에 있었기 때문에',
      '수진이 휴대전화를 잃어버렸기 때문에',
    ],
    answer: '답장이 없는 이유를 확인하지 않고 혼자 판단했기 때문에',
    answerTranslation: L(
      '수진이 이유를 확인하지 않고 혼자 잘못 판단해서 오해가 생겼어요.',
      'Sujin sababini tekshirmay o‘zicha xulosa qilgani uchun tushunmovchilik paydo bo‘ldi.',
      'The misunderstanding arose because Sujin assumed the reason without checking.',
      'Недоразумение возникло потому, что Суджин сделала вывод, не выяснив причину.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['misunderstanding', 'reading'],
  },

  s6u1_329_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText: '상대방의 말을 제대로 듣지 않아서 오해가 풀렸어요.',
    wrongWord: '풀렸어요.',
    options: ['생겼어요.', '풀렸어요.', '사라졌어요.', '끝났어요.'],
    answer: '생겼어요.',
    answerTranslation: L(
      '상대방의 말을 제대로 듣지 않아서 오해가 생겼어요.',
      'Sherigimning gapini to‘g‘ri tinglamaganim uchun tushunmovchilik paydo bo‘ldi.',
      'A misunderstanding arose because I did not listen properly.',
      'Недоразумение возникло потому, что я не выслушал человека как следует.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['misunderstanding', 'error-hunt'],
  },

  s6u1_330_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '의견이 달라도 상대방의 말을 끊지 않고 끝까지 들어야 한다는 문장을 만드세요.',
      'Fikrlar turlicha bo‘lsa ham, sherigingizning gapini bo‘lmasdan oxirigacha tinglash kerakligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Even when opinions differ, you should listen to the other person without interrupting.”',
      'Составьте предложение: «Даже если мнения различаются, нужно выслушать другого человека до конца, не перебивая».',
    ),
    options: [
      '말을',
      '상대방의',
      '않고',
      '달라도',
      '끝까지',
      '들어야',
      '의견이',
      '끊지',
      '해요',
      '무시해야',
    ],
    answer: '의견이 달라도 상대방의 말을 끊지 않고 끝까지 들어야 해요',
    answerTranslation: L(
      '생각이 달라도 상대방의 말을 끝까지 들어야 해요.',
      'Fikrlar har xil bo‘lsa ham, sherigingizning gapini oxirigacha tinglash kerak.',
      'Even when opinions differ, you should listen to the other person to the end.',
      'Даже если мнения различаются, нужно выслушать другого человека до конца.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['communication', 'conflict', 'translate-builder'],
  },

  s6u1_331_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 단어를 입력하세요.',
      'Eshitgan gapingizdagi tushib qolgan so‘zni yozing.',
      'Type the missing word.',
      'Введите пропущенное слово.',
    ),
    audioText: '우리는 사소한 일로 자주 다투곤 했어요.',
    sentenceTemplate: '우리는 사소한 일로 자주 ___.',
    blankAnswers: ['다투곤 했어요'],
    answerTranslation: L(
      '우리는 작은 일 때문에 자주 다퉜어요.',
      'Biz kichik narsalar sabab tez-tez janjallashardik.',
      'We used to argue frequently over small things.',
      'Мы часто ссорились из-за мелочей.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated missing form is 다투곤 했어요.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 다투곤 했어요.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['argument', 'listen-fill'],
  },

  s6u1_332_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '작은 ___를 바로 확인하지 않으면 두 사람이 ___게 되고 결국 큰 ___으로 이어질 수 있습니다.',
    blankAnswers: ['오해', '다투', '갈등'],
    options: ['오해', '다투', '갈등', '청혼', '신혼'],
    answer: '오해|다투|갈등',
    answerTranslation: L(
      '작은 오해를 해결하지 않으면 다툼과 큰 갈등으로 이어질 수 있어요.',
      'Kichik tushunmovchilik hal qilinmasa, janjal va katta nizoga aylanishi mumkin.',
      'An unresolved misunderstanding can lead to arguments and larger conflict.',
      'Неразрешённое недоразумение может привести к ссоре и серьёзному конфликту.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['misunderstanding', 'argument', 'conflict', 'cloze'],
  },

  s6u1_333_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '사실과 다르게 상대방의 말이나 행동을 잘못 이해하는 것을 ___라고 해요.',
    blankAnswers: ['오해하다'],
    answerTranslation: L(
      '상대방의 뜻을 잘못 이해하는 것을 오해하다라고 해요.',
      'Boshqa insonni noto‘g‘ri tushunish 오해하다 deyiladi.',
      'To misunderstand the other person is 오해하다.',
      'Неправильно понять другого человека — 오해하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target dictionary-form verb is 오해하다.',
      acceptedAnswers: [],
      notes: ['Require 오해하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['misunderstanding', 'type-answer'],
  },

  s6u1_334_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '오해가 생겼을 때는 혼자 판단하지 말고 상대방에게 직접 물어보는 게 좋아요.',
    audioText:
      '오해가 생겼을 때는 혼자 판단하지 말고 상대방에게 직접 물어보는 게 좋아요.',
    answerTranslation: L(
      '오해가 생기면 혼자 생각하지 말고 상대방에게 확인해 보는 게 좋아요.',
      'Tushunmovchilik bo‘lsa, o‘zingizcha xulosa qilmay, sherigingizdan so‘rang.',
      'When a misunderstanding occurs, it is better to ask the other person directly.',
      'При недоразумении лучше прямо спросить другого человека, а не делать выводы самому.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['misunderstanding', 'speaking'],
  },

  s6u1_335_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '오해가 생기면 혼자 추측하지 말고 직접 물어보는 것이 좋다는 문장을 만드세요.',
      'Tushunmovchilik paydo bo‘lsa, o‘zingizcha taxmin qilmay, bevosita so‘rash yaxshi ekanini bildiradigan gap tuzing.',
      'Build a sentence meaning: “If there is a misunderstanding, it is better to ask directly instead of guessing alone.”',
      'Составьте предложение: «Если возникло недоразумение, лучше спросить прямо, а не строить догадки самому».',
    ),
    options: [
      '좋아요',
      '추측하지',
      '직접',
      '혼자',
      '말고',
      '오해가',
      '생겼다면',
      '물어보는',
      '게',
      '숨기는',
    ],
    answer: '오해가 생겼다면 혼자 추측하지 말고 직접 물어보는 게 좋아요',
    answerTranslation: L(
      '오해가 생기면 혼자 추측하지 말고 직접 확인하는 게 좋아요.',
      'Tushunmovchilik bo‘lsa, o‘zingizcha taxmin qilmay, to‘g‘ridan-to‘g‘ri so‘ragan yaxshi.',
      'If a misunderstanding occurs, it is better to ask directly than assume.',
      'Если возникло недоразумение, лучше спросить прямо, а не гадать.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['misunderstanding', 'translate-builder'],
  },

  s6u1_336_listening: {
    type: 'listening',
    instruction: L(
      '여자가 후회하는 행동을 고르세요.',
      'Ayol qaysi harakatidan afsuslanayotganini tanlang.',
      'Choose the action the woman regrets.',
      'Выберите поступок, о котором женщина жалеет.',
    ),
    audioText:
      '남자 친구가 약속 시간에 늦었는데 이유를 묻지도 않고 저를 중요하게 생각하지 않는다고 말했어요. 알고 보니 길에서 사고가 나서 늦은 거였어요. 제가 너무 빨리 오해한 것 같아요.',
    options: [
      '이유를 확인하지 않고 판단한 것',
      '남자 친구를 오래 기다린 것',
      '사고 현장을 확인한 것',
      '약속 장소에 일찍 도착한 것',
    ],
    answer: '이유를 확인하지 않고 판단한 것',
    answerTranslation: L(
      '이유를 묻지 않고 혼자 판단한 것을 후회하고 있어요.',
      'U sababini so‘ramay o‘zicha xulosa qilganidan afsuslanyapti.',
      'She regrets judging the situation without asking the reason.',
      'Она жалеет, что сделала вывод, не спросив причину.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['misunderstanding', 'listening'],
  },

  s6u1_337_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '서로 의견이 맞지 않아 싸움이나 문제가 생기는 상황을 ___이라고 해요.',
    blankAnswers: ['갈등'],
    options: ['갈등', '청혼', '연애', '중매', '신혼'],
    answer: '갈등',
    answerTranslation: L(
      '의견이나 욕구가 부딪쳐 생기는 문제는 갈등이에요.',
      'Fikr yoki ehtiyojlarning to‘qnashuvi 갈등 deyiladi.',
      'A problem caused by clashing views or needs is 갈등.',
      'Проблема из-за столкновения мнений или интересов — 갈등.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['conflict'],
  },

  s6u1_338_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '커질',
      '대화를',
      '수 있어요',
      '오해가',
      '안 하면',
      '계속',
      '갈등이',
      '줄어들',
    ],
    answer: '대화를 안 하면 오해가 계속 커질 수 있어요',
    audioText: '대화를 안 하면 오해가 계속 커질 수 있어요.',
    answerTranslation: L(
      '대화하지 않으면 오해가 점점 커질 수 있어요.',
      'Gaplashilmasa, tushunmovchilik tobora kattalashishi mumkin.',
      'Without communication, misunderstandings can continue to grow.',
      'Без общения недоразумение может становиться всё серьёзнее.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['misunderstanding', 'communication', 'word-arrange'],
  },

  s6u1_339_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '자신의 생각이나 사실을 숨기지 않고 직접 말하는 행동을 ___라고 해요.',
    blankAnswers: ['솔직하게 말하다'],
    answerTranslation: L(
      '숨기지 않고 자신의 생각을 말하는 것을 솔직하게 말하다라고 해요.',
      'Fikrini yashirmay ochiq gapirish 솔직하게 말하다 deyiladi.',
      'To speak openly without hiding one’s thoughts is 솔직하게 말하다.',
      'Говорить открыто, не скрывая своих мыслей, — 솔직하게 말하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target expression is 솔직하게 말하다.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 솔직하게 말하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['honest-communication', 'type-answer'],
  },

  s6u1_340_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '오해를 줄이기 위해 글에서 권하는 방법을 고르세요.',
      'Tushunmovchilikni kamaytirish uchun matnda tavsiya qilingan usulni tanlang.',
      'Choose the method recommended in the passage for reducing misunderstandings.',
      'Выберите способ, который текст рекомендует для уменьшения недоразумений.',
    ),
    passage:
      '연인 사이에서는 상대방의 행동을 보고 혼자 의미를 추측할 때가 있습니다. 하지만 자신의 추측이 사실이라고 생각하면 작은 일도 큰 오해가 될 수 있습니다. 궁금한 점이 있다면 상대방에게 직접 물어보고 솔직하게 이야기하는 것이 좋습니다.',
    options: [
      '혼자 추측하지 말고 직접 물어본다',
      '상대방의 행동을 항상 부정적으로 생각한다',
      '궁금한 점이 있어도 묻지 않는다',
      '오해가 생기면 바로 헤어진다',
    ],
    answer: '혼자 추측하지 말고 직접 물어본다',
    answerTranslation: L(
      '혼자 판단하지 않고 상대방에게 직접 확인하는 것이 좋아요.',
      'O‘zingizcha xulosa qilmay, sherigingizdan bevosita so‘ragan yaxshi.',
      'It is better to ask the other person directly instead of assuming.',
      'Лучше прямо спросить другого человека, а не строить догадки самому.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['misunderstanding', 'review', 'reading'],
  },

  // ────────────────────────────────────────────────────────────
  // Lesson 3 · 사과하고 화해하기
  // q341 ~ q360
  // ────────────────────────────────────────────────────────────

  s6u1_341_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '자신이 잘못한 부분을 인정하고 먼저 사과했다는 문장을 만드세요.',
      'O‘z xatoingizni tan olib, birinchi bo‘lib uzr so‘raganingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “I admitted what I did wrong and apologized first.”',
      'Составьте предложение: «Я признал свою ошибку и первым извинился».',
    ),
    options: [
      '먼저',
      '제가',
      '인정하고',
      '잘못한',
      '사과했어요',
      '부분을',
      '숨기고',
      '상대방이',
    ],
    answer: '제가 잘못한 부분을 인정하고 먼저 사과했어요',
    answerTranslation: L(
      '제가 잘못한 부분을 인정하고 먼저 사과했어요.',
      'O‘z xatoimni tan olib, birinchi bo‘lib uzr so‘radim.',
      'I admitted what I had done wrong and apologized first.',
      'Я признал свою ошибку и первым извинился.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['apology', 'translate-builder'],
  },

  s6u1_342_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '자신이 잘못했다는 것을 인정하고 미안하다고 말하는 행동을 ___라고 해요.',
    blankAnswers: ['사과하다'],
    answerTranslation: L(
      '자신의 잘못을 인정하고 미안하다고 하는 것을 사과하다라고 해요.',
      'Xatosini tan olib uzr so‘rash 사과하다 deyiladi.',
      'To admit a mistake and say sorry is 사과하다.',
      'Признать ошибку и попросить прощения — 사과하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target dictionary-form verb is 사과하다.',
      acceptedAnswers: [],
      notes: ['Require 사과하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['apology', 'type-answer'],
  },

  s6u1_343_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '상대방이 진심으로 사과했을 때 그 잘못을 더 이상 문제 삼지 않는 것을 ___라고 해요.',
    blankAnswers: ['용서하다'],
    options: ['용서하다', '오해하다', '반대하다', '청혼하다', '다투다'],
    answer: '용서하다',
    answerTranslation: L(
      '상대방의 잘못을 받아들이고 더 이상 탓하지 않는 것은 용서하는 거예요.',
      'Boshqa insonning xatosini kechirish 용서하다 deyiladi.',
      'To forgive someone’s mistake is 용서하다.',
      'Простить ошибку другого человека — 용서하다.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['forgive'],
  },

  s6u1_344_listening: {
    type: 'listening',
    instruction: L(
      '여자의 화가 풀린 이유를 고르세요.',
      'Ayolning jahli nega bosilganini tanlang.',
      'Choose why the woman calmed down.',
      'Выберите, почему женщина перестала сердиться.',
    ),
    audioText:
      '처음에는 정말 화가 났어요. 그런데 남자 친구가 변명하지 않고 자기가 잘못했다고 인정하면서 진심으로 미안하다고 했어요. 그래서 조금씩 화가 풀렸어요.',
    options: [
      '남자 친구가 잘못을 인정하고 진심으로 사과해서',
      '남자 친구가 아무 말도 하지 않아서',
      '여자가 먼저 잘못했다고 해서',
      '두 사람이 연락을 끊어서',
    ],
    answer: '남자 친구가 잘못을 인정하고 진심으로 사과해서',
    answerTranslation: L(
      '남자 친구가 잘못을 인정하고 진심으로 사과해서 화가 풀렸어요.',
      'Yigit xatosini tan olib chin dildan uzr so‘ragani uchun uning jahli bosildi.',
      'She calmed down because her boyfriend admitted his mistake and sincerely apologized.',
      'Она перестала сердиться, потому что парень признал ошибку и искренне извинился.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['calm-down', 'apology', 'listening'],
  },

  s6u1_345_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '진심으로 사과하자 상대방의 화가 조금씩 풀렸다는 문장을 만드세요.',
      'Chin dildan uzr so‘raganingizdan keyin sherigingizning jahli asta-sekin bosilganini bildiradigan gap tuzing.',
      'Build a sentence meaning: “When I apologized sincerely, the other person gradually calmed down.”',
      'Составьте предложение: «После искреннего извинения другой человек постепенно перестал сердиться».',
    ),
    options: [
      '조금씩',
      '사과하자',
      '진심으로',
      '상대방의',
      '풀렸어요',
      '화가',
      '더',
      '커졌어요',
    ],
    answer: '진심으로 사과하자 상대방의 화가 조금씩 풀렸어요',
    answerTranslation: L(
      '진심으로 사과한 뒤 상대방의 화가 조금씩 풀렸어요.',
      'Chin dildan uzr so‘ragach, sherigimning jahli asta-sekin bosildi.',
      'After a sincere apology, the other person gradually calmed down.',
      'После искреннего извинения другой человек постепенно успокоился.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['calm-down', 'apology', 'translate-builder'],
  },

  s6u1_346_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '먼저',
      '사과하는',
      '필요해요',
      '잘못했다면',
      '용기가',
      '자신이',
      '숨기는',
      '상대방이',
    ],
    answer: '자신이 잘못했다면 먼저 사과하는 용기가 필요해요',
    audioText: '자신이 잘못했다면 먼저 사과하는 용기가 필요해요.',
    answerTranslation: L(
      '자신이 잘못했으면 먼저 미안하다고 말할 수 있어야 해요.',
      'Xato qilgan bo‘lsangiz, birinchi bo‘lib uzr so‘rashga jur’at kerak.',
      'If you are at fault, you need the courage to apologize first.',
      'Если вы виноваты, нужна смелость первым попросить прощения.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['apology', 'word-arrange'],
  },

  s6u1_347_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '화가 났던 사람이 더 이상 화를 내지 않고 마음이 편해지는 것을 ___라고 해요.',
    blankAnswers: ['화가 풀리다'],
    answerTranslation: L(
      '화났던 마음이 가라앉는 것을 화가 풀리다라고 해요.',
      'Jahlning bosilishi 화가 풀리다 deyiladi.',
      'For one’s anger to subside is 화가 풀리다.',
      'Перестать сердиться — 화가 풀리다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target expression is 화가 풀리다.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 화가 풀리다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['calm-down', 'type-answer'],
  },

  s6u1_348_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람이 다시 관계를 회복할 수 있었던 이유를 고르세요.',
      'Ular munosabatni qayta tiklay olgan sababni tanlang.',
      'Choose why the couple was able to repair their relationship.',
      'Выберите, почему пара смогла восстановить отношения.',
    ),
    passage:
      '두 사람은 크게 다툰 뒤 며칠 동안 연락하지 않았습니다. 민지는 자신의 말이 너무 심했다는 것을 깨닫고 먼저 사과했습니다. 준호도 자기가 민지의 입장을 충분히 듣지 않았다고 인정했습니다. 두 사람은 서로의 잘못을 이야기한 뒤 다시 잘 지내기로 했습니다.',
    options: [
      '서로 자신의 잘못을 인정하고 사과했기 때문에',
      '누가 더 잘못했는지만 계속 따졌기 때문에',
      '며칠 동안 계속 연락하지 않았기 때문에',
      '두 사람이 다른 사람을 만나기 시작했기 때문에',
    ],
    answer: '서로 자신의 잘못을 인정하고 사과했기 때문에',
    answerTranslation: L(
      '서로 잘못을 인정하고 사과해서 관계를 회복할 수 있었어요.',
      'Ikkalasi ham xatosini tan olib uzr so‘ragani uchun munosabat tiklandi.',
      'They repaired the relationship because both admitted their mistakes and apologized.',
      'Они восстановили отношения, потому что оба признали ошибки и извинились.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['apology', 'reconciliation', 'reading'],
  },

  s6u1_349_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText:
      '제가 잘못했는데도 상대방이 먼저 사과해야 한다고 고집했더니 갈등이 줄었어요.',
    wrongWord: '줄었어요.',
    options: ['커졌어요.', '줄었어요.', '풀렸어요.', '끝났어요.'],
    answer: '커졌어요.',
    answerTranslation: L(
      '제가 잘못했는데도 상대방이 먼저 사과해야 한다고 고집했더니 갈등이 커졌어요.',
      'O‘zim xato qilgan bo‘lsam ham, sherigim birinchi uzr so‘rashi kerak deb turib olganim uchun nizo kattalashdi.',
      'The conflict grew because I insisted the other person apologize first even though I was at fault.',
      'Конфликт усилился, потому что я настаивал, чтобы другой извинился первым, хотя виноват был я.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['conflict', 'apology', 'error-hunt'],
  },

  s6u1_350_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '사과를 받았지만 바로 용서하기는 어려웠다는 문장을 만드세요.',
      'Uzrni qabul qilgan bo‘lsangiz ham, darhol kechirish qiyin bo‘lganini bildiradigan gap tuzing.',
      'Build a sentence meaning: “I received the apology, but it was difficult to forgive immediately.”',
      'Составьте предложение: «Я получил извинение, но сразу простить было трудно».',
    ),
    options: [
      '바로',
      '용서하기는',
      '사과를',
      '어려웠어요',
      '받았지만',
      '쉬웠어요',
      '청혼을',
    ],
    answer: '사과를 받았지만 바로 용서하기는 어려웠어요',
    answerTranslation: L(
      '사과는 받았지만 마음이 바로 풀리지는 않았어요.',
      'Uzrni qabul qildim, lekin darhol kechirish oson bo‘lmadi.',
      'I received the apology, but forgiving immediately was difficult.',
      'Я принял извинение, но сразу простить было трудно.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['forgive', 'apology', 'translate-builder'],
  },

  s6u1_351_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 표현을 입력하세요.',
      'Eshitgan gapingizdagi tushib qolgan ifodani yozing.',
      'Type the missing expression.',
      'Введите пропущенное выражение.',
    ),
    audioText: '진심으로 사과하니까 제 화가 조금씩 풀렸어요.',
    sentenceTemplate: '진심으로 사과하니까 제 ___.',
    blankAnswers: ['화가 조금씩 풀렸어요'],
    answerTranslation: L(
      '진심으로 사과해서 제 화가 조금씩 풀렸어요.',
      'Chin dildan uzr so‘ragani uchun jahlim asta-sekin bosildi.',
      'Because of the sincere apology, my anger gradually subsided.',
      'После искреннего извинения мой гнев постепенно прошёл.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The dictated missing expression is 화가 조금씩 풀렸어요.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 화가 조금씩 풀렸어요.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['calm-down', 'listen-fill'],
  },

  s6u1_352_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '다툰 뒤 자신이 잘못한 것을 인정하고 먼저 ___하는 것이 중요합니다. 상대방도 진심을 느끼면 조금씩 화가 ___ 수 있고 결국 서로 ___할 수도 있습니다.',
    blankAnswers: ['사과', '풀릴', '화해'],
    options: ['사과', '풀릴', '화해', '오해', '반대'],
    answer: '사과|풀릴|화해',
    answerTranslation: L(
      '진심으로 사과하면 화가 풀리고 다시 화해할 수 있어요.',
      'Chin dildan uzr so‘ralsa, jahl bosilib yana yarashish mumkin.',
      'A sincere apology can calm anger and make reconciliation possible.',
      'Искреннее извинение может успокоить гнев и привести к примирению.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['apology', 'calm-down', 'reconciliation', 'cloze'],
  },

  s6u1_353_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '다투었던 두 사람이 다시 관계를 좋게 만들고 사이를 회복하는 것을 ___라고 해요.',
    blankAnswers: ['화해하다'],
    answerTranslation: L(
      '다퉜던 사람들이 다시 사이를 좋게 만드는 것을 화해하다라고 해요.',
      'Janjallashgan insonlarning yana yarashishi 화해하다 deyiladi.',
      'For people who argued to make peace again is 화해하다.',
      'Помириться после ссоры — 화해하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target dictionary-form verb is 화해하다.',
      acceptedAnswers: [],
      notes: ['Require 화해하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['reconciliation', 'type-answer'],
  },

  s6u1_354_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '제가 잘못했다면 변명하기보다 먼저 인정하고 진심으로 사과하는 게 좋다고 생각해요.',
    audioText:
      '제가 잘못했다면 변명하기보다 먼저 인정하고 진심으로 사과하는 게 좋다고 생각해요.',
    answerTranslation: L(
      '잘못했을 때는 변명보다 인정하고 사과하는 것이 중요하다고 생각해요.',
      'Xato qilganda bahona qilishdan ko‘ra tan olib uzr so‘rash muhim deb o‘ylayman.',
      'If I am at fault, I think admitting it and apologizing sincerely is better than making excuses.',
      'Если я виноват, считаю, что лучше признать ошибку и искренне извиниться, чем оправдываться.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['apology', 'speaking'],
  },

  s6u1_355_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '서로 자신의 잘못을 인정하고 대화한 뒤 결국 화해했다는 문장을 만드세요.',
      'Ikkalasi ham o‘z xatosini tan olib gaplashgach, oxiri yarashganini bildiradigan gap tuzing.',
      'Build a sentence meaning: “After both admitted their mistakes and talked, they eventually reconciled.”',
      'Составьте предложение: «После того как оба признали ошибки и поговорили, они наконец помирились».',
    ),
    options: [
      '결국',
      '인정하고',
      '서로의',
      '대화한',
      '화해했어요',
      '잘못을',
      '뒤',
      '헤어졌어요',
    ],
    answer: '서로의 잘못을 인정하고 대화한 뒤 결국 화해했어요',
    answerTranslation: L(
      '서로 잘못을 인정하고 이야기한 뒤 다시 사이가 좋아졌어요.',
      'Bir-birining xatosini tan olib gaplashgach, oxiri yarashishdi.',
      'After admitting their mistakes and talking, they eventually made peace.',
      'После признания ошибок и разговора они в конце концов помирились.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['reconciliation', 'apology', 'translate-builder'],
  },

  s6u1_356_listening: {
    type: 'listening',
    instruction: L(
      '남자가 관계를 회복하기 위해 한 행동을 고르세요.',
      'Erkak munosabatni tiklash uchun qilgan ishni tanlang.',
      'Choose what the man did to repair the relationship.',
      'Выберите, что мужчина сделал для восстановления отношений.',
    ),
    audioText:
      '제가 여자 친구에게 너무 심한 말을 했어요. 다음 날 제가 먼저 찾아가서 그 말을 한 것을 후회한다고 말하고 사과했어요. 다행히 여자 친구도 제 사과를 받아 줬어요.',
    options: [
      '먼저 찾아가 자신의 말을 사과했다',
      '여자 친구에게 다시 화를 냈다',
      '아무 연락도 하지 않았다',
      '자신의 잘못을 모두 부정했다',
    ],
    answer: '먼저 찾아가 자신의 말을 사과했다',
    answerTranslation: L(
      '남자는 먼저 여자 친구를 찾아가 잘못한 말을 사과했어요.',
      'U birinchi bo‘lib qiz do‘stini topib, aytgan gaplari uchun uzr so‘radi.',
      'He went to his girlfriend first and apologized for what he had said.',
      'Он первым пошёл к девушке и извинился за свои слова.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['apology', 'reconciliation', 'listening'],
  },

  s6u1_357_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '다툰 두 사람이 서로 사과하고 다시 좋은 사이가 되는 것을 ___라고 해요.',
    blankAnswers: ['화해하다'],
    options: ['화해하다', '다투다', '오해하다', '청혼하다', '헤어지다'],
    answer: '화해하다',
    answerTranslation: L(
      '다퉜던 사람들이 다시 사이가 좋아지는 것은 화해하는 거예요.',
      'Janjallashgan odamlarning yana yarashishi 화해하다 deyiladi.',
      'Making peace after an argument is 화해하다.',
      'Помириться после ссоры — 화해하다.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['reconciliation'],
  },

  s6u1_358_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '시간이',
      '용서하려면',
      '필요할',
      '때도',
      '상대방을',
      '있어요',
      '바로',
      '없어요',
    ],
    answer: '상대방을 용서하려면 시간이 필요할 때도 있어요',
    audioText: '상대방을 용서하려면 시간이 필요할 때도 있어요.',
    answerTranslation: L(
      '상대방을 바로 용서하기 어려워 시간이 필요할 수도 있어요.',
      'Sherigingizni kechirish uchun ba’zan vaqt kerak bo‘lishi mumkin.',
      'Sometimes it takes time to forgive the other person.',
      'Иногда, чтобы простить другого человека, требуется время.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['forgive', 'word-arrange'],
  },

  s6u1_359_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '상대방이 잘못했지만 그 잘못을 받아들이고 더 이상 탓하지 않는 행동을 ___라고 해요.',
    blankAnswers: ['용서하다'],
    answerTranslation: L(
      '상대방의 잘못을 받아들이는 것을 용서하다라고 해요.',
      'Sherikning xatosini kechirish 용서하다 deyiladi.',
      'Accepting someone’s mistake and no longer blaming them is 용서하다.',
      'Принять ошибку другого и больше не обвинять его — 용서하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target dictionary-form verb is 용서하다.',
      acceptedAnswers: [],
      notes: ['Require 용서하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['forgive', 'type-answer'],
  },

  s6u1_360_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '건강한 사과에 대한 글의 생각과 맞는 것을 고르세요.',
      'Sog‘lom uzr so‘rash haqida matndagi fikrga mos javobni tanlang.',
      'Choose the statement matching the passage’s view of a healthy apology.',
      'Выберите утверждение, соответствующее взгляду текста на правильное извинение.',
    ),
    passage:
      '사과할 때는 단순히 “미안해”라고 말하는 것만으로 충분하지 않을 때도 있습니다. 자신이 무엇을 잘못했는지 알고 상대방이 왜 상처를 받았는지 이해하려는 태도가 필요합니다. 같은 행동을 반복하지 않으려는 노력도 중요합니다.',
    options: [
      '잘못을 이해하고 같은 행동을 반복하지 않으려는 태도가 필요하다',
      '미안하다는 한마디만 하면 항상 충분하다',
      '사과한 뒤에도 같은 행동을 반복해도 괜찮다',
      '상대방이 왜 화났는지는 알 필요가 없다',
    ],
    answer: '잘못을 이해하고 같은 행동을 반복하지 않으려는 태도가 필요하다',
    answerTranslation: L(
      '사과할 때는 잘못을 이해하고 행동을 바꾸려는 노력도 필요해요.',
      'Uzr so‘rashda xatoni tushunib, uni takrorlamaslikka harakat qilish kerak.',
      'A sincere apology requires understanding the mistake and trying not to repeat it.',
      'Искреннее извинение требует понять ошибку и постараться её не повторять.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['apology', 'review', 'reading'],
  },

  // ────────────────────────────────────────────────────────────
  // Lesson 4 · 상대방을 배려하고 존중하기
  // q361 ~ q380
  // ────────────────────────────────────────────────────────────

  s6u1_361_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '좋은 관계를 유지하려면 상대방의 입장을 배려해야 한다는 문장을 만드세요.',
      'Yaxshi munosabatni saqlash uchun sherigingizning holatini hisobga olish kerakligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “To maintain a good relationship, you need to consider the other person’s perspective.”',
      'Составьте предложение: «Чтобы сохранять хорошие отношения, нужно учитывать позицию другого человека».',
    ),
    options: [
      '상대방의',
      '배려해야',
      '관계를',
      '유지하려면',
      '좋은',
      '입장을',
      '해요',
      '무시해야',
      '외모를',
    ],
    answer: '좋은 관계를 유지하려면 상대방의 입장을 배려해야 해요',
    answerTranslation: L(
      '좋은 관계를 계속하려면 상대방의 상황과 마음을 생각해야 해요.',
      'Yaxshi munosabatni saqlash uchun sherigingizning holati va hislarini hisobga olish kerak.',
      'To maintain a good relationship, you need to consider the other person’s situation and feelings.',
      'Чтобы сохранять хорошие отношения, нужно учитывать ситуацию и чувства партнёра.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['consideration', 'relationship', 'translate-builder'],
  },

  s6u1_362_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '상대방의 상황과 마음을 생각해서 행동하는 것을 ___라고 해요.',
    blankAnswers: ['배려하다'],
    answerTranslation: L(
      '상대방의 상황과 기분을 생각해 행동하는 것은 배려하다예요.',
      'Boshqa insonning holati va hislarini hisobga olish 배려하다 deyiladi.',
      'To act while considering another person’s situation and feelings is 배려하다.',
      'Учитывать положение и чувства другого человека — 배려하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target dictionary-form verb is 배려하다.',
      acceptedAnswers: [],
      notes: ['Require 배려하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['consideration', 'type-answer'],
  },

  s6u1_363_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '상대방의 생각이나 선택을 소중하게 인정하는 행동을 ___라고 해요.',
    blankAnswers: ['존중하다'],
    options: ['존중하다', '오해하다', '다투다', '반대하다', '청혼하다'],
    answer: '존중하다',
    answerTranslation: L(
      '상대방의 생각과 선택을 소중하게 인정하는 것을 존중하다라고 해요.',
      'Boshqa insonning fikr va tanlovini qadrlash 존중하다 deyiladi.',
      'To value and accept another person’s thoughts or choices is 존중하다.',
      'Ценить и признавать мысли и выбор другого человека — 존중하다.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['respect'],
  },

  s6u1_364_listening: {
    type: 'listening',
    instruction: L(
      '두 사람이 서로 배려하는 방법을 고르세요.',
      'Ular bir-biriga qanday e’tibor ko‘rsatishini tanlang.',
      'Choose how the couple shows consideration for each other.',
      'Выберите, как пара проявляет заботу и внимание друг к другу.',
    ),
    audioText:
      '저는 아침에 일찍 일어나고 남편은 늦게 자는 편이에요. 서로 생활 시간이 다르기 때문에 저는 아침에 조용히 준비하고 남편은 밤에 소리를 줄이려고 해요.',
    options: [
      '서로의 생활 시간을 생각해 소음을 줄인다',
      '한 사람이 자신의 습관만 지키라고 요구한다',
      '생활 시간이 다르면 따로 살기로 한다',
      '상대방의 생활 방식을 무조건 바꾼다',
    ],
    answer: '서로의 생활 시간을 생각해 소음을 줄인다',
    answerTranslation: L(
      '서로의 생활 시간을 생각해서 조용히 행동하고 있어요.',
      'Ular bir-birining kun tartibini hisobga olib, shovqinni kamaytiradi.',
      'They reduce noise while considering each other’s schedules.',
      'Они стараются меньше шуметь, учитывая режим друг друга.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['consideration', 'respect', 'listening'],
  },

  s6u1_365_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '상대방을 바꾸려고 하기보다 지금 모습 그대로 존중하는 것이 중요하다는 문장을 만드세요.',
      'Sherigingizni o‘zgartirishga urinishdan ko‘ra, uni hozir qanday bo‘lsa shunday hurmat qilish muhimligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Rather than trying to change the other person, it is important to respect them as they are.”',
      'Составьте предложение: «Вместо того чтобы пытаться изменить партнёра, важно уважать его таким, какой он есть».',
    ),
    options: [
      '그대로',
      '바꾸려고',
      '존중하는',
      '중요해요',
      '상대방을',
      '하기보다',
      '것이',
      '무시하는',
      '완전히',
    ],
    answer: '상대방을 바꾸려고 하기보다 그대로 존중하는 것이 중요해요',
    answerTranslation: L(
      '상대방을 억지로 바꾸기보다 현재 모습 그대로 존중해야 해요.',
      'Sherigingizni majburan o‘zgartirishdan ko‘ra, uni qanday bo‘lsa shunday hurmat qilish kerak.',
      'Rather than forcing a partner to change, it is important to respect them as they are.',
      'Вместо того чтобы заставлять партнёра меняться, важно уважать его таким, какой он есть.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['as-is', 'respect', 'translate-builder'],
  },

  s6u1_366_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '생각을',
      '존중해야',
      '달라도',
      '서로의',
      '해요',
      '의견이',
      '무시해야',
      '조건을',
    ],
    answer: '의견이 달라도 서로의 생각을 존중해야 해요',
    audioText: '의견이 달라도 서로의 생각을 존중해야 해요.',
    answerTranslation: L(
      '생각이 달라도 서로의 의견을 소중하게 받아들여야 해요.',
      'Fikrlar turlicha bo‘lsa ham, bir-birining fikrini hurmat qilish kerak.',
      'Even when opinions differ, each person’s view should be respected.',
      'Даже если мнения различаются, нужно уважать точку зрения друг друга.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['respect', 'word-arrange'],
  },

  s6u1_367_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '상대방을 억지로 바꾸지 않고 현재 모습 그대로 본다는 의미의 부사는 ___예요.',
    blankAnswers: ['그대로'],
    answerTranslation: L(
      '바꾸지 않은 현재 상태를 그대로라고 표현할 수 있어요.',
      'O‘zgartirmasdan ayni holicha ma’nosi 그대로 bilan ifodalanadi.',
      'The word 그대로 means “just as it is” or “unchanged.”',
      'Слово 그대로 означает «как есть, без изменений».',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target Korean adverb is 그대로.',
      acceptedAnswers: [],
      notes: ['Require 그대로.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['as-is', 'type-answer'],
  },

  s6u1_368_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람이 갈등을 줄인 방법을 고르세요.',
      'Ularning nizoni kamaytirgan usulini tanlang.',
      'Choose how the couple reduced conflict.',
      'Выберите, как пара уменьшила количество конфликтов.',
    ),
    passage:
      '유나는 주말마다 밖에 나가는 것을 좋아하지만 남자 친구는 집에서 쉬는 것을 좋아합니다. 예전에는 서로 자신의 방법이 더 좋다고 생각해서 자주 다퉜습니다. 요즘은 한 주는 밖에서 데이트하고 다음 주는 집에서 쉬면서 서로의 취향을 존중하고 있습니다.',
    options: [
      '서로 다른 취향을 인정하고 번갈아 원하는 방식으로 시간을 보낸다',
      '한 사람이 자신의 취향을 완전히 포기한다',
      '두 사람 모두 주말에 만나지 않는다',
      '서로의 취향을 바꾸려고 계속 싸운다',
    ],
    answer: '서로 다른 취향을 인정하고 번갈아 원하는 방식으로 시간을 보낸다',
    answerTranslation: L(
      '서로의 다른 취향을 존중하고 번갈아 맞춰 주고 있어요.',
      'Ular turli didlarini hurmat qilib, navbat bilan bir-biriga moslashadi.',
      'They respect their different preferences and take turns accommodating each other.',
      'Они уважают разные предпочтения и по очереди идут навстречу друг другу.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['respect', 'consideration', 'reading'],
  },

  s6u1_369_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText:
      '상대방의 의견이 다르다고 해서 계속 존중하면 갈등이 커질 수 있어요.',
    wrongWord: '존중하면',
    options: ['무시하면', '존중하면', '배려하면', '들어주면'],
    answer: '무시하면',
    answerTranslation: L(
      '상대방의 의견이 다르다고 해서 계속 무시하면 갈등이 커질 수 있어요.',
      'Sherigingizning fikri boshqacha deb uni doim e’tiborsiz qoldirsangiz, nizo kattalashishi mumkin.',
      'Continuously ignoring a partner because their opinion differs can make conflict worse.',
      'Если постоянно игнорировать мнение партнёра только потому, что оно отличается, конфликт может усилиться.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['respect', 'conflict', 'error-hunt'],
  },

  s6u1_370_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '기분이 상했을 때도 상대방을 무시하는 말은 하지 않아야 한다는 문장을 만드세요.',
      'Xafa bo‘lganingizda ham sherigingizni kamsitadigan gaplarni aytmaslik kerakligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Even when upset, you should not say things that disrespect the other person.”',
      'Составьте предложение: «Даже когда вы расстроены, нельзя говорить слова, унижающие другого человека».',
    ),
    options: [
      '말은',
      '하지',
      '기분이',
      '않아야',
      '상대방을',
      '때도',
      '상했을',
      '무시하는',
      '해요',
      '칭찬하는',
    ],
    answer: '기분이 상했을 때도 상대방을 무시하는 말은 하지 않아야 해요',
    answerTranslation: L(
      '화가 나거나 속상해도 상대방을 무시하는 말은 피해야 해요.',
      'Jahlingiz chiqqanda ham sherigingizni kamsitadigan gaplarni aytmaslik kerak.',
      'Even when angry or hurt, you should avoid disrespectful language toward the other person.',
      'Даже когда вы злитесь или обижены, следует избегать неуважительных слов в адрес партнёра.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['respect', 'conflict', 'translate-builder'],
  },

  s6u1_371_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 단어를 입력하세요.',
      'Eshitgan gapingizdagi tushib qolgan so‘zni yozing.',
      'Type the missing word.',
      'Введите пропущенное слово.',
    ),
    audioText: '서로 다른 생각도 존중해야 좋은 관계를 유지할 수 있어요.',
    sentenceTemplate: '서로 다른 생각도 ___해야 좋은 관계를 유지할 수 있어요.',
    blankAnswers: ['존중'],
    answerTranslation: L(
      '서로 다른 생각도 존중해야 좋은 관계를 유지할 수 있어요.',
      'Turli fikrlarni ham hurmat qilsak, yaxshi munosabatni saqlash mumkin.',
      'Respecting different opinions helps maintain a good relationship.',
      'Уважение разных мнений помогает сохранять хорошие отношения.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated missing word is 존중.',
      acceptedAnswers: [],
      notes: ['Require 존중.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 4,
    tags: ['respect', 'listen-fill'],
  },

  s6u1_372_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '좋은 관계를 오래 ___하려면 상대방의 상황을 ___하고 서로 다른 생각도 ___할 필요가 있습니다.',
    blankAnswers: ['유지', '배려', '존중'],
    options: ['유지', '배려', '존중', '반대', '오해'],
    answer: '유지|배려|존중',
    answerTranslation: L(
      '관계를 오래 유지하려면 상대방을 배려하고 존중해야 해요.',
      'Munosabatni uzoq saqlash uchun sherigingizga e’tibor va hurmat kerak.',
      'Maintaining a relationship requires consideration and respect for the other person.',
      'Для долгих отношений нужны забота и уважение к партнёру.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['relationship-maintenance', 'consideration', 'respect', 'cloze'],
  },

  s6u1_373_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '좋은 사이가 계속 이어지도록 관계를 지키는 것을 ___라고 해요.',
    blankAnswers: ['관계를 유지하다'],
    answerTranslation: L(
      '좋은 관계가 계속 이어지게 하는 것을 관계를 유지하다라고 해요.',
      'Yaxshi munosabatni davom ettirish 관계를 유지하다 deyiladi.',
      'To keep a relationship going is 관계를 유지하다.',
      'Поддерживать и сохранять отношения — 관계를 유지하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target expression is 관계를 유지하다.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 관계를 유지하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['relationship-maintenance', 'type-answer'],
  },

  s6u1_374_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '좋은 관계를 유지하려면 서로 다른 생각을 인정하고 상대방을 배려해야 해요.',
    audioText:
      '좋은 관계를 유지하려면 서로 다른 생각을 인정하고 상대방을 배려해야 해요.',
    answerTranslation: L(
      '좋은 관계를 위해서는 차이를 인정하고 서로 배려해야 해요.',
      'Yaxshi munosabat uchun farqlarni qabul qilib, bir-biriga e’tiborli bo‘lish kerak.',
      'A good relationship requires accepting differences and showing consideration.',
      'Для хороших отношений нужно принимать различия и проявлять внимание друг к другу.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['relationship-maintenance', 'speaking'],
  },

  s6u1_375_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '서로의 생활 방식을 존중하면 불필요한 갈등을 줄일 수 있다는 문장을 만드세요.',
      'Bir-biringizning turmush tarzini hurmat qilsangiz, keraksiz nizolarni kamaytirish mumkinligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Respecting each other’s lifestyles can reduce unnecessary conflict.”',
      'Составьте предложение: «Уважение образа жизни друг друга помогает уменьшить ненужные конфликты».',
    ),
    options: [
      '갈등을',
      '줄일',
      '방식을',
      '존중하면',
      '수 있어요',
      '생활',
      '서로의',
      '불필요한',
      '늘릴',
    ],
    answer: '서로의 생활 방식을 존중하면 불필요한 갈등을 줄일 수 있어요',
    answerTranslation: L(
      '서로의 생활 방식을 존중하면 필요 없는 갈등을 줄일 수 있어요.',
      'Bir-biringizning turmush tarzini hurmat qilsangiz, keraksiz nizolar kamayadi.',
      'Respecting each other’s lifestyles can reduce unnecessary conflict.',
      'Уважение образа жизни друг друга может уменьшить ненужные конфликты.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['respect', 'conflict', 'translate-builder'],
  },

  s6u1_376_listening: {
    type: 'listening',
    instruction: L(
      '여자가 연인 관계에서 가장 중요하다고 말하는 것을 고르세요.',
      'Ayol munosabatda eng muhim deb aytayotgan narsani tanlang.',
      'Choose what the woman says is most important in a relationship.',
      'Выберите, что женщина считает самым важным в отношениях.',
    ),
    audioText:
      '저는 두 사람이 모든 것을 똑같이 좋아할 필요는 없다고 생각해요. 취미도 다르고 생각도 다를 수 있지만 서로의 선택을 존중해 주는 게 중요해요.',
    options: [
      '서로의 다른 선택을 존중하는 것',
      '모든 취미를 똑같이 만드는 것',
      '항상 한 사람의 의견만 따르는 것',
      '다른 생각을 가지지 않는 것',
    ],
    answer: '서로의 다른 선택을 존중하는 것',
    answerTranslation: L(
      '서로 다른 선택과 생각을 존중하는 것이 중요하다고 해요.',
      'Turli tanlov va fikrlarni hurmat qilish muhim deb aytadi.',
      'She says respecting different choices and opinions is important.',
      'Она считает важным уважать разные решения и мнения.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['respect', 'listening'],
  },

  s6u1_377_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '상대방의 상황을 생각하고 자신의 행동을 조절하는 것을 ___라고 해요.',
    blankAnswers: ['배려하다'],
    options: ['배려하다', '다투다', '오해하다', '화해하다', '청혼하다'],
    answer: '배려하다',
    answerTranslation: L(
      '상대방의 입장과 상황을 생각하는 것은 배려하는 거예요.',
      'Boshqa insonning holatini hisobga olish 배려하다 deyiladi.',
      'Considering the other person’s situation is 배려하다.',
      'Учитывать положение другого человека — 배려하다.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['consideration'],
  },

  s6u1_378_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '유지하려면',
      '존중해야',
      '관계를',
      '서로를',
      '오래',
      '해요',
      '무시해야',
      '조건을',
    ],
    answer: '관계를 오래 유지하려면 서로를 존중해야 해요',
    audioText: '관계를 오래 유지하려면 서로를 존중해야 해요.',
    answerTranslation: L(
      '좋은 관계를 오래 이어 가려면 서로 존중해야 해요.',
      'Munosabatni uzoq saqlash uchun bir-birini hurmat qilish kerak.',
      'To maintain a relationship for a long time, both people need to respect each other.',
      'Чтобы долго сохранять отношения, нужно уважать друг друга.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['relationship-maintenance', 'respect', 'word-arrange'],
  },

  s6u1_379_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '상대방의 생각과 선택을 인정하고 소중하게 받아들이는 행동을 ___라고 해요.',
    blankAnswers: ['존중하다'],
    answerTranslation: L(
      '상대방의 생각과 선택을 인정하는 것을 존중하다라고 해요.',
      'Sherikning fikr va tanlovini qadrlash 존중하다 deyiladi.',
      'To value and accept another person’s choices is 존중하다.',
      'Признавать и ценить выбор другого человека — 존중하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target dictionary-form verb is 존중하다.',
      acceptedAnswers: [],
      notes: ['Require 존중하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['respect', 'type-answer'],
  },

  s6u1_380_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글에서 좋은 관계를 유지하는 방법으로 말하지 않은 것을 고르세요.',
      'Matnda yaxshi munosabatni saqlash usuli sifatida aytilmagan javobni tanlang.',
      'Choose what the passage does NOT recommend for maintaining a good relationship.',
      'Выберите то, что текст НЕ рекомендует для сохранения хороших отношений.',
    ),
    passage:
      '좋은 관계를 유지하기 위해서는 상대방의 입장을 생각하고 서로 다른 점을 존중하는 태도가 필요합니다. 자신의 생각만 옳다고 주장하기보다 상대방의 말을 듣는 것도 중요합니다. 상대방을 억지로 바꾸려고 하면 갈등이 더 커질 수 있습니다.',
    options: [
      '상대방을 자신의 방식대로 바꾸려고 한다',
      '상대방의 입장을 생각한다',
      '서로 다른 점을 존중한다',
      '상대방의 말을 듣는다',
    ],
    answer: '상대방을 자신의 방식대로 바꾸려고 한다',
    answerTranslation: L(
      '글에서는 상대방을 억지로 바꾸려고 하지 말라고 해요.',
      'Matnda sherikni majburan o‘zgartirish tavsiya qilinmaydi.',
      'The passage advises against forcing the other person to change.',
      'Текст не рекомендует заставлять другого человека меняться.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['relationship-maintenance', 'review', 'reading'],
  },

  // ────────────────────────────────────────────────────────────
  // Lesson 5 · 갈등과 화해 종합
  // q381 ~ q400
  // ────────────────────────────────────────────────────────────

  s6u1_381_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '갈등이 생겨도 서로 존중하면서 솔직하게 대화하는 것이 중요하다는 문장을 만드세요.',
      'Nizo chiqsa ham, bir-birini hurmat qilib ochiq gaplashish muhimligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Even when conflict arises, it is important to communicate honestly while respecting each other.”',
      'Составьте предложение: «Даже при конфликте важно честно разговаривать, уважая друг друга».',
    ),
    options: [
      '생겨도',
      '대화하는',
      '갈등이',
      '솔직하게',
      '서로',
      '중요해요',
      '존중하면서',
      '것이',
      '무시하면서',
    ],
    answer: '갈등이 생겨도 서로 존중하면서 솔직하게 대화하는 것이 중요해요',
    answerTranslation: L(
      '갈등이 있어도 서로 존중하면서 솔직히 이야기하는 것이 중요해요.',
      'Nizo bo‘lsa ham, bir-birini hurmat qilib ochiq gaplashish muhim.',
      'Even during conflict, honest communication with mutual respect is important.',
      'Даже при конфликте важно честно разговаривать и уважать друг друга.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['conflict', 'respect', 'translate-builder'],
  },

  s6u1_382_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '연인이나 부부가 좋은 사이를 계속 이어 가는 것을 ___라고 해요.',
    blankAnswers: ['관계를 유지하다'],
    answerTranslation: L(
      '좋은 사이가 계속되도록 하는 것을 관계를 유지하다라고 해요.',
      'Yaxshi munosabatni davom ettirish 관계를 유지하다 deyiladi.',
      'To keep a relationship going is 관계를 유지하다.',
      'Сохранять отношения — 관계를 유지하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target expression is 관계를 유지하다.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 관계를 유지하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['relationship-maintenance', 'type-answer'],
  },

  s6u1_383_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '다툰 뒤 다시 서로 이해하고 좋은 사이가 되는 것을 ___라고 해요.',
    blankAnswers: ['화해하다'],
    options: ['화해하다', '다투다', '오해하다', '반대하다', '헤어지다'],
    answer: '화해하다',
    answerTranslation: L(
      '다툰 뒤 다시 사이가 좋아지는 것은 화해하는 거예요.',
      'Janjaldan keyin yana yarashish 화해하다 deyiladi.',
      'Making peace after an argument is 화해하다.',
      'Помириться после ссоры — 화해하다.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['reconciliation'],
  },

  s6u1_384_listening: {
    type: 'listening',
    instruction: L(
      '두 사람이 갈등을 해결한 순서로 맞는 것을 고르세요.',
      'Ularning nizoni hal qilish tartibini tanlang.',
      'Choose the correct order in which the couple resolved the conflict.',
      'Выберите правильную последовательность разрешения конфликта.',
    ),
    audioText:
      '처음에는 서로 오해해서 크게 다퉜어요. 조금 진정한 뒤 각자 왜 화가 났는지 이야기했고 서로의 말을 들었어요. 마지막에는 둘 다 잘못한 부분을 사과하고 화해했어요.',
    options: [
      '오해와 다툼 → 감정 설명과 대화 → 사과와 화해',
      '화해 → 오해 → 다툼',
      '사과 → 다툼 → 연락 끊기',
      '청혼 → 오해 → 결혼 준비',
    ],
    answer: '오해와 다툼 → 감정 설명과 대화 → 사과와 화해',
    answerTranslation: L(
      '먼저 오해로 다투고, 대화한 뒤 서로 사과하고 화해했어요.',
      'Avval tushunmovchilik sabab janjallashib, keyin gaplashib, uzr so‘rab yarashishdi.',
      'They first argued because of a misunderstanding, then talked, apologized, and reconciled.',
      'Сначала они поссорились из-за недоразумения, затем поговорили, извинились и помирились.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['conflict', 'reconciliation', 'listening'],
  },

  s6u1_385_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '사랑하는 사이일수록 상대방의 감정을 당연하게 생각하면 안 된다는 문장을 만드세요.',
      'Qanchalik yaqin munosabat bo‘lsa ham, sherigingizning hislarini o‘z-o‘zidan ayon deb qabul qilmaslik kerakligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “The closer the relationship, the more important it is not to take the other person’s feelings for granted.”',
      'Составьте предложение: «Чем ближе отношения, тем важнее не воспринимать чувства партнёра как нечто само собой разумеющееся».',
    ),
    options: [
      '생각하면',
      '감정을',
      '사랑하는',
      '안',
      '상대방의',
      '사이일수록',
      '당연하게',
      '돼요',
      '무조건',
    ],
    answer: '사랑하는 사이일수록 상대방의 감정을 당연하게 생각하면 안 돼요',
    answerTranslation: L(
      '가까운 사이라도 상대방의 감정을 당연하게 여기면 안 돼요.',
      'Yaqin munosabatda ham sherigingizning hislarini o‘z-o‘zidan ayon deb bilmaslik kerak.',
      'Even in a close relationship, you should not take your partner’s feelings for granted.',
      'Даже в близких отношениях нельзя воспринимать чувства партнёра как должное.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['emotion', 'respect', 'translate-builder'],
  },

  s6u1_386_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '사과하고',
      '인정해야',
      '잘못을',
      '먼저',
      '자신의',
      '해요',
      '숨겨야',
      '상대방의',
    ],
    answer: '먼저 자신의 잘못을 인정하고 사과해야 해요',
    audioText: '먼저 자신의 잘못을 인정하고 사과해야 해요.',
    answerTranslation: L(
      '자신이 잘못했다면 먼저 인정하고 사과해야 해요.',
      'Xato qilgan bo‘lsangiz, avval tan olib uzr so‘rashingiz kerak.',
      'If you are at fault, you should admit it and apologize first.',
      'Если вы виноваты, нужно сначала признать ошибку и извиниться.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['apology', 'word-arrange'],
  },

  s6u1_387_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '상대방의 상황과 기분을 먼저 생각해서 행동하는 것을 ___라고 해요.',
    blankAnswers: ['배려하다'],
    answerTranslation: L(
      '상대방의 입장을 생각하는 행동을 배려하다라고 해요.',
      'Sherikning holatini hisobga olish 배려하다 deyiladi.',
      'To consider the other person’s circumstances is 배려하다.',
      'Учитывать положение другого человека — 배려하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target dictionary-form verb is 배려하다.',
      acceptedAnswers: [],
      notes: ['Require 배려하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['consideration', 'type-answer'],
  },

  s6u1_388_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글쓴이가 다툼 자체보다 더 중요하다고 생각하는 것을 고르세요.',
      'Muallif janjalning o‘zidan ko‘ra nimani muhimroq deb bilishini tanlang.',
      'Choose what the writer considers more important than the argument itself.',
      'Выберите, что автор считает важнее самой ссоры.',
    ),
    passage:
      '연인끼리 한 번도 다투지 않는 것은 쉽지 않습니다. 서로 다른 사람이기 때문에 의견이 다를 수 있습니다. 저는 다투는 것 자체보다 다툰 뒤 어떻게 행동하는지가 더 중요하다고 생각합니다. 자신의 잘못을 인정하고 상대방의 이야기를 들으며 다시 해결하려는 태도가 필요합니다.',
    options: [
      '다툰 뒤 문제를 해결하려는 태도',
      '절대로 의견 차이를 보이지 않는 것',
      '항상 상대방에게 먼저 사과를 요구하는 것',
      '갈등이 생기면 관계를 끝내는 것',
    ],
    answer: '다툰 뒤 문제를 해결하려는 태도',
    answerTranslation: L(
      '다툰 뒤 서로 문제를 해결하려는 태도가 더 중요하다고 해요.',
      'Janjaldan keyin muammoni birga hal qilishga urinish muhimroq.',
      'The writer says the attitude toward resolving a problem after an argument matters more.',
      'Автор считает важнее то, как люди решают проблему после ссоры.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['conflict', 'problem-solving', 'reading'],
  },

  s6u1_389_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText: '다툰 뒤 서로 사과하고 이야기를 나누자 오해가 생겼어요.',
    wrongWord: '생겼어요.',
    options: ['풀렸어요.', '생겼어요.', '커졌어요.', '시작됐어요.'],
    answer: '풀렸어요.',
    answerTranslation: L(
      '다툰 뒤 서로 사과하고 이야기를 나누자 오해가 풀렸어요.',
      'Janjaldan keyin uzr so‘rab gaplashishgach, tushunmovchilik hal bo‘ldi.',
      'After they apologized and talked, the misunderstanding was resolved.',
      'После извинений и разговора недоразумение разрешилось.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['misunderstanding', 'reconciliation', 'error-hunt'],
  },

  s6u1_390_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '다툰 뒤에는 누가 이겼는지보다 관계를 회복하는 것이 더 중요하다는 문장을 만드세요.',
      'Janjaldan keyin kim yutganidan ko‘ra munosabatni tiklash muhimroq ekanini bildiradigan gap tuzing.',
      'Build a sentence meaning: “After an argument, repairing the relationship matters more than deciding who won.”',
      'Составьте предложение: «После ссоры важнее восстановить отношения, чем выяснять, кто победил».',
    ),
    options: [
      '회복하는',
      '이겼는지보다',
      '관계를',
      '더',
      '뒤에는',
      '누가',
      '중요해요',
      '다툰',
      '끝내는',
    ],
    answer: '다툰 뒤에는 누가 이겼는지보다 관계를 회복하는 것이 더 중요해요',
    answerTranslation: L(
      '싸운 뒤에는 누가 옳았는지보다 관계를 다시 좋게 만드는 것이 중요해요.',
      'Janjaldan keyin kim haq bo‘lganidan ko‘ra munosabatni tiklash muhimroq.',
      'After an argument, repairing the relationship matters more than determining who was right.',
      'После ссоры важнее восстановить отношения, чем выяснять, кто был прав.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['relationship-repair', 'translate-builder'],
  },

  s6u1_391_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 표현을 입력하세요.',
      'Eshitgan gapingizdagi tushib qolgan ifodani yozing.',
      'Type the missing expression.',
      'Введите пропущенное выражение.',
    ),
    audioText: '다툰 뒤에는 서로 사과하고 화해하는 과정이 필요해요.',
    sentenceTemplate: '다툰 뒤에는 서로 ___ 과정이 필요해요.',
    blankAnswers: ['사과하고 화해하는'],
    answerTranslation: L(
      '다툰 뒤에는 서로 사과하고 화해하는 과정이 필요해요.',
      'Janjaldan keyin bir-biridan uzr so‘rab yarashish jarayoni kerak.',
      'After an argument, a process of apologizing and reconciling is necessary.',
      'После ссоры необходим процесс взаимных извинений и примирения.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated missing expression is 사과하고 화해하는.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 사과하고 화해하는.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['apology', 'reconciliation', 'listen-fill'],
  },

  s6u1_392_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '연애를 하다 보면 ___이 생기고 서로 ___ 수도 있습니다. 중요한 것은 그 뒤에 솔직하게 이야기하고 잘못을 ___하며 관계를 회복하는 것입니다.',
    blankAnswers: ['갈등', '다툴', '사과'],
    options: ['갈등', '다툴', '사과', '청혼', '중매'],
    answer: '갈등|다툴|사과',
    answerTranslation: L(
      '연애 중 갈등이나 다툼이 생겨도 대화하고 사과하면서 관계를 회복할 수 있어요.',
      'Munosabatda nizo va janjal bo‘lsa ham, gaplashib uzr so‘rash orqali aloqani tiklash mumkin.',
      'Conflict and arguments can occur in a relationship, but communication and apologies can repair it.',
      'В отношениях возможны конфликты и ссоры, но разговор и извинения помогают восстановить отношения.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['conflict', 'argument', 'apology', 'cloze'],
  },

  s6u1_393_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '다른 사람의 생각과 선택을 소중하게 인정하는 것을 ___라고 해요.',
    blankAnswers: ['존중하다'],
    answerTranslation: L(
      '상대방의 생각과 선택을 인정하는 것은 존중하다예요.',
      'Boshqa insonning fikr va tanlovini qadrlash 존중하다 deyiladi.',
      'To value another person’s thoughts and choices is 존중하다.',
      'Ценить мысли и выбор другого человека — 존중하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target dictionary-form verb is 존중하다.',
      acceptedAnswers: [],
      notes: ['Require 존중하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['respect', 'type-answer'],
  },

  s6u1_394_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '갈등이 생겨도 상대방을 존중하면서 솔직하게 이야기하고 함께 해결하는 것이 중요해요.',
    audioText:
      '갈등이 생겨도 상대방을 존중하면서 솔직하게 이야기하고 함께 해결하는 것이 중요해요.',
    answerTranslation: L(
      '갈등이 있어도 서로 존중하며 대화하고 같이 해결해야 해요.',
      'Nizo bo‘lsa ham, bir-birini hurmat qilib ochiq gaplashib, birga hal qilish kerak.',
      'Even during conflict, it is important to communicate honestly, show respect, and solve the problem together.',
      'Даже при конфликте важно уважать друг друга, честно разговаривать и вместе решать проблему.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['conflict', 'respect', 'speaking'],
  },

  s6u1_395_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '오래 함께하려면 갈등을 피하기보다 건강하게 해결하는 방법을 배워야 한다는 문장을 만드세요.',
      'Uzoq birga bo‘lish uchun nizodan qochishdan ko‘ra uni sog‘lom tarzda hal qilishni o‘rganish kerakligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “To stay together for a long time, people need to learn to resolve conflict in a healthy way rather than avoid it.”',
      'Составьте предложение: «Чтобы долго быть вместе, нужно учиться конструктивно решать конфликты, а не избегать их».',
    ),
    options: [
      '건강하게',
      '배워야',
      '갈등을',
      '오래',
      '방법을',
      '피하기보다',
      '해요',
      '함께하려면',
      '해결하는',
      '숨기는',
    ],
    answer:
      '오래 함께하려면 갈등을 피하기보다 건강하게 해결하는 방법을 배워야 해요',
    answerTranslation: L(
      '오래 함께하려면 갈등을 없애기보다 잘 해결하는 방법을 배워야 해요.',
      'Uzoq birga bo‘lish uchun nizodan qochmasdan uni yaxshi hal qilishni o‘rganish kerak.',
      'To stay together long term, people need to learn how to resolve conflict well rather than avoid it.',
      'Чтобы долго быть вместе, нужно учиться правильно решать конфликты, а не избегать их.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['conflict-resolution', 'translate-builder'],
  },

  s6u1_396_listening: {
    type: 'listening',
    instruction: L(
      '화자가 생각하는 좋은 관계의 특징을 고르세요.',
      'So‘zlovchi yaxshi munosabatning qanday xususiyatini muhim deb bilishini tanlang.',
      'Choose the characteristic the speaker associates with a good relationship.',
      'Выберите характеристику хороших отношений по мнению говорящего.',
    ),
    audioText:
      '좋은 관계라고 해서 갈등이 전혀 없는 것은 아니라고 생각해요. 문제가 생겼을 때 서로 무시하지 않고 이야기하면서 해결할 수 있는 관계가 좋은 관계라고 생각해요.',
    options: [
      '갈등이 생겨도 서로 대화하며 해결할 수 있다',
      '두 사람이 절대로 다른 의견을 가지지 않는다',
      '문제가 생기면 한 사람이 모두 양보한다',
      '갈등이 생기면 항상 연락을 끊는다',
    ],
    answer: '갈등이 생겨도 서로 대화하며 해결할 수 있다',
    answerTranslation: L(
      '문제가 생겨도 대화하면서 함께 해결하는 관계가 좋다고 생각해요.',
      'Muammo bo‘lsa ham gaplashib birga hal qila oladigan munosabat yaxshi deb hisoblaydi.',
      'The speaker believes a good relationship can resolve problems through communication.',
      'Говорящий считает хорошими отношения, в которых проблемы решают с помощью разговора.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['conflict-resolution', 'listening'],
  },

  s6u1_397_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '상대방을 소중하게 생각해 그의 의견과 선택을 인정하는 것은 ___하는 태도예요.',
    blankAnswers: ['존중'],
    options: ['존중', '오해', '반대', '다툼', '청혼'],
    answer: '존중',
    answerTranslation: L(
      '상대방의 의견과 선택을 인정하는 것은 존중하는 태도예요.',
      'Sherikning fikr va tanlovini qadrlash hurmat qilishdir.',
      'Accepting another person’s opinions and choices shows respect.',
      'Признание мнений и выбора другого человека — проявление уважения.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['respect'],
  },

  s6u1_398_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '해결하면',
      '갈등도',
      '관계가',
      '건강하게',
      '강해질',
      '수 있어요',
      '더',
      '끝날',
    ],
    answer: '갈등도 건강하게 해결하면 관계가 더 강해질 수 있어요',
    audioText: '갈등도 건강하게 해결하면 관계가 더 강해질 수 있어요.',
    answerTranslation: L(
      '갈등을 잘 해결하면 오히려 관계가 더 좋아질 수도 있어요.',
      'Nizoni yaxshi hal qilinsa, munosabat yanada mustahkamlanishi mumkin.',
      'Resolving conflict in a healthy way can even strengthen the relationship.',
      'Конструктивное разрешение конфликта может даже укрепить отношения.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['conflict-resolution', 'word-arrange'],
  },

  s6u1_399_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '싸운 뒤 다시 서로 이해하고 좋은 사이를 회복하는 행동을 ___라고 해요.',
    blankAnswers: ['화해하다'],
    answerTranslation: L(
      '다툰 뒤 다시 좋은 사이가 되는 것은 화해하다예요.',
      'Janjaldan keyin yana yarashish 화해하다 deyiladi.',
      'To reconcile after a fight is 화해하다.',
      'Помириться после ссоры — 화해하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target dictionary-form verb is 화해하다.',
      acceptedAnswers: [],
      notes: ['Require 화해하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['reconciliation', 'type-answer'],
  },

  s6u1_400_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글의 내용을 가장 잘 요약한 것을 고르세요.',
      'Matn mazmunini eng yaxshi umumlashtirgan javobni tanlang.',
      'Choose the statement that best summarizes the passage.',
      'Выберите утверждение, лучше всего передающее содержание текста.',
    ),
    passage:
      '오래 만나는 연인도 때로는 서운하고 화가 나거나 서로 오해할 수 있습니다. 중요한 것은 갈등이 생기지 않는 것이 아닙니다. 자신의 감정을 솔직하게 표현하고 상대방의 말을 들으며 잘못했을 때 사과하는 태도가 필요합니다. 서로 배려하고 존중하면서 문제를 해결한다면 관계를 더 건강하게 유지할 수 있습니다.',
    options: [
      '갈등이 생겨도 대화와 사과, 배려와 존중으로 해결하는 것이 중요하다',
      '좋은 연인은 한 번도 다투지 않아야 한다',
      '오해가 생기면 대화하지 않는 것이 좋다',
      '상대방보다 자신의 감정만 중요하게 생각해야 한다',
    ],
    answer: '갈등이 생겨도 대화와 사과, 배려와 존중으로 해결하는 것이 중요하다',
    answerTranslation: L(
      '갈등이 있어도 솔직한 대화와 사과, 배려와 존중으로 관계를 지킬 수 있다는 내용이에요.',
      'Nizo bo‘lsa ham, ochiq suhbat, uzr, e’tibor va hurmat orqali munosabatni saqlash mumkin.',
      'The passage says conflict can be handled through honest communication, apology, consideration, and respect.',
      'Текст говорит, что конфликты можно решать с помощью честного разговора, извинений, заботы и уважения.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['section6', 'unit1', 'node4', 'conflict', 'review', 'reading'],
  },
};

const S6_UNIT1_NODE4_WORDS = [
  {
    code: 'relationship-lover',
    korean: '애인',
    senseKey: 'romantic-partner',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '서로 사랑하며 연애 관계에 있는 사람',
      'sevgi munosabatidagi inson; sevgili',
      'lover; romantic partner',
      'возлюбленный; романтический партнёр',
    ),
    examples: [
      {
        korean: '애인과 서운한 일이 생기면 솔직하게 이야기하는 편이에요.',
        translations: L(
          '연애하는 사람과 문제가 생기면 숨기지 않고 이야기해요.',
          'Sevgan insonim bilan muammo bo‘lsa, ochiq gaplashaman.',
          'When something upsets me with my partner, I tend to talk about it honestly.',
          'Если в отношениях с партнёром что-то задевает меня, я стараюсь говорить об этом честно.',
        ),
      },
    ],
    pronunciation: {
      hangul: '애인',
      romanization: 'aein',
      ttsText: '애인',
    },
    media: {
      emoji: '❤️',
      imageUrl: '',
      imageAlt: L(
        '서로 사랑하는 연인',
        'bir-birini sevadigan juftlik',
        'a romantic couple',
        'влюблённая пара',
      ),
    },
    tags: ['relationship', 'romance', 'partner'],
    difficulty: 4,
    usageNote: L(
      '`남자 친구`, `여자 친구`를 성별과 관계없이 가리킬 때 사용할 수 있어요.',
      'Erkak yoki ayol sherikni jinsidan qat’i nazar ifodalash mumkin.',
      'It can refer to a boyfriend or girlfriend without specifying gender.',
      'Может обозначать парня или девушку без указания пола.',
    ),
    isCore: true,
  },

  {
    code: 'relationship-other-person',
    korean: '상대방',
    senseKey: 'other-person-in-interaction',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '대화나 관계에서 나와 마주하고 있는 다른 사람',
      'muloqot yoki munosabatdagi boshqa inson',
      'the other person; the other party',
      'другой человек; другая сторона',
    ),
    examples: [
      {
        korean: '갈등이 생겼을 때는 상대방의 입장도 생각해 봐야 해요.',
        translations: L(
          '문제가 생기면 다른 사람의 입장에서도 생각해 봐야 해요.',
          'Nizo bo‘lsa, boshqa insonning nuqtai nazarini ham o‘ylash kerak.',
          'When conflict occurs, you should also consider the other person’s perspective.',
          'При конфликте нужно учитывать и точку зрения другого человека.',
        ),
      },
    ],
    pronunciation: {
      hangul: '상대방',
      romanization: 'sangdaebang',
      ttsText: '상대방',
    },
    media: {
      emoji: '👤',
      imageUrl: '',
      imageAlt: L(
        '대화하고 있는 상대방',
        'suhbatdagi boshqa inson',
        'the other person in a conversation',
        'другой участник разговора',
      ),
    },
    tags: ['relationship', 'communication', 'person'],
    difficulty: 4,
    usageNote: L(
      '연애뿐 아니라 대화, 협상, 경기 등 여러 상황에서 다른 쪽 사람을 말할 때 써요.',
      'Faqat munosabatda emas, suhbat, muzokara va boshqa holatlarda ham ishlatiladi.',
      'It is used for the other party in relationships, conversations, negotiations, and many other situations.',
      'Используется для обозначения другой стороны в отношениях, разговоре, переговорах и других ситуациях.',
    ),
    isCore: true,
  },

  {
    code: 'relationship-as-is-adverb',
    korean: '그대로',
    senseKey: 'without-changing-current-state',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '바꾸거나 고치지 않은 현재 상태와 같게',
      'o‘zgartirmasdan ayni holicha',
      'as it is; unchanged',
      'как есть; без изменений',
    ),
    examples: [
      {
        korean: '상대방을 억지로 바꾸기보다 그대로 존중하는 게 중요해요.',
        translations: L(
          '상대방을 바꾸지 않고 지금 모습 그대로 존중해야 해요.',
          'Sherikni o‘zgartirmay, qanday bo‘lsa shunday hurmat qilish muhim.',
          'It is important to respect the other person as they are instead of forcing them to change.',
          'Важно уважать человека таким, какой он есть, а не заставлять его меняться.',
        ),
      },
    ],
    pronunciation: {
      hangul: '그대로',
      romanization: 'geudaero',
      ttsText: '그대로',
    },
    media: {
      emoji: '🫶',
      imageUrl: '',
      imageAlt: L(
        '상대방을 현재 모습 그대로 받아들이는 모습',
        'insonni qanday bo‘lsa shunday qabul qilish',
        'accepting someone as they are',
        'принятие человека таким, какой он есть',
      ),
    },
    tags: ['relationship', 'acceptance', 'respect'],
    difficulty: 4,
    usageNote: L(
      '`그대로 두다`, `그대로 받아들이다`, `그대로 존중하다`처럼 사용할 수 있어요.',
      '`그대로 두다`, `그대로 받아들이다` kabi ishlatiladi.',
      'Common expressions include 그대로 두다 and 그대로 받아들이다.',
      'Частые выражения: 그대로 두다 и 그대로 받아들이다.',
    ),
    isCore: true,
  },

  {
    code: 'emotion-anger-subside',
    korean: '화가 풀리다',
    senseKey: 'anger-subside',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '화났던 마음이 가라앉아서 더 이상 화가 나지 않다',
      'jahli bosilmoq',
      'for anger to subside; to calm down',
      'перестать сердиться; успокоиться',
    ),
    examples: [
      {
        korean: '진심으로 사과하자 상대방의 화가 조금씩 풀렸어요.',
        translations: L(
          '진심으로 미안하다고 하자 상대방이 더 이상 많이 화내지 않았어요.',
          'Chin dildan uzr so‘ragach, sherigimning jahli asta-sekin bosildi.',
          'The other person gradually calmed down after the sincere apology.',
          'После искреннего извинения другой человек постепенно успокоился.',
        ),
      },
    ],
    pronunciation: {
      hangul: '화가 풀리다',
      romanization: 'hwaga pullida',
      ttsText: '화가 풀리다',
    },
    media: {
      emoji: '😌',
      imageUrl: '',
      imageAlt: L(
        '화를 가라앉힌 사람',
        'jahli bosilgan inson',
        'a person calming down',
        'человек, который успокоился',
      ),
    },
    tags: ['relationship', 'emotion', 'anger'],
    difficulty: 5,
    usageNote: L(
      '`화를 풀다`는 화난 사람이 자신의 화를 가라앉히는 행동이고 `화가 풀리다`는 그 상태가 가라앉는 것을 말해요.',
      '`화를 풀다` faol harakat, `화가 풀리다` esa jahlning bosilgan holatini bildiradi.',
      '화를 풀다 focuses on actively relieving anger, while 화가 풀리다 describes the anger subsiding.',
      '화를 풀다 подчёркивает действие, а 화가 풀리다 — состояние, когда гнев проходит.',
    ),
    isCore: true,
  },

  {
    code: 'relationship-argument',
    korean: '다투다',
    senseKey: 'argue-with-someone',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '의견이 달라 서로 말다툼하거나 싸우다',
      'bahslashmoq; janjallashmoq',
      'to argue; to quarrel',
      'спорить; ссориться',
    ),
    examples: [
      {
        korean: '사소한 일로 자주 다투면 관계가 힘들어질 수 있어요.',
        translations: L(
          '작은 문제로 자주 싸우면 관계가 어려워질 수 있어요.',
          'Kichik narsalar sabab tez-tez janjallashish munosabatni qiyinlashtirishi mumkin.',
          'Frequent arguments over small things can make a relationship difficult.',
          'Частые ссоры из-за мелочей могут осложнить отношения.',
        ),
      },
    ],
    pronunciation: {
      hangul: '다투다',
      romanization: 'datuda',
      ttsText: '다투다',
    },
    media: {
      emoji: '💢',
      imageUrl: '',
      imageAlt: L(
        '의견이 달라 다투는 두 사람',
        'fikri turlicha bo‘lib janjallashayotgan ikki inson',
        'two people arguing',
        'двое спорящих людей',
      ),
    },
    tags: ['relationship', 'argument', 'conflict'],
    difficulty: 4,
    usageNote: L(
      '`사소한 일로 다투다`, `의견 차이로 다투다`처럼 사용할 수 있어요.',
      '`사소한 일로 다투다`, `의견 차이로 다투다` kabi ishlatiladi.',
      'Common expressions include 사소한 일로 다투다 and 의견 차이로 다투다.',
      'Частые выражения: 사소한 일로 다투다 и 의견 차이로 다투다.',
    ),
    isCore: false,
  },

  {
    code: 'emotion-feel-hurt',
    korean: '서운하다',
    senseKey: 'feel-hurt-or-disappointed',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '기대했던 것과 달라 마음이 섭섭하고 속상하다',
      'ko‘ngli qolmoq; ranjimoq',
      'to feel hurt or disappointed',
      'чувствовать обиду или разочарование',
    ),
    examples: [
      {
        korean: '약속을 잊어버렸다는 말을 듣고 조금 서운했어요.',
        translations: L(
          '상대방이 약속을 잊어서 마음이 조금 섭섭했어요.',
          'Uchrashuvni unutganini bilib biroz xafa bo‘ldim.',
          'I felt a little hurt when I heard that the promise had been forgotten.',
          'Мне было немного обидно, когда я узнал, что о договорённости забыли.',
        ),
      },
    ],
    pronunciation: {
      hangul: '서운하다',
      romanization: 'seounhada',
      ttsText: '서운하다',
    },
    media: {
      emoji: '😔',
      imageUrl: '',
      imageAlt: L(
        '서운한 표정의 사람',
        'xafa bo‘lgan inson',
        'a person feeling hurt',
        'обиженный человек',
      ),
    },
    tags: ['relationship', 'emotion', 'hurt'],
    difficulty: 5,
    usageNote: L(
      '단순히 화가 난 것보다 가까운 사람에게 기대한 것이 이루어지지 않아 섭섭한 느낌에 자주 써요.',
      'Ko‘pincha yaqin insondan kutilgan narsa bo‘lmaganda paydo bo‘ladigan ranjishni bildiradi.',
      'It often describes hurt caused when someone close does not meet an expectation.',
      'Часто описывает обиду, когда близкий человек не оправдал ожиданий.',
    ),
    isCore: false,
  },

  {
    code: 'relationship-misunderstand',
    korean: '오해하다',
    senseKey: 'misunderstand-other-person',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '사실이나 상대방의 뜻을 실제와 다르게 잘못 이해하다',
      'noto‘g‘ri tushunmoq',
      'to misunderstand',
      'неправильно понимать',
    ),
    examples: [
      {
        korean: '답장이 늦은 이유를 확인하지 않고 상대방을 오해했어요.',
        translations: L(
          '이유를 묻지 않고 상대방의 행동을 잘못 이해했어요.',
          'Sababini so‘ramay sherigimni noto‘g‘ri tushundim.',
          'I misunderstood the other person without checking why the reply was late.',
          'Я неправильно понял другого человека, не выяснив причину позднего ответа.',
        ),
      },
    ],
    pronunciation: {
      hangul: '오해하다',
      romanization: 'ohaehada',
      ttsText: '오해하다',
    },
    media: {
      emoji: '❓',
      imageUrl: '',
      imageAlt: L(
        '상대방의 뜻을 잘못 이해한 사람',
        'boshqa insonni noto‘g‘ri tushungan odam',
        'a person misunderstanding someone',
        'человек, неправильно понявший другого',
      ),
    },
    tags: ['relationship', 'misunderstanding', 'communication'],
    difficulty: 4,
    usageNote: L(
      '`사람을 오해하다`, `말을 오해하다`, `상황을 오해하다`처럼 사용할 수 있어요.',
      '`사람을 오해하다`, `상황을 오해하다` kabi ishlatiladi.',
      'It can be used with a person, statement, or situation.',
      'Можно неправильно понять человека, слова или ситуацию.',
    ),
    isCore: false,
  },

  {
    code: 'relationship-conflict',
    korean: '갈등',
    senseKey: 'interpersonal-conflict',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '서로 다른 생각이나 욕구가 부딪쳐 생기는 문제',
      'qarama-qarshi fikr yoki istaklar to‘qnashuvi',
      'conflict',
      'конфликт',
    ),
    examples: [
      {
        korean: '갈등이 생기면 피하지 말고 대화로 해결하는 게 좋아요.',
        translations: L(
          '문제가 생기면 피하지 말고 이야기하면서 해결하는 게 좋아요.',
          'Nizo bo‘lsa, undan qochmay gaplashib hal qilgan yaxshi.',
          'When conflict arises, it is better to address it through communication.',
          'При конфликте лучше не избегать его, а решать с помощью разговора.',
        ),
      },
    ],
    pronunciation: {
      hangul: '갈등',
      romanization: 'galdeung',
      ttsText: '갈등',
    },
    media: {
      emoji: '⚡',
      imageUrl: '',
      imageAlt: L(
        '갈등을 겪는 두 사람',
        'nizo qilayotgan ikki inson',
        'two people experiencing conflict',
        'двое людей в конфликте',
      ),
    },
    tags: ['relationship', 'conflict', 'problem'],
    difficulty: 5,
    usageNote: L(
      '`갈등이 생기다`, `갈등이 커지다`, `갈등을 해결하다`처럼 사용해요.',
      '`갈등이 생기다`, `갈등을 해결하다` kabi ishlatiladi.',
      'Common expressions include 갈등이 생기다 and 갈등을 해결하다.',
      'Частые выражения: 갈등이 생기다 и 갈등을 해결하다.',
    ),
    isCore: false,
  },

  {
    code: 'relationship-apologize',
    korean: '사과하다',
    senseKey: 'apologize-for-mistake',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '자신의 잘못을 인정하고 미안하다는 뜻을 전하다',
      'xatosini tan olib uzr so‘ramoq',
      'to apologize',
      'извиняться',
    ),
    examples: [
      {
        korean: '제가 잘못했다는 것을 알고 먼저 사과했어요.',
        translations: L(
          '제 잘못을 인정하고 먼저 미안하다고 말했어요.',
          'Xato qilganimni tan olib, birinchi bo‘lib uzr so‘radim.',
          'I admitted my mistake and apologized first.',
          'Я признал свою ошибку и первым извинился.',
        ),
      },
    ],
    pronunciation: {
      hangul: '사과하다',
      romanization: 'sagwahada',
      ttsText: '사과하다',
    },
    media: {
      emoji: '🙏',
      imageUrl: '',
      imageAlt: L(
        '미안하다고 사과하는 사람',
        'uzr so‘rayotgan inson',
        'a person apologizing',
        'человек, который извиняется',
      ),
    },
    tags: ['relationship', 'apology', 'conflict-resolution'],
    difficulty: 4,
    usageNote: L(
      '`잘못을 사과하다`, `상대방에게 사과하다`처럼 사용해요.',
      '`상대방에게 사과하다` kabi ishlatiladi.',
      'A common pattern is 상대방에게 사과하다.',
      'Частая конструкция: 상대방에게 사과하다.',
    ),
    isCore: false,
  },

  {
    code: 'relationship-forgive',
    korean: '용서하다',
    senseKey: 'forgive-person-or-mistake',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '다른 사람의 잘못을 받아들이고 더 이상 탓하지 않다',
      'kechirmoq',
      'to forgive',
      'прощать',
    ),
    examples: [
      {
        korean:
          '진심으로 사과했지만 상대방이 저를 용서하려면 시간이 필요했어요.',
        translations: L(
          '사과했지만 상대방이 제 잘못을 받아들이는 데 시간이 필요했어요.',
          'Chin dildan uzr so‘radim, lekin sherigimga meni kechirish uchun vaqt kerak bo‘ldi.',
          'I sincerely apologized, but the other person needed time to forgive me.',
          'Я искренне извинился, но другому человеку понадобилось время, чтобы простить меня.',
        ),
      },
    ],
    pronunciation: {
      hangul: '용서하다',
      romanization: 'yongseohada',
      ttsText: '용서하다',
    },
    media: {
      emoji: '🕊️',
      imageUrl: '',
      imageAlt: L(
        '상대방을 용서하는 모습',
        'boshqa insonni kechirish',
        'forgiving another person',
        'прощение другого человека',
      ),
    },
    tags: ['relationship', 'forgiveness', 'conflict-resolution'],
    difficulty: 5,
    usageNote: L(
      '`사람을 용서하다`, `잘못을 용서하다`처럼 사용할 수 있어요.',
      '`사람을 용서하다`, `잘못을 용서하다` kabi ishlatiladi.',
      'You can forgive a person or forgive a mistake.',
      'Можно простить человека или простить ошибку.',
    ),
    isCore: false,
  },

  {
    code: 'relationship-reconcile',
    korean: '화해하다',
    senseKey: 'reconcile-after-conflict',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '다투거나 사이가 나빠진 사람들이 다시 좋은 사이가 되다',
      'janjaldan keyin yarashmoq',
      'to reconcile; to make peace',
      'помириться',
    ),
    examples: [
      {
        korean: '서로 사과한 뒤 다시 화해했어요.',
        translations: L(
          '서로 미안하다고 말하고 다시 사이가 좋아졌어요.',
          'Bir-biridan uzr so‘rab yana yarashishdi.',
          'They apologized to each other and reconciled.',
          'Они извинились друг перед другом и помирились.',
        ),
      },
    ],
    pronunciation: {
      hangul: '화해하다',
      romanization: 'hwahaehada',
      ttsText: '화해하다',
    },
    media: {
      emoji: '🤝',
      imageUrl: '',
      imageAlt: L(
        '다툰 뒤 다시 화해한 두 사람',
        'janjaldan keyin yarashgan ikki inson',
        'two people reconciling after an argument',
        'двое людей, помирившихся после ссоры',
      ),
    },
    tags: ['relationship', 'reconciliation', 'conflict-resolution'],
    difficulty: 5,
    usageNote: L(
      '`다툰 뒤 화해하다`, `친구와 화해하다`처럼 사용해요.',
      '`다툰 뒤 화해하다` kabi ishlatiladi.',
      'A common expression is 다툰 뒤 화해하다.',
      'Частое выражение: 다툰 뒤 화해하다.',
    ),
    isCore: false,
  },

  {
    code: 'relationship-consider',
    korean: '배려하다',
    senseKey: 'consider-another-person',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '상대방의 상황이나 마음을 생각해서 행동하다',
      'boshqa insonning holati va hislarini hisobga olmoq',
      'to be considerate of',
      'проявлять внимание; учитывать чувства другого',
    ),
    examples: [
      {
        korean: '서로의 생활 시간을 배려하면 갈등을 줄일 수 있어요.',
        translations: L(
          '상대방의 생활 시간을 생각해 주면 갈등이 줄어들 수 있어요.',
          'Bir-birining vaqtini hisobga olinsa, nizo kamayishi mumkin.',
          'Being considerate of each other’s schedules can reduce conflict.',
          'Если учитывать режим друг друга, конфликтов может стать меньше.',
        ),
      },
    ],
    pronunciation: {
      hangul: '배려하다',
      romanization: 'baeryeohada',
      ttsText: '배려하다',
    },
    media: {
      emoji: '🤲',
      imageUrl: '',
      imageAlt: L(
        '상대방을 배려하는 사람',
        'boshqa insonga e’tiborli inson',
        'a considerate person',
        'внимательный к другому человек',
      ),
    },
    tags: ['relationship', 'consideration', 'respect'],
    difficulty: 5,
    usageNote: L(
      '`상대방을 배려하다`, `서로 배려하다`처럼 사용해요.',
      '`상대방을 배려하다`, `서로 배려하다` kabi ishlatiladi.',
      'Common expressions include 상대방을 배려하다 and 서로 배려하다.',
      'Частые выражения: 상대방을 배려하다 и 서로 배려하다.',
    ),
    isCore: false,
  },

  {
    code: 'relationship-respect',
    korean: '존중하다',
    senseKey: 'respect-person-or-view',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: L(
      '다른 사람의 생각, 감정, 선택이나 가치를 소중하게 인정하다',
      'boshqa insonning fikri, hislari va tanlovini hurmat qilmoq',
      'to respect',
      'уважать',
    ),
    examples: [
      {
        korean: '생각이 다르더라도 서로의 선택을 존중해야 해요.',
        translations: L(
          '의견이 달라도 상대방의 선택을 인정해야 해요.',
          'Fikrlar turlicha bo‘lsa ham, bir-birining tanlovini hurmat qilish kerak.',
          'Even when opinions differ, each other’s choices should be respected.',
          'Даже если мнения различаются, нужно уважать выбор друг друга.',
        ),
      },
    ],
    pronunciation: {
      hangul: '존중하다',
      romanization: 'jonjunghada',
      ttsText: '존중하다',
    },
    media: {
      emoji: '🌿',
      imageUrl: '',
      imageAlt: L(
        '서로의 생각을 존중하는 두 사람',
        'bir-birining fikrini hurmat qilayotgan ikki inson',
        'two people respecting each other',
        'двое людей, уважающих друг друга',
      ),
    },
    tags: ['relationship', 'respect', 'values'],
    difficulty: 5,
    usageNote: L(
      '`의견을 존중하다`, `선택을 존중하다`, `서로 존중하다`처럼 사용해요.',
      '`의견을 존중하다`, `서로 존중하다` kabi ishlatiladi.',
      'Common expressions include 의견을 존중하다 and 서로 존중하다.',
      'Частые выражения: 의견을 존중하다 и 서로 존중하다.',
    ),
    isCore: false,
  },

  {
    code: 'relationship-honest-talk',
    korean: '솔직하게 말하다',
    senseKey: 'speak-honestly',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '자신의 생각이나 감정을 숨기지 않고 직접 말하다',
      'fikr va hislarni yashirmay ochiq gapirmoq',
      'to speak honestly',
      'говорить честно и открыто',
    ),
    examples: [
      {
        korean: '서운한 일이 있다면 솔직하게 말하는 게 좋아요.',
        translations: L(
          '속상한 점이 있다면 숨기지 말고 직접 이야기하는 게 좋아요.',
          'Xafa bo‘lgan narsangiz bo‘lsa, ochiq gapirgan yaxshi.',
          'If something is bothering you, it is better to speak honestly about it.',
          'Если вас что-то задело, лучше честно об этом сказать.',
        ),
      },
    ],
    pronunciation: {
      hangul: '솔직하게 말하다',
      romanization: 'soljikhage malhada',
      ttsText: '솔직하게 말하다',
    },
    media: {
      emoji: '💬',
      imageUrl: '',
      imageAlt: L(
        '자신의 마음을 솔직하게 말하는 사람',
        'hislarini ochiq aytayotgan inson',
        'a person speaking honestly',
        'человек, честно говорящий о своих чувствах',
      ),
    },
    tags: ['relationship', 'communication', 'honesty'],
    difficulty: 4,
    usageNote: L(
      '갈등이 있을 때 자신의 감정을 숨기지 않고 전달한다는 문맥에서 자주 써요.',
      'Nizo paytida o‘z hislarini yashirmay aytish uchun ishlatiladi.',
      'It is useful when discussing honest emotional communication during conflict.',
      'Часто употребляется при разговоре об открытом общении во время конфликта.',
    ),
    isCore: false,
  },

  {
    code: 'relationship-express-emotion',
    korean: '감정을 표현하다',
    senseKey: 'express-feelings',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '자신이 느끼는 기분이나 마음을 말이나 행동으로 나타내다',
      'o‘z hislarini so‘z yoki harakat bilan ifodalamoq',
      'to express one’s feelings',
      'выражать чувства',
    ),
    examples: [
      {
        korean: '감정을 잘 표현하면 상대방도 내 마음을 이해하기 쉬워요.',
        translations: L(
          '마음을 잘 말하면 상대방이 나를 이해하기 쉬워요.',
          'Hislarni yaxshi ifodalasa, sherikning tushunishi osonroq bo‘ladi.',
          'Expressing feelings clearly makes it easier for the other person to understand you.',
          'Если хорошо выражать чувства, другому человеку легче вас понять.',
        ),
      },
    ],
    pronunciation: {
      hangul: '감정을 표현하다',
      romanization: 'gamjeongeul pyohyeonhada',
      ttsText: '감정을 표현하다',
    },
    media: {
      emoji: '🗨️',
      imageUrl: '',
      imageAlt: L(
        '자신의 감정을 표현하는 사람',
        'hislarini ifodalayotgan inson',
        'a person expressing feelings',
        'человек, выражающий свои чувства',
      ),
    },
    tags: ['relationship', 'emotion', 'communication'],
    difficulty: 5,
    usageNote: L(
      '`감정을 숨기다`와 반대되는 의미로 자주 사용할 수 있어요.',
      'Ko‘pincha `감정을 숨기다`ning qarama-qarshi ma’nosida ishlatiladi.',
      'It is often contrasted with 감정을 숨기다, “to hide one’s feelings.”',
      'Часто противопоставляется выражению 감정을 숨기다 — «скрывать чувства».',
    ),
    isCore: false,
  },

  {
    code: 'relationship-maintain',
    korean: '관계를 유지하다',
    senseKey: 'maintain-relationship',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '사람 사이의 관계가 계속 이어지게 하다',
      'munosabatni davom ettirmoq',
      'to maintain a relationship',
      'поддерживать отношения',
    ),
    examples: [
      {
        korean: '좋은 관계를 유지하려면 서로 존중해야 해요.',
        translations: L(
          '좋은 사이를 오래 이어 가려면 서로 존중해야 해요.',
          'Yaxshi munosabatni saqlash uchun bir-birini hurmat qilish kerak.',
          'Mutual respect is necessary to maintain a good relationship.',
          'Чтобы сохранять хорошие отношения, нужно уважать друг друга.',
        ),
      },
    ],
    pronunciation: {
      hangul: '관계를 유지하다',
      romanization: 'gwangyereul yujihada',
      ttsText: '관계를 유지하다',
    },
    media: {
      emoji: '🔗',
      imageUrl: '',
      imageAlt: L(
        '좋은 관계를 이어 가는 두 사람',
        'yaxshi munosabatni davom ettirayotgan ikki inson',
        'two people maintaining a relationship',
        'двое людей, сохраняющих отношения',
      ),
    },
    tags: ['relationship', 'maintenance', 'romance'],
    difficulty: 5,
    usageNote: L(
      '`좋은 관계를 유지하다`, `오랫동안 관계를 유지하다`처럼 사용해요.',
      '`좋은 관계를 유지하다` kabi ishlatiladi.',
      'Common expressions include 좋은 관계를 유지하다 and 오랫동안 관계를 유지하다.',
      'Частые выражения: 좋은 관계를 유지하다 и 오랫동안 관계를 유지하다.',
    ),
    isCore: false,
  },

  {
    code: 'emotion-feeling',
    korean: '감정',
    senseKey: 'human-emotion',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '기쁨, 슬픔, 화, 서운함처럼 마음에서 느끼는 상태',
      'his-tuyg‘u',
      'emotion; feeling',
      'эмоция; чувство',
    ),
    examples: [
      {
        korean: '감정을 숨기기만 하면 상대방이 내 마음을 알기 어려워요.',
        translations: L(
          '느끼는 마음을 계속 숨기면 상대방이 이해하기 어려워요.',
          'Hislarni yashirsangiz, sherigingiz sizni tushunishi qiyin bo‘ladi.',
          'If you keep hiding your emotions, it is hard for your partner to understand you.',
          'Если постоянно скрывать эмоции, партнёру трудно вас понять.',
        ),
      },
    ],
    pronunciation: {
      hangul: '감정',
      romanization: 'gamjeong',
      ttsText: '감정',
    },
    media: {
      emoji: '🎭',
      imageUrl: '',
      imageAlt: L(
        '여러 감정을 나타내는 표정',
        'turli hislarni ko‘rsatuvchi yuz ifodalari',
        'faces expressing different emotions',
        'лица, выражающие разные эмоции',
      ),
    },
    tags: ['relationship', 'emotion', 'feeling'],
    difficulty: 4,
    usageNote: L(
      '`감정을 표현하다`, `감정을 숨기다`, `감정을 조절하다`처럼 많이 사용해요.',
      '`감정을 표현하다`, `감정을 숨기다` kabi ko‘p ishlatiladi.',
      'Common expressions include 감정을 표현하다 and 감정을 숨기다.',
      'Частые выражения: 감정을 표현하다 и 감정을 숨기다.',
    ),
    isCore: false,
  },
] satisfies readonly WordSeedEntry[];

const S6_UNIT1_NODE5_QUESTIONS = {
  // ────────────────────────────────────────────────────────────
  // Node 5 · 사랑은 영원할까?
  // Lesson 1 · 영원한 사랑
  // q401 ~ q420
  // ────────────────────────────────────────────────────────────

  s6u1_401_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '사랑이 언제나 영원할 것이라고 생각하지는 않는다는 문장을 만드세요.',
      'Sevgi har doim abadiy bo‘ladi deb o‘ylamasligingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “I do not think love is always eternal.”',
      'Составьте предложение: «Я не думаю, что любовь всегда вечна».',
    ),
    options: [
      '생각하지는',
      '사랑이',
      '않아요',
      '언제나',
      '영원할',
      '저는',
      '거라고',
      '반드시',
      '끝난다고',
    ],
    answer: '저는 사랑이 언제나 영원할 거라고 생각하지는 않아요',
    answerTranslation: L(
      '저는 사랑이 언제나 영원할 거라고 생각하지는 않아요.',
      'Men sevgi har doim abadiy bo‘ladi deb o‘ylamayman.',
      'I do not think love is always eternal.',
      'Я не думаю, что любовь всегда вечна.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love', 'eternal', 'translate-builder'],
  },

  s6u1_402_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '끝이 없이 계속되는 것은 ___하다고 하고, 한 사람의 살아 있는 전체 기간은 ___이라고 해요.',
    blankAnswers: ['영원', '일생'],
    answerTranslation: L(
      '끝없이 계속되는 것은 영원하다고 하고 한 사람의 전체 삶은 일생이라고 해요.',
      'Cheksiz davom etadigan narsa 영원, insonning butun hayoti esa 일생 bilan ifodalanadi.',
      'Something without an end is described with 영원, while a person’s entire life is 일생.',
      'Бесконечно продолжающееся выражается через 영원, а вся жизнь человека — 일생.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The learner must enter 영원 and 일생 in the correct blanks.',
      acceptedAnswers: [],
      notes: ['Require 영원 and 일생 in this order.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['eternal', 'lifetime', 'type-answer'],
  },

  s6u1_403_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '처음 사랑에 빠졌을 때는 이 사랑이 ___할 것 같고 평생 ___할 수 있을 것 같아요.',
    blankAnswers: ['영원', '함께'],
    options: ['영원', '함께', '유효기간', '단계', '처음'],
    answer: '영원|함께',
    answerTranslation: L(
      '처음 사랑에 빠지면 사랑이 영원하고 평생 함께할 수 있을 것처럼 느낄 수 있어요.',
      'Dastlab sevib qolganda sevgi abadiy va bir umr birga bo‘ladigandek tuyulishi mumkin.',
      'At first, love can feel eternal and as if the couple can stay together for life.',
      'В начале может казаться, что любовь вечна и люди будут вместе всю жизнь.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['eternal', 'together', 'multi-blank'],
  },

  s6u1_404_listening: {
    type: 'listening',
    instruction: L(
      '화자의 사랑에 대한 생각과 가장 가까운 것을 고르세요.',
      'So‘zlovchining sevgi haqidagi fikriga eng yaqin javobni tanlang.',
      'Choose the statement closest to the speaker’s view of love.',
      'Выберите утверждение, наиболее близкое к мнению говорящего о любви.',
    ),
    audioText:
      '처음에는 사랑하는 마음만 있으면 평생 행복할 수 있다고 생각했어요. 그런데 오래 만나 보니까 사랑도 노력하지 않으면 변할 수 있다는 걸 알게 됐어요.',
    options: [
      '사랑도 노력하지 않으면 변할 수 있다',
      '사랑은 아무 노력 없이 항상 영원하다',
      '오래 만나면 반드시 헤어져야 한다',
      '처음의 감정만 있으면 모든 문제가 해결된다',
    ],
    answer: '사랑도 노력하지 않으면 변할 수 있다',
    answerTranslation: L(
      '화자는 사랑도 노력하지 않으면 변할 수 있다고 생각해요.',
      'So‘zlovchi sevgi ham harakatsiz o‘zgarishi mumkin deb o‘ylaydi.',
      'The speaker thinks love can change without continued effort.',
      'Говорящий считает, что любовь может измениться без усилий.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['love', 'change', 'listening'],
  },

  s6u1_405_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '처음의 설렘이 사라져도 사랑이 끝났다고 단정할 수는 없다는 문장을 만드세요.',
      'Dastlabki hayajon yo‘qolsa ham, sevgi tugadi deb qat’iy aytib bo‘lmasligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Even if the initial excitement disappears, it does not necessarily mean love has ended.”',
      'Составьте предложение: «Даже если первоначальное волнение исчезло, нельзя утверждать, что любовь закончилась».',
    ),
    options: [
      '단정할',
      '없어요',
      '처음의',
      '사라져도',
      '사랑이',
      '설렘이',
      '끝났다고',
      '수는',
      '영원하다고',
    ],
    answer: '처음의 설렘이 사라져도 사랑이 끝났다고 단정할 수는 없어요',
    answerTranslation: L(
      '처음의 설렘이 없어져도 사랑이 끝났다고 볼 수는 없어요.',
      'Dastlabki hayajon yo‘qolsa ham, sevgi tugadi deb bo‘lmaydi.',
      'Losing the initial excitement does not necessarily mean love is over.',
      'Исчезновение первоначального волнения не обязательно означает конец любви.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love', 'change', 'translate-builder'],
  },

  s6u1_406_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '영원하려면',
      '노력이',
      '사랑이',
      '필요하다고',
      '생각해요',
      '서로의',
      '끝나야',
    ],
    answer: '사랑이 영원하려면 서로의 노력이 필요하다고 생각해요',
    audioText: '사랑이 영원하려면 서로의 노력이 필요하다고 생각해요.',
    answerTranslation: L(
      '사랑이 오래 계속되려면 두 사람의 노력이 필요하다고 생각해요.',
      'Sevgi uzoq davom etishi uchun ikki tomonning ham harakati kerak deb o‘ylayman.',
      'I think both people need to make an effort for love to last.',
      'Я думаю, что для долгой любви нужны усилия обоих.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['eternal', 'effort', 'word-arrange'],
  },

  s6u1_407_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`끝없이 계속되다`라는 뜻의 형용사는 ___이고, `한 사람의 전체 삶`을 뜻하는 명사는 ___이에요.',
    blankAnswers: ['영원하다', '일생'],
    answerTranslation: L(
      '끝없이 계속되는 것은 영원하다고 하고 한 사람의 전체 삶은 일생이에요.',
      'Cheksiz davom etish 영원하다, butun hayot esa 일생.',
      'The adjective for lasting forever is 영원하다, and an entire lifetime is 일생.',
      '«Длиться вечно» — 영원하다, а вся жизнь — 일생.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target words are 영원하다 and 일생 in that order.',
      acceptedAnswers: [],
      notes: ['Require 영원하다 and 일생.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['eternal', 'lifetime', 'type-answer'],
  },

  s6u1_408_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글쓴이가 사랑을 영원하게 만드는 데 필요하다고 보는 것을 고르세요.',
      'Muallif sevgini uzoq davom ettirish uchun nima kerak deb hisoblashini tanlang.',
      'Choose what the writer believes is necessary for love to last.',
      'Выберите, что автор считает необходимым для долгой любви.',
    ),
    passage:
      '사람들은 사랑을 시작할 때 지금의 감정이 영원하기를 바랍니다. 하지만 시간이 흐르면 처음의 강한 감정이 조금 달라질 수도 있습니다. 그때 사랑이 끝났다고 생각하기보다 상대방을 이해하고 관계를 위해 계속 노력하는 것이 중요합니다.',
    options: [
      '상대방을 이해하고 관계를 위해 계속 노력하는 것',
      '처음의 감정을 억지로 똑같이 유지하는 것',
      '감정이 달라지면 바로 헤어지는 것',
      '문제가 생겨도 대화하지 않는 것',
    ],
    answer: '상대방을 이해하고 관계를 위해 계속 노력하는 것',
    answerTranslation: L(
      '상대방을 이해하고 계속 노력해야 사랑을 오래 유지할 수 있다고 해요.',
      'Sevgini uzoq saqlash uchun sherikni tushunib, doim harakat qilish kerak.',
      'The writer says understanding one’s partner and continuing to make an effort helps love last.',
      'Автор считает, что понимание партнёра и постоянные усилия помогают сохранить любовь.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['eternal', 'relationship', 'reading'],
  },

  s6u1_409_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText: '두 사람은 평생 함께하고 싶어서 사랑이 잠깐이라고 믿어요.',
    wrongWord: '잠깐이라고',
    options: ['영원하다고', '잠깐이라고', '끝났다고', '식었다고'],
    answer: '영원하다고',
    answerTranslation: L(
      '두 사람은 평생 함께하고 싶어서 사랑이 영원하다고 믿어요.',
      'Ular bir umr birga bo‘lishni istagani uchun sevgi abadiy deb ishonadi.',
      'They want to stay together for life and believe their love is eternal.',
      'Они хотят быть вместе всю жизнь и верят, что их любовь вечна.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['eternal', 'error-hunt'],
  },

  s6u1_410_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '영원한 사랑을 원한다면 처음의 감정만 믿어서는 안 된다는 문장을 만드세요.',
      'Abadiy sevgini istasangiz, faqat dastlabki hislarga ishonib qolmaslik kerakligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “If you want everlasting love, you should not rely only on the feelings you had at first.”',
      'Составьте предложение: «Если хотите вечной любви, нельзя полагаться только на первоначальные чувства».',
    ),
    options: [
      '감정만',
      '안',
      '처음의',
      '사랑을',
      '원한다면',
      '믿어서는',
      '영원한',
      '돼요',
      '유효기간만',
    ],
    answer: '영원한 사랑을 원한다면 처음의 감정만 믿어서는 안 돼요',
    answerTranslation: L(
      '오래가는 사랑을 위해서는 처음의 감정에만 의지하면 안 돼요.',
      'Uzoq sevgi uchun faqat dastlabki hislarga tayanmaslik kerak.',
      'Long-lasting love requires more than relying on initial feelings.',
      'Для долгой любви недостаточно полагаться только на первоначальные чувства.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['eternal', 'initial-feeling', 'translate-builder'],
  },

  s6u1_411_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 두 표현을 입력하세요.',
      'Eshitgan gapingizdagi tushib qolgan ikki ifodani yozing.',
      'Type the two missing expressions.',
      'Введите два пропущенных выражения.',
    ),
    audioText: '사랑이 영원하려면 상대방을 이해하고 계속 노력해야 해요.',
    sentenceTemplate: '사랑이 ___하려면 상대방을 이해하고 계속 ___해야 해요.',
    blankAnswers: ['영원', '노력'],
    answerTranslation: L(
      '사랑이 영원하려면 상대방을 이해하고 계속 노력해야 해요.',
      'Sevgi abadiy bo‘lishi uchun sherikni tushunib, doim harakat qilish kerak.',
      'For love to last, you need to understand your partner and keep making an effort.',
      'Чтобы любовь длилась долго, нужно понимать партнёра и продолжать стараться.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The dictated missing forms are 영원 and 노력 in that order.',
      acceptedAnswers: [],
      notes: ['Require 영원 and 노력.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['eternal', 'effort', 'listen-fill'],
  },

  s6u1_412_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '많은 사람은 사랑이 ___하기를 바랍니다. 하지만 ___이 지나면서 감정은 달라질 수 있고, 좋은 관계를 위해서는 두 사람이 계속 ___해야 합니다.',
    blankAnswers: ['영원', '시간', '노력'],
    options: ['영원', '시간', '노력', '유효기간', '청혼'],
    answer: '영원|시간|노력',
    answerTranslation: L(
      '사랑이 영원하기를 바라지만 시간이 지나면 두 사람의 노력이 필요해요.',
      'Sevgi abadiy bo‘lishini istaymiz, ammo vaqt o‘tishi bilan ikki tomonning ham harakati kerak.',
      'People hope love lasts forever, but time makes continued effort necessary.',
      'Люди хотят вечной любви, но со временем необходимы усилия обоих.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['eternal', 'time', 'effort', 'cloze'],
  },

  s6u1_413_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`사랑이 ___하다`는 끝없이 계속된다는 뜻이고, `___을 함께하다`는 평생을 같이 산다는 문맥에서 쓸 수 있어요.',
    blankAnswers: ['영원', '일생'],
    answerTranslation: L(
      '사랑이 영원하다와 일생을 함께하다를 익혀요.',
      '사랑이 영원하다 va 일생을 함께하다 ifodalarini o‘rganamiz.',
      'Practice the expressions 사랑이 영원하다 and 일생을 함께하다.',
      'Практикуем выражения 사랑이 영원하다 и 일생을 함께하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The learner must supply 영원 and 일생 in that order.',
      acceptedAnswers: [],
      notes: ['Require 영원 and 일생.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['eternal', 'lifetime', 'type-answer'],
  },

  s6u1_414_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '저는 사랑이 영원하려면 서로 이해하고 관계를 위해 계속 노력해야 한다고 생각해요.',
    audioText:
      '저는 사랑이 영원하려면 서로 이해하고 관계를 위해 계속 노력해야 한다고 생각해요.',
    answerTranslation: L(
      '저는 사랑을 오래 유지하려면 서로 이해하고 노력해야 한다고 생각해요.',
      'Men sevgi uzoq davom etishi uchun bir-birini tushunib, harakat qilish kerak deb o‘ylayman.',
      'I think lasting love requires mutual understanding and continued effort.',
      'Я считаю, что для долгой любви нужны взаимопонимание и постоянные усилия.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['eternal', 'speaking'],
  },

  s6u1_415_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '사랑이 변할 수 있다는 사실이 사랑의 가치가 없다는 뜻은 아니라는 문장을 만드세요.',
      'Sevgi o‘zgarishi mumkinligi uning qadrsizligini anglatmasligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “The fact that love can change does not mean it has no value.”',
      'Составьте предложение: «То, что любовь может измениться, не означает, что она не имеет ценности».',
    ),
    options: [
      '뜻은',
      '사랑이',
      '없다는',
      '사실이',
      '가치가',
      '아니에요',
      '변할',
      '수 있다는',
      '영원하다는',
    ],
    answer: '사랑이 변할 수 있다는 사실이 가치가 없다는 뜻은 아니에요',
    answerTranslation: L(
      '사랑이 변할 수 있어도 그 사랑이 의미 없다는 뜻은 아니에요.',
      'Sevgi o‘zgarishi mumkin bo‘lsa ham, bu uning qadrsizligini anglatmaydi.',
      'Love being able to change does not make it meaningless.',
      'То, что любовь может меняться, не делает её бессмысленной.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love', 'change', 'translate-builder'],
  },

  s6u1_416_listening: {
    type: 'listening',
    instruction: L(
      '남자가 예전과 다르게 생각하게 된 내용을 고르세요.',
      'Erkakning avvalgidan boshqacha o‘ylay boshlagan fikrini tanlang.',
      'Choose what the man now thinks differently about.',
      'Выберите, в чём мнение мужчины изменилось.',
    ),
    audioText:
      '예전에는 사랑하면 감정이 평생 똑같아야 한다고 생각했어요. 지금은 감정의 모양이 달라져도 서로를 아끼는 마음이 계속될 수 있다고 생각해요.',
    options: [
      '사랑의 감정은 형태가 달라져도 계속될 수 있다',
      '사랑의 감정은 평생 반드시 똑같아야 한다',
      '감정이 변하면 사랑은 바로 끝난다',
      '오래 만나는 것은 의미가 없다',
    ],
    answer: '사랑의 감정은 형태가 달라져도 계속될 수 있다',
    answerTranslation: L(
      '남자는 사랑의 모습이 변해도 관계는 계속될 수 있다고 생각해요.',
      'U sevgi shakli o‘zgarsa ham munosabat davom etishi mumkin deb o‘ylaydi.',
      'He believes love can continue even if the form of the feeling changes.',
      'Он считает, что любовь может продолжаться, даже если форма чувств меняется.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['love', 'change', 'listening'],
  },

  s6u1_417_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '끝이 없이 계속되는 사랑은 ___한 사랑이고, 태어나서 죽을 때까지의 삶 전체는 ___이에요.',
    blankAnswers: ['영원', '일생'],
    options: ['영원', '일생', '단계', '유효기간', '처음'],
    answer: '영원|일생',
    answerTranslation: L(
      '영원한 사랑과 한 사람의 일생을 구별해서 익혀요.',
      '영원 va 일생 so‘zlarini farqlab o‘rganamiz.',
      'Practice distinguishing 영원 and 일생.',
      'Учимся различать 영원 и 일생.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['eternal', 'lifetime', 'multi-blank'],
  },

  s6u1_418_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: ['사랑을', '평생', '함께', '지키고', '싶어요', '그대로', '끝내고'],
    answer: '평생 함께 사랑을 지키고 싶어요',
    audioText: '평생 함께 사랑을 지키고 싶어요.',
    answerTranslation: L(
      '평생 함께하면서 사랑을 지키고 싶어요.',
      'Bir umr birga bo‘lib sevgini asramoqchiman.',
      'I want us to stay together for life and protect our love.',
      'Я хочу быть вместе всю жизнь и беречь нашу любовь.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lifetime', 'love', 'word-arrange'],
  },

  s6u1_419_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`사랑은 ___하다`와 `___을 함께하다`에 들어갈 핵심 어휘를 순서대로 입력하세요.',
    blankAnswers: ['영원', '일생'],
    answerTranslation: L(
      '사랑은 영원하다, 일생을 함께하다를 연습해요.',
      '사랑은 영원하다 va 일생을 함께하다 birikmalarini mashq qilamiz.',
      'Practice 사랑은 영원하다 and 일생을 함께하다.',
      'Практикуем 사랑은 영원하다 и 일생을 함께하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The answers must be 영원 and 일생 in the correct order.',
      acceptedAnswers: [],
      notes: ['Require 영원 and 일생.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['eternal', 'lifetime', 'type-answer'],
  },

  s6u1_420_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글의 제목으로 가장 알맞은 것을 고르세요.',
      'Matn uchun eng mos sarlavhani tanlang.',
      'Choose the most appropriate title for the passage.',
      'Выберите наиболее подходящий заголовок текста.',
    ),
    passage:
      '처음의 강한 감정이 평생 똑같이 계속되기는 어렵습니다. 그렇다고 사랑이 반드시 사라지는 것은 아닙니다. 시간이 지나면서 사랑은 편안함과 믿음의 모습으로 달라질 수도 있습니다. 중요한 것은 변화 자체보다 두 사람이 그 변화를 어떻게 받아들이는가입니다.',
    options: [
      '사랑의 모습은 시간이 지나며 달라질 수 있다',
      '처음의 감정만이 진짜 사랑이다',
      '사랑은 절대로 변해서는 안 된다',
      '오래 만나는 연인은 모두 헤어진다',
    ],
    answer: '사랑의 모습은 시간이 지나며 달라질 수 있다',
    answerTranslation: L(
      '시간이 지나면서 사랑의 모습이 달라질 수 있다는 글이에요.',
      'Matn vaqt o‘tishi bilan sevgi shakli o‘zgarishi mumkinligi haqida.',
      'The passage is about how the form of love can change over time.',
      'Текст о том, как форма любви может меняться со временем.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love', 'change', 'reading'],
  },

  // ────────────────────────────────────────────────────────────
  // Lesson 2 · 사랑의 유효기간과 단계
  // q421 ~ q440
  // ────────────────────────────────────────────────────────────

  s6u1_421_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '사랑에도 유효기간이 있다는 생각에 동의하지 않는다는 문장을 만드세요.',
      'Sevgining ham amal qilish muddati bor degan fikrga qo‘shilmasligingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “I do not agree with the idea that love has an expiration date.”',
      'Составьте предложение: «Я не согласен с мнением, что у любви есть срок годности».',
    ),
    options: [
      '생각에는',
      '동의하지',
      '유효기간이',
      '않아요',
      '사랑에도',
      '있다는',
      '저는',
      '단계만',
      '영원히',
    ],
    answer: '저는 사랑에도 유효기간이 있다는 생각에는 동의하지 않아요',
    answerTranslation: L(
      '저는 사랑에도 정해진 유효기간이 있다는 생각에 동의하지 않아요.',
      'Men sevgining belgilangan amal qilish muddati bor degan fikrga qo‘shilmayman.',
      'I do not agree that love has a fixed expiration date.',
      'Я не согласен с тем, что у любви есть установленный срок годности.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['expiration-period', 'love', 'translate-builder'],
  },

  s6u1_422_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '정해진 기간 동안 효과나 가치가 유지되는 기간을 ___이라고 하고, 어떤 과정이 나뉘는 각각의 부분을 ___라고 해요.',
    blankAnswers: ['유효기간', '단계'],
    answerTranslation: L(
      '효력이 유지되는 기간은 유효기간이고 과정의 각 부분은 단계예요.',
      'Amal qilish muddati 유효기간, jarayonning har bir qismi esa 단계.',
      'A validity period is 유효기간, and each part of a process is a 단계.',
      'Срок действия — 유효기간, а отдельная часть процесса — 단계.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target words are 유효기간 and 단계 in that order.',
      acceptedAnswers: [],
      notes: ['Require 유효기간 and 단계.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['expiration-period', 'stage', 'type-answer'],
  },

  s6u1_423_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '사랑에도 정해진 ___이 있다고 보는 사람도 있고 사랑은 여러 ___를 거치며 변한다고 보는 사람도 있어요.',
    blankAnswers: ['유효기간', '단계'],
    options: ['유효기간', '단계', '일생', '처음', '청혼'],
    answer: '유효기간|단계',
    answerTranslation: L(
      '사랑에 유효기간이 있다고 보는 관점과 여러 단계를 거친다고 보는 관점이 있어요.',
      'Sevgining muddati bor degan va sevgi turli bosqichlardan o‘tadi degan qarashlar bor.',
      'Some view love as having an expiration period, while others see it as passing through stages.',
      'Одни считают, что у любви есть срок, другие — что она проходит разные этапы.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['expiration-period', 'stage', 'multi-blank'],
  },

  s6u1_424_listening: {
    type: 'listening',
    instruction: L(
      '화자가 사랑의 변화에 대해 어떻게 생각하는지 고르세요.',
      'So‘zlovchining sevgi o‘zgarishi haqidagi fikrini tanlang.',
      'Choose the speaker’s view of changes in love.',
      'Выберите мнение говорящего об изменениях любви.',
    ),
    audioText:
      '저는 사랑에 정해진 유효기간이 있다고 생각하지 않아요. 다만 관계가 깊어지면서 사랑의 모습이 여러 단계로 달라질 수는 있다고 생각해요.',
    options: [
      '사랑에는 정해진 끝보다 여러 단계의 변화가 있을 수 있다',
      '모든 사랑은 같은 기간 뒤에 끝난다',
      '사랑에는 어떤 변화도 없어야 한다',
      '첫 번째 단계가 끝나면 반드시 헤어진다',
    ],
    answer: '사랑에는 정해진 끝보다 여러 단계의 변화가 있을 수 있다',
    answerTranslation: L(
      '화자는 사랑이 여러 단계를 거치며 달라질 수 있다고 생각해요.',
      'So‘zlovchi sevgi turli bosqichlarda o‘zgarishi mumkin deb o‘ylaydi.',
      'The speaker believes love can change as it passes through different stages.',
      'Говорящий считает, что любовь может меняться, проходя разные этапы.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['stage', 'expiration-period', 'listening'],
  },

  s6u1_425_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '사랑의 한 단계가 끝났다고 관계 전체가 끝난 것은 아니라는 문장을 만드세요.',
      'Sevgining bir bosqichi tugashi butun munosabat tugadi degani emasligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “The end of one stage of love does not mean the whole relationship is over.”',
      'Составьте предложение: «Окончание одного этапа любви не означает конец всех отношений».',
    ),
    options: [
      '관계가',
      '끝난',
      '한',
      '단계가',
      '전체',
      '것은',
      '끝났다고',
      '아니에요',
      '사랑의',
      '영원한',
    ],
    answer: '사랑의 한 단계가 끝났다고 전체 관계가 끝난 것은 아니에요',
    answerTranslation: L(
      '사랑의 한 단계가 끝나도 관계 전체가 끝난 것은 아니에요.',
      'Sevgining bir bosqichi tugasa ham, butun munosabat tugamaydi.',
      'One stage ending does not mean the entire relationship is over.',
      'Конец одного этапа не означает конец всех отношений.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['stage', 'relationship', 'translate-builder'],
  },

  s6u1_426_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '여러',
      '사랑은',
      '거치며',
      '단계를',
      '변할',
      '수 있어요',
      '끝나야',
      '한',
    ],
    answer: '사랑은 여러 단계를 거치며 변할 수 있어요',
    audioText: '사랑은 여러 단계를 거치며 변할 수 있어요.',
    answerTranslation: L(
      '사랑은 여러 단계를 지나면서 모습이 달라질 수 있어요.',
      'Sevgi turli bosqichlardan o‘tib o‘zgarishi mumkin.',
      'Love can change as it passes through different stages.',
      'Любовь может меняться, проходя разные этапы.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['stage', 'love', 'word-arrange'],
  },

  s6u1_427_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`사랑의 ___`은 사랑이 얼마나 지속되는지 비유적으로 말할 때 쓰고, `사랑의 ___`는 관계의 변화 과정을 나눌 때 쓸 수 있어요.',
    blankAnswers: ['유효기간', '단계'],
    answerTranslation: L(
      '사랑의 유효기간과 사랑의 단계를 구별해요.',
      '사랑의 유효기간 va 사랑의 단계 ifodalarini farqlaymiz.',
      'Distinguish 사랑의 유효기간 from 사랑의 단계.',
      'Различаем 사랑의 유효기간 и 사랑의 단계.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The learner must enter 유효기간 then 단계.',
      acceptedAnswers: [],
      notes: ['Require 유효기간 and 단계.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['expiration-period', 'stage', 'type-answer'],
  },

  s6u1_428_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글쓴이가 `사랑의 유효기간`이라는 표현을 조심해서 봐야 한다고 생각하는 이유를 고르세요.',
      'Muallif nima uchun `사랑의 유효기간` iborasiga ehtiyotkor qarash kerak deb hisoblashini tanlang.',
      'Choose why the writer thinks the expression 사랑의 유효기간 should be interpreted carefully.',
      'Выберите, почему автор считает, что выражение 사랑의 유효기간 нужно понимать осторожно.',
    ),
    passage:
      '사랑의 감정이 처음과 달라지는 것을 보고 사랑의 유효기간이 끝났다고 말하는 사람도 있습니다. 그러나 처음의 강한 설렘이 줄었다고 해서 상대방을 아끼는 마음까지 반드시 사라지는 것은 아닙니다. 사랑의 모습이 다른 단계로 바뀐 것일 수도 있습니다.',
    options: [
      '설렘이 줄어도 사랑의 다른 형태가 계속될 수 있기 때문에',
      '모든 사랑은 정확히 같은 기간 동안만 지속되기 때문에',
      '첫 단계 이후에는 감정이 전혀 남지 않기 때문에',
      '유효기간은 오직 결혼 후에만 시작되기 때문에',
    ],
    answer: '설렘이 줄어도 사랑의 다른 형태가 계속될 수 있기 때문에',
    answerTranslation: L(
      '처음의 설렘이 줄어도 사랑이 다른 모습으로 계속될 수 있기 때문이에요.',
      'Dastlabki hayajon kamaygan bo‘lsa ham, sevgi boshqa shaklda davom etishi mumkin.',
      'Initial excitement can fade while love continues in another form.',
      'Первоначальное волнение может уменьшиться, а любовь продолжиться в другой форме.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['expiration-period', 'stage', 'reading'],
  },

  s6u1_429_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText: '사랑은 여러 유효기간을 거치면서 관계가 깊어질 수 있어요.',
    wrongWord: '유효기간을',
    options: ['단계를', '유효기간을', '일생을', '처음을'],
    answer: '단계를',
    answerTranslation: L(
      '사랑은 여러 단계를 거치면서 관계가 깊어질 수 있어요.',
      'Sevgi turli bosqichlardan o‘tib, munosabat chuqurlashishi mumkin.',
      'A relationship can deepen as love passes through different stages.',
      'Отношения могут становиться глубже, пока любовь проходит разные этапы.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['stage', 'error-hunt'],
  },

  s6u1_430_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '처음의 설렘이 줄어드는 것을 사랑의 유효기간이 끝났다고만 볼 수는 없다는 문장을 만드세요.',
      'Dastlabki hayajon kamayishini faqat sevgining muddati tugadi deb ko‘rib bo‘lmasligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “A decrease in initial excitement cannot simply be viewed as the expiration of love.”',
      'Составьте предложение: «Уменьшение первоначального волнения нельзя просто считать окончанием срока любви».',
    ),
    options: [
      '볼',
      '설렘이',
      '유효기간이',
      '사랑의',
      '처음의',
      '끝났다고만',
      '줄어드는',
      '수는',
      '없어요',
      '영원하다고만',
    ],
    answer:
      '처음의 설렘이 줄어드는 것을 사랑의 유효기간이 끝났다고만 볼 수는 없어요',
    answerTranslation: L(
      '처음의 설렘이 줄었다고 사랑이 끝났다고만 생각할 수는 없어요.',
      'Dastlabki hayajon kamaygani sevgi tugadi degani emas.',
      'Reduced initial excitement does not necessarily mean love has expired.',
      'Уменьшение первоначального волнения не обязательно означает конец любви.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['expiration-period', 'initial-feeling', 'translate-builder'],
  },

  s6u1_431_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 두 단어를 입력하세요.',
      'Eshitgan gapingizdagi tushib qolgan ikki so‘zni yozing.',
      'Type the two missing words.',
      'Введите два пропущенных слова.',
    ),
    audioText: '사랑에는 유효기간보다 여러 단계가 있다고 생각해요.',
    sentenceTemplate: '사랑에는 ___보다 여러 ___가 있다고 생각해요.',
    blankAnswers: ['유효기간', '단계'],
    answerTranslation: L(
      '사랑에는 유효기간보다 여러 단계가 있다고 생각해요.',
      'Men sevgining muddatidan ko‘ra turli bosqichlari bor deb o‘ylayman.',
      'I think love has different stages rather than a fixed expiration date.',
      'Я думаю, у любви скорее есть разные этапы, чем фиксированный срок.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated answers are 유효기간 and 단계.',
      acceptedAnswers: [],
      notes: ['Require 유효기간 then 단계.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['expiration-period', 'stage', 'listen-fill'],
  },

  s6u1_432_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '사랑의 ___이 정해져 있다고 생각하는 사람도 있습니다. 하지만 관계가 깊어지면서 사랑은 새로운 ___로 들어갈 수 있고, 처음과 다른 모습으로 계속 ___ 수도 있습니다.',
    blankAnswers: ['유효기간', '단계', '이어질'],
    options: ['유효기간', '단계', '이어질', '식당', '청혼'],
    answer: '유효기간|단계|이어질',
    answerTranslation: L(
      '사랑은 정해진 유효기간보다 여러 단계를 지나며 이어질 수도 있어요.',
      'Sevgi belgilangan muddatdan ko‘ra turli bosqichlarda davom etishi mumkin.',
      'Love may continue through different stages rather than having a fixed expiration date.',
      'Любовь может продолжаться через разные этапы, а не иметь фиксированный срок.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['expiration-period', 'stage', 'cloze'],
  },

  s6u1_433_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '상품이나 효과가 유지되는 기간은 ___이고, 어떤 변화 과정의 한 부분은 ___예요.',
    blankAnswers: ['유효기간', '단계'],
    answerTranslation: L(
      '유효기간과 단계의 의미를 구별해요.',
      '유효기간 va 단계 ma’nolarini farqlaymiz.',
      'Distinguish the meanings of 유효기간 and 단계.',
      'Различаем значения 유효기간 и 단계.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The learner must enter 유효기간 then 단계.',
      acceptedAnswers: [],
      notes: ['Require exact answers in order.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['expiration-period', 'stage', 'type-answer'],
  },

  s6u1_434_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '저는 사랑에 정해진 유효기간이 있다기보다 시간이 지나면서 여러 단계로 변한다고 생각해요.',
    audioText:
      '저는 사랑에 정해진 유효기간이 있다기보다 시간이 지나면서 여러 단계로 변한다고 생각해요.',
    answerTranslation: L(
      '저는 사랑이 정해진 기간 뒤 끝나기보다 여러 단계로 변한다고 생각해요.',
      'Men sevgi belgilangan muddatdan keyin tugamay, turli bosqichlarga o‘tadi deb o‘ylayman.',
      'I think love changes through stages rather than ending after a fixed period.',
      'Я думаю, любовь проходит разные этапы, а не заканчивается через фиксированный срок.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['expiration-period', 'stage', 'speaking'],
  },

  s6u1_435_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '사랑의 단계가 달라질 때마다 관계에 필요한 노력도 달라질 수 있다는 문장을 만드세요.',
      'Sevgi bosqichi o‘zgargan sari munosabat uchun kerakli harakat ham o‘zgarishi mumkinligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “The effort a relationship needs can change as the stage of love changes.”',
      'Составьте предложение: «По мере изменения этапа любви могут меняться и усилия, необходимые отношениям».',
    ),
    options: [
      '관계에',
      '필요한',
      '달라질',
      '단계가',
      '때마다',
      '노력도',
      '사랑의',
      '수 있어요',
      '달라질',
      '끝날',
    ],
    answer: '사랑의 단계가 달라질 때마다 관계에 필요한 노력도 달라질 수 있어요',
    answerTranslation: L(
      '사랑의 단계가 바뀌면 관계를 위해 필요한 노력도 달라질 수 있어요.',
      'Sevgi bosqichi o‘zgarsa, munosabat uchun kerakli harakat ham o‘zgarishi mumkin.',
      'Different stages of love can require different kinds of effort.',
      'Разные этапы любви могут требовать разных усилий.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['stage', 'effort', 'translate-builder'],
  },

  s6u1_436_listening: {
    type: 'listening',
    instruction: L(
      '여자가 현재 관계를 어떻게 보고 있는지 고르세요.',
      'Ayol hozirgi munosabatini qanday ko‘rayotganini tanlang.',
      'Choose how the woman views her current relationship.',
      'Выберите, как женщина оценивает свои нынешние отношения.',
    ),
    audioText:
      '예전처럼 만날 때마다 두근거리지는 않아요. 하지만 서로를 더 잘 알고 편하게 이야기할 수 있게 됐어요. 저는 사랑이 식었다기보다 다음 단계로 간 것 같아요.',
    options: [
      '사랑이 끝난 것이 아니라 다른 단계로 변했다고 본다',
      '감정이 완전히 사라졌다고 본다',
      '처음보다 관계가 더 나빠졌다고 본다',
      '더 이상 상대방을 알고 싶지 않다고 본다',
    ],
    answer: '사랑이 끝난 것이 아니라 다른 단계로 변했다고 본다',
    answerTranslation: L(
      '여자는 관계가 끝난 게 아니라 사랑이 다른 단계로 변했다고 생각해요.',
      'Ayol sevgi tugamagan, boshqa bosqichga o‘tgan deb o‘ylaydi.',
      'She believes the relationship has moved into another stage rather than ended.',
      'Она считает, что любовь перешла на другой этап, а не закончилась.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['stage', 'love-change', 'listening'],
  },

  s6u1_437_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '정해진 기간을 ___이라고 하고, 변화 과정에서 각각의 부분을 ___라고 해요.',
    blankAnswers: ['유효기간', '단계'],
    options: ['유효기간', '단계', '일생', '영원', '처음'],
    answer: '유효기간|단계',
    answerTranslation: L(
      '기간은 유효기간, 과정의 한 부분은 단계예요.',
      'Muddat 유효기간, jarayonning qismi 단계.',
      'A validity period is 유효기간, and a stage in a process is 단계.',
      'Срок действия — 유효기간, этап процесса — 단계.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['expiration-period', 'stage', 'multi-blank'],
  },

  s6u1_438_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '다른',
      '사랑이',
      '바뀐',
      '단계로',
      '것일',
      '수 있어요',
      '끝난',
      '유효기간이',
    ],
    answer: '사랑이 다른 단계로 바뀐 것일 수 있어요',
    audioText: '사랑이 다른 단계로 바뀐 것일 수 있어요.',
    answerTranslation: L(
      '사랑이 끝난 게 아니라 다른 단계로 변한 것일 수도 있어요.',
      'Sevgi tugamagan, balki boshqa bosqichga o‘tgan bo‘lishi mumkin.',
      'Love may simply have changed into another stage.',
      'Возможно, любовь просто перешла на другой этап.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['stage', 'word-arrange'],
  },

  s6u1_439_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`사랑의 ___`과 `사랑의 ___`에 들어갈 단어를 순서대로 쓰세요.',
    blankAnswers: ['유효기간', '단계'],
    answerTranslation: L(
      '사랑의 유효기간과 사랑의 단계를 연습해요.',
      '사랑의 유효기간 va 사랑의 단계 birikmalarini mashq qilamiz.',
      'Practice 사랑의 유효기간 and 사랑의 단계.',
      'Практикуем 사랑의 유효기간 и 사랑의 단계.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The required answers are 유효기간 and 단계.',
      acceptedAnswers: [],
      notes: ['Require correct order.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['expiration-period', 'stage', 'type-answer'],
  },

  s6u1_440_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글의 핵심 생각을 고르세요.',
      'Matnning asosiy fikrini tanlang.',
      'Choose the main idea of the passage.',
      'Выберите главную мысль текста.',
    ),
    passage:
      '사랑에 유효기간이 있다는 표현은 사랑의 감정이 시간이 지나면서 달라지는 모습을 설명하기 위해 사용될 수 있습니다. 그러나 감정이 달라지는 것과 관계가 완전히 끝나는 것은 같은 일이 아닙니다. 사랑은 여러 단계를 지나며 새로운 모습이 될 수 있습니다.',
    options: [
      '사랑의 변화가 반드시 사랑의 끝을 뜻하지는 않는다',
      '사랑에는 반드시 정확한 유효기간이 있다',
      '사랑의 첫 단계만 의미가 있다',
      '감정이 달라지면 바로 관계를 끝내야 한다',
    ],
    answer: '사랑의 변화가 반드시 사랑의 끝을 뜻하지는 않는다',
    answerTranslation: L(
      '사랑의 모습이 변해도 관계가 반드시 끝나는 것은 아니라는 내용이에요.',
      'Sevgi shakli o‘zgarsa ham, munosabat albatta tugamaydi.',
      'Changes in love do not necessarily mean the relationship is over.',
      'Изменение любви не обязательно означает конец отношений.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['expiration-period', 'stage', 'reading'],
  },

  // ────────────────────────────────────────────────────────────
  // Lesson 3 · 사랑이 식을 때
  // q441 ~ q460
  // ────────────────────────────────────────────────────────────

  s6u1_441_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '예전보다 연락하고 싶은 마음이 줄어서 사랑이 식은 건지 고민했다는 문장을 만드세요.',
      'Avvalgidan kamroq bog‘lanishni xohlaganingiz uchun sevgi soviganmi deb o‘ylaganingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “I wondered whether my love had cooled because I wanted to contact my partner less than before.”',
      'Составьте предложение: «Я задумался, не остыла ли любовь, потому что мне стало меньше хотеться связываться с партнёром».',
    ),
    options: [
      '연락하고',
      '고민했어요',
      '마음이',
      '사랑이',
      '건지',
      '싶은',
      '예전보다',
      '줄어서',
      '식은',
      '영원한',
    ],
    answer: '예전보다 연락하고 싶은 마음이 줄어서 사랑이 식은 건지 고민했어요',
    answerTranslation: L(
      '예전보다 연락하고 싶은 마음이 줄어서 사랑이 식은 건지 고민했어요.',
      'Avvalgidan kamroq bog‘lanishni xohlaganim uchun sevgim soviganmi deb o‘yladim.',
      'I wondered whether my love had cooled because I wanted less contact than before.',
      'Я задумался, не остыла ли любовь, потому что мне стало меньше хотеться общаться.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-cool', 'translate-builder'],
  },

  s6u1_442_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '사랑하는 감정이 예전보다 약해지는 것을 `사랑이 ___`라고 하고, 그 변화가 일어나는 과정의 한 부분을 ___라고 할 수 있어요.',
    blankAnswers: ['식다', '단계'],
    answerTranslation: L(
      '사랑이 약해지는 것은 사랑이 식다이고 과정의 한 부분은 단계예요.',
      'Sevgi hissining kamayishi 사랑이 식다, jarayonning bir qismi 단계.',
      'Love becoming weaker is 사랑이 식다, and a part of a process is 단계.',
      'Ослабление любви — 사랑이 식다, а часть процесса — 단계.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target answers are 식다 and 단계.',
      acceptedAnswers: [],
      notes: ['Require 식다 then 단계.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-cool', 'stage', 'type-answer'],
  },

  s6u1_443_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '예전보다 상대방을 보고 싶은 마음이 크게 줄었다면 사랑이 ___ 것인지 아니면 관계가 새로운 ___로 바뀐 것인지 생각해 볼 수 있어요.',
    blankAnswers: ['식은', '단계'],
    options: ['식은', '단계', '영원한', '일생', '유효기간'],
    answer: '식은|단계',
    answerTranslation: L(
      '감정이 약해진 것인지 사랑이 다른 단계로 변한 것인지 생각해 볼 수 있어요.',
      'His soviganmi yoki sevgi boshqa bosqichga o‘tganmi deb o‘ylash mumkin.',
      'You can consider whether love has cooled or simply changed stages.',
      'Можно подумать, остыла ли любовь или просто перешла на другой этап.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-cool', 'stage', 'multi-blank'],
  },

  s6u1_444_listening: {
    type: 'listening',
    instruction: L(
      '남자가 여자 친구와의 관계에서 걱정하는 것을 고르세요.',
      'Erkak qiz do‘sti bilan munosabatida nimadan xavotir olayotganini tanlang.',
      'Choose what the man is worried about in his relationship.',
      'Выберите, что беспокоит мужчину в отношениях.',
    ),
    audioText:
      '요즘 여자 친구를 만나도 예전처럼 두근거리지 않아요. 편하고 좋기는 한데 제가 사랑이 식은 건지 그냥 익숙해진 건지 잘 모르겠어요.',
    options: [
      '사랑이 식은 것인지 관계에 익숙해진 것인지 모르겠다',
      '여자 친구와 처음 만나는 것이 걱정된다',
      '여자 친구가 결혼을 준비하는 것이 싫다',
      '나이 차이가 갑자기 커진 것이 걱정된다',
    ],
    answer: '사랑이 식은 것인지 관계에 익숙해진 것인지 모르겠다',
    answerTranslation: L(
      '남자는 감정이 식은 건지 관계가 편해진 건지 고민하고 있어요.',
      'U sevgisi soviganmi yoki munosabat shunchaki odatiy bo‘lib qolganmi deb o‘ylayapti.',
      'He is unsure whether his love has cooled or the relationship has simply become comfortable.',
      'Он не понимает, остыла ли любовь или отношения просто стали привычными.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['love-cool', 'relationship-change', 'listening'],
  },

  s6u1_445_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '사랑이 식었다고 느껴질 때 바로 결론을 내리기보다 이유를 생각해 봐야 한다는 문장을 만드세요.',
      'Sevgi sovigandek tuyulganda darhol xulosa qilmay, sababini o‘ylab ko‘rish kerakligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “When love feels like it has cooled, you should think about why before immediately reaching a conclusion.”',
      'Составьте предложение: «Если кажется, что любовь остыла, лучше сначала подумать о причине, а не сразу делать вывод».',
    ),
    options: [
      '봐야',
      '내리기보다',
      '식었다고',
      '이유를',
      '사랑이',
      '느껴질',
      '바로',
      '생각해',
      '때',
      '해요',
      '끝내야',
    ],
    answer:
      '사랑이 식었다고 느껴질 때 바로 결론을 내리기보다 이유를 생각해 봐야 해요',
    answerTranslation: L(
      '사랑이 식었다고 느껴져도 바로 끝이라고 생각하지 말고 이유를 살펴봐야 해요.',
      'Sevgi sovigandek tuyulsa ham, darhol tugadi demay sababini o‘ylash kerak.',
      'Even when love feels weaker, it is better to examine why before assuming it is over.',
      'Даже если кажется, что любовь остыла, стоит сначала понять причину.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-cool', 'reflection', 'translate-builder'],
  },

  s6u1_446_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '식었다고',
      '바로',
      '사랑이',
      '단정하지',
      '않는',
      '좋아요',
      '게',
      '영원하다고',
    ],
    answer: '사랑이 식었다고 바로 단정하지 않는 게 좋아요',
    audioText: '사랑이 식었다고 바로 단정하지 않는 게 좋아요.',
    answerTranslation: L(
      '감정이 달라졌다고 바로 사랑이 끝났다고 판단하지 않는 게 좋아요.',
      'Hislar o‘zgardi deb darhol sevgi tugadi deb hukm qilmagan yaxshi.',
      'It is better not to immediately conclude that love has cooled.',
      'Лучше не делать сразу вывод, что любовь остыла.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-cool', 'word-arrange'],
  },

  s6u1_447_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`사랑이 ___`는 감정이 약해진다는 뜻이고, `___으로`는 어떤 일을 생애에서 첫 번째로 한다는 뜻이에요.',
    blankAnswers: ['식다', '처음'],
    answerTranslation: L(
      '사랑이 식다와 처음으로의 의미를 구별해요.',
      '사랑이 식다 va 처음으로 ma’nolarini farqlaymiz.',
      'Distinguish 사랑이 식다 and 처음으로.',
      'Различаем 사랑이 식다 и 처음으로.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The answers are 식다 and 처음.',
      acceptedAnswers: [],
      notes: ['Require 식다 then 처음.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-cool', 'first-time', 'type-answer'],
  },

  s6u1_448_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글에서 사랑이 식었다고 판단하기 전에 확인해야 한다고 말하는 것을 고르세요.',
      'Matnda sevgi sovidi deb xulosa qilishdan oldin nimani tekshirish kerakligi aytilganini tanlang.',
      'Choose what the passage says should be considered before deciding love has cooled.',
      'Выберите, что, согласно тексту, нужно проверить перед выводом о том, что любовь остыла.',
    ),
    passage:
      '오랫동안 만난 연인에게는 처음과 같은 설렘이 줄어들 수 있습니다. 하지만 피곤하거나 일이 바쁜 시기에는 상대방에게 표현할 여유가 줄어들기도 합니다. 따라서 최근 감정이 달라졌다고 해서 바로 사랑이 식었다고 판단하기보다 생활 상황과 관계의 변화를 함께 살펴볼 필요가 있습니다.',
    options: [
      '생활 상황과 관계의 변화를 함께 살펴본다',
      '첫날의 감정과 완전히 같은지만 본다',
      '설렘이 줄면 바로 헤어진다',
      '상대방에게 이유를 묻지 않는다',
    ],
    answer: '생활 상황과 관계의 변화를 함께 살펴본다',
    answerTranslation: L(
      '감정뿐 아니라 최근의 생활 상황과 관계 변화도 살펴봐야 해요.',
      'Faqat hisni emas, hayotiy vaziyat va munosabatdagi o‘zgarishni ham ko‘rish kerak.',
      'You should consider life circumstances and relationship changes, not just emotion.',
      'Нужно учитывать не только чувства, но и жизненную ситуацию и изменения отношений.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-cool', 'reading'],
  },

  s6u1_449_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText:
      '상대방을 더 보고 싶고 함께하고 싶은 마음이 커졌으니 사랑이 식었어요.',
    wrongWord: '식었어요.',
    options: ['깊어졌어요.', '식었어요.', '끝났어요.', '사라졌어요.'],
    answer: '깊어졌어요.',
    answerTranslation: L(
      '상대방을 더 보고 싶고 함께하고 싶은 마음이 커졌으니 사랑이 깊어졌어요.',
      'Sherigimni ko‘proq ko‘rishni va birga bo‘lishni istaganim uchun sevgim chuqurlashdi.',
      'Wanting to see and be with the other person more suggests the love has deepened.',
      'Желание чаще видеть партнёра и быть вместе говорит о том, что любовь стала глубже.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-change', 'error-hunt'],
  },

  s6u1_450_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '감정이 예전과 달라졌다고 해서 반드시 사랑이 식은 것은 아니라는 문장을 만드세요.',
      'Hislar avvalgidan o‘zgargani albatta sevgi soviganini anglatmasligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “A change in feelings does not necessarily mean love has cooled.”',
      'Составьте предложение: «Изменение чувств не обязательно означает, что любовь остыла».',
    ),
    options: [
      '해서',
      '것은',
      '감정이',
      '사랑이',
      '예전과',
      '식은',
      '반드시',
      '달라졌다고',
      '아니에요',
      '영원한',
    ],
    answer: '감정이 예전과 달라졌다고 해서 반드시 사랑이 식은 것은 아니에요',
    answerTranslation: L(
      '감정의 변화가 바로 사랑의 끝을 의미하는 것은 아니에요.',
      'Hislarning o‘zgarishi darhol sevgining tugaganini anglatmaydi.',
      'A change in feelings does not automatically mean love is over.',
      'Изменение чувств не означает автоматически конец любви.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-cool', 'change', 'translate-builder'],
  },

  s6u1_451_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 두 표현을 입력하세요.',
      'Eshitgan gapingizdagi tushib qolgan ikki ifodani yozing.',
      'Type the two missing expressions.',
      'Введите два пропущенных выражения.',
    ),
    audioText:
      '사랑이 식은 건지 관계가 다른 단계로 변한 건지 생각해 봐야 해요.',
    sentenceTemplate:
      '사랑이 ___ 건지 관계가 다른 ___로 변한 건지 생각해 봐야 해요.',
    blankAnswers: ['식은', '단계'],
    answerTranslation: L(
      '사랑이 식은 것인지 다른 단계로 변한 것인지 생각해 봐야 해요.',
      'Sevgi soviganmi yoki boshqa bosqichga o‘tganmi deb o‘ylash kerak.',
      'You should consider whether love has cooled or moved to another stage.',
      'Нужно понять, остыла ли любовь или перешла на другой этап.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated answers are 식은 and 단계.',
      acceptedAnswers: [],
      notes: ['Require 식은 then 단계.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['love-cool', 'stage', 'listen-fill'],
  },

  s6u1_452_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '처음의 설렘이 줄어들면 사랑이 ___다고 느낄 수 있습니다. 하지만 관계가 새로운 ___로 변한 것일 수도 있으므로 바로 관계의 ___이라고 판단할 필요는 없습니다.',
    blankAnswers: ['식었', '단계', '끝'],
    options: ['식었', '단계', '끝', '영원', '청혼'],
    answer: '식었|단계|끝',
    answerTranslation: L(
      '설렘이 줄어도 사랑이 식거나 끝났다고 바로 판단할 필요는 없어요.',
      'Hayajon kamaygan bo‘lsa ham, sevgi sovidi yoki tugadi deb darhol xulosa qilish shart emas.',
      'Reduced excitement does not necessarily mean love has cooled or ended.',
      'Уменьшение волнения не обязательно означает, что любовь остыла или закончилась.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-cool', 'stage', 'cloze'],
  },

  s6u1_453_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`사랑이 ___`와 `사랑의 ___`에 들어갈 핵심 단어를 순서대로 입력하세요.',
    blankAnswers: ['식다', '단계'],
    answerTranslation: L(
      '사랑이 식다와 사랑의 단계를 연습해요.',
      '사랑이 식다 va 사랑의 단계 ifodalarini mashq qilamiz.',
      'Practice 사랑이 식다 and 사랑의 단계.',
      'Практикуем 사랑이 식다 и 사랑의 단계.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The required words are 식다 and 단계.',
      acceptedAnswers: [],
      notes: ['Require correct order.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['love-cool', 'stage', 'type-answer'],
  },

  s6u1_454_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '처음의 설렘이 줄었다고 해서 바로 사랑이 식었다고 생각할 필요는 없어요.',
    audioText:
      '처음의 설렘이 줄었다고 해서 바로 사랑이 식었다고 생각할 필요는 없어요.',
    answerTranslation: L(
      '처음의 감정이 줄어도 바로 사랑이 끝났다고 볼 필요는 없어요.',
      'Dastlabki hayajon kamaygan bo‘lsa ham, sevgi tugadi deb o‘ylash shart emas.',
      'A decrease in initial excitement does not mean you need to assume love has cooled.',
      'Если первоначальное волнение уменьшилось, не обязательно считать, что любовь остыла.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['love-cool', 'speaking'],
  },

  s6u1_455_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '사랑이 식었다고 느낀다면 혼자 고민하기보다 상대방과 이야기하는 것이 좋다는 문장을 만드세요.',
      'Sevgi sovigandek tuyulsa, yolg‘iz o‘ylashdan ko‘ra sherigingiz bilan gaplashish yaxshi ekanini bildiradigan gap tuzing.',
      'Build a sentence meaning: “If you feel love has cooled, it is better to talk with your partner than worry alone.”',
      'Составьте предложение: «Если кажется, что любовь остыла, лучше поговорить с партнёром, чем переживать одному».',
    ),
    options: [
      '이야기하는',
      '혼자',
      '사랑이',
      '상대방과',
      '고민하기보다',
      '느낀다면',
      '좋아요',
      '식었다고',
      '것이',
      '숨기는',
    ],
    answer:
      '사랑이 식었다고 느낀다면 혼자 고민하기보다 상대방과 이야기하는 것이 좋아요',
    answerTranslation: L(
      '감정이 식은 것 같으면 혼자 고민하지 말고 상대방과 이야기하는 게 좋아요.',
      'Sevgi sovigandek bo‘lsa, yolg‘iz o‘ylamay sherigingiz bilan gaplashgan yaxshi.',
      'If love feels weaker, it is better to discuss it with your partner.',
      'Если кажется, что любовь ослабла, лучше обсудить это с партнёром.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-cool', 'communication', 'translate-builder'],
  },

  s6u1_456_listening: {
    type: 'listening',
    instruction: L(
      '여자가 관계를 계속해 보기로 한 이유를 고르세요.',
      'Ayol nima uchun munosabatni davom ettirishga qaror qilganini tanlang.',
      'Choose why the woman decided to continue the relationship.',
      'Выберите, почему женщина решила продолжить отношения.',
    ),
    audioText:
      '한동안 사랑이 식은 줄 알았어요. 그런데 남자 친구와 솔직하게 이야기해 보니 서로 너무 바빠서 함께 보내는 시간이 줄어든 게 문제였어요. 그래서 시간을 더 내 보기로 했어요.',
    options: [
      '사랑보다 함께 보내는 시간이 부족했던 문제라는 것을 알았기 때문에',
      '남자 친구가 바로 결혼하자고 했기 때문에',
      '두 사람이 다시 처음 만났기 때문에',
      '유효기간이 끝났다고 확인했기 때문에',
    ],
    answer: '사랑보다 함께 보내는 시간이 부족했던 문제라는 것을 알았기 때문에',
    answerTranslation: L(
      '사랑이 식은 게 아니라 함께하는 시간이 부족했다는 것을 알았어요.',
      'Sevgi sovimagan, birga vaqt yetishmaganini tushundi.',
      'She realized the problem was lack of time together rather than lost love.',
      'Она поняла, что проблема была в нехватке совместного времени, а не в исчезновении любви.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['love-cool', 'communication', 'listening'],
  },

  s6u1_457_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '사랑하는 마음이 약해지는 것을 사랑이 ___다고 하고, 변화 과정의 각각의 부분을 ___라고 해요.',
    blankAnswers: ['식는', '단계'],
    options: ['식는', '단계', '영원', '일생', '유효기간'],
    answer: '식는|단계',
    answerTranslation: L(
      '사랑이 식다와 단계의 의미를 함께 익혀요.',
      '사랑이 식다 va 단계 so‘zlarini birga o‘rganamiz.',
      'Practice 사랑이 식다 and 단계 together.',
      'Практикуем 사랑이 식다 и 단계.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['love-cool', 'stage', 'multi-blank'],
  },

  s6u1_458_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '이야기해',
      '감정이',
      '달라졌다면',
      '보는',
      '솔직하게',
      '좋아요',
      '게',
      '숨기는',
    ],
    answer: '감정이 달라졌다면 솔직하게 이야기해 보는 게 좋아요',
    audioText: '감정이 달라졌다면 솔직하게 이야기해 보는 게 좋아요.',
    answerTranslation: L(
      '감정이 변했다면 상대방과 솔직하게 이야기해 보는 게 좋아요.',
      'Hislar o‘zgargan bo‘lsa, ochiq gaplashgan yaxshi.',
      'If your feelings have changed, it is good to talk about them honestly.',
      'Если чувства изменились, лучше честно об этом поговорить.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['emotion', 'communication', 'word-arrange'],
  },

  s6u1_459_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`감정이 약해지다`라는 뜻의 `사랑이 ___`와 `과정의 한 부분`을 뜻하는 ___를 입력하세요.',
    blankAnswers: ['식다', '단계'],
    answerTranslation: L(
      '사랑이 식다와 단계를 구별해요.',
      '사랑이 식다 va 단계 ma’nolarini farqlaymiz.',
      'Distinguish 사랑이 식다 from 단계.',
      'Различаем 사랑이 식다 и 단계.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The required answers are 식다 and 단계.',
      acceptedAnswers: [],
      notes: ['Require exact answers in order.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['love-cool', 'stage', 'type-answer'],
  },

  s6u1_460_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글에서 사랑이 식었다고 느낄 때 가장 먼저 권하는 행동을 고르세요.',
      'Matnda sevgi sovigandek tuyulganda eng avval nima qilish tavsiya etilganini tanlang.',
      'Choose what the passage recommends doing first when love seems to have cooled.',
      'Выберите, что текст советует сделать сначала, если кажется, что любовь остыла.',
    ),
    passage:
      '사랑이 식은 것 같다고 느낄 때는 바로 결론을 내리기보다 무엇이 달라졌는지 살펴보는 것이 좋습니다. 최근 서로 바빴는지, 갈등이 계속됐는지, 함께하는 시간이 줄었는지 생각해 보고 상대방과 솔직하게 이야기할 필요가 있습니다.',
    options: [
      '관계에서 무엇이 달라졌는지 살펴보고 대화한다',
      '바로 헤어진다',
      '상대방에게 아무 말도 하지 않는다',
      '처음의 설렘만 다시 만들려고 한다',
    ],
    answer: '관계에서 무엇이 달라졌는지 살펴보고 대화한다',
    answerTranslation: L(
      '변한 원인을 살펴본 뒤 상대방과 대화하는 것이 좋아요.',
      'O‘zgarish sababini ko‘rib, keyin sherik bilan gaplashgan yaxshi.',
      'It is better to identify what changed and then discuss it with your partner.',
      'Лучше понять, что изменилось, а затем поговорить с партнёром.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-cool', 'reading'],
  },

  // ────────────────────────────────────────────────────────────
  // Lesson 4 · 일생을 함께하는 사랑
  // q461 ~ q480
  // ────────────────────────────────────────────────────────────

  s6u1_461_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '사랑하는 사람과 일생을 함께하려면 서로의 변화를 받아들여야 한다는 문장을 만드세요.',
      'Sevgan inson bilan bir umr birga bo‘lish uchun bir-biringizdagi o‘zgarishlarni qabul qilish kerakligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “To spend a lifetime with someone you love, you need to accept each other’s changes.”',
      'Составьте предложение: «Чтобы провести всю жизнь с любимым человеком, нужно принимать изменения друг друга».',
    ),
    options: [
      '받아들여야',
      '사람과',
      '사랑하는',
      '변화를',
      '일생을',
      '함께하려면',
      '서로의',
      '해요',
      '거부해야',
    ],
    answer: '사랑하는 사람과 일생을 함께하려면 서로의 변화를 받아들여야 해요',
    answerTranslation: L(
      '평생 함께하려면 서로 변하는 모습도 받아들여야 해요.',
      'Bir umr birga bo‘lish uchun bir-biridagi o‘zgarishlarni ham qabul qilish kerak.',
      'Spending a lifetime together requires accepting how each person changes.',
      'Чтобы прожить вместе всю жизнь, нужно принимать изменения друг друга.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lifetime', 'together', 'translate-builder'],
  },

  s6u1_462_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '사람이 태어나서 죽을 때까지의 전체 삶을 ___이라고 하고, 끝없이 계속되는 상태를 ___하다고 해요.',
    blankAnswers: ['일생', '영원'],
    answerTranslation: L(
      '한 사람의 전체 삶은 일생이고 끝없이 계속되는 것은 영원하다고 해요.',
      'Insonning butun hayoti 일생, cheksiz davom etish esa 영원.',
      'A person’s whole life is 일생, while something endless is 영원.',
      'Вся жизнь человека — 일생, а бесконечное продолжение — 영원.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target answers are 일생 then 영원.',
      acceptedAnswers: [],
      notes: ['Require 일생 and 영원.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lifetime', 'eternal', 'type-answer'],
  },

  s6u1_463_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '두 사람이 ___을 함께 보내고 싶다면 사랑이 언제나 처음과 ___지는 않을 수 있다는 것도 받아들여야 해요.',
    blankAnswers: ['일생', '같아'],
    options: ['일생', '같아', '유효기간', '단계', '처음으로'],
    answer: '일생|같아',
    answerTranslation: L(
      '평생 함께하려면 사랑의 모습이 처음과 달라질 수도 있다는 것을 받아들여야 해요.',
      'Bir umr birga bo‘lish uchun sevgi shakli avvalgidan o‘zgarishi mumkinligini qabul qilish kerak.',
      'A lifetime together requires accepting that love may not always feel exactly as it did at first.',
      'Чтобы прожить вместе всю жизнь, нужно принять, что любовь может ощущаться не так, как в начале.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lifetime', 'change', 'multi-blank'],
  },

  s6u1_464_listening: {
    type: 'listening',
    instruction: L(
      '화자가 오랜 관계에서 가장 중요하다고 생각하는 것을 고르세요.',
      'So‘zlovchi uzoq munosabatda eng muhim deb biladigan narsani tanlang.',
      'Choose what the speaker considers most important in a long-term relationship.',
      'Выберите, что говорящий считает самым важным в длительных отношениях.',
    ),
    audioText:
      '일생을 함께하려면 처음의 설렘만으로는 부족하다고 생각해요. 서로 힘든 시기를 지나고 변하는 모습도 받아들이면서 함께할 수 있어야 해요.',
    options: [
      '서로의 변화와 힘든 시기도 받아들이며 함께하는 것',
      '처음의 설렘을 평생 똑같이 유지하는 것',
      '문제가 생기면 서로 피하는 것',
      '상대방의 변화는 모두 막는 것',
    ],
    answer: '서로의 변화와 힘든 시기도 받아들이며 함께하는 것',
    answerTranslation: L(
      '오래 함께하려면 서로의 변화와 어려움도 받아들여야 한다고 해요.',
      'Uzoq birga bo‘lish uchun o‘zgarish va qiyinchiliklarni ham qabul qilish kerak.',
      'The speaker says a lifetime together requires accepting changes and difficult periods.',
      'Говорящий считает, что для совместной жизни нужно принимать изменения и трудные периоды.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['lifetime', 'together', 'listening'],
  },

  s6u1_465_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '평생 함께한다는 것은 좋은 순간뿐 아니라 힘든 순간도 함께한다는 뜻이라는 문장을 만드세요.',
      'Bir umr birga bo‘lish faqat yaxshi paytlarni emas, qiyin paytlarni ham birga o‘tkazishni anglatishini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Spending a lifetime together means sharing difficult moments as well as good ones.”',
      'Составьте предложение: «Быть вместе всю жизнь — значит разделять не только хорошие, но и трудные моменты».',
    ),
    options: [
      '뜻이에요',
      '평생',
      '좋은',
      '힘든',
      '함께한다는',
      '순간뿐',
      '순간도',
      '아니라',
      '함께한다는',
      '혼자라는',
    ],
    answer:
      '평생 함께한다는 것은 좋은 순간뿐 아니라 힘든 순간도 함께한다는 뜻이에요',
    answerTranslation: L(
      '평생 함께한다는 것은 좋은 때와 어려운 때를 모두 같이한다는 뜻이에요.',
      'Bir umr birga bo‘lish yaxshi va qiyin paytlarning barchasini birga o‘tkazishni anglatadi.',
      'A lifetime together means sharing both good and difficult moments.',
      'Быть вместе всю жизнь означает разделять и хорошие, и трудные моменты.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lifetime', 'together', 'translate-builder'],
  },

  s6u1_466_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '싶어요',
      '사람과',
      '일생을',
      '사랑하는',
      '함께하고',
      '저는',
      '처음만',
    ],
    answer: '저는 사랑하는 사람과 일생을 함께하고 싶어요',
    audioText: '저는 사랑하는 사람과 일생을 함께하고 싶어요.',
    answerTranslation: L(
      '저는 사랑하는 사람과 평생 함께 살고 싶어요.',
      'Men sevgan insonim bilan bir umr birga bo‘lishni xohlayman.',
      'I want to spend my lifetime with the person I love.',
      'Я хочу провести всю жизнь с любимым человеком.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lifetime', 'together', 'word-arrange'],
  },

  s6u1_467_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`한 사람의 전체 삶`은 ___이고, `같이 시간을 보내거나 삶을 나누다`는 뜻의 동사는 ___예요.',
    blankAnswers: ['일생', '함께하다'],
    answerTranslation: L(
      '일생과 함께하다의 의미를 구별해요.',
      '일생 va 함께하다 ma’nolarini farqlaymiz.',
      'Distinguish 일생 and 함께하다.',
      'Различаем 일생 и 함께하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The answers are 일생 and 함께하다.',
      acceptedAnswers: [],
      notes: ['Require 일생 then 함께하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lifetime', 'together', 'type-answer'],
  },

  s6u1_468_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글쓴이가 `일생을 함께하다`에서 가장 중요하게 생각하는 것을 고르세요.',
      'Muallif `일생을 함께하다` iborasida eng muhim deb biladigan narsani tanlang.',
      'Choose what the writer considers most important about spending a lifetime together.',
      'Выберите, что автор считает самым важным в совместной жизни.',
    ),
    passage:
      '일생을 함께한다는 것은 오랫동안 같은 집에 사는 것만을 뜻하지 않습니다. 서로 다른 생각을 이해하고 힘든 일이 있을 때 함께 해결하며 변화하는 상대방을 계속 알아 가는 과정이라고 생각합니다.',
    options: [
      '변화를 이해하고 어려움을 함께 해결하는 것',
      '항상 같은 생각만 하는 것',
      '한 사람만 모든 문제를 해결하는 것',
      '상대방이 절대 변하지 않는 것',
    ],
    answer: '변화를 이해하고 어려움을 함께 해결하는 것',
    answerTranslation: L(
      '서로 변화를 이해하고 문제를 함께 해결하는 것이 중요하다고 해요.',
      'Bir-birining o‘zgarishini tushunib, muammoni birga hal qilish muhim.',
      'The writer values understanding changes and solving difficulties together.',
      'Автор считает важным понимать изменения и вместе решать трудности.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lifetime', 'together', 'reading'],
  },

  s6u1_469_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText: '사랑하는 사람과 평생 떨어지고 싶어서 일생을 함께하기로 했어요.',
    wrongWord: '떨어지고',
    options: ['함께하고', '떨어지고', '헤어지고', '잊고'],
    answer: '함께하고',
    answerTranslation: L(
      '사랑하는 사람과 평생 함께하고 싶어서 일생을 함께하기로 했어요.',
      'Sevgan insonim bilan bir umr birga bo‘lishni istaganim uchun hayotimni u bilan o‘tkazishga qaror qildim.',
      'I decided to spend my life with the person I love because I want to stay together.',
      'Я решил провести жизнь с любимым человеком, потому что хочу быть с ним вместе.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['lifetime', 'together', 'error-hunt'],
  },

  s6u1_470_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '일생을 함께할 사람이라면 처음 모습뿐 아니라 변하는 모습도 사랑해야 한다는 문장을 만드세요.',
      'Bir umr birga bo‘ladigan insonning nafaqat dastlabki, balki o‘zgarib boradigan holatini ham sevish kerakligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “If someone is your lifelong partner, you need to love not only who they were at first but also who they become.”',
      'Составьте предложение: «Если это человек на всю жизнь, нужно любить не только его первоначальный, но и меняющийся образ».',
    ),
    options: [
      '모습뿐',
      '사람이라면',
      '모습도',
      '사랑해야',
      '변하는',
      '처음',
      '일생을',
      '함께할',
      '해요',
      '미워해야',
    ],
    answer:
      '일생을 함께할 사람이라면 처음 모습뿐 아니라 변하는 모습도 사랑해야 해요',
    answerTranslation: L(
      '평생 함께할 사람이라면 시간이 지나며 변하는 모습도 받아들여야 해요.',
      'Bir umr birga bo‘ladigan insonning vaqt o‘tishi bilan o‘zgarishini ham qabul qilish kerak.',
      'A lifelong relationship requires accepting and loving changes over time.',
      'В отношениях на всю жизнь нужно принимать и любить изменения человека.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lifetime', 'change', 'translate-builder'],
  },

  s6u1_471_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 두 단어를 입력하세요.',
      'Eshitgan gapingizdagi tushib qolgan ikki so‘zni yozing.',
      'Type the two missing words.',
      'Введите два пропущенных слова.',
    ),
    audioText: '일생을 함께하려면 서로의 변화를 이해해야 해요.',
    sentenceTemplate: '___을 함께하려면 서로의 ___를 이해해야 해요.',
    blankAnswers: ['일생', '변화'],
    answerTranslation: L(
      '일생을 함께하려면 서로의 변화를 이해해야 해요.',
      'Bir umr birga bo‘lish uchun bir-birining o‘zgarishini tushunish kerak.',
      'To spend a lifetime together, you need to understand each other’s changes.',
      'Чтобы прожить вместе всю жизнь, нужно понимать изменения друг друга.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated answers are 일생 and 변화.',
      acceptedAnswers: [],
      notes: ['Require 일생 then 변화.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['lifetime', 'change', 'listen-fill'],
  },

  s6u1_472_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '두 사람이 ___을 함께하려면 처음의 모습만 좋아해서는 부족합니다. 시간이 지나며 서로 ___할 수 있다는 것을 받아들이고 어려운 순간도 ___해야 합니다.',
    blankAnswers: ['일생', '변화', '함께'],
    options: ['일생', '변화', '함께', '유효기간', '청혼'],
    answer: '일생|변화|함께',
    answerTranslation: L(
      '평생 함께하려면 서로 변할 수 있다는 것을 받아들이고 어려움도 같이해야 해요.',
      'Bir umr birga bo‘lish uchun o‘zgarishni qabul qilib, qiyinchiliklarni ham birga o‘tish kerak.',
      'A lifelong relationship requires accepting change and facing difficulties together.',
      'Отношения на всю жизнь требуют принимать изменения и вместе проходить трудности.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lifetime', 'change', 'together', 'cloze'],
  },

  s6u1_473_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`___을 함께하다`는 평생 삶을 나눈다는 뜻이고, `___하다`는 끝없이 계속된다는 뜻이에요.',
    blankAnswers: ['일생', '영원'],
    answerTranslation: L(
      '일생을 함께하다와 영원하다를 연습해요.',
      '일생을 함께하다 va 영원하다 ifodalarini mashq qilamiz.',
      'Practice 일생을 함께하다 and 영원하다.',
      'Практикуем 일생을 함께하다 и 영원하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The required answers are 일생 and 영원.',
      acceptedAnswers: [],
      notes: ['Require 일생 then 영원.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['lifetime', 'eternal', 'type-answer'],
  },

  s6u1_474_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '일생을 함께한다는 것은 서로의 좋은 모습뿐 아니라 변하는 모습도 받아들이는 것이라고 생각해요.',
    audioText:
      '일생을 함께한다는 것은 서로의 좋은 모습뿐 아니라 변하는 모습도 받아들이는 것이라고 생각해요.',
    answerTranslation: L(
      '평생 함께한다면 상대방이 변하는 모습도 받아들여야 한다고 생각해요.',
      'Bir umr birga bo‘lish uchun sherikning o‘zgarishini ham qabul qilish kerak deb o‘ylayman.',
      'I think spending a lifetime together means accepting how each person changes.',
      'Я думаю, что совместная жизнь означает принятие изменений друг друга.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['lifetime', 'speaking'],
  },

  s6u1_475_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '평생 함께하고 싶다는 말에는 관계를 계속 지키겠다는 마음도 들어 있다는 문장을 만드세요.',
      'Bir umr birga bo‘lish istagida munosabatni saqlash niyati ham borligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Saying you want to stay together for life also contains a commitment to protect the relationship.”',
      'Составьте предложение: «Желание быть вместе всю жизнь также включает намерение беречь отношения».',
    ),
    options: [
      '마음도',
      '계속',
      '들어',
      '관계를',
      '함께하고',
      '지키겠다는',
      '평생',
      '싶다는',
      '말에는',
      '있어요',
      '끝내겠다는',
    ],
    answer:
      '평생 함께하고 싶다는 말에는 관계를 계속 지키겠다는 마음도 들어 있어요',
    answerTranslation: L(
      '평생 함께하고 싶다는 것은 관계를 계속 지키고 싶다는 의미도 있어요.',
      'Bir umr birga bo‘lish istagi munosabatni saqlash niyatini ham bildiradi.',
      'Wanting to stay together for life also means wanting to preserve the relationship.',
      'Желание быть вместе всю жизнь также означает желание сохранять отношения.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lifetime', 'commitment', 'translate-builder'],
  },

  s6u1_476_listening: {
    type: 'listening',
    instruction: L(
      '부부가 오래 함께 지낼 수 있었던 이유를 고르세요.',
      'Er-xotin nima uchun uzoq birga yashay olganini tanlang.',
      'Choose why the married couple was able to stay together for a long time.',
      'Выберите, почему супруги смогли долго быть вместе.',
    ),
    audioText:
      '우리가 처음부터 모든 것이 잘 맞았던 건 아니에요. 서로 성격도 달랐고 많이 다투기도 했어요. 그래도 문제가 생길 때마다 이야기하고 서로 조금씩 맞춰 왔기 때문에 오랫동안 함께할 수 있었어요.',
    options: [
      '문제가 생길 때마다 대화하고 서로 맞춰 왔기 때문에',
      '처음부터 모든 생각이 완전히 같았기 때문에',
      '한 번도 다툰 적이 없었기 때문에',
      '서로의 변화를 모두 막았기 때문에',
    ],
    answer: '문제가 생길 때마다 대화하고 서로 맞춰 왔기 때문에',
    answerTranslation: L(
      '두 사람은 문제가 생길 때마다 대화하고 서로 맞춰 왔어요.',
      'Ular muammo chiqqanida gaplashib, bir-biriga moslashib kelgan.',
      'They stayed together by communicating and adjusting to each other whenever problems arose.',
      'Они долго были вместе, потому что при проблемах разговаривали и приспосабливались друг к другу.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['lifetime', 'relationship', 'listening'],
  },

  s6u1_477_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '한 사람이 살아가는 전체 기간은 ___이고, 다른 사람과 그 시간을 같이 보내는 것은 ___하는 거예요.',
    blankAnswers: ['일생', '함께'],
    options: ['일생', '함께', '단계', '유효기간', '처음'],
    answer: '일생|함께',
    answerTranslation: L(
      '일생과 함께의 의미를 연결해서 익혀요.',
      '일생 va 함께 ma’nolarini bog‘lab o‘rganamiz.',
      'Practice the connection between 일생 and 함께.',
      'Практикуем связь между 일생 и 함께.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['lifetime', 'together', 'multi-blank'],
  },

  s6u1_478_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '변화도',
      '서로의',
      '함께해야',
      '받아들이며',
      '오래',
      '해요',
      '일생을',
      '거부하며',
    ],
    answer: '일생을 함께하려면 서로의 변화도 받아들여야 해요',
    audioText: '일생을 함께하려면 서로의 변화도 받아들여야 해요.',
    answerTranslation: L(
      '평생 함께하려면 서로 변하는 모습도 받아들여야 해요.',
      'Bir umr birga bo‘lish uchun bir-birining o‘zgarishini ham qabul qilish kerak.',
      'A lifetime together requires accepting each other’s changes.',
      'Чтобы прожить вместе всю жизнь, нужно принимать изменения друг друга.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lifetime', 'change', 'word-arrange'],
  },

  s6u1_479_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`사람의 전체 삶`은 ___이고, `다른 사람과 같이하다`는 기본 동사는 ___예요.',
    blankAnswers: ['일생', '함께하다'],
    answerTranslation: L(
      '일생과 함께하다를 입력해요.',
      '일생 va 함께하다 so‘zlarini yozamiz.',
      'Enter 일생 and 함께하다.',
      'Введите 일생 и 함께하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The answers are 일생 and 함께하다.',
      acceptedAnswers: [],
      notes: ['Require exact answers in order.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['lifetime', 'together', 'type-answer'],
  },

  s6u1_480_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글쓴이의 `평생 함께하는 사랑`에 대한 생각을 가장 잘 요약한 것을 고르세요.',
      'Muallifning umr bo‘yi birga bo‘lish haqidagi fikrini eng yaxshi umumlashtirgan javobni tanlang.',
      'Choose the best summary of the writer’s view of lifelong love.',
      'Выберите лучшее изложение взгляда автора на любовь на всю жизнь.',
    ),
    passage:
      '평생 함께하는 사랑은 감정이 한 번도 변하지 않는 사랑이라고 생각하지 않습니다. 사람도 변하고 상황도 변합니다. 그때마다 서로를 새롭게 이해하고 관계를 다시 맞춰 가는 것이 오랫동안 함께하는 사랑이라고 생각합니다.',
    options: [
      '변화를 받아들이며 계속 서로를 이해하는 사랑',
      '처음 감정을 절대로 바꾸지 않는 사랑',
      '갈등이 한 번도 생기지 않는 사랑',
      '한 사람이 모든 변화를 포기하는 사랑',
    ],
    answer: '변화를 받아들이며 계속 서로를 이해하는 사랑',
    answerTranslation: L(
      '변화를 받아들이고 계속 서로 이해하려는 사랑이 오래가는 사랑이라고 해요.',
      'O‘zgarishni qabul qilib, bir-birini tushunishda davom etadigan sevgi uzoq davom etadi.',
      'Lifelong love means accepting change and continually understanding each other.',
      'Любовь на всю жизнь — это принятие изменений и постоянное взаимопонимание.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lifetime', 'love', 'reading'],
  },

  // ────────────────────────────────────────────────────────────
  // Lesson 5 · 처음의 사랑과 변화 종합
  // q481 ~ q500
  // ────────────────────────────────────────────────────────────

  s6u1_481_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '처음으로 사랑에 빠졌을 때는 그 감정이 영원할 것 같았다는 문장을 만드세요.',
      'Birinchi marta sevib qolganingizda bu his abadiy davom etadigandek tuyulganini bildiradigan gap tuzing.',
      'Build a sentence meaning: “When I fell in love for the first time, I thought the feeling would last forever.”',
      'Составьте предложение: «Когда я впервые влюбился, мне казалось, что это чувство будет вечным».',
    ),
    options: [
      '감정이',
      '빠졌을',
      '사랑에',
      '같았어요',
      '그',
      '처음으로',
      '영원할',
      '때는',
      '끝날',
    ],
    answer: '처음으로 사랑에 빠졌을 때는 그 감정이 영원할 것 같았어요',
    answerTranslation: L(
      '처음 사랑에 빠졌을 때는 그 마음이 평생 계속될 것 같았어요.',
      'Birinchi marta sevib qolganimda bu his bir umr davom etadigandek tuyuldi.',
      'When I first fell in love, I felt the emotion would last forever.',
      'Когда я впервые влюбился, мне казалось, что чувство будет вечным.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['first-time', 'eternal', 'translate-builder'],
  },

  s6u1_482_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`생애 첫 번째로`라는 뜻의 표현은 ___이고, `끝없이 계속되다`라는 뜻의 형용사는 ___예요.',
    blankAnswers: ['처음으로', '영원하다'],
    answerTranslation: L(
      '처음으로와 영원하다의 의미를 구별해요.',
      '처음으로 va 영원하다 ma’nolarini farqlaymiz.',
      'Distinguish 처음으로 and 영원하다.',
      'Различаем 처음으로 и 영원하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target answers are 처음으로 and 영원하다.',
      acceptedAnswers: [],
      notes: ['Require 처음으로 then 영원하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['first-time', 'eternal', 'type-answer'],
  },

  s6u1_483_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '인생에서 ___ 사랑에 빠진 경험은 오래 기억될 수 있고 그때는 사랑이 ___할 것처럼 느껴질 수도 있어요.',
    blankAnswers: ['처음으로', '영원'],
    options: ['처음으로', '영원', '단계', '유효기간', '일생'],
    answer: '처음으로|영원',
    answerTranslation: L(
      '처음 사랑에 빠진 경험에서는 사랑이 영원할 것처럼 느껴질 수 있어요.',
      'Birinchi sevgi tajribasida sevgi abadiydek tuyulishi mumkin.',
      'A first experience of love can feel as if it will last forever.',
      'Первый опыт любви может казаться вечным.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['first-time', 'eternal', 'multi-blank'],
  },

  s6u1_484_listening: {
    type: 'listening',
    instruction: L(
      '화자가 첫사랑을 통해 알게 된 것을 고르세요.',
      'So‘zlovchi birinchi sevgisi orqali nimani tushunganini tanlang.',
      'Choose what the speaker learned from their first love.',
      'Выберите, что говорящий понял благодаря первой любви.',
    ),
    audioText:
      '처음으로 사랑에 빠졌을 때는 이 사람과 무조건 평생 함께할 거라고 생각했어요. 결국 헤어졌지만 그 경험을 통해 사랑도 변할 수 있고 관계에는 노력이 필요하다는 걸 배웠어요.',
    options: [
      '사랑도 변할 수 있고 관계에는 노력이 필요하다',
      '첫사랑은 반드시 결혼으로 이어진다',
      '한 번 사랑하면 감정은 절대로 변하지 않는다',
      '헤어진 사랑에는 아무 의미가 없다',
    ],
    answer: '사랑도 변할 수 있고 관계에는 노력이 필요하다',
    answerTranslation: L(
      '화자는 첫사랑을 통해 사랑의 변화와 관계의 노력을 배웠어요.',
      'So‘zlovchi birinchi sevgidan sevgi o‘zgarishi va munosabatda harakat kerakligini o‘rgandi.',
      'The speaker learned that love can change and relationships require effort.',
      'Говорящий понял, что любовь может меняться, а отношения требуют усилий.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['first-time', 'love-change', 'listening'],
  },

  s6u1_485_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '처음 사랑했을 때의 마음과 지금의 마음이 다르다고 해서 현재의 사랑이 약한 것은 아니라는 문장을 만드세요.',
      'Dastlabki sevgi hissi bilan hozirgi his boshqacha bo‘lsa ham, hozirgi sevgi kuchsiz degani emasligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “The fact that love feels different now than at first does not mean the current love is weaker.”',
      'Составьте предложение: «То, что нынешние чувства отличаются от первых, не означает, что нынешняя любовь слабее».',
    ),
    options: [
      '현재의',
      '해서',
      '약한',
      '지금의',
      '것은',
      '처음',
      '사랑이',
      '마음과',
      '다르다고',
      '아니에요',
      '끝난',
    ],
    answer:
      '처음 마음과 지금의 마음이 다르다고 해서 현재의 사랑이 약한 것은 아니에요',
    answerTranslation: L(
      '처음과 지금의 감정이 달라도 지금의 사랑이 약하다는 뜻은 아니에요.',
      'Dastlabki va hozirgi his boshqacha bo‘lsa ham, hozirgi sevgi kuchsiz degani emas.',
      'Different feelings now do not necessarily mean weaker love.',
      'Разница между первоначальными и нынешними чувствами не означает более слабую любовь.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['first-feeling', 'love-change', 'translate-builder'],
  },

  s6u1_486_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '사랑에',
      '빠졌던',
      '기억나요',
      '처음으로',
      '날이',
      '아직도',
      '유효기간이',
    ],
    answer: '처음으로 사랑에 빠졌던 날이 아직도 기억나요',
    audioText: '처음으로 사랑에 빠졌던 날이 아직도 기억나요.',
    answerTranslation: L(
      '처음 사랑에 빠진 날을 아직도 기억해요.',
      'Birinchi marta sevib qolgan kunim hali ham esimda.',
      'I still remember the day I fell in love for the first time.',
      'Я до сих пор помню день, когда впервые влюбился.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['first-time', 'word-arrange'],
  },

  s6u1_487_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`생애에서 첫 번째로`는 ___이고, `사랑하는 감정이 약해지다`는 `사랑이 ___`예요.',
    blankAnswers: ['처음으로', '식다'],
    answerTranslation: L(
      '처음으로와 사랑이 식다를 구별해서 입력해요.',
      '처음으로 va 사랑이 식다 ifodalarini farqlab yozamiz.',
      'Enter 처음으로 and 식다 in the correct meanings.',
      'Введите 처음으로 и 식다 в правильном порядке.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The answers must be 처음으로 and 식다.',
      acceptedAnswers: [],
      notes: ['Require correct order.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['first-time', 'love-cool', 'type-answer'],
  },

  s6u1_488_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글쓴이가 첫사랑에 대해 현재 가지고 있는 생각을 고르세요.',
      'Muallifning birinchi sevgi haqidagi hozirgi fikrini tanlang.',
      'Choose the writer’s current view of first love.',
      'Выберите нынешний взгляд автора на первую любовь.',
    ),
    passage:
      '처음으로 사랑에 빠졌을 때는 그 사람이 제 인생의 마지막 사랑이라고 생각했습니다. 결국 우리는 헤어졌지만 저는 그 관계가 실패였다고 생각하지 않습니다. 상대방을 이해하는 법과 제 감정을 표현하는 법을 처음 배운 소중한 경험이었기 때문입니다.',
    options: [
      '끝났지만 관계와 사랑을 배우게 한 의미 있는 경험이다',
      '결혼하지 못했기 때문에 완전히 실패한 관계다',
      '헤어진 뒤에는 아무것도 남지 않았다',
      '첫사랑은 반드시 평생 계속되어야 한다',
    ],
    answer: '끝났지만 관계와 사랑을 배우게 한 의미 있는 경험이다',
    answerTranslation: L(
      '첫사랑이 끝났어도 관계에 대해 배우게 한 의미 있는 경험이었다고 생각해요.',
      'Birinchi sevgi tugagan bo‘lsa ham, munosabat haqida o‘rgatgan muhim tajriba bo‘lgan.',
      'The writer sees first love as meaningful because it taught them about relationships.',
      'Автор считает первую любовь ценным опытом, научившим его отношениям.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['first-time', 'love', 'reading'],
  },

  s6u1_489_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText: '저는 작년에 태어나서 처음으로 사랑에 식었어요.',
    wrongWord: '식었어요.',
    options: ['빠졌어요.', '식었어요.', '끝났어요.', '변했어요.'],
    answer: '빠졌어요.',
    answerTranslation: L(
      '저는 작년에 태어나서 처음으로 사랑에 빠졌어요.',
      'Men o‘tgan yili hayotimda birinchi marta sevib qoldim.',
      'Last year, I fell in love for the first time in my life.',
      'В прошлом году я впервые в жизни влюбился.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['first-time', 'error-hunt'],
  },

  s6u1_490_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '처음으로 누군가를 사랑했던 경험이 지금의 관계를 이해하는 데 도움이 되었다는 문장을 만드세요.',
      'Birinchi marta kimnidir sevish tajribasi hozirgi munosabatni tushunishga yordam berganini bildiradigan gap tuzing.',
      'Build a sentence meaning: “My first experience of loving someone helped me understand my current relationship.”',
      'Составьте предложение: «Первый опыт любви помог мне лучше понять нынешние отношения».',
    ),
    options: [
      '도움이',
      '사랑했던',
      '지금의',
      '이해하는',
      '누군가를',
      '관계를',
      '경험이',
      '처음으로',
      '됐어요',
      '데',
      '방해가',
    ],
    answer:
      '처음으로 누군가를 사랑했던 경험이 지금의 관계를 이해하는 데 도움이 됐어요',
    answerTranslation: L(
      '첫사랑 경험이 현재 관계를 이해하는 데 도움이 됐어요.',
      'Birinchi sevgi tajribam hozirgi munosabatni tushunishimga yordam berdi.',
      'My first experience of love helped me understand my current relationship.',
      'Первый опыт любви помог мне понять нынешние отношения.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['first-time', 'experience', 'translate-builder'],
  },

  s6u1_491_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 두 표현을 입력하세요.',
      'Eshitgan gapingizdagi tushib qolgan ikki ifodani yozing.',
      'Type the two missing expressions.',
      'Введите два пропущенных выражения.',
    ),
    audioText: '처음으로 사랑에 빠졌을 때는 그 사랑이 영원할 줄 알았어요.',
    sentenceTemplate: '___ 사랑에 빠졌을 때는 그 사랑이 ___할 줄 알았어요.',
    blankAnswers: ['처음으로', '영원'],
    answerTranslation: L(
      '처음 사랑에 빠졌을 때는 그 사랑이 영원할 줄 알았어요.',
      'Birinchi marta sevib qolganimda bu sevgi abadiy bo‘ladi deb o‘ylagandim.',
      'When I first fell in love, I thought the love would last forever.',
      'Когда я впервые влюбился, я думал, что эта любовь будет вечной.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated answers are 처음으로 and 영원.',
      acceptedAnswers: [],
      notes: ['Require 처음으로 then 영원.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['first-time', 'eternal', 'listen-fill'],
  },

  s6u1_492_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '___ 사랑에 빠졌을 때는 감정이 ___할 것처럼 느껴질 수 있습니다. 하지만 시간이 지나며 사랑은 여러 ___를 거치고 모습이 달라질 수도 있습니다.',
    blankAnswers: ['처음으로', '영원', '단계'],
    options: ['처음으로', '영원', '단계', '유효기간', '신혼여행'],
    answer: '처음으로|영원|단계',
    answerTranslation: L(
      '처음 사랑은 영원할 것 같지만 시간이 지나며 여러 단계로 변할 수도 있어요.',
      'Birinchi sevgi abadiydek tuyulishi mumkin, ammo vaqt o‘tishi bilan turli bosqichlarga o‘tadi.',
      'First love may feel eternal, but love can change through different stages over time.',
      'Первая любовь может казаться вечной, но со временем любовь проходит разные этапы.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['first-time', 'eternal', 'stage', 'cloze'],
  },

  s6u1_493_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`___으로 사랑에 빠지다`와 `사랑이 ___하다`에 들어갈 단어를 순서대로 입력하세요.',
    blankAnswers: ['처음', '영원'],
    answerTranslation: L(
      '처음으로 사랑에 빠지다와 사랑이 영원하다를 연습해요.',
      '처음으로 사랑에 빠지다 va 사랑이 영원하다 ifodalarini mashq qilamiz.',
      'Practice 처음으로 사랑에 빠지다 and 사랑이 영원하다.',
      'Практикуем 처음으로 사랑에 빠지다 и 사랑이 영원하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The required answers are 처음 and 영원.',
      acceptedAnswers: [],
      notes: ['Require 처음 then 영원.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['first-time', 'eternal', 'type-answer'],
  },

  s6u1_494_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '처음의 사랑과 지금의 사랑이 달라도 서로를 아끼는 마음은 계속될 수 있다고 생각해요.',
    audioText:
      '처음의 사랑과 지금의 사랑이 달라도 서로를 아끼는 마음은 계속될 수 있다고 생각해요.',
    answerTranslation: L(
      '사랑의 모습이 처음과 달라도 서로를 소중하게 생각하는 마음은 계속될 수 있어요.',
      'Sevgi shakli avvalgidan boshqacha bo‘lsa ham, bir-birini qadrlash davom etishi mumkin.',
      'Even if love feels different from the beginning, care for each other can continue.',
      'Даже если любовь отличается от первоначальной, забота друг о друге может сохраняться.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['first-love', 'change', 'speaking'],
  },

  s6u1_495_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '사랑의 유효기간을 걱정하기보다 지금의 관계를 잘 돌보는 것이 더 중요하다는 문장을 만드세요.',
      'Sevgining muddati haqida xavotir olishdan ko‘ra hozirgi munosabatni yaxshi asrash muhimroq ekanini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Taking care of the relationship now is more important than worrying about love’s expiration date.”',
      'Составьте предложение: «Важнее заботиться о нынешних отношениях, чем переживать о сроке любви».',
    ),
    options: [
      '더',
      '걱정하기보다',
      '사랑의',
      '잘',
      '관계를',
      '지금의',
      '돌보는',
      '유효기간을',
      '중요해요',
      '끝내는',
    ],
    answer:
      '사랑의 유효기간을 걱정하기보다 지금의 관계를 잘 돌보는 것이 더 중요해요',
    answerTranslation: L(
      '사랑이 언제 끝날지 걱정하기보다 현재 관계를 잘 지키는 것이 중요해요.',
      'Sevgi qachon tugashi haqida xavotir olishdan ko‘ra hozirgi munosabatni asrash muhimroq.',
      'It is more important to care for the current relationship than worry about when love might end.',
      'Важнее заботиться о нынешних отношениях, чем беспокоиться о том, когда любовь закончится.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['expiration-period', 'relationship', 'translate-builder'],
  },

  s6u1_496_listening: {
    type: 'listening',
    instruction: L(
      '화자의 사랑에 대한 최종 생각을 고르세요.',
      'So‘zlovchining sevgi haqidagi yakuniy fikrini tanlang.',
      'Choose the speaker’s final view of love.',
      'Выберите итоговый взгляд говорящего на любовь.',
    ),
    audioText:
      '예전에는 사랑이 영원한지 아닌지가 제일 궁금했어요. 지금은 사랑에 정답이 있다고 생각하지 않아요. 중요한 건 지금 함께하는 사람을 이해하고 관계를 소중하게 만드는 거라고 생각해요.',
    options: [
      '사랑의 기간보다 현재 관계를 잘 만들어 가는 것이 중요하다',
      '사랑에는 누구에게나 같은 정답이 있다',
      '영원하지 않은 사랑은 모두 의미가 없다',
      '사랑은 처음의 모습이 절대로 변하면 안 된다',
    ],
    answer: '사랑의 기간보다 현재 관계를 잘 만들어 가는 것이 중요하다',
    answerTranslation: L(
      '화자는 사랑의 기간보다 현재 관계를 소중하게 만드는 것을 중요하게 생각해요.',
      'So‘zlovchi sevgi muddatidan ko‘ra hozirgi munosabatni qadrlashni muhim deb biladi.',
      'The speaker values building the present relationship more than worrying about how long love lasts.',
      'Говорящий считает важнее заботиться о нынешних отношениях, чем думать о сроке любви.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['love', 'relationship', 'listening'],
  },

  s6u1_497_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '생애에서 첫 번째 경험은 ___이라고 표현할 수 있고 사랑하는 마음이 약해지는 것은 사랑이 ___다고 해요.',
    blankAnswers: ['처음', '식는'],
    options: ['처음', '식는', '영원', '단계', '유효기간'],
    answer: '처음|식는',
    answerTranslation: L(
      '처음과 사랑이 식다를 함께 복습해요.',
      '처음 va 사랑이 식다 ifodalarini birga takrorlaymiz.',
      'Review 처음 and 사랑이 식다 together.',
      'Повторяем 처음 и 사랑이 식다.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['first-time', 'love-cool', 'multi-blank'],
  },

  s6u1_498_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '관계가',
      '사랑이',
      '변해도',
      '계속될',
      '수 있어요',
      '좋은',
      '끝나도',
      '유효기간이',
    ],
    answer: '사랑이 변해도 좋은 관계가 계속될 수 있어요',
    audioText: '사랑이 변해도 좋은 관계가 계속될 수 있어요.',
    answerTranslation: L(
      '사랑의 모습이 달라져도 좋은 관계는 계속될 수 있어요.',
      'Sevgi shakli o‘zgarsa ham yaxshi munosabat davom etishi mumkin.',
      'A good relationship can continue even as love changes.',
      'Хорошие отношения могут продолжаться, даже если любовь меняется.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-change', 'relationship', 'word-arrange'],
  },

  s6u1_499_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '`사랑의 ___`은 사랑의 지속 기간을 비유적으로 말하고, `___으로`는 인생에서 첫 번째 경험을 말할 때 사용해요.',
    blankAnswers: ['유효기간', '처음'],
    answerTranslation: L(
      '사랑의 유효기간과 처음으로를 마지막으로 복습해요.',
      '사랑의 유효기간 va 처음으로 ifodalarini yakuniy takrorlaymiz.',
      'Review 사랑의 유효기간 and 처음으로.',
      'Повторяем 사랑의 유효기간 и 처음으로.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The answers are 유효기간 and 처음.',
      acceptedAnswers: [],
      notes: ['Require 유효기간 then 처음.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['expiration-period', 'first-time', 'type-answer'],
  },

  s6u1_500_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      'Unit 1의 사랑에 대한 내용을 가장 잘 요약한 것을 고르세요.',
      'Unit 1 dagi sevgi haqidagi mazmunni eng yaxshi umumlashtirgan javobni tanlang.',
      'Choose the statement that best summarizes this unit’s view of love.',
      'Выберите утверждение, лучше всего передающее содержание раздела о любви.',
    ),
    passage:
      '처음으로 사랑에 빠질 때는 그 감정이 영원할 것처럼 느껴질 수 있습니다. 시간이 지나면서 설렘이 줄거나 사랑이 식은 것처럼 느껴질 때도 있습니다. 그러나 사랑은 여러 단계를 거치며 다른 모습으로 변할 수 있습니다. 중요한 것은 유효기간을 걱정하는 것보다 서로 이해하고 관계를 위해 노력하며 일생을 함께할 수 있는 관계를 만드는 것입니다.',
    options: [
      '사랑은 변할 수 있지만 이해와 노력으로 오래 이어 갈 수 있다',
      '처음의 설렘이 줄면 사랑은 반드시 끝난다',
      '모든 사랑에는 정확히 같은 유효기간이 있다',
      '사랑은 평생 처음과 완전히 같은 모습이어야 한다',
    ],
    answer: '사랑은 변할 수 있지만 이해와 노력으로 오래 이어 갈 수 있다',
    answerTranslation: L(
      '사랑은 변할 수 있지만 서로 이해하고 노력하면 오래 함께할 수 있다는 내용이에요.',
      'Sevgi o‘zgarishi mumkin, ammo tushunish va harakat bilan uzoq davom etishi mumkin.',
      'Love can change, but mutual understanding and effort can help it last.',
      'Любовь может меняться, но взаимопонимание и усилия помогают ей продолжаться.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['section6', 'unit1', 'node5', 'love', 'review', 'reading'],
  },
};

const S6_UNIT1_NODE5_WORDS = [
  {
    code: 'love-eternal',
    korean: '영원하다',
    senseKey: 'last-forever',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: L(
      '끝이 없이 계속되다',
      'abadiy davom etmoq',
      'to be eternal; to last forever',
      'быть вечным; длиться вечно',
    ),
    examples: [
      {
        korean: '모든 사람은 사랑이 영원하기를 바라기도 해요.',
        translations: L(
          '사랑이 끝없이 계속되기를 바라는 사람도 많아요.',
          'Ko‘p odamlar sevgi abadiy davom etishini xohlaydi.',
          'Many people hope love will last forever.',
          'Многие надеются, что любовь будет вечной.',
        ),
      },
    ],
    pronunciation: {
      hangul: '영원하다',
      romanization: 'yeongwonhada',
      ttsText: '영원하다',
    },
    media: {
      emoji: '♾️',
      imageUrl: '',
      imageAlt: L(
        '끝없이 이어지는 사랑',
        'abadiy davom etayotgan sevgi',
        'love continuing forever',
        'вечная любовь',
      ),
    },
    tags: ['love', 'eternal', 'relationship'],
    difficulty: 5,
    usageNote: L(
      '`영원한 사랑`, `사랑이 영원하다`처럼 사용해요.',
      '`영원한 사랑`, `사랑이 영원하다` kabi ishlatiladi.',
      'Common expressions include 영원한 사랑 and 사랑이 영원하다.',
      'Частые выражения: 영원한 사랑 и 사랑이 영원하다.',
    ),
    isCore: true,
  },

  {
    code: 'love-validity-period',
    korean: '유효기간',
    senseKey: 'validity-or-expiration-period',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '효력이나 가치가 유지되는 정해진 기간',
      'amal qilish muddati',
      'validity period; expiration period',
      'срок действия',
    ),
    examples: [
      {
        korean: '사랑에도 유효기간이 있다는 말에 동의하세요?',
        translations: L(
          '사랑에도 정해진 기간이 있다는 생각에 동의하세요?',
          'Sevgining ham amal qilish muddati bor degan fikrga qo‘shilasizmi?',
          'Do you agree with the idea that love has an expiration period?',
          'Вы согласны с мнением, что у любви есть срок действия?',
        ),
      },
    ],
    pronunciation: {
      hangul: '유효기간',
      romanization: 'yuhyogigan',
      ttsText: '유효기간',
    },
    media: {
      emoji: '⏳',
      imageUrl: '',
      imageAlt: L(
        '기간이 표시된 시간표',
        'muddatni ko‘rsatuvchi vaqt belgisi',
        'a symbol showing a limited period',
        'символ ограниченного срока',
      ),
    },
    tags: ['love', 'time', 'duration'],
    difficulty: 5,
    usageNote: L(
      '원래 상품이나 문서 등의 효력이 유지되는 기간을 말하지만 `사랑의 유효기간`처럼 비유적으로도 쓸 수 있어요.',
      'Aslida mahsulot yoki hujjat muddati uchun ishlatiladi, lekin `사랑의 유효기간` kabi ko‘chma ma’noda ham qo‘llanadi.',
      'It normally refers to the valid period of a product or document, but can be used metaphorically as in 사랑의 유효기간.',
      'Обычно обозначает срок действия товара или документа, но может употребляться образно: 사랑의 유효기간.',
    ),
    isCore: true,
  },

  {
    code: 'love-cool-down',
    korean: '사랑이 식다',
    senseKey: 'romantic-feelings-cool',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '사랑하는 감정이 예전보다 약해지다',
      'sevgi hissi sovimoq',
      'for love to cool; for romantic feelings to fade',
      'любовь остывает; чувства ослабевают',
    ),
    examples: [
      {
        korean: '설렘이 줄었다고 해서 반드시 사랑이 식은 것은 아니에요.',
        translations: L(
          '처음의 설렘이 줄어도 사랑 자체가 약해진 것은 아닐 수 있어요.',
          'Hayajon kamaygan bo‘lsa ham, sevgi albatta sovigan degani emas.',
          'Less excitement does not necessarily mean that love has cooled.',
          'Уменьшение волнения не обязательно означает, что любовь остыла.',
        ),
      },
    ],
    pronunciation: {
      hangul: '사랑이 식다',
      romanization: 'sarangi sikda',
      ttsText: '사랑이 식다',
    },
    media: {
      emoji: '💔',
      imageUrl: '',
      imageAlt: L(
        '예전보다 약해진 사랑의 감정',
        'avvalgidan sustlashgan sevgi hissi',
        'romantic feelings becoming weaker',
        'ослабевающие романтические чувства',
      ),
    },
    tags: ['love', 'emotion', 'change'],
    difficulty: 5,
    usageNote: L(
      '`식다`는 원래 뜨겁던 것이 차가워지는 뜻도 있고, 감정이 약해지는 뜻으로도 사용해요.',
      '`식다` aslida issiq narsaning sovishini bildiradi, shuningdek hisning kamayishiga ham ishlatiladi.',
      '식다 literally means to cool down and can metaphorically describe fading feelings.',
      '식다 буквально означает «остыть» и переносно используется об ослаблении чувств.',
    ),
    isCore: true,
  },

  {
    code: 'general-stage',
    korean: '단계',
    senseKey: 'stage-in-process',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '어떤 과정이 진행될 때 나누어지는 각각의 부분',
      'jarayon bosqichi',
      'stage; phase',
      'этап; стадия',
    ),
    examples: [
      {
        korean: '사랑은 시간이 지나면서 여러 단계를 거칠 수 있어요.',
        translations: L(
          '사랑은 관계가 깊어지면서 여러 과정으로 달라질 수 있어요.',
          'Sevgi vaqt o‘tishi bilan turli bosqichlardan o‘tishi mumkin.',
          'Love can pass through different stages over time.',
          'Любовь может проходить разные этапы со временем.',
        ),
      },
    ],
    pronunciation: {
      hangul: '단계',
      romanization: 'dangye',
      ttsText: '단계',
    },
    media: {
      emoji: '🪜',
      imageUrl: '',
      imageAlt: L(
        '여러 단계로 올라가는 계단',
        'turli bosqichlarni bildiruvchi zina',
        'steps representing different stages',
        'ступени, обозначающие разные этапы',
      ),
    },
    tags: ['process', 'stage', 'love'],
    difficulty: 4,
    usageNote: L(
      '`첫 단계`, `다음 단계`, `여러 단계를 거치다`처럼 사용할 수 있어요.',
      '`첫 단계`, `다음 단계`, `여러 단계를 거치다` kabi ishlatiladi.',
      'Common expressions include 첫 단계, 다음 단계, and 여러 단계를 거치다.',
      'Частые выражения: 첫 단계, 다음 단계 и 여러 단계를 거치다.',
    ),
    isCore: true,
  },

  {
    code: 'life-entire-life',
    korean: '일생',
    senseKey: 'entire-human-life',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: L(
      '사람이 태어나서 죽을 때까지 살아가는 전체 기간',
      'insonning butun umri',
      'one’s entire life; lifetime',
      'вся жизнь',
    ),
    examples: [
      {
        korean: '사랑하는 사람과 일생을 함께하고 싶어요.',
        translations: L(
          '사랑하는 사람과 평생을 함께 보내고 싶어요.',
          'Sevgan insonim bilan butun umrimni birga o‘tkazmoqchiman.',
          'I want to spend my entire life with the person I love.',
          'Я хочу провести всю жизнь с любимым человеком.',
        ),
      },
    ],
    pronunciation: {
      hangul: '일생',
      romanization: 'ilsaeng',
      ttsText: '일생',
    },
    media: {
      emoji: '🌅',
      imageUrl: '',
      imageAlt: L(
        '한 사람의 전체 인생',
        'insonning butun umri',
        'a person’s entire lifetime',
        'вся жизнь человека',
      ),
    },
    tags: ['life', 'lifetime', 'relationship'],
    difficulty: 5,
    usageNote: L(
      '`일생을 보내다`, `일생을 함께하다`처럼 사용할 수 있어요.',
      '`일생을 보내다`, `일생을 함께하다` kabi ishlatiladi.',
      'Common expressions include 일생을 보내다 and 일생을 함께하다.',
      'Частые выражения: 일생을 보내다 и 일생을 함께하다.',
    ),
    isCore: true,
  },

  {
    code: 'general-first-time',
    korean: '처음으로',
    senseKey: 'for-the-first-time',
    partOfSpeech: WordPartOfSpeech.ADVERB,
    meaning: L(
      '어떤 일을 생애나 경험에서 첫 번째로',
      'birinchi marta',
      'for the first time',
      'впервые',
    ),
    examples: [
      {
        korean: '저는 대학생 때 처음으로 사랑에 빠졌어요.',
        translations: L(
          '저는 대학생이었을 때 처음 사랑에 빠졌어요.',
          'Men talabalik paytimda birinchi marta sevib qoldim.',
          'I fell in love for the first time when I was a university student.',
          'Я впервые влюбился, когда был студентом.',
        ),
      },
    ],
    pronunciation: {
      hangul: '처음으로',
      romanization: 'cheoeumeuro',
      ttsText: '처음으로',
    },
    media: {
      emoji: '1️⃣',
      imageUrl: '',
      imageAlt: L(
        '첫 번째 경험',
        'birinchi tajriba',
        'a first experience',
        'первый опыт',
      ),
    },
    tags: ['time', 'experience', 'first'],
    difficulty: 4,
    usageNote: L(
      '`처음으로 만나다`, `처음으로 사랑에 빠지다`, `처음으로 알게 되다`처럼 사용해요.',
      '`처음으로 만나다`, `처음으로 사랑에 빠지다` kabi ishlatiladi.',
      'Common patterns include 처음으로 만나다 and 처음으로 사랑에 빠지다.',
      'Частые конструкции: 처음으로 만나다 и 처음으로 사랑에 빠지다.',
    ),
    isCore: true,
  },

  {
    code: 'love-expiration-period',
    korean: '사랑의 유효기간',
    senseKey: 'metaphorical-expiration-period-of-love',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '사랑하는 감정이 유지되는 기간을 유효기간에 비유한 표현',
      'sevgi hissining davom etish muddatini ifodalovchi ko‘chma ibora',
      'the metaphorical expiration period of love',
      'образный «срок действия» любви',
    ),
    examples: [
      {
        korean: '사랑의 유효기간이 정말 정해져 있다고 생각하세요?',
        translations: L(
          '사랑에도 정해진 기간이 있다고 생각하세요?',
          'Sevgining belgilangan muddati bor deb o‘ylaysizmi?',
          'Do you think love really has a fixed expiration period?',
          'Как вы думаете, у любви действительно есть определённый срок?',
        ),
      },
    ],
    pronunciation: {
      hangul: '사랑의 유효기간',
      romanization: 'sarangui yuhyogigan',
      ttsText: '사랑의 유효기간',
    },
    media: {
      emoji: '❤️⏳',
      imageUrl: '',
      imageAlt: L(
        '시간과 사랑을 함께 나타낸 이미지',
        'sevgi va vaqtni birga ko‘rsatuvchi tasvir',
        'love represented together with time',
        'изображение любви и времени',
      ),
    },
    tags: ['love', 'duration', 'metaphor'],
    difficulty: 5,
    usageNote: L(
      '문자 그대로의 상품 유효기간이 아니라 사랑의 지속 시간을 비유적으로 표현한 말이에요.',
      'Bu mahsulot muddati emas, sevgi davomiyligini obrazli ifodalashdir.',
      'This is a metaphorical expression for how long romantic feelings last.',
      'Это образное выражение длительности романтических чувств.',
    ),
    isCore: true,
  },

  {
    code: 'love-stage',
    korean: '사랑의 단계',
    senseKey: 'stage-of-romantic-love',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '사랑과 관계가 변화하면서 거치는 각각의 과정',
      'sevgi va munosabat o‘tadigan bosqich',
      'a stage of love',
      'этап любви',
    ),
    examples: [
      {
        korean: '두 사람의 관계가 깊어지면서 사랑의 단계도 달라졌어요.',
        translations: L(
          '관계가 깊어지면서 사랑의 모습도 다음 과정으로 바뀌었어요.',
          'Munosabat chuqurlashgani sari sevgi bosqichi ham o‘zgardi.',
          'As the relationship deepened, the stage of love also changed.',
          'По мере углубления отношений этап любви тоже изменился.',
        ),
      },
    ],
    pronunciation: {
      hangul: '사랑의 단계',
      romanization: 'sarangui dangye',
      ttsText: '사랑의 단계',
    },
    media: {
      emoji: '❤️🪜',
      imageUrl: '',
      imageAlt: L(
        '여러 단계로 변하는 사랑',
        'turli bosqichlarga o‘tadigan sevgi',
        'love passing through stages',
        'любовь, проходящая разные этапы',
      ),
    },
    tags: ['love', 'stage', 'relationship'],
    difficulty: 5,
    usageNote: L(
      '사랑의 감정과 관계가 시간이 지나며 변하는 과정을 설명할 때 사용할 수 있어요.',
      'Vaqt o‘tishi bilan sevgi va munosabat o‘zgarishini tasvirlashda ishlatiladi.',
      'It can describe how romantic feelings and relationships change over time.',
      'Используется для описания изменений любви и отношений со временем.',
    ),
    isCore: true,
  },

  {
    code: 'love-eternal-love',
    korean: '영원한 사랑',
    senseKey: 'eternal-romantic-love',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '끝없이 계속되기를 바라는 사랑',
      'abadiy davom etadigan sevgi',
      'eternal love',
      'вечная любовь',
    ),
    examples: [
      {
        korean: '영원한 사랑을 원한다면 관계를 위해 계속 노력해야 해요.',
        translations: L(
          '오래가는 사랑을 위해서는 계속 노력해야 해요.',
          'Abadiy sevgi uchun munosabat ustida doim ishlash kerak.',
          'Lasting love requires continued effort in the relationship.',
          'Для долгой любви нужно постоянно работать над отношениями.',
        ),
      },
    ],
    pronunciation: {
      hangul: '영원한 사랑',
      romanization: 'yeongwonhan sarang',
      ttsText: '영원한 사랑',
    },
    media: {
      emoji: '♾️❤️',
      imageUrl: '',
      imageAlt: L(
        '영원히 이어지는 사랑',
        'abadiy davom etuvchi sevgi',
        'love lasting forever',
        'любовь, длящаяся вечно',
      ),
    },
    tags: ['love', 'eternal', 'romance'],
    difficulty: 5,
    usageNote: L(
      '`영원하다`가 명사를 꾸미면 `영원한` 형태가 돼요.',
      '`영원하다` otni aniqlaganda `영원한` shakliga o‘zgaradi.',
      '영원하다 becomes 영원한 when it modifies a noun.',
      'Перед существительным 영원하다 принимает форму 영원한.',
    ),
    isCore: false,
  },

  {
    code: 'love-share-lifetime',
    korean: '일생을 함께하다',
    senseKey: 'spend-lifetime-together',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '한 사람과 평생의 삶을 같이 보내다',
      'bir inson bilan butun umrni birga o‘tkazmoq',
      'to spend one’s life together',
      'провести всю жизнь вместе',
    ),
    examples: [
      {
        korean: '서로의 변화를 이해하면서 일생을 함께하고 싶어요.',
        translations: L(
          '서로 변하는 모습을 이해하며 평생 함께하고 싶어요.',
          'Bir-birimizdagi o‘zgarishlarni tushunib, butun umr birga bo‘lishni xohlayman.',
          'I want us to understand each other’s changes and spend our lives together.',
          'Я хочу понимать наши изменения и провести жизнь вместе.',
        ),
      },
    ],
    pronunciation: {
      hangul: '일생을 함께하다',
      romanization: 'ilsaengeul hamkkehada',
      ttsText: '일생을 함께하다',
    },
    media: {
      emoji: '👫♾️',
      imageUrl: '',
      imageAlt: L(
        '평생을 함께 보내는 두 사람',
        'butun umrni birga o‘tkazayotgan ikki inson',
        'two people spending a lifetime together',
        'двое людей, проводящих жизнь вместе',
      ),
    },
    tags: ['love', 'lifetime', 'together'],
    difficulty: 5,
    usageNote: L(
      '`평생 함께하다`와 의미가 비슷하지만 `일생`은 한 사람의 전체 삶이라는 명사예요.',
      'Ma’nosi `평생 함께하다`ga o‘xshaydi, ammo `일생` butun hayotni bildiruvchi ot.',
      'It is similar to 평생 함께하다, but 일생 is a noun meaning an entire lifetime.',
      'По смыслу близко к 평생 함께하다, но 일생 — существительное «вся жизнь».',
    ),
    isCore: false,
  },

  {
    code: 'love-first-time-fall',
    korean: '처음으로 사랑에 빠지다',
    senseKey: 'fall-in-love-first-time',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '생애에서 처음으로 누군가를 사랑하게 되다',
      'hayotda birinchi marta sevib qolmoq',
      'to fall in love for the first time',
      'впервые влюбиться',
    ),
    examples: [
      {
        korean: '저는 스무 살 때 처음으로 사랑에 빠졌어요.',
        translations: L(
          '저는 스무 살에 처음 누군가를 사랑하게 됐어요.',
          'Men yigirma yoshimda birinchi marta sevib qoldim.',
          'I fell in love for the first time when I was twenty.',
          'Я впервые влюбился в двадцать лет.',
        ),
      },
    ],
    pronunciation: {
      hangul: '처음으로 사랑에 빠지다',
      romanization: 'cheoeumeuro sarange ppajida',
      ttsText: '처음으로 사랑에 빠지다',
    },
    media: {
      emoji: '💘1️⃣',
      imageUrl: '',
      imageAlt: L(
        '처음 사랑에 빠진 사람',
        'birinchi marta sevib qolgan inson',
        'a person falling in love for the first time',
        'человек, впервые влюбившийся',
      ),
    },
    tags: ['love', 'first-time', 'romance'],
    difficulty: 5,
    usageNote: L(
      '`처음으로`는 동작 전체를 꾸미므로 `처음으로 사랑에 빠지다`처럼 사용해요.',
      '`처음으로` butun harakatni aniqlaydi: `처음으로 사랑에 빠지다`.',
      '처음으로 modifies the whole action, as in 처음으로 사랑에 빠지다.',
      '처음으로 относится ко всему действию: 처음으로 사랑에 빠지다.',
    ),
    isCore: false,
  },
] satisfies readonly WordSeedEntry[];

const S6_UNIT1_NODE6_QUESTIONS = {
  // ────────────────────────────────────────────────────────────
  // Node 6 · 연애에서 결혼까지 종합 실전
  // Lesson 1 · 첫 만남에서 연애까지
  // q501 ~ q520
  // ────────────────────────────────────────────────────────────

  s6u1_501_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '친구의 소개로 처음 만났고 두 사람 모두 서로에게 좋은 인상을 받았다는 문장을 만드세요.',
      'Do‘st tanishtirganida ilk bor uchrashib, ikkalasi ham bir-biridan yaxshi taassurot olganini bildiradigan gap tuzing.',
      'Build a sentence meaning: “They first met through a friend and both had a good impression of each other.”',
      'Составьте предложение: «Они впервые встретились благодаря другу и оба произвели друг на друга хорошее впечатление».',
    ),
    options: [
      '좋았어요',
      '친구',
      '처음',
      '인상이',
      '서로',
      '만났는데',
      '소개로',
      '나빴어요',
      '청혼으로',
    ],
    answer: '친구 소개로 처음 만났는데 서로 인상이 좋았어요',
    answerTranslation: L(
      '친구 소개로 처음 만났는데 서로 인상이 좋았어요.',
      'Do‘st tanishtirganda birinchi marta uchrashdik va bir-birimizdan yaxshi taassurot oldik.',
      'We first met through a friend and had a good impression of each other.',
      'Мы впервые встретились благодаря другу и произвели друг на друга хорошее впечатление.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['first-meeting', 'impression', 'translate-builder'],
  },

  s6u1_502_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '처음 만났을 때 좋은 느낌을 받으면 ___이 좋다고 하고, 처음 보자마자 강하게 마음이 끌리면 ___에 반했다고 해요.',
    blankAnswers: ['인상', '첫눈'],
    answerTranslation: L(
      '좋은 첫 느낌은 인상이 좋다고 하고 처음 보자마자 마음이 끌리는 것은 첫눈에 반하다예요.',
      'Yaxshi birinchi taassurot 인상, bir ko‘rishda yoqtirib qolish esa 첫눈에 반하다 bilan ifodalanadi.',
      'A good first impression uses 인상, while falling for someone immediately uses 첫눈에 반하다.',
      'Хорошее первое впечатление выражается через 인상, а любовь с первого взгляда — через 첫눈에 반하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning:
        'The learner must enter 인상 and 첫눈 in the correct order.',
      acceptedAnswers: [],
      notes: ['Require 인상 then 첫눈.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['impression', 'love-at-first-sight', 'type-answer'],
  },

  s6u1_503_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '두 사람이 서로 편하고 잘 맞으면 ___이 잘 맞는다고 할 수 있고, 생각을 쉽게 이해하면 ___이 잘 통한다고 할 수 있어요.',
    blankAnswers: ['마음', '생각'],
    options: ['마음', '생각', '외모', '학력', '청첩장'],
    answer: '마음|생각',
    answerTranslation: L(
      '마음이 잘 맞고 생각이 잘 통하는 관계를 말해요.',
      'Bu yuraklari mos va fikrlari yaxshi tushuniladigan munosabatni bildiradi.',
      'This describes a relationship where two people feel compatible and understand each other’s thoughts.',
      'Это отношения, в которых люди близки по духу и хорошо понимают мысли друг друга.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['compatibility', 'thoughts', 'multi-blank'],
  },

  s6u1_504_listening: {
    type: 'listening',
    instruction: L(
      '두 사람이 연애를 시작하게 된 가장 직접적인 이유를 고르세요.',
      'Ularning uchrashishni boshlashiga eng bevosita sababni tanlang.',
      'Choose the most direct reason the two people started dating.',
      'Выберите главную непосредственную причину, по которой они начали встречаться.',
    ),
    audioText:
      '처음에는 도서관에서 우연히 만났어요. 몇 번 더 만나 보니 대화가 정말 잘 통했고 같이 있으면 편했어요. 그러다가 서로 좋아한다는 걸 알고 사귀기 시작했어요.',
    options: [
      '대화가 잘 통하고 서로 좋아한다는 것을 알게 돼서',
      '처음부터 부모님이 결혼하라고 해서',
      '두 사람의 직업이 완전히 같아서',
      '신혼집을 먼저 구했기 때문에',
    ],
    answer: '대화가 잘 통하고 서로 좋아한다는 것을 알게 돼서',
    answerTranslation: L(
      '서로 대화가 잘 통하고 좋아한다는 사실을 알게 돼서 사귀기 시작했어요.',
      'Ular yaxshi gaplasha olishi va bir-birini yoqtirishini bilib, uchrashishni boshlashdi.',
      'They started dating after realizing they communicated well and liked each other.',
      'Они начали встречаться, поняв, что хорошо общаются и нравятся друг другу.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['dating', 'communication', 'listening'],
  },

  s6u1_505_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '처음에는 친구였지만 자주 만나면서 서로 사랑에 빠졌다는 문장을 만드세요.',
      'Avval do‘st bo‘lishgan, lekin tez-tez uchrashib bir-birini sevib qolishganini bildiradigan gap tuzing.',
      'Build a sentence meaning: “They were friends at first, but fell in love as they met more often.”',
      'Составьте предложение: «Сначала они были друзьями, но, часто встречаясь, влюбились друг в друга».',
    ),
    options: [
      '처음에는',
      '사랑에',
      '만나면서',
      '친구였지만',
      '서로',
      '자주',
      '빠졌어요',
      '헤어졌어요',
      '결혼했지만',
    ],
    answer: '처음에는 친구였지만 자주 만나면서 서로 사랑에 빠졌어요',
    answerTranslation: L(
      '처음에는 친구였지만 자주 만나면서 서로 사랑에 빠졌어요.',
      'Avval do‘st edilar, lekin tez-tez uchrashib bir-birini sevib qolishdi.',
      'They were friends at first, but fell in love as they met more often.',
      'Сначала они были друзьями, но, часто встречаясь, влюбились.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['fall-in-love', 'dating', 'translate-builder'],
  },

  s6u1_506_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '데이트했어요',
      '두',
      '타며',
      '한강',
      '사람은',
      '공원에서',
      '자전거를',
      '예식장에서',
      '청혼했어요',
    ],
    answer: '두 사람은 한강 공원에서 자전거를 타며 데이트했어요',
    audioText: '두 사람은 한강 공원에서 자전거를 타며 데이트했어요.',
    answerTranslation: L(
      '두 사람은 한강 공원에서 자전거를 타며 데이트했어요.',
      'Ular Han daryosi bog‘ida velosiped minib uchrashishdi.',
      'They went on a date riding bicycles at Han River Park.',
      'Они сходили на свидание и катались на велосипедах в парке у реки Хан.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['dating', 'activity', 'word-arrange'],
  },

  s6u1_507_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '좋아하는 마음을 상대방에게 직접 말하는 것은 ___이고, 연인이 되어 계속 만나는 것은 ___예요.',
    blankAnswers: ['고백하다', '사귀다'],
    answerTranslation: L(
      '마음을 직접 말하는 것은 고백하다이고 연인이 되어 만나는 것은 사귀다예요.',
      'Hisni ochiq aytish 고백하다, juft bo‘lib uchrashish esa 사귀다.',
      'Expressing romantic feelings directly is 고백하다, while dating as a couple is 사귀다.',
      'Признаться в чувствах — 고백하다, а встречаться как пара — 사귀다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target verbs are 고백하다 and 사귀다.',
      acceptedAnswers: [],
      notes: ['Require 고백하다 then 사귀다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['confession', 'dating', 'type-answer'],
  },

  s6u1_508_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람의 관계가 가까워지는 과정으로 맞는 것을 고르세요.',
      'Ularning yaqinlashish jarayoniga mos javobni tanlang.',
      'Choose the correct progression of their relationship.',
      'Выберите правильное развитие их отношений.',
    ),
    passage:
      '유진은 도서관에서 스티븐을 처음 만났습니다. 스티븐은 실수로 커피를 쏟은 뒤 미안하다며 저녁을 사겠다고 했습니다. 두 사람은 이후 자주 만나며 서로의 이야기를 많이 했고, 결국 좋아하는 마음을 고백한 뒤 사귀게 되었습니다.',
    options: [
      '첫 만남 → 자주 만남 → 고백 → 사귐',
      '고백 → 결혼 → 첫 만남 → 소개팅',
      '결혼 → 고백 → 첫 만남 → 이별',
      '첫 만남 → 신혼여행 → 고백 → 중매',
    ],
    answer: '첫 만남 → 자주 만남 → 고백 → 사귐',
    answerTranslation: L(
      '처음 만나고 자주 만난 뒤 고백하고 사귀게 됐어요.',
      'Avval uchrashib, keyin tez-tez ko‘rishib, hislarini aytib, uchrashishni boshlashdi.',
      'They first met, met more often, confessed their feelings, and began dating.',
      'Они встретились, стали чаще видеться, признались в чувствах и начали встречаться.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['relationship-progression', 'reading'],
  },

  s6u1_509_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText: '처음 만난 날부터 대화가 잘 통해서 서로 인상이 나빴어요.',
    wrongWord: '나빴어요.',
    options: ['좋았어요.', '나빴어요.', '식었어요.', '끝났어요.'],
    answer: '좋았어요.',
    answerTranslation: L(
      '처음 만난 날부터 대화가 잘 통해서 서로 인상이 좋았어요.',
      'Birinchi kundanoq yaxshi gaplashgani uchun bir-biridan yaxshi taassurot olishdi.',
      'They communicated well from the first day and had a good impression of each other.',
      'С первого дня они хорошо общались и понравились друг другу.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['impression', 'error-hunt'],
  },

  s6u1_510_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '처음 만난 날부터 말이 잘 통해서 금방 가까워졌다는 문장을 만드세요.',
      'Birinchi uchrashuvdanoq yaxshi suhbatlashib tez yaqinlashganini bildiradigan gap tuzing.',
      'Build a sentence meaning: “They became close quickly because they communicated well from the first day.”',
      'Составьте предложение: «Они быстро сблизились, потому что хорошо общались с первой встречи».',
    ),
    options: [
      '가까워졌어요',
      '말이',
      '날부터',
      '잘',
      '처음',
      '금방',
      '만난',
      '통해서',
      '멀어졌어요',
    ],
    answer: '처음 만난 날부터 말이 잘 통해서 금방 가까워졌어요',
    answerTranslation: L(
      '처음 만난 날부터 말이 잘 통해서 금방 가까워졌어요.',
      'Birinchi uchrashuvdanoq yaxshi gaplashib tez yaqinlashdik.',
      'We became close quickly because we communicated well from the first day.',
      'Мы быстро сблизились, потому что хорошо общались с первой встречи.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['communication', 'relationship', 'translate-builder'],
  },

  s6u1_511_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 두 표현을 입력하세요.',
      'Eshitgan gapingizdagi ikki tushib qolgan ifodani yozing.',
      'Type the two missing expressions.',
      'Введите два пропущенных выражения.',
    ),
    audioText: '그 사람과 나란히 앉아 이야기를 하니까 가슴이 두근거렸어요.',
    sentenceTemplate: '그 사람과 ___ 앉아 이야기를 하니까 ___ 두근거렸어요.',
    blankAnswers: ['나란히', '가슴이'],
    answerTranslation: L(
      '그 사람과 나란히 앉아 이야기하니 가슴이 두근거렸어요.',
      'U bilan yonma-yon o‘tirib gaplashganimda yuragim tez urdi.',
      'Sitting beside that person and talking made my heart pound.',
      'Когда я сидел рядом с этим человеком и разговаривал, сердце сильно билось.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated missing forms are 나란히 and 가슴이.',
      acceptedAnswers: [],
      notes: ['Require 나란히 then 가슴이.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['body-language', 'listen-fill'],
  },

  s6u1_512_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '민수는 지수를 보자마자 ___에 반했습니다. 몇 번 만난 뒤 자신의 마음을 ___했고, 두 사람은 그날부터 ___ 시작했습니다.',
    blankAnswers: ['첫눈', '고백', '사귀기'],
    options: ['첫눈', '고백', '사귀기', '청첩장', '이별'],
    answer: '첫눈|고백|사귀기',
    answerTranslation: L(
      '첫눈에 반한 뒤 마음을 고백하고 사귀기 시작한 이야기예요.',
      'Bir ko‘rishda yoqtirib, hislarini aytib, uchrashishni boshlagan voqea.',
      'It describes falling in love at first sight, confessing, and beginning to date.',
      'Это история о любви с первого взгляда, признании и начале отношений.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-at-first-sight', 'confession', 'cloze'],
  },

  s6u1_513_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '상대의 어깨에 몸을 살짝 의지하는 행동은 ___이고, 연인이 서로 손을 맞잡는 행동은 ___예요.',
    blankAnswers: ['어깨에 기대다', '손을 잡다'],
    answerTranslation: L(
      '어깨에 기대다와 손을 잡다를 구별해요.',
      '어깨에 기대다 va 손을 잡다 ifodalarini farqlaymiz.',
      'Distinguish 어깨에 기대다 and 손을 잡다.',
      'Различаем 어깨에 기대다 и 손을 잡다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The expressions are 어깨에 기대다 and 손을 잡다.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in both expressions.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['body-language', 'type-answer'],
  },

  s6u1_514_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '처음에는 조금 어색했지만 자주 만나면서 서로 마음이 잘 맞는다는 것을 알게 됐어요.',
    audioText:
      '처음에는 조금 어색했지만 자주 만나면서 서로 마음이 잘 맞는다는 것을 알게 됐어요.',
    answerTranslation: L(
      '처음에는 어색했지만 자주 만나며 서로 잘 맞는다는 걸 알게 됐어요.',
      'Avval biroz noqulay edi, lekin tez-tez uchrashib bir-birimizga mos ekanimizni bildik.',
      'It was awkward at first, but we realized we were compatible as we met more often.',
      'Сначала было немного неловко, но со временем мы поняли, что хорошо подходим друг другу.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['compatibility', 'speaking'],
  },

  s6u1_515_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '좋아하는 사람이 어깨에 기대자 얼굴이 빨개졌다는 문장을 만드세요.',
      'Yoqtirgan insoningiz yelkangizga suyanganida yuzingiz qizarib ketganini bildiradigan gap tuzing.',
      'Build a sentence meaning: “My face turned red when the person I liked leaned on my shoulder.”',
      'Составьте предложение: «Когда человек, который мне нравился, прислонился к моему плечу, моё лицо покраснело».',
    ),
    options: [
      '좋아하는',
      '얼굴이',
      '기대자',
      '사람이',
      '빨개졌어요',
      '어깨에',
      '파래졌어요',
      '손을',
    ],
    answer: '좋아하는 사람이 어깨에 기대자 얼굴이 빨개졌어요',
    answerTranslation: L(
      '좋아하는 사람이 어깨에 기대자 얼굴이 빨개졌어요.',
      'Yoqtirgan insonim yelkamga suyanganida yuzim qizarib ketdi.',
      'My face turned red when the person I liked leaned on my shoulder.',
      'Когда любимый человек прислонился к моему плечу, я покраснел.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lean-on-shoulder', 'blush', 'translate-builder'],
  },

  s6u1_516_listening: {
    type: 'listening',
    instruction: L(
      '두 사람이 서로에게 호감이 있다는 것을 가장 잘 보여 주는 행동을 고르세요.',
      'Ularning bir-biriga yoqishini eng yaxshi ko‘rsatadigan harakatni tanlang.',
      'Choose the behavior that best shows mutual romantic interest.',
      'Выберите действие, лучше всего показывающее взаимную симпатию.',
    ),
    audioText:
      '공원 벤치에 나란히 앉아 이야기하다가 수진이 민수의 어깨에 기대었어요. 잠시 뒤 두 사람은 자연스럽게 손을 잡았어요.',
    options: [
      '어깨에 기대고 손을 잡았다',
      '서로 등을 돌리고 앉았다',
      '아무 말 없이 바로 집에 갔다',
      '서로 연락처를 지웠다',
    ],
    answer: '어깨에 기대고 손을 잡았다',
    answerTranslation: L(
      '서로 어깨에 기대고 손을 잡는 행동에서 호감을 알 수 있어요.',
      'Yelkaga suyanish va qo‘l ushlash ularning bir-biriga yoqishini ko‘rsatadi.',
      'Leaning on a shoulder and holding hands show mutual affection.',
      'Симпатию показывают объятие плечом и держание за руки.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['body-language', 'listening'],
  },

  s6u1_517_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '연인이 서로 팔을 끼는 행동은 ___이고, 손을 맞잡는 행동은 ___예요.',
    blankAnswers: ['팔짱을 끼다', '손을 잡다'],
    options: ['팔짱을 끼다', '손을 잡다', '청혼하다', '선보다', '헤어지다'],
    answer: '팔짱을 끼다|손을 잡다',
    answerTranslation: L(
      '팔짱을 끼다와 손을 잡다를 구별해요.',
      '팔짱을 끼다 va 손을 잡다 ifodalarini farqlaymiz.',
      'Distinguish linking arms from holding hands.',
      'Различаем «идти под руку» и «держаться за руки».',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['body-language', 'multi-blank'],
  },

  s6u1_518_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '연애를',
      '자연스럽게',
      '서로',
      '잘',
      '시작했어요',
      '맞아서',
      '마음이',
      '끝냈어요',
    ],
    answer: '서로 마음이 잘 맞아서 자연스럽게 연애를 시작했어요',
    audioText: '서로 마음이 잘 맞아서 자연스럽게 연애를 시작했어요.',
    answerTranslation: L(
      '서로 마음이 잘 맞아서 자연스럽게 연애를 시작했어요.',
      'Bir-birimizga ko‘nglimiz mos kelgani uchun tabiiy ravishda uchrashishni boshladik.',
      'We naturally started dating because we got along so well.',
      'Мы естественно начали встречаться, потому что хорошо подходили друг другу.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['compatibility', 'dating', 'word-arrange'],
  },

  s6u1_519_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '소개받은 사람과 만나는 것은 ___이고, 연인으로 만나며 사랑을 이어 가는 것은 ___예요.',
    blankAnswers: ['소개팅하다', '연애하다'],
    answerTranslation: L(
      '소개팅하다와 연애하다의 차이를 익혀요.',
      '소개팅하다 va 연애하다 farqini o‘rganamiz.',
      'Practice the difference between 소개팅하다 and 연애하다.',
      'Учимся различать 소개팅하다 и 연애하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The verbs are 소개팅하다 and 연애하다.',
      acceptedAnswers: [],
      notes: ['Require 소개팅하다 then 연애하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['blind-date', 'dating', 'type-answer'],
  },

  s6u1_520_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람이 연인이 된 과정으로 가장 알맞은 것을 고르세요.',
      'Ularning juftlikka aylanish jarayoniga eng mos javobni tanlang.',
      'Choose the best summary of how they became a couple.',
      'Выберите лучшее описание того, как они стали парой.',
    ),
    passage:
      '두 사람은 친구의 소개로 처음 만났습니다. 처음부터 인상이 좋았고 몇 번 만나는 동안 대화가 잘 통한다는 것도 알았습니다. 공원에서 함께 시간을 보내면서 서로에게 호감이 있다는 것이 분명해졌고, 결국 민수가 먼저 고백했습니다.',
    options: [
      '소개 → 좋은 인상 → 대화와 호감 → 고백',
      '결혼 → 소개 → 갈등 → 소개팅',
      '청혼 → 신혼여행 → 고백 → 첫 만남',
      '이별 → 결혼 → 소개 → 연애',
    ],
    answer: '소개 → 좋은 인상 → 대화와 호감 → 고백',
    answerTranslation: L(
      '소개로 만나 좋은 인상을 받고 가까워진 뒤 고백했어요.',
      'Tanishuvdan keyin yaxshi taassurot olib, yaqinlashib, keyin hislarini aytdi.',
      'They met through an introduction, formed a good impression, grew close, and then confessed.',
      'Они познакомились, понравились друг другу, сблизились и затем признались в чувствах.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['relationship-progression', 'reading'],
  },

  // ────────────────────────────────────────────────────────────
  // Lesson 2 · 잘 맞는 사람인가요?
  // q521 ~ q540
  // ────────────────────────────────────────────────────────────

  s6u1_521_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '외모보다 마음이 잘 맞고 생각이 잘 통하는 사람이 더 좋다는 문장을 만드세요.',
      'Tashqi ko‘rinishdan ko‘ra ko‘ngli mos va fikri yaxshi tushuniladigan insonni afzal ko‘rishingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “I prefer someone whose heart and thoughts match mine over someone with good looks.”',
      'Составьте предложение: «Мне больше нравится человек, с которым совпадают чувства и мысли, чем просто красивый человек».',
    ),
    options: [
      '잘',
      '외모보다',
      '사람이',
      '마음이',
      '좋아요',
      '생각이',
      '더',
      '통하는',
      '맞고',
      '학력만',
    ],
    answer: '외모보다 마음이 잘 맞고 생각이 잘 통하는 사람이 더 좋아요',
    answerTranslation: L(
      '외모보다 마음이 잘 맞고 생각이 잘 통하는 사람이 더 좋아요.',
      'Tashqi ko‘rinishdan ko‘ra ko‘ngli mos va fikri yaxshi tushuniladigan insonni ko‘proq yoqtiraman.',
      'I prefer someone whose feelings and thoughts match mine over appearance alone.',
      'Мне важнее человек, с которым совпадают чувства и мысли, чем внешность.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['compatibility', 'appearance', 'translate-builder'],
  },

  s6u1_522_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '서로 성격이 잘 어울리는 것은 ___이고, 대화가 편하게 이어지는 것은 ___예요.',
    blankAnswers: ['성격이 잘 맞다', '말이 잘 통하다'],
    answerTranslation: L(
      '성격이 잘 맞다와 말이 잘 통하다를 구별해요.',
      '성격이 잘 맞다 va 말이 잘 통하다 farqini o‘rganamiz.',
      'Distinguish 성격이 잘 맞다 from 말이 잘 통하다.',
      'Различаем 성격이 잘 맞다 и 말이 잘 통하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The expressions are 성격이 잘 맞다 and 말이 잘 통하다.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in both expressions.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['compatibility', 'communication', 'type-answer'],
  },

  s6u1_523_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '서로 원하는 기준이 맞으면 ___다고 하고, 사람을 끌리게 하는 좋은 특징이 있으면 ___고 해요.',
    blankAnswers: ['조건이 맞다', '매력이 있다'],
    options: [
      '조건이 맞다',
      '매력이 있다',
      '사랑이 식다',
      '화가 풀리다',
      '결혼을 반대하다',
    ],
    answer: '조건이 맞다|매력이 있다',
    answerTranslation: L(
      '조건이 맞다와 매력이 있다의 의미를 익혀요.',
      '조건이 맞다 va 매력이 있다 ma’nolarini o‘rganamiz.',
      'Practice 조건이 맞다 and 매력이 있다.',
      'Практикуем 조건이 맞다 и 매력이 있다.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['condition', 'charm', 'multi-blank'],
  },

  s6u1_524_listening: {
    type: 'listening',
    instruction: L(
      '여자가 남자를 좋은 배우자 후보라고 생각하는 가장 큰 이유를 고르세요.',
      'Ayol erkakni yaxshi turmush o‘rtog‘i deb bilishining asosiy sababini tanlang.',
      'Choose the main reason the woman sees the man as a good potential spouse.',
      'Выберите главную причину, по которой женщина считает мужчину хорошим будущим супругом.',
    ),
    audioText:
      '직업이나 학력도 괜찮지만 그보다 중요한 건 저와 생각이 잘 통한다는 거예요. 힘든 일이 있을 때도 솔직하게 이야기할 수 있어서 편해요.',
    options: [
      '생각이 잘 통하고 솔직하게 이야기할 수 있어서',
      '학력만 아주 높아서',
      '외모가 유명 배우와 같아서',
      '부모님이 무조건 좋아해서',
    ],
    answer: '생각이 잘 통하고 솔직하게 이야기할 수 있어서',
    answerTranslation: L(
      '생각이 잘 통하고 편하게 대화할 수 있어서 좋은 배우자라고 생각해요.',
      'Fikrlari mos va ochiq gaplasha olgani uchun yaxshi turmush o‘rtog‘i deb o‘ylaydi.',
      'She values their shared thinking and ability to communicate honestly.',
      'Она ценит совпадение взглядов и возможность честно общаться.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['compatibility', 'spouse', 'listening'],
  },

  s6u1_525_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '조건은 괜찮아도 마음이 맞지 않으면 결혼을 고민할 것 같다는 문장을 만드세요.',
      'Shartlari yaxshi bo‘lsa ham, ko‘nglingiz mos kelmasa nikoh haqida ikkilanishingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “Even if the conditions are good, I would hesitate about marriage if our hearts did not match.”',
      'Составьте предложение: «Даже если условия хорошие, я бы сомневался в браке, если мы не подходим друг другу душевно».',
    ),
    options: [
      '괜찮아도',
      '고민할',
      '마음이',
      '결혼을',
      '않으면',
      '조건은',
      '맞지',
      '것',
      '같아요',
      '바로',
    ],
    answer: '조건은 괜찮아도 마음이 맞지 않으면 결혼을 고민할 것 같아요',
    answerTranslation: L(
      '조건이 좋아도 마음이 맞지 않으면 결혼을 고민할 것 같아요.',
      'Shartlari yaxshi bo‘lsa ham, ko‘nglimiz mos kelmasa nikoh haqida ikkilanaman.',
      'Even with good conditions, I would hesitate to marry if we were not emotionally compatible.',
      'Даже при хороших условиях я бы сомневался в браке без душевной совместимости.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['condition', 'compatibility', 'translate-builder'],
  },

  s6u1_526_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '통하면',
      '생각이',
      '줄일',
      '서로',
      '갈등도',
      '수 있어요',
      '잘',
      '늘릴',
    ],
    answer: '서로 생각이 잘 통하면 갈등도 줄일 수 있어요',
    audioText: '서로 생각이 잘 통하면 갈등도 줄일 수 있어요.',
    answerTranslation: L(
      '서로 생각을 잘 이해하면 갈등도 줄일 수 있어요.',
      'Bir-birining fikrini yaxshi tushunsa, nizolarni ham kamaytirish mumkin.',
      'Understanding each other’s thoughts can reduce conflict.',
      'Хорошее взаимопонимание помогает уменьшить конфликты.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['thoughts', 'conflict', 'word-arrange'],
  },

  s6u1_527_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '성품이 친절하고 따뜻한 사람은 ___고 표현할 수 있고, 처음 만났을 때 좋은 느낌을 주는 사람은 ___다고 표현할 수 있어요.',
    blankAnswers: ['마음씨가 착하다', '인상이 좋다'],
    answerTranslation: L(
      '마음씨가 착하다와 인상이 좋다를 구별해요.',
      '마음씨가 착하다 va 인상이 좋다 farqini o‘rganamiz.',
      'Distinguish 마음씨가 착하다 from 인상이 좋다.',
      'Различаем 마음씨가 착하다 и 인상이 좋다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The expressions are 마음씨가 착하다 and 인상이 좋다.',
      acceptedAnswers: [],
      notes: ['Require exact spacing.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['kind-hearted', 'impression', 'type-answer'],
  },

  s6u1_528_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글쓴이가 배우자의 조건보다 더 중요하게 생각하는 것을 고르세요.',
      'Muallif turmush o‘rtog‘i mezonlaridan ham muhimroq deb biladigan narsani tanlang.',
      'Choose what the writer values more than external spouse criteria.',
      'Выберите, что автор ценит больше внешних критериев выбора супруга.',
    ),
    passage:
      '예전에는 직업이나 학력 같은 조건을 중요하게 생각했습니다. 하지만 연애를 해 보니 좋은 조건보다 서로 대화가 잘 통하고 마음이 편한 것이 더 중요하다는 생각이 들었습니다.',
    options: [
      '대화가 잘 통하고 함께 있을 때 편한 것',
      '학력이 반드시 같은 것',
      '직업이 완전히 같은 것',
      '나이 차이가 전혀 없는 것',
    ],
    answer: '대화가 잘 통하고 함께 있을 때 편한 것',
    answerTranslation: L(
      '글쓴이는 조건보다 편안한 소통과 궁합을 중요하게 생각해요.',
      'Muallif shartlardan ko‘ra yaxshi muloqot va moslikni muhim deb biladi.',
      'The writer values communication and comfort more than external conditions.',
      'Автор ценит общение и комфорт больше внешних условий.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['spouse-condition', 'reading'],
  },

  s6u1_529_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText: '두 사람은 말이 잘 통하고 성격도 잘 달라요.',
    wrongWord: '달라요.',
    options: ['맞아요.', '달라요.', '식어요.', '끝나요.'],
    answer: '맞아요.',
    answerTranslation: L(
      '두 사람은 말이 잘 통하고 성격도 잘 맞아요.',
      'Ular yaxshi gaplashadi va xarakterlari ham mos.',
      'They communicate well and their personalities also match.',
      'Они хорошо общаются и подходят друг другу по характеру.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['compatibility', 'error-hunt'],
  },

  s6u1_530_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '외적인 조건이 완벽하지 않아도 서로 마음이 잘 맞으면 행복할 수 있다는 문장을 만드세요.',
      'Tashqi shartlar mukammal bo‘lmasa ham, ko‘ngillar mos bo‘lsa baxtli bo‘lish mumkinligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Even without perfect external conditions, people can be happy if they are emotionally compatible.”',
      'Составьте предложение: «Даже если внешние условия не идеальны, можно быть счастливыми, если люди подходят друг другу душевно».',
    ),
    options: [
      '마음이',
      '완벽하지',
      '행복할',
      '않아도',
      '조건이',
      '맞으면',
      '서로',
      '외적인',
      '수 있어요',
      '불행해야',
    ],
    answer: '외적인 조건이 완벽하지 않아도 서로 마음이 맞으면 행복할 수 있어요',
    answerTranslation: L(
      '외적인 조건이 완벽하지 않아도 마음이 맞으면 행복할 수 있어요.',
      'Tashqi shartlar mukammal bo‘lmasa ham, ko‘ngillar mos bo‘lsa baxtli bo‘lish mumkin.',
      'People can be happy even without perfect external conditions if they are emotionally compatible.',
      'Даже без идеальных внешних условий можно быть счастливыми, если люди подходят друг другу.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['condition', 'compatibility', 'translate-builder'],
  },

  s6u1_531_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 두 표현을 입력하세요.',
      'Eshitgan gapingizdagi ikki tushib qolgan ifodani yozing.',
      'Type the two missing expressions.',
      'Введите два пропущенных выражения.',
    ),
    audioText: '저는 마음이 잘 맞고 생각이 잘 통하는 사람이 좋아요.',
    sentenceTemplate: '저는 ___ 잘 맞고 ___ 잘 통하는 사람이 좋아요.',
    blankAnswers: ['마음이', '생각이'],
    answerTranslation: L(
      '저는 마음이 잘 맞고 생각이 잘 통하는 사람이 좋아요.',
      'Men ko‘ngli mos va fikri yaxshi tushuniladigan insonni yoqtiraman.',
      'I like someone whose heart and thoughts match mine.',
      'Мне нравится человек, с которым совпадают чувства и мысли.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated forms are 마음이 and 생각이.',
      acceptedAnswers: [],
      notes: ['Require 마음이 then 생각이.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['compatibility', 'thoughts', 'listen-fill'],
  },

  s6u1_532_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '배우자를 선택할 때는 외적인 ___뿐 아니라 서로 ___이 잘 맞는지, ___이 잘 통하는지도 중요하게 볼 수 있습니다.',
    blankAnswers: ['조건', '마음', '생각'],
    options: ['조건', '마음', '생각', '청첩장', '예식장'],
    answer: '조건|마음|생각',
    answerTranslation: L(
      '배우자를 볼 때 조건뿐 아니라 마음과 생각의 궁합도 중요해요.',
      'Turmush o‘rtog‘ini tanlashda shartlardan tashqari ko‘ngil va fikr mosligi ham muhim.',
      'Spouse choice can involve not only external conditions but emotional and intellectual compatibility.',
      'При выборе супруга важны не только условия, но и душевная и интеллектуальная совместимость.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['condition', 'compatibility', 'cloze'],
  },

  s6u1_533_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '서로 원하는 기준이 잘 맞는 것은 ___이고, 서로 감정적으로 편하고 잘 어울리는 것은 ___예요.',
    blankAnswers: ['조건이 맞다', '마음이 잘 맞다'],
    answerTranslation: L(
      '조건이 맞다와 마음이 잘 맞다를 구별해요.',
      '조건이 맞다 va 마음이 잘 맞다 farqini o‘rganamiz.',
      'Distinguish 조건이 맞다 and 마음이 잘 맞다.',
      'Различаем 조건이 맞다 и 마음이 잘 맞다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The expressions are 조건이 맞다 and 마음이 잘 맞다.',
      acceptedAnswers: [],
      notes: ['Require exact spacing.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['condition', 'compatibility', 'type-answer'],
  },

  s6u1_534_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '저는 외모나 학력보다 마음이 잘 맞고 생각이 잘 통하는 사람이 더 중요하다고 생각해요.',
    audioText:
      '저는 외모나 학력보다 마음이 잘 맞고 생각이 잘 통하는 사람이 더 중요하다고 생각해요.',
    answerTranslation: L(
      '저는 외적인 조건보다 마음과 생각의 궁합을 더 중요하게 생각해요.',
      'Men tashqi shartlardan ko‘ra ko‘ngil va fikr mosligini muhimroq deb bilaman.',
      'I value emotional and intellectual compatibility more than appearance or education.',
      'Для меня душевная и интеллектуальная совместимость важнее внешности и образования.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['spouse-condition', 'speaking'],
  },

  s6u1_535_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '조건보다 상대방을 있는 그대로 이해하는 것이 더 중요하다는 문장을 만드세요.',
      'Shartlardan ko‘ra sherigingizni qanday bo‘lsa shunday tushunish muhimroq ekanini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Understanding your partner as they are is more important than conditions.”',
      'Составьте предложение: «Понимать партнёра таким, какой он есть, важнее условий».',
    ),
    options: [
      '그대로',
      '조건보다',
      '이해하는',
      '상대방을',
      '있는',
      '것이',
      '중요해요',
      '더',
      '바꾸는',
    ],
    answer: '조건보다 상대방을 있는 그대로 이해하는 것이 더 중요해요',
    answerTranslation: L(
      '조건보다 상대방을 있는 그대로 이해하는 것이 더 중요해요.',
      'Shartlardan ko‘ra sherikni qanday bo‘lsa shunday tushunish muhimroq.',
      'Understanding the other person as they are is more important than conditions.',
      'Понимать другого человека таким, какой он есть, важнее условий.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['acceptance', 'condition', 'translate-builder'],
  },

  s6u1_536_listening: {
    type: 'listening',
    instruction: L(
      '남자가 결혼을 망설이는 이유를 고르세요.',
      'Erkakning nikohdan ikkilanish sababini tanlang.',
      'Choose why the man hesitates about marriage.',
      'Выберите, почему мужчина сомневается насчёт брака.',
    ),
    audioText:
      '여자 친구는 좋은 사람이에요. 조건도 괜찮고 마음씨도 착해요. 그런데 중요한 일을 결정할 때마다 생각이 너무 달라서 결혼해도 괜찮을지 고민돼요.',
    options: [
      '중요한 문제에서 생각 차이가 커서',
      '여자 친구의 외모가 너무 좋아서',
      '두 사람의 나이가 같아서',
      '부모님이 이미 결혼에 동의해서',
    ],
    answer: '중요한 문제에서 생각 차이가 커서',
    answerTranslation: L(
      '중요한 문제에서 생각이 많이 달라서 결혼을 고민하고 있어요.',
      'Muhim masalalarda fikrlari juda farq qilgani uchun nikoh haqida ikkilanmoqda.',
      'He hesitates because they disagree strongly on important issues.',
      'Он сомневается, потому что их взгляды сильно расходятся по важным вопросам.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['compatibility', 'marriage', 'listening'],
  },

  s6u1_537_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '대화나 관계에서 마주하는 다른 사람은 ___이고, 그 사람을 바꾸지 않은 모습 그대로 받아들이는 표현은 ___예요.',
    blankAnswers: ['상대방', '있는 그대로'],
    options: ['상대방', '있는 그대로', '유효기간', '신혼여행', '연애결혼'],
    answer: '상대방|있는 그대로',
    answerTranslation: L(
      '상대방과 있는 그대로를 함께 복습해요.',
      '상대방 va 있는 그대로 ifodalarini birga takrorlaymiz.',
      'Review 상대방 and 있는 그대로.',
      'Повторяем 상대방 и 있는 그대로.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['other-person', 'acceptance', 'multi-blank'],
  },

  s6u1_538_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '좋은',
      '서로를',
      '조건보다',
      '이해하는',
      '중요해요',
      '것이',
      '더',
      '무시하는',
    ],
    answer: '좋은 조건보다 서로를 이해하는 것이 더 중요해요',
    audioText: '좋은 조건보다 서로를 이해하는 것이 더 중요해요.',
    answerTranslation: L(
      '좋은 조건보다 서로를 이해하는 것이 더 중요해요.',
      'Yaxshi shartlardan ko‘ra bir-birini tushunish muhimroq.',
      'Understanding each other is more important than good conditions.',
      'Понимание друг друга важнее хороших условий.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['understanding', 'condition', 'word-arrange'],
  },

  s6u1_539_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '연애하는 상대를 ___이라고 하고, 가까운 사람에게 기대했던 것과 달라 속상한 느낌을 ___고 해요.',
    blankAnswers: ['애인', '서운하다'],
    answerTranslation: L(
      '애인과 서운하다의 의미를 구별해요.',
      '애인 va 서운하다 ma’nolarini farqlaymiz.',
      'Distinguish 애인 and 서운하다.',
      'Различаем 애인 и 서운하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The answers are 애인 and 서운하다.',
      acceptedAnswers: [],
      notes: ['Require 애인 then 서운하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lover', 'emotion', 'type-answer'],
  },

  s6u1_540_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글에서 좋은 배우자를 판단하는 기준으로 가장 강조하는 것을 고르세요.',
      'Matnda yaxshi turmush o‘rtog‘ini baholashda eng ko‘p ta’kidlangan mezonni tanlang.',
      'Choose what the passage emphasizes most when judging a good spouse.',
      'Выберите критерий, который текст больше всего подчёркивает при выборе супруга.',
    ),
    passage:
      '외모, 직업, 학력도 배우자를 생각할 때 볼 수 있는 조건입니다. 하지만 오랫동안 함께 살 사람이라면 서로 마음이 잘 맞는지, 중요한 생각을 솔직하게 나눌 수 있는지, 문제가 생겼을 때 함께 해결할 수 있는지를 더 중요하게 볼 필요가 있습니다.',
    options: [
      '궁합과 대화, 문제를 함께 해결하는 능력',
      '높은 학력 하나',
      '좋은 외모 하나',
      '같은 직업 하나',
    ],
    answer: '궁합과 대화, 문제를 함께 해결하는 능력',
    answerTranslation: L(
      '외적인 조건보다 궁합과 대화, 협력이 더 중요하다고 해요.',
      'Tashqi shartlardan ko‘ra moslik, muloqot va hamkorlik muhimroq.',
      'The passage emphasizes compatibility, communication, and cooperation.',
      'Текст подчёркивает совместимость, общение и умение решать проблемы вместе.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['spouse-condition', 'reading'],
  },

  // ────────────────────────────────────────────────────────────
  // Lesson 3 · 청혼과 결혼 결정
  // q541 ~ q560
  // ────────────────────────────────────────────────────────────

  s6u1_541_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '오래 사귄 뒤 내년 봄에 결혼할 생각이라는 문장을 만드세요.',
      'Uzoq vaqt uchrashgandan keyin kelasi bahorda turmush qurmoqchi ekaningizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “After dating for a long time, we plan to marry next spring.”',
      'Составьте предложение: «После долгих отношений мы планируем пожениться следующей весной».',
    ),
    options: [
      '결혼할',
      '오래',
      '내년',
      '생각이에요',
      '뒤',
      '사귄',
      '봄에',
      '헤어질',
    ],
    answer: '오래 사귄 뒤 내년 봄에 결혼할 생각이에요',
    answerTranslation: L(
      '오래 사귄 뒤 내년 봄에 결혼할 생각이에요.',
      'Uzoq uchrashgandan keyin kelasi bahorda turmush qurmoqchimiz.',
      'After dating for a long time, we plan to marry next spring.',
      'После долгих отношений мы планируем пожениться следующей весной.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['marriage-plan', 'translate-builder'],
  },

  s6u1_542_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '결혼을 목적으로 소개받은 사람을 만나는 것은 ___이고, 사랑하는 사람에게 결혼하자고 말하는 것은 ___예요.',
    blankAnswers: ['선보다', '청혼하다'],
    answerTranslation: L(
      '선보다와 청혼하다의 의미를 구별해요.',
      '선보다 va 청혼하다 ma’nolarini farqlaymiz.',
      'Distinguish 선보다 from 청혼하다.',
      'Различаем 선보다 и 청혼하다.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target verbs are 선보다 and 청혼하다.',
      acceptedAnswers: [],
      notes: ['Require 선보다 then 청혼하다.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['matchmaking', 'proposal', 'type-answer'],
  },

  s6u1_543_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '연애하던 두 사람이 결혼하면 ___이고, 가족이나 주변의 소개를 통해 배우자를 만나 결혼하면 ___이에요.',
    blankAnswers: ['연애결혼', '중매결혼'],
    options: ['연애결혼', '중매결혼', '신혼여행', '소개팅', '청혼'],
    answer: '연애결혼|중매결혼',
    answerTranslation: L(
      '연애결혼과 중매결혼을 구별해요.',
      '연애결혼 va 중매결혼 farqini o‘rganamiz.',
      'Distinguish love marriage from arranged marriage.',
      'Различаем брак по любви и брак через сватовство.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-marriage', 'arranged-marriage', 'multi-blank'],
  },

  s6u1_544_listening: {
    type: 'listening',
    instruction: L(
      '남자가 결혼을 미루려는 가장 큰 이유를 고르세요.',
      'Erkak nikohni kechiktirmoqchi bo‘lishining asosiy sababini tanlang.',
      'Choose the main reason the man wants to postpone marriage.',
      'Выберите главную причину, по которой мужчина хочет отложить брак.',
    ),
    audioText:
      '여자 친구와 결혼하고 싶은 마음은 있어요. 그런데 아직 취직도 못 했고 생활비를 감당할 준비도 안 됐어요. 그래서 결혼하려면 아직 멀었다고 생각해요.',
    options: [
      '취직과 경제적인 준비가 아직 부족해서',
      '여자 친구를 좋아하지 않아서',
      '부모님이 이미 결혼식을 예약해서',
      '신혼여행을 다녀왔기 때문에',
    ],
    answer: '취직과 경제적인 준비가 아직 부족해서',
    answerTranslation: L(
      '취직과 경제적인 준비가 아직 안 돼서 결혼을 미루려고 해요.',
      'Ish va moliyaviy tayyorgarlik hali yetarli emasligi uchun nikohni kechiktirmoqchi.',
      'He wants to postpone marriage because he is not yet financially or professionally ready.',
      'Он хочет отложить брак, потому что ещё не готов в плане работы и финансов.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['marriage-plan', 'financial-problem', 'listening'],
  },

  s6u1_545_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '아직 취직하지 못해서 결혼하려면 멀었다고 생각한다는 문장을 만드세요.',
      'Hali ish topmaganingiz uchun nikohga hali ancha vaqt bor deb o‘ylashingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “I think marriage is still a long way off because I have not found a job yet.”',
      'Составьте предложение: «Я думаю, до брака ещё далеко, потому что я пока не устроился на работу».',
    ),
    options: [
      '아직',
      '결혼하려면',
      '못해서',
      '생각해요',
      '취직하지',
      '멀었다고',
      '가깝다고',
      '청혼해서',
    ],
    answer: '아직 취직하지 못해서 결혼하려면 멀었다고 생각해요',
    answerTranslation: L(
      '아직 취직하지 못해서 결혼하려면 멀었다고 생각해요.',
      'Hali ish topmaganim uchun nikohga hali ancha vaqt bor deb o‘ylayman.',
      'I think marriage is still a long way off because I have not found a job yet.',
      'Я думаю, до брака ещё далеко, потому что пока не устроился на работу.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['marriage-plan', 'job', 'translate-builder'],
  },

  s6u1_546_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '소식을',
      '결혼',
      '두',
      '먼저',
      '가족에게',
      '알렸어요',
      '사람은',
      '숨겼어요',
    ],
    answer: '두 사람은 가족에게 결혼 소식을 먼저 알렸어요',
    audioText: '두 사람은 가족에게 결혼 소식을 먼저 알렸어요.',
    answerTranslation: L(
      '두 사람은 가족에게 결혼 소식을 먼저 알렸어요.',
      'Ular nikoh haqidagi xabarni avval oilasiga aytishdi.',
      'They told their families the marriage news first.',
      'Они сначала сообщили семье новость о свадьбе.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['marriage-news', 'word-arrange'],
  },

  s6u1_547_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '결혼식에 사람들을 초대하기 위해 보내는 카드는 ___이고, 결혼식을 하는 장소는 ___이에요.',
    blankAnswers: ['청첩장', '예식장'],
    answerTranslation: L(
      '청첩장과 예식장을 구별해요.',
      '청첩장 va 예식장 farqini o‘rganamiz.',
      'Distinguish wedding invitation from wedding hall.',
      'Различаем свадебное приглашение и свадебный зал.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target nouns are 청첩장 and 예식장.',
      acceptedAnswers: [],
      notes: ['Require 청첩장 then 예식장.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['wedding-invitation', 'wedding-hall', 'type-answer'],
  },

  s6u1_548_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람이 결혼을 결정하기 전에 가장 오래 이야기한 문제를 고르세요.',
      'Ular nikohga qaror qilishdan oldin eng ko‘p muhokama qilgan masalani tanlang.',
      'Choose what the couple discussed most before deciding to marry.',
      'Выберите вопрос, который пара больше всего обсуждала перед решением пожениться.',
    ),
    passage:
      '두 사람은 4년 동안 연애했습니다. 서로 사랑하지만 결혼을 결정하기 전에는 직장, 살 집, 생활비와 부모님의 생각에 대해 많이 이야기했습니다. 현실적인 문제를 하나씩 정리한 뒤 결혼하기로 결정했습니다.',
    options: [
      '직장과 집, 생활비 같은 현실적인 문제',
      '첫 데이트 장소 하나',
      '상대방의 키 하나',
      '소개팅을 다시 할지 여부',
    ],
    answer: '직장과 집, 생활비 같은 현실적인 문제',
    answerTranslation: L(
      '결혼 전에 직장, 집, 생활비 같은 현실적인 문제를 많이 이야기했어요.',
      'Nikohdan oldin ish, uy va yashash xarajatlari kabi real masalalarni muhokama qilishdi.',
      'They discussed practical issues such as work, housing, and living expenses.',
      'Перед браком они обсуждали работу, жильё и расходы на жизнь.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['marriage-plan', 'financial-problem', 'reading'],
  },

  s6u1_549_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText: '결혼하고 싶어서 여자 친구에게 헤어지자고 청혼했어요.',
    wrongWord: '헤어지자고',
    options: ['결혼하자고', '헤어지자고', '싸우자고', '소개하자고'],
    answer: '결혼하자고',
    answerTranslation: L(
      '결혼하고 싶어서 여자 친구에게 결혼하자고 청혼했어요.',
      'Uylanishni xohlaganim uchun qiz do‘stimga turmush qurishni taklif qildim.',
      'I proposed to my girlfriend because I wanted to marry her.',
      'Я сделал предложение девушке, потому что хотел жениться на ней.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['proposal', 'error-hunt'],
  },

  s6u1_550_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '결혼식 날짜를 정한 뒤 청첩장을 준비하기 시작했다는 문장을 만드세요.',
      'To‘y sanasini belgilagandan keyin taklifnomalarni tayyorlashni boshlaganini bildiradigan gap tuzing.',
      'Build a sentence meaning: “After choosing the wedding date, they started preparing the invitations.”',
      'Составьте предложение: «После выбора даты свадьбы они начали готовить приглашения».',
    ),
    options: [
      '준비하기',
      '결혼식',
      '정한',
      '청첩장을',
      '날짜를',
      '뒤',
      '시작했어요',
      '버리기',
    ],
    answer: '결혼식 날짜를 정한 뒤 청첩장을 준비하기 시작했어요',
    answerTranslation: L(
      '결혼식 날짜를 정한 뒤 청첩장을 준비하기 시작했어요.',
      'To‘y sanasini belgilagach, taklifnomalarni tayyorlashni boshladik.',
      'After setting the wedding date, we started preparing invitations.',
      'После выбора даты свадьбы мы начали готовить приглашения.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['wedding-preparation', 'translate-builder'],
  },

  s6u1_551_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 두 단어를 입력하세요.',
      'Eshitgan gapingizdagi ikki tushib qolgan so‘zni yozing.',
      'Type the two missing words.',
      'Введите два пропущенных слова.',
    ),
    audioText: '예식장을 예약한 뒤 신혼여행 장소를 정했어요.',
    sentenceTemplate: '___을 예약한 뒤 ___ 장소를 정했어요.',
    blankAnswers: ['예식장', '신혼여행'],
    answerTranslation: L(
      '예식장을 예약하고 신혼여행 장소를 정했어요.',
      'To‘y zalini band qilib, asal oyi safar joyini tanladik.',
      'We booked the wedding hall and chose the honeymoon destination.',
      'Мы забронировали свадебный зал и выбрали место для медового месяца.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated nouns are 예식장 and 신혼여행.',
      acceptedAnswers: [],
      notes: ['Require 예식장 then 신혼여행.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['wedding-hall', 'honeymoon', 'listen-fill'],
  },

  s6u1_552_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '민수는 오랫동안 사귄 여자 친구에게 ___했습니다. 두 사람은 결혼을 결정한 뒤 가족과 친구에게 보낼 ___을 준비하고 결혼식을 할 ___도 예약했습니다.',
    blankAnswers: ['청혼', '청첩장', '예식장'],
    options: ['청혼', '청첩장', '예식장', '소개팅', '유효기간'],
    answer: '청혼|청첩장|예식장',
    answerTranslation: L(
      '청혼한 뒤 청첩장을 준비하고 예식장을 예약하는 과정이에요.',
      'Taklifdan keyin taklifnoma tayyorlab, to‘y zalini band qilish jarayoni.',
      'It describes proposing, preparing invitations, and reserving a wedding hall.',
      'Это процесс предложения, подготовки приглашений и бронирования свадебного зала.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['proposal', 'wedding-preparation', 'cloze'],
  },

  s6u1_553_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '결혼한 직후 둘이 떠나는 여행은 ___이고, 결혼 후 새로 함께 살 집은 ___이에요.',
    blankAnswers: ['신혼여행', '신혼집'],
    answerTranslation: L(
      '신혼여행과 신혼집을 구별해요.',
      '신혼여행 va 신혼집 farqini o‘rganamiz.',
      'Distinguish honeymoon from newlywed home.',
      'Различаем медовый месяц и дом молодожёнов.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target nouns are 신혼여행 and 신혼집.',
      acceptedAnswers: [],
      notes: ['Require 신혼여행 then 신혼집.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['honeymoon', 'newlywed-home', 'type-answer'],
  },

  s6u1_554_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '저는 결혼을 결정하기 전에 사랑뿐 아니라 직장과 집, 생활비 같은 현실적인 문제도 이야기해야 한다고 생각해요.',
    audioText:
      '저는 결혼을 결정하기 전에 사랑뿐 아니라 직장과 집, 생활비 같은 현실적인 문제도 이야기해야 한다고 생각해요.',
    answerTranslation: L(
      '결혼 전에 현실적인 생활 문제도 충분히 이야기해야 한다고 생각해요.',
      'Nikohdan oldin ish, uy va xarajat kabi real masalalarni ham gaplashish kerak deb o‘ylayman.',
      'I think couples should discuss practical issues such as work, housing, and expenses before marriage.',
      'Я считаю, что до брака нужно обсудить работу, жильё и расходы.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['marriage-plan', 'speaking'],
  },

  s6u1_555_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '결혼 전에 신혼집과 생활비를 함께 계획했다는 문장을 만드세요.',
      'Nikohdan oldin yangi uy va yashash xarajatlarini birga rejalashtirganini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Before marriage, we planned our newlywed home and living expenses together.”',
      'Составьте предложение: «До свадьбы мы вместе спланировали жильё и расходы на жизнь».',
    ),
    options: [
      '함께',
      '신혼집과',
      '생활비를',
      '결혼',
      '계획했어요',
      '전에',
      '따로',
      '청첩장을',
    ],
    answer: '결혼 전에 신혼집과 생활비를 함께 계획했어요',
    answerTranslation: L(
      '결혼 전에 신혼집과 생활비를 함께 계획했어요.',
      'Nikohdan oldin yangi uy va yashash xarajatlarini birga rejalashtirdik.',
      'Before marriage, we planned our newlywed home and living expenses together.',
      'До свадьбы мы вместе спланировали жильё и расходы.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['newlywed-home', 'financial-problem', 'translate-builder'],
  },

  s6u1_556_listening: {
    type: 'listening',
    instruction: L(
      '두 사람이 결혼 준비에서 가장 먼저 해결하려는 문제를 고르세요.',
      'Ular nikoh tayyorgarligida birinchi bo‘lib hal qilmoqchi bo‘lgan masalani tanlang.',
      'Choose the issue the couple wants to solve first in their wedding preparation.',
      'Выберите вопрос, который пара хочет решить первым при подготовке к свадьбе.',
    ),
    audioText:
      '예식장과 신혼여행은 나중에 정해도 될 것 같아요. 지금 가장 중요한 건 우리가 어디에서 살지 정하고 예산에 맞는 신혼집을 찾는 거예요.',
    options: [
      '예산에 맞는 신혼집을 찾는 것',
      '청첩장 색깔을 정하는 것',
      '신혼여행 사진을 고르는 것',
      '소개팅 장소를 다시 정하는 것',
    ],
    answer: '예산에 맞는 신혼집을 찾는 것',
    answerTranslation: L(
      '두 사람은 먼저 예산에 맞는 신혼집을 찾으려고 해요.',
      'Ular avval byudjetga mos yangi uy topmoqchi.',
      'They want to find an affordable newlywed home first.',
      'Сначала они хотят найти жильё, подходящее по бюджету.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['newlywed-home', 'budget', 'listening'],
  },

  s6u1_557_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '언제 어떻게 결혼할지 정한 내용을 ___이라고 할 수 있고, 결혼 뒤 함께 떠나는 여행은 ___이에요.',
    blankAnswers: ['결혼 계획', '신혼여행'],
    options: ['결혼 계획', '신혼여행', '유효기간', '첫인상', '성격 차이'],
    answer: '결혼 계획|신혼여행',
    answerTranslation: L(
      '결혼 계획과 신혼여행을 함께 복습해요.',
      '결혼 계획 va 신혼여행 ifodalarini birga takrorlaymiz.',
      'Review marriage plans and honeymoon.',
      'Повторяем планирование брака и медовый месяц.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['marriage-plan', 'honeymoon', 'multi-blank'],
  },

  s6u1_558_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '필요해요',
      '연애결혼이라도',
      '준비는',
      '현실적인',
      '꼭',
      '결혼',
      '필요없어요',
    ],
    answer: '연애결혼이라도 현실적인 결혼 준비는 꼭 필요해요',
    audioText: '연애결혼이라도 현실적인 결혼 준비는 꼭 필요해요.',
    answerTranslation: L(
      '연애결혼이어도 현실적인 준비는 필요해요.',
      'Sevib turmush qurilsa ham real tayyorgarlik zarur.',
      'Even a love marriage requires practical preparation.',
      'Даже брак по любви требует практической подготовки.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-marriage', 'wedding-preparation', 'word-arrange'],
  },

  s6u1_559_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '연애한 뒤 결혼하는 방식은 ___이고, 주변의 소개나 중매를 통해 결혼하는 방식은 ___이에요.',
    blankAnswers: ['연애결혼', '중매결혼'],
    answerTranslation: L(
      '연애결혼과 중매결혼을 입력해요.',
      '연애결혼 va 중매결혼 so‘zlarini yozamiz.',
      'Enter 연애결혼 and 중매결혼.',
      'Введите 연애결혼 и 중매결혼.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The answers are 연애결혼 and 중매결혼.',
      acceptedAnswers: [],
      notes: ['Require correct order.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['love-marriage', 'arranged-marriage', 'type-answer'],
  },

  s6u1_560_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람이 결혼 준비를 현실적으로 하고 있다고 볼 수 있는 근거를 고르세요.',
      'Ularning nikohga real tarzda tayyorlanayotganini ko‘rsatadigan dalilni tanlang.',
      'Choose the evidence that the couple is preparing realistically for marriage.',
      'Выберите доказательство того, что пара реалистично готовится к браку.',
    ),
    passage:
      '두 사람은 연애결혼을 하기로 했습니다. 결혼식 날짜를 정한 뒤 바로 큰 예식장을 예약하지 않고 먼저 예산을 계산했습니다. 신혼집 비용과 생활비, 신혼여행 비용을 정리한 다음 자신들에게 맞는 규모의 결혼식을 준비했습니다.',
    options: [
      '예산과 생활비를 먼저 계산한 뒤 결혼식 규모를 정했다',
      '돈은 생각하지 않고 가장 큰 예식장을 선택했다',
      '신혼집은 결혼 후에 생각하기로 했다',
      '두 사람이 결혼 비용을 전혀 이야기하지 않았다',
    ],
    answer: '예산과 생활비를 먼저 계산한 뒤 결혼식 규모를 정했다',
    answerTranslation: L(
      '예산을 계산하고 생활비와 집을 먼저 생각한 점에서 현실적으로 준비하고 있어요.',
      'Byudjet, xarajat va uy masalasini oldindan ko‘rib, real tayyorgarlik qilmoqda.',
      'They prepare realistically by considering budget, housing, and living expenses first.',
      'Они реалистично готовятся, сначала учитывая бюджет, жильё и расходы.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['wedding-preparation', 'reading'],
  },

  // ────────────────────────────────────────────────────────────
  // Lesson 4 · 결혼 준비와 신혼생활
  // q561 ~ q580
  // ────────────────────────────────────────────────────────────

  s6u1_561_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '예식장을 예약한 뒤 신혼여행 장소를 정했다는 문장을 만드세요.',
      'To‘y zalini band qilgandan keyin asal oyi joyini tanlaganini bildiradigan gap tuzing.',
      'Build a sentence meaning: “After booking the wedding hall, we chose the honeymoon destination.”',
      'Составьте предложение: «После бронирования свадебного зала мы выбрали место для медового месяца».',
    ),
    options: [
      '신혼여행',
      '예식장을',
      '장소를',
      '뒤',
      '정했어요',
      '예약한',
      '소개팅',
      '취소한',
    ],
    answer: '예식장을 예약한 뒤 신혼여행 장소를 정했어요',
    answerTranslation: L(
      '예식장을 예약한 뒤 신혼여행 장소를 정했어요.',
      'To‘y zalini band qilgach, asal oyi joyini tanladik.',
      'After booking the wedding hall, we chose the honeymoon destination.',
      'После бронирования свадебного зала мы выбрали место для медового месяца.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['wedding-hall', 'honeymoon', 'translate-builder'],
  },

  s6u1_562_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '결혼 후 둘이 떠나는 여행은 ___이고, 결혼식을 진행하는 장소는 ___이에요.',
    blankAnswers: ['신혼여행', '예식장'],
    answerTranslation: L(
      '신혼여행과 예식장을 구별해요.',
      '신혼여행 va 예식장 farqini o‘rganamiz.',
      'Distinguish honeymoon and wedding hall.',
      'Различаем медовый месяц и свадебный зал.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target nouns are 신혼여행 and 예식장.',
      acceptedAnswers: [],
      notes: ['Require 신혼여행 then 예식장.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['honeymoon', 'wedding-hall', 'type-answer'],
  },

  s6u1_563_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '결혼식 초대 카드는 ___이고, 결혼 후 두 사람이 새로 함께 살 집은 ___이에요.',
    blankAnswers: ['청첩장', '신혼집'],
    options: ['청첩장', '신혼집', '유효기간', '소개팅', '첫인상'],
    answer: '청첩장|신혼집',
    answerTranslation: L(
      '청첩장과 신혼집을 함께 복습해요.',
      '청첩장 va 신혼집 ifodalarini birga takrorlaymiz.',
      'Review wedding invitation and newlywed home.',
      'Повторяем свадебное приглашение и жильё молодожёнов.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['wedding-invitation', 'newlywed-home', 'multi-blank'],
  },

  s6u1_564_listening: {
    type: 'listening',
    instruction: L(
      '두 사람이 결혼 준비 계획을 바꾼 이유를 고르세요.',
      'Ular nikoh tayyorgarligi rejasini nima sababdan o‘zgartirganini tanlang.',
      'Choose why the couple changed their wedding plans.',
      'Выберите, почему пара изменила планы свадьбы.',
    ),
    audioText:
      '처음에는 큰 예식장에서 결혼하려고 했어요. 그런데 신혼집 비용이 예상보다 많이 들어서 작은 예식장으로 바꾸고 신혼집에 예산을 더 쓰기로 했어요.',
    options: [
      '신혼집 비용이 예상보다 많이 들어서',
      '두 사람이 결혼을 취소해서',
      '신혼여행을 가지 않기로 해서',
      '청첩장을 만들 수 없어서',
    ],
    answer: '신혼집 비용이 예상보다 많이 들어서',
    answerTranslation: L(
      '신혼집 비용 때문에 더 작은 예식장으로 계획을 바꿨어요.',
      'Yangi uy xarajati sabab kichikroq to‘y zalini tanlashdi.',
      'They chose a smaller wedding hall because the newlywed home cost more than expected.',
      'Из-за стоимости жилья они выбрали меньший свадебный зал.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['newlywed-home', 'wedding-budget', 'listening'],
  },

  s6u1_565_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '넓은 신혼집을 원했지만 예산에 맞는 집을 골랐다는 문장을 만드세요.',
      'Keng uy xohlagan bo‘lsangiz ham, byudjetga mos uyni tanlaganingizni bildiradigan gap tuzing.',
      'Build a sentence meaning: “We wanted a spacious newlywed home, but chose one that fit our budget.”',
      'Составьте предложение: «Мы хотели просторное жильё, но выбрали дом по бюджету».',
    ),
    options: [
      '원했지만',
      '집을',
      '신혼집을',
      '예산에',
      '넓은',
      '맞는',
      '골랐어요',
      '가장',
      '비싼',
    ],
    answer: '넓은 신혼집을 원했지만 예산에 맞는 집을 골랐어요',
    answerTranslation: L(
      '넓은 신혼집을 원했지만 예산에 맞는 집을 골랐어요.',
      'Keng yangi uy xohladik, lekin byudjetga mos uyni tanladik.',
      'We wanted a spacious newlywed home, but chose one within our budget.',
      'Мы хотели просторное жильё, но выбрали вариант по бюджету.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['newlywed-home', 'budget', 'translate-builder'],
  },

  s6u1_566_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '두',
      '함께',
      '결혼',
      '준비는',
      '나누어',
      '하는',
      '좋아요',
      '사람이',
      '게',
      '혼자',
    ],
    answer: '결혼 준비는 두 사람이 함께 나누어 하는 게 좋아요',
    audioText: '결혼 준비는 두 사람이 함께 나누어 하는 게 좋아요.',
    answerTranslation: L(
      '결혼 준비는 두 사람이 함께 역할을 나누어 하는 것이 좋아요.',
      'Nikoh tayyorgarligini ikki kishi birga bo‘lib qilgan yaxshi.',
      'It is better for both partners to share wedding preparation.',
      'Лучше, когда подготовку к свадьбе оба партнёра делят между собой.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['wedding-preparation', 'cooperation', 'word-arrange'],
  },

  s6u1_567_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '결혼 후 새로 준비하는 집안 물건과 생활 기반은 ___이라고 할 수 있고, 막 결혼한 부부는 ___라고 해요.',
    blankAnswers: ['신혼살림', '신혼부부'],
    answerTranslation: L(
      '신혼살림과 신혼부부를 구별해요.',
      '신혼살림 va 신혼부부 farqini o‘rganamiz.',
      'Distinguish newlywed household setup from newlywed couple.',
      'Различаем быт молодожёнов и саму пару молодожёнов.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target nouns are 신혼살림 and 신혼부부.',
      acceptedAnswers: [],
      notes: ['Require 신혼살림 then 신혼부부.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['newlywed-life', 'type-answer'],
  },

  s6u1_568_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람이 가장 현실적으로 잘한 준비를 고르세요.',
      'Ularning eng real va to‘g‘ri tayyorgarligini tanlang.',
      'Choose the most practical thing the couple did.',
      'Выберите наиболее практичное решение пары.',
    ),
    passage:
      '두 사람은 처음에는 넓은 아파트에서 신혼생활을 시작하고 싶었습니다. 하지만 결혼식과 신혼여행 비용까지 계산해 보니 예산이 부족했습니다. 그래서 조금 작은 집을 구하고 남은 돈을 생활비와 필요한 신혼살림에 쓰기로 했습니다.',
    options: [
      '전체 예산을 보고 집과 생활비의 균형을 맞췄다',
      '생활비를 모두 무시했다',
      '가장 비싼 집만 고집했다',
      '결혼식 비용을 전혀 계산하지 않았다',
    ],
    answer: '전체 예산을 보고 집과 생활비의 균형을 맞췄다',
    answerTranslation: L(
      '전체 예산을 생각해 집과 생활비를 현실적으로 조정했어요.',
      'Umumiy byudjetni hisobga olib uy va yashash xarajatlarini muvozanatlashtirdi.',
      'They balanced housing and living expenses based on their total budget.',
      'Они сбалансировали расходы на жильё и жизнь, учитывая общий бюджет.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['newlywed-life', 'budget', 'reading'],
  },

  s6u1_569_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText: '결혼식에 친구들을 초대하려고 신혼여행을 보냈어요.',
    wrongWord: '신혼여행을',
    options: ['청첩장을', '신혼여행을', '예식장을', '신혼집을'],
    answer: '청첩장을',
    answerTranslation: L(
      '결혼식에 친구들을 초대하려고 청첩장을 보냈어요.',
      'Do‘stlarni to‘yga taklif qilish uchun taklifnomalar yubordim.',
      'I sent wedding invitations to invite my friends.',
      'Я отправил свадебные приглашения друзьям.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['wedding-invitation', 'error-hunt'],
  },

  s6u1_570_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '청첩장을 보낸 뒤 가족과 친구들에게 결혼 소식을 전했다는 문장을 만드세요.',
      'Taklifnomalarni yuborgandan so‘ng oila va do‘stlarga nikoh xabarini yetkazganini bildiradigan gap tuzing.',
      'Build a sentence meaning: “After sending the invitations, we shared our marriage news with family and friends.”',
      'Составьте предложение: «После отправки приглашений мы сообщили семье и друзьям новость о свадьбе».',
    ),
    options: [
      '가족과',
      '결혼',
      '청첩장을',
      '뒤',
      '소식을',
      '친구들에게',
      '보낸',
      '전했어요',
      '숨겼어요',
    ],
    answer: '청첩장을 보낸 뒤 가족과 친구들에게 결혼 소식을 전했어요',
    answerTranslation: L(
      '청첩장을 보낸 뒤 가족과 친구들에게 결혼 소식을 전했어요.',
      'Taklifnomalarni yuborgach, oila va do‘stlarga nikoh xabarini aytdik.',
      'After sending the invitations, we told our family and friends the marriage news.',
      'После отправки приглашений мы сообщили семье и друзьям о свадьбе.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['marriage-news', 'wedding-invitation', 'translate-builder'],
  },

  s6u1_571_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 두 단어를 입력하세요.',
      'Eshitgan gapingizdagi ikki tushib qolgan so‘zni yozing.',
      'Type the two missing words.',
      'Введите два пропущенных слова.',
    ),
    audioText: '신혼집을 구한 뒤 신혼여행 계획을 세웠어요.',
    sentenceTemplate: '___을 구한 뒤 ___ 계획을 세웠어요.',
    blankAnswers: ['신혼집', '신혼여행'],
    answerTranslation: L(
      '신혼집을 구한 뒤 신혼여행 계획을 세웠어요.',
      'Yangi uy topgandan keyin asal oyi safarini rejalashtirdik.',
      'After finding our newlywed home, we planned the honeymoon.',
      'После поиска жилья мы спланировали медовый месяц.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated words are 신혼집 and 신혼여행.',
      acceptedAnswers: [],
      notes: ['Require 신혼집 then 신혼여행.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['newlywed-home', 'honeymoon', 'listen-fill'],
  },

  s6u1_572_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '두 사람은 결혼식 장소인 ___을 예약하고 초대할 사람들에게 보낼 ___을 만들었습니다. 결혼식이 끝난 뒤 떠날 ___도 함께 계획했습니다.',
    blankAnswers: ['예식장', '청첩장', '신혼여행'],
    options: ['예식장', '청첩장', '신혼여행', '소개팅', '첫눈'],
    answer: '예식장|청첩장|신혼여행',
    answerTranslation: L(
      '예식장, 청첩장, 신혼여행을 준비하는 내용이에요.',
      'To‘y zali, taklifnoma va asal oyi safarini tayyorlash haqida.',
      'It describes preparing the wedding hall, invitations, and honeymoon.',
      'Речь идёт о подготовке свадебного зала, приглашений и медового месяца.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['wedding-preparation', 'cloze'],
  },

  s6u1_573_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '신혼부부가 함께 살 새 집은 ___이고, 결혼 후 새롭게 마련하는 생활 기반과 물건은 ___이에요.',
    blankAnswers: ['신혼집', '신혼살림'],
    answerTranslation: L(
      '신혼집과 신혼살림을 구별해요.',
      '신혼집 va 신혼살림 farqini o‘rganamiz.',
      'Distinguish newlywed home from newlywed household setup.',
      'Различаем дом молодожёнов и обустройство семейного быта.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target nouns are 신혼집 and 신혼살림.',
      acceptedAnswers: [],
      notes: ['Require 신혼집 then 신혼살림.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['newlywed-home', 'newlywed-life', 'type-answer'],
  },

  s6u1_574_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '결혼식 자체보다 결혼 후 두 사람이 어떻게 생활할지 함께 준비하는 것이 더 중요하다고 생각해요.',
    audioText:
      '결혼식 자체보다 결혼 후 두 사람이 어떻게 생활할지 함께 준비하는 것이 더 중요하다고 생각해요.',
    answerTranslation: L(
      '결혼식보다 결혼 후의 실제 생활을 함께 준비하는 것이 더 중요하다고 생각해요.',
      'To‘yning o‘zidan ko‘ra nikohdan keyingi hayotni birga rejalash muhimroq deb o‘ylayman.',
      'I think preparing for life after marriage is more important than the wedding itself.',
      'Я считаю подготовку к жизни после свадьбы важнее самой церемонии.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['married-life', 'speaking'],
  },

  s6u1_575_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '결혼식보다 결혼 후의 생활을 함께 준비하는 것이 더 중요하다는 문장을 만드세요.',
      'To‘y marosimidan ko‘ra nikohdan keyingi hayotni birga tayyorlash muhimroq ekanini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Preparing life after marriage together is more important than the wedding itself.”',
      'Составьте предложение: «Совместная подготовка к жизни после свадьбы важнее самой церемонии».',
    ),
    options: [
      '준비하는',
      '결혼식보다',
      '생활을',
      '더',
      '함께',
      '결혼',
      '것이',
      '후의',
      '중요해요',
      '피하는',
    ],
    answer: '결혼식보다 결혼 후의 생활을 함께 준비하는 것이 더 중요해요',
    answerTranslation: L(
      '결혼식보다 결혼 후의 생활을 함께 준비하는 것이 더 중요해요.',
      'To‘ydan ko‘ra nikohdan keyingi hayotni birga tayyorlash muhimroq.',
      'Preparing married life together is more important than the wedding ceremony.',
      'Совместная подготовка к семейной жизни важнее самой свадьбы.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['married-life', 'translate-builder'],
  },

  s6u1_576_listening: {
    type: 'listening',
    instruction: L(
      '여자가 결혼 준비에서 가장 중요하게 생각하는 태도를 고르세요.',
      'Ayol nikoh tayyorgarligida eng muhim deb biladigan munosabatni tanlang.',
      'Choose the attitude the woman considers most important during wedding preparation.',
      'Выберите отношение, которое женщина считает самым важным при подготовке к свадьбе.',
    ),
    audioText:
      '결혼 준비를 하다 보면 예식장이나 집처럼 결정할 게 정말 많아요. 저는 한 사람이 다 정하기보다 서로 원하는 걸 이야기하고 같이 결정하는 게 중요하다고 생각해요.',
    options: [
      '서로 의견을 말하고 함께 결정하는 것',
      '한 사람이 모든 것을 혼자 결정하는 것',
      '상대방의 의견을 듣지 않는 것',
      '예산을 전혀 생각하지 않는 것',
    ],
    answer: '서로 의견을 말하고 함께 결정하는 것',
    answerTranslation: L(
      '서로의 의견을 이야기하고 함께 결정하는 것이 중요하다고 해요.',
      'Bir-birining fikrini aytib, birga qaror qilish muhim deb hisoblaydi.',
      'She values discussing preferences and making decisions together.',
      'Она считает важным обсуждать пожелания и принимать решения вместе.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['wedding-preparation', 'cooperation', 'listening'],
  },

  s6u1_577_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '연애하던 두 사람이 결혼하면 ___이고, 소개나 중매로 만나 결혼하면 ___이에요.',
    blankAnswers: ['연애결혼', '중매결혼'],
    options: ['연애결혼', '중매결혼', '신혼집', '청첩장', '유효기간'],
    answer: '연애결혼|중매결혼',
    answerTranslation: L(
      '연애결혼과 중매결혼을 다시 복습해요.',
      '연애결혼 va 중매결혼 ni yana takrorlaymiz.',
      'Review love marriage and arranged marriage.',
      'Повторяем брак по любви и брак через сватовство.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 4,
    tags: ['love-marriage', 'arranged-marriage', 'multi-blank'],
  },

  s6u1_578_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '존중하며',
      '결혼을',
      '준비했어요',
      '서로의',
      '두',
      '사람은',
      '의견을',
      '무시하며',
    ],
    answer: '두 사람은 서로의 의견을 존중하며 결혼을 준비했어요',
    audioText: '두 사람은 서로의 의견을 존중하며 결혼을 준비했어요.',
    answerTranslation: L(
      '두 사람은 서로의 의견을 존중하면서 결혼 준비를 했어요.',
      'Ular bir-birining fikrini hurmat qilib nikohga tayyorlanishdi.',
      'They prepared for marriage while respecting each other’s opinions.',
      'Они готовились к свадьбе, уважая мнение друг друга.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['respect', 'wedding-preparation', 'word-arrange'],
  },

  s6u1_579_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '다른 사람에게 결혼하게 되었다고 알리는 내용은 ___이고, 결혼식에 초대하기 위해 보내는 것은 ___이에요.',
    blankAnswers: ['결혼 소식', '청첩장'],
    answerTranslation: L(
      '결혼 소식과 청첩장을 구별해요.',
      '결혼 소식 va 청첩장 farqini o‘rganamiz.',
      'Distinguish marriage news from wedding invitation.',
      'Различаем новость о свадьбе и свадебное приглашение.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The expressions are 결혼 소식 and 청첩장.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in 결혼 소식.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['marriage-news', 'wedding-invitation', 'type-answer'],
  },

  s6u1_580_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '글의 핵심 내용과 가장 가까운 것을 고르세요.',
      'Matnning asosiy mazmuniga eng yaqin javobni tanlang.',
      'Choose the statement closest to the main idea.',
      'Выберите утверждение, наиболее близкое к основной мысли.',
    ),
    passage:
      '결혼 준비는 예식장과 청첩장을 정하는 것만으로 끝나지 않습니다. 신혼집, 생활비, 집안일을 어떻게 나눌지도 미리 이야기할 필요가 있습니다. 결혼식 하루보다 결혼 후의 긴 생활을 함께 준비하는 것이 더 중요할 수 있습니다.',
    options: [
      '결혼식뿐 아니라 결혼 후 생활도 함께 준비해야 한다',
      '예식장만 정하면 모든 준비가 끝난다',
      '생활비는 결혼 후에 처음 생각하면 된다',
      '신혼집은 두 사람이 함께 논의할 필요가 없다',
    ],
    answer: '결혼식뿐 아니라 결혼 후 생활도 함께 준비해야 한다',
    answerTranslation: L(
      '결혼식뿐 아니라 결혼 후의 실제 생활도 함께 준비해야 한다는 내용이에요.',
      'Faqat to‘yni emas, nikohdan keyingi haqiqiy hayotni ham birga rejalash kerak.',
      'The passage says couples should prepare for married life, not only the wedding.',
      'Текст говорит, что нужно готовиться не только к свадьбе, но и к семейной жизни.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['married-life', 'review', 'reading'],
  },

  // ────────────────────────────────────────────────────────────
  // Lesson 5 · 연애·결혼 전체 종합
  // q581 ~ q600
  // ────────────────────────────────────────────────────────────

  s6u1_581_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '처음의 설렘보다 서로 이해하고 오래 함께하는 마음이 더 중요하다는 문장을 만드세요.',
      'Dastlabki hayajondan ko‘ra bir-birini tushunib uzoq birga bo‘lish istagi muhimroq ekanini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Mutual understanding and the desire to stay together are more important than initial excitement.”',
      'Составьте предложение: «Взаимопонимание и желание долго быть вместе важнее первоначального волнения».',
    ),
    options: [
      '이해하고',
      '마음이',
      '처음의',
      '오래',
      '함께하는',
      '더',
      '서로',
      '중요해요',
      '설렘보다',
      '외모가',
    ],
    answer: '처음의 설렘보다 서로 이해하고 오래 함께하는 마음이 더 중요해요',
    answerTranslation: L(
      '처음의 설렘보다 서로 이해하고 오래 함께하려는 마음이 더 중요해요.',
      'Dastlabki hayajondan ko‘ra bir-birini tushunib uzoq birga bo‘lish istagi muhimroq.',
      'Understanding each other and wanting to stay together matters more than initial excitement.',
      'Взаимопонимание и желание долго быть вместе важнее первоначального волнения.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love', 'understanding', 'translate-builder'],
  },

  s6u1_582_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '사랑이 얼마나 지속되는지를 비유적으로 말하는 표현은 ___이고, 한 사람의 전체 삶은 ___이에요.',
    blankAnswers: ['유효기간', '일생'],
    answerTranslation: L(
      '유효기간과 일생을 구별해요.',
      '유효기간 va 일생 farqini o‘rganamiz.',
      'Distinguish 유효기간 and 일생.',
      'Различаем 유효기간 и 일생.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The target words are 유효기간 and 일생.',
      acceptedAnswers: [],
      notes: ['Require 유효기간 then 일생.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['expiration-period', 'lifetime', 'type-answer'],
  },

  s6u1_583_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '사랑하는 감정이 약해지는 것은 ___고 하고, 화났던 마음이 가라앉는 것은 ___고 해요.',
    blankAnswers: ['사랑이 식다', '화가 풀리다'],
    options: [
      '사랑이 식다',
      '화가 풀리다',
      '첫눈에 반하다',
      '청혼하다',
      '선보다',
    ],
    answer: '사랑이 식다|화가 풀리다',
    answerTranslation: L(
      '사랑이 식다와 화가 풀리다를 구별해요.',
      '사랑이 식다 va 화가 풀리다 farqini o‘rganamiz.',
      'Distinguish love cooling from anger subsiding.',
      'Различаем «любовь остывает» и «гнев проходит».',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-cool', 'anger', 'multi-blank'],
  },

  s6u1_584_listening: {
    type: 'listening',
    instruction: L(
      '두 사람이 관계를 계속 유지할 수 있었던 가장 큰 이유를 고르세요.',
      'Ularning munosabatni davom ettira olgan asosiy sababini tanlang.',
      'Choose the main reason the couple was able to maintain their relationship.',
      'Выберите главную причину, по которой пара смогла сохранить отношения.',
    ),
    audioText:
      '우리도 오래 만나면서 많이 다퉜어요. 사랑이 식은 것 같다고 느낀 적도 있었고요. 그래도 문제가 생기면 서로 이야기하고 잘못한 사람은 사과했어요. 그래서 다시 화해하면서 지금까지 함께할 수 있었어요.',
    options: [
      '갈등이 생길 때 대화하고 사과하며 화해했기 때문에',
      '한 번도 갈등이 없었기 때문에',
      '항상 한 사람만 양보했기 때문에',
      '문제가 생길 때마다 연락을 끊었기 때문에',
    ],
    answer: '갈등이 생길 때 대화하고 사과하며 화해했기 때문에',
    answerTranslation: L(
      '갈등이 생길 때 대화하고 사과하고 화해해서 관계를 유지했어요.',
      'Nizo paytida gaplashib, uzr so‘rab va yarashib munosabatni saqlashdi.',
      'They maintained the relationship by communicating, apologizing, and reconciling.',
      'Они сохраняли отношения благодаря разговорам, извинениям и примирению.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['conflict', 'reconciliation', 'listening'],
  },

  s6u1_585_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '갈등이 생겨도 서로 사과하고 화해하면서 관계를 지켜 왔다는 문장을 만드세요.',
      'Nizo bo‘lsa ham, bir-biridan uzr so‘rab yarashib munosabatni saqlab kelganini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Even when conflicts arose, we protected our relationship by apologizing and reconciling.”',
      'Составьте предложение: «Даже при конфликтах мы сохраняли отношения, извиняясь и мирясь».',
    ),
    options: [
      '지켜',
      '생겨도',
      '사과하고',
      '관계를',
      '화해하면서',
      '갈등이',
      '서로',
      '왔어요',
      '끝내',
    ],
    answer: '갈등이 생겨도 서로 사과하고 화해하면서 관계를 지켜 왔어요',
    answerTranslation: L(
      '갈등이 생겨도 서로 사과하고 화해하면서 관계를 지켜 왔어요.',
      'Nizo bo‘lsa ham, bir-birimizdan uzr so‘rab yarashib munosabatni saqladik.',
      'Even when conflicts occurred, we maintained our relationship through apology and reconciliation.',
      'Даже при конфликтах мы сохраняли отношения через извинения и примирение.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['conflict', 'reconciliation', 'translate-builder'],
  },

  s6u1_586_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '사람이에요',
      '서로를',
      '조건보다',
      '이해하는',
      '좋은',
      '배우자는',
      '무시하는',
      '외모만',
    ],
    answer: '좋은 배우자는 조건보다 서로를 이해하는 사람이에요',
    audioText: '좋은 배우자는 조건보다 서로를 이해하는 사람이에요.',
    answerTranslation: L(
      '좋은 배우자는 조건보다 서로를 이해할 수 있는 사람이에요.',
      'Yaxshi turmush o‘rtog‘i shartlardan ko‘ra bir-birini tushuna oladigan insondir.',
      'A good spouse is someone who understands you, beyond external conditions.',
      'Хороший супруг — это человек, который понимает вас, а не просто соответствует условиям.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['spouse', 'understanding', 'word-arrange'],
  },

  s6u1_587_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '서로 아주 잘 어울리는 두 사람을 비유적으로 ___이라고 하고, 결혼한 남편이나 아내를 공식적으로 ___라고 해요.',
    blankAnswers: ['천생연분', '배우자'],
    answerTranslation: L(
      '천생연분과 배우자를 구별해요.',
      '천생연분 va 배우자 farqini o‘rganamiz.',
      'Distinguish 천생연분 and 배우자.',
      'Различаем 천생연분 и 배우자.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The answers are 천생연분 and 배우자.',
      acceptedAnswers: [],
      notes: ['Require 천생연분 then 배우자.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['perfect-match', 'spouse', 'type-answer'],
  },

  s6u1_588_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      '두 사람의 관계가 오래 이어진 가장 중요한 이유를 고르세요.',
      'Ularning munosabati uzoq davom etgan asosiy sababni tanlang.',
      'Choose the most important reason the relationship lasted.',
      'Выберите главную причину, по которой отношения продлились долго.',
    ),
    passage:
      '두 사람은 소개팅으로 처음 만났습니다. 처음에는 첫눈에 반한 것은 아니었지만 대화가 잘 통했고 점점 사랑에 빠졌습니다. 연애 중에는 성격 차이로 다투기도 했고 결혼을 결정할 때는 부모님의 반대와 경제적인 문제도 있었습니다. 그때마다 상대방의 말을 듣고 함께 해결하려고 노력했습니다. 지금은 결혼한 지 10년이 됐습니다.',
    options: [
      '문제가 생길 때마다 서로 대화하고 함께 해결하려고 했기 때문에',
      '처음부터 아무 문제가 없었기 때문에',
      '항상 부모님이 모든 문제를 해결했기 때문에',
      '두 사람의 성격이 완전히 같았기 때문에',
    ],
    answer: '문제가 생길 때마다 서로 대화하고 함께 해결하려고 했기 때문에',
    answerTranslation: L(
      '문제가 있을 때마다 함께 해결하려고 노력해서 오래 관계를 유지했어요.',
      'Har muammo chiqqanda uni birga hal qilishga harakat qilgani uchun munosabat uzoq davom etdi.',
      'Their relationship lasted because they continually worked through problems together.',
      'Отношения продлились долго, потому что они вместе решали возникающие проблемы.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['unit-review', 'reading'],
  },

  s6u1_589_error_hunt: {
    type: 'error_hunt',
    instruction: ERROR_INSTRUCTION,
    npcText:
      '사랑이 식은 것 같을 때는 서로 대화하지 않으면 관계를 회복하기 쉬워요.',
    wrongWord: '쉬워요.',
    options: ['어려워요.', '쉬워요.', '영원해요.', '편해요.'],
    answer: '어려워요.',
    answerTranslation: L(
      '사랑이 식은 것 같을 때는 서로 대화하지 않으면 관계를 회복하기 어려워요.',
      'Sevgi sovigandek tuyulganda gaplashilmasa munosabatni tiklash qiyin.',
      'If love feels weaker, repairing the relationship is difficult without communication.',
      'Если кажется, что любовь остыла, восстановить отношения без общения трудно.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['love-cool', 'communication', 'error-hunt'],
  },

  s6u1_590_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '사랑은 여러 단계를 지나며 다른 모습으로 깊어질 수 있다는 문장을 만드세요.',
      'Sevgi turli bosqichlardan o‘tib boshqa shaklda chuqurlashishi mumkinligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Love can deepen into different forms as it passes through different stages.”',
      'Составьте предложение: «Любовь может углубляться и принимать разные формы, проходя разные этапы».',
    ),
    options: [
      '다른',
      '지나며',
      '사랑은',
      '깊어질',
      '여러',
      '모습으로',
      '단계를',
      '수 있어요',
      '끝날',
    ],
    answer: '사랑은 여러 단계를 지나며 다른 모습으로 깊어질 수 있어요',
    answerTranslation: L(
      '사랑은 여러 단계를 거치면서 다른 모습으로 깊어질 수 있어요.',
      'Sevgi turli bosqichlardan o‘tib boshqa shaklda chuqurlashishi mumkin.',
      'Love can deepen in different forms as it moves through stages.',
      'Любовь может углубляться и менять форму, проходя разные этапы.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['stage', 'love-change', 'translate-builder'],
  },

  s6u1_591_listen_fill: {
    type: 'listen_fill',
    instruction: L(
      '들은 문장에서 빠진 두 표현을 입력하세요.',
      'Eshitgan gapingizdagi ikki tushib qolgan ifodani yozing.',
      'Type the two missing expressions.',
      'Введите два пропущенных выражения.',
    ),
    audioText: '처음으로 사랑에 빠졌을 때는 그 사랑이 영원할 줄 알았어요.',
    sentenceTemplate: '___ 사랑에 빠졌을 때는 그 사랑이 ___할 줄 알았어요.',
    blankAnswers: ['처음으로', '영원'],
    answerTranslation: L(
      '처음 사랑에 빠졌을 때는 그 사랑이 영원할 줄 알았어요.',
      'Birinchi marta sevib qolganimda bu sevgi abadiy bo‘ladi deb o‘ylagandim.',
      'When I first fell in love, I thought the love would last forever.',
      'Когда я впервые влюбился, я думал, что любовь будет вечной.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The dictated answers are 처음으로 and 영원.',
      acceptedAnswers: [],
      notes: ['Require 처음으로 then 영원.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['first-time', 'eternal', 'listen-fill'],
  },

  s6u1_592_cloze_passage: {
    type: 'cloze_passage',
    instruction: CLOZE_INSTRUCTION,
    passage:
      '두 사람은 ___으로 처음 만난 뒤 연애를 시작했습니다. 몇 년 후 남자가 ___했고, 결국 두 사람은 가족의 축복을 받으며 ___했습니다.',
    blankAnswers: ['소개팅', '청혼', '결혼'],
    options: ['소개팅', '청혼', '결혼', '유효기간', '오해'],
    answer: '소개팅|청혼|결혼',
    answerTranslation: L(
      '소개팅으로 만나 연애하고 청혼한 뒤 결혼하는 흐름이에요.',
      'Tanishuvdan boshlab, uchrashib, taklif qilib, nikohga boradigan jarayon.',
      'It shows the progression from blind date to proposal and marriage.',
      'Это путь от знакомства вслепую до предложения и брака.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['relationship-progression', 'cloze'],
  },

  s6u1_593_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '부모님이 결혼에 동의하지 않는 상황은 ___이고, 돈과 생활비 때문에 생기는 어려움은 ___예요.',
    blankAnswers: ['부모의 반대', '경제적인 문제'],
    answerTranslation: L(
      '부모의 반대와 경제적인 문제를 구별해요.',
      '부모의 반대 va 경제적인 문제 farqini o‘rganamiz.',
      'Distinguish parental opposition from financial problems.',
      'Различаем возражения родителей и финансовые проблемы.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The expressions are 부모의 반대 and 경제적인 문제.',
      acceptedAnswers: [],
      notes: ['Require exact spacing in both expressions.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['parental-opposition', 'financial-problem', 'type-answer'],
  },

  s6u1_594_speaking: {
    type: 'speaking',
    instruction: SPEAK_INSTRUCTION,
    answer:
      '저는 사랑만으로 결혼생활이 유지되는 것은 아니고 서로 이해하고 존중하며 문제를 함께 해결해야 한다고 생각해요.',
    audioText:
      '저는 사랑만으로 결혼생활이 유지되는 것은 아니고 서로 이해하고 존중하며 문제를 함께 해결해야 한다고 생각해요.',
    answerTranslation: L(
      '결혼생활에는 사랑뿐 아니라 이해와 존중, 문제 해결도 필요하다고 생각해요.',
      'Oilaviy hayot uchun sevgidan tashqari tushunish, hurmat va muammoni birga hal qilish ham kerak.',
      'I think married life requires understanding, respect, and cooperation in addition to love.',
      'Я считаю, что для семейной жизни нужны не только любовь, но и понимание, уважение и совместное решение проблем.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    difficulty: 5,
    tags: ['marriage-view', 'speaking'],
  },

  s6u1_595_translate_builder: {
    type: 'translate_builder',
    instruction: L(
      '일생을 함께하려면 사랑뿐 아니라 존중과 배려도 필요하다는 문장을 만드세요.',
      'Bir umr birga bo‘lish uchun sevgidan tashqari hurmat va e’tibor ham kerakligini bildiradigan gap tuzing.',
      'Build a sentence meaning: “Spending a lifetime together requires respect and consideration as well as love.”',
      'Составьте предложение: «Чтобы прожить вместе всю жизнь, нужны не только любовь, но и уважение и забота».',
    ),
    options: [
      '존중과',
      '필요해요',
      '함께하려면',
      '사랑뿐',
      '배려도',
      '일생을',
      '아니라',
      '외모만',
    ],
    answer: '일생을 함께하려면 사랑뿐 아니라 존중과 배려도 필요해요',
    answerTranslation: L(
      '평생 함께하려면 사랑뿐 아니라 존중과 배려도 필요해요.',
      'Bir umr birga bo‘lish uchun sevgidan tashqari hurmat va e’tibor ham kerak.',
      'A lifelong relationship requires respect and consideration as well as love.',
      'Для совместной жизни нужны не только любовь, но и уважение и забота.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['lifetime', 'respect', 'translate-builder'],
  },

  s6u1_596_listening: {
    type: 'listening',
    instruction: L(
      '사연을 보낸 사람이 현재 가장 중요하게 생각하는 것을 고르세요.',
      'Xat yuborgan inson hozir eng muhim deb biladigan narsani tanlang.',
      'Choose what the person sending the story now considers most important.',
      'Выберите, что автор истории теперь считает самым важным.',
    ),
    audioText:
      '처음 만났을 때는 외모와 설렘이 가장 중요하다고 생각했습니다. 결혼한 뒤 여러 문제를 함께 겪으면서 지금은 상대방을 이해하고 힘든 순간에도 함께하는 마음이 더 중요하다는 걸 알게 됐습니다.',
    options: [
      '상대방을 이해하고 힘든 순간에도 함께하는 것',
      '처음의 설렘만 계속 유지하는 것',
      '외모가 항상 변하지 않는 것',
      '문제가 생기면 서로 피하는 것',
    ],
    answer: '상대방을 이해하고 힘든 순간에도 함께하는 것',
    answerTranslation: L(
      '지금은 이해와 함께하는 마음을 가장 중요하게 생각해요.',
      'Hozir u tushunish va qiyin paytda birga bo‘lishni eng muhim deb biladi.',
      'Now they value understanding and staying together through difficult times.',
      'Теперь автор больше всего ценит понимание и поддержку в трудные моменты.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    difficulty: 5,
    tags: ['marriage-view', 'listening'],
  },

  s6u1_597_fill_in_blank: {
    type: 'fill_in_blank',
    instruction: BLANK_INSTRUCTION,
    sentenceTemplate:
      '서로 다른 성격 때문에 생기는 문제는 ___이고, 믿는 종교가 달라 생기는 문제는 ___예요.',
    blankAnswers: ['성격 차이', '종교 차이'],
    options: ['성격 차이', '종교 차이', '신혼여행', '연애결혼', '첫눈'],
    answer: '성격 차이|종교 차이',
    answerTranslation: L(
      '성격 차이와 종교 차이를 구별해요.',
      '성격 차이 va 종교 차이 farqini o‘rganamiz.',
      'Distinguish personality differences from religious differences.',
      'Различаем различия характеров и различия в религии.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['personality-difference', 'religion-difference', 'multi-blank'],
  },

  s6u1_598_word_arrange: {
    type: 'word_arrange',
    instruction: ARRANGE_INSTRUCTION,
    options: [
      '관계를',
      '오래',
      '변화를',
      '받아들이면',
      '유지할',
      '서로의',
      '수 있어요',
      '끝낼',
    ],
    answer: '서로의 변화를 받아들이면 관계를 오래 유지할 수 있어요',
    audioText: '서로의 변화를 받아들이면 관계를 오래 유지할 수 있어요.',
    answerTranslation: L(
      '서로 변하는 모습을 받아들이면 관계를 오래 이어 갈 수 있어요.',
      'Bir-birining o‘zgarishini qabul qilsa, munosabatni uzoq davom ettirish mumkin.',
      'Accepting each other’s changes can help maintain a relationship long term.',
      'Принятие изменений друг друга помогает долго сохранять отношения.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['relationship-maintenance', 'change', 'word-arrange'],
  },

  s6u1_599_type_answer: {
    type: 'type_answer',
    instruction: TYPE_ANSWER_INSTRUCTION,
    sentenceTemplate:
      '결혼과 배우자에 대해 가진 전체적인 생각은 ___이고, 좋은 사이가 계속 이어지게 하는 것은 ___예요.',
    blankAnswers: ['결혼관', '관계를 유지하다'],
    answerTranslation: L(
      '결혼관과 관계를 유지하다를 구별해요.',
      '결혼관 va 관계를 유지하다 farqini o‘rganamiz.',
      'Distinguish marriage values from maintaining a relationship.',
      'Различаем взгляды на брак и поддержание отношений.',
    ),
    grading: {
      mode: 'exact',
      expectedMeaning: 'The expressions are 결혼관 and 관계를 유지하다.',
      acceptedAnswers: [],
      notes: ['Require exact answers in order.'],
      tolerance: {
        punctuation: true,
        spacing: false,
        minorTypos: false,
      },
    },
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['marriage-view', 'relationship-maintenance', 'type-answer'],
  },

  s6u1_600_reading_quiz: {
    type: 'reading_quiz',
    instruction: L(
      'Unit 1 전체의 핵심 생각을 가장 잘 요약한 것을 고르세요.',
      'Unit 1 ning asosiy mazmunini eng yaxshi umumlashtirgan javobni tanlang.',
      'Choose the statement that best summarizes the whole unit.',
      'Выберите утверждение, лучше всего передающее основную мысль всего раздела.',
    ),
    passage:
      '사람들은 소개팅이나 우연한 만남을 통해 사랑을 시작하기도 합니다. 서로 잘 맞으면 연애를 하고 결혼을 생각할 수도 있습니다. 하지만 결혼에는 사랑뿐 아니라 배우자 조건, 가족의 생각, 경제적인 문제와 현실적인 준비도 필요합니다. 오랜 관계에서는 다툼과 오해가 생기거나 사랑이 식은 것처럼 느껴질 때도 있습니다. 그런 순간마다 상대방을 이해하고 존중하며 대화하고 함께 해결하려는 노력이 관계를 오래 이어 가게 합니다.',
    options: [
      '사랑과 결혼은 감정뿐 아니라 이해, 존중, 대화와 현실적인 준비가 함께 필요하다',
      '좋은 관계에는 갈등이 절대로 생기지 않아야 한다',
      '외적인 조건만 맞으면 행복한 결혼이 보장된다',
      '처음의 설렘이 줄면 관계는 반드시 끝나야 한다',
    ],
    answer:
      '사랑과 결혼은 감정뿐 아니라 이해, 존중, 대화와 현실적인 준비가 함께 필요하다',
    answerTranslation: L(
      '사랑과 결혼에는 감정뿐 아니라 이해, 존중, 대화, 현실적인 준비가 필요하다는 내용이에요.',
      'Sevgi va nikoh uchun hislardan tashqari tushunish, hurmat, muloqot va real tayyorgarlik kerak.',
      'Love and marriage require not only emotion but also understanding, respect, communication, and practical preparation.',
      'Любовь и брак требуют не только чувств, но и понимания, уважения, общения и практической подготовки.',
    ),
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    difficulty: 5,
    tags: ['section6', 'unit1', 'node6', 'unit-review', 'reading'],
  },
};

const S6_UNIT1_NODE6_WORDS = [
  {
    code: 'romance-lean-on-shoulder',
    korean: '어깨에 기대다',
    senseKey: 'lean-on-someones-shoulder',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '상대방의 어깨에 몸을 살짝 의지하다',
      'boshqa insonning yelkasiga suyanmoq',
      'to lean on someone’s shoulder',
      'прислониться к чьему-либо плечу',
    ),
    examples: [
      {
        korean: '지수는 벤치에서 남자 친구의 어깨에 기대었어요.',
        translations: L(
          '지수는 벤치에 앉아 남자 친구의 어깨에 몸을 기댔어요.',
          'Jisu skameykada yigitining yelkasiga suyandi.',
          'Jisu leaned on her boyfriend’s shoulder while sitting on a bench.',
          'Джису прислонилась к плечу своего парня на скамейке.',
        ),
      },
    ],
    pronunciation: {
      hangul: '어깨에 기대다',
      romanization: 'eokkaee gidaeda',
      ttsText: '어깨에 기대다',
    },
    media: {
      emoji: '🫂',
      imageUrl: '',
      imageAlt: L(
        '연인의 어깨에 기대는 사람',
        'sevgan insonining yelkasiga suyanayotgan odam',
        'a person leaning on a partner’s shoulder',
        'человек, прислонившийся к плечу партнёра',
      ),
    },
    tags: ['romance', 'body-language', 'dating'],
    difficulty: 5,
    usageNote: L(
      '`N의 어깨에 기대다` 형태로 누구의 어깨에 몸을 의지하는지 표현할 수 있어요.',
      '`N의 어깨에 기대다` shakli kimning yelkasiga suyanishni bildiradi.',
      'Use N의 어깨에 기대다 to specify whose shoulder someone leans on.',
      'Конструкция N의 어깨에 기대다 указывает, на чьё плечо человек опирается.',
    ),
    isCore: true,
  },

  {
    code: 'relationship-hearts-match',
    korean: '마음이 잘 맞다',
    senseKey: 'emotionally-compatible',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '두 사람이 감정이나 성향 면에서 서로 편하고 잘 어울리다',
      'ikki insonning ko‘ngli va fe’li bir-biriga mos kelmoq',
      'to be emotionally compatible; to get along well',
      'хорошо подходить друг другу душевно',
    ),
    examples: [
      {
        korean: '우리는 처음 만났을 때부터 마음이 잘 맞았어요.',
        translations: L(
          '우리는 처음부터 서로 편하고 잘 어울렸어요.',
          'Biz birinchi uchrashuvdanoq bir-birimizga yaxshi mos tushdik.',
          'We got along well from the first time we met.',
          'Мы хорошо подошли друг другу с первой встречи.',
        ),
      },
    ],
    pronunciation: {
      hangul: '마음이 잘 맞다',
      romanization: 'maeumi jal matda',
      ttsText: '마음이 잘 맞다',
    },
    media: {
      emoji: '💕',
      imageUrl: '',
      imageAlt: L(
        '서로 마음이 잘 맞는 두 사람',
        'bir-biriga ko‘ngli mos ikki inson',
        'two people who are emotionally compatible',
        'двое людей, хорошо подходящих друг другу',
      ),
    },
    tags: ['relationship', 'compatibility', 'emotion'],
    difficulty: 5,
    usageNote: L(
      '`성격이 잘 맞다`와 비슷하지만 마음과 감정적인 궁합을 더 넓게 말할 때 쓸 수 있어요.',
      '`성격이 잘 맞다`ga o‘xshaydi, ammo hissiy moslikni kengroq ifodalaydi.',
      'It is similar to 성격이 잘 맞다 but can refer more broadly to emotional compatibility.',
      'Похоже на 성격이 잘 맞다, но шире описывает душевную совместимость.',
    ),
    isCore: true,
  },

  {
    code: 'relationship-thoughts-connect',
    korean: '생각이 잘 통하다',
    senseKey: 'understand-each-others-thinking',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '서로의 생각이나 가치관을 쉽게 이해하고 공감하다',
      'bir-birining fikri va qarashlarini yaxshi tushunmoq',
      'to understand each other’s thinking well',
      'хорошо понимать мысли и взгляды друг друга',
    ),
    examples: [
      {
        korean: '우리는 중요한 문제에 대해서 생각이 잘 통해요.',
        translations: L(
          '우리는 중요한 문제에 대한 생각과 가치관이 비슷해요.',
          'Muhim masalalarda fikr va qarashlarimiz yaxshi mos keladi.',
          'We understand each other well on important issues.',
          'Мы хорошо понимаем друг друга в важных вопросах.',
        ),
      },
    ],
    pronunciation: {
      hangul: '생각이 잘 통하다',
      romanization: 'saenggagi jal tonghada',
      ttsText: '생각이 잘 통하다',
    },
    media: {
      emoji: '💭',
      imageUrl: '',
      imageAlt: L(
        '서로 생각을 잘 이해하는 두 사람',
        'bir-birining fikrini yaxshi tushunadigan ikki inson',
        'two people who understand each other’s thinking',
        'двое людей, хорошо понимающих мысли друг друга',
      ),
    },
    tags: ['relationship', 'communication', 'compatibility'],
    difficulty: 5,
    usageNote: L(
      '`말이 잘 통하다`가 대화의 편안함을 강조한다면 `생각이 잘 통하다`는 생각이나 가치관의 이해를 더 강조해요.',
      '`말이 잘 통하다` suhbat qulayligini, `생각이 잘 통하다` esa fikr va qadriyat mosligini ko‘proq ta’kidlaydi.',
      '말이 잘 통하다 emphasizes easy conversation, while 생각이 잘 통하다 emphasizes compatible thinking or values.',
      '말이 잘 통하다 подчёркивает лёгкость общения, а 생각이 잘 통하다 — совпадение взглядов.',
    ),
    isCore: true,
  },

  {
    code: 'marriage-news',
    korean: '결혼 소식',
    senseKey: 'news-of-marriage',
    partOfSpeech: WordPartOfSpeech.PHRASE,
    meaning: L(
      '누군가 결혼하게 되었다는 소식',
      'kimningdir turmush qurishi haqidagi xabar',
      'news of an upcoming marriage',
      'новость о предстоящей свадьбе',
    ),
    examples: [
      {
        korean: '친구들에게 결혼 소식을 전했어요.',
        translations: L(
          '친구들에게 제가 결혼하게 되었다고 알렸어요.',
          'Do‘stlarimga turmush qurishim haqidagi xabarni aytdim.',
          'I told my friends the news that I was getting married.',
          'Я сообщил друзьям новость о своей свадьбе.',
        ),
      },
    ],
    pronunciation: {
      hangul: '결혼 소식',
      romanization: 'gyeolhon sosik',
      ttsText: '결혼 소식',
    },
    media: {
      emoji: '💌',
      imageUrl: '',
      imageAlt: L(
        '결혼 소식을 전하는 사람',
        'nikoh xabarini yetkazayotgan inson',
        'a person sharing marriage news',
        'человек, сообщающий новость о свадьбе',
      ),
    },
    tags: ['marriage', 'news', 'wedding'],
    difficulty: 4,
    usageNote: L(
      '`결혼 소식을 전하다`, `결혼 소식을 듣다`처럼 사용할 수 있어요.',
      '`결혼 소식을 전하다`, `결혼 소식을 듣다` kabi ishlatiladi.',
      'Common expressions include 결혼 소식을 전하다 and 결혼 소식을 듣다.',
      'Частые выражения: 결혼 소식을 전하다 и 결혼 소식을 듣다.',
    ),
    isCore: true,
  },
] satisfies readonly WordSeedEntry[];

export const S6_UNIT1_QUESTIONS = {
  ...S6_UNIT1_NODE1_QUESTIONS,
  ...S6_UNIT1_NODE2_QUESTIONS,
  ...S6_UNIT1_NODE3_QUESTIONS,
  ...S6_UNIT1_NODE4_QUESTIONS,
  ...S6_UNIT1_NODE5_QUESTIONS,
  ...S6_UNIT1_NODE6_QUESTIONS,
};

export const S6_UNIT1_WORDS = [
  ...S6_UNIT1_NODE1_WORDS,
  ...S6_UNIT1_NODE2_WORDS,
  ...S6_UNIT1_NODE3_WORDS,
  ...S6_UNIT1_NODE4_WORDS,
  ...S6_UNIT1_NODE5_WORDS,
  ...S6_UNIT1_NODE6_WORDS,
] satisfies readonly WordSeedEntry[];

export const S6_UNIT1_NODES = [
  {
    title: L(
      '첫 만남에서 연애 시작까지',
      'Birinchi uchrashuvdan munosabat boshlanishigacha',
      'From First Meeting to Dating',
      'От первой встречи до начала отношений',
    ),
    section: 6,
    unit: 1,
    order: 1,
    isActive: true,
    lessons: [
      {
        title: L(
          '첫 만남과 소개팅',
          'Birinchi uchrashuv va tanishuv',
          'First Meetings and Blind Dates',
          'Первая встреча и знакомство',
        ),
        description: L(
          '소개팅, 첫인상, 대화와 관련된 표현을 익혀요.',
          'Tanishuv, birinchi taassurot va suhbatga oid ifodalarni o‘rganamiz.',
          'Learn expressions for blind dates, first impressions, and conversation.',
          'Изучаем выражения для знакомства, первого впечатления и общения.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        questions: [
          's6u1_001_translate_builder',
          's6u1_002_type_answer',
          's6u1_003_sentence_builder',
          's6u1_004_reading_quiz',
          's6u1_005_translate_builder',
          's6u1_006_type_answer',
          's6u1_007_listening',
          's6u1_008_word_arrange',
          's6u1_009_translate_builder',
          's6u1_010_type_answer',
          's6u1_011_error_hunt',
          's6u1_012_cloze_passage',
          's6u1_013_translate_builder',
          's6u1_014_type_answer',
          's6u1_015_speaking',
          's6u1_016_listen_fill',
          's6u1_017_translate_builder',
          's6u1_018_type_answer',
          's6u1_019_verb_transform',
          's6u1_020_translate_type',
        ],
      },
      {
        title: L(
          '호감과 몸짓',
          'Yoqtirish va tana harakatlari',
          'Attraction and Body Language',
          'Симпатия и язык тела',
        ),
        description: L(
          '설렘과 호감을 나타내는 행동과 표현을 익혀요.',
          'Hayajon va yoqtirishni ifodalovchi harakat va iboralarni o‘rganamiz.',
          'Learn actions and expressions that show attraction and excitement.',
          'Изучаем действия и выражения, передающие симпатию и волнение.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        questions: [
          's6u1_021_translate_builder',
          's6u1_022_type_answer',
          's6u1_023_sentence_builder',
          's6u1_024_reading_quiz',
          's6u1_025_translate_builder',
          's6u1_026_type_answer',
          's6u1_027_listening',
          's6u1_028_word_arrange',
          's6u1_029_translate_builder',
          's6u1_030_type_answer',
          's6u1_031_error_hunt',
          's6u1_032_cloze_passage',
          's6u1_033_translate_builder',
          's6u1_034_type_answer',
          's6u1_035_speaking',
          's6u1_036_listen_fill',
          's6u1_037_translate_builder',
          's6u1_038_type_answer',
          's6u1_039_verb_transform',
          's6u1_040_translate_type',
        ],
      },
      {
        title: L(
          '연애의 시작',
          'Munosabatning boshlanishi',
          'Starting a Relationship',
          'Начало отношений',
        ),
        description: L(
          '사랑에 빠지고 고백하고 사귀는 과정을 표현해요.',
          'Sevib qolish, hislarni izhor qilish va uchrasha boshlashni ifodalashni o‘rganamiz.',
          'Learn to describe falling in love, confessing, and starting to date.',
          'Учимся описывать влюблённость, признание и начало отношений.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        questions: [
          's6u1_041_translate_builder',
          's6u1_042_type_answer',
          's6u1_043_sentence_builder',
          's6u1_044_reading_quiz',
          's6u1_045_translate_builder',
          's6u1_046_type_answer',
          's6u1_047_listening',
          's6u1_048_word_arrange',
          's6u1_049_translate_builder',
          's6u1_050_type_answer',
          's6u1_051_error_hunt',
          's6u1_052_cloze_passage',
          's6u1_053_translate_builder',
          's6u1_054_type_answer',
          's6u1_055_speaking',
          's6u1_056_listen_fill',
          's6u1_057_translate_builder',
          's6u1_058_type_answer',
          's6u1_059_verb_transform',
          's6u1_060_translate_type',
        ],
      },
      {
        title: L(
          '서로 잘 맞는 사람',
          'Bir-biriga mos insonlar',
          'Being Compatible',
          'Подходить друг другу',
        ),
        description: L(
          '성격, 대화, 마음씨와 같은 관계의 중요한 특징을 익혀요.',
          'Xarakter, muloqot va mehribonlik kabi munosabatdagi muhim jihatlarni o‘rganamiz.',
          'Learn relationship vocabulary about personality, communication, and kindness.',
          'Изучаем лексику о характере, общении и доброте в отношениях.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        questions: [
          's6u1_061_translate_builder',
          's6u1_062_type_answer',
          's6u1_063_sentence_builder',
          's6u1_064_reading_quiz',
          's6u1_065_translate_builder',
          's6u1_066_type_answer',
          's6u1_067_listening',
          's6u1_068_word_arrange',
          's6u1_069_translate_builder',
          's6u1_070_type_answer',
          's6u1_071_error_hunt',
          's6u1_072_cloze_passage',
          's6u1_073_translate_builder',
          's6u1_074_type_answer',
          's6u1_075_speaking',
          's6u1_076_listen_fill',
          's6u1_077_translate_builder',
          's6u1_078_type_answer',
          's6u1_079_verb_transform',
          's6u1_080_translate_type',
        ],
      },
      {
        title: L(
          '첫 만남부터 연애까지',
          'Birinchi uchrashuvdan sevgigacha',
          'From Meeting to Romance',
          'От знакомства к отношениям',
        ),
        description: L(
          '첫 만남, 호감, 고백, 관계 시작 표현을 긴 문맥에서 종합해요.',
          'Birinchi uchrashuv, yoqtirish, izhor va munosabat boshlanishi ifodalarini uzunroq kontekstda mustahkamlaymiz.',
          'Review first meetings, attraction, confession, and relationship vocabulary in richer contexts.',
          'Закрепляем лексику знакомства, симпатии, признания и начала отношений в более сложном контексте.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 5,
        questions: [
          's6u1_081_translate_builder',
          's6u1_082_type_answer',
          's6u1_083_sentence_builder',
          's6u1_084_reading_quiz',
          's6u1_085_translate_builder',
          's6u1_086_type_answer',
          's6u1_087_listening',
          's6u1_088_word_arrange',
          's6u1_089_translate_builder',
          's6u1_090_type_answer',
          's6u1_091_error_hunt',
          's6u1_092_cloze_passage',
          's6u1_093_translate_builder',
          's6u1_094_type_answer',
          's6u1_095_speaking',
          's6u1_096_listen_fill',
          's6u1_097_translate_builder',
          's6u1_098_type_answer',
          's6u1_099_verb_transform',
          's6u1_100_translate_type',
        ],
      },
    ],
  },
  {
    title: L(
      '결혼을 결정하고 준비하기',
      'Nikohga qaror qilish va tayyorgarlik',
      'Deciding on and Preparing for Marriage',
      'Решение о браке и подготовка',
    ),
    section: 6,
    unit: 1,
    order: 2,
    isActive: true,
    lessons: [
      {
        title: L(
          '결혼을 생각하다',
          'Nikoh haqida o‘ylash',
          'Thinking About Marriage',
          'Размышления о браке',
        ),
        description: L(
          '결혼 시기, 결혼 상대, 연애결혼과 중매결혼에 대한 생각을 표현해요.',
          'Nikoh vaqti, turmush o‘rtog‘i hamda sevgi va vositachi orqali nikoh haqidagi fikrlarni ifodalaymiz.',
          'Express views about marriage timing, partners, love marriage, and arranged marriage.',
          'Выражаем мнение о времени брака, партнёре, браке по любви и браке по сватовству.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        questions: [
          's6u1_101_translate_builder',
          's6u1_102_type_answer',
          's6u1_103_reading_quiz',
          's6u1_104_translate_builder',
          's6u1_105_type_answer',
          's6u1_106_sentence_builder',
          's6u1_107_translate_builder',
          's6u1_108_type_answer',
          's6u1_109_listening',
          's6u1_110_translate_builder',
          's6u1_111_type_answer',
          's6u1_112_error_hunt',
          's6u1_113_translate_builder',
          's6u1_114_type_answer',
          's6u1_115_cloze_passage',
          's6u1_116_translate_builder',
          's6u1_117_type_answer',
          's6u1_118_listen_fill',
          's6u1_119_word_arrange',
          's6u1_120_translate_type',
        ],
      },
      {
        title: L(
          '청혼과 결혼 결정',
          'Taklif va nikoh qarori',
          'Proposal and Marriage Decision',
          'Предложение и решение о браке',
        ),
        description: L(
          '청혼하고 미래 계획을 의논하며 결혼을 결정하는 표현을 익혀요.',
          'Taklif qilish, kelajakni muhokama qilish va nikohga qaror qilish ifodalarini o‘rganamiz.',
          'Learn expressions for proposing, discussing the future, and deciding to marry.',
          'Изучаем выражения о предложении, обсуждении будущего и решении вступить в брак.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        questions: [
          's6u1_121_translate_builder',
          's6u1_122_type_answer',
          's6u1_123_reading_quiz',
          's6u1_124_translate_builder',
          's6u1_125_type_answer',
          's6u1_126_sentence_builder',
          's6u1_127_translate_builder',
          's6u1_128_type_answer',
          's6u1_129_listening',
          's6u1_130_translate_builder',
          's6u1_131_type_answer',
          's6u1_132_error_hunt',
          's6u1_133_translate_builder',
          's6u1_134_type_answer',
          's6u1_135_cloze_passage',
          's6u1_136_translate_builder',
          's6u1_137_type_answer',
          's6u1_138_listen_fill',
          's6u1_139_verb_transform',
          's6u1_140_translate_type',
        ],
      },
      {
        title: L(
          '결혼 준비',
          'To‘yga tayyorgarlik',
          'Wedding Preparations',
          'Подготовка к свадьбе',
        ),
        description: L(
          '예식장, 청첩장, 신혼여행을 준비하는 실제 상황을 익혀요.',
          'To‘y zali, taklifnoma va asal oyini tayyorlashga oid vaziyatlarni o‘rganamiz.',
          'Practice real situations involving the wedding hall, invitations, and honeymoon.',
          'Практикуем ситуации, связанные с залом, приглашениями и свадебным путешествием.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        questions: [
          's6u1_141_translate_builder',
          's6u1_142_type_answer',
          's6u1_143_reading_quiz',
          's6u1_144_translate_builder',
          's6u1_145_type_answer',
          's6u1_146_sentence_builder',
          's6u1_147_translate_builder',
          's6u1_148_type_answer',
          's6u1_149_listening',
          's6u1_150_translate_builder',
          's6u1_151_type_answer',
          's6u1_152_error_hunt',
          's6u1_153_translate_builder',
          's6u1_154_type_answer',
          's6u1_155_cloze_passage',
          's6u1_156_translate_builder',
          's6u1_157_type_answer',
          's6u1_158_listen_fill',
          's6u1_159_word_arrange',
          's6u1_160_translate_type',
        ],
      },
      {
        title: L(
          '신혼집과 신혼생활',
          'Yangi uy va oilaviy hayot',
          'Newlywed Home and Life',
          'Жильё и жизнь молодожёнов',
        ),
        description: L(
          '신혼집을 정하고 신혼살림을 준비하며 함께 사는 문제를 다뤄요.',
          'Yangi uy tanlash, ro‘zg‘or tayyorlash va birga yashash masalalarini o‘rganamiz.',
          'Learn to discuss choosing a home, preparing a household, and living together.',
          'Учимся обсуждать выбор жилья, подготовку быта и совместную жизнь.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        questions: [
          's6u1_161_translate_builder',
          's6u1_162_type_answer',
          's6u1_163_reading_quiz',
          's6u1_164_translate_builder',
          's6u1_165_type_answer',
          's6u1_166_sentence_builder',
          's6u1_167_translate_builder',
          's6u1_168_type_answer',
          's6u1_169_listening',
          's6u1_170_translate_builder',
          's6u1_171_type_answer',
          's6u1_172_error_hunt',
          's6u1_173_translate_builder',
          's6u1_174_type_answer',
          's6u1_175_cloze_passage',
          's6u1_176_translate_builder',
          's6u1_177_type_answer',
          's6u1_178_listen_fill',
          's6u1_179_verb_transform',
          's6u1_180_translate_type',
        ],
      },
      {
        title: L(
          '사랑과 결혼관',
          'Sevgi va nikoh haqidagi qarashlar',
          'Views on Love and Marriage',
          'Взгляды на любовь и брак',
        ),
        description: L(
          '배우자, 천생연분, 연애결혼과 관계 유지에 대한 생각을 긴 문맥에서 익혀요.',
          'Turmush o‘rtog‘i, ideal juftlik, sevgi asosidagi nikoh va munosabatni saqlash haqidagi fikrlarni murakkabroq kontekstda o‘rganamiz.',
          'Explore spouse selection, perfect matches, love marriage, and maintaining relationships in richer contexts.',
          'Изучаем выбор супруга, идеальную совместимость, брак по любви и сохранение отношений в более сложном контексте.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 5,
        questions: [
          's6u1_181_translate_builder',
          's6u1_182_type_answer',
          's6u1_183_reading_quiz',
          's6u1_184_translate_builder',
          's6u1_185_type_answer',
          's6u1_186_sentence_builder',
          's6u1_187_translate_builder',
          's6u1_188_type_answer',
          's6u1_189_listening',
          's6u1_190_translate_builder',
          's6u1_191_type_answer',
          's6u1_192_error_hunt',
          's6u1_193_translate_builder',
          's6u1_194_type_answer',
          's6u1_195_cloze_passage',
          's6u1_196_translate_builder',
          's6u1_197_type_answer',
          's6u1_198_listen_fill',
          's6u1_199_word_arrange',
          's6u1_200_translate_type',
        ],
      },
    ],
  },
  {
    title: L(
      '배우자 조건과 결혼의 현실',
      'Turmush o‘rtog‘i mezonlari va nikoh haqiqati',
      'Choosing a Spouse and the Realities of Marriage',
      'Выбор супруга и реальности брака',
    ),
    section: 6,
    unit: 1,
    order: 3,
    category: LessonCategory.VOCABULARY,
    isActive: true,
    lessons: [
      {
        title: L(
          '배우자의 조건',
          'Turmush o‘rtog‘i mezonlari',
          'Qualities in a Spouse',
          'Критерии выбора супруга',
        ),
        description: L(
          '외모, 성격, 학력, 직업, 종교 등 배우자를 선택할 때 생각하는 다양한 조건을 익혀요.',
          'Tashqi ko‘rinish, xarakter, ta’lim, kasb va din kabi turmush o‘rtog‘ini tanlash mezonlarini o‘rganamiz.',
          'Learn vocabulary for appearance, personality, education, occupation, religion, and other spouse criteria.',
          'Изучаем лексику о внешности, характере, образовании, профессии, религии и других критериях выбора супруга.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        questions: [
          's6u1_201_translate_builder',
          's6u1_202_type_answer',
          's6u1_203_fill_in_blank',
          's6u1_204_listening',
          's6u1_205_translate_builder',
          's6u1_206_word_arrange',
          's6u1_207_type_answer',
          's6u1_208_reading_quiz',
          's6u1_209_error_hunt',
          's6u1_210_translate_builder',
          's6u1_211_listen_fill',
          's6u1_212_cloze_passage',
          's6u1_213_type_answer',
          's6u1_214_speaking',
          's6u1_215_translate_builder',
          's6u1_216_listening',
          's6u1_217_fill_in_blank',
          's6u1_218_word_arrange',
          's6u1_219_type_answer',
          's6u1_220_reading_quiz',
        ],
      },
      {
        title: L(
          '연상, 연하와 나이 차이',
          'Katta-yosh sherik va yosh farqi',
          'Older and Younger Partners',
          'Старшие и младшие партнёры',
        ),
        description: L(
          '연상, 연하와 나이 차이를 사용해 연인의 나이 관계와 생각을 표현해요.',
          '연상, 연하 va yosh farqi orqali sheriklarning yosh munosabatini ifodalaymiz.',
          'Use 연상, 연하, and 나이 차이 to discuss age differences in relationships.',
          'Используем 연상, 연하 и 나이 차이 для обсуждения разницы в возрасте.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        questions: [
          's6u1_221_translate_builder',
          's6u1_222_type_answer',
          's6u1_223_fill_in_blank',
          's6u1_224_listening',
          's6u1_225_translate_builder',
          's6u1_226_word_arrange',
          's6u1_227_type_answer',
          's6u1_228_reading_quiz',
          's6u1_229_error_hunt',
          's6u1_230_translate_builder',
          's6u1_231_listen_fill',
          's6u1_232_cloze_passage',
          's6u1_233_type_answer',
          's6u1_234_speaking',
          's6u1_235_translate_builder',
          's6u1_236_listening',
          's6u1_237_fill_in_blank',
          's6u1_238_word_arrange',
          's6u1_239_type_answer',
          's6u1_240_reading_quiz',
        ],
      },
      {
        title: L(
          '부모의 반대와 결혼 문제',
          'Ota-ona qarshiligi va nikoh muammolari',
          'Parental Opposition and Marriage Problems',
          'Возражения родителей и проблемы брака',
        ),
        description: L(
          '부모의 반대, 종교 차이, 성격 차이, 경제적인 문제와 설득 표현을 익혀요.',
          'Ota-ona qarshiligi, din va xarakter farqi, moliyaviy muammo hamda ishontirish ifodalarini o‘rganamiz.',
          'Learn expressions for parental opposition, religious and personality differences, financial problems, and persuasion.',
          'Изучаем выражения о возражениях родителей, различиях религии и характеров, финансовых проблемах и убеждении.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        questions: [
          's6u1_241_translate_builder',
          's6u1_242_type_answer',
          's6u1_243_fill_in_blank',
          's6u1_244_listening',
          's6u1_245_translate_builder',
          's6u1_246_word_arrange',
          's6u1_247_type_answer',
          's6u1_248_reading_quiz',
          's6u1_249_error_hunt',
          's6u1_250_translate_builder',
          's6u1_251_listen_fill',
          's6u1_252_cloze_passage',
          's6u1_253_type_answer',
          's6u1_254_speaking',
          's6u1_255_translate_builder',
          's6u1_256_listening',
          's6u1_257_fill_in_blank',
          's6u1_258_word_arrange',
          's6u1_259_type_answer',
          's6u1_260_reading_quiz',
        ],
      },
      {
        title: L(
          '차이를 이해하는 관계',
          'Farqlarni tushunadigan munosabat',
          'Understanding Differences',
          'Понимание различий',
        ),
        description: L(
          '서로의 차이를 인정하고 있는 그대로 이해하며 관계를 유지하는 표현을 익혀요.',
          'Bir-birining farqlarini qabul qilish, qanday bo‘lsa shunday tushunish va munosabatni saqlashni o‘rganamiz.',
          'Learn to discuss accepting differences, understanding each other as you are, and maintaining a relationship.',
          'Учимся говорить о принятии различий, взаимопонимании и сохранении отношений.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        questions: [
          's6u1_261_translate_builder',
          's6u1_262_type_answer',
          's6u1_263_fill_in_blank',
          's6u1_264_listening',
          's6u1_265_translate_builder',
          's6u1_266_word_arrange',
          's6u1_267_type_answer',
          's6u1_268_reading_quiz',
          's6u1_269_error_hunt',
          's6u1_270_translate_builder',
          's6u1_271_listen_fill',
          's6u1_272_cloze_passage',
          's6u1_273_type_answer',
          's6u1_274_speaking',
          's6u1_275_translate_builder',
          's6u1_276_listening',
          's6u1_277_fill_in_blank',
          's6u1_278_word_arrange',
          's6u1_279_type_answer',
          's6u1_280_reading_quiz',
        ],
      },
      {
        title: L(
          '배우자와 결혼관 종합',
          'Turmush o‘rtog‘i va nikoh qarashlari',
          'Spouse and Marriage Values Review',
          'Итог: супруг и взгляды на брак',
        ),
        description: L(
          '배우자 조건, 나이 차이, 관계의 문제, 이해와 평생 함께하는 관계를 종합적으로 연습해요.',
          'Turmush o‘rtog‘i mezonlari, yosh farqi, munosabat muammolari, tushunish va umr bo‘yi birga bo‘lishni umumlashtiramiz.',
          'Review spouse criteria, age differences, relationship problems, mutual understanding, and lifelong partnership.',
          'Повторяем критерии выбора супруга, разницу в возрасте, проблемы отношений, взаимопонимание и совместную жизнь.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 5,
        questions: [
          's6u1_281_translate_builder',
          's6u1_282_type_answer',
          's6u1_283_fill_in_blank',
          's6u1_284_listening',
          's6u1_285_translate_builder',
          's6u1_286_word_arrange',
          's6u1_287_type_answer',
          's6u1_288_reading_quiz',
          's6u1_289_error_hunt',
          's6u1_290_translate_builder',
          's6u1_291_listen_fill',
          's6u1_292_cloze_passage',
          's6u1_293_type_answer',
          's6u1_294_speaking',
          's6u1_295_translate_builder',
          's6u1_296_listening',
          's6u1_297_fill_in_blank',
          's6u1_298_word_arrange',
          's6u1_299_type_answer',
          's6u1_300_reading_quiz',
        ],
      },
    ],
  },
  {
    title: L(
      '연애의 갈등과 화해',
      'Munosabatdagi nizolar va yarashish',
      'Conflict and Reconciliation in Relationships',
      'Конфликты и примирение в отношениях',
    ),
    section: 6,
    unit: 1,
    order: 4,
    category: LessonCategory.VOCABULARY,
    isActive: true,
    lessons: [
      {
        title: L(
          '상대방의 감정 이해하기',
          'Sherikning hislarini tushunish',
          'Understanding Your Partner’s Feelings',
          'Понимание чувств партнёра',
        ),
        description: L(
          '애인, 상대방, 감정, 서운하다를 사용해 연애 중 느끼는 감정을 이해하고 표현해요.',
          '애인, 상대방, 감정 va 서운하다 orqali munosabatdagi hislarni tushunib ifodalaymiz.',
          'Use 애인, 상대방, 감정, and 서운하다 to understand and express feelings in a relationship.',
          'Используем 애인, 상대방, 감정 и 서운하다 для выражения чувств в отношениях.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        questions: [
          's6u1_301_translate_builder',
          's6u1_302_type_answer',
          's6u1_303_fill_in_blank',
          's6u1_304_listening',
          's6u1_305_translate_builder',
          's6u1_306_word_arrange',
          's6u1_307_type_answer',
          's6u1_308_reading_quiz',
          's6u1_309_error_hunt',
          's6u1_310_translate_builder',
          's6u1_311_listen_fill',
          's6u1_312_cloze_passage',
          's6u1_313_type_answer',
          's6u1_314_speaking',
          's6u1_315_translate_builder',
          's6u1_316_listening',
          's6u1_317_fill_in_blank',
          's6u1_318_word_arrange',
          's6u1_319_type_answer',
          's6u1_320_reading_quiz',
        ],
      },
      {
        title: L(
          '다툼과 오해',
          'Janjal va tushunmovchilik',
          'Arguments and Misunderstandings',
          'Ссоры и недоразумения',
        ),
        description: L(
          '다투다, 오해하다, 갈등을 사용해 연인 사이에서 문제가 커지는 원인을 이해해요.',
          '다투다, 오해하다 va 갈등 orqali munosabatdagi muammolarning qanday kattalashishini o‘rganamiz.',
          'Use 다투다, 오해하다, and 갈등 to understand how relationship problems develop.',
          'Используем 다투다, 오해하다 и 갈등, чтобы понять развитие конфликтов.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        questions: [
          's6u1_321_translate_builder',
          's6u1_322_type_answer',
          's6u1_323_fill_in_blank',
          's6u1_324_listening',
          's6u1_325_translate_builder',
          's6u1_326_word_arrange',
          's6u1_327_type_answer',
          's6u1_328_reading_quiz',
          's6u1_329_error_hunt',
          's6u1_330_translate_builder',
          's6u1_331_listen_fill',
          's6u1_332_cloze_passage',
          's6u1_333_type_answer',
          's6u1_334_speaking',
          's6u1_335_translate_builder',
          's6u1_336_listening',
          's6u1_337_fill_in_blank',
          's6u1_338_word_arrange',
          's6u1_339_type_answer',
          's6u1_340_reading_quiz',
        ],
      },
      {
        title: L(
          '사과하고 화해하기',
          'Uzr so‘rash va yarashish',
          'Apologizing and Reconciling',
          'Извинение и примирение',
        ),
        description: L(
          '사과하다, 용서하다, 화가 풀리다, 화해하다를 사용해 갈등 뒤 관계를 회복해요.',
          '사과하다, 용서하다, 화가 풀리다 va 화해하다 orqali nizodan keyin munosabatni tiklashni o‘rganamiz.',
          'Use 사과하다, 용서하다, 화가 풀리다, and 화해하다 to repair a relationship after conflict.',
          'Используем 사과하다, 용서하다, 화가 풀리다 и 화해하다 для восстановления отношений после конфликта.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        questions: [
          's6u1_341_translate_builder',
          's6u1_342_type_answer',
          's6u1_343_fill_in_blank',
          's6u1_344_listening',
          's6u1_345_translate_builder',
          's6u1_346_word_arrange',
          's6u1_347_type_answer',
          's6u1_348_reading_quiz',
          's6u1_349_error_hunt',
          's6u1_350_translate_builder',
          's6u1_351_listen_fill',
          's6u1_352_cloze_passage',
          's6u1_353_type_answer',
          's6u1_354_speaking',
          's6u1_355_translate_builder',
          's6u1_356_listening',
          's6u1_357_fill_in_blank',
          's6u1_358_word_arrange',
          's6u1_359_type_answer',
          's6u1_360_reading_quiz',
        ],
      },
      {
        title: L(
          '상대방을 배려하고 존중하기',
          'Sherikka e’tibor va hurmat',
          'Consideration and Respect',
          'Забота и уважение к партнёру',
        ),
        description: L(
          '배려하다, 존중하다, 그대로, 관계를 유지하다를 사용해 서로의 차이를 받아들이는 법을 익혀요.',
          '배려하다, 존중하다, 그대로 va 관계를 유지하다 orqali farqlarni qabul qilishni o‘rganamiz.',
          'Use 배려하다, 존중하다, 그대로, and 관계를 유지하다 to practice accepting differences.',
          'Используем 배려하다, 존중하다, 그대로 и 관계를 유지하다 для принятия различий.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        questions: [
          's6u1_361_translate_builder',
          's6u1_362_type_answer',
          's6u1_363_fill_in_blank',
          's6u1_364_listening',
          's6u1_365_translate_builder',
          's6u1_366_word_arrange',
          's6u1_367_type_answer',
          's6u1_368_reading_quiz',
          's6u1_369_error_hunt',
          's6u1_370_translate_builder',
          's6u1_371_listen_fill',
          's6u1_372_cloze_passage',
          's6u1_373_type_answer',
          's6u1_374_speaking',
          's6u1_375_translate_builder',
          's6u1_376_listening',
          's6u1_377_fill_in_blank',
          's6u1_378_word_arrange',
          's6u1_379_type_answer',
          's6u1_380_reading_quiz',
        ],
      },
      {
        title: L(
          '갈등과 화해 종합',
          'Nizo va yarashish umumiy takrori',
          'Conflict and Reconciliation Review',
          'Повторение конфликтов и примирения',
        ),
        description: L(
          '감정 표현, 오해, 다툼, 사과, 화해, 배려와 존중을 종합적으로 연습해요.',
          'Hislarni ifodalash, tushunmovchilik, janjal, uzr, yarashish, e’tibor va hurmatni umumlashtiramiz.',
          'Review emotional expression, misunderstandings, arguments, apologies, reconciliation, consideration, and respect.',
          'Повторяем выражение эмоций, недоразумения, ссоры, извинения, примирение, заботу и уважение.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 5,
        questions: [
          's6u1_381_translate_builder',
          's6u1_382_type_answer',
          's6u1_383_fill_in_blank',
          's6u1_384_listening',
          's6u1_385_translate_builder',
          's6u1_386_word_arrange',
          's6u1_387_type_answer',
          's6u1_388_reading_quiz',
          's6u1_389_error_hunt',
          's6u1_390_translate_builder',
          's6u1_391_listen_fill',
          's6u1_392_cloze_passage',
          's6u1_393_type_answer',
          's6u1_394_speaking',
          's6u1_395_translate_builder',
          's6u1_396_listening',
          's6u1_397_fill_in_blank',
          's6u1_398_word_arrange',
          's6u1_399_type_answer',
          's6u1_400_reading_quiz',
        ],
      },
    ],
  },
  {
    title: L(
      '사랑은 영원할까?',
      'Sevgi abadiymi?',
      'Can Love Last Forever?',
      'Может ли любовь быть вечной?',
    ),
    section: 6,
    unit: 1,
    order: 5,
    category: LessonCategory.VOCABULARY,
    isActive: true,
    lessons: [
      {
        title: L(
          '영원한 사랑',
          'Abadiy sevgi',
          'Eternal Love',
          'Вечная любовь',
        ),
        description: L(
          '영원하다와 일생을 사용해 사랑이 오래 지속되는 것에 대한 생각을 표현해요.',
          '영원하다 va 일생 orqali sevgining uzoq davom etishi haqidagi fikrlarni ifodalaymiz.',
          'Use 영원하다 and 일생 to discuss whether love can last.',
          'Используем 영원하다 и 일생 для разговора о длительности любви.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        questions: [
          's6u1_401_translate_builder',
          's6u1_402_type_answer',
          's6u1_403_fill_in_blank',
          's6u1_404_listening',
          's6u1_405_translate_builder',
          's6u1_406_word_arrange',
          's6u1_407_type_answer',
          's6u1_408_reading_quiz',
          's6u1_409_error_hunt',
          's6u1_410_translate_builder',
          's6u1_411_listen_fill',
          's6u1_412_cloze_passage',
          's6u1_413_type_answer',
          's6u1_414_speaking',
          's6u1_415_translate_builder',
          's6u1_416_listening',
          's6u1_417_fill_in_blank',
          's6u1_418_word_arrange',
          's6u1_419_type_answer',
          's6u1_420_reading_quiz',
        ],
      },
      {
        title: L(
          '사랑의 유효기간과 단계',
          'Sevgi muddati va bosqichlari',
          'Love’s Duration and Stages',
          'Срок и этапы любви',
        ),
        description: L(
          '유효기간과 단계를 사용해 시간이 지나면서 사랑이 달라지는 모습을 이해해요.',
          '유효기간 va 단계 orqali vaqt o‘tishi bilan sevgi qanday o‘zgarishini o‘rganamiz.',
          'Use 유효기간 and 단계 to discuss how love changes over time.',
          'Используем 유효기간 и 단계 для обсуждения изменений любви со временем.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        questions: [
          's6u1_421_translate_builder',
          's6u1_422_type_answer',
          's6u1_423_fill_in_blank',
          's6u1_424_listening',
          's6u1_425_translate_builder',
          's6u1_426_word_arrange',
          's6u1_427_type_answer',
          's6u1_428_reading_quiz',
          's6u1_429_error_hunt',
          's6u1_430_translate_builder',
          's6u1_431_listen_fill',
          's6u1_432_cloze_passage',
          's6u1_433_type_answer',
          's6u1_434_speaking',
          's6u1_435_translate_builder',
          's6u1_436_listening',
          's6u1_437_fill_in_blank',
          's6u1_438_word_arrange',
          's6u1_439_type_answer',
          's6u1_440_reading_quiz',
        ],
      },
      {
        title: L(
          '사랑이 식을 때',
          'Sevgi soviganda',
          'When Love Cools',
          'Когда любовь остывает',
        ),
        description: L(
          '사랑이 식다와 단계를 사용해 감정의 변화와 관계의 변화를 구별해요.',
          '사랑이 식다 va 단계 orqali his va munosabatdagi o‘zgarishni farqlaymiz.',
          'Use 사랑이 식다 and 단계 to distinguish changing feelings from changing relationships.',
          'Используем 사랑이 식다 и 단계, чтобы различать изменение чувств и отношений.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        questions: [
          's6u1_441_translate_builder',
          's6u1_442_type_answer',
          's6u1_443_fill_in_blank',
          's6u1_444_listening',
          's6u1_445_translate_builder',
          's6u1_446_word_arrange',
          's6u1_447_type_answer',
          's6u1_448_reading_quiz',
          's6u1_449_error_hunt',
          's6u1_450_translate_builder',
          's6u1_451_listen_fill',
          's6u1_452_cloze_passage',
          's6u1_453_type_answer',
          's6u1_454_speaking',
          's6u1_455_translate_builder',
          's6u1_456_listening',
          's6u1_457_fill_in_blank',
          's6u1_458_word_arrange',
          's6u1_459_type_answer',
          's6u1_460_reading_quiz',
        ],
      },
      {
        title: L(
          '일생을 함께하는 사랑',
          'Bir umr birga bo‘ladigan sevgi',
          'A Lifetime Together',
          'Любовь на всю жизнь',
        ),
        description: L(
          '일생과 함께하다를 중심으로 평생 관계를 유지하는 데 필요한 태도를 익혀요.',
          '일생 va 함께하다 orqali uzoq munosabat uchun kerakli munosabatlarni o‘rganamiz.',
          'Use 일생 and 함께하다 to discuss what lifelong relationships require.',
          'Используем 일생 и 함께하다 для разговора о том, что нужно отношениям на всю жизнь.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        questions: [
          's6u1_461_translate_builder',
          's6u1_462_type_answer',
          's6u1_463_fill_in_blank',
          's6u1_464_listening',
          's6u1_465_translate_builder',
          's6u1_466_word_arrange',
          's6u1_467_type_answer',
          's6u1_468_reading_quiz',
          's6u1_469_error_hunt',
          's6u1_470_translate_builder',
          's6u1_471_listen_fill',
          's6u1_472_cloze_passage',
          's6u1_473_type_answer',
          's6u1_474_speaking',
          's6u1_475_translate_builder',
          's6u1_476_listening',
          's6u1_477_fill_in_blank',
          's6u1_478_word_arrange',
          's6u1_479_type_answer',
          's6u1_480_reading_quiz',
        ],
      },
      {
        title: L(
          '처음의 사랑과 변화 종합',
          'Birinchi sevgi va o‘zgarishlar',
          'First Love and Change Review',
          'Первая любовь и изменения',
        ),
        description: L(
          '처음으로, 영원하다, 유효기간, 단계, 사랑이 식다, 일생을 종합적으로 복습해요.',
          '처음으로, 영원하다, 유효기간, 단계, 사랑이 식다 va 일생 ni umumiy takrorlaymiz.',
          'Review 처음으로, 영원하다, 유효기간, 단계, 사랑이 식다, and 일생.',
          'Повторяем 처음으로, 영원하다, 유효기간, 단계, 사랑이 식다 и 일생.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 5,
        questions: [
          's6u1_481_translate_builder',
          's6u1_482_type_answer',
          's6u1_483_fill_in_blank',
          's6u1_484_listening',
          's6u1_485_translate_builder',
          's6u1_486_word_arrange',
          's6u1_487_type_answer',
          's6u1_488_reading_quiz',
          's6u1_489_error_hunt',
          's6u1_490_translate_builder',
          's6u1_491_listen_fill',
          's6u1_492_cloze_passage',
          's6u1_493_type_answer',
          's6u1_494_speaking',
          's6u1_495_translate_builder',
          's6u1_496_listening',
          's6u1_497_fill_in_blank',
          's6u1_498_word_arrange',
          's6u1_499_type_answer',
          's6u1_500_reading_quiz',
        ],
      },
    ],
  },
  {
    title: L(
      '연애에서 결혼까지 종합 실전',
      'Sevgidan nikohgacha umumiy amaliyot',
      'From Dating to Marriage: Comprehensive Practice',
      'От отношений до брака: итоговая практика',
    ),
    section: 6,
    unit: 1,
    order: 6,
    category: LessonCategory.VOCABULARY,
    isActive: true,
    lessons: [
      {
        title: L(
          '첫 만남에서 연애까지',
          'Birinchi uchrashuvdan munosabatgacha',
          'From First Meeting to Dating',
          'От первой встречи до отношений',
        ),
        description: L(
          '첫 만남, 첫인상, 호감, 고백과 연애 시작 어휘를 종합적으로 연습해요.',
          'Birinchi uchrashuv, taassurot, yoqtirish, izhor va munosabat boshlanishini umumiy mashq qilamiz.',
          'Review vocabulary for first meetings, attraction, confession, and beginning a relationship.',
          'Повторяем лексику первой встречи, симпатии, признания и начала отношений.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        questions: [
          's6u1_501_translate_builder',
          's6u1_502_type_answer',
          's6u1_503_fill_in_blank',
          's6u1_504_listening',
          's6u1_505_translate_builder',
          's6u1_506_word_arrange',
          's6u1_507_type_answer',
          's6u1_508_reading_quiz',
          's6u1_509_error_hunt',
          's6u1_510_translate_builder',
          's6u1_511_listen_fill',
          's6u1_512_cloze_passage',
          's6u1_513_type_answer',
          's6u1_514_speaking',
          's6u1_515_translate_builder',
          's6u1_516_listening',
          's6u1_517_fill_in_blank',
          's6u1_518_word_arrange',
          's6u1_519_type_answer',
          's6u1_520_reading_quiz',
        ],
      },
      {
        title: L(
          '잘 맞는 사람인가요?',
          'Bir-biringizga mosmisiz?',
          'Are You Compatible?',
          'Подходите ли вы друг другу?',
        ),
        description: L(
          '배우자 조건, 마음과 생각의 궁합, 대화와 관계의 편안함을 종합적으로 연습해요.',
          'Turmush o‘rtog‘i mezonlari, ko‘ngil va fikr mosligi hamda muloqotni mashq qilamiz.',
          'Review spouse criteria, emotional compatibility, shared thinking, and communication.',
          'Повторяем критерии супруга, совместимость, общие взгляды и общение.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        questions: [
          's6u1_521_translate_builder',
          's6u1_522_type_answer',
          's6u1_523_fill_in_blank',
          's6u1_524_listening',
          's6u1_525_translate_builder',
          's6u1_526_word_arrange',
          's6u1_527_type_answer',
          's6u1_528_reading_quiz',
          's6u1_529_error_hunt',
          's6u1_530_translate_builder',
          's6u1_531_listen_fill',
          's6u1_532_cloze_passage',
          's6u1_533_type_answer',
          's6u1_534_speaking',
          's6u1_535_translate_builder',
          's6u1_536_listening',
          's6u1_537_fill_in_blank',
          's6u1_538_word_arrange',
          's6u1_539_type_answer',
          's6u1_540_reading_quiz',
        ],
      },
      {
        title: L(
          '청혼과 결혼 결정',
          'Taklif va nikoh qarori',
          'Proposal and the Decision to Marry',
          'Предложение и решение о браке',
        ),
        description: L(
          '선보다, 청혼하다, 연애결혼, 중매결혼과 현실적인 결혼 계획을 종합해요.',
          '선보다, 청혼하다, 연애결혼, 중매결혼 va real nikoh rejasini umumlashtiramiz.',
          'Review matchmaking, proposals, love marriage, arranged marriage, and practical marriage planning.',
          'Повторяем сватовство, предложение, виды брака и практическое планирование.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        questions: [
          's6u1_541_translate_builder',
          's6u1_542_type_answer',
          's6u1_543_fill_in_blank',
          's6u1_544_listening',
          's6u1_545_translate_builder',
          's6u1_546_word_arrange',
          's6u1_547_type_answer',
          's6u1_548_reading_quiz',
          's6u1_549_error_hunt',
          's6u1_550_translate_builder',
          's6u1_551_listen_fill',
          's6u1_552_cloze_passage',
          's6u1_553_type_answer',
          's6u1_554_speaking',
          's6u1_555_translate_builder',
          's6u1_556_listening',
          's6u1_557_fill_in_blank',
          's6u1_558_word_arrange',
          's6u1_559_type_answer',
          's6u1_560_reading_quiz',
        ],
      },
      {
        title: L(
          '결혼 준비와 신혼생활',
          'Nikoh tayyorgarligi va yangi turmush',
          'Wedding Preparation and Newlywed Life',
          'Подготовка к свадьбе и жизнь молодожёнов',
        ),
        description: L(
          '예식장, 청첩장, 신혼집, 신혼여행과 결혼 후 생활 준비를 종합적으로 익혀요.',
          '예식장, 청첩장, 신혼집, 신혼여행 va nikohdan keyingi hayot tayyorgarligini mashq qilamiz.',
          'Review wedding halls, invitations, newlywed homes, honeymoons, and preparation for married life.',
          'Повторяем свадебный зал, приглашения, жильё, медовый месяц и подготовку к семейной жизни.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        questions: [
          's6u1_561_translate_builder',
          's6u1_562_type_answer',
          's6u1_563_fill_in_blank',
          's6u1_564_listening',
          's6u1_565_translate_builder',
          's6u1_566_word_arrange',
          's6u1_567_type_answer',
          's6u1_568_reading_quiz',
          's6u1_569_error_hunt',
          's6u1_570_translate_builder',
          's6u1_571_listen_fill',
          's6u1_572_cloze_passage',
          's6u1_573_type_answer',
          's6u1_574_speaking',
          's6u1_575_translate_builder',
          's6u1_576_listening',
          's6u1_577_fill_in_blank',
          's6u1_578_word_arrange',
          's6u1_579_type_answer',
          's6u1_580_reading_quiz',
        ],
      },
      {
        title: L(
          '연애·결혼 전체 종합',
          'Sevgi va nikoh umumiy takrori',
          'Love and Marriage: Final Review',
          'Любовь и брак: итоговое повторение',
        ),
        description: L(
          '첫 만남부터 연애, 결혼, 갈등, 사랑의 변화와 평생 관계까지 Unit 1 전체를 종합해요.',
          'Birinchi uchrashuvdan sevgi, nikoh, nizo, o‘zgarish va uzoq munosabatgacha Unit 1 ni yakunlaymiz.',
          'Review the entire unit from first meeting and dating through marriage, conflict, changing love, and lifelong relationships.',
          'Повторяем весь раздел: знакомство, отношения, брак, конфликты, изменения любви и долгую совместную жизнь.',
        ),
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 5,
        questions: [
          's6u1_581_translate_builder',
          's6u1_582_type_answer',
          's6u1_583_fill_in_blank',
          's6u1_584_listening',
          's6u1_585_translate_builder',
          's6u1_586_word_arrange',
          's6u1_587_type_answer',
          's6u1_588_reading_quiz',
          's6u1_589_error_hunt',
          's6u1_590_translate_builder',
          's6u1_591_listen_fill',
          's6u1_592_cloze_passage',
          's6u1_593_type_answer',
          's6u1_594_speaking',
          's6u1_595_translate_builder',
          's6u1_596_listening',
          's6u1_597_fill_in_blank',
          's6u1_598_word_arrange',
          's6u1_599_type_answer',
          's6u1_600_reading_quiz',
        ],
      },
    ],
  },
];
