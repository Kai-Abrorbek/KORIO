import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ExpressionService } from "@/services/expression.service";
import type { ExpressionNodeLearningResponse } from "@/types/expression";
import {
  buildExpressionLearningQueue,
  type ExpressionLearningQueueItem,
} from "../utils/expression-learning-queue";

export function useExpressionLearning(nodeCode: string) {
  const { i18n } = useTranslation();
  const [session, setSession] = useState<ExpressionNodeLearningResponse | null>(
    null,
  );
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [retryItems, setRetryItems] = useState<ExpressionLearningQueueItem[]>(
    [],
  );
  const recordedQueueKeysRef = useRef(new Set<string>());
  const retriedExpressionIdsRef = useRef(new Set<string>());

  const baseQueue = useMemo(
    () =>
      session
        ? buildExpressionLearningQueue(
            session.items,
            session.node.requiredExposures,
          )
        : [],
    [session],
  );
  const queue = useMemo(
    () => [...baseQueue, ...retryItems],
    [baseQueue, retryItems],
  );
  const current = queue[index] ?? null;

  const load = useCallback(async () => {
    if (!nodeCode) {
      setLoading(false);
      setLoadFailed(true);
      return;
    }

    setLoading(true);
    setLoadFailed(false);
    setSaveFailed(false);
    setCompleted(false);
    setIndex(0);
    setRetryItems([]);
    recordedQueueKeysRef.current.clear();
    retriedExpressionIdsRef.current.clear();
    try {
      setSession(await ExpressionService.getNodeLearning(nodeCode));
    } catch {
      setSession(null);
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, [nodeCode]);

  useEffect(() => {
    void load();
  }, [i18n.resolvedLanguage, load]);

  const scheduleRetry = useCallback(() => {
    if (!current || current.kind === "retry") return false;
    const expressionId = current.expression.id;
    if (retriedExpressionIdsRef.current.has(expressionId)) return false;

    retriedExpressionIdsRef.current.add(expressionId);
    const retryKey = Date.now();
    const retryExposure = Math.max(
      current.exposure + 1,
      session?.node.requiredExposures ?? 3,
    );
    // 재문제만 끝에 붙이면 문제 카드끼리 연속될 수 있다. 답을 다시 보여주는
    // 짧은 복습 카드를 앞에 두어 학습 → 재도전 흐름과 간격을 함께 만든다.
    setRetryItems((items) => [
      ...items,
      {
        key: `${expressionId}-retry-review-${retryKey}`,
        expression: current.expression,
        stage: "guided",
        exposure: retryExposure,
        kind: "exposure",
        recordsView: false,
      },
      {
        key: `${expressionId}-retry-quiz-${retryKey}`,
        expression: current.expression,
        stage: "recall",
        exposure: retryExposure + 1,
        kind: "retry",
        recordsView: false,
      },
    ]);
    return true;
  }, [current, session?.node.requiredExposures]);

  const advance = useCallback(async () => {
    if (!current || saving) return false;
    if (!current.recordsView) {
      setSaveFailed(false);
      if (index >= queue.length - 1) {
        setCompleted(true);
      } else {
        setIndex((value) => value + 1);
      }
      return true;
    }
    if (recordedQueueKeysRef.current.has(current.key)) {
      setSaveFailed(false);
      if (index >= queue.length - 1) {
        setCompleted(true);
      } else {
        setIndex((value) => value + 1);
      }
      return true;
    }

    setSaving(true);
    setSaveFailed(false);
    try {
      await ExpressionService.recordView(current.expression.id);
      recordedQueueKeysRef.current.add(current.key);
      if (index >= queue.length - 1) {
        setCompleted(true);
      } else {
        setIndex((value) => value + 1);
      }
      return true;
    } catch {
      setSaveFailed(true);
      return false;
    } finally {
      setSaving(false);
    }
  }, [current, index, queue.length, saving]);

  const retreat = useCallback(() => {
    if (saving || index <= 0) return false;
    setSaveFailed(false);
    setIndex((value) => Math.max(0, value - 1));
    return true;
  }, [index, saving]);

  return {
    session,
    queue,
    current,
    index,
    loading,
    loadFailed,
    saving,
    saveFailed,
    completed,
    progress: queue.length ? (index + 1) / queue.length : 0,
    advance,
    retreat,
    scheduleRetry,
    reload: load,
  };
}
