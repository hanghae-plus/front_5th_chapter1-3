import { useCallback, useMemo, useState } from "react";
import { generateItems } from "../utils";

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

export default function useItem() {
  const [items, setItems] = useState<Item[]>(() => generateItems(1000));
  const [filter, setFilter] = useState("");

  const filteredItems = useMemo(() => {
    const trimmed = filter.trim().toLowerCase();
    if (!trimmed) return items;

    return items.filter((item) => {
      const name = item.name.toLowerCase();
      const category = item.category.toLowerCase();
      return name.includes(trimmed) || category.includes(trimmed);
    });
  }, [items, filter]);

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  const totalPrice = useMemo(() => {
    return filteredItems.reduce((sum, item) => sum + item.price, 0);
  }, [filteredItems]);

  const averagePrice = useMemo(() => {
    const length = filteredItems.length;
    return length > 0 ? Math.round(totalPrice / length) : 0;
  }, [totalPrice, filteredItems]);

  return {
    items,
    filter,
    setFilter,
    filteredItems,
    addItems,
    totalPrice,
    averagePrice,
  };
}
