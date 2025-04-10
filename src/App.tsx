import React, { useState } from "react";

import { generateItems } from "#src/utils";
import Layout from "#src/components/layouts/Layout";
import ItemList from "#src/components/common/ItemList";
import ComplexForm from "#src/components/common/ComplexForm";
import ThemeContextProvider from "#src/providers/ThemeContextProvider";
import NotificationContextProvider from "#src/providers/NotificationContextProvider";
import UserContextProvider from "#src/providers/UserContextProvider";

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
    <ThemeContextProvider>
      <NotificationContextProvider>
        <UserContextProvider>
          <Layout>
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
          </Layout>
        </UserContextProvider>
      </NotificationContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
