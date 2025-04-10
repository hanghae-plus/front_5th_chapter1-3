import { ComponentType, createElement, ReactElement } from "react";
import { shallowEquals } from "../equalities";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(
  Component: ComponentType<P>,
  equals = shallowEquals,
) {
  // 1. 이전 props를 저장할 ref 생성
  let prevProps: P | null = null;
  let prevResult: ReactElement | null = null;

  // 2. 메모이제이션된 컴포넌트 생성
  const Memoized = (props: P): ReactElement => {
    // 3. equals 함수를 사용하여 props 비교
    if (prevProps !== null && equals(prevProps, props)) {
      // 4. props가 변경되지 않았다면 이전 렌더링 결과 재사용
      return prevResult!;
    }

    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    prevProps = props;
    prevResult = createElement(Component, props);
    return prevResult;
  };

  return Memoized;
}
