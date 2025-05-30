import { useState } from "react";
import { generateItems } from "../../utils";
import { ItemContext } from ".";
import { useCallback, useMemo } from "../../@lib";

type ItemProviderProps = {
  children: React.ReactNode;
};

export const ItemProvider = ({ children }: ItemProviderProps) => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, [setItems]);

  const contextValue = useMemo(() => ({ items, addItems }), [items, addItems]);

  return (
    <ItemContext.Provider value={contextValue}>{children}</ItemContext.Provider>
  );
};
