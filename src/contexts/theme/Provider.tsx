import { useCallback, useMemo, useState } from "react";
import { Context } from "./context.ts";
import { ThemeContextType } from "./context.ts";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const themeContextValue: ThemeContextType = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return (
    <Context.Provider value={themeContextValue}>{children}</Context.Provider>
  );
};
