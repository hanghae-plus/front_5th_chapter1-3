import { createContext, ReactNode, useContext } from "react";
import { themeContextType } from "./ThemeTypes";
import { useThemeStore } from "./ThemeStore";

const ThemeContext = createContext<themeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const themeContextValue = useThemeStore();

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  console.log("useThemeContext");
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within an ThemeProvider");
  }
  return context;
};
