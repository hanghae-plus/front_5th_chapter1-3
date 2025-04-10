import React from "react";
import {
  Header,
  ItemList,
  ComplexForm,
  NotificationSystem,
  ThemeWrapper,
} from "../components";
import { Item } from "../models";
import { generateItems } from "../utils";

interface AppContentProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

export const AppContent: React.FC<AppContentProps> = ({ items, setItems }) => {
  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return (
    <ThemeWrapper>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList items={items} onAddItemsClick={addItems} />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </ThemeWrapper>
  );
};
