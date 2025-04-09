import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { generateItems } from "../utils";
import { Item } from "../types/Item";

interface ItemContextType {
  items: Item[];
  addItems: () => void;
}

const ItemsContext = createContext<ItemContextType | undefined>(undefined);

export const useItemsContext = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItemsContext must be used within an ItemsProvider");
  }
  return context;
};

export const ItemsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Item[]>(generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      addItems,
    }),
    [items, addItems],
  );

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};
