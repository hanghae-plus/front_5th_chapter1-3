import React from "react";

import { NotificationSystem } from "./components/NotificationSystem";
import { ComplexForm } from "./components/ComplexForm";
import { ItemList } from "./components/ItemList";
import { Header } from "./components/Header";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ItemsProvider, useItemsContext } from "./context/ItemsContext";

const Main: React.FC = React.memo(() => {
  const { theme } = useThemeContext();
  const { items, addItems } = useItemsContext();

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"
      }`}
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

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <ItemsProvider>
            <Main />
          </ItemsProvider>
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
