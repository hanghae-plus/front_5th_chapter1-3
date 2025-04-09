import { createContext, useContext } from "react";
import {
  NotificationContextType,
  ThemeContextType,
  UserContextType,
} from "../types";

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within UserContext.Provider");
  return context;
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotificationContext must be used within NotificationContext.Provider",
    );
  return context;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error(
      "useThemeContext must be used within ThemeContext.Provider",
    );
  return context;
};
