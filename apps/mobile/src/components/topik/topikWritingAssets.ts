import type { ImageSourcePropType } from "react-native";

const WRITING_CHART_ASSETS: Record<string, number> = {
  "/topik/writing/topik-ii-35-q53.png": require("../../../assets/images/topik/writing/topik-ii-35-q53.png"),
  "/topik/writing/topik-ii-36-q53.png": require("../../../assets/images/topik/writing/topik-ii-36-q53.png"),
  "/topik/writing/topik-ii-37-q53.png": require("../../../assets/images/topik/writing/topik-ii-37-q53.png"),
  "/topik/writing/topik-ii-41-q53.png": require("../../../assets/images/topik/writing/topik-ii-41-q53.png"),
  "/topik/writing/topik-ii-47-q53.png": require("../../../assets/images/topik/writing/topik-ii-47-q53.png"),
  "/topik/writing/topik-ii-52-q53.png": require("../../../assets/images/topik/writing/topik-ii-52-q53.png"),
  "/topik/writing/topik-ii-60-q53.png": require("../../../assets/images/topik/writing/topik-ii-60-q53.png"),
  "/topik/writing/topik-ii-64-q53.png": require("../../../assets/images/topik/writing/topik-ii-64-q53.png"),
  "/topik/writing/topik-ii-83-q53.png": require("../../../assets/images/topik/writing/topik-ii-83-q53.png"),
  "/topik/writing/topik-ii-91-q53.png": require("../../../assets/images/topik/writing/topik-ii-91-q53.png"),
  "/topik/writing/topik-ii-96-q53.png": require("../../../assets/images/topik/writing/topik-ii-96-q53.png"),
  "/topik/writing/topik-ii-102-q53.png": require("../../../assets/images/topik/writing/topik-ii-102-q53.png"),
};

export function topikStimulusImageSource(
  imageUrl: string,
): ImageSourcePropType {
  return WRITING_CHART_ASSETS[imageUrl] ?? { uri: imageUrl };
}
