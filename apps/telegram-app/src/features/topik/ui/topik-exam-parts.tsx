/* eslint-disable @next/next/no-img-element -- TOPIK stimulus URLs are supplied by the API. */

import type { ReactNode } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import {
  topikUzText,
  type TopikAudio,
  type TopikChoice,
  type TopikLearningSupport,
  type TopikQuestionWithGroup,
  type TopikRevealedSolution,
  type TopikStimulus,
  type TopikTextBlock,
} from "../model/topik";
import type { TopikPlaybackStatus } from "../browser/use-topik-listening-playback";
import styles from "./topik-exam-screen.module.css";

const MARKERS = ["㉠", "㉡", "㉢", "㉣"];
const CHOICE_MARKS: Record<string, string> = {
  "1": "①",
  "2": "②",
  "3": "③",
  "4": "④",
};

function segmentText(segment: TopikTextBlock["segments"][number]) {
  if (segment.type === "blank") return segment.text || "(       )";
  if (segment.type === "insertion_marker") {
    const number = Number(segment.label || segment.text);
    return Number.isFinite(number) && number >= 1 && number <= 4
      ? MARKERS[number - 1]
      : segment.label || segment.text || "(  )";
  }
  return segment.text;
}

export function TopikTextBlocks({
  blocks,
  highlightedKeys = new Set(),
  className = "",
}: {
  blocks: TopikTextBlock[];
  highlightedKeys?: ReadonlySet<string>;
  className?: string;
}) {
  return (
    <div className={`${styles.textBlocks} ${className}`}>
      {blocks.map((block, blockIndex) => (
        <p
          className={`${styles.textBlock} ${styles[`block_${block.type}`]}`}
          key={`${block.type}-${blockIndex}`}
        >
          {block.type === "bullet" ? "• " : null}
          {block.segments.map((segment, segmentIndex) => (
            <span
              className={`${styles[`segment_${segment.type}`]} ${
                segment.key && highlightedKeys.has(segment.key)
                  ? styles.highlighted
                  : ""
              }`}
              key={`${segment.key || segment.type}-${segmentIndex}`}
            >
              {segmentText(segment)}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

function listeningAsset(key: string) {
  if (!key) return "";
  if (key.startsWith("topik-ii-listening-mock-2-")) {
    return `/topik/listening/listening-mock-2/${key.replace("topik-ii-listening-mock-2-", "")}.png`;
  }
  if (key.startsWith("topik-i-37-")) {
    return `/topik/listening/topik-i-37-listening/${key.replace("topik-i-37-", "")}.png`;
  }
  return `/topik/listening/listening-mock-1/${key}.png`;
}

function ChoiceList({
  choices,
  layout,
  selectedChoiceKey,
  correctChoiceKey,
  disabled,
  onSelect,
}: {
  choices: TopikChoice[];
  layout: string;
  selectedChoiceKey?: string;
  correctChoiceKey?: string;
  disabled?: boolean;
  onSelect?: (key: string) => void;
}) {
  const grid = layout !== "one_column";
  return (
    <div className={`${styles.choiceList} ${grid ? styles.choiceGrid : ""}`}>
      {choices.map((choice) => {
        const selected = choice.key === selectedChoiceKey;
        const correct = choice.key === correctChoiceKey;
        const wrong = Boolean(correctChoiceKey && selected && !correct);
        const image = listeningAsset(choice.imageAssetKey);
        return (
          <button
            aria-label={choice.imageAlt || choice.text}
            aria-pressed={selected}
            className={`${styles.choice} ${grid ? styles.gridChoice : ""} ${
              image ? styles.visualChoice : ""
            } ${selected ? styles.selectedChoice : ""} ${
              correct ? styles.correctChoice : ""
            } ${wrong ? styles.wrongChoice : ""}`}
            disabled={disabled}
            key={choice.key}
            onClick={() => onSelect?.(choice.key)}
            type="button"
          >
            <span className={styles.choiceNumber}>
              {CHOICE_MARKS[choice.key] ?? choice.key}
            </span>
            {image ? (
              <img alt={choice.imageAlt || choice.text} src={image} />
            ) : (
              <span className={styles.choiceText}>{choice.text}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function StimulusCard({
  stimulus,
  highlightedKeys,
}: {
  stimulus: TopikStimulus;
  highlightedKeys?: ReadonlySet<string>;
}) {
  if (stimulus.kind === "advertisement") {
    return (
      <section className={styles.advertisement}>
        {stimulus.title ? <h3>{stimulus.title}</h3> : null}
        {stimulus.subtitle ? <p>{stimulus.subtitle}</p> : null}
        <TopikTextBlocks blocks={stimulus.blocks} className={styles.centerText} />
        {stimulus.bulletItems.map((item) => <span key={item}>• {item}</span>)}
      </section>
    );
  }
  if (stimulus.kind === "notice" || stimulus.kind === "info_card") {
    return (
      <section className={styles.notice}>
        {stimulus.title ? <h3>{stimulus.title}</h3> : null}
        {stimulus.subtitle ? <p>{stimulus.subtitle}</p> : null}
        {stimulus.bulletItems.map((item) => (
          <span className={styles.noticeRow} key={item}><i />{item}</span>
        ))}
        {stimulus.infoItems.map((item) => (
          <span className={styles.infoRow} key={`${item.label}-${item.value}`}>
            <b>{item.label}</b><em>{item.value}</em>
          </span>
        ))}
        <TopikTextBlocks blocks={stimulus.blocks} />
      </section>
    );
  }
  if (stimulus.kind === "chart" && stimulus.chart) {
    const chart = stimulus.chart;
    return (
      <section className={styles.chartCard}>
        {chart.title ? <h3>{chart.title}</h3> : null}
        {chart.subtitle ? <p>{chart.subtitle}</p> : null}
        {stimulus.imageUrl ? (
          <img alt={stimulus.imageAlt} className={styles.chartImage} src={stimulus.imageUrl} />
        ) : (
          <div className={styles.tableScroll}>
            <table><thead><tr><th />{chart.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
              <tbody>{chart.rows.map((row) => <tr key={row.label}><th>{row.label}</th>{row.values.map((value, index) => <td key={`${row.label}-${index}`}>{value}</td>)}</tr>)}</tbody>
            </table>
          </div>
        )}
        {chart.unit ? <small>Birlik: {chart.unit}</small> : null}
        {chart.sourceNote ? <small>{chart.sourceNote}</small> : null}
      </section>
    );
  }
  if (stimulus.kind === "sentence_set") {
    return (
      <section className={styles.sentenceSet}>
        {stimulus.labeledSentences.map((sentence) => (
          <div key={sentence.label}><b>{sentence.label}</b><TopikTextBlocks blocks={sentence.blocks} highlightedKeys={highlightedKeys} /></div>
        ))}
      </section>
    );
  }
  if (stimulus.kind === "headline") {
    return <section className={styles.headline}><small>Gazeta sarlavhasi</small><strong>{stimulus.title}</strong></section>;
  }
  return (
    <section className={styles.passageStack}>
      {stimulus.givenText.length ? <div className={styles.givenText}><b>Berilgan gap</b><TopikTextBlocks blocks={stimulus.givenText} /></div> : null}
      {stimulus.title ? <h3>{stimulus.title}</h3> : null}
      <div className={styles.passage}><TopikTextBlocks blocks={stimulus.blocks} highlightedKeys={highlightedKeys} /></div>
      {stimulus.imageUrl ? <img alt={stimulus.imageAlt} className={styles.stimulusImage} src={stimulus.imageUrl} /> : null}
    </section>
  );
}

export function QuestionCard({
  question,
  selectedChoiceKey,
  correctChoiceKey,
  highlightedKeys,
  disabled,
  onSelect,
}: {
  question: TopikQuestionWithGroup;
  selectedChoiceKey?: string;
  correctChoiceKey?: string;
  highlightedKeys?: ReadonlySet<string>;
  disabled?: boolean;
  onSelect: (choiceKey: string) => void;
}) {
  const stimulus = question.stimulus ?? question.group.sharedStimulus;
  return (
    <article className={styles.questionPaper}>
      <div className={styles.instruction}><TopikTextBlocks blocks={question.group.instruction} /></div>
      {stimulus ? <StimulusCard stimulus={stimulus} highlightedKeys={highlightedKeys} /> : null}
      <div className={styles.questionRow}><b>{String(question.number).padStart(2, "0")}</b><TopikTextBlocks blocks={question.prompt} className={styles.prompt} highlightedKeys={highlightedKeys} /></div>
      <ChoiceList choices={question.choices} correctChoiceKey={correctChoiceKey} disabled={disabled} layout={question.presentation.choiceLayout} onSelect={onSelect} selectedChoiceKey={selectedChoiceKey} />
    </article>
  );
}

const WAVEFORM = [11, 20, 15, 29, 18, 35, 22, 30, 14, 25, 17, 32, 20, 27, 12];

function ListeningPlayer({ audio, showTranscript, isPlaying, playCount, repeatCount, onPlay, onStop }: {
  audio: TopikAudio; showTranscript: boolean; isPlaying: boolean; playCount: number; repeatCount: number; onPlay: () => void; onStop: () => void;
}) {
  const canPlay = playCount < audio.guidedPlaybackLimit;
  return <div className={styles.listeningWrap}>
    <section className={styles.listeningPlayer}>
      <div className={styles.playerTop}><span><MobileIcon name="headset" size={14} /> Tinglash audiosi</span><small>{playCount} / {audio.guidedPlaybackLimit} marta</small></div>
      <div className={styles.playerControls}>
        <button aria-label={isPlaying ? "To‘xtatish" : "Eshitish"} disabled={!isPlaying && !canPlay} onClick={isPlaying ? onStop : onPlay} type="button"><MobileIcon name={isPlaying ? "stop" : playCount > 0 ? "refresh" : "play"} size={24} /></button>
        <div className={styles.waveform}>{WAVEFORM.map((height, index) => <i className={isPlaying && index % 3 === playCount % 3 ? styles.waveActive : ""} key={`${height}-${index}`} style={{ height }} />)}</div>
      </div>
      <p><MobileIcon name="phone-portrait-outline" size={13} /> {audio.audioUrl ? "Asl imtihon audiosi" : "Qurilmaning koreyscha ovozi bilan"}</p>
      {repeatCount > 1 ? <em><MobileIcon name="repeat" size={13} /> Ketma-ket {repeatCount} marta eshittiriladi</em> : null}
    </section>
    {showTranscript ? <section className={styles.transcript}><header><span><MobileIcon name="document-text-outline" size={16} /></span><div><small>IZOHLI REJIM</small><strong>To‘liq matn</strong></div></header>{audio.transcript.map((line, index) => <p key={`${line.speaker}-${index}`}><b>{line.speaker}</b><span>{line.text}</span></p>)}</section> : null}
  </div>;
}

function ExamAudioStatus({ status }: { status: TopikPlaybackStatus }) {
  const failed = status === "error" || status === "unavailable";
  const completed = status === "completed";
  return <section className={styles.examAudioStatus}><span><MobileIcon name={failed ? "alert-circle-outline" : completed ? "checkmark-circle-outline" : "headset"} size={23} /></span><div><small>HAQIQIY IMTIHON AUDIOSI</small><strong>{failed ? "Imtihon audiosini ijro etib bo‘lmadi" : completed ? "Imtihon audiosi tugadi" : "Imtihon audiosi avtomatik ijro etilmoqda"}</strong>{!failed && !completed ? <p>Savollar orasida o‘tsangiz ham davom etadi va uni boshqarib bo‘lmaydi.</p> : null}</div>{!failed && !completed ? <i><MobileIcon name="lock-closed" size={13} /></i> : null}</section>;
}

export function ListeningQuestionCard({ questions, mode, answers, solutions, showTranscript, playbackStatus, activeAudioKey, playCount, onPlayAudio, onStopAudio, onSelect, renderSupport }: {
  questions: TopikQuestionWithGroup[]; mode: string; answers: Record<string, string | undefined>; solutions: Record<string, TopikRevealedSolution | undefined>; showTranscript: boolean; playbackStatus: TopikPlaybackStatus; activeAudioKey: string | null; playCount: number; onPlayAudio: () => void; onStopAudio: () => void; onSelect: (questionId: string, choiceKey: string) => void; renderSupport: (question: TopikQuestionWithGroup) => ReactNode;
}) {
  const first = questions[0];
  const audio = first?.audio ?? first?.group.sharedAudio;
  if (!first || !audio) return null;
  const repeatCount = audio.guidedAutoRepeatCount ?? (first.number >= 21 ? 2 : 1);
  return <article className={`${styles.questionPaper} ${styles.listeningPaper}`}>
    <div className={styles.instruction}><TopikTextBlocks blocks={first.group.instruction} /></div>
    {mode === "guided" ? <ListeningPlayer audio={audio} isPlaying={activeAudioKey === audio.key && playbackStatus === "playing"} onPlay={onPlayAudio} onStop={onStopAudio} playCount={playCount} repeatCount={repeatCount} showTranscript={showTranscript} /> : <ExamAudioStatus status={playbackStatus} />}
    <div className={styles.listeningQuestions}>{questions.map((question, index) => <section className={index ? styles.dividedQuestion : ""} key={question.id}><div className={styles.questionRow}><b>{String(question.number).padStart(2, "0")}</b>{question.prompt.length ? <TopikTextBlocks blocks={question.prompt} className={styles.prompt} /> : null}</div><ChoiceList choices={question.choices} correctChoiceKey={solutions[question.id]?.correctChoiceKey} disabled={Boolean(solutions[question.id])} layout={question.presentation.choiceLayout} onSelect={(key) => onSelect(question.id, key)} selectedChoiceKey={answers[question.id]} />{renderSupport(question)}</section>)}</div>
  </article>;
}

export function HintPanel({ support, solution, selected, busy, onRevealHint, onRevealSolution }: {
  support?: TopikLearningSupport; solution?: TopikRevealedSolution; selected: boolean; busy: boolean; onRevealHint: () => void; onRevealSolution: () => void;
}) {
  return <section className={styles.hintPanel}>
    <header><div><small>IZOHLI O‘RGANISH</small><strong>Bosqichma-bosqich yeching</strong></div>{support ? <span>{support.revealedHints.length}/{support.hintCount}</span> : null}</header>
    {support?.revealedHints.map((hint) => <article className={styles.hintCard} key={hint.key}><small>{hint.level}-maslahat</small><strong>{topikUzText(hint.title)}</strong><p>{topikUzText(hint.content)}</p>{hint.examples.map((example, index) => <div key={`${hint.key}-${index}`}><b>Misol</b><span>{topikUzText(example)}</span></div>)}</article>)}
    {solution ? <article className={styles.solutionCard}><h3>{solution.isCorrect ? "To‘g‘ri" : "Yana bir bor tekshiring"}</h3><b>To‘g‘ri javob: {solution.correctChoiceKey}-variant</b><h4>Yechish strategiyasi</h4><p>{topikUzText(solution.solution.strategy)}</p>{solution.solution.keyClues.map((clue) => <div key={clue.key}><b>Muhim ishora</b><p>{topikUzText(clue.explanation)}</p></div>)}<h4>Izoh</h4><p>{topikUzText(solution.solution.explanation)}</p></article> : null}
    {!solution && support?.nextHint ? <button className={styles.hintButton} disabled={busy} onClick={onRevealHint} type="button">{support.nextHint.level}-maslahatni ochish · {topikUzText(support.nextHint.title)}</button> : null}
    {!solution && selected ? <button className={styles.solutionButton} disabled={busy} onClick={onRevealSolution} type="button">Javob va to‘liq yechimni ko‘rsatish</button> : null}
    {!solution && !selected ? <p className={styles.hintGuide}>Yechimni ko‘rish uchun javobni tanlang.</p> : null}
  </section>;
}

export function SheetModal({ visible, children, onClose }: { visible: boolean; children: ReactNode; onClose: () => void }) {
  if (!visible) return null;
  return <div aria-modal="true" className={styles.modalBackdrop} onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }} role="dialog"><section className={styles.sheet}>{children}</section></div>;
}
