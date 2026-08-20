import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ExpressionService } from "@/services/expression.service";
import type { ExpressionNodeLearningResponse } from "@/types/expression";
import { buildExpressionLearningQueue } from "../utils/expression-learning-queue";

export function useExpressionLearning(nodeCode: string) {
  const { i18n } = useTranslation();
  const [session, setSession] =
    useState<ExpressionNodeLearningResponse | null>(null);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const recordedQueueKeysRef = useRef(new Set<string>());

  const queue = useMemo(
    () =>
      session
        ? buildExpressionLearningQueue(
            session.items,
            session.node.requiredExposures,
          )
        : [],
    [session],
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
    recordedQueueKeysRef.current.clear();
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

  const advance = useCallback(async () => {
    if (!current || saving) return false;
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
    reload: load,
  };
}
