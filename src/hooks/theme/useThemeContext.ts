import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
