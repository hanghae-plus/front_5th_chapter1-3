import React from "react";

// components
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import ThemeBackground from "./components/ThemedBackground";
import { Provider } from "./context/provider";
import ComplexForm from "./components/ComplexForm";
import { NotificationSystem } from "./components/NotificationSystem";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <Provider>
      <ThemeBackground>
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
      </ThemeBackground>
    </Provider>
  );
};

export default App;
