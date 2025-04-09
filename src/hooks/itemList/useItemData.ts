import { useState } from "react";
import { useCallback } from "../../hooks";
import { generateItems } from "../../utils";
import { Item } from "../../types";

export function useItemData() {
  const [items, setItems] = useState<Item[]>(() => generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prev) => [...prev, ...generateItems(1000, prev.length)]);
  }, []);

  return { items, addItems };
}
