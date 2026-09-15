"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import { MobileIcon, type IoniconName } from "../../../shared/ui/mobile-icon";
import {
  completeHangul,
  getHangulProgress,
  type HangulMastery,
} from "../api/hangul";
import {
  HANGUL_CHARACTERS,
  type HangulCategory,
  type HangulCharacter,
} from "../model/hangul";
import styles from "./hangul.module.css";

const PARTICLES = Array.from({ length: 12 }, (_, index) => ({
  color: ["#776ee2", "#a78bfa", "#ffd786", "#7fd8f7", "#ffafcc"][
    index % 5
  ],
  delay: (index * 733) % 4000,
  duration: 8200 + ((index * 977) % 5600),
  left: (index * 37 + 9) % 96,
  size: 4 + ((index * 7) % 9),
  travel: 100 + ((index * 31) % 145),
}));

const GAMES: {
  icon: IoniconName;
  id: "drawing" | "memory" | "slot" | "speed" | "syllable";
  label: string;
  route: string;
}[] = [
  { id: "memory", icon: "albums", label: "Xotira", route: "/hangul-game" },
  { id: "drawing", icon: "create", label: "Chizish", route: "/hangul-drawing" },
  { id: "slot", icon: "dice", label: "Slot", route: "/jamo-slot" },
  { id: "speed", icon: "flash", label: "Tezlik", route: "/speed-round" },
  { id: "syllable", icon: "brush", label: "Bo'g'in yozish", route: "/syllable-drawing" },
];

function AmbientParticles() {
  return (
    <div aria-hidden="true" className={styles.particles}>
      {PARTICLES.map((particle, index) => (
        <i
          key={index}
          style={{
            "--particle-color": particle.color,
            "--particle-delay": String(particle.delay) + "ms",
            "--particle-duration": String(particle.duration) + "ms",
            "--particle-left": String(particle.left) + "%",
            "--particle-size": String(particle.size) + "px",
            "--particle-travel": String(particle.travel) + "px",
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

function MasteryCard({ learned, total }: { learned: number; total: number }) {
  const percent = total > 0 ? Math.round((learned / total) * 100) : 0;
  const [displayLearned, setDisplayLearned] = useState(0);
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    setDisplayLearned(0);
    setDisplayPercent(0);
    let learnedValue = 0;
    let percentValue = 0;
    const learnedStep = Math.max(1, Math.ceil(learned / 20));
    const percentStep = Math.max(1, Math.ceil(percent / 25));
    const learnedTimer = window.setInterval(() => {
      learnedValue = Math.min(learned, learnedValue + learnedStep);
      setDisplayLearned(learnedValue);
      if (learnedValue >= learned) window.clearInterval(learnedTimer);
    }, 40);
    const percentTimer = window.setInterval(() => {
      percentValue = Math.min(percent, percentValue + percentStep);
      setDisplayPercent(percentValue);
      if (percentValue >= percent) window.clearInterval(percentTimer);
    }, 40);
    return () => {
      window.clearInterval(learnedTimer);
      window.clearInterval(percentTimer);
    };
  }, [learned, percent]);

  return (
    <div className={styles.masteryWrap}>
      <div className={styles.masteryGlow} />
      <section className={styles.masteryCard}>
        <span className={styles.masterySparkTop}>
          <MobileIcon name="sparkles" size={16} />
        </span>
        <span className={styles.masterySparkBottom}>
          <MobileIcon name="sparkles" size={14} />
        </span>
        <span className={styles.masteryMascot}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src="/characters/hangulmon_proud.png" />
        </span>
        <div className={styles.masteryContent}>
          <small>BAJARILGAN</small>
          <div className={styles.masteryNumber}>
            <strong>{displayPercent}</strong><span>%</span>
          </div>
          <p>{displayLearned} / {total} o&apos;rganildi</p>
          <div className={styles.masteryTrack}>
            <i style={{ width: String(percent) + "%" }}><span /></i>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryTabs({
  onChange,
  value,
}: {
  onChange: (category: HangulCategory) => void;
  value: HangulCategory;
}) {
  return (
    <div className={styles.categoryTabs}>
      <i className={value === "vowel" ? styles.tabIndicatorRight : ""} />
      <button onClick={() => onChange("consonant")} type="button">
        <span className={value === "consonant" ? styles.tabActive : ""}>Undosh</span>
      </button>
      <button onClick={() => onChange("vowel")} type="button">
        <span className={value === "vowel" ? styles.tabActive : ""}>Unli</span>
      </button>
    </div>
  );
}

function masteryClass(mastery: HangulMastery): string {
  if (mastery === 3) return styles.characterMastered ?? "";
  if (mastery === 2) return styles.characterLearned ?? "";
  if (mastery === 1) return styles.characterStarted ?? "";
  return styles.characterNew ?? "";
}

function CharacterCard({
  character,
  index,
  mastery,
  onPress,
}: {
  character: HangulCharacter;
  index: number;
  mastery: HangulMastery;
  onPress: () => void;
}) {
  return (
    <div
      className={[styles.characterWrap, masteryClass(mastery)].join(" ")}
      style={{ "--card-delay": String(Math.min(index * 18, 320)) + "ms" } as CSSProperties}
    >
      {mastery === 3 ? <i className={styles.characterGlow} /> : null}
      <i className={styles.characterDepth} />
      <button onClick={onPress} type="button">
        <strong>{character.char}</strong>
        <span>{character.romanization}</span>
        <em>
          {[0, 1, 2].map((star) => (
            <MobileIcon
              key={star}
              name={star < mastery ? "star" : "star-outline"}
              size={11}
            />
          ))}
        </em>
      </button>
    </div>
  );
}

function CharacterDetailSheet({
  character,
  onClose,
  onStartGame,
  speak,
  speaking,
}: {
  character: HangulCharacter;
  onClose: () => void;
  onStartGame: () => void;
  speak: (text: string) => void;
  speaking: boolean;
}) {
  const [sheetY, setSheetY] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const dragRef = useRef<{
    pointerId: number;
    startAt: number;
    startY: number;
  } | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag) return;
    const elapsed = Math.max(1, performance.now() - drag.startAt);
    const velocity = ((event.clientY - drag.startY) / elapsed) * 1000;
    if (sheetY > 90 || velocity > 800) {
      setTransitioning(true);
      setSheetY(800);
      window.setTimeout(onClose, 250);
      return;
    }
    setTransitioning(true);
    setSheetY(0);
    window.setTimeout(() => setTransitioning(false), 160);
  };

  return (
    <div className={styles.detailRoot}>
      <button
        aria-label="Yopish"
        className={styles.detailBackdrop}
        onClick={onClose}
        type="button"
      />
      <section
        aria-label={character.name}
        aria-modal="true"
        className={[
          styles.detailSheet,
          transitioning ? styles.detailTransitioning : "",
        ].filter(Boolean).join(" ")}
        role="dialog"
        style={{ transform: "translateY(" + String(sheetY) + "px)" }}
      >
        <div
          className={styles.detailHandleZone}
          onPointerDown={(event) => {
            dragRef.current = {
              pointerId: event.pointerId,
              startAt: performance.now(),
              startY: event.clientY,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
            setTransitioning(false);
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current;
            if (!drag || drag.pointerId !== event.pointerId) return;
            setSheetY(Math.max(0, event.clientY - drag.startY));
          }}
          onPointerUp={finishDrag}
        >
          <i />
        </div>

        <div className={styles.detailScroll}>
          <div className={styles.detailCharacterArea}>
            <i />
            <span>{character.char}</span>
          </div>
          <h2>{character.name}</h2>
          <p className={styles.detailRoman}>{character.romanization}</p>

          <button
            className={[
              styles.detailAudio,
              speaking ? styles.detailAudioActive : "",
            ].filter(Boolean).join(" ")}
            onClick={() => speak(character.name)}
            type="button"
          >
            <MobileIcon
              name={speaking ? "volume-high" : "volume-medium"}
              size={22}
            />
            Tinglash
          </button>

          <h3>Misol so&apos;zlar</h3>
          <div className={styles.detailExamples}>
            {character.examples.map((example, index) => (
              <button
                key={index}
                onClick={() => speak(example.word)}
                type="button"
              >
                <strong>{example.word}</strong>
                <span>{example.romanization}</span>
                <MobileIcon name="volume-medium-outline" size={14} />
              </button>
            ))}
          </div>

          <button
            className={styles.detailGame}
            onClick={() => {
              onClose();
              window.setTimeout(onStartGame, 300);
            }}
            type="button"
          >
            <MobileIcon name="game-controller" size={20} />
            O&apos;yin orqali mashq
          </button>
        </div>
      </section>
    </div>
  );
}

function GameMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className={[styles.gameMenu, open ? styles.gameMenuOpen : ""].filter(Boolean).join(" ")}>
      {GAMES.map((game, index) => (
        <button
          aria-hidden={!open}
          className={styles.gameMenuItem}
          key={game.id}
          onClick={() => {
            setOpen(false);
            router.push(game.route);
          }}
          style={{ "--game-index": index + 1 } as CSSProperties}
          tabIndex={open ? 0 : -1}
          type="button"
        >
          <MobileIcon name={game.icon} size={19} />
          <span>{game.label}</span>
        </button>
      ))}
      <button
        aria-expanded={open}
        aria-label="O'yinlar"
        className={styles.gameFab}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <MobileIcon name="game-controller" size={22} />
      </button>
    </div>
  );
}

export function HangulScreen() {
  const router = useRouter();
  const { request, updateUser, user } = useTelegramAuth();
  const { prewarm, speak, speaking, stop } = useKoreanSpeech(request);
  const [category, setCategory] = useState<HangulCategory>("consonant");
  const [selected, setSelected] = useState<HangulCharacter | null>(null);
  const [masteryMap, setMasteryMap] = useState<Record<string, HangulMastery>>({});
  const [learnedCount, setLearnedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(HANGUL_CHARACTERS.length);
  const [finishing, setFinishing] = useState(false);
  const needsHangulNode =
    user?.hangulLevel === "none" && !user?.hangulCompletedAt;

  useEffect(() => {
    let active = true;
    void getHangulProgress(request)
      .then((result) => {
        if (!active) return;
        const nextMap: Record<string, HangulMastery> = {};
        for (const progress of result.progress) {
          nextMap[progress.characterId] = progress.mastery;
        }
        setMasteryMap(nextMap);
        setLearnedCount(result.learnedCount);
        setTotalCount(result.total || HANGUL_CHARACTERS.length);
        if (result.hangulCompletedAt) {
          updateUser({ hangulCompletedAt: result.hangulCompletedAt });
        }
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [request, updateUser]);

  const characters = useMemo(
    () => HANGUL_CHARACTERS.filter((character) => character.category === category),
    [category],
  );

  useEffect(() => {
    if (!selected) return;
    prewarm([selected.name, ...selected.examples.map((example) => example.word)]);
  }, [prewarm, selected]);

  const finishHangul = async () => {
    if (finishing) return;
    setFinishing(true);
    try {
      const result = await completeHangul(request);
      updateUser({ hangulCompletedAt: result.hangulCompletedAt });
      router.replace("/roadmap");
    } catch {
      setFinishing(false);
    }
  };

  const closeDetail = () => {
    stop();
    setSelected(null);
  };

  return (
    <main className={styles.hangulPage}>
      <AmbientParticles />
      <header className={styles.header}>
        <button
          aria-label="Orqaga"
          onClick={() => {
            if (window.history.length > 1) router.back();
            else router.replace("/roadmap");
          }}
          type="button"
        >
          <MobileIcon name="chevron-back" size={28} />
        </button>
        <h1>Hangul ustasi</h1>
        <span />
      </header>

      <div className={styles.scroll}>
        <MasteryCard learned={learnedCount} total={totalCount} />
        {needsHangulNode ? (
          <button
            className={styles.doneButton}
            disabled={finishing}
            onClick={() => void finishHangul()}
            type="button"
          >
            <MobileIcon name="checkmark-circle" size={20} />
            Hangulni o‘rgandim
          </button>
        ) : null}
        <CategoryTabs onChange={setCategory} value={category} />
        <section className={styles.characterGrid} key={category}>
          {characters.map((character, index) => (
            <CharacterCard
              character={character}
              index={index}
              key={character.id}
              mastery={masteryMap[character.id] ?? 0}
              onPress={() => setSelected(character)}
            />
          ))}
        </section>
      </div>

      <GameMenu />
      {selected ? (
        <CharacterDetailSheet
          character={selected}
          onClose={closeDetail}
          onStartGame={() => router.push("/hangul-game?category=" + category)}
          speak={speak}
          speaking={speaking}
        />
      ) : null}
    </main>
  );
}
