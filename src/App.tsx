import React, { useCallback } from "react";
import { ThemeProvider } from "./providers/ThemeProvider";
import { UserProvider } from "./providers/UserProvider";
import { NotificationProvider } from "./providers/NotificationProvider";
import Layout from "./components/Layout";
import { ComplexForm } from "./components/ComplexForm";
import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { NotificationSystem } from "./components/NotificationSystem";
import { generateItems } from "./utils";

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [items, setItems] = React.useState(generateItems(1000));
  const addItems = useCallback(() => {
    setItems((prev) => [...prev, ...generateItems(1000, prev.length)]);
  }, []);
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
