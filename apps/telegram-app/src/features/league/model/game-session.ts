import {
  resolveGameLanguage,
  type GameLanguage,
} from "../../../../../../shared/word-games";
import { getContentLang } from "../../../shared/i18n/content-language";
import { DEFAULT_LEARNING_COURSES } from "../../learning/model/learning-options";

/** One game keeps the course and explanation language it was opened with. */
export function createGameSession(routeLanguage: unknown, activeCourse: unknown) {
  const targetLanguage = resolveGameLanguage(
    routeLanguage,
    resolveGameLanguage(activeCourse),
  );
  return {
    ...DEFAULT_LEARNING_COURSES[targetLanguage],
    lang: getContentLang(targetLanguage),
  };
}

export type GameSession = ReturnType<typeof createGameSession>;

export function gameRequestPath(path: string, session: GameSession) {
  const [pathname, search = ""] = path.split("?");
  const query = new URLSearchParams(search);
  query.set("courseId", session.courseId);
  query.set("targetLanguage", session.targetLanguage);
  query.set("lang", session.lang);
  return `${pathname}?${query.toString()}`;
}

export function gameRoute(path: string, language: GameLanguage) {
  const [pathname, search = ""] = path.split("?");
  const query = new URLSearchParams(search);
  query.set("targetLanguage", language);
  return `${pathname}?${query.toString()}`;
}
