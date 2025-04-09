import { createContext } from "react";

export const ThemeStateContext = createContext<"light" | "dark" | undefined>(
  undefined
);
