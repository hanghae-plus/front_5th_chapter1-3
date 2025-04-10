import React from "react";
import { ComplexForm } from "./components/ComplexForm";
import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { NotificationSystem } from "./components/NotificationSystem";
import { NotificationProvider } from "./context/NotificationProvider";
import { ThemePropvider } from "./context/ThemePropvider";
import { UserProvider } from "./context/UserProvider";
import { ItemProvider } from "./context/ItemProvider";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <ThemePropvider>
      <NotificationProvider>
        <UserProvider>
          <Header />
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 md:pr-4">
                <ItemProvider>
                  <ItemList />
                </ItemProvider>
              </div>
              <div className="w-full md:w-1/2 md:pl-4">
                <ComplexForm />
              </div>
            </div>
          </div>
          <NotificationSystem />
        </UserProvider>
      </NotificationProvider>
    </ThemePropvider>
  );
};

export default App;
