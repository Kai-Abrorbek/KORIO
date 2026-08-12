import {
  TopikQuestionType,
  TopikSection,
} from '../../../topik/schemas/topik-content.schema';
import { RecipeSeed, t4 } from './recipe-seed.types';
import {
  recipeQuestion as q,
  recipeRanking as ranking,
} from './reading-recipe-helpers';

const order = (
  code: string,
  number: number,
  prompt: string,
  choices: string[],
  correctIndex: number,
  source: string,
) =>
  q(
    code,
    number,
    TopikQuestionType.SENTENCE_ORDERING,
    prompt,
    choices,
    correctIndex,
    source,
  );

const examples = [
  order(
    'recipe-reading-13-15-example-01',
    13,
    '(가) 환경 보호를 위해 포장 없이 내용물만 판매하는 가게가 있다.\n(나) 사람들이 용기에 든 물품을 사려면 빈 통을 준비해 가야 한다.\n(다) 빈 통이 없는 사람들에게는 가게에서 통을 대여해 주기도 한다.\n(라) 이 가게에서는 밀가루나 샴푸 등을 커다란 용기에 담아 놓고 판매한다.',
    [
      '(가)-(나)-(라)-(다)',
      '(가)-(라)-(나)-(다)',
      '(나)-(가)-(라)-(다)',
      '(나)-(다)-(가)-(라)',
    ],
    1,
    'TOPIK II 60회 읽기 13번 / 합격 레시피 105쪽',
  ),
  order(
    'recipe-reading-13-15-example-02',
    14,
    '(가) 요금을 내려고 보니 가방 어디에서도 지갑을 찾을 수 없었다.\n(나) 감사의 인사를 전하는 나에게 아주머니는 환하게 웃어 주셨다.\n(다) 회사에 지각할 것 같아서 막 출발하려는 버스를 뛰어가서 탔다.\n(라) 그냥 내리려는데 뒤에 서 있던 아주머니가 대신 요금을 내 주셨다.',
    [
      '(가)-(다)-(나)-(라)',
      '(가)-(라)-(다)-(나)',
      '(다)-(가)-(라)-(나)',
      '(다)-(나)-(라)-(가)',
    ],
    2,
    'TOPIK II 60회 읽기 14번 / 합격 레시피 106쪽',
  ),
  order(
    'recipe-reading-13-15-example-03',
    15,
    '(가) 쉬어도 떨림이 계속된다면 마그네슘이 부족해서일 수도 있다.\n(나) 눈 밑 떨림의 주된 원인은 피로이므로 푹 쉬면 증상은 완화된다.\n(다) 이런 사람들은 마그네슘이 풍부한 견과류나 바나나를 먹으면 좋다.\n(라) 누구나 한 번쯤은 눈 밑이 떨리는 경험을 해 본 적이 있을 것이다.',
    [
      '(나)-(다)-(라)-(가)',
      '(나)-(라)-(다)-(가)',
      '(라)-(가)-(다)-(나)',
      '(라)-(나)-(가)-(다)',
    ],
    3,
    'TOPIK II 60회 읽기 15번 / 합격 레시피 106쪽',
  ),
];

const practice = [
  order(
    'recipe-reading-13-15-practice-01',
    1,
    '(가) 어느 날 어머니가 나에게 작은 수첩을 주셨다.\n(나) 그러면서 중요한 일이 있을 때마다 메모를 하라고 하셨다.\n(다) 그때부터 나는 메모를 하기 시작했고 잊어버리는 일도 줄어들게 되었다.\n(라) 나는 평소에 해야 할 일을 자주 잊어버릴 때가 많았다.',
    [
      '(라)-(다)-(가)-(나)',
      '(라)-(가)-(나)-(다)',
      '(가)-(라)-(나)-(다)',
      '(가)-(나)-(다)-(라)',
    ],
    1,
    '합격 레시피 읽기 13~15번 예상문제 1 / 107쪽',
  ),
  order(
    'recipe-reading-13-15-practice-02',
    2,
    '(가) 따라서 실내 온도를 신생아에게 가장 쾌적한 24도 정도로 유지해 주어야 한다.\n(나) 그래서 체온이 외부의 온도 변화에 영향을 잘 받는다.\n(다) 더운 방에서 아기를 포대기에 싸 두면 열이 날 수도 있다.\n(라) 신생아는 체온을 조절하는 능력이 완전하지 못하다.',
    [
      '(라)-(나)-(다)-(가)',
      '(라)-(가)-(나)-(다)',
      '(다)-(나)-(라)-(가)',
      '(다)-(가)-(나)-(라)',
    ],
    0,
    '합격 레시피 읽기 13~15번 예상문제 2 / 107쪽',
  ),
  order(
    'recipe-reading-13-15-practice-03',
    3,
    '(가) 약을 먹으면 통증이 줄어들기 때문에 무리할 수 있어서 아픈 곳이 더 나빠질 수도 있다.\n(나) 팔이 아프면 팔을 조심하게 되고 다리가 아프면 다리를 조심하게 된다.\n(다) 사람은 통증을 느끼게 되면 통증을 느끼는 부분을 조심하게 된다.\n(라) 하지만 통증을 느낀다고 해서 금방 약을 먹는 것은 좋지 않다.',
    [
      '(나)-(가)-(다)-(라)',
      '(나)-(다)-(가)-(라)',
      '(다)-(나)-(라)-(가)',
      '(다)-(라)-(나)-(가)',
    ],
    2,
    '합격 레시피 읽기 13~15번 예상문제 3 / 107쪽',
  ),
  order(
    'recipe-reading-13-15-practice-04',
    4,
    '(가) 아들 개구리가 계속 자기가 본 동물이 더 크다고 하자 결국 아빠는 배가 터져 죽고 말았다.\n(나) 그러던 어느 날 아들 개구리가 황소를 보고 아빠에게 더 큰 동물을 봤다고 이야기했다.\n(다) 어느 시골 연못에 항상 자기의 몸이 큰 것을 자랑하는 아빠 개구리가 있었다.\n(라) 아빠 개구리는 아들이 본 짐승보다 몸집을 더 크게 만들려고 몸속에 공기를 불어 넣었다.',
    [
      '(다)-(라)-(나)-(가)',
      '(다)-(나)-(라)-(가)',
      '(라)-(다)-(가)-(나)',
      '(라)-(가)-(다)-(나)',
    ],
    1,
    '합격 레시피 읽기 13~15번 예상문제 4 / 108쪽',
  ),
  order(
    'recipe-reading-13-15-practice-05',
    5,
    '(가) 그러고 나서 산을 오를 때에는 일정한 속도로 걸어야 한다.\n(나) 그리고 보통 약 50분 산행 뒤 5분 정도 쉬어야 한다.\n(다) 산을 올라가기 전에 등산화가 발에 꼭 맞도록 끈을 묶어 주어야 한다.\n(라) 등산을 하는 사람은 안전한 등산을 위해 다음과 같은 점을 조심해야 한다.',
    [
      '(다)-(가)-(나)-(라)',
      '(다)-(가)-(라)-(나)',
      '(라)-(나)-(가)-(다)',
      '(라)-(다)-(가)-(나)',
    ],
    3,
    '합격 레시피 읽기 13~15번 예상문제 5 / 108쪽',
  ),
  order(
    'recipe-reading-13-15-practice-06',
    6,
    '(가) 악어가 먹이를 잡을 때에 물속에서 바위인 것처럼 움직이지 않고 먹이를 기다린다.\n(나) 육식 동물인 악어는 다른 동물들과 달리 독특한 방법으로 먹이를 잡는다.\n(다) 동물들은 바위인 줄 알고 물가에서 물을 마시기 시작한다.\n(라) 그러는 순간 악어는 아주 빠르게 먹이를 물고 물속으로 들어간다.',
    [
      '(나)-(라)-(가)-(다)',
      '(나)-(가)-(다)-(라)',
      '(가)-(다)-(나)-(라)',
      '(가)-(나)-(다)-(라)',
    ],
    1,
    '합격 레시피 읽기 13~15번 예상문제 6 / 108쪽',
  ),
];

export const RECIPE_READING_13_15: RecipeSeed = {
  groupCode: 'reading-13-15',
  section: TopikSection.READING,
  label: t4('읽기 13~15번', "O'qish 13–15", 'Reading 13–15', 'Чтение 13–15'),
  title: t4(
    '순서 배열',
    'Gaplar tartibi',
    'Sentence ordering',
    'Порядок предложений',
  ),
  intro: t4(
    '(가)~(라)의 도입, 접속사, 지시어와 포함 조사를 찾아 글의 흐름을 복원합니다.',
    '(가)–(라) dagi kirish va bog‘lanish belgilaridan tartibni tiklaymiz.',
    'Restore the passage through its opening and linking markers.',
    'Восстановите текст по вступлению и связующим маркерам.',
  ),
  targetLevel: 3,
  order: 5,
  goldenRecipe: [
    t4(
      '선택지가 제시하는 첫 문장 후보 중 내용의 범위가 더 큰 문장을 고릅니다.',
      'Birinchi gap nomzodlaridan mazmuni kengroq gapni tanlang.',
      'Choose the broader statement among the candidates for the first sentence.',
      'Среди кандидатов на первое предложение выберите более общее.',
    ),
    t4(
      '그리고·그러나 같은 접속사, 이·그·저 같은 지시어, ‘도’가 있는 문장은 첫 문장이 아닙니다.',
      'Bog‘lovchi, ko‘rsatish so‘zi yoki ‘도’ qatnashgan gap odatda birinchi bo‘lmaydi.',
      'A sentence with a connective, demonstrative or 도 is normally not first.',
      'Предложение со связкой, указательным словом или 도 обычно не первое.',
    ),
    t4(
      '연결 표지를 따라 나머지 문장을 배열하고 전체 흐름을 다시 읽습니다.',
      'Bog‘lanish belgilariga qarab gaplarni joylashtirib, matnni qayta o‘qing.',
      'Order the remaining sentences using links, then reread the full passage.',
      'Расположите остальные предложения по связям и перечитайте весь текст.',
    ),
  ],
  grammarSections: [
    {
      key: 'ordering-topic-ranking',
      title: t4(
        '순서 배열 Ranking 11',
        'Tartib mavzulari Ranking 11',
        'Ordering topics Ranking 11',
        'Темы порядка Ranking 11',
      ),
      entries: ranking([
        ['개인적인 글', '미담, 추억 등 개인의 경험을 다룬 글'],
        ['인간 관련', '연령별 특징, 심리, 신체, 아이디어, 스트레스'],
        ['일화', '위인, 한국 전래 동화, 이솝우화'],
        ['건강', '음식의 효능, 건강 관리법, 건강을 위한 습관'],
        ['정보', '생활 상식과 과학 정보'],
        ['정책', '앞으로 필요하거나 시행 예정·최근 시행된 정책'],
        ['유래', '사물이나 풍습의 재미있는 유래'],
        ['사회 현상', '과거와 달라진 사회 현상'],
        ['동물', '잘 알려지지 않은 동물의 특징'],
        ['최신 화제', '문제 제작 시기에 한국에서 화제가 되는 일'],
        ['기술', '생활을 바꾸는 기술과 아이디어'],
      ]),
      tips: [],
    },
  ],
  examples,
  practice,
  sourceReference: '합격 레시피 PDF 104~108쪽',
};
