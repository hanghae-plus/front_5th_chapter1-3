import { User } from "../types";
import { createContext } from "react";

export interface Auth {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<Auth | undefined>(undefined);
