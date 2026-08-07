/**
 * 설정용 슬라이더.
 *
 * 슬라이더 패키지가 안 깔려 있어서 gesture-handler + reanimated 로 직접 만들었다.
 * - 드래그는 물론 트랙 아무 데나 눌러도 그 지점으로 점프한다.
 * - 값 갱신은 step 단위로만 부모에 올린다 (프레임마다 setState 하면 렉 걸림).
 * - 손을 뗄 때 onCommit 이 한 번 더 온다. 미리듣기 재생용.
 */
import { useCallback, useState } from "react";
import { View, StyleSheet, LayoutChangeEvent } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
} from "react-native-reanimated";

const TRACK_H = 8;
const KNOB = 26;

interface Props {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  color: string;
  trackColor: string;
  onChange: (v: number) => void;
  onCommit?: (v: number) => void;
}

export function VolumeSlider({
  value,
  min = 0,
  max = 1,
  step = 0.05,
  color,
  trackColor,
  onChange,
  onCommit,
}: Props) {
  const [width, setWidth] = useState(0);
  // 진행률(0~1). 부모 값이 아니라 이 값이 화면을 그린다.
  const p = useSharedValue((value - min) / (max - min));
  const pressed = useSharedValue(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setWidth(w);
    p.value = (value - min) / (max - min);
  };

  const emit = useCallback(
    (ratio: number, commit: boolean) => {
      const raw = min + ratio * (max - min);
      const snapped = Math.round(raw / step) * step;
      // 0.30000000000000004 같은 값이 저장되지 않게 자른다
      const v = Math.min(max, Math.max(min, Number(snapped.toFixed(3))));
      onChange(v);
      if (commit) onCommit?.(v);
    },
    [min, max, step, onChange, onCommit],
  );

  const usable = Math.max(1, width - KNOB);

  // 세로로 끌면 슬라이더가 아니라 화면이 스크롤돼야 한다.
  // 그래서 가로로 6px 움직여야 활성화되고, 세로로 10px 넘으면 포기한다.
  // 그냥 톡 누르는 건 Pan 이 못 잡으니 Tap 을 따로 붙였다.
  const pan = Gesture.Pan()
    .activeOffsetX([-6, 6])
    .failOffsetY([-10, 10])
    .onStart((e) => {
      pressed.value = withTiming(1, { duration: 90 });
      p.value = Math.min(1, Math.max(0, (e.x - KNOB / 2) / usable));
      runOnJS(emit)(p.value, false);
    })
    .onUpdate((e) => {
      p.value = Math.min(1, Math.max(0, (e.x - KNOB / 2) / usable));
      runOnJS(emit)(p.value, false);
    })
    .onFinalize(() => {
      pressed.value = withTiming(0, { duration: 140 });
      runOnJS(emit)(p.value, true);
    });

  const tap = Gesture.Tap()
    .maxDuration(400)
    .onEnd((e) => {
      p.value = withTiming(
        Math.min(1, Math.max(0, (e.x - KNOB / 2) / usable)),
        { duration: 120 },
      );
      runOnJS(emit)(Math.min(1, Math.max(0, (e.x - KNOB / 2) / usable)), true);
    });

  const gesture = Gesture.Exclusive(pan, tap);

  const fillStyle = useAnimatedStyle(() => ({
    width: KNOB / 2 + p.value * usable,
  }));

  const knobStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: p.value * usable },
      { scale: 1 + pressed.value * 0.18 },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View style={s.hit} onLayout={onLayout}>
        <View style={[s.track, { backgroundColor: trackColor }]} />
        <Animated.View
          style={[s.fill, { backgroundColor: color }, fillStyle]}
        />
        <Animated.View style={[s.knobWrap, knobStyle]}>
          <View style={[s.knob, { borderColor: color }]} />
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const s = StyleSheet.create({
  // 트랙만 잡으면 손가락으로 집기 어렵다. 위아래로 여유를 준다.
  hit: { height: 40, justifyContent: "center" },
  track: {
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    marginHorizontal: KNOB / 2,
  },
  fill: {
    position: "absolute",
    left: 0,
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
  },
  knobWrap: { position: "absolute", left: 0 },
  knob: {
    width: KNOB,
    height: KNOB,
    borderRadius: KNOB / 2,
    backgroundColor: "#fff",
    borderWidth: 3,
    // 살짝 떠 보이게
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
