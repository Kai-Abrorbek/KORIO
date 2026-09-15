import type { SVGProps } from "react";

import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";

export type HomeIconName =
  | "arrow" | "back" | "basket" | "bell" | "book" | "bookmark" | "caret" | "chart" | "check" | "chevron" | "clock" | "close" | "diamond" | "flame"
  | "heart" | "heartOutline" | "home" | "menu" | "person" | "refresh" | "ribbon" | "search" | "searchOutline"
  | "settings" | "shop" | "sparkles" | "swap" | "target" | "trophy";

interface HomeIconProps extends SVGProps<SVGSVGElement> {
  name: HomeIconName;
  size?: number;
}

const ICONS: Record<HomeIconName, IoniconName> = {
  arrow: "arrow-forward",
  back: "chevron-back",
  basket: "basket-outline",
  bell: "notifications-outline",
  book: "book-outline",
  bookmark: "bookmark-outline",
  caret: "caret-down",
  chart: "stats-chart-outline",
  check: "checkmark",
  chevron: "chevron-forward",
  clock: "time-outline",
  close: "close",
  diamond: "diamond",
  flame: "flame",
  heart: "heart",
  heartOutline: "heart-outline",
  home: "home",
  menu: "menu",
  person: "person-outline",
  refresh: "refresh",
  ribbon: "ribbon-outline",
  search: "search",
  searchOutline: "search-outline",
  settings: "settings-outline",
  shop: "bag-handle-outline",
  sparkles: "sparkles",
  swap: "swap-horizontal",
  target: "locate-outline",
  trophy: "trophy-outline",
};

export function HomeIcon({ name, size = 24, ...props }: HomeIconProps) {
  return <MobileIcon name={ICONS[name]} size={size} {...props} />;
}
