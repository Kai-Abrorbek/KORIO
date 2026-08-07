import type { TopikI18nText } from '../../../topik/schemas/topik-content.schema';

type Translation = Omit<TopikI18nText, 'ko'>;

interface QuestionTranslation {
  explanation: Translation;
  clue: Translation;
  strategy?: Translation;
}

const tr = (uz: string, en: string, ru: string): Translation => ({
  uz,
  en,
  ru,
});

const QUESTION_TRANSLATIONS: Record<number, QuestionTranslation> = {
  1: {
    explanation: tr(
      'Sayohatga borish yoki uyda film ko‘rishdan birini tanlash ma’nosi bor, shuning uchun tanlovni bildiruvchi ‘-거나’ mos keladi.',
      'The sentence presents a choice between traveling and watching a movie at home, so ‘-거나’, which expresses an alternative, is correct.',
      'Предлагается выбор между поездкой и просмотром фильма дома, поэтому подходит конструкция ‘-거나’, выражающая альтернативу.',
    ),
    clue: tr(
      '‘Sayohat’ va ‘uyda film ko‘rish’ degan ikki muqobil harakat bog‘langan.',
      'The two alternative actions, ‘traveling’ and ‘watching a movie at home,’ are connected.',
      'Связаны два альтернативных действия: «поехать в путешествие» и «смотреть фильм дома».',
    ),
    strategy: tr(
      'Bo‘shliq oldi va ortidagi harakatlar tanlov, sabab yoki qarama-qarshilikdan qaysi birini bildirayotganini aniqlang.',
      'Identify whether the actions before and after the blank express a choice, cause, or contrast.',
      'Определите, выражают ли действия до и после пропуска выбор, причину или противопоставление.',
    ),
  },
  2: {
    explanation: tr(
      'Gap hayotga umumiy munosabat haqida, shuning uchun davomiy harakatni bildiruvchi ‘살아 간다’ eng tabiiy javobdir.',
      'The sentence describes a general attitude toward life, so ‘살아 간다’, which expresses an ongoing action, is the most natural answer.',
      'Речь идёт об общем отношении к жизни, поэтому наиболее естественно ‘살아 간다’, выражающее продолжающееся действие.',
    ),
    clue: tr(
      '‘Har kim’ va ‘umid bilan’ iboralari umumiy va davomiy harakatni talab qiladi.',
      'The expressions ‘everyone’ and ‘with hope’ call for a general, continuing action.',
      'Выражения «каждый» и «с надеждой» требуют общего и продолжительного действия.',
    ),
  },
  3: {
    explanation: tr(
      '‘-기만 하면’ bir voqea sodir bo‘lishi bilan bir xil natija har safar takrorlanishini bildiradi, ya’ni ‘har uchrashganda’ bilan bir xil.',
      '‘-기만 하면’ means that the same result repeats whenever something happens, so it is equivalent to ‘every time they meet.’',
      '‘-기만 하면’ означает, что один и тот же результат повторяется каждый раз, поэтому это равно «при каждой встрече».',
    ),
    clue: tr(
      'Ikki kishi har safar uchrashganda janjal takrorlanadi.',
      'The argument repeats every time the two people meet.',
      'Ссора повторяется каждый раз, когда встречаются эти два человека.',
    ),
  },
  4: {
    explanation: tr(
      '‘-거나 마찬가지이다’ amalda shunday bo‘lgan bilan deyarli bir xil degani, shu sababli ‘된 셈이다’ mos keladi.',
      '‘-거나 마찬가지이다’ means it is practically the same as having happened, so ‘된 셈이다’ is correct.',
      '‘-거나 마찬가지이다’ означает, что это почти равносильно свершившемуся факту, поэтому подходит ‘된 셈이다’.',
    ),
    clue: tr(
      'Hali rasman tasdiqlanmagan bo‘lsa-da, amalda ishga kirgan bilan bir xil ma’no bor.',
      'Although it is not officially confirmed, it effectively means the person has been hired.',
      'Хотя всё ещё не подтверждено официально, по сути это равносильно трудоустройству.',
    ),
  },
  5: {
    explanation: tr(
      'Reklama issiqni yo‘qotib, salqinlik berishini aytmoqda, demak u konditsioner haqida.',
      'The advertisement says it removes the heat and keeps you cool, so it is about an air conditioner.',
      'Реклама обещает избавить от жары и подарить прохладу, значит речь идёт о кондиционере.',
    ),
    clue: tr(
      '‘Salqin’, ‘issiq bilan xayrlashish’ — asosiy iboralar.',
      '‘Cool’ and ‘say goodbye to the heat’ are the key expressions.',
      'Ключевые выражения — «прохладно» и «попрощаться с жарой».',
    ),
  },
  6: {
    explanation: tr(
      'Telefon orqali buyurtma qilib, yangi oziq-ovqatni dasturxongacha olish mumkinligi aytilgan, demak bu supermarket reklamasi.',
      'It says fresh food can be ordered by phone and delivered to the table, so this is a supermarket advertisement.',
      'Говорится, что свежие продукты можно заказать по телефону и получить к столу, значит это реклама супермаркета.',
    ),
    clue: tr(
      'Telefon buyurtmasi, dasturxon va yangi oziq-ovqatni bir-biriga bog‘lang.',
      'Connect phone ordering, the dining table, and fresh food.',
      'Свяжите заказ по телефону, обеденный стол и свежие продукты.',
    ),
  },
  7: {
    explanation: tr(
      'Tashlab yuborilgan cho‘g‘ katta zarar keltirishi mumkinligi haqida ogohlantirilgan, demak matn yong‘inning oldini olish haqida.',
      'It warns that a discarded ember can cause major damage, so the text is about fire prevention.',
      'Текст предупреждает, что брошенный уголёк может привести к большому ущербу, поэтому речь идёт о предотвращении пожара.',
    ),
    clue: tr(
      '‘Cho‘g‘’ va ‘yoqib yuborishi mumkin’ iboralari yong‘inni ko‘rsatadi.',
      'The expressions ‘ember’ and ‘can burn’ point to a fire.',
      'Слова «уголёк» и «может сжечь» указывают на пожар.',
    ),
  },
  8: {
    explanation: tr(
      'Tekshiruvdan oldin va keyin bajarilishi kerak bo‘lgan harakatlar ko‘rsatilgan, shuning uchun bu ehtiyot choralari.',
      'It explains what to do before and after the examination, so these are precautions.',
      'Указано, что нужно соблюдать до и после обследования, поэтому это меры предосторожности.',
    ),
    clue: tr(
      '‘Mumkin emas’ va ‘saqlaning’ iboralari ogohlantirish hamda taqiqni bildiradi.',
      '‘Must not’ and ‘please avoid’ express caution and prohibition.',
      'Выражения «нельзя» и «избегайте» указывают на предупреждение и запрет.',
    ),
  },
  9: {
    explanation: tr(
      'Tanlov mazmunida ‘koreys taomlari mavzusidagi taqdimot’ deyilgan, shuning uchun Koreya taomlari haqida gapirish kerakligi to‘g‘ri.',
      'The contest description says ‘a presentation about Korean food,’ so the option stating that participants must speak about Korean food is correct.',
      'В описании конкурса указано «презентация на тему корейской кухни», поэтому верен вариант о необходимости говорить о корейской еде.',
    ),
    clue: tr(
      'E’londagi ‘Mazmun: koreys taomlari mavzusidagi taqdimot’ jumlasini tekshiring.',
      'Check the notice line, ‘Content: a presentation about Korean food.’',
      'Проверьте строку объявления: «Содержание: презентация на тему корейской кухни».',
    ),
  },
  10: {
    explanation: tr(
      'Mustaqil o‘qish 2010 va 2020-yillarda ham 4-o‘rinda, demak yolg‘iz o‘qish reytingi o‘zgarmagan.',
      'Self-study ranks fourth in both 2010 and 2020, so its ranking did not change.',
      'Самостоятельное обучение занимает 4-е место и в 2010, и в 2020 году, поэтому позиция не изменилась.',
    ),
    clue: tr(
      'Ikki yildagi ‘mustaqil o‘qish’ o‘rinlarini bevosita solishtiring.',
      'Directly compare the ‘self-study’ rankings in the two years.',
      'Непосредственно сравните место «самостоятельного обучения» в двух годах.',
    ),
  },
  11: {
    explanation: tr(
      'O‘tgan yildan keyin bu yil ham koreys filmlari e’tibor qozongani aytilgan, demak ular o‘tgan yildan beri qiziqish uyg‘otmoqda.',
      'It says Korean films received attention again this year after last year, so they have drawn interest since last year.',
      'Сказано, что корейские фильмы привлекали внимание и в прошлом, и в этом году, значит интерес сохраняется с прошлого года.',
    ),
    clue: tr(
      '‘O‘tgan yildan so‘ng bu yil ham bir nechta koreys filmi e’tibor qozondi’ jumlasini tekshiring.',
      'Check the sentence, ‘Following last year, several Korean films also received attention this year.’',
      'Найдите предложение: «Вслед за прошлым годом несколько корейских фильмов привлекли внимание и в этом году».',
    ),
  },
  12: {
    explanation: tr(
      'Yolg‘iz ovqatlanayotganda telefon yoki televizorga berilish ortiqcha yeyish odatini keltirib chiqarishi mumkinligi aytilgan, shuning uchun 4-javob to‘g‘ri.',
      'It says focusing on a phone or TV while eating alone can create a habit of overeating, so option 4 is correct.',
      'Сказано, что увлечение смартфоном или телевизором во время еды в одиночку может привести к перееданию, поэтому верен вариант 4.',
    ),
    clue: tr(
      'Oxirgi jumladagi ‘ortiqcha yeyish odati’ga e’tibor bering.',
      'Focus on ‘a habit of overeating’ in the final sentence.',
      'Обратите внимание на выражение «привычка переедать» в последнем предложении.',
    ),
  },
  13: {
    explanation: tr(
      'Avval ekologik muammo beriladi, keyin oziq-ovqat qadoqlaridagi plastik muammosi aniqlashtiriladi va natijada yeyiladigan qadoq ishlab chiqish misoliga o‘tiladi.',
      'The passage presents environmental pollution, narrows it to plastic food packaging, and then moves to edible packaging developed in response.',
      'Сначала обозначается экологическая проблема, затем уточняется проблема пластиковой упаковки и в результате приводится пример съедобной упаковки.',
    ),
    clue: tr(
      '‘Ayniqsa’ umumiy muammoni aniqlashtiradi, ‘shu sababli’ esa sababdan keyin keladi.',
      '‘In particular’ specifies the general problem, and ‘as a result’ follows the cause.',
      '«В особенности» конкретизирует общую проблему, а «в результате» следует после причины.',
    ),
    strategy: tr(
      'Ko‘rsatish olmoshlari va bog‘lovchi iboralar qaysi oldingi jumlaga ishora qilayotganini avval toping.',
      'First identify the preceding sentence referred to by demonstratives and connective expressions.',
      'Сначала найдите предыдущее предложение, на которое указывают местоимения и связующие выражения.',
    ),
  },
  14: {
    explanation: tr(
      'Jeju tosh devorlari tanishtiriladi, keyin vazifasi joyiga qarab farqlanishi aytilib, uy va sohil devorlari ketma-ket misol qilinadi.',
      'The passage introduces Jeju stone walls, explains that their function varies by location, and gives house and coastal walls as examples.',
      'Сначала представлены каменные стены Чеджу, затем сказано, что их функция зависит от места, после чего даны примеры у дома и на побережье.',
    ),
    clue: tr(
      '‘Tosh devorning vazifasi joyiga qarab farq qiladi’ jumlasidan keyin joy bo‘yicha misollar kelishi kerak.',
      'Examples by location should follow the sentence, ‘The function of a stone wall differs by location.’',
      'После фразы «Функция каменной стены зависит от места» должны идти примеры по расположению.',
    ),
    strategy: tr(
      'Mavzuni tanishtirish, mezonni berish va aniq misollar keltirish tartibini toping.',
      'Find the order of topic introduction, criterion, and specific examples.',
      'Определите порядок: введение темы, указание критерия, конкретные примеры.',
    ),
  },
  15: {
    explanation: tr(
      'Avval mashqdan keyingi yurak urishi beriladi, so‘ng mashqsiz ham tezlashishi qarama-qarshi qo‘yilib, kofein sababi va ta’siri tushuntiriladi.',
      'It starts with a fast heartbeat after exercise, contrasts it with acceleration without exercise, and then explains caffeine as the cause.',
      'Сначала описывается сердцебиение после тренировки, затем ему противопоставляется учащение без нагрузки и объясняется влияние кофеина.',
    ),
    clue: tr(
      '‘Ammo’ mashq qilingan va qilinmagan holatlarni qarama-qarshi qo‘yadi, ‘shunday’ esa oldingi vaziyatni qabul qiladi.',
      '‘However’ contrasts exercising and not exercising, while ‘like this’ refers back to the preceding situation.',
      '«Однако» противопоставляет случаи с тренировкой и без неё, а «так» отсылает к предыдущей ситуации.',
    ),
    strategy: tr(
      'Qarama-qarshilik iboralari va sabab-natija jumlalari qanday bog‘langanini tekshiring.',
      'Check how contrast expressions connect with cause-and-effect sentences.',
      'Проверьте связь выражений противопоставления с предложениями причины и следствия.',
    ),
  },
  16: {
    explanation: tr(
      'Keyin yanvardan iyungacha turli maxsus kunlarda yeyilgani aytiladi, shuning uchun ‘faqat Chusokda yeyiladigan guruch keki emas’ mos keladi.',
      'The following text says it was eaten on various special days from January to June, so ‘not a rice cake eaten only at Chuseok’ is correct.',
      'Далее сказано, что его ели в разные особые дни с января по июнь, поэтому подходит «это не рисовый пирог только для Чусока».',
    ),
    clue: tr(
      '‘Yanvardan iyungacha’ va ‘Chusokdan tashqari maxsus kunlar’ uning faqat Chusokda yeyilmaganini ko‘rsatadi.',
      '‘From January to June’ and ‘special days besides Chuseok’ show it was not eaten only at Chuseok.',
      'Фразы «с января по июнь» и «особые дни помимо Чусока» показывают, что его ели не только на Чусок.',
    ),
  },
  17: {
    explanation: tr(
      'Hamdardlik qobiliyati past odam boshqalarni maqsadiga erishish vositasi deb ko‘radi, shu bois chin munosabat qurishi qiyin.',
      'A person with low empathy treats others as tools for achieving goals, making genuine relationships difficult.',
      'Человек с низкой эмпатией воспринимает других как средство достижения цели, поэтому ему трудно строить искренние отношения.',
    ),
    clue: tr(
      '‘O‘z maqsadiga erishish uchun’ va ‘chin insoniy munosabat o‘rnatish qiyin’ iboralari salbiy qarashni talab qiladi.',
      '‘For achieving one’s own purpose’ and ‘difficult to form genuine relationships’ require a negative interpretation.',
      'Выражения «для достижения своей цели» и «трудно построить настоящие отношения» требуют отрицательной оценки.',
    ),
  },
  18: {
    explanation: tr(
      'Sog‘liqni boshqarish mahsulotlarini sotib oluvchilar ko‘paygani iste’molchilarning sog‘liq haqidagi tashvishi oshganini bildiradi.',
      'An increase in purchases of health-management products means consumers are more concerned about their health.',
      'Рост покупок товаров для контроля здоровья означает усиление беспокойства потребителей о здоровье.',
    ),
    clue: tr(
      'Sog‘liq maishiy texnikasi xaridi oshishini sog‘liq haqidagi qarash o‘zgarishi bilan bog‘lang.',
      'Connect increased purchases of health appliances with changing awareness of health.',
      'Свяжите рост покупок оздоровительной техники с изменением отношения к здоровью.',
    ),
  },
  19: {
    explanation: tr(
      'Oldingi yo‘lboshlovchi itlarni tanlash jarayoniga qaytib, bunday itlarga alohida mas’uliyat va sabr kerakligi davom ettiriladi, shuning uchun ‘이처럼’ mos.',
      'The sentence refers back to the guide-dog selection process and continues that such dogs need special responsibility and patience, so ‘이처럼’ is correct.',
      'Предложение отсылает к процессу отбора собак-поводырей и продолжает мысль об особой ответственности и терпении, поэтому подходит ‘이처럼’.',
    ),
    clue: tr(
      'Oldingi jumladagi mashq va tanlov jarayoniga qayta ishora qiluvchi bog‘lovchi ibora kerak.',
      'A connective expression is needed that points back to the training and selection process.',
      'Нужно связующее выражение, которое вновь указывает на процесс обучения и отбора.',
    ),
  },
  20: {
    explanation: tr(
      'Uy sharoitidagi mashq, yakuniy tanlov va maktab ta’limigacha yo‘lboshlovchi it bo‘lishning butun jarayoni bayon qilingan, shuning uchun 4-javob mavzu.',
      'The text explains the full process of becoming a guide dog, from home training through final selection and school, so option 4 is the topic.',
      'Описан весь путь собаки-поводыря: домашняя подготовка, окончательный отбор и обучение в школе, поэтому тема — вариант 4.',
    ),
    clue: tr(
      'Butun matn bo‘lajak yo‘lboshlovchi itning bir necha ta’lim bosqichidan o‘tishiga qaratilgan.',
      'The entire passage focuses on a prospective guide dog going through several stages of training.',
      'Весь текст посвящён тому, как будущая собака-поводырь проходит несколько этапов подготовки.',
    ),
  },
  21: {
    explanation: tr(
      'Tiqilib qolgan ertalabki yo‘lda og‘ir va noqulay holat boshdan kechirilgan, shuning uchun ‘진땀을 흘려’ mos keladi.',
      'The speaker had a difficult, troubling experience in completely blocked rush-hour traffic, so ‘진땀을 흘려’ is correct.',
      'В наглухо вставшей утренней пробке пришлось пережить тяжёлую ситуацию, поэтому подходит ‘진땀을 흘려’.',
    ),
    clue: tr(
      'Kuchli tirbandlik va qatnov azobiga mos keladigan idiomani toping.',
      'Find the idiom that fits severe traffic congestion and a painful commute.',
      'Найдите устойчивое выражение, подходящее к тяжёлой пробке и мучительной дороге на работу.',
    ),
  },
  22: {
    explanation: tr(
      'Hatto jahon kompaniyalari ham aloqa va boshqaruv muammolari sabab masofaviy ishni yo‘lda to‘xtatgan holatlar ko‘p ekani aytilgan.',
      'It says even global companies often abandoned remote work midway because of communication and management problems.',
      'Сказано, что даже мировые компании нередко отказывались от удалённой работы из-за проблем общения и управления.',
    ),
    clue: tr(
      'Oxirgi jumladagi ‘yo‘lda voz kechgan holatlar ko‘p’ iborasini tekshiring.',
      'Check the final sentence: ‘there were many cases of giving up midway.’',
      'Обратите внимание на последнюю фразу: «часто отказывались на полпути».',
    ),
  },
  23: {
    explanation: tr(
      'Bolalikda qor kuragan manzara va otasining ovozi jonli eslanmoqda, shuning uchun sog‘inch hissi ifodalangan.',
      'The speaker vividly recalls clearing snow in childhood and the father’s voice, expressing longing.',
      'Герой живо вспоминает, как убирал снег в детстве, и голос отца, поэтому выражено чувство тоски.',
    ),
    clue: tr(
      'Bolalik manzarasi va otaning ovozi qayta eslanayotgan sahna.',
      'This scene recalls a childhood landscape and the father’s voice.',
      'Это сцена воспоминания о детстве и голосе отца.',
    ),
  },
  24: {
    explanation: tr(
      'Hozir xiyobonda qor yig‘ilsa ham odamlar faqat shikoyat qilib, uni tozalamasligi ko‘p aytilgan, shuning uchun 4-javob to‘g‘ri.',
      'It says that these days people often only complain when snow piles up in alleys and do not clear it, so option 4 is correct.',
      'Сказано, что сейчас при снеге в переулках люди часто только жалуются и не убирают его, поэтому верен вариант 4.',
    ),
    clue: tr(
      'Hozirgi holatni tushuntiruvchi ‘hozirgi paytda’ iborasidan keyingi mazmunni tekshiring.',
      'Check the content after ‘these days,’ which describes the current situation.',
      'Проверьте содержание после выражения «в наши дни», описывающего нынешнюю ситуацию.',
    ),
  },
  25: {
    explanation: tr(
      '‘Sovuq’ mijozlar kamligini, ‘yetkazib berish orqali chiqish yo‘lini izlash’ esa yetkazib berishni yechim qilishni bildiradi, shuning uchun 3-javob to‘g‘ri.',
      '‘Deserted’ means there are few customers, and ‘seeking a way out through delivery’ means using delivery as a solution, so option 3 is correct.',
      '«Пустынно» означает мало посетителей, а «искать выход через доставку» — использовать доставку как решение, поэтому верен вариант 3.',
    ),
    clue: tr(
      'Sarlavhadagi ‘chiqish yo‘lini izlash’ qiyinchilikni hal qilish usulini topish haqidagi metafora.',
      '‘Seeking a way out’ in the headline is a metaphor for finding a solution to a difficulty.',
      '«Искать выход» в заголовке — метафора поиска способа решить проблему.',
    ),
  },
  26: {
    explanation: tr(
      '‘Oshpazlik dasturlari jannati’ oshpazlikka oid ko‘rsatuvlar juda ko‘pligini bildiradi, shuning uchun 2-javob sarlavhani eng yaxshi tushuntiradi.',
      '‘A paradise of cooking programs’ means there are very many cooking-related broadcasts, so option 2 best explains the headline.',
      '«Рай кулинарных программ» означает, что передач о кулинарии очень много, поэтому вариант 2 лучше всего объясняет заголовок.',
    ),
    clue: tr(
      'Sarlavhadagi ‘jannat’ biror narsaning juda mo‘l va ko‘p ekanini bildiruvchi metafora.',
      '‘Paradise’ in the headline is a metaphor meaning that something is extremely abundant.',
      '«Рай» в заголовке — метафора, означающая большое изобилие чего-либо.',
    ),
  },
  27: {
    explanation: tr(
      'Sarlavhada erkaklar uchun rangli kosmetika juda tez sotilayotgani aytilgan, demak pardoz qilib tashqi ko‘rinishiga qaraydigan erkaklar ko‘paygan.',
      'The headline says color cosmetics for men are selling extremely fast, meaning more men are using makeup and managing their appearance.',
      'Заголовок сообщает, что декоративная косметика для мужчин раскупается очень быстро, то есть всё больше мужчин следят за внешностью с помощью макияжа.',
    ),
    clue: tr(
      '‘Uchqundek sotilmoq’ mahsulot juda tez sotilishini anglatadi.',
      'The expression ‘sell like sparks’ means a product sells very quickly.',
      'Выражение «разлетаться как искры» означает, что товар продаётся очень быстро.',
    ),
  },
  28: {
    explanation: tr(
      'Kompaniya va universitetlar tarjimai holga qarab ishga olish yoki qabulni hal qilishi aytilgan, demak u natijani belgilaydigan darajada muhim.',
      'Companies and universities decide hiring or admission based on the personal statement, so an expression showing that it is decisive is correct.',
      'Компании и университеты принимают решение о найме или поступлении по мотивационному письму, поэтому оно имеет решающее значение.',
    ),
    clue: tr(
      'Keyingi jumlada ishga olish va qabul qilinadigan nomzodlar shu asosda belgilanayotgani takrorlanadi.',
      'The next sentence repeats that hiring and successful applicants are determined based on it.',
      'В следующем предложении повторяется, что на его основе решают вопрос найма и поступления.',
    ),
  },
  29: {
    explanation: tr(
      'Yuvish vositasisiz ishlatiladigan va tabiiy parchalanadigan kanop gubkasi haqida, shuning uchun bu atrof-muhitni asrash usuli.',
      'It uses a naturally decomposing hemp scrubber without detergent, so it is a way to protect the environment.',
      'Используется саморазлагающаяся мочалка из конопли без моющего средства, поэтому это способ защитить окружающую среду.',
    ),
    clue: tr(
      '‘Tabiiy parchalanish’ va ‘atrof-muhitni himoya qilish’ matnning xulosasini tashkil qiladi.',
      '‘Natural decomposition’ and ‘environmental protection’ form the conclusion of the passage.',
      '«Естественное разложение» и «защита окружающей среды» составляют вывод текста.',
    ),
  },
  30: {
    explanation: tr(
      'Miya burmalari cheklangan joyda ko‘proq asab hujayralari joylashishiga imkon beradi, demak ko‘p asab hujayralari mavjud bo‘lishi uchun kerak.',
      'Brain folds allow more nerve cells to fit in a limited space, so they exist because many nerve cells must be accommodated.',
      'Извилины позволяют разместить больше нервных клеток в ограниченном пространстве, поэтому они нужны для большого количества клеток.',
    ),
    clue: tr(
      'Oxirgi jumladagi ‘ko‘proq asab hujayralari joylasha oladi’ iborasini tekshiring.',
      'Check the final sentence: ‘more nerve cells can settle in the space.’',
      'Обратите внимание на последнюю фразу: «может разместиться больше нервных клеток».',
    ),
  },
  31: {
    explanation: tr(
      'Uy tanlash mezoniga o‘rmon va tog‘ yaqin bo‘lgan ekologik muhit qo‘shilmoqda, shuning uchun ‘ekologik omilni qo‘shib’ mos keladi.',
      'An eco-friendly environment near forests and mountains is added as a housing criterion, so ‘adding an eco-friendly factor’ is correct.',
      'К условиям выбора жилья добавляется экологичная среда рядом с лесом и горами, поэтому подходит «добавив экологический фактор».',
    ),
    clue: tr(
      '‘O‘rmon hududi’ning asosiy mazmuni tabiatga yaqin yashash muhitidir.',
      'The key idea of a ‘forest-area home’ is a nature-friendly residential environment.',
      'Главная идея жилья «рядом с лесом» — природная и экологичная среда проживания.',
    ),
  },
  32: {
    explanation: tr(
      'Manzara rasmi insonning tabiat haqidagi qarashini aks ettirishi aytilgan, demak unda tabiatga bo‘lgan nuqtayi nazar ko‘rinadi.',
      'The passage says landscape painting reflects a person’s view of nature, so it reveals a perspective on nature.',
      'Сказано, что пейзажная живопись отражает представление человека о природе, поэтому в ней проявляется взгляд на природу.',
    ),
    clue: tr(
      'Birinchi qismdagi ‘tabiat haqidagi qarashning aks etishi’ iborasini tekshiring.',
      'Check the expression ‘a reflection of one’s view of nature’ in the first part.',
      'Найдите в первой части выражение «отражение взгляда на природу».',
    ),
  },
  33: {
    explanation: tr(
      'Gripp oktabrdan maygacha ko‘p uchrashi aytilgan, shuning uchun yozda kasallanish nisbatan past.',
      'The flu rate is high from October through May, so it is relatively low in summer.',
      'Заболеваемость гриппом высока с октября по май, поэтому летом она относительно низкая.',
    ),
    clue: tr(
      'Gripp ko‘p uchraydigan davrni fasllarga aylantirib o‘ylang.',
      'Convert the period of high flu incidence into seasons.',
      'Соотнесите период высокой заболеваемости гриппом с временами года.',
    ),
  },
  34: {
    explanation: tr(
      'Ixtisoslashgan muqobil maktablar oddiy maktablar kabi rasmiy ta’lim darajasini beradi, shuning uchun 4-javob to‘g‘ri.',
      'Specialized alternative schools grant recognized academic credentials just like regular schools, so option 4 is correct.',
      'Специализированные альтернативные школы, как и обычные, дают признанное образование, поэтому верен вариант 4.',
    ),
    clue: tr(
      'Oxirgi qismdagi ixtisoslashgan muqobil maktab tavsifini tekshiring.',
      'Check the description of specialized alternative schools in the final part.',
      'Проверьте описание специализированной альтернативной школы в последней части.',
    ),
  },
  35: {
    explanation: tr(
      'Matn vebtun asosidagi filmlar asl hikoyani yetarli saqlamasligi muammosini ko‘rsatadi va asl syujetni saqlash kerak degan xulosaga keladi.',
      'The passage says webtoon films often fail to preserve the original story and concludes that the original plot should be maintained.',
      'Текст говорит, что фильмы по вебтунам недостаточно сохраняют оригинальную историю, и делает вывод о необходимости сохранить сюжет оригинала.',
    ),
    clue: tr(
      'Oxirgi jumladagi ‘asl asar syujetini o‘z holicha saqlashni xohlaydi’ iborasini tekshiring.',
      'Check the final sentence: ‘want the original story to be carried over as it is.’',
      'Обратите внимание на последнюю фразу: «хотят сохранить сюжет оригинала без изменений».',
    ),
  },
  36: {
    explanation: tr(
      'Texnologiya turli sanoatlarda ishlatilmoqda va kelajakda uy xo‘jaligigacha tarqaladi, demak uning qo‘llanish sohasi kengaymoqda.',
      'The technology is used across industries and will spread into homes, so the topic is the expansion of its applications.',
      'Технология применяется в разных отраслях и в будущем распространится на быт, поэтому тема — расширение сфер применения.',
    ),
    clue: tr(
      'Ishlab chiqarish, tibbiyot, qurilish va oziq-ovqatdan uy-ro‘zg‘or buyumlarigacha soha kengayadi.',
      'The range expands from manufacturing, medicine, construction, and food to household goods.',
      'Область применения расширяется от производства, медицины, строительства и пищевой отрасли до бытовых товаров.',
    ),
  },
  37: {
    explanation: tr(
      'G‘azabni shunchaki yutish yoki portlatish emas, uni sog‘lom ifodalash usuli kerakligi matnning asosiy fikri.',
      'The central claim is that anger should neither be suppressed nor exploded, but expressed in a healthy way.',
      'Главная мысль: гнев не нужно полностью подавлять или выплёскивать — важно выражать его здоровым способом.',
    ),
    clue: tr(
      'Oxirgi jumladagi ‘g‘azabni sog‘lom ifodalash usuli’ — xulosa.',
      '‘A healthy way to express anger’ in the final sentence is the conclusion.',
      'Выражение «здоровый способ выражать гнев» в последнем предложении является выводом.',
    ),
  },
  38: {
    explanation: tr(
      'Hech narsa qilmay o‘tirish ijodiy fikrlash va muammo yechishga yordam berishi aytilgan, demak uning bir nechta foydasi bor.',
      'The passage says spacing out helps creative thinking and problem solving, so its topic is that it has several benefits.',
      'Сказано, что безделье помогает творческому мышлению и решению проблем, поэтому тема — его разнообразная польза.',
    ),
    clue: tr(
      'Oxirida berilgan ijodkorlik va muammo yechish afzalliklarini birlashtiring.',
      'Combine the final benefits of creativity and problem solving.',
      'Объедините приведённые в конце преимущества для творчества и решения проблем.',
    ),
  },
  39: {
    explanation: tr(
      'Lotereya g‘oliblari tushlari tanishtirilib, cho‘chqa va ajdodlar tushi aniq misol qilinadi; keyingi ‘bunday tushlar’ shu ikkisini qabul qilishi kerak, demak ㄴ to‘g‘ri.',
      'After introducing lottery winners’ dreams, the text gives pig and ancestor dreams; ‘these dreams’ must refer to both, so ㄴ is correct.',
      'После упоминания снов победителей лотереи приводятся сны о свинье и предках; выражение «такие сны» должно относиться к ним, поэтому верно ㄴ.',
    ),
    clue: tr(
      'Keyingi ‘bunday tushlar’ berilgan jumladagi ikki tushga ishora qilishi kerak.',
      '‘These dreams’ in the following sentence must point to the two dreams in the given sentence.',
      'Выражение «такие сны» в следующем предложении должно указывать на два сна из вставляемого предложения.',
    ),
    strategy: tr(
      'Berilgan jumladan oldin va keyin keladigan ko‘rsatish so‘zlari hamda mavzu doirasi tabiiy bog‘lanadigan joyni toping.',
      'Find the position where references and topic scope connect naturally before and after the given sentence.',
      'Найдите место, где указательные слова и тема естественно связываются до и после данного предложения.',
    ),
  },
  40: {
    explanation: tr(
      'Berilgan jumladagi ‘bunday vaqt va tajriba’ oldingi yoshlikning tugallanmaganligi va no‘noq tajribalarini anglatadi, shuning uchun ㄷ to‘g‘ri.',
      '‘This time and experience’ refers to the preceding description of incomplete youth and clumsy experiences, so ㄷ is correct.',
      '«Такое время и опыт» относится к предыдущему описанию незавершённости молодости и неопытности, поэтому верно ㄷ.',
    ),
    clue: tr(
      '‘Bunday vaqt va tajriba’ nimaga ishora qilishini oldingi qismdan toping.',
      'Find the specific content referred to by ‘this time and experience’ in the preceding text.',
      'Найдите перед ним конкретное описание, к которому относится «такое время и опыт».',
    ),
    strategy: tr(
      'Ko‘rsatish so‘zi nimaga ishora qilishini oldingi jumladan topib, keyingi jumla mantiqini ham tekshiring.',
      'Find the referent of the demonstrative in the preceding sentence and also check the logic of the next sentence.',
      'Найдите в предыдущем предложении, на что указывает местоимение, и проверьте логику следующего предложения.',
    ),
  },
  41: {
    explanation: tr(
      'Bu jumla odamlar mosligidan taomlar mosligiga mavzuni o‘tkazadi, shuning uchun odamlar mosligi tushuntirilganidan keyingi ㄱ joyiga kiradi.',
      'The sentence shifts the topic from compatibility between people to compatibility between foods, so it belongs at ㄱ.',
      'Предложение переводит тему от совместимости людей к совместимости продуктов, поэтому его нужно вставить в позицию ㄱ.',
    ),
    clue: tr(
      '‘U’ oldingi erkak va ayol mosligiga ishora qiladi, keyingi jumladan esa taomlar mosligi boshlanadi.',
      '‘It’ refers to compatibility between a man and woman, and food compatibility begins in the next sentence.',
      '«Это» относится к совместимости мужчины и женщины, а со следующего предложения начинается тема совместимости продуктов.',
    ),
    strategy: tr(
      'Berilgan jumla oldingi va keyingi mavzuni bog‘laydigan o‘tish jumlasi ekanini tekshiring.',
      'Check whether the given sentence serves as a transition between the preceding and following topics.',
      'Проверьте, является ли данное предложение переходом между предыдущей и следующей темами.',
    ),
  },
  42: {
    explanation: tr(
      'U uzoq ishlagan, lekin nikoh va’dasi kechiktirilmoqda va sababini ham so‘ray olmaydi, shuning uchun ichki siqilish va ojizlik his qiladi.',
      'He has worked for a long time, but the marriage promise keeps being delayed and he cannot challenge the reason, so he feels frustrated.',
      'Он долго работал, но обещание свадьбы откладывается, а выяснить причину он не может, поэтому испытывает досаду и чувство тупика.',
    ),
    clue: tr(
      '‘Hech narsa qila olmay, faqat aylana beradi’ iborasi yechilmagan va tiqilib qolgan holatni bildiradi.',
      'The expression ‘unable to do anything and only going in circles’ shows an unresolved, blocked state of mind.',
      'Выражение «ничего не удаётся сделать, только ходит по кругу» передаёт чувство тупика.',
    ),
  },
  43: {
    explanation: tr(
      'Muddat belgilanmay, nikoh turli sabablar bilan surilib, ish davom ettirilmoqda; demak qaynota aniq va’dasiz ishlatgan.',
      'Because no deadline was set and the marriage was postponed for various reasons while work continued, the father-in-law made him work without a concrete promise.',
      'Срок не был установлен, свадьбу откладывали под разными предлогами, а работа продолжалась, значит тесть заставлял работать без конкретного обещания.',
    ),
    clue: tr(
      '‘Dastlabki kelishuv noto‘g‘ri edi’ va ‘muddatni aniq belgilash kerak edi’ degan pushaymonni tekshiring.',
      'Check the regret in ‘the original agreement was wrong’ and ‘we should have set a firm deadline.’',
      'Обратите внимание на сожаление: «изначальный договор был неправильным» и «нужно было установить точный срок».',
    ),
  },
  44: {
    explanation: tr(
      'Yaroqlilik muddati oz qolgan mahsulot tez orada tovar qiymatini yo‘qotadi, shuning uchun undan oldin chegirmada sotiladi.',
      'A product nearing its expiration date will soon lose its value as merchandise, so it is discounted before that happens.',
      'Товар с истекающим сроком годности скоро потеряет коммерческую ценность, поэтому до этого его продают со скидкой.',
    ),
    clue: tr(
      'Muddati yaqin mahsulotni nega tez sotish kerakligini o‘ylang.',
      'Think about why a near-expiry product must be sold quickly.',
      'Подумайте, почему товар с истекающим сроком нужно продать быстро.',
    ),
  },
  45: {
    explanation: tr(
      'Yeyish mumkin bo‘lgan muddati yaqin mahsulotni arzon olish isrof va chiqindini kamaytiradi, shuning uchun matn bunday oziq-ovqatni iste’mol qilishga undaydi.',
      'Buying edible near-expiry products at a discount reduces waste and trash, so the passage encourages their consumption.',
      'Покупка пригодных продуктов с близким сроком годности со скидкой сокращает потери и мусор, поэтому текст призывает их употреблять.',
    ),
    clue: tr(
      '‘Yeyish mumkin bo‘lsa, u chiqindi emas’ degan xulosaga e’tibor bering.',
      'Focus on the conclusion, ‘If it can be eaten, it is not waste.’',
      'Сосредоточьтесь на выводе: «Если это можно съесть, это не мусор».',
    ),
  },
  46: {
    explanation: tr(
      'Muallif kamchiliklarni tan olsa ham, huquqlar kafolati va hukmga ishonch oshishini tushuntirib, tizimni kengaytirishni taklif qiladi; demak u ijobiy natija kutmoqda.',
      'Although the author acknowledges side effects, the passage explains stronger rights and trust in verdicts and argues for expansion, showing a positive expectation.',
      'Хотя автор признаёт побочные эффекты, он говорит о защите прав и росте доверия к решениям и предлагает расширить систему, ожидая положительного результата.',
    ),
    clue: tr(
      'Oxirdagi ‘doirani yanada kengaytirish’ taklifi muallifning ijobiy munosabatini ko‘rsatadi.',
      'The final proposal to ‘expand the scope further’ shows the author’s positive attitude.',
      'Предложение в конце «ещё расширить сферу» показывает положительное отношение автора.',
    ),
  },
  47: {
    explanation: tr(
      'Fuqarolar ishtiroki hukmga ishonchsizlikni kamaytirishi va dalillar bir necha bor tekshirilishi aytilgan, shuning uchun hukmning ishonchliligi yuqori degan mazmun to‘g‘ri.',
      'Citizen participation can remove distrust in verdicts and claims and evidence are reviewed repeatedly, so the statement that verdicts are reliable is correct.',
      'Участие граждан снижает недоверие к решениям, а доводы и доказательства проверяются несколько раз, поэтому верно утверждение о высокой надёжности решения.',
    ),
    clue: tr(
      '‘Hukmga nisbatan ishonchsizlikni yo‘qotish mumkin’ jumlasini tekshiring.',
      'Check the sentence, ‘It can eliminate distrust in verdicts.’',
      'Найдите предложение: «Можно устранить недоверие к судебному решению».',
    ),
  },
  48: {
    explanation: tr(
      'Matn biometrik tasdiqlashning afzalligi va jiddiy muammosini tushuntirib, zararni oldini olish uchun qo‘shimcha choralar shartligini ta’kidlaydi.',
      'After explaining the advantages and critical problems of biometric authentication, the passage stresses that safeguards are essential.',
      'После описания преимуществ и серьёзных проблем биометрии текст подчёркивает необходимость дополнительных мер защиты.',
    ),
    clue: tr(
      'Matnning oxirgi jumlasi muallifning yakuniy maqsadini bevosita ko‘rsatadi.',
      'The final sentence directly reveals the author’s purpose.',
      'Последнее предложение прямо раскрывает итоговую цель автора.',
    ),
  },
  49: {
    explanation: tr(
      'Jarohat, kasallik yoki tug‘ma yetishmovchilik sabab tana ma’lumotini to‘g‘ri o‘qib bo‘lmaydigan odamlar uchun muqobil usul kerak.',
      'An alternative is needed for people whose biometric data cannot be read normally because of injury, illness, or congenital loss.',
      'Нужна альтернатива для людей, чьи биометрические данные нельзя нормально считать из-за травмы, болезни или врождённого дефекта.',
    ),
    clue: tr(
      'Jarohat yoki tana a’zosining yetishmasligi biometrik ma’lumot olish jarayoniga bevosita ta’sir qiladi.',
      'Injury or physical loss directly affects the process of extracting biometric information.',
      'Травма или отсутствие части тела напрямую влияет на получение биометрических данных.',
    ),
  },
  50: {
    explanation: tr(
      'Biometrik tasdiqlashning eng katta afzalligi karta kabi shaxsni tasdiqlovchi hujjat kerak emasligi, shuning uchun 3-javob to‘g‘ri.',
      'The greatest advantage of biometric authentication is that no physical ID such as a card is needed, so option 3 is correct.',
      'Главное преимущество биометрической аутентификации — отсутствие необходимости в удостоверении вроде карты, поэтому верен вариант 3.',
    ),
    clue: tr(
      'Biometrik tasdiqlashning ‘eng katta afzalligi’ni tushuntiruvchi jumlani tekshiring.',
      'Check the sentence explaining the ‘greatest advantage’ of biometric authentication.',
      'Найдите предложение, объясняющее «главное преимущество» биометрической аутентификации.',
    ),
  },
};

const COMMON_TRANSLATIONS: Record<string, Translation> = {
  '문제가 요구하는 정보를 확인한 뒤 지문의 핵심 표현과 각 보기를 비교합니다.': tr(
    'Savol nimani talab qilayotganini aniqlang, so‘ng matndagi asosiy iboralarni har bir variant bilan solishtiring.',
    'Identify what the question asks, then compare the passage’s key expressions with each option.',
    'Определите, что требуется в вопросе, затем сравните ключевые выражения текста с каждым вариантом.',
  ),
  '핵심 단서': tr('Muhim ishora', 'Key clue', 'Ключевая подсказка'),
  '문제 요구 확인': tr(
    'Savol talabini aniqlash',
    'Identify the task',
    'Определить требование задания',
  ),
  '단서와 보기 연결': tr(
    'Ishorani variant bilan bog‘lash',
    'Connect clues to options',
    'Связать подсказку с вариантами',
  ),
  '문제 유형 확인': tr(
    'Savol turini aniqlash',
    'Identify the question type',
    'Определить тип задания',
  ),
  '예: 주제, 세부 내용, 빈칸 중 무엇을 묻는지 먼저 확인합니다.': tr(
    'Misol: avval mavzu, tafsilot yoki bo‘shliqdan qaysi biri so‘ralganini aniqlang.',
    'Example: First check whether the question asks about the topic, a detail, or a blank.',
    'Пример: сначала определите, спрашивается ли тема, деталь или пропуск.',
  ),
  '핵심 단서 찾기': tr(
    'Muhim ishorani topish',
    'Find the key clue',
    'Найти ключевую подсказку',
  ),
  '보기 좁히기': tr(
    'Variantlarni qisqartirish',
    'Narrow down the options',
    'Сузить выбор вариантов',
  ),
  '지문의 핵심 단서나 문법적 연결과 맞지 않는 선택지입니다.': tr(
    'Bu variant matndagi muhim ishora yoki grammatik bog‘lanishga mos kelmaydi.',
    'This option does not match the passage’s key clue or grammatical connection.',
    'Этот вариант не соответствует ключевой подсказке текста или грамматической связи.',
  ),
};

function localized(ko: string, translation: Translation): TopikI18nText {
  return { ko, ...translation };
}

export function translateCommonText(ko: string): TopikI18nText {
  const translation = COMMON_TRANSLATIONS[ko];
  if (!translation) {
    throw new Error(`Missing TOPIK common translation: ${ko}`);
  }
  return localized(ko, translation);
}

export function translateQuestionText(
  questionNumber: number,
  field: keyof QuestionTranslation,
  ko: string,
): TopikI18nText {
  const translation = QUESTION_TRANSLATIONS[questionNumber]?.[field];
  if (!translation) {
    throw new Error(`Missing TOPIK question translation: Q${questionNumber}.${field}`);
  }
  return localized(ko, translation);
}

export function translateFocusExample(quote: string): TopikI18nText {
  return {
    ko: `예: "${quote}" 부분을 중심으로 읽습니다.`,
    uz: `Misol: "${quote}" qismiga e’tibor qaratib o‘qing.`,
    en: `Example: Focus on the part "${quote}".`,
    ru: `Пример: сосредоточьтесь на фрагменте «${quote}».`,
  };
}

export function translateConnectionExample(quote: string): TopikI18nText {
  return {
    ko: `예: "${quote}"가 단서와 어떻게 연결되는지 봅니다.`,
    uz: `Misol: "${quote}" javobi ishora bilan qanday bog‘langanini tekshiring.`,
    en: `Example: Check how "${quote}" connects to the clue.`,
    ru: `Пример: проверьте, как «${quote}» связано с подсказкой.`,
  };
}
