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

export const ENGLISH_GRAMMAR_S9_U3: EnglishGrammarUnit = {
  section: 9,
  unit: 3,
  level: '6',
  title: L(
    '미래 선택과 미래완료',
    'Kelajak shakllari va future perfect',
    'Future choices and future perfect forms',
    'Выбор будущей формы и future perfect',
  ),
  description: L(
    '예측·결정·계획·일정을 구별해 미래형을 선택하고, 미래 시점에 진행 중이거나 완료될 일을 표현해요.',
    'Bashorat, qaror, reja va jadvalni ajratib kelajak shaklini tanlaymiz hamda kelajak paytda davom etayotgan yoki tugagan ishni ifodalaymiz.',
    'Choose a future form for predictions, decisions, plans, and schedules, then describe what will be in progress or complete at a future point.',
    'Выбираем форму будущего для прогноза, решения, плана и расписания, затем описываем процесс или завершённость в будущей точке.',
  ),
  specs: [
    {
      sourceUnit: 123,
      code: 'en-general:grammar:u123-will-vs-going-to',
      pattern: 'will + verb · am/is/are going to + verb',
      summary: L(
        '즉석 결정·약속·의견 기반 예측에는 will, 미리 세운 의도와 현재 증거 기반 예측에는 going to를 써요.',
        "Tezkor qaror, va'da va fikrga asoslangan bashoratda will; oldindan reja va hozirgi dalilga asoslangan bashoratda going to ishlatiladi.",
        'Use will for instant decisions, promises, and opinion-based predictions; use going to for prior intentions and predictions based on present evidence.',
        'Will употребляем для спонтанных решений, обещаний и прогноза-мнения; going to — для заранее принятого намерения и прогноза по видимым признакам.',
      ),
      categoryTag: L(
        'will과 going to',
        'Will va going to',
        'Will and going to',
        'Will и going to',
      ),
      explanation: L(
        '말하는 순간 결정하거나 제안·약속·거절할 때 will을 써요. “I think”처럼 개인의 판단으로 예측할 때도 will이 자연스럽습니다. 반면 이미 정한 계획이나 의도는 be going to, 검은 구름처럼 지금 보이는 증거로 곧 일어날 일을 예측할 때도 going to를 씁니다.',
        "Gapirayotgan paytda qaror, taklif, va'da yoki rad etishda will ishlatiladi. I think kabi shaxsiy fikrga asoslangan bashoratda ham will tabiiy. Oldindan belgilangan niyat yoki reja be going to bilan, qora bulut kabi hozirgi dalil asosidagi yaqin bashorat ham going to bilan aytiladi.",
        'Use will for a decision made as you speak, and for offers, promises, or refusals. It is also natural for a prediction based on opinion, often after I think. Use be going to for an intention decided earlier and for a prediction based on present evidence, such as dark clouds.',
        'Will употребляется для решения в момент речи, предложения, обещания или отказа, а также для прогноза-мнения. Be going to выражает заранее принятое намерение и прогноз по видимым сейчас признакам.',
      ),
      rule: L(
        '즉석 결정/약속/의견 예측: will + 동사원형 · 사전 의도/현재 증거: be going to + 동사원형',
        "tezkor qaror/va'da/fikr bashorati: will + infinitive · oldingi niyat/hozirgi dalil: be going to + infinitive",
        'instant decision/promise/opinion: will + base verb · prior intention/present evidence: be going to + base verb',
        'спонтанное решение/обещание/мнение: will + инфинитив · намерение/видимые признаки: be going to + инфинитив',
      ),
      forms: [
        { base: 'instant decision', result: "I'll answer the phone." },
        { base: 'promise/offer', result: "I'll help you." },
        { base: 'prior intention', result: "I'm going to apply." },
        { base: 'present evidence', result: "It's going to rain." },
      ],
      drills: [
        d(
          1,
          '전화가 울리네요. 제가 받을게요.',
          'Telefon jiringlayapti. Men javob beraman.',
          'Телефон звонит. Я отвечу.',
          [
            r(
              'The phone is ringing.',
              'The phone rings every day.',
              'Phone the is ringing.',
            ),
            r(
              'I will answer it.',
              'I am going to answer it yesterday.',
              'I will answering it.',
            ),
          ],
        ),
        d(
          1,
          '걱정하지 마세요. 비밀을 지킬게요.',
          'Xavotir olmang. Men siringizni saqlayman.',
          'Не волнуйтесь. Я сохраню ваш секрет.',
          [
            r('Do not worry.', 'Not worry do.', 'Do not worried.'),
            r(
              'I will keep your secret.',
              'I am keeping your secret yesterday.',
              'I will to keep your secret.',
            ),
          ],
        ),
        d(
          0,
          '나는 언젠가 사람들이 화성에서 살 거라고 생각해요.',
          'Menimcha, bir kun odamlar Marsda yashaydi.',
          'Я думаю, однажды люди будут жить на Марсе.',
          [
            r(
              'I think people will live on Mars one day.',
              'Look at the evidence; people are going to live yesterday.',
              'I think people will living on Mars.',
            ),
            r(
              'Technology is changing quickly.',
              'Technology change quickly tomorrow.',
              'The technology are changing.',
            ),
          ],
        ),
        d(
          1,
          '우리는 저축한 돈으로 차를 살 계획이에요.',
          "Biz jamg'argan pulimizga mashina sotib olmoqchimiz.",
          'Мы собираемся купить машину на накопленные деньги.',
          [
            r(
              'We have saved enough money, so',
              'We decide this moment, so',
              'We saved enough money tomorrow, so',
            ),
            r(
              'we are going to buy a car.',
              'we will buying a car.',
              'we going buy a car.',
            ),
          ],
        ),
        d(
          1,
          '저 검은 구름을 봐요. 비가 오겠어요.',
          "Qora bulutlarga qarang. Yomg'ir yog'moqchi.",
          'Посмотрите на тучи. Сейчас пойдёт дождь.',
          [
            r(
              'Look at those dark clouds.',
              'I personally think without evidence.',
              'Look those cloud dark.',
            ),
            r(
              'It is going to rain.',
              'It will raining yesterday.',
              'It going to rain.',
            ),
          ],
        ),
        d(
          0,
          '미나는 이미 결정했어요. 의학을 공부할 거예요.',
          "Mina allaqachon qaror qilgan. U tibbiyot o'qimoqchi.",
          'Мина уже решила: она собирается изучать медицину.',
          [
            r(
              'Mina is going to study medicine.',
              'Mina will studying medicine.',
              'Mina going study medicine.',
            ),
            r(
              'She made the decision last month.',
              'She makes the decision next yesterday.',
              'She decision made last month.',
            ),
          ],
        ),
        d(
          1,
          '이 상자는 무거워 보여요. 제가 들어 드릴게요.',
          "Bu quti og'ir ko'rinadi. Men ko'tarib beraman.",
          'Коробка выглядит тяжёлой. Я понесу.',
          [
            r(
              'That box looks heavy.',
              'That box look heavily.',
              'Those box looks heavy.',
            ),
            r(
              'I will carry it for you.',
              'I am going carry it yesterday.',
              'I will carrying it.',
            ),
          ],
        ),
        d(
          0,
          '조심해요! 컵이 떨어지겠어요.',
          "Ehtiyot bo'ling! Piyola tushib ketmoqchi.",
          'Осторожно! Чашка сейчас упадёт.',
          [
            r(
              'Be careful! The cup is going to fall.',
              'Be careful! The cup will falling.',
              'Be careful! Cup going fall.',
            ),
            r(
              'It is right on the edge.',
              'It right is edge on.',
              'It was on edge tomorrow.',
            ),
          ],
        ),
        d(
          1,
          '레오는 아마 그 제안을 받아들일 거예요.',
          'Menimcha, Leo taklifni qabul qiladi.',
          'Думаю, Лео примет предложение.',
          [
            r('In my opinion,', 'From the visible smoke,', 'In opinion mine,'),
            r(
              'Leo will accept the offer.',
              'Leo is going accept yesterday.',
              'Leo will accepts the offer.',
            ),
          ],
        ),
        d(
          0,
          '우리는 주말에 부엌을 다시 칠할 계획이에요.',
          "Biz dam olish kunlari oshxonani qayta bo'yamoqchimiz.",
          'На выходных мы собираемся перекрасить кухню.',
          [
            r(
              'We are going to repaint the kitchen this weekend.',
              'We will repainting the kitchen yesterday.',
              'We going to repaint kitchen.',
            ),
            r(
              'We bought the paint yesterday.',
              'We buy the paint next year ago.',
              'We bought paint tomorrow.',
            ),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'I cannot move this table alone.',
          '이 탁자를 혼자 옮길 수 없어요.',
          "Bu stolni yolg'iz ko'chira olmayman.",
          'Я не могу передвинуть этот стол одна.',
          'cannot move',
        ),
        line(
          'Leo',
          'right',
          'I will help you. Where are you going to put it?',
          '제가 도와줄게요. 어디에 놓을 계획이에요?',
          "Men yordam beraman. Uni qayerga qo'ymoqchisiz?",
          'Я помогу. Куда ты собираешься его поставить?',
          'will help',
        ),
      ],
      cautions: [
        L(
          '모든 미래를 will 하나로만 표현하지 않아요. 결정 시점과 예측의 근거를 확인해요.',
          'Barcha kelajakni faqat will bilan aytmang; qaror qachon qabul qilingani va bashorat dalilini tekshiring.',
          'Do not use will for every future meaning; check when the decision was made and what the prediction is based on.',
          'Не выражайте всё будущее только через will: учитывайте момент решения и основание прогноза.',
        ),
        L(
          'going to 앞에는 주어에 맞는 am/is/are가 꼭 필요해요.',
          'Going to oldidan egaga mos am/is/are albatta kerak.',
          'Going to needs the correct form of be: am, is, or are.',
          'Перед going to обязательно нужна подходящая форма be: am, is или are.',
        ),
      ],
      similar: {
        pattern: 'present continuous for arrangements',
        note: L(
          'going to는 의도에, 현재진행형은 시간·장소까지 정해진 약속에 더 초점을 둬요.',
          "Going to niyatga, present continuous esa vaqt va joyi belgilangan kelishuvga ko'proq urg'u beradi.",
          'Going to focuses on intention; the present continuous more strongly suggests a fixed arrangement with details.',
          'Going to подчёркивает намерение, present continuous — конкретную договорённость с деталями.',
        ),
      },
    },
    {
      sourceUnit: 124,
      code: 'en-general:grammar:u124-future-present-simple-vs-continuous',
      pattern: 'The train leaves ... · I am meeting ...',
      summary: L(
        '공식 시간표와 일정은 현재형으로, 사람끼리 구체적으로 정한 약속은 현재진행형으로 말해요.',
        'Rasmiy jadval va dastur uchun present simple, odamlar o‘rtasidagi aniq kelishuv uchun present continuous ishlatiladi.',
        'Use the present simple for timetables and programmes, and the present continuous for a fixed personal arrangement.',
        'Present simple употребляем для расписаний и программ, present continuous — для конкретной личной договорённости.',
      ),
      categoryTag: L(
        '미래의 현재시제',
        'Kelajak uchun hozirgi zamon',
        'Present tenses for future',
        'Настоящие времена для будущего',
      ),
      explanation: L(
        '열차 출발, 수업 시작, 공연 종료처럼 개인이 쉽게 바꾸지 못하는 공식 시간표는 현재형을 써요. 반면 누군가와 만나기로 했고 시간·장소 같은 세부가 정해진 개인 약속은 현재진행형을 씁니다. 미래 시간 표현이 문맥을 분명하게 해 줘요.',
        "Poyezd jo'nashi, dars boshlanishi, tomosha tugashi kabi shaxs oson o'zgartira olmaydigan rasmiy jadval present simple bilan keladi. Kim bilandir uchrashish va vaqt-joyi belgilangan shaxsiy kelishuv present continuous bilan aytiladi. Kelajak vaqt ifodasi kontekstni aniq qiladi.",
        'Use the present simple for an official timetable that an individual does not control, such as a train departure or class start. Use the present continuous for a personal arrangement with another person, especially when the time or place is fixed. A future time expression makes the meaning clear.',
        'Present simple описывает официальное расписание — отправление поезда, начало занятия. Present continuous выражает личную договорённость с установленными временем или местом.',
      ),
      rule: L(
        '공식 일정: 현재형 + 미래 시간 · 개인 약속: am/is/are + -ing + 미래 시간',
        'rasmiy jadval: present simple + kelajak vaqti · shaxsiy kelishuv: am/is/are + -ing + kelajak vaqti',
        'official schedule: present simple + future time · personal arrangement: am/is/are + -ing + future time',
        'официальное расписание: present simple + будущее время · договорённость: am/is/are + -ing + будущее время',
      ),
      forms: [
        { base: 'timetable', result: 'The train leaves at 8:10.' },
        { base: 'programme', result: 'The film starts at nine.' },
        { base: 'arrangement', result: "I'm meeting Mina tonight." },
        {
          base: 'planned visit',
          result: "We're staying with friends this weekend.",
        },
      ],
      drills: [
        d(
          0,
          '기차는 내일 7시 30분에 출발해요.',
          "Poyezd ertaga soat 7:30 da jo'naydi.",
          'Поезд отправляется завтра в 7:30.',
          [
            r(
              'The train leaves at 7:30 tomorrow.',
              'The train is personally leaving Mina at 7:30.',
              'The train leave at 7:30 tomorrow.',
            ),
            r(
              'It is on the official timetable.',
              'It is our private arrangement.',
              'It on official timetable.',
            ),
          ],
        ),
        d(
          1,
          '나는 오늘 저녁 미나를 만나기로 했어요.',
          'Men bugun kechqurun Mina bilan uchrashyapman.',
          'Сегодня вечером я встречаюсь с Миной.',
          [
            r(
              'I have arranged the time with Mina, so',
              'The official timetable says, so',
              'I arrange yesterday, so',
            ),
            r(
              'I am meeting her this evening.',
              'I meet her every this evening.',
              'I meeting her this evening.',
            ),
          ],
        ),
        d(
          0,
          '수업은 월요일 오전 9시에 시작해요.',
          "Dars dushanba soat to'qqizda boshlanadi.",
          'Занятие начинается в понедельник в девять.',
          [
            r(
              'The class starts at nine on Monday.',
              'The class is arranging us at nine.',
              'The class start at nine Monday.',
            ),
            r(
              'The schedule is already published.',
              'We just made a private date.',
              'The schedule already publish.',
            ),
          ],
        ),
        d(
          1,
          '우리는 이번 주말에 친구 집에서 묵기로 했어요.',
          "Biz bu dam olish kunlari do'stlarimiznikida qolamiz.",
          'На выходных мы остаёмся у друзей.',
          [
            r(
              'We agreed with our friends, and',
              'The public timetable says, and',
              'We agree tomorrow yesterday, and',
            ),
            r(
              'we are staying with them this weekend.',
              'we stay with them every this weekend.',
              'we staying with them weekend.',
            ),
          ],
        ),
        d(
          0,
          '박물관은 토요일에 오전 10시에 문을 열어요.',
          "Muzey shanba kuni soat o'nda ochiladi.",
          'Музей открывается в субботу в десять.',
          [
            r(
              'The museum opens at ten on Saturday.',
              'The museum is meeting us at ten.',
              'The museum open at ten Saturday.',
            ),
            r(
              'That is its regular timetable.',
              'That is our private invitation.',
              'That its timetable regular.',
            ),
          ],
        ),
        d(
          1,
          '레오는 내일 치과에 가기로 예약했어요.',
          'Leo ertaga tish shifokoriga boradi.',
          'Завтра Лео идёт к стоматологу.',
          [
            r(
              'Leo has an appointment, so',
              'The train timetable says, so',
              'Leo appointment have, so',
            ),
            r(
              'he is seeing the dentist tomorrow.',
              'he sees the dentist every tomorrow.',
              'he seeing dentist tomorrow.',
            ),
          ],
        ),
        d(
          0,
          '마지막 버스는 자정에 도착해요.',
          'Oxirgi avtobus yarim tunda keladi.',
          'Последний автобус прибывает в полночь.',
          [
            r(
              'The last bus arrives at midnight.',
              'The last bus is arranging midnight.',
              'The last bus arrive midnight.',
            ),
            r(
              'That time is printed on the timetable.',
              'We agreed to meet the bus personally.',
              'That time printed timetable.',
            ),
          ],
        ),
        d(
          1,
          '나는 금요일에 새 팀장과 점심을 먹기로 했어요.',
          'Men juma kuni yangi rahbar bilan tushlik qilaman.',
          'В пятницу я обедаю с новым руководителем.',
          [
            r(
              'We booked a table, and',
              'The public schedule opens, and',
              'We book table tomorrow ago, and',
            ),
            r(
              'I am having lunch with my new manager on Friday.',
              'I have lunch every on Friday tomorrow.',
              'I having lunch manager Friday.',
            ),
          ],
        ),
        d(
          0,
          '공연은 10시 15분에 끝나요.',
          'Tomosha soat 10:15 da tugaydi.',
          'Спектакль заканчивается в 10:15.',
          [
            r(
              'The show finishes at 10:15.',
              'The show is meeting the actors at 10:15.',
              'The show finish at 10:15.',
            ),
            r(
              'The programme gives that time.',
              'My friend arranged that time with me.',
              'Programme the give that time.',
            ),
          ],
        ),
        d(
          1,
          '우리는 내일 아침 공항에서 준을 만나기로 했어요.',
          'Biz ertaga ertalab aeroportda Jun bilan uchrashamiz.',
          'Завтра утром мы встречаем Джуна в аэропорту.',
          [
            r(
              'We agreed on the place, so',
              'The flight timetable controls us, so',
              'We agree place yesterday, so',
            ),
            r(
              'we are meeting Jun at the airport tomorrow morning.',
              'we meet Jun every tomorrow morning.',
              'we meeting Jun airport tomorrow.',
            ),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'What time does the concert start?',
          '콘서트는 몇 시에 시작해요?',
          'Konsert soat nechada boshlanadi?',
          'Во сколько начинается концерт?',
          'does the concert start',
        ),
        line(
          'Leo',
          'right',
          'It starts at eight, and I am meeting Jun outside at seven thirty.',
          '8시에 시작하고, 나는 7시 30분에 밖에서 준을 만나기로 했어요.',
          'U sakkizda boshlanadi, men Jun bilan tashqarida 7:30 da uchrashaman.',
          'Он начинается в восемь, а с Джуном я встречаюсь снаружи в 7:30.',
          'am meeting',
        ),
      ],
      cautions: [
        L(
          '현재형이 미래를 뜻하려면 보통 시간표·프로그램이라는 맥락이나 미래 시간 표현이 필요해요.',
          'Present simple kelajakni bildirish uchun odatda jadval konteksti yoki kelajak vaqt ifodasi kerak.',
          'For the present simple to mean future time, the context normally needs a timetable, programme, or future time expression.',
          'Чтобы present simple обозначал будущее, обычно нужен контекст расписания или указание будущего времени.',
        ),
        L(
          '개인 계획이라도 아직 구체적으로 약속하지 않았다면 going to가 더 자연스러울 수 있어요.',
          "Shaxsiy reja hali aniq kelishilmagan bo'lsa, going to tabiiyroq bo'lishi mumkin.",
          'For a personal plan that is not yet arranged in detail, going to may be more natural.',
          'Если личный план ещё не согласован в деталях, естественнее going to.',
        ),
      ],
      similar: {
        pattern: 'be going to + verb',
        note: L(
          'going to는 의도, 현재진행형은 확정된 약속, 현재형은 공식 일정을 강조해요.',
          "Going to niyatni, present continuous aniq kelishuvni, present simple rasmiy jadvalni ta'kidlaydi.",
          'Going to highlights intention, the present continuous a fixed arrangement, and the present simple an official schedule.',
          'Going to подчёркивает намерение, present continuous — договорённость, present simple — официальное расписание.',
        ),
      },
    },
    {
      sourceUnit: 125,
      code: 'en-general:grammar:u125-future-continuous',
      pattern: 'will be + verb-ing',
      summary: L(
        '미래의 특정 시점이나 기간에 진행 중일 활동을 will be + -ing로 말해요.',
        'Kelajakdagi aniq payt yoki davrda davom etayotgan faoliyatni will be + -ing bilan aytamiz.',
        'Use will be + verb-ing for an activity that will be in progress at a particular future time or over a future period.',
        'Используем will be + глагол-ing для процесса в определённый будущий момент или период.',
      ),
      categoryTag: L(
        '미래진행형',
        'Future continuous',
        'Future continuous',
        'Future continuous',
      ),
      explanation: L(
        '미래의 한 시점을 상상해 그때 진행 중일 일을 말할 때 미래진행형을 써요. this time tomorrow, at eight tonight, all next week와 자주 어울립니다. 또한 상대의 계획을 부담 없이 확인하는 정중한 질문 “Will you be using ...?”에도 쓸 수 있어요.',
        "Kelajakdagi bir paytni tasavvur qilib, o'sha vaqtda davom etayotgan ishni future continuous bilan aytamiz. This time tomorrow, at eight tonight, all next week bilan ko'p ishlatiladi. Will you be using ...? shakli birovning rejasini muloyim so'rashga ham xizmat qiladi.",
        'Use the future continuous when you look ahead to an activity already in progress at a future time. Common markers are this time tomorrow, at eight tonight, and all next week. Will you be using ...? can also ask politely about someone’s expected plans.',
        'Future continuous описывает процесс, который будет идти в определённый будущий момент. Частые маркеры: this time tomorrow, at eight tonight, all next week. Вопрос Will you be using ...? вежливо уточняет планы.',
      ),
      rule: L(
        '주어 + will be + 동사-ing · 부정: will not be + -ing · 의문: Will + 주어 + be + -ing?',
        "ega + will be + fe'l-ing · inkor: will not be + -ing · savol: Will + ega + be + -ing?",
        'subject + will be + verb-ing · negative: will not be + -ing · question: Will + subject + be + -ing?',
        'подлежащее + will be + глагол-ing · отрицание: will not be + -ing · вопрос: Will + подлежащее + be + -ing?',
      ),
      forms: [
        { base: 'future point', result: "I'll be working at nine." },
        { base: 'future period', result: "We'll be travelling all week." },
        { base: 'negative', result: "She won't be staying long." },
        { base: 'polite plan question', result: 'Will you be using the car?' },
      ],
      drills: [
        d(
          1,
          '내일 이 시간에는 나는 파리로 날아가고 있을 거예요.',
          "Ertaga shu payt men Parijga uchayotgan bo'laman.",
          'Завтра в это время я буду лететь в Париж.',
          [
            r(
              'This time tomorrow,',
              'By yesterday at this time,',
              'This time tomorrow ago,',
            ),
            r(
              'I will be flying to Paris.',
              'I will have flown before Paris.',
              'I will flying to Paris.',
            ),
          ],
        ),
        d(
          0,
          '오늘 밤 8시에는 미나가 발표 중일 거예요.',
          "Bugun kechqurun soat sakkizda Mina taqdimot qilayotgan bo'ladi.",
          'Сегодня в восемь Мина будет выступать.',
          [
            r(
              'Mina will be giving her presentation at eight tonight.',
              'Mina will have given it before eight.',
              'Mina will giving presentation at eight.',
            ),
            r(
              'Do not call her then.',
              'Call her yesterday then.',
              'Do not calling her then.',
            ),
          ],
        ),
        d(
          1,
          '우리는 다음 주 내내 해변 근처에 머물고 있을 거예요.',
          'Biz kelasi hafta davomida sohil yaqinida turamiz.',
          'Всю следующую неделю мы будем жить у моря.',
          [
            r(
              'During all of next week,',
              'By the end of last week,',
              'All next week ago,',
            ),
            r(
              'we will be staying near the beach.',
              'we will have stayed before the beach.',
              'we will staying near beach.',
            ),
          ],
        ),
        d(
          0,
          '내일 차를 사용하실 건가요?',
          'Ertaga mashinadan foydalanasizmi?',
          'Вы будете пользоваться машиной завтра?',
          [
            r(
              'Will you be using the car tomorrow?',
              'Have you used the car yesterday?',
              'Will you using the car tomorrow?',
            ),
            r(
              'I may need it in the afternoon.',
              'I needed it last afternoon ago.',
              'I may needing it afternoon.',
            ),
          ],
        ),
        d(
          1,
          '레오는 점심시간에 공부하고 있을 테니 방해하지 마세요.',
          "Leo tushlik payti o'qiyotgan bo'ladi, shuning uchun bezovta qilmang.",
          'Лео будет заниматься во время обеда, не мешайте ему.',
          [
            r(
              'Leo has an exam, so',
              'Leo finished the exam yesterday, so',
              'Leo have an exam, so',
            ),
            r(
              'he will be studying at lunchtime.',
              'he will have studied before lunchtime.',
              'he will studying lunchtime.',
            ),
          ],
        ),
        d(
          0,
          '우리는 6시부터 8시까지 저녁을 먹고 있을 거예요.',
          "Biz oltidan sakkizgacha kechki ovqatlanayotgan bo'lamiz.",
          'С шести до восьми мы будем ужинать.',
          [
            r(
              'We will be having dinner from six to eight.',
              'We will have had dinner by six.',
              'We will having dinner six eight.',
            ),
            r(
              'Please come after eight.',
              'Please came yesterday after eight.',
              'Please coming after eight.',
            ),
          ],
        ),
        d(
          1,
          '기차가 도착할 때쯤에는 해가 지고 있을 거예요.',
          "Poyezd kelganda quyosh botayotgan bo'ladi.",
          'Когда прибудет поезд, солнце будет садиться.',
          [
            r(
              'When the train arrives,',
              'When the train arrived yesterday,',
              'When the train will arrives,',
            ),
            r(
              'the sun will be setting.',
              'the sun will have set before every time.',
              'the sun will setting.',
            ),
          ],
        ),
        d(
          0,
          '미나는 다음 달에는 야간 근무를 하지 않을 거예요.',
          'Mina kelasi oy tungi smenada ishlamaydi.',
          'В следующем месяце Мина не будет работать по ночам.',
          [
            r(
              'Mina will not be working nights next month.',
              'Mina has not worked nights yesterday.',
              'Mina will not working nights.',
            ),
            r(
              'Her schedule has changed.',
              'Her schedule change tomorrow yesterday.',
              'Her schedules has changed.',
            ),
          ],
        ),
        d(
          1,
          '회의 후에 사무실로 돌아오실 건가요?',
          "Yig'ilishdan keyin ofisga qaytasizmi?",
          'Вы будете возвращаться в офис после встречи?',
          [
            r(
              'After the meeting,',
              'After yesterday meeting,',
              'After the meeting will end,',
            ),
            r(
              'will you be coming back to the office?',
              'will you have come back before it?',
              'will you coming back office?',
            ),
          ],
        ),
        d(
          0,
          '자정에는 대부분의 사람들이 축하하고 있을 거예요.',
          "Yarim tunda ko'pchilik bayram qilayotgan bo'ladi.",
          'В полночь большинство людей будут праздновать.',
          [
            r(
              'At midnight most people will be celebrating.',
              'By midnight most people will have left.',
              'At midnight people will celebrating.',
            ),
            r(
              'The streets will be noisy.',
              'The streets were noisy tomorrow.',
              'Street the will noisy.',
            ),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Can I call you at nine tonight?',
          '오늘 밤 9시에 전화해도 돼요?',
          "Bugun soat to'qqizda qo'ng'iroq qilsam bo'ladimi?",
          'Можно позвонить тебе сегодня в девять?',
          'at nine tonight',
        ),
        line(
          'Leo',
          'right',
          'I will be driving then. I will call you when I arrive.',
          '그때는 운전 중일 거예요. 도착하면 전화할게요.',
          "O'sha payt mashina haydayotgan bo'laman. Yetib borgach qo'ng'iroq qilaman.",
          'В это время я буду за рулём. Позвоню, когда приеду.',
          'will be driving',
        ),
      ],
      cautions: [
        L(
          '미래진행형은 그 시점 전에 완료된 일이 아니라 그때 진행 중인 일을 보여 줘요.',
          "Future continuous o'sha paytgacha tugagan ishni emas, o'sha paytda davom etayotgan ishni ko'rsatadi.",
          'The future continuous shows an activity in progress then, not one completed before then.',
          'Future continuous показывает процесс в тот момент, а не завершённость до него.',
        ),
        L(
          'when 뒤의 시간절에는 보통 will을 쓰지 않아요: when the train arrives.',
          'When dan keyingi vaqt gapida odatda will ishlatilmaydi: when the train arrives.',
          'Do not normally use will in a time clause after when: when the train arrives.',
          'В придаточном времени после when обычно не ставим will: when the train arrives.',
        ),
      ],
      similar: {
        pattern: 'was/were + verb-ing',
        note: L(
          '과거진행형은 과거 시점의 진행, 미래진행형은 미래 시점의 진행을 바라봐요.',
          "Past continuous o'tmish nuqtasidagi, future continuous kelajak nuqtasidagi jarayonni ko'rsatadi.",
          'The past continuous looks at an activity in progress at a past point; the future continuous does the same at a future point.',
          'Past continuous показывает процесс в прошлой точке, future continuous — в будущей.',
        ),
      },
    },
    {
      sourceUnit: 126,
      code: 'en-general:grammar:u126-future-perfect-simple',
      pattern: 'will have + past participle',
      summary: L(
        '미래의 기준 시점 전에 완료될 일이나 그때까지 달성할 수량을 will have + 과거분사로 말해요.',
        "Kelajakdagi tayanch vaqtdan oldin tugaydigan ish yoki o'sha paytgacha bajariladigan miqdorni will have + past participle bilan aytamiz.",
        'Use will have + past participle for something completed before a future point or for a quantity achieved by then.',
        'Используем will have + причастие для действия, завершённого до будущей точки, или количества, достигнутого к ней.',
      ),
      categoryTag: L(
        '미래완료 단순형',
        'Future perfect simple',
        'Future perfect simple',
        'Future perfect simple',
      ),
      explanation: L(
        '미래의 한 시점을 기준으로 그 전에 끝나 있을 일을 표현해요. by Friday, by the time you arrive, in two years처럼 완료의 마감점을 나타내는 표현과 자주 씁니다. 몇 개를 끝낼지 또는 얼마나 오래 지속된 상태가 될지도 말할 수 있어요.',
        "Kelajakdagi bir paytni tayanch qilib, undan oldin tugagan bo'ladigan ish future perfect simple bilan aytiladi. By Friday, by the time you arrive, in two years kabi tugallanish chegarasi bilan ko'p ishlatiladi. Nechta tugashi yoki holat qancha davom etgan bo'lishini ham aytish mumkin.",
        'Look forward to a point and describe what will already be complete before it. The form often appears with deadlines such as by Friday, by the time you arrive, and in two years. It can also express a completed quantity or the duration of a state up to that point.',
        'Смотрим из будущей точки на то, что уже будет завершено. Частые указатели срока: by Friday, by the time you arrive, in two years. Можно выразить количество или длительность состояния к этой точке.',
      ),
      rule: L(
        '주어 + will have + 과거분사 (+ by 미래 시점)',
        'ega + will have + past participle (+ by kelajak nuqtasi)',
        'subject + will have + past participle (+ by a future point)',
        'подлежащее + will have + причастие (+ by будущая точка)',
      ),
      forms: [
        { base: 'completion', result: "I'll have finished by Friday." },
        { base: 'negative', result: "She won't have arrived by then." },
        { base: 'question', result: 'Will you have completed it?' },
        { base: 'quantity', result: "We'll have built ten houses." },
      ],
      drills: [
        d(
          0,
          '금요일까지 나는 보고서를 끝내 놓을 거예요.',
          "Jumagacha men hisobotni tugatgan bo'laman.",
          'К пятнице я закончу отчёт.',
          [
            r(
              'I will have finished the report by Friday.',
              'I will be finishing it at every Friday.',
              'I will have finish report Friday.',
            ),
            r(
              'You can read it at the weekend.',
              'You read it last weekend tomorrow.',
              'You can reading it weekend.',
            ),
          ],
        ),
        d(
          1,
          '우리가 도착할 때쯤 영화는 이미 시작했을 거예요.',
          "Biz yetib borgunimizcha film boshlanib bo'lgan bo'ladi.",
          'К нашему приезду фильм уже начнётся.',
          [
            r(
              'By the time we arrive,',
              'While we arrive yesterday,',
              'By time we will arrive,',
            ),
            r(
              'the film will have started.',
              'the film will be starting all evening.',
              'the film will have start.',
            ),
          ],
        ),
        d(
          0,
          '연말까지 그들은 집 열 채를 지어 놓을 거예요.',
          "Yil oxirigacha ular o'nta uy qurgan bo'ladi.",
          'К концу года они построят десять домов.',
          [
            r(
              'They will have built ten houses by the end of the year.',
              'They will be building ten houses at one moment.',
              'They will have build ten house.',
            ),
            r(
              'That is the project target.',
              'That was tomorrow target yesterday.',
              'That project target are.',
            ),
          ],
        ),
        d(
          1,
          '오후 6시까지 미나는 도착하지 못했을 거예요.',
          "Soat oltigacha Mina hali yetib kelmagan bo'ladi.",
          'К шести Мина ещё не приедет.',
          [
            r(
              'By six o’clock,',
              'At six yesterday tomorrow,',
              'By six clock will,',
            ),
            r(
              'Mina will not have arrived yet.',
              'Mina will not be arriving all week.',
              'Mina will not have arrive.',
            ),
          ],
        ),
        d(
          0,
          '다음 달이면 나는 여기서 10년 일한 셈이 될 거예요.',
          "Kelasi oy men bu yerda o'n yil ishlagan bo'laman.",
          'В следующем месяце будет десять лет, как я здесь работаю.',
          [
            r(
              'Next month I will have worked here for ten years.',
              'Next month I will be working one moment.',
              'Next month I will have work here ten years.',
            ),
            r(
              'It has been a long journey.',
              'It is a journey yesterday tomorrow.',
              'It have been journey long.',
            ),
          ],
        ),
        d(
          1,
          '월요일까지 그 결정을 내릴 수 있을까요?',
          "Dushanbagacha qaror qabul qilgan bo'lasizmi?",
          'Вы примете решение к понедельнику?',
          [
            r('By Monday,', 'During Monday yesterday,', 'By Monday will,'),
            r(
              'will you have made a decision?',
              'will you be making it all year?',
              'will you have make decision?',
            ),
          ],
        ),
        d(
          0,
          '준이 돌아올 때쯤 우리는 저녁을 다 먹었을 거예요.',
          "Jun qaytguncha biz kechki ovqatni yeb bo'lgan bo'lamiz.",
          'К возвращению Джуна мы уже поужинаем.',
          [
            r(
              'We will have eaten dinner by the time Jun returns.',
              'We will be eating during Jun returns all day.',
              'We will have ate dinner Jun return.',
            ),
            r(
              'We will save some food for him.',
              'We saved tomorrow food yesterday.',
              'We will saving food him.',
            ),
          ],
        ),
        d(
          1,
          '2030년까지 도시는 새 지하철 노선을 완공할 거예요.',
          "2030-yilgacha shahar yangi metro liniyasini tugatgan bo'ladi.",
          'К 2030 году город завершит новую линию метро.',
          [
            r('By 2030,', 'At 2030 yesterday,', 'By 2030 will,'),
            r(
              'the city will have completed the new metro line.',
              'the city will be completing it every moment.',
              'the city will have complete line.',
            ),
          ],
        ),
        d(
          0,
          '수업이 끝날 때까지 학생들은 시험 세 개를 치렀을 거예요.',
          "Kurs tugaguncha talabalar uchta imtihon topshirgan bo'ladi.",
          'К концу курса студенты сдадут три экзамена.',
          [
            r(
              'The students will have taken three exams by the end of the course.',
              'The students will be taking three exams at one moment.',
              'The students will have took three exam.',
            ),
            r(
              'Their final result will follow.',
              'Their result followed tomorrow yesterday.',
              'Their results will follows.',
            ),
          ],
        ),
        d(
          1,
          '내일 이 시간이면 폭풍은 지나갔을 거예요.',
          "Ertaga shu paytgacha bo'ron o'tib ketgan bo'ladi.",
          'К этому времени завтра буря уже пройдёт.',
          [
            r(
              'By this time tomorrow,',
              'At this time yesterday tomorrow,',
              'By tomorrow will time,',
            ),
            r(
              'the storm will have passed.',
              'the storm will be passing for years.',
              'the storm will have pass.',
            ),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Can we review the design on Thursday?',
          '목요일에 디자인을 검토할 수 있을까요?',
          "Dizaynni payshanba kuni ko'rib chiqamizmi?",
          'Сможем проверить дизайн в четверг?',
          'on Thursday',
        ),
        line(
          'Leo',
          'right',
          'Yes. I will have completed the first version by then.',
          '네. 그때까지 첫 번째 버전을 완성해 둘게요.',
          "Ha. O'sha paytgacha birinchi versiyani tugatgan bo'laman.",
          'Да. К тому времени я закончу первую версию.',
          'will have completed',
        ),
      ],
      cautions: [
        L(
          'by는 그 시점 “까지”, at은 바로 그 시점 “에”라는 뜻이에요. 완료 마감에는 by가 중요해요.',
          "By 'shu paytgacha', at esa 'aynan shu paytda' degani. Tugallanish muddati uchun by muhim.",
          'By means no later than that point; at means at that exact time. Use by for a completion deadline.',
          'By означает «не позднее этого момента», at — «в этот момент». Для срока завершения важно by.',
        ),
        L(
          'will have 뒤에는 과거분사를 써요: will have done, not will have did.',
          'Will have dan keyin past participle keladi: will have done, will have did emas.',
          'Use a past participle after will have: will have done, not will have did.',
          'После will have ставьте причастие: will have done, не will have did.',
        ),
      ],
      similar: {
        pattern: 'will be doing',
        note: L(
          '그 시점에 진행 중이면 미래진행, 그 시점 전에 완료되면 미래완료예요.',
          "O'sha paytda davom etayotgan bo'lsa future continuous, o'sha paytgacha tugagan bo'lsa future perfect ishlatiladi.",
          'Use the future continuous for an activity in progress then and the future perfect for one completed before then.',
          'Future continuous — процесс в тот момент, future perfect — завершённость до него.',
        ),
      },
    },
    {
      sourceUnit: 127,
      code: 'en-general:grammar:u127-future-perfect-continuous',
      pattern: 'will have been + verb-ing',
      summary: L(
        '미래의 기준 시점까지 활동이 얼마나 오래 계속될지를 will have been + -ing로 표현해요.',
        "Kelajakdagi tayanch paytgacha faoliyat qancha vaqt davom etgan bo'lishini will have been + -ing bilan ifodalaymiz.",
        'Use will have been + verb-ing to show how long an activity will have continued up to a future point.',
        'Используем will have been + глагол-ing, чтобы показать длительность процесса к будущей точке.',
      ),
      categoryTag: L(
        '미래완료진행형',
        'Future perfect continuous',
        'Future perfect continuous',
        'Future perfect continuous',
      ),
      explanation: L(
        '미래의 한 시점에 뒤돌아보며 그때까지 활동이 이어진 기간을 강조해요. by next June, for ten years, when you arrive 같은 표현과 함께 씁니다. 완료된 수량보다 계속된 시간에 초점을 두며, 상태동사는 보통 미래완료 단순형을 사용해요.',
        "Kelajakdagi bir nuqtadan orqaga qarab, faoliyat o'sha paytgacha qancha davom etganini ta'kidlaydi. By next June, for ten years, when you arrive bilan ishlatiladi. Tugallangan miqdordan ko'ra davomiylikka urg'u beradi; holat fe'llari odatda future perfect simple bilan keladi.",
        'Look back from a future point and emphasize the duration of an activity up to then. The form often combines with by next June, for ten years, or when you arrive. It focuses on continuing time rather than a completed quantity; state verbs normally use the future perfect simple.',
        'Из будущей точки смотрим назад и подчёркиваем длительность процесса до неё. Форма сочетается с by next June, for ten years, when you arrive. Важна длительность, а не количество; глаголы состояния обычно требуют future perfect simple.',
      ),
      rule: L(
        '주어 + will have been + 동사-ing + for 기간 + by/when 미래 시점',
        "ega + will have been + fe'l-ing + for davomiylik + by/when kelajak nuqtasi",
        'subject + will have been + verb-ing + for a period + by/when a future point',
        'подлежащее + will have been + глагол-ing + for период + by/when будущая точка',
      ),
      forms: [
        {
          base: 'duration to future point',
          result: "I'll have been working for ten years.",
        },
        { base: 'question', result: 'How long will you have been waiting?' },
        { base: 'negative', result: "She won't have been living there long." },
        { base: 'state verb', result: "I'll have known him for ten years." },
      ],
      drills: [
        d(
          0,
          '다음 6월이면 나는 여기서 10년 동안 일해 온 셈이 돼요.',
          "Kelasi iyunda men bu yerda o'n yildan beri ishlab kelgan bo'laman.",
          'К следующему июню я буду работать здесь уже десять лет.',
          [
            r(
              'By next June, I will have been working here for ten years.',
              'By next June, I will have completed ten jobs.',
              'By next June, I will have working here ten years.',
            ),
            r(
              'That anniversary matters to me.',
              'That anniversary mattered tomorrow ago.',
              'That anniversaries matters.',
            ),
          ],
        ),
        d(
          1,
          '우리가 도착할 때쯤 그들은 여섯 시간째 운전 중일 거예요.',
          "Biz yetib borgunimizcha ular olti soatdan beri mashina haydab kelgan bo'ladi.",
          'К нашему приезду они будут за рулём уже шесть часов.',
          [
            r(
              'When we arrive,',
              'When we arrived tomorrow yesterday,',
              'When we will arrive,',
            ),
            r(
              'they will have been driving for six hours.',
              'they will have driven six cars.',
              'they will have driving six hours.',
            ),
          ],
        ),
        d(
          0,
          '정오가 되면 비가 24시간 동안 내린 셈이 될 거예요.',
          "Tushga kelib yomg'ir yigirma to'rt soatdan beri yog'ayotgan bo'ladi.",
          'К полудню дождь будет идти уже сутки.',
          [
            r(
              'At noon it will have been raining for twenty-four hours.',
              'At noon it will have rained twenty-four storms.',
              'At noon it will have raining for hours.',
            ),
            r(
              'The river may rise.',
              'The river rose tomorrow ago.',
              'River the may rises.',
            ),
          ],
        ),
        d(
          1,
          '이번 학기가 끝나면 얼마나 오래 영어를 공부해 온 셈이 되나요?',
          "Bu semestr tugaganda ingliz tilini qancha vaqt o'rgangan bo'lasiz?",
          'Как долго вы будете изучать английский к концу семестра?',
          [
            r(
              'By the end of this term,',
              'At the end of last term tomorrow,',
              'By end term will,',
            ),
            r(
              'how long will you have been studying English?',
              'how many English courses will you completed?',
              'how long will you have studying English?',
            ),
          ],
        ),
        d(
          0,
          '이번 경기가 끝나면 준은 세 시간 동안 테니스를 친 셈이 돼요.',
          "Bu o'yin tugaganda Jun uch soatdan beri tennis o'ynagan bo'ladi.",
          'К концу матча Джун будет играть в теннис уже три часа.',
          [
            r(
              'When this match ends, Jun will have been playing tennis for three hours.',
              'When this match ends, Jun will have won three matches.',
              'When match ends, Jun will have playing tennis.',
            ),
            r(
              'He will need a rest.',
              'He needed tomorrow rest yesterday.',
              'He will needs rest.',
            ),
          ],
        ),
        d(
          1,
          '오후 5시가 되면 미나는 아침부터 요리해 온 셈이 될 거예요.',
          "Soat beshda Mina ertalabdan beri ovqat pishirgan bo'ladi.",
          'К пяти Мина будет готовить с самого утра.',
          [
            r(
              'By five o’clock,',
              'At five yesterday tomorrow,',
              'By five will clock,',
            ),
            r(
              'Mina will have been cooking since morning.',
              'Mina will have cooked five meals only.',
              'Mina will have cooking since morning.',
            ),
          ],
        ),
        d(
          0,
          '레이스가 끝날 때 선수들은 두 시간 넘게 달려 온 셈이 돼요.',
          "Poyga tugaganda sportchilar ikki soatdan ortiq yugurgan bo'ladi.",
          'К финишу спортсмены будут бежать больше двух часов.',
          [
            r(
              'At the finish, the runners will have been running for over two hours.',
              'At the finish, the runners will have completed two races.',
              'At finish, runners will have running two hours.',
            ),
            r(
              'They will be exhausted.',
              'They were exhausted tomorrow.',
              'They will exhausted be.',
            ),
          ],
        ),
        d(
          1,
          '내일 아침이면 밤새 눈이 내린 셈이 될 거예요.',
          "Ertaga ertalabgacha tun bo'yi qor yog'gan bo'ladi.",
          'К утру снег будет идти всю ночь.',
          [
            r(
              'By tomorrow morning,',
              'At yesterday morning tomorrow,',
              'By tomorrow will morning,',
            ),
            r(
              'it will have been snowing all night.',
              'it will have snowed three storms.',
              'it will have snowing night.',
            ),
          ],
        ),
        d(
          0,
          '그 프로젝트가 끝날 때 우리는 18개월 동안 함께 일한 셈이 돼요.',
          "Loyiha tugaganda biz o'n sakkiz oy birga ishlagan bo'lamiz.",
          'К концу проекта мы будем работать вместе восемнадцать месяцев.',
          [
            r(
              'When the project finishes, we will have been working together for eighteen months.',
              'When it finishes, we will have completed eighteen projects.',
              'When project finishes, we will have working months.',
            ),
            r(
              'We will celebrate together.',
              'We celebrated tomorrow together.',
              'We will celebrates together.',
            ),
          ],
        ),
        d(
          1,
          '다음 달이면 나는 레오를 20년 동안 알고 지낸 셈이 돼요.',
          "Kelasi oy men Leoni yigirma yildan beri tanigan bo'laman.",
          'В следующем месяце будет двадцать лет, как я знаю Лео.',
          [
            r('Next month,', 'Last month tomorrow,', 'Next will month,'),
            r(
              'I will have known Leo for twenty years.',
              'I will have been knowing Leo for twenty years.',
              'I will have know Leo years.',
            ),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Will you take a break when I arrive?',
          '내가 도착하면 쉴 거예요?',
          'Men yetib kelganimda dam olasizmi?',
          'Ты сделаешь перерыв, когда я приеду?',
          'when I arrive',
        ),
        line(
          'Leo',
          'right',
          'Definitely. I will have been studying for five hours by then.',
          '물론이죠. 그때면 다섯 시간 동안 공부한 셈이 돼요.',
          "Albatta. O'sha paytgacha besh soat o'qigan bo'laman.",
          'Конечно. К тому времени я буду заниматься уже пять часов.',
          'will have been studying',
        ),
      ],
      cautions: [
        L(
          '완료한 개수에는 미래완료 단순형을 써요: will have written five pages.',
          'Tugallangan miqdor uchun future perfect simple ishlating: will have written five pages.',
          'Use the future perfect simple for a completed quantity: will have written five pages.',
          'Для завершённого количества нужен future perfect simple: will have written five pages.',
        ),
        L(
          'know 같은 상태동사는 진행형으로 만들지 않아요: will have known이 맞아요.',
          "Know kabi holat fe'llarini continuous qilmang: will have known to'g'ri.",
          'Do not put a state verb such as know in the continuous: will have known is correct.',
          'Глагол состояния know не ставится в continuous: правильно will have known.',
        ),
      ],
      similar: {
        pattern: 'had been doing',
        note: L(
          '과거완료진행형은 과거 시점까지의 기간, 미래완료진행형은 미래 시점까지의 기간을 바라봐요.',
          "Past perfect continuous o'tmish nuqtasigacha, future perfect continuous kelajak nuqtasigacha davomiylikni ko'rsatadi.",
          'The past perfect continuous measures duration up to a past point; the future perfect continuous measures it up to a future point.',
          'Past perfect continuous измеряет длительность до прошлого момента, future perfect continuous — до будущего.',
        ),
      },
    },
  ],
};
