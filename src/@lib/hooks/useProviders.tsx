import { PropsWithChildren, useState } from "react";
import { Notification, User } from "../../types";
import { useCallback } from "./useCallback";
import {
  AppContext,
  NotificationContext,
  ThemeContext,
  useNotification,
} from "./useContext";
import { useMemo } from "./useMemo";

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotification();

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
  }, [addNotification]);

  const authContext = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return (
    <AppContext.Provider value={authContext}>{children}</AppContext.Provider>
  );
};

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const NotificationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
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

  const value = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications, addNotification, removeNotification],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
