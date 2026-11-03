import { Composition } from "remotion";
import { CafeGrammar, TOTAL_FRAMES } from "./CafeGrammar";

export function GrammarRoot() {
  return <Composition id="CafeEvsEse" component={CafeGrammar} durationInFrames={TOTAL_FRAMES} fps={30} width={1080} height={1920} />;
}
