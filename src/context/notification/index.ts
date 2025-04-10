import { createContext, useContext } from "react";
import { Notification } from "../../types/notification";
export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

/**
 * NotificationContextType
 * @typedef {Object} NotificationContextType
 * @property {Notification[]} notifications - 알림 목록
 */
export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within an ThemeProvider",
    );
  }
  return context;
};
