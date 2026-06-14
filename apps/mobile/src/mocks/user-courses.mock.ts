import { EnrolledCourse } from "@/types/user-courses";

export const MOCK_HANJO_COURSES: EnrolledCourse[] = [
  {
    id: "english",
    nameKey: "userCourses.list.english",
    flag: "🇺🇸",
    xp: 11746,
  },
  {
    id: "chess",
    nameKey: "userCourses.list.chess",
    iconName: "chess-king",
    iconBgColor: "#1DBB7F",
    xp: 8908,
  },
  {
    id: "spanish",
    nameKey: "userCourses.list.spanish",
    flag: "🇪🇸",
    xp: 1662,
  },
];
