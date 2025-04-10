import { useCallback, useContext } from "react";
import { ThemeContext } from "../model/theme.model";

// prettier-ignore
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  const { theme, setTheme } = context;
  
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, [setTheme]);
  
  return {
    theme,
    toggleTheme,
  };
};
