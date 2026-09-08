import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

/**
 * 이 컴포넌트가 속한 화면이 지금 보이는 화면인가.
 *
 * ⚠️ useFocusEffect 는 **expo-router 것**을 써야 한다.
 * @react-navigation/native 것을 쓰면 expo-router 의 네비게이션 컨텍스트와
 * 안 맞아 포커스 이벤트를 못 받는다.
 */
export function useScreenFocused(): boolean {
  const [focused, setFocused] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, []),
  );
  return focused;
}
