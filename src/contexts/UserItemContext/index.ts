import { createContext, useContext } from "react";
import { Item } from "../../types";

interface UserItemContextType {
  items: Item[];
  addItems: () => void;
}

export const UserItemContext = createContext<UserItemContextType | undefined>(
  undefined,
);

export const useUserItemContext = () => {
  const context = useContext(UserItemContext);
  if (context === undefined) {
    throw new Error(
      "useUserItemContext must be used within a UserItemProvider",
    );
  }
  return context;
};
