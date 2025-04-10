import { createContext, useContext, useState } from "react";
import { useCallback, useMemo } from "../@lib";
import { useNotification } from "./NotificationContext";
import type { User, UserContextType } from "../types";

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotification();

  const login: (message: string) => void = useCallback((email: string) => {
    setUser({ id: 1, name: "홍길동", email });
    addNotification("성공적으로 로그인되었습니다", "success");
  }, []);

  const logout: () => void = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, []);

  const contextValue = useMemo(
    () => ({ user: user, login, logout }),
    [user, login, logout]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
