import { createContext } from "react";
import { User } from "../../user";

export interface AuthenticationContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthenticationContext = createContext<
  AuthenticationContextType | undefined
>(undefined);
