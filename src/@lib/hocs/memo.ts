import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";
import { useMemo, useRef } from "../hooks";

/**
 * memo(HOC)
 * 컴포넌트 자체를 메모이제이션하여 불필요한 리렌더링 방지
 * - 이전 props와 현재 props를 비교해 변경 여부 확인
 * - 기본적으로 얕은 비교(shallowEquals) 사용
 * - props가 변경된 경우에만 새로운 렌더링 수행
 * - props가 변경되지 않았으면 null 반환
 */
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const Memoized = (props: P) => {
    // 1. 이전 props를 저장할 ref 생성
    const prevPropsRef = useRef<P | null>(null);

    // 2. 메모이제이션된 컴포넌트 생성
    const MemoizedComponent = useMemo(() => Component, []);

    // 3. equals 함수를 사용하여 props 비교
    const shouldUpdate = useMemo(() => {
      if (prevPropsRef.current === null) return true;
      return !_equals(prevPropsRef.current, props);
    }, [props]);

    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    if (shouldUpdate) {
      prevPropsRef.current = props;
      return createElement(MemoizedComponent, props);
      /**
       * type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
       */
    }

    return null;
  };

  return Memoized;
}
