import { createContext } from "react";
import { Item } from "../types";

export interface ItemsType {
  items: Item[];
  addItems: () => void;
}

export const ItemContext = createContext<ItemsType | undefined>(undefined);
