import { useContext } from "react";
import { ThemeStateContext } from "./ThemeStateContext";

export const useThemeState = () => {
  const state = useContext(ThemeStateContext);
  if (state === undefined) {
    throw new Error("useThemeState must be used within ThemeProvider");
  }
  return state;
};
