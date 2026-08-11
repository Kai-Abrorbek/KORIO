/**
 * 게임 모음.
 *
 * 한글(자모) 게임은 여기 없다. 한글 학습 화면 안의 게임 메뉴에 있고,
 * 거기서 배운 자모를 바로 써먹는 흐름이라 떼어놓으면 맥락이 끊긴다.
 * 이 목록은 한글을 뗀 뒤에 하는 단어·문장 게임들이다.
 */

export interface GameItem {
  id: string;
  route: string;
  icon: string;
  /** 카드 그라디언트 */
  colors: [string, string];
}

export const GAMES: GameItem[] = [
  {
    id: "matchGame",
    route: "/match-game",
    icon: "grid",
    colors: ["#7C6BF0", "#5F4FD8"],
  },
  {
    id: "wordMemory",
    route: "/memory-game",
    icon: "albums",
    colors: ["#3FBF8F", "#2A9E72"],
  },
  {
    id: "wordChain",
    route: "/word-chain",
    icon: "link",
    colors: ["#FF8A5B", "#F06A3A"],
  },
];
