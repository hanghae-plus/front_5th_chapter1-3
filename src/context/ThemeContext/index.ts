// src/contexts/ThemeContext/index.tsx
import { createContext, useContext } from "react";
import { ThemeContextType } from "./types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
