import type { SVGProps } from "react";

const IONICONS = {
  albums: 61711,
  "albums-outline": 61712,
  "arrow-back": 61735,
  "arrow-down": 61741,
  "arrow-forward": 61747,
  "bag-handle-outline": 61791,
  barbell: 61810,
  book: 61861,
  "basket-outline": 61820,
  "barbell-outline": 61811,
  "book-outline": 61862,
  "bookmark-outline": 61865,
  "bulb-outline": 61889,
  "caret-down": 61936,
  checkmark: 61981,
  "checkmark-circle": 61982,
  "chatbubble-ellipses": 61970,
  "chatbubble-ellipses-outline": 61971,
  chatbubbles: 61975,
  "chatbubbles-outline": 61976,
  "chevron-down": 62002,
  "chevron-back": 61993,
  "chevron-forward": 62011,
  close: 62026,
  "close-circle": 62027,
  "cloud-offline-outline": 62043,
  compass: 62083,
  "compass-outline": 62084,
  construct: 62086,
  "construct-outline": 62087,
  "create-outline": 62099,
  diamond: 62113,
  "ellipsis-horizontal": 62158,
  flame: 62227,
  flash: 62230,
  footsteps: 62254,
  "footsteps-outline": 62255,
  "game-controller": 62260,
  "game-controller-outline": 62261,
  headset: 62311,
  "headset-outline": 62312,
  heart: 62314,
  "heart-outline": 62327,
  home: 62338,
  language: 62377,
  locate: 62401,
  "locate-outline": 62402,
  "lock-closed": 62407,
  "lock-open": 62410,
  menu: 62545,
  mic: 62548,
  "mic-outline": 62558,
  "notifications-outline": 62591,
  "person-outline": 62636,
  pulse: 62710,
  refresh: 62740,
  ribbon: 62788,
  "ribbon-outline": 62789,
  school: 62812,
  "school-outline": 62813,
  search: 62815,
  "search-outline": 62819,
  "settings-outline": 62828,
  "share-outline": 62834,
  sparkles: 62860,
  star: 62869,
  "stats-chart-outline": 62876,
  stop: 62878,
  "swap-horizontal": 62896,
  text: 62923,
  "text-outline": 62924,
  "time-outline": 62942,
  timer: 62944,
  "trophy-outline": 62978,
  "trash-outline": 62966,
  "volume-high": 62995,
  "volume-medium": 63001,
  "volume-medium-outline": 63002,
} as const;

const MATERIAL_COMMUNITY = {
  keyboard: 983820,
  "lightning-bolt": 988171,
  turtle: 986327,
} as const;

export type IoniconName = keyof typeof IONICONS;
export type MaterialCommunityIconName = keyof typeof MATERIAL_COMMUNITY;

interface MobileIconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  family?: "ionicons" | "material-community";
  name: IoniconName | MaterialCommunityIconName;
  size?: number;
}

export function MobileIcon({ family = "ionicons", name, size = 24, ...props }: MobileIconProps) {
  const glyph = family === "material-community"
    ? MATERIAL_COMMUNITY[name as MaterialCommunityIconName]
    : IONICONS[name as IoniconName];
  return (
    <svg aria-hidden="true" height={size} viewBox="0 0 32 32" width={size} {...props}>
      <text
        dominantBaseline="central"
        fill="currentColor"
        fontFamily={family === "material-community" ? "KorioMaterialCommunityIcons" : "KorioIonicons"}
        fontSize="30"
        textAnchor="middle"
        x="16"
        y="16"
      >
        {String.fromCodePoint(glyph)}
      </text>
    </svg>
  );
}
