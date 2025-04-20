import React from "react";
import { Providers } from "./context/providers";
import { Header } from "./components/header";
import { NotificationSystem } from "./components/notification-system";
import { ItemList } from "./components/item-list";
import { ComplexForm } from "./components/complex-form";
import { ThemedBackground } from "./components/themed-background";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <Providers>
      <ThemedBackground>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 md:pr-4">
              <ItemList />
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <ComplexForm />
            </div>
          </div>
        </div>
        <NotificationSystem />
      </ThemedBackground>
    </Providers>
  );
};

export default App;
