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
import { TOPIK_II_37_LISTENING_AUDIO } from './topik-ii-37-listening.scripts';

type AnswerKey = '1' | '2' | '3' | '4';
type ChoiceTuple = [string, string, string, string];
type QuestionInput = [number: number, choices: ChoiceTuple];

const localized = (
  ko: string,
  uz: string,
  en: string,
  ru: string,
): TopikI18nText => ({
  ko,
  uz,
  en,
  ru,
});

const groupCodeFor = (number: number) => {
  if (number <= 20)
    return `topik-ii-37-listening-${String(number).padStart(2, '0')}`;
  const start = number % 2 === 1 ? number : number - 1;
  return `topik-ii-37-listening-${start}-${start + 1}`;
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
    22: '들은 내용으로 알맞은 것을 고르십시오.',
    23: '남자는 무엇을 하고 있는지 고르십시오.',
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
    37: '여자의 중심 생각으로 맞는 것을 고르십시오.',
    38: '들은 내용과 일치하는 것을 고르십시오.',
    39: '이 담화 앞의 내용으로 알맞은 것을 고르십시오.',
    40: '들은 내용과 일치하는 것을 고르십시오.',
    41: '들은 내용과 일치하는 것을 고르십시오.',
    42: '남자의 중심 생각으로 맞는 것을 고르십시오.',
    43: '비무장지대가 생태계를 회복할 수 있었던 이유로 맞는 것을 고르십시오.',
    44: '이 이야기의 중심 내용으로 맞는 것을 고르십시오.',
    45: '들은 내용과 일치하는 것을 고르십시오.',
    46: '남자의 태도로 가장 알맞은 것을 고르십시오.',
    47: '들은 내용과 일치하는 것을 고르십시오.',
    48: '여자의 태도로 가장 알맞은 것을 고르십시오.',
    49: '들은 내용과 일치하는 것을 고르십시오.',
    50: '남자의 태도로 가장 알맞은 것을 고르십시오.',
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
    42: TopikQuestionType.LISTENING_MAIN_IDEA,
    44: TopikQuestionType.LISTENING_MAIN_IDEA,
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
  const label = localized(
    '핵심 청취 단서',
    'Asosiy belgi',
    'Key clue',
    'Ключевая подсказка',
  );
  return {
    explanation,
    strategy,
    keyClues: [
      { key: 'clue-1', order: 1, label, explanation, targetSegmentKeys: [] },
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

// Sources: 제37회 TOPIK II B형 1교시 시험지 PDF pp. 3–15,
// 듣기 통합 대본 PDF pp. 1–26, 정답표 PDF p. 1.
const rawQuestions: QuestionInput[] = [
  [
    1,
    [
      '여자가 문 앞에서 기다리고, 남자가 문에 달린 비밀번호 잠금 장치를 누르고 있습니다.',
      '남자가 문 앞에 있고, 여자가 전화로 누군가에게 연락하고 있습니다.',
      '남자가 문을 열고 들어가며 여자와 이야기하고 있습니다.',
      '남녀가 문 옆에서 기다리는 동안 경비원이 다가오고 있습니다.',
    ],
  ],
  [
    2,
    [
      '남자가 선물 바구니를 든 채 여자와 미술 전시장에서 이야기하고 있습니다.',
      '남자가 신발 가게에서 여자에게 신발 상자를 건네고 있습니다.',
      '남녀가 카페에서 선물 상자를 주고받으며 이야기하고 있습니다.',
      '여자가 꽃다발을 들고 손님이 많은 새 가게에서 남자를 맞이하고 있습니다.',
    ],
  ],
  [
    3,
    [
      '대형 마트·백화점·화장품 전문 매장의 2013년과 2014년 이용객 수를 비교한 막대그래프: 2014년 백화점이 가장 많습니다.',
      '대형 마트·백화점·화장품 전문 매장의 2013년과 2014년 이용객 수를 비교한 막대그래프: 2013년 백화점이 가장 많습니다.',
      '화장품 구매 장소: 화장품 전문 매장 43%, 대형 마트 37%, 백화점 20%.',
      '화장품 구매 장소: 화장품 전문 매장 52%, 백화점 28%, 대형 마트 20%.',
    ],
  ],
  [
    4,
    [
      '제시간에 도착해서 다행이야.',
      '수업 끝나고 가도 늦지 않아.',
      '강연은 누구든지 들을 수 있어.',
      '시간이 얼마나 걸릴지 모르겠어.',
    ],
  ],
  [
    5,
    [
      '정말 좋은 기회니까 잘 쉬고 와요.',
      '그렇게 하고 싶어하는 줄 몰랐어요.',
      '특별히 휴가를 낼 만큼 바빴나 봐요.',
      '그래도 가기로 한 건데 잘 해 보세요.',
    ],
  ],
  [
    6,
    [
      '바꿔 주면 좋겠는데.',
      '물어볼 필요는 없겠지.',
      '날짜가 지났을지 몰라.',
      '빨리 입어 볼 걸 그랬어.',
    ],
  ],
  [
    7,
    [
      '저도 가게에 가서 사야겠어요.',
      '그 집 연락처 좀 알려 주세요.',
      '아침을 준비하려면 바쁘겠어요.',
      '일할 때 먹을 수 있어서 좋아요.',
    ],
  ],
  [
    8,
    [
      '며칠 더 걸릴 것 같습니다.',
      '이미 전시회를 시작했습니다.',
      '다음 달에 초대하려고 합니다.',
      '계획보다 늦게 올 것 같습니다.',
    ],
  ],
  [
    9,
    [
      '남자에게 번역한 과제를 받는다.',
      '남자에게 전화로 번역을 부탁한다.',
      '남자에게 이메일로 과제를 보낸다.',
      '남자에게 전화해서 제출 날짜를 묻는다.',
    ],
  ],
  [
    10,
    [
      '사무실에 전화해서 고지서를 받는다.',
      '고지서가 있는지 우편함을 확인한다.',
      '고지서를 받으러 관리사무소에 간다.',
      '우편함에 관리비 고지서를 넣어 둔다.',
    ],
  ],
  [
    11,
    [
      '차의 속도가 빠른지 확인한다.',
      '차에서 내려 바퀴 상태를 본다.',
      '카센터에 들러서 차를 점검한다.',
      '휴게소로 들어가서 차를 세운다.',
    ],
  ],
  [
    12,
    [
      '안내를 도와줄 학생을 알아본다.',
      '필요한 인원을 정확하게 조사한다.',
      '설명회 자료 제작 회사에 전화한다.',
      '직원을 만나러 설명회 장소에 간다.',
    ],
  ],
  [
    13,
    [
      '여자는 사진을 한 장 가지고 있다.',
      '남자는 여자에게 학생증을 빌려 줬다.',
      '도서관에 가면 학생증을 바로 만들어 준다.',
      '도서관 출입증을 만들려면 사진이 필요하다.',
    ],
  ],
  [
    14,
    [
      '점검을 할 때 비상벨이 울릴 수 있다.',
      '불편한 점은 총무과에 전화하면 된다.',
      '점검하는 동안 계단으로 가면 안 된다.',
      '소방 점검은 두 시간 동안 진행될 것이다.',
    ],
  ],
  [
    15,
    [
      '복사기 대여 기간은 최대 1년이다.',
      '복사기가 고장 나면 수리를 해 준다.',
      '복사기 대여는 편리하지만 비경제적이다.',
      '복사기를 빌리면 관리비는 본인 부담이다.',
    ],
  ],
  [
    16,
    [
      '이곳은 오래된 문화 공간이다.',
      '이곳은 시민들이 직접 사용하고 있다.',
      '이곳은 다음 달에 새로 문을 열 계획이다.',
      '이곳은 시장을 위한 공간으로 바뀔 것이다.',
    ],
  ],
  [
    17,
    [
      '회사 동호회 활동은 부담스럽다.',
      '회사에 동호회가 많았으면 좋겠다.',
      '회사 동호회 활동은 직장 생활에 도움이 된다.',
      '직장 생활과 동호회 활동은 따로 해야 한다.',
    ],
  ],
  [
    18,
    [
      '기념우표는 전시회에서 발행된다.',
      '기념우표는 역사적 의미를 담고 있다.',
      '기념우표를 전시하는 것은 역사적인 일이다.',
      '기념우표를 보여주는 것은 의미 있는 일이다.',
    ],
  ],
  [
    19,
    [
      '역사 드라마는 시청률에 의존한다.',
      '역사 드라마는 사실 전달이 중요하다.',
      '역사 드라마는 역사 공부 자료가 된다.',
      '역사 드라마는 작가의 의도대로 제작된다.',
    ],
  ],
  [
    20,
    [
      '청소년을 대상으로 국악 교육을 해야 한다.',
      '청소년을 위한 국악 공연이 많아져야 한다.',
      '청소년들에게 전통 악기를 연주할 기회를 주어야 한다.',
      '청소년들이 갖고 있는 국악에 대한 태도를 바꾸어야 한다.',
    ],
  ],
  [
    21,
    [
      '쇼핑몰은 개인 정보를 잘 관리해야 한다.',
      '쇼핑몰에 가입하면 쉽게 개인 정보가 유출된다.',
      '개인 정보 유출을 막으려면 본인이 신경 써야 한다.',
      '잘 이용하지 않는 쇼핑몰에는 가입하지 말아야 한다.',
    ],
  ],
  [
    22,
    [
      '여자는 쇼핑몰 가입을 후회하고 있다.',
      '여자는 쇼핑몰의 비밀번호를 자주 바꿨다.',
      '이 쇼핑몰은 개인 정보 유출 사실을 숨겼다.',
      '이 쇼핑몰은 개인 정보 없이 가입할 수 있다.',
    ],
  ],
  [
    23,
    [
      '야외무대 위치에 대해 알아보고 있다.',
      '야외무대 사용에 대해 문의하고 있다.',
      '야외무대에서 행사 진행을 도와주고 있다.',
      '야외무대에서 상품 홍보를 준비하고 있다.',
    ],
  ],
  [
    24,
    [
      '야외무대는 구청에서 관리한다.',
      '행사 신청서는 자선 단체에 제출한다.',
      '행사 후 주변 청소는 구청에서 해 준다.',
      '자선 단체가 물건을 파는 행사를 하려고 한다.',
    ],
  ],
  [
    25,
    [
      '자기 계발은 계획서 작성이 필요하다.',
      '진정한 자기 계발은 스스로 하는 것이다.',
      '자기 평가가 안 좋으면 다시 도전할 수 있다.',
      '자기 계발의 결과에 대한 만족도가 중요하다.',
    ],
  ],
  [
    26,
    [
      '학생들은 스스로 계획서를 작성한다.',
      '보고서를 쓰려면 전문가를 만나야 한다.',
      '학교가 학생들의 자기 계발 결과를 평가한다.',
      '학생들은 학기 말에 자기 계발 계획서를 낸다.',
    ],
  ],
  [
    27,
    [
      '후보자 지지를 부탁하기 위해',
      '선거 유세 방법을 비판하기 위해',
      '선거 유세 효과를 강조하기 위해',
      '다양한 홍보 방법을 확인하기 위해',
    ],
  ],
  [
    28,
    [
      '선거를 할 때 유세 방법을 살펴야 한다.',
      '큰 소리로 선거 운동하는 것은 효과가 좋다.',
      '사람들에게 악수를 건네는 선거 운동은 불쾌감을 준다.',
      '후보자는 자신이 원하는 선거 유세 방법을 선택한다.',
    ],
  ],
  [
    29,
    [
      '문화재를 복원하는 사람',
      '문화재를 관리하는 사람',
      '문화재를 해설하는 사람',
      '문화재를 발굴하는 사람',
    ],
  ],
  [
    30,
    [
      '문화재 수리는 작가에게 책임이 있다.',
      '문화재 수리는 반복되는 교체 작업이다.',
      '문화재 수리는 원형을 훼손하지 않아야 한다.',
      '문화재 수리는 손상되지 않게 관리하는 것이다.',
    ],
  ],
  [
    31,
    [
      '정규직을 늘리면 실업 문제를 해결하기 어렵다.',
      '신규 채용의 폭을 줄여 실업 문제를 해결 할 수 있다.',
      '시간제 일자리는 실업 문제를 해결하는 최선의 방안이다.',
      '시간제 일자리의 확대는 정규직 취업 기회를 감소시킬 수 있다.',
    ],
  ],
  [
    32,
    [
      '구체적인 사례를 들어 주제를 설명하고 있다.',
      '객관적인 자료를 통해 자신의 의견을 주장하고 있다.',
      '근거를 들어 상대방의 주장을 부드럽게 반박하고 있다.',
      '상황을 객관적으로 분석하며 상대방 의견을 지지하고 있다.',
    ],
  ],
  [
    33,
    [
      '성공과 실패가 결정되는 시기',
      '인생을 배우며 성장하는 과정',
      '결과보다 과정이 중요한 이유',
      '실패가 가져오는 긍정적 변화',
    ],
  ],
  [
    34,
    [
      '물은 끓는 순간에도 에너지를 품고 있다.',
      '성공과 실패는 변화의 정도에 달려 있다.',
      '시작 단계에서부터 성공을 준비해야 한다.',
      '결정적인 순간에 힘을 발휘하면 성공한다.',
    ],
  ],
  [
    35,
    [
      '방송 후원에 담긴 신념을 설명하고 있다.',
      '방송 후원에 대한 의견을 조사하고 있다.',
      '방송 후원에 관련된 자료를 분석하고 있다.',
      '방송 후원에 필요한 비용을 파악하고 있다.',
    ],
  ],
  [
    36,
    [
      '이 기업은 방송을 통한 홍보를 중시한다.',
      '이 방송은 사회 공헌에 관한 내용을 다룬다.',
      '이 기업은 프로그램 제작 비용을 부담한다.',
      '이 방송은 후원 기업을 위한 광고를 만들었다.',
    ],
  ],
  [
    37,
    [
      '‘빗물연구소’는 빗물을 가치 있게 만든다.',
      '‘빗물연구소’에 대해 모르는 사람들이 많다.',
      '빗물을 자원으로 만드는 과정은 간단하다.',
      '빗물을 자원으로 만들려면 시설이 필요하다.',
    ],
  ],
  [
    38,
    [
      '빗물이 깨끗하다면 정화 과정을 생략해도 된다.',
      '‘빗물연구소’의 활동은 환경 보전과도 관련이 있다.',
      '빗물은 정화 과정을 거쳐도 식수로 사용할 수 없다.',
      '아직 정화된 빗물의 사용은 다양하지 않은 수준이다.',
    ],
  ],
  [
    39,
    [
      '예술 감독에 도전했으나 매번 떨어졌다.',
      '예술 감독을 꿈꾸며 무대 연출을 전공했다.',
      '다른 곳에서 예술 감독을 하다가 포기했다.',
      '개인적인 활동 때문에 예술 감독직을 거절했다.',
    ],
  ],
  [
    40,
    [
      '여자는 예술가 활동을 그만둔 상태이다.',
      '여자는 행정적 경험을 살려 일을 하고 있다.',
      '여자는 자신이 처음으로 맡은 업무를 끝냈다.',
      '여자는 전용 극장 설립이 불가능하다고 생각한다.',
    ],
  ],
  [
    41,
    [
      '경제 정책 방향은 문화 가치에 영향을 미친다.',
      '기업의 운영 방향은 1인당 국민 소득과 관계가 있다.',
      '경제가 발전하기 위해서는 경제 구조가 큰 도움이 된다.',
      '근면과 교육은 경제가 발전하는 데에 유리하게 작용한다.',
    ],
  ],
  [
    42,
    [
      '경제 발전에는 자본 축적이 전제되어야 한다.',
      '경제 정책은 경제 발전과 밀접한 관계가 있다.',
      '경제 발전에는 문화 가치가 중요한 역할을 한다.',
      '유사한 정책 방향에도 다른 결과가 나올 수 있다.',
    ],
  ],
  [
    43,
    [
      '장기간 사람들의 발길이 닿지 않았기 때문에',
      '동식물의 복원을 위한 환경부의 노력 때문에',
      '전 세계인들의 관심의 대상이 되었기 때문에',
      '평화를 원하는 사람들이 공원을 만들기 때문에',
    ],
  ],
  [
    44,
    [
      '비무장지대를 통해 전쟁의 위험이 억제될 것이다.',
      '비무장지대는 전쟁으로 인해 모든 것이 파괴되었다.',
      '비무장지대는 남한과 북한이 마주보고 있는 지역이다.',
      '비무장지대가 평화를 상징하는 곳으로 주목 받고 있다.',
    ],
  ],
  [
    45,
    [
      '국민들은 복지를 위한 세금의 인상을 원한다.',
      '복지 제도를 위해 국민이 비용을 부담해야 한다.',
      '복지보다는 경제 성장을 원하는 국민이 더 많다.',
      '국민들은 경제 성장을 위해 세금을 내고자 한다.',
    ],
  ],
  [
    46,
    [
      '복지 정책의 변화가 필요함을 주장하고 있다.',
      '정책 시행을 위한 국민의 협조를 요청하고 있다.',
      '경제 성장과 복지의 상관관계를 설명하고 있다.',
      '복지가 정책에서 우선되어야 함을 주장하고 있다.',
    ],
  ],
  [
    47,
    [
      '황연대 상은 운동 실력이 가장 뛰어난 선수에게 준다.',
      '황연대 상은 이번 장애인 올림픽에서 처음 시상되었다.',
      '여자는 장애를 극복하고 다른 사람을 위한 삶을 살았다.',
      '여자는 직업을 통해 사회에서 당당히 자리 잡게 되었다.',
    ],
  ],
  [
    48,
    [
      '장애를 극복한 선수들과의 관계를 중요시한다.',
      '장애인을 위해 자신이 한 일을 자랑스러워하고 있다.',
      '올림픽을 통해 장애인의 권익이 보호되기를 기대하고 있다.',
      '장애인들이 사회인으로 자신 있게 자리 잡기를 염원하고 있다.',
    ],
  ],
  [
    49,
    [
      '불국사의 석축은 자연석을 다듬어서 만들었다.',
      '남자가 생각하는 한국 건축의 백미는 불국사다.',
      '석축이 특별한 이유는 자연과 동화됐기 때문이다.',
      '불국사의 석탑과 같은 기법은 외국에서도 찾을 수 있다.',
    ],
  ],
  [
    50,
    [
      '전통 건축물 보존의 중요성을 강조하고 있다.',
      '자연친화적인 건축미를 예를 통해 설명하고 있다.',
      '불국사의 건축 공법을 재현을 통해 분석하고 있다.',
      '전통 건축 방식이 현대에 계승되기를 희망하고 있다.',
    ],
  ],
];

// Official answer key: 제37회 TOPIK II 듣기 정답표 PDF p. 1 (all 2 points).
const answerKeys: AnswerKey[] = [
  '1',
  '4',
  '4',
  '2',
  '2',
  '1',
  '2',
  '1',
  '3',
  '3',
  '4',
  '3',
  '4',
  '1',
  '2',
  '3',
  '3',
  '2',
  '2',
  '4',
  '3',
  '1',
  '2',
  '1',
  '2',
  '1',
  '2',
  '4',
  '1',
  '3',
  '4',
  '3',
  '1',
  '4',
  '1',
  '3',
  '1',
  '2',
  '4',
  '1',
  '4',
  '3',
  '1',
  '4',
  '2',
  '2',
  '3',
  '4',
  '3',
  '2',
];

export const TOPIK_II_37_LISTENING_EXAM: TopikSeedExam = {
  code: 'topik-ii-listening-37-2014',
  title: localized(
    '제37회 TOPIK II 듣기',
    '37-TOPIK II tinglash',
    '37th TOPIK II Listening',
    '37-й TOPIK II: аудирование',
  ),
  description: localized(
    '제37회 한국어능력시험 TOPIK II 듣기 1번부터 50번까지를 원문 구조대로 구성했습니다.',
    '37-TOPIK II tinglash bo‘limining 1–50-savollari asl imtihon tuzilishida.',
    'Questions 1–50 of the 37th TOPIK II Listening test in the original exam structure.',
    'Задания 1–50 аудирования 37-го TOPIK II в структуре оригинального экзамена.',
  ),
  examType: TopikExamType.TOPIK_II,
  section: TopikSection.LISTENING,
  year: 2014,
  round: 37,
  durationMinutes: 60,
  totalQuestions: 50,
  totalPoints: 100,
  listeningAudioUrl: '',
  version: 1,
  status: TopikPublishStatus.PUBLISHED,
  source: {
    title: '제37회 한국어능력시험 II B형 듣기',
    edition: '제37회',
    publisher: '국립국제교육원',
    reference:
      '사용자 제공 test-paper-paper.pdf, listening-transcript-transcript.pdf, answer-keys-answers.pdf',
  },
  publishedAt: new Date('2014-11-23T00:00:00+09:00'),
  isActive: true,
};

const groupRanges = [
  ...Array.from({ length: 20 }, (_, index) => [index + 1, index + 1] as const),
  ...Array.from(
    { length: 15 },
    (_, index) => [21 + index * 2, 22 + index * 2] as const,
  ),
];

export const TOPIK_II_37_LISTENING_GROUPS: TopikSeedGroup[] = groupRanges.map(
  ([startNumber, endNumber], index) => {
    const code = groupCodeFor(startNumber);
    const visual = startNumber <= 3;
    return {
      code,
      order: index + 1,
      startNumber,
      endNumber,
      instruction: textBlocks(instructionFor(startNumber)),
      sharedAudio: TOPIK_II_37_LISTENING_AUDIO[code],
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

export const TOPIK_II_37_LISTENING_QUESTIONS: TopikSeedQuestion[] =
  rawQuestions.map(([number, choiceTexts]) => {
    const answer = answerKeys[number - 1];
    const visual = number <= 3;
    const choices = choiceTexts.map((text, index) => ({
      key: String(index + 1),
      text,
      order: index + 1,
      imageAssetKey: visual
        ? `topik-ii-37-q${String(number).padStart(2, '0')}-c${index + 1}`
        : '',
      imageAlt: visual ? text : '',
    }));
    const pdfPage = sourcePageFor(number);
    const prompt = promptFor(number);
    return {
      code: `topik-ii-listening-37-q${String(number).padStart(2, '0')}`,
      groupCode: groupCodeFor(number),
      number,
      order: number,
      type: typeFor(number),
      points: 2,
      prompt: prompt ? textBlocks(prompt) : [],
      audio: TOPIK_II_37_LISTENING_AUDIO[groupCodeFor(number)],
      choices,
      correctChoiceKey: answer,
      solution: createSolution(answer, choices[Number(answer) - 1].text),
      presentation: presentation(
        visual
          ? TopikVisualTemplate.EXAM_VISUAL_CHOICES
          : TopikVisualTemplate.EXAM_LISTENING,
        visual ? TopikChoiceLayout.TWO_COLUMNS : TopikChoiceLayout.ONE_COLUMN,
      ),
      tags: ['topik-ii', 'round-37', 'listening', `question-${number}`],
      difficulty: number <= 12 ? 2 : number <= 32 ? 3 : 4,
      source: {
        pdfPage,
        bookPage: pdfPage - 2,
        reference: '제37회 한국어능력시험 II B형 1교시 (듣기, 쓰기)',
      },
      version: 1,
      isActive: true,
    };
  });

export const TOPIK_II_37_LISTENING_SEED: TopikExamSeed = {
  exam: TOPIK_II_37_LISTENING_EXAM,
  groups: TOPIK_II_37_LISTENING_GROUPS,
  questions: TOPIK_II_37_LISTENING_QUESTIONS,
};
