import type { IoniconName } from "../../../shared/ui/mobile-icon";

export type HelpCategory = "learning" | "premium" | "account" | "etc";

export interface HelpItem {
  answer: string;
  category: HelpCategory;
  icon: IoniconName;
  id: string;
  question: string;
}

export const HELP_CATEGORIES: readonly HelpCategory[] = [
  "learning",
  "premium",
  "account",
  "etc",
];

export const HELP_CATEGORY_LABELS: Record<HelpCategory | "all", string> = {
  all: "Hammasi",
  learning: "O‘quv",
  premium: "Obuna",
  account: "Akkaunt",
  etc: "Boshqa",
};

export const HELP_CATEGORY_COLORS: Record<HelpCategory, string> = {
  learning: "#45B7D1",
  premium: "#E2A83A",
  account: "#FF9F66",
  etc: "#A78BFA",
};

export const HELP_FAQ: readonly HelpItem[] = [
  {
    id: "energy",
    category: "learning",
    icon: "flash",
    question: "Energiya qanday to‘ldiriladi?",
    answer: "Energiya vaqt o‘tishi bilan o‘zi tiklanadi. Shoshilsangiz olmosga to‘ldirasiz yoki kuniga uch martagacha bepul olishingiz mumkin. KORIO SUPER bilan energiya cheklovi umuman bo‘lmaydi.",
  },
  {
    id: "streak",
    category: "learning",
    icon: "flame",
    question: "Streak uzilib qoldi",
    answer: "Bir kun o‘tkazib yuborsangiz streak nolga tushadi. Tiklash qalamingiz bo‘lsa o‘tgan kunni qaytarish mumkin. Sozlamalardan kunlik eslatmani yoqib qo‘ying.",
  },
  {
    id: "xp",
    category: "learning",
    icon: "star",
    question: "XP qanday to‘planadi?",
    answer: "Har bir darsni tugatganingizda XP olasiz. Ketma-ket to‘g‘ri javoblar uchun kombo bonus qo‘shiladi, takrorlash va o‘yinlar ham XP beradi. Liga reytingi XP asosida tuziladi.",
  },
  {
    id: "league",
    category: "learning",
    icon: "trophy",
    question: "Ligada qanday ko‘tarilaman?",
    answer: "Bir hafta davomida yiqqan XP bo‘yicha bir ligadagilar bilan bellashasiz. Hafta oxirida yuqoridagilar keyingi darajaga chiqadi, quyidagilar tushadi. Natijani bildirishnoma orqali yuboramiz.",
  },
  {
    id: "hangul",
    category: "learning",
    icon: "text",
    question: "Hangulni umuman o‘qiy olmayman",
    answer: "Muammo emas. Yo‘l xaritasining birinchi bosqichi — hangul o‘rganish. Harflardan boshlab yozuv tartibi va o‘yinlargacha ketma-ket o‘rganasiz, istalgan payt qaytib kirishingiz mumkin.",
  },
  {
    id: "levelTest",
    category: "learning",
    icon: "speedometer",
    question: "Daraja testini qayta topshirsam bo‘ladimi?",
    answer: "Ha. Bosh sahifadagi daraja testi banneridan qayta topshirasiz. Yo‘l xaritasidagi sakrash testidan o‘tsangiz, oldingi bo‘limlarga o‘tib ketishingiz ham mumkin.",
  },
  {
    id: "superWhat",
    category: "premium",
    icon: "diamond",
    question: "KORIO SUPER nimasi bilan farq qiladi?",
    answer: "Energiya cheklovi yo‘qoladi va xohlagancha o‘qiysiz, yopiq kurslar va qo‘shimcha mashqlar ochiladi. To‘liq ro‘yxatni Premium sahifasida ko‘rasiz.",
  },
  {
    id: "trial",
    category: "premium",
    icon: "gift",
    question: "Bepul sinov bormi?",
    answer: "Ro‘yxatdan o‘tsangiz 7 kun KORIO SUPER bepul. Sinov tugagach avtomatik oddiy akkauntga qaytasiz, hech qanday to‘lov yechilmaydi.",
  },
  {
    id: "cancel",
    category: "premium",
    icon: "close-circle",
    question: "Obunani qanday bekor qilaman?",
    answer: "To‘lov App Store yoki Google Play orqali amalga oshadi, shuning uchun bekor qilishni ham o‘sha do‘kon obunalar bo‘limidan qilasiz. Akkauntni o‘chirish obunani to‘xtatmaydi.",
  },
  {
    id: "refund",
    category: "premium",
    icon: "card",
    question: "Pulni qaytarish mumkinmi?",
    answer: "To‘lovni qabul qilgan do‘konning qoidalariga bo‘ysunadi. App Store yoki Google Play’ga murojaat qiling, muammo bo‘lsa bizga ham yozing.",
  },
  {
    id: "password",
    category: "account",
    icon: "key",
    question: "Parolni unutdim",
    answer: "Kirish sahifasidagi ‘parolni tiklash’dan foydalaning. Google yoki Telegram orqali ro‘yxatdan o‘tgan bo‘lsangiz parol umuman yo‘q — o‘sha usul bilan kiring.",
  },
  {
    id: "device",
    category: "account",
    icon: "phone-portrait",
    question: "Telefonni almashtirsam natijalarim saqlanadimi?",
    answer: "Ha. Barcha natijalar akkauntda saqlanadi. Yangi qurilmada o‘sha akkaunt bilan kirsangiz davom etadi. Mehmon rejimida bo‘lsangiz, avval ro‘yxatdan o‘ting.",
  },
  {
    id: "deleteAccount",
    category: "account",
    icon: "trash",
    question: "Akkauntni o‘chirsam ma’lumotlar yo‘qoladimi?",
    answer: "Ha, o‘quv tarixi, streak, olmoslar va do‘stlar ro‘yxati butunlay o‘chadi va tiklab bo‘lmaydi. Sozlamalar > Akkauntni boshqarish bo‘limidan o‘chirasiz.",
  },
  {
    id: "offline",
    category: "etc",
    icon: "cloud-offline",
    question: "Internetsiz ishlaydimi?",
    answer: "Hozircha darslar serverdan olinadi, shuning uchun internet kerak. Oflayn rejim ustida ishlayapmiz.",
  },
  {
    id: "bug",
    category: "etc",
    icon: "bug",
    question: "Xatolik topdim",
    answer: "Quyidagi manzillarga yozing. Qaysi sahifada, nimani bosganda yuz berganini va ekran rasmini yuborsangiz, ancha tez tuzatamiz.",
  },
] as const;

export const SUPPORT = {
  email: "abror0dev@gmail.com",
  privacy: "https://korio.online/privacy",
  telegram: "https://t.me/Abror_bek_0",
  terms: "https://korio.online/terms",
} as const;
