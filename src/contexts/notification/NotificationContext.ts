import { createContext } from "react";
import { Notification } from "../../types/notification";

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
};

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
