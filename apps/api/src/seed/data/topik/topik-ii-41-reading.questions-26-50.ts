import {
  TopikChoiceLayout,
  TopikQuestionType,
  TopikVisualTemplate,
} from '../../../topik/schemas/topik-content.schema';
import { headline, insertionPassage, passage } from './topik-seed.helpers';
import { TopikSeedQuestion } from './topik-seed.types';
import { topikII41ReadingQuestion as question } from './topik-ii-41-reading.question';

export const TOPIK_II_41_READING_QUESTIONS_26_50: TopikSeedQuestion[] = [
  question({
    number: 26,
    groupCode: 'reading-25-27',
    type: TopikQuestionType.HEADLINE_INTERPRETATION,
    prompt: '다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.',
    stimulus: headline('불황에도 포도주 소비 ‘껑충’, 불붙은 판매 경쟁'),
    choices: [
      '불황에도 업체 간 경쟁 때문에 포도주의 소비가 늘었다.',
      '불황에도 포도주 판매 감소 때문에 포도주의 소비가 줄었다.',
      '불황에도 과도한 판매 경쟁 때문에 포도주의 공급이 증가했다.',
      '불황에도 포도주 소비 증가 때문에 포도주의 판매 경쟁이 심해졌다.',
    ],
    answer: '4',
    explanation:
      '불황에도 포도주 소비가 증가했고 이에 판매 경쟁이 심해졌습니다.',
    clue: '‘소비 껑충’과 ‘판매 경쟁’이 원인과 결과로 이어집니다.',
    template: TopikVisualTemplate.EXAM_HEADLINE,
  }),
  question({
    number: 27,
    groupCode: 'reading-25-27',
    type: TopikQuestionType.HEADLINE_INTERPRETATION,
    prompt: '다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.',
    stimulus: headline(
      '마을 어르신들이 ‘지킴이’ 역할 톡톡히, 주민 얼굴에 웃음 가득',
    ),
    choices: [
      '노인들은 마을 주민들의 도움에 만족해하고 있다.',
      '노인들은 마을 주민들의 도움으로 즐겁게 일하고 있다.',
      '주민들은 안전을 위해 애쓰는 마을 노인들 덕에 기분이 좋다.',
      '주민들은 일을 잘하려고 노력하는 노인들에게 감사해하고 있다.',
    ],
    answer: '3',
    explanation:
      '어르신들이 마을 지킴이 역할을 잘해서 주민들이 기뻐한다는 뜻입니다.',
    clue: '‘지킴이 역할 톡톡히’와 ‘주민 얼굴에 웃음’의 연결입니다.',
    template: TopikVisualTemplate.EXAM_HEADLINE,
  }),
  question({
    number: 28,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '동화는 어린이가 읽는 책이라는 인식이 지배적이었다. 그러나 요즘은 동화를 통해 [[blank:q28]] 어른들이 늘고 있다. 동화 속 이야기는 지난 기억과 소중한 것들을 다시 일깨워 어른들을 동심의 세계로 인도한다. 이는 나이가 많든 적든 가난하든 부유하든 누구나 공감할 수 있는 이야기가 동화 속에 존재하기 때문에 가능하다.',
    ),
    choices: [
      '아이들을 교육하려는',
      '어린 시절을 되돌아보려는',
      '가족 사랑을 확인해 보려는',
      '아이를 위한 글을 써 보려는',
    ],
    answer: '2',
    explanation:
      '동화가 어른에게 지난 기억을 떠올리고 동심을 되찾게 한다는 뜻입니다.',
    clue: '‘지난 기억’과 ‘동심의 세계’가 빈칸을 설명합니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 29,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '훌륭한 예술가는 작품 활동을 하다가 벽에 부딪히면 돌파구를 찾아낸다. 화가들에게 [[blank:q29]]은 ‘독’이라기보다 ‘약’이었다. 손이 떨려 그릴 수 없었던 한 화가는 종이를 잘라 물감을 칠해 붙이는 방법으로 새로운 작품 세계를 열었다. 또 가난해서 그림 재료를 살 수 없었던 어떤 화가는 담배 포장지에 스케치를 했다. 이런 예술 작품을 통해 자신만의 예술 세계를 구축하였다.',
    ),
    choices: [
      '재료의 부족과 호기심',
      '경제적 빈곤과 예술성',
      '신체적 장애와 열악한 환경',
      '예술적 한계와 정신적 고통',
    ],
    answer: '3',
    explanation:
      '손 떨림이라는 신체적 장애와 가난으로 인한 열악한 환경이 새 창작 방법의 계기가 됐습니다.',
    clue: '‘손이 떨려 그릴 수 없었던’ 화가와 ‘가난해서 그림 재료를 살 수 없었던’ 화가입니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 30,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '지우개는 다른 문구류와 오래 닿으면 그것에 달라붙는 성질이 있다. 지우개를 만들 때 넣는 특수한 물질 때문이다. 지우개의 재료인 고무에 약품을 넣으면 고무 분자들이 결합하게 된다. 그런데 고무에 넣은 약품은 플라스틱에 들어가면 [[blank:q30]] 한다. 이 때문에 지우개와 플라스틱 문구류를 함께 두면 잘 붙는다.',
    ),
    choices: [
      '고무를 달라붙게',
      '고무를 딱딱하게',
      '문구류와 붙지 않게',
      '문구류에 닿지 않게',
    ],
    answer: '1',
    explanation:
      '약품이 플라스틱에 들어가면 지우개의 고무를 달라붙게 만듭니다.',
    clue: '‘지우개와 플라스틱 문구류를 함께 두면 잘 붙는다’는 결론입니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 31,
    groupCode: 'reading-28-31',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '힙합은 자아도취적인 형식으로 나타나기도 하고 집단적 형태를 취하기도 한다. 힙합은 함께 노래를 부르고 춤을 추는 사이에 개인의 아픔도 서로 격려하고 위로하는 [[blank:q31]] 나타난다. 희망을 꿈꾼다는 것이 사치였던 사람들에게 힙합은 서로의 생각을 주고받는 몸짓이며 외침이다. 그들에게 힙합은 자신의 존재 가치를 확인하게 해 주는 의식과도 같다.',
    ),
    choices: [
      '형식적 몸짓으로',
      '집단적 의식으로',
      '다양한 모습으로',
      '발전적인 미래로',
    ],
    answer: '2',
    explanation: '함께 노래하고 춤추며 서로를 격려하는 집단적인 의식입니다.',
    clue: '첫 문장의 ‘집단적 형태’와 마지막의 ‘의식’이 연결됩니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 32,
    groupCode: 'reading-32-34',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음을 읽고 내용이 같은 것을 고르십시오.',
    stimulus: passage(
      '보자기는 물건을 싸는 실용적인 용도로 사용된다. 그중에서 쓰고 남은 천 조각으로 만든 것을 조각보라고 한다. 이 조각보를 만들 때는 쓰는 사람이 복을 받기를 바라는 마음으로 바느질을 한다. 이러한 조각보가 오늘날에는 예술적으로도 인정을 받고 있다. 색도, 모양도, 크기도 서로 다른 조각들을 이어 만든 조각보에는 자유분방한 아름다움과 조화로움이 살아 있기 때문이다.',
    ),
    choices: [
      '조각보는 실용성보다 예술성이 강조되어 있다.',
      '조각보는 큰 천을 여러 조각으로 잘라서 만들었다.',
      '조각보는 색이 같고 모양이 다른 조각이 이어져 있다.',
      '조각보에는 복을 기원하는 정성스러운 마음이 담겨 있다.',
    ],
    answer: '4',
    explanation:
      '조각보를 만들 때 쓰는 사람의 복을 바라는 마음을 담아 바느질합니다.',
    clue: '‘쓰는 사람이 복을 받기를 바라는 마음으로 바느질’합니다.',
  }),
  question({
    number: 33,
    groupCode: 'reading-32-34',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음을 읽고 내용이 같은 것을 고르십시오.',
    stimulus: passage(
      '조선 시대에는 역사를 기록하는 사관이 있었다. 왕의 주변에서 일어나는 모든 일을 기록하는 사관은 누구의 간섭도 받지 않았다. 심지어 왕이라도 자신과 관련된 기록조차 절대로 볼 수 없었다. 또한 사관은 기록에 자신의 이름을 남기지 않아 정치적으로 어떠한 책임도 지지 않았다. 조선에서 사관의 역할은 왕이 스스로 자신의 언행을 조심하게 하였고 결과적으로 그것은 왕이 권력을 마음대로 쓰지 못하게 하는 장치로서 기능을 하였다.',
    ),
    choices: [
      '역사를 기록하는 책에는 사관의 이름이 적혀 있었다.',
      '왕은 필요할 때 사관의 기록 내용을 찾아볼 수 있었다.',
      '사관의 기록 때문에 왕은 자신의 언행을 조심하게 되었다.',
      '왕은 주변에서 일어나는 모든 일들을 사관에게 보고를 받았다.',
    ],
    answer: '3',
    explanation:
      '사관이 왕의 언행을 기록하므로 왕 스스로 조심하게 되었다고 했습니다.',
    clue: '‘사관의 역할은 왕이 스스로 자신의 언행을 조심하게’ 했습니다.',
  }),
  question({
    number: 34,
    groupCode: 'reading-32-34',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '다음을 읽고 내용이 같은 것을 고르십시오.',
    stimulus: passage(
      '북극곰은 고지방 식사에 빨리 적응한 동물이다. 북극곰은 몸의 50%가 지방이며 새끼가 먹는 젖의 지방도 27%에 이른다. 사람이 이만큼의 지방을 가지고 있으면 심혈관 질환과 같은 성인병으로 목숨을 잃을 수도 있다. 그러나 북극곰은 피 속에 지방을 걸러 내는 유전자가 있어 지방으로 인한 부작용을 막아 주는 것으로 알려졌다. 이 동물의 유전자를 연구하면 인간의 성인병 치료에 도움이 될 것으로 기대된다.',
    ),
    choices: [
      '북극곰은 심혈관 질환에 잘 걸리지 않는다.',
      '북극곰은 지방이 적은 음식을 주로 섭취한다.',
      '북극곰의 몸은 27%가 지방으로 이루어져 있다.',
      '북극곰 연구로 인간의 성인병을 치료하고 있다.',
    ],
    answer: '1',
    explanation:
      '북극곰은 지방을 걸러 내는 유전자로 심혈관 질환 같은 부작용을 막습니다.',
    clue: '‘지방으로 인한 부작용을 막아 주는’ 유전자가 있습니다.',
  }),
  question({
    number: 35,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '메일을 쓰거나 문자 메시지를 주고받을 때 이모티콘을 통해 감정을 표시한다. 초창기 문자나 얼굴 표정 위주에서 발전해 만화 인물을 활용하여 소리를 내기도 하고, 움직임을 더해 웃음을 유발하기도 한다. 1980년대 초 이모티콘이 처음 생긴 이래 끊임없이 진화를 계속하고 있는 것이다. 언어 표현력을 퇴보시킨다는 일부의 비판에도 불구하고 이제 이모티콘은 없어서는 안 될 또 하나의 언어로 자리매김 되었다고 할 수 있다.',
    ),
    choices: [
      '초창기 이모티콘은 대부분 얼굴 표정을 나타내는 것이었다.',
      '이모티콘은 감정을 표현하는 또 하나의 언어로 자리 잡았다.',
      '이모티콘의 지속적인 사용은 언어 표현력을 떨어뜨릴 수 있다.',
      '이제는 이모티콘이 없으면 메시지를 주고받기 어려울 정도이다.',
    ],
    answer: '2',
    explanation:
      '이모티콘이 변화·발전해 감정 표현을 위한 새로운 언어가 됐다는 글입니다.',
    clue: '‘또 하나의 언어로 자리매김’했다는 마지막 문장입니다.',
  }),
  question({
    number: 36,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '어떤 아이가 자신이 아끼는 새에게 온갖 고기를 먹이려 했지만 놀란 새는 한 점의 고기도 먹지 못하고 죽었다는 우화가 있다. 이는 새의 입장에서 진정으로 필요한 것이 무엇인지 배려하지 않아서 생긴 결과이다. 그러나 뭔가를 배려할 때 먼저 상대방의 입장을 고려해야 한다는 것은 말처럼 쉬운 일이 아니다. 상대의 입장을 완벽하게 이해하기란 정말 어렵기 때문이다. 따라서 어설픈 배려가 오히려 상대에게 상처를 줄 수 있다는 깨달음이 선행되어야 한다.',
    ),
    choices: [
      '상대를 완벽하게 이해하는 것은 사실상 거의 불가능하다.',
      '서투른 배려는 상대에게 상처를 줄 수 있음을 알아야 한다.',
      '우리는 우화를 통해 진정한 배려가 무엇인지 배울 수 있다.',
      '배려할 때 상대방의 입장을 고려하는 것은 큰 의미가 없다.',
    ],
    answer: '2',
    explanation:
      '상대 입장을 충분히 고려하지 않은 서투른 배려가 상처가 될 수 있다는 주장입니다.',
    clue: '마지막 문장의 ‘어설픈 배려가 오히려 상대에게 상처’가 핵심입니다.',
  }),
  question({
    number: 37,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '사람들은 꿀이 건강에 좋은 식품이라고 생각한다. 그래서 꿀은 당뇨병 환자들에게도 좋으며 설탕과 달리 비만을 일으키지 않는다고 생각한다. 꿀에는 영양소가 풍부하지만 혈당을 높이기 때문에 당뇨병 환자들에게 설탕보다 더 나은 것은 결코 아니다. 우리가 생각하는 꿀의 장점은 대부분 과학적으로 증명되지 않았다. 꿀과 설탕의 결정적인 차이는 소비자의 의식이지 실제의 장단점은 아니다.',
    ),
    choices: [
      '꿀은 설탕보다 건강에 좋은 대체 식품이다.',
      '당뇨병 환자는 설탕 대신에 꿀을 섭취해야 한다.',
      '꿀에 대해 믿고 있는 장점이 사실이 아닐 수 있다.',
      '꿀이 건강에 미치는 영향은 과학적으로 증명되었다.',
    ],
    answer: '3',
    explanation:
      '꿀이 설탕보다 건강에 좋다는 통념에는 과학적 근거가 부족하다고 합니다.',
    clue: '‘우리가 생각하는 꿀의 장점은 대부분 과학적으로 증명되지 않았다’는 문장입니다.',
  }),
  question({
    number: 38,
    groupCode: 'reading-35-38',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '다음 글의 주제로 가장 알맞은 것을 고르십시오.',
    stimulus: passage(
      '인터넷을 사용하다 보면 자신의 정보를 제공하겠다는 글에 동의해야 하는 경우가 많다. 이와 같이 동의하는 글을 ‘규약문’이라 하는데 여기에는 사회적 약속이나 규정이 있다. 규약문은 개인들 사이의 이해관계가 엇갈려 다툼이 생길 경우 이를 해결하는 역할을 한다. 따라서 인터넷으로 소통하고자 하는 사람들은 규약문을 정확히 파악하고 그것이 공정하고 합리적인지 평가해야 한다. 그래야 자신의 권리가 부당하게 침해받지 않는다.',
    ),
    choices: [
      '규약문의 공정성에 유의해서 읽어야 한다.',
      '규약문은 정확한 내용 파악이 가장 중요하다.',
      '규약문의 내용을 정확히 이해하고 따져 봐야 한다.',
      '규약문을 사용하기 위해서는 자신의 정보를 제공해야 한다.',
    ],
    answer: '3',
    explanation:
      '규약문을 제대로 이해하고 공정성·합리성까지 평가해야 한다는 주장입니다.',
    clue: '‘정확히 파악하고 그것이 공정하고 합리적인지 평가해야’ 합니다.',
  }),
  question({
    number: 39,
    groupCode: 'reading-39-41',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt: '<보기>의 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    stimulus: insertionPassage(
      '인주상사가 이번 달부터 ‘자율근무제’를 도입한다. [[marker:m1|㉠]] 이 제도는 본인의 업무 시간을 스스로 정할 수 있어 기존의 출퇴근 시간이 사라지게 된다. [[marker:m2|㉡]] 이 회사에서는 오는 10월까지 모든 사원을 대상으로 자율근무제를 시범 운영할 예정이다. [[marker:m3|㉢]] 시범 운영 기간이 끝나면 이 제도의 장점과 단점을 분석하고 보완하여 정식으로 도입할 예정이다. [[marker:m4|㉣]] 다른 기업들도 이러한 인주상사의 자율근무제 시행에 큰 관심을 가지고 있다.',
      '나아가 이 제도의 도입을 계기로 조직 문화의 개선을 위하여 다양한 유형의 시도를 계속할 것이라고 밝혔다.',
    ),
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '4',
    explanation:
      '자율근무제의 도입 계획을 설명한 뒤 조직 문화 개선의 추가 계획을 제시하는 위치입니다.',
    clue: '<보기>의 ‘나아가’는 앞에서 말한 정식 도입 계획 다음에 이어집니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 40,
    groupCode: 'reading-39-41',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt: '<보기>의 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    stimulus: insertionPassage(
      '[[marker:m1|㉠]] ‘메디치 효과’는 서로 관련 없는 분야가 결합해 전에 없던 창의적인 결과를 창출하는 현상을 말한다. [[marker:m2|㉡]] 당시 메디치 가문은 서로 다른 역량을 가진 예술가와 학자들의 공동 작업을 후원했다. 그 결과로 피렌체 지역의 문화 수준이 한층 높아졌다. [[marker:m3|㉢]] 혁신적인 기술과 예술가의 품격 있는 디자인이 만나는 사례는 국내에서도 찾아볼 수 있다. [[marker:m4|㉣]] 그 예로 인주전자의 최첨단 기술과 유럽의 명품 디자인사가 공동 출시한 ‘엔젤폰’이 있다.',
      '이 용어는 르네상스의 탄생과 발전에 큰 역할을 했던 메디치라는 가문의 이름에서 유래되었다.',
    ),
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '2',
    explanation:
      '‘메디치 효과’라는 용어를 소개한 직후 그 이름의 유래를 설명해야 합니다.',
    clue: '<보기>의 ‘이 용어’는 앞 문장의 ‘메디치 효과’를 가리킵니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 41,
    groupCode: 'reading-39-41',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt: '<보기>의 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    stimulus: insertionPassage(
      '정지우 교수의 『영화, 물리를 말하다』에서는 영화 속 과학 이야기를 흥미진진하게 보여 준다. [[marker:m1|㉠]] 물리학자인 작가가 과학의 눈으로 영화를 들여다봄으로써 그 속에 숨어 있는 과학을 설명한다. [[marker:m2|㉡]] 이 책에서는 영화에 등장하는 투명인간이나 인공지능 로봇 등을 다루고 있다. [[marker:m3|㉢]] 이 책을 통해 과학의 원리를 이해하게 된다면 더욱 흥미롭게 영화를 관람할 수 있을 것이다. [[marker:m4|㉣]] 또한 과학이 주는 신비로운 세상도 경험할 수 있을 것이다.',
      '이러한 소재들은 과학적 지식을 바탕으로 인간의 상상력을 영화에 구체화한 것이다.',
    ),
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '3',
    explanation:
      '투명인간과 인공지능 로봇을 소개한 바로 뒤에 ‘이러한 소재들’에 대한 설명이 이어집니다.',
    clue: '<보기>의 ‘이러한 소재들’은 앞 문장의 영화 속 소재들을 가리킵니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 42,
    groupCode: 'reading-42-43',
    type: TopikQuestionType.AUTHOR_EMOTION,
    prompt: '밑줄 친 부분에 나타난 여주인의 심정으로 알맞은 것을 고르십시오.',
    choices: ['난처하다', '황당하다', '서먹하다', '안타깝다'],
    answer: '2',
    explanation: '치즈를 빼 달라는 뜻밖의 피자 주문에 여주인이 어이없어합니다.',
    clue: '‘여주인은 한 방 맞은 기분인가 보다’는 놀랍고 황당한 마음입니다.',
    clueTargetKeys: ['emotion'],
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 43,
    groupCode: 'reading-42-43',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '이 글의 내용과 같은 것을 고르십시오.',
    choices: [
      '나는 같은 피자를 주문하지 않는다.',
      '큰딸은 바질향이 나는 빵을 좋아한다.',
      '나는 아이들의 행동이 이해가 안 된다.',
      '작은딸은 바삭바삭한 피자를 주문했다.',
    ],
    answer: '3',
    explanation:
      '화자는 두 딸의 독특한 주문에 왜 이렇게 삐딱한지 이해하지 못합니다.',
    clue: '‘도대체 내가 애들을 어떻게 길렀기에 이 모양이지?’라고 생각합니다.',
  }),
  question({
    number: 44,
    groupCode: 'reading-44-45',
    type: TopikQuestionType.PASSAGE_TOPIC,
    prompt: '이 글의 주제로 알맞은 것을 고르십시오.',
    choices: [
      '한국 기업들은 급변하는 시대에 잘 적응하고 있다.',
      '‘빨리빨리’ 문화는 한국인에게만 나타나는 국민성이다.',
      '한국 기업은 단점을 드러내지 않으려고 하는 경향이 있다.',
      '한국인의 ‘빨리빨리’ 문화는 기업 발전의 긍정적 요인이 될 수 있다.',
    ],
    answer: '4',
    explanation:
      '빠른 적응이 필요한 현대 사회에서는 한국인의 ‘빨리빨리’ 문화가 기업의 강점이 될 수 있습니다.',
    clue: '마지막의 ‘오히려 강점이 될 수 있다’는 문장이 핵심입니다.',
  }),
  question({
    number: 45,
    groupCode: 'reading-44-45',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.',
    choices: [
      '상징적 의미를 만들',
      '부정적 인식을 바꿀',
      '차별적 경쟁력을 갖출',
      '보편적 리더십을 추구할',
    ],
    answer: '3',
    explanation:
      '한국인의 장점을 살리고 단점을 보완해 다른 기업과 구별되는 경쟁력을 갖춰야 합니다.',
    clue: '앞의 ‘장점을 최대화하고 약점을 보완’과 연결됩니다.',
    choiceLayout: TopikChoiceLayout.TWO_COLUMNS,
  }),
  question({
    number: 46,
    groupCode: 'reading-46-47',
    type: TopikQuestionType.SENTENCE_INSERTION,
    prompt: '다음 문장이 들어가기에 가장 알맞은 곳을 고르십시오.',
    choices: ['㉠', '㉡', '㉢', '㉣'],
    answer: '4',
    explanation:
      '공이 떠오르는 것 같다는 타자의 말 뒤에 실제로는 위로 올라가지 않는다고 설명해야 합니다.',
    clue: '㉣ 뒤의 ‘그런데도 그렇게 착각하는 것은’이 <보기>를 받습니다.',
    template: TopikVisualTemplate.EXAM_INSERTION,
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 47,
    groupCode: 'reading-46-47',
    type: TopikQuestionType.PASSAGE_CONTENT_MATCH,
    prompt: '이 글의 내용과 같은 것을 고르십시오.',
    choices: [
      '중력의 영향으로 회전 방향이 달라진다.',
      '회전을 이용하면 공을 떠오르게 할 수 있다.',
      '회전되어 날아오는 공은 타자가 예측하기 쉽다.',
      '투수는 공에 회전을 주어서 다양한 공을 던진다.',
    ],
    answer: '4',
    explanation:
      '투수는 회전 방향을 활용해 타자가 예측하기 어려운 다양한 공을 던집니다.',
    clue: '‘투수들은 이런 방법을 사용해 … 다양한 공을 던진다’는 문장입니다.',
  }),
  question({
    number: 48,
    groupCode: 'reading-48-50',
    type: TopikQuestionType.AUTHOR_PURPOSE,
    prompt: '필자가 이 글을 쓴 목적을 고르십시오.',
    choices: [
      '공통된 갈등 해결의 원칙이 필요함을 주장하기 위해',
      '국가의 지지를 받는 갈등 해결 방안을 요청하기 위해',
      '현대 사회의 다양한 사회적 갈등에 대해 설명하기 위해',
      '갈등 당사자 모두에게 이익이 돌아가도록 촉구하기 위해',
    ],
    answer: '1',
    explanation:
      '사회 구성원 모두가 동의할 수 있는 갈등 해결 원칙을 세워야 한다는 주장입니다.',
    clue: '‘사회 구성원 모두가 합의할 수 있는 해결 원칙을 세울 필요’가 있습니다.',
  }),
  question({
    number: 49,
    groupCode: 'reading-48-50',
    type: TopikQuestionType.PASSAGE_FILL_BLANK,
    prompt: '( )에 들어갈 내용으로 알맞은 것을 고르십시오.',
    choices: ['자율적으로', '중립적으로', '독창적으로', '창의적으로'],
    answer: '1',
    explanation:
      '당사자 간의 자유로운 대화와 협상으로 해결하므로 자율적으로 해결해야 합니다.',
    clue: '빈칸 뒤의 ‘당사자 간의 자유로운 대화와 협상’이 설명합니다.',
    choiceLayout: TopikChoiceLayout.FOUR_COLUMNS,
  }),
  question({
    number: 50,
    groupCode: 'reading-48-50',
    type: TopikQuestionType.AUTHOR_ATTITUDE,
    prompt: '밑줄 친 부분에 나타난 필자의 태도로 알맞은 것을 고르십시오.',
    choices: [
      '사회적 갈등 발생에 대해 경계하고 있다.',
      '타협을 통한 갈등 해결에 대해 회의적이다.',
      '사회 통합의 어려움에 대해 공감하고 있다.',
      '사회적 갈등의 긍정적인 측면을 인정하고 있다.',
    ],
    answer: '4',
    explanation:
      '갈등이 합리적으로 조정되면 사회 통합의 동력이 될 수 있다고 긍정적으로 봅니다.',
    clue: '‘사회를 통합하는 동력으로 작용할 수 있을 것이다’는 표현입니다.',
    clueTargetKeys: ['attitude'],
  }),
];
