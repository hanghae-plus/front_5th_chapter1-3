import { ReactNode, useState } from "react";
import { User } from "../../types/user";
import { AuthContext } from "./AuthContext";
import { Notification } from "../../types/notification";
import { memo } from "../../@lib/hocs/memo";

type AuthProviderProps = {
  children: ReactNode;
  addNotification: (
    message: Notification["message"],
    type: Notification["type"],
  ) => void;
};

export const AuthProvider = memo(
  ({ children, addNotification }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    };

    const logout = () => {
      setUser(null);
      addNotification("로그아웃되었습니다", "info");
    };

    return (
      <AuthContext.Provider
        value={{
          user,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  },
);
