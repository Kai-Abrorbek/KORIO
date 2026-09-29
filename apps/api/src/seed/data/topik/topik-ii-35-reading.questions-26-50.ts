import {
  TopikChoiceLayout,
  TopikQuestionType,
  TopikVisualTemplate,
} from '../../../topik/schemas/topik-content.schema';
import { headline, insertionPassage, passage } from './topik-seed.helpers';
import { TopikSeedQuestion } from './topik-seed.types';
import { topikII35ReadingQuestion as question } from './topik-ii-35-reading.question';

export const TOPIK_II_35_READING_QUESTIONS_26_50: TopikSeedQuestion[] = [
  question({
    number: 26,
    groupCode: 'reading-25-27',
    type: TopikQuestionType.HEADLINE_INTERPRETATION,
    prompt: '다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.',
    stimulus: headline('독특한 모양의 간판, 지나가는 사람들의 시선 끌어'),
    choices: [
      '색다른 모양의 간판이 사람들의 눈길을 사로잡고 있다.',
      '간판의 모양을 통일시켜야 사람들이 한눈에 볼 수 있다.',
      '눈에 띄는 간판을 만들기 위해 사람들이 노력하고 있다.',
      '지나치게 큰 간판은 지나다니는 사람들에게 방해가 된다.',
    ],
    answer: '1',
    explanation:
      '독특한 모양의 간판이 지나가는 사람들의 관심을 끈다는 제목입니다.',
    clue: '‘시선 끌어’는 ‘눈길을 사로잡고 있다’와 같습니다.',
    template: TopikVisualTemplate.EXAM_HEADLINE,
  }),
  question({
    number: 27,
    groupCode: 'reading-25-27',
    type: TopikQuestionType.HEADLINE_INTERPRETATION,
    prompt: '다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.',
    stimulus: headline(
      '취업률 석 달째 제자리걸음, 정부의 현실적인 대책 필요해',
    ),
    choices: [
      '정부의 새 대책으로 취업률이 올라가게 될 것이다.',
      '정부의 대책으로 취업률이 더 이상 떨어지지 않았다.',
      '취업률의 변화가 심하여 정부가 대책을 마련하고 있다.',
      '취업률을 높일 수 있는 정부의 실현 가능한 대책이 요구된다.',
    ],
    answer: '4',
    explanation:
      '취업률이 세 달째 나아지지 않아 효과 있는 정부 대책이 필요하다는 뜻입니다.',
    clue: '‘제자리걸음’과 ‘현실적인 대책 필요’가 핵심입니다.',
    template: TopikVisualTemplate.EXAM_HEADLINE,
  }),
  question({
    number: 28,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '새를 상자 안에 넣으면 자꾸 밖으로 나오려고 한다. 그러나 반대로 자유로운 공간에서는 안정을 찾고 도망치려고 애쓰지 않는다. 아이도 이와 마찬가지다. 부모들이 [[blank:q28]] 하면 아이는 이를 구속이라 생각하고 반발심을 가진다. 그러나 일어나는 시간, 방과 후 할 일 등 생활 규칙을 아이와 의논하여 정하게 되면 부모가 시키지 않아도 스스로 책임감을 가지고 잘 지키려고 노력한다.',
    ),
    choices: [
      '방과 후에 공부를 시키려고',
      '친구와의 관계에 관여하려고',
      '규칙을 정하고 그대로 따르게',
      '집에서 동물을 키우지 못하게',
    ],
    answer: '3',
    explanation:
      '부모가 일방적으로 규칙을 정해 따르게 하면 아이가 구속으로 느낀다는 대조입니다.',
    clue: '뒤에서는 아이와 의논하여 규칙을 정할 때 스스로 지킨다고 합니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 29,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '사람들은 문화생활을 위한 시간을 따로 내기가 어렵다고들 한다. 최근 이런 사람들을 위해 [[blank:q29]] 새로운 문화 콘텐츠들이 등장하고 있다. 그중 하나가 웹 소설인데 이것은 5분 이내에 읽을 수 있는 짧은 분량의 인터넷 소설을 말한다. 이 소설은 컴퓨터 화면에서 읽어도 눈이 피로하지 않도록 줄 간격이 넓게 편집되어 있다. 그리고 소설의 내용을 쉽게 이해할 수 있도록 등장인물의 수를 제한하는 것도 특징이다.',
    ),
    choices: [
      '재미있는 내용으로 관심을 끄는',
      '현대의 사람들을 등장인물로 하는',
      '유행했던 기존의 소설을 각색해서 만든',
      '짧은 시간 동안 부담 없이 즐길 수 있는',
    ],
    answer: '4',
    explanation:
      '시간이 부족한 사람을 위해 5분 안에 읽는 웹 소설 같은 콘텐츠가 등장했습니다.',
    clue: '첫 문장의 시간 부족과 뒤의 ‘5분 이내’가 연결됩니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 30,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '조선 시대에는 큰 명절이나 나라에 축하할 일이 생겼을 때 궁중에서 잔치를 열었다. 보통 잔치를 할 때에는 맛있고 귀한 음식을 가득 차려 놓고 성대하게 행사를 치렀다. 그러나 이 음식들은 잔치에 참석한 왕과 높은 지위의 일부 사람들만을 위한 것은 아니었다. 잔치가 끝난 뒤 가난한 백성들에게 나누어 주기 위해 일부러 많은 음식을 준비했던 것이다. 잔치를 통해 [[blank:q30]] 의도에서였다.',
    ),
    choices: [
      '왕의 능력을 과시하려는',
      '궁중의 풍습을 널리 알리려는',
      '높은 지위의 사람을 대접하려는',
      '나라의 기쁨을 백성들과 나누려는',
    ],
    answer: '4',
    explanation:
      '잔치 음식 일부를 가난한 백성에게 나누어 준 것은 나라의 기쁨을 함께 나누려는 뜻입니다.',
    clue: '‘가난한 백성들에게 나누어 주기 위해’가 직접적인 근거입니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 31,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '최근에는 미술 작품을 과학적 연구의 참고 자료로 활용하고 있다. 그중 하나가 풍경화에 사용된 색을 연구하여 그 시대의 대기 상태를 알아보는 것이다. 일반적으로 공기 중에 먼지가 많으면 해가 질 때 하늘은 더 붉게 보인다고 한다. 그런데 산업화가 진행된 20세기 말 그림 속에 표현된 하늘이 다른 시대의 그림보다 더 붉다. 우리는 그 그림을 통해 20세기 말에 [[blank:q31]] 사실을 확인할 수 있다.',
    ),
    choices: [
      '산업화로 인해 하늘이 오염되었다는',
      '대기 상태에 대한 연구가 이루어졌다는',
      '화가들이 그림에 다양한 색을 사용했다는',
      '풍경화를 그리는 화가들이 활발히 활동했다는',
    ],
    answer: '1',
    explanation:
      '산업화 시기 그림의 하늘이 더 붉다는 것은 먼지가 많아 대기가 오염되었음을 보여 줍니다.',
    clue: '공기 중 먼지가 많을수록 해 질 때 하늘이 붉게 보인다고 합니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 32,
    groupCode: 'reading-32-34',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음을 읽고 내용이 같은 것을 고르십시오.',
    stimulus: passage(
      '항공사들은 비행기 안에서 먹는 기내식의 맛을 살리기 위해 많은 노력을 한다. 먼저 건조한 기내 환경을 고려하여 음식의 수분이 날아가지 않도록 포장에 신경을 쓴다. 또한 고도가 높아졌을 때 사람들의 미각이 둔해지는 것에 대비해서 일부러 음식을 조금 짜게 만든다. 또 기내식은 미리 조리하여 냉동한 후 비행기에 싣기 때문에 손님들에게 내놓기 직전에 다시 따뜻하게 데운다.',
    ),
    choices: [
      '기내가 건조해서 사람들의 입맛이 예민해진다.',
      '기내식은 좀 더 짜게 만들어야 맛을 낼 수 있다.',
      '음식 온도를 유지하기 위해 기내식을 포장해 놓는다.',
      '음식에 있는 수분을 줄여 기내식이 상하는 것을 방지한다.',
    ],
    answer: '2',
    explanation:
      '고도가 높으면 미각이 둔해져 기내식을 일부러 조금 더 짜게 만듭니다.',
    clue: '‘미각이 둔해지는 것에 대비해서’ 음식을 조금 짜게 만든다고 했습니다.',
  }),
  question({
    number: 33,
    groupCode: 'reading-32-34',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음을 읽고 내용이 같은 것을 고르십시오.',
    stimulus: passage(
      '요즘 도시에 벌의 수가 증가하여 이로 인한 피해가 종종 발생하고 있다. 한 연구팀은 도시가 벌이 살기에 적합한 환경이 된 것이 원인이라고 밝혔다. 도시 환경이 벌의 생존에 도움이 된다는 것이다. 도시의 공원에서 다양한 꽃과 식물이 자라고 있어 풍부한 먹이를 제공한다고 한다. 농촌에 비해 도시가 상대적으로 농약 사용이 적어 안전하다는 것도 도시에 벌이 많아진 또 하나의 이유라고 한다.',
    ),
    choices: [
      '예전에 비해 도시에 사는 벌의 수가 줄었다.',
      '벌을 쫓기 위해 도시의 식물에 약을 뿌리고 있다.',
      '도시의 벌 피해 방지법에 대한 연구가 진행 중이다.',
      '도시의 공원이 벌이 살 수 있는 좋은 환경을 제공한다.',
    ],
    answer: '4',
    explanation:
      '도시 공원에는 꽃과 식물이 많아 벌에게 먹이를 제공한다고 했습니다.',
    clue: '공원의 다양한 꽃과 식물이 풍부한 먹이를 제공합니다.',
  }),
  question({
    number: 34,
    groupCode: 'reading-32-34',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음을 읽고 내용이 같은 것을 고르십시오.',
    stimulus: passage(
      '정부에서 ‘휴가 하루 더 가기’ 캠페인을 벌이고 있다. 국내 관광의 활성화를 목적으로 기업들과 근로자의 참여를 유도하겠다는 것이다. 국민들의 국내 휴가 일수가 하루 증가하면 소비가 2조 5천 억 원이 늘어 경제가 활성화된다. 또 관광업계에 5만 개 이상의 일자리가 생길 것으로 예상된다. 집중력이 떨어질 수 있는 더운 여름철, 근로자들의 사기를 높이는 데에도 도움이 될 것으로 보인다.',
    ),
    choices: [
      '휴가 기간이 늘어나면 경제에 악영향을 끼친다.',
      '국내 관광업과 관련된 일자리는 5만 개 정도이다.',
      '관광업계에서 이 캠페인을 기획하여 진행하고 있다.',
      '이 캠페인은 국내 관광을 활성화하기 위해 시작되었다.',
    ],
    answer: '4',
    explanation: '정부 캠페인의 목적은 국내 관광 활성화라고 직접 밝혔습니다.',
    clue: '‘국내 관광의 활성화를 목적으로’라는 표현입니다.',
  }),
  question({
    number: 35,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '미혼이라는 말에는 결혼은 꼭 해야 하는 것이지만 아직 하지 않았다는 뜻이 포함되어 있다. 그러나 결혼은 필수가 아니라 선택이라고 생각하는 사람들이 증가함에 따라 미혼이라는 말 대신에 결혼을 선택하지 않는다는 의미의 비혼이라는 단어가 사용되기 시작하였다. 미혼, 독신 등의 단어들이 비혼이라는 단어에 자리를 내주게 된 것이다.',
    ),
    choices: [
      '미혼이라는 말은 결혼에 대한 다양한 의미를 포괄한다.',
      '비혼이라는 말은 결혼에 대한 인식의 변화를 보여 준다.',
      '비혼과 미혼은 같은 대상을 가리키므로 의미의 차이는 없다.',
      '미혼이라는 말은 결혼을 계획하는 사람들에게 부적절한 표현이다.',
    ],
    answer: '2',
    explanation:
      '결혼을 필수가 아닌 선택으로 보는 인식이 비혼이라는 새 표현에 반영되었습니다.',
    clue: '‘결혼은 필수가 아니라 선택’이라는 생각이 늘었다고 합니다.',
  }),
  question({
    number: 36,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '패션도 비즈니스의 일부이다. 비즈니스를 목적으로 누군가를 만나야 한다면 비즈니스 상황에 따라 입고 나갈 옷의 색상, 디자인, 소재 등을 고려하여 전략적으로 이미지를 연출하는 것이 중요하다. 강한 의지를 표명해야 한다면 빳빳한 소재의 무채색 옷을 선택하는 것이 바람직하다. 반면에 상대 회사와 협상을 해야 한다면 광택이 있는 부드러운 소재의 복장을 통해 편안한 분위기를 연출하는 것이 좋다. 상대 회사를 상징하는 색상의 셔츠나 넥타이로 친근감을 표현할 수도 있다.',
    ),
    choices: [
      '회사의 이미지를 비즈니스 패션을 통해 연출하라.',
      '비즈니스 상황에 부합하는 패션 전략을 활용하라.',
      '회사를 상징하는 색상으로 편안한 분위기를 조성하라.',
      '부드러운 이미지 연출을 위한 비즈니스 전략을 세워라.',
    ],
    answer: '2',
    explanation:
      '상황에 맞춰 옷의 색상과 소재를 달리하는 패션 전략을 권합니다.',
    clue: '‘비즈니스 상황에 따라’ 이미지를 전략적으로 연출하라고 했습니다.',
  }),
  question({
    number: 37,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '육체적․정신적 피로로 인해 무기력한 상태가 지속된다면 소진증후군을 의심해 보아야 한다. 이 증후군의 대표적인 증상으로는 심한 불안감, 무기력, 삶에 대한 무관심 등을 들 수 있다. 일단 소진증후군을 앓게 되면 회복이 힘들다는 점을 고려할 때 휴식과 재충전을 통해 심신의 건강을 유지하려는 자세가 요구된다. 평소 작은 일에 기뻐하고 행복해 함으로써 삶의 활력을 유지하는 것도 이 증후군을 예방하는 데 도움이 된다.',
    ),
    choices: [
      '소진증후군이 사회에 미치는 영향을 분석해야 한다.',
      '소진증후군의 원인과 증상의 관계를 파악해야 한다.',
      '소진증후군의 증상에 맞는 치료법을 개발해야 한다.',
      '소진증후군이 발생하지 않도록 사전에 노력해야 한다.',
    ],
    answer: '4',
    explanation:
      '회복이 어려운 소진증후군을 휴식과 재충전 등으로 미리 예방하자는 내용입니다.',
    clue: '‘이 증후군을 예방하는 데 도움이 된다’로 마무리합니다.',
  }),
  question({
    number: 38,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '그동안 로봇이 주로 인간의 육체노동만을 대체해 왔다면 앞으로는 지식 노동까지도 대체하게 될 것이다. 이러한 로봇의 등장으로 사람들은 일자리를 잃게 될지도 모른다는 생각을 할 수도 있다. 그러나 남는 노동 자원을 로봇이 대체할 수 없는 일에 활용할 수 있다는 긍정적인 면도 있다. 예를 들어 기업의 실적이나 스포츠 경기의 결과에 대한 데이터 수집이나 분석과 같은 단순 업무는 ‘로봇기자’가 담당하고 기자들은 심층 분석이나 인터뷰와 같은 깊이 있는 기사 작성에 더 집중할 수 있게 될 것이다.',
    ),
    choices: [
      '로봇의 등장으로 인간의 지식 노동 시간이 감소하게 될 것이다.',
      '로봇의 등장으로 인간은 육체노동의 시간을 줄일 수 있을 것이다.',
      '로봇의 등장으로 인간의 노동력 시장 규모가 점점 축소될 것이다.',
      '로봇의 등장으로 인간은 질적인 업무에 집중할 수 있게 될 것이다.',
    ],
    answer: '4',
    explanation:
      '로봇이 단순 업무를 맡으면 인간은 더 깊이 있는 질적인 업무에 집중할 수 있습니다.',
    clue: '‘긍정적인 면’과 기자의 ‘심층 분석이나 인터뷰’가 핵심입니다.',
  }),
  question({
    number: 39,
    groupCode: 'reading-39-41',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt: '<보기>의 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    stimulus: insertionPassage(
      '운전 시 안전과 직결되는 것 중의 하나가 바로 차선이다. [[marker:m1|㉠]] 야간 운전 중에 차선이 잘 보이지 않으면 크고 작은 사고들이 발생하게 될 것이다. [[marker:m2|㉡]] 반사 성능을 더욱 강화하고자 할 때에는 유리알이 혼합된 페인트를 사용할 수 있다. [[marker:m3|㉢]] 이렇게 하면 유리알이 불빛에 반사되어 차선이 더욱 잘 보이게 된다. [[marker:m4|㉣]]',
      '이를 방지하기 위해 야간에 차선이 잘 보이도록 반사 기능이 있는 특수한 페인트를 사용한다.',
    ),
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '2',
    explanation:
      '차선이 보이지 않아 사고가 나는 문제를 말한 직후, 이를 막는 반사 페인트를 소개해야 합니다.',
    clue: '‘이를 방지하기 위해’는 앞의 야간 사고를 받습니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 40,
    groupCode: 'reading-39-41',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt: '<보기>의 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    stimulus: insertionPassage(
      '부자들을 대상으로 사업체 상속 계획에 대해 조사한 결과 부의 축적 유형에 따라 차이를 보였다. [[marker:m1|㉠]] 상속형 부자의 경우 절반 정도가 사업체를 자녀에게 물려주겠다고 응답했다. [[marker:m2|㉡]] 반면 자수성가형 부자는 자녀 상속 의향이 20% 정도에 지나지 않았다. [[marker:m3|㉢]] 상속형 부자는 자녀에게 기회를 주기 위해 물려준다고 응답한 반면 자수성가형 부자는 기술 및 비법 등을 전수하기 위해서 물려준다고 답했다. [[marker:m4|㉣]]',
      '자녀에게 사업체를 물려주려는 이유에서도 두 집단이 차이를 보였다.',
    ),
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '3',
    explanation:
      '상속 의향의 차이를 설명한 뒤 상속 이유도 다르다고 전환해야 하므로 ㉢이 알맞습니다.',
    clue: '‘이유에서도’는 앞의 비율 차이에서 이유 차이로 주제를 넘깁니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 41,
    groupCode: 'reading-39-41',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt: '<보기>의 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    stimulus: insertionPassage(
      '지난 10년간 ‘한국형 리더십’에 남다른 관심을 쏟아 온 박선호 박사는 『세종에게서 배우다』라는 신간을 내놓았다. [[marker:m1|㉠]] 『세종에게서 배우다』는 세종의 리더십을 배워 잘 활용할 수 있도록 돕는 일종의 경영서이다. [[marker:m2|㉡]] 세종은 여러 분야에서 리더로서의 면모를 보여 주었다. 만일 그에게 탁월한 리더십이 없었더라면 한글 창제와 같은 업적은 불가능했을지도 모른다. [[marker:m3|㉢]] 신분이나 지역을 따지지 않고 오직 개인의 역량만을 기준으로 사람을 뽑아 썼다. [[marker:m4|㉣]]',
      '세종의 남다른 리더십은 인재의 등용에서도 잘 나타난다.',
    ),
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '3',
    explanation:
      '세종의 여러 리더십을 설명한 뒤 인재 등용의 구체적인 예를 들기 직전인 ㉢이 알맞습니다.',
    clue: '뒤의 ‘신분이나 지역을 따지지 않고’가 인재 등용의 예입니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 42,
    groupCode: 'reading-42-43',
    type: TopikQuestionType.AUTHOR_EMOTION,
    prompt: '밑줄 친 부분에 나타난 사람들의 태도로 알맞은 것을 고르십시오.',
    choices: [
      '격려하고 있다',
      '위로하고 있다',
      '안도하고 있다',
      '원망하고 있다',
    ],
    answer: '1',
    explanation:
      '사람들은 숫자를 함께 세어 아이가 다이빙할 용기를 내도록 격려합니다.',
    clue: '수영장의 모든 사람이 큰 소리로 숫자를 따라 셌습니다.',
    clueTargetKeys: ['emotion'],
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 43,
    groupCode: 'reading-42-43',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '이 글의 내용과 같은 것을 고르십시오.',
    choices: [
      '아이가 올라간 다이빙대는 어린이 전용으로 만들어졌다.',
      '아이가 뛰어내려 물속으로 들어가자 사람들이 박수를 쳤다.',
      '방송을 통해 아이의 부모가 아이에게 내려오라고 소리쳤다.',
      '아이의 부모는 관리자에게 아이를 데려와 달라고 부탁했다.',
    ],
    answer: '2',
    explanation: '아이가 물에 뛰어든 뒤 박수 소리가 수영장에 울렸습니다.',
    clue: '‘풍덩’ 소리 뒤에 ‘박수 소리가 수영장을 울렸다’고 했습니다.',
  }),
  question({
    number: 44,
    groupCode: 'reading-44-45',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '이 글의 주제로 알맞은 것을 고르십시오.',
    choices: [
      '기업이 동의하지 않는 제도의 시행은 지양해야 한다.',
      '배출권 할당은 기업의 사정에 따라 조정되어야 한다.',
      '배출권 할당은 의도적인 거래를 염두에 두어야 한다.',
      '현실성을 고려한 환경 보호 대책이 마련되어야 한다.',
    ],
    answer: '2',
    explanation:
      '기업의 성장률을 고려하지 않는 획일적인 배출권 할당 방식이 문제라고 지적합니다.',
    clue: '‘기업의 성장률을 고려하지 않고 할당량을 정하는 방식’이 핵심 문제입니다.',
  }),
  question({
    number: 45,
    groupCode: 'reading-44-45',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 알맞은 것을 고르십시오.',
    choices: [
      '배출량이 할당된 양에 못 미친',
      '온실가스 총량을 신고하지 않은',
      '매출이 늘어 공장 가동률이 높아진',
      '경영진의 배출량 감소 의지가 강한',
    ],
    answer: '3',
    explanation:
      '매출이 늘어 공장을 많이 돌리는 기업은 기준량을 넘어 배출권을 사야 한다는 대조입니다.',
    clue: '반대쪽 사례는 경영 악화로 공장을 가동하지 않는 기업입니다.',
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
      '긍정적 시너지에 대한 주장 뒤에, 두 기업의 강점을 합친 것 이상의 성과라는 조건을 설명합니다.',
    clue: '‘이는’은 바로 앞의 ‘최상의 시너지 효과’를 가리킵니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 47,
    groupCode: 'reading-46-47',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '이 글의 내용과 같은 것을 고르십시오.',
    choices: [
      '양 기업의 합병은 코코의 경영 부진에 의한 것이다.',
      '양 기업의 규모는 동종 업계에서 우열을 가리기 어렵다.',
      '코코는 그동안 신속한 업무 처리로 재계의 인정을 받아 왔다.',
      '둠과 코코의 합병에 대한 예측들은 긍정적이라는 공통점이 있다.',
    ],
    answer: '3',
    explanation:
      '코코는 소규모 기업이어서 시장 상황에 발 빠르게 대처하는 것이 강점이었다고 했습니다.',
    clue: '마지막 문장의 ‘시장 상황에 발 빠르게 대처한다는 게 강점’입니다.',
  }),
  question({
    number: 48,
    groupCode: 'reading-48-50',
    type: TopikQuestionType.AUTHOR_PURPOSE,
    prompt: '필자가 이 글을 쓴 목적을 고르십시오.',
    choices: [
      '법 제정의 공론화를 촉구하기 위해',
      '법 제정의 반대 근거를 제시하기 위해',
      '법 시행의 피해 사례를 알려 주기 위해',
      '법 시행의 적절한 시기를 제안하기 위해',
    ],
    answer: '2',
    explanation:
      '개인 정보 삭제법에 무조건 찬성하는 태도를 경계하며 부작용을 근거로 반대합니다.',
    clue: '‘부정적 측면을 고려하지 않은 성급한 동조’라고 비판합니다.',
  }),
  question({
    number: 49,
    groupCode: 'reading-48-50',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 알맞은 것을 고르십시오.',
    choices: [
      '공공의 피해를 유발하는',
      '국민의 자유를 침해하는',
      '소통의 단절을 조장하는',
      '사회의 통합을 저해하는',
    ],
    answer: '1',
    explanation:
      '개인의 권리를 존중한다는 이유로 사회 전체에 피해를 주는 장치가 되어서는 안 된다는 뜻입니다.',
    clue: '범죄 정보나 비리를 삭제했을 때 사회와 국가에 불행이 생길 수 있다고 합니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 50,
    groupCode: 'reading-48-50',
    type: TopikQuestionType.AUTHOR_ATTITUDE,
    prompt: '밑줄 친 부분에 나타난 필자의 태도로 알맞은 것을 고르십시오.',
    choices: [
      '이 법으로 피해를 입은 사람들을 동정하고 있다.',
      '이 법의 제정 단계에서의 문제점을 지적하고 있다.',
      '이 법이 실패했던 해외 사례에 대해 비판하고 있다.',
      '이 법의 시행이 가져올 부작용에 대해 염려하고 있다.',
    ],
    answer: '4',
    explanation:
      '법 시행이 개인과 사회, 국가에 불행을 가져올 수 있음을 걱정하는 태도입니다.',
    clue: '‘불행으로 이어지지 않는다고 누가 자신할 수 있겠는가?’라는 반문입니다.',
    clueTargetKeys: ['attitude'],
  }),
];
