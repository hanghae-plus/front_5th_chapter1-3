import { ReactNode, useState } from "react";
import { useMemo } from "../../../@lib";
import {
  Notification,
  NotificationContext,
} from "../../../entities/notification";

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notificationContextValue = useMemo(
    () => ({
      notifications,
      setNotifications,
    }),
    [notifications],
  );

  return (
    <NotificationContext.Provider value={notificationContextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
