import Svg, { Circle, Path } from "react-native-svg";

/**
 * 구독 감사 연출의 왕관 — 하늘몬 머리에 떨어진다 (텔레그램 super-welcome 의 SVG 와 같은 모양).
 * 금색 몸통 + 아래 진한 띠(슬랩 대신 두께) + 보석 세 개 (분홍 · 보라 · 분홍).
 */
export default function Crown({ width }: { width: number }) {
  return (
    <Svg width={width} height={(width * 78) / 108} viewBox="-4 -4 108 78">
      {/* 몸통 */}
      <Path
        d="M8 58 L4 18 L28 36 L50 6 L72 36 L96 18 L92 58 Z"
        fill="#FFD900"
        stroke="#E5AE00"
        strokeWidth={3}
        strokeLinejoin="round"
      />
      {/* 위쪽 빛 */}
      <Path
        d="M14 30 L28 41 L50 13 L52 20 L30 46 L16 37 Z"
        fill="#FFF3A6"
        opacity={0.7}
      />
      {/* 아래 띠 */}
      <Path
        d="M8 54 H92 V66 Q92 70 88 70 H12 Q8 70 8 66 Z"
        fill="#E5AE00"
        stroke="#C99400"
        strokeWidth={2}
      />
      {/* 꼭짓점 구슬 */}
      <Circle
        cx={4}
        cy={17}
        r={5}
        fill="#FFD900"
        stroke="#E5AE00"
        strokeWidth={2}
      />
      <Circle
        cx={50}
        cy={6}
        r={6}
        fill="#FFD900"
        stroke="#E5AE00"
        strokeWidth={2}
      />
      <Circle
        cx={96}
        cy={17}
        r={5}
        fill="#FFD900"
        stroke="#E5AE00"
        strokeWidth={2}
      />
      {/* 보석 */}
      <Circle cx={28} cy={62} r={4} fill="#E5379B" />
      <Circle cx={50} cy={62} r={5} fill="#776EE2" />
      <Circle cx={72} cy={62} r={4} fill="#E5379B" />
    </Svg>
  );
}
