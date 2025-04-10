import React, { useState } from "react";
import { Notification } from "../../../types/common";
import { NotificationContext } from "./NotificationContext";
import { useCallback, useMemo } from "../../hooks";

interface NotificationProviderProps {
  children: React.ReactNode;
  initialNotifications?: Notification[];
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  initialNotifications = [],
}) => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

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
};
