import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";

// memo를 사용하면 컴포넌트의 Props가 변경되지 않은 경우 리렌더링을 건너뛸 수 있습니다.
// 1. 이전 props를 저장할 ref 생성
// 2. 메모이제이션된 컴포넌트 생성
// 3. equals 함수를 사용하여 props 비교
// 4. props가 변경된 경우에만 새로운 렌더링 수행

// TODO: 여기서 useRef를 사용하지 않는 이유!
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  let prevProps: P | null = null;
  let prevComponent: ReturnType<typeof createElement>;

  return (props: P) => {
    if (prevProps && _equals(prevProps, props)) {
      return prevComponent;
    }
    prevProps = props;
    prevComponent = createElement(Component, props);
    return prevComponent;
  };
}
