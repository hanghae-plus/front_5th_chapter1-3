import { createContext, useContext, useState } from "react";
import { useNotifiactionContext } from "./NotificationProvider";
import { useCallback, useMemo } from "../@lib";

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

export const UserContext = createContext<UserContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const { addNotification } = useNotifiactionContext();
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string) => {
    setUser({ id: 1, name: "testUser", email: email });
    addNotification("로그인되었습니다", "success");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, []);

  const contextValue: UserContextType = useMemo(
    () => ({ user, login, logout }),
    [user]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};
