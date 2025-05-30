import { createContext, useContext } from "react";
import { Notification } from "./types";
export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotificationContext is undefined");
  }
  return context;
};
