import { LessonCategory } from '../../../lessons/schemas/lesson.schema';
import { QuestionLevel } from '../../../lessons/schemas/question.schema';
import { withTypedAnswerGrading } from './answer-grading';
import { WordPartOfSpeech } from '../../../words/schemas/word.schema';
import type { WordSeedEntry } from '../../word-seed.types';

export const S3_UNIT4_WORDS = [
  // ── 옷 · 액세서리 ──

  {
    code: 'word_glasses_noun',
    senseKey: 'accessory-eyeglasses',
    korean: '안경',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '시력을 돕거나 눈을 보호하기 위해 눈앞에 쓰는 물건',
      uz: 'ko‘zoynak',
      en: 'glasses, eyeglasses',
      ru: 'очки',
    },
    examples: [
      {
        korean: '저는 안경을 써요.',
        translations: {
          ko: '저는 눈에 안경을 착용해요.',
          uz: 'Men ko‘zoynak taqaman.',
          en: 'I wear glasses.',
          ru: 'Я ношу очки.',
        },
      },
      {
        korean: '이 안경이 잘 어울려요.',
        translations: {
          ko: '이 안경이 아주 잘 어울려요.',
          uz: 'Bu ko‘zoynak sizga juda yarashadi.',
          en: 'These glasses look good on you.',
          ru: 'Эти очки вам очень идут.',
        },
      },
    ],
    pronunciation: {
      hangul: '안경',
      romanization: 'angyeong',
      ttsText: '안경',
    },
    media: {
      emoji: '👓',
      imageUrl: 'https://cdn.korio.app/words/angyeong.webp',
      imageAlt: {
        ko: '안경 한 개',
        uz: 'bir juft ko‘zoynak',
        en: 'a pair of glasses',
        ru: 'пара очков',
      },
    },
    tags: ['accessory', 'glasses', 'appearance', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "안경은 보통 '안경을 쓰다'라고 표현해요.",
      uz: "Ko‘zoynak bilan odatda '안경을 쓰다' ishlatiladi.",
      en: "The usual expression is '안경을 쓰다'.",
      ru: "Обычно говорят '안경을 쓰다'.",
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_suit_noun',
    senseKey: 'clothing-suit',
    korean: '양복',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '서양식으로 만든 정장 형태의 옷',
      uz: 'kostyum',
      en: 'suit',
      ru: 'костюм',
    },
    examples: [
      {
        korean: '결혼식에 양복을 입어요.',
        translations: {
          ko: '결혼식에 정장 양복을 입어요.',
          uz: 'To‘y marosimiga kostyum kiyaman.',
          en: 'I wear a suit to the wedding.',
          ru: 'На свадьбу я надеваю костюм.',
        },
      },
      {
        korean: '이 양복은 잘 어울려요.',
        translations: {
          ko: '이 양복이 아주 잘 어울려요.',
          uz: 'Bu kostyum juda yarashadi.',
          en: 'This suit looks good on you.',
          ru: 'Этот костюм вам очень идёт.',
        },
      },
    ],
    pronunciation: {
      hangul: '양복',
      romanization: 'yangbok',
      ttsText: '양복',
    },
    media: {
      emoji: '🤵',
      imageUrl: 'https://cdn.korio.app/words/yangbok.webp',
      imageAlt: {
        ko: '단정한 정장 양복',
        uz: 'rasmiy kostyum',
        en: 'a formal suit',
        ru: 'деловой костюм',
      },
    },
    tags: ['clothing', 'formal-wear', 'fashion', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "현대 회화에서는 '정장'이라는 말도 많이 사용해요.",
      uz: "Hozirgi nutqda '정장' so‘zi ham ko‘p ishlatiladi.",
      en: '정장 is also commonly used for a formal suit.',
      ru: 'Для костюма также часто используют слово 정장.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_necktie_noun',
    senseKey: 'accessory-necktie',
    korean: '넥타이',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '셔츠 목 부분에 매는 길고 좁은 천 형태의 장식',
      uz: 'galstuk',
      en: 'necktie',
      ru: 'галстук',
    },
    examples: [
      {
        korean: '양복에 넥타이를 해요.',
        translations: {
          ko: '양복을 입고 넥타이를 매요.',
          uz: 'Kostyum bilan galstuk taqaman.',
          en: 'I wear a tie with a suit.',
          ru: 'Я ношу галстук с костюмом.',
        },
      },
      {
        korean: '이 넥타이가 마음에 들어요.',
        translations: {
          ko: '이 넥타이가 마음에 들어요.',
          uz: 'Bu galstuk menga yoqadi.',
          en: 'I like this tie.',
          ru: 'Мне нравится этот галстук.',
        },
      },
    ],
    pronunciation: {
      hangul: '넥타이',
      romanization: 'nektai',
      ttsText: '넥타이',
    },
    media: {
      emoji: '👔',
      imageUrl: 'https://cdn.korio.app/words/nektai.webp',
      imageAlt: {
        ko: '셔츠와 함께 매는 넥타이',
        uz: 'ko‘ylak bilan taqiladigan galstuk',
        en: 'a necktie',
        ru: 'галстук',
      },
    },
    tags: ['accessory', 'necktie', 'formal-wear', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "넥타이는 보통 '넥타이를 매다'라고 해요.",
      uz: "Galstuk bilan odatda '넥타이를 매다' ishlatiladi.",
      en: 'The usual expression is 넥타이를 매다.',
      ru: 'Обычно говорят 넥타이를 매다 — «завязать галстук».',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_sweater_noun',
    senseKey: 'clothing-sweater',
    korean: '스웨터',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '털실 등으로 짜서 상체에 입는 따뜻한 옷',
      uz: 'sviter',
      en: 'sweater',
      ru: 'свитер',
    },
    examples: [
      {
        korean: '겨울에는 스웨터를 입어요.',
        translations: {
          ko: '겨울에는 따뜻한 스웨터를 입어요.',
          uz: 'Qishda sviter kiyaman.',
          en: 'I wear a sweater in winter.',
          ru: 'Зимой я ношу свитер.',
        },
      },
      {
        korean: '이 스웨터는 따뜻해요.',
        translations: {
          ko: '이 스웨터는 아주 따뜻해요.',
          uz: 'Bu sviter issiq.',
          en: 'This sweater is warm.',
          ru: 'Этот свитер тёплый.',
        },
      },
    ],
    pronunciation: {
      hangul: '스웨터',
      romanization: 'seuweteo',
      ttsText: '스웨터',
    },
    media: {
      emoji: '🧶',
      imageUrl: 'https://cdn.korio.app/words/seuweteo.webp',
      imageAlt: {
        ko: '따뜻한 스웨터',
        uz: 'issiq sviter',
        en: 'a warm sweater',
        ru: 'тёплый свитер',
      },
    },
    tags: ['clothing', 'sweater', 'winter', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "상체에 입는 옷이므로 '스웨터를 입다'라고 해요.",
      uz: "'스웨터를 입다' shaklida ishlatiladi.",
      en: 'Use 입다 with sweaters.',
      ru: 'Со свитером используется 입다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_pants_noun',
    senseKey: 'clothing-pants',
    korean: '바지',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '허리 아래에서 두 다리를 각각 감싸는 옷',
      uz: 'shim',
      en: 'pants, trousers',
      ru: 'брюки',
    },
    examples: [
      {
        korean: '검은 바지를 입어요.',
        translations: {
          ko: '검은색 바지를 입어요.',
          uz: 'Qora shim kiyaman.',
          en: 'I wear black pants.',
          ru: 'Я ношу чёрные брюки.',
        },
      },
      {
        korean: '이 바지는 조금 길어요.',
        translations: {
          ko: '이 바지의 길이가 조금 길어요.',
          uz: 'Bu shim biroz uzun.',
          en: 'These pants are a little long.',
          ru: 'Эти брюки немного длинные.',
        },
      },
    ],
    pronunciation: {
      hangul: '바지',
      romanization: 'baji',
      ttsText: '바지',
    },
    media: {
      emoji: '👖',
      imageUrl: 'https://cdn.korio.app/words/baji.webp',
      imageAlt: {
        ko: '긴 바지',
        uz: 'uzun shim',
        en: 'a pair of pants',
        ru: 'брюки',
      },
    },
    tags: ['clothing', 'pants', 'fashion', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "'바지를 입다'라고 사용해요.",
      uz: "'바지를 입다' shaklida ishlatiladi.",
      en: 'Use 입다 with pants.',
      ru: 'С брюками используется 입다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_sneakers_noun',
    senseKey: 'clothing-sneakers',
    korean: '운동화',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '운동하거나 편하게 걸을 때 신는 신발',
      uz: 'krossovka',
      en: 'sneakers',
      ru: 'кроссовки',
    },
    examples: [
      {
        korean: '운동화를 신고 운동해요.',
        translations: {
          ko: '운동화를 신고 운동을 해요.',
          uz: 'Krossovka kiyib sport bilan shug‘ullanaman.',
          en: 'I exercise wearing sneakers.',
          ru: 'Я занимаюсь спортом в кроссовках.',
        },
      },
      {
        korean: '이 운동화는 편해요.',
        translations: {
          ko: '이 운동화는 신기 편해요.',
          uz: 'Bu krossovka qulay.',
          en: 'These sneakers are comfortable.',
          ru: 'Эти кроссовки удобные.',
        },
      },
    ],
    pronunciation: {
      hangul: '운동화',
      romanization: 'undonghwa',
      ttsText: '운동화',
    },
    media: {
      emoji: '👟',
      imageUrl: 'https://cdn.korio.app/words/undonghwa.webp',
      imageAlt: {
        ko: '운동화 한 켤레',
        uz: 'bir juft krossovka',
        en: 'a pair of sneakers',
        ru: 'пара кроссовок',
      },
    },
    tags: ['clothing', 'shoes', 'sports', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "운동화는 발에 신으므로 '운동화를 신다'라고 해요.",
      uz: "'운동화를 신다' shaklida ishlatiladi.",
      en: 'Use 신다 with sneakers.',
      ru: 'С кроссовками используется 신다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_blouse_noun',
    senseKey: 'clothing-blouse',
    korean: '블라우스',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '주로 여성들이 상체에 입는 셔츠 형태의 옷',
      uz: 'bluzka',
      en: 'blouse',
      ru: 'блузка',
    },
    examples: [
      {
        korean: '흰 블라우스를 입어요.',
        translations: {
          ko: '흰색 블라우스를 입어요.',
          uz: 'Oq bluzka kiyaman.',
          en: 'I wear a white blouse.',
          ru: 'Я надеваю белую блузку.',
        },
      },
      {
        korean: '이 블라우스가 치마와 잘 어울려요.',
        translations: {
          ko: '이 블라우스와 치마가 잘 어울려요.',
          uz: 'Bu bluzka yubka bilan yaxshi yarashadi.',
          en: 'This blouse goes well with the skirt.',
          ru: 'Эта блузка хорошо сочетается с юбкой.',
        },
      },
    ],
    pronunciation: {
      hangul: '블라우스',
      romanization: 'beullauseu',
      ttsText: '블라우스',
    },
    media: {
      emoji: '👚',
      imageUrl: 'https://cdn.korio.app/words/beullauseu.webp',
      imageAlt: {
        ko: '단정한 블라우스',
        uz: 'chiroyli bluzka',
        en: 'a blouse',
        ru: 'блузка',
      },
    },
    tags: ['clothing', 'blouse', 'fashion', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "상체에 입는 옷이므로 '블라우스를 입다'라고 해요.",
      uz: "'블라우스를 입다' shaklida ishlatiladi.",
      en: 'Use 입다 with a blouse.',
      ru: 'С блузкой используется 입다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_skirt_noun',
    senseKey: 'clothing-skirt',
    korean: '치마',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '허리부터 아래쪽을 둘러 입는 옷',
      uz: 'yubka',
      en: 'skirt',
      ru: 'юбка',
    },
    examples: [
      {
        korean: '긴 치마를 입었어요.',
        translations: {
          ko: '길이가 긴 치마를 입었어요.',
          uz: 'Uzun yubka kiydim.',
          en: 'I wore a long skirt.',
          ru: 'Я надела длинную юбку.',
        },
      },
      {
        korean: '이 치마는 조금 짧아요.',
        translations: {
          ko: '이 치마의 길이가 조금 짧아요.',
          uz: 'Bu yubka biroz kalta.',
          en: 'This skirt is a little short.',
          ru: 'Эта юбка немного короткая.',
        },
      },
    ],
    pronunciation: {
      hangul: '치마',
      romanization: 'chima',
      ttsText: '치마',
    },
    media: {
      emoji: '👗',
      imageUrl: 'https://cdn.korio.app/words/chima.webp',
      imageAlt: {
        ko: '여성용 치마',
        uz: 'yubka',
        en: 'a skirt',
        ru: 'юбка',
      },
    },
    tags: ['clothing', 'skirt', 'fashion', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "'치마를 입다'라고 사용해요.",
      uz: "'치마를 입다' shaklida ishlatiladi.",
      en: 'Use 입다 with skirts.',
      ru: 'С юбкой используется 입다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_dress_shoes_noun',
    senseKey: 'clothing-dress-shoes',
    korean: '구두',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '가죽 등으로 만든 비교적 격식 있는 신발',
      uz: 'tufli',
      en: 'dress shoes',
      ru: 'туфли',
    },
    examples: [
      {
        korean: '결혼식에 구두를 신어요.',
        translations: {
          ko: '결혼식에 갈 때 구두를 신어요.',
          uz: 'To‘yga tufli kiyaman.',
          en: 'I wear dress shoes to the wedding.',
          ru: 'На свадьбу я надеваю туфли.',
        },
      },
      {
        korean: '이 구두는 조금 작아요.',
        translations: {
          ko: '이 구두의 크기가 조금 작아요.',
          uz: 'Bu tufli biroz kichik.',
          en: 'These shoes are a little small.',
          ru: 'Эти туфли немного малы.',
        },
      },
    ],
    pronunciation: {
      hangul: '구두',
      romanization: 'gudu',
      ttsText: '구두',
    },
    media: {
      emoji: '👞',
      imageUrl: 'https://cdn.korio.app/words/gudu.webp',
      imageAlt: {
        ko: '정장용 구두',
        uz: 'rasmiy tufli',
        en: 'dress shoes',
        ru: 'классические туфли',
      },
    },
    tags: ['clothing', 'shoes', 'formal-wear', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "구두는 발에 착용하므로 '구두를 신다'라고 해요.",
      uz: "'구두를 신다' shaklida ishlatiladi.",
      en: 'Use 신다 with dress shoes.',
      ru: 'С туфлями используется 신다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_hat_noun',
    senseKey: 'clothing-hat',
    korean: '모자',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '머리에 쓰는 물건',
      uz: 'bosh kiyim',
      en: 'hat, cap',
      ru: 'шапка, шляпа',
    },
    examples: [
      {
        korean: '밖에 나갈 때 모자를 써요.',
        translations: {
          ko: '밖에 나갈 때 머리에 모자를 써요.',
          uz: 'Tashqariga chiqqanda bosh kiyim kiyaman.',
          en: 'I wear a hat when I go outside.',
          ru: 'Когда выхожу на улицу, я надеваю головной убор.',
        },
      },
      {
        korean: '이 모자가 잘 어울려요.',
        translations: {
          ko: '이 모자가 아주 잘 어울려요.',
          uz: 'Bu bosh kiyim sizga yarashadi.',
          en: 'This hat looks good on you.',
          ru: 'Эта шляпа вам идёт.',
        },
      },
    ],
    pronunciation: {
      hangul: '모자',
      romanization: 'moja',
      ttsText: '모자',
    },
    media: {
      emoji: '🧢',
      imageUrl: 'https://cdn.korio.app/words/moja.webp',
      imageAlt: {
        ko: '머리에 쓰는 모자',
        uz: 'bosh kiyim',
        en: 'a hat',
        ru: 'головной убор',
      },
    },
    tags: ['clothing', 'hat', 'accessory', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "모자는 '모자를 쓰다'라고 해요.",
      uz: "'모자를 쓰다' shaklida ishlatiladi.",
      en: 'Use 쓰다 with hats.',
      ru: 'С головным убором используется 쓰다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_scarf_noun',
    senseKey: 'accessory-scarf-muffler',
    korean: '목도리',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '추위를 막기 위해 목에 두르는 긴 천',
      uz: 'sharf',
      en: 'scarf, muffler',
      ru: 'шарф',
    },
    examples: [
      {
        korean: '겨울에는 목도리를 해요.',
        translations: {
          ko: '겨울에는 목에 목도리를 둘러요.',
          uz: 'Qishda sharf taqaman.',
          en: 'I wear a scarf in winter.',
          ru: 'Зимой я ношу шарф.',
        },
      },
      {
        korean: '이 목도리는 아주 따뜻해요.',
        translations: {
          ko: '이 목도리는 추운 날에 아주 따뜻해요.',
          uz: 'Bu sharf juda issiq.',
          en: 'This scarf is very warm.',
          ru: 'Этот шарф очень тёплый.',
        },
      },
    ],
    pronunciation: {
      hangul: '목도리',
      romanization: 'mokdori',
      ttsText: '목도리',
    },
    media: {
      emoji: '🧣',
      imageUrl: 'https://cdn.korio.app/words/mokdori.webp',
      imageAlt: {
        ko: '겨울용 목도리',
        uz: 'qishki sharf',
        en: 'a winter scarf',
        ru: 'зимний шарф',
      },
    },
    tags: ['accessory', 'scarf', 'winter', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "'목도리를 하다' 또는 '목도리를 두르다'라고 해요.",
      uz: "'목도리를 하다' yoki '목도리를 두르다' ishlatiladi.",
      en: 'Common expressions are 목도리를 하다 and 목도리를 두르다.',
      ru: 'Можно сказать 목도리를 하다 или 목도리를 두르다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_gloves_noun',
    senseKey: 'clothing-gloves',
    korean: '장갑',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '손을 보호하거나 따뜻하게 하기 위해 손에 끼는 물건',
      uz: 'qo‘lqop',
      en: 'gloves',
      ru: 'перчатки',
    },
    examples: [
      {
        korean: '추워서 장갑을 껴요.',
        translations: {
          ko: '날씨가 추워서 손에 장갑을 껴요.',
          uz: 'Sovuq bo‘lgani uchun qo‘lqop kiyaman.',
          en: 'I wear gloves because it is cold.',
          ru: 'Я надеваю перчатки, потому что холодно.',
        },
      },
      {
        korean: '장갑을 잃어버렸어요.',
        translations: {
          ko: '끼고 다니던 장갑을 잃어버렸어요.',
          uz: 'Qo‘lqopimni yo‘qotib qo‘ydim.',
          en: 'I lost my gloves.',
          ru: 'Я потерял перчатки.',
        },
      },
    ],
    pronunciation: {
      hangul: '장갑',
      romanization: 'janggap',
      ttsText: '장갑',
    },
    media: {
      emoji: '🧤',
      imageUrl: 'https://cdn.korio.app/words/janggap.webp',
      imageAlt: {
        ko: '겨울용 장갑',
        uz: 'qishki qo‘lqop',
        en: 'winter gloves',
        ru: 'зимние перчатки',
      },
    },
    tags: ['clothing', 'gloves', 'winter', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "장갑은 손에 착용하므로 '장갑을 끼다'라고 해요.",
      uz: "'장갑을 끼다' shaklida ishlatiladi.",
      en: 'Use 끼다 with gloves.',
      ru: 'С перчатками используется 끼다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_fashion_scarf_noun',
    senseKey: 'accessory-fashion-scarf',
    korean: '스카프',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '목이나 머리 등에 둘러 장식하는 얇은 천',
      uz: 'ro‘mol, sharf',
      en: 'scarf',
      ru: 'шарф, платок',
    },
    examples: [
      {
        korean: '목에 스카프를 했어요.',
        translations: {
          ko: '목에 스카프를 둘렀어요.',
          uz: 'Bo‘ynimga ro‘mol taqdim.',
          en: 'I wore a scarf around my neck.',
          ru: 'Я надел шарф на шею.',
        },
      },
      {
        korean: '이 스카프가 블라우스와 잘 어울려요.',
        translations: {
          ko: '이 스카프와 블라우스가 잘 어울려요.',
          uz: 'Bu ro‘mol bluzka bilan yaxshi yarashadi.',
          en: 'This scarf goes well with the blouse.',
          ru: 'Этот платок хорошо сочетается с блузкой.',
        },
      },
    ],
    pronunciation: {
      hangul: '스카프',
      romanization: 'seukapeu',
      ttsText: '스카프',
    },
    media: {
      emoji: '🧣',
      imageUrl: 'https://cdn.korio.app/words/seukapeu.webp',
      imageAlt: {
        ko: '패션용 스카프',
        uz: 'moda ro‘moli',
        en: 'a fashion scarf',
        ru: 'модный шарф',
      },
    },
    tags: ['accessory', 'scarf', 'fashion', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "'목도리'가 주로 방한용이라면 '스카프'는 장식용으로도 많이 사용해요.",
      uz: "'목도리' ko‘proq issiqlik uchun, '스카프' esa bezak uchun ham ishlatiladi.",
      en: '목도리 is usually for warmth, while 스카프 is often decorative.',
      ru: '목도리 чаще согревает, а 스카프 часто используется как аксессуар.',
    },
    isCore: true,
    isActive: true,
  },

  // ── 착용 동사 ──

  {
    code: 'word_wear_clothes_verb',
    senseKey: 'clothing-action-wear-clothes',
    korean: '입다',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '옷을 몸에 걸치다',
      uz: 'kiymoq',
      en: 'to wear, put on clothes',
      ru: 'надевать одежду',
    },
    examples: [
      {
        korean: '양복을 입어요.',
        translations: {
          ko: '몸에 양복을 입어요.',
          uz: 'Kostyum kiyaman.',
          en: 'I wear a suit.',
          ru: 'Я надеваю костюм.',
        },
      },
      {
        korean: '오늘은 스웨터를 입었어요.',
        translations: {
          ko: '오늘은 스웨터를 입고 왔어요.',
          uz: 'Bugun sviter kiydim.',
          en: 'I wore a sweater today.',
          ru: 'Сегодня я надел свитер.',
        },
      },
    ],
    pronunciation: {
      hangul: '입다',
      romanization: 'ipda',
      ttsText: '입다',
    },
    media: {
      emoji: '👕',
      imageUrl: 'https://cdn.korio.app/words/ipda.webp',
      imageAlt: {
        ko: '옷을 입는 사람',
        uz: 'kiyim kiyayotgan odam',
        en: 'a person putting on clothes',
        ru: 'человек, надевающий одежду',
      },
    },
    tags: ['verb', 'clothing', 'wear', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: '셔츠, 바지, 치마, 양복 등 몸에 입는 옷에 사용해요.',
      uz: 'Ko‘ylak, shim, yubka va kostyum bilan ishlatiladi.',
      en: 'Used with clothes worn on the body.',
      ru: 'Используется с одеждой, надеваемой на тело.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_wear_on_head_verb',
    senseKey: 'clothing-action-wear-on-head',
    korean: '쓰다',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '모자나 안경 등을 머리나 얼굴에 착용하다',
      uz: 'boshga yoki yuzga taqmoq',
      en: 'to wear on the head or face',
      ru: 'надевать на голову или лицо',
    },
    examples: [
      {
        korean: '모자를 써요.',
        translations: {
          ko: '머리에 모자를 써요.',
          uz: 'Bosh kiyim kiyaman.',
          en: 'I wear a hat.',
          ru: 'Я надеваю шляпу.',
        },
      },
      {
        korean: '안경을 쓰고 책을 읽어요.',
        translations: {
          ko: '안경을 착용하고 책을 읽어요.',
          uz: 'Ko‘zoynak taqib kitob o‘qiyman.',
          en: 'I read a book wearing glasses.',
          ru: 'Я читаю книгу в очках.',
        },
      },
    ],
    pronunciation: {
      hangul: '쓰다',
      romanization: 'sseuda',
      ttsText: '쓰다',
    },
    media: {
      emoji: '🧢',
      imageUrl: 'https://cdn.korio.app/words/sseuda-wear.webp',
      imageAlt: {
        ko: '모자를 쓰는 사람',
        uz: 'bosh kiyim kiyayotgan odam',
        en: 'a person putting on a hat',
        ru: 'человек, надевающий головной убор',
      },
    },
    tags: ['verb', 'clothing', 'hat', 'glasses', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "여기서는 '글을 쓰다'가 아니라 모자나 안경을 착용하는 뜻이에요.",
      uz: 'Bu yerda yozmoq emas, bosh kiyim yoki ko‘zoynak taqish ma’nosida.',
      en: "Here 쓰다 means to wear a hat or glasses, not 'to write.'",
      ru: 'Здесь 쓰다 означает носить головной убор или очки, а не «писать».',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_put_on_insert_verb',
    senseKey: 'clothing-action-put-on-fitted-item',
    korean: '끼다',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '장갑이나 반지, 안경 등을 몸의 일부에 끼워 착용하다',
      uz: 'qo‘lqop, uzuk yoki ko‘zoynak kabi narsani taqmoq',
      en: 'to put on, wear, insert',
      ru: 'надевать, носить',
    },
    examples: [
      {
        korean: '장갑을 껴요.',
        translations: {
          ko: '손에 장갑을 껴요.',
          uz: 'Qo‘lqop kiyaman.',
          en: 'I put on gloves.',
          ru: 'Я надеваю перчатки.',
        },
      },
      {
        korean: '반지를 손가락에 꼈어요.',
        translations: {
          ko: '손가락에 반지를 착용했어요.',
          uz: 'Barmog‘imga uzuk taqdim.',
          en: 'I put a ring on my finger.',
          ru: 'Я надел кольцо на палец.',
        },
      },
    ],
    pronunciation: {
      hangul: '끼다',
      romanization: 'kkida',
      ttsText: '끼다',
    },
    media: {
      emoji: '🧤',
      imageUrl: 'https://cdn.korio.app/words/kkida-wear.webp',
      imageAlt: {
        ko: '손에 장갑을 끼는 모습',
        uz: 'qo‘lqop kiyish',
        en: 'putting on gloves',
        ru: 'надевание перчаток',
      },
    },
    tags: ['verb', 'clothing', 'accessory', 'wear', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: '장갑, 반지, 렌즈 등 몸의 일부에 끼우는 물건에 자주 사용해요.',
      uz: 'Qo‘lqop, uzuk, linza kabi narsalar bilan ishlatiladi.',
      en: 'Commonly used with gloves, rings, contact lenses, and similar items.',
      ru: 'Часто используется с перчатками, кольцами, линзами и подобными предметами.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_wear_footwear_verb',
    senseKey: 'clothing-action-wear-footwear',
    korean: '신다',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '신발이나 양말 등을 발에 착용하다',
      uz: 'oyoq kiyim kiymoq',
      en: 'to put on footwear',
      ru: 'обуваться',
    },
    examples: [
      {
        korean: '운동화를 신어요.',
        translations: {
          ko: '발에 운동화를 신어요.',
          uz: 'Krossovka kiyaman.',
          en: 'I put on sneakers.',
          ru: 'Я надеваю кроссовки.',
        },
      },
      {
        korean: '검은 구두를 신었어요.',
        translations: {
          ko: '검은색 구두를 신었어요.',
          uz: 'Qora tufli kiydim.',
          en: 'I wore black dress shoes.',
          ru: 'Я надел чёрные туфли.',
        },
      },
    ],
    pronunciation: {
      hangul: '신다',
      romanization: 'sinda',
      ttsText: '신다',
    },
    media: {
      emoji: '👟',
      imageUrl: 'https://cdn.korio.app/words/sinda.webp',
      imageAlt: {
        ko: '신발을 신는 모습',
        uz: 'oyoq kiyim kiyish',
        en: 'putting on shoes',
        ru: 'надевание обуви',
      },
    },
    tags: ['verb', 'clothing', 'footwear', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: '운동화, 구두, 양말처럼 발에 착용하는 것에 사용해요.',
      uz: 'Krossovka, tufli va paypoq bilan ishlatiladi.',
      en: 'Used with shoes, sneakers, socks, and other footwear.',
      ru: 'Используется с обувью и носками.',
    },
    isCore: true,
    isActive: true,
  },

  // ── 옷 비교 · 묘사 ──

  {
    code: 'word_expensive_adjective',
    senseKey: 'price-be-expensive',
    korean: '비싸다',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: {
      ko: '가격이 보통보다 높다',
      uz: 'qimmat bo‘lmoq',
      en: 'to be expensive',
      ru: 'быть дорогим',
    },
    examples: [
      {
        korean: '이 양복은 너무 비싸요.',
        translations: {
          ko: '이 양복의 가격이 너무 높아요.',
          uz: 'Bu kostyum juda qimmat.',
          en: 'This suit is too expensive.',
          ru: 'Этот костюм слишком дорогой.',
        },
      },
      {
        korean: '구두가 생각보다 비싸요.',
        translations: {
          ko: '구두 가격이 생각보다 높아요.',
          uz: 'Tufli o‘ylaganimdan qimmatroq.',
          en: 'The shoes are more expensive than I expected.',
          ru: 'Туфли дороже, чем я ожидал.',
        },
      },
    ],
    pronunciation: {
      hangul: '비싸다',
      romanization: 'bissada',
      ttsText: '비싸다',
    },
    media: {
      emoji: '💸',
      imageUrl: 'https://cdn.korio.app/words/bissada.webp',
      imageAlt: {
        ko: '가격이 비싼 옷',
        uz: 'qimmat kiyim',
        en: 'expensive clothing',
        ru: 'дорогая одежда',
      },
    },
    tags: ['adjective', 'price', 'shopping', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "반대말은 '싸다'예요.",
      uz: "Qarama-qarshisi '싸다'.",
      en: 'The opposite is 싸다.',
      ru: 'Антоним — 싸다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_cheap_adjective',
    senseKey: 'price-be-cheap',
    korean: '싸다',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: {
      ko: '가격이 보통보다 낮다',
      uz: 'arzon bo‘lmoq',
      en: 'to be cheap',
      ru: 'быть дешёвым',
    },
    examples: [
      {
        korean: '이 스웨터는 싸요.',
        translations: {
          ko: '이 스웨터는 가격이 낮아요.',
          uz: 'Bu sviter arzon.',
          en: 'This sweater is cheap.',
          ru: 'Этот свитер дешёвый.',
        },
      },
      {
        korean: '운동화가 싸서 샀어요.',
        translations: {
          ko: '운동화 가격이 싸서 샀어요.',
          uz: 'Krossovka arzon bo‘lgani uchun sotib oldim.',
          en: 'I bought the sneakers because they were cheap.',
          ru: 'Я купил кроссовки, потому что они были дешёвыми.',
        },
      },
    ],
    pronunciation: {
      hangul: '싸다',
      romanization: 'ssada',
      ttsText: '싸다',
    },
    media: {
      emoji: '🏷️',
      imageUrl: 'https://cdn.korio.app/words/ssada-cheap.webp',
      imageAlt: {
        ko: '저렴한 가격표',
        uz: 'arzon narx yorlig‘i',
        en: 'an inexpensive price tag',
        ru: 'ярлык с низкой ценой',
      },
    },
    tags: ['adjective', 'price', 'shopping', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "가격이 낮다는 뜻이고 반대말은 '비싸다'예요.",
      uz: "Narx arzonligini bildiradi; qarama-qarshisi '비싸다'.",
      en: 'It means inexpensive; the opposite is 비싸다.',
      ru: 'Означает низкую цену; антоним — 비싸다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_long_adjective',
    senseKey: 'length-long',
    korean: '길다',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: {
      ko: '한쪽 끝에서 다른 쪽 끝까지의 거리가 크다',
      uz: 'uzun bo‘lmoq',
      en: 'to be long',
      ru: 'быть длинным',
    },
    examples: [
      {
        korean: '이 바지는 길어요.',
        translations: {
          ko: '이 바지의 길이가 길어요.',
          uz: 'Bu shim uzun.',
          en: 'These pants are long.',
          ru: 'Эти брюки длинные.',
        },
      },
      {
        korean: '긴 치마를 좋아해요.',
        translations: {
          ko: '길이가 긴 치마를 좋아해요.',
          uz: 'Uzun yubkani yoqtiraman.',
          en: 'I like long skirts.',
          ru: 'Мне нравятся длинные юбки.',
        },
      },
    ],
    pronunciation: {
      hangul: '길다',
      romanization: 'gilda',
      ttsText: '길다',
    },
    media: {
      emoji: '↕️',
      imageUrl: 'https://cdn.korio.app/words/gilda.webp',
      imageAlt: {
        ko: '길이가 긴 옷',
        uz: 'uzun kiyim',
        en: 'long clothing',
        ru: 'длинная одежда',
      },
    },
    tags: ['adjective', 'length', 'description', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "반대말은 '짧다'예요.",
      uz: "Qarama-qarshisi '짧다'.",
      en: 'The opposite is 짧다.',
      ru: 'Антоним — 짧다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_short_length_adjective',
    senseKey: 'length-short',
    korean: '짧다',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: {
      ko: '한쪽 끝에서 다른 쪽 끝까지의 거리가 작다',
      uz: 'kalta bo‘lmoq',
      en: 'to be short',
      ru: 'быть коротким',
    },
    examples: [
      {
        korean: '치마가 너무 짧아요.',
        translations: {
          ko: '치마의 길이가 너무 짧아요.',
          uz: 'Yubka juda kalta.',
          en: 'The skirt is too short.',
          ru: 'Юбка слишком короткая.',
        },
      },
      {
        korean: '짧은 바지를 입었어요.',
        translations: {
          ko: '길이가 짧은 바지를 입었어요.',
          uz: 'Kalta shim kiydim.',
          en: 'I wore short pants.',
          ru: 'Я надел короткие брюки.',
        },
      },
    ],
    pronunciation: {
      hangul: '짧다',
      romanization: 'jjalda',
      ttsText: '짧다',
    },
    media: {
      emoji: '↕️',
      imageUrl: 'https://cdn.korio.app/words/jjalda.webp',
      imageAlt: {
        ko: '길이가 짧은 옷',
        uz: 'kalta kiyim',
        en: 'short clothing',
        ru: 'короткая одежда',
      },
    },
    tags: ['adjective', 'length', 'description', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "반대말은 '길다'예요.",
      uz: "Qarama-qarshisi '길다'.",
      en: 'The opposite is 길다.',
      ru: 'Антоним — 길다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_bright_adjective',
    senseKey: 'color-bright',
    korean: '밝다',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: {
      ko: '빛이나 색이 환하고 선명하다',
      uz: 'och, yorqin bo‘lmoq',
      en: 'to be bright',
      ru: 'быть светлым, ярким',
    },
    examples: [
      {
        korean: '밝은 색 옷을 좋아해요.',
        translations: {
          ko: '환하고 밝은 색의 옷을 좋아해요.',
          uz: 'Yorqin rangli kiyimlarni yoqtiraman.',
          en: 'I like bright-colored clothes.',
          ru: 'Мне нравится одежда светлых цветов.',
        },
      },
      {
        korean: '이 스웨터는 색이 밝아요.',
        translations: {
          ko: '이 스웨터의 색이 밝아요.',
          uz: 'Bu sviterning rangi yorqin.',
          en: 'This sweater has a bright color.',
          ru: 'У этого свитера светлый цвет.',
        },
      },
    ],
    pronunciation: {
      hangul: '밝다',
      romanization: 'bakda',
      ttsText: '밝다',
    },
    media: {
      emoji: '☀️',
      imageUrl: 'https://cdn.korio.app/words/bakda-bright.webp',
      imageAlt: {
        ko: '밝은 색의 옷',
        uz: 'yorqin rangli kiyim',
        en: 'bright-colored clothing',
        ru: 'одежда светлого цвета',
      },
    },
    tags: ['adjective', 'color', 'brightness', 'fashion', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: '빛뿐 아니라 옷이나 색이 환할 때도 사용해요.',
      uz: 'Yorug‘lik va och ranglarni tasvirlashda ishlatiladi.',
      en: 'Used for light as well as bright or light colors.',
      ru: 'Используется для света и светлых или ярких цветов.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_dark_adjective',
    senseKey: 'color-dark',
    korean: '어둡다',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: {
      ko: '빛이 적거나 색이 짙다',
      uz: 'to‘q, qorong‘i bo‘lmoq',
      en: 'to be dark',
      ru: 'быть тёмным',
    },
    examples: [
      {
        korean: '어두운 색 양복을 입었어요.',
        translations: {
          ko: '짙은 색의 양복을 입었어요.',
          uz: 'To‘q rangli kostyum kiydim.',
          en: 'I wore a dark-colored suit.',
          ru: 'Я надел костюм тёмного цвета.',
        },
      },
      {
        korean: '이 방은 조금 어두워요.',
        translations: {
          ko: '이 방은 빛이 적어서 조금 어두워요.',
          uz: 'Bu xona biroz qorong‘i.',
          en: 'This room is a little dark.',
          ru: 'Эта комната немного тёмная.',
        },
      },
    ],
    pronunciation: {
      hangul: '어둡다',
      romanization: 'eodupda',
      ttsText: '어둡다',
    },
    media: {
      emoji: '🌑',
      imageUrl: 'https://cdn.korio.app/words/eodupda.webp',
      imageAlt: {
        ko: '어두운 색의 옷',
        uz: 'to‘q rangli kiyim',
        en: 'dark-colored clothing',
        ru: 'одежда тёмного цвета',
      },
    },
    tags: ['adjective', 'color', 'dark', 'fashion', 'topik-1'],
    difficulty: 2,
    usageNote: {
      ko: "ㅂ 불규칙으로 '어둡다 → 어두워요'가 돼요.",
      uz: "'어둡다 → 어두워요' shaklida tuslanadi.",
      en: 'It follows the ㅂ irregular pattern: 어둡다 → 어두워요.',
      ru: 'Нерегулярное ㅂ-спряжение: 어둡다 → 어두워요.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_fit_be_right_verb',
    senseKey: 'clothing-fit-correct',
    korean: '맞다',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '크기나 조건 등이 알맞거나 정확하다',
      uz: 'mos kelmoq, to‘g‘ri bo‘lmoq',
      en: 'to fit, to be right',
      ru: 'подходить, быть правильным',
    },
    examples: [
      {
        korean: '이 바지는 저에게 잘 맞아요.',
        translations: {
          ko: '이 바지의 크기가 저에게 잘 맞아요.',
          uz: 'Bu shim menga yaxshi mos keladi.',
          en: 'These pants fit me well.',
          ru: 'Эти брюки мне хорошо подходят.',
        },
      },
      {
        korean: '이 신발은 크기가 안 맞아요.',
        translations: {
          ko: '이 신발은 제 발 크기와 맞지 않아요.',
          uz: 'Bu oyoq kiyimning o‘lchami menga mos emas.',
          en: "These shoes don't fit.",
          ru: 'Эта обувь мне не подходит по размеру.',
        },
      },
    ],
    pronunciation: {
      hangul: '맞다',
      romanization: 'matda',
      ttsText: '맞다',
    },
    media: {
      emoji: '✅',
      imageUrl: 'https://cdn.korio.app/words/matda-fit.webp',
      imageAlt: {
        ko: '크기가 잘 맞는 옷',
        uz: 'o‘lchami mos kiyim',
        en: 'clothes that fit well',
        ru: 'одежда подходящего размера',
      },
    },
    tags: ['verb', 'clothing', 'fit', 'size', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "옷에서는 '크기가 맞다', '잘 맞다'처럼 많이 사용해요.",
      uz: "Kiyim bilan '크기가 맞다', '잘 맞다' kabi ishlatiladi.",
      en: 'For clothing, common expressions include 크기가 맞다 and 잘 맞다.',
      ru: 'С одеждой часто употребляют 크기가 맞다 и 잘 맞다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_big_adjective',
    senseKey: 'size-big',
    korean: '크다',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: {
      ko: '크기나 규모가 보통보다 크다',
      uz: 'katta bo‘lmoq',
      en: 'to be big',
      ru: 'быть большим',
    },
    examples: [
      {
        korean: '이 양복은 조금 커요.',
        translations: {
          ko: '이 양복의 크기가 조금 커요.',
          uz: 'Bu kostyum biroz katta.',
          en: 'This suit is a little big.',
          ru: 'Этот костюм немного большой.',
        },
      },
      {
        korean: '더 큰 사이즈가 있어요?',
        translations: {
          ko: '크기가 더 큰 것이 있어요?',
          uz: 'Kattaroq o‘lcham bormi?',
          en: 'Do you have a bigger size?',
          ru: 'Есть размер побольше?',
        },
      },
    ],
    pronunciation: {
      hangul: '크다',
      romanization: 'keuda',
      ttsText: '크다',
    },
    media: {
      emoji: '↗️',
      imageUrl: 'https://cdn.korio.app/words/keuda.webp',
      imageAlt: {
        ko: '크기가 큰 옷',
        uz: 'katta kiyim',
        en: 'large clothing',
        ru: 'большая одежда',
      },
    },
    tags: ['adjective', 'size', 'description', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "반대말은 '작다'예요.",
      uz: "Qarama-qarshisi '작다'.",
      en: 'The opposite is 작다.',
      ru: 'Антоним — 작다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_small_adjective',
    senseKey: 'size-small',
    korean: '작다',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: {
      ko: '크기나 규모가 보통보다 작다',
      uz: 'kichik bo‘lmoq',
      en: 'to be small',
      ru: 'быть маленьким',
    },
    examples: [
      {
        korean: '이 구두는 너무 작아요.',
        translations: {
          ko: '이 구두의 크기가 너무 작아요.',
          uz: 'Bu tufli juda kichik.',
          en: 'These shoes are too small.',
          ru: 'Эти туфли слишком маленькие.',
        },
      },
      {
        korean: '조금 작은 모자를 샀어요.',
        translations: {
          ko: '크기가 조금 작은 모자를 샀어요.',
          uz: 'Biroz kichik bosh kiyim sotib oldim.',
          en: 'I bought a slightly small hat.',
          ru: 'Я купил немного маленькую шляпу.',
        },
      },
    ],
    pronunciation: {
      hangul: '작다',
      romanization: 'jakda',
      ttsText: '작다',
    },
    media: {
      emoji: '↘️',
      imageUrl: 'https://cdn.korio.app/words/jakda.webp',
      imageAlt: {
        ko: '크기가 작은 옷',
        uz: 'kichik kiyim',
        en: 'small clothing',
        ru: 'маленькая одежда',
      },
    },
    tags: ['adjective', 'size', 'description', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "반대말은 '크다'예요.",
      uz: "Qarama-qarshisi '크다'.",
      en: 'The opposite is 크다.',
      ru: 'Антоним — 크다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_suit_look_good_verb',
    senseKey: 'appearance-suit-look-good',
    korean: '어울리다',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '사람이나 물건이 서로 잘 맞고 보기 좋다',
      uz: 'yarashmoq, mos tushmoq',
      en: 'to suit, to look good on',
      ru: 'идти, подходить, сочетаться',
    },
    examples: [
      {
        korean: '이 모자가 정말 잘 어울려요.',
        translations: {
          ko: '이 모자가 아주 잘 어울려요.',
          uz: 'Bu bosh kiyim sizga juda yarashadi.',
          en: 'This hat really suits you.',
          ru: 'Эта шляпа вам очень идёт.',
        },
      },
      {
        korean: '블라우스와 치마가 잘 어울려요.',
        translations: {
          ko: '블라우스와 치마의 조합이 보기 좋아요.',
          uz: 'Bluzka bilan yubka yaxshi mos keladi.',
          en: 'The blouse and skirt go well together.',
          ru: 'Блузка и юбка хорошо сочетаются.',
        },
      },
    ],
    pronunciation: {
      hangul: '어울리다',
      romanization: 'eoullida',
      ttsText: '어울리다',
    },
    media: {
      emoji: '✨',
      imageUrl: 'https://cdn.korio.app/words/eoullida.webp',
      imageAlt: {
        ko: '서로 잘 어울리는 옷',
        uz: 'bir-biriga yarashgan kiyimlar',
        en: 'well-matched clothing',
        ru: 'хорошо сочетающаяся одежда',
      },
    },
    tags: ['verb', 'appearance', 'fashion', 'clothing', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: '사람에게 옷이 잘 맞는 경우와 두 물건이 서로 잘 조화되는 경우 모두 사용할 수 있어요.',
      uz: 'Kiyim odamga yarashganda yoki ikki narsa bir-biriga mos kelganda ishlatiladi.',
      en: 'It can describe clothing suiting a person or two things matching well.',
      ru: 'Может означать, что одежда идёт человеку или вещи хорошо сочетаются.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_like_be_pleased_verb',
    senseKey: 'preference-be-pleased-with',
    korean: '마음에 들다',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '어떤 것이 좋아서 만족스럽게 느껴지다',
      uz: 'yoqmoq, ma’qul kelmoq',
      en: 'to like, to be pleased with',
      ru: 'нравиться',
    },
    examples: [
      {
        korean: '이 옷이 마음에 들어요.',
        translations: {
          ko: '이 옷이 좋아서 만족스러워요.',
          uz: 'Bu kiyim menga yoqadi.',
          en: 'I like these clothes.',
          ru: 'Мне нравится эта одежда.',
        },
      },
      {
        korean: '새 안경이 아주 마음에 들어요.',
        translations: {
          ko: '새 안경이 아주 좋아요.',
          uz: 'Yangi ko‘zoynagim menga juda yoqadi.',
          en: 'I really like my new glasses.',
          ru: 'Мне очень нравятся мои новые очки.',
        },
      },
    ],
    pronunciation: {
      hangul: '마음에 들다',
      romanization: 'maeume deulda',
      ttsText: '마음에 들다',
    },
    media: {
      emoji: '💗',
      imageUrl: 'https://cdn.korio.app/words/maeume-deulda.webp',
      imageAlt: {
        ko: '마음에 드는 물건을 보고 좋아하는 모습',
        uz: 'yoqqan narsadan xursand odam',
        en: 'a person pleased with something',
        ru: 'человек, которому что-то понравилось',
      },
    },
    tags: ['verb', 'preference', 'shopping', 'emotion', 'topik-1'],
    difficulty: 2,
    usageNote: {
      ko: "좋아하는 대상이 주어가 되어 'N이/가 마음에 들다' 형태로 많이 사용해요.",
      uz: "'N이/가 마음에 들다' shaklida ishlatiladi.",
      en: 'The liked item commonly appears in the pattern N이/가 마음에 들다.',
      ru: 'Частая конструкция: N이/가 마음에 들다.',
    },
    isCore: true,
    isActive: true,
  },

  // ── 감정 · 관계 ──

  {
    code: 'word_wedding_ceremony_noun',
    senseKey: 'event-wedding-ceremony',
    korean: '결혼식',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '두 사람이 결혼하는 것을 공식적으로 기념하는 행사',
      uz: 'to‘y marosimi',
      en: 'wedding ceremony',
      ru: 'свадебная церемония',
    },
    examples: [
      {
        korean: '친구의 결혼식에 가요.',
        translations: {
          ko: '친구가 결혼하는 행사에 가요.',
          uz: 'Do‘stimning to‘yiga boraman.',
          en: "I'm going to my friend's wedding.",
          ru: 'Я иду на свадьбу друга.',
        },
      },
      {
        korean: '결혼식에 양복을 입었어요.',
        translations: {
          ko: '결혼식에 갈 때 양복을 입었어요.',
          uz: 'To‘y marosimiga kostyum kiydim.',
          en: 'I wore a suit to the wedding.',
          ru: 'Я надел костюм на свадьбу.',
        },
      },
    ],
    pronunciation: {
      hangul: '결혼식',
      romanization: 'gyeolhonsik',
      ttsText: '결혼식',
    },
    media: {
      emoji: '💒',
      imageUrl: 'https://cdn.korio.app/words/gyeolhonsik.webp',
      imageAlt: {
        ko: '신랑과 신부의 결혼식',
        uz: 'kelin-kuyov to‘y marosimi',
        en: 'a wedding ceremony',
        ru: 'свадебная церемония',
      },
    },
    tags: ['event', 'wedding', 'relationship', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "'결혼하다'는 결혼하는 행동이고 '결혼식'은 그 행사 자체를 뜻해요.",
      uz: "'결혼하다' turmush qurish, '결혼식' esa to‘y marosimi.",
      en: '결혼하다 means to marry; 결혼식 is the wedding ceremony itself.',
      ru: '결혼하다 означает жениться/выйти замуж, а 결혼식 — свадебную церемонию.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_sad_adjective',
    senseKey: 'emotion-sad',
    korean: '슬프다',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: {
      ko: '마음이 아프고 기분이 좋지 않다',
      uz: 'xafa, g‘amgin bo‘lmoq',
      en: 'to be sad',
      ru: 'быть грустным',
    },
    examples: [
      {
        korean: '친구와 헤어져서 슬퍼요.',
        translations: {
          ko: '친구와 헤어져서 마음이 슬퍼요.',
          uz: 'Do‘stim bilan ayrilganim uchun xafaman.',
          en: "I'm sad because I parted with my friend.",
          ru: 'Мне грустно, потому что я расстался с другом.',
        },
      },
      {
        korean: '슬픈 영화를 봤어요.',
        translations: {
          ko: '내용이 슬픈 영화를 봤어요.',
          uz: 'G‘amgin film ko‘rdim.',
          en: 'I watched a sad movie.',
          ru: 'Я посмотрел грустный фильм.',
        },
      },
    ],
    pronunciation: {
      hangul: '슬프다',
      romanization: 'seulpeuda',
      ttsText: '슬프다',
    },
    media: {
      emoji: '😢',
      imageUrl: 'https://cdn.korio.app/words/seulpeuda.webp',
      imageAlt: {
        ko: '슬픈 표정의 사람',
        uz: 'xafa odam',
        en: 'a sad person',
        ru: 'грустный человек',
      },
    },
    tags: ['adjective', 'emotion', 'sad', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "'슬프다 → 슬퍼요'로 활용해요.",
      uz: "'슬프다 → 슬퍼요' shaklida tuslanadi.",
      en: 'The ㅡ drops in conjugation: 슬프다 → 슬퍼요.',
      ru: 'При спряжении: 슬프다 → 슬퍼요.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_bored_adjective',
    senseKey: 'feeling-bored',
    korean: '심심하다',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: {
      ko: '할 일이 없거나 재미있는 일이 없어 지루하다',
      uz: 'zerikmoq',
      en: 'to be bored',
      ru: 'скучать',
    },
    examples: [
      {
        korean: '혼자 있어서 심심해요.',
        translations: {
          ko: '혼자 있고 할 일이 없어서 심심해요.',
          uz: 'Yolg‘iz bo‘lganim uchun zerikyapman.',
          en: "I'm bored because I'm alone.",
          ru: 'Мне скучно, потому что я один.',
        },
      },
      {
        korean: '심심해서 친구에게 전화했어요.',
        translations: {
          ko: '심심한 기분이 들어서 친구에게 전화했어요.',
          uz: 'Zerikkanim uchun do‘stimga telefon qildim.',
          en: 'I called my friend because I was bored.',
          ru: 'Я позвонил другу, потому что мне было скучно.',
        },
      },
    ],
    pronunciation: {
      hangul: '심심하다',
      romanization: 'simsimhada',
      ttsText: '심심하다',
    },
    media: {
      emoji: '🥱',
      imageUrl: 'https://cdn.korio.app/words/simsimhada.webp',
      imageAlt: {
        ko: '심심해하는 사람',
        uz: 'zerikayotgan odam',
        en: 'a bored person',
        ru: 'скучающий человек',
      },
    },
    tags: ['adjective', 'emotion', 'boredom', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: '할 일이 없어서 지루할 때 사용하는 표현이에요.',
      uz: 'Qiladigan ish yo‘q va zerikkan paytda ishlatiladi.',
      en: 'Used when you feel bored because there is nothing interesting to do.',
      ru: 'Используется, когда скучно и нечем заняться.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_tired_adjective',
    senseKey: 'physical-state-tired',
    korean: '피곤하다',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: {
      ko: '몸이나 정신에 힘이 없어 쉬고 싶은 상태이다',
      uz: 'charchagan bo‘lmoq',
      en: 'to be tired',
      ru: 'быть уставшим',
    },
    examples: [
      {
        korean: '오늘은 너무 피곤해요.',
        translations: {
          ko: '오늘은 몸이 많이 피곤해요.',
          uz: 'Bugun juda charchadim.',
          en: "I'm very tired today.",
          ru: 'Сегодня я очень устал.',
        },
      },
      {
        korean: '운동을 많이 해서 피곤해요.',
        translations: {
          ko: '운동을 많이 해서 몸이 피곤해요.',
          uz: 'Ko‘p mashq qilganim uchun charchadim.',
          en: "I'm tired because I exercised a lot.",
          ru: 'Я устал, потому что много тренировался.',
        },
      },
    ],
    pronunciation: {
      hangul: '피곤하다',
      romanization: 'pigonhada',
      ttsText: '피곤하다',
    },
    media: {
      emoji: '😮‍💨',
      imageUrl: 'https://cdn.korio.app/words/pigonhada.webp',
      imageAlt: {
        ko: '피곤해하는 사람',
        uz: 'charchagan odam',
        en: 'a tired person',
        ru: 'уставший человек',
      },
    },
    tags: ['adjective', 'physical-state', 'tired', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "'피곤해서 쉬다', '피곤해서 자다'처럼 이유 표현과 자주 사용해요.",
      uz: "'피곤해서 쉬다' kabi ishlatiladi.",
      en: 'Often used with reasons, as in 피곤해서 쉬다.',
      ru: 'Часто используется в конструкциях причины, например 피곤해서 쉬다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_mood_noun',
    senseKey: 'emotion-mood',
    korean: '기분',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '어떤 순간에 느끼는 마음의 상태',
      uz: 'kayfiyat',
      en: 'mood, feeling',
      ru: 'настроение',
    },
    examples: [
      {
        korean: '오늘 기분이 좋아요.',
        translations: {
          ko: '오늘 마음 상태가 좋아요.',
          uz: 'Bugun kayfiyatim yaxshi.',
          en: "I'm in a good mood today.",
          ru: 'Сегодня у меня хорошее настроение.',
        },
      },
      {
        korean: '왜 기분이 안 좋아요?',
        translations: {
          ko: '왜 기분이 좋지 않아요?',
          uz: 'Nega kayfiyatingiz yomon?',
          en: 'Why are you in a bad mood?',
          ru: 'Почему у вас плохое настроение?',
        },
      },
    ],
    pronunciation: {
      hangul: '기분',
      romanization: 'gibun',
      ttsText: '기분',
    },
    media: {
      emoji: '🙂',
      imageUrl: 'https://cdn.korio.app/words/gibun.webp',
      imageAlt: {
        ko: '여러 기분을 나타내는 얼굴',
        uz: 'turli kayfiyatlarni bildiruvchi yuzlar',
        en: 'faces representing different moods',
        ru: 'лица, показывающие разное настроение',
      },
    },
    tags: ['emotion', 'mood', 'feeling', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "'기분이 좋다', '기분이 나쁘다'처럼 많이 사용해요.",
      uz: "'기분이 좋다', '기분이 나쁘다' kabi ishlatiladi.",
      en: 'Common expressions include 기분이 좋다 and 기분이 나쁘다.',
      ru: 'Частые выражения: 기분이 좋다 и 기분이 나쁘다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_worry_noun',
    senseKey: 'emotion-worry',
    korean: '걱정',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '앞으로 생길 일이나 문제를 생각하며 불안해하는 마음',
      uz: 'xavotir',
      en: 'worry, concern',
      ru: 'беспокойство',
    },
    examples: [
      {
        korean: '시험 때문에 걱정이 많아요.',
        translations: {
          ko: '시험 때문에 걱정을 많이 하고 있어요.',
          uz: 'Imtihon sababli ko‘p xavotirdaman.',
          en: "I'm very worried about the exam.",
          ru: 'Я очень беспокоюсь из-за экзамена.',
        },
      },
      {
        korean: '너무 걱정하지 마세요.',
        translations: {
          ko: '너무 많이 걱정하지 마세요.',
          uz: 'Juda ko‘p xavotir olmang.',
          en: "Don't worry too much.",
          ru: 'Не беспокойтесь слишком сильно.',
        },
      },
    ],
    pronunciation: {
      hangul: '걱정',
      romanization: 'geokjeong',
      ttsText: '걱정',
    },
    media: {
      emoji: '😟',
      imageUrl: 'https://cdn.korio.app/words/geokjeong.webp',
      imageAlt: {
        ko: '걱정하는 표정',
        uz: 'xavotirlangan yuz',
        en: 'a worried expression',
        ru: 'обеспокоенное выражение лица',
      },
    },
    tags: ['emotion', 'worry', 'feeling', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "동사처럼 말할 때는 '걱정하다'를 사용해요.",
      uz: "Fe’l shakli '걱정하다'.",
      en: 'The verb form is 걱정하다.',
      ru: 'Глагольная форма — 걱정하다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_break_up_part_verb',
    senseKey: 'relationship-break-up-part',
    korean: '헤어지다',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '함께 있던 사람과 떨어지거나 연인 관계를 끝내다',
      uz: 'ajrashmoq, xayrlashib ketmoq',
      en: 'to break up, to part',
      ru: 'расставаться',
    },
    examples: [
      {
        korean: '남자 친구와 헤어졌어요.',
        translations: {
          ko: '남자 친구와 연인 관계를 끝냈어요.',
          uz: 'Yigitim bilan ajrashdim.',
          en: 'I broke up with my boyfriend.',
          ru: 'Я рассталась со своим парнем.',
        },
      },
      {
        korean: '친구와 역에서 헤어졌어요.',
        translations: {
          ko: '친구와 역에서 서로 다른 길로 갔어요.',
          uz: 'Do‘stim bilan bekatda xayrlashdik.',
          en: 'I parted with my friend at the station.',
          ru: 'Мы с другом расстались на станции.',
        },
      },
    ],
    pronunciation: {
      hangul: '헤어지다',
      romanization: 'heeojida',
      ttsText: '헤어지다',
    },
    media: {
      emoji: '💔',
      imageUrl: 'https://cdn.korio.app/words/heeojida.webp',
      imageAlt: {
        ko: '서로 헤어지는 두 사람',
        uz: 'bir-biridan ayrilayotgan ikki kishi',
        en: 'two people parting',
        ru: 'два человека, которые расстаются',
      },
    },
    tags: ['verb', 'relationship', 'break-up', 'social', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: '연인과 헤어지는 의미뿐 아니라 만난 사람과 작별하고 떨어지는 의미도 있어요.',
      uz: 'Faqat sevgililar ajralishi emas, xayrlashib ketish ma’nosi ham bor.',
      en: 'It can mean either breaking up romantically or simply parting from someone.',
      ru: 'Может означать как разрыв отношений, так и обычное расставание после встречи.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_julia_name_noun',
    senseKey: 'person-name-julia',
    korean: '줄리아',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '사람 이름 줄리아',
      uz: 'Julia ismli kishi',
      en: 'the name Julia',
      ru: 'имя Джулия',
    },
    examples: [
      {
        korean: '줄리아는 제 친구예요.',
        translations: {
          ko: '줄리아라는 사람은 제 친구예요.',
          uz: 'Julia mening do‘stim.',
          en: 'Julia is my friend.',
          ru: 'Джулия — моя подруга.',
        },
      },
      {
        korean: '줄리아는 농구를 좋아해요.',
        translations: {
          ko: '줄리아는 농구하는 것을 좋아해요.',
          uz: 'Julia basketbolni yoqtiradi.',
          en: 'Julia likes basketball.',
          ru: 'Джулия любит баскетбол.',
        },
      },
    ],
    pronunciation: {
      hangul: '줄리아',
      romanization: 'jullia',
      ttsText: '줄리아',
    },
    media: {
      emoji: '👤',
      imageUrl: 'https://cdn.korio.app/words/jullia.webp',
      imageAlt: {
        ko: '줄리아라는 사람을 나타내는 인물',
        uz: 'Julia ismli odam',
        en: 'a person named Julia',
        ru: 'человек по имени Джулия',
      },
    },
    tags: ['person', 'name', 'dialogue', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: '교재 대화에서 사용하는 사람 이름이에요.',
      uz: 'Darslikdagi dialoglarda ishlatiladigan ism.',
      en: "A person's name used in lesson dialogues.",
      ru: 'Имя персонажа, используемое в учебных диалогах.',
    },
    isCore: true,
    isActive: true,
  },

  // ── 활동 · 음식 · 장소 ──

  {
    code: 'word_basketball_noun',
    senseKey: 'sport-basketball',
    korean: '농구',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '공을 상대편 바구니에 넣어 점수를 얻는 스포츠',
      uz: 'basketbol',
      en: 'basketball',
      ru: 'баскетбол',
    },
    examples: [
      {
        korean: '저는 농구를 좋아해요.',
        translations: {
          ko: '저는 농구 경기를 좋아해요.',
          uz: 'Men basketbolni yoqtiraman.',
          en: 'I like basketball.',
          ru: 'Я люблю баскетбол.',
        },
      },
      {
        korean: '친구와 농구를 해요.',
        translations: {
          ko: '친구와 함께 농구를 합니다.',
          uz: 'Do‘stim bilan basketbol o‘ynayman.',
          en: 'I play basketball with my friend.',
          ru: 'Я играю в баскетбол с другом.',
        },
      },
    ],
    pronunciation: {
      hangul: '농구',
      romanization: 'nonggu',
      ttsText: '농구',
    },
    media: {
      emoji: '🏀',
      imageUrl: 'https://cdn.korio.app/words/nonggu.webp',
      imageAlt: {
        ko: '농구공과 골대',
        uz: 'basketbol to‘pi va savati',
        en: 'a basketball and hoop',
        ru: 'баскетбольный мяч и кольцо',
      },
    },
    tags: ['sport', 'basketball', 'activity', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "활동으로는 '농구를 하다'라고 해요.",
      uz: "'농구를 하다' basketbol o‘ynamoq degani.",
      en: 'The activity expression is 농구를 하다.',
      ru: 'Для действия используется 농구를 하다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_swimming_noun',
    senseKey: 'sport-swimming',
    korean: '수영',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '물속에서 팔과 다리를 움직여 나아가는 운동',
      uz: 'suzish',
      en: 'swimming',
      ru: 'плавание',
    },
    examples: [
      {
        korean: '제 취미는 수영이에요.',
        translations: {
          ko: '제가 좋아하는 운동은 수영이에요.',
          uz: 'Mening hobbim suzish.',
          en: 'My hobby is swimming.',
          ru: 'Моё хобби — плавание.',
        },
      },
      {
        korean: '여름에는 수영을 자주 해요.',
        translations: {
          ko: '여름에는 자주 수영해요.',
          uz: 'Yozda tez-tez suzaman.',
          en: 'I often go swimming in summer.',
          ru: 'Летом я часто плаваю.',
        },
      },
    ],
    pronunciation: {
      hangul: '수영',
      romanization: 'suyeong',
      ttsText: '수영',
    },
    media: {
      emoji: '🏊',
      imageUrl: 'https://cdn.korio.app/words/suyeong.webp',
      imageAlt: {
        ko: '수영하는 사람',
        uz: 'suzayotgan odam',
        en: 'a person swimming',
        ru: 'плывущий человек',
      },
    },
    tags: ['sport', 'swimming', 'activity', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "동사형은 '수영하다'예요.",
      uz: "Fe’l shakli '수영하다'.",
      en: 'The verb form is 수영하다.',
      ru: 'Глагольная форма — 수영하다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_apple_noun',
    senseKey: 'fruit-apple',
    korean: '사과',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '둥글고 보통 빨간색이나 초록색을 띠는 과일',
      uz: 'olma',
      en: 'apple',
      ru: 'яблоко',
    },
    examples: [
      {
        korean: '사과를 하나 먹었어요.',
        translations: {
          ko: '사과 한 개를 먹었어요.',
          uz: 'Bitta olma yedim.',
          en: 'I ate an apple.',
          ru: 'Я съел одно яблоко.',
        },
      },
      {
        korean: '사과보다 배가 더 달아요.',
        translations: {
          ko: '사과와 비교하면 배가 더 달아요.',
          uz: 'Nok olmadan shirinroq.',
          en: 'Pears are sweeter than apples.',
          ru: 'Груша слаще яблока.',
        },
      },
    ],
    pronunciation: {
      hangul: '사과',
      romanization: 'sagwa',
      ttsText: '사과',
    },
    media: {
      emoji: '🍎',
      imageUrl: 'https://cdn.korio.app/words/sagwa-apple.webp',
      imageAlt: {
        ko: '빨간 사과',
        uz: 'qizil olma',
        en: 'a red apple',
        ru: 'красное яблоко',
      },
    },
    tags: ['food', 'fruit', 'apple', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "여기서는 '사과하다'의 사과(apology)가 아니라 과일 apple을 뜻해요.",
      uz: 'Bu yerda uzr emas, olma ma’nosida.',
      en: 'Here 사과 means the fruit apple, not an apology.',
      ru: 'Здесь 사과 означает яблоко, а не извинение.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_pear_noun',
    senseKey: 'fruit-pear',
    korean: '배',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '껍질이 노란빛 또는 갈색을 띠고 과즙이 많은 과일',
      uz: 'nok',
      en: 'pear',
      ru: 'груша',
    },
    examples: [
      {
        korean: '배가 아주 달아요.',
        translations: {
          ko: '배라는 과일이 아주 달아요.',
          uz: 'Nok juda shirin.',
          en: 'The pear is very sweet.',
          ru: 'Груша очень сладкая.',
        },
      },
      {
        korean: '사과와 배를 샀어요.',
        translations: {
          ko: '사과하고 배를 함께 샀어요.',
          uz: 'Olma va nok sotib oldim.',
          en: 'I bought apples and pears.',
          ru: 'Я купил яблоки и груши.',
        },
      },
    ],
    pronunciation: {
      hangul: '배',
      romanization: 'bae',
      ttsText: '배',
    },
    media: {
      emoji: '🍐',
      imageUrl: 'https://cdn.korio.app/words/bae-pear.webp',
      imageAlt: {
        ko: '잘 익은 배',
        uz: 'pishgan nok',
        en: 'a ripe pear',
        ru: 'спелая груша',
      },
    },
    tags: ['food', 'fruit', 'pear', 'homonym', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "'배'는 배(ship), 배(stomach) 등 다른 뜻도 있으므로 문맥으로 구별해요.",
      uz: "'배' kema yoki qorin ma’nosida ham kelishi mumkin.",
      en: '배 also has other meanings such as ship and stomach, so context matters.',
      ru: '배 также может означать корабль или живот, поэтому значение определяется контекстом.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_jirisan_noun',
    senseKey: 'place-korea-jirisan-mountain',
    korean: '지리산',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '대한민국 남부에 있는 큰 산',
      uz: 'Jirisan tog‘i',
      en: 'Jirisan Mountain',
      ru: 'гора Чирисан',
    },
    examples: [
      {
        korean: '지리산에 등산하러 가요.',
        translations: {
          ko: '지리산으로 등산하러 가요.',
          uz: 'Jirisan tog‘iga chiqishga boraman.',
          en: 'I go hiking on Jirisan.',
          ru: 'Я иду в поход на Чирисан.',
        },
      },
      {
        korean: '지리산은 높은 산이에요.',
        translations: {
          ko: '지리산은 높이가 높은 산이에요.',
          uz: 'Jirisan baland tog‘.',
          en: 'Jirisan is a high mountain.',
          ru: 'Чирисан — высокая гора.',
        },
      },
    ],
    pronunciation: {
      hangul: '지리산',
      romanization: 'jirisan',
      ttsText: '지리산',
    },
    media: {
      emoji: '⛰️',
      imageUrl: 'https://cdn.korio.app/words/jirisan.webp',
      imageAlt: {
        ko: '산봉우리가 이어진 지리산',
        uz: 'Jirisan tog‘i',
        en: 'Jirisan Mountain',
        ru: 'гора Чирисан',
      },
    },
    tags: ['place', 'mountain', 'korea', 'travel', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "이름 끝의 '산'은 mountain을 뜻해요.",
      uz: "Nom oxiridagi '산' tog‘ degani.",
      en: 'The final 산 means mountain.',
      ru: 'Последний элемент 산 означает «гора».',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_hallasan_noun',
    senseKey: 'place-jeju-hallasan-mountain',
    korean: '한라산',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '제주도 중앙에 있는 대한민국의 높은 산',
      uz: 'Hallasan tog‘i',
      en: 'Hallasan Mountain',
      ru: 'гора Халласан',
    },
    examples: [
      {
        korean: '제주도에서 한라산에 갔어요.',
        translations: {
          ko: '제주도 여행 중 한라산에 갔어요.',
          uz: 'Jejuda Hallasan tog‘iga bordim.',
          en: 'I went to Hallasan on Jeju Island.',
          ru: 'На Чеджу я ездил на гору Халласан.',
        },
      },
      {
        korean: '한라산은 지리산보다 높아요.',
        translations: {
          ko: '한라산의 높이가 지리산보다 높아요.',
          uz: 'Hallasan Jirisandan balandroq.',
          en: 'Hallasan is higher than Jirisan.',
          ru: 'Халласан выше Чирисана.',
        },
      },
    ],
    pronunciation: {
      hangul: '한라산',
      romanization: 'hallasan',
      ttsText: '한라산',
    },
    media: {
      emoji: '⛰️',
      imageUrl: 'https://cdn.korio.app/words/hallasan.webp',
      imageAlt: {
        ko: '제주도의 한라산',
        uz: 'Jejudagi Hallasan tog‘i',
        en: 'Hallasan Mountain on Jeju Island',
        ru: 'гора Халласан на Чеджу',
      },
    },
    tags: ['place', 'mountain', 'jeju', 'travel', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: '제주도를 대표하는 산 이름이에요.',
      uz: 'Jeju orolining mashhur tog‘i.',
      en: 'It is the representative mountain of Jeju Island.',
      ru: 'Это самая известная гора острова Чеджу.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_high_adjective',
    senseKey: 'height-high',
    korean: '높다',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: {
      ko: '아래에서 위까지의 거리가 크다',
      uz: 'baland bo‘lmoq',
      en: 'to be high',
      ru: 'быть высоким',
    },
    examples: [
      {
        korean: '한라산은 아주 높아요.',
        translations: {
          ko: '한라산의 높이가 아주 높아요.',
          uz: 'Hallasan juda baland.',
          en: 'Hallasan is very high.',
          ru: 'Халласан очень высокий.',
        },
      },
      {
        korean: '이 건물은 산보다 높아요.',
        translations: {
          ko: '이 건물의 높이가 산보다 높아요.',
          uz: 'Bu bino tog‘dan balandroq.',
          en: 'This building is higher than the mountain.',
          ru: 'Это здание выше горы.',
        },
      },
    ],
    pronunciation: {
      hangul: '높다',
      romanization: 'nopda',
      ttsText: '높다',
    },
    media: {
      emoji: '📏',
      imageUrl: 'https://cdn.korio.app/words/nopda.webp',
      imageAlt: {
        ko: '높이가 높은 산',
        uz: 'baland tog‘',
        en: 'a high mountain',
        ru: 'высокая гора',
      },
    },
    tags: ['adjective', 'height', 'comparison', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "반대말은 '낮다'예요.",
      uz: "Qarama-qarshisi '낮다'.",
      en: 'The opposite is 낮다.',
      ru: 'Антоним — 낮다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_comfortable_adjective',
    senseKey: 'comfort-comfortable',
    korean: '편하다',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: {
      ko: '몸이나 마음이 불편하지 않고 편안하다',
      uz: 'qulay bo‘lmoq',
      en: 'to be comfortable',
      ru: 'быть удобным',
    },
    examples: [
      {
        korean: '운동화가 구두보다 편해요.',
        translations: {
          ko: '운동화를 신는 것이 구두보다 편해요.',
          uz: 'Krossovka tuflidan qulayroq.',
          en: 'Sneakers are more comfortable than dress shoes.',
          ru: 'Кроссовки удобнее туфель.',
        },
      },
      {
        korean: '이 바지는 아주 편해요.',
        translations: {
          ko: '이 바지는 입었을 때 아주 편해요.',
          uz: 'Bu shim juda qulay.',
          en: 'These pants are very comfortable.',
          ru: 'Эти брюки очень удобные.',
        },
      },
    ],
    pronunciation: {
      hangul: '편하다',
      romanization: 'pyeonhada',
      ttsText: '편하다',
    },
    media: {
      emoji: '😌',
      imageUrl: 'https://cdn.korio.app/words/pyeonhada.webp',
      imageAlt: {
        ko: '편안한 옷을 입은 사람',
        uz: 'qulay kiyim kiygan odam',
        en: 'a person in comfortable clothes',
        ru: 'человек в удобной одежде',
      },
    },
    tags: ['adjective', 'comfort', 'clothing', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: '옷이나 신발의 착용감을 설명할 때 자주 사용해요.',
      uz: 'Kiyim va oyoq kiyim qulayligini tasvirlashda ishlatiladi.',
      en: 'Frequently used for the comfort of clothes and shoes.',
      ru: 'Часто используется для описания удобства одежды и обуви.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_winter_noun',
    senseKey: 'season-winter',
    korean: '겨울',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '한 해 중 날씨가 가장 추운 계절',
      uz: 'qish',
      en: 'winter',
      ru: 'зима',
    },
    examples: [
      {
        korean: '겨울에는 스웨터를 입어요.',
        translations: {
          ko: '겨울에는 따뜻한 스웨터를 입어요.',
          uz: 'Qishda sviter kiyaman.',
          en: 'I wear sweaters in winter.',
          ru: 'Зимой я ношу свитер.',
        },
      },
      {
        korean: '겨울에는 날씨가 추워요.',
        translations: {
          ko: '겨울은 날씨가 매우 추워요.',
          uz: 'Qishda havo sovuq.',
          en: 'The weather is cold in winter.',
          ru: 'Зимой погода холодная.',
        },
      },
    ],
    pronunciation: {
      hangul: '겨울',
      romanization: 'gyeoul',
      ttsText: '겨울',
    },
    media: {
      emoji: '❄️',
      imageUrl: 'https://cdn.korio.app/words/gyeoul.webp',
      imageAlt: {
        ko: '눈이 내리는 겨울 풍경',
        uz: 'qorli qish manzarasi',
        en: 'a snowy winter scene',
        ru: 'зимний снежный пейзаж',
      },
    },
    tags: ['season', 'winter', 'weather', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: '봄, 여름, 가을과 함께 네 계절 중 하나예요.',
      uz: 'Bahor, yoz va kuz bilan birga to‘rt fasldan biri.',
      en: 'One of the four seasons.',
      ru: 'Один из четырёх сезонов.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_summer_noun',
    senseKey: 'season-summer',
    korean: '여름',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '한 해 중 날씨가 가장 더운 계절',
      uz: 'yoz',
      en: 'summer',
      ru: 'лето',
    },
    examples: [
      {
        korean: '여름에는 수영을 자주 해요.',
        translations: {
          ko: '여름에는 수영을 많이 해요.',
          uz: 'Yozda tez-tez suzaman.',
          en: 'I often swim in summer.',
          ru: 'Летом я часто плаваю.',
        },
      },
      {
        korean: '여름에는 밝은 옷을 입어요.',
        translations: {
          ko: '여름에는 밝은 색의 옷을 입어요.',
          uz: 'Yozda yorqin kiyim kiyaman.',
          en: 'I wear bright clothes in summer.',
          ru: 'Летом я ношу светлую одежду.',
        },
      },
    ],
    pronunciation: {
      hangul: '여름',
      romanization: 'yeoreum',
      ttsText: '여름',
    },
    media: {
      emoji: '☀️',
      imageUrl: 'https://cdn.korio.app/words/yeoreum.webp',
      imageAlt: {
        ko: '햇빛이 강한 여름 풍경',
        uz: 'quyoshli yoz manzarasi',
        en: 'a sunny summer scene',
        ru: 'солнечный летний пейзаж',
      },
    },
    tags: ['season', 'summer', 'weather', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: '봄, 가을, 겨울과 함께 네 계절 중 하나예요.',
      uz: 'Bahor, kuz va qish bilan birga to‘rt fasldan biri.',
      en: 'One of the four seasons.',
      ru: 'Один из четырёх сезонов.',
    },
    isCore: true,
    isActive: true,
  },

  // ── 꿈 · 목표 · 비교 ──

  {
    code: 'word_world_travel_noun',
    senseKey: 'travel-world-travel',
    korean: '세계 여행',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '세계 여러 나라와 지역을 돌아다니는 여행',
      uz: 'dunyo bo‘ylab sayohat',
      en: 'world travel, traveling around the world',
      ru: 'путешествие по миру',
    },
    examples: [
      {
        korean: '제 꿈은 세계 여행이에요.',
        translations: {
          ko: '저는 세계 여러 나라를 여행하는 것이 꿈이에요.',
          uz: 'Mening orzuim dunyo bo‘ylab sayohat qilish.',
          en: 'My dream is to travel around the world.',
          ru: 'Моя мечта — путешествовать по миру.',
        },
      },
      {
        korean: '돈을 많이 벌어서 세계 여행을 하고 싶어요.',
        translations: {
          ko: '돈을 많이 번 뒤 세계 여행을 하고 싶어요.',
          uz: 'Ko‘p pul topib dunyo bo‘ylab sayohat qilmoqchiman.',
          en: 'I want to earn a lot of money and travel around the world.',
          ru: 'Я хочу много заработать и путешествовать по миру.',
        },
      },
    ],
    pronunciation: {
      hangul: '세계 여행',
      romanization: 'segye yeohaeng',
      ttsText: '세계 여행',
    },
    media: {
      emoji: '🌍',
      imageUrl: 'https://cdn.korio.app/words/segye-yeohaeng.webp',
      imageAlt: {
        ko: '여러 나라를 여행하는 세계 여행',
        uz: 'dunyo bo‘ylab sayohat',
        en: 'travel around the world',
        ru: 'путешествие по миру',
      },
    },
    tags: ['travel', 'world', 'dream', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "'세계'와 '여행'이 합쳐진 표현이에요.",
      uz: "'세계' va '여행' birikmasi.",
      en: 'A compound expression combining 세계 and 여행.',
      ru: 'Сочетание слов 세계 и 여행.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_first_place_noun',
    senseKey: 'ranking-first-place',
    korean: '1등',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '경기나 시험 등의 순위에서 가장 높은 자리',
      uz: 'birinchi o‘rin',
      en: 'first place',
      ru: 'первое место',
    },
    examples: [
      {
        korean: '농구 경기에서 1등을 했어요.',
        translations: {
          ko: '농구 경기에서 가장 높은 순위를 차지했어요.',
          uz: 'Basketbol musobaqasida birinchi o‘rinni oldik.',
          en: 'We took first place in the basketball competition.',
          ru: 'Мы заняли первое место в баскетбольном соревновании.',
        },
      },
      {
        korean: '시험에서 1등을 하고 싶어요.',
        translations: {
          ko: '시험 성적이 가장 좋고 싶어요.',
          uz: 'Imtihonda birinchi o‘rinni olishni xohlayman.',
          en: 'I want to come first on the exam.',
          ru: 'Я хочу занять первое место на экзамене.',
        },
      },
    ],
    pronunciation: {
      hangul: '일등',
      romanization: 'ildeung',
      ttsText: '1등',
    },
    media: {
      emoji: '🥇',
      imageUrl: 'https://cdn.korio.app/words/ildeung.webp',
      imageAlt: {
        ko: '1등 금메달',
        uz: 'birinchi o‘rin medali',
        en: 'a first-place gold medal',
        ru: 'золотая медаль за первое место',
      },
    },
    tags: ['ranking', 'competition', 'exam', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "순위를 말할 때 '1등, 2등, 3등'처럼 사용해요.",
      uz: "O‘rinlar '1등, 2등, 3등' shaklida aytiladi.",
      en: 'Rankings can be expressed as 1등, 2등, 3등, and so on.',
      ru: 'Места обозначаются как 1등, 2등, 3등 и т. д.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_earn_verb',
    senseKey: 'money-earn',
    korean: '벌다',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '일을 해서 돈이나 재산을 얻다',
      uz: 'pul topmoq',
      en: 'to earn',
      ru: 'зарабатывать',
    },
    examples: [
      {
        korean: '돈을 많이 벌고 싶어요.',
        translations: {
          ko: '일을 해서 돈을 많이 얻고 싶어요.',
          uz: 'Ko‘p pul topmoqchiman.',
          en: 'I want to earn a lot of money.',
          ru: 'Я хочу много зарабатывать.',
        },
      },
      {
        korean: '아르바이트를 해서 돈을 벌어요.',
        translations: {
          ko: '아르바이트를 하면서 돈을 벌어요.',
          uz: 'Yarim stavkali ishlarda ishlab pul topaman.',
          en: 'I earn money from a part-time job.',
          ru: 'Я зарабатываю деньги на подработке.',
        },
      },
    ],
    pronunciation: {
      hangul: '벌다',
      romanization: 'beolda',
      ttsText: '벌다',
    },
    media: {
      emoji: '💰',
      imageUrl: 'https://cdn.korio.app/words/beolda.webp',
      imageAlt: {
        ko: '일해서 번 돈',
        uz: 'ishlab topilgan pul',
        en: 'money earned from work',
        ru: 'заработанные деньги',
      },
    },
    tags: ['verb', 'money', 'work', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "'돈을 벌다'라는 표현으로 매우 자주 사용해요.",
      uz: "'돈을 벌다' — pul topmoq.",
      en: "돈을 벌다 is a very common expression meaning 'to earn money.'",
      ru: '돈을 벌다 — очень частое выражение со значением «зарабатывать деньги».',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_exam_noun',
    senseKey: 'education-exam',
    korean: '시험',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '지식이나 실력 등을 평가하기 위해 문제를 풀게 하는 일',
      uz: 'imtihon',
      en: 'exam, test',
      ru: 'экзамен',
    },
    examples: [
      {
        korean: '내일 시험이 있어요.',
        translations: {
          ko: '내일 시험을 봐야 해요.',
          uz: 'Ertaga imtihon bor.',
          en: 'I have an exam tomorrow.',
          ru: 'Завтра у меня экзамен.',
        },
      },
      {
        korean: '이번 시험은 쉬웠어요.',
        translations: {
          ko: '이번 시험 문제는 어렵지 않았어요.',
          uz: 'Bu imtihon oson edi.',
          en: 'This exam was easy.',
          ru: 'Этот экзамен был лёгким.',
        },
      },
    ],
    pronunciation: {
      hangul: '시험',
      romanization: 'siheom',
      ttsText: '시험',
    },
    media: {
      emoji: '📝',
      imageUrl: 'https://cdn.korio.app/words/siheom.webp',
      imageAlt: {
        ko: '시험 문제와 답안지',
        uz: 'imtihon savollari va javob varag‘i',
        en: 'an exam paper',
        ru: 'экзаменационная работа',
      },
    },
    tags: ['education', 'exam', 'study', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "'시험을 보다'는 시험에 응시한다는 뜻이에요.",
      uz: "'시험을 보다' imtihon topshirmoq degani.",
      en: '시험을 보다 means to take an exam.',
      ru: '시험을 보다 означает «сдавать экзамен».',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_easy_adjective',
    senseKey: 'difficulty-easy',
    korean: '쉽다',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: {
      ko: '하는 데 힘이나 노력이 많이 필요하지 않다',
      uz: 'oson bo‘lmoq',
      en: 'to be easy',
      ru: 'быть лёгким',
    },
    examples: [
      {
        korean: '이번 시험은 쉬워요.',
        translations: {
          ko: '이번 시험은 어렵지 않아요.',
          uz: 'Bu imtihon oson.',
          en: 'This exam is easy.',
          ru: 'Этот экзамен лёгкий.',
        },
      },
      {
        korean: '이 문제는 생각보다 쉬워요.',
        translations: {
          ko: '이 문제는 생각한 것보다 어렵지 않아요.',
          uz: 'Bu savol o‘ylaganimdan osonroq.',
          en: 'This problem is easier than I expected.',
          ru: 'Эта задача легче, чем я ожидал.',
        },
      },
    ],
    pronunciation: {
      hangul: '쉽다',
      romanization: 'swipda',
      ttsText: '쉽다',
    },
    media: {
      emoji: '🙂',
      imageUrl: 'https://cdn.korio.app/words/swipda.webp',
      imageAlt: {
        ko: '쉽게 해결한 문제',
        uz: 'oson yechilgan savol',
        en: 'an easy problem',
        ru: 'лёгкая задача',
      },
    },
    tags: ['adjective', 'difficulty', 'education', 'irregular-b', 'topik-1'],
    difficulty: 2,
    usageNote: {
      ko: "ㅂ 불규칙으로 '쉽다 → 쉬워요'가 돼요.",
      uz: "'쉽다 → 쉬워요' shaklida tuslanadi.",
      en: 'It follows the ㅂ irregular pattern: 쉽다 → 쉬워요.',
      ru: 'Нерегулярное ㅂ-спряжение: 쉽다 → 쉬워요.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_dance_noun',
    senseKey: 'activity-dance',
    korean: '춤',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '음악이나 리듬에 맞추어 몸을 움직이는 행동',
      uz: 'raqs',
      en: 'dance',
      ru: 'танец',
    },
    examples: [
      {
        korean: '저는 춤을 좋아해요.',
        translations: {
          ko: '저는 춤추는 것을 좋아해요.',
          uz: 'Men raqsni yoqtiraman.',
          en: 'I like dancing.',
          ru: 'Я люблю танцы.',
        },
      },
      {
        korean: '그 가수는 춤을 잘 춰요.',
        translations: {
          ko: '그 가수는 춤 실력이 좋아요.',
          uz: 'U qo‘shiqchi yaxshi raqsga tushadi.',
          en: 'That singer dances well.',
          ru: 'Этот певец хорошо танцует.',
        },
      },
    ],
    pronunciation: {
      hangul: '춤',
      romanization: 'chum',
      ttsText: '춤',
    },
    media: {
      emoji: '💃',
      imageUrl: 'https://cdn.korio.app/words/chum.webp',
      imageAlt: {
        ko: '춤을 추는 사람',
        uz: 'raqsga tushayotgan odam',
        en: 'a person dancing',
        ru: 'танцующий человек',
      },
    },
    tags: ['dance', 'activity', 'music', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "동작 표현은 '춤을 추다' 또는 '춤추다'예요.",
      uz: "'춤을 추다' yoki '춤추다' raqsga tushmoq degani.",
      en: 'The action is expressed as 춤을 추다 or 춤추다.',
      ru: 'Действие выражается как 춤을 추다 или 춤추다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_singer_noun',
    senseKey: 'occupation-singer',
    korean: '가수',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '노래를 부르는 것을 직업으로 하는 사람',
      uz: 'qo‘shiqchi',
      en: 'singer',
      ru: 'певец, певица',
    },
    examples: [
      {
        korean: '제 꿈은 가수예요.',
        translations: {
          ko: '저는 가수가 되고 싶어요.',
          uz: 'Mening orzuim qo‘shiqchi bo‘lish.',
          en: 'My dream is to become a singer.',
          ru: 'Моя мечта — стать певцом.',
        },
      },
      {
        korean: '그 가수는 아주 유명해요.',
        translations: {
          ko: '그 가수를 아는 사람이 아주 많아요.',
          uz: 'U qo‘shiqchi juda mashhur.',
          en: 'That singer is very famous.',
          ru: 'Этот певец очень известный.',
        },
      },
    ],
    pronunciation: {
      hangul: '가수',
      romanization: 'gasu',
      ttsText: '가수',
    },
    media: {
      emoji: '🎤',
      imageUrl: 'https://cdn.korio.app/words/gasu.webp',
      imageAlt: {
        ko: '마이크로 노래하는 가수',
        uz: 'mikrofonda qo‘shiq aytayotgan xonanda',
        en: 'a singer with a microphone',
        ru: 'певец с микрофоном',
      },
    },
    tags: ['occupation', 'singer', 'music', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: '남녀 모두에게 사용할 수 있는 직업 이름이에요.',
      uz: 'Erkak va ayol qo‘shiqchilarga bir xil ishlatiladi.',
      en: 'The word can refer to singers of any gender.',
      ru: 'Слово используется для певцов любого пола.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_famous_adjective',
    senseKey: 'reputation-famous',
    korean: '유명하다',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: {
      ko: '많은 사람에게 이름이나 특징이 널리 알려져 있다',
      uz: 'mashhur bo‘lmoq',
      en: 'to be famous',
      ru: 'быть известным',
    },
    examples: [
      {
        korean: '그 가수는 세계적으로 유명해요.',
        translations: {
          ko: '그 가수는 세계 여러 나라에 잘 알려져 있어요.',
          uz: 'U qo‘shiqchi dunyoda mashhur.',
          en: 'That singer is famous worldwide.',
          ru: 'Этот певец известен во всём мире.',
        },
      },
      {
        korean: '한라산은 제주도에서 유명해요.',
        translations: {
          ko: '한라산은 제주도를 대표하는 유명한 산이에요.',
          uz: 'Hallasan Jejuda mashhur.',
          en: 'Hallasan is famous on Jeju Island.',
          ru: 'Халласан известен на острове Чеджу.',
        },
      },
    ],
    pronunciation: {
      hangul: '유명하다',
      romanization: 'yumyeonghada',
      ttsText: '유명하다',
    },
    media: {
      emoji: '⭐',
      imageUrl: 'https://cdn.korio.app/words/yumyeonghada.webp',
      imageAlt: {
        ko: '유명함을 나타내는 별',
        uz: 'mashhurlikni bildiruvchi yulduz',
        en: 'a star representing fame',
        ru: 'звезда, символизирующая известность',
      },
    },
    tags: ['adjective', 'reputation', 'famous', 'topik-1'],
    difficulty: 1,
    usageNote: {
      ko: "'유명한 가수', '유명한 장소'처럼 명사를 꾸밀 수 있어요.",
      uz: "'유명한 가수', '유명한 장소' kabi ishlatiladi.",
      en: 'The attributive form 유명한 commonly modifies nouns.',
      ru: 'Форма 유명한 часто используется перед существительным.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_near_adjective',
    senseKey: 'distance-near',
    korean: '가깝다',
    partOfSpeech: WordPartOfSpeech.ADJECTIVE,
    meaning: {
      ko: '두 장소나 사람 사이의 거리가 짧다',
      uz: 'yaqin bo‘lmoq',
      en: 'to be near, close',
      ru: 'быть близким, находиться близко',
    },
    examples: [
      {
        korean: '학교가 집에서 가까워요.',
        translations: {
          ko: '집과 학교 사이의 거리가 짧아요.',
          uz: 'Maktab uyimga yaqin.',
          en: 'The school is close to my house.',
          ru: 'Школа находится близко к моему дому.',
        },
      },
      {
        korean: '지하철역이 여기에서 가까워요.',
        translations: {
          ko: '지하철역이 여기에서 멀지 않아요.',
          uz: 'Metro bekati bu yerdan yaqin.',
          en: 'The subway station is close to here.',
          ru: 'Станция метро находится недалеко отсюда.',
        },
      },
    ],
    pronunciation: {
      hangul: '가깝다',
      romanization: 'gakkapda',
      ttsText: '가깝다',
    },
    media: {
      emoji: '📍',
      imageUrl: 'https://cdn.korio.app/words/gakkapda.webp',
      imageAlt: {
        ko: '서로 가까운 두 위치',
        uz: 'bir-biriga yaqin ikki joy',
        en: 'two nearby locations',
        ru: 'два близко расположенных места',
      },
    },
    tags: ['adjective', 'distance', 'location', 'irregular-b', 'topik-1'],
    difficulty: 2,
    usageNote: {
      ko: "ㅂ 불규칙으로 '가깝다 → 가까워요'가 돼요. 반대말은 '멀다'예요.",
      uz: "'가깝다 → 가까워요'. Qarama-qarshisi '멀다'.",
      en: 'It follows the ㅂ irregular pattern: 가깝다 → 가까워요. The opposite is 멀다.',
      ru: 'Нерегулярное ㅂ-спряжение: 가깝다 → 가까워요. Антоним — 멀다.',
    },
    isCore: true,
    isActive: true,
  },

  {
    code: 'word_hope_wish_verb',
    senseKey: 'desire-hope-wish',
    korean: '바라다',
    partOfSpeech: WordPartOfSpeech.VERB,
    meaning: {
      ko: '어떤 일이 이루어지기를 원하거나 기대하다',
      uz: 'istamoq, umid qilmoq',
      en: 'to hope, wish',
      ru: 'желать, надеяться',
    },
    examples: [
      {
        korean: '시험에 합격하기를 바라요.',
        translations: {
          ko: '시험에 합격했으면 좋겠다고 생각해요.',
          uz: 'Imtihondan o‘tishingizni tilayman.',
          en: 'I hope you pass the exam.',
          ru: 'Надеюсь, что вы сдадите экзамен.',
        },
      },
      {
        korean: '모든 일이 잘되기를 바랍니다.',
        translations: {
          ko: '모든 일이 잘되었으면 좋겠습니다.',
          uz: 'Hamma ish yaxshi bo‘lishini tilayman.',
          en: 'I hope everything goes well.',
          ru: 'Желаю, чтобы всё прошло хорошо.',
        },
      },
    ],
    pronunciation: {
      hangul: '바라다',
      romanization: 'barada',
      ttsText: '바라다',
    },
    media: {
      emoji: '🙏',
      imageUrl: 'https://cdn.korio.app/words/barada.webp',
      imageAlt: {
        ko: '좋은 결과를 바라며 소원하는 모습',
        uz: 'yaxshi natijani tilayotgan odam',
        en: 'a person hoping for a good result',
        ru: 'человек, надеющийся на хороший результат',
      },
    },
    tags: ['verb', 'hope', 'wish', 'desire', 'topik-1'],
    difficulty: 2,
    usageNote: {
      ko: "'V-기를 바라다' 형태가 자주 쓰여요. 격식 있는 표현에서는 '바랍니다'도 많이 사용해요.",
      uz: "'V-기를 바라다' shakli ko‘p ishlatiladi. Rasmiy nutqda '바랍니다' keng tarqalgan.",
      en: 'V-기를 바라다 is a common pattern. 바랍니다 is frequent in polite and formal language.',
      ru: 'Часто используется конструкция V-기를 바라다. В вежливой речи распространено 바랍니다.',
    },
    isCore: true,
    isActive: true,
  },
] satisfies readonly WordSeedEntry[];

const I = {
  match: {
    ko: '알맞은 것끼리 연결하세요.',
    uz: 'Mos keladiganlarini bog‘lang.',
    en: 'Match the correct pairs.',
    ru: 'Соедините подходящие пары.',
  },
  dialog: {
    ko: '대화에 알맞은 답을 고르세요.',
    uz: 'Dialogga mos javobni tanlang.',
    en: 'Choose the correct response.',
    ru: 'Выберите подходящий ответ.',
  },
  fill: {
    ko: '빈칸에 알맞은 말을 고르세요.',
    uz: 'Bo‘sh joyga mos so‘zni tanlang.',
    en: 'Choose the correct expression for the blank.',
    ru: 'Выберите подходящее выражение для пропуска.',
  },
  speak: {
    ko: '문장을 소리 내어 말하세요.',
    uz: 'Gapni ovoz chiqarib ayting.',
    en: 'Say the sentence aloud.',
    ru: 'Произнесите предложение вслух.',
  },
  listen: {
    ko: '잘 듣고 알맞은 답을 고르세요.',
    uz: 'Diqqat bilan tinglab, to‘g‘ri javobni tanlang.',
    en: 'Listen carefully and choose the correct answer.',
    ru: 'Внимательно послушайте и выберите правильный ответ.',
  },
  listenType: {
    ko: '잘 듣고 들은 문장을 입력하세요.',
    uz: 'Tinglab, eshitgan gapingizni yozing.',
    en: 'Listen and type the sentence you hear.',
    ru: 'Послушайте и введите услышанное предложение.',
  },
  listenFill: {
    ko: '잘 듣고 빈칸을 채우세요.',
    uz: 'Tinglab, bo‘sh joylarni to‘ldiring.',
    en: 'Listen and fill in the blanks.',
    ru: 'Послушайте и заполните пропуски.',
  },
  arrange: {
    ko: '단어를 알맞은 순서로 배열하세요.',
    uz: 'So‘zlarni to‘g‘ri tartibda joylashtiring.',
    en: 'Put the words in the correct order.',
    ru: 'Расположите слова в правильном порядке.',
  },
  reply: {
    ko: '알맞은 대답을 만드세요.',
    uz: 'Mos javobni tuzing.',
    en: 'Build the correct reply.',
    ru: 'Составьте подходящий ответ.',
  },
  type: {
    ko: '빈칸에 들어갈 말을 입력하세요.',
    uz: 'Bo‘sh joyga mos ifodani yozing.',
    en: 'Type the expression for the blank.',
    ru: 'Введите выражение для пропуска.',
  },
  audioMatch: {
    ko: '소리를 듣고 알맞은 단어와 연결하세요.',
    uz: 'Tinglab, mos so‘z bilan bog‘lang.',
    en: 'Listen and match each word.',
    ru: 'Послушайте и сопоставьте слова.',
  },
  dialogOrder: {
    ko: '대화를 자연스러운 순서로 배열하세요.',
    uz: 'Dialogni tabiiy tartibda joylashtiring.',
    en: 'Put the dialogue in the correct order.',
    ru: 'Расположите реплики в естественном порядке.',
  },
  cloze: {
    ko: '글을 읽고 빈칸을 채우세요.',
    uz: 'Matnni o‘qib, bo‘sh joylarni to‘ldiring.',
    en: 'Read the passage and fill in the blanks.',
    ru: 'Прочитайте текст и заполните пропуски.',
  },
};

export const S3_UNIT4_QUESTIONS = withTypedAnswerGrading({
  // ══════════════════════════════════════════════════════════
  // Unit 4 · Node 1 · 뭘 입었어요?
  // 교재 p.74~75 의복 전체
  //
  // p.74 연습 1
  //
  // 1)
  // 안경을 꼈어요.
  // 양복을 입었어요.
  // 넥타이를 했어요.
  //
  // 2)
  // 스웨터를 입었어요.
  // 바지를 입었어요.
  // 운동화를 신었어요.
  //
  // 3)
  // 블라우스를 입었어요.
  // 치마를 입었어요.
  // 구두를 신었어요.
  //
  // 4)
  // 모자를 썼어요.
  // 목도리를 했어요.
  // 장갑을 꼈어요.
  //
  // p.75 연습 2
  // 입다 / 쓰다 / 끼다 / 하다 / 신다
  //
  // 1) 결혼식에 가는데 어떤 옷을 입어야 해요?
  //    → 양복을 입으세요.
  //
  // 2) 이 구두 좀 보여 주세요.
  //    → 네, 한번 신어 보세요.
  //
  // 3) 저기 안경을 낀 사람이 윌슨 씨예요?
  //    → 네, 맞아요.
  //
  // 4) 오늘 날씨 어때요?
  //    → 많이 추워요. 장갑을 꼭 끼세요.
  //
  // 5) 예쁜 스카프가 많네요.
  //    → 네, 저는 스카프 하는 것을 좋아해요.
  //
  // p.75 연습 3 단어 상자
  // 비싸다 / 싸다 / 길다 / 짧다 / 밝다 / 어둡다
  // 맞다 / 크다 / 작다 / 어울리다 / 마음에 들다
  //
  // 그림 기반 자유 대화이므로 고정 교재 답 없음.
  // 아래 관련 응답은 앱용 적응 예시임.
  //
  // Grammar 전용 문제 타입 사용 금지.
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 옷 이름을 알아요
  // p.74 연습 1 전체
  // ──────────────────────────────────────────────────────────

  s3u4_001_word_matching: {
    type: 'word_matching',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    instruction: I.match,
    answer: '',
    pairs: [
      { korean: '안경', native: 'Ko‘zoynak' },
      { korean: '양복', native: 'Kostyum' },
      { korean: '넥타이', native: 'Galstuk' },
      { korean: '스웨터', native: 'Sviter' },
      { korean: '바지', native: 'Shim' },
    ],
    answerTranslation: {
      ko: '안경, 양복, 넥타이, 스웨터, 바지',
      uz: 'Ko‘zoynak, kostyum, galstuk, sviter, shim',
      en: 'Glasses, suit, necktie, sweater, pants',
      ru: 'Очки, костюм, галстук, свитер, брюки',
    },
    difficulty: 2,
    tags: ['의복', '교재74'],
    hint: {
      ko: '교재 74쪽에 나온 옷과 액세서리예요.',
      uz: 'Bular 74-betdagi kiyim va aksessuarlar.',
      en: 'These clothing items appear on page 74.',
      ru: 'Эти предметы одежды есть на странице 74.',
    },
    xpReward: 10,
    isActive: true,
  },

  s3u4_002_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '안경',
    options: ['안경', '장갑', '양복', '구두'],
    answer: '안경',
    answerTranslation: {
      ko: '안경',
      uz: 'ko‘zoynak',
      en: 'glasses',
      ru: 'очки',
    },
    difficulty: 2,
    tags: ['안경', '듣기'],
    hint: {
      ko: '눈에 쓰는 것이 아니라 눈앞에 끼는 물건이에요.',
      uz: 'Bu ko‘zga taqiladigan buyum.',
      en: 'It is worn in front of the eyes.',
      ru: 'Это предмет, который носят перед глазами.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_003_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '안경을 ___.',
    blankAnswers: ['꼈어요'],
    options: ['꼈어요', '입었어요', '신었어요', '썼어요', '했어요'],
    answerTranslation: {
      ko: '안경을 꼈어요.',
      uz: 'Ko‘zoynak taqdim.',
      en: 'I put on glasses.',
      ru: 'Я надел очки.',
    },
    difficulty: 3,
    tags: ['안경', '끼다', '교재74'],
    hint: {
      ko: '교재 보기의 첫 문장이에요.',
      uz: 'Bu darslikdagi birinchi namuna.',
      en: 'This is the first clothing sentence on page 74.',
      ru: 'Это первое предложение на странице 74.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_004_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '양복을 입었어요.',
    answer: '양복을 입었어요.',
    acceptedAnswers: ['양복을 입었어요'],
    answerTranslation: {
      ko: '양복을 입었어요.',
      uz: 'Kostyum kiydim.',
      en: 'I wore a suit.',
      ru: 'Я надел костюм.',
    },
    difficulty: 3,
    tags: ['양복', '입다', '말하기'],
    hint: {
      ko: '양복에는 “입다”를 사용해요.',
      uz: '양복 bilan “입다” ishlatiladi.',
      en: 'Use 입다 with a suit.',
      ru: 'С 양복 используется 입다.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_005_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['넥타이를', '했어요', '입었어요', '안경을', '신었어요'],
    answer: '넥타이를 했어요',
    answerTranslation: {
      ko: '넥타이를 했어요.',
      uz: 'Galstuk taqdim.',
      en: 'I wore a necktie.',
      ru: 'Я надел галстук.',
    },
    difficulty: 3,
    tags: ['넥타이', '하다', '교재74'],
    hint: {
      ko: '넥타이는 교재에서 “하다”와 사용해요.',
      uz: 'Darslikda 넥타이 “하다” bilan ishlatiladi.',
      en: 'The textbook uses 하다 with 넥타이.',
      ru: 'В учебнике 넥타이 используется с 하다.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_006_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '스웨터를 입었어요.',
    options: [
      '스웨터를 입었어요.',
      '스웨터를 신었어요.',
      '스웨터를 꼈어요.',
      '스웨터를 썼어요.',
    ],
    answer: '스웨터를 입었어요.',
    answerTranslation: {
      ko: '스웨터를 입었어요.',
      uz: 'Sviter kiydim.',
      en: 'I wore a sweater.',
      ru: 'Я надел свитер.',
    },
    difficulty: 3,
    tags: ['스웨터', '입다', '듣기'],
    hint: {
      ko: '몸에 입는 옷이에요.',
      uz: 'Bu tanaga kiyiladigan kiyim.',
      en: 'A sweater is clothing worn on the body.',
      ru: 'Свитер надевают на тело.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_007_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '___를 입었어요.',
    blankAnswers: ['바지'],
    options: ['바지', '운동화', '안경', '모자', '장갑'],
    answerTranslation: {
      ko: '바지를 입었어요.',
      uz: 'Shim kiydim.',
      en: 'I wore pants.',
      ru: 'Я надел брюки.',
    },
    difficulty: 3,
    tags: ['바지', '입다'],
    hint: {
      ko: '교재 74쪽 2번 사람의 하의예요.',
      uz: '74-bet 2-rasmdagi pastki kiyim.',
      en: 'It is the pants shown in picture 2.',
      ru: 'Это брюки на рисунке 2.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_008_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '운동화를 신었어요.',
    answer: '운동화를 신었어요.',
    acceptedAnswers: ['운동화를 신었어요'],
    answerTranslation: {
      ko: '운동화를 신었어요.',
      uz: 'Krossovka kiydim.',
      en: 'I put on sneakers.',
      ru: 'Я надел кроссовки.',
    },
    difficulty: 3,
    tags: ['운동화', '신다', '말하기'],
    hint: {
      ko: '신발에는 “신다”를 사용해요.',
      uz: 'Oyoq kiyim bilan “신다”.',
      en: 'Use 신다 with footwear.',
      ru: 'С обувью используется 신다.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_009_audio_match: {
    type: 'audio_match',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.audioMatch,
    answer: '',
    pairs: [
      { korean: '블라우스', native: 'Bluzka' },
      { korean: '치마', native: 'Yubka' },
      { korean: '구두', native: 'Tufli' },
      { korean: '모자', native: 'Bosh kiyim' },
      { korean: '장갑', native: 'Qo‘lqop' },
    ],
    answerTranslation: {
      ko: '블라우스, 치마, 구두, 모자, 장갑',
      uz: 'Bluzka, yubka, tufli, bosh kiyim, qo‘lqop',
      en: 'Blouse, skirt, dress shoes, hat, gloves',
      ru: 'Блузка, юбка, туфли, шапка, перчатки',
    },
    difficulty: 3,
    tags: ['의복', '듣기'],
    hint: {
      ko: '교재의 3번과 4번 그림에 나오는 물건이에요.',
      uz: 'Bular 3 va 4-rasmlardagi buyumlar.',
      en: 'These appear in pictures 3 and 4.',
      ru: 'Эти предметы изображены на рисунках 3 и 4.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_010_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '뭘 입었어요?',
      },
    ],
    options: [
      '블라우스를 입었어요.',
      '구두를 입었어요.',
      '장갑을 신었어요.',
      '모자를 입었어요.',
    ],
    answer: '블라우스를 입었어요.',
    acceptedAnswers: ['블라우스를 입었어요'],
    answerTranslation: {
      ko: '블라우스를 입었어요.',
      uz: 'Bluzka kiydim.',
      en: 'I wore a blouse.',
      ru: 'Я надела блузку.',
    },
    difficulty: 3,
    tags: ['블라우스', '입다', '대화'],
    hint: {
      ko: '블라우스는 몸에 입는 옷이에요.',
      uz: 'Bluzka tanaga kiyiladi.',
      en: 'A blouse uses 입다.',
      ru: 'С блузкой используется 입다.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_011_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '치마를 ___, 구두를 ___.',
    blankAnswers: ['입었어요', '신었어요'],
    options: ['입었어요', '신었어요', '썼어요', '꼈어요', '했어요'],
    answerTranslation: {
      ko: '치마를 입었어요. 구두를 신었어요.',
      uz: 'Yubka kiydim. Tufli kiydim.',
      en: 'I wore a skirt and put on dress shoes.',
      ru: 'Я надела юбку и туфли.',
    },
    difficulty: 4,
    tags: ['치마', '구두', '교재74'],
    hint: {
      ko: '옷은 입고 신발은 신어요.',
      uz: 'Kiyim — 입다, oyoq kiyim — 신다.',
      en: 'Clothes use 입다; shoes use 신다.',
      ru: 'Одежду надевают с 입다, обувь — с 신다.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_012_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '모자를 썼어요.',
    acceptedAnswers: ['모자를 썼어요'],
    answerTranslation: {
      ko: '모자를 썼어요.',
      uz: 'Bosh kiyim kiydim.',
      en: 'I put on a hat.',
      ru: 'Я надел шапку.',
    },
    difficulty: 4,
    tags: ['모자', '쓰다', '듣기'],
    hint: {
      ko: '머리에 착용하는 모자는 “쓰다”예요.',
      uz: 'Bosh kiyim bilan “쓰다”.',
      en: 'A hat uses 쓰다.',
      ru: 'С головным убором используется 쓰다.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_013_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    instruction: {
      ko: '추운 날에 목에 하는 것은 무엇입니까?',
      uz: 'Sovuq kunda bo‘yinga nima taqiladi?',
      en: 'What do you wear around your neck on a cold day?',
      ru: 'Что надевают на шею в холодный день?',
    },
    passage: '교재 74쪽 4번 사람은 모자와 목도리와 장갑을 착용하고 있습니다.',
    options: ['목도리', '구두', '치마', '안경'],
    answer: '목도리',
    answerTranslation: {
      ko: '목도리',
      uz: 'sharf',
      en: 'scarf',
      ru: 'шарф',
    },
    difficulty: 2,
    tags: ['목도리', '독해'],
    hint: {
      ko: '목 주위에 하는 물건이에요.',
      uz: 'Bo‘yinga taqiladi.',
      en: 'It goes around the neck.',
      ru: 'Его носят на шее.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_014_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '장갑도 꼈어요?',
    options: ['네', '장갑을', '꼈어요', '신었어요', '모자를'],
    answer: '네 장갑을 꼈어요',
    answerTranslation: {
      ko: '네, 장갑을 꼈어요.',
      uz: 'Ha, qo‘lqop taqdim.',
      en: 'Yes, I put on gloves.',
      ru: 'Да, я надел перчатки.',
    },
    difficulty: 4,
    tags: ['장갑', '끼다', '응답'],
    hint: {
      ko: '장갑에는 “끼다”를 사용해요.',
      uz: 'Qo‘lqop bilan “끼다”.',
      en: 'Use 끼다 with gloves.',
      ru: 'С перчатками используется 끼다.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_015_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '모자를 쓰고 목도리를 했어요.',
    options: [
      '모자와 목도리를 착용했어요.',
      '구두와 운동화를 신었어요.',
      '양복과 치마를 입었어요.',
      '안경과 장갑을 샀어요.',
    ],
    answer: '모자와 목도리를 착용했어요.',
    answerTranslation: {
      ko: '모자를 쓰고 목도리를 했습니다.',
      uz: 'Bosh kiyim va sharf taqqan.',
      en: 'The person is wearing a hat and a scarf.',
      ru: 'Человек надел шапку и шарф.',
    },
    difficulty: 3,
    tags: ['모자', '목도리', '듣기'],
    hint: {
      ko: '두 가지 착용 물건을 모두 들으세요.',
      uz: 'Ikki buyumni ham tinglang.',
      en: 'Listen for both clothing items.',
      ru: 'Расслышьте оба предмета.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_016_type_answer: {
    type: 'type_answer',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.type,
    npcText: '목에 목도리를 착용했습니다.',
    sentenceTemplate: '목도리를 ___.',
    blankAnswers: ['했어요'],
    answerTranslation: {
      ko: '목도리를 했어요.',
      uz: 'Sharf taqdim.',
      en: 'I wore a scarf.',
      ru: 'Я надел шарф.',
    },
    difficulty: 4,
    tags: ['목도리', '하다', '타이핑'],
    hint: {
      ko: '교재에서는 목도리에 “하다”를 사용해요.',
      uz: 'Darslikda 목도리 bilan “하다”.',
      en: 'The textbook uses 하다 with 목도리.',
      ru: 'В учебнике 목도리 используется с 하다.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_017_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    instruction: I.cloze,
    passage:
      '네 사람의 옷을 정리해 봐요. 첫 번째 사람은 안경을 끼고 ___을 입고 넥타이를 했어요. 두 번째 사람은 스웨터와 바지를 입고 ___를 신었어요. 세 번째 사람은 블라우스와 치마를 입고 ___를 신었어요. 네 번째 사람은 모자를 쓰고 목도리를 하고 ___을 꼈어요.',
    options: ['양복', '운동화', '구두', '장갑', '스카프'],
    answer: '양복|운동화|구두|장갑',
    answerTranslation: {
      ko: '양복, 운동화, 구두, 장갑입니다.',
      uz: 'Kostyum, krossovka, tufli, qo‘lqop.',
      en: 'Suit, sneakers, dress shoes, gloves.',
      ru: 'Костюм, кроссовки, туфли, перчатки.',
    },
    difficulty: 5,
    tags: ['교재74', '의복 종합'],
    hint: {
      ko: '74쪽 네 그림을 위에서부터 순서대로 떠올리세요.',
      uz: '74-betdagi to‘rtta rasmni tartib bilan eslang.',
      en: 'Recall the four pictures on page 74 in order.',
      ru: 'Вспомните четыре рисунка страницы 74 по порядку.',
    },
    xpReward: 25,
    isActive: true,
  },

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 어떻게 착용해요?
  // p.75 연습 2 전체
  // ──────────────────────────────────────────────────────────

  s3u4_018_word_matching: {
    type: 'word_matching',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    instruction: I.match,
    answer: '',
    pairs: [
      { korean: '입다', native: 'Kiyinmoq' },
      { korean: '쓰다', native: 'Boshga kiymoq' },
      { korean: '끼다', native: 'Taqmoq' },
      { korean: '하다', native: 'Taqmoq' },
      { korean: '신다', native: 'Oyoq kiyim kiymoq' },
    ],
    answerTranslation: {
      ko: '입다, 쓰다, 끼다, 하다, 신다',
      uz: 'Kiyinmoq, boshga kiymoq, taqmoq, taqmoq, oyoq kiyim kiymoq',
      en: 'Wear clothes, wear on the head, put on, wear, put on footwear',
      ru: 'Надевать одежду, головной убор, надевать, носить, обуваться',
    },
    difficulty: 2,
    tags: ['착용 동사', '교재75'],
    hint: {
      ko: '교재 연습 2의 단어 상자 전체예요.',
      uz: 'Bu 2-mashqdagi barcha fe’llar.',
      en: 'These are all five verbs from Exercise 2.',
      ru: 'Это все пять глаголов из упражнения 2.',
    },
    xpReward: 10,
    isActive: true,
  },

  s3u4_019_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '결혼식에 가는데 어떤 옷을 입어야 해요?',
      },
    ],
    options: [
      '양복을 입으세요.',
      '양복을 신으세요.',
      '구두를 쓰세요.',
      '장갑을 입으세요.',
    ],
    answer: '양복을 입으세요.',
    acceptedAnswers: ['양복을 입으세요'],
    answerTranslation: {
      ko: '양복을 입으세요.',
      uz: 'Kostyum kiying.',
      en: 'Wear a suit.',
      ru: 'Наденьте костюм.',
    },
    difficulty: 3,
    tags: ['결혼식', '양복', '연습2-1'],
    hint: {
      ko: '결혼식에 갈 때 입는 옷을 묻고 있어요.',
      uz: 'To‘yga qanday kiyim kiyish so‘ralmoqda.',
      en: 'The speaker asks what clothes to wear to a wedding.',
      ru: 'Спрашивают, что надеть на свадьбу.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_020_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '양복을 입으세요.',
    answer: '양복을 입으세요.',
    acceptedAnswers: ['양복을 입으세요'],
    answerTranslation: {
      ko: '양복을 입으세요.',
      uz: 'Kostyum kiying.',
      en: 'Wear a suit.',
      ru: 'Наденьте костюм.',
    },
    difficulty: 3,
    tags: ['양복', '입으세요', '말하기'],
    hint: {
      ko: '입다의 부탁·권유형이에요.',
      uz: '입다 ning muloyim buyruq shakli.',
      en: 'This is the polite directive form of 입다.',
      ru: 'Это вежливая форма от 입다.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_021_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: 'A: 이 구두 좀 보여 주세요.\nB: 네, 한번 ___ 보세요.',
    blankAnswers: ['신어'],
    options: ['신어', '입어', '써', '껴', '해'],
    answerTranslation: {
      ko: '네, 한번 신어 보세요.',
      uz: 'Ha, bir kiyib ko‘ring.',
      en: 'Sure, try them on.',
      ru: 'Да, примерьте их.',
    },
    difficulty: 3,
    tags: ['구두', '신다', '연습2-2'],
    hint: {
      ko: '구두는 발에 신어요.',
      uz: 'Tufli oyoqqa kiyiladi.',
      en: 'Shoes use 신다.',
      ru: 'С обувью используется 신다.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_022_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '네, 한번 신어 보세요.',
    acceptedAnswers: ['네 한번 신어 보세요'],
    answerTranslation: {
      ko: '네, 한번 신어 보세요.',
      uz: 'Ha, bir kiyib ko‘ring.',
      en: 'Yes, try them on.',
      ru: 'Да, примерьте.',
    },
    difficulty: 4,
    tags: ['구두', '신어 보다', '듣기'],
    hint: {
      ko: '신발을 시험해 보는 표현이에요.',
      uz: 'Oyoq kiyimni kiyib ko‘rish ifodasi.',
      en: 'It is an expression for trying on footwear.',
      ru: 'Это выражение для примерки обуви.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_023_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['저기', '안경을', '낀', '사람이', '윌슨 씨예요', '입은'],
    answer: '저기 안경을 낀 사람이 윌슨 씨예요',
    answerTranslation: {
      ko: '저기 안경을 낀 사람이 윌슨 씨예요.',
      uz: 'Ana u ko‘zoynak taqqan odam Uilson.',
      en: 'The person over there wearing glasses is Wilson.',
      ru: 'Тот человек в очках — Уилсон.',
    },
    difficulty: 4,
    tags: ['안경', '낀 사람', '연습2-3'],
    hint: {
      ko: '안경에는 “끼다”를 사용해요.',
      uz: '안경 bilan “끼다”.',
      en: 'Use 끼다 with glasses.',
      ru: 'С очками используется 끼다.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_024_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '저기 안경을 낀 사람이 윌슨 씨예요?',
      },
    ],
    options: [
      '네, 맞아요.',
      '네, 입어요.',
      '아니요, 신으세요.',
      '네, 스카프예요.',
    ],
    answer: '네, 맞아요.',
    acceptedAnswers: ['네 맞아요'],
    answerTranslation: {
      ko: '네, 맞아요.',
      uz: 'Ha, to‘g‘ri.',
      en: 'Yes, that’s right.',
      ru: 'Да, верно.',
    },
    difficulty: 2,
    tags: ['맞다', '윌슨', '연습2-3'],
    hint: {
      ko: '사람이 맞는지 확인하는 질문이에요.',
      uz: 'Odam to‘g‘ri ekanini tasdiqlash savoli.',
      en: 'The speaker is confirming the person’s identity.',
      ru: 'Спрашивают, тот ли это человек.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_025_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '많이 추워요. 장갑을 꼭 끼세요.',
    options: [
      '장갑을 착용하라고 해요.',
      '모자를 벗으라고 해요.',
      '양복을 사라고 해요.',
      '구두를 보여 달라고 해요.',
    ],
    answer: '장갑을 착용하라고 해요.',
    answerTranslation: {
      ko: '추우니까 장갑을 꼭 끼라고 합니다.',
      uz: 'Sovuq bo‘lgani uchun qo‘lqop kiyishni aytyapti.',
      en: 'The speaker says to be sure to wear gloves because it is cold.',
      ru: 'Из-за холода советуют обязательно надеть перчатки.',
    },
    difficulty: 3,
    tags: ['장갑', '끼세요', '듣기'],
    hint: {
      ko: '추운 날 손에 착용하는 물건을 들으세요.',
      uz: 'Sovuq kunda qo‘lga kiyiladigan buyumni tinglang.',
      en: 'Listen for what should be worn on the hands.',
      ru: 'Расслышьте, что нужно надеть на руки.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_026_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '오늘 날씨 어때요?',
    options: ['많이', '추워요', '장갑을', '꼭', '끼세요', '입으세요'],
    answer: '많이 추워요 장갑을 꼭 끼세요',
    answerTranslation: {
      ko: '많이 추워요. 장갑을 꼭 끼세요.',
      uz: 'Juda sovuq. Albatta qo‘lqop kiying.',
      en: 'It is very cold. Be sure to wear gloves.',
      ru: 'Очень холодно. Обязательно наденьте перчатки.',
    },
    difficulty: 4,
    tags: ['날씨', '장갑', '연습2-4'],
    hint: {
      ko: '날씨 설명 뒤에 장갑을 권해요.',
      uz: 'Ob-havodan keyin qo‘lqop tavsiya qilinadi.',
      en: 'Describe the weather, then recommend gloves.',
      ru: 'Сначала опишите погоду, затем посоветуйте перчатки.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_027_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '예쁜 스카프가 많네요. 저는 스카프 ___ 것을 좋아해요.',
    blankAnswers: ['하는'],
    options: ['하는', '입는', '신는', '쓰는', '끼는'],
    answerTranslation: {
      ko: '저는 스카프 하는 것을 좋아해요.',
      uz: 'Men sharf taqishni yaxshi ko‘raman.',
      en: 'I like wearing scarves.',
      ru: 'Мне нравится носить шарфы.',
    },
    difficulty: 4,
    tags: ['스카프', '하다', '연습2-5'],
    hint: {
      ko: '교재 단어 상자에서 스카프와 연결되는 동사는 “하다”예요.',
      uz: 'Darslikda 스카프 bilan “하다” bog‘langan.',
      en: 'In the exercise, 스카프 is paired with 하다.',
      ru: 'В упражнении 스카프 сочетается с 하다.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_028_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '저는 스카프 하는 것을 좋아해요.',
    answer: '저는 스카프 하는 것을 좋아해요.',
    acceptedAnswers: ['저는 스카프 하는 것을 좋아해요'],
    answerTranslation: {
      ko: '저는 스카프 하는 것을 좋아해요.',
      uz: 'Men sharf taqishni yaxshi ko‘raman.',
      en: 'I like wearing scarves.',
      ru: 'Мне нравится носить шарфы.',
    },
    difficulty: 4,
    tags: ['스카프', '말하기'],
    hint: {
      ko: '교재 75쪽 5번 문장이에요.',
      uz: 'Bu 75-betdagi 5-gap.',
      en: 'This is item 5 on page 75.',
      ru: 'Это пункт 5 на странице 75.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_029_type_answer: {
    type: 'type_answer',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.type,
    npcText: '머리에 모자를 착용했습니다.',
    sentenceTemplate: '모자를 ___.',
    blankAnswers: ['썼어요'],
    answerTranslation: {
      ko: '모자를 썼어요.',
      uz: 'Bosh kiyim kiydim.',
      en: 'I put on a hat.',
      ru: 'Я надел шапку.',
    },
    difficulty: 4,
    tags: ['모자', '쓰다'],
    hint: {
      ko: '머리에 착용하는 물건에는 “쓰다”를 사용해요.',
      uz: 'Boshga kiyiladigan buyum bilan “쓰다”.',
      en: 'Use 쓰다 for something worn on the head.',
      ru: 'Для головных уборов используется 쓰다.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_030_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '구두를 신었어요.',
    options: ['신다', '입다', '쓰다', '하다'],
    answer: '신다',
    answerTranslation: {
      ko: '구두는 신습니다.',
      uz: 'Tufli bilan 신다 ishlatiladi.',
      en: 'Dress shoes use 신다.',
      ru: 'С туфлями используется 신다.',
    },
    difficulty: 2,
    tags: ['구두', '신다', '듣기'],
    hint: {
      ko: '발에 착용하는 동사를 고르세요.',
      uz: 'Oyoqqa kiyish fe’lini tanlang.',
      en: 'Choose the verb used for footwear.',
      ru: 'Выберите глагол для обуви.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_031_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '안경은 어떻게 해요?',
      },
    ],
    options: [
      '안경을 껴요.',
      '안경을 입어요.',
      '안경을 신어요.',
      '안경을 써요만.',
    ],
    answer: '안경을 껴요.',
    acceptedAnswers: ['안경을 껴요'],
    answerTranslation: {
      ko: '안경을 껴요.',
      uz: 'Ko‘zoynak taqaman.',
      en: 'I wear glasses.',
      ru: 'Я ношу очки.',
    },
    difficulty: 3,
    tags: ['안경', '끼다'],
    hint: {
      ko: '교재 74쪽의 “안경을 꼈어요”를 떠올리세요.',
      uz: '“안경을 꼈어요” gapini eslang.',
      en: 'Recall 안경을 꼈어요 from page 74.',
      ru: 'Вспомните 안경을 꼈어요 со страницы 74.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_032_translate_builder: {
    type: 'translate_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '장갑을 꼭 끼세요',
      uz: 'Albatta qo‘lqop kiying',
      en: 'Be sure to wear gloves',
      ru: 'Обязательно наденьте перчатки',
    },
    options: ['장갑을', '꼭', '끼세요', '신으세요', '모자를'],
    answer: '장갑을 꼭 끼세요',
    answerTranslation: {
      ko: '장갑을 꼭 끼세요.',
      uz: 'Albatta qo‘lqop kiying.',
      en: 'Be sure to wear gloves.',
      ru: 'Обязательно наденьте перчатки.',
    },
    difficulty: 4,
    tags: ['장갑', '번역'],
    hint: {
      ko: '“꼭”은 반드시라는 뜻이에요.',
      uz: '“꼭” — albatta degani.',
      en: '꼭 means “be sure to.”',
      ru: '꼭 означает «обязательно».',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_033_dialog_order: {
    type: 'dialog_order',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialogOrder,
    dialogLines: [
      {
        speaker: 'npc',
        text: '이 구두 좀 보여 주세요.',
      },
      {
        speaker: 'user',
        text: '네, 여기 있습니다.',
      },
      {
        speaker: 'npc',
        text: '신어 봐도 돼요?',
      },
      {
        speaker: 'user',
        text: '네, 한번 신어 보세요.',
      },
    ],
    answer: 'all_correct',
    answerTranslation: {
      ko: '구두를 보여 달라고 한 뒤 직접 신어 보는 대화입니다.',
      uz: 'Tuflini ko‘rsatishni so‘rab, keyin kiyib ko‘rishadi.',
      en: 'The customer asks to see the shoes and then tries them on.',
      ru: 'Покупатель просит показать туфли, затем примеряет их.',
    },
    difficulty: 5,
    tags: ['구두', '신어 보다', '대화 순서'],
    hint: {
      ko: '보여 달라는 요청이 신어 보는 것보다 먼저예요.',
      uz: 'Avval ko‘rsatish, keyin kiyib ko‘rish.',
      en: 'Seeing the shoes comes before trying them on.',
      ru: 'Сначала показывают обувь, затем её примеряют.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_034_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.cloze,
    passage:
      '옷에 따라 동사가 달라요. 양복은 ___, 모자는 ___, 안경과 장갑은 ___, 넥타이와 스카프는 ___, 구두와 운동화는 ___.',
    options: ['입어요', '써요', '껴요', '해요', '신어요'],
    answer: '입어요|써요|껴요|해요|신어요',
    answerTranslation: {
      ko: '입어요, 써요, 껴요, 해요, 신어요입니다.',
      uz: '입어요, 써요, 껴요, 해요, 신어요.',
      en: 'The verbs are 입어요, 써요, 껴요, 해요, and 신어요.',
      ru: 'Используются 입어요, 써요, 껴요, 해요 и 신어요.',
    },
    difficulty: 5,
    tags: ['착용 동사', '연습2 종합'],
    hint: {
      ko: '몸·머리·눈/손·목·발 순서예요.',
      uz: 'Tana · bosh · ko‘z/qo‘l · bo‘yin · oyoq tartibi.',
      en: 'Think body, head, eyes/hands, neck, feet.',
      ru: 'Порядок: тело, голова, глаза/руки, шея, ноги.',
    },
    xpReward: 25,
    isActive: true,
  },

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 사이즈와 색이 어때요?
  // p.75 연습 3 단어 상자 전체
  //
  // 그림별 답은 원본 고정답이 아니므로 앱용 예시 응답.
  // ──────────────────────────────────────────────────────────

  s3u4_035_word_matching: {
    type: 'word_matching',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    instruction: I.match,
    answer: '',
    pairs: [
      { korean: '비싸다', native: 'Qimmat' },
      { korean: '싸다', native: 'Arzon' },
      { korean: '길다', native: 'Uzun' },
      { korean: '짧다', native: 'Kalta' },
      { korean: '맞다', native: 'Mos kelmoq' },
    ],
    answerTranslation: {
      ko: '비싸다, 싸다, 길다, 짧다, 맞다',
      uz: 'Qimmat, arzon, uzun, kalta, mos kelmoq',
      en: 'Expensive, cheap, long, short, fit',
      ru: 'Дорогой, дешёвый, длинный, короткий, подходить',
    },
    difficulty: 2,
    tags: ['쇼핑 어휘', '교재75'],
    hint: {
      ko: '가격·길이·사이즈를 말할 때 쓰는 단어예요.',
      uz: 'Narx, uzunlik va o‘lcham uchun so‘zlar.',
      en: 'These words describe price, length, and fit.',
      ru: 'Эти слова описывают цену, длину и размер.',
    },
    xpReward: 10,
    isActive: true,
  },

  s3u4_036_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '이 옷은 너무 비싸요.',
    options: [
      '가격이 높아요.',
      '가격이 낮아요.',
      '사이즈가 작아요.',
      '색이 밝아요.',
    ],
    answer: '가격이 높아요.',
    answerTranslation: {
      ko: '비싸다는 가격이 높다는 뜻입니다.',
      uz: '비싸다 — narxi yuqori degani.',
      en: '비싸다 means the price is high.',
      ru: '비싸다 означает «дорогой».',
    },
    difficulty: 3,
    tags: ['비싸다', '가격', '듣기'],
    hint: {
      ko: '가격에 대한 표현이에요.',
      uz: 'Bu narx haqida.',
      en: 'It describes the price.',
      ru: 'Это описание цены.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_037_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: 'A: 이 옷 비싸요?\nB: 아니요, 아주 ___.',
    blankAnswers: ['싸요'],
    options: ['싸요', '길어요', '밝아요', '커요', '어울려요'],
    answerTranslation: {
      ko: '아니요, 아주 싸요.',
      uz: 'Yo‘q, juda arzon.',
      en: 'No, it is very cheap.',
      ru: 'Нет, очень дёшево.',
    },
    difficulty: 3,
    tags: ['싸다', '비싸다'],
    hint: {
      ko: '비싸다의 반대말이에요.',
      uz: '비싸다 ning teskarisi.',
      en: 'It is the opposite of 비싸다.',
      ru: 'Это противоположность 비싸다.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_038_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '이 바지는 너무 길어요.',
    answer: '이 바지는 너무 길어요.',
    acceptedAnswers: ['이 바지는 너무 길어요'],
    answerTranslation: {
      ko: '이 바지는 너무 길어요.',
      uz: 'Bu shim juda uzun.',
      en: 'These pants are too long.',
      ru: 'Эти брюки слишком длинные.',
    },
    difficulty: 3,
    tags: ['길다', '바지', '말하기'],
    hint: {
      ko: '길이가 긴 옷을 말해요.',
      uz: 'Kiyim uzunligi katta.',
      en: 'The clothing is long in length.',
      ru: 'Одежда слишком длинная.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_039_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['이', '치마는', '조금', '짧아요', '비싸요', '밝아요'],
    answer: '이 치마는 조금 짧아요',
    answerTranslation: {
      ko: '이 치마는 조금 짧아요.',
      uz: 'Bu yubka biroz kalta.',
      en: 'This skirt is a little short.',
      ru: 'Эта юбка немного короткая.',
    },
    difficulty: 4,
    tags: ['짧다', '치마'],
    hint: {
      ko: '길다의 반대말을 사용하세요.',
      uz: '길다 ning teskarisini ishlating.',
      en: 'Use the opposite of 길다.',
      ru: 'Используйте противоположность 길다.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_040_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '저는 밝은 색 옷을 좋아해요.',
    options: [
      '밝은 색을 좋아해요.',
      '어두운 색을 좋아해요.',
      '긴 옷을 좋아해요.',
      '비싼 옷만 좋아해요.',
    ],
    answer: '밝은 색을 좋아해요.',
    answerTranslation: {
      ko: '밝은 색 옷을 좋아합니다.',
      uz: 'Och rangli kiyimlarni yoqtiradi.',
      en: 'The speaker likes bright-colored clothes.',
      ru: 'Говорящему нравится одежда светлых цветов.',
    },
    difficulty: 3,
    tags: ['밝다', '색', '듣기'],
    hint: {
      ko: '색의 밝기를 들으세요.',
      uz: 'Rang yorqinligini tinglang.',
      en: 'Listen for the brightness of the color.',
      ru: 'Расслышьте характеристику цвета.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_041_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '검은색처럼 ___ 색 옷도 좋아해요.',
    blankAnswers: ['어두운'],
    options: ['어두운', '밝은', '긴', '싼', '맞는'],
    answerTranslation: {
      ko: '어두운 색 옷도 좋아해요.',
      uz: 'To‘q rangli kiyimlarni ham yoqtiraman.',
      en: 'I also like dark-colored clothes.',
      ru: 'Мне также нравится одежда тёмных цветов.',
    },
    difficulty: 4,
    tags: ['어둡다', '색'],
    hint: {
      ko: '밝다의 반대말이에요.',
      uz: '밝다 ning teskarisi.',
      en: 'It is the opposite of 밝다.',
      ru: 'Это противоположность 밝다.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_042_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '사이즈가 어때요?',
      },
    ],
    options: [
      '조금 작아요.',
      '아주 비싸요.',
      '밝은 색이에요.',
      '구두를 신었어요.',
    ],
    answer: '조금 작아요.',
    acceptedAnswers: ['조금 작아요'],
    answerTranslation: {
      ko: '조금 작아요.',
      uz: 'Biroz kichik.',
      en: 'It is a little small.',
      ru: 'Немного мало.',
    },
    difficulty: 3,
    tags: ['사이즈', '작다', '연습3-1', '앱 예시'],
    hint: {
      ko: '원본은 그림을 보고 자유롭게 대답하는 활동이에요. 여기서는 사이즈 어휘를 연습해요.',
      uz: 'Asl topshiriq erkin javobli. Bu yerda o‘lcham so‘zi mashq qilinadi.',
      en: 'The source is open-ended; this app example practices size vocabulary.',
      ru: 'Исходное задание открытое; здесь тренируется лексика размера.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_043_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '이 옷은 조금 커요.',
    acceptedAnswers: ['이 옷은 조금 커요'],
    answerTranslation: {
      ko: '이 옷은 조금 커요.',
      uz: 'Bu kiyim biroz katta.',
      en: 'These clothes are a little big.',
      ru: 'Эта одежда немного велика.',
    },
    difficulty: 4,
    tags: ['크다', '옷', '듣기'],
    hint: {
      ko: '작다의 반대말을 들으세요.',
      uz: '작다 ning teskarisini tinglang.',
      en: 'Listen for the opposite of 작다.',
      ru: 'Расслышьте противоположность 작다.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_044_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '옷이 마음에 드세요?',
    options: ['네', '마음에', '들어요', '길어요', '안경을'],
    answer: '네 마음에 들어요',
    answerTranslation: {
      ko: '네, 마음에 들어요.',
      uz: 'Ha, menga yoqdi.',
      en: 'Yes, I like it.',
      ru: 'Да, мне нравится.',
    },
    difficulty: 4,
    tags: ['마음에 들다', '연습3-2', '앱 예시'],
    hint: {
      ko: '원본 2번 질문은 “옷이 마음에 드세요?”예요.',
      uz: 'Asl 2-savol “옷이 마음에 드세요?”.',
      en: 'The printed question is 옷이 마음에 드세요?',
      ru: 'В оригинале вопрос: 옷이 마음에 드세요?',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_045_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    instruction: {
      ko: '“마음에 들어요”와 가장 가까운 뜻은 무엇입니까?',
      uz: '“마음에 들어요”ga eng yaqin ma’no qaysi?',
      en: 'Which meaning is closest to 마음에 들어요?',
      ru: 'Какое значение ближе всего к 마음에 들어요?',
    },
    passage: '가게에서 옷을 입어 본 뒤 “네, 마음에 들어요.”라고 말했습니다.',
    options: [
      '그 옷이 좋아요.',
      '그 옷이 너무 작아요.',
      '그 옷이 너무 비싸요.',
      '그 옷을 못 입어요.',
    ],
    answer: '그 옷이 좋아요.',
    answerTranslation: {
      ko: '마음에 들다는 어떤 것이 좋고 만족스럽다는 뜻입니다.',
      uz: '마음에 들다 — biror narsa yoqishini bildiradi.',
      en: '마음에 들다 means to like or be pleased with something.',
      ru: '마음에 들다 означает «нравиться».',
    },
    difficulty: 3,
    tags: ['마음에 들다', '독해'],
    hint: {
      ko: '옷에 대한 긍정적인 느낌이에요.',
      uz: 'Bu kiyim haqidagi ijobiy his.',
      en: 'It expresses a positive feeling about the clothing.',
      ru: 'Это положительная оценка одежды.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_046_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: 'A: 어떤 색 옷을 좋아하세요?\nB: ___ 색 옷을 좋아해요.',
    blankAnswers: ['밝은'],
    options: ['밝은', '비싼', '긴', '맞는', '큰'],
    answerTranslation: {
      ko: '밝은 색 옷을 좋아해요.',
      uz: 'Och rangli kiyimlarni yoqtiraman.',
      en: 'I like bright-colored clothes.',
      ru: 'Мне нравится одежда светлых цветов.',
    },
    difficulty: 3,
    tags: ['밝다', '연습3-3', '앱 예시'],
    hint: {
      ko: '원본 3번은 좋아하는 옷의 색을 묻습니다.',
      uz: 'Asl 3-savol yoqtirgan kiyim rangini so‘raydi.',
      en: 'Source item 3 asks what color of clothes you like.',
      ru: 'Пункт 3 спрашивает о любимом цвете одежды.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_047_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '이 바지는 사이즈가 잘 맞아요.',
    answer: '이 바지는 사이즈가 잘 맞아요.',
    acceptedAnswers: ['이 바지는 사이즈가 잘 맞아요'],
    answerTranslation: {
      ko: '이 바지는 사이즈가 잘 맞아요.',
      uz: 'Bu shimning o‘lchami menga yaxshi mos.',
      en: 'These pants fit well.',
      ru: 'Эти брюки хорошо подходят по размеру.',
    },
    difficulty: 4,
    tags: ['맞다', '사이즈', '말하기'],
    hint: {
      ko: '크지도 작지도 않고 알맞다는 뜻이에요.',
      uz: 'Juda katta ham, kichik ham emas.',
      en: 'It means the size is neither too big nor too small.',
      ru: 'Размер подходит: не слишком большой и не маленький.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_048_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '어떤 것으로 바꿔 드릴까요?',
      },
    ],
    options: [
      '좀 큰 것으로 바꿔 주세요.',
      '양복을 입었어요.',
      '안경을 꼈어요.',
      '구두를 신어 봤어요.',
    ],
    answer: '좀 큰 것으로 바꿔 주세요.',
    acceptedAnswers: ['좀 큰 것으로 바꿔 주세요'],
    answerTranslation: {
      ko: '좀 큰 것으로 바꿔 주세요.',
      uz: 'Biroz kattaroq narsaga almashtirib bering.',
      en: 'Please exchange it for a larger one.',
      ru: 'Поменяйте, пожалуйста, на размер побольше.',
    },
    difficulty: 4,
    tags: ['크다', '연습3-4', '앱 예시'],
    hint: {
      ko: '원본 4번은 다른 것으로 바꾸는 상황이에요.',
      uz: 'Asl 4-band almashtirish vaziyati.',
      en: 'Source item 4 is an exchange situation.',
      ru: 'Пункт 4 — ситуация обмена.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_049_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '이 옷이 잘 어울려요.',
    options: [
      '이 옷이 그 사람에게 잘 맞아 보여요.',
      '이 옷의 가격이 아주 싸요.',
      '이 옷의 길이가 너무 길어요.',
      '이 옷의 색이 아주 어두워요.',
    ],
    answer: '이 옷이 그 사람에게 잘 맞아 보여요.',
    answerTranslation: {
      ko: '어울리다는 옷 등이 사람에게 잘 맞아 보인다는 뜻입니다.',
      uz: '어울리다 — kiyim odamga yarashishini bildiradi.',
      en: '어울리다 means that something looks good on someone.',
      ru: '어울리다 означает, что одежда человеку идёт.',
    },
    difficulty: 4,
    tags: ['어울리다', '듣기'],
    hint: {
      ko: '사이즈 자체보다 사람과 옷의 조화를 말해요.',
      uz: 'Bu faqat o‘lcham emas, odamga yarashish haqida.',
      en: 'It describes how well the clothing suits the person.',
      ru: 'Речь о том, насколько одежда идёт человеку.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_050_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '이 옷 어때요?',
    options: ['아주', '잘', '어울려요', '신었어요', '장갑을'],
    answer: '아주 잘 어울려요',
    answerTranslation: {
      ko: '아주 잘 어울려요.',
      uz: 'Juda yaxshi yarashadi.',
      en: 'It looks very good on you.',
      ru: 'Вам очень идёт.',
    },
    difficulty: 4,
    tags: ['어울리다', '연습3-5', '앱 예시'],
    hint: {
      ko: '원본 5번은 옷에 대한 의견을 묻습니다.',
      uz: 'Asl 5-savol kiyim haqida fikr so‘raydi.',
      en: 'Source item 5 asks for an opinion about the clothing.',
      ru: 'Пункт 5 просит высказать мнение об одежде.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_051_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    instruction: I.cloze,
    passage:
      '옷을 고를 때 여러 가지를 확인해요. 가격이 높으면 ___, 낮으면 ___. 길이가 많으면 ___, 반대면 ___. 색은 ___ 색과 어두운 색이 있고, 사이즈가 알맞으면 잘 ___. 마지막으로 나에게 잘 ___ 옷인지, 마음에 ___ 옷인지 확인해요.',
    options: [
      '비싸요',
      '싸요',
      '길어요',
      '짧아요',
      '밝은',
      '맞아요',
      '어울리는',
      '드는',
    ],
    answer: '비싸요|싸요|길어요|짧아요|밝은|맞아요|어울리는|드는',
    answerTranslation: {
      ko: '비싸요, 싸요, 길어요, 짧아요, 밝은, 맞아요, 어울리는, 드는을 사용합니다.',
      uz: 'Narx, uzunlik, rang, o‘lcham va yarashishni ifodalovchi so‘zlar.',
      en: 'The passage reviews price, length, color, fit, suitability, and preference.',
      ru: 'Повторяются цена, длина, цвет, размер, то, идёт ли одежда, и нравится ли она.',
    },
    difficulty: 5,
    tags: ['연습3', '쇼핑 어휘 종합'],
    hint: {
      ko: '가격 → 길이 → 색 → 사이즈 → 어울림 → 선호 순서예요.',
      uz: 'Narx → uzunlik → rang → o‘lcham → yarashish → yoqish.',
      en: 'Follow price → length → color → size → suitability → preference.',
      ru: 'Порядок: цена → длина → цвет → размер → идёт ли → нравится ли.',
    },
    xpReward: 25,
    isActive: true,
  },

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 옷 가게에서 골라요
  // p.74~75 통합 재사용
  // ──────────────────────────────────────────────────────────

  s3u4_052_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '결혼식에 갈 건데 뭘 입으면 좋을까요?',
      },
    ],
    options: [
      '양복을 입으세요.',
      '장갑을 신으세요.',
      '운동화를 입으세요.',
      '안경을 쓰세요.',
    ],
    answer: '양복을 입으세요.',
    acceptedAnswers: ['양복을 입으세요'],
    answerTranslation: {
      ko: '양복을 입으세요.',
      uz: 'Kostyum kiying.',
      en: 'Wear a suit.',
      ru: 'Наденьте костюм.',
    },
    difficulty: 3,
    tags: ['결혼식', '양복', '복습'],
    hint: {
      ko: '교재 75쪽 결혼식 대화를 떠올리세요.',
      uz: '75-betdagi to‘y dialogini eslang.',
      en: 'Recall the wedding dialogue on page 75.',
      ru: 'Вспомните диалог о свадьбе на странице 75.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_053_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '이 구두가 마음에 드는데 조금 작아요.',
    options: [
      '구두는 좋지만 사이즈가 작아요.',
      '구두는 싫고 사이즈가 커요.',
      '구두가 비싸서 마음에 안 들어요.',
      '운동화가 너무 길어요.',
    ],
    answer: '구두는 좋지만 사이즈가 작아요.',
    answerTranslation: {
      ko: '구두는 마음에 들지만 조금 작습니다.',
      uz: 'Tufli yoqadi, lekin biroz kichik.',
      en: 'The shoes are liked, but they are a little small.',
      ru: 'Туфли нравятся, но немного малы.',
    },
    difficulty: 4,
    tags: ['구두', '마음에 들다', '작다', '듣기'],
    hint: {
      ko: '좋아하는지와 사이즈를 둘 다 들으세요.',
      uz: 'Yoqishi va o‘lchamini tinglang.',
      en: 'Listen for both preference and size.',
      ru: 'Расслышьте и оценку, и размер.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_054_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '이 구두는 조금 작아요. 좀 ___ 것으로 바꿔 주세요.',
    blankAnswers: ['큰'],
    options: ['큰', '작은', '짧은', '어두운', '싼'],
    answerTranslation: {
      ko: '좀 큰 것으로 바꿔 주세요.',
      uz: 'Biroz kattaroq narsaga almashtirib bering.',
      en: 'Please exchange them for a larger pair.',
      ru: 'Поменяйте, пожалуйста, на размер побольше.',
    },
    difficulty: 4,
    tags: ['크다', '작다', '교환'],
    hint: {
      ko: '지금 것이 작으니까 반대 사이즈가 필요해요.',
      uz: 'Hozirgisi kichik, kattaroq kerak.',
      en: 'The current one is small, so a bigger one is needed.',
      ru: 'Текущий размер мал, нужен больший.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_055_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '이 옷은 저한테 잘 어울려요.',
    answer: '이 옷은 저한테 잘 어울려요.',
    acceptedAnswers: ['이 옷은 저한테 잘 어울려요'],
    answerTranslation: {
      ko: '이 옷은 저한테 잘 어울려요.',
      uz: 'Bu kiyim menga yaxshi yarashadi.',
      en: 'These clothes suit me well.',
      ru: 'Эта одежда мне хорошо идёт.',
    },
    difficulty: 4,
    tags: ['어울리다', '말하기'],
    hint: {
      ko: '사람과 옷이 잘 어울린다는 표현이에요.',
      uz: 'Kiyim odamga yaxshi yarashishini bildiradi.',
      en: 'It says the clothing suits the person.',
      ru: 'Это означает, что одежда хорошо идёт человеку.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_056_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['저는', '밝은', '색', '옷을', '좋아해요', '길어요'],
    answer: '저는 밝은 색 옷을 좋아해요',
    answerTranslation: {
      ko: '저는 밝은 색 옷을 좋아해요.',
      uz: 'Men och rangli kiyimlarni yaxshi ko‘raman.',
      en: 'I like bright-colored clothes.',
      ru: 'Мне нравится одежда светлых цветов.',
    },
    difficulty: 4,
    tags: ['밝다', '색', '어순'],
    hint: {
      ko: '색에 대한 선호를 말하세요.',
      uz: 'Rangga bo‘lgan afzallikni ayting.',
      en: 'Express a color preference.',
      ru: 'Выразите предпочтение по цвету.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_057_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '이 바지는 사이즈가 잘 맞아요.',
    acceptedAnswers: ['이 바지는 사이즈가 잘 맞아요'],
    answerTranslation: {
      ko: '이 바지는 사이즈가 잘 맞아요.',
      uz: 'Bu shimning o‘lchami yaxshi mos.',
      en: 'These pants fit well.',
      ru: 'Эти брюки хорошо подходят по размеру.',
    },
    difficulty: 4,
    tags: ['바지', '맞다', '듣기'],
    hint: {
      ko: '사이즈가 알맞다는 표현을 입력하세요.',
      uz: 'O‘lcham mosligini yozing.',
      en: 'Type the expression saying the size fits.',
      ru: 'Введите выражение о подходящем размере.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_058_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '이 치마 어때요?',
    options: ['조금', '짧지만', '마음에', '들어요', '신어요', '안경을'],
    answer: '조금 짧지만 마음에 들어요',
    answerTranslation: {
      ko: '조금 짧지만 마음에 들어요.',
      uz: 'Biroz kalta, lekin menga yoqdi.',
      en: 'It is a little short, but I like it.',
      ru: 'Она немного короткая, но мне нравится.',
    },
    difficulty: 5,
    tags: ['짧다', '마음에 들다', '응답'],
    hint: {
      ko: '길이와 선호를 함께 말하세요.',
      uz: 'Uzunlik va yoqishini birga ayting.',
      en: 'Mention both the length and whether you like it.',
      ru: 'Скажите и о длине, и о том, нравится ли вещь.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_059_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    instruction: {
      ko: '손님에게 가장 알맞은 옷은 무엇입니까?',
      uz: 'Xaridorga qaysi kiyim eng mos?',
      en: 'Which clothing item best fits the customer’s request?',
      ru: 'Какая вещь лучше всего соответствует просьбе покупателя?',
    },
    passage:
      '손님은 밝은 색을 좋아합니다. 너무 비싼 옷은 싫어합니다. 사이즈가 잘 맞는 옷을 사고 싶습니다.',
    options: [
      '밝고 싸고 사이즈가 맞는 옷',
      '어둡고 비싸고 큰 옷',
      '밝지만 너무 작고 비싼 옷',
      '어둡고 길고 사이즈가 안 맞는 옷',
    ],
    answer: '밝고 싸고 사이즈가 맞는 옷',
    answerTranslation: {
      ko: '밝고 싸며 사이즈가 맞는 옷이 조건에 모두 맞습니다.',
      uz: 'Och rangli, arzon va o‘lchami mos kiyim barcha shartga mos.',
      en: 'Bright, inexpensive clothing that fits satisfies all conditions.',
      ru: 'Светлая, недорогая одежда подходящего размера отвечает всем условиям.',
    },
    difficulty: 4,
    tags: ['밝다', '싸다', '맞다', '독해'],
    hint: {
      ko: '색, 가격, 사이즈 세 조건을 모두 확인하세요.',
      uz: 'Rang, narx va o‘lcham uchalasini tekshiring.',
      en: 'Check color, price, and size.',
      ru: 'Проверьте цвет, цену и размер.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_060_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '이 스웨터 마음에 드세요?',
      },
    ],
    options: [
      '네, 마음에 들어요. 그런데 조금 비싸요.',
      '네, 운동화를 입었어요.',
      '아니요, 장갑을 신었어요.',
      '네, 안경이 길어요.',
    ],
    answer: '네, 마음에 들어요. 그런데 조금 비싸요.',
    acceptedAnswers: ['네 마음에 들어요 그런데 조금 비싸요'],
    answerTranslation: {
      ko: '네, 마음에 들어요. 그런데 조금 비싸요.',
      uz: 'Ha, menga yoqdi. Lekin biroz qimmat.',
      en: 'Yes, I like it. But it is a little expensive.',
      ru: 'Да, мне нравится. Но немного дорого.',
    },
    difficulty: 4,
    tags: ['스웨터', '비싸다', '마음에 들다'],
    hint: {
      ko: '좋아하지만 가격은 높다는 응답이에요.',
      uz: 'Yoqadi, ammo narxi baland.',
      en: 'The customer likes it but thinks the price is high.',
      ru: 'Вещь нравится, но цена высокая.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_061_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '이 스웨터는 너무 어두워요. 좀 밝은 색으로 보여 주세요.',
    options: [
      '더 밝은 색을 보고 싶어요.',
      '더 어두운 색을 사고 싶어요.',
      '더 작은 사이즈가 필요해요.',
      '더 비싼 옷을 찾고 있어요.',
    ],
    answer: '더 밝은 색을 보고 싶어요.',
    answerTranslation: {
      ko: '지금 스웨터가 너무 어두워서 밝은 색을 보고 싶어 합니다.',
      uz: 'Hozirgi sviter juda to‘q, och rangni ko‘rmoqchi.',
      en: 'The current sweater is too dark, so the customer wants a brighter color.',
      ru: 'Свитер слишком тёмный, поэтому покупатель хочет более светлый цвет.',
    },
    difficulty: 4,
    tags: ['어둡다', '밝다', '듣기'],
    hint: {
      ko: '현재 색과 원하는 색이 반대예요.',
      uz: 'Hozirgi va kerakli rang qarama-qarshi.',
      en: 'The current and desired colors are opposites.',
      ru: 'Текущий и желаемый цвет противоположны.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_062_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '이 바지는 너무 길어요. 좀 ___ 바지 없어요?',
    blankAnswers: ['짧은'],
    options: ['짧은', '긴', '비싼', '어두운', '큰'],
    answerTranslation: {
      ko: '좀 짧은 바지 없어요?',
      uz: 'Biroz kaltaroq shim yo‘qmi?',
      en: 'Do you have slightly shorter pants?',
      ru: 'Нет брюк немного покороче?',
    },
    difficulty: 4,
    tags: ['길다', '짧다'],
    hint: {
      ko: '지금 바지가 너무 길어서 반대 길이를 찾고 있어요.',
      uz: 'Shim juda uzun, qisqaroq kerak.',
      en: 'The pants are too long, so a shorter pair is needed.',
      ru: 'Брюки слишком длинные, нужны более короткие.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_063_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '이 구두는 저한테 잘 어울리고 사이즈도 잘 맞아요.',
    answer: '이 구두는 저한테 잘 어울리고 사이즈도 잘 맞아요.',
    acceptedAnswers: ['이 구두는 저한테 잘 어울리고 사이즈도 잘 맞아요'],
    answerTranslation: {
      ko: '이 구두는 저한테 잘 어울리고 사이즈도 잘 맞아요.',
      uz: 'Bu tufli menga yarashadi va o‘lchami ham mos.',
      en: 'These shoes suit me and fit well.',
      ru: 'Эти туфли мне идут и хорошо подходят по размеру.',
    },
    difficulty: 5,
    tags: ['구두', '어울리다', '맞다', '말하기'],
    hint: {
      ko: '어울림과 사이즈는 서로 다른 평가예요.',
      uz: 'Yarashish va o‘lcham ikki xil baho.',
      en: 'Suitability and fit are two different evaluations.',
      ru: 'То, идёт ли вещь, и размер — разные характеристики.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_064_translate_builder: {
    type: 'translate_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '이 옷은 마음에 들지만 조금 비싸요',
      uz: 'Bu kiyim menga yoqdi, lekin biroz qimmat',
      en: 'I like these clothes, but they are a little expensive',
      ru: 'Мне нравится эта одежда, но она немного дорогая',
    },
    options: ['이', '옷은', '마음에', '들지만', '조금', '비싸요'],
    answer: '이 옷은 마음에 들지만 조금 비싸요',
    answerTranslation: {
      ko: '이 옷은 마음에 들지만 조금 비싸요.',
      uz: 'Bu kiyim menga yoqdi, lekin biroz qimmat.',
      en: 'I like these clothes, but they are a little expensive.',
      ru: 'Мне нравится эта одежда, но она немного дорогая.',
    },
    difficulty: 5,
    tags: ['마음에 들다', '비싸다', '번역'],
    hint: {
      ko: '선호와 가격 평가를 연결하세요.',
      uz: 'Yoqish va narx bahosini bog‘lang.',
      en: 'Connect preference with the price evaluation.',
      ru: 'Соедините оценку вещи и её цены.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_065_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    instruction: {
      ko: '다음 중 착용 동사가 맞는 문장은 무엇입니까?',
      uz: 'Qaysi gapda kiyish fe’li to‘g‘ri?',
      en: 'Which sentence uses the correct wearing verb?',
      ru: 'В каком предложении правильно употреблён глагол ношения?',
    },
    passage:
      '옷과 액세서리에 따라 입다, 쓰다, 끼다, 하다, 신다를 다르게 사용합니다.',
    options: [
      '운동화를 신었어요.',
      '모자를 입었어요.',
      '안경을 신었어요.',
      '양복을 꼈어요.',
    ],
    answer: '운동화를 신었어요.',
    answerTranslation: {
      ko: '운동화와 같은 신발에는 “신다”를 사용합니다.',
      uz: 'Krossovka kabi oyoq kiyim bilan “신다”.',
      en: 'Footwear such as sneakers uses 신다.',
      ru: 'С обувью, например кроссовками, используется 신다.',
    },
    difficulty: 4,
    tags: ['착용 동사', '독해'],
    hint: {
      ko: '발에 착용하는 물건을 찾으세요.',
      uz: 'Oyoqqa kiyiladigan buyumni toping.',
      en: 'Find the item worn on the feet.',
      ru: 'Найдите предмет, который надевают на ноги.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_066_dialog_order: {
    type: 'dialog_order',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialogOrder,
    dialogLines: [
      {
        speaker: 'npc',
        text: '이 옷 한번 입어 보세요.',
      },
      {
        speaker: 'user',
        text: '네. 그런데 조금 작은 것 같아요.',
      },
      {
        speaker: 'npc',
        text: '그럼 좀 큰 것으로 바꿔 드릴까요?',
      },
      {
        speaker: 'user',
        text: '네, 부탁합니다.',
      },
    ],
    answer: 'all_correct',
    answerTranslation: {
      ko: '옷을 입어 본 뒤 사이즈가 작아서 더 큰 것으로 교환하는 대화입니다.',
      uz: 'Kiyim kiyib ko‘riladi va kichik bo‘lgani uchun kattarog‘iga almashtiriladi.',
      en: 'The customer tries on clothing and exchanges it for a larger size.',
      ru: 'Покупатель примеряет одежду и меняет её на больший размер.',
    },
    difficulty: 5,
    tags: ['옷 가게', '작다', '크다', '대화 순서'],
    hint: {
      ko: '입어 보기 → 사이즈 문제 → 교환 제안 → 수락 순서예요.',
      uz: 'Kiyib ko‘rish → o‘lcham muammosi → almashtirish → rozilik.',
      en: 'Try on → size problem → exchange offer → acceptance.',
      ru: 'Примерка → проблема с размером → предложение обмена → согласие.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_067_listen_fill: {
    type: 'listen_fill',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenFill,
    sentenceTemplate:
      '이 옷은 ___ 들고 저한테 잘 ___. 그런데 사이즈가 조금 ___.',
    blankAnswers: ['마음에', '어울려요', '작아요'],
    answerTranslation: {
      ko: '이 옷은 마음에 들고 저한테 잘 어울려요. 그런데 사이즈가 조금 작아요.',
      uz: 'Bu kiyim menga yoqadi va yaxshi yarashadi. Lekin biroz kichik.',
      en: 'I like these clothes and they suit me, but the size is a little small.',
      ru: 'Мне нравится эта одежда и она мне идёт, но размер немного мал.',
    },
    difficulty: 5,
    tags: ['마음에 들다', '어울리다', '작다', '듣기'],
    hint: {
      ko: '선호 → 어울림 → 사이즈 순서로 들으세요.',
      uz: 'Yoqish → yarashish → o‘lcham tartibida tinglang.',
      en: 'Listen for preference → suitability → size.',
      ru: 'Слушайте в порядке: нравится → идёт → размер.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_068_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    instruction: I.cloze,
    passage:
      '옷을 사러 갔어요. 먼저 양복을 ___ 보고 구두도 ___. 거울을 보니까 옷은 저한테 잘 ___ 사이즈도 잘 ___. 가격도 별로 ___ 않아서 마음에 들었어요.',
    options: [
      '입어',
      '신어 봤어요',
      '어울리고',
      '맞았어요',
      '비싸지',
      '썼어요',
    ],
    answer: '입어|신어 봤어요|어울리고|맞았어요|비싸지',
    answerTranslation: {
      ko: '양복을 입어 보고 구두도 신어 봤어요. 옷은 잘 어울리고 사이즈도 잘 맞았으며 별로 비싸지 않았습니다.',
      uz: 'Kostyum va tuflini kiyib ko‘rdim. Kiyim yarashdi, o‘lchami mos va uncha qimmat emas edi.',
      en: 'I tried on a suit and shoes. They suited me, fit well, and were not very expensive.',
      ru: 'Я примерил костюм и туфли. Одежда мне шла, размер подошёл, и цена была не слишком высокой.',
    },
    difficulty: 5,
    tags: ['의복', '옷 가게', 'Node1 종합'],
    hint: {
      ko: '입어 보기 → 신어 보기 → 어울림 → 사이즈 → 가격 순서예요.',
      uz: 'Kiyim → oyoq kiyim → yarashish → o‘lcham → narx.',
      en: 'Follow try on clothes → shoes → suitability → fit → price.',
      ru: 'Порядок: одежда → обувь → идёт ли → размер → цена.',
    },
    xpReward: 25,
    isActive: true,
  },
  // ══════════════════════════════════════════════════════════
  // Unit 4 · Node 2 · ~것 같아요
  //
  // A-(으)ㄴ 것 같다
  // V-는 것 같다
  // N인 것 같다
  //
  // p.76 연습 1
  //
  // [보기]
  // 크다 → 큰 것 같아요.
  // 가다 → 가는 것 같아요.
  //
  // A
  // 작다 → 작은 것 같아요.
  // 따뜻하다 → 따뜻한 것 같아요.
  // 춥다 → 추운 것 같아요.
  // 맛있다 → 맛있는 것 같아요.
  // 재미없다 → 재미없는 것 같아요.
  // 바쁘지 않다 → 바쁘지 않은 것 같아요.
  //
  // V
  // 먹다 → 먹는 것 같아요.
  // 공부하다 → 공부하는 것 같아요.
  // 듣다 → 듣는 것 같아요.
  // 살다 → 사는 것 같아요.
  // 만들다 → 만드는 것 같아요.
  // 만나지 않다 → 만나지 않는 것 같아요.
  //
  // p.76 연습 2
  //
  // ① 슬픈 것 같아요.
  // ② 심심한 것 같아요.
  // ③ 피곤한 것 같아요.
  // ④ 기분이 좋은 것 같아요.
  // ⑤ 걱정이 있는 것 같아요.
  //
  // 그림 연결:
  // 1 → 심심한 것 같아요.
  // 2 → 피곤한 것 같아요.
  // 3 → 슬픈 것 같아요.
  // 4 → 기분이 좋은 것 같아요.
  // 5 → 걱정이 있는 것 같아요.
  //
  // p.77 연습 3
  //
  // [보기]
  // 물을 마시는 것 같아요.
  //
  // 1~6은 그림을 보고 학습자가 자유롭게 문장을 만드는 활동.
  // 원본에 고정 정답 문장은 인쇄되어 있지 않음.
  // 아래 1~6 관련 문항은 그림 동작을 이용한 앱용 예시 응답으로 처리.
  //
  // p.78 연습 4
  //
  // [보기]
  // A: 저 사람은 누구예요?
  // B: 히엔 씨 친구인 것 같아요.
  //    히엔 씨랑 같이 왔어요. (친구이다)
  //
  // 1)
  // A: 옷이 잘 맞으세요?
  // B: 음, 조금 작은 것 같아요. (조금 작다)
  //
  // 2)
  // A: 제가 빌려 준 책 다 읽었어요?
  // B: 아직 다 못 읽었어요.
  //    저한테 좀 어려운 것 같아요. (어렵다)
  //
  // 3)
  // A: 마리코 씨, 스티븐 씨 못 봤어요?
  // B: 아까 집에 갔어요.
  //    무슨 일이 있는 것 같아요. (무슨 일이 있다)
  //
  // 4)
  // A: 나나 씨가 샤오밍 씨를 좋아하는 것 같아요. (좋아하다)
  // B: 맞아요. 나나 씨는 샤오밍 씨를 보면 항상 웃어요.
  //
  // 5)
  // A: 스티븐 씨가 여자 친구하고 헤어졌어요?
  // B: 잘 모르겠지만 요즘 만나지 않는 것 같아요. (만나지 않다)
  //
  // 6)
  // A: 저 사람 알아요?
  // B: 아니요, 몰라요.
  //    우리 학교 학생이 아닌 것 같아요. (학생이 아니다)
  //
  // p.78 연습 5
  //
  // 우리 반 친구들은 어떤 것 같아요?
  // 왜 그렇게 생각해요?
  //
  // 교재 예시:
  // 줄리아 씨는 혼자 있는 것을 좋아하는 것 같아요.
  // 혼자 책을 읽거나 음악 듣는 것을 많이 봤어요.
  //
  // Grammar 전용 문제 타입 사용 금지.
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 어떻게 보이는지 말해요
  // p.76 연습 1 전체
  // ──────────────────────────────────────────────────────────

  s3u4_069_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '이 옷은 조금 ___ 것 같아요.',
    blankAnswers: ['큰'],
    options: ['큰', '크는', '클', '커서', '크게'],
    answerTranslation: {
      ko: '이 옷은 조금 큰 것 같아요.',
      uz: 'Bu kiyim biroz katta ko‘rinadi.',
      en: 'These clothes seem a little big.',
      ru: 'Кажется, эта одежда немного велика.',
    },
    difficulty: 3,
    tags: ['큰 것 같다', '크다', '교재76'],
    hint: {
      ko: '교재의 보기예요. 크다 → 큰 것 같아요.',
      uz: 'Darslik namunasi: 크다 → 큰 것 같아요.',
      en: 'Textbook example: 크다 → 큰 것 같아요.',
      ru: 'Пример учебника: 크다 → 큰 것 같아요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_070_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '이 옷은 조금 작은 것 같아요.',
    options: [
      '옷이 조금 작아 보여요.',
      '옷이 조금 커 보여요.',
      '옷이 아주 길어요.',
      '옷이 마음에 들어요.',
    ],
    answer: '옷이 조금 작아 보여요.',
    answerTranslation: {
      ko: '옷이 조금 작은 것 같다는 뜻입니다.',
      uz: 'Kiyim biroz kichikdek ko‘rinadi.',
      en: 'The clothes seem a little small.',
      ru: 'Кажется, одежда немного мала.',
    },
    difficulty: 3,
    tags: ['작은 것 같다', '작다', '듣기'],
    hint: {
      ko: '작다의 추측 표현을 들으세요.',
      uz: '작다 ning taxmin ifodasini tinglang.',
      en: 'Listen for the tentative form of 작다.',
      ru: 'Расслышьте форму предположения от 작다.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_071_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['오늘은', '날씨가', '따뜻한', '것 같아요', '따뜻하는', '비가'],
    answer: '오늘은 날씨가 따뜻한 것 같아요',
    answerTranslation: {
      ko: '오늘은 날씨가 따뜻한 것 같아요.',
      uz: 'Bugun havo iliqdek.',
      en: 'The weather seems warm today.',
      ru: 'Кажется, сегодня тепло.',
    },
    difficulty: 4,
    tags: ['따뜻한 것 같다', '따뜻하다'],
    hint: {
      ko: '따뜻하다 → 따뜻한 것 같아요.',
      uz: '따뜻하다 → 따뜻한 것 같아요.',
      en: '따뜻하다 becomes 따뜻한 것 같아요.',
      ru: '따뜻하다 → 따뜻한 것 같아요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_072_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate:
      '밖에 사람들이 두꺼운 옷을 입었어요. 날씨가 ___ 것 같아요.',
    blankAnswers: ['추운'],
    options: ['추운', '추는', '춥는', '추울', '추워서'],
    answerTranslation: {
      ko: '날씨가 추운 것 같아요.',
      uz: 'Havo sovuqdek.',
      en: 'It seems cold.',
      ru: 'Кажется, холодно.',
    },
    difficulty: 4,
    tags: ['추운 것 같다', '춥다'],
    hint: {
      ko: '춥다 → 추운이에요.',
      uz: '춥다 → 추운.',
      en: '춥다 becomes 추운.',
      ru: '춥다 превращается в 추운.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_073_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '이 음식은 맛있는 것 같아요.',
    acceptedAnswers: ['이 음식은 맛있는 것 같아요'],
    answerTranslation: {
      ko: '이 음식은 맛있는 것 같아요.',
      uz: 'Bu ovqat mazalidek.',
      en: 'This food seems delicious.',
      ru: 'Кажется, эта еда вкусная.',
    },
    difficulty: 4,
    tags: ['맛있는 것 같다', '맛있다', '듣기'],
    hint: {
      ko: '맛있다는 “맛있는 것 같아요”가 돼요.',
      uz: '맛있다 → 맛있는 것 같아요.',
      en: '맛있다 becomes 맛있는 것 같아요.',
      ru: '맛있다 → 맛있는 것 같아요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_074_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '영화 어때요?',
      },
    ],
    options: [
      '조금 재미없는 것 같아요.',
      '조금 재미없는 것 같아요.',
      '조금 재미없을 사람이에요.',
      '조금 재미없어 사람이에요.',
    ],
    answer: '조금 재미없는 것 같아요.',
    acceptedAnswers: ['조금 재미없는 것 같아요'],
    answerTranslation: {
      ko: '조금 재미없는 것 같아요.',
      uz: 'Biroz zerikarlidek.',
      en: 'It seems a little boring.',
      ru: 'Кажется, немного скучно.',
    },
    difficulty: 3,
    tags: ['재미없는 것 같다', '재미없다'],
    hint: {
      ko: '재미없다 → 재미없는이에요.',
      uz: '재미없다 → 재미없는.',
      en: '재미없다 becomes 재미없는.',
      ru: '재미없다 → 재미없는.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_075_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '요즘은 일이 많지 않아요. 별로 ___ 것 같아요.',
    blankAnswers: ['바쁘지 않은'],
    options: [
      '바쁘지 않은',
      '바쁘지 않는',
      '바쁘지 않을',
      '바쁘지 않아서',
      '바쁜',
    ],
    answerTranslation: {
      ko: '별로 바쁘지 않은 것 같아요.',
      uz: 'Unchalik band emasdek.',
      en: 'It seems they are not very busy.',
      ru: 'Кажется, он не очень занят.',
    },
    difficulty: 4,
    tags: ['바쁘지 않은 것 같다', '교재76'],
    hint: {
      ko: '교재 활용표의 “바쁘지 않다”예요.',
      uz: 'Bu jadvaldagi “바쁘지 않다”.',
      en: 'This comes from 바쁘지 않다 in the textbook table.',
      ru: 'Это форма от 바쁘지 않다 из таблицы.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_076_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '저 사람은 학교에 가는 것 같아요.',
    answer: '저 사람은 학교에 가는 것 같아요.',
    acceptedAnswers: ['저 사람은 학교에 가는 것 같아요'],
    answerTranslation: {
      ko: '저 사람은 학교에 가는 것 같아요.',
      uz: 'U odam maktabga ketayotganga o‘xshaydi.',
      en: 'That person seems to be going to school.',
      ru: 'Кажется, тот человек идёт в школу.',
    },
    difficulty: 4,
    tags: ['가는 것 같다', '가다', '말하기'],
    hint: {
      ko: '동작은 “가는 것 같아요”라고 말해요.',
      uz: 'Harakat uchun “가는 것 같아요”.',
      en: 'For an ongoing action, use 가는 것 같아요.',
      ru: 'Для действия используется 가는 것 같아요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_077_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '저 사람은 지금 점심을 ___ 것 같아요.',
    blankAnswers: ['먹는'],
    options: ['먹는', '먹은', '먹을', '먹어서', '먹고'],
    answerTranslation: {
      ko: '저 사람은 지금 점심을 먹는 것 같아요.',
      uz: 'U odam hozir tushlik qilayotganga o‘xshaydi.',
      en: 'That person seems to be eating lunch now.',
      ru: 'Кажется, тот человек сейчас обедает.',
    },
    difficulty: 3,
    tags: ['먹는 것 같다', '먹다'],
    hint: {
      ko: '현재 하는 동작이에요.',
      uz: 'Bu hozirgi harakat.',
      en: 'It is an action happening now.',
      ru: 'Это действие происходит сейчас.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_078_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '도서관에서 공부하는 것 같아요.',
    options: [
      '공부하고 있는 것 같아요.',
      '잠을 자는 것 같아요.',
      '운동하는 것 같아요.',
      '쇼핑하는 것 같아요.',
    ],
    answer: '공부하고 있는 것 같아요.',
    answerTranslation: {
      ko: '도서관에서 공부하는 것 같다는 뜻입니다.',
      uz: 'Kutubxonada o‘qiyotganga o‘xshaydi.',
      en: 'It seems the person is studying at the library.',
      ru: 'Кажется, человек занимается в библиотеке.',
    },
    difficulty: 3,
    tags: ['공부하는 것 같다', '듣기'],
    hint: {
      ko: '장소와 하고 있는 행동을 함께 들으세요.',
      uz: 'Joy va harakatni birga tinglang.',
      en: 'Listen for both the place and the action.',
      ru: 'Расслышьте и место, и действие.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_079_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['음악을', '듣는', '것 같아요', '저 사람은', '들은', '음악이'],
    answer: '저 사람은 음악을 듣는 것 같아요',
    answerTranslation: {
      ko: '저 사람은 음악을 듣는 것 같아요.',
      uz: 'U odam musiqa tinglayotganga o‘xshaydi.',
      en: 'That person seems to be listening to music.',
      ru: 'Кажется, тот человек слушает музыку.',
    },
    difficulty: 4,
    tags: ['듣는 것 같다', '듣다'],
    hint: {
      ko: '듣다 → 듣는 것 같아요.',
      uz: '듣다 → 듣는 것 같아요.',
      en: '듣다 becomes 듣는 것 같아요.',
      ru: '듣다 → 듣는 것 같아요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_080_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '윌슨 씨는 서울에 ___ 것 같아요.',
    blankAnswers: ['사는'],
    options: ['사는', '살는', '살은', '살을', '살아서'],
    answerTranslation: {
      ko: '윌슨 씨는 서울에 사는 것 같아요.',
      uz: 'Uilson Seulda yashaydigan ko‘rinadi.',
      en: 'Wilson seems to live in Seoul.',
      ru: 'Кажется, Уилсон живёт в Сеуле.',
    },
    difficulty: 4,
    tags: ['사는 것 같다', '살다'],
    hint: {
      ko: '살다의 ㄹ이 빠져서 “사는”이 돼요.',
      uz: '살다 dagi ㄹ tushib, “사는” bo‘ladi.',
      en: 'The ㄹ in 살다 drops: 사는.',
      ru: 'В 살다 ㄹ выпадает: 사는.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_081_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '지금 저녁을 만드는 것 같아요.',
    acceptedAnswers: ['지금 저녁을 만드는 것 같아요'],
    answerTranslation: {
      ko: '지금 저녁을 만드는 것 같아요.',
      uz: 'Hozir kechki ovqat tayyorlayotganga o‘xshaydi.',
      en: 'It seems they are making dinner now.',
      ru: 'Кажется, сейчас готовят ужин.',
    },
    difficulty: 4,
    tags: ['만드는 것 같다', '만들다', '듣기'],
    hint: {
      ko: '만들다 → 만드는이에요.',
      uz: '만들다 → 만드는.',
      en: '만들다 becomes 만드는.',
      ru: '만들다 → 만드는.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_082_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '두 사람은 요즘 서로 ___ 것 같아요.',
    blankAnswers: ['만나지 않는'],
    options: [
      '만나지 않는',
      '만나지 않은',
      '만나지 않을',
      '만나지 않아서',
      '만난',
    ],
    answerTranslation: {
      ko: '두 사람은 요즘 서로 만나지 않는 것 같아요.',
      uz: 'Bu ikki kishi oxirgi paytda uchrashmayotganga o‘xshaydi.',
      en: 'The two people do not seem to be seeing each other these days.',
      ru: 'Кажется, в последнее время они не встречаются.',
    },
    difficulty: 4,
    tags: ['만나지 않는 것 같다', '교재76'],
    hint: {
      ko: '동사 부정도 현재 행동이면 “-지 않는”이에요.',
      uz: 'Fe’l inkorida hozirgi harakat uchun “-지 않는”.',
      en: 'A negative current verb uses -지 않는.',
      ru: 'Отрицательный глагол в настоящем: -지 않는.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_083_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '상황에 가장 자연스러운 말을 고르세요.',
      uz: 'Vaziyatga eng tabiiy gapni tanlang.',
      en: 'Choose the most natural sentence for the situation.',
      ru: 'Выберите наиболее естественное предложение.',
    },
    passage: '밖을 보니 사람들이 두꺼운 옷을 입고 손을 주머니에 넣고 있습니다.',
    options: [
      '날씨가 추운 것 같아요.',
      '날씨가 추는 것 같아요.',
      '날씨가 먹는 것 같아요.',
      '날씨가 학생인 것 같아요.',
    ],
    answer: '날씨가 추운 것 같아요.',
    answerTranslation: {
      ko: '사람들의 모습을 보고 날씨가 춥다고 추측할 수 있습니다.',
      uz: 'Odamlarning kiyimiga qarab havo sovuq deb taxmin qilish mumkin.',
      en: 'Their clothing suggests that the weather is cold.',
      ru: 'По одежде людей можно предположить, что холодно.',
    },
    difficulty: 4,
    tags: ['추측', '추운 것 같다'],
    hint: {
      ko: '직접 확인한 사실이 아니라 보이는 상황으로 추측해요.',
      uz: 'Ko‘rinayotgan holatdan taxmin qiling.',
      en: 'Infer from what you can observe.',
      ru: 'Сделайте вывод по наблюдаемой ситуации.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_084_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.cloze,
    passage:
      '상황을 보고 추측해 봐요. 이 옷은 조금 ___ 것 같고, 음식은 ___ 것 같아요. 저 사람은 학교에 ___ 것 같고, 서울에 ___ 것 같아요.',
    options: ['작은', '맛있는', '가는', '사는', '먹는'],
    answer: '작은|맛있는|가는|사는',
    answerTranslation: {
      ko: '작은, 맛있는, 가는, 사는을 사용합니다.',
      uz: '작은, 맛있는, 가는, 사는 shakllari ishlatiladi.',
      en: 'Use 작은, 맛있는, 가는, and 사는.',
      ru: 'Используются 작은, 맛있는, 가는 и 사는.',
    },
    difficulty: 5,
    tags: ['연습1', '활용 종합'],
    hint: {
      ko: '형용사 두 개와 동사 두 개를 구별하세요.',
      uz: 'Ikki sifat va ikki fe’lni farqlang.',
      en: 'Distinguish the two adjectives from the two verbs.',
      ru: 'Различите два прилагательных и два глагола.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_085_dialog_order: {
    type: 'dialog_order',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialogOrder,
    dialogLines: [
      {
        speaker: 'npc',
        text: '밖에 날씨가 어때요?',
      },
      {
        speaker: 'user',
        text: '사람들이 두꺼운 옷을 입고 있어요.',
      },
      {
        speaker: 'npc',
        text: '많이 추워요?',
      },
      {
        speaker: 'user',
        text: '네, 추운 것 같아요.',
      },
    ],
    answer: 'all_correct',
    answerTranslation: {
      ko: '보이는 상황을 근거로 날씨가 추운 것 같다고 추측하는 대화입니다.',
      uz: 'Ko‘rinayotgan holat asosida havo sovuq deb taxmin qilinadi.',
      en: 'The speaker infers that it is cold from what people are wearing.',
      ru: 'Говорящий предполагает, что холодно, по одежде людей.',
    },
    difficulty: 5,
    tags: ['연습1', '추측', '대화 순서'],
    hint: {
      ko: '관찰한 사실이 먼저 나오고 그다음 추측이 나와요.',
      uz: 'Avval kuzatuv, keyin taxmin.',
      en: 'The observation comes before the inference.',
      ru: 'Сначала наблюдение, затем предположение.',
    },
    xpReward: 25,
    isActive: true,
  },

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 표정을 보고 추측해요
  // p.76 연습 2 + p.77 연습 3
  //
  // p.77 연습 3의 1~6은 인쇄된 정답이 없는 그림 자유 활동.
  // 관련 문항은 그림 해석 기반 앱용 예시 응답.
  // ──────────────────────────────────────────────────────────

  s3u4_086_word_matching: {
    type: 'word_matching',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    instruction: I.match,
    answer: '',
    pairs: [
      { korean: '슬프다', native: 'Xafa' },
      { korean: '심심하다', native: 'Zerikmoq' },
      { korean: '피곤하다', native: 'Charchamoq' },
      { korean: '기분', native: 'Kayfiyat' },
      { korean: '걱정', native: 'Xavotir' },
    ],
    answerTranslation: {
      ko: '슬프다, 심심하다, 피곤하다, 기분, 걱정',
      uz: 'Xafa, zerikmoq, charchamoq, kayfiyat, xavotir',
      en: 'Sad, bored, tired, mood, worry',
      ru: 'Грустный, скучать, уставший, настроение, беспокойство',
    },
    difficulty: 2,
    tags: ['감정', '교재76'],
    hint: {
      ko: '연습 2의 다섯 상태를 나타내는 말이에요.',
      uz: '2-mashqdagi besh holat.',
      en: 'These describe the five states in Exercise 2.',
      ru: 'Это пять состояний из упражнения 2.',
    },
    xpReward: 10,
    isActive: true,
  },

  s3u4_087_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '심심한 것 같아요.',
    options: [
      '할 일이 없어서 지루해 보여요.',
      '아주 기분이 좋아 보여요.',
      '걱정이 많아 보여요.',
      '맛있는 것을 먹고 있어요.',
    ],
    answer: '할 일이 없어서 지루해 보여요.',
    answerTranslation: {
      ko: '심심해 보인다는 뜻입니다.',
      uz: 'Zerikkanga o‘xshaydi.',
      en: 'The person seems bored.',
      ru: 'Кажется, человеку скучно.',
    },
    difficulty: 3,
    tags: ['심심한 것 같다', '연습2'],
    hint: {
      ko: '교재 그림 1과 연결되는 표현이에요.',
      uz: 'Bu darslikdagi 1-rasmga mos.',
      en: 'This matches picture 1 in the textbook.',
      ru: 'Это соответствует рисунку 1.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_088_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '오늘 일이 많았어요?',
      },
    ],
    options: [
      '네, 많이 피곤한 것 같아요.',
      '네, 많이 피곤하는 것 같아요.',
      '네, 많이 피곤을 것 같아요.',
      '네, 많이 학생인 것 같아요.',
    ],
    answer: '네, 많이 피곤한 것 같아요.',
    acceptedAnswers: ['네 많이 피곤한 것 같아요'],
    answerTranslation: {
      ko: '네, 많이 피곤한 것 같아요.',
      uz: 'Ha, juda charchaganga o‘xshaydi.',
      en: 'Yes, the person seems very tired.',
      ru: 'Да, кажется, человек очень устал.',
    },
    difficulty: 3,
    tags: ['피곤한 것 같다', '연습2'],
    hint: {
      ko: '피곤하다 → 피곤한 것 같아요.',
      uz: '피곤하다 → 피곤한 것 같아요.',
      en: '피곤하다 becomes 피곤한 것 같아요.',
      ru: '피곤하다 → 피곤한 것 같아요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_089_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '표정을 보니까 조금 ___ 것 같아요.',
    blankAnswers: ['슬픈'],
    options: ['슬픈', '슬프는', '슬플', '슬퍼서', '슬프게'],
    answerTranslation: {
      ko: '조금 슬픈 것 같아요.',
      uz: 'Biroz xafadek.',
      en: 'The person seems a little sad.',
      ru: 'Кажется, человек немного грустит.',
    },
    difficulty: 3,
    tags: ['슬픈 것 같다', '연습2'],
    hint: {
      ko: '교재 그림 3은 슬퍼 보이는 모습이에요.',
      uz: '3-rasm xafa ko‘rinishni bildiradi.',
      en: 'Picture 3 shows someone who looks sad.',
      ru: 'На рисунке 3 человек выглядит грустным.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_090_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '기분이 좋은 것 같아요.',
    answer: '기분이 좋은 것 같아요.',
    acceptedAnswers: ['기분이 좋은 것 같아요'],
    answerTranslation: {
      ko: '기분이 좋은 것 같아요.',
      uz: 'Kayfiyati yaxshi ko‘rinadi.',
      en: 'The person seems to be in a good mood.',
      ru: 'Кажется, у человека хорошее настроение.',
    },
    difficulty: 4,
    tags: ['기분이 좋은 것 같다', '연습2', '말하기'],
    hint: {
      ko: '교재 그림 4의 표현이에요.',
      uz: 'Bu 4-rasm ifodasi.',
      en: 'This is the expression for picture 4.',
      ru: 'Это выражение для рисунка 4.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_091_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    instruction: {
      ko: '표정이 어둡고 계속 생각에 잠겨 있습니다. 가장 자연스러운 추측은 무엇입니까?',
      uz: 'Yuzi tashvishli va o‘ychan. Eng tabiiy taxmin qaysi?',
      en: 'The person looks worried and deep in thought. What is the best inference?',
      ru: 'Человек выглядит обеспокоенным и задумчивым. Какое предположение естественнее?',
    },
    passage: '말을 거의 하지 않고 표정이 어둡습니다.',
    options: [
      '걱정이 있는 것 같아요.',
      '기분이 아주 좋은 것 같아요.',
      '맛있는 것 같아요.',
      '신발을 신는 것 같아요.',
    ],
    answer: '걱정이 있는 것 같아요.',
    answerTranslation: {
      ko: '걱정이 있는 것 같다고 추측할 수 있습니다.',
      uz: 'Biror tashvishi bordek.',
      en: 'It seems the person has something to worry about.',
      ru: 'Кажется, человека что-то беспокоит.',
    },
    difficulty: 4,
    tags: ['걱정이 있는 것 같다', '연습2'],
    hint: {
      ko: '교재 그림 5와 연결되는 표현이에요.',
      uz: 'Bu 5-rasmga mos ifoda.',
      en: 'This matches picture 5.',
      ru: 'Это соответствует рисунку 5.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_092_audio_match: {
    type: 'audio_match',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.audioMatch,
    answer: '',
    pairs: [
      { korean: '슬프다', native: 'Xafa' },
      { korean: '심심하다', native: 'Zerikmoq' },
      { korean: '피곤하다', native: 'Charchamoq' },
      { korean: '기분', native: 'Kayfiyat' },
      { korean: '걱정', native: 'Xavotir' },
    ],
    answerTranslation: {
      ko: '슬프다, 심심하다, 피곤하다, 기분, 걱정',
      uz: 'Xafa, zerikmoq, charchamoq, kayfiyat, xavotir',
      en: 'Sad, bored, tired, mood, worry',
      ru: 'Грустный, скучать, уставший, настроение, беспокойство',
    },
    difficulty: 3,
    tags: ['연습2', '감정', '듣기'],
    hint: {
      ko: '다섯 상태의 소리를 구별하세요.',
      uz: 'Besh holat so‘zini tinglab farqlang.',
      en: 'Distinguish the five state words by sound.',
      ru: 'Различайте пять слов на слух.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_093_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '그림을 보니까 물을 ___ 것 같아요.',
    blankAnswers: ['마시는'],
    options: ['마시는', '마신', '마실', '마셔서', '마시고'],
    answerTranslation: {
      ko: '물을 마시는 것 같아요.',
      uz: 'Suv ichayotganga o‘xshaydi.',
      en: 'It looks like she is drinking water.',
      ru: 'Кажется, она пьёт воду.',
    },
    difficulty: 3,
    tags: ['연습3 보기', '마시는 것 같다', '교재77'],
    hint: {
      ko: '77쪽 연습 3의 인쇄된 보기 문장이에요.',
      uz: 'Bu 77-betdagi bosma namuna.',
      en: 'This is the printed example on page 77.',
      ru: 'Это напечатанный пример на странице 77.',
    },
    xpReward: 15,
    isActive: true,
  },

  // p.77 그림 1 — 고정답 없음. 앱용 그림 해석 예시.
  s3u4_094_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '그림 속 손동작을 보고 가장 자연스러운 추측을 고르세요.',
      uz: 'Rasmdagi qo‘l harakatiga qarab eng tabiiy taxminni tanlang.',
      en: 'Look at the hand motion and choose the most natural inference.',
      ru: 'По движению рук выберите наиболее естественное предположение.',
    },
    passage: '두 손의 손가락을 아래로 움직이는 모습입니다.',
    options: [
      '피아노를 치는 것 같아요.',
      '물을 마시는 것 같아요.',
      '잠을 자는 것 같아요.',
      '구두를 신는 것 같아요.',
    ],
    answer: '피아노를 치는 것 같아요.',
    answerTranslation: {
      ko: '앱에서는 그림 1을 피아노를 치는 동작으로 해석해 연습합니다.',
      uz: 'Ilovada 1-rasm pianino chalish harakati sifatida ishlatiladi.',
      en: 'For the app, picture 1 is interpreted as playing the piano.',
      ru: 'В приложении рисунок 1 трактуется как игра на пианино.',
    },
    difficulty: 4,
    tags: ['연습3-1', '그림 적응', '치는 것 같다'],
    hint: {
      ko: '원본은 자유 문장 만들기라 고정 정답이 없어요.',
      uz: 'Asl topshiriq erkin, bosma javob yo‘q.',
      en: 'The source is open-ended and has no printed fixed answer.',
      ru: 'Исходное задание открытое, фиксированного ответа нет.',
    },
    xpReward: 20,
    isActive: true,
  },

  // p.77 그림 2 — 고정답 없음. 앱용 그림 해석 예시.
  s3u4_095_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '그림 속 동작을 추측하는 앱 예시 문장을 말하세요.',
      uz: 'Rasmdagi harakatni taxmin qiluvchi ilova namunasini ayting.',
      en: 'Say the app model sentence inferring the action in the picture.',
      ru: 'Произнесите пример приложения с предположением о действии.',
    },
    audioText: '무언가를 열려고 하는 것 같아요.',
    answer: '무언가를 열려고 하는 것 같아요.',
    acceptedAnswers: ['무언가를 열려고 하는 것 같아요'],
    answerTranslation: {
      ko: '무언가를 열려고 하는 것 같아요.',
      uz: 'Biror narsani ochmoqchi bo‘lganga o‘xshaydi.',
      en: 'It looks like she is trying to open something.',
      ru: 'Кажется, она пытается что-то открыть.',
    },
    difficulty: 4,
    tags: ['연습3-2', '그림 적응', '말하기'],
    hint: {
      ko: '원본 그림에는 정답 문장이 적혀 있지 않아요.',
      uz: 'Asl rasmda javob gapi yozilmagan.',
      en: 'No answer sentence is printed for this picture.',
      ru: 'Для этого рисунка ответ не напечатан.',
    },
    xpReward: 15,
    isActive: true,
  },

  // p.77 그림 3 — 고정답 없음. 앱용 그림 해석 예시.
  s3u4_096_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '그림을 보고 앱 예시 문장을 완성하세요.',
      uz: 'Rasmga qarab ilova namunasini to‘ldiring.',
      en: 'Complete the app model sentence based on the picture.',
      ru: 'Дополните пример приложения по рисунку.',
    },
    sentenceTemplate: '사진을 ___ 것 같아요.',
    blankAnswers: ['찍는'],
    options: ['찍는', '찍은', '찍을', '찍어서', '찍고'],
    answerTranslation: {
      ko: '사진을 찍는 것 같아요.',
      uz: 'Suratga olayotganga o‘xshaydi.',
      en: 'It looks like she is taking a photo.',
      ru: 'Кажется, она фотографирует.',
    },
    difficulty: 4,
    tags: ['연습3-3', '그림 적응', '찍는 것 같다'],
    hint: {
      ko: '그림 3의 손에 든 물건을 카메라로 해석한 앱 예시예요.',
      uz: 'Ilovada 3-rasmdagi buyum kamera sifatida talqin qilinadi.',
      en: 'The app interprets the object in picture 3 as a camera.',
      ru: 'В приложении предмет на рисунке 3 трактуется как камера.',
    },
    xpReward: 20,
    isActive: true,
  },

  // p.77 그림 4 — 고정답 없음. 앱용 그림 해석 예시.
  s3u4_097_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '무언가를 먹는 것 같아요.',
    options: [
      '먹는 동작으로 보여요.',
      '자는 동작으로 보여요.',
      '신발을 신는 동작으로 보여요.',
      '운전하는 동작으로 보여요.',
    ],
    answer: '먹는 동작으로 보여요.',
    answerTranslation: {
      ko: '앱에서는 그림 4를 무언가를 먹는 동작으로 해석합니다.',
      uz: 'Ilovada 4-rasm ovqat yeyish harakati sifatida talqin qilinadi.',
      en: 'The app interprets picture 4 as an eating action.',
      ru: 'В приложении рисунок 4 трактуется как приём пищи.',
    },
    difficulty: 3,
    tags: ['연습3-4', '그림 적응', '듣기'],
    hint: {
      ko: '입 근처의 손동작을 보세요.',
      uz: 'Og‘iz yonidagi qo‘l harakatiga qarang.',
      en: 'Focus on the hand movement near the mouth.',
      ru: 'Обратите внимание на движение руки у рта.',
    },
    xpReward: 15,
    isActive: true,
  },

  // p.77 그림 5 — 고정답 없음. 앱용 그림 해석 예시.
  s3u4_098_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '저 사람 뭐 하는 것 같아요?',
    options: ['옷을', '입는', '것 같아요', '신는', '물을'],
    answer: '옷을 입는 것 같아요',
    answerTranslation: {
      ko: '옷을 입는 것 같아요.',
      uz: 'Kiyim kiyayotganga o‘xshaydi.',
      en: 'It looks like she is putting on clothes.',
      ru: 'Кажется, она одевается.',
    },
    difficulty: 4,
    tags: ['연습3-5', '그림 적응', '입는 것 같다'],
    hint: {
      ko: '앱에서는 소매를 정리하는 동작을 옷을 입는 모습으로 해석해요.',
      uz: 'Ilovada yeng harakati kiyinish sifatida talqin qilinadi.',
      en: 'The app interprets the sleeve movement as getting dressed.',
      ru: 'В приложении движение с рукавом трактуется как одевание.',
    },
    xpReward: 25,
    isActive: true,
  },

  // p.77 그림 6 — 고정답 없음. 앱용 그림 해석 예시.
  s3u4_099_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '글을 쓰는 것 같아요.',
    acceptedAnswers: ['글을 쓰는 것 같아요'],
    answerTranslation: {
      ko: '글을 쓰는 것 같아요.',
      uz: 'Biror narsa yozayotganga o‘xshaydi.',
      en: 'It looks like she is writing.',
      ru: 'Кажется, она пишет.',
    },
    difficulty: 4,
    tags: ['연습3-6', '그림 적응', '쓰는 것 같다'],
    hint: {
      ko: '앱에서는 책상 위 손동작을 글쓰기 모습으로 해석해요.',
      uz: 'Ilovada stol ustidagi harakat yozish sifatida talqin qilinadi.',
      en: 'The app interprets the desk action as writing.',
      ru: 'В приложении действие за столом трактуется как письмо.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_100_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '직접 보지 않고 표정이나 행동을 근거로 판단할 때 가장 알맞은 표현은 무엇입니까?',
      uz: 'Ko‘rinish yoki harakatdan taxmin qilganda qaysi ifoda mos?',
      en: 'Which expression is best when inferring from appearance or behavior?',
      ru: 'Какое выражение подходит для вывода по внешности или поведению?',
    },
    passage: '사람의 표정과 행동을 보고 현재 상태를 추측합니다.',
    options: [
      '피곤한 것 같아요.',
      '피곤하다고 확실히 알아요.',
      '피곤할 줄 알아요.',
      '피곤하러 가요.',
    ],
    answer: '피곤한 것 같아요.',
    answerTranslation: {
      ko: '상태를 확정하지 않고 추측할 때 “것 같아요”를 사용합니다.',
      uz: 'Holatni aniq bilmay, taxmin qilganda “것 같아요”.',
      en: '것 같아요 expresses a tentative inference rather than certainty.',
      ru: '것 같아요 выражает предположение, а не уверенность.',
    },
    difficulty: 4,
    tags: ['추측', '것 같다'],
    hint: {
      ko: '“확실하다”보다 부드러운 판단이에요.',
      uz: 'Bu aniq hukmdan yumshoqroq taxmin.',
      en: 'It is softer than stating something as certain.',
      ru: 'Это более мягкое предположение, чем уверенное утверждение.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_101_dialog_order: {
    type: 'dialog_order',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialogOrder,
    dialogLines: [
      {
        speaker: 'npc',
        text: '민수 씨 오늘 왜 말이 없어요?',
      },
      {
        speaker: 'user',
        text: '아침부터 계속 일했어요.',
      },
      {
        speaker: 'npc',
        text: '많이 피곤해 보여요.',
      },
      {
        speaker: 'user',
        text: '네, 피곤한 것 같아요.',
      },
    ],
    answer: 'all_correct',
    answerTranslation: {
      ko: '계속 일한 상황을 근거로 피곤한 것 같다고 추측하는 대화입니다.',
      uz: 'Ko‘p ishlaganiga qarab charchagan deb taxmin qilinadi.',
      en: 'The dialogue infers tiredness from having worked continuously.',
      ru: 'Усталость предполагается на основании долгой работы.',
    },
    difficulty: 5,
    tags: ['피곤한 것 같다', '대화 순서'],
    hint: {
      ko: '행동에 대한 정보 뒤에 상태를 추측해요.',
      uz: 'Harakat haqidagi ma’lumotdan keyin holat taxmin qilinadi.',
      en: 'The inference follows the information about the person’s activity.',
      ru: 'Предположение следует после информации о действиях.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_102_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.cloze,
    passage:
      '표정을 보고 추측해 봐요. 혼자 가만히 앉아 있어서 ___ 것 같아요. 책상에서 계속 공부해서 ___ 것 같아요. 울 것 같은 표정이라 ___ 것 같아요. 웃고 있어서 기분이 ___ 것 같아요. 표정이 어두워서 걱정이 ___ 것 같아요.',
    options: ['심심한', '피곤한', '슬픈', '좋은', '있는'],
    answer: '심심한|피곤한|슬픈|좋은|있는',
    answerTranslation: {
      ko: '심심한, 피곤한, 슬픈, 좋은, 있는을 사용합니다.',
      uz: '심심한, 피곤한, 슬픈, 좋은, 있는 shakllari ishlatiladi.',
      en: 'Use 심심한, 피곤한, 슬픈, 좋은, and 있는.',
      ru: 'Используются 심심한, 피곤한, 슬픈, 좋은 и 있는.',
    },
    difficulty: 5,
    tags: ['연습2', '감정 종합'],
    hint: {
      ko: '교재 연습 2의 다섯 표현 순서예요.',
      uz: 'Bu 2-mashqdagi besh ifoda.',
      en: 'These are the five expressions from Exercise 2.',
      ru: 'Это пять выражений из упражнения 2.',
    },
    xpReward: 25,
    isActive: true,
  },

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 사람과 상황을 추측해요
  // p.78 연습 4 전체
  // ──────────────────────────────────────────────────────────

  s3u4_103_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '저 사람은 누구예요?',
      },
    ],
    options: [
      '히엔 씨 친구인 것 같아요. 히엔 씨랑 같이 왔어요.',
      '히엔 씨 친구는 것 같아요.',
      '히엔 씨 친구한 것 같아요.',
      '히엔 씨가 친구를 먹는 것 같아요.',
    ],
    answer: '히엔 씨 친구인 것 같아요. 히엔 씨랑 같이 왔어요.',
    acceptedAnswers: ['히엔 씨 친구인 것 같아요 히엔 씨랑 같이 왔어요'],
    answerTranslation: {
      ko: '히엔 씨 친구인 것 같아요. 히엔 씨랑 같이 왔어요.',
      uz: 'Hienning do‘sti shekilli. Hien bilan birga keldi.',
      en: 'I think the person is Hien’s friend. They came with Hien.',
      ru: 'Кажется, это друг Хиен. Они пришли вместе.',
    },
    difficulty: 3,
    tags: ['친구인 것 같다', '연습4 보기', '교재78'],
    hint: {
      ko: '명사 “친구” 뒤에는 “인 것 같아요”를 사용해요.',
      uz: '“친구” otidan keyin “인 것 같아요”.',
      en: 'A noun such as 친구 uses 인 것 같아요.',
      ru: 'После существительного 친구 используется 인 것 같아요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_104_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: 'A: 옷이 잘 맞으세요?\nB: 음, 조금 ___ 것 같아요.',
    blankAnswers: ['작은'],
    options: ['작은', '작는', '작을', '작아서', '작게'],
    answerTranslation: {
      ko: '음, 조금 작은 것 같아요.',
      uz: 'Hmm, biroz kichikdek.',
      en: 'Hmm, it seems a little small.',
      ru: 'Хм, кажется, немного мало.',
    },
    difficulty: 3,
    tags: ['작은 것 같다', '연습4-1'],
    hint: {
      ko: '작다 → 작은이에요.',
      uz: '작다 → 작은.',
      en: '작다 becomes 작은.',
      ru: '작다 → 작은.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_105_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '아직 다 못 읽었어요. 저한테 좀 어려운 것 같아요.',
    options: [
      '책이 조금 어려워 보여요.',
      '책을 이미 다 읽었어요.',
      '책이 아주 쉬운 것 같아요.',
      '책을 잃어버린 것 같아요.',
    ],
    answer: '책이 조금 어려워 보여요.',
    answerTranslation: {
      ko: '책이 어려워서 아직 다 읽지 못한 것 같습니다.',
      uz: 'Kitob qiyin bo‘lgani uchun hali tugatmagan ko‘rinadi.',
      en: 'The book seems difficult, so it has not been finished yet.',
      ru: 'Книга кажется трудной, поэтому её ещё не дочитали.',
    },
    difficulty: 3,
    tags: ['어려운 것 같다', '연습4-2', '듣기'],
    hint: {
      ko: '책을 아직 다 읽지 못한 이유를 들으세요.',
      uz: 'Nega kitob tugatilmaganini tinglang.',
      en: 'Listen for why the book has not been finished.',
      ru: 'Расслышьте причину, почему книгу не дочитали.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_106_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '마리코 씨, 스티븐 씨 못 봤어요?',
    options: [
      '아까',
      '집에 갔어요',
      '무슨 일이',
      '있는 것 같아요',
      '먹는',
      '학생인',
    ],
    answer: '아까 집에 갔어요 무슨 일이 있는 것 같아요',
    answerTranslation: {
      ko: '아까 집에 갔어요. 무슨 일이 있는 것 같아요.',
      uz: 'Biroz oldin uyga ketdi. Biror ish bo‘lganga o‘xshaydi.',
      en: 'He went home earlier. It seems something happened.',
      ru: 'Он недавно ушёл домой. Кажется, что-то случилось.',
    },
    difficulty: 4,
    tags: ['일이 있는 것 같다', '연습4-3'],
    hint: {
      ko: '갑자기 집에 간 행동을 근거로 이유를 추측해요.',
      uz: 'To‘satdan uyga ketganidan sababni taxmin qiling.',
      en: 'Infer a reason from the fact that he suddenly went home.',
      ru: 'Сделайте предположение по тому, что он внезапно ушёл домой.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_107_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: [
      '나나 씨가',
      '샤오밍 씨를',
      '좋아하는',
      '것 같아요',
      '좋아한',
      '학생인',
    ],
    answer: '나나 씨가 샤오밍 씨를 좋아하는 것 같아요',
    answerTranslation: {
      ko: '나나 씨가 샤오밍 씨를 좋아하는 것 같아요.',
      uz: 'Nana Xiaomingni yoqtiradiganga o‘xshaydi.',
      en: 'It seems Nana likes Xiaoming.',
      ru: 'Кажется, Нане нравится Сяомин.',
    },
    difficulty: 4,
    tags: ['좋아하는 것 같다', '연습4-4'],
    hint: {
      ko: '좋아하다는 동사이므로 “좋아하는”이에요.',
      uz: '좋아하다 fe’l, shuning uchun “좋아하는”.',
      en: '좋아하다 is a verb, so use 좋아하는.',
      ru: '좋아하다 — глагол, поэтому 좋아하는.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_108_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '잘 모르겠지만 요즘 만나지 않는 것 같아요.',
    acceptedAnswers: ['잘 모르겠지만 요즘 만나지 않는 것 같아요'],
    answerTranslation: {
      ko: '잘 모르겠지만 요즘 만나지 않는 것 같아요.',
      uz: 'Aniq bilmayman, lekin oxirgi paytda uchrashmayotganga o‘xshaydi.',
      en: 'I am not sure, but it seems they have not been seeing each other lately.',
      ru: 'Не уверен, но, кажется, в последнее время они не встречаются.',
    },
    difficulty: 5,
    tags: ['만나지 않는 것 같다', '연습4-5', '듣기'],
    hint: {
      ko: '교재에서는 “잘 모르겠지만”으로 추측임을 더 분명히 해요.',
      uz: '“잘 모르겠지만” bu taxmin ekanini ko‘rsatadi.',
      en: '잘 모르겠지만 makes the uncertainty explicit.',
      ru: '잘 모르겠지만 подчёркивает неуверенность.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_109_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate:
      'A: 저 사람 알아요?\nB: 아니요, 몰라요. 우리 학교 학생이 ___ 것 같아요.',
    blankAnswers: ['아닌'],
    options: ['아닌', '아니는', '아닐는', '아니어서', '없는'],
    answerTranslation: {
      ko: '우리 학교 학생이 아닌 것 같아요.',
      uz: 'Bizning maktab talabasi emasdek.',
      en: 'I do not think the person is a student at our school.',
      ru: 'Кажется, это не студент нашей школы.',
    },
    difficulty: 4,
    tags: ['학생이 아닌 것 같다', '연습4-6'],
    hint: {
      ko: '학생이 아니다 → 학생이 아닌 것 같아요.',
      uz: '학생이 아니다 → 학생이 아닌 것 같아요.',
      en: '학생이 아니다 becomes 학생이 아닌 것 같아요.',
      ru: '학생이 아니다 → 학생이 아닌 것 같아요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_110_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '히엔 씨 친구인 것 같아요. 히엔 씨랑 같이 왔어요.',
    answer: '히엔 씨 친구인 것 같아요. 히엔 씨랑 같이 왔어요.',
    acceptedAnswers: ['히엔 씨 친구인 것 같아요 히엔 씨랑 같이 왔어요'],
    answerTranslation: {
      ko: '히엔 씨 친구인 것 같아요. 히엔 씨랑 같이 왔어요.',
      uz: 'Hienning do‘sti shekilli. Hien bilan birga keldi.',
      en: 'I think the person is Hien’s friend. They came together.',
      ru: 'Кажется, это друг Хиен. Они пришли вместе.',
    },
    difficulty: 4,
    tags: ['친구인 것 같다', '말하기'],
    hint: {
      ko: '추측과 그 근거를 이어서 말하세요.',
      uz: 'Taxmin va uning sababini birga ayting.',
      en: 'State the inference and then its evidence.',
      ru: 'Скажите предположение и его основание.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_111_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '옷이 잘 맞으세요? 음, 조금 작은 것 같아요.',
    options: [
      '옷이 조금 작다고 생각해요.',
      '옷이 아주 크다고 생각해요.',
      '옷이 마음에 들지 않아요.',
      '옷을 아직 입어 보지 않았어요.',
    ],
    answer: '옷이 조금 작다고 생각해요.',
    answerTranslation: {
      ko: '입어 본 옷이 조금 작은 것 같다고 말합니다.',
      uz: 'Kiyim biroz kichikdek deb aytyapti.',
      en: 'The speaker thinks the clothes seem a little small.',
      ru: 'Говорящий считает, что одежда немного мала.',
    },
    difficulty: 3,
    tags: ['작은 것 같다', '듣기'],
    hint: {
      ko: '사이즈에 대한 판단을 들으세요.',
      uz: 'O‘lcham haqidagi fikrni tinglang.',
      en: 'Listen for the judgment about the size.',
      ru: 'Расслышьте оценку размера.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_112_type_answer: {
    type: 'type_answer',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.type,
    npcText: '책을 아직 다 읽지 못했습니다. 저에게 조금 어렵습니다.',
    sentenceTemplate: '저한테 좀 ___ 것 같아요.',
    blankAnswers: ['어려운'],
    answerTranslation: {
      ko: '저한테 좀 어려운 것 같아요.',
      uz: 'Men uchun biroz qiyindek.',
      en: 'It seems a little difficult for me.',
      ru: 'Кажется, для меня это немного трудно.',
    },
    difficulty: 4,
    tags: ['어려운 것 같다', '타이핑'],
    hint: {
      ko: '어렵다 → 어려운이에요.',
      uz: '어렵다 → 어려운.',
      en: '어렵다 becomes 어려운.',
      ru: '어렵다 → 어려운.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_113_dialog_order: {
    type: 'dialog_order',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialogOrder,
    dialogLines: [
      {
        speaker: 'npc',
        text: '마리코 씨, 스티븐 씨 못 봤어요?',
      },
      {
        speaker: 'user',
        text: '아까 집에 갔어요.',
      },
      {
        speaker: 'npc',
        text: '벌써 갔어요?',
      },
      {
        speaker: 'user',
        text: '네, 무슨 일이 있는 것 같아요.',
      },
    ],
    answer: 'all_correct',
    answerTranslation: {
      ko: '스티븐 씨가 일찍 집에 간 것을 보고 무슨 일이 있는 것 같다고 추측합니다.',
      uz: 'Steven erta uyga ketgani uchun biror ish bo‘lgan deb taxmin qilinadi.',
      en: 'Because Steven went home early, they infer that something may have happened.',
      ru: 'Поскольку Стивен рано ушёл домой, предполагают, что что-то случилось.',
    },
    difficulty: 5,
    tags: ['일이 있는 것 같다', '대화 순서'],
    hint: {
      ko: '집에 간 사실 뒤에 이유를 추측해요.',
      uz: 'Uyga ketgan faktidan keyin sabab taxmin qilinadi.',
      en: 'The inference follows the fact that he went home.',
      ru: 'Предположение следует после факта, что он ушёл домой.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_114_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '나나 씨에 대한 가장 자연스러운 추측을 고르세요.',
      uz: 'Nana haqida eng tabiiy taxminni tanlang.',
      en: 'Choose the most natural inference about Nana.',
      ru: 'Выберите наиболее естественное предположение о Нане.',
    },
    passage: '나나 씨는 샤오밍 씨를 볼 때마다 항상 웃고 먼저 이야기를 합니다.',
    options: [
      '나나 씨가 샤오밍 씨를 좋아하는 것 같아요.',
      '나나 씨가 샤오밍 씨를 만나지 않는 것 같아요.',
      '샤오밍 씨가 학생이 아닌 것 같아요.',
      '나나 씨가 피곤한 것 같아요.',
    ],
    answer: '나나 씨가 샤오밍 씨를 좋아하는 것 같아요.',
    answerTranslation: {
      ko: '항상 웃는 모습을 근거로 좋아하는 것 같다고 추측합니다.',
      uz: 'Doim kulishiga qarab yoqtiradi deb taxmin qilinadi.',
      en: 'Her smiling behavior suggests that she likes Xiaoming.',
      ru: 'По тому, что она всегда улыбается, можно предположить, что ей нравится Сяомин.',
    },
    difficulty: 4,
    tags: ['좋아하는 것 같다', '연습4-4'],
    hint: {
      ko: '교재에서는 “보면 항상 웃어요”를 근거로 제시해요.',
      uz: 'Darslikda “보면 항상 웃어요” dalil sifatida berilgan.',
      en: 'The textbook evidence is 보면 항상 웃어요.',
      ru: 'В учебнике основание — 보면 항상 웃어요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_115_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.cloze,
    passage:
      '사람과 상황을 추측해 봐요. 히엔 씨와 같이 왔으니까 친구___ 것 같아요. 옷은 조금 ___ 것 같고, 책은 조금 ___ 것 같아요. 스티븐 씨는 무슨 일이 ___ 것 같아요.',
    options: ['인', '작은', '어려운', '있는', '좋아하는'],
    answer: '인|작은|어려운|있는',
    answerTranslation: {
      ko: '친구인, 작은, 어려운, 있는을 사용합니다.',
      uz: '친구인, 작은, 어려운, 있는 shakllari ishlatiladi.',
      en: 'Use 친구인, 작은, 어려운, and 있는.',
      ru: 'Используются 친구인, 작은, 어려운 и 있는.',
    },
    difficulty: 5,
    tags: ['연습4', '명사 형용사 동사'],
    hint: {
      ko: '명사·형용사·있다의 형태를 각각 구별하세요.',
      uz: 'Ot, sifat va 있다 shakllarini farqlang.',
      en: 'Distinguish the noun, adjective, and 있다 forms.',
      ru: 'Различайте формы существительного, прилагательного и 있다.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_116_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '저 사람 우리 학교 학생이에요?',
      },
    ],
    options: [
      '잘 모르겠어요. 학생이 아닌 것 같아요.',
      '네, 학생을 먹는 것 같아요.',
      '잘 모르겠어요. 학생이 않는 것 같아요.',
      '아니요, 학생을 신는 것 같아요.',
    ],
    answer: '잘 모르겠어요. 학생이 아닌 것 같아요.',
    acceptedAnswers: ['잘 모르겠어요 학생이 아닌 것 같아요'],
    answerTranslation: {
      ko: '잘 모르겠어요. 학생이 아닌 것 같아요.',
      uz: 'Aniq bilmayman. Talaba emasdek.',
      en: 'I am not sure. I do not think the person is a student.',
      ru: 'Не уверен. Кажется, это не студент.',
    },
    difficulty: 4,
    tags: ['학생이 아닌 것 같다', '대화'],
    hint: {
      ko: '명사 부정 “아니다”의 형태를 사용하세요.',
      uz: 'Ot inkori “아니다” shaklidan foydalaning.',
      en: 'Use the negative noun form with 아니다.',
      ru: 'Используйте отрицание существительного с 아니다.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_117_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '잘 모르겠지만 요즘 만나지 않는 것 같아요.',
    answer: '잘 모르겠지만 요즘 만나지 않는 것 같아요.',
    acceptedAnswers: ['잘 모르겠지만 요즘 만나지 않는 것 같아요'],
    answerTranslation: {
      ko: '잘 모르겠지만 요즘 만나지 않는 것 같아요.',
      uz: 'Aniq bilmayman, lekin hozir uchrashmayotganga o‘xshaydi.',
      en: 'I am not sure, but it seems they are not seeing each other these days.',
      ru: 'Не уверен, но, кажется, сейчас они не встречаются.',
    },
    difficulty: 5,
    tags: ['만나지 않는 것 같다', '말하기'],
    hint: {
      ko: '확실하지 않은 느낌을 살려 말하세요.',
      uz: 'Aniq emasligini ohangda ko‘rsating.',
      en: 'Keep the uncertain tone of the sentence.',
      ru: 'Передайте неуверенность в интонации.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_118_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText:
      '제가 빌려 준 책 다 읽었어요? 아직 다 못 읽었어요. 저한테 좀 어려운 것 같아요.',
    options: [
      '책을 아직 다 읽지 못했어요.',
      '책을 이미 두 번 읽었어요.',
      '책이 너무 쉬워요.',
      '책을 친구에게 줬어요.',
    ],
    answer: '책을 아직 다 읽지 못했어요.',
    answerTranslation: {
      ko: '책이 조금 어려워서 아직 다 읽지 못했습니다.',
      uz: 'Kitob biroz qiyin, shuning uchun hali tugatmagan.',
      en: 'The book seems difficult, so it has not been finished.',
      ru: 'Книга кажется трудной, поэтому её ещё не дочитали.',
    },
    difficulty: 4,
    tags: ['어려운 것 같다', '연습4-2', '듣기'],
    hint: {
      ko: '“아직 다 못 읽었어요”를 들으세요.',
      uz: '“아직 다 못 읽었어요”ga e’tibor bering.',
      en: 'Listen for 아직 다 못 읽었어요.',
      ru: 'Расслышьте 아직 다 못 읽었어요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_119_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.cloze,
    passage:
      '교재 대화를 순서대로 복습해 봐요. 히엔 씨 ___ 것 같아요. 옷은 조금 ___ 것 같아요. 책은 ___ 것 같아요. 무슨 일이 ___ 것 같아요. 나나 씨가 샤오밍 씨를 ___ 것 같아요. 두 사람은 요즘 ___ 것 같아요. 저 사람은 우리 학교 학생이 ___ 것 같아요.',
    options: [
      '친구인',
      '작은',
      '어려운',
      '있는',
      '좋아하는',
      '만나지 않는',
      '아닌',
    ],
    answer: '친구인|작은|어려운|있는|좋아하는|만나지 않는|아닌',
    answerTranslation: {
      ko: '친구인, 작은, 어려운, 있는, 좋아하는, 만나지 않는, 아닌을 사용합니다.',
      uz: '친구인, 작은, 어려운, 있는, 좋아하는, 만나지 않는, 아닌 shakllari ishlatiladi.',
      en: 'Use 친구인, 작은, 어려운, 있는, 좋아하는, 만나지 않는, and 아닌.',
      ru: 'Используются 친구인, 작은, 어려운, 있는, 좋아하는, 만나지 않는 и 아닌.',
    },
    difficulty: 5,
    tags: ['연습4', '교재78', '종합'],
    hint: {
      ko: '보기부터 6번까지 원본 순서예요.',
      uz: 'Namuna va 1–6-bandlar tartibi.',
      en: 'Follow the textbook example and items 1–6 in order.',
      ru: 'Следуйте порядку примера и пунктов 1–6.',
    },
    xpReward: 25,
    isActive: true,
  },

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 왜 그렇게 생각해요?
  // p.78 연습 5 + Node 2 종합
  //
  // 연습 5는 자유 말하기.
  // 줄리아 예시는 교재 인쇄 문장 그대로 사용.
  // 나머지는 같은 목표를 위한 앱용 상황 연습.
  // ──────────────────────────────────────────────────────────

  s3u4_120_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '줄리아 씨에 대한 추측은 무엇입니까?',
      uz: 'Julia haqida qanday taxmin qilinmoqda?',
      en: 'What does the speaker infer about Julia?',
      ru: 'Какое предположение делают о Джулии?',
    },
    passage:
      '줄리아 씨는 혼자 있는 것을 좋아하는 것 같아요. 혼자 책을 읽거나 음악 듣는 것을 많이 봤어요.',
    options: [
      '혼자 있는 것을 좋아하는 것 같아요.',
      '사람을 만나는 것을 싫어한다고 확실히 알아요.',
      '음악을 전혀 듣지 않는 것 같아요.',
      '책 읽는 것을 어려워하는 것 같아요.',
    ],
    answer: '혼자 있는 것을 좋아하는 것 같아요.',
    answerTranslation: {
      ko: '줄리아 씨는 혼자 있는 것을 좋아하는 것 같다고 말합니다.',
      uz: 'Julia yolg‘iz bo‘lishni yoqtiradiganga o‘xshaydi.',
      en: 'The speaker thinks Julia likes being alone.',
      ru: 'Говорящий считает, что Джулии нравится быть одной.',
    },
    difficulty: 3,
    tags: ['연습5', '줄리아', '교재78'],
    hint: {
      ko: '교재의 첫 문장을 확인하세요.',
      uz: 'Darslikdagi birinchi gapga qarang.',
      en: 'Check the first sentence of the textbook example.',
      ru: 'Посмотрите на первое предложение примера.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_121_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '줄리아 씨는 혼자 있는 것을 좋아하는 것 같아요.',
    answer: '줄리아 씨는 혼자 있는 것을 좋아하는 것 같아요.',
    acceptedAnswers: ['줄리아 씨는 혼자 있는 것을 좋아하는 것 같아요'],
    answerTranslation: {
      ko: '줄리아 씨는 혼자 있는 것을 좋아하는 것 같아요.',
      uz: 'Julia yolg‘iz bo‘lishni yoqtiradiganga o‘xshaydi.',
      en: 'Julia seems to like being alone.',
      ru: 'Кажется, Джулии нравится быть одной.',
    },
    difficulty: 4,
    tags: ['연습5', '줄리아', '말하기'],
    hint: {
      ko: '교재에 실제로 인쇄된 예시 문장이에요.',
      uz: 'Bu darslikda bosilgan haqiqiy namuna.',
      en: 'This is the printed textbook example.',
      ru: 'Это напечатанный пример из учебника.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_122_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '줄리아 씨는 혼자 있는 것을 ___ 것 같아요.',
    blankAnswers: ['좋아하는'],
    options: ['좋아하는', '좋아한', '좋아할', '좋아해서', '좋은'],
    answerTranslation: {
      ko: '줄리아 씨는 혼자 있는 것을 좋아하는 것 같아요.',
      uz: 'Julia yolg‘iz bo‘lishni yoqtiradiganga o‘xshaydi.',
      en: 'Julia seems to like being alone.',
      ru: 'Кажется, Джулии нравится быть одной.',
    },
    difficulty: 3,
    tags: ['연습5', '좋아하는 것 같다'],
    hint: {
      ko: '좋아하다가 현재 동작처럼 “좋아하는”이 돼요.',
      uz: '좋아하다 → 좋아하는.',
      en: '좋아하다 becomes 좋아하는.',
      ru: '좋아하다 → 좋아하는.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_123_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '혼자 책을 읽거나 음악 듣는 것을 많이 봤어요.',
    options: [
      '줄리아 씨에 대한 추측의 근거예요.',
      '줄리아 씨의 직업을 소개해요.',
      '줄리아 씨가 아프다는 뜻이에요.',
      '줄리아 씨가 옷을 샀다는 뜻이에요.',
    ],
    answer: '줄리아 씨에 대한 추측의 근거예요.',
    answerTranslation: {
      ko: '혼자 책을 읽거나 음악을 듣는 모습을 많이 본 것이 추측의 근거입니다.',
      uz: 'Uni yolg‘iz kitob o‘qib yoki musiqa tinglayotganini ko‘rish taxminning sababi.',
      en: 'Seeing Julia often read or listen to music alone is the evidence for the inference.',
      ru: 'Основанием служит то, что Джулию часто видели читающей или слушающей музыку в одиночестве.',
    },
    difficulty: 4,
    tags: ['연습5', '근거', '듣기'],
    hint: {
      ko: '“왜 그렇게 생각해요?”에 대한 설명이에요.',
      uz: 'Bu “Nega shunday o‘ylaysiz?” savoliga javob.',
      en: 'It answers “Why do you think so?”',
      ru: 'Это ответ на вопрос «Почему вы так думаете?»',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_124_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '민수 씨는 운동을 좋아해요?',
      },
    ],
    options: [
      '네, 운동하는 것을 좋아하는 것 같아요. 매일 운동장에서 봐요.',
      '네, 운동이 친구인 것 같아요.',
      '아니요, 운동을 학생인 것 같아요.',
      '네, 운동화를 먹는 것 같아요.',
    ],
    answer: '네, 운동하는 것을 좋아하는 것 같아요. 매일 운동장에서 봐요.',
    acceptedAnswers: [
      '네 운동하는 것을 좋아하는 것 같아요 매일 운동장에서 봐요',
    ],
    answerTranslation: {
      ko: '운동장에서 자주 보는 것을 근거로 운동을 좋아한다고 추측합니다.',
      uz: 'Uni tez-tez sport maydonida ko‘rib, sportni yoqtiradi deb taxmin qilinadi.',
      en: 'Seeing him at the sports field every day suggests that he likes exercising.',
      ru: 'Поскольку его каждый день видят на спортплощадке, предполагают, что он любит спорт.',
    },
    difficulty: 4,
    tags: ['연습5 적응', '추측과 근거'],
    hint: {
      ko: '추측만 하지 말고 근거도 함께 말해요.',
      uz: 'Faqat taxmin emas, sababini ham ayting.',
      en: 'Give both the inference and the evidence.',
      ru: 'Назовите и предположение, и основание.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_125_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '매일 도서관에서 봐요. 공부를 열심히 ___ 것 같아요.',
    blankAnswers: ['하는'],
    options: ['하는', '한', '할', '해서', '학생인'],
    answerTranslation: {
      ko: '공부를 열심히 하는 것 같아요.',
      uz: 'Juda tirishib o‘qiydiganga o‘xshaydi.',
      en: 'The person seems to study hard.',
      ru: 'Кажется, человек усердно учится.',
    },
    difficulty: 3,
    tags: ['연습5 적응', '하는 것 같다'],
    hint: {
      ko: '도서관에서 자주 본 것이 근거예요.',
      uz: 'Kutubxonada tez-tez ko‘rish dalil.',
      en: 'Seeing the person often at the library is the evidence.',
      ru: 'Основание — человека часто видят в библиотеке.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_126_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '가장 근거가 잘 연결된 추측을 고르세요.',
      uz: 'Dalil bilan eng yaxshi bog‘langan taxminni tanlang.',
      en: 'Choose the inference best supported by the evidence.',
      ru: 'Выберите предположение, которое лучше всего подтверждается основанием.',
    },
    passage:
      '수업이 끝나면 항상 피아노 연습실에 가고 집에서도 피아노를 자주 칩니다.',
    options: [
      '피아노 치는 것을 좋아하는 것 같아요.',
      '수영을 못 하는 것 같아요.',
      '옷이 작은 것 같아요.',
      '우리 학교 학생이 아닌 것 같아요.',
    ],
    answer: '피아노 치는 것을 좋아하는 것 같아요.',
    answerTranslation: {
      ko: '피아노를 자주 치는 행동이 피아노를 좋아한다는 추측을 뒷받침합니다.',
      uz: 'Pianinoni tez-tez chalishi uni yoqtirishini ko‘rsatadi.',
      en: 'Frequently playing piano supports the inference that the person likes it.',
      ru: 'Частая игра на пианино подтверждает предположение, что человеку это нравится.',
    },
    difficulty: 4,
    tags: ['연습5 적응', '추측 근거'],
    hint: {
      ko: '반복해서 하는 행동과 연결되는 추측을 찾으세요.',
      uz: 'Takroriy harakatga mos taxminni toping.',
      en: 'Match the repeated behavior to the inference.',
      ru: 'Свяжите повторяющееся действие с предположением.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_127_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '저 사람은 우리 학교 학생인 것 같아요.',
    answer: '저 사람은 우리 학교 학생인 것 같아요.',
    acceptedAnswers: ['저 사람은 우리 학교 학생인 것 같아요'],
    answerTranslation: {
      ko: '저 사람은 우리 학교 학생인 것 같아요.',
      uz: 'U odam bizning maktab talabasi shekilli.',
      en: 'That person seems to be a student at our school.',
      ru: 'Кажется, тот человек — студент нашей школы.',
    },
    difficulty: 4,
    tags: ['N인 것 같다', '말하기'],
    hint: {
      ko: '학생은 명사이므로 “학생인 것 같아요”예요.',
      uz: '학생 ot, shuning uchun “학생인 것 같아요”.',
      en: '학생 is a noun, so use 학생인 것 같아요.',
      ru: '학생 — существительное, поэтому 학생인 것 같아요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_128_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '우산을 쓰고 들어오는 사람이 많아요. 밖에 비가 오는 것 같아요.',
    options: [
      '밖에 비가 오는 것 같아요.',
      '밖에 눈이 온 것을 확실히 알아요.',
      '밖이 아주 따뜻한 것 같아요.',
      '사람들이 운동하는 것 같아요.',
    ],
    answer: '밖에 비가 오는 것 같아요.',
    answerTranslation: {
      ko: '우산을 쓴 사람들을 보고 비가 온다고 추측합니다.',
      uz: 'Soyabonli odamlarga qarab yomg‘ir yog‘ayotgan deb taxmin qilinadi.',
      en: 'People carrying umbrellas suggest that it is raining outside.',
      ru: 'По людям с зонтами предполагают, что на улице идёт дождь.',
    },
    difficulty: 4,
    tags: ['오는 것 같다', '추측', '듣기'],
    hint: {
      ko: '보이는 근거는 우산이에요.',
      uz: 'Ko‘rinayotgan dalil — soyabon.',
      en: 'The visible evidence is the umbrellas.',
      ru: 'Видимое основание — зонты.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_129_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '밖에 추워 보여요?',
    options: [
      '네',
      '사람들이',
      '두꺼운 옷을 입었어요',
      '추운 것 같아요',
      '먹는',
    ],
    answer: '네 사람들이 두꺼운 옷을 입었어요 추운 것 같아요',
    answerTranslation: {
      ko: '네, 사람들이 두꺼운 옷을 입었어요. 추운 것 같아요.',
      uz: 'Ha, odamlar qalin kiyim kiygan. Sovuqdek.',
      en: 'Yes. People are wearing thick clothes. It seems cold.',
      ru: 'Да. Люди в тёплой одежде. Кажется, холодно.',
    },
    difficulty: 5,
    tags: ['추운 것 같다', '근거', '응답'],
    hint: {
      ko: '관찰한 사실과 추측을 함께 말하세요.',
      uz: 'Kuzatuv va taxminni birga ayting.',
      en: 'Give the observation and the inference together.',
      ru: 'Назовите наблюдение и предположение.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_130_type_answer: {
    type: 'type_answer',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.type,
    npcText: '웃으면서 노래를 듣고 있습니다. 기분을 추측해 보세요.',
    sentenceTemplate: '기분이 ___ 것 같아요.',
    blankAnswers: ['좋은'],
    answerTranslation: {
      ko: '기분이 좋은 것 같아요.',
      uz: 'Kayfiyati yaxshidek.',
      en: 'The person seems to be in a good mood.',
      ru: 'Кажется, у человека хорошее настроение.',
    },
    difficulty: 4,
    tags: ['기분이 좋은 것 같다', '타이핑'],
    hint: {
      ko: '웃는 모습이 근거예요.',
      uz: 'Kulishi dalil.',
      en: 'The smile is the evidence.',
      ru: 'Основание — улыбка.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_131_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '민수 씨 요즘 왜 혼자 다녀요?',
      },
    ],
    options: [
      '잘 모르겠지만 친구들을 자주 만나지 않는 것 같아요.',
      '친구들이 학생인 것 같아요.',
      '옷이 조금 작은 것 같아요.',
      '물을 마시는 것 같아요.',
    ],
    answer: '잘 모르겠지만 친구들을 자주 만나지 않는 것 같아요.',
    acceptedAnswers: ['잘 모르겠지만 친구들을 자주 만나지 않는 것 같아요'],
    answerTranslation: {
      ko: '잘 모르겠지만 친구들을 자주 만나지 않는 것 같아요.',
      uz: 'Aniq bilmayman, lekin do‘stlari bilan ko‘p uchrashmayotganga o‘xshaydi.',
      en: 'I am not sure, but it seems he has not been seeing his friends often.',
      ru: 'Не уверен, но, кажется, он нечасто встречается с друзьями.',
    },
    difficulty: 4,
    tags: ['만나지 않는 것 같다', '추측'],
    hint: {
      ko: '혼자 다니는 모습을 근거로 조심스럽게 추측해요.',
      uz: 'Yolg‘iz yurishiga qarab ehtiyotkor taxmin qiling.',
      en: 'Make a cautious inference from the fact that he is often alone.',
      ru: 'Осторожно предположите по тому, что он часто один.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_132_listen_fill: {
    type: 'listen_fill',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenFill,
    sentenceTemplate:
      '저 사람은 우리 학교 ___ 것 같고, 친구와 같이 ___ 것 같아요.',
    blankAnswers: ['학생인', '가는'],
    answerTranslation: {
      ko: '저 사람은 우리 학교 학생인 것 같고, 친구와 같이 가는 것 같아요.',
      uz: 'U bizning maktab talabasi va do‘sti bilan ketayotganga o‘xshaydi.',
      en: 'The person seems to be a student at our school and seems to be going with a friend.',
      ru: 'Кажется, это студент нашей школы, и он идёт вместе с другом.',
    },
    difficulty: 5,
    tags: ['N인 것 같다', 'V-는 것 같다', '듣기'],
    hint: {
      ko: '첫 빈칸은 명사, 두 번째는 동사예요.',
      uz: 'Birinchisi ot, ikkinchisi fe’l.',
      en: 'The first blank is a noun form; the second is a verb form.',
      ru: 'Первый пропуск — существительное, второй — глагол.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_133_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '상황과 추측이 가장 자연스럽게 연결된 것을 고르세요.',
      uz: 'Vaziyat va taxmin eng tabiiy bog‘langan variantni tanlang.',
      en: 'Choose the most natural evidence-and-inference pair.',
      ru: 'Выберите наиболее естественную пару «основание — предположение».',
    },
    passage: '추측은 보이는 행동이나 알고 있는 정보를 근거로 합니다.',
    options: [
      '항상 웃어요 → 기분이 좋은 것 같아요.',
      '구두를 신었어요 → 책이 어려운 것 같아요.',
      '음식을 먹어요 → 학생이 아닌 것 같아요.',
      '날씨가 추워요 → 피아노를 치는 것 같아요.',
    ],
    answer: '항상 웃어요 → 기분이 좋은 것 같아요.',
    answerTranslation: {
      ko: '웃는 모습은 기분이 좋다는 추측의 자연스러운 근거가 됩니다.',
      uz: 'Kulish yaxshi kayfiyat taxminiga tabiiy dalil.',
      en: 'Smiling naturally supports the inference that someone is in a good mood.',
      ru: 'Улыбка естественно подтверждает предположение о хорошем настроении.',
    },
    difficulty: 4,
    tags: ['추측과 근거', '종합'],
    hint: {
      ko: '행동과 상태 사이에 실제 의미 연결이 있어야 해요.',
      uz: 'Harakat va holat ma’nosan bog‘liq bo‘lishi kerak.',
      en: 'The evidence and inference must have a meaningful connection.',
      ru: 'Основание и предположение должны быть логически связаны.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_134_translate_builder: {
    type: 'translate_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '저 사람은 우리 학교 학생이 아닌 것 같아요',
      uz: 'U odam bizning maktab talabasi emasdek',
      en: 'I do not think that person is a student at our school',
      ru: 'Кажется, тот человек не студент нашей школы',
    },
    options: ['저 사람은', '우리 학교', '학생이', '아닌', '것 같아요', '가는'],
    answer: '저 사람은 우리 학교 학생이 아닌 것 같아요',
    answerTranslation: {
      ko: '저 사람은 우리 학교 학생이 아닌 것 같아요.',
      uz: 'U odam bizning maktab talabasi emasdek.',
      en: 'I do not think that person is a student at our school.',
      ru: 'Кажется, тот человек не студент нашей школы.',
    },
    difficulty: 5,
    tags: ['학생이 아닌 것 같다', '번역'],
    hint: {
      ko: '명사 부정 “아니다”를 사용하세요.',
      uz: 'Ot inkori “아니다”dan foydalaning.',
      en: 'Use the noun negation with 아니다.',
      ru: 'Используйте отрицание существительного с 아니다.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_135_dialog_order: {
    type: 'dialog_order',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialogOrder,
    dialogLines: [
      {
        speaker: 'npc',
        text: '줄리아 씨는 어떤 것 같아요?',
      },
      {
        speaker: 'user',
        text: '혼자 있는 것을 좋아하는 것 같아요.',
      },
      {
        speaker: 'npc',
        text: '왜 그렇게 생각해요?',
      },
      {
        speaker: 'user',
        text: '혼자 책을 읽거나 음악 듣는 것을 많이 봤어요.',
      },
    ],
    answer: 'all_correct',
    answerTranslation: {
      ko: '줄리아 씨에 대한 추측을 말한 뒤 관찰한 행동을 근거로 설명하는 교재 예시입니다.',
      uz: 'Julia haqidagi taxmin va kuzatilgan harakat bilan sabab tushuntiriladi.',
      en: 'The textbook example gives an inference about Julia and then supports it with observed behavior.',
      ru: 'В примере сначала делают предположение о Джулии, затем объясняют его наблюдаемым поведением.',
    },
    difficulty: 5,
    tags: ['연습5', '줄리아', '추측과 근거', '교재78'],
    hint: {
      ko: '추측 → 이유 질문 → 관찰한 근거 순서예요.',
      uz: 'Taxmin → sabab savoli → kuzatilgan dalil.',
      en: 'Inference → why question → observed evidence.',
      ru: 'Предположение → вопрос «почему?» → наблюдаемое основание.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_136_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.cloze,
    passage:
      '보이는 정보로 조심스럽게 추측해 봐요. 옷은 조금 ___ 것 같아요. 사람들이 두꺼운 옷을 입어서 날씨가 ___ 것 같아요. 저 사람은 음악을 ___ 것 같아요. 히엔 씨와 같이 왔으니까 친구___ 것 같아요. 줄리아 씨는 혼자 있는 것을 ___ 것 같아요.',
    options: ['작은', '추운', '듣는', '인', '좋아하는'],
    answer: '작은|추운|듣는|인|좋아하는',
    answerTranslation: {
      ko: '작은, 추운, 듣는, 인, 좋아하는을 사용합니다.',
      uz: '작은, 추운, 듣는, 인, 좋아하는 shakllari ishlatiladi.',
      en: 'Use 작은, 추운, 듣는, 인, and 좋아하는.',
      ru: 'Используются 작은, 추운, 듣는, 인 и 좋아하는.',
    },
    difficulty: 5,
    tags: ['Node2 종합', 'A-(으)ㄴ 것 같다', 'V-는 것 같다', 'N인 것 같다'],
    hint: {
      ko: '형용사 → 형용사 → 동사 → 명사 → 동사 순서예요.',
      uz: 'Sifat → sifat → fe’l → ot → fe’l.',
      en: 'Adjective → adjective → verb → noun → verb.',
      ru: 'Прилагательное → прилагательное → глагол → существительное → глагол.',
    },
    xpReward: 25,
    isActive: true,
  },
  // ══════════════════════════════════════════════════════════
  // Unit 4 · Node 3 · N보다
  // 교재 p.79 전체
  //
  // [보기]
  // A: 무슨 음식을 더 좋아해요?
  // B: 불고기보다 비빔밥을 더 좋아해요.
  //
  // 1)
  // 농구 / 수영
  // A: 무슨 운동을 더 잘해요?
  //
  // 2)
  // 두 옷차림
  // A: 뭐가 더 잘 어울려요?
  //
  // 3)
  // 사과 ₩1000 / 배 ₩1500
  // A: 뭐가 더 비싸요?
  //
  // 4)
  // 지리산 1915m / 한라산 1950m
  // A: 어느 산이 더 높아요?
  //
  // 5)
  // 구두 / 운동화
  // A: 어느 게 더 편해요?
  //
  // 6)
  // 겨울 / 여름
  // A: 어느 계절이 더 좋아요?
  //
  // 2, 5, 6은 선호·판단이 들어갈 수 있는 활동이므로
  // 관련 문장은 앱용 예시 응답으로 사용한다.
  //
  // Grammar 전용 문제 타입 사용 금지.
  // grammar_blank / grammar_build / verb_transform / error_hunt 0개.
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 어느 것을 더 좋아해요?
  // 보기 + 비교 기본 구조
  // ──────────────────────────────────────────────────────────

  s3u4_137_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '무슨 음식을 더 좋아해요?',
      },
    ],
    options: [
      '불고기보다 비빔밥을 더 좋아해요.',
      '비빔밥보다 불고기를 더 비싸요.',
      '불고기를 비빔밥보다 높아요.',
      '비빔밥이 불고기를 더 편해요.',
    ],
    answer: '불고기보다 비빔밥을 더 좋아해요.',
    acceptedAnswers: ['불고기보다 비빔밥을 더 좋아해요'],
    answerTranslation: {
      ko: '불고기보다 비빔밥을 더 좋아해요.',
      uz: 'Bulgogidan ko‘ra bibimbapni ko‘proq yoqtiraman.',
      en: 'I like bibimbap more than bulgogi.',
      ru: 'Я больше люблю пибимпап, чем пулькоги.',
    },
    difficulty: 3,
    tags: ['N보다', '비빔밥', '불고기', '교재79'],
    hint: {
      ko: '교재 보기의 문장이에요. 비교 기준인 불고기 뒤에 “보다”가 와요.',
      uz: 'Bu darslik namunasi. Taqqoslash mezoni 불고기 dan keyin “보다” keladi.',
      en: 'This is the textbook example. 보다 follows the comparison baseline, 불고기.',
      ru: 'Это пример из учебника. 보다 ставится после объекта сравнения — 불고기.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_138_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '불고기보다 비빔밥을 더 좋아해요.',
    options: [
      '비빔밥을 더 좋아해요.',
      '불고기를 더 좋아해요.',
      '두 음식을 모두 싫어해요.',
      '비빔밥이 더 비싸요.',
    ],
    answer: '비빔밥을 더 좋아해요.',
    answerTranslation: {
      ko: '비빔밥을 불고기보다 더 좋아합니다.',
      uz: 'Bibimbapni bulgogidan ko‘proq yoqtiradi.',
      en: 'The speaker likes bibimbap more than bulgogi.',
      ru: 'Говорящий больше любит пибимпап, чем пулькоги.',
    },
    difficulty: 3,
    tags: ['N보다', '더', '듣기'],
    hint: {
      ko: '“보다” 앞은 비교 기준이고, “더 좋아해요” 앞의 대상이 더 좋아하는 것이에요.',
      uz: '“보다” oldidagi narsa taqqoslash mezoni.',
      en: 'The noun before 보다 is the baseline; the other item is preferred.',
      ru: 'Существительное перед 보다 — база сравнения.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_139_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '불고기___ 비빔밥을 더 좋아해요.',
    blankAnswers: ['보다'],
    options: ['보다', '부터', '에게', '하고', '까지'],
    answerTranslation: {
      ko: '불고기보다 비빔밥을 더 좋아해요.',
      uz: 'Bulgogidan ko‘ra bibimbapni ko‘proq yoqtiraman.',
      en: 'I like bibimbap more than bulgogi.',
      ru: 'Я больше люблю пибимпап, чем пулькоги.',
    },
    difficulty: 3,
    tags: ['N보다', '비교'],
    hint: {
      ko: '비교의 기준 뒤에 붙는 조사를 넣으세요.',
      uz: 'Taqqoslash mezonidan keyingi qo‘shimchani qo‘ying.',
      en: 'Insert the particle that marks the comparison baseline.',
      ru: 'Вставьте частицу после объекта сравнения.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_140_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '불고기보다 비빔밥을 더 좋아해요.',
    answer: '불고기보다 비빔밥을 더 좋아해요.',
    acceptedAnswers: ['불고기보다 비빔밥을 더 좋아해요'],
    answerTranslation: {
      ko: '불고기보다 비빔밥을 더 좋아해요.',
      uz: 'Bulgogidan ko‘ra bibimbapni ko‘proq yoqtiraman.',
      en: 'I like bibimbap more than bulgogi.',
      ru: 'Я больше люблю пибимпап, чем пулькоги.',
    },
    difficulty: 3,
    tags: ['N보다', '교재 보기', '말하기'],
    hint: {
      ko: '“불고기보다 / 비빔밥을 더 좋아해요”의 덩어리를 자연스럽게 말하세요.',
      uz: 'Gapning ikki qismini tabiiy bog‘lab ayting.',
      en: 'Say the comparison and preference smoothly as one sentence.',
      ru: 'Плавно произнесите сравнение и предпочтение.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_141_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['불고기보다', '비빔밥을', '더', '좋아해요', '높아요', '편해요'],
    answer: '불고기보다 비빔밥을 더 좋아해요',
    answerTranslation: {
      ko: '불고기보다 비빔밥을 더 좋아해요.',
      uz: 'Bulgogidan ko‘ra bibimbapni ko‘proq yoqtiraman.',
      en: 'I like bibimbap more than bulgogi.',
      ru: 'Я больше люблю пибимпап, чем пулькоги.',
    },
    difficulty: 4,
    tags: ['N보다', '어순'],
    hint: {
      ko: '비교 기준 → 더 좋아하는 대상 → 더 → 좋아해요 순서예요.',
      uz: 'Mezon → afzal narsa → 더 → 좋아해요.',
      en: 'Baseline → preferred item → 더 → 좋아해요.',
      ru: 'База сравнения → предпочтительный объект → 더 → 좋아해요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_142_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '저는 커피보다 차를 더 좋아해요.',
    acceptedAnswers: ['저는 커피보다 차를 더 좋아해요'],
    answerTranslation: {
      ko: '저는 커피보다 차를 더 좋아해요.',
      uz: 'Men qahvadan ko‘ra choyni ko‘proq yoqtiraman.',
      en: 'I like tea more than coffee.',
      ru: 'Я больше люблю чай, чем кофе.',
    },
    difficulty: 4,
    tags: ['N보다', '좋아하다', '듣기'],
    hint: {
      ko: '커피가 비교 기준이고 차를 더 좋아해요.',
      uz: 'Qahva mezon, choy ko‘proq yoqadi.',
      en: 'Coffee is the baseline and tea is preferred.',
      ru: 'Кофе — база сравнения, чай нравится больше.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_143_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '커피하고 차 중에서 뭘 더 좋아해요?',
    options: ['커피보다', '차를', '더', '좋아해요', '높아요', '농구를'],
    answer: '커피보다 차를 더 좋아해요',
    answerTranslation: {
      ko: '커피보다 차를 더 좋아해요.',
      uz: 'Qahvadan ko‘ra choyni ko‘proq yoqtiraman.',
      en: 'I like tea more than coffee.',
      ru: 'Я больше люблю чай, чем кофе.',
    },
    difficulty: 4,
    tags: ['N보다', '선호', '응답'],
    hint: {
      ko: '덜 좋아하는 것을 “보다” 앞에 놓으세요.',
      uz: 'Kamroq yoqadigan narsani “보다” oldiga qo‘ying.',
      en: 'Put the less-preferred item before 보다.',
      ru: 'Менее предпочтительный объект поставьте перед 보다.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_144_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '민수 씨가 더 좋아하는 음식은 무엇입니까?',
      uz: 'Minsu qaysi taomni ko‘proq yoqtiradi?',
      en: 'Which food does Minsu like more?',
      ru: 'Какое блюдо Минсу любит больше?',
    },
    passage: '민수: 저는 냉면도 좋아하지만 비빔밥보다 불고기를 더 좋아해요.',
    options: ['불고기', '비빔밥', '냉면만', '알 수 없어요'],
    answer: '불고기',
    answerTranslation: {
      ko: '불고기를 비빔밥보다 더 좋아합니다.',
      uz: 'Bulgogini bibimbapdan ko‘proq yoqtiradi.',
      en: 'He likes bulgogi more than bibimbap.',
      ru: 'Он больше любит пулькоги, чем пибимпап.',
    },
    difficulty: 4,
    tags: ['N보다', '독해', '선호'],
    hint: {
      ko: '“비빔밥보다 불고기를 더 좋아해요”를 확인하세요.',
      uz: '“비빔밥보다 불고기를 더 좋아해요”ga qarang.',
      en: 'Focus on 비빔밥보다 불고기를 더 좋아해요.',
      ru: 'Обратите внимание на 비빔밥보다 불고기를 더 좋아해요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_145_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '저는 겨울보다 여름을 ___ 좋아해요.',
    blankAnswers: ['더'],
    options: ['더', '제일', '전혀', '별로', '아직'],
    answerTranslation: {
      ko: '저는 겨울보다 여름을 더 좋아해요.',
      uz: 'Men qishdan ko‘ra yozni ko‘proq yoqtiraman.',
      en: 'I like summer more than winter.',
      ru: 'Я больше люблю лето, чем зиму.',
    },
    difficulty: 3,
    tags: ['N보다', '더', '계절'],
    hint: {
      ko: '두 대상을 비교할 때 “더”를 사용해요.',
      uz: 'Ikki narsani solishtirganda “더” ishlatiladi.',
      en: 'Use 더 when comparing two things.',
      ru: 'При сравнении двух объектов используется 더.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_146_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '저는 겨울보다 여름을 더 좋아해요.',
    options: [
      '여름을 더 좋아해요.',
      '겨울을 더 좋아해요.',
      '겨울과 여름을 싫어해요.',
      '여름보다 봄을 더 좋아해요.',
    ],
    answer: '여름을 더 좋아해요.',
    answerTranslation: {
      ko: '겨울과 여름 중 여름을 더 좋아합니다.',
      uz: 'Qish va yozdan yozni ko‘proq yoqtiradi.',
      en: 'The speaker prefers summer to winter.',
      ru: 'Говорящий предпочитает лето зиме.',
    },
    difficulty: 3,
    tags: ['겨울', '여름', '듣기'],
    hint: {
      ko: '“보다” 뒤에 나오는 비교 결과를 들으세요.',
      uz: 'Taqqoslash natijasini tinglang.',
      en: 'Listen for which item receives 더 좋아해요.',
      ru: 'Расслышьте, какой объект связан с 더 좋아해요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_147_translate_builder: {
    type: 'translate_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '저는 겨울보다 여름을 더 좋아해요',
      uz: 'Men qishdan ko‘ra yozni ko‘proq yoqtiraman',
      en: 'I like summer more than winter',
      ru: 'Я больше люблю лето, чем зиму',
    },
    options: ['저는', '겨울보다', '여름을', '더', '좋아해요', '비싸요'],
    answer: '저는 겨울보다 여름을 더 좋아해요',
    answerTranslation: {
      ko: '저는 겨울보다 여름을 더 좋아해요.',
      uz: 'Men qishdan ko‘ra yozni ko‘proq yoqtiraman.',
      en: 'I like summer more than winter.',
      ru: 'Я больше люблю лето, чем зиму.',
    },
    difficulty: 4,
    tags: ['N보다', '여름', '번역'],
    hint: {
      ko: '겨울은 비교 기준이에요.',
      uz: 'Qish taqqoslash mezoni.',
      en: 'Winter is the comparison baseline.',
      ru: 'Зима — база сравнения.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_148_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '어느 계절을 더 좋아해요?',
      },
    ],
    options: [
      '겨울보다 여름을 더 좋아해요.',
      '여름보다 겨울이 더 비싸요.',
      '겨울을 운동화보다 좋아해요.',
      '여름이 한라산보다 높아요.',
    ],
    answer: '겨울보다 여름을 더 좋아해요.',
    acceptedAnswers: ['겨울보다 여름을 더 좋아해요'],
    answerTranslation: {
      ko: '겨울보다 여름을 더 좋아해요.',
      uz: 'Qishdan ko‘ra yozni ko‘proq yoqtiraman.',
      en: 'I like summer more than winter.',
      ru: 'Я больше люблю лето, чем зиму.',
    },
    difficulty: 3,
    tags: ['연습1-6', '계절', '앱 예시'],
    hint: {
      ko: '원본 6번은 개인 선호를 말하는 활동이에요. 여기서는 여름을 선택한 예시예요.',
      uz: 'Asl 6-band shaxsiy tanlov. Bu misolda yoz tanlangan.',
      en: 'Source item 6 is personal preference; this app example chooses summer.',
      ru: 'Пункт 6 — личное предпочтение; в примере выбрано лето.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_149_type_answer: {
    type: 'type_answer',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.type,
    npcText: '여름을 더 좋아합니다. 비교 대상은 겨울입니다.',
    sentenceTemplate: '겨울___ 여름을 더 좋아해요.',
    blankAnswers: ['보다'],
    answerTranslation: {
      ko: '겨울보다 여름을 더 좋아해요.',
      uz: 'Qishdan ko‘ra yozni ko‘proq yoqtiraman.',
      en: 'I like summer more than winter.',
      ru: 'Я больше люблю лето, чем зиму.',
    },
    difficulty: 4,
    tags: ['N보다', '타이핑'],
    hint: {
      ko: '비교 기준인 겨울 뒤에 한 글자 조사를 붙이세요.',
      uz: 'Qishdan keyin taqqoslash qo‘shimchasini yozing.',
      en: 'Add the comparison particle after 겨울.',
      ru: 'Добавьте частицу сравнения после 겨울.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_150_dialog_order: {
    type: 'dialog_order',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialogOrder,
    dialogLines: [
      {
        speaker: 'npc',
        text: '한국 음식 좋아해요?',
      },
      {
        speaker: 'user',
        text: '네, 좋아해요.',
      },
      {
        speaker: 'npc',
        text: '불고기하고 비빔밥 중에서 뭘 더 좋아해요?',
      },
      {
        speaker: 'user',
        text: '불고기보다 비빔밥을 더 좋아해요.',
      },
    ],
    answer: 'all_correct',
    answerTranslation: {
      ko: '한국 음식을 좋아하는지 묻고, 불고기와 비빔밥 중 무엇을 더 좋아하는지 비교하는 대화입니다.',
      uz: 'Koreys taomini yoqtirishi va ikki taomdan qaysi biri ko‘proq yoqishi haqida dialog.',
      en: 'The dialogue first asks about Korean food, then compares bulgogi and bibimbap.',
      ru: 'Сначала спрашивают о корейской еде, затем сравнивают пулькоги и пибимпап.',
    },
    difficulty: 5,
    tags: ['N보다', '대화 순서'],
    hint: {
      ko: '일반적인 질문 뒤에 두 음식 비교 질문이 나와요.',
      uz: 'Umumiy savoldan keyin ikki taom taqqoslanadi.',
      en: 'The general question comes before the specific comparison.',
      ru: 'Сначала общий вопрос, затем конкретное сравнение.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_151_listen_fill: {
    type: 'listen_fill',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenFill,
    sentenceTemplate: '저는 ___보다 ___을 더 좋아해요.',
    blankAnswers: ['불고기', '비빔밥'],
    answerTranslation: {
      ko: '저는 불고기보다 비빔밥을 더 좋아해요.',
      uz: 'Men bulgogidan ko‘ra bibimbapni ko‘proq yoqtiraman.',
      en: 'I like bibimbap more than bulgogi.',
      ru: 'Я больше люблю пибимпап, чем пулькоги.',
    },
    difficulty: 5,
    tags: ['N보다', '듣기'],
    hint: {
      ko: '첫 번째는 비교 기준, 두 번째는 더 좋아하는 음식이에요.',
      uz: 'Birinchisi mezon, ikkinchisi ko‘proq yoqadigan taom.',
      en: 'The first is the baseline; the second is the preferred food.',
      ru: 'Первый пропуск — база, второй — более любимое блюдо.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_152_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '두 사람의 선호가 같은 것을 고르세요.',
      uz: 'Ikki kishining bir xil afzalligini toping.',
      en: 'Choose the preference both people share.',
      ru: 'Выберите предпочтение, которое совпадает у обоих.',
    },
    passage:
      '민수: 저는 겨울보다 여름을 더 좋아해요.\n마리코: 저도 추운 날보다 더운 날을 더 좋아해요.',
    options: [
      '따뜻하거나 더운 날씨를 더 좋아해요.',
      '겨울을 더 좋아해요.',
      '추운 날씨만 좋아해요.',
      '계절에 관심이 없어요.',
    ],
    answer: '따뜻하거나 더운 날씨를 더 좋아해요.',
    answerTranslation: {
      ko: '두 사람 모두 추운 날씨보다 따뜻하거나 더운 날씨를 더 좋아합니다.',
      uz: 'Ikkalasi ham sovuqdan ko‘ra iliq yoki issiq havoni yoqtiradi.',
      en: 'Both prefer warmer weather to cold weather.',
      ru: 'Оба предпочитают тёплую погоду холодной.',
    },
    difficulty: 4,
    tags: ['N보다', '독해', '선호'],
    hint: {
      ko: '여름과 더운 날이라는 공통점을 찾으세요.',
      uz: 'Yoz va issiq kunning umumiy tomonini toping.',
      en: 'Find the common idea between summer and hot days.',
      ru: 'Найдите общее между летом и жаркой погодой.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_153_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.cloze,
    passage:
      '저는 음식 중에서는 불고기___ 비빔밥을 더 좋아하고, 음료는 커피___ 차를 더 좋아해요. 계절은 겨울___ 여름을 더 좋아해요.',
    options: ['보다', '보다도', '하고', '부터'],
    answer: '보다|보다도|하고',
    answerTranslation: {
      ko: '비교 표현을 사용해 음식, 음료, 계절의 선호를 말합니다.',
      uz: 'Taom, ichimlik va fasl afzalligi taqqoslab aytiladi.',
      en: 'The passage compares preferences for food, drinks, and seasons.',
      ru: 'В тексте сравниваются предпочтения в еде, напитках и временах года.',
    },
    difficulty: 5,
    tags: ['N보다', '선호 종합'],
    hint: {
      ko: '각 문장에서 비교 기준 뒤에 “보다”가 필요해요.',
      uz: 'Har taqqoslash mezonidan keyin “보다” kerak.',
      en: 'Each comparison baseline needs 보다.',
      ru: 'После каждой базы сравнения требуется 보다.',
    },
    xpReward: 25,
    isActive: true,
  },

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 어느 것이 더 커요?
  // p.79 3번·4번 중심 — 가격과 높이
  // ──────────────────────────────────────────────────────────

  s3u4_154_word_matching: {
    type: 'word_matching',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    instruction: I.match,
    answer: '',
    pairs: [
      { korean: '사과', native: 'Olma' },
      { korean: '배', native: 'Nok' },
      { korean: '농구', native: 'Basketbol' },
      { korean: '수영', native: 'Suzish' },
      { korean: '구두', native: 'Tufli' },
    ],
    answerTranslation: {
      ko: '사과, 배, 농구, 수영, 구두',
      uz: 'Olma, nok, basketbol, suzish, tufli',
      en: 'Apple, pear, basketball, swimming, dress shoes',
      ru: 'Яблоко, груша, баскетбол, плавание, туфли',
    },
    difficulty: 2,
    tags: ['교재79', '비교 어휘'],
    hint: {
      ko: '79쪽 비교 활동에 나오는 단어들이에요.',
      uz: '79-betdagi taqqoslash so‘zlari.',
      en: 'These words appear in the comparison activity on page 79.',
      ru: 'Эти слова встречаются в задании на сравнение на странице 79.',
    },
    xpReward: 10,
    isActive: true,
  },

  s3u4_155_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '사과보다 배가 더 비싸요.',
    options: [
      '배가 더 비싸요.',
      '사과가 더 비싸요.',
      '두 과일 가격이 같아요.',
      '배가 더 싸요.',
    ],
    answer: '배가 더 비싸요.',
    answerTranslation: {
      ko: '배가 사과보다 더 비쌉니다.',
      uz: 'Nok olmadan qimmatroq.',
      en: 'The pear is more expensive than the apple.',
      ru: 'Груша дороже яблока.',
    },
    difficulty: 3,
    tags: ['사과', '배', '비싸다', '듣기'],
    hint: {
      ko: '교재에서 사과는 1,000원, 배는 1,500원이에요.',
      uz: 'Darslikda olma 1000 von, nok 1500 von.',
      en: 'The textbook shows the apple at 1,000 won and the pear at 1,500 won.',
      ru: 'В учебнике яблоко стоит 1000 вон, груша — 1500 вон.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_156_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '사과보다 배가 더 ___.',
    blankAnswers: ['비싸요'],
    options: ['비싸요', '싸요', '편해요', '높아요', '잘해요'],
    answerTranslation: {
      ko: '사과보다 배가 더 비싸요.',
      uz: 'Nok olmadan qimmatroq.',
      en: 'The pear is more expensive than the apple.',
      ru: 'Груша дороже яблока.',
    },
    difficulty: 3,
    tags: ['연습1-3', '비싸다'],
    hint: {
      ko: '1,500원이 1,000원보다 높아요.',
      uz: '1500 von 1000 vondan ko‘p.',
      en: '1,500 won is more than 1,000 won.',
      ru: '1500 вон больше 1000 вон.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_157_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['사과보다', '배가', '더', '비싸요', '높아요', '편해요'],
    answer: '사과보다 배가 더 비싸요',
    answerTranslation: {
      ko: '사과보다 배가 더 비싸요.',
      uz: 'Nok olmadan qimmatroq.',
      en: 'The pear is more expensive than the apple.',
      ru: 'Груша дороже яблока.',
    },
    difficulty: 4,
    tags: ['N보다', '가격', '어순'],
    hint: {
      ko: '사과가 비교 기준이고 배의 가격이 더 높아요.',
      uz: 'Olma mezon, nokning narxi yuqoriroq.',
      en: 'The apple is the baseline and the pear costs more.',
      ru: 'Яблоко — база сравнения, груша стоит дороже.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_158_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '뭐가 더 비싸요?',
      },
    ],
    options: [
      '사과보다 배가 더 비싸요.',
      '배보다 사과가 더 비싸요.',
      '사과보다 배가 더 높아요.',
      '배보다 사과가 더 편해요.',
    ],
    answer: '사과보다 배가 더 비싸요.',
    acceptedAnswers: ['사과보다 배가 더 비싸요'],
    answerTranslation: {
      ko: '사과보다 배가 더 비싸요.',
      uz: 'Nok olmadan qimmatroq.',
      en: 'The pear is more expensive than the apple.',
      ru: 'Груша дороже яблока.',
    },
    difficulty: 3,
    tags: ['연습1-3', '교재79'],
    hint: {
      ko: '가격표를 비교하세요: 사과 1,000원 / 배 1,500원.',
      uz: 'Narxlarni solishtiring: olma 1000 / nok 1500.',
      en: 'Compare the prices: apple 1,000 / pear 1,500.',
      ru: 'Сравните цены: яблоко 1000 / груша 1500.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_159_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '사과보다 배가 더 비싸요.',
    acceptedAnswers: ['사과보다 배가 더 비싸요'],
    answerTranslation: {
      ko: '사과보다 배가 더 비싸요.',
      uz: 'Nok olmadan qimmatroq.',
      en: 'The pear is more expensive than the apple.',
      ru: 'Груша дороже яблока.',
    },
    difficulty: 4,
    tags: ['가격 비교', '듣기'],
    hint: {
      ko: '과일 두 개와 “더 비싸요”를 모두 입력하세요.',
      uz: 'Ikki meva va “더 비싸요”ni yozing.',
      en: 'Type both fruit names and 더 비싸요.',
      ru: 'Введите оба названия фруктов и 더 비싸요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_160_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    instruction: {
      ko: '가격을 비교한 설명으로 맞는 것은 무엇입니까?',
      uz: 'Narxlarni to‘g‘ri taqqoslagan gap qaysi?',
      en: 'Which statement correctly compares the prices?',
      ru: 'Какое утверждение правильно сравнивает цены?',
    },
    passage: '사과 1개: 1,000원\n배 1개: 1,500원',
    options: [
      '배가 사과보다 500원 더 비싸요.',
      '사과가 배보다 500원 더 비싸요.',
      '두 과일의 가격이 같아요.',
      '배가 사과보다 500원 더 싸요.',
    ],
    answer: '배가 사과보다 500원 더 비싸요.',
    answerTranslation: {
      ko: '배는 사과보다 500원 더 비쌉니다.',
      uz: 'Nok olmadan 500 von qimmatroq.',
      en: 'The pear costs 500 won more than the apple.',
      ru: 'Груша на 500 вон дороже яблока.',
    },
    difficulty: 4,
    tags: ['가격', '사과', '배', '독해'],
    hint: {
      ko: '1,500원에서 1,000원을 비교하세요.',
      uz: '1500 va 1000 vonni solishtiring.',
      en: 'Compare 1,500 won with 1,000 won.',
      ru: 'Сравните 1500 и 1000 вон.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_161_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '지리산보다 한라산이 더 ___.',
    blankAnswers: ['높아요'],
    options: ['높아요', '비싸요', '편해요', '좋아해요', '잘해요'],
    answerTranslation: {
      ko: '지리산보다 한라산이 더 높아요.',
      uz: 'Hallasan Jirisandan balandroq.',
      en: 'Hallasan is higher than Jirisan.',
      ru: 'Халласан выше Чирисана.',
    },
    difficulty: 3,
    tags: ['지리산', '한라산', '높다', '교재79'],
    hint: {
      ko: '교재 그림에서 지리산은 1,915m, 한라산은 1,950m예요.',
      uz: 'Jirisan 1915 m, Hallasan 1950 m.',
      en: 'The textbook shows Jirisan at 1,915 m and Hallasan at 1,950 m.',
      ru: 'В учебнике Чирисан — 1915 м, Халласан — 1950 м.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_162_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '지리산보다 한라산이 더 높아요.',
    answer: '지리산보다 한라산이 더 높아요.',
    acceptedAnswers: ['지리산보다 한라산이 더 높아요'],
    answerTranslation: {
      ko: '지리산보다 한라산이 더 높아요.',
      uz: 'Hallasan Jirisandan balandroq.',
      en: 'Hallasan is higher than Jirisan.',
      ru: 'Халласан выше Чирисана.',
    },
    difficulty: 4,
    tags: ['연습1-4', '높다', '말하기'],
    hint: {
      ko: '두 산의 이름을 바꾸지 않도록 주의하세요.',
      uz: 'Ikki tog‘ nomini almashtirib yubormang.',
      en: 'Be careful not to reverse the mountain names.',
      ru: 'Не перепутайте названия гор.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_163_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '어느 산이 더 높아요?',
    options: ['지리산보다', '한라산이', '더', '높아요', '비싸요', '사과가'],
    answer: '지리산보다 한라산이 더 높아요',
    answerTranslation: {
      ko: '지리산보다 한라산이 더 높아요.',
      uz: 'Hallasan Jirisandan balandroq.',
      en: 'Hallasan is higher than Jirisan.',
      ru: 'Халласан выше Чирисана.',
    },
    difficulty: 4,
    tags: ['연습1-4', '응답'],
    hint: {
      ko: '1,950m인 산이 더 높아요.',
      uz: '1950 metrli tog‘ balandroq.',
      en: 'The mountain at 1,950 m is higher.',
      ru: 'Гора высотой 1950 м выше.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_164_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '지리산은 천구백십오 미터이고 한라산은 천구백오십 미터예요.',
    options: [
      '한라산이 더 높아요.',
      '지리산이 더 높아요.',
      '두 산의 높이가 같아요.',
      '한라산이 더 낮아요.',
    ],
    answer: '한라산이 더 높아요.',
    answerTranslation: {
      ko: '1,950m인 한라산이 1,915m인 지리산보다 높습니다.',
      uz: '1950 metrlik Hallasan 1915 metrlik Jirisandan balandroq.',
      en: 'Hallasan at 1,950 m is higher than Jirisan at 1,915 m.',
      ru: 'Халласан высотой 1950 м выше Чирисана высотой 1915 м.',
    },
    difficulty: 4,
    tags: ['높이 비교', '숫자', '듣기'],
    hint: {
      ko: '두 숫자 중 더 큰 높이를 찾으세요.',
      uz: 'Ikki raqamdan kattasini toping.',
      en: 'Identify the larger height.',
      ru: 'Найдите большую высоту.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_165_type_answer: {
    type: 'type_answer',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.type,
    npcText: '지리산은 1,915m이고 한라산은 1,950m입니다.',
    sentenceTemplate: '지리산보다 한라산이 더 ___.',
    blankAnswers: ['높아요'],
    answerTranslation: {
      ko: '지리산보다 한라산이 더 높아요.',
      uz: 'Hallasan Jirisandan balandroq.',
      en: 'Hallasan is higher than Jirisan.',
      ru: 'Халласан выше Чирисана.',
    },
    difficulty: 4,
    tags: ['높다', '타이핑'],
    hint: {
      ko: '산의 높이를 비교하는 형용사를 입력하세요.',
      uz: 'Tog‘ balandligini taqqoslovchi sifatni yozing.',
      en: 'Type the adjective used to compare mountain height.',
      ru: 'Введите прилагательное для сравнения высоты гор.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_166_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '비교 방향이 맞는 문장을 고르세요.',
      uz: 'Taqqoslash yo‘nalishi to‘g‘ri gapni tanlang.',
      en: 'Choose the sentence with the correct comparison direction.',
      ru: 'Выберите предложение с правильным направлением сравнения.',
    },
    passage: 'A는 3,000원이고 B는 5,000원입니다.',
    options: [
      'A보다 B가 더 비싸요.',
      'B보다 A가 더 비싸요.',
      'A보다 B가 더 싸요.',
      'B보다 A가 가격이 같아요.',
    ],
    answer: 'A보다 B가 더 비싸요.',
    answerTranslation: {
      ko: '5,000원인 B가 3,000원인 A보다 더 비쌉니다.',
      uz: '5000 vonlik B 3000 vonlik A dan qimmatroq.',
      en: 'B at 5,000 won is more expensive than A at 3,000 won.',
      ru: 'B за 5000 вон дороже A за 3000 вон.',
    },
    difficulty: 4,
    tags: ['N보다', '비교 방향'],
    hint: {
      ko: '보다 앞에 오는 대상이 기준이에요.',
      uz: '보다 oldidagi narsa mezon.',
      en: 'The item before 보다 is the baseline.',
      ru: 'Объект перед 보다 — база сравнения.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_167_translate_builder: {
    type: 'translate_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '지리산보다 한라산이 더 높아요',
      uz: 'Hallasan Jirisandan balandroq',
      en: 'Hallasan is higher than Jirisan',
      ru: 'Халласан выше Чирисана',
    },
    options: ['지리산보다', '한라산이', '더', '높아요', '편해요', '비싸요'],
    answer: '지리산보다 한라산이 더 높아요',
    answerTranslation: {
      ko: '지리산보다 한라산이 더 높아요.',
      uz: 'Hallasan Jirisandan balandroq.',
      en: 'Hallasan is higher than Jirisan.',
      ru: 'Халласан выше Чирисана.',
    },
    difficulty: 4,
    tags: ['한라산', '높다', '번역'],
    hint: {
      ko: '지리산을 기준으로 한라산의 높이를 비교해요.',
      uz: 'Jirisanni mezon qilib Hallasanni taqqoslang.',
      en: 'Compare Hallasan against Jirisan.',
      ru: 'Сравните Халласан с Чирисаном.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_168_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '사과는 천 원이고 배는 천오백 원이에요.',
      },
    ],
    options: [
      '그럼 사과보다 배가 더 비싸네요.',
      '그럼 배보다 사과가 더 비싸네요.',
      '그럼 사과보다 배가 더 높네요.',
      '그럼 두 과일이 같은 가격이네요.',
    ],
    answer: '그럼 사과보다 배가 더 비싸네요.',
    acceptedAnswers: ['그럼 사과보다 배가 더 비싸네요'],
    answerTranslation: {
      ko: '그럼 사과보다 배가 더 비싸네요.',
      uz: 'Demak, nok olmadan qimmatroq ekan.',
      en: 'Then the pear is more expensive than the apple.',
      ru: 'Значит, груша дороже яблока.',
    },
    difficulty: 4,
    tags: ['가격 비교', '대화'],
    hint: {
      ko: '천오백 원인 과일이 더 비싸요.',
      uz: '1500 vonlik meva qimmatroq.',
      en: 'The fruit priced at 1,500 won is more expensive.',
      ru: 'Фрукт за 1500 вон дороже.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_169_listen_fill: {
    type: 'listen_fill',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenFill,
    sentenceTemplate: '___보다 ___이 더 높아요.',
    blankAnswers: ['지리산', '한라산'],
    answerTranslation: {
      ko: '지리산보다 한라산이 더 높아요.',
      uz: 'Hallasan Jirisandan balandroq.',
      en: 'Hallasan is higher than Jirisan.',
      ru: 'Халласан выше Чирисана.',
    },
    difficulty: 5,
    tags: ['산', '높다', '듣기'],
    hint: {
      ko: '첫 번째는 1,915m, 두 번째는 1,950m예요.',
      uz: 'Birinchisi 1915 m, ikkinchisi 1950 m.',
      en: 'The first is 1,915 m; the second is 1,950 m.',
      ru: 'Первая гора — 1915 м, вторая — 1950 м.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_170_dialog_order: {
    type: 'dialog_order',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialogOrder,
    dialogLines: [
      {
        speaker: 'npc',
        text: '지리산하고 한라산 중에 어디가 더 높아요?',
      },
      {
        speaker: 'user',
        text: '한라산이 더 높아요.',
      },
      {
        speaker: 'npc',
        text: '얼마나 높아요?',
      },
      {
        speaker: 'user',
        text: '한라산은 1,950미터예요.',
      },
    ],
    answer: 'all_correct',
    answerTranslation: {
      ko: '두 산의 높이를 비교한 뒤 한라산의 높이를 확인하는 대화입니다.',
      uz: 'Tog‘lar balandligi taqqoslanib, Hallasan balandligi aytiladi.',
      en: 'The dialogue compares the mountains and then gives Hallasan’s height.',
      ru: 'Сначала сравнивают горы, затем называют высоту Халласана.',
    },
    difficulty: 5,
    tags: ['산', '비교', '대화 순서'],
    hint: {
      ko: '어느 산인지 대답한 뒤 구체적인 높이를 말해요.',
      uz: 'Avval tog‘ nomi, keyin aniq balandlik.',
      en: 'First answer which mountain, then give its exact height.',
      ru: 'Сначала назовите гору, затем её точную высоту.',
    },
    xpReward: 25,
    isActive: true,
  },

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 뭐가 더 잘 어울려요?
  // p.79 1·2·5·6 중심
  // 능력 / 어울림 / 편안함 / 선호
  // ──────────────────────────────────────────────────────────

  s3u4_171_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '농구보다 수영을 더 잘해요.',
    options: [
      '수영을 더 잘해요.',
      '농구를 더 잘해요.',
      '두 운동을 전혀 못해요.',
      '농구를 더 좋아해요.',
    ],
    answer: '수영을 더 잘해요.',
    answerTranslation: {
      ko: '농구와 수영 중 수영을 더 잘합니다.',
      uz: 'Basketboldan ko‘ra suzishni yaxshiroq qiladi.',
      en: 'The person is better at swimming than basketball.',
      ru: 'Человек лучше плавает, чем играет в баскетбол.',
    },
    difficulty: 3,
    tags: ['연습1-1', '농구', '수영', '듣기'],
    hint: {
      ko: '교재 그림에서 수영하는 사람 쪽이 강조되어 있어요.',
      uz: 'Darslik rasmida suzish tomoni ajratilgan.',
      en: 'The swimming side is emphasized in the textbook picture.',
      ru: 'В рисунке учебника выделена сторона с плаванием.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_172_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '농구보다 수영을 더 ___.',
    blankAnswers: ['잘해요'],
    options: ['잘해요', '비싸요', '높아요', '편해요', '어울려요'],
    answerTranslation: {
      ko: '농구보다 수영을 더 잘해요.',
      uz: 'Basketboldan ko‘ra suzishni yaxshiroq qilaman.',
      en: 'I am better at swimming than basketball.',
      ru: 'Я лучше плаваю, чем играю в баскетбол.',
    },
    difficulty: 3,
    tags: ['농구', '수영', '잘하다'],
    hint: {
      ko: '운동 능력을 비교하고 있어요.',
      uz: 'Sport qobiliyati taqqoslanmoqda.',
      en: 'The sentence compares athletic ability.',
      ru: 'Сравнивается спортивное умение.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_173_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '무슨 운동을 더 잘해요?',
    options: ['농구보다', '수영을', '더', '잘해요', '비싸요', '배가'],
    answer: '농구보다 수영을 더 잘해요',
    answerTranslation: {
      ko: '농구보다 수영을 더 잘해요.',
      uz: 'Basketboldan ko‘ra suzishni yaxshiroq qilaman.',
      en: 'I am better at swimming than basketball.',
      ru: 'Я лучше плаваю, чем играю в баскетбол.',
    },
    difficulty: 4,
    tags: ['연습1-1', '응답'],
    hint: {
      ko: '교재 그림에서 강조된 운동은 수영이에요.',
      uz: 'Darslikda ajratilgan sport — suzish.',
      en: 'Swimming is emphasized in the source picture.',
      ru: 'В исходном рисунке выделено плавание.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_174_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '농구보다 수영을 더 잘해요.',
    answer: '농구보다 수영을 더 잘해요.',
    acceptedAnswers: ['농구보다 수영을 더 잘해요'],
    answerTranslation: {
      ko: '농구보다 수영을 더 잘해요.',
      uz: 'Basketboldan ko‘ra suzishni yaxshiroq qilaman.',
      en: 'I am better at swimming than basketball.',
      ru: 'Я лучше плаваю, чем играю в баскетбол.',
    },
    difficulty: 4,
    tags: ['수영', '잘하다', '말하기'],
    hint: {
      ko: '“수영을 더 잘해요”를 자연스럽게 연결하세요.',
      uz: '“수영을 더 잘해요”ni tabiiy ayting.',
      en: 'Say 수영을 더 잘해요 smoothly.',
      ru: 'Плавно произнесите 수영을 더 잘해요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_175_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '뭐가 더 잘 어울려요?',
      },
    ],
    options: [
      '바지보다 치마가 더 잘 어울리는 것 같아요.',
      '치마보다 바지가 더 비싼 것 같아요.',
      '바지보다 치마가 더 높아요.',
      '치마보다 구두가 더 잘해요.',
    ],
    answer: '바지보다 치마가 더 잘 어울리는 것 같아요.',
    acceptedAnswers: ['바지보다 치마가 더 잘 어울리는 것 같아요'],
    answerTranslation: {
      ko: '바지보다 치마가 더 잘 어울리는 것 같아요.',
      uz: 'Shimdan ko‘ra yubka yaxshiroq yarashadiganga o‘xshaydi.',
      en: 'The skirt seems to suit her better than the pants.',
      ru: 'Кажется, юбка ей идёт больше, чем брюки.',
    },
    difficulty: 4,
    tags: ['연습1-2', '어울리다', '앱 예시'],
    hint: {
      ko: '원본 2번은 그림을 보고 어울림을 판단하는 활동이라 응답에 여지가 있어요. 여기서는 치마를 선택한 예시예요.',
      uz: '2-bandda tashqi ko‘rinishga qarab baho beriladi. Bu misolda yubka tanlangan.',
      en: 'Item 2 asks for a judgment from the picture; this app model chooses the skirt.',
      ru: 'В пункте 2 нужно оценить по рисунку; в примере выбрана юбка.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_176_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '바지보다 치마가 더 잘 어울리는 것 같아요.',
    options: [
      '치마가 더 잘 어울려 보여요.',
      '바지가 더 잘 어울려 보여요.',
      '치마가 더 비싸 보여요.',
      '바지가 더 편하다고 해요.',
    ],
    answer: '치마가 더 잘 어울려 보여요.',
    answerTranslation: {
      ko: '치마가 바지보다 더 잘 어울려 보인다는 판단입니다.',
      uz: 'Yubka shimdan ko‘ra yaxshiroq yarashadi deb o‘ylaydi.',
      en: 'The speaker thinks the skirt suits the person better than the pants.',
      ru: 'Говорящий считает, что юбка идёт человеку больше, чем брюки.',
    },
    difficulty: 4,
    tags: ['어울리다', '듣기'],
    hint: {
      ko: '“바지보다” 뒤의 비교 결과를 들으세요.',
      uz: '“바지보다”dan keyingi natijani tinglang.',
      en: 'Listen for the result after 바지보다.',
      ru: 'Расслышьте результат сравнения после 바지보다.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_177_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '구두보다 운동화가 더 ___.',
    blankAnswers: ['편해요'],
    options: ['편해요', '높아요', '비싸요', '잘해요', '짧아요'],
    answerTranslation: {
      ko: '구두보다 운동화가 더 편해요.',
      uz: 'Tuflidan ko‘ra krossovka qulayroq.',
      en: 'Sneakers are more comfortable than dress shoes.',
      ru: 'Кроссовки удобнее туфель.',
    },
    difficulty: 3,
    tags: ['연습1-5', '운동화', '편하다', '앱 예시'],
    hint: {
      ko: '원본 5번은 어떤 신발이 더 편한지 말하는 활동이에요.',
      uz: '5-band qaysi oyoq kiyim qulayroq ekanini so‘raydi.',
      en: 'Item 5 asks which footwear is more comfortable.',
      ru: 'Пункт 5 спрашивает, какая обувь удобнее.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_178_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '구두보다 운동화가 더 편해요.',
    acceptedAnswers: ['구두보다 운동화가 더 편해요'],
    answerTranslation: {
      ko: '구두보다 운동화가 더 편해요.',
      uz: 'Tuflidan ko‘ra krossovka qulayroq.',
      en: 'Sneakers are more comfortable than dress shoes.',
      ru: 'Кроссовки удобнее туфель.',
    },
    difficulty: 4,
    tags: ['운동화', '구두', '듣기'],
    hint: {
      ko: '신발 두 종류와 “더 편해요”를 들으세요.',
      uz: 'Ikki oyoq kiyim va “더 편해요”ni tinglang.',
      en: 'Listen for both footwear types and 더 편해요.',
      ru: 'Расслышьте оба вида обуви и 더 편해요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_179_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['구두보다', '운동화가', '더', '편해요', '높아요', '좋아해요'],
    answer: '구두보다 운동화가 더 편해요',
    answerTranslation: {
      ko: '구두보다 운동화가 더 편해요.',
      uz: 'Tuflidan ko‘ra krossovka qulayroq.',
      en: 'Sneakers are more comfortable than dress shoes.',
      ru: 'Кроссовки удобнее туфель.',
    },
    difficulty: 4,
    tags: ['편하다', '어순'],
    hint: {
      ko: '구두가 비교 기준이고 운동화의 편안함을 말해요.',
      uz: 'Tufli mezon, krossovkaning qulayligi aytiladi.',
      en: 'Dress shoes are the baseline; sneakers are described as more comfortable.',
      ru: 'Туфли — база сравнения, кроссовки описываются как более удобные.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_180_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.VOCABULARY,
    instruction: {
      ko: '많이 걸어야 할 때 더 알맞은 신발은 무엇입니까?',
      uz: 'Ko‘p yurish kerak bo‘lsa qaysi oyoq kiyim mosroq?',
      en: 'Which footwear is more suitable when you need to walk a lot?',
      ru: 'Какая обувь больше подходит, если нужно много ходить?',
    },
    passage:
      '오늘 여행하면서 하루 종일 많이 걸을 거예요. 구두는 예쁘지만 오래 신으면 발이 아파요. 운동화는 편해요.',
    options: ['운동화', '구두', '넥타이', '장갑'],
    answer: '운동화',
    answerTranslation: {
      ko: '오래 걸어야 하므로 더 편한 운동화가 알맞습니다.',
      uz: 'Ko‘p yurish uchun qulayroq krossovka mos.',
      en: 'Sneakers are more suitable because they are more comfortable for walking.',
      ru: 'Для долгой ходьбы больше подходят удобные кроссовки.',
    },
    difficulty: 4,
    tags: ['운동화', '편하다', '독해'],
    hint: {
      ko: '오래 걸을 때 중요한 조건을 찾으세요.',
      uz: 'Uzoq yurishda muhim shartni toping.',
      en: 'Identify the important condition for walking all day.',
      ru: 'Найдите главное условие для долгой ходьбы.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_181_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '여행할 때 구두하고 운동화 중에 뭘 신어요?',
      },
    ],
    options: [
      '구두보다 운동화가 더 편해서 운동화를 신어요.',
      '운동화보다 구두가 더 높아서 수영해요.',
      '구두보다 운동화가 더 비싸서 모자를 써요.',
      '운동화보다 구두를 더 잘해서 입어요.',
    ],
    answer: '구두보다 운동화가 더 편해서 운동화를 신어요.',
    acceptedAnswers: ['구두보다 운동화가 더 편해서 운동화를 신어요'],
    answerTranslation: {
      ko: '구두보다 운동화가 더 편해서 운동화를 신어요.',
      uz: 'Krossovka tuflidan qulayroq bo‘lgani uchun krossovka kiyaman.',
      en: 'I wear sneakers because they are more comfortable than dress shoes.',
      ru: 'Я надеваю кроссовки, потому что они удобнее туфель.',
    },
    difficulty: 4,
    tags: ['운동화', '편하다', '대화'],
    hint: {
      ko: '선택한 이유와 실제 선택을 연결하세요.',
      uz: 'Tanlov sababi va tanlovning o‘zini bog‘lang.',
      en: 'Connect the reason for the choice with the chosen footwear.',
      ru: 'Свяжите причину выбора с выбранной обувью.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_182_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '겨울보다 여름을 더 좋아해요.',
    answer: '겨울보다 여름을 더 좋아해요.',
    acceptedAnswers: ['겨울보다 여름을 더 좋아해요'],
    answerTranslation: {
      ko: '겨울보다 여름을 더 좋아해요.',
      uz: 'Qishdan ko‘ra yozni ko‘proq yoqtiraman.',
      en: 'I like summer more than winter.',
      ru: 'Я больше люблю лето, чем зиму.',
    },
    difficulty: 4,
    tags: ['연습1-6', '계절', '말하기', '앱 예시'],
    hint: {
      ko: '개인 선호를 비교해서 말하는 예시예요.',
      uz: 'Bu shaxsiy afzallikni taqqoslash namunasi.',
      en: 'This is a model for expressing a personal preference.',
      ru: 'Это пример выражения личного предпочтения.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_183_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '수영은 농구보다 잘하고 운동화는 구두보다 편해요.',
    options: [
      '수영을 더 잘하고 운동화가 더 편해요.',
      '농구를 더 잘하고 구두가 더 편해요.',
      '농구를 더 잘하고 운동화가 더 비싸요.',
      '수영을 못하고 구두를 좋아해요.',
    ],
    answer: '수영을 더 잘하고 운동화가 더 편해요.',
    answerTranslation: {
      ko: '수영 능력이 더 좋고 운동화가 더 편하다는 두 비교가 들어 있습니다.',
      uz: 'Suzish yaxshiroq va krossovka qulayroq degan ikki taqqoslash bor.',
      en: 'It contains two comparisons: better at swimming and sneakers being more comfortable.',
      ru: 'Есть два сравнения: лучше плавание и удобнее кроссовки.',
    },
    difficulty: 4,
    tags: ['수영', '운동화', '듣기'],
    hint: {
      ko: '운동 능력과 신발의 편안함을 각각 들으세요.',
      uz: 'Sport qobiliyati va oyoq kiyim qulayligini alohida tinglang.',
      en: 'Listen separately for athletic ability and footwear comfort.',
      ru: 'Отдельно расслышьте сравнение умения и удобства обуви.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_184_translate_builder: {
    type: 'translate_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '구두보다 운동화가 더 편해요',
      uz: 'Krossovka tuflidan qulayroq',
      en: 'Sneakers are more comfortable than dress shoes',
      ru: 'Кроссовки удобнее туфель',
    },
    options: ['구두보다', '운동화가', '더', '편해요', '비싸요', '높아요'],
    answer: '구두보다 운동화가 더 편해요',
    answerTranslation: {
      ko: '구두보다 운동화가 더 편해요.',
      uz: 'Krossovka tuflidan qulayroq.',
      en: 'Sneakers are more comfortable than dress shoes.',
      ru: 'Кроссовки удобнее туфель.',
    },
    difficulty: 4,
    tags: ['운동화', '편하다', '번역'],
    hint: {
      ko: '구두를 기준으로 운동화의 편안함을 비교해요.',
      uz: 'Tuflini mezon qilib krossovka qulayligini solishtiring.',
      en: 'Compare sneakers against dress shoes for comfort.',
      ru: 'Сравните кроссовки с туфлями по удобству.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_185_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '사람의 말과 맞는 것을 고르세요.',
      uz: 'Gapiruvchining fikriga mos variantni tanlang.',
      en: 'Choose the statement that matches the speaker.',
      ru: 'Выберите утверждение, соответствующее словам говорящего.',
    },
    passage:
      '저는 농구도 할 줄 알지만 수영을 더 잘해요. 신발은 구두도 좋아하지만 많이 걸을 때는 운동화가 더 편해요.',
    options: [
      '수영을 더 잘하고 많이 걸을 때 운동화를 신는 편이 좋아요.',
      '농구를 더 잘하고 구두가 더 편해요.',
      '수영을 할 줄 모르고 운동화를 싫어해요.',
      '농구와 수영을 모두 전혀 못해요.',
    ],
    answer: '수영을 더 잘하고 많이 걸을 때 운동화를 신는 편이 좋아요.',
    answerTranslation: {
      ko: '수영을 더 잘하며 많이 걸을 때 운동화가 더 편하다고 말합니다.',
      uz: 'Suzishni yaxshiroq biladi va ko‘p yurganda krossovka qulayroq.',
      en: 'The speaker is better at swimming and finds sneakers more comfortable for lots of walking.',
      ru: 'Говорящий лучше плавает и считает кроссовки удобнее для долгой ходьбы.',
    },
    difficulty: 4,
    tags: ['비교', '독해'],
    hint: {
      ko: '운동과 신발에 대한 비교가 하나씩 있어요.',
      uz: 'Sport va oyoq kiyim bo‘yicha bittadan taqqoslash bor.',
      en: 'There is one sports comparison and one footwear comparison.',
      ru: 'Есть одно сравнение спорта и одно — обуви.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_186_dialog_order: {
    type: 'dialog_order',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialogOrder,
    dialogLines: [
      {
        speaker: 'npc',
        text: '농구 잘해요?',
      },
      {
        speaker: 'user',
        text: '네, 할 줄 알아요.',
      },
      {
        speaker: 'npc',
        text: '농구하고 수영 중에 뭘 더 잘해요?',
      },
      {
        speaker: 'user',
        text: '농구보다 수영을 더 잘해요.',
      },
    ],
    answer: 'all_correct',
    answerTranslation: {
      ko: '농구를 할 수 있는지 확인한 뒤 농구와 수영 중 어느 운동을 더 잘하는지 비교합니다.',
      uz: 'Avval basketbol qobiliyati, keyin basketbol va suzish taqqoslanadi.',
      en: 'The dialogue checks basketball ability first, then compares basketball and swimming.',
      ru: 'Сначала проверяют умение играть в баскетбол, затем сравнивают его с плаванием.',
    },
    difficulty: 5,
    tags: ['농구', '수영', '대화 순서'],
    hint: {
      ko: '가능 여부 질문 뒤에 두 운동 비교가 나와요.',
      uz: 'Qobiliyat savolidan keyin ikki sport taqqoslanadi.',
      en: 'The ability question comes before the comparison.',
      ru: 'Сначала вопрос об умении, затем сравнение.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_187_listen_fill: {
    type: 'listen_fill',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenFill,
    sentenceTemplate: '농구보다 ___을 더 잘하고, 구두보다 ___가 더 편해요.',
    blankAnswers: ['수영', '운동화'],
    answerTranslation: {
      ko: '농구보다 수영을 더 잘하고, 구두보다 운동화가 더 편해요.',
      uz: 'Basketboldan ko‘ra suzishni yaxshiroq qilaman, tuflidan ko‘ra krossovka qulayroq.',
      en: 'I am better at swimming than basketball, and sneakers are more comfortable than dress shoes.',
      ru: 'Я лучше плаваю, чем играю в баскетбол, а кроссовки удобнее туфель.',
    },
    difficulty: 5,
    tags: ['비교', '듣기 종합'],
    hint: {
      ko: '첫 빈칸은 운동, 두 번째는 신발이에요.',
      uz: 'Birinchi bo‘shliq sport, ikkinchisi oyoq kiyim.',
      en: 'The first blank is a sport; the second is footwear.',
      ru: 'Первый пропуск — спорт, второй — обувь.',
    },
    xpReward: 25,
    isActive: true,
  },

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 두 가지를 비교해서 말해요
  // p.79 전체 종합·실생활 확장
  // ──────────────────────────────────────────────────────────

  s3u4_188_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '불고기하고 비빔밥 중에서 뭘 더 좋아하세요?',
      },
    ],
    options: [
      '불고기보다 비빔밥을 더 좋아해요.',
      '비빔밥보다 불고기가 더 높아요.',
      '불고기보다 운동화가 더 편해요.',
      '비빔밥보다 수영을 더 잘해요.',
    ],
    answer: '불고기보다 비빔밥을 더 좋아해요.',
    acceptedAnswers: ['불고기보다 비빔밥을 더 좋아해요'],
    answerTranslation: {
      ko: '불고기보다 비빔밥을 더 좋아해요.',
      uz: 'Bulgogidan ko‘ra bibimbapni ko‘proq yoqtiraman.',
      en: 'I like bibimbap more than bulgogi.',
      ru: 'Я больше люблю пибимпап, чем пулькоги.',
    },
    difficulty: 3,
    tags: ['교재79', '복습'],
    hint: {
      ko: '79쪽 보기 문장을 그대로 떠올리세요.',
      uz: '79-betdagi namunani eslang.',
      en: 'Recall the example on page 79.',
      ru: 'Вспомните пример на странице 79.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_189_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '사과는 천 원이고 배는 천오백 원이니까 사과보다 배가 더 비싸요.',
    options: [
      '배가 더 비싸요.',
      '사과가 더 비싸요.',
      '두 과일이 같은 가격이에요.',
      '가격을 알 수 없어요.',
    ],
    answer: '배가 더 비싸요.',
    answerTranslation: {
      ko: '배가 사과보다 500원 더 비쌉니다.',
      uz: 'Nok olmadan 500 von qimmatroq.',
      en: 'The pear is 500 won more expensive than the apple.',
      ru: 'Груша на 500 вон дороже яблока.',
    },
    difficulty: 3,
    tags: ['가격 비교', '듣기'],
    hint: {
      ko: '두 가격을 듣고 더 큰 금액을 찾으세요.',
      uz: 'Ikki narxdan kattasini toping.',
      en: 'Listen for the larger of the two prices.',
      ru: 'Найдите большую из двух цен.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_190_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate:
      '지리산은 1,915m이고 한라산은 1,950m예요. 지리산___ 한라산이 더 높아요.',
    blankAnswers: ['보다'],
    options: ['보다', '부터', '하고', '에게', '이나'],
    answerTranslation: {
      ko: '지리산보다 한라산이 더 높아요.',
      uz: 'Hallasan Jirisandan balandroq.',
      en: 'Hallasan is higher than Jirisan.',
      ru: 'Халласан выше Чирисана.',
    },
    difficulty: 3,
    tags: ['지리산', '한라산', 'N보다'],
    hint: {
      ko: '비교 기준인 지리산 뒤에 붙여요.',
      uz: 'Jirisan taqqoslash mezoni.',
      en: 'Attach it to the baseline, 지리산.',
      ru: 'Добавьте частицу к базе сравнения — 지리산.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_191_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '사과보다 배가 더 비싸고 지리산보다 한라산이 더 높아요.',
    answer: '사과보다 배가 더 비싸고 지리산보다 한라산이 더 높아요.',
    acceptedAnswers: ['사과보다 배가 더 비싸고 지리산보다 한라산이 더 높아요'],
    answerTranslation: {
      ko: '배는 사과보다 비싸고 한라산은 지리산보다 높습니다.',
      uz: 'Nok olmadan qimmatroq, Hallasan Jirisandan balandroq.',
      en: 'Pears are more expensive than apples, and Hallasan is higher than Jirisan.',
      ru: 'Груши дороже яблок, а Халласан выше Чирисана.',
    },
    difficulty: 5,
    tags: ['비교 두 개', '말하기'],
    hint: {
      ko: '가격 비교와 높이 비교를 한 문장으로 이어 말하세요.',
      uz: 'Narx va balandlik taqqoslashini bir gapda ayting.',
      en: 'Connect the price comparison and height comparison in one sentence.',
      ru: 'Соедините сравнение цены и высоты в одном предложении.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_192_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['농구보다', '수영을', '더', '잘해요', '편해요', '사과가'],
    answer: '농구보다 수영을 더 잘해요',
    answerTranslation: {
      ko: '농구보다 수영을 더 잘해요.',
      uz: 'Basketboldan ko‘ra suzishni yaxshiroq qilaman.',
      en: 'I am better at swimming than basketball.',
      ru: 'Я лучше плаваю, чем играю в баскетбол.',
    },
    difficulty: 4,
    tags: ['연습1-1', '어순'],
    hint: {
      ko: '운동 능력 비교 문장을 만드세요.',
      uz: 'Sport qobiliyatini taqqoslang.',
      en: 'Build the athletic-ability comparison.',
      ru: 'Составьте сравнение спортивного умения.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_193_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '구두보다 운동화가 더 편해요.',
    acceptedAnswers: ['구두보다 운동화가 더 편해요'],
    answerTranslation: {
      ko: '구두보다 운동화가 더 편해요.',
      uz: 'Krossovka tuflidan qulayroq.',
      en: 'Sneakers are more comfortable than dress shoes.',
      ru: 'Кроссовки удобнее туфель.',
    },
    difficulty: 4,
    tags: ['연습1-5', '듣기'],
    hint: {
      ko: '편안함을 비교하는 문장이에요.',
      uz: 'Qulaylik taqqoslanmoqda.',
      en: 'The sentence compares comfort.',
      ru: 'Сравнивается удобство.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_194_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '“A보다 B가 더 높아요”의 뜻으로 맞는 것은 무엇입니까?',
      uz: '“A보다 B가 더 높아요” nimani anglatadi?',
      en: 'What does A보다 B가 더 높아요 mean?',
      ru: 'Что означает A보다 B가 더 높아요?',
    },
    passage: 'A보다 B가 더 높아요.',
    options: [
      'B의 높이가 A의 높이보다 큽니다.',
      'A의 높이가 B의 높이보다 큽니다.',
      'A와 B의 높이가 같습니다.',
      'A와 B의 가격을 비교합니다.',
    ],
    answer: 'B의 높이가 A의 높이보다 큽니다.',
    answerTranslation: {
      ko: 'A를 기준으로 비교했을 때 B가 더 높다는 뜻입니다.',
      uz: 'A mezon bo‘lganda B balandroq degani.',
      en: 'It means B is higher when A is used as the comparison baseline.',
      ru: 'Это значит, что B выше A.',
    },
    difficulty: 4,
    tags: ['N보다', '의미 이해'],
    hint: {
      ko: '보다 앞의 A가 비교 기준이에요.',
      uz: '보다 oldidagi A — mezon.',
      en: 'A before 보다 is the baseline.',
      ru: 'A перед 보다 — база сравнения.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_195_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '어느 산이 더 높아요?',
    options: ['지리산보다', '한라산이', '더', '높아요', '좋아해요', '농구보다'],
    answer: '지리산보다 한라산이 더 높아요',
    answerTranslation: {
      ko: '지리산보다 한라산이 더 높아요.',
      uz: 'Hallasan Jirisandan balandroq.',
      en: 'Hallasan is higher than Jirisan.',
      ru: 'Халласан выше Чирисана.',
    },
    difficulty: 4,
    tags: ['연습1-4', '응답'],
    hint: {
      ko: '한라산은 1,950m예요.',
      uz: 'Hallasan 1950 metr.',
      en: 'Hallasan is 1,950 m high.',
      ru: 'Высота Халласана — 1950 м.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_196_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '저는 구두보다 운동화를 더 자주 신어요. 운동화가 더 편해요.',
    options: [
      '운동화를 더 자주 신어요.',
      '구두가 더 편해요.',
      '구두를 전혀 신을 수 없어요.',
      '운동화보다 구두가 더 좋아요.',
    ],
    answer: '운동화를 더 자주 신어요.',
    answerTranslation: {
      ko: '운동화가 더 편해서 운동화를 더 자주 신습니다.',
      uz: 'Krossovka qulayroq bo‘lgani uchun uni ko‘proq kiyadi.',
      en: 'The speaker wears sneakers more often because they are more comfortable.',
      ru: 'Говорящий чаще носит кроссовки, потому что они удобнее.',
    },
    difficulty: 4,
    tags: ['운동화', '편하다', '듣기'],
    hint: {
      ko: '더 편한 신발과 더 자주 신는 신발이 같아요.',
      uz: 'Qulayroq va ko‘proq kiyiladigan oyoq kiyim bir xil.',
      en: 'The more comfortable shoes are also worn more often.',
      ru: 'Более удобную обувь также носят чаще.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_197_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate:
      '저는 농구보다 수영을 더 ___, 겨울보다 여름을 더 좋아해요.',
    blankAnswers: ['잘해요'],
    options: ['잘해요', '높아요', '비싸요', '편해요', '어울려요'],
    answerTranslation: {
      ko: '저는 농구보다 수영을 더 잘하고, 겨울보다 여름을 더 좋아해요.',
      uz: 'Basketboldan ko‘ra suzishni yaxshiroq qilaman va qishdan ko‘ra yozni ko‘proq yoqtiraman.',
      en: 'I am better at swimming than basketball, and I like summer more than winter.',
      ru: 'Я лучше плаваю, чем играю в баскетбол, и больше люблю лето, чем зиму.',
    },
    difficulty: 4,
    tags: ['운동', '계절', '비교'],
    hint: {
      ko: '첫 비교는 운동 능력에 대한 것이에요.',
      uz: 'Birinchi taqqoslash sport qobiliyati haqida.',
      en: 'The first comparison is about athletic ability.',
      ru: 'Первое сравнение касается спортивного умения.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_198_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '지리산보다 한라산이 더 높고 사과보다 배가 더 비싸요.',
    answer: '지리산보다 한라산이 더 높고 사과보다 배가 더 비싸요.',
    acceptedAnswers: ['지리산보다 한라산이 더 높고 사과보다 배가 더 비싸요'],
    answerTranslation: {
      ko: '한라산은 더 높고 배는 더 비쌉니다.',
      uz: 'Hallasan balandroq, nok esa qimmatroq.',
      en: 'Hallasan is higher, and pears are more expensive.',
      ru: 'Халласан выше, а груша дороже.',
    },
    difficulty: 5,
    tags: ['비교 종합', '말하기'],
    hint: {
      ko: '높이와 가격이라는 다른 두 비교를 연결하세요.',
      uz: 'Balandlik va narx taqqoslashini bog‘lang.',
      en: 'Connect a height comparison with a price comparison.',
      ru: 'Соедините сравнение высоты и цены.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_199_translate_builder: {
    type: 'translate_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '농구보다 수영을 더 잘해요',
      uz: 'Basketboldan ko‘ra suzishni yaxshiroq qilaman',
      en: 'I am better at swimming than basketball',
      ru: 'Я лучше плаваю, чем играю в баскетбол',
    },
    options: ['농구보다', '수영을', '더', '잘해요', '좋아해요', '높아요'],
    answer: '농구보다 수영을 더 잘해요',
    answerTranslation: {
      ko: '농구보다 수영을 더 잘해요.',
      uz: 'Basketboldan ko‘ra suzishni yaxshiroq qilaman.',
      en: 'I am better at swimming than basketball.',
      ru: 'Я лучше плаваю, чем играю в баскетбол.',
    },
    difficulty: 4,
    tags: ['농구', '수영', '번역'],
    hint: {
      ko: '좋아하는 정도가 아니라 실력을 비교해요.',
      uz: 'Yoqtirish emas, mahorat taqqoslanmoqda.',
      en: 'Compare ability, not preference.',
      ru: 'Сравнивается умение, а не предпочтение.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_200_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '마리코 씨에 대한 설명으로 맞는 것을 고르세요.',
      uz: 'Mariko haqida to‘g‘ri gapni tanlang.',
      en: 'Choose the correct statement about Mariko.',
      ru: 'Выберите верное утверждение о Марико.',
    },
    passage:
      '마리코: 저는 구두보다 운동화를 더 좋아해요. 운동화가 더 편해요. 그리고 겨울보다 여름을 더 좋아해요. 추운 날씨를 별로 좋아하지 않아요.',
    options: [
      '운동화와 여름을 더 좋아해요.',
      '구두와 겨울을 더 좋아해요.',
      '운동화보다 구두가 더 편하다고 생각해요.',
      '추운 날씨를 아주 좋아해요.',
    ],
    answer: '운동화와 여름을 더 좋아해요.',
    answerTranslation: {
      ko: '운동화를 더 좋아하고 겨울보다 여름을 더 좋아합니다.',
      uz: 'Krossovka va yozni ko‘proq yoqtiradi.',
      en: 'Mariko prefers sneakers and summer.',
      ru: 'Марико больше любит кроссовки и лето.',
    },
    difficulty: 4,
    tags: ['N보다', '독해 종합'],
    hint: {
      ko: '신발과 계절에 대한 비교를 각각 확인하세요.',
      uz: 'Oyoq kiyim va fasl taqqoslashini tekshiring.',
      en: 'Check the footwear and season comparisons separately.',
      ru: 'Отдельно проверьте сравнение обуви и сезонов.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_201_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '여행할 때 어떤 신발이 더 편해요?',
      },
    ],
    options: [
      '구두보다 운동화가 더 편해요.',
      '운동화보다 구두가 더 높아요.',
      '구두보다 치마가 더 잘해요.',
      '운동화보다 겨울이 더 좋아요.',
    ],
    answer: '구두보다 운동화가 더 편해요.',
    acceptedAnswers: ['구두보다 운동화가 더 편해요'],
    answerTranslation: {
      ko: '구두보다 운동화가 더 편해요.',
      uz: 'Tuflidan ko‘ra krossovka qulayroq.',
      en: 'Sneakers are more comfortable than dress shoes.',
      ru: 'Кроссовки удобнее туфель.',
    },
    difficulty: 3,
    tags: ['연습1-5', '실생활 대화'],
    hint: {
      ko: '신발의 편안함을 비교하세요.',
      uz: 'Oyoq kiyim qulayligini taqqoslang.',
      en: 'Compare the comfort of the two types of footwear.',
      ru: 'Сравните удобство двух видов обуви.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_202_listen_fill: {
    type: 'listen_fill',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenFill,
    sentenceTemplate: '사과보다 배가 더 ___, 지리산보다 한라산이 더 ___.',
    blankAnswers: ['비싸요', '높아요'],
    answerTranslation: {
      ko: '사과보다 배가 더 비싸고, 지리산보다 한라산이 더 높아요.',
      uz: 'Nok olmadan qimmatroq, Hallasan Jirisandan balandroq.',
      en: 'Pears are more expensive than apples, and Hallasan is higher than Jirisan.',
      ru: 'Груша дороже яблока, а Халласан выше Чирисана.',
    },
    difficulty: 5,
    tags: ['가격', '높이', '듣기'],
    hint: {
      ko: '첫 번째는 가격, 두 번째는 높이에 대한 표현이에요.',
      uz: 'Birinchisi narx, ikkinchisi balandlik.',
      en: 'The first blank concerns price; the second concerns height.',
      ru: 'Первый пропуск о цене, второй — о высоте.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_203_dialog_order: {
    type: 'dialog_order',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialogOrder,
    dialogLines: [
      {
        speaker: 'npc',
        text: '어떤 계절을 더 좋아해요?',
      },
      {
        speaker: 'user',
        text: '겨울보다 여름을 더 좋아해요.',
      },
      {
        speaker: 'npc',
        text: '왜 여름을 더 좋아해요?',
      },
      {
        speaker: 'user',
        text: '추운 날씨를 별로 좋아하지 않아요.',
      },
    ],
    answer: 'all_correct',
    answerTranslation: {
      ko: '계절 선호를 비교해서 말한 뒤 그 이유를 설명하는 대화입니다.',
      uz: 'Fasl afzalligi aytilib, keyin sababi tushuntiriladi.',
      en: 'The dialogue compares seasonal preference and then explains the reason.',
      ru: 'Сначала сравнивают предпочтение сезонов, затем объясняют причину.',
    },
    difficulty: 5,
    tags: ['계절', '비교', '대화 순서'],
    hint: {
      ko: '선호 질문 → 비교 응답 → 이유 질문 → 이유 순서예요.',
      uz: 'Afzallik savoli → javob → sabab savoli → sabab.',
      en: 'Preference question → comparison → why → reason.',
      ru: 'Вопрос о предпочтении → сравнение → вопрос о причине → причина.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_204_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.cloze,
    passage:
      '여러 가지를 비교해 봐요. 불고기___ 비빔밥을 더 좋아해요. 농구___ 수영을 더 잘해요. 사과___ 배가 더 비싸요. 지리산___ 한라산이 더 높아요. 구두___ 운동화가 더 편해요.',
    options: ['보다', '보다도', '하고', '에서', '에게'],
    answer: '보다|보다도|하고|에서|에게',
    answerTranslation: {
      ko: '79쪽의 음식·운동·가격·산·신발 비교를 한 번에 복습합니다.',
      uz: '79-betdagi taom, sport, narx, tog‘ va oyoq kiyim taqqoslashlari takrorlanadi.',
      en: 'This reviews the page-79 comparisons of food, sports, prices, mountains, and footwear.',
      ru: 'Повторяются сравнения еды, спорта, цен, гор и обуви со страницы 79.',
    },
    difficulty: 5,
    tags: ['Node3 종합', 'N보다', '교재79'],
    hint: {
      ko: '모든 빈칸은 비교 기준 뒤에 오는 같은 조사예요.',
      uz: 'Barcha bo‘shliqlarda bir xil taqqoslash qo‘shimchasi kerak.',
      en: 'Every blank needs the same comparison particle.',
      ru: 'Во всех пропусках нужна одна и та же частица сравнения.',
    },
    xpReward: 25,
    isActive: true,
  },
  // ══════════════════════════════════════════════════════════
  // Unit 4 · Node 4 · ~았으면/었으면 좋겠어요
  // 교재 p.80~81 전체
  //
  // p.80 연습 1
  //
  // [보기]
  // 세계 여행을 하다
  // → 세계 여행을 했으면 좋겠어요.
  //
  // 1) 1등을 하다
  // 2) 돈을 많이 벌다
  // 3) 한국말을 잘하다
  // 4) 내일 날씨가 좋다
  // 5) 시험이 쉽다
  // 6) 춤을 잘 추다
  // 7) 유명한 가수가 되다
  //
  // p.81 연습 2
  //
  // [보기]
  // A: 어떤 집에 살고 싶어요?
  // B: 바다가 가까운 집에 살았으면 좋겠어요.
  //
  // 1) 무슨 선물을 받고 싶어요?
  // 2) 어떤 영화를 보고 싶어요?
  // 3) 어떤 일을 하고 싶어요?
  // 4) 누구를 만나고 싶어요?
  //
  // → 자유 응답 활동이므로 아래 구체적 대답은 앱용 예시.
  //
  // p.81 연습 3
  //
  // 우리 반 친구에게 바라는 것이 있어요?
  // [보기]와 같이 친구에게 써 보세요.
  //
  // → 자유쓰기 활동.
  // 원본에서 요구하는 핵심은
  // "친구에게 바라는 것을 ~았으면/었으면 좋겠다로 표현"하는 것.
  // 구체적인 앱 문장은 예시 응답으로 처리.
  //
  // Grammar 전용 문제 타입 사용 금지.
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 바라는 일을 말해요
  // p.80 연습 1 전체
  // ──────────────────────────────────────────────────────────

  s3u4_205_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '세계 여행을 ___ 좋겠어요.',
    blankAnswers: ['했으면'],
    options: ['했으면', '하면', '하는', '하려고', '해 봐서'],
    answerTranslation: {
      ko: '세계 여행을 했으면 좋겠어요.',
      uz: 'Dunyo bo‘ylab sayohat qilsam yaxshi bo‘lardi.',
      en: 'I wish I could travel around the world.',
      ru: 'Было бы хорошо попутешествовать по миру.',
    },
    difficulty: 3,
    tags: ['했으면 좋겠다', '세계 여행', '교재80'],
    hint: {
      ko: '교재 연습 1의 보기 문장이야.',
      uz: 'Bu 1-mashqdagi namuna gap.',
      en: 'This is the example from Exercise 1.',
      ru: 'Это пример из упражнения 1.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_206_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '세계 여행을 했으면 좋겠어요.',
    options: [
      '세계 여러 나라를 여행하고 싶어요.',
      '세계 여행을 이미 끝냈어요.',
      '여행하는 것을 싫어해요.',
      '오늘 여행을 취소했어요.',
    ],
    answer: '세계 여러 나라를 여행하고 싶어요.',
    answerTranslation: {
      ko: '세계 여행을 하고 싶은 바람을 말해.',
      uz: 'Dunyo bo‘ylab sayohat qilish istagi aytilmoqda.',
      en: 'The speaker expresses a wish to travel around the world.',
      ru: 'Говорящий выражает желание путешествовать по миру.',
    },
    difficulty: 3,
    tags: ['세계 여행', '바람', '듣기'],
    hint: {
      ko: '이미 한 일이 아니라 앞으로 바라는 일이야.',
      uz: 'Bu o‘tgan ish emas, kelajakdagi istak.',
      en: 'It is a wish, not something already completed.',
      ru: 'Это желание, а не уже совершённое действие.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_207_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['이번', '대회에서', '1등을', '했으면', '좋겠어요', '하는'],
    answer: '이번 대회에서 1등을 했으면 좋겠어요',
    answerTranslation: {
      ko: '이번 대회에서 1등을 했으면 좋겠어요.',
      uz: 'Bu musobaqada birinchi o‘rin olsam yaxshi bo‘lardi.',
      en: 'I hope I can take first place in this competition.',
      ru: 'Надеюсь занять первое место в этом соревновании.',
    },
    difficulty: 4,
    tags: ['1등', '했으면 좋겠다', '연습1-1'],
    hint: {
      ko: '1등을 하다를 바람 표현으로 만들어.',
      uz: '1등을 하다 ni istak shakliga aylantir.',
      en: 'Turn 1등을 하다 into a wish.',
      ru: 'Преобразуйте 1등을 하다 в выражение желания.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_208_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '1등을 했으면 좋겠어요.',
    answer: '1등을 했으면 좋겠어요.',
    acceptedAnswers: ['1등을 했으면 좋겠어요'],
    answerTranslation: {
      ko: '1등을 했으면 좋겠어요.',
      uz: 'Birinchi o‘rin olsam yaxshi bo‘lardi.',
      en: 'I hope I can come in first.',
      ru: 'Надеюсь занять первое место.',
    },
    difficulty: 3,
    tags: ['1등', '말하기', '교재80'],
    hint: {
      ko: '원하는 결과를 부드럽게 말해.',
      uz: 'Istalgan natijani yumshoq ayt.',
      en: 'Express the desired outcome gently.',
      ru: 'Мягко выразите желаемый результат.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_209_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '돈을 많이 ___ 좋겠어요.',
    blankAnswers: ['벌었으면'],
    options: ['벌었으면', '벌으면', '버는', '벌려고', '벌어서'],
    answerTranslation: {
      ko: '돈을 많이 벌었으면 좋겠어요.',
      uz: 'Ko‘p pul topsam yaxshi bo‘lardi.',
      en: 'I hope I can earn a lot of money.',
      ru: 'Хотелось бы много зарабатывать.',
    },
    difficulty: 4,
    tags: ['벌다', '연습1-2', '교재80'],
    hint: {
      ko: '벌다 → 벌었으면 좋겠어요.',
      uz: '벌다 → 벌었으면 좋겠어요.',
      en: '벌다 becomes 벌었으면 좋겠어요.',
      ru: '벌다 → 벌었으면 좋겠어요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_210_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '돈을 많이 벌었으면 좋겠어요.',
    acceptedAnswers: ['돈을 많이 벌었으면 좋겠어요'],
    answerTranslation: {
      ko: '돈을 많이 벌었으면 좋겠어요.',
      uz: 'Ko‘p pul topsam yaxshi bo‘lardi.',
      en: 'I hope I can earn a lot of money.',
      ru: 'Хотелось бы много зарабатывать.',
    },
    difficulty: 4,
    tags: ['벌었으면 좋겠다', '듣기'],
    hint: {
      ko: '“많이”와 “벌었으면”을 정확히 들어.',
      uz: '“많이” va “벌었으면”ni aniq tingla.',
      en: 'Listen carefully for 많이 and 벌었으면.',
      ru: 'Расслышьте 많이 и 벌었으면.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_211_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '한국어 공부하면서 바라는 게 있어요?',
    options: ['한국말을', '잘했으면', '좋겠어요', '어려웠으면', '여행을'],
    answer: '한국말을 잘했으면 좋겠어요',
    answerTranslation: {
      ko: '한국말을 잘했으면 좋겠어요.',
      uz: 'Koreys tilida yaxshi gapirsam yaxshi bo‘lardi.',
      en: 'I wish I were good at Korean.',
      ru: 'Хотелось бы хорошо владеть корейским.',
    },
    difficulty: 4,
    tags: ['한국말', '연습1-3', '응답'],
    hint: {
      ko: '교재의 “한국말을 잘하다”를 사용해.',
      uz: 'Darslikdagi “한국말을 잘하다”dan foydalan.',
      en: 'Use the textbook item 한국말을 잘하다.',
      ru: 'Используйте 한국말을 잘하다 из учебника.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_212_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '한국말을 잘했으면 좋겠어요.',
    options: [
      '한국어를 더 잘하고 싶어요.',
      '한국어 공부를 그만두고 싶어요.',
      '한국어를 전혀 사용하지 않아요.',
      '한국어 시험을 이미 끝냈어요.',
    ],
    answer: '한국어를 더 잘하고 싶어요.',
    answerTranslation: {
      ko: '한국말을 더 잘하고 싶다는 바람이야.',
      uz: 'Koreys tilini yaxshiroq bilish istagi.',
      en: 'The speaker wishes to become better at Korean.',
      ru: 'Говорящий хочет лучше владеть корейским.',
    },
    difficulty: 3,
    tags: ['한국말', '바람', '듣기'],
    hint: {
      ko: '능력에 대한 바람이야.',
      uz: 'Bu qobiliyat haqidagi istak.',
      en: 'It is a wish about ability.',
      ru: 'Это желание, связанное с умением.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_213_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '소풍을 가니까 내일 날씨가 ___ 좋겠어요.',
    blankAnswers: ['좋았으면'],
    options: ['좋았으면', '좋으면', '좋은', '좋아해서', '좋는'],
    answerTranslation: {
      ko: '내일 날씨가 좋았으면 좋겠어요.',
      uz: 'Ertaga havo yaxshi bo‘lsa edi.',
      en: 'I hope the weather is nice tomorrow.',
      ru: 'Надеюсь, завтра будет хорошая погода.',
    },
    difficulty: 4,
    tags: ['날씨', '좋다', '연습1-4'],
    hint: {
      ko: '좋다 → 좋았으면 좋겠어요.',
      uz: '좋다 → 좋았으면 좋겠어요.',
      en: '좋다 becomes 좋았으면 좋겠어요.',
      ru: '좋다 → 좋았으면 좋겠어요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_214_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '내일 여행 가죠? 날씨가 어떨까요?',
      },
    ],
    options: [
      '날씨가 좋았으면 좋겠어요.',
      '날씨를 잘했으면 좋겠어요.',
      '날씨가 벌었으면 좋겠어요.',
      '날씨가 1등을 했으면 좋겠어요.',
    ],
    answer: '날씨가 좋았으면 좋겠어요.',
    acceptedAnswers: ['날씨가 좋았으면 좋겠어요'],
    answerTranslation: {
      ko: '날씨가 좋았으면 좋겠어요.',
      uz: 'Havo yaxshi bo‘lsa edi.',
      en: 'I hope the weather is good.',
      ru: 'Надеюсь, погода будет хорошей.',
    },
    difficulty: 3,
    tags: ['날씨', '바람', '대화'],
    hint: {
      ko: '여행 전에 날씨에 대해 바라는 말을 해.',
      uz: 'Sayohatdan oldin ob-havo haqida istak ayt.',
      en: 'Express a wish about the weather before a trip.',
      ru: 'Выразите пожелание о погоде перед поездкой.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_215_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['내일', '시험이', '쉬웠으면', '좋겠어요', '쉬는', '시험을'],
    answer: '내일 시험이 쉬웠으면 좋겠어요',
    answerTranslation: {
      ko: '내일 시험이 쉬웠으면 좋겠어요.',
      uz: 'Ertangi imtihon oson bo‘lsa edi.',
      en: 'I hope tomorrow’s exam is easy.',
      ru: 'Надеюсь, завтрашний экзамен будет лёгким.',
    },
    difficulty: 4,
    tags: ['시험', '쉽다', '연습1-5'],
    hint: {
      ko: '시험의 난이도에 대한 바람이야.',
      uz: 'Imtihon qiyinligi haqida istak.',
      en: 'This is a wish about the difficulty of the exam.',
      ru: 'Это пожелание о сложности экзамена.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_216_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '시험이 쉬웠으면 좋겠어요.',
    answer: '시험이 쉬웠으면 좋겠어요.',
    acceptedAnswers: ['시험이 쉬웠으면 좋겠어요'],
    answerTranslation: {
      ko: '시험이 쉬웠으면 좋겠어요.',
      uz: 'Imtihon oson bo‘lsa edi.',
      en: 'I hope the exam is easy.',
      ru: 'Надеюсь, экзамен будет лёгким.',
    },
    difficulty: 4,
    tags: ['시험', '쉬웠으면 좋겠다', '말하기'],
    hint: {
      ko: '쉽다의 형태 변화에 주의해.',
      uz: '쉽다 shakliga e’tibor ber.',
      en: 'Pay attention to the change from 쉽다.',
      ru: 'Обратите внимание на изменение 쉽다.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_217_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '저도 춤을 잘 ___ 좋겠어요.',
    blankAnswers: ['추었으면'],
    options: ['추었으면', '추면', '추는', '추려고', '춘'],
    answerTranslation: {
      ko: '저도 춤을 잘 추었으면 좋겠어요.',
      uz: 'Men ham yaxshi raqsga tushsam edi.',
      en: 'I wish I could dance well too.',
      ru: 'Хотелось бы и мне хорошо танцевать.',
    },
    difficulty: 4,
    tags: ['춤', '추다', '연습1-6'],
    hint: {
      ko: '춤을 추다 → 춤을 추었으면 좋겠어요.',
      uz: '춤을 추다 → 춤을 추었으면 좋겠어요.',
      en: '춤을 추다 becomes 춤을 추었으면 좋겠어요.',
      ru: '춤을 추다 → 춤을 추었으면 좋겠어요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_218_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '춤을 잘 추었으면 좋겠어요.',
    options: [
      '춤을 더 잘 추고 싶어요.',
      '춤추는 것을 싫어해요.',
      '춤을 이미 아주 잘 춰요.',
      '춤을 배우지 않을 거예요.',
    ],
    answer: '춤을 더 잘 추고 싶어요.',
    answerTranslation: {
      ko: '춤 실력이 좋아지기를 바라.',
      uz: 'Raqs qobiliyati yaxshilanishini xohlaydi.',
      en: 'The speaker wishes to become a better dancer.',
      ru: 'Говорящий хочет лучше танцевать.',
    },
    difficulty: 3,
    tags: ['춤', '듣기'],
    hint: {
      ko: '현재 사실이 아니라 바라는 능력이야.',
      uz: 'Bu hozirgi fakt emas, istalgan qobiliyat.',
      en: 'It is a desired ability, not a current fact.',
      ru: 'Это желаемое умение, а не текущий факт.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_219_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '나중에 어떤 사람이 되고 싶어요?',
    options: ['유명한', '가수가', '되었으면', '좋겠어요', '비싸요', '운동화를'],
    answer: '유명한 가수가 되었으면 좋겠어요',
    answerTranslation: {
      ko: '유명한 가수가 되었으면 좋겠어요.',
      uz: 'Mashhur qo‘shiqchi bo‘lsam edi.',
      en: 'I hope to become a famous singer.',
      ru: 'Хотелось бы стать известным певцом.',
    },
    difficulty: 4,
    tags: ['가수', '되다', '연습1-7'],
    hint: {
      ko: '교재의 마지막 항목 “유명한 가수가 되다”를 사용해.',
      uz: 'Oxirgi band “유명한 가수가 되다”dan foydalan.',
      en: 'Use the final textbook item, 유명한 가수가 되다.',
      ru: 'Используйте последний пункт — 유명한 가수가 되다.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_220_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '유명한 가수가 되었으면 좋겠어요.',
    acceptedAnswers: ['유명한 가수가 되었으면 좋겠어요'],
    answerTranslation: {
      ko: '유명한 가수가 되었으면 좋겠어요.',
      uz: 'Mashhur qo‘shiqchi bo‘lsam edi.',
      en: 'I hope to become a famous singer.',
      ru: 'Хотелось бы стать известным певцом.',
    },
    difficulty: 5,
    tags: ['가수', '되었으면 좋겠다', '듣기'],
    hint: {
      ko: '“가수가”와 “되었으면”을 정확히 입력해.',
      uz: '“가수가” va “되었으면”ni aniq yoz.',
      en: 'Type 가수가 and 되었으면 carefully.',
      ru: 'Точно введите 가수가 и 되었으면.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_221_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.cloze,
    passage:
      '바라는 일을 말해 봐요. 세계 여행을 ___. 돈을 많이 ___. 내일 날씨가 ___. 시험이 ___. 유명한 가수가 ___.',
    options: [
      '했으면 좋겠어요',
      '벌었으면 좋겠어요',
      '좋았으면 좋겠어요',
      '쉬웠으면 좋겠어요',
      '되었으면 좋겠어요',
    ],
    answer:
      '했으면 좋겠어요|벌었으면 좋겠어요|좋았으면 좋겠어요|쉬웠으면 좋겠어요|되었으면 좋겠어요',
    answerTranslation: {
      ko: '세계 여행, 돈, 날씨, 시험, 미래 직업에 대한 바람을 말해.',
      uz: 'Sayohat, pul, ob-havo, imtihon va kelajak kasbi haqidagi istaklar.',
      en: 'The passage expresses wishes about travel, money, weather, an exam, and a future career.',
      ru: 'Выражаются пожелания о путешествии, деньгах, погоде, экзамене и будущей профессии.',
    },
    difficulty: 5,
    tags: ['연습1 종합', '교재80'],
    hint: {
      ko: '각 빈칸의 동사가 모두 달라. 같은 답을 두 번 쓰지 않아.',
      uz: 'Har bo‘shliqdagi fe’l boshqa.',
      en: 'Each blank uses a different verb.',
      ru: 'В каждом пропуске используется другой глагол.',
    },
    xpReward: 25,
    isActive: true,
  },

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 어떤 것이었으면 좋겠어요?
  // p.81 연습 2
  //
  // 보기는 교재 원문.
  // 1~4는 자유 응답 → 구체적 응답은 앱 예시.
  // ──────────────────────────────────────────────────────────

  s3u4_222_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '어떤 집에 살고 싶어요?',
      },
    ],
    options: [
      '바다가 가까운 집에 살았으면 좋겠어요.',
      '바다가 가까운 집을 먹었으면 좋겠어요.',
      '바다보다 집이 더 비싸요.',
      '집이 학생인 것 같아요.',
    ],
    answer: '바다가 가까운 집에 살았으면 좋겠어요.',
    acceptedAnswers: ['바다가 가까운 집에 살았으면 좋겠어요'],
    answerTranslation: {
      ko: '바다가 가까운 집에 살았으면 좋겠어요.',
      uz: 'Dengizga yaqin uyda yashasam edi.',
      en: 'I hope to live in a house near the sea.',
      ru: 'Хотелось бы жить в доме рядом с морем.',
    },
    difficulty: 3,
    tags: ['연습2 보기', '집', '바다', '교재81'],
    hint: {
      ko: '교재에 인쇄된 보기 대화야.',
      uz: 'Bu darslikdagi namuna dialog.',
      en: 'This is the printed textbook example.',
      ru: 'Это напечатанный пример из учебника.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_223_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '바다가 가까운 집에 살았으면 좋겠어요.',
    options: [
      '바다에서 가까운 집을 원해요.',
      '산에서만 살고 싶어요.',
      '지금 그 집에서 살고 있어요.',
      '바다가 싫어서 멀리 가고 싶어요.',
    ],
    answer: '바다에서 가까운 집을 원해요.',
    answerTranslation: {
      ko: '바다와 가까운 집에서 살고 싶다는 뜻이야.',
      uz: 'Dengizga yaqin uyda yashashni xohlaydi.',
      en: 'The speaker wants to live close to the sea.',
      ru: 'Говорящий хочет жить рядом с морем.',
    },
    difficulty: 3,
    tags: ['집', '가깝다', '듣기'],
    hint: {
      ko: '집의 위치에 대한 바람이야.',
      uz: 'Uy joylashuvi haqidagi istak.',
      en: 'It is a wish about the house’s location.',
      ru: 'Это пожелание о расположении дома.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_224_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '바다가 ___ 집에 살았으면 좋겠어요.',
    blankAnswers: ['가까운'],
    options: ['가까운', '가까는', '가까울', '가깝는', '가까워서'],
    answerTranslation: {
      ko: '바다가 가까운 집에 살았으면 좋겠어요.',
      uz: 'Dengizga yaqin uyda yashasam edi.',
      en: 'I hope to live in a house near the sea.',
      ru: 'Хотелось бы жить в доме рядом с морем.',
    },
    difficulty: 4,
    tags: ['가깝다', '집', '교재81'],
    hint: {
      ko: '가깝다 → 가까운 집.',
      uz: '가깝다 → 가까운 집.',
      en: '가깝다 becomes 가까운 before 집.',
      ru: '가깝다 → 가까운 перед 집.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_225_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '무슨 선물을 받고 싶어요?',
    options: ['새', '카메라를', '받았으면', '좋겠어요', '먹었으면', '날씨가'],
    answer: '새 카메라를 받았으면 좋겠어요',
    answerTranslation: {
      ko: '새 카메라를 받았으면 좋겠어요.',
      uz: 'Yangi kamera sovg‘a olsam edi.',
      en: 'I hope I receive a new camera.',
      ru: 'Хотелось бы получить новую камеру.',
    },
    difficulty: 4,
    tags: ['연습2-1', '선물', '앱 예시'],
    hint: {
      ko: '원본은 자유 응답이야. 여기서는 카메라를 받은 예시로 연습해.',
      uz: 'Asl topshiriq erkin. Bu yerda kamera misoli.',
      en: 'The source is open-ended; this app model uses a camera.',
      ru: 'Исходное задание открытое; здесь используется пример с камерой.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_226_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '새 카메라를 받았으면 좋겠어요.',
    answer: '새 카메라를 받았으면 좋겠어요.',
    acceptedAnswers: ['새 카메라를 받았으면 좋겠어요'],
    answerTranslation: {
      ko: '새 카메라를 받았으면 좋겠어요.',
      uz: 'Yangi kamera olsam edi.',
      en: 'I hope I get a new camera.',
      ru: 'Хотелось бы получить новую камеру.',
    },
    difficulty: 4,
    tags: ['선물', '받다', '말하기', '앱 예시'],
    hint: {
      ko: '받고 싶은 선물을 말하는 예시야.',
      uz: 'Olishni istagan sovg‘a haqida namuna.',
      en: 'This is a model response about a desired gift.',
      ru: 'Это пример ответа о желаемом подарке.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_227_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '재미있는 영화를 봤으면 좋겠어요.',
    options: [
      '재미있는 영화를 보고 싶어요.',
      '영화를 이미 여러 번 봤어요.',
      '재미있는 영화를 싫어해요.',
      '영화보다 책이 더 비싸요.',
    ],
    answer: '재미있는 영화를 보고 싶어요.',
    answerTranslation: {
      ko: '재미있는 영화를 보고 싶은 바람이야.',
      uz: 'Qiziqarli film ko‘rishni xohlaydi.',
      en: 'The speaker wants to watch an interesting movie.',
      ru: 'Говорящий хочет посмотреть интересный фильм.',
    },
    difficulty: 3,
    tags: ['연습2-2', '영화', '앱 예시'],
    hint: {
      ko: '원본 질문은 “어떤 영화를 보고 싶어요?”야.',
      uz: 'Asl savol “어떤 영화를 보고 싶어요?”.',
      en: 'The original question asks 어떤 영화를 보고 싶어요?',
      ru: 'Исходный вопрос: 어떤 영화를 보고 싶어요?',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_228_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['재미있는', '영화를', '봤으면', '좋겠어요', '보는', '학생이'],
    answer: '재미있는 영화를 봤으면 좋겠어요',
    answerTranslation: {
      ko: '재미있는 영화를 봤으면 좋겠어요.',
      uz: 'Qiziqarli film ko‘rsam edi.',
      en: 'I hope I can watch an interesting movie.',
      ru: 'Хотелось бы посмотреть интересный фильм.',
    },
    difficulty: 4,
    tags: ['영화', '보다', '앱 예시'],
    hint: {
      ko: '보고 싶은 영화의 종류도 같이 말해.',
      uz: 'Qanday film ekanini ham ayt.',
      en: 'Include what kind of movie you want.',
      ru: 'Укажите также, какой фильм хочется посмотреть.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_229_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '어떤 영화를 보고 싶어요?',
      },
    ],
    options: [
      '재미있는 영화를 봤으면 좋겠어요.',
      '영화가 유명한 가수가 되었으면 좋겠어요.',
      '시험이 쉬웠으면 좋겠어요.',
      '운동화가 편했으면 좋겠어요.',
    ],
    answer: '재미있는 영화를 봤으면 좋겠어요.',
    acceptedAnswers: ['재미있는 영화를 봤으면 좋겠어요'],
    answerTranslation: {
      ko: '재미있는 영화를 봤으면 좋겠어요.',
      uz: 'Qiziqarli film ko‘rsam edi.',
      en: 'I hope to watch an interesting movie.',
      ru: 'Хотелось бы посмотреть интересный фильм.',
    },
    difficulty: 3,
    tags: ['연습2-2', '대화', '앱 예시'],
    hint: {
      ko: '질문의 대상은 영화야.',
      uz: 'Savol film haqida.',
      en: 'The question is about a movie.',
      ru: 'Вопрос относится к фильму.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_230_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '사람들을 도와주는 일을 ___ 좋겠어요.',
    blankAnswers: ['했으면'],
    options: ['했으면', '하면', '하는', '할', '해서'],
    answerTranslation: {
      ko: '사람들을 도와주는 일을 했으면 좋겠어요.',
      uz: 'Odamlarga yordam beradigan ish qilsam edi.',
      en: 'I hope to have a job where I help people.',
      ru: 'Хотелось бы работать, помогая людям.',
    },
    difficulty: 4,
    tags: ['연습2-3', '일', '앱 예시'],
    hint: {
      ko: '원본 질문은 “어떤 일을 하고 싶어요?”야.',
      uz: 'Asl savol “어떤 일을 하고 싶어요?”.',
      en: 'The source asks 어떤 일을 하고 싶어요?',
      ru: 'Исходный вопрос: 어떤 일을 하고 싶어요?',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_231_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '사람들을 도와주는 일을 했으면 좋겠어요.',
    acceptedAnswers: ['사람들을 도와주는 일을 했으면 좋겠어요'],
    answerTranslation: {
      ko: '사람들을 도와주는 일을 했으면 좋겠어요.',
      uz: 'Odamlarga yordam beradigan ish qilsam edi.',
      en: 'I hope to do work that helps people.',
      ru: 'Хотелось бы заниматься работой, которая помогает людям.',
    },
    difficulty: 5,
    tags: ['일', '듣기', '앱 예시'],
    hint: {
      ko: '“도와주는 일을”까지 모두 들어.',
      uz: '“도와주는 일을” qismini ham tingla.',
      en: 'Listen for the whole phrase 도와주는 일을.',
      ru: 'Расслышьте всю фразу 도와주는 일을.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_232_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '누구를 만나고 싶어요?',
    options: [
      '좋아하는',
      '가수를',
      '만났으면',
      '좋겠어요',
      '1등을',
      '쉬웠으면',
    ],
    answer: '좋아하는 가수를 만났으면 좋겠어요',
    answerTranslation: {
      ko: '좋아하는 가수를 만났으면 좋겠어요.',
      uz: 'Sevimli qo‘shiqchim bilan uchrashsam edi.',
      en: 'I hope I can meet my favorite singer.',
      ru: 'Хотелось бы встретить любимого певца.',
    },
    difficulty: 4,
    tags: ['연습2-4', '만나다', '앱 예시'],
    hint: {
      ko: '원본은 만나고 싶은 사람을 자유롭게 답하는 활동이야.',
      uz: 'Asl topshiriqda uchrashmoqchi bo‘lgan odam erkin tanlanadi.',
      en: 'The source lets the learner freely choose someone to meet.',
      ru: 'В оригинале ученик сам выбирает человека, которого хочет встретить.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_233_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '좋아하는 가수를 만났으면 좋겠어요.',
    answer: '좋아하는 가수를 만났으면 좋겠어요.',
    acceptedAnswers: ['좋아하는 가수를 만났으면 좋겠어요'],
    answerTranslation: {
      ko: '좋아하는 가수를 만났으면 좋겠어요.',
      uz: 'Sevimli qo‘shiqchimni uchratsam edi.',
      en: 'I hope I can meet my favorite singer.',
      ru: 'Хотелось бы встретить любимого певца.',
    },
    difficulty: 4,
    tags: ['만나다', '가수', '말하기', '앱 예시'],
    hint: {
      ko: '만났으면 좋겠어요를 한 덩어리로 말해.',
      uz: '“만났으면 좋겠어요”ni birga ayt.',
      en: 'Say 만났으면 좋겠어요 smoothly as a chunk.',
      ru: 'Плавно произнесите 만났으면 좋겠어요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_234_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '어떤 집을 원합니까?',
      uz: 'Qanday uy xohlanmoqda?',
      en: 'What kind of house does the speaker want?',
      ru: 'Какой дом хочет говорящий?',
    },
    passage:
      '저는 바다를 좋아해요. 창문을 열면 바다가 보이고 걸어서 바닷가에 갈 수 있는 집에 살았으면 좋겠어요.',
    options: [
      '바다와 가까운 집',
      '학교와 먼 집',
      '아주 작은 방만 있는 집',
      '산 위에 있는 집',
    ],
    answer: '바다와 가까운 집',
    answerTranslation: {
      ko: '바다가 보이고 걸어서 갈 수 있으므로 바다와 가까운 집을 원해.',
      uz: 'Dengiz ko‘rinib, piyoda borish mumkin bo‘lgan yaqin uy.',
      en: 'The speaker wants a house close to the sea.',
      ru: 'Говорящий хочет дом рядом с морем.',
    },
    difficulty: 4,
    tags: ['집', '가깝다', '독해'],
    hint: {
      ko: '걸어서 바닷가에 갈 수 있다는 부분을 봐.',
      uz: 'Dengizga piyoda borish mumkinligiga qarang.',
      en: 'Notice that the beach is within walking distance.',
      ru: 'Обратите внимание, что до моря можно дойти пешком.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_235_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '생일에 새 카메라를 받았으면 좋겠어요.',
    options: [
      '생일 선물로 카메라를 받고 싶어요.',
      '생일에 카메라를 팔고 싶어요.',
      '카메라를 이미 잃어버렸어요.',
      '카메라보다 구두를 더 잘해요.',
    ],
    answer: '생일 선물로 카메라를 받고 싶어요.',
    answerTranslation: {
      ko: '생일에 카메라를 선물로 받고 싶은 바람이야.',
      uz: 'Tug‘ilgan kunda kamera sovg‘a olishni xohlaydi.',
      en: 'The speaker hopes to receive a camera as a birthday gift.',
      ru: 'Говорящий хочет получить камеру на день рождения.',
    },
    difficulty: 3,
    tags: ['선물', '카메라', '듣기'],
    hint: {
      ko: '받고 싶은 물건을 들어.',
      uz: 'Qaysi buyumni olishni xohlayotganini tingla.',
      en: 'Listen for the item the speaker wants to receive.',
      ru: 'Расслышьте, какой подарок хочет получить говорящий.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_236_translate_builder: {
    type: 'translate_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '바다가 가까운 집에 살았으면 좋겠어요',
      uz: 'Dengizga yaqin uyda yashasam edi',
      en: 'I hope to live in a house near the sea',
      ru: 'Хотелось бы жить в доме рядом с морем',
    },
    options: ['바다가', '가까운', '집에', '살았으면', '좋겠어요', '비싸요'],
    answer: '바다가 가까운 집에 살았으면 좋겠어요',
    answerTranslation: {
      ko: '바다가 가까운 집에 살았으면 좋겠어요.',
      uz: 'Dengizga yaqin uyda yashasam edi.',
      en: 'I hope to live in a house near the sea.',
      ru: 'Хотелось бы жить в доме рядом с морем.',
    },
    difficulty: 5,
    tags: ['연습2 보기', '번역', '교재81'],
    hint: {
      ko: '집의 특징 → 집에 → 살았으면 좋겠어요 순서야.',
      uz: 'Uy xususiyati → 집에 → 살았으면 좋겠어요.',
      en: 'House description → 집에 → 살았으면 좋겠어요.',
      ru: 'Описание дома → 집에 → 살았으면 좋겠어요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_237_dialog_order: {
    type: 'dialog_order',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialogOrder,
    dialogLines: [
      {
        speaker: 'npc',
        text: '어떤 집에 살고 싶어요?',
      },
      {
        speaker: 'user',
        text: '바다가 가까운 집에 살았으면 좋겠어요.',
      },
      {
        speaker: 'npc',
        text: '왜 그런 집이 좋아요?',
      },
      {
        speaker: 'user',
        text: '바다를 자주 보고 싶어요.',
      },
    ],
    answer: 'all_correct',
    answerTranslation: {
      ko: '원하는 집을 말한 뒤 그 이유를 설명하는 대화야.',
      uz: 'Istalgan uy aytilib, keyin sababi tushuntiriladi.',
      en: 'The speaker states the desired house and then explains why.',
      ru: 'Сначала описывают желаемый дом, затем объясняют причину.',
    },
    difficulty: 5,
    tags: ['집', '바람', '대화 순서'],
    hint: {
      ko: '질문 → 바람 → 이유 질문 → 이유 순서야.',
      uz: 'Savol → istak → sabab savoli → sabab.',
      en: 'Question → wish → why → reason.',
      ru: 'Вопрос → желание → вопрос о причине → причина.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_238_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.cloze,
    passage:
      '원하는 것을 말해 봐요. 바다가 가까운 집에 ___. 새 카메라를 ___. 재미있는 영화를 ___. 사람들을 도와주는 일을 ___. 좋아하는 가수를 ___.',
    options: [
      '살았으면 좋겠어요',
      '받았으면 좋겠어요',
      '봤으면 좋겠어요',
      '했으면 좋겠어요',
      '만났으면 좋겠어요',
    ],
    answer:
      '살았으면 좋겠어요|받았으면 좋겠어요|봤으면 좋겠어요|했으면 좋겠어요|만났으면 좋겠어요',
    answerTranslation: {
      ko: '집, 선물, 영화, 일, 사람에 대한 바람을 각각 말해.',
      uz: 'Uy, sovg‘a, film, ish va odam haqidagi istaklar.',
      en: 'The passage expresses wishes about a house, gift, movie, job, and person.',
      ru: 'Выражаются желания о доме, подарке, фильме, работе и человеке.',
    },
    difficulty: 5,
    tags: ['연습2 종합', '교재81'],
    hint: {
      ko: '다섯 빈칸의 동사는 모두 달라.',
      uz: 'Besh bo‘shliqdagi fe’llar har xil.',
      en: 'All five blanks use different verbs.',
      ru: 'Во всех пяти пропусках разные глаголы.',
    },
    xpReward: 25,
    isActive: true,
  },

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 상황에 맞게 바람을 말해요
  // p.80~81 표현 재사용
  // ──────────────────────────────────────────────────────────

  s3u4_239_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '상황에 가장 알맞은 바람을 고르세요.',
      uz: 'Vaziyatga eng mos istakni tanlang.',
      en: 'Choose the wish that best matches the situation.',
      ru: 'Выберите пожелание, лучше всего подходящее ситуации.',
    },
    passage: '내일 중요한 시험이 있어요. 선생님이 시험이 어렵다고 했어요.',
    options: [
      '시험이 쉬웠으면 좋겠어요.',
      '돈을 많이 벌었으면 좋겠어요.',
      '바다가 가까웠으면 좋겠어요.',
      '유명한 가수가 되었으면 좋겠어요.',
    ],
    answer: '시험이 쉬웠으면 좋겠어요.',
    answerTranslation: {
      ko: '어려울 것 같은 시험을 앞두고 쉬웠으면 좋겠다고 바랄 수 있어.',
      uz: 'Qiyin imtihon oldidan oson bo‘lishini xohlash tabiiy.',
      en: 'Before a difficult exam, it is natural to hope it will be easy.',
      ru: 'Перед трудным экзаменом естественно надеяться, что он будет лёгким.',
    },
    difficulty: 3,
    tags: ['시험', '상황', '독해'],
    hint: {
      ko: '시험과 직접 관계있는 바람을 찾아.',
      uz: 'Imtihonga to‘g‘ridan-to‘g‘ri bog‘liq istakni top.',
      en: 'Choose the wish directly related to the exam.',
      ru: 'Выберите желание, напрямую связанное с экзаменом.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_240_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '내일 야외에서 공연이 있어요. 비가 안 왔으면 좋겠어요.',
    options: [
      '내일 비가 오지 않기를 바라요.',
      '내일 비가 많이 오기를 바라요.',
      '공연을 취소하고 싶어요.',
      '이미 공연을 봤어요.',
    ],
    answer: '내일 비가 오지 않기를 바라요.',
    answerTranslation: {
      ko: '야외 공연 때문에 비가 오지 않았으면 좋겠다고 바라.',
      uz: 'Ochiq havodagi tadbir uchun yomg‘ir yog‘masligini xohlaydi.',
      en: 'The speaker hopes it does not rain because of the outdoor performance.',
      ru: 'Говорящий надеется, что из-за выступления на улице дождя не будет.',
    },
    difficulty: 4,
    tags: ['날씨', '부정', '듣기', '확장'],
    hint: {
      ko: '“안 왔으면”을 들어.',
      uz: '“안 왔으면”ni tingla.',
      en: 'Listen for 안 왔으면.',
      ru: 'Расслышьте 안 왔으면.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_241_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '내일 야외에서 축구를 해요. 비가 ___ 좋겠어요.',
    blankAnswers: ['안 왔으면'],
    options: ['안 왔으면', '안 오는', '오면', '왔는데', '올'],
    answerTranslation: {
      ko: '비가 안 왔으면 좋겠어요.',
      uz: 'Yomg‘ir yog‘masa edi.',
      en: 'I hope it does not rain.',
      ru: 'Надеюсь, дождя не будет.',
    },
    difficulty: 4,
    tags: ['부정 바람', '날씨', '확장'],
    hint: {
      ko: '원하지 않는 상황에는 안 + 동사를 넣을 수도 있어.',
      uz: 'Keraksiz holat uchun 안 + fe’l ishlatish mumkin.',
      en: 'A negative wish can use 안 + verb.',
      ru: 'Отрицательное пожелание можно выразить через 안 + глагол.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_242_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '요즘 한국어 공부 어때요?',
    options: ['한국말을', '더', '잘했으면', '좋겠어요', '배가', '비싸요'],
    answer: '한국말을 더 잘했으면 좋겠어요',
    answerTranslation: {
      ko: '한국말을 더 잘했으면 좋겠어요.',
      uz: 'Koreys tilini yanada yaxshi bilsam edi.',
      en: 'I wish I were better at Korean.',
      ru: 'Хотелось бы ещё лучше владеть корейским.',
    },
    difficulty: 4,
    tags: ['한국말', '응답'],
    hint: {
      ko: '한국어 능력에 대한 바람을 말해.',
      uz: 'Koreys tili qobiliyati haqida istak ayt.',
      en: 'Express a wish about Korean ability.',
      ru: 'Выразите желание, связанное с владением корейским.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_243_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '내일 날씨가 좋았으면 좋겠어요.',
    answer: '내일 날씨가 좋았으면 좋겠어요.',
    acceptedAnswers: ['내일 날씨가 좋았으면 좋겠어요'],
    answerTranslation: {
      ko: '내일 날씨가 좋았으면 좋겠어요.',
      uz: 'Ertaga havo yaxshi bo‘lsa edi.',
      en: 'I hope the weather is nice tomorrow.',
      ru: 'Надеюсь, завтра будет хорошая погода.',
    },
    difficulty: 4,
    tags: ['날씨', '말하기'],
    hint: {
      ko: '내일이라는 미래 상황에 대한 바람이야.',
      uz: 'Ertangi holat haqidagi istak.',
      en: 'It is a wish about tomorrow.',
      ru: 'Это пожелание о завтрашнем дне.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_244_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '민수 씨가 바라는 것은 무엇입니까?',
      uz: 'Minsu nimani xohlaydi?',
      en: 'What does Minsu hope for?',
      ru: 'Чего хочет Минсу?',
    },
    passage:
      '민수 씨는 노래하는 것을 아주 좋아합니다. 매일 노래를 연습합니다. 나중에 유명한 가수가 되었으면 좋겠다고 합니다.',
    options: [
      '유명한 가수가 되는 것',
      '세계 여행을 그만두는 것',
      '시험이 어려워지는 것',
      '운동화를 사는 것',
    ],
    answer: '유명한 가수가 되는 것',
    answerTranslation: {
      ko: '민수 씨는 유명한 가수가 되기를 바라.',
      uz: 'Minsu mashhur qo‘shiqchi bo‘lishni xohlaydi.',
      en: 'Minsu hopes to become a famous singer.',
      ru: 'Минсу хочет стать известным певцом.',
    },
    difficulty: 3,
    tags: ['가수', '독해'],
    hint: {
      ko: '마지막 문장을 봐.',
      uz: 'Oxirgi gapga qarang.',
      en: 'Check the final sentence.',
      ru: 'Посмотрите на последнее предложение.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_245_listen_fill: {
    type: 'listen_fill',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenFill,
    sentenceTemplate: '저는 나중에 유명한 ___가 되었으면 ___.',
    blankAnswers: ['가수', '좋겠어요'],
    answerTranslation: {
      ko: '저는 나중에 유명한 가수가 되었으면 좋겠어요.',
      uz: 'Kelajakda mashhur qo‘shiqchi bo‘lsam edi.',
      en: 'I hope to become a famous singer someday.',
      ru: 'Хотелось бы когда-нибудь стать известным певцом.',
    },
    difficulty: 5,
    tags: ['가수', '듣기'],
    hint: {
      ko: '직업 이름과 바람 표현의 마지막 부분을 들어.',
      uz: 'Kasb nomi va istak ifodasining oxirini tingla.',
      en: 'Listen for the occupation and the end of the wish expression.',
      ru: 'Расслышьте профессию и конец выражения желания.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_246_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '이번 대회 목표가 뭐예요?',
      },
    ],
    options: [
      '1등을 했으면 좋겠어요.',
      '1등보다 수영을 더 편해요.',
      '1등이 학생인 것 같아요.',
      '1등을 먹었으면 좋겠어요.',
    ],
    answer: '1등을 했으면 좋겠어요.',
    acceptedAnswers: ['1등을 했으면 좋겠어요'],
    answerTranslation: {
      ko: '1등을 했으면 좋겠어요.',
      uz: 'Birinchi o‘rin olsam edi.',
      en: 'I hope to come in first.',
      ru: 'Надеюсь занять первое место.',
    },
    difficulty: 3,
    tags: ['1등', '목표', '대화'],
    hint: {
      ko: '대회의 원하는 결과를 말해.',
      uz: 'Musobaqadagi kerakli natijani ayt.',
      en: 'State the desired competition result.',
      ru: 'Назовите желаемый результат соревнования.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_247_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['새로운', '회사에서', '일했으면', '좋겠어요', '학생인', '더'],
    answer: '새로운 회사에서 일했으면 좋겠어요',
    answerTranslation: {
      ko: '새로운 회사에서 일했으면 좋겠어요.',
      uz: 'Yangi kompaniyada ishlasam edi.',
      en: 'I hope to work at a new company.',
      ru: 'Хотелось бы работать в новой компании.',
    },
    difficulty: 4,
    tags: ['일', '확장', '어순'],
    hint: {
      ko: '원하는 일이나 직장에 대해서도 같은 표현을 쓸 수 있어.',
      uz: 'Istalgan ish yoki ish joyiga ham shu ifoda ishlatiladi.',
      en: 'The same expression can describe a desired job or workplace.',
      ru: 'Та же конструкция подходит для желаемой работы.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_248_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '우리 집이 학교에서 좀 더 가까웠으면 좋겠어요.',
    options: [
      '학교와 집의 거리가 더 가까워지기를 바라요.',
      '학교가 없어졌으면 좋겠어요.',
      '집보다 학교가 더 비싸요.',
      '학교에 가지 않으려고 해요.',
    ],
    answer: '학교와 집의 거리가 더 가까워지기를 바라요.',
    answerTranslation: {
      ko: '집이 학교와 더 가까웠으면 좋겠다는 바람이야.',
      uz: 'Uy maktabga yaqinroq bo‘lishini xohlaydi.',
      en: 'The speaker wishes home were closer to school.',
      ru: 'Говорящий хотел бы жить ближе к школе.',
    },
    difficulty: 4,
    tags: ['가깝다', '듣기', '확장'],
    hint: {
      ko: '거리와 관련된 바람이야.',
      uz: 'Bu masofa haqidagi istak.',
      en: 'It is a wish about distance.',
      ru: 'Это пожелание о расстоянии.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_249_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '우리 집이 학교에서 더 ___ 좋겠어요.',
    blankAnswers: ['가까웠으면'],
    options: ['가까웠으면', '가까우면', '가까운', '가깝는', '가까워서'],
    answerTranslation: {
      ko: '우리 집이 학교에서 더 가까웠으면 좋겠어요.',
      uz: 'Uyimiz maktabga yaqinroq bo‘lsa edi.',
      en: 'I wish our house were closer to school.',
      ru: 'Хотелось бы, чтобы наш дом был ближе к школе.',
    },
    difficulty: 5,
    tags: ['가깝다', '바람', '확장'],
    hint: {
      ko: '가깝다의 형태 변화를 잘 봐.',
      uz: '가깝다 shakli o‘zgarishiga e’tibor ber.',
      en: 'Watch the conjugation of 가깝다.',
      ru: 'Обратите внимание на изменение 가깝다.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_250_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '새로운 친구를 많이 만났으면 좋겠어요.',
    answer: '새로운 친구를 많이 만났으면 좋겠어요.',
    acceptedAnswers: ['새로운 친구를 많이 만났으면 좋겠어요'],
    answerTranslation: {
      ko: '새로운 친구를 많이 만났으면 좋겠어요.',
      uz: 'Ko‘p yangi do‘stlar bilan tanishsam edi.',
      en: 'I hope to meet lots of new friends.',
      ru: 'Хотелось бы встретить много новых друзей.',
    },
    difficulty: 4,
    tags: ['만나다', '바람', '말하기'],
    hint: {
      ko: '만나다 → 만났으면 좋겠어요.',
      uz: '만나다 → 만났으면 좋겠어요.',
      en: '만나다 becomes 만났으면 좋겠어요.',
      ru: '만나다 → 만났으면 좋겠어요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_251_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '바람과 상황이 자연스럽게 연결된 것을 고르세요.',
      uz: 'Istak va vaziyat tabiiy bog‘langan variantni tanlang.',
      en: 'Choose the natural situation-and-wish pair.',
      ru: 'Выберите естественную пару «ситуация — пожелание».',
    },
    passage: '각 상황에서 사람이 무엇을 바랄지 생각해 봐.',
    options: [
      '내일 시험이 있어요 → 시험이 쉬웠으면 좋겠어요.',
      '비가 많이 와요 → 유명한 가수가 되었으면 좋겠어요.',
      '새 신발을 샀어요 → 한국말을 잘했으면 좋겠어요.',
      '배가 고파요 → 한라산이 높았으면 좋겠어요.',
    ],
    answer: '내일 시험이 있어요 → 시험이 쉬웠으면 좋겠어요.',
    answerTranslation: {
      ko: '시험을 앞둔 상황과 시험이 쉬웠으면 하는 바람이 자연스럽게 연결돼.',
      uz: 'Imtihon oldidan uning oson bo‘lishini xohlash tabiiy.',
      en: 'An upcoming exam naturally connects with hoping the exam will be easy.',
      ru: 'Предстоящий экзамен естественно связан с пожеланием, чтобы он был лёгким.',
    },
    difficulty: 4,
    tags: ['상황', '바람', '독해'],
    hint: {
      ko: '상황과 바람 사이에 직접적인 관계가 있어야 해.',
      uz: 'Vaziyat va istak to‘g‘ridan-to‘g‘ri bog‘liq bo‘lishi kerak.',
      en: 'The wish should directly relate to the situation.',
      ru: 'Желание должно напрямую относиться к ситуации.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_252_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '이번 생일에 바라는 게 있어요?',
    options: ['새', '노트북을', '받았으면', '좋겠어요', '높아요', '학생인'],
    answer: '새 노트북을 받았으면 좋겠어요',
    answerTranslation: {
      ko: '새 노트북을 받았으면 좋겠어요.',
      uz: 'Yangi noutbuk olsam edi.',
      en: 'I hope I get a new laptop.',
      ru: 'Хотелось бы получить новый ноутбук.',
    },
    difficulty: 4,
    tags: ['선물', '바람', '앱 예시'],
    hint: {
      ko: '받고 싶은 물건을 넣어 바람을 말해.',
      uz: 'Olishni istagan buyumni qo‘yib gap tuz.',
      en: 'Use the item you want to receive in the wish.',
      ru: 'Назовите предмет, который хотите получить.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_253_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '내일 날씨가 좋았으면 좋겠어요.',
    acceptedAnswers: ['내일 날씨가 좋았으면 좋겠어요'],
    answerTranslation: {
      ko: '내일 날씨가 좋았으면 좋겠어요.',
      uz: 'Ertaga havo yaxshi bo‘lsa edi.',
      en: 'I hope the weather is nice tomorrow.',
      ru: 'Надеюсь, завтра будет хорошая погода.',
    },
    difficulty: 4,
    tags: ['날씨', '듣기'],
    hint: {
      ko: '교재 연습 1의 날씨 항목이야.',
      uz: 'Bu 1-mashqdagi ob-havo bandi.',
      en: 'This is the weather item from Exercise 1.',
      ru: 'Это пункт о погоде из упражнения 1.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_254_dialog_order: {
    type: 'dialog_order',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialogOrder,
    dialogLines: [
      {
        speaker: 'npc',
        text: '내일 시험이죠?',
      },
      {
        speaker: 'user',
        text: '네. 공부를 많이 했어요.',
      },
      {
        speaker: 'npc',
        text: '시험이 어땠으면 좋겠어요?',
      },
      {
        speaker: 'user',
        text: '좀 쉬웠으면 좋겠어요.',
      },
    ],
    answer: 'all_correct',
    answerTranslation: {
      ko: '시험 상황을 확인하고 시험이 쉬웠으면 좋겠다는 바람을 말하는 대화야.',
      uz: 'Imtihon haqida gaplashib, oson bo‘lishi istaladi.',
      en: 'The dialogue confirms the exam and expresses a wish that it be easy.',
      ru: 'В диалоге говорят об экзамене и желают, чтобы он был лёгким.',
    },
    difficulty: 5,
    tags: ['시험', '대화 순서'],
    hint: {
      ko: '시험 확인 → 준비 → 바람 질문 → 바람 순서야.',
      uz: 'Imtihon → tayyorgarlik → istak savoli → istak.',
      en: 'Exam → preparation → wish question → wish.',
      ru: 'Экзамен → подготовка → вопрос о желании → желание.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_255_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.cloze,
    passage:
      '상황에 맞게 바람을 말해요. 시험은 ___. 날씨는 ___. 한국말은 ___. 친구는 많이 ___. 새 선물도 ___.',
    options: [
      '쉬웠으면 좋겠어요',
      '좋았으면 좋겠어요',
      '잘했으면 좋겠어요',
      '만났으면 좋겠어요',
      '받았으면 좋겠어요',
    ],
    answer:
      '쉬웠으면 좋겠어요|좋았으면 좋겠어요|잘했으면 좋겠어요|만났으면 좋겠어요|받았으면 좋겠어요',
    answerTranslation: {
      ko: '시험, 날씨, 한국어 능력, 친구, 선물에 대한 서로 다른 바람이야.',
      uz: 'Imtihon, ob-havo, koreys tili, do‘stlar va sovg‘a haqidagi istaklar.',
      en: 'These are different wishes about an exam, weather, Korean ability, friends, and a gift.',
      ru: 'Это разные пожелания об экзамене, погоде, корейском, друзьях и подарке.',
    },
    difficulty: 5,
    tags: ['상황 종합', '바람'],
    hint: {
      ko: '각 명사와 자연스럽게 연결되는 표현을 골라.',
      uz: 'Har otga mos ifodani tanla.',
      en: 'Match each noun with the natural wish.',
      ru: 'Подберите естественное пожелание к каждому существительному.',
    },
    xpReward: 25,
    isActive: true,
  },

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 친구에게 바라는 것을 말해요
  // p.81 연습 3 + Node 4 종합
  //
  // 원본:
  // "우리 반 친구에게 바라는 것이 있어요?
  //  [보기]와 같이 친구에게 써 보세요."
  //
  // 자유쓰기이므로 아래 구체적 내용은 앱용 예시.
  // ──────────────────────────────────────────────────────────

  s3u4_256_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '교재 연습 3에서 해야 하는 활동은 무엇입니까?',
      uz: '3-mashqda nima qilish kerak?',
      en: 'What does Exercise 3 ask you to do?',
      ru: 'Что требуется в упражнении 3?',
    },
    passage:
      '우리 반 친구에게 바라는 것이 있어요? [보기]와 같이 친구에게 써 보세요.',
    options: [
      '친구에게 바라는 것을 써요.',
      '친구의 옷 가격을 비교해요.',
      '친구가 간 여행지를 맞혀요.',
      '친구의 직업을 소개해요.',
    ],
    answer: '친구에게 바라는 것을 써요.',
    answerTranslation: {
      ko: '친구에게 바라는 내용을 써 보는 활동이야.',
      uz: 'Do‘stga bo‘lgan istakni yozish topshirig‘i.',
      en: 'The task is to write something you hope your classmate will do.',
      ru: 'Нужно написать пожелание однокласснику.',
    },
    difficulty: 2,
    tags: ['연습3', '교재81', '자유쓰기'],
    hint: {
      ko: '원본 지시문에 “바라는 것”과 “써 보세요”가 있어.',
      uz: 'Asl ko‘rsatmada “바라는 것” va “써 보세요” bor.',
      en: 'The original prompt contains 바라는 것 and 써 보세요.',
      ru: 'В исходной инструкции есть 바라는 것 и 써 보세요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_257_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '수업에 조금 더 일찍 ___ 좋겠어요.',
    blankAnswers: ['왔으면'],
    options: ['왔으면', '오는', '오면', '올', '오려고'],
    answerTranslation: {
      ko: '수업에 조금 더 일찍 왔으면 좋겠어요.',
      uz: 'Darsga biroz ertaroq kelsang yaxshi bo‘lardi.',
      en: 'I hope you come to class a little earlier.',
      ru: 'Хотелось бы, чтобы ты приходил на занятия немного раньше.',
    },
    difficulty: 4,
    tags: ['연습3', '친구에게 바람', '앱 예시'],
    hint: {
      ko: '친구의 행동에 대한 바람을 말하는 앱 예시야.',
      uz: 'Do‘st harakati haqidagi ilova namunasi.',
      en: 'This is an app model for a wish about a friend’s behavior.',
      ru: 'Это пример приложения с пожеланием о поведении друга.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_258_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '수업에 조금 더 일찍 왔으면 좋겠어요.',
    options: [
      '친구가 수업에 더 일찍 오기를 바라요.',
      '친구가 수업에 늦기를 바라요.',
      '수업이 없어졌으면 좋겠어요.',
      '친구와 여행하고 싶어요.',
    ],
    answer: '친구가 수업에 더 일찍 오기를 바라요.',
    answerTranslation: {
      ko: '친구가 조금 더 일찍 오기를 바라는 말이야.',
      uz: 'Do‘stning darsga ertaroq kelishini xohlaydi.',
      en: 'The speaker wants the friend to arrive earlier.',
      ru: 'Говорящий хочет, чтобы друг приходил раньше.',
    },
    difficulty: 3,
    tags: ['연습3', '친구', '듣기', '앱 예시'],
    hint: {
      ko: '바라는 행동은 “일찍 오다”야.',
      uz: 'Istalgan harakat — “일찍 오다”.',
      en: 'The desired behavior is 일찍 오다.',
      ru: 'Желаемое действие — 일찍 오다.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_259_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '친구에게 바라는 게 있어요?',
    options: ['약속', '시간을', '잘', '지켰으면', '좋겠어요', '높아요'],
    answer: '약속 시간을 잘 지켰으면 좋겠어요',
    answerTranslation: {
      ko: '약속 시간을 잘 지켰으면 좋겠어요.',
      uz: 'Uchrashuv vaqtiga yaxshi rioya qilsa edi.',
      en: 'I hope my friend keeps appointment times.',
      ru: 'Хотелось бы, чтобы друг соблюдал время встреч.',
    },
    difficulty: 4,
    tags: ['친구에게 바람', '약속', '앱 예시'],
    hint: {
      ko: '원본의 자유쓰기 목표에 맞춘 예시야.',
      uz: 'Bu erkin yozuv maqsadiga mos namuna.',
      en: 'This is a model consistent with the source free-writing task.',
      ru: 'Это пример, соответствующий цели свободного письма.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_260_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '약속 시간을 잘 지켰으면 좋겠어요.',
    answer: '약속 시간을 잘 지켰으면 좋겠어요.',
    acceptedAnswers: ['약속 시간을 잘 지켰으면 좋겠어요'],
    answerTranslation: {
      ko: '약속 시간을 잘 지켰으면 좋겠어요.',
      uz: 'Uchrashuv vaqtiga rioya qilsa edi.',
      en: 'I hope you keep appointment times.',
      ru: 'Хотелось бы, чтобы ты соблюдал время встреч.',
    },
    difficulty: 4,
    tags: ['친구', '말하기', '앱 예시'],
    hint: {
      ko: '지키다 → 지켰으면 좋겠어요.',
      uz: '지키다 → 지켰으면 좋겠어요.',
      en: '지키다 becomes 지켰으면 좋겠어요.',
      ru: '지키다 → 지켰으면 좋겠어요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_261_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '친구에게 바라는 내용으로 가장 자연스러운 것은 무엇입니까?',
      uz: 'Do‘stga aytiladigan eng tabiiy istak qaysi?',
      en: 'Which is the most natural wish directed at a friend?',
      ru: 'Какое пожелание другу звучит наиболее естественно?',
    },
    passage: '친구가 매일 약속 시간보다 20분씩 늦게 옵니다.',
    options: [
      '약속 시간을 잘 지켰으면 좋겠어요.',
      '한라산이 더 높았으면 좋겠어요.',
      '시험이 가수가 되었으면 좋겠어요.',
      '운동화를 잘했으면 좋겠어요.',
    ],
    answer: '약속 시간을 잘 지켰으면 좋겠어요.',
    answerTranslation: {
      ko: '항상 늦는 친구에게 시간을 잘 지켜 달라는 바람이 자연스러워.',
      uz: 'Doim kechikadigan do‘stga vaqtga rioya qilish istagi mos.',
      en: 'For a friend who is always late, hoping they keep appointments is natural.',
      ru: 'Если друг постоянно опаздывает, естественно пожелать ему соблюдать время.',
    },
    difficulty: 3,
    tags: ['친구', '바람', '독해'],
    hint: {
      ko: '문제 상황은 지각이야.',
      uz: 'Muammo — kechikish.',
      en: 'The problem is lateness.',
      ru: 'Проблема — опоздания.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_262_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '수업 시간에는 휴대전화를 자주 ___ 좋겠어요.',
    blankAnswers: ['보지 않았으면'],
    options: ['보지 않았으면', '보는', '봤는데', '보려고', '볼'],
    answerTranslation: {
      ko: '수업 시간에는 휴대전화를 자주 보지 않았으면 좋겠어요.',
      uz: 'Darsda telefonni tez-tez ko‘rmasang yaxshi bo‘lardi.',
      en: 'I hope you do not look at your phone often during class.',
      ru: 'Хотелось бы, чтобы ты не смотрел часто в телефон на занятии.',
    },
    difficulty: 5,
    tags: ['친구에게 바람', '부정', '앱 예시'],
    hint: {
      ko: '하지 않았으면 하는 행동도 말할 수 있어.',
      uz: 'Qilmasligini xohlagan harakat ham aytiladi.',
      en: 'You can also express a wish for someone not to do something.',
      ru: 'Можно выразить пожелание, чтобы человек чего-то не делал.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_263_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '수업 시간에는 휴대전화를 자주 보지 않았으면 좋겠어요.',
    acceptedAnswers: ['수업 시간에는 휴대전화를 자주 보지 않았으면 좋겠어요'],
    answerTranslation: {
      ko: '수업 시간에는 휴대전화를 자주 보지 않았으면 좋겠어요.',
      uz: 'Dars paytida telefonni ko‘p ko‘rmasang yaxshi bo‘lardi.',
      en: 'I hope you do not check your phone often during class.',
      ru: 'Хотелось бы, чтобы ты не проверял телефон часто во время урока.',
    },
    difficulty: 5,
    tags: ['친구', '부정 바람', '듣기'],
    hint: {
      ko: '“보지 않았으면”을 정확히 들어.',
      uz: '“보지 않았으면”ni aniq tingla.',
      en: 'Listen carefully for 보지 않았으면.',
      ru: 'Расслышьте 보지 않았으면.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_264_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '룸메이트에게 바라는 게 있어요?',
      },
    ],
    options: [
      '방을 조금 더 자주 청소했으면 좋겠어요.',
      '방보다 한라산이 더 높아요.',
      '룸메이트가 시험을 신었으면 좋겠어요.',
      '방이 유명한 가수가 되었으면 좋겠어요.',
    ],
    answer: '방을 조금 더 자주 청소했으면 좋겠어요.',
    acceptedAnswers: ['방을 조금 더 자주 청소했으면 좋겠어요'],
    answerTranslation: {
      ko: '방을 조금 더 자주 청소했으면 좋겠어요.',
      uz: 'Xonani biroz tez-tez tozalasa edi.',
      en: 'I hope my roommate cleans the room a little more often.',
      ru: 'Хотелось бы, чтобы сосед чаще убирал комнату.',
    },
    difficulty: 4,
    tags: ['친구에게 바람', '청소', '앱 예시'],
    hint: {
      ko: '사람의 행동이 바뀌기를 바라는 문장을 찾아.',
      uz: 'Odam xatti-harakati o‘zgarishini istagan gapni top.',
      en: 'Choose the wish about changing someone’s behavior.',
      ru: 'Выберите пожелание об изменении поведения человека.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_265_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '방을 조금 더 자주 청소했으면 좋겠어요.',
    answer: '방을 조금 더 자주 청소했으면 좋겠어요.',
    acceptedAnswers: ['방을 조금 더 자주 청소했으면 좋겠어요'],
    answerTranslation: {
      ko: '방을 조금 더 자주 청소했으면 좋겠어요.',
      uz: 'Xonani biroz tez-tez tozalasa edi.',
      en: 'I hope the room gets cleaned a little more often.',
      ru: 'Хотелось бы, чтобы комнату убирали немного чаще.',
    },
    difficulty: 4,
    tags: ['청소', '말하기', '앱 예시'],
    hint: {
      ko: '친구에게 너무 강하게 명령하지 않고 바람으로 말해.',
      uz: 'Buyruq emas, yumshoq istak sifatida ayt.',
      en: 'Express it as a wish rather than a strong command.',
      ru: 'Скажите это как пожелание, а не приказ.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_266_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '글쓴이가 친구에게 바라는 것은 무엇입니까?',
      uz: 'Muallif do‘stidan nimani xohlaydi?',
      en: 'What does the writer wish the friend would do?',
      ru: 'Чего автор хочет от друга?',
    },
    passage:
      '민수야, 우리 같이 공부할 때 네가 휴대전화를 많이 봐서 이야기가 자주 끊겨. 공부할 때는 휴대전화를 조금 덜 봤으면 좋겠어.',
    options: [
      '공부할 때 휴대전화를 덜 보는 것',
      '공부할 때 더 늦게 오는 것',
      '휴대전화를 새로 사는 것',
      '공부를 하지 않는 것',
    ],
    answer: '공부할 때 휴대전화를 덜 보는 것',
    answerTranslation: {
      ko: '같이 공부할 때 휴대전화를 덜 봤으면 한다는 내용이야.',
      uz: 'Birga o‘qiganda telefonni kamroq ko‘rishini xohlaydi.',
      en: 'The writer wants the friend to use the phone less while studying together.',
      ru: 'Автор хочет, чтобы друг меньше смотрел в телефон во время совместной учёбы.',
    },
    difficulty: 4,
    tags: ['연습3 적응', '읽기'],
    hint: {
      ko: '마지막 문장이 바라는 내용이야.',
      uz: 'Oxirgi gap istakni bildiradi.',
      en: 'The final sentence states the wish.',
      ru: 'Последнее предложение выражает пожелание.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_267_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '같이 사는 친구에게 어떤 바람이 있어요?',
    options: ['밤에는', '조금', '조용히', '했으면', '좋겠어요', '한라산이'],
    answer: '밤에는 조금 조용히 했으면 좋겠어요',
    answerTranslation: {
      ko: '밤에는 조금 조용히 했으면 좋겠어요.',
      uz: 'Kechasi biroz tinchroq bo‘lsa edi.',
      en: 'I hope it is a little quieter at night.',
      ru: 'Хотелось бы, чтобы ночью было немного тише.',
    },
    difficulty: 4,
    tags: ['룸메이트', '친구', '앱 예시'],
    hint: {
      ko: '같이 사는 사람에게 할 수 있는 자연스러운 바람이야.',
      uz: 'Birga yashaydigan odamga tabiiy istak.',
      en: 'This is a natural wish directed at someone you live with.',
      ru: 'Это естественное пожелание человеку, с которым живёшь.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_268_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '밤에는 조금 조용히 했으면 좋겠어요.',
    options: [
      '밤에 소음을 줄이기를 바라요.',
      '밤에 더 크게 이야기하기를 바라요.',
      '밤마다 여행하고 싶어요.',
      '친구가 가수가 되기를 바라요.',
    ],
    answer: '밤에 소음을 줄이기를 바라요.',
    answerTranslation: {
      ko: '밤에는 조금 더 조용하기를 바라는 말이야.',
      uz: 'Kechasi shovqin kamroq bo‘lishini xohlaydi.',
      en: 'The speaker wishes for less noise at night.',
      ru: 'Говорящий хочет, чтобы ночью было тише.',
    },
    difficulty: 3,
    tags: ['친구에게 바람', '듣기'],
    hint: {
      ko: '핵심 단어는 “조용히”야.',
      uz: 'Asosiy so‘z — “조용히”.',
      en: 'The key word is 조용히.',
      ru: 'Ключевое слово — 조용히.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_269_translate_builder: {
    type: 'translate_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '약속 시간을 잘 지켰으면 좋겠어요',
      uz: 'Uchrashuv vaqtiga yaxshi rioya qilsa edi',
      en: 'I hope you keep appointment times',
      ru: 'Хотелось бы, чтобы ты соблюдал время встреч',
    },
    options: ['약속', '시간을', '잘', '지켰으면', '좋겠어요', '높아요'],
    answer: '약속 시간을 잘 지켰으면 좋겠어요',
    answerTranslation: {
      ko: '약속 시간을 잘 지켰으면 좋겠어요.',
      uz: 'Uchrashuv vaqtiga rioya qilsa edi.',
      en: 'I hope you keep appointment times.',
      ru: 'Хотелось бы, чтобы ты соблюдал время встреч.',
    },
    difficulty: 5,
    tags: ['연습3 적응', '번역'],
    hint: {
      ko: '바라는 행동은 “약속 시간을 잘 지키다”야.',
      uz: 'Istalgan harakat — “약속 시간을 잘 지키다”.',
      en: 'The desired behavior is 약속 시간을 잘 지키다.',
      ru: 'Желаемое действие — 약속 시간을 잘 지키다.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_270_dialog_order: {
    type: 'dialog_order',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialogOrder,
    dialogLines: [
      {
        speaker: 'npc',
        text: '룸메이트하고 같이 살기 어때요?',
      },
      {
        speaker: 'user',
        text: '좋아요. 그런데 한 가지 바라는 게 있어요.',
      },
      {
        speaker: 'npc',
        text: '뭔데요?',
      },
      {
        speaker: 'user',
        text: '방을 조금 더 자주 청소했으면 좋겠어요.',
      },
    ],
    answer: 'all_correct',
    answerTranslation: {
      ko: '룸메이트와 사는 상황을 말한 뒤 청소를 더 자주 했으면 하는 바람을 이야기해.',
      uz: 'Xonadosh bilan yashash haqida gapirib, tez-tez tozalash istagi aytiladi.',
      en: 'The speaker talks about living with a roommate and then wishes the room were cleaned more often.',
      ru: 'Говорящий рассказывает о соседе и желает, чтобы комнату убирали чаще.',
    },
    difficulty: 5,
    tags: ['룸메이트', '친구에게 바람', '대화 순서'],
    hint: {
      ko: '상황 → 바라는 게 있음 → 내용 질문 → 구체적인 바람 순서야.',
      uz: 'Vaziyat → istak bor → savol → aniq istak.',
      en: 'Situation → mention a wish → ask what it is → specific wish.',
      ru: 'Ситуация → упоминание желания → вопрос → конкретное пожелание.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_271_listen_fill: {
    type: 'listen_fill',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenFill,
    sentenceTemplate:
      '친구가 약속 시간을 잘 ___ 좋겠고, 수업에는 조금 더 일찍 ___ 좋겠어요.',
    blankAnswers: ['지켰으면', '왔으면'],
    answerTranslation: {
      ko: '친구가 약속 시간을 잘 지켰으면 좋겠고, 수업에는 조금 더 일찍 왔으면 좋겠어요.',
      uz: 'Do‘stim vaqtga rioya qilsa va darsga ertaroq kelsa edi.',
      en: 'I hope my friend keeps appointments and comes to class a little earlier.',
      ru: 'Хотелось бы, чтобы друг соблюдал время встреч и приходил на занятия немного раньше.',
    },
    difficulty: 5,
    tags: ['연습3 적응', '친구', '듣기'],
    hint: {
      ko: '첫 번째는 지키다, 두 번째는 오다야.',
      uz: 'Birinchisi 지키다, ikkinchisi 오다.',
      en: 'The first comes from 지키다; the second from 오다.',
      ru: 'Первый пропуск от 지키다, второй — от 오다.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_272_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.cloze,
    passage:
      '바라는 것을 정리해 봐요. 세계 여행을 ___. 시험은 ___. 바다가 가까운 집에 ___. 좋아하는 가수를 ___. 친구는 약속 시간을 잘 ___.',
    options: [
      '했으면 좋겠어요',
      '쉬웠으면 좋겠어요',
      '살았으면 좋겠어요',
      '만났으면 좋겠어요',
      '지켰으면 좋겠어요',
    ],
    answer:
      '했으면 좋겠어요|쉬웠으면 좋겠어요|살았으면 좋겠어요|만났으면 좋겠어요|지켰으면 좋겠어요',
    answerTranslation: {
      ko: '여행, 시험, 집, 만나고 싶은 사람, 친구에게 바라는 행동까지 Node 4의 핵심을 모두 복습해.',
      uz: 'Sayohat, imtihon, uy, uchrashmoqchi odam va do‘stga istaklarni takrorlaydi.',
      en: 'This reviews the key wishes about travel, exams, housing, meeting someone, and a friend’s behavior.',
      ru: 'Повторяются желания о путешествии, экзамене, доме, встрече с человеком и поведении друга.',
    },
    difficulty: 5,
    tags: ['Node4 종합', '교재80-81'],
    hint: {
      ko: '다섯 빈칸의 핵심 동사는 하다·쉽다·살다·만나다·지키다야.',
      uz: 'Asosiy so‘zlar: 하다 · 쉽다 · 살다 · 만나다 · 지키다.',
      en: 'The key words are 하다, 쉽다, 살다, 만나다, and 지키다.',
      ru: 'Ключевые слова: 하다, 쉽다, 살다, 만나다 и 지키다.',
    },
    xpReward: 25,
    isActive: true,
  },
  // ══════════════════════════════════════════════════════════
  // Unit 4 · Node 5 · 문형 연습
  // 교재 p.82~83 전체
  //
  // p.82 연습 1 — A-(으)ㄴ/V-는 것 같아요
  //
  // [보기]
  // T: 아키라 씨는 지금 뭐 해요?
  // S: (숙제하다) 숙제하는 것 같아요.
  //
  // 1)
  // T: 스티븐 씨는 지금 뭐 해요?
  // S: (방에서 자다)
  // → 방에서 자는 것 같아요.
  //
  // 2)
  // T: 히엔 씨는 요즘 어떻게 지내요?
  // S: (아주 바쁘다)
  // → 아주 바쁜 것 같아요.
  //
  // 3)
  // T: 마리코 씨는 지금 어디에 있어요?
  // S: (집에 있다)
  // → 집에 있는 것 같아요.
  //
  // 4)
  // T: 오늘 날씨가 어때요?
  // S: (어제보다 춥다)
  // → 어제보다 추운 것 같아요.
  //
  //
  // p.82 연습 2 — N인 것 같아요
  //
  // [보기]
  // T: 저 사람은 누구예요?
  // S: (줄리아 씨 동생)
  // → 줄리아 씨 동생인 것 같아요.
  //
  // 1)
  // T: 이 가방은 누구 거예요?
  // S: (유진 씨 가방)
  // → 유진 씨 가방인 것 같아요.
  //
  // 2)
  // T: 나나 씨 생일은 언제예요?
  // S: (다음 주 목요일)
  // → 다음 주 목요일인 것 같아요.
  //
  // 3)
  // T: 저 사람은 어느 나라 사람이에요?
  // S: (프랑스 사람)
  // → 프랑스 사람인 것 같아요.
  //
  // 4)
  // T: 2급 반 교실은 몇 층이에요?
  // S: (3층)
  // → 3층인 것 같아요.
  //
  //
  // p.83 연습 3 — N보다 더
  //
  // [보기]
  // T: 지하철, 버스, 복잡하다
  // S: 지하철이 버스보다 더 복잡해요.
  //
  // 1)
  // 오늘, 어제, 바쁘다
  // → 오늘이 어제보다 더 바빠요.
  //
  // 2)
  // 올해, 작년, 덥다
  // → 올해가 작년보다 더 더워요.
  //
  // 3)
  // 쓰기, 읽기, 어렵다
  // → 쓰기가 읽기보다 더 어려워요.
  //
  // 4)
  // 한라산, 설악산, 높다
  // → 한라산이 설악산보다 더 높아요.
  //
  //
  // p.83 연습 4 — -았으면/었으면 좋겠어요
  //
  // [보기]
  // T: 한국 친구가 있다
  // S: 한국 친구가 있었으면 좋겠어요.
  //
  // 1)
  // 한국말을 잘하다
  // → 한국말을 잘했으면 좋겠어요.
  //
  // 2)
  // 돈이 많다
  // → 돈이 많았으면 좋겠어요.
  //
  // 3)
  // 숙제가 없다
  // → 숙제가 없었으면 좋겠어요.
  //
  // 4)
  // 집이 가깝다
  // → 집이 가까웠으면 좋겠어요.
  //
  // Grammar 전용 문제 타입 사용 금지.
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────
  // Lesson 1 · 어떤 것 같아요?
  // p.82 연습 1 + 연습 2 전체
  // ──────────────────────────────────────────────────────────

  s3u4_273_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '아키라 씨는 지금 뭐 해요?',
      },
    ],
    options: [
      '숙제하는 것 같아요.',
      '숙제한 사람인 것 같아요.',
      '숙제가 더 어려워요.',
      '숙제가 없었으면 좋겠어요.',
    ],
    answer: '숙제하는 것 같아요.',
    acceptedAnswers: ['숙제하는 것 같아요'],
    answerTranslation: {
      ko: '숙제하는 것 같아요.',
      uz: 'Uy vazifasini qilayotganga o‘xshaydi.',
      en: 'It looks like Akira is doing homework.',
      ru: 'Кажется, Акира делает домашнее задание.',
    },
    difficulty: 3,
    tags: ['것 같다', '숙제하다', '문형 연습'],
    hint: {
      ko: '지금 하고 있는 행동을 추측해.',
      uz: 'Hozir qilayotgan harakatini taxmin qil.',
      en: 'Infer what the person is doing now.',
      ru: 'Предположите, что человек делает сейчас.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_274_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '스티븐 씨는 방에서 자는 것 같아요.',
    options: [
      '스티븐 씨가 방에서 자고 있는 것 같아요.',
      '스티븐 씨가 방을 청소하는 것 같아요.',
      '스티븐 씨가 밖에 나간 것 같아요.',
      '스티븐 씨가 숙제하기를 바라요.',
    ],
    answer: '스티븐 씨가 방에서 자고 있는 것 같아요.',
    answerTranslation: {
      ko: '스티븐 씨는 방에서 자는 것 같아요.',
      uz: 'Steven xonasida uxlayotganga o‘xshaydi.',
      en: 'Steven seems to be sleeping in his room.',
      ru: 'Кажется, Стивен спит в комнате.',
    },
    difficulty: 3,
    tags: ['자는 것 같다', '스티븐', '듣기'],
    hint: {
      ko: '장소는 방이고 행동은 자다야.',
      uz: 'Joy — xona, harakat — uxlamoq.',
      en: 'The place is his room and the action is sleeping.',
      ru: 'Место — комната, действие — спать.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_275_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '스티븐 씨는 방에서 ___ 것 같아요.',
    blankAnswers: ['자는'],
    options: ['자는', '잔', '잘', '자서', '자면'],
    answerTranslation: {
      ko: '스티븐 씨는 방에서 자는 것 같아요.',
      uz: 'Steven xonasida uxlayotganga o‘xshaydi.',
      en: 'Steven seems to be sleeping in his room.',
      ru: 'Кажется, Стивен спит в комнате.',
    },
    difficulty: 3,
    tags: ['자다', '연습1-1'],
    hint: {
      ko: '현재 행동을 추측하는 표현이야.',
      uz: 'Hozirgi harakatni taxmin qiluvchi shakl.',
      en: 'Use the form for inferring a current action.',
      ru: 'Используйте форму для предположения о текущем действии.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_276_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '히엔 씨는 요즘 아주 바쁜 것 같아요.',
    answer: '히엔 씨는 요즘 아주 바쁜 것 같아요.',
    acceptedAnswers: ['히엔 씨는 요즘 아주 바쁜 것 같아요'],
    answerTranslation: {
      ko: '히엔 씨는 요즘 아주 바쁜 것 같아요.',
      uz: 'Hien oxirgi paytda juda banddek.',
      en: 'Hien seems very busy these days.',
      ru: 'Кажется, Хиен в последнее время очень занят.',
    },
    difficulty: 4,
    tags: ['바쁜 것 같다', '히엔', '말하기'],
    hint: {
      ko: '바쁘다 → 바쁜 것 같아요.',
      uz: '바쁘다 → 바쁜 것 같아요.',
      en: '바쁘다 becomes 바쁜 것 같아요.',
      ru: '바쁘다 → 바쁜 것 같아요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_277_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['마리코 씨는', '지금', '집에', '있는', '것 같아요', '있은'],
    answer: '마리코 씨는 지금 집에 있는 것 같아요',
    answerTranslation: {
      ko: '마리코 씨는 지금 집에 있는 것 같아요.',
      uz: 'Mariko hozir uyda bo‘lganga o‘xshaydi.',
      en: 'Mariko seems to be at home now.',
      ru: 'Кажется, Марико сейчас дома.',
    },
    difficulty: 4,
    tags: ['있는 것 같다', '마리코', '연습1-3'],
    hint: {
      ko: '있다 → 있는 것 같아요.',
      uz: '있다 → 있는 것 같아요.',
      en: '있다 becomes 있는 것 같아요.',
      ru: '있다 → 있는 것 같아요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_278_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '오늘은 어제보다 추운 것 같아요.',
    options: [
      '오늘이 어제보다 더 추워 보여요.',
      '어제가 오늘보다 더 추워 보여요.',
      '오늘과 어제 날씨가 같아요.',
      '오늘은 어제보다 더 더워 보여요.',
    ],
    answer: '오늘이 어제보다 더 추워 보여요.',
    answerTranslation: {
      ko: '오늘은 어제보다 추운 것 같아요.',
      uz: 'Bugun kechagidan sovuqroqdek.',
      en: 'Today seems colder than yesterday.',
      ru: 'Кажется, сегодня холоднее, чем вчера.',
    },
    difficulty: 4,
    tags: ['추운 것 같다', '어제보다', '듣기'],
    hint: {
      ko: '비교 기준은 어제야.',
      uz: 'Taqqoslash mezoni — kecha.',
      en: 'Yesterday is the comparison baseline.',
      ru: 'База сравнения — вчера.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_279_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '오늘 날씨가 어때요?',
    options: ['어제보다', '추운', '것 같아요', '더워요', '가방인'],
    answer: '어제보다 추운 것 같아요',
    answerTranslation: {
      ko: '어제보다 추운 것 같아요.',
      uz: 'Kechagidan sovuqroqdek.',
      en: 'It seems colder than yesterday.',
      ru: 'Кажется, холоднее, чем вчера.',
    },
    difficulty: 4,
    tags: ['연습1-4', '날씨', '응답'],
    hint: {
      ko: '어제와 비교하면서 오늘 날씨를 추측해.',
      uz: 'Bugungi havoni kecha bilan taqqoslab taxmin qil.',
      en: 'Infer today’s weather by comparing it with yesterday.',
      ru: 'Оцените сегодняшнюю погоду по сравнению со вчерашней.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_280_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '저 사람은 줄리아 씨 ___ 것 같아요.',
    blankAnswers: ['동생인'],
    options: ['동생인', '동생은', '동생이', '동생하는', '동생을'],
    answerTranslation: {
      ko: '저 사람은 줄리아 씨 동생인 것 같아요.',
      uz: 'U odam Julianing ukasi yoki singlisi shekilli.',
      en: 'That person seems to be Julia’s younger sibling.',
      ru: 'Кажется, это младший брат или сестра Джулии.',
    },
    difficulty: 3,
    tags: ['N인 것 같다', '줄리아', '연습2 보기'],
    hint: {
      ko: '동생은 명사라서 “동생인 것 같아요”가 돼.',
      uz: '동생 ot, shuning uchun “동생인 것 같아요”.',
      en: '동생 is a noun, so use 동생인 것 같아요.',
      ru: '동생 — существительное, поэтому 동생인 것 같아요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_281_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '유진 씨 가방인 것 같아요.',
    acceptedAnswers: ['유진 씨 가방인 것 같아요'],
    answerTranslation: {
      ko: '유진 씨 가방인 것 같아요.',
      uz: 'Yujinning sumkasi shekilli.',
      en: 'It seems to be Yujin’s bag.',
      ru: 'Кажется, это сумка Юджин.',
    },
    difficulty: 4,
    tags: ['가방인 것 같다', '유진', '듣기'],
    hint: {
      ko: '누구의 가방인지 추측하는 문장이야.',
      uz: 'Sumka kimniki ekanini taxmin qil.',
      en: 'The sentence guesses whose bag it is.',
      ru: 'В предложении предполагают, чья это сумка.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_282_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '나나 씨 생일은 언제예요?',
      },
    ],
    options: [
      '다음 주 목요일인 것 같아요.',
      '다음 주 목요일을 더 좋아해요.',
      '다음 주 목요일이 바빠요.',
      '목요일에 숙제가 없었으면 좋겠어요.',
    ],
    answer: '다음 주 목요일인 것 같아요.',
    acceptedAnswers: ['다음 주 목요일인 것 같아요'],
    answerTranslation: {
      ko: '다음 주 목요일인 것 같아요.',
      uz: 'Keyingi hafta payshanba shekilli.',
      en: 'I think it is next Thursday.',
      ru: 'Кажется, в следующий четверг.',
    },
    difficulty: 3,
    tags: ['N인 것 같다', '생일', '연습2-2'],
    hint: {
      ko: '날짜도 명사 표현이라 “인 것 같아요”를 사용할 수 있어.',
      uz: 'Sana ham ot ifodasi, “인 것 같아요” ishlatiladi.',
      en: 'A date is also a noun phrase, so 인 것 같아요 can follow it.',
      ru: 'Дата — именная конструкция, поэтому можно использовать 인 것 같아요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_283_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '저 사람에 대한 추측으로 맞는 것을 고르세요.',
      uz: 'U odam haqidagi taxminni tanla.',
      en: 'Choose the inference about the person.',
      ru: 'Выберите предположение об этом человеке.',
    },
    passage: 'A: 저 사람은 어느 나라 사람이에요?\nB: 프랑스 사람인 것 같아요.',
    options: [
      '프랑스 사람으로 추측해요.',
      '프랑스에 가고 싶어 해요.',
      '프랑스보다 한국을 더 좋아해요.',
      '프랑스 사람이 아니라고 확신해요.',
    ],
    answer: '프랑스 사람으로 추측해요.',
    answerTranslation: {
      ko: '저 사람이 프랑스 사람인 것 같다고 추측해.',
      uz: 'U odam fransuz shekilli deb taxmin qilinadi.',
      en: 'The speaker thinks the person is French.',
      ru: 'Говорящий предполагает, что человек из Франции.',
    },
    difficulty: 3,
    tags: ['프랑스 사람인 것 같다', '독해'],
    hint: {
      ko: '“인 것 같아요”는 확정이 아니라 추측이야.',
      uz: '“인 것 같아요” aniq fakt emas, taxmin.',
      en: '인 것 같아요 expresses an inference rather than certainty.',
      ru: '인 것 같아요 выражает предположение, а не уверенность.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_284_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '2급 반 교실은 ___ 것 같아요.',
    blankAnswers: ['3층인'],
    options: ['3층인', '3층은', '3층을', '3층에', '3층보다'],
    answerTranslation: {
      ko: '2급 반 교실은 3층인 것 같아요.',
      uz: '2-daraja sinfi uchinchi qavatda shekilli.',
      en: 'I think the Level 2 classroom is on the third floor.',
      ru: 'Кажется, класс второго уровня находится на третьем этаже.',
    },
    difficulty: 4,
    tags: ['3층인 것 같다', '연습2-4'],
    hint: {
      ko: '3층도 명사라서 뒤에 “인”이 와.',
      uz: '3층 ham ot, shuning uchun “인”.',
      en: '3층 is a noun, so it takes 인.',
      ru: '3층 — существительное, поэтому используется 인.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_285_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '줄리아 씨 동생인 것 같아요.',
    answer: '줄리아 씨 동생인 것 같아요.',
    acceptedAnswers: ['줄리아 씨 동생인 것 같아요'],
    answerTranslation: {
      ko: '줄리아 씨 동생인 것 같아요.',
      uz: 'Julianing ukasi yoki singlisi shekilli.',
      en: 'It seems to be Julia’s younger sibling.',
      ru: 'Кажется, это младший брат или сестра Джулии.',
    },
    difficulty: 4,
    tags: ['N인 것 같다', '말하기'],
    hint: {
      ko: '명사 뒤의 “인 것 같아요”를 끊지 말고 말해.',
      uz: '“인 것 같아요”ni birga ayt.',
      en: 'Say 인 것 같아요 smoothly as one chunk.',
      ru: 'Плавно произнесите 인 것 같아요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_286_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '이 가방은 유진 씨 가방인 것 같아요.',
    options: [
      '가방 주인이 유진 씨인 것 같아요.',
      '유진 씨가 가방을 사고 싶어 해요.',
      '유진 씨 가방이 더 비싸요.',
      '가방이 3층에 있어요.',
    ],
    answer: '가방 주인이 유진 씨인 것 같아요.',
    answerTranslation: {
      ko: '이 가방이 유진 씨의 것이라고 추측해.',
      uz: 'Bu sumka Yujinniki deb taxmin qilinmoqda.',
      en: 'The speaker thinks the bag belongs to Yujin.',
      ru: 'Говорящий предполагает, что сумка принадлежит Юджин.',
    },
    difficulty: 4,
    tags: ['유진', '가방', '듣기'],
    hint: {
      ko: '누구 거인지 들어.',
      uz: 'Kimniki ekanini tingla.',
      en: 'Listen for whose bag it seems to be.',
      ru: 'Расслышьте, чья это, по мнению говорящего, сумка.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_287_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['저 사람은', '프랑스', '사람인', '것 같아요', '사람을', '더'],
    answer: '저 사람은 프랑스 사람인 것 같아요',
    answerTranslation: {
      ko: '저 사람은 프랑스 사람인 것 같아요.',
      uz: 'U odam fransuz shekilli.',
      en: 'That person seems to be French.',
      ru: 'Кажется, тот человек из Франции.',
    },
    difficulty: 4,
    tags: ['프랑스 사람', 'N인 것 같다', '어순'],
    hint: {
      ko: '프랑스 사람 전체가 하나의 명사 표현이야.',
      uz: '“프랑스 사람” bitta ot birikmasi.',
      en: '프랑스 사람 functions as one noun phrase.',
      ru: '프랑스 사람 — единая именная группа.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_288_dialog_order: {
    type: 'dialog_order',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialogOrder,
    dialogLines: [
      {
        speaker: 'npc',
        text: '이 가방은 누구 거예요?',
      },
      {
        speaker: 'user',
        text: '잘 모르겠어요.',
      },
      {
        speaker: 'npc',
        text: '유진 씨 가방 아니에요?',
      },
      {
        speaker: 'user',
        text: '네, 유진 씨 가방인 것 같아요.',
      },
    ],
    answer: 'all_correct',
    answerTranslation: {
      ko: '가방 주인을 확실히 모르지만 유진 씨의 가방이라고 추측하는 대화야.',
      uz: 'Sumka egasi aniq emas, lekin Yujinniki deb taxmin qilinadi.',
      en: 'They are not certain who owns the bag but infer that it belongs to Yujin.',
      ru: 'Точно не знают владельца сумки, но предполагают, что она принадлежит Юджин.',
    },
    difficulty: 5,
    tags: ['유진 씨 가방', '대화 순서'],
    hint: {
      ko: '질문 → 모름 → 가능성 제시 → 추측 확인 순서야.',
      uz: 'Savol → bilmaslik → taxmin → tasdiq.',
      en: 'Question → uncertainty → suggestion → tentative agreement.',
      ru: 'Вопрос → неуверенность → предположение → осторожное согласие.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_289_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.cloze,
    passage:
      '사람과 상황을 추측해 봐요. 아키라 씨는 ___ 것 같아요. 히엔 씨는 아주 ___ 것 같아요. 마리코 씨는 집에 ___ 것 같아요. 오늘은 어제보다 ___ 것 같아요. 저 사람은 줄리아 씨 ___ 것 같아요.',
    options: ['숙제하는', '바쁜', '있는', '추운', '동생인'],
    answer: '숙제하는|바쁜|있는|추운|동생인',
    answerTranslation: {
      ko: '숙제하는, 바쁜, 있는, 추운, 동생인을 사용해.',
      uz: '숙제하는, 바쁜, 있는, 추운, 동생인 shakllari ishlatiladi.',
      en: 'Use 숙제하는, 바쁜, 있는, 추운, and 동생인.',
      ru: 'Используются 숙제하는, 바쁜, 있는, 추운 и 동생인.',
    },
    difficulty: 5,
    tags: ['연습1', '연습2', '것 같다 종합'],
    hint: {
      ko: '동사·형용사·명사의 형태가 서로 달라.',
      uz: 'Fe’l, sifat va ot shakllari turlicha.',
      en: 'Verb, adjective, and noun forms are different.',
      ru: 'Формы глаголов, прилагательных и существительных различаются.',
    },
    xpReward: 25,
    isActive: true,
  },

  // ──────────────────────────────────────────────────────────
  // Lesson 2 · 어느 것이 더 그래요?
  // p.83 연습 3 전체
  // ──────────────────────────────────────────────────────────

  s3u4_290_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '지하철하고 버스 중에 뭐가 더 복잡해요?',
      },
    ],
    options: [
      '지하철이 버스보다 더 복잡해요.',
      '버스가 지하철보다 더 높아요.',
      '지하철이 버스보다 더 잘해요.',
      '버스가 지하철인 것 같아요.',
    ],
    answer: '지하철이 버스보다 더 복잡해요.',
    acceptedAnswers: ['지하철이 버스보다 더 복잡해요'],
    answerTranslation: {
      ko: '지하철이 버스보다 더 복잡해요.',
      uz: 'Metro avtobusdan ko‘ra gavjumroq.',
      en: 'The subway is more crowded than the bus.',
      ru: 'В метро теснее, чем в автобусе.',
    },
    difficulty: 3,
    tags: ['N보다', '지하철', '버스', '연습3 보기'],
    hint: {
      ko: '지하철이 비교 결과의 주어야.',
      uz: 'Taqqoslash natijasining egasi — 지하철.',
      en: '지하철 is the subject being described.',
      ru: '지하철 — предмет, который описывается в сравнении.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_291_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '오늘이 어제보다 더 바빠요.',
    options: [
      '오늘 더 바빠요.',
      '어제 더 바빴어요.',
      '오늘과 어제가 똑같아요.',
      '오늘이 어제보다 더 추워요.',
    ],
    answer: '오늘 더 바빠요.',
    answerTranslation: {
      ko: '오늘이 어제보다 더 바빠요.',
      uz: 'Bugun kechagidan bandroq.',
      en: 'Today is busier than yesterday.',
      ru: 'Сегодня дел больше, чем вчера.',
    },
    difficulty: 3,
    tags: ['오늘', '어제', '바쁘다', '듣기'],
    hint: {
      ko: '더 바쁜 날이 언제인지 들어.',
      uz: 'Qaysi kun bandroq ekanini tingla.',
      en: 'Listen for which day is busier.',
      ru: 'Расслышьте, какой день более занятой.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_292_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '오늘이 어제보다 ___ 바빠요.',
    blankAnswers: ['더'],
    options: ['더', '제일', '아직', '별로', '전혀'],
    answerTranslation: {
      ko: '오늘이 어제보다 더 바빠요.',
      uz: 'Bugun kechagidan bandroq.',
      en: 'Today is busier than yesterday.',
      ru: 'Сегодня дел больше, чем вчера.',
    },
    difficulty: 3,
    tags: ['더', '오늘', '어제'],
    hint: {
      ko: '두 대상을 비교하고 있어.',
      uz: 'Ikki narsa taqqoslanmoqda.',
      en: 'Two things are being compared.',
      ru: 'Сравниваются два объекта.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_293_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '올해가 작년보다 더 더워요.',
    answer: '올해가 작년보다 더 더워요.',
    acceptedAnswers: ['올해가 작년보다 더 더워요'],
    answerTranslation: {
      ko: '올해가 작년보다 더 더워요.',
      uz: 'Bu yil o‘tgan yildan issiqroq.',
      en: 'This year is hotter than last year.',
      ru: 'В этом году жарче, чем в прошлом.',
    },
    difficulty: 4,
    tags: ['올해', '작년', '덥다', '연습3-2'],
    hint: {
      ko: '덥다 → 더워요.',
      uz: '덥다 → 더워요.',
      en: '덥다 becomes 더워요.',
      ru: '덥다 → 더워요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_294_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['쓰기가', '읽기보다', '더', '어려워요', '높아요', '복잡해요'],
    answer: '쓰기가 읽기보다 더 어려워요',
    answerTranslation: {
      ko: '쓰기가 읽기보다 더 어려워요.',
      uz: 'Yozish o‘qishdan ko‘ra qiyinroq.',
      en: 'Writing is more difficult than reading.',
      ru: 'Писать труднее, чем читать.',
    },
    difficulty: 4,
    tags: ['쓰기', '읽기', '어렵다', '연습3-3'],
    hint: {
      ko: '쓰기가 비교 결과의 주어고 읽기가 기준이야.',
      uz: '쓰기 — ega, 읽기 — taqqoslash mezoni.',
      en: '쓰기 is the subject; 읽기 is the comparison baseline.',
      ru: '쓰기 — субъект, 읽기 — база сравнения.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_295_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '한라산이 설악산보다 더 높아요.',
    options: [
      '한라산이 더 높아요.',
      '설악산이 더 높아요.',
      '두 산의 높이가 같아요.',
      '한라산이 더 복잡해요.',
    ],
    answer: '한라산이 더 높아요.',
    answerTranslation: {
      ko: '한라산이 설악산보다 더 높아요.',
      uz: 'Hallasan Seoraksandan balandroq.',
      en: 'Hallasan is higher than Seoraksan.',
      ru: 'Халласан выше Сораксана.',
    },
    difficulty: 3,
    tags: ['한라산', '설악산', '높다', '듣기'],
    hint: {
      ko: '어느 산이 “더 높아요”와 연결되는지 들어.',
      uz: 'Qaysi tog‘ “더 높아요” bilan bog‘langanini tingla.',
      en: 'Listen for which mountain is linked to 더 높아요.',
      ru: 'Расслышьте, какая гора связана с 더 높아요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_296_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '오늘하고 어제 중에 언제 더 바빠요?',
    options: ['오늘이', '어제보다', '더', '바빠요', '추운', '3층인'],
    answer: '오늘이 어제보다 더 바빠요',
    answerTranslation: {
      ko: '오늘이 어제보다 더 바빠요.',
      uz: 'Bugun kechagidan bandroq.',
      en: 'Today is busier than yesterday.',
      ru: 'Сегодня дел больше, чем вчера.',
    },
    difficulty: 4,
    tags: ['연습3-1', '응답'],
    hint: {
      ko: '오늘을 주어로 놓고 어제를 비교 기준으로 해.',
      uz: '오늘 ega, 어제 taqqoslash mezoni.',
      en: 'Use today as the subject and yesterday as the baseline.',
      ru: 'Сегодня — субъект, вчера — база сравнения.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_297_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '문장의 뜻으로 맞는 것을 고르세요.',
      uz: 'Gap ma’nosini to‘g‘ri tanla.',
      en: 'Choose the correct meaning of the sentence.',
      ru: 'Выберите правильное значение предложения.',
    },
    passage: '올해가 작년보다 더 더워요.',
    options: [
      '올해 기온이 작년보다 높아요.',
      '작년이 올해보다 더 더워요.',
      '올해와 작년의 날씨가 같아요.',
      '올해가 작년보다 더 바빠요.',
    ],
    answer: '올해 기온이 작년보다 높아요.',
    answerTranslation: {
      ko: '올해가 작년보다 더 덥다는 뜻이야.',
      uz: 'Bu yil o‘tgan yildan issiqroq degani.',
      en: 'It means this year is hotter than last year.',
      ru: 'Это значит, что в этом году жарче, чем в прошлом.',
    },
    difficulty: 3,
    tags: ['올해', '작년', '비교', '독해'],
    hint: {
      ko: '“더 더워요”의 비교 방향을 확인해.',
      uz: '“더 더워요” taqqoslash yo‘nalishini tekshir.',
      en: 'Check the direction of the comparison.',
      ru: 'Проверьте направление сравнения.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_298_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '쓰기가 읽기보다 더 ___.',
    blankAnswers: ['어려워요'],
    options: ['어려워요', '높아요', '더워요', '바빠요', '복잡해요'],
    answerTranslation: {
      ko: '쓰기가 읽기보다 더 어려워요.',
      uz: 'Yozish o‘qishdan qiyinroq.',
      en: 'Writing is more difficult than reading.',
      ru: 'Писать труднее, чем читать.',
    },
    difficulty: 3,
    tags: ['쓰기', '읽기', '연습3-3'],
    hint: {
      ko: '비교하는 특징은 난이도야.',
      uz: 'Taqqoslanayotgan xususiyat — qiyinlik.',
      en: 'The comparison is about difficulty.',
      ru: 'Сравнивается сложность.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_299_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '한라산이 설악산보다 더 높아요.',
    acceptedAnswers: ['한라산이 설악산보다 더 높아요'],
    answerTranslation: {
      ko: '한라산이 설악산보다 더 높아요.',
      uz: 'Hallasan Seoraksandan balandroq.',
      en: 'Hallasan is higher than Seoraksan.',
      ru: 'Халласан выше Сораксана.',
    },
    difficulty: 4,
    tags: ['한라산', '설악산', '듣기'],
    hint: {
      ko: '두 산 이름의 순서를 바꾸지 마.',
      uz: 'Ikki tog‘ nomi tartibini almashtirma.',
      en: 'Do not reverse the two mountain names.',
      ru: 'Не меняйте местами названия гор.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_300_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '올해하고 작년 중에 언제 더 더워요?',
      },
    ],
    options: [
      '올해가 작년보다 더 더워요.',
      '작년이 올해보다 더 더워요.',
      '올해가 작년보다 더 어려워요.',
      '작년이 올해보다 더 높아요.',
    ],
    answer: '올해가 작년보다 더 더워요.',
    acceptedAnswers: ['올해가 작년보다 더 더워요'],
    answerTranslation: {
      ko: '올해가 작년보다 더 더워요.',
      uz: 'Bu yil o‘tgan yildan issiqroq.',
      en: 'This year is hotter than last year.',
      ru: 'В этом году жарче, чем в прошлом.',
    },
    difficulty: 3,
    tags: ['연습3-2', '대화'],
    hint: {
      ko: '원본에서는 올해가 더 덥다고 비교해.',
      uz: 'Manbada bu yil issiqroq deb taqqoslanadi.',
      en: 'The source comparison states that this year is hotter.',
      ru: 'В исходном упражнении этот год сравнивается как более жаркий.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_301_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '지하철이 버스보다 더 복잡해요.',
    options: [
      '지하철이 더 복잡해요.',
      '버스가 더 복잡해요.',
      '지하철이 더 높아요.',
      '버스가 더 어려워요.',
    ],
    answer: '지하철이 더 복잡해요.',
    answerTranslation: {
      ko: '지하철이 버스보다 더 복잡해요.',
      uz: 'Metro avtobusdan gavjumroq.',
      en: 'The subway is more crowded than the bus.',
      ru: 'В метро теснее, чем в автобусе.',
    },
    difficulty: 3,
    tags: ['지하철', '버스', '듣기'],
    hint: {
      ko: '복잡한 쪽이 지하철이야.',
      uz: 'Gavjumroq tomoni — metro.',
      en: 'The subway is the more crowded one.',
      ru: 'Более переполнено метро.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_302_translate_builder: {
    type: 'translate_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '오늘이 어제보다 더 바빠요',
      uz: 'Bugun kechagidan bandroq',
      en: 'Today is busier than yesterday',
      ru: 'Сегодня дел больше, чем вчера',
    },
    options: ['오늘이', '어제보다', '더', '바빠요', '더워요', '프랑스'],
    answer: '오늘이 어제보다 더 바빠요',
    answerTranslation: {
      ko: '오늘이 어제보다 더 바빠요.',
      uz: 'Bugun kechagidan bandroq.',
      en: 'Today is busier than yesterday.',
      ru: 'Сегодня дел больше, чем вчера.',
    },
    difficulty: 4,
    tags: ['오늘', '어제', '번역'],
    hint: {
      ko: '오늘을 어제와 비교해.',
      uz: 'Bugunni kecha bilan taqqosla.',
      en: 'Compare today with yesterday.',
      ru: 'Сравните сегодня со вчера.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_303_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '쓰기가 읽기보다 더 어려워요.',
    answer: '쓰기가 읽기보다 더 어려워요.',
    acceptedAnswers: ['쓰기가 읽기보다 더 어려워요'],
    answerTranslation: {
      ko: '쓰기가 읽기보다 더 어려워요.',
      uz: 'Yozish o‘qishdan qiyinroq.',
      en: 'Writing is more difficult than reading.',
      ru: 'Писать труднее, чем читать.',
    },
    difficulty: 4,
    tags: ['쓰기', '읽기', '말하기'],
    hint: {
      ko: '쓰기와 읽기의 순서를 정확히 말해.',
      uz: '쓰기 va 읽기 tartibini aniq ayt.',
      en: 'Keep 쓰기 and 읽기 in the correct order.',
      ru: 'Сохраняйте правильный порядок 쓰기 и 읽기.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_304_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '네 비교 중 원문의 내용과 맞는 것을 고르세요.',
      uz: 'To‘rtta taqqoslashdan to‘g‘risini tanla.',
      en: 'Choose the comparison that matches the practice.',
      ru: 'Выберите сравнение, соответствующее упражнению.',
    },
    passage: '오늘/어제, 올해/작년, 쓰기/읽기, 한라산/설악산을 비교합니다.',
    options: [
      '쓰기가 읽기보다 더 어려워요.',
      '읽기가 쓰기보다 더 어려워요.',
      '설악산이 한라산보다 더 높아요.',
      '작년이 올해보다 더 더워요.',
    ],
    answer: '쓰기가 읽기보다 더 어려워요.',
    answerTranslation: {
      ko: '연습에서는 쓰기가 읽기보다 더 어렵다고 비교해.',
      uz: 'Mashqda yozish o‘qishdan qiyinroq deb berilgan.',
      en: 'The practice compares writing as more difficult than reading.',
      ru: 'В упражнении письмо указано как более трудное, чем чтение.',
    },
    difficulty: 4,
    tags: ['연습3', '독해'],
    hint: {
      ko: '각 비교의 방향을 확인해.',
      uz: 'Har taqqoslash yo‘nalishini tekshir.',
      en: 'Check the direction of each comparison.',
      ru: 'Проверьте направление каждого сравнения.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_305_listen_fill: {
    type: 'listen_fill',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenFill,
    sentenceTemplate: '오늘이 어제보다 더 ___, 올해가 작년보다 더 ___.',
    blankAnswers: ['바빠요', '더워요'],
    answerTranslation: {
      ko: '오늘이 어제보다 더 바쁘고, 올해가 작년보다 더 더워요.',
      uz: 'Bugun kechagidan bandroq, bu yil esa o‘tgan yildan issiqroq.',
      en: 'Today is busier than yesterday, and this year is hotter than last year.',
      ru: 'Сегодня дел больше, чем вчера, а в этом году жарче, чем в прошлом.',
    },
    difficulty: 5,
    tags: ['비교', '듣기 종합'],
    hint: {
      ko: '첫 번째는 바쁨, 두 번째는 온도야.',
      uz: 'Birinchisi bandlik, ikkinchisi harorat.',
      en: 'The first concerns busyness; the second concerns temperature.',
      ru: 'Первый пропуск о занятости, второй — о температуре.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_306_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.cloze,
    passage:
      '두 가지를 비교해요. 지하철이 버스보다 더 ___. 오늘이 어제보다 더 ___. 올해가 작년보다 더 ___. 쓰기가 읽기보다 더 ___. 한라산이 설악산보다 더 ___.',
    options: ['복잡해요', '바빠요', '더워요', '어려워요', '높아요'],
    answer: '복잡해요|바빠요|더워요|어려워요|높아요',
    answerTranslation: {
      ko: '복잡해요, 바빠요, 더워요, 어려워요, 높아요를 순서대로 사용해.',
      uz: '복잡해요, 바빠요, 더워요, 어려워요, 높아요 tartibida ishlatiladi.',
      en: 'Use 복잡해요, 바빠요, 더워요, 어려워요, and 높아요 in order.',
      ru: 'По порядку используются 복잡해요, 바빠요, 더워요, 어려워요 и 높아요.',
    },
    difficulty: 5,
    tags: ['연습3 전체', 'N보다', '종합'],
    hint: {
      ko: '교통 → 일정 → 날씨 → 공부 → 산 높이 순서야.',
      uz: 'Transport → bandlik → ob-havo → o‘qish → tog‘.',
      en: 'The order is transport → schedule → weather → study → mountain height.',
      ru: 'Порядок: транспорт → занятость → погода → учёба → высота гор.',
    },
    xpReward: 25,
    isActive: true,
  },

  // ──────────────────────────────────────────────────────────
  // Lesson 3 · 이랬으면 좋겠어요
  // p.83 연습 4 전체
  // ──────────────────────────────────────────────────────────

  s3u4_307_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '한국 생활하면서 바라는 게 있어요?',
      },
    ],
    options: [
      '한국 친구가 있었으면 좋겠어요.',
      '한국 친구가 프랑스 사람인 것 같아요.',
      '한국 친구보다 버스가 복잡해요.',
      '한국 친구가 자는 것 같아요.',
    ],
    answer: '한국 친구가 있었으면 좋겠어요.',
    acceptedAnswers: ['한국 친구가 있었으면 좋겠어요'],
    answerTranslation: {
      ko: '한국 친구가 있었으면 좋겠어요.',
      uz: 'Koreys do‘stim bo‘lsa edi.',
      en: 'I wish I had a Korean friend.',
      ru: 'Хотелось бы иметь корейского друга.',
    },
    difficulty: 3,
    tags: ['있었으면 좋겠다', '한국 친구', '연습4 보기'],
    hint: {
      ko: '친구가 생기기를 바라는 표현이야.',
      uz: 'Koreys do‘sti bo‘lish istagi.',
      en: 'It expresses a wish to have a Korean friend.',
      ru: 'Это желание иметь корейского друга.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_308_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '한국말을 잘했으면 좋겠어요.',
    options: [
      '한국어 실력이 좋아지기를 바라요.',
      '한국어를 공부하지 않으려고 해요.',
      '한국말보다 영어가 더 비싸요.',
      '한국어 시험이 끝났어요.',
    ],
    answer: '한국어 실력이 좋아지기를 바라요.',
    answerTranslation: {
      ko: '한국말을 잘하고 싶다는 바람이야.',
      uz: 'Koreys tilini yaxshi bilishni xohlaydi.',
      en: 'The speaker wishes to be good at Korean.',
      ru: 'Говорящий хочет хорошо владеть корейским.',
    },
    difficulty: 3,
    tags: ['한국말', '잘했으면 좋겠다', '듣기'],
    hint: {
      ko: '언어 능력에 대한 바람이야.',
      uz: 'Til qobiliyati haqidagi istak.',
      en: 'It is a wish about language ability.',
      ru: 'Это пожелание о языковом навыке.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_309_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '돈이 ___ 좋겠어요.',
    blankAnswers: ['많았으면'],
    options: ['많았으면', '많으면', '많은', '많아서', '많는'],
    answerTranslation: {
      ko: '돈이 많았으면 좋겠어요.',
      uz: 'Pulim ko‘p bo‘lsa edi.',
      en: 'I wish I had a lot of money.',
      ru: 'Хотелось бы иметь много денег.',
    },
    difficulty: 3,
    tags: ['돈', '많다', '연습4-2'],
    hint: {
      ko: '많다 → 많았으면 좋겠어요.',
      uz: '많다 → 많았으면 좋겠어요.',
      en: '많다 becomes 많았으면 좋겠어요.',
      ru: '많다 → 많았으면 좋겠어요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_310_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '숙제가 없었으면 좋겠어요.',
    answer: '숙제가 없었으면 좋겠어요.',
    acceptedAnswers: ['숙제가 없었으면 좋겠어요'],
    answerTranslation: {
      ko: '숙제가 없었으면 좋겠어요.',
      uz: 'Uy vazifasi bo‘lmasa edi.',
      en: 'I wish there were no homework.',
      ru: 'Хотелось бы, чтобы домашнего задания не было.',
    },
    difficulty: 4,
    tags: ['숙제', '없다', '연습4-3', '말하기'],
    hint: {
      ko: '없다 → 없었으면 좋겠어요.',
      uz: '없다 → 없었으면 좋겠어요.',
      en: '없다 becomes 없었으면 좋겠어요.',
      ru: '없다 → 없었으면 좋겠어요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_311_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['집이', '가까웠으면', '좋겠어요', '더', '집을', '있는'],
    answer: '집이 가까웠으면 좋겠어요',
    answerTranslation: {
      ko: '집이 가까웠으면 좋겠어요.',
      uz: 'Uy yaqin bo‘lsa edi.',
      en: 'I wish home were closer.',
      ru: 'Хотелось бы, чтобы дом был ближе.',
    },
    difficulty: 4,
    tags: ['집', '가깝다', '연습4-4'],
    hint: {
      ko: '가깝다 → 가까웠으면 좋겠어요.',
      uz: '가깝다 → 가까웠으면 좋겠어요.',
      en: '가깝다 becomes 가까웠으면 좋겠어요.',
      ru: '가깝다 → 가까웠으면 좋겠어요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_312_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '돈이 많았으면 좋겠어요.',
    options: [
      '돈이 많기를 바라요.',
      '돈을 모두 썼어요.',
      '돈이 없다고 확신해요.',
      '돈보다 집이 더 높아요.',
    ],
    answer: '돈이 많기를 바라요.',
    answerTranslation: {
      ko: '돈이 많기를 바라는 말이야.',
      uz: 'Ko‘p pul bo‘lishini xohlaydi.',
      en: 'The speaker wishes to have a lot of money.',
      ru: 'Говорящий хотел бы иметь много денег.',
    },
    difficulty: 3,
    tags: ['돈', '바람', '듣기'],
    hint: {
      ko: '현재 돈이 많다는 사실을 말하는 게 아니야.',
      uz: 'Bu hozir pul ko‘pligi haqidagi fakt emas.',
      en: 'It does not state that the person currently has a lot of money.',
      ru: 'Это не утверждение о том, что сейчас денег много.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_313_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '학교생활하면서 바라는 게 있어요?',
    options: ['숙제가', '없었으면', '좋겠어요', '더 높아요', '프랑스'],
    answer: '숙제가 없었으면 좋겠어요',
    answerTranslation: {
      ko: '숙제가 없었으면 좋겠어요.',
      uz: 'Uy vazifasi bo‘lmasa edi.',
      en: 'I wish there were no homework.',
      ru: 'Хотелось бы, чтобы домашнего задания не было.',
    },
    difficulty: 4,
    tags: ['숙제', '연습4-3', '응답'],
    hint: {
      ko: '숙제가 없는 상태를 바라.',
      uz: 'Uy vazifasi yo‘q bo‘lishini xohla.',
      en: 'Express a wish for there to be no homework.',
      ru: 'Выразите желание, чтобы домашнего задания не было.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_314_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '한국말을 ___ 좋겠어요.',
    blankAnswers: ['잘했으면'],
    options: ['잘했으면', '잘하면', '잘하는', '잘해서', '잘할'],
    answerTranslation: {
      ko: '한국말을 잘했으면 좋겠어요.',
      uz: 'Koreys tilini yaxshi bilsam edi.',
      en: 'I wish I were good at Korean.',
      ru: 'Хотелось бы хорошо владеть корейским.',
    },
    difficulty: 3,
    tags: ['한국말', '연습4-1'],
    hint: {
      ko: '잘하다 → 잘했으면 좋겠어요.',
      uz: '잘하다 → 잘했으면 좋겠어요.',
      en: '잘하다 becomes 잘했으면 좋겠어요.',
      ru: '잘하다 → 잘했으면 좋겠어요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_315_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '집이 가까웠으면 좋겠어요.',
    acceptedAnswers: ['집이 가까웠으면 좋겠어요'],
    answerTranslation: {
      ko: '집이 가까웠으면 좋겠어요.',
      uz: 'Uy yaqin bo‘lsa edi.',
      en: 'I wish home were closer.',
      ru: 'Хотелось бы, чтобы дом был ближе.',
    },
    difficulty: 5,
    tags: ['집', '가까웠으면 좋겠다', '듣기'],
    hint: {
      ko: '가깝다의 ㅂ 변화까지 정확히 들어.',
      uz: '가깝다 shaklidagi o‘zgarishga e’tibor ber.',
      en: 'Listen carefully to the conjugated form of 가깝다.',
      ru: 'Обратите внимание на изменение формы 가깝다.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_316_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '돈이 많으면 뭐 하고 싶어요?',
      },
    ],
    options: [
      '돈이 많았으면 좋겠어요.',
      '돈이 프랑스 사람인 것 같아요.',
      '돈이 버스보다 더 복잡해요.',
      '돈이 자는 것 같아요.',
    ],
    answer: '돈이 많았으면 좋겠어요.',
    acceptedAnswers: ['돈이 많았으면 좋겠어요'],
    answerTranslation: {
      ko: '돈이 많았으면 좋겠어요.',
      uz: 'Pulim ko‘p bo‘lsa edi.',
      en: 'I wish I had a lot of money.',
      ru: 'Хотелось бы иметь много денег.',
    },
    difficulty: 3,
    tags: ['돈', '바람', '대화'],
    hint: {
      ko: '돈이 많은 상태를 바라는 문장을 골라.',
      uz: 'Ko‘p pul bo‘lish istagini tanla.',
      en: 'Choose the sentence expressing a wish to have more money.',
      ru: 'Выберите предложение с пожеланием иметь много денег.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_317_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '“숙제가 없었으면 좋겠어요”의 뜻으로 맞는 것을 고르세요.',
      uz: '“숙제가 없었으면 좋겠어요” ma’nosini tanla.',
      en: 'Choose the meaning of 숙제가 없었으면 좋겠어요.',
      ru: 'Выберите значение 숙제가 없었으면 좋겠어요.',
    },
    passage: '숙제가 없었으면 좋겠어요.',
    options: [
      '숙제가 없기를 바라요.',
      '숙제가 이미 끝났어요.',
      '숙제가 많다고 생각해요.',
      '숙제를 하는 것 같아요.',
    ],
    answer: '숙제가 없기를 바라요.',
    answerTranslation: {
      ko: '숙제가 없는 상태를 바라는 뜻이야.',
      uz: 'Uy vazifasi bo‘lmasligini xohlaydi.',
      en: 'It expresses a wish for there to be no homework.',
      ru: 'Это пожелание, чтобы домашнего задания не было.',
    },
    difficulty: 3,
    tags: ['숙제', '바람', '독해'],
    hint: {
      ko: '“없었으면 좋겠어요”는 없는 상태를 바라.',
      uz: '“없었으면 좋겠어요” yo‘qlikni istaydi.',
      en: '없었으면 좋겠어요 wishes for the absence of something.',
      ru: '없었으면 좋겠어요 выражает желание отсутствия чего-либо.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_318_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '한국 친구가 있었으면 좋겠어요.',
    answer: '한국 친구가 있었으면 좋겠어요.',
    acceptedAnswers: ['한국 친구가 있었으면 좋겠어요'],
    answerTranslation: {
      ko: '한국 친구가 있었으면 좋겠어요.',
      uz: 'Koreys do‘stim bo‘lsa edi.',
      en: 'I wish I had a Korean friend.',
      ru: 'Хотелось бы иметь корейского друга.',
    },
    difficulty: 4,
    tags: ['한국 친구', '말하기'],
    hint: {
      ko: '있다 → 있었으면 좋겠어요.',
      uz: '있다 → 있었으면 좋겠어요.',
      en: '있다 becomes 있었으면 좋겠어요.',
      ru: '있다 → 있었으면 좋겠어요.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_319_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '집이 가까웠으면 좋겠어요.',
    options: [
      '집이 더 가까우면 좋겠다고 바라요.',
      '집이 아주 멀다고 확신해요.',
      '집이 한라산보다 높아요.',
      '집에 마리코 씨가 있는 것 같아요.',
    ],
    answer: '집이 더 가까우면 좋겠다고 바라요.',
    answerTranslation: {
      ko: '집이 가까웠으면 좋겠다는 바람이야.',
      uz: 'Uy yaqinroq bo‘lishini xohlaydi.',
      en: 'The speaker wishes home were closer.',
      ru: 'Говорящий хотел бы, чтобы дом был ближе.',
    },
    difficulty: 4,
    tags: ['가깝다', '집', '듣기'],
    hint: {
      ko: '거리와 관련된 바람이야.',
      uz: 'Bu masofa haqidagi istak.',
      en: 'It is a wish concerning distance.',
      ru: 'Это пожелание, связанное с расстоянием.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_320_translate_builder: {
    type: 'translate_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '돈이 많았으면 좋겠어요',
      uz: 'Pulim ko‘p bo‘lsa edi',
      en: 'I wish I had a lot of money',
      ru: 'Хотелось бы иметь много денег',
    },
    options: ['돈이', '많았으면', '좋겠어요', '더', '복잡해요'],
    answer: '돈이 많았으면 좋겠어요',
    answerTranslation: {
      ko: '돈이 많았으면 좋겠어요.',
      uz: 'Pulim ko‘p bo‘lsa edi.',
      en: 'I wish I had a lot of money.',
      ru: 'Хотелось бы иметь много денег.',
    },
    difficulty: 4,
    tags: ['돈', '번역'],
    hint: {
      ko: '돈이 많은 상태에 대한 바람이야.',
      uz: 'Ko‘p pul bo‘lish istagi.',
      en: 'Express a wish to have a lot of money.',
      ru: 'Выразите желание иметь много денег.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_321_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '한국어 공부하면서 가장 바라는 게 뭐예요?',
    options: ['한국말을', '잘했으면', '좋겠어요', '버스보다', '높아요'],
    answer: '한국말을 잘했으면 좋겠어요',
    answerTranslation: {
      ko: '한국말을 잘했으면 좋겠어요.',
      uz: 'Koreys tilini yaxshi bilsam edi.',
      en: 'I wish I were good at Korean.',
      ru: 'Хотелось бы хорошо владеть корейским.',
    },
    difficulty: 4,
    tags: ['한국말', '응답'],
    hint: {
      ko: '언어 실력에 대한 바람을 말해.',
      uz: 'Til qobiliyati haqidagi istakni ayt.',
      en: 'Express the wish about language ability.',
      ru: 'Выразите пожелание о языковом навыке.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_322_dialog_order: {
    type: 'dialog_order',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialogOrder,
    dialogLines: [
      {
        speaker: 'npc',
        text: '한국 생활 어때요?',
      },
      {
        speaker: 'user',
        text: '재미있어요. 그런데 바라는 것도 있어요.',
      },
      {
        speaker: 'npc',
        text: '뭐가 있었으면 좋겠어요?',
      },
      {
        speaker: 'user',
        text: '한국 친구가 있었으면 좋겠어요.',
      },
    ],
    answer: 'all_correct',
    answerTranslation: {
      ko: '한국 생활에 대해 이야기한 뒤 한국 친구가 있었으면 하는 바람을 말해.',
      uz: 'Koreyadagi hayot haqida gapirib, koreys do‘st istagi aytiladi.',
      en: 'The speaker discusses life in Korea and then wishes to have a Korean friend.',
      ru: 'Говорящий рассказывает о жизни в Корее и выражает желание иметь корейского друга.',
    },
    difficulty: 5,
    tags: ['한국 친구', '바람', '대화 순서'],
    hint: {
      ko: '현재 생활 → 바람이 있음 → 질문 → 구체적인 바람 순서야.',
      uz: 'Hozirgi holat → istak → savol → aniq istak.',
      en: 'Current situation → mention a wish → question → specific wish.',
      ru: 'Текущая ситуация → упоминание желания → вопрос → конкретное желание.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_323_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.cloze,
    passage:
      '바라는 것을 말해요. 한국 친구가 ___. 한국말을 ___. 돈이 ___. 숙제가 ___. 집이 ___.',
    options: [
      '있었으면 좋겠어요',
      '잘했으면 좋겠어요',
      '많았으면 좋겠어요',
      '없었으면 좋겠어요',
      '가까웠으면 좋겠어요',
    ],
    answer:
      '있었으면 좋겠어요|잘했으면 좋겠어요|많았으면 좋겠어요|없었으면 좋겠어요|가까웠으면 좋겠어요',
    answerTranslation: {
      ko: '한국 친구, 한국말, 돈, 숙제, 집에 대한 다섯 바람을 순서대로 완성해.',
      uz: 'Koreys do‘st, til, pul, uy vazifasi va uy haqidagi istaklar.',
      en: 'Complete the five wishes about a Korean friend, Korean ability, money, homework, and home.',
      ru: 'Дополните пять пожеланий о корейском друге, языке, деньгах, домашнем задании и доме.',
    },
    difficulty: 5,
    tags: ['연습4 전체', '바람 종합'],
    hint: {
      ko: '다섯 답이 모두 서로 달라.',
      uz: 'Barcha besh javob har xil.',
      en: 'All five answers are different.',
      ru: 'Все пять ответов различаются.',
    },
    xpReward: 25,
    isActive: true,
  },

  // ──────────────────────────────────────────────────────────
  // Lesson 4 · 4과 문형을 모두 써요
  // p.82~83 전체 종합
  //
  // 원본 네 연습의 내용만 재조합한 앱용 종합 드릴.
  // 새로운 문법 목표 없음.
  // ──────────────────────────────────────────────────────────

  s3u4_324_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '상황에 가장 알맞은 추측을 고르세요.',
      uz: 'Vaziyatga eng mos taxminni tanla.',
      en: 'Choose the most natural inference.',
      ru: 'Выберите наиболее естественное предположение.',
    },
    passage:
      '스티븐 씨 방이 아주 조용합니다. 스티븐 씨는 침대에 누워 있습니다.',
    options: [
      '방에서 자는 것 같아요.',
      '아주 바쁜 것 같아요.',
      '프랑스 사람인 것 같아요.',
      '집이 가까웠으면 좋겠어요.',
    ],
    answer: '방에서 자는 것 같아요.',
    answerTranslation: {
      ko: '스티븐 씨는 방에서 자는 것 같아요.',
      uz: 'Steven xonasida uxlayotganga o‘xshaydi.',
      en: 'Steven seems to be sleeping in his room.',
      ru: 'Кажется, Стивен спит в своей комнате.',
    },
    difficulty: 4,
    tags: ['연습1-1', '상황 추측'],
    hint: {
      ko: '침대에 누워 있고 방이 조용해.',
      uz: 'U karavotda yotibdi va xona jim.',
      en: 'He is lying on the bed and the room is quiet.',
      ru: 'Он лежит на кровати, и в комнате тихо.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_325_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '나나 씨 생일은 다음 주 목요일인 것 같아요.',
    options: [
      '생일이 다음 주 목요일이라고 추측해요.',
      '생일이 오늘이라고 확신해요.',
      '목요일보다 금요일을 더 좋아해요.',
      '목요일에 숙제가 없기를 바라요.',
    ],
    answer: '생일이 다음 주 목요일이라고 추측해요.',
    answerTranslation: {
      ko: '나나 씨 생일이 다음 주 목요일인 것 같다고 말해.',
      uz: 'Nananing tug‘ilgan kuni keyingi payshanba deb taxmin qilinadi.',
      en: 'The speaker thinks Nana’s birthday is next Thursday.',
      ru: 'Говорящий считает, что день рождения Наны в следующий четверг.',
    },
    difficulty: 3,
    tags: ['다음 주 목요일인 것 같다', '듣기'],
    hint: {
      ko: '날짜와 추측 여부를 모두 들어.',
      uz: 'Sana va taxminni birga tingla.',
      en: 'Listen for both the date and the uncertainty.',
      ru: 'Расслышьте и дату, и оттенок предположения.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_326_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '올해가 작년보다 더 ___.',
    blankAnswers: ['더워요'],
    options: ['더워요', '바빠요', '어려워요', '높아요', '복잡해요'],
    answerTranslation: {
      ko: '올해가 작년보다 더 더워요.',
      uz: 'Bu yil o‘tgan yildan issiqroq.',
      en: 'This year is hotter than last year.',
      ru: 'В этом году жарче, чем в прошлом.',
    },
    difficulty: 3,
    tags: ['연습3-2', '비교'],
    hint: {
      ko: '올해와 작년의 날씨를 비교해.',
      uz: 'Bu yil va o‘tgan yil havosini solishtir.',
      en: 'Compare the weather this year and last year.',
      ru: 'Сравните погоду этого и прошлого года.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_327_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '숙제가 없었으면 좋겠어요.',
    answer: '숙제가 없었으면 좋겠어요.',
    acceptedAnswers: ['숙제가 없었으면 좋겠어요'],
    answerTranslation: {
      ko: '숙제가 없었으면 좋겠어요.',
      uz: 'Uy vazifasi bo‘lmasa edi.',
      en: 'I wish there were no homework.',
      ru: 'Хотелось бы, чтобы домашнего задания не было.',
    },
    difficulty: 4,
    tags: ['연습4-3', '말하기'],
    hint: {
      ko: '없는 상태에 대한 바람을 자연스럽게 말해.',
      uz: 'Yo‘qlik haqidagi istakni tabiiy ayt.',
      en: 'Naturally express the wish for there to be none.',
      ru: 'Естественно выразите желание отсутствия домашнего задания.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_328_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '저 사람은 누구예요?',
      },
    ],
    options: [
      '줄리아 씨 동생인 것 같아요.',
      '줄리아 씨보다 더 복잡해요.',
      '줄리아 씨가 있었으면 좋겠어요.',
      '줄리아 씨가 숙제하는 것 같아요.',
    ],
    answer: '줄리아 씨 동생인 것 같아요.',
    acceptedAnswers: ['줄리아 씨 동생인 것 같아요'],
    answerTranslation: {
      ko: '줄리아 씨 동생인 것 같아요.',
      uz: 'Julianing ukasi yoki singlisi shekilli.',
      en: 'It seems to be Julia’s younger sibling.',
      ru: 'Кажется, это младший брат или сестра Джулии.',
    },
    difficulty: 3,
    tags: ['연습2 보기', '대화'],
    hint: {
      ko: '사람의 관계를 명사로 추측해.',
      uz: 'Odamlar orasidagi munosabatni ot bilan taxmin qil.',
      en: 'Infer the relationship using a noun.',
      ru: 'Предположите родство с помощью существительного.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_329_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '한라산이 설악산보다 더 높아요.',
    options: [
      '한라산의 높이가 더 높아요.',
      '설악산의 높이가 더 높아요.',
      '두 산이 같은 높이예요.',
      '설악산이 더 복잡해요.',
    ],
    answer: '한라산의 높이가 더 높아요.',
    answerTranslation: {
      ko: '한라산이 설악산보다 더 높아.',
      uz: 'Hallasan Seoraksandan balandroq.',
      en: 'Hallasan is higher than Seoraksan.',
      ru: 'Халласан выше Сораксана.',
    },
    difficulty: 3,
    tags: ['연습3-4', '듣기'],
    hint: {
      ko: '비교 결과는 한라산이야.',
      uz: 'Taqqoslash natijasi — Hallasan.',
      en: 'Hallasan is the higher mountain in the comparison.',
      ru: 'В сравнении более высокой горой является Халласан.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_330_sentence_builder: {
    type: 'sentence_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.arrange,
    options: ['오늘이', '어제보다', '더', '바빠요', '바쁜', '것 같아요'],
    answer: '오늘이 어제보다 더 바빠요',
    answerTranslation: {
      ko: '오늘이 어제보다 더 바빠요.',
      uz: 'Bugun kechagidan bandroq.',
      en: 'Today is busier than yesterday.',
      ru: 'Сегодня дел больше, чем вчера.',
    },
    difficulty: 4,
    tags: ['연습3-1', '어순'],
    hint: {
      ko: '이번에는 추측이 아니라 직접 비교하는 문장이야.',
      uz: 'Bu safar taxmin emas, bevosita taqqoslash.',
      en: 'This sentence is a direct comparison, not an inference.',
      ru: 'Это прямое сравнение, а не предположение.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_331_reply_builder: {
    type: 'reply_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.reply,
    npcText: '통학하면서 바라는 게 있어요?',
    options: ['집이', '가까웠으면', '좋겠어요', '더 높아요', '프랑스'],
    answer: '집이 가까웠으면 좋겠어요',
    answerTranslation: {
      ko: '집이 가까웠으면 좋겠어요.',
      uz: 'Uy yaqin bo‘lsa edi.',
      en: 'I wish home were closer.',
      ru: 'Хотелось бы, чтобы дом был ближе.',
    },
    difficulty: 4,
    tags: ['연습4-4', '응답'],
    hint: {
      ko: '집의 거리에 대한 바람을 말해.',
      uz: 'Uy masofasi haqidagi istakni ayt.',
      en: 'Express a wish about how far home is.',
      ru: 'Выразите пожелание о расстоянии до дома.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_332_reading_quiz: {
    type: 'reading_quiz',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: {
      ko: '아키라 씨가 지금 하는 일로 가장 알맞은 것은 무엇입니까?',
      uz: 'Akira hozir nima qilayotgan bo‘lishi mumkin?',
      en: 'What does Akira appear to be doing now?',
      ru: 'Что, вероятнее всего, сейчас делает Акира?',
    },
    passage: '아키라 씨는 책상 앞에 앉아서 공책에 문제의 답을 쓰고 있습니다.',
    options: [
      '숙제하는 것 같아요.',
      '방에서 자는 것 같아요.',
      '프랑스 사람인 것 같아요.',
      '돈이 많았으면 좋겠어요.',
    ],
    answer: '숙제하는 것 같아요.',
    answerTranslation: {
      ko: '아키라 씨는 숙제하는 것 같아.',
      uz: 'Akira uy vazifasini qilayotganga o‘xshaydi.',
      en: 'Akira seems to be doing homework.',
      ru: 'Кажется, Акира делает домашнее задание.',
    },
    difficulty: 4,
    tags: ['연습1 보기', '독해'],
    hint: {
      ko: '공책에 문제 답을 쓰고 있어.',
      uz: 'Daftarga masala javoblarini yozmoqda.',
      en: 'Akira is writing answers to problems in a notebook.',
      ru: 'Акира записывает ответы на задания в тетрадь.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_333_listen_type: {
    type: 'listen_type',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listenType,
    answer: '유진 씨 가방인 것 같아요.',
    acceptedAnswers: ['유진 씨 가방인 것 같아요'],
    answerTranslation: {
      ko: '유진 씨 가방인 것 같아요.',
      uz: 'Yujinning sumkasi shekilli.',
      en: 'It seems to be Yujin’s bag.',
      ru: 'Кажется, это сумка Юджин.',
    },
    difficulty: 4,
    tags: ['연습2-1', '듣기'],
    hint: {
      ko: '명사 “가방” 뒤에 “인 것 같아요”가 붙어.',
      uz: '“가방” otidan keyin “인 것 같아요”.',
      en: '가방 is followed by 인 것 같아요.',
      ru: 'После существительного 가방 используется 인 것 같아요.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_334_fill_in_blank: {
    type: 'fill_in_blank',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.fill,
    sentenceTemplate: '히엔 씨는 요즘 아주 ___ 것 같아요.',
    blankAnswers: ['바쁜'],
    options: ['바쁜', '바쁘는', '바쁠', '바빠서', '바쁘게'],
    answerTranslation: {
      ko: '히엔 씨는 요즘 아주 바쁜 것 같아요.',
      uz: 'Hien oxirgi paytda juda banddek.',
      en: 'Hien seems very busy these days.',
      ru: 'Кажется, Хиен в последнее время очень занят.',
    },
    difficulty: 3,
    tags: ['연습1-2', '바쁘다'],
    hint: {
      ko: '바쁘다는 형용사야.',
      uz: '바쁘다 sifat.',
      en: '바쁘다 is an adjective.',
      ru: '바쁘다 — прилагательное.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_335_dialog_complete: {
    type: 'dialog_complete',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialog,
    dialogLines: [
      {
        speaker: 'npc',
        text: '쓰기하고 읽기 중에 뭐가 더 어려워요?',
      },
    ],
    options: [
      '쓰기가 읽기보다 더 어려워요.',
      '읽기가 쓰기보다 더 높아요.',
      '쓰기가 프랑스 사람인 것 같아요.',
      '읽기가 없었으면 좋겠어요.',
    ],
    answer: '쓰기가 읽기보다 더 어려워요.',
    acceptedAnswers: ['쓰기가 읽기보다 더 어려워요'],
    answerTranslation: {
      ko: '쓰기가 읽기보다 더 어려워요.',
      uz: 'Yozish o‘qishdan qiyinroq.',
      en: 'Writing is more difficult than reading.',
      ru: 'Писать труднее, чем читать.',
    },
    difficulty: 3,
    tags: ['연습3-3', '대화'],
    hint: {
      ko: '원본에서는 쓰기가 더 어렵다고 비교해.',
      uz: 'Manbada yozish qiyinroq.',
      en: 'The practice describes writing as more difficult.',
      ru: 'В упражнении письмо указано как более трудное.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_336_listening: {
    type: 'listening',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.LISTENING,
    instruction: I.listen,
    audioText: '한국말을 잘했으면 좋겠어요.',
    options: [
      '한국어를 잘하고 싶어요.',
      '한국어가 읽기보다 어려워요.',
      '한국어 공부를 끝냈어요.',
      '한국어가 프랑스어인 것 같아요.',
    ],
    answer: '한국어를 잘하고 싶어요.',
    answerTranslation: {
      ko: '한국말 실력이 좋아지기를 바라.',
      uz: 'Koreys tilini yaxshi bilishni xohlaydi.',
      en: 'The speaker wishes to become good at Korean.',
      ru: 'Говорящий хочет хорошо владеть корейским.',
    },
    difficulty: 3,
    tags: ['연습4-1', '듣기'],
    hint: {
      ko: '한국어 능력에 관한 바람이야.',
      uz: 'Koreys tili qobiliyati haqidagi istak.',
      en: 'It is a wish about Korean-language ability.',
      ru: 'Это пожелание, связанное со знанием корейского.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_337_translate_builder: {
    type: 'translate_builder',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: {
      ko: '마리코 씨는 지금 집에 있는 것 같아요',
      uz: 'Mariko hozir uyda bo‘lganga o‘xshaydi',
      en: 'Mariko seems to be at home now',
      ru: 'Кажется, Марико сейчас дома',
    },
    options: ['마리코 씨는', '지금', '집에', '있는', '것 같아요', '높아요'],
    answer: '마리코 씨는 지금 집에 있는 것 같아요',
    answerTranslation: {
      ko: '마리코 씨는 지금 집에 있는 것 같아요.',
      uz: 'Mariko hozir uyda bo‘lganga o‘xshaydi.',
      en: 'Mariko seems to be at home now.',
      ru: 'Кажется, Марико сейчас дома.',
    },
    difficulty: 4,
    tags: ['연습1-3', '번역'],
    hint: {
      ko: '있다의 현재 추측 형태를 사용해.',
      uz: '있다 ning hozirgi taxmin shaklini ishlat.',
      en: 'Use the current inference form of 있다.',
      ru: 'Используйте форму предположения настоящего времени от 있다.',
    },
    xpReward: 20,
    isActive: true,
  },

  s3u4_338_speaking: {
    type: 'speaking',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.speak,
    audioText: '지하철이 버스보다 더 복잡해요.',
    answer: '지하철이 버스보다 더 복잡해요.',
    acceptedAnswers: ['지하철이 버스보다 더 복잡해요'],
    answerTranslation: {
      ko: '지하철이 버스보다 더 복잡해요.',
      uz: 'Metro avtobusdan ko‘ra gavjumroq.',
      en: 'The subway is more crowded than the bus.',
      ru: 'В метро теснее, чем в автобусе.',
    },
    difficulty: 4,
    tags: ['연습3 보기', '말하기'],
    hint: {
      ko: '비교 기준인 버스 뒤의 “보다”를 분명하게 말해.',
      uz: '버스 dan keyingi “보다”ni aniq ayt.',
      en: 'Clearly pronounce 보다 after 버스.',
      ru: 'Чётко произнесите 보다 после 버스.',
    },
    xpReward: 15,
    isActive: true,
  },

  s3u4_339_dialog_order: {
    type: 'dialog_order',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.CONVERSATION,
    instruction: I.dialogOrder,
    dialogLines: [
      {
        speaker: 'npc',
        text: '한국어 공부하면서 바라는 게 있어요?',
      },
      {
        speaker: 'user',
        text: '한국말을 잘했으면 좋겠어요.',
      },
      {
        speaker: 'npc',
        text: '다른 바람도 있어요?',
      },
      {
        speaker: 'user',
        text: '한국 친구가 있었으면 좋겠어요.',
      },
    ],
    answer: 'all_correct',
    answerTranslation: {
      ko: '한국어 실력과 한국 친구에 대한 두 가지 바람을 차례로 말하는 대화야.',
      uz: 'Koreys tili qobiliyati va koreys do‘sti haqidagi ikki istak.',
      en: 'The dialogue expresses two wishes in order: better Korean ability and having a Korean friend.',
      ru: 'В диалоге последовательно выражаются два желания: хорошо знать корейский и иметь корейского друга.',
    },
    difficulty: 5,
    tags: ['연습4', '대화 순서'],
    hint: {
      ko: '첫 번째 바람 뒤에 “다른 바람”을 물어.',
      uz: 'Birinchi istakdan keyin boshqa istak so‘raladi.',
      en: 'After the first wish, the speaker asks about another one.',
      ru: 'После первого желания спрашивают о другом.',
    },
    xpReward: 25,
    isActive: true,
  },

  s3u4_340_cloze_passage: {
    type: 'cloze_passage',
    level: QuestionLevel.LEVEL_3,
    lessonCategory: LessonCategory.EXPRESSION,
    instruction: I.cloze,
    passage:
      '4과 문형을 정리해 봐요. 아키라 씨는 ___ 것 같아요. 저 사람은 ___ 것 같아요. 쓰기가 읽기보다 ___. 집이 ___.',
    options: [
      '숙제하는',
      '프랑스 사람인',
      '더 어려워요',
      '가까웠으면 좋겠어요',
    ],
    answer: '숙제하는|프랑스 사람인|더 어려워요|가까웠으면 좋겠어요',
    answerTranslation: {
      ko: '숙제하는 것 같아요, 프랑스 사람인 것 같아요, 쓰기가 읽기보다 더 어려워요, 집이 가까웠으면 좋겠어요를 완성해.',
      uz: 'Harakat taxmini, ot taxmini, taqqoslash va istakni yakunlaydi.',
      en: 'Complete an action inference, noun inference, comparison, and wish.',
      ru: 'Завершите предположение о действии, предположение с существительным, сравнение и пожелание.',
    },
    difficulty: 5,
    tags: ['Unit4 종합', '것 같다', 'N보다', '았으면 좋겠다'],
    hint: {
      ko: '추측 → 명사 추측 → 비교 → 바람 순서야.',
      uz: 'Taxmin → ot bilan taxmin → taqqoslash → istak.',
      en: 'Action inference → noun inference → comparison → wish.',
      ru: 'Предположение о действии → именное предположение → сравнение → пожелание.',
    },
    xpReward: 25,
    isActive: true,
  },
});

export const S3_UNIT4_NODES = [
  {
    title: {
      ko: '뭘 입었어요?',
      uz: 'Nima kiydingiz?',
      en: 'What Are You Wearing?',
      ru: 'Что вы надели?',
    },
    section: 3,
    unit: 4,
    order: 1,
    isActive: true,
    lessons: [
      {
        title: {
          ko: '옷 이름을 알아요',
          uz: 'Kiyim nomlarini o‘rganamiz',
          en: 'Clothing Names',
          ru: 'Названия одежды',
        },
        description: {
          ko: '안경·양복·넥타이부터 모자·목도리·장갑까지 교재 74쪽의 의복 어휘를 익힌다',
          uz: 'Ko‘zoynak · kostyum · galstukdan bosh kiyim · sharf · qo‘lqopgacha 74-bet kiyim so‘zlarini o‘rganish',
          en: 'Learn all clothing vocabulary on page 74, from glasses, suits, and ties to hats, scarves, and gloves',
          ru: 'Выучить всю лексику одежды страницы 74: от очков, костюма и галстука до шапки, шарфа и перчаток',
        },
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        questions: [
          's3u4_001_word_matching',
          's3u4_002_listening',
          's3u4_003_fill_in_blank',
          's3u4_004_speaking',
          's3u4_005_sentence_builder',
          's3u4_006_listening',
          's3u4_007_fill_in_blank',
          's3u4_008_speaking',
          's3u4_009_audio_match',
          's3u4_010_dialog_complete',
          's3u4_011_fill_in_blank',
          's3u4_012_listen_type',
          's3u4_013_reading_quiz',
          's3u4_014_reply_builder',
          's3u4_015_listening',
          's3u4_016_type_answer',
          's3u4_017_cloze_passage',
        ],
      },
      {
        title: {
          ko: '어떻게 착용해요?',
          uz: 'Qanday kiyiladi?',
          en: 'How Do You Wear It?',
          ru: 'Как это надевают?',
        },
        description: {
          ko: '입다·쓰다·끼다·하다·신다를 옷과 정확히 연결하고 교재 75쪽 연습 2의 다섯 대화를 모두 연습한다',
          uz: '입다 · 쓰다 · 끼다 · 하다 · 신다 fe’llarini kiyimlar bilan bog‘lab, 75-betdagi besh dialogni mashq qilish',
          en: 'Match 입다, 쓰다, 끼다, 하다, and 신다 to clothing and practice all five dialogues from page 75',
          ru: 'Правильно сочетать 입다, 쓰다, 끼다, 하다 и 신다 с одеждой и отработать пять диалогов страницы 75',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        questions: [
          's3u4_018_word_matching',
          's3u4_019_dialog_complete',
          's3u4_020_speaking',
          's3u4_021_fill_in_blank',
          's3u4_022_listen_type',
          's3u4_023_sentence_builder',
          's3u4_024_dialog_complete',
          's3u4_025_listening',
          's3u4_026_reply_builder',
          's3u4_027_fill_in_blank',
          's3u4_028_speaking',
          's3u4_029_type_answer',
          's3u4_030_listening',
          's3u4_031_dialog_complete',
          's3u4_032_translate_builder',
          's3u4_033_dialog_order',
          's3u4_034_cloze_passage',
        ],
      },
      {
        title: {
          ko: '사이즈와 색이 어때요?',
          uz: 'O‘lchami va rangi qanday?',
          en: 'How Is the Size and Color?',
          ru: 'Как размер и цвет?',
        },
        description: {
          ko: '비싸다·싸다·길다·짧다·밝다·어둡다·맞다·크다·작다·어울리다·마음에 들다를 쇼핑 상황에서 사용한다',
          uz: 'Narx · uzunlik · rang · o‘lcham · yarashish · yoqishni bildiradigan 75-bet so‘zlarini xarid vaziyatida ishlatish',
          en: 'Use every page-75 shopping descriptor for price, length, color, fit, suitability, and preference',
          ru: 'Использовать всю лексику страницы 75 для цены, длины, цвета, размера, того, идёт ли вещь, и предпочтений',
        },
        category: LessonCategory.VOCABULARY,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        questions: [
          's3u4_035_word_matching',
          's3u4_036_listening',
          's3u4_037_fill_in_blank',
          's3u4_038_speaking',
          's3u4_039_sentence_builder',
          's3u4_040_listening',
          's3u4_041_fill_in_blank',
          's3u4_042_dialog_complete',
          's3u4_043_listen_type',
          's3u4_044_reply_builder',
          's3u4_045_reading_quiz',
          's3u4_046_fill_in_blank',
          's3u4_047_speaking',
          's3u4_048_dialog_complete',
          's3u4_049_listening',
          's3u4_050_reply_builder',
          's3u4_051_cloze_passage',
        ],
      },
      {
        title: {
          ko: '옷 가게에서 골라요',
          uz: 'Kiyim do‘konida tanlaymiz',
          en: 'Choosing Clothes in a Store',
          ru: 'Выбираем одежду в магазине',
        },
        description: {
          ko: '교재 74~75쪽의 옷 이름·착용 동사·가격·길이·색·사이즈·어울림을 실제 옷 가게 대화로 종합한다',
          uz: '74–75-betlardagi kiyim nomlari · kiyish fe’llari · narx · uzunlik · rang · o‘lcham · yarashishni do‘kon dialogida umumlashtirish',
          en: 'Combine the page 74–75 clothing nouns, wearing verbs, price, length, color, fit, and preference in practical store conversations',
          ru: 'Объединить лексику страниц 74–75 об одежде, способах ношения, цене, длине, цвете и размере в диалогах магазина',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        questions: [
          's3u4_052_dialog_complete',
          's3u4_053_listening',
          's3u4_054_fill_in_blank',
          's3u4_055_speaking',
          's3u4_056_sentence_builder',
          's3u4_057_listen_type',
          's3u4_058_reply_builder',
          's3u4_059_reading_quiz',
          's3u4_060_dialog_complete',
          's3u4_061_listening',
          's3u4_062_fill_in_blank',
          's3u4_063_speaking',
          's3u4_064_translate_builder',
          's3u4_065_reading_quiz',
          's3u4_066_dialog_order',
          's3u4_067_listen_fill',
          's3u4_068_cloze_passage',
        ],
      },
    ],
  },
  {
    title: {
      ko: '~것 같아요',
      uz: 'Shundayga o‘xshaydi',
      en: 'It Seems Like...',
      ru: 'Кажется, что...',
    },
    section: 3,
    unit: 4,
    order: 2,
    isActive: true,
    lessons: [
      {
        title: {
          ko: '어떻게 보이는지 말해요',
          uz: 'Qanday ko‘rinishini aytamiz',
          en: 'Say How It Seems',
          ru: 'Говорим, как это выглядит',
        },
        description: {
          ko: '크다·작다·따뜻하다·춥다 등의 상태와 가다·먹다·공부하다·듣다·살다·만들다 등의 행동을 보고 추측한다',
          uz: 'Holat va harakatlarni ko‘rib A-(으)ㄴ 것 같다 va V-는 것 같다 bilan taxmin qilish',
          en: 'Infer states and actions using A-(으)ㄴ 것 같다 and V-는 것 같다',
          ru: 'Делать предположения о состояниях и действиях через A-(으)ㄴ 것 같다 и V-는 것 같다',
        },
        category: LessonCategory.EXPRESSION,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        questions: [
          's3u4_069_fill_in_blank',
          's3u4_070_listening',
          's3u4_071_sentence_builder',
          's3u4_072_fill_in_blank',
          's3u4_073_listen_type',
          's3u4_074_dialog_complete',
          's3u4_075_fill_in_blank',
          's3u4_076_speaking',
          's3u4_077_fill_in_blank',
          's3u4_078_listening',
          's3u4_079_sentence_builder',
          's3u4_080_fill_in_blank',
          's3u4_081_listen_type',
          's3u4_082_fill_in_blank',
          's3u4_083_reading_quiz',
          's3u4_084_cloze_passage',
          's3u4_085_dialog_order',
        ],
      },
      {
        title: {
          ko: '표정을 보고 추측해요',
          uz: 'Yuz ifodasiga qarab taxmin qilamiz',
          en: 'Infer from Expressions',
          ru: 'Делаем вывод по выражению лица',
        },
        description: {
          ko: '슬프다·심심하다·피곤하다·기분이 좋다·걱정이 있다를 표정과 행동으로 추측하고 77쪽 그림 자유 활동까지 연습한다',
          uz: 'Xafa · zerikkan · charchagan · yaxshi kayfiyat · xavotir holatlarini va 77-betdagi rasm topshiriqlarini mashq qilish',
          en: 'Infer sadness, boredom, tiredness, good mood, and worry, then practice the open-ended picture activity on page 77',
          ru: 'Определять грусть, скуку, усталость, хорошее настроение и беспокойство, затем выполнить открытое задание страницы 77',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        questions: [
          's3u4_086_word_matching',
          's3u4_087_listening',
          's3u4_088_dialog_complete',
          's3u4_089_fill_in_blank',
          's3u4_090_speaking',
          's3u4_091_reading_quiz',
          's3u4_092_audio_match',
          's3u4_093_fill_in_blank',
          's3u4_094_reading_quiz',
          's3u4_095_speaking',
          's3u4_096_fill_in_blank',
          's3u4_097_listening',
          's3u4_098_reply_builder',
          's3u4_099_listen_type',
          's3u4_100_reading_quiz',
          's3u4_101_dialog_order',
          's3u4_102_cloze_passage',
        ],
      },
      {
        title: {
          ko: '사람과 상황을 추측해요',
          uz: 'Odam va vaziyat haqida taxmin qilamiz',
          en: 'Infer People and Situations',
          ru: 'Предполагаем о людях и ситуациях',
        },
        description: {
          ko: '친구인 것 같다·작은 것 같다·어려운 것 같다·일이 있는 것 같다·좋아하는 것 같다·만나지 않는 것 같다·학생이 아닌 것 같다를 교재 대화로 익힌다',
          uz: '친구인 · 작은 · 어려운 · 일이 있는 · 좋아하는 · 만나지 않는 · 학생이 아닌 것 같다 shakllarini dialoglarda mashq qilish',
          en: 'Practice all page-78 dialogues covering noun, adjective, verb, negative verb, and negative noun inferences',
          ru: 'Отработать все диалоги страницы 78 с существительными, прилагательными, глаголами и отрицаниями',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        questions: [
          's3u4_103_dialog_complete',
          's3u4_104_fill_in_blank',
          's3u4_105_listening',
          's3u4_106_reply_builder',
          's3u4_107_sentence_builder',
          's3u4_108_listen_type',
          's3u4_109_fill_in_blank',
          's3u4_110_speaking',
          's3u4_111_listening',
          's3u4_112_type_answer',
          's3u4_113_dialog_order',
          's3u4_114_reading_quiz',
          's3u4_115_cloze_passage',
          's3u4_116_dialog_complete',
          's3u4_117_speaking',
          's3u4_118_listening',
          's3u4_119_cloze_passage',
        ],
      },
      {
        title: {
          ko: '왜 그렇게 생각해요?',
          uz: 'Nega shunday deb o‘ylaysiz?',
          en: 'Why Do You Think So?',
          ru: 'Почему вы так думаете?',
        },
        description: {
          ko: '줄리아 예시처럼 사람의 반복 행동과 보이는 상황을 근거로 추측을 말하고 그 이유를 설명한다',
          uz: 'Julia misolidagidek kuzatilgan va takroriy harakatni dalil qilib taxmin va sababni aytish',
          en: 'Make an inference and support it with observed behavior, following the Julia example',
          ru: 'Делать предположение и объяснять его наблюдаемым поведением по примеру Джулии',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        questions: [
          's3u4_120_reading_quiz',
          's3u4_121_speaking',
          's3u4_122_fill_in_blank',
          's3u4_123_listening',
          's3u4_124_dialog_complete',
          's3u4_125_fill_in_blank',
          's3u4_126_reading_quiz',
          's3u4_127_speaking',
          's3u4_128_listening',
          's3u4_129_reply_builder',
          's3u4_130_type_answer',
          's3u4_131_dialog_complete',
          's3u4_132_listen_fill',
          's3u4_133_reading_quiz',
          's3u4_134_translate_builder',
          's3u4_135_dialog_order',
          's3u4_136_cloze_passage',
        ],
      },
    ],
  },
  {
    title: {
      ko: '두 가지를 비교해요',
      uz: 'Ikki narsani taqqoslaymiz',
      en: 'Comparing Two Things',
      ru: 'Сравниваем две вещи',
    },
    section: 3,
    unit: 4,
    order: 3,
    isActive: true,
    lessons: [
      {
        title: {
          ko: '어느 것을 더 좋아해요?',
          uz: 'Qaysi birini ko‘proq yoqtirasiz?',
          en: 'Which Do You Like More?',
          ru: 'Что вам нравится больше?',
        },
        description: {
          ko: '불고기와 비빔밥, 계절 등 두 대상을 N보다와 더를 사용해 비교하며 선호를 말한다',
          uz: 'Bulgogi · bibimbap · fasllar kabi ikki narsani N보다 va 더 bilan taqqoslab afzallikni aytish',
          en: 'Express preferences by comparing foods, seasons, and other pairs with N보다 and 더',
          ru: 'Выражать предпочтения, сравнивая еду, времена года и другие пары через N보다 и 더',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        questions: [
          's3u4_137_dialog_complete',
          's3u4_138_listening',
          's3u4_139_fill_in_blank',
          's3u4_140_speaking',
          's3u4_141_sentence_builder',
          's3u4_142_listen_type',
          's3u4_143_reply_builder',
          's3u4_144_reading_quiz',
          's3u4_145_fill_in_blank',
          's3u4_146_listening',
          's3u4_147_translate_builder',
          's3u4_148_dialog_complete',
          's3u4_149_type_answer',
          's3u4_150_dialog_order',
          's3u4_151_listen_fill',
          's3u4_152_reading_quiz',
          's3u4_153_cloze_passage',
        ],
      },
      {
        title: {
          ko: '어느 것이 더 커요?',
          uz: 'Qaysi biri kattaroq?',
          en: 'Which Is Greater?',
          ru: 'Что больше?',
        },
        description: {
          ko: '사과와 배의 가격, 지리산과 한라산의 높이처럼 수치로 확인할 수 있는 차이를 비교한다',
          uz: 'Olma va nok narxi, Jirisan va Hallasan balandligi kabi aniq farqlarni taqqoslash',
          en: 'Compare objective differences such as fruit prices and mountain heights',
          ru: 'Сравнивать объективные различия, например цены фруктов и высоту гор',
        },
        category: LessonCategory.EXPRESSION,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        questions: [
          's3u4_154_word_matching',
          's3u4_155_listening',
          's3u4_156_fill_in_blank',
          's3u4_157_sentence_builder',
          's3u4_158_dialog_complete',
          's3u4_159_listen_type',
          's3u4_160_reading_quiz',
          's3u4_161_fill_in_blank',
          's3u4_162_speaking',
          's3u4_163_reply_builder',
          's3u4_164_listening',
          's3u4_165_type_answer',
          's3u4_166_reading_quiz',
          's3u4_167_translate_builder',
          's3u4_168_dialog_complete',
          's3u4_169_listen_fill',
          's3u4_170_dialog_order',
        ],
      },
      {
        title: {
          ko: '뭐가 더 잘 어울려요?',
          uz: 'Qaysi biri yaxshiroq yarashadi?',
          en: 'Which Suits Better?',
          ru: 'Что подходит больше?',
        },
        description: {
          ko: '농구와 수영의 실력, 옷의 어울림, 구두와 운동화의 편안함, 계절 선호처럼 다양한 기준으로 비교한다',
          uz: 'Sport mahorati · kiyimning yarashishi · oyoq kiyim qulayligi · fasl afzalligini taqqoslash',
          en: 'Compare sports ability, how clothes suit someone, footwear comfort, and seasonal preference',
          ru: 'Сравнивать спортивные навыки, одежду, удобство обуви и предпочтения сезонов',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        questions: [
          's3u4_171_listening',
          's3u4_172_fill_in_blank',
          's3u4_173_reply_builder',
          's3u4_174_speaking',
          's3u4_175_dialog_complete',
          's3u4_176_listening',
          's3u4_177_fill_in_blank',
          's3u4_178_listen_type',
          's3u4_179_sentence_builder',
          's3u4_180_reading_quiz',
          's3u4_181_dialog_complete',
          's3u4_182_speaking',
          's3u4_183_listening',
          's3u4_184_translate_builder',
          's3u4_185_reading_quiz',
          's3u4_186_dialog_order',
          's3u4_187_listen_fill',
        ],
      },
      {
        title: {
          ko: '두 가지를 비교해서 말해요',
          uz: 'Ikki narsani taqqoslab gapiramiz',
          en: 'Talk by Comparing Two Things',
          ru: 'Говорим, сравнивая два объекта',
        },
        description: {
          ko: '79쪽의 음식·운동·옷·가격·산·신발·계절 비교를 실제 대화와 듣기에서 종합적으로 사용한다',
          uz: '79-betdagi taom · sport · kiyim · narx · tog‘ · oyoq kiyim · fasl taqqoslashlarini dialoglarda umumlashtirish',
          en: 'Integrate every comparison from page 79 in practical conversations and listening',
          ru: 'Обобщить все сравнения страницы 79 в практических диалогах и аудировании',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        questions: [
          's3u4_188_dialog_complete',
          's3u4_189_listening',
          's3u4_190_fill_in_blank',
          's3u4_191_speaking',
          's3u4_192_sentence_builder',
          's3u4_193_listen_type',
          's3u4_194_reading_quiz',
          's3u4_195_reply_builder',
          's3u4_196_listening',
          's3u4_197_fill_in_blank',
          's3u4_198_speaking',
          's3u4_199_translate_builder',
          's3u4_200_reading_quiz',
          's3u4_201_dialog_complete',
          's3u4_202_listen_fill',
          's3u4_203_dialog_order',
          's3u4_204_cloze_passage',
        ],
      },
    ],
  },
  {
    title: {
      ko: '이랬으면 좋겠어요',
      uz: 'Shunday bo‘lsa edi',
      en: 'I Hope It Will Be...',
      ru: 'Хотелось бы, чтобы...',
    },
    section: 3,
    unit: 4,
    order: 4,
    isActive: true,
    lessons: [
      {
        title: {
          ko: '바라는 일을 말해요',
          uz: 'Istagan narsamizni aytamiz',
          en: 'Talk About Your Wishes',
          ru: 'Говорим о желаниях',
        },
        description: {
          ko: '교재 80쪽의 세계 여행·1등·돈·한국말·날씨·시험·춤·가수에 대한 바람을 모두 연습한다',
          uz: '80-betdagi sayohat · birinchi o‘rin · pul · koreys tili · ob-havo · imtihon · raqs · qo‘shiqchi haqidagi barcha istaklarni mashq qilish',
          en: 'Practice every page-80 wish about world travel, first place, money, Korean, weather, exams, dancing, and becoming a singer',
          ru: 'Отработать все пожелания страницы 80: путешествие, первое место, деньги, корейский, погоду, экзамен, танцы и профессию певца',
        },
        category: LessonCategory.EXPRESSION,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        questions: [
          's3u4_205_fill_in_blank',
          's3u4_206_listening',
          's3u4_207_sentence_builder',
          's3u4_208_speaking',
          's3u4_209_fill_in_blank',
          's3u4_210_listen_type',
          's3u4_211_reply_builder',
          's3u4_212_listening',
          's3u4_213_fill_in_blank',
          's3u4_214_dialog_complete',
          's3u4_215_sentence_builder',
          's3u4_216_speaking',
          's3u4_217_fill_in_blank',
          's3u4_218_listening',
          's3u4_219_reply_builder',
          's3u4_220_listen_type',
          's3u4_221_cloze_passage',
        ],
      },
      {
        title: {
          ko: '어떤 것이었으면 좋겠어요?',
          uz: 'Qanday bo‘lishini xohlaysiz?',
          en: 'What Would You Like?',
          ru: 'Чего бы вам хотелось?',
        },
        description: {
          ko: '교재 81쪽의 집·선물·영화·일·만나고 싶은 사람 질문을 사용해 구체적인 바람을 말한다',
          uz: '81-betdagi uy · sovg‘a · film · ish · uchrashmoqchi odam savollari orqali aniq istaklarni aytish',
          en: 'Use the page-81 prompts about a house, gift, movie, job, and person you want to meet',
          ru: 'Отработать вопросы страницы 81 о доме, подарке, фильме, работе и человеке, которого хочется встретить',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        questions: [
          's3u4_222_dialog_complete',
          's3u4_223_listening',
          's3u4_224_fill_in_blank',
          's3u4_225_reply_builder',
          's3u4_226_speaking',
          's3u4_227_listening',
          's3u4_228_sentence_builder',
          's3u4_229_dialog_complete',
          's3u4_230_fill_in_blank',
          's3u4_231_listen_type',
          's3u4_232_reply_builder',
          's3u4_233_speaking',
          's3u4_234_reading_quiz',
          's3u4_235_listening',
          's3u4_236_translate_builder',
          's3u4_237_dialog_order',
          's3u4_238_cloze_passage',
        ],
      },
      {
        title: {
          ko: '상황에 맞게 바람을 말해요',
          uz: 'Vaziyatga mos istak aytamiz',
          en: 'Express Wishes for the Situation',
          ru: 'Выражаем пожелания по ситуации',
        },
        description: {
          ko: '시험·날씨·한국어 능력·직업·집·선물 등의 상황을 보고 자연스러운 바람을 선택하고 직접 말한다',
          uz: 'Imtihon · ob-havo · koreys tili · kasb · uy · sovg‘a vaziyatlarida tabiiy istaklarni tanlash va aytish',
          en: 'Choose and produce natural wishes for situations involving exams, weather, Korean ability, careers, housing, and gifts',
          ru: 'Выбирать и формулировать естественные пожелания об экзаменах, погоде, корейском, работе, жилье и подарках',
        },
        category: LessonCategory.EXPRESSION,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        questions: [
          's3u4_239_reading_quiz',
          's3u4_240_listening',
          's3u4_241_fill_in_blank',
          's3u4_242_reply_builder',
          's3u4_243_speaking',
          's3u4_244_reading_quiz',
          's3u4_245_listen_fill',
          's3u4_246_dialog_complete',
          's3u4_247_sentence_builder',
          's3u4_248_listening',
          's3u4_249_fill_in_blank',
          's3u4_250_speaking',
          's3u4_251_reading_quiz',
          's3u4_252_reply_builder',
          's3u4_253_listen_type',
          's3u4_254_dialog_order',
          's3u4_255_cloze_passage',
        ],
      },
      {
        title: {
          ko: '친구에게 바라는 것을 말해요',
          uz: 'Do‘stga bo‘lgan istakni aytamiz',
          en: 'Tell a Friend What You Hope For',
          ru: 'Говорим другу о своих пожеланиях',
        },
        description: {
          ko: '교재 81쪽 자유쓰기 활동을 바탕으로 친구의 행동에 대한 바람을 부드럽게 표현하고 Node 4 전체를 복습한다',
          uz: '81-betdagi erkin yozuv asosida do‘st harakati haqidagi istaklarni yumshoq ifodalash va Node 4 ni takrorlash',
          en: 'Build on the page-81 free-writing task to express wishes about a friend’s behavior politely and review Node 4',
          ru: 'На основе свободного письма страницы 81 мягко выражать пожелания о поведении друга и повторить Node 4',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        questions: [
          's3u4_256_reading_quiz',
          's3u4_257_fill_in_blank',
          's3u4_258_listening',
          's3u4_259_reply_builder',
          's3u4_260_speaking',
          's3u4_261_reading_quiz',
          's3u4_262_fill_in_blank',
          's3u4_263_listen_type',
          's3u4_264_dialog_complete',
          's3u4_265_speaking',
          's3u4_266_reading_quiz',
          's3u4_267_reply_builder',
          's3u4_268_listening',
          's3u4_269_translate_builder',
          's3u4_270_dialog_order',
          's3u4_271_listen_fill',
          's3u4_272_cloze_passage',
        ],
      },
    ],
  },
  {
    title: {
      ko: '4과 문형 연습',
      uz: '4-dars qoliplarini mashq qilamiz',
      en: 'Lesson 4 Pattern Practice',
      ru: 'Практика конструкций урока 4',
    },
    section: 3,
    unit: 4,
    order: 5,
    isActive: true,
    lessons: [
      {
        title: {
          ko: '어떤 것 같아요?',
          uz: 'Qanday ko‘rinadi?',
          en: 'What Does It Seem Like?',
          ru: 'Как вам кажется?',
        },
        description: {
          ko: '행동·상태·장소를 추측하고 사람·물건·날짜·국적·층수를 N인 것 같아요로 말한다',
          uz: 'Harakat · holat · joyni taxmin qilish va odam · buyum · sana · millat · qavatni N인 것 같아요 bilan aytish',
          en: 'Infer actions, states, and locations, then use N인 것 같아요 for people, objects, dates, nationality, and floors',
          ru: 'Предполагать действия, состояния и место, а также использовать N인 것 같아요 для людей, вещей, дат, национальности и этажей',
        },
        category: LessonCategory.EXPRESSION,
        level: QuestionLevel.LEVEL_3,
        order: 1,
        questions: [
          's3u4_273_dialog_complete',
          's3u4_274_listening',
          's3u4_275_fill_in_blank',
          's3u4_276_speaking',
          's3u4_277_sentence_builder',
          's3u4_278_listening',
          's3u4_279_reply_builder',
          's3u4_280_fill_in_blank',
          's3u4_281_listen_type',
          's3u4_282_dialog_complete',
          's3u4_283_reading_quiz',
          's3u4_284_fill_in_blank',
          's3u4_285_speaking',
          's3u4_286_listening',
          's3u4_287_sentence_builder',
          's3u4_288_dialog_order',
          's3u4_289_cloze_passage',
        ],
      },
      {
        title: {
          ko: '어느 것이 더 그래요?',
          uz: 'Qaysi biri ko‘proq?',
          en: 'Which One Is More?',
          ru: 'Что больше?',
        },
        description: {
          ko: '지하철과 버스, 오늘과 어제, 올해와 작년, 쓰기와 읽기, 한라산과 설악산을 N보다 더로 비교한다',
          uz: 'Metro va avtobus · bugun va kecha · bu yil va o‘tgan yil · yozish va o‘qish · Hallasan va Seoraksanni N보다 더 bilan taqqoslash',
          en: 'Compare subway and bus, today and yesterday, this year and last year, writing and reading, and Hallasan and Seoraksan',
          ru: 'Сравнивать метро и автобус, сегодня и вчера, этот и прошлый год, письмо и чтение, Халласан и Сораксан',
        },
        category: LessonCategory.EXPRESSION,
        level: QuestionLevel.LEVEL_3,
        order: 2,
        questions: [
          's3u4_290_dialog_complete',
          's3u4_291_listening',
          's3u4_292_fill_in_blank',
          's3u4_293_speaking',
          's3u4_294_sentence_builder',
          's3u4_295_listening',
          's3u4_296_reply_builder',
          's3u4_297_reading_quiz',
          's3u4_298_fill_in_blank',
          's3u4_299_listen_type',
          's3u4_300_dialog_complete',
          's3u4_301_listening',
          's3u4_302_translate_builder',
          's3u4_303_speaking',
          's3u4_304_reading_quiz',
          's3u4_305_listen_fill',
          's3u4_306_cloze_passage',
        ],
      },
      {
        title: {
          ko: '이랬으면 좋겠어요',
          uz: 'Shunday bo‘lsa edi',
          en: 'I Wish It Were...',
          ru: 'Хотелось бы, чтобы...',
        },
        description: {
          ko: '한국 친구·한국말 실력·돈·숙제·집의 거리에 대한 바람을 -았으면/었으면 좋겠어요로 말한다',
          uz: 'Koreys do‘st · koreys tili · pul · uy vazifasi · uy masofasi haqidagi istaklarni -았으면/었으면 좋겠어요 bilan aytish',
          en: 'Express wishes about Korean friends, Korean ability, money, homework, and distance from home',
          ru: 'Выражать пожелания о корейском друге, знании корейского, деньгах, домашнем задании и расстоянии до дома',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_3,
        order: 3,
        questions: [
          's3u4_307_dialog_complete',
          's3u4_308_listening',
          's3u4_309_fill_in_blank',
          's3u4_310_speaking',
          's3u4_311_sentence_builder',
          's3u4_312_listening',
          's3u4_313_reply_builder',
          's3u4_314_fill_in_blank',
          's3u4_315_listen_type',
          's3u4_316_dialog_complete',
          's3u4_317_reading_quiz',
          's3u4_318_speaking',
          's3u4_319_listening',
          's3u4_320_translate_builder',
          's3u4_321_reply_builder',
          's3u4_322_dialog_order',
          's3u4_323_cloze_passage',
        ],
      },
      {
        title: {
          ko: '4과 문형을 모두 써요',
          uz: '4-dars qoliplarini birga ishlatamiz',
          en: 'Use All Lesson 4 Patterns',
          ru: 'Используем все конструкции урока 4',
        },
        description: {
          ko: '82~83쪽 네 연습의 추측·명사 추측·비교·바람 표현을 듣기·대화·말하기에서 종합한다',
          uz: '82–83-betlardagi taxmin · ot bilan taxmin · taqqoslash · istak qoliplarini birgalikda mashq qilish',
          en: 'Integrate the four page-82–83 patterns: inference, noun inference, comparison, and wishes',
          ru: 'Обобщить четыре конструкции страниц 82–83: предположение, именное предположение, сравнение и пожелание',
        },
        category: LessonCategory.CONVERSATION,
        level: QuestionLevel.LEVEL_3,
        order: 4,
        questions: [
          's3u4_324_reading_quiz',
          's3u4_325_listening',
          's3u4_326_fill_in_blank',
          's3u4_327_speaking',
          's3u4_328_dialog_complete',
          's3u4_329_listening',
          's3u4_330_sentence_builder',
          's3u4_331_reply_builder',
          's3u4_332_reading_quiz',
          's3u4_333_listen_type',
          's3u4_334_fill_in_blank',
          's3u4_335_dialog_complete',
          's3u4_336_listening',
          's3u4_337_translate_builder',
          's3u4_338_speaking',
          's3u4_339_dialog_order',
          's3u4_340_cloze_passage',
        ],
      },
    ],
  },
];
