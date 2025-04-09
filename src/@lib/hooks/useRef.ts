import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  return useState(() => ({ current: initialValue }))[0];
}
