import { createContext, useContext } from "react";

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const Context = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within an ThemeProvider");
  }

  return context;
};
