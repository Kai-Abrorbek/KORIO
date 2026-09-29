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
import { TOPIK_II_47_LISTENING_AUDIO } from './topik-ii-47-listening.scripts';

type QuestionInput = [number: number, choices: TopikChoiceTuple];

const groupCodeFor = (number: number) => {
  if (number <= 20)
    return `topik-ii-47-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-ii-47-listening-${start}-${start + 1}`;
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
    23: '남자가 무엇을 하고 있는지 맞는 것을 고르십시오.',
    24: '들은 내용으로 맞는 것을 고르십시오.',
    25: '남자의 중심 생각으로 맞는 것을 고르십시오.',
    26: '들은 내용으로 맞는 것을 고르십시오.',
    27: '여자가 남자에게 말하는 의도를 고르십시오.',
    28: '들은 내용으로 맞는 것을 고르십시오.',
    29: '남자는 누구인지 고르십시오.',
    30: '들은 내용으로 맞는 것을 고르십시오.',
    31: '남자의 생각으로 맞는 것을 고르십시오.',
    32: '남자의 태도로 맞는 것을 고르십시오.',
    33: '무엇에 대한 내용인지 맞는 것을 고르십시오.',
    34: '들은 내용으로 맞는 것을 고르십시오.',
    35: '남자는 무엇을 하고 있는지 고르십시오.',
    36: '들은 내용으로 맞는 것을 고르십시오.',
    37: '남자의 중심 생각을 고르십시오.',
    38: '들은 내용과 일치하는 것을 고르십시오.',
    39: '이 담화 앞의 내용으로 알맞은 것을 고르십시오.',
    40: '들은 내용과 일치하는 것을 고르십시오.',
    41: '여자의 중심 생각으로 맞는 것을 고르십시오.',
    42: '들은 내용과 일치하는 것을 고르십시오.',
    43: '이 이야기의 중심 내용으로 맞는 것을 고르십시오.',
    44: '많은 주요 도시가 판의 경계에 있는 이유로 맞는 것을 고르십시오.',
    45: '들은 내용과 일치하는 것을 고르십시오.',
    46: '여자의 태도로 가장 알맞은 것을 고르십시오.',
    47: '들은 내용과 일치하는 것을 고르십시오.',
    48: '남자가 말하는 방식으로 가장 알맞은 것을 고르십시오.',
    49: '들은 내용과 일치하는 것을 고르십시오.',
    50: '여자가 말하는 방식으로 가장 알맞은 것을 고르십시오.',
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

// 제47회 TOPIK II B형 1교시 시험지 pp. 5–17, 정답표 p. 1.
// 1–3번 선택지의 문장은 원본 그림에 대한 접근성 설명이다.
const rawQuestions: QuestionInput[] = [
  [
    1,
    [
      '사무실에서 여자가 남자에게 서류를 건네고 있습니다.',
      '안내 데스크에서 남자가 서류를 든 여자에게 엘리베이터 쪽을 가리키고 있습니다.',
      '남자와 여자가 엘리베이터 안에서 이야기하고 있습니다.',
      '복도에서 남자가 바닥에 떨어진 서류를 줍고 있습니다.',
    ],
  ],
  [
    2,
    [
      '남자가 카페 계산대에서 음료를 주문하고 여자가 옆에 있습니다.',
      '여자가 카페 테이블에 앉아 있고 남자가 그 앞에서 이야기하고 있습니다.',
      '남자가 음료 두 잔을 테이블에 앉은 여자에게 가져오고 있습니다.',
      '남자와 여자가 음료를 들고 카페 밖으로 나가고 있습니다.',
    ],
  ],
  [
    3,
    [
      '2007년부터 2016년까지 20대와 40대의 도서 구매율이 모두 증가한 선 그래프입니다.',
      '2007년부터 2016년까지 20대 도서 구매율은 감소하고 40대 구매율은 증가한 선 그래프입니다.',
      '분야별 판매율은 자기 계발 44%, 문학 28%, 유아 16%, 기타 12%인 그래프입니다.',
      '분야별 판매율은 유아 44%, 자기 계발 28%, 문학 16%, 기타 12%인 그래프입니다.',
    ],
  ],
  [
    4,
    [
      '점심시간이 몇 시예요?',
      '점심 맛있게 드셨어요?',
      '빨리 정리하고 나가죠.',
      '지금은 배가 안 고픈데요.',
    ],
  ],
  [
    5,
    [
      '농구 경기 보러 꼭 오면 좋겠어요.',
      '잘할 수 있을 테니까 걱정하지 마세요.',
      '바빠서 연습 경기에 많이 못 갔거든요.',
      '체육 대회가 끝나고 나니까 피곤하네요.',
    ],
  ],
  [
    6,
    [
      '네. 일할 곳을 찾고 있어요.',
      '네. 제가 대신 해 드릴게요.',
      '네. 좀 알아봐 주면 좋겠어요.',
      '네. 그 친구는 아르바이트해요.',
    ],
  ],
  [
    7,
    [
      '그래요? 그럼 창문을 닫아야겠네요.',
      '정말요? 그럼 에어컨 좀 켜 주세요.',
      '맞아요. 많이 덥지 않아서 다행이에요.',
      '글쎄요. 아마 사무실은 열려 있을 거예요.',
    ],
  ],
  [
    8,
    [
      '참석자 명단은 아까 드렸는데요.',
      '회의에 참석해 주셔서 감사해요.',
      '이쪽 자리로 와서 앉으시면 돼요.',
      '그럼 확실히 정해지면 알려 주세요.',
    ],
  ],
  [
    9,
    [
      '사무실에 전화한다.',
      '컴퓨터를 확인한다.',
      '장학금을 신청한다.',
      '학교 홈페이지를 본다.',
    ],
  ],
  [
    10,
    ['집에 간다.', '자료를 만든다.', '상품을 정리한다.', '두통약을 사러 간다.'],
  ],
  [
    11,
    [
      '자전거를 꺼낸다.',
      '옷을 갈아입는다.',
      '공원에서 운동한다.',
      '동생과 같이 나간다.',
    ],
  ],
  [
    12,
    [
      '카드로 계산한다.',
      '안내 센터에 간다.',
      '배달 신청을 한다.',
      '집에서 물건을 받는다.',
    ],
  ],
  [
    13,
    [
      '여자는 현재 구청에서 일하고 있다.',
      '남자는 프로그램에 대해 알아볼 것이다.',
      '여자는 이 프로그램에 참여한 적이 있다.',
      '남자는 이 프로그램에 대해 들은 적이 없다.',
    ],
  ],
  [
    14,
    [
      '이 열차는 현재 멈춰 있다.',
      '이 열차는 서울역에서 출발했다.',
      '이 열차는 잠시 후에 대전역에 도착한다.',
      '부산으로 가는 KTX 열차가 고장이 났다.',
    ],
  ],
  [
    15,
    [
      '오늘부터 한 달 동안 표를 반값에 판매한다.',
      '작년에도 가족을 위한 할인 티켓을 판매했다.',
      '올해는 작년보다 일찍 야외 수영장을 이용할 수 있다.',
      '티켓을 한 장 사면 티켓 한 장을 더 주는 행사를 한다.',
    ],
  ],
  [
    16,
    [
      '정오의 콘서트는 올해 처음 시작되었다.',
      '극장을 찾는 사람들의 수가 줄어서 걱정이다.',
      '금요일에 카페에서 커피를 마시면 콘서트 티켓을 준다.',
      '한 달에 한 번 지휘자가 음악에 대해 설명하는 시간이 있다.',
    ],
  ],
  [
    17,
    [
      '여행 갈 때는 새 옷을 사야 한다.',
      '쇼핑할 때 가격을 따져 봐야 한다.',
      '옷은 직접 입어 보고 사는 게 좋다.',
      '쇼핑으로 시간을 낭비하면 안 된다.',
    ],
  ],
  [
    18,
    [
      '어릴 때는 여러 번 실수해도 괜찮다.',
      '아이들이 잘못을 해도 예뻐해야 한다.',
      '아이들에게 심하게 말을 하면 안 된다.',
      '아이들에게 자기 잘못을 알게 해야 한다.',
    ],
  ],
  [
    19,
    [
      '연휴에는 여행을 가는 것이 좋다.',
      '기차를 타면 이동 시간을 줄일 수 있다.',
      '차가 많은 연휴에는 조심해서 운전해야 한다.',
      '차로 가면 짐을 많이 실을 수 있어서 편하다.',
    ],
  ],
  [
    20,
    [
      '끊임없이 노력하는 자세가 중요하다.',
      '최고가 되기 위해서는 자신을 믿어야 한다.',
      '성공을 위해서는 창의적인 생각이 필요하다.',
      '식당에 오는 손님들을 첫 번째로 생각해야 한다.',
    ],
  ],
  [
    21,
    [
      '피자 가게의 성공은 맛에 달려 있다.',
      '치킨 가게가 잘되려면 위치가 중요하다.',
      '퇴직 후에도 할 수 있는 일을 찾아야 한다.',
      '여러 사람의 의견을 들어야 성공할 수 있다.',
    ],
  ],
  [
    22,
    [
      '남자는 회사를 퇴직했다.',
      '남자는 시장에서 가게를 운영한다.',
      '여자는 치킨 가게를 하고 싶어 한다.',
      '여자의 친구는 시장에서 치킨 가게를 한다.',
    ],
  ],
  [
    23,
    [
      '등산로의 위치를 확인하고 있다.',
      '호텔까지 가는 길에 대해 묻고 있다.',
      '여행하려는 곳에 숙박 예약을 하고 있다.',
      '호텔에서 진행하는 프로그램에 대해 문의하고 있다.',
    ],
  ],
  [
    24,
    [
      '‘숲속놀이터’는 단체만 이용이 가능하다.',
      '남자는 가족과 3일간 호텔에서 묵을 예정이다.',
      '호텔에서는 가족을 위한 체험 활동을 계획 중이다.',
      '자연 체험 교육은 최대 20명까지 수강이 가능하다.',
    ],
  ],
  [
    25,
    [
      '장애인을 위한 시설을 늘려야 한다.',
      '장애인들에게 세금을 깎아 줘야 한다.',
      '정부는 운동선수의 재활을 도와야 한다.',
      '장애인의 자립을 위한 일자리가 필요하다.',
    ],
  ],
  [
    26,
    [
      '남자는 장애를 극복하고 국가대표가 되었다.',
      '남자는 사고를 당해 축구를 할 수 없게 되었다.',
      '남자는 사업가가 되기 위해 운동을 그만두었다.',
      '남자는 정부 지원을 받기 위해 회사를 설립했다.',
    ],
  ],
  [
    27,
    [
      '기부에 동참한 것에 감사하려고',
      '가족의 소중함을 일깨워 주려고',
      '신발 구매의 의미를 알려 주려고',
      '자부심을 높이는 방법에 대해 조언하려고',
    ],
  ],
  [
    28,
    [
      '이 신발 한 켤레를 사면 한 켤레를 더 준다.',
      '이 신발을 가난한 아이들에게 싸게 판매한다.',
      '여자는 남자에게 이 신발을 선물한 적이 있다.',
      '여자는 신문을 통해서 이 신발에 대해 알게 되었다.',
    ],
  ],
  [
    29,
    [
      '라면을 개발하는 사람',
      '라면을 광고하는 사람',
      '라면을 판매하는 사람',
      '라면을 홍보하는 사람',
    ],
  ],
  [
    30,
    [
      '남자는 평소에도 라면을 즐겨 먹었다.',
      '남자는 유명한 식당에서 요리를 배웠다.',
      '국물 맛의 비결을 알아내기가 쉽지 않았다.',
      '‘왕라면’은 이번 달에 처음으로 판매 1위를 했다.',
    ],
  ],
  [
    31,
    [
      '‘좌석별 가격 차등제’로 영화 관람의 불편이 줄어들었다.',
      '‘좌석별 가격 차등제’로 관객들은 선택의 기회가 늘었다.',
      '‘좌석별 가격 차등제’는 관객 입장에서 합리적인 제도이다.',
      '‘좌석별 가격 차등제’는 극장의 수익을 높이기 위한 제도이다.',
    ],
  ],
  [
    32,
    [
      '새로운 제도의 확대를 염려하고 있다.',
      '새로운 제도의 시행을 촉구하고 있다.',
      '새로운 제도의 문제점을 비판하고 있다.',
      '새로운 제도의 필요성에 공감하고 있다.',
    ],
  ],
  [
    33,
    [
      '기록의 보존 방법',
      '기록연구사의 역할',
      '역사적 기록물의 가치',
      '기록을 해야 하는 이유',
    ],
  ],
  [
    34,
    [
      '기록연구사는 기록의 보존 여부를 결정한다.',
      '모든 기록물은 중요하므로 없애서는 안 된다.',
      '기록물은 수백 년이 지나도 그대로 보존된다.',
      '사라진 자료를 찾아내는 것도 기록연구사의 일이다.',
    ],
  ],
  [
    35,
    [
      '시에서 만든 편의 시설을 소개하고 있다.',
      '시민이 원하는 것이 무엇인지 조사하고 있다.',
      '시민을 위한 정책을 펼칠 것을 다짐하고 있다.',
      '시의 발전을 위해 자신을 지지해 달라고 부탁하고 있다.',
    ],
  ],
  [
    36,
    [
      '이 도시는 전국에서 가장 큰 의료원을 짓고 있다.',
      '이 도시는 이번에 살기 좋은 도시로 선정되었다.',
      '이 남자는 추진 중이던 정책을 모두 마무리 지었다.',
      '이 남자는 여러 번의 도전 끝에 시장으로 선출되었다.',
    ],
  ],
  [
    37,
    [
      '기업은 신입 사원의 능력 개발을 장려해야 한다.',
      '입사하고 싶은 기업의 선발 기준을 파악하고 있어야 한다.',
      '이력서에 있는 개인 정보가 공정한 선발을 방해할 수 있다.',
      '능력 있는 인재가 되기 위해서는 노력하는 자세가 필요하다.',
    ],
  ],
  [
    38,
    [
      '이 남자는 ‘익명이력서’에 대해 부정적이다.',
      '이 남자는 이력서에 사진이 있어야 한다고 본다.',
      '기업들이 사진 없는 이력서 도입을 계속 미루고 있다.',
      '‘익명이력서’로는 지원자의 성별과 나이를 알 수 없다.',
    ],
  ],
  [
    39,
    [
      '다양한 공공장소에 태양광 시설을 설치하고 있다.',
      '많은 기업들이 태양광 시설에 적극적으로 투자하고 있다.',
      '태양광 발전소의 생산성이 생각보다 낮아 문제가 되고 있다.',
      '태양광 발전소 사업자와 주민 사이에 마찰이 빚어지고 있다.',
    ],
  ],
  [
    40,
    [
      '태양광 발전소를 세우는 개인 사업자가 많아지고 있다.',
      '태양광 발전소가 생긴 후 농작물의 생산성이 향상되었다.',
      '태양광 발전소의 설치를 원하는 지역 주민들이 늘고 있다.',
      '태양광 발전소로 인한 갈등을 해결해 줄 방안이 마련되었다.',
    ],
  ],
  [
    41,
    [
      '석빙고에 대한 역사적 기록을 찾아야 한다.',
      '석빙고는 과학적인 원리를 활용해 설계되었다.',
      '석빙고의 우수성을 밝히려는 노력이 필요하다.',
      '석빙고에 얼음을 보관하던 문화를 지켜야 한다.',
    ],
  ],
  [
    42,
    [
      '석빙고의 경사진 바닥은 온도 유지에 도움이 된다.',
      '지붕에 구멍을 만들어 석빙고를 아름답게 장식했다.',
      '더운 공기를 빼기 위해 석빙고에 차가운 물을 공급했다.',
      '석빙고에는 얼음을 녹지 않게 해 주는 장치가 달려 있다.',
    ],
  ],
  [
    43,
    [
      '판의 충돌이 인류의 역사를 발전시켰다.',
      '판의 움직임이 자원의 이동을 초래했다.',
      '인류는 판의 경계에 고대 문명을 건설했다.',
      '인류는 판의 충돌로 인한 위험을 극복해 왔다.',
    ],
  ],
  [
    44,
    [
      '다른 도시 문명과 가까웠기 때문에',
      '자연 재해를 피할 수 있었기 때문에',
      '지각이 바뀌면서 경계로 밀려났기 때문에',
      '문명 발달에 필요한 자원을 얻기 쉬웠기 때문에',
    ],
  ],
  [
    45,
    [
      '4차 산업혁명은 인공지능을 기반으로 한다.',
      '4차 산업혁명은 유통 시스템의 자동화를 말한다.',
      '4차 산업혁명 시대는 전문가들의 예상대로 진행될 것이다.',
      '4차 산업혁명에서 전문 지식 서비스는 인간이 담당할 것이다.',
    ],
  ],
  [
    46,
    [
      '미래 세대의 활약에 기대를 걸고 있다.',
      '산업혁명의 부작용에 대해 반성하고 있다.',
      '전문가들의 상황 인식에 우려를 표하고 있다.',
      '산업의 미래에 대해 긍정적으로 전망하고 있다.',
    ],
  ],
  [
    47,
    [
      '전승자들은 대학에서 재교육을 받을 예정이다.',
      '기존의 정책은 전승 종목을 사유화할 우려가 있다.',
      '전승자들의 작품을 인증하는 제도가 사라질 것이다.',
      '젊은 사람들은 전승자와의 일대일 교육을 선호한다.',
    ],
  ],
  [
    48,
    [
      '새로운 정책의 문제점을 예측하고 있다.',
      '기존 정책의 개선 방향을 제시하고 있다.',
      '새로운 정책의 시행 결과를 분석하고 있다.',
      '기존 정책의 내용을 기준별로 분류하고 있다.',
    ],
  ],
  [
    49,
    [
      '개인들의 관계는 힘의 논리에 의해 결정된다.',
      '도덕적 사회를 이루려면 개인의 도덕이 중요하다.',
      '집단에 속한 개인은 비도덕적으로 변할 수 있다.',
      '집단 간의 충돌을 조정할 도덕적 기준이 필요하다.',
    ],
  ],
  [
    50,
    [
      '발생 가능한 문제를 제기하고 있다.',
      '사회 현상을 논리적으로 분석하고 있다.',
      '예를 들어 자신의 주장을 증명하고 있다.',
      '구체적인 사례에서 결론을 유도하고 있다.',
    ],
  ],
];

// 제47회 공식 정답 및 배점표 B형 듣기 p. 1: 전 문항 2점.
const answerKeys: TopikAnswerKey[] = [
  '2',
  '1',
  '2',
  '3',
  '2',
  '3',
  '1',
  '4',
  '1',
  '4',
  '1',
  '2',
  '2',
  '3',
  '3',
  '4',
  '3',
  '4',
  '2',
  '1',
  '2',
  '3',
  '4',
  '3',
  '4',
  '2',
  '3',
  '4',
  '1',
  '3',
  '4',
  '3',
  '2',
  '1',
  '3',
  '1',
  '3',
  '4',
  '4',
  '1',
  '2',
  '1',
  '1',
  '4',
  '1',
  '4',
  '2',
  '2',
  '3',
  '2',
];

export const TOPIK_II_47_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-ii-listening-47-2016',
  title: {
    ko: '제47회 TOPIK II 듣기',
    uz: '47-TOPIK II tinglash',
    en: '47th TOPIK II Listening',
    ru: '47-й TOPIK II: аудирование',
  },
  description: {
    ko: '제47회 한국어능력시험 TOPIK II 듣기 1번부터 50번까지를 원문 구조대로 구성했습니다.',
    uz: '47-TOPIK II tinglash bo‘limining 1–50-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–50 of the 47th TOPIK II Listening test in the original exam structure.',
    ru: 'Задания 1–50 аудирования 47-го TOPIK II в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.LISTENING,
  year: 2016,
  round: 47,
  durationMinutes: 60,
  totalQuestions: 50,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제47회 한국어능력시험 II B형 듣기',
    edition: '제47회',
    publisher: '국립국제교육원',
    reference: '사용자 제공 제47회 TOPIK II B형 시험지·정답표·듣기 통합 대본',
  },
  publishedAt: new Date('2016-07-17T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 20 }, (_, index) => [index + 1, index + 1] as const),
  ...Array.from(
    { length: 15 },
    (_, index) => [21 + index * 2, 22 + index * 2] as const,
  ),
];

export const TOPIK_II_47_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
  ([startNumber, endNumber], index) => {
    const code = groupCodeFor(startNumber);
    const visual = startNumber <= 3;
    return {
      code,
      order: index + 1,
      startNumber,
      endNumber,
      instruction: textBlocks(instructionFor(startNumber)),
      sharedAudio: TOPIK_II_47_LISTENING_AUDIO[code],
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

export const TOPIK_II_47_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map(([number, choiceTexts]) => {
    const answer = answerKeys[number - 1];
    const visual = number <= 3;
    const choices = choiceTexts.map((text, index) => ({
      key: String(index + 1),
      text,
      order: index + 1,
      imageAssetKey: visual
        ? `topik-ii-47-q${String(number).padStart(2, '0')}-c${index + 1}`
        : '',
      imageAlt: visual ? text : '',
    }));
    const pdfPage = sourcePageFor(number);
    const prompt = promptFor(number);
    return {
      code: `topik-ii-listening-47-q${String(number).padStart(2, '0')}`,
      groupCode: groupCodeFor(number),
      number,
      order: number,
      type: typeFor(number),
      points: 2,
      prompt: prompt ? textBlocks(prompt) : [],
      audio: TOPIK_II_47_LISTENING_AUDIO[groupCodeFor(number)],
      choices,
      correctChoiceKey: answer,
      solution: topikI37Solution(answer, choices[Number(answer) - 1].text),
      presentation: presentation(
        visual
          ? TopikVisualTemplate.EXAM_VISUAL_CHOICES
          : TopikVisualTemplate.EXAM_LISTENING,
        visual ? TopikChoiceLayout.TWO_COLUMNS : TopikChoiceLayout.ONE_COLUMN,
      ),
      tags: ['topik-ii', 'round-47', 'listening', `question-${number}`],
      difficulty: number <= 12 ? 2 : number <= 32 ? 3 : 4,
      source: {
        pdfPage,
        bookPage: pdfPage - 4,
        reference: '제47회 한국어능력시험 II B형 1교시 (듣기, 쓰기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_II_47_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_II_47_LISTENING_EXAM,
  groups: TOPIK_II_47_LISTENING_GROUPS,
  questions: TOPIK_II_47_LISTENING_QUESTIONS,
};
