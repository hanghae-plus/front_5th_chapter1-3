import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useNotification } from "./NotificationProvider";

interface User {
  id: number;
  name: string;
  email: string;
}

interface ContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const UserContext = createContext<ContextType | null>(null);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { addNotification } = useNotification();
  const [user, setUser] = useState<User | null>(null);
  const login = useCallback((email: string) => {
    setUser({ id: 1, name: "홍길동", email });
    addNotification("성공적으로 로그인되었습니다", "success");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, []);
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
