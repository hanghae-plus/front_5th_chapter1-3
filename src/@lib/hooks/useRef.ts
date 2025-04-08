/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // setValue를 통해 값을 업데이트하면 리렌더링 유발
  const [value, setValue] = useState({ current: initialValue });

  // 따라서 value만 반환, 이후 이 반환값 value를 직접 조작해도 리렌더링 안됨
  return value;
}
