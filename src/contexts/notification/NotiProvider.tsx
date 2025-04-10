import React, { ReactNode, useState } from "react";
import { NotiContext, NotiContextType, Notification } from "./NotiContext";
import { useCallback } from "../../@lib";

/**
 * 알림 프로바이더
 */
const NotiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // 알림 추가
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

  // 알림 제거
  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const contextValue: NotiContextType = {
    notifications,
    addNotification,
    removeNotification,
  };

  return (
    <NotiContext.Provider value={contextValue}>{children}</NotiContext.Provider>
  );
};

export default NotiProvider;
