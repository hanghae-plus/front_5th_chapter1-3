import { useState } from "react";
import type { INotification, TNotificationType } from "#src/types";
import {
  NotificationContext,
  NotificationContextType,
} from "#src/hooks/useNotificationContext";
import { useCallback, useMemo } from "#src/@lib";

const NotificationContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const addNotification = useCallback(
    (message: string, type: TNotificationType) => {
      const newNotification: INotification = {
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
    <NotificationContext.Provider value={notificationContextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
