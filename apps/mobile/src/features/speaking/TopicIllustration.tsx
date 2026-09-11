import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";

interface Props {
  code: string;
  size?: number;
  color?: string;
}

/** Original local scenes; the same artwork accompanies a topic into practice. */
export default function TopicIllustration({
  code,
  size = 100,
  color = "#7155D9",
}: Props) {
  const topic = code.toLowerCase();
  return (
    <Svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 160 128"
      accessible={false}
    >
      <Ellipse cx="81" cy="112" rx="54" ry="7" fill={color} opacity="0.09" />
      <Circle cx="131" cy="29" r="4" fill={color} opacity="0.24" />
      <Path
        d="M26 43h8m-4-4v8M134 81h8m-4-4v8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/cafe|coffee/.test(topic) ? (
        <G>
          <Rect
            x="102"
            y="47"
            width="20"
            height="47"
            rx="6"
            fill={color}
            opacity="0.12"
            transform="rotate(12 112 70)"
          />
          <Path
            d="M43 56h57v30c0 17-11 23-28 23S43 103 43 86Z"
            fill="#FFFCF5"
            stroke={color}
            strokeWidth="3"
          />
          <Path
            d="M100 62h7c20 0 20 26-4 28"
            fill="none"
            stroke={color}
            strokeWidth="5"
          />
          <Ellipse cx="71" cy="57" rx="28" ry="6" fill={color} opacity="0.26" />
          <Path
            d="M62 41c-10-9 9-12 0-23M80 43c-10-10 10-13 0-25"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.55"
          />
          <Path
            d="M29 109h87"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <Path
            d="M65 76c-7-8-17 4 8 17 23-15 11-24 5-17l-6 6Z"
            fill={color}
            opacity="0.65"
          />
        </G>
      ) : /greet|intro|friend|meeting/.test(topic) ? (
        <G>
          <Path
            d="M31 110c0-24 12-37 33-37s34 13 34 37"
            fill={color}
            opacity="0.7"
          />
          <Circle cx="63" cy="54" r="23" fill="#F4C7A1" />
          <Path
            d="M40 52c-5-28 42-35 47-4-10 0-16-4-21-13-6 10-15 15-26 17"
            fill={color}
          />
          <Circle cx="56" cy="56" r="2" fill="#51374C" />
          <Circle cx="72" cy="56" r="2" fill="#51374C" />
          <Path
            d="M59 65q5 5 10 0"
            stroke="#975E56"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d="M98 20h27q12 0 12 12v14q0 12-12 12h-11l-15 10 2-10h-3q-12 0-12-12V32q0-12 12-12"
            fill="#FFFCF5"
            stroke={color}
            strokeWidth="2.5"
          />
          <Path
            d="M100 36h24m-24 9h16"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.65"
          />
          <Path
            d="m52 80 11 13 12-13"
            fill="none"
            stroke="#FFFCF5"
            strokeWidth="3"
          />
        </G>
      ) : /restaurant|food|dining/.test(topic) ? (
        <G>
          <Ellipse
            cx="79"
            cy="73"
            rx="47"
            ry="11"
            fill="#FFFCF5"
            stroke={color}
            strokeWidth="3"
          />
          <Path
            d="M33 74c3 23 18 35 46 35s43-12 47-35c-23 11-71 12-93 0"
            fill={color}
            opacity="0.7"
          />
          <Path
            d="M49 73c8-13 11 8 18-4s15 7 22-3 13 5 21 7"
            stroke="#ECA251"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d="M65 77c2-13 8-17 13-18M88 78l10-17"
            stroke="#6A9D83"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <Path
            d="m84 47 44-28m-39 35 43-27"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <Path
            d="M53 48c-9-10 8-11 0-22"
            stroke={color}
            opacity="0.4"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <Rect x="62" y="107" width="35" height="5" rx="2.5" fill={color} />
        </G>
      ) : /travel|transport|direction|airport|hotel/.test(topic) ? (
        <G>
          <Path
            d="M57 43v-8q0-7 7-7h16q7 0 7 7v8"
            stroke={color}
            strokeWidth="4"
            fill="none"
          />
          <Rect
            x="37"
            y="43"
            width="71"
            height="65"
            rx="13"
            fill={color}
            opacity="0.72"
          />
          <Path
            d="M54 45v59m37-59v59"
            stroke="#FFFCF5"
            strokeWidth="3"
            opacity="0.65"
          />
          <Circle cx="52" cy="111" r="4" fill={color} />
          <Circle cx="93" cy="111" r="4" fill={color} />
          <Rect
            x="63"
            y="64"
            width="21"
            height="24"
            rx="4"
            fill="#FFFCF5"
            transform="rotate(-10 73 76)"
          />
          <Circle
            cx="74"
            cy="74"
            r="5"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
          <Path
            d="m105 32 31-15-11 30-8-11-12-4Z"
            fill="#FFFCF5"
            stroke={color}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <Path
            d="m117 36 19-19M111 47l-7 7"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </G>
      ) : /school|study|university|work|office/.test(topic) ? (
        <G>
          <Path
            d="M30 44q27-12 50 1 22-13 49-1v61q-29-9-49 2-22-11-50-2Z"
            fill="#FFFCF5"
            stroke={color}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <Path d="M80 45v62" stroke={color} strokeWidth="3" />
          <Path
            d="M42 58q12-4 25 1m-25 12q12-4 25 1m-25 12q12-4 25 1m28-24 21-2m-21 15 21-2m-21 15 16-2"
            stroke={color}
            opacity="0.4"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <G transform="rotate(25 114 38)">
            <Rect x="109" y="12" width="10" height="41" rx="3" fill={color} />
            <Path d="m109 52 5 12 5-12Z" fill="#F4C7A1" />
            <Path d="m112 59 2 5 2-5Z" fill={color} />
            <Path d="M110 20h8" stroke="#FFFCF5" strokeWidth="2" />
          </G>
        </G>
      ) : /shop|store|market/.test(topic) ? (
        <G>
          <Path d="m37 45-6 62h65l-6-62Z" fill={color} opacity="0.7" />
          <Path
            d="M49 49V36c0-20 29-20 29 0v13"
            stroke={color}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d="m88 63-5 47h46l-5-47Z"
            fill="#FFFCF5"
            stroke={color}
            strokeWidth="2.5"
          />
          <Path
            d="M96 67V57c0-14 20-14 20 0v10"
            stroke={color}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <Path d="m53 72 10-7 11 7-4 16H57Z" fill="#FFFCF5" opacity="0.9" />
          <Path
            d="m113 25 3 7 8 2-8 3-3 7-3-7-8-3 8-2Z"
            fill={color}
            opacity="0.5"
          />
        </G>
      ) : /daily|home|routine|life/.test(topic) ? (
        <G>
          <Rect
            x="40"
            y="20"
            width="68"
            height="65"
            rx="21"
            fill="#FFFCF5"
            stroke={color}
            strokeWidth="3"
          />
          <Path d="M74 21v63M41 53h66" stroke={color} strokeWidth="3" />
          <Circle cx="90" cy="36" r="9" fill="#E6B75F" />
          <Path
            d="M42 73c10-13 22-17 32-4 12-15 23-12 33-2v16H42Z"
            fill={color}
            opacity="0.17"
          />
          <Path
            d="M29 110h103"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <Path
            d="M108 92c-21-1-25-20-11-18 9 2 11 10 11 18m1-5c0-19 17-28 20-17 2 9-10 16-20 17"
            fill="#7EAB91"
          />
          <Path d="m97 91 3 19h19l3-19Z" fill={color} />
          <Rect
            x="44"
            y="96"
            width="31"
            height="13"
            rx="5"
            fill={color}
            opacity="0.55"
          />
        </G>
      ) : (
        <G>
          <Path
            d="M36 29h63q15 0 15 15v25q0 15-15 15H68L48 99V84H36q-15 0-15-15V44q0-15 15-15"
            fill={color}
            opacity="0.7"
          />
          <Path
            d="M95 60h27q15 0 15 15v17q0 15-15 15h-2v13l-17-13h-8q-15 0-15-15V75q0-15 15-15"
            fill="#FFFCF5"
            stroke={color}
            strokeWidth="2.5"
          />
          <Circle cx="45" cy="55" r="4" fill="#FFFCF5" />
          <Circle cx="64" cy="55" r="4" fill="#FFFCF5" />
          <Circle cx="83" cy="55" r="4" fill="#FFFCF5" />
          <Path
            d="M94 77h28m-28 11h19"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />
        </G>
      )}
    </Svg>
  );
}
