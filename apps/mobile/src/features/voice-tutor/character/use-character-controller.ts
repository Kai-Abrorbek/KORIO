import { useEffect, useRef, useState } from "react";
import {
  VoiceTutorCharacterController,
  type CharacterFrame,
  type CharacterInput,
} from "./character-controller";

const INITIAL_FRAME: CharacterFrame = {
  state: "idle", mouth: "closed", eye: "open", head: "center", gesture: "none", expression: "neutral", intensity: 0,
};

export function useVoiceTutorCharacter(input: CharacterInput): CharacterFrame {
  const controller = useRef<VoiceTutorCharacterController | null>(null);
  if (!controller.current) controller.current = new VoiceTutorCharacterController();
  const inputRef = useRef(input);
  inputRef.current = input;
  const [frame, setFrame] = useState(INITIAL_FRAME);

  useEffect(() => {
    const tick = () => {
      const next = controller.current!.frame(Date.now(), inputRef.current);
      setFrame((previous) =>
        previous.state === next.state && previous.mouth === next.mouth &&
        previous.eye === next.eye && previous.head === next.head &&
        previous.gesture === next.gesture && previous.expression === next.expression &&
        previous.intensity === next.intensity ? previous : next,
      );
    };
    tick();
    const timer = setInterval(tick, 55);
    return () => clearInterval(timer);
  }, []);

  return frame;
}
