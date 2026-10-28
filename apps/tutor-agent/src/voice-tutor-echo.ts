/**
 * The tutor hearing itself.
 *
 * On a phone speaker the tutor's voice leaks back into the learner's mic;
 * echo cancellation removes most of it, not all — least of all a shout or a
 * laugh. The leaked audio was transcribed as a learner turn, so the tutor
 * answered its own words while the learner said nothing.
 *
 * Barge-in by voice is off (see turnHandling in voice-tutor-agent.ts), so audio
 * that arrives while the tutor speaks is dropped. This guard catches the rest:
 * a turn that starts right as the tutor stops and repeats a big part of what
 * the tutor just said. A learner repeating a short phrase after "say it" is
 * neither — it comes later, and it is a small part of the tutor's line.
 */

/** Reverb and network tail after playout ends. A real reply starts later. */
export const ECHO_TAIL_MS = 700;
/** Shorter than this is a learner repeating a word, not leaked speech. */
const MIN_ECHO_CHARS = 6;
/** Share of what was heard that the tutor just said. */
const MIN_CONTAINMENT = 0.75;
/** Share of the tutor's line that the heard text spans. */
const MIN_COVERAGE = 0.4;

const squash = (text: string) =>
  text
    .toLowerCase()
    .replace(/\[[a-z][a-z' -]{0,40}\]/gi, "")
    .replace(/[^\p{L}\p{N}]+/gu, "");

function pairs(text: string): Set<string> {
  const found = new Set<string>();
  for (let i = 0; i + 1 < text.length; i++) found.add(text.slice(i, i + 2));
  return found;
}

/** Whether a transcript is mostly a chunk of something the tutor just said. */
export function soundsLikeTutor(transcript: string, spoken: string[]): boolean {
  const heard = squash(transcript);
  if (heard.length < MIN_ECHO_CHARS) return false;
  const heardPairs = pairs(heard);
  return spoken.some((line) => {
    const said = squash(line);
    if (!said) return false;
    const saidPairs = pairs(said);
    let shared = 0;
    for (const pair of heardPairs) if (saidPairs.has(pair)) shared++;
    return (
      shared / heardPairs.size >= MIN_CONTAINMENT &&
      heard.length / said.length >= MIN_COVERAGE
    );
  });
}

export class TutorEchoGuard {
  private spoken: string[] = [];
  private speaking = false;
  private stoppedAt = Number.NEGATIVE_INFINITY;
  private learnerStartedAt = Number.NEGATIVE_INFINITY;

  constructor(private readonly now: () => number = Date.now) {}

  /** What the tutor actually played out loud (not unheard drafts). */
  tutorSaid(text: string) {
    this.spoken = [...this.spoken, text].slice(-2);
  }

  agentState(state: string) {
    if (state === "speaking") this.speaking = true;
    else if (this.speaking) {
      this.speaking = false;
      this.stoppedAt = this.now();
    }
  }

  learnerState(state: string) {
    if (state === "speaking") this.learnerStartedAt = this.now();
  }

  /** The turn began while the tutor spoke or right after, and repeats its words. */
  isEcho(transcript: string): boolean {
    const overlapsTutor =
      this.speaking || this.learnerStartedAt <= this.stoppedAt + ECHO_TAIL_MS;
    return overlapsTutor && soundsLikeTutor(transcript, this.spoken);
  }
}
