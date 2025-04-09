import React, { useState } from "react";
import { useCallback, useMemo } from "../../hooks";
import { User } from "../../types";
import { UserStateContext } from "./UserStateContext";
import { UserActionContext } from "./UserActionContext";
import { useNotificationActions } from "../notification";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotificationActions();

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification]
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification]);

  const actions = useMemo(() => ({ login, logout }), [login, logout]);

  return (
    <UserStateContext.Provider value={user}>
      <UserActionContext.Provider value={actions}>
        {children}
      </UserActionContext.Provider>
    </UserStateContext.Provider>
  );
};
