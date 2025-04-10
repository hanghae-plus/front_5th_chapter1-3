import { useContext } from "react";
import { ThemeContext } from "../../context/ThemePropvider";

// 커스텀 훅: useAppContext
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
