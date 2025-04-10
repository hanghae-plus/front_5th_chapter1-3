/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

import { useCallback, useMemo } from "../../@lib";

interface IThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

interface IThemeProvider {
  children: React.ReactNode;
}

const ThemeContext = createContext<IThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: IThemeProvider) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): IThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
