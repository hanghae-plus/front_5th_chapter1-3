import { ThemeContext } from "../context";
import { customHookMaker } from "./customHookMaker";

export const useTheme = customHookMaker(ThemeContext);
