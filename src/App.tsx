import React, { useState } from "react";
import { generateItems } from "./utils";
import { ItemList } from "./item/ItemList";
import Layout from "./layout/Layout";
import ComplexForm from "./complex/ComplexForm";
import { CombinedProvider } from "./contexts/CombinedProvider";

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
    <CombinedProvider>
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
    </CombinedProvider>
  );
};

export default App;
