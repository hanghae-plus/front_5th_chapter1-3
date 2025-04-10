import { useState } from "react";
import { useCallback, useMemo } from "../../@lib";
import { useNotificationContext } from "../notification/NotificationContext";
import { AuthContext } from "./AuthContext";
import { type User } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { addNotification } = useNotificationContext();
  const [user, setUser] = useState<User | null>(null);

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

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
