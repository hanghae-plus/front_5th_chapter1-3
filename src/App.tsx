import React from "react";
import Header from "./components/common/Header";
import ItemList from "./components/items/ItemList";
import ComplexForm from "./components/form/ComplexForm";
import NotificationSystem from "./components/notification/NotificationSystem";
import { NotificationProvider } from "./context/NotificationContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import UncontrolledForm from "./components/form/UncontrolledForm";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <Header />
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 md:pr-4">
                <ItemList />
              </div>
              <div className="w-full md:w-1/2 md:pl-4">
                <ComplexForm />
                <UncontrolledForm />
              </div>
            </div>
          </div>
          <NotificationSystem />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
