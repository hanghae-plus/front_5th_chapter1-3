import React, { useState } from "react";

import {
  AppProvider,
  NotificationProvider,
  ThemeProvider,
} from "./@lib/hooks/useProviders";
import { ComplexForm } from "./components/ComplexForm";
import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { NotificationSystem } from "./components/NotificationSystem";
import { generateItems } from "./utils";

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return (
    <NotificationProvider>
      <AppProvider>
        <ThemeProvider>
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
        </ThemeProvider>
      </AppProvider>
    </NotificationProvider>
  );
};

export default App;
