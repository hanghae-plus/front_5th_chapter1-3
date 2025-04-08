import { createContext } from "react";
import { Notification } from "../types/types";

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export default NotificationContext;
