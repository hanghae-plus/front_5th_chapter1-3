import React from "react";
import { ThemeContextProvider } from "./@lib/provider/ThemeContextProvider";
import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { ComplexForm } from "./components/ComplexForm";
import { NotificationSystem } from "./components/NotificationSystem";
import NotificationContextProvider from "./@lib/provider/NotificationProvider";
import AuthContextProvider from "./@lib/provider/AuthContextProvider";

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <NotificationContextProvider>
        <AuthContextProvider>
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
        </AuthContextProvider>
      </NotificationContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
