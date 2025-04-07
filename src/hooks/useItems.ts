import { useState } from "react";
import { generateItems } from "../utils";
import type { Item } from "../components/ItemList";
import { useCallback } from "../@lib";

// 아이템 관련 로직
export function useItems() {
  const [items, setItems] = useState<Item[]>(() => generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  return { items, addItems };
}
