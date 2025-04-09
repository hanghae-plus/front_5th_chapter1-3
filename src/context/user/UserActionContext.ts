import { createContext } from "react";

interface UserActions {
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const UserActionContext = createContext<UserActions | undefined>(
  undefined
);
