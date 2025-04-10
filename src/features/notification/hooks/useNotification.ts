import React, { useCallback } from "react";
import {
  Notification,
  NotificationContext,
} from "../../../entities/notification";

export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }

  const { notifications, setNotifications } = context;

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      setNotifications((prev: Notification[]) => [
        ...prev,
        { id: Date.now(), message, type },
      ]);
    },
    [setNotifications],
  );

  const removeNotification = useCallback(
    (id: number) => {
      setNotifications((prev: Notification[]) =>
        prev.filter((notification) => notification.id !== id),
      );
    },
    [setNotifications],
  );

  return {
    notifications,
    addNotification,
    removeNotification,
  };
};
