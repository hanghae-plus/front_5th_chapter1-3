import { Product } from "../model/product.types";

export const Item = ({ item, theme }: { item: Product; theme: string }) => (
  <li
    className={`p-2 rounded shadow ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
  >
    {item.name} - {item.category} - {item.price.toLocaleString()}원
  </li>
);
