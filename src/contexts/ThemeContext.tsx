import { createContext, ReactNode, useContext, useState } from "react";
import { ThemeContextType } from "../types/Contexts.ts";
import { Theme } from "../types/Theme.ts";
import { useMemo } from "../@lib";

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);
  return (
    <ThemeContext.Provider value={value}>
      <div
        className={
          theme === "light"
            ? "bg-gray-100 text-black"
            : "bg-gray-900 text-white"
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useThemeContext must be used within ThemeProvider");
  return context;
};
