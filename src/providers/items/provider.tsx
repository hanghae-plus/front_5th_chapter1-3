import { useCallback, useMemo, useState } from "react";
import { generateItems } from "../../utils";
import { ItemsContext } from "../../contexts";

export const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prev) => [...prev, ...generateItems(1000, prev.length)]);
  }, []);

  const itemsValue = useMemo(() => ({ items, addItems }), [items, addItems]);

  return (
    <ItemsContext.Provider value={itemsValue}>{children}</ItemsContext.Provider>
  );
};
