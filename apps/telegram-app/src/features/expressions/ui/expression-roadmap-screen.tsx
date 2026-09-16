"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { HomeIcon } from "../../home/ui/home-icon";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { RoadmapBanner } from "../../roadmap/ui/roadmap-parts";
import { ROADMAP_NODE_OFFSETS, ROADMAP_NODE_ROW_HEIGHT, roadmapRoutePaths, roadmapStatusClass } from "../../roadmap/model/roadmap-view";
import type { RoadmapNode, RoadmapUnit } from "../../roadmap/model/roadmap";
import { getExpressionRoadmap } from "../api/expressions";
import { EXPRESSION_COLORS, type ExpressionRoadmapNode, type ExpressionRoadmapResponse } from "../model/expressions";
import pathStyles from "../../study-path/ui/study-path.module.css";
import styles from "./expression-roadmap-screen.module.css";

interface ExpressionUnit extends RoadmapUnit {
  sourceNodes: ExpressionRoadmapNode[];
}

function buildUnits(roadmap: ExpressionRoadmapResponse): ExpressionUnit[] {
  return roadmap.topics.map((topic, index) => {
    const nodes: RoadmapNode[] = topic.nodes.map((node) => ({
      completedLessons: node.status === "completed" ? 4 : Math.min(3, Math.floor(Math.max(0, node.progress) * 4)),
      iconName: node.icon,
      id: node.id,
      status: node.status,
      title: node.title,
      totalLessons: 4,
      type: "speech",
    }));
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
      sourceNodes: topic.nodes,
      status,
      title: topic.title,
      unitNumber: index + 1,
    };
  });
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const unitRefs = useRef(new Map<string, HTMLElement>());

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
  const units = useMemo(() => roadmap ? buildUnits(roadmap) : [], [roadmap]);
  const firstCurrentIndex = units.findIndex((unit) => unit.status === "current");
  const currentIndex = firstCurrentIndex >= 0
    ? firstCurrentIndex
    : Math.max(0, units.length - 1);
  const visibleUnit = units[visibleIndex] ?? units[currentIndex];

  useEffect(() => {
    if (!units.length) return;
    setVisibleIndex(currentIndex);
    requestAnimationFrame(() => unitRefs.current.get(units[currentIndex]?.id ?? "")?.scrollIntoView({ block: "start" }));
  }, [currentIndex, units]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root || !units.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const index = visible ? units.findIndex((unit) => unit.id === visible.target.id) : -1;
      if (index >= 0) { setVisibleIndex(index); setSelectedNodeId(null); }
    }, { root, rootMargin: "-8% 0px -58%", threshold: [0.2, 0.45] });
    unitRefs.current.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [units]);

  const openNode = (node: ExpressionRoadmapNode) => {
    if (node.status === "locked") return;
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
    router.push(`/expression-node?node=${encodeURIComponent(node.code)}`);
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
      <main className={`${pathStyles.pathPage} ${styles.page}`}>
        <nav className={pathStyles.miniRoadmapNav}>
          <button aria-label="Orqaga" onClick={() => router.replace("/course-categories")} type="button"><HomeIcon name="back" size={25} /></button>
          <strong>Iboralar yo&apos;li</strong>
        </nav>
        <div className={styles.state}>
          <span className={styles.stateIcon}><MobileIcon name="lock-closed" size={34} /></span>
          <strong>Bu mashq KORIO Premium bilan ochiladi</strong>
          <button onClick={() => router.push("/premium")} type="button">KORIO Premium</button>
        </div>
      </main>
    );
  }

  return (
    <main className={`${pathStyles.pathPage} ${styles.page}`}>
      <nav className={pathStyles.miniRoadmapNav}>
        <button aria-label="Orqaga" onClick={() => router.replace("/course-categories")} type="button"><HomeIcon name="back" size={25} /></button>
        <strong>Iboralar yo&apos;li</strong>
      </nav>
      <header className={pathStyles.pathStats}>
        <button onClick={() => router.push("/courses")} type="button"><span>🇰🇷</span><b>1</b><HomeIcon className={pathStyles.caret} name="caret" size={15} /></button>
        <span><HomeIcon name="flame" size={22} /><b>{user?.streak ?? 0}</b></span>
        <span><HomeIcon className={pathStyles.diamond} name="diamond" size={20} /><b>{user?.gems ?? 0}</b></span>
        {user?.isSuper ? <span className={pathStyles.superBadge}>SUPER</span> : <span><HomeIcon name="heart" size={23} /><b>{user?.energy ?? 0}</b></span>}
      </header>

      {visibleUnit ? <RoadmapBanner onOpen={() => setTopicSheetOpen(true)} unit={visibleUnit} /> : null}

      {loading ? <div className={styles.state}><span className={styles.spinner} /></div> : loadFailed ? (
        <div className={styles.state}>
          <span className={styles.stateIcon}><MobileIcon name="cloud-offline-outline" size={34} /></span>
          <strong>Iboralar yo&apos;lini yuklab bo&apos;lmadi</strong>
          <button onClick={() => void load()} type="button">Qayta urinish</button>
        </div>
      ) : units.length === 0 ? <div className={styles.state}><strong>Hali o&apos;rganiladigan ibora tugunlari yo&apos;q</strong></div> : (
        <div className={pathStyles.pathScroll} ref={scrollRef}>
          {units.map((unit) => {
            const route = roadmapRoutePaths(unit.nodes);
            return (
              <section className={pathStyles.pathDay} id={unit.id} key={unit.id} ref={(element) => { if (element) unitRefs.current.set(unit.id, element); else unitRefs.current.delete(unit.id); }} style={{ "--unit-color": unit.color } as CSSProperties}>
                <div className={pathStyles.dayTitle}><span>{unit.unitNumber}-mavzu</span><strong>{unit.title}</strong></div>
                <div className={pathStyles.nodesMap} style={{ height: `${route.height + 70}px` }}>
                  <svg aria-hidden="true" className={pathStyles.pathConnector} preserveAspectRatio="none" viewBox={`0 0 100 ${route.height + 4}`}>
                    <path className={pathStyles.connectorShadow} d={route.full} />
                    <path className={pathStyles.connectorBase} d={route.full} />
                    {route.segments.map((segment, index) => <path className={segment.active ? pathStyles.connectorActive : pathStyles.connectorLocked} d={segment.d} key={`${unit.id}:${index}`} />)}
                    <path className={pathStyles.connectorShine} d={route.full} />
                  </svg>
                  {unit.nodes.map((node, index) => {
                    const source = unit.sourceNodes[index];
                    if (!source) return null;
                    const offset = ROADMAP_NODE_OFFSETS[index % ROADMAP_NODE_OFFSETS.length] ?? 50;
                    const selected = selectedNodeId === node.id;
                    const progress = ((node.completedLessons ?? 0) / 4) * 360;
                    return (
                      <div className={`${pathStyles.nodeRow} ${selected ? pathStyles.nodeRowSelected : ""}`} key={node.id} style={{ "--node-offset": `${offset}%`, top: `${index * ROADMAP_NODE_ROW_HEIGHT}px` } as CSSProperties}>
                        <button aria-label={source.title} className={`${pathStyles.pathNode} ${roadmapStatusClass(pathStyles, node.status)}`} disabled={node.status === "locked"} onClick={() => setSelectedNodeId((value) => value === node.id ? null : node.id)} style={{ "--node-progress": `${progress}deg` } as CSSProperties} type="button">
                          <span className={pathStyles.nodeFace}><MobileIcon name={node.status === "completed" ? "checkmark" : node.status === "locked" ? "lock-closed" : "chatbubble-ellipses"} size={27} /></span>
                        </button>
                        {node.status === "current" && !selected ? <span className={pathStyles.currentMascot} style={{ "--mascot-left": `${offset > 50 ? offset - 28 : offset + 20}%` } as CSSProperties}><Image alt="" height={67} src="/characters/hangulmon_default.png" unoptimized width={67} /></span> : null}
                        {selected ? (
                          <article className={styles.nodePopover} style={{ "--node-color": unit.color } as CSSProperties}>
                            <span className={styles.popoverArrow} />
                            <div className={styles.popoverTitle}><span><MobileIcon name={source.status === "completed" ? "checkmark" : "chatbubble-ellipses"} size={19} /></span><strong>{source.title}</strong></div>
                            <p>{source.description}</p>
                            <div className={styles.meta}><span><MobileIcon name="albums-outline" size={15} />{source.expressionCount} ta ibora</span><span><MobileIcon name="repeat" size={16} />{source.requiredExposures} marta</span></div>
                            <i className={styles.popoverProgress}><b style={{ width: `${Math.min(1, source.progress) * 100}%` }} /></i>
                            <button onClick={() => openNode(source)} type="button">{source.status === "completed" ? "Qayta ko'rish" : "Iboralarni o'rganish"}<MobileIcon name="arrow-forward" size={19} /></button>
                          </article>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {!loading && units.length ? <button aria-label="Hozirgi mavzuga o'tish" className={styles.jumpCurrent} onClick={() => unitRefs.current.get(units[currentIndex]?.id ?? "")?.scrollIntoView({ behavior: "smooth", block: "start" })} style={{ "--jump-color": visibleUnit?.color } as CSSProperties} type="button">{visibleIndex > currentIndex ? "↑" : "↓"}</button> : null}

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
    </main>
  );
}
