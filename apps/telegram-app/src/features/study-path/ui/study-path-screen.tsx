"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { uzt } from "../../../shared/i18n/uz-text";
import { useTelegramBackOverride } from "../../../shared/telegram/back-button";
import { useRevealPopover } from "../../../shared/ui/use-reveal-popover";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useEnergyGuard, useEnergySync } from "../../energy/energy-gate";
import { CourseDropdown } from "../../roadmap/ui/course-dropdown";
import { AppIcon } from "../../roadmap/ui/map/icon";
import { JumpToCurrent } from "../../roadmap/ui/map/jump-to-current";
import { NextSectionLocked } from "../../roadmap/ui/map/next-section-locked";
import { NodePopover } from "../../roadmap/ui/map/node-popover";
import { RoadmapBackdrop } from "../../roadmap/ui/map/roadmap-backdrop";
import { RoadmapHeader } from "../../roadmap/ui/map/roadmap-header";
import map from "../../roadmap/ui/map/roadmap-map.module.css";
import { UnitRoadmap } from "../../roadmap/ui/map/unit-roadmap";
import { claimStudyPathChests, getStudyPath } from "../api/study-path";
import type { StudyDay, StudyNode, StudyPathResponse } from "../model/study-path";
import { buildStudyPathViewModel } from "../model/study-path-view";
import { DayBanner, LevelExamCard, SectionDivider, StudyNodePopover } from "./study-map-parts";
import styles from "./study-map.module.css";

/**
 * 학습 로드 (앱 StudyPathScreen) — 하루하루를 로드맵 지도와 같은 모양으로 그린다.
 * 지도·노드·배경·헤더는 자유 학습 로드맵(roadmap/ui/map)과 같은 조각을 쓴다.
 */
export function StudyPathScreen() {
  const router = useRouter();
  const [courseOpen, setCourseOpen] = useState(false);
  const { request, updateUser, user } = useTelegramAuth();
  const [data, setData] = useState<StudyPathResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [visibleDayIndex, setVisibleDayIndex] = useState(0);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const claimingRef = useRef(false);
  const guardLessonStart = useEnergyGuard();
  // 앱처럼 학습 로드의 뒤로가기는 홈으로
  useTelegramBackOverride(() => router.replace("/home"));
  const scrollRef = useRef<HTMLDivElement>(null);
  const dayRefs = useRef(new Map<string, HTMLElement>());
  // 아래쪽 노드를 눌러도 팝오버의 시작 버튼까지 보이게 (앱과 같은 동작)
  const isAutoScrolling = useRevealPopover(scrollRef, selectedNodeId);

  // 헤더 보석·에너지를 서버 값으로 (레슨에서 날아간 차감이 닿은 뒤에)
  useEnergySync();

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

  const viewModel = useMemo(
    () => (data ? buildStudyPathViewModel(data.days, (data.pendingChests ?? 0) > 0) : null),
    [data],
  );
  const units = useMemo(() => viewModel?.units ?? [], [viewModel]);
  const days = useMemo(() => data?.days ?? [], [data]);
  const currentDayIndex = data?.currentDayIndex ?? 0;

  // 들어오면 오늘 하루로
  useEffect(() => {
    if (!data || units.length === 0) return;
    setSelectedNodeId(null);
    requestAnimationFrame(() => {
      dayRefs.current.get(units[data.currentDayIndex]?.id ?? "")?.scrollIntoView({ block: "start" });
    });
  }, [data, units]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root || units.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
        if (!visible) return;
        const index = units.findIndex((unit) => unit.id === visible.target.id);
        if (index >= 0) {
          setVisibleDayIndex(index);
          // 팝오버를 보여 주려고 우리가 올린 스크롤이면 닫지 않는다
          if (!isAutoScrolling()) setSelectedNodeId(null);
        }
      },
      { root, rootMargin: "-8% 0px -58%", threshold: [0.2, 0.45, 0.7] },
    );
    dayRefs.current.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isAutoScrolling, units]);

  /** 노드 종류마다 이미 있는 화면으로 보낸다. 범위는 그 하루로 좁힌다 */
  const openNode = (node: StudyNode, day: StudyDay) => {
    if (node.status === "locked") return; // 미리보기만 되는 노드
    setSelectedNodeId(null);
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
    // 나머지는 레슨 화면에서 푼다 — 에너지가 없으면 에너지 모달부터 (앱 guardLessonStart)
    guardLessonStart(() => router.push(`/lesson?${params.toString()}`));
  };

  // 잠긴 노드도 열린다 — 앞으로 뭘 배우는지 미리 볼 수 있어야 한다. 시작만 못 할 뿐이다.
  const tapNode = (nodeId: string) => {
    const isChest = nodeId.includes("-auto-chest-");
    if (!isChest && !viewModel?.nodeById.has(nodeId)) return;
    setSelectedNodeId((current) => (current === nodeId ? null : nodeId));
  };

  /** 상자 받기 — 자유 학습과 같은 엔드포인트·같은 상자 화면 */
  const claimChest = async () => {
    if (claimingRef.current) return;
    claimingRef.current = true;
    try {
      const result = await claimStudyPathChests(request);
      if (result.claimed > 0) {
        updateUser({ gems: result.totalGems });
        void load();
        const params = new URLSearchParams({
          from: "studyPath",
          gemTotal: String(result.totalGems - result.gems),
          gems: String(result.gems),
          grade: result.grade ?? "wood",
        });
        router.push(`/chest-reward?${params.toString()}`);
      }
    } catch {
      // 못 받아도 화면을 막지 않는다
    } finally {
      claimingRef.current = false;
    }
  };

  const bannerDay = days[visibleDayIndex] ?? days[currentDayIndex];
  const bannerUnit = units[visibleDayIndex] ?? units[currentDayIndex];
  const isMax = (user as { superTier?: string | null } | null)?.superTier === "max";

  return (
    <main className={map.page}>
      <RoadmapBackdrop />
      <RoadmapHeader
        energy={user?.energy ?? 0}
        gems={user?.gems ?? 0}
        isMax={isMax}
        isSuper={Boolean(user?.isSuper)}
        onCourse={() => setCourseOpen(true)}
        score={data?.score ?? 0}
        streak={user?.streak ?? 0}
      />

      {bannerDay && bannerUnit ? (
        <DayBanner
          color={bannerUnit.color}
          day={bannerDay}
          level={data?.currentLevel ?? 1}
          // 급수 목록 — 아래 급은 바로, 위 급은 시험을 통과해야 간다
          onLevelPress={() => router.push("/study-level?from=studyPath")}
        />
      ) : null}

      {loading ? (
        <div className={styles.state}>
          <span className={map.spinner} />
        </div>
      ) : loadFailed ? (
        <div className={styles.state}>
          <span className={styles.errorIcon}>
            <AppIcon name="cloud-offline-outline" size={34} />
          </span>
          <p className={styles.stateTitle}>{uzt("studyPath.loadFailed")}</p>
          <button className={styles.retryButton} onClick={() => void load()} type="button">
            {uzt("studyPath.retry")}
          </button>
        </div>
      ) : units.length === 0 ? (
        <div className={styles.state}>
          <p className={styles.stateTitle}>{uzt("studyPath.empty")}</p>
        </div>
      ) : (
        <div
          className={`${map.scroll} ${selectedNodeId ? map.scrollOpen : ""}`}
          onClick={() => setSelectedNodeId(null)}
          ref={scrollRef}
        >
          {units.map((unit, index) => {
            const day = days[index];
            return (
              <section
                className={unit.nodes.some((node) => node.id === selectedNodeId) ? map.unitElevated : undefined}
                id={unit.id}
                key={unit.id}
                onClick={(event) => event.stopPropagation()}
                ref={(element) => {
                  if (element) dayRefs.current.set(unit.id, element);
                  else dayRefs.current.delete(unit.id);
                }}
                style={{ position: "relative" }}
              >
                {day?.sectionStart ? <SectionDivider color={unit.color} section={day.section} /> : null}
                <UnitRoadmap
                  avatar={user?.avatar}
                  customPopover
                  onNodeTap={tapNode}
                  renderPopover={({ node, onClose, triangleOffsetX }) => {
                    // 상자는 두 모드에서 똑같이 — 지도의 기본 말풍선을 쓴다
                    if (node.type === "chest") {
                      return (
                        <NodePopover
                          canJump={false}
                          node={node}
                          onClaimChest={() => void claimChest()}
                          onClose={onClose}
                          onGoLegend={() => undefined}
                          onJumpTest={() => undefined}
                          onLegend={() => undefined}
                          onReview={() => undefined}
                          onStart={() => undefined}
                          triangleOffsetX={triangleOffsetX}
                          unit={unit}
                        />
                      );
                    }
                    const entry = viewModel?.nodeById.get(node.id);
                    if (!entry) return null;
                    return (
                      <StudyNodePopover
                        color={unit.color}
                        node={entry.node}
                        onStart={() => openNode(entry.node, entry.day)}
                        step={entry.step}
                        stepCount={entry.day.nodes.length}
                        title={node.title ?? ""}
                        triangleOffsetX={triangleOffsetX}
                      />
                    );
                  }}
                  selectedNodeId={selectedNodeId}
                  unit={unit}
                />
              </section>
            );
          })}

          {/* 그 급을 다 끝냈으면 졸업 시험이 먼저다. 다음 급 안내는 그 뒤에 */}
          {data?.levelExam.available ? (
            <LevelExamCard
              level={data.currentLevel}
              onPress={() => router.push("/lesson?mode=levelExam&from=studyPath")}
              passed={data.levelExam.passed}
            />
          ) : data?.nextLevel ? (
            <NextSectionLocked
              badgeKey="studyPath.nextLevelBadge"
              description={data.nextLevel.description}
              jumpKey="studyPath.nextLevelJump"
              // 다음 급으로 건너뛰기 = 지금 급 졸업 시험. 합격하면 서버가 다음 급으로 올린다
              onJump={() => router.push("/lesson?mode=levelExam&from=studyPath")}
              sectionNumber={data.nextLevel.level}
              title={data.nextLevel.title}
            />
          ) : null}
        </div>
      )}

      {units.length > 0 && !loading ? (
        <JumpToCurrent
          color={bannerUnit?.color ?? "#776ee2"}
          direction={visibleDayIndex > currentDayIndex ? "up" : "down"}
          label="Bugungi darsga o'tish"
          onPress={() => {
            setSelectedNodeId(null);
            dayRefs.current
              .get(units[currentDayIndex]?.id ?? "")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      ) : null}

      {/* 🇰🇷 스코어 → 위에서 내려오는 과정·스코어 패널 (앱 CourseDropdown) */}
      <CourseDropdown onClose={() => setCourseOpen(false)} studyMode="guided" visible={courseOpen} />
    </main>
  );
}
