import React, { useState } from "react";
import { useCallback, useMemo } from "../../hooks";
import { Notification } from "../../types";
import { NotificationStateContext } from "./NotificationStateContext";
import { NotificationActionContext } from "./NotificationActionContext";

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
    []
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const actions = useMemo(
    () => ({ addNotification, removeNotification }),
    [addNotification, removeNotification]
  );

  return (
    <NotificationStateContext.Provider value={notifications}>
      <NotificationActionContext.Provider value={actions}>
        {children}
      </NotificationActionContext.Provider>
    </NotificationStateContext.Provider>
  );
};
