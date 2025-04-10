import { createContext, useContext } from "react";
import type { INotification, TNotificationType } from "#src/types";

export interface NotificationContextType {
  notifications: INotification[];
  addNotification: (message: string, type: TNotificationType) => void;
  removeNotification: (id: number) => void;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotificationContext must be used within an AppProvider",
    );
  }

  return context;
};
