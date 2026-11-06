import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Text, type StyleProp, type TextStyle } from "react-native";
import * as Haptics from "@/utils/haptics";
import { WordGlossSheet } from "@/features/reading-listening/WordGlossSheet";
import { useSpeech } from "@/hooks/useSpeech";
import { TopikService } from "@/services/topik.service";
import { useContentLang, useSettingsStore } from "@/store/settings.store";
import type { ReadingWordGloss } from "@/types/reading-listening";
import { useTopikTheme } from "./topikTheme";

/**
 * TOPIK 연습 화면의 단어 뜻보기 — 지문·대본의 단어를 **두 번** 누르면 뜻과 간단한 설명.
 *
 * 한 번 누르기는 그대로 둔다 (스크롤·보기 고르기와 안 겹치게). 실전 모드엔 Provider 가
 * 없어서 글자가 평소처럼 그려진다. 뜻은 서버가 문제 묶음 단위로 저장해 둬서,
 * 누군가 한 번 찾은 단어는 다음 사람에게 바로 나간다 (POST /topik/questions/:id/gloss).
 */
const TopikWordGlossContext = createContext<
  ((word: string, questionId: string | null) => void) | null
>(null);
/** 이 글이 어느 문제 것인가. 한 화면에 문제가 여럿이면 문제마다 TopikGlossScope 로 감싼다 */
const TopikGlossQuestionContext = createContext<string | null>(null);

export function TopikGlossScope({
  questionId,
  children,
}: {
  questionId: string;
  children: ReactNode;
}) {
  return (
    <TopikGlossQuestionContext.Provider value={questionId}>
      {children}
    </TopikGlossQuestionContext.Provider>
  );
}

const DOUBLE_TAP_MS = 350;

/** 단어 앞뒤의 문장부호·따옴표를 뗀다 (서버도 같은 기준으로 본문에 있는지 본다) */
function cleanWord(token: string) {
  return token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
}

/** 글을 단어로 나눠, 두 번 누르면 뜻보기를 연다. 연습 화면이 아니면 그냥 글자 */
export function TopikGlossWords({
  text,
  style,
}: {
  text: string;
  style?: StyleProp<TextStyle>;
}) {
  const onWord = useContext(TopikWordGlossContext);
  const questionId = useContext(TopikGlossQuestionContext);
  const lastTapRef = useRef<{ index: number; at: number } | null>(null);
  if (!onWord || !text) return <Text style={style}>{text}</Text>;

  const tokens = text.split(/(\s+)/);
  return (
    <Text style={style}>
      {tokens.map((token, index) => {
        const word = /\S/.test(token) ? cleanWord(token) : "";
        if (!word) return token;
        return (
          <Text
            key={`${index}-${token}`}
            suppressHighlighting
            onPress={() => {
              const now = Date.now();
              const last = lastTapRef.current;
              if (last && last.index === index && now - last.at < DOUBLE_TAP_MS) {
                lastTapRef.current = null;
                onWord(word, questionId);
              } else {
                lastTapRef.current = { index, at: now };
              }
            }}
          >
            {token}
          </Text>
        );
      })}
    </Text>
  );
}

const COPY = {
  ko: { loading: "뜻을 찾는 중…", missing: "뜻을 찾지 못했어요", listen: "발음 듣기", lemma: "기본형" },
  uz: { loading: "Ma’nosi qidirilmoqda…", missing: "Ma’nosi topilmadi", listen: "Talaffuzni tinglash", lemma: "Lug‘at shakli" },
  en: { loading: "Looking it up…", missing: "Couldn’t find the meaning", listen: "Listen", lemma: "Base form" },
  ru: { loading: "Ищу значение…", missing: "Значение не найдено", listen: "Послушать", lemma: "Начальная форма" },
} as const;

/**
 * 연습 화면에 뜻보기를 붙인다. `questionId` 는 지금 보이는 문제 묶음의 아무 문제
 * (서버가 그 묶음 글 전체로 문맥을 잡는다) — 문제가 여럿인 화면은 비워 두고
 * 문제마다 TopikGlossScope 로 감싼다. enabled=false 면 아무것도 안 한다.
 */
export function TopikWordGlossProvider({
  questionId = null,
  enabled,
  children,
}: {
  questionId?: string | null;
  enabled: boolean;
  children: ReactNode;
}) {
  const palette = useTopikTheme();
  const lang = useContentLang("ko");
  const uiLanguage = useSettingsStore((state) => state.language);
  const copy = COPY[(uiLanguage ?? "uz").split(/[-_]/)[0] as keyof typeof COPY] ?? COPY.uz;
  const { speak } = useSpeech("ko-KR");
  const [word, setWord] = useState<string | null>(null);
  const [gloss, setGloss] = useState<ReadingWordGloss | null>(null);
  const [loading, setLoading] = useState(false);
  const requestRef = useRef(0);
  /** 이 화면에서 이미 받은 뜻 (같은 단어를 다시 눌러도 네트워크 없이) */
  const seenRef = useRef(new Map<string, ReadingWordGloss | null>());

  const open = useCallback(
    (tapped: string, scopedQuestionId: string | null) => {
      const target = scopedQuestionId ?? questionId;
      if (!target) return;
      void Haptics.selectionAsync();
      const key = `${target}|${tapped}`;
      const run = ++requestRef.current;
      setWord(tapped);
      if (seenRef.current.has(key)) {
        setGloss(seenRef.current.get(key) ?? null);
        setLoading(false);
        return;
      }
      setGloss(null);
      setLoading(true);
      TopikService.gloss(target, tapped)
        .then((res) => {
          seenRef.current.set(key, res.gloss);
          if (run === requestRef.current) setGloss(res.gloss);
        })
        .catch(() => {
          if (run === requestRef.current) setGloss(null);
        })
        .finally(() => {
          if (run === requestRef.current) setLoading(false);
        });
    },
    [questionId],
  );

  const sheetPalette = useMemo(
    () => ({
      bg: palette.surfaceElevated,
      surface: palette.surfaceMuted,
      ink: palette.text,
      sub: palette.textSecondary,
      line: palette.border,
      sage: palette.primary,
      sageSoft: palette.primarySoft,
      sageDark: palette.primaryText,
    }),
    [palette],
  );

  return (
    <TopikWordGlossContext.Provider value={enabled ? open : null}>
      {children}
      {enabled && word && (
        <WordGlossSheet
          word={word}
          gloss={gloss}
          loading={loading}
          lang={lang}
          copy={copy}
          palette={sheetPalette}
          onSpeak={(text) => speak(text, "ko-KR")}
          onClose={() => {
            requestRef.current += 1;
            setWord(null);
            setGloss(null);
            setLoading(false);
          }}
        />
      )}
    </TopikWordGlossContext.Provider>
  );
}
