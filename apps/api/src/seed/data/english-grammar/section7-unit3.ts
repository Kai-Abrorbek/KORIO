import { L } from './english-grammar.helpers';
import type {
  EnglishGrammarDialogue,
  EnglishGrammarDrill,
  EnglishGrammarUnit,
  LocalizedText,
} from './english-grammar.types';

const r = (
  correct: string,
  wrong1: string,
  wrong2: string,
): readonly [string, string, string] => [correct, wrong1, wrong2];

const d = (
  answer: string,
  ko: string,
  uz: string,
  ru: string,
  rows: EnglishGrammarDrill['rows'],
): EnglishGrammarDrill => {
  const correct = rows.map((row) => row[0]);
  const answerIndex = correct.indexOf(answer);
  if (answerIndex < 0) throw new Error(`Missing drill answer row: ${answer}`);
  const template = correct
    .map((part, index) => (index === answerIndex ? '___' : part))
    .join(' ');
  return {
    template,
    answer,
    translation: L(ko, uz, correct.join(' '), ru),
    rows,
  };
};

const line = (
  speaker: string,
  side: 'left' | 'right',
  text: string,
  ko: string,
  uz: string,
  ru: string,
  highlight?: string,
): EnglishGrammarDialogue => ({
  speaker,
  side,
  text,
  gloss: L(ko, uz, text, ru),
  highlight,
});

const caution = (
  ko: string,
  uz: string,
  en: string,
  ru: string,
): LocalizedText => L(ko, uz, en, ru);

export const ENGLISH_GRAMMAR_S7_U3: EnglishGrammarUnit = {
  section: 7,
  unit: 3,
  level: '6',
  title: L(
    '공간 관계와 전치사 결합',
    'Fazoviy munosabatlar va ko‘makchi birikmalari',
    'Spatial relations and preposition partners',
    'Пространственные отношения и сочетания с предлогами',
  ),
  description: L(
    '사물의 상대 위치와 이동 경로를 정확히 말하고, 형용사·동사마다 함께 쓰는 전치사를 문장 속에서 익혀요.',
    'Narsalarning o‘zaro joylashuvi va harakat yo‘lini aniq aytamiz, sifat va fe’llarga mos ko‘makchilarni gap ichida o‘rganamiz.',
    'Describe relative position and movement paths accurately, and learn the prepositions that partner with particular adjectives and verbs.',
    'Точно описываем взаимное положение и траекторию движения и изучаем предлоги, сочетающиеся с конкретными прилагательными и глаголами.',
  ),
  specs: [
    {
      sourceUnit: 102,
      code: 'en-general:grammar:u102-position-prepositions',
      pattern: 'under · behind · opposite · between etc.',
      summary: L(
        'above/below는 높이, next to/between은 나란한 관계, in front of/behind/opposite는 앞뒤 관계를 나타내요.',
        'Above/below balandlikni, next to/between yonma-yonlikni, in front of/behind/opposite old-orqa munosabatini bildiradi.',
        'Above/below show height, next to/between show neighbouring position, and in front of/behind/opposite show facing relations.',
        'Above/below выражают высоту, next to/between — соседнее положение, in front of/behind/opposite — отношения спереди, сзади и напротив.',
      ),
      categoryTag: L(
        '상대 위치',
        'Nisbiy joylashuv',
        'Relative position',
        'Относительное положение',
      ),
      explanation: L(
        'under는 바로 아래나 덮인 위치, above와 below는 접촉하지 않은 위아래 높이를 말해요. next to와 beside는 바로 옆, between은 두 대상 사이입니다. in front of는 같은 방향에서 앞쪽, behind는 뒤쪽, opposite는 서로 마주 보는 맞은편이에요. by는 next to/beside처럼 가까운 옆을 뜻할 수 있습니다. on the left/right와 in the middle은 그룹 안의 위치를 말해요.',
        'Under bevosita past yoki ostidagi joyni, above va below tegmasdan yuqori-past balandlikni bildiradi. Next to va beside yonida, between ikki narsa orasida degani. In front of bir yo‘nalishda oldinda, behind orqada, opposite esa ro‘para turishni bildiradi. By next to/beside kabi yaqin yonni anglatishi mumkin. On the left/right va in the middle guruh ichidagi joyni ko‘rsatadi.',
        'Under means directly beneath or covered by something; above and below compare height without contact. Next to and beside mean immediately alongside; between means in the space separating two things. In front of means ahead in the same orientation, behind means at the back, and opposite means facing across from something. By can mean next to or beside. On the left/right and in the middle locate an item within a group.',
        'Under означает непосредственно под чем-либо; above и below сравнивают высоту без контакта. Next to и beside означают рядом, between — между двумя объектами. In front of означает впереди в одном направлении, behind — сзади, opposite — напротив лицом друг к другу. By может означать рядом. On the left/right и in the middle указывают положение внутри группы.',
      ),
      rule: L(
        'under/above/below + 대상 · next to/beside · between A and B · in front of/behind/opposite',
        'under/above/below + obyekt · next to/beside · between A and B · in front of/behind/opposite',
        'under/above/below + object · next to/beside · between A and B · in front of/behind/opposite',
        'under/above/below + объект · next to/beside · between A and B · in front of/behind/opposite',
      ),
      forms: [
        { base: 'vertical', result: 'above / below / under' },
        { base: 'neighbour', result: 'next to / beside / by' },
        { base: 'two sides', result: 'between A and B' },
        { base: 'facing', result: 'in front of / behind / opposite' },
      ],
      drills: [
        d(
          'under the table',
          '고양이는 탁자 아래에 있어요.',
          'Mushuk stol ostida.',
          'Кошка под столом.',
          [
            r('The cat is', 'The cat are', 'Is the cat'),
            r('under the table', 'below of the table', 'under of table'),
            r('.', 'there.', 'down.'),
          ],
        ),
        d(
          'above the shelves',
          '그림들은 선반 위쪽에 있어요.',
          'Rasmlar tokchalardan yuqorida.',
          'Картины находятся над полками.',
          [
            r('The pictures are', 'The pictures is', 'Pictures the are'),
            r('above the shelves', 'above of the shelves', 'on above shelves'),
            r('.', 'there.', 'high.'),
          ],
        ),
        d(
          'below the pictures',
          '선반들은 그림 아래쪽에 있어요.',
          'Tokchalar rasmlardan pastda.',
          'Полки находятся ниже картин.',
          [
            r('The shelves are', 'The shelves is', 'Shelves the are'),
            r(
              'below the pictures',
              'below of pictures',
              'under below pictures',
            ),
            r('.', 'there.', 'low.'),
          ],
        ),
        d(
          'next to the bank',
          '카페는 은행 바로 옆에 있어요.',
          'Kafe bank yonida.',
          'Кафе находится рядом с банком.',
          [
            r('The café is', 'The café are', 'Café the is'),
            r('next to the bank', 'next the bank', 'beside to the bank'),
            r('.', 'there.', 'near.'),
          ],
        ),
        d(
          'between the bank and the hotel',
          '카페는 은행과 호텔 사이에 있어요.',
          'Kafe bank bilan mehmonxona orasida.',
          'Кафе находится между банком и отелем.',
          [
            r('The café is', 'The café are', 'Is the café'),
            r(
              'between the bank and the hotel',
              'between the bank to the hotel',
              'among the bank and hotel',
            ),
            r('.', 'there.', 'middle.'),
          ],
        ),
        d(
          'in front of the station',
          '택시가 역 앞에 있어요.',
          'Taksi bekat oldida.',
          'Такси стоит перед вокзалом.',
          [
            r('The taxi is', 'The taxi are', 'Taxi the is'),
            r(
              'in front of the station',
              'in the front the station',
              'front of station',
            ),
            r('.', 'there.', 'ahead.'),
          ],
        ),
        d(
          'behind the door',
          '우산이 문 뒤에 있어요.',
          'Soyabon eshik orqasida.',
          'Зонт находится за дверью.',
          [
            r('The umbrella is', 'The umbrella are', 'Umbrella the is'),
            r('behind the door', 'behind of the door', 'at behind door'),
            r('.', 'there.', 'back.'),
          ],
        ),
        d(
          'opposite the library',
          '약국은 도서관 맞은편에 있어요.',
          'Dorixona kutubxona ro‘parasida.',
          'Аптека находится напротив библиотеки.',
          [
            r('The pharmacy is', 'The pharmacy are', 'Pharmacy the is'),
            r(
              'opposite the library',
              'opposite to the library',
              'in opposite library',
            ),
            r('.', 'there.', 'across.'),
          ],
        ),
        d(
          'by the window',
          '창가에 있는 남자는 누구예요?',
          'Deraza yonidagi erkak kim?',
          'Кто тот мужчина у окна?',
          [
            r('Who is that man', 'Who that man is', 'Who does that man'),
            r('by the window', 'by to the window', 'at by window'),
            r('?', 'there?', 'near?'),
          ],
        ),
        d(
          'in the middle',
          '비는 그 무리의 가운데에 있어요.',
          'B guruhning o‘rtasida.',
          'B находится в середине группы.',
          [
            r('B is', 'B are', 'Is B'),
            r('in the middle', 'at the middle', 'on middle'),
            r('of the group.', 'from the group.', 'the group of.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Is the café beside the cinema?',
          '카페가 영화관 옆에 있나요?',
          'Kafe kinoteatr yonidami?',
          'Кафе рядом с кинотеатром?',
          'beside the cinema',
        ),
        line(
          'Leo',
          'right',
          'No, it is opposite the cinema, between two shops.',
          '아니요, 영화관 맞은편 두 가게 사이에 있어요.',
          'Yo‘q, u kinoteatr ro‘parasida, ikki do‘kon orasida.',
          'Нет, оно напротив кинотеатра, между двумя магазинами.',
          'opposite the cinema',
        ),
      ],
      cautions: [
        caution(
          'opposite 뒤에는 보통 to를 쓰지 않아요: opposite the bank.',
          'Opposite dan keyin odatda to ishlatilmaydi: opposite the bank.',
          'Normally do not add to after opposite: opposite the bank.',
          'Обычно не добавляйте to после opposite: opposite the bank.',
        ),
        caution(
          'between은 두 대상을 and로 연결해요: between A and B.',
          'Between bilan ikki obyekt and orqali bog‘lanadi: between A and B.',
          'Link the two objects of between with and: between A and B.',
          'Соединяйте два объекта после between словом and: between A and B.',
        ),
      ],
      similar: {
        pattern: 'in / at / on',
        note: L(
          'in·at·on은 장소 자체의 종류를, 이 문법은 대상 사이의 상대 위치를 설명해요.',
          'In, at va on joy turini, bu mavzu esa obyektlar orasidagi nisbiy joylashuvni bildiradi.',
          'In, at, and on classify a place; this point describes position relative to another object.',
          'In, at и on классифицируют место, а это правило описывает положение относительно другого объекта.',
        ),
      },
    },
    {
      sourceUnit: 103,
      code: 'en-general:grammar:u103-movement-prepositions',
      pattern: 'into · out of · onto · off · over · through etc.',
      summary: L(
        'to/from은 출발과 목적지, into/out of는 경계 통과, on/off와 up/down은 표면·방향 이동을 나타내요.',
        'To/from manba va manzilni, into/out of chegaradan o‘tishni, on/off va up/down yuza hamda yo‘nalishdagi harakatni bildiradi.',
        'To/from mark origin and destination, into/out of cross a boundary, and on/off or up/down show surface and directional movement.',
        'To/from обозначают исходную и конечную точку, into/out of — пересечение границы, on/off и up/down — движение по поверхности и направлению.',
      ),
      categoryTag: L(
        '이동 경로',
        'Harakat yo‘li',
        'Movement paths',
        'Траектория движения',
      ),
      explanation: L(
        'to는 목적지, from은 출발점을 나타내요. into와 out of는 안팎의 경계를 실제로 통과하는 이동이고, 단순 위치는 in을 씁니다. onto/on과 off는 표면에 올라가거나 떨어지는 이동, up/down은 높이 방향, over/under는 위아래를 지나가는 경로예요. through는 내부 통로를 통과하고, across는 한쪽에서 다른 쪽으로 건너며, along은 길을 따라, past는 대상 옆을 지나갑니다.',
        'To manzilni, from boshlanishni bildiradi. Into va out of ichki-tashqi chegarani kesib o‘tish, oddiy joylashuv esa in bilan ifodalanadi. Onto/on va off yuzaga chiqish yoki undan tushish, up/down balandlik yo‘nalishi, over/under ustidan yoki ostidan o‘tishdir. Through ichki yo‘ldan, across bir tomondan ikkinchisiga, along yo‘l bo‘ylab, past esa obyekt yonidan o‘tishni bildiradi.',
        'To marks a destination and from an origin. Into and out of describe movement across an inside/outside boundary; use in for static location. Onto/on and off move onto or away from a surface, up/down show vertical direction, and over/under trace a path above or below. Through passes inside a route, across crosses from one side to another, along follows a line, and past goes beyond an object.',
        'To обозначает пункт назначения, from — исходную точку. Into и out of выражают пересечение границы внутрь или наружу; для положения используется in. Onto/on и off показывают движение на поверхность и с неё, up/down — вертикальное направление, over/under — путь над или под объектом. Through означает движение внутри, across — с одной стороны на другую, along — вдоль, past — мимо.',
      ),
      rule: L(
        'to/from + 지점 · into/out of + 내부 · on/off + 표면 · through/across/along/past + 경로',
        'to/from + nuqta · into/out of + ichki joy · on/off + yuza · through/across/along/past + yo‘l',
        'to/from + point · into/out of + interior · on/off + surface · through/across/along/past + path',
        'to/from + точка · into/out of + внутреннее пространство · on/off + поверхность · through/across/along/past + путь',
      ),
      forms: [
        {
          base: 'origin / destination',
          result: 'from the hotel to the station',
        },
        { base: 'boundary', result: 'into the car / out of the house' },
        { base: 'surface', result: 'onto the bus / off the bicycle' },
        { base: 'path', result: 'through the village / across the river' },
      ],
      drills: [
        d(
          'from the hotel to the station',
          '우리는 호텔에서 역까지 걸었어요.',
          'Biz mehmonxonadan bekatgacha piyoda bordik.',
          'Мы прошли пешком от отеля до вокзала.',
          [
            r('We walked', 'We walk', 'We were walk'),
            r(
              'from the hotel to the station',
              'since the hotel to the station',
              'from the hotel at the station',
            ),
            r('.', 'there.', 'way.'),
          ],
        ),
        d(
          'into the water',
          '우리는 물속으로 뛰어들었어요.',
          'Biz suvga sakradik.',
          'Мы прыгнули в воду.',
          [
            r('We jumped', 'We jump', 'We were jumped'),
            r('into the water', 'in the water', 'to inside water'),
            r('.', 'down.', 'there.'),
          ],
        ),
        d(
          'out of the house',
          '한 남자가 집 밖으로 나왔어요.',
          'Bir erkak uydan chiqdi.',
          'Мужчина вышел из дома.',
          [
            r('A man came', 'A man come', 'Came a man'),
            r('out of the house', 'outside from the house', 'out the house'),
            r('.', 'there.', 'away.'),
          ],
        ),
        d(
          'on the table',
          '탁자 위에 발을 올리지 마세요.',
          'Oyoqlaringizni stol ustiga qo‘ymang.',
          'Не кладите ноги на стол.',
          [
            r(
              "Don't put your feet",
              "Don't put yours feet",
              'Not put your feet',
            ),
            r('on the table', 'onto of the table', 'in the table'),
            r('.', 'please.', 'surface.'),
          ],
        ),
        d(
          'off the bicycle',
          '자전거에서 떨어지지 않도록 조심하세요.',
          'Velosipeddan yiqilib tushmang.',
          'Осторожно, не упадите с велосипеда.',
          [
            r(
              'Be careful not to fall',
              "Be careful don't fall",
              'Careful not falling',
            ),
            r('off the bicycle', 'from off the bicycle', 'out the bicycle'),
            r('.', 'down.', 'away.'),
          ],
        ),
        d(
          'up the hill',
          '우리는 언덕을 올라 집까지 걸었어요.',
          'Biz tepalikdan yuqoriga, uygacha yurdik.',
          'Мы поднялись по холму к дому.',
          [
            r('We walked', 'We walk', 'We were walked'),
            r('up the hill', 'on the hill up', 'above the hill'),
            r('to the house.', 'at the house.', 'in house.'),
          ],
        ),
        d(
          'over the mountains',
          '비행기가 산 위를 날아갔어요.',
          'Samolyot tog‘lar ustidan uchib o‘tdi.',
          'Самолёт пролетел над горами.',
          [
            r('The plane flew', 'The plane flied', 'Flew the plane'),
            r(
              'over the mountains',
              'above of the mountains',
              'on the mountains',
            ),
            r('.', 'high.', 'there.'),
          ],
        ),
        d(
          'through a window',
          '새 한 마리가 창문을 통해 방으로 날아들었어요.',
          'Qush derazadan xonaga uchib kirdi.',
          'Птица влетела в комнату через окно.',
          [
            r(
              'A bird flew into the room',
              'A bird flied in the room',
              'Flew a bird to room',
            ),
            r('through a window', 'across a window', 'along a window'),
            r('.', 'inside.', 'there.'),
          ],
        ),
        d(
          'across the river',
          '개가 강을 헤엄쳐 건넜어요.',
          'It daryoni suzib kesib o‘tdi.',
          'Собака переплыла реку.',
          [
            r('The dog swam', 'The dog swimmed', 'Swam the dog'),
            r('across the river', 'through the river', 'along the river'),
            r('.', 'other side.', 'there.'),
          ],
        ),
        d(
          'along the road',
          '나는 개와 함께 길을 따라 걷고 있었어요.',
          'Men itim bilan yo‘l bo‘ylab ketayotgan edim.',
          'Я шёл с собакой вдоль дороги.',
          [
            r('I was walking', 'I were walking', 'I was walk'),
            r('along the road', 'across the road', 'through the road'),
            r('with my dog.', 'by my dog.', 'my dog with.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'How do I get to the hospital?',
          '병원에 어떻게 가나요?',
          'Kasalxonaga qanday boraman?',
          'Как добраться до больницы?',
          'get to',
        ),
        line(
          'Leo',
          'right',
          'Go along this road, past the cinema, and under the bridge.',
          '이 길을 따라 영화관을 지나 다리 밑으로 가세요.',
          'Shu yo‘l bo‘ylab, kinoteatr yonidan va ko‘prik ostidan boring.',
          'Идите вдоль этой дороги, мимо кинотеатра и под мостом.',
          'along this road',
        ),
      ],
      cautions: [
        caution(
          '정지된 위치는 in, 안으로 이동할 때는 into를 써요.',
          'Turgan joy uchun in, ichkariga harakat uchun into ishlating.',
          'Use in for a static position and into for movement inside.',
          'Для положения употребляйте in, для движения внутрь — into.',
        ),
        caution(
          'across는 가로질러 건너기, through는 내부 통로를 통과하기예요.',
          'Across bir tomondan ikkinchisiga, through esa ichki yo‘ldan o‘tishni bildiradi.',
          'Across crosses from side to side; through passes inside a route.',
          'Across означает пересечение с одной стороны на другую, through — прохождение внутри.',
        ),
      ],
      similar: {
        pattern: 'go in / get out / fall off',
        note: L(
          '전치사가 동사와 결합해 하나의 뜻이 되는 구동사는 Unit 107에서 배워요.',
          'Ko‘makchi fe’l bilan bitta ma’no hosil qiladigan phrasal verb Unit 107 da o‘rganiladi.',
          'Unit 107 covers particles that combine with verbs to make phrasal verbs.',
          'В Unit 107 рассматриваются частицы, образующие с глаголами фразовые глаголы.',
        ),
      },
    },
    {
      sourceUnit: 104,
      code: 'en-general:grammar:u104-on-at-by-with-about',
      pattern: 'on / at / by / with / about',
      summary: L(
        'on은 매체·상태, at은 수치, by는 수단·창작자, with는 동반·도구, about은 화제를 나타내요.',
        'On vosita yoki holatni, at o‘lchov nuqtasini, by usul yoki muallifni, with hamrohlik va asbobni, about mavzuni bildiradi.',
        'On marks media or state, at a measurement, by a means or creator, with company or an instrument, and about a topic.',
        'On обозначает средство или состояние, at — показатель, by — способ или автора, with — сопровождение или инструмент, about — тему.',
      ),
      categoryTag: L(
        '전치사별 기능',
        'Ko‘makchi vazifalari',
        'Preposition functions',
        'Функции предлогов',
      ),
      explanation: L(
        'on holiday/television/the phone/fire/time은 on과 함께 외워야 하는 상태·매체 표현이에요. at은 at 50 kilometres an hour, at 100 degrees처럼 속도·온도·나이의 수치를 가리킵니다. by는 by train처럼 이동 수단, a book by Orwell처럼 창작자, 수동태의 행위자를 표시해요. with는 함께 있는 사람, 가진 특징, 사용하는 도구를 나타내고 without은 부재를 뜻합니다. about은 말하기·생각하기·책·프로그램의 화제를 소개해요.',
        'On holiday/television/the phone/fire/time on bilan yodlanadigan holat va vosita birikmalaridir. At tezlik, harorat yoki yosh o‘lchovini ko‘rsatadi: at 50 kilometres an hour, at 100 degrees. By transport usulini, asar muallifini va passive dagi bajaruvchini bildiradi. With hamroh, xususiyat yoki asbobni, without esa yo‘qlikni bildiradi. About suhbat, fikr, kitob yoki dastur mavzusini tanishtiradi.',
        'Learn on holiday/television/the phone/fire/time as fixed state and medium expressions. At identifies a measured point such as speed, temperature, or age. By marks transport, the creator of a work, and the agent in a passive. With marks company, a feature someone has, or an instrument; without marks absence. About introduces the topic of speech, thought, a book, or a programme.',
        'Запомните on holiday/television/the phone/fire/time как устойчивые выражения состояния и средства. At обозначает показатель скорости, температуры или возраста. By указывает транспорт, автора произведения и деятеля в пассиве. With обозначает сопровождение, признак или инструмент, without — отсутствие. About вводит тему разговора, мысли, книги или программы.',
      ),
      rule: L(
        'on + 매체/상태 · at + 수치 · by + 수단/창작자 · with + 동반/도구 · about + 화제',
        'on + vosita/holat · at + o‘lchov · by + usul/muallif · with + hamroh/asbob · about + mavzu',
        'on + medium/state · at + measurement · by + means/creator · with + company/tool · about + topic',
        'on + средство/состояние · at + показатель · by + способ/автор · with + сопровождение/инструмент · about + тема',
      ),
      forms: [
        { base: 'state / medium', result: 'on holiday / on television' },
        { base: 'measurement', result: 'at 100 degrees' },
        { base: 'means / creator', result: 'by train / a book by Dickens' },
        { base: 'company / topic', result: 'with friends / talk about work' },
      ],
      drills: [
        d(
          'on holiday',
          '제인은 이번 주에 휴가 중이에요.',
          'Jeyn bu hafta ta’tilda.',
          'Джейн на этой неделе в отпуске.',
          [
            r('Jane is', 'Jane are', 'Is Jane'),
            r('on holiday', 'in holiday', 'at holiday'),
            r('this week.', 'on this week.', 'at this week.'),
          ],
        ),
        d(
          'on television',
          '우리는 텔레비전으로 뉴스를 봤어요.',
          'Biz yangiliklarni televizorda ko‘rdik.',
          'Мы смотрели новости по телевизору.',
          [
            r('We watched the news', 'We saw news at', 'We watched news in'),
            r('on television', 'in television', 'at television'),
            r('.', 'media.', 'there.'),
          ],
        ),
        d(
          'on the phone',
          '어젯밤 나는 캐럴과 전화로 이야기했어요.',
          'Kecha men Kerol bilan telefonda gaplashdim.',
          'Вчера вечером я разговаривал с Кэрол по телефону.',
          [
            r('I spoke to Carol', 'I spoke Carol', 'I was speak to Carol'),
            r('on the phone', 'in the phone', 'by the phone'),
            r('last night.', 'in last night.', 'on last night.'),
          ],
        ),
        d(
          'at 100 degrees',
          '물은 섭씨 100도에서 끓어요.',
          'Suv 100 darajada qaynaydi.',
          'Вода кипит при 100 градусах.',
          [
            r('Water boils', 'Water boil', 'Boils water'),
            r('at 100 degrees', 'in 100 degrees', 'on 100 degrees'),
            r('Celsius.', 'of Celsius.', 'Celsius at.'),
          ],
        ),
        d(
          'by train',
          '기차 여행을 좋아해요?',
          'Poyezdda sayohat qilishni yoqtirasizmi?',
          'Вы любите путешествовать на поезде?',
          [
            r(
              'Do you like travelling',
              'Do you like travel',
              'Are you like travelling',
            ),
            r('by train', 'with train', 'on train by'),
            r('?', 'often?', 'there?'),
          ],
        ),
        d(
          'on foot',
          '제인은 걸어서 출근해요.',
          'Jeyn ishga piyoda boradi.',
          'Джейн ходит на работу пешком.',
          [
            r('Jane goes to work', 'Jane go work', 'Jane goes work to'),
            r('on foot', 'by foot', 'with foot'),
            r('.', 'daily.', 'there.'),
          ],
        ),
        d(
          'by Charles Dickens',
          '찰스 디킨스가 쓴 책을 읽어 본 적이 있나요?',
          'Charlz Dikkens yozgan kitoblarni o‘qiganmisiz?',
          'Вы читали книги Чарльза Диккенса?',
          [
            r(
              'Have you read any books',
              'Did you read any books ever',
              'Have you read some book',
            ),
            r(
              'by Charles Dickens',
              'from Charles Dickens',
              'with Charles Dickens',
            ),
            r('?', 'before?', 'author?'),
          ],
        ),
        d(
          'with a pair of scissors',
          '나는 가위로 종이를 잘랐어요.',
          'Men qog‘ozni qaychi bilan kesdim.',
          'Я разрезал бумагу ножницами.',
          [
            r('I cut the paper', 'I cutted paper', 'I was cut the paper'),
            r(
              'with a pair of scissors',
              'by a pair of scissors',
              'from scissors',
            ),
            r('.', 'tool.', 'there.'),
          ],
        ),
        d(
          'without milk',
          '우유 없이 커피를 드시나요?',
          'Qahvani sutsiz ichasizmi?',
          'Вы пьёте кофе без молока?',
          [
            r(
              'Do you drink coffee',
              'Are you drink coffee',
              'Do you drinks coffee',
            ),
            r('without milk', 'with no of milk', 'by milk without'),
            r('?', 'usually?', 'there?'),
          ],
        ),
        d(
          'about computers',
          '어젯밤 컴퓨터에 관한 프로그램을 봤어요?',
          'Kecha kompyuterlar haqidagi dasturni ko‘rdingizmi?',
          'Вы смотрели вчера программу о компьютерах?',
          [
            r(
              'Did you see the programme',
              'Did you saw programme',
              'Have you see the programme',
            ),
            r('about computers', 'of computers', 'for computers about'),
            r('last night?', 'in last night?', 'on last night?'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Did you travel by plane?',
          '비행기로 여행했어요?',
          'Samolyotda sayohat qildingizmi?',
          'Вы летели самолётом?',
          'by plane',
        ),
        line(
          'Leo',
          'right',
          'No, I went by train with two friends.',
          '아니요, 친구 두 명과 기차로 갔어요.',
          'Yo‘q, ikki do‘stim bilan poyezdda bordim.',
          'Нет, я поехал поездом с двумя друзьями.',
          'by train with two friends',
        ),
      ],
      cautions: [
        caution(
          '교통수단은 by train이지만 도보는 on foot이라고 해요.',
          'Transport by train, lekin piyoda on foot deyiladi.',
          'Use by for transport, but say on foot.',
          'Для транспорта употребляйте by, но говорите on foot.',
        ),
        caution(
          '도구는 보통 with, 수동태의 행위자는 by를 써요.',
          'Asbob bilan with, passive bajaruvchisi bilan by ishlatiladi.',
          'Use with for an instrument and by for the agent of a passive.',
          'Для инструмента употребляйте with, для деятеля в пассиве — by.',
        ),
      ],
      similar: {
        pattern: 'adjective + preposition',
        note: L(
          '형용사마다 고정되는 전치사는 다음 Unit 105에서 배워요.',
          'Sifat bilan keladigan turg‘un ko‘makchilar keyingi Unit 105 da o‘rganiladi.',
          'The next Unit 105 covers prepositions fixed by particular adjectives.',
          'В следующем Unit 105 рассматриваются предлоги, закреплённые за прилагательными.',
        ),
      },
    },
    {
      sourceUnit: 105,
      code: 'en-general:grammar:u105-adjective-preposition-ing',
      pattern: 'afraid of · good at · preposition + -ing',
      summary: L(
        '형용사마다 정해진 전치사를 쓰고, 전치사 뒤에 동사가 오면 -ing형으로 바꿔요.',
        'Har bir sifatga mos ko‘makchi ishlatiladi; ko‘makchidan keyingi fe’l -ing shaklida keladi.',
        'Use the preposition selected by each adjective, and put a following verb in the -ing form.',
        'Используйте предлог, закреплённый за прилагательным, а следующий глагол ставьте в форме -ing.',
      ),
      categoryTag: L(
        '형용사 + 전치사',
        'Sifat + ko‘makchi',
        'Adjective + preposition',
        'Прилагательное + предлог',
      ),
      explanation: L(
        'afraid of, angry with/about, different from, fed up with, full of, good/bad at, interested in, married to처럼 형용사마다 함께 쓰는 전치사가 정해져 있어요. nice/kind of somebody to do는 그 행동을 한 사람을 평가하고, nice/kind to somebody는 그 사람을 대하는 태도를 말합니다. 전치사 뒤에 동작을 쓰면 “good at writing”, “sorry for not phoning”, “without saying”처럼 반드시 -ing형을 사용해요.',
        'Afraid of, angry with/about, different from, fed up with, full of, good/bad at, interested in, married to kabi har bir sifatning o‘z ko‘makchisi bor. Nice/kind of somebody to do ishni qilgan odamni baholaydi, nice/kind to somebody esa odamga munosabatni bildiradi. Ko‘makchidan keyin harakat kelsa, “good at writing”, “sorry for not phoning”, “without saying” kabi -ing shakli shart.',
        'Each adjective selects a partner: afraid of, angry with/about, different from, fed up with, full of, good/bad at, interested in, married to. Nice/kind of somebody to do evaluates the person who did the action; nice/kind to somebody describes treatment of that person. If a verb follows a preposition, it must use -ing: good at writing, sorry for not phoning, without saying.',
        'Каждое прилагательное выбирает свой предлог: afraid of, angry with/about, different from, fed up with, full of, good/bad at, interested in, married to. Nice/kind of somebody to do оценивает человека, совершившего действие, а nice/kind to somebody описывает отношение к человеку. После предлога глагол обязательно имеет форму -ing: good at writing, sorry for not phoning, without saying.',
      ),
      rule: L(
        '형용사 + 고정 전치사 · 전치사 + 동사-ing · nice/kind of 사람 to 동사',
        'sifat + turg‘un ko‘makchi · ko‘makchi + fe’l-ing · nice/kind of odam to fe’l',
        'adjective + fixed preposition · preposition + verb-ing · nice/kind of person to verb',
        'прилагательное + фиксированный предлог · предлог + глагол-ing · nice/kind of человек to глагол',
      ),
      forms: [
        { base: 'fear / interest', result: 'afraid of / interested in' },
        { base: 'skill', result: 'good at / bad at' },
        {
          base: 'person / event',
          result: 'angry with somebody / angry about something',
        },
        {
          base: 'verb after preposition',
          result: 'good at writing / without saying',
        },
      ],
      drills: [
        d(
          'afraid of dogs',
          '개를 무서워하나요?',
          'Itlardan qo‘rqasizmi?',
          'Вы боитесь собак?',
          [
            r('Are you', 'Do you', 'You are'),
            r('afraid of dogs', 'afraid from dogs', 'afraid at dogs'),
            r('?', 'really?', 'there?'),
          ],
        ),
        d(
          'angry with me',
          '왜 나에게 화가 났어요?',
          'Nega mendan jahlingiz chiqdi?',
          'Почему вы сердитесь на меня?',
          [
            r('Why are you', 'Why you are', 'Why do you are'),
            r('angry with me', 'angry to me', 'angry about me'),
            r('?', 'now?', 'there?'),
          ],
        ),
        d(
          'different from her sister',
          '앤은 언니와 아주 달라요.',
          'Enn opasidan juda farq qiladi.',
          'Энн очень отличается от сестры.',
          [
            r('Ann is very', 'Ann very is', 'Ann does very'),
            r(
              'different from her sister',
              'different than her sister',
              'different with her sister',
            ),
            r('.', 'person.', 'there.'),
          ],
        ),
        d(
          'fed up with my job',
          '나는 내 일에 질렸어요.',
          'Men ishimdan zerikdim.',
          'Мне надоела моя работа.',
          [
            r("I'm", 'I do', 'I have'),
            r('fed up with my job', 'fed up of my job', 'fed with up my job'),
            r('.', 'now.', 'really.'),
          ],
        ),
        d(
          'full of people',
          '방은 사람들로 가득했어요.',
          'Xona odamlar bilan to‘la edi.',
          'Комната была полна людей.',
          [
            r('The room was', 'The room were', 'Room the was'),
            r('full of people', 'full with people', 'filled of people'),
            r('.', 'inside.', 'there.'),
          ],
        ),
        d(
          'good at maths',
          '수학을 잘해요?',
          'Matematikadan yaxshimisiz?',
          'Вы хорошо знаете математику?',
          [
            r('Are you', 'Do you', 'You are'),
            r('good at maths', 'good in maths', 'good on maths'),
            r('?', 'skill?', 'really?'),
          ],
        ),
        d(
          'interested in sport',
          '나는 스포츠에 관심이 없어요.',
          'Men sportga qiziqmayman.',
          'Я не интересуюсь спортом.',
          [
            r("I'm not", 'I don’t', 'I not am'),
            r(
              'interested in sport',
              'interested on sport',
              'interesting in sport',
            ),
            r('.', 'topic.', 'there.'),
          ],
        ),
        d(
          'married to a dentist',
          '수는 치과의사와 결혼했어요.',
          'Syu tish shifokoriga turmushga chiqqan.',
          'Сью замужем за стоматологом.',
          [
            r('Sue is', 'Sue does', 'Sue has'),
            r(
              'married to a dentist',
              'married with a dentist',
              'married at a dentist',
            ),
            r('.', 'person.', 'now.'),
          ],
        ),
        d(
          'good at writing letters',
          '티나는 편지 쓰기를 잘해요.',
          'Tina xat yozishni yaxshi biladi.',
          'Тина хорошо пишет письма.',
          [
            r('Tina is', 'Tina does', 'Tina has'),
            r(
              'good at writing letters',
              'good at write letters',
              'good to writing letters',
            ),
            r('.', 'skill.', 'often.'),
          ],
        ),
        d(
          'without saying goodbye',
          '톰은 작별 인사도 없이 떠났어요.',
          'Tom xayrlashmasdan ketdi.',
          'Том ушёл, не попрощавшись.',
          [
            r('Tom left', 'Tom leave', 'Tom was left'),
            r(
              'without saying goodbye',
              'without to say goodbye',
              'without say goodbye',
            ),
            r('.', 'quietly.', 'then.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Are you interested in learning Spanish?',
          '스페인어 학습에 관심 있어요?',
          'Ispan tilini o‘rganishga qiziqasizmi?',
          'Вы интересуетесь изучением испанского?',
          'interested in learning',
        ),
        line(
          'Leo',
          'right',
          "Yes, but I'm bad at remembering new words.",
          '네, 하지만 새 단어를 기억하는 데 서툴러요.',
          'Ha, lekin yangi so‘zlarni eslab qolishda qiynalaman.',
          'Да, но я плохо запоминаю новые слова.',
          'bad at remembering',
        ),
      ],
      cautions: [
        caution(
          '전치사 뒤에는 to부정사가 아니라 -ing형을 써요.',
          'Ko‘makchidan keyin to-infinitive emas, -ing shakli keladi.',
          'After a preposition, use -ing, not a to-infinitive.',
          'После предлога употребляйте -ing, а не инфинитив с to.',
        ),
        caution(
          'married 뒤에는 with가 아니라 to가 와요: married to.',
          'Married dan keyin with emas, to keladi: married to.',
          'Use to, not with, after married: married to.',
          'После married употребляйте to, а не with: married to.',
        ),
      ],
      similar: {
        pattern: 'verb + preposition',
        note: L(
          '동사와 결합하는 전치사는 다음 Unit 106에서 따로 정리해요.',
          'Fe’l bilan keladigan ko‘makchilar keyingi Unit 106 da alohida jamlanadi.',
          'The next Unit 106 organises prepositions selected by verbs.',
          'В следующем Unit 106 систематизируются предлоги, выбираемые глаголами.',
        ),
      },
    },
    {
      sourceUnit: 106,
      code: 'en-general:grammar:u106-verb-preposition-partners',
      pattern: 'listen to · look at · wait for etc.',
      summary: L(
        'listen to, wait for, belong to처럼 동사마다 정해진 전치사를 함께 익혀요.',
        'Listen to, wait for, belong to kabi har bir fe’lning turg‘un ko‘makchisini birga o‘rganamiz.',
        'Learn the fixed preposition selected by each verb, as in listen to, wait for, and belong to.',
        'Учите закреплённый за каждым глаголом предлог: listen to, wait for, belong to.',
      ),
      categoryTag: L(
        '동사 + 전치사',
        'Fe’l + ko‘makchi',
        'Verb + preposition',
        'Глагол + предлог',
      ),
      explanation: L(
        'ask somebody for, belong/happen/listen/speak/write to, thank somebody for, wait for처럼 전치사까지 포함해 하나의 결합으로 외워야 해요. think about/of는 둘 다 가능하고, phone somebody는 전치사가 없습니다. look at은 시선을 향하다, look for는 찾다, look after는 돌보다라는 서로 다른 뜻이에요. depend는 반드시 on과 쓰지만 뒤에 what/where/how절이 오면 on을 생략할 수도 있습니다.',
        'Ask somebody for, belong/happen/listen/speak/write to, thank somebody for va wait for kabi birikmalarni ko‘makchisi bilan yodlash kerak. Think about/of ikkisi ham mumkin, phone somebody esa ko‘makchisiz ishlatiladi. Look at qaramoq, look for qidirmoq, look after g‘amxo‘rlik qilmoq degani. Depend doim on bilan keladi, ammo what/where/how gapi oldidan on tushishi mumkin.',
        'Memorise combinations including their preposition: ask somebody for, belong/happen/listen/speak/write to, thank somebody for, and wait for. Both think about and think of are possible, while phone somebody takes no preposition. Look at directs your eyes, look for means try to find, and look after means take care of. Depend normally takes on, though on may be omitted before a what/where/how clause.',
        'Запоминайте сочетания вместе с предлогом: ask somebody for, belong/happen/listen/speak/write to, thank somebody for, wait for. Возможны think about и think of, а phone somebody употребляется без предлога. Look at означает смотреть, look for — искать, look after — заботиться. Depend обычно требует on, хотя перед придаточным с what/where/how on можно опустить.',
      ),
      rule: L(
        '동사와 전치사를 한 묶음으로 암기 · phone + 사람은 전치사 없음 · depend on',
        'fe’l va ko‘makchini birga yodlash · phone + odam ko‘makchisiz · depend on',
        'memorise verb + preposition together · phone + person has no preposition · depend on',
        'запоминайте глагол + предлог вместе · phone + человек без предлога · depend on',
      ),
      forms: [
        { base: 'to', result: 'listen to / belong to / write to' },
        { base: 'for', result: 'ask for / wait for / thank for' },
        { base: 'look', result: 'look at / look for / look after' },
        { base: 'depend', result: 'depend on' },
      ],
      drills: [
        d(
          'for money',
          '한 남자가 내게 돈을 달라고 했어요.',
          'Bir erkak mendan pul so‘radi.',
          'Мужчина попросил у меня денег.',
          [
            r('A man asked me', 'A man asked to me', 'A man was ask me'),
            r('for money', 'of money', 'to money'),
            r('.', 'outside.', 'then.'),
          ],
        ),
        d(
          'belong to you',
          '이 책이 당신 것인가요?',
          'Bu kitob siznikimi?',
          'Эта книга принадлежит вам?',
          [
            r('Does this book', 'Is this book', 'Does this book is'),
            r('belong to you', 'belong you', 'belong for you'),
            r('?', 'really?', 'there?'),
          ],
        ),
        d(
          'happened to it',
          '내 펜에 무슨 일이 생겼나요?',
          'Ruchkamga nima bo‘ldi?',
          'Что случилось с моей ручкой?',
          [
            r('What has', 'What is', 'What did has'),
            r('happened to it', 'happened with it', 'happened it'),
            r('?', 'now?', 'there?'),
          ],
        ),
        d(
          'to this music',
          '이 음악을 들어 보세요.',
          'Bu musiqani tinglang.',
          'Послушайте эту музыку.',
          [
            r('Listen', 'Hear', 'Listening'),
            r('to this music', 'this music', 'at this music'),
            r('.', 'please.', 'now.'),
          ],
        ),
        d(
          'to Paul about the problem',
          '그 문제에 관해 폴과 이야기했어요?',
          'Muammo haqida Pol bilan gaplashdingizmi?',
          'Вы говорили с Полом о проблеме?',
          [
            r('Did you talk', 'Did you talked', 'Were you talk'),
            r(
              'to Paul about the problem',
              'with Paul for the problem',
              'Paul about to the problem',
            ),
            r('?', 'yesterday?', 'there?'),
          ],
        ),
        d(
          'for your help',
          '도와주셔서 정말 고마워요.',
          'Yordamingiz uchun katta rahmat.',
          'Большое спасибо за помощь.',
          [
            r('Thank you very much', 'Thanks you very much', 'Thank very you'),
            r('for your help', 'about your help', 'to your help'),
            r('.', 'kindly.', 'today.'),
          ],
        ),
        d(
          'about buying a new car',
          '마크는 새 차를 살 생각을 하고 있어요.',
          'Mark yangi mashina sotib olish haqida o‘ylayapti.',
          'Марк думает о покупке новой машины.',
          [
            r('Mark is thinking', 'Mark thinks now', 'Mark is think'),
            r(
              'about buying a new car',
              'about to buy a new car',
              'for buying a new car',
            ),
            r('.', 'now.', 'idea.'),
          ],
        ),
        d(
          'for me',
          '아직 가지 말고 나를 기다려 주세요.',
          'Hali ketmang, meni kuting.',
          'Не уходите, подождите меня.',
          [
            r("Don't go yet.", 'Not go yet.', "Don't yet go to."),
            r('Wait', 'Waiting', 'To wait'),
            r('for me', 'me', 'to me'),
            r('.', 'please.', 'here.'),
          ],
        ),
        d(
          'after her children',
          '바버라가 일할 때 친구가 아이들을 돌봐요.',
          'Barbara ishlaganda dugonasi bolalariga qaraydi.',
          'Когда Барбара работает, подруга присматривает за её детьми.',
          [
            r('A friend looks', 'A friend look', 'Looks a friend'),
            r('after her children', 'for her children', 'at her children'),
            r(
              'while Barbara works.',
              'during Barbara works.',
              'while Barbara work.',
            ),
          ],
        ),
        d(
          'on the restaurant',
          '때에 따라 달라요. 식당에 달렸어요.',
          'Bu vaziyatga bog‘liq. Restoranga qaraydi.',
          'Это зависит от ресторана.',
          [
            r('It depends', 'It depend', 'It is depend'),
            r('on the restaurant', 'of the restaurant', 'from the restaurant'),
            r('.', 'choice.', 'there.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'What are you looking for?',
          '무엇을 찾고 있어요?',
          'Nimani qidiryapsiz?',
          'Что вы ищете?',
          'looking for',
        ),
        line(
          'Leo',
          'right',
          'My keys. Can you look after my bag while I search?',
          '열쇠요. 찾는 동안 가방을 봐 줄래요?',
          'Kalitlarimni. Qidirayotganimda sumkamga qarab turasizmi?',
          'Ключи. Присмотрите за сумкой, пока я ищу?',
          'look after',
        ),
      ],
      cautions: [
        caution(
          'listen은 목적어 앞에 to가 필요하지만 phone은 전치사가 없어요.',
          'Listen dan keyin to kerak, phone esa ko‘makchisiz.',
          'Listen needs to before its object, but phone takes no preposition.',
          'После listen требуется to, а phone употребляется без предлога.',
        ),
        caution(
          'look at, look for, look after는 전치사에 따라 뜻이 완전히 달라져요.',
          'Look at, look for va look after ko‘makchiga qarab butunlay boshqa ma’no beradi.',
          'Look at, look for, and look after have different meanings determined by the particle.',
          'Look at, look for и look after имеют совершенно разные значения в зависимости от частицы.',
        ),
      ],
      similar: {
        pattern: 'phrasal verbs',
        note: L(
          '동사와 짧은 부사가 결합하는 구동사는 Unit 107~108에서 이어서 배워요.',
          'Fe’l va qisqa ravishdan tuzilgan phrasal verb Unit 107–108 da davom etadi.',
          'Units 107–108 continue with phrasal verbs made from a verb and a short particle.',
          'В Units 107–108 продолжается тема фразовых глаголов из глагола и короткой частицы.',
        ),
      },
    },
  ],
};
