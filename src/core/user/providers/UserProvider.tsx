import { ReactNode, useCallback, useMemo, useState } from "react";
import { UserContext } from "../contexts";
import { useNotification } from "../../notifications";
import { User } from "../types";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotification();

  // context 같이 써도 되나? 함수 단일 원칙에 위배되나 결합이 느슨해서 괜찮...??
  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다.", "success");
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다.", "success");
  }, [addNotification]);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
