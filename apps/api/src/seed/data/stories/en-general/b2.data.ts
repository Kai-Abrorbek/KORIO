import type { StorySeed } from '../../../../stories/story-content.util';

/** 영어 듣기 이야기 B2. 규칙은 a1.data.ts 맨 위 주석 참고 */
export const EN_GENERAL_B2: StorySeed[] = [
  {
    code: 'en-story-b2-01',
    level: 'B2',
    order: 1,
    title: 'Half of My Class Is Abroad',
    topic: {
      uz: 'Sinfdoshlarimning yarmi chet elda',
      ru: 'Половина моего класса за границей',
      ko: '반 친구 절반이 해외에',
    },
    scene: 'sunset',
    narrator: { id: 'jasur', name: 'Jasur' },
    sentences: [
      {
        id: 's1',
        text: 'Of the twenty-six people in my school class, at least twelve are now working abroad, mostly in Korea, Poland and Russia.',
        translation: {
          uz: 'Maktabdagi yigirma olti nafar sinfdoshimdan kamida o‘n ikkitasi hozir chet elda, asosan Koreya, Polsha va Rossiyada ishlayapti.',
          ru: 'Из двадцати шести человек моего школьного класса как минимум двенадцать сейчас работают за границей — в основном в Корее, Польше и России.',
          ko: '학교 때 반 친구 스물여섯 명 중 적어도 열두 명이 지금 해외에서 일하고 있어요. 대부분 한국, 폴란드, 러시아에서요.',
        },
      },
      {
        id: 's2',
        text: 'Last week, my best friend Sardor flew to Seoul, and I went to the airport with his family to see him off.',
        translation: {
          uz: 'O‘tgan hafta eng yaqin do‘stim Sardor Seulga uchib ketdi, men uni kuzatib qo‘yish uchun oilasi bilan aeroportga bordim.',
          ru: 'На прошлой неделе мой лучший друг Сардор улетел в Сеул, и я поехал с его семьёй в аэропорт, чтобы проводить его.',
          ko: '지난주에 제일 친한 친구 사르도르가 서울로 떠났고, 저는 그 친구 가족과 함께 배웅하러 공항에 갔어요.',
        },
      },
      {
        id: 's3',
        text: 'His mother had got up at four to bake his favourite samsa, even though she knew he would be too nervous to eat.',
        translation: {
          uz: 'Onasi uning sevimli somsasini yopish uchun tongda soat to‘rtda turgan edi, garchi o‘g‘li hayajondan hech narsa yeya olmasligini bilsa ham.',
          ru: 'Его мама встала в четыре утра, чтобы испечь его любимую самсу, хотя знала, что он будет слишком волноваться и не сможет есть.',
          ko: '사르도르 어머니는 아들이 좋아하는 삼사를 굽느라 새벽 네 시에 일어나셨어요. 아들이 너무 긴장해서 먹지도 못할 걸 알면서도요.',
        },
      },
      {
        id: 's4',
        text: 'At the departure hall, she didn’t cry; she just kept fixing his collar, as if he were still a boy going to school.',
        translation: {
          uz: 'Jo‘nash zalida u yig‘lamadi — o‘g‘li hali ham maktabga ketayotgan boladek, faqat uning yoqasini qayta-qayta to‘g‘rilab turdi.',
          ru: 'В зале вылета она не плакала — только всё поправляла ему воротник, будто он всё ещё мальчик, который идёт в школу.',
          ko: '출국장에서 어머니는 울지 않으셨어요. 아들이 아직도 학교 가는 아이인 것처럼 계속 옷깃만 매만져 주셨어요.',
        },
      },
      {
        id: 's5',
        text: 'Sardor will earn more in one month at a car factory than his father earns here in four months.',
        translation: {
          uz: 'Sardor avtomobil zavodida bir oyda otasi bu yerda to‘rt oyda topadigan puldan ko‘proq ishlab oladi.',
          ru: 'На автомобильном заводе Сардор за месяц будет зарабатывать больше, чем его отец здесь получает за четыре месяца.',
          ko: '사르도르는 자동차 공장에서 한 달 만에 아버지가 여기서 넉 달 동안 버는 것보다 더 많이 벌 거예요.',
        },
      },
      {
        id: 's6',
        text: 'The money will pay for his sister’s studies and, one day, a house of his own, so nobody calls his decision wrong.',
        translation: {
          uz: 'Bu pul singlisining o‘qishiga, bir kun kelib esa o‘z uyiga yetadi, shuning uchun hech kim uning qarorini noto‘g‘ri demaydi.',
          ru: 'Эти деньги пойдут на учёбу его сестры, а однажды — на собственный дом, поэтому никто не называет его решение ошибкой.',
          ko: '그 돈으로 여동생 학비를 대고, 언젠가는 자기 집도 마련할 거예요. 그래서 아무도 그의 결정이 틀렸다고 하지 않아요.',
        },
      },
      {
        id: 's7',
        text: 'But I’ve noticed how quiet our neighbourhood has become, with fewer young men at Friday plov and more grandparents raising children alone.',
        translation: {
          uz: 'Lekin mahallamiz qanchalik jimib qolganini sezdim: juma oshida yigitlar kamaygan, bolalarni yolg‘iz o‘zi katta qilayotgan bobo-buvilar esa ko‘paygan.',
          ru: 'Но я заметил, как притих наш квартал: на пятничном плове всё меньше молодых парней и всё больше бабушек и дедушек, которые одни растят детей.',
          ko: '하지만 우리 동네가 얼마나 조용해졌는지 느껴요. 금요일 플롭 자리에 젊은 남자들은 줄고, 혼자 아이들을 키우는 할머니 할아버지들은 늘었어요.',
        },
      },
      {
        id: 's8',
        text: 'My own mother has never asked me to stay, yet whenever someone mentions working abroad, she suddenly finds something to do in the kitchen.',
        translation: {
          uz: 'Onam meni hech qachon qolishga undamagan, ammo kimdir chet elda ishlash haqida gap ochsa, u birdan oshxonada qiladigan ish topib qoladi.',
          ru: 'Моя мама никогда не просила меня остаться, но стоит кому-то заговорить о работе за границей, у неё вдруг находятся дела на кухне.',
          ko: '우리 엄마는 한 번도 저에게 남으라고 하신 적이 없어요. 그런데 누가 해외 취업 얘기를 꺼내면 갑자기 부엌에서 할 일을 찾으세요.',
        },
      },
      {
        id: 's9',
        text: 'I’m still not sure what I’ll do after I graduate, and honestly, both choices seem to cost something.',
        translation: {
          uz: 'O‘qishni tugatgach nima qilishimni hali ham bilmayman, rostini aytsam, ikkala yo‘lning ham o‘z bahosi bordek.',
          ru: 'Я до сих пор не знаю, что буду делать после выпуска, и, честно говоря, у обоих вариантов есть своя цена.',
          ko: '졸업하고 뭘 할지 아직도 모르겠어요. 솔직히 어느 쪽을 택해도 치러야 할 대가가 있는 것 같아요.',
        },
      },
      {
        id: 's10',
        text: 'If I leave, I’ll miss the years when my parents are getting older; if I stay, I may always wonder.',
        translation: {
          uz: 'Agar ketsam, ota-onam qarib borayotgan yillarni o‘tkazib yuboraman; qolsam, balki umrbod «nima bo‘lardi?» deb o‘ylab yuraman.',
          ru: 'Если уеду, я пропущу годы, когда мои родители стареют; если останусь, возможно, всегда буду гадать, что было бы.',
          ko: '떠나면 부모님이 나이 들어 가시는 시간을 놓칠 거고, 남으면 평생 ‘만약에’를 생각하며 살지도 몰라요.',
        },
      },
      {
        id: 's11',
        text: 'The next evening, Sardor sent a photo of the sunset over Seoul with one line: “It looks just like ours.”',
        translation: {
          uz: 'Ertasi kuni kechqurun Sardor Seul uzra botayotgan quyosh suratini bitta jumla bilan yubordi: «Xuddi biznikiga o‘xshaydi».',
          ru: 'На следующий вечер Сардор прислал фото заката над Сеулом с одной строчкой: «Совсем как у нас».',
          ko: '다음 날 저녁, 사르도르가 서울의 노을 사진을 한 줄과 함께 보냈어요. “우리 동네 노을이랑 똑같아.”',
        },
      },
      {
        id: 's12',
        text: 'I showed it to his mother, and she looked at it for a long time before saying, “No, ours is warmer.”',
        translation: {
          uz: 'Men uni onasiga ko‘rsatdim, u suratga uzoq tikilib turdi-da: «Yo‘q, bizniki iliqroq», — dedi.',
          ru: 'Я показал его маме Сардора, и она долго смотрела на снимок, прежде чем сказать: «Нет, наш теплее».',
          ko: '그 사진을 사르도르 어머니께 보여 드렸더니, 한참을 보시다가 “아니, 우리 노을이 더 따뜻해.”라고 하셨어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'abroad',
        meaning: {
          uz: 'chet elda, xorijda',
          ru: 'за границей',
          ko: '해외에(서)',
        },
      },
      {
        word: 'collar',
        meaning: { uz: 'yoqa', ru: 'воротник', ko: '옷깃' },
      },
      {
        word: 'decision',
        meaning: { uz: 'qaror', ru: 'решение', ko: '결정' },
      },
      {
        word: 'neighbourhood',
        meaning: { uz: 'mahalla, tevarak', ru: 'район, квартал', ko: '동네' },
      },
      {
        word: 'graduate',
        meaning: {
          uz: 'o‘qishni tamomlamoq',
          ru: 'окончить учёбу',
          ko: '졸업하다',
        },
      },
      {
        word: 'wonder',
        meaning: {
          uz: 'o‘ylanib qolmoq, «nima bo‘lardi?» deb o‘ylamoq',
          ru: 'гадать, задаваться вопросом',
          ko: '궁금해하다',
        },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Where did Sardor go to work?',
        options: ['Poland', 'Russia', 'Korea', 'Canada'],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt:
          'Why does Jasur’s mother suddenly find something to do in the kitchen?',
        options: [
          'She is hungry',
          'She probably doesn’t want him to see that she is worried',
          'She is cooking for Sardor’s family',
          'She doesn’t like talking to guests',
        ],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'What did Sardor’s mother mean by “ours is warmer”?',
        options: [
          'Home feels closer to her heart than anywhere else',
          'Seoul is colder in winter',
          'The photo was badly taken',
          'She wants to move to Korea',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-b2-02',
    level: 'B2',
    order: 2,
    title: 'Where the Sea Used to Be',
    topic: {
      uz: 'Bir paytlar dengiz bo‘lgan joy',
      ru: 'Там, где когда-то было море',
      ko: '바다가 있던 자리',
    },
    scene: 'summer',
    narrator: { id: 'rustam', name: 'Rustam' },
    sentences: [
      {
        id: 's1',
        text: 'One summer when I was ten, my father took me to stay with relatives in Muynak, then a busy fishing town on the Aral Sea.',
        translation: {
          uz: 'O‘n yoshligimda, bir yozi otam meni o‘sha paytlarda Orol dengizi bo‘yidagi gavjum baliqchilar shaharchasi bo‘lgan Mo‘ynoqqa, qarindoshlarimiznikiga olib bordi.',
          ru: 'Однажды летом, когда мне было десять, отец отвёз меня к родственникам в Муйнак — тогда оживлённый рыбацкий город на Аральском море.',
          ko: '열 살이던 어느 여름, 아버지가 저를 무이낙의 친척 집에 데려가셨어요. 그때 무이낙은 아랄해 연안의 북적이는 어촌 도시였어요.',
        },
      },
      {
        id: 's2',
        text: 'I had never seen a sea before, and I remember standing on the shore, unable to believe that water could go on forever.',
        translation: {
          uz: 'Men ilgari hech qachon dengiz ko‘rmagan edim va qirg‘oqda turib, suv cheksiz davom etishi mumkinligiga ishona olmaganim esimda.',
          ru: 'Я никогда раньше не видел моря и помню, как стоял на берегу и не мог поверить, что вода может тянуться бесконечно.',
          ko: '저는 그전까지 바다를 본 적이 없었어요. 물가에 서서 물이 끝없이 이어질 수 있다는 게 믿기지 않았던 기억이 나요.',
        },
      },
      {
        id: 's3',
        text: 'My uncle’s boat smelled of salt and fish, and every morning he came back with nets so heavy that two men had to lift them.',
        translation: {
          uz: 'Amakimning qayig‘idan tuz va baliq hidi kelardi, u har kuni ertalab shunchalik og‘ir to‘rlar bilan qaytardiki, ularni ikki kishi ko‘tarishi kerak edi.',
          ru: 'Лодка дяди пахла солью и рыбой, и каждое утро он возвращался с такими тяжёлыми сетями, что их поднимали двое мужчин.',
          ko: '아저씨의 배에서는 소금과 생선 냄새가 났고, 아저씨는 매일 아침 남자 둘이 함께 들어야 할 만큼 무거운 그물을 들고 돌아오셨어요.',
        },
      },
      {
        id: 's4',
        text: 'In the evenings, the whole family would sit by the water, eating fried fish and watching the boats come back into the harbour.',
        translation: {
          uz: 'Kechqurunlari butun oila suv bo‘yida o‘tirib, qovurilgan baliq yer va bandargohga qaytayotgan qayiqlarni tomosha qilardi.',
          ru: 'По вечерам вся семья сидела у воды, ела жареную рыбу и смотрела, как лодки возвращаются в гавань.',
          ko: '저녁이면 온 가족이 물가에 앉아 생선 튀김을 먹으며 배들이 항구로 돌아오는 걸 구경했어요.',
        },
      },
      {
        id: 's5',
        text: 'Nobody in that town could have imagined that, within a few decades, the sea would retreat more than a hundred kilometres.',
        translation: {
          uz: 'O‘sha shaharchada hech kim bir necha o‘n yil ichida dengiz yuz kilometrdan ham uzoqqa chekinishini tasavvur qila olmasdi.',
          ru: 'Никто в том городе не мог представить, что за несколько десятилетий море отступит больше чем на сто километров.',
          ko: '그 도시의 누구도 몇십 년 안에 바다가 100킬로미터 넘게 물러날 거라고는 상상하지 못했어요.',
        },
      },
      {
        id: 's6',
        text: 'Much of the river water that had fed it was used to irrigate fields, and year by year the shore moved further away.',
        translation: {
          uz: 'Dengizni to‘ldirib turgan daryo suvining katta qismi dalalarni sug‘orishga sarflandi va qirg‘oq yildan yilga uzoqlashib bordi.',
          ru: 'Большая часть речной воды, которая питала море, шла на орошение полей, и год за годом берег уходил всё дальше.',
          ko: '바다로 흘러들던 강물의 상당 부분이 밭에 물을 대는 데 쓰였고, 해안선은 해마다 점점 멀어졌어요.',
        },
      },
      {
        id: 's7',
        text: 'Three years ago, my son drove me back to Muynak, and I hardly recognised the place where I had spent that summer.',
        translation: {
          uz: 'Uch yil oldin o‘g‘lim meni mashinada Mo‘ynoqqa olib bordi, men o‘sha yozni o‘tkazgan joyimni zo‘rg‘a tanidim.',
          ru: 'Три года назад сын отвёз меня в Муйнак, и я с трудом узнал место, где провёл то лето.',
          ko: '3년 전 아들이 차로 저를 무이낙에 다시 데려갔는데, 그 여름을 보냈던 곳을 거의 알아보지 못했어요.',
        },
      },
      {
        id: 's8',
        text: 'Rusty ships were lying in the sand where the harbour used to be, and tourists were taking selfies next to them.',
        translation: {
          uz: 'Bir paytlar bandargoh bo‘lgan joyda zanglagan kemalar qumda yotar, sayyohlar esa ularning yonida selfi tushishardi.',
          ru: 'Там, где когда-то была гавань, в песке лежали ржавые корабли, а туристы делали рядом с ними селфи.',
          ko: '항구가 있던 자리에는 녹슨 배들이 모래 위에 놓여 있었고, 관광객들은 그 옆에서 셀카를 찍고 있었어요.',
        },
      },
      {
        id: 's9',
        text: 'I wasn’t angry with them, but I couldn’t explain that for me, those ships were not decorations but somebody’s whole life.',
        translation: {
          uz: 'Men ulardan jahlim chiqmadi, lekin men uchun bu kemalar bezak emas, kimningdir butun hayoti ekanini tushuntira olmadim.',
          ru: 'Я на них не сердился, но не мог объяснить, что для меня эти корабли — не украшение, а чья-то целая жизнь.',
          ko: '그 사람들에게 화가 나지는 않았지만, 제게 그 배들은 장식이 아니라 누군가의 삶 전부였다는 걸 설명할 수가 없었어요.',
        },
      },
      {
        id: 's10',
        text: 'My son told me that people are now planting saxaul trees on the dry seabed to stop the dust storms.',
        translation: {
          uz: 'O‘g‘lim hozir odamlar chang bo‘ronlarini to‘xtatish uchun qurib qolgan dengiz tubiga saksovul ekayotganini aytdi.',
          ru: 'Сын рассказал мне, что сейчас на высохшем дне моря сажают саксаул, чтобы остановить пыльные бури.',
          ko: '아들 말로는 요즘 사람들이 모래 폭풍을 막으려고 말라 버린 바다 밑바닥에 삭사울 나무를 심고 있대요.',
        },
      },
      {
        id: 's11',
        text: 'It won’t bring the sea back in my lifetime, yet I’m glad that someone is still trying.',
        translation: {
          uz: 'Bu men tirikligimda dengizni qaytarmaydi, ammo kimdir hali ham harakat qilayotganidan xursandman.',
          ru: 'При моей жизни это море не вернёт, но я рад, что кто-то всё ещё пытается.',
          ko: '제가 살아 있는 동안 바다가 돌아오지는 않겠지만, 누군가 아직 노력하고 있다는 게 기뻐요.',
        },
      },
      {
        id: 's12',
        text: 'Now, whenever my grandchildren leave the tap running, I tell them about the sea that I once believed could never end.',
        translation: {
          uz: 'Endi nevaralarim jo‘mrakni ochiq qoldirsa, ularga bir paytlar hech qachon tugamaydi deb ishongan dengizim haqida so‘zlab beraman.',
          ru: 'Теперь, когда внуки оставляют кран открытым, я рассказываю им о море, которое когда-то казалось мне бесконечным.',
          ko: '이제 손주들이 수도꼭지를 틀어 둔 채로 두면, 한때 절대 끝나지 않을 거라 믿었던 바다 이야기를 들려줘요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'shore',
        meaning: { uz: 'qirg‘oq, sohil', ru: 'берег', ko: '해안, 물가' },
      },
      {
        word: 'harbour',
        meaning: { uz: 'bandargoh', ru: 'гавань', ko: '항구' },
      },
      {
        word: 'retreat',
        meaning: { uz: 'chekinmoq', ru: 'отступать', ko: '물러나다' },
      },
      {
        word: 'irrigate',
        meaning: { uz: 'sug‘ormoq', ru: 'орошать', ko: '(땅에) 물을 대다' },
      },
      {
        word: 'recognised',
        meaning: { uz: 'tanimoq', ru: 'узнавать', ko: '알아보다' },
      },
      {
        word: 'rusty',
        meaning: { uz: 'zanglagan', ru: 'ржавый', ko: '녹슨' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What was Muynak like when Rustam was ten?',
        options: [
          'A quiet desert village',
          'A busy fishing town on the sea',
          'A large industrial city',
          'A popular ski resort',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'According to the story, why did the shore move further away?',
        options: [
          'An earthquake changed the land',
          'Fishermen caught too many fish',
          'The winters became colder',
          'River water that fed the sea was used to irrigate fields',
        ],
        answerIndex: 3,
      },
      {
        id: 'q3',
        prompt:
          'Why does Rustam tell his grandchildren about the sea when they leave the tap running?',
        options: [
          'He wants them to understand that water can run out',
          'He wants to save money on bills',
          'He plans to take them to Muynak',
          'He is still angry with the tourists',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-b2-03',
    level: 'B2',
    order: 3,
    title: 'While Tashkent Sleeps',
    topic: {
      uz: 'Toshkent uxlaganda',
      ru: 'Пока Ташкент спит',
      ko: '타슈켄트가 잠든 사이에',
    },
    scene: 'night',
    narrator: { id: 'kamola', name: 'Kamola' },
    sentences: [
      {
        id: 's1',
        text: 'For the last two years, I’ve been working as a freelance developer for clients in America, which means my working day starts at sunset.',
        translation: {
          uz: 'So‘nggi ikki yildan beri Amerikadagi mijozlar uchun frilanser dasturchi bo‘lib ishlayapman, demak, mening ish kunim quyosh botganda boshlanadi.',
          ru: 'Последние два года я работаю фриланс-разработчиком для клиентов из Америки, а значит, мой рабочий день начинается на закате.',
          ko: '지난 2년 동안 저는 미국 고객들을 상대로 프리랜서 개발자로 일해 왔어요. 그러니까 제 근무는 해 질 녘에 시작돼요.',
        },
      },
      {
        id: 's2',
        text: 'When my neighbours are coming home from work, I’m making my first cup of coffee and opening my laptop.',
        translation: {
          uz: 'Qo‘shnilarim ishdan uyga qaytayotganda, men birinchi chashka qahvamni damlab, noutbukimni ochayotgan bo‘laman.',
          ru: 'Когда соседи возвращаются с работы домой, я варю первую чашку кофе и открываю ноутбук.',
          ko: '이웃들이 퇴근해서 집에 올 때, 저는 첫 커피를 내리고 노트북을 열어요.',
        },
      },
      {
        id: 's3',
        text: 'Because of the time difference, our meetings usually take place at two or three in the morning, Tashkent time.',
        translation: {
          uz: 'Vaqt farqi tufayli uchrashuvlarimiz odatda Toshkent vaqti bilan tungi soat ikki yoki uchda bo‘ladi.',
          ru: 'Из-за разницы во времени наши созвоны обычно проходят в два или три часа ночи по ташкентскому времени.',
          ko: '시차 때문에 회의는 보통 타슈켄트 시간으로 새벽 두세 시에 열려요.',
        },
      },
      {
        id: 's4',
        text: 'I have to look fresh and cheerful on camera, even though the rest of my street has been asleep for hours.',
        translation: {
          uz: 'Ko‘chamizdagilar allaqachon soatlab uxlayotgan bo‘lsa ham, men kamerada tetik va xushchaqchaq ko‘rinishim kerak.',
          ru: 'Мне нужно выглядеть свежей и бодрой на камере, хотя вся моя улица уже несколько часов спит.',
          ko: '우리 동네 사람들은 몇 시간 전에 다 잠들었는데도, 저는 카메라 앞에서 생기 있고 밝아 보여야 해요.',
        },
      },
      {
        id: 's5',
        text: 'The money is much better than anything I could earn at a local company, and I’ve already managed to help my parents repair their roof.',
        translation: {
          uz: 'Daromadim mahalliy kompaniyada topishim mumkin bo‘lgan har qanday puldan ancha ko‘p, ota-onamga tomni ta’mirlashda yordam berishga ham ulgurdim.',
          ru: 'Платят гораздо больше, чем я могла бы заработать в местной компании, и я уже успела помочь родителям отремонтировать крышу.',
          ko: '돈은 현지 회사에서 벌 수 있는 것보다 훨씬 많아서, 벌써 부모님 집 지붕 수리도 도와 드렸어요.',
        },
      },
      {
        id: 's6',
        text: 'My relatives, however, still don’t believe that I have a real job, because they never see me leave the house.',
        translation: {
          uz: 'Biroq qarindoshlarim haligacha mening haqiqiy ishim borligiga ishonishmaydi, chunki meni hech qachon uydan chiqib ketayotganimni ko‘rishmaydi.',
          ru: 'Однако родственники до сих пор не верят, что у меня настоящая работа, потому что никогда не видят, как я выхожу из дома.',
          ko: '하지만 친척들은 아직도 제가 진짜 직업이 있다는 걸 믿지 않아요. 제가 집 밖으로 나가는 걸 본 적이 없으니까요.',
        },
      },
      {
        id: 's7',
        text: 'At every family gathering, one of my aunts asks when I’m going to find proper work, preferably at a bank like my cousin.',
        translation: {
          uz: 'Har bir oilaviy yig‘inda xolalarimdan biri qachon tuzukroq ish topishimni so‘raydi — iloji bo‘lsa, amakivachcham kabi bankdan.',
          ru: 'На каждом семейном застолье одна из тёть спрашивает, когда я найду нормальную работу — лучше всего в банке, как мой двоюродный брат.',
          ko: '가족 모임 때마다 이모 중 한 분이 언제 제대로 된 직장을 구할 거냐고, 되도록이면 사촌처럼 은행에 들어가라고 물으세요.',
        },
      },
      {
        id: 's8',
        text: 'The hardest part isn’t the work itself but the loneliness, since I’ve missed weddings, birthdays and countless evenings with friends.',
        translation: {
          uz: 'Eng qiyini ishning o‘zi emas, yolg‘izlik, chunki to‘ylar, tug‘ilgan kunlar va do‘stlar bilan o‘tadigan son-sanoqsiz oqshomlarni o‘tkazib yubordim.',
          ru: 'Самое трудное — не сама работа, а одиночество: я пропустила свадьбы, дни рождения и бесчисленные вечера с друзьями.',
          ko: '가장 힘든 건 일 자체가 아니라 외로움이에요. 결혼식, 생일, 친구들과 보낼 수많은 저녁을 놓쳤거든요.',
        },
      },
      {
        id: 's9',
        text: 'Last winter, I took on three projects at once and ended up so exhausted that I fell asleep in the middle of a client call.',
        translation: {
          uz: 'O‘tgan qish bir vaqtning o‘zida uchta loyihani olib, shunchalik holdan toydimki, mijoz bilan qo‘ng‘iroq o‘rtasida uxlab qoldim.',
          ru: 'Прошлой зимой я взялась сразу за три проекта и так вымоталась, что уснула прямо посреди созвона с клиентом.',
          ko: '지난겨울에는 프로젝트 세 개를 한꺼번에 맡았다가 너무 지쳐서 고객과 통화하던 중에 잠들어 버렸어요.',
        },
      },
      {
        id: 's10',
        text: 'Luckily, the client just laughed, but that moment made me realise that I had been treating my health as if it were unlimited.',
        translation: {
          uz: 'Yaxshiyamki, mijoz shunchaki kulib qo‘ydi, lekin o‘sha lahzada sog‘lig‘imga go‘yo u cheksizdek munosabatda bo‘lib kelganimni angladim.',
          ru: 'К счастью, клиент просто рассмеялся, но в тот момент я поняла, что относилась к своему здоровью так, будто оно бесконечно.',
          ko: '다행히 고객은 그냥 웃어넘겼지만, 그 순간 제가 건강을 무한한 것처럼 대해 왔다는 걸 깨달았어요.',
        },
      },
      {
        id: 's11',
        text: 'Now I turn down projects that don’t fit my schedule, and I keep two evenings a week completely free for my family.',
        translation: {
          uz: 'Endi jadvalimga to‘g‘ri kelmaydigan loyihalarni rad etaman va haftada ikki oqshomni butunlay oilam uchun bo‘sh qoldiraman.',
          ru: 'Теперь я отказываюсь от проектов, которые не вписываются в мой график, и два вечера в неделю оставляю полностью для семьи.',
          ko: '이제는 제 일정에 맞지 않는 프로젝트는 거절하고, 일주일에 저녁 이틀은 온전히 가족을 위해 비워 둬요.',
        },
      },
      {
        id: 's12',
        text: 'I still work while Tashkent sleeps, but I’ve learned that no deadline is worth more than the people sleeping in the next room.',
        translation: {
          uz: 'Hamon Toshkent uxlaganda ishlayman, lekin hech bir muddat qo‘shni xonada uxlayotgan yaqinlarimdan qimmatroq emasligini o‘rgandim.',
          ru: 'Я по-прежнему работаю, пока Ташкент спит, но поняла, что никакой дедлайн не стоит больше, чем люди, спящие в соседней комнате.',
          ko: '저는 여전히 타슈켄트가 잠든 사이에 일하지만, 어떤 마감도 옆방에서 자고 있는 사람들보다 소중하지 않다는 걸 배웠어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'freelance',
        meaning: {
          uz: 'mustaqil (frilans)',
          ru: 'внештатный, фриланс',
          ko: '프리랜서의',
        },
      },
      {
        word: 'relatives',
        meaning: { uz: 'qarindosh', ru: 'родственник', ko: '친척' },
      },
      {
        word: 'loneliness',
        meaning: { uz: 'yolg‘izlik', ru: 'одиночество', ko: '외로움' },
      },
      {
        word: 'countless',
        meaning: {
          uz: 'son-sanoqsiz',
          ru: 'бесчисленный',
          ko: '셀 수 없이 많은',
        },
      },
      {
        word: 'exhausted',
        meaning: { uz: 'holdan toygan', ru: 'измотанный', ko: '기진맥진한' },
      },
      {
        word: 'deadline',
        meaning: {
          uz: 'muddat, oxirgi muddat',
          ru: 'крайний срок, дедлайн',
          ko: '마감 기한',
        },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt:
          'Why are Kamola’s meetings usually at two or three in the morning?',
        options: [
          'Her clients live in a different time zone',
          'She can’t sleep at night',
          'Her internet is faster at night',
          'Her boss works in Tashkent',
        ],
        answerIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'Why don’t her relatives believe she has a real job?',
        options: [
          'She earns very little',
          'She never talks about her work',
          'They never see her leave the house',
          'She works at a bank',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'What has changed in Kamola’s attitude to work?',
        options: [
          'She now works only in the daytime',
          'She has decided to find a job at a bank',
          'She takes as many projects as possible',
          'She now protects time for her health and her family',
        ],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-b2-04',
    level: 'B2',
    order: 4,
    title: 'A Smaller Wedding',
    topic: {
      uz: 'Kichikroq to‘y',
      ru: 'Свадьба поскромнее',
      ko: '조금 작은 결혼식',
    },
    scene: 'bazaar',
    narrator: { id: 'aziz', name: 'Aziz' },
    sentences: [
      {
        id: 's1',
        text: 'At the bank where I work, I process dozens of loan applications every month, and a surprising number of them are for weddings.',
        translation: {
          uz: 'Men ishlaydigan bankda har oy o‘nlab kredit arizalarini ko‘rib chiqaman va ularning hayratlanarli darajada ko‘pi to‘y uchun olinadi.',
          ru: 'В банке, где я работаю, я каждый месяц обрабатываю десятки заявок на кредит, и удивительно много из них — на свадьбы.',
          ko: '제가 일하는 은행에서 매달 대출 신청서를 수십 건씩 처리하는데, 놀랄 만큼 많은 게 결혼식 비용이에요.',
        },
      },
      {
        id: 's2',
        text: 'So when my fiancée Nodira and I started planning our own, I already knew how quickly the costs can get out of hand.',
        translation: {
          uz: 'Shuning uchun qallig‘im Nodira bilan o‘z to‘yimizni rejalashtira boshlaganimizda, xarajatlar qanchalik tez nazoratdan chiqib ketishini allaqachon bilardim.',
          ru: 'Поэтому, когда мы с моей невестой Нодирой начали планировать собственную свадьбу, я уже знал, как быстро расходы могут выйти из-под контроля.',
          ko: '그래서 약혼녀 노디라와 우리 결혼식을 준비하기 시작했을 때, 비용이 얼마나 빨리 감당할 수 없게 불어나는지 이미 알고 있었어요.',
        },
      },
      {
        id: 's3',
        text: 'My mother went to the bazaar with a notebook and came back pale, having calculated the rice, meat and carrots for eight hundred guests.',
        translation: {
          uz: 'Onam daftar ko‘tarib bozorga bordi va sakkiz yuz mehmonga yetadigan guruch, go‘sht va sabzini hisoblab, rangi oqarib qaytdi.',
          ru: 'Мама пошла на базар с блокнотом и вернулась бледная, подсчитав рис, мясо и морковь на восемьсот гостей.',
          ko: '어머니는 공책을 들고 시장에 가셨다가, 하객 팔백 명분의 쌀과 고기, 당근 값을 계산해 보고는 하얗게 질려서 돌아오셨어요.',
        },
      },
      {
        id: 's4',
        text: 'Then there were the wedding hall, the singer, the gifts for both families and the gold, which the groom’s side is traditionally expected to provide.',
        translation: {
          uz: 'Undan keyin to‘yxona, xonanda, ikki oila uchun sovg‘alar va an’anaga ko‘ra kuyov tomoni qilishi kerak bo‘lgan tilla taqinchoqlar bor edi.',
          ru: 'А ещё были банкетный зал, певец, подарки для обеих семей и золото, которое по традиции должна дарить сторона жениха.',
          ko: '거기에 결혼식장, 가수, 양가에 줄 선물, 그리고 전통적으로 신랑 측이 마련해야 하는 금 장신구까지 있었어요.',
        },
      },
      {
        id: 's5',
        text: 'Altogether, it would have cost more than we both earn in two years, and we’d have been paying off the loan for ages.',
        translation: {
          uz: 'Hammasi bo‘lib, bu ikkalamiz ikki yilda topadigan puldan ham qimmatga tushardi va biz kreditni uzoq yillar to‘lab yurgan bo‘lardik.',
          ru: 'В целом это обошлось бы дороже, чем мы вдвоём зарабатываем за два года, и мы бы ещё очень долго выплачивали кредит.',
          ko: '다 합치면 우리 둘이 2년 동안 버는 돈보다 더 들었을 거고, 대출을 갚느라 아주 오랫동안 고생했을 거예요.',
        },
      },
      {
        id: 's6',
        text: 'Nodira and I wanted something different: a lunch for close family and friends, followed by a trip to Khiva, which neither of us had seen.',
        translation: {
          uz: 'Nodira bilan biz boshqacha narsa xohladik: yaqin qarindosh va do‘stlar uchun tushlik, keyin esa ikkalamiz ham ko‘rmagan Xivaga sayohat.',
          ru: 'Мы с Нодирой хотели другого: обед для близких родственников и друзей, а потом поездку в Хиву, где никто из нас не бывал.',
          ko: '노디라와 저는 다른 걸 원했어요. 가까운 가족과 친구들과의 점심, 그리고 둘 다 가 본 적 없는 히바로의 여행이요.',
        },
      },
      {
        id: 's7',
        text: 'When we told our parents, my father was silent for a long time, and then he asked, “What will the neighbours say?”',
        translation: {
          uz: 'Ota-onalarimizga aytganimizda, otam uzoq jim turdi, keyin: «Qo‘ni-qo‘shnilar nima deydi?» — deb so‘radi.',
          ru: 'Когда мы сказали об этом родителям, отец долго молчал, а потом спросил: «А что скажут соседи?»',
          ko: '부모님께 말씀드렸더니, 아버지는 한참을 말없이 계시다가 “이웃들이 뭐라고 하겠니?”라고 물으셨어요.',
        },
      },
      {
        id: 's8',
        text: 'I understood him, because in our mahalla a wedding isn’t only about two people; it’s also how you repay every family that once invited you.',
        translation: {
          uz: 'Men uni tushundim, chunki mahallamizda to‘y faqat ikki kishining ishi emas; u bir paytlar sizni to‘yiga chaqirgan har bir xonadonning yaxshiligini qaytarish yo‘li hamdir.',
          ru: 'Я его понимал: в нашей махалле свадьба — дело не только двоих, это ещё и способ отплатить каждой семье, которая когда-то тебя приглашала.',
          ko: '저는 아버지를 이해했어요. 우리 마할라에서 결혼식은 두 사람만의 일이 아니라, 예전에 우리를 초대해 준 모든 집에 보답하는 방법이기도 하거든요.',
        },
      },
      {
        id: 's9',
        text: 'In the end, we agreed on a compromise: one modest morning plov for the whole neighbourhood and a small dinner for about eighty guests.',
        translation: {
          uz: 'Oxir-oqibat murosaga keldik: butun mahalla uchun bitta kamtarona nahor oshi va saksonga yaqin mehmon uchun kichik kechki ziyofat.',
          ru: 'В итоге мы пришли к компромиссу: скромный утренний плов для всей махалли и небольшой ужин примерно на восемьдесят гостей.',
          ko: '결국 우리는 타협했어요. 온 동네를 위한 소박한 아침 플롭 한 번, 그리고 하객 여든 명 정도의 작은 저녁 식사로요.',
        },
      },
      {
        id: 's10',
        text: 'Some relatives were clearly disappointed, and I heard that one aunt called it “a wedding without a wedding” behind our backs.',
        translation: {
          uz: 'Ba’zi qarindoshlarning hafsalasi ochiqdan-ochiq pir bo‘ldi, bir xolam esa orqamizdan uni «to‘ysiz to‘y» deb ataganini eshitdim.',
          ru: 'Некоторые родственники явно были разочарованы, и я слышал, как одна тётя за глаза назвала это «свадьбой без свадьбы».',
          ko: '몇몇 친척들은 대놓고 실망했고, 이모 한 분은 뒤에서 “결혼식 없는 결혼식”이라고 했다더라고요.',
        },
      },
      {
        id: 's11',
        text: 'But we started our marriage without a single som of debt, and the money we saved became the down payment on a small flat.',
        translation: {
          uz: 'Ammo biz oilaviy hayotimizni bir so‘m ham qarzsiz boshladik, tejagan pulimiz esa kichkina kvartiraning boshlang‘ich to‘loviga aylandi.',
          ru: 'Зато мы начали семейную жизнь без единого сума долга, а сэкономленные деньги стали первым взносом за небольшую квартиру.',
          ko: '하지만 우리는 빚 한 푼 없이 결혼 생활을 시작했고, 아낀 돈은 작은 아파트 계약금이 됐어요.',
        },
      },
      {
        id: 's12',
        text: 'Last month, my father admitted that he was proud of us, although he still won’t say so in front of the neighbours.',
        translation: {
          uz: 'O‘tgan oy otam biz bilan faxrlanishini tan oldi, garchi hali ham buni qo‘shnilar oldida aytmasa ham.',
          ru: 'В прошлом месяце отец признался, что гордится нами, хотя при соседях до сих пор этого не говорит.',
          ko: '지난달 아버지는 우리가 자랑스럽다고 인정하셨어요. 물론 이웃들 앞에서는 아직도 그렇게 말씀하지 않으시지만요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'loan',
        meaning: { uz: 'kredit, qarz', ru: 'кредит, заём', ko: '대출' },
      },
      {
        word: 'compromise',
        meaning: { uz: 'murosa', ru: 'компромисс', ko: '타협' },
      },
      {
        word: 'modest',
        meaning: { uz: 'kamtarona, oddiy', ru: 'скромный', ko: '소박한' },
      },
      {
        word: 'disappointed',
        meaning: {
          uz: 'hafsalasi pir bo‘lgan',
          ru: 'разочарованный',
          ko: '실망한',
        },
      },
      {
        word: 'debt',
        meaning: { uz: 'qarz', ru: 'долг', ko: '빚' },
      },
      {
        word: 'admitted',
        meaning: { uz: 'tan olmoq', ru: 'признавать', ko: '인정하다' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt:
          'Why did Aziz already know that wedding costs can grow quickly?',
        options: [
          'His mother told him',
          'He sees many wedding loans at work',
          'He had organised a wedding before',
          'He read about it online',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What did Aziz and Nodira finally choose?',
        options: [
          'A wedding for eight hundred guests',
          'No celebration at all',
          'A wedding in Khiva',
          'A morning plov for the neighbourhood and a small dinner',
        ],
        answerIndex: 3,
      },
      {
        id: 'q3',
        prompt:
          'Why won’t Aziz’s father praise the decision in front of the neighbours?',
        options: [
          'He still cares about what the community thinks',
          'He is angry with Nodira',
          'He didn’t come to the dinner',
          'The neighbours never invited him anywhere',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-b2-05',
    level: 'B2',
    order: 5,
    title: 'The Café That Didn’t Survive',
    topic: {
      uz: 'Yopilib qolgan kafe',
      ru: 'Кафе, которое не выжило',
      ko: '살아남지 못한 카페',
    },
    scene: 'rain',
    narrator: { id: 'timur', name: 'Timur' },
    sentences: [
      {
        id: 's1',
        text: 'When I came back from South Korea after seven years, I had savings, energy and a head full of ideas I’d seen work in Seoul.',
        translation: {
          uz: 'Yetti yildan so‘ng Janubiy Koreyadan qaytganimda jamg‘armam, g‘ayratim va Seulda ish berganini o‘z ko‘zim bilan ko‘rgan g‘oyalarga to‘la boshim bor edi.',
          ru: 'Когда я вернулся из Южной Кореи после семи лет, у меня были сбережения, энергия и голова, полная идей, которые, как я видел, работали в Сеуле.',
          ko: '7년 만에 한국에서 돌아왔을 때 저에게는 모아 둔 돈과 의욕, 그리고 서울에서 잘되는 걸 직접 본 아이디어가 머릿속에 가득했어요.',
        },
      },
      {
        id: 's2',
        text: 'The biggest one was a Korean-style café with fried chicken, iced coffee and a corner where students could study late.',
        translation: {
          uz: 'Eng kattasi — qovurilgan tovuq, muzli qahva va talabalar kechgacha o‘qiy oladigan burchagi bor koreyscha uslubdagi kafe edi.',
          ru: 'Самой главной было кафе в корейском стиле — с жареной курицей, холодным кофе и уголком, где студенты могли заниматься допоздна.',
          ko: '그중 제일 큰 건 치킨과 아이스커피가 있고, 학생들이 늦게까지 공부할 수 있는 공간이 있는 한국식 카페였어요.',
        },
      },
      {
        id: 's3',
        text: 'I rented a place near the college in our town, spent almost all my savings on furniture and a big sign, and opened in March.',
        translation: {
          uz: 'Shaharchamizdagi kollej yaqinidan joy ijaraga oldim, deyarli butun jamg‘armamni mebel va katta peshlavhaga sarfladim va martda ochildim.',
          ru: 'Я снял помещение рядом с колледжем в нашем городке, потратил почти все сбережения на мебель и большую вывеску и открылся в марте.',
          ko: '우리 동네 대학 근처에 가게를 얻어서, 모은 돈을 거의 다 가구와 큰 간판에 쓰고 3월에 문을 열었어요.',
        },
      },
      {
        id: 's4',
        text: 'For the first few weeks, the place was packed, mostly with curious young people who had seen Korean dramas and wanted to try the food.',
        translation: {
          uz: 'Dastlabki bir necha hafta kafe odamga to‘la edi, asosan koreys seriallarini ko‘rib, taomlarini tatib ko‘rmoqchi bo‘lgan qiziquvchan yoshlar kelardi.',
          ru: 'Первые несколько недель кафе было забито — в основном любопытной молодёжью, которая насмотрелась корейских дорам и хотела попробовать еду.',
          ko: '처음 몇 주는 손님으로 꽉 찼어요. 대부분 한국 드라마를 보고 음식을 맛보고 싶어 하던 호기심 많은 젊은이들이었어요.',
        },
      },
      {
        id: 's5',
        text: 'But curiosity doesn’t last, and by summer, most of them had gone back to the cheaper samsa stall across the road.',
        translation: {
          uz: 'Lekin qiziqish uzoqqa bormaydi va yozga kelib ularning ko‘pchiligi yo‘lning narigi betidagi arzonroq somsa do‘koniga qaytib ketgan edi.',
          ru: 'Но любопытство быстро проходит, и к лету большинство из них вернулись к более дешёвой самсе в ларьке через дорогу.',
          ko: '하지만 호기심은 오래가지 않았고, 여름이 되자 대부분은 길 건너 더 싼 삼사 가게로 돌아갔어요.',
        },
      },
      {
        id: 's6',
        text: 'I had set my prices as if my customers earned Korean salaries, and I had never once asked them what they actually wanted.',
        translation: {
          uz: 'Narxlarni xuddi mijozlarim koreyscha maosh olayotgandek qo‘ygan edim va ulardan aslida nima xohlashlarini bir marta ham so‘ramagan edim.',
          ru: 'Я установил цены так, будто мои клиенты получали корейские зарплаты, и ни разу не спросил, чего они на самом деле хотят.',
          ko: '저는 손님들이 한국 월급을 받는 것처럼 가격을 매겼고, 정작 그들이 뭘 원하는지는 한 번도 묻지 않았어요.',
        },
      },
      {
        id: 's7',
        text: 'On the rainy October evening when I finally closed, I sat alone among the empty tables, feeling ashamed and completely lost.',
        translation: {
          uz: 'Nihoyat yopilgan o‘sha yomg‘irli oktyabr oqshomida bo‘sh stollar orasida yolg‘iz o‘tirdim — uyalib, butunlay o‘zimni yo‘qotib qo‘ygan edim.',
          ru: 'Дождливым октябрьским вечером, когда я наконец закрылся, я сидел один среди пустых столов, чувствуя стыд и полную растерянность.',
          ko: '마침내 문을 닫던 비 오는 10월 저녁, 저는 빈 테이블 사이에 혼자 앉아 부끄럽고 완전히 길을 잃은 기분이었어요.',
        },
      },
      {
        id: 's8',
        text: 'I kept imagining how my relatives would whisper “We told you so” at the next family wedding.',
        translation: {
          uz: 'Qarindoshlarim keyingi oilaviy to‘yda «Biz aytgan edik-ku» deb pichirlashlarini ko‘z oldimga keltiraverdim.',
          ru: 'Я всё представлял, как родственники будут шептаться на следующей семейной свадьбе: «Мы же тебе говорили».',
          ko: '다음 집안 결혼식에서 친척들이 “그러게 우리가 뭐랬어” 하고 수군거릴 모습이 자꾸 떠올랐어요.',
        },
      },
      {
        id: 's9',
        text: 'Instead, my father came over with a thermos of tea, sat down opposite me and said that only people who try can fail.',
        translation: {
          uz: 'Buning o‘rniga otam bir termos choy ko‘tarib keldi, ro‘paramga o‘tirdi va faqat harakat qilganlargina yiqilishi mumkinligini aytdi.',
          ru: 'Вместо этого пришёл отец с термосом чая, сел напротив меня и сказал, что проиграть может только тот, кто пытается.',
          ko: '그런데 아버지가 차가 든 보온병을 들고 오셔서 제 맞은편에 앉으시더니, 시도하는 사람만 실패할 수 있다고 하셨어요.',
        },
      },
      {
        id: 's10',
        text: 'A year later, I started again, but this time I spent a month just talking to people at the bazaar before investing anything.',
        translation: {
          uz: 'Bir yildan so‘ng yana boshladim, lekin bu safar biror narsaga pul tikishdan oldin bir oy davomida bozorda odamlar bilan shunchaki gaplashdim.',
          ru: 'Через год я начал снова, но на этот раз сначала месяц просто разговаривал с людьми на базаре, прежде чем что-то вкладывать.',
          ko: '1년 뒤 다시 시작했는데, 이번에는 돈을 들이기 전에 한 달 동안 시장에서 사람들과 이야기만 나눴어요.',
        },
      },
      {
        id: 's11',
        text: 'Now I run a small workshop that repairs phones and laptops, which is less exciting than a café but is actually needed here.',
        translation: {
          uz: 'Hozir telefon va noutbuklarni ta’mirlaydigan kichik ustaxonam bor — bu kafedek qiziqarli emas, lekin bu yerda haqiqatan ham kerak.',
          ru: 'Теперь у меня небольшая мастерская по ремонту телефонов и ноутбуков — это не так увлекательно, как кафе, зато здесь это действительно нужно.',
          ko: '지금은 휴대폰과 노트북을 고치는 작은 수리점을 운영해요. 카페만큼 신나지는 않지만, 여기서는 정말 필요한 일이에요.',
        },
      },
      {
        id: 's12',
        text: 'That failure cost me almost everything I had saved, but it taught me what Korea never could: to listen before I build.',
        translation: {
          uz: 'O‘sha muvaffaqiyatsizlik menga deyarli butun jamg‘armamga tushdi, lekin Koreya o‘rgata olmagan narsani o‘rgatdi: qurishdan oldin tinglashni.',
          ru: 'Эта неудача стоила мне почти всего, что я накопил, но научила тому, чему не смогла научить Корея: сначала слушать, а потом строить.',
          ko: '그 실패로 모아 둔 돈을 거의 다 잃었지만, 한국에서도 배우지 못한 걸 배웠어요. 무언가를 만들기 전에 먼저 들어야 한다는 걸요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'savings',
        meaning: { uz: 'jamg‘arma', ru: 'сбережения', ko: '저축, 모아 둔 돈' },
      },
      {
        word: 'packed',
        meaning: {
          uz: 'odamga to‘la',
          ru: 'переполненный',
          ko: '(사람으로) 꽉 찬',
        },
      },
      {
        word: 'curiosity',
        meaning: { uz: 'qiziqish', ru: 'любопытство', ko: '호기심' },
      },
      {
        word: 'ashamed',
        meaning: { uz: 'uyalgan', ru: 'пристыженный', ko: '부끄러운' },
      },
      {
        word: 'workshop',
        meaning: { uz: 'ustaxona', ru: 'мастерская', ko: '작업장, 수리점' },
      },
      {
        word: 'failure',
        meaning: { uz: 'muvaffaqiyatsizlik', ru: 'неудача', ko: '실패' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What kind of business did Timur open first?',
        options: [
          'A phone repair shop',
          'A Korean-style café',
          'A samsa stall',
          'A clothes shop',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What was Timur’s main mistake?',
        options: [
          'He opened the café too late in the year',
          'He hired too many workers',
          'He never asked local customers what they wanted',
          'He chose a place far from the college',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'What did Timur’s father want him to understand?',
        options: [
          'That he should go back to Korea',
          'That cafés are always a bad idea',
          'That the family was disappointed in him',
          'That failing is part of trying, not a reason for shame',
        ],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-b2-06',
    level: 'B2',
    order: 6,
    title: 'Three Languages Before Breakfast',
    topic: {
      uz: 'Nonushtadan oldin uch til',
      ru: 'Три языка до завтрака',
      ko: '아침 먹기 전에 세 가지 언어',
    },
    scene: 'morning',
    narrator: { id: 'dilnoza', name: 'Dilnoza' },
    sentences: [
      {
        id: 's1',
        text: 'My son Amir is five, and he already switches between Uzbek, Russian and English more easily than I switch between buses.',
        translation: {
          uz: 'O‘g‘lim Amir besh yoshda, u o‘zbek, rus va ingliz tillari o‘rtasida men avtobusdan avtobusga o‘tganimdan ham osonroq o‘tadi.',
          ru: 'Моему сыну Амиру пять лет, и он переключается между узбекским, русским и английским легче, чем я пересаживаюсь с автобуса на автобус.',
          ko: '제 아들 아미르는 다섯 살인데, 우즈베크어, 러시아어, 영어를 제가 버스 갈아타는 것보다 더 쉽게 오가요.',
        },
      },
      {
        id: 's2',
        text: 'At home we speak Uzbek, his grandmother speaks to him in Russian, and he has picked up English from cartoons and a weekend class.',
        translation: {
          uz: 'Uyda o‘zbekcha gaplashamiz, buvisi u bilan ruscha gaplashadi, inglizchani esa multfilmlar va dam olish kunlaridagi darsdan o‘rganib olgan.',
          ru: 'Дома мы говорим по-узбекски, бабушка разговаривает с ним по-русски, а английский он подхватил из мультиков и занятий по выходным.',
          ko: '집에서는 우즈베크어를 쓰고, 할머니는 아이에게 러시아어로 말씀하시고, 영어는 만화와 주말 수업에서 익혔어요.',
        },
      },
      {
        id: 's3',
        text: 'This morning, he asked for bread in Uzbek, complained about his porridge in Russian and sang to the cat in English.',
        translation: {
          uz: 'Bugun ertalab u nonni o‘zbekcha so‘radi, bo‘tqasidan ruscha noldi va mushukka inglizcha qo‘shiq aytib berdi.',
          ru: 'Сегодня утром он попросил хлеб по-узбекски, пожаловался на кашу по-русски и спел кошке песенку по-английски.',
          ko: '오늘 아침에는 빵은 우즈베크어로 달라고 하고, 죽 투정은 러시아어로 하고, 고양이에게는 영어로 노래를 불러 줬어요.',
        },
      },
      {
        id: 's4',
        text: 'When he was three, though, I was worried, because he started talking later than his cousins and often mixed all three languages in one sentence.',
        translation: {
          uz: 'Biroq u uch yoshligida men xavotirda edim, chunki u amakivachchalaridan kechroq gapira boshladi va ko‘pincha uchala tilni bitta gapda aralashtirardi.',
          ru: 'Но когда ему было три, я волновалась: он заговорил позже двоюродных братьев и часто смешивал все три языка в одном предложении.',
          ko: '그런데 아이가 세 살 때는 걱정이 많았어요. 사촌들보다 말이 늦게 트였고, 한 문장에 세 언어를 자주 섞었거든요.',
        },
      },
      {
        id: 's5',
        text: 'Some relatives advised me to choose just one language, warning that otherwise he would end up speaking none of them properly.',
        translation: {
          uz: 'Ba’zi qarindoshlar menga faqat bitta tilni tanlashni maslahat berib, aks holda u birortasida ham to‘g‘ri gapira olmay qolishini aytishdi.',
          ru: 'Некоторые родственники советовали выбрать один язык, предупреждая, что иначе он в итоге ни на одном не будет говорить как следует.',
          ko: '몇몇 친척들은 한 언어만 고르라고 조언하면서, 안 그러면 결국 어느 언어도 제대로 못 하게 될 거라고 했어요.',
        },
      },
      {
        id: 's6',
        text: 'A speech therapist I’d found through a colleague reassured me that mixing is completely normal for children who are growing up with several languages.',
        translation: {
          uz: 'Bir hamkasbim orqali topgan logoped bir nechta til bilan ulg‘ayayotgan bolalar uchun tillarni aralashtirish mutlaqo normal ekanini aytib, meni tinchlantirdi.',
          ru: 'Логопед, которого я нашла через коллегу, успокоила меня: для детей, которые растут с несколькими языками, смешивать их совершенно нормально.',
          ko: '동료를 통해 알게 된 언어치료사는 여러 언어 속에서 자라는 아이들이 말을 섞는 건 지극히 정상이라며 저를 안심시켜 줬어요.',
        },
      },
      {
        id: 's7',
        text: 'She suggested a simple rule: each adult should stick to one language with him, so that his brain can sort them out.',
        translation: {
          uz: 'U oddiy qoida taklif qildi: miyasi tillarni ajratib olishi uchun har bir katta odam u bilan faqat bitta tilda gaplashsin.',
          ru: 'Она предложила простое правило: каждый взрослый говорит с ним только на одном языке, чтобы его мозг мог разложить их по полочкам.',
          ko: '그분은 간단한 규칙을 제안했어요. 아이 머리가 언어를 정리할 수 있도록 어른마다 한 언어만 쓰라는 거였어요.',
        },
      },
      {
        id: 's8',
        text: 'It sounds easy, but it’s surprisingly hard to keep speaking Uzbek when your child answers you in Russian because it’s easier for him.',
        translation: {
          uz: 'Bu oson eshitiladi, lekin farzandingiz o‘ziga osonroq bo‘lgani uchun ruscha javob qaytarganda, o‘zbekcha gapirishda davom etish ajablanarli darajada qiyin.',
          ru: 'Звучит просто, но удивительно трудно продолжать говорить по-узбекски, когда ребёнок отвечает тебе по-русски, потому что ему так легче.',
          ko: '쉬워 보이지만, 아이가 더 편하다는 이유로 러시아어로 대답할 때 계속 우즈베크어로 말하기란 의외로 어려워요.',
        },
      },
      {
        id: 's9',
        text: 'I’ll admit that I sometimes give in, especially after a long shift at the pharmacy when I simply have no energy left.',
        translation: {
          uz: 'Tan olaman, ba’zan bo‘sh kelaman, ayniqsa dorixonadagi uzoq smenadan keyin, kuchim butunlay qolmaganda.',
          ru: 'Признаюсь, иногда я сдаюсь, особенно после длинной смены в аптеке, когда у меня просто не остаётся сил.',
          ko: '솔직히 가끔은 져 줘요. 특히 약국에서 긴 근무를 마치고 기운이 하나도 없을 때는요.',
        },
      },
      {
        id: 's10',
        text: 'What worries me most now isn’t his English, but the thought that Uzbek might become a language he understands but never chooses.',
        translation: {
          uz: 'Endi meni eng ko‘p tashvishlantirayotgani uning inglizchasi emas, balki o‘zbek tili u tushunadigan, lekin hech qachon tanlamaydigan tilga aylanib qolishi mumkinligi.',
          ru: 'Сейчас меня больше всего беспокоит не его английский, а мысль о том, что узбекский может стать языком, который он понимает, но никогда не выбирает.',
          ko: '지금 제가 가장 걱정하는 건 아이의 영어가 아니라, 우즈베크어가 알아듣기는 해도 스스로는 절대 고르지 않는 언어가 될지도 모른다는 거예요.',
        },
      },
      {
        id: 's11',
        text: 'So every evening, whatever happened during the day, I read him one Uzbek fairy tale, the same ones I loved when I was his age.',
        translation: {
          uz: 'Shuning uchun har oqshom, kun qanday o‘tgan bo‘lmasin, unga bitta o‘zbek ertagini o‘qib beraman — o‘zim uning yoshida yaxshi ko‘rgan ertaklarni.',
          ru: 'Поэтому каждый вечер, что бы ни случилось за день, я читаю ему одну узбекскую сказку — те самые, которые я любила в его возрасте.',
          ko: '그래서 매일 저녁, 하루가 어땠든 아이에게 우즈베크 옛날이야기를 하나씩 읽어 줘요. 제가 그 나이 때 좋아하던 이야기들이요.',
        },
      },
      {
        id: 's12',
        text: 'Last night, I grabbed the nearest book, which happened to be in Russian, but Amir pushed it away: “No, Mum, our language.”',
        translation: {
          uz: 'Kecha kechqurun qo‘limga eng yaqin turgan kitobni oldim, u tasodifan ruscha ekan, lekin Amir uni chetga surdi: «Yo‘q, oyi, o‘zimizning tilda».',
          ru: 'Вчера вечером я взяла первую попавшуюся книгу — она оказалась на русском, но Амир отодвинул её: «Нет, мама, на нашем языке».',
          ko: '어젯밤 손에 잡히는 대로 책을 집었는데 마침 러시아어 책이었어요. 그런데 아미르가 책을 밀어내며 말했어요. “아니, 엄마, 우리 말로.”',
        },
      },
    ],
    vocabulary: [
      {
        word: 'switches',
        meaning: {
          uz: 'almashtirmoq, o‘tmoq',
          ru: 'переключаться',
          ko: '전환하다, 바꾸다',
        },
      },
      {
        word: 'complained',
        meaning: {
          uz: 'nolimoq, shikoyat qilmoq',
          ru: 'жаловаться',
          ko: '투덜대다, 불평하다',
        },
      },
      {
        word: 'properly',
        meaning: { uz: 'to‘g‘ri, joyida', ru: 'как следует', ko: '제대로' },
      },
      {
        word: 'reassured',
        meaning: {
          uz: 'tinchlantirmoq, ko‘nglini ko‘tarmoq',
          ru: 'успокаивать, заверять',
          ko: '안심시키다',
        },
      },
      {
        word: 'surprisingly',
        meaning: {
          uz: 'ajablanarli darajada',
          ru: 'удивительно',
          ko: '의외로, 놀랍게도',
        },
      },
      {
        word: 'grabbed',
        meaning: {
          uz: 'olmoq, ushlab olmoq',
          ru: 'схватить',
          ko: '움켜쥐다, 집어 들다',
        },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'In which language does Amir’s grandmother speak to him?',
        options: ['Uzbek', 'English', 'Russian', 'Korean'],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'What did the speech therapist say about mixing languages?',
        options: [
          'It is normal for children growing up with several languages',
          'It means the child is ill',
          'It should be stopped immediately',
          'It only happens with English',
        ],
        answerIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'What does the ending of the story suggest?',
        options: [
          'Amir prefers Russian books',
          'Amir has started to see Uzbek as his own language',
          'Amir doesn’t like fairy tales',
          'Dilnoza will stop reading to him',
        ],
        answerIndex: 1,
      },
    ],
  },
  {
    code: 'en-story-b2-07',
    level: 'B2',
    order: 7,
    title: 'From the Mahalla to the Eleventh Floor',
    topic: {
      uz: 'Mahalladan o‘n birinchi qavatgacha',
      ru: 'Из махалли на одиннадцатый этаж',
      ko: '마할라에서 11층으로',
    },
    scene: 'spring',
    narrator: { id: 'rustam', name: 'Rustam' },
    sentences: [
      {
        id: 's1',
        text: 'For forty years, I lived in an old mahalla house with a courtyard, a grapevine and an apricot tree that my father had planted.',
        translation: {
          uz: 'Qirq yil davomida hovlisi, ishkomi va otam ekkan o‘rik daraxti bor eski mahalla uyida yashadim.',
          ru: 'Сорок лет я прожил в старом махаллинском доме с двором, виноградником и абрикосовым деревом, которое посадил мой отец.',
          ko: '저는 40년 동안 옛 마할라의 집에서 살았어요. 마당과 포도 덩굴, 그리고 아버지가 심으신 살구나무가 있는 집이었어요.',
        },
      },
      {
        id: 's2',
        text: 'Two years ago, our street was chosen for redevelopment, and in exchange for the house we received a flat on the eleventh floor.',
        translation: {
          uz: 'Ikki yil oldin ko‘chamiz qayta qurish uchun tanlandi va uyimiz evaziga o‘n birinchi qavatdan kvartira oldik.',
          ru: 'Два года назад нашу улицу выбрали для реконструкции, и взамен дома мы получили квартиру на одиннадцатом этаже.',
          ko: '2년 전 우리 거리가 재개발 지역으로 정해졌고, 집 대신 11층 아파트를 받았어요.',
        },
      },
      {
        id: 's3',
        text: 'My children were delighted, because the new flat has hot water all year, a lift and heating that doesn’t depend on a gas stove.',
        translation: {
          uz: 'Bolalarim juda xursand bo‘lishdi, chunki yangi kvartirada yil bo‘yi issiq suv, lift va gaz pechkasiga bog‘liq bo‘lmagan isitish bor.',
          ru: 'Мои дети были в восторге: в новой квартире круглый год есть горячая вода, лифт и отопление, которое не зависит от газовой печки.',
          ko: '아이들은 무척 기뻐했어요. 새 아파트에는 일 년 내내 온수가 나오고, 엘리베이터도 있고, 가스난로에 기대지 않아도 되는 난방이 있으니까요.',
        },
      },
      {
        id: 's4',
        text: 'I have to admit that my knees are grateful too, since in winter I no longer have to cross a frozen yard at night.',
        translation: {
          uz: 'Tan olishim kerak, tizzalarim ham minnatdor, chunki endi qishda kechasi muzlagan hovlini kesib o‘tishim shart emas.',
          ru: 'Должен признать, мои колени тоже благодарны: зимой мне больше не нужно ночью пересекать замёрзший двор.',
          ko: '솔직히 제 무릎도 고마워해요. 이제 겨울밤에 꽁꽁 언 마당을 건너가지 않아도 되니까요.',
        },
      },
      {
        id: 's5',
        text: 'Yet, for the first few months, I felt like a guest in my own life, sitting by the window with nothing to repair or water.',
        translation: {
          uz: 'Shunday bo‘lsa-da, dastlabki bir necha oy o‘zimni o‘z hayotimda mehmondek his qildim: deraza yonida o‘tirardim, na tuzatadigan, na sug‘oradigan narsa bor edi.',
          ru: 'И всё же первые несколько месяцев я чувствовал себя гостем в собственной жизни: сидел у окна, и нечего было ни чинить, ни поливать.',
          ko: '그런데도 처음 몇 달은 제 삶에서 손님이 된 기분이었어요. 고칠 것도, 물 줄 것도 없이 창가에 앉아만 있었거든요.',
        },
      },
      {
        id: 's6',
        text: 'In the old mahalla, I never needed a reason to go out; someone was always sitting on a bench by the gate, ready to talk.',
        translation: {
          uz: 'Eski mahallada tashqariga chiqish uchun hech qachon bahona kerak bo‘lmasdi; darvoza yonidagi o‘rindiqda doim gaplashishga tayyor kimdir o‘tirardi.',
          ru: 'В старой махалле мне никогда не нужен был повод, чтобы выйти: на скамейке у ворот всегда кто-то сидел, готовый поговорить.',
          ko: '옛 마할라에서는 밖에 나갈 이유가 필요 없었어요. 대문 옆 벤치에는 늘 이야기할 준비가 된 누군가가 앉아 있었거든요.',
        },
      },
      {
        id: 's7',
        text: 'Here, people nod to each other in the lift, but after a year, I still didn’t know the name of the man living next door.',
        translation: {
          uz: 'Bu yerda odamlar liftda bir-biriga bosh irg‘ab qo‘yishadi, lekin bir yil o‘tsa ham qo‘shni xonadonda yashaydigan kishining ismini bilmasdim.',
          ru: 'Здесь люди кивают друг другу в лифте, но даже через год я не знал, как зовут мужчину из соседней квартиры.',
          ko: '여기서는 엘리베이터에서 서로 고개만 까딱하고, 1년이 지나도 저는 옆집 남자의 이름조차 몰랐어요.',
        },
      },
      {
        id: 's8',
        text: 'Then last spring, I noticed that the strip of land behind our building had been left empty, with only rubbish and weeds.',
        translation: {
          uz: 'Keyin o‘tgan bahorda binomiz ortidagi bir parcha yer bo‘sh qolib, faqat axlat va begona o‘tlar bilan qoplanganini payqadim.',
          ru: 'А прошлой весной я заметил, что полоска земли за нашим домом пустует — только мусор и сорняки.',
          ko: '그러다 지난봄, 우리 건물 뒤편의 좁은 땅이 쓰레기와 잡초만 남은 채 버려져 있는 걸 봤어요.',
        },
      },
      {
        id: 's9',
        text: 'I bought a few young apricot trees at the bazaar, and while I was digging, the man from next door came down to help me.',
        translation: {
          uz: 'Bozordan bir nechta yosh o‘rik ko‘chati sotib oldim, men yer kovlayotganimda qo‘shni xonadondagi kishi yordamga tushib keldi.',
          ru: 'Я купил на базаре несколько молодых абрикосовых саженцев, и пока я копал, сосед спустился мне помочь.',
          ko: '시장에서 어린 살구나무 몇 그루를 사 왔는데, 제가 땅을 파고 있을 때 옆집 남자가 내려와서 도와줬어요.',
        },
      },
      {
        id: 's10',
        text: 'His name turned out to be Farhod, and he had grown up in a mahalla just like mine, which no longer exists.',
        translation: {
          uz: 'Uning ismi Farhod ekan, u ham xuddi menikiga o‘xshagan, hozir esa yo‘q bo‘lib ketgan mahallada ulg‘aygan ekan.',
          ru: 'Его звали Фарход, и оказалось, что он вырос в такой же махалле, как моя, которой больше нет.',
          ko: '그의 이름은 파르호드였고, 그도 저처럼 지금은 사라진 마할라에서 자랐더라고요.',
        },
      },
      {
        id: 's11',
        text: 'Now about a dozen neighbours look after the little garden, and on warm evenings someone always brings a teapot and a few cups outside.',
        translation: {
          uz: 'Endi o‘nga yaqin qo‘shni kichkina bog‘ni parvarishlaydi, iliq oqshomlarda esa kimdir doim choynak va bir nechta piyolani tashqariga olib chiqadi.',
          ru: 'Теперь около дюжины соседей ухаживают за маленьким садом, а тёплыми вечерами кто-нибудь обязательно выносит чайник и несколько пиал.',
          ko: '이제 이웃 열두어 명이 작은 정원을 함께 돌보고, 따뜻한 저녁이면 누군가 꼭 찻주전자와 찻잔 몇 개를 들고 나와요.',
        },
      },
      {
        id: 's12',
        text: 'I’ve realised that a mahalla isn’t really about houses; it’s about people who choose to stop and sit down together.',
        translation: {
          uz: 'Mahalla aslida uylar emas, balki to‘xtab, birga o‘tirishni tanlagan odamlar ekanini angladim.',
          ru: 'Я понял, что махалля — это на самом деле не дома, а люди, которые решают остановиться и посидеть вместе.',
          ko: '마할라는 사실 집이 아니라, 잠시 멈춰 함께 앉기로 한 사람들이라는 걸 깨달았어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'courtyard',
        meaning: { uz: 'hovli', ru: 'двор', ko: '안마당' },
      },
      {
        word: 'redevelopment',
        meaning: {
          uz: 'qayta qurish',
          ru: 'реконструкция, перестройка',
          ko: '재개발',
        },
      },
      {
        word: 'delighted',
        meaning: { uz: 'juda xursand', ru: 'в восторге', ko: '아주 기쁜' },
      },
      {
        word: 'grateful',
        meaning: { uz: 'minnatdor', ru: 'благодарный', ko: '고마워하는' },
      },
      {
        word: 'rubbish',
        meaning: { uz: 'axlat', ru: 'мусор', ko: '쓰레기' },
      },
      {
        word: 'digging',
        meaning: { uz: 'kovlamoq, qazimoq', ru: 'копать', ko: '(땅을) 파다' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Why were Rustam’s children happy about the new flat?',
        options: [
          'It is closer to their work',
          'It has hot water, a lift and better heating',
          'It has a large private garden',
          'It is in the same old mahalla',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What did Rustam plant behind the building?',
        options: ['Grapevines', 'Flowers', 'Vegetables', 'Apricot trees'],
        answerIndex: 3,
      },
      {
        id: 'q3',
        prompt: 'What did Rustam miss most after moving?',
        options: [
          'The sense of community with his neighbours',
          'His old furniture',
          'A view of the mountains',
          'The noise of the street',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-b2-08',
    level: 'B2',
    order: 8,
    title: 'A Night in the Emergency Room',
    topic: {
      uz: 'Shoshilinch yordam bo‘limida bir kecha',
      ru: 'Ночь в приёмном отделении',
      ko: '응급실에서의 하룻밤',
    },
    scene: 'snow',
    narrator: { id: 'malika', name: 'Malika' },
    sentences: [
      {
        id: 's1',
        text: 'As a third-year medical student in Samarkand, I spent my first night shift in a hospital emergency room last January.',
        translation: {
          uz: 'O‘tgan yanvarda Samarqanddagi uchinchi kurs tibbiyot talabasi sifatida shifoxonaning shoshilinch yordam bo‘limida ilk tungi navbatchiligimni o‘tkazdim.',
          ru: 'Прошлым январём я, студентка третьего курса медицинского в Самарканде, провела свою первую ночную смену в приёмном отделении больницы.',
          ko: '지난 1월, 사마르칸트의 의대 3학년인 저는 병원 응급실에서 처음으로 야간 근무를 했어요.',
        },
      },
      {
        id: 's2',
        text: 'It had snowed heavily all afternoon, and the doctor in charge warned me that icy pavements always keep the team busy until dawn.',
        translation: {
          uz: 'Tushdan keyin to‘xtovsiz qalin qor yoqqan edi, navbatchi shifokor esa muzlagan yo‘laklar jamoani doim tonggacha band qilishini aytib, meni ogohlantirdi.',
          ru: 'Весь день после обеда шёл сильный снег, и дежурный врач предупредила меня, что из-за обледеневших тротуаров работы всегда хватает до самого рассвета.',
          ko: '오후 내내 눈이 많이 내렸고, 담당 의사 선생님은 길이 얼면 늘 새벽까지 바쁘다고 미리 말해 주셨어요.',
        },
      },
      {
        id: 's3',
        text: 'She was right: by midnight, we had treated three broken wrists, a feverish child and a man who had burned his hand.',
        translation: {
          uz: 'U haq edi: yarim tunga qadar biz bilagi singan uch kishini, isitmasi baland bolani va qo‘lini kuydirib olgan bir erkakni davoladik.',
          ru: 'Она оказалась права: к полуночи мы помогли троим со сломанными запястьями, ребёнку с температурой и мужчине, который обжёг руку.',
          ko: '선생님 말씀이 맞았어요. 자정까지 손목이 부러진 환자 셋, 열이 나는 아이, 손을 덴 남자를 치료했어요.',
        },
      },
      {
        id: 's4',
        text: 'I had imagined that the work would be dramatic, like in the series I used to watch, with running and shouting.',
        translation: {
          uz: 'Men bu ishni avval ko‘rib yurgan seriallarimdagidek yugur-yugur va baqir-chaqirga to‘la, hayajonli bo‘ladi deb tasavvur qilgan edim.',
          ru: 'Я представляла, что работа будет драматичной, как в сериалах, которые я раньше смотрела, — с беготнёй и криками.',
          ko: '저는 이 일이 예전에 보던 드라마처럼 뛰어다니고 소리치는 극적인 일일 거라고 상상했어요.',
        },
      },
      {
        id: 's5',
        text: 'In reality, most of it was quiet and repetitive: taking blood pressure, filling in forms and explaining the same things to worried relatives.',
        translation: {
          uz: 'Aslida esa uning katta qismi sokin va bir xil edi: qon bosimini o‘lchash, hujjatlarni to‘ldirish va xavotirdagi qarindoshlarga bir xil narsalarni tushuntirish.',
          ru: 'На деле почти всё было тихим и однообразным: измерять давление, заполнять бланки и объяснять одно и то же встревоженным родственникам.',
          ko: '실제로는 대부분 조용하고 반복적인 일이었어요. 혈압을 재고, 서류를 작성하고, 걱정하는 가족들에게 같은 설명을 되풀이하는 거요.',
        },
      },
      {
        id: 's6',
        text: 'Around three in the morning, an elderly woman was brought in by her grandson, who was so frightened that he could barely speak.',
        translation: {
          uz: 'Tungi soat uchlarda keksa bir ayolni nevarasi olib keldi, u shunchalik qo‘rqib ketgan ediki, zo‘rg‘a gapira olardi.',
          ru: 'Около трёх часов ночи внук привёз пожилую женщину; он был так напуган, что едва мог говорить.',
          ko: '새벽 세 시쯤, 손자가 할머니 한 분을 모시고 왔는데, 너무 겁에 질려서 말도 제대로 못 했어요.',
        },
      },
      {
        id: 's7',
        text: 'She had slipped on the ice outside her house and was in pain, but she kept apologising for disturbing us so late.',
        translation: {
          uz: 'U uyi oldidagi muzda sirpanib yiqilgan va og‘riq ichida edi, lekin bizni shunday kech bezovta qilgani uchun uzr so‘rashdan to‘xtamasdi.',
          ru: 'Она поскользнулась на льду возле дома, и ей было больно, но она всё извинялась, что побеспокоила нас так поздно.',
          ko: '할머니는 집 앞 빙판에서 미끄러져 아파하셨지만, 이렇게 늦게 폐를 끼쳐 미안하다는 말만 계속하셨어요.',
        },
      },
      {
        id: 's8',
        text: 'While we waited for the X-ray, I held her hand, and she told me about her late husband and her famous quince jam.',
        translation: {
          uz: 'Rentgen natijasini kutayotib, uning qo‘lini ushlab o‘tirdim, u esa menga marhum eri va mashhur behi murabbosi haqida gapirib berdi.',
          ru: 'Пока мы ждали рентген, я держала её за руку, а она рассказывала мне о покойном муже и о своём знаменитом айвовом варенье.',
          ko: '엑스레이를 기다리는 동안 제가 할머니 손을 잡고 있었는데, 할머니는 돌아가신 남편과 자랑거리인 모과잼 이야기를 해 주셨어요.',
        },
      },
      {
        id: 's9',
        text: 'Her hip turned out not to be broken, only badly bruised, and her grandson hugged the doctor as if she had saved his life.',
        translation: {
          uz: 'Ma’lum bo‘lishicha, son suyagi singmagan, faqat qattiq lat yegan ekan, nevarasi esa shifokorni xuddi uning hayotini saqlab qolgandek quchoqladi.',
          ru: 'Оказалось, что бедро не сломано, только сильный ушиб, и внук обнял врача так, будто она спасла ему жизнь.',
          ko: '다행히 고관절은 부러지지 않고 심하게 멍만 든 거였고, 손자는 마치 의사 선생님이 자기 목숨을 구해 준 것처럼 끌어안았어요.',
        },
      },
      {
        id: 's10',
        text: 'By the time my shift ended, the snow had stopped, and I was more tired than I had ever been in my life.',
        translation: {
          uz: 'Navbatchiligim tugaganda qor to‘xtagan, men esa hayotimda hech qachon bunchalik charchamagan edim.',
          ru: 'Когда смена закончилась, снег уже перестал, а я была уставшей как никогда в жизни.',
          ko: '근무가 끝났을 때 눈은 그쳐 있었고, 저는 태어나서 그렇게 피곤했던 적이 없었어요.',
        },
      },
      {
        id: 's11',
        text: 'Still, walking home through the white, silent streets, I realised that I hadn’t done anything heroic, and yet I had been useful.',
        translation: {
          uz: 'Shunga qaramay, oppoq va jimjit ko‘chalar bo‘ylab uyga qaytarkanman, hech qanday qahramonlik qilmaganimni, lekin foydali bo‘lganimni angladim.',
          ru: 'И всё же, возвращаясь домой по белым тихим улицам, я поняла, что не совершила ничего героического, но всё-таки была полезной.',
          ko: '그래도 하얗고 고요한 거리를 걸어 집에 가면서, 영웅 같은 일은 하지 않았어도 쓸모 있는 사람이었다는 걸 깨달았어요.',
        },
      },
      {
        id: 's12',
        text: 'Medicine, I’m starting to understand, is less about dramatic rescues than about patience, and sometimes simply about holding someone’s hand.',
        translation: {
          uz: 'Tushuna boshlayapmanki, tibbiyot dramatik qutqaruvlardan ko‘ra ko‘proq sabr, ba’zan esa shunchaki kimningdir qo‘lini ushlab turish ekan.',
          ru: 'Я начинаю понимать, что медицина — это не столько драматичные спасения, сколько терпение, а иногда просто умение держать кого-то за руку.',
          ko: '의학은 극적인 구조보다는 인내에 가깝고, 때로는 그저 누군가의 손을 잡아 주는 일이라는 걸 이제 조금씩 알아 가고 있어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'pavements',
        meaning: {
          uz: 'piyodalar yo‘lagi',
          ru: 'тротуар',
          ko: '인도, 보도',
        },
      },
      {
        word: 'repetitive',
        meaning: {
          uz: 'bir xil, takrorlanuvchi',
          ru: 'однообразный',
          ko: '반복적인',
        },
      },
      {
        word: 'frightened',
        meaning: { uz: 'qo‘rqib ketgan', ru: 'испуганный', ko: '겁먹은' },
      },
      {
        word: 'apologising',
        meaning: { uz: 'uzr so‘ramoq', ru: 'извиняться', ko: '사과하다' },
      },
      {
        word: 'bruised',
        meaning: {
          uz: 'lat yegan, ko‘kargan',
          ru: 'ушибленный',
          ko: '멍든',
        },
      },
      {
        word: 'patience',
        meaning: { uz: 'sabr', ru: 'терпение', ko: '인내심' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Why did the doctor expect a busy night?',
        options: [
          'There was a big football match',
          'The pavements were icy after heavy snow',
          'Many doctors were on holiday',
          'It was a public holiday',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What surprised Malika about the work?',
        options: [
          'Most of it was quiet and repetitive',
          'It was exactly like a TV series',
          'There were no patients at all',
          'The doctors shouted all the time',
        ],
        answerIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'Why did the grandson hug the doctor?',
        options: [
          'He was cold after the long wait',
          'He knew her from school',
          'He was hugely relieved that his grandmother was not seriously hurt',
          'The doctor asked him to',
        ],
        answerIndex: 2,
      },
    ],
  },
  {
    code: 'en-story-b2-09',
    level: 'B2',
    order: 9,
    title: 'The Cotton Fields of My Childhood',
    topic: {
      uz: 'Bolaligimning paxta dalalari',
      ru: 'Хлопковые поля моего детства',
      ko: '어린 시절의 목화밭',
    },
    scene: 'autumn',
    narrator: { id: 'dilnoza', name: 'Dilnoza' },
    sentences: [
      {
        id: 's1',
        text: 'Every September when I was at school, our lessons would stop for several weeks, and we were taken to the cotton fields outside our town.',
        translation: {
          uz: 'Maktabda o‘qib yurgan paytlarimda har sentyabrda darslarimiz bir necha haftaga to‘xtar, bizni esa shaharchamiz tashqarisidagi paxta dalalariga olib borishardi.',
          ru: 'Когда я училась в школе, каждый сентябрь занятия прекращались на несколько недель, и нас возили на хлопковые поля за городом.',
          ko: '제가 학교 다닐 때는 매년 9월이면 수업이 몇 주 동안 멈추고, 우리는 동네 밖 목화밭으로 보내졌어요.',
        },
      },
      {
        id: 's2',
        text: 'We left before sunrise on old buses, wrapped in scarves, with bread, tea and a cloth bag that we tied around our waists.',
        translation: {
          uz: 'Biz tong otmasdan eski avtobuslarda, ro‘mollarga o‘ranib, non, choy va beliga bog‘lab olinadigan mato xalta bilan yo‘lga chiqardik.',
          ru: 'Мы выезжали до рассвета на старых автобусах, закутанные в платки, с хлебом, чаем и холщовым мешком, который завязывали на поясе.',
          ko: '우리는 해 뜨기 전에 낡은 버스를 타고 나갔어요. 스카프를 두르고, 빵과 차, 그리고 허리에 묶는 천 자루를 챙겨서요.',
        },
      },
      {
        id: 's3',
        text: 'Each of us was given a daily target in kilograms, and the teachers wrote our numbers on a board at the edge of the field.',
        translation: {
          uz: 'Har birimizga kilogramm hisobida kunlik me’yor berilardi, o‘qituvchilar esa natijalarimizni dala chetidagi taxtaga yozib borishardi.',
          ru: 'Каждому давали дневную норму в килограммах, и учителя записывали наши цифры на доске у края поля.',
          ko: '우리 각자에게 킬로그램 단위의 하루 할당량이 주어졌고, 선생님들은 밭 가장자리 칠판에 우리 기록을 적었어요.',
        },
      },
      {
        id: 's4',
        text: 'My fingers were always scratched by the dry cotton bolls, and by evening my back ached so much that I could hardly stand up straight.',
        translation: {
          uz: 'Barmoqlarim quruq paxta chanoqlaridan doim tirnalgan bo‘lardi, kechga borib belim shunchalik og‘rirdiki, qaddimni zo‘rg‘a rostlardim.',
          ru: 'Пальцы у меня всегда были исцарапаны сухими коробочками хлопка, а к вечеру спина болела так, что я едва могла выпрямиться.',
          ko: '마른 목화 꼬투리에 손가락은 늘 긁혀 있었고, 저녁이 되면 허리가 너무 아파서 몸을 제대로 펴기도 힘들었어요.',
        },
      },
      {
        id: 's5',
        text: 'I was a slow picker, and I still remember the shame of hearing my small number read out in front of the whole class.',
        translation: {
          uz: 'Men sekin terardim va butun sinf oldida kichkina natijam o‘qib eshittirilganda his qilgan uyatimni hali ham eslayman.',
          ru: 'Я собирала медленно и до сих пор помню, как стыдно было, когда мою маленькую цифру зачитывали перед всем классом.',
          ko: '저는 손이 느렸고, 반 친구들 앞에서 제 적은 기록이 불릴 때의 창피함을 아직도 기억해요.',
        },
      },
      {
        id: 's6',
        text: 'And yet, strangely, some of my warmest memories come from those same fields, which is something I find hard to explain.',
        translation: {
          uz: 'Shunga qaramay, g‘alati tuyulsa ham, eng iliq xotiralarimning ba’zilari aynan o‘sha dalalardan qolgan va buni tushuntirish menga qiyin.',
          ru: 'И всё же, как ни странно, некоторые из самых тёплых моих воспоминаний связаны именно с этими полями, и мне трудно это объяснить.',
          ko: '그런데 이상하게도 제 가장 따뜻한 기억 몇 가지가 바로 그 밭에서 생겼어요. 설명하기가 참 어려워요.',
        },
      },
      {
        id: 's7',
        text: 'At lunch, we sat in a circle on the ground, shared whatever our mothers had packed, and laughed until our stomachs hurt.',
        translation: {
          uz: 'Tushlikda yerga davra qurib o‘tirardik, onalarimiz nima solib bergan bo‘lsa, baham ko‘rardik va qornimiz og‘riguncha kulardik.',
          ru: 'В обед мы садились в круг прямо на землю, делились тем, что положили нам мамы, и смеялись до боли в животе.',
          ko: '점심때면 땅바닥에 둥글게 앉아 엄마들이 싸 준 걸 나눠 먹고, 배가 아플 때까지 웃었어요.',
        },
      },
      {
        id: 's8',
        text: 'My best friend Gulnora, who was much faster than me, used to secretly put handfuls of her cotton into my bag when nobody was looking.',
        translation: {
          uz: 'Mendan ancha tez teradigan eng yaqin dugonam Gulnora hech kim qaramayotganda xaltamga yashirincha hovuch-hovuch paxta solib qo‘yardi.',
          ru: 'Моя лучшая подруга Гульнора, которая собирала гораздо быстрее меня, тайком подкладывала мне в мешок пригоршни своего хлопка, когда никто не видел.',
          ko: '저보다 훨씬 빨랐던 단짝 굴노라는 아무도 안 볼 때 자기 목화를 몇 줌씩 몰래 제 자루에 넣어 주곤 했어요.',
        },
      },
      {
        id: 's9',
        text: 'Today, machines do more of the work, schoolchildren spend September in their classrooms, and I think that is exactly how it should be.',
        translation: {
          uz: 'Bugun ishning ko‘proq qismini mashinalar bajaradi, maktab o‘quvchilari sentyabrni sinfxonalarida o‘tkazishadi va menimcha, aynan shunday bo‘lishi kerak.',
          ru: 'Сегодня всё больше работы выполняют машины, школьники проводят сентябрь в классах, и, по-моему, именно так и должно быть.',
          ko: '요즘은 기계가 더 많은 일을 하고, 학생들은 9월을 교실에서 보내요. 저는 바로 그래야 한다고 생각해요.',
        },
      },
      {
        id: 's10',
        text: 'I would never want my son to spend his autumns bent over cotton plants instead of sitting at a desk.',
        translation: {
          uz: 'O‘g‘limning kuz faslini parta ortida o‘tirish o‘rniga paxta ustida egilib o‘tkazishini hech qachon istamasdim.',
          ru: 'Я бы ни за что не хотела, чтобы мой сын проводил осень, согнувшись над хлопком, вместо того чтобы сидеть за партой.',
          ko: '제 아들이 책상에 앉아 있는 대신 목화 앞에 허리를 굽힌 채 가을을 보내는 건 절대 원하지 않아요.',
        },
      },
      {
        id: 's11',
        text: 'Still, when I see a cotton boll in a vase at a wedding or a café, I always think of Gulnora’s quick hands.',
        translation: {
          uz: 'Shunday bo‘lsa-da, to‘yda yoki kafeda guldondagi paxta chanog‘ini ko‘rsam, doim Gulnoraning chaqqon qo‘llarini eslayman.',
          ru: 'И всё же, когда я вижу хлопковую коробочку в вазе на свадьбе или в кафе, я всегда вспоминаю ловкие руки Гульноры.',
          ko: '그래도 결혼식장이나 카페에서 꽃병에 꽂힌 목화를 보면, 늘 굴노라의 재빠른 손이 떠올라요.',
        },
      },
      {
        id: 's12',
        text: 'I’ve come to accept that a memory can be painful and precious at the same time, and that one doesn’t cancel the other.',
        translation: {
          uz: 'Xotira bir vaqtning o‘zida ham og‘riqli, ham qadrli bo‘lishi mumkinligini, biri ikkinchisini inkor etmasligini qabul qildim.',
          ru: 'Я научилась принимать то, что воспоминание может быть одновременно болезненным и дорогим, и одно не отменяет другого.',
          ko: '기억은 아프면서도 동시에 소중할 수 있고, 하나가 다른 하나를 지우지 않는다는 걸 이제는 받아들이게 됐어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'target',
        meaning: {
          uz: 'me’yor, reja',
          ru: 'норма, план',
          ko: '목표량, 할당량',
        },
      },
      {
        word: 'scratched',
        meaning: { uz: 'tirnalgan', ru: 'исцарапанный', ko: '긁힌' },
      },
      {
        word: 'ached',
        meaning: {
          uz: 'og‘rimoq, zirqiramoq',
          ru: 'болеть, ныть',
          ko: '쑤시다, 아프다',
        },
      },
      {
        word: 'shame',
        meaning: { uz: 'uyat', ru: 'стыд', ko: '창피함, 수치심' },
      },
      {
        word: 'secretly',
        meaning: { uz: 'yashirincha', ru: 'тайком', ko: '몰래' },
      },
      {
        word: 'precious',
        meaning: { uz: 'qadrli, aziz', ru: 'дорогой, ценный', ko: '소중한' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What happened at Dilnoza’s school every September?',
        options: [
          'Students went on a trip to the mountains',
          'The school held a big festival',
          'New teachers arrived from the city',
          'Lessons stopped and students picked cotton',
        ],
        answerIndex: 3,
      },
      {
        id: 'q2',
        prompt: 'How did Gulnora help Dilnoza?',
        options: [
          'She carried her bag to the bus',
          'She secretly put some of her own cotton into Dilnoza’s bag',
          'She shared her lunch with her every day',
          'She asked the teachers to give her a lower target',
        ],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt:
          'How does Dilnoza feel about her memories of the cotton harvest?',
        options: [
          'She remembers only the happy moments',
          'She wishes her son could have the same experience',
          'They are both painful and precious to her',
          'She has almost forgotten them',
        ],
        answerIndex: 2,
      },
    ],
  },
  {
    code: 'en-story-b2-10',
    level: 'B2',
    order: 10,
    title: 'Who Is That Girl?',
    topic: {
      uz: 'Suratdagi qiz kim?',
      ru: 'Кто эта девушка на фото?',
      ko: '사진 속 이 사람은 누구?',
    },
    scene: 'night',
    narrator: { id: 'malika', name: 'Malika' },
    sentences: [
      {
        id: 's1',
        text: 'Last spring, I noticed that I was spending almost five hours a day on my phone, mostly scrolling through other people’s lives.',
        translation: {
          uz: 'O‘tgan bahorda kuniga deyarli besh soatni telefonda, asosan boshqalarning hayotini varaqlab o‘tkazayotganimni payqadim.',
          ru: 'Прошлой весной я заметила, что провожу в телефоне почти пять часов в день, в основном листая чужие жизни.',
          ko: '지난봄, 제가 하루에 거의 다섯 시간을 휴대폰으로, 그것도 주로 남의 삶을 넘겨 보며 보낸다는 걸 알게 됐어요.',
        },
      },
      {
        id: 's2',
        text: 'Every night, I would lie in bed telling myself “just five more minutes,” and suddenly it would be two in the morning.',
        translation: {
          uz: 'Har kecha to‘shakda yotib, o‘zimga «yana besh daqiqa» derdim-u, birdaniga soat tungi ikki bo‘lib qolardi.',
          ru: 'Каждую ночь я лежала в кровати, говоря себе «ещё пять минут», и вдруг оказывалось, что уже два часа ночи.',
          ko: '매일 밤 침대에 누워 “딱 5분만 더” 하다 보면 어느새 새벽 두 시가 되어 있었어요.',
        },
      },
      {
        id: 's3',
        text: 'What bothered me more than the lost sleep, though, was how I felt about myself after closing the app.',
        translation: {
          uz: 'Biroq meni yo‘qotilgan uyqudan ham ko‘ra ilovani yopgandan keyin o‘zim haqimda qanday his qilganim ko‘proq bezovta qilardi.',
          ru: 'Но больше, чем недосып, меня беспокоило то, как я ощущала себя, закрыв приложение.',
          ko: '그런데 잠을 못 자는 것보다 더 신경 쓰였던 건, 앱을 닫고 나서 저 자신에 대해 느끼는 기분이었어요.',
        },
      },
      {
        id: 's4',
        text: 'Girls my age seemed to be travelling to Dubai, opening businesses and eating breakfast in cafés, while I was revising anatomy at the kitchen table.',
        translation: {
          uz: 'Tengdosh qizlarim Dubayga sayohat qilayotgan, biznes ochayotgan va kafelarda nonushta qilayotgandek ko‘rinardi, men esa oshxona stolida anatomiyani takrorlayotgan edim.',
          ru: 'Девушки моего возраста, казалось, летали в Дубай, открывали бизнес и завтракали в кафе, а я в это время повторяла анатомию за кухонным столом.',
          ko: '제 또래 여자들은 두바이로 여행 가고, 사업을 시작하고, 카페에서 아침을 먹는 것 같은데, 저는 부엌 식탁에서 해부학을 복습하고 있었어요.',
        },
      },
      {
        id: 's5',
        text: 'Without really noticing, I started editing my photos more and more, smoothing my skin and making my face look slimmer.',
        translation: {
          uz: 'O‘zim ham sezmagan holda suratlarimni tobora ko‘proq tahrirlay boshladim: terimni silliqlab, yuzimni ozg‘inroq qilib ko‘rsatardim.',
          ru: 'Сама того не замечая, я стала всё больше редактировать свои фото: разглаживала кожу и делала лицо худее.',
          ko: '저도 모르게 사진을 점점 더 많이 보정하기 시작했어요. 피부를 매끈하게 하고 얼굴을 더 갸름해 보이게 했죠.',
        },
      },
      {
        id: 's6',
        text: 'One evening, my little sister looked over my shoulder at a picture I was about to post and asked, “Who is that girl?”',
        translation: {
          uz: 'Bir kuni kechqurun singlim yelkam osha men joylamoqchi bo‘lgan suratga qaradi-da: «Bu qiz kim?» — deb so‘radi.',
          ru: 'Однажды вечером младшая сестра заглянула мне через плечо на фото, которое я собиралась выложить, и спросила: «А кто эта девушка?»',
          ko: '어느 날 저녁, 여동생이 제 어깨 너머로 제가 올리려던 사진을 보더니 “이 언니 누구야?”라고 물었어요.',
        },
      },
      {
        id: 's7',
        text: 'She wasn’t joking, and that innocent question hurt more than any comment from a stranger could have.',
        translation: {
          uz: 'U hazillashmayotgan edi va bu beg‘ubor savol notanish odamning har qanday izohidan ham og‘irroq botdi.',
          ru: 'Она не шутила, и этот невинный вопрос задел меня сильнее, чем мог бы задеть любой комментарий незнакомца.',
          ko: '동생은 농담하는 게 아니었고, 그 순진한 질문은 낯선 사람의 어떤 댓글보다 더 아프게 다가왔어요.',
        },
      },
      {
        id: 's8',
        text: 'So I deleted the apps from my phone for a month, which turned out to be much harder than I had expected.',
        translation: {
          uz: 'Shuning uchun ilovalarni bir oyga telefonimdan o‘chirib tashladim, bu esa kutganimdan ancha qiyin bo‘lib chiqdi.',
          ru: 'Поэтому я удалила приложения с телефона на месяц, и это оказалось намного труднее, чем я ожидала.',
          ko: '그래서 한 달 동안 휴대폰에서 앱을 지웠는데, 생각보다 훨씬 어려웠어요.',
        },
      },
      {
        id: 's9',
        text: 'For the first week, I kept reaching for my phone without thinking, like someone who has given up sugar but still opens the cupboard.',
        translation: {
          uz: 'Birinchi hafta beixtiyor telefonga qo‘l cho‘zaverdim — xuddi shakarni tashlagan, lekin baribir javonni ochib qo‘yadigan odamdek.',
          ru: 'Первую неделю я машинально тянулась к телефону — как человек, который отказался от сахара, но всё равно открывает шкафчик.',
          ko: '첫 주에는 저도 모르게 자꾸 휴대폰에 손이 갔어요. 설탕을 끊었는데도 습관처럼 찬장을 여는 사람처럼요.',
        },
      },
      {
        id: 's10',
        text: 'Gradually, though, I began to sleep better, read two novels and actually call my friends instead of just liking their stories.',
        translation: {
          uz: 'Biroq asta-sekin yaxshiroq uxlay boshladim, ikkita roman o‘qidim va do‘stlarimning storislariga shunchaki layk bosish o‘rniga ularga qo‘ng‘iroq qila boshladim.',
          ru: 'Но постепенно я стала лучше спать, прочитала два романа и начала по-настоящему звонить друзьям, а не просто лайкать их сторис.',
          ko: '하지만 점점 잠도 잘 자게 됐고, 소설도 두 권 읽고, 친구들 스토리에 ‘좋아요’만 누르는 대신 실제로 전화를 걸게 됐어요.',
        },
      },
      {
        id: 's11',
        text: 'One of them admitted that her perfect-looking life online had hidden a difficult year that she simply hadn’t wanted to share.',
        translation: {
          uz: 'Ulardan biri internetdagi mukammal ko‘ringan hayoti ortida o‘zi shunchaki bo‘lishishni istamagan og‘ir bir yil yashiringanini tan oldi.',
          ru: 'Одна из них призналась, что за её идеальной на вид жизнью в сети скрывался тяжёлый год, о котором ей просто не хотелось рассказывать.',
          ko: '그중 한 친구는 온라인에서 완벽해 보이던 자기 삶 뒤에, 그냥 말하고 싶지 않았던 힘든 1년이 숨어 있었다고 털어놓았어요.',
        },
      },
      {
        id: 's12',
        text: 'I’m back on social media now, but I post less, edit nothing, and remind myself that I’m only ever seeing other people’s best moments.',
        translation: {
          uz: 'Hozir yana ijtimoiy tarmoqlardaman, lekin kamroq joylayman, hech narsani tahrirlamayman va boshqalarning faqat eng yaxshi lahzalarini ko‘rayotganimni o‘zimga eslatib turaman.',
          ru: 'Сейчас я снова в соцсетях, но публикую меньше, ничего не редактирую и напоминаю себе, что вижу у других только их лучшие моменты.',
          ko: '지금은 다시 SNS를 하지만, 덜 올리고, 보정은 전혀 안 하고, 내가 보는 건 늘 남들의 가장 좋은 순간뿐이라는 걸 스스로 되새겨요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'scrolling',
        meaning: {
          uz: 'varaqlamoq (ekranda)',
          ru: 'листать, прокручивать',
          ko: '(화면을) 넘겨 보다',
        },
      },
      {
        word: 'bothered',
        meaning: {
          uz: 'bezovta qilmoq',
          ru: 'беспокоить',
          ko: '신경 쓰이게 하다',
        },
      },
      {
        word: 'editing',
        meaning: {
          uz: 'tahrirlamoq',
          ru: 'редактировать',
          ko: '편집하다, 보정하다',
        },
      },
      {
        word: 'innocent',
        meaning: {
          uz: 'beg‘ubor, sodda',
          ru: 'невинный',
          ko: '순진한, 악의 없는',
        },
      },
      {
        word: 'stranger',
        meaning: { uz: 'notanish odam', ru: 'незнакомец', ko: '낯선 사람' },
      },
      {
        word: 'gradually',
        meaning: { uz: 'asta-sekin', ru: 'постепенно', ko: '점점, 서서히' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'How much time was Malika spending on her phone every day?',
        options: [
          'About one hour',
          'Almost five hours',
          'Around ten hours',
          'Only a few minutes',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'Why did her sister’s question hurt Malika so much?',
        options: [
          'Her sister was being rude on purpose',
          'She was tired after studying',
          'It showed that her edited photos no longer looked like her',
          'She didn’t want her sister to see her phone',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'What does Malika do differently now?',
        options: [
          'She has left social media forever',
          'She posts more photos than before',
          'She uses better filters',
          'She posts less and doesn’t edit her photos',
        ],
        answerIndex: 3,
      },
    ],
  },
];
