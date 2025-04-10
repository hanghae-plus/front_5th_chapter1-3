import React, { useState, PropsWithChildren } from "react";
import { generateItems } from "../utils";
import { useMemo, useCallback } from "../@lib";
import { Item } from "../types";
import { ItemContext, ItemsType } from "../context";

export const ItemProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<Item[]>(generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  const itemContextValue: ItemsType = useMemo(
    () => ({ items, addItems }),
    [items, addItems],
  );
  return (
    <ItemContext.Provider value={itemContextValue}>
      {children}
    </ItemContext.Provider>
  );
};
