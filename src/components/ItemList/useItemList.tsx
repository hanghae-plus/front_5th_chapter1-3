import { useState } from "react";
import { useThemeContext } from "../../context/useThemeContext";
import { useMemo } from "../../@lib";
import { Item } from "../../type";

export const useItemList = ({ items }: { items: Item[] }) => {
  const [filter, setFilter] = useState("");
  const { theme } = useThemeContext();

  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.category.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, items]);

  const totalPrice = useMemo(() => {
    return filteredItems.reduce((sum, item) => sum + item.price, 0);
  }, [filteredItems]);

  const averagePrice = useMemo(() => {
    return Math.round(totalPrice / filteredItems.length) || 0;
  }, [filteredItems.length, totalPrice]);

  return {
    filter,
    setFilter,
    filteredItems,
    totalPrice,
    averagePrice,
    theme,
  };
};
