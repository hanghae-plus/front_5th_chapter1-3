import { createContext } from "react";

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export default ThemeContext;
