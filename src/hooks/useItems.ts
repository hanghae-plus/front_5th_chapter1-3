import { useState } from "react";
import { generateItems } from "../utils";
import { useRef } from "../@lib";

type Item = { id: number; name: string; category: string; price: number };

export const useItems = () => {
  //생명주기 전체에서 유지되는 참조를 만들어서 generateItem이 정확히 한 번만 호출될 수 있도록
  const initialItemsRef = useRef<Item[] | null>(null);

  if (initialItemsRef.current === null) {
    initialItemsRef.current = generateItems(1000);
  }

  const [items, setItems] = useState<Item[]>(initialItemsRef.current);

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return { addItems, items };
};
