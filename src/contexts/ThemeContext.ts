import { createContext, useContext } from "react";
import { ThemeContextType } from "../types";

export const ThemeContext = createContext<ThemeContextType>({
  theme: "",
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);
