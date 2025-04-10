import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Item } from "../types/item.ts";
import { generateItems } from "../utils.ts";

interface ItemListContextType {
  items: Item[];
  addItems: VoidFunction;
}

const ItemListContext = createContext<ItemListContextType | undefined>(
  undefined,
);

const useItemListContext = () => {
  const context = useContext(ItemListContext);
  if (context === undefined) {
    throw new Error(
      "useItemListContext must be used within a ItemListProvider",
    );
  }
  return context;
};

const ItemListProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return (
    <ItemListContext.Provider
      value={{
        items,
        addItems,
      }}
    >
      {children}
    </ItemListContext.Provider>
  );
};

export { ItemListProvider, useItemListContext };
