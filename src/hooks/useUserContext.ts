import { createContext, useContext } from "react";
import type { IUser } from "#src/types";

export interface UserContextType {
  user?: IUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within an AppProvider");
  }

  return context;
};
