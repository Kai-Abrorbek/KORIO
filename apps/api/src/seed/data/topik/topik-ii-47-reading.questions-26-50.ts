import {
  TopikChoiceLayout,
  TopikQuestionType,
  TopikVisualTemplate,
} from '../../../topik/schemas/topik-content.schema';
import { headline, insertionPassage, passage } from './topik-seed.helpers';
import { TopikSeedQuestion } from './topik-seed.types';
import { topikII47ReadingQuestion as question } from './topik-ii-47-reading.question';

export const TOPIK_II_47_READING_QUESTIONS_26_50: TopikSeedQuestion[] = [
  question({
    number: 26,
    groupCode: 'reading-25-27',
    type: TopikQuestionType.HEADLINE_INTERPRETATION,
    prompt: '다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.',
    stimulus: headline('황금연휴, 여행 업계 오랜만에 웃어'),
    choices: [
      '긴 연휴로 여행 업계가 오랜만에 활기를 찾았다.',
      '짧은 연휴에도 여행을 하려는 사람이 여전히 많다.',
      '연휴가 길지 않아 여행을 예약하는 사람이 많지 않다.',
      '연휴 기간 동안 업계는 만족할 만한 여행 상품을 준비했다.',
    ],
    answer: '1',
    explanation:
      '긴 연휴로 여행 수요가 늘어 여행 업계가 활기를 띠었다는 뜻입니다.',
    clue: '‘황금연휴’와 ‘여행 업계 오랜만에 웃어’가 연결됩니다.',
    template: TopikVisualTemplate.EXAM_HEADLINE,
  }),
  question({
    number: 27,
    groupCode: 'reading-25-27',
    type: TopikQuestionType.HEADLINE_INTERPRETATION,
    prompt: '다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.',
    stimulus: headline('배추 생산 과잉, 농민들 한숨'),
    choices: [
      '배추의 생산량이 부족하여 농민들이 실망했다.',
      '배추 농사가 잘 되어 농민들이 희망에 차 있다.',
      '배추가 적게 생산되어 농민들의 기대감이 낮아졌다.',
      '배추가 필요 이상으로 생산되어 농민들이 힘들어한다.',
    ],
    answer: '4',
    explanation:
      '배추가 필요 이상으로 많이 생산돼 농민들이 걱정한다는 제목입니다.',
    clue: '‘생산 과잉’은 필요량보다 생산이 많다는 뜻입니다.',
    template: TopikVisualTemplate.EXAM_HEADLINE,
  }),
  question({
    number: 28,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '아이에게 맞는 색이 있다. 그래서 색을 [[blank:q28]] 활용하는 것이 좋다. 예를 들어 소극적인 아이에게는 밝고 따뜻한 색으로 방을 꾸며 주는 것이 좋다. 빨간 꽃그림이 있는 책장으로 아이 방을 장식하면 경쾌한 느낌을 주어 아이의 감정을 밝게 해 줄 수 있기 때문이다. 반대로 아이의 성격이 공격적이라면 초록색이 잘 맞는다. 초록색은 편안한 분위기를 연출하여 마음을 차분하게 가라앉혀 줄 수 있다.',
    ),
    choices: [
      '방의 구조에 맞게',
      '장식에 따라 다르게',
      '아이의 성향에 맞게',
      '그림의 특성이 나타나게',
    ],
    answer: '3',
    explanation:
      '소극적인 아이와 공격적인 아이에게 서로 다른 색을 권하므로 성향에 맞춰야 합니다.',
    clue: '‘소극적인 아이’와 ‘공격적인 아이’의 사례가 대비됩니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 29,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '각 분야의 [[blank:q29]] ‘사람도서관’이 등장해 화제다. 사람도서관은 표현 그대로 사람을 책처럼 대출할 수 있는 도서관이다. 도서관이 전문적인 지식과 경험을 가진 사람을 ‘사람책’으로 등록하면 독자는 관심 있는 분야의 사람책을 대출하면 된다. 예를 들어 글을 쓰는 데에 관심이 있는 사람이라면 사람도서관에서 글쓰기 관련 사람책을 대출하여 강의를 들으면 된다. 다만 사람책을 이용하려면 정해진 인원 이상이 모여야 한다.',
    ),
    choices: [
      '전문가를 활용하는',
      '전문가를 양성하는',
      '기술자를 교육하는',
      '기술자를 파견하는',
    ],
    answer: '1',
    explanation:
      '각 분야 전문가를 사람책으로 등록하고 독자가 대출해 지식과 경험을 듣는 방식입니다.',
    clue: '‘전문적인 지식과 경험을 가진 사람’을 ‘사람책’으로 등록합니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 30,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '보통 소비자들은 ‘햄버거 1개가 550칼로리를 함유하고 있다’는 것의 의미를 정확하게 이해하지 못한다. 그래서 식품에 표시된 열량에 민감해 하지 않는다. 그러나 햄버거 겉면에 ‘햄버거 1개를 먹을 경우 9km 정도 달려야 한다’고 쓰여 있다면 그것을 본 소비자는 햄버거의 열량이 어느 정도인지 체감하게 될 것이다. 이처럼 식품의 겉면에 열량을 소모하기 위해 [[blank:q30]] 하는지 표시하면 소비자들의 음식에 대한 생각을 변화시킬 수 있을 것이다.',
    ),
    choices: [
      '무슨 음식을 선택해야',
      '얼마나 몸을 움직여야',
      '어떤 행동에 신중해야',
      '언제 열량에 신경 써야',
    ],
    answer: '2',
    explanation:
      '열량을 소비하려면 얼마나 달려야 하는지 운동량으로 보여 주자는 내용입니다.',
    clue: '햄버거 한 개를 먹으면 ‘9km 정도 달려야 한다’는 표시입니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 31,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '기한이 정해져 있는 티켓의 경우 기간이 지나면 사용하지 못하게 된다. 그런데 기한이 얼마 남지 않은 티켓이라도 모바일 시장을 이용하면 판매할 수 있다. 이 시장에서는 판매자와 소비자가 실시간으로 필요한 정보를 교환한다. 이 시장을 통해 판매자는 기간이 지나면 [[blank:q31]] 상품을 판매할 수 있고, 소비자는 필요한 시점에 싼 가격으로 상품을 구매할 수 있는 것이다.',
    ),
    choices: [
      '가치가 사라지는',
      '가격이 올라가는',
      '수요가 많아지는',
      '생산이 줄어드는',
    ],
    answer: '1',
    explanation:
      '기한이 지나면 쓸 수 없어서 가치가 사라지는 티켓을 미리 판매할 수 있습니다.',
    clue: '‘기간이 지나면 사용하지 못하게 된다’는 첫 문장입니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 32,
    groupCode: 'reading-32-34',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음을 읽고 내용이 같은 것을 고르십시오.',
    stimulus: passage(
      '동물원의 동물들은 빠른 번식으로 인해 개체 수 조절이 어렵다. 그러다 보면 한정된 공간에 너무 많은 동물들이 함께 있게 되어 스트레스를 많이 받게 된다. 그래서 서울의 한 동물원에서는 사자의 개체 수를 줄이기 위해 많은 수의 사자를 다른 동물원에 보내고 대신 개체 수가 적은 낙타를 들여오는 방법을 썼다. 그 결과 개체 수가 줄어든 사자들은 스트레스를 덜 받게 되었다. 이러한 동물원 간 교류가 동물의 서식 환경 개선을 위한 하나의 방안이 될 수 있을 것이다.',
    ),
    choices: [
      '동물원의 동물들은 번식으로 개체 수를 조절한다.',
      '동물원 간의 교류를 통해 동물의 개체 수를 늘린다.',
      '서식 환경 개선을 위해 많은 새로운 동물을 들여와야 한다.',
      '좁은 공간에 개체 수가 많으면 동물의 스트레스가 증가한다.',
    ],
    answer: '4',
    explanation:
      '한정된 공간에 너무 많은 동물이 모이면 스트레스를 받는다고 합니다.',
    clue: '‘한정된 공간에 너무 많은 동물들이 함께 있게 되어 스트레스’를 받습니다.',
  }),
  question({
    number: 33,
    groupCode: 'reading-32-34',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음을 읽고 내용이 같은 것을 고르십시오.',
    stimulus: passage(
      '최근 시간과 비용을 들여 멀리 여행을 떠나는 대신 집에서의 휴식을 중요하게 생각하는 사람들이 늘고 있다. 이러한 사람들은 휴식의 편의를 위해 거실이나 욕실을 새롭게 고쳐 쓰는 등 집을 휴식의 공간으로 꾸미는 데 관심이 많다. 그리고 편안한 휴식을 즐기기 위해 고가의 안락의자나 침대를 구입하는 데도 지출을 아끼지 않는다. 이렇게 사람들의 집에 대한 인식이 단순히 쉬는 공간에서 질 높은 휴식을 위한 공간으로 바뀌고 있다.',
    ),
    choices: [
      '사람들은 휴식의 질보다는 휴식의 편의를 추구한다.',
      '휴식을 위해 여행을 떠나는 사람들이 증가하고 있다.',
      '사람들은 가구를 구입하는 데에 큰 비용을 들이지 않는다.',
      '휴식을 위해 집의 공간을 고쳐 쓰는 사람들이 많아지고 있다.',
    ],
    answer: '4',
    explanation:
      '집에서 질 높은 휴식을 하려고 거실이나 욕실을 고쳐 쓰는 사람이 늘고 있습니다.',
    clue: '‘거실이나 욕실을 새롭게 고쳐 쓰는’ 사람들이 늘고 있습니다.',
  }),
  question({
    number: 34,
    groupCode: 'reading-32-34',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음을 읽고 내용이 같은 것을 고르십시오.',
    stimulus: passage(
      '문화와 역사적 가치가 높지만 국가에서 관리하지 못하고 있는 토지, 자연, 건물 등이 많이 있다. 이를 관리하고 보존하려는 시민운동이 새롭게 시작되고 있다. 사라질 위기에 처해 있는 중요한 자산을 지키기 위해 시민들이 자발적으로 모금에 나선 것이다. 이러한 시민의 노력으로 최근 희귀식물인 ‘매화마름’이 보존되는 등 가시적인 성과가 나타나고 있다. 이러한 운동이 앞으로도 지속되기 위해서는 시민들의 적극적인 동참이 필요하다.',
    ),
    choices: [
      '시민들은 국가의 지원을 받아 모금 활동을 했다.',
      '시민들이 국가 토지 관리에 적극 참여하고 있다.',
      '시민들이 역사적 가치가 높은 자산을 보존하기 시작했다.',
      '시민운동이 희귀식물 보존에까지는 미치지 못하고 있다.',
    ],
    answer: '3',
    explanation:
      '시민들이 역사·문화적으로 중요한 자산을 지키기 위해 자발적으로 모금하고 있습니다.',
    clue: '‘중요한 자산을 지키기 위해 시민들이 자발적으로 모금’합니다.',
  }),
  question({
    number: 35,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '유무선의 통신 수단이 없던 시대에 위급한 상황이 생기면 불이나 연기로 정보를 주고받았다. 보통 멀리서 잘 보이는 산봉우리에서 밤에는 불을, 낮에는 연기를 피우는 방법을 사용했고 이때 알리는 위급의 정도를 다섯 등급으로 나누었다. 그런데 이 방법은 비, 구름, 안개 등의 기상 상태에 영향을 받는다는 문제점이 있었다. 그러나 이러한 한계에도 불구하고 당시에는 국가적인 긴급 상황에 대처하는 데 중요한 역할을 담당했다.',
    ),
    choices: [
      '불이나 연기는 위험 상황을 알리는 주요 통신 수단이었다.',
      '불이나 연기를 쓰는 통신 수단은 날씨의 영향을 많이 받았다.',
      '긴급 상황에는 날씨에 따라 다섯 단계로 나누어 연기를 피웠다.',
      '과거의 통신 수단으로는 국가적 긴급 상황에 대처하기 어려웠다.',
    ],
    answer: '1',
    explanation:
      '과거에 불과 연기가 긴급 상황을 알리는 중요한 통신 수단이었다는 글입니다.',
    clue: '한계에도 불구하고 ‘중요한 역할’을 담당했다고 결론짓습니다.',
  }),
  question({
    number: 36,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '숫자 활용 능력은 비즈니스 성패에 중요한 영향을 끼친다. 매출 실적, 재고 사항 등 숫자로 가득한 비즈니스 현장에서 숫자에 강하다는 것은 그만큼 능력을 인정받을 가능성이 높다는 것을 의미한다. 예컨대 신제품 발표회에서 숫자를 활용한 데이터를 제시하면 고객에게 신뢰감을 줄 수 있고, 이 신뢰를 바탕으로 경쟁에서 유리한 위치를 차지할 수 있는 것이다. 비즈니스에서 성공하고 싶다면 숫자 활용 감각을 키우라고 제안하는 이유가 바로 여기에 있다.',
    ),
    choices: [
      '숫자를 활용하는 능력은 비즈니스 현장에서 배워야 한다.',
      '매출 실적을 높이기 위해 숫자를 체계적으로 정리해야 한다.',
      '신제품 발표회에서는 제품의 우수성을 데이터로 제시해야 한다.',
      '성공적인 비즈니스를 위해 숫자를 잘 활용하는 연습을 해야 한다.',
    ],
    answer: '4',
    explanation:
      '숫자 활용 능력이 비즈니스 성공에 도움이 되므로 그 감각을 키워야 한다는 주장입니다.',
    clue: '‘성공하고 싶다면 숫자 활용 감각을 키우라’는 결론입니다.',
  }),
  question({
    number: 37,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '혼자 사는 사람들이 많아지면서 외로움을 이겨내는 ‘고독력’이 주목을 끌고 있다. 고독력이란 홀로 있는 시간을 즐기고 창의적으로 활용하는 능력을 말한다. 이러한 능력을 기르기 위해서는 남의 시선에 얽매이지 않고 외로움과 마주 서는 연습을 해야 한다. 외로움을 받아들이지 못하면 분노와 적개심이 쌓일 수도 있고, 외로움 속에 스스로를 고립시켜 우울증에 걸리기도 한다. 따라서 무엇보다 외로움을 두려워하지 않는 태도가 우선되어야 한다.',
    ),
    choices: [
      '남의 시선이 두려워 홀로 지내면 우울증에 걸릴 수 있다.',
      '혼자 사는 것이 시간을 창의적으로 활용할 수 있는 방법이다.',
      '고독력을 기르기 위해서는 외로움을 받아들이는 연습이 필요하다.',
      '혼자 사는 사람들은 분노와 적개심이 쌓이는 것을 주의해야 한다.',
    ],
    answer: '3',
    explanation:
      '외로움을 피하지 않고 받아들이는 연습이 고독력을 기르는 길입니다.',
    clue: '‘외로움을 두려워하지 않는 태도가 우선’이라고 합니다.',
  }),
  question({
    number: 38,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '일반적으로 공짜로 끼워 주는 경품이 있을 경우 소비자들은 구매의 유혹을 더 받게 된다. 그러나 때로 무료 경품은 판매에 도움이 되기보다 오히려 역효과를 낼 수도 있다. 실제로 한 조사에서는 경품으로 준 물건에 대해 소비자들은 그 품질에 비해 낮은 가격을 책정하는 경향을 보였다. 이렇게 소비자들은 공짜로 주는 물건은 별 가치가 없다고 생각하기도 한다. 이런 인식은 제품 가격의 합리성을 의심하는 등 판매에도 부정적인 영향을 미칠 수 있다.',
    ),
    choices: [
      '소비자들은 무료로 주는 경품의 품질을 믿지 않는다.',
      '무료 경품이 제품 판매에 나쁜 영향을 줄 수도 있다.',
      '소비자들은 보통 무료 경품이 있는 제품을 선호한다.',
      '무료 경품 때문에 제품 가격이 비합리적으로 책정된다.',
    ],
    answer: '2',
    explanation:
      '경품이 가치 없는 물건이라는 인식을 주면 판매에 역효과가 날 수 있습니다.',
    clue: '‘무료 경품은 ... 오히려 역효과를 낼 수도 있다’고 합니다.',
  }),
  question({
    number: 39,
    groupCode: 'reading-39-41',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt:
      '다음 글에서 <보기>의 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    stimulus: insertionPassage(
      '옛날에는 책을 눈으로만 읽지 않고 몸을 움직이며 가락에 맞추어 소리 높여 읽었다. [[marker:m1|㉠]] 그런데 현대 정보화 사회에 이르러서는 독서 방식이 획기적으로 변하였다. [[marker:m2|㉡]] 다 같이 소리를 내서 읽는 방식 대신 혼자 읽는 방식을 선호하게 되었다. [[marker:m3|㉢]] 다양한 연결망을 통해 개인적으로 읽을 글을 선택․변경하고, 자유롭게 영역을 이동하는 검색형 독서 방식이 생겨난 것이다. [[marker:m4|㉣]] 이와 같이 시대에 따라 독서의 방식은 변화한다.',
      '또한 글의 흐름에 따라 처음부터 끝까지 순서대로 읽던 과거의 독서 방식도 바뀌고 있다.',
    ),
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '3',
    explanation:
      '소리 내어 읽는 방식의 변화 뒤에 순서대로 읽던 방식의 변화를 더하고 검색형 독서를 설명합니다.',
    clue: '‘또한’은 바로 앞의 변화에 다른 변화를 추가하며, 다음 문장은 검색형 독서입니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
  }),
  question({
    number: 40,
    groupCode: 'reading-39-41',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt:
      '다음 글에서 <보기>의 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    stimulus: insertionPassage(
      '소설가 김병용 씨가 전국의 강 길과 산길을 여행하면서 쓴 글을 엮어 산문집 《길 위의 풍경》을 펴냈다. [[marker:m1|㉠]] 작가는 길이 자신과 세상을 이어주는 통로이며, 끊임없이 이어지는 길 위에서 자신도 변화하고 성장한다고 말한다. [[marker:m2|㉡]] 여기에서 소개하는 길을 따라 그곳 사람들의 소박하지만 단단한 일상을 들여다보고 있으면 포기하고 좌절했던 나의 모습들이 부끄러워진다. [[marker:m3|㉢]] 길이 주는 떨림을 느끼면서 그 속에서 변화․성장하고 싶다면 주저 없이 이 책을 읽기를 권한다. [[marker:m4|㉣]]',
      '그리고 깨닫지 못하는 사이에 다시 일어나 걸을 수 있는 용기를 받는다.',
    ),
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '3',
    explanation:
      '길 위의 사람들을 보며 자신의 모습을 돌아본 뒤 다시 일어날 용기를 얻는 흐름입니다.',
    clue: '앞 문장의 ‘포기하고 좌절했던 나의 모습’ 뒤에 ‘다시 일어나 ... 용기’가 이어집니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
  }),
  question({
    number: 41,
    groupCode: 'reading-39-41',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt:
      '다음 글에서 <보기>의 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    stimulus: insertionPassage(
      '어떤 역사적 사건이나 실존 인물의 실화에 작가의 상상력을 보태어 새로운 이야기로 풀어내는 글쓰기 방식이 있다. [[marker:m1|㉠]] 사실과 허구가 결합되는 이런 방식은 처음에는 주로 소설 쓰기의 한 기법으로 사용되었는데 이제는 영화, 드라마 등 대중문화계 전체로 확산되어 큰 인기를 끌고 있다. [[marker:m2|㉡]] 그런데 한편에서는 역사적 사실에 허구를 덧붙이는 것에 대해 우려를 표시하고 있다. [[marker:m3|㉢]] 상상력으로 표현된 허구를 실제 역사라고 믿을 수 있기 때문이다. [[marker:m4|㉣]]',
      '딱딱한 역사를 허구가 더해진 이야기로 풀어내 쉽고 재미있게 대중들에게 다가갈 수 있었던 것이다.',
    ),
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '2',
    explanation:
      '대중적 인기의 이유를 설명한 뒤 ‘그런데 한편에서는’으로 우려로 전환합니다.',
    clue: '보기는 ‘큰 인기를 끌고 있다’는 말의 이유를 설명합니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
  }),
  question({
    number: 42,
    groupCode: 'reading-42-43',
    type: TopikQuestionType.AUTHOR_EMOTION,
    prompt: '밑줄 친 부분에 나타난 아버지의 심정으로 알맞은 것을 고르십시오.',
    choices: ['서운하다', '억울하다', '조급하다', '괘씸하다'],
    answer: '1',
    explanation:
      '아들이 오지 못할 것 같다고 하자 아버지 목소리에서 힘이 빠져 서운한 마음이 드러납니다.',
    clue: '‘아버지 목소리에서 힘이 빠졌다’고 합니다.',
    clueTargetKeys: ['emotion'],
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 43,
    groupCode: 'reading-42-43',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '이 글의 내용과 같은 것을 고르십시오.',
    choices: [
      '눈이 많이 오자 아버지는 내가 걱정돼서 전화를 하셨다.',
      '나는 오늘 일이 많아서 시골집에 가는 것이 망설여진다.',
      '나는 지난 가을 시골집에 갔을 때 낙천 아저씨를 만났다.',
      '낙천 아저씨가 돌아가셨다는 소식에 나는 몸에 힘이 빠졌다.',
    ],
    answer: '2',
    explanation:
      '화자는 일정이 많아 아버지의 물음에 바로 간다고 답하지 못합니다.',
    clue: '점심과 회의, 기자 간담회, 인터뷰 약속을 머릿속으로 확인합니다.',
  }),
  question({
    number: 44,
    groupCode: 'reading-44-45',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '이 글의 주제로 알맞은 것을 고르십시오.',
    choices: [
      '추상 활동은 관찰을 바탕으로 대상을 이해하는 것이다.',
      '추상 활동은 외관의 세부적 기술에서 시작되는 것이다.',
      '추상 활동의 단계는 추상화의 창작 과정에 잘 나타난다.',
      '추상 활동의 결과에는 대상의 새로운 측면이 드러난다.',
    ],
    answer: '1',
    explanation:
      '피카소가 황소의 모습을 관찰하고 특징을 추려 본질을 나타낸 과정을 설명합니다.',
    clue: '‘실체를 토대로’ 하여 ‘황소다움의 본질’을 보여 줍니다.',
  }),
  question({
    number: 45,
    groupCode: 'reading-44-45',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    choices: [
      '본질의 왜곡을 통해',
      '실체의 강조를 통해',
      '형태적 단순화를 통해',
      '사실적 묘사법을 통해',
    ],
    answer: '3',
    explanation:
      '몸의 요소를 대부분 없애고 몇 개의 선과 머리의 특징만 남긴 형태적 단순화입니다.',
    clue: '‘몸을 이루는 요소들을 대부분 제거’했다고 합니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 46,
    groupCode: 'reading-46-47',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt: '위 글에서 <보기>의 글이 들어가기에 가장 알맞은 것을 고르십시오.',
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '3',
    explanation:
      '드론 활용의 밝은 전망을 설명한 뒤 과거의 좌절을 언급하고, ‘그러나’로 이번 투자를 대비합니다.',
    clue: '‘이런 밝은 전망과 달리’는 앞의 활용 가능성을, 뒤의 ‘그러나’는 투자 결정을 연결합니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
  }),
  question({
    number: 47,
    groupCode: 'reading-46-47',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '위 글의 내용과 같은 것을 고르십시오.',
    choices: [
      '드론 활용 및 악용 방지 기술에 대한 투자가 병행되고 있다.',
      '드론의 안전성 검증에 대한 필요성이 꾸준히 제기되어 왔다.',
      '정부의 투자 결정으로 드론의 대중화를 둘러싼 논란이 잠잠해졌다.',
      '정부가 드론 기술에 관심을 보임에 따라 드론 산업이 가속화되었다.',
    ],
    answer: '2',
    explanation:
      '드론 사용의 위험성에 대한 문제가 계속 제기되어 산업이 여러 번 좌절을 겪었다고 합니다.',
    clue: '‘드론 사용의 위험성에 대한 문제 제기로 인해 그동안 번번이 좌절’을 겪었습니다.',
  }),
  question({
    number: 48,
    groupCode: 'reading-48-50',
    type: TopikQuestionType.AUTHOR_PURPOSE,
    prompt: '위 글을 쓴 목적으로 알맞은 것을 고르십시오.',
    choices: [
      '실리콘밸리의 주요 성장 동력을 분석하려고',
      '기업의 역량적 활동을 지원하는 방안을 제시하려고',
      '첨단과학 중심으로 조직된 기업 단지를 소개하려고',
      '여건에 맞는 경제 환경 조성의 중요성을 제기하려고',
    ],
    answer: '4',
    explanation:
      '지역 특성에 맞는 창의적 기업 활동 지원책을 마련해야 한다고 주장합니다.',
    clue: '‘여러 도시에서도 각자의 여건에 맞추어 ... 지원책을 마련할 필요’가 있습니다.',
  }),
  question({
    number: 49,
    groupCode: 'reading-48-50',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 알맞은 것을 고르십시오.',
    choices: [
      '문화가 창출될 수 있는',
      '실패가 용납될 수 있는',
      '자본력이 형성될 수 있는',
      '창의성이 발휘될 수 있는',
    ],
    answer: '4',
    explanation:
      '실리콘밸리는 젊은 인재들이 아이디어를 펼쳐 창의성을 발휘하기에 좋은 환경입니다.',
    clue: '첫 문장의 ‘아이디어 하나’와 ‘창의적 기술 혁신’이 연결됩니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 50,
    groupCode: 'reading-48-50',
    type: TopikQuestionType.AUTHOR_ATTITUDE,
    prompt: '밑줄 친 부분에 나타난 필자의 태도로 알맞은 것을 고르십시오.',
    choices: [
      '경제 활성화를 위한 다양한 시도의 긍정적 측면을 인정하고 있다.',
      '경제 성장의 성공 사례가 활발히 도입되는 현상을 경계하고 있다.',
      '경제의 성공 방식을 해외에서 찾으려는 노력에 대해 감탄하고 있다.',
      '경제의 성공 요인을 다르게 파악하려는 자세에 대해 비판하고 있다.',
    ],
    answer: '1',
    explanation:
      '실리콘밸리 모델을 한국 도시별로 적용하는 움직임이 ‘고무적’이라고 긍정합니다.',
    clue: '‘활발히 이루어지고 있어 고무적이다’라는 평가입니다.',
    clueTargetKeys: ['attitude'],
  }),
];
