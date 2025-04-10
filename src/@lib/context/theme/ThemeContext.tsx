import { createContext } from "react";
import { ThemeContextType } from "../../../types/context";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
