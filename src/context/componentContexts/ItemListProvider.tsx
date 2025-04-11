import { createContext, useState } from "react";
import { useMemo } from "../../@lib";
import { generateItems } from "../../utils";
import { ItemListProps, ContextProps } from "../../type/type";

export const ItemListContext = createContext<ItemListProps | undefined>(
  undefined
);

export const ItemListContextProvider = ({ children }: ContextProps) => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  const ItemCtxValue: ItemListProps = useMemo(
    () => ({
      items,
      onAddItemsClick: addItems,
    }),
    [items, addItems]
  );

  return (
    <ItemListContext.Provider value={ItemCtxValue}>
      {children}
    </ItemListContext.Provider>
  );
};
