import {
  TopikQuestionType,
  TopikSection,
} from '../../../topik/schemas/topik-content.schema';
import { RecipeSeed, RecipeSeedQuestion, t4 } from './recipe-seed.types';
import {
  recipeQuestion as q,
  recipeRanking as ranking,
} from './reading-recipe-helpers';

const topic = (
  code: string,
  number: number,
  prompt: string,
  choices: string[],
  answer: number,
  source: string,
) =>
  q(
    code,
    number,
    TopikQuestionType.PASSAGE_TOPIC,
    prompt,
    choices,
    answer,
    source,
  );
const content = (
  code: string,
  number: number,
  prompt: string,
  choices: string[],
  answer: number,
  source: string,
) =>
  q(
    code,
    number,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt,
    choices,
    answer,
    source,
  );
const blank = (
  code: string,
  number: number,
  prompt: string,
  choices: string[],
  answer: number,
  source: string,
) =>
  q(
    code,
    number,
    TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt,
    choices,
    answer,
    source,
  );
const insert = (
  code: string,
  number: number,
  prompt: string,
  answer: number,
  source: string,
) =>
  q(
    code,
    number,
    TopikQuestionType.SENTENCE_INSERTION,
    prompt,
    ['①', '②', '③', '④'],
    answer,
    source,
  );

const CENTRAL_RANKING = ranking([
  ['유형 1', '-는 게 좋다, -는 게 낫다, -는 게 괜찮다'],
  ['유형 2', '-아/어야, -아/어야 하다'],
  ['유형 3', '그래서'],
  ['유형 4', '가장 중요한 건, -는 게 중요하다·필요하다, -(으)ㄹ 필요가 있다'],
  ['유형 5', '-아/어 보세요, -는 게 어때요?, -(으)ㅂ시다, -자'],
  ['유형 6', '-고 싶다, -(으)면 좋겠다, -(으)면 좋을 텐데'],
  ['유형 7', '제 생각에는, -(ㄴ/는)다고 생각하다·보다, -는 게 아니겠어?'],
  ['유형 8', '-아/어서 좋다·괜찮다·나쁘다·힘들다·어렵다'],
  ['유형 9', '특히, 무엇보다도, -는 데 도움이 된다'],
  ['유형 10', '두 문장 이상 반복: 이처럼, 이렇듯'],
]);

const reading3538Examples: RecipeSeedQuestion[] = [
  topic(
    'recipe-reading-35-38-example-01',
    35,
    '초소형 카메라는 의료용 및 산업용으로 만들어져 유용하게 사용되고 있다. 그러나 타인의 신체를 몰래 촬영하는 용도로 악용되는 사례가 늘고 있다. 악용을 원천적으로 막기 위해 신상 정보를 등록해야만 판매와 유통이 가능하도록 법적 규제를 강화할 필요가 있다.',
    [
      '의료용·산업용 카메라의 사용처를 확대해야 한다.',
      '카메라가 더 유용하게 쓰이도록 개발해야 한다.',
      '카메라 악용을 막기 위한 대책이 마련되어야 한다.',
      '판매와 유통을 위해 등록 과정을 간소화해야 한다.',
    ],
    2,
    'TOPIK II 60회 읽기 35번 / 합격 레시피 223쪽',
  ),
  topic(
    'recipe-reading-35-38-example-02',
    36,
    '정보의 양이 폭발적으로 증가하면서 핵심만 집어낸 요약형 정보를 찾는 사람들이 늘고 있다. 필요한 지식을 쉽고 빠르게 얻을 수 있기 때문이다. 그러나 짧게 정돈된 지식만 취하면 사물을 오래 관찰하고 분석하는 능력이 떨어지거나 정보를 비판적으로 처리하는 능력이 무뎌질 수 있다.',
    [
      '요약형 정보는 가장 효율적인 정보 습득 방식이다.',
      '요약형 정보는 사람들의 사고력 저하를 초래할 수 있다.',
      '사람들이 습득해야 할 지식의 양이 크게 증가하고 있다.',
      '짧게 정돈된 지식 덕분에 정보 처리 시간을 줄일 수 있다.',
    ],
    1,
    'TOPIK II 60회 읽기 36번 / 합격 레시피 223쪽',
  ),
  topic(
    'recipe-reading-35-38-example-03',
    37,
    '유명 드라마가 소설책으로 출간되는 일이 많아졌고 처음부터 영상물을 염두에 두고 글을 쓰는 소설가도 늘고 있다. 그러나 영상물 중심으로 창작과 출판이 이루어진다면 순수 문학이 가진 고유한 특성들이 하나둘씩 사라질지도 모른다.',
    [
      '작가들의 창작열을 높이기 위한 보상 체계가 시급하다.',
      '판매를 늘리기 위해 영상물을 활용한 홍보가 필요하다.',
      '영상물이 책으로 많이 출간되어야 출판 시장이 활성화된다.',
      '영상물의 영향력이 커지면 순수 문학이 위기를 맞을 수 있다.',
    ],
    3,
    'TOPIK II 60회 읽기 37번 / 합격 레시피 224쪽',
  ),
  topic(
    'recipe-reading-35-38-example-04',
    38,
    '분자 요리는 과학을 응용해 기존 식재료의 물리적 제약에서 벗어나 새로운 형태와 식감의 음식을 만드는 요리법이다. 식재료 고유의 맛과 향은 유지한 채 기존에 볼 수 없었던 요리를 선보일 수 있어 새로운 요리 문화를 이끌 것으로 기대된다.',
    [
      '분자 요리가 과학의 연구 영역을 넓히고 있다.',
      '독특한 음식에 대한 소비자 요구가 늘고 있다.',
      '식재료의 제약 탓에 요리법 개발이 정체되고 있다.',
      '새로운 요리 문화를 이끌 요리법으로 분자 요리가 주목받고 있다.',
    ],
    3,
    'TOPIK II 60회 읽기 38번 / 합격 레시피 224쪽',
  ),
];

const reading3538Practice = [
  topic(
    'recipe-reading-35-38-practice-01',
    1,
    '통계 그래프는 정보를 종합한 후 그 변화를 시각적으로 나타내어 현상을 쉽게 파악하도록 돕는다. 그러나 그래프를 어떻게 그리느냐에 따라 그래프에서 보이는 정보의 인상은 상당히 다르다. 똑같은 퍼센트의 증가이지만 그래프의 모양이나 크기에 따라서 조금 증가한 것으로도 많이 증가한 것으로도 생각될 수 있다. 따라서 우리는 그래프를 볼 때 선이나 그림 등으로 표현되는 의미를 객관적으로 파악하는 눈이 필요하다.',
    [
      '그래프는 정보를 시각적으로 표현하는 방법이다.',
      '그래프는 그리는 방법에 따라 다른 인상을 받을 수 있다.',
      '통계는 여러 현상을 종합적으로 파악하기 위한 방법 중 하나이다.',
      '통계를 제대로 이해하기 위해서는 객관적인 자세가 필요하다.',
    ],
    3,
    '합격 레시피 읽기 35~38번 예상문제 1 / 225쪽',
  ),
  topic(
    'recipe-reading-35-38-practice-02',
    2,
    '계획을 세울 때는 장기 계획과 함께 단기 계획도 세워야 한다. 장기 계획만 세우면 목표 달성까지 시간이 오래 걸리기 때문에 도중에 포기하기 쉽다. 따라서 원하는 목표를 달성하기 위해서는 장기 계획과 함께 짧은 기간 동안 이룰 수 있는 구체적인 계획도 세우는 것이 좋다. 단기 계획을 이루어 가면서 얻는 즐거움을 통해 더 큰 목표로 계속 나아갈 수 있기 때문이다.',
    [
      '단기 계획은 이른 시간에 성취감을 느낄 수 있다.',
      '장기 계획은 목표 달성까지 시간이 오래 걸린다.',
      '계획을 세울 때에는 가급적 큰 목표를 가지는 것이 좋다.',
      '장기 계획과 단기 계획을 동시에 세우는 것이 목표 달성에 효과적이다.',
    ],
    3,
    '합격 레시피 읽기 35~38번 예상문제 2 / 225쪽',
  ),
  topic(
    'recipe-reading-35-38-practice-03',
    3,
    '사랑을 고백할 때는 긍정적인 대답을 듣고 싶다면 상대방의 왼쪽 귀에 대고 하는 것이 좋다. 감정을 표현하는 말은 오른쪽 뇌가 담당하는데 왼쪽 귀가 오른쪽 뇌와 연결되어 있기 때문이다. 그래서 사랑 고백뿐만 아니라 감사, 칭찬 등의 감정을 표현할 때는 왼쪽 귀에 대고 하는 것이 효과적이다. 반면에 지시나 정보 전달과 같은 이성적인 말은 오른쪽 귀에 대고 말하는 것이 효과적이다. 이성은 왼쪽 뇌가 담당하기 때문이다. 이처럼 하려고 하는 말이 무엇이냐에 따라 말을 하는 방향을 고려해야 한다.',
    [
      '이성적인 판단은 왼쪽 뇌와 관련이 있다.',
      '업무를 지시할 때는 이성적으로 말해야 한다.',
      '귀와 뇌는 방향에 따라 감성과 이성을 관장한다.',
      '감정을 표현하는 말은 왼쪽 귀에 해야 효과가 높다.',
    ],
    3,
    '합격 레시피 읽기 35~38번 예상문제 3 / 226쪽',
  ),
  topic(
    'recipe-reading-35-38-practice-04',
    4,
    '위급한 상황에서 도움을 요청할 때 여러 사람을 보면서 막연하게 도와 달라고 하면 안 된다. 그러면 다들 “내가 아닌 다른 사람이 도와주겠지.” 하고 직접 나서지 않기 때문이다. 이러한 현상을 ‘책임 분산의 법칙’이라고 하는데 목격자가 많을수록 책임감이 분산되어 개인이 느끼는 책임감이 적어져 행동하지 않게 되는 것을 말한다. 그래서 도움을 요청할 때는 “거기 파란색 티셔츠 입으신 분, 119에 전화해 주세요.”와 같이 하는 것이 효과적이다.',
    [
      '사고가 나면 먼저 119에 신고부터 해야 한다.',
      '도움이 필요한 사람을 보면 적극적으로 도와야 한다.',
      '도움을 요청할 때에는 도와줄 사람을 정확히 가리켜야 한다.',
      '여러 사람이 힘을 모으면 위급한 상황에 빨리 대처할 수 있다.',
    ],
    2,
    '합격 레시피 읽기 35~38번 예상문제 4 / 226쪽',
  ),
];

export const RECIPE_READING_35_38: RecipeSeed = {
  groupCode: 'reading-35-38',
  section: TopikSection.READING,
  label: t4('읽기 35~38번', "O'qish 35–38", 'Reading 35–38', 'Чтение 35–38'),
  title: t4(
    '정보문 중심 생각',
    "Ma'lumot matnining asosiy fikri",
    'Information passage main idea',
    'Главная мысль информационного текста',
  ),
  intro: t4(
    '모르는 어휘를 걷어 내고 중심 생각을 드러내는 표현과 반복 문장을 찾습니다.',
    "Noma'lum so'zlarni o'tkazib, asosiy fikr ifodasi va takrorni topamiz.",
    'Set aside unknown words and locate main-idea patterns and repetition.',
    'Отбросьте незнакомые слова и найдите выражения и повторы главной мысли.',
  ),
  targetLevel: 5,
  order: 13,
  goldenRecipe: [
    t4(
      '모르는 단어를 지우듯 건너뜁니다.',
      "Noma'lum so'zlarni o'tkazib yuboring.",
      'Skip unknown words.',
      'Пропускайте незнакомые слова.',
    ),
    t4(
      '아는 단어와 중심 생각 표현을 중심으로 내용을 추측합니다.',
      "Tanish so'z va asosiy fikr ifodasidan mazmunni toping.",
      'Infer from known words and main-idea expressions.',
      'Выведите смысл по знакомым словам и выражениям главной мысли.',
    ),
    t4(
      '개별 사실이 아니라 글 전체를 포함하는 선택지를 고릅니다.',
      'Alohida fakt emas, butun matnni qamragan variantni tanlang.',
      'Choose the option covering the whole passage rather than one detail.',
      'Выберите вариант, охватывающий весь текст, а не одну деталь.',
    ),
  ],
  grammarSections: [
    {
      key: 'main-idea-ranking',
      title: t4(
        '중심 생각 Ranking 10',
        'Asosiy fikr Ranking 10',
        'Main idea Ranking 10',
        'Главная мысль Ranking 10',
      ),
      entries: CENTRAL_RANKING,
      tips: [],
    },
  ],
  examples: reading3538Examples,
  practice: reading3538Practice,
  sourceReference: '합격 레시피 PDF 222~226쪽',
};

const languagePassage =
  '언어는 인간의 전유물이다. 이는 인간의 기본 조건 중 하나가 언어임을 의미한다. [①] 아직까지 사람 이외의 동물이 언어를 가졌다는 증거는 나타나지 않았다. [②] 그런데 꿀벌은 벌집 앞에서 날갯짓으로 다른 벌에게 먹이가 있는 곳을 알려 준다고 한다. [③] 의사 전달에 사용되는 수단이 극히 제한되어 있고 표현하는 의미도 매우 단순하다. [④]\n<보기> 그러나 동물의 이러한 의사 전달 방법은 사람의 말과 비교한다면 매우 불완전하다.';
const koreanPassage =
  '한국어의 가장 큰 특징은 문장 구조가 서술어 중심이라는 것이다. [①] 이는 문장의 의미가 끝에 오는 서술어에 의해 상당 부분 좌우되기 때문이다. [②] 가령 “만수는 수미를 정말 ___.”에서 ‘자랑한다’와 ‘미워한다’ 중 무엇이 오느냐에 따라 의미가 달라진다. [③] 그래서 상대방의 이야기에 정확히 대답하려면 이야기를 끝까지 들어야 한다. [④]\n<보기> 이런 한국어의 특징으로 인해 ‘한국말은 끝까지 들어봐야 안다’는 옛말까지 있을 정도이다.';
const lonelinessPassage =
  '존 카치오포 박사의 『인간은 왜 외로움을 느끼는가』는 최신 과학으로 밝혀 낸 외로움의 모든 것을 담고 있다. [①] 저자는 인간의 뇌와 사회 문화적 과정이 어떻게 연관되는지 30여 년 동안 연구해 왔다. [②] 이 책은 어려운 용어를 자제해 일반인도 쉽게 읽도록 했다. [③] 저자는 외로움은 사회생활에 문제가 있음을 알리는 것이니 주위를 둘러보라고 조언한다. [④]\n<보기> 그 연구의 결과로 현대인의 만성병이라는 외로움을 사회과학적인 측면에서 책으로 정리한 것이다.';

const reading3941Practice = [
  insert(
    'recipe-reading-39-41-practice-01',
    1,
    languagePassage,
    2,
    '합격 레시피 읽기 39~41번 예상문제 1 / 229쪽',
  ),
  insert(
    'recipe-reading-39-41-practice-02',
    2,
    koreanPassage,
    2,
    '합격 레시피 읽기 39~41번 예상문제 2 / 229쪽',
  ),
  insert(
    'recipe-reading-39-41-practice-03',
    3,
    lonelinessPassage,
    1,
    '합격 레시피 읽기 39~41번 예상문제 3 / 230쪽',
  ),
];

export const RECIPE_READING_39_41: RecipeSeed = {
  groupCode: 'reading-39-41',
  section: TopikSection.READING,
  label: t4('읽기 39~41번', "O'qish 39–41", 'Reading 39–41', 'Чтение 39–41'),
  title: t4(
    '문장 삽입',
    'Gapni joylashtirish',
    'Sentence insertion',
    'Вставка предложения',
  ),
  intro: t4(
    '보기와 같은 단어·표현이 처음 나오는 위치를 기준으로 문장을 삽입합니다.',
    "Berilgan gapdagi takror so'z va ifoda bo'yicha joyni topamiz.",
    'Insert the sentence by tracing repeated words and expressions.',
    'Вставьте предложение по повторяющимся словам и выражениям.',
  ),
  targetLevel: 5,
  order: 14,
  goldenRecipe: [
    t4(
      '보기의 단어가 처음 나오는 문장을 찾습니다.',
      "Berilgan gapdagi so'z birinchi chiqqan joyni toping.",
      'Find where a word from the given sentence first appears.',
      'Найдите первое появление слова из данного предложения.',
    ),
    t4(
      '보기와 중복되는 내용을 가진 문장을 찾고 그 사이의 위치를 봅니다.',
      'Berilgan gap bilan takror mazmun orasidagi joyni toping.',
      'Find the repeated content and inspect the position between the linked sentences.',
      'Найдите повторяющееся содержание и позицию между связанными фразами.',
    ),
    t4(
      '후보가 두 곳이면 접속사·지시어·‘도’를 확인합니다.',
      "Ikki joy qolsa, bog'lovchi, ko'rsatish so'zi va ‘도’ni tekshiring.",
      'If two positions remain, use connectives, demonstratives and 도.',
      'Если осталось две позиции, проверьте связки, указательные слова и 도.',
    ),
  ],
  grammarSections: [
    {
      key: 'insertion-clues',
      title: t4(
        '문장 삽입 단서',
        'Gap joylash belgisi',
        'Insertion clues',
        'Признаки вставки',
      ),
      entries: ranking([
        ['접속사', '그리고, 그러나, 그런데, 따라서'],
        ['지시어', '이, 그, 저, 이러한, 그 연구'],
        ['포함 조사', 'N-도'],
        ['반복어', '보기와 본문에서 되풀이되는 핵심 명사'],
      ]),
      tips: [],
    },
  ],
  examples: [
    insert(
      'recipe-reading-39-41-example-39',
      39,
      '도시의 거리는 온통 상점으로 가득 차 있다. [?] 하지만 상점은 거리에 활력을 불어넣고 걷고 싶은 거리를 만드는 데 중요한 역할을 한다. [?] 상점은 단순히 물건을 파는 공간이 아니라 보행자들에게 볼거리와 잔재미를 끊임없이 제공하는 거대한 미술관이 되어 준다. [?] 또 밤거리를 밝히는 가로등이며 보안등이자 거리의 청결함과 쾌적함을 지켜 주는 파수꾼이 되기도 한다. [?]\n<보기> 상업적 공간으로 채워진 거리를 보며 눈살을 찌푸리는 이들도 많다.',
      0,
      'TOPIK II 60회 읽기 39번 / 합격 레시피 227쪽',
    ),
    insert(
      'recipe-reading-39-41-example-01',
      40,
      '『박철수의 거주 박물지』는 서울의 거주 문화사를 소개한 책이다. [①] 아파트가 어떻게 중산층의 표준 욕망이 됐는가 같은 물음을 도면과 신문 기사를 곁들여 풀어낸다. [②] 그 과정에서 이웃과 정을 나누지 않고 각박하게 살아온 세태를 지적한다. [③] 미래의 건축학도에게 추천하고 싶다. [④]\n<보기> 무엇보다 독자들이 더 흥미롭게 읽을 수 있도록 문답의 형식으로 구성된 것이 돋보인다.',
      1,
      'TOPIK II 60회 읽기 40번 / 합격 레시피 228쪽',
    ),
    insert(
      'recipe-reading-39-41-example-02',
      41,
      '최초의 동전은 값비싼 금과 은으로 제작되었다. [①] 주화를 조금씩 깎아 이득을 보려는 사람이 많았다. [②] 그래서 주화의 테두리에 톱니 모양을 새겨 훼손 여부가 드러나게 했다. [③] 훼손된 주화는 쉽게 구별되어 사람들이 받지 않았다. [④]\n<보기> 그 효과는 기대 이상으로 빠르게 나타났다.',
      2,
      'TOPIK II 60회 읽기 41번 / 합격 레시피 228쪽',
    ),
  ],
  practice: reading3941Practice,
  sourceReference: '합격 레시피 PDF 227~230쪽',
};

const cameraNovel =
  '“도와드릴까요.” 아주 듣기 좋은 저음이었다. 키가 훌쩍 큰 남자였다. 남자는 웃고 있었지만 비웃는 웃음은 아니었다. 그는 엉거주춤 허리를 굽혀 나하고 같은 눈높이가 되면서 빨간 단추를 살짝 만지고 나서 카메라를 내 눈에다 대 주었다. “이제 보이지요?” 그러나 나는 뭐가 보이나를 확인하기 전에 그를 다시 한번 쳐다보았다. 선량하고 친절한 인상이 마음에 들었다. 바위 뒤에 숨어 있던 늑대가 사방을 휘둘러보면서 걸어 나왔다. 나는 카메라로 늑대를 쫓다 말고 키 큰 남자를 돌아다보면서 물었다. “그럼 여태껏 건성으로 들고 있었단 말이에요?” 나는 그에게 따지듯 물었다. 그러나 곧 그의 위로하는 듯한 웃음을 따라 웃고 말았다. 그는 나하고 카메라를 번갈아 들여다보면서 이것저것 설명하려고 했다. 나는 듣는 척하다가 【한숨을 쉬면서 어깨를 한번 으쓱했다가 축 늘어뜨려 보였다】.';
const potatoNovel =
  '어느 날 내가 울타리를 엮고 있을 때 평소 서로 말을 않고 지내던 점순이가 살며시 와서 괜히 말을 건다. “너희 집에는 이거 없지?” 하며 구운 감자 세 알을 내놓는 것이다. 나는 “안 먹는다.” 하며 고개도 안 돌리고 감자를 도로 밀어 버린다. 【점순이는 나를 한참 쏘아보더니 눈에는 눈물까지 글썽거리면서 이를 악물고 가 버린다】. 그 후로 점순이는 기를 쓰고 나를 괴롭힌다. 나의 집 암탉을 때려 알집을 터뜨려 놓았을 뿐만 아니라 나를 “바보”라고 놀리다 못해 내 아버지까지 흉을 보기도 한다. 툭하면 사나운 자기네 집 수탉과 나의 작은 수탉을 싸움 붙여 놓는다. 나는 싸움에 이기게 하려고 닭에게 고추장까지 먹여 보았으나 점순이네 수탉에 쪼여 반죽음 당하기는 먹이지 않았을 때와 마찬가지이다.';

const reading4243Practice = [
  q(
    'recipe-reading-42-43-practice-01',
    1,
    TopikQuestionType.AUTHOR_EMOTION,
    cameraNovel,
    ['속이 상하다', '자신이 없다', '마음이 차분하다', '가슴이 먹먹하다'],
    0,
    '합격 레시피 읽기 42~43번 예상문제 1 / 242쪽',
  ),
  content(
    'recipe-reading-42-43-practice-02',
    2,
    cameraNovel,
    [
      '나는 카메라를 통해 늑대를 봤다.',
      '나는 카메라의 사용법을 잘 알고 있다.',
      '나는 남자에게 카메라에 대해 설명했다.',
      '나는 남자의 인상을 좋게 보지 않았다.',
    ],
    0,
    '합격 레시피 읽기 42~43번 예상문제 2 / 242쪽',
  ),
  q(
    'recipe-reading-42-43-practice-03',
    3,
    TopikQuestionType.AUTHOR_EMOTION,
    potatoNovel,
    ['슬프다', '답답하다', '당황스럽다', '원망스럽다'],
    3,
    '합격 레시피 읽기 42~43번 예상문제 3 / 243쪽',
  ),
  content(
    'recipe-reading-42-43-practice-04',
    4,
    potatoNovel,
    [
      '나와 점순이는 사이가 좋은 편이다.',
      '나는 점순이와 아버지의 흉을 봤다.',
      '나는 점순이가 준 감자를 안 먹었다.',
      '나는 점순이네 수탉에게 고추장을 먹였다.',
    ],
    2,
    '합격 레시피 읽기 42~43번 예상문제 4 / 243쪽',
  ),
];

const teacherNovel =
  '새 담임 박영 선생님을 맞이한 뒤 말썽꾸러기들이 선생님 앞에서 수줍어했고 우리 반은 가장 깨끗한 반이 되었다. 나도 잘 보이고 싶었지만 성적은 좋지 않았다. 선생님은 “동구는 아는데 말을 못하는 때도 많고 그러다 보니 자신감도 없어지는 것 같아.”라고 말했다. 【내가 가렵고 아픈 부분을 이렇게 간결하게 짚어 준 사람이 내 인생에 또 있으랴】. 공부 못하는 서러움을 이해받는 것은 처음이었다.';

export const RECIPE_READING_42_43: RecipeSeed = {
  groupCode: 'reading-42-43',
  section: TopikSection.READING,
  label: t4('읽기 42~43번', "O'qish 42–43", 'Reading 42–43', 'Чтение 42–43'),
  title: t4('소설', 'Hikoya', 'Fiction', 'Художественный текст'),
  intro: t4(
    '소설의 행동과 대사 전후를 읽어 인물의 심정과 세부 내용을 추론합니다.',
    'Harakat va dialog atrofidan qahramon hissi va tafsilotni topamiz.',
    'Infer a character’s emotion and details from actions and dialogue.',
    'Определите эмоцию и детали по действиям и диалогу.',
  ),
  targetLevel: 6,
  order: 15,
  goldenRecipe: [
    t4(
      '42번은 밑줄 앞뒤의 행동·대사와 감정 어휘를 연결합니다.',
      "42-savolda chizilgan joy atrofidagi harakatni hissiyot so'zi bilan bog'lang.",
      'For question 42, link surrounding actions and dialogue to emotion vocabulary.',
      'В вопросе 42 свяжите действия и реплики с эмоцией.',
    ),
    t4(
      '반어·비유 표현은 문자 그대로 해석하지 말고 인물의 상황에 맞춰 풉니다.',
      "Kinoya va o'xshatishni vaziyatga ko'ra tushuning.",
      'Interpret irony and figurative language through the character’s situation.',
      'Толкуйте иронию и образность по ситуации героя.',
    ),
    t4(
      '43번은 인물·행동·대상을 바꾼 선택지를 조심합니다.',
      "43-savolda qahramon, harakat yoki obyektni almashtirgan variantdan ehtiyot bo'ling.",
      'For question 43, watch for swapped characters, actions or objects.',
      'В вопросе 43 следите за заменой героя, действия или объекта.',
    ),
  ],
  grammarSections: [
    {
      key: 'fiction-clues',
      title: t4(
        '소설 심정 단서',
        'Hikoya hissiyot belgisi',
        'Fiction emotion clues',
        'Признаки эмоций в прозе',
      ),
      entries: ranking([
        ['행동', '손, 시선, 자세와 움직임'],
        ['대사', '말투, 질문, 반어적 표현'],
        ['표정', '웃음, 눈물, 얼굴의 변화'],
        ['비유', '마음 상태를 사물에 빗댄 표현'],
      ]),
      tips: [],
    },
  ],
  examples: [
    q(
      'recipe-reading-42-43-example-01',
      42,
      TopikQuestionType.AUTHOR_EMOTION,
      teacherNovel,
      ['난처하다', '감격스럽다', '담담하다', '의심스럽다'],
      1,
      'TOPIK II 52회 읽기 42번 / 합격 레시피 240~241쪽',
    ),
    content(
      'recipe-reading-42-43-example-02',
      43,
      teacherNovel,
      [
        '나는 담임 선생님께 인정을 받고 싶다.',
        '반 아이들은 요즘 교실 청소를 잘 하지 않는다.',
        '반 아이들은 예전 담임 선생님 말을 잘 들었다.',
        '담임 선생님은 내가 공부를 못해서 화를 내셨다.',
      ],
      0,
      'TOPIK II 52회 읽기 43번 / 합격 레시피 241쪽',
    ),
  ],
  practice: reading4243Practice,
  sourceReference: '합격 레시피 PDF 240~243쪽',
};

const pricePassage =
  '정부가 5년 전 발표한 옥외 가격 표시제는 일정 면적 이상의 업소는 매장 외부에 가격을 표시하도록 한 제도이다. 소비자들의 합리적인 소비와 업소 간 건전한 가격 경쟁 유도를 위해 도입하였다. 하지만 여전히 ___ 있어 소비자들의 알 권리가 제대로 보호받지 못하고 있다는 지적이다. 특히 일반음식점, 미용실 등에서 지켜지지 않는 것으로 나타났다. 이는 지방 자치 단체의 소극적인 단속과 해당 업소의 무관심 등이 원인으로 지적되고 있다. 그래서 이들 업소를 대상으로 일제 점검을 벌이고 있지만 아직 경고 수준에 그치는 상황이다. 더욱이 A4 용지 크기에 일부 가격만 적어 놓으면 될 뿐이어서 쉽게 보이는 곳에 붙였는지, 굵고 진한 글씨로 표기했는지 등의 세부 규정도 마련되어야 한다는 지적이다. 이와 관련하여 지자체에서는 명확한 규정이 없어 아직까지 업주에게 강요할 수 없는 형편이라며 가격표 설치 지원과 단속 강화 등 제도 정착을 위한 다각적인 방안을 모색하고 있다고 말했다.';
const mealPassage =
  '은혜시가 학교 급식의 위생 관리를 위하여 매년 두 차례에 걸쳐 ‘학교 급식 점검단’을 운영하겠다고 발표했다. 학교 급식의 위생 관리와 안전 점검을 강화하기 위해 공무원 1명과 학부모 1명이 2인 1조를 이루어 운영하는 방식이다. 점검 사항은 학교 급식법 규정에 따라 83개 항목을 점검할 예정이다. 이를 시행하기에 앞서 은혜시 교육청은 학부모 점검단의 역할과 자세, 학교 급식 위생·안전 점검 요령에 대한 전문 교육을 진행했다. 앞으로 두 차례의 점검을 마치게 되면 연 2회 평가회를 열어 점검단 운영 결과와 우수 학교도 소개할 예정이다. 그리고 점검단의 ___ 좀 더 나은 학교 급식을 위해 교육부와 함께 정책 토론을 진행하는 자리도 마련할 예정이다.';

const reading4445Practice = [
  topic(
    'recipe-reading-44-45-practice-01',
    1,
    pricePassage,
    [
      '업소 간의 건전한 가격 경쟁이 필요하다.',
      '옥외 가격 표시제가 제대로 이루어져야 한다.',
      '소비자들의 신고 정신이 제도 정착을 앞당길 수 있다.',
      '옥외 가격 표시제를 지키지 않는 업주를 처벌해야 한다.',
    ],
    1,
    '합격 레시피 읽기 44~45번 예상문제 1 / 247쪽',
  ),
  blank(
    'recipe-reading-44-45-practice-02',
    2,
    pricePassage,
    [
      '제구실을 하지 못하고',
      '법적인 효력을 발휘하고',
      '관계 당국이 철저히 관리하고',
      '소비자들이 관심을 보이지 않고',
    ],
    0,
    '합격 레시피 읽기 44~45번 예상문제 2 / 247쪽',
  ),
  topic(
    'recipe-reading-44-45-practice-03',
    3,
    mealPassage,
    [
      '학교 급식법은 모두 83개의 항목으로 구성되어 있다.',
      '은혜시는 점검단에 참여하는 학부모에게 관련 교육을 진행한다.',
      '은혜시는 학교 급식 위생 관리를 학부모가 참여하는 형태로 진행한다.',
      '학부모들은 점검이 끝날 때마다 평가회를 열어 결과를 발표한다.',
    ],
    2,
    '합격 레시피 읽기 44~45번 예상문제 3 / 248쪽',
  ),
  blank(
    'recipe-reading-44-45-practice-04',
    4,
    mealPassage,
    [
      '평가 결과를 일단 뒤로 미루고',
      '인원 구성을 공무원 중심으로 바꾸고',
      '역할이 급식 위생 점검에만 그치지 않고',
      '운영 방식을 우수 학교에서 담당하도록 하고',
    ],
    2,
    '합격 레시피 읽기 44~45번 예상문제 4 / 248쪽',
  ),
];

const deadlinePassage =
  '원고 마감이 임박하거나 시험공부 시간이 부족하면 사람은 본능적으로 놀라운 집중력을 발휘한다. 그래서 시간 부족 상태가 되어야 일을 효율적으로 할 수 있다고 믿는 사람이 많다. 그러나 효율성만 믿고 ___ 것은 어리석다. 시간에 쫓기면 한 가지에만 집중하고 다른 것에는 주의를 기울이지 못하기 때문이다. 소방관이 인명 구조에만 집중한 나머지 안전벨트를 매지 않아 사고를 당하는 것이 그 예이다. 이처럼 시간적 여유가 부족하면 집중한 일은 처리해도 나머지 많은 것을 놓칠 수 있다.';

export const RECIPE_READING_44_45: RecipeSeed = {
  groupCode: 'reading-44-45',
  section: TopikSection.READING,
  label: t4('읽기 44~45번', "O'qish 44–45", 'Reading 44–45', 'Чтение 44–45'),
  title: t4(
    '고급 정보문: 주제와 빈칸',
    "Yuqori daraja: mavzu va bo'shliq",
    'Advanced passage: topic and blank',
    'Продвинутый текст: тема и пропуск',
  ),
  intro: t4(
    '6급 정보문에서 중심 생각과 그 논리를 완성하는 빈칸을 함께 풉니다.',
    '6-daraja matnida asosiy fikr va uni to‘ldiruvchi bo‘shliqni yechamiz.',
    'Solve the main idea and its supporting blank in a level-6 passage.',
    'Решите главную мысль и дополняющий её пропуск в тексте 6-го уровня.',
  ),
  targetLevel: 6,
  order: 16,
  goldenRecipe: [
    t4(
      '44번은 중심 생각 Ranking 10의 표현을 찾습니다.',
      '44-savolda asosiy fikr ifodasini toping.',
      'For question 44, locate a main-idea expression.',
      'В вопросе 44 найдите выражение главной мысли.',
    ),
    t4(
      '마지막 결론이 글 전체를 어떻게 정리하는지 확인합니다.',
      'Oxirgi xulosa butun matnni qanday jamlaganini tekshiring.',
      'Check how the final conclusion summarizes the passage.',
      'Проверьте, как вывод обобщает текст.',
    ),
    t4(
      '45번은 대응 유형 또는 종합 유형으로 빈칸의 근거를 찾습니다.',
      '45-savolda moslik yoki umumlashtirish dalilini toping.',
      'For question 45, use correspondence or synthesis evidence.',
      'В вопросе 45 найдите соответствие или обобщение.',
    ),
  ],
  grammarSections: [
    {
      key: 'main-idea-ranking',
      title: t4(
        '중심 생각 Ranking 10',
        'Asosiy fikr Ranking 10',
        'Main idea Ranking 10',
        'Главная мысль Ranking 10',
      ),
      entries: CENTRAL_RANKING,
      tips: [],
    },
  ],
  examples: [
    topic(
      'recipe-reading-44-45-example-01',
      44,
      deadlinePassage,
      [
        '인간의 집중력은 시간 제약이 많을수록 높아진다.',
        '시간 부족은 효율적인 일 처리의 원동력이 된다.',
        '단시간에 일을 처리해도 성공적으로 마칠 수 있다.',
        '시간 부족은 인간의 시야를 좁혀 부정적인 영향을 미칠 수 있다.',
      ],
      3,
      'TOPIK II 60회 읽기 44번 / 합격 레시피 246쪽',
    ),
    blank(
      'recipe-reading-44-45-example-02',
      45,
      deadlinePassage,
      [
        '성급히 일을 처리하는',
        '무턱대고 일을 미루는',
        '관심사를 무한히 늘리는',
        '전적으로 하나에만 매달리는',
      ],
      1,
      'TOPIK II 60회 읽기 45번 / 합격 레시피 246쪽',
    ),
  ],
  practice: reading4445Practice,
  sourceReference: '합격 레시피 PDF 244~248쪽',
};

const desertPassage =
  '일반적으로 사막은 강우량보다 증발량이 많은 지역을 의미한다. [①] 그런데 원래 사막이 아닌 곳이 사막으로 변하는 사막화 현상이 지구 곳곳에서 나타나고 있다. [②] 사막화는 오랫동안의 가뭄으로 인한 자연적인 사막화와 인간의 과도한 개발로 숲이 사라져서 생기는 인위적인 사막화로 나눌 수 있다. [③] 지구는 점차 산소가 부족해져 야생동물은 멸종 위기에 이르고 물 부족 현상으로 작물 재배가 불가능해져 극심한 식량난에 빠지게 된다. [④] 또한 이산화탄소의 양이 많아져 지구온난화의 원인이 된다.\n<보기> 이러한 사막화로 인해 숲이 사라지게 되면 인류는 심각한 위기를 맞게 된다.';
const staticPassage =
  '정전기는 날씨가 건조해지면 자주 나타나는데 주로 옷을 벗을 때, 머리를 빗거나 모자를 벗을 때에 찌지직하면서 전기가 일어나는 것을 경험할 수 있다. [①] 심지어 어떤 사람은 정전기 때문에 컴퓨터가 고장이 난 적도 있다고 한다. [②] 따라서 컴퓨터 같은 기기를 분해하거나 조립할 때도 조심해야 한다. [③] 기름과 가스를 운반하는 유조차는 잘못하면 반짝하는 정전기의 불꽃으로 불이 날 수 있으므로 매우 조심해야 한다. [④] 식품을 포장하는 데 쓰는 얇은 비닐은 정전기를 띠고 있어서 물건에 잘 달라붙는다. 이러한 성질을 이용해 식품을 깨끗하게 보관할 수 있는 것이다.\n<보기> 그러나 정전기가 우리에게 도움을 줄 때도 있다.';

const reading4647Practice = [
  insert(
    'recipe-reading-46-47-practice-01',
    1,
    desertPassage,
    2,
    '합격 레시피 읽기 46~47번 예상문제 1 / 250쪽',
  ),
  content(
    'recipe-reading-46-47-practice-02',
    2,
    desertPassage,
    [
      '오랜 가뭄으로 야생동물이 멸종 위기에 있다.',
      '인간의 과도한 개발로 사막화가 사라지고 있다.',
      '지구온난화의 원인은 이산화탄소의 증가 때문이다.',
      '자연적 사막화보다 인위적 사막화가 더 심각하다.',
    ],
    2,
    '합격 레시피 읽기 46~47번 예상문제 2 / 250쪽',
  ),
  insert(
    'recipe-reading-46-47-practice-03',
    3,
    staticPassage,
    3,
    '합격 레시피 읽기 46~47번 예상문제 3 / 251쪽',
  ),
  content(
    'recipe-reading-46-47-practice-04',
    4,
    staticPassage,
    [
      '정전기는 습도가 높은 날 자주 발생한다.',
      '정전기를 이용하면 컴퓨터 수리가 가능하다.',
      '식품 포장 때 정전기 때문에 상하므로 조심해야 한다.',
      '유조차는 정전기 때문에 화재가 날 수 있어 유의해야 한다.',
    ],
    3,
    '합격 레시피 읽기 46~47번 예상문제 4 / 251쪽',
  ),
];

const spacePassage =
  '우주는 지구와 환경이 달라 지구의 방법으로 쓰레기를 수거하기 어렵다. 처음에는 작살처럼 물리적인 힘으로 쓰레기를 찍는 도구가 거론되었다. [①] 이 때문에 테이프나 빨판처럼 접착력이 있는 도구도 제안되었다. [②] 테이프는 극심한 온도 변화를 견디지 못했고 빨판은 진공에서 소용이 없었다. [③] 최근에는 도마뱀이 벽에 달라붙는 원리에서 영감을 받아 접착력 있는 도구를 개발하는 데 성공했다. [④]\n<보기> 그러나 이 방법은 자칫하면 우주 쓰레기를 엉뚱한 곳으로 밀어낼 위험이 있었다.';

export const RECIPE_READING_46_47: RecipeSeed = {
  groupCode: 'reading-46-47',
  section: TopikSection.READING,
  label: t4('읽기 46~47번', "O'qish 46–47", 'Reading 46–47', 'Чтение 46–47'),
  title: t4(
    '고급 문장 삽입·내용 일치',
    'Yuqori daraja: gap va mazmun',
    'Advanced insertion and detail',
    'Продвинутая вставка и детали',
  ),
  intro: t4(
    '긴 논설문·설명문에서 문장 위치와 세부 내용을 연속으로 확인합니다.',
    'Uzun matnda gap o‘rni va tafsilotni ketma-ket tekshiramiz.',
    'Determine sentence position and then verify passage details.',
    'Определите место предложения и затем проверьте детали.',
  ),
  targetLevel: 6,
  order: 17,
  goldenRecipe: [
    t4(
      '46번은 39~41번과 같이 반복어·지시어·접속사를 추적합니다.',
      "46-savolda takror, ko'rsatish so'zi va bog'lovchini kuzating.",
      'For question 46, trace repetition, demonstratives and connectives.',
      'В вопросе 46 следите за повторами, указательными словами и связками.',
    ),
    t4(
      '보기의 ‘이러한·그러나’가 가리키는 앞내용과 뒤의 전환을 함께 확인합니다.',
      "Ko'rsatish so'zi nimani bildirishi va burilishni tekshiring.",
      'Check both the referent of demonstratives and the following transition.',
      'Проверьте, к чему относится указательное слово, и последующий переход.',
    ),
    t4(
      '삽입한 문장을 포함해 전체를 다시 읽은 뒤 47번의 세부 내용을 풉니다.',
      "Gapni qo'ygach, matnni qayta o'qib 47-savolni yeching.",
      'Reread with the inserted sentence before answering question 47.',
      'Перечитайте текст со вставкой перед вопросом 47.',
    ),
  ],
  grammarSections: [
    {
      key: 'insertion-clues',
      title: t4(
        '문장 삽입 단서',
        'Gap joylash belgisi',
        'Insertion clues',
        'Признаки вставки',
      ),
      entries: ranking([
        ['반복어', '보기와 본문의 같은 핵심 명사'],
        ['지시어', '이, 그, 이러한, 이 방법'],
        ['접속사', '그러나, 그런데, 따라서, 또한'],
        ['내용 전환', '문제에서 해결, 위험에서 장점으로 바뀌는 지점'],
      ]),
      tips: [],
    },
  ],
  examples: [
    insert(
      'recipe-reading-46-47-example-01',
      46,
      spacePassage,
      0,
      'TOPIK II 60회 읽기 46번 / 합격 레시피 249쪽',
    ),
    content(
      'recipe-reading-46-47-example-02',
      47,
      spacePassage,
      [
        '테이프는 우주의 온도 변화 때문에 점성을 잃었다.',
        '작살은 접착력을 이용한 도구의 좋은 대안이었다.',
        '우주에서 쓰레기를 처리하는 방법은 지구와 유사하다.',
        '접착력을 이용한 쓰레기 수거 방법은 결국 성공하지 못했다.',
      ],
      0,
      'TOPIK II 60회 읽기 47번 / 합격 레시피 249쪽',
    ),
  ],
  practice: reading4647Practice,
  sourceReference: '합격 레시피 PDF 249~251쪽',
};

const equalityPassage =
  '얼마 전 한 민간단체가 발표한 2014년판 ‘남녀격차 보고’에서 한국은 조사 대상 142개국 중 117위를 기록하였다. 남녀평등 순위에서는 지난해 111위에서 6계단 더 하락한 것으로 나타났다. 이번 한국 남녀평등 순위는 같은 아시아 국가 중 필리핀(9위), 중국(87위)보다 한참 낮은 순위이며, 남녀격차는 제도적 정비에도 오히려 더욱 심화되고 있는 것으로 조사됐다. 이런 사회적 분위기와 제도에 문제를 삼고 여성의 평등을 위해 노력해야 한다는 움직임이 최근에 일고 있다. 하지만 여성 운동에서는 모든 인간이 존중되는 평등을 지향해야지 성 평등만을 지향해서는 안 된다. 오늘날 벌어지고 있는 차별은 성 차별에만 국한되지 않는다. 인종, 민족, 종교, 지위 등을 이유로 지구촌 곳곳에서 인간으로서의 기본 권리가 침해받고 있다. 【인권이 보호되지 않고서 성 평등이 무슨 의미가 있겠는가?】 여성 운동은 인권 운동과 ___ 바람직한 사회를 만들어 나가는 데 노력을 기울여야 할 것이다. 여성 운동은 사회적 변화를 이루고자 하는 새로운 차원의 시민 운동이기 때문이다.';
const juryPassage =
  '‘국민참여재판’은 국민이 형사 재판에 직접 참여하는 제도이다. 재판에서 피고인의 유죄 여부와 형량에 대해 재판부와 함께 판단을 내리는 일을 한다. 이때 재판에 참여하는 사람을 배심원이라고 하는데 만 20세 이상의 대한민국 국민으로 해당 지방법원 관할 구역에 거주하는 주민 중에 무작위로 선정된다. 배심원은 재판에 참여하여 검사와 변호인의 주장을 듣고 증거 조사 과정을 지켜보게 된다. 그리고 재판 중에 증인이나 피고인을 신문할 때 궁금한 점을 질문할 수 있다. 재판 과정의 마지막에는 배심원들이 따로 모여 이야기하고 의견을 모으게 된다. 하지만 배심원들의 의견이 재판 결과로 이어지지 않는다. 한국의 국민참여재판에서는 배심원들의 의견이 ___. 그래서 판사의 판결이 배심원들의 결론과 다를 수 있다. 사실 한국의 국민참여재판 제도는 재판의 공정성과 절차적 투명성에 대한 불신 때문에 도입된 측면이 강하다. 그런데 【배심원의 의견이 결국 판사의 판단에 별다른 영향을 미치지 못하는 현행 시스템은 국민재판 무용론에 빌미를 제공한다】.';

const reading4850Practice = [
  q(
    'recipe-reading-48-50-practice-01',
    1,
    TopikQuestionType.AUTHOR_PURPOSE,
    equalityPassage,
    [
      '여성의 성 평등 운동을 지지하기 위해',
      '올바른 여성 운동의 방향을 제시하기 위해',
      '한국의 남녀 불평등 문제의 심각성을 설명하기 위해',
      '여성 평등을 위한 정부 차원의 대책 마련을 요구하기 위해',
    ],
    1,
    '합격 레시피 읽기 48~50번 예상문제 1 / 254쪽',
  ),
  blank(
    'recipe-reading-48-50-practice-02',
    2,
    equalityPassage,
    [
      '보조를 맞추면서',
      '확실하게 구분하고',
      '제도적 정비를 이루어서',
      '여성의 평등을 주장하며',
    ],
    0,
    '합격 레시피 읽기 48~50번 예상문제 2 / 254쪽',
  ),
  q(
    'recipe-reading-48-50-practice-03',
    3,
    TopikQuestionType.AUTHOR_ATTITUDE,
    equalityPassage,
    [
      '여성의 평등이 보장되어야 한다는 주장을 지지하고 있다.',
      '성 평등이 제도적인 보호를 받지 못하는 상황을 비판하고 있다.',
      '여성 운동의 근본적인 의미가 왜곡되는 상황을 염려하고 있다.',
      '인권 보호가 먼저 이루어져야 성 평등도 주장할 수 있음을 지적하고 있다.',
    ],
    3,
    '합격 레시피 읽기 48~50번 예상문제 3 / 254쪽',
  ),
  q(
    'recipe-reading-48-50-practice-04',
    4,
    TopikQuestionType.AUTHOR_PURPOSE,
    juryPassage,
    [
      '국민참여재판의 필요성을 촉구하려고',
      '국민참여재판의 배심원 자격을 소개하려고',
      '국민참여재판의 방식과 문제점을 설명하려고',
      '국민참여재판의 공정성과 투명성을 홍보하려고',
    ],
    2,
    '합격 레시피 읽기 48~50번 예상문제 4 / 255쪽',
  ),
  blank(
    'recipe-reading-48-50-practice-05',
    5,
    juryPassage,
    [
      '채택될 가능성이 아주 높다',
      '형량을 결정하는 기준이 된다',
      '재판의 공정성을 높이고 있다',
      '고려되기는 하지만 효력은 없다',
    ],
    3,
    '합격 레시피 읽기 48~50번 예상문제 5 / 255쪽',
  ),
  q(
    'recipe-reading-48-50-practice-06',
    6,
    TopikQuestionType.AUTHOR_ATTITUDE,
    juryPassage,
    [
      '제도의 효용성에 대해 강조하고 있다.',
      '배심원의 자질에 대해 평가하고 있다.',
      '제도의 불완전성에 대해 우려하고 있다.',
      '배심원 선정 기준에 대해 비판하고 있다.',
    ],
    2,
    '합격 레시피 읽기 48~50번 예상문제 6 / 255쪽',
  ),
];

const industryPassage =
  '4차 산업은 연구 개발이 핵심 원동력이라는 공통점이 있다. 정부는 신성장 기술 연구의 세금을 대폭 낮춰 주기로 했는데 이는 【고무적인 일이다】. 하지만 현재 조건은 몇몇 대기업에만 유리할 수 있다. 전담 연구 부서와 국내 원천 기술이 있어야 지원이 가능하기 때문이다. 혜택이 큰 만큼 ___ 정부의 입장을 이해하지 못하는 것은 아니다. 그러나 연구 개발을 유도하고 독려하려는 정책이라면 조건을 완화하거나 단계적으로 적용할 필요가 있다.';

export const RECIPE_READING_48_50: RecipeSeed = {
  groupCode: 'reading-48-50',
  section: TopikSection.READING,
  label: t4('읽기 48~50번', "O'qish 48–50", 'Reading 48–50', 'Чтение 48–50'),
  title: t4(
    '종합 논설문',
    'Yakuniy munozarali matn',
    'Integrated argumentative passage',
    'Итоговый аргументативный текст',
  ),
  intro: t4(
    '하나의 고급 논설문에서 목적, 빈칸, 필자의 태도를 종합적으로 풉니다.',
    'Bitta yuqori matnda maqsad, bo‘shliq va muallif munosabatini yechamiz.',
    'Solve purpose, blank and author attitude from one advanced passage.',
    'Определите цель, пропуск и отношение автора в одном сложном тексте.',
  ),
  targetLevel: 6,
  order: 18,
  goldenRecipe: [
    t4(
      '48번은 마지막 문장의 주장으로 글의 목적을 찾습니다.',
      "48-savolda oxirgi da'vodan maqsadni toping.",
      'For question 48, use the final claim to identify purpose.',
      'В вопросе 48 найдите цель по заключительному тезису.',
    ),
    t4(
      '49번은 대응 또는 종합 유형으로 빈칸을 풉니다.',
      '49-savolda moslik yoki umumlashtirishdan foydalaning.',
      'For question 49, use correspondence or synthesis.',
      'В вопросе 49 используйте соответствие или обобщение.',
    ),
    t4(
      '50번은 밑줄 앞뒤와 평가 어휘로 필자의 긍정·부정 태도를 판단합니다.',
      "50-savolda atrofdagi baholash so'zidan muallif munosabatini toping.",
      'For question 50, infer attitude from surrounding evaluative language.',
      'В вопросе 50 определите отношение по оценочной лексике.',
    ),
  ],
  grammarSections: [
    {
      key: 'integrated-tools',
      title: t4(
        '종합 풀이 도구',
        'Yakuniy yechim vositalari',
        'Integrated tools',
        'Инструменты итогового задания',
      ),
      entries: ranking([
        ['글의 목적', '주장·요구·비판·설명 중 필자가 글을 쓴 이유'],
        ['대응 유형', '빈칸 앞뒤의 유의·반의 관계'],
        ['종합 유형', '여러 근거를 모두 포함하는 표현'],
        ['필자의 태도', '긍정·부정 평가와 우려·비판·지지'],
      ]),
      tips: [],
    },
  ],
  examples: [
    q(
      'recipe-reading-48-50-example-01',
      48,
      TopikQuestionType.AUTHOR_PURPOSE,
      industryPassage,
      [
        '투자 정책이 야기할 혼란을 경고하려고',
        '세제 지원 조건의 문제점을 지적하려고',
        '연구 개발에 적절한 분야를 소개하려고',
        '신성장 산업 연구의 중요성을 강조하려고',
      ],
      1,
      'TOPIK II 60회 읽기 48번 / 합격 레시피 253쪽',
    ),
    blank(
      'recipe-reading-48-50-example-02',
      49,
      industryPassage,
      [
        '일정한 제약을 두려는',
        '연구 기관을 늘리려는',
        '투자 대상을 확대하려는',
        '지원을 단계적으로 하려는',
      ],
      0,
      'TOPIK II 60회 읽기 49번 / 합격 레시피 253쪽',
    ),
    q(
      'recipe-reading-48-50-example-03',
      50,
      TopikQuestionType.AUTHOR_ATTITUDE,
      industryPassage,
      [
        '기술 발전이 산업 구조 변화에 미칠 영향을 인정하고 있다.',
        '세제 지원 변화가 투자 감소로 이어질 것을 우려하고 있다.',
        '세금 정책이 연구 개발에 미치는 부정적 영향을 비판하고 있다.',
        '신성장 기술에 대한 세제 지원 정책을 긍정적으로 평가하고 있다.',
      ],
      3,
      'TOPIK II 60회 읽기 50번 / 합격 레시피 253쪽',
    ),
  ],
  practice: reading4850Practice,
  sourceReference: '합격 레시피 PDF 252~255쪽',
};
