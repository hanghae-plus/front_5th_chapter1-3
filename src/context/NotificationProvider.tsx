import { createContext, useContext, useState } from "react";
import { useCallback, useMemo } from "../@lib";

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const NotificationProvider = ({ children }: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: Date.now(), message, type },
      ]);
    },
    []
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  }, []);

  const contextValue: NotificationContextType = useMemo(
    () => ({ notifications, addNotification, removeNotification }),
    [notifications]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifiactionContext = () => {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw new Error(
      "useNotifiactionContext must be used within an ThemeProvider"
    );
  }
  return context;
};
