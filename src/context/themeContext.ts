import { createContext } from "react";
import { ThemeContextType } from "../types/types"; // 타입 경로 확인 필요

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
