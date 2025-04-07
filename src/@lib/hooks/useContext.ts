import { createContext, useContext } from "react";
import { AppContextType, ThemeContextType } from "../../types";

export const AppContext = createContext<AppContextType | undefined>(undefined);
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within an AppProvider");
  }
  return context;
};
