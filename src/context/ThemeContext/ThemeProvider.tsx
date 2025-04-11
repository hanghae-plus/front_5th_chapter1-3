import { useState } from "react";
import { useCallback, useMemo } from "../../@lib";
import { ThemeContext } from "./ThemeContext.tsx";
import { ThemeContextType } from "./type.ts";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const themeValue: ThemeContextType = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
