import { PropsWithChildren, useState, useCallback, useMemo } from "react";
import { NotificationContext } from "../contexts/NotificationContext";
import { Notification, NotificationType } from "../types";
import { memo } from "../@lib";

export const NotificationProvider: React.FC<PropsWithChildren> = memo(
  ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = useCallback(
      (message: string, type: NotificationType) => {
        setNotifications((prev) => [
          ...prev,
          { id: Date.now(), message, type },
        ]);
      },
      [],
    );

    const removeNotification = useCallback((id: number) => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, []);

    const value = useMemo(
      () => ({
        notifications,
        addNotification,
        removeNotification,
      }),
      [notifications, addNotification, removeNotification],
    );

    return (
      <NotificationContext.Provider value={value}>
        {children}
      </NotificationContext.Provider>
    );
  },
);
