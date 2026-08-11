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
import { TOPIK_LISTENING_MOCK_2_AUDIO } from './topik-listening-mock-2.scripts';

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
  if (number <= 20) return 'listening-' + String(number).padStart(2, '0');
  const start = number % 2 === 1 ? number : number - 1;
  return 'listening-' + start + '-' + (start + 1);
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
  return (
    '[' +
    start +
    '~' +
    (start + 1) +
    '] 다음을 듣고 물음에 답하십시오. (각 2점)'
  );
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
    '정답은 ' +
      symbol +
      '입니다. 듣기 대본의 핵심 내용과 “' +
      correctChoice +
      '”가 일치합니다.',
    'To‘g‘ri javob ' +
      symbol +
      '. Tinglash matnidagi asosiy ma’no “' +
      correctChoice +
      '” javobiga mos keladi.',
    'The correct answer is ' +
      symbol +
      '. The key information in the audio matches “' +
      correctChoice +
      '.”',
    'Правильный ответ — ' +
      symbol +
      '. Ключевая информация аудиозаписи соответствует варианту «' +
      correctChoice +
      '».',
  );
  const strategy = localized(
    '질문이 중심 생각, 세부 내용, 행동, 태도 중 무엇을 묻는지 먼저 확인하고 대본의 바뀐 표현을 찾으십시오.',
    'Avval savol asosiy fikr, tafsilot, harakat yoki munosabatni so‘rayotganini aniqlang va matndagi boshqacha ifodani toping.',
    'First identify whether the question asks for a main idea, detail, action, or attitude, then find the paraphrase in the audio.',
    'Сначала определите, спрашивается ли главная мысль, деталь, действие или отношение, затем найдите перефразирование в аудио.',
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
          '질문 초점 확인',
          'Savol markazini aniqlash',
          'Identify the focus',
          'Определите цель',
        ),
        explanation: strategy,
        targetSegmentKeys: [],
      },
      {
        key: 'step-2',
        order: 2,
        title: localized(
          '대본과 보기 연결',
          'Matn va javobni bog‘lash',
          'Match audio and choice',
          'Сопоставьте аудио и вариант',
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
          '질문의 초점',
          'Savolning markazi',
          'Question focus',
          'Цель вопроса',
        ),
        content: strategy,
        examples: [],
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
          'Matn va javob ko‘pincha bir ma’noni boshqa so‘zlar bilan ifodalaydi.',
          'The audio and the choice often express the same idea in different words.',
          'Аудио и вариант часто выражают одну мысль разными словами.',
        ),
        examples: [],
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
        examples: [],
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
              'Этот вариант не соответствует ключевой информации аудио.',
            ),
    })),
  };
};

const rawQuestions: ListeningQuestionInput[] = [
  {
    number: 1,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '두 사람이 편의점 안에서 음료수를 고르고 있다.',
      '두 사람이 차를 타고 계속 이동하고 있다.',
      '두 사람이 편의점 앞에 차를 세워 두고 이야기하고 있다.',
      '두 사람이 편의점 앞 야외 탁자에 앉아 있다.',
    ],
    visualAssetKeys: [
      'topik-ii-listening-mock-2-q01-c1',
      'topik-ii-listening-mock-2-q01-c2',
      'topik-ii-listening-mock-2-q01-c3',
      'topik-ii-listening-mock-2-q01-c4',
    ],
    answer: '2',
  },
  {
    number: 2,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '남자와 여자가 학교 앞에서 이야기하고 있다.',
      '여자가 지하철역의 광고판을 보고 있다.',
      '남자가 이삿짐센터에 전화하고 있다.',
      '지하철 안에서 남자가 내릴 역을 알려 주고 있다.',
    ],
    visualAssetKeys: [
      'topik-ii-listening-mock-2-q02-c1',
      'topik-ii-listening-mock-2-q02-c2',
      'topik-ii-listening-mock-2-q02-c3',
      'topik-ii-listening-mock-2-q02-c4',
    ],
    answer: '4',
  },
  {
    number: 3,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '방송 매체 선호도는 텔레비전 45%, 인터넷 37%, 기타 18%이다.',
      '방송 매체 선호도는 인터넷 51%, 텔레비전 34%, 기타 15%이다.',
      '음식 프로그램 수가 2016년 40개, 2017년 60개, 2018년 100개로 증가했다.',
      '음식 프로그램 수가 2016년 60개, 2017년 40개, 2018년 80개로 변했다.',
    ],
    visualAssetKeys: [
      'topik-ii-listening-mock-2-q03-c1',
      'topik-ii-listening-mock-2-q03-c2',
      'topik-ii-listening-mock-2-q03-c3',
      'topik-ii-listening-mock-2-q03-c4',
    ],
    answer: '3',
  },
  {
    number: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '저도 그 비결을 좀 알고 싶어요.',
      '저도 드라마를 꾸준히 봐야겠네요.',
      '그 드라마를 많이 본다고 들었어요.',
      '한국어를 연습할 시간이 별로 없어요.',
    ],
    answer: '2',
  },
  {
    number: 5,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '그럼 빨리 예약하도록 하세요.',
      '지난주에 여행을 갈 걸 그랬어요.',
      '저는 그 호텔이 마음에 안 들어요.',
      '그러니까 잊지 말고 숙소부터 예약했어야죠.',
    ],
    answer: '4',
  },
  {
    number: 6,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '정말 아쉬웠겠네요.',
      '천천히 가도 될 거예요.',
      '등산을 별로 안 좋아하나 봐요.',
      '아무리 힘들어도 포기하지 마세요.',
    ],
    answer: '1',
  },
  {
    number: 7,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '생활비가 없을 줄 알았어.',
      '나도 쇼핑하러 가려고 해.',
      '돈을 좀 아껴 쓰지 그랬어?',
      '아르바이트를 그만두는 게 어때?',
    ],
    answer: '3',
  },
  {
    number: 8,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '모집하게 되면 다시 전화해 주시겠어요?',
      '그럼 오후에만 일을 할 수는 없을까요?',
      '그래서 학생들은 일을 하기가 힘들어요.',
      '학교에 가든지 말든지 신경 쓰지 마세요.',
    ],
    answer: '2',
  },
  {
    number: 9,
    type: TopikQuestionType.LISTENING_NEXT_ACTION,
    choices: [
      '마늘을 간장에 넣는다.',
      '냉장고에서 야채를 꺼낸다.',
      '남자에게 간장을 가져다준다.',
      '불고기 만드는 방법을 찾아본다.',
    ],
    answer: '2',
  },
  {
    number: 10,
    type: TopikQuestionType.LISTENING_NEXT_ACTION,
    choices: [
      '서울역에서 길을 물어본다.',
      '시청역에서 지하철을 갈아탄다.',
      '다음 역에 내려서 버스를 탄다.',
      '내려서 반대 방향의 지하철을 탄다.',
    ],
    answer: '3',
  },
  {
    number: 11,
    type: TopikQuestionType.LISTENING_NEXT_ACTION,
    choices: [
      '선물을 사러 간다.',
      '집들이 준비를 한다.',
      '나영이에게 연락을 한다.',
      '진수에게 주소를 알려 준다.',
    ],
    answer: '3',
  },
  {
    number: 12,
    type: TopikQuestionType.LISTENING_NEXT_ACTION,
    choices: [
      '마리에게 이메일을 보낸다.',
      '마리의 전화번호를 알아본다.',
      '마리를 만나러 공항으로 간다.',
      '마리가 보낸 이메일을 확인한다.',
    ],
    answer: '1',
  },
  {
    number: 13,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여자는 식사를 자주 거르는 편이다.',
      '남자는 여자의 건강을 걱정하고 있다.',
      '남자는 여자에게 질문을 많이 하는 편이다.',
      '여자는 한국 친구들에게 비슷한 인사를 듣는다.',
    ],
    answer: '4',
  },
  {
    number: 14,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '편지에는 좋은 소식을 쓰는 게 좋다.',
      '휴대폰으로는 감정을 전달하기가 힘들다.',
      '휴대폰이 없는 사람들은 편지를 써야 한다.',
      '편지를 쓰다 보면 마음속의 이야기를 할 수 있다.',
    ],
    answer: '4',
  },
  {
    number: 15,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '올가을에는 비가 자주 올 것이다.',
      '내륙에는 내일 오전에도 비가 내릴 것이다.',
      '소나기로 인해 날씨가 좀 시원해질 것이다.',
      '동해안 지역에는 무더운 날씨가 계속될 것이다.',
    ],
    answer: '2',
  },
  {
    number: 16,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '여행자라면 누구나 이 민박을 이용할 수 있다.',
      '주인 부부는 자녀들과 함께 민박을 운영하고 있다.',
      '민박에 묵는 동안 한국 음식을 만들어 볼 수 있다.',
      '민박에서는 외국인들에게 일자리도 소개해 주고 있다.',
    ],
    answer: '3',
  },
  {
    number: 17,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '집안에서는 청소기를 사용하면 안 된다.',
      '아이들을 낮에만 뛰어다니도록 해야 한다.',
      '공동주택에 살려면 서로 예의를 지켜야 한다.',
      '다른 집에 피해를 주지 않는 소음은 내도 된다.',
    ],
    answer: '3',
  },
  {
    number: 18,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '부장님도 솔직한 사람을 좋아하실 것이다.',
      '상황에 따라서 거짓말이 도움이 될 수도 있다.',
      '거짓말을 하는 사람과는 등산을 같이 할 수 없다.',
      '누구나 남에게 피해를 주는 거짓말을 해도 괜찮다.',
    ],
    answer: '2',
  },
  {
    number: 19,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '부동산 광고의 내용을 무조건 믿어서는 안 된다.',
      '인터넷 광고에서는 사진의 역할이 가장 중요하다.',
      '부동산 광고 사진은 휴대폰의 카메라로 찍어야 한다.',
      '시간을 아끼기 위해서는 인터넷으로 집을 알아보는 게 좋다.',
    ],
    answer: '1',
  },
  {
    number: 20,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '영화는 시끄러운 곳에서 봐야 한다.',
      '영화를 보려면 표를 일찍 예매해야 한다.',
      '극장에서 영화를 봐야 재미를 충분히 느낄 수 있다.',
      '시간이 없으면 집에서 인터넷으로 영화를 보는 게 좋다.',
    ],
    answer: '3',
  },
  {
    number: 21,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '남자의 중심 생각으로 가장 알맞은 것을 고르십시오.',
    choices: [
      'SNS는 매우 유용한 통신 수단이다.',
      '유학을 가려면 꼼꼼하게 준비해야 한다.',
      '친구 사이라고 해도 서로 예의를 지켜야 한다.',
      '가까운 사이일수록 먼저 사정을 이해해 주어야 한다.',
    ],
    answer: '4',
  },
  {
    number: 22,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '유학을 가면 메시지를 확인하기가 힘들다.',
      'SNS에 사진을 올리는 것은 위험한 일이다.',
      '남자는 유학 간 친구에게 먼저 연락하지 않을 것이다.',
      '여자는 친구에게 연락할 방법이 없어서 걱정하고 있다.',
    ],
    answer: '3',
  },
  {
    number: 23,
    type: TopikQuestionType.LISTENING_SPEAKER_ACTION,
    prompt: '남자가 무엇을 하고 있는지 고르십시오.',
    choices: [
      '식당 예약 시간을 변경하고 있다.',
      '직원에게 예약 내용을 확인하고 있다.',
      '내일 저녁 모임에 대해 설명하고 있다.',
      '식당에서 만나기로 한 약속을 취소하고 있다.',
    ],
    answer: '2',
  },
  {
    number: 24,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '취소나 변경은 전화로 할 수 있다.',
      '금요일 저녁 메뉴에는 갈비찜이 없다.',
      '이 식당의 직원들은 한국어를 잘 모른다.',
      '예약 시간 두 시간 전까지 식당에 도착해야 한다.',
    ],
    answer: '1',
  },
  {
    number: 25,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '남자의 중심 생각으로 가장 알맞은 것을 고르십시오.',
    choices: [
      '남자 아이들도 춤을 배우는 게 좋다.',
      '학교는 학생이 원하는 것을 하게 해 주어야 한다.',
      '도시의 학교보다 시골 학교에서 더 많은 것을 배울 수 있다.',
      '춤을 추는 활동을 통해 더욱 건강한 학교생활을 할 수 있다.',
    ],
    answer: '4',
  },
  {
    number: 26,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '이 학교의 학생들은 하루에 세 시간씩 춤을 배운다.',
      '이 학교에는 도시의 학교에 없는 프로그램이 많다.',
      '올해 이 학교의 학생 수는 작년보다 40명이나 늘었다.',
      '남학생들은 대부분 유행하는 춤을 배우는 것을 어색해한다.',
    ],
    answer: '2',
  },
  {
    number: 27,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '남자가 말하는 의도로 알맞은 것을 고르십시오.',
    choices: [
      '운전면허 시험을 함께 준비하려고',
      '여자를 만나서 운전을 가르쳐 주려고',
      '여자가 어떤 차를 운전하는지 알아보려고',
      '운전면허 시험을 잘 보는 방법을 물어보려고',
    ],
    answer: '2',
  },
  {
    number: 28,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '운전은 하면 할수록 쉬워진다.',
      '여자는 운전하는 것을 싫어한다.',
      '운전면허 시험은 매주 일요일에 있다.',
      '여자는 운전면허 시험에 어렵게 합격했다.',
    ],
    answer: '4',
  },
  {
    number: 29,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    prompt: '남자가 누구인지 고르십시오.',
    choices: [
      '초등학교 교사',
      '어린이집 교사',
      '유아용품 회사 직원',
      '어린이 전문 병원 의사',
    ],
    answer: '2',
  },
  {
    number: 30,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '남자는 여자 선생님들과 사이가 안 좋다.',
      '여자보다 남자가 아이들을 더 잘 돌본다.',
      '요즘 일자리를 찾지 못한 젊은이들이 많다.',
      '남자는 이 일을 선택한 것을 후회하고 있다.',
    ],
    answer: '3',
  },
  {
    number: 31,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '남자의 중심 생각으로 가장 알맞은 것을 고르십시오.',
    choices: [
      '여름에는 보양식을 먹어야 한다.',
      '요즘은 모두 개를 가족처럼 여기고 있다.',
      '보신탕을 먹은 데에는 역사적인 이유가 있다.',
      '오랫동안 해 왔다고 해서 문화라고 할 수는 없다.',
    ],
    answer: '3',
  },
  {
    number: 32,
    type: TopikQuestionType.LISTENING_ATTITUDE,
    prompt: '남자의 태도로 가장 알맞은 것을 고르십시오.',
    choices: [
      '문제에 대한 해결책을 제시하고 있다.',
      '자신의 실수에 대해 변명을 하고 있다.',
      '최근 변화된 사회 분위기를 비판하고 있다.',
      '상대방의 의견을 긍정적으로 평가하고 있다.',
    ],
    answer: '3',
  },
  {
    number: 33,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '무엇에 대한 내용인지 알맞은 것을 고르십시오.',
    choices: [
      '감자탕의 재료 손질 과정',
      '감자탕이라는 이름의 유래',
      '감자탕을 맛있게 먹는 방법',
      '감자탕에 들어 있는 영양 정보',
    ],
    answer: '2',
  },
  {
    number: 34,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '한국인들은 저녁에만 감자탕을 먹는다.',
      '감자가 많이 들어가야 감자탕이 맛있어진다.',
      '과거에는 주로 술을 마실 때 감자탕을 같이 먹었다.',
      '아이들은 감자탕이 맵기 때문에 별로 좋아하지 않는다.',
    ],
    answer: '3',
  },
  {
    number: 35,
    type: TopikQuestionType.LISTENING_SPEAKER_ACTION,
    prompt: '남자가 무엇을 하고 있는지 고르십시오.',
    choices: [
      '봉사 활동의 유형을 설명하고 있다.',
      '봉사 단원 모집에 대한 안내를 하고 있다.',
      '지구촌 이웃들의 발전 경험을 소개하고 있다.',
      '지금까지 한 봉사 활동의 성과를 보고하고 있다.',
    ],
    answer: '2',
  },
  {
    number: 36,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '청소년들도 봉사 단원으로 지원할 수 있다.',
      '봉사 단원이 되면 경제적으로 안정된 삶을 살 수 있다.',
      '누구나 봉사가 끝나면 단체에서 일해 볼 기회를 얻게 된다.',
      '봉사 활동에는 파견 지역 주민들을 가르치는 일도 포함된다.',
    ],
    answer: '4',
  },
  {
    number: 37,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '여자의 중심 생각으로 가장 알맞은 것을 고르십시오.',
    choices: [
      '윗사람들은 의견을 주장하지 않는 것이 좋다.',
      '집단 내의 의사소통은 큰 문제를 방지할 수 있다.',
      '부정적인 분위기는 회의에서 더 나은 결과를 낳는다.',
      '아랫사람들에게는 나쁜 소식을 말하지 않는 것이 좋다.',
    ],
    answer: '2',
  },
  {
    number: 38,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '침묵효과로 인해 부정적인 결과가 생길 수 있다.',
      '윗사람들은 글을 쓰는 것을 별로 좋아하지 않는다.',
      '회의에서는 아랫사람이 먼저 말을 꺼내는 게 좋다.',
      '부정적인 분위기를 만드는 것은 주로 아랫사람들이다.',
    ],
    answer: '1',
  },
  {
    number: 39,
    type: TopikQuestionType.LISTENING_PRECEDING_CONTEXT,
    prompt: '이 대화 전의 내용으로 가장 알맞은 것을 고르십시오.',
    choices: [
      '일회용 컵을 사용하는 사람들이 점점 늘고 있다.',
      '커피숍에서는 커피뿐만 아니라 머그컵도 판매한다.',
      '우리나라는 커피숍 안에서 커피를 마시는 사람이 많다.',
      '우리나라는 매장 안에서 일회용품을 많이 사용하고 있다.',
    ],
    answer: '4',
  },
  {
    number: 40,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '대부분의 커피숍들은 좌석이 부족한 실정이다.',
      '손님들은 자신의 머그컵을 사용하고 싶어 한다.',
      '이제 법적으로 커피숍 안에서는 일회용 컵을 쓸 수 없다.',
      '직원들은 일회용 컵 금지에 대한 안내를 해 주지 않는다.',
    ],
    answer: '3',
  },
  {
    number: 41,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '이 강연의 중심 내용으로 가장 알맞은 것을 고르십시오.',
    choices: [
      '한옥은 양옥과 큰 차이를 가지고 있다.',
      '한옥은 예술적인 면에서 가치가 높은 집이다.',
      '한옥을 제대로 이해하려면 운현궁에 가 봐야 한다.',
      '운현궁은 양옥의 실용성을 그대로 보여주는 곳이다.',
    ],
    answer: '2',
  },
  {
    number: 42,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '운현궁은 고종이 왕이 되기 전에 지내던 곳이다.',
      '한옥은 공간이 다양해 양옥에 비해 살기 편하다.',
      '한옥의 마루를 보면 곡선의 미를 발견할 수 있다.',
      '한옥의 창문에는 한지를 사용해 화려한 느낌을 준다.',
    ],
    answer: '1',
  },
  {
    number: 43,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '무엇에 대한 내용인지 알맞은 것을 고르십시오.',
    choices: [
      '여성이 남성보다 정치 활동에 더 적합하다.',
      '여성들도 더욱 활발하게 문화 활동을 해야 한다.',
      '여성들도 정치를 할 수 있도록 능력을 더 키워야 한다.',
      '여성들이 정치에 참여할 수 있는 사회적 분위기를 만들어야 한다.',
    ],
    answer: '4',
  },
  {
    number: 44,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '여성 정치인의 비율이 낮은 이유로 맞는 것을 고르십시오.',
    choices: [
      '여성 인구가 남성보다 적기 때문에',
      '우리 사회가 가지고 있는 편견 때문에',
      '남성들보다 감수성이 풍부하기 때문에',
      '정치를 할 만한 능력이 부족하기 때문에',
    ],
    answer: '2',
  },
  {
    number: 45,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '현재 노인 인구가 전체 인구의 10%에 달한다.',
      '정부는 지금까지 치매 노인 문제에 잘 대응해 왔다.',
      '치매 노인 문제를 해결하려면 복지 서비스의 확대가 필요하다.',
      '의학 기술의 발달로 치매 발병률은 점점 낮아질 것으로 보인다.',
    ],
    answer: '3',
  },
  {
    number: 46,
    type: TopikQuestionType.LISTENING_ATTITUDE,
    prompt: '여자가 말하는 방식으로 알맞은 것을 고르십시오.',
    choices: [
      '치매 노인을 돌봤던 경험을 소개하고 있다.',
      '고령화로 인한 사회의 변화를 설명하고 있다.',
      '노인 문제의 해결책을 구체적으로 제시하고 있다.',
      '정부의 정책을 분석하며 자신의 견해를 전달하고 있다.',
    ],
    answer: '4',
  },
  {
    number: 47,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '입장료를 받지 않으면 공원을 관리할 수 없다.',
      '과거에도 한라산의 입장료를 받았던 적이 있다.',
      '방문객들은 대부분 입장료를 받으면 안 된다고 생각한다.',
      '한라산에서는 매년 방문객으로 인한 사고가 증가하고 있다.',
    ],
    answer: '2',
  },
  {
    number: 48,
    type: TopikQuestionType.LISTENING_ATTITUDE,
    prompt: '남자의 태도로 알맞은 것을 고르십시오.',
    choices: [
      '공원 관리 방법에 대해 다양한 견해를 전달하고 있다.',
      '현재 입장료가 상식에 어긋난다는 점을 지적하고 있다.',
      '한라산 보호의 필요성에 대해 적극적으로 주장하고 있다.',
      '입장료 징수의 필요성에 대해 사례를 들어 설명하고 있다.',
    ],
    answer: '4',
  },
  {
    number: 49,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 같은 것을 고르십시오.',
    choices: [
      '행복 호텔의 직원들은 유명한 사람이 많다.',
      '문제가 처리되면 상사에게 보고하지 않아도 된다.',
      '고객의 편의를 위해서는 상사가 결정한 일도 바꿀 수 있다.',
      '행복 호텔에서는 직원들에게 매출액의 15%를 나누어 준다.',
    ],
    answer: '3',
  },
  {
    number: 50,
    type: TopikQuestionType.LISTENING_ATTITUDE,
    prompt: '여자의 태도로 알맞은 것을 고르십시오.',
    choices: [
      '구체적인 사례를 통해 올바른 기업 경영 방안을 제시하고 있다.',
      '여러 전문가의 견해를 인용하면서 호텔의 미래를 전망하고 있다.',
      '다른 나라의 사례와 비교해 가면서 기업가의 책임을 밝히고 있다.',
      '최근의 조사 결과를 바탕으로 호텔 운영의 현황을 비판하고 있다.',
    ],
    answer: '1',
  },
];

export const TOPIK_LISTENING_MOCK_2_EXAM: TopikSeedExam = {
  code: 'topik-ii-listening-mock-2-2025',
  title: localized(
    'TOPIK II 듣기 실전모의고사 제2회',
    'TOPIK II tinglash sinov imtihoni 2',
    'TOPIK II Listening Mock Test 2',
    'TOPIK II: пробный тест по аудированию 2',
  ),
  description: localized(
    'TOPIK II 듣기 1번부터 50번까지 실제 시험 형식으로 구성한 제2회 모의고사입니다.',
    'TOPIK II tinglash bo‘limining 1–50-savollaridan tuzilgan ikkinchi sinov imtihoni.',
    'The second TOPIK II Listening mock exam with questions 1–50 in the official test structure.',
    'Второй пробный экзамен TOPIK II по аудированию с заданиями 1–50 в формате реального теста.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.LISTENING,
  year: 2025,
  round: 2,
  durationMinutes: 60,
  totalQuestions: 50,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '실전모의고사 제2회 듣기',
    edition: '2025',
    publisher: '',
    reference: '사용자 제공 문제지 및 정답·해설 PDF',
  },
  publishedAt: new Date('2025-02-01T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 20 }, (_, index) => [index + 1, index + 1] as const),
  ...Array.from(
    { length: 15 },
    (_, index) => [21 + index * 2, 22 + index * 2] as const,
  ),
];

export const TOPIK_LISTENING_MOCK_2_GROUPS: TopikSeedGroup[] = groupRanges.map(
  ([startNumber, endNumber], index) => {
    const code = groupCodeFor(startNumber);
    const hasVisualChoices = startNumber <= 3;

    return {
      code,
      order: index + 1,
      startNumber,
      endNumber,
      instruction: textBlocks(instructionFor(startNumber)),
      sharedAudio: TOPIK_LISTENING_MOCK_2_AUDIO[code],
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

export const TOPIK_LISTENING_MOCK_2_QUESTIONS: TopikSeedQuestion[] =
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
      code:
        'topik-ii-listening-mock-2-q' + String(input.number).padStart(2, '0'),
      groupCode: groupCodeFor(input.number),
      number: input.number,
      order: input.number,
      type: input.type,
      points: 2,
      prompt: input.prompt ? textBlocks(input.prompt) : [],
      audio: TOPIK_LISTENING_MOCK_2_AUDIO[groupCodeFor(input.number)],
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
      tags: ['topik-ii', 'listening', 'mock-2', 'question-' + input.number],
      difficulty: input.number <= 12 ? 2 : input.number <= 32 ? 3 : 4,
      source: {
        pdfPage,
        bookPage: pdfPage + 46,
        reference: '실전모의고사 제2회 듣기 (2025)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_LISTENING_MOCK_2_SEED: TopikExamSeed = {
  exam: TOPIK_LISTENING_MOCK_2_EXAM,
  groups: TOPIK_LISTENING_MOCK_2_GROUPS,
  questions: TOPIK_LISTENING_MOCK_2_QUESTIONS,
};
