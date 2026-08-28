/**
 * *.svg 를 컴포넌트로 import 할 수 있게 하는 선언.
 *
 * 메트로는 react-native-svg-transformer 가 처리해줘서 앱은 잘 돌지만,
 * TypeScript 는 모듈을 못 찾아 auth/login.tsx 에서 계속 에러를 냈다.
 */
declare module "*.svg" {
  import type { FC } from "react";
  import type { SvgProps } from "react-native-svg";
  const content: FC<SvgProps>;
  export default content;
}
