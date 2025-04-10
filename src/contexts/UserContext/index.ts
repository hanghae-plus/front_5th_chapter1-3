import { createContext, useContext } from "react";
import { User } from "../../types";

interface UserContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
