import { useContext } from "react";
import { UserStateContext } from "./UserStateContext";

export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
};
