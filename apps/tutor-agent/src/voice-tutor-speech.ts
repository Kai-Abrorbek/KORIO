/**
 * Speech performance for the live Voice Tutor worker — the TTS adapter side of
 * the reaction engine. The lesson text stays human-readable (it is also the
 * subtitle); only what goes to the voice is changed here.
 *
 * Mirrors apps/api/src/voice-tutor/personality/speech-performance.ts, which
 * does the same for the replay (다시 듣기) audio. Keep the two in step.
 */

export interface TutorSpeechMeta {
  emotion?: string;
  delivery?: string;
  intensity?: number;
}

const DELIVERY_TAGS: Record<string, string> = {
  shout: "[shouts]",
  whisper: "[whispers]",
  laugh: "[laughs]",
  dramatic: "[dramatic]",
};

/** Eleven v3/v4 audio tag that opens a reply, from the lesson's @meta line. */
export function openingAudioTag(meta?: TutorSpeechMeta): string | undefined {
  if (!meta) return undefined;
  const explicit = meta.delivery ? DELIVERY_TAGS[meta.delivery] : undefined;
  if (explicit) return explicit;
  if (meta.emotion === "laughing") return "[laughs]";
  if (
    (meta.emotion === "shocked" || meta.emotion === "disbelief") &&
    (meta.intensity ?? 0) >= 0.75
  ) {
    return "[shouts]";
  }
  return undefined;
}

const LAUGH_CHARS = /[ㅋㅎ]/;
const CRY_CHARS = /[ㅠㅜ]/;

/**
 * "ㅋㅋㅋㅋ" read aloud is "크크크크". Runs of ㅋ/ㅎ become a real laugh and
 * crying marks are dropped. Works on a stream: a run split across deltas
 * ("ㅋㅋ" + "ㅋㅋ 야") still becomes one laugh, because a trailing run is held
 * back until the next character decides it.
 */
export class LaughNotationTransformer {
  private pending = "";
  private endsWithSpace = true;

  push(delta: string): string {
    const text = this.pending + delta;
    let cut = text.length;
    while (
      cut > 0 &&
      (LAUGH_CHARS.test(text[cut - 1]) || CRY_CHARS.test(text[cut - 1]))
    ) {
      cut--;
    }
    this.pending = text.slice(cut);
    return this.join(performLaughNotation(text.slice(0, cut)));
  }

  flush(): string {
    const rest = this.join(performLaughNotation(this.pending));
    this.pending = "";
    return rest;
  }

  /** Avoid a double space where a laugh lands right after a chunk boundary. */
  private join(out: string): string {
    const text = this.endsWithSpace ? out.replace(/^[ \t]+/, "") : out;
    if (text) this.endsWithSpace = /\s$/.test(text);
    return text;
  }
}

export function performLaughNotation(text: string): string {
  return text
    .replace(/[ㅋㅎ]{2,}/g, " [laughs] ")
    .replace(/[ㅋㅎ]/g, "")
    .replace(/[ㅠㅜ]+/g, " ")
    .replace(/[ \t]{2,}/g, " ");
}

/** Only these ElevenLabs models read audio tags and keep one voice across languages. */
export const EXPRESSIVE_TTS_MODELS = [
  "eleven_v4_turbo",
  "eleven_v4",
  "eleven_v3",
] as const;

export function voiceTutorTtsModel(requested = process.env.VOICE_TUTOR_TTS_MODEL): string {
  const value = requested?.trim();
  return value && (EXPRESSIVE_TTS_MODELS as readonly string[]).includes(value)
    ? value
    : "eleven_v4_turbo";
}

/** Reads the API's NDJSON turn stream line by line. */
export class NdjsonLineReader {
  private buffered = "";
  private readonly decoder = new TextDecoder();

  push(chunk: Uint8Array | string): unknown[] {
    this.buffered +=
      typeof chunk === "string" ? chunk : this.decoder.decode(chunk, { stream: true });
    const out: unknown[] = [];
    let newline: number;
    while ((newline = this.buffered.indexOf("\n")) >= 0) {
      const line = this.buffered.slice(0, newline).trim();
      this.buffered = this.buffered.slice(newline + 1);
      if (!line) continue;
      try {
        out.push(JSON.parse(line));
      } catch {
        /* a broken line is skipped, not fatal */
      }
    }
    return out;
  }
}
