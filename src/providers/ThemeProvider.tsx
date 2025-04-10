import { useCallback, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { memo, useMemo } from "../@lib";
import { Theme } from "../types";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = memo(
  ({ children }) => {
    const [theme, setTheme] = useState<Theme>("light");
    const toggleTheme = useCallback(() => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }, []);
    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
    return (
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
  },
);
