import { createContext, useContext } from "react";
import { NotificationContextType } from "../types";

export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
});

export const useNotificationContext = () => useContext(NotificationContext);
