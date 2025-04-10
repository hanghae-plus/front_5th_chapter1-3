import { createContext, useContext, useState } from "react";
import { useCallback, useMemo } from "../@lib";
import type { Notification, NotificationContextType } from "../types";

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      const newNotification = { id: Date.now(), message, type };
      setNotifications((prev: Notification[]) => [...prev, newNotification]);
    },
    []
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev: Notification[]) => prev.filter((n) => n.id !== id));
  }, []);

  const contextValue = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
