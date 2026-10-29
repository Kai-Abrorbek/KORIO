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

export const ENGLISH_GRAMMAR_S7_U1: EnglishGrammarUnit = {
  section: 7,
  unit: 1,
  level: '6',
  title: L(
    '문장 안의 정확한 어순',
    'Gap ichidagi aniq so‘z tartibi',
    'Precise word order in sentences',
    'Точный порядок слов в предложении',
  ),
  description: L(
    '목적어·장소·시간과 빈도부사의 자리를 익히고, still·yet·already와 두 목적어를 자연스럽게 배치해요.',
    'To‘ldiruvchi, joy, vaqt va takror ravishlarining o‘rnini o‘rganib, still, yet, already hamda ikki to‘ldiruvchini tabiiy joylashtiramiz.',
    'Place objects, location, time, frequency adverbs, still, yet, already, and two-object verb patterns naturally.',
    'Учимся естественно располагать дополнения, место, время, наречия частотности, still, yet, already и конструкции с двумя дополнениями.',
  ),
  specs: [
    {
      sourceUnit: 92,
      code: 'en-general:grammar:u092-word-order-object-place-time',
      pattern: 'verb + object · place + time',
      summary: L(
        '동사와 목적어를 붙여 쓰고, 장소와 시간이 함께 오면 보통 장소를 시간보다 먼저 놓아요.',
        'Fe’l va to‘ldiruvchi yonma-yon keladi; joy va vaqt birga kelsa, odatda joy vaqtdan oldin turadi.',
        'Keep the verb next to its object, and normally put place before time when both are present.',
        'Ставьте глагол рядом с дополнением, а при сочетании места и времени обычно ставьте место перед временем.',
      ),
      categoryTag: L(
        '기본 어순',
        'Asosiy so‘z tartibi',
        'Basic word order',
        'Основной порядок слов',
      ),
      explanation: L(
        '영어에서는 타동사와 그 목적어 사이를 다른 정보로 끊지 않는 것이 기본이에요. “Sue reads a newspaper every day”처럼 무엇을 하는지가 먼저 완성되고, 방법·장소·시간 같은 부가 정보가 뒤따릅니다. 장소와 시간이 모두 있으면 “at the airport at seven”처럼 장소를 먼저 놓아요. 빈도 표현은 별도 규칙에 따라 동사 앞이나 be동사 뒤에 오지만 목적어 사이로 들어가지는 않습니다.',
        'Ingliz tilida o‘timli fe’l bilan uning to‘ldiruvchisi orasiga boshqa ma’lumot kiritilmaydi. “Sue reads a newspaper every day” gapida avval harakat va uning obyekti tugallanadi, keyin usul, joy yoki vaqt keladi. Joy va vaqt birga bo‘lsa, “at the airport at seven” kabi joy avval turadi. Takror ravishlari alohida qoida bilan fe’l oldida yoki be dan keyin keladi, lekin fe’l va obyekt orasini bo‘lmaydi.',
        'In English, a transitive verb normally stays beside its object. Complete the action first, as in “Sue reads a newspaper every day,” then add manner, place, or time. When place and time occur together, put place first: “at the airport at seven.” Frequency adverbs follow their own position rules, but they do not split a verb from its object.',
        'В английском переходный глагол обычно стоит рядом со своим дополнением. Сначала завершите действие, как в “Sue reads a newspaper every day”, затем добавьте образ действия, место или время. Если есть и место, и время, сначала ставьте место: “at the airport at seven”. Наречия частотности подчиняются отдельным правилам, но не разделяют глагол и дополнение.',
      ),
      rule: L(
        '주어 + 동사 + 목적어 + 방법 + 장소 + 시간 · 장소는 보통 시간보다 먼저',
        'ega + fe’l + to‘ldiruvchi + usul + joy + vaqt · joy odatda vaqtdan oldin',
        'subject + verb + object + manner + place + time · place normally precedes time',
        'подлежащее + глагол + дополнение + образ действия + место + время · место обычно перед временем',
      ),
      forms: [
        { base: 'verb + object', result: 'reads a newspaper' },
        { base: 'verb + object + manner', result: 'speaks English very well' },
        { base: 'verb + object + place', result: 'borrow money from the bank' },
        {
          base: 'verb + place + time',
          result: 'arrived at the airport at seven',
        },
      ],
      drills: [
        d(
          'a newspaper',
          '수는 매일 신문을 읽어요.',
          'Sue har kuni gazeta o‘qiydi.',
          'Сью каждый день читает газету.',
          [
            r('Sue reads', 'Sue read', 'Reads Sue'),
            r('a newspaper', 'every day a newspaper', 'newspaper a'),
            r('every day.', 'at every day.', 'day every.'),
          ],
        ),
        d(
          'English very well',
          '그는 영어를 아주 잘해요.',
          'U ingliz tilida juda yaxshi gapiradi.',
          'Он очень хорошо говорит по-английски.',
          [
            r('He speaks', 'He speak', 'Speaks he'),
            r('English very well', 'very well English', 'English very good'),
            r('at work.', 'in work.', 'on work.'),
          ],
        ),
        d(
          'television all evening',
          '어제 우리는 저녁 내내 텔레비전을 봤어요.',
          'Kecha biz butun oqshom televizor ko‘rdik.',
          'Вчера мы весь вечер смотрели телевизор.',
          [
            r('We watched', 'We watch', 'Watched we'),
            r(
              'television all evening',
              'all evening television',
              'television every evening all',
            ),
            r('yesterday.', 'at yesterday.', 'the yesterday.'),
          ],
        ),
        d(
          'a black hat',
          '폴은 자주 검은 모자를 써요.',
          'Pol ko‘pincha qora shlyapa kiyadi.',
          'Пол часто носит чёрную шляпу.',
          [
            r('Paul often wears', 'Paul wears often', 'Often Paul wear'),
            r('a black hat', 'black a hat', 'a hat black'),
            r('outside.', 'at outside.', 'in outside.'),
          ],
        ),
        d(
          'the door quietly',
          '나는 문을 조용히 열었어요.',
          'Men eshikni sekin ochdim.',
          'Я тихо открыл дверь.',
          [
            r('I opened', 'I open', 'Opened I'),
            r('the door quietly', 'quietly the door', 'the quietly door'),
            r('this morning.', 'on this morning.', 'at this morning.'),
          ],
        ),
        d(
          'some money',
          '나는 은행에서 돈을 좀 빌릴 거예요.',
          'Men bankdan biroz pul qarz olmoqchiman.',
          'Я собираюсь занять немного денег в банке.',
          [
            r("I'm going to borrow", 'I going borrow', "I'm borrow to"),
            r('some money', 'from the bank some money', 'money some'),
            r('from the bank.', 'at the bank from.', 'from bank the.'),
          ],
        ),
        d(
          'to work',
          '리즈는 매일 걸어서 출근해요.',
          'Liz har kuni ishga piyoda boradi.',
          'Лиз каждый день ходит на работу пешком.',
          [
            r('Liz walks', 'Liz walk', 'Walks Liz'),
            r('to work', 'every day to work', 'work to'),
            r('every day.', 'on every day.', 'every the day.'),
          ],
        ),
        d(
          'at home',
          '오늘 저녁에 집에 있을 거예요?',
          'Bugun kechqurun uyda bo‘lasizmi?',
          'Вы будете дома сегодня вечером?',
          [
            r('Will you be', 'Do you will be', 'Will be you'),
            r('at home', 'this evening at home', 'in home'),
            r('this evening?', 'at this evening?', 'on this evening?'),
          ],
        ),
        d(
          'at the airport',
          '우리는 일곱 시에 공항에 도착했어요.',
          'Biz soat yettida aeroportga yetib keldik.',
          'Мы прибыли в аэропорт в семь часов.',
          [
            r('We arrived', 'We arrive', 'Arrived we'),
            r('at the airport', 'at seven at the airport', 'to the airport'),
            r('at seven.', 'in seven.', 'on seven.'),
          ],
        ),
        d(
          'in hospital',
          '짐의 아버지는 6월부터 병원에 계세요.',
          'Jimning otasi iyundan beri kasalxonada.',
          'Отец Джима находится в больнице с июня.',
          [
            r(
              "Jim's father has been",
              "Jim's father was been",
              'Jim father has',
            ),
            r('in hospital', 'since June in hospital', 'at hospital'),
            r('since June.', 'for June.', 'from June since.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Did you watch television at home last night?',
          '어젯밤 집에서 텔레비전을 봤어요?',
          'Kecha uyda televizor ko‘rdingizmi?',
          'Вы смотрели телевизор дома вчера вечером?',
          'television at home last night',
        ),
        line(
          'Leo',
          'right',
          'No, I met some friends at a café after work.',
          '아니요, 퇴근 후 카페에서 친구들을 만났어요.',
          'Yo‘q, ishdan keyin kafeda do‘stlarim bilan uchrashdim.',
          'Нет, после работы я встретился с друзьями в кафе.',
          'some friends at a café after work',
        ),
      ],
      cautions: [
        caution(
          '동사와 목적어 사이에 시간을 넣지 마세요: reads a newspaper every day.',
          'Fe’l bilan obyekt orasiga vaqtni qo‘ymang: reads a newspaper every day.',
          'Do not put time between the verb and its object: reads a newspaper every day.',
          'Не ставьте время между глаголом и дополнением: reads a newspaper every day.',
        ),
        caution(
          '장소와 시간이 함께 오면 보통 장소를 먼저 써요: at home this evening.',
          'Joy va vaqt birga kelsa, odatda joy avval yoziladi: at home this evening.',
          'With both place and time, normally put place first: at home this evening.',
          'При сочетании места и времени обычно сначала ставьте место: at home this evening.',
        ),
      ],
      similar: {
        pattern: 'always / usually / often',
        note: L(
          '빈도부사의 위치는 다음 문법에서 별도로 배워요.',
          'Takror ravishlarining o‘rni keyingi mavzuda alohida o‘rganiladi.',
          'The next grammar point gives the separate position rules for frequency adverbs.',
          'В следующем правиле отдельно рассматривается положение наречий частотности.',
        ),
      },
    },
    {
      sourceUnit: 93,
      code: 'en-general:grammar:u093-adverb-word-order',
      pattern: 'always / usually / often etc.',
      summary: L(
        '빈도부사는 일반동사 앞, be동사 뒤, 두 동사 사이에 놓아요.',
        'Takror ravishlari oddiy fe’ldan oldin, be dan keyin va ikki fe’l orasida turadi.',
        'Put frequency adverbs before ordinary verbs, after be, and between two verbs.',
        'Ставьте наречия частотности перед обычным глаголом, после be и между двумя глаголами.',
      ),
      categoryTag: L(
        '부사의 위치',
        'Ravish o‘rni',
        'Adverb position',
        'Положение наречий',
      ),
      explanation: L(
        'always, usually, often, sometimes, never, also, just, already, still, all, both 같은 말은 대개 문장 중간에 와요. 일반동사가 하나면 그 앞에, am/is/are/was/were 뒤에, 조동사나 완료형처럼 동사가 둘이면 첫 번째 동사 뒤에 둡니다. sometimes는 문장 맨 앞에도 자연스럽게 올 수 있어요. all과 both는 주어를 가리킬 때 일반동사 앞이나 be동사 뒤에 놓습니다.',
        'Always, usually, often, sometimes, never, also, just, already, still, all va both odatda gap o‘rtasida keladi. Bitta oddiy fe’l bo‘lsa undan oldin, am/is/are/was/were dan keyin, ikkita fe’l bo‘lsa birinchi fe’ldan keyin turadi. Sometimes gap boshida ham kelishi mumkin. All va both ega haqida gapirganda oddiy fe’ldan oldin yoki be dan keyin keladi.',
        'Words such as always, usually, often, sometimes, never, also, just, already, still, all, and both usually sit in the middle of the sentence. Put them before a single ordinary verb, after am/is/are/was/were, and after the first verb when there are two verbs. Sometimes can also begin a sentence. All and both follow the same middle-position pattern when they refer to the subject.',
        'Слова always, usually, often, sometimes, never, also, just, already, still, all и both обычно стоят в середине предложения. Ставьте их перед одним обычным глаголом, после am/is/are/was/were и после первого глагола, если глаголов два. Sometimes может также стоять в начале. All и both занимают ту же среднюю позицию, когда относятся к подлежащему.',
      ),
      rule: L(
        '일반동사 앞 · be동사 뒤 · 첫 번째 조동사/완료 have 뒤',
        'oddiy fe’l oldida · be dan keyin · birinchi yordamchi fe’l yoki have dan keyin',
        'before an ordinary verb · after be · after the first auxiliary/perfect have',
        'перед обычным глаголом · после be · после первого вспомогательного глагола/have',
      ),
      forms: [
        { base: 'ordinary verb', result: 'I always go.' },
        { base: 'be', result: 'She is often late.' },
        { base: 'two verbs', result: 'I can never find it.' },
        { base: 'perfect', result: 'They have all gone.' },
      ],
      drills: [
        d(
          'always',
          '나는 항상 차로 출근해요.',
          'Men har doim ishga mashinada boraman.',
          'Я всегда езжу на работу на машине.',
          [
            r('I', 'Me', 'My'),
            r('always', 'am always', 'go always'),
            r('go to work', 'go work to', 'going to work'),
            r('by car.', 'with car.', 'on car.'),
          ],
        ),
        d(
          'never',
          '우리 형은 내게 절대 말하지 않아요.',
          'Akam men bilan hech qachon gaplashmaydi.',
          'Мой брат никогда со мной не разговаривает.',
          [
            r('My brother', 'Mine brother', 'My brothers'),
            r('never', 'is never', 'speaks never'),
            r('speaks to me.', 'speak me.', 'speaks at me.'),
          ],
        ),
        d(
          'often',
          '앤은 테니스를 자주 쳐요.',
          'Enn tez-tez tennis o‘ynaydi.',
          'Энн часто играет в теннис.',
          [
            r('Ann', 'The Ann', 'Ann is'),
            r('often', 'is often', 'plays often'),
            r('plays tennis.', 'play tennis.', 'plays the tennis.'),
          ],
        ),
        d(
          'usually',
          '그들은 보통 일곱 시에 저녁을 먹어요.',
          'Ular odatda soat yettida kechki ovqat yeydi.',
          'Они обычно ужинают в семь.',
          [
            r('They', 'Them', 'Their'),
            r('usually', 'are usually', 'have usually'),
            r('have dinner', 'has dinner', 'have the dinner'),
            r('at seven.', 'in seven.', 'on seven.'),
          ],
        ),
        d(
          'sometimes',
          '나는 가끔 너무 많이 먹어요.',
          'Men ba’zan juda ko‘p ovqat yeyman.',
          'Иногда я ем слишком много.',
          [
            r('I', 'Me', 'Mine'),
            r('sometimes', 'am sometimes', 'eat sometimes'),
            r('eat too much.', 'eats too much.', 'eat much too.'),
          ],
        ),
        d(
          'still',
          '린다는 아직 침대에 있어요.',
          'Linda hali ham yotoqda.',
          'Линда всё ещё в постели.',
          [
            r('Linda', 'The Linda', 'Linda does'),
            r('is', 'does', 'has'),
            r('still', 'is still', 'still is'),
            r('in bed.', 'on bed.', 'at the bed.'),
          ],
        ),
        d(
          'both',
          '내 두 형제는 둘 다 의사예요.',
          'Ikki akam ham shifokor.',
          'Оба моих брата — врачи.',
          [
            r('My brothers', 'Mine brothers', 'My brother'),
            r('are', 'is', 'do'),
            r('both', 'are both', 'both are'),
            r('doctors.', 'a doctors.', 'doctor is.'),
          ],
        ),
        d(
          'all',
          '그들은 모두 런던에 살아요.',
          'Ularning hammasi Londonda yashaydi.',
          'Они все живут в Лондоне.',
          [
            r('They', 'Them', 'Their'),
            r('all', 'are all', 'live all'),
            r('live in London.', 'lives in London.', 'live at London.'),
          ],
        ),
        d(
          'just',
          '그녀는 방금 나갔어요.',
          'U hozirgina tashqariga chiqdi.',
          'Она только что вышла.',
          [
            r('She', 'Her', 'Hers'),
            r('has', 'is', 'does'),
            r('just', 'has just', 'just has'),
            r('gone out.', 'went out.', 'gone outside of.'),
          ],
        ),
        d(
          'already',
          '나는 그 영화를 이미 봤어요.',
          'Men bu filmni allaqachon ko‘rganman.',
          'Я уже видел этот фильм.',
          [
            r('I', 'Me', 'Mine'),
            r('have', 'am', 'did'),
            r('already', 'have already', 'already have'),
            r('seen the film.', 'saw the film.', 'seen film the.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Leo',
          'left',
          'Do you usually walk to work?',
          '보통 걸어서 출근해요?',
          'Odatda ishga piyoda borasizmi?',
          'Вы обычно ходите на работу пешком?',
          'usually walk',
        ),
        line(
          'Mina',
          'right',
          'Yes, but I am sometimes late when it rains.',
          '네, 하지만 비가 오면 가끔 늦어요.',
          'Ha, lekin yomg‘ir yog‘sa ba’zan kechikaman.',
          'Да, но во время дождя я иногда опаздываю.',
          'am sometimes late',
        ),
      ],
      cautions: [
        caution(
          '일반동사 뒤에 always를 놓지 마세요: I always go.',
          'Always ni oddiy fe’ldan keyin qo‘ymang: I always go.',
          'Do not put always after an ordinary verb: I always go.',
          'Не ставьте always после обычного глагола: I always go.',
        ),
        caution(
          'be동사 앞이 아니라 뒤에 놓아요: She is often late.',
          'Ravishni be dan oldin emas, keyin qo‘ying: She is often late.',
          'With be, put the adverb after it: She is often late.',
          'С глаголом be ставьте наречие после него: She is often late.',
        ),
      ],
      similar: {
        pattern: 'still / yet / already',
        note: L(
          '세 단어의 의미 차이와 문장 위치는 다음 문법에서 자세히 비교해요.',
          'Uch so‘zning ma’nosi va o‘rni keyingi mavzuda batafsil solishtiriladi.',
          'The next point compares the meanings and positions of these three words.',
          'В следующем правиле подробно сравниваются значения и позиции этих трёх слов.',
        ),
      },
    },
    {
      sourceUnit: 94,
      code: 'en-general:grammar:u094-still-yet-already',
      pattern: 'still / yet / already',
      summary: L(
        'still은 계속됨, yet은 지금까지의 미완료, already는 예상보다 이른 완료를 나타내요.',
        'Still davom etishni, yet hozirgacha tugamaganlikni, already kutilganidan erta tugaganlikni bildiradi.',
        'Still marks continuation, yet marks something not completed up to now, and already marks earlier-than-expected completion.',
        'Still обозначает продолжение, yet — незавершённость до настоящего момента, already — более раннее, чем ожидалось, завершение.',
      ),
      categoryTag: L(
        '시간 부사',
        'Vaqt ravishlari',
        'Time adverbs',
        'Наречия времени',
      ),
      explanation: L(
        'still은 이전 상태나 행동이 지금도 계속된다는 뜻으로 일반동사 앞이나 be동사 뒤에 와요. yet은 지금까지라는 경계를 나타내며 보통 부정문과 의문문 끝에 옵니다. not yet은 아직 아니지만 나중에는 달라질 가능성을 담아요. already는 예상보다 일이 빨리 일어났다는 뜻이며 일반동사 앞, be동사 뒤, 완료형 have 뒤에 놓습니다.',
        'Still oldingi holat yoki harakat hozir ham davom etayotganini bildiradi va oddiy fe’l oldida yoki be dan keyin keladi. Yet “hozirgacha” chegarasini ko‘rsatib, odatda inkor va so‘roq gap oxirida turadi. Not yet hozircha yo‘q, ammo keyin o‘zgarishi mumkinligini anglatadi. Already ish kutilganidan oldin bo‘lganini bildiradi va oddiy fe’l oldida, be dan keyin yoki perfect have dan keyin keladi.',
        'Still says that an earlier state or action continues now; put it before an ordinary verb or after be. Yet means “up to now” and normally goes at the end of negatives and questions. Not yet suggests that something has not happened but may happen later. Already says that something happened earlier than expected; put it before an ordinary verb, after be, or after perfect have.',
        'Still показывает, что прежнее состояние или действие продолжается; оно ставится перед обычным глаголом или после be. Yet означает «до сих пор» и обычно стоит в конце отрицаний и вопросов. Not yet подразумевает, что событие ещё может произойти. Already означает, что действие произошло раньше ожидаемого, и ставится перед обычным глаголом, после be или после have в перфекте.',
      ),
      rule: L(
        'still: 중간 위치 · yet: 부정문/의문문 끝 · already: 중간 위치',
        'still: o‘rta o‘rin · yet: inkor/savol oxiri · already: o‘rta o‘rin',
        'still: middle position · yet: end of negatives/questions · already: middle position',
        'still: средняя позиция · yet: конец отрицания/вопроса · already: средняя позиция',
      ),
      forms: [
        { base: 'continuing', result: 'It is still raining.' },
        { base: 'negative up to now', result: "She hasn't arrived yet." },
        { base: 'question up to now', result: 'Are you ready yet?' },
        { base: 'earlier than expected', result: "He's already here." },
      ],
      drills: [
        d(
          'still',
          '한 시간 전부터 비가 왔고 지금도 비가 와요.',
          'Bir soat oldin yomg‘ir yog‘ayotgan edi, hozir ham yog‘yapti.',
          'Час назад шёл дождь, и сейчас он всё ещё идёт.',
          [
            r('It', 'There', 'The weather'),
            r('is', 'does', 'has'),
            r('still', 'yet', 'already'),
            r('raining.', 'rain.', 'rained.'),
          ],
        ),
        d(
          'still have',
          '나는 그 차를 아직 가지고 있어요.',
          'Menda o‘sha mashina hali ham bor.',
          'У меня всё ещё есть та машина.',
          [
            r('I', 'Me', 'Mine'),
            r('still have', 'have yet', 'already having'),
            r('that car.', 'those car.', 'car that.'),
          ],
        ),
        d(
          'yet',
          '빌은 아직 오지 않았어요.',
          'Bill hali kelmadi.',
          'Билл ещё не пришёл.',
          [
            r('Bill', 'The Bill', 'Bill is'),
            r("hasn't arrived", "didn't arrived", 'has not arrive'),
            r('yet', 'still', 'already'),
            r('.', 'now.', 'before.'),
          ],
        ),
        d(
          'yet?',
          '다이앤은 아직 여기 없나요?',
          'Dayan hali bu yerda emasmi?',
          'Дайан ещё не здесь?',
          [
            r('Is Diane', 'Does Diane', 'Diane is'),
            r('here', 'at here', 'in here'),
            r('yet?', 'still?', 'already?'),
          ],
        ),
        d(
          'Not yet.',
          '아직 아니에요. 잠깐 기다려 주세요.',
          'Hali yo‘q. Bir oz kuting.',
          'Ещё нет. Подождите немного.',
          [
            r('Not yet.', 'Still not.', 'Already not.'),
            r('Wait', 'Waiting', 'To wait'),
            r('a moment.', 'moment a.', 'in moment.'),
          ],
        ),
        d(
          'still reading',
          '아직 신문을 읽고 있어요.',
          'Men gazetani hali ham o‘qiyapman.',
          'Я всё ещё читаю газету.',
          [
            r("I'm", 'I do', 'I have'),
            r('still reading', 'reading yet', 'already read'),
            r('the newspaper.', 'newspaper the.', 'a news.'),
          ],
        ),
        d(
          'already',
          '존은 벌써 여기 있어요.',
          'Jon allaqachon shu yerda.',
          'Джон уже здесь.',
          [
            r('John', 'The John', 'John does'),
            r('is', 'does', 'has'),
            r('already', 'yet', 'still'),
            r('here.', 'at here.', 'in here.'),
          ],
        ),
        d(
          'already know',
          '나는 이미 무슨 일이 있었는지 알아요.',
          'Men nima bo‘lganini allaqachon bilaman.',
          'Я уже знаю, что произошло.',
          [
            r('I', 'Me', 'Mine'),
            r('already know', 'know yet', 'am already know'),
            r('what happened.', 'what did happen.', 'that what happened.'),
          ],
        ),
        d(
          'already seen',
          '앤은 그 영화를 이미 봤어요.',
          'Enn bu filmni allaqachon ko‘rgan.',
          'Энн уже видела этот фильм.',
          [
            r('Ann', 'The Ann', 'Ann is'),
            r('has', 'is', 'did'),
            r('already seen', 'seen yet', 'already saw'),
            r('the film.', 'film the.', 'a films.'),
          ],
        ),
        d(
          'yet?',
          '신문을 다 읽으셨어요?',
          'Gazetani o‘qib bo‘ldingizmi?',
          'Вы уже закончили читать газету?',
          [
            r('Have you finished', 'Did you finished', 'Are you finish'),
            r('with the newspaper', 'the newspaper with', 'at the newspaper'),
            r('yet?', 'still?', 'already?'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Has Leo arrived yet?',
          '레오는 도착했어요?',
          'Leo hali yetib keldimi?',
          'Лео уже приехал?',
          'yet',
        ),
        line(
          'Sara',
          'right',
          "No, but he's already on the bus.",
          '아니요, 하지만 벌써 버스를 탔어요.',
          'Yo‘q, lekin u allaqachon avtobusda.',
          'Нет, но он уже в автобусе.',
          'already',
        ),
        line(
          'Mina',
          'left',
          'Are you still waiting outside?',
          '아직도 밖에서 기다리고 있어요?',
          'Siz hali ham tashqarida kutyapsizmi?',
          'Вы всё ещё ждёте на улице?',
          'still',
        ),
      ],
      cautions: [
        caution(
          'still은 보통 긍정 형태로 계속됨을 말해요: She is still here.',
          'Still odatda tasdiq shaklda davom etishni bildiradi: She is still here.',
          'Still normally expresses continuation in a positive form: She is still here.',
          'Still обычно выражает продолжение в утвердительной форме: She is still here.',
        ),
        caution(
          'yet을 be동사 뒤에 두지 말고 문장 끝에 놓아요: She is not here yet.',
          'Yet ni be dan keyin emas, gap oxiriga qo‘ying: She is not here yet.',
          'Put yet at the end, not after be: She is not here yet.',
          'Ставьте yet в конце, а не после be: She is not here yet.',
        ),
      ],
      similar: {
        pattern: 'present perfect + just / already / yet',
        note: L(
          '완료형의 형태는 Unit 16에서 배운 규칙과 함께 사용해요.',
          'Bu so‘zlar Unit 16 dagi present perfect shakli bilan birga ishlatiladi.',
          'Use these positions together with the present-perfect forms from Unit 16.',
          'Используйте эти позиции вместе с формами present perfect из Unit 16.',
        ),
      },
    },
    {
      sourceUnit: 95,
      code: 'en-general:grammar:u095-two-object-verbs',
      pattern: 'give something to somebody · give somebody something',
      summary: L(
        'give류 동사는 사물 + to + 사람 또는 사람 + 사물의 두 어순을 쓸 수 있어요.',
        'Give turidagi fe’llarda narsa + to + odam yoki odam + narsa tartibi ishlatiladi.',
        'With verbs such as give, use either thing + to + person or person + thing.',
        'С глаголами типа give используйте либо предмет + to + человек, либо человек + предмет.',
      ),
      categoryTag: L(
        '두 목적어',
        'Ikki to‘ldiruvchi',
        'Two objects',
        'Два дополнения',
      ),
      explanation: L(
        'give, lend, pass, send, show는 전달하는 사물과 받는 사람을 함께 써요. 사물을 먼저 쓰면 사람 앞에 to를 넣고, 사람을 먼저 쓰면 to를 쓰지 않습니다. buy와 get은 사람을 먼저 쓰거나 사물 + for + 사람을 쓸 수 있어요. 사물이 it 또는 them이면 “give it to her”처럼 사물 + to + 사람 어순을 선호하며 “give her it”은 피합니다.',
        'Give, lend, pass, send va show uzatilayotgan narsa hamda qabul qiluvchini birga oladi. Narsa avval kelsa odam oldidan to qo‘yiladi; odam avval kelsa to ishlatilmaydi. Buy va get bilan odam + narsa yoki narsa + for + odam mumkin. Narsa it yoki them bo‘lsa, “give it to her” kabi narsa + to + odam tartibi afzal; “give her it” ishlatilmaydi.',
        'Give, lend, pass, send, and show can name both the thing transferred and its receiver. If the thing comes first, put to before the person; if the person comes first, omit to. With buy and get, use person + thing or thing + for + person. When the thing is it or them, prefer thing + to + person: “give it to her,” not “give her it.”',
        'Give, lend, pass, send и show могут называть и передаваемый предмет, и получателя. Если предмет стоит первым, перед человеком ставится to; если первым стоит человек, to не употребляется. С buy и get возможны человек + предмет или предмет + for + человек. Если предмет выражен it или them, предпочитайте предмет + to + человек: “give it to her”, а не “give her it”.',
      ),
      rule: L(
        'give + 사물 + to + 사람 = give + 사람 + 사물 · buy/get + 사물 + for + 사람',
        'give + narsa + to + odam = give + odam + narsa · buy/get + narsa + for + odam',
        'give + thing + to + person = give + person + thing · buy/get + thing + for + person',
        'give + предмет + to + человек = give + человек + предмет · buy/get + предмет + for + человек',
      ),
      forms: [
        { base: 'thing first', result: 'I gave the keys to Liz.' },
        { base: 'person first', result: 'I gave Liz the keys.' },
        { base: 'buy / get', result: 'I bought my mother some flowers.' },
        { base: 'pronoun thing', result: 'Give it to me.' },
      ],
      drills: [
        d(
          'the keys to Liz',
          '나는 열쇠를 리즈에게 줬어요.',
          'Men kalitlarni Lizga berdim.',
          'Я отдал ключи Лиз.',
          [
            r('I gave', 'I give', 'I was give'),
            r('the keys to Liz', 'to Liz the keys', 'the keys Liz'),
            r('yesterday.', 'at yesterday.', 'the yesterday.'),
          ],
        ),
        d(
          'Liz the keys',
          '나는 리즈에게 열쇠를 줬어요.',
          'Men Lizga kalitlarni berdim.',
          'Я дал Лиз ключи.',
          [
            r('I gave', 'I give', 'I was gave'),
            r('Liz the keys', 'Liz to the keys', 'to Liz the keys'),
            r('at the door.', 'in the door.', 'on door.'),
          ],
        ),
        d(
          'it to me',
          '그 책은 내 것이에요. 나에게 주세요.',
          'Bu kitob meniki. Uni menga bering.',
          'Эта книга моя. Дайте её мне.',
          [
            r('That book is mine.', 'That book mine.', 'Those book is mine.'),
            r('Give', 'Gives', 'Giving'),
            r('it to me', 'me it', 'to me it'),
            r('please.', 'please to.', 'if please.'),
          ],
        ),
        d(
          'my mother some flowers',
          '나는 어머니께 꽃을 좀 사 드렸어요.',
          'Men onamga gullar sotib oldim.',
          'Я купил маме цветы.',
          [
            r('I bought', 'I buy', 'I was bought'),
            r(
              'my mother some flowers',
              'to my mother some flowers',
              'some flowers to my mother',
            ),
            r('for her birthday.', 'at her birthday.', 'on birthday her.'),
          ],
        ),
        d(
          'some flowers for my mother',
          '나는 어머니를 위해 꽃을 좀 샀어요.',
          'Men onam uchun gullar sotib oldim.',
          'Я купил цветы для мамы.',
          [
            r('I bought', 'I buy', 'I did bought'),
            r(
              'some flowers for my mother',
              'some flowers to my mother',
              'for my mother some flowers',
            ),
            r('today.', 'at today.', 'the today.'),
          ],
        ),
        d(
          'me a newspaper',
          '밖에 나갈 때 신문을 하나 가져다줄래요?',
          'Tashqariga chiqqanda menga gazeta olib kelasizmi?',
          'Принесёте мне газету, когда выйдете?',
          [
            r('Can you get', 'Can you got', 'Do you can get'),
            r('me a newspaper', 'to me a newspaper', 'a newspaper to me'),
            r(
              'when you go out?',
              'when do you go out?',
              'when you will go out?',
            ),
          ],
        ),
        d(
          'them to your father',
          '여기 열쇠가 있어요. 아버지께 드리세요.',
          'Mana kalitlar. Ularni otangizga bering.',
          'Вот ключи. Отдайте их отцу.',
          [
            r('Here are the keys.', 'Here is the keys.', 'The keys here are.'),
            r('Give', 'Gives', 'To give'),
            r('them to your father', 'your father them', 'to your father them'),
            r('.', 'please them.', 'now them.'),
          ],
        ),
        d(
          'John some money',
          '나는 존에게 돈을 좀 빌려줬어요.',
          'Men Jonga biroz pul qarz berdim.',
          'Я одолжил Джону немного денег.',
          [
            r('I lent', 'I borrowed', 'I was lend'),
            r('John some money', 'to John some money', 'some money John'),
            r('last week.', 'in last week.', 'at last week.'),
          ],
        ),
        d(
          'a postcard to Kate',
          '케이트에게 엽서를 보냈어요?',
          'Keytga otkritka yubordingizmi?',
          'Вы отправили Кейт открытку?',
          [
            r('Did you send', 'Did you sent', 'Have you send'),
            r('a postcard to Kate', 'to Kate a postcard', 'Kate to a postcard'),
            r('from Rome?', 'at Rome?', 'from the Rome?'),
          ],
        ),
        d(
          'us her photos',
          '린다는 우리에게 휴가 사진을 보여 줬어요.',
          'Linda bizga ta’til suratlarini ko‘rsatdi.',
          'Линда показала нам фотографии с отпуска.',
          [
            r('Linda showed', 'Linda show', 'Linda was showed'),
            r('us her photos', 'to us her photos', 'her photos us'),
            r('after dinner.', 'after the dinner was.', 'in after dinner.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Can you pass me the salt?',
          '소금 좀 건네줄래요?',
          'Tuzni menga uzatib yuborasizmi?',
          'Передайте мне соль, пожалуйста.',
          'pass me the salt',
        ),
        line(
          'Leo',
          'right',
          'Sure. Shall I give the pepper to Sara too?',
          '물론이죠. 후추도 사라에게 줄까요?',
          'Albatta. Murchni ham Saraga beraymi?',
          'Конечно. Передать Саре ещё и перец?',
          'give the pepper to Sara',
        ),
      ],
      cautions: [
        caution(
          '사람 앞에 to를 쓰면 반드시 사물을 먼저 둬요: give the keys to Liz.',
          'Odam oldidan to kelsa, narsa avval turadi: give the keys to Liz.',
          'If you use to before the person, put the thing first: give the keys to Liz.',
          'Если перед человеком стоит to, сначала ставьте предмет: give the keys to Liz.',
        ),
        caution(
          'it/them은 사람 뒤에 바로 두지 말아요: give it to her.',
          'It/them ni odamdan keyin qo‘ymang: give it to her.',
          'Do not put it/them directly after the person: give it to her.',
          'Не ставьте it/them сразу после человека: give it to her.',
        ),
      ],
      similar: {
        pattern: 'to ... for purpose / for + noun',
        note: L(
          '여기서 to는 받는 사람, for는 대신 사 주는 사람을 표시해요.',
          'Bu yerda to qabul qiluvchini, for esa kim uchun xarid qilinganini bildiradi.',
          'Here, to marks the receiver; for marks the person who benefits from the purchase.',
          'Здесь to обозначает получателя, а for — человека, для которого что-то покупают.',
        ),
      },
    },
    {
      sourceUnit: 96,
      code: 'en-general:grammar:u096-time-prepositions',
      pattern: 'at 8 o’clock · on Monday · in April',
      summary: L(
        '시각에는 at, 요일·날짜에는 on, 달·연도·계절에는 in을 써요.',
        'Soat bilan at, kun va sana bilan on, oy, yil va fasl bilan in ishlatiladi.',
        'Use at for clock times, on for days and dates, and in for months, years, and seasons.',
        'Употребляйте at со временем на часах, on с днями и датами, in с месяцами, годами и сезонами.',
      ),
      categoryTag: L(
        '시간 전치사',
        'Vaqt ko‘makchilari',
        'Time prepositions',
        'Предлоги времени',
      ),
      explanation: L(
        '정확한 시각과 midnight에는 at을, 요일과 달력의 날짜에는 on을, 더 긴 기간인 달·연도·계절에는 in을 써요. at the weekend, at night, at the moment처럼 정해진 표현도 있습니다. 하루의 일부는 in the morning처럼 in을 쓰지만 특정 요일과 결합하면 on Monday morning이 됩니다. this, last, next, every 앞에는 전치사를 쓰지 않아요. “in five minutes”는 지금부터 5분 뒤라는 뜻입니다.',
        'Aniq soat va midnight bilan at, hafta kuni va sana bilan on, oy, yil va fasl kabi uzun davr bilan in keladi. At the weekend, at night, at the moment kabi turg‘un birikmalar bor. Kunning qismlari in the morning shaklida, aniq kun bilan esa on Monday morning bo‘ladi. This, last, next va every oldidan ko‘makchi qo‘yilmaydi. “In five minutes” hozirdan besh daqiqa keyin degani.',
        'Use at with exact times and midnight, on with days and calendar dates, and in with longer periods such as months, years, and seasons. Learn fixed phrases such as at the weekend, at night, and at the moment. Parts of the day use in, but a named day changes this to on Monday morning. Do not use a preposition before this, last, next, or every. “In five minutes” means five minutes from now.',
        'С точным временем и midnight употребляется at, с днями недели и датами — on, с месяцами, годами и сезонами — in. Запомните выражения at the weekend, at night, at the moment. С частями дня употребляется in, но с конкретным днём — on Monday morning. Перед this, last, next и every предлог не ставится. “In five minutes” означает через пять минут от настоящего момента.',
      ),
      rule: L(
        'at + 시각 · on + 요일/날짜 · in + 달/연도/계절 · this/last/next/every 앞에는 전치사 없음',
        'at + soat · on + kun/sana · in + oy/yil/fasl · this/last/next/every oldidan ko‘makchi yo‘q',
        'at + time · on + day/date · in + month/year/season · no preposition before this/last/next/every',
        'at + время · on + день/дата · in + месяц/год/сезон · без предлога перед this/last/next/every',
      ),
      forms: [
        { base: 'clock time', result: 'at eight o’clock' },
        { base: 'day / date', result: 'on Monday / on 22 November' },
        {
          base: 'month / year / season',
          result: 'in April / in 2026 / in winter',
        },
        { base: 'from now', result: 'in five minutes' },
      ],
      drills: [
        d(
          'at eight o’clock',
          '나는 여덟 시에 일을 시작해요.',
          'Men soat sakkizda ish boshlayman.',
          'Я начинаю работу в восемь часов.',
          [
            r('I start work', 'I work start', 'I am start work'),
            r('at eight o’clock', 'on eight o’clock', 'in eight o’clock'),
            r('every day.', 'at every day.', 'on every day.'),
          ],
        ),
        d(
          'on Friday',
          '금요일에 만나요.',
          'Juma kuni ko‘rishamiz.',
          'Увидимся в пятницу.',
          [
            r('See you', 'Seeing you', 'See at you'),
            r('on Friday', 'at Friday', 'in Friday'),
            r('.', 'then.', 'again on.'),
          ],
        ),
        d(
          'on 22 November',
          '콘서트는 11월 22일이에요.',
          'Konsert 22-noyabr kuni bo‘ladi.',
          'Концерт состоится 22 ноября.',
          [
            r('The concert is', 'The concert are', 'Concert is the'),
            r('on 22 November', 'at 22 November', 'in 22 November'),
            r('.', 'day.', 'date.'),
          ],
        ),
        d(
          'in October',
          '나는 10월에 휴가를 갈 거예요.',
          'Men oktyabrda ta’tilga chiqaman.',
          'Я поеду в отпуск в октябре.',
          [
            r("I'm going on holiday", 'I going holiday', "I'm go on holiday"),
            r('in October', 'on October', 'at October'),
            r('.', 'month.', 'this in.'),
          ],
        ),
        d(
          'in 1993',
          '엠마는 1993년에 학교를 졸업했어요.',
          'Emma 1993-yilda maktabni tugatdi.',
          'Эмма окончила школу в 1993 году.',
          [
            r('Emma left school', 'Emma leave school', 'Emma was leave school'),
            r('in 1993', 'on 1993', 'at 1993'),
            r('.', 'year.', 'ago in.'),
          ],
        ),
        d(
          'at night',
          '나는 밤에 잠을 잘 못 자요.',
          'Men tunda yaxshi uxlay olmayman.',
          'Я плохо сплю ночью.',
          [
            r("I can't sleep well", "I don't can sleep", "I can't sleeping"),
            r('at night', 'in night', 'on night'),
            r('.', 'time.', 'every at.'),
          ],
        ),
        d(
          'in the morning',
          '나는 아침에 항상 기분이 좋아요.',
          'Men ertalab doim o‘zimni yaxshi his qilaman.',
          'Утром я всегда хорошо себя чувствую.',
          [
            r(
              'I always feel good',
              'I feel always good',
              'I am always feel good',
            ),
            r('in the morning', 'on the morning', 'at the morning'),
            r('.', 'day.', 'time in.'),
          ],
        ),
        d(
          'on Monday morning',
          '월요일 아침에 질을 만나요.',
          'Men Jill bilan dushanba ertalab uchrashaman.',
          'Я встречаюсь с Джилл в понедельник утром.',
          [
            r("I'm meeting Jill", 'I meet Jill now', "I'm meet Jill"),
            r('on Monday morning', 'in Monday morning', 'at Monday morning'),
            r('.', 'then.', 'morning on.'),
          ],
        ),
        d(
          'next Monday',
          '나는 다음 월요일에 휴가를 가요.',
          'Men keyingi dushanba ta’tilga chiqaman.',
          'Я уезжаю в отпуск в следующий понедельник.',
          [
            r("I'm going on holiday", 'I going holiday', "I'm go holiday"),
            r('next Monday', 'on next Monday', 'in next Monday'),
            r('.', 'day.', 'week next.'),
          ],
        ),
        d(
          'in five minutes',
          '기차가 5분 뒤에 출발해요.',
          'Poyezd besh daqiqadan keyin jo‘naydi.',
          'Поезд отправляется через пять минут.',
          [
            r('The train leaves', 'The train leave', 'Leaves the train'),
            r('in five minutes', 'after five minutes', 'on five minutes'),
            r('.', 'later in.', 'from now in.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Are you free on Saturday evening?',
          '토요일 저녁에 시간 있어요?',
          'Shanba oqshomida bo‘shmisiz?',
          'Вы свободны в субботу вечером?',
          'on Saturday evening',
        ),
        line(
          'Leo',
          'right',
          'Yes. The film starts at seven.',
          '네. 영화는 일곱 시에 시작해요.',
          'Ha. Film soat yettida boshlanadi.',
          'Да. Фильм начинается в семь.',
          'at seven',
        ),
      ],
      cautions: [
        caution(
          '특정 요일의 아침·저녁에는 on을 써요: on Monday morning.',
          'Aniq kunning ertalab yoki oqshomida on ishlatiladi: on Monday morning.',
          'Use on for a part of a named day: on Monday morning.',
          'С частью конкретного дня употребляйте on: on Monday morning.',
        ),
        caution(
          'next, last, this, every 앞에 at/on/in을 붙이지 마세요.',
          'Next, last, this va every oldidan at/on/in qo‘ymang.',
          'Do not add at, on, or in before next, last, this, or every.',
          'Не ставьте at, on или in перед next, last, this или every.',
        ),
      ],
      similar: {
        pattern: 'in / at / on (places)',
        note: L(
          '같은 전치사가 장소에 쓰일 때는 Unit 99~100에서 다른 기준을 배워요.',
          'Shu ko‘makchilarning joy ma’nosi Unit 99–100 da boshqa qoidalar bilan o‘rganiladi.',
          'Units 99–100 explain the different principles for these prepositions of place.',
          'В Units 99–100 объясняются другие правила употребления этих предлогов с местом.',
        ),
      },
    },
  ],
};
