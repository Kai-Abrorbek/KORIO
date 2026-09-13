import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ExpressionService } from "@/services/expression.service";
import type { ExpressionNodeLearningResponse } from "@/types/expression";
import {
  buildExpressionLearningQueue,
  buildExpressionRecallQueue,
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
  const [recallStarted, setRecallStarted] = useState(false);
  const [retryItems, setRetryItems] = useState<ExpressionLearningQueueItem[]>(
    [],
  );
  const recordedQueueKeysRef = useRef(new Set<string>());
  const retriedExpressionIdsRef = useRef(new Set<string>());
  const recallResumeIndexRef = useRef<number | null>(null);

  const learningQueue = useMemo(
    () =>
      session
        ? buildExpressionLearningQueue(
            session.items,
            session.node.requiredExposures,
          )
        : [],
    [session],
  );
  const recallQueue = useMemo(
    () =>
      session
        ? buildExpressionRecallQueue(
            session.items,
            session.node.requiredExposures,
            learningQueue.at(-1)?.expression.id,
          )
        : [],
    [learningQueue, session],
  );
  const queue = useMemo(
    () =>
      recallStarted
        ? [...learningQueue, ...recallQueue, ...retryItems]
        : learningQueue,
    [learningQueue, recallQueue, recallStarted, retryItems],
  );
  const current = queue[index] ?? null;
  const readyForRecall =
    !recallStarted &&
    learningQueue.length > 0 &&
    index >= learningQueue.length - 1;

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
    setRecallStarted(false);
    setIndex(0);
    setRetryItems([]);
    recordedQueueKeysRef.current.clear();
    retriedExpressionIdsRef.current.clear();
    recallResumeIndexRef.current = null;
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
    setRetryItems((items) => [
      ...items,
      {
        key: `${expressionId}-retry-quiz-${retryKey}`,
        expression: current.expression,
        stage: "recall",
        exposure: retryExposure,
        kind: "retry",
        recordsView: false,
      },
    ]);
    return true;
  }, [current, session?.node.requiredExposures]);

  const recordCurrentView = useCallback(async () => {
    if (!current || saving) return false;
    setSaveFailed(false);
    if (
      !current.recordsView ||
      recordedQueueKeysRef.current.has(current.key)
    ) {
      return true;
    }

    setSaving(true);
    try {
      await ExpressionService.recordView(current.expression.id);
      recordedQueueKeysRef.current.add(current.key);
      return true;
    } catch {
      setSaveFailed(true);
      return false;
    } finally {
      setSaving(false);
    }
  }, [current, saving]);

  const beginRecall = useCallback(async () => {
    if (!readyForRecall || !(await recordCurrentView())) return false;
    if (!recallQueue.length) {
      setCompleted(true);
      return true;
    }

    setRecallStarted(true);
    recallResumeIndexRef.current = null;
    setIndex(learningQueue.length);
    return true;
  }, [
    learningQueue.length,
    readyForRecall,
    recallQueue.length,
    recordCurrentView,
  ]);

  const skipRecall = useCallback(async () => {
    if (!readyForRecall || !(await recordCurrentView())) return false;
    setCompleted(true);
    return true;
  }, [readyForRecall, recordCurrentView]);

  const advance = useCallback(async () => {
    if (!current || !(await recordCurrentView())) return false;

    const resumeIndex = recallResumeIndexRef.current;
    if (
      recallStarted &&
      current.kind === "exposure" &&
      index === learningQueue.length - 1 &&
      resumeIndex !== null
    ) {
      recallResumeIndexRef.current = null;
      setIndex(Math.min(resumeIndex, queue.length - 1));
      return true;
    }

    if (index >= queue.length - 1) {
      if (!recallStarted) return false;
      setCompleted(true);
    } else {
      setIndex((value) => value + 1);
    }
    return true;
  }, [
    current,
    index,
    learningQueue.length,
    queue.length,
    recallStarted,
    recordCurrentView,
  ]);

  const retreat = useCallback(() => {
    if (saving || index <= 0) return false;
    setSaveFailed(false);
    if (current?.kind !== "exposure") {
      recallResumeIndexRef.current = index;
      setIndex(Math.max(0, learningQueue.length - 1));
      return true;
    }
    setIndex((value) => Math.max(0, value - 1));
    return true;
  }, [current?.kind, index, learningQueue.length, saving]);

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
    readyForRecall,
    progress: queue.length ? (index + 1) / queue.length : 0,
    advance,
    retreat,
    beginRecall,
    skipRecall,
    scheduleRetry,
    reload: load,
  };
}
