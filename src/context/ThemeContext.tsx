import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { useCallback, useMemo } from "../@lib";

enum Theme {
  light = "light",
  dark = "dark",
}

type TTheme = Theme.light | Theme.dark;

interface themeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<themeContextType | undefined>(undefined);

// ThemeContext.Provider를 감싸는 래퍼 컴포넌트
export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<TTheme>(Theme.light);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === Theme.light ? Theme.dark : Theme.light,
    );
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }
  return context;
};
