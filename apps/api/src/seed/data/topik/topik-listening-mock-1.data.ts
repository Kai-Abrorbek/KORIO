import {
  TopikChoice,
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
import { TOPIK_LISTENING_MOCK_1_AUDIO } from './topik-listening-mock-1.scripts';

type ChoiceTuple = [string, string, string, string];
type AnswerKey = '1' | '2' | '3' | '4';

interface ListeningQuestionInput {
  number: number;
  type: TopikQuestionType;
  prompt?: string;
  choices: ChoiceTuple;
  answer: AnswerKey;
  visualAssetKeys?: ChoiceTuple;
}

const localized = (
  ko: string,
  uz: string,
  en: string,
  ru: string,
): TopikI18nText => ({ ko, uz, en, ru });

const answerSymbols: Record<AnswerKey, string> = {
  '1': '①',
  '2': '②',
  '3': '③',
  '4': '④',
};

const groupCodeFor = (number: number) => {
  if (number <= 20) return `listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `listening-${start}-${start + 1}`;
};

const instructionFor = (number: number) => {
  if (number <= 3)
    return '[01~03] 다음을 듣고 가장 알맞은 그림 또는 그래프를 고르십시오. (각 2점)';
  if (number <= 8)
    return '[04~08] 다음을 듣고 이어질 수 있는 말로 가장 알맞은 것을 고르십시오. (각 2점)';
  if (number <= 12)
    return '[09~12] 다음을 듣고 여자가 이어서 할 행동으로 가장 알맞은 것을 고르십시오. (각 2점)';
  if (number <= 16)
    return '[13~16] 다음을 듣고 들은 내용과 같은 것을 고르십시오. (각 2점)';
  if (number <= 20)
    return '[17~20] 다음을 듣고 남자의 중심 생각으로 가장 알맞은 것을 고르십시오. (각 2점)';
  const start = number % 2 === 1 ? number : number - 1;
  return `[${start}~${start + 1}] 다음을 듣고 물음에 답하십시오. (각 2점)`;
};

const sourcePageFor = (number: number) => {
  const pageEnds = [1, 3, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 50];
  return pageEnds.findIndex((end) => number <= end) + 1;
};

const createSolution = (
  answer: AnswerKey,
  correctChoice: string,
): TopikSolution => {
  const symbol = answerSymbols[answer];
  const explanation = localized(
    `정답은 ${symbol}입니다. 듣기 대본의 핵심 내용과 “${correctChoice}”가 일치합니다.`,
    `To‘g‘ri javob ${symbol}. Tinglash matnidagi asosiy ma’no “${correctChoice}” javobiga mos keladi.`,
    `The correct answer is ${symbol}. The key information in the audio matches “${correctChoice}.”`,
    `Правильный ответ — ${symbol}. Ключевая информация аудиозаписи соответствует варианту «${correctChoice}».`,
  );
  const strategy = localized(
    '문제를 먼저 읽고 인물, 행동, 수치, 태도를 표시한 뒤 같은 뜻으로 바뀐 표현을 들으십시오.',
    'Avval savolni o‘qing, shaxs, harakat, raqam va munosabatni belgilang, so‘ng o‘sha ma’noni boshqa ifoda bilan tinglang.',
    'Read the question first, mark the speaker, action, number, or attitude, then listen for a paraphrase of that information.',
    'Сначала прочитайте вопрос, отметьте говорящего, действие, число или отношение, затем слушайте перефразированную ключевую информацию.',
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
          'Asosiy tinglash belgisi',
          'Key listening clue',
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
          '질문 초점 잡기',
          'Savol markazini topish',
          'Identify the question focus',
          'Определите цель вопроса',
        ),
        explanation: strategy,
        targetSegmentKeys: [],
      },
      {
        key: 'step-2',
        order: 2,
        title: localized(
          '대본과 보기 연결',
          'Matnni javob bilan bog‘lash',
          'Connect audio and choice',
          'Свяжите запись с вариантом',
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
          '무엇을 묻는지 확인',
          'Nima so‘ralganini tekshiring',
          'Check what is being asked',
          'Уточните, что спрашивается',
        ),
        content: strategy,
        examples: [
          localized(
            '중심 생각인지, 세부 내용인지 먼저 구분하세요.',
            'Avval asosiy fikrmi yoki tafsilotmi, ajrating.',
            'First decide whether the question asks for the main idea or a detail.',
            'Сначала определите: главная мысль или деталь.',
          ),
        ],
        targetSegmentKeys: [],
      },
      {
        key: 'hint-2',
        level: 2,
        title: localized(
          '바뀐 표현 찾기',
          'Boshqacha ifodani toping',
          'Find the paraphrase',
          'Найдите перефразирование',
        ),
        content: localized(
          '대본과 보기는 같은 뜻을 다른 단어로 표현하는 경우가 많습니다.',
          'Matn va javob ko‘pincha bir ma’noni boshqa so‘zlar bilan beradi.',
          'The audio and the choice often express the same idea with different words.',
          'Запись и вариант часто выражают одну мысль разными словами.',
        ),
        examples: [
          localized(
            `정답 보기의 핵심: ${correctChoice}`,
            `Javobning kaliti: ${correctChoice}`,
            `Correct-choice focus: ${correctChoice}`,
            `Ключ варианта: ${correctChoice}`,
          ),
        ],
        targetSegmentKeys: [],
      },
      {
        key: 'hint-3',
        level: 3,
        title: localized(
          '결정적 단서',
          'Hal qiluvchi belgi',
          'Decisive clue',
          'Решающая подсказка',
        ),
        content: explanation,
        examples: [
          localized(
            `정답 번호는 ${symbol}입니다.`,
            `Javob raqami ${symbol}.`,
            `The answer number is ${symbol}.`,
            `Номер ответа: ${symbol}.`,
          ),
        ],
        targetSegmentKeys: [],
      },
    ],
    choiceNotes: ['1', '2', '3', '4'].map((choiceKey) => ({
      choiceKey,
      note:
        choiceKey === answer
          ? explanation
          : localized(
              '대본의 핵심 내용과 일치하지 않는 보기입니다.',
              'Bu variant matnning asosiy mazmuniga mos kelmaydi.',
              'This choice does not match the key information in the audio.',
              'Этот вариант не соответствует ключевой информации аудиозаписи.',
            ),
    })),
  };
};

const rawQuestions: ListeningQuestionInput[] = [
  {
    number: 1,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '사무실에서 두 사람이 각자 노트북을 사용하고 있다.',
      '노트북 매장에서 여자가 남자가 쓰는 노트북을 가리키고 있다.',
      '노트북 수리 센터에서 손님이 상담하고 있다.',
      '노트북 매장에서 직원이 손님에게 제품을 건네고 있다.',
    ],
    visualAssetKeys: ['q01-c1', 'q01-c2', 'q01-c3', 'q01-c4'],
    answer: '2',
  },
  {
    number: 2,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '편의점 앞 탁자에 두 사람이 앉아 있다.',
      '두 사람이 실내에서 러닝머신을 타고 있다.',
      '두 사람이 집에서 운동 영상을 보고 있다.',
      '두 사람이 밖에서 함께 달리고 있다.',
    ],
    visualAssetKeys: ['q02-c1', 'q02-c2', 'q02-c3', 'q02-c4'],
    answer: '4',
  },
  {
    number: 3,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '3월부터 관광객이 증가하다가 9월에 감소한 그래프',
      '3월부터 관광객이 계속 감소한 그래프',
      '관광객 수가 증가하고 다양한 경치가 증가 이유 1위인 그래프',
      '관광객 수가 증가하고 해외여행의 어려움이 증가 이유 1위인 그래프',
    ],
    visualAssetKeys: ['q03-c1', 'q03-c2', 'q03-c3', 'q03-c4'],
    answer: '3',
  },
  {
    number: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '아플까 봐 걱정했어요.',
      '또 늦으면 연락 주세요.',
      '아침부터 열이 좀 나서요.',
      '다음에는 연락할 수 있어요.',
    ],
    answer: '3',
  },
  {
    number: 5,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '응, 배는 별로 안 고파.',
      '아니, 늦게까지 하는 가게가 있어.',
      '아니, 나도 김밥을 사다 먹을 거야.',
      '응, 아직 가게 문을 안 열었더라고.',
    ],
    answer: '2',
  },
  {
    number: 6,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '그럼 제가 전화해 볼게요.',
      '그럼 일요일에 도서관에서 봐요.',
      '도서관에 들어가려면 신분증이 필요해요.',
      '이 근처에는 도서관이 없는 줄 알았어요.',
    ],
    answer: '1',
  },
  {
    number: 7,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '저도 신청하려고 해요.',
      '벌써 신청을 했더라고요.',
      '이번에는 신청하기가 힘들 것 같아요.',
      '지난주에 학교 홈페이지에 올라왔던데요.',
    ],
    answer: '4',
  },
  {
    number: 8,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '내용이 긴 편입니다.',
      '발표 준비가 이미 끝났습니다.',
      '인사말을 조금 줄여 보겠습니다.',
      '졸업식에서 다시 이야기하겠습니다.',
    ],
    answer: '3',
  },
  {
    number: 9,
    type: TopikQuestionType.LISTENING_NEXT_ACTION,
    choices: [
      '식탁 가격을 물어본다.',
      '식탁의 모양을 고른다.',
      '남자에게 매장을 안내한다.',
      '다른 상품의 위치를 찾아본다.',
    ],
    answer: '1',
  },
  {
    number: 10,
    type: TopikQuestionType.LISTENING_NEXT_ACTION,
    choices: [
      '미용실을 예약한다.',
      '상담을 받으러 간다.',
      '예약 시간을 확인한다.',
      '염색하는 방법을 배운다.',
    ],
    answer: '2',
  },
  {
    number: 11,
    type: TopikQuestionType.LISTENING_NEXT_ACTION,
    choices: [
      '자전거를 탄다.',
      '바퀴에 바람을 넣는다.',
      '수리 센터를 찾아본다.',
      '오빠와 함께 밖으로 나간다.',
    ],
    answer: '3',
  },
  {
    number: 12,
    type: TopikQuestionType.LISTENING_NEXT_ACTION,
    choices: [
      '연수 계획을 짠다.',
      '특강 주제를 결정한다.',
      '강의 자료를 정리한다.',
      '김 선생님에게 연락한다.',
    ],
    answer: '4',
  },
  {
    number: 13,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 주말마다 문화 체험을 하러 간다.',
      '여자는 당분간 주말에 시간을 낼 수 없다.',
      '여자는 무료 체험이 있으면 참가하려고 한다.',
      '남자는 서울 근교에서 하는 체험에 참가할 것이다.',
    ],
    answer: '2',
  },
  {
    number: 14,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '열차 안에서는 대화를 할 수 없다.',
      '이 열차는 현재 목적지로 가고 있다.',
      '승객들은 열차 안에서 마스크를 사야 한다.',
      '음식을 먹는 동안에는 마스크를 벗어도 된다.',
    ],
    answer: '4',
  },
  {
    number: 15,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여성들만 이 서비스를 신청할 수 있다.',
      '이 서비스는 전국적으로 실시되고 있다.',
      '120번에 전화를 하면 내려야 할 곳을 알려 준다.',
      '이 서비스를 이용하려면 3일 전에 신청해야 한다.',
    ],
    answer: '1',
  },
  {
    number: 16,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '남자는 계속 온라인 콘서트를 해 왔다.',
      '남자는 관객들을 직접 찾아다니고 있다.',
      '남자는 이번 콘서트를 통해 보람을 느꼈다.',
      '관객들은 새로운 방식의 콘서트를 원하지 않는다.',
    ],
    answer: '3',
  },
  {
    number: 17,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '관리하기 쉬운 식물이 좋다.',
      '집 안에서는 식물을 키울 수 없다.',
      '식물의 성장에는 햇빛과 바람이 필요하다.',
      '나무는 꽃이 피기 전에 밖에 내 놓아야 한다.',
    ],
    answer: '3',
  },
  {
    number: 18,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '운동은 매일 하는 게 좋다.',
      '걷기 운동은 아침에 해야 한다.',
      '피곤할 때 운전을 하는 것은 위험하다.',
      '걷는 것만으로도 운동 효과를 볼 수 있다.',
    ],
    answer: '4',
  },
  {
    number: 19,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '카페에서는 빵을 맛있게 만들기가 힘들다.',
      '카페 이용 시에는 이용 규칙을 잘 지켜야 한다.',
      '카페 안내문은 카페 외부에 붙여야 눈에 잘 띈다.',
      '커피를 주문한 손님들에게 빵을 무료로 주어야 한다.',
    ],
    answer: '2',
  },
  {
    number: 20,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '아이들은 부모의 영향을 많이 받는다.',
      '아이들은 부모와 대화할 때 부담을 느낀다.',
      '아이들은 생각이나 태도를 바꾸기가 어렵다.',
      '아이들은 어른들에 비해 심리적인 문제가 덜 생긴다.',
    ],
    answer: '1',
  },
  {
    number: 21,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '남자의 중심 생각으로 가장 알맞은 것을 고르십시오.',
    choices: [
      '자신에게 맞는 집을 찾는 것이 중요하다.',
      '집을 구할 때에는 보증금부터 확인해야 한다.',
      '여러 사람이 함께 사는 것은 긍정적인 면도 있다.',
      '동생과 같이 살아도 쓸데없는 오해가 생길 수 있다.',
    ],
    answer: '3',
  },
  {
    number: 22,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '남자는 얼마 전에 고향에 다녀왔다.',
      '남자가 소개하는 집은 보증금 부담이 적다.',
      '여자는 남자에게 집을 구해 달라고 부탁했다.',
      '여자는 모르는 사람들과 함께 살아 보고 싶어 한다.',
    ],
    answer: '2',
  },
  {
    number: 23,
    type: TopikQuestionType.LISTENING_SPEAKER_ACTION,
    prompt: '남자가 무엇을 하고 있는지 고르십시오.',
    choices: [
      '외국인등록증 신청 기간을 확인하고 있다.',
      '외국인등록증 재발급 방법을 문의하고 있다.',
      '외국인등록증이 필요한 이유를 설명하고 있다.',
      '외국인등록증 신청에 필요한 서류를 발급받고 있다.',
    ],
    answer: '2',
  },
  {
    number: 24,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '남자는 14일 전에 등록증을 잃어버렸다.',
      '경찰서에서 외국인등록증 재발급을 해 준다.',
      '남자는 재발급 신청을 위해서 사진을 찍어야 한다.',
      '재발급 신청서는 신청하러 가기 전에 미리 쓰는 것이 좋다.',
    ],
    answer: '4',
  },
  {
    number: 25,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '남자의 중심 생각으로 가장 알맞은 것을 고르십시오.',
    choices: [
      '달력에서는 사진이 제일 중요하다.',
      '구청에서 하는 행사에는 꼭 참여해야 한다.',
      '마음이 있다면 얼마든지 남을 도울 수 있다.',
      '동료들과 함께 하면 어려운 일도 해 낼 수 있다.',
    ],
    answer: '3',
  },
  {
    number: 26,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '남자는 운동하는 사진을 찍은 적이 있다.',
      '남자는 달력의 사진 모델로 활동하고 있다.',
      '구청에서는 매년 홍보 자료를 만들어 나누어 준다.',
      '소방서에서는 불우이웃을 돕는 행사를 할 예정이다.',
    ],
    answer: '1',
  },
  {
    number: 27,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '남자가 말하는 의도로 알맞은 것을 고르십시오.',
    choices: [
      '아동 수당의 지급 내용을 설명하기 위해',
      '아동 수당 지급의 필요성을 일깨우기 위해',
      '아동 수당 지급의 문제점을 지적하기 위해',
      '아동 수당에 대한 인식의 변화를 말하기 위해',
    ],
    answer: '3',
  },
  {
    number: 28,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '남자는 7세 미만의 아이를 키우고 있다.',
      '모든 아동은 매월 10만 원씩을 받을 수 있다.',
      '부모들은 아동 수당을 더 많이 받고 싶어 한다.',
      '아동 수당은 부모의 소득에 관계없이 똑같이 지급된다.',
    ],
    answer: '4',
  },
  {
    number: 29,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    prompt: '남자가 누구인지 고르십시오.',
    choices: [
      '패션쇼에 서는 모델',
      '옷을 디자인하는 사람',
      '현대 무용을 하는 무용가',
      '춤이나 음악 공연을 기획하는 사람',
    ],
    answer: '3',
  },
  {
    number: 30,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '남자는 이번 공연에서 의상을 적극 활용했다.',
      '남자는 패션쇼 무대에서 공연을 하고 싶어 한다.',
      '패션쇼에 가면 다양한 옷을 입어볼 기회가 있다.',
      '전통 무용에서는 관객이 원하는 옷을 입어야 한다.',
    ],
    answer: '1',
  },
  {
    number: 31,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '남자의 중심 생각으로 가장 알맞은 것을 고르십시오.',
    choices: [
      '청소년 범죄는 원인이 부모나 학교에 있다.',
      '청소년 범죄를 더욱 강하게 처벌해야 한다.',
      '나이가 어릴수록 범죄의 피해자가 되기 쉽다.',
      '우리 사회가 청소년들에게 스트레스를 주고 있다.',
    ],
    answer: '2',
  },
  {
    number: 32,
    type: TopikQuestionType.LISTENING_ATTITUDE,
    prompt: '남자의 태도로 가장 알맞은 것을 고르십시오.',
    choices: [
      '자신의 주장을 합리화하고 있다.',
      '새로운 법의 적용을 주장하고 있다.',
      '청소년 문제 해결 방안에 공감하고 있다.',
      '사례를 들어 상대방의 주장을 반박하고 있다.',
    ],
    answer: '2',
  },
  {
    number: 33,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '무엇에 대한 내용인지 알맞은 것을 고르십시오.',
    choices: [
      '면역 세포의 기능',
      '병원체의 침입 방법',
      '병원체가 미치는 영향',
      '면역 세포의 생성 원리',
    ],
    answer: '1',
  },
  {
    number: 34,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '백혈구는 모든 조직에 들어 있다.',
      '하나의 면역 세포가 하나의 병원체를 담당한다.',
      '우리 몸의 방어 체계는 스스로 만들어지지 않는다.',
      '포식 세포는 바이러스에 대항해 우리 몸을 보호한다.',
    ],
    answer: '4',
  },
  {
    number: 35,
    type: TopikQuestionType.LISTENING_SPEAKER_ACTION,
    prompt: '남자가 무엇을 하고 있는지 고르십시오.',
    choices: [
      '미술관의 프로그램을 안내하고 있다.',
      '미술 교육의 필요성을 주장하고 있다.',
      '미술관 방문객들에게 감사를 전하고 있다.',
      '미술을 재미있게 배우는 방법을 설명하고 있다.',
    ],
    answer: '1',
  },
  {
    number: 36,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '미술은 부모에게 배우는 것이 좋다.',
      '이 미술관에서는 토요일마다 체험 교실을 운영한다.',
      '아이들은 미술 교육을 통해 정신적으로도 건강해진다.',
      '체험 프로그램은 미술관 근처에 있는 센터에서 진행된다.',
    ],
    answer: '3',
  },
  {
    number: 37,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '여자의 중심 생각으로 가장 알맞은 것을 고르십시오.',
    choices: [
      '도서관에는 책이 많으면 많을수록 좋다.',
      '누구나 문화와 예술에 관심을 가져야 한다.',
      '쇼핑센터에는 시민들이 모일 수 있는 장소가 필요하다.',
      '도서관이 보다 다양한 문화 공간으로 활용되어야 한다.',
    ],
    answer: '4',
  },
  {
    number: 38,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '도서관은 쇼핑센터 바로 옆에 있다.',
      '도서관은 시민들의 참여로 만들어졌다.',
      '듣고 싶은 강연이 있으면 도서관에 신청할 수 있다.',
      '시민들은 도서관에 모여서 여러 가지 주제로 토론을 한다.',
    ],
    answer: '2',
  },
  {
    number: 39,
    type: TopikQuestionType.LISTENING_PRECEDING_CONTEXT,
    prompt: '이 대화 전의 내용으로 가장 알맞은 것을 고르십시오.',
    choices: [
      '강이 흐르는 여러 지역에 댐을 설치하고 있다.',
      '정부에서 댐 관리에 적극적인 투자를 하고 있다.',
      '댐 관리 기관과 주민들 사이에 마찰이 빚어지고 있다.',
      '댐 관리에 필요한 비용이 점점 늘어나 문제가 되고 있다.',
    ],
    answer: '3',
  },
  {
    number: 40,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '댐의 가장 중요한 기능은 홍수 조절이다.',
      '지난달 초에 아주 많은 양의 비가 내렸다.',
      '댐을 잘 관리하려면 수천억 원의 비용이 든다.',
      '강 근처에 살고 있는 주민들은 대부분 피해를 입었다.',
    ],
    answer: '2',
  },
  {
    number: 41,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '이 강연의 중심 내용으로 가장 알맞은 것을 고르십시오.',
    choices: [
      '누구나 성공하기를 원하는 것은 아니다.',
      '외모가 아름다운 사람은 쉽게 성공할 수 있다.',
      '성공하려면 대화 시 상대방의 말을 잘 들어주어야 한다.',
      '잘 웃는 습관은 성공하는 데 긍정적인 영향을 미치게 된다.',
    ],
    answer: '4',
  },
  {
    number: 42,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '잘 웃는 사람은 상대방의 마음을 쉽게 열 수 있다.',
      '대화를 하다가 주장을 관철시키고 싶을 때 웃으면 된다.',
      '자연스럽게 웃으려면 대화하기 전에 웃는 연습을 해야 한다.',
      '웃으면 복이 온다는 말은 지금 이 시대에는 맞지 않는 말이다.',
    ],
    answer: '1',
  },
  {
    number: 43,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '무엇에 대한 내용인지 알맞은 것을 고르십시오.',
    choices: [
      '물고기의 수컷은 수명이 길지 않다.',
      '가시고기는 하천으로 올라가 알을 낳는다.',
      '가시고기는 부성애가 매우 강한 물고기이다.',
      '물고기 새끼들은 부화할 때까지 힘든 과정을 겪는다.',
    ],
    answer: '3',
  },
  {
    number: 44,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '가시고기에 대한 설명으로 맞는 것을 고르십시오.',
    choices: [
      '암컷과 수컷이 함께 산란 준비를 한다.',
      '알은 작아서 침입자들의 눈에 잘 띄지 않는다.',
      '암컷은 알을 낳은 후 5일이 지나면 둥지를 떠난다.',
      '수컷은 새끼들이 둥지를 떠나면 거기에서 죽게 된다.',
    ],
    answer: '4',
  },
  {
    number: 45,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '무인자동차는 사람이 운전할 수 없다.',
      '무인자동차는 에너지를 아끼는 데에 도움이 된다.',
      '무인자동차를 타면 교통사고 걱정을 안 해도 된다.',
      '무인자동차에는 비싸고 좋은 소재를 쓸 필요가 없다.',
    ],
    answer: '2',
  },
  {
    number: 46,
    type: TopikQuestionType.LISTENING_ATTITUDE,
    prompt: '여자의 태도로 알맞은 것을 고르십시오.',
    choices: [
      '전문가들의 생각에 우려를 표하고 있다.',
      '환경오염의 심각성을 느끼고 반성하고 있다.',
      '자동차 산업의 미래를 긍정적으로 전망하고 있다.',
      '무인자동차가 가져올 미래의 변화에 기대를 걸고 있다.',
    ],
    answer: '4',
  },
  {
    number: 47,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '간접 광고는 최근에 시작된 것이다.',
      '간접 광고의 시초는 배우가 입고 있던 옷이었다.',
      '간접 광고 상품은 드라마나 영화의 일부로 등장한다.',
      '간접 광고는 소비자들이 광고라는 것을 모르게 해야 한다.',
    ],
    answer: '3',
  },
  {
    number: 48,
    type: TopikQuestionType.LISTENING_ATTITUDE,
    prompt: '남자의 태도로 알맞은 것을 고르십시오.',
    choices: [
      '간접 광고의 효과를 기대하고 있다.',
      '간접 광고의 어려움을 토로하고 있다.',
      '간접 광고라는 사실을 숨긴 것을 비판하고 있다.',
      '간접 광고 상품 구입 시 주의할 것을 당부하고 있다.',
    ],
    answer: '3',
  },
  {
    number: 49,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '영웅들은 영화 속에만 존재하는 것이 아니다.',
      '영화 속에서는 위험에 처할 때마다 영웅이 나타난다.',
      '화재가 발생한 건물의 주민들은 모두 잠을 자고 있었다.',
      '청년은 화재 현장에서 빨리 대피하지 못해 숨지고 말았다.',
    ],
    answer: '1',
  },
  {
    number: 50,
    type: TopikQuestionType.LISTENING_ATTITUDE,
    prompt: '남자의 태도로 알맞은 것을 고르십시오.',
    choices: [
      '자신의 주장과 다른 견해에 대해 반박하고 있다.',
      '구체적인 예를 들어 자신의 의견을 주장하고 있다.',
      '전문가의 말을 인용해 자신의 주장을 증명하고 있다.',
      '과학적인 이론을 근거로 예상 가능한 문제를 제기하고 있다.',
    ],
    answer: '2',
  },
];

export const TOPIK_LISTENING_MOCK_1_EXAM: TopikSeedExam = {
  code: 'topik-ii-listening-mock-1-2025',
  title: localized(
    'TOPIK II 듣기 실전모의고사 제1회',
    'TOPIK II tinglash sinov imtihoni 1',
    'TOPIK II Listening Mock Test 1',
    'TOPIK II: пробный тест по аудированию 1',
  ),
  description: localized(
    'TOPIK II 듣기 1번부터 50번까지 실제 시험 형식으로 구성한 모의고사입니다.',
    'TOPIK II tinglash bo‘limining 1–50-savollari haqiqiy imtihon shaklida tuzilgan.',
    'A TOPIK II Listening mock exam with questions 1–50 in the official test structure.',
    'Пробный экзамен TOPIK II по аудированию с заданиями 1–50 в формате реального теста.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.LISTENING,
  year: 2025,
  round: 1,
  durationMinutes: 60,
  totalQuestions: 50,
  totalPoints: 100,
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '실전모의고사 제1회 듣기',
    edition: '2025',
    publisher: '',
    reference: '사용자 제공 문제지 및 정답·해설 PDF',
  },
  publishedAt: new Date('2025-01-01T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 20 }, (_, index) => [index + 1, index + 1] as const),
  ...Array.from(
    { length: 15 },
    (_, index) => [21 + index * 2, 22 + index * 2] as const,
  ),
];

export const TOPIK_LISTENING_MOCK_1_GROUPS: TopikSeedGroup[] = groupRanges.map(
  ([startNumber, endNumber], index) => {
    const code = groupCodeFor(startNumber);
    const hasVisualChoices = startNumber <= 3;

    return {
      code,
      order: index + 1,
      startNumber,
      endNumber,
      instruction: textBlocks(instructionFor(startNumber)),
      sharedAudio: TOPIK_LISTENING_MOCK_1_AUDIO[code],
      pointsPerQuestion: 2,
      presentation: presentation(
        hasVisualChoices
          ? TopikVisualTemplate.EXAM_VISUAL_CHOICES
          : TopikVisualTemplate.EXAM_LISTENING,
        hasVisualChoices
          ? TopikChoiceLayout.TWO_COLUMNS
          : TopikChoiceLayout.ONE_COLUMN,
      ),
      version: 1,
      isActive: true,
    };
  },
);

export const TOPIK_LISTENING_MOCK_1_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map((input) => {
    const choices: TopikChoice[] = input.choices.map((text, index) => ({
      key: String(index + 1),
      text,
      order: index + 1,
      imageAssetKey: input.visualAssetKeys?.[index] ?? '',
      imageAlt: input.visualAssetKeys ? text : '',
    }));
    const pdfPage = sourcePageFor(input.number);

    return {
      code: `topik-ii-listening-mock-1-q${String(input.number).padStart(2, '0')}`,
      groupCode: groupCodeFor(input.number),
      number: input.number,
      order: input.number,
      type: input.type,
      points: 2,
      prompt: input.prompt ? textBlocks(input.prompt) : [],
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
      tags: ['topik-ii', 'listening', `question-${input.number}`],
      difficulty: input.number <= 12 ? 2 : input.number <= 32 ? 3 : 4,
      source: {
        pdfPage,
        bookPage: pdfPage + 4,
        reference: '실전모의고사 제1회 듣기, 쓰기 (2025)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_LISTENING_MOCK_1_SEED: TopikExamSeed = {
  exam: TOPIK_LISTENING_MOCK_1_EXAM,
  groups: TOPIK_LISTENING_MOCK_1_GROUPS,
  questions: TOPIK_LISTENING_MOCK_1_QUESTIONS,
};
