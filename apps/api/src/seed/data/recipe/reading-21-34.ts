import {
  TopikQuestionType,
  TopikSection,
} from '../../../topik/schemas/topik-content.schema';
import { RecipeSeed, RecipeSeedQuestion, t4 } from './recipe-seed.types';
import {
  recipeQuestion as q,
  recipeRanking as ranking,
} from './reading-recipe-helpers';

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

const waterPassage =
  '인류 문명은 자연 개발과 자연 보호라는 모순 속에서 발달해 왔다. 그중에서 인류가 소홀히 한 부분은 바로 물이다. 물의 소중함을 잊고 물을 오염시키고 만 것이다. 이에 따라 세계 각지에서 많은 사람들이 수질 오염과 물 부족으로 고통당하고 지역 간, 국가 간 물 분쟁이 끊임없이 일어나서 ___ 있다. 이제 물 부족 문제는 한 국가의 문제만이 아니라 세계적인 문제가 되고 있다.';
const soccerPassage =
  '축구 선수 11명이 운동장에서 경기를 해도 시야가 넓은 선수는 운동장 전체를 보기 때문에 어디가 비어 있고 어디로 공을 보내야 좋을지 잘 볼 수 있다. 이런 선수는 힘을 덜 들이고 효과적인 축구를 한다. 그러나 시야가 좁은 선수는 운동장의 한 부분만을 보기 때문에 항상 이미 수비진이 지키고 있는 곳을 뚫기 위해 ___ 실패만 거듭한다. 우리의 인생도 비슷하다. 따라서 넓게 볼 수 있을 때 삶을 성공적으로 살아갈 수 있다.';

const reading2122Examples: RecipeSeedQuestion[] = [
  blank(
    'recipe-reading-21-22-example-01',
    21,
    '문자 교육은 빠를수록 좋다고 믿는 부모들이 있다. 이들은 자신의 아이가 또래보다 글자를 더 빨리 깨치기를 바라며 문자 교육에 ___ . 그런데 나이가 어린 아이들은 아직 다양한 능력이 완전히 발달하지 못해 온몸의 감각을 동원하여 정보를 얻는다.',
    ['손을 뗀다', '이를 간다', '담을 쌓는다', '열을 올린다'],
    3,
    'TOPIK II 60회 읽기 21번 / 합격 레시피 171쪽',
  ),
  topic(
    'recipe-reading-21-22-example-02',
    22,
    '문자 교육은 빠를수록 좋다고 믿는 부모들이 있다. 그러나 어린아이가 글자를 읽는 것에 집중하면 다른 감각을 사용할 기회가 줄어 능력이 고르게 발달하는 데 어려움이 있을 수 있다.',
    [
      '문자 교육을 하는 방법이 다양해져야 한다.',
      '아이의 감각을 기르는 데 문자 교육이 필요하다.',
      '이른 문자 교육이 아이의 발달을 방해할 수 있다.',
      '아이들은 서로 비슷한 시기에 글자를 배우는 것이 좋다.',
    ],
    2,
    'TOPIK II 60회 읽기 22번 / 합격 레시피 171쪽',
  ),
];

const reading2122Practice: RecipeSeedQuestion[] = [
  blank(
    'recipe-reading-21-22-practice-01',
    1,
    waterPassage,
    ['가슴을 치고', '골머리를 앓고', '고개를 흔들고', '귀를 기울이고'],
    1,
    '합격 레시피 읽기 21~22번 예상문제 1 / 172쪽',
  ),
  topic(
    'recipe-reading-21-22-practice-02',
    2,
    waterPassage.replace('___', '골머리를 앓고'),
    [
      '인류 문명은 물과 함께 성장해 왔다.',
      '물 부족 문제는 모든 국가의 문제가 되었다.',
      '인류는 물의 소중함을 잊고 물을 오염시켰다.',
      '물 부족 현상을 대비하여 물을 아껴 써야 한다.',
    ],
    1,
    '합격 레시피 읽기 21~22번 예상문제 2 / 172쪽',
  ),
  blank(
    'recipe-reading-21-22-practice-03',
    3,
    soccerPassage,
    ['진땀을 빼다가', '자리를 잡다가', '한눈을 팔다가', '첫발을 떼다가'],
    0,
    '합격 레시피 읽기 21~22번 예상문제 3 / 173쪽',
  ),
  topic(
    'recipe-reading-21-22-practice-04',
    4,
    soccerPassage.replace('___', '진땀을 빼다가'),
    [
      '실패하지 않도록 준비하는 자세가 필요하다.',
      '경기에 이기기 위해서 효과적인 방법을 찾아야 한다.',
      '성공적인 삶을 살아가기 위해서는 넓은 시야가 필요하다.',
      '축구 선수는 운동장 전체를 볼 수 있는 능력을 키워야 한다.',
    ],
    2,
    '합격 레시피 읽기 21~22번 예상문제 4 / 173쪽',
  ),
];

export const RECIPE_READING_21_22: RecipeSeed = {
  groupCode: 'reading-21-22',
  section: TopikSection.READING,
  label: t4('읽기 21~22번', "O'qish 21–22", 'Reading 21–22', 'Чтение 21–22'),
  title: t4(
    '중심 생각·관용 표현/속담',
    'Asosiy fikr va ibora',
    'Main idea and idioms',
    'Главная мысль и идиомы',
  ),
  intro: t4(
    '관용 표현을 문맥에 넣고 논설문·설명문의 중심 생각을 찾습니다.',
    'Iborani kontekstga qo‘yib, asosiy fikrni topamiz.',
    'Fit an idiom to context and identify the main idea.',
    'Подберите идиому по контексту и найдите главную мысль.',
  ),
  targetLevel: 4,
  order: 8,
  goldenRecipe: [
    t4(
      '관용 표현과 속담은 평소에 뜻과 연결해 익혀 둡니다.',
      "Iboralar va maqollarni ma'nosi bilan muntazam o'rganing.",
      'Learn idioms and proverbs with their meanings over time.',
      'Регулярно учите идиомы и пословицы вместе со значением.',
    ),
    t4(
      '중심 생각을 드러내는 10가지 표현을 먼저 찾습니다.',
      "Asosiy fikrni ko'rsatuvchi 10 turdagi ifodani toping.",
      'Look first for the ten main-idea expression patterns.',
      'Сначала найдите десять типов выражений главной мысли.',
    ),
    t4(
      '빈칸이 없어도 문장이 자연스러운지 확인한 뒤 문맥에 맞는 관용 표현을 고릅니다.',
      "Bo'shliqsiz gap tabiiyligini tekshirib, kontekstga mos iborani tanlang.",
      'Check that the sentence works without the blank, then choose the idiom fitting the context.',
      'Проверьте основу предложения без пропуска и выберите подходящую идиому.',
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
  examples: reading2122Examples,
  practice: reading2122Practice,
  sourceReference: '합격 레시피 PDF 170~173쪽',
};

const personalPassage1 =
  '동료 교사의 결혼식에 갔을 때 일이다. 다른 동료 교사가 아들을 데리고 결혼식에 참석했다. 아이는 다섯 살 남짓으로 호기심이 왕성하고 활발한 듯 보였다. 결혼식이 끝나고 같은 자리에서 식사를 하게 되었다. 그런데 아이가 갑자기 어떤 사람을 가리키면서 큰 소리로 엄마에게 물었다. “우와, 엄마 저 아저씨 되게 뚱뚱하고 머리가 정말 커요. 이상해요.” 근처에 있던 사람들은 모두 엄마가 어떻게 대답할지 궁금해했다. 혹시 “너도 그렇게 많이 먹으면 저렇게 될 거야.”라고 대답하지는 않을까? 그러나 엄마는 “사람들 중에는 뚱뚱한 사람도 있고 날씬한 사람도 있는 거야. 이상한 게 아니야.”라고 대답했다. 그 대답을 듣는 순간 【나도 모르게 미소가 지어졌다】. 그리고 이때까지 나와 다르다는 이유만으로 남을 제대로 평가하지 않고 무시한 적은 없었는지 되돌아보게 되었다.';
const personalPassage2 =
  '유치원에서 교사로 일한 지 5년이 넘었다. 우리 유치원은 건물 2층에 있어서 수업이 끝나면 계단을 이용해 아이들을 내보냈다. 행여 계단에서 아이들이 다칠세라 수업이 끝날 때면 나뿐만 아니라 모든 동료 교사들이 신경을 썼다. 아이들을 좀 더 안전하고 질서 있게 보내고자 생각해 낸 것이 여자아이들을 먼저 나가게 하는 것이었다. 평소처럼 유치원이 끝나고 나는 “공주님들, 가방 챙겼지요? 자, 그럼 공주님들 먼저 밖으로 나가세요.”라고 말했다. 그런데 한 남자아이가 입술을 삐죽 내밀고 나를 쳐다보았다. 그러고는 손을 들고 “왜 맨날 맨날 공주님들만 먼저 나가요. 왕자님들도 순서를 바꿔 가면서 먼저 가게 해 주세요.”라고 말하는 것이었다. 순간 【나는 할 말을 잃고 말았다】. 남자가 여자에게 양보하는 것이 당연하다는 나의 평소 생각을 되돌아보게 되었고 집에 빨리 가고 싶은 아이의 마음을 헤아리지 못한 것 같았기 때문이다.';

const reading2324Practice = [
  q(
    'recipe-reading-23-24-practice-01',
    1,
    TopikQuestionType.AUTHOR_EMOTION,
    personalPassage1,
    ['흐뭇하다', '뭉클하다', '걱정스럽다', '자랑스럽다'],
    0,
    '합격 레시피 읽기 23~24번 예상문제 1 / 184쪽',
  ),
  content(
    'recipe-reading-23-24-practice-02',
    2,
    personalPassage1,
    [
      '아이는 식사량이 많아서 살이 쪘다.',
      '아이의 엄마는 다른 사람보다 뚱뚱한 편이다.',
      '아이의 엄마는 아이의 버릇없는 행동을 혼냈다.',
      '아이 엄마의 대답 덕분에 나 자신을 반성하게 되었다.',
    ],
    3,
    '합격 레시피 읽기 23~24번 예상문제 2 / 184쪽',
  ),
  q(
    'recipe-reading-23-24-practice-03',
    3,
    TopikQuestionType.AUTHOR_EMOTION,
    personalPassage2,
    ['당황스럽다', '불만스럽다', '걱정스럽다', '사랑스럽다'],
    0,
    '합격 레시피 읽기 23~24번 예상문제 3 / 185쪽',
  ),
  content(
    'recipe-reading-23-24-practice-04',
    4,
    personalPassage2,
    [
      '나는 초등학교에서 일한 지 오 년이 지났다.',
      '유치원이 끝나면 엘리베이터로 학생을 이동시킨다.',
      '유치원 선생님들은 남자아이들을 먼저 집에 보낸다.',
      '나는 남자가 여자에게 양보하는 것을 당연하다고 생각했다.',
    ],
    3,
    '합격 레시피 읽기 23~24번 예상문제 4 / 185쪽',
  ),
];

const fatherPassage =
  '고향에 사는 아버지가 오랜만에 우리 집에 오셨다. 남편이 아버지를 모시고 영화관에 가자고 했지만 나는 아버지가 영화관을 좋아하지 않으실 거라고 단정했다. 그러나 아버지는 영화관에 갈 준비를 하며 옷과 모자를 반복해 살폈고 얼굴에는 미소가 가득했다. 나는 지금껏 내 기준에서 판단한 일들이 얼마나 많았는지 생각하니 【마음이 무거워졌다】.';

export const RECIPE_READING_23_24: RecipeSeed = {
  groupCode: 'reading-23-24',
  section: TopikSection.READING,
  label: t4('읽기 23~24번', "O'qish 23–24", 'Reading 23–24', 'Чтение 23–24'),
  title: t4(
    '개인적인 글',
    'Shaxsiy matn',
    'Personal narrative',
    'Личный рассказ',
  ),
  intro: t4(
    '앞뒤 맥락으로 인물의 심정을 추론하고 행동·말의 세부 내용을 확인합니다.',
    'Oldi-ketin kontekstdan hisni topib, tafsilotni tekshiramiz.',
    'Infer emotion from context and verify narrative details.',
    'Определите эмоцию по контексту и проверьте детали рассказа.',
  ),
  targetLevel: 4,
  order: 9,
  goldenRecipe: [
    t4(
      '밑줄 앞뒤의 사건과 반응을 함께 읽습니다.',
      "Chizilgan joy oldi va keyinini birga o'qing.",
      'Read the event and reaction on both sides of the underline.',
      'Читайте событие и реакцию до и после подчёркнутого места.',
    ),
    t4(
      '감정 어휘의 긍정·부정과 강도를 먼저 구분합니다.',
      "Hissiyot so'zining ijobiy-salbiyligi va kuchini ajrating.",
      'Classify the emotion word by polarity and intensity.',
      'Определите положительность и силу эмоции.',
    ),
    t4(
      '선택지는 등장인물의 말이나 행동을 반대로 바꾸는 경우가 많습니다.',
      "Variantlar ko'pincha qahramon so'zi yoki harakatini teskarisiga o'zgartiradi.",
      'Choices often reverse a character’s words or actions.',
      'Варианты часто меняют слова или действия героя на противоположные.',
    ),
  ],
  grammarSections: [
    {
      key: 'emotion-clues',
      title: t4(
        '심정 판단 단서',
        'Hissiyot belgisi',
        'Emotion clues',
        'Признаки эмоции',
      ),
      entries: ranking([
        ['표정', '미소, 눈물, 얼굴빛'],
        ['몸짓', '고개, 어깨, 손의 움직임'],
        ['대사', '말투와 직접 표현'],
        ['회상·반성', '자신의 행동을 되돌아보는 문장'],
      ]),
      tips: [],
    },
  ],
  examples: [
    q(
      'recipe-reading-23-24-example-01',
      23,
      TopikQuestionType.AUTHOR_EMOTION,
      fatherPassage,
      ['부담스럽다', '불만스럽다', '짜증스럽다', '죄송스럽다'],
      3,
      'TOPIK II 60회 읽기 23번 / 합격 레시피 182~183쪽',
    ),
    content(
      'recipe-reading-23-24-example-02',
      24,
      fatherPassage,
      [
        '아버지는 영화관에 가는 것을 처음부터 거절했다.',
        '나는 아버지의 취향을 내 기준으로 판단했다.',
        '남편은 아버지와 영화관에 가는 것을 반대했다.',
        '아버지는 외출 준비를 귀찮아했다.',
      ],
      1,
      'TOPIK II 60회 읽기 24번 / 합격 레시피 182~183쪽',
    ),
  ],
  practice: reading2324Practice,
  sourceReference: '합격 레시피 PDF 182~185쪽',
};

const headline = (
  code: string,
  number: number,
  titleText: string,
  choices: string[],
  answer: number,
  source: string,
) =>
  q(
    code,
    number,
    TopikQuestionType.HEADLINE_INTERPRETATION,
    titleText,
    choices,
    answer,
    source,
  );

const reading2527Practice = [
  headline(
    'recipe-reading-25-27-practice-01',
    1,
    '수재민을 돕는 따뜻한 손길 이어져',
    [
      '재해를 당한 사람을 돕는 손길이 계속되고 있다.',
      '요즘 수재민을 돕는 사람들이 점차 줄어들고 있다.',
      '피해를 당한 사람을 돕는 사람들이 많아져야 한다.',
      '재해를 입은 사람이 서로 돕는 따뜻한 사회가 필요하다.',
    ],
    0,
    '합격 레시피 읽기 25~27번 예상문제 1 / 179쪽',
  ),
  headline(
    'recipe-reading-25-27-practice-02',
    2,
    '가파르게 상승하던 집값, 주택 가격 안정 대책 발표 이후 주춤',
    [
      '안정되었던 주택 가격이 정부가 대책을 발표하자 크게 상승했다.',
      '주택 가격이 급등하다가 정부가 대책을 발표하고 나서 하락했다.',
      '조금 떨어졌던 주택 가격이 정부의 대책 발표 이후 다시 상승했다.',
      '주택 가격의 급격한 상승세가 정부의 대책 발표 이후 조금 약화됐다.',
    ],
    3,
    '합격 레시피 읽기 25~27번 예상문제 2 / 179쪽',
  ),
  headline(
    'recipe-reading-25-27-practice-03',
    3,
    '경찰, 다음 달부터 신호 위반 차량 단속 강화하기로',
    [
      '경찰은 과속 금지 구역을 점차 확대할 계획이다.',
      '경찰은 다음 달부터 교통 신호 체계를 재정비할 계획이다.',
      '경찰은 음주 운전에 대해 더욱 강력하게 단속할 예정이다.',
      '경찰은 신호를 어기는 차량을 더 엄격하게 단속할 예정이다.',
    ],
    3,
    '합격 레시피 읽기 25~27번 예상문제 3 / 179쪽',
  ),
  headline(
    'recipe-reading-25-27-practice-04',
    4,
    '평년보다 장마 기간 늘어, 단풍 일찍 올 듯',
    [
      '평년에 비해 장마가 길어서 단풍 시기가 빨라질 것이다.',
      '예년에 비해 장마가 짧아서 단풍 시기가 늦춰질 것이다.',
      '평년에 비해 장마가 짧아서 단풍을 구경할 수 있는 시간이 줄 것이다.',
      '예년에 비해 장마가 길어서 단풍을 구경할 수 있는 시간이 늘 것이다.',
    ],
    0,
    '합격 레시피 읽기 25~27번 예상문제 4 / 180쪽',
  ),
  headline(
    'recipe-reading-25-27-practice-05',
    5,
    '느낀 만큼 낸다, 후불제 연극 성공',
    [
      '후불제 관람료에 대해 우려를 느끼는 시선이 적지 않다.',
      '연극을 본 후 관람료를 내는 연극이 점차 증가하고 있다.',
      '관람료를 후불제로 바꾼 후 연극을 보는 관객 수가 늘어났다.',
      '연극을 보고 난 후 감동을 받은 만큼 관람료를 내는 연극이 성공을 거두고 있다.',
    ],
    3,
    '합격 레시피 읽기 25~27번 예상문제 5 / 180쪽',
  ),
  headline(
    'recipe-reading-25-27-practice-06',
    6,
    '이태백, 내일 400m 계주 출전, 대회 첫 3관왕 노려',
    [
      '이태백 선수가 400m 계주에서 동메달을 획득했다.',
      '이태백 선수가 400m 계주에서 세 번째 주자로 나선다.',
      '이태백 선수는 내일 금메달을 따면 3년 연속 우승 기록을 세운다.',
      '이태백 선수가 내일 세 번째 금메달을 따기 위해 400m 계주 경기에 나간다.',
    ],
    3,
    '합격 레시피 읽기 25~27번 예상문제 6 / 180쪽',
  ),
  headline(
    'recipe-reading-25-27-practice-07',
    7,
    '무리한 가사 노동에 주부 건강 ‘빨간불’',
    [
      '힘든 집안일로 인해 주부들의 건강이 좋지 않다.',
      '힘든 집안일을 주부에게만 강요하는 것은 사라져야 한다.',
      '주부들이 건강을 지키려면 집안일을 가족과 나누어 해야 한다.',
      '집안일만 하는 주부들이 건강을 지키려면 운동을 하는 것이 좋다.',
    ],
    0,
    '합격 레시피 읽기 25~27번 예상문제 7 / 181쪽',
  ),
  headline(
    'recipe-reading-25-27-practice-08',
    8,
    '염색약 부작용 속출, 천연 재료 염색약 각광',
    [
      '천연 재료로 만든 염색약이 나왔지만 아직까지 판매율이 높지 않다.',
      '염색약의 재료에 관심이 많아졌지만 부작용은 여전히 지속되고 있다.',
      '염색약 색이 변하면서 천연 재료를 사용해야 한다는 요구가 높아지고 있다.',
      '염색을 한 후 부작용이 잇따라 생기면서 천연 재료의 염색약이 인기를 끌고 있다.',
    ],
    3,
    '합격 레시피 읽기 25~27번 예상문제 8 / 181쪽',
  ),
  headline(
    'recipe-reading-25-27-practice-09',
    9,
    '제주도 태풍과 폭우, 수백 명 관광객 발 묶여',
    [
      '제주도에서 태풍으로 인해 많은 사람들이 다쳤다.',
      '제주도에 비가 많이 와서 관광객들의 방문이 잇따라 취소됐다.',
      '제주도에서 폭우로 인해 관광객들이 여행지를 벗어나지 못했다.',
      '제주도에 비가 많이 와서 아름다운 경치를 즐기려는 관광객들이 몰려들었다.',
    ],
    2,
    '합격 레시피 읽기 25~27번 예상문제 9 / 181쪽',
  ),
];

export const RECIPE_READING_25_27: RecipeSeed = {
  groupCode: 'reading-25-27',
  section: TopikSection.READING,
  label: t4('읽기 25~27번', "O'qish 25–27", 'Reading 25–27', 'Чтение 25–27'),
  title: t4(
    '신문 기사 제목',
    'Gazeta sarlavhasi',
    'News headlines',
    'Газетные заголовки',
  ),
  intro: t4(
    '제목의 압축 어휘와 두 상황의 긍정·부정 관계를 풀어 완전한 문장으로 바꿉니다.',
    'Sarlavhadagi qisqa so‘z va ikki vaziyat munosabatini to‘liq gapga aylantiramiz.',
    'Expand compressed headline vocabulary and the relation between two situations.',
    'Раскройте сжатую лексику заголовка и связь двух ситуаций.',
  ),
  targetLevel: 4,
  order: 10,
  goldenRecipe: [
    t4(
      '제목을 앞부분과 뒷부분으로 나누고 각각 긍정·부정을 표시합니다.',
      "Sarlavhani ikki qismga bo'lib, ijobiy yoki salbiyligini belgilang.",
      'Split the headline and mark each half positive or negative.',
      'Разделите заголовок и отметьте положительность или отрицательность частей.',
    ),
    t4(
      '주춤·뒷전·미지수 같은 압축 어휘를 자연스러운 문장으로 풉니다.',
      "Qisqa sarlavha so'zlarini tabiiy gapga oching.",
      'Expand compressed headline words into a natural sentence.',
      'Раскройте сжатые слова заголовка в естественное предложение.',
    ),
    t4(
      '제목에 없는 원인·의무·전망을 임의로 보탠 선택지는 제외합니다.',
      "Sarlavhada yo'q sabab yoki majburiyatni qo'shgan variantni chiqarib tashlang.",
      'Reject choices that add a cause, obligation or prediction absent from the headline.',
      'Исключите варианты, добавляющие отсутствующую причину, обязанность или прогноз.',
    ),
  ],
  grammarSections: [
    {
      key: 'headline-topics',
      title: t4(
        '신문 기사 주제 Ranking 9',
        'Yangilik mavzulari Ranking 9',
        'Headline topics Ranking 9',
        'Темы заголовков Ranking 9',
      ),
      entries: ranking([
        ['미담', '봉사, 기부, 구조, 이웃의 선행'],
        ['행사', '공연, 전시, 박람회, 대회'],
        ['정책', '시행 예정·최근 시행 정책'],
        ['날씨 정보', '계절과 기온에 따른 사건'],
        ['관람 정보', '공연과 영화 소개'],
        ['스포츠', '경기 결과와 선수 소개'],
        ['건강 정보', '음식과 습관'],
        ['생활 정보', '실생활에 유용한 정보'],
        ['사건·사고', '교통·재난·화재·식중독 등'],
      ]),
      tips: [],
    },
  ],
  examples: [
    headline(
      'recipe-reading-25-27-example-01',
      25,
      '출산율 또 하락, 정부 대책 효과 없어',
      [
        '정부가 대책을 세워 노력했으나 출산율은 다시 떨어졌다.',
        '정부는 출산율이 낮아지지 않도록 효과적인 정책을 마련하였다.',
        '정부의 정책 중 시급히 개선되어야 할 부분이 출산 관련 정책이다.',
        '출산 관련 지원이 축소되자 출산율이 급격히 낮아졌다.',
      ],
      0,
      'TOPIK II 60회 읽기 25번 / 합격 레시피 177쪽',
    ),
    headline(
      'recipe-reading-25-27-example-02',
      26,
      '놀이공원, 수익에만 치중 이용객 안전은 뒷전',
      [
        '이용객들이 놀이공원에 안전시설 점검을 요구했다.',
        '안전을 중시하기 시작한 후 수익이 증가했다.',
        '놀이공원이 수익은 중요시하고 이용객의 안전은 중요시하지 않고 있다.',
        '수익이 감소해 안전에 더 이상 투자하기 어려워졌다.',
      ],
      2,
      'TOPIK II 60회 읽기 26번 / 합격 레시피 178쪽',
    ),
    headline(
      'recipe-reading-25-27-example-03',
      27,
      '제2공장 정상 가동, 반도체 공급 안정은 미지수',
      [
        '제2공장 가동으로 반도체 공급이 안정되었다.',
        '제2공장이 생산을 시작했지만 공급이 안정될지는 불확실하다.',
        '공급 안정을 위해 제2공장 가동이 필수적이다.',
        '공급이 안정되면서 제2공장도 정상 가동되었다.',
      ],
      1,
      'TOPIK II 60회 읽기 27번 / 합격 레시피 178쪽',
    ),
  ],
  practice: reading2527Practice,
  sourceReference: '합격 레시피 PDF 176~181쪽',
};

const reading2831Practice = [
  blank(
    'recipe-reading-28-31-practice-01',
    1,
    '백화점 커피숍의 의자는 대부분 딱딱한 나무로 되어 있다. 이것은 백화점에서 매출을 올리기 위한 전략 중 하나이다. 백화점 커피숍은 드나드는 사람이 많은 곳이기 때문에 손님이 거기서 오래 머무르면 곤란하다. 백화점 입장에서는 고객이 커피숍에서 ___ 백화점에서 물건을 사게 하는 것이 더 중요하기 때문에 의자를 딱딱하게 만드는 것이다.',
    [
      '오래 앉아 있는 것보다',
      '불편함을 느끼는 것보다',
      '사람들과 만나는 것보다',
      '사야 할 물건을 고민하는 것보다',
    ],
    0,
    '합격 레시피 읽기 28~31번 예상문제 1 / 191쪽',
  ),
  blank(
    'recipe-reading-28-31-practice-02',
    2,
    '바닷물은 태양빛이 표면에 닿으면 태양의 빛을 흡수한다. 태양빛에는 빨간색, 주황색, 노란색, 초록색, 파란색, 남색, 보라색 등이 있다. 이 중에서 파란색만 ___. 이것이 바닷물이 파랗게 보이는 원인이다. 또한 하늘이 흐려지게 되면 바닷물은 회색으로 보이게 되는데 이것은 바닷물에 회색이 흡수되지 않고 물속을 통해서 다시 되돌아 나오기 때문이다.',
    [
      '흡수되지 않고 반사가 된다',
      '흡수와 동시에 색이 변한다',
      '바닷물을 통과하는 성질이 있다',
      '바닷물과 잘 어울리기 때문이다',
    ],
    0,
    '합격 레시피 읽기 28~31번 예상문제 2 / 191쪽',
  ),
  blank(
    'recipe-reading-28-31-practice-03',
    3,
    '사람들은 냉장고에 보관된 음식은 안전할 것이라고 생각한다. 그러나 냉장고를 너무 과신하면 식중독에 걸릴 위험성이 있다. 냉장고는 음식을 저온에서 보관하고 약간의 신선도를 유지시켜 줄 뿐이다. 음식이 상하는 기간을 늦춰 줄 뿐이지 부패를 방지하는 것은 아니다. 따라서 냉장고에 음식을 넣을 때는 ___ 해야 한다.',
    [
      '넣기 전에 청소를 하도록',
      '조금씩 나누어 보관하도록',
      '너무 오래 보관하지 않도록',
      '온도를 가장 낮춰서 보관하도록',
    ],
    2,
    '합격 레시피 읽기 28~31번 예상문제 3 / 192쪽',
  ),
  blank(
    'recipe-reading-28-31-practice-04',
    4,
    '날씨가 따뜻해지는 봄이 되면 점심 식사 후에 졸음 때문에 일의 능률이 떨어진다고 말하는 사람이 많다. 이럴 때는 30분을 넘기지 않을 정도로만 낮잠을 자는 것도 괜찮다. 잠깐의 낮잠이 ___ 도와주기 때문이다. 따라서 점심 식사 후 억지로 졸음을 참는 것보다 짧게 낮잠을 자는 것이 효과적이다.',
    [
      '밤에 잠을 푹 잘 수 있도록',
      '오후에 충분히 쉴 수 있도록',
      '밤늦게까지 일을 할 수 있도록',
      '오후에 능률적으로 일할 수 있도록',
    ],
    3,
    '합격 레시피 읽기 28~31번 예상문제 4 / 192쪽',
  ),
];

export const RECIPE_READING_28_31: RecipeSeed = {
  groupCode: 'reading-28-31',
  section: TopikSection.READING,
  label: t4('읽기 28~31번', "O'qish 28–31", 'Reading 28–31', 'Чтение 28–31'),
  title: t4(
    '정보 전달 빈칸',
    "Ma'lumot matnidagi bo'shliq",
    'Information passage blanks',
    'Пропуски в информационном тексте',
  ),
  intro: t4(
    '대응 유형과 종합 유형의 근거를 긴 정보문 안에서 찾습니다.',
    'Uzun matnda moslik va umumlashtirish dalilini topamiz.',
    'Find correspondence and synthesis evidence in a longer information passage.',
    'Найдите соответствие и обобщение в длинном информационном тексте.',
  ),
  targetLevel: 4,
  order: 11,
  goldenRecipe: [
    t4(
      '대응 유형은 유의·반의 관계의 짝을 찾습니다.',
      'Moslik turida sinonim yoki antonim juftini toping.',
      'Find a synonym or antonym pair for correspondence blanks.',
      'Найдите пару синонимов или антонимов.',
    ),
    t4(
      '접속사와 비교 표현으로 대응의 방향을 확인합니다.',
      "Bog'lovchi va taqqoslash orqali yo'nalishni tekshiring.",
      'Use connectives and comparisons to confirm the direction.',
      'Проверьте направление по связкам и сравнению.',
    ),
    t4(
      '종합 유형은 예시 전체를 포함하는 표현을 고릅니다.',
      'Umumlashtirishda barcha misollarni qamragan ifodani tanlang.',
      'Choose the expression that covers all examples.',
      'Выберите выражение, охватывающее все примеры.',
    ),
  ],
  grammarSections: [
    {
      key: 'blank-types',
      title: t4(
        '빈칸 유형',
        "Bo'shliq turlari",
        'Blank types',
        'Типы пропусков',
      ),
      entries: ranking([
        ['대응 유형', '유의어·반의어로 짝을 이루는 내용'],
        ['종합 유형', '여러 내용을 하나로 종합하는 표현'],
      ]),
      tips: [],
    },
  ],
  examples: [
    blank(
      'recipe-reading-28-31-example-01',
      29,
      '“지구가 아파요!”라는 문구가 새겨진 티셔츠나 잘려 나간 나무가 그려진 가방을 구매하는 사람들이 증가하고 있다. 사람들은 그 상품이 ___ 때문에 구매한다. 물건을 사용함으로써 사회 문제에 대한 입장을 표현하고 주변 사람도 메시지에 관심을 갖도록 한다.',
      [
        '세련되게 디자인되었기',
        '천연 소재로 만들어졌기',
        '본인의 체형을 보완해 주기',
        '자신의 가치관을 드러낼 수 있기',
      ],
      3,
      'TOPIK II 60회 읽기 29번 / 합격 레시피 189쪽',
    ),
    blank(
      'recipe-reading-28-31-example-02',
      31,
      '최근 일부 대기업을 중심으로 ‘기업 쪼개기’가 이루어지고 있다. 이는 ___ 의도에서 비롯된 것이다. 대기업은 복잡한 결재 절차를 거쳐야 했지만 의사 결정 속도가 곧 경쟁력이 되자 계열사를 독립적인 회사로 분리하고 각 회사에 최종 결정 권한을 넘기고 있다.',
      [
        '회사의 이미지를 바꾸려는',
        '시장의 흐름을 변화시키려는',
        '기업 간에 정보를 공유하려는',
        '의사 결정 단계를 단순화하려는',
      ],
      3,
      'TOPIK II 52회 읽기 31번 / 합격 레시피 190쪽',
    ),
  ],
  practice: reading2831Practice,
  sourceReference: '합격 레시피 PDF 187~192쪽',
};

const reading3234Examples = [
  content(
    'recipe-reading-32-34-example-01',
    32,
    '하루살이 애벌레는 성충이 되기까지 약 1년을 물속에 살고 성충이 되어서는 1~2주 정도 산다. 애벌레는 물속의 나뭇잎 등을 먹지만 성충이 되면 입이 퇴화한다. 성충은 애벌레 때 몸속에 저장해 둔 영양분을 소모할 뿐 따로 먹이를 섭취하지 못한다.',
    [
      '하루살이의 수명은 하루를 넘지 않는다.',
      '하루살이는 성충이 되는 데 1~2주 정도 걸린다.',
      '하루살이 성충은 애벌레 때 저장한 영양분으로 산다.',
      '하루살이의 입은 성충이 되면서 기능이 발달한다.',
    ],
    2,
    'TOPIK II 60회 읽기 32번 / 합격 레시피 218쪽',
  ),
  content(
    'recipe-reading-32-34-example-02',
    33,
    '눈물은 약 98%가 물이고 나머지 성분은 눈물을 흘리는 상황에 따라 달라진다. 물리적 자극으로 흘리는 눈물에는 세균에 저항하는 단백질이 포함된다. 슬플 때 흘리는 눈물에는 더 많은 산화물질이 들어 있어 체내에 쌓인 물질을 배출하도록 돕는다.',
    [
      '눈물 속 단백질은 기분을 좋게 만든다.',
      '슬퍼서 흘리는 눈물에는 항균 물질이 빠져 있다.',
      '슬플 때 흘리는 눈물 속에는 몸에 나쁜 물질이 포함되어 있다.',
      '물리적 자극의 눈물이 슬플 때 눈물보다 성분이 더 다양하다.',
    ],
    2,
    'TOPIK II 60회 읽기 33번 / 합격 레시피 219쪽',
  ),
  content(
    'recipe-reading-32-34-example-03',
    34,
    '19세기 중반까지는 태양의 위치를 기준으로 시간을 정해 지역마다 시간이 달랐다. 철도 이용이 활발해지면서 승객들이 자기 지역의 시간과 열차 시간이 달라 불편을 겪었다. 이를 해결하고자 캐나다의 한 철도 기사가 지구의 경도를 기준으로 하는 표준시를 제안했다.',
    [
      '표준시 도입의 필요성은 철도 분야에서 제기되었다.',
      '예전에는 철도 회사가 지역의 기준 시간을 결정했다.',
      '캐나다에서는 19세기 이전부터 표준시를 사용했다.',
      '철도 승객들은 표준시 적용으로 불편을 겪었다.',
    ],
    0,
    'TOPIK II 60회 읽기 34번 / 합격 레시피 219쪽',
  ),
];

const reading3234Practice = [
  content(
    'recipe-reading-32-34-practice-01',
    1,
    '변비는 대장 안에 대변이 오래 머물러 제때 배출하지 못하는 증상을 말한다. 이러한 변비는 편식을 하거나 평소 물을 적게 마시는 사람, 불규칙적으로 식사를 하는 사람들이 많이 걸린다. 또 밥과 야채를 너무 적게 먹는 사람들도 걸리기 쉽다. 그 외에 평소 운동량이 적거나 과도한 스트레스를 받는 사람들에게 많이 생긴다. 또 한 가지는 허리를 굽히고 앉거나 비스듬히 앉는 것이 원인이 되기도 한다.',
    [
      '변비는 식사량이 많은 사람이 잘 걸린다.',
      '스트레스를 풀려면 물을 자주 마시는 것이 좋다.',
      '불규칙적인 식사 습관은 소화 기능을 약화시킨다.',
      '변비는 앉는 자세가 안 좋은 사람이 걸리기도 한다.',
    ],
    3,
    '합격 레시피 읽기 32~34번 예상문제 1 / 220쪽',
  ),
  content(
    'recipe-reading-32-34-practice-02',
    2,
    '경찰청은 지난 9월 28일부터 자동차 전 좌석 안전띠 착용 의무화를 실시한다고 밝혔다. 그동안 운전석과 조수석에만 실시하던 안전띠 착용을 뒷좌석까지 확대 적용하기로 한 것이다. 이를 어기면 운전자에게 3만 원의 벌금이 부과된다. 이때 동승자가 13세 미만 어린이인 경우 벌금이 6만 원으로 늘어난다. 그러나 6세 미만 영유아의 경우 유아용 시트가 없을 때 적용되는 벌금을 당분간 부과하지 않기로 했다. 유아용 시트 보급률이 높지 않기 때문에 당분간 계도와 홍보에 주력하겠다고 밝혔다.',
    [
      '어린이는 안전띠를 매지 않아도 된다.',
      '자동차 전 좌석 안전띠 착용을 실시할 예정이다.',
      '안전띠를 착용하지 않으면 운전자는 벌금을 내야 한다.',
      '유아용 시트 보급률을 높이기 위한 방안을 검토하고 있다.',
    ],
    2,
    '합격 레시피 읽기 32~34번 예상문제 2 / 220쪽',
  ),
  content(
    'recipe-reading-32-34-practice-03',
    3,
    '풍산개는 함경북도 풍산 지방의 고유한 품종으로 호랑이 사냥에 이용되었던 전형적인 한국형 수렵견이다. 풍산개라는 이름은 지방의 이름에서 따 온 것이다. 강인하고 영리한 풍산개는 추위와 질병에 강한 것이 특징이다. 성질은 온순하나 일단 적수와 맞서 싸울 때는 당해 낼 만한 짐승이 거의 없을 정도로 몹시 사납다. 8·15 광복 후 북한의 천연기념물로 적극적인 보호 정책 아래 품종이 잘 유지되고 있는 것으로 알려져 있다.',
    [
      '풍산개의 이름은 지명에서 유래하였다.',
      '풍산개는 한국의 대표적인 애완견이다.',
      '풍산개는 한국의 천연기념물로 지정되었다.',
      '풍산개는 성질이 사나워 주인도 다루기 힘들다.',
    ],
    0,
    '합격 레시피 읽기 32~34번 예상문제 3 / 221쪽',
  ),
];

export const RECIPE_READING_32_34: RecipeSeed = {
  groupCode: 'reading-32-34',
  section: TopikSection.READING,
  label: t4('읽기 32~34번', "O'qish 32–34", 'Reading 32–34', 'Чтение 32–34'),
  title: t4(
    '설명문 내용 일치',
    'Izohli matn mazmuni',
    'Expository detail matching',
    'Соответствие пояснительного текста',
  ),
  intro: t4(
    '5급 어휘의 설명문에서 알고 있는 단어와 명시적 근거를 중심으로 세부 내용을 대조합니다.',
    '5-daraja matnida tanish so‘z va aniq dalillarni solishtiramiz.',
    'Compare explicit details in level-5 expository passages.',
    'Сопоставьте явные детали в пояснительных текстах 5-го уровня.',
  ),
  targetLevel: 5,
  order: 12,
  goldenRecipe: [
    t4(
      '모르는 단어를 지우듯 건너뛰고 아는 단어를 중심으로 내용을 추측합니다.',
      "Noma'lum so'zni o'tkazib, tanish so'zlardan mazmunni toping.",
      'Skip unknown words and infer from known ones.',
      'Пропускайте незнакомые слова и выводите смысл по знакомым.',
    ),
    t4(
      '선택지의 주체·시점·원인·결과를 지문과 비교합니다.',
      'Variantdagi ega, vaqt, sabab va natijani matn bilan solishtiring.',
      'Compare subject, time, cause and result with the passage.',
      'Сравните субъект, время, причину и результат с текстом.',
    ),
    t4(
      '지문에 없는 일반 상식은 정답 근거로 사용하지 않습니다.',
      "Matnda yo'q umumiy bilimni dalil sifatida ishlatmang.",
      'Do not use general knowledge absent from the passage as evidence.',
      'Не используйте общие знания, которых нет в тексте.',
    ),
  ],
  grammarSections: [
    {
      key: 'detail-traps',
      title: t4(
        '내용 일치 함정',
        'Mazmun tuzoqlari',
        'Detail-match traps',
        'Ловушки соответствия',
      ),
      entries: ranking([
        ['주체 바꾸기', '행동한 사람이나 대상을 바꾼다'],
        ['시점 바꾸기', '과거·현재·예정을 바꾼다'],
        ['원인·결과 바꾸기', '이유와 결과를 뒤집는다'],
        ['범위 바꾸기', '일부를 전부로, 가능성을 사실로 바꾼다'],
      ]),
      tips: [],
    },
  ],
  examples: reading3234Examples,
  practice: reading3234Practice,
  sourceReference: '합격 레시피 PDF 217~221쪽',
};
