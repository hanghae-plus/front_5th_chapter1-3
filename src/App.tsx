import React from "react";

import { ThemePropvider } from "./context";
import { NotificationProvider } from "./context/NotificationProvider";
import { UserProvider } from "./context/UserProvider";
import { ItemProvider } from "./context/ItemProvider";

import ComplexForm from "./components/ComplexForm";
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import NotificationSystem from "./components/NotificationSystem";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <ThemePropvider>
      <NotificationProvider>
        <UserProvider>
          <ItemProvider>
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
          </ItemProvider>
        </UserProvider>
      </NotificationProvider>
    </ThemePropvider>
  );
};

export default App;
