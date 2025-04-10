import { ComponentType, createElement } from "react";
import { shallowEquals } from "../equalities";
// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // 이전 props를 저장할 ref 생성
  let prevProps: P | null = null;
  let prevRender: React.ReactElement | null = null;

  // 메모이제이션된 컴포넌트
  const MemoizedComponent = (props: P) => {
    // prevProps와 새로 들어온 props가 같으면 이전 결과를 리턴
    if (prevProps !== null && _equals(prevProps, props)) {
      return prevRender;
    }

    //props가 변경된 경우에만 새로운 렌더링 수행
    const newResult = createElement(Component, props);
    prevProps = props;
    prevRender = newResult;
    return newResult;
  };

  return MemoizedComponent;
}
