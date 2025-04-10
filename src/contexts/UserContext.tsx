"use client";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { UserContextType } from "../types/Contexts.ts";
import type { User } from "../types/User";
import { useNotificationContext } from "./NotificationContext";
import { useMemo } from "../@lib";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotificationContext();

  const login = (email: string) => {
    setUser({ id: 1, name: "홍길동", email });
    addNotification("성공적으로 로그인되었습니다", "success");
  };

  const logout = () => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  };
  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within UserProvider");
  return context;
};
