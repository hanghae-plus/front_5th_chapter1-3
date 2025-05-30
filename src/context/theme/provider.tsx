import { useState } from "react";
import { ThemeContext } from ".";
import { useCallback, useMemo } from "../../@lib";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const contextValue = useMemo(() => {
    return { theme, toggleTheme };
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};
