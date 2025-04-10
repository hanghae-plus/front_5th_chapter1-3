import { createContext, useContext } from "react";

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeContext 밖에서 사용할 수 없습니다");
  return context;
};
