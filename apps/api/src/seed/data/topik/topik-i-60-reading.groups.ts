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

export const TOPIK_I_60_READING_EXAM: TopikSeedExam = {
  code: 'topik-i-reading-60-2018',
  title: {
    ko: '제60회 TOPIK I 읽기',
    uz: '60-TOPIK I o‘qish',
    en: '60th TOPIK I Reading',
    ru: '60-й TOPIK I: чтение',
  },
  description: {
    ko: '제60회 한국어능력시험 TOPIK I 읽기 31번부터 70번까지를 원문 구조 그대로 구성했습니다.',
    uz: '60-TOPIK I o‘qish bo‘limining 31–70-savollari asl imtihon tuzilishida.',
    en: 'Questions 31–70 of the 60th TOPIK I Reading test in the original exam structure.',
    ru: 'Задания 31–70 чтения 60-го TOPIK I в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_I,
  section: TopikSection.READING,
  year: 2018,
  round: 60,
  durationMinutes: 60,
  totalQuestions: 40,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제60회 한국어능력시험 I B-홀수형 읽기',
    edition: '제60회',
    publisher: '국립국제교육원',
    reference: '사용자 제공 test-paper-paper.pdf 및 answer-keys-answers.pdf',
  },
  publishedAt: new Date('2018-10-21T00:00:00+09:00'),
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

const shoeEmail = {
  ...passage(
    '안녕하세요? 여러 번 전화했는데 통화 중이라서 이메일을 보냅니다. 저는 지난주 수요일에 이 인터넷 쇼핑몰에서 구두를 주문했습니다. 오늘 구두를 받아서 신어 봤는데 너무 불편합니다. 사이즈를 240으로 교환할 수 있을까요? 답장 기다리겠습니다.',
    '김수진 드림',
  ),
  kind: TopikStimulusKind.INFO_CARD,
  title: '‘좋은 구두’ 쇼핑몰 담당자께',
  subtitle: '구두 사이즈 교환 문의',
  infoItems: [
    { label: '받는 사람', value: 'goodshoes@hankuk.com' },
    { label: '보낸 사람', value: 'ksj@daehan.net' },
  ],
  visualVariant: 'official-shoe-email',
};

export const TOPIK_I_60_READING_GROUPS: TopikSeedGroup[] = [
  group(
    'topik-i-60-reading-31-33',
    1,
    31,
    33,
    '[31~33] 무엇에 대한 이야기입니까? <보기>와 같이 알맞은 것을 고르십시오. (각 2점)',
    TopikVisualTemplate.EXAM_SENTENCE,
  ),
  group(
    'topik-i-60-reading-34-39',
    2,
    34,
    39,
    '[34~39] <보기>와 같이 ( )에 들어갈 가장 알맞은 것을 고르십시오.',
    TopikVisualTemplate.EXAM_SENTENCE,
  ),
  group(
    'topik-i-60-reading-40-42',
    3,
    40,
    42,
    '[40~42] 다음을 읽고 맞지 않는 것을 고르십시오. (각 3점)',
    TopikVisualTemplate.EXAM_INFO_CARD,
  ),
  group(
    'topik-i-60-reading-43-45',
    4,
    43,
    45,
    '[43~45] 다음의 내용과 같은 것을 고르십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
  ),
  group(
    'topik-i-60-reading-46-48',
    5,
    46,
    48,
    '[46~48] 다음을 읽고 중심 생각을 고르십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
  ),
  group(
    'topik-i-60-reading-49-50',
    6,
    49,
    50,
    '[49~50] 다음을 읽고 물음에 답하십시오. (각 2점)',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '저는 작년 한국 여행 때 비행기를 처음 탔습니다. 그런데 비행기 안에서 귀가 [[blank:q49]]. 귀가 계속 아파서 여행이 즐겁지 않았습니다. 그래서 이번 베트남 여행 때는 약을 먹고 비행기를 탔습니다. 이번에는 귀가 아프지 않아서 정말 좋았습니다.',
    ),
  ),
  group(
    'topik-i-60-reading-51-52',
    7,
    51,
    52,
    '[51~52] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '한국음악 박물관으로 오십시오. 한국음악 박물관에서는 한국의 옛날 악기를 보고 악기 소리를 들을 수 있습니다. [[blank:q51]] 사진을 보면서 한국음악의 역사에 대해서 알 수 있습니다. 주말에는 다양한 음악 공연을 볼 수 있습니다. 기념품을 살 수 있는 가게도 있습니다.',
    ),
  ),
  group(
    'topik-i-60-reading-53-54',
    8,
    53,
    54,
    '[53~54] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '저는 맛있는 빵을 만드는 사람이 되고 싶습니다. 그래서 학원에서 빵 만드는 것을 배웁니다. 저녁에는 빵 가게에서 아르바이트를 합니다. 빵 가게에서 일을 하면 학원에서 배운 빵을 만들어 볼 수 있고 사람들이 좋아하는 빵을 알 수 있습니다. 제가 일하는 가게는 [[blank:q53]] 곳이라서 손님이 많이 옵니다. 일이 힘들지만 행복합니다.',
    ),
  ),
  group(
    'topik-i-60-reading-55-56',
    9,
    55,
    56,
    '[55~56] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '이제 낚시를 하기 위해서 멀리 가지 않아도 됩니다. 도시에서 [[blank:q55]] 수 있는 ‘낚시 카페’가 있습니다. 이곳에서는 낚시에 필요한 물건을 빌려 주고 낚시하는 방법을 가르쳐 줍니다. 물고기를 잡아서 바로 먹을 수 없지만 집으로 가지고 갈 수 있습니다.',
    ),
  ),
  group(
    'topik-i-60-reading-57-58',
    10,
    57,
    58,
    '[57~58] 다음을 순서대로 맞게 나열한 것을 고르십시오.',
    TopikVisualTemplate.EXAM_SENTENCE_SET,
  ),
  group(
    'topik-i-60-reading-59-60',
    11,
    59,
    60,
    '[59~60] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_INSERTION,
    insertionPassage(
      '사람들은 보통 좋아하는 텔레비전 프로그램을 볼 때 조용히 봅니다. [[marker:m1|㉠]] 그러나 우리 가족은 다릅니다. [[marker:m2|㉡]] 드라마와 뉴스 이야기도 하지만 나와 아내의 회사 이야기도 하고 아이들의 학교 이야기도 합니다. [[marker:m3|㉢]] 텔레비전 소리를 못 들을 때가 있지만 가족들과 함께하는 이 시간이 정말 즐겁습니다. [[marker:m4|㉣]]',
      '텔레비전을 보면서 이야기를 많이 합니다.',
    ),
  ),
  group(
    'topik-i-60-reading-61-62',
    12,
    61,
    62,
    '[61~62] 다음을 읽고 물음에 답하십시오. (각 2점)',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '저는 발표를 잘합니다. 하지만 전에는 발표를 잘하지 못했습니다. 여러 사람들이 저를 보고 있어서 너무 긴장했기 때문입니다. 저는 발표를 잘하고 싶어서 [[blank:q61]] 연습을 많이 했습니다. 혼자서 연습하는 것을 휴대전화로 찍고 잘 못한 부분을 다시 연습했습니다.',
    ),
  ),
  group(
    'topik-i-60-reading-63-64',
    13,
    63,
    64,
    '[63~64] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_INFO_CARD,
    shoeEmail,
  ),
  group(
    'topik-i-60-reading-65-66',
    14,
    65,
    66,
    '[65~66] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '설탕은 단맛을 낼 때 사용합니다. 음식을 오래 먹고 싶을 때 사용하기도 합니다. 그런데 설탕은 음식을 할 때만 쓰는 것은 아닙니다. 꽃병에 물과 함께 설탕을 넣으면 꽃을 오래 볼 수 있습니다. 옷을 빨 때 설탕을 넣으면 하얀색 옷이 더 깨끗해지고 설탕과 레몬을 같이 넣으면 옷이 부드러워집니다. 요리한 후에 손을 [[blank:q65]] 컵을 닦을 때 사용할 수도 있습니다.',
    ),
  ),
  group(
    'topik-i-60-reading-67-68',
    15,
    67,
    68,
    '[67~68] 다음을 읽고 물음에 답하십시오. (각 3점)',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '한국에서는 아이의 첫 번째 생일을 ‘돌’이라고 말합니다. 돌에는 아이가 물건을 잡는 특별한 행사를 합니다. 아이가 공을 잡으면 운동선수, 마이크를 잡으면 연예인이 될 것이라고 생각합니다. 연필은 선생님, 돈은 부자를 의미합니다. 아이 앞에 놓는 물건들의 [[blank:q67]] 모두 아이의 건강과 행복을 생각하는 마음이 들어 있습니다.',
    ),
  ),
  group(
    'topik-i-60-reading-69-70',
    16,
    69,
    70,
    '[69~70] 다음을 읽고 물음에 답하십시오. (각 3점)',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '저는 일 때문에 외국에서 삽니다. 여기는 언제나 여름입니다. 저와 아이들은 한국의 [[blank:q69]]. 특히 예쁜 꽃이 피는 봄과 단풍을 볼 수 있는 가을이 그립습니다. 그런데 오늘 한국에 계시는 아버지에게서 소포가 왔습니다. 아버지가 그리신 고향의 사계절 그림이었습니다. 저는 고향의 사계절을 선물해 주신 아버지가 고마웠습니다.',
    ),
  ),
];
