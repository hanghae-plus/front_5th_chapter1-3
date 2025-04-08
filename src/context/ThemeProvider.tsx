
import { PropsWithChildren, useCallback, useState } from "react";
import { ThemeContext, ThemeContextType } from "./ThemeContext";

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeContextType["theme"]>("light");
  
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);
  
    const contextValue: ThemeContextType = {
      theme,
      toggleTheme,
    };

  return (
    <ThemeContext.Provider value= { contextValue }>
      { children }
    </ThemeContext.Provider>
  );
};