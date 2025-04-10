import { createContext, useCallback, useMemo, useState } from "react";
import { useNotificationContext } from "../@lib/hooks/useNotificationContext";

interface User {
  id: number;
  name: string;
  email: string;
}

interface ContextValue {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

export const UserContext = createContext<ContextValue | null>(null);

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const { addNotification } = useNotificationContext();
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string) => {
    setUser({ id: 1, name: "홍길동", email });
    addNotification("성공적으로 로그인되었습니다", "success");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, []);

  const contextValue: ContextValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
