import { createContext, useContext } from "react";
import { User } from "../type";

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("유저 컨텍스트 사용 불가!");
  }

  return context;
};
