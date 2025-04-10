import { useState } from "react";
import { useThemeContext } from "../../context/useThemeContext";
import { generateItems } from "../../utils";
import { useCallback } from "../../@lib";

export const useHome = () => {
  const [items, setItems] = useState(() => generateItems(1000));
  const { theme } = useThemeContext();

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  return {
    items,
    addItems,
    theme,
  };
};
