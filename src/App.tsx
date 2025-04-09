import React, { useState } from "react";
import { generateItems } from "./utils";
import { Header, ItemList, ComplexForm } from "./components";
import { NotificationSystem } from "./components/NotificationSystem";
import { AppProviders } from "./AppProviders";

const App: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return (
    <AppProviders>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 md:pr-4">
              <ItemList items={items} onAddItemsClick={addItems} />
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <ComplexForm />
            </div>
          </div>
        </main>
        <NotificationSystem />
      </div>
    </AppProviders>
  );
};

export default App;
