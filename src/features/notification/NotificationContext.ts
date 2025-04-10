import { createContext, useContext } from "react";

export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  addNotification: (msg: string, type: NotificationType) => void;
  removeNotification: (id: number) => void;
  notifications: Notification[];
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("NotificationContext 밖에서 사용할 수 없습니다");
  return context;
};
