import { memo } from "../../hocs";
import { Item } from "../../types";

interface ItemRowProps {
  item: Item;
  theme: "light" | "dark";
}

export const ItemRow = memo(({ item, theme }: ItemRowProps) => (
  <li
    className={`p-2 rounded shadow ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
  >
    {item.name} - {item.category} - {item.price.toLocaleString()}원
  </li>
));
