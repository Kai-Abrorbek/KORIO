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

export const TOPIK_I_64_READING_EXAM: TopikSeedExam = {
  code: 'topik-i-reading-64-2019',
  title: {
    ko: '제64회 TOPIK I 읽기',
    uz: '64-TOPIK I o‘qish',
    en: '64th TOPIK I Reading',
    ru: '64-й TOPIK I: чтение',
  },
  description: {
    ko: '제64회 한국어능력시험 TOPIK I 읽기 31번부터 70번까지를 원문 구조 그대로 구성했습니다.',
    uz: '64-TOPIK I o‘qish bo‘limining 31–70-savollari asl imtihon tuzilishida.',
    en: 'Questions 31–70 of the 64th TOPIK I Reading test in the original exam structure.',
    ru: 'Задания 31–70 чтения 64-го TOPIK I в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_I,
  section: TopikSection.READING,
  year: 2019,
  round: 64,
  durationMinutes: 60,
  totalQuestions: 40,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제64회 한국어능력시험 I B-홀수형 읽기',
    edition: '제64회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 reading-test-paper-paper.pdf 및 reading-answer-keys-answers.pdf',
  },
  publishedAt: new Date('2019-05-19T00:00:00+09:00'),
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

const parkingNotice = {
  ...passage(
    '우리 아파트 지하 주차장 물청소를 다음 주 월요일과 화요일에 할 예정입니다. 청소를 하는 날에는 주차를 할 수 없습니다. 아파트의 다른 주차장을 이용하시기 바랍니다.',
  ),
  kind: TopikStimulusKind.INFO_CARD,
  title: '지하 주차장 청소 안내',
  subtitle: '한국아파트 게시판',
  infoItems: [
    { label: '301동, 302동', value: '7월 29일(월)' },
    { label: '303동, 304동', value: '7월 30일(화)' },
    { label: '청소 시간', value: '09:00~18:00' },
    { label: '공지', value: '2019년 7월 22일(월) · 한국아파트 관리실' },
  ],
  visualVariant: 'official-parking-cleaning-notice',
};

export const TOPIK_I_64_READING_GROUPS: TopikSeedGroup[] = [
  group(
    'topik-i-64-reading-31-33',
    1,
    31,
    33,
    '[31~33] 무엇에 대한 이야기입니까? <보기>와 같이 알맞은 것을 고르십시오. (각 2점)',
    TopikVisualTemplate.EXAM_SENTENCE,
  ),
  group(
    'topik-i-64-reading-34-39',
    2,
    34,
    39,
    '[34~39] <보기>와 같이 ( )에 들어갈 가장 알맞은 것을 고르십시오.',
    TopikVisualTemplate.EXAM_SENTENCE,
  ),
  group(
    'topik-i-64-reading-40-42',
    3,
    40,
    42,
    '[40~42] 다음을 읽고 맞지 않는 것을 고르십시오. (각 3점)',
    TopikVisualTemplate.EXAM_INFO_CARD,
  ),
  group(
    'topik-i-64-reading-43-45',
    4,
    43,
    45,
    '[43~45] 다음의 내용과 같은 것을 고르십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
  ),
  group(
    'topik-i-64-reading-46-48',
    5,
    46,
    48,
    '[46~48] 다음을 읽고 중심 생각을 고르십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
  ),
  group(
    'topik-i-64-reading-49-50',
    6,
    49,
    50,
    '[49~50] 다음을 읽고 물음에 답하십시오. (각 2점)',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '저는 음악 공연 보는 것을 좋아합니다. 하지만 요즘에는 바빠서 공연을 거의 보지 못했습니다. 오늘은 일이 빨리 끝나서 오랜만에 친구와 같이 공연을 [[blank:q49]]. 공연은 정말 신나고 좋았습니다. 공연을 보고 나올 때 행복했습니다.',
    ),
  ),
  group(
    'topik-i-64-reading-51-52',
    7,
    51,
    52,
    '[51~52] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '전에는 문을 열 때 항상 열쇠를 사용했습니다. 그런데 요즘은 꼭 열쇠가 필요한 것은 아닙니다. 자기만 아는 번호를 사용할 수도 있고 카드로 문을 열 수도 있습니다. [[blank:q51]] 사람마다 모두 다른 목소리나 얼굴 모양을 이용하는 방법도 있습니다. 요즘은 이렇게 다양한 방법을 씁니다.',
    ),
  ),
  group(
    'topik-i-64-reading-53-54',
    8,
    53,
    54,
    '[53~54] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '저는 초등학교 때 친하게 지낸 친구가 한 명 있었습니다. 항상 같이 다닌 좋은 친구였습니다. 그런데 초등학교를 [[blank:q53]] 그 친구는 부산으로 이사를 갔습니다. 서로 멀리 떨어져서 만나지 못했고 이제는 연락이 안 됩니다. 그 친구를 찾을 수 있으면 좋겠습니다.',
    ),
  ),
  group(
    'topik-i-64-reading-55-56',
    9,
    55,
    56,
    '[55~56] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '동문시장은 작고 조용한 시장이었습니다. 이곳에는 70년이 된 작은 국수 가게가 하나 있습니다. 얼마 전 이 국수 가게가 방송에 소개되었습니다. 그 후 동문시장의 분위기는 크게 달라졌습니다. 방송에 나온 후 이 국수 가게에 [[blank:q55]] 동문시장도 함께 유명해졌기 때문입니다.',
    ),
  ),
  group(
    'topik-i-64-reading-57-58',
    10,
    57,
    58,
    '[57~58] 다음을 순서대로 맞게 나열한 것을 고르십시오.',
    TopikVisualTemplate.EXAM_SENTENCE_SET,
  ),
  group(
    'topik-i-64-reading-59-60',
    11,
    59,
    60,
    '[59~60] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_INSERTION,
    insertionPassage(
      '저는 피아노 학원에 다닌 지 3년이 되었습니다. [[marker:m1|㉠]] 그렇지만 지금은 여러 노래들을 잘 칠 수 있게 되었습니다. [[marker:m2|㉡]] 피아노를 치면서 좋아하는 가수의 노래를 부르면 정말 즐거워집니다. [[marker:m3|㉢]] 피아노를 배우는 것이 정말 좋습니다. [[marker:m4|㉣]]',
      '처음에는 피아노를 전혀 치지 못했습니다.',
    ),
  ),
  group(
    'topik-i-64-reading-61-62',
    12,
    61,
    62,
    '[61~62] 다음을 읽고 물음에 답하십시오. (각 2점)',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '저는 조금 전에 텔레비전을 보고 깜짝 놀랐습니다. 텔레비전에 제 동생이 크게 나왔기 때문입니다. 동생은 테니스 경기장에서 경기를 보고 있었는데 박수를 치면서 웃고 있었습니다. 동생의 모습을 텔레비전에서 본 것은 처음이었습니다. 매일 보는 동생이지만 동생의 얼굴을 텔레비전에서 보니까 [[blank:q61]] 새로운 기분이 들었습니다.',
    ),
  ),
  group(
    'topik-i-64-reading-63-64',
    13,
    63,
    64,
    '[63~64] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_INFO_CARD,
    parkingNotice,
  ),
  group(
    'topik-i-64-reading-65-66',
    14,
    65,
    66,
    '[65~66] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '얼음 음료는 여름철 인기 메뉴입니다. 그런데 얼음이 녹아서 물이 되면 음료의 맛이 없어집니다. 그래서 얼음 음료를 만들 때는 천천히 녹는 얼음을 넣으면 좋습니다. 큰 얼음은 작은 얼음보다 천천히 녹고, 오래 얼린 얼음도 잠깐 얼린 얼음보다 천천히 녹습니다. 이런 얼음을 넣으면 [[blank:q65]] 처음 음료의 맛을 오래 즐길 수 있습니다.',
    ),
  ),
  group(
    'topik-i-64-reading-67-68',
    15,
    67,
    68,
    '[67~68] 다음을 읽고 물음에 답하십시오. (각 3점)',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '태풍은 보통 7월부터 9월까지 많이 생깁니다. 이런 태풍들도 이름이 있는데 그 중에는 한국어로 된 이름도 있습니다. 태풍의 이름은 태풍이 지나가는 곳에 있는 열네 개 나라에서 만들고 있습니다. 한국도 2000년부터 태풍의 이름을 [[blank:q67]]. 한국어로 이름을 만들 때는 다른 나라 사람들도 발음하기 쉬운 단어를 고릅니다.',
    ),
  ),
  group(
    'topik-i-64-reading-69-70',
    16,
    69,
    70,
    '[69~70] 다음을 읽고 물음에 답하십시오. (각 3점)',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '몇 달 전, 우리 집 앞에서 떨고 있는 작고 마른 강아지를 보았습니다. 저는 그 강아지가 너무 불쌍해 보였습니다. 저는 강아지를 집으로 데려와 먹을 것을 주고 잠도 재워 주었습니다. 그때부터 주인을 찾고 있는데 아직도 주인이 나타나지 않습니다. 그 강아지는 이제 [[blank:q69]] 저의 좋은 친구가 되었습니다. 강아지와 헤어지기 싫습니다.',
    ),
  ),
];
