import { useValidContext } from "../../hooks";
import { ThemeContext } from "./ThemeContext";

export const useTheme = () => useValidContext(ThemeContext);
