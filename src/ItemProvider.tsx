import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { generateItems } from "./utils";

export interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

interface ContextType {
  items: Item[];
  addItems: () => void;
}

const ItemContext = createContext<ContextType | null>(null);

export const ItemProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  const value = useMemo(() => ({ items, addItems }), [items, addItems]);
  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export const useItem = () => {
  const context = useContext(ItemContext);
  if (!context) throw new Error("useItem must be used within a ItemProvider");
  return context;
};
