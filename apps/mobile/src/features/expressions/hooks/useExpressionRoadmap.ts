import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";
import { ExpressionService } from "@/services/expression.service";
import type { ExpressionRoadmapResponse } from "@/types/expression";

export function useExpressionRoadmap() {
  const { i18n } = useTranslation();
  const [roadmap, setRoadmap] = useState<ExpressionRoadmapResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadFailed(false);
    try {
      setRoadmap(await ExpressionService.getRoadmap());
    } catch {
      setRoadmap(null);
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // 서비스가 현재 언어로 요청하므로 언어가 바뀌면 다시 받아야 한다.
  // load 자체는 언어를 쓰지 않으니 의존성은 여기에 둔다
  // (useExpressionLearning 과 같은 방식).
  useFocusEffect(
    useCallback(() => {
      void load();
    }, [i18n.resolvedLanguage, load]),
  );

  return { roadmap, loading, loadFailed, reload: load };
}
