import { L } from './english-grammar.helpers';
import type {
  EnglishGrammarDialogue,
  EnglishGrammarDrill,
  EnglishGrammarUnit,
} from './english-grammar.types';

const r = (
  correct: string,
  wrong1: string,
  wrong2: string,
): readonly [string, string, string] => [correct, wrong1, wrong2];

const d = (
  answerRow: number,
  ko: string,
  uz: string,
  ru: string,
  rows: EnglishGrammarDrill['rows'],
): EnglishGrammarDrill => {
  const correct = rows.map((row) => row[0]);
  const answer = correct[answerRow];
  if (!answer) throw new Error(`missing drill answer row ${answerRow}`);
  return {
    template: correct
      .map((part, index) => (index === answerRow ? '___' : part))
      .join(' '),
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

export const ENGLISH_GRAMMAR_S9_U1: EnglishGrammarUnit = {
  section: 9,
  unit: 1,
  level: '6',
  title: L(
    '현재완료 단순과 진행',
    'Hozirgi tugallangan oddiy va davomiy zamon',
    'Present perfect simple and continuous',
    'Present perfect simple и continuous',
  ),
  description: L(
    '과거부터 지금까지 이어진 활동을 말하고, 결과·기간·횟수에 따라 단순형과 진행형을 정확히 선택해요.',
    "O'tmishda boshlangan va hozirgacha davom etgan ishlarni aytib, natija, davomiylik va soniga ko'ra oddiy yoki davomiy shaklni tanlaymiz.",
    'Describe activities connected to the present and choose the simple or continuous form according to result, duration, and quantity.',
    'Описываем действия, связанные с настоящим, и выбираем simple или continuous по результату, длительности и количеству.',
  ),
  specs: [
    {
      sourceUnit: 115,
      code: 'en-general:grammar:u115-present-perfect-continuous',
      pattern: 'have/has been + verb-ing',
      summary: L(
        '과거에 시작해 지금도 계속되거나 방금 끝난 활동을 현재완료진행형으로 말해요.',
        "O'tmishda boshlangan va hozir davom etayotgan yoki hozirgina tugagan faoliyatni present perfect continuous bilan aytamiz.",
        'Use the present perfect continuous for an activity that began in the past and is continuing now or has just stopped.',
        'Употребляем present perfect continuous для действия, начавшегося в прошлом и продолжающегося сейчас или только что закончившегося.',
      ),
      categoryTag: L(
        '현재완료진행형',
        'Present perfect continuous',
        'Present perfect continuous',
        'Present perfect continuous',
      ),
      explanation: L(
        'have/has been 뒤에 동사-ing를 붙여 과거부터 지금까지 이어진 활동을 나타내요. 지금도 하는 중일 수도 있고, 막 끝났지만 젖은 바닥이나 피곤한 얼굴처럼 현재에 흔적이 남아 있을 수도 있어요. 기간은 for, 시작점은 since와 함께 자주 씁니다.',
        "Have/has been dan keyin fe'l-ing kelib, o'tmishdan hozirgacha davom etgan faoliyatni ko'rsatadi. Ish hozir ham davom etishi yoki endigina tugab, hozirgi natijasi ko'rinib turishi mumkin. Davomiylik bilan for, boshlanish nuqtasi bilan since ishlatiladi.",
        'Put verb-ing after have/has been. The activity may still be in progress, or it may have just stopped and left present evidence such as a wet floor or a tired face. Use for with a length of time and since with a starting point.',
        'После have/has been ставится глагол с -ing. Действие может ещё продолжаться или только что закончиться, оставив видимый результат. For указывает длительность, since — момент начала.',
      ),
      rule: L(
        '주어 + have/has been + 동사-ing (+ for 기간 / since 시작점)',
        "ega + have/has been + fe'l-ing (+ for davomiylik / since boshlanish)",
        'subject + have/has been + verb-ing (+ for a period / since a starting point)',
        'подлежащее + have/has been + глагол-ing (+ for период / since начало)',
      ),
      forms: [
        { base: 'I/you/we/they', result: 'have been working' },
        { base: 'he/she/it', result: 'has been working' },
        { base: 'negative', result: "haven't/hasn't been working" },
        { base: 'question', result: 'Have/Has ... been working?' },
      ],
      drills: [
        d(
          1,
          '우리는 한 시간째 기다리고 있어요.',
          'Biz bir soatdan beri kutyapmiz.',
          'Мы ждём уже час.',
          [
            r('We', 'Us', 'Our'),
            r('have been waiting', 'have waited', 'are been waiting'),
            r('for an hour.', 'since an hour.', 'during an hour.'),
          ],
        ),
        d(
          1,
          '아침부터 비가 오고 있어요.',
          "Ertalabdan beri yomg'ir yog'yapti.",
          'Дождь идёт с самого утра.',
          [
            r('It', 'There', 'This'),
            r('has been raining', 'has rained', 'is been raining'),
            r('since this morning.', 'for this morning.', 'from this morning.'),
          ],
        ),
        d(
          1,
          '미나는 하루 종일 집에서 일하고 있어요.',
          "Mina kun bo'yi uyda ishlayapti.",
          'Мина весь день работает дома.',
          [
            r('Mina', 'The Mina', 'Mina is'),
            r('has been working', 'have been working', 'has working'),
            r(
              'at home all day.',
              'home since all day.',
              'at home every day ago.',
            ),
          ],
        ),
        d(
          1,
          '나는 1월부터 영어를 공부하고 있어요.',
          "Men yanvardan beri ingliz tilini o'rganyapman.",
          'Я изучаю английский с января.',
          [
            r('I', 'Me', 'My'),
            r('have been studying', 'has been studying', 'have studying'),
            r(
              'English since January.',
              'English for January.',
              'the English from January.',
            ),
          ],
        ),
        d(
          1,
          '아기가 두 시간째 자고 있어요.',
          'Chaqaloq ikki soatdan beri uxlayapti.',
          'Ребёнок спит уже два часа.',
          [
            r('The baby', 'A babies', 'Baby the'),
            r('has been sleeping', 'have been sleeping', 'has slept now'),
            r('for two hours.', 'since two hours.', 'two hours ago.'),
          ],
        ),
        d(
          1,
          '그들은 지난주부터 여행하고 있어요.',
          "Ular o'tgan haftadan beri sayohat qilishyapti.",
          'Они путешествуют с прошлой недели.',
          [
            r('They', 'Them', 'Their'),
            r(
              'have been travelling',
              'has been travelling',
              'have travelled yesterday',
            ),
            r('since last week.', 'for last week.', 'from a last week.'),
          ],
        ),
        d(
          1,
          '레오는 요리 중이어서 부엌이 아주 더워요.',
          'Leo ovqat pishirayotgani uchun oshxona juda issiq.',
          'Лео готовит, поэтому на кухне очень жарко.',
          [
            r('Leo', 'The Leo', 'Leo has'),
            r('has been cooking', 'has cooked already', 'is been cooking'),
            r(
              'so the kitchen is very hot.',
              'because the kitchen very hot.',
              'so is the kitchen hot very.',
            ),
          ],
        ),
        d(
          1,
          '우리는 이 문제에 관해 계속 이야기하고 있어요.',
          'Biz bu muammo haqida gaplashib kelyapmiz.',
          'Мы всё это время обсуждаем эту проблему.',
          [
            r('We', 'Us', 'Ours'),
            r('have been talking', 'has been talking', 'have talking'),
            r(
              'about this problem.',
              'this problem about.',
              'for this problem.',
            ),
          ],
        ),
        d(
          1,
          '준은 세 시부터 테니스를 치고 있어요.',
          "Jun soat uchdan beri tennis o'ynayapti.",
          'Джун играет в теннис с трёх часов.',
          [
            r('Jun', 'The Jun', 'Jun is'),
            r('has been playing', 'have been playing', 'has played at'),
            r(
              'tennis since three o’clock.',
              'the tennis for three o’clock.',
              'tennis three hours ago.',
            ),
          ],
        ),
        d(
          1,
          '나는 아침 내내 열쇠를 찾고 있어요.',
          'Men ertalabdan beri kalitlarimni qidiryapman.',
          'Я всё утро ищу ключи.',
          [
            r('I', 'Me', 'Mine'),
            r('have been looking', 'has been looking', 'have looked yesterday'),
            r(
              'for my keys all morning.',
              'my keys since all morning.',
              'at my keys all morning.',
            ),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Why are your shoes wet?',
          '왜 신발이 젖었어요?',
          "Nega oyoq kiyimingiz ho'l?",
          'Почему у тебя мокрая обувь?',
          'wet',
        ),
        line(
          'Leo',
          'right',
          'I have been walking in the rain.',
          '빗속을 걷고 있었거든요.',
          "Men yomg'irda piyoda yurib kelyapman.",
          'Я ходил под дождём.',
          'have been walking',
        ),
      ],
      cautions: [
        L(
          '기간 앞에는 for, 시작 시점 앞에는 since를 써요.',
          'Davomiylik oldidan for, boshlanish nuqtasi oldidan since ishlating.',
          'Use for before a period and since before a starting point.',
          'Перед периодом ставьте for, перед моментом начала — since.',
        ),
        L(
          'been을 빼지 않아요: has been working이 맞아요.',
          "Been ni tushirmang: has been working to'g'ri.",
          'Do not omit been: has been working is correct.',
          'Не пропускайте been: правильно has been working.',
        ),
      ],
      similar: {
        pattern: 'am/is/are + verb-ing',
        note: L(
          '현재진행형은 지금의 장면에, 현재완료진행형은 과거부터 지금까지의 흐름에 초점을 둬요.',
          "Present continuous hozirgi holatga, present perfect continuous esa o'tmishdan hozirgacha bo'lgan jarayonga urg'u beradi.",
          'The present continuous focuses on the scene now; the present perfect continuous connects an activity from the past to now.',
          'Present continuous описывает сцену сейчас, а present perfect continuous связывает процесс в прошлом с настоящим.',
        ),
      },
    },
    {
      sourceUnit: 116,
      code: 'en-general:grammar:u116-present-perfect-result-vs-activity',
      pattern: 'has done (result) · has been doing (activity)',
      summary: L(
        '완료된 결과는 단순형, 활동의 과정이나 현재의 흔적은 진행형으로 표현해요.',
        'Tugallangan natija uchun oddiy, jarayon yoki hozirgi iz uchun davomiy shaklni ishlatamiz.',
        'Choose the simple form for a completed result and the continuous form for the activity or its present evidence.',
        'Выбираем simple для завершённого результата, continuous — для процесса или его следа сейчас.',
      ),
      categoryTag: L(
        '결과와 활동',
        'Natija va faoliyat',
        'Result and activity',
        'Результат и процесс',
      ),
      explanation: L(
        '현재완료 단순형은 무엇이 끝났고 어떤 결과가 생겼는지 보여 줘요. 진행형은 그 일을 해 온 과정이나 현재 보이는 흔적에 초점을 둡니다. “I have cleaned the kitchen”은 주방이 깨끗하다는 결과, “I have been cleaning the kitchen”은 청소 활동을 해 왔다는 뜻이며 아직 덜 끝났을 수도 있어요.',
        "Present perfect simple nima tugagani va qanday natija borligini ko'rsatadi. Continuous esa jarayon yoki hozir ko'rinayotgan izga urg'u beradi. I have cleaned the kitchen — oshxona toza; I have been cleaning the kitchen — tozalash bilan band bo'lganman, balki hali tugamagan.",
        'The simple form highlights what has been completed and the result now. The continuous form highlights the activity or visible evidence and may imply that the job is unfinished. I have cleaned the kitchen presents a clean kitchen; I have been cleaning it presents the work.',
        'Simple подчёркивает завершённость и результат сейчас. Continuous подчёркивает процесс или видимый след и может означать, что работа ещё не закончена.',
      ),
      rule: L(
        '완성된 결과: have/has + p.p. · 활동/과정: have/has been + -ing',
        'tugallangan natija: have/has + p.p. · faoliyat/jarayon: have/has been + -ing',
        'completed result: have/has + past participle · activity/process: have/has been + -ing',
        'завершённый результат: have/has + причастие · процесс: have/has been + -ing',
      ),
      forms: [
        { base: 'completed result', result: 'She has painted the room.' },
        { base: 'activity/process', result: 'She has been painting the room.' },
        { base: 'present evidence', result: 'You have been running.' },
        { base: 'finished amount', result: 'I have written three emails.' },
      ],
      drills: [
        d(
          1,
          '미나는 주방 청소를 끝냈어요.',
          "Mina oshxonani tozalab bo'ldi.",
          'Мина убрала кухню.',
          [
            r('Mina', 'The Mina', 'Mina is'),
            r('has cleaned', 'has been cleaning', 'have cleaned'),
            r(
              'the kitchen, so it is spotless.',
              'the kitchen all morning.',
              'kitchen the, so spotless it is.',
            ),
          ],
        ),
        d(
          1,
          '미나는 아침 내내 주방을 청소해 오고 있어요.',
          'Mina ertalabdan beri oshxonani tozalayapti.',
          'Мина всё утро убирает кухню.',
          [
            r('Mina', 'The Mina', 'Mina has'),
            r('has been cleaning', 'has cleaned', 'is been cleaning'),
            r(
              'the kitchen all morning.',
              'the kitchen three times.',
              'kitchen the all morning.',
            ),
          ],
        ),
        d(
          1,
          '나는 오늘 이메일을 네 통 썼어요.',
          "Men bugun to'rtta elektron xat yozdim.",
          'Я написал сегодня четыре письма.',
          [
            r('I', 'Me', 'My'),
            r('have written', 'have been writing', 'has written'),
            r(
              'four emails today.',
              'emails since morning four.',
              'four email today.',
            ),
          ],
        ),
        d(
          1,
          '나는 한 시간 동안 이메일을 쓰고 있어요.',
          'Men bir soatdan beri elektron xatlar yozyapman.',
          'Я пишу письма уже час.',
          [
            r('I', 'Me', 'Mine'),
            r('have been writing', 'have written', 'am been writing'),
            r(
              'emails for an hour.',
              'four emails already.',
              'emails since an hour.',
            ),
          ],
        ),
        d(
          1,
          '레오는 자전거를 고쳐서 이제 잘 작동해요.',
          'Leo velosipedni tuzatdi, endi u yaxshi ishlaydi.',
          'Лео починил велосипед, и теперь он работает.',
          [
            r('Leo', 'The Leo', 'Leo is'),
            r('has fixed', 'has been fixing', 'have fixed'),
            r(
              'the bike, and it works now.',
              'the bike all afternoon.',
              'bike the, and it work now.',
            ),
          ],
        ),
        d(
          1,
          '레오의 손에 기름이 묻은 건 자전거를 고치고 있었기 때문이에요.',
          "Leoning qo'llari moy, chunki u velosipedni tuzatib kelgan.",
          'У Лео руки в масле: он чинил велосипед.',
          [
            r('Leo', 'The Leo', 'Leo has'),
            r('has been fixing', 'has fixed', 'is been fixing'),
            r(
              'the bike, so his hands are oily.',
              'three bikes today.',
              'the bike, because oily hands.',
            ),
          ],
        ),
        d(
          1,
          '나는 그 책을 다 읽었어요.',
          "Men kitobni o'qib bo'ldim.",
          'Я дочитал книгу.',
          [
            r('I', 'Me', 'My'),
            r('have read', 'have been reading', 'has read'),
            r('the whole book.', 'the book for an hour.', 'whole the book.'),
          ],
        ),
        d(
          1,
          '나는 그 책을 읽고 있어서 줄거리를 아직 몰라요.',
          "Men kitobni o'qib kelyapman, shuning uchun oxirini hali bilmayman.",
          'Я читаю эту книгу и ещё не знаю концовку.',
          [
            r('I', 'Me', 'Mine'),
            r('have been reading', 'have read', 'am been reading'),
            r(
              'the book, so I do not know the ending yet.',
              'the whole book already.',
              'book the, so ending not know.',
            ),
          ],
        ),
        d(
          1,
          '준은 벽 하나를 다 칠했어요.',
          "Jun bitta devorni bo'yab bo'ldi.",
          'Джун покрасил одну стену.',
          [
            r('Jun', 'The Jun', 'Jun is'),
            r('has painted', 'has been painting', 'have painted'),
            r('one wall.', 'the wall since noon.', 'one walls.'),
          ],
        ),
        d(
          1,
          '준은 벽을 칠하고 있어서 옷에 페인트가 묻었어요.',
          "Jun devorni bo'yab kelgani uchun kiyimida bo'yoq bor.",
          'Джун красил стену, поэтому на его одежде краска.',
          [
            r('Jun', 'The Jun', 'Jun has'),
            r('has been painting', 'has painted', 'is been painting'),
            r(
              'the wall, so there is paint on his clothes.',
              'three walls today.',
              'wall the, so paint his clothes.',
            ),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'The living room looks different.',
          '거실이 달라 보여요.',
          "Mehmonxona boshqacha ko'rinadi.",
          'Гостиная выглядит иначе.',
          'looks different',
        ),
        line(
          'Leo',
          'right',
          'I have painted it, but I have not moved the furniture yet.',
          '벽은 칠했지만 가구는 아직 옮기지 않았어요.',
          "Men uni bo'yadim, lekin mebelni hali ko'chirmadim.",
          'Я её покрасил, но мебель ещё не передвинул.',
          'have painted',
        ),
      ],
      cautions: [
        L(
          '진행형이 언제나 “아직 하는 중”이라는 뜻은 아니에요. 막 끝났고 흔적이 남은 경우도 있어요.',
          "Continuous har doim ish hali davom etmoqda degani emas; u endigina tugab, izi qolgan bo'lishi mumkin.",
          'The continuous does not always mean “still in progress”; the activity may have just stopped and left evidence.',
          'Continuous не всегда означает, что действие ещё идёт: оно могло только что закончиться и оставить след.',
        ),
        L(
          '수량이나 완성된 전체를 말할 때는 보통 단순형을 써요.',
          'Miqdor yoki tugallangan butun natija aytilganda odatda simple ishlatiladi.',
          'Use the simple form for a quantity or a completed whole.',
          'Для количества или завершённого целого обычно употребляется simple.',
        ),
      ],
      similar: {
        pattern: 'I did · I was doing',
        note: L(
          '과거시제의 완료된 사건과 진행 중 배경 구별이 현재완료에서도 결과와 활동 구별로 이어져요.',
          "Past simple va past continuous dagi hodisa/jarayon farqi present perfect dagi natija/faoliyat farqiga o'xshaydi.",
          'The event-versus-process contrast in past tenses helps explain the result-versus-activity contrast here.',
          'Различие события и процесса в прошедшем помогает понять различие результата и деятельности здесь.',
        ),
      },
    },
    {
      sourceUnit: 117,
      code: 'en-general:grammar:u117-present-perfect-duration-vs-quantity',
      pattern: 'How long ...? · How many ...? · How many times ...?',
      summary: L(
        '활동의 기간은 how long과 진행형으로, 완성된 수량·횟수는 how many와 단순형으로 물어요.',
        "Faoliyat davomiyligini how long va continuous bilan, tugallangan miqdor yoki takror sonini how many va simple bilan so'raymiz.",
        'Ask about duration with how long and the continuous; ask about a completed quantity or number of occasions with how many and the simple.',
        'О длительности спрашиваем с how long и continuous, о количестве или числе раз — с how many и simple.',
      ),
      categoryTag: L(
        '기간과 수량',
        'Davomiylik va miqdor',
        'Duration and quantity',
        'Длительность и количество',
      ),
      explanation: L(
        'How long은 활동이 얼마나 오래 이어졌는지 묻기 때문에 현재완료진행형과 잘 어울려요. How many는 완성된 대상의 수, how many times는 완료된 횟수를 묻기 때문에 현재완료 단순형을 주로 씁니다. 답에서도 for two hours, since Monday는 기간·시작점, three reports, twice는 수량·횟수를 나타내요.',
        "How long faoliyat qancha vaqt davom etganini so'raydi va present perfect continuous bilan ko'p ishlatiladi. How many tugallangan narsalar sonini, how many times esa takror sonini so'raydi, shuning uchun odatda present perfect simple keladi. For two hours va since Monday vaqtni, three reports va twice miqdorni bildiradi.",
        'How long asks for the duration of an activity and commonly takes the continuous. How many asks for a completed quantity, and how many times asks for completed occasions, so they commonly take the simple. For two hours and since Monday mark time; three reports and twice mark quantity.',
        'How long спрашивает о длительности процесса и часто сочетается с continuous. How many и how many times спрашивают о завершённом количестве или числе случаев и обычно требуют simple.',
      ),
      rule: L(
        'How long + have/has + 주어 + been -ing? · How many/times + have/has + 주어 + p.p.?',
        'How long + have/has + ega + been -ing? · How many/times + have/has + ega + p.p.?',
        'How long + have/has + subject + been -ing? · How many/times + have/has + subject + past participle?',
        'How long + have/has + подлежащее + been -ing? · How many/times + have/has + подлежащее + причастие?',
      ),
      forms: [
        {
          base: 'duration question',
          result: 'How long have you been waiting?',
        },
        { base: 'period answer', result: 'For two hours.' },
        { base: 'quantity question', result: 'How many emails have you sent?' },
        {
          base: 'frequency question',
          result: 'How many times have you visited?',
        },
      ],
      drills: [
        d(
          0,
          '얼마나 오래 기다리고 있어요?',
          'Qancha vaqtdan beri kutyapsiz?',
          'Как долго вы ждёте?',
          [
            r('How long', 'How many', 'How often'),
            r(
              'have you been waiting?',
              'have you waited times?',
              'you have been waiting?',
            ),
          ],
        ),
        d(
          0,
          '이메일을 몇 통 보냈어요?',
          'Nechta elektron xat yubordingiz?',
          'Сколько писем вы отправили?',
          [
            r('How many emails', 'How long emails', 'How much emails'),
            r(
              'have you sent?',
              'have you been sending time?',
              'you have sent?',
            ),
          ],
        ),
        d(
          0,
          '이 도시에 몇 번 와 봤어요?',
          'Bu shaharga necha marta kelgansiz?',
          'Сколько раз вы были в этом городе?',
          [
            r('How many times', 'How long times', 'How much time'),
            r(
              'have you visited this city?',
              'have you been visiting this city long?',
              'you visited this city have?',
            ),
          ],
        ),
        d(
          1,
          '우리는 두 시간 동안 연습하고 있어요.',
          'Biz ikki soatdan beri mashq qilyapmiz.',
          'Мы тренируемся уже два часа.',
          [
            r(
              'We have been practising',
              'We have practised twice',
              'We has been practising',
            ),
            r('for two hours.', 'since two hours.', 'two times.'),
          ],
        ),
        d(
          1,
          '레오는 월요일부터 이곳에서 일하고 있어요.',
          'Leo dushanbadan beri shu yerda ishlayapti.',
          'Лео работает здесь с понедельника.',
          [
            r(
              'Leo has been working here',
              'Leo has worked here three times',
              'Leo have been working here',
            ),
            r('since Monday.', 'for Monday.', 'on three Mondays.'),
          ],
        ),
        d(
          1,
          '미나는 오늘 보고서를 두 개 끝냈어요.',
          'Mina bugun ikkita hisobotni tugatdi.',
          'Мина закончила сегодня два отчёта.',
          [
            r(
              'Mina has finished',
              'Mina has been finishing',
              'Mina have finished',
            ),
            r('two reports today.', 'for two reports.', 'since two reports.'),
          ],
        ),
        d(
          1,
          '나는 그 영화를 두 번 봤어요.',
          "Men bu filmni ikki marta ko'rdim.",
          'Я смотрел этот фильм дважды.',
          [
            r(
              'I have seen that film',
              'I have been seeing that film',
              'I has seen that film',
            ),
            r('twice.', 'for twice.', 'since twice.'),
          ],
        ),
        d(
          0,
          '오늘 물을 몇 잔 마셨어요?',
          'Bugun necha stakan suv ichdingiz?',
          'Сколько стаканов воды вы выпили сегодня?',
          [
            r(
              'How many glasses of water',
              'How long water',
              'How much glasses of water',
            ),
            r(
              'have you drunk today?',
              'have you been drinking times today?',
              'you have drank today?',
            ),
          ],
        ),
        d(
          0,
          '얼마나 오래 이 프로젝트를 진행해 왔어요?',
          'Bu loyiha ustida qancha vaqtdan beri ishlayapsiz?',
          'Как долго вы работаете над этим проектом?',
          [
            r('How long', 'How many projects', 'How many times'),
            r(
              'have you been working on this project?',
              'have you completed this project?',
              'you have been working on this project?',
            ),
          ],
        ),
        d(
          0,
          '준은 시험을 몇 개 치렀어요?',
          'Jun nechta imtihon topshirdi?',
          'Сколько экзаменов сдал Джун?',
          [
            r('How many exams', 'How long exams', 'How much exam'),
            r('has Jun taken?', 'has Jun been taking long?', 'Jun has took?'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'How long have you been learning Spanish?',
          '스페인어를 얼마나 오래 배우고 있어요?',
          "Ispan tilini qancha vaqtdan beri o'rganyapsiz?",
          'Как долго ты учишь испанский?',
          'How long',
        ),
        line(
          'Leo',
          'right',
          'For a year. I have completed two courses.',
          '1년 됐어요. 과정 두 개를 마쳤어요.',
          'Bir yildan beri. Men ikkita kursni tugatdim.',
          'Год. Я закончил два курса.',
          'two courses',
        ),
      ],
      cautions: [
        L(
          'how much time은 시간의 양을 물을 수 있지만, 활동의 지속 기간에는 how long이 더 자연스러워요.',
          "How much time vaqt miqdorini so'rashi mumkin, lekin faoliyat davomiyligi uchun how long tabiiyroq.",
          'How much time can ask about an amount of time, but how long is more natural for the duration of an activity.',
          'How much time может спрашивать о количестве времени, но для длительности процесса естественнее how long.',
        ),
        L(
          '횟수 앞에는 for를 쓰지 않아요: twice, three times라고 해요.',
          'Takror soni oldidan for ishlatilmaydi: twice, three times deyiladi.',
          'Do not use for before a number of occasions: say twice or three times.',
          'Перед числом случаев for не ставится: twice, three times.',
        ),
      ],
      similar: {
        pattern: 'for · since · ago',
        note: L(
          'for와 since는 지금까지 이어지는 기간에, ago는 끝난 과거 시점에 써요.',
          "For va since hozirgacha davom etgan vaqtga, ago esa tugagan o'tmish vaqtiga ishlatiladi.",
          'For and since connect a period to now; ago locates a finished time in the past.',
          'For и since связывают период с настоящим, ago указывает завершённый момент в прошлом.',
        ),
      },
    },
    {
      sourceUnit: 118,
      code: 'en-general:grammar:u118-present-perfect-stative-verbs',
      pattern: 'have known · has belonged · have wanted',
      summary: L(
        'know·believe·own처럼 상태를 나타내는 동사는 현재완료진행형보다 현재완료 단순형으로 말해요.',
        "Know, believe, own kabi holat fe'llari present perfect continuous emas, present perfect simple bilan ishlatiladi.",
        'Use the present perfect simple, not normally the continuous, with state verbs such as know, believe, and own.',
        'С глаголами состояния know, believe, own обычно употребляем present perfect simple, а не continuous.',
      ),
      categoryTag: L(
        '상태동사',
        "Holat fe'llari",
        'State verbs',
        'Глаголы состояния',
      ),
      explanation: L(
        'know, believe, understand, own, belong, want, need, love, seem처럼 생각·소유·감정·상태를 나타내는 동사는 보통 진행형으로 쓰지 않아요. 과거부터 지금까지 이어진 상태라도 have known, has belonged처럼 현재완료 단순형을 씁니다. 다만 have가 “경험하다”, think가 “고려하다”처럼 활동 의미로 바뀌면 진행형이 가능해요.',
        "Know, believe, understand, own, belong, want, need, love, seem kabi fikr, egalik, his va holat fe'llari odatda continuous shaklda kelmaydi. Holat o'tmishdan hozirgacha davom etsa ham have known, has belonged kabi simple ishlatiladi. Ammo have 'boshdan kechirmoq', think 'ko'rib chiqmoq' ma'nosida faoliyat bo'lsa, continuous mumkin.",
        'Verbs of thought, possession, feeling, and state—such as know, believe, understand, own, belong, want, need, love, and seem—do not normally take the continuous. Use have known or has belonged even for a state continuing from the past. A continuous is possible when the meaning becomes an activity, as in have been having problems or have been thinking about a plan.',
        'Глаголы мысли, обладания, чувства и состояния — know, believe, understand, own, belong, want, need, love, seem — обычно не употребляются в continuous. Даже для состояния из прошлого используем have known, has belonged. Continuous возможен, если значение становится действием.',
      ),
      rule: L(
        '지속 상태: have/has + 상태동사의 과거분사 · 활동 의미일 때만 진행형 가능',
        "davom etgan holat: have/has + holat fe'lining past participle shakli · faqat faoliyat ma'nosida continuous mumkin",
        'continuing state: have/has + state verb past participle · continuous only when the meaning is an activity',
        'продолжающееся состояние: have/has + причастие глагола состояния · continuous только при значении действия',
      ),
      forms: [
        { base: 'know', result: 'have known' },
        { base: 'own/belong', result: 'have owned / has belonged' },
        {
          base: 'want/need/love',
          result: 'have wanted / have needed / have loved',
        },
        {
          base: 'activity meaning',
          result: 'have been having / have been thinking',
        },
      ],
      drills: [
        d(
          1,
          '나는 미나를 10년 동안 알고 지냈어요.',
          "Men Minani o'n yildan beri taniyman.",
          'Я знаю Мину десять лет.',
          [
            r('I', 'Me', 'My'),
            r('have known', 'have been knowing', 'has known'),
            r(
              'Mina for ten years.',
              'Mina since ten years.',
              'the Mina ten years ago.',
            ),
          ],
        ),
        d(
          1,
          '우리는 2019년부터 이 차를 가지고 있어요.',
          'Biz bu mashinaga 2019-yildan beri egamiz.',
          'Эта машина у нас с 2019 года.',
          [
            r('We', 'Us', 'Our'),
            r('have owned', 'have been owning', 'has owned'),
            r(
              'this car since 2019.',
              'this car for 2019.',
              'car this from 2019.',
            ),
          ],
        ),
        d(
          1,
          '이 가방은 오랫동안 레오의 것이었어요.',
          'Bu sumka uzoq vaqtdan beri Leoga tegishli.',
          'Эта сумка давно принадлежит Лео.',
          [
            r('This bag', 'These bag', 'Bag this'),
            r('has belonged', 'has been belonging', 'have belonged'),
            r('to Leo for years.', 'Leo since years.', 'for Leo to years.'),
          ],
        ),
        d(
          1,
          '나는 어릴 때부터 그 이야기를 믿어 왔어요.',
          'Men bolaligimdan beri bu hikoyaga ishonaman.',
          'Я верю в эту историю с детства.',
          [
            r('I', 'Me', 'Mine'),
            r('have believed', 'have been believing', 'has believed'),
            r(
              'that story since childhood.',
              'that story for childhood.',
              'story that from childhood.',
            ),
          ],
        ),
        d(
          1,
          '그 설명은 늘 분명해 보였어요.',
          "Bu tushuntirish doim aniq ko'ringan.",
          'Это объяснение всегда казалось ясным.',
          [
            r('The explanation', 'Explanation the', 'The explanations'),
            r(
              'has always seemed',
              'has always been seeming',
              'have always seemed',
            ),
            r('clear to me.', 'clearly for me.', 'me clear to.'),
          ],
        ),
        d(
          1,
          '이제 나는 그 규칙을 이해했어요.',
          'Endi men qoidani tushundim.',
          'Теперь я понял это правило.',
          [
            r('I', 'Me', 'My'),
            r('have understood', 'have been understanding', 'has understood'),
            r('the rule now.', 'the rule since now.', 'rule the now.'),
          ],
        ),
        d(
          1,
          '미나는 늘 바닷가에서 살고 싶어 했어요.',
          "Mina doim dengiz bo'yida yashashni xohlagan.",
          'Мина всегда хотела жить у моря.',
          [
            r('Mina', 'The Mina', 'Mina is'),
            r(
              'has always wanted',
              'has always been wanting',
              'have always wanted',
            ),
            r(
              'to live by the sea.',
              'living at the sea.',
              'to live the sea by.',
            ),
          ],
        ),
        d(
          1,
          '우리는 오랫동안 도움이 필요했어요.',
          'Bizga uzoq vaqtdan beri yordam kerak.',
          'Нам давно нужна помощь.',
          [
            r('We', 'Us', 'Our'),
            r('have needed', 'have been needing', 'has needed'),
            r(
              'help for a long time.',
              'help since a long time.',
              'a help long time.',
            ),
          ],
        ),
        d(
          1,
          '나는 이 노래를 처음 들었을 때부터 좋아했어요.',
          "Men bu qo'shiqni birinchi eshitganimdan beri yaxshi ko'raman.",
          'Я люблю эту песню с тех пор, как впервые её услышал.',
          [
            r('I', 'Me', 'Mine'),
            r('have loved', 'have been loving', 'has loved'),
            r(
              'this song since I first heard it.',
              'this song for I first heard it.',
              'song this since first hear.',
            ),
          ],
        ),
        d(
          1,
          '최근에 컴퓨터 문제가 계속 생기고 있어요.',
          "So'nggi paytda kompyuter bilan muammolarga duch kelyapmiz.",
          'В последнее время у нас проблемы с компьютером.',
          [
            r('We', 'Us', 'Our'),
            r('have been having', 'have had once', 'have been owning'),
            r(
              'computer problems lately.',
              'a computer since lately.',
              'computer problems yesterday only.',
            ),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'How long have you known Leo?',
          '레오를 안 지 얼마나 됐어요?',
          'Leoni qancha vaqtdan beri taniysiz?',
          'Как давно ты знаешь Лео?',
          'have you known',
        ),
        line(
          'Jun',
          'right',
          'I have known him since university.',
          '대학교 때부터 알고 지냈어요.',
          'Men uni universitetdan beri taniyman.',
          'Я знаю его со времён университета.',
          'have known',
        ),
      ],
      cautions: [
        L(
          'I have been knowing은 보통 쓰지 않고 I have known이라고 해요.',
          "Odatda I have been knowing deyilmaydi; I have known to'g'ri.",
          'Normally say I have known, not I have been knowing.',
          'Обычно говорим I have known, а не I have been knowing.',
        ),
        L(
          '동사 자체보다 문맥 속 의미가 중요해요. have a car는 상태지만 have problems는 겪는 활동으로 볼 수 있어요.',
          "Fe'lning o'zidan ko'ra kontekstdagi ma'no muhim: have a car — holat, have problems — boshdan kechirilayotgan faoliyat bo'lishi mumkin.",
          'Meaning in context matters: have a car is a state, while have problems can describe an ongoing experience.',
          'Важно значение в контексте: have a car — состояние, а have problems может описывать продолжающийся опыт.',
        ),
      ],
      similar: {
        pattern: 'I think · I am thinking',
        note: L(
          'think가 의견이면 상태, 계획을 고려하는 중이면 활동이라 진행형이 가능해요.',
          "Think fikr bildirse holat, reja ustida o'ylashni bildirse faoliyat bo'lib continuous mumkin.",
          'Think is stative for an opinion but dynamic when it means considering a plan.',
          'Think обозначает состояние при мнении, но действие — при обдумывании плана.',
        ),
      },
    },
  ],
};
