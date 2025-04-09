import { useState } from "react";
import { useNotificationContext } from "../notification/useNotificationContext";
import { User } from "../../types";
import { useCallback } from "../../@lib";

export const useAuth = () => {
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

  return { user, login, logout };
};
