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

export const TOPIK_I_91_READING_EXAM: TopikSeedExam = {
  code: 'topik-i-reading-91-2023',
  title: {
    ko: '제91회 TOPIK I 읽기',
    uz: '91-TOPIK I o‘qish',
    en: '91st TOPIK I Reading',
    ru: '91-й TOPIK I: чтение',
  },
  description: {
    ko: '제91회 한국어능력시험 TOPIK I 읽기 31번부터 70번까지를 원문 구조 그대로 구성했습니다.',
    uz: '91-TOPIK I o‘qish bo‘limining 31–70-savollari asl imtihon tuzilishida.',
    en: 'Questions 31–70 of the 91st TOPIK I Reading test in the original exam structure.',
    ru: 'Задания 31–70 чтения 91-го TOPIK I в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_I,
  section: TopikSection.READING,
  year: 2023,
  round: 91,
  durationMinutes: 60,
  totalQuestions: 40,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제91회 한국어능력시험 I B-홀수형 읽기',
    edition: '제91회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 reading-test-paper-paper.pdf 및 reading-answer-keys-answers.pdf',
  },
  publishedAt: new Date('2023-11-12T00:00:00+09:00'),
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

const orderBoard = {
  ...passage(
    '안녕하세요? 이틀 전에 이 인터넷 쇼핑몰에서 청바지를 주문했습니다. 제가 주말에 여행을 가는데 그 옷을 입으면 좋겠습니다. 주문한 옷을 언제쯤 받을 수 있을까요? 서비스 센터에 전화했는데 안 받아서 여기에 글을 씁니다. 답 부탁드립니다.',
  ),
  kind: TopikStimulusKind.INFO_CARD,
  title: '청바지를 주문했어요.',
  subtitle: '행복옷집 · 묻고 답하기',
  infoItems: [{ label: '사이트', value: 'www.happy-clothes.com' }],
  visualVariant: 'official-online-store-question-board',
};

export const TOPIK_I_91_READING_GROUPS: TopikSeedGroup[] = [
  group(
    'topik-i-91-reading-31-33',
    1,
    31,
    33,
    '[31~33] 무엇에 대한 내용입니까? <보기>와 같이 알맞은 것을 고르십시오. (각 2점)',
    TopikVisualTemplate.EXAM_SENTENCE,
  ),
  group(
    'topik-i-91-reading-34-39',
    2,
    34,
    39,
    '[34~39] <보기>와 같이 ( )에 들어갈 말로 가장 알맞은 것을 고르십시오.',
    TopikVisualTemplate.EXAM_SENTENCE,
  ),
  group(
    'topik-i-91-reading-40-42',
    3,
    40,
    42,
    '[40~42] 다음을 읽고 맞지 않는 것을 고르십시오. (각 3점)',
    TopikVisualTemplate.EXAM_INFO_CARD,
  ),
  group(
    'topik-i-91-reading-43-45',
    4,
    43,
    45,
    '[43~45] 다음을 읽고 내용이 같은 것을 고르십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
  ),
  group(
    'topik-i-91-reading-46-48',
    5,
    46,
    48,
    '[46~48] 다음을 읽고 중심 내용을 고르십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
  ),
  group(
    'topik-i-91-reading-49-50',
    6,
    49,
    50,
    '[49~50] 다음을 읽고 물음에 답하십시오. (각 2점)',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '지영 씨는 제 친한 친구인데 지난달에 결혼했습니다. 저와 제 남편은 지영 씨의 결혼식에 갔습니다. 그래서 오늘 지영 씨 부부가 저와 남편을 집으로 초대했습니다. 우리는 지영 씨의 집을 ([[blank:q49]]) 지영 씨 부부가 만든 음식을 맛있게 먹었습니다. 그리고 결혼식 사진도 함께 봤습니다.',
    ),
  ),
  group(
    'topik-i-91-reading-51-52',
    7,
    51,
    52,
    '[51~52] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '한국대학교에서는 외국인 학생들에게 한복을 빌려주는 서비스를 시작했습니다. 요즘 외국인 학생들은 명절이나 학교에서 행사가 있을 때 한복을 자주 입기 때문입니다. 한복은 1층에 있는 사무실에서 빌릴 수 있습니다. 마음에 드는 한복을 고르고 이름과 전화번호를 써서 냅니다. ([[blank:q51]]) 3일 동안 무료로 한복을 빌릴 수 있습니다.',
    ),
  ),
  group(
    'topik-i-91-reading-53-54',
    8,
    53,
    54,
    '[53~54] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '저는 퇴근 후에 친구들과 매일 배드민턴 모임을 합니다. 우리는 오후 8시에 모여서 배드민턴을 칩니다. 일 끝나고 매일 모이는 것이 ([[blank:q53]]) 친구들과 같이 하니까 재미있습니다. 처음에는 다음 날 아침에 너무 피곤했는데 지금은 괜찮습니다. 몸도 더 건강해지는 것 같습니다.',
    ),
  ),
  group(
    'topik-i-91-reading-55-56',
    9,
    55,
    56,
    '[55~56] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '사람들은 여러 종류의 차를 마십니다. 그중에서 ([[blank:q55]]) 때 마시면 좋은 차가 있습니다. ‘인삼차’는 배가 아플 때 마시면 도움이 됩니다. 또 잠을 못 잘 때는 ‘장미차’를 마시면 좋습니다. 감기에는 ‘유자차’가 좋습니다. 이런 차들은 맛도 좋고 가게에서 쉽게 사 먹을 수 있어서 편합니다.',
    ),
  ),
  group(
    'topik-i-91-reading-57-58',
    10,
    57,
    58,
    '[57~58] 다음을 순서에 맞게 배열한 것을 고르십시오.',
    TopikVisualTemplate.EXAM_SENTENCE_SET,
  ),
  group(
    'topik-i-91-reading-59-60',
    11,
    59,
    60,
    '[59~60] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_INSERTION,
    insertionPassage(
      '저는 태국 친구하고 인주 역사 박물관에 갔습니다. [[marker:m1|㉠]] 친구는 한국어를 잘 못합니다. [[marker:m2|㉡]] 그런데 그 박물관에는 외국어로 설명해 주는 서비스가 있었습니다. [[marker:m3|㉢]] 친구는 태국어 설명 서비스를 신청했습니다. [[marker:m4|㉣]] 설명이 쉽고 재미있어서 친구가 정말 좋아했습니다.',
      '잠시 후에 태국 사람이 와서 태국어로 역사를 설명해 줬습니다.',
    ),
  ),
  group(
    'topik-i-91-reading-61-62',
    12,
    61,
    62,
    '[61~62] 다음을 읽고 물음에 답하십시오. (각 2점)',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '지난주에 새 식당이 문을 열었습니다. 이 식당에는 여러 모양의 멋있는 가구들이 있습니다. 이 가구들은 모두 사장님이 만든 것인데 손님이 살 수도 있습니다. 저는 어제 동생과 그 식당에 처음 갔습니다. 우리는 꽃 모양 테이블에 앉아서 음식을 먹었습니다. 분위기도 좋고 음식도 맛있어서 우리는 다음에 또 ([[blank:q61]]).',
    ),
  ),
  group(
    'topik-i-91-reading-63-64',
    13,
    63,
    64,
    '[63~64] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_INFO_CARD,
    orderBoard,
  ),
  group(
    'topik-i-91-reading-65-66',
    14,
    65,
    66,
    '[65~66] 다음을 읽고 물음에 답하십시오.',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '매월 마지막 주 수요일에 인주시청 앞에서는 ‘책을 읽읍시다!’라는 행사를 합니다. 이 행사는 ([[blank:q65]]) 사람들에게 인기가 많습니다. 새로 나온 책을 구경할 수도 있고 자기가 읽은 책을 다른 사람에게 싸게 팔 수도 있습니다. 유명한 작가와 인사를 나누는 프로그램도 있습니다. 행사에 다녀와서 느낀 것을 홈페이지에 쓰면 선물도 받을 수 있습니다.',
    ),
  ),
  group(
    'topik-i-91-reading-67-68',
    15,
    67,
    68,
    '[67~68] 다음을 읽고 물음에 답하십시오. (각 3점)',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '최근 특별한 어린이 우산이 나왔습니다. 이 우산을 펴면 위쪽에서 빛이 납니다. 그리고 손잡이의 버튼을 누르면 노랫소리가 나옵니다. 이렇게 ([[blank:q67]]) 아이들이 좋아합니다. 보통 우산을 쓰면 아이가 잘 안 보이는데 이 우산을 쓰면 아이가 어디에 있는지 쉽게 알 수 있습니다. 또 튼튼해서 오래 쓸 수 있습니다. 그래서 다른 우산보다 좀 비싸지만 인기가 있습니다.',
    ),
  ),
  group(
    'topik-i-91-reading-69-70',
    16,
    69,
    70,
    '[69~70] 다음을 읽고 물음에 답하십시오. (각 3점)',
    TopikVisualTemplate.EXAM_PASSAGE,
    passage(
      '우리 가족은 일 년 전에 한국에 왔습니다. 저와 아내는 회사에 다니면서 아이를 돌보는 것이 힘들었습니다. 이것을 알고 옆집에 사는 할머니가 아이를 자주 돌봐 주셨습니다. 아이는 할머니를 좋아했습니다. 그런데 할머니가 갑자기 ([[blank:q69]]). 아이는 많이 울었습니다. 할머니와 헤어지는 날에 아이는 “제가 생각날 때 보세요.”라고 하면서 직접 그린 그림을 선물했습니다. 그 그림에는 할머니와 아이가 있었습니다. 할머니는 눈물을 흘리셨습니다.',
    ),
  ),
];
