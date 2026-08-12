import {
  TopikQuestionType,
  TopikSection,
} from '../../../topik/schemas/topik-content.schema';
import { RecipeSeed, t4 } from './recipe-seed.types';
import {
  recipeQuestion as q,
  recipeRanking as ranking,
} from './reading-recipe-helpers';

const examples = [
  q(
    'recipe-reading-09-12-example-01',
    9,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    '인주시 캠핑장 이용 안내\n이용 기간: 3월~11월\n이용 방법: 홈페이지에서 예약(당일 예약 불가)\n1박 2일 이용료: 주중 30,000원 / 주말 35,000원\n주차장·샤워장 이용료 포함',
    [
      '주말에는 이용 요금을 더 받는다.',
      '캠핑장은 1년 내내 이용할 수 있다.',
      '예약은 이용 당일 홈페이지에서 하면 된다.',
      '주차장을 이용하려면 돈을 따로 내야 한다.',
    ],
    0,
    'TOPIK II 60회 읽기 9번 / 합격 레시피 85쪽',
  ),
  q(
    'recipe-reading-09-12-example-02',
    10,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    '2017 도서 신청 안내\n신청 기간: 4월 17일~4월 30일\n신청 방법: 도서관 홈페이지\n1인 10권 이내 신청 가능(잡지·어학 교재 제외)\n책이 도착하면 이메일로 알려 드립니다.',
    [
      '신청할 수 없는 책 종류가 있다.',
      '사월 한 달 동안 도서 신청을 받는다.',
      '필요한 책은 이메일로 신청해야 한다.',
      '책이 도착하면 전화로 연락해 준다.',
    ],
    0,
    'TOPIK II 52회 읽기 9번 / 합격 레시피 85쪽',
  ),
  q(
    'recipe-reading-09-12-example-03',
    11,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    '직업 선택의 기준(100명)\n근무 조건 48% · 직업의 안정성 16% · 적성 13% · 월급 12% · 개인의 발전 7% · 기타 4%',
    [
      '직업의 안정성을 중요하게 생각하는 사람이 가장 적다.',
      '월급과 적성을 중요하게 생각하는 사람의 비율이 같다.',
      '개인의 발전보다 월급을 중요하게 생각하는 사람이 더 많다.',
      '근무 조건을 중요하게 생각하는 사람이 전체의 반을 넘는다.',
    ],
    2,
    'TOPIK II 52회 읽기 10번 / 합격 레시피 127쪽',
  ),
  q(
    'recipe-reading-09-12-example-04',
    12,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    '세대별 매체 이용 현황\n텔레비전 이용 비율은 20대보다 40대와 60대가 높고, 신문 이용 비율은 40대가 60대보다 높다.',
    [
      '신문을 보는 사람의 비율은 20대와 60대가 같다.',
      '모든 세대가 텔레비전보다 신문을 더 많이 본다.',
      '신문을 보는 사람의 비율은 60대가 40대보다 낮다.',
      '텔레비전을 보는 사람의 비율은 20대가 40대보다 높다.',
    ],
    2,
    'TOPIK II 47회 읽기 10번 / 합격 레시피 127쪽',
  ),
  q(
    'recipe-reading-09-12-example-05',
    13,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    '인주시의 한 고등학교는 올해부터 여름 교복으로 티셔츠와 반바지를 입고 있다. 기존 정장형 교복은 활동할 때 불편하다는 학생들의 의견이 많았기 때문이다. 몸이 편해지니 학생들은 다양한 활동에 적극적으로 참여하고 공부에도 더 집중할 수 있어서 학습 효율이 올라갔다. 새 교복은 기존 교복보다 가격이 저렴해서 학부모에게도 인기다.',
    [
      '학부모들은 정장형 교복을 더 좋아한다.',
      '새 교복은 정장형 교복보다 가격이 비싸다.',
      '기존 교복에 비해 새 교복은 활동할 때 불편하다.',
      '학교는 학생들의 의견을 받아들여서 교복을 바꿨다.',
    ],
    3,
    'TOPIK II 60회 읽기 11번 / 합격 레시피 87쪽',
  ),
  q(
    'recipe-reading-09-12-example-06',
    14,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    '최근 한 아파트에서 힘들게 일하는 택배 기사, 청소원 등을 위한 무료 카페를 열어서 화제가 되고 있다. 이 카페는 언제든 부담 없이 음료를 마시면서 쉴 수 있는 곳이어서 이용자들이 만족해하고 있다. 주민들은 처음에는 관심을 안 보였지만 지금은 카페에 음료와 간식을 제공하는 등 많은 도움을 주고 있다.',
    [
      '이 카페에 간식을 가져다주는 주민들이 생겼다.',
      '카페를 열 때 아파트 주민들이 적극적으로 도왔다.',
      '이 카페는 아파트 주민들이 돈을 벌기 위해서 열었다.',
      '택배 기사들이 카페의 운영에 참여해 화제가 되고 있다.',
    ],
    0,
    'TOPIK II 60회 읽기 12번 / 합격 레시피 88쪽',
  ),
];

const practice = [
  q(
    'recipe-reading-09-12-practice-01',
    1,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    '제18회 안동 국제 탈춤 축제\n행사 개요: 국내외 탈춤을 볼 수 있는 축제\n수상 경력: 대한민국 대표 축제, 글로벌 육성 축제 등으로 여러 차례 선정됨\n행사 장소: 안동 탈춤공원, 시내 일부\n행사 목적: 한국 전통 문화의 세계화\n행사 일시: 9월 28일부터 10월 7일까지',
    [
      '이 축제는 올해로 여덟 번째로 열린다.',
      '이 축제에서는 한국의 전통 탈춤만 볼 수 있다.',
      '이 축제는 대표 축제로 한 차례 선정된 적이 있다.',
      '이 축제는 한국 전통 문화를 세계에 알리기 위해 열린다.',
    ],
    3,
    '합격 레시피 읽기 9번 예상문제 1 / 86쪽',
  ),
  q(
    'recipe-reading-09-12-practice-02',
    2,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    '스키 캠프 참가 안내\n장소: 은혜스키장\n대상: 초·중·고교생, 대학생 개인 및 단체\n기간: 2018년 12월 1일~2019년 2월 말\n참가비: 1박 2일 200,000원(왕복 교통비, 숙박비, 1박 2식, 시설 이용료 포함)\n준비물: 스키용품 및 스키복(대여 가능)\n문의: 02-1234-5678',
    [
      '대학생들만 캠프에 참가할 수 있다.',
      '참가비를 내면 교통비를 따로 내지 않아도 된다.',
      '궁금한 점이 있으면 인터넷으로 알아볼 수 있다.',
      '캠프에 참가하려면 스키복과 스키용품을 구입해야 한다.',
    ],
    1,
    '합격 레시피 읽기 9번 예상문제 2 / 86쪽',
  ),
  q(
    'recipe-reading-09-12-practice-03',
    3,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    '어린이날 받고 싶은 선물(4~14세 어린이 1004명 대상)\n게임기 9% · 장난감 15% · 스마트폰 19% · 옷·신발 25% · 애완동물 32%',
    [
      '스마트폰을 받고 싶은 어린이가 가장 많다.',
      '게임기와 장난감을 받고 싶은 어린이의 비율이 같다.',
      '애완동물을 받고 싶은 어린이가 전체의 반을 넘는다.',
      '스마트폰보다 옷, 신발을 받고 싶은 어린이가 더 많다.',
    ],
    3,
    '합격 레시피 읽기 10번 예상문제 1 / 128쪽',
  ),
  q(
    'recipe-reading-09-12-practice-04',
    4,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    '남녀 배우자 선호 직업(미혼 남녀 대상)\n남성: 공무원 30%, 교사 33%, 회사원 23%, 자영업 14%\n여성: 공무원 38%, 교사 20%, 회사원 21%, 자영업 20%',
    [
      '자영업은 남성이 세 번째로 선호하는 배우자의 직업이다.',
      '여성은 배우자의 직업으로 회사원보다 자영업을 더 선호한다.',
      '공무원은 남성과 여성 모두가 가장 원하는 배우자의 직업이다.',
      '배우자의 직업으로 회사원을 꼽은 사람은 남성이 여성보다 더 많다.',
    ],
    3,
    '합격 레시피 읽기 10번 예상문제 2 / 128쪽',
  ),
  q(
    'recipe-reading-09-12-practice-05',
    5,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    '고등학교 1학년생이 간경화가 심해진 아버지에게 자신의 간 일부를 이식해 준 사연이 화제가 되고 있다. 학생의 아버지는 오래전부터 간경화를 앓다가 최근 위독해졌다. 간 이식 수술이 필요했지만 간을 이식해 줄 사람이 마땅히 없었다. 학생은 자신이 간을 기증하고 싶었지만 나이가 어려서 불가능하였다. 그러던 중 생일이 지나 이식이 가능한 나이가 되자마자 간 이식을 한 것이다.',
    [
      '학생의 아버지는 최근 간경화가 생긴 것을 알았다.',
      '학생의 아버지는 간을 기증할 사람을 금방 찾았다.',
      '학생은 간경화가 심해져 아버지로부터 간을 기증 받았다.',
      '학생은 간 기증이 가능한 나이를 기다렸다가 이식 수술을 했다.',
    ],
    3,
    '합격 레시피 읽기 11~12번 예상문제 1 / 90쪽',
  ),
  q(
    'recipe-reading-09-12-practice-06',
    6,
    TopikQuestionType.PASSAGE_CONTENT_MATCH,
    '2020년 김해 숲길 마라톤 대회가 오는 6월 17일 일요일 오전 8시에 김해운동장에서 개최된다. 이번 마라톤 대회는 하프, 10km와 3km 세 부문으로 나뉘어 진행된다. 참가비는 하프와 10km는 삼만 원, 3km는 만 오천 원이다. 참가는 홈페이지에서 신청하면 된다. 신청 마감은 6월 4일 월요일까지이고 선착순 2,500명까지 받는다.',
    [
      '참가는 현장에서 접수를 받는다.',
      '참가비는 거리에 관계없이 같다.',
      '참가 신청은 대회 전날까지 가능하다.',
      '참가 인원은 신청자 수에 따라 제한이 있다.',
    ],
    3,
    '합격 레시피 읽기 11~12번 예상문제 2 / 90쪽',
  ),
];

export const RECIPE_READING_09_12: RecipeSeed = {
  groupCode: 'reading-09-12',
  section: TopikSection.READING,
  label: t4('읽기 9~12번', "O'qish 9–12", 'Reading 9–12', 'Чтение 9–12'),
  title: t4(
    '안내문·그래프·신문 기사',
    "E'lon, grafik va yangilik",
    'Notices, charts and news',
    'Объявления, графики и новости',
  ),
  intro: t4(
    '안내문의 여섯 정보, 그래프의 비교·순위, 신문 기사의 세부 내용을 구분해 훈련합니다.',
    "E'lonning olti ma'lumoti, grafik taqqoslashlari va yangilik tafsilotlarini mashq qilamiz.",
    'Practise six notice details, chart comparisons and news details.',
    'Отрабатываем шесть деталей объявления, сравнения графика и детали новости.',
  ),
  targetLevel: 3,
  order: 4,
  goldenRecipe: [
    t4(
      '안내문은 선택지를 먼저 읽고 누가·언제·어디서·무엇을·어떻게·왜를 하나씩 대조합니다.',
      "E'londa avval variantlarni o'qib olti ma'lumotni solishtiring.",
      'For notices, read the choices first and compare the six details.',
      'В объявлении сначала прочитайте варианты и сравните шесть деталей.',
    ),
    t4(
      '그래프는 제목을 확인한 뒤 비교·순위·변화 표현과 수치를 연결합니다.',
      "Grafikda sarlavhani tekshirib, ifodalarni sonlar bilan bog'lang.",
      'For charts, connect comparison, rank and change expressions to the numbers.',
      'В графике свяжите сравнение, место и изменение с числами.',
    ),
    t4(
      '신문 기사는 주제를 먼저 잡고 선택지에서 바뀐 세부 정보를 찾습니다.',
      "Yangilikda avval mavzuni topib, o'zgargan tafsilotni aniqlang.",
      'Identify the news topic, then find the altered detail.',
      'Определите тему новости, затем найдите изменённую деталь.',
    ),
  ],
  grammarSections: [
    {
      key: 'news-topic-ranking',
      title: t4(
        '신문 기사 Ranking 8',
        'Yangilik mavzulari Ranking 8',
        'News topics Ranking 8',
        'Темы новостей Ranking 8',
      ),
      entries: ranking([
        [
          '미담',
          '감동적이고 아름다운 사람들의 이야기: 구조, 봉사, 기부, 분실물, 이웃의 아름다운 사연',
        ],
        [
          '행사 소개',
          '공연, 전시회, 박람회, 대회, 홍보 행사, 강연의 특징과 의의',
        ],
        ['최신 화제', 'TOPIK 문제 제작 시기에 한국에서 화제가 되는 일'],
        ['정책', '앞으로 필요한 정책, 시행 예정인 정책, 최근 시행된 정책'],
        ['건강 정보', '음식, 습관, 건강에 유용한 정보'],
        ['생활 정보', '일상생활에 유용한 정보'],
        ['사회 현상', '빠르게 달라지는 현대 사회의 특징'],
        ['동물', '잘 알려지지 않았지만 관심을 가질 만한 동물의 특징'],
      ]),
      tips: [
        t4(
          '정책은 13~15번 순서 배열과 25~27번 기사 제목에도 겹칩니다.',
          'Siyosat 13–15 va 25–27-savollarda ham uchraydi.',
          'Policy overlaps with questions 13–15 and 25–27.',
          'Политика также встречается в заданиях 13–15 и 25–27.',
        ),
      ],
    },
    {
      key: 'chart-language',
      title: t4(
        '그래프 필수 표현',
        'Grafik ifodalari',
        'Essential chart language',
        'Выражения для графика',
      ),
      entries: ranking([
        ['비교', '보다 많다·적다, 더 높다·낮다, 같다'],
        ['순위', '가장 많다, 그다음이다, 첫째·둘째·셋째'],
        ['변화', '증가하다·감소하다, 오르다·내리다, 변화가 없다'],
      ]),
      tips: [
        t4(
          '제목, 조사 대상, 단위, 범례를 먼저 확인합니다.',
          'Sarlavha, qatnashchilar, birlik va belgilarni tekshiring.',
          'Check the title, population, unit and legend first.',
          'Сначала проверьте заголовок, выборку, единицу и легенду.',
        ),
      ],
    },
  ],
  examples,
  practice,
  sourceReference: '합격 레시피 PDF 84~91쪽, 126~128쪽',
};
