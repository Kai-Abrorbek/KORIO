import { useEffect, useMemo, useRef, type ComponentType } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import type { CharacterFrame } from "./character-controller";
import {
  CHARACTER_MANIFESTS,
  resolveCharacterAsset,
  type CharacterId,
} from "./character-manifest";

export interface TutorCharacterRendererProps {
  characterId: CharacterId;
  frame: CharacterFrame;
  size: number;
}

export type TutorCharacterRenderer = ComponentType<TutorCharacterRendererProps>;

/** AI lesson logic only depends on this renderer boundary, not on PNG sprites. */
export function TutorCharacter(props: TutorCharacterRendererProps) {
  return <SpriteTutorCharacterRenderer {...props} />;
}

export function SpriteTutorCharacterRenderer({ characterId, frame, size }: TutorCharacterRendererProps) {
  const manifest = CHARACTER_MANIFESTS[characterId];
  const source = useMemo(() => resolveCharacterAsset(manifest, frame), [manifest, frame]);
  const opacity = useRef(new Animated.Value(1)).current;
  const previousGesture = useRef(frame.gesture);

  useEffect(() => {
    if (previousGesture.current === frame.gesture) return;
    previousGesture.current = frame.gesture;
    opacity.setValue(0.55);
    Animated.timing(opacity, { toValue: 1, duration: 140, useNativeDriver: true }).start();
  }, [frame.gesture, opacity]);

  return (
    <View style={[s.canvas, { width: size, height: size * 16 / 9 }]} accessibilityLabel={manifest.name}>
      {source ? (
        <Animated.Image source={source} resizeMode="contain" style={[s.sprite, { opacity }]} />
      ) : (
        <View style={[s.fallback, { backgroundColor: characterId === "female_01" ? "#F7D7DC" : "#DBE9F7" }]}>
          <Text style={s.fallbackGlyph}>{characterId === "female_01" ? "♀" : "♂"}</Text>
          <Text style={s.fallbackState}>{frame.state === "speaking" || frame.state === "reacting" ? "●" : "•"}</Text>
        </View>
      )}
    </View>
  );
}

/** Preload all bundled pose sprites; unprovided frames are intentionally ignored. */
export async function preloadTutorCharacter(characterId: CharacterId): Promise<void> {
  const assets = CHARACTER_MANIFESTS[characterId].assets;
  const sources = Object.values(assets);
  await Promise.all(sources.filter((source) => source !== undefined).map(async (source) => {
    const resolved = Image.resolveAssetSource(source);
    if (resolved?.uri) await Image.prefetch(resolved.uri).catch(() => undefined);
  }));
}

const s = StyleSheet.create({
  canvas: { alignItems: "center", justifyContent: "center", overflow: "hidden" },
  sprite: { width: "100%", height: "100%" },
  fallback: { width: "58%", aspectRatio: 1, borderRadius: 999, alignItems: "center", justifyContent: "center" },
  fallbackGlyph: { fontSize: 34, fontWeight: "700", color: "#665DB2" },
  fallbackState: { fontSize: 10, color: "#665DB2", marginTop: -6 },
});
