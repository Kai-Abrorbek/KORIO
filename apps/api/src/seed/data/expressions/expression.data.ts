import { ExpressionSpeechLevel } from '../../../expressions/schemas/expression.schema';
import { QuestionLevel, QuestionType } from '../../../lessons/schemas/question.schema';
import type {
  ExpressionPackSeed,
  ExpressionSeedEntry,
} from '../../expression-seed.types';

/**
 * 확장용 기준 예시다. 현재는 상황 팩 1개, 표현 1개만 실제 DB에 넣는다.
 * 새 데이터를 만들 때 pack code, expression code, question code를 바꾸지 말고
 * 각각 영구 식별자로 관리한다.
 */
export const EXPRESSION_PACK_SEEDS = [
  {
    code: 'restaurant',
    title: {
      ko: '식당에서 주문하기',
      uz: 'Restoranda buyurtma berish',
      en: 'Ordering at a restaurant',
      ru: 'Заказ в ресторане',
    },
    description: {
      ko: '메뉴를 묻고 원하는 음식을 주문해요.',
      uz: "Menyu haqida so'rang va taom buyurtma qiling.",
      en: 'Ask about the menu and order what you want.',
      ru: 'Спросите о меню и закажите нужное блюдо.',
    },
    media: {
      emoji: '🍜',
      imageUrl: '',
      imageAlt: {
        ko: '식당의 음식 그릇',
        uz: 'Restorandagi taom kosasi',
        en: 'A bowl of restaurant food',
        ru: 'Миска ресторанного блюда',
      },
    },
    order: 1,
    isActive: true,
  },
] satisfies readonly ExpressionPackSeed[];

export const EXPRESSION_SEEDS = [
  {
    code: 'restaurant-menu-please',
    packCode: 'restaurant',
    korean: '메뉴판 좀 주세요',
    meaning: {
      ko: '메뉴판을 정중하게 부탁하는 표현',
      uz: 'Menyuni bering, iltimos',
      en: 'Could I have the menu, please?',
      ru: 'Дайте, пожалуйста, меню',
    },
    context: {
      ko: '식당에 앉은 뒤 메뉴판이 보이지 않을 때 직원에게 말해요.',
      uz: "Restoranga o'tirgandan keyin menyu bo'lmasa xodimga ayting.",
      en: 'Say it to a staff member when there is no menu at your table.',
      ru: 'Скажите это сотруднику, если на столе нет меню.',
    },
    usageNote: {
      ko: '`좀`을 넣으면 부탁이 조금 더 부드럽게 들려요.',
      uz: '`좀` sozi iltimosni yumshoqroq qiladi.',
      en: '`좀` makes the request sound a little softer.',
      ru: 'Слово `좀` делает просьбу немного мягче.',
    },
    speechLevel: ExpressionSpeechLevel.POLITE,
    pronunciation: {
      romanization: 'menyupan jom juseyo',
      ttsText: '메뉴판 좀 주세요',
      audioUrl: '',
    },
    media: {
      emoji: '📋',
      imageUrl: '',
      imageAlt: {
        ko: '식당 메뉴판',
        uz: 'Restoran menyusi',
        en: 'Restaurant menu',
        ru: 'Меню ресторана',
      },
    },
    order: 1,
    placements: [{ section: 1, unit: 1, order: 1, isCore: true }],
    tags: ['restaurant', 'request', 'menu'],
    difficulty: 1,
    isActive: true,
    practiceQuestions: [
      {
        code: 'expr_restaurant_menu_please_fill',
        type: QuestionType.FILL_IN_BLANK,
        level: QuestionLevel.LEVEL_1,
        instruction: {
          ko: '빈칸에 알맞은 표현을 고르세요.',
          uz: "Bo'sh joyga mos iborani tanlang.",
          en: 'Choose the right expression for the blank.',
          ru: 'Выберите подходящее выражение для пропуска.',
        },
        sentenceTemplate: '___ 좀 주세요.',
        blankAnswers: ['메뉴판'],
        options: ['계산서', '물', '메뉴판', '김치'],
        answer: '메뉴판',
        answerTranslation: {
          ko: '메뉴판 좀 주세요.',
          uz: 'Menyuni bering, iltimos.',
          en: 'Could I have the menu, please?',
          ru: 'Дайте, пожалуйста, меню.',
        },
        hint: {
          ko: '음식을 고르기 전에 보는 것을 떠올려 보세요.',
          uz: "Taom tanlashdan oldin nimaga qarashingizni o'ylang.",
          en: 'Think about what you look at before choosing food.',
          ru: 'Вспомните, на что смотрят перед выбором блюда.',
        },
        explanation: {
          ko: '`메뉴판`은 주문할 음식과 가격이 적힌 판이에요.',
          uz: '`메뉴판` — taomlar va narxlar yozilgan menyu.',
          en: '`메뉴판` is the menu that lists dishes and prices.',
          ru: '`메뉴판` — это меню со списком блюд и цен.',
        },
        audioText: '메뉴판 좀 주세요.',
        difficulty: 1,
        tags: ['expression', 'restaurant', 'fill-in-blank'],
        xpReward: 10,
        isActive: true,
      },
      {
        code: 'expr_restaurant_menu_please_translate',
        type: QuestionType.TRANSLATE_TYPE,
        level: QuestionLevel.LEVEL_1,
        instruction: {
          ko: '식당에서 메뉴판을 정중하게 부탁하는 말',
          uz: 'Menyuni bering, iltimos.',
          en: 'Could I have the menu, please?',
          ru: 'Дайте, пожалуйста, меню.',
        },
        answer: '메뉴판 좀 주세요',
        acceptedAnswers: ['메뉴판 좀 주세요.'],
        answerTranslation: {
          ko: '메뉴판 좀 주세요.',
          uz: 'Menyuni bering, iltimos.',
          en: 'Could I have the menu, please?',
          ru: 'Дайте, пожалуйста, меню.',
        },
        hint: {
          ko: '`메뉴판` + `좀` + `주세요` 순서로 말해요.',
          uz: '`메뉴판` + `좀` + `주세요` tartibidan foydalaning.',
          en: 'Use `메뉴판` + `좀` + `주세요` in that order.',
          ru: 'Используйте порядок: `메뉴판` + `좀` + `주세요`.',
        },
        explanation: {
          ko: '`주세요`를 사용하면 직원에게 정중하게 부탁할 수 있어요.',
          uz: '`주세요` xodimdan muloyim iltimos qilish uchun ishlatiladi.',
          en: '`주세요` makes this a polite request to the staff.',
          ru: '`주세요` превращает фразу в вежливую просьбу сотруднику.',
        },
        grading: {
          mode: 'targetExpression',
          expectedMeaning:
            'The speaker politely asks a restaurant staff member to give them a menu.',
          targetExpressions: ['메뉴판', '주세요'],
          requiredRegister: '해요체',
          acceptedAnswers: [],
          notes: [
            'A request for a different restaurant item does not preserve the target meaning.',
          ],
          tolerance: {
            punctuation: true,
            spacing: true,
            minorTypos: true,
          },
        },
        difficulty: 2,
        tags: ['expression', 'restaurant', 'typing'],
        xpReward: 15,
        isActive: true,
      },
    ],
  },
] satisfies readonly ExpressionSeedEntry[];
