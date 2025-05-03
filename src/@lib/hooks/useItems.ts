import { useState } from "react";
import { generateItems } from "../../utils";
import { useCallback } from "..";

export const useItems = () => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  return { items, addItems };
};
