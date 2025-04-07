import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback, useMemo,
} from "react";
import { User } from "./common";
import {useNotificationContext} from "./NotificationContext.tsx";

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotificationContext();

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


  // 아무리 각각이 재정의되지 않고 그대로라해도 객체를 만드는 순간 참조가 바뀌어 값이 바뀌었다고 감지.. ( 객체 리터럴의 참조 ..)
  const userValue
      = useMemo(() => { return { user, login, logout } }, [user, login, logout]);

  return (
    <UserContext.Provider value={userValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within UserProvider");
  return context;
};
