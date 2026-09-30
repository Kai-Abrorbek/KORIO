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
import { TOPIK_II_64_LISTENING_AUDIO } from './topik-ii-64-listening.scripts';

type QuestionInput = [number: number, choices: TopikChoiceTuple];

const groupCodeFor = (number: number) => {
  if (number <= 20)
    return `topik-ii-64-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-ii-64-listening-${start}-${start + 1}`;
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
    23: '여자가 무엇을 하고 있는지 고르십시오.',
    24: '들은 내용으로 맞는 것을 고르십시오.',
    25: '남자의 중심 생각으로 알맞은 것을 고르십시오.',
    26: '들은 내용으로 맞는 것을 고르십시오.',
    27: '남자가 여자에게 말하는 의도를 고르십시오.',
    28: '들은 내용으로 맞는 것을 고르십시오.',
    29: '여자는 누구인지 맞는 것을 고르십시오.',
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
    44: '새끼 상어가 자궁 속에서 무정란을 먹는 이유로 맞는 것을 고르십시오.',
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

// PDF physical pages include the cover; book page 1 begins at PDF page 2.
const sourcePageFor = (number: number) => {
  const pageEnds = [2, 5, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 50];
  const bookPage = pageEnds.findIndex((end) => number <= end) + 1;
  return { pdfPage: bookPage + 1, bookPage };
};

// 제64회 TOPIK II B-홀수형 듣기 시험지 PDF pp. 2–14 및 듣기 통합 대본 pp. 1–26.
// 1–3번 선택지 문장은 원본 그림에 대한 접근성 설명이다.
const rawQuestions: QuestionInput[] = [
  [
    1,
    [
      '사무실에서 남녀가 각자 노트북으로 일하고 있다.',
      '직원이 손님에게 노트북을 보여 주며 안내하고 있다.',
      '매장에서 손님이 직원과 함께 노트북을 살펴보고 있다.',
      '카페에서 남자가 음료를 가져다주고 여자가 노트북 앞에 앉아 있다.',
    ],
  ],
  [
    2,
    [
      '볼링장에서 여자가 공을 들고 남자가 앞쪽을 가리키며 설명하고 있다.',
      '볼링장에서 남녀가 하이파이브를 하고 있다.',
      '볼링장에서 여자가 핀을 가리키고 남자가 머리를 긁적이고 있다.',
      '볼링장에서 여자가 신발끈을 묶고 남자가 공을 들고 있다.',
    ],
  ],
  [
    3,
    [
      '영화관 관객 수가 2015년부터 2017년까지 증가하다가 2018년에 감소한 그래프.',
      '영화관 관객 수가 2015년부터 2016년에 감소하고 2017년에 증가한 그래프.',
      '관객 수 감소 이유가 여가 활동 다양화, 모바일 영화 시청 증가, 관람료 인상 순인 그래프.',
      '관객 수 감소 이유가 관람료 인상, 여가 활동 다양화, 모바일 영화 시청 증가 순인 그래프.',
    ],
  ],
  [
    4,
    [
      '모임 장소로 오세요.',
      '내일은 갈 수 있어요.',
      '고향에서 친구가 와서요.',
      '못 만날까 봐 걱정했어요.',
    ],
  ],
  [
    5,
    [
      '아니, 머리는 괜찮아졌어.',
      '응, 내가 약을 사다 줄게.',
      '아니, 문을 안 열었더라고.',
      '응, 늦게까지 하는 약국이 있어.',
    ],
  ],
  [
    6,
    [
      '그럼 토요일에 보자.',
      '그럼 내가 가서 물어볼게.',
      '연습실은 3층으로 가면 돼.',
      '주말에 연습이 없는 줄 알았어.',
    ],
  ],
  [
    7,
    [
      '공사를 하면 깨끗해지겠어요.',
      '공사는 내일부터 시작한대요.',
      '공사를 해서 시끄러울 거예요.',
      '공사가 빨리 끝났으면 좋겠어요.',
    ],
  ],
  [
    8,
    [
      '첫 방송이 정말 기대되네요.',
      '시청자 의견을 못 들었어요.',
      '장면들이 아름다웠다고 해요.',
      '음악에 더 신경을 써야겠네요.',
    ],
  ],
  [
    9,
    [
      '꽃을 가져온다.',
      '선물을 고른다.',
      '생일 카드를 쓴다.',
      '민수한테 전화한다.',
    ],
  ],
  [
    10,
    [
      '검사 예약을 한다.',
      '옷을 갈아입으러 간다.',
      '진료 시간을 확인한다.',
      '탈의실 위치를 물어본다.',
    ],
  ],
  [
    11,
    [
      '화분에 물을 준다.',
      '화분에 날짜를 붙인다.',
      '화분에 토마토를 심는다.',
      '화분을 베란다로 옮긴다.',
    ],
  ],
  [
    12,
    [
      '다른 강사를 찾아본다.',
      '박 선생님에게 연락한다.',
      '특강 자료를 정리한다.',
      '연수 프로그램을 알아본다.',
    ],
  ],
  [
    13,
    [
      '여자는 심리학과 학생이다.',
      '여자는 수강 신청을 하지 못했다.',
      '남자는 심리학 개론 수업에 만족했다.',
      '남자는 여자와 심리학 개론 수업을 들었다.',
    ],
  ],
  [
    14,
    [
      '노래자랑 대회는 오후에 한다.',
      '어울림 축제는 저녁에 시작한다.',
      '올해 처음으로 야시장이 열린다.',
      '수영장은 놀이터 안에 설치됐다.',
    ],
  ],
  [
    15,
    [
      '이 열차는 현재 운행 중이다.',
      '이 열차는 인주역에 들어오지 못했다.',
      '이 열차는 지난주에도 정전 사고가 있었다.',
      '이 열차의 정전 사고는 늦은 밤에 발생했다.',
    ],
  ],
  [
    16,
    [
      '병든 나무에는 직접 약을 처방하지 않는다.',
      '남자는 나무 치료를 시작한 지 얼마 안 됐다.',
      '남자는 나무 치료를 위해 땅의 상태를 조사한다.',
      '나무는 다른 식물에 비해 환경의 영향을 덜 받는다.',
    ],
  ],
  [
    17,
    [
      '운동을 제대로 배워서 하고 싶다.',
      '인터넷의 운동 정보는 도움이 된다.',
      '건강을 위해 꾸준히 운동을 해야 한다.',
      '따라 하기 쉬운 요가 영상을 선택해야 한다.',
    ],
  ],
  [
    18,
    [
      '갈등이 생기면 빨리 해결해야 한다.',
      '자신의 생각을 분명하게 말하면 좋겠다.',
      '상대방이 원하는 것을 먼저 하는 게 좋다.',
      '상대방의 입장을 이해하려면 대화가 필요하다.',
    ],
  ],
  [
    19,
    [
      '이 명함은 디자인이 인상적이어서 좋다.',
      '이 명함은 디자인에 더 신경을 써야 한다.',
      '이 명함은 정보를 충분히 넣을 필요가 있다.',
      '이 명함은 명함을 준 사람에 대해 알기 쉽다.',
    ],
  ],
  [
    20,
    [
      '기업 행사는 분위기 연출이 가장 어렵다.',
      '기업 행사는 행사의 목적을 고려해야 한다.',
      '기업 행사는 프로그램이 다양할수록 좋다.',
      '기업 행사는 직원들이 만족할 수 있어야 한다.',
    ],
  ],
  [
    21,
    [
      '여행객들의 성향을 조사해야 한다.',
      '고객 만족도를 높이는 것이 우선이다.',
      '이용 후기를 늘릴 수 있도록 해야 한다.',
      '후기 분석을 적극적으로 할 필요가 있다.',
    ],
  ],
  [
    22,
    [
      '이 호텔에서는 후기 작성 이벤트를 하고 있다.',
      '남자는 호텔과 관련된 자료를 조사할 예정이다.',
      '이 호텔을 이용한 고객들은 후기를 많이 남겼다.',
      '여자가 일하는 호텔은 고객 만족도가 높은 편이다.',
    ],
  ],
  [
    23,
    [
      '면허증 재발급 방법을 문의하고 있다.',
      '면허증 재발급 기간을 확인하고 있다.',
      '면허 시험장의 위치를 알아보고 있다.',
      '면허증 발급을 위한 서류를 요청하고 있다.',
    ],
  ],
  [
    24,
    [
      '경찰서에서도 면허증을 받을 수 있다.',
      '여자는 인터넷으로 신청서를 제출했다.',
      '여자는 면허 시험장에서 가까운 곳에 있다.',
      '인터넷을 이용하면 당일에 면허증 발급이 가능하다.',
    ],
  ],
  [
    25,
    [
      '소방관의 근무 환경을 개선해야 한다.',
      '사람들이 소방관에 대해 관심을 가지면 좋겠다.',
      '사람들은 소방관의 희생정신을 본받아야 한다.',
      '소방관의 안전을 보장하기 위한 대책이 필요하다.',
    ],
  ],
  [
    26,
    [
      '남자는 소방관으로 일하고 있다.',
      '이 가방은 사람들에게 판매되지 않는다.',
      '이 가방은 소방복을 재활용해 만든 것이다.',
      '남자가 만든 가방은 아직 알려지지 않았다.',
    ],
  ],
  [
    27,
    [
      '남성 육아의 필요성을 일깨우기 위해',
      '남성 육아를 위한 제도를 설명하기 위해',
      '남성 육아의 문제점에 대해 지적하기 위해',
      '남성 육아에 대한 인식 변화를 말하기 위해',
    ],
  ],
  [
    28,
    [
      '남자의 회사에는 육아 휴직 신청자가 없다.',
      '육아 휴직을 해도 경력을 인정받을 수 있다.',
      '육아 휴직 기간에는 월급이 지급되지 않는다.',
      '정부에서는 육아 휴직 제도의 시행을 준비하고 있다.',
    ],
  ],
  [
    29,
    [
      '전자책을 조사하는 사람',
      '전자책을 골라 주는 사람',
      '전자책 구독 서비스에 가입한 사람',
      '전자책 구독 서비스를 개발한 사람',
    ],
  ],
  [
    30,
    [
      '이 서비스는 무료로 이용이 가능하다.',
      '이 서비스는 아직 이용자가 많지 않다.',
      '이 서비스는 책에 대한 해설도 제공한다.',
      '이 서비스는 동영상 기능을 추가할 예정이다.',
    ],
  ],
  [
    31,
    [
      '창업 사전 교육을 강화해야 한다.',
      '학생들이 창업을 직접 해 보게 해야 한다.',
      '학생들에게 창업 지원 사업을 홍보해야 한다.',
      '창업 지원 사업의 시행 기간을 연장해야 한다.',
    ],
  ],
  [
    32,
    [
      '사업의 효과를 회의적으로 바라보고 있다.',
      '사례를 들어 상대방의 주장을 반박하고 있다.',
      '상황을 분석하면서 발생할 문제를 염려하고 있다.',
      '상대의 의견을 일부 인정하며 다른 주장을 하고 있다.',
    ],
  ],
  [
    33,
    [
      '질소의 활용 방법',
      '질소의 생성 원리',
      '비행기 타이어의 특징',
      '비행기 타이어의 종류',
    ],
  ],
  [
    34,
    [
      '질소는 자동차 타이어에 주로 사용된다.',
      '비행기 타이어에는 복잡한 무늬를 새긴다.',
      '단순한 무늬의 타이어는 잘 미끄러지지 않는다.',
      '질소만 주입한 타이어는 폭발 위험이 줄어든다.',
    ],
  ],
  [
    35,
    [
      '선배의 업적을 소개하고 있다.',
      '선배의 영화를 홍보하고 있다.',
      '선배가 만든 작품을 설명하고 있다.',
      '선배에 대한 지지를 부탁하고 있다.',
    ],
  ],
  [
    36,
    [
      '김민수는 배우이자 감독으로 활약했다.',
      '김민수는 늦은 나이에 배우로 데뷔했다.',
      '김민수는 백여 편이 넘는 영화를 연출했다.',
      '김민수는 국제 영화제에서 상을 받지 못했다.',
    ],
  ],
  [
    37,
    [
      '잇몸병의 원인을 명확하게 밝혀야 한다.',
      '젊을 때부터 잇몸 관리에 신경을 써야 한다.',
      '치매 예방을 위해서 잇몸 관리가 중요하다.',
      '잇몸병에 대한 잘못된 정보를 바로잡아야 한다.',
    ],
  ],
  [
    38,
    [
      '잇몸은 손상되더라도 빠르게 회복된다.',
      '잇몸병 환자의 절반 이상이 젊은 사람들이다.',
      '젊은 층의 잇몸병 환자가 줄고 있는 추세이다.',
      '잇몸병을 일으키는 세균은 다른 질환도 유발할 수 있다.',
    ],
  ],
  [
    39,
    [
      '민간 주도로 문화재 환수가 이루어지고 있다.',
      '해외에 있는 문화재를 대여해서 전시하고 있다.',
      '환수하지 못하고 해외에 남아 있는 문화재가 많다.',
      '문화재 환수를 위해 다른 나라와 협정을 체결했다.',
    ],
  ],
  [
    40,
    [
      '각국의 법이 달라 문화재의 영구적 환수가 어렵다.',
      '1970년대부터 문화재 환수가 활발해지기 시작했다.',
      '문화재 환수는 주로 기증하는 방식으로 이루어진다.',
      '문화재 환수와 관련된 국제 협약은 존재하지 않는다.',
    ],
  ],
  [
    41,
    [
      '감칠맛에 대한 연구가 새로이 시작되었다.',
      '새로운 미각으로 깊은맛이 주목을 받고 있다.',
      '한식의 조리 과정에서는 발효가 가장 중요하다.',
      '음식의 풍미를 높이는 다양한 방법이 개발되었다.',
    ],
  ],
  [
    42,
    [
      '감칠맛은 다른 맛과 결합해 풍미를 높인다.',
      '감칠맛은 미각으로 인정을 받지 못하고 있다.',
      '깊은맛은 식욕을 당기게 해 주는 특징이 있다.',
      '깊은맛은 식재료를 오래 끓여서 낼 수 있는 맛이다.',
    ],
  ],
  [
    43,
    [
      '황갈색수염상어가 해양 생태계를 변화시키고 있다.',
      '황갈색수염상어의 서식 공간이 점점 좁아지고 있다.',
      '황갈색수염상어의 자궁은 인간의 자궁과 형태가 유사하다.',
      '황갈색수염상어의 새끼는 자궁 속에서 세상에 나올 준비를 한다.',
    ],
  ],
  [
    44,
    [
      '공간을 넓히기 위해서',
      '영양분을 얻기 위해서',
      '수분을 배출하기 위해서',
      '움직임을 줄이기 위해서',
    ],
  ],
  [
    45,
    [
      '색소폰은 다른 악기와의 합주에 적합했다.',
      '색소폰은 19세기부터 활발하게 사용되었다.',
      '색소폰은 재즈 덕분에 인기를 얻기 시작했다.',
      '색소폰의 음색은 편안하고 안정된 느낌을 준다.',
    ],
  ],
  [
    46,
    [
      '색소폰의 위상 변화를 설명하고 있다.',
      '색소폰의 연주 방법을 비교하고 있다.',
      '색소폰의 발명 과정을 요약하고 있다.',
      '색소폰의 세부 형태를 묘사하고 있다.',
    ],
  ],
  [
    47,
    [
      '이 제도는 곧 시행될 예정이다.',
      '이 제도는 신속한 구조를 위해 마련되었다.',
      '이 제도는 국민 대상 홍보가 잘 이루어졌다.',
      '이 제도는 예산 지원이 원활하게 진행되고 있다.',
    ],
  ],
  [
    48,
    [
      '제도에 대한 평가를 유보하고 있다.',
      '제도의 긍정적인 효과를 기대하고 있다.',
      '제도 시행을 위한 국민의 협조를 당부하고 있다.',
      '제도 시행의 문제를 지적하며 시정을 촉구하고 있다.',
    ],
  ],
  [
    49,
    [
      '이 책은 왕의 업무 내용을 담고 있다.',
      '이 책은 신하들에게 공개되지 않았다.',
      '이 책은 백성의 관점에서 작성되었다.',
      '이 책은 조선 시대 이전에 기록되었다.',
    ],
  ],
  [
    50,
    [
      '기록물의 가치를 높이 평가하고 있다.',
      '기록물의 활용 방안을 강구하고 있다.',
      '기록물에 대한 맹신을 경계하고 있다.',
      '기록물의 훼손 가능성을 우려하고 있다.',
    ],
  ],
];

// 제64회 TOPIK II 정답 및 배점표: 듣기 전 문항 각 2점.
const answerKeys: TopikAnswerKey[] = [
  '2',
  '1',
  '3',
  '3',
  '4',
  '2',
  '4',
  '4',
  '3',
  '2',
  '1',
  '2',
  '3',
  '1',
  '3',
  '3',
  '1',
  '2',
  '1',
  '2',
  '3',
  '4',
  '1',
  '1',
  '2',
  '3',
  '4',
  '2',
  '4',
  '3',
  '2',
  '4',
  '3',
  '4',
  '1',
  '1',
  '2',
  '4',
  '3',
  '1',
  '2',
  '4',
  '4',
  '2',
  '3',
  '1',
  '2',
  '4',
  '1',
  '1',
];

export const TOPIK_II_64_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-ii-listening-64-2019',
  title: {
    ko: '제64회 TOPIK II 듣기',
    uz: '64-TOPIK II tinglash',
    en: '64th TOPIK II Listening',
    ru: '64-й TOPIK II: аудирование',
  },
  description: {
    ko: '제64회 한국어능력시험 TOPIK II 듣기 1번부터 50번까지를 원문 구조대로 구성했습니다.',
    uz: '64-TOPIK II tinglash bo‘limining 1–50-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–50 of the 64th TOPIK II Listening test in the original exam structure.',
    ru: 'Задания 1–50 аудирования 64-го TOPIK II в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.LISTENING,
  year: 2019,
  round: 64,
  durationMinutes: 60,
  totalQuestions: 50,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제64회 한국어능력시험 II B-홀수형 듣기 통합',
    edition: '제64회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 제64회 TOPIK II 듣기 시험지·통합 대본 및 공개 정답·배점표',
  },
  publishedAt: new Date('2019-05-19T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 20 }, (_, index) => [index + 1, index + 1] as const),
  ...Array.from(
    { length: 15 },
    (_, index) => [21 + index * 2, 22 + index * 2] as const,
  ),
];

export const TOPIK_II_64_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
  ([startNumber, endNumber], index) => {
    const code = groupCodeFor(startNumber);
    const visual = startNumber <= 3;
    return {
      code,
      order: index + 1,
      startNumber,
      endNumber,
      instruction: textBlocks(instructionFor(startNumber)),
      sharedAudio: TOPIK_II_64_LISTENING_AUDIO[code],
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

export const TOPIK_II_64_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map(([number, choiceTexts]) => {
    const answer = answerKeys[number - 1];
    const visual = number <= 3;
    const choices = choiceTexts.map((text, index) => ({
      key: String(index + 1),
      text,
      order: index + 1,
      imageAssetKey: visual
        ? `topik-ii-64-q${String(number).padStart(2, '0')}-c${index + 1}`
        : '',
      imageAlt: visual ? text : '',
    }));
    const { pdfPage, bookPage } = sourcePageFor(number);
    const prompt = promptFor(number);
    return {
      code: `topik-ii-listening-64-q${String(number).padStart(2, '0')}`,
      groupCode: groupCodeFor(number),
      number,
      order: number,
      type: typeFor(number),
      points: 2,
      prompt: prompt ? textBlocks(prompt) : [],
      audio: TOPIK_II_64_LISTENING_AUDIO[groupCodeFor(number)],
      choices,
      correctChoiceKey: answer,
      solution: topikI37Solution(answer, choices[Number(answer) - 1].text),
      presentation: presentation(
        visual
          ? TopikVisualTemplate.EXAM_VISUAL_CHOICES
          : TopikVisualTemplate.EXAM_LISTENING,
        visual ? TopikChoiceLayout.TWO_COLUMNS : TopikChoiceLayout.ONE_COLUMN,
      ),
      tags: ['topik-ii', 'round-64', 'listening', `question-${number}`],
      difficulty: number <= 12 ? 2 : number <= 32 ? 3 : 4,
      source: {
        pdfPage,
        bookPage,
        reference: '제64회 한국어능력시험 II B-홀수형 듣기 시험지',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_II_64_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_II_64_LISTENING_EXAM,
  groups: TOPIK_II_64_LISTENING_GROUPS,
  questions: TOPIK_II_64_LISTENING_QUESTIONS,
};
