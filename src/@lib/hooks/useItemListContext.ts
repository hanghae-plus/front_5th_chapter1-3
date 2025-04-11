import { useContext } from "react";
import { ItemListContext } from "../../context/index";

export const useItemListContext = () => {
  const context = useContext(ItemListContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within an ItemListProvider");
  }
  return context;
};
