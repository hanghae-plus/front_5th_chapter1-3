import { createContext, useContext } from "react";
import { ThemeContextType } from "./type";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("ThemeContext has error");
  }

  return context;
};
