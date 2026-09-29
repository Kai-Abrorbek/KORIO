import {
  TopikChoiceLayout,
  TopikExamType,
  TopikI18nText,
  TopikPublishStatus,
  TopikQuestionType,
  TopikSection,
  TopikSolution,
  TopikVisualTemplate,
} from '../../../topik/schemas/topik-content.schema';
import { presentation, textBlocks } from './topik-seed.helpers';
import {
  TopikExamSeed,
  TopikSeedExam,
  TopikSeedGroup,
  TopikSeedQuestion,
} from './topik-seed.types';
import { TOPIK_II_36_LISTENING_AUDIO } from './topik-ii-36-listening.scripts';

type AnswerKey = '1' | '2' | '3' | '4';
type ChoiceTuple = [string, string, string, string];

interface ListeningQuestionInput {
  number: number;
  type: TopikQuestionType;
  choices: ChoiceTuple;
  answer: AnswerKey;
  prompt?: string;
  visualAssetKeys?: ChoiceTuple;
}

const localized = (
  ko: string,
  uz: string,
  en: string,
  ru: string,
): TopikI18nText => ({ ko, uz, en, ru });

const groupCodeFor = (number: number) => {
  if (number <= 20)
    return `topik-ii-36-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-ii-36-listening-${start}-${start + 1}`;
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
  if (start <= 35)
    return `[${start}~${start + 1}] 다음을 듣고 물음에 답하십시오. (각 2점)`;
  const format =
    start === 37
      ? '교양 프로그램'
      : start === 39 || start === 47
        ? '대담'
        : start === 43
          ? '다큐멘터리'
          : '강연';
  return `[${start}~${start + 1}] 다음은 ${format}입니다. 잘 듣고 물음에 답하십시오. (각 2점)`;
};

const sourcePageFor = (number: number) => {
  const pageEnds = [2, 6, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 50];
  return 3 + pageEnds.findIndex((end) => number <= end);
};

const createSolution = (
  answer: AnswerKey,
  correctChoice: string,
): TopikSolution => {
  const explanation = localized(
    `정답은 ${answer}번입니다. 듣기 대본의 핵심 내용과 ‘${correctChoice}’가 일치합니다.`,
    `To‘g‘ri javob ${answer}-variant. Audio matnining asosiy ma’nosi “${correctChoice}” javobiga mos keladi.`,
    `The answer is choice ${answer}. The audio supports “${correctChoice}.”`,
    `Правильный ответ — вариант ${answer}. Аудиозапись подтверждает «${correctChoice}».`,
  );
  const strategy = localized(
    '질문의 초점을 확인하고 대화나 발표의 핵심 표현을 선택지와 비교하세요.',
    'Savol nimani so‘rayotganini aniqlang va suhbat yoki nutqdagi asosiy ifodani variantlar bilan solishtiring.',
    'Identify the question focus, then compare the key expression in the audio with the choices.',
    'Определите цель вопроса и сравните ключевую фразу аудиозаписи с вариантами.',
  );
  return {
    explanation,
    strategy,
    keyClues: [
      {
        key: 'clue-1',
        order: 1,
        label: localized(
          '핵심 청취 단서',
          'Asosiy belgi',
          'Key clue',
          'Ключевая подсказка',
        ),
        explanation,
        targetSegmentKeys: [],
      },
    ],
    steps: [
      {
        key: 'step-1',
        order: 1,
        title: localized(
          '질문 확인',
          'Savolni aniqlash',
          'Identify the question',
          'Определите вопрос',
        ),
        explanation: strategy,
        targetSegmentKeys: [],
      },
      {
        key: 'step-2',
        order: 2,
        title: localized(
          '보기 대조',
          'Variantlarni solishtirish',
          'Compare choices',
          'Сравните варианты',
        ),
        explanation,
        targetSegmentKeys: [],
      },
    ],
    hints: [
      {
        key: 'hint-1',
        level: 1,
        title: localized(
          '문제 유형',
          'Savol turi',
          'Question type',
          'Тип вопроса',
        ),
        content: strategy,
        examples: [],
        targetSegmentKeys: [],
      },
      {
        key: 'hint-2',
        level: 2,
        title: localized(
          '핵심 표현',
          'Asosiy ifoda',
          'Key expression',
          'Ключевая фраза',
        ),
        content: localized(
          '대본과 보기가 같은 뜻을 다른 표현으로 말하는지 확인하세요.',
          'Audio va variant bir ma’noni boshqacha ifodalayaptimi, tekshiring.',
          'Check whether the audio and choice express the same idea differently.',
          'Проверьте, выражают ли аудио и вариант одну мысль разными словами.',
        ),
        examples: [],
        targetSegmentKeys: [],
      },
      {
        key: 'hint-3',
        level: 3,
        title: localized(
          '정답 연결',
          'Javobni bog‘lash',
          'Match the answer',
          'Свяжите ответ',
        ),
        content: explanation,
        examples: [],
        targetSegmentKeys: [],
      },
    ],
    choiceNotes: (['1', '2', '3', '4'] as AnswerKey[]).map((choiceKey) => ({
      choiceKey,
      note:
        choiceKey === answer
          ? explanation
          : localized(
              '대본의 핵심 정보와 일치하지 않는 보기입니다.',
              'Bu variant audiodagi asosiy ma’lumotga mos kelmaydi.',
              'This choice does not match the key information in the audio.',
              'Этот вариант не соответствует ключевой информации аудиозаписи.',
            ),
    })),
  };
};

// Sources: 제36회 TOPIK II B형 1교시 시험지 PDF pp. 3–15,
// 듣기 통합 대본 PDF pp. 1–26, 정답표 PDF p. 1.
const rawQuestions: ListeningQuestionInput[] = [
  {
    number: 1,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '비에 젖은 남자가 현관에 들어오고 여자가 수건을 건네고 있습니다.',
      '집 안의 남녀가 창문 밖 비 오는 길을 바라보고 있습니다.',
      '남자가 비를 피하려 밖으로 나가고 여자는 우산을 들고 있습니다.',
      '남자가 방바닥에 쏟은 물을 보고 여자가 수건을 들고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-ii-36-q01-c1',
      'topik-ii-36-q01-c2',
      'topik-ii-36-q01-c3',
      'topik-ii-36-q01-c4',
    ],
    answer: '1',
  },
  {
    number: 2,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '남자가 비행기 안에서 선반에 짐을 올리고 있습니다.',
      '남자가 공항에서 여자의 여행 가방을 받아 들고 있습니다.',
      '남자가 여행 가방을 끌고 출국장으로 들어가고 있습니다.',
      '남자가 공항 수하물 창구에 여행 가방을 맡기고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-ii-36-q02-c1',
      'topik-ii-36-q02-c2',
      'topik-ii-36-q02-c3',
      'topik-ii-36-q02-c4',
    ],
    answer: '2',
  },
  {
    number: 3,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '진학 목적: 좋은 직업 42%, 능력 계발 33%, 지식 습득 14%, 기타 11%.',
      '진학 목적: 능력 계발 43%, 좋은 직업 32%, 기타 13%, 지식 습득 12%.',
      '진학률과 취업률이 모두 1994년부터 2014년까지 증가했습니다.',
      '진학률과 취업률이 모두 1994년부터 2014년까지 감소했습니다.',
    ],
    visualAssetKeys: [
      'topik-ii-36-q03-c1',
      'topik-ii-36-q03-c2',
      'topik-ii-36-q03-c3',
      'topik-ii-36-q03-c4',
    ],
    answer: '1',
  },
  {
    number: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '야유회를 다녀왔군요.',
      '가까운 곳으로 갔어요.',
      '옷을 따뜻하게 입고 가세요.',
      '추울 때는 집에서 쉬곤 해요.',
    ],
    answer: '3',
  },
  {
    number: 5,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '살아 보니 소음이 너무 심하더라고.',
      '혼자 사는 것보다 둘이 사는 게 좋았어.',
      '지금 집은 학교와 가까워서 편하고 좋아.',
      '부동산에 가서 알아보는 게 좋을 것 같아서.',
    ],
    answer: '1',
  },
  {
    number: 6,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '그래? 텐트만 사면 되겠네.',
      '그래도 자세히 알아봐야겠다.',
      '그래? 미리 알았으면 좋았을걸.',
      '그래도 텐트는 치기 힘들겠다.',
    ],
    answer: '3',
  },
  {
    number: 7,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '분위기가 카페처럼 참 좋네요.',
      '사무실 옆에 카페가 있으면 좋아요.',
      '집중이 안 되면 카페에서 해 보세요.',
      '전 편안하면 일이 더 잘 될 것 같아요.',
    ],
    answer: '4',
  },
  {
    number: 8,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '연수 다녀와서 뵙겠습니다.',
      '지난번에 제가 미리 말씀드렸습니다.',
      '개인 사정이 생기면 말씀드리겠습니다.',
      '저도 정말 가고 싶지만 힘들 것 같습니다.',
    ],
    answer: '4',
  },
  {
    number: 9,
    type: TopikQuestionType.LISTENING_NEXT_ACTION,
    choices: [
      '외식하러 갈 식당을 예약한다.',
      '퇴근을 하고 약속 장소로 간다.',
      '남편을 만나러 회사 앞으로 간다.',
      '아이들을 데리고 회사 앞으로 간다.',
    ],
    answer: '1',
  },
  {
    number: 10,
    type: TopikQuestionType.LISTENING_NEXT_ACTION,
    choices: [
      '다른 볼일을 보러 간다.',
      '병원 진료 접수를 한다.',
      '병원에 앉아서 기다린다.',
      '진찰을 받으러 들어간다.',
    ],
    answer: '2',
  },
  {
    number: 11,
    type: TopikQuestionType.LISTENING_NEXT_ACTION,
    choices: [
      '책자에서 커튼을 고른다.',
      '집에서 거실 커튼을 단다.',
      '커튼을 사러 가게에 간다.',
      '커튼을 사서 집에 가져간다.',
    ],
    answer: '1',
  },
  {
    number: 12,
    type: TopikQuestionType.LISTENING_NEXT_ACTION,
    choices: [
      '직원 교육 일정을 짠다.',
      '특강 강사를 모시러 간다.',
      '특강했던 강사에게 연락한다.',
      '교육 받을 장소를 알아본다.',
    ],
    answer: '3',
  },
  {
    number: 13,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 이 프로그램에 만족해 한다.',
      '이 프로그램은 다시 가면 할인해 준다.',
      '이 프로그램은 예약해야 참여할 수 있다.',
      '여자는 이번 달에 이 프로그램에 참가할 것이다.',
    ],
    answer: '1',
  },
  {
    number: 14,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '밤에는 난방 기구를 사용할 수 없다.',
      '9시 이후에는 모든 전기 제품을 끈다.',
      '사무실은 일정 온도를 유지해야 한다.',
      '점심시간에는 엘리베이터가 운행되지 않는다.',
    ],
    answer: '3',
  },
  {
    number: 15,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '맞춤형 순찰제도는 작년부터 실시되었다.',
      '이 제도를 도입한 후 범죄율이 감소하였다.',
      '맞춤형 순찰제도는 전국에서 시행되고 있다.',
      '주민들이 경찰관과 함께 담당 구역을 순찰한다.',
    ],
    answer: '2',
  },
  {
    number: 16,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '시장의 카페에서 다양한 도시락을 판다.',
      '이 시장을 관광지로 알리려고 홍보했다.',
      '시장이 인기를 끌자 도시락 카페가 생겼다.',
      '이 시장에서는 음식을 골라먹는 재미가 있다.',
    ],
    answer: '4',
  },
  {
    number: 17,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '컴퓨터를 꼭 학원에서 배울 필요는 없다.',
      '컴퓨터를 더 배워 두면 경쟁력이 커진다.',
      '컴퓨터는 자기가 필요한 만큼만 배우면 된다.',
      '컴퓨터 학원은 자격증을 딸 때까지 가야 한다.',
    ],
    answer: '2',
  },
  {
    number: 18,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '칭찬을 받으면 일할 의욕이 높아진다.',
      '칭찬을 받으려면 거절하지 말아야 한다.',
      '칭찬을 받으면 그 말을 의식해서 행동하게 된다.',
      '칭찬을 받으면 다른 사람도 칭찬해 줘야 한다.',
    ],
    answer: '3',
  },
  {
    number: 19,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '커피숍 주인은 손님을 더 배려해야 한다.',
      '커피 값에 공간을 이용하는 비용이 들어 있다.',
      '커피숍에 장시간 있는 것은 영업에 방해가 된다.',
      '커피숍 공간을 다양하게 이용할 수 있게 해야 한다.',
    ],
    answer: '2',
  },
  {
    number: 20,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '웃음으로 서로의 관계를 회복해야 한다.',
      '화해하고 싶으면 먼저 나를 되돌아봐야 한다.',
      '상대방의 웃음을 보면 화해를 먼저 해야 한다.',
      '화해하려면 상대방의 행동을 미리 살펴야 한다.',
    ],
    answer: '2',
  },
  {
    number: 21,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '남자의 중심 생각으로 맞는 것을 고르십시오.',
    choices: [
      '진정한 독립은 경제적 독립이다.',
      '가족은 함께 생활하는 것이 좋다.',
      '누구나 자신만의 공간이 필요하다.',
      '독립해 사는 것이 좋은 것만은 아니다.',
    ],
    answer: '4',
  },
  {
    number: 22,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용으로 알맞은 것을 고르십시오.',
    choices: [
      '여자는 아빠와의 사이가 좋지 않다.',
      '여자는 집안일로 스트레스를 받고 있다.',
      '여자의 아버지는 딸의 독립을 반대한다.',
      '여자는 회사가 멀어서 독립하고 싶어한다.',
    ],
    answer: '3',
  },
  {
    number: 23,
    type: TopikQuestionType.LISTENING_SPEAKER_ACTION,
    prompt: '남자는 무엇을 하고 있는지 고르십시오.',
    choices: [
      '잡 마켓 이용을 제안하고 있다.',
      '직장 내의 각 부서를 설명하고 있다.',
      '잡 마켓 이용 경험을 소개하고 있다.',
      '상사의 문제점에 대해 이야기하고 있다.',
    ],
    answer: '1',
  },
  {
    number: 24,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용으로 맞는 것을 고르십시오.',
    choices: [
      '여자는 일하고 있는 부서에 만족해 한다.',
      '잡 마켓은 회사를 홍보하기 위해 만들었다.',
      '잡 마켓은 상사의 허락이 있어야 이용한다.',
      '직원들은 적성에 맞는 부서로 옮길 기회가 있다.',
    ],
    answer: '4',
  },
  {
    number: 25,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '남자의 중심 생각으로 맞는 것을 고르십시오.',
    choices: [
      '시작한 일은 끝까지 해내야 한다.',
      '마음먹었을 때 바로 실천해야 한다.',
      '자신의 한계를 알아야 도전할 수 있다.',
      '고난을 극복하려면 강한 정신력이 필요하다.',
    ],
    answer: '2',
  },
  {
    number: 26,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용으로 맞는 것을 고르십시오.',
    choices: [
      '남자는 정글을 최고의 마라톤 장소로 꼽았다.',
      '남자는 마라톤 선수들을 통해 많은 것을 배웠다.',
      '남자는 고통이 심해서 마라톤을 중간에 포기했다.',
      '남자는 아마존에서 자신의 의지를 시험하고 싶었다.',
    ],
    answer: '4',
  },
  {
    number: 27,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '여자가 남자에게 말하는 의도를 고르십시오.',
    choices: [
      '대안학교의 필요성을 강조하기 위해',
      '대안학교에 입학하도록 권유하기 위해',
      '아이 교육 문제에 대해 책임을 묻기 위해',
      '아이 학습 태도에 대한 조언을 주기 위해',
    ],
    answer: '2',
  },
  {
    number: 28,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용으로 맞는 것을 고르십시오.',
    choices: [
      '여자는 일반학교의 장점을 잘 이해하고 있다.',
      '남자의 아이는 일반학교 방식에 잘 적응했다.',
      '여자의 아이는 입시 위주의 공부를 하고 있다.',
      '남자는 아이의 교육 방식 변화를 고려하고 있다.',
    ],
    answer: '4',
  },
  {
    number: 29,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    prompt: '남자는 누구인지 고르십시오.',
    choices: ['동양화가', '전통 공예가', '나무 조각가', '전시회 기획자'],
    answer: '2',
  },
  {
    number: 30,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용으로 맞는 것을 고르십시오.',
    choices: [
      '남자는 실용성보다 예술성을 강조한다.',
      '한지의 색은 빛에 의해서 다양하게 연출된다.',
      '남자가 만든 조각품에 외국인들이 푹 빠졌다.',
      '한지의 색깔은 시간이 지나도 잘 변하지 않는다.',
    ],
    answer: '4',
  },
  {
    number: 31,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '남자의 생각으로 맞는 것을 고르십시오.',
    choices: [
      '고열량 음식 때문에 청소년들의 체형이 변했다.',
      '고열량 식품 판매자에게 세금을 부과해야 한다.',
      '비만세는 판매자와 소비자 모두에게 부담을 준다.',
      '우리나라 사람들의 비만은 운동 부족이 주요 원인이다.',
    ],
    answer: '3',
  },
  {
    number: 32,
    type: TopikQuestionType.LISTENING_ATTITUDE,
    prompt: '남자의 태도로 맞는 것을 고르십시오.',
    choices: [
      '상대방의 말을 하나하나 반박하고 있다.',
      '앞으로 일어날 일에 대해 전망하고 있다.',
      '현재의 문제에 대해 판매자의 책임을 묻고 있다.',
      '내용을 파악하지 못해 상대방에게 질문하고 있다.',
    ],
    answer: '1',
  },
  {
    number: 33,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '무엇에 대한 내용인지 맞는 것을 고르십시오.',
    choices: [
      '지나친 청결의 문제점',
      '피부병 발병의 주요 원인',
      '유아기 생활 습관의 중요성',
      '항균 요법을 통한 질병 예방법',
    ],
    answer: '1',
  },
  {
    number: 34,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용으로 맞는 것을 고르십시오.',
    choices: [
      '피부병 발병률에 대한 연구가 필요하다.',
      '비위생적인 환경은 알레르기의 원인이 된다.',
      '우리 몸에는 적당한 세균이 있는 것이 더 좋다.',
      '환경이 깨끗하면 우리 몸의 면역력이 커진다.',
    ],
    answer: '3',
  },
  {
    number: 35,
    type: TopikQuestionType.LISTENING_SPEAKER_ACTION,
    prompt: '남자는 무엇을 하고 있는지 고르십시오.',
    choices: [
      '글로벌화 사업 내용을 분석하고 있다.',
      '중소기업의 성장 과정을 보고하고 있다.',
      '중소기업의 성과에 대해 평가하고 있다.',
      '글로벌화 사업에 참여할 것을 요청하고 있다.',
    ],
    answer: '4',
  },
  {
    number: 36,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용으로 맞는 것을 고르십시오.',
    choices: [
      '중소기업의 해외 진출이 활성화되고 있다.',
      '협회는 정부의 글로벌화 사업에 참여해 왔다.',
      '글로벌화 사업은 대기업의 주도로 이루어진다.',
      '이 간담회는 수출 환경 개선을 위해 마련되었다.',
    ],
    answer: '4',
  },
  {
    number: 37,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '남자의 중심 생각으로 맞는 것을 고르십시오.',
    choices: [
      '날씨 경영의 경제적 효용성을 분석해야 한다.',
      '기업을 경영하는 데 날씨 경영을 적극 활용해야 한다.',
      '기상 산업은 정부의 미래 산업으로 선정되어야 한다.',
      '소비자 구매 욕구를 파악해서 마케팅 전략을 세워야 한다.',
    ],
    answer: '2',
  },
  {
    number: 38,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 일치하는 것을 고르십시오.',
    choices: [
      '날씨 경영은 미래에 주목 받는 사업이다.',
      '날씨 경영은 재해 예방을 위해 사용된다.',
      '날씨 경영은 기업의 경영 전략을 분석한다.',
      '날씨 경영은 국내의 많은 기업이 활용하고 있다.',
    ],
    answer: '1',
  },
  {
    number: 39,
    type: TopikQuestionType.LISTENING_PRECEDING_CONTEXT,
    prompt: '이 담화 앞의 내용으로 알맞은 것을 고르십시오.',
    choices: [
      '농촌의 논밭과 산은 대기를 정화시킨다.',
      '농촌과 도시의 비율이 균형을 이루었다.',
      '농가에 대한 정부의 지원이 확대되고 있다.',
      '농촌의 발달은 국가에 이익을 가져다 준다.',
    ],
    answer: '1',
  },
  {
    number: 40,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 일치하는 것을 고르십시오.',
    choices: [
      '농촌의 기능은 공익적 측면에 집중되어 있다.',
      '농업이 경제 지표로서 가치를 가지기는 힘들다.',
      '농업에 투자하면 사회에 더 큰 혜택으로 돌아온다.',
      '농가의 정부 보조금은 국가 예산에 부담을 준다.',
    ],
    answer: '3',
  },
  {
    number: 41,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 일치하는 것을 고르십시오.',
    choices: [
      '부정적 감정들은 좌절감에 빠지게 한다.',
      '분노의 감정이 없어야만 행복감을 느낀다.',
      '모나리자의 미소는 완전한 행복을 보여 준다.',
      '슬픔은 현실감을 잃지 않게 하는 요소로 작용한다.',
    ],
    answer: '4',
  },
  {
    number: 42,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '남자의 중심 생각으로 맞는 것을 고르십시오.',
    choices: [
      '완전한 행복을 위해 슬픔을 이겨야 한다.',
      '완전한 행복을 위해 조금은 불행한 것도 좋다.',
      '완벽한 행복을 위해 괴로운 일을 잊어야 한다.',
      '완벽한 행복을 위해 행복감의 유지가 필요하다.',
    ],
    answer: '2',
  },
  {
    number: 43,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '수컷 해마가 배를 부풀리는 이유로 맞는 것을 고르십시오.',
    choices: [
      '알을 더 많이 품으려고',
      '새끼들을 쉽게 낳으려고',
      '암컷 해마의 눈에 잘 띄려고',
      '새끼들에게 많은 양분을 주려고',
    ],
    answer: '3',
  },
  {
    number: 44,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '이 이야기의 중심 내용으로 맞는 것을 고르십시오.',
    choices: [
      '해마의 번식 방법은 독특하다.',
      '해마는 모성애가 유난히 강하다.',
      '바다 생물은 대체로 번식력이 뛰어나다.',
      '해마는 새끼를 기르는 방식이 특이하다.',
    ],
    answer: '1',
  },
  {
    number: 45,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 일치하는 것을 고르십시오.',
    choices: [
      '유대관계가 긴밀한 사람이 많아야 성공한 인생이다.',
      '그냥 아는 사이의 사람이 중요한 도움을 줄 수 있다.',
      '우리는 보통 약한 유대 관계의 사람들을 중요시한다.',
      '개인적인 접촉을 자주 해야 절친한 관계를 맺을 수 있다.',
    ],
    answer: '2',
  },
  {
    number: 46,
    type: TopikQuestionType.LISTENING_ATTITUDE,
    prompt: '여자의 태도로 가장 알맞은 것을 고르십시오.',
    choices: [
      '구체적인 자료를 통해 해결책을 제시하고 있다.',
      '각각의 견해에 대해 논리적으로 분석하고 있다.',
      '조사 결과를 근거로 자신의 의견을 제기하고 있다.',
      '상대방의 동의를 구하며 자신의 주장을 펼치고 있다.',
    ],
    answer: '3',
  },
  {
    number: 47,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 일치하는 것을 고르십시오.',
    choices: [
      '고서에서 알 수 있는 정보는 한계가 있다.',
      '출간 연대가 오래될수록 가치 있고 귀한 책이다.',
      '옛날의 다양한 일상을 보여주는 자료가 부족하다.',
      '남자는 사람들이 관심 갖지 않는 책을 연구하고 있다.',
    ],
    answer: '4',
  },
  {
    number: 48,
    type: TopikQuestionType.LISTENING_ATTITUDE,
    prompt: '남자의 태도로 가장 알맞은 것을 고르십시오.',
    choices: [
      '대중들이 즐겨보던 고서적 발굴을 촉구하고 있다.',
      '고서적 연구가 나아갈 새로운 방향을 제시하고 있다.',
      '고서적의 가치를 설명하며 연구의 의의를 강조하고 있다.',
      '고서적의 자료를 근거로 연구의 신뢰성을 증명하고 있다.',
    ],
    answer: '3',
  },
  {
    number: 49,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 일치하는 것을 고르십시오.',
    choices: [
      '마키아벨리는 국민을 권력의 바탕으로 보았다.',
      '마키아벨리는 바람직한 국민의 모습을 제시했다.',
      '마키아벨리는 군주의 도덕성을 중요하게 생각했다.',
      '마키아벨리는 어떤 경우든 수단을 정당하다고 보았다.',
    ],
    answer: '1',
  },
  {
    number: 50,
    type: TopikQuestionType.LISTENING_ATTITUDE,
    prompt: '여자의 태도로 가장 알맞은 것을 고르십시오.',
    choices: [
      '각각의 견해를 비판하며 우려를 나타내고 있다.',
      '다양한 사례를 분석하여 결론을 끌어내고 있다.',
      '새로운 평가를 반박하며 청중의 동의를 구하고 있다.',
      '새로운 해석을 소개하며 청중의 판단을 요구하고 있다.',
    ],
    answer: '4',
  },
];

export const TOPIK_II_36_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-ii-listening-36-2014',
  title: localized(
    '제36회 TOPIK II 듣기',
    '36-TOPIK II tinglash',
    '36th TOPIK II Listening',
    '36-й TOPIK II: аудирование',
  ),
  description: localized(
    '제36회 한국어능력시험 TOPIK II 듣기 1번부터 50번까지를 원문 구조대로 구성했습니다.',
    '36-TOPIK II tinglash bo‘limining 1–50-savollari asl imtihon tuzilishida.',
    'Questions 1–50 of the 36th TOPIK II Listening test in the original exam structure.',
    'Задания 1–50 аудирования 36-го TOPIK II в структуре оригинального экзамена.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.LISTENING,
  year: 2014,
  round: 36,
  durationMinutes: 60,
  totalQuestions: 50,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제36회 한국어능력시험 II B형 듣기',
    edition: '제36회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 test-paper-paper.pdf, listening-transcript-transcript.pdf, answer-keys-answers.pdf',
  },
  publishedAt: new Date('2014-10-12T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 20 }, (_, index) => [index + 1, index + 1] as const),
  ...Array.from(
    { length: 15 },
    (_, index) => [21 + index * 2, 22 + index * 2] as const,
  ),
];

export const TOPIK_II_36_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
  ([startNumber, endNumber], index) => {
    const code = groupCodeFor(startNumber);
    const visual = startNumber <= 3;
    return {
      code,
      order: index + 1,
      startNumber,
      endNumber,
      instruction: textBlocks(instructionFor(startNumber)),
      sharedAudio: TOPIK_II_36_LISTENING_AUDIO[code],
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

export const TOPIK_II_36_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map((input) => {
    const choices = input.choices.map((choiceText, index) => ({
      key: String(index + 1),
      text: choiceText,
      order: index + 1,
      imageAssetKey: input.visualAssetKeys?.[index] ?? '',
      imageAlt: input.visualAssetKeys ? choiceText : '',
    }));
    const pdfPage = sourcePageFor(input.number);
    return {
      code: `topik-ii-listening-36-q${String(input.number).padStart(2, '0')}`,
      groupCode: groupCodeFor(input.number),
      number: input.number,
      order: input.number,
      type: input.type,
      points: 2,
      prompt: input.prompt ? textBlocks(input.prompt) : [],
      audio: TOPIK_II_36_LISTENING_AUDIO[groupCodeFor(input.number)],
      choices,
      correctChoiceKey: input.answer,
      solution: createSolution(
        input.answer,
        choices[Number(input.answer) - 1].text,
      ),
      presentation: presentation(
        input.visualAssetKeys
          ? TopikVisualTemplate.EXAM_VISUAL_CHOICES
          : TopikVisualTemplate.EXAM_LISTENING,
        input.visualAssetKeys
          ? TopikChoiceLayout.TWO_COLUMNS
          : TopikChoiceLayout.ONE_COLUMN,
      ),
      tags: ['topik-ii', 'round-36', 'listening', `question-${input.number}`],
      difficulty: input.number <= 12 ? 2 : input.number <= 32 ? 3 : 4,
      source: {
        pdfPage,
        bookPage: pdfPage - 2,
        reference: '제36회 한국어능력시험 II B형 1교시 (듣기, 쓰기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_II_36_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_II_36_LISTENING_EXAM,
  groups: TOPIK_II_36_LISTENING_GROUPS,
  questions: TOPIK_II_36_LISTENING_QUESTIONS,
};
