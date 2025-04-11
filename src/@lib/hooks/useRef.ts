import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // React의 useState를 이용해서 만들어보세요.
  const [value] = useState({ current: initialValue });
  return value;
}
// 값이 변했는데, 리렌더링을 시키지 않고 싶거나,.
// 리렌더링이 됐는데, 값이 변하지 않고 계속 유지가 됐으면 좋겠거나

// 렌더링과 상관 없는 값을 만들고 싶은것..
// 값이 변해도 렌더링 시키고 싶지 않은거지
// 리액트의 시스템 밖에 빼놓은거다? 리액트의 의도와는 좀 다른 예외 상황을

// ex webSocket, setInterval
// 렌더링이랑ㅇㄴ 관련 없이 타이머가 계속 돌고 있으면 좋겠어
// 오 이해가 된다
