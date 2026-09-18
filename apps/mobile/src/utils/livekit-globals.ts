import { registerGlobals } from "@livekit/react-native";

/**
 * LiveKit 전역 등록.
 *
 * ⚠️ **앱 전체에서 딱 한 번.** WebRTC 타입(RTCPeerConnection, MediaStream …)과
 *    web-streams 폴리필을 global 에 심는 작업이라, 화면 안에서 부르면 이미
 *    돌아가는 연결이 있는 채로 전역이 갈아 끼워질 수 있다.
 *
 * ⚠️ 부수효과 import 다. `_layout.tsx` 맨 위에서 `import "@/utils/livekit-globals"`
 *    로 한 번만 가져온다 (i18n 과 같은 방식). 다른 곳에서 import 하지 말 것.
 *
 * ⚠️ 네이티브 모듈이라 **Expo Go 에서는 안 돈다.** development build 가 필요하다
 *    (`npx expo run:android`).
 */
registerGlobals();
