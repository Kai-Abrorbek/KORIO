import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";
import { StudyPathService } from "@/services/study-path.service";
import type { StudyPathResponse } from "@/types/study-path";

export function useStudyPath() {
  const { i18n } = useTranslation();
  const [data, setData] = useState<StudyPathResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  const load = useCallback(async () => {
    setLoadFailed(false);
    try {
      setData(await StudyPathService.getStudyPath());
    } catch {
      setData(null);
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // 화면으로 돌아올 때마다 다시 받는다 — 레슨·단어·문법을 끝내고 오면
  // 그 자리에서 노드가 완료로 바뀌어 있어야 한다.
  // 서비스가 현재 언어로 요청하므로 언어가 바뀌어도 다시 받아야 한다.
  useFocusEffect(
    useCallback(() => {
      void load();
    }, [i18n.resolvedLanguage, load]),
  );

  return { data, loading, loadFailed, reload: load };
}
