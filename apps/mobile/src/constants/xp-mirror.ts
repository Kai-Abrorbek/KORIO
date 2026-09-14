/**
 * 서버 XP 값의 **앱 표시용 사본**.
 *
 * 앱은 XP 를 계산하지 않는다 — 전부 서버가 정하고, 완료 응답으로 실제 값이
 * 내려온다. 여기 있는 건 "시작하기 +100 XP" 처럼 **누르기 전에 보여줘야 하는
 * 숫자** 뿐이다.
 *
 * ⚠️ 서버 apps/api/src/lessons/economy.const.ts 와 같은 값이어야 한다.
 *    예전엔 legend-intro.tsx 와 lesson.tsx 에 따로 박혀 있어서, XP 개편 때
 *    한쪽만 고쳐졌고 시작 버튼이 "+40 XP" 라고 약속하면서 실제로는 300 을
 *    주고 있었다. 미러는 이 파일 하나로 모은다.
 */

/** 레전드 완주 보상 — 서버 economy.const.ts 의 LEGEND_XP */
export const LEGEND_XP = 100;
