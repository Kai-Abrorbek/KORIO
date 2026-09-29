import { ReactNode, useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

/**
 * 캐릭터를 얼마나 줄일지.
 *  0 — 원래 크기
 *  1 — 작게
 *  2 — 숨김 (말풍선만)
 */
export type FitLevel = 0 | 1 | 2;

interface Props {
  /** 본문. 화면에 안 들어가면 fit 이 올라가서 다시 그려진다 */
  children: (fit: FitLevel) => ReactNode;
  /** 확인 버튼. 스크롤 밖 — 항상 화면 맨 아래 같은 자리에 있다 */
  footer: ReactNode;
}

/**
 * 칩 조립형 문제의 공용 껍데기.
 *
 * 예전엔 본문과 확인 버튼이 한 컬럼에 있어서, 칩이 많거나 문장이 길면
 * 버튼이 화면 밖으로 밀려 **정답을 맞춰도 누를 수가 없었다**. 칩이 많을 땐
 * 바텀시트로 뱅크를 내렸는데, 그 시트가 이번엔 확인 버튼을 덮었다.
 *
 * 이제 순서가 이렇다:
 *  1) 확인 버튼은 스크롤 밖 맨 아래에 고정 — 어떤 경우에도 안 움직인다
 *  2) 본문이 넘치면 캐릭터부터 줄이고 → 그래도 넘치면 숨긴다
 *  3) 그래도 넘칠 때만 스크롤을 켠다 (들어가면 스크롤은 꺼져 있어서
 *     칩 드래그와 부딪히지 않는다)
 *
 * fit 은 한 문제 안에서 올라가기만 한다. 줄였다 늘렸다 하면 칩을 누를 때마다
 * 화면이 들썩인다. 문제가 바뀌면 컴포넌트가 새로 떠서 0 부터 다시 잰다.
 */
export default function QuestionScroll({ children, footer }: Props) {
  const [fit, setFit] = useState<FitLevel>(0);
  const [overflow, setOverflow] = useState(false);
  const fitRef = useRef<FitLevel>(0);
  const viewH = useRef(0);
  const contentH = useRef(0);

  const evaluate = useCallback(() => {
    if (!viewH.current || !contentH.current) return;
    const over = contentH.current > viewH.current + 1;
    if (over && fitRef.current < 2) {
      // 캐릭터부터 줄인다. 다시 그려지면 onContentSizeChange 가 또 불러서 다시 잰다
      fitRef.current = (fitRef.current + 1) as FitLevel;
      setFit(fitRef.current);
      return;
    }
    setOverflow(over);
  }, []);

  return (
    <View style={s.root}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.content}
        scrollEnabled={overflow}
        showsVerticalScrollIndicator={overflow}
        bounces={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        onLayout={(e) => {
          viewH.current = e.nativeEvent.layout.height;
          evaluate();
        }}
        onContentSizeChange={(_, h) => {
          contentH.current = h;
          evaluate();
        }}
      >
        {children(fit)}
      </ScrollView>
      {footer}
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  // 내용이 짧아도 스크롤 영역을 꽉 채운다 (안에서 flex 여백이 먹힌다)
  content: { flexGrow: 1 },
});
