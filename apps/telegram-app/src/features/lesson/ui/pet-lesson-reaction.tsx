import { isPet, petSrc, petStage } from "../../../shared/ui/avatar-pet";
import type { AnswerState } from "../model/lesson";
import styles from "./pet-lesson-reaction.module.css";

/** Cosmetic answer feedback only; review-star awarding stays in the lesson flow. */
export function PetLessonReaction({
  pet,
  streak,
  state,
  recovered,
}: {
  pet?: string | null;
  streak?: number | null;
  state: AnswerState;
  recovered?: boolean;
}) {
  if (!isPet(pet)) return null;
  return (
    <span aria-label={recovered ? "✦ +1" : undefined} className={styles.wrap}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden="true"
        className={`${styles.pet} ${state === "correct" ? styles.correct : styles.wrong}`}
        draggable={false}
        src={petSrc(pet, petStage(streak))}
      />
      {recovered ? <b className={styles.star}>✦ +1</b> : null}
    </span>
  );
}
