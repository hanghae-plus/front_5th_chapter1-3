import React, { createContext, useContext, useState, useMemo } from "react";
import { useNotification } from "./NotificationContext";
import { useCallback } from "../@lib/hooks/useCallback";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { addNotification } = useNotification();
  const [user, setUser] = useState<User | null>(null);

  /** addNotification이 변경될 경우에만 login, logout 함수가 다시 생성 */
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

  /** user, login, logout 중 하나라도 변경되지 않으면 동일한 객체 참조를 유지 */
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
