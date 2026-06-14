import { FriendsData } from "@/types/friend";

export const MOCK_FRIENDS: FriendsData = {
  following: [
    { id: "1", name: "hanjo kim", primaryFlag: "🇺🇸", level: 10 },
    { id: "2", name: "IFI", primaryFlag: "🇪🇸", level: 14 },
    { id: "3", name: "Iskandar Komiljonov" },
    { id: "4", name: "JOSH Cha", primaryFlag: "🇯🇵", level: 13 },
    {
      id: "5",
      name: "Khikmatullo Abdullaev",
      primaryFlag: "🇺🇸",
      level: 5,
    },
    { id: "6", name: "Sơn", primaryFlag: "🇺🇸", level: 25 },
    { id: "7", name: "Сулейманов Адам", primaryFlag: "🇰🇷", level: 10 },
    { id: "8", name: "凼凼", primaryFlag: "🇨🇳", level: 31 },
  ],
  followers: [
    { id: "1", name: "hanjo kim", primaryFlag: "🇺🇸", level: 10 },
    { id: "9", name: "Aziza Rakhmonova", primaryFlag: "🇰🇷", level: 7 },
    { id: "10", name: "DAVID Park", primaryFlag: "🇺🇸", level: 22 },
  ],
};
