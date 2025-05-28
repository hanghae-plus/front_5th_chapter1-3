import { useState } from "react";
import { useMemo, useCallback } from "../../@lib/hooks";
import { NotificationContext } from "./NotificationContext";
import { Notification } from "./NotificationContext";

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => []);

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      const id = Date.now();
      setNotifications((prev) => [...prev, { id, message, type }]);
    },
    []
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications, addNotification, removeNotification]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
