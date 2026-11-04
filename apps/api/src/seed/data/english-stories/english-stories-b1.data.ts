import type { StorySeed } from '../../../stories/story-content.util';

/** 영어 듣기 이야기 B1. 규칙은 english-stories-a1.data.ts 맨 위 주석 참고 */
export const ENGLISH_STORIES_B1: StorySeed[] = [
  {
    code: 'en-story-b1-01',
    level: 'B1',
    order: 1,
    title: 'My First Job Interview',
    topic: {
      uz: 'Birinchi ish suhbatim',
      ru: 'Моё первое собеседование',
      ko: '나의 첫 면접',
    },
    scene: 'morning',
    narrator: { id: 'aziz', name: 'Aziz' },
    sentences: [
      {
        id: 's1',
        text: 'Last month, I had my first real job interview at a bank in Tashkent.',
        translation: {
          uz: 'O‘tgan oy Toshkentdagi bir bankda ilk haqiqiy ish suhbatimdan o‘tdim.',
          ru: 'В прошлом месяце у меня было первое настоящее собеседование — в банке в Ташкенте.',
          ko: '지난달 저는 타슈켄트의 한 은행에서 처음으로 진짜 면접을 봤어요.',
        },
      },
      {
        id: 's2',
        text: 'I prepared for a whole week and practised my answers in front of the mirror.',
        translation: {
          uz: 'Bir hafta davomida tayyorlandim va javoblarimni oyna oldida mashq qildim.',
          ru: 'Я готовился целую неделю и репетировал ответы перед зеркалом.',
          ko: '일주일 내내 준비했고, 거울 앞에서 답변을 연습했어요.',
        },
      },
      {
        id: 's3',
        text: 'On the morning of the interview, I was so nervous that I couldn’t eat breakfast.',
        translation: {
          uz: 'Suhbat kuni ertalab shunchalik hayajonlandimki, nonushta ham qila olmadim.',
          ru: 'Утром в день собеседования я так волновался, что не смог позавтракать.',
          ko: '면접 날 아침에는 너무 긴장해서 아침도 못 먹었어요.',
        },
      },
      {
        id: 's4',
        text: 'When I arrived, I realised that the whole interview would be in English.',
        translation: {
          uz: 'Yetib kelganimda butun suhbat ingliz tilida bo‘lishini angladim.',
          ru: 'Когда я пришёл, я понял, что всё собеседование будет на английском.',
          ko: '도착해서야 면접 전체가 영어로 진행된다는 걸 알았어요.',
        },
      },
      {
        id: 's5',
        text: 'For a second, I wanted to run away, but I took a deep breath instead.',
        translation: {
          uz: 'Bir lahza qochib ketgim keldi, lekin buning o‘rniga chuqur nafas oldim.',
          ru: 'На секунду мне захотелось убежать, но вместо этого я глубоко вдохнул.',
          ko: '순간 도망치고 싶었지만, 대신 깊게 숨을 들이쉬었어요.',
        },
      },
      {
        id: 's6',
        text: 'The manager asked me why I wanted to work there.',
        translation: {
          uz: 'Menejer nega aynan shu yerda ishlamoqchi ekanimni so‘radi.',
          ru: 'Менеджер спросил, почему я хочу у них работать.',
          ko: '매니저는 제가 왜 그곳에서 일하고 싶은지 물었어요.',
        },
      },
      {
        id: 's7',
        text: 'My grammar wasn’t perfect, but I spoke honestly about my goals.',
        translation: {
          uz: 'Grammatikam mukammal emas edi, lekin maqsadlarim haqida samimiy gapirdim.',
          ru: 'Моя грамматика была не идеальной, но я честно рассказал о своих целях.',
          ko: '문법은 완벽하지 않았지만, 제 목표에 대해 솔직하게 말했어요.',
        },
      },
      {
        id: 's8',
        text: 'Two days later, they called me and offered me the job.',
        translation: {
          uz: 'Ikki kundan keyin menga qo‘ng‘iroq qilib, ishni taklif qilishdi.',
          ru: 'Через два дня мне позвонили и предложили работу.',
          ko: '이틀 뒤 은행에서 전화가 와서 저에게 일자리를 제안했어요.',
        },
      },
      {
        id: 's9',
        text: 'That day, I learned that confidence matters more than perfect English.',
        translation: {
          uz: 'O‘sha kuni o‘ziga ishonch mukammal ingliz tilidan muhimroq ekanini tushundim.',
          ru: 'В тот день я понял, что уверенность важнее идеального английского.',
          ko: '그날 저는 완벽한 영어보다 자신감이 더 중요하다는 걸 배웠어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'interview',
        meaning: {
          uz: 'suhbat (ishga qabul)',
          ru: 'собеседование',
          ko: '면접',
        },
      },
      {
        word: 'nervous',
        meaning: { uz: 'hayajonlangan', ru: 'взволнованный', ko: '긴장한' },
      },
      {
        word: 'realised',
        meaning: { uz: 'anglamoq', ru: 'понять, осознать', ko: '깨닫다' },
      },
      {
        word: 'honestly',
        meaning: { uz: 'samimiy, rostini', ru: 'честно', ko: '솔직하게' },
      },
      {
        word: 'confidence',
        meaning: { uz: 'o‘ziga ishonch', ru: 'уверенность', ko: '자신감' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Where was Aziz’s interview?',
        options: ['At a school', 'At a bank', 'At a hospital', 'At a hotel'],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'Why couldn’t he eat breakfast?',
        options: [
          'He was late',
          'He was nervous',
          'He was ill',
          'There was no food',
        ],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'What did he learn?',
        options: [
          'Grammar is the most important thing',
          'Banks are boring',
          'Confidence matters more than perfect English',
          'Interviews are easy',
        ],
        answerIndex: 2,
      },
    ],
  },
  {
    code: 'en-story-b1-02',
    level: 'B1',
    order: 2,
    title: 'Snow in the Mountains',
    topic: {
      uz: 'Tog‘dagi qor',
      ru: 'Снег в горах',
      ko: '산에 내린 눈',
    },
    scene: 'snow',
    narrator: { id: 'malika', name: 'Malika' },
    sentences: [
      {
        id: 's1',
        text: 'In January, my friends and I decided to spend a weekend in the mountains near Chimgan.',
        translation: {
          uz: 'Yanvarda do‘stlarim bilan dam olish kunlarini Chimyon yaqinidagi tog‘larda o‘tkazishga qaror qildik.',
          ru: 'В январе мы с друзьями решили провести выходные в горах у Чимгана.',
          ko: '1월에 저는 친구들과 침간 근처 산에서 주말을 보내기로 했어요.',
        },
      },
      {
        id: 's2',
        text: 'None of us had ever skied before, so we were excited and a little scared.',
        translation: {
          uz: 'Hech birimiz ilgari chang‘i uchmagan edik, shuning uchun ham hayajonlangan, ham biroz qo‘rqqan edik.',
          ru: 'Никто из нас раньше не катался на лыжах, поэтому нам было и радостно, и немного страшно.',
          ko: '우리 중 아무도 스키를 타 본 적이 없어서 설레면서도 조금 무서웠어요.',
        },
      },
      {
        id: 's3',
        text: 'The instructor, a tall man with a red beard, made everything look easy.',
        translation: {
          uz: 'Qizil soqolli, baland bo‘yli yo‘riqchi hamma narsani oson qilib ko‘rsatdi.',
          ru: 'Инструктор, высокий мужчина с рыжей бородой, делал всё так, будто это легко.',
          ko: '빨간 수염의 키 큰 강사님은 모든 걸 쉬워 보이게 했어요.',
        },
      },
      {
        id: 's4',
        text: 'Of course, I fell down at least twenty times on the first day.',
        translation: {
          uz: 'Albatta, birinchi kuni kamida yigirma marta yiqildim.',
          ru: 'Конечно, в первый день я упала как минимум двадцать раз.',
          ko: '물론 첫날 저는 적어도 스무 번은 넘어졌어요.',
        },
      },
      {
        id: 's5',
        text: 'Every time I fell, my friends laughed, and then they fell too.',
        translation: {
          uz: 'Har safar yiqilganimda do‘stlarim kulishdi, keyin o‘zlari ham yiqilishdi.',
          ru: 'Каждый раз, когда я падала, друзья смеялись, а потом падали сами.',
          ko: '제가 넘어질 때마다 친구들이 웃었고, 그러다 친구들도 넘어졌어요.',
        },
      },
      {
        id: 's6',
        text: 'In the evening, we sat by the fire, drank hot tea and dried our wet socks.',
        translation: {
          uz: 'Kechqurun gulxan yonida o‘tirib, issiq choy ichdik va ho‘l paypoqlarimizni quritdik.',
          ru: 'Вечером мы сидели у огня, пили горячий чай и сушили мокрые носки.',
          ko: '저녁에는 불가에 앉아 뜨거운 차를 마시고 젖은 양말을 말렸어요.',
        },
      },
      {
        id: 's7',
        text: 'On the second day, something changed, and I finally reached the bottom without falling.',
        translation: {
          uz: 'Ikkinchi kuni nimadir o‘zgardi va nihoyat yiqilmasdan pastga yetib bordim.',
          ru: 'На второй день что-то изменилось, и я наконец доехала до низа, ни разу не упав.',
          ko: '둘째 날에는 뭔가 달라졌고, 마침내 한 번도 넘어지지 않고 아래까지 내려갔어요.',
        },
      },
      {
        id: 's8',
        text: 'I realised that learning to ski is a lot like learning a language.',
        translation: {
          uz: 'Chang‘i uchishni o‘rganish til o‘rganishga juda o‘xshashini angladim.',
          ru: 'Я поняла, что учиться кататься на лыжах — почти то же самое, что учить язык.',
          ko: '스키를 배우는 건 언어를 배우는 것과 아주 비슷하다는 걸 깨달았어요.',
        },
      },
      {
        id: 's9',
        text: 'You fall many times, you laugh at yourself, and one day it just works.',
        translation: {
          uz: 'Ko‘p marta yiqilasan, o‘zingdan o‘zing kulasan va bir kuni hammasi o‘z-o‘zidan chiqa boshlaydi.',
          ru: 'Ты много раз падаешь, смеёшься над собой, и однажды всё просто получается.',
          ko: '여러 번 넘어지고, 스스로를 보며 웃다 보면, 어느 날 그냥 되는 거예요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'decided',
        meaning: { uz: 'qaror qilmoq', ru: 'решить', ko: '결정하다' },
      },
      {
        word: 'scared',
        meaning: { uz: 'qo‘rqqan', ru: 'испуганный', ko: '무서워하는' },
      },
      {
        word: 'instructor',
        meaning: { uz: 'yo‘riqchi, murabbiy', ru: 'инструктор', ko: '강사' },
      },
      {
        word: 'finally',
        meaning: { uz: 'nihoyat', ru: 'наконец', ko: '마침내' },
      },
      {
        word: 'bottom',
        meaning: { uz: 'past, tag', ru: 'низ', ko: '아래, 바닥' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Where did Malika go in January?',
        options: [
          'To the sea',
          'To the mountains near Chimgan',
          'To Samarkand',
          'To another country',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'How many times did she fall on the first day?',
        options: [
          'Once',
          'Five times',
          'At least twenty times',
          'She never fell',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'In her opinion, what is learning to ski like?',
        options: [
          'Cooking plov',
          'Learning a language',
          'Driving a car',
          'Running a marathon',
        ],
        answerIndex: 1,
      },
    ],
  },
  {
    code: 'en-story-b1-03',
    level: 'B1',
    order: 3,
    title: 'A Letter to My Future Self',
    topic: {
      uz: 'Kelajakdagi o‘zimga maktub',
      ru: 'Письмо себе в будущее',
      ko: '미래의 나에게 쓰는 편지',
    },
    scene: 'night',
    narrator: { id: 'dilnoza', name: 'Dilnoza' },
    sentences: [
      {
        id: 's1',
        text: 'Dear future me, I am writing this letter on a quiet night in October.',
        translation: {
          uz: 'Kelajakdagi aziz o‘zim, bu maktubni oktyabrning sokin bir kechasida yozyapman.',
          ru: 'Дорогая я из будущего, я пишу это письмо тихой октябрьской ночью.',
          ko: '미래의 나에게. 나는 10월의 조용한 밤에 이 편지를 쓰고 있어.',
        },
      },
      {
        id: 's2',
        text: 'Right now, I am thirty-two, I work at a pharmacy, and I am learning English every day.',
        translation: {
          uz: 'Hozir men o‘ttiz ikki yoshdaman, dorixonada ishlayman va har kuni ingliz tilini o‘rganyapman.',
          ru: 'Сейчас мне тридцать два, я работаю в аптеке и каждый день учу английский.',
          ko: '지금 나는 서른두 살이고, 약국에서 일하며, 매일 영어를 공부하고 있어.',
        },
      },
      {
        id: 's3',
        text: 'Some days are hard, and I feel that I am not making any progress.',
        translation: {
          uz: 'Ba’zi kunlar og‘ir o‘tadi, go‘yo hech qanday natija yo‘qdek tuyuladi.',
          ru: 'Бывают тяжёлые дни, когда кажется, что я совсем не продвигаюсь.',
          ko: '어떤 날은 힘들고, 하나도 늘지 않는 것 같아.',
        },
      },
      {
        id: 's4',
        text: 'But last week, I understood a whole song on the radio without any help.',
        translation: {
          uz: 'Lekin o‘tgan hafta radiodagi bir qo‘shiqni hech qanday yordamsiz to‘liq tushundim.',
          ru: 'Но на прошлой неделе я поняла целую песню по радио без всякой помощи.',
          ko: '그런데 지난주에 라디오에서 나온 노래 한 곡을 아무 도움 없이 전부 알아들었어.',
        },
      },
      {
        id: 's5',
        text: 'I stopped in the middle of the street and smiled like a child.',
        translation: {
          uz: 'Ko‘chaning o‘rtasida to‘xtab, boladek jilmaydim.',
          ru: 'Я остановилась посреди улицы и улыбнулась, как ребёнок.',
          ko: '길 한가운데 멈춰 서서 아이처럼 웃었어.',
        },
      },
      {
        id: 's6',
        text: 'I hope that when you read this, you are travelling and talking to people from all over the world.',
        translation: {
          uz: 'Umid qilamanki, sen buni o‘qiyotganingda sayohat qilib, butun dunyodan kelgan odamlar bilan gaplashayotgan bo‘lasan.',
          ru: 'Надеюсь, когда ты будешь это читать, ты будешь путешествовать и разговаривать с людьми со всего мира.',
          ko: '네가 이 편지를 읽을 때쯤엔 여행하면서 전 세계 사람들과 이야기하고 있길 바라.',
        },
      },
      {
        id: 's7',
        text: 'If you are tired, please remember this night and how much you wanted it.',
        translation: {
          uz: 'Agar charchagan bo‘lsang, iltimos, shu kechani va buni qanchalik xohlaganingni esla.',
          ru: 'Если ты устала, пожалуйста, вспомни эту ночь и то, как сильно ты этого хотела.',
          ko: '혹시 지쳤다면, 이 밤을 기억해 줘. 네가 이걸 얼마나 원했는지도.',
        },
      },
      {
        id: 's8',
        text: 'Don’t be afraid of mistakes, because every mistake brought you closer.',
        translation: {
          uz: 'Xatolardan qo‘rqma, chunki har bir xato seni maqsadingga yaqinlashtirdi.',
          ru: 'Не бойся ошибок, ведь каждая ошибка приближала тебя к цели.',
          ko: '실수를 두려워하지 마. 실수 하나하나가 너를 더 가까이 데려다줬으니까.',
        },
      },
      {
        id: 's9',
        text: 'With love, from the old you.',
        translation: {
          uz: 'Mehr bilan, avvalgi o‘zingdan.',
          ru: 'С любовью, твоя прежняя я.',
          ko: '사랑을 담아, 예전의 네가.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'future',
        meaning: { uz: 'kelajak', ru: 'будущее', ko: '미래' },
      },
      {
        word: 'progress',
        meaning: { uz: 'rivoj, natija', ru: 'прогресс', ko: '발전, 진전' },
      },
      {
        word: 'whole',
        meaning: { uz: 'butun, to‘liq', ru: 'целый', ko: '전체의' },
      },
      {
        word: 'travelling',
        meaning: { uz: 'sayohat qilmoq', ru: 'путешествовать', ko: '여행하다' },
      },
      {
        word: 'afraid',
        meaning: { uz: 'qo‘rqmoq', ru: 'бояться', ko: '두려워하는' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Where does Dilnoza work?',
        options: ['At a bank', 'At a school', 'At a pharmacy', 'At a hotel'],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'What happened last week?',
        options: [
          'She lost her job',
          'She understood a whole song in English',
          'She travelled to another country',
          'She wrote a book',
        ],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'What does she say about mistakes?',
        options: [
          'They are dangerous',
          'Every mistake brought her closer',
          'She never makes them',
          'They are funny',
        ],
        answerIndex: 1,
      },
    ],
  },
  {
    code: 'en-story-b1-04',
    level: 'B1',
    order: 4,
    title: 'Never Too Late',
    topic: {
      uz: 'Hech qachon kech emas',
      ru: 'Никогда не поздно',
      ko: '늦은 때란 없다',
    },
    scene: 'summer',
    narrator: { id: 'rustam', name: 'Rustam' },
    sentences: [
      {
        id: 's1',
        text: 'People are often surprised when they hear that I am learning English at seventy.',
        translation: {
          uz: 'Yetmish yoshimda ingliz tilini o‘rganayotganimni eshitgan odamlar ko‘pincha hayron qolishadi.',
          ru: 'Люди часто удивляются, когда слышат, что я учу английский в семьдесят лет.',
          ko: '제가 일흔에 영어를 배운다고 하면 사람들은 종종 놀라요.',
        },
      },
      {
        id: 's2',
        text: 'My granddaughter lives in Canada now, and her children speak mostly English.',
        translation: {
          uz: 'Nevaram hozir Kanadada yashaydi, uning bolalari asosan inglizcha gapirishadi.',
          ru: 'Моя внучка теперь живёт в Канаде, и её дети говорят в основном по-английски.',
          ko: '손녀가 지금 캐나다에 사는데, 그 아이들은 주로 영어로 말해요.',
        },
      },
      {
        id: 's3',
        text: 'The first time we had a video call, I could only smile and wave.',
        translation: {
          uz: 'Birinchi marta video qo‘ng‘iroq qilganimizda, faqat jilmayib, qo‘l silkitishdan nariga o‘tolmadim.',
          ru: 'Когда мы впервые созвонились по видео, я мог только улыбаться и махать рукой.',
          ko: '처음 영상 통화를 했을 때, 저는 그저 웃으며 손을 흔들 수밖에 없었어요.',
        },
      },
      {
        id: 's4',
        text: 'After the call, I sat in the garden for a long time, feeling a little sad.',
        translation: {
          uz: 'Qo‘ng‘iroqdan keyin bog‘da uzoq o‘tirdim, ko‘nglim biroz g‘ash edi.',
          ru: 'После звонка я долго сидел в саду, и мне было немного грустно.',
          ko: '통화가 끝난 뒤 저는 한참 동안 정원에 앉아 조금 슬퍼했어요.',
        },
      },
      {
        id: 's5',
        text: 'Then I decided that age is not a good reason to stop learning.',
        translation: {
          uz: 'Keyin yosh o‘rganishni to‘xtatish uchun yaxshi sabab emas, degan qarorga keldim.',
          ru: 'А потом я решил, что возраст — не повод перестать учиться.',
          ko: '그리고 나이는 배움을 멈출 좋은 이유가 아니라고 마음먹었어요.',
        },
      },
      {
        id: 's6',
        text: 'Now I study for twenty minutes every morning, before my tea gets cold.',
        translation: {
          uz: 'Endi har kuni ertalab, choyim sovib qolmasidan oldin, yigirma daqiqa shug‘ullanaman.',
          ru: 'Теперь я занимаюсь по двадцать минут каждое утро, пока не остыл мой чай.',
          ko: '이제 매일 아침 차가 식기 전에 20분씩 공부해요.',
        },
      },
      {
        id: 's7',
        text: 'My memory is not as fast as it used to be, so I repeat every word many times.',
        translation: {
          uz: 'Xotiram avvalgidek tez emas, shuning uchun har bir so‘zni ko‘p marta takrorlayman.',
          ru: 'Память у меня уже не такая быстрая, как раньше, поэтому я повторяю каждое слово много раз.',
          ko: '기억력이 예전만큼 빠르지 않아서, 단어 하나하나를 여러 번 반복해요.',
        },
      },
      {
        id: 's8',
        text: 'Last Sunday, my great-grandson asked me, “Grandpa, what is your favourite colour?”',
        translation: {
          uz: 'O‘tgan yakshanba chevaram mendan: «Bobo, sevimli rangingiz qaysi?» — deb so‘radi.',
          ru: 'В прошлое воскресенье правнук спросил меня: «Дедушка, какой твой любимый цвет?»',
          ko: '지난 일요일에 증손자가 “할아버지, 제일 좋아하는 색이 뭐예요?”라고 물었어요.',
        },
      },
      {
        id: 's9',
        text: 'I answered, “Green, like the trees in my garden,” and he clapped his hands.',
        translation: {
          uz: 'Men: «Yashil, bog‘imdagi daraxtlar kabi», — deb javob berdim, u esa qarsak chaldi.',
          ru: 'Я ответил: «Зелёный, как деревья в моём саду», и он захлопал в ладоши.',
          ko: '제가 “초록색, 우리 정원의 나무처럼”이라고 대답하자, 아이는 손뼉을 쳤어요.',
        },
      },
      {
        id: 's10',
        text: 'It was a short conversation, but for me, it was worth every minute.',
        translation: {
          uz: 'Bu qisqa suhbat edi, lekin men uchun u sarflagan har bir daqiqamga arzidi.',
          ru: 'Это был короткий разговор, но для меня он стоил каждой минуты.',
          ko: '짧은 대화였지만, 제게는 공부한 모든 시간이 아깝지 않았어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'surprised',
        meaning: { uz: 'hayron', ru: 'удивлённый', ko: '놀란' },
      },
      {
        word: 'granddaughter',
        meaning: { uz: 'nevara (qiz)', ru: 'внучка', ko: '손녀' },
      },
      {
        word: 'wave',
        meaning: {
          uz: 'qo‘l silkitmoq',
          ru: 'махать рукой',
          ko: '손을 흔들다',
        },
      },
      {
        word: 'memory',
        meaning: { uz: 'xotira', ru: 'память', ko: '기억력' },
      },
      {
        word: 'worth',
        meaning: {
          uz: 'arzimoq',
          ru: 'стоить (того)',
          ko: '~할 가치가 있는',
        },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Where does Rustam’s granddaughter live?',
        options: ['In Russia', 'In Korea', 'In Canada', 'In Tashkent'],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'How long does he study every morning?',
        options: ['Five minutes', 'Twenty minutes', 'One hour', 'Two hours'],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'What is his favourite colour?',
        options: ['Blue', 'Red', 'Yellow', 'Green'],
        answerIndex: 3,
      },
    ],
  },
];
