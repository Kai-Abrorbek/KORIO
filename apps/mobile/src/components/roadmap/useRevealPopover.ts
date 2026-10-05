import { useCallback, useRef, type RefObject } from "react";
import type {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";

/** 팝오버 위로 노드까지 보이게 남길 높이 (UnitRoadmap popoverContainer top = NODE_SIZE 72 + 16) */
const NODE_ABOVE = 88;
/** 리스트 가장자리와 띄울 여백 */
const MARGIN = 16;

/**
 * 노드를 눌렀을 때 팝오버가 화면 아래로 잘리면, **"시작/이어서" 버튼까지 보이게**
 * 리스트를 올린다.
 *
 * 예전엔 아래쪽 노드를 누르면 팝오버가 화면 밖으로 잘려서 버튼을 못 누르고
 * 손으로 다시 스크롤해야 했다.
 *
 * 팝오버는 노드 아래에 absolute 로 붙어 있어서 레이아웃 계산으로는 위치를 정확히
 * 알기 어렵다. 그래서 실제로 그려진 뒤 화면 좌표(measureInWindow)로 리스트와
 * 팝오버를 직접 재서, 넘친 만큼만 올린다. 이미 다 보이면 움직이지 않는다.
 *
 * 사용: 리스트를 listWrapRef 로 감싸고, FlatList 에 onScroll 을 걸고,
 * UnitRoadmap 의 onPopoverLayout 에 revealPopover 를 넘긴다.
 */
export function useRevealPopover<T>(listRef: RefObject<FlatList<T> | null>) {
  const listWrapRef = useRef<View>(null);
  const scrollY = useRef(0);
  const autoScrollUntil = useRef(0);

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.current = e.nativeEvent.contentOffset.y;
  }, []);

  const revealPopover = useCallback(
    (popover: View) => {
      const wrap = listWrapRef.current;
      if (!wrap) return;
      wrap.measureInWindow((_lx, listTop, _lw, listHeight) => {
        popover.measureInWindow((_px, popTop, _pw, popHeight) => {
          if (!listHeight || !popHeight) return;
          const overflow = popTop + popHeight - (listTop + listHeight - MARGIN);
          if (overflow <= 0) return; // 이미 다 보인다

          // 되도록 노드까지 같이 보이게. 팝오버가 너무 길면 버튼이 먼저다
          // (단, 팝오버 윗부분이 화면 위로 사라질 만큼은 안 올린다)
          const keepNode = popTop - NODE_ABOVE - (listTop + MARGIN);
          const keepPopoverTop = popTop - (listTop + MARGIN);
          const shift =
            overflow <= keepNode
              ? overflow
              : Math.min(overflow, keepPopoverTop);
          if (shift <= 0) return;

          autoScrollUntil.current = Date.now() + 700;
          listRef.current?.scrollToOffset({
            offset: scrollY.current + shift,
            animated: true,
          });
        });
      });
    },
    [listRef],
  );

  /**
   * 방금 자동으로 올리는 중인가.
   * "보이는 유닛이 바뀌면 팝오버 닫기" 같은 처리가 이 스크롤에 반응하면
   * 방금 연 팝오버가 바로 닫힌다 — 그때는 건너뛴다.
   */
  const isAutoScrolling = useCallback(
    () => Date.now() < autoScrollUntil.current,
    [],
  );

  return { listWrapRef, onScroll, revealPopover, isAutoScrolling };
}
