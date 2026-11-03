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

export const ENGLISH_GRAMMAR_S9_U2: EnglishGrammarUnit = {
  section: 9,
  unit: 2,
  level: '6',
  title: L(
    '이야기 속 과거와 대과거',
    "Hikoyadagi o'tgan va undan oldingi zamon",
    'Past narratives and the past perfect',
    'Прошедшие времена в рассказе и past perfect',
  ),
  description: L(
    '이야기의 배경과 중심 사건을 구별하고, 더 먼저 일어난 일과 그때까지 이어진 활동을 대과거로 표현해요.',
    "Hikoyadagi fon va asosiy hodisalarni ajratib, oldinroq bo'lgan ish va o'sha paytgacha davom etgan faoliyatni past perfect bilan ifodalaymiz.",
    'Separate background from main events, then use the past perfect for an earlier event or an activity continuing up to a past point.',
    'Отделяем фон от главных событий и употребляем past perfect для более раннего события или процесса до момента в прошлом.',
  ),
  specs: [
    {
      sourceUnit: 119,
      code: 'en-general:grammar:u119-narrative-past-tenses',
      pattern: 'was doing (background) · did (event)',
      summary: L(
        '과거진행형으로 배경과 진행 중이던 일을 그리고, 과거형으로 이야기를 움직이는 사건을 말해요.',
        'Past continuous bilan fon va davom etayotgan ishni, past simple bilan hikoyani oldinga siljitadigan hodisani aytamiz.',
        'Use the past continuous for the background or an activity in progress, and the past simple for the event that moves the story forward.',
        'Past continuous задаёт фон или продолжающееся действие, past simple называет событие, двигающее рассказ.',
      ),
      categoryTag: L(
        '이야기 시제',
        'Hikoya zamonlari',
        'Narrative tenses',
        'Времена повествования',
      ),
      explanation: L(
        '이야기를 시작할 때 날씨·장소·사람이 하고 있던 일 같은 배경은 was/were + -ing로 그려요. 그 배경 속에서 일어나 이야기를 진행시키는 짧거나 완결된 사건은 과거형을 씁니다. when은 사건이 끼어든 순간, while은 두 활동이 동시에 진행되는 동안을 자주 나타내요.',
        "Hikoya boshida ob-havo, joy va odamlarning qilayotgan ishi kabi fon was/were + -ing bilan tasvirlanadi. Shu fon ichida ro'y berib hikoyani davom ettiradigan tugallangan hodisa past simple bilan keladi. When ko'pincha voqea kirib kelgan paytni, while esa ikki faoliyat bir vaqtda davom etganini bildiradi.",
        'Set the scene with was/were + -ing for the weather, place, or an activity already in progress. Use the past simple for a completed event that advances the story. When often introduces the interrupting event; while commonly links two activities in progress.',
        'Фон — погоду, место, уже идущее действие — описываем was/were + -ing. Завершённое событие, которое продвигает рассказ, ставим в past simple. When часто вводит прервавшее событие, while связывает два одновременных процесса.',
      ),
      rule: L(
        '배경/진행: was/were + -ing · 중심 사건: 과거형 · while + 진행, when + 사건',
        'fon/jarayon: was/were + -ing · asosiy hodisa: past simple · while + jarayon, when + hodisa',
        'background/in progress: was/were + -ing · main event: past simple · while + activity, when + event',
        'фон/процесс: was/were + -ing · главное событие: past simple · while + процесс, when + событие',
      ),
      forms: [
        { base: 'scene', result: 'The sun was shining.' },
        { base: 'main event', result: 'A car stopped.' },
        {
          base: 'interruption',
          result: 'I was walking when it started to rain.',
        },
        {
          base: 'parallel activities',
          result: 'While I was cooking, Leo was setting the table.',
        },
      ],
      drills: [
        d(
          0,
          '해가 비치고 새들이 노래하고 있었어요.',
          'Quyosh charaqlab, qushlar sayrayotgan edi.',
          'Светило солнце, и пели птицы.',
          [
            r(
              'The sun was shining',
              'The sun shone suddenly',
              'The sun were shining',
            ),
            r(
              'and the birds were singing.',
              'and the birds sang once.',
              'and birds was singing.',
            ),
          ],
        ),
        d(
          1,
          '나는 집으로 걷고 있을 때 전화를 받았어요.',
          'Uyga ketayotganimda telefon jiringladi.',
          'Я шёл домой, когда зазвонил телефон.',
          [
            r(
              'I was walking home',
              'I walked home completely',
              'I were walking home',
            ),
            r(
              'when my phone rang.',
              'while my phone was ringing all day.',
              'when my phone ring.',
            ),
          ],
        ),
        d(
          0,
          '미나가 저녁을 만들고 있을 때 레오는 식탁을 차리고 있었어요.',
          'Mina kechki ovqat tayyorlayotganda Leo dasturxon yozayotgan edi.',
          'Пока Мина готовила ужин, Лео накрывал на стол.',
          [
            r(
              'While Mina was making dinner,',
              'When Mina made dinner once,',
              'While Mina were making dinner,',
            ),
            r(
              'Leo was setting the table.',
              'Leo set the table suddenly.',
              'Leo were setting table.',
            ),
          ],
        ),
        d(
          1,
          '우리는 버스를 기다리다가 사고를 봤어요.',
          "Avtobus kutayotganimizda avariyani ko'rdik.",
          'Мы ждали автобус и увидели аварию.',
          [
            r(
              'We were waiting for the bus',
              'We waited for the bus completely',
              'We was waiting for the bus',
            ),
            r(
              'when we saw the accident.',
              'while we were seeing the accident.',
              'when we see the accident.',
            ),
          ],
        ),
        d(
          0,
          '바람이 불고 사람들이 서둘러 가고 있었어요.',
          'Shamol esib, odamlar shoshayotgan edi.',
          'Дул ветер, и люди спешили.',
          [
            r(
              'The wind was blowing',
              'The wind blew once',
              'The wind were blowing',
            ),
            r(
              'and people were hurrying.',
              'and people hurried suddenly.',
              'and people was hurrying.',
            ),
          ],
        ),
        d(
          1,
          '준이 문을 열자 모두가 이야기하고 있었어요.',
          'Jun eshikni ochganda hamma gaplashayotgan edi.',
          'Когда Джун открыл дверь, все разговаривали.',
          [
            r(
              'Jun opened the door',
              'Jun was opening the door all evening',
              'Jun open the door',
            ),
            r(
              'while everyone was talking.',
              'when everyone talked once.',
              'while everyone were talking.',
            ),
          ],
        ),
        d(
          0,
          '나는 운전 중이어서 메시지를 보지 못했어요.',
          "Men mashina haydayotgan edim, shuning uchun xabarni ko'rmadim.",
          'Я был за рулём, поэтому не увидел сообщение.',
          [
            r('I was driving,', 'I drove and finished,', 'I were driving,'),
            r(
              'so I did not see the message.',
              'so I was not seeing the message.',
              'so I did not saw the message.',
            ),
          ],
        ),
        d(
          1,
          '불이 꺼졌을 때 아이들은 자고 있었어요.',
          "Chiroqlar o'chganda bolalar uxlayotgan edi.",
          'Когда свет погас, дети спали.',
          [
            r(
              'The children were sleeping',
              'The children slept once',
              'The children was sleeping',
            ),
            r(
              'when the lights went out.',
              'while the lights were going all night.',
              'when the lights go out.',
            ),
          ],
        ),
        d(
          0,
          '레오는 달리다가 넘어졌어요.',
          'Leo yugurayotganida yiqildi.',
          'Лео бежал и упал.',
          [
            r('Leo was running', 'Leo ran to the finish', 'Leo were running'),
            r(
              'when he fell.',
              'while he was falling for hours.',
              'when he fall.',
            ),
          ],
        ),
        d(
          1,
          '비가 내리고 있어서 우리는 카페에 들어갔어요.',
          "Yomg'ir yog'ayotgan edi, shuning uchun kafega kirdik.",
          'Шёл дождь, поэтому мы зашли в кафе.',
          [
            r('It was raining,', 'It rained once,', 'It were raining,'),
            r(
              'so we went into a café.',
              'so we were going into a café all day.',
              'so we goed into a café.',
            ),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'What were you doing when the alarm went off?',
          '경보가 울렸을 때 무엇을 하고 있었어요?',
          'Signal chalinganda nima qilayotgan edingiz?',
          'Что ты делал, когда сработала сигнализация?',
          'were you doing',
        ),
        line(
          'Leo',
          'right',
          'I was taking a shower, so I did not hear it at first.',
          '샤워 중이라 처음에는 못 들었어요.',
          'Men dush qabul qilayotgan edim, shuning uchun avval eshitmadim.',
          'Я принимал душ, поэтому сначала не услышал.',
          'was taking',
        ),
      ],
      cautions: [
        L(
          '과거에 오래 한 일이라고 무조건 진행형은 아니에요. 완결된 사건으로 말하면 과거형을 써요.',
          "O'tmishda uzoq davom etgan har bir ish continuous bo'lavermaydi; tugallangan hodisa sifatida aytilsa past simple ishlatiladi.",
          'A long past action is not automatically continuous; use the past simple when presenting it as a completed event.',
          'Долгое действие не обязательно требует continuous: если оно подано как завершённое событие, нужен past simple.',
        ),
        L(
          'when과 while만 보고 시제를 기계적으로 고르지 말고, 사건인지 진행 중 배경인지 판단해요.',
          'Zamonni faqat when yoki while ga qarab emas, hodisa yoki davom etayotgan fon ekaniga qarab tanlang.',
          'Do not choose the tense mechanically from when or while; decide whether the clause is an event or an activity in progress.',
          'Не выбирайте время только по when или while: определите, событие это или процесс.',
        ),
      ],
      similar: {
        pattern: 'did · was/were doing',
        note: L(
          '기본 형태는 같지만, 이야기에서는 여러 절을 연결해 장면과 사건의 관계를 보여 줘요.',
          "Asosiy shakllar bir xil, ammo hikoyada bir nechta gap qismi fon va hodisa munosabatini ko'rsatadi.",
          'The core forms are familiar, but narrative use combines clauses to show how the scene and event relate.',
          'Формы знакомы, но в рассказе несколько частей показывают связь фона и события.',
        ),
      },
    },
    {
      sourceUnit: 120,
      code: 'en-general:grammar:u120-past-perfect-simple',
      pattern: 'had + past participle',
      summary: L(
        '과거의 기준 시점보다 더 먼저 끝난 일을 had + 과거분사로 나타내요.',
        "O'tmishdagi tayanch vaqtdan oldin tugagan ishni had + past participle bilan ko'rsatamiz.",
        'Use had + past participle for an event completed before another past time or event.',
        'Используем had + причастие для события, завершившегося раньше другого момента или события в прошлом.',
      ),
      categoryTag: L(
        '과거완료 단순형',
        'Past perfect simple',
        'Past perfect simple',
        'Past perfect simple',
      ),
      explanation: L(
        '과거 이야기에서 두 사건의 순서를 분명히 할 때 더 먼저 일어난 사건을 had + 과거분사로 표현해요. 나중 사건은 보통 과거형입니다. “When I arrived, the train had left”는 도착보다 출발이 먼저였다는 뜻이에요. already, just, never, by the time과 자주 어울립니다.',
        "O'tmishdagi ikki hodisa tartibini aniq ko'rsatish uchun oldinroq bo'lgan hodisa had + past participle bilan keladi. Keyingi hodisa odatda past simple bo'ladi. When I arrived, the train had left — poyezd men kelishimdan oldin ketgan. Already, just, never, by the time bilan ko'p ishlatiladi.",
        'To make the order of two past events clear, put the earlier one in had + past participle and usually put the later one in the past simple. When I arrived, the train had left means the departure happened first. Common markers include already, just, never, and by the time.',
        'Чтобы показать порядок двух событий в прошлом, более раннее ставим в had + причастие, более позднее — обычно в past simple. When I arrived, the train had left означает, что поезд ушёл до моего прибытия.',
      ),
      rule: L(
        '더 이른 과거: had + p.p. · 나중 과거: 과거형',
        "oldinroq o'tmish: had + p.p. · keyingi o'tmish: past simple",
        'earlier past: had + past participle · later past: past simple',
        'более раннее прошлое: had + причастие · более позднее: past simple',
      ),
      forms: [
        { base: 'affirmative', result: 'She had left.' },
        { base: 'negative', result: "She hadn't left." },
        { base: 'question', result: 'Had she left?' },
        { base: 'sequence', result: 'She had left before I arrived.' },
      ],
      drills: [
        d(
          1,
          '내가 역에 도착했을 때 기차는 이미 떠났어요.',
          'Men bekatga yetganimda poyezd allaqachon ketgan edi.',
          'Когда я приехал на станцию, поезд уже ушёл.',
          [
            r(
              'When I reached the station,',
              'When I had reached the station later,',
              'When I reach the station,',
            ),
            r(
              'the train had already left.',
              'the train already leaves.',
              'the train has already left yesterday.',
            ),
          ],
        ),
        d(
          0,
          '미나는 집을 나서기 전에 문을 잠갔어요.',
          'Mina uydan chiqishidan oldin eshikni qulflagan edi.',
          'Мина заперла дверь перед тем, как уйти.',
          [
            r(
              'Mina had locked the door',
              'Mina has locked the door yesterday',
              'Mina had lock the door',
            ),
            r(
              'before she left home.',
              'before she had left home later.',
              'before she leaves home.',
            ),
          ],
        ),
        d(
          1,
          '영화가 시작되었을 때 우리는 자리를 찾지 못한 상태였어요.',
          'Film boshlanganda biz hali joyimizni topmagan edik.',
          'Когда фильм начался, мы ещё не нашли свои места.',
          [
            r(
              'We had not found our seats',
              'We did not found our seats',
              'We have not found our seats then',
            ),
            r(
              'when the film started.',
              'when the film had started afterward.',
              'when the film starts.',
            ),
          ],
        ),
        d(
          0,
          '레오는 그날 전에는 눈을 본 적이 없었어요.',
          "Leo o'sha kundan oldin hech qachon qor ko'rmagan edi.",
          'До того дня Лео никогда не видел снега.',
          [
            r(
              'Leo had never seen snow',
              'Leo has never seen snow that day ago',
              'Leo had never saw snow',
            ),
            r('before that day.', 'since that day.', 'after that day first.'),
          ],
        ),
        d(
          1,
          '경찰이 도착했을 때 도둑은 사라지고 없었어요.',
          "Politsiya kelganida o'g'ri g'oyib bo'lgan edi.",
          'Когда приехала полиция, вор уже исчез.',
          [
            r(
              'By the time the police arrived,',
              'By the time the police had arrived later,',
              'Until the police arrives,',
            ),
            r(
              'the thief had disappeared.',
              'the thief has disappeared yesterday.',
              'the thief had disappear.',
            ),
          ],
        ),
        d(
          0,
          '준은 회의 전에 보고서를 끝냈어요.',
          "Jun yig'ilishdan oldin hisobotni tugatgan edi.",
          'Джун закончил отчёт до совещания.',
          [
            r(
              'Jun had finished the report',
              'Jun has finished the report last week',
              'Jun had finish the report',
            ),
            r(
              'before the meeting began.',
              'before the meeting had begun afterward.',
              'before the meeting begins.',
            ),
          ],
        ),
        d(
          1,
          '나는 결제한 뒤에 지갑을 집에 두고 온 것을 깨달았어요.',
          "To'lov paytida hamyonimni uyda qoldirganimni angladim.",
          'При оплате я понял, что оставил кошелёк дома.',
          [
            r(
              'At the checkout I realised',
              'At the checkout I had realised later',
              'At checkout I realise',
            ),
            r(
              'I had left my wallet at home.',
              'I have left my wallet yesterday.',
              'I had leave my wallet home.',
            ),
          ],
        ),
        d(
          0,
          '손님들이 오기 직전에 우리는 저녁을 준비해 두었어요.',
          "Mehmonlar kelishidan oldin biz kechki ovqatni tayyorlab bo'lgan edik.",
          'Мы приготовили ужин до прихода гостей.',
          [
            r(
              'We had prepared dinner',
              'We have prepared dinner last night',
              'We had prepare dinner',
            ),
            r(
              'before the guests arrived.',
              'before the guests had arrived afterward.',
              'before the guests arrive.',
            ),
          ],
        ),
        d(
          1,
          '수업이 시작될 때 미나는 숙제를 끝내지 못했어요.',
          'Dars boshlanganda Mina uy vazifasini tugatmagan edi.',
          'К началу урока Мина не закончила домашнее задание.',
          [
            r(
              'When the lesson began,',
              'When the lesson had begun afterward,',
              'When the lesson begins,',
            ),
            r(
              'Mina had not finished her homework.',
              'Mina has not finished yesterday.',
              'Mina had not finish her homework.',
            ),
          ],
        ),
        d(
          0,
          '그들은 전에 한 번 만난 적이 있어서 서로 알아봤어요.',
          'Ular oldin bir marta uchrashganlari uchun bir-birini tanidi.',
          'Они узнали друг друга, потому что уже встречались.',
          [
            r(
              'They had met once before,',
              'They have met once last year,',
              'They had meet once before,',
            ),
            r(
              'so they recognised each other.',
              'because they had recognised later.',
              'so they recognise each other.',
            ),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Why did Leo miss the flight?',
          '레오는 왜 비행기를 놓쳤어요?',
          'Leo nega samolyotga kechikdi?',
          'Почему Лео опоздал на самолёт?',
          'miss the flight',
        ),
        line(
          'Jun',
          'right',
          'He had gone to the wrong terminal.',
          '잘못된 터미널로 갔었어요.',
          "U noto'g'ri terminalga borgan ekan.",
          'Он приехал не в тот терминал.',
          'had gone',
        ),
      ],
      cautions: [
        L(
          '과거의 모든 동사에 had를 붙이지 않아요. 두 과거 중 더 먼저인 일을 표시할 때 써요.',
          "O'tmishdagi har bir fe'lga had qo'shilmaydi; u ikki o'tmish hodisasidan oldinrog'ini ko'rsatadi.",
          'Do not put had on every past verb; use it to mark the earlier of two past points.',
          'Не ставьте had у каждого глагола: оно отмечает более раннее из двух прошлых событий.',
        ),
        L(
          'had 뒤에는 과거형이 아니라 과거분사가 와요: had gone, had seen.',
          'Had dan keyin past simple emas, past participle keladi: had gone, had seen.',
          'Use a past participle after had: had gone, had seen.',
          'После had ставится причастие: had gone, had seen.',
        ),
      ],
      similar: {
        pattern: 'have/has + past participle',
        note: L(
          '현재완료는 과거를 지금과 연결하고, 과거완료는 더 이른 과거를 과거의 기준점과 연결해요.',
          "Present perfect o'tmishni hozir bilan, past perfect esa oldinroq o'tmishni boshqa o'tmish nuqtasi bilan bog'laydi.",
          'The present perfect links the past to now; the past perfect links an earlier past to a later past reference point.',
          'Present perfect связывает прошлое с настоящим, past perfect — более раннее прошлое с поздней точкой в прошлом.',
        ),
      },
    },
    {
      sourceUnit: 121,
      code: 'en-general:grammar:u121-past-perfect-continuous',
      pattern: 'had been + verb-ing',
      summary: L(
        '과거의 기준 시점까지 계속되던 활동이나 그 시점에 보인 원인을 had been + -ing로 말해요.',
        "O'tmishdagi tayanch paytgacha davom etgan faoliyat yoki o'sha paytdagi ko'rinib turgan sababni had been + -ing bilan aytamiz.",
        'Use had been + verb-ing for an activity continuing up to a past point or explaining evidence at that point.',
        'Используем had been + глагол-ing для процесса до момента в прошлом или причины видимого тогда результата.',
      ),
      categoryTag: L(
        '과거완료진행형',
        'Past perfect continuous',
        'Past perfect continuous',
        'Past perfect continuous',
      ),
      explanation: L(
        '과거의 어느 순간까지 활동이 얼마나 이어졌는지 말할 때 had been + -ing를 써요. for와 since로 기간을 나타내거나, 당시 피곤함·젖은 땅 같은 결과의 원인을 설명할 수 있습니다. 활동은 그 순간 직전에 끝났을 수도 있고 그때도 계속 중이었을 수도 있어요.',
        "O'tmishdagi bir paytgacha faoliyat qancha davom etganini aytishda had been + -ing ishlatiladi. For va since davomiylikni ko'rsatadi yoki o'sha paytdagi charchoq, ho'l yer kabi natijaning sababini tushuntiradi. Faoliyat sal oldin tugagan yoki o'sha paytda ham davom etayotgan bo'lishi mumkin.",
        'Use had been + -ing to show how long an activity continued up to a past point. For and since express duration, and the form can explain a past result such as tiredness or wet ground. The activity may have just stopped or may still have been in progress.',
        'Had been + -ing показывает, как долго процесс продолжался до момента в прошлом. For и since выражают длительность; форма может объяснять прошлый результат — усталость или мокрую землю.',
      ),
      rule: L(
        '주어 + had been + 동사-ing (+ for/since) → 과거 시점까지의 활동',
        "ega + had been + fe'l-ing (+ for/since) → o'tmish nuqtasigacha faoliyat",
        'subject + had been + verb-ing (+ for/since) → activity up to a past point',
        'подлежащее + had been + глагол-ing (+ for/since) → процесс до точки в прошлом',
      ),
      forms: [
        { base: 'affirmative', result: 'They had been waiting.' },
        { base: 'negative', result: "They hadn't been waiting." },
        { base: 'question', result: 'Had they been waiting?' },
        { base: 'duration', result: 'They had been waiting for an hour.' },
      ],
      drills: [
        d(
          1,
          '버스가 왔을 때 우리는 한 시간째 기다리고 있었어요.',
          'Avtobus kelganda biz bir soatdan beri kutayotgan edik.',
          'Когда пришёл автобус, мы ждали уже час.',
          [
            r(
              'When the bus came,',
              'When the bus had come later,',
              'When the bus comes,',
            ),
            r(
              'we had been waiting for an hour.',
              'we had waited three buses.',
              'we have been waiting yesterday.',
            ),
          ],
        ),
        d(
          0,
          '미나는 하루 종일 일해서 피곤했어요.',
          "Mina kun bo'yi ishlab kelgani uchun charchagan edi.",
          'Мина устала, потому что работала весь день.',
          [
            r(
              'Mina had been working all day,',
              'Mina had completed three tasks,',
              'Mina has been working yesterday,',
            ),
            r(
              'so she was tired.',
              'because she had tired.',
              'so she is tired then.',
            ),
          ],
        ),
        d(
          1,
          '땅이 젖어 있었어요. 비가 내리고 있었거든요.',
          "Yer ho'l edi, chunki yomg'ir yog'ib turgan edi.",
          'Земля была мокрой: шёл дождь.',
          [
            r(
              'The ground was wet because',
              'The ground is wet tomorrow because',
              'Ground the was wet so',
            ),
            r(
              'it had been raining.',
              'it had rained one shower.',
              'it has been raining then.',
            ),
          ],
        ),
        d(
          0,
          '레오는 두 시간 동안 운전해서 휴식이 필요했어요.',
          'Leo ikki soat mashina haydab kelgani uchun dam olishi kerak edi.',
          'Лео два часа был за рулём, и ему нужен был отдых.',
          [
            r(
              'Leo had been driving for two hours,',
              'Leo had driven two cars,',
              'Leo has been driving yesterday,',
            ),
            r(
              'so he needed a break.',
              'because he had needed a break.',
              'so he needs a break then.',
            ),
          ],
        ),
        d(
          1,
          '그들은 식당이 문을 닫기 전부터 몇 달 동안 그곳에서 식사하고 있었어요.',
          'Restoran yopilishidan oldin ular u yerda bir necha oy ovqatlanib kelgan edi.',
          'До закрытия ресторана они ходили туда несколько месяцев.',
          [
            r(
              'Before the restaurant closed,',
              'Before the restaurant has closed yesterday,',
              'Before the restaurant closes,',
            ),
            r(
              'they had been eating there for months.',
              'they had eaten there twice.',
              'they have been eating there then.',
            ),
          ],
        ),
        d(
          0,
          '준은 달리고 있어서 숨이 가빴어요.',
          'Jun yugurib kelgani uchun nafasi qisgan edi.',
          'Джун запыхался, потому что бежал.',
          [
            r(
              'Jun had been running,',
              'Jun had run one race completely,',
              'Jun has been running yesterday,',
            ),
            r(
              'so he was out of breath.',
              'because he had out of breath.',
              'so he is out of breath then.',
            ),
          ],
        ),
        d(
          1,
          '불이 꺼졌을 때 아이들은 한 시간 동안 공부하고 있었어요.',
          "Chiroq o'chganda bolalar bir soatdan beri o'qiyotgan edi.",
          'Когда погас свет, дети занимались уже час.',
          [
            r(
              'When the power went out,',
              'When the power has gone out yesterday,',
              'When the power goes out,',
            ),
            r(
              'the children had been studying for an hour.',
              'the children had studied three chapters.',
              'the children has been studying.',
            ),
          ],
        ),
        d(
          0,
          '정비사가 올 때까지 엔진은 계속 그 소리를 내고 있었어요.',
          'Usta kelguncha dvigatel shunday shovqin chiqarib turgan edi.',
          'До прихода механика двигатель всё время издавал этот шум.',
          [
            r(
              'The engine had been making that noise',
              'The engine had made the noise once',
              'The engine has been making yesterday',
            ),
            r(
              'until the mechanic arrived.',
              'since the mechanic arrived later.',
              'until the mechanic arrives.',
            ),
          ],
        ),
        d(
          1,
          '미나의 눈이 아팠어요. 몇 시간 동안 화면을 보고 있었거든요.',
          "Minaning ko'zlari og'ridi, chunki u bir necha soat ekranga qarab kelgan edi.",
          'У Мины болели глаза: она несколько часов смотрела в экран.',
          [
            r(
              'Mina’s eyes hurt because',
              'Mina’s eyes hurt tomorrow because',
              'Mina eyes was hurt so',
            ),
            r(
              'she had been looking at the screen for hours.',
              'she had looked at three screens.',
              'she has been looking yesterday.',
            ),
          ],
        ),
        d(
          0,
          '그들이 마침내 이겼을 때 그 팀은 여러 해 동안 훈련해 오고 있었어요.',
          "Ular nihoyat g'alaba qilganda jamoa yillar davomida mashq qilib kelgan edi.",
          'К моменту победы команда тренировалась уже много лет.',
          [
            r(
              'The team had been training for years',
              'The team had won three matches',
              'The team has been training yesterday',
            ),
            r(
              'when they finally won.',
              'when they had finally winning.',
              'when they finally win.',
            ),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Why was the road so slippery?',
          '왜 도로가 그렇게 미끄러웠어요?',
          "Yo'l nega juda sirpanchiq edi?",
          'Почему дорога была такой скользкой?',
          'slippery',
        ),
        line(
          'Leo',
          'right',
          'It had been snowing since midnight.',
          '자정부터 눈이 내리고 있었어요.',
          "Yarim tundan beri qor yog'ib turgan edi.",
          'С полуночи шёл снег.',
          'had been snowing',
        ),
      ],
      cautions: [
        L(
          '과거완료진행형에는 had와 been이 모두 필요해요.',
          'Past perfect continuous da had ham, been ham kerak.',
          'The past perfect continuous needs both had and been.',
          'В past perfect continuous нужны и had, и been.',
        ),
        L(
          '완성된 수량보다 활동의 기간이나 당시 결과의 원인에 초점을 둬요.',
          "Bu shakl tugallangan miqdordan ko'ra faoliyat davomiyligi yoki o'sha paytdagi natija sababiga urg'u beradi.",
          'This form focuses on duration or the cause of a past result, not a completed quantity.',
          'Эта форма подчёркивает длительность или причину прошлого результата, а не завершённое количество.',
        ),
      ],
      similar: {
        pattern: 'have been doing',
        note: L(
          '현재완료진행형의 기준점은 지금, 과거완료진행형의 기준점은 과거예요.',
          "Present perfect continuous ning tayanch nuqtasi hozir, past perfect continuous niki esa o'tmishdir.",
          'The present perfect continuous leads up to now; the past perfect continuous leads up to a point in the past.',
          'Present perfect continuous ведёт к настоящему, past perfect continuous — к моменту в прошлом.',
        ),
      },
    },
    {
      sourceUnit: 122,
      code: 'en-general:grammar:u122-past-perfect-simple-vs-continuous',
      pattern: 'had done (completion) · had been doing (duration/cause)',
      summary: L(
        '과거 시점 이전의 완성·수량은 단순형으로, 기간·과정·원인은 진행형으로 표현해요.',
        "O'tmish nuqtasidan oldingi tugallanish va miqdor simple, davomiylik, jarayon va sabab continuous bilan ifodalanadi.",
        'Use the simple for completion or quantity before a past point, and the continuous for duration, process, or cause.',
        'Используем simple для завершённости или количества до прошлого момента, continuous — для длительности, процесса или причины.',
      ),
      categoryTag: L(
        '과거완료 비교',
        'Past perfect taqqoslash',
        'Past perfect contrast',
        'Сравнение past perfect',
      ),
      explanation: L(
        '둘 다 과거의 기준점보다 앞선 일을 말하지만 초점이 달라요. had done은 일이 끝났거나 몇 개를 완성했는지 보여 주고, had been doing은 얼마나 오래 했는지 또는 당시 상태의 원인을 보여 줍니다. know·own·believe 같은 상태동사는 기간이 있어도 보통 단순형을 써요.',
        "Ikkalasi ham o'tmishdagi tayanch nuqtadan oldingi ishni bildiradi, lekin urg'u boshqacha. Had done ish tugaganini yoki nechta bajarilganini, had been doing esa qancha davom etganini yoki o'sha paytdagi holat sababini ko'rsatadi. Know, own, believe kabi holat fe'llari davomiylik bo'lsa ham odatda simple bilan keladi.",
        'Both forms look back from a past reference point. Had done shows completion or a completed number; had been doing shows duration, process, or the cause of a past condition. State verbs such as know, own, and believe normally stay in the simple even with a duration.',
        'Обе формы смотрят назад из прошлой точки. Had done показывает завершённость или количество, had been doing — длительность, процесс или причину состояния. Глаголы состояния обычно остаются в simple.',
      ),
      rule: L(
        '완료/수량/상태: had + p.p. · 기간/과정/원인: had been + -ing',
        'tugallanish/miqdor/holat: had + p.p. · davomiylik/jarayon/sabab: had been + -ing',
        'completion/quantity/state: had + past participle · duration/process/cause: had been + -ing',
        'завершённость/количество/состояние: had + причастие · длительность/процесс/причина: had been + -ing',
      ),
      forms: [
        { base: 'completed task', result: 'She had written the report.' },
        { base: 'duration', result: 'She had been writing for two hours.' },
        { base: 'quantity', result: 'They had built three houses.' },
        { base: 'state', result: 'I had known him for years.' },
      ],
      drills: [
        d(
          0,
          '회의 전에 미나는 보고서를 끝내 놓았어요.',
          "Yig'ilishdan oldin Mina hisobotni tugatgan edi.",
          'До совещания Мина закончила отчёт.',
          [
            r(
              'Mina had finished the report',
              'Mina had been finishing the report for hours',
              'Mina has finished the report yesterday',
            ),
            r(
              'before the meeting.',
              'since the meeting.',
              'before meeting begins tomorrow.',
            ),
          ],
        ),
        d(
          0,
          '회의가 시작될 때 미나는 두 시간째 보고서를 쓰고 있었어요.',
          "Yig'ilish boshlanganda Mina ikki soatdan beri hisobot yozayotgan edi.",
          'К началу совещания Мина писала отчёт уже два часа.',
          [
            r(
              'Mina had been writing the report for two hours',
              'Mina had written two reports',
              'Mina has been writing yesterday',
            ),
            r(
              'when the meeting began.',
              'when the meeting begins.',
              'since the meeting began later.',
            ),
          ],
        ),
        d(
          1,
          '손님들이 왔을 때 레오는 케이크를 세 개 만들어 두었어요.',
          'Mehmonlar kelganda Leo uchta tort tayyorlagan edi.',
          'К приходу гостей Лео приготовил три торта.',
          [
            r(
              'When the guests arrived,',
              'When the guests arrive tomorrow,',
              'When the guests had arriving,',
            ),
            r(
              'Leo had made three cakes.',
              'Leo had been making three cakes for time.',
              'Leo has made three cakes yesterday.',
            ),
          ],
        ),
        d(
          1,
          '레오는 오후 내내 빵을 굽고 있어서 주방이 더웠어요.',
          'Leo tushdan keyin non yopib kelgani uchun oshxona issiq edi.',
          'Лео весь день пёк, поэтому на кухне было жарко.',
          [
            r(
              'The kitchen was hot because',
              'The kitchen is hot tomorrow because',
              'Kitchen the was hot so',
            ),
            r(
              'Leo had been baking all afternoon.',
              'Leo had baked four loaves.',
              'Leo has been baking yesterday.',
            ),
          ],
        ),
        d(
          0,
          '우리는 문을 닫기 전에 표를 모두 팔았어요.',
          'Biz yopilishdan oldin barcha chiptalarni sotgan edik.',
          'Мы продали все билеты до закрытия.',
          [
            r(
              'We had sold all the tickets',
              'We had been selling tickets for hours',
              'We have sold all tickets yesterday',
            ),
            r(
              'before the doors closed.',
              'since the doors closed.',
              'before the doors close tomorrow.',
            ),
          ],
        ),
        d(
          0,
          '직원들은 문이 닫힐 때까지 몇 시간 동안 표를 팔고 있었어요.',
          'Eshiklar yopilguncha xodimlar bir necha soat chipta sotib kelgan edi.',
          'Сотрудники продавали билеты несколько часов до закрытия.',
          [
            r(
              'The staff had been selling tickets for hours',
              'The staff had sold every ticket',
              'The staff has been selling yesterday',
            ),
            r(
              'when the doors closed.',
              'when the doors close.',
              'after the doors had closed first.',
            ),
          ],
        ),
        d(
          1,
          '그가 이사했을 때 나는 그를 5년 동안 알고 있었어요.',
          "U ko'chib ketganda men uni besh yildan beri tanirdim.",
          'Когда он переехал, я знал его уже пять лет.',
          [
            r(
              'When he moved away,',
              'When he moves away tomorrow,',
              'When he had moving away,',
            ),
            r(
              'I had known him for five years.',
              'I had been knowing him for five years.',
              'I have known him yesterday.',
            ),
          ],
        ),
        d(
          0,
          '미나는 시험 전에 그 책을 두 번 읽었어요.',
          "Mina imtihondan oldin kitobni ikki marta o'qigan edi.",
          'До экзамена Мина прочитала книгу дважды.',
          [
            r(
              'Mina had read the book twice',
              'Mina had been reading twice for hours',
              'Mina has read the book yesterday',
            ),
            r('before the exam.', 'since the exam.', 'before exam tomorrow.'),
          ],
        ),
        d(
          1,
          '레오가 쉬었을 때에는 아침부터 책을 읽고 있었어요.',
          "Leo dam olganda ertalabdan beri kitob o'qiyotgan edi.",
          'Когда Лео сделал перерыв, он читал с самого утра.',
          [
            r(
              'When Leo took a break,',
              'When Leo takes a break tomorrow,',
              'When Leo had taking a break,',
            ),
            r(
              'he had been reading since morning.',
              'he had read three books since morning.',
              'he has been reading yesterday.',
            ),
          ],
        ),
        d(
          0,
          '기술자가 도착하기 전에 기계는 두 번 멈췄어요.',
          "Texnik kelishidan oldin mashina ikki marta to'xtagan edi.",
          'До прихода техника машина останавливалась дважды.',
          [
            r(
              'The machine had stopped twice',
              'The machine had been stopping for two hours',
              'The machine has stopped yesterday',
            ),
            r(
              'before the technician arrived.',
              'since the technician arrived.',
              'before the technician arrives tomorrow.',
            ),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Was the presentation ready on time?',
          '발표 자료가 제시간에 준비됐어요?',
          "Taqdimot o'z vaqtida tayyor bo'ldimi?",
          'Презентация была готова вовремя?',
          'ready on time',
        ),
        line(
          'Jun',
          'right',
          'Yes. I had completed it after I had been working on it all night.',
          '네. 밤새 작업한 끝에 완성했어요.',
          "Ha. Tun bo'yi ustida ishlab, uni tugatgan edim.",
          'Да. Я закончил её после того, как работал всю ночь.',
          'had completed',
        ),
      ],
      cautions: [
        L(
          'how many와 횟수는 단순형, how long과 기간은 진행형이 기본 선택이에요.',
          'How many va takror soni bilan simple, how long va davomiylik bilan continuous asosiy tanlovdir.',
          'As a default, use the simple with how many or a number of times, and the continuous with how long or a duration.',
          'Обычно simple употребляется с how many и числом раз, continuous — с how long и длительностью.',
        ),
        L(
          '상태동사는 진행형을 피해서 had known, had owned처럼 써요.',
          "Holat fe'llarida continuous dan qochib, had known, had owned deb ayting.",
          'Avoid the continuous with state verbs: use had known or had owned.',
          'С глаголами состояния избегайте continuous: had known, had owned.',
        ),
      ],
      similar: {
        pattern: 'has done · has been doing',
        note: L(
          '현재완료의 결과 대 활동 구별을 과거의 기준점으로 옮긴 것이 과거완료의 두 형태예요.',
          "Present perfect dagi natija va faoliyat farqi o'tmish tayanch nuqtasiga ko'chirilsa, past perfect ning ikki shakli hosil bo'ladi.",
          'The two past perfect forms carry the present-perfect result/activity contrast back to a past reference point.',
          'Две формы past perfect переносят различие результата и процесса к прошлой точке отсчёта.',
        ),
      },
    },
  ],
};
