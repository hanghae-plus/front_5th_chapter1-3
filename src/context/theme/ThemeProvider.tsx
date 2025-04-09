import { ReactNode, useState } from "react";
import { useCallback } from "../../hooks";
import { ThemeStateContext } from "./ThemeStateContext";
import { ThemeActionContext } from "./ThemeActionContext";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeStateContext.Provider value={theme}>
      <ThemeActionContext.Provider value={toggleTheme}>
        {children}
      </ThemeActionContext.Provider>
    </ThemeStateContext.Provider>
  );
};
