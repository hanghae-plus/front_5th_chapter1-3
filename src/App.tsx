import { useState } from "react";
import { generateItems } from "./utils";
import { Header } from "./components/Header.tsx";
import { ComplexForm } from "./components/ComplexForm.tsx";
import { ItemList } from "./components/ItemList.tsx";
import { NotificationSystem } from "./components/NotificationSystem.tsx";
import { AppProvider } from "./AppProvider.tsx";

// 메인 App 컴포넌트
const AppContent = () => {
  const [items, setItems] = useState(generateItems(1000));
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList
              items={items}
              onAddItemsClick={() =>
                setItems([...items, ...generateItems(1000, items.length)])
              }
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </>
  );
};
const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
