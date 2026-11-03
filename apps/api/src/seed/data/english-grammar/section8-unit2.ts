import { L, sentenceOf } from './english-grammar.helpers';
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
  template: string,
  answer: string,
  ko: string,
  uz: string,
  ru: string,
  rows: EnglishGrammarDrill['rows'],
): EnglishGrammarDrill => {
  const [prefix, suffix] = template.split('___');
  const punctuation = suffix.match(/^([,.;:!?]+)/)?.[1] ?? '';
  let normalizedAnswer = answer;
  let normalizedTemplate = template;
  let normalizedRows = rows.map((row) => [...row] as [string, string, string]);

  if (punctuation) {
    const exactIndex = normalizedRows.findIndex((row) => row[0] === answer);
    const punctuatedIndex = normalizedRows.findIndex(
      (row) => row[0] === `${answer}${punctuation}`,
    );
    const answerIndex = exactIndex >= 0 ? exactIndex : punctuatedIndex;
    if (answerIndex >= 0) {
      normalizedAnswer = `${answer}${punctuation}`;
      normalizedTemplate = `${prefix}___${suffix.slice(punctuation.length)}`;
      normalizedRows[answerIndex] = normalizedRows[answerIndex].map((option) =>
        option.endsWith(punctuation) ? option : `${option}${punctuation}`,
      ) as [string, string, string];
      normalizedRows = normalizedRows.filter(
        (row, index) => index === answerIndex || row[0] !== punctuation,
      );
    }
  }

  return {
    template: normalizedTemplate,
    answer: normalizedAnswer,
    translation: L(
      ko,
      uz,
      sentenceOf(normalizedTemplate, normalizedAnswer),
      ru,
    ),
    rows: normalizedRows,
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

export const ENGLISH_GRAMMAR_S8_U2: EnglishGrammarUnit = {
  section: 8,
  unit: 2,
  level: '6',
  title: L(
    '시간절과 조건문',
    'Vaqt va shart gaplari',
    'Time clauses and conditionals',
    'Придаточные времени и условия',
  ),
  description: L(
    'when·before·while·after로 사건의 시간을 연결하고, if로 가능한 조건과 현재 사실과 반대되는 가정을 구별해요.',
    "When, before, while, after bilan voqealar vaqtini bog'lab, if yordamida mumkin shart va hozirgi haqiqatga zid farazni farqlaymiz.",
    'Link events in time with when, before, while, and after, then distinguish possible conditions from unreal present situations with if.',
    'Связываем события словами when, before, while, after и различаем реальные условия и нереальные ситуации настоящего с if.',
  ),
  specs: [
    {
      sourceUnit: 110,
      code: 'en-general:grammar:u110-time-clauses',
      pattern: 'when / before / while / after + present',
      summary: L(
        '시간절은 앞이나 뒤에 둘 수 있고, 미래를 말해도 when·before·while·after·until 뒤에는 현재형을 써요.',
        "Vaqt qismi oldin yoki keyin keladi; kelajak haqida bo'lsa ham when, before, while, after, until dan keyin hozirgi zamon ishlatiladi.",
        'A time clause can come first or second, and takes a present form after when, before, while, after, or until even when the meaning is future.',
        'Придаточное времени может стоять до или после главного; после when, before, while, after и until употребляется настоящее время даже при будущем значении.',
      ),
      categoryTag: L(
        '시간 접속사',
        "Vaqt bog'lovchilari",
        'Time conjunctions',
        'Союзы времени',
      ),
      explanation: L(
        'when, before, while, after로 시작하는 시간절은 문장 앞이나 뒤에 올 수 있어요. 시간절이 먼저 오면 뒤에 쉼표를 쓰고, 뒤에 오면 보통 쉼표를 쓰지 않습니다. 미래 상황을 말할 때 주절에는 will/be going to를 쓸 수 있지만 시간절에는 현재형을 써요: I will call when I arrive. before, while, after, until에도 같은 규칙이 적용됩니다.',
        "When, before, while, after bilan boshlangan vaqt qismi gap boshida yoki oxirida keladi. U oldinda kelsa vergul qo'yiladi. Kelajak ma'nosida bosh gapda will/be going to mumkin, ammo vaqt qismida hozirgi zamon ishlatiladi: I will call when I arrive. Before, while, after va until ham shu qoidaga bo'ysunadi.",
        'A clause beginning with when, before, while, or after can come before or after the main clause. Use a comma when it comes first. For future time, the main clause may use will or be going to, but the time clause uses the present: I will call when I arrive. The same rule applies after before, while, after, and until.',
        'Придаточное с when, before, while или after может стоять до или после главного. Если оно стоит первым, ставится запятая. При будущем значении в главном предложении возможны will или be going to, но в придаточном времени употребляется настоящее: I will call when I arrive. То же правило действует после before, while, after и until.',
      ),
      rule: L(
        'When/Before/While/After + 절, 주절 · 주절 + when/before/while/after + 절 · 미래 시간절에는 현재형',
        "When/Before/While/After + gap, bosh gap · bosh gap + bog'lovchi + gap · kelajak vaqt qismida hozirgi zamon",
        'When/Before/While/After + clause, main clause · main clause + time clause · present tense in a future time clause',
        'When/Before/While/After + придаточное, главное · главное + придаточное времени · настоящее время в будущем придаточном',
      ),
      forms: [
        {
          base: 'time clause first',
          result: 'When I went out, it was raining.',
        },
        {
          base: 'time clause second',
          result: 'It was raining when I went out.',
        },
        { base: 'future', result: 'I will call when I arrive.' },
        {
          base: 'before / while / until',
          result: 'before you leave / while we are away / until you come back',
        },
      ],
      drills: [
        d(
          '___, it was raining.',
          'When I went out',
          '내가 밖에 나갔을 때 비가 오고 있었어요.',
          "Tashqariga chiqqanimda yomg'ir yog'ayotgan edi.",
          'Когда я вышел, шёл дождь.',
          [
            r('When I went out,', 'When did I go out,', 'When I was go out,'),
            r('it was raining.', 'it raining was.', 'it were raining.'),
          ],
        ),
        d(
          'It began to rain ___ the bus.',
          'while I was waiting for',
          '버스를 기다리는 동안 비가 오기 시작했어요.',
          "Avtobus kutayotganimda yomg'ir yog'a boshladi.",
          'Пока я ждал автобус, начался дождь.',
          [
            r('It began', 'It begins', 'It was begin'),
            r('to rain', 'raining to', 'to raining'),
            r(
              'while I was waiting for',
              'during I waited for',
              'while I waiting',
            ),
            r('the bus.', 'bus the.', 'a buses.'),
          ],
        ),
        d(
          'Always look both ways ___ the road.',
          'before you cross',
          '길을 건너기 전에 항상 양쪽을 보세요.',
          "Yo'lni kesib o'tishdan oldin ikki tomonga qarang.",
          'Всегда смотрите по сторонам, прежде чем переходить дорогу.',
          [
            r('Always look', 'Look always', 'Always looking'),
            r('both ways', 'both way', 'ways both'),
            r('before you cross', 'before you will cross', 'before to cross'),
            r('the road.', 'road the.', 'a roads.'),
          ],
        ),
        d(
          'Mina called me ___ work.',
          'after she finished',
          '미나는 일을 마친 뒤 나에게 전화했어요.',
          "Mina ishini tugatgach menga qo'ng'iroq qildi.",
          'Мина позвонила мне после того, как закончила работу.',
          [
            r('Mina called', 'Mina calls', 'Mina was called'),
            r('me', 'to me', 'I'),
            r('after she finished', 'after she finish', 'after she was finish'),
            r('work.', 'the works.', 'work was.'),
          ],
        ),
        d(
          'I will call you ___ home.',
          'when I get',
          '집에 도착하면 전화할게요.',
          "Uyga yetib borganimda sizga qo'ng'iroq qilaman.",
          'Я позвоню вам, когда доберусь домой.',
          [
            r('I will call', 'I call will', 'I will to call'),
            r('you', 'to you', 'your'),
            r('when I get', 'when I will get', 'when I got'),
            r('home.', 'to home.', 'at home to.'),
          ],
        ),
        d(
          'Please close the window ___ out.',
          'before you go',
          '밖에 나가기 전에 창문을 닫아 주세요.',
          'Tashqariga chiqishdan oldin derazani yoping.',
          'Закройте окно, прежде чем выйти.',
          [
            r('Please close', 'Please closing', 'Close please to'),
            r('the window', 'window the', 'a windows'),
            r('before you go', 'before you will go', 'before to go'),
            r('out.', 'outside to.', 'to out.'),
          ],
        ),
        d(
          'Leo will stay here ___ back.',
          'until I come',
          '내가 돌아올 때까지 레오는 여기 있을 거예요.',
          'Men qaytib kelgunimcha Leo shu yerda qoladi.',
          'Лео останется здесь, пока я не вернусь.',
          [
            r('Leo will stay', 'Leo stays will', 'Leo will staying'),
            r('here', 'to here', 'at here'),
            r('until I come', 'until I will come', 'until I came'),
            r('back.', 'to back.', 'back to.'),
          ],
        ),
        d(
          'We are going to cook ___ arrives.',
          'after Mina',
          '미나가 도착한 뒤 요리할 거예요.',
          'Mina kelganidan keyin ovqat pishiramiz.',
          'Мы будем готовить после того, как приедет Мина.',
          [
            r('We are going', 'We going are', 'We will going'),
            r('to cook', 'cooking to', 'to cooking'),
            r('after Mina', 'after Mina will', 'after will Mina'),
            r('arrives.', 'arrive.', 'will arrive.'),
          ],
        ),
        d(
          '___, I will answer your messages.',
          'While I am away',
          '내가 없는 동안에도 메시지에 답할게요.',
          "Safarda bo'lganimda xabarlaringizga javob beraman.",
          'Пока меня не будет, я буду отвечать на ваши сообщения.',
          [
            r('While I am away,', 'While I will be away,', 'During I am away,'),
            r('I will answer', 'I answer will', 'I will answering'),
            r('your messages.', 'you messages.', 'your message are.'),
          ],
        ),
        d(
          'When the meeting ___, we will have lunch.',
          'ends',
          '회의가 끝나면 점심을 먹을 거예요.',
          "Yig'ilish tugagach tushlik qilamiz.",
          'Когда встреча закончится, мы пообедаем.',
          [
            r('When the meeting', 'When meeting the', 'The meeting when'),
            r('ends', 'will end', 'end'),
            r('we will have', 'we have will', 'we will having'),
            r('lunch.', 'a lunch is.', 'the lunches.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Will you call me when you arrive?',
          '도착하면 전화해 줄래요?',
          "Yetib borganingizda menga qo'ng'iroq qilasizmi?",
          'Позвоните мне, когда приедете?',
          'when you arrive',
        ),
        line(
          'Leo',
          'right',
          'Yes. I will call before I leave the station.',
          '네. 역을 떠나기 전에 전화할게요.',
          "Ha. Vokzaldan chiqishimdan oldin qo'ng'iroq qilaman.",
          'Да. Я позвоню, прежде чем выйду со станции.',
          'before I leave',
        ),
      ],
      cautions: [
        L(
          '미래 의미여도 when절 안에는 보통 will을 쓰지 않아요.',
          "Kelajak ma'nosida ham when qismida odatda will ishlatilmaydi.",
          'Do not normally use will inside a future when-clause.',
          'Обычно не употребляйте will в придаточном с when при будущем значении.',
        ),
        L(
          '시간절이 문장 앞에 오면 뒤에 쉼표를 써요.',
          "Vaqt qismi gap boshida kelsa, undan keyin vergul qo'yiladi.",
          'Use a comma after a time clause that comes first.',
          'Если придаточное времени стоит первым, после него ставится запятая.',
        ),
      ],
      similar: {
        pattern: 'before / after / during / while',
        note: L(
          'Unit 98에서는 전치사와 접속사의 형태 차이를 배웠어요.',
          "98-unitda ko'makchi va bog'lovchi shakllari farqi o'rganilgan.",
          'Unit 98 explains the form difference between prepositions and conjunctions.',
          'В Unit 98 рассматривается различие форм предлогов и союзов.',
        ),
      },
    },
    {
      sourceUnit: 111,
      code: 'en-general:grammar:u111-first-conditional',
      pattern: 'If we go ... · If you see ...',
      summary: L(
        '가능한 미래 조건은 if + 현재형으로 말하고, 결과절에는 will·명령문·can 등을 사용해요.',
        'Mumkin kelajak sharti if + hozirgi zamon bilan aytiladi; natijada will, buyruq yoki can ishlatiladi.',
        'Express a possible future condition with if + present, and use will, an imperative, can, or another suitable form in the result clause.',
        'Возможное условие будущего выражается if + настоящее время; в главной части употребляются will, повелительное наклонение, can и другие формы.',
      ),
      categoryTag: L(
        '현실 조건문',
        'Real shart gap',
        'Real conditional',
        'Реальное условие',
      ),
      explanation: L(
        'if절은 문장 앞이나 뒤에 올 수 있어요. 가능한 미래를 말할 때 if절에는 will이 아니라 현재형을 씁니다: If it rains, we will stay home. 결과절은 will뿐 아니라 명령문, can, may 등 문맥에 맞는 형태가 올 수 있어요. if는 가능성이 불확실할 때, when은 일이 일어날 것이 확실할 때 사용합니다.',
        "If qismi gap boshida yoki oxirida keladi. Mumkin kelajak haqida gapirganda if qismida will emas, hozirgi zamon ishlatiladi: If it rains, we will stay home. Natijada will bilan birga buyruq, can, may kabi shakllar ham keladi. If noaniq imkoniyat, when esa voqea aniq sodir bo'lishini bildiradi.",
        'An if-clause can come first or second. For a possible future situation, use the present after if, not will: If it rains, we will stay home. The result clause may contain will, an imperative, can, may, or another suitable form. Use if when the event is uncertain and when when it is expected to happen.',
        'Придаточное с if может стоять первым или вторым. Для возможного будущего после if употребляется настоящее время, не will: If it rains, we will stay home. В главной части возможны will, повелительное наклонение, can, may и другие формы. If означает неопределённую возможность, when — ожидаемое событие.',
      ),
      rule: L(
        'If + 현재형, 주절 · 주절 + if + 현재형 · 불확실한 가능성 if / 확실한 미래 when',
        'If + hozirgi zamon, bosh gap · bosh gap + if + hozirgi zamon · noaniq imkoniyat if / aniq kelajak when',
        'If + present, main clause · main clause + if + present · uncertain possibility if / expected event when',
        'If + настоящее, главное · главное + if + настоящее · неопределённость if / ожидаемое событие when',
      ),
      forms: [
        {
          base: 'future result',
          result: 'If we go by bus, it will be cheaper.',
        },
        {
          base: 'negative condition',
          result: "If you don't hurry, you'll miss the train.",
        },
        {
          base: 'imperative result',
          result: "If you're hungry, have something to eat.",
        },
        {
          base: 'request result',
          result: 'If the phone rings, can you answer it?',
        },
      ],
      drills: [
        d(
          'If we go by bus, it ___ cheaper.',
          'will be',
          '버스로 가면 더 저렴할 거예요.',
          "Avtobusda borsak, arzonroq bo'ladi.",
          'Если поедем на автобусе, будет дешевле.',
          [
            r('If we go', 'If we will go', 'If we went'),
            r('by bus,', 'with bus,', 'on bus by,'),
            r('it', 'its', 'there'),
            r('will be', 'is will', 'will being'),
            r('cheaper.', 'more cheap.', 'cheapest.'),
          ],
        ),
        d(
          'If you do not hurry, you ___ the train.',
          'will miss',
          '서두르지 않으면 기차를 놓칠 거예요.',
          "Shoshilmasangiz, poyezdni o'tkazib yuborasiz.",
          'Если не поспешите, опоздаете на поезд.',
          [
            r(
              'If you do not hurry,',
              'If you will not hurry,',
              'If you not hurry,',
            ),
            r('you', 'your', 'you are'),
            r('will miss', 'miss will', 'will missed'),
            r('the train.', 'train the.', 'a trains.'),
          ],
        ),
        d(
          'If you are hungry, ___ something to eat.',
          'have',
          '배가 고프면 무언가 드세요.',
          "Qorningiz och bo'lsa, biror narsa yeng.",
          'Если вы голодны, поешьте.',
          [
            r(
              'If you are hungry,',
              'If you will be hungry,',
              'If hungry you are,',
            ),
            r('have', 'will have', 'having'),
            r('something to eat.', 'to eat something is.', 'anything ate.'),
          ],
        ),
        d(
          'If the phone rings, can you ___?',
          'answer it',
          '전화가 울리면 받아 줄래요?',
          'Telefon jiringlasa, javob bera olasizmi?',
          'Если зазвонит телефон, можете ответить?',
          [
            r(
              'If the phone rings,',
              'If the phone will ring,',
              'If rings the phone,',
            ),
            r('can you', 'you can', 'can you to'),
            r('answer it', 'answer to it', 'it answer'),
            r('?', 'please?', 'now?'),
          ],
        ),
        d(
          'I will go to the concert if I ___ a ticket.',
          'can get',
          '표를 구할 수 있으면 콘서트에 갈 거예요.',
          'Chipta topsam, konsertga boraman.',
          'Я пойду на концерт, если смогу достать билет.',
          [
            r('I will go', 'I go will', 'I will going'),
            r('to the concert', 'at the concert', 'concert to'),
            r('if I', 'if will I', 'when maybe I'),
            r('can get', 'will can get', 'can getting'),
            r('a ticket.', 'ticket a.', 'a tickets.'),
          ],
        ),
        d(
          'Do not wait for me if I ___ late.',
          'am',
          '내가 늦으면 기다리지 마세요.',
          'Kech qolsam, meni kutmang.',
          'Не ждите меня, если я опоздаю.',
          [
            r('Do not wait', 'Not wait', 'Do not waiting'),
            r('for me', 'to me', 'me for'),
            r('if I', 'if will I', 'when maybe I'),
            r('am', 'will be', 'be'),
            r('late.', 'lately.', 'a late.'),
          ],
        ),
        d(
          'What will we do if it ___?',
          'rains',
          '비가 오면 우리는 무엇을 할까요?',
          "Yomg'ir yog'sa nima qilamiz?",
          'Что мы будем делать, если пойдёт дождь?',
          [
            r('What will we do', 'What we will do', 'What will do we'),
            r('if it', 'if will it', 'when perhaps it'),
            r('rains', 'will rain', 'rain'),
            r('?', 'tomorrow?', 'outside?'),
          ],
        ),
        d(
          'If I do not feel well tomorrow, I ___ home.',
          'will stay',
          '내일 몸이 좋지 않으면 집에 있을 거예요.',
          "Ertaga o'zimni yaxshi his qilmasam, uyda qolaman.",
          'Если завтра я буду плохо себя чувствовать, останусь дома.',
          [
            r('If I do not feel', 'If I will not feel', 'If I not feel'),
            r('well tomorrow,', 'good tomorrow,', 'well on tomorrow,'),
            r('I', 'me', 'I am'),
            r('will stay', 'stay will', 'will staying'),
            r('home.', 'to home.', 'at the home.'),
          ],
        ),
        d(
          '___ I go out later, I will close the window.',
          'If',
          '나중에 외출하게 되면 창문을 닫을게요.',
          'Keyinroq tashqariga chiqsam, derazani yopaman.',
          'Если я позже выйду, закрою окно.',
          [
            r('If', 'When surely', 'If will'),
            r('I go out', 'I will go out', 'I went out'),
            r('later,', 'lately,', 'at later,'),
            r('I will close', 'I close will', 'I will closed'),
            r('the window.', 'window the.', 'a windows.'),
          ],
        ),
        d(
          '___ I get home tonight, I am going to shower.',
          'When',
          '오늘 밤 집에 도착하면 샤워할 거예요.',
          'Bugun kechqurun uyga kelganimda dush qabul qilaman.',
          'Когда я сегодня вернусь домой, приму душ.',
          [
            r('When', 'If perhaps', 'When will'),
            r('I get', 'I will get', 'I got'),
            r('home tonight,', 'to home tonight,', 'home at tonight,'),
            r('I am going to shower.', 'I going shower.', 'I will to shower.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Are you going to the market?',
          '시장에 갈 거예요?',
          'Bozorga borasizmi?',
          'Вы собираетесь на рынок?',
        ),
        line(
          'Leo',
          'right',
          'If I finish work early, I will go. When I get there, I will call you.',
          '일찍 일을 끝내면 갈게요. 도착하면 전화할게요.',
          "Ishni erta tugatsam boraman. Yetib borganimda sizga qo'ng'iroq qilaman.",
          'Если закончу работу рано, пойду. Когда доберусь, позвоню вам.',
          'If I finish',
        ),
      ],
      cautions: [
        L(
          '가능한 미래를 말하는 if절 안에는 보통 will을 쓰지 않아요.',
          'Mumkin kelajakni bildirgan if qismida odatda will ishlatilmaydi.',
          'Do not normally use will inside an if-clause for a possible future.',
          'Обычно не употребляйте will в придаточном с if для возможного будущего.',
        ),
        L(
          'if는 불확실한 조건, when은 일어날 것이 확실한 시간을 나타내요.',
          "If noaniq shartni, when esa aniq bo'ladigan vaqtni bildiradi.",
          'If marks an uncertain condition; when marks an expected time.',
          'If обозначает неопределённое условие, when — ожидаемое время.',
        ),
      ],
      similar: {
        pattern: 'when + present',
        note: L(
          'Unit 110과 마찬가지로 미래 의미여도 접속사 뒤에는 현재형을 써요.',
          "110-unitdagidek, kelajak ma'nosida ham bog'lovchidan keyin hozirgi zamon keladi.",
          'As in Unit 110, use a present form after the conjunction even with future meaning.',
          'Как и в Unit 110, после союза употребляется настоящее время даже при будущем значении.',
        ),
      },
    },
    {
      sourceUnit: 112,
      code: 'en-general:grammar:u112-second-conditional',
      pattern: 'If I had ... · I would ...',
      summary: L(
        '현재 사실과 다르거나 가능성이 낮은 상황은 if + 과거형, would/could + 동사원형으로 상상해요.',
        "Hozirgi haqiqatga zid yoki ehtimoli past vaziyat if + o'tgan zamon, would/could + fe'l bilan ifodalanadi.",
        'Imagine a present-unreal or unlikely situation with if + past and would/could + base verb.',
        'Воображаем нереальную или маловероятную ситуацию с if + прошедшее и would/could + начальная форма.',
      ),
      categoryTag: L(
        '가정 조건문',
        'Noreal shart gap',
        'Unreal conditional',
        'Нереальное условие',
      ),
      explanation: L(
        'If he had the money, he would buy a car처럼 if절의 과거형은 과거 시간이 아니라 현재의 비현실적 상황을 나타낼 수 있어요. 결과절에는 would 또는 could + 동사원형을 씁니다. If I were you는 조언할 때 자주 쓰며 was도 가능해요. 현실 가능성이 있는 if I have ... I will ...과, 지금 사실과 반대인 if I had ... I would ...를 구별하세요.',
        "If he had the money, he would buy a car gapida o'tgan shakl o'tgan vaqtni emas, hozirgi noreal vaziyatni bildiradi. Natijada would yoki could + fe'l keladi. Maslahatda If I were you ko'p ishlatiladi, was ham mumkin. Real if I have ... I will ... bilan hozirgi haqiqatga zid if I had ... I would ... ni farqlang.",
        'In If he had the money, he would buy a car, the past form can describe an unreal present situation, not past time. Use would or could + base verb in the result. If I were you is common for advice, though was is also possible. Contrast real if I have ... I will ... with unreal if I had ... I would ....',
        'В If he had the money, he would buy a car прошедшая форма обозначает нереальную ситуацию настоящего, а не прошлое время. В результате употребляется would или could + начальная форма. Для совета часто говорят If I were you, хотя was тоже возможно. Различайте реальное if I have ... I will ... и нереальное if I had ... I would ....',
      ),
      rule: L(
        'If + 과거형, would/could + 동사원형 · If I were/was you, I would ...',
        "If + o'tgan zamon, would/could + fe'l · If I were/was you, I would ...",
        'If + past, would/could + base verb · If I were/was you, I would ...',
        'If + прошедшее, would/could + начальная форма · If I were/was you, I would ...',
      ),
      forms: [
        { base: 'unreal condition', result: 'If I had time, I would go.' },
        {
          base: 'negative condition',
          result: "If she didn't live so far away, we would visit.",
        },
        {
          base: 'possible ability',
          result: 'If we had a car, we could travel more.',
        },
        { base: 'advice', result: 'If I were you, I would take a coat.' },
      ],
      drills: [
        d(
          'If Leo had the money, he ___ a car.',
          'would buy',
          '레오에게 돈이 있다면 차를 살 텐데요.',
          "Leoda pul bo'lsa, mashina sotib olardi.",
          'Если бы у Лео были деньги, он купил бы машину.',
          [
            r('If Leo had', 'If Leo has', 'If Leo would have'),
            r('the money,', 'money the,', 'the monies,'),
            r('he', 'him', 'his'),
            r('would buy', 'will buy', 'would bought'),
            r('a car.', 'car a.', 'a cars.'),
          ],
        ),
        d(
          'If I knew the answer, I ___ you.',
          'would tell',
          '내가 답을 안다면 말해 줄 텐데요.',
          'Javobni bilsam, sizga aytardim.',
          'Если бы я знал ответ, я бы сказал вам.',
          [
            r('If I knew', 'If I know', 'If I would know'),
            r('the answer,', 'answer the,', 'an answers,'),
            r('I', 'me', 'I am'),
            r('would tell', 'will tell', 'would told'),
            r('you.', 'to you.', 'your.'),
          ],
        ),
        d(
          'We ___ wet if we went out now.',
          'would get',
          '지금 나가면 젖을 텐데요.',
          "Hozir tashqariga chiqsak, ho'l bo'lardik.",
          'Мы бы промокли, если бы сейчас вышли.',
          [
            r('We', 'Us', 'We are'),
            r('would get', 'will get', 'would got'),
            r('wet', 'wetly', 'a wet'),
            r('if we went out', 'if we go out', 'if we would go out'),
            r('now.', 'at now.', 'the now.'),
          ],
        ),
        d(
          'Mina would be happier if she ___ closer.',
          'lived',
          '미나가 더 가까이 산다면 더 행복할 텐데요.',
          "Mina yaqinroq yashasa, baxtliroq bo'lardi.",
          'Мина была бы счастливее, если бы жила ближе.',
          [
            r('Mina', 'The Mina', 'Mina is'),
            r('would be', 'will be', 'would being'),
            r('happier', 'more happy', 'happiest'),
            r('if she', 'if her', 'if she would'),
            r('lived', 'lives', 'would live'),
            r('closer.', 'close.', 'closest.'),
          ],
        ),
        d(
          'What ___ if you did not have a job?',
          'would you do',
          '직업이 없다면 무엇을 하겠어요?',
          "Ishingiz bo'lmasa nima qilardingiz?",
          'Что бы вы делали, если бы у вас не было работы?',
          [
            r('What', 'Which', 'How'),
            r('would you do', 'will you do', 'would you did'),
            r(
              'if you did not have',
              'if you do not have',
              'if you would not have',
            ),
            r('a job?', 'job a?', 'a jobs?'),
          ],
        ),
        d(
          'I would help you if I ___.',
          'could',
          '할 수 있다면 도와줄 텐데요.',
          "Qo'limdan kelsa, sizga yordam berardim.",
          'Я бы помог вам, если бы мог.',
          [
            r('I', 'Me', 'I am'),
            r('would help', 'will help', 'would helped'),
            r('you', 'to you', 'your'),
            r('if I', 'if me', 'if I would'),
            r('could', 'can', 'could to'),
          ],
        ),
        d(
          'If we had a car, we ___ more.',
          'could travel',
          '차가 있다면 더 많이 여행할 수 있을 텐데요.',
          "Mashinamiz bo'lsa, ko'proq sayohat qila olardik.",
          'Если бы у нас была машина, мы могли бы больше путешествовать.',
          [
            r('If we had', 'If we have', 'If we would have'),
            r('a car,', 'car a,', 'a cars,'),
            r('we', 'us', 'we are'),
            r('could travel', 'can travel', 'could travelled'),
            r('more.', 'most.', 'more much.'),
          ],
        ),
        d(
          'If I ___ you, I would wear a coat.',
          'were',
          '내가 당신이라면 코트를 입겠어요.',
          "O'rningizda bo'lsam, palto kiygan bo'lardim.",
          'На вашем месте я бы надел пальто.',
          [
            r('If I', 'If me', 'If I would'),
            r('were', 'am', 'would be'),
            r('you,', 'your,', 'yours,'),
            r('I would wear', 'I will wear', 'I would wore'),
            r('a coat.', 'coat a.', 'a coats.'),
          ],
        ),
        d(
          'I would buy that jacket if it ___ so expensive.',
          'was not',
          '그 재킷이 그렇게 비싸지 않다면 살 텐데요.',
          "U kurtka juda qimmat bo'lmasa, sotib olardim.",
          'Я бы купил эту куртку, если бы она не была такой дорогой.',
          [
            r('I would buy', 'I will buy', 'I would bought'),
            r('that jacket', 'those jacket', 'jacket that'),
            r('if it', 'if its', 'if it would'),
            r('was not', 'is not', 'would not be'),
            r('so expensive.', 'such expensive.', 'so expensively.'),
          ],
        ),
        d(
          'It would be nice if the weather ___ better.',
          'were',
          '날씨가 더 좋다면 좋을 텐데요.',
          "Ob-havo yaxshiroq bo'lsa yaxshi bo'lardi.",
          'Было бы хорошо, если бы погода была лучше.',
          [
            r('It', 'Its', 'There'),
            r('would be', 'will be', 'would being'),
            r('nice', 'nicely', 'a nice'),
            r('if the weather', 'if weather the', 'if the weather would'),
            r('were', 'is', 'would be'),
            r('better.', 'good.', 'best.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'What would you do if you had a free month?',
          '한 달 동안 자유 시간이 있다면 무엇을 하겠어요?',
          "Bir oy bo'sh vaqtingiz bo'lsa nima qilardingiz?",
          'Что бы вы сделали, если бы у вас был свободный месяц?',
          'would you do',
        ),
        line(
          'Leo',
          'right',
          'I would travel, and I could visit three countries.',
          '여행하면서 세 나라를 방문할 수 있을 것 같아요.',
          'Sayohat qilib, uchta davlatga borardim.',
          'Я бы путешествовал и мог бы посетить три страны.',
          'would travel',
        ),
      ],
      cautions: [
        L(
          'if절에는 보통 would를 쓰지 않고 과거형을 써요.',
          "If qismida odatda would emas, o'tgan zamon ishlatiladi.",
          'Normally use a past form, not would, inside the if-clause.',
          'Обычно в придаточном с if употребляется прошедшая форма, а не would.',
        ),
        L(
          '가정 조건문의 과거형은 과거 사건이 아니라 현재의 비현실성을 나타낼 수 있어요.',
          "Noreal shartdagi o'tgan shakl o'tgan voqeani emas, hozirgi noreallikni bildirishi mumkin.",
          'The past form in this conditional can mark present unreality, not past time.',
          'Прошедшая форма в таком условии может обозначать нереальность настоящего, а не прошлое время.',
        ),
      ],
      similar: {
        pattern: 'If I have ... I will ...',
        note: L(
          'Unit 111은 실제로 일어날 가능성이 있는 조건, Unit 112는 현재 사실과 다른 가정을 다뤄요.',
          '111-unit real imkoniyatni, 112-unit hozirgi haqiqatga zid farazni bildiradi.',
          'Unit 111 covers a real possibility; Unit 112 covers an unreal present situation.',
          'Unit 111 описывает реальную возможность, Unit 112 — нереальную ситуацию настоящего.',
        ),
      },
    },
  ],
};
