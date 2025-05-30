import { createContext, useContext } from "react";

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

export interface ItemContextType {
  items: Item[];
  addItems: () => void;
}

export const ItemContext = createContext<ItemContextType | undefined>(
  undefined,
);

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error("useItemContext is undefined");
  }
  return context;
};
