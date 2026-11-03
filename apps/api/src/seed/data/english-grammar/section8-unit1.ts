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

export const ENGLISH_GRAMMAR_S8_U1: EnglishGrammarUnit = {
  section: 8,
  unit: 1,
  level: '6',
  title: L(
    '구동사와 문장 연결',
    "Frazali fe'llar va gaplarni bog'lash",
    'Phrasal verbs and sentence links',
    'Фразовые глаголы и связь предложений',
  ),
  description: L(
    '방향 부사가 만드는 구동사와 목적어 위치를 익히고, and·but·or·so·because로 생각을 자연스럽게 연결해요.',
    "Yo'nalish ravishli frazali fe'llar va obyekt o'rnini o'rganib, fikrlarni and, but, or, so, because bilan tabiiy bog'laymiz.",
    'Learn directional and separable phrasal verbs, then connect ideas naturally with and, but, or, so, and because.',
    'Изучаем фразовые глаголы и место дополнения, затем естественно связываем мысли с and, but, or, so и because.',
  ),
  specs: [
    {
      sourceUnit: 107,
      code: 'en-general:grammar:u107-phrasal-verbs-direction',
      pattern: 'go in · get out · stand up · come back',
      summary: L(
        '동사 뒤의 방향 부사가 만드는 구동사로 이동·자세·출발·귀환을 자연스럽게 말해요.',
        "Fe'ldan keyingi yo'nalish ravishi yasaydigan frazali fe'llar bilan harakat, holat, ketish va qaytishni tabiiy aytamiz.",
        'Use verb-particle combinations to describe movement, position, departure, and return naturally.',
        'Употребляем сочетания глагола с частицей для движения, положения, ухода и возвращения.',
      ),
      categoryTag: L(
        '구동사 1',
        "Frazali fe'llar 1",
        'Phrasal verbs 1',
        'Фразовые глаголы 1',
      ),
      explanation: L(
        'go in, get out, get on, fall off, stand up, sit down처럼 동사 뒤에 in/out/on/off/up/down이 붙으면 이동 방향이나 상태 변화가 분명해져요. run away/off와 drive away/off는 떠남, go away와 be away는 다른 곳에 있음, come back·go back·be back은 돌아옴을 나타냅니다. turn over는 뒤집다, look round/around는 둘러보다예요.',
        "Go in, get out, get on, fall off, stand up, sit down kabi birikmalarda in/out/on/off/up/down yo'nalish yoki holat o'zgarishini aniq bildiradi. Run away/off va drive away/off ketishni, go away/be away boshqa joyda bo'lishni, come back/go back/be back qaytishni anglatadi. Turn over — ag'darmoq, look round/around — atrofga qaramoq.",
        'Particles such as in/out/on/off/up/down make direction or change clear in go in, get out, get on, fall off, stand up, and sit down. Run away/off and drive away/off mark departure; go away/be away mark being elsewhere; come back/go back/be back mark return. Turn over reverses a side, and look round/around means look in every direction.',
        'Частицы in/out/on/off/up/down уточняют направление или изменение состояния: go in, get out, get on, fall off, stand up, sit down. Run away/off и drive away/off означают уход, go away/be away — пребывание в другом месте, come back/go back/be back — возвращение. Turn over — перевернуть, look round/around — оглянуться.',
      ),
      rule: L(
        '동사 + 방향 부사(in/out/on/off/up/down/away/back/over/round) = 구동사',
        "fe'l + yo'nalish ravishi (in/out/on/off/up/down/away/back/over/round) = frazali fe'l",
        'verb + direction particle (in/out/on/off/up/down/away/back/over/round) = phrasal verb',
        'глагол + частица направления (in/out/on/off/up/down/away/back/over/round) = фразовый глагол',
      ),
      forms: [
        { base: 'enter / leave', result: 'go in / get out' },
        { base: 'board / leave a vehicle', result: 'get on / get off' },
        { base: 'body position', result: 'stand up / sit down / lie down' },
        { base: 'leave / return', result: 'go away / come back / be back' },
      ],
      drills: [
        d(
          'The door was open, so we ___.',
          'went in',
          '문이 열려 있어서 우리는 안으로 들어갔어요.',
          'Eshik ochiq edi, shuning uchun ichkariga kirdik.',
          'Дверь была открыта, поэтому мы вошли.',
          [
            r('The door', 'Door the', 'The doors'),
            r('was open, so we', 'open was, we', 'was opened, so us'),
            r('went in', 'went into it', 'in went'),
          ],
        ),
        d(
          'The car stopped and Mina ___.',
          'got out',
          '차가 멈추자 미나가 내렸어요.',
          "Mashina to'xtadi va Mina tushdi.",
          'Машина остановилась, и Мина вышла.',
          [
            r('The car stopped', 'The car stop', 'Car stopped the'),
            r('and Mina', 'but Mina was', 'and the Mina'),
            r('got out', 'got outside of', 'out got'),
          ],
        ),
        d(
          'The bus arrived, and we ___.',
          'got on',
          '버스가 도착해서 우리는 탔어요.',
          'Avtobus keldi va biz unga chiqdik.',
          'Автобус приехал, и мы сели.',
          [
            r('The bus arrived,', 'The bus arrive,', 'Bus the arrived,'),
            r('and we', 'so us', 'and we were'),
            r('got on', 'got in it', 'on got'),
          ],
        ),
        d(
          'Be careful not to ___ the bike.',
          'fall off',
          '자전거에서 떨어지지 않게 조심하세요.',
          "Velosipeddan yiqilib tushmaslikka ehtiyot bo'ling.",
          'Осторожно, не упадите с велосипеда.',
          [
            r('Be careful', 'Careful be', 'Be carefully'),
            r('not to', 'to not', 'not'),
            r('fall off', 'fall down from', 'off fall'),
            r('the bike.', 'bike the.', 'a bikes.'),
          ],
        ),
        d(
          'Everyone ___ when the teacher entered.',
          'stood up',
          '선생님이 들어오자 모두 일어섰어요.',
          "O'qituvchi kirganda hamma o'rnidan turdi.",
          'Когда вошёл учитель, все встали.',
          [
            r('Everyone', 'Every people', 'All person'),
            r('stood up', 'standed up', 'up stood'),
            r(
              'when the teacher entered.',
              'when entered the teacher.',
              'the teacher when entered.',
            ),
          ],
        ),
        d(
          'Please ___ and make yourself comfortable.',
          'sit down',
          '앉아서 편하게 계세요.',
          "Iltimos, o'tiring va o'zingizni erkin tuting.",
          'Пожалуйста, садитесь и располагайтесь поудобнее.',
          [
            r('Please', 'You please', 'Please to'),
            r('sit down', 'sit up', 'down sit'),
            r(
              'and make yourself comfortable.',
              'and comfortable yourself make.',
              'to make yourself comfort.',
            ),
          ],
        ),
        d(
          'The thief saw the police and ___.',
          'ran away',
          '도둑은 경찰을 보고 달아났어요.',
          "O'g'ri politsiyani ko'rib qochib ketdi.",
          'Вор увидел полицию и убежал.',
          [
            r('The thief', 'Thief the', 'The thieves was'),
            r('saw the police', 'see the police', 'saw police the'),
            r('and', 'but', 'so'),
            r('ran away', 'run away', 'away ran'),
          ],
        ),
        d(
          'Leo has ___ for a few days.',
          'gone away',
          '레오는 며칠 동안 다른 곳에 갔어요.',
          'Leo bir necha kunga ketgan.',
          'Лео уехал на несколько дней.',
          [
            r('Leo', 'The Leo', 'Leo is'),
            r('has', 'have', 'is'),
            r('gone away', 'went away', 'gone off from'),
            r('for a few days.', 'since a few days.', 'a few days for.'),
          ],
        ),
        d(
          'What time will you ___?',
          'come back',
          '몇 시에 돌아올 거예요?',
          'Soat nechada qaytasiz?',
          'Во сколько вы вернётесь?',
          [
            r('What time', 'Which time', 'How time'),
            r('will you', 'you will', 'will you to'),
            r('come back', 'come to back', 'back come'),
            r('?', 'home?', 'again?'),
          ],
        ),
        d(
          'Mina heard her name and ___.',
          'looked round',
          '미나는 자기 이름을 듣고 뒤를 돌아봤어요.',
          'Mina ismini eshitib atrofga qaradi.',
          'Мина услышала своё имя и оглянулась.',
          [
            r('Mina heard', 'Mina hears', 'Mina was heard'),
            r('her name', 'she name', 'hers name'),
            r('and', 'but', 'so'),
            r('looked round', 'looked around to', 'round looked'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Get on quickly. The bus is leaving!',
          '빨리 타요. 버스가 출발해요!',
          'Tez chiqing. Avtobus ketyapti!',
          'Садитесь скорее. Автобус отправляется!',
          'Get on',
        ),
        line(
          'Leo',
          'right',
          'Wait! I dropped my ticket, so I have to go back.',
          '잠깐만요! 표를 떨어뜨려서 돌아가야 해요.',
          "To'xtang! Chiptam tushib qoldi, orqaga qaytishim kerak.",
          'Подождите! Я уронил билет, мне нужно вернуться.',
          'go back',
        ),
      ],
      cautions: [
        L(
          'get in/out은 보통 자동차에, get on/off는 버스·기차·비행기에 써요.',
          'Get in/out odatda mashina, get on/off avtobus, poyezd va samolyot uchun ishlatiladi.',
          'Use get in/out for a car and get on/off for a bus, train, or plane.',
          'Get in/out обычно употребляется с машиной, get on/off — с автобусом, поездом или самолётом.',
        ),
        L(
          'be back은 돌아와 있는 상태, come back은 돌아오는 움직임이에요.',
          'Be back qaytib kelgan holat, come back esa qaytish harakatidir.',
          'Be back describes the returned state; come back describes the movement of returning.',
          'Be back описывает состояние после возвращения, come back — само движение назад.',
        ),
      ],
      similar: {
        pattern: 'up / over / through (movement)',
        note: L(
          'Unit 103의 방향 전치사가 동사와 굳어지면 구동사가 돼요.',
          "103-unitdagi yo'nalish ko'makchilari fe'l bilan biriksa frazali fe'l hosil qiladi.",
          'The movement words from Unit 103 form phrasal verbs when they combine closely with a verb.',
          'Слова направления из Unit 103 образуют фразовые глаголы в устойчивом сочетании с глаголом.',
        ),
      },
    },
    {
      sourceUnit: 108,
      code: 'en-general:grammar:u108-separable-phrasal-verbs',
      pattern: 'put on your shoes · put your shoes on · put them on',
      summary: L(
        '목적어가 있는 구동사에서 명사와 대명사의 위치를 구별하고 자주 쓰는 동작 구동사를 익혀요.',
        "Obyektli frazali fe'llarda ot va olmosh o'rnini farqlab, kundalik harakat birikmalarini o'rganamiz.",
        'Place noun and pronoun objects correctly with separable phrasal verbs and learn common action combinations.',
        'Правильно размещаем существительное или местоимение при разделяемом фразовом глаголе и изучаем частые сочетания.',
      ),
      categoryTag: L(
        '구동사 2',
        "Frazali fe'llar 2",
        'Phrasal verbs 2',
        'Фразовые глаголы 2',
      ),
      explanation: L(
        'put on, take off, turn on/off, pick up, put down, bring/take/give/put back 같은 구동사는 목적어가 명사일 때 put on your coat와 put your coat on을 모두 쓸 수 있어요. 하지만 목적어가 it/them 같은 대명사이면 반드시 particle 앞에 놓아 put it on, take them off라고 합니다. put on it은 틀려요.',
        "Put on, take off, turn on/off, pick up, put down, bring/take/give/put back kabi frazali fe'llarda obyekt ot bo'lsa put on your coat yoki put your coat on deyish mumkin. Ammo obyekt it/them kabi olmosh bo'lsa u albatta zarrachadan oldin keladi: put it on, take them off. Put on it noto'g'ri.",
        'With separable phrasal verbs such as put on, take off, turn on/off, pick up, put down, and bring/take/give/put back, a noun object can go before or after the particle: put on your coat or put your coat on. A pronoun object must go in the middle: put it on, take them off. Put on it is incorrect.',
        'В разделяемых фразовых глаголах put on, take off, turn on/off, pick up, put down, bring/take/give/put back существительное может стоять до или после частицы: put on your coat / put your coat on. Местоимение ставится только в середине: put it on, take them off. Put on it неверно.',
      ),
      rule: L(
        '명사 목적어는 앞·뒤 모두 가능 · 대명사 목적어는 반드시 동사와 particle 사이',
        "ot obyekt oldin yoki keyin kelishi mumkin · olmosh obyekt faqat fe'l va particle orasida",
        'noun object may go before or after the particle · pronoun object must go between verb and particle',
        'существительное может стоять до или после частицы · местоимение только между глаголом и частицей',
      ),
      forms: [
        { base: 'noun object', result: 'put on your coat / put your coat on' },
        { base: 'pronoun object', result: 'put it on / take them off' },
        { base: 'machine', result: 'turn the light on / turn it off' },
        {
          base: 'return',
          result: 'bring it back / give them back / put it back',
        },
      ],
      drills: [
        d(
          'It is cold, so ___ your coat.',
          'put on',
          '추우니 코트를 입으세요.',
          'Sovuq, shuning uchun paltoingizni kiying.',
          'Холодно, наденьте пальто.',
          [
            r('It is cold, so', 'It cold is, so', 'It is cold, but'),
            r('put on', 'put off', 'on put'),
            r('your coat.', 'you coat.', 'your coats is.'),
          ],
        ),
        d(
          'Here is your coat. ___.',
          'Put it on',
          '여기 코트가 있어요. 입으세요.',
          'Mana paltoingiz. Uni kiying.',
          'Вот ваше пальто. Наденьте его.',
          [
            r('Here is', 'Here are', 'Is here'),
            r('your coat.', 'you coat.', 'your coats.'),
            r('Put it on', 'Put on it', 'It put on'),
          ],
        ),
        d(
          'Your shoes are wet. ___.',
          'Take them off',
          '신발이 젖었어요. 벗으세요.',
          "Oyoq kiyimingiz ho'l. Uni yeching.",
          'Ваша обувь мокрая. Снимите её.',
          [
            r('Your shoes', 'You shoes', 'Your shoe is'),
            r('are wet.', 'is wet.', 'wet are.'),
            r('Take them off', 'Take off them', 'Them take off'),
          ],
        ),
        d(
          'It was dark, so Leo ___ the light.',
          'turned on',
          '어두워서 레오는 불을 켰어요.',
          "Qorong'i edi, shuning uchun Leo chiroqni yoqdi.",
          'Было темно, поэтому Лео включил свет.',
          [
            r('It was dark, so', 'It dark was, so', 'It was dark, because'),
            r('Leo', 'the Leo', 'Leo was'),
            r('turned on', 'turned off', 'on turned'),
            r('the light.', 'light the.', 'a lights.'),
          ],
        ),
        d(
          'The television is noisy. Please ___.',
          'turn it off',
          '텔레비전 소리가 시끄러워요. 꺼 주세요.',
          "Televizor shovqinli. Iltimos, uni o'chiring.",
          'Телевизор шумит. Пожалуйста, выключите его.',
          [
            r('The television', 'Television the', 'The televisions'),
            r('is noisy.', 'are noisy.', 'noisy is.'),
            r('Please', 'You please', 'Please to'),
            r('turn it off', 'turn off it', 'it turn off'),
          ],
        ),
        d(
          'Those are my keys. Can you ___?',
          'pick them up',
          '저것은 내 열쇠예요. 주워 줄래요?',
          'Anavi mening kalitlarim. Ularni olib bera olasizmi?',
          'Это мои ключи. Можете их поднять?',
          [
            r('Those are', 'That is', 'Those is'),
            r('my keys.', 'mine keys.', 'my key are.'),
            r('Can you', 'Do you can', 'Can you to'),
            r('pick them up', 'pick up them', 'them pick up'),
          ],
        ),
        d(
          'Mina finished reading and ___.',
          'put the book down',
          '미나는 책을 다 읽고 내려놓았어요.',
          "Mina o'qishni tugatib, kitobni qo'ydi.",
          'Мина закончила читать и положила книгу.',
          [
            r('Mina finished', 'Mina finish', 'Mina was finished'),
            r('reading and', 'to read and', 'reading but'),
            r('put the book down', 'put down it', 'the book put down'),
          ],
        ),
        d(
          'You can borrow my umbrella, but ___ tomorrow.',
          'bring it back',
          '내 우산을 빌려도 되지만 내일 돌려주세요.',
          'Soyabonimni olishingiz mumkin, ammo ertaga qaytaring.',
          'Можете взять мой зонт, но верните его завтра.',
          [
            r('You can borrow', 'You can to borrow', 'You borrowing'),
            r('my umbrella, but', 'mine umbrella, but', 'my umbrella, because'),
            r('bring it back', 'bring back it', 'it bring back'),
            r('tomorrow.', 'on tomorrow.', 'the tomorrow.'),
          ],
        ),
        d(
          'This sweater is too small. I will ___ to the shop.',
          'take it back',
          '이 스웨터는 너무 작아서 가게에 반품할 거예요.',
          "Bu sviter juda kichik. Uni do'konga qaytaraman.",
          'Этот свитер слишком мал. Я отнесу его обратно в магазин.',
          [
            r('This sweater', 'These sweater', 'This sweaters'),
            r('is too small.', 'are too small.', 'too small is.'),
            r('I will', 'I will to', 'I am will'),
            r('take it back', 'take back it', 'it take back'),
            r('to the shop.', 'at the shop.', 'shop to.'),
          ],
        ),
        d(
          'After reading the note, Leo ___ in the envelope.',
          'put it back',
          '메모를 읽은 뒤 레오는 그것을 봉투에 다시 넣었어요.',
          "Xatni o'qigach, Leo uni konvertga qayta soldi.",
          'Прочитав записку, Лео положил её обратно в конверт.',
          [
            r('After reading', 'After to read', 'After read'),
            r('the note, Leo', 'note the, Leo', 'the note, the Leo'),
            r('put it back', 'put back it', 'it put back'),
            r('in the envelope.', 'into envelope the.', 'at the envelope.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'The music is too loud. Can you turn it down?',
          '음악이 너무 커요. 줄여 줄래요?',
          'Musiqa juda baland. Uni pasaytira olasizmi?',
          'Музыка слишком громкая. Можете сделать потише?',
          'turn it down',
        ),
        line(
          'Leo',
          'right',
          'Sure. I will turn it off after this song.',
          '물론이죠. 이 노래가 끝나면 끌게요.',
          "Albatta. Bu qo'shiqdan keyin uni o'chiraman.",
          'Конечно. После этой песни я её выключу.',
          'turn it off',
        ),
      ],
      cautions: [
        L(
          '목적어가 대명사이면 particle 뒤에 놓을 수 없어요: turn it off.',
          "Obyekt olmosh bo'lsa, uni particle dan keyin qo'yib bo'lmaydi: turn it off.",
          'A pronoun object cannot follow the particle: turn it off.',
          'Местоимение нельзя ставить после частицы: turn it off.',
        ),
        L(
          '모든 구동사가 분리되는 것은 아니므로 각 구동사의 패턴을 함께 익혀요.',
          "Barcha frazali fe'llar ajralmaydi; har birining qolipini birga o'rganing.",
          'Not every phrasal verb is separable, so learn the pattern with each verb.',
          'Не все фразовые глаголы разделяются, поэтому запоминайте модель каждого.',
        ),
      ],
      similar: {
        pattern: 'go in / fall off / come back',
        note: L(
          'Unit 107의 목적어 없는 구동사와 달리 이 Unit은 목적어 위치가 중요해요.',
          "107-unitdagi obyektsiz birikmalardan farqli, bu unitda obyekt o'rni muhim.",
          'Unlike the intransitive combinations in Unit 107, these phrasal verbs require attention to object position.',
          'В отличие от непереходных сочетаний Unit 107, здесь важно место дополнения.',
        ),
      },
    },
    {
      sourceUnit: 109,
      code: 'en-general:grammar:u109-conjunctions',
      pattern: 'and / but / or / so / because',
      summary: L(
        'and·but·or로 생각을 나열·대조·선택하고, so로 결과를, because로 이유를 연결해요.',
        "And, but, or bilan fikrlarni qo'shamiz, qarama-qarshi qo'yamiz yoki tanlaymiz; so natijani, because sababni bog'laydi.",
        'Use and, but, and or to add, contrast, or choose; use so for a result and because for a reason.',
        'Соединяем, противопоставляем и выбираем с and, but, or; so вводит результат, because — причину.',
      ),
      categoryTag: L('접속사', "Bog'lovchilar", 'Conjunctions', 'Союзы'),
      explanation: L(
        'and, but, or, so, because는 두 짧은 문장을 하나의 긴 문장으로 연결해요. and는 추가, but은 대조, or는 선택을 나타냅니다. so 뒤에는 앞 상황의 결과가 오고, because 뒤에는 이유가 와요. because절은 문장 앞에도 올 수 있으며 이때 쉼표를 씁니다. 목록에서는 마지막 두 항목 사이에 and를 넣어요.',
        "And, but, or, so, because ikki qisqa gapni bir uzun gapga bog'laydi. And qo'shimcha, but qarama-qarshilik, or tanlovni bildiradi. So dan keyin natija, because dan keyin sabab keladi. Because qismi gap boshida kelsa vergul qo'yiladi. Ro'yxatda and oxirgi ikki unsur orasida keladi.",
        'And, but, or, so, and because join two short sentences. And adds information, but contrasts, and or presents a choice. So introduces a result; because introduces a reason. A because-clause may come first and is then followed by a comma. In a list, put and before the final item.',
        'And, but, or, so и because соединяют короткие предложения. And добавляет, but противопоставляет, or предлагает выбор. После so идёт результат, после because — причина. Придаточное с because может стоять в начале, после него ставится запятая. В списке and ставится перед последним элементом.',
      ),
      rule: L(
        'A and/but/or B · 원인, so + 결과 · 결과 because + 이유 · Because + 이유, 결과',
        'A and/but/or B · sabab, so + natija · natija because + sabab · Because + sabab, natija',
        'A and/but/or B · cause, so + result · result because + reason · Because + reason, result',
        'A and/but/or B · причина, so + результат · результат because + причина · Because + причина, результат',
      ),
      forms: [
        { base: 'addition', result: 'We ate and watched television.' },
        {
          base: 'contrast / choice',
          result: 'It is small but comfortable. / Tea or coffee?',
        },
        { base: 'result', result: 'It was late, so we left.' },
        { base: 'reason', result: 'We left because it was late.' },
      ],
      drills: [
        d(
          'We stayed home ___ watched a film.',
          'and',
          '우리는 집에 머물며 영화를 봤어요.',
          "Biz uyda qolib, film ko'rdik.",
          'Мы остались дома и посмотрели фильм.',
          [
            r('We stayed', 'We stay', 'We were stay'),
            r('home', 'at home to', 'to home'),
            r('and', 'but', 'because'),
            r('watched a film.', 'watch a film.', 'a film watched.'),
          ],
        ),
        d(
          'Mina is married ___ lives in Busan.',
          'and',
          '미나는 결혼했고 부산에 살아요.',
          'Mina turmushga chiqqan va Pusanda yashaydi.',
          'Мина замужем и живёт в Пусане.',
          [
            r('Mina', 'The Mina', 'Mina is'),
            r('is married', 'married is', 'is marry'),
            r('and', 'so', 'or'),
            r('lives in Busan.', 'live in Busan.', 'Busan lives in.'),
          ],
        ),
        d(
          'The flat is small ___ comfortable.',
          'but',
          '그 아파트는 작지만 편안해요.',
          'Kvartira kichik, ammo qulay.',
          'Квартира маленькая, но уютная.',
          [
            r('The flat', 'Flat the', 'The flats'),
            r('is small', 'small is', 'are small'),
            r('but', 'because', 'so'),
            r('comfortable.', 'comfortably.', 'is comfort.'),
          ],
        ),
        d(
          'I bought the newspaper ___ did not read it.',
          'but',
          '나는 신문을 샀지만 읽지 않았어요.',
          "Men gazeta sotib oldim, ammo uni o'qimadim.",
          'Я купил газету, но не прочитал её.',
          [
            r('I bought', 'I buy', 'I was bought'),
            r('the newspaper', 'newspaper the', 'a newspapers'),
            r('but', 'so', 'because'),
            r('did not read it.', 'not read it.', 'did not read them.'),
          ],
        ),
        d(
          'Would you like tea ___ coffee?',
          'or',
          '차와 커피 중 무엇을 드시겠어요?',
          'Choy yoki qahva xohlaysizmi?',
          'Вы хотите чай или кофе?',
          [
            r('Would you like', 'Do you would like', 'Would you liking'),
            r('tea', 'a tea is', 'teas'),
            r('or', 'and', 'so'),
            r('coffee?', 'a coffee are?', 'coffee is?'),
          ],
        ),
        d(
          'Hurry, ___ you will miss the bus.',
          'or',
          '서두르세요. 그렇지 않으면 버스를 놓칠 거예요.',
          "Shoshiling, aks holda avtobusni o'tkazib yuborasiz.",
          'Поторопитесь, иначе опоздаете на автобус.',
          [
            r('Hurry,', 'Hurrying,', 'To hurry,'),
            r('or', 'and', 'because'),
            r('you will miss', 'you miss will', 'you will missed'),
            r('the bus.', 'bus the.', 'a buses.'),
          ],
        ),
        d(
          'It was hot, ___ I opened the window.',
          'so',
          '더워서 창문을 열었어요.',
          'Issiq edi, shuning uchun derazani ochdim.',
          'Было жарко, поэтому я открыл окно.',
          [
            r('It was hot,', 'It hot was,', 'It was heat,'),
            r('so', 'because', 'but'),
            r('I opened', 'I open', 'I was opened'),
            r('the window.', 'window the.', 'a windows.'),
          ],
        ),
        d(
          'The water was dirty, ___ we did not swim.',
          'so',
          '물이 더러워서 우리는 수영하지 않았어요.',
          'Suv iflos edi, shuning uchun suzmadik.',
          'Вода была грязной, поэтому мы не купались.',
          [
            r('The water', 'A waters', 'Water the'),
            r('was dirty,', 'dirty was,', 'were dirty,'),
            r('so', 'because', 'and'),
            r('we did not swim.', 'we not swam.', 'we did not swam.'),
          ],
        ),
        d(
          'Leo stayed home ___ he was ill.',
          'because',
          '레오는 아파서 집에 있었어요.',
          "Leo kasal bo'lgani uchun uyda qoldi.",
          'Лео остался дома, потому что заболел.',
          [
            r('Leo stayed', 'Leo stay', 'Leo was stay'),
            r('home', 'to home', 'at the home to'),
            r('because', 'so', 'or'),
            r('he was ill.', 'he ill was.', 'he were ill.'),
          ],
        ),
        d(
          '___ it was raining, we took a taxi.',
          'Because',
          '비가 오고 있어서 우리는 택시를 탔어요.',
          "Yomg'ir yog'ayotgani uchun taksiga o'tirdik.",
          'Поскольку шёл дождь, мы взяли такси.',
          [
            r('Because', 'So', 'But'),
            r('it was raining,', 'it raining was,', 'it were raining,'),
            r('we took', 'we take', 'we were took'),
            r('a taxi.', 'taxi a.', 'a taxis.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Do you want to walk, or are you tired?',
          '걸어갈래요, 아니면 피곤해요?',
          'Piyoda yuramizmi yoki charchadingizmi?',
          'Хотите пройтись или вы устали?',
          'or',
        ),
        line(
          'Leo',
          'right',
          'I am tired because I worked late, so let us take a taxi.',
          '늦게까지 일해서 피곤하니 택시를 타요.',
          'Kech ishlaganim uchun charchadim, shuning uchun taksi olaylik.',
          'Я устал, потому что работал допоздна, поэтому давайте возьмём такси.',
          'because',
        ),
      ],
      cautions: [
        L(
          'so는 결과 앞에, because는 이유 앞에 와요.',
          'So natija oldidan, because sabab oldidan keladi.',
          'Put so before a result and because before a reason.',
          'So ставится перед результатом, because — перед причиной.',
        ),
        L(
          '한 절 안에서 because와 so를 동시에 써서 같은 관계를 두 번 표시하지 않아요.',
          'Bir xil sabab-natija aloqasida because va so ni birga ishlatmang.',
          'Do not use because and so together to mark the same cause-result relationship.',
          'Не употребляйте because и so вместе для одной причинно-следственной связи.',
        ),
      ],
      similar: {
        pattern: 'when / while / before / after',
        note: L(
          '다음 Unit에서는 시간 관계를 연결하는 접속사를 배워요.',
          "Keyingi unitda vaqt munosabatlarini bog'laydigan so'zlar o'rganiladi.",
          'The next unit covers conjunctions that link events in time.',
          'В следующем Unit рассматриваются союзы времени.',
        ),
      },
    },
  ],
};
