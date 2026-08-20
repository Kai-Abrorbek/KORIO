import { AnswerState, LessonQuestion } from "@/types/lesson";
import { ThemeColors } from "@/constants/theme";
import AudioMatch from "./questions/AudioMatch";
import ClozePassage from "./questions/ClozePassage";
import DialogComplete from "./questions/DialogComplete";
import DialogOrder from "./questions/DialogOrder";
import ErrorHunt from "./questions/ErrorHunt";
import FillInBlank from "./questions/FillInBlank";
import GrammarBlank from "./questions/GrammarBlank";
import GrammarBuild from "./questions/GrammarBuild";
import ImageChoice from "./questions/ImageChoice";
import ListenFill from "./questions/ListenFill";
import ListenType from "./questions/ListenType";
import Listening from "./questions/Listening";
import ReadingQuiz from "./questions/ReadingQuiz";
import SentenceBuilder from "./questions/SentenceBuilder";
import Speaking from "./questions/Speaking";
import TranslateBuilder from "./questions/TranslateBuilder";
import TranslateType from "./questions/TranslateType";
import TypeAnswer from "./questions/TypeAnswer";
import VerbTransform from "./questions/VerbTransform";
import WordArrange from "./questions/WordArrange";
import WordMatching from "./questions/WordMatching";

interface Props {
  question?: LessonQuestion;
  answerState: AnswerState;
  onAnswer: (answer: string) => void;
  /** 말하기·듣기처럼 건너뛸 수 있는 유형에서 쓴다 */
  onSkip: () => void;
  theme: ThemeColors;
  combo: number;
  /** 입력형 문제의 채점 중 표시 */
  isChecking: boolean;
}

/**
 * 문제 유형 → 컴포넌트 매핑. 레슨 화면에서 이 스위치와 23개 import 를 분리해
 * 화면은 진행/채점 흐름에만 집중하게 한다. 상태는 갖지 않는다.
 */
export default function QuestionRenderer({
  question,
  answerState,
  onAnswer,
  onSkip,
  theme,
  combo,
  isChecking,
}: Props) {
  if (!question) return null;
  const props = { question, answerState, onAnswer, theme, combo };

  switch (question.type) {
    case "sentence_builder":
      return <SentenceBuilder {...props} />;
    case "reply_builder":
      return <TranslateBuilder {...props} mode="reply" />;
    case "translate_builder":
      return <TranslateBuilder {...props} />;
    case "word_arrange":
      return <WordArrange {...props} />;
    case "speaking":
      return <Speaking {...props} onSkip={onSkip} />;
    case "image_choice":
      return <ImageChoice {...props} />;
    case "dialog_complete":
      return <DialogComplete {...props} />;
    case "type_answer":
      return <TypeAnswer {...props} isChecking={isChecking} />;
    case "word_matching":
      return <WordMatching {...props} />;
    case "listening":
      return <Listening {...props} />;
    case "listen_type":
      return <ListenType {...props} isChecking={isChecking} />;
    case "fill_in_blank":
      return <FillInBlank {...props} />;
    case "translate_type":
      return <TranslateType {...props} isChecking={isChecking} />;
    case "listen_fill":
      return (
        <ListenFill
          {...props}
          isChecking={isChecking}
          onSkip={onSkip}
        />
      );
    case "audio_match":
      return <AudioMatch {...props} onSkip={onSkip} />;
    case "grammar_blank":
      return <GrammarBlank {...props} />;
    case "grammar_build":
      return <GrammarBuild {...props} />;
    case "reading_quiz":
      return <ReadingQuiz {...props} />;
    case "error_hunt":
      return <ErrorHunt {...props} />;
    case "cloze_passage":
      return <ClozePassage {...props} />;
    case "dialog_order":
      return <DialogOrder {...props} />;
    case "verb_transform":
      return <VerbTransform {...props} />;
    default:
      return <SentenceBuilder {...props} />;
  }
}
