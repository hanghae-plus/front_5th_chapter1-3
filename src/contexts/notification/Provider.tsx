import { Context } from "./context.ts";

import { useMemo, useState, useCallback } from "react";
import { Notification } from "../../type.ts";
import { NotificationContextType } from "./context.ts";
import { memo } from "../../@lib";

const Provider = ({ children }: { children: React.ReactNode }) => {
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
    [],
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const notificationContextValue: NotificationContextType = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications, addNotification, removeNotification],
  );

  return (
    <Context.Provider value={notificationContextValue}>
      {children}
    </Context.Provider>
  );
};

export const NotificationProvider = memo(Provider);
