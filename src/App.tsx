import React, { useState } from "react";

import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { ComplexForm } from "./components/ComplexForm";
import { NotificationSystem } from "./components/NotificationSystem";

import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";
import { NotificationProvider } from "./contexts/NotificationContext";

import { useCallback } from "./@lib";
import { generateItems } from "./utils";

const App = () => {
  const [items, setItems] = useState(() => generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prev) => [...prev, ...generateItems(1000, prev.length)]);
  }, []);

  return (
    <NotificationProvider>
      <ThemeProvider>
        <UserProvider>
          <ThemedAppLayout items={items} addItems={addItems} />
        </UserProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
};

const ThemedAppLayout: React.FC<{
  items: ReturnType<typeof generateItems>;
  addItems: () => void;
}> = ({ items, addItems }) => {
  const { theme } = useTheme();
  return <AppLayout theme={theme} items={items} addItems={addItems} />;
};

const AppLayout: React.FC<{
  theme: string;
  items: ReturnType<typeof generateItems>;
  addItems: () => void;
}> = React.memo(({ theme, items, addItems }) => {
  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
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
    </div>
  );
});

export default App;
