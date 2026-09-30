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
import { TOPIK_II_52_LISTENING_AUDIO } from './topik-ii-52-listening.scripts';

type QuestionInput = [number: number, choices: TopikChoiceTuple];

const groupCodeFor = (number: number) => {
  if (number <= 20)
    return `topik-ii-52-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-ii-52-listening-${start}-${start + 1}`;
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
    21: '남자의 중심 생각으로 알맞은 것을 고르십시오.',
    22: '들은 내용으로 맞는 것을 고르십시오.',
    23: '남자가 무엇을 하고 있는지 고르십시오.',
    24: '들은 내용으로 맞는 것을 고르십시오.',
    25: '남자의 중심 생각으로 알맞은 것을 고르십시오.',
    26: '들은 내용으로 맞는 것을 고르십시오.',
    27: '남자가 여자에게 말하는 의도를 고르십시오.',
    28: '들은 내용으로 맞는 것을 고르십시오.',
    29: '남자는 누구인지 맞는 것을 고르십시오.',
    30: '들은 내용으로 맞는 것을 고르십시오.',
    31: '남자의 생각으로 알맞은 것을 고르십시오.',
    32: '남자의 태도로 알맞은 것을 고르십시오.',
    33: '무엇에 대한 내용인지 맞는 것을 고르십시오.',
    34: '들은 내용으로 맞는 것을 고르십시오.',
    35: '남자는 무엇을 하고 있는지 고르십시오.',
    36: '들은 내용으로 맞는 것을 고르십시오.',
    37: '여자의 중심 생각으로 알맞은 것을 고르십시오.',
    38: '들은 내용과 일치하는 것을 고르십시오.',
    39: '이 담화 앞의 내용으로 알맞은 것을 고르십시오.',
    40: '들은 내용과 일치하는 것을 고르십시오.',
    41: '이 강연의 중심 내용으로 맞는 것을 고르십시오.',
    42: '들은 내용과 일치하는 것을 고르십시오.',
    43: '이 이야기의 중심 내용으로 맞는 것을 고르십시오.',
    44: '나방에 대한 설명으로 맞는 것을 고르십시오.',
    45: '들은 내용과 일치하는 것을 고르십시오.',
    46: '여자가 말하는 방식으로 가장 알맞은 것을 고르십시오.',
    47: '들은 내용과 일치하는 것을 고르십시오.',
    48: '남자의 태도로 가장 알맞은 것을 고르십시오.',
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
  const pageEnds = [2, 5, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 50];
  return 5 + pageEnds.findIndex((end) => number <= end);
};

// 제52회 TOPIK II B-홀수형 1교시 시험지 pp. 5–17, 정답표 p. 1.
// 1–3번 선택지의 문장은 원본 그림에 대한 접근성 설명이다.
const rawQuestions: QuestionInput[] = [
  [
    1,
    [
      '의사가 진료실에서 환자의 배를 살펴보고 있다.',
      '병원 접수대에서 직원이 남자에게 접수 서류를 내밀고 있다.',
      '의사가 병실의 환자에게 주사액을 걸어 주고 있다.',
      '병원 휴게실에서 두 사람이 앉아 대화하고 있다.',
    ],
  ],
  [
    2,
    [
      '여자가 설거지를 하고 남자는 청소기를 잡고 서 있다.',
      '남자가 거실을 청소하고 여자는 식탁에 앉아 있다.',
      '남자가 설거지를 하고 여자는 식탁에서 차를 마신다.',
      '남녀가 식탁에 마주 앉아 함께 차를 마신다.',
    ],
  ],
  [
    3,
    [
      '생활체육 참여율이 2014년 이후 감소했다가 다시 증가하는 선 그래프.',
      '생활체육 참여율이 2014년부터 2016년까지 계속 증가하는 선 그래프.',
      '운동별 참여율이 걷기 60%, 헬스 25%, 등산 15%인 원 그래프.',
      '운동별 참여율이 헬스 60%, 등산 25%, 걷기 15%인 원 그래프.',
    ],
  ],
  [
    4,
    [
      '찾아서 다행이네요.',
      '천천히 잘 찾아봐요.',
      '가방을 찾고 있는데요.',
      '아무리 찾아도 없어서요.',
    ],
  ],
  [
    5,
    [
      '점심 먹으러 갈래요?',
      '점심시간이 언제예요?',
      '식사 맛있게 하셨어요?',
      '다른 데 가서 먹을까요?',
    ],
  ],
  [
    6,
    [
      '다행히 잘 본 것 같아요.',
      '생각보다 시험이 쉬웠어요.',
      '떨지 말고 면접시험 잘 보세요.',
      '열심히 준비했으니까 잘 될 거예요.',
    ],
  ],
  [
    7,
    [
      '학교 홈페이지에 있던데요.',
      '다음 학기에 신청하려고 해요.',
      '이미 교환 학생 신청을 했어요.',
      '벌써 학생 선발이 끝난 것 같아요.',
    ],
  ],
  [
    8,
    [
      '화장품 좀 주문하려고 하는데요.',
      '그럼 언제쯤 다시 받을 수 있을까요?',
      '이 화장품 써 보니까 정말 좋은데요.',
      '주문하신 날짜를 말씀해 주시겠어요?',
    ],
  ],
  [9, ['옷을 맡긴다.', '코트를 산다.', '세탁소에 간다.', '우편물을 가져온다.']],
  [
    10,
    [
      '안내 책자를 꺼낸다.',
      '안내 책자를 받는다.',
      '거래처 직원을 만난다.',
      '상자를 책상 밑에 둔다.',
    ],
  ],
  [
    11,
    ['전등을 산다.', '전등을 찾는다.', '전등을 바꾼다.', '전등을 가져온다.'],
  ],
  [
    12,
    [
      '현황을 확인한다.',
      '부장님께 보고한다.',
      '인사과에 연락한다.',
      '지원자 명단을 본다.',
    ],
  ],
  [
    13,
    [
      '남자는 모임에 참석했다.',
      '여자는 교통사고를 당했다.',
      '여자는 어제 모임에 안 갔다.',
      '남자는 얼마 전에 자동차를 샀다.',
    ],
  ],
  [
    14,
    [
      '이 세일 행사는 어제부터 시작했다.',
      '모든 고객에게 양말을 선물로 준다.',
      '선물을 받으려면 행사장으로 가야 한다.',
      '행사장에 가면 청바지를 만 원에 살 수 있다.',
    ],
  ],
  [
    15,
    [
      '비는 오늘 밤에 그칠 것이다.',
      '제주 지역에는 눈이 내릴 것이다.',
      '모레는 기온이 떨어져 추워질 것이다.',
      '내일 낮부터 전국적으로 비가 올 것이다.',
    ],
  ],
  [
    16,
    [
      '여자는 한 달 전에 다리를 다쳤다.',
      '여자는 운동을 시작한 지 1년이 됐다.',
      '여자는 지금 다른 나라에서 선수 생활을 한다.',
      '여자는 처음에 팀 동료들과 사이가 안 좋았다.',
    ],
  ],
  [
    17,
    [
      '결혼식을 하는 데 너무 많은 돈을 쓰면 안 된다.',
      '결혼은 많은 사람들의 축하를 받으면서 해야 한다.',
      '결혼식 장소는 사람들이 찾아오기 편한 곳이 좋다.',
      '결혼을 결정할 때 가족들의 의견을 고려해야 한다.',
    ],
  ],
  [
    18,
    [
      '회사 일은 회사에서 끝내야 한다.',
      '소비자들의 의견을 잘 들어야 한다.',
      '일을 같이 하는 사람들과 잘 지내야 한다.',
      '발표 내용은 짧고 분명하게 하는 것이 좋다.',
    ],
  ],
  [
    19,
    [
      '물건은 마트에서 사는 것이 싸다.',
      '물건은 조금씩 사면 돈이 더 든다.',
      '물건은 가격이 쌀 때 사 두어야 한다.',
      '물건은 필요할 때 조금씩 사는 게 좋다.',
    ],
  ],
  [
    20,
    [
      '노래를 하는 사람은 정기적으로 앨범을 내야 한다.',
      '음악을 만들 때는 여러 악기를 사용하는 것이 좋다.',
      '악기 없이 가수의 목소리만으로도 아름다운 음악이 된다.',
      '혼자 노래하는 것보다 여럿이 모여 노래하는 것이 좋다.',
    ],
  ],
  [
    21,
    [
      '우산이 홍보에 더 효과적이다.',
      '우산을 만들 때 색깔이 중요하다.',
      '수첩에 학교 이름이 들어가야 한다.',
      '수첩에 메모하는 습관을 길러야 한다.',
    ],
  ],
  [
    22,
    [
      '올해 처음으로 홍보 용품을 만들었다.',
      '홍보 용품으로 수첩을 제작할 예정이다.',
      '여자는 남자에게 홍보 용품을 보여 줬다.',
      '홍보 용품의 색깔은 다음에 정하기로 했다.',
    ],
  ],
  [
    23,
    [
      '박물관 관람 예약을 하고 있다.',
      '박물관의 위치를 안내하고 있다.',
      '박물관 이용에 대해 문의하고 있다.',
      '박물관에 사전 예약을 확인하고 있다.',
    ],
  ],
  [
    24,
    [
      '이 박물관의 관람권은 환불 받을 수 없다.',
      '이 박물관에는 음식을 가지고 들어갈 수 없다.',
      '이 박물관은 표를 예매하지 않아도 이용이 가능하다.',
      '이 박물관에서는 자체적으로 식당을 운영하고 있다.',
    ],
  ],
  [
    25,
    [
      '기업은 시민 영웅을 채용해야 한다.',
      '기업은 사회에 도움이 되는 일에 앞장서야 한다.',
      '시민 영웅은 사회를 위해 자신을 희생해야 한다.',
      '언론은 숨어 있는 시민 영웅을 찾아 알려야 한다.',
    ],
  ],
  [
    26,
    [
      '이 기업에 입사한 수상자가 있다.',
      '이 상은 시상식을 따로 하지 않는다.',
      '이 남자는 최근에 시민 영웅상을 받았다.',
      '이 상은 시민들이 기부금을 모아 만들었다.',
    ],
  ],
  [
    27,
    [
      '임시 공휴일을 지정하게 된 이유를 알려 주기 위해',
      '임시 공휴일에 못 쉬는 것에 대한 불만을 제기하기 위해',
      '임시 공휴일이 회사 운영에 미치는 영향을 파악하기 위해',
      '임시 공휴일 지정으로 얻을 수 있는 효과를 강조하기 위해',
    ],
  ],
  [
    28,
    [
      '유치원은 임시 공휴일에 쉬지 않는다.',
      '남자는 임시 공휴일에 여행을 가려고 한다.',
      '여자는 아이를 맡길 곳이 없어서 걱정하고 있다.',
      '정부는 이번에 처음으로 임시 공휴일을 지정했다.',
    ],
  ],
  [
    29,
    [
      '식물의 향기를 분석하는 사람',
      '문제가 생긴 식물을 관리하는 사람',
      '식물의 재배 방법을 연구하는 사람',
      '식물을 활용해 사람들을 치료하는 사람',
    ],
  ],
  [
    30,
    [
      '남자는 식물의 향기를 이용해 약을 만든다.',
      '정원에서 재배하는 식물은 판매하지 않는다.',
      '남자는 환자들에게 정원 가꾸는 법을 배웠다.',
      '식물을 재배하는 활동은 운동 능력을 향상시킨다.',
    ],
  ],
  [
    31,
    [
      '유동 인구가 많은 곳에 매장을 만들어야 한다.',
      '매장의 임대료가 매년 상승하는 것은 바람직하지 않다.',
      '지역에 따라 동일 제품의 가격이 다른 것은 불합리하다.',
      '매장의 관리 비용을 고려하여 커피 값을 책정해야 한다.',
    ],
  ],
  [
    32,
    [
      '현재의 상황을 비판하고 있다.',
      '자신의 주장을 합리화하고 있다.',
      '문제에 대한 해결책을 제시하고 있다.',
      '상대방의 의견을 긍정적으로 평가하고 있다.',
    ],
  ],
  [
    33,
    [
      '지명이 만들어진 배경',
      '지명을 연구하는 이유',
      '지명을 분류하는 방법',
      '지명이 변천하는 과정',
    ],
  ],
  [
    34,
    [
      '토끼실은 지형이 토끼의 귀 모양을 닮은 곳이다.',
      '두물머리는 한강의 물길이 하나로 합쳐지는 곳이다.',
      '소목은 소를 많이 키우는 지역에 붙여진 이름이다.',
      '땅끝마을은 한국의 가장 남쪽 끝에 있는 섬 이름이다.',
    ],
  ],
  [
    35,
    [
      '졸업생들의 업적을 소개하고 있다.',
      '전문 지식의 습득을 강조하고 있다.',
      '인격 함양의 중요성을 당부하고 있다.',
      '생명과학의 발전 가능성을 진단하고 있다.',
    ],
  ],
  [
    36,
    [
      '이 학교의 졸업생들은 해외 진출에 어려움을 겪고 있다.',
      '이 학교는 앞으로 선후배 간의 교류를 위해 노력할 것이다.',
      '이 학교는 과학 분야에서 세계 10위권 진입을 앞두고 있다.',
      '이 학교의 학생들은 재학 중에 현장에서 실습할 기회가 있다.',
    ],
  ],
  [
    37,
    [
      '숙면을 돕는 보조 용품이 다양해져야 한다.',
      '수면 장애는 인간의 심리에 영향을 미친다.',
      '불면증 치료법 개발에 적극적으로 나서야 한다.',
      '수면 장애가 생긴 원인을 파악하는 것이 중요하다.',
    ],
  ],
  [
    38,
    [
      '수면 보조 용품은 심리적인 문제를 해결해 준다.',
      '수면 산업의 시장 규모가 빠르게 확대되고 있다.',
      '수면 산업은 생활 습관을 바꾸는 것을 목적으로 한다.',
      '수면 보조 용품 사용은 장기적인 측면에서 효과가 있다.',
    ],
  ],
  [
    39,
    [
      '서울시에서 차도를 줄이고 인도를 넓혔다.',
      '서울시에서 불법 주차 단속을 강화하고 있다.',
      '서울시가 주민 설명회에 소극적으로 임하고 있다.',
      '서울시가 일방통행로를 양방향 도로로 변경하기로 했다.',
    ],
  ],
  [
    40,
    [
      '이 사업으로 차량 흐름이 원활해진 곳이 있다.',
      '이 사업의 시행에 반대하는 주민들이 늘고 있다.',
      '이 사업은 주차 공간 부족이라는 문제를 남겼다.',
      '이 사업에서는 도로의 제한 속도를 낮추는 방안을 검토 중이다.',
    ],
  ],
  [
    41,
    [
      '방백은 배우의 실력을 판단하는 중요한 요소이다.',
      '관객들은 방백보다 배우의 연기에 집중해야 한다.',
      '방백은 관객이 등장인물을 이해하는 데 도움이 된다.',
      '관객들은 방백의 내용을 파악하려는 노력을 해야 한다.',
    ],
  ],
  [
    42,
    [
      '방백은 관객들의 반응을 유도하기 위해 사용된다.',
      '현대극에서는 배우가 방백을 하는 것이 허용된다.',
      '19세기 말에는 연극에서 방백이 활발히 활용되었다.',
      '방백은 부자연스러워서 로마 시대에는 사용되지 않았다.',
    ],
  ],
  [
    43,
    [
      '나방에 대해 잘못 알려져 있는 부분이 많다.',
      '사람들은 나방의 유해성에 관심을 가져 왔다.',
      '나방과 나비는 유사한 행동 양식을 가지고 있다.',
      '나방의 애벌레는 생태계에서 중요한 역할을 한다.',
    ],
  ],
  [
    44,
    [
      '나방의 애벌레는 새들에게 피해를 입힌다.',
      '나방은 나비와 달리 꽃가루를 모으지 않는다.',
      '나방의 몸에 있는 가루는 우리 몸에 해롭지 않다.',
      '나방은 개체 수가 많아서 숲의 생태계를 위협한다.',
    ],
  ],
  [
    45,
    [
      '우유 단백질 포장재는 산소 차단율이 높다.',
      '탄수화물 포장재는 환경오염의 주된 원인이다.',
      '탄수화물 포장재의 미세 구멍을 줄이는 데 성공했다.',
      '우유 단백질 포장재는 음식으로 만든 최초의 포장재이다.',
    ],
  ],
  [
    46,
    [
      '친환경 제품의 문제점을 비판하고 있다.',
      '과학 기술이 지닌 한계점을 지적하고 있다.',
      '환경오염 실태를 자료를 바탕으로 분석하고 있다.',
      '과학 기술 분야의 노력을 예를 들어 설명하고 있다.',
    ],
  ],
  [
    47,
    [
      '미래 사회를 위한 새로운 복지 모델을 찾았다.',
      '기본 소득을 바라보는 두 가지 입장이 존재한다.',
      '많은 나라에서 국민들에게 기본 소득을 지급하고 있다.',
      '기본 소득은 노동에 대한 최소한의 대가를 보장하는 것이다.',
    ],
  ],
  [
    48,
    [
      '기본 소득의 효과에 대한 결론을 유보하고 있다.',
      '기본 소득이 노동에 미칠 영향을 우려하고 있다.',
      '기본 소득이 인간의 본성에 어긋남을 지적하고 있다.',
      '기본 소득의 필요성에 대해 적극적으로 동의하고 있다.',
    ],
  ],
  [
    49,
    [
      '붕당은 초반부터 심한 갈등을 겪었다.',
      '현대의 정당 정치는 탕평책에서 비롯되었다.',
      '탕평책은 여론을 효율적으로 모으기 위한 정책이다.',
      '붕당 정치의 폐단을 해결하기 위해 탕평책이 나왔다.',
    ],
  ],
  [
    50,
    [
      '조선 시대 정치 형태의 문제점을 분석하고 있다.',
      '정치 이념의 부재로 인한 혼란을 경계하고 있다.',
      '정치적 균형을 위한 제도의 필요성을 제기하고 있다.',
      '여론을 바탕으로 한 정치의 효율성을 역설하고 있다.',
    ],
  ],
];

// 제52회 공식 B-홀수형 듣기 정답 및 배점표 p. 1: 전 문항 2점.
const answerKeys: TopikAnswerKey[] = [
  '2',
  '1',
  '2',
  '2',
  '4',
  '4',
  '1',
  '2',
  '3',
  '1',
  '2',
  '3',
  '4',
  '4',
  '3',
  '3',
  '2',
  '4',
  '4',
  '3',
  '1',
  '4',
  '3',
  '3',
  '2',
  '1',
  '2',
  '3',
  '4',
  '4',
  '3',
  '1',
  '1',
  '2',
  '3',
  '4',
  '4',
  '2',
  '1',
  '1',
  '3',
  '2',
  '1',
  '3',
  '1',
  '4',
  '2',
  '1',
  '4',
  '3',
];

export const TOPIK_II_52_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-ii-listening-52-2017',
  title: {
    ko: '제52회 TOPIK II 듣기',
    uz: '52-TOPIK II tinglash',
    en: '52nd TOPIK II Listening',
    ru: '52-й TOPIK II: аудирование',
  },
  description: {
    ko: '제52회 한국어능력시험 TOPIK II 듣기 1번부터 50번까지를 원문 구조대로 구성했습니다.',
    uz: '52-TOPIK II tinglash bo‘limining 1–50-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–50 of the 52nd TOPIK II Listening test in the original exam structure.',
    ru: 'Задания 1–50 аудирования 52-го TOPIK II в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.LISTENING,
  year: 2017,
  round: 52,
  durationMinutes: 60,
  totalQuestions: 50,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제52회 한국어능력시험 II B-홀수형 듣기',
    edition: '제52회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 제52회 TOPIK II B-홀수형 시험지·정답표·듣기 통합 대본',
  },
  publishedAt: new Date('2017-04-16T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 20 }, (_, index) => [index + 1, index + 1] as const),
  ...Array.from(
    { length: 15 },
    (_, index) => [21 + index * 2, 22 + index * 2] as const,
  ),
];

export const TOPIK_II_52_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
  ([startNumber, endNumber], index) => {
    const code = groupCodeFor(startNumber);
    const visual = startNumber <= 3;
    return {
      code,
      order: index + 1,
      startNumber,
      endNumber,
      instruction: textBlocks(instructionFor(startNumber)),
      sharedAudio: TOPIK_II_52_LISTENING_AUDIO[code],
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

export const TOPIK_II_52_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map(([number, choiceTexts]) => {
    const answer = answerKeys[number - 1];
    const visual = number <= 3;
    const choices = choiceTexts.map((text, index) => ({
      key: String(index + 1),
      text,
      order: index + 1,
      imageAssetKey: visual
        ? `topik-ii-52-q${String(number).padStart(2, '0')}-c${index + 1}`
        : '',
      imageAlt: visual ? text : '',
    }));
    const pdfPage = sourcePageFor(number);
    const prompt = promptFor(number);
    return {
      code: `topik-ii-listening-52-q${String(number).padStart(2, '0')}`,
      groupCode: groupCodeFor(number),
      number,
      order: number,
      type: typeFor(number),
      points: 2,
      prompt: prompt ? textBlocks(prompt) : [],
      audio: TOPIK_II_52_LISTENING_AUDIO[groupCodeFor(number)],
      choices,
      correctChoiceKey: answer,
      solution: topikI37Solution(answer, choices[Number(answer) - 1].text),
      presentation: presentation(
        visual
          ? TopikVisualTemplate.EXAM_VISUAL_CHOICES
          : TopikVisualTemplate.EXAM_LISTENING,
        visual ? TopikChoiceLayout.TWO_COLUMNS : TopikChoiceLayout.ONE_COLUMN,
      ),
      tags: ['topik-ii', 'round-52', 'listening', `question-${number}`],
      difficulty: number <= 12 ? 2 : number <= 32 ? 3 : 4,
      source: {
        pdfPage,
        bookPage: pdfPage - 4,
        reference: '제52회 한국어능력시험 II B-홀수형 1교시 (듣기, 쓰기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_II_52_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_II_52_LISTENING_EXAM,
  groups: TOPIK_II_52_LISTENING_GROUPS,
  questions: TOPIK_II_52_LISTENING_QUESTIONS,
};
