import { useContext, createContext } from "react";

interface ThemeContextontextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextontextType | undefined>(
  undefined
);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("토글 사용이 불가능해요...");
  }
  return context;
};
