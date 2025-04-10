import { createContext, useContext, useState } from "react";
import { useCallback, useMemo } from "../@lib";
import type { Theme, ThemeContextType } from "../types";

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = useCallback(() => {
    setTheme((prev: string) => (prev === "light" ? "dark" : "light"));
  }, []);

  const contextValue = useMemo(() => ({ theme: theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
