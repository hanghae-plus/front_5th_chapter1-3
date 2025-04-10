import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { User } from "../types";
import { memo } from "../@lib";
import { useNotificationContext } from "../contexts/NotificationContext";

export const UserProvider: React.FC<PropsWithChildren> = memo(
  ({ children }) => {
    const { addNotification } = useNotificationContext();
    const [user, setUser] = useState<User | null>(null);
    const login = useCallback(
      (name: string, email: string) => {
        setUser({ name, email });
        addNotification("Success Login", "success");
      },
      [addNotification],
    );
    const logout = useCallback(() => {
      setUser(null);
      addNotification("Success Login", "success");
    }, [addNotification]);
    const value = useMemo(
      () => ({ user, login, logout }),
      [user, login, logout],
    );
    return (
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
  },
);
