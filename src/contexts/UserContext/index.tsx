/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

import { useNotification } from "../NotificationContext";

import { useCallback, useMemo } from "../../@lib";

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface IUserContextType {
  user: IUser | null;
  login: (email: string) => void;
  logout: () => void;
}

interface IUserProvider {
  children: React.ReactNode;
}

const UserContext = createContext<IUserContextType | undefined>(undefined);

export const UserProvider = ({ children }: IUserProvider) => {
  const [user, setUser] = useState<IUser | null>(null);
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

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): IUserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
