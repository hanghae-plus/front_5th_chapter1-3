import { useContext } from "react";
import { ItemContext } from "../../context/ItemProvider";

// 커스텀 훅: useAppContext
export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (context === null) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
