import { createContext, useContext } from "react";
import { Item } from "../../types/item";

export interface ItemContextType {
  items: Item[];
  addItems: () => void;
}

/**
 * ItemContextType
 * @typedef {Object} ItemContextType
 * @property {Item[]} items - 아이템 목록
 * @property {() => void} addItems - 아이템 추가 함수
 * @property {() => void} removeItems - 아이템 제거 함수
 */
export const ItemContext = createContext<ItemContextType | undefined>(
  undefined,
);

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error("useItemContext must be used within an ItemProvider");
  }

  return context;
};
