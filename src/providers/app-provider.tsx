import { useMemo, useState } from "react";
import { AppContext, useNotificationContext } from "../contexts";
import { AppType, User } from "../types";

import { NotificationProvider } from "./notification";
import { ThemeProvider } from "./theme";
import { ItemsProvider } from "./items";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotificationProvider>
      <ThemeProvider>
        <ItemsProvider>
          <AppProviderInner>{children}</AppProviderInner>
        </ItemsProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
};
const AppProviderInner = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotificationContext();

  const login = (email: string) => {
    setUser({ id: 1, name: "홍길동", email });
    addNotification("성공적으로 로그인되었습니다", "success");
  };

  const logout = () => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  };

  const contextValue: AppType = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
