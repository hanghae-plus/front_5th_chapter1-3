import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // 1. 이전 props를 저장할 ref 생성
  // 2. 메모이제이션된 컴포넌트 생성
  // 3. equals 함수를 사용하여 props 비교
  // 4. props가 변경된 경우에만 새로운 렌더링 수행
  // let prevProps : P | null = null;
  let prevProps: P | null = null;
  let prevRender: React.ReactNode | null = null;
  return function memoizedComponent(props: P) {
    if (prevProps && _equals(prevProps, props)) {
      return prevRender;
    }

    prevProps = props;
    prevRender = createElement(Component, props);
    return prevRender;
  };
}
