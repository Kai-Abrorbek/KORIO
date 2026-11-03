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
  acceptedAnswers?: EnglishGrammarDrill['acceptedAnswers'],
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
    acceptedAnswers,
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

export const ENGLISH_GRAMMAR_S8_U3: EnglishGrammarUnit = {
  section: 8,
  unit: 3,
  level: '6',
  title: L(
    '사람과 사물을 설명하는 관계절',
    'Odam va narsani izohlovchi nisbiy gaplar',
    'Relative clauses for people and things',
    'Относительные придаточные о людях и предметах',
  ),
  description: L(
    'who·that·which로 명사를 설명하고, 관계대명사가 주어인지 목적어인지에 따라 생략 가능 여부와 전치사 위치를 판단해요.',
    "Who, that, which bilan otni izohlaymiz; nisbiy olmosh ega yoki obyektligiga qarab uni tushirish va ko'makchi o'rnini aniqlaymiz.",
    'Describe nouns with who, that, and which, then decide whether the relative word can be omitted and where a preposition belongs.',
    'Описываем существительные с who, that и which и определяем, можно ли опустить относительное слово и где ставить предлог.',
  ),
  specs: [
    {
      sourceUnit: 113,
      code: 'en-general:grammar:u113-relative-clauses-subject',
      pattern: 'a person who ... · a thing that/which ...',
      summary: L(
        '사람을 설명하는 주격 관계절에는 who/that, 사물을 설명할 때는 that/which를 쓰며 주격 관계대명사는 생략하지 않아요.',
        "Odamni izohlovchi ega nisbiy gapda who/that, narsada that/which ishlatiladi; ega bo'lgan nisbiy olmosh tushirilmaydi.",
        'Use who/that for a person and that/which for a thing when the relative word is the subject; do not omit a subject relative pronoun.',
        'Для человека употребляйте who/that, для предмета — that/which; относительное местоимение-подлежащее не опускается.',
      ),
      categoryTag: L(
        '주격 관계절',
        'Ega nisbiy gap',
        'Subject relative clauses',
        'Относительные придаточные с подлежащим',
      ),
      explanation: L(
        '두 문장에서 같은 사람이나 사물을 반복하지 않고 명사 뒤에 관계절을 붙여 설명할 수 있어요. 사람에는 who가 가장 자연스럽고 that도 가능해요. 사물에는 that 또는 which를 쓰며 사람에게 which를 쓰지 않습니다. 관계대명사가 뒤 동사의 주어이면 반드시 남겨야 해요: the woman who works here, a machine that flies.',
        "Ikki gapda bir odam yoki narsani takrorlamasdan, otdan keyin nisbiy gap bilan izohlash mumkin. Odam uchun who eng tabiiy, that ham mumkin. Narsa uchun that yoki which ishlatiladi; odamga which ishlatilmaydi. Nisbiy olmosh keyingi fe'lning egasi bo'lsa, uni tushirib bo'lmaydi: the woman who works here, a machine that flies.",
        'Attach a relative clause after a noun instead of repeating the same person or thing in two sentences. Who is most usual for people, though that is possible. Use that or which for things; do not use which for people. When the relative word is the subject of the following verb, it must remain: the woman who works here, a machine that flies.',
        'Относительное придаточное после существительного позволяет не повторять человека или предмет. Для людей обычно who, также возможно that. Для предметов — that или which; which не употребляется о людях. Если относительное слово является подлежащим следующего глагола, его нельзя опускать: the woman who works here, a machine that flies.',
      ),
      rule: L(
        '사람 + who/that + 동사 · 사물 + that/which + 동사 · 주격 관계대명사는 생략 불가',
        "odam + who/that + fe'l · narsa + that/which + fe'l · ega nisbiy olmosh tushmaydi",
        'person + who/that + verb · thing + that/which + verb · do not omit a subject relative pronoun',
        'человек + who/that + глагол · предмет + that/which + глагол · местоимение-подлежащее не опускается',
      ),
      forms: [
        { base: 'person', result: 'a person who works here' },
        { base: 'person alternative', result: 'the people that live upstairs' },
        { base: 'thing', result: 'a machine that flies' },
        { base: 'thing alternative', result: 'a house which is 500 years old' },
      ],
      drills: [
        d(
          'A thief is a person ___ things.',
          'who steals',
          '도둑은 물건을 훔치는 사람이에요.',
          "O'g'ri — narsalarni o'g'irlaydigan odam.",
          'Вор — это человек, который крадёт вещи.',
          [
            r('A thief', 'Thief a', 'A thieves'),
            r('is a person', 'a person is', 'is person'),
            r('who steals', 'which steals', 'who steal'),
            r('things.', 'the thing.', 'things is.'),
          ],
        ),
        d(
          'Do you know anybody ___ the piano?',
          'who can play',
          '피아노를 칠 수 있는 사람을 아세요?',
          'Pianino chala oladigan odamni bilasizmi?',
          'Вы знаете кого-нибудь, кто умеет играть на пианино?',
          [
            r('Do you know', 'Are you know', 'You knowing'),
            r('anybody', 'any person is', 'somebody are'),
            r('who can play', 'which can play', 'who can plays'),
            r('the piano?', 'piano the?', 'a pianos?'),
          ],
        ),
        d(
          'The man ___ did not give his name.',
          'who phoned',
          '전화한 남자는 이름을 말하지 않았어요.',
          "Qo'ng'iroq qilgan kishi ismini aytmadi.",
          'Мужчина, который звонил, не назвал имени.',
          [
            r('The man', 'Man the', 'The men is'),
            r('who phoned', 'which phoned', 'who did phoned'),
            r('did not give', 'not gave', 'did not gave'),
            r('his name.', 'him name.', 'his names is.'),
          ],
        ),
        d(
          'The people ___ are friendly.',
          'who work here',
          '여기에서 일하는 사람들은 친절해요.',
          'Bu yerda ishlaydigan odamlar mehribon.',
          'Люди, которые здесь работают, дружелюбны.',
          [
            r('The people', 'The person are', 'People the'),
            r('who work here', 'which works here', 'who here works'),
            r('are friendly.', 'is friendly.', 'friendly are.'),
          ],
        ),
        d(
          'An aeroplane is a machine ___ flies.',
          'that',
          '비행기는 나는 기계예요.',
          'Samolyot — uchadigan mashina.',
          'Самолёт — это машина, которая летает.',
          [
            r('An aeroplane', 'A aeroplane', 'Aeroplane an'),
            r('is a machine', 'a machine is', 'is machine'),
            r('that', 'who', 'where'),
            r('flies.', 'fly.', 'is fly.'),
          ],
        ),
        d(
          'Emma lives in a house ___ very old.',
          'which is',
          '에마는 아주 오래된 집에 살아요.',
          'Emma juda eski uyda yashaydi.',
          'Эмма живёт в очень старом доме.',
          [
            r('Emma lives', 'Emma live', 'Emma is live'),
            r('in a house', 'at a house', 'a house in'),
            r('which is', 'who is', 'which are'),
            r('very old.', 'very older.', 'old very is.'),
          ],
        ),
        d(
          'I need a phone ___ good photos.',
          'that takes',
          '사진이 잘 찍히는 휴대전화가 필요해요.',
          'Yaxshi surat oladigan telefon kerak.',
          'Мне нужен телефон, который делает хорошие фотографии.',
          [
            r('I need', 'I am need', 'I needing'),
            r('a phone', 'phone a', 'a phones'),
            r('that takes', 'who takes', 'that take'),
            r('good photos.', 'well photos.', 'photos good.'),
          ],
        ),
        d(
          'Mina met a woman ___ six languages.',
          'who speaks',
          '미나는 여섯 개 언어를 말하는 여자를 만났어요.',
          'Mina olti tilda gapiradigan ayolni uchratdi.',
          'Мина встретила женщину, которая говорит на шести языках.',
          [
            r('Mina met', 'Mina meet', 'Mina was met'),
            r('a woman', 'woman a', 'a women'),
            r('who speaks', 'which speaks', 'who speak'),
            r('six languages.', 'six language.', 'languages six.'),
          ],
        ),
        d(
          'The bus ___ goes to the airport.',
          'that stops here',
          '여기에 정차하는 버스가 공항에 가요.',
          "Bu yerda to'xtaydigan avtobus aeroportga boradi.",
          'Автобус, который здесь останавливается, идёт в аэропорт.',
          [
            r('The bus', 'Bus the', 'The buses is'),
            r('that stops here', 'who stop here', 'that stop here'),
            r('goes', 'go', 'is go'),
            r('to the airport.', 'at the airport.', 'airport to.'),
          ],
        ),
        d(
          'The book ___ is on the desk.',
          'which explains this rule',
          '이 규칙을 설명하는 책은 책상 위에 있어요.',
          'Bu qoidani tushuntiradigan kitob stol ustida.',
          'Книга, которая объясняет это правило, лежит на столе.',
          [
            r('The book', 'Book the', 'The books is'),
            r(
              'which explains this rule',
              'who explain this rule',
              'which explain this rule',
            ),
            r('is', 'are', 'does'),
            r('on the desk.', 'in the desk.', 'desk on.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Who is the woman who works with Leo?',
          '레오와 함께 일하는 여자는 누구예요?',
          'Leo bilan ishlaydigan ayol kim?',
          'Кто та женщина, которая работает с Лео?',
          'who works',
        ),
        line(
          'Leo',
          'right',
          'She is the designer who made our new logo.',
          '우리 새 로고를 만든 디자이너예요.',
          'U yangi logotipimizni yaratgan dizayner.',
          'Это дизайнер, которая создала наш новый логотип.',
          'who made',
        ),
      ],
      cautions: [
        L(
          '사람을 설명할 때 which를 쓰지 않아요.',
          'Odamni izohlashda which ishlatilmaydi.',
          'Do not use which for a person.',
          'Не употребляйте which для человека.',
        ),
        L(
          '관계대명사가 관계절의 주어이면 생략할 수 없어요.',
          "Nisbiy olmosh gapning egasi bo'lsa, uni tushirib bo'lmaydi.",
          'Do not omit the relative pronoun when it is the subject of the relative clause.',
          'Не опускайте относительное местоимение, если оно является подлежащим придаточного.',
        ),
      ],
      similar: {
        pattern: 'the people (who) we met',
        note: L(
          '다음 Unit에서는 관계대명사가 목적어일 때 생략할 수 있어요.',
          "Keyingi unitda nisbiy olmosh obyekt bo'lsa, uni tushirish mumkin.",
          'In the next unit, an object relative pronoun can be omitted.',
          'В следующем Unit относительное местоимение-объект можно опустить.',
        ),
      },
    },
    {
      sourceUnit: 114,
      code: 'en-general:grammar:u114-relative-clauses-object',
      pattern: 'the people (who) we met · the hotel (that) we stayed at',
      summary: L(
        '관계대명사가 목적어이면 who·that·which를 생략할 수 있고, 필요한 전치사는 관계절 끝에 남겨요.',
        "Nisbiy olmosh obyekt bo'lsa, who, that, which tushirilishi mumkin; kerak ko'makchi nisbiy gap oxirida qoladi.",
        'When the relative word is the object, who, that, or which can be omitted; keep a required preposition at the end of the relative clause.',
        'Если относительное слово является дополнением, who, that или which можно опустить; нужный предлог остаётся в конце придаточного.',
      ),
      categoryTag: L(
        '목적격 관계절',
        'Obyekt nisbiy gap',
        'Object relative clauses',
        'Относительные придаточные с дополнением',
      ),
      explanation: L(
        '관계절 안에 이미 주어가 있고 앞의 명사가 목적어 역할을 하면 관계대명사를 생략할 수 있어요: the bag (that) he is carrying, the people (who) we met. 관계절에서 같은 목적어를 대명사로 다시 쓰지 않습니다. talk to, stay at, tell somebody about처럼 전치사가 필요한 동사는 전치사를 관계절 끝에 남겨요. 장소에는 where를 쓸 수도 있어요. 반대로 관계대명사가 주어이면 반드시 who/that/which를 써야 합니다.',
        "Nisbiy gapda ega allaqachon bo'lib, oldingi ot obyekt vazifasida kelsa, nisbiy olmosh tushishi mumkin: the bag (that) he is carrying, the people (who) we met. O'sha obyektni olmosh bilan yana takrorlamang. Talk to, stay at, tell somebody about kabi birikmalarning ko'makchisi gap oxirida qoladi. Joy uchun where ham mumkin. Ammo nisbiy olmosh ega bo'lsa, who/that/which majburiy.",
        'If the relative clause already has a subject and the earlier noun is its object, the relative word can be omitted: the bag (that) he is carrying, the people (who) we met. Do not repeat the object with a pronoun. A preposition required by talk to, stay at, tell somebody about, and similar verbs remains at the end. Where is also possible for a place. If the relative word is the subject, however, who/that/which is required.',
        'Если в придаточном уже есть подлежащее, а определяемое существительное является дополнением, относительное слово можно опустить: the bag (that) he is carrying, the people (who) we met. Не повторяйте дополнение местоимением. Предлог при talk to, stay at, tell somebody about остаётся в конце. Для места возможно where. Но относительное местоимение-подлежащее обязательно.',
      ),
      rule: L(
        '명사 + (who/that/which) + 주어 + 동사 · 목적격은 생략 가능 · 전치사는 관계절 끝 · 목적어 대명사 반복 금지',
        "ot + (who/that/which) + ega + fe'l · obyekt olmosh tushishi mumkin · ko'makchi oxirida · obyektni olmosh bilan takrorlamang",
        'noun + (who/that/which) + subject + verb · object relative may be omitted · preposition at the end · do not repeat the object pronoun',
        'существительное + (who/that/which) + подлежащее + глагол · объект можно опустить · предлог в конце · не повторяйте дополнение местоимением',
      ),
      forms: [
        { base: 'thing as object', result: 'the bag (that) he is carrying' },
        { base: 'people as object', result: 'the people (who) we met' },
        { base: 'preposition at end', result: 'the hotel (that) we stayed at' },
        { base: 'place with where', result: 'the hotel where we stayed' },
      ],
      drills: [
        d(
          'The bag ___ is very heavy.',
          'he is carrying',
          '그가 들고 있는 가방은 아주 무거워요.',
          "U ko'tarayotgan sumka juda og'ir.",
          'Сумка, которую он несёт, очень тяжёлая.',
          [
            r('The bag', 'Bag the', 'The bags is'),
            r('he is carrying', 'he is carrying it', 'is he carrying'),
            r('is very heavy.', 'are very heavy.', 'very heavily is.'),
          ],
          ['he is carrying', 'that he is carrying'],
        ),
        d(
          'Have you seen the photos ___?',
          'Mina took',
          '미나가 찍은 사진을 봤어요?',
          "Mina olgan suratlarni ko'rdingizmi?",
          'Вы видели фотографии, которые сделала Мина?',
          [
            r('Have you seen', 'Did you seen', 'Have you saw'),
            r('the photos', 'photos the', 'the photo is'),
            r('Mina took', 'Mina took them', 'took Mina'),
            r('?', 'yesterday?', 'already?'),
          ],
          ['Mina took', 'that Mina took'],
        ),
        d(
          'Did you find the book ___?',
          'you wanted',
          '원하던 책을 찾았어요?',
          'Xohlagan kitobingizni topdingizmi?',
          'Вы нашли книгу, которую хотели?',
          [
            r('Did you find', 'Did you found', 'You did find'),
            r('the book', 'book the', 'the books is'),
            r('you wanted', 'you wanted it', 'wanted you'),
            r('?', 'today?', 'already?'),
          ],
          ['you wanted', 'that you wanted'],
        ),
        d(
          'The people ___ were very kind.',
          'we met',
          '우리가 만난 사람들은 아주 친절했어요.',
          'Biz uchratgan odamlar juda mehribon edi.',
          'Люди, которых мы встретили, были очень добры.',
          [
            r('The people', 'The person were', 'People the'),
            r('we met', 'we met them', 'met we'),
            r('were very kind.', 'was very kind.', 'kindly were.'),
          ],
          ['we met', 'who we met'],
        ),
        d(
          'Everything ___ was true.',
          'I said',
          '내가 말한 모든 것은 사실이었어요.',
          'Men aytgan hamma narsa rost edi.',
          'Всё, что я сказал, было правдой.',
          [
            r('Everything', 'Every things', 'All thing'),
            r('I said', 'I said it', 'said I'),
            r('was true.', 'were true.', 'true was it.'),
          ],
          ['I said', 'that I said'],
        ),
        d(
          'The film ___ was excellent.',
          'we saw',
          '우리가 본 영화는 훌륭했어요.',
          "Biz ko'rgan film ajoyib edi.",
          'Фильм, который мы посмотрели, был отличным.',
          [
            r('The film', 'Film the', 'The films is'),
            r('we saw', 'we saw it', 'saw we'),
            r('was excellent.', 'were excellent.', 'excellently was.'),
          ],
          ['we saw', 'that we saw'],
        ),
        d(
          'Do you know the man Mina is ___?',
          'talking to',
          '미나가 이야기하고 있는 남자를 아세요?',
          'Mina gaplashayotgan odamni taniysizmi?',
          'Вы знаете мужчину, с которым разговаривает Мина?',
          [
            r('Do you know', 'Are you know', 'You knowing'),
            r('the man', 'man the', 'the men is'),
            r('Mina is', 'is Mina', 'Mina'),
            r('talking to', 'talking to him', 'talking at'),
            r('?', 'now?', 'there?'),
          ],
        ),
        d(
          'The hotel ___ was near the station.',
          'we stayed at',
          '우리가 묵은 호텔은 역 근처였어요.',
          'Biz turgan mehmonxona vokzal yonida edi.',
          'Отель, в котором мы остановились, был рядом со станцией.',
          [
            r('The hotel', 'Hotel the', 'The hotels is'),
            r('we stayed at', 'we stayed at it', 'we stayed in to'),
            r('was near', 'were near', 'near was'),
            r('the station.', 'station the.', 'a stations.'),
          ],
          ['we stayed at', 'that we stayed at'],
        ),
        d(
          'These are the books I told you ___.',
          'about',
          '이것들이 내가 말해 준 책들이에요.',
          'Bular men sizga aytgan kitoblar.',
          'Это книги, о которых я вам говорил.',
          [
            r('These are', 'This is', 'These is'),
            r('the books', 'books the', 'the book are'),
            r('I told you', 'I told to you', 'told I you'),
            r('about', 'about them', 'for'),
            r('.', 'yesterday.', 'before.'),
          ],
        ),
        d(
          'The café ___ has closed.',
          'where we met',
          '우리가 만났던 카페가 문을 닫았어요.',
          'Biz uchrashgan kafe yopilibdi.',
          'Кафе, где мы встретились, закрылось.',
          [
            r('The café', 'Café the', 'The cafés is'),
            r('where we met', 'where we met there', 'which we met'),
            r('has closed.', 'have closed.', 'has close.'),
          ],
        ),
      ],
      dialogue: [
        line(
          'Mina',
          'left',
          'Did you like the hotel we stayed at?',
          '우리가 묵었던 호텔이 마음에 들었어요?',
          'Biz turgan mehmonxona sizga yoqdimi?',
          'Вам понравился отель, где мы остановились?',
          'we stayed at',
        ),
        line(
          'Leo',
          'right',
          'Yes, and the people we met there were lovely.',
          '네, 그곳에서 만난 사람들도 정말 좋았어요.',
          'Ha, u yerda uchratgan odamlarimiz ham juda yoqimli edi.',
          'Да, и люди, которых мы там встретили, были замечательные.',
          'we met',
        ),
      ],
      cautions: [
        L(
          '생략된 목적어를 it/them으로 다시 쓰지 않아요.',
          'Tushirilgan obyektni it/them bilan yana takrorlamang.',
          'Do not repeat the omitted object with it or them.',
          'Не повторяйте опущенное дополнение словами it или them.',
        ),
        L(
          '관계대명사가 주어이면 생략할 수 없어요: the woman who works here.',
          "Nisbiy olmosh ega bo'lsa, uni tushirib bo'lmaydi: the woman who works here.",
          'A subject relative pronoun cannot be omitted: the woman who works here.',
          'Относительное местоимение-подлежащее нельзя опустить: the woman who works here.',
        ),
      ],
      similar: {
        pattern: 'a person who ... / a thing that ...',
        note: L(
          'Unit 113은 관계대명사가 주어라서 반드시 표시하고, Unit 114는 목적어라서 생략할 수 있어요.',
          "113-unitda olmosh ega bo'lgani uchun majburiy, 114-unitda obyekt bo'lgani uchun tushishi mumkin.",
          'In Unit 113 the relative word is the subject and required; in Unit 114 it is the object and may be omitted.',
          'В Unit 113 относительное слово является подлежащим и обязательно, в Unit 114 — дополнением и может опускаться.',
        ),
      },
    },
  ],
};
