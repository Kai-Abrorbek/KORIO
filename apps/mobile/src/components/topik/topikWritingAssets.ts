import type { ImageSourcePropType } from "react-native";

const STIMULUS_IMAGE_ASSETS: Record<string, number> = {
  "/topik/reading/topik-ii-35-q09.png": require("../../../assets/images/topik/reading/topik-ii-35-q09.png"),
  "/topik/reading/topik-ii-35-q10.png": require("../../../assets/images/topik/reading/topik-ii-35-q10.png"),
  "/topik/reading/topik-ii-36-q09.png": require("../../../assets/images/topik/reading/topik-ii-36-q09.png"),
  "/topik/reading/topik-ii-36-q10.png": require("../../../assets/images/topik/reading/topik-ii-36-q10.png"),
  "/topik/reading/topik-ii-37-q09.png": require("../../../assets/images/topik/reading/topik-ii-37-q09.png"),
  "/topik/reading/topik-ii-37-q10.png": require("../../../assets/images/topik/reading/topik-ii-37-q10.png"),
  "/topik/reading/topik-ii-41-q09.png": require("../../../assets/images/topik/reading/topik-ii-41-q09.png"),
  "/topik/reading/topik-ii-41-q10.png": require("../../../assets/images/topik/reading/topik-ii-41-q10.png"),
  "/topik/reading/topik-ii-47-q09.png": require("../../../assets/images/topik/reading/topik-ii-47-q09.png"),
  "/topik/reading/topik-ii-47-q10.png": require("../../../assets/images/topik/reading/topik-ii-47-q10.png"),
  "/topik/reading/topik-ii-52-q09.png": require("../../../assets/images/topik/reading/topik-ii-52-q09.png"),
  "/topik/reading/topik-ii-52-q10.png": require("../../../assets/images/topik/reading/topik-ii-52-q10.png"),
  "/topik/reading/topik-ii-60-q09.png": require("../../../assets/images/topik/reading/topik-ii-60-q09.png"),
  "/topik/reading/topik-ii-60-q10.png": require("../../../assets/images/topik/reading/topik-ii-60-q10.png"),
  "/topik/reading/topik-ii-64-q09.png": require("../../../assets/images/topik/reading/topik-ii-64-q09.png"),
  "/topik/reading/topik-ii-64-q10.png": require("../../../assets/images/topik/reading/topik-ii-64-q10.png"),
  "/topik/reading/topik-ii-83-q09.png": require("../../../assets/images/topik/reading/topik-ii-83-q09.png"),
  "/topik/reading/topik-ii-83-q10.png": require("../../../assets/images/topik/reading/topik-ii-83-q10.png"),
  "/topik/reading/topik-ii-91-q09.png": require("../../../assets/images/topik/reading/topik-ii-91-q09.png"),
  "/topik/reading/topik-ii-91-q10.png": require("../../../assets/images/topik/reading/topik-ii-91-q10.png"),
  "/topik/reading/topik-ii-96-q09.png": require("../../../assets/images/topik/reading/topik-ii-96-q09.png"),
  "/topik/reading/topik-ii-96-q10.png": require("../../../assets/images/topik/reading/topik-ii-96-q10.png"),
  "/topik/reading/topik-ii-102-q09.png": require("../../../assets/images/topik/reading/topik-ii-102-q09.png"),
  "/topik/reading/topik-ii-102-q10.png": require("../../../assets/images/topik/reading/topik-ii-102-q10.png"),
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
  return STIMULUS_IMAGE_ASSETS[imageUrl] ?? { uri: imageUrl };
}
