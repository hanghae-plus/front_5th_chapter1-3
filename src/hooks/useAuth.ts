import { useState } from "react";
import type { User } from "../types/user";
import type { Notification } from "../types/notification";
import { useCallback } from "../@lib";

// 인증 관련 로직
export function useAuth(
  addNotification: (message: string, type: Notification["type"]) => void,
) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "강바울", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification]);

  return { user, login, logout };
}
