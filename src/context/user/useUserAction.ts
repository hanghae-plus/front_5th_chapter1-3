import { useContext } from "react";
import { UserActionContext } from "./UserActionContext";

export const useUserActions = () => {
  const context = useContext(UserActionContext);
  if (context === undefined) {
    throw new Error("useUserActions must be used within a UserProvider");
  }
  return context;
};
