import React, { createContext, useContext, useState, useMemo } from "react";
import { useCallback } from "../@lib/hooks/useCallback";

export interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  /**
   * useCallback 의존성 배열을 빈 배열로 설정하여,
   * NotificationProvider가 처음 렌더링될 때만 생성
   */
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

  /**
   * useMemo로 값을 메모이제이션하여 notifications가 바뀌지 않으면 같은 참조 유지
   * addNotification과 removeNotification은 useCallback으로 메모이제이션 되어 있으므로,
   * notifications가 바뀌지 않으면 같은 참조 유지
   */
  const value = useMemo(
    () => ({ notifications, addNotification, removeNotification }),
    [notifications],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification is used outside of NotificationProvider");
  return context;
};
