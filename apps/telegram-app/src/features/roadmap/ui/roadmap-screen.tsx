"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { HomeIcon } from "../../home/ui/home-icon";
import { saveStudyMode } from "../../learning/api/learning-preferences";
import { LearningIcon } from "../../learning/ui/learning-icon";
import { claimStudyPathChests } from "../../study-path/api/study-path";
import { getRoadmap, getRoadmapScore } from "../api/roadmap";
import {
  prepareRoadmapUnits,
  ROADMAP_NODE_OFFSETS,
  ROADMAP_NODE_ROW_HEIGHT,
  roadmapRoutePaths,
  roadmapStatusClass,
} from "../model/roadmap-view";
import type {
  RoadmapNode,
  RoadmapScoreResponse,
  RoadmapUnit,
} from "../model/roadmap";
import {
  RoadmapBanner,
  RoadmapNodeIcon,
  RoadmapPopover,
} from "./roadmap-parts";
import { RoadmapSectionSheet } from "./roadmap-section-sheet";
import styles from "../../study-path/ui/study-path.module.css";

interface NextSection {
  description: string;
  firstUnitNumber: number;
  sectionNumber: number;
  title: string;
}

export function RoadmapScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const { request, updateUser, user } = useTelegramAuth();
  const [unitsRaw, setUnitsRaw] = useState<RoadmapUnit[]>([]);
  const [scoreValue, setScoreValue] = useState(0);
  const [pendingChests, setPendingChests] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [viewingSection, setViewingSection] = useState<number>();
  const [isPastSection, setIsPastSection] = useState(false);
  const [nextSection, setNextSection] = useState<NextSection | null>(null);
  const [viewSection, setViewSection] = useState<number>();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [visibleUnitIndex, setVisibleUnitIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sectionScore, setSectionScore] =
    useState<RoadmapScoreResponse | null>(null);
  const [rewardGems, setRewardGems] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const unitRefs = useRef(new Map<string, HTMLElement>());
  const claimingRef = useRef(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadFailed(false);
    try {
      const result = await getRoadmap(request, {
        category: category ?? undefined,
        viewSection,
      });
      setUnitsRaw(result.units);
      setScoreValue(result.score);
      setPendingChests(result.pendingChests ?? 0);
      setCurrentSection(result.currentSection);
      setViewingSection(result.viewingSection ?? result.currentSection);
      setIsPastSection(Boolean(result.isPastSection));
      setNextSection(result.nextSection);
    } catch {
      setLoadFailed(true);
      setUnitsRaw([]);
    } finally {
      setLoading(false);
    }
  }, [category, request, viewSection]);

  useEffect(() => {
    void load();
  }, [load]);

  const units = useMemo(
    () => prepareRoadmapUnits(unitsRaw, category, pendingChests > 0),
    [category, pendingChests, unitsRaw],
  );
  const currentUnitIndex = Math.max(
    0,
    units.findIndex((unit) => unit.status === "current"),
  );

  useEffect(() => {
    if (units.length === 0) return;
    const target = units[currentUnitIndex];
    setVisibleUnitIndex(currentUnitIndex);
    requestAnimationFrame(() => {
      unitRefs.current
        .get(target?.id ?? "")
        ?.scrollIntoView({ block: "start" });
    });
  }, [currentUnitIndex, units]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root || units.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (left, right) => right.intersectionRatio - left.intersectionRatio,
          )[0];
        if (!visible) return;
        const index = units.findIndex((unit) => unit.id === visible.target.id);
        if (index >= 0) {
          setVisibleUnitIndex(index);
          setSelectedNodeId(null);
        }
      },
      { root, rootMargin: "-8% 0px -58%", threshold: [0.2, 0.45] },
    );
    unitRefs.current.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [units]);

  const openSections = async () => {
    setSheetOpen(true);
    setSectionScore(null);
    try {
      setSectionScore(await getRoadmapScore(request));
    } catch {
      setSectionScore({
        completedUnits: 0,
        milestones: [],
        nextScore: 0,
        progress: 0,
        score: scoreValue,
      });
    }
  };

  const startNode = (node: RoadmapNode) => {
    setSelectedNodeId(null);
    if (node.type === "hangul") {
      router.push("/hangul");
      return;
    }
    const params = new URLSearchParams({ category: category ?? "" });
    if (node.lessonId) params.set("lessonId", node.lessonId);
    if (category === "grammar" && node.status === "completed") {
      params.set("mode", "lessonReview");
    }
    router.push(`/lesson?${params.toString()}`);
  };

  const reviewNode = (node: RoadmapNode) => {
    const params = new URLSearchParams({
      category: category ?? "",
      mode: "nodeReview",
      nodeId: node.id,
    });
    router.push(`/lesson?${params.toString()}`);
  };

  const legendNode = (node: RoadmapNode) => {
    const params = new URLSearchParams({
      category: category ?? "",
      energy: String(user?.energy ?? 0),
      nodeId: node.id,
    });
    router.push(`/legend-intro?${params.toString()}`);
  };

  const jumpToUnit = (unit: RoadmapUnit, target?: "section") => {
    const params = new URLSearchParams({
      category: category ?? "",
      section: String(unit.sectionNumber),
      unit: String(unit.unitNumber),
    });
    if (target) params.set("target", target);
    router.push(`/jump-start?${params.toString()}`);
  };

  const claimChest = async () => {
    if (claimingRef.current) return;
    claimingRef.current = true;
    try {
      const result = await claimStudyPathChests(request);
      if (result.claimed > 0) {
        updateUser({ gems: result.totalGems });
        setPendingChests(0);
        setRewardGems(result.gems);
      }
    } finally {
      claimingRef.current = false;
    }
  };

  const switchToGuided = async () => {
    try {
      await saveStudyMode(request, "guided");
      updateUser({ studyMode: "guided" });
      router.replace("/study-path");
    } catch {
      // 저장 실패 시 현재 자유 학습 화면을 유지한다.
    }
  };

  const visibleUnit = units[visibleUnitIndex] ?? units[0];

  if (!loading && category && !loadFailed && units.length === 0) {
    return (
      <main className={`${styles.pathPage} ${styles.comingSoonPage}`}>
        <button
          aria-label="Orqaga"
          className={styles.comingSoonBack}
          onClick={() => router.replace("/course-categories")}
          type="button"
        >
          <HomeIcon name="chevron" size={26} />
        </button>
        <span>🚧</span>
        <h1>Tez orada!</h1>
        <p>Bu kurs hali tayyorlanmoqda. Kuting!</p>
      </main>
    );
  }

  return (
    <main className={styles.pathPage}>
      <header className={styles.pathStats}>
        <button onClick={() => router.push("/courses")} type="button">
          <span>🇰🇷</span>
          <b>{scoreValue}</b>
          <span className={styles.caret}>▾</span>
        </button>
        <span>
          <HomeIcon name="flame" size={22} />
          <b>{user?.streak ?? 0}</b>
        </span>
        <span>
          <span className={styles.diamond}>◆</span>
          <b>{user?.gems ?? 0}</b>
        </span>
        {user?.isSuper ? (
          <span className={styles.superBadge}>SUPER</span>
        ) : (
          <span>
            <HomeIcon name="heart" size={23} />
            <b>{user?.energy ?? 0}</b>
          </span>
        )}
      </header>

      <div className={styles.studyModeSwitch}>
        <button onClick={() => void switchToGuided()} type="button">
          <LearningIcon name="footsteps" size={15} /> O&apos;quv yo&apos;li
        </button>
        <button className={styles.studyModeActive} type="button">
          <LearningIcon name="compass" size={15} /> Erkin o&apos;rganish
        </button>
      </div>

      {visibleUnit ? (
        <RoadmapBanner onOpen={() => void openSections()} unit={visibleUnit} />
      ) : null}

      {loading ? (
        <div className={styles.centerState}>
          <span className={styles.spinner} />
        </div>
      ) : loadFailed ? (
        <div className={styles.centerState}>
          <span className={styles.stateIcon}>☁</span>
          <strong>Darsni yuklab bo&apos;lmadi</strong>
          <button onClick={() => void load()} type="button">
            Qayta urinish
          </button>
        </div>
      ) : (
        <div className={styles.pathScroll} ref={scrollRef}>
          {units.map((unit) => {
            const route = roadmapRoutePaths(unit.nodes);
            return (
              <section
                className={styles.pathDay}
                id={unit.id}
                key={unit.id}
                ref={(element) => {
                  if (element) unitRefs.current.set(unit.id, element);
                  else unitRefs.current.delete(unit.id);
                }}
                style={{ "--unit-color": unit.color } as CSSProperties}
              >
                <div className={styles.dayTitle}>
                  <span>{unit.unitNumber}-birlik</span>
                  <strong>{unit.title}</strong>
                </div>
                <div
                  className={styles.nodesMap}
                  style={{ height: `${route.height + 70}px` }}
                >
                  <svg
                    aria-hidden="true"
                    className={styles.pathConnector}
                    preserveAspectRatio="none"
                    viewBox={`0 0 100 ${route.height + 4}`}
                  >
                    <path className={styles.connectorShadow} d={route.full} />
                    <path className={styles.connectorBase} d={route.full} />
                    {route.segments.map((segment, index) => (
                      <path
                        className={
                          segment.active
                            ? styles.connectorActive
                            : styles.connectorLocked
                        }
                        d={segment.d}
                        key={`${unit.id}:route:${index}`}
                      />
                    ))}
                    <path className={styles.connectorShine} d={route.full} />
                  </svg>

                  {unit.nodes.map((node, index) => {
                    const nodeOffset =
                      ROADMAP_NODE_OFFSETS[
                        index % ROADMAP_NODE_OFFSETS.length
                      ] ?? ROADMAP_NODE_OFFSETS[0];
                    const selected = selectedNodeId === node.id;
                    const progress =
                      ((node.completedLessons ?? 0) /
                        Math.max(1, node.totalLessons ?? 1)) *
                      360;
                    const jumpable = node.status === "locked" && index === 0;
                    return (
                      <div
                        className={`${styles.nodeRow} ${
                          selected ? styles.nodeRowSelected : ""
                        }`}
                        key={node.id}
                        style={
                          {
                            "--node-offset": `${nodeOffset}%`,
                            top: `${index * ROADMAP_NODE_ROW_HEIGHT}px`,
                          } as CSSProperties
                        }
                      >
                        <button
                          aria-label={node.title || unit.title}
                          className={`${styles.pathNode} ${roadmapStatusClass(
                            styles,
                            node.status,
                          )} ${jumpable ? styles.nodeJumpable : ""} ${
                            node.legendCompleted ? styles.nodeLegend : ""
                          } ${node.chestClaimable ? styles.nodeClaimable : ""} ${
                            node.type === "score" ? styles.scoreNode : ""
                          }`}
                          onClick={() => {
                            if (
                              category === "grammar" &&
                              node.status !== "locked"
                            ) {
                              startNode(node);
                              return;
                            }
                            setSelectedNodeId((current) =>
                              current === node.id ? null : node.id,
                            );
                          }}
                          style={
                            { "--node-progress": `${progress}deg` } as CSSProperties
                          }
                          type="button"
                        >
                          <span className={styles.nodeFace}>
                            {node.type === "chest" ? (
                              <span className={styles.chestIcon}>🎁</span>
                            ) : node.type === "score" ? (
                              <b className={styles.scoreNumber}>
                                {node.scoreValue ?? unit.unitNumber}
                              </b>
                            ) : jumpable ? (
                              <span className={styles.playIcon}>▶</span>
                            ) : (
                              <RoadmapNodeIcon node={node} />
                            )}
                          </span>
                        </button>

                        {node.status === "current" && !selected ? (
                          <span
                            className={styles.currentMascot}
                            style={
                              {
                                "--mascot-left": `${
                                  nodeOffset > 50
                                    ? nodeOffset - 28
                                    : nodeOffset + 20
                                }%`,
                              } as CSSProperties
                            }
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img alt="" src="/characters/hangulmon_default.png" />
                          </span>
                        ) : null}

                        {selected ? (
                          <RoadmapPopover
                            canJump={jumpable}
                            node={node}
                            onClaim={() => void claimChest()}
                            onClose={() => setSelectedNodeId(null)}
                            onJump={() => jumpToUnit(unit)}
                            onLegend={() => legendNode(node)}
                            onReview={() => reviewNode(node)}
                            onStart={() => startNode(node)}
                            unit={unit}
                          />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {nextSection ? (
            <section className={styles.nextLevelCard}>
              <span className={styles.nextLevelBadge}>KEYINGI BO&apos;LIM</span>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src="/characters/hangulmon_default.png" />
                <LearningIcon name="lock" size={21} />
                <strong>{nextSection.title}</strong>
              </div>
              <p>{nextSection.description}</p>
              <button
                className={styles.nextSectionJump}
                onClick={() => {
                  const params = new URLSearchParams({
                    category: category ?? "",
                    section: String(nextSection.sectionNumber),
                    target: "section",
                    unit: String(nextSection.firstUnitNumber || 1),
                  });
                  router.push(`/jump-start?${params.toString()}`);
                }}
                type="button"
              >
                Shu yerga o&apos;tasizmi?
              </button>
            </section>
          ) : null}
        </div>
      )}

      {!loading && units.length > 0 ? (
        <button
          aria-label="Hozirgi darsga o'tish"
          className={styles.jumpCurrent}
          onClick={() => {
            if (isPastSection) {
              setViewSection(undefined);
              return;
            }
            unitRefs.current
              .get(units[currentUnitIndex]?.id ?? "")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          style={{ "--jump-color": visibleUnit?.color } as CSSProperties}
          type="button"
        >
          {isPastSection
            ? "↶"
            : visibleUnitIndex > currentUnitIndex
              ? "↑"
              : "↓"}
        </button>
      ) : null}

      {sheetOpen ? (
        <RoadmapSectionSheet
          currentScore={scoreValue}
          onClose={() => setSheetOpen(false)}
          onJump={(section, firstUnit) => {
            setSheetOpen(false);
            const params = new URLSearchParams({
              category: category ?? "",
              section: String(section),
              target: "section",
              unit: String(firstUnit),
            });
            router.push(`/jump-start?${params.toString()}`);
          }}
          onOpen={(section) => {
            setSheetOpen(false);
            setViewSection(section === currentSection ? undefined : section);
          }}
          score={sectionScore}
          viewingSection={viewingSection}
        />
      ) : null}

      {rewardGems !== null ? (
        <section className={styles.rewardSheet}>
          <span className={styles.rewardChest}>🎁</span>
          <div>
            <small>Mukofot olindi</small>
            <strong>+{rewardGems} olmos</strong>
          </div>
          <button onClick={() => setRewardGems(null)} type="button">
            <HomeIcon name="check" size={19} />
          </button>
        </section>
      ) : null}
    </main>
  );
}
