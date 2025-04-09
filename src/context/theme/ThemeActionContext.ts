import { createContext } from "react";

export const ThemeActionContext = createContext<(() => void) | undefined>(
  undefined
);
