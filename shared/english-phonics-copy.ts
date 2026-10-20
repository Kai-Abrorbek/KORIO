import type { PhonicsLocale } from "./english-phonics";

export interface PhonicsCopy {
  title: string;
  intro: string;
  nameLabel: string;
  nameVsSound: string;
  rulesTab: string;
  practiceTab: string;
  whenLabel: string;
  examplesLabel: string;
  slow: string;
  listen: string;
  stop: string;
  exceptionsLabel: string;
  compareTitle: string;
  practiceTitle: string;
  practiceIntro: string;
  checkAnswer: string;
  correct: string;
  tryAgain: string;
  explanationLabel: string;
  resetPractice: string;
  listenAgain: string;
  disclaimer: string;
  ipaHint: string;
  close: string;
  back: string;
  previousLetter: string;
  nextLetter: string;
  audioError: string;
  mutedHint: string;
  vowels: string;
  consonants: string;
  allLetters: string;
  patternCount: string;
  letterPosition: string;
}

export const PHONICS_COPY: Record<PhonicsLocale, PhonicsCopy> = {
  ko: {
    title: "알파벳, 이제 단어로 읽기",
    intro:
      "글자 이름만 외울 필요 없어요. 주변 글자에서 힌트를 찾고, 실제 단어를 들으며 읽는 법을 익혀요.",
    nameLabel: "이 글자의 이름",
    nameVsSound:
      "이름과 단어 속 소리는 달라요. 아래에서 언제 어떤 소리가 나는지 확인해요.",
    rulesTab: "소리의 비밀",
    practiceTab: "들으며 확인",
    whenLabel: "이럴 때 이렇게 읽어요",
    examplesLabel: "단어로 들어보기",
    slow: "천천히",
    listen: "듣기",
    stop: "멈추기",
    exceptionsLabel: "이것도 알아두세요",
    compareTitle: "나란히 들으면 달라요",
    practiceTitle: "이제 구별할 수 있나요?",
    practiceIntro:
      "두 단어를 들어 보고 답을 골라요. 정답보다 소리의 차이를 알아채는 게 중요해요.",
    checkAnswer: "답 확인",
    correct: "맞았어요! 소리의 단서를 찾았네요.",
    tryAgain: "괜찮아요. 설명을 읽고 다시 들어 봐요.",
    explanationLabel: "왜 이런 소리가 날까요?",
    resetPractice: "한 번 더 해보기",
    listenAgain: "다시 듣기",
    disclaimer:
      "대표적인 미국 영어 발음으로 안내해요. 철자 규칙은 힌트이지 모든 단어에 맞는 공식은 아니에요. 지역·강세·문맥에 따라 소리가 달라지며, 기기의 음성도 조금 다를 수 있어요.",
    ipaHint:
      "/ / 안은 소리를 나타내는 국제음성기호(IPA)예요. ˈ 뒤 음절에 강세가 있어요. ∅는 해당 글자를 따로 소리 내지 않는다는 뜻이에요. 기호를 먼저 외우지 말고 단어를 들어 보세요.",
    close: "닫기",
    back: "뒤로",
    previousLetter: "이전 글자",
    nextLetter: "다음 글자",
    audioError: "지금은 소리를 재생하지 못했어요. 잠시 후 다시 눌러 주세요.",
    mutedHint:
      "소리가 안 들리면 기기의 미디어 음량과 음성 설정을 확인해 주세요.",
    vowels: "모음",
    consonants: "자음",
    allLetters: "전체 글자",
    patternCount: "소리 패턴 {{count}}개",
    letterPosition: "{{current}} / {{total}}",
  },
  en: {
    title: "From alphabet to real words",
    intro:
      "Go beyond letter names. Look for clues in nearby letters, then listen to real words and discover how to read them.",
    nameLabel: "Letter name",
    nameVsSound:
      "A letter’s name is not always its sound in a word. Explore the patterns below.",
    rulesTab: "Sound patterns",
    practiceTab: "Listen & check",
    whenLabel: "When to use this sound",
    examplesLabel: "Hear it in words",
    slow: "Slower",
    listen: "Listen",
    stop: "Stop",
    exceptionsLabel: "Worth noticing",
    compareTitle: "Hear the difference",
    practiceTitle: "Can you tell them apart?",
    practiceIntro:
      "Listen to both words and choose an answer. Noticing the sound matters more than getting it right first time.",
    checkAnswer: "Check answer",
    correct: "Yes! You found the sound clue.",
    tryAgain: "That’s okay. Read the explanation and listen again.",
    explanationLabel: "Why does it sound like this?",
    resetPractice: "Try once more",
    listenAgain: "Listen again",
    disclaimer:
      "This guide uses representative US English pronunciations. Spelling patterns are clues, not rules for every word. Accent, stress and context can change sounds; your device’s voice may differ slightly.",
    ipaHint:
      "Symbols between / / show pronunciation in the International Phonetic Alphabet (IPA). ˈ marks the stressed syllable that follows. ∅ means the letter has no separate sound. Listen first; you do not need to memorize the symbols.",
    close: "Close",
    back: "Back",
    previousLetter: "Previous letter",
    nextLetter: "Next letter",
    audioError: "Audio could not play just now. Please try again shortly.",
    mutedHint:
      "If you cannot hear anything, check your device’s media volume and voice settings.",
    vowels: "Vowels",
    consonants: "Consonants",
    allLetters: "All letters",
    patternCount: "{{count}} sound patterns",
    letterPosition: "{{current}} / {{total}}",
  },
  uz: {
    title: "Alifbodan haqiqiy so‘zlarga",
    intro:
      "Faqat harf nomlarini yodlamang. Yonidagi harflardan ishora toping, haqiqiy so‘zlarni tinglab o‘qishni o‘rganing.",
    nameLabel: "Harf nomi",
    nameVsSound:
      "Harf nomi va so‘zdagi tovushi bir xil bo‘lavermaydi. Quyidagi qoliplarni o‘rganing.",
    rulesTab: "Tovush qoliplari",
    practiceTab: "Tinglash va tekshirish",
    whenLabel: "Bu tovush qachon ishlatiladi",
    examplesLabel: "So‘zlarda tinglang",
    slow: "Sekinroq",
    listen: "Tinglash",
    stop: "To‘xtatish",
    exceptionsLabel: "Buni ham eslab qoling",
    compareTitle: "Farqini eshiting",
    practiceTitle: "Ularni ajrata olasizmi?",
    practiceIntro:
      "Ikkala so‘zni tinglab, javob tanlang. Birinchi urinishda to‘g‘ri topishdan ko‘ra tovush farqini sezish muhim.",
    checkAnswer: "Javobni tekshirish",
    correct: "To‘g‘ri! Tovush ishorasini topdingiz.",
    tryAgain: "Mayli. Izohni o‘qing va yana tinglang.",
    explanationLabel: "Nega shunday o‘qiladi?",
    resetPractice: "Yana urinib ko‘rish",
    listenAgain: "Yana tinglash",
    disclaimer:
      "Bu qo‘llanmada odatiy AQSh ingliz tili talaffuzi berilgan. Imlo qoliplari barcha so‘zlarga mos formula emas, balki ishoradir. Lahja, urg‘u va matnga qarab tovush o‘zgarishi mumkin; qurilmangiz ovozi ham biroz farqlanishi mumkin.",
    ipaHint:
      "/ / ichidagi belgilar Xalqaro fonetik alifboda (IPA) talaffuzni ko‘rsatadi. ˈ belgisidan keyingi bo‘g‘in urg‘uli. ∅ harfning alohida tovushi yo‘qligini bildiradi. Avval tinglang, belgilarni yodlash shart emas.",
    close: "Yopish",
    back: "Orqaga",
    previousLetter: "Oldingi harf",
    nextLetter: "Keyingi harf",
    audioError:
      "Hozir ovozni ijro etib bo‘lmadi. Birozdan keyin yana urinib ko‘ring.",
    mutedHint:
      "Ovoz eshitilmasa, qurilmangiz media ovozi va nutq sozlamalarini tekshiring.",
    vowels: "Unlilar",
    consonants: "Undoshlar",
    allLetters: "Barcha harflar",
    patternCount: "{{count}} ta tovush qolipi",
    letterPosition: "{{current}} / {{total}}",
  },
  ru: {
    title: "От алфавита к настоящим словам",
    intro:
      "Не ограничивайтесь названиями букв. Ищите подсказки в соседних буквах и учитесь читать, слушая настоящие слова.",
    nameLabel: "Название буквы",
    nameVsSound:
      "Название буквы не всегда совпадает с её звуком в слове. Изучите сочетания ниже.",
    rulesTab: "Звуковые модели",
    practiceTab: "Слушать и проверять",
    whenLabel: "Когда читать именно так",
    examplesLabel: "Послушайте в словах",
    slow: "Медленнее",
    listen: "Слушать",
    stop: "Остановить",
    exceptionsLabel: "Стоит запомнить",
    compareTitle: "Услышьте разницу",
    practiceTitle: "Можете их различить?",
    practiceIntro:
      "Послушайте оба слова и выберите ответ. Важнее заметить разницу в звуках, чем сразу ответить правильно.",
    checkAnswer: "Проверить ответ",
    correct: "Верно! Вы нашли звуковую подсказку.",
    tryAgain: "Ничего страшного. Прочитайте объяснение и послушайте ещё раз.",
    explanationLabel: "Почему звучит именно так?",
    resetPractice: "Попробовать ещё раз",
    listenAgain: "Послушать ещё раз",
    disclaimer:
      "Здесь представлены распространённые варианты произношения в американском английском. Орфографические модели — подсказки, а не формулы для всех слов. Звук зависит от акцента, ударения и контекста; голос устройства тоже может немного отличаться.",
    ipaHint:
      "В / / записано произношение в Международном фонетическом алфавите (IPA). ˈ стоит перед ударным слогом. ∅ означает, что буква не даёт отдельного звука. Сначала слушайте: заучивать значки необязательно.",
    close: "Закрыть",
    back: "Назад",
    previousLetter: "Предыдущая буква",
    nextLetter: "Следующая буква",
    audioError:
      "Сейчас не удалось воспроизвести звук. Попробуйте немного позже.",
    mutedHint:
      "Если звука нет, проверьте громкость мультимедиа и настройки озвучивания на устройстве.",
    vowels: "Гласные",
    consonants: "Согласные",
    allLetters: "Все буквы",
    patternCount: "Звуковых моделей: {{count}}",
    letterPosition: "{{current}} / {{total}}",
  },
};
