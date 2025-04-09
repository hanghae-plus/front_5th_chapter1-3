import { useContext } from "react";
import { ThemeActionContext } from "./ThemeActionContext";

export const useThemeAction = () => {
  const action = useContext(ThemeActionContext);
  if (action === undefined) {
    throw new Error("useThemeAction must be used within ThemeProvider");
  }
  return action;
};
