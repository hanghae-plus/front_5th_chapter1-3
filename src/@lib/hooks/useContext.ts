import { createContext, useContext } from "react";
import {
  AppContextType,
  NotificationContextType,
  ThemeContextType,
} from "../../types";

export const AppContext = createContext<AppContextType | undefined>(undefined);
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const useAuth = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within an AppProvider");
  }
  return context;
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};
