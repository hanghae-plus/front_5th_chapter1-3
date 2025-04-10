import { useState } from "react";
import { generateItems } from "../utils";

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

const useItems = () => {
  const [items, setItems] = useState<Item[]>(() => generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };
  return { items, addItems };
};

export default useItems;
