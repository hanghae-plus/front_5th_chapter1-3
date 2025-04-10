import { useMemo, useState, useCallback } from "react";
import { generateItems } from "../../utils";

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}
export const useItemList = () => {
  const baseItems = useMemo(() => generateItems(1000), []);
  const [extraItems, setExtraItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState("");

  const addItems = useCallback(() => {
    setExtraItems((prev) => [
      ...prev,
      ...generateItems(1000, baseItems.length + prev.length),
    ]);
  }, [baseItems.length]);

  const allItems = useMemo(
    () => [...baseItems, ...extraItems],
    [baseItems, extraItems],
  );

  const filteredItems = allItems.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.category.toLowerCase().includes(filter.toLowerCase()),
  );

  const totalPrice = filteredItems.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = Math.round(totalPrice / filteredItems.length) || 0;

  return {
    filter,
    setFilter,
    filteredItems,
    totalPrice,
    averagePrice,
    onAddItemsClick: addItems,
  };
};
