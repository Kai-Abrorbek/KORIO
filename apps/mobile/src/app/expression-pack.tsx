import { Redirect } from "expo-router";

/** 이전 표현 카드 링크는 새 표현 로드맵으로 안전하게 보낸다. */
export default function LegacyExpressionPackRoute() {
  return <Redirect href="/expressions" />;
}
