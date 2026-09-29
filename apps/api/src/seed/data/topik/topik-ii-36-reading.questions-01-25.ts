import {
  TopikChoiceLayout,
  TopikQuestionType,
  TopikStimulusKind,
  TopikVisualTemplate,
} from '../../../topik/schemas/topik-content.schema';
import {
  advertisement,
  headline,
  notice,
  passage,
  sentenceSet,
  textBlocks,
} from './topik-seed.helpers';
import { TopikSeedQuestion } from './topik-seed.types';
import { topikII36ReadingQuestion as question } from './topik-ii-36-reading.question';

const autumnPhotoExhibition = {
  ...notice(),
  kind: TopikStimulusKind.INFO_CARD,
  title: '제10회 가을 사진전',
  subtitle: '서울전시관',
  blocks: textBlocks(
    '국내 유명 작가 9인의 사진 전시회가 열립니다. 가족을 주제로 한 개성 있는 작품을 만나 볼 수 있습니다.',
  ),
  infoItems: [
    { label: '전시 기간', value: '2014년 11월 3일(월)~11월 12일(수)' },
    { label: '관람 시간', value: '10:00~18:00 (주말 오후 4시 작가와의 대화)' },
    { label: '관람료', value: '5,000원' },
  ],
  bulletItems: ['가족 사진을 가지고 오시면 무료로 입장할 수 있습니다.'],
  visualVariant: 'official-autumn-photo-exhibition',
};

const teenCounselingChart = {
  ...passage(),
  kind: TopikStimulusKind.CHART,
  chart: {
    title: '청소년 고민 상담 대상',
    subtitle: '',
    headers: ['남자', '여자'],
    rows: [
      {
        label: '부모님',
        values: ['22.7%', '25.3%'],
        numericValues: [22.7, 25.3],
      },
      { label: '형제·자매', values: ['9.2%', '10%'], numericValues: [9.2, 10] },
      { label: '친구', values: ['43%', '46%'], numericValues: [43, 46] },
      {
        label: '자기 자신',
        values: ['25.1%', '18.7%'],
        numericValues: [25.1, 18.7],
      },
    ],
    unit: '%',
    sourceNote: '',
    variant: 'grouped-bar-data-table',
  },
  visualVariant: 'official-gender-counseling-chart-data',
};

export const TOPIK_II_36_READING_QUESTIONS_01_25: TopikSeedQuestion[] = [
  question({
    number: 1,
    groupCode: 'reading-01-02',
    type: TopikQuestionType.GRAMMAR_FILL_BLANK,
    prompt:
      '친구와 내가 운동장에서 축구를 [[blank:q01]] 선생님이 나를 부르셨다.',
    choices: ['하거나', '하는데', '하면서', '하든지'],
    answer: '2',
    explanation:
      '축구를 하고 있던 상황에서 선생님이 부르셨으므로 배경을 나타내는 ‘하는데’가 알맞습니다.',
    clue: '축구를 하던 중 선생님이 나를 부르셨습니다.',
    template: TopikVisualTemplate.EXAM_SENTENCE,
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 2,
    groupCode: 'reading-01-02',
    type: TopikQuestionType.GRAMMAR_FILL_BLANK,
    prompt: '민수 씨는 대학교를 [[blank:q02]] 회사에 취직했다.',
    choices: ['졸업해도', '졸업한다면', '졸업하더라도', '졸업하자마자'],
    answer: '4',
    explanation:
      '대학교를 졸업한 직후 회사에 취직했으므로 ‘졸업하자마자’가 알맞습니다.',
    clue: '졸업과 취직이 바로 이어집니다.',
    template: TopikVisualTemplate.EXAM_SENTENCE,
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 3,
    groupCode: 'reading-03-04',
    type: TopikQuestionType.UNDERLINED_MEANING,
    prompt: '먹구름이 몰려오는 걸 보니 비가 [[underline:clue-1|올 모양이다]].',
    choices: ['오기도 한다', '올 것만 같다', '올 리가 없다', '온 적이 없다'],
    answer: '2',
    explanation:
      '‘올 모양이다’는 먹구름을 보고 비가 올 것 같다고 추측하는 표현입니다.',
    clue: '‘-을 모양이다’는 상황을 보고 추측함을 나타냅니다.',
    clueTargetKeys: ['clue-1'],
    template: TopikVisualTemplate.EXAM_SENTENCE,
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 4,
    groupCode: 'reading-03-04',
    type: TopikQuestionType.UNDERLINED_MEANING,
    prompt:
      '다른 옷가게에 [[underline:clue-1|가 봐야]] 값은 여기와 비슷할 것이다.',
    choices: ['간다고 해도', '간다고 치고', '갈지도 몰라서', '가기는 하지만'],
    answer: '1',
    explanation:
      '다른 가게에 가 보더라도 값은 비슷할 것이라는 뜻이므로 ‘간다고 해도’와 같습니다.',
    clue: '다른 가게로 가는 경우를 가정해도 결과는 같다고 합니다.',
    clueTargetKeys: ['clue-1'],
    template: TopikVisualTemplate.EXAM_SENTENCE,
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 5,
    groupCode: 'reading-05-08',
    type: TopikQuestionType.PRACTICAL_TEXT_TOPIC,
    prompt: '다음은 무엇에 대한 글입니까?',
    stimulus: advertisement('문제는 신선도!', '알아서 온도를 조절한다.'),
    choices: ['컴퓨터', '냉장고', '선풍기', '세탁기'],
    answer: '2',
    explanation:
      '신선도를 지키기 위해 온도를 자동 조절하는 제품이므로 냉장고 광고입니다.',
    clue: '‘신선도’와 ‘온도를 조절한다’는 냉장고의 기능입니다.',
    template: TopikVisualTemplate.EXAM_ADVERTISEMENT,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 6,
    groupCode: 'reading-05-08',
    type: TopikQuestionType.PRACTICAL_TEXT_TOPIC,
    prompt: '다음은 무엇에 대한 글입니까?',
    stimulus: advertisement(
      '지금 이 글씨가 흐리게 보이면 안으로 들어오세요.',
      '학생 10%↓',
    ),
    choices: ['치과', '서점', '미술관', '안경점'],
    answer: '4',
    explanation:
      '글씨가 흐리게 보이는 사람을 대상으로 하며 학생 할인까지 안내하므로 안경점 광고입니다.',
    clue: '글씨가 흐리게 보인다는 것은 시력과 안경에 관한 단서입니다.',
    template: TopikVisualTemplate.EXAM_ADVERTISEMENT,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 7,
    groupCode: 'reading-05-08',
    type: TopikQuestionType.PRACTICAL_TEXT_TOPIC,
    prompt: '다음은 무엇에 대한 글입니까?',
    stimulus: {
      ...advertisement('쉿!', '상대방 목소리까지 들립니다.'),
      blocks: textBlocks('공공장소에서는 작은 소리도 소음일 수 있습니다.'),
      visualVariant: 'official-quiet-phone-etiquette',
    },
    choices: ['전화 예절', '식사 예절', '건강 관리', '안전 관리'],
    answer: '1',
    explanation:
      '공공장소에서 통화할 때 상대방 목소리까지 들릴 수 있으므로 전화 예절을 안내합니다.',
    clue: '‘상대방 목소리’와 ‘공공장소에서는 작은 소리도 소음’이 핵심입니다.',
    template: TopikVisualTemplate.EXAM_ADVERTISEMENT,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 8,
    groupCode: 'reading-05-08',
    type: TopikQuestionType.PRACTICAL_TEXT_TOPIC,
    prompt: '다음은 무엇에 대한 글입니까?',
    stimulus: {
      ...notice(
        '1인 1매만 사용 가능합니다.',
        '이 할인권은 환불되지 않습니다.',
        '다른 쿠폰과 함께 사용할 수 없습니다.',
      ),
      title: '할인권 10,000원',
      visualVariant: 'official-discount-coupon',
    },
    choices: ['교환 안내', '이용 방법', '판매 장소', '제품 설명'],
    answer: '2',
    explanation:
      '할인권을 몇 장 쓸 수 있는지와 환불·중복 사용 가능 여부를 안내하므로 이용 방법입니다.',
    clue: '‘1인 1매’, ‘환불되지 않습니다’, ‘함께 사용할 수 없습니다’가 사용 조건입니다.',
    template: TopikVisualTemplate.EXAM_NOTICE,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 9,
    groupCode: 'reading-09-12',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음 글의 내용과 같은 것을 고르십시오.',
    stimulus: autumnPhotoExhibition,
    choices: [
      '여러 나라 작가가 이번 전시회에 참여한다.',
      '이 전시회에 가면 가을에 대한 사진을 볼 수 있다.',
      '가족 사진을 들고 가면 관람료를 내지 않아도 된다.',
      '작가와의 대화는 전시회 기간 동안 날마다 진행된다.',
    ],
    answer: '3',
    explanation: '가족 사진을 가지고 오면 무료 입장할 수 있다고 안내합니다.',
    clue: '안내문의 마지막 문장에 ‘가족 사진’과 ‘무료로 입장’이 나옵니다.',
    template: TopikVisualTemplate.EXAM_INFO_CARD,
  }),
  question({
    number: 10,
    groupCode: 'reading-09-12',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음 도표의 내용과 같은 것을 고르십시오.',
    stimulus: teenCounselingChart,
    choices: [
      '남녀 모두 부모님보다 친구에게 고민 상담을 많이 한다.',
      '남녀 모두 형제와 자매에게 고민 상담을 가장 많이 한다.',
      '혼자서 고민을 해결하는 청소년은 여자보다 남자가 더 적다.',
      '부모님에게 고민을 말하는 청소년은 남자보다 여자가 더 적다.',
    ],
    answer: '1',
    explanation:
      '친구에게 상담하는 남녀의 비율(43%, 46%)은 부모님에게 상담하는 비율(22.7%, 25.3%)보다 높습니다.',
    clue: '남녀 모두 친구 비율이 부모님 비율보다 높습니다.',
    template: TopikVisualTemplate.EXAM_CHART,
  }),
  question({
    number: 11,
    groupCode: 'reading-09-12',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음 글의 내용과 같은 것을 고르십시오.',
    stimulus: passage(
      '주말마다 서울 광화문 주변이 콘서트장으로 바뀐다. 바로 ‘광화문 콘서트’라는 프로그램 때문이다. 이 프로그램은 매회 가수 한 명이 출연해 10여 곡의 노래를 부르는 음악 프로그램으로 다음 주 첫 방송을 앞두고 있다. 녹화는 광화문 앞 무대에서 일요일 오후 7시부터 시작되며 방청 신청은 프로그램 홈페이지를 통해 300명까지 선착순으로 받는다.',
    ),
    choices: [
      '이 프로그램은 평일에 녹화를 진행한다.',
      '광화문 콘서트는 오래된 음악 프로그램이다.',
      '직접 가서 보려면 인터넷으로 신청해야 한다.',
      '이 프로그램에는 여러 명의 가수가 출연한다.',
    ],
    answer: '3',
    explanation:
      '방청 신청은 프로그램 홈페이지를 통해 선착순으로 받는다고 했습니다.',
    clue: '‘방청 신청은 프로그램 홈페이지를 통해’라는 문장입니다.',
  }),
  question({
    number: 12,
    groupCode: 'reading-09-12',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음 글의 내용과 같은 것을 고르십시오.',
    stimulus: passage(
      '종이 신문을 읽는 가구가 계속 감소하고 있는 것으로 나타났다. 종이 신문을 읽는 집은 지난해보다 5% 정도 감소해서 다섯 집 중 한 집만이 배달해서 읽고 있었다. 인터넷으로 언제든지 뉴스를 볼 수 있게 되면서 종이 신문을 보는 사람이 감소하고 있는 것이다. 한편 이번 조사는 지난해에 조사에 참여한 집으로 전화를 거는 방식으로 진행되었다.',
    ),
    choices: [
      '이번 조사는 직접 방문해서 조사하는 방식을 사용했다.',
      '종이 신문을 읽는 사람이 줄면서 인터넷의 사용도 줄었다.',
      '조사된 가구 중에서 절반은 집으로 배달되는 신문을 읽는다.',
      '이번 조사와 지난해 조사는 서로 같은 가구를 대상으로 했다.',
    ],
    answer: '4',
    explanation:
      '이번 조사는 지난해 조사에 참여한 집을 다시 대상으로 했습니다.',
    clue: '‘지난해에 조사에 참여한 집으로 전화를 거는 방식’이라는 문장입니다.',
  }),
  question({
    number: 13,
    groupCode: 'reading-13-15',
    type: TopikQuestionType.SENTENCE_ORDERING,
    prompt: '다음을 순서대로 맞게 배열한 것을 고르십시오.',
    stimulus: sentenceSet([
      ['가', '그 때문에 어머니는 지금도 미역국을 별로 좋아하지 않으신다.'],
      ['나', '생일날 미역국을 먹을 때면 어머니 생각이 난다.'],
      ['다', '한국에서는 생일날뿐 아니라 아이를 낳은 후에도 미역국을 먹는다.'],
      [
        '라',
        '그래서 어머니는 우리 형제 다섯을 낳을 때마다 미역국을 드셔야 했다.',
      ],
    ]),
    choices: [
      '(나)－(다)－(라)－(가)',
      '(나)－(가)－(라)－(다)',
      '(다)－(가)－(라)－(나)',
      '(다)－(라)－(나)－(가)',
    ],
    answer: '1',
    explanation:
      '생일날 어머니가 생각나는 이야기에서 출산 후 미역국을 먹는 풍습, 다섯 번 먹은 이유, 지금 싫어하는 결과로 이어집니다.',
    clue: '‘그래서’가 있는 (라)는 출산 후 먹는다는 (다)를 받고, ‘그 때문에’인 (가)가 뒤따릅니다.',
    template: TopikVisualTemplate.EXAM_SENTENCE_SET,
  }),
  question({
    number: 14,
    groupCode: 'reading-13-15',
    type: TopikQuestionType.SENTENCE_ORDERING,
    prompt: '다음을 순서대로 맞게 배열한 것을 고르십시오.',
    stimulus: sentenceSet([
      [
        '가',
        '정부는 이러한 규칙 위반을 줄이기 위해 ‘착한 운전 마일리지 제도’를 실시할 예정이다.',
      ],
      [
        '나',
        '이는 교통 규칙을 잘 지키는 운전자에게 벌점이 아니라 상점을 주는 방식이다.',
      ],
      ['다', '하지만 벌점 제도가 있어도 규칙 위반은 크게 줄어들지 않고 있다.'],
      ['라', '보통 운전자들이 교통 규칙을 위반하면 벌점을 받게 된다.'],
    ]),
    choices: [
      '(가)－(다)－(라)－(나)',
      '(가)－(나)－(다)－(라)',
      '(라)－(가)－(다)－(나)',
      '(라)－(다)－(가)－(나)',
    ],
    answer: '4',
    explanation:
      '기존 벌점 제도를 설명하고 그 한계를 제시한 뒤 새 마일리지 제도와 운영 방식을 소개합니다.',
    clue: '(다)의 ‘하지만 벌점 제도가 있어도’는 (라)의 벌점 설명을 받습니다.',
    template: TopikVisualTemplate.EXAM_SENTENCE_SET,
  }),
  question({
    number: 15,
    groupCode: 'reading-13-15',
    type: TopikQuestionType.SENTENCE_ORDERING,
    prompt: '다음을 순서대로 맞게 배열한 것을 고르십시오.',
    stimulus: sentenceSet([
      [
        '가',
        '네온사인, 상가의 불빛 등으로 길거리가 밝기 때문에 불필요하다는 것이다.',
      ],
      [
        '나',
        '그런 일에 비용을 들이기보다 다른 대안은 없는지 모색해 보는 것이 더 낫다.',
      ],
      ['다', '가로등이 제 역할을 못하고 있으니 없애자는 의견이 나오고 있다.'],
      [
        '라',
        '하지만 이미 설치해 놓은 공공 시설물을 없애는 것만이 최선은 아닐 것이다.',
      ],
    ]),
    choices: [
      '(가)－(라)－(다)－(나)',
      '(가)－(다)－(라)－(나)',
      '(다)－(가)－(라)－(나)',
      '(다)－(나)－(라)－(가)',
    ],
    answer: '3',
    explanation:
      '가로등 철거 주장, 그 이유, 철거에 대한 반론, 다른 대안 제시의 순서입니다.',
    clue: '(가)의 ‘불필요하다는 것이다’는 (다)의 가로등을 없애자는 의견을 설명합니다.',
    template: TopikVisualTemplate.EXAM_SENTENCE_SET,
  }),
  question({
    number: 16,
    groupCode: 'reading-16-18',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '땀은 체온을 조절하는 역할을 한다. 신체의 온도가 올라가면 몸에 남아도는 열기를 피부 밖으로 내보내기 위해 땀이 나는 것이다. 이때 피부 바로 아래에 퍼져 있는 핏줄들도 열을 식힐 수 있도록 더 많은 피를 흘려 보내게 된다. 그렇기 때문에 땀이 나면 [[blank:q16]] 것이다.',
    ),
    choices: [
      '피부가 빨갛게 보이는',
      '피부를 통해 밖으로 나가는',
      '몸에 기운이 없어지는',
      '몸이 가벼워지는 느낌이 드는',
    ],
    answer: '1',
    explanation:
      '피부 아래 핏줄에 더 많은 피가 흐르므로 피부가 빨갛게 보이는 것입니다.',
    clue: '피부 아래의 핏줄들이 더 많은 피를 흘려 보낸다고 설명합니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 17,
    groupCode: 'reading-16-18',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '언어를 사용하는 능력은 손가락과 밀접한 관련성이 있다. 손가락을 움직이는 동작은 단순한 행동에 불과한 것이 아니라 어휘 기억 장치의 문을 여는 열쇠와 같은 역할을 한다. 그러므로 손가락이 불편한 사람들은 평소보다 필요한 단어를 떠올리는 시간이 길어진다. 말을 잘하기 위해서 [[blank:q17]] 조언하는 것도 이런 이유 때문이다.',
    ),
    choices: [
      '손동작을 많이 사용하라고',
      '손가락을 먼저 생각하라고',
      '필요한 단어를 잘 선택하라고',
      '어휘의 의미를 잘 기억하라고',
    ],
    answer: '1',
    explanation:
      '손가락 움직임이 어휘 기억을 돕는다고 했으므로 말할 때 손동작을 많이 쓰라는 조언입니다.',
    clue: '손가락을 움직이는 동작이 어휘 기억 장치를 여는 열쇠와 같다고 합니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 18,
    groupCode: 'reading-16-18',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '최근 청년층을 중심으로 직업에 대한 가치관이 변하고 있다. 평생 한 직장에 다녀야 한다든지 개인 생활보다 직장 생활에 더 비중을 둔다든지 하는 전통적 의식이 약화되고 있다. 직업 선택의 기준도 그 직업에 대한 사회적 평가보다는 [[blank:q18]] 우선순위에 두는 경우가 많다. 직장 생활이나 직업 선택에서 무엇보다도 개인의 만족도를 중시하고 있는 것이다.',
    ),
    choices: [
      '평생 근무할 직장인지를',
      '자신의 적성에 맞는지를',
      '사회적 위치가 어떤지를',
      '타인의 평가가 어떤지를',
    ],
    answer: '2',
    explanation:
      '사회적 평가보다 개인의 만족도를 중시하므로 자신의 적성에 맞는지가 우선입니다.',
    clue: '마지막 문장에 ‘개인의 만족도’를 중시한다고 합니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 19,
    groupCode: 'reading-19-20',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 알맞은 것을 고르십시오.',
    choices: ['드디어', '오히려', '어쩌면', '반드시'],
    answer: '2',
    explanation:
      '구성원이 많을수록 기여가 클 것이라는 예상과 반대로 두 명 그룹이 기대치를 가장 많이 사용했습니다.',
    clue: '‘하지만 연구 결과는 예상과 달랐다’는 앞뒤의 반대 관계를 알립니다.',
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 20,
    groupCode: 'reading-19-20',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '이 글의 내용과 같은 것을 고르십시오.',
    choices: [
      '구성원의 수가 많을수록 개인의 공헌도는 낮아졌다.',
      '연구 결과는 처음에 예상했던 것과 유사하게 나타났다.',
      '이 연구는 사회가 개인에게 미치는 영향에 대한 것이다.',
      '2명으로 이루어진 그룹은 개인적인 노력을 하지 않았다.',
    ],
    answer: '1',
    explanation:
      '그룹의 구성원 수와 각자가 쏟은 힘의 크기가 반비례했다고 했습니다.',
    clue: '‘구성원 수와 그들이 쏟아 부은 힘의 크기는 반비례했다’는 문장입니다.',
  }),
  question({
    number: 21,
    groupCode: 'reading-21-22',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 알맞은 것을 고르십시오.',
    choices: [
      '하나를 보면 열을 안다',
      '천 리 길도 한 걸음부터',
      '소 잃고 외양간 고친다',
      '윗물이 맑아야 아랫물이 맑다',
    ],
    answer: '2',
    explanation:
      '수질 오염 방지를 위해 생활 속 작은 노력부터 시작하자는 내용이므로 ‘천 리 길도 한 걸음부터’가 맞습니다.',
    clue: '빈칸 뒤의 ‘생활 속에서 할 수 있는 작은 노력부터 시작’이 속담과 연결됩니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 22,
    groupCode: 'reading-21-22',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '이 글의 중심 생각을 고르십시오.',
    choices: [
      '수질 오염이 심각한 상황에 이르렀다.',
      '수질 오염에 대해 걱정하는 사람들이 많다.',
      '수질 오염으로 물을 안심하고 먹기가 어렵다.',
      '수질 오염을 막기 위한 노력을 빨리 해야 한다.',
    ],
    answer: '4',
    explanation:
      '수질 오염을 걱정만 하기보다 생활 속 작은 실천부터 시작해야 한다는 주장입니다.',
    clue: '‘생활 속에서 할 수 있는 작은 노력부터 시작하는 것이 중요하다’는 문장이 핵심입니다.',
  }),
  question({
    number: 23,
    groupCode: 'reading-23-24',
    type: TopikQuestionType.AUTHOR_EMOTION,
    prompt: '밑줄 친 부분에 나타난 나의 심정으로 알맞은 것을 고르십시오.',
    choices: ['곤란하다', '속상하다', '답답하다', '억울하다'],
    answer: '2',
    explanation:
      '돈 이야기를 하며 형편이 어려운 부모님에게 부담을 드린 것 같아 마음이 속상합니다.',
    clue: '가뜩이나 어려운 부모님에게 마음의 부담을 더한 꼴이 된 것 같다고 했습니다.',
    clueTargetKeys: ['emotion'],
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 24,
    groupCode: 'reading-23-24',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '이 글의 내용과 같은 것을 고르십시오.',
    choices: [
      '나는 아르바이트를 해서 생활비가 넉넉했다.',
      '나는 대학에 합격하기 전부터 서울에 살고 있었다.',
      '부모님은 형편이 어려운데도 많은 돈을 보내 주셨다.',
      '나는 서울 생활의 꿈을 이루기 위해 장학금을 포기했다.',
    ],
    answer: '4',
    explanation:
      '전액 장학금을 주겠다는 지방 대학을 포기하고 서울 대학을 택했습니다.',
    clue: '‘전액 장학금을 주겠다는 지방 대학을 포기하고 택한 서울행’이라는 문장입니다.',
  }),
  question({
    number: 25,
    groupCode: 'reading-25-27',
    type: TopikQuestionType.HEADLINE_INTERPRETATION,
    prompt: '다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.',
    stimulus: headline('뮤지컬로 만나는 드라마, 볼거리 많아져'),
    choices: [
      '뮤지컬과 드라마를 함께 보면서 즐길 수 있게 되었다.',
      '뮤지컬이 드라마로 만들어져서 구경할 수 있게 되었다.',
      '드라마가 뮤지컬로 만들어져 즐길 수 있는 것이 많아졌다.',
      '드라마와 뮤지컬이 함께 만들어져서 구경할 거리가 많아졌다.',
    ],
    answer: '3',
    explanation: '드라마를 뮤지컬로 제작해 볼거리가 더 많아졌다는 뜻입니다.',
    clue: '‘뮤지컬로 만나는 드라마’는 드라마가 뮤지컬로 만들어졌음을 뜻합니다.',
    template: TopikVisualTemplate.EXAM_HEADLINE,
  }),
];
