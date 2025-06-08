import React, { useState } from "react";
import { generateItems } from "./utils";
import { ComplexForm } from "./components/ComplexForm";
import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { ThemeWrapper } from "./components/ThemeWrapper";
import { NotificationSystem } from "./components/NotificationSystem";
import {
  LoginProvider,
  NotificationProvider,
  ThemeProvider,
} from "./providers";
import { Item } from "./types";
import { memo } from "./@lib";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <NotificationProvider>
      <LoginProvider>
        <ThemeProvider>
          <AppContainer />
        </ThemeProvider>
      </LoginProvider>
    </NotificationProvider>
  );
};

const AppContainer: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return <AppLayout items={items} addItems={addItems} />;
};

const AppLayout = memo(
  ({ items, addItems }: { items: Item[]; addItems: () => void }) => {
    return (
      <ThemeWrapper>
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
      </ThemeWrapper>
    );
  }
);

// App 컴포넌트 내보내기

export default App;
