import { ReactNode, useState } from "react";
import { LoginContextType, User } from "../../types";
import { LoginContext } from "../LoginContext";

type Props = {
  children: ReactNode;
};

export const LoginContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const loginContext: LoginContextType = {
    user,
    setUser,
  };

  return (
    <LoginContext.Provider value={loginContext}>
      {children}
    </LoginContext.Provider>
  );
};
