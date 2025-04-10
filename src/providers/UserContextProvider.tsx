import { useState } from "react";
import type { IUser } from "#src/types";
import { useCallback, useMemo } from "#src/@lib";
import { UserContext, UserContextType } from "#src/hooks/useUserContext";
import { useNotificationContext } from "#src/hooks/useNotificationContext";

const UserContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { addNotification } = useNotificationContext();

  const [user, setUser] = useState<IUser | null>(null);
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
  const userContextValue: UserContextType = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout],
  );

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
