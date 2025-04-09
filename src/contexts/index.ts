import { createContext, useContext } from "react";
import {
  ThemeContextType,
  UserContextType,
  NotificationContextType,
} from "../types";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider",
    );
  }
  return context;
};
