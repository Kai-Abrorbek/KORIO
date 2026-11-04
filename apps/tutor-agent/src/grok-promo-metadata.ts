import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";

export const GROK_PROMO_VOICES = ["eve", "ara", "rex", "sal", "leo"] as const;

const metadataSchema = z
  .object({
    version: z.literal(1),
    kind: z.literal("admin-promo-grok"),
    sessionId: z.string().uuid(),
    ownerId: z.string().min(1).max(128),
    instructions: z.string().min(1).max(24_000),
    voice: z.enum(GROK_PROMO_VOICES),
    maxDurationSec: z.number().int().min(1).max(600),
    expiresAt: z.number().int().positive(),
    signature: z.string().regex(/^[A-Za-z0-9_-]{43}$/),
  })
  .strict();

export type GrokPromoMetadata = z.infer<typeof metadataSchema>;

/** Mirrored by the isolated API module; never log metadata or its signature. */
export function grokPromoSignature(
  metadata: Omit<GrokPromoMetadata, "version" | "kind" | "signature">,
  secret: string,
): string {
  return createHmac("sha256", secret)
    .update(
      JSON.stringify([
        metadata.sessionId,
        metadata.ownerId,
        metadata.voice,
        metadata.maxDurationSec,
        metadata.expiresAt,
        metadata.instructions,
      ]),
    )
    .digest("base64url");
}

export function decodeGrokPromoMetadata(
  raw: string,
  secret: string,
  now = Math.floor(Date.now() / 1000),
): GrokPromoMetadata {
  if (!secret || raw.length > 40_000)
    throw new Error("Invalid Grok promo dispatch");
  const metadata = metadataSchema.parse(JSON.parse(raw));
  if (metadata.expiresAt <= now || metadata.expiresAt > now + 1200) {
    throw new Error("Expired Grok promo dispatch");
  }
  const expected = Buffer.from(grokPromoSignature(metadata, secret));
  const actual = Buffer.from(metadata.signature);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    throw new Error("Invalid Grok promo dispatch signature");
  }
  return metadata;
}

export function grokPromoLearnerIdentity(sessionId: string): string {
  return `grok-promo-owner-${sessionId}`;
}
