import { createContext, useContext } from "react";
import type { TTheme } from "#src/types";

export interface ThemeContextType {
  theme: TTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within an AppProvider");
  }

  return context;
};
