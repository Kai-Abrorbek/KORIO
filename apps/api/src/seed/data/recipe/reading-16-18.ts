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
    'recipe-reading-16-18-example-01',
    16,
    '원래 악수는 상대를 안심시키기 위한 행동이었다. 중세 시대의 기사들은 칼과 같은 무기를 가지고 다니다가 적과 싸울 때 꺼내 들었다. 하지만 ___ 때에는 악수를 하면서 손에 무기가 없음을 보여 주었다. 이렇게 안전을 확인시켜 주기 위한 행동이 오늘날에는 반가움과 존중을 표시하는 인사법이 되었다.',
    [
      '싸울 생각이 없을',
      '상대의 도움을 받았을',
      '자신의 잘못을 사과할',
      '무기를 새로 구해야 할',
    ],
    0,
    'TOPIK II 60회 읽기 16번 / 합격 레시피 110쪽',
  ),
  blank(
    'recipe-reading-16-18-example-02',
    17,
    '특별한 사건 없이 주인공의 단순하고 반복적인 일상을 다룬 한 영화가 인기를 끌고 있다. 주인공이 하루하루를 평범하게 보낼 뿐 별다른 일을 하지 않는데도 관객들은 영화에 빠져든다. 관객들은 그동안 잊고 지냈던 일상의 기쁨을 새삼 깨닫는 것이다. 그리고 행복은 크고 거창한 꿈에만 있는 것이 아니라 ___ 일에서도 찾을 수 있음을 발견한다.',
    [
      '스스로 인정하지 않는',
      '현실 속의 작고 소소한',
      '평소 자주 하지 못하는',
      '일상에서 하기 쉽지 않은',
    ],
    1,
    'TOPIK II 60회 읽기 17번 / 합격 레시피 110쪽',
  ),
  blank(
    'recipe-reading-16-18-example-03',
    18,
    '의심과 믿음을 색깔로 비유한다면 의심은 검은색과 같고 믿음은 하얀색과 같다. 아무리 흰색 물감을 많이 넣어도 검은색은 하얀색이 되지 않는다. 하지만 흰색 물감은 검은색 물감 한 방울만으로도 금방 회색으로 변한다. 이는 사람 사이에서도 마찬가지이다. 한 번 의심하게 되면 ___.',
    [
      '자신감이 줄어든다',
      '고민거리가 많아진다',
      '문제점 파악이 힘들다',
      '관계를 되돌리기 어렵다',
    ],
    3,
    'TOPIK II 37회 읽기 16번 / 합격 레시피 111쪽',
  ),
  blank(
    'recipe-reading-16-18-example-04',
    19,
    '한 가전 업체에서 옷을 태우지 않는 다리미를 내놓았다. 다림질하다 손을 떼면 다리미 밑판 앞뒤에서 다리가 튀어나와 옷과 다리미 사이에 간격이 생기고, 다시 잡으면 다리가 들어간다. 별것 아닌 듯한 이 다리미에 시장의 반응은 뜨거웠다. 많은 사람들이 고민하던 ___ 때문이다.',
    [
      '가격을 저렴한 수준으로 낮추었기',
      '모양을 적절한 방법으로 바꾸었기',
      '내용을 합리적인 방식으로 설명했기',
      '문제를 새로운 아이디어로 해결했기',
    ],
    3,
    'TOPIK II 47회 읽기 18번 / 합격 레시피 112쪽',
  ),
];

const practice = [
  blank(
    'recipe-reading-16-18-practice-01',
    1,
    '달은 예로부터 사람들의 관심 대상이었다. 예를 들어 동양 사람들은 달 속에 토끼가 살고 있다고 생각했고 서양 사람들은 여신이 살고 있다고 생각했다. 달 표면의 어두운 면을 위주로 보면 토끼의 모습을 볼 수 있고 ___ 여신의 모습을 볼 수 있다. 다시 말해 동일한 달을 어떻게 보느냐에 따라 생각이 달라지는 것이다.',
    [
      '달이 커지는 정도에 따라 살펴보면',
      '달의 밝은 부분을 중심으로 바라보면',
      '달을 서양 사람들의 시선에서 알아보면',
      '달이 뜨는 시간과 지는 시간에 지켜보면',
    ],
    1,
    '합격 레시피 읽기 16~18번 예상문제 1 / 113쪽',
  ),
  blank(
    'recipe-reading-16-18-practice-02',
    2,
    '직장인들은 직장에서 일하면서 월급을 받기도 하지만 보람을 찾기도 한다. 이런 보람을 느끼기 위해서는 직장이 자신의 적성에 잘 맞아야 한다. 업무가 자신의 적성에 잘 맞아야 직장 생활을 즐겁게 할 수 있는 것이다. 그렇기 때문에 직장을 선택할 때는 월급이나 근무 조건도 중요하지만 무엇보다도 ___ 먼저 고려해야 한다.',
    [
      '평생 근무할 직장인지를',
      '타인의 평가가 어떤지를',
      '사회적 지위가 어떤지를',
      '자신의 적성에 맞는지를',
    ],
    3,
    '합격 레시피 읽기 16~18번 예상문제 2 / 113쪽',
  ),
  blank(
    'recipe-reading-16-18-practice-03',
    3,
    '흔히 우리의 성격은 태어날 때부터 선천적으로 결정된다고 생각하는 사람이 많다. 그러나 반드시 그런 것은 아니다. 대부분의 학자들은 성격이 선천적으로 타고나는 것과 ___ 복합적으로 작용하여 형성되는 것이라고 말한다. 다시 말해 성격은 유전과 환경의 영향으로 형성된다는 것이다.',
    [
      '어릴 때 받은 사랑이',
      '태어날 때 느낀 감정이',
      '성장하면서 영향을 주는 사람이',
      '자라나는 과정에서 겪는 경험이',
    ],
    3,
    '합격 레시피 읽기 16~18번 예상문제 3 / 114쪽',
  ),
  blank(
    'recipe-reading-16-18-practice-04',
    4,
    '나무가 잘 자라게 하려면 때에 맞춰 가지를 잘라 주어야 한다. 잘라 주지 않으면 영양분이 골고루 공급되지 않고 이상하게 자라기 때문이다. 사람도 이와 마찬가지다. 어렸을 때 잘못을 했을 경우 부모가 ___ 그 아이는 제멋대로 자라날 것이다. 또 어른이 되어서도 예의 없는 사람이 될 가능성이 높다.',
    [
      '사랑을 주지 않는다면',
      '반성을 하지 않는다면',
      '자식을 야단치지 않는다면',
      '책임을 지려고 하지 않는다면',
    ],
    2,
    '합격 레시피 읽기 16~18번 예상문제 4 / 114쪽',
  ),
];

export const RECIPE_READING_16_18: RecipeSeed = {
  groupCode: 'reading-16-18',
  section: TopikSection.READING,
  label: t4('읽기 16~18번', "O'qish 16–18", 'Reading 16–18', 'Чтение 16–18'),
  title: t4(
    '빈칸 채우기',
    "Bo'sh joyni to'ldirish",
    'Passage blanks',
    'Заполнение пропусков',
  ),
  intro: t4(
    '책이 구분한 대응 유형과 종합 유형을 각각 훈련합니다.',
    'Kitobdagi moslik va umumlashtirish turlarini alohida mashq qilamiz.',
    'Practise the book’s correspondence and synthesis blank types separately.',
    'Отдельно отрабатываем типы соответствия и обобщения из книги.',
  ),
  targetLevel: 3,
  order: 6,
  goldenRecipe: [
    t4(
      '대응 유형은 빈칸 앞뒤에서 같은 말·비슷한 말 또는 반대말의 짝을 찾습니다.',
      'Moslik turida bo‘shliq atrofidan sinonim yoki antonim juftini toping.',
      'For correspondence blanks, find matching synonyms or antonyms around the blank.',
      'В типе соответствия найдите вокруг пропуска пару синонимов или антонимов.',
    ),
    t4(
      '짝의 의미를 파악한 뒤 접속사까지 확인해 방향을 결정합니다.',
      "Juft ma'nosini aniqlab, bog'lovchi orqali yo'nalishni tekshiring.",
      'Determine the pair’s meaning, then confirm its direction with the connective.',
      'Определите смысл пары и проверьте направление по связке.',
    ),
    t4(
      '종합 유형은 여러 예를 모두 포함할 수 있는 한 문장을 고릅니다.',
      'Umumlashtirish turida barcha misollarni qamrab oladigan gapni tanlang.',
      'For synthesis blanks, choose the statement that covers every example.',
      'В обобщающем типе выберите фразу, охватывающую все примеры.',
    ),
  ],
  grammarSections: [
    {
      key: 'blank-types',
      title: t4(
        '빈칸 유형 2',
        "Bo'shliqning 2 turi",
        'Two blank types',
        'Два типа пропусков',
      ),
      entries: ranking([
        ['대응 유형', '두 내용이 유의·반의 관계로 서로 짝이 되는 유형'],
        [
          '종합 유형',
          '같거나 비슷한 여러 내용을 하나의 표현으로 완성하는 유형',
        ],
      ]),
      tips: [],
    },
  ],
  examples,
  practice,
  sourceReference: '합격 레시피 PDF 109~114쪽',
};
