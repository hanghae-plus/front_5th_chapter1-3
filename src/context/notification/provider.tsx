import { useState } from "react";
import { NotificationContext, NotificationContextType } from ".";
import { useCallback, useMemo } from "../../@lib";
import { Notification } from "./types";

type NotificationProviderProps = {
  children: React.ReactNode;
};

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
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

  const contextValue: NotificationContextType = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications, addNotification, removeNotification],
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
