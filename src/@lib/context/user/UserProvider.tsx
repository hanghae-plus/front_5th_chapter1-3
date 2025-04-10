import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { UserContext } from ".";
import { User } from "../../../types";
import { useNotification } from "../notification";

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotification();

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("로그인 되었습니다.", "success");
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃 되었습니다.", "success");
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
