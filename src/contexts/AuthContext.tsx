import { createContext, useState } from "react";
import { useCallback, useMemo } from "../@lib";
import { AuthContextType, ContextProps, User } from "../types";
import { useNotifications } from "../hooks/useNotifications";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthContextProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotifications();

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [setUser, addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [setUser, addNotification]);

  const authCtxValue: AuthContextType = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return (
    <AuthContext.Provider value={authCtxValue}>{children}</AuthContext.Provider>
  );
};
