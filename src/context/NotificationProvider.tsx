import { createContext, useCallback, useMemo, useState } from "react";

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface ContextValue {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export const NotificationContext = createContext<ContextValue | null>(null);

type Props = {
  children: React.ReactNode;
};

export const NotificationProvider = ({ children }: Props) => {
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
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications],
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
