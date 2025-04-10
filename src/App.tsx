import React from "react";
import { useThemeContext } from "./contexts/theme/context.ts";
import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { ComplexForm } from "./components/ComplexForm";
import { NotificationSystem } from "./components/NotificationSystem";
import { UserProvider } from "./contexts/user/Provider.tsx";
import { NotificationProvider } from "./contexts/notification/Provider.tsx";
import { ThemeProvider } from "./contexts/theme/Provider.tsx";

const MainContent = () => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <NotificationProvider>
        <UserProvider>
          <Header />
        </UserProvider>
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
      </NotificationProvider>
    </div>
  );
};

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
};

export default App;
