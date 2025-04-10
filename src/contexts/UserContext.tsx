import { createContext, useContext } from "react";
import { UserContextType } from "../types";

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

// 커스텀 훅: useUserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("UserContext must be used within an UserProvider");
  }
  return context;
};
