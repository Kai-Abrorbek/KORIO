// 서버 전체를 한국 시간(KST, +9) 기준으로 고정한다.
// 반드시 다른 어떤 모듈보다 먼저 import 되어야 한다 (main.ts 최상단).
process.env.TZ = 'Asia/Seoul';
