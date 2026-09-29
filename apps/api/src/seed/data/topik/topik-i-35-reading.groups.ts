import {
  TopikChoiceLayout,
  TopikExamType,
  TopikPublishStatus,
  TopikSection,
  TopikStimulusKind,
  TopikVisualTemplate,
} from '../../../topik/schemas/topik-content.schema';
import {
  insertionPassage,
  passage,
  presentation,
  textBlocks,
} from './topik-seed.helpers';
import { TopikSeedExam, TopikSeedGroup } from './topik-seed.types';

export const TOPIK_I_35_READING_EXAM: TopikSeedExam = {
  code: 'topik-i-reading-35-2014',
  title: {
    ko: '제35회 TOPIK I 읽기',
    uz: '35-TOPIK I o‘qish',
    en: '35th TOPIK I Reading',
    ru: '35-й TOPIK I: чтение',
  },
  description: {
    ko: '제35회 한국어능력시험 TOPIK I 읽기 31번부터 70번까지를 원문 구조대로 구성했습니다.',
    uz: '35-TOPIK I o‘qish bo‘limining 31–70-savollari asl imtihon tuzilishida.',
    en: 'Questions 31–70 of the 35th TOPIK I Reading test in the original exam structure.',
    ru: 'Задания 31–70 чтения 35-го TOPIK I в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_I,
  section: TopikSection.READING,
  year: 2014,
  round: 35,
  durationMinutes: 60,
  totalQuestions: 40,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제35회 한국어능력시험 I B형 읽기',
    edition: '제35회',
    publisher: '국립국제교육원',
    reference: '사용자 제공 test-paper-paper.pdf 및 answer-keys-answers.pdf',
  },
  publishedAt: new Date('2014-07-20T00:00:00+09:00'),
  isActive: true,
};

const group = (
  code: string,
  order: number,
  startNumber: number,
  endNumber: number,
  instruction: string,
  template: TopikVisualTemplate,
  sharedStimulus?: ReturnType<typeof passage>,
): TopikSeedGroup => ({
  code,
  order,
  startNumber,
  endNumber,
  instruction: textBlocks(instruction),
  sharedStimulus,
  pointsPerQuestion: 2,
  presentation: presentation(template, TopikChoiceLayout.ONE_COLUMN),
  version: 1,
  isActive: true,
});

const emailStimulus = {
  ...passage(
    '농구 대회에 참가 신청을 해 주셔서 감사합니다.',
    '이번 주 토요일 오전 10시에 운동장에서 대회가 시작됩니다.',
    '경기에 참가하는 선수들은 9시까지 와 주시기 바랍니다.',
    '비가 오면 학생회관 옆에 있는 체육관에서 경기를 하겠습니다.',
    '그럼, 토요일에 뵙겠습니다.',
    '학생회장 김유미 올림',
  ),
  kind: TopikStimulusKind.INFO_CARD,
  infoItems: [
    {
      label: '받는사람',
      value:
        'sarang@parang.com; koreal@empan.com; minsu@bola.com; ok1213@maver.com; tree@maver.com',
    },
    { label: '제목', value: '유학생 농구 대회' },
    { label: '보낸사람', value: 'yumi@parang.com' },
  ],
  visualVariant: 'official-email',
};

export const TOPIK_I_35_READING_GROUPS: TopikSeedGroup[] = [
  group(
    'topik-i-35-reading-31-33',
    1,
    31,
    33,
    '[31~33] 무엇에 대한 이야기입니까? <보기>와 같이 알맞은 것을 고르십시오. (각 2점)',
    TopikVisualTemplate.EXAM_SENTENCE,
  ),
  group(
    'topik-i-35-reading-34-39',
    2,
    34,
    39,
    '[34~39] <보기>와 같이 ( )에 들어갈 가장 알맞은 것을 고르십시오.',
    TopikVisualTemplate.EXAM_SENTENCE,
  ),
  group(
    'topik-i-35-reading-40-42',
    3,
    40,
    42,
    '[40~42] 다음을 읽고 맞지 않는 것을 고르십시오. (각 3점)',
    TopikVisualTemplate.EXAM_INFO_CARD,
  ),
  group(
    'topik-i-35-reading-43-45',
    4,
    43,
    45,
    '[43~45] 다음의 내용과 같은 것을 고르십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
  ),
  group(
    'topik-i-35-reading-46-48',
    5,
    46,
    48,
    '[46~48] 다음을 읽고 중심 생각을 고르십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
  ),
  group(
    'topik-i-35-reading-49-50',
    6,
    49,
    50,
    '[49~50] 다음을 읽고 물음에 답하십시오. (각 2점)',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '제 친구는 그림 그리는 것을 좋아합니다. 그래서 시간이 있을 때마다 종이컵에 그림을 그립니다. 그리고 친한 사람들에게 종이컵을 선물합니다. [[blank:q49]] 종이컵은 세상에 하나만 있습니다. 친구의 종이컵은 참 예쁩니다.',
    ),
  ),
  group(
    'topik-i-35-reading-51-52',
    7,
    51,
    52,
    '[51~52] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '몇 십 년 후에는 자동차가 하늘로 다닐 것입니다. 그러면 그 자동차를 만드는 사람이 필요합니다. 그리고 하늘에 자동차가 있으면 하늘에서 일하는 교통경찰도 있어야 합니다. 지금은 이런 사람들을 [[blank:q51]] 없습니다. 하지만 앞으로는 이런 사람들을 자주 볼 수 있을 것입니다.',
    ),
  ),
  group(
    'topik-i-35-reading-53-54',
    8,
    53,
    54,
    '[53~54] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '저는 아침에 일어나서 혼자 운동을 합니다. 운동을 하면 즐겁습니다. 그런데 아침에 [[blank:q53]] 일어나는 것이 힘들어서 가끔 운동을 못 합니다. 그래서 다음 주부터는 저녁에 친구와 같이 운동을 하기로 했습니다. 이제 매일 운동을 할 것 같습니다.',
    ),
  ),
  group(
    'topik-i-35-reading-55-56',
    9,
    55,
    56,
    '[55~56] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '저는 안경이 여러 개 있습니다. 그래서 그때그때 다른 안경을 씁니다. 사람을 처음 만날 때는 부드러운 느낌의 안경을 씁니다. 운동을 할 때는 가벼운 안경을 씁니다. [[blank:q55]] 멋있게 보이고 싶을 때는 유행하는 안경을 씁니다. 이렇게 안경을 바꿔서 쓰면 기분이 좋아집니다.',
    ),
  ),
  group(
    'topik-i-35-reading-57-58',
    10,
    57,
    58,
    '[57~58] 다음을 순서대로 맞게 나열한 것을 고르십시오.',
    TopikVisualTemplate.EXAM_SENTENCE_SET,
  ),
  group(
    'topik-i-35-reading-59-60',
    11,
    59,
    60,
    '[59~60] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_INSERTION,
    insertionPassage(
      '라면은 맛있지만 소금이 많이 들어 있어서 건강에 나쁩니다. [[marker:m1|㉠]] 라면의 소금은 보통 국물을 만드는 스프에 있습니다. [[marker:m2|㉡]] 그래도 국물을 먹고 싶으면 스프를 조금만 넣습니다. [[marker:m3|㉢]] 그리고 라면을 끓일 때 스프를 늦게 넣는 것도 소금을 덜 먹는 또 하나의 방법입니다. [[marker:m4|㉣]]',
      '그래서 소금을 적게 먹으려면 라면 국물을 먹지 않는 게 좋습니다.',
    ),
  ),
  group(
    'topik-i-35-reading-61-62',
    12,
    61,
    62,
    '[61~62] 다음을 읽고 물음에 답하십시오. (각 2점)',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '지금은 동전과 지폐를 모두 사용합니다. 하지만 전에는 동전만 사용했습니다. 종이로 만든 지폐는 쉽게 찢어지고 더러워져서 [[blank:q61]] 못합니다. 그리고 가짜 돈을 만들기도 쉽습니다. 그래서 동전보다 지폐를 늦게 사용한 것입니다.',
    ),
  ),
  group(
    'topik-i-35-reading-63-64',
    13,
    63,
    64,
    '[63~64] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_INFO_CARD,
    emailStimulus,
  ),
  group(
    'topik-i-35-reading-65-66',
    14,
    65,
    66,
    '[65~66] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '식혜는 한국의 전통 음료수입니다. 보통 모임이나 잔치에서 [[blank:q65]] 식혜를 마십니다. 이것은 식혜가 소화를 도와주기 때문입니다. 식혜는 달고 맛있어서 많은 사람들이 좋아합니다. 시원하게 마시면 더 좋습니다. 저는 식혜를 만드는 방법이 간단해서 자주 만들어 먹습니다. 하지만 만드는 데 시간이 오래 걸립니다.',
    ),
  ),
  group(
    'topik-i-35-reading-67-68',
    15,
    67,
    68,
    '[67~68] 다음을 읽고 물음에 답하십시오. (각 3점)',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '문제를 풀기 어려울 때는 책상 앞에만 앉아 있지 마십시오. 계속 앉아 있으면 좋은 생각이 [[blank:q67]] 않습니다. 그럴 때는 일어나서 걷는 것이 좋습니다. 걸으려고 꼭 밖으로 [[blank:q68]]. 집 안도 좋고 사무실 안도 괜찮습니다.',
    ),
  ),
  group(
    'topik-i-35-reading-69-70',
    16,
    69,
    70,
    '[69~70] 다음을 읽고 물음에 답하십시오. (각 3점)',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '우리 가족은 [[blank:q69]] 적이 없습니다. 그래서 저는 그동안 할머니께서 노래를 좋아하는 것을 몰랐습니다. 그런데 어젯밤에 할머니께서 공연 초대장을 주셨습니다. 그 공연에서 할머니가 노래를 하실 것입니다. 우리 가족은 공연에 가려고 합니다. 거기에서 할머니의 노래를 처음 듣게 될 것입니다.',
    ),
  ),
];
