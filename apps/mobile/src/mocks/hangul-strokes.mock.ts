import { HangulStrokeChar } from "@/types/hangul";

export const HANGUL_STROKE_CHARS: HangulStrokeChar[] = [
  {
    id: "stroke-giyeok",
    char: "ㄱ",
    name: "기역",
    romanization: "g",
    strokes: [
      {
        points: [
          { x: 60, y: 80 },
          { x: 120, y: 80 },
          { x: 180, y: 80 },
          { x: 240, y: 80 },
          { x: 240, y: 140 },
          { x: 240, y: 200 },
          { x: 240, y: 260 },
        ],
      },
    ],
  },
  {
    id: "stroke-nieun",
    char: "ㄴ",
    name: "니은",
    romanization: "n",
    strokes: [
      {
        points: [
          { x: 60, y: 80 },
          { x: 60, y: 140 },
          { x: 60, y: 200 },
          { x: 60, y: 260 },
          { x: 120, y: 260 },
          { x: 180, y: 260 },
          { x: 240, y: 260 },
        ],
      },
    ],
  },
  {
    id: "stroke-digeut",
    char: "ㄷ",
    name: "디귿",
    romanization: "d",
    strokes: [
      {
        points: [
          { x: 60, y: 80 },
          { x: 120, y: 80 },
          { x: 180, y: 80 },
          { x: 240, y: 80 },
        ],
      },
      {
        points: [
          { x: 60, y: 80 },
          { x: 60, y: 170 },
          { x: 60, y: 260 },
          { x: 130, y: 260 },
          { x: 200, y: 260 },
          { x: 240, y: 260 },
        ],
      },
    ],
  },
  {
    id: "stroke-a",
    char: "ㅏ",
    name: "아",
    romanization: "a",
    strokes: [
      {
        points: [
          { x: 130, y: 50 },
          { x: 130, y: 110 },
          { x: 130, y: 170 },
          { x: 130, y: 230 },
          { x: 130, y: 280 },
        ],
      },
      {
        points: [
          { x: 130, y: 150 },
          { x: 180, y: 150 },
          { x: 230, y: 150 },
        ],
      },
    ],
  },
  {
    id: "stroke-i",
    char: "ㅣ",
    name: "이",
    romanization: "i",
    strokes: [
      {
        points: [
          { x: 150, y: 50 },
          { x: 150, y: 110 },
          { x: 150, y: 170 },
          { x: 150, y: 230 },
          { x: 150, y: 280 },
        ],
      },
    ],
  },
  {
    id: "stroke-eu",
    char: "ㅡ",
    name: "으",
    romanization: "eu",
    strokes: [
      {
        points: [
          { x: 50, y: 160 },
          { x: 110, y: 160 },
          { x: 170, y: 160 },
          { x: 230, y: 160 },
          { x: 250, y: 160 },
        ],
      },
    ],
  },
  {
    id: "stroke-o",
    char: "ㅗ",
    name: "오",
    romanization: "o",
    strokes: [
      {
        points: [
          { x: 150, y: 100 },
          { x: 150, y: 140 },
          { x: 150, y: 180 },
        ],
      },
      {
        points: [
          { x: 60, y: 180 },
          { x: 120, y: 180 },
          { x: 180, y: 180 },
          { x: 240, y: 180 },
        ],
      },
    ],
  },
  {
    id: "stroke-siot",
    char: "ㅅ",
    name: "시옷",
    romanization: "s",
    strokes: [
      {
        points: [
          { x: 150, y: 80 },
          { x: 120, y: 140 },
          { x: 90, y: 200 },
          { x: 60, y: 260 },
        ],
      },
      {
        points: [
          { x: 150, y: 130 },
          { x: 180, y: 180 },
          { x: 210, y: 220 },
          { x: 240, y: 260 },
        ],
      },
    ],
  },
];
