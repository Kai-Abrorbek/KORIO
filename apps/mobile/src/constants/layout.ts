/**
 * 하단 탭바 높이 (SafeArea 제외한 순수 바 높이).
 *
 * (tabs)/_layout.tsx 가 position:"absolute" 로 띄우기 때문에 화면 콘텐츠는
 * 탭바 **밑으로** 흐른다. 하단 고정 버튼을 두는 화면은 이 값만큼 더 띄워야
 * 버튼이 탭바에 가리지 않는다.
 *
 * 두 곳에서 같은 숫자를 쓰므로 여기 하나로 둔다 — 한쪽만 바꾸면 어긋난다.
 */
export const TAB_BAR_HEIGHT = 60;
