import { createContext, useContext } from "react";
import { UserContextType } from "./type.ts";

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext has error");
  }

  return context;
};
