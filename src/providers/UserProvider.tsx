import { PropsWithChildren, useState } from "react";
import { User, UserContext } from "../contexts/useUser";
import { useNotification } from "../contexts/useNotification";
import { useCallback, useMemo } from "../@lib";

const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
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

  const contextValue = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
