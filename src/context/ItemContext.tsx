import { createContext, useContext, useMemo, useState } from "react";
import { Item } from "../types";
import { generateItems } from "../utils";

interface ItemContextType {
  items: Item[];
  addItems: () => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context)
    throw new Error("useItemContext must be used within an ItemProvider");
  return context;
};

export const ItemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Item[]>(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  const value = useMemo(() => ({ items, addItems }), [items]);

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};
