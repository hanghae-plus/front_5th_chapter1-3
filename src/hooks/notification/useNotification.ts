import { useState } from "react";
import { useCallback } from "../../@lib";
import { Notification } from "../../types";

export const useNotification = () => {
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
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return { notifications, addNotification, removeNotification };
};
