import { useCallback, useState } from "react";
import { useMemo } from "../@lib";
import { User, UserContext } from "../context/UserContext";
import { useNotificationContext } from "../context/NotificationContext";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
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
  }, []);

  /**
   * Q&A 세션에 나온 말씀. context는 무조건 메모이제이션이 필요하답니다!
   * toggleTheme에 useCallback 있는데 왜 한번 더 useMemo를 쓰는 이유
   * <ThemeContext.Provider value={contextValue}>
   * 에서 contextValue {}도 매 렌더링마다 매번 새 객체가 만들어짐으로
   * useMemo로 해두는게 좋다!
   */
  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
