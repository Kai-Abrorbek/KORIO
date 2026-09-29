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
import { TOPIK_II_35_LISTENING_AUDIO } from './topik-ii-35-listening.scripts';

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
    return `topik-ii-35-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-ii-35-listening-${start}-${start + 1}`;
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
  if (number <= 36) {
    const start = number % 2 === 1 ? number : number - 1;
    return `[${start}~${start + 1}] 다음을 듣고 물음에 답하십시오. (각 2점)`;
  }
  const start = number % 2 === 1 ? number : number - 1;
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
  return 26 + pageEnds.findIndex((end) => number <= end);
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
    choiceNotes: ['1', '2', '3', '4'].map((choiceKey) => ({
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

// Source: 제35회 TOPIK II B형 1교시 시험지 PDF pp. 26–38,
// 듣기 통합 대본 PDF pp. 1–26, 정답표 PDF p. 1.
const rawQuestions: ListeningQuestionInput[] = [
  {
    number: 1,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '식당에서 남자 직원이 앉아 있는 여자에게 음료를 가져다주고 있습니다.',
      '세탁소에서 여자가 커피를 쏟은 옷을 남자 직원에게 보여 주고 있습니다.',
      '세탁기 옆에서 두 여자가 빨랫감과 옷을 들고 이야기하고 있습니다.',
      '옷 가게에서 남자가 여자에게 옷을 보여 주고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-ii-35-q01-c1',
      'topik-ii-35-q01-c2',
      'topik-ii-35-q01-c3',
      'topik-ii-35-q01-c4',
    ],
    answer: '2',
  },
  {
    number: 2,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '남녀 두 사람이 높은 건물의 전망대에서 도시를 내려다보고 있습니다.',
      '남녀 두 사람이 도시 공원에서 이야기를 나누고 있습니다.',
      '등산복을 입은 남녀 두 사람이 숲길에서 이야기를 나누고 있습니다.',
      '등산 배낭을 멘 남녀 두 사람이 산 정상 전망대에서 먼 산을 바라보고 있습니다.',
    ],
    visualAssetKeys: [
      'topik-ii-35-q02-c1',
      'topik-ii-35-q02-c2',
      'topik-ii-35-q02-c3',
      'topik-ii-35-q02-c4',
    ],
    answer: '4',
  },
  {
    number: 3,
    type: TopikQuestionType.LISTENING_VISUAL_MATCH,
    choices: [
      '모바일 쇼핑 이용객 비율: 20대 41%, 10대 23%, 30대 19%, 40대 17%.',
      '모바일 쇼핑 이용객 비율: 10대 44%, 30대 29%, 20대 19%, 40대 8%.',
      '2013년보다 2014년에 10대와 20대 모바일 쇼핑 이용객 수가 모두 줄었으며 20대가 더 많습니다.',
      '2013년보다 2014년에 10대와 20대 모바일 쇼핑 이용객 수가 모두 줄었으며 10대가 더 많습니다.',
    ],
    visualAssetKeys: [
      'topik-ii-35-q03-c1',
      'topik-ii-35-q03-c2',
      'topik-ii-35-q03-c3',
      'topik-ii-35-q03-c4',
    ],
    answer: '1',
  },
  {
    number: 4,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '기다리게 해서 죄송합니다.',
      '내일은 꼭 나가도록 하겠습니다.',
      '감기에 잘 걸리지 않는 편입니다.',
      '오늘 못 가게 되면 전화 드리겠습니다.',
    ],
    answer: '2',
  },
  {
    number: 5,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '제시간에 도착해서 다행이에요.',
      '기차가 예정보다 늦게 오겠는데요.',
      '일을 하느라 기차를 놓칠 뻔했어요.',
      '비가 와서 그 시간까지는 힘들겠는데요.',
    ],
    answer: '4',
  },
  {
    number: 6,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '안 그래도 다 팔렸더라고요.',
      '어제 벌써 하나 사 왔어요.',
      '저도 한번 만들어 보려고요.',
      '저도 가게에 가서 사야겠어요.',
    ],
    answer: '3',
  },
  {
    number: 7,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '거실이 좀 넓으면 좋겠어.',
      '그럼 저쪽으로 옮겨야겠네.',
      '이따가 몇 개 더 갖다 놓을게.',
      '화분이 없어서 허전한 것 같아.',
    ],
    answer: '2',
  },
  {
    number: 8,
    type: TopikQuestionType.LISTENING_RESPONSE,
    choices: [
      '신청서만 쓰면 빌릴 수 있어서 참 편해요.',
      '빌려가는 사람들이 생각보다 적었나 봐요.',
      '우산은 내일 출근하는 길에 갖다 드릴게요.',
      '필요할 때 빌릴 수 있어서 좋았는데 아쉽네요.',
    ],
    answer: '4',
  },
  {
    number: 9,
    type: TopikQuestionType.LISTENING_NEXT_ACTION,
    choices: [
      '침대의 사진을 찍는다.',
      '가게로 침대를 가져간다.',
      '침대를 만든 회사에 연락한다.',
      '중고 가게에 가서 침대를 산다.',
    ],
    answer: '1',
  },
  {
    number: 10,
    type: TopikQuestionType.LISTENING_NEXT_ACTION,
    choices: [
      '복사기를 수리할 사람을 찾는다.',
      '복사기의 종류와 가격을 조사한다.',
      '구매팀에 복사기 상태를 설명한다.',
      '사무실에서 쓸 복사기를 사러 간다.',
    ],
    answer: '3',
  },
  {
    number: 11,
    type: TopikQuestionType.LISTENING_NEXT_ACTION,
    choices: [
      '인문학 강의를 신청한다.',
      '교재를 사러 서점으로 간다.',
      '남자와 함께 강의를 듣는다.',
      '홈페이지에서 교재를 확인한다.',
    ],
    answer: '1',
  },
  {
    number: 12,
    type: TopikQuestionType.LISTENING_NEXT_ACTION,
    choices: [
      '현장학습 일정을 짠다.',
      '자연재해를 체험해 본다.',
      '체험관의 위치를 알아본다.',
      '체험관의 프로그램을 확인한다.',
    ],
    answer: '3',
  },
  {
    number: 13,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '해외 온라인 쇼핑몰은 물건 값이 싸서 세일을 안 한다.',
      '해외 온라인 쇼핑몰 물건은 한국보다 가격이 더 비싸다.',
      '해외 온라인 쇼핑몰에서 물건을 주문하는 방법은 복잡하다.',
      '해외 온라인 쇼핑을 하면 물건을 받을 때까지 오래 기다려야 한다.',
    ],
    answer: '4',
  },
  {
    number: 14,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '공원에서 영화를 상영할 것이다.',
      '영화 촬영 때문에 공원에서 나가야 한다.',
      '영화 촬영하는 모습을 사진으로 찍을 수 있다.',
      '동문 주차장에 있는 차를 다른 곳으로 옮겨야 한다.',
    ],
    answer: '4',
  },
  {
    number: 15,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '이 공연은 어른들을 위해 기획되었다.',
      '이 공연에는 어린이들이 무용수로 나온다.',
      '공연 중에 내용 이해를 돕는 노래가 나온다.',
      '이 발레 공연은 이번에 처음 하는 공연이다.',
    ],
    answer: '3',
  },
  {
    number: 16,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    choices: [
      '열차의 분위기는 현대적이다.',
      '10년 전부터 카페를 운영하였다.',
      '기차역과 열차를 카페로 바꿨다.',
      '카페 손님은 주민들이 대부분이다.',
    ],
    answer: '3',
  },
  {
    number: 17,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '장기간 떠나는 여행은 여러 가지 장점이 많다.',
      '시간이 날 때마다 여행을 다니는 것이 좋다.',
      '여행을 오랫동안 다녀오면 다시 취직하기가 힘들다.',
      '여행을 떠나기 전에는 철저한 계획과 준비가 필요하다.',
    ],
    answer: '1',
  },
  {
    number: 18,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '운동은 각자의 체력에 맞게 해야 한다.',
      '운동을 주 3회 하면 효과를 볼 수 없다.',
      '자기에게 맞는 운동을 골라서 해야 한다.',
      '스트레스를 받으면 운동을 안 하는 게 좋다.',
    ],
    answer: '1',
  },
  {
    number: 19,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '어렸을 때 재능은 학교에서 발견할 수 있다.',
      '아이들의 방송 출연은 걱정할 문제가 아니다.',
      '어렸을 때 방송에 출연하면 공부를 할 수 없다.',
      '아이들과 함께 방송에 출연하면 부작용이 있다.',
    ],
    answer: '2',
  },
  {
    number: 20,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    choices: [
      '전통 한복의 특징을 지키는 것이 중요하다.',
      '화려한 디자인의 한복은 대중화가 어렵다.',
      '전통 한복의 색과 선은 표현하기가 까다롭다.',
      '한복의 대중화를 위해 색과 디자인을 바꿔야 한다.',
    ],
    answer: '1',
  },
  {
    number: 21,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '남자의 중심 생각으로 맞는 것을 고르십시오.',
    choices: [
      '학교에서 소개하는 집은 믿을 만한 집이다.',
      '다른 사람과 함께 사는 것은 긍정적인 면도 있다.',
      '여러 사람이 함께 살면 사생활을 보호받지 못한다.',
      '공동생활을 하면 다른 사람의 생활을 존중해야 한다.',
    ],
    answer: '2',
  },
  {
    number: 22,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용으로 알맞은 것을 고르십시오.',
    choices: [
      '남자는 혼자 사는 것이 편하다고 생각한다.',
      '학교에서 소개해 주는 집은 보증금을 내야 한다.',
      '기숙사 신청 마감일까지 아직 시간이 남아 있다.',
      '학교에서 소개하는 집에는 혼자 쓰는 방이 없다.',
    ],
    answer: '2',
  },
  {
    number: 23,
    type: TopikQuestionType.LISTENING_SPEAKER_ACTION,
    prompt: '남자는 무엇을 하고 있는지 고르십시오.',
    choices: [
      '‘이름 부르기’ 서비스를 제안하고 있다.',
      '‘이름 부르기’ 서비스의 개선을 요구하고 있다.',
      '‘이름 부르기’ 서비스의 필요성을 강조하고 있다.',
      '‘이름 부르기’ 서비스에 대한 반응을 보고하고 있다.',
    ],
    answer: '4',
  },
  {
    number: 24,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용으로 맞는 것을 고르십시오.',
    choices: [
      '이 서비스에 대한 고객들의 반응이 좋지 않다.',
      '고객들은 자기 이름이 불리는 것을 불편하게 생각한다.',
      '이 서비스 시작 전에는 음료가 준비되면 진동벨로 알렸다.',
      '매장이 복잡할 때는 이름을 부르지 않고 진동벨을 사용한다.',
    ],
    answer: '3',
  },
  {
    number: 25,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '남자의 중심 생각으로 맞는 것을 고르십시오.',
    choices: [
      '작품의 가치는 그 재료에 따라 달라진다.',
      '사람들은 작품을 보면서 다양한 의미를 찾는다.',
      '일회용품의 사용 제한은 환경에 관심을 가지게 한다.',
      '환경 문제를 스스로 인식할 수 있도록 해 줘야 한다.',
    ],
    answer: '4',
  },
  {
    number: 26,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용으로 맞는 것을 고르십시오.',
    choices: [
      '이 남자는 환경 문제에 관심이 없다.',
      '이 남자는 작품을 통해 메시지를 전하고 있다.',
      '이 남자는 버려진 일회용품으로 작품을 만든다.',
      '이 남자가 만든 작품에는 특별한 의미가 없다.',
    ],
    answer: '2',
  },
  {
    number: 27,
    type: TopikQuestionType.LISTENING_INTENT,
    prompt: '여자가 남자에게 말하는 의도를 고르십시오.',
    choices: [
      '경기 결과를 전달하기 위해',
      '재심에 대한 동조를 얻기 위해',
      '판정에 대한 책임을 묻기 위해',
      '억울한 마음을 위로 받기 위해',
    ],
    answer: '2',
  },
  {
    number: 28,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용으로 맞는 것을 고르십시오.',
    choices: [
      '어제 경기를 할 때 선수가 작은 잘못을 했다.',
      '선수는 경기 결과를 듣고 기쁨의 눈물을 흘렸다.',
      '잘못된 판정이 있었지만 선수는 메달을 목에 걸었다.',
      '심판의 잘못된 판정에 대한 기사가 많이 보도되었다.',
    ],
    answer: '4',
  },
  {
    number: 29,
    type: TopikQuestionType.LISTENING_SPEAKER_IDENTITY,
    prompt: '남자는 누구인지 고르십시오.',
    choices: ['교육 전문가', '정부 관계자', '정책 연구가', '진로 상담가'],
    answer: '1',
  },
  {
    number: 30,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용으로 맞는 것을 고르십시오.',
    choices: [
      '아이들이 언어를 습득하는 속도는 서로 비슷하다.',
      '부모는 외국어 학습 방법에 대해 깊이 고민해야 한다.',
      '외국어 학습을 시작하는 시기는 아이마다 다를 수 있다.',
      '아이가 외국어에 관심을 갖기 전에 외국어를 가르쳐야 한다.',
    ],
    answer: '3',
  },
  {
    number: 31,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '남자의 생각으로 맞는 것을 고르십시오.',
    choices: [
      '주차 공간이 부족하지만 큰 문제는 없다.',
      '꽃과 나무 때문에 주차 공간이 좁아졌다.',
      '아파트 안에 있는 공원은 아이들에게 위험하다.',
      '사람들이 원하는 방법을 찾아 주차장을 넓혀야 한다.',
    ],
    answer: '4',
  },
  {
    number: 32,
    type: TopikQuestionType.LISTENING_ATTITUDE,
    prompt: '남자의 태도로 맞는 것을 고르십시오.',
    choices: [
      '비교를 통해 차이점을 분명하게 드러내고 있다.',
      '상대방의 의견을 존중하면서 타협점을 찾고 있다.',
      '객관적 자료에 근거하여 해결책을 제시하고 있다.',
      '다른 사람이 제기한 의견에 지지를 보내고 있다.',
    ],
    answer: '2',
  },
  {
    number: 33,
    type: TopikQuestionType.LISTENING_TOPIC,
    prompt: '무엇에 대한 내용인지 맞는 것을 고르십시오.',
    choices: [
      '현대 사회의 소통상의 문제점',
      '현대인의 심리 질환의 해결책',
      '현대 사회의 통신 기술의 한계',
      '현대인의 소통 욕구의 해소 방안',
    ],
    answer: '1',
  },
  {
    number: 34,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용으로 맞는 것을 고르십시오.',
    choices: [
      '현대인들의 소통에 대한 욕구가 점점 사라지고 있다.',
      '현대 사회는 매체의 발달로 소통하기 좋은 환경이 되었다.',
      '현대인들은 바쁜 일정 때문에 소통의 부재를 느끼지 못한다.',
      '현대 사회는 과거에 비해 소통의 질이 좋아졌으나 양이 부족하다.',
    ],
    answer: '2',
  },
  {
    number: 35,
    type: TopikQuestionType.LISTENING_SPEAKER_ACTION,
    prompt: '남자는 무엇을 하고 있는지 고르십시오.',
    choices: [
      '조선 시대 역사서에 대해 설명하고 있다.',
      '더 많은 역사 자료 전시를 요청하고 있다.',
      '역사 교육 프로그램의 필요성을 강조하고 있다.',
      '조선 시대 기록 문화 전시의 의의를 밝히고 있다.',
    ],
    answer: '4',
  },
  {
    number: 36,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용으로 맞는 것을 고르십시오.',
    choices: [
      '조선 시대에 편찬된 역사 자료는 수가 많지 않다.',
      '이 전시실에 어린이나 학생들은 입장할 수 없다.',
      '조선 시대에는 왕이 직접 역사를 기록하기도 하였다.',
      '이 전시실에서 역사 기록의 절차에 대해 알 수 있다.',
    ],
    answer: '4',
  },
  {
    number: 37,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '남자의 중심 생각으로 맞는 것을 고르십시오.',
    choices: [
      '어떤 분야든지 만 시간을 투자하면 전문성이 쌓인다.',
      '전문가가 되려면 한계를 극복하려는 노력이 필요하다.',
      '자신에게 익숙하고 편안한 것에서 벗어나는 것이 좋다.',
      '무조건 만 시간을 채운다고 해서 성공하는 것은 아니다.',
    ],
    answer: '2',
  },
  {
    number: 38,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 일치하는 것을 고르십시오.',
    choices: [
      '10년 이내에 만 시간을 채워야 전문가가 될 수 있다.',
      '음악 분야에서는 1만 시간의 법칙이 적용되지 않는다.',
      '익숙한 곡을 오랜 기간 연습하면 전문가가 될 수 있다.',
      '성공할 수 있는 기본 조건은 만 시간을 투자하는 것이다.',
    ],
    answer: '4',
  },
  {
    number: 39,
    type: TopikQuestionType.LISTENING_PRECEDING_CONTEXT,
    prompt: '이 대화 앞의 내용으로 알맞은 것을 고르십시오.',
    choices: [
      '세계적으로 곡물 배분의 불균형 문제가 심각하다.',
      '세계 곡물 생산량 중 많은 양이 가축 먹이로 소비된다.',
      '곡물 시장에서는 몇몇 국가들의 주도로 가격이 결정된다.',
      '곡물을 먹고 자란 소들은 식물을 먹고 자란 소보다 빨리 자란다.',
    ],
    answer: '2',
  },
  {
    number: 40,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 일치하는 것을 고르십시오.',
    choices: [
      '곡물상들은 이윤을 위해 곡물을 대량 구매한다.',
      '곡물 가격이 오르면 국제기구가 시장에 개입한다.',
      '국제기구는 식량을 구입하여 가난한 나라에 싸게 공급한다.',
      '가축 사료로 소비되는 곡물 양 때문에 곡물 가격이 내려간다.',
    ],
    answer: '1',
  },
  {
    number: 41,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 일치하는 것을 고르십시오.',
    choices: [
      '원숭이는 복잡한 동작을 따라 할 수 있다.',
      '아기들은 거울 세포를 아직 가지고 있지 않다.',
      '인간은 직접 경험하지 않아도 지식을 습득할 수 있다.',
      '인간은 책에서 읽은 것을 행동으로 따라 하면서 이해한다.',
    ],
    answer: '3',
  },
  {
    number: 42,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '남자의 중심 생각으로 맞는 것을 고르십시오.',
    choices: [
      '원숭이는 인간보다 모방 능력이 떨어진다.',
      '인간은 모방을 통해서 새로운 지식을 학습한다.',
      '인간은 거울 세포를 통해 문화를 발달시킬 수 있다.',
      '다른 사람을 따라 할 때 뇌 속의 거울 세포가 작용한다.',
    ],
    answer: '3',
  },
  {
    number: 43,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '겨울철 둠벙에 물이 없는 이유로 맞는 것을 고르십시오.',
    choices: [
      '벼농사를 짓지 않기 때문에',
      '습지 동식물들이 사라졌기 때문에',
      '농사를 지을 때 물이 많이 필요하기 때문에',
      '물이 없어야 둠벙의 기능을 제대로 할 수 있기 때문에',
    ],
    answer: '1',
  },
  {
    number: 44,
    type: TopikQuestionType.LISTENING_MAIN_IDEA,
    prompt: '이 이야기의 중심 내용으로 맞는 것을 고르십시오.',
    choices: [
      '둠벙은 농사를 위해 물을 채워야 한다.',
      '둠벙은 인위적으로 빈 상태를 유지한다.',
      '둠벙은 습지 동식물의 소중한 생활공간이다.',
      '둠벙은 논에 물을 공급하기 위해 만든 웅덩이이다.',
    ],
    answer: '3',
  },
  {
    number: 45,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 일치하는 것을 고르십시오.',
    choices: [
      '‘팝페라’는 익숙한 느낌 때문에 신선하지 않다.',
      '두 장르가 만나서 생겨난 음악은 이해하기 어렵다.',
      '‘콜라보레이션’은 다름을 인정하고 조화를 추구한다.',
      '지금은 ‘같음’과 ‘다름’이라는 이분법적 사고가 필요한 때이다.',
    ],
    answer: '3',
  },
  {
    number: 46,
    type: TopikQuestionType.LISTENING_ATTITUDE,
    prompt: '여자의 태도로 가장 알맞은 것을 고르십시오.',
    choices: [
      '구체적인 사례에서 결론을 유도하고 있다.',
      '기준을 제시하면서 내용을 분류하고 있다.',
      '예리한 관찰을 통해 현상을 분석하고 있다.',
      '안정된 논리로 자신의 청중을 설득하고 있다.',
    ],
    answer: '1',
  },
  {
    number: 47,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 일치하는 것을 고르십시오.',
    choices: [
      '의료 서비스 산업의 발전에는 투자가 중요하다.',
      '의료 서비스 산업의 국가 경쟁력이 높은 편이다.',
      '의료 서비스 산업을 위한 제도 정착이 불가능하다.',
      '의료 서비스 산업을 위한 비영리기관의 설립이 시급하다.',
    ],
    answer: '1',
  },
  {
    number: 48,
    type: TopikQuestionType.LISTENING_ATTITUDE,
    prompt: '남자의 태도로 가장 알맞은 것을 고르십시오.',
    choices: [
      '국내 병원의 해외 진출 부작용을 설명하고 있다.',
      '의료 산업의 현 위치와 문제점을 진단하고 있다.',
      '현재 선진국 의료 산업 현황에 우려를 나타내고 있다.',
      '의사의 국제 경쟁력을 높이기 위한 법 제정을 촉구하고 있다.',
    ],
    answer: '2',
  },
  {
    number: 49,
    type: TopikQuestionType.LISTENING_CONTENT_MATCH,
    prompt: '들은 내용과 일치하는 것을 고르십시오.',
    choices: [
      '물 산업 발전을 위해 신기술을 수입해야 한다.',
      '물 산업 육성을 위한 하수 처리 기술 개발이 부족하다.',
      '물 산업 육성을 위해 체계적인 기술 수입 방안이 논의되어야 한다.',
      '물 산업 발전을 위한 효과적인 방법은 물 관련 기관들의 협력이다.',
    ],
    answer: '4',
  },
  {
    number: 50,
    type: TopikQuestionType.LISTENING_ATTITUDE,
    prompt: '여자의 태도로 가장 알맞은 것을 고르십시오.',
    choices: [
      '물 산업 정책의 사례를 설명하며 비판하고 있다.',
      '물 산업 정책의 결과를 분석하며 반성하고 있다.',
      '물 부족 현상을 지적하며 그 대비책을 제안하고 있다.',
      '물 부족 현상의 원인 규명을 강력하게 촉구하고 있다.',
    ],
    answer: '3',
  },
];

export const TOPIK_II_35_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-ii-listening-35-2014',
  title: localized(
    '제35회 TOPIK II 듣기',
    '35-TOPIK II tinglash',
    '35th TOPIK II Listening',
    '35-й TOPIK II: аудирование',
  ),
  description: localized(
    '제35회 한국어능력시험 TOPIK II 듣기 1번부터 50번까지를 원문 구조대로 구성했습니다.',
    '35-TOPIK II tinglash bo‘limining 1–50-savollari asl imtihon tuzilishida.',
    'Questions 1–50 of the 35th TOPIK II Listening test in the original exam structure.',
    'Задания 1–50 аудирования 35-го TOPIK II в структуре оригинального экзамена.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.LISTENING,
  year: 2014,
  round: 35,
  durationMinutes: 60,
  totalQuestions: 50,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제35회 한국어능력시험 II B형 듣기',
    edition: '제35회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 test-paper-paper.pdf, listening-transcript-transcript.pdf, answer-keys-answers.pdf',
  },
  publishedAt: new Date('2014-07-20T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 20 }, (_, index) => [index + 1, index + 1] as const),
  ...Array.from(
    { length: 15 },
    (_, index) => [21 + index * 2, 22 + index * 2] as const,
  ),
];

export const TOPIK_II_35_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
  ([startNumber, endNumber], index) => {
    const code = groupCodeFor(startNumber);
    const visual = startNumber <= 3;
    return {
      code,
      order: index + 1,
      startNumber,
      endNumber,
      instruction: textBlocks(instructionFor(startNumber)),
      sharedAudio: TOPIK_II_35_LISTENING_AUDIO[code],
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

export const TOPIK_II_35_LISTENING_QUESTIONS: TopikSeedQuestion[] =
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
      code: `topik-ii-listening-35-q${String(input.number).padStart(2, '0')}`,
      groupCode: groupCodeFor(input.number),
      number: input.number,
      order: input.number,
      type: input.type,
      points: 2,
      prompt: input.prompt ? textBlocks(input.prompt) : [],
      audio: TOPIK_II_35_LISTENING_AUDIO[groupCodeFor(input.number)],
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
      tags: ['topik-ii', 'round-35', 'listening', `question-${input.number}`],
      difficulty: input.number <= 12 ? 2 : input.number <= 32 ? 3 : 4,
      source: {
        pdfPage,
        bookPage: pdfPage - 25,
        reference: '제35회 한국어능력시험 II B형 1교시 (듣기, 쓰기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_II_35_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_II_35_LISTENING_EXAM,
  groups: TOPIK_II_35_LISTENING_GROUPS,
  questions: TOPIK_II_35_LISTENING_QUESTIONS,
};
