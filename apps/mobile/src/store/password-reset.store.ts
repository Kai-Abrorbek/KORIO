import { create } from "zustand";

/**
 * 비밀번호 찾기 3단계 사이에서만 쓰는 임시 상태.
 *
 * persist 를 일부러 안 붙였다. resetToken 은 그걸 가진 사람이 곧바로 비밀번호를
 * 바꿀 수 있는 값이라, 앱을 껐다 켜도 디스크(AsyncStorage)에 남아 있으면 안 된다.
 * 화면 사이 전달도 라우터 파라미터가 아니라 여기로 한다 — URL 에 토큰을 실으면
 * 네비게이션 상태와 개발 로그에 그대로 찍힌다.
 */
/**
 * 이 코드 흐름이 무엇을 위한 것인지.
 *  reset       — 로그인 화면의 "비밀번호 찾기"
 *  setPassword — 계정 화면에서 소셜 가입자가 비밀번호를 처음 만들 때 (끝나면 계정 화면으로)
 *  signup      — 가입 이메일 인증 (코드 확인 = 계정 생성 + 로그인)
 */
export type CodeFlowPurpose = "reset" | "setPassword" | "signup";

interface PasswordResetState {
  email: string;
  purpose: CodeFlowPurpose;
  resetToken: string;
  /** 마지막으로 코드를 보낸 시각 (재전송 대기 시간 계산용) */
  sentAt: number;
  startFlow: (email: string, purpose?: CodeFlowPurpose) => void;
  markResent: () => void;
  setToken: (token: string) => void;
  clear: () => void;
}

export const usePasswordResetStore = create<PasswordResetState>((set) => ({
  email: "",
  purpose: "reset",
  resetToken: "",
  sentAt: 0,
  startFlow: (email, purpose = "reset") =>
    set({ email, purpose, resetToken: "", sentAt: Date.now() }),
  markResent: () => set({ sentAt: Date.now() }),
  setToken: (resetToken) => set({ resetToken }),
  clear: () => set({ email: "", purpose: "reset", resetToken: "", sentAt: 0 }),
}));
