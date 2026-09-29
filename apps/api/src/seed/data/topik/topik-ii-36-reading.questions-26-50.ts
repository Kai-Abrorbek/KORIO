import {
  TopikChoiceLayout,
  TopikQuestionType,
  TopikVisualTemplate,
} from '../../../topik/schemas/topik-content.schema';
import { headline, insertionPassage, passage } from './topik-seed.helpers';
import { TopikSeedQuestion } from './topik-seed.types';
import { topikII36ReadingQuestion as question } from './topik-ii-36-reading.question';

export const TOPIK_II_36_READING_QUESTIONS_26_50: TopikSeedQuestion[] = [
  question({
    number: 26,
    groupCode: 'reading-25-27',
    type: TopikQuestionType.HEADLINE_INTERPRETATION,
    prompt: '다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.',
    stimulus: headline('배구팀 ‘젊은 옷’ 갈아입고 훨훨 날다'),
    choices: [
      '배구팀이 유니폼을 바꾼 후 경기를 하고 있다.',
      '배구팀이 젊은 선수로 구성된 후 경기가 시작되었다.',
      '배구팀이 젊은 선수로 바뀐 후 경기 결과가 좋아졌다.',
      '배구팀이 새 옷으로 갈아입은 후 경기를 준비하고 있다.',
    ],
    answer: '3',
    explanation:
      '선수단이 젊어지면서 경기 결과가 좋아졌다는 비유적인 제목입니다.',
    clue: '‘젊은 옷’은 젊은 선수 구성, ‘훨훨 날다’는 좋은 성적을 뜻합니다.',
    template: TopikVisualTemplate.EXAM_HEADLINE,
  }),
  question({
    number: 27,
    groupCode: 'reading-25-27',
    type: TopikQuestionType.HEADLINE_INTERPRETATION,
    prompt: '다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.',
    stimulus: headline('새 부동산 정책, 효과 놓고 의견 엇갈려'),
    choices: [
      '새 부동산 정책이 거둔 효과에 사람들의 관심이 쏠렸다.',
      '사람들이 새 부동산 정책이 거둘 효과를 기대하고 있다.',
      '사람들의 의견으로 효과적인 새 부동산 정책이 세워졌다.',
      '새 부동산 정책의 효과에 대해 사람들의 의견이 나뉘었다.',
    ],
    answer: '4',
    explanation: '새 부동산 정책의 효과에 관한 평가가 서로 다르다는 뜻입니다.',
    clue: '‘의견 엇갈려’는 의견이 나뉘었다는 의미입니다.',
    template: TopikVisualTemplate.EXAM_HEADLINE,
  }),
  question({
    number: 28,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '어떤 일의 순서를 정할 때 사람들은 흔히 ‘가위바위보’를 이용한다. 그런데 사람들이 아무 생각 없이 ‘가위바위보’를 하는 것 같지만 자세히 관찰해 보면 [[blank:q28]] 발견할 수 있다. 즉, 이긴 사람은 자신이 선택한 것을 그대로 유지하는 반면에 진 사람은 다른 것을 선택하는 경우가 많다. 이것은 사람들이 순간적인 행동을 할 때도 이기려는 본능으로 자신에게 유리하게 반응한다는 것을 보여 준다.',
    ),
    choices: [
      '다양한 종류가 있음을',
      '일정한 경향이 있음을',
      '동일한 빈도가 있음을',
      '필요한 조건이 있음을',
    ],
    answer: '2',
    explanation:
      '이긴 사람은 같은 선택을 유지하고 진 사람은 바꾸는 일정한 경향이 나타납니다.',
    clue: '승패에 따라 다음 선택을 유지하거나 바꾸는 패턴이 설명됩니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 29,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '아이스크림의 부드러움을 결정짓는 중요한 요소는 바로 공기이다. 숙성된 아이스크림 원료에 공기를 주입하면 부피가 점점 늘어나면서 조직이 부드러워지게 된다. 즉, 불어넣은 공기의 비율이 높을수록 부드러운 아이스크림이 되는 것이다. 그런데 한번 녹은 아이스크림은 다시 얼리더라도 이전처럼 부드러워지지 않는다. 원료에 숨어 있던 [[blank:q29]] 딱딱한 얼음 결정이 생기게 되어 부드러운 맛이 사라지는 것이다.',
    ),
    choices: [
      '공기가 빠져나가면서',
      '공기의 부피가 늘어나서',
      '공기의 비율을 잘못 조정해서',
      '공기가 원료를 부드럽게 해서',
    ],
    answer: '1',
    explanation:
      '아이스크림이 녹으면 원료 속 공기가 빠져나가 다시 얼려도 부드럽지 않습니다.',
    clue: '앞에서 공기가 아이스크림을 부드럽게 하는 요소라고 합니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 30,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '인간은 [[blank:q30]] 중심으로 세상일을 받아들인다. 연인과 헤어진 뒤 듣는 노래 가사는 전부 자신의 이야기인 양 생각하고, 어쩌다 머리 모양이 마음에 안 드는 날은 모두 자기만 쳐다보는 것처럼 느끼기도 한다. 고등학생은 이 세상에 자기들만 사는 것처럼 행동하고, 아이를 임신한 사람은 길거리에서 유난히 임신부만 눈에 들어온다. 이렇듯 우리는 세상의 많은 사건들에 자신을 투영해 유사성을 발견하고 이에 공감하며 살아간다.',
    ),
    choices: [
      '자기 자신을',
      '세상의 사건을',
      '눈에 보이는 일을',
      '같은 입장에 있는 사람을',
    ],
    answer: '1',
    explanation:
      '사람들은 주변 사건을 자신의 상황에 맞춰 받아들인다는 내용이므로 자기 자신을 중심으로 봅니다.',
    clue: '마지막에 ‘세상의 많은 사건들에 자신을 투영’한다고 합니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 31,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '최근 ‘자서전 쓰기’ 강좌를 듣는 70∼80대 노년층이 늘고 있다. 그들은 자서전이 유명한 인물의 일대기라는 고정관념에서 벗어나 자신의 지나간 시간에 대한 기록을 남기고자 하는 것이다. 강좌를 들으면서 자서전을 쓰려고 하는 이 노인들은 한국 전쟁을 겪고 오늘날의 눈부신 경제 성장을 이루어 낸 주역이자 산 증인이다. 따라서 이들의 자서전은 그저 ‘이 세상을 살다 간 흔적’이 아니라 [[blank:q31]] 중요한 기록이 될 것이다.',
    ),
    choices: [
      '자신의 인생을 반성하는',
      '인물의 성장 과정에 대한',
      '개인의 인생관과 철학을 보여 주는',
      '한국의 현대사와 산업화 과정에 대한',
    ],
    answer: '4',
    explanation:
      '노년층은 한국 전쟁과 경제 성장을 직접 겪은 증인이므로 자서전은 현대사와 산업화의 기록이 됩니다.',
    clue: '‘한국 전쟁을 겪고 오늘날의 눈부신 경제 성장을 이루어 낸 주역이자 산 증인’이 핵심입니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 32,
    groupCode: 'reading-32-34',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음을 읽고 내용이 같은 것을 고르십시오.',
    stimulus: passage(
      '흔히 우주 과학은 투자 비용에 비해 우리 생활에 기여하는 바가 적다고 생각한다. 그러나 우주를 향한 인간의 노력은 통신, 의료 등의 분야는 물론이고 일상생활에도 큰 영향을 미쳤다. 우주인의 식수 해결을 위한 장치가 정수기가 되었고, 우주인의 식사용으로 개발된 동결 건조 식품이 물만 넣으면 먹을 수 있는 일회용 국이 되었다. 이렇게 일상 속으로 들어온 우주 과학은 인류의 생활을 더욱 편리하고 풍요롭게 하고 있다.',
    ),
    choices: [
      '정수기가 우주인의 식수를 해결해 주었다.',
      '동결 건조 식품은 바쁜 일반인들을 위해 개발되었다.',
      '우주 과학 기술 덕분에 생활에 편리한 제품이 개발되었다.',
      '통신, 의료 분야에서 개발된 기술이 우주인들을 위해 사용되었다.',
    ],
    answer: '3',
    explanation:
      '정수기와 동결 건조 식품처럼 우주 과학 기술이 생활을 편리하게 하는 제품으로 이어졌습니다.',
    clue: '우주 과학은 ‘일상생활에도 큰 영향을 미쳤다’고 합니다.',
  }),
  question({
    number: 33,
    groupCode: 'reading-32-34',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음을 읽고 내용이 같은 것을 고르십시오.',
    stimulus: passage(
      '음료를 쏟아도 얼룩이 생기지 않는 티셔츠가 개발되었다. 이 셔츠는 겉으로 보았을 때는 일반 셔츠와 다르지 않지만 커피나 우유, 케첩 등이 묻어도 옷에 스며들지 않고 그대로 흘러내린다. 물이 통과하지 못하는 실리콘을 섬유에 입혀서 만들었기 때문이다. 건조 방법이 복잡하고 땀이 배출되지 못하는 등의 문제가 있기는 하나 앞으로 유아용품이나 세탁이 곤란한 생활용품 등에 활용이 가능할 것이다.',
    ),
    choices: [
      '이 셔츠는 땀이 나면 잘 스며든다.',
      '이 셔츠는 더러워지면 세탁이 불가능하다.',
      '이 셔츠는 겉모양이 보통의 셔츠와 구별된다.',
      '이 셔츠는 물의 흡수를 방지하는 재료로 만든다.',
    ],
    answer: '4',
    explanation:
      '물의 통과를 막는 실리콘을 섬유에 입혀 물과 음료가 스며들지 않게 했습니다.',
    clue: '‘물이 통과하지 못하는 실리콘을 섬유에 입혀서’ 만들었다고 합니다.',
  }),
  question({
    number: 34,
    groupCode: 'reading-32-34',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음을 읽고 내용이 같은 것을 고르십시오.',
    stimulus: passage(
      '위조를 방지하기 위해 색깔과 디자인을 바꾼 수표가 곧 발행된다. 이 수표는 각도에 따라 문자의 색상이 뚜렷하게 바뀌며, 발행 번호의 색상도 기존 수표보다 더 선명하게 인쇄된다. 또한 고액권 수표는 이미지를 전산에 미리 등록하여 돈을 인출할 때 같은 수표인지를 확인하도록 했다. 이와 같은 수표의 발행으로 더욱 안전한 금융 거래를 할 수 있을 것으로 보인다.',
    ),
    choices: [
      '이 수표는 각도에 따라 발행 번호가 바뀐다.',
      '이 수표는 이미지를 인쇄하여 위조를 막는다.',
      '이 수표는 문자의 색상 변화를 통해 위조를 방지한다.',
      '이 수표는 수표의 디자인을 개선하기 위해 만들어졌다.',
    ],
    answer: '3',
    explanation:
      '보는 각도에 따라 문자의 색상이 바뀌는 기능으로 위조를 방지합니다.',
    clue: '‘각도에 따라 문자의 색상이 뚜렷하게 바뀌며’라는 문장입니다.',
  }),
  question({
    number: 35,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '단순히 신맛을 내는 조미료 정도로만 여겨졌던 식초가 피로 회복이나 혈압 조절, 피부 미용 등에 효능이 있다는 것이 입증되면서 판매량이 늘고 있다. 이에 힘입어 식초업계에서는 맛과 향을 다양화해 선택의 폭을 넓히고 식초 음료를 개발하는 등 식초의 대중화를 위해 노력하고 있다. 그 결과 식초의 시장 점유율은 꾸준히 상승하고 있다. 건강이나 미용 외에 청소나 세척 등 일상생활에서의 활용도가 높아진 것도 판매량 증가에 일조했다.',
    ),
    choices: [
      '식초의 맛과 향의 종류가 많아졌다.',
      '식초 시장의 규모가 성장하고 있다.',
      '식초의 다양한 효능이 입증되고 있다.',
      '식초가 건강식품으로 주목 받고 있다.',
    ],
    answer: '2',
    explanation:
      '효능과 활용도가 알려지고 제품이 다양해지면서 식초 판매와 시장 점유율이 증가한다는 내용입니다.',
    clue: '‘판매량이 늘고 있다’와 ‘시장 점유율은 꾸준히 상승’이 중심입니다.',
  }),
  question({
    number: 36,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '최근 대중문화의 소비에 새로운 경향이 나타나기 시작했다. 과거에는 세대에 따라 흥미를 가지는 대중문화가 구별되어 있었다면 현재는 세대를 넘나드는 문화 콘텐츠들이 연령의 구분 없이 확산되고 있는 것이다. 예전에 유행했던 원로 가수들의 노래를 젊은 가수가 현대적인 감각으로 재해석해 부르면서 원곡이 폭발적인 인기를 얻기도 한다. 그런가 하면 랩을 하는 어르신, ‘아이돌’ 가수의 춤을 추는 중년의 회사원 등 젊은 감각을 즐기는 연령층이 넓어지고 있다.',
    ),
    choices: [
      '세대를 구분하는 대중문화가 늘어나고 있다.',
      '대중문화에 대한 중년층의 관심이 높아지고 있다.',
      '원로 가수의 노래가 젊은이들의 관심을 끌고 있다.',
      '대중문화를 즐기는 세대 간의 경계가 사라지고 있다.',
    ],
    answer: '4',
    explanation:
      '과거와 달리 젊은 층과 어르신 모두 세대 구분 없이 여러 대중문화를 즐긴다는 내용입니다.',
    clue: '‘세대를 넘나드는 문화 콘텐츠들이 연령의 구분 없이 확산’된다고 합니다.',
  }),
  question({
    number: 37,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '요즘 치유를 목적으로 ‘힐링’ 강연을 듣는 사람들이 점점 많아지고 있다. 현대인이 힐링에 열광하는 이유는 마음의 상처를 치유하고 실패에 대한 위로를 받고 싶어 하기 때문이다. 그러나 치유 열풍이 거센 것에 비해서 이를 통해 마음의 평화와 안정을 얻었다고 하는 사람들은 그리 많지 않다. 분위기에 휩쓸려 무작정 강연에 매달리기보다는 스스로를 치유할 수 있는 내면의 힘을 찾아야 할 것이다.',
    ),
    choices: [
      '힐링 열풍이 꾸준히 이어지고 있다.',
      '힐링의 성패는 자기 자신에게 달려 있다.',
      '힐링 강연으로 마음의 상처를 치유할 수 있다.',
      '힐링 강연을 통해 나만의 치유법을 찾아야 한다.',
    ],
    answer: '2',
    explanation:
      '강연에만 의지하기보다 스스로 치유할 수 있는 내면의 힘을 찾아야 한다고 주장합니다.',
    clue: '마지막 문장의 ‘스스로를 치유할 수 있는 내면의 힘’이 중심입니다.',
  }),
  question({
    number: 38,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '자동차 업계에서만 공유되던 부품 가격이 소비자의 알 권리와 유통의 투명성을 높이기 위해 공개되고 있다. 국내의 모든 자동차 회사들은 의무적으로 회사 홈페이지에 부품 가격을 게시한다. 그런데 자동차 회사들 중에는 초기 화면이 아닌 곳에 가격 정보를 공개하거나 회원 가입을 해야 정보를 볼 수 있도록 해 소비자들의 불신을 초래하는 경우가 있다. 이에 대해 이 제도가 기업에 대한 소비자의 신뢰를 되찾는 계기가 될 수 있도록 업계의 자성이 필요하다는 목소리가 커지고 있다.',
    ),
    choices: [
      '가격 게시를 통해 유통 과정이 공개되고 있다.',
      '부품 가격 공개는 소비자의 알 권리와 관계가 있다.',
      '업계는 홈페이지에 부품 가격 정보를 게시해야 한다.',
      '기업은 정직한 부품 가격 공개로 신뢰를 회복해야 한다.',
    ],
    answer: '4',
    explanation:
      '형식적으로 가격을 공개해 불신을 사는 기업이 투명하게 공개해 신뢰를 회복해야 한다는 주장입니다.',
    clue: '마지막 문장의 ‘소비자의 신뢰를 되찾는 계기’와 ‘업계의 자성’이 핵심입니다.',
  }),
  question({
    number: 39,
    groupCode: 'reading-39-41',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt: '<보기>의 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    stimulus: insertionPassage(
      '‘골든타임(황금시간)’이란 응급 환자가 발생했을 때 환자의 생명을 살리는 데 필요한 최소한의 시간을 뜻한다. [[marker:m1|㉠]] 골든타임 내에 응급 환자가 제대로 치료를 받느냐 받지 못하느냐에 따라 환자의 생사가 갈릴 수 있다. [[marker:m2|㉡]] 골든타임이 잘 지켜지려면 구급차 주행 시 운전자들의 협조가 요구된다. [[marker:m3|㉢]] 길을 비켜 주는 이러한 배려로 누군가는 생명을 지킬 수 있게 된다. [[marker:m4|㉣]] 시민들의 작은 협조가 한 생명을 살리는 길로 통한다.',
      '응급 환자가 바로 내 가족이라고 생각하고 구급차에 길을 양보해 주자.',
    ),
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '3',
    explanation:
      '구급차에 길을 양보하라는 문장이 뒤의 ‘길을 비켜 주는 이러한 배려’를 자연스럽게 이어 줍니다.',
    clue: '㉢ 뒤의 ‘이러한 배려’가 앞에 넣은 길 양보를 가리킵니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 40,
    groupCode: 'reading-39-41',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt: '<보기>의 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    stimulus: insertionPassage(
      '우울한 미래가 배경인 소설이나 영화를 보면 등장인물의 이름이 없는 경우가 많다. [[marker:m1|㉠]] 이름 대신 숫자나 기호 같은 것으로 불리면서 개성이 없이 집단화된 모습을 보여 준다. [[marker:m2|㉡]] 사람이 이름이 아니라 번호로 불릴 때 얼마나 삭막하고 암울한지를 그러한 모습을 보면서 알게 된다. [[marker:m3|㉢]] 그래서 우리가 기억하는 역사 속 인물들도 이름을 명예롭게 지키고자 때로는 목숨까지 던지지 않았을까? [[marker:m4|㉣]]',
      '사람에게 이름이 있다는 것은 말 그대로 자신의 이름을 걸고 세상을 살고 있다는 것을 의미한다.',
    ),
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '3',
    explanation:
      '이름이 없는 사회의 삭막함을 설명한 뒤, 이름이 자신의 정체성을 뜻한다는 문장으로 역사 인물의 선택을 연결합니다.',
    clue: '㉢ 앞은 이름 없는 세계의 문제이고 뒤는 이름을 지키려는 역사 인물의 이야기입니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 41,
    groupCode: 'reading-39-41',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt: '<보기>의 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    stimulus: insertionPassage(
      '김민석 박사가 최근 내놓은 『협상에도 기술이 있다』가 3주 연속 서점가 베스트셀러 1위 자리를 차지하고 있다. [[marker:m1|㉠]] 이 책은 역사 속의 위대한 협상가를 내세워 그들로부터 배워야 할 점이 무엇인지를 담고 있다. [[marker:m2|㉡]] 만약 그들이 살아 있다면 테러리스트와의 협상이나 국가 간 자유무역 협상을 어떻게 이끌었을까? [[marker:m3|㉢]] 이 책이 3주 연속 정상을 차지하고 있는 이유가 바로 여기에 있다. [[marker:m4|㉣]]',
      '저자는 각각의 상황에 맞는 협상의 원칙을 제시하면서 협상가의 입을 빌려 독자들의 궁금증을 해소시켜 준다.',
    ),
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '3',
    explanation:
      '협상가라면 어떻게 할지 묻는 문장 다음에 그 궁금증을 저자가 해소해 준다는 문장이 이어집니다.',
    clue: '㉢ 앞의 질문과 <보기>의 ‘독자들의 궁금증을 해소’가 연결됩니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 42,
    groupCode: 'reading-42-43',
    type: TopikQuestionType.AUTHOR_EMOTION,
    prompt: '밑줄 친 부분에 나타난 현석의 심정으로 알맞은 것을 고르십시오.',
    choices: ['안타깝다', '괘씸하다', '담담하다', '허탈하다'],
    answer: '1',
    explanation:
      '이사를 떠나면서 인혜와 헤어지는 상황에 마음이 안타까워 창문을 바라보고 있습니다.',
    clue: '비를 맞으며 인혜의 창문을 올려다보고, 표정에는 우수가 어렸습니다.',
    clueTargetKeys: ['emotion'],
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 43,
    groupCode: 'reading-42-43',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '이 글의 내용과 같은 것을 고르십시오.',
    choices: [
      '현석이는 매일 아침 인혜와 함께 등교를 했다.',
      '현석이네는 5학년 때 인혜네 앞집으로 이사를 왔다.',
      '친구들은 현석이가 인혜를 좋아한다는 것을 몰랐다.',
      '현석이는 인혜에게 가방을 들어 주겠다는 말을 자주 했다.',
    ],
    answer: '1',
    explanation:
      '현석은 아침마다 인혜의 집 문을 두드리며 함께 학교에 가자고 했습니다.',
    clue: '‘아침이면 어김없이 인혜네 양철대문을 두드리며’ 학교에 가자고 했습니다.',
  }),
  question({
    number: 44,
    groupCode: 'reading-44-45',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '이 글의 주제로 알맞은 것을 고르십시오.',
    choices: [
      '12개의 과제가 정책 사업으로 선정되었다.',
      '인주시의 실험을 위해 다양한 시민이 모였다.',
      '시민들은 직접 민주주의 실험에 대해 호의적이다.',
      '인주시는 직접 민주주의 방식으로 정책을 결정한다.',
    ],
    answer: '4',
    explanation:
      '인주시는 시민이 정책을 제안하고 토론·심사해 과제를 결정하는 직접 민주주의를 실험합니다.',
    clue: '‘정책의 제안과 심사를 시민에게 맡기는 직접 민주주의 실험’이 첫 문장입니다.',
  }),
  question({
    number: 45,
    groupCode: 'reading-44-45',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    choices: [
      '시가 발의한 정책을 심사하는 실험이',
      '필요한 예산을 수립할 수 있는 기회가',
      '시민의 참여와 혁신을 보여 주는 실험이',
      '정책 결정에 참여할 대표를 정하는 기회가',
    ],
    answer: '3',
    explanation:
      '시민이 정책을 제안하고 심사하는 제도가 한 번의 실험으로 끝나지 않도록 지원하겠다는 뜻입니다.',
    clue: '앞부분에서 시민이 제안·심사한 정책을 시 사업으로 추진한다고 설명합니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 46,
    groupCode: 'reading-46-47',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt: '다음 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '3',
    explanation:
      '냉각 설비와 공기 공급 기술로 화장실을 보완한 내용을 설명한 뒤 안전한 대피 시간이라는 결과를 제시합니다.',
    clue: '<보기>의 ‘이렇게 보완한 화장실’은 ㉢ 앞의 문·환기 시설 개선을 받습니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 47,
    groupCode: 'reading-46-47',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '이 글의 내용과 같은 것을 고르십시오.',
    choices: [
      '화재가 발생하면 화장실 문을 통해 공기를 공급받게 된다.',
      '화장실을 이용한 대피 공간 개발은 경제적으로 큰 도움이 된다.',
      '초고층 건물의 화재 시 대피 방안이 마련되어 잘 활용되고 있다.',
      '화재 피해를 막기 위해 초고층 건물의 화장실 설치 기준이 변경됐다.',
    ],
    answer: '2',
    explanation:
      '초고층 건물의 별도 피난 구역을 화장실로 대체할 수 있어 경제적 효과가 크다고 했습니다.',
    clue: '‘이 기술을 초고층 건물에 적용할 경우 경제적 효과도 크다’고 명시합니다.',
  }),
  question({
    number: 48,
    groupCode: 'reading-48-50',
    type: TopikQuestionType.AUTHOR_PURPOSE,
    prompt: '필자가 이 글을 쓴 목적을 고르십시오.',
    choices: [
      '정부의 지원 대책 마련을 요구하기 위하여',
      '낙수 효과가 일어나는 현상을 설명하기 위하여',
      '선성장 후분배의 성공 사례를 제시하기 위하여',
      '정부의 새로운 경제 성장 정책을 지지하기 위하여',
    ],
    answer: '4',
    explanation:
      '과거 선성장 후분배의 한계를 지적하며 현 정부의 소득 주도 성장 정책이 적절하다고 지지합니다.',
    clue: '마지막에 ‘소득 주도 성장’ 정책이 ‘시의 적절하다’고 평가합니다.',
  }),
  question({
    number: 49,
    groupCode: 'reading-48-50',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 알맞은 것을 고르십시오.',
    choices: [
      '높은 경제 성장을 이루고',
      '다양한 분배 정책을 실시하고',
      '성장과 분배가 조화를 이루고',
      '적은 세금을 국민에게 부과하고',
    ],
    answer: '1',
    explanation:
      '일부 국가가 높은 경제 성장을 이룬 뒤 그에 따라 불평등도 완화됐다는 과거 사례입니다.',
    clue: '앞의 ‘성장률이 올라가면 저절로 분배’되는 낙수 효과의 예입니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 50,
    groupCode: 'reading-48-50',
    type: TopikQuestionType.AUTHOR_ATTITUDE,
    prompt: '밑줄 친 부분에 나타난 필자의 태도로 알맞은 것을 고르십시오.',
    choices: [
      '소득 불평등 문제가 해소된 상황을 가정하고 있다.',
      '소득 주도 성장을 위한 다양한 방법을 제안하고 있다.',
      '이전과 같은 성장에 따른 분배가 불가능함을 주장하고 있다.',
      '정책 변화로 인해 경제 성장률이 떨어질 것을 예측하고 있다.',
    ],
    answer: '3',
    explanation:
      '현재 경제 구조에서는 경제 성장만으로 소득 불평등이 완화되는 현상이 실현되기 어렵다고 주장합니다.',
    clue: '밑줄 친 ‘경제 성장에 따른 소득 불평등 완화 현상은 실현되기 어렵다’는 문장입니다.',
    clueTargetKeys: ['attitude'],
  }),
];
