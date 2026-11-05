import type { StorySeed } from '../../../../stories/story-content.util';

/**
 * 영어 듣기 이야기 A1.
 *
 * 규칙: 주인공 한 명이 1인칭으로 말한다. 우즈베키스탄의 일상(마할라·바자르·
 * 플롭·나브루즈)에서 소재를 가져온다. 대사는 “ ”, 줄임은 ’ 로 쓴다 (화면용 —
 * 발음 평가에는 서버가 곧은 따옴표로 바꿔 넘긴다).
 * 핵심 단어(vocabulary.word)는 본문에 나온 그대로의 형태, 뜻은 기본형 기준.
 */
export const EN_GENERAL_A1: StorySeed[] = [
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
  {
    code: 'en-story-a1-05',
    level: 'A1',
    order: 5,
    title: 'Bread from the Tandir',
    topic: {
      uz: 'Tandirdan issiq non',
      ru: 'Хлеб из тандыра',
      ko: '탄디르에서 산 빵',
    },
    scene: 'morning',
    narrator: { id: 'aziz', name: 'Aziz' },
    sentences: [
      {
        id: 's1',
        text: 'My name is Aziz, and I work at a bank.',
        translation: {
          uz: 'Mening ismim Aziz, men bankda ishlayman.',
          ru: 'Меня зовут Азиз, я работаю в банке.',
          ko: '제 이름은 아지즈이고, 은행에서 일해요.',
        },
      },
      {
        id: 's2',
        text: 'Every morning, I buy bread before work.',
        translation: {
          uz: 'Har kuni ertalab ishga ketishdan oldin non olaman.',
          ru: 'Каждое утро перед работой я покупаю хлеб.',
          ko: '매일 아침 출근하기 전에 빵을 사요.',
        },
      },
      {
        id: 's3',
        text: 'There is a small tandir near my house.',
        translation: {
          uz: 'Uyim yaqinida kichkina tandir bor.',
          ru: 'Рядом с моим домом есть маленький тандыр.',
          ko: '우리 집 근처에 작은 탄디르 화덕이 있어요.',
        },
      },
      {
        id: 's4',
        text: 'The baker has strong arms and a kind smile.',
        translation: {
          uz: 'Novvoyning qo‘llari baquvvat, tabassumi esa mehribon.',
          ru: 'У пекаря сильные руки и добрая улыбка.',
          ko: '빵 굽는 아저씨는 팔이 튼튼하고 미소가 따뜻해요.',
        },
      },
      {
        id: 's5',
        text: 'He takes the hot bread out of the tandir.',
        translation: {
          uz: 'U tandirdan issiq nonlarni uzib oladi.',
          ru: 'Он достаёт горячий хлеб из тандыра.',
          ko: '아저씨가 탄디르에서 뜨거운 빵을 꺼내요.',
        },
      },
      {
        id: 's6',
        text: 'The bread is round and soft, and it smells wonderful.',
        translation: {
          uz: 'Non dumaloq va yumshoq, hidi esa juda yoqimli.',
          ru: 'Хлеб круглый и мягкий, и пахнет просто чудесно.',
          ko: '빵은 둥글고 부드럽고, 냄새가 정말 좋아요.',
        },
      },
      {
        id: 's7',
        text: 'He sees me and says, “Two, as always, Aziz?”',
        translation: {
          uz: 'U meni ko‘rib: «Odatdagidek ikkitami, Aziz?» — deydi.',
          ru: 'Он видит меня и говорит: «Как всегда, две, Азиз?»',
          ko: '아저씨는 저를 보고 “늘 그렇듯 두 개지, 아지즈?”라고 해요.',
        },
      },
      {
        id: 's8',
        text: 'I pay eight thousand som and say, “Rahmat!”',
        translation: {
          uz: 'Sakkiz ming so‘m to‘layman va «Rahmat!» deyman.',
          ru: 'Я плачу восемь тысяч сумов и говорю: «Рахмат!»',
          ko: '저는 8천 숨을 내고 “라흐마트!(고마워요)”라고 말해요.',
        },
      },
      {
        id: 's9',
        text: 'On the way home, I always eat a small piece.',
        translation: {
          uz: 'Uyga qaytayotib, doim kichkina bir bo‘lagini yeb qo‘yaman.',
          ru: 'По дороге домой я всегда съедаю маленький кусочек.',
          ko: '집에 가는 길에 저는 늘 작은 조각을 떼어 먹어요.',
        },
      },
      {
        id: 's10',
        text: 'Warm bread is the best start to my day.',
        translation: {
          uz: 'Issiq non — kunimning eng yaxshi boshlanishi.',
          ru: 'Тёплый хлеб — лучшее начало моего дня.',
          ko: '따끈한 빵은 하루를 여는 최고의 시작이에요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'baker',
        meaning: { uz: 'novvoy', ru: 'пекарь', ko: '제빵사' },
      },
      {
        word: 'strong',
        meaning: { uz: 'kuchli, baquvvat', ru: 'сильный', ko: '힘센, 튼튼한' },
      },
      {
        word: 'round',
        meaning: { uz: 'dumaloq', ru: 'круглый', ko: '둥근' },
      },
      {
        word: 'wonderful',
        meaning: { uz: 'ajoyib', ru: 'чудесный', ko: '아주 멋진, 훌륭한' },
      },
      {
        word: 'piece',
        meaning: { uz: 'bo‘lak', ru: 'кусок', ko: '조각' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Where does Aziz buy bread?',
        options: [
          'At a big shop',
          'At the bazaar',
          'At the bank',
          'At a small tandir',
        ],
        answerIndex: 3,
      },
      {
        id: 'q2',
        prompt: 'How much does he pay?',
        options: [
          'Eight thousand som',
          'Four thousand som',
          'Ten thousand som',
          'Twelve thousand som',
        ],
        answerIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'What does he do on the way home?',
        options: [
          'He drinks tea',
          'He calls his uncle',
          'He eats a small piece',
          'He reads the news',
        ],
        answerIndex: 2,
      },
    ],
  },
  {
    code: 'en-story-a1-06',
    level: 'A1',
    order: 6,
    title: 'My Small Room',
    topic: {
      uz: 'Mening kichkina xonam',
      ru: 'Моя маленькая комната',
      ko: '나의 작은 방',
    },
    scene: 'night',
    narrator: { id: 'jasur', name: 'Jasur' },
    sentences: [
      {
        id: 's1',
        text: 'This is my room, and it is very small.',
        translation: {
          uz: 'Bu mening xonam, u juda kichkina.',
          ru: 'Это моя комната, и она очень маленькая.',
          ko: '여기는 제 방이에요. 아주 작아요.',
        },
      },
      {
        id: 's2',
        text: 'There is a bed, a desk and a chair.',
        translation: {
          uz: 'Xonada karavot, stol va stul bor.',
          ru: 'Здесь есть кровать, письменный стол и стул.',
          ko: '침대 하나, 책상 하나, 의자 하나가 있어요.',
        },
      },
      {
        id: 's3',
        text: 'My desk is next to the window.',
        translation: {
          uz: 'Stolim deraza yonida turadi.',
          ru: 'Мой стол стоит у окна.',
          ko: '책상은 창문 옆에 있어요.',
        },
      },
      {
        id: 's4',
        text: 'At night, I study there and drink tea.',
        translation: {
          uz: 'Kechasi o‘sha yerda dars qilaman va choy ichaman.',
          ru: 'По ночам я сижу там за учёбой и пью чай.',
          ko: '밤에는 거기서 공부하면서 차를 마셔요.',
        },
      },
      {
        id: 's5',
        text: 'There is a big world map on the wall.',
        translation: {
          uz: 'Devorda katta dunyo xaritasi osig‘liq turibdi.',
          ru: 'На стене висит большая карта мира.',
          ko: '벽에는 커다란 세계 지도가 걸려 있어요.',
        },
      },
      {
        id: 's6',
        text: 'Red pins show the cities I want to visit.',
        translation: {
          uz: 'Qizil to‘g‘nog‘ichlar men bormoqchi bo‘lgan shaharlarni ko‘rsatadi.',
          ru: 'Красные булавки отмечают города, где я хочу побывать.',
          ko: '빨간 핀은 제가 가 보고 싶은 도시들을 표시해요.',
        },
      },
      {
        id: 's7',
        text: 'London, Seoul and Istanbul all have red pins.',
        translation: {
          uz: 'London, Seul va Istanbulda qizil to‘g‘nog‘ich bor.',
          ru: 'Лондон, Сеул и Стамбул — все отмечены красными булавками.',
          ko: '런던, 서울, 이스탄불에 모두 빨간 핀이 꽂혀 있어요.',
        },
      },
      {
        id: 's8',
        text: 'My mother says, “The map is bigger than your room!”',
        translation: {
          uz: 'Onam: «Xaritang xonangdan kattaroq-ku!» — deydi.',
          ru: 'Мама говорит: «Карта больше, чем твоя комната!»',
          ko: '어머니는 “지도가 네 방보다 더 크구나!”라고 하세요.',
        },
      },
      {
        id: 's9',
        text: 'She is right, and we both laugh.',
        translation: {
          uz: 'U haq, ikkalamiz ham kulib yuboramiz.',
          ru: 'Она права, и мы оба смеёмся.',
          ko: '맞는 말이라서 우리 둘 다 웃어요.',
        },
      },
      {
        id: 's10',
        text: 'My room is small, but my dreams are big.',
        translation: {
          uz: 'Xonam kichkina, lekin orzularim katta.',
          ru: 'Комната у меня маленькая, но мечты большие.',
          ko: '제 방은 작지만, 제 꿈은 커요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'desk',
        meaning: { uz: 'yozuv stoli', ru: 'письменный стол', ko: '책상' },
      },
      { word: 'wall', meaning: { uz: 'devor', ru: 'стена', ko: '벽' } },
      { word: 'map', meaning: { uz: 'xarita', ru: 'карта', ko: '지도' } },
      {
        word: 'cities',
        meaning: { uz: 'shahar', ru: 'город', ko: '도시' },
      },
      { word: 'dreams', meaning: { uz: 'orzu', ru: 'мечта', ko: '꿈' } },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Where is Jasur’s desk?',
        options: [
          'Next to the door',
          'In the kitchen',
          'Under the bed',
          'Next to the window',
        ],
        answerIndex: 3,
      },
      {
        id: 'q2',
        prompt: 'What is on the wall?',
        options: [
          'A big world map',
          'A photo of his family',
          'A big clock',
          'A calendar',
        ],
        answerIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'What do the red pins show?',
        options: [
          'His friends’ homes',
          'Cities he wants to visit',
          'Bus stops in Tashkent',
          'Places he lived before',
        ],
        answerIndex: 1,
      },
    ],
  },
  {
    code: 'en-story-a1-07',
    level: 'A1',
    order: 7,
    title: 'My Cat',
    topic: { uz: 'Mening mushugim', ru: 'Моя кошка', ko: '우리 고양이' },
    scene: 'sunset',
    narrator: { id: 'dilnoza', name: 'Dilnoza' },
    sentences: [
      {
        id: 's1',
        text: 'We have a white cat, and her name is Paxta.',
        translation: {
          uz: 'Bizning oppoq mushugimiz bor, uning ismi Paxta.',
          ru: 'У нас есть белая кошка, её зовут Пахта.',
          ko: '우리 집에는 하얀 고양이가 있는데, 이름이 파흐타예요.',
        },
      },
      {
        id: 's2',
        text: 'In Uzbek, paxta means cotton.',
        translation: {
          uz: 'O‘zbekchadagi «paxta» so‘zi inglizchada «cotton» bo‘ladi.',
          ru: 'По-узбекски «пахта» значит «хлопок».',
          ko: '우즈베크어로 ‘파흐타’는 목화라는 뜻이에요.',
        },
      },
      {
        id: 's3',
        text: 'She is soft and white, just like cotton.',
        translation: {
          uz: 'U xuddi paxtadek yumshoq va oppoq.',
          ru: 'Она мягкая и белая, прямо как хлопок.',
          ko: '고양이는 꼭 솜처럼 부드럽고 하얘요.',
        },
      },
      {
        id: 's4',
        text: 'My son loves her very much.',
        translation: {
          uz: 'O‘g‘lim uni juda yaxshi ko‘radi.',
          ru: 'Мой сын её очень любит.',
          ko: '아들은 고양이를 아주 좋아해요.',
        },
      },
      {
        id: 's5',
        text: 'He gives her milk and talks to her.',
        translation: {
          uz: 'U mushukka sut beradi va u bilan gaplashadi.',
          ru: 'Он даёт ей молоко и разговаривает с ней.',
          ko: '아들은 고양이에게 우유를 주고 말도 걸어요.',
        },
      },
      {
        id: 's6',
        text: 'During the day, Paxta sleeps in the sun.',
        translation: {
          uz: 'Kunduzi Paxta quyoshda uxlaydi.',
          ru: 'Днём Пахта спит на солнышке.',
          ko: '낮에는 파흐타가 햇볕 아래에서 자요.',
        },
      },
      {
        id: 's7',
        text: 'I work at a pharmacy until six o’clock.',
        translation: {
          uz: 'Men dorixonada soat oltigacha ishlayman.',
          ru: 'Я работаю в аптеке до шести часов.',
          ko: '저는 여섯 시까지 약국에서 일해요.',
        },
      },
      {
        id: 's8',
        text: 'When I come home, she waits at the door.',
        translation: {
          uz: 'Uyga kelsam, u eshik oldida kutib turadi.',
          ru: 'Когда я прихожу домой, она ждёт у двери.',
          ko: '제가 집에 오면 고양이가 문 앞에서 기다려요.',
        },
      },
      {
        id: 's9',
        text: 'She can’t talk, but her eyes say, “Welcome home!”',
        translation: {
          uz: 'U gapira olmaydi, lekin ko‘zlari «Xush kelibsan!» deb turadi.',
          ru: 'Она не умеет говорить, но её глаза говорят: «С возвращением!»',
          ko: '말은 못 하지만, 눈빛이 “어서 와요!”라고 말해요.',
        },
      },
      {
        id: 's10',
        text: 'She is a small cat with a big heart.',
        translation: {
          uz: 'U — katta yurakli kichkina mushuk.',
          ru: 'Это маленькая кошка с большим сердцем.',
          ko: '작은 고양이지만 마음은 정말 커요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'cotton',
        meaning: { uz: 'paxta', ru: 'хлопок', ko: '목화, 솜' },
      },
      {
        word: 'soft',
        meaning: { uz: 'yumshoq', ru: 'мягкий', ko: '부드러운' },
      },
      {
        word: 'sleeps',
        meaning: { uz: 'uxlamoq', ru: 'спать', ko: '자다' },
      },
      {
        word: 'pharmacy',
        meaning: { uz: 'dorixona', ru: 'аптека', ko: '약국' },
      },
      {
        word: 'waits',
        meaning: { uz: 'kutmoq', ru: 'ждать', ko: '기다리다' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What does “paxta” mean?',
        options: ['Snow', 'Milk', 'Cotton', 'Cloud'],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'Where does Dilnoza work?',
        options: ['At a school', 'At a bank', 'At a bazaar', 'At a pharmacy'],
        answerIndex: 3,
      },
      {
        id: 'q3',
        prompt: 'What does Paxta do when Dilnoza comes home?',
        options: [
          'She waits at the door',
          'She sleeps in the sun',
          'She drinks milk',
          'She runs away',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-a1-08',
    level: 'A1',
    order: 8,
    title: 'Today’s Weather',
    topic: { uz: 'Bugungi ob-havo', ru: 'Погода сегодня', ko: '오늘의 날씨' },
    scene: 'snow',
    narrator: { id: 'rustam', name: 'Rustam' },
    sentences: [
      {
        id: 's1',
        text: 'Today I wake up, and everything is white.',
        translation: {
          uz: 'Bugun uyg‘onsam, hamma yoq oppoq.',
          ru: 'Сегодня я просыпаюсь, а всё вокруг белое.',
          ko: '오늘 아침에 일어나니 온 세상이 하얘요.',
        },
      },
      {
        id: 's2',
        text: 'It is snowing in Tashkent!',
        translation: {
          uz: 'Toshkentga qor yog‘yapti!',
          ru: 'В Ташкенте идёт снег!',
          ko: '타슈켄트에 눈이 와요!',
        },
      },
      {
        id: 's3',
        text: 'We don’t often see snow here.',
        translation: {
          uz: 'Bu yerda qorni tez-tez ko‘ravermaymiz.',
          ru: 'Мы здесь нечасто видим снег.',
          ko: '여기서는 눈을 자주 보지 못해요.',
        },
      },
      {
        id: 's4',
        text: 'It is cold, about minus three degrees.',
        translation: {
          uz: 'Havo sovuq, taxminan minus uch daraja.',
          ru: 'Холодно, около минус трёх градусов.',
          ko: '날씨가 추워요. 영하 3도쯤이에요.',
        },
      },
      {
        id: 's5',
        text: 'I put on my warm hat and my old coat.',
        translation: {
          uz: 'Issiq telpagim va eski paltomni kiyaman.',
          ru: 'Я надеваю тёплую шапку и старое пальто.',
          ko: '따뜻한 모자를 쓰고 낡은 외투를 입어요.',
        },
      },
      {
        id: 's6',
        text: 'My dog, Bobik, runs in the snow like a puppy.',
        translation: {
          uz: 'Itim Bobik qorda xuddi kuchukchadek chopib yuradi.',
          ru: 'Мой пёс Бобик бегает по снегу, как щенок.',
          ko: '우리 개 보빅은 강아지처럼 눈밭을 뛰어다녀요.',
        },
      },
      {
        id: 's7',
        text: 'In the evening, my granddaughter calls from Canada.',
        translation: {
          uz: 'Kechqurun Kanadadan nevaram qo‘ng‘iroq qiladi.',
          ru: 'Вечером мне звонит внучка из Канады.',
          ko: '저녁에 캐나다에 있는 손녀가 전화를 해요.',
        },
      },
      {
        id: 's8',
        text: 'I say, “Look, we have snow too!”',
        translation: {
          uz: 'Men: «Qara, bizda ham qor bor!» — deyman.',
          ru: 'Я говорю: «Смотри, у нас тоже снег!»',
          ko: '저는 “봐라, 여기도 눈이 왔단다!”라고 말해요.',
        },
      },
      {
        id: 's9',
        text: 'She laughs and says, “Here it is minus twenty, Grandpa!”',
        translation: {
          uz: 'U kulib: «Bu yerda minus yigirma, bobojon!» — deydi.',
          ru: 'Она смеётся и говорит: «А у нас минус двадцать, дедушка!»',
          ko: '손녀는 웃으며 “여긴 영하 20도예요, 할아버지!”라고 해요.',
        },
      },
      {
        id: 's10',
        text: 'The weather is different, but our hearts are close.',
        translation: {
          uz: 'Ob-havo har xil, lekin qalblarimiz yaqin.',
          ru: 'Погода у нас разная, но сердцем мы рядом.',
          ko: '날씨는 달라도 우리 마음은 가까워요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'snowing',
        meaning: { uz: 'qor yog‘moq', ru: 'идти (о снеге)', ko: '눈이 오다' },
      },
      {
        word: 'cold',
        meaning: { uz: 'sovuq', ru: 'холодный', ko: '추운' },
      },
      { word: 'coat', meaning: { uz: 'palto', ru: 'пальто', ko: '외투' } },
      {
        word: 'puppy',
        meaning: { uz: 'kuchukcha', ru: 'щенок', ko: '강아지' },
      },
      {
        word: 'different',
        meaning: { uz: 'har xil, boshqacha', ru: 'разный', ko: '다른' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What is the weather like in Tashkent today?',
        options: [
          'Hot and sunny',
          'Rainy and windy',
          'Warm and cloudy',
          'Cold and snowy',
        ],
        answerIndex: 3,
      },
      {
        id: 'q2',
        prompt: 'Who calls Rustam in the evening?',
        options: [
          'His granddaughter',
          'His neighbour',
          'His old friend',
          'His doctor',
        ],
        answerIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'How cold is it in Canada?',
        options: ['Minus three', 'Minus ten', 'Minus twenty', 'Minus thirty'],
        answerIndex: 2,
      },
    ],
  },
  {
    code: 'en-story-a1-09',
    level: 'A1',
    order: 9,
    title: 'My Birthday',
    topic: {
      uz: 'Mening tug‘ilgan kunim',
      ru: 'Мой день рождения',
      ko: '나의 생일',
    },
    scene: 'spring',
    narrator: { id: 'malika', name: 'Malika' },
    sentences: [
      {
        id: 's1',
        text: 'Today is my birthday, and I am twenty.',
        translation: {
          uz: 'Bugun mening tug‘ilgan kunim, men yigirma yoshga to‘ldim.',
          ru: 'Сегодня мой день рождения, мне исполнилось двадцать.',
          ko: '오늘은 제 생일이고, 저는 스무 살이 됐어요.',
        },
      },
      {
        id: 's2',
        text: 'In the morning, my little sister wakes me up.',
        translation: {
          uz: 'Ertalab singlim meni uyg‘otadi.',
          ru: 'Утром меня будит младшая сестрёнка.',
          ko: '아침에 여동생이 저를 깨워요.',
        },
      },
      {
        id: 's3',
        text: 'She gives me a picture of our family.',
        translation: {
          uz: 'U menga oilamiz chizilgan rasmni beradi.',
          ru: 'Она дарит мне рисунок нашей семьи.',
          ko: '여동생은 우리 가족을 그린 그림을 줘요.',
        },
      },
      {
        id: 's4',
        text: 'In the picture, everyone is smiling and holding hands.',
        translation: {
          uz: 'Rasmda hamma jilmayib, qo‘l ushlashib turibdi.',
          ru: 'На рисунке все улыбаются и держатся за руки.',
          ko: '그림 속에서 모두가 웃으며 손을 잡고 있어요.',
        },
      },
      {
        id: 's5',
        text: 'My mother bakes a big honey cake.',
        translation: {
          uz: 'Onam katta asalli tort pishiradi.',
          ru: 'Мама печёт большой медовый торт.',
          ko: '어머니는 커다란 꿀 케이크를 구우세요.',
        },
      },
      {
        id: 's6',
        text: 'My brothers buy me a new blue scarf.',
        translation: {
          uz: 'Akalarim menga yangi ko‘k ro‘mol olib berishadi.',
          ru: 'Братья покупают мне новый голубой платок.',
          ko: '오빠들은 새 파란 스카프를 사 줘요.',
        },
      },
      {
        id: 's7',
        text: 'My father comes home late from the hospital.',
        translation: {
          uz: 'Otam kasalxonadan uyga kech qaytadi.',
          ru: 'Папа поздно возвращается домой из больницы.',
          ko: '아버지는 병원에서 늦게 퇴근하세요.',
        },
      },
      {
        id: 's8',
        text: 'But he has a bunch of red tulips for me.',
        translation: {
          uz: 'Lekin u menga bir dasta qizil lola olib keladi.',
          ru: 'Но он приносит мне букет красных тюльпанов.',
          ko: '그래도 저를 위해 빨간 튤립 한 다발을 들고 오세요.',
        },
      },
      {
        id: 's9',
        text: 'Then my grandmother puts her hand on my head.',
        translation: {
          uz: 'Keyin buvim qo‘lini boshimga qo‘yadi.',
          ru: 'Потом бабушка кладёт руку мне на голову.',
          ko: '그러고 나서 할머니가 제 머리에 손을 얹으세요.',
        },
      },
      {
        id: 's10',
        text: 'She says, “Be happy, my girl,” and I am.',
        translation: {
          uz: 'U: «Baxtli bo‘l, qizim», — deydi. Men chindan ham baxtliman.',
          ru: 'Она говорит: «Будь счастлива, доченька», — и я счастлива.',
          ko: '할머니가 “행복하거라, 우리 아가”라고 하시는데, 저는 정말 행복해요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'birthday',
        meaning: { uz: 'tug‘ilgan kun', ru: 'день рождения', ko: '생일' },
      },
      {
        word: 'wakes',
        meaning: { uz: 'uyg‘otmoq', ru: 'будить', ko: '깨우다' },
      },
      {
        word: 'picture',
        meaning: { uz: 'rasm', ru: 'рисунок, картинка', ko: '그림' },
      },
      {
        word: 'bakes',
        meaning: { uz: 'pishirmoq (pechda)', ru: 'печь', ko: '굽다' },
      },
      { word: 'tulips', meaning: { uz: 'lola', ru: 'тюльпан', ko: '튤립' } },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'How old is Malika today?',
        options: ['Eighteen', 'Nineteen', 'Twenty', 'Twenty-one'],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'What does her little sister give her?',
        options: [
          'A blue scarf',
          'Red tulips',
          'A honey cake',
          'A picture of the family',
        ],
        answerIndex: 3,
      },
      {
        id: 'q3',
        prompt: 'What does her father bring?',
        options: ['Red tulips', 'A new phone', 'A cake', 'A book'],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-a1-10',
    level: 'A1',
    order: 10,
    title: 'My Favourite Food',
    topic: {
      uz: 'Eng sevimli taomim',
      ru: 'Моя любимая еда',
      ko: '내가 가장 좋아하는 음식',
    },
    scene: 'autumn',
    narrator: { id: 'aziz', name: 'Aziz' },
    sentences: [
      {
        id: 's1',
        text: 'I can cook plov, but it is not my favourite.',
        translation: {
          uz: 'Men osh damlashni bilaman, lekin u eng sevimli taomim emas.',
          ru: 'Я умею готовить плов, но это не моё любимое блюдо.',
          ko: '저는 플롭을 만들 줄 알지만, 제가 제일 좋아하는 음식은 아니에요.',
        },
      },
      {
        id: 's2',
        text: 'My favourite food is my mother’s manti.',
        translation: {
          uz: 'Eng sevimli taomim — onamning mantisi.',
          ru: 'Моё любимое блюдо — мамины манты.',
          ko: '제가 제일 좋아하는 음식은 어머니가 만드신 만티예요.',
        },
      },
      {
        id: 's3',
        text: 'Manti are big dumplings with meat and onion.',
        translation: {
          uz: 'Manti — ichiga go‘sht va piyoz solingan katta-katta chuchvaralar.',
          ru: 'Манты — это большие пельмени с мясом и луком.',
          ko: '만티는 고기와 양파를 넣은 큰 만두예요.',
        },
      },
      {
        id: 's4',
        text: 'In autumn, she also makes them with pumpkin.',
        translation: {
          uz: 'Kuzda onam uni qovoq bilan ham qiladi.',
          ru: 'Осенью мама делает их ещё и с тыквой.',
          ko: '가을에는 호박을 넣어서도 만드세요.',
        },
      },
      {
        id: 's5',
        text: 'Every Sunday, I visit my parents for lunch.',
        translation: {
          uz: 'Har yakshanba tushlikka ota-onamnikiga boraman.',
          ru: 'Каждое воскресенье я приезжаю к родителям на обед.',
          ko: '일요일마다 점심을 먹으러 부모님 댁에 가요.',
        },
      },
      {
        id: 's6',
        text: 'When I open the door, I can smell the manti.',
        translation: {
          uz: 'Eshikni ochishim bilan mantining hidi keladi.',
          ru: 'Как только я открываю дверь, я чувствую запах мантов.',
          ko: '문을 열면 만티 냄새가 나요.',
        },
      },
      {
        id: 's7',
        text: 'We eat them hot, with cold yogurt on top.',
        translation: {
          uz: 'Biz uni issiqligicha, ustiga sovuq qatiq solib yeymiz.',
          ru: 'Мы едим их горячими, с холодным катыком сверху.',
          ko: '우리는 만티를 뜨거울 때 차가운 요구르트를 얹어 먹어요.',
        },
      },
      {
        id: 's8',
        text: 'I always eat too many, maybe eight or nine.',
        translation: {
          uz: 'Men doim ko‘p yeb qo‘yaman, sakkiz-to‘qqiztacha.',
          ru: 'Я всегда съедаю слишком много — штук восемь или девять.',
          ko: '저는 늘 너무 많이 먹어요. 여덟아홉 개쯤이요.',
        },
      },
      {
        id: 's9',
        text: 'My mother says, “Take some home for tomorrow.”',
        translation: {
          uz: 'Onam: «Ertagaga ham uyingga olib ket», — deydi.',
          ru: 'Мама говорит: «Возьми немного домой на завтра».',
          ko: '어머니는 “내일 먹게 좀 싸 가렴”이라고 하세요.',
        },
      },
      {
        id: 's10',
        text: 'Her manti taste like home to me.',
        translation: {
          uz: 'Onamning mantisida uyning ta’mi bor.',
          ru: 'Для меня её манты — это вкус дома.',
          ko: '어머니의 만티는 저에게 집의 맛이에요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'dumplings',
        meaning: { uz: 'chuchvara', ru: 'пельмень', ko: '만두' },
      },
      {
        word: 'pumpkin',
        meaning: { uz: 'qovoq', ru: 'тыква', ko: '호박' },
      },
      {
        word: 'smell',
        meaning: {
          uz: 'hidini sezmoq',
          ru: 'чувствовать запах',
          ko: '냄새를 맡다',
        },
      },
      {
        word: 'yogurt',
        meaning: { uz: 'qatiq', ru: 'йогурт, катык', ko: '요구르트' },
      },
      {
        word: 'tomorrow',
        meaning: { uz: 'ertaga', ru: 'завтра', ko: '내일' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What is Aziz’s favourite food?',
        options: ['Plov', 'Somsa', 'Lagman', 'His mother’s manti'],
        answerIndex: 3,
      },
      {
        id: 'q2',
        prompt: 'What does his mother put in manti in autumn?',
        options: ['Pumpkin', 'Potatoes', 'Cheese', 'Apples'],
        answerIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'How many manti does Aziz eat?',
        options: ['Two or three', 'Eight or nine', 'Five or six', 'Twelve'],
        answerIndex: 1,
      },
    ],
  },
];
