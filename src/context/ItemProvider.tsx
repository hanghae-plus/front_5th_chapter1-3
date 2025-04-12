import { createContext, useContext, useMemo, useState } from "react";
import { generateItems } from "../utils";

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

interface ContextValue {
  items: Item[];
  addItems: () => void;
}

export const ItemContext = createContext<ContextValue | null>(null);

type Props = {
  children: React.ReactNode;
};

export const ItemProvider = ({ children }: Props) => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  const contextValue: ContextValue = useMemo(
    () => ({
      items,
      addItems,
    }),
    [items, addItems]
  );

  return (
    <ItemContext.Provider value={contextValue}>{children}</ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItemContext must be used within an ItemProvider");
  }
  return context;
};
