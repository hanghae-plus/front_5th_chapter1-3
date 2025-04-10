import React, { useState } from "react";
import { generateItems } from "./utils";
import { memo, useCallback } from "./@lib";
import { Item } from "./types";

import { ThemeProvider, useThemeContext } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import ComplexForm from "./components/ComplexForm";
import NotificationSystem from "./components/NotificationSystem";

// 테마와 연결되지 않는 컴포넌트들을 포함
const MainContent: React.FC<{
  items: Item[];
  onAddItems: () => void;
}> = memo(({ items, onAddItems }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 md:pr-4">
          <ItemList items={items} onAddItemsClick={onAddItems} />
        </div>
        <div className="w-full md:w-1/2 md:pl-4">
          <ComplexForm />
        </div>
      </div>
    </div>
  );
});

// 테마에 따라 스타일이 변경되는 컨테이너
const ThemeContent: React.FC<{
  children: React.ReactNode;
}> = memo(({ children }) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      {children}
    </div>
  );
});

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>(generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  return (
    <AppProvider>
      <ThemeProvider>
        <ThemeContent>
          <Header />
          <MainContent items={items} onAddItems={addItems} />
          <NotificationSystem />
        </ThemeContent>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
