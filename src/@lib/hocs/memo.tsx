import { shallowEquals } from "../equalities";
import { ComponentType, ReactElement } from "react";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends Record<string, unknown>>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // 1. 이전 props를 저장할 ref 생성
  let prevProps: P | null = null;
  let memoizedResult: ReactElement | null = null;

  // 2. 메모이제이션된 컴포넌트 생성
  return function MemoizedComponent(props: P): ReactElement {
    // 3. equals 함수를 사용하여 props 비교
    if (prevProps === null || !_equals(prevProps, props)) {
      // 4. props가 변경된 경우에만 새로운 렌더링 수행
      memoizedResult = <Component {...props} />;
    }

    // 현재 props를 저장
    prevProps = props;

    // memoizedResult가 null인 경우 초기 렌더링 수행
    if (memoizedResult === null) {
      memoizedResult = <Component {...props} />;
    }

    return memoizedResult;
  };
}
