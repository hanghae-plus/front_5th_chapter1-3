import { useState } from "react";
import { useMemo, useCallback } from "../../@lib/hooks";
import { useNotification } from "../notification/useNotification";
import { UserContext, User } from "./UserContext";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { addNotification } = useNotification();
  const [user, setUser] = useState<User | null>(() => null);

  const login = useCallback(
    (email: string) => {
      setUser({
        id: 1,
        name: "홍길동",
        email,
      });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification]
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("성공적으로 로그아웃되었습니다", "success");
  }, [addNotification]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
