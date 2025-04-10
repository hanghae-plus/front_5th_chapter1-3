import { Context } from "./context.ts";

import { useNotificationContext } from "../notification/context.ts";

import { useCallback, useMemo, useState } from "react";
import { User } from "../../type.ts";
import { UserContextType } from "./context.ts";
import { memo } from "../../@lib";

export const Provider = ({ children }: { children: React.ReactNode }) => {
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

  const userContextValue: UserContextType = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );
  return (
    <Context.Provider value={userContextValue}>{children}</Context.Provider>
  );
};

export const UserProvider = memo(Provider);
