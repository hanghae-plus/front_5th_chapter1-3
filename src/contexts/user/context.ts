import { User } from "../../type.ts";
import { createContext, useContext } from "react";

export interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const Context = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};
