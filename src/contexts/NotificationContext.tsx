import { createContext, useState } from "react";
import { useCallback, useMemo } from "../@lib";
import { NotificationContextType, ContextProps, Notification } from "../types";

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationContextProvider = ({ children }: ContextProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      const newNotification: Notification = {
        id: Date.now(),
        message,
        type,
      };
      setNotifications((prev) => [...prev, newNotification]);
    },
    [setNotifications],
  );

  const removeNotification = useCallback(
    (id: number) => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id),
      );
    },
    [setNotifications],
  );

  const notificationCtxValue: NotificationContextType = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications, addNotification, removeNotification],
  );

  return (
    <NotificationContext.Provider value={notificationCtxValue}>
      {children}
    </NotificationContext.Provider>
  );
};
