import { useState } from "react";

export const useRef = <T>(initialValue: T) => {
  const [ref] = useState<{ current: T }>({
    current: initialValue,
  });

  return ref;
};
