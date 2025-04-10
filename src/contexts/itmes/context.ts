import { createContext, useContext } from "react";
import { ItemsContextType } from "../../types";

export const ItemsContext = createContext<ItemsContextType | undefined>(
  undefined,
);

export const useItemsContext = () => {
  const context = useContext(ItemsContext);

  if (context === undefined) {
    throw new Error("useItemsContext must be used within an ItemsContext");
  }
  return context;
};
