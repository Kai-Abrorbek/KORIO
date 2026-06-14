import Svg, { Ellipse, Path, Rect, Text as SvgText, G } from "react-native-svg";

interface BoriMascotProps {
  size?: number;
}

export default function BoriMascot({ size = 200 }: BoriMascotProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <Ellipse cx="100" cy="180" rx="48" ry="6" fill="#1A1A2E" opacity="0.08" />
      <Path
        d="M100 30C140 30 170 60 170 105C170 150 140 175 100 175C60 175 30 150 30 105C30 60 60 30 100 30Z"
        fill="#7F77DD"
      />
      <Ellipse cx="100" cy="125" rx="40" ry="32" fill="#A8A2EA" opacity="0.5" />
      <Ellipse
        cx="178"
        cy="65"
        rx="11"
        ry="16"
        fill="#7F77DD"
        transform="rotate(35 178 65)"
      />
      <Ellipse
        cx="34"
        cy="120"
        rx="12"
        ry="18"
        fill="#7F77DD"
        transform="rotate(-15 34 120)"
      />
      <Path d="M75 35C70 22 65 18 60 22C58 28 65 38 75 42" fill="#6F66D2" />
      <Path
        d="M125 35C130 22 135 18 140 22C142 28 135 38 125 42"
        fill="#6F66D2"
      />
      <Path
        d="M70 95Q78 88 86 95"
        stroke="#1A1A2E"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M114 95Q122 88 130 95"
        stroke="#1A1A2E"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <Ellipse cx="65" cy="115" rx="7" ry="4" fill="#FF8FA9" opacity="0.7" />
      <Ellipse cx="135" cy="115" rx="7" ry="4" fill="#FF8FA9" opacity="0.7" />
      <Path
        d="M86 122Q100 138 114 122"
        stroke="#1A1A2E"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <G transform="translate(135 25)">
        <Rect
          width="55"
          height="32"
          rx="14"
          fill="#FFFFFF"
          stroke="#E2E0EF"
          strokeWidth="1.5"
        />
        <SvgText
          x="27.5"
          y="22"
          fontSize="16"
          fontWeight="700"
          fill="#1A1A2E"
          textAnchor="middle"
        >
          안녕
        </SvgText>
        <Path
          d="M10 30L4 38L16 32Z"
          fill="#FFFFFF"
          stroke="#E2E0EF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
