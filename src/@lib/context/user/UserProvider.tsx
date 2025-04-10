import React, { useState } from "react";
import { User } from "../../../types/common";
import { UserContext } from "./UserContext";
import { useNotification } from "../notification";
import { useCallback, useMemo } from "../../hooks";

interface UserProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  initialUser = null,
}) => {
  const [user, setUser] = useState<User | null>(initialUser);

  const { addNotification } = useNotification();

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

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
