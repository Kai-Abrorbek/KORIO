import type { StorySeed } from '../../../stories/story-content.util';

/**
 * 영어 듣기 이야기 A1.
 *
 * 규칙: 주인공 한 명이 1인칭으로 말한다. 우즈베키스탄의 일상(마할라·바자르·
 * 플롭·나브루즈)에서 소재를 가져온다. 대사는 “ ”, 줄임은 ’ 로 쓴다 (화면용 —
 * 발음 평가에는 서버가 곧은 따옴표로 바꿔 넘긴다).
 * 핵심 단어(vocabulary.word)는 본문에 나온 그대로의 형태, 뜻은 기본형 기준.
 */
export const ENGLISH_STORIES_A1: StorySeed[] = [
  {
    code: 'en-story-a1-01',
    level: 'A1',
    order: 1,
    title: 'My Favourite Season',
    topic: {
      uz: 'Eng sevimli faslim',
      ru: 'Моё любимое время года',
      ko: '내가 가장 좋아하는 계절',
    },
    scene: 'autumn',
    narrator: { id: 'rustam', name: 'Rustam' },
    sentences: [
      {
        id: 's1',
        text: 'Hello, everyone.',
        translation: {
          uz: 'Hammaga salom.',
          ru: 'Всем привет.',
          ko: '여러분, 안녕하세요.',
        },
      },
      {
        id: 's2',
        text: 'My name is Rustam, and I am seventy years old.',
        translation: {
          uz: 'Mening ismim Rustam, men yetmish yoshdaman.',
          ru: 'Меня зовут Рустам, мне семьдесят лет.',
          ko: '제 이름은 루스탐이고, 일흔 살이에요.',
        },
      },
      {
        id: 's3',
        text: 'Today I want to tell you about my favourite season.',
        translation: {
          uz: 'Bugun sizga eng sevimli faslim haqida aytib bermoqchiman.',
          ru: 'Сегодня я хочу рассказать вам о моём любимом времени года.',
          ko: '오늘은 제가 가장 좋아하는 계절에 대해 이야기하고 싶어요.',
        },
      },
      {
        id: 's4',
        text: 'My favourite season is autumn.',
        translation: {
          uz: 'Mening eng sevimli faslim — kuz.',
          ru: 'Моё любимое время года — осень.',
          ko: '제가 가장 좋아하는 계절은 가을이에요.',
        },
      },
      {
        id: 's5',
        text: 'In autumn, the weather in Tashkent is cool and fresh.',
        translation: {
          uz: 'Kuzda Toshkentda havo salqin va toza bo‘ladi.',
          ru: 'Осенью в Ташкенте прохладно и свежо.',
          ko: '가을이 되면 타슈켄트의 날씨는 선선하고 상쾌해요.',
        },
      },
      {
        id: 's6',
        text: 'The leaves on the trees turn yellow, orange and red.',
        translation: {
          uz: 'Daraxtlardagi barglar sariq, to‘q sariq va qizil rangga kiradi.',
          ru: 'Листья на деревьях становятся жёлтыми, оранжевыми и красными.',
          ko: '나뭇잎이 노란색, 주황색, 빨간색으로 물들어요.',
        },
      },
      {
        id: 's7',
        text: 'Every morning, I walk in the park with my old dog, Bobik.',
        translation: {
          uz: 'Har kuni ertalab keksa itim Bobik bilan bog‘da sayr qilaman.',
          ru: 'Каждое утро я гуляю в парке со своей старой собакой Бобиком.',
          ko: '매일 아침 저는 늙은 강아지 보빅과 함께 공원을 산책해요.',
        },
      },
      {
        id: 's8',
        text: 'The dry leaves crunch under our feet.',
        translation: {
          uz: 'Quruq barglar oyog‘imiz ostida shitirlaydi.',
          ru: 'Сухие листья хрустят у нас под ногами.',
          ko: '마른 낙엽이 발밑에서 바스락거려요.',
        },
      },
      {
        id: 's9',
        text: 'Autumn is also the season of sweet grapes and big pomegranates.',
        translation: {
          uz: 'Kuz — shirin uzum va katta anorlar fasli ham.',
          ru: 'Осень — это ещё и время сладкого винограда и больших гранатов.',
          ko: '가을은 달콤한 포도와 큰 석류의 계절이기도 해요.',
        },
      },
      {
        id: 's10',
        text: 'What is your favourite season?',
        translation: {
          uz: 'Sizning eng sevimli faslingiz qaysi?',
          ru: 'А какое ваше любимое время года?',
          ko: '여러분이 가장 좋아하는 계절은 무엇인가요?',
        },
      },
    ],
    vocabulary: [
      {
        word: 'favourite',
        meaning: { uz: 'eng sevimli', ru: 'любимый', ko: '가장 좋아하는' },
      },
      {
        word: 'season',
        meaning: { uz: 'fasl', ru: 'время года', ko: '계절' },
      },
      { word: 'autumn', meaning: { uz: 'kuz', ru: 'осень', ko: '가을' } },
      {
        word: 'cool',
        meaning: { uz: 'salqin', ru: 'прохладный', ko: '선선한' },
      },
      {
        word: 'leaves',
        meaning: { uz: 'barglar', ru: 'листья', ko: '나뭇잎들' },
      },
      {
        word: 'crunch',
        meaning: { uz: 'shitirlamoq', ru: 'хрустеть', ko: '바스락거리다' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What is Rustam’s favourite season?',
        options: ['Spring', 'Summer', 'Autumn', 'Winter'],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'What is the weather like in autumn?',
        options: [
          'Hot and dry',
          'Cool and fresh',
          'Cold and snowy',
          'Wet and windy',
        ],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'Who walks with Rustam in the park?',
        options: ['His grandson', 'His wife', 'His old dog', 'His friend'],
        answerIndex: 2,
      },
    ],
  },
  {
    code: 'en-story-a1-02',
    level: 'A1',
    order: 2,
    title: 'My Family',
    topic: { uz: 'Mening oilam', ru: 'Моя семья', ko: '나의 가족' },
    scene: 'sunset',
    narrator: { id: 'malika', name: 'Malika' },
    sentences: [
      {
        id: 's1',
        text: 'Hi! I’m Malika, and I’m twenty years old.',
        translation: {
          uz: 'Salom! Men Malikaman, yigirma yoshdaman.',
          ru: 'Привет! Я Малика, мне двадцать лет.',
          ko: '안녕하세요! 저는 말리카이고, 스무 살이에요.',
        },
      },
      {
        id: 's2',
        text: 'I live in Samarkand with my big family.',
        translation: {
          uz: 'Men katta oilam bilan Samarqandda yashayman.',
          ru: 'Я живу в Самарканде со своей большой семьёй.',
          ko: '저는 대가족과 함께 사마르칸트에 살아요.',
        },
      },
      {
        id: 's3',
        text: 'My father is a doctor, and my mother is a teacher.',
        translation: {
          uz: 'Otam shifokor, onam esa o‘qituvchi.',
          ru: 'Мой папа — врач, а мама — учительница.',
          ko: '아버지는 의사이고, 어머니는 선생님이에요.',
        },
      },
      {
        id: 's4',
        text: 'I have two brothers and one little sister.',
        translation: {
          uz: 'Mening ikkita akam va bitta singlim bor.',
          ru: 'У меня два брата и одна младшая сестра.',
          ko: '저는 남자 형제 두 명과 여동생 한 명이 있어요.',
        },
      },
      {
        id: 's5',
        text: 'My grandmother lives with us too.',
        translation: {
          uz: 'Buvim ham biz bilan birga yashaydi.',
          ru: 'Бабушка тоже живёт с нами.',
          ko: '할머니도 우리와 함께 사세요.',
        },
      },
      {
        id: 's6',
        text: 'She makes the best bread in the world.',
        translation: {
          uz: 'U dunyodagi eng mazali nonni yopadi.',
          ru: 'Она печёт самый вкусный хлеб на свете.',
          ko: '할머니는 세상에서 제일 맛있는 빵을 구우세요.',
        },
      },
      {
        id: 's7',
        text: 'In the evening, we all sit together and drink green tea.',
        translation: {
          uz: 'Kechqurun hammamiz birga o‘tirib, ko‘k choy ichamiz.',
          ru: 'Вечером мы все сидим вместе и пьём зелёный чай.',
          ko: '저녁에는 다 같이 앉아서 녹차를 마셔요.',
        },
      },
      {
        id: 's8',
        text: 'My little sister tells funny stories, and everyone laughs.',
        translation: {
          uz: 'Singlim kulgili hikoyalar aytib beradi, hamma kuladi.',
          ru: 'Младшая сестра рассказывает смешные истории, и все смеются.',
          ko: '여동생이 재미있는 이야기를 하면 모두가 웃어요.',
        },
      },
      {
        id: 's9',
        text: 'Our house is small, but it is full of love.',
        translation: {
          uz: 'Uyimiz kichkina, lekin mehrga to‘la.',
          ru: 'Наш дом маленький, но в нём много любви.',
          ko: '우리 집은 작지만 사랑이 가득해요.',
        },
      },
    ],
    vocabulary: [
      { word: 'family', meaning: { uz: 'oila', ru: 'семья', ko: '가족' } },
      {
        word: 'grandmother',
        meaning: { uz: 'buvi', ru: 'бабушка', ko: '할머니' },
      },
      {
        word: 'together',
        meaning: { uz: 'birga', ru: 'вместе', ko: '함께' },
      },
      {
        word: 'funny',
        meaning: { uz: 'kulgili', ru: 'смешной', ko: '재미있는' },
      },
      {
        word: 'laughs',
        meaning: { uz: 'kulmoq', ru: 'смеяться', ko: '웃다' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Where does Malika live?',
        options: ['Tashkent', 'Bukhara', 'Samarkand', 'Khiva'],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'What does her mother do?',
        options: [
          'She is a doctor',
          'She is a teacher',
          'She is a cook',
          'She is a driver',
        ],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'What does the family drink in the evening?',
        options: ['Coffee', 'Milk', 'Juice', 'Green tea'],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-a1-03',
    level: 'A1',
    order: 3,
    title: 'My Morning',
    topic: { uz: 'Mening tongim', ru: 'Моё утро', ko: '나의 아침' },
    scene: 'morning',
    narrator: { id: 'jasur', name: 'Jasur' },
    sentences: [
      {
        id: 's1',
        text: 'My name is Jasur, and I am a student.',
        translation: {
          uz: 'Mening ismim Jasur, men talabaman.',
          ru: 'Меня зовут Жасур, я студент.',
          ko: '제 이름은 자수르이고, 대학생이에요.',
        },
      },
      {
        id: 's2',
        text: 'Every day, I wake up at seven o’clock.',
        translation: {
          uz: 'Har kuni soat yettida uyg‘onaman.',
          ru: 'Каждый день я просыпаюсь в семь часов.',
          ko: '저는 매일 일곱 시에 일어나요.',
        },
      },
      {
        id: 's3',
        text: 'First, I open the window and look at the sky.',
        translation: {
          uz: 'Avval derazani ochib, osmonga qarayman.',
          ru: 'Сначала я открываю окно и смотрю на небо.',
          ko: '먼저 창문을 열고 하늘을 봐요.',
        },
      },
      {
        id: 's4',
        text: 'Then I wash my face and brush my teeth.',
        translation: {
          uz: 'Keyin yuzimni yuvib, tishlarimni tozalayman.',
          ru: 'Потом я умываюсь и чищу зубы.',
          ko: '그다음 세수하고 이를 닦아요.',
        },
      },
      {
        id: 's5',
        text: 'For breakfast, I eat bread, eggs and a little honey.',
        translation: {
          uz: 'Nonushtaga non, tuxum va ozgina asal yeyman.',
          ru: 'На завтрак я ем хлеб, яйца и немного мёда.',
          ko: '아침으로 빵과 달걀, 그리고 꿀을 조금 먹어요.',
        },
      },
      {
        id: 's6',
        text: 'My mother always says, “Eat more, Jasur!”',
        translation: {
          uz: 'Onam doim: «Ko‘proq ye, Jasur!» — deydi.',
          ru: 'Мама всегда говорит: «Ешь больше, Жасур!»',
          ko: '어머니는 항상 “더 먹어, 자수르!”라고 말씀하세요.',
        },
      },
      {
        id: 's7',
        text: 'At eight o’clock, I take the bus to university.',
        translation: {
          uz: 'Soat sakkizda universitetga avtobusda boraman.',
          ru: 'В восемь часов я еду в университет на автобусе.',
          ko: '여덟 시에 버스를 타고 대학교에 가요.',
        },
      },
      {
        id: 's8',
        text: 'On the bus, I listen to English stories.',
        translation: {
          uz: 'Avtobusda inglizcha hikoyalarni tinglayman.',
          ru: 'В автобусе я слушаю истории на английском.',
          ko: '버스에서는 영어 이야기를 들어요.',
        },
      },
      {
        id: 's9',
        text: 'It is my favourite part of the morning.',
        translation: {
          uz: 'Bu tongning men eng yaxshi ko‘radigan qismi.',
          ru: 'Это моя любимая часть утра.',
          ko: '아침에서 제가 가장 좋아하는 시간이에요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'window',
        meaning: { uz: 'deraza', ru: 'окно', ko: '창문' },
      },
      {
        word: 'breakfast',
        meaning: { uz: 'nonushta', ru: 'завтрак', ko: '아침 식사' },
      },
      { word: 'honey', meaning: { uz: 'asal', ru: 'мёд', ko: '꿀' } },
      {
        word: 'always',
        meaning: { uz: 'doim', ru: 'всегда', ko: '항상' },
      },
      {
        word: 'university',
        meaning: { uz: 'universitet', ru: 'университет', ko: '대학교' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What time does Jasur wake up?',
        options: ['At six', 'At seven', 'At eight', 'At nine'],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What does he eat for breakfast?',
        options: [
          'Rice and meat',
          'Bread, eggs and honey',
          'Soup',
          'Only fruit',
        ],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'What does he do on the bus?',
        options: [
          'He sleeps',
          'He reads a book',
          'He listens to English stories',
          'He talks to his friends',
        ],
        answerIndex: 2,
      },
    ],
  },
  {
    code: 'en-story-a1-04',
    level: 'A1',
    order: 4,
    title: 'At the Bazaar',
    topic: { uz: 'Bozorda', ru: 'На базаре', ko: '시장에서' },
    scene: 'bazaar',
    narrator: { id: 'dilnoza', name: 'Dilnoza' },
    sentences: [
      {
        id: 's1',
        text: 'On Sundays, I go to the bazaar with my son.',
        translation: {
          uz: 'Yakshanba kunlari o‘g‘lim bilan bozorga boraman.',
          ru: 'По воскресеньям я хожу на базар с сыном.',
          ko: '일요일마다 저는 아들과 함께 시장에 가요.',
        },
      },
      {
        id: 's2',
        text: 'The bazaar is big, busy and very colourful.',
        translation: {
          uz: 'Bozor katta, gavjum va juda rang-barang.',
          ru: 'Базар большой, шумный и очень яркий.',
          ko: '시장은 크고 붐비고 정말 알록달록해요.',
        },
      },
      {
        id: 's3',
        text: 'There are red tomatoes, green cucumbers and yellow melons.',
        translation: {
          uz: 'U yerda qizil pomidorlar, yashil bodringlar va sariq qovunlar bor.',
          ru: 'Там есть красные помидоры, зелёные огурцы и жёлтые дыни.',
          ko: '빨간 토마토, 초록 오이, 노란 멜론이 있어요.',
        },
      },
      {
        id: 's4',
        text: 'I ask the seller, “How much are these apples?”',
        translation: {
          uz: 'Sotuvchidan: «Bu olmalar qancha turadi?» — deb so‘rayman.',
          ru: 'Я спрашиваю продавца: «Сколько стоят эти яблоки?»',
          ko: '저는 상인에게 “이 사과는 얼마예요?”라고 물어봐요.',
        },
      },
      {
        id: 's5',
        text: 'He smiles and says, “Fifteen thousand som a kilo.”',
        translation: {
          uz: 'U jilmayib: «Kilosi o‘n besh ming so‘m», — deydi.',
          ru: 'Он улыбается и говорит: «Пятнадцать тысяч сумов за килограмм».',
          ko: '상인은 웃으며 “1킬로에 1만 5천 숨이에요”라고 해요.',
        },
      },
      {
        id: 's6',
        text: 'I say, “That is too expensive! Ten thousand?”',
        translation: {
          uz: 'Men: «Juda qimmat-ku! O‘n ming bo‘lmaydimi?» — deyman.',
          ru: 'Я говорю: «Слишком дорого! Может, десять тысяч?»',
          ko: '저는 “너무 비싸요! 1만 숨 어때요?”라고 해요.',
        },
      },
      {
        id: 's7',
        text: 'We laugh, and in the end, we agree on twelve thousand.',
        translation: {
          uz: 'Ikkalamiz kulamiz va oxiri o‘n ikki mingga kelishamiz.',
          ru: 'Мы смеёмся и в итоге сходимся на двенадцати тысячах.',
          ko: '우리는 웃고, 결국 1만 2천 숨으로 합의해요.',
        },
      },
      {
        id: 's8',
        text: 'My son carries the bag, and I buy him a hot samsa.',
        translation: {
          uz: 'O‘g‘lim sumkani ko‘taradi, men esa unga issiq somsa olib beraman.',
          ru: 'Сын несёт сумку, а я покупаю ему горячую самсу.',
          ko: '아들이 가방을 들고, 저는 아들에게 따끈한 삼사를 사 줘요.',
        },
      },
      {
        id: 's9',
        text: 'The bazaar is my favourite place in the city.',
        translation: {
          uz: 'Bozor — shahardagi eng sevimli joyim.',
          ru: 'Базар — моё любимое место в городе.',
          ko: '시장은 도시에서 제가 가장 좋아하는 곳이에요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'colourful',
        meaning: {
          uz: 'rang-barang',
          ru: 'яркий, красочный',
          ko: '알록달록한',
        },
      },
      {
        word: 'seller',
        meaning: { uz: 'sotuvchi', ru: 'продавец', ko: '상인' },
      },
      {
        word: 'expensive',
        meaning: { uz: 'qimmat', ru: 'дорогой', ko: '비싼' },
      },
      {
        word: 'agree',
        meaning: { uz: 'kelishmoq', ru: 'договориться', ko: '합의하다' },
      },
      {
        word: 'carries',
        meaning: { uz: 'ko‘tarmoq, olib yurmoq', ru: 'нести', ko: '들고 가다' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'When does she go to the bazaar?',
        options: ['On Mondays', 'On Fridays', 'On Sundays', 'Every day'],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'What price do they agree on?',
        options: [
          'Ten thousand som',
          'Twelve thousand som',
          'Fifteen thousand som',
          'Twenty thousand som',
        ],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'What does she buy for her son?',
        options: ['An apple', 'A melon', 'A hot samsa', 'An ice cream'],
        answerIndex: 2,
      },
    ],
  },
];
