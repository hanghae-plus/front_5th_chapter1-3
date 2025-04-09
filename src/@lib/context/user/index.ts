import { createContext, useContext } from "react";
import { UserContextType } from "../../../types";

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an UserProvider");
  }
  return context;
};
