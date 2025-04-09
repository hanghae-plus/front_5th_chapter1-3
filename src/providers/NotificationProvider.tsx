import { useState } from "react";
import { useCallback, useMemo } from "../@lib";
import { Notification, NotificationContext } from "../context/NotificationContext";

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: Notification["type"]) => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
    };
    setNotifications((prev) => [...prev, newNotification]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  /**
   * Q&A 세션에 나온 말씀. context는 무조건 메모이제이션이 필요하답니다!
   * toggleTheme에 useCallback 있는데 왜 한번 더 useMemo를 쓰는 이유
   * <ThemeContext.Provider value={contextValue}>
   * 에서 contextValue {}도 매 렌더링마다 매번 새 객체가 만들어짐으로
   * useMemo로 해두는게 좋다!
   */
  const contextValue = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications, addNotification, removeNotification],
  );
  return (
    <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
  );
};
