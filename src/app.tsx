import React, { useState } from "react";
import { memo, useCallback } from "./@lib";
import {
  ComplexForm,
  Header,
  ItemList,
  NotificationSystem,
} from "./components";
import { useThemeContext } from "./contexts";
import { Providers } from "./providers";
import { generateItems } from "./utils";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
};

const AppContent = memo(() => {
  const { theme } = useThemeContext();
  // lazy initalizer 문제 >> advanced 마지막 테스트 gnerateItemsSpy
  // const [items, setItems] = useState(generateItems(1000)); // 실패
  const [items, setItems] = useState(() => generateItems(1000));

  const addItems = useCallback(() => {
    setItems((p) => [...p, ...generateItems(1000, p.length)]);
  }, []);

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
