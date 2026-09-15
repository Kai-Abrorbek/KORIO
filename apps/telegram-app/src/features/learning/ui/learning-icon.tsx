import type { SVGProps } from "react";

import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import type { LearningIconName } from "../model/learning-options";

interface LearningIconProps extends SVGProps<SVGSVGElement> {
  name: LearningIconName;
  size?: number;
}

const ICONS: Record<LearningIconName, IoniconName> = {
  albums: "albums",
  barbell: "barbell",
  book: "book",
  chatbubble: "chatbubble-ellipses",
  chatbubbles: "chatbubbles",
  compass: "compass",
  construct: "construct",
  footsteps: "footsteps",
  game: "game-controller",
  headset: "headset",
  lock: "lock-closed",
  mic: "mic",
  ribbon: "ribbon",
  text: "text",
};

export function LearningIcon({ name, size = 24, ...props }: LearningIconProps) {
  return <MobileIcon name={ICONS[name]} size={size} {...props} />;
}
