import { createContext, useContext } from "react";
import { User } from "../types";

interface LoginContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
);

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
};
