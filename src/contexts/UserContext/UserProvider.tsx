import { useState } from "react";
import { useMemo, useCallback } from "../../@lib";
import { useNotificationContext } from "../NotificationContext";
import { User } from "../../types";
import { UserContext } from "./index";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotificationContext();

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다.", "success");
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다.", "info");
  }, [addNotification]);

  const userContextValue = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout],
  );

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
