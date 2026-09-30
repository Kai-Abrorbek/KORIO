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
import { TOPIK_II_60_LISTENING_AUDIO } from './topik-ii-60-listening.scripts';

type QuestionInput = [number: number, choices: TopikChoiceTuple];

const groupCodeFor = (number: number) => {
  if (number <= 20)
    return `topik-ii-60-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-ii-60-listening-${start}-${start + 1}`;
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
    44: '이 나뭇잎을 일반 동물들이 꺼리는 이유로 맞는 것을 고르십시오.',
    45: '들은 내용과 일치하는 것을 고르십시오.',
    46: '여자의 말하는 방식으로 가장 알맞은 것을 고르십시오.',
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
  const pageEnds = [
    1, 2, 3, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38,
    40, 42, 44, 46, 48, 50,
  ];
  return pageEnds.findIndex((end) => number <= end) + 1;
};

// 제60회 TOPIK II B-홀수형 듣기 통합 pp. 1–26, 정답표 p. 1.
// 1–3번 선택지의 문장은 원본 그림에 대한 접근성 설명이다.
const rawQuestions: QuestionInput[] = [
  [
    1,
    [
      '남자가 안내 창구의 직원에게 지갑을 건네고 있다.',
      '남자가 안내 창구에서 서류를 작성하고 있다.',
      '남녀가 가게의 지갑 진열대를 둘러보고 있다.',
      '남자가 지갑 진열대 앞에서 직원에게 무언가를 가리키고 있다.',
    ],
  ],
  [
    2,
    [
      '남녀가 함께 운동장을 달리고 있다.',
      '남자가 무릎을 아파하며 몸을 굽히고 여자는 옆에 서 있다.',
      '여자가 다리를 아파하며 앉아 있고 남자가 손을 내밀어 돕고 있다.',
      '남녀가 운동장에서 앉아 스트레칭을 하고 있다.',
    ],
  ],
  [
    3,
    [
      '점심시간이 1시간 미만 10%, 1시간 20%, 1시간 30분 70%인 그래프.',
      '점심시간이 1시간 미만 70%, 1시간 10%, 1시간 30분 20%인 그래프.',
      '점심 식사 후 활동 순위가 산책하기, 동료와 차 마시기, 낮잠 자기 순인 그래프.',
      '점심 식사 후 활동 순위가 동료와 차 마시기, 산책하기, 낮잠 자기 순인 그래프.',
    ],
  ],
  [
    4,
    [
      '장소를 다시 말해 주세요.',
      '다음 모임은 안 갈 거예요.',
      '이번 주에 만나면 좋겠어요.',
      '정문 옆에 있는 식당이에요.',
    ],
  ],
  [
    5,
    [
      '아침 일찍 기차를 탔어.',
      '표가 없어서 아직 못 갔어.',
      '표가 있는지 한번 알아볼게.',
      '금요일 오후 표는 취소하자.',
    ],
  ],
  [
    6,
    [
      '발표는 늘 어렵지요.',
      '계획부터 세워 보세요.',
      '외국어 공부를 좀 할까 해요.',
      '학기가 시작되면 많이 바빠요.',
    ],
  ],
  [
    7,
    [
      '응. 시골에서 산 적이 있어.',
      '아니. 너무 지루해서 졸았어.',
      '아니. 드라마 볼 시간이 없었어.',
      '응. 두 사람 보면서 한참 웃었어.',
    ],
  ],
  [
    8,
    [
      '만족도가 높은 편입니다.',
      '조사 결과가 나왔습니다.',
      '프로그램이 적은 것 같습니다.',
      '질문을 다시 정리해 보겠습니다.',
    ],
  ],
  [
    9,
    [
      '그릇 색깔을 고른다.',
      '그릇 가격을 물어본다.',
      '전시할 그릇을 바꾼다.',
      '남자에게 그릇을 준다.',
    ],
  ],
  [
    10,
    [
      '서류를 찾는다.',
      '신분증을 꺼낸다.',
      '카드를 보여 준다.',
      '신청서를 작성한다.',
    ],
  ],
  [
    11,
    [
      '건전지를 가지러 간다.',
      '현재 시간을 확인한다.',
      '시계를 벽에서 내린다.',
      '건전지를 서랍에 넣는다.',
    ],
  ],
  [
    12,
    [
      '회의 자료를 만든다.',
      '회의 자료를 출력한다.',
      '거래처 직원을 만난다.',
      '거래처에 일정을 알린다.',
    ],
  ],
  [
    13,
    [
      '남자는 봉사 활동을 시작하려고 한다.',
      '여자는 봉사 활동 때문에 고민하고 있다.',
      '여자는 봉사 활동 검색 사이트를 이용해 봤다.',
      '남자는 여자와 함께 봉사 활동을 한 적이 있다.',
    ],
  ],
  [
    14,
    [
      '점검은 내일 할 예정이다.',
      '오전에 점검이 모두 끝난다.',
      '비상벨이 여러 번 울릴 것이다.',
      '점검이 시작되면 밖으로 나가야 한다.',
    ],
  ],
  [
    15,
    [
      '간판이 떨어져서 다친 사람이 있다.',
      '태풍은 오늘 밤에 더 강해질 것이다.',
      '이번 태풍의 특징은 비가 많이 오는 것이다.',
      '제주도는 아직 태풍의 영향을 받고 있지 않다.',
    ],
  ],
  [
    16,
    [
      '한국에는 이 일을 하는 사람이 많다.',
      '꼼꼼한 사람은 이 일에 맞지 않는다.',
      '이 일을 하는 데에 자격증은 필요 없다.',
      '이 일을 할 때 예술적 감각이 도움이 된다.',
    ],
  ],
  [
    17,
    [
      '오래 볼 수 있는 꽃이 좋다.',
      '관리가 쉬운 식물을 사고 싶다.',
      '식물은 집 밖에서 키워야 한다.',
      '집에 꽃이 많은 화분이 있어야 한다.',
    ],
  ],
  [
    18,
    [
      '신청서에 쓸 정보를 줄이면 좋겠다.',
      '신청서 쓰는 방법을 안내해야 한다.',
      '신청자 요구에 맞는 수업을 해야 한다.',
      '수업 내용을 미리 알려 주는 것이 좋다.',
    ],
  ],
  [
    19,
    [
      '아이들 책은 무겁지 않아야 한다.',
      '아이들 책은 온라인으로 사야 한다.',
      '아이들 책은 전문가의 추천이 중요하다.',
      '아이들 책은 직접 본 후에 사는 게 좋다.',
    ],
  ],
  [
    20,
    [
      '시사 프로그램은 일반인에게 인기를 얻기 어렵다.',
      '일반인의 눈높이에서 시사 문제를 전달해야 한다.',
      '청취자가 참여하는 시사 프로그램을 만들고 싶다.',
      '시사 프로그램 진행자는 청취자의 질문에 답해야 한다.',
    ],
  ],
  [
    21,
    [
      '교실의 불편한 점을 고쳐야 한다.',
      '빈 교실을 토론방으로 활용하는 게 좋다.',
      '학생들의 팀별 과제를 늘릴 필요가 있다.',
      '토론 수업을 위해 교실을 넓게 지어야 한다.',
    ],
  ],
  [
    22,
    [
      '지하에 창고를 새로 만들었다.',
      '남자는 빈 교실의 환기 문제를 해결했다.',
      '여자는 지난주에 선생님들과 회의를 했다.',
      '지하에 있는 교실에 에어컨을 모두 설치했다.',
    ],
  ],
  [
    23,
    [
      '정장 대여 방법을 알아보고 있다.',
      '정장 대여 날짜를 문의하고 있다.',
      '정장 대여 가격을 확인하고 있다.',
      '정장 대여 예약을 변경하고 있다.',
    ],
  ],
  [
    24,
    [
      '센터에서 신청자가 입을 옷을 골라 준다.',
      '센터에 가서 정장 대여 신청서를 내야 한다.',
      '이 서비스로 신청한 옷을 택배로 받기는 어렵다.',
      '이 서비스는 인주시에 살고 있어야 이용할 수 있다.',
    ],
  ],
  [
    25,
    [
      '아이들이 노는 놀이터는 공간이 넓을수록 좋다.',
      '놀이터에 다양한 놀이 기구를 더 설치해야 한다.',
      '놀이 기구가 없는 놀이터는 상상력을 기르기에 좋다.',
      '놀이터에 있는 놀이 기구의 관리를 철저히 해야 한다.',
    ],
  ],
  [
    26,
    [
      '이 놀이터는 기존 놀이터보다 작아졌다.',
      '안전을 위해 놀이터의 통나무들을 치웠다.',
      '이 놀이터에서 아이들이 물놀이를 할 수 있다.',
      '놀이터 안에 모래밭을 없애고 언덕을 만들었다.',
    ],
  ],
  [
    27,
    [
      '단합 대회의 의의를 말하려고',
      '단합 대회 참여를 부탁하려고',
      '단합 대회의 방식을 바꾸려고',
      '단합 대회의 문제를 지적하려고',
    ],
  ],
  [
    28,
    [
      '단합 대회에서 음식을 만들어 먹었다.',
      '여자는 단합 대회에 참석하지 않았다.',
      '단합 대회는 회사 안에서 진행되었다.',
      '남자는 단합 대회에서 운동을 안 했다.',
    ],
  ],
  [
    29,
    [
      '공연 장소를 섭외하는 사람',
      '공연장 좌석을 안내하는 사람',
      '공연장에서 안전을 관리하는 사람',
      '공연장의 무대 시설을 고치는 사람',
    ],
  ],
  [
    30,
    [
      '오늘 공연은 실내에서 진행되었다.',
      '비가 왔음에도 공연장에 사람들이 많았다.',
      '오늘 공연 중 열성 팬으로 인한 사고가 있었다.',
      '남자는 실내보다 야외에서 일할 때 마음이 편하다.',
    ],
  ],
  [
    31,
    [
      '생계형 범죄 예방을 위한 대책이 효과가 없다.',
      '생계형 범죄로 인한 피해를 보상해 주어야 한다.',
      '생계형 범죄에 대한 사회적 인식 개선이 필요하다.',
      '생계형 범죄도 다른 범죄와 동일하게 처벌해야 한다.',
    ],
  ],
  [
    32,
    [
      '상대방 의견에 반대하고 있다.',
      '제도의 문제점을 지적하고 있다.',
      '문제 해결 방안에 공감하고 있다.',
      '상대가 제시한 근거를 의심하고 있다.',
    ],
  ],
  [
    33,
    [
      '우주 식품의 개발 배경',
      '우주 식품을 먹는 방법',
      '우주 식품 제조 시 고려 사항',
      '우주 식품 운반 시 주의 사항',
    ],
  ],
  [
    34,
    [
      '우주 식품은 자극적이지 않게 만든다.',
      '우주 식품에는 특정 미생물이 들어 있다.',
      '우주 식품은 대부분 액체 형태로 만들어진다.',
      '우주 식품에는 뼈와 근육에 좋은 성분이 포함된다.',
    ],
  ],
  [
    35,
    [
      '제품의 완성 시기를 발표하고 있다.',
      '최근에 출시된 제품을 홍보하고 있다.',
      '제품 결함에 대해 사과의 말을 전하고 있다.',
      '신제품 출시 지연에 대해 양해를 구하고 있다.',
    ],
  ],
  [
    36,
    [
      '소비자 과실로 제품에 문제가 발생하였다.',
      '현재 제품에 대한 기능 점검이 진행 중이다.',
      '이 회사는 처음으로 카메라를 출시할 예정이다.',
      '지난해에 나온 제품은 무료로 교환해 줄 것이다.',
    ],
  ],
  [
    37,
    [
      '특수 목재는 건축 재료로서 이점이 많다.',
      '목조 건물의 높이를 제한할 필요가 있다.',
      '목조 건물을 짓는 것은 신중히 생각해야 한다.',
      '특수 목재 가공 기술의 장단점을 파악해야 한다.',
    ],
  ],
  [
    38,
    [
      '18층짜리 목조 건물이 현재 건설 중이다.',
      '특수 목재에는 휘어짐과 뒤틀림이 존재한다.',
      '특수 목재로 건물을 지으면 공사 기간이 늘어난다.',
      '특수 목재로 지은 건물은 지진의 영향을 덜 받는다.',
    ],
  ],
  [
    39,
    [
      '원작자들이 야구단을 상대로 소송을 걸었다.',
      '응원가에 대한 관중들의 선호도를 조사했다.',
      '야구단에서 작곡가들에게 응원가 제작을 요청했다.',
      '원작자들이 더 이상 곡을 바꾸지 않기로 결정했다.',
    ],
  ],
  [
    40,
    [
      '원곡의 가사만 바꾸면 법적으로 문제가 없다.',
      '야구단은 원곡을 바꿔서 응원가로 사용해 왔다.',
      '앞으로 경기장에서 응원가가 더 많이 나올 것이다.',
      '야구단에서 원작자의 허락을 받은 후에 곡을 수정했다.',
    ],
  ],
  [
    41,
    [
      '수라상은 왕의 국정 운영에 활용되었다.',
      '수라상의 음식 수는 왕의 권력을 나타냈다.',
      '수라상은 조선 시대 음식 문화를 보여 준다.',
      '수라상의 의미는 시대마다 다르게 해석된다.',
    ],
  ],
  [
    42,
    [
      '왕은 수라상의 반찬을 통해 지방 상황을 살폈다.',
      '자연재해가 발생해도 수라상은 동일하게 구성됐다.',
      '왕의 건강이 나빠지면 신하들은 반찬 수를 줄였다.',
      '조선 시대 수라상에는 제철 특산품을 올리기 힘들었다.',
    ],
  ],
  [
    43,
    [
      '새끼 양육 방식이 오랑우탄의 식습관에 영향을 미쳤다.',
      '나뭇잎 즙으로 통증을 치료하는 오랑우탄이 발견되었다.',
      '사포닌이 든 나뭇잎의 맛을 즐기는 오랑우탄이 늘고 있다.',
      '오랑우탄은 나뭇잎을 구하기 위해 서식지를 옮기기 시작했다.',
    ],
  ],
  [
    44,
    [
      '뜯기 힘들어서',
      '건강에 좋지 않아서',
      '사포닌의 맛을 싫어해서',
      '새끼에게 먹이기 어려워서',
    ],
  ],
  [
    45,
    [
      '호박은 광물로 만들어져 물에 뜰 수 없다.',
      '호박은 다른 보석들처럼 흠집이 없는 게 좋다.',
      '호박 내부의 불순물이 잘 보이면 가격이 비싸진다.',
      '호박은 다이아몬드와 비슷한 물질로 구성되어 있다.',
    ],
  ],
  [
    46,
    [
      '호박의 가공 과정을 살피고 있다.',
      '호박의 개념을 다시 정의하고 있다.',
      '호박의 유형을 파악해 비교하고 있다.',
      '호박의 특징과 가치를 설명하고 있다.',
    ],
  ],
  [
    47,
    [
      '적정 인구 판정에 삶의 질을 반영하기 어렵다.',
      '적정 인구를 정한 후에 인구 대책 마련이 가능하다.',
      '적정 인구 계산에 사회적 규모는 고려되지 않는다.',
      '적정 인구 기준은 모든 나라에 동일하게 적용된다.',
    ],
  ],
  [
    48,
    [
      '적정 인구의 계산 방식을 비판하고 있다.',
      '적정 인구 판정의 어려움을 토로하고 있다.',
      '적정 인구 논의의 영향에 대해 우려하고 있다.',
      '적정 인구 논의의 적절한 방향을 제시하고 있다.',
    ],
  ],
  [
    49,
    [
      '현재 인공 장기 이식 연구가 진행 중에 있다.',
      '면역력 해결을 위한 기술이 곧 개발될 것이다.',
      '과거에는 장기 이식의 거부 반응이 많지 않았다.',
      '장기 이식 중 뼈를 이식하는 것은 아직 불가능하다.',
    ],
  ],
  [
    50,
    [
      '장기 기증에 동참하기를 촉구하고 있다.',
      '장기 이식 기술의 미래를 낙관하고 있다.',
      '장기 기증으로 생길 문제를 예측하고 있다.',
      '장기 이식 기술의 실패 원인을 진단하고 있다.',
    ],
  ],
];

const answerKeys: TopikAnswerKey[] = [
  '1',
  '3',
  '4',
  '4',
  '3',
  '3',
  '4',
  '4',
  '2',
  '2',
  '1',
  '2',
  '2',
  '3',
  '1',
  '4',
  '2',
  '1',
  '4',
  '2',
  '2',
  '3',
  '1',
  '4',
  '3',
  '3',
  '1',
  '1',
  '3',
  '2',
  '4',
  '1',
  '3',
  '4',
  '3',
  '4',
  '1',
  '4',
  '1',
  '2',
  '1',
  '1',
  '2',
  '3',
  '3',
  '4',
  '2',
  '4',
  '1',
  '2',
];

export const TOPIK_II_60_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-ii-listening-60-2018',
  title: {
    ko: '제60회 TOPIK II 듣기',
    uz: '60-TOPIK II tinglash',
    en: '60th TOPIK II Listening',
    ru: '60-й TOPIK II: аудирование',
  },
  description: {
    ko: '제60회 한국어능력시험 TOPIK II 듣기 1번부터 50번까지를 원문 구조대로 구성했습니다.',
    uz: '60-TOPIK II tinglash bo‘limining 1–50-savollari asl imtihon tuzilishida.',
    en: 'Questions 1–50 of the 60th TOPIK II Listening test in the original exam structure.',
    ru: 'Задания 1–50 аудирования 60-го TOPIK II в структуре оригинального экзамена.',
  },
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.LISTENING,
  year: 2018,
  round: 60,
  durationMinutes: 60,
  totalQuestions: 50,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제60회 한국어능력시험 II B-홀수형 듣기 통합',
    edition: '제60회',
    publisher: '국립국제교육원',
    reference: '사용자 제공 제60회 TOPIK II 듣기 통합 대본·정답표',
  },
  publishedAt: new Date('2018-10-21T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 20 }, (_, index) => [index + 1, index + 1] as const),
  ...Array.from(
    { length: 15 },
    (_, index) => [21 + index * 2, 22 + index * 2] as const,
  ),
];

export const TOPIK_II_60_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
  ([startNumber, endNumber], index) => {
    const code = groupCodeFor(startNumber);
    const visual = startNumber <= 3;
    return {
      code,
      order: index + 1,
      startNumber,
      endNumber,
      instruction: textBlocks(instructionFor(startNumber)),
      sharedAudio: TOPIK_II_60_LISTENING_AUDIO[code],
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

export const TOPIK_II_60_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map(([number, choiceTexts]) => {
    const answer = answerKeys[number - 1];
    const visual = number <= 3;
    const choices = choiceTexts.map((text, index) => ({
      key: String(index + 1),
      text,
      order: index + 1,
      imageAssetKey: visual
        ? `topik-ii-60-q${String(number).padStart(2, '0')}-c${index + 1}`
        : '',
      imageAlt: visual ? text : '',
    }));
    const pdfPage = sourcePageFor(number);
    const prompt = promptFor(number);
    return {
      code: `topik-ii-listening-60-q${String(number).padStart(2, '0')}`,
      groupCode: groupCodeFor(number),
      number,
      order: number,
      type: typeFor(number),
      points: 2,
      prompt: prompt ? textBlocks(prompt) : [],
      audio: TOPIK_II_60_LISTENING_AUDIO[groupCodeFor(number)],
      choices,
      correctChoiceKey: answer,
      solution: topikI37Solution(answer, choices[Number(answer) - 1].text),
      presentation: presentation(
        visual
          ? TopikVisualTemplate.EXAM_VISUAL_CHOICES
          : TopikVisualTemplate.EXAM_LISTENING,
        visual ? TopikChoiceLayout.TWO_COLUMNS : TopikChoiceLayout.ONE_COLUMN,
      ),
      tags: ['topik-ii', 'round-60', 'listening', `question-${number}`],
      difficulty: number <= 12 ? 2 : number <= 32 ? 3 : 4,
      source: {
        pdfPage,
        bookPage: pdfPage,
        reference: '제60회 한국어능력시험 II B-홀수형 듣기 통합',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_II_60_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_II_60_LISTENING_EXAM,
  groups: TOPIK_II_60_LISTENING_GROUPS,
  questions: TOPIK_II_60_LISTENING_QUESTIONS,
};
