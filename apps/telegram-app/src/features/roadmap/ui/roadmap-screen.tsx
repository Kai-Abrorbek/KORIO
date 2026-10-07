"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useEnergyGuard } from "../../energy/energy-gate";
import { energySpendsSettled } from "../../energy/energy-sync";
import { useRevealPopover } from "../../../shared/ui/use-reveal-popover";
import { useTelegramBackOverride } from "../../../shared/telegram/back-button";
import { uzt } from "../../../shared/i18n/uz-text";
import { claimStudyPathChests } from "../../study-path/api/study-path";
import { getRoadmap, getRoadmapScore } from "../api/roadmap";
import { prepareRoadmapUnits } from "../model/roadmap-view";
import type {
  RoadmapNode,
  RoadmapScoreResponse,
  RoadmapUnit,
} from "../model/roadmap";
import { RoadmapSectionSheet } from "./roadmap-section-sheet";
import { CourseDropdown } from "./course-dropdown";
import { AppIcon } from "./map/icon";
import { JumpToCurrent } from "./map/jump-to-current";
import { NextSectionLocked } from "./map/next-section-locked";
import { NodePopover } from "./map/node-popover";
import { RoadmapBackdrop } from "./map/roadmap-backdrop";
import { RoadmapHeader } from "./map/roadmap-header";
import map from "./map/roadmap-map.module.css";
import { SectionBanner } from "./map/section-banner";
import { UnitRoadmap } from "./map/unit-roadmap";

interface NextSection {
  description: string;
  firstUnitNumber: number;
  sectionNumber: number;
  title: string;
}

export function RoadmapScreen() {
  const router = useRouter();
  const [courseOpen, setCourseOpen] = useState(false);
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const unitRefs = useRef(new Map<string, HTMLElement>());
  const claimingRef = useRef(false);
  const guardLessonStart = useEnergyGuard();
  // 아래쪽 노드를 눌러도 팝오버의 시작 버튼까지 보이게 (앱과 같은 동작)
  const isAutoScrolling = useRevealPopover(scrollRef, selectedNodeId);

  // 앱처럼 로드맵의 뒤로가기는 홈으로 (코스 선택 화면을 거쳐 들어왔어도)
  useTelegramBackOverride(() => router.replace("/home"));

  // 헤더의 보석·에너지·스트릭을 서버 값으로 맞춘다 (레슨을 끝내고 돌아오면 바뀌어 있다)
  useEffect(() => {
    // 레슨에서 날아간 에너지 차감이 서버에 닿은 뒤에 묻는다 (먼저 물으면 한 칸 덜 깎인 값이 온다)
    void energySpendsSettled()
      .then(() =>
        request<{ gems?: number; energy?: number; streak?: number; isSuper?: boolean; superExpiresAt?: string | null }>("/users/me"),
      )
      .then((me) =>
        updateUser({
          energy: me.energy,
          gems: me.gems,
          isSuper: me.isSuper,
          streak: me.streak,
          superExpiresAt: me.superExpiresAt,
        }),
      )
      .catch(() => undefined);
  }, [request, updateUser]);

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
          // 팝오버를 보여 주려고 우리가 올린 스크롤이면 닫지 않는다
          if (!isAutoScrolling()) setSelectedNodeId(null);
        }
      },
      { root, rootMargin: "-8% 0px -58%", threshold: [0.2, 0.45] },
    );
    unitRefs.current.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isAutoScrolling, units]);

  const openSections = async () => {
    setSheetOpen(true);
    setSectionScore(null);
    try {
      // 트랙별로 센다 — 안 넘기면 문법 로드맵에 어휘 섹션(1~5)이 떴다
      setSectionScore(await getRoadmapScore(request, category));
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
    // 에너지가 없으면 레슨 대신 에너지 모달 (앱의 guardLessonStart)
    guardLessonStart(() => router.push(`/lesson?${params.toString()}`));
  };

  const reviewNode = (node: RoadmapNode) => {
    setSelectedNodeId(null);
    const params = new URLSearchParams({
      category: category ?? "",
      mode: "nodeReview",
      nodeId: node.id,
    });
    guardLessonStart(() => router.push(`/lesson?${params.toString()}`));
  };

  const legendNode = (node: RoadmapNode) => {
    setSelectedNodeId(null);
    const params = new URLSearchParams({
      category: category ?? "",
      energy: String(user?.energy ?? 0),
      nodeId: node.id,
    });
    guardLessonStart(() => router.push(`/legend-intro?${params.toString()}`));
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
        // 보석은 서버가 준 총량으로 맞춘다. 화면에서 더하면 어긋난다
        updateUser({ gems: result.totalGems });
        setPendingChests(0);
        setSelectedNodeId(null);
        // 상자 여는 연출은 앱과 같은 화면(탭해서 열기·보석 쏟아짐)을 쓴다.
        // gemTotal 은 받기 **전** 값이라야 카운터가 올라가는 게 보인다
        const params = new URLSearchParams({
          category: category ?? "",
          gemTotal: String(result.totalGems - result.gems),
          gems: String(result.gems),
          grade: result.grade ?? "wood",
        });
        router.push(`/chest-reward?${params.toString()}`);
      }
    } catch {
      // 못 받아도 화면을 막지 않는다. 다시 누르면 된다
    } finally {
      claimingRef.current = false;
    }
  };

  /** 스코어 배지 → 그 유닛 첫 노드로 올라가서 팝오버를 연다 (앱 handleGoLegend) */
  const goLegend = (unit: RoadmapUnit) => {
    const first = unit.nodes[0];
    if (!first) return;
    setSelectedNodeId(null);
    unitRefs.current.get(unit.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => setSelectedNodeId(first.id), 400);
  };

  const visibleUnit = units[visibleUnitIndex] ?? units[0];
  const isMax = (user as { superTier?: string | null } | null)?.superTier === "max";

  if (!loading && category && !loadFailed && units.length === 0) {
    return (
      <main className={map.page}>
        <RoadmapBackdrop />
        <div className={map.soon}>
          <button
            aria-label="Orqaga"
            className={map.soonBack}
            onClick={() => router.replace("/course-categories")}
            type="button"
          >
            <AppIcon name="chevron-back" size={28} />
          </button>
          <span>🚧</span>
          <h1>{uzt("roadmap.comingSoonTitle")}</h1>
          <p>{uzt("roadmap.comingSoonDesc")}</p>
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
        score={scoreValue}
        streak={user?.streak ?? 0}
      />

      {/* 고정 배너 */}
      {visibleUnit ? (
        <SectionBanner
          color={visibleUnit.color}
          onPress={() => void openSections()}
          sectionNumber={visibleUnit.sectionNumber}
          title={visibleUnit.title}
          unitNumber={visibleUnit.unitNumber}
        />
      ) : null}

      {loading ? (
        <div className={map.center}>
          <span className={map.spinner} />
        </div>
      ) : loadFailed ? (
        <div className={map.center}>
          <AppIcon name="cloud-offline-outline" size={40} />
          <strong>Darsni yuklab bo&apos;lmadi</strong>
          <button className={map.retry} onClick={() => void load()} type="button">
            Qayta urinish
          </button>
        </div>
      ) : (
        <div
          className={`${map.scroll} ${selectedNodeId ? map.scrollOpen : ""}`}
          onClick={() => setSelectedNodeId(null)}
          ref={scrollRef}
        >
          {units.map((unit) => (
            <section
              className={unit.nodes.some((node) => node.id === selectedNodeId) ? map.unitElevated : undefined}
              id={unit.id}
              key={unit.id}
              onClick={(event) => event.stopPropagation()}
              ref={(element) => {
                if (element) unitRefs.current.set(unit.id, element);
                else unitRefs.current.delete(unit.id);
              }}
              style={{ position: "relative" }}
            >
              <UnitRoadmap
                avatar={user?.avatar}
                directStart={category === "grammar"}
                onNodeStart={startNode}
                onNodeTap={(nodeId) => setSelectedNodeId((current) => (current === nodeId ? null : nodeId))}
                renderPopover={({ index, node, onClose, triangleOffsetX }) => (
                  <NodePopover
                    canJump={index === 0 && node.status === "locked"}
                    node={node}
                    onClaimChest={() => void claimChest()}
                    onClose={onClose}
                    onGoLegend={() => goLegend(unit)}
                    onJumpTest={() => jumpToUnit(unit)}
                    onLegend={() => legendNode(node)}
                    onReview={() => reviewNode(node)}
                    onStart={() => startNode(node)}
                    triangleOffsetX={triangleOffsetX}
                    unit={unit}
                  />
                )}
                selectedNodeId={selectedNodeId}
                unit={unit}
              />
            </section>
          ))}

          {nextSection ? (
            <NextSectionLocked
              description={nextSection.description}
              onJump={() => {
                setSelectedNodeId(null);
                const params = new URLSearchParams({
                  category: category ?? "",
                  section: String(nextSection.sectionNumber),
                  target: "section",
                  unit: String(nextSection.firstUnitNumber || 1),
                });
                router.push(`/jump-start?${params.toString()}`);
              }}
              sectionNumber={nextSection.sectionNumber}
              title={nextSection.title}
            />
          ) : null}
        </div>
      )}

      {/* current 유닛으로 점프 버튼 */}
      {!loading && units.length > 0 ? (
        <JumpToCurrent
          color={units[currentUnitIndex]?.color ?? "#776ee2"}
          direction={isPastSection ? "back" : visibleUnitIndex > currentUnitIndex ? "up" : "down"}
          label="Hozirgi darsga o'tish"
          onPress={() => {
            // 지난 섹션을 보고 있으면 "현재 섹션으로 돌아가기" — 그 안엔 current 유닛이 없다
            if (isPastSection) {
              setViewSection(undefined);
              return;
            }
            unitRefs.current
              .get(units[currentUnitIndex]?.id ?? "")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
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

      {/* 🇰🇷 스코어 → 위에서 내려오는 과정·스코어 패널 (앱 CourseDropdown) */}
      <CourseDropdown category={category} onClose={() => setCourseOpen(false)} studyMode="free" visible={courseOpen} />
    </main>
  );
}
