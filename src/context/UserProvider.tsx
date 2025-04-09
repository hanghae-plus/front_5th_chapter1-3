import { PropsWithChildren, useState } from "react";
import { User } from "../types/User";
import { UserContext } from "./UserContext";

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = 
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
    }

  const logout = () => {
    setUser(null);
  }

  const contextValue = {
    user,
    login,
    logout,
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
