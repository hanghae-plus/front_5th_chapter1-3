/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

import { useCallback, useMemo } from "../../@lib";

interface INotification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface INotificationProvider {
  children: React.ReactNode;
}

interface INotificationContextType {
  notifications: INotification[];
  addNotification: (message: string, type: INotification["type"]) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<INotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider = ({ children }: INotificationProvider) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const addNotification = useCallback(
    (message: string, type: INotification["type"]) => {
      const newNotification: INotification = { id: Date.now(), message, type };
      setNotifications((prev) => [...prev, newNotification]);
    },
    [],
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const value = useMemo(
    () => ({ notifications, addNotification, removeNotification }),
    [notifications, addNotification, removeNotification],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): INotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification must be used within NotificationProvider");
  return context;
};
