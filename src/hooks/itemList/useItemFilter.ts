import { useState } from "react";
import { useMemo } from "../../hooks";
import { Item } from "../../types";

export function useItemFilter(items: Item[]) {
  const [filter, setFilter] = useState("");

  const filteredItems = useMemo(() => {
    if (filter === "") return items;
    const lower = filter.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower)
    );
  }, [items, filter]);

  return { filter, setFilter, filteredItems };
}
