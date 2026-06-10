import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { MOCK_LESSON } from "@/mocks/lesson.mock";
import { AnswerState } from "@/types/lesson";
import LessonHeader from "@/components/lesson/LessonHeader";
import FeedbackBar from "@/components/lesson/FeedbackBar";
import ComboPopup from "@/components/lesson/ComboPopup";
import OwlMascot, { OwlState } from "@/components/lesson/OwlMascot";
import SentenceBuilder from "@/components/lesson/questions/SentenceBuilder";
import WordArrange from "@/components/lesson/questions/WordArrange";
import Speaking from "@/components/lesson/questions/Speaking";
import ImageChoice from "@/components/lesson/questions/ImageChoice";
import DialogComplete from "@/components/lesson/questions/DialogComplete";
import TypeAnswer from "@/components/lesson/questions/TypeAnswer";
import WordMatching from "@/components/lesson/questions/WordMatching";
import TranslateBuilder from "@/components/lesson/questions/TranslateBuilder";
import { Text, ScrollView } from "react-native";

export default function LessonScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = getStyles(theme);
  const router = useRouter();

  const lesson = MOCK_LESSON;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [hearts, setHearts] = useState(3);
  const [combo, setCombo] = useState(0);

  const currentQ = lesson.questions[currentIdx];

  const handleAnswer = (answer: string) => {
    let isCorrect = false;

    if (currentQ.type === "word_matching") {
      isCorrect = answer === "all_correct";
    } else if (currentQ.type === "speaking") {
      isCorrect = true;
    } else {
      isCorrect =
        answer.trim().toLowerCase() === currentQ.answer.trim().toLowerCase();
    }

    if (isCorrect) {
      setCombo((c) => c + 1);
    } else {
      setCombo(0);
      setHearts((h) => Math.max(0, h - 1));
    }

    setAnswerState(isCorrect ? "correct" : "wrong");
  };

  const handleNext = () => {
    if (currentIdx + 1 >= lesson.questions.length) {
      router.back();
      return;
    }
    setCurrentIdx((i) => i + 1);
    setAnswerState("idle");
  };

  const renderQuestion = () => {
    const props = {
      question: currentQ,
      answerState,
      onAnswer: handleAnswer,
      theme,
    };
    switch (currentQ.type) {
      case "sentence_builder":
        return <SentenceBuilder {...props} />;
      case "translate_builder":
        return <TranslateBuilder {...props} />;
      case "word_arrange":
        return <WordArrange {...props} />;
      case "speaking":
        return <Speaking {...props} onSkip={handleNext} />;
      case "image_choice":
        return <ImageChoice {...props} />;
      case "dialog_complete":
        return <DialogComplete {...props} />;
      case "type_answer":
        return <TypeAnswer {...props} />;
      case "word_matching":
        return <WordMatching {...props} />;
      default:
        return <SentenceBuilder {...props} />;
    }
  };

  return (
    <View style={s.container}>
      <LessonHeader
        current={currentIdx + 1}
        total={lesson.questions.length}
        hearts={hearts}
        combo={combo}
        onClose={() => router.back()}
        theme={theme}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: answerState !== "idle" ? 180 : 40,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {renderQuestion()}
      </ScrollView>

      {/* 정답/오답 피드백 */}
      <FeedbackBar
        state={answerState}
        explanation={currentQ.explanation}
        onNext={handleNext}
        theme={theme}
      />

      {/* 콤보 팝업 - 반드시 최상단에 */}
      <ComboPopup combo={combo} />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    owlArea: {
      alignItems: "center",
      paddingVertical: 4,
      position: "relative",
      marginBottom: 30,
    },
  });
