import {
  TopikChoiceLayout,
  TopikQuestionType,
  TopikVisualTemplate,
} from '../../../topik/schemas/topik-content.schema';
import { headline, insertionPassage, passage } from './topik-seed.helpers';
import { TopikSeedQuestion } from './topik-seed.types';
import { topikII37ReadingQuestion as question } from './topik-ii-37-reading.question';

export const TOPIK_II_37_READING_QUESTIONS_26_50: TopikSeedQuestion[] = [
  question({
    number: 26,
    groupCode: 'reading-25-27',
    type: TopikQuestionType.HEADLINE_INTERPRETATION,
    prompt: '다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.',
    stimulus: headline('영화 ‘사랑’, 기대감 속에 개봉 첫날 관객 수 오만 넘어'),
    choices: [
      '영화 ‘사랑’에 대한 평가가 예상과 달리 좋지 않다.',
      '영화 ‘사랑’의 개봉을 기대하고 있는 사람들이 많다.',
      '영화 ‘사랑’에 대한 기대감이 높아 오만 명이 관람하였다.',
      '영화 ‘사랑’의 평가가 나빠서 오만 관객을 기대하기 어렵다.',
    ],
    answer: '3',
    explanation:
      '영화에 대한 기대가 높았고 개봉 첫날 이미 오만 명 넘게 관람했습니다.',
    clue: '‘개봉 첫날 관객 수 오만 넘어’는 실제 관객 수입니다.',
    template: TopikVisualTemplate.EXAM_HEADLINE,
  }),
  question({
    number: 27,
    groupCode: 'reading-25-27',
    type: TopikQuestionType.HEADLINE_INTERPRETATION,
    prompt: '다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.',
    stimulus: headline('대형 마트 불황, 재래시장 매출은 나 홀로 ‘쑥쑥’'),
    choices: [
      '대형 마트와 재래시장은 불황 속에서도 매출이 상승하였다.',
      '대형 마트의 매출이 상승하면서 재래시장의 매출도 올랐다.',
      '불황이지만 대형 마트와 재래시장은 매출에 영향을 받지 않았다.',
      '대형 마트는 매출에 어려움이 있지만 재래시장은 매출이 올랐다.',
    ],
    answer: '4',
    explanation:
      '대형 마트는 불황이지만 재래시장 매출만 증가했다는 대비입니다.',
    clue: '‘대형 마트 불황’과 ‘재래시장 매출은 … 쑥쑥’이 대비됩니다.',
    template: TopikVisualTemplate.EXAM_HEADLINE,
  }),
  question({
    number: 28,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '아무리 훌륭한 내용의 글이라도 제목이 읽는 이의 시선을 끌지 못한다면 그 글은 사람들의 관심을 얻지 못한다. 독자의 관심을 끌 수 있는 방법은 [[blank:q28]] 제목을 짓는 것이다. 예를 들면 ‘돈을 관리하는 방법’보다는 ‘어느 날 당신에게 천만 원이 생긴다면?’이라는 제목이 더 좋다. 이렇게 독자의 입장에서 제목을 붙이면 흥미를 유발하여 독자의 시선을 끌 수 있다.',
    ),
    choices: [
      '독자에게 신뢰를 주는',
      '독자에게 새로운 정보를 주는',
      '독자가 자기 일처럼 느껴지게 하는',
      '독자가 내용을 쉽게 추측하게 하는',
    ],
    answer: '3',
    explanation:
      '‘당신에게 천만 원이 생긴다면?’처럼 독자가 자신의 일로 느끼게 하는 제목이 관심을 끕니다.',
    clue: '예시 제목은 독자를 직접 ‘당신’이라고 부릅니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 29,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '도도새는 날지 못해 멸종된 새이다. 도도새는 천적이 없고 먹이가 풍부한 곳에 살았기 때문에 날 필요가 없었고 날려고 하지도 않았다. 그러다 도도새의 서식지에 인간과 다른 동물들이 유입되었다. 나는 법을 잊어버린 도도새는 도망가지 못해 모두 잡아먹혔고 마침내 이 세상에서 사라져 버렸다. 이처럼 우리도 [[blank:q29]] 결국에는 모든 것을 잃어버리게 될 것이다.',
    ),
    choices: [
      '인생을 구체적으로 계획해 살지 않으면',
      '주어진 환경에 안주하여 노력하지 않으면',
      '내가 가진 것에 감사하지 않고 남과 비교하면',
      '인간관계가 힘들어 현실로부터 도망쳐 버리면',
    ],
    answer: '2',
    explanation:
      '안전하고 풍요로운 환경에 안주해 나는 능력을 잃은 도도새처럼 노력하지 않으면 중요한 것을 잃는다는 뜻입니다.',
    clue: '도도새는 ‘날 필요가 없었고 날려고 하지도 않았다’고 합니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 30,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '강한 자외선으로부터 눈을 보호하기 위해 선글라스 착용의 필요성이 강조되고 있다. 선글라스가 처음 개발되었을 때는 그 용도가 지금과 달랐다. 선글라스는 원래 법관들이 자신의 눈을 가리기 위해 쓰던 것이었다. 냉정하게 심문을 해야 하는 법관들이 눈을 통해 자신의 감정이 읽히는 것을 차단할 목적으로 사용하였다. 즉 심문을 할 때 자신의 [[blank:q30]] 범죄인의 의중을 파악하기 위한 도구였던 것이다.',
    ),
    choices: [
      '지위를 드러내지 않으면서',
      '감정을 과장되게 표현하면서',
      '판단이 정확함을 증명하면서',
      '심리를 노출시키지 않으면서',
    ],
    answer: '4',
    explanation: '법관은 자신의 감정이 드러나지 않도록 선글라스를 썼습니다.',
    clue: '‘자신의 감정이 읽히는 것을 차단할 목적’이라는 문장입니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 31,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '사람들은 새로운 맛보다는 익숙한 맛을 찾는 경향이 있다. 이는 사람의 여러 감각 기관 중에서 입이 가장 보수적이기 때문이다. 사정이 이렇다 보니 과자 회사들은 신제품을 내놓기보다는 [[blank:q31]]. 시장성이 확실한 기존의 인기 상품으로 시장 점유율을 확보하려는 것이다. 수십 년 전에 나온 과자들이 시장에서 사라지지 않고 계속 출시되는 이유가 바로 여기에 있다.',
    ),
    choices: [
      '성공이 검증된 제품을 앞세운다',
      '최근에 출시된 상품을 내놓는다',
      '제품의 시장성을 사전에 조사한다',
      '제품 연구와 개발에 비용을 투자한다',
    ],
    answer: '1',
    explanation:
      '새로운 제품보다는 기존에 인기가 확인된 과자를 계속 내놓는다는 내용입니다.',
    clue: '뒤의 ‘시장성이 확실한 기존의 인기 상품’이 빈칸을 설명합니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 32,
    groupCode: 'reading-32-34',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음을 읽고 내용이 같은 것을 고르십시오.',
    stimulus: passage(
      '한 회사가 사내 커피숍을 장애인 단체에 위탁하여 운영하도록 하고 있다. 커피숍의 모든 직원들은 장애인 단체에서 마련한 직업 교육 프로그램에 참여한 사람들이다. 이들은 커피숍에서 주문을 받거나 빵을 만드는 일을 담당하고 있다. 이러한 사업 방식은 장애인들에게 일할 수 있는 기회를 제공한다는 점에서 긍정적으로 평가된다. 회사는 앞으로 이 사업을 확대해 장애인들의 자립을 도울 예정이다.',
    ),
    choices: [
      '위탁 사업에 대해 걱정하는 사람들이 많다.',
      '커피숍에서 일하는 사람들은 회사의 직원들이다.',
      '회사는 더 많은 장애인 단체에 일을 맡길 계획이다.',
      '커피숍의 직원들은 회사가 제공하는 직업 교육을 받았다.',
    ],
    answer: '3',
    explanation:
      '회사가 장애인 단체에 위탁한 이 사업을 앞으로 확대하겠다고 합니다.',
    clue: '‘회사는 앞으로 이 사업을 확대해 장애인들의 자립을 도울 예정’입니다.',
  }),
  question({
    number: 33,
    groupCode: 'reading-32-34',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음을 읽고 내용이 같은 것을 고르십시오.',
    stimulus: passage(
      '‘유라시아 횡단 프로젝트’의 원정단이 한국을 출발, 아시아 여러 나라를 거쳐 독일에 이르는 먼 여정을 시작하였다. 이 프로젝트는 유럽과 아시아 협력의 필요성을 알리고 한국의 문화를 소개하기 위해 한 언론사가 기획하였다. 일반 시민들로 구성된 원정단은 민간외교사절의 역할을 하게 될 것이다. 정부는 원정단의 여정에 맞춰 한류 행사를 열고 향후 유라시아 에너지 협력 프로젝트를 추진하겠다고 밝혔다.',
    ),
    choices: [
      '원정단의 방문으로 유라시아 협력의 필요성이 대두되었다.',
      '원정단은 정부 기관에서 일하는 사람들 중에서 선발하였다.',
      '원정단은 이번 방문 중에 에너지 협력 방안을 논의할 것이다.',
      '원정단이 방문하는 곳에서 한국을 알리는 공연이 열릴 것이다.',
    ],
    answer: '4',
    explanation:
      '정부가 원정단의 여정에 맞춰 한류 행사를 열 계획이라고 했습니다.',
    clue: '‘원정단의 여정에 맞춰 한류 행사를 열고’라는 부분입니다.',
  }),
  question({
    number: 34,
    groupCode: 'reading-32-34',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음을 읽고 내용이 같은 것을 고르십시오.',
    stimulus: passage(
      '‘동경이’는 5세기경부터 경주 지역에서 사육되어 온 개인데 ‘동경’은 고려 시대 때 경주를 지칭하는 말이다. 동경이는 꼬리가 짧거나 아예 없다는 것이 특징이다. 이 때문에 옛날에는 사람들로부터 부정적으로 인식되어 한때 수난을 당한 적도 있었다. 그러나 옛 문헌과 신라 고분에서 동경이의 흔적이 발견되면서 한민족의 역사와 함께해 온 동물로 인정받게 되었다. 이에 최근 국가지정문화재인 천연기념물로 지정되었다.',
    ),
    choices: [
      '동경이의 이름은 지명에서 유래하였다.',
      '동경이는 예로부터 경주 지역에서 보호받아 왔다.',
      '동경이는 신체적 특징 때문에 가치 있는 동물로 여겨졌다.',
      '동경이의 흔적이 발견된 고분과 문헌이 문화재로 지정되었다.',
    ],
    answer: '1',
    explanation:
      '동경이는 고려 시대에 경주를 지칭하던 ‘동경’에서 이름이 왔습니다.',
    clue: '‘동경은 고려 시대 때 경주를 지칭하는 말’이라고 했습니다.',
  }),
  question({
    number: 35,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '21세기는 음악 구입과 청취가 온라인으로 이루어지고 있어 음악을 소비하는 시대라고 불린다. 그런데 최근 음악 애호가들을 중심으로 이미 구식이 되어 버린 카세트테이프를 구매하려는 사람들이 늘어나고 있다. 그들은 카세트테이프를 단순히 음악 감상의 도구가 아닌 소장하고 싶은 물건으로 생각한다. 여기에는 카세트테이프를 구매함으로써 자신이 좋아하는 음악인의 앨범을 오랫동안 간직하고 싶다는 마음이 담겨 있다.',
    ),
    choices: [
      '카세트테이프 인기는 음악 소비 시장의 확장을 의미한다.',
      '카세트테이프 발매로 음악에 대한 발전이 이루어지고 있다.',
      '카세트테이프 복원으로 옛 음악에 대한 관심이 커지고 있다.',
      '카세트테이프 구매는 앨범 소장에 대한 욕구가 반영된 것이다.',
    ],
    answer: '4',
    explanation:
      '카세트테이프를 오래 간직하고 싶은 소장품으로 여겨 구매한다는 내용입니다.',
    clue: '‘소장하고 싶은 물건’과 ‘앨범을 오랫동안 간직’하고 싶다는 표현입니다.',
  }),
  question({
    number: 36,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '방송가에서는 요즘 출연자의 사생활을 관찰하듯 담아내는 리얼리티 프로그램이 인기를 끌고 있다. 그런데 시청자들은 방송 내용이 제작진의 편집에 의해 가공된 것으로 인지하지 못하고 출연자의 실제 모습으로 오해하기도 한다. 이로 인해 출연자들이 간혹 시청자들의 반감을 사게 되는 경우도 있다. 이런 문제를 해결하기 위해 제작진은 흥미 위주의 제작에만 초점을 맞출 것이 아니라 출연자에 대한 존중도 잊지 말아야 한다.',
    ),
    choices: [
      '새로운 형식의 방송 프로그램 개발이 요구된다.',
      '출연자의 입장을 고려한 방송 제작이 필요하다.',
      '방송 제작에 시청자의 요구가 수용되어야 한다.',
      '다양한 시청자 참여 프로그램을 마련해야 된다.',
    ],
    answer: '2',
    explanation:
      '제작진이 출연자를 존중하며 프로그램을 만들어야 한다는 주장입니다.',
    clue: '마지막의 ‘출연자에 대한 존중도 잊지 말아야 한다’가 핵심입니다.',
  }),
  question({
    number: 37,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '기술 경쟁력이 중요한 시대가 되면서 무형 자산에 대한 금융권의 자금 지원이 확대되고 있다. 이때 중요한 것이 이공계 출신 인재의 역할이다. 그들은 첨단 기술에 대한 지식을 바탕으로 보통 사람들은 잘 모르는 무형 자산의 가치를 판단해 내는 역할을 한다. 따라서 기업의 성장 가능성에 대해 제대로 평가하기 위해서는 금융권 내에서 이공계 출신 전문 인력이 차지하는 비중이 높아져야 한다.',
    ),
    choices: [
      '금융권에서 이공계 출신 인력의 채용이 확대되어야 한다.',
      '금융권 내에서 고용인에 대한 재교육이 실시되어야 한다.',
      '무형 자산에 대한 금융권의 자금 지원이 증가되어야 한다.',
      '금융권에서 직원을 재교육시키는 방법이 변화되어야 한다.',
    ],
    answer: '1',
    explanation:
      '기술 가치를 평가할 이공계 출신 전문 인력의 비중을 금융권에서 높여야 한다는 주장입니다.',
    clue: '마지막 문장의 ‘이공계 출신 전문 인력이 차지하는 비중이 높아져야’가 핵심입니다.',
  }),
  question({
    number: 38,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '남극은 자원의 보고이자 자연 과학 연구의 최적지이다. 따라서 정부는 이번에 남극 연구를 세계 수준으로 끌어올리겠다는 취지에서 예산 투입 계획을 발표했다. 매우 고무적인 일이기는 하나 아직은 갈 길이 멀다. 이미 많은 나라들은 남극 연구에 비약적인 발전을 이루고 있는데 비해 우리는 아직 시작 단계에 불과하기 때문이다. 이번 예산 지원을 기반으로 앞으로 체계적인 연구 활동이 이루어져야 한다.',
    ),
    choices: [
      '장기적 남극 연구를 위해 예산 확보가 절실하다.',
      '남극 자원 개발이 무분별하게 시행되어서는 안 된다.',
      '남극 연구를 위해서는 세계 여러 나라의 협력이 필수적이다.',
      '자원 개발과 과학 발전을 위해 남극 연구에 박차를 가해야 한다.',
    ],
    answer: '4',
    explanation:
      '예산을 바탕으로 남극 연구 활동을 체계적으로 더 발전시켜야 한다는 주장입니다.',
    clue: '‘남극 연구를 세계 수준으로’ 끌어올리고 ‘체계적인 연구 활동’이 필요합니다.',
  }),
  question({
    number: 39,
    groupCode: 'reading-39-41',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt: '<보기>의 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    stimulus: insertionPassage(
      '그동안 한국에서는 고구마 꽃이 잘 피지 않아 백 년에 한 번 피는 진귀한 꽃으로 생각되었다. [[marker:m1|㉠]] 최근에는 이 고구마 꽃이 희귀성을 잃고 반갑지 않은 존재라는 인상을 주고 있다. [[marker:m2|㉡]] 본래 고구마 꽃은 고온 건조한 날씨가 지속되는 아열대 기후에서만 피는 꽃으로 알려져 있다. [[marker:m3|㉢]] 그러나 지구 온난화로 인해 한국에서 이상 고온 현상이 발생하면서 현재는 전국 각지에서 이 꽃이 심심찮게 발견되고 있다. [[marker:m4|㉣]]',
      '고구마 꽃이 기상 이변에 의해 쉽게 개화한다는 것이 밝혀졌기 때문이다.',
    ),
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '2',
    explanation:
      '꽃이 반갑지 않게 된 이유가 기상 이변이라는 문장 다음에 원래 피던 기후와 지금의 변화를 설명합니다.',
    clue: '㉡ 앞의 ‘반갑지 않은 존재’의 이유를 <보기>가 설명합니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 40,
    groupCode: 'reading-39-41',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt: '<보기>의 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    stimulus: insertionPassage(
      '효과적인 약물 치료를 위해서는 무엇보다 복용 방법을 정확히 지키는 것이 중요하다. [[marker:m1|㉠]] 복용법을 제대로 숙지하지 못하면 의약품을 부적절하게 사용해서 문제가 발생하기도 한다. [[marker:m2|㉡]] 그래서 지난 여름부터 약 판매 시 ‘그림복약지도서’를 제공해 주는 제도가 시행되고 있다. [[marker:m3|㉢]] 약품의 용법, 용량 등을 그림으로 표시해 시각적 효과를 살리고 이해도를 높인 것이다. [[marker:m4|㉣]]',
      '이처럼 그림복약지도서는 안전한 의약품 사용을 유도한다는 긍정적 효과가 있다.',
    ),
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '4',
    explanation:
      '그림복약지도서의 제공과 시각적 설명을 소개한 뒤 안전한 사용 효과를 결론으로 제시합니다.',
    clue: '<보기>의 ‘이처럼’은 앞에서 설명한 그림복약지도서의 기능을 받습니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 41,
    groupCode: 'reading-39-41',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt: '<보기>의 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    stimulus: insertionPassage(
      '독창적인 시로 주목 받고 있는 이정진 시인이 네 번째 시집 『무지개』를 출간했다. [[marker:m1|㉠]] 지난 작품에서 작가는 함축적인 어휘로 인간의 심오한 내면세계를 그려 내 시가 난해하다는 평을 받았다. [[marker:m2|㉡]] 그러나 이번 시집에서는 우리의 삶을 일상적인 언어로 노래하고 있어 전작에 비해 한결 가벼워진 느낌이다. [[marker:m3|㉢]] 늘 새로운 변화를 시도하고 있는 작가가 다음에는 우리에게 또 어떤 모습을 보여 줄지 기대된다. [[marker:m4|㉣]]',
      '이는 친숙한 시로 독자에게 한걸음 더 다가가겠다는 의도에서 비롯된 것이다.',
    ),
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '3',
    explanation:
      '이번 시집의 일상적인 언어 사용을 소개한 다음 그 의도를 설명하는 문장이 어울립니다.',
    clue: '<보기>의 ‘이는’은 ㉢ 앞의 가벼워진 시적 언어를 가리킵니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 42,
    groupCode: 'reading-42-43',
    type: TopikQuestionType.AUTHOR_EMOTION,
    prompt: '밑줄 친 부분에 나타난 나의 심정으로 알맞은 것을 고르십시오.',
    choices: [
      '희열을 느끼다',
      '기대에 들뜨다',
      '가슴이 먹먹하다',
      '마음이 홀가분하다',
    ],
    answer: '1',
    explanation:
      '오랜 시행착오 끝에 처음 자전거를 타고 빠르게 달리며 큰 기쁨을 느낍니다.',
    clue: '‘가슴이 터질 듯 부풀었고’라는 표현이 성공의 희열을 나타냅니다.',
    clueTargetKeys: ['emotion'],
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 43,
    groupCode: 'reading-42-43',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '이 글의 내용과 같은 것을 고르십시오.',
    choices: [
      '자전거의 바퀴가 고장 나서 집으로 끌고 가야 했다.',
      '주차 장치가 풀려서 계단 옆에 세워 놓은 자전거가 쓰러졌다.',
      '나는 자전거를 탈 줄 몰라서 늦은 시간까지 연습을 거듭했다.',
      '나는 다른 사람의 자전거와 부딪치면서 온몸에 상처를 입었다.',
    ],
    answer: '3',
    explanation:
      '나는 자전거를 탈 줄 몰라 수백 번 실패했고 어둠이 다가올 때까지 연습했습니다.',
    clue: '‘시행착오가 수백 번 거듭’되었고 ‘어둠이 다가오고’ 있었다고 합니다.',
  }),
  question({
    number: 44,
    groupCode: 'reading-44-45',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '이 글의 주제로 알맞은 것을 고르십시오.',
    choices: [
      '근무 환경이 변해도 중재자의 역할은 유지될 것이다.',
      '기업 활동에서 구성원 간의 대화가 무엇보다 중요하다.',
      '조직 구성원이 맡은 업무는 회사 사정에 따라 유동적이다.',
      '사내 연결망이 발달하면 구성원 간의 위계가 사라질 것이다.',
    ],
    answer: '1',
    explanation:
      '네트워크가 발달해도 중간 관리자는 구성원과 경영주 사이의 조정자로 계속 필요하다는 주장입니다.',
    clue: '‘중간 관리자는 … 다차원적 교차 지점에 있는 조정자들’이라고 합니다.',
  }),
  question({
    number: 45,
    groupCode: 'reading-44-45',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    choices: [
      '사내 연결망의 기능을 과소평가한',
      '시장 환경의 변화 양상을 잘못 예측한',
      '중간 관리자의 역할을 단편적으로 이해한',
      '중간 관리자 직책을 수평적 선상에서 파악한',
    ],
    answer: '3',
    explanation:
      '중간 관리자를 정보 전달자로만 본 예측이므로 역할을 단편적으로 이해한 데에서 나왔습니다.',
    clue: '뒤에서 중간 관리자는 단순한 ‘메신저’가 아니라고 반박합니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 46,
    groupCode: 'reading-46-47',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt: '다음 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '2',
    explanation:
      '경제 성장에 집중했던 과거를 설명한 바로 뒤에 삶의 질로 정책 관심이 전환됐다는 문장을 넣어야 합니다.',
    clue: '㉡ 앞의 ‘경제 성장을 지상 최대의 과제’로 삼았다는 문장과 대비됩니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 47,
    groupCode: 'reading-46-47',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '이 글의 내용과 같은 것을 고르십시오.',
    choices: [
      '삶의 질 지표는 통계청의 자체적인 결정에 따라 증감된다.',
      '삶의 질 지표는 국가 차원에서 도달해야 할 목표를 의미한다.',
      '삶의 질을 측정하는 지표는 논의 결과에 따라 달라질 수 있다.',
      '삶의 질 지표와 함께 정부는 경제 성장을 위해 매진할 것이다.',
    ],
    answer: '3',
    explanation:
      '국민 의견을 수렴하고 사회적 합의를 거쳐 지표 항목을 추가·개선할 계획입니다.',
    clue: '‘추가 항목과 개선 항목에 대한 사회적 합의’가 도출되어야 한다고 합니다.',
  }),
  question({
    number: 48,
    groupCode: 'reading-48-50',
    type: TopikQuestionType.AUTHOR_PURPOSE,
    prompt: '필자가 이 글을 쓴 목적을 고르십시오.',
    choices: [
      '인류에 잔재하는 반문명적 요소를 고발하기 위해',
      '시대에 걸맞은 가치의 변화가 필요함을 주장하기 위해',
      '인류가 간과해 온 충돌에 대한 경각심을 촉구하기 위해',
      '시대의 흐름에 따른 문명의 변화 양상을 설명하기 위해',
    ],
    answer: '2',
    explanation:
      '새로운 시대에는 동질성 대신 다름을 가치로 삼아야 한다고 주장합니다.',
    clue: '‘도래하는 신문명 시대의 가치는 동질성이 아닌 다름에서 찾아야 한다’는 문장입니다.',
  }),
  question({
    number: 49,
    groupCode: 'reading-48-50',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 알맞은 것을 고르십시오.',
    choices: [
      '상대에 대한 관심이',
      '자립에 대한 동경이',
      '이질성에 대한 집착이',
      '차이에 대한 적대감이',
    ],
    answer: '4',
    explanation:
      '동질성을 강조할수록 서로 다른 것에 대한 적대감이 커져 충돌이 생긴다는 내용입니다.',
    clue: '앞의 ‘무력 충돌이라는 부작용’과 뒤의 ‘다름을 철저히 배격’한다는 설명입니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 50,
    groupCode: 'reading-48-50',
    type: TopikQuestionType.AUTHOR_ATTITUDE,
    prompt: '밑줄 친 부분에 나타난 필자의 태도로 알맞은 것을 고르십시오.',
    choices: [
      '이질성이 없어진 후 발생할 문제점을 염려한다.',
      '서로 다른 것의 공존이 가져올 혼란을 걱정한다.',
      '획일성이 지배하는 어두운 현실에 대해 고민한다.',
      '동질성을 강조할 때 나타날 부정적 결과를 우려한다.',
    ],
    answer: '4',
    explanation:
      '동질성이 강조되면 다름을 배격해 지구촌 차원의 불행을 부를 수 있다고 우려합니다.',
    clue: '밑줄 친 ‘지구촌 차원의 불행을 야기할 수도 있다’는 표현입니다.',
    clueTargetKeys: ['attitude'],
  }),
];
