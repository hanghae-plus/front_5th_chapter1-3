import React, { useState } from "react";

import Providers from "./@lib/context/Providers";
import { ComplexForm } from "./components/ComplexForm";
import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { NotificationSystem } from "./components/NotificationSystem";
import { generateItems } from "./utils";

const App: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return (
    <Providers>
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
    </Providers>
  );
};

export default App;
