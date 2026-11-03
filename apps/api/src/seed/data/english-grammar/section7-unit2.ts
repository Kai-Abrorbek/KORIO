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

export const ENGLISH_GRAMMAR_S7_U2: EnglishGrammarUnit = {
  section: 7,
  unit: 2,
  level: '6',
  title: L(
    '시간의 경계와 장소 전치사',
    'Vaqt chegaralari va joy ko‘makchilari',
    'Time boundaries and place prepositions',
    'Границы времени и предлоги места',
  ),
  description: L(
    'from·until·since·for로 기간을 말하고, before·after·during·while을 구분한 뒤 in·at·on으로 장소를 정확히 표현해요.',
    'From, until, since va for bilan davrni, before, after, during va while bilan vaqt munosabatini, in, at va on bilan joyni aniq ifodalaymiz.',
    'Express periods with from, until, since, and for; distinguish before, after, during, and while; then choose in, at, and on for place.',
    'Выражаем периоды с from, until, since и for, различаем before, after, during и while и точно выбираем in, at и on для места.',
  ),
  specs: [
    {
      sourceUnit: 97,
      code: 'en-general:grammar:u097-from-until-since-for',
      pattern: 'from ... to · until · since · for',
      summary: L(
        'from은 시작점, until은 끝점, since는 과거부터 지금까지의 시작점, for는 기간을 나타내요.',
        'From boshlanishni, until tugashni, since o‘tmishdan hozirgacha boshlanish nuqtasini, for esa davomiylikni bildiradi.',
        'From marks a start, until an end, since a past starting point continuing to now, and for a duration.',
        'From обозначает начало, until — конец, since — начальную точку периода до настоящего, for — продолжительность.',
      ),
      categoryTag: L(
        '기간 표현',
        'Davr ifodalari',
        'Period expressions',
        'Выражение периода',
      ),
      explanation: L(
        'from A to B는 시작과 끝을 모두 말하고 to 대신 until을 쓸 수도 있어요. until은 어떤 상태나 행동이 끝나는 시점까지 계속됨을 나타냅니다. since 뒤에는 과거의 시작점이 오며 현재완료와 함께 지금까지의 지속을 말해요. for 뒤에는 three days, a long time처럼 기간의 길이가 옵니다. 질문 “When?”에는 on Monday처럼 시점을, “How long?”에는 until Monday 또는 for three days처럼 경계나 기간을 답해요.',
        'From A to B boshlanish va tugashni ko‘rsatadi; to o‘rniga until ham bo‘ladi. Until holat yoki harakatning ma’lum paytgacha davom etishini bildiradi. Since dan keyin o‘tmishdagi boshlanish nuqtasi kelib, present perfect bilan hozirgacha davomiylikni ko‘rsatadi. For dan keyin three days yoki a long time kabi davr uzunligi keladi. “When?” savoliga on Monday, “How long?” savoliga until Monday yoki for three days javob bo‘ladi.',
        'From A to B gives both the start and end; until can replace to. Until says that a state or action continues up to an endpoint. Since takes a past starting point and combines with the present perfect to continue to now. For takes a length of time such as three days or a long time. Answer “When?” with a point such as on Monday, and “How long?” with a boundary or duration such as until Monday or for three days.',
        'From A to B указывает начало и конец; вместо to возможно until. Until показывает продолжение состояния или действия до конечной точки. После since ставится начальная точка в прошлом, а present perfect связывает её с настоящим. После for ставится длительность: three days, a long time. На “When?” отвечают точкой времени, например on Monday, а на “How long?” — границей или периодом: until Monday, for three days.',
      ),
      rule: L(
        'from + 시작 + to/until + 끝 · since + 시작점 · for + 기간',
        'from + boshlanish + to/until + tugash · since + boshlanish nuqtasi · for + davr',
        'from + start + to/until + end · since + starting point · for + duration',
        'from + начало + to/until + конец · since + начальная точка · for + длительность',
      ),
      forms: [
        { base: 'start and end', result: 'from Monday to Friday' },
        { base: 'endpoint', result: 'until Friday' },
        { base: 'past start to now', result: 'since 1990' },
        { base: 'duration', result: 'for three days' },
      ],
      drills: [
        d(
          'from Monday to Friday',
          '나는 월요일부터 금요일까지 일해요.',
          'Men dushanbadan jumagacha ishlayman.',
          'Я работаю с понедельника по пятницу.',
          [
            r('I work', 'I am work', 'I works'),
            r(
              'from Monday to Friday',
              'since Monday to Friday',
              'for Monday to Friday',
            ),
            r('.', 'week.', 'days.'),
          ],
        ),
        d(
          'until Friday',
          '그들은 금요일까지 떠나 있을 거예요.',
          'Ular jumagacha safarda bo‘ladi.',
          'Они будут в отъезде до пятницы.',
          [
            r("They'll be away", 'They away will', 'They are away will'),
            r('until Friday', 'on Friday until', 'for Friday'),
            r('.', 'then.', 'day.'),
          ],
        ),
        d(
          'until three o’clock',
          '나는 세 시까지 책을 읽었어요.',
          'Men soat uchgacha kitob o‘qidim.',
          'Я читал книгу до трёх часов.',
          [
            r('I read a book', 'I was read a book', 'I did readed a book'),
            r(
              'until three o’clock',
              'for three o’clock',
              'since three o’clock',
            ),
            r('.', 'time.', 'at.'),
          ],
        ),
        d(
          'till I come back',
          '내가 돌아올 때까지 여기서 기다리세요.',
          'Men qaytgunimcha shu yerda kuting.',
          'Подождите здесь, пока я не вернусь.',
          [
            r('Wait here', 'Waiting here', 'Wait at here'),
            r('till I come back', 'till I will come back', 'for I come back'),
            r('.', 'please till.', 'back.'),
          ],
        ),
        d(
          'since Monday',
          '존은 월요일부터 병원에 있어요.',
          'Jon dushanbadan beri kasalxonada.',
          'Джон находится в больнице с понедельника.',
          [
            r(
              'John has been in hospital',
              'John is in hospital since',
              'John has in hospital',
            ),
            r('since Monday', 'for Monday', 'from Monday since'),
            r('.', 'day.', 'ago.'),
          ],
        ),
        d(
          'since 1990',
          '우리는 1990년부터 프랑스에 살았어요.',
          'Biz 1990-yildan beri Fransiyada yashaymiz.',
          'Мы живём во Франции с 1990 года.',
          [
            r(
              "We've lived in France",
              'We live in France since',
              'We have live in France',
            ),
            r('since 1990', 'for 1990', 'from 1990 since'),
            r('.', 'year.', 'ago.'),
          ],
        ),
        d(
          'for three days',
          '조지는 우리와 사흘 동안 머물렀어요.',
          'Jorj biznikida uch kun qoldi.',
          'Джордж гостил у нас три дня.',
          [
            r(
              'George stayed with us',
              'George stay with us',
              'George was stayed us',
            ),
            r('for three days', 'since three days', 'during three days'),
            r('.', 'long.', 'ago.'),
          ],
        ),
        d(
          'for a few weeks',
          '나는 몇 주 동안 떠나 있을 거예요.',
          'Men bir necha haftaga ketaman.',
          'Я уезжаю на несколько недель.',
          [
            r("I'm going away", 'I going away', "I'm go away"),
            r('for a few weeks', 'since a few weeks', 'during a few weeks'),
            r('.', 'time.', 'long.'),
          ],
        ),
        d(
          'for the weekend',
          '나는 주말 동안 떠나 있어요.',
          'Men dam olish kunlariga ketaman.',
          'Я уезжаю на выходные.',
          [
            r("I'm going away", 'I go away now', "I'm away go"),
            r('for the weekend', 'since the weekend', 'during weekend for'),
            r('.', 'days.', 'then.'),
          ],
        ),
        d(
          'from 1982 until 1990',
          '우리는 1982년부터 1990년까지 캐나다에 살았어요.',
          'Biz 1982-yildan 1990-yilgacha Kanadada yashadik.',
          'Мы жили в Канаде с 1982 по 1990 год.',
          [
            r(
              'We lived in Canada',
              'We have lived Canada',
              'We were live in Canada',
            ),
            r(
              'from 1982 until 1990',
              'since 1982 until 1990',
              'for 1982 to 1990',
            ),
            r('.', 'years.', 'ago.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'How long have you lived here?',
          '여기서 얼마나 오래 살았어요?',
          'Bu yerda qancha vaqtdan beri yashaysiz?',
          'Как долго вы здесь живёте?',
          'How long',
        ),
        line(
          'Leo',
          'right',
          "I've lived here since 2022.",
          '2022년부터 여기 살았어요.',
          'Men bu yerda 2022-yildan beri yashayman.',
          'Я живу здесь с 2022 года.',
          'since 2022',
        ),
      ],
      cautions: [
        caution(
          '기간의 길이 앞에는 since가 아니라 for를 써요: for three days.',
          'Davr uzunligi oldidan since emas, for ishlating: for three days.',
          'Use for, not since, before a duration: for three days.',
          'Перед длительностью употребляйте for, а не since: for three days.',
        ),
        caution(
          'since는 현재까지 이어질 때 보통 현재완료와 함께 써요.',
          'Since hozirgacha davom etsa, odatda present perfect bilan keladi.',
          'Use since with the present perfect when the situation continues to now.',
          'Используйте since с present perfect, если ситуация продолжается до настоящего.',
        ),
      ],
      similar: {
        pattern: 'present perfect + for / since',
        note: L(
          '현재완료의 형태와 과거시제 비교는 Unit 18~20의 규칙을 함께 확인해요.',
          'Present perfect shakli va past simple farqi uchun Unit 18–20 qoidalarini ham ko‘ring.',
          'Review Units 18–20 for present-perfect form and its contrast with the past simple.',
          'Повторите Units 18–20 для формы present perfect и её отличия от past simple.',
        ),
      },
    },
    {
      sourceUnit: 98,
      code: 'en-general:grammar:u098-before-after-during-while',
      pattern: 'before / after / during / while',
      summary: L(
        'before·after는 앞뒤 관계, during + 명사는 사건 중, while + 절은 행동 중을 나타내요.',
        'Before va after oldin-keyin munosabatini, during + ot voqea davomida, while + gap esa harakat paytini bildiradi.',
        'Before and after show sequence; during + noun means within an event, while + clause means during an action.',
        'Before и after показывают последовательность; during + существительное — во время события, while + предложение — во время действия.',
      ),
      categoryTag: L(
        '시간 연결',
        'Vaqt bog‘lanishi',
        'Time links',
        'Временная связь',
      ),
      explanation: L(
        'before와 after 뒤에는 명사, 완전한 절, 또는 -ing형을 쓸 수 있어요. during 뒤에는 the film, the meal처럼 명사가 오고, while 뒤에는 we were eating처럼 주어와 동사가 옵니다. 기간의 길이는 during이 아니라 for로 표현해요. before/after 다음에 동작을 바로 붙일 때는 to부정사가 아니라 -ing를 씁니다.',
        'Before va after dan keyin ot, to‘liq gap yoki -ing shakli kelishi mumkin. During dan keyin the film, the meal kabi ot, while dan keyin esa we were eating kabi ega va fe’l keladi. Davr uzunligi during bilan emas, for bilan aytiladi. Before/after dan keyin harakat bevosita kelsa, to emas, -ing ishlatiladi.',
        'Before and after can take a noun, a full clause, or an -ing form. During takes a noun such as the film or the meal, whereas while takes a subject and verb such as we were eating. Use for, not during, for a length of time. When a verb directly follows before or after, use -ing, not an infinitive with to.',
        'После before и after возможны существительное, полное предложение или форма -ing. После during ставится существительное, например the film, the meal, а после while — подлежащее и глагол, например we were eating. Для длительности употребляйте for, а не during. Если сразу после before/after идёт глагол, используйте -ing, а не инфинитив с to.',
      ),
      rule: L(
        'during + 명사 · while + 주어 + 동사 · before/after + 명사/절/-ing · for + 기간',
        'during + ot · while + ega + fe’l · before/after + ot/gap/-ing · for + davr',
        'during + noun · while + subject + verb · before/after + noun/clause/-ing · for + duration',
        'during + существительное · while + подлежащее + глагол · before/after + существительное/предложение/-ing · for + период',
      ),
      forms: [
        { base: 'event noun', result: 'during the film' },
        { base: 'action clause', result: 'while we were eating' },
        { base: 'sequence clause', result: 'before you go out' },
        { base: '-ing form', result: 'after doing the shopping' },
      ],
      drills: [
        d(
          'before exams',
          '모두 시험 전에 긴장해요.',
          'Hamma imtihonlardan oldin hayajonlanadi.',
          'Все нервничают перед экзаменами.',
          [
            r(
              'Everybody is nervous',
              'Everybody are nervous',
              'Everybody nervous is',
            ),
            r('before exams', 'during exams before', 'while exams'),
            r('.', 'time.', 'days.'),
          ],
        ),
        d(
          'during the film',
          '나는 영화 도중에 잠들었어요.',
          'Men film paytida uxlab qoldim.',
          'Я уснул во время фильма.',
          [
            r('I fell asleep', 'I fall asleep', 'I was fall asleep'),
            r('during the film', 'while the film', 'for the film'),
            r('.', 'then.', 'time.'),
          ],
        ),
        d(
          'after our visit',
          '우리는 박물관 방문 후 피곤했어요.',
          'Muzeyga tashrifdan keyin charchadik.',
          'Мы устали после посещения музея.',
          [
            r('We were tired', 'We was tired', 'We tired were'),
            r('after our visit', 'during our visit after', 'while our visit'),
            r('to the museum.', 'at the museum to.', 'museum the.'),
          ],
        ),
        d(
          'before you go out',
          '외출하기 전에 창문을 닫는 것을 잊지 마세요.',
          'Tashqariga chiqishdan oldin derazani yopishni unutmang.',
          'Не забудьте закрыть окно перед выходом.',
          [
            r(
              "Don't forget to close the window",
              "Don't forget close window",
              'Not forget to close the window',
            ),
            r(
              'before you go out',
              'before you will go out',
              'during you go out',
            ),
            r('.', 'please before.', 'outside.'),
          ],
        ),
        d(
          "while I'm watching television",
          '나는 텔레비전을 보다가 자주 잠들어요.',
          'Men televizor ko‘rayotganda tez-tez uxlab qolaman.',
          'Я часто засыпаю, пока смотрю телевизор.',
          [
            r(
              'I often fall asleep',
              'I fall often asleep',
              'I am often fall asleep',
            ),
            r(
              "while I'm watching television",
              'during I watch television',
              'while watching television I am',
            ),
            r('.', 'then.', 'time.'),
          ],
        ),
        d(
          'after doing the shopping',
          '쇼핑을 마친 후 그들은 집에 갔어요.',
          'Xaridni tugatgach, ular uyga ketdi.',
          'После покупок они пошли домой.',
          [
            r('They went home', 'They go home', 'They went to home'),
            r(
              'after doing the shopping',
              'after to do the shopping',
              'during doing shopping',
            ),
            r('.', 'then.', 'later after.'),
          ],
        ),
        d(
          'during the meal',
          '우리는 식사 중에 말하지 않았어요.',
          'Biz ovqat paytida gaplashmadik.',
          'Мы не разговаривали во время еды.',
          [
            r("We didn't speak", "We don't spoke", 'We not speak'),
            r('during the meal', 'while the meal', 'for the meal'),
            r('.', 'time.', 'then.'),
          ],
        ),
        d(
          'while we were eating',
          '우리는 먹는 동안 말하지 않았어요.',
          'Biz ovqatlanayotganimizda gaplashmadik.',
          'Мы не разговаривали, пока ели.',
          [
            r("We didn't speak", "We didn't spoke", 'We not spoke'),
            r(
              'while we were eating',
              'during we were eating',
              'while the eating',
            ),
            r('.', 'then.', 'time.'),
          ],
        ),
        d(
          'for two hours',
          '우리는 두 시간 동안 테니스를 쳤어요.',
          'Biz ikki soat tennis o‘ynadik.',
          'Мы играли в теннис два часа.',
          [
            r('We played tennis', 'We play tennis', 'We were played tennis'),
            r('for two hours', 'during two hours', 'since two hours'),
            r('.', 'long.', 'time.'),
          ],
        ),
        d(
          'before eating the apple',
          '나는 사과를 먹기 전에 조심해서 씻었어요.',
          'Olmani yeyishdan oldin uni yaxshilab yuvdim.',
          'Перед тем как съесть яблоко, я тщательно его вымыл.',
          [
            r(
              'I washed it carefully',
              'I carefully was wash it',
              'I washed careful it',
            ),
            r(
              'before eating the apple',
              'before to eat the apple',
              'during eating the apple',
            ),
            r('.', 'first.', 'then before.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Leo',
          'left',
          'Did you call Mina during the meeting?',
          '회의 중에 미나에게 전화했어요?',
          'Yig‘ilish paytida Minaga qo‘ng‘iroq qildingizmi?',
          'Вы звонили Мине во время совещания?',
          'during the meeting',
        ),
        line(
          'Sara',
          'right',
          'No, I called her after leaving the office.',
          '아니요, 사무실을 나간 후 전화했어요.',
          'Yo‘q, ofisdan chiqqandan keyin qo‘ng‘iroq qildim.',
          'Нет, я позвонила ей после выхода из офиса.',
          'after leaving',
        ),
      ],
      cautions: [
        caution(
          'during 뒤에는 절이 아니라 명사를 써요: during the meal.',
          'During dan keyin gap emas, ot keladi: during the meal.',
          'Put a noun, not a clause, after during: during the meal.',
          'После during ставьте существительное, а не предложение: during the meal.',
        ),
        caution(
          '기간의 길이는 during이 아니라 for로 말해요: for two hours.',
          'Davr uzunligini during emas, for bilan ayting: for two hours.',
          'Use for, not during, for a duration: for two hours.',
          'Для длительности употребляйте for, а не during: for two hours.',
        ),
      ],
      similar: {
        pattern: 'when',
        note: L(
          'when은 특정 사건이 일어난 때를 연결하며 Unit 110에서 미래절까지 확장해요.',
          'When aniq voqea vaqtini bog‘laydi va Unit 110 da kelasi zamon gaplariga kengayadi.',
          'When links the time of an event and is extended to future clauses in Unit 110.',
          'When связывает время события и в Unit 110 распространяется на будущие придаточные.',
        ),
      },
    },
    {
      sourceUnit: 99,
      code: 'en-general:grammar:u099-in-at-on-places-one',
      pattern: 'in a room · at the bus stop · on the wall',
      summary: L(
        '경계 안은 in, 지점은 at, 표면 위나 붙어 있는 위치는 on으로 표현해요.',
        'Chegara ichida in, nuqtada at, yuza ustida yoki unga tegib turganda on ishlatiladi.',
        'Use in for an enclosed area, at for a point, and on for a surface or attached position.',
        'Используйте in для пространства внутри границ, at для точки и on для поверхности или прикреплённого положения.',
      ),
      categoryTag: L(
        '장소 전치사',
        'Joy ko‘makchilari',
        'Place prepositions',
        'Предлоги места',
      ),
      explanation: L(
        'in은 방·상자·도시·나라처럼 경계 안에 있는 위치를 나타내요. at은 버스 정류장, 문, 신호등, 책상처럼 한 지점이나 활동 위치를 가리킵니다. on은 선반·벽·바닥·접시처럼 표면과 닿아 있는 위치예요. at the top/bottom/end는 전체에서 특정 지점을 말하고, on a bicycle/horse처럼 올라타 있는 상태에도 on을 씁니다.',
        'In xona, quti, shahar yoki mamlakat kabi chegara ichidagi joyni bildiradi. At bekat, eshik, svetofor yoki stol kabi aniq nuqtani ko‘rsatadi. On tokcha, devor, pol yoki likopcha kabi yuzaga tegib turishni bildiradi. At the top/bottom/end butunning aniq nuqtasi uchun, on a bicycle/horse esa ustida bo‘lish uchun ishlatiladi.',
        'In locates something inside an area such as a room, box, city, or country. At points to a location such as a bus stop, door, traffic light, or desk. On means in contact with a surface such as a shelf, wall, floor, or plate. Use at the top/bottom/end for a specific point in a whole, and on for being mounted on a bicycle or horse.',
        'In обозначает положение внутри комнаты, коробки, города или страны. At указывает точку: остановку, дверь, светофор, стол. On означает контакт с поверхностью: полкой, стеной, полом, тарелкой. At the top/bottom/end обозначает конкретную точку целого, а on употребляется также при нахождении на велосипеде или лошади.',
      ),
      rule: L(
        'in + 내부/영역 · at + 지점 · on + 표면',
        'in + ichki hudud · at + nuqta · on + yuza',
        'in + inside/area · at + point · on + surface',
        'in + внутри/область · at + точка · on + поверхность',
      ),
      forms: [
        { base: 'inside', result: 'in the kitchen' },
        { base: 'area', result: 'in London' },
        { base: 'point', result: 'at the bus stop' },
        { base: 'surface', result: 'on the shelf' },
      ],
      drills: [
        d(
          'in the kitchen',
          '데이비드는 부엌에 있어요.',
          'Devid oshxonada.',
          'Дэвид на кухне.',
          [
            r('David is', 'David are', 'Is David'),
            r('in the kitchen', 'at the kitchen', 'on the kitchen'),
            r('.', 'room.', 'inside in.'),
          ],
        ),
        d(
          'in the garden',
          '아이들은 정원에 있어요.',
          'Bolalar bog‘da.',
          'Дети в саду.',
          [
            r('The children are', 'The children is', 'Children the are'),
            r('in the garden', 'at the garden', 'on the garden'),
            r('.', 'outside.', 'there in.'),
          ],
        ),
        d(
          'in London',
          '안젤라는 런던에서 일해요.',
          'Anjela Londonda ishlaydi.',
          'Анджела работает в Лондоне.',
          [
            r('Angela works', 'Angela work', 'Works Angela'),
            r('in London', 'at London', 'on London'),
            r('.', 'city.', 'there.'),
          ],
        ),
        d(
          'in that box',
          '저 상자 안에 무엇이 있나요?',
          'U qutida nima bor?',
          'Что находится в той коробке?',
          [
            r("What's", 'What are', 'What does'),
            r('in that box', 'at that box', 'on that box'),
            r('?', 'inside?', 'there?'),
          ],
        ),
        d(
          'in a shop',
          '미나는 가게에서 일해요.',
          'Mina do‘konda ishlaydi.',
          'Мина работает в магазине.',
          [
            r('Mina works', 'Mina work', 'Mina is work'),
            r('in a shop', 'at a shop', 'on a shop'),
            r('downtown.', 'in downtown.', 'at downtown.'),
          ],
        ),
        d(
          'in the river',
          '우리는 강에서 수영했어요.',
          'Biz daryoda suzdik.',
          'Мы плавали в реке.',
          [
            r('We swam', 'We swimmed', 'We were swim'),
            r('in the river', 'at the river', 'on the river'),
            r('yesterday.', 'at yesterday.', 'the yesterday.'),
          ],
        ),
        d(
          'in the north of Italy',
          '밀라노는 이탈리아 북부에 있어요.',
          'Milan Italiyaning shimolida.',
          'Милан находится на севере Италии.',
          [
            r('Milan is', 'Milan are', 'Is Milan'),
            r(
              'in the north of Italy',
              'at the north of Italy',
              'on north Italy',
            ),
            r('.', 'there.', 'region.'),
          ],
        ),
        d(
          'at the bus stop',
          '버스 정류장에 누군가 있어요.',
          'Bekatda kimdir bor.',
          'На автобусной остановке кто-то есть.',
          [
            r("There's somebody", 'There are somebody', 'Somebody there is'),
            r('at the bus stop', 'in the bus stop', 'on the bus stop'),
            r('.', 'waiting.', 'there at.'),
          ],
        ),
        d(
          'at the top',
          '페이지 위쪽에 이름을 쓰세요.',
          'Ismingizni sahifaning yuqorisiga yozing.',
          'Напишите имя в верхней части страницы.',
          [
            r('Write your name', 'Writing your name', 'Write you name'),
            r('at the top', 'in the top', 'on top at'),
            r('of the page.', 'from the page.', 'the page of.'),
          ],
        ),
        d(
          'on the shelf',
          '선반 위에 책이 몇 권 있어요.',
          'Tokchada bir nechta kitob bor.',
          'На полке есть несколько книг.',
          [
            r(
              'There are some books',
              'There is some books',
              'Some books there are',
            ),
            r('on the shelf', 'in the shelf', 'at the shelf'),
            r('.', 'there.', 'surface.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Are the keys in the drawer?',
          '열쇠가 서랍 안에 있나요?',
          'Kalitlar tortmadami?',
          'Ключи в ящике?',
          'in the drawer',
        ),
        line(
          'Leo',
          'right',
          'No, they are on the table by the door.',
          '아니요, 문 옆 탁자 위에 있어요.',
          'Yo‘q, ular eshik yonidagi stol ustida.',
          'Нет, они на столе у двери.',
          'on the table',
        ),
      ],
      cautions: [
        caution(
          '도시와 나라 안의 위치에는 보통 in을 써요: in London, in France.',
          'Shahar va mamlakat ichidagi joy uchun in ishlating: in London, in France.',
          'Use in for location within a city or country: in London, in France.',
          'Для положения в городе или стране употребляйте in: in London, in France.',
        ),
        caution(
          '표면에 닿아 있으면 on을 써요: on the wall, on the floor.',
          'Yuzaga tegib tursa on ishlating: on the wall, on the floor.',
          'Use on for contact with a surface: on the wall, on the floor.',
          'При контакте с поверхностью употребляйте on: on the wall, on the floor.',
        ),
      ],
      similar: {
        pattern: 'at / on / in (time)',
        note: L(
          '시간 전치사는 Unit 96에서 시각·요일·기간에 따라 선택했어요.',
          'Vaqt ko‘makchilari Unit 96 da soat, kun va davrga ko‘ra tanlanadi.',
          'Unit 96 chooses time prepositions by clock time, day, and longer period.',
          'В Unit 96 предлоги времени выбираются по точному времени, дню и более длинному периоду.',
        ),
      },
    },
    {
      sourceUnit: 100,
      code: 'en-general:grammar:u100-in-at-on-fixed-places',
      pattern: 'in bed · at home · on the bus',
      summary: L(
        '생활 장소와 이동수단에는 in bed, at home, on the bus처럼 정해진 조합이 있어요.',
        'Kundalik joylar va transport bilan in bed, at home, on the bus kabi turg‘un birikmalar ishlatiladi.',
        'Everyday places and transport use fixed combinations such as in bed, at home, and on the bus.',
        'Для повседневных мест и транспорта используются устойчивые сочетания: in bed, at home, on the bus.',
      ),
      categoryTag: L(
        '고정 장소 표현',
        'Turg‘un joy birikmalari',
        'Fixed place expressions',
        'Устойчивые выражения места',
      ),
      explanation: L(
        'in bed, in hospital, in prison은 그 장소의 일반적인 상태나 목적 안에 있음을 말해요. at home/work/school/university는 활동 지점을 나타냅니다. 사람의 집이나 서비스 장소는 at Jane’s, at the doctor’s처럼 소유격으로 표현할 수 있어요. 행사에는 at a party/concert를, 대중교통과 층에는 on a bus, on the first floor를 씁니다. 길을 가는 중은 on the way라고 해요.',
        'In bed, in hospital va in prison joyning odatiy holati yoki vazifasi ichida bo‘lishni bildiradi. At home/work/school/university faoliyat nuqtasini ko‘rsatadi. Odamning uyi yoki xizmat joyi at Jane’s, at the doctor’s kabi egalik shaklida aytiladi. Tadbirda at a party/concert, jamoat transporti va qavatda on a bus, on the first floor ishlatiladi. Yo‘lda bo‘lish on the way deyiladi.',
        'In bed, in hospital, and in prison describe being in the normal state or purpose of those places. At home/work/school/university marks an activity point. A person’s home or a service location can use the possessive: at Jane’s, at the doctor’s. Use at for events, on for public transport and floors, and on the way for a journey in progress.',
        'In bed, in hospital и in prison описывают нахождение в обычном состоянии или назначении места. At home/work/school/university обозначает место деятельности. Дом человека или место услуги выражается притяжательной формой: at Jane’s, at the doctor’s. Для мероприятий употребляется at, для общественного транспорта и этажей — on, а путь выражается on the way.',
      ),
      rule: L(
        'in bed/hospital · at home/work/행사 · on 교통수단/층/길',
        'in bed/hospital · at home/work/tadbir · on transport/qavat/yo‘l',
        'in bed/hospital · at home/work/events · on transport/floors/the way',
        'in bed/hospital · at home/work/мероприятие · on транспорт/этаж/путь',
      ),
      forms: [
        { base: 'state / institution', result: 'in bed / in hospital' },
        { base: 'activity point', result: 'at home / at work' },
        { base: 'event', result: 'at a party' },
        {
          base: 'transport / floor',
          result: 'on the bus / on the first floor',
        },
      ],
      drills: [
        d(
          'in bed',
          '케이트는 침대에 있어요.',
          'Keyt yotoqda.',
          'Кейт в постели.',
          [
            r('Kate is', 'Kate are', 'Is Kate'),
            r('in bed', 'on bed', 'at the bed'),
            r('.', 'sleep.', 'there.'),
          ],
        ),
        d(
          'in hospital',
          '데이비드의 아버지는 병원에 있어요.',
          'Devidning otasi kasalxonada.',
          'Отец Дэвида находится в больнице.',
          [
            r("David's father is", 'David father are', 'Davids father is'),
            r('in hospital', 'at hospital', 'on the hospital'),
            r('.', 'ill.', 'there.'),
          ],
        ),
        d(
          'in the newspaper',
          '나는 신문에서 그 사고에 대해 읽었어요.',
          'Men hodisa haqida gazetada o‘qidim.',
          'Я прочитал об аварии в газете.',
          [
            r(
              'I read about the accident',
              'I read the accident about',
              'I was read about accident',
            ),
            r('in the newspaper', 'on the newspaper', 'at the newspaper'),
            r('.', 'today.', 'there.'),
          ],
        ),
        d(
          'in this photograph',
          '이 사진에서 당신은 슬퍼 보여요.',
          'Bu suratda siz xafa ko‘rinasiz.',
          'На этой фотографии вы выглядите грустным.',
          [
            r('You look sad', 'You are look sad', 'You look sadly'),
            r('in this photograph', 'on this photograph', 'at this photograph'),
            r('.', 'there.', 'image.'),
          ],
        ),
        d(
          'at home',
          '오늘 저녁에 집에 있을 거예요?',
          'Bugun kechqurun uyda bo‘lasizmi?',
          'Вы будете дома сегодня вечером?',
          [
            r('Will you be', 'Do you will be', 'Will be you'),
            r('at home', 'in home', 'on the home'),
            r('this evening?', 'at this evening?', 'on this evening?'),
          ],
        ),
        d(
          "at my sister's",
          '어제 나는 언니 집에 있었어요.',
          'Kecha men opamnikida edim.',
          'Вчера я был у сестры.',
          [
            r('I was', 'I were', 'I did be'),
            r("at my sister's", "in my sister's", 'at my sister'),
            r('yesterday.', 'at yesterday.', 'the yesterday.'),
          ],
        ),
        d(
          'at the party',
          '파티에 사람이 많지 않았어요.',
          'Bazmda odam ko‘p emas edi.',
          'На вечеринке было немного людей.',
          [
            r(
              "There weren't many people",
              "There wasn't many people",
              'Not many people were there',
            ),
            r('at the party', 'in the party', 'on the party'),
            r('.', 'event.', 'there.'),
          ],
        ),
        d(
          'on the bus',
          '버스를 타고 여기 왔어요?',
          'Bu yerga avtobusda keldingizmi?',
          'Вы приехали сюда на автобусе?',
          [
            r('Did you come here', 'Did you came here', 'Were you come here'),
            r('on the bus', 'in the bus', 'at the bus'),
            r('?', 'today?', 'there?'),
          ],
        ),
        d(
          'on the first floor',
          '사무실은 1층에 있어요.',
          'Ofis birinchi qavatda.',
          'Офис находится на первом этаже.',
          [
            r('The office is', 'The office are', 'Office the is'),
            r('on the first floor', 'in the first floor', 'at first floor'),
            r('.', 'there.', 'building.'),
          ],
        ),
        d(
          'on the way home',
          '나는 집에 가는 길에 앤을 만났어요.',
          'Uyga ketayotib Ennni uchratdim.',
          'По дороге домой я встретил Энн.',
          [
            r('I met Ann', 'I meet Ann', 'I was met Ann'),
            r('on the way home', 'in the way home', 'on the home way'),
            r('.', 'yesterday.', 'there.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Where is Leo?',
          '레오는 어디에 있어요?',
          'Leo qayerda?',
          'Где Лео?',
          'Where',
        ),
        line(
          'Sara',
          'right',
          "He's on the train, on his way home.",
          '기차를 타고 집에 오는 중이에요.',
          'U poyezdda, uyga kelyapti.',
          'Он в поезде, едет домой.',
          'on the train',
        ),
      ],
      cautions: [
        caution(
          '층에는 in이 아니라 on을 써요: on the first floor.',
          'Qavat bilan in emas, on ishlating: on the first floor.',
          'Use on, not in, for a floor: on the first floor.',
          'С этажом употребляйте on, а не in: on the first floor.',
        ),
        caution(
          '대중교통에는 보통 on, 승용차·택시에는 in을 써요.',
          'Jamoat transportida odatda on, mashina va taksida in ishlatiladi.',
          'Normally use on for public transport, but in for a car or taxi.',
          'Обычно употребляйте on с общественным транспортом, но in с автомобилем или такси.',
        ),
      ],
      similar: {
        pattern: 'go home · at home',
        note: L(
          '이동과 도착에 필요한 to/in/at은 다음 Unit 101에서 정리해요.',
          'Harakat va yetib borishdagi to/in/at keyingi Unit 101 da jamlanadi.',
          'The next Unit 101 organises to, in, and at for movement and arrival.',
          'В следующем Unit 101 систематизируются to, in и at при движении и прибытии.',
        ),
      },
    },
    {
      sourceUnit: 101,
      code: 'en-general:grammar:u101-to-in-at-movement',
      pattern: 'go to · be in/at · arrive in/at · get to',
      summary: L(
        '이동에는 to, 머무는 위치에는 in/at을 쓰고, arrive와 home에는 특별한 전치사 규칙이 있어요.',
        'Harakatda to, joylashuvda in/at ishlatiladi; arrive va home bilan maxsus qoidalar bor.',
        'Use to for movement and in/at for location, with special rules for arrive and home.',
        'Для движения употребляйте to, для положения — in/at; у arrive и home есть особые правила.',
      ),
      categoryTag: L(
        '이동과 위치',
        'Harakat va joylashuv',
        'Movement and location',
        'Движение и местонахождение',
      ),
      explanation: L(
        'go/come/walk/return 뒤에 목적지를 말할 때 to를 써요. 그 장소에 있는 상태는 큰 영역이면 in, 지점이면 at을 씁니다. home은 예외라서 go home, arrive home처럼 이동할 때 to를 쓰지 않고, 위치는 at home이라고 해요. arrive는 나라·도시 앞에서 in, 그 밖의 지점 앞에서 at을 쓰며 to는 쓰지 않습니다. get은 get to + 장소이지만 get home에는 to가 없어요.',
        'Go/come/walk/return dan keyin manzil oldidan to keladi. Joyda bo‘lishda katta hudud bilan in, nuqta bilan at ishlatiladi. Home istisno: go home va arrive home da to yo‘q, joylashuvda at home deyiladi. Arrive mamlakat yoki shahar bilan in, boshqa joy bilan at oladi va to olmaydi. Get esa get to + joy, lekin get home shaklida to yo‘q.',
        'Use to after go, come, walk, or return when naming a destination. For location, use in with a larger area and at with a point. Home is exceptional: say go home and arrive home with no to, but at home for location. Arrive takes in before a country or city and at before other places, never to. Get normally uses get to + place, but get home has no to.',
        'После go, come, walk и return перед местом назначения ставится to. Для положения используйте in с большой областью и at с точкой. Home — исключение: go home и arrive home без to, но at home для местонахождения. Arrive требует in перед страной или городом и at перед другим местом, но не to. Get обычно употребляется как get to + место, однако get home — без to.',
      ),
      rule: L(
        'go/come + to · be + in/at · arrive in 도시/나라 · arrive at 지점 · go/get/arrive home',
        'go/come + to · be + in/at · arrive in shahar/mamlakat · arrive at nuqta · go/get/arrive home',
        'go/come + to · be + in/at · arrive in city/country · arrive at point · go/get/arrive home',
        'go/come + to · be + in/at · arrive in город/страна · arrive at точка · go/get/arrive home',
      ),
      forms: [
        { base: 'movement', result: 'go to London' },
        { base: 'location', result: 'be in London / be at the airport' },
        { base: 'arrival', result: 'arrive in England / arrive at the hotel' },
        { base: 'home', result: 'go home / get home / be at home' },
      ],
      drills: [
        d(
          'to London',
          '우리는 다음 주에 런던에 가요.',
          'Biz keyingi hafta Londonga boramiz.',
          'На следующей неделе мы едем в Лондон.',
          [
            r("We're going", 'We going', "We're go"),
            r('to London', 'in London', 'at London'),
            r('next week.', 'on next week.', 'in next week.'),
          ],
        ),
        d(
          'to the airport',
          '버스가 공항으로 가고 있어요.',
          'Avtobus aeroportga ketyapti.',
          'Автобус едет в аэропорт.',
          [
            r('The bus is going', 'The bus going', 'The bus goes now'),
            r('to the airport', 'at the airport', 'in the airport'),
            r('.', 'there.', 'place.'),
          ],
        ),
        d(
          'to bed',
          '몇 시에 잠자리에 들어요?',
          'Soat nechada uxlashga yotasiz?',
          'Во сколько вы ложитесь спать?',
          [
            r(
              'What time do you go',
              'What time you go',
              'What time are you go',
            ),
            r('to bed', 'in bed', 'at the bed'),
            r('?', 'night?', 'time?'),
          ],
        ),
        d(
          'in Italy',
          '우리 형은 이탈리아에 살아요.',
          'Akam Italiyada yashaydi.',
          'Мой брат живёт в Италии.',
          [
            r('My brother lives', 'My brother live', 'Lives my brother'),
            r('in Italy', 'at Italy', 'to Italy'),
            r('.', 'there.', 'country.'),
          ],
        ),
        d(
          'at a party',
          '나는 파티에서 그녀를 만났어요.',
          'Men uni bazmda uchratdim.',
          'Я встретил её на вечеринке.',
          [
            r('I met her', 'I meet her', 'I was meet her'),
            r('at a party', 'in a party', 'to a party'),
            r('.', 'there.', 'event.'),
          ],
        ),
        d(
          'home',
          '나는 피곤해서 집에 가요.',
          'Men charchadim, uyga ketyapman.',
          'Я устал, поэтому иду домой.',
          [
            r(
              "I'm tired, so I'm going",
              "I'm tired, so I go to",
              "I'm tired, going to",
            ),
            r('home', 'to home', 'at home'),
            r('.', 'now.', 'there.'),
          ],
        ),
        d(
          'at home',
          '나는 오늘 저녁에 집에 있을 거예요.',
          'Men bugun kechqurun uyda qolaman.',
          'Сегодня вечером я останусь дома.',
          [
            r("I'm staying", 'I staying', "I'm stay"),
            r('at home', 'in home', 'to home'),
            r('this evening.', 'at this evening.', 'on this evening.'),
          ],
        ),
        d(
          'in England',
          '그들은 지난주에 영국에 도착했어요.',
          'Ular o‘tgan hafta Angliyaga yetib keldi.',
          'Они прибыли в Англию на прошлой неделе.',
          [
            r('They arrived', 'They arrive', 'They were arrive'),
            r('in England', 'at England', 'to England'),
            r('last week.', 'in last week.', 'on last week.'),
          ],
        ),
        d(
          'at the hotel',
          '몇 시에 호텔에 도착했어요?',
          'Mehmonxonaga soat nechada yetib keldingiz?',
          'Во сколько вы прибыли в отель?',
          [
            r(
              'What time did you arrive',
              'What time you arrived',
              'What time did you arrived',
            ),
            r('at the hotel', 'in the hotel', 'to the hotel'),
            r('?', 'there?', 'time?'),
          ],
        ),
        d(
          'to Paris',
          '파리에 몇 시에 도착했어요?',
          'Parijga soat nechada yetib keldingiz?',
          'Во сколько вы добрались до Парижа?',
          [
            r(
              'What time did you get',
              'What time you got',
              'What time did you got',
            ),
            r('to Paris', 'in Paris', 'at Paris'),
            r('?', 'there?', 'time?'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'When did you arrive in Seoul?',
          '서울에는 언제 도착했어요?',
          'Seulga qachon yetib keldingiz?',
          'Когда вы прибыли в Сеул?',
          'arrive in Seoul',
        ),
        line(
          'Leo',
          'right',
          'I got to the station at six and arrived home at seven.',
          '여섯 시에 역에 도착했고 일곱 시에 집에 왔어요.',
          'Soat oltida bekatga yetdim, yettida uyga keldim.',
          'Я добрался до вокзала в шесть и приехал домой в семь.',
          'arrived home',
        ),
      ],
      cautions: [
        caution(
          'arrive 뒤에는 to를 쓰지 않아요: arrive in London, arrive at the hotel.',
          'Arrive dan keyin to ishlatmang: arrive in London, arrive at the hotel.',
          'Do not use to after arrive: arrive in London, arrive at the hotel.',
          'Не употребляйте to после arrive: arrive in London, arrive at the hotel.',
        ),
        caution(
          'home 앞에서는 이동할 때 to가 없고, 위치일 때 at을 써요.',
          'Home oldidan harakatda to yo‘q, joylashuvda at ishlatiladi.',
          'Use no to before home for movement, but use at for location.',
          'Перед home при движении не ставьте to, а для положения употребляйте at.',
        ),
      ],
      similar: {
        pattern: 'been to',
        note: L(
          '경험을 말하는 have been to는 Unit 17의 현재완료 표현이에요.',
          'Tajriba bildiruvchi have been to Unit 17 dagi present perfect ifodasidir.',
          'Have been to for experience is the present-perfect expression from Unit 17.',
          'Have been to для опыта — это выражение present perfect из Unit 17.',
        ),
      },
    },
  ],
};
