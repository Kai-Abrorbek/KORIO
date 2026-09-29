/**
 * Live lesson turns stream as plain text so the tutor can start talking before
 * the whole reply exists. The reaction metadata the character and TTS adapter
 * need (emotion, delivery, intensity, gesture, correction) comes first, on one
 * header line, then the spoken reply follows as free text:
 *
 *   @meta {"emotion":"disbelief","delivery":"shout","intensity":0.95,...}
 *   AHHHHHHH!!! 배구리?! WHAT THE FUCK IS 배구리?! ...
 *
 * The header is optional: if the model forgets it, everything is treated as
 * speech and the reaction falls back to neutral defaults — a missing header must
 * never silence the teacher.
 */
export const LESSON_META_PREFIX = '@meta';
const MAX_HEADER_CHARS = 700;

export class LessonStreamParser {
  private head = '';
  private headDone = false;
  private meta: Record<string, unknown> | null = null;
  private spoken = '';

  /** Feed one model delta; returns the part of it that should be spoken now. */
  push(delta: string): string {
    if (this.headDone) return this.emit(delta);
    this.head += delta;
    const trimmed = this.head.trimStart();
    if (!trimmed) return '';
    const prefix = trimmed.slice(0, LESSON_META_PREFIX.length);
    if (!LESSON_META_PREFIX.startsWith(prefix)) {
      // No header at all — speak everything.
      this.headDone = true;
      return this.emit(trimmed);
    }
    const newline = trimmed.indexOf('\n');
    if (newline < 0) {
      if (trimmed.length > MAX_HEADER_CHARS) {
        this.headDone = true;
        return this.emit(trimmed);
      }
      return '';
    }
    this.headDone = true;
    this.meta = parseMetaLine(trimmed.slice(0, newline));
    return this.emit(trimmed.slice(newline + 1).trimStart());
  }

  /** Call once the model stream ends. Returns any speech still held back. */
  finish(): string {
    if (this.headDone) return '';
    this.headDone = true;
    const trimmed = this.head.trim();
    if (trimmed.startsWith(LESSON_META_PREFIX)) {
      this.meta = parseMetaLine(trimmed);
      return '';
    }
    return this.emit(trimmed);
  }

  /** True once the header line (or its absence) has been settled. */
  get headerSettled(): boolean {
    return this.headDone;
  }

  get text(): string {
    return this.spoken.trim();
  }

  get metadata(): Record<string, unknown> {
    return this.meta ?? {};
  }

  private emit(delta: string): string {
    // Markdown emphasis is never spoken and only clutters the subtitle.
    const clean = delta.replace(/[*_#`]+/g, '');
    this.spoken += clean;
    return clean;
  }
}

function parseMetaLine(line: string): Record<string, unknown> | null {
  const json = line.slice(LESSON_META_PREFIX.length).trim();
  try {
    const parsed: unknown = JSON.parse(json);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}
