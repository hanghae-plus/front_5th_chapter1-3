import React, { useState } from "react";
import { generateItems } from "./utils";
import {
  ComplexForm,
  Header,
  ItemList,
  Layout,
  NotificationSystem,
} from "./components";
import ThemeProvider from "./context/ThemeContext/ThemeProvider.tsx";
import NotificationProvider from "./context/NotificationContext/NotificationProvider.tsx";
import UserProvider from "./context/UserContext/UserProvider.tsx";

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
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <Layout>
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
          </Layout>
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
