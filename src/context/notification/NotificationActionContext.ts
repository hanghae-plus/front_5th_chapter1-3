import { createContext } from "react";
import { Notification } from "../../types";

interface NotificationActions {
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export const NotificationActionContext = createContext<
  NotificationActions | undefined
>(undefined);
