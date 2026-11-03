const ko = {
  title: "단어가 내 것이 됐어요!",
  browseTitle: "한 묶음 더 익혔어요!",
  subtitle: "뜻을 보고 직접 떠올린 단어들, 한 걸음 더 오래 기억할 거예요.",
  browseSubtitle:
    "오늘 만난 단어들이 모였어요. 기억을 확인하고 싶을 때 다시 연습해요.",
  viewed: "살펴본 단어",
  practiced: "떠올린 단어",
  continue: "학습 마치기",
  reviewAgain: "한 번 더 연습",
  close: "닫기",
};

type Copy = { [Key in keyof typeof ko]: string };

const en: Copy = {
  title: "You made these words yours!",
  browseTitle: "One more set explored!",
  subtitle:
    "You recalled them from their meanings. That is one more step toward remembering.",
  browseSubtitle:
    "Your words have come together. Practice again whenever you want to test your memory.",
  viewed: "Words explored",
  practiced: "Words recalled",
  continue: "Finish studying",
  reviewAgain: "Practice again",
  close: "Close",
};

const uz: Copy = {
  title: "Bu so‘zlar endi sizniki!",
  browseTitle: "Yana bir to‘plamni ko‘rdingiz!",
  subtitle:
    "Ma’nosiga qarab so‘zlarni esladingiz. Bu ularni yodda saqlash sari yana bir qadam.",
  browseSubtitle:
    "Bugungi so‘zlar bir joyga jamlandi. Xotirangizni tekshirish uchun yana mashq qiling.",
  viewed: "Ko‘rilgan so‘zlar",
  practiced: "Eslangan so‘zlar",
  continue: "O‘rganishni yakunlash",
  reviewAgain: "Yana mashq qilish",
  close: "Yopish",
};

const ru: Copy = {
  title: "Эти слова теперь ваши!",
  browseTitle: "Ещё один набор пройден!",
  subtitle:
    "Вы вспомнили слова по их значениям. Это ещё один шаг к прочным знаниям.",
  browseSubtitle:
    "Сегодняшние слова собраны вместе. Потренируйтесь снова, когда захотите проверить память.",
  viewed: "Просмотрено слов",
  practiced: "Вспомнено слов",
  continue: "Завершить обучение",
  reviewAgain: "Ещё раз",
  close: "Закрыть",
};

export const wordStudyFinish = { ko, en, uz, ru };
