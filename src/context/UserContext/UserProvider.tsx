import { useState } from "react";
import { User } from "../../type";
import { useCallback, useMemo } from "../../@lib";
import { UserContext } from "./UserContext.tsx";
import { useNotificationContext } from "../NotificationContext/NotificationContext.tsx";

export type UserContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotificationContext();

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [user],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [user]);

  const userValue: UserContextType = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
