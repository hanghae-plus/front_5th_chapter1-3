import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";
import { useRef } from "../hooks/useRef";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // 초기값을 지정하고 해당값과 비교하여 변경된 값이 있을때만 렌더링
  // useMemo처렴 구현하면 되지 않으려나..? 컴포넌트가 바뀔때는 props의 값이 변경될때?
  const MemoComponent = (props: P) => {
    const initialProps = useRef<P | null>(null);
    if (!initialProps.current || !_equals(initialProps.current, props)) {
      initialProps.current = props;
      return createElement(Component, props);
    }
    return null;
  };
  return MemoComponent;
}
