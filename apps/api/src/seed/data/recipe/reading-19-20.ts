import {
  TopikQuestionType,
  TopikSection,
} from '../../../topik/schemas/topik-content.schema';
import { RecipeSeed, t4 } from './recipe-seed.types';
import {
  recipeQuestion as q,
  recipeRanking as ranking,
} from './reading-recipe-helpers';

const blank = (
  code: string,
  number: number,
  prompt: string,
  choices: string[],
  correctIndex: number,
  source: string,
) =>
  q(
    code,
    number,
    TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt,
    choices,
    correctIndex,
    source,
  );

const examples = [
  blank(
    'recipe-reading-19-20-example-01',
    19,
    '시각 장애인의 안내견은 주인과 있을 때 행인에게 관심을 두지 않는다. ___ 안내견이 주인을 남겨 두고 행인에게 다가간다면 이는 주인이 위험에 처해 있다는 뜻이다. 안내견은 주인에게 문제가 발생하면 곧장 주변 사람에게 달려가 도움을 요청하도록 훈련을 받기 때문이다.',
    ['비록', '물론', '만약', '과연'],
    2,
    'TOPIK II 60회 읽기 19번 / 합격 레시피 92쪽',
  ),
  q(
    'recipe-reading-19-20-example-02',
    20,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    '시각 장애인의 안내견은 주인과 있을 때 행인에게 관심을 두지 않는다. 만약 안내견이 주인을 남겨 두고 행인에게 다가간다면 이는 주인이 위험에 처해 있다는 뜻이다. 안내견은 주인에게 문제가 발생하면 곧장 주변 사람에게 달려가 도움을 요청하도록 훈련을 받는다.',
    [
      '안내견이 주인 곁을 떠나는 경우는 없다.',
      '안내견은 문제가 생기면 구조 센터로 달려간다.',
      '안내견이 다가오는 것은 위급한 상황이 생겼다는 뜻이다.',
      '안내견은 항상 주변의 사람들에게 관심을 갖도록 훈련을 받는다.',
    ],
    2,
    'TOPIK II 60회 읽기 20번 / 합격 레시피 93쪽',
  ),
  blank(
    'recipe-reading-19-20-example-03',
    21,
    '인터넷으로 회원 가입을 할 때 설정하는 비밀번호는 초기에는 숫자 네 개면 충분했다. 하지만 최근에는 보안 강화를 위해 특수 문자까지 넣어 만들어야 한다. ___ 비밀번호 변경도 주기적으로 해야 한다. 이 때문에 가입자는 번거로운 것은 물론이고 자주 바뀌는 비밀번호를 기억하지 못해 스트레스를 받는다.',
    ['그러면', '게다가', '반면에', '이처럼'],
    1,
    'TOPIK II 52회 읽기 19번 / 합격 레시피 93쪽',
  ),
  q(
    'recipe-reading-19-20-example-04',
    22,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    '인터넷 비밀번호는 초기에는 숫자 네 개면 충분했지만 최근에는 보안 강화를 위해 특수 문자까지 넣어야 하고 주기적으로 변경해야 한다. 가입자는 번거롭고 자주 바뀌는 비밀번호를 기억하지 못해 스트레스를 받는다. 개인 정보 보호를 가입자에게만 요구하지 말고 기업도 보안 기술 개발에 투자해야 한다.',
    [
      '가입자는 비밀번호 변경으로 스트레스를 받는다.',
      '초기의 비밀번호는 숫자 네 개로는 만들 수 없었다.',
      '가입자는 기업에 비밀번호 설정을 까다롭게 요구한다.',
      '비밀번호 설정 시 숫자와 문자 중 하나를 선택해야 한다.',
    ],
    0,
    'TOPIK II 52회 읽기 20번 / 합격 레시피 93쪽',
  ),
];

const studyPassage =
  '음악을 들으면서 공부를 한다고 해서 학습 능률이 떨어지는 것은 아니다. 사람에 따라 다를 수 있기 때문이다. 음악을 들으면서 공부를 하는 것이 그냥 공부하는 것보다 더 효과적인 경우가 있다. 음악을 듣다 보면 공부가 지루한 줄을 모르게 되고 음악에 맞춰 몸이나 다리를 흔들면 운동도 된다. ___ 졸음을 쫓는 데도 아주 좋은 방법이 된다.';
const baseballPassage =
  '야구 경기를 보면 껌을 씹고 있는 선수들의 모습을 자주 볼 수 있다. 야구 선수들이 껌을 씹는 이유는 경기에 대한 긴장감을 줄이기 위해서이다. 껌을 씹는 것 말고도 크게 소리를 지르거나 눈을 감고 조용히 노래를 따라 하는 것도 마찬가지의 행동이다. ___ 숨을 천천히 쉬는 것도 긴장을 푸는 좋은 방법 중의 하나이다.';

const practice = [
  blank(
    'recipe-reading-19-20-practice-01',
    1,
    studyPassage,
    ['게다가', '오히려', '마침내', '도대체'],
    0,
    '합격 레시피 읽기 19~20번 예상문제 1 / 94쪽',
  ),
  q(
    'recipe-reading-19-20-practice-02',
    2,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    studyPassage.replace('___', '게다가'),
    [
      '음악을 너무 오래 들으면 지루해진다.',
      '음악에 신경을 쓰면 공부를 할 수 없다.',
      '음악에 맞춰 몸을 흔들면 능률이 떨어진다.',
      '음악을 들으면서 공부를 하면 효과적일 수 있다.',
    ],
    3,
    '합격 레시피 읽기 19~20번 예상문제 2 / 94쪽',
  ),
  blank(
    'recipe-reading-19-20-practice-03',
    3,
    baseballPassage,
    ['게다가', '오히려', '그러면', '그리고'],
    3,
    '합격 레시피 읽기 19~20번 예상문제 3 / 95쪽',
  ),
  q(
    'recipe-reading-19-20-practice-04',
    4,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    baseballPassage.replace('___', '그리고'),
    [
      '긴장을 줄이려면 계속 떠들어야 한다.',
      '야구 경기 중에는 껌을 씹으면 안 된다.',
      '긴장을 풀기 위해서 껌을 씹는 경우가 있다.',
      '야구 선수들은 경기력을 위해 숨을 빨리 쉰다.',
    ],
    2,
    '합격 레시피 읽기 19~20번 예상문제 4 / 95쪽',
  ),
];

export const RECIPE_READING_19_20: RecipeSeed = {
  groupCode: 'reading-19-20',
  section: TopikSection.READING,
  label: t4('읽기 19~20번', "O'qish 19–20", 'Reading 19–20', 'Чтение 19–20'),
  title: t4(
    '설명문: 어휘와 내용 일치',
    "Izohli matn: so'z va mazmun",
    'Expository text: word and detail',
    'Пояснительный текст: слово и содержание',
  ),
  intro: t4(
    '하나의 설명문으로 접속사·부사와 세부 내용 일치를 함께 풉니다.',
    "Bitta matnda bog'lovchi/ravish va mazmun mosligini birga yechamiz.",
    'Use one passage to solve both connective/adverb and detail questions.',
    'По одному тексту решаем связку/наречие и соответствие деталей.',
  ),
  targetLevel: 3,
  order: 7,
  goldenRecipe: [
    t4(
      '선택지보다 지문을 먼저 읽습니다.',
      "Variantlardan oldin matnni o'qing.",
      'Read the passage before the choices.',
      'Прочитайте текст до вариантов.',
    ),
    t4(
      '출제 가능성이 높은 접속사와 부사의 기능을 미리 익힙니다.',
      "Ko'p uchraydigan bog'lovchi va ravish vazifalarini o'rganing.",
      'Learn the functions of frequent connectives and adverbs.',
      'Выучите функции частых связок и наречий.',
    ),
    t4(
      '내용 일치는 누가·언제·어디서·무엇을·어떻게·왜 중 바뀐 정보를 찾습니다.',
      "Kim, qachon, qayerda, nima, qanday yoki nega o'zgarganini toping.",
      'Find which of who, when, where, what, how or why was changed.',
      'Найдите, что изменено: кто, когда, где, что, как или почему.',
    ),
  ],
  grammarSections: [
    {
      key: 'expository-topics',
      title: t4(
        '설명문 출제 영역',
        'Izohli matn mavzulari',
        'Expository passage areas',
        'Темы пояснительных текстов',
      ),
      entries: ranking([
        ['최신 화제', '최근 한국 사회에서 화제가 되는 정보'],
        ['상식', '일상에서 알아 둘 만한 지식'],
        ['기술', '생활과 사회를 바꾸는 기술'],
        ['인간 심리', '행동과 감정의 원리'],
        ['교육', '학습과 교육에 관한 정보'],
        ['과학', '과학 현상과 원리'],
      ]),
      tips: [],
    },
  ],
  examples,
  practice,
  sourceReference: '합격 레시피 PDF 92~95쪽',
};
