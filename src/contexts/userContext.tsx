import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useCallback, useMemo } from "../@lib";
import { User } from "../types/user.ts";
import { useNotificationContext } from "./notificationContext.tsx";

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: VoidFunction;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const { addNotification } = useNotificationContext();

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

  const userContextValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUserContext };
