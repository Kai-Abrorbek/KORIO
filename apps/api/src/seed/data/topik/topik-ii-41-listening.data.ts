import {
  TopikChoiceLayout,
  TopikExamType,
  TopikPublishStatus,
  TopikQuestionType,
  TopikSection,
  TopikVisualTemplate,
} from '../../../topik/schemas/topik-content.schema';
import { presentation, textBlocks } from './topik-seed.helpers';
import {
  TopikExamSeed,
  TopikSeedExam,
  TopikSeedGroup,
  TopikSeedQuestion,
} from './topik-seed.types';
import {
  TopikAnswerKey,
  TopikChoiceTuple,
  topikI37Solution,
} from './topik-i-37.helpers';
import { TOPIK_II_41_LISTENING_AUDIO } from './topik-ii-41-listening.scripts';

type QuestionInput = [number: number, choices: TopikChoiceTuple];

const groupCodeFor = (number: number) => {
  if (number <= 20)
    return `topik-ii-41-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-ii-41-listening-${start}-${start + 1}`;
};

const instructionFor = (number: number) => {
  if (number <= 3)
    return '[01~03] 다음을 듣고 알맞은 그림을 고르십시오. (각 2점)';
  if (number <= 8)
    return '[04~08] 다음 대화를 잘 듣고 이어질 수 있는 말을 고르십시오. (각 2점)';
  if (number <= 12)
    return '[09~12] 다음 대화를 잘 듣고 여자가 이어서 할 행동으로 알맞은 것을 고르십시오. (각 2점)';
  if (number <= 16)
    return '[13~16] 다음을 듣고 내용과 일치하는 것을 고르십시오. (각 2점)';
  if (number <= 20)
    return '[17~20] 다음을 듣고 남자의 중심 생각을 고르십시오. (각 2점)';
  const start = number % 2 === 1 ? number : number - 1;
  const format: Record<number, string> = {
    37: '교양 프로그램',
    39: '대담',
    41: '강연',
    43: '다큐멘터리',
    45: '강연',
    47: '대담',
    49: '강연',
  };
  return format[start]
    ? `[${start}~${start + 1}] 다음은 ${format[start]}입니다. 잘 듣고 물음에 답하십시오. (각 2점)`
    : `[${start}~${start + 1}] 다음을 듣고 물음에 답하십시오. (각 2점)`;
};

const promptFor = (number: number) => {
  const prompts: Record<number, string> = {
    21: '남자의 중심 생각으로 맞는 것을 고르십시오.',
    22: '들은 내용으로 맞는 것을 고르십시오.',
    23: '남자는 무엇을 하고 있는지 맞는 것을 고르십시오.',
    24: '들은 내용으로 맞는 것을 고르십시오.',
    25: '남자의 중심 생각으로 맞는 것을 고르십시오.',
    26: '들은 내용으로 맞는 것을 고르십시오.',
    27: '남자가 여자에게 말하는 의도를 고르십시오.',
    28: '들은 내용으로 맞는 것을 고르십시오.',
    29: '남자는 누구인지 맞는 것을 고르십시오.',
    30: '들은 내용으로 맞는 것을 고르십시오.',
    31: '남자의 생각으로 맞는 것을 고르십시오.',
    32: '남자의 태도로 맞는 것을 고르십시오.',
    33: '무엇에 대한 내용인지 맞는 것을 고르십시오.',
    34: '들은 내용으로 맞는 것을 고르십시오.',
    35: '남자는 무엇을 하고 있는지 맞는 것을 고르십시오.',
    36: '들은 내용으로 맞는 것을 고르십시오.',
    37: '여자의 중심 생각으로 맞는 것을 고르십시오.',
    38: '들은 내용과 일치하는 것을 고르십시오.',
    39: '이 대화 앞의 내용으로 알맞은 것을 고르십시오.',
    40: '들은 내용과 일치하는 것을 고르십시오.',
    41: '남자의 중심 생각으로 맞는 것을 고르십시오.',
    42: '들은 내용과 일치하는 것을 고르십시오.',
    43: '이 이야기의 중심 내용으로 맞는 것을 고르십시오.',
    44: '유리구슬에 대한 설명으로 맞는 것을 고르십시오.',
    45: '들은 내용과 일치하는 것을 고르십시오.',
    46: '여자가 말하는 방식으로 가장 알맞은 것을 고르십시오.',
    47: '들은 내용과 일치하는 것을 고르십시오.',
    48: '남자가 말하는 방식으로 가장 알맞은 것을 고르십시오.',
    49: '들은 내용과 일치하는 것을 고르십시오.',
    50: '여자의 태도로 가장 알맞은 것을 고르십시오.',
  };
  return prompts[number] ?? '';
};

const typeFor = (number: number): TopikQuestionType => {
  if (number <= 3) return TopikQuestionType.LISTENING_VISUAL_MATCH;
  if (number <= 8) return TopikQuestionType.LISTENING_RESPONSE;
  if (number <= 12) return TopikQuestionType.LISTENING_NEXT_ACTION;
  if (number <= 16) return TopikQuestionType.LISTENING_CONTENT_MATCH;
  if (number <= 20) return TopikQuestionType.LISTENING_MAIN_IDEA;
  const special: Partial<Record<number, TopikQuestionType>> = {
    21: TopikQuestionType.LISTENING_MAIN_IDEA,
    23: TopikQuestionType.LISTENING_SPEAKER_ACTION,
    25: TopikQuestionType.LISTENING_MAIN_IDEA,
    27: TopikQuestionType.LISTENING_INTENT,
    29: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    31: TopikQuestionType.LISTENING_MAIN_IDEA,
    32: TopikQuestionType.LISTENING_ATTITUDE,
    33: TopikQuestionType.LISTENING_TOPIC,
    35: TopikQuestionType.LISTENING_SPEAKER_ACTION,
    37: TopikQuestionType.LISTENING_MAIN_IDEA,
    39: TopikQuestionType.LISTENING_PRECEDING_CONTEXT,
    41: TopikQuestionType.LISTENING_MAIN_IDEA,
    43: TopikQuestionType.LISTENING_MAIN_IDEA,
    46: TopikQuestionType.LISTENING_ATTITUDE,
    48: TopikQuestionType.LISTENING_ATTITUDE,
    50: TopikQuestionType.LISTENING_ATTITUDE,
  };
  return special[number] ?? TopikQuestionType.LISTENING_CONTENT_MATCH;
};

const sourcePageFor = (number: number) => {
  const pageEnds = [2, 6, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 50];
  return 3 + pageEnds.findIndex((end) => number <= end);
};

// 제41회 TOPIK II B형 1교시 시험지 pp. 3–15, 정답표 p. 1.
// 1–3번 선택지의 문장은 원본 그림에 대한 접근성 설명이다.
const rawQuestions: QuestionInput[] = [
  [
    1,
    [
      '남자와 여자가 식탁에서 식사하고 있습니다.',
      '여자와 남자가 열려 있는 밥솥의 밥을 보고 있습니다.',
      '여자가 가게에서 밥솥을 보고 있습니다.',
      '남자가 밥솥을 수리하고 여자가 보고 있습니다.',
    ],
  ],
  [
    2,
    [
      '남자가 땅을 파고 여자가 묘목을 들고 있습니다.',
      '남자가 묘목을 심고 여자가 보고 있습니다.',
      '남자와 여자가 심은 나무에 물을 주고 있습니다.',
      '남자가 묘목을 들고 여자가 물뿌리개를 들고 있습니다.',
    ],
  ],
  [
    3,
    [
      '연도별 수하물 사고 수가 2007년쯤 최고였다가 2010년에 낮아지고 다시 증가하는 선 그래프입니다.',
      '연도별 수하물 사고 수가 2010년에 최고였다가 이후 감소하는 선 그래프입니다.',
      '수하물 사고 종류가 지연 30%, 파손 45%, 분실 25%인 원형 그래프입니다.',
      '수하물 사고 종류가 지연 30%, 파손 20%, 분실 50%인 원형 그래프입니다.',
    ],
  ],
  [
    4,
    [
      '발표회는 언제 시작해요?',
      '꼭 가려고 했는데 못 갔어요.',
      '도저히 시간이 안 될 것 같아요.',
      '갑자기 무슨 일이 있었던 거예요?',
    ],
  ],
  [
    5,
    [
      '앞으로는 아껴 쓰면 좋겠는데요.',
      '용돈을 많이 주셔서 충분했어요.',
      '아직 남기는 했는데 살 게 있어서요.',
      '필요하면 언제든지 달라고 말할게요.',
    ],
  ],
  [
    6,
    [
      '이번에도 내가 이겼지?',
      '내가 언제 그랬다고 그래?',
      '배드민턴 치는 건 재미가 없어.',
      '계속 화내면 다시는 안 칠 거다.',
    ],
  ],
  [
    7,
    [
      '너무 바쁘셔서 그랬겠지요.',
      '준비하느라 많이 바빴겠어요.',
      '이렇게 초대해 주셔서 감사해요.',
      '집들이가 있는지 모르고 안 갔어요.',
    ],
  ],
  [
    8,
    [
      '그럼 언제쯤 신청서가 완성될까요?',
      '그래요? 대회가 잘 끝나서 다행이군요.',
      '그래요? 학생들이 신청을 많이 했군요.',
      '그럼 기간이 좀 남았으니까 기다려 볼까요?',
    ],
  ],
  [9, ['단추를 단다.', '셔츠를 준다.', '셔츠를 입는다.', '넥타이를 맨다.']],
  [10, ['책을 읽는다.', '커피를 산다.', '산책을 한다.', '기숙사에 간다.']],
  [
    11,
    [
      '서류를 복사한다.',
      '홍보부에 다녀온다.',
      '부장에게 연락한다.',
      '사진을 거래처에 보낸다.',
    ],
  ],
  [
    12,
    [
      '업체에 전화한다.',
      '주문서를 확인한다.',
      '재료를 창고로 옮긴다.',
      '빠진 재료를 알려 준다.',
    ],
  ],
  [
    13,
    [
      '남자는 어머니의 블라우스를 산 적이 있다.',
      '남자는 오늘 어머니와 백화점에 갔다 왔다.',
      '여자는 상품권을 선물로 드리고 싶어 한다.',
      '여자는 오늘 어머니 선물을 사러 갈 것이다.',
    ],
  ],
  [
    14,
    [
      '첫 번째 일정은 도서관 방문이다.',
      '마지막으로 갈 곳은 체육관이다.',
      '식사 후에 기념품을 받을 수 있다.',
      '기숙사를 둘러본 후 동영상을 본다.',
    ],
  ],
  [
    15,
    [
      '다친 사람은 치료를 받고 귀가했다.',
      '승용차 두 대가 충돌해 사고가 났다.',
      '안개 때문에 사고가 난 것으로 보인다.',
      '사고 운전자들에 대한 조사는 끝났다.',
    ],
  ],
  [
    16,
    [
      '여자의 아들은 이 일을 하는 것에 반대했다.',
      '여자는 30년 동안 문화재 알리는 일을 했다.',
      '여자는 퇴직하기 전부터 이 일을 하고 있었다.',
      '여자는 지역 문화 센터에서 매주 강의를 한다.',
    ],
  ],
  [
    17,
    [
      '아이들은 다치면서 크기 마련이다.',
      '놀이터 시설을 관리할 필요가 있다.',
      '아이들은 놀이터에서 뛰어 놀아야 한다.',
      '아이에게는 조심하라고 주의를 줘야 한다.',
    ],
  ],
  [
    18,
    [
      '대중교통을 자주 이용하도록 해야 한다.',
      '대중교통을 이용할 때는 불편해도 참아야 한다.',
      '대중교통 안에서는 다른 사람에게 피해를 주면 안 된다.',
      '대중교통에서 물건을 잃어버리지 않도록 잘 챙겨야 한다.',
    ],
  ],
  [
    19,
    [
      '공중전화의 설치를 늘려야 한다.',
      '휴대 전화 사용 시간을 줄여야 한다.',
      '휴대 전화가 있으면 급할 때 사용할 수 있다.',
      '공중전화는 급할 때 필요하므로 없애면 안 된다.',
    ],
  ],
  [
    20,
    [
      '번역할 때는 한국의 정서를 반영해야 한다.',
      '번역은 원작의 표현을 그대로 옮겨야 한다.',
      '주인공의 성격에 중점을 두고 번역해야 한다.',
      '번역가는 높은 수준의 어휘력을 갖춰야 한다.',
    ],
  ],
  [
    21,
    [
      '매년 고객들의 반응을 살펴야 한다.',
      '이벤트 행사 준비는 빠를수록 좋다.',
      '반응이 좋은 행사는 반복하는 것이 좋다.',
      '전과 다른 새로운 행사를 기획해야 한다.',
    ],
  ],
  [
    22,
    [
      '여자는 새로운 행사를 기획했다.',
      '작년 추석에 한 행사는 효과적이었다.',
      '남자는 다음 주까지 보고를 해야 한다.',
      '올해도 작년과 같은 행사를 할 것이다.',
    ],
  ],
  [
    23,
    [
      '회의 장소를 추천하고 있다.',
      '회의장 시설을 점검하고 있다.',
      '호텔 위치에 대해 알아보고 있다.',
      '회의장을 빌리려고 문의하고 있다.',
    ],
  ],
  [
    24,
    [
      '회의장을 이용하면 음료가 할인된다.',
      '대규모 회의장에만 컴퓨터가 설치되어 있다.',
      '100명 이상이 들어갈 수 있는 회의장은 없다.',
      '직접 방문하면 더 자세한 설명을 들을 수 있다.',
    ],
  ],
  [
    25,
    [
      '자연 환경보다 사람의 안전이 우선이다.',
      '자연과 사람이 어울려서 살아가야 한다.',
      '안전을 우선하다 보면 환경이 훼손될 수도 있다.',
      '사람이 자연을 즐길 수 있는 방법을 찾아야 한다.',
    ],
  ],
  [
    26,
    [
      '사다리 설치 문제에 모두가 동의했다.',
      '과거 인주산에서 안전사고가 발생했다.',
      '경관을 위해 등산을 금지하자는 의견이 있었다.',
      '앞으로 인주산을 찾는 등산객이 감소할 것이다.',
    ],
  ],
  [
    27,
    [
      '정장 기증의 중요성을 알리기 위해',
      '정장 기증 단체의 활동을 홍보하기 위해',
      '정장 기증에 참여할 것을 권유하기 위해',
      '정장 기증이 필요한 이유를 설명하기 위해',
    ],
  ],
  [
    28,
    [
      '남자는 정장을 기증해 본 적이 있다.',
      '기증된 정장은 무료로 빌릴 수 있다.',
      '정장을 기증하기 전에 세탁해야 한다.',
      '여자는 정장이 없어서 빌리려고 한다.',
    ],
  ],
  [29, ['축구 선수', '축구 감독', '축구 경기 심판', '축구 경기 해설가']],
  [
    30,
    [
      '남자는 벌칙을 주지 않으려고 노력한다.',
      '남자는 빠르고 정확한 판단을 해야 한다.',
      '남자는 운동장을 뛰어다니는 것이 부담스럽다.',
      '남자는 중요한 경기에서 뛸 때 보람을 느낀다.',
    ],
  ],
  [
    31,
    [
      '담뱃값 인상은 흡연율 감소에 도움이 된다.',
      '금연은 흡연자들 스스로의 참여가 가장 중요하다.',
      '흡연율 감소를 위해서 더 강력한 정책이 필요하다.',
      '상담 센터보다 담뱃값 인상이 더 효과적인 정책이다.',
    ],
  ],
  [
    32,
    [
      '연구 결과를 비판하고 있다.',
      '금연 정책을 지지하고 있다.',
      '흡연자들의 입장을 대변하고 있다.',
      '상대방의 의견에 일부 동의하고 있다.',
    ],
  ],
  [
    33,
    [
      '올바른 수업 태도',
      '교수법과 수업의 관계',
      '적극적인 반응의 효과',
      '교사와 학생의 대화 방식',
    ],
  ],
  [
    34,
    [
      '학생들은 교사에게 수업 방식에 대해 질문했다.',
      '교사는 교수 방식을 바꾸기 위해 실험에 참가했다.',
      '심리학자는 학생들에게 부정적인 행동을 지시했다.',
      '학생들은 실험 후에 재미있는 수업을 듣게 되었다.',
    ],
  ],
  [
    35,
    [
      '연기의 가치를 평가하고 있다.',
      '능력의 필요성을 역설하고 있다.',
      '끊임없는 도전을 강조하고 있다.',
      '기회의 중요성을 주장하고 있다.',
    ],
  ],
  [
    36,
    [
      '감독은 계속 도전하는 배우들을 찾는다.',
      '자신의 개성에 맞는 배역을 기다려야 한다.',
      '재학 중에는 다양한 오디션 과정을 거친다.',
      '기회를 잡으려면 거절의 고통을 견뎌야 한다.',
    ],
  ],
  [
    37,
    [
      '식물화는 식물을 기록할 수 있는 적절한 방식이다.',
      '식물세밀화는 식물학에서 큰 역할을 담당하고 있다.',
      '식물학계는 식물의 형태를 식별하는 데 힘써야 한다.',
      '식물의 아름다움을 보여주는 식물화가 많아져야 한다.',
    ],
  ],
  [
    38,
    [
      '식물화와 식물세밀화는 그리는 목적이 다르다.',
      '식물세밀화에는 작가의 주관적 감정이 들어 있다.',
      '식물의 형태를 기록하기 위해서 사진을 이용한다.',
      '식물학계에는 무수히 많은 식물세밀화가 존재한다.',
    ],
  ],
  [
    39,
    [
      '가슴을 편 자세는 업무 실적을 올린다.',
      '가슴을 편 자세는 신체 건강에 도움이 된다.',
      '가슴을 편 자세는 능동적인 행동을 유발한다.',
      '가슴을 편 자세는 호르몬의 분비량을 변화시킨다.',
    ],
  ],
  [
    40,
    [
      '웅크린 자세는 위험에 맞서려는 자세이다.',
      '가슴을 편 자세는 남성 호르몬과 관계가 없다.',
      '웅크린 자세는 스트레스 호르몬의 분비량을 줄인다.',
      '가슴을 편 자세는 면접시험에 긍정적 영향을 미친다.',
    ],
  ],
  [
    41,
    [
      '현재의 상황을 제대로 인식해야 한다.',
      '심리적 고통에서 빨리 벗어나야 한다.',
      '잘못된 결정을 반복하지 말아야 한다.',
      '장래성이 있는 사업에 투자해야 한다.',
    ],
  ],
  [
    42,
    [
      '콩코드 사업은 투자한 원금을 되찾았다.',
      '심리적 고통 때문에 잘못된 결정이 지속된다.',
      '콩코드 비용은 개발을 시작할 때 드는 비용이다.',
      '개발 비용을 정확히 파악하면 손해를 보지 않는다.',
    ],
  ],
  [
    43,
    [
      '신라 시대에는 다양한 계급이 존재했다.',
      '신라 시대에는 다른 문화권과 교류가 있었다.',
      '신라 시대에는 문화를 중시하는 사상이 있었다.',
      '신라 시대에는 유리 제작 기술이 크게 발달하였다.',
    ],
  ],
  [
    44,
    [
      '이 유리구슬은 신라에서 만들어졌다.',
      '이 유리구슬은 상위 계층이 사용했다.',
      '이 유리구슬의 크기는 사람 얼굴만 하다.',
      '이 유리구슬에 신라인의 모습이 새겨져 있다.',
    ],
  ],
  [
    45,
    [
      '지진은 드물게 발생하는 자연재해이다.',
      '대지진 이후에 인간은 무기력에 빠졌다.',
      '지진에 대한 사람들의 인식은 바뀌지 않았다.',
      '대지진 이전에는 과학적 조사를 하지 않았다.',
    ],
  ],
  [
    46,
    [
      '지진 발생의 원인을 규명하고 있다.',
      '지진학의 연구 성과를 분석하고 있다.',
      '지진학의 유래에 대해 소개하고 있다.',
      '지진 발생 과정을 단계별로 설명하고 있다.',
    ],
  ],
  [
    47,
    [
      '이 도시는 사회 기반 시설이 부족하다.',
      '이 도시는 국제 행사를 개최한 경험이 없다.',
      '이 도시는 국제 박람회 개최를 희망하고 있다.',
      '이 도시의 박람회 개최 목적은 도시 홍보에 있다.',
    ],
  ],
  [
    48,
    [
      '사업의 추진 방향을 제시하고 있다.',
      '사업 내용의 검토를 요구하고 있다.',
      '사업 추진 방식에 반론을 제기하고 있다.',
      '사업 실행 방법의 타당성을 증명하고 있다.',
    ],
  ],
  [
    49,
    [
      '최근 선거 운동은 개인의 성향을 반영한다.',
      '같은 지역 사람들의 정치 성향은 비슷하다.',
      '후보자를 평가할 수 있는 기회가 늘어나고 있다.',
      '유권자는 후보자의 정보를 다각적으로 얻을 수 있다.',
    ],
  ],
  [
    50,
    [
      '이번 선거 운동의 결과를 낙관하고 있다.',
      '선거 운동의 긍정적 변화를 기대하고 있다.',
      '선거를 대하는 유권자의 태도에 실망하고 있다.',
      '새로운 선거 전략의 부작용에 대해 우려하고 있다.',
    ],
  ],
];

const answerKeys: TopikAnswerKey[] = [
  '2',
  '1',
  '2',
  '2',
  '3',
  '2',
  '1',
  '4',
  '1',
  '3',
  '3',
  '2',
  '1',
  '3',
  '3',
  '4',
  '1',
  '3',
  '4',
  '1',
  '4',
  '2',
  '4',
  '4',
  '1',
  '2',
  '3',
  '1',
  '3',
  '2',
  '2',
  '4',
  '3',
  '4',
  '3',
  '4',
  '2',
  '1',
  '2',
  '4',
  '1',
  '2',
  '2',
  '2',
  '4',
  '3',
  '3',
  '1',
  '1',
  '4',
];

export const TOPIK_II_41_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-ii-listening-41-2015',
  title: {
    ko: '제41회 TOPIK II 듣기',
    uz: '41-TOPIK II tinglash',
    en: '41st TOPIK II Listening',
    ru: '41-й TOPIK II: аудирование',
  },
  description: {
    ko: '제41회 한국어능력시험 TOPIK II 듣기 1번부터 50번까지를 원문 구조대로 구성했습니다.',
    uz: '41-TOPIK II tinglash bo‘limining 1–50-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–50 of the 41st TOPIK II Listening test in the original exam structure.',
    ru: 'Задания 1–50 аудирования 41-го TOPIK II в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.LISTENING,
  year: 2015,
  round: 41,
  durationMinutes: 60,
  totalQuestions: 50,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제41회 한국어능력시험 II B형 듣기',
    edition: '제41회',
    publisher: '국립국제교육원',
    reference: '사용자 제공 제41회 TOPIK II B형 시험지·정답표·듣기 통합 대본',
  },
  publishedAt: new Date('2015-07-19T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 20 }, (_, index) => [index + 1, index + 1] as const),
  ...Array.from(
    { length: 15 },
    (_, index) => [21 + index * 2, 22 + index * 2] as const,
  ),
];

export const TOPIK_II_41_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
  ([startNumber, endNumber], index) => {
    const code = groupCodeFor(startNumber);
    const visual = startNumber <= 3;
    return {
      code,
      order: index + 1,
      startNumber,
      endNumber,
      instruction: textBlocks(instructionFor(startNumber)),
      sharedAudio: TOPIK_II_41_LISTENING_AUDIO[code],
      pointsPerQuestion: 2,
      presentation: presentation(
        visual
          ? TopikVisualTemplate.EXAM_VISUAL_CHOICES
          : TopikVisualTemplate.EXAM_LISTENING,
        visual ? TopikChoiceLayout.TWO_COLUMNS : TopikChoiceLayout.ONE_COLUMN,
      ),
      version: 1,
      isActive: true,
    };
  },
);

export const TOPIK_II_41_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map(([number, choiceTexts]) => {
    const answer = answerKeys[number - 1];
    const visual = number <= 3;
    const choices = choiceTexts.map((text, index) => ({
      key: String(index + 1),
      text,
      order: index + 1,
      imageAssetKey: visual
        ? `topik-ii-41-q${String(number).padStart(2, '0')}-c${index + 1}`
        : '',
      imageAlt: visual ? text : '',
    }));
    const pdfPage = sourcePageFor(number);
    const prompt = promptFor(number);
    return {
      code: `topik-ii-listening-41-q${String(number).padStart(2, '0')}`,
      groupCode: groupCodeFor(number),
      number,
      order: number,
      type: typeFor(number),
      points: 2,
      prompt: prompt ? textBlocks(prompt) : [],
      audio: TOPIK_II_41_LISTENING_AUDIO[groupCodeFor(number)],
      choices,
      correctChoiceKey: answer,
      solution: topikI37Solution(answer, choices[Number(answer) - 1].text),
      presentation: presentation(
        visual
          ? TopikVisualTemplate.EXAM_VISUAL_CHOICES
          : TopikVisualTemplate.EXAM_LISTENING,
        visual ? TopikChoiceLayout.TWO_COLUMNS : TopikChoiceLayout.ONE_COLUMN,
      ),
      tags: ['topik-ii', 'round-41', 'listening', `question-${number}`],
      difficulty: number <= 12 ? 2 : number <= 32 ? 3 : 4,
      source: {
        pdfPage,
        bookPage: pdfPage - 2,
        reference: '제41회 한국어능력시험 II B형 1교시 (듣기, 쓰기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_II_41_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_II_41_LISTENING_EXAM,
  groups: TOPIK_II_41_LISTENING_GROUPS,
  questions: TOPIK_II_41_LISTENING_QUESTIONS,
};
