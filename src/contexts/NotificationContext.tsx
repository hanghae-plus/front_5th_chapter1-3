import { createContext, useState } from "react";
import { NotificationContextType } from "../types";
import { Notification } from "../types";
import { useCallback, useMemo } from "../@lib";

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      setNotifications((prev) => [...prev, { id: Date.now(), message, type }]);
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

  const notificationValue = useMemo(
    () => ({ notifications, addNotification, removeNotification }),
    [notifications, addNotification, removeNotification],
  );

  return (
    <NotificationContext.Provider value={notificationValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationContextProvider };
