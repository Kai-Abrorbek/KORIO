export type ChangeTag = "new" | "improve" | "fix";

export interface ChangeEntry {
  date: string;
  items: readonly string[];
  key: string;
  version: string;
}

export const APP_VERSION = "1.2.400";

export const CHANGELOG: readonly ChangeEntry[] = [
  {
    version: "1.2.400",
    key: "v1_2_400",
    date: "2026-08-10",
    items: [
      "new|Talaffuz mashqi 120 ta koreyscha minimal juftlik bilan qaytadan yozildi.",
      "new|Akkauntni boshqarish va yordam markazi sahifalari qo‘shildi.",
      "new|Ovoz sozlamalarida balandlik, nutq tezligi va tebranishni boshqarasiz.",
      "improve|O‘quv rejimi va TOPIK darajasi akkauntda saqlanadi — qurilma almashsa ham qoladi.",
      "fix|Grammatika mashqida javob oldindan ko‘rinib qolayotgani tuzatildi.",
    ],
  },
  {
    version: "1.2.300",
    key: "v1_2_300",
    date: "2026-07-28",
    items: [
      "new|Grammatika mashqlari yo‘l xaritasiga o‘tdi. XP va mukofotlar ham beriladi.",
      "new|Bildirishnomalar markazi ochildi: do‘stlar, liga va mukofotlar bir joyda.",
      "improve|Dars sahifasida tasdiqlash tugmasi berkilib qolishi tuzatildi.",
    ],
  },
  {
    version: "1.2.200",
    key: "v1_2_200",
    date: "2026-07-14",
    items: [
      "new|Hangul slot o‘yini qo‘shildi.",
      "improve|So‘z juftlash o‘yini endi siz o‘rgangan so‘zlardan tuziladi.",
      "fix|SUPER foydalanuvchilarda energiya kamayib ketayotgani tuzatildi.",
    ],
  },
  {
    version: "1.2.100",
    key: "v1_2_100",
    date: "2026-06-30",
    items: [
      "new|Ball sahifasida bo‘limlar bo‘yicha jarayonni ko‘rasiz.",
      "improve|Hangulni endi boshlaganlar yo‘l xaritasining birinchi bosqichidan boshlaydi.",
      "fix|Tungi rejimda kartalar ko‘rinmay qolayotgani tuzatildi.",
    ],
  },
] as const;

export const TAG_LOOK: Record<ChangeTag, { background: string; color: string; label: string }> = {
  new: { background: "#D7F5E5", color: "#1DBB7F", label: "Yangi" },
  improve: { background: "#D5F0F5", color: "#45B7D1", label: "Yaxshilandi" },
  fix: { background: "#FFE3D6", color: "#FF7043", label: "Tuzatildi" },
};

export function compareVersions(a: string, b: string) {
  const left = a.split(".").map((value) => Number.parseInt(value, 10) || 0);
  const right = b.split(".").map((value) => Number.parseInt(value, 10) || 0);
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index += 1) {
    const difference = (left[index] ?? 0) - (right[index] ?? 0);
    if (difference !== 0) return difference;
  }
  return 0;
}

export function parseChange(raw: string): { tag: ChangeTag; text: string } {
  const separator = raw.indexOf("|");
  if (separator < 0) return { tag: "improve", text: raw };
  const proposed = raw.slice(0, separator) as ChangeTag;
  return {
    tag: proposed in TAG_LOOK ? proposed : "improve",
    text: raw.slice(separator + 1),
  };
}
