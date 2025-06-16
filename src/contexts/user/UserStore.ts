import { useState } from "react";
import { User } from "./UserTypes";
import { useNotificationContext } from "../notification/NotificationContext";
import { useCallback, useMemo } from "../../@lib";

export const useUserStore = () => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotificationContext();

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

  const userContextValue = useMemo(() => {
    return {
      user,
      login,
      logout,
    };
  }, [user, login, logout]);

  return userContextValue;
};
