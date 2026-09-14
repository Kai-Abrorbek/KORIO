import { Redirect } from "expo-router";

/**
 * 옛 에너지 화면 경로.
 *
 * 에너지 충전은 상점(Do'kon)의 한 섹션이 됐다. 보석을 쓰는 곳이 에너지 하나일
 * 때는 전용 화면이 맞았지만, 지금은 프리미엄 기간권이 주 용도다.
 * 에너지 배지·모달 등 이 경로로 보내는 곳이 여럿이라 링크를 살려둔다.
 */
export default function EnergyRoute() {
  return <Redirect href="/shop" />;
}
