"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { HomeIcon } from "../../home/ui/home-icon";
import { LearningIcon } from "../../learning/ui/learning-icon";
import { claimStudyPathChests, getStudyPath } from "../api/study-path";
import {
  STUDY_NODE_COPY,
  STUDY_PATH_COLORS,
  studyCountLabel,
  studyNodeTitle,
  type ChestClaimResult,
  type StudyDay,
  type StudyNode,
  type StudyNodeKind,
  type StudyNodeStatus,
  type StudyPathResponse,
} from "../model/study-path";
import styles from "./study-path.module.css";

interface DisplayNode {
  claimable?: boolean;
  id: string;
  source?: StudyNode;
  status: StudyNodeStatus;
  type: "chest" | "study";
}

interface DisplayDay {
  color: string;
  day: StudyDay;
  nodes: DisplayNode[];
}

const NODE_OFFSETS = [64, 43, 34, 47];
const NODE_ROW_HEIGHT = 126;

function displayDays(data: StudyPathResponse): DisplayDay[] {
  const days = data.days.map((day, dayIndex) => {
    const nodes: DisplayNode[] = [];
    let lessonCount = 0;
    let chestIndex = 0;
    day.nodes.forEach((node, index) => {
      nodes.push({
        id: `${day.id}:${node.id}`,
        source: node,
        status: node.status,
        type: "study",
      });
      lessonCount += 1;
      if (lessonCount % 3 === 0 && index < day.nodes.length - 1) {
        chestIndex += 1;
        nodes.push({
          id: `${day.id}:chest:${chestIndex}`,
          status: node.status === "completed" ? "completed" : "locked",
          type: "chest",
        });
      }
    });
    return {
      color: STUDY_PATH_COLORS[dayIndex % STUDY_PATH_COLORS.length] ?? "#776ee2",
      day,
      nodes,
    };
  });

  if (data.pendingChests > 0) {
    for (let dayIndex = days.length - 1; dayIndex >= 0; dayIndex -= 1) {
      const target = [...(days[dayIndex]?.nodes ?? [])]
        .reverse()
        .find((node) => node.type === "chest" && node.status === "completed");
      if (target) {
        target.claimable = true;
        break;
      }
    }
  }
  return days;
}

function routePaths(nodes: DisplayNode[]) {
  const points = nodes.map((_, index) => ({
    x: NODE_OFFSETS[index % NODE_OFFSETS.length] ?? 50,
    y: 44 + index * NODE_ROW_HEIGHT,
  }));
  const segments = points.slice(1).map((point, index) => {
    const previous = points[index] ?? point;
    const middle = (previous.y + point.y) / 2;
    return {
      active: nodes[index]?.status !== "locked",
      d: `M ${previous.x} ${previous.y} C ${previous.x} ${middle}, ${point.x} ${middle}, ${point.x} ${point.y}`,
    };
  });
  return {
    full: segments.map((segment) => segment.d).join(" "),
    height: Math.max(100, points.at(-1)?.y ?? 100),
    segments,
  };
}

function nodeStatusClass(status: StudyNodeStatus): string {
  if (status === "completed") return styles.nodeCompleted ?? "";
  if (status === "current") return styles.nodeCurrent ?? "";
  return styles.nodeLocked ?? "";
}

function NodeIcon({ kind }: { kind: StudyNodeKind }) {
  if (kind === "review" || kind === "recap") {
    return <HomeIcon name="refresh" size={27} />;
  }
  if (kind === "words") return <LearningIcon name="albums" size={27} />;
  if (kind === "grammar") return <LearningIcon name="book" size={27} />;
  if (kind === "grammarQuiz") {
    return <LearningIcon name="construct" size={27} />;
  }
  if (kind === "final") return <HomeIcon name="ribbon" size={27} />;
  return (
    <svg aria-hidden="true" height="27" viewBox="0 0 24 24" width="27">
      <path
        d="m4 20 4.8-1.2L19 8.6 15.4 5 5.2 15.2ZM13.8 6.6l3.6 3.6M4 20l1.2-4.8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function StudyNodePopover({
  color,
  day,
  node,
  onStart,
  step,
}: {
  color: string;
  day: StudyDay;
  node: StudyNode;
  onStart: () => void;
  step: number;
}) {
  const locked = node.status === "locked";
  const completed = node.status === "completed";
  return (
    <article
      className={styles.nodePopover}
      style={{ "--node-color": color } as CSSProperties}
    >
      <span className={styles.popoverArrow} />
      <div className={styles.popoverTitleRow}>
        <span className={styles.popoverIcon}>
          {completed ? (
            <HomeIcon name="check" size={19} />
          ) : locked ? (
            <LearningIcon name="lock" size={18} />
          ) : (
            <NodeIcon kind={node.kind} />
          )}
        </span>
        <span>
          <small>
            {locked ? "Oldindan ko'rish · " : ""}
            {step} / {day.nodes.length}-bosqich
          </small>
          <strong>{studyNodeTitle(node)}</strong>
        </span>
      </div>
      <p>{STUDY_NODE_COPY[node.kind].description}</p>
      <div className={styles.popoverMeta}>
        {node.count > 0 ? <span>▱ {studyCountLabel(node)}</span> : null}
        {node.lessonCount > 1 ? (
          <span>
            ▤ Halqa {node.lessonsDone}/{node.lessonCount}
          </span>
        ) : null}
      </div>
      {locked ? (
        <div className={styles.lockedNotice}>
          <span>◷</span> Oldingi bosqichni tugatsangiz ochiladi
        </div>
      ) : (
        <button className={styles.nodeStart} onClick={onStart} type="button">
          {completed
            ? "Qayta ishlash"
            : node.lessonsDone > 0
              ? `${node.nextLesson}-dan davom`
              : "Boshlash"}
          <HomeIcon name="arrow" size={19} />
        </button>
      )}
    </article>
  );
}

function DayBanner({
  color,
  day,
  level,
  onLevelPress,
}: {
  color: string;
  day: StudyDay;
  level: number;
  onLevelPress: () => void;
}) {
  const done = day.nodes.filter((node) => node.done).length;
  const complete = day.nodes.length > 0 && done >= day.nodes.length;
  const progress = day.nodes.length > 0 ? (done / day.nodes.length) * 100 : 0;
  return (
    <section
      className={styles.dayBanner}
      style={{ "--day-color": color } as CSSProperties}
    >
      <span className={styles.dayBadge}>
        {complete ? <HomeIcon name="check" size={25} /> : day.dayNumber}
      </span>
      <span className={styles.dayBannerBody}>
        <small>
          {complete
            ? "Bugungi dars tugadi!"
            : `${day.dayNumber}-kun · ${day.phase === 1 ? "O'rganish" : "Mashq"}`}
        </small>
        <strong>{day.title}</strong>
        <span className={styles.dayProgressRow}>
          <i>
            <b style={{ width: `${progress}%` }} />
          </i>
          <em>
            {done}/{day.nodes.length}
          </em>
        </span>
      </span>
      <button onClick={onLevelPress} type="button">
        {level}-daraja <HomeIcon name="swap" size={13} />
      </button>
    </section>
  );
}

export function StudyPathScreen() {
  const router = useRouter();
  const { request, updateUser, user } = useTelegramAuth();
  const [data, setData] = useState<StudyPathResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [visibleDayIndex, setVisibleDayIndex] = useState(0);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [reward, setReward] = useState<ChestClaimResult | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dayRefs = useRef(new Map<string, HTMLElement>());

  const load = useCallback(async () => {
    setLoading(true);
    setLoadFailed(false);
    try {
      const result = await getStudyPath(request);
      setData(result);
      setVisibleDayIndex(result.currentDayIndex);
    } catch {
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    void load();
  }, [load]);

  const days = useMemo(() => (data ? displayDays(data) : []), [data]);

  useEffect(() => {
    if (!data || days.length === 0) return;
    const current = days[data.currentDayIndex];
    requestAnimationFrame(() => {
      dayRefs.current.get(current?.day.id ?? "")?.scrollIntoView({
        block: "start",
      });
    });
  }, [data, days]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root || days.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
        if (!visible) return;
        const index = days.findIndex((item) => item.day.id === visible.target.id);
        if (index >= 0) {
          setVisibleDayIndex(index);
          setSelectedNodeId(null);
        }
      },
      { root, rootMargin: "-8% 0px -58%", threshold: [0.2, 0.45, 0.7] },
    );
    dayRefs.current.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [days]);

  const openNode = (node: StudyNode, day: StudyDay) => {
    if (node.status === "locked") return;
    const params = new URLSearchParams({
      from: "studyPath",
      section: String(day.section),
      unit: String(day.unit),
    });
    if (node.kind === "words") {
      params.set("lesson", String(node.nextLesson));
      params.set("lessonCount", String(node.lessonCount));
      router.push(`/word-study?${params.toString()}`);
      return;
    }
    if (node.kind === "grammar") {
      router.push(`/grammar-list?${params.toString()}`);
      return;
    }
    params.set("mode", "unitPractice");
    params.set("kind", node.kind);
    params.set("group", String(node.group));
    params.set("lesson", String(node.nextLesson));
    router.push(`/lesson?${params.toString()}`);
  };

  const claimChest = async () => {
    if (claiming) return;
    setClaiming(true);
    try {
      const result = await claimStudyPathChests(request);
      if (result.claimed > 0) {
        updateUser({ gems: result.totalGems });
        setReward(result);
        await load();
      }
    } finally {
      setClaiming(false);
    }
  };

  const banner = days[visibleDayIndex] ?? days[data?.currentDayIndex ?? 0];

  return (
    <main className={styles.pathPage}>
      <header className={styles.pathStats}>
        <button onClick={() => router.push("/courses")} type="button">
          <span>🇰🇷</span>
          <b>{data?.score ?? 0}</b>
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

      {banner && data ? (
        <DayBanner
          color={banner.color}
          day={banner.day}
          level={data.currentLevel}
          onLevelPress={() => router.push("/study-level?from=studyPath")}
        />
      ) : null}

      {loading ? (
        <div className={styles.centerState}>
          <span className={styles.spinner} />
        </div>
      ) : loadFailed ? (
        <div className={styles.centerState}>
          <span className={styles.stateIcon}>☁</span>
          <strong>O&apos;quv yo&apos;lini yuklab bo&apos;lmadi.</strong>
          <button onClick={() => void load()} type="button">
            Qayta urinish
          </button>
        </div>
      ) : days.length === 0 ? (
        <div className={styles.centerState}>
          <strong>Hozircha tayyor dars yo&apos;q.</strong>
        </div>
      ) : (
        <div className={styles.pathScroll} ref={scrollRef}>
          {days.map(({ color, day, nodes }) => {
            const route = routePaths(nodes);
            return (
              <section
                className={styles.pathDay}
                id={day.id}
                key={day.id}
                ref={(element) => {
                  if (element) dayRefs.current.set(day.id, element);
                  else dayRefs.current.delete(day.id);
                }}
                style={{ "--unit-color": color } as CSSProperties}
              >
                {day.sectionStart ? (
                  <div className={styles.sectionDivider}>
                    <i />
                    <span>⚑ {day.section}-bo&apos;lim boshlandi</span>
                    <i />
                  </div>
                ) : null}
                <div className={styles.dayTitle}>
                  <span>{day.dayNumber}-kun</span>
                  <strong>
                    {day.phase === 1
                      ? `${day.title} o'rganish`
                      : `${day.title} mashq`}
                  </strong>
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
                        key={`${day.id}:route:${index}`}
                      />
                    ))}
                    <path className={styles.connectorShine} d={route.full} />
                  </svg>

                  {nodes.map((displayNode, index) => {
                    const source = displayNode.source;
                    const selected = selectedNodeId === displayNode.id;
                    const nodeOffset =
                      NODE_OFFSETS[index % NODE_OFFSETS.length] ?? 50;
                    const progress = source
                      ? (source.lessonsDone / Math.max(1, source.lessonCount)) * 360
                      : 0;
                    return (
                      <div
                        className={`${styles.nodeRow} ${
                          selected ? styles.nodeRowSelected : ""
                        }`}
                        key={displayNode.id}
                        style={
                          {
                            "--node-offset": `${nodeOffset}%`,
                            top: `${index * NODE_ROW_HEIGHT}px`,
                          } as CSSProperties
                        }
                      >
                        <button
                          aria-label={
                            source ? studyNodeTitle(source) : "Mukofot sandig'i"
                          }
                          className={`${styles.pathNode} ${
                            nodeStatusClass(displayNode.status)
                          } ${displayNode.claimable ? styles.nodeClaimable : ""}`}
                          disabled={displayNode.type === "chest" && !displayNode.claimable}
                          onClick={() => {
                            if (displayNode.type === "chest") {
                              if (displayNode.claimable) void claimChest();
                              return;
                            }
                            setSelectedNodeId((current) =>
                              current === displayNode.id ? null : displayNode.id,
                            );
                          }}
                          style={
                            {
                              "--node-progress": `${progress}deg`,
                            } as CSSProperties
                          }
                          type="button"
                        >
                          <span className={styles.nodeFace}>
                            {displayNode.type === "chest" ? (
                              <span className={styles.chestIcon}>🎁</span>
                            ) : source ? (
                              <NodeIcon kind={source.kind} />
                            ) : null}
                          </span>
                        </button>

                        {source?.status === "current" && !selected ? (
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

                        {selected && source ? (
                          <StudyNodePopover
                            color={color}
                            day={day}
                            node={source}
                            onStart={() => openNode(source, day)}
                            step={day.nodes.indexOf(source) + 1}
                          />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {data?.levelExam.available ? (
            <button
              className={`${styles.levelExamCard} ${
                data.levelExam.passed ? styles.levelExamPassed : ""
              }`}
              onClick={() => router.push("/lesson?mode=levelExam&from=studyPath")}
              type="button"
            >
              <span>
                <HomeIcon name="ribbon" size={27} />
              </span>
              <span>
                <strong>{data.currentLevel}-daraja bitiruv imtihoni</strong>
                <small>
                  {data.levelExam.passed
                    ? "Allaqachon o'tgansiz. Yana ishlashingiz mumkin."
                    : "Shu darajada o'rganganingizni 25 ta savolda sinaymiz."}
                </small>
              </span>
              <HomeIcon name="chevron" size={20} />
            </button>
          ) : null}

          {data?.nextLevel ? (
            <section className={styles.nextLevelCard}>
              <span className={styles.nextLevelBadge}>KEYINGI DARAJA</span>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src="/characters/hangulmon_default.png" />
                <LearningIcon name="lock" size={21} />
                <strong>{data.nextLevel.title}</strong>
              </div>
              <p>{data.nextLevel.description}</p>
            </section>
          ) : null}
        </div>
      )}

      {!loading && data && days.length > 0 ? (
        <button
          aria-label="Bugungi darsga o'tish"
          className={styles.jumpCurrent}
          onClick={() =>
            dayRefs.current
              .get(days[data.currentDayIndex]?.day.id ?? "")
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          style={{ "--jump-color": banner?.color } as CSSProperties}
          type="button"
        >
          {visibleDayIndex > data.currentDayIndex ? "↑" : "↓"}
        </button>
      ) : null}

      {reward ? (
        <section className={styles.rewardSheet}>
          <span className={styles.rewardChest}>🎁</span>
          <div>
            <small>Mukofot olindi</small>
            <strong>+{reward.gems} olmos</strong>
          </div>
          <button onClick={() => setReward(null)} type="button">
            <HomeIcon name="check" size={19} />
          </button>
        </section>
      ) : null}
    </main>
  );
}
