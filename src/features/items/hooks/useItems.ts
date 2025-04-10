import { useCallback, useMemo, useState } from "react";
import { generateItems } from "../../../utils";

export const useItems = () => {
  const initialItems = useMemo(() => generateItems(1000), []);
  const [items, setItems] = useState(initialItems);

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  return { items, addItems };
};
