import React, { useState } from "react";
import { User, Notification, Theme } from "./types/types";
import { NotificationContext, ThemeContext, UserContext } from "./context";
import { useCallback, useMemo } from "./@lib";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./components/Layout";

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("light");

  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

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
  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification]);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const themeValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  const userValue = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout],
  );

  const notificationValue = useMemo(
    () => ({ notifications, addNotification, removeNotification }),
    [notifications, addNotification, removeNotification],
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <UserContext.Provider value={userValue}>
        <NotificationContext.Provider value={notificationValue}>
          <Layout>
            <HomePage />
          </Layout>
        </NotificationContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
