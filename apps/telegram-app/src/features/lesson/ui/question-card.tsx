"use client";

import type { QuestionProps } from "./questions/shared";
import { AudioMatch } from "./questions/audio-match";
import { ClozePassage } from "./questions/cloze-passage";
import { DialogComplete, DialogOrder } from "./questions/dialog";
import { ErrorHunt } from "./questions/error-hunt";
import { FillInBlank } from "./questions/fill-in-blank";
import { GrammarBlank } from "./questions/grammar-blank";
import { GrammarBuild } from "./questions/grammar-build";
import { ImageChoice } from "./questions/image-choice";
import { Listening } from "./questions/listening";
import { ReadingQuiz } from "./questions/reading-quiz";
import { SentenceBuilder, WordArrange } from "./questions/sentence-builder";
import { Speaking } from "./questions/speaking";
import { TranslateBuilder } from "./questions/translate-builder";
import { TranslateType } from "./questions/translate-type";
import { ListenFill, ListenType, TypeAnswer } from "./questions/typed-questions";
import { VerbTransform } from "./questions/verb-transform";
import { WordMatching } from "./questions/word-matching";

/**
 * 문제 유형 → 컴포넌트. 모바일 components/lesson/QuestionRenderer 와 같은 매핑이다.
 * 각 컴포넌트는 questions/ 아래에 앱 컴포넌트를 1:1 로 옮긴 것.
 */
export function QuestionCard(props: QuestionProps) {
  switch (props.question.type) {
    case "sentence_builder": return <SentenceBuilder {...props} />;
    case "reply_builder": return <TranslateBuilder {...props} mode="reply" />;
    case "translate_builder": return <TranslateBuilder {...props} />;
    case "word_arrange": return <WordArrange {...props} />;
    case "listening": return <Listening {...props} />;
    case "image_choice": return <ImageChoice {...props} />;
    case "dialog_complete": return <DialogComplete {...props} />;
    case "reading_quiz": return <ReadingQuiz {...props} />;
    case "type_answer": return <TypeAnswer {...props} />;
    case "translate_type": return <TranslateType {...props} />;
    case "listen_type": return <ListenType {...props} />;
    case "listen_fill": return <ListenFill {...props} />;
    case "verb_transform": return <VerbTransform {...props} />;
    case "fill_in_blank": return <FillInBlank {...props} />;
    case "cloze_passage": return <ClozePassage {...props} />;
    case "word_matching": return <WordMatching {...props} />;
    case "audio_match": return <AudioMatch {...props} />;
    case "grammar_build": return <GrammarBuild {...props} />;
    case "grammar_blank": return <GrammarBlank {...props} />;
    case "dialog_order": return <DialogOrder {...props} />;
    case "error_hunt": return <ErrorHunt {...props} />;
    case "speaking": return <Speaking {...props} />;
    default: return <SentenceBuilder {...props} />;
  }
}
