/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks/useRef";
import { useMemo } from "../hooks/useMemo";
import { ComponentType, forwardRef, createElement } from "react";

export function memo<P extends object, R = unknown>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // forwardRef를 사용해 ref를 전달하는 HOC 생성
  const MemorizedComponent = forwardRef<R, P>((props, ref) => {
    // 이전 렌더링의 결과를 저장하기 위한 ref
    const resultRef = useRef<{
      props: P | null;
      element: React.ReactElement | null;
    }>({
      props: null,
      element: null
    });

    // useMemo를 사용하여 props 변경 여부에 따라 컴포넌트 렌더링 결정
    const element = useMemo(() => {
      //   props가 변경되었거나 첫 렌더링인 경우
      if (
        resultRef.current.props === null ||
        !_equals(resultRef.current.props, props)
      ) {
        // 현재 props 저장
        resultRef.current.props = { ...props } as P;
        // createElement를 사용하여 새 요소 생성
        resultRef.current.element = createElement(Component, {
          ...props,
          ref
        });
      }
      return resultRef.current.element;
    }, [props, Component, ref]);

    return element;
  });

  return MemorizedComponent;
}
