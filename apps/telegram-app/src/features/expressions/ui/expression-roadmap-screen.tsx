"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { uzt } from "../../../shared/i18n/uz-text";
import { useTelegramBackOverride } from "../../../shared/telegram/back-button";
import { hasIonicon, MobileIcon } from "../../../shared/ui/mobile-icon";
import { useRevealPopover } from "../../../shared/ui/use-reveal-popover";
import { useEnergySync } from "../../energy/energy-gate";
import type { RoadmapNode, RoadmapUnit } from "../../roadmap/model/roadmap";
import { CourseDropdown } from "../../roadmap/ui/course-dropdown";
import { darken } from "../../roadmap/ui/map/color";
import { AppIcon } from "../../roadmap/ui/map/icon";
import { RoadmapBackdrop } from "../../roadmap/ui/map/roadmap-backdrop";
import { RoadmapHeader } from "../../roadmap/ui/map/roadmap-header";
import map from "../../roadmap/ui/map/roadmap-map.module.css";
import { SectionBanner } from "../../roadmap/ui/map/section-banner";
import { UnitRoadmap } from "../../roadmap/ui/map/unit-roadmap";
import study from "../../study-path/ui/study-map.module.css";
import { getExpressionRoadmap } from "../api/expressions";
import { EXPRESSION_COLORS, type ExpressionRoadmapNode, type ExpressionRoadmapResponse } from "../model/expressions";
import styles from "./expression-roadmap-screen.module.css";

interface ExpressionView {
  units: RoadmapUnit[];
  nodeById: Map<string, ExpressionRoadmapNode>;
  currentUnitIndex: number;
}

const RING_STEPS = 4;

/** 표현 API 모델을 로드맵 지도 모델로 옮긴다 (앱 buildExpressionRoadmapViewModel) */
function buildView(roadmap: ExpressionRoadmapResponse): ExpressionView {
  const nodeById = new Map<string, ExpressionRoadmapNode>();
  const units = roadmap.topics.map((topic, index): RoadmapUnit => {
    const nodes: RoadmapNode[] = topic.nodes.map((node) => {
      nodeById.set(node.id, node);
      return {
        completedLessons:
          node.status === "completed"
            ? RING_STEPS
            : Math.min(RING_STEPS - 1, Math.floor(Math.max(0, node.progress) * RING_STEPS)),
        iconName: hasIonicon(node.icon) ? node.icon : "chatbubble-ellipses-outline",
        id: node.id,
        status: node.status,
        title: node.title,
        totalLessons: RING_STEPS,
        type: "speech",
      };
    });
    const status = nodes.some((node) => node.status === "current")
      ? "current"
      : nodes.length > 0 && nodes.every((node) => node.status === "completed")
        ? "completed"
        : "locked";
    return {
      color: EXPRESSION_COLORS[index % EXPRESSION_COLORS.length] ?? "#776ee2",
      id: topic.id,
      nodes,
      sectionNumber: 1,
      status,
      title: topic.title,
      unitNumber: index + 1,
    };
  });
  const firstCurrent = units.findIndex((unit) => unit.status === "current");
  return { currentUnitIndex: firstCurrent >= 0 ? firstCurrent : Math.max(0, units.length - 1), nodeById, units };
}

/** 표현 노드 말풍선 (앱 ExpressionNodePopover) */
function ExpressionNodePopover({
  color,
  node,
  onStart,
  triangleOffsetX,
}: {
  color: string;
  node: ExpressionRoadmapNode;
  onStart: () => void;
  triangleOffsetX: number;
}) {
  const completed = node.status === "completed";
  const style = {
    "--arrow-x": `${triangleOffsetX}px`,
    "--day": color,
    "--day-shadow": darken(color, 60),
  } as CSSProperties;
  return (
    <div className={study.popover} data-node-popover onClick={(event) => event.stopPropagation()} style={style}>
      <i className={study.popArrow} />
      <div className={study.titleRow} style={{ gap: 9 }}>
        <span className={`${study.titleIcon} ${study.exprTitleIcon}`}>
          <AppIcon name={completed ? "checkmark" : "chatbubble-ellipses"} size={19} />
        </span>
        <strong className={study.exprTitle}>{node.title}</strong>
      </div>
      <p className={study.description} style={{ marginTop: 8 }}>{node.description}</p>
      <div className={study.metaRow} style={{ marginTop: 13 }}>
        <span style={{ fontSize: 11, padding: "0 9px" }}>
          <AppIcon name="albums-outline" size={15} />
          {uzt("expressionRoadmap.nodeExpressions", { count: node.expressionCount })}
        </span>
        <span style={{ fontSize: 11, padding: "0 9px" }}>
          <AppIcon name="repeat-outline" size={16} />
          {uzt("expressionRoadmap.nodeRepetitions", { count: node.requiredExposures })}
        </span>
      </div>
      <i className={study.exprProgress}>
        <b style={{ width: `${Math.min(1, node.progress) * 100}%` }} />
      </i>
      <button className={study.startButton} onClick={onStart} type="button">
        {uzt(completed ? "expressionRoadmap.reviewNode" : "expressionRoadmap.startNode")}
        <AppIcon name="arrow-forward" size={19} />
      </button>
    </div>
  );
}

export function ExpressionRoadmapScreen() {
  const router = useRouter();
  const { request, user } = useTelegramAuth();
  const premium = Boolean(
    user?.isSuper &&
      (!user.superExpiresAt || new Date(user.superExpiresAt).getTime() > Date.now()),
  );
  const [roadmap, setRoadmap] = useState<ExpressionRoadmapResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [topicSheetOpen, setTopicSheetOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const unitRefs = useRef(new Map<string, HTMLElement>());
  // 아래쪽 노드를 눌러도 팝오버의 시작 버튼까지 보이게
  const isAutoScrolling = useRevealPopover(scrollRef, selectedNodeId);
  // 헤더 에너지는 서버 값 — 다른 모드에서 쓴 만큼이 여기서도 보여야 한다 (앱 useEnergySync)
  useEnergySync();
  // 앱처럼 뒤로가기는 홈으로
  useTelegramBackOverride(() => router.replace("/home"));

  const load = useCallback(async () => {
    if (!premium) { setLoading(false); return; }
    setLoading(true);
    setLoadFailed(false);
    try {
      setRoadmap(await getExpressionRoadmap(request));
    } catch {
      setRoadmap(null);
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, [premium, request]);

  useEffect(() => { void load(); }, [load]);
  const view = useMemo(() => (roadmap ? buildView(roadmap) : null), [roadmap]);
  const units = useMemo(() => view?.units ?? [], [view]);
  const currentIndex = view?.currentUnitIndex ?? 0;
  const visibleUnit = units[visibleIndex] ?? units[currentIndex];
  const isMax = (user as { superTier?: string | null } | null)?.superTier === "max";

  useEffect(() => {
    if (!units.length) return;
    setSelectedNodeId(null);
    setVisibleIndex(currentIndex);
    requestAnimationFrame(() => unitRefs.current.get(units[currentIndex]?.id ?? "")?.scrollIntoView({ block: "start" }));
  }, [currentIndex, units]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root || !units.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const index = visible ? units.findIndex((unit) => unit.id === visible.target.id) : -1;
      if (index >= 0) {
        setVisibleIndex(index);
        // 팝오버를 보여 주려고 우리가 올린 스크롤이면 닫지 않는다
        if (!isAutoScrolling()) setSelectedNodeId(null);
      }
    }, { root, rootMargin: "-8% 0px -58%", threshold: [0.2, 0.45] });
    unitRefs.current.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isAutoScrolling, units]);

  const openNode = (node: ExpressionRoadmapNode) => {
    if (node.status === "locked") return;
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
    setSelectedNodeId(null);
    router.push(`/expression-node?node=${encodeURIComponent(node.code)}`);
  };

  // 잠긴 노드는 열지 않는다 (앱과 같다)
  const tapNode = (nodeId: string) => {
    const node = view?.nodeById.get(nodeId);
    if (!node || node.status === "locked") return;
    setSelectedNodeId((current) => (current === nodeId ? null : nodeId));
  };

  const jumpToTopic = (index: number) => {
    const unit = units[index];
    if (!unit) return;
    setTopicSheetOpen(false);
    setVisibleIndex(index);
    setSelectedNodeId(null);
    unitRefs.current.get(unit.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!premium) {
    return (
      <main className={map.page}>
        <RoadmapBackdrop />
        <div className={styles.state} style={{ position: "relative", zIndex: 1 }}>
          <span className={styles.stateIcon}><MobileIcon name="lock-closed" size={34} /></span>
          <strong>Bu mashq KORIO Premium bilan ochiladi</strong>
          <button onClick={() => router.push("/premium")} type="button">KORIO Premium</button>
        </div>
      </main>
    );
  }

  return (
    <main className={map.page}>
      <RoadmapBackdrop />
      <RoadmapHeader
        energy={user?.energy ?? 0}
        gems={user?.gems ?? 0}
        isMax={isMax}
        isSuper={Boolean(user?.isSuper)}
        onCourse={() => setCourseOpen(true)}
        score={0}
        streak={user?.streak ?? 0}
      />

      {visibleUnit ? (
        <SectionBanner
          color={visibleUnit.color}
          label={uzt("expressionRoadmap.openTopicList")}
          onPress={() => setTopicSheetOpen(true)}
          sectionNumber={visibleUnit.sectionNumber}
          title={visibleUnit.title}
          unitNumber={visibleUnit.unitNumber}
        />
      ) : null}

      {loading ? <div className={styles.state} style={{ position: "relative", zIndex: 1 }}><span className={styles.spinner} /></div> : loadFailed ? (
        <div className={styles.state} style={{ position: "relative", zIndex: 1 }}>
          <span className={styles.stateIcon}><MobileIcon name="cloud-offline-outline" size={34} /></span>
          <strong>{uzt("expressionRoadmap.loadFailed")}</strong>
          <button onClick={() => void load()} type="button">{uzt("expressionRoadmap.retry")}</button>
        </div>
      ) : units.length === 0 ? <div className={styles.state} style={{ position: "relative", zIndex: 1 }}><strong>{uzt("expressionRoadmap.empty")}</strong></div> : (
        <div className={`${map.scroll} ${selectedNodeId ? map.scrollOpen : ""}`} onClick={() => setSelectedNodeId(null)} ref={scrollRef}>
          {units.map((unit) => (
            <section
              className={unit.nodes.some((node) => node.id === selectedNodeId) ? map.unitElevated : undefined}
              id={unit.id}
              key={unit.id}
              onClick={(event) => event.stopPropagation()}
              ref={(element) => { if (element) unitRefs.current.set(unit.id, element); else unitRefs.current.delete(unit.id); }}
              style={{ position: "relative" }}
            >
              <UnitRoadmap
                avatar={user?.avatar}
                customPopover
                hideNodeRing
                onNodeTap={tapNode}
                renderPopover={({ node, triangleOffsetX }) => {
                  const source = view?.nodeById.get(node.id);
                  if (!source) return null;
                  return <ExpressionNodePopover color={unit.color} node={source} onStart={() => openNode(source)} triangleOffsetX={triangleOffsetX} />;
                }}
                selectedNodeId={selectedNodeId}
                unit={unit}
              />
            </section>
          ))}
        </div>
      )}

      {topicSheetOpen ? (
        <div className={styles.sheetBackdrop} onClick={() => setTopicSheetOpen(false)} role="presentation">
          <section className={styles.topicSheet} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Barcha ibora mavzulari">
            <i className={styles.sheetHandle} />
            <header><span><MobileIcon name="compass-outline" size={23} /></span><div><h2>Barcha ibora mavzulari</h2><p>Vaziyatni tanlang — yo&apos;ldagi o&apos;sha mavzuga o&apos;tasiz.</p></div><button aria-label="Yopish" onClick={() => setTopicSheetOpen(false)} type="button"><MobileIcon name="close" size={22} /></button></header>
            <div className={styles.topicList}>
              {(roadmap?.topics ?? []).map((topic, index) => {
                const color = EXPRESSION_COLORS[index % EXPRESSION_COLORS.length] ?? "#776ee2";
                const selected = index === visibleIndex;
                const locked = topic.nodes.length > 0 && topic.nodes.every((node) => node.status === "locked");
                return <button className={selected ? styles.topicSelected : ""} key={topic.id} onClick={() => jumpToTopic(index)} style={{ "--topic-color": color } as CSSProperties} type="button"><span className={styles.topicEmoji}>{topic.media.emoji || "💬"}</span><span className={styles.topicCopy}><small>{String(index + 1).padStart(2, "0")}{selected ? " · Hozirgi mavzu" : ""}</small><strong>{topic.title}</strong><em>{topic.description}</em><i><b style={{ width: `${Math.min(1, topic.progress) * 100}%` }} /></i></span><span className={styles.topicStatus}><MobileIcon name={topic.completedNodes >= topic.totalNodes && topic.totalNodes > 0 ? "checkmark" : locked ? "lock-closed" : "chevron-forward"} size={18} /></span></button>;
              })}
            </div>
          </section>
        </div>
      ) : null}

      {/* 🇰🇷 → 위에서 내려오는 과정·스코어 패널 (앱 RoadmapHeader 의 CourseDropdown) */}
      <CourseDropdown onClose={() => setCourseOpen(false)} studyMode={user?.studyMode === "guided" ? "guided" : "free"} visible={courseOpen} />
    </main>
  );
}
