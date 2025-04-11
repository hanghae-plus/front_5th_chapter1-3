import { createContext, useState } from "react";
import { useCallback, useMemo } from "../@lib";
import { ThemeContextType, ContextProps } from "../types";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeContextProvider = ({ children }: ContextProps) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, [setTheme]);
  const themeCtxValue: ThemeContextType = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={themeCtxValue}>
      {children}
    </ThemeContext.Provider>
  );
};
